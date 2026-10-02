import React, { useState } from 'react';
import { X, Calendar, Clock, AlertCircle, Sparkles, ShieldAlert } from 'lucide-react';
import { LeaveService } from '../../modules/attendance/leave.service.js';
import { PolicyEngine } from '../../modules/attendance/policy.engine.js';
import { db } from '../../database/db.js';

export default function ApplyLeaveModal({
  isOpen,
  onClose,
  tenantContext,
  currentUser,
  onSuccess
}) {
  const [formData, setFormData] = useState(() => ({
    applicantType: 'EMPLOYEE',
    applicantId: currentUser.role === 'TEACHER' ? 'emp-sunita' : 'emp-principal-meenakshi',
    leaveType: 'CASUAL_LEAVE',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    isHalfDay: false,
    reason: ''
  }));

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const campusId = tenantContext.activeCampusId;
  const policy = db.getAttendancePolicy(campusId);
  const holidays = db.getHolidays(campusId);
  const employees = db.getEmployees(tenantContext);
  const balances = db.getLeaveBalances(tenantContext, formData.applicantId);
  const currentBalance = balances.find(b => b.leaveType === formData.leaveType);

  // Live calculation of sandwich leave
  const sandwichEvaluation = PolicyEngine.evaluateSandwichLeave(policy, {
    leaveType: formData.leaveType,
    startDate: formData.startDate,
    endDate: formData.endDate,
    campusHolidays: holidays
  });

  const calculatedDays = formData.isHalfDay ? 0.5 : sandwichEvaluation.effectiveTotalDays;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.reason.trim()) {
      setError('Please provide a valid operational reason for leave.');
      return;
    }

    try {
      setIsSubmitting(true);
      const request = LeaveService.applyLeave(tenantContext, {
        ...formData,
        campusId,
        totalDays: calculatedDays
      });
      setIsSubmitting(false);
      if (onSuccess) onSuccess(request);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Failed to submit leave request');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                Module 02 • Workflow Request
              </div>
              <h2 className="text-base font-semibold text-white">Apply for Leave</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-950/40 border border-red-800/40 flex items-center gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Applicant Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Applicant (Staff Member)</label>
            <select
              value={formData.applicantId}
              onChange={(e) => setFormData(prev => ({ ...prev, applicantId: e.target.value }))}
              className="input-field text-xs w-full"
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} ({emp.employeeCode} - {emp.designationTitle})
                </option>
              ))}
            </select>
          </div>

          {/* Leave Type and Balance Counter */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Leave Category</label>
              <select
                value={formData.leaveType}
                onChange={(e) => setFormData(prev => ({ ...prev, leaveType: e.target.value }))}
                className="input-field text-xs w-full"
              >
                <option value="CASUAL_LEAVE">Casual Leave (CL)</option>
                <option value="SICK_LEAVE">Sick Leave (SL)</option>
                <option value="EARNED_LEAVE">Earned Leave (EL)</option>
                <option value="UNPAID_LEAVE">Leave Without Pay (LWP)</option>
              </select>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-center">
              <div className="text-[10px] text-slate-400 font-mono uppercase">Available Balance</div>
              <div className="text-sm font-semibold text-emerald-400 font-mono mt-0.5">
                {currentBalance ? `${currentBalance.remainingDays} days` : '12.0 days'}
                <span className="text-[10px] text-slate-400 font-normal ml-1.5 font-sans">
                  ({currentBalance?.pendingDays || 0} pending)
                </span>
              </div>
            </div>
          </div>

          {/* Dates & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="input-field text-xs w-full"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="input-field text-xs w-full"
                required
              />
            </div>
          </div>

          {/* Half-Day Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="halfDayToggle"
              checked={formData.isHalfDay}
              onChange={(e) => setFormData(prev => ({ ...prev, isHalfDay: e.target.checked }))}
              className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0"
            />
            <label htmlFor="halfDayToggle" className="text-xs text-slate-300 cursor-pointer">
              Half-Day Leave (0.5 day deduction)
            </label>
          </div>

          {/* Dynamic Sandwich Rule Notification Banner */}
          {sandwichEvaluation.isSandwichPenaltyApplied && (
            <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl flex items-start gap-2.5 text-xs text-amber-200 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Sandwich Rule Activated: </span>
                <span>
                  Dates span weekend / declared holidays. +{sandwichEvaluation.sandwichDaysCount} intervening days counted as per campus policy.
                </span>
                <div className="font-mono text-[11px] text-amber-400 mt-1">
                  Effective deduction: {calculatedDays} total days
                </div>
              </div>
            </div>
          )}

          {/* Reason */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Reason for Absence</label>
            <textarea
              rows={2}
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              placeholder="Provide reason for institutional record..."
              className="input-field text-xs w-full resize-none"
              required
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Total Charge: <span className="font-mono font-semibold text-white">{calculatedDays} day(s)</span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={onClose} className="btn-secondary text-xs px-3 py-1.5">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary text-xs px-4 py-1.5 flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Submit Leave</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
