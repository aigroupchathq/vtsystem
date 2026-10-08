import React, { useState } from 'react';
import {
  Bell,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Calendar,
  Banknote,
  GraduationCap,
} from 'lucide-react';
import { Badge } from '../../design-system/foundations/Badge.jsx';
import { Button } from '../../design-system/actions/Button.jsx';

export function NotificationCenter({
  isOpen,
  onClose,
  currentUser,
  onActionClick,
}) {
  const [filter, setFilter] = useState('all'); // 'all' | 'attention' | 'academic' | 'operations'
  const [readIds, setReadIds] = useState([]);

  if (!isOpen) return null;

  const rawNotifications = [
    {
      id: 'notif-1',
      category: 'attendance',
      priority: 'high',
      title: '7 Attendance Exceptions Require Review',
      message: 'Unnotified absences detected in Grade 7-A and Grade 8-B exceeding the 3-day threshold.',
      timestamp: '15m ago',
      actionLabel: 'Review Exceptions',
      actionTarget: 'attendance',
      needsAttention: true,
      roles: ['HQ_ADMIN', 'PRINCIPAL', 'TEACHER'],
    },
    {
      id: 'notif-2',
      category: 'admissions',
      priority: 'urgent',
      title: '27 Enquiries Awaiting Outreach [SOURCE]',
      message: 'Initial enquiry-to-visit conversion window expiring within 4 hours for Panvel campus batch.',
      timestamp: '42m ago',
      actionLabel: 'Dispatch Follow-up',
      actionTarget: 'admissions',
      needsAttention: true,
      roles: ['HQ_ADMIN', 'PRINCIPAL', 'ADMISSIONS_HEAD'],
    },
    {
      id: 'notif-3',
      category: 'operations',
      priority: 'medium',
      title: 'Facility Booking Conflict Detected [SOURCE]',
      message: 'Main Auditorium has overlapping slot requests for Grade 8 Science Fair and Annual Yoga Demo.',
      timestamp: '1h ago',
      actionLabel: 'Resolve Conflict',
      actionTarget: 'operations',
      needsAttention: true,
      roles: ['HQ_ADMIN', 'PRINCIPAL'],
    },
    {
      id: 'notif-4',
      category: 'finance',
      priority: 'medium',
      title: '₹14.2 L Term-2 Fee Collections Reconciled [SOURCE]',
      message: 'Campus fee collections reconciled with bank settlement.',
      timestamp: '2h ago',
      actionLabel: 'View Settlement',
      actionTarget: 'finance',
      needsAttention: false,
      roles: ['HQ_ADMIN', 'PRINCIPAL', 'FINANCE'],
    },
    {
      id: 'notif-5',
      category: 'academic',
      priority: 'high',
      title: 'Term-1 CCE Report Cards Pending Principal Signature [SOURCE]',
      message: 'Grade 7-A division report cards generated and verified by Class Teacher Sunita Patil.',
      timestamp: '3h ago',
      actionLabel: 'Sign & Publish',
      actionTarget: 'academics',
      needsAttention: true,
      roles: ['HQ_ADMIN', 'PRINCIPAL'],
    },
    {
      id: 'notif-6',
      category: 'communication',
      priority: 'info',
      title: 'Annual Day Event Circular Ready for Distribution [SOURCE]',
      message: 'Event schedule and volunteer guidelines finalized for parent circulation.',
      timestamp: '4h ago',
      actionLabel: 'Inspect Notice',
      actionTarget: 'communication',
      needsAttention: false,
      roles: ['HQ_ADMIN', 'PRINCIPAL', 'TEACHER'],
    },
    {
      id: 'notif-7',
      category: 'academic',
      priority: 'high',
      title: 'Upcoming Mathematics Assessment (Term 1)',
      message: 'Aarav Sharma has an upcoming assessment on Geometry & Mensuration on Monday.',
      timestamp: '5h ago',
      actionLabel: 'View Syllabus',
      actionTarget: 'academics',
      needsAttention: true,
      roles: ['PARENT', 'STUDENT'],
    },
    {
      id: 'notif-8',
      category: 'finance',
      priority: 'info',
      title: 'Term-2 Fee Receipt Generated',
      message: 'Payment of ₹45,000 received via UPI. Digital receipt #REC-2026-0842 is ready.',
      timestamp: '1d ago',
      actionLabel: 'Download Receipt',
      actionTarget: 'finance',
      needsAttention: false,
      roles: ['PARENT'],
    },
  ];

  // Filter notifications by user role
  const userNotifications = rawNotifications.filter((n) =>
    n.roles.includes(currentUser.role)
  );

  const filtered = userNotifications.filter((n) => {
    if (filter === 'attention') return n.needsAttention;
    if (filter === 'academic') return n.category === 'academic';
    if (filter === 'operations') return n.category === 'operations' || n.category === 'attendance';
    return true;
  });

  const markAllAsRead = () => {
    setReadIds(userNotifications.map((n) => n.id));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'attendance':
        return Calendar;
      case 'admissions':
        return GraduationCap;
      case 'finance':
        return Banknote;
      case 'operations':
        return AlertTriangle;
      case 'ai':
        return Sparkles;
      default:
        return Bell;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F4C35]/10 dark:bg-emerald-950/60 flex items-center justify-center text-[#0F4C35] dark:text-emerald-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Action Center
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Operational notifications & SLA alerts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Filter */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'attention', label: 'Needs Action' },
              { id: 'academic', label: 'Academic' },
              { id: 'operations', label: 'Operations' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filter === tab.id
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-[11px] text-[#0F4C35] dark:text-emerald-400 hover:underline font-medium"
          >
            Mark all read
          </button>
        </div>

        {/* List Body */}
        <div className="p-4 space-y-3 overflow-y-auto flex-grow">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const isRead = readIds.includes(item.id);
              const Icon = getCategoryIcon(item.category);

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    item.needsAttention && !isRead
                      ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/40 shadow-xs'
                      : isRead
                      ? 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-60'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                        item.priority === 'urgent'
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-600'
                          : item.priority === 'high'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 tabular-nums">
                      {item.timestamp}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-snug mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {item.message}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] text-slate-400">
                      {item.needsAttention ? 'Requires Decision' : 'Informational'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onActionClick(item.actionTarget);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F4C35] dark:text-emerald-400 hover:underline"
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">All caught up</p>
              <p className="text-xs text-slate-500">No active alerts requiring your attention.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
