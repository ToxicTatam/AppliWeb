'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../../component/ui/Badge';
import Button from '../../component/ui/Button';

export default function Matches() {
  const router = useRouter();
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées pour les matchs
        const matchesData = [
          {
            id: 101,
            title: "Match de championnat - Journée 5",
            homeTeamId: 1,
            homeTeamName: "FC Barcelona U19",
            homeTeamLogo: "https://via.placeholder.com/50",
            awayTeamId: 3,
            awayTeamName: "Real Madrid U19",
            awayTeamLogo: "https://via.placeholder.com/50",
            competitionId: 1,
            competitionName: "Championnat National 2025",
            competitionType: "LEAGUE",
            scheduledDateTime: "2025-05-10T15:00:00",
            venue: "Stade Municipal",
            status: "SCHEDULED",
            homeTeamScore: null,
            awayTeamScore: null,
            hasMatchSheet: true,
            matchSheetStatus: "ONGOING",
            round: "Journée 5",
            phase: "Regular Season"
          },
          {
            id: 102,
            title: "Quart de finale - Coupe Régionale",
            homeTeamId: 2,
            homeTeamName: "FC Barcelona U17",
            homeTeamLogo: "https://via.placeholder.com/50",
            awayTeamId: 4,
            awayTeamName: "Atletico Madrid U17",
            awayTeamLogo: "https://via.placeholder.com/50",
            competitionId: 2,
            competitionName: "Coupe Régionale 2025",
            competitionType: "CUP",
            scheduledDateTime: "2025-05-08T18:30:00",
            venue: "Complexe Sportif Est",
            status: "SCHEDULED",
            homeTeamScore: null,
            awayTeamScore: null,
            hasMatchSheet: true,
            matchSheetStatus: "SUBMITTED",
            round: "Quart de finale",
            phase: "Knockout"
          },
          {
            id: 103,
            title: "Match de championnat - Journée 4",
            homeTeamId: 2,
            homeTeamName: "FC Barcelona U17",
            homeTeamLogo: "https://via.placeholder.com/50",
            awayTeamId: 5,
            awayTeamName: "Valencia U17",
            awayTeamLogo: "https://via.placeholder.com/50",
            competitionId: 1,
            competitionName: "Championnat National 2025",
            competitionType: "LEAGUE",
            scheduledDateTime: "2025-05-05T16:00:00",
            venue: "Stade Municipal",
            status: "COMPLETED",
            homeTeamScore: 2,
            awayTeamScore: 1,
            hasMatchSheet: true,
            matchSheetStatus: "VALIDATED",
            round: "Journée 4",
            phase: "Regular Season"
          },
          {
            id: 104,
            title: "Huitième de finale - Coupe Régionale",
            homeTeamId: 1,
            homeTeamName: "FC Barcelona U19",
            homeTeamLogo: "https://via.placeholder.com/50",
            awayTeamId: 6,
            awayTeamName: "Sevilla U19",
            awayTeamLogo: "https://via.placeholder.com/50",
            competitionId: 2,
            competitionName: "Coupe Régionale 2025",
            competitionType: "CUP",
            scheduledDateTime: "2025-05-02T15:00:00",
            venue: "Stade Central",
            status: "COMPLETED",
            homeTeamScore: 3,
            awayTeamScore: 1,
            hasMatchSheet: true,
            matchSheetStatus: "UNVALIDATED",
            round: "Huitième de finale",
            phase: "Knockout"
          },
          {
            id: 105,
            title: "Match de championnat - Journée 3",
            homeTeamId: 7,
            homeTeamName: "Athletic Bilbao U19",
            homeTeamLogo: "https://via.placeholder.com/50",
            awayTeamId: 1,
            awayTeamName: "FC Barcelona U19",
            awayTeamLogo: "https://via.placeholder.com/50",
            competitionId: 1,
            competitionName: "Championnat National 2025",
            competitionType: "LEAGUE",
            scheduledDateTime: "2025-04-28T17:00:00",
            venue: "Stade San Mamés Junior",
            status: "COMPLETED",
            homeTeamScore: 0,
            awayTeamScore: 2,
            hasMatchSheet: true,
            matchSheetStatus: "VALIDATED",
            round: "Journée 3",
            phase: "Regular Season"
          },
          {
            id: 106,
            title: "Match de championnat - Journée 6",
            homeTeamId: 5,
            homeTeamName: "Valencia U17",
            homeTeamLogo: "https://via.placeholder.com/50",
            awayTeamId: 1,
            awayTeamName: "FC Barcelona U19",
            awayTeamLogo: "https://via.placeholder.com/50",
            competitionId: 1,
            competitionName: "Championnat National 2025", 
            competitionType: "LEAGUE",
            scheduledDateTime: "2025-05-17T16:30:00",
            venue: "Stade Mestalla Junior",
            status: "SCHEDULED",
            homeTeamScore: null,
            awayTeamScore: null,
            hasMatchSheet: false,
            matchSheetStatus: null,
            round: "Journée 6",
            phase: "Regular Season"
          },
          {
            id: 107,
            title: "Match amical",
            homeTeamId: 1,
            homeTeamName: "FC Barcelona U19",
            homeTeamLogo: "https://via.placeholder.com/50",
            awayTeamId: 8,
            awayTeamName: "Paris Saint-Germain U19",
            awayTeamLogo: "https://via.placeholder.com/50",
            competitionId: 3,
            competitionName: "Amical International",
            competitionType: "FRIENDLY",
            scheduledDateTime: "2025-05-24T19:00:00",
            venue: "Camp Nou Junior",
            status: "SCHEDULED",
            homeTeamScore: null,
            awayTeamScore: null,
            hasMatchSheet: false,
            matchSheetStatus: null,
            round: null,
            phase: null
          },
          {
            id: 108,
            title: "Match de championnat - Journée 2",
            homeTeamId: 1,
            homeTeamName: "FC Barcelona U19",
            homeTeamLogo: "https://via.placeholder.com/50",
            awayTeamId: 9,
            awayTeamName: "Real Betis U19",
            awayTeamLogo: "https://via.placeholder.com/50",
            competitionId: 1,
            competitionName: "Championnat National 2025",
            competitionType: "LEAGUE",
            scheduledDateTime: "2025-04-21T15:00:00",
            venue: "Camp Nou Junior",
            status: "COMPLETED",
            homeTeamScore: 4,
            awayTeamScore: 0,
            hasMatchSheet: true,
            matchSheetStatus: "VALIDATED",
            round: "Journée 2",
            phase: "Regular Season"
          }
        ];
        
        setMatches(matchesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des matchs:', error);
        setErrorMessage('Erreur lors du chargement des matchs. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Filtrer les matchs selon le statut sélectionné
  const filteredMatches = matches.filter(match => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return match.status === 'SCHEDULED';
    if (activeTab === 'ongoing') return match.status === 'IN_PROGRESS';
    if (activeTab === 'completed') return match.status === 'COMPLETED';
    if (activeTab === 'cancelled') return match.status === 'CANCELLED' || match.status === 'POSTPONED';
    return true;
  });
  
  // Trier les matchs: prochains matchs d'abord, puis matchs en cours, puis matchs terminés
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    // Matchs en cours en premier
    if (a.status === 'IN_PROGRESS' && b.status !== 'IN_PROGRESS') return -1;
    if (a.status !== 'IN_PROGRESS' && b.status === 'IN_PROGRESS') return 1;
    
    // Ensuite par date: prochain matchs, puis matchs passés
    if (a.status === 'SCHEDULED' && b.status === 'COMPLETED') return -1;
    if (a.status === 'COMPLETED' && b.status === 'SCHEDULED') return 1;
    
    // Sinon par date (croissant pour les matchs à venir, décroissant pour les matchs passés)
    if (a.status === 'SCHEDULED' && b.status === 'SCHEDULED') {
      return new Date(a.scheduledDateTime) - new Date(b.scheduledDateTime);
    }
    
    return new Date(b.scheduledDateTime) - new Date(a.scheduledDateTime);
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
  
  // Fonction pour obtenir le badge de statut du match
  const getStatusBadge = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            À venir
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            En cours
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
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
  
  // Fonction pour obtenir le badge de statut de la feuille de match
  const getMatchSheetStatusBadge = (status) => {
    if (!status) return null;
    
    switch (status) {
      case 'ONGOING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Feuille en cours
          </span>
        );
      case 'SUBMITTED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Feuille soumise
          </span>
        );
      case 'VALIDATED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Feuille validée
          </span>
        );
      case 'UNVALIDATED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Feuille rejetée
          </span>
        );
      default:
        return null;
    }
  };

  // Grouper les matchs par date pour les afficher
  const groupMatchesByDate = (matches) => {
    const groupedMatches = {};
    
    matches.forEach(match => {
      const date = new Date(match.scheduledDateTime).toLocaleDateString('fr-FR');
      if (!groupedMatches[date]) {
        groupedMatches[date] = [];
      }
      groupedMatches[date].push(match);
    });
    
    return groupedMatches;
  };
  
  const groupedMatches = groupMatchesByDate(sortedMatches);
  
  // Vérifier si l'utilisateur est un entraîneur
  const isCoach = user && user.role === 'COACH';

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Matchs</h1>
        {isCoach && (
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <Link
              href="/dashboard/coach/match-sheets"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Mes feuilles de match
            </Link>
          </div>
        )}
      </div>

      {/* Message d'erreur si nécessaire */}
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
            <option value="ongoing">En cours</option>
            <option value="completed">Terminés</option>
            <option value="cancelled">Annulés/Reportés</option>
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
                Tous
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
                  {matches.filter(match => match.status === 'SCHEDULED').length}
                </span>
              </button>
              <button
                className={`${
                  activeTab === 'ongoing'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('ongoing')}
              >
                En cours
                <span className={`${activeTab === 'ongoing' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                  {matches.filter(match => match.status === 'IN_PROGRESS').length}
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
                Annulés/Reportés
                <span className={`${activeTab === 'cancelled' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'} ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                  {matches.filter(match => match.status === 'CANCELLED' || match.status === 'POSTPONED').length}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun match trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === 'all' 
              ? 'Aucun match n\'est disponible actuellement.' 
              : activeTab === 'upcoming'
              ? 'Aucun match à venir n\'est programmé pour le moment.'
              : activeTab === 'ongoing'
              ? 'Aucun match n\'est en cours actuellement.'
              : activeTab === 'completed'
              ? 'Aucun match terminé n\'est disponible.'
              : 'Aucun match annulé ou reporté n\'est disponible.'}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.keys(groupedMatches).map((date) => (
            <div key={date}>
              <h2 className="text-lg font-medium text-gray-900 mb-3">{date}</h2>
              <div className="space-y-4">
                {groupedMatches[date].map((match) => (
                  <div key={match.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-4 sm:px-6 flex flex-wrap justify-between items-center">
                      <div className="flex-1 min-w-0 mr-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 truncate">
                          {match.title || `${match.homeTeamName} vs ${match.awayTeamName}`}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-2">
                          <span>{match.competitionName}</span>
                          {match.round && (
                            <>
                              <span className="hidden sm:inline">•</span>
                              <span>{match.round}</span>
                            </>
                          )}
                          <span className="hidden sm:inline">•</span>
                          <span>{formatDate(match.scheduledDateTime)}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{match.venue}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        {getStatusBadge(match.status)}
                        {match.hasMatchSheet && getMatchSheetStatusBadge(match.matchSheetStatus)}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 flex items-center justify-end">
                          <img src={match.homeTeamLogo} alt={match.homeTeamName} className="h-10 w-10" />
                          <span className="mx-2 font-medium text-gray-900">{match.homeTeamName}</span>
                        </div>
                        
                        <div className="mx-4 text-center">
                          {match.status === 'COMPLETED' ? (
                            <div className="text-xl font-bold">{match.homeTeamScore} - {match.awayTeamScore}</div>
                          ) : (
                            <div className="text-sm font-medium text-gray-500">VS</div>
                          )}
                        </div>
                        
                        <div className="flex-1 flex items-center">
                          <span className="mx-2 font-medium text-gray-900">{match.awayTeamName}</span>
                          <img src={match.awayTeamLogo} alt={match.awayTeamName} className="h-10 w-10" />
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-4 sm:px-6 bg-gray-50 flex justify-between">
                      <Link
                        href={`/dashboard/matches/${match.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Voir les détails
                      </Link>
                      
                      {isCoach && match.hasMatchSheet && ['ONGOING', 'UNVALIDATED'].includes(match.matchSheetStatus) && (
                        <Link
                          href={`/dashboard/coach/match-sheets/${match.id}/edit`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          {match.matchSheetStatus === 'ONGOING' ? 'Compléter la feuille' : 'Corriger la feuille'}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}