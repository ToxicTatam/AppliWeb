// app/dashboard/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/component/layout/PageContainer';
import Loading from '@/component/ui/Loading';

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Récupérer les informations de l'utilisateur depuis le localStorage
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!storedUser || !token) {
            // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
            router.push('/auth/login');
            return;
        }

        try {
            const userData = JSON.parse(storedUser);
            setUser(userData);

            // Rediriger vers le tableau de bord spécifique en fonction du rôle
            if (userData.role === 'ADMIN' || userData.role === 'ORGANIZER') {
                router.push('/dashboard/admin');
            } else if (userData.role === 'COACH') {
                router.push('/dashboard/coach');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur:', error);
            router.push('/auth/login');
        } finally {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading size="lg" />
            </div>
        );
    }

    return (
        <PageContainer title="Tableau de bord">
            <div className="text-center">
                <p>Redirection en cours vers votre tableau de bord personnalisé...</p>
            </div>
        </PageContainer>
    );
}