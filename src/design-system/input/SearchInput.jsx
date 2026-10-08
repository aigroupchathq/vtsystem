import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchInput({
  value,
  onChange,
  onClear = null,
  placeholder = 'Search students, classes, records...',
  shortcut = null, // e.g. "⌘K"
  className = '',
  ...props
}) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-14 py-2 text-sm bg-[#FBF8EF] border border-[#E6DFD1] rounded-lg text-[#102625] placeholder:text-[#7E8D88] focus:bg-white focus:border-[#0B2F29] focus:ring-1 focus:ring-[#0B2F29] outline-none transition-all shadow-2xs"
        {...props}
      />
      <div className="absolute right-2.5 flex items-center gap-1.5">
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        {shortcut && (
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded select-none">
            {shortcut}
          </kbd>
        )}
      </div>
    </div>
  );
}

export function Select({
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  disabled = false,
  error = false,
  className = '',
  ...props
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors border px-3 py-2 disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed outline-none shadow-sm cursor-pointer ${
        error
          ? 'border-rose-400 focus:border-rose-600 focus:ring-1 focus:ring-rose-500'
          : 'border-slate-300 dark:border-slate-700 focus:border-[#0F4C35] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#0F4C35] dark:focus:ring-emerald-500'
      } ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
