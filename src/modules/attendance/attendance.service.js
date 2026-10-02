// VEDIC TREE OS — Attendance Service (Staff, Student & Campus Policy)
import { db } from '../../database/db.js';
import { RbacService } from '../platform/rbac.service.js';
import { TenantContext } from '../platform/tenant.context.js';
import { PolicyEngine } from './policy.engine.js';
import { Logger } from '../platform/logger.service.js';

export class AttendanceService {
  // ====================================================
  // 1. POLICY ENGINE ACCESS & CONFIGURATION
  // ====================================================
  
  /**
   * Get active attendance policy for a campus
   * @param {object} context - Tenant security context
   * @param {string} campusId
   */
  static getPolicy(context, campusId) {
    const targetCampus = campusId || context.campusId;
    TenantContext.validateCampusBoundary(context, targetCampus);
    return db.getAttendancePolicy(targetCampus);
  }

  /**
   * Update attendance policy for a campus
   * Enforces 'attendance:policy_manage' permission
   * @param {object} context - Tenant security context
   * @param {string} campusId
   * @param {object} updates
   */
  static updatePolicy(context, campusId, updates) {
    RbacService.enforce(context.userRole, 'attendance:policy_manage');
    TenantContext.validateCampusBoundary(context, campusId);

    Logger.info('AttendanceService', `Updating attendance policy for campus: ${campusId}`, updates);
    return db.updateAttendancePolicy(context, campusId, updates);
  }

  // ====================================================
  // 2. STAFF ATTENDANCE OPERATIONS
  // ====================================================

  /**
   * Record Staff Check-In (Biometric terminal / Mobile app / Web portal)
   * Automatically evaluates status (PRESENT, LATE) via Policy Engine
   * @param {object} context
   * @param {object} param1 - { employeeId, checkInTime, source, campusId }
   */
  static recordStaffCheckIn(context, { employeeId, checkInTime = new Date().toISOString(), source = 'BIOMETRIC', campusId }) {
    RbacService.enforce(context.userRole, 'attendance:mark');
    const targetCampus = campusId || context.campusId;
    TenantContext.validateCampusBoundary(context, targetCampus);

    const policy = db.getAttendancePolicy(targetCampus);
    const evaluation = PolicyEngine.evaluateStaffCheckIn(policy, checkInTime);

    const date = checkInTime.split('T')[0];

    const record = db.recordStaffAttendance(context, {
      campusId: targetCampus,
      employeeId,
      date,
      checkInTime,
      lateMinutes: evaluation.lateMinutes,
      status: evaluation.status,
      source,
      remarks: evaluation.isLate ? `Late by ${evaluation.lateMinutes} mins (Grace: ${policy.gracePeriodMinutes}m)` : 'On-time arrival'
    });

    Logger.info('AttendanceService', `Staff check-in logged: ${employeeId} -> ${evaluation.status}`, { lateMinutes: evaluation.lateMinutes });
    return record;
  }

  /**
   * Record Staff Check-Out
   * Automatically computes duration and evaluates against half-day / full-day policy
   * @param {object} context
   * @param {object} param1 - { employeeId, checkOutTime, campusId }
   */
  static recordStaffCheckOut(context, { employeeId, checkOutTime = new Date().toISOString(), campusId }) {
    RbacService.enforce(context.userRole, 'attendance:mark');
    const targetCampus = campusId || context.campusId;
    TenantContext.validateCampusBoundary(context, targetCampus);

    const date = checkOutTime.split('T')[0];
    const existingList = db.getStaffAttendance(context, { employeeId, date, campusId: targetCampus });
    const existing = existingList[0];

    if (!existing || !existing.checkInTime) {
      throw new Error(`NO_CHECKIN: No check-in record found for employee ${employeeId} on ${date}.`);
    }

    const checkIn = new Date(existing.checkInTime);
    const checkOut = new Date(checkOutTime);
    const durationMinutes = Math.max(0, Math.round((checkOut - checkIn) / (1000 * 60)));
    const durationHours = durationMinutes / 60;

    const policy = db.getAttendancePolicy(targetCampus);
    const finalStatus = PolicyEngine.evaluateWorkingHours(policy, durationHours, existing.status);

    const record = db.recordStaffAttendance(context, {
      campusId: targetCampus,
      employeeId,
      date,
      checkOutTime,
      durationMinutes,
      status: finalStatus,
      remarks: finalStatus === 'HALF_DAY' ? `Half day: Worked ${durationHours.toFixed(1)}h (Min required: ${policy.halfDayMinWorkingHours}h)` : existing.remarks
    });

    Logger.info('AttendanceService', `Staff check-out logged: ${employeeId} -> ${finalStatus}`, { durationHours });
    return record;
  }

  /**
   * List staff attendance records
   * @param {object} context
   * @param {object} filters
   */
  static listStaffAttendance(context, filters = {}) {
    RbacService.enforce(context.userRole, 'attendance:read');
    if (filters.campusId) {
      TenantContext.validateCampusBoundary(context, filters.campusId);
    }
    return db.getStaffAttendance(context, filters);
  }

  // ====================================================
  // 3. STUDENT ATTENDANCE OPERATIONS
  // ====================================================

  /**
   * Mark classroom attendance in batch (Teacher morning roll call)
   * Enforces teacher / admin permission and division campus boundary
   * @param {object} context
   * @param {object} param1 - { divisionId, date, records }
   */
  static markStudentClassroomAttendance(context, { divisionId, date = new Date().toISOString().split('T')[0], records = [] }) {
    RbacService.enforce(context.userRole, 'attendance:mark');

    const division = db.divisions.find(d => d.id === divisionId);
    if (!division) {
      throw new Error(`DIVISION_NOT_FOUND: Division ${divisionId} does not exist.`);
    }

    TenantContext.validateCampusBoundary(context, division.campusId);

    const result = db.markStudentAttendanceBatch(context, {
      divisionId,
      date,
      records,
      markedBy: context.userId
    });

    Logger.info('AttendanceService', `Marked classroom attendance for ${divisionId} on ${date}: ${result.count} students`);
    return result;
  }

  /**
   * List student attendance records
   * @param {object} context
   * @param {object} filters
   */
  static listStudentAttendance(context, filters = {}) {
    RbacService.enforce(context.userRole, 'attendance:read');
    if (filters.campusId) {
      TenantContext.validateCampusBoundary(context, filters.campusId);
    }
    return db.getStudentAttendance(context, filters);
  }

  /**
   * Calculate Student Attendance Summary & CBSE 75% Regulatory Compliance
   * @param {object} context
   * @param {string} studentId
   */
  static getStudentAttendanceSummary(context, studentId) {
    RbacService.enforce(context.userRole, 'attendance:read');

    const student = db.students.find(s => s.id === studentId);
    if (!student) {
      throw new Error(`STUDENT_NOT_FOUND: Student ${studentId} does not exist.`);
    }

    TenantContext.validateCampusBoundary(context, student.campusId);

    const records = db.getStudentAttendance(context, { studentId });
    const policy = db.getAttendancePolicy(student.campusId);

    let presentDays = 0;
    let halfDays = 0;
    let absentDays = 0;
    let lateDays = 0;

    for (const r of records) {
      if (r.status === 'PRESENT') presentDays++;
      else if (r.status === 'HALF_DAY') halfDays++;
      else if (r.status === 'ABSENT') absentDays++;
      else if (r.status === 'LATE') {
        lateDays++;
        presentDays++; // Counted as present for academic days
      }
    }

    const totalWorkingDays = records.length;
    const compliance = PolicyEngine.evaluateStudentCompliance(policy, {
      presentDays,
      halfDays,
      absentDays,
      totalWorkingDays
    });

    return {
      studentId,
      studentName: `${student.firstName} ${student.lastName}`,
      admissionNumber: student.admissionNumber,
      campusId: student.campusId,
      totalWorkingDays,
      presentDays,
      halfDays,
      absentDays,
      lateDays,
      ...compliance
    };
  }
}
