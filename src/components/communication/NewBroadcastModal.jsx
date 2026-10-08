// VEDIC TREE OS — New Multi-Channel Broadcast Modal (Module 05)
import React, { useState } from 'react';
import { X, Send, Calendar, Users, MessageSquare, Smartphone, Mail, Bell, AlertCircle, CheckCircle2 } from 'lucide-react';
import { defaultCommunicationHub } from '../../modules/communication/communication-hub.service.js';
import { db } from '../../database/db.js';

export function NewBroadcastModal({ isOpen, onClose, context, onSuccess, onShowToast }) {
  const [title, setTitle] = useState('');
  const [selectedChannels, setSelectedChannels] = useState(['WHATSAPP', 'SMS']);
  const [audienceType, setAudienceType] = useState('ALL_STUDENTS');
  const [targetGrade, setTargetGrade] = useState('Grade 5');
  const [targetDepartment, setTargetDepartment] = useState('Academics');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const templates = db.getCommunicationTemplates(context);

  const toggleChannel = (ch) => {
    setSelectedChannels(prev => 
      prev.includes(ch) ? (prev.length > 1 ? prev.filter(c => c !== ch) : prev) : [...prev, ch]
    );
  };

  const handleTemplateSelect = (e) => {
    const tplId = e.target.value;
    setSelectedTemplateId(tplId);
    if (!tplId) return;

    const tpl = templates.find(t => t.id === tplId);
    if (tpl) {
      setBody(tpl.body);
      if (tpl.subject) setSubject(tpl.subject);
      if (!selectedChannels.includes(tpl.channel)) {
        setSelectedChannels([tpl.channel]);
      }
    }
  };

  const calculateAudienceEstimate = () => {
    const filter = audienceType === 'GRADE' ? { grade: targetGrade } : (audienceType === 'DEPARTMENT' ? { department: targetDepartment } : {});
    const recipients = db.getAudienceRecipients(context, audienceType, filter);
    return recipients.length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a campaign title.');
      return;
    }
    if (!body.trim()) {
      setError('Message body cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const filter = audienceType === 'GRADE' ? { grade: targetGrade } : (audienceType === 'DEPARTMENT' ? { department: targetDepartment } : {});
      const scheduledFor = isScheduled && scheduledDate ? new Date(scheduledDate).toISOString() : null;

      const result = await defaultCommunicationHub.sendBroadcast(context, {
        title,
        channels: selectedChannels,
        audienceType,
        audienceFilter: filter,
        templateId: selectedTemplateId || null,
        subject: subject || null,
        body,
        scheduledFor
      });

      if (result.success) {
        onShowToast?.(isScheduled ? 'Broadcast campaign successfully scheduled!' : `Broadcast dispatched! ${result.sentCount} sent.`);
        onSuccess?.(result);
        onClose();
      } else {
        setError('Failed to dispatch broadcast campaign.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const audienceCount = calculateAudienceEstimate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Send className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              New Multi-Channel Broadcast
            </h3>
            <p className="text-xs text-stone-500">Dispatch institutional circulars, alerts, and notices</p>
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

          {/* Campaign Title */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Campaign / Circular Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Annual Sports Day 2026 Circular & Schedule"
              className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Channel Checkboxes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Delivery Channels (Multi-Select)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'WHATSAPP', label: 'WhatsApp', icon: MessageSquare, color: 'text-emerald-600 dark:text-emerald-400' },
                { id: 'SMS', label: 'SMS (DLT)', icon: Smartphone, color: 'text-amber-600 dark:text-amber-400' },
                { id: 'EMAIL', label: 'Email', icon: Mail, color: 'text-blue-600 dark:text-blue-400' },
                { id: 'PUSH', label: 'App Push', icon: Bell, color: 'text-purple-600 dark:text-purple-400' },
                { id: 'IN_APP', label: 'In-App', icon: CheckCircle2, color: 'text-indigo-600 dark:text-indigo-400' }
              ].map(ch => {
                const Icon = ch.icon;
                const isSelected = selectedChannels.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => toggleChannel(ch.id)}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 shadow-sm'
                        : 'border-stone-200 dark:border-stone-700 text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${ch.color}`} />
                    <span className="text-[11px]">{ch.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audience Selection */}
          <div className="p-3.5 bg-stone-50/80 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-stone-500" />
                Target Audience
              </label>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-md font-semibold">
                Est. {audienceCount} recipients ({audienceCount * selectedChannels.length} total messages)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Audience Type</label>
                <select
                  value={audienceType}
                  onChange={(e) => setAudienceType(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none"
                >
                  <option value="ALL_STUDENTS">All Students (Guardian Contacts)</option>
                  <option value="GRADE">Specific Grade</option>
                  <option value="ALL_STAFF">All Faculty & Staff</option>
                  <option value="DEPARTMENT">Specific Department</option>
                </select>
              </div>

              {audienceType === 'GRADE' && (
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1">Select Grade</label>
                  <select
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none"
                  >
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 10">Grade 10</option>
                  </select>
                </div>
              )}

              {audienceType === 'DEPARTMENT' && (
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1">Select Department</label>
                  <select
                    value={targetDepartment}
                    onChange={(e) => setTargetDepartment(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none"
                  >
                    <option value="Academics">Academics & Teaching</option>
                    <option value="Administration">Administration & Admissions</option>
                    <option value="Science">Science & Robotics</option>
                    <option value="Sports">Physical Education & Sports</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Template Picker */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Use Pre-Approved Template (Optional)
            </label>
            <select
              value={selectedTemplateId}
              onChange={handleTemplateSelect}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
            >
              <option value="">-- Write Custom Freeform Message --</option>
              {templates.map(t => (
                <option key={t.id} value={t.id}>
                  [{t.channel}] {t.name} ({t.category})
                </option>
              ))}
            </select>
          </div>

          {/* Subject (for Email/Push/In-App) */}
          {(selectedChannels.includes('EMAIL') || selectedChannels.includes('PUSH') || selectedChannels.includes('IN_APP')) && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Subject Line (Email / Push / In-App)
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Important Announcement from Principal's Desk"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none"
              />
            </div>
          )}

          {/* Message Body */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Message Body *
              </label>
              <span className="text-[10px] text-stone-400">
                Variables supported: <code className="text-indigo-600 dark:text-indigo-400">{'{{studentName}}'}</code>, <code className="text-indigo-600 dark:text-indigo-400">{'{{guardianName}}'}</code>, <code className="text-indigo-600 dark:text-indigo-400">{'{{campusName}}'}</code>
              </span>
            </div>
            <textarea
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type your announcement or circular notice here..."
              className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
              required
            />
          </div>

          {/* Scheduling Section */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                Schedule for future dispatch
              </label>
              {isScheduled && (
                <input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="px-2.5 py-1 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none"
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || audienceCount === 0}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-sm transition-colors flex items-center gap-2"
            >
              {loading ? (
                <span>Dispatching...</span>
              ) : isScheduled ? (
                <>
                  <Calendar className="w-4 h-4" />
                  Schedule Broadcast
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Dispatch Broadcast Now
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
