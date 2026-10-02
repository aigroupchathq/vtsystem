// VEDIC TREE OS — Campus Visit Scheduling Modal
import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, Sparkles } from 'lucide-react';
import { AdmissionsService } from '../../modules/admissions/admissions.service.js';

export default function ScheduleVisitModal({
  isOpen,
  onClose,
  tenantContext,
  lead,
  onSuccess,
  onShowToast
}) {
  const [scheduledAt, setScheduledAt] = useState(() => {
    const d = new Date(Date.now() + 86400000);
    d.setHours(10, 30, 0, 0);
    return d.toISOString().slice(0, 16);
  });
  const [visitorCount, setVisitorCount] = useState(2);
  const [guideName, setGuideName] = useState('Anjali Deshmukh (Admissions Counselor)');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !lead) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);
      const isoTime = new Date(scheduledAt).toISOString();
      const visit = AdmissionsService.scheduleCampusVisit(tenantContext, lead.id, {
        scheduledAt: isoTime,
        visitorCount: Number(visitorCount),
        visitorName: lead.guardianName,
        phone: lead.phone,
        guideName
      });

      setIsSubmitting(false);
      if (onShowToast) onShowToast(`Campus discovery visit scheduled for ${lead.studentName}! WhatsApp confirmation sent.`);
      if (onSuccess) onSuccess(visit);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Failed to schedule visit.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Schedule Campus Tour</h3>
              <p className="text-xs text-slate-400">{lead.studentName} ({lead.targetGrade})</p>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Visit Date & Time *
            </label>
            <input
              type="datetime-local"
              required
              value={scheduledAt}
              onChange={e => setScheduledAt(e.target.value)}
              className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-400" /> Expected Visitors
              </label>
              <input
                type="number"
                min="1"
                max="8"
                value={visitorCount}
                onChange={e => setVisitorCount(e.target.value)}
                className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Duration
              </label>
              <div className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-slate-400">
                45 mins tour
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Designated Tour Guide / Counselor
            </label>
            <input
              type="text"
              value={guideName}
              onChange={e => setGuideName(e.target.value)}
              className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-xl text-xs text-cyan-300">
            Automated WhatsApp notification with Google Maps location and reception point will be dispatched to <strong className="text-white">{lead.phone}</strong>.
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
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-900/40 flex items-center gap-2 transition disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isSubmitting ? 'Booking...' : 'Book Visit & Send Invite'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
