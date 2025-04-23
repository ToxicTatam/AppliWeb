// app/auth/login/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoginForm from '@/component/auth/LoginForm';
import {useAuth} from "../../hooks/useAuth";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async (credentials) => {
        try {
            setLoading(true);
            setError('');

            const result = await login(credentials.email, credentials.password);

            if (!result.success) {
                throw new Error(result.error || 'Erreur de connexion');
            }

            const data = result.data;

            // Rediriger en fonction du rôle
            if (data.role === 'ADMIN' || data.role === 'ORGANIZER') {
                router.push('/dashboard/admin');
            } else if (data.role === 'COACH') {
                router.push('/dashboard/coach');
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            setError(error.message || 'Une erreur est survenue lors de la connexion');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Connexion</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Accédez à votre espace personnel
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <LoginForm onSubmit={handleLogin} loading={loading} />

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Pas encore de compte ?{' '}
                        <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                            S'inscrire
                        </Link>
                    </p>
                    <Link href="/auth/forgot-password" className="font-medium text-sm text-blue-600 hover:text-blue-500">
                        Mot de passe oublié ?
                    </Link>
                </div>
            </div>
        </div>
    );
}