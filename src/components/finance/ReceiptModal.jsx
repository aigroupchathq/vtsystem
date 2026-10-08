// VEDIC TREE OS — Printable Institutional Receipt Modal (Module 04)
import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck, Calendar, CreditCard } from 'lucide-react';
import { CurrencyService } from '../../modules/finance/currency.service.js';

export function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  let breakdown = [];
  try {
    breakdown = typeof receipt.breakdownJson === 'string' ? JSON.parse(receipt.breakdownJson) : (receipt.breakdownJson || []);
  } catch {
    breakdown = [];
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Ribbon */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 rounded-lg">
              <CheckCircle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">Official Fee Receipt</h3>
              <p className="text-xs text-stone-500 font-mono">{receipt.receiptNumber}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-6 overflow-y-auto space-y-6 receipt-print-area">
          {/* Institutional Header */}
          <div className="text-center pb-4 border-b border-stone-200 dark:border-stone-800">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-xl mb-2 font-sans font-bold text-xl">
              VT
            </div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight">VEDIC TREE INTERNATIONAL SCHOOL</h2>
            <p className="text-xs text-stone-500">Affiliated to CBSE, New Delhi • Pune Baner Campus</p>
            <p className="text-[11px] text-stone-400">CBSE Affiliation No: CBSE/AFF/1130492 • UDISE+: 27251401209</p>
          </div>

          {/* Student & Payment Summary Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">Student Details</span>
              <p className="font-semibold text-stone-800 dark:text-stone-200">{receipt.studentName}</p>
              <p className="text-stone-500 font-mono">Adm: {receipt.admissionNumber || 'N/A'}</p>
              <p className="text-stone-500">Grade: {receipt.gradeName || 'Standard'}</p>
            </div>
            <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">Settlement Info</span>
              <p className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-stone-400" /> {receipt.paymentMethod}
              </p>
              <p className="text-stone-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" /> {new Date(receipt.issuedAt).toLocaleDateString()}
              </p>
              <p className="text-stone-500 font-mono text-[11px]">Invoice: {receipt.invoiceId}</p>
            </div>
          </div>

          {/* Fee Item Breakdown */}
          <div>
            <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-2">Settlement Allocation</span>
            <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-500 font-medium border-b border-stone-200 dark:border-stone-800">
                  <tr>
                    <th className="px-3 py-2">Component</th>
                    <th className="px-3 py-2 text-right">Settled Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800/40">
                  {breakdown.length > 0 ? (
                    breakdown.map((item, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/20">
                        <td className="px-3 py-2 font-medium text-stone-800 dark:text-stone-200">{item.component}</td>
                        <td className="px-3 py-2 text-right font-mono text-stone-700 dark:text-stone-300">
                          {CurrencyService.format(item.settled, receipt.currency)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-3 py-2 text-stone-800 dark:text-stone-200">Tuition & Institutional Fee</td>
                      <td className="px-3 py-2 text-right font-mono text-stone-700 dark:text-stone-300">
                        {CurrencyService.format(receipt.amount, receipt.currency)}
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-emerald-50/60 dark:bg-emerald-950/20 border-t border-emerald-100 dark:border-emerald-900/50 font-semibold">
                  <tr>
                    <td className="px-3 py-2.5 text-emerald-900 dark:text-emerald-300">Total Cleared</td>
                    <td className="px-3 py-2.5 text-right font-mono text-emerald-700 dark:text-emerald-400 text-sm">
                      {CurrencyService.format(receipt.amount, receipt.currency)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Cashier Verification & Immutable Seal */}
          <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-900 dark:text-amber-300">Verified & Reconciled</p>
                <p className="text-[11px] text-amber-700 dark:text-amber-400/80">Issued by Cashier: {receipt.cashierName}</p>
              </div>
            </div>
            <span className="font-mono text-[10px] text-stone-400 bg-white dark:bg-stone-800 px-2 py-1 rounded border border-stone-200 dark:border-stone-700">
              IMMUTABLE
            </span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold bg-stone-900 hover:bg-black text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 rounded-xl shadow flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
