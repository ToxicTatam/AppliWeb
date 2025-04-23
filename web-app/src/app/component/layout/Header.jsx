"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Bell, Menu, X, User, LogOut } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    // Récupération des notifications (simulé)
    useEffect(() => {
        if (user) {
            // Appel API pour récupérer les notifications
            // setNotifications(data);
        }
    }, [user]);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <header className="bg-blue-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold flex items-center">
                        <span>FootballManager</span>
                    </Link>
                </div>

                {/* Menu de navigation - version desktop */}
                <nav className="hidden md:flex space-x-6">
                    <Link href="/competitions" className="hover:text-blue-200">Compétitions</Link>
                    <Link href="/teams" className="hover:text-blue-200">Équipes</Link>
                    <Link href="/gallery" className="hover:text-blue-200">Galerie</Link>
                    {user && (
                        <Link href="/dashboard" className="hover:text-blue-200">Tableau de bord</Link>
                    )}
                </nav>

                {/* Actions utilisateur */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            {/* Icône notifications */}
                            <div className="relative">
                                <button className="hover:text-blue-200">
                                    <Bell size={20} />
                                    {notifications.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                      {notifications.length}
                    </span>
                                    )}
                                </button>
                            </div>

                            {/* Menu utilisateur */}
                            <div className="relative">
                                <button onClick={toggleDropdown} className="flex items-center hover:text-blue-200">
                                    <User size={20} className="mr-1" />
                                    <span className="hidden md:inline">{user.name}</span>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-10">
                                        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                            Mon profil
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                                        >
                                            <LogOut size={16} className="mr-2" />
                                            Se déconnecter
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="space-x-2">
                            <Link href="/auth/login" className="hover:text-blue-200">
                                Connexion
                            </Link>
                            <Link href="/auth/register" className="bg-white text-blue-800 px-3 py-1 rounded-md hover:bg-blue-100">
                                Inscription
                            </Link>
                        </div>
                    )}

                    {/* Bouton menu mobile */}
                    <button className="md:hidden" onClick={toggleMobileMenu}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Menu mobile */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-blue-900 p-4">
                    <nav className="flex flex-col space-y-3">
                        <Link href="/competitions" className="hover:text-blue-200">Compétitions</Link>
                        <Link href="/teams" className="hover:text-blue-200">Équipes</Link>
                        <Link href="/gallery" className="hover:text-blue-200">Galerie</Link>
                        {user && (
                            <Link href="/dashboard" className="hover:text-blue-200">Tableau de bord</Link>
                        )}
                        {!user && (
                            <>
                                <Link href="/auth/login" className="hover:text-blue-200">Connexion</Link>
                                <Link href="/auth/register" className="hover:text-blue-200">Inscription</Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;