// VEDIC TREE OS — New Admission Lead Intake Modal
import React, { useState } from 'react';
import { X, UserPlus, Phone, Mail, GraduationCap, MessageSquare, Sparkles } from 'lucide-react';
import { AdmissionsService } from '../../modules/admissions/admissions.service.js';

export default function NewLeadModal({
  isOpen,
  onClose,
  tenantContext,
  onSuccess,
  onShowToast
}) {
  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    phone: '',
    email: '',
    targetGrade: 'Grade 1',
    leadSource: 'WALK_IN',
    priority: 'MEDIUM',
    notes: '',
    sendWelcomeWhatsApp: true
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.studentName.trim() || !formData.guardianName.trim() || !formData.phone.trim()) {
      setError('Student name, parent name, and contact phone number are mandatory.');
      return;
    }

    try {
      setIsSubmitting(true);
      const newLead = AdmissionsService.createLead(
        tenantContext,
        {
          campusId: tenantContext.activeCampusId,
          studentName: formData.studentName,
          guardianName: formData.guardianName,
          phone: formData.phone,
          email: formData.email,
          targetGrade: formData.targetGrade,
          leadSource: formData.leadSource,
          priority: formData.priority,
          notes: formData.notes
        },
        { sendWelcome: formData.sendWelcomeWhatsApp }
      );

      setIsSubmitting(false);
      if (onShowToast) onShowToast(`Lead created for ${newLead.studentName}! WhatsApp welcome triggered.`);
      if (onSuccess) onSuccess(newLead);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Failed to create lead.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-[#24324D] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">New Admission Lead Intake</h3>
              <p className="text-xs text-slate-400">Register prospect enquiry into Admissions CRM</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Candidate / Student Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Navya Deshpande"
                value={formData.studentName}
                onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Parent / Guardian Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Girish Deshpande"
                value={formData.guardianName}
                onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> Contact Phone *
              </label>
              <input
                type="text"
                required
                placeholder="+91 98900 12345"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email (Optional)
              </label>
              <input
                type="email"
                placeholder="parent@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Target Grade *
              </label>
              <select
                value={formData.targetGrade}
                onChange={e => setFormData({ ...formData, targetGrade: e.target.value })}
                className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Nursery">Nursery</option>
                <option value="Junior KG">Junior KG</option>
                <option value="Senior KG">Senior KG</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Inquiry Source
              </label>
              <select
                value={formData.leadSource}
                onChange={e => setFormData({ ...formData, leadSource: e.target.value })}
                className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="WALK_IN">Walk-in Visit</option>
                <option value="WEBSITE">Website Portal</option>
                <option value="WHATSAPP">WhatsApp Official</option>
                <option value="REFERRAL">Parent Referral</option>
                <option value="EVENT">Open House / Fair</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-[#131D31] border border-[#24324D] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="HIGH">High (Immediate)</option>
                <option value="MEDIUM">Medium (Regular)</option>
                <option value="LOW">Low (Next Academic Year)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Initial Notes / Parent Preferences
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Inquired regarding bus route for Baner Pashan link road..."
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-[#131D31] border border-[#24324D] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Auto WhatsApp Dispatch Option */}
          <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-xs font-semibold text-emerald-300">Automated WhatsApp Welcome</p>
                <p className="text-[11px] text-slate-400">Instantly dispatch brochure & prospectus template</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.sendWelcomeWhatsApp}
              onChange={e => setFormData({ ...formData, sendWelcomeWhatsApp: e.target.checked })}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
          </div>

          {/* Footer Actions */}
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
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40 flex items-center gap-2 transition disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isSubmitting ? 'Registering...' : 'Register Lead & Trigger CRM'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
