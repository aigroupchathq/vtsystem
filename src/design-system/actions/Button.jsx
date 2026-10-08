import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * VEDIC TREE OS — Button Primitives (Prompt 06)
 * Editorial restraint: High contrast, quiet secondary states, authentic colors.
 */

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'saffron'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  icon: Icon = null,
  iconRight: IconRight = null,
  className = '',
  type = 'button',
  ...props
}) {
  const sizeStyles = {
    sm: 'h-8 px-2.5 text-xs gap-1.5 rounded-md font-medium',
    md: 'h-9 px-3.5 text-xs gap-2 rounded-lg font-medium',
    lg: 'h-10 px-4 text-sm gap-2 rounded-lg font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[#0B2F29] hover:bg-[#154E42] text-[#FBF8EF] border border-[#0B2F29] active:translate-y-[1px] cursor-pointer',
    secondary:
      'bg-[#FBF8EF] hover:bg-[#EFE9DD] text-[#102625] border border-[#E6DFD1] active:translate-y-[1px] cursor-pointer',
    outline:
      'bg-transparent hover:bg-[#FBF8EF] text-[#102625] border border-[#E6DFD1] active:translate-y-[1px] cursor-pointer',
    ghost:
      'bg-transparent hover:bg-[#F4EEDC]/60 text-[#60706B] hover:text-[#0B2F29] cursor-pointer',
    danger:
      'bg-[#E35D52] hover:bg-[#D0493E] text-white border border-[#E35D52] active:translate-y-[1px] cursor-pointer',
    saffron:
      'bg-[#C49A3A] hover:bg-[#B38A2B] text-white border border-[#C49A3A] active:translate-y-[1px] cursor-pointer',
    link:
      'bg-transparent hover:underline text-[#0B2F29] hover:text-[#154E42] p-0 h-auto border-none cursor-pointer',
  };

  const focusStyle =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2F29] focus-visible:ring-offset-1 focus-visible:ring-offset-[#FBF8EF]';

  const disabledStyle = 'opacity-50 cursor-not-allowed pointer-events-none';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      className={`inline-flex items-center justify-center transition-all duration-150 select-none whitespace-nowrap ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${focusStyle} ${disabled || loading ? disabledStyle : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}
      <span>{children}</span>
      {!loading && IconRight && <IconRight className="w-4 h-4 flex-shrink-0" />}
    </button>
  );
}

export function IconButton({
  icon: Icon,
  label,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) {
  const sizeStyles = {
    sm: 'w-8 h-8 rounded-md',
    md: 'w-9 h-9 rounded-lg',
    lg: 'w-10 h-10 rounded-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const variantStyles = {
    primary: 'bg-[#0B2F29] hover:bg-[#154E42] text-[#FBF8EF]',
    secondary: 'bg-[#FBF8EF] hover:bg-[#EFE9DD] text-[#102625] border border-[#E6DFD1]',
    outline: 'bg-transparent hover:bg-[#FBF8EF] text-[#102625] border border-[#E6DFD1]',
    ghost: 'bg-transparent hover:bg-[#FBF8EF] text-[#60706B] hover:text-[#0B2F29]',
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2F29] cursor-pointer ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.ghost} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className={`${iconSizes[size] || 'w-4 h-4'} animate-spin`} />
      ) : Icon ? (
        <Icon className={iconSizes[size] || 'w-4 h-4'} />
      ) : null}
    </button>
  );
}

export default Button;
