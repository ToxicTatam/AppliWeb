'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { navigationLinks } from '@/components/utils/navigationLinks';
import Image from 'next/image';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';

export default function DashboardLayout({ children }) {
  const { user, logout, hasRole, userRoles } = useAuth();
  const { theme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Protection du layout contre les accès non authentifiés
  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-green-600">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-14 h-14 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="mt-4 text-white font-medium text-xl">Chargement...</p>
        </div>
      </div>
    );
  }

  // Ajout des sections spécifiques pour les rôles PLAYER, COACH et ORGANIZER
  if (hasRole(userRoles.PLAYER) || hasRole(userRoles.COACH) || hasRole(userRoles.ORGANIZER) || hasRole(userRoles.ADMIN)) {
    navigationLinks.push(
      { name: 'Messagerie', href: '/messages', icon: 'message' },
      { name: 'Notifications', href: '/notifications', icon: 'notification' }
    );
  }

  // Ajout des sections de gestion pour les COACH et ORGANIZER
  if (hasRole(userRoles.COACH)) {
    navigationLinks.push(
      { name: 'Gestion d\'équipe', href: '/coach/teams', icon: 'manage-teams' },
      { name: 'Gestion de joueurs', href: '/coach/players', icon: 'manage-players' },
      { name: 'Gestion de matchs', href: '/coach/matches', icon: 'manage-matches' }
    );
  }

  if (hasRole(userRoles.ORGANIZER)) {
    navigationLinks.push(
      { name: 'Gestion de compétitions', href: '/organizer/competitions', icon: 'manage-competitions' },
      { name: 'Gestion de matchs', href: '/organizer/matches', icon: 'manage-matches' }
    );
  }

  // Sections pour ADMIN
  if (hasRole(userRoles.ADMIN)) {
    navigationLinks.push(
      { name: 'Administration', href: '/admin', icon: 'admin' }
    );
  }

  // Fonction pour récupérer l'icône appropriée
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'dashboard':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        );
      case 'trophy':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
          </svg>
        );
      case 'team':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        );
      case 'user':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        );
      case 'whistle':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        );
      case 'media':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        );
      case 'message':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        );
      case 'notification':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        );
      case 'manage-teams':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        );
      case 'manage-players':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
          </svg>
        );
      case 'manage-matches':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        );
      case 'manage-competitions':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        );
      case 'admin':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
    }
  };

  // Déterminer les classes CSS en fonction du thème
  const sidebarClasses = theme.isDark 
    ? "hidden md:flex flex-col w-64 bg-gray-900 text-white" 
    : "hidden md:flex flex-col w-64 bg-green-800 text-white";
  
  const sidebarBorderClass = theme.isDark 
    ? "border-gray-800" 
    : "border-green-700";
  
  const sidebarHoverClass = theme.isDark 
    ? "hover:bg-gray-800" 
    : "hover:bg-green-700";
  
  const activeNavClass = theme.isDark 
    ? "bg-gray-700 text-white font-semibold" 
    : "bg-white text-green-800 font-semibold";

  return (
    <div className={`flex h-screen ${theme.isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      {/* Sidebar - Version Desktop */}
      <div className={sidebarClasses}>
        <div className={`p-4 flex items-center justify-center border-b ${sidebarBorderClass}`}>
          <div className={`${theme.isDark ? 'bg-gray-800' : 'bg-white'} p-2 rounded-full`}>
            <svg className={`w-8 h-8 ${theme.isDark ? 'text-white' : 'text-green-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="ml-3 text-xl font-bold">SportApp</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {navigationLinks.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                  pathname.startsWith(link.href)
                    ? activeNavClass
                    : `text-white ${sidebarHoverClass}`
                }`}
              >
                {getIcon(link.icon)}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </nav>
        
        <div className={`p-4 border-t ${sidebarBorderClass}`}>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
              {user.profilePicture ? (
                <Image 
                  src={user.profilePicture} 
                  alt={user.firstName} 
                  width={40} 
                  height={40} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-600 text-white text-lg font-bold">
                  {user.firstName?.charAt(0) || user.userName?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-green-300">{user.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className={`mt-3 w-full flex items-center justify-center space-x-2 p-2 rounded-lg ${theme.isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-700 hover:bg-green-600'} transition-colors duration-200`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Header et contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`${theme.isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-sm z-10`}>
          <div className="flex items-center justify-between p-4">
            {/* Bouton du menu mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>

            {/* Logo sur mobile */}
            <div className="md:hidden flex items-center">
              <div className={`${theme.isDark ? 'bg-white' : 'bg-green-800'} p-1 rounded-full mr-2`}>
                <svg className={`w-6 h-6 ${theme.isDark ? 'text-gray-900' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold">SportApp</span>
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center space-x-4">
              {/* Sélecteur de thème */}
              <ThemeToggle className="hidden md:block" />
              
              {/* Notifications */}
              {(hasRole(userRoles.PLAYER) || hasRole(userRoles.COACH) || hasRole(userRoles.ORGANIZER) || hasRole(userRoles.ADMIN)) && (
                <Link href="/notifications" className={`${theme.isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-green-800'}`}>
                  <div className="relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">5</span>
                  </div>
                </Link>
              )}

              {/* Profil sur mobile */}
              <div className="md:hidden">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                    {user.profilePicture ? (
                      <Image 
                        src={user.profilePicture} 
                        alt={user.firstName} 
                        width={32} 
                        height={32} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-600 text-white text-sm font-bold">
                        {user.firstName?.charAt(0) || user.userName?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                </button>
              </div>
              
              {/* Thème sur mobile */}
              <div className="md:hidden">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className={`md:hidden ${theme.isDark ? 'bg-gray-900' : 'bg-green-800'} text-white absolute inset-x-0 top-16 z-20 h-screen`}>
            <nav className="p-4">
              <div className="space-y-2">
                {navigationLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.name}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                      pathname.startsWith(link.href)
                        ? theme.isDark ? 'bg-gray-700 text-white font-semibold' : 'bg-white text-green-800 font-semibold'
                        : `text-white ${theme.isDark ? 'hover:bg-gray-800' : 'hover:bg-green-700'}`
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {getIcon(link.icon)}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
              <div className={`mt-6 pt-6 border-t ${theme.isDark ? 'border-gray-800' : 'border-green-700'}`}>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                    {user.profilePicture ? (
                      <Image 
                        src={user.profilePicture} 
                        alt={user.firstName} 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-600 text-white text-lg font-bold">
                        {user.firstName?.charAt(0) || user.userName?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                    <p className={`text-xs ${theme.isDark ? 'text-gray-400' : 'text-green-300'}`}>{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className={`mt-3 w-full flex items-center justify-center space-x-2 p-2 rounded-lg ${theme.isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-700 hover:bg-green-600'} transition-colors duration-200`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  <span>Déconnexion</span>
                </button>
              </div>
            </nav>
          </div>
        )}

        {/* Contenu principal */}
        <main className={`flex-1 overflow-y-auto p-4 ${theme.isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className={`${theme.isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-sm p-5`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}