import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

/**
 * VEDIC TREE OS — Badge & Status Indicators (Prompt 06)
 * Editorial restraint: Small, subtle hairline borders, authentic brand tones.
 */

export function Badge({
  variant = 'default', // 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'ai'
  size = 'md', // 'sm' | 'md' | 'lg'
  dot = false,
  pill = false,
  children,
  className = '',
  ...props
}) {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2 py-0.5 font-medium',
    lg: 'text-sm px-2.5 py-0.5 font-medium',
  };

  const variantStyles = {
    default: 'bg-[#EFE9DD] text-[#60706B] border border-[#E6DFD1]',
    primary: 'bg-[#0B2F29]/10 text-[#0B2F29] border border-[#0B2F29]/20',
    accent: 'bg-[#F4EEDC] text-[#8C6B1C] border border-[#DFC679]/60',
    success: 'bg-[#2D705C]/15 text-[#2D705C] border border-[#2D705C]/30',
    warning: 'bg-[#F4EEDC] text-[#8C6B1C] border border-[#DFC679]/70',
    danger: 'bg-[#E35D52]/10 text-[#E35D52] border border-[#E35D52]/25',
    info: 'bg-[#FBF8EF] text-[#2D705C] border border-[#2D705C]/30',
    ai: 'bg-[#6B4E71]/10 text-[#6B4E71] border border-[#6B4E71]/25',
  };

  const dotColors = {
    default: 'bg-[#7E8D88]',
    primary: 'bg-[#0B2F29]',
    accent: 'bg-[#C49A3A]',
    success: 'bg-[#2D705C]',
    warning: 'bg-[#C49A3A]',
    danger: 'bg-[#E35D52]',
    info: 'bg-[#2D705C]',
    ai: 'bg-[#6B4E71]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${pill ? 'rounded-full' : 'rounded-md'} select-none ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.default} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || dotColors.default}`} />}
      {children}
    </span>
  );
}

export function StatusBadge({ status, label, className = '' }) {
  const statusConfig = {
    active: { variant: 'success', label: label || 'Active', dot: true },
    admitted: { variant: 'primary', label: label || 'Admitted', dot: true },
    pending: { variant: 'warning', label: label || 'Pending', dot: true },
    overdue: { variant: 'danger', label: label || 'Overdue', dot: true },
    draft: { variant: 'default', label: label || 'Draft', dot: true },
    completed: { variant: 'success', label: label || 'Completed', dot: true },
    inactive: { variant: 'default', label: label || 'Inactive', dot: false },
    enquiry: { variant: 'info', label: label || 'Enquiry', dot: true },
  };

  const config = statusConfig[status?.toLowerCase()] || {
    variant: 'default',
    label: label || status || 'Unknown',
    dot: false,
  };

  return (
    <Badge variant={config.variant} dot={config.dot} className={className}>
      {config.label}
    </Badge>
  );
}

export function TrendIndicator({ value, label = '', direction = 'auto', className = '' }) {
  let isPositive = false;
  let isNegative = false;

  if (direction === 'up' || (typeof value === 'number' && value > 0) || (typeof value === 'string' && value.startsWith('+'))) {
    isPositive = true;
  } else if (direction === 'down' || (typeof value === 'number' && value < 0) || (typeof value === 'string' && value.startsWith('-'))) {
    isNegative = true;
  }

  const colorStyle = isPositive
    ? 'text-[#2D705C] bg-[#2D705C]/10 border border-[#2D705C]/25'
    : isNegative
    ? 'text-[#E35D52] bg-[#E35D52]/10 border border-[#E35D52]/25'
    : 'text-[#60706B] bg-[#EFE9DD] border border-[#E6DFD1]';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold tabular-nums ${colorStyle} ${className}`}>
      {isPositive && <ArrowUpRight className="w-3.5 h-3.5" />}
      {isNegative && <ArrowDownRight className="w-3.5 h-3.5" />}
      {!isPositive && !isNegative && <Minus className="w-3 h-3" />}
      <span>{value}</span>
      {label && <span className="font-normal text-[#60706B] ml-0.5">{label}</span>}
    </span>
  );
}

export default Badge;
