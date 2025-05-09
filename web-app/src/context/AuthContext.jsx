'use client';

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Types d'utilisateurs disponibles dans l'application
export const USER_ROLES = {
  USER: 'USER',
  PLAYER: 'PLAYER',
  COACH: 'COACH',
  ADMIN: 'ADMIN',
  ORGANIZER: 'ORGANIZER',
};

// Création du contexte d'authentification
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Vérification de l'authentification au chargement du composant
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérifier si un token existe dans le localStorage
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // Récupérer les informations de l'utilisateur depuis le backend
          const response = await fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Si la réponse n'est pas OK, le token est probablement expiré
            localStorage.removeItem('auth_token');
            setUser(null);
          }
        }
      } catch (err) {
        setError('Impossible de vérifier votre authentification.');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Appel à l'API de connexion
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
        
        // Redirection en fonction du rôle
        if (data.user.role === USER_ROLES.ADMIN) {
          router.push('/admin');
        } else if (data.user.role === USER_ROLES.COACH) {
          router.push('/coach');
        } else if (data.user.role === USER_ROLES.ORGANIZER) {
          router.push('/organizer');
        } else if (data.user.role === USER_ROLES.PLAYER) {
          router.push('/player');
        } else {
          router.push('/dashboard');
        }
        
        return { success: true };
      } else {
        setError(data.message || 'Échec de la connexion. Vérifiez vos identifiants.');
        return { success: false, error: data.message };
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
      return { success: false, error: 'Une erreur s\'est produite. Veuillez réessayer.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    router.push('/login');
  };

  // Fonction d'inscription
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirection vers la page de connexion après une inscription réussie
        router.push('/login?registered=true');
        return { success: true };
      } else {
        setError(data.message || 'Échec de l\'inscription. Veuillez réessayer.');
        return { success: false, error: data.message };
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
      return { success: false, error: 'Une erreur s\'est produite. Veuillez réessayer.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour récupérer le mot de passe
  const forgotPassword = async (email) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: 'Instructions envoyées à votre email.' };
      } else {
        setError(data.message || 'Échec de la demande. Veuillez réessayer.');
        return { success: false, error: data.message };
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
      return { success: false, error: 'Une erreur s\'est produite. Veuillez réessayer.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (requiredRole) => {
    if (!user) return false;
    return user.role === requiredRole;
  };

  // Fonction pour vérifier si l'utilisateur a l'un des rôles spécifiés
  const hasAnyRole = (requiredRoles) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    register,
    forgotPassword,
    hasRole,
    hasAnyRole,
    userRoles: USER_ROLES,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};