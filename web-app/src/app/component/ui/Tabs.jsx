import React, { createContext, useContext, useState } from 'react';

// Créer un contexte pour partager l'état entre les composants
const TabsContext = createContext(null);

export function Tabs({ value, onValueChange, children, className, ...props }) {
  const [activeTab, setActiveTab] = useState(value);

  // Mise à jour du tab actif quand value change
  React.useEffect(() => {
    setActiveTab(value);
  }, [value]);

  // Fonction pour changer le tab actif
  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, onTabChange: handleTabChange }}>
      <div className={`tabs ${className || ''}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className, ...props }) {
  return (
    <div 
      className={`flex mb-4 ${className || ''}`} 
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className, disabled, ...props }) {
  const { activeTab, onTabChange } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      className={`px-4 py-2 font-medium text-sm rounded-t-lg border-b-2 ${
        isActive 
          ? 'border-blue-500 text-blue-600' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      } transition-colors ${className || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !disabled && onTabChange(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className, ...props }) {
  const { activeTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  if (!isActive) return null;
  
  return (
    <div 
      role="tabpanel"
      className={`tab-content ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}