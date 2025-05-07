import React from 'react';
import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

export default function Alert({ variant = 'info', children, className = '', onClose }) {
  const variantClasses = {
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };

  const IconComponent = {
    success: CheckCircle,
    warning: AlertTriangle,
    info: Info,
    error: XCircle,
  }[variant];

  const baseClasses = 'flex items-center p-4 mb-4 border rounded-lg';
  const alertClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={alertClasses} role="alert">
      <IconComponent className="flex-shrink-0 w-5 h-5 mr-2" />
      <span className="sr-only">{variant}</span>
      <div className="ml-1 text-sm font-medium">{children}</div>
      {onClose && (
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8"
          onClick={onClose}
          aria-label="Fermer"
        >
          <span className="sr-only">Fermer</span>
          <XCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
