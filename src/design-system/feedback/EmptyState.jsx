import React from 'react';
import { Inbox, Loader2 } from 'lucide-react';
import { Button } from '../actions/Button.jsx';

export function EmptyState({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There are currently no items to display in this view.',
  actionLabel = null,
  onAction = null,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function LoadingState({
  message = 'Loading data...',
  compact = false,
  className = '',
}) {
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 ${className}`}>
        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0F4C35] dark:text-emerald-400" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <Loader2 className="w-8 h-8 animate-spin text-[#0F4C35] dark:text-emerald-400 mb-3" />
      <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );
}

export function Skeleton({ className = '', variant = 'text' }) {
  const variantStyles = {
    text: 'h-4 w-full rounded',
    title: 'h-6 w-3/4 rounded-md',
    avatar: 'w-10 h-10 rounded-full',
    card: 'h-32 w-full rounded-xl',
  };

  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-800 ${variantStyles[variant] || variantStyles.text} ${className}`}
    />
  );
}
