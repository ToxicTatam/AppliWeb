import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ 
  isOpen = false, 
  onClose, 
  title, 
  children, 
  className = '',
  size = 'md',
  closeOnClickOutside = true,
}) {
  const [isVisible, setIsVisible] = useState(isOpen);
  
  useEffect(() => {
    setIsVisible(isOpen);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnClickOutside) {
      handleClose();
    }
  };
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  if (!isVisible) return null;
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} ${className}`}
        role="document"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button 
            type="button" 
            className="text-gray-400 hover:text-gray-500"
            onClick={handleClose}
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}