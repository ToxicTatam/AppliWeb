// app/auth/forgot-password/page.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/component/ui/Button';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Dans un environnement réel, vous enverriez une requête API
            // Simulation de la requête
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSuccess(true);
        } catch (err) {
            setError('Une erreur est survenue lors de l\'envoi du lien de réinitialisation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Mot de passe oublié</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Nous vous enverrons un lien pour réinitialiser votre mot de passe
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {success ? (
                    <div className="text-center">
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            <p>Un email a été envoyé à <strong>{email}</strong> avec les instructions pour réinitialiser votre mot de passe.</p>
                        </div>
                        <p className="mb-4">Vérifiez votre boîte de réception et suivez les instructions.</p>
                        <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                            Retour à la page de connexion
                        </Link>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Adresse e-mail"
                                placeholder="votre@email.com"
                            />
                        </div>

                        <div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="primary"
                                loading={loading}
                            >
                                {loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
                            </Button>
                        </div>

                        <div className="text-center">
                            <Link href="/auth/login" className="text-sm text-blue-600 hover:text-blue-500">
                                Retour à la page de connexion
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}