// VEDIC TREE OS — Message Detail & Delivery Ledger Modal (Module 05)
import React, { useState } from 'react';
import { X, MessageSquare, Smartphone, Mail, Bell, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { defaultCommunicationHub } from '../../modules/communication/communication-hub.service.js';

const renderChannelIcon = (ch, className = 'w-5 h-5') => {
  switch (ch) {
    case 'WHATSAPP': return <MessageSquare className={className} />;
    case 'SMS': return <Smartphone className={className} />;
    case 'EMAIL': return <Mail className={className} />;
    case 'PUSH': return <Bell className={className} />;
    case 'IN_APP': return <CheckCircle2 className={className} />;
    default: return <MessageSquare className={className} />;
  }
};

export function MessageDetailModal({ message, isOpen, onClose, context, onRetrySuccess, onShowToast }) {
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !message) return null;

  const handleRetry = async () => {
    setRetrying(true);
    setError(null);
    try {
      const res = await defaultCommunicationHub.retryMessage(context, message.id);
      if (res.success) {
        onShowToast?.(`Message retry succeeded via ${message.channel}!`);
        onRetrySuccess?.();
        onClose();
      } else {
        setError(res.error || 'Retry attempt was rejected by provider.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setRetrying(false);
    }
  };

  const steps = [
    { key: 'QUEUED', label: 'Queued' },
    { key: 'SENDING', label: 'Dispatching' },
    { key: 'SENT', label: 'Sent' },
    { key: 'DELIVERED', label: 'Delivered' },
    { key: 'READ', label: 'Read' }
  ];

  const getStepStatus = (stepKey) => {
    if (message.status === 'FAILED') {
      if (stepKey === 'QUEUED' || stepKey === 'SENDING') return 'completed';
      return 'failed';
    }
    const order = ['QUEUED', 'SENDING', 'SENT', 'DELIVERED', 'READ'];
    const currentIndex = order.indexOf(message.status);
    const stepIndex = order.indexOf(stepKey);

    if (currentIndex >= stepIndex) return 'completed';
    return 'pending';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              {renderChannelIcon(message.channel, 'w-5 h-5')}
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                {message.channel} Dispatch Details
              </h3>
              <p className="text-xs text-stone-500 font-mono">ID: {message.id} • Provider: {message.provider}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Delivery State Lifecycle Stepper */}
          <div className="p-4 bg-stone-50/80 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60 rounded-xl">
            <div className="text-[10px] uppercase font-semibold text-stone-500 mb-3 tracking-wider">
              Delivery State Progression
            </div>
            <div className="flex items-center justify-between relative">
              {steps.map((st, idx) => {
                const status = getStepStatus(st.key);
                return (
                  <div key={st.key} className="flex flex-col items-center z-10">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                      status === 'completed'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : (message.status === 'FAILED' && idx >= 2
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-400 border border-rose-300 dark:border-rose-800'
                            : 'bg-stone-200 dark:bg-stone-700 text-stone-500')
                    }`}>
                      {status === 'completed' ? '✓' : idx + 1}
                    </div>
                    <span className="text-[10px] mt-1 font-medium text-stone-600 dark:text-stone-400">{st.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Failure Alert Banner (if failed) */}
          {message.status === 'FAILED' && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Carrier Delivery Failure
                </span>
                <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400">
                  Retries: {message.retryCount} / {message.maxRetries}
                </span>
              </div>
              <p className="text-xs text-rose-700 dark:text-rose-300 font-mono bg-white/60 dark:bg-stone-900/60 p-2 rounded-lg border border-rose-100 dark:border-rose-900">
                {message.failureReason || 'Provider rejected destination or network timed out'}
              </p>
            </div>
          )}

          {/* Recipient & Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 dark:bg-stone-800/30 p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-700/60">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block mb-0.5">Recipient</span>
              <p className="font-semibold text-stone-800 dark:text-stone-200">{message.recipientName}</p>
              <p className="text-stone-500 font-mono text-[11px]">{message.recipientAddress}</p>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block mb-0.5">Category & Priority</span>
              <p className="font-medium text-stone-800 dark:text-stone-200">{message.category}</p>
              <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 mt-0.5">
                {message.priority} Priority
              </span>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block mb-0.5">Created At</span>
              <p className="text-stone-600 dark:text-stone-400">{new Date(message.createdAt).toLocaleString('en-IN')}</p>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block mb-0.5">External Gateway ID</span>
              <p className="font-mono text-[11px] text-stone-600 dark:text-stone-400 truncate">{message.externalMessageId || 'N/A'}</p>
            </div>
          </div>

          {/* Subject (if present) */}
          {message.subject && (
            <div>
              <span className="text-[11px] text-stone-500 block mb-1">Subject</span>
              <div className="p-2.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-semibold text-stone-800 dark:text-stone-200">
                {message.subject}
              </div>
            </div>
          )}

          {/* Message Payload Body */}
          <div>
            <span className="text-[11px] text-stone-500 block mb-1">Message Content Payload</span>
            <div className="p-3 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-700 dark:text-stone-300 whitespace-pre-wrap font-sans leading-relaxed">
              {message.body}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
            <div className="text-[11px] text-stone-400">
              Campus: <span className="font-medium text-stone-600 dark:text-stone-300">{message.campusId}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors"
              >
                Close
              </button>
              {message.status === 'FAILED' && message.retryCount < message.maxRetries && (
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={retrying}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`} />
                  {retrying ? 'Retrying...' : 'Retry Dispatch'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
