import React from 'react';
import { Avatar } from '../foundations/Avatar.jsx';
import { Badge } from '../foundations/Badge.jsx';

export function PersonRow({
  name,
  subtitle,
  avatarSrc = null,
  role = null,
  campus = null,
  badge = null,
  action = null,
  onClick = null,
  className = '',
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm ${
        onClick ? 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 hover:shadow transition-all' : ''
      } ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Avatar name={name} src={avatarSrc} size="md" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{name}</h4>
            {badge}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
            {subtitle && <span>{subtitle}</span>}
            {role && (
              <>
                <span>•</span>
                <span className="font-medium text-slate-600 dark:text-slate-300">{role}</span>
              </>
            )}
            {campus && (
              <>
                <span>•</span>
                <Badge variant="default" size="sm">
                  {campus}
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>
      {action && <div className="flex items-center gap-2 flex-shrink-0 ml-3">{action}</div>}
    </div>
  );
}

export function StudentAvatar({
  name,
  grade = null,
  division = null,
  src = null,
  size = 'md',
  className = '',
}) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <Avatar name={name} src={src} size={size} tone="brand" />
      <div className="text-left">
        <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{name}</p>
        {(grade || division) && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {grade} {division ? `• ${division}` : ''}
          </p>
        )}
      </div>
    </div>
  );
}
