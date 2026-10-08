// VEDIC TREE OS — New Maintenance Ticket Modal (Module 08)
import React, { useState } from 'react';
import { X, Wrench, HelpCircle } from 'lucide-react';
import { defaultOperationsService } from '../../modules/operations/operations.service.js';

export function NewMaintenanceModal({ isOpen, onClose, context, onSuccess, onShowToast }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ELECTRICAL');
  const [priority, setPriority] = useState('MEDIUM');
  const [facilityId, setFacilityId] = useState('fac-001');
  const [description, setDescription] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const facilities = defaultOperationsService.getFacilities(context);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Please provide a title and detailed problem description.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const ticket = defaultOperationsService.reportMaintenanceIssue(context, {
        title: title.trim(),
        category,
        priority,
        facilityId,
        description: description.trim(),
        reportedBy: `${context.userRole || context.role || 'Staff Member'}`,
        estimatedCost: Number(estimatedCost) || null,
        assignedTo: assignedTo.trim() || null
      });

      onShowToast?.(`Maintenance ticket '${ticket.ticketNumber}' logged successfully.`);
      onSuccess?.(ticket);
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-100">Log Maintenance Work Order</h2>
              <p className="text-xs text-stone-400">Report repairs, electrical, HVAC or civil defects</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Issue Title *</label>
            <input
              type="text"
              placeholder="e.g. Ceiling fan regulator sparking in Class 101"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Trade Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
              >
                <option value="ELECTRICAL">Electrical</option>
                <option value="PLUMBING">Plumbing & Water</option>
                <option value="HVAC">HVAC & Air Conditioning</option>
                <option value="IT_INFRA">IT & Network Infra</option>
                <option value="CARPENTRY">Carpentry & Glass</option>
                <option value="CIVIL">Civil & Masonry</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Severity / Priority *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
              >
                <option value="LOW">Low (Routine)</option>
                <option value="MEDIUM">Medium (Normal)</option>
                <option value="HIGH">High (Urgent)</option>
                <option value="CRITICAL">Critical (Immediate Safety Hazard)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Campus Facility / Room *</label>
            <select
              value={facilityId}
              onChange={(e) => setFacilityId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
            >
              {facilities.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.facilityCode})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Detailed Defect Description *</label>
            <textarea
              rows={3}
              placeholder="Describe what happened, when it started, and exact room location..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Estimated Cost (₹)</label>
              <input
                type="number"
                placeholder="e.g. 1500"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Assign Technician / Agency</label>
              <input
                type="text"
                placeholder="e.g. Raju Electrician"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
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
              {loading ? 'Submitting...' : 'Dispatch Work Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
