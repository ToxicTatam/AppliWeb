"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
    Home, Users, Trophy, Calendar, Clipboard,
    Settings, FileText, Image, User as UserIcon,
    ChevronDown, ChevronRight
} from 'lucide-react';

const Sidebar = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [expandedMenu, setExpandedMenu] = useState(null);

    if (!user) return null; // Ne pas afficher la sidebar pour les utilisateurs non connectés

    const isActiveLink = (path) => {
        return router.pathname.startsWith(path);
    };

    const toggleMenu = (menuName) => {
        setExpandedMenu(expandedMenu === menuName ? null : menuName);
    };

    // Définir les menus en fonction du rôle de l'utilisateur
    const renderMenuItems = () => {
        const role = user?.role;

        const commonItems = [
            {
                icon: <Home size={20} />,
                label: 'Tableau de bord',
                path: '/dashboard'
            },
            {
                icon: <Trophy size={20} />,
                label: 'Compétitions',
                path: '/competitions'
            },
            {
                icon: <Image size={20} />,
                label: 'Galerie Photos',
                path: '/gallery'
            },
            {
                icon: <UserIcon size={20} />,
                label: 'Mon Profil',
                path: '/profile'
            }
        ];

        // Menus pour les coachs
        const coachItems = [
            {
                icon: <Users size={20} />,
                label: 'Mes Équipes',
                path: '/dashboard/coach/teams',
                submenu: [
                    { label: 'Liste des équipes', path: '/dashboard/coach/teams' },
                    { label: 'Gestion des joueurs', path: '/dashboard/coach/players' }
                ]
            },
            {
                icon: <Clipboard size={20} />,
                label: 'Feuilles de Match',
                path: '/dashboard/coach/match-sheets'
            }
        ];

        // Menus pour les administrateurs/organisateurs
        const adminItems = [
            {
                icon: <Trophy size={20} />,
                label: 'Gestion Compétitions',
                path: '/dashboard/admin/competitions',
                submenu: [
                    { label: 'Liste des compétitions', path: '/dashboard/admin/competitions' },
                    { label: 'Créer une compétition', path: '/dashboard/admin/competitions/create' }
                ]
            },
            {
                icon: <Calendar size={20} />,
                label: 'Matchs',
                path: '/dashboard/admin/matches'
            },
            {
                icon: <Users size={20} />,
                label: 'Gestion Coachs',
                path: '/dashboard/admin/coaches'
            },
            {
                icon: <FileText size={20} />,
                label: 'Statistiques',
                path: '/dashboard/admin/statistics'
            },
            {
                icon: <Settings size={20} />,
                label: 'Paramètres',
                path: '/dashboard/admin/settings'
            }
        ];

        // Retourner les menus appropriés selon le rôle
        if (role === 'ADMIN' || role === 'ORGANIZER') {
            return [...commonItems, ...adminItems];
        } else if (role === 'COACH') {
            return [...commonItems, ...coachItems];
        }

        return commonItems;
    };

    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen flex-shrink-0 hidden md:block">
            <div className="p-4">
                <div className="flex items-center justify-center p-2 mb-6">
                    <span className="text-xl font-bold">FootballManager</span>
                </div>

                <nav>
                    <ul className="space-y-2">
                        {renderMenuItems().map((item, index) => (
                            <li key={index}>
                                {item.submenu ? (
                                    <div className="mb-2">
                                        <button
                                            onClick={() => toggleMenu(item.label)}
                                            className={`flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700 ${
                                                isActiveLink(item.path) ? 'bg-gray-700' : ''
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                {item.icon}
                                                <span className="ml-3">{item.label}</span>
                                            </div>
                                            {expandedMenu === item.label ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                        </button>

                                        {expandedMenu === item.label && (
                                            <ul className="ml-6 mt-2 space-y-1">
                                                {item.submenu.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            href={subItem.path}
                                                            className={`block p-2 rounded-md hover:bg-gray-700 ${
                                                                router.pathname === subItem.path ? 'bg-gray-700' : ''
                                                            }`}
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.path}
                                        className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${
                                            isActiveLink(item.path) ? 'bg-gray-700' : ''
                                        }`}
                                    >
                                        {item.icon}
                                        <span className="ml-3">{item.label}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;