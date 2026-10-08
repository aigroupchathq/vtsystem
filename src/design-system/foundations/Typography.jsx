import React from 'react';

/**
 * Enterprise Typography Foundation
 * Provides semantic typography hierarchy with calibrated scale, tracking, and leading.
 */

export function Heading({
  as: Component = 'h2',
  level = 'h2',
  children,
  className = '',
  ...props
}) {
  const styles = {
    display: 'text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50',
    h1: 'text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50',
    h2: 'text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50',
    h3: 'text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100',
    h4: 'text-base font-semibold text-slate-900 dark:text-slate-100',
    h5: 'text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400',
  };

  return (
    <Component className={`${styles[level] || styles.h2} ${className}`} {...props}>
      {children}
    </Component>
  );
}

export function Text({
  as: Component = 'p',
  variant = 'body',
  tone = 'default',
  children,
  className = '',
  ...props
}) {
  const variantStyles = {
    lead: 'text-lg text-slate-700 dark:text-slate-300 font-normal leading-relaxed',
    body: 'text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-normal',
    small: 'text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-normal',
    caption: 'text-xs text-slate-500 dark:text-slate-400 font-medium',
    code: 'text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700',
  };

  const toneStyles = {
    default: '',
    muted: 'text-slate-500 dark:text-slate-400',
    secondary: 'text-slate-600 dark:text-slate-300',
    brand: 'text-[#0F4C35] dark:text-emerald-400 font-medium',
    accent: 'text-amber-700 dark:text-amber-400 font-medium',
    danger: 'text-rose-600 dark:text-rose-400 font-medium',
    success: 'text-emerald-700 dark:text-emerald-400 font-medium',
  };

  return (
    <Component className={`${variantStyles[variant] || variantStyles.body} ${toneStyles[tone] || ''} ${className}`} {...props}>
      {children}
    </Component>
  );
}

export function NumericText({
  value,
  prefix = '',
  suffix = '',
  size = 'md',
  tone = 'default',
  className = '',
  ...props
}) {
  const sizeStyles = {
    sm: 'text-lg font-semibold',
    md: 'text-2xl font-bold tracking-tight',
    lg: 'text-3xl sm:text-4xl font-bold tracking-tight',
    xl: 'text-4xl sm:text-5xl font-extrabold tracking-tight',
  };

  const toneStyles = {
    default: 'text-slate-900 dark:text-white',
    brand: 'text-[#0F4C35] dark:text-emerald-400',
    accent: 'text-amber-700 dark:text-amber-400',
    success: 'text-emerald-600 dark:text-emerald-400',
    danger: 'text-rose-600 dark:text-rose-400',
    muted: 'text-slate-500 dark:text-slate-400',
  };

  return (
    <span className={`tabular-nums font-sans ${sizeStyles[size] || sizeStyles.md} ${toneStyles[tone] || toneStyles.default} ${className}`} {...props}>
      {prefix && <span className="text-[0.7em] font-normal text-slate-500 dark:text-slate-400 mr-1">{prefix}</span>}
      {value}
      {suffix && <span className="text-[0.7em] font-normal text-slate-500 dark:text-slate-400 ml-1">{suffix}</span>}
    </span>
  );
}
