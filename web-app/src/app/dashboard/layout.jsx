'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function DashboardLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!{user}) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  // Fonction pour déterminer les éléments de menu en fonction du rôle de l'utilisateur
  const getMenuItems = () => {
    const commonItems = [
      { name: 'Tableau de bord', href: '/dashboard', icon: 'home' },
      { name: 'Compétitions', href: '/dashboard/competitions', icon: 'trophy' },
      { name: 'Équipes', href: '/dashboard/teams', icon: 'users' },
      { name: 'Joueurs', href: '/dashboard/players', icon: 'user' },
      { name: 'Matchs', href: '/dashboard/matches', icon: 'calendar' },
      { name: 'Médiathèque', href: '/dashboard/media', icon: 'image' },
      { name: 'Mon Profil', href: '/dashboard/profile', icon: 'user-circle' },
    ];

    // Ajouter des éléments spécifiques au rôle
    if (user.role === 'ADMIN') {
      return [
        ...commonItems,
        { name: 'Gestion des utilisateurs', href: '/dashboard/admin/users', icon: 'users-cog' },
        { name: 'Configuration', href: '/dashboard/admin/settings', icon: 'cog' },
      ];
    } else if (user.role === 'ORGANIZER') {
      return [
        ...commonItems,
        { name: 'Mes Compétitions', href: '/dashboard/organizer/competitions', icon: 'clipboard-list' },
        { name: 'Planification des matchs', href: '/dashboard/organizer/schedule', icon: 'calendar-plus' },
      ];
    } else if (user.role === 'COACH') {
      return [
        ...commonItems,
        { name: 'Mes Équipes', href: '/dashboard/coach/teams', icon: 'users-cog' },
        { name: 'Feuilles de match', href: '/dashboard/coach/match-sheets', icon: 'clipboard-list' },
      ];
    } else if (user.role === 'PLAYER') {
      return [
        ...commonItems,
        { name: 'Mes Performances', href: '/dashboard/player/performances', icon: 'chart-line' },
        { name: 'Mon Équipe', href: '/dashboard/player/team', icon: 'users' },
        { name: 'Messages', href: '/dashboard/player/messages', icon: 'envelope' },
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  // Icônes simplifiées en SVG (vous pourriez utiliser une bibliothèque comme heroicons)
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'home':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        );
      case 'trophy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 3a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2h-2.5v4.25a3.25 3.25 0 106.5 0V7h1a2 2 0 012 2v.5a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5V9a2 2 0 012-2h1V5H7a2 2 0 01-2-2V3z" clipRule="evenodd" />
          </svg>
        );
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        );
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      case 'calendar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'user-circle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
        );
      case 'users-cog':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z" />
            <path d="M18 10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        );
      case 'cog':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        );
      case 'clipboard-list':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        );
      case 'calendar-plus':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            <path d="M10 9V7m0 4v2m0-2h2m-2 0H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'chart-line':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h12a1 1 0 100-2H3z" clipRule="evenodd" />
            <path d="M4 14a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3z" />
          </svg>
        );
      case 'envelope':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation mobile */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="ml-2 text-xl font-semibold">SportApp</span>
            </div>
            <div>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                onClick={logout}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-20 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
            <div className="fixed inset-y-0 left-0 w-64 bg-white z-30" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <span className="text-xl font-semibold">Menu</span>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="py-4">
                {menuItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-3">{getIcon(item.icon)}</span>
                    {item.name}
                  </Link>
                ))}
                <div className="px-4 py-6">
                  <div className="border-t border-gray-200 pt-4">
                    <button
                      type="button"
                      className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      onClick={logout}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm1 2h2v12H4V5zm4 0h8v12H8V5z" clipRule="evenodd" />
                        <path d="M15 8a1 1 0 10-2 0v4a1 1 0 102 0V8z" />
                      </svg>
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Layout desktop */}
      <div className="lg:flex">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:pt-5 lg:pb-4">
          <div className="flex items-center flex-shrink-0 px-6">
            <span className="text-2xl font-semibold">SportApp</span>
          </div>
          <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
            <nav className="px-3 mt-5">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span className="mr-3">{getIcon(item.icon)}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="pt-10 mt-10 border-t border-gray-200">
                <div className="px-2 space-y-1">
                  <button
                    type="button"
                    className="group flex items-center px-2 py-2 text-sm font-medium w-full rounded-md hover:bg-blue-50 hover:text-blue-600"
                    onClick={logout}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm1 2h2v12H4V5zm4 0h8v12H8V5z" clipRule="evenodd" />
                      <path d="M15 8a1 1 0 10-2 0v4a1 1 0 102 0V8z" />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 lg:hidden pt-14 sm:pt-16"></div>
          <main className="flex-1 pb-8">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}