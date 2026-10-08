import React from 'react';

export function Divider({
  orientation = 'horizontal',
  label = null,
  className = '',
}) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`w-px h-full min-h-[1.25rem] bg-slate-200 dark:bg-slate-700/80 mx-2 self-stretch ${className}`}
      />
    );
  }

  if (label) {
    return (
      <div className={`relative flex items-center my-4 ${className}`} role="separator">
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
        <span className="flex-shrink mx-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={`border-0 border-t border-slate-200 dark:border-slate-800 my-4 w-full ${className}`}
    />
  );
}

export function Tooltip({
  content,
  children,
  position = 'top',
  className = '',
}) {
  const [isVisible, setIsVisible] = React.useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && content && (
        <div
          role="tooltip"
          className={`absolute z-50 px-2.5 py-1 text-xs font-medium text-slate-100 bg-slate-900 dark:bg-slate-800 rounded shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-150 border border-slate-700 ${positionStyles[position] || positionStyles.top} ${className}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
