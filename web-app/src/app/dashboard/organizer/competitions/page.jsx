'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';

export default function OrganizerCompetitions() {
  const { user } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    const fetchCompetitions = async () => {
      setLoading(true);
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées pour les compétitions gérées par l'organisateur
        const competitionsData = [
          { 
            id: 1, 
            name: 'Championnat National 2025',
            category: 'SENIOR',
            startDate: '2025-09-01',
            endDate: '2026-05-31',
            status: 'REGISTRATION_OPEN',
            teamCount: 16,
            matchCount: 48,
            pendingMatches: 12,
            completedMatches: 36
          },
          { 
            id: 2, 
            name: 'Coupe Régionale 2025',
            category: 'U19',
            startDate: '2025-08-15',
            endDate: '2026-04-15',
            status: 'IN_PROGRESS',
            teamCount: 24,
            matchCount: 56,
            pendingMatches: 26,
            completedMatches: 30
          },
          { 
            id: 3, 
            name: 'Tournoi Inter-clubs',
            category: 'U17',
            startDate: '2025-07-10',
            endDate: '2025-07-25',
            status: 'COMPLETED',
            teamCount: 12,
            matchCount: 22,
            pendingMatches: 0,
            completedMatches: 22
          },
          { 
            id: 4, 
            name: 'Super Cup 2025',
            category: 'SENIOR',
            startDate: '2025-08-01',
            endDate: '2025-08-10',
            status: 'DRAFT',
            teamCount: 0,
            matchCount: 0,
            pendingMatches: 0,
            completedMatches: 0
          }
        ];
        
        setCompetitions(competitionsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des compétitions:', error);
        setErrorMessage('Erreur lors du chargement des compétitions. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  const handleCreateCompetition = () => {
    // Rediriger vers la page de création de compétition
    window.location.href = '/dashboard/organizer/competitions/create';
  };

  const handleDeleteCompetition = async (competitionId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette compétition ? Cette action est irréversible.')) {
      return;
    }
    
    try {
      // Simuler un appel API pour supprimer la compétition
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mise à jour de l'état local pour refléter la suppression
      const updatedCompetitions = competitions.filter(comp => comp.id !== competitionId);
      setCompetitions(updatedCompetitions);
      
      setSuccessMessage('Compétition supprimée avec succès !');
      
      // Masquer la notification de succès après 5 secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de la suppression de la compétition:', error);
      setErrorMessage('Erreur lors de la suppression de la compétition. Veuillez réessayer.');
      
      // Masquer la notification d'erreur après 5 secondes
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleChangeStatus = async (competitionId, newStatus) => {
    try {
      // Simuler un appel API pour changer le statut de la compétition
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mise à jour de l'état local pour refléter le changement de statut
      const updatedCompetitions = competitions.map(comp => {
        if (comp.id === competitionId) {
          return {
            ...comp,
            status: newStatus
          };
        }
        return comp;
      });
      
      setCompetitions(updatedCompetitions);
      
      const statusMessages = {
        'DRAFT': 'Compétition mise en mode brouillon.',
        'REGISTRATION_OPEN': 'Les inscriptions à la compétition sont maintenant ouvertes.',
        'REGISTRATION_CLOSED': 'Les inscriptions à la compétition sont maintenant fermées.',
        'IN_PROGRESS': 'La compétition est maintenant en cours.',
        'COMPLETED': 'La compétition est maintenant marquée comme terminée.',
        'CANCELLED': 'La compétition a été annulée.'
      };
      
      setSuccessMessage(statusMessages[newStatus] || 'Statut de la compétition mis à jour avec succès !');
      
      // Masquer la notification de succès après 5 secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      setErrorMessage('Erreur lors de la mise à jour du statut. Veuillez réessayer.');
      
      // Masquer la notification d'erreur après 5 secondes
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  // Filtrer les compétitions selon le statut sélectionné
  const filteredCompetitions = filterStatus === 'ALL' 
    ? competitions 
    : competitions.filter(comp => comp.status === filterStatus);

  // Fonction pour obtenir le style de badge selon le statut
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'REGISTRATION_OPEN':
        return 'bg-green-100 text-green-800';
      case 'REGISTRATION_CLOSED':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-purple-100 text-purple-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status) => {
    switch (status) {
      case 'DRAFT':
        return 'Brouillon';
      case 'REGISTRATION_OPEN':
        return 'Inscriptions ouvertes';
      case 'REGISTRATION_CLOSED':
        return 'Inscriptions fermées';
      case 'IN_PROGRESS':
        return 'En cours';
      case 'COMPLETED':
        return 'Terminée';
      case 'CANCELLED':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-5 border-b border-gray-200 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Mes compétitions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos compétitions et leurs matchs
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreateCompetition}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Créer une compétition
        </button>
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

      {/* Filtres */}
      <div className="bg-white shadow px-4 py-3 sm:rounded-lg sm:px-6 mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filtrer par statut :</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                filterStatus === 'ALL' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilterStatus('DRAFT')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                filterStatus === 'DRAFT' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Brouillon
            </button>
            <button
              onClick={() => setFilterStatus('REGISTRATION_OPEN')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                filterStatus === 'REGISTRATION_OPEN' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inscriptions ouvertes
            </button>
            <button
              onClick={() => setFilterStatus('IN_PROGRESS')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                filterStatus === 'IN_PROGRESS' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En cours
            </button>
            <button
              onClick={() => setFilterStatus('COMPLETED')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                filterStatus === 'COMPLETED' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Terminé
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6 flex justify-between">
                <div className="h-7 bg-gray-200 rounded w-1/3"></div>
                <div className="h-7 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredCompetitions.length === 0 ? (
        <div className="text-center py-12 bg-white shadow overflow-hidden sm:rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune compétition trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filterStatus === 'ALL' 
              ? 'Vous n\'avez pas encore créé de compétition.' 
              : `Aucune compétition avec le statut "${getStatusLabel(filterStatus)}" n'a été trouvée.`}
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleCreateCompetition}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Créer une compétition
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredCompetitions.map((competition) => (
            <div key={competition.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                    {competition.name}
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {competition.category}
                    </span>
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {competition.startDate} à {competition.endDate}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyle(competition.status)}`}
                  >
                    {getStatusLabel(competition.status)}
                  </span>
                  
                  <div className="relative ml-2 group">
                    <button
                      type="button"
                      className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block z-10">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <Link
                          href={`/dashboard/organizer/competitions/${competition.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Voir les détails
                        </Link>
                        <Link
                          href={`/dashboard/organizer/competitions/${competition.id}/edit`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Modifier
                        </Link>
                        <Link
                          href={`/dashboard/organizer/competitions/${competition.id}/teams`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Gérer les équipes
                        </Link>
                        <Link
                          href={`/dashboard/organizer/competitions/${competition.id}/matches`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Gérer les matchs
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteCompetition(competition.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-blue-50 rounded-lg px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Équipes inscrites</dt>
                      <dd className="mt-1 text-3xl font-semibold text-blue-800">{competition.teamCount}</dd>
                      <div className="mt-2">
                        <Link
                          href={`/dashboard/organizer/competitions/${competition.id}/teams`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          Voir toutes
                        </Link>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Matchs programmés</dt>
                      <dd className="mt-1 text-3xl font-semibold text-green-800">{competition.matchCount}</dd>
                      <div className="mt-2">
                        <Link
                          href={`/dashboard/organizer/competitions/${competition.id}/matches`}
                          className="text-sm font-medium text-green-600 hover:text-green-500"
                        >
                          Voir tous
                        </Link>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Matchs à venir</dt>
                      <dd className="mt-1 text-3xl font-semibold text-yellow-800">{competition.pendingMatches}</dd>
                      <div className="mt-2">
                        <Link
                          href={`/dashboard/organizer/competitions/${competition.id}/matches?status=pending`}
                          className="text-sm font-medium text-yellow-600 hover:text-yellow-500"
                        >
                          Voir tous
                        </Link>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Matchs terminés</dt>
                      <dd className="mt-1 text-3xl font-semibold text-purple-800">{competition.completedMatches}</dd>
                      <div className="mt-2">
                        <Link
                          href={`/dashboard/organizer/competitions/${competition.id}/matches?status=completed`}
                          className="text-sm font-medium text-purple-600 hover:text-purple-500"
                        >
                          Voir tous
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions rapides */}
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6 bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {competition.status === 'DRAFT' && (
                    <button
                      type="button"
                      onClick={() => handleChangeStatus(competition.id, 'REGISTRATION_OPEN')}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Ouvrir les inscriptions
                    </button>
                  )}
                  
                  {competition.status === 'REGISTRATION_OPEN' && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleChangeStatus(competition.id, 'REGISTRATION_CLOSED')}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        Fermer les inscriptions
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChangeStatus(competition.id, 'IN_PROGRESS')}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Démarrer la compétition
                      </button>
                    </>
                  )}
                  
                  {competition.status === 'REGISTRATION_CLOSED' && (
                    <button
                      type="button"
                      onClick={() => handleChangeStatus(competition.id, 'IN_PROGRESS')}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Démarrer la compétition
                    </button>
                  )}
                  
                  {competition.status === 'IN_PROGRESS' && (
                    <button
                      type="button"
                      onClick={() => handleChangeStatus(competition.id, 'COMPLETED')}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Terminer la compétition
                    </button>
                  )}
                  
                  {['DRAFT', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'IN_PROGRESS'].includes(competition.status) && (
                    <button
                      type="button"
                      onClick={() => handleChangeStatus(competition.id, 'CANCELLED')}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Annuler la compétition
                    </button>
                  )}
                  
                  <Link
                    href={`/dashboard/organizer/competitions/${competition.id}/match-sheets`}
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Feuilles de match
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}