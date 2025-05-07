"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const defaultUserData = {
    id: null,
    email: '',
    role: 'COACH', // ou 'USER', 'ADMIN', selon les rôles définis dans ton backend
    nom: '',
    prenom: ''
};


export function AuthProvider({ children }) {
  const [user, setUser] = useState(defaultUserData);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Vérifiez si l'utilisateur est déjà connecté au chargement
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await axios.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
          setRole(response.data.role);
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('authToken', token);
      setUser(user);
      setRole(user.role);
      
      toast.success('Connexion réussie');
      router.push('/dashboard');
      return user;
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur de connexion';
      toast.error(message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      toast.success('Inscription réussie. Vous pouvez maintenant vous connecter.');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de l\'inscription';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setRole(null);
    toast.success('Déconnexion réussie');
    router.push('/auth/login');
  };

  const updateProfile = async (userData) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put('/api/auth/profile', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser(response.data);
      toast.success('Profil mis à jour avec succès');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la mise à jour du profil';
      toast.error(message);
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      await axios.post('/api/auth/forgot-password', { email });
      toast.success('Instructions envoyées à votre adresse email');
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la récupération du mot de passe';
      toast.error(message);
      throw error;
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await axios.post('/api/auth/reset-password', { token, password });
      toast.success('Mot de passe réinitialisé avec succès');
      router.push('/auth/login');
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la réinitialisation du mot de passe';
      toast.error(message);
      throw error;
    }
  };

  // Nouvelles fonctions de gestion des utilisateurs pour l'administration
  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');
      // En environnement de développement, on simule une réponse API
      // À remplacer par un vrai appel API en production
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simuler un délai réseau
        
        // Données simulées
        const mockUsers = [
          { 
            id: 1, 
            prenom: 'Jean', 
            nom: 'Dupont', 
            email: 'jean.dupont@example.com', 
            role: 'ADMIN', 
            status: 'ACTIVE', 
            createdAt: '2025-01-15T10:30:00', 
            lastLogin: '2025-05-05T14:22:00' 
          },
          { 
            id: 2, 
            prenom: 'Marie', 
            nom: 'Martin', 
            email: 'marie.martin@example.com', 
            role: 'ORGANIZER', 
            status: 'ACTIVE', 
            createdAt: '2025-01-20T11:45:00', 
            lastLogin: '2025-05-06T09:15:00' 
          },
          { 
            id: 3, 
            prenom: 'Pierre', 
            nom: 'Durand', 
            email: 'pierre.durand@example.com', 
            role: 'COACH', 
            status: 'ACTIVE', 
            createdAt: '2025-02-05T09:20:00', 
            lastLogin: '2025-05-04T16:30:00' 
          },
          { 
            id: 4, 
            prenom: 'Sophie', 
            nom: 'Bernard', 
            email: 'sophie.bernard@example.com', 
            role: 'PLAYER', 
            status: 'ACTIVE', 
            createdAt: '2025-02-10T14:10:00', 
            lastLogin: '2025-05-03T18:45:00' 
          },
          { 
            id: 5, 
            prenom: 'Lucas', 
            nom: 'Petit', 
            email: 'lucas.petit@example.com', 
            role: 'ORGANIZER', 
            status: 'INACTIVE', 
            createdAt: '2025-02-15T16:30:00', 
            lastLogin: '2025-04-20T10:05:00' 
          },
          { 
            id: 6, 
            prenom: 'Emma', 
            nom: 'Leroy', 
            email: 'emma.leroy@example.com', 
            role: 'COACH', 
            status: 'PENDING', 
            createdAt: '2025-03-01T08:45:00', 
            lastLogin: null 
          },
        ];
        
        return mockUsers;
      } else {
        const response = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la récupération des utilisateurs';
      toast.error(message);
      throw error;
    }
  };

  const getUserById = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      // Simulation pour le développement
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simuler un délai réseau
        
        // Trouver l'utilisateur dans les données simulées
        const mockUsers = await getAllUsers();
        const user = mockUsers.find(u => u.id === userId);
        
        if (!user) {
          throw new Error('Utilisateur non trouvé');
        }
        
        return user;
      } else {
        const response = await axios.get(`/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la récupération de l\'utilisateur';
      toast.error(message);
      throw error;
    }
  };

  const createUser = async (userData) => {
    try {
      const token = localStorage.getItem('authToken');
      // Simulation pour le développement
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simuler un délai réseau
        
        // Dans un environnement réel, l'ID serait généré par le backend
        const newUser = {
          id: Math.floor(Math.random() * 1000) + 10,
          ...userData,
          createdAt: new Date().toISOString(),
          lastLogin: null
        };
        
        return newUser;
      } else {
        const response = await axios.post('/api/admin/users', userData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la création de l\'utilisateur';
      toast.error(message);
      throw error;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const token = localStorage.getItem('authToken');
      // Simulation pour le développement
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simuler un délai réseau
        
        // Dans un environnement réel, les données seraient mises à jour dans la base de données
        const updatedUser = {
          id: userId,
          ...userData,
          // Conserver les autres propriétés qui ne seraient pas mises à jour
          updatedAt: new Date().toISOString()
        };
        
        return updatedUser;
      } else {
        const response = await axios.put(`/api/admin/users/${userId}`, userData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la mise à jour de l\'utilisateur';
      toast.error(message);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      // Simulation pour le développement
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simuler un délai réseau
        
        // Dans un environnement réel, l'utilisateur serait supprimé de la base de données
        return { success: true, message: 'Utilisateur supprimé avec succès' };
      } else {
        const response = await axios.delete(`/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la suppression de l\'utilisateur';
      toast.error(message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        register,
        logout,
        updateProfile,
        forgotPassword,
        resetPassword,
        loading,
        // Nouvelles fonctions d'administration des utilisateurs
        getAllUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
}