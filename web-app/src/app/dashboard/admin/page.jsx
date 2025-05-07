'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Données simulées pour les utilisateurs
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  // Données simulées pour les compétitions
  const [competitions, setCompetitions] = useState([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  
  // Données simulées pour les équipes
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées
        const mockStats = {
          totalUsers: 256,
          activeUsers: 198,
          totalTeams: 42,
          totalCompetitions: 12,
          activeCompetitions: 8,
          totalMatches: 186,
          upcomingMatches: 63,
          totalPlayers: 635
        };
        
        const mockUsers = [
          { 
            id: 1, 
            name: 'Jean Dupont', 
            email: 'jean.dupont@example.com', 
            role: 'ADMIN', 
            status: 'ACTIVE', 
            createdAt: '2025-01-15T10:30:00', 
            lastLogin: '2025-05-05T14:22:00' 
          },
          { 
            id: 2, 
            name: 'Marie Martin', 
            email: 'marie.martin@example.com', 
            role: 'ORGANIZER', 
            status: 'ACTIVE', 
            createdAt: '2025-01-20T11:45:00', 
            lastLogin: '2025-05-06T09:15:00' 
          },
          { 
            id: 3, 
            name: 'Pierre Durand', 
            email: 'pierre.durand@example.com', 
            role: 'COACH', 
            status: 'ACTIVE', 
            createdAt: '2025-02-05T09:20:00', 
            lastLogin: '2025-05-04T16:30:00' 
          },
          { 
            id: 4, 
            name: 'Sophie Bernard', 
            email: 'sophie.bernard@example.com', 
            role: 'PLAYER', 
            status: 'ACTIVE', 
            createdAt: '2025-02-10T14:10:00', 
            lastLogin: '2025-05-03T18:45:00' 
          },
          { 
            id: 5, 
            name: 'Lucas Petit', 
            email: 'lucas.petit@example.com', 
            role: 'ORGANIZER', 
            status: 'INACTIVE', 
            createdAt: '2025-02-15T16:30:00', 
            lastLogin: '2025-04-20T10:05:00' 
          },
          { 
            id: 6, 
            name: 'Emma Leroy', 
            email: 'emma.leroy@example.com', 
            role: 'COACH', 
            status: 'PENDING', 
            createdAt: '2025-03-01T08:45:00', 
            lastLogin: null 
          },
        ];
        
        const mockCompetitions = [
          {
            id: 1,
            name: 'Championnat National 2025',
            status: 'ACTIVE',
            startDate: '2025-01-15',
            endDate: '2025-05-30',
            category: 'SENIOR',
            teamsCount: 12,
            matchesCount: 66,
            organizerId: 2,
            organizer: 'Marie Martin'
          },
          {
            id: 2,
            name: 'Coupe Régionale 2025',
            status: 'ACTIVE',
            startDate: '2025-02-10',
            endDate: '2025-06-15',
            category: 'JUNIOR',
            teamsCount: 16,
            matchesCount: 30,
            organizerId: 2,
            organizer: 'Marie Martin'
          },
          {
            id: 3,
            name: 'Tournoi Été 2025',
            status: 'UPCOMING',
            startDate: '2025-06-01',
            endDate: '2025-06-30',
            category: 'SENIOR',
            teamsCount: 8,
            matchesCount: 12,
            organizerId: 5,
            organizer: 'Lucas Petit'
          },
          {
            id: 4,
            name: 'Championnat Jeunes 2025',
            status: 'ACTIVE',
            startDate: '2025-03-01',
            endDate: '2025-10-31',
            category: 'U17',
            teamsCount: 10,
            matchesCount: 45,
            organizerId: 5,
            organizer: 'Lucas Petit'
          }
        ];
        
        const mockTeams = [
          {
            id: 1,
            name: 'FC Barcelona',
            category: 'SENIOR',
            city: 'Barcelone',
            status: 'ACTIVE',
            playerCount: 25,
            coachId: 3,
            coach: 'Pierre Durand',
            createdAt: '2025-01-05T08:30:00'
          },
          {
            id: 2,
            name: 'Real Madrid',
            category: 'SENIOR',
            city: 'Madrid',
            status: 'ACTIVE',
            playerCount: 23,
            coachId: 6,
            coach: 'Emma Leroy',
            createdAt: '2025-01-10T09:45:00'
          },
          {
            id: 3,
            name: 'Atletico Madrid',
            category: 'SENIOR',
            city: 'Madrid',
            status: 'ACTIVE',
            playerCount: 22,
            coachId: 3,
            coach: 'Pierre Durand',
            createdAt: '2025-01-15T11:20:00'
          },
          {
            id: 4,
            name: 'Valencia CF',
            category: 'JUNIOR',
            city: 'Valence',
            status: 'ACTIVE',
            playerCount: 20,
            coachId: 6,
            coach: 'Emma Leroy',
            createdAt: '2025-01-20T14:10:00'
          },
          {
            id: 5,
            name: 'Sevilla FC',
            category: 'U17',
            city: 'Séville',
            status: 'INACTIVE',
            playerCount: 18,
            coachId: 3,
            coach: 'Pierre Durand',
            createdAt: '2025-02-01T10:30:00'
          }
        ];
        
        setStats(mockStats);
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setCompetitions(mockCompetitions);
        setFilteredCompetitions(mockCompetitions);
        setTeams(mockTeams);
        setFilteredTeams(mockTeams);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setErrorMessage('Erreur lors du chargement des données. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Filtrer les données en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
      setFilteredCompetitions(competitions);
      setFilteredTeams(teams);
    } else {
      const term = searchTerm.toLowerCase();
      
      // Filtrer les utilisateurs
      const matchingUsers = users.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
      setFilteredUsers(matchingUsers);
      
      // Filtrer les compétitions
      const matchingCompetitions = competitions.filter(competition => 
        competition.name.toLowerCase().includes(term) || 
        competition.category.toLowerCase().includes(term) ||
        competition.organizer.toLowerCase().includes(term)
      );
      setFilteredCompetitions(matchingCompetitions);
      
      // Filtrer les équipes
      const matchingTeams = teams.filter(team => 
        team.name.toLowerCase().includes(term) || 
        team.category.toLowerCase().includes(term) ||
        team.city.toLowerCase().includes(term) ||
        team.coach.toLowerCase().includes(term)
      );
      setFilteredTeams(matchingTeams);
    }
  }, [searchTerm, users, competitions, teams]);

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return 'Jamais';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Formater la date relative (il y a combien de temps)
  const formatRelativeTime = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    
    // Convertir en jours/heures/minutes
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
    const diffMinutes = Math.floor(diffMs / (1000 * 60)) % 60;
    
    if (diffDays > 0) {
      return `il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else {
      return `il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    }
  };

  // Gérer la désactivation d'un utilisateur
  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
          return { ...user, status: newStatus };
        }
        return user;
      });
      
      setUsers(updatedUsers);
      setFilteredUsers(
        searchTerm.trim() === '' 
          ? updatedUsers 
          : updatedUsers.filter(user => 
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
              user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.role.toLowerCase().includes(searchTerm.toLowerCase())
            )
      );
      
      setSuccessMessage(`Statut de l'utilisateur modifié avec succès.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erreur lors de la modification du statut:', error);
      setErrorMessage('Erreur lors de la modification du statut. Veuillez réessayer.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  // Gérer l'activation/désactivation d'une compétition
  const handleToggleCompetitionStatus = async (competitionId, currentStatus) => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedCompetitions = competitions.map(competition => {
        if (competition.id === competitionId) {
          const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
          return { ...competition, status: newStatus };
        }
        return competition;
      });
      
      setCompetitions(updatedCompetitions);
      setFilteredCompetitions(
        searchTerm.trim() === '' 
          ? updatedCompetitions 
          : updatedCompetitions.filter(competition => 
              competition.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
              competition.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
              competition.organizer.toLowerCase().includes(searchTerm.toLowerCase())
            )
      );
      
      setSuccessMessage(`Statut de la compétition modifié avec succès.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erreur lors de la modification du statut:', error);
      setErrorMessage('Erreur lors de la modification du statut. Veuillez réessayer.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  // Gérer l'activation/désactivation d'une équipe
  const handleToggleTeamStatus = async (teamId, currentStatus) => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedTeams = teams.map(team => {
        if (team.id === teamId) {
          const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
          return { ...team, status: newStatus };
        }
        return team;
      });
      
      setTeams(updatedTeams);
      setFilteredTeams(
        searchTerm.trim() === '' 
          ? updatedTeams 
          : updatedTeams.filter(team => 
              team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
              team.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
              team.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
              team.coach.toLowerCase().includes(searchTerm.toLowerCase())
            )
      );
      
      setSuccessMessage(`Statut de l'équipe modifié avec succès.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erreur lors de la modification du statut:', error);
      setErrorMessage('Erreur lors de la modification du statut. Veuillez réessayer.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const renderUserStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Actif
          </span>
        );
      case 'INACTIVE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Inactif
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            En attente
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const renderUserRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Administrateur
          </span>
        );
      case 'ORGANIZER':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Organisateur
          </span>
        );
      case 'COACH':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            Coach
          </span>
        );
      case 'PLAYER':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Joueur
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {role}
          </span>
        );
    }
  };

  const renderCompetitionStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        );
      case 'INACTIVE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Inactive
          </span>
        );
      case 'UPCOMING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            À venir
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Terminée
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Administration</h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <div className="flex rounded-md shadow-sm">
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* Messages de notification */}
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Statistiques globales */}
      {loading ? (
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
              <div className="px-4 py-5 sm:p-6">
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : stats && (
        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Utilisateurs</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.totalUsers}</div>
                      <div className="text-sm text-gray-500">{stats.activeUsers} actifs</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Équipes</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.totalTeams}</div>
                      <div className="text-sm text-gray-500">{stats.totalPlayers} joueurs</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Compétitions</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.totalCompetitions}</div>
                      <div className="text-sm text-gray-500">{stats.activeCompetitions} actives</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Matchs</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.totalMatches}</div>
                      <div className="text-sm text-gray-500">{stats.upcomingMatches} à venir</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onglets de navigation */}
      <div className="mb-6">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Sélectionner un onglet
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="users">Utilisateurs</option>
            <option value="competitions">Compétitions</option>
            <option value="teams">Équipes</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                className={`${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('users')}
              >
                Utilisateurs
              </button>
              <button
                className={`${
                  activeTab === 'competitions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('competitions')}
              >
                Compétitions
              </button>
              <button
                className={`${
                  activeTab === 'teams'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('teams')}
              >
                Équipes
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Contenu des onglets */}
      {loading ? (
        <div className="animate-pulse">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white shadow overflow-hidden sm:rounded-md mb-4">
              <div className="px-4 py-5 sm:px-6 flex justify-between">
                <div className="h-7 bg-gray-200 rounded w-1/3"></div>
                <div className="h-7 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="h-12 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Onglet Utilisateurs */}
          {activeTab === 'users' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <li className="px-6 py-4 text-center text-gray-500">
                    Aucun utilisateur trouvé.
                  </li>
                ) : (
                  filteredUsers.map((user) => (
                    <li key={user.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 font-medium">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col items-end">
                            <div className="flex space-x-2">
                              {renderUserRoleBadge(user.role)}
                              {renderUserStatusBadge(user.status)}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Dernière connexion: {formatDate(user.lastLogin)} {user.lastLogin && formatRelativeTime(user.lastLogin)}
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <div className="relative inline-block text-left">
                              <div>
                                <button
                                  type="button"
                                  className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  id={`user-menu-button-${user.id}`}
                                  aria-expanded="false"
                                  aria-haspopup="true"
                                >
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                  </svg>
                                </button>
                              </div>
                              
                              {/* Dropdown menu, we'll implement this with a state later */}
                              {/* <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby={`user-menu-button-${user.id}`}>
                                  <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Voir le profil</a>
                                  <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Modifier</a>
                                  <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Supprimer</a>
                                </div>
                              </div> */}
                            </div>
                            {user.status !== 'PENDING' && (
                              <button
                                type="button"
                                onClick={() => handleToggleUserStatus(user.id, user.status)}
                                className={`ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md ${
                                  user.status === 'ACTIVE'
                                    ? 'text-red-700 bg-red-100 hover:bg-red-200'
                                    : 'text-green-700 bg-green-100 hover:bg-green-200'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                              >
                                {user.status === 'ACTIVE' ? 'Désactiver' : 'Activer'}
                              </button>
                            )}
                            {user.status === 'PENDING' && (
                              <button
                                type="button"
                                onClick={() => handleToggleUserStatus(user.id, 'PENDING')}
                                className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Approuver
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}

          {/* Onglet Compétitions */}
          {activeTab === 'competitions' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredCompetitions.length === 0 ? (
                  <li className="px-6 py-4 text-center text-gray-500">
                    Aucune compétition trouvée.
                  </li>
                ) : (
                  filteredCompetitions.map((competition) => (
                    <li key={competition.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{competition.name}</div>
                            <div className="ml-2">
                              {renderCompetitionStatusBadge(competition.status)}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {competition.category} • {competition.teamsCount} équipes • {competition.matchesCount} matchs
                          </div>
                          <div className="text-sm text-gray-500">
                            Du {new Date(competition.startDate).toLocaleDateString('fr-FR')} au {new Date(competition.endDate).toLocaleDateString('fr-FR')}
                          </div>
                          <div className="text-sm text-gray-500">
                            Organisateur: {competition.organizer}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            href={`/dashboard/admin/competitions/${competition.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Détails
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleToggleCompetitionStatus(competition.id, competition.status)}
                            className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md ${
                              competition.status === 'ACTIVE'
                                ? 'text-red-700 bg-red-100 hover:bg-red-200'
                                : competition.status === 'INACTIVE'
                                ? 'text-green-700 bg-green-100 hover:bg-green-200'
                                : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                          >
                            {competition.status === 'ACTIVE' ? 'Désactiver' : competition.status === 'INACTIVE' ? 'Activer' : 'Publier'}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}

          {/* Onglet Équipes */}
          {activeTab === 'teams' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredTeams.length === 0 ? (
                  <li className="px-6 py-4 text-center text-gray-500">
                    Aucune équipe trouvée.
                  </li>
                ) : (
                  filteredTeams.map((team) => (
                    <li key={team.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 font-medium">
                              {team.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">{team.name}</div>
                              {team.status === 'ACTIVE' ? (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Active
                                </span>
                              ) : (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Inactive
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {team.category} • {team.city} • {team.playerCount} joueurs
                            </div>
                            <div className="text-sm text-gray-500">
                              Coach: {team.coach}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            href={`/dashboard/admin/teams/${team.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Détails
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleToggleTeamStatus(team.id, team.status)}
                            className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md ${
                              team.status === 'ACTIVE'
                                ? 'text-red-700 bg-red-100 hover:bg-red-200'
                                : 'text-green-700 bg-green-100 hover:bg-green-200'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                          >
                            {team.status === 'ACTIVE' ? 'Désactiver' : 'Activer'}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}