import React from 'react';
import { Activity, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Badge } from '../foundations/Badge.jsx';

/**
 * SIGNATURE COMPONENT: Network Health
 *
 * Operational health matrix across 5 fundamental operational pillars:
 * 1. Academics
 * 2. Attendance
 * 3. Collections
 * 4. Parent Engagement
 * 5. Staff Stability
 */

export function NetworkHealth({
  metrics = [
    { key: 'academic', label: 'Academic Performance', score: 92, target: 90, status: 'healthy', trend: '+1.8%' },
    { key: 'attendance', label: 'Student Attendance', score: 94, target: 95, status: 'warning', trend: '-0.8%' },
    { key: 'collections', label: 'Fee Collections', score: 87, target: 85, status: 'healthy', trend: '+3.4%' },
    { key: 'parent', label: 'Parent Engagement', score: 91, target: 88, status: 'healthy', trend: '+4.1%' },
    { key: 'staff', label: 'Staff Stability', score: 84, target: 90, status: 'warning', trend: '-2.1%' },
  ],
  onMetricClick = null,
  className = '',
}) {
  const overallScore = Math.round(
    metrics.reduce((acc, m) => acc + m.score, 0) / (metrics.length || 1)
  );

  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0F4C35]/10 dark:bg-emerald-950/60 flex items-center justify-center text-[#0F4C35] dark:text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
              Vedic Tree Network Health
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated across 24 schools and campuses
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 uppercase font-medium">Index</span>
            <span className="text-lg font-bold tabular-nums text-slate-900 dark:text-white ml-2">
              {overallScore}%
            </span>
          </div>
          <Badge variant={overallScore >= 90 ? 'success' : 'primary'} dot size="sm">
            {overallScore >= 90 ? 'Optimal Network' : 'Normal Operating'}
          </Badge>
        </div>
      </div>

      {/* 5 Operational Bars */}
      <div className="space-y-4">
        {metrics.map((item) => {
          const isWarning = item.score < item.target;
          return (
            <div
              key={item.key}
              onClick={() => onMetricClick && onMetricClick(item)}
              className={`p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 transition-all ${
                onMetricClick ? 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50' : ''
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {item.label}
                  </span>
                  {isWarning ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="w-3 h-3" />
                      Target: {item.target}%
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      On Target
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-medium text-slate-400">
                    {item.trend}
                  </span>
                  <span className="font-bold tabular-nums text-sm text-slate-900 dark:text-white">
                    {item.score}%
                  </span>
                  {onMetricClick && <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />}
                </div>
              </div>

              {/* Progress Bar with Target Marker */}
              <div className="relative w-full bg-slate-200 dark:bg-slate-700/60 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    item.score >= 90
                      ? 'bg-[#0F4C35] dark:bg-emerald-500'
                      : item.score >= 80
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
