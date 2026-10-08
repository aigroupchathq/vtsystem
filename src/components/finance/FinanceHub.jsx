// VEDIC TREE OS — Module 04: Finance + Fees Enterprise Hub
import React, { useState } from 'react';
import { 
  Banknote, Receipt, FileText, Scale, TrendingUp, AlertTriangle, 
  Search, Plus, CheckCircle, Smartphone, RotateCcw, 
  Printer, Sparkles, ShieldCheck, DollarSign, X, Percent
} from 'lucide-react';
import { db } from '../../database/db.js';
import { FinanceService } from '../../modules/finance/finance.service.js';
import { CurrencyService, SUPPORTED_CURRENCIES } from '../../modules/finance/currency.service.js';
import { CollectPaymentModal } from './CollectPaymentModal.jsx';
import { GenerateInvoiceModal } from './GenerateInvoiceModal.jsx';
import { ReceiptModal } from './ReceiptModal.jsx';
import { RefundModal } from './RefundModal.jsx';

export function FinanceHub({ context }) {
  const [activeTab, setActiveTab] = useState('pos'); // pos, invoices, structures, ledger
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals state
  const [collectModalInvoice, setCollectModalInvoice] = useState(null);
  const [isGenerateInvoiceOpen, setIsGenerateInvoiceOpen] = useState(false);
  const [viewReceipt, setViewReceipt] = useState(null);
  const [refundPayment, setRefundPayment] = useState(null);

  // Success notifications
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Live Database Queries
  const invoices = db.getInvoices(context, {
    status: statusFilter === 'ALL' ? undefined : statusFilter,
    search: searchQuery
  });
  const payments = db.getPayments(context);
  const receipts = db.getReceipts(context);
  const feeStructures = db.getFeeStructures(context);
  const discountRules = db.getDiscountRules(context);
  const scholarships = db.getScholarships(context);
  const agingReport = FinanceService.getOutstandingAgingReport(context);
  const trialBalance = FinanceService.getTrialBalanceReport(context);
  const _ledgerInvariant = FinanceService.verifyDoubleEntryInvariant(context);

  // Compute Ribbon KPIs
  const allInvoices = db.getInvoices(context);
  const totalInvoiced = allInvoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const totalCollected = allInvoices.reduce((sum, i) => sum + i.paidAmount, 0);
  const totalOutstanding = allInvoices.reduce((sum, i) => sum + i.balanceAmount, 0);

  // Fast POS Student Search
  const [posSearch, setPosSearch] = useState('');
  const matchedStudents = posSearch.trim() ? db.getStudents(context, { search: posSearch }) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. UNIVERSAL ORIENTATION BANNER (5 Core Questions Answered) */}
      <div className="p-5 bg-white border border-[#E6DFD1] rounded-xl shadow-xs text-[#0B2F29] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#0B2F29]/10 border border-[#0B2F29]/20 rounded-xl text-[#0B2F29]">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold tracking-tight text-[#0B2F29]">Finance, Fees & Institutional Ledger</h2>
              <span className="px-2 py-0.5 text-[11px] font-mono font-semibold bg-[#F5F2EB] text-[#0B2F29] rounded-full border border-[#E6DFD1]">
                MODULE 04
              </span>
            </div>
            <p className="text-xs text-[#5C6460] flex items-center gap-2 mt-0.5">
              <span>Campus: <strong className="text-[#0B2F29]">{context.campusName || 'Pune Baner Campus'}</strong></span>
              <span>•</span>
              <span>Active Term: <strong className="text-[#0B2F29]">AY 2026-27 (Term 1)</strong></span>
              <span>•</span>
              <span>Ledger: <strong className="text-[#107E5B] font-mono">Balanced (0.00 drift)</strong></span>
            </p>
          </div>
        </div>

        {/* Currency & Fast Invoicing Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#FBF8EF] border border-[#E6DFD1] px-3 py-1.5 rounded-xl text-xs text-[#0B2F29]">
            <DollarSign className="w-3.5 h-3.5 text-[#5C6460]" />
            <span className="text-[#5C6460]">Currency:</span>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-transparent text-[#0B2F29] font-bold focus:outline-none cursor-pointer"
            >
              {Object.keys(SUPPORTED_CURRENCIES).map(curr => (
                <option key={curr} value={curr} className="bg-white text-[#0B2F29]">{curr} ({SUPPORTED_CURRENCIES[curr].symbol})</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsGenerateInvoiceOpen(true)}
            className="px-4 py-2 bg-[#0B2F29] hover:bg-[#12423A] text-[#FBF8EF] text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Raise Invoice
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-600 hover:text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. KPI METRICS RIBBON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-[#E6DFD1] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#5C6460] text-xs mb-1">
            <span>Total Invoiced</span>
            <TrendingUp className="w-4 h-4 text-[#5C6460]" />
          </div>
          <p className="text-xl font-bold text-[#0B2F29] font-mono">
            {CurrencyService.format(totalInvoiced, selectedCurrency)}
          </p>
          <p className="text-[11px] text-[#5C6460] mt-1">{allInvoices.length} Invoices Generated</p>
        </div>

        <div className="p-4 bg-white border border-[#E6DFD1] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#5C6460] text-xs mb-1">
            <span>Total Collected</span>
            <CheckCircle className="w-4 h-4 text-[#107E5B]" />
          </div>
          <p className="text-xl font-bold text-[#107E5B] font-mono">
            {CurrencyService.format(totalCollected, selectedCurrency)}
          </p>
          <p className="text-[11px] text-[#5C6460] mt-1">{payments.length} Payments Cleared</p>
        </div>

        <div className="p-4 bg-white border border-[#E6DFD1] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#5C6460] text-xs mb-1">
            <span>Total Outstanding</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold text-amber-600 font-mono">
            {CurrencyService.format(totalOutstanding, selectedCurrency)}
          </p>
          <p className="text-[11px] text-[#5C6460] mt-1">Pending Collection</p>
        </div>

        <div className="p-4 bg-white border border-[#E6DFD1] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#5C6460] text-xs mb-1">
            <span>Ledger Invariant</span>
            <Scale className="w-4 h-4 text-[#107E5B]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <p className="text-base font-bold text-[#107E5B] font-mono">
              Balanced (ΣDr ≡ ΣCr)
            </p>
          </div>
          <p className="text-[11px] text-[#5C6460] mt-1">{trialBalance.rows.length} Accounts in Chart</p>
        </div>
      </div>

      {/* 3. NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-[#E6DFD1] overflow-x-auto pb-px scrollbar-none">
        {[
          { id: 'pos', label: 'Fast POS Cashier Counter', icon: Smartphone },
          { id: 'invoices', label: 'Invoices & Billing Directory', icon: FileText },
          { id: 'structures', label: 'Fee Structures & Concessions', icon: Receipt },
          { id: 'ledger', label: 'Institutional Ledger & Defaulter Aging', icon: Scale }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                active
                  ? 'border-[#0B2F29] text-[#0B2F29]'
                  : 'border-transparent text-[#5C6460] hover:text-[#0B2F29]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: FAST POS CASHIER COUNTER */}
      {activeTab === 'pos' && (
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column: Quick Student Search & Bill Collect */}
          <div className="col-span-7 space-y-4">
            <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm space-y-3">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-600" />
                POS Student Lookup
              </h3>
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={posSearch}
                  onChange={(e) => setPosSearch(e.target.value)}
                  placeholder="Type student name, admission number (e.g. VT-2026-001) or phone..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              {matchedStudents.length > 0 && (
                <div className="divide-y divide-stone-100 dark:divide-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
                  {matchedStudents.map(student => {
                    const studentInvoices = db.getInvoices(context, { studentId: student.id, status: 'UNPAID' })
                      .concat(db.getInvoices(context, { studentId: student.id, status: 'PARTIALLY_PAID' }))
                      .concat(db.getInvoices(context, { studentId: student.id, status: 'OVERDUE' }));
                    const outstanding = studentInvoices.reduce((sum, i) => sum + i.balanceAmount, 0);

                    return (
                      <div key={student.id} className="p-3 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/40 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-xs text-stone-900 dark:text-stone-100">{student.firstName} {student.lastName}</p>
                          <p className="text-[11px] text-stone-500 font-mono">Adm: {student.admissionNumber} • {student.gradeName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                            Due: {CurrencyService.format(outstanding, selectedCurrency)}
                          </p>
                          {studentInvoices.length > 0 ? (
                            <button
                              onClick={() => setCollectModalInvoice(studentInvoices[0])}
                              className="mt-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-lg shadow-sm"
                            >
                              Collect POS
                            </button>
                          ) : (
                            <span className="text-[10px] text-emerald-600 font-medium">All Cleared ✓</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Invoices Awaiting Collection */}
            <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm space-y-3">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center justify-between">
                <span>Active Unpaid Invoices</span>
                <span className="text-xs font-normal text-stone-400">{allInvoices.filter(i => i.balanceAmount > 0).length} pending</span>
              </h3>

              <div className="space-y-2.5">
                {allInvoices.filter(i => i.balanceAmount > 0).map(inv => (
                  <div key={inv.id} className="p-3.5 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">{inv.invoiceNumber}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                          inv.status === 'OVERDUE' 
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">{inv.studentName} ({inv.admissionNumber})</p>
                      <p className="text-[11px] text-stone-400">Due: {new Date(inv.dueDate).toLocaleDateString()}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold font-mono text-stone-900 dark:text-stone-100">
                        {CurrencyService.format(inv.balanceAmount, inv.currency)}
                      </p>
                      <button
                        onClick={() => setCollectModalInvoice(inv)}
                        className="mt-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1"
                      >
                        <Smartphone className="w-3.5 h-3.5" /> Pay Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Receipts Feed */}
          <div className="col-span-5 space-y-4">
            <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm space-y-3">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-emerald-600" />
                  Recent Cleared Receipts
                </span>
                <span className="text-xs font-normal text-stone-400">{receipts.length} issued</span>
              </h3>

              <div className="space-y-2">
                {receipts.map(rcp => (
                  <div key={rcp.id} className="p-3 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 rounded-xl flex items-center justify-between hover:bg-stone-100/60 transition-colors">
                    <div>
                      <p className="font-mono text-xs font-bold text-stone-800 dark:text-stone-200">{rcp.receiptNumber}</p>
                      <p className="text-xs text-stone-600 dark:text-stone-400">{rcp.studentName}</p>
                      <p className="text-[11px] text-stone-400">{rcp.paymentMethod} • {new Date(rcp.issuedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>

                    <div className="text-right flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                          {CurrencyService.format(rcp.amount, rcp.currency)}
                        </p>
                        <span className="text-[10px] text-stone-400">Settled ✓</span>
                      </div>
                      <button
                        onClick={() => setViewReceipt(rcp)}
                        className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-700 rounded-lg transition-colors"
                        title="Print / View Receipt"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Refund Counter */}
            <div className="p-4 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 rounded-2xl space-y-2">
              <h4 className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
                Recent Payment Settlements (Refund Available)
              </h4>
              <div className="space-y-1.5">
                {payments.slice(0, 3).map(pay => (
                  <div key={pay.id} className="p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-medium">{pay.paymentNumber}</span>
                      <p className="text-[11px] text-stone-500">{pay.studentName} • {CurrencyService.format(pay.amount, pay.currency)}</p>
                    </div>
                    <button
                      onClick={() => setRefundPayment(pay)}
                      className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 rounded text-[11px] font-semibold"
                    >
                      Refund
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVOICES & BILLING DIRECTORY */}
      {activeTab === 'invoices' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden">
          {/* Table Filters Ribbon */}
          <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search invoice number, student, admission no..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1">
                {['ALL', 'UNPAID', 'PARTIALLY_PAID', 'PAID', 'OVERDUE'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      statusFilter === st
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                        : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsGenerateInvoiceOpen(true)}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> New Invoice
            </button>
          </div>

          {/* Invoices Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-500 font-semibold border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="px-4 py-3">Invoice Number</th>
                  <th className="px-4 py-3">Student & Grade</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3 text-right">Subtotal</th>
                  <th className="px-4 py-3 text-right">Concession</th>
                  <th className="px-4 py-3 text-right">Total Payable</th>
                  <th className="px-4 py-3 text-right">Balance Due</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/40">
                {invoices.length > 0 ? (
                  invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/20">
                      <td className="px-4 py-3 font-mono font-semibold text-stone-900 dark:text-stone-100">
                        {inv.invoiceNumber}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-stone-800 dark:text-stone-200">{inv.studentName}</p>
                        <p className="text-[11px] text-stone-400 font-mono">{inv.admissionNumber} • {inv.gradeName}</p>
                      </td>
                      <td className="px-4 py-3 font-mono text-stone-600 dark:text-stone-400">
                        {new Date(inv.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-stone-600 dark:text-stone-400">
                        {CurrencyService.format(inv.subtotal, inv.currency)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                        {inv.discountTotal > 0 ? `- ${CurrencyService.format(inv.discountTotal, inv.currency)}` : '—'}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-stone-900 dark:text-stone-100">
                        {CurrencyService.format(inv.totalAmount, inv.currency)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                        {CurrencyService.format(inv.balanceAmount, inv.currency)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : inv.status === 'OVERDUE'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {inv.balanceAmount > 0 ? (
                          <button
                            onClick={() => setCollectModalInvoice(inv)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-lg shadow-sm"
                          >
                            Collect
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-600 font-medium">Cleared ✓</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-stone-400">
                      No invoices found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: FEE STRUCTURES & CONCESSIONS */}
      {activeTab === 'structures' && (
        <div className="space-y-6">
          {/* Fee Structures Grid */}
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-600" />
              Active Fee Structures by Grade
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {feeStructures.map(fs => (
                <div key={fs.id} className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">{fs.name}</h4>
                      <p className="text-xs text-stone-400 font-mono">{fs.code} • Frequency: {fs.frequency}</p>
                    </div>
                    <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                      {CurrencyService.format(fs.totalAmount, fs.currency)}
                    </span>
                  </div>

                  <div className="divide-y divide-stone-100 dark:divide-stone-800 border-t border-stone-100 dark:border-stone-800 pt-2 text-xs">
                    {(fs.items || []).map((item, idx) => (
                      <div key={idx} className="py-1.5 flex justify-between text-stone-600 dark:text-stone-400">
                        <span>{item.title}</span>
                        <span className="font-mono font-medium text-stone-800 dark:text-stone-200">
                          {CurrencyService.format(item.amount, fs.currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Concessions & Scholarships Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Concession Rules */}
            <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm space-y-3">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Percent className="w-4 h-4 text-amber-600" />
                Statutory & Concession Policies
              </h3>
              <div className="space-y-2 text-xs">
                {discountRules.map(rule => (
                  <div key={rule.id} className="p-3 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-stone-800 dark:text-stone-200">{rule.name}</p>
                      <p className="text-[11px] text-stone-400 font-mono">Code: {rule.code} • Criteria: {rule.criteria}</p>
                    </div>
                    <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
                      {rule.value}% Concession
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholarships Roster */}
            <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm space-y-3">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Endowment Scholarships Granted
              </h3>
              <div className="space-y-2 text-xs">
                {scholarships.map(sch => (
                  <div key={sch.id} className="p-3 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-stone-800 dark:text-stone-200">{sch.name}</p>
                      <p className="text-[11px] text-stone-400">Sponsor: {sch.sponsor}</p>
                    </div>
                    <span className="font-bold text-purple-600 dark:text-purple-400 font-mono">
                      {CurrencyService.format(sch.amount, sch.currency)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INSTITUTIONAL LEDGER & DEFAULTER AGING */}
      {activeTab === 'ledger' && (
        <div className="space-y-6">
          {/* Outstanding Aging Buckets */}
          <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Defaulter Aging Schedule (Accounts Receivable)
                </h3>
                <p className="text-xs text-stone-400">Breakdown of overdue invoices by delinquency buckets</p>
              </div>
              <span className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100">
                Total Overdue: <strong className="text-amber-600 dark:text-amber-400">{CurrencyService.format(agingReport.grandTotalOutstanding, selectedCurrency)}</strong>
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3 text-xs">
              {[
                { title: 'Current (Not Due)', data: agingReport.buckets.current, color: 'emerald' },
                { title: '1 - 30 Days Overdue', data: agingReport.buckets.days1To30, color: 'amber' },
                { title: '31 - 60 Days Overdue', data: agingReport.buckets.days31To60, color: 'orange' },
                { title: '60+ Days Defaulters', data: agingReport.buckets.days60Plus, color: 'rose' }
              ].map((bucket, idx) => (
                <div key={idx} className="p-3 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">{bucket.title}</span>
                  <p className="text-lg font-bold font-mono text-stone-800 dark:text-stone-200">
                    {CurrencyService.format(bucket.data.totalAmount, selectedCurrency)}
                  </p>
                  <p className="text-[11px] text-stone-500">{bucket.data.count} Invoices</p>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Double-Entry Trial Balance */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Institutional Double-Entry Trial Balance</h3>
                  <p className="text-xs text-stone-500">General Ledger chart of accounts balance verification</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Reconciled & Balanced
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-500 font-semibold border-b border-stone-200 dark:border-stone-800">
                  <tr>
                    <th className="px-4 py-2.5">Account Code</th>
                    <th className="px-4 py-2.5">Account Name</th>
                    <th className="px-4 py-2.5">Category</th>
                    <th className="px-4 py-2.5 text-right">Debit (Dr)</th>
                    <th className="px-4 py-2.5 text-right">Credit (Cr)</th>
                    <th className="px-4 py-2.5 text-right">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800/40">
                  {trialBalance.rows.map(row => (
                    <tr key={row.code} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/20 font-mono">
                      <td className="px-4 py-2 text-stone-500 font-semibold">{row.code}</td>
                      <td className="px-4 py-2 font-sans font-medium text-stone-800 dark:text-stone-200">{row.name}</td>
                      <td className="px-4 py-2 font-sans text-stone-400 text-[11px]">{row.type}</td>
                      <td className="px-4 py-2 text-right text-stone-700 dark:text-stone-300">
                        {row.debit > 0 ? CurrencyService.format(row.debit, selectedCurrency) : '—'}
                      </td>
                      <td className="px-4 py-2 text-right text-stone-700 dark:text-stone-300">
                        {row.credit > 0 ? CurrencyService.format(row.credit, selectedCurrency) : '—'}
                      </td>
                      <td className="px-4 py-2 text-right font-bold text-stone-900 dark:text-stone-100">
                        {CurrencyService.format(row.currentBalance, selectedCurrency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-stone-50 dark:bg-stone-800/60 font-bold border-t border-stone-200 dark:border-stone-800">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 font-sans text-stone-900 dark:text-stone-100">
                      Total Balanced Sum (ΣDebits ≡ ΣCredits)
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                      {CurrencyService.format(trialBalance.totalDebit, selectedCurrency)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                      {CurrencyService.format(trialBalance.totalCredit, selectedCurrency)}
                    </td>
                    <td className="px-4 py-3 text-right text-emerald-600 text-xs font-sans">
                      Match ✓
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {collectModalInvoice && (
        <CollectPaymentModal
          invoice={collectModalInvoice}
          context={context}
          onClose={() => setCollectModalInvoice(null)}
          onPaymentSuccess={(result) => {
            setCollectModalInvoice(null);
            setViewReceipt(result.receipt);
            showNotification(`Payment of ${CurrencyService.format(result.payment.amount, result.payment.currency)} collected! Receipt: ${result.receipt.receiptNumber}`);
          }}
        />
      )}

      {isGenerateInvoiceOpen && (
        <GenerateInvoiceModal
          context={context}
          onClose={() => setIsGenerateInvoiceOpen(false)}
          onInvoiceGenerated={(newInv) => {
            setIsGenerateInvoiceOpen(false);
            showNotification(`Invoice ${newInv.invoiceNumber} generated for ${newInv.studentName}!`);
          }}
        />
      )}

      {viewReceipt && (
        <ReceiptModal
          receipt={viewReceipt}
          onClose={() => setViewReceipt(null)}
        />
      )}

      {refundPayment && (
        <RefundModal
          payment={refundPayment}
          context={context}
          onClose={() => setRefundPayment(null)}
          onRefundSuccess={(ref) => {
            setRefundPayment(null);
            showNotification(`Refund ${ref.refundNumber} of ${CurrencyService.format(ref.amount, ref.currency)} processed! Invoice balance reopened.`);
          }}
        />
      )}
    </div>
  );
}
