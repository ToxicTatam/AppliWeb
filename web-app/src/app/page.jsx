import React from 'react';
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenue sur la plateforme de gestion des compétitions</h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
                Gérez vos équipes, compétitions et performances en toute simplicité.
            </p>
            <div className="space-x-4">
                <Link href="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Connexion
                </Link>
                <Link href="/auth/register" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                    Inscription
                </Link>
            </div>
        </div>
    );
}