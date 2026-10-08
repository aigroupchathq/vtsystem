import React from 'react';

export function Grid({
  children,
  cols = 3, // 1 | 2 | 3 | 4 | 6 | 12
  gap = 4, // 2 | 3 | 4 | 6 | 8
  className = '',
  ...props
}) {
  const colStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12',
  };

  const gapStyles = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4 sm:gap-5',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div
      className={`grid ${colStyles[cols] || colStyles[3]} ${gapStyles[gap] || gapStyles[4]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Stack({
  direction = 'vertical', // 'vertical' | 'horizontal'
  gap = 3,
  align = 'stretch', // 'start' | 'center' | 'end' | 'stretch'
  justify = 'start', // 'start' | 'center' | 'end' | 'between'
  wrap = false,
  children,
  className = '',
  ...props
}) {
  const dirStyles = direction === 'horizontal' ? 'flex-row' : 'flex-col';

  const gapStyles = {
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  const alignStyles = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyStyles = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div
      className={`flex ${dirStyles} ${gapStyles[gap] || gapStyles[3]} ${alignStyles[align] || alignStyles.stretch} ${justifyStyles[justify] || justifyStyles.start} ${wrap ? 'flex-wrap' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Section({
  title = null,
  description = null,
  action = null,
  badge = null,
  children,
  className = '',
}) {
  return (
    <section className={`space-y-4 ${className}`}>
      {(title || action || description) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
          <div>
            <div className="flex items-center gap-2.5">
              {title && (
                <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
                  {title}
                </h2>
              )}
              {badge}
            </div>
            {description && (
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {description}
              </p>
            )}
          </div>
          {action && <div className="flex items-center gap-2 self-start sm:self-auto">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
