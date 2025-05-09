'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import UserForm from './UserForm';
import authService from '@/services/auth-service';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';

/**
 * Formulaire de connexion utilisateur
 */
const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Récupérer les paramètres d'URL pour le message et l'URL de retour
  const returnUrl = searchParams.get('returnUrl') || '/dashboard';
  const registered = searchParams.get('registered') === 'true';
  const resetSuccess = searchParams.get('reset') === 'success';

  // Champs du formulaire de connexion
  const loginFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Entrez votre email',
      required: true,
      autoComplete: 'email'
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: 'password',
      placeholder: 'Entrez votre mot de passe',
      required: true,
      autoComplete: 'current-password'
    }
  ];

  // Gestion de la soumission du formulaire
  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await authService.login(formData);
      
      if (response.user) {
        // Utiliser setUser du context pour mettre à jour globalement l'utilisateur
        setUser && setUser(response.user);
        
        // Afficher une notification de succès
        showNotification && showNotification({
          type: 'success',
          title: 'Connexion réussie',
          message: `Bienvenue, ${response.user.firstName || response.user.userName}!`
        });
        
        // Rediriger vers la page demandée ou le tableau de bord
        router.push(returnUrl);
      } else {
        setError('Une erreur est survenue lors de la connexion.');
      }
    } catch (err) {
      setError(err.message || 'Identifiants invalides. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Message de succès basé sur les paramètres d'URL
  let successMessage = '';
  if (registered) {
    successMessage = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
  } else if (resetSuccess) {
    successMessage = 'Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.';
  }

  // Pied de page du formulaire avec liens vers inscription et mot de passe oublié
  const formFooter = (
    <>
      <p>
        Vous n'avez pas de compte ?{' '}
        <Link 
          href="/register" 
          className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium"
        >
          Inscrivez-vous
        </Link>
      </p>
      <p className="mt-2">
        <Link 
          href="/forgot-password" 
          className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium"
        >
          Mot de passe oublié ?
        </Link>
      </p>
    </>
  );

  return (
    <UserForm
      title="Connexion"
      fields={loginFields}
      submitText="Se connecter"
      onSubmit={handleLogin}
      isLoading={isLoading}
      error={error}
      footer={formFooter}
      successMessage={successMessage}
    />
  );
};

export default LoginForm;