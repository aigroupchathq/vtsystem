// VEDIC TREE OS — Generate Invoice Modal (Module 04)
import React, { useState } from 'react';
import { X, Plus, Trash2, FileText, CheckCircle, AlertCircle, Percent } from 'lucide-react';
import { FinanceService } from '../../modules/finance/finance.service.js';
import { CurrencyService } from '../../modules/finance/currency.service.js';
import { db } from '../../database/db.js';

export function GenerateInvoiceModal({ context, onClose, onInvoiceGenerated }) {
  const students = db.getStudents(context);
  const discountRules = db.getDiscountRules(context);

  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [currency] = useState('INR');
  const [dueDate, setDueDate] = useState(() => new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0]);
  const [notes, setNotes] = useState('Term 1 Standard Academic Fees');
  const [lateFee, setLateFee] = useState(0);
  const [selectedDiscountIds, setSelectedDiscountIds] = useState([]);

  const [items, setItems] = useState([
    { component: 'TUITION', title: 'Tuition & Academic Program', amount: 50000 },
    { component: 'LAB', title: 'STEM & Robotics Lab Consumables', amount: 15000 },
    { component: 'LIBRARY', title: 'Library & Online Learning Kits', amount: 5000 }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddItem = () => {
    setItems([...items, { component: 'MISC', title: 'Additional Component', amount: 5000 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === 'amount' ? (Number(value) || 0) : value;
    setItems(updated);
  };

  const toggleDiscount = (id) => {
    if (selectedDiscountIds.includes(id)) {
      setSelectedDiscountIds(selectedDiscountIds.filter(d => d !== id));
    } else {
      setSelectedDiscountIds([...selectedDiscountIds, id]);
    }
  };

  // Preview Calculations
  const activeDiscounts = discountRules.filter(r => selectedDiscountIds.includes(r.id));
  const studentScholarships = studentId ? db.getScholarships(context, studentId).filter(s => s.status === 'ACTIVE') : [];
  const concessionPreview = FinanceService.calculateConcession({
    items,
    discountRules: activeDiscounts,
    scholarships: studentScholarships
  });

  const subtotal = items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
  const totalDiscount = concessionPreview.totalDiscount;
  const netTotal = Math.max(0, subtotal - totalDiscount + (Number(lateFee) || 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!studentId) throw new Error('Please select a student.');
      if (items.length === 0) throw new Error('Invoice must contain at least one line item.');

      const newInvoice = FinanceService.generateInvoice(context, {
        studentId,
        items,
        discountRuleIds: selectedDiscountIds,
        lateFeeTotal: Number(lateFee) || 0,
        dueDate: new Date(dueDate).toISOString(),
        notes,
        currency
      });

      onInvoiceGenerated(newInvoice);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Generate Student Invoice
            </h3>
            <p className="text-xs text-stone-500">Create immutable fee billing record with line item concessions & ledger entry</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Student & Due Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Select Student *</label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
                required
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.firstName} {s.lastName} ({s.admissionNumber}) • {s.gradeName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Due Date *</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none font-mono"
                required
              />
            </div>
          </div>

          {/* Line Items Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Fee Components & Line Items</label>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Component
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700">
                  <select
                    value={item.component}
                    onChange={(e) => handleItemChange(idx, 'component', e.target.value)}
                    className="w-32 px-2 py-1.5 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none"
                  >
                    <option value="TUITION">TUITION</option>
                    <option value="TRANSPORT">TRANSPORT</option>
                    <option value="LAB">LAB</option>
                    <option value="LIBRARY">LIBRARY</option>
                    <option value="ADMISSION">ADMISSION</option>
                    <option value="SPORTS">SPORTS</option>
                    <option value="MISC">MISC</option>
                  </select>

                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemChange(idx, 'title', e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none"
                    placeholder="Component Title"
                  />

                  <div className="relative w-28">
                    <span className="absolute left-2.5 top-1.5 text-xs text-stone-400">₹</span>
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleItemChange(idx, 'amount', e.target.value)}
                      className="w-full pl-6 pr-2 py-1.5 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none font-mono"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    disabled={items.length <= 1}
                    className="p-1.5 text-stone-400 hover:text-rose-500 rounded-lg disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Discount Rules Concessions */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-amber-600" /> Apply Concession Rules
            </label>
            <div className="grid grid-cols-2 gap-2">
              {discountRules.map(rule => {
                const active = selectedDiscountIds.includes(rule.id);
                return (
                  <button
                    key={rule.id}
                    type="button"
                    onClick={() => toggleDiscount(rule.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      active
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-medium'
                        : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <p className="font-semibold text-stone-800 dark:text-stone-200">{rule.name}</p>
                    <p className="text-[11px] text-stone-500">{rule.value}% off Tuition • {rule.code}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Late Fee & Notes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Late Fee Penalty (Optional)</label>
              <input
                type="number"
                value={lateFee}
                onChange={(e) => setLateFee(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none font-mono"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Invoice Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
                placeholder="Billing notes"
              />
            </div>
          </div>

          {/* Summary Computation Box */}
          <div className="p-4 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl space-y-1.5 text-xs">
            <div className="flex justify-between text-stone-600 dark:text-stone-400">
              <span>Gross Line Items Subtotal</span>
              <span className="font-mono">{CurrencyService.format(subtotal, currency)}</span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>Applied Concessions & Scholarships</span>
                <span className="font-mono">- {CurrencyService.format(totalDiscount, currency)}</span>
              </div>
            )}
            {lateFee > 0 && (
              <div className="flex justify-between text-amber-600 dark:text-amber-400">
                <span>Late Fee Penalty</span>
                <span className="font-mono">+ {CurrencyService.format(lateFee, currency)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between font-bold text-sm text-stone-900 dark:text-stone-100">
              <span>Net Payable Amount</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                {CurrencyService.format(netTotal, currency)}
              </span>
            </div>
          </div>

          {/* Actions */}
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
              className="px-5 py-2.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" /> Generate Invoice & Post Ledger
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
