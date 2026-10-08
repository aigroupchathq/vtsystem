import React from 'react';
import { TrendIndicator } from '../foundations/Badge.jsx';
import { ArrowUpRight } from 'lucide-react';

/**
 * VEDIC TREE OS — KPICard Primitive
 * Calibrated numeric typography with tabular numerals, editorial hierarchy,
 * and restrained tones (Prompt 06).
 */

export function KPICard({
  title,
  value,
  trend = null, // e.g. "+8.4%"
  trendLabel = null, // e.g. "vs last quarter"
  direction = 'auto',
  prefix = '',
  suffix = '',
  subtitle = null,
  icon: Icon = null,
  badge = null,
  tone = 'default', // 'default' | 'brand' | 'accent' | 'success' | 'warning'
  onClick = null,
  className = '',
}) {
  const toneIconStyles = {
    default: 'bg-[#FBF8EF] border border-[#E6DFD1] text-[#60706B]',
    brand: 'bg-[#F4EEDC] border border-[#DFC679]/60 text-[#8C6B1C]',
    accent: 'bg-[#F4EEDC] border border-[#DFC679]/60 text-[#C49A3A]',
    success: 'bg-[#2D705C]/10 border border-[#2D705C]/20 text-[#2D705C]',
    warning: 'bg-[#F4EEDC] border border-[#DFC679]/60 text-[#8C6B1C]',
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => onClick && e.key === 'Enter' && onClick()}
      className={`group relative bg-white border border-[#E6DFD1] rounded-lg sm:rounded-xl p-4 sm:p-5 transition-colors duration-150 ${
        onClick
          ? 'cursor-pointer hover:border-[#C49A3A]/70'
          : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#334E47] truncate">
            {title}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {badge}
          {Icon && (
            <div className={`w-7 h-7 rounded-md flex items-center justify-center ${toneIconStyles[tone] || toneIconStyles.default}`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div>
          <div className="font-sans font-bold text-xl sm:text-2xl text-[#0B2F29] tabular-nums">
            {prefix}{value}{suffix}
          </div>
          {subtitle && (
            <p className="text-xs text-[#334E47] mt-1 truncate">{subtitle}</p>
          )}
        </div>
        {trend && (
          <div className="flex-shrink-0">
            <TrendIndicator value={trend} label={trendLabel} direction={direction} />
          </div>
        )}
      </div>

      {onClick && (
        <div className="mt-3 pt-2.5 border-t border-[#EFE9DD] flex items-center justify-between text-xs text-[#334E47] font-medium group-hover:text-[#0B2F29] transition-colors">
          <span>View details</span>
          <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#C49A3A]" />
        </div>
      )}
    </div>
  );
}

export function Metric({
  label,
  value,
  unit = '',
  trend = null,
  className = '',
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-[#334E47]">{label}</span>
      <div className="flex items-baseline gap-1.5 mt-0.5">
        <span className="text-lg font-sans font-bold tabular-nums text-[#0B2F29]">
          {value}
        </span>
        {unit && <span className="text-xs text-[#334E47] font-medium">{unit}</span>}
        {trend && <span className="text-xs font-semibold text-[#2D705C] ml-1">{trend}</span>}
      </div>
    </div>
  );
}

export default KPICard;
