import React, { useState } from 'react';
import { X, Fingerprint, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AttendanceService } from '../../modules/attendance/attendance.service.js';
import { db } from '../../database/db.js';

export default function StaffCheckInModal({
  isOpen,
  onClose,
  tenantContext,
  onSuccess
}) {
  const [employeeId, setEmployeeId] = useState('');
  const [actionType, setActionType] = useState('CHECK_IN');
  const [timestamp, setTimestamp] = useState(() => new Date().toISOString().slice(0, 16));
  const [source, setSource] = useState('BIOMETRIC');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const employees = db.getEmployees(tenantContext);
  const activeEmployeeId = employeeId || (employees[0]?.id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const isoTime = new Date(timestamp).toISOString();

    try {
      if (actionType === 'CHECK_IN') {
        const record = AttendanceService.recordStaffCheckIn(tenantContext, {
          employeeId: activeEmployeeId,
          checkInTime: isoTime,
          source,
          campusId: tenantContext.activeCampusId
        });
        setResult(record);
        if (onSuccess) onSuccess(record);
      } else {
        const record = AttendanceService.recordStaffCheckOut(tenantContext, {
          employeeId: activeEmployeeId,
          checkOutTime: isoTime,
          campusId: tenantContext.activeCampusId
        });
        setResult(record);
        if (onSuccess) onSuccess(record);
      }
    } catch (err) {
      setError(err.message || 'Operation failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                Biometric & Clock Override
              </div>
              <h2 className="text-base font-semibold text-white">Record Staff Punch</h2>
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

        {result && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-between text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Status: <strong className="font-mono text-emerald-300">{result.status}</strong></span>
            </div>
            {result.lateMinutes > 0 && (
              <span className="text-[11px] font-mono text-amber-400">
                +{result.lateMinutes}m Late
              </span>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Action</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActionType('CHECK_IN')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors ${
                  actionType === 'CHECK_IN'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Punch Check-In
              </button>
              <button
                type="button"
                onClick={() => setActionType('CHECK_OUT')}
                className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors ${
                  actionType === 'CHECK_OUT'
                    ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Punch Check-Out
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Staff Member</label>
            <select
              value={activeEmployeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="input-field text-xs w-full"
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} ({emp.employeeCode})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Punch Timestamp</label>
              <input
                type="datetime-local"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="input-field text-xs w-full"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Source Terminal</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="input-field text-xs w-full"
              >
                <option value="BIOMETRIC">Biometric Turnstile</option>
                <option value="MANUAL">Manual Registrar Override</option>
                <option value="MOBILE">Mobile GPS Geo-Fence</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn-secondary text-xs px-3 py-1.5">
              Close
            </button>
            <button type="submit" className="btn-primary text-xs px-4 py-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Record Punch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
