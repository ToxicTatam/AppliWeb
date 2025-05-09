'use client';

import React, { useState, useEffect } from 'react';

/**
 * Composant Alert hautement personnalisable
 * 
 * @param {string} variant - 'info', 'success', 'warning', 'error'
 * @param {string} title - Titre de l'alerte
 * @param {boolean} dismissible - Si l'alerte peut être fermée
 * @param {number} autoClose - Temps en ms avant la fermeture automatique (0 pour désactiver)
 * @param {string} className - Classes CSS supplémentaires
 * @param {boolean} withIcon - Afficher une icône selon la variante
 */
export default function Alert({
  variant = 'info',
  title = '',
  children,
  dismissible = false,
  autoClose = 0,
  withIcon = true,
  className = '',
  onClose,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(true);
  
  // Fermeture automatique
  useEffect(() => {
    if (autoClose > 0 && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoClose);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, isVisible]);
  
  // Gestion de la fermeture
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  // Variants
  const variantClasses = {
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100 border-blue-200 dark:border-blue-800',
    success: 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-100 border-green-200 dark:border-green-800',
    warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100 border-yellow-200 dark:border-yellow-800',
    error: 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-100 border-red-200 dark:border-red-800',
  };
  
  // Icônes par variant
  const icons = {
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
  };
  
  // Si l'alerte est fermée, ne rien afficher
  if (!isVisible) return null;
  
  return (
    <div 
      className={`flex p-4 rounded-md border ${variantClasses[variant] || variantClasses.info} ${className}`}
      role="alert"
      {...props}
    >
      {/* Icône */}
      {withIcon && (
        <div className="flex-shrink-0 mr-3">
          {icons[variant]}
        </div>
      )}
      
      {/* Contenu */}
      <div className="flex-grow">
        {title && (
          <h3 className="text-sm font-medium mb-1">{title}</h3>
        )}
        <div className="text-sm">{children}</div>
      </div>
      
      {/* Bouton de fermeture */}
      {dismissible && (
        <button
          type="button"
          className="flex-shrink-0 ml-3 -mr-1 -mt-1 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
          onClick={handleClose}
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}