// VEDIC TREE OS — Module 02: Attendance, Leave & Policy Engine Tests
import test from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../src/database/db.js';
import { AttendanceService } from '../src/modules/attendance/attendance.service.js';
import { LeaveService } from '../src/modules/attendance/leave.service.js';
import { PolicyEngine } from '../src/modules/attendance/policy.engine.js';
import { RbacService } from '../src/modules/platform/rbac.service.js';

test('1. Policy Engine: Rule Calculations & Thresholds', async (t) => {
  db.reset();

  const banerPolicy = db.getAttendancePolicy('cmp-pune-baner');

  await t.test('1.1 On-time arrival within grace period evaluates to PRESENT', () => {
    // Shift starts at 08:00, grace period is 15 mins (up to 08:15)
    const result = PolicyEngine.evaluateStaffCheckIn(banerPolicy, '2026-10-02T08:12:00Z');
    assert.equal(result.status, 'PRESENT');
    assert.equal(result.lateMinutes, 0);
    assert.equal(result.isLate, false);
  });

  await t.test('1.2 Arrival past grace period evaluates to LATE with exact minutes', () => {
    // Arrival at 08:25 AM -> 25 mins late
    const result = PolicyEngine.evaluateStaffCheckIn(banerPolicy, '2026-10-02T08:25:00Z');
    assert.equal(result.status, 'LATE');
    assert.equal(result.lateMinutes, 25);
    assert.equal(result.isLate, true);
  });

  await t.test('1.3 Working hours below half-day threshold evaluates to ABSENT', () => {
    // Worked 3.5 hours (policy requires 4.0h for half day)
    const status = PolicyEngine.evaluateWorkingHours(banerPolicy, 3.5, 'PRESENT');
    assert.equal(status, 'ABSENT');
  });

  await t.test('1.4 Working hours between half-day and full-day evaluates to HALF_DAY', () => {
    // Worked 5.5 hours (policy requires 7.0h for full day)
    const status = PolicyEngine.evaluateWorkingHours(banerPolicy, 5.5, 'PRESENT');
    assert.equal(status, 'HALF_DAY');
  });

  await t.test('1.5 Sandwich Leave Rule flags weekend/holiday span', () => {
    // Friday (2026-10-09) to Monday (2026-10-12): spans Saturday & Sunday
    const sandwich = PolicyEngine.evaluateSandwichLeave(banerPolicy, {
      leaveType: 'CASUAL_LEAVE',
      startDate: '2026-10-09',
      endDate: '2026-10-12',
      campusHolidays: []
    });

    assert.equal(sandwich.isSandwichPenaltyApplied, true);
    assert.equal(sandwich.sandwichDaysCount, 2); // Saturday + Sunday
    assert.equal(sandwich.effectiveTotalDays, 4); // Friday, Sat, Sun, Mon
  });

  await t.test('1.6 Student compliance evaluates CBSE 75% regulatory cutoff', () => {
    // 15 present out of 20 days = 75% (Compliant, but Warning because < 80%)
    const eval75 = PolicyEngine.evaluateStudentCompliance(banerPolicy, {
      presentDays: 15,
      halfDays: 0,
      absentDays: 5,
      totalWorkingDays: 20
    });
    assert.equal(eval75.attendancePct, 75);
    assert.equal(eval75.isCompliant, true);
    assert.equal(eval75.isWarning, true);
    assert.equal(eval75.statusLabel, 'ATTENDANCE_WARNING');

    // 14 present out of 20 days = 70% (Non-compliant, Hall ticket blocked)
    const eval70 = PolicyEngine.evaluateStudentCompliance(banerPolicy, {
      presentDays: 14,
      halfDays: 0,
      absentDays: 6,
      totalWorkingDays: 20
    });
    assert.equal(eval70.attendancePct, 70);
    assert.equal(eval70.isCompliant, false);
    assert.equal(eval70.statusLabel, 'CRITICAL_SHORTAGE');
  });
});

test('2. Staff Attendance Lifecycle & Check-In / Check-Out', async (t) => {
  db.reset();

  const principalContext = {
    userId: 'usr-principal-baner',
    userRole: 'PRINCIPAL',
    organizationId: 'org-vedic-tree-foundation',
    campusId: 'cmp-pune-baner'
  };

  await t.test('2.1 Record on-time staff check-in', () => {
    const record = AttendanceService.recordStaffCheckIn(principalContext, {
      employeeId: 'emp-principal-meenakshi',
      checkInTime: '2026-10-05T08:05:00Z',
      campusId: 'cmp-pune-baner'
    });

    assert.ok(record.id);
    assert.equal(record.status, 'PRESENT');
    assert.equal(record.lateMinutes, 0);
  });

  await t.test('2.2 Record late check-in triggering late rule', () => {
    const record = AttendanceService.recordStaffCheckIn(principalContext, {
      employeeId: 'emp-sunita',
      checkInTime: '2026-10-05T08:35:00Z', // 35 mins late
      campusId: 'cmp-pune-baner'
    });

    assert.ok(record.id);
    assert.equal(record.status, 'LATE');
    assert.equal(record.lateMinutes, 35);
  });

  await t.test('2.3 Staff check-out calculates duration and adjusts half-day status', () => {
    // Sunita checked in at 08:35, checks out at 13:05 (4.5 hours -> Half Day)
    const record = AttendanceService.recordStaffCheckOut(principalContext, {
      employeeId: 'emp-sunita',
      checkOutTime: '2026-10-05T13:05:00Z',
      campusId: 'cmp-pune-baner'
    });

    assert.equal(record.status, 'HALF_DAY');
    assert.ok(record.durationMinutes >= 270);
  });
});

test('3. Student Classroom Attendance & Roll Call', async (t) => {
  db.reset();

  const teacherContext = {
    userId: 'usr-teacher-patil',
    userRole: 'TEACHER',
    organizationId: 'org-vedic-tree-foundation',
    campusId: 'cmp-pune-baner'
  };

  await t.test('3.1 Teacher marks batch classroom attendance', () => {
    const batch = AttendanceService.markStudentClassroomAttendance(teacherContext, {
      divisionId: 'div-pune-5a',
      date: '2026-10-05',
      records: [
        { studentId: 'stu-kabir-deshmukh', status: 'PRESENT' },
        { studentId: 'stu-aarav-sharma', status: 'ABSENT', remarks: 'Fever' }
      ]
    });

    assert.equal(batch.success, true);
    assert.equal(batch.count, 2);

    const list = AttendanceService.listStudentAttendance(teacherContext, {
      divisionId: 'div-pune-5a',
      date: '2026-10-05'
    });
    assert.equal(list.length, 2);
    const kabir = list.find(s => s.studentId === 'stu-kabir-deshmukh');
    const aarav = list.find(s => s.studentId === 'stu-aarav-sharma');
    assert.equal(kabir.status, 'PRESENT');
    assert.equal(aarav.status, 'ABSENT');
  });

  await t.test('3.2 Student attendance summary calculates compliance accurately', () => {
    const summary = AttendanceService.getStudentAttendanceSummary(teacherContext, 'stu-kabir-deshmukh');
    assert.ok(summary.totalWorkingDays >= 3);
    assert.ok(summary.attendancePct >= 90);
    assert.equal(summary.isCompliant, true);
  });
});

test('4. Leave Management & Multi-Stage Approval Workflow', async (t) => {
  db.reset();

  const teacherContext = {
    userId: 'usr-teacher-patil',
    userRole: 'TEACHER',
    organizationId: 'org-vedic-tree-foundation',
    campusId: 'cmp-pune-baner'
  };

  const principalContext = {
    userId: 'usr-principal-baner',
    userRole: 'PRINCIPAL',
    organizationId: 'org-vedic-tree-foundation',
    campusId: 'cmp-pune-baner'
  };

  let appliedRequest = null;

  await t.test('4.1 Employee applies for leave within available balance', () => {
    appliedRequest = LeaveService.applyLeave(teacherContext, {
      applicantId: 'emp-sunita',
      applicantType: 'EMPLOYEE',
      leaveType: 'CASUAL_LEAVE',
      startDate: '2026-10-15',
      endDate: '2026-10-16',
      totalDays: 2.0,
      reason: 'Attending educational seminar'
    });

    assert.ok(appliedRequest.id);
    assert.equal(appliedRequest.status, 'PENDING');
    assert.equal(appliedRequest.totalDays, 2.0);

    // Verify pending quota incremented
    const balances = LeaveService.getBalances(teacherContext, 'emp-sunita');
    const cl = balances.find(b => b.leaveType === 'CASUAL_LEAVE');
    assert.equal(cl.pendingDays, 3.0); // 1 previous pending + 2 new
  });

  await t.test('4.2 Teacher cannot approve their own leave (RBAC enforcement)', () => {
    assert.equal(RbacService.hasPermission('TEACHER', 'leaves:approve'), false);
    assert.throws(
      () => LeaveService.approveLeave(teacherContext, appliedRequest.id, 'Self approval'),
      { code: 'PERMISSION_DENIED', status: 403 }
    );
  });

  await t.test('4.3 Principal approves leave, updating quota and attendance ledger', () => {
    const approved = LeaveService.approveLeave(principalContext, appliedRequest.id, 'Approved for professional development');
    assert.equal(approved.status, 'APPROVED');
    assert.equal(approved.approverRole, 'PRINCIPAL');

    // Balance reflects deduction
    const balances = LeaveService.getBalances(principalContext, 'emp-sunita');
    const cl = balances.find(b => b.leaveType === 'CASUAL_LEAVE');
    assert.equal(cl.usedDays, 4.0); // 2 previous used + 2 approved

    // Staff attendance ledger has LEAVE entry for those dates
    const attendance = AttendanceService.listStaffAttendance(principalContext, {
      employeeId: 'emp-sunita',
      date: '2026-10-15'
    });
    assert.ok(attendance.length > 0);
    assert.equal(attendance[0].status, 'LEAVE');
  });

  await t.test('4.4 Rejection restores pending leave balance', () => {
    const newReq = LeaveService.applyLeave(teacherContext, {
      applicantId: 'emp-sunita',
      applicantType: 'EMPLOYEE',
      leaveType: 'SICK_LEAVE',
      startDate: '2026-10-20',
      endDate: '2026-10-20',
      totalDays: 1.0,
      reason: 'Dental checkup'
    });

    const rejected = LeaveService.rejectLeave(principalContext, newReq.id, 'Please reschedule during non-teaching hours');
    assert.equal(rejected.status, 'REJECTED');

    const balances = LeaveService.getBalances(principalContext, 'emp-sunita');
    const sl = balances.find(b => b.leaveType === 'SICK_LEAVE');
    assert.equal(sl.pendingDays, 0.0); // Restored
  });
});

test('5. Policy Change, Audit Trail & Tenant Isolation', async (t) => {
  db.reset();

  const hqContext = {
    userId: 'usr-hq-admin',
    userRole: 'HQ_ADMIN',
    organizationId: 'org-vedic-tree-foundation',
    campusId: null
  };

  const banerContext = {
    userId: 'usr-principal-baner',
    userRole: 'PRINCIPAL',
    organizationId: 'org-vedic-tree-foundation',
    campusId: 'cmp-pune-baner'
  };

  await t.test('5.1 Update campus attendance policy emits audit record with diff', () => {
    const updated = AttendanceService.updatePolicy(banerContext, 'cmp-pune-baner', {
      gracePeriodMinutes: 20,
      halfDayMinWorkingHours: 4.5
    });

    assert.equal(updated.gracePeriodMinutes, 20);
    assert.equal(updated.halfDayMinWorkingHours, 4.5);

    // Audit log verification
    const audits = db.getAuditLogs({ userRole: 'HQ_ADMIN' });
    const policyAudit = audits.find(a => a.entityName === 'AttendancePolicy' && a.action === 'UPDATE_POLICY');
    assert.ok(policyAudit, 'Policy change must be captured in audit ledger');
    assert.equal(JSON.parse(policyAudit.diffAfter).gracePeriodMinutes, 20);
  });

  await t.test('5.2 Cross-campus policy modification is blocked with 403 Forbidden', () => {
    assert.throws(
      () => AttendanceService.updatePolicy(banerContext, 'cmp-pune-kothrud', { gracePeriodMinutes: 25 }),
      { code: 'TENANT_ISOLATION_VIOLATION', status: 403 }
    );
  });

  await t.test('5.3 Cross-campus attendance recording is blocked with 403 Forbidden', () => {
    assert.throws(
      () => AttendanceService.recordStaffCheckIn(banerContext, {
        employeeId: 'emp-kothrud-teacher',
        campusId: 'cmp-pune-kothrud',
        checkInTime: '2026-10-05T08:30:00Z'
      }),
      { code: 'TENANT_ISOLATION_VIOLATION', status: 403 }
    );
  });
});
