'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

export default function UserForm({ user = null, onSuccess }) {
  const { createUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nom: '',
    prenom: '',
    role: 'USER',
    status: 'ACTIVE'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        password: '',
        confirmPassword: '',
        nom: user.nom || '',
        prenom: user.prenom || '',
        role: user.role || 'USER',
        status: user.status || 'ACTIVE'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.nom || !formData.prenom || !formData.role) {
      setError('Veuillez remplir tous les champs obligatoires');
      return false;
    }

    if (!user && (!formData.password || formData.password.length < 6)) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }

    if (!user && formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }

    // Validation basique de l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError('Veuillez entrer une adresse email valide');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = {
        email: formData.email,
        nom: formData.nom,
        prenom: formData.prenom,
        role: formData.role,
        status: formData.status
      };

      // Ajouter le mot de passe uniquement lors de la création ou s'il est fourni lors de la mise à jour
      if (!user || (user && formData.password)) {
        userData.password = formData.password;
      }

      if (user) {
        await updateUser(user.id, userData);
      } else {
        await createUser(userData);
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
          <Input
            id="prenom"
            name="prenom"
            type="text"
            value={formData.prenom}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
          <Input
            id="nom"
            name="nom"
            type="text"
            value={formData.nom}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {user ? 'Nouveau mot de passe (vide = inchangé)' : 'Mot de passe'}
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={!user}
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            {user ? 'Confirmer le nouveau mot de passe' : 'Confirmer le mot de passe'}
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required={!user}
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rôle</label>
          <Select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1"
          >
            <option value="USER">Utilisateur</option>
            <option value="ADMIN">Administrateur</option>
            <option value="ORGANIZER">Organisateur</option>
            <option value="COACH">Coach</option>
            <option value="PLAYER">Joueur</option>
          </Select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Statut</label>
          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1"
          >
            <option value="ACTIVE">Actif</option>
            <option value="INACTIVE">Inactif</option>
            <option value="PENDING">En attente</option>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement en cours...
            </>
          ) : (
            user ? 'Mettre à jour' : 'Créer un utilisateur'
          )}
        </Button>
      </div>
    </form>
  );
}