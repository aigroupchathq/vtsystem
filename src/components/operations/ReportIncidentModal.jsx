import React, { useState } from 'react';
import { X, AlertTriangle, ShieldAlert, Lock } from 'lucide-react';
import { db } from '../../database/db';

export function ReportIncidentModal({ isOpen, onClose, onSuccess, currentCampusId, currentUserId }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('INJURY');
  const [severity, setSeverity] = useState('LOW');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [personsInvolved, setPersonsInvolved] = useState('');
  const [isSensitive, setIsSensitive] = useState(false);
  const [sensitiveNotes, setSensitiveNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setCategory(cat);
    if (['SAFEGUARDING', 'BULLYING', 'HARASSMENT', 'MEDICAL_EMERGENCY'].includes(cat)) {
      setIsSensitive(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }

    try {
      const persons = personsInvolved
        ? personsInvolved.split(',').map((p) => p.trim()).filter(Boolean)
        : [];

      db.createIncident({
        campusId: currentCampusId,
        title,
        category,
        severity,
        location,
        description,
        personsInvolvedJson: JSON.stringify(persons),
        isSensitive,
        sensitiveNotes: isSensitive ? sensitiveNotes : null,
        reportedById: currentUserId
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to report incident.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Log Safety or Disciplinary Incident</h2>
              <p className="text-xs text-slate-400">Campus occurrence reporting with mandatory safeguarding privacy controls</p>
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
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Incident Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Minor playground slip during recess"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Category *</label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
              >
                <option value="INJURY">Minor Injury</option>
                <option value="MEDICAL_EMERGENCY">Medical Emergency</option>
                <option value="PROPERTY_DAMAGE">Property Damage</option>
                <option value="DISCIPLINARY">Disciplinary Infraction</option>
                <option value="SAFEGUARDING">Safeguarding / Child Protection</option>
                <option value="BULLYING">Bullying Report</option>
                <option value="HARASSMENT">Harassment Report</option>
                <option value="SECURITY_BREACH">Security Breach</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Severity Level *</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
              >
                <option value="LOW">Low (First Aid / Minor)</option>
                <option value="MEDIUM">Medium (Requires Parent Call)</option>
                <option value="HIGH">High (Hospital / Disciplinary Action)</option>
                <option value="CRITICAL">Critical (Immediate Principal / POSCO Escalation)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Campus Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Primary Playground Swings / Science Lab 2"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Persons Involved (comma-separated names/IDs)</label>
            <input
              type="text"
              value={personsInvolved}
              onChange={(e) => setPersonsInvolved(e.target.value)}
              placeholder="e.g. Aarav Patel (Grade 4B), Rohan Mehta (Grade 4B)"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">General Description *</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide objective facts of what occurred, time, and immediate first actions taken..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
              required
            />
          </div>

          {/* Safeguarding Privacy Toggle & Warning */}
          <div className={`p-3.5 rounded-xl border transition-colors ${
            isSensitive
              ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              : 'bg-slate-950/60 border-slate-800 text-slate-400'
          }`}>
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="isSensitiveCheckbox"
                checked={isSensitive}
                onChange={(e) => setIsSensitive(e.target.checked)}
                className="mt-1 rounded bg-slate-900 border-slate-700 text-rose-500 focus:ring-rose-500"
              />
              <div className="flex-1">
                <label htmlFor="isSensitiveCheckbox" className="text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Mark as Confidential / Safeguarding Incident
                </label>
                <p className="text-[11px] mt-0.5 text-slate-400 leading-relaxed">
                  Confidential incidents are strictly restricted to campus leaders and designated child protection officers. General teaching staff and unauthorized users will only see a redacted placeholder with zero names or details.
                </p>

                {isSensitive && (
                  <div className="mt-3 pt-3 border-t border-rose-500/20">
                    <label className="block text-[11px] font-semibold text-rose-300 mb-1 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-rose-400" />
                      Confidential Investigation Notes (Zero-Leakage Safeguard Vault)
                    </label>
                    <textarea
                      rows="2"
                      value={sensitiveNotes}
                      onChange={(e) => setSensitiveNotes(e.target.value)}
                      placeholder="Enter sensitive witness disclosures, POCSO committee remarks, or confidential medical records..."
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-rose-500/30 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                )}
              </div>
            </div>
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
              className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors shadow-lg shadow-rose-900/30"
            >
              Submit Incident Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
