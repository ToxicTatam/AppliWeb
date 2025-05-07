// components/ui/Input.jsx
import React, { forwardRef } from 'react';

const Input = forwardRef(({
  type = 'text',
  className = '',
  error,
  ...props
}, ref) => {
  const baseClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
  const errorClasses = error ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : '';
  const inputClasses = `${baseClasses} ${errorClasses} ${className}`;
  
  return (
    <>
      <input
        ref={ref}
        type={type}
        className={inputClasses}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </>
  );
});

Input.displayName = 'Input';

export default Input;