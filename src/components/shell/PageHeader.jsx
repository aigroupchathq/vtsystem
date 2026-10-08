import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Badge } from '../../design-system/foundations/Badge.jsx';

export function PageHeader({
  breadcrumbs = [], // [{ label: 'Students', onClick: ... }]
  title,
  description = null,
  badge = null,
  scope = null,
  actions = null,
  secondaryActions = null,
  className = '',
}) {
  return (
    <div className={`mb-6 sm:mb-8 space-y-2.5 pb-4 border-b border-slate-200 dark:border-slate-800 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">
            <Home className="w-3.5 h-3.5" />
          </span>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              {crumb.onClick ? (
                <button
                  type="button"
                  onClick={crumb.onClick}
                  className="hover:text-[#0F4C35] dark:hover:text-emerald-400 transition-colors font-medium truncate max-w-[150px] sm:max-w-none"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[180px] sm:max-w-none">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Main Row: Title & Action CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h1>
            {badge}
            {scope && (
              <Badge variant="primary" dot size="sm">
                {scope}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {(actions || secondaryActions) && (
          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
            {secondaryActions}
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
