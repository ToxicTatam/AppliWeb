'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';

export default function CoachMatchSheets() {
  const { user } = useAuth();
  const [matchSheets, setMatchSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('PENDING');
  const [activeTab, setActiveTab] = useState('pending');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMatchSheets = async () => {
      setLoading(true);
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées pour les feuilles de match
        const matchSheetsData = [
          {
            id: 1,
            matchId: 101,
            matchDate: '2025-05-10T15:00:00',
            competition: 'Championnat National 2025',
            status: 'ONGOING',
            homeTeam: {
              id: 1,
              name: 'FC Barcelona U19',
              logo: 'https://via.placeholder.com/50'
            },
            awayTeam: {
              id: 3,
              name: 'Real Madrid U19',
              logo: 'https://via.placeholder.com/50'
            },
            venue: 'Stade Municipal',
            referee: 'Jean Dupont',
            lastUpdateDate: null
          },
          {
            id: 2,
            matchId: 102,
            matchDate: '2025-05-08T18:30:00',
            competition: 'Coupe Régionale 2025',
            status: 'SUBMITTED',
            homeTeam: {
              id: 2,
              name: 'FC Barcelona U17',
              logo: 'https://via.placeholder.com/50'
            },
            awayTeam: {
              id: 4,
              name: 'Atletico Madrid U17',
              logo: 'https://via.placeholder.com/50'
            },
            venue: 'Complexe Sportif Est',
            referee: 'Marie Martin',
            lastUpdateDate: '2025-05-07T14:22:00'
          },
          {
            id: 3,
            matchId: 103,
            matchDate: '2025-05-05T16:00:00',
            competition: 'Championnat National 2025',
            status: 'VALIDATED',
            homeTeam: {
              id: 2,
              name: 'FC Barcelona U17',
              logo: 'https://via.placeholder.com/50'
            },
            awayTeam: {
              id: 5,
              name: 'Valencia U17',
              logo: 'https://via.placeholder.com/50'
            },
            venue: 'Stade Municipal',
            referee: 'Pierre Durand',
            lastUpdateDate: '2025-05-04T18:45:00',
            validationDate: '2025-05-05T09:15:00',
            result: '2-1'
          },
          {
            id: 4,
            matchId: 104,
            matchDate: '2025-05-02T15:00:00',
            competition: 'Coupe Régionale 2025',
            status: 'UNVALIDATED',
            homeTeam: {
              id: 1,
              name: 'FC Barcelona U19',
              logo: 'https://via.placeholder.com/50'
            },
            awayTeam: {
              id: 6,
              name: 'Sevilla U19',
              logo: 'https://via.placeholder.com/50'
            },
            venue: 'Stade Central',
            referee: 'Sophie Bernard',
            lastUpdateDate: '2025-05-01T17:30:00',
            rejectionReason: 'Informations incomplètes sur les joueurs titulaires',
            rejectionDate: '2025-05-01T19:45:00'
          }
        ];
        
        setMatchSheets(matchSheetsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des feuilles de match:', error);
        setErrorMessage('Erreur lors du chargement des feuilles de match. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchSheets();
  }, []);

  // Filtrer les feuilles de match selon le statut
  const filteredMatchSheets = matchSheets.filter(sheet => {
    if (activeTab === 'pending') return sheet.status === 'ONGOING';
    if (activeTab === 'submitted') return sheet.status === 'SUBMITTED';
    if (activeTab === 'validated') return sheet.status === 'VALIDATED';
    if (activeTab === 'rejected') return sheet.status === 'UNVALIDATED';
    return true;
  });
  
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
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'ONGOING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            À compléter
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
      case 'UNVALIDATED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejetée
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
        <h1 className="text-2xl font-semibold text-gray-900">Feuilles de match</h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Link
            href="/dashboard/matches"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voir tous les matchs
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
            <option value="pending">À compléter</option>
            <option value="submitted">Soumises</option>
            <option value="validated">Validées</option>
            <option value="rejected">Rejetées</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                className={`${
                  activeTab === 'pending'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('pending')}
              >
                À compléter
                <span className={`${activeTab === 'pending' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                  {matchSheets.filter(sheet => sheet.status === 'ONGOING').length}
                </span>
              </button>
              <button
                className={`${
                  activeTab === 'submitted'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('submitted')}
              >
                Soumises
                <span className={`${activeTab === 'submitted' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                  {matchSheets.filter(sheet => sheet.status === 'SUBMITTED').length}
                </span>
              </button>
              <button
                className={`${
                  activeTab === 'validated'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('validated')}
              >
                Validées
                <span className={`${activeTab === 'validated' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                  {matchSheets.filter(sheet => sheet.status === 'VALIDATED').length}
                </span>
              </button>
              <button
                className={`${
                  activeTab === 'rejected'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('rejected')}
              >
                Rejetées
                <span className={`${activeTab === 'rejected' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                  {matchSheets.filter(sheet => sheet.status === 'UNVALIDATED').length}
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Liste des feuilles de match */}
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
      ) : filteredMatchSheets.length === 0 ? (
        <div className="text-center py-12 bg-white shadow overflow-hidden sm:rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune feuille de match</h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === 'pending' 
              ? 'Vous n\'avez pas de feuilles de match à compléter pour le moment.' 
              : activeTab === 'submitted'
              ? 'Vous n\'avez pas de feuilles de match en attente de validation.'
              : activeTab === 'validated'
              ? 'Aucune de vos feuilles de match n\'a encore été validée.'
              : 'Aucune de vos feuilles de match n\'a été rejetée.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredMatchSheets.map((matchSheet) => (
            <div key={matchSheet.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {matchSheet.competition}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {formatDate(matchSheet.matchDate)} • {matchSheet.venue}
                  </p>
                </div>
                <div className="flex items-center">
                  {getStatusBadge(matchSheet.status)}
                  {matchSheet.status === 'ONGOING' && (
                    <Link
                      href={`/dashboard/coach/match-sheets/${matchSheet.id}/edit`}
                      className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Compléter
                    </Link>
                  )}
                  {(matchSheet.status === 'UNVALIDATED') && (
                    <Link
                      href={`/dashboard/coach/match-sheets/${matchSheet.id}/edit`}
                      className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Corriger
                    </Link>
                  )}
                </div>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 flex items-center justify-end">
                      <img src={matchSheet.homeTeam.logo} alt={matchSheet.homeTeam.name} className="h-10 w-10" />
                      <span className="mx-2 font-medium text-gray-900">{matchSheet.homeTeam.name}</span>
                    </div>
                    
                    <div className="mx-4 text-center">
                      {matchSheet.status === 'VALIDATED' ? (
                        <div className="text-xl font-bold">{matchSheet.result}</div>
                      ) : (
                        <div className="text-sm font-medium text-gray-500">VS</div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">Arbitre: {matchSheet.referee}</div>
                    </div>
                    
                    <div className="flex-1 flex items-center">
                      <span className="mx-2 font-medium text-gray-900">{matchSheet.awayTeam.name}</span>
                      <img src={matchSheet.awayTeam.logo} alt={matchSheet.awayTeam.name} className="h-10 w-10" />
                    </div>
                  </div>
                  
                  {/* Informations supplémentaires selon le statut */}
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    {matchSheet.status === 'PENDING' && (
                      <div className="text-sm text-yellow-600">
                        <svg className="inline-block h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        La feuille de match doit être complétée avant le {formatDate(new Date(new Date(matchSheet.matchDate).getTime() - 3600000))}
                      </div>
                    )}
                    
                    {matchSheet.status === 'SUBMITTED' && (
                      <div className="text-sm text-blue-600">
                        <svg className="inline-block h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Feuille soumise le {formatDate(matchSheet.lastUpdateDate)} ({formatRelativeTime(matchSheet.lastUpdateDate)})
                      </div>
                    )}
                    
                    {matchSheet.status === 'VALIDATED' && (
                      <div className="text-sm text-green-600">
                        <svg className="inline-block h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Feuille validée le {formatDate(matchSheet.validationDate)} ({formatRelativeTime(matchSheet.validationDate)})
                      </div>
                    )}
                    
                    {matchSheet.status === 'UNVALIDED' && (
                      <div>
                        <div className="text-sm text-red-600">
                          <svg className="inline-block h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Feuille rejetée le {formatDate(matchSheet.rejectionDate)} ({formatRelativeTime(matchSheet.rejectionDate)})
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          Raison: {matchSheet.rejectionReason}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6 bg-gray-50">
                <Link
                  href={`/dashboard/coach/match-sheets/${matchSheet.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Voir les détails complets
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}