// components/ui/Select.jsx
import React, { forwardRef } from 'react';

const Select = forwardRef(({
  options = [],
  className = '',
  error,
  ...props
}, ref) => {
  const baseClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
  const errorClasses = error ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : '';
  const selectClasses = `${baseClasses} ${errorClasses} ${className}`;
  
  return (
    <>
      <select
        ref={ref}
        className={selectClasses}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </>
  );
});

Select.displayName = 'Select';

export default Select;