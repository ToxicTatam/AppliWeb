// app/auth/register/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RegisterForm from '@/component/auth/RegisterForm';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleRegister = async (userData) => {
        try {
            setLoading(true);
            setError('');
            setSuccess('');

            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de l\'inscription');
            }

            setSuccess('Inscription réussie ! Vous allez être redirigé vers la page de connexion...');

            // Attendre 2 secondes avant de rediriger vers la page de connexion
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        } catch (error) {
            setError(error.message || 'Une erreur est survenue lors de l\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Créer un compte</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Rejoignez notre plateforme de gestion sportive
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{success}</span>
                    </div>
                )}

                <RegisterForm onSubmit={handleRegister} loading={loading} />

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Déjà inscrit ?{' '}
                        <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}