import React from 'react';
import { AlertCircle, Clock, CheckCircle2, ArrowRight, X, Sparkles } from 'lucide-react';
import { Button } from '../actions/Button.jsx';
import { Badge } from '../foundations/Badge.jsx';

/**
 * SIGNATURE COMPONENT: Next Best Action
 *
 * Operational engine that transforms passive dashboards into active decision workspaces.
 * Replaces generic analytics with contextual, high-leverage workflows.
 */

export function NextBestAction({
  priority = 'high', // 'urgent' | 'high' | 'medium' | 'info'
  context = 'Network Operations',
  actionTitle,
  reason,
  ctaText = 'Take Action',
  onAction,
  onDismiss = null,
  role = null,
  impactMetric = null,
  className = '',
}) {
  const priorityConfig = {
    urgent: {
      badge: 'danger',
      icon: AlertCircle,
      borderColor: 'border-rose-300 dark:border-rose-800/60',
      bgColor: 'bg-rose-50/50 dark:bg-rose-950/20',
      label: 'Immediate Action',
    },
    high: {
      badge: 'warning',
      icon: Clock,
      borderColor: 'border-amber-300 dark:border-amber-800/60',
      bgColor: 'bg-amber-50/50 dark:bg-amber-950/20',
      label: 'High Priority',
    },
    medium: {
      badge: 'info',
      icon: Sparkles,
      borderColor: 'border-sky-300 dark:border-sky-800/60',
      bgColor: 'bg-sky-50/50 dark:bg-sky-950/20',
      label: 'Recommended',
    },
    info: {
      badge: 'primary',
      icon: CheckCircle2,
      borderColor: 'border-emerald-300 dark:border-emerald-800/60',
      bgColor: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      label: 'Next Step',
    },
  };

  const config = priorityConfig[priority] || priorityConfig.medium;
  const Icon = config.icon;

  return (
    <div
      className={`relative p-4 sm:p-5 rounded-2xl border ${config.borderColor} ${config.bgColor} shadow-sm transition-all hover:shadow-md ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={config.badge} dot size="sm">
            {config.label}
          </Badge>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {context}
          </span>
          {role && (
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
              • For {role}
            </span>
          )}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss suggestion"
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-snug">
            {actionTitle}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {reason}
          </p>
          {impactMetric && (
            <div className="pt-1 flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <span className="text-slate-400">Estimated Impact:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{impactMetric}</span>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 self-start sm:self-center">
          <Button
            variant={priority === 'urgent' ? 'danger' : 'primary'}
            size="sm"
            onClick={onAction}
            iconRight={ArrowRight}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function NextBestActionFeed({ actions = [], className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {actions.map((act, idx) => (
        <NextBestAction key={act.id || idx} {...act} />
      ))}
    </div>
  );
}
