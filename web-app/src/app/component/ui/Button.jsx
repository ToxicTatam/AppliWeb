// components/ui/Button.jsx
import React from 'react';

export default function Button({
                                   children,
                                   type = 'button',
                                   variant = 'primary',
                                   size = 'md',
                                   fullWidth = false,
                                   loading = false,
                                   disabled = false,
                                   onClick,
                                   className = '',
                                   ...props
                               }) {
    const baseClasses = 'font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 text-gray-900',
        success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white',
        danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
        outline: 'bg-white border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 text-gray-700',
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    const loadingClass = loading ? 'opacity-75 cursor-not-allowed' : '';

    return (
        <button
            type={type}
            className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${loadingClass}
        ${className}
      `}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
}