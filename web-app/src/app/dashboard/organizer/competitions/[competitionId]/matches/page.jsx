'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import Link from 'next/link';

export default function ManageMatches({ params }) {
  const { competitionId } = React.use(params);
  const { user } = useAuth();
  const [competition, setCompetition] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [registeredTeams, setRegisteredTeams] = useState([]);

  useEffect(() => {
    const fetchCompetitionAndMatches = async () => {
      setLoading(true);
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées pour la compétition
        const competitionData = {
          id: parseInt(competitionId),
          name: 'Championnat National 2025',
          status: 'IN_PROGRESS',
          startDate: '2025-01-15',
          endDate: '2025-05-30',
          category: 'SENIOR'
        };
        
        // Données simulées pour les matchs
        const matchesData = [
          {
            id: 1,
            competitionId: parseInt(competitionId),
            date: '2025-05-15T15:00:00',
            status: 'SCHEDULED',
            homeTeam: {
              id: 1,
              name: 'FC Barcelona',
              logo: 'https://via.placeholder.com/50'
            },
            awayTeam: {
              id: 2,
              name: 'Real Madrid',
              logo: 'https://via.placeholder.com/50'
            },
            venue: 'Stade Municipal',
            referee: 'Jean Dupont',
            matchSheetStatus: 'NOT_STARTED'
          },
          {
            id: 2,
            competitionId: parseInt(competitionId),
            date: '2025-05-12T18:30:00',
            status: 'COMPLETED',
            homeTeam: {
              id: 3,
              name: 'Atletico Madrid',
              logo: 'https://via.placeholder.com/50'
            },
            awayTeam: {
              id: 4,
              name: 'Valencia',
              logo: 'https://via.placeholder.com/50'
            },
            venue: 'Stade Central',
            referee: 'Marie Martin',
            result: '2-1',
            matchSheetStatus: 'VALIDATED'
          },
          {
            id: 3,
            competitionId: parseInt(competitionId),
            date: '2025-05-18T20:00:00',
            status: 'SCHEDULED',
            homeTeam: {
              id: 5,
              name: 'Sevilla',
              logo: 'https://via.placeholder.com/50'
            },
            awayTeam: {
              id: 1,
              name: 'FC Barcelona',
              logo: 'https://via.placeholder.com/50'
            },
            venue: 'Stade Sud',
            referee: 'Pierre Durand',
            matchSheetStatus: 'PENDING'
          },
          {
            id: 4,
            competitionId: parseInt(competitionId),
            date: '2025-05-05T17:00:00',
            status: 'CANCELLED',
            homeTeam: {
              id: 2,
              name: 'Real Madrid',
              logo: 'https://via.placeholder.com/50'
            },
            awayTeam: {
              id: 5,
              name: 'Sevilla',
              logo: 'https://via.placeholder.com/50'
            },
            venue: 'Stade Bernabeu',
            referee: 'Sophie Bernard',
            cancellationReason: 'Conditions météorologiques défavorables'
          },
          {
            id: 5,
            competitionId: parseInt(competitionId),
            date: '2025-05-08T16:00:00',
            status: 'COMPLETED',
            homeTeam: {
              id: 4,
              name: 'Valencia',
              logo: 'https://via.placeholder.com/50'
            },
            awayTeam: {
              id: 3,
              name: 'Atletico Madrid',
              logo: 'https://via.placeholder.com/50'
            },
            venue: 'Stade Mestalla',
            referee: 'Lucas Petit',
            result: '0-0',
            matchSheetStatus: 'VALIDATED'
          }
        ];
        
        // Équipes inscrites à la compétition
        const teamsData = [
          { id: 1, name: 'FC Barcelona', logo: 'https://via.placeholder.com/50' },
          { id: 2, name: 'Real Madrid', logo: 'https://via.placeholder.com/50' },
          { id: 3, name: 'Atletico Madrid', logo: 'https://via.placeholder.com/50' },
          { id: 4, name: 'Valencia', logo: 'https://via.placeholder.com/50' },
          { id: 5, name: 'Sevilla', logo: 'https://via.placeholder.com/50' },
          { id: 6, name: 'Villarreal', logo: 'https://via.placeholder.com/50' }
        ];
        
        setCompetition(competitionData);
        setMatches(matchesData);
        setRegisteredTeams(teamsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setErrorMessage('Erreur lors du chargement des données. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitionAndMatches();
  }, [competitionId]);

  // Filtrer les matchs selon l'onglet actif
  const filteredMatches = matches.filter(match => {
    if (activeTab === 'upcoming') return match.status === 'SCHEDULED' && new Date(match.date) > new Date();
    if (activeTab === 'completed') return match.status === 'COMPLETED';
    if (activeTab === 'cancelled') return match.status === 'CANCELLED';
    return true; // Pour l'onglet 'all'
  });

  // Trier les matchs par date (les plus récents d'abord)
  const sortedMatches = [...filteredMatches].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Programmé
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Terminé
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Annulé
          </span>
        );
      case 'POSTPONED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Reporté
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

  const getMatchSheetStatusBadge = (status) => {
    switch (status) {
      case 'NOT_STARTED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Non démarrée
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            En attente
          </span>
        );
      case 'SUBMITTED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Soumise
          </span>
        );
      case 'VALIDATED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Validée
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejetée
          </span>
        );
      default:
        return null;
    }
  };

  const handleCancelMatch = async (matchId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler ce match ?')) {
      return;
    }
    
    try {
      // Simuler un appel API pour annuler le match
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mise à jour de l'état local pour refléter l'annulation
      const updatedMatches = matches.map(match => {
        if (match.id === matchId) {
          return {
            ...match,
            status: 'CANCELLED',
            cancellationReason: 'Annulé par l\'organisateur'
          };
        }
        return match;
      });
      
      setMatches(updatedMatches);
      setSuccessMessage('Match annulé avec succès !');
      
      // Masquer la notification de succès après 5 secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de l\'annulation du match:', error);
      setErrorMessage('Erreur lors de l\'annulation du match. Veuillez réessayer.');
      
      // Masquer la notification d'erreur après 5 secondes
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handlePostponeMatch = async (matchId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir reporter ce match ?')) {
      return;
    }
    
    try {
      // Dans une implémentation réelle, vous ouvririez une modal pour choisir la nouvelle date
      // Simuler un appel API pour reporter le match
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mise à jour de l'état local pour refléter le report
      const updatedMatches = matches.map(match => {
        if (match.id === matchId) {
          return {
            ...match,
            status: 'POSTPONED',
            previousDate: match.date,
            date: new Date(new Date(match.date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString() // +7 jours
          };
        }
        return match;
      });
      
      setMatches(updatedMatches);
      setSuccessMessage('Match reporté avec succès !');
      
      // Masquer la notification de succès après 5 secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Erreur lors du report du match:', error);
      setErrorMessage('Erreur lors du report du match. Veuillez réessayer.');
      
      // Masquer la notification d'erreur après 5 secondes
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleValidateMatchSheet = async (matchId) => {
    try {
      // Simuler un appel API pour valider la feuille de match
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mise à jour de l'état local pour refléter la validation
      const updatedMatches = matches.map(match => {
        if (match.id === matchId) {
          return {
            ...match,
            matchSheetStatus: 'VALIDATED'
          };
        }
        return match;
      });
      
      setMatches(updatedMatches);
      setSuccessMessage('Feuille de match validée avec succès !');
      
      // Masquer la notification de succès après 5 secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de la validation de la feuille de match:', error);
      setErrorMessage('Erreur lors de la validation de la feuille de match. Veuillez réessayer.');
      
      // Masquer la notification d'erreur après 5 secondes
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Gestion des matchs</h1>
          {competition && (
            <p className="mt-1 text-sm text-gray-500">
              {competition.name} • {competition.category}
            </p>
          )}
        </div>
        <div className="mt-3 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Programmer un match
          </button>
          <Link
            href={`/dashboard/organizer/competitions/${competitionId}`}
            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retour à la compétition
          </Link>
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

      {/* Onglets de filtrage */}
      <div className="mb-6">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Sélectionner un filtre
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="all">Tous les matchs</option>
            <option value="upcoming">À venir</option>
            <option value="completed">Terminés</option>
            <option value="cancelled">Annulés</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                className={`${
                  activeTab === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('all')}
              >
                Tous les matchs
                <span className={`${activeTab === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                  {matches.length}
                </span>
              </button>
              <button
                className={`${
                  activeTab === 'upcoming'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('upcoming')}
              >
                À venir
                <span className={`${activeTab === 'upcoming' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                  {matches.filter(match => match.status === 'SCHEDULED' && new Date(match.date) > new Date()).length}
                </span>
              </button>
              <button
                className={`${
                  activeTab === 'completed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('completed')}
              >
                Terminés
                <span className={`${activeTab === 'completed' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                  {matches.filter(match => match.status === 'COMPLETED').length}
                </span>
              </button>
              <button
                className={`${
                  activeTab === 'cancelled'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('cancelled')}
              >
                Annulés
                <span className={`${activeTab === 'cancelled' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                  {matches.filter(match => match.status === 'CANCELLED').length}
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Liste des matchs */}
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
                  <div className="flex justify-between">
                    <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedMatches.length === 0 ? (
        <div className="text-center py-12 bg-white shadow overflow-hidden sm:rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun match trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === 'all' 
              ? 'Il n\'y a pas encore de match programmé pour cette compétition.' 
              : activeTab === 'upcoming'
              ? 'Il n\'y a pas de match à venir dans cette compétition.'
              : activeTab === 'completed'
              ? 'Aucun match n\'a encore été terminé dans cette compétition.'
              : 'Aucun match n\'a été annulé dans cette compétition.'}
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Programmer un match
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedMatches.map((match) => (
            <div key={match.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                    Match #{match.id}
                    <div className="ml-3">
                      {getStatusBadge(match.status)}
                    </div>
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {formatDate(match.date)} • {match.venue}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Link
                    href={`/dashboard/organizer/competitions/${competitionId}/matches/${match.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Détails
                  </Link>
                  
                  {match.status === 'SCHEDULED' && (
                    <Link
                      href={`/dashboard/organizer/competitions/${competitionId}/matches/${match.id}/edit`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Modifier
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 flex items-center justify-end">
                      <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="h-10 w-10" />
                      <span className="mx-2 font-medium text-gray-900">{match.homeTeam.name}</span>
                    </div>
                    
                    <div className="mx-4 text-center">
                      {match.status === 'COMPLETED' ? (
                        <div className="text-xl font-bold">{match.result}</div>
                      ) : (
                        <div className="text-sm font-medium text-gray-500">VS</div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">Arbitre: {match.referee}</div>
                    </div>
                    
                    <div className="flex-1 flex items-center">
                      <span className="mx-2 font-medium text-gray-900">{match.awayTeam.name}</span>
                      <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="h-10 w-10" />
                    </div>
                  </div>
                  
                  {/* Informations supplémentaires selon le statut */}
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    {match.status === 'SCHEDULED' && (
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Feuille de match:</span>{' '}
                          {match.matchSheetStatus && getMatchSheetStatusBadge(match.matchSheetStatus)}
                        </div>
                        <div className="flex space-x-3">
                          {match.matchSheetStatus === 'SUBMITTED' && (
                            <button
                              type="button"
                              onClick={() => handleValidateMatchSheet(match.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Valider la feuille de match
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handlePostponeMatch(match.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                          >
                            Reporter
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCancelMatch(match.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {match.status === 'COMPLETED' && (
                      <div className="text-sm text-green-600">
                        <svg className="inline-block h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Match terminé avec résultat validé
                      </div>
                    )}
                    
                    {match.status === 'CANCELLED' && (
                      <div className="text-sm text-red-600">
                        <svg className="inline-block h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Raison: {match.cancellationReason}
                      </div>
                    )}
                    
                    {match.status === 'POSTPONED' && (
                      <div className="text-sm text-yellow-600">
                        <svg className="inline-block h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Match reporté. Initialement prévu le {formatDate(match.previousDate)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de création de match */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Programmer un nouveau match</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-6 py-4">
              <form className="space-y-4">
                <div>
                  <label htmlFor="home-team" className="block text-sm font-medium text-gray-700">
                    Équipe à domicile
                  </label>
                  <select
                    id="home-team"
                    name="home-team"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Sélectionner une équipe</option>
                    {registeredTeams.map(team => (
                      <option key={`home-${team.id}`} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="away-team" className="block text-sm font-medium text-gray-700">
                    Équipe à l'extérieur
                  </label>
                  <select
                    id="away-team"
                    name="away-team"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Sélectionner une équipe</option>
                    {registeredTeams.map(team => (
                      <option key={`away-${team.id}`} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="match-date" className="block text-sm font-medium text-gray-700">
                    Date et heure du match
                  </label>
                  <input
                    type="datetime-local"
                    id="match-date"
                    name="match-date"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                    Lieu
                  </label>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Stade, ville, etc."
                  />
                </div>
                
                <div>
                  <label htmlFor="referee" className="block text-sm font-medium text-gray-700">
                    Arbitre
                  </label>
                  <input
                    type="text"
                    id="referee"
                    name="referee"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nom de l'arbitre"
                  />
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  // Simuler la création d'un match
                  setShowCreateModal(false);
                  setSuccessMessage('Match programmé avec succès !');
                  setTimeout(() => {
                    setSuccessMessage('');
                  }, 5000);
                }}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Programmer le match
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}