// VEDIC TREE OS — Process Refund Modal (Module 04)
import React, { useState } from 'react';
import { X, RotateCcw, AlertTriangle, ShieldAlert } from 'lucide-react';
import { FinanceService } from '../../modules/finance/finance.service.js';
import { CurrencyService } from '../../modules/finance/currency.service.js';

export function RefundModal({ payment, context, onClose, onRefundSuccess }) {
  const [amount, setAmount] = useState(() => payment?.amount || 0);
  const [reason, setReason] = useState('Parent concession / fee component adjustment');
  const [approverRemarks, setApproverRemarks] = useState('Approved by Principal per concession rules');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!payment) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const numAmount = Number(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        throw new Error('Please enter a valid refund amount.');
      }
      if (numAmount > payment.amount) {
        throw new Error(`Refund cannot exceed original payment amount of ${CurrencyService.format(payment.amount, payment.currency)}.`);
      }

      const refund = await FinanceService.issueRefund(context, {
        paymentId: payment.id,
        amount: numAmount,
        reason,
        approverRemarks
      });

      onRefundSuccess(refund);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 rounded-lg">
              <RotateCcw className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">Process Fee Refund</h3>
              <p className="text-xs text-stone-500 font-mono">{payment.paymentNumber} • {payment.studentName}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Warning Notice */}
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-800 dark:text-amber-300 space-y-1">
            <p className="font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" /> Double-Entry Reversal Notice
            </p>
            <p className="text-[11px] text-amber-700/80 dark:text-amber-400/80">
              Executing this refund will debit Student Accounts Receivable (1030) and credit Bank Clearing (1020). The linked invoice balance will be reopened.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Refund Amount ({payment.currency}) *
            </label>
            <input
              type="number"
              step="0.01"
              max={payment.amount}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none font-mono font-medium"
              required
            />
            <p className="text-[11px] text-stone-400 mt-1">Maximum refundable: {CurrencyService.format(payment.amount, payment.currency)}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Reason for Refund *</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
              placeholder="e.g. Bus transport cancellation"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Supervisor Approval Remarks</label>
            <textarea
              rows={2}
              value={approverRemarks}
              onChange={(e) => setApproverRemarks(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
              placeholder="Authorization note"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" /> Confirm Refund & Reverse Ledger
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
