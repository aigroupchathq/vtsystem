import React from 'react';

/**
 * VEDIC TREE OS — Card & Surface Primitives
 * Conforms to 3-Level Surface Hierarchy (Prompt 06):
 * Level 1: Open canvas
 * Level 2: Subtle surface (bg-white border border-[#E6DFD1])
 * Level 3: Elevated surface (only for interactive/important objects)
 */

export function Card({
  children,
  elevation = 'bordered', // 'flat' | 'bordered' | 'raised' | 'interactive'
  className = '',
  onClick = null,
  ...props
}) {
  const elevationStyles = {
    flat: 'bg-[#F4EEDC]/35 border border-[#E6DFD1]/70',
    bordered: 'bg-white border border-[#E6DFD1]',
    raised: 'bg-white border border-[#E6DFD1] shadow-sm',
    interactive:
      'bg-white border border-[#E6DFD1] hover:border-[#C49A3A]/60 transition-colors cursor-pointer',
  };

  return (
    <div
      className={`rounded-lg sm:rounded-xl overflow-hidden ${elevationStyles[elevation] || elevationStyles.bordered} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle = null,
  action = null,
  icon: Icon = null,
  className = '',
  children,
}) {
  return (
    <div className={`px-5 py-3.5 border-b border-[#EFE9DD] bg-[#FBF8EF]/40 flex items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-2.5 min-w-0">
        {Icon && (
          <div className="w-7 h-7 rounded-md bg-[#F4EEDC] border border-[#DFC679]/40 flex items-center justify-center text-[#8C6B1C] flex-shrink-0">
            <Icon className="w-3.5 h-3.5 text-[#C49A3A]" />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold tracking-tight text-[#102625] truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-[#60706B] truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
      {children}
    </div>
  );
}

export function CardBody({ children, className = '', padding = 'normal' }) {
  const paddingStyles = {
    none: 'p-0',
    compact: 'p-3 sm:p-4',
    normal: 'p-5 sm:p-6',
    spacious: 'p-6 sm:p-8',
  };

  return (
    <div className={`${paddingStyles[padding] || paddingStyles.normal} ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-5 py-3 bg-[#FBF8EF] border-t border-[#EFE9DD] flex items-center justify-between text-xs text-[#60706B] ${className}`}>
      {children}
    </div>
  );
}
