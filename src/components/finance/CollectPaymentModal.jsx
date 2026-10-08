// VEDIC TREE OS — Fast POS Payment Collection Modal (Module 04)
import React, { useState, useEffect } from 'react';
import { X, QrCode, CreditCard, Banknote, Landmark, CheckCircle, AlertCircle, RefreshCw, Smartphone } from 'lucide-react';
import { FinanceService } from '../../modules/finance/finance.service.js';
import { CurrencyService } from '../../modules/finance/currency.service.js';

export function CollectPaymentModal({ invoice, context, onClose, onPaymentSuccess }) {
  const [amount, setAmount] = useState(() => invoice?.balanceAmount || 0);
  const [method, setMethod] = useState('UPI');
  const [transactionRef, setTransactionRef] = useState('');
  const [payerName, setPayerName] = useState(() => invoice?.studentName || '');
  const [payerPhone, setPayerPhone] = useState('');
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (invoice && method === 'UPI' && invoice.currency === 'INR') {
      FinanceService.initiatePaymentOrder(context, {
        invoiceId: invoice.id,
        amount: Number(amount) || invoice.balanceAmount,
        method: 'UPI'
      }).catch((err) => {
        console.error('Failed to generate UPI order:', err);
      });
    }
  }, [invoice, method, amount, context]);

  if (!invoice) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const numAmount = Number(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        throw new Error('Please enter a valid payment amount greater than zero.');
      }
      if (numAmount > invoice.balanceAmount + 0.01) {
        throw new Error(`Amount cannot exceed outstanding balance of ${CurrencyService.format(invoice.balanceAmount, invoice.currency)}.`);
      }

      const result = await FinanceService.collectPayment(context, {
        invoiceId: invoice.id,
        amount: numAmount,
        method,
        transactionRef: transactionRef || (method === 'UPI' ? `UPI/${Date.now().toString().slice(-8)}` : `TXN/${Date.now().toString().slice(-8)}`),
        gatewayProvider: method === 'UPI' ? 'RAZORPAY' : (method === 'CARD' ? 'STRIPE' : 'MANUAL'),
        payerName,
        payerPhone,
        remarks: remarks || `Fast POS Desk collection via ${method}`
      });

      onPaymentSuccess(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Banknote className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Collect Fee Payment
            </h3>
            <p className="text-xs text-stone-500">Invoice: <span className="font-mono font-medium">{invoice.invoiceNumber}</span> • {invoice.studentName}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Amount Balance Ribbon */}
          <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-emerald-700/80 dark:text-emerald-400 tracking-wider">Outstanding Balance</span>
              <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                {CurrencyService.format(invoice.balanceAmount, invoice.currency)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAmount(invoice.balanceAmount)}
              className="text-xs font-semibold px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-colors"
            >
              Pay Full Balance
            </button>
          </div>

          {/* Payment Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Amount to Collect ({invoice.currency}) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-stone-400 font-semibold text-sm">
                {CurrencyService.getCurrency(invoice.currency).symbol}
              </span>
              <input
                type="number"
                step="0.01"
                min="1"
                max={invoice.balanceAmount}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-medium"
                required
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Payment Method *
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'UPI', label: 'UPI / QR', icon: Smartphone },
                { id: 'CARD', label: 'Card', icon: CreditCard },
                { id: 'NETBANKING', label: 'NetBank', icon: Landmark },
                { id: 'CASH', label: 'Cash', icon: Banknote }
              ].map(m => {
                const Icon = m.icon;
                const active = method === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      active
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold shadow-sm'
                        : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic UPI Section (if method is UPI) */}
          {method === 'UPI' && (
            <div className="p-4 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300">
                <QrCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Dynamic UPI QR Code (Google Pay / PhonePe / Paytm / BHIM)
              </div>
              
              <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-700 inline-block shadow-sm">
                <div className="w-36 h-36 mx-auto bg-stone-100 dark:bg-stone-800 flex flex-col items-center justify-center rounded border border-dashed border-stone-300 dark:border-stone-600 p-2">
                  <QrCode className="w-20 h-20 text-stone-800 dark:text-stone-200 opacity-90" />
                  <span className="text-[10px] text-stone-500 font-mono mt-1">Scan & Pay</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 font-mono">
                Merchant VPA: <span className="font-semibold text-stone-700 dark:text-stone-300">vedictree@razorpay</span>
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                Amount: {CurrencyService.format(amount, invoice.currency)}
              </p>
            </div>
          )}

          {/* Transaction Ref & Payer Details */}
          <div className="grid grid-cols-3 gap-2.5 text-xs">
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">Payer Name</label>
              <input
                type="text"
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
                placeholder="Parent / Guardian"
              />
            </div>
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">Phone Number</label>
              <input
                type="tel"
                value={payerPhone}
                onChange={(e) => setPayerPhone(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none font-mono"
                placeholder="+91 98200 12345"
              />
            </div>
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">UTR / Txn Ref</label>
              <input
                type="text"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none font-mono"
                placeholder="e.g. 260999482103"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">Cashier Remarks / Settlement Note</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
              placeholder="e.g. Cleared at Baner Admin Reception Counter"
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
              className="px-5 py-2.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Recording Payment...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" /> Collect & Issue Receipt
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
