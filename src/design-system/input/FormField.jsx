import React from 'react';

export function FormField({
  label,
  id,
  required = false,
  error = null,
  hint = null,
  children,
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold uppercase tracking-wider text-[#102625]"
        >
          {label}
          {required && <span className="text-[#991B1B] ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-xs text-[#334E47] font-medium mt-1">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-[#991B1B] font-semibold mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  disabled = false,
  error = false,
  icon: Icon = null,
  prefix = null,
  suffix = null,
  className = '',
  ...props
}) {
  return (
    <div className="relative flex items-center w-full">
      {Icon && (
        <div className="absolute left-3 text-[#334E47] pointer-events-none">
          <Icon className="w-4 h-4" />
        </div>
      )}
      {prefix && (
        <span className="absolute left-3 text-xs font-semibold text-[#334E47] select-none">
          {prefix}
        </span>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-lg text-sm bg-white text-[#102625] placeholder:text-[#475569] transition-colors border ${
          error
            ? 'border-[#991B1B] focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B]'
            : 'border-[#E6DFD1] focus:border-[#0B2F29] focus:ring-1 focus:ring-[#0B2F29]'
        } ${Icon ? 'pl-9' : prefix ? 'pl-8' : 'pl-3.5'} ${suffix ? 'pr-8' : 'pr-3.5'} py-2 disabled:bg-[#EAE6D6] disabled:text-[#4A665F] disabled:cursor-not-allowed outline-none shadow-2xs ${className}`}
        {...props}
      />
      {suffix && (
        <span className="absolute right-3 text-xs font-semibold text-[#334E47] select-none">
          {suffix}
        </span>
      )}
    </div>
  );
}
