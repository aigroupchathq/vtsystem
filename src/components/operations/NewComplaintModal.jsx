import React, { useState } from 'react';
import { X, MessageSquareWarning } from 'lucide-react';
import { db } from '../../database/db';

export function NewComplaintModal({ isOpen, onClose, onSuccess, currentCampusId, currentUserId }) {
  const [complainantName, setComplainantName] = useState('');
  const [complainantType, setComplainantType] = useState('PARENT');
  const [category, setCategory] = useState('ACADEMICS');
  const [priority, setPriority] = useState('MEDIUM');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complainantName.trim() || !subject.trim() || !description.trim()) {
      setError('Please provide complainant name, subject, and description.');
      return;
    }

    try {
      db.createComplaint({
        campusId: currentCampusId,
        complainantName,
        complainantType,
        category,
        priority,
        subject,
        description,
        createdById: currentUserId
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit grievance.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <MessageSquareWarning className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Log Parent / Student Grievance</h2>
              <p className="text-xs text-slate-400">Formal complaint tracking and SLA resolution lifecycle</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Complainant Name *</label>
              <input
                type="text"
                value={complainantName}
                onChange={(e) => setComplainantName(e.target.value)}
                placeholder="e.g. Mrs. Sunita Sharma"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Complainant Role</label>
              <select
                value={complainantType}
                onChange={(e) => setComplainantType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-violet-500"
              >
                <option value="PARENT">Parent</option>
                <option value="STUDENT">Student</option>
                <option value="STAFF">Staff Member</option>
                <option value="VISITOR">Visitor / Neighbor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-violet-500"
              >
                <option value="ACADEMICS">Academics & Curriculum</option>
                <option value="TRANSPORT">School Bus / Transport</option>
                <option value="INFRASTRUCTURE">Campus Infrastructure & Facilities</option>
                <option value="CANTEEN">Canteen & Food Quality</option>
                <option value="STAFF_BEHAVIOR">Staff Conduct</option>
                <option value="BILLING">Fees & Accounts</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Priority Level *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-violet-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent (SLA &lt; 24h)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Grievance Subject *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Route 12 bus delay on Western Highway"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Detailed Description *</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide exact dates, incidents, impact, and requested remedy..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-violet-500"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-colors"
            >
              Log Grievance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
