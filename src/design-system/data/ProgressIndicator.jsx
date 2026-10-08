import React from 'react';

export function Timeline({ items = [], className = '' }) {
  return (
    <div className={`relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 ${className}`}>
      {items.map((item, idx) => (
        <div key={item.id || idx} className="relative group">
          {/* Dot */}
          <div
            className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center ${
              item.status === 'completed'
                ? 'bg-emerald-600'
                : item.status === 'current'
                ? 'bg-[#0F4C35] ring-4 ring-[#0F4C35]/20'
                : item.status === 'danger'
                ? 'bg-rose-500'
                : 'bg-slate-300 dark:bg-slate-700'
            }`}
          />

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h4>
            {item.timestamp && (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {item.timestamp}
              </span>
            )}
          </div>

          {item.description && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {item.description}
            </p>
          )}

          {item.badge && <div className="mt-2">{item.badge}</div>}
        </div>
      ))}
    </div>
  );
}

export function ProgressIndicator({
  value = 0,
  max = 100,
  label = null,
  showPercentage = true,
  tone = 'brand', // 'brand' | 'accent' | 'success' | 'warning' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
}) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const toneColors = {
    brand: 'bg-[#0F4C35] dark:bg-emerald-500',
    accent: 'bg-amber-500',
    success: 'bg-emerald-600',
    warning: 'bg-amber-500',
    danger: 'bg-rose-600',
  };

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && <span className="tabular-nums font-semibold">{percent}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${sizeStyles[size] || sizeStyles.md}`}>
        <div
          className={`h-full transition-all duration-300 rounded-full ${toneColors[tone] || toneColors.brand}`}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
