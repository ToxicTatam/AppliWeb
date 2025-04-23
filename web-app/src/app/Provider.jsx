"use client"
import { useState, useEffect } from 'react';
import Sidebar from '@/component/layout/Sidebar';
import Footer from '@/component/layout/Footer';
import { useRouter } from 'next/navigation';
import {useAuth} from "./hooks/useAuth";
import Header from "@/component/layout/Header";


const LayoutContent = ({ children }) => {
    const { user, loading } = useAuth();  // useAuth est utilisé ici, après que AuthProvider soit rendu
    const [showSidebar, setShowSidebar] = useState(false);
    const router = useRouter();

    // Détermine si la page actuelle nécessite une sidebar
    useEffect(() => {
        // La sidebar est affichée pour les pages du tableau de bord
        const path = window.location.pathname;  // Utilisez window.location au lieu de router.pathname
        setShowSidebar(path.startsWith('/dashboard') && user);
    }, [user]);

    // Afficher un loader pendant la vérification de l'authentification
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <div className="flex-grow flex">
                {showSidebar && <Sidebar/>}
                <div className={`flex-grow ${showSidebar ? 'ml-0 md:ml-64' : ''}`}>
                    <div className="min-h-[calc(100vh-64px-160px)]">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LayoutContent;