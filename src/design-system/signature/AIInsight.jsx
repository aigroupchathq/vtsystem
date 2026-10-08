import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../actions/Button.jsx';
import { Badge } from '../foundations/Badge.jsx';

/**
 * SIGNATURE COMPONENT: AI Insight
 *
 * Provides contextual AI operational intelligence while strictly distinguishing:
 * 1. AI-generated analytical reasoning
 * 2. Verified system telemetry / audit data
 */

export function AIInsight({
  title = 'Operational Pattern Detected',
  insight,
  verifiedData = [], // [{ label: 'Affected Cohort', value: 'Grades 6–8' }]
  confidence = 94,
  actionLabel = 'Explore Contributing Factors',
  onAction = null,
  sourceContext = 'Network Analytics Engine',
  className = '',
}) {
  return (
    <div
      className={`relative p-5 rounded-2xl border border-purple-200 dark:border-purple-900/50 bg-purple-50/40 dark:bg-purple-950/20 shadow-sm ${className}`}
    >
      {/* Header with AI Badge & Context */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-100 dark:border-purple-900/30 gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            AI Copilot Insight
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {sourceContext}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{confidence}% Confidence</span>
        </div>
      </div>

      {/* Main Insight Text */}
      <div className="mb-4">
        <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-1.5">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {insight}
        </p>
      </div>

      {/* Verified System Data Section */}
      {verifiedData && verifiedData.length > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Grounded in Verified System Telemetry</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {verifiedData.map((d, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-slate-400 text-[11px]">{d.label}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <span className="text-[11px] text-slate-400">
          Generated using contextual model analysis • Auditable
        </span>
        {actionLabel && onAction && (
          <Button
            variant="primary"
            size="sm"
            onClick={onAction}
            iconRight={ArrowRight}
            className="bg-purple-900 hover:bg-purple-950 text-white border-purple-950 dark:bg-purple-700 dark:hover:bg-purple-600"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
