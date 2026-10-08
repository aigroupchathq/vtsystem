// VEDIC TREE OS — Create Template Modal (Module 05)
import React, { useState } from 'react';
import { X, FileText, AlertCircle } from 'lucide-react';
import { defaultCommunicationHub } from '../../modules/communication/communication-hub.service.js';
import { TemplateEngine } from '../../modules/communication/template.engine.js';

export function CreateTemplateModal({ isOpen, onClose, context, onSuccess, onShowToast }) {
  const [channel, setChannel] = useState('WHATSAPP');
  const [category, setCategory] = useState('TRANSACTIONAL');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const detectedVariables = TemplateEngine.extractVariables(body);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Template name is required.');
      return;
    }
    if (!body.trim()) {
      setError('Template body is required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const template = defaultCommunicationHub.createTemplate(context, {
        channel,
        category,
        name,
        subject: (channel === 'EMAIL' || channel === 'PUSH' || channel === 'IN_APP') ? subject : null,
        body,
        variables: detectedVariables
      });

      onShowToast?.(`Template '${template.name}' created successfully!`);
      onSuccess?.(template);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              New Communication Template
            </h3>
            <p className="text-xs text-stone-500">Author pre-approved channel templates with variable tags</p>
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

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">Target Channel *</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
              >
                <option value="WHATSAPP">WhatsApp</option>
                <option value="SMS">SMS (DLT)</option>
                <option value="EMAIL">Email</option>
                <option value="PUSH">App Push</option>
                <option value="IN_APP">In-App Alert</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
              >
                <option value="TRANSACTIONAL">Transactional</option>
                <option value="ALERT">Emergency Alert</option>
                <option value="FINANCE">Finance & Fees</option>
                <option value="ACADEMIC">Academic / Timetable</option>
                <option value="BROADCAST">General Broadcast</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">Template Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Term Fee Overdue Notice"
              className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
              required
            />
          </div>

          {(channel === 'EMAIL' || channel === 'PUSH' || channel === 'IN_APP') && (
            <div>
              <label className="block text-xs text-stone-600 dark:text-stone-400 mb-1">Subject Line</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Important: Notice regarding {{studentName}}"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
              />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-stone-600 dark:text-stone-400">Template Body *</label>
              <span className="text-[10px] text-stone-400">Use double braces like {'{{studentName}}'}</span>
            </div>
            <textarea
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Dear {{guardianName}}, this is a notice from {{campusName}} regarding..."
              className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none font-sans"
              required
            />
          </div>

          {/* Detected Variable Chips */}
          {detectedVariables.length > 0 && (
            <div className="p-3 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl space-y-1.5">
              <span className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider">
                Detected Dynamic Parameters ({detectedVariables.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {detectedVariables.map(v => (
                  <span key={v} className="px-2 py-0.5 text-[11px] bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 rounded font-mono font-medium">
                    {`{{${v}}}`}
                  </span>
                ))}
              </div>
            </div>
          )}

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
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors"
            >
              {loading ? 'Saving...' : 'Save Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
