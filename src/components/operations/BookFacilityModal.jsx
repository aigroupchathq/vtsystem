// VEDIC TREE OS — Book Facility Modal (Module 08)
import React, { useState } from 'react';
import { X, Calendar, Clock, HelpCircle } from 'lucide-react';
import { defaultOperationsService } from '../../modules/operations/operations.service.js';

export function BookFacilityModal({ isOpen, onClose, context, facility, onSuccess, onShowToast }) {
  const [title, setTitle] = useState('');
  const [bookedBy, setBookedBy] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [startHour, setStartHour] = useState('14:00');
  const [endHour, setEndHour] = useState('16:00');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !facility) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !bookedBy.trim()) {
      setError('Please provide event title and reserving coordinator name.');
      return;
    }

    const startTime = `${date}T${startHour}:00Z`;
    const endTime = `${date}T${endHour}:00Z`;

    setLoading(true);
    setError(null);
    try {
      const booking = defaultOperationsService.bookFacility(context, {
        facilityId: facility.id,
        title: title.trim(),
        bookedBy: bookedBy.trim(),
        startTime,
        endTime
      });

      onShowToast?.(`Reservation confirmed for '${facility.name}'.`);
      onSuccess?.(booking);
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
            <h2 className="text-base font-bold text-stone-100">Reserve Facility Space</h2>
            <p className="text-xs text-stone-400">{facility.name} ({facility.facilityCode})</p>
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
            <label className="block text-xs font-semibold text-stone-300 mb-1">Event / Purpose Title *</label>
            <input
              type="text"
              placeholder="e.g. Science Exhibition Setup / Robotics Rehearsal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Reserving Faculty / Coordinator *</label>
            <input
              type="text"
              placeholder="e.g. Anand Kulkarni (Science Dept)"
              value={bookedBy}
              onChange={(e) => setBookedBy(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Date *</label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-cyan-500"
                required
              />
              <Calendar className="w-4 h-4 text-stone-500 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Start Time *</label>
              <div className="relative">
                <input
                  type="time"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
                <Clock className="w-3.5 h-3.5 text-stone-500 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">End Time *</label>
              <div className="relative">
                <input
                  type="time"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
                <Clock className="w-3.5 h-3.5 text-stone-500 absolute right-3 top-2.5 pointer-events-none" />
              </div>
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
              className="px-5 py-2 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-all shadow-md shadow-cyan-600/20 disabled:opacity-50"
            >
              {loading ? 'Confirming...' : 'Confirm Reservation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
