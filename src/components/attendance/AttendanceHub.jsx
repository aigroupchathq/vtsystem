import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  ShieldAlert, 
  Sliders, 
  Check, 
  X, 
  Fingerprint, 
  UserCheck, 
  FileText
} from 'lucide-react';
import { AttendanceService } from '../../modules/attendance/attendance.service.js';
import { LeaveService } from '../../modules/attendance/leave.service.js';
import { RbacService } from '../../modules/platform/rbac.service.js';
import { db } from '../../database/db.js';

export default function AttendanceHub({
  tenantContext,
  currentUser,
  onOpenApplyLeaveModal,
  onOpenPunchModal,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState('classroom'); // classroom, staff, leaves, policy
  const campusId = tenantContext.activeCampusId;

  // Permissions
  const canMark = RbacService.hasPermission(currentUser.role, 'attendance:mark');
  const canManagePolicy = RbacService.hasPermission(currentUser.role, 'attendance:policy_manage');
  const canApproveLeaves = RbacService.hasPermission(currentUser.role, 'leaves:approve');

  // Classroom Tab State
  const divisions = db.getDivisions(campusId);
  const [selectedDivisionId, setSelectedDivisionId] = useState(divisions[0]?.id || 'div-pune-5a');
  const [attendanceDate, setAttendanceDate] = useState(() => new Date().toISOString().split('T')[0]);
  
  // Load enrolled students in selected division
  const divisionStudents = db.getStudents(tenantContext, { divisionId: selectedDivisionId });
  
  // Local state for classroom marking
  const [studentStatusMap, setStudentStatusMap] = useState(() => {
    const map = {};
    const existing = db.getStudentAttendance(tenantContext, { divisionId: selectedDivisionId, date: attendanceDate });
    for (const s of divisionStudents) {
      const match = existing.find(e => e.studentId === s.id);
      map[s.id] = match ? match.status : 'PRESENT';
    }
    return map;
  });

  // Staff Tab State
  const [staffFilterDate, setStaffFilterDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [staffStatusFilter, setStaffStatusFilter] = useState('');

  // Policy Tab State
  const policy = db.getAttendancePolicy(campusId) || {};
  const [policyForm, setPolicyForm] = useState(() => ({
    shiftStartTime: policy.shiftStartTime || '08:00',
    shiftEndTime: policy.shiftEndTime || '16:00',
    gracePeriodMinutes: policy.gracePeriodMinutes ?? 15,
    lateThresholdMinutes: policy.lateThresholdMinutes ?? 30,
    halfDayMinWorkingHours: policy.halfDayMinWorkingHours ?? 4.0,
    fullDayMinWorkingHours: policy.fullDayMinWorkingHours ?? 7.0,
    lateDeductionThreshold: policy.lateDeductionThreshold ?? 3,
    isSandwichRuleEnabled: policy.isSandwichRuleEnabled ?? true,
    minStudentAttendancePct: policy.minStudentAttendancePct ?? 75.0,
    warningStudentAttendancePct: policy.warningStudentAttendancePct ?? 80.0
  }));
  const [isSavingPolicy, setIsSavingPolicy] = useState(false);

  // Queries
  const staffRecords = AttendanceService.listStaffAttendance(tenantContext, {
    date: staffFilterDate,
    status: staffStatusFilter || undefined,
    campusId
  });

  const leaveRequests = LeaveService.listRequests(tenantContext, { campusId });
  const employeeBalances = LeaveService.getBalances(tenantContext, 'emp-sunita');

  // Quick Action: Mark All Present
  const handleMarkAllPresent = () => {
    const updated = {};
    for (const s of divisionStudents) {
      updated[s.id] = 'PRESENT';
    }
    setStudentStatusMap(updated);
    if (onShowToast) onShowToast('All students marked PRESENT in active roster.');
  };

  // Submit Classroom Attendance Batch
  const handleSubmitClassroomAttendance = () => {
    try {
      const records = divisionStudents.map(s => ({
        studentId: s.id,
        status: studentStatusMap[s.id] || 'PRESENT'
      }));

      AttendanceService.markStudentClassroomAttendance(tenantContext, {
        divisionId: selectedDivisionId,
        date: attendanceDate,
        records
      });

      if (onShowToast) onShowToast(`Classroom attendance saved for ${records.length} students!`);
    } catch (err) {
      alert(err.message || 'Failed to submit attendance');
    }
  };

  // Leave Approval Action
  const handleApproveLeave = (reqId) => {
    try {
      LeaveService.approveLeave(tenantContext, reqId, 'Approved by Administrator');
      if (onShowToast) onShowToast(`Leave request ${reqId} approved! Quota deducted.`);
    } catch (err) {
      alert(err.message || 'Approval failed');
    }
  };

  const handleRejectLeave = (reqId) => {
    try {
      LeaveService.rejectLeave(tenantContext, reqId, 'Rejected per institutional scheduling');
      if (onShowToast) onShowToast(`Leave request ${reqId} rejected. Balance restored.`);
    } catch (err) {
      alert(err.message || 'Rejection failed');
    }
  };

  // Save Policy Updates
  const handleSavePolicy = (e) => {
    e.preventDefault();
    setIsSavingPolicy(true);
    try {
      AttendanceService.updatePolicy(tenantContext, campusId, {
        ...policyForm,
        gracePeriodMinutes: Number(policyForm.gracePeriodMinutes),
        lateThresholdMinutes: Number(policyForm.lateThresholdMinutes),
        halfDayMinWorkingHours: Number(policyForm.halfDayMinWorkingHours),
        fullDayMinWorkingHours: Number(policyForm.fullDayMinWorkingHours),
        minStudentAttendancePct: Number(policyForm.minStudentAttendancePct),
        warningStudentAttendancePct: Number(policyForm.warningStudentAttendancePct)
      });
      setIsSavingPolicy(false);
      if (onShowToast) onShowToast('Campus attendance policy updated and logged to audit trail!');
    } catch (err) {
      setIsSavingPolicy(false);
      alert(err.message || 'Failed to update policy');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 5 Orientation Answers Banner */}
      <div className="bg-white border border-[#E6DFD1] rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#0B2F29]/70">
              <CalendarCheck className="w-4 h-4 text-[#0B2F29]" />
              <span>MODULE 02 • ATTENDANCE, LEAVE & POLICY ENGINE</span>
            </div>
            <h1 className="text-xl font-bold text-[#0B2F29] mt-1">Attendance & Leave Command Hub</h1>
            <p className="text-xs text-[#4A665F] mt-1 max-w-2xl">
              Rule-driven attendance ledger for students and faculty. Dynamic policy engine calculates late arrivals, half-day thresholds, sandwich leaves, and CBSE 75% exam compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPunchModal}
              className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5"
            >
              <Fingerprint className="w-3.5 h-3.5 text-[#0B2F29]" />
              <span>Record Punch</span>
            </button>
            <button
              onClick={onOpenApplyLeaveModal}
              className="btn-primary text-xs px-3.5 py-2 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Apply Leave</span>
            </button>
          </div>
        </div>

        {/* Orientation Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 pt-3.5 border-t border-[#E6DFD1] text-[11px]">
          <div className="border-r border-[#E6DFD1] pr-3 last:border-0">
            <div className="text-[#4A665F] font-mono text-[9px] uppercase tracking-wider">Where Am I?</div>
            <div className="text-[#0B2F29] font-medium mt-0.5">Campus Attendance Center</div>
          </div>
          <div className="border-r border-[#E6DFD1] pr-3 last:border-0">
            <div className="text-[#4A665F] font-mono text-[9px] uppercase tracking-wider">What Am I Seeing?</div>
            <div className="text-[#0B2F29] font-medium mt-0.5">Live Roster & Biometric Log</div>
          </div>
          <div className="border-r border-[#E6DFD1] pr-3 last:border-0">
            <div className="text-[#4A665F] font-mono text-[9px] uppercase tracking-wider">What Matters?</div>
            <div className="text-amber-800 font-medium mt-0.5">Late Penalties & 75% Rule</div>
          </div>
          <div className="border-r border-[#E6DFD1] pr-3 last:border-0">
            <div className="text-[#4A665F] font-mono text-[9px] uppercase tracking-wider">What Can I Do?</div>
            <div className="text-[#0B2F29] font-medium mt-0.5">Batch Mark, Approve, Configure</div>
          </div>
          <div>
            <div className="text-[#4A665F] font-mono text-[9px] uppercase tracking-wider">What Happens Next?</div>
            <div className="text-[#0B2F29] font-medium mt-0.5">Payroll Sync & Alerts</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E6DFD1] gap-6 text-xs">
        <button
          onClick={() => setActiveTab('classroom')}
          className={`py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'classroom'
              ? 'border-[#0B2F29] text-[#0B2F29] font-semibold'
              : 'border-transparent text-[#4A665F] hover:text-[#0B2F29]'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Classroom Roll Call (Students)</span>
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'staff'
              ? 'border-[#0B2F29] text-[#0B2F29] font-semibold'
              : 'border-transparent text-[#4A665F] hover:text-[#0B2F29]'
          }`}
        >
          <Fingerprint className="w-4 h-4" />
          <span>Staff Shift & Biometrics</span>
          <span className="px-1.5 py-0.2 bg-[#F4EFEA] border border-[#E6DFD1] rounded-full text-[10px] font-mono text-[#0B2F29]">
            {staffRecords.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('leaves')}
          className={`py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'leaves'
              ? 'border-[#0B2F29] text-[#0B2F29] font-semibold'
              : 'border-transparent text-[#4A665F] hover:text-[#0B2F29]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Leave Workflow & Approvals</span>
          <span className="px-1.5 py-0.2 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-[10px] font-mono font-medium">
            {leaveRequests.filter(r => r.status === 'PENDING').length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('policy')}
          className={`py-3 font-medium border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'policy'
              ? 'border-[#0B2F29] text-[#0B2F29] font-semibold'
              : 'border-transparent text-[#4A665F] hover:text-[#0B2F29]'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Configurable Policy Engine</span>
        </button>
      </div>

      {/* Tab 1: Classroom Attendance */}
      {activeTab === 'classroom' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white border border-[#E6DFD1] rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <label className="block text-[10px] font-mono text-[#4A665F] uppercase mb-1">Select Division</label>
                <select
                  value={selectedDivisionId}
                  onChange={(e) => setSelectedDivisionId(e.target.value)}
                  className="input-field text-xs py-1.5"
                >
                  {divisions.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.gradeId === 'grd-5' ? 'Grade 5' : 'Grade 6'} - Section {d.name} ({d.roomNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-[#4A665F] uppercase mb-1">Attendance Date</label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="input-field text-xs py-1.5"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMarkAllPresent}
                className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Mark All Present</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitClassroomAttendance}
                disabled={!canMark}
                className="btn-primary text-xs px-4 py-1.5 flex items-center gap-1.5 disabled:opacity-50"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Save Attendance Batch</span>
              </button>
            </div>
          </div>

          {/* Roster Table */}
          <div className="bg-white border border-[#E6DFD1] rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E6DFD1] text-[11px] font-mono text-[#4A665F] uppercase bg-[#F8F5EE]">
                  <th className="py-3 px-4">Roll</th>
                  <th className="py-3 px-4">Student Name & ID</th>
                  <th className="py-3 px-4">Cumulative Attendance</th>
                  <th className="py-3 px-4">CBSE Compliance</th>
                  <th className="py-3 px-4 text-center">Status Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE9DD] text-xs">
                {divisionStudents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-[#4A665F]">
                      No enrolled students found in this division.
                    </td>
                  </tr>
                ) : (
                  divisionStudents.map((student) => {
                    const status = studentStatusMap[student.id] || 'PRESENT';
                    // Check compliance mock
                    const summary = AttendanceService.getStudentAttendanceSummary(tenantContext, student.id);
                    return (
                      <tr key={student.id} className="hover:bg-[#FAF8F3] transition-colors">
                        <td className="py-3 px-4 font-mono font-semibold text-[#0B2F29]">
                          #{student.enrollment?.rollNumber || '01'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-[#0B2F29]">{student.firstName} {student.lastName}</div>
                          <div className="text-[10px] text-[#4A665F] font-mono">{student.admissionNumber}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-[#E6DFD1] rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full ${summary.attendancePct >= 75 ? 'bg-emerald-600' : 'bg-red-500'}`}
                                style={{ width: `${Math.min(100, summary.attendancePct)}%` }}
                              />
                            </div>
                            <span className="font-mono text-[11px] font-semibold text-[#0B2F29]">
                              {summary.attendancePct}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {summary.attendancePct < 75 ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-red-50 border border-red-200 text-red-700 flex items-center gap-1 w-max">
                              <AlertTriangle className="w-3 h-3" />
                              Shortage (&lt;75%)
                            </span>
                          ) : (
                            <span className="badge-green px-2 py-0.5 rounded-full text-[10px] font-mono">
                              Eligible (CBSE)
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex rounded-lg bg-[#F8F5EE] border border-[#E6DFD1] p-0.5">
                            <button
                              type="button"
                              onClick={() => setStudentStatusMap(prev => ({ ...prev, [student.id]: 'PRESENT' }))}
                              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                                status === 'PRESENT'
                                  ? 'bg-emerald-100 text-emerald-800 font-semibold shadow-xs'
                                  : 'text-[#4A665F] hover:text-[#0B2F29]'
                              }`}
                            >
                              Present
                            </button>
                            <button
                              type="button"
                              onClick={() => setStudentStatusMap(prev => ({ ...prev, [student.id]: 'ABSENT' }))}
                              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                                status === 'ABSENT'
                                  ? 'bg-red-100 text-red-800 font-semibold shadow-xs'
                                  : 'text-[#4A665F] hover:text-[#0B2F29]'
                              }`}
                            >
                              Absent
                            </button>
                            <button
                              type="button"
                              onClick={() => setStudentStatusMap(prev => ({ ...prev, [student.id]: 'LATE' }))}
                              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                                status === 'LATE'
                                  ? 'bg-amber-100 text-amber-800 font-semibold shadow-xs'
                                  : 'text-[#4A665F] hover:text-[#0B2F29]'
                              }`}
                            >
                              Late
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Staff Shift & Biometrics */}
      {activeTab === 'staff' && (
        <div className="space-y-4">
          <div className="bg-white border border-[#E6DFD1] rounded-xl p-4 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <label className="block text-[10px] font-mono text-[#4A665F] uppercase mb-1">Date</label>
                <input
                  type="date"
                  value={staffFilterDate}
                  onChange={(e) => setStaffFilterDate(e.target.value)}
                  className="input-field text-xs py-1.5"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-[#4A665F] uppercase mb-1">Status Filter</label>
                <select
                  value={staffStatusFilter}
                  onChange={(e) => setStaffStatusFilter(e.target.value)}
                  className="input-field text-xs py-1.5"
                >
                  <option value="">All Statuses</option>
                  <option value="PRESENT">Present</option>
                  <option value="LATE">Late</option>
                  <option value="HALF_DAY">Half-Day</option>
                  <option value="LEAVE">Leave</option>
                  <option value="ABSENT">Absent</option>
                </select>
              </div>
            </div>

            <button
              onClick={onOpenPunchModal}
              className="btn-primary text-xs px-3.5 py-1.5 flex items-center gap-1.5"
            >
              <Fingerprint className="w-3.5 h-3.5" />
              <span>Record Punch</span>
            </button>
          </div>

          <div className="bg-white border border-[#E6DFD1] rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E6DFD1] text-[11px] font-mono text-[#4A665F] uppercase bg-[#F8F5EE]">
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Department & Role</th>
                  <th className="py-3 px-4">Check-In</th>
                  <th className="py-3 px-4">Check-Out</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Evaluated Status</th>
                  <th className="py-3 px-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE9DD] text-xs">
                {staffRecords.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-[#4A665F]">
                      No staff attendance records logged for this date.
                    </td>
                  </tr>
                ) : (
                  staffRecords.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAF8F3] transition-colors">
                      <td className="py-3.5 px-4 font-medium text-[#0B2F29]">
                        <div>{item.employeeName}</div>
                        <div className="text-[10px] text-[#4A665F] font-mono">{item.employeeCode}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-[#0B2F29]">{item.designationTitle}</div>
                        <div className="text-[10px] text-[#4A665F]">{item.departmentName}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#334E47]">
                        {item.checkInTime ? new Date(item.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#334E47]">
                        {item.checkOutTime ? new Date(item.checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#334E47]">
                        {item.durationMinutes ? `${Math.floor(item.durationMinutes / 60)}h ${item.durationMinutes % 60}m` : '—'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                          item.status === 'PRESENT'
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                            : item.status === 'LATE'
                            ? 'bg-amber-50 border border-amber-200 text-amber-800'
                            : item.status === 'HALF_DAY'
                            ? 'bg-blue-50 border border-blue-200 text-blue-800'
                            : item.status === 'LEAVE'
                            ? 'bg-purple-50 border border-purple-200 text-purple-800'
                            : 'bg-red-50 border border-red-200 text-red-800'
                        }`}>
                          {item.status} {item.lateMinutes > 0 ? `(+${item.lateMinutes}m)` : ''}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#4A665F] text-[11px]">
                        {item.remarks || item.source}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Leave Management & Approvals */}
      {activeTab === 'leaves' && (
        <div className="space-y-6">
          {/* Leave Balances Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {employeeBalances.map(b => (
              <div key={b.id} className="bg-white border border-[#E6DFD1] rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0B2F29]">{b.leaveType.replace('_', ' ')}</span>
                  <span className="font-mono text-[#0B2F29] text-sm font-bold">{b.remainingDays} days</span>
                </div>
                <div className="w-full bg-[#E6DFD1] rounded-full h-1.5 mt-3 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${(b.remainingDays / b.allocatedDays) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#4A665F] mt-2 font-mono">
                  <span>Allocated: {b.allocatedDays}d</span>
                  <span>Used: {b.usedDays}d</span>
                  <span>Pending: {b.pendingDays}d</span>
                </div>
              </div>
            ))}
          </div>

          {/* Leave Requests Table */}
          <div className="bg-white border border-[#E6DFD1] rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#E6DFD1] flex items-center justify-between">
              <h3 className="text-xs font-semibold text-[#0B2F29] uppercase tracking-wider font-mono">
                Leave Applications & Workflow
              </h3>
              <button
                onClick={onOpenApplyLeaveModal}
                className="btn-primary text-xs px-3 py-1 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Leave Request</span>
              </button>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E6DFD1] text-[11px] font-mono text-[#4A665F] uppercase bg-[#F8F5EE]">
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Leave Type</th>
                  <th className="py-3 px-4">Dates</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Workflow Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE9DD] text-xs">
                {leaveRequests.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-[#4A665F]">
                      No leave requests submitted yet.
                    </td>
                  </tr>
                ) : (
                  leaveRequests.map(req => (
                    <tr key={req.id} className="hover:bg-[#FAF8F3] transition-colors">
                      <td className="py-3.5 px-4 font-medium text-[#0B2F29]">
                        <div>{req.applicantName}</div>
                        <div className="text-[10px] text-[#4A665F] font-mono">{req.applicantCode}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-[#0B2F29]">{req.leaveType.replace('_', ' ')}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#334E47]">
                        {req.startDate} {req.startDate !== req.endDate ? `to ${req.endDate}` : ''}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#334E47]">
                        <span>{req.totalDays} day(s)</span>
                        {req.isSandwichPenaltyApplied && (
                          <div className="text-[10px] text-amber-700 font-sans">
                            +{req.sandwichDaysCount}d sandwich rule
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-[#334E47] text-[11px] max-w-xs truncate">
                        {req.reason}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                          req.status === 'APPROVED'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : req.status === 'PENDING'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {req.status === 'PENDING' && canApproveLeaves ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleApproveLeave(req.id)}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded border border-emerald-300 transition-colors flex items-center gap-1 text-xs"
                              title="Approve Leave"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleRejectLeave(req.id)}
                              className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-800 rounded border border-red-300 transition-colors flex items-center gap-1 text-xs"
                              title="Reject Leave"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-[#4A665F] text-[11px] italic">
                            {req.status === 'APPROVED' ? `Approved by ${req.approverRole || 'Admin'}` : 'Closed'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Configurable Policy Engine Settings */}
      {activeTab === 'policy' && (
        <form onSubmit={handleSavePolicy} className="bg-white border border-[#E6DFD1] rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#0B2F29]/70 uppercase">
              <Sliders className="w-4 h-4 text-[#0B2F29]" />
              <span>Campus Policy Engine Settings</span>
            </div>
            <h2 className="text-base font-semibold text-[#0B2F29] mt-1">Rule-Driven Thresholds & Parameters</h2>
            <p className="text-xs text-[#4A665F] mt-1 max-w-xl">
              Configurable operational rules for this campus. Modifying parameters immediately adjusts evaluation thresholds and records an immutable entry in the audit ledger.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E6DFD1]">
            {/* Shift Timings */}
            <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E6DFD1] space-y-3">
              <h4 className="text-xs font-semibold text-[#0B2F29] uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0B2F29]" />
                Shift Timings & Grace Period
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#4A665F] mb-1">Shift Start Time (24h)</label>
                  <input
                    type="time"
                    value={policyForm.shiftStartTime}
                    onChange={(e) => setPolicyForm(prev => ({ ...prev, shiftStartTime: e.target.value }))}
                    className="input-field text-xs w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#4A665F] mb-1">Shift End Time (24h)</label>
                  <input
                    type="time"
                    value={policyForm.shiftEndTime}
                    onChange={(e) => setPolicyForm(prev => ({ ...prev, shiftEndTime: e.target.value }))}
                    className="input-field text-xs w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#4A665F] mb-1">Grace Period (Minutes)</label>
                  <input
                    type="number"
                    value={policyForm.gracePeriodMinutes}
                    onChange={(e) => setPolicyForm(prev => ({ ...prev, gracePeriodMinutes: e.target.value }))}
                    className="input-field text-xs w-full font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#4A665F] mb-1">Late Threshold (Minutes)</label>
                  <input
                    type="number"
                    value={policyForm.lateThresholdMinutes}
                    onChange={(e) => setPolicyForm(prev => ({ ...prev, lateThresholdMinutes: e.target.value }))}
                    className="input-field text-xs w-full font-mono"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Working Hours & Half Day */}
            <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E6DFD1] space-y-3">
              <h4 className="text-xs font-semibold text-[#0B2F29] uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#0B2F29]" />
                Working Hours & Deductions
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#4A665F] mb-1">Half-Day Min Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    value={policyForm.halfDayMinWorkingHours}
                    onChange={(e) => setPolicyForm(prev => ({ ...prev, halfDayMinWorkingHours: e.target.value }))}
                    className="input-field text-xs w-full font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#4A665F] mb-1">Full-Day Min Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    value={policyForm.fullDayMinWorkingHours}
                    onChange={(e) => setPolicyForm(prev => ({ ...prev, fullDayMinWorkingHours: e.target.value }))}
                    className="input-field text-xs w-full font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#4A665F] mb-1">Lates to Deduction Threshold</label>
                <input
                  type="number"
                  value={policyForm.lateDeductionThreshold}
                  onChange={(e) => setPolicyForm(prev => ({ ...prev, lateDeductionThreshold: e.target.value }))}
                  className="input-field text-xs w-full font-mono"
                  required
                />
              </div>
            </div>

            {/* Sandwich Leave Rule */}
            <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E6DFD1] space-y-3">
              <h4 className="text-xs font-semibold text-[#0B2F29] uppercase font-mono tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                Sandwich Leave Policy
              </h4>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="sandwichToggle"
                  checked={policyForm.isSandwichRuleEnabled}
                  onChange={(e) => setPolicyForm(prev => ({ ...prev, isSandwichRuleEnabled: e.target.checked }))}
                  className="rounded border-[#E6DFD1] text-[#0B2F29] focus:ring-[#0B2F29] w-4 h-4"
                />
                <label htmlFor="sandwichToggle" className="text-xs text-[#0B2F29] font-medium cursor-pointer">
                  Activate Sandwich Leave Rule
                </label>
              </div>
              <p className="text-[11px] text-[#4A665F]">
                When activated, leave spanning across weekends or gazetted holidays automatically includes intervening non-working days in the quota deduction.
              </p>
            </div>

            {/* Regulatory Thresholds */}
            <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E6DFD1] space-y-3">
              <h4 className="text-xs font-semibold text-[#0B2F29] uppercase font-mono tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#0B2F29]" />
                Student Statutory Compliance
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#4A665F] mb-1">Mandatory Cutoff (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={policyForm.minStudentAttendancePct}
                    onChange={(e) => setPolicyForm(prev => ({ ...prev, minStudentAttendancePct: e.target.value }))}
                    className="input-field text-xs w-full font-mono"
                    required
                  />
                  <div className="text-[10px] text-[#4A665F] mt-1">CBSE statutory minimum: 75%</div>
                </div>
                <div>
                  <label className="block text-[11px] text-[#4A665F] mb-1">Early Warning Alert (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={policyForm.warningStudentAttendancePct}
                    onChange={(e) => setPolicyForm(prev => ({ ...prev, warningStudentAttendancePct: e.target.value }))}
                    className="input-field text-xs w-full font-mono"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E6DFD1] flex justify-end">
            <button
              type="submit"
              disabled={isSavingPolicy || !canManagePolicy}
              className="btn-primary text-xs px-5 py-2 flex items-center gap-2 disabled:opacity-50"
            >
              {isSavingPolicy ? (
                <>
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving Policy...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save Policy Settings & Emit Audit</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
