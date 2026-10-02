// VEDIC TREE OS — Admission Fee Clearance & Student Core Conversion Modal
import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { AdmissionsService } from '../../modules/admissions/admissions.service.js';
import { db } from '../../database/db.js';

export default function ConvertStudentModal({
  isOpen,
  onClose,
  tenantContext,
  lead,
  application,
  onSuccess,
  onShowToast
}) {
  const [feeAmount, setFeeAmount] = useState(35000);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [selectedDivisionId, setSelectedDivisionId] = useState('div-pune-5a');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !lead || !application) return null;

  const campusId = tenantContext.activeCampusId;
  const divisions = db.divisions.filter(d => !campusId || d.campusId === campusId);

  const handleConvert = (e) => {
    e.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);
      
      // Step 1: Record Admission Fee Payment
      const admissionRecord = AdmissionsService.confirmAdmissionAndPayFee(
        tenantContext,
        lead.id,
        application.id,
        {
          admissionFeePaid: Number(feeAmount),
          paymentMethod
        }
      );

      // Step 2: Convert Candidate to full Student in Module 01 Core
      const result = AdmissionsService.convertToStudent(tenantContext, {
        leadId: lead.id,
        applicationId: application.id,
        admissionRecordId: admissionRecord.id,
        divisionId: selectedDivisionId
      });

      setIsSubmitting(false);
      if (onShowToast) onShowToast(`Admission confirmed! Student ${result.student.admissionNumber} (${result.student.firstName}) enrolled in Core SIS.`);
      if (onSuccess) onSuccess(result);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Conversion failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Confirm Admission & Enroll Student</h3>
              <p className="text-xs text-slate-400">Fee Clearance $\rightarrow$ Student Core Onboarding</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleConvert} className="p-6 space-y-4">
          <div className="bg-[#131D31] border border-[#24324D] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-300">{lead.studentName}</p>
                <p className="text-[11px] text-slate-400">Parent: {lead.guardianName} ({lead.phone})</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                {lead.targetGrade}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-amber-400" /> Admission Fee (INR) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={feeAmount}
                onChange={e => setFeeAmount(e.target.value)}
                className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Payment Channel
              </label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="UPI">UPI / QR Payment</option>
                <option value="CARD">Credit / Debit Card (POS)</option>
                <option value="NETBANKING">Net Banking Transfer</option>
                <option value="CASH">Cash Reception Desk</option>
                <option value="CHEQUE">Cheque / Demand Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Classroom Section Allocation *
            </label>
            <select
              value={selectedDivisionId}
              onChange={e => setSelectedDivisionId(e.target.value)}
              className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            >
              {divisions.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} (Capacity: {d.capacity} seats)
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-1 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Automated Actions Upon Confirmation:</span>
            </div>
            <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
              <li>Generates official Admission Number (<strong className="text-white">VT-2026-XXX</strong>)</li>
              <li>Creates Student, Primary Guardian & Enrollment records in Module 01</li>
              <li>Issues Fee Receipt & dispatches WhatsApp confirmation to parent</li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40 flex items-center gap-2 transition disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isSubmitting ? 'Enrolling...' : 'Confirm Fee & Enroll Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
