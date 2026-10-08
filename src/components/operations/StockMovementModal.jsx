// VEDIC TREE OS — Stock Movement Modal (Module 08)
import React, { useState } from 'react';
import { X, ArrowDownRight, ArrowUpRight, HelpCircle } from 'lucide-react';
import { defaultOperationsService } from '../../modules/operations/operations.service.js';

export function StockMovementModal({ isOpen, onClose, context, item, onSuccess, onShowToast }) {
  const [type, setType] = useState('INWARD'); // INWARD | OUTWARD | AUDIT_ADJUSTMENT
  const [quantity, setQuantity] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [issuedTo, setIssuedTo] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const qty = Number(quantity);
    if (!qty || qty <= 0) {
      setError('Please enter a valid positive quantity.');
      return;
    }

    if (type === 'OUTWARD' && qty > item.currentStock) {
      setError(`Cannot dispatch ${qty} ${item.unit}: current stock is only ${item.currentStock} ${item.unit}.`);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const tx = defaultOperationsService.recordStockMovement(context, {
        itemId: item.id,
        type,
        quantity: qty,
        referenceNumber: referenceNumber.trim() || null,
        issuedTo: issuedTo.trim() || null,
        performedBy: 'Store Supervisor',
        notes: notes.trim() || null
      });

      onShowToast?.(`Stock ${type.toLowerCase()} of ${qty} ${item.unit} recorded. New balance: ${tx.balanceAfter}.`);
      onSuccess?.(tx);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/60">
          <div>
            <h2 className="text-base font-bold text-stone-100">Stock Movement & Dispatch</h2>
            <p className="text-xs text-stone-400">{item.name} ({item.itemCode})</p>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Stock Banner */}
        <div className="px-6 py-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-400">Current In-Stock Balance:</span>
          <span className="text-sm font-bold text-amber-400 font-mono">{item.currentStock} {item.unit}</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Movement Type Buttons */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">Movement Type *</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('INWARD')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  type === 'INWARD'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <ArrowDownRight className="w-4 h-4" />
                <span>Inward Consignment</span>
              </button>
              <button
                type="button"
                onClick={() => setType('OUTWARD')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  type === 'OUTWARD'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-sm'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Outward Issue</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Quantity ({item.unit}) *</label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
              required
            />
          </div>

          {type === 'OUTWARD' && (
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Issued To (Department / Person) *</label>
              <input
                type="text"
                placeholder="e.g. Examination Cell / Science Faculty"
                value={issuedTo}
                onChange={(e) => setIssuedTo(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Reference Number (PO / Requisition)</label>
            <input
              type="text"
              placeholder="e.g. REQ-EXAM-45 or PO-2026-004"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Remarks / Audit Notes</label>
            <textarea
              rows={2}
              placeholder="e.g. Urgent stock requisition for Term 1 examination question booklets."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-stone-200 rounded-xl hover:bg-stone-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-xl transition-all shadow-md shadow-amber-600/20 disabled:opacity-50"
            >
              {loading ? 'Recording...' : 'Commit Stock Movement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
