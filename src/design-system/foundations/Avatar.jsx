import React from 'react';

export function Avatar({
  name = 'User',
  src = null,
  size = 'md',
  status = null, // 'online' | 'offline' | 'busy' | 'away'
  tone = 'brand', // 'brand' | 'accent' | 'neutral' | 'slate'
  className = '',
}) {
  const sizeMap = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const statusSizeMap = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  const statusColorMap = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    busy: 'bg-rose-500',
    away: 'bg-amber-500',
  };

  const toneMap = {
    brand: 'bg-[#0F4C35]/10 text-[#0F4C35] dark:bg-emerald-950/60 dark:text-emerald-300 border border-[#0F4C35]/20',
    accent: 'bg-amber-500/10 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-500/20',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    slate: 'bg-slate-800 text-slate-100 dark:bg-slate-700 dark:text-slate-100',
  };

  const getInitials = (str) => {
    if (!str) return 'VT';
    const parts = str.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="relative inline-flex flex-shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeMap[size] || sizeMap.md} rounded-full object-cover border border-slate-200 dark:border-slate-700 ${className}`}
        />
      ) : (
        <div
          className={`${sizeMap[size] || sizeMap.md} ${toneMap[tone] || toneMap.brand} rounded-full flex items-center justify-center font-medium select-none shadow-sm ${className}`}
          aria-label={name}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSizeMap[size] || statusSizeMap.md} ${statusColorMap[status] || statusColorMap.online} rounded-full ring-2 ring-white dark:ring-slate-900`}
        />
      )}
    </div>
  );
}
