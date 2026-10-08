import React from 'react';

export function BarChart({
  data = [], // [{ label: 'Term 1', value: 85, color: '#0F4C35' }]
  maxValue = null,
  height = 160,
  showLabels = true,
  unit = '',
  className = '',
}) {
  const max = maxValue || Math.max(...data.map((d) => d.value), 100);

  return (
    <div className={`w-full ${className}`}>
      <div
        className="flex items-end justify-between gap-2 sm:gap-4 pt-4 px-2"
        style={{ height: `${height}px` }}
      >
        {data.map((item, idx) => {
          const heightPercent = Math.min(100, Math.max(8, (item.value / max) * 100));
          return (
            <div key={item.label || idx} className="flex-1 flex flex-col items-center h-full justify-end group">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-semibold tabular-nums text-slate-600 dark:text-slate-300 mb-1">
                {item.value}
                {unit}
              </div>
              <div
                className="w-full max-w-[42px] rounded-t-md transition-all duration-300 group-hover:brightness-110"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: item.color || '#0F4C35',
                }}
              />
            </div>
          );
        })}
      </div>
      {showLabels && (
        <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-800 mt-2 pt-2 px-1">
          {data.map((item, idx) => (
            <span
              key={item.label || idx}
              className="flex-1 text-center text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate"
            >
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function DonutChart({
  data = [], // [{ label: 'Paid', value: 80, color: '#0F4C35' }]
  size = 140,
  strokeWidth = 14,
  centerLabel = null,
  centerValue = null,
  className = '',
}) {
  const total = data.reduce((acc, d) => acc + d.value, 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-6 ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            className="text-slate-100 dark:text-slate-800"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {data.map((item, idx) => {
            const percent = item.value / total;
            const strokeDasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
            const strokeDashoffset = -circumference * accumulatedPercent;
            accumulatedPercent += percent;

            return (
              <circle
                key={item.label || idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={item.color || '#0F4C35'}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500"
              />
            );
          })}
        </svg>

        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
            {centerValue && (
              <span className="text-xl font-bold tabular-nums text-slate-900 dark:text-white">
                {centerValue}
              </span>
            )}
            {centerLabel && (
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400">
                {centerLabel}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 min-w-[120px]">
        {data.map((item, idx) => (
          <div key={item.label || idx} className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color || '#0F4C35' }}
              />
              <span className="text-slate-600 dark:text-slate-400 font-medium">{item.label}</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FunnelChart({
  steps = [], // [{ label: 'Leads', count: 1284, rate: '100%' }]
  onStepClick = null,
  className = '',
}) {
  const maxCount = steps[0]?.count || 1;

  return (
    <div className={`space-y-2.5 ${className}`}>
      {steps.map((step, idx) => {
        const widthPercent = Math.max(15, Math.round((step.count / maxCount) * 100));
        return (
          <div
            key={step.label || idx}
            onClick={() => onStepClick && onStepClick(step, idx)}
            className={`group p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all ${
              onStepClick ? 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 hover:shadow' : ''
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-500">
                  {idx + 1}
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{step.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold tabular-nums text-slate-900 dark:text-white">
                  {step.count.toLocaleString('en-IN')}
                </span>
                {step.rate && (
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                    {step.rate}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0F4C35] dark:bg-emerald-500 rounded-full transition-all duration-300 group-hover:brightness-110"
                style={{ width: `${widthPercent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
