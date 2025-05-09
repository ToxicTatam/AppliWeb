import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import MatchService from '@/services/match-service';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import MatchSheetViewer from './MatchSheetViewer';

const MatchDetails = ({ matchId, isUserView = true }) => {
  // États pour les données et le chargement
  const [match, setMatch] = useState(null);
  const [consolidatedMatch, setConsolidatedMatch] = useState(null);
  const [matchSheets, setMatchSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedTeamSheet, setSelectedTeamSheet] = useState(null);

  // Vérifier les permissions de l'utilisateur
  const { hasAccess } = useRoleAccess();
  const isOrganizer = hasAccess(['ORGANIZER', 'ADMIN']);
  const isCoach = hasAccess(['COACH']);

  // Charger les détails du match
  const fetchMatchDetails = async () => {
    if (!matchId) return;
    
    setLoading(true);
    try {
      // Récupérer les informations de base du match
      const matchData = await MatchService.getMatchById(matchId);
      setMatch(matchData);
      
      // Si le match est terminé, récupérer les données consolidées
      if (matchData.status === 'COMPLETED') {
        const consolidatedData = await MatchService.getConsolidatedMatch(matchId);
        setConsolidatedMatch(consolidatedData);
      }
      
      // Récupérer les feuilles de match si disponibles
      if (matchData.hasMatchSheet) {
        const sheetsResponse = await MatchService.getMatchSheets(matchId);
        setMatchSheets(sheetsResponse.data || []);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching match details:', err);
      setError('Impossible de charger les détails du match. Veuillez réessayer plus tard.');
      setMatch(null);
      setConsolidatedMatch(null);
      setMatchSheets([]);
    } finally {
      setLoading(false);
    }
  };

  // Effet pour charger les données au montage
  useEffect(() => {
    fetchMatchDetails();
  }, [matchId]);

  // Traiter l'onglet actif
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Réinitialiser la feuille de match sélectionnée lors du changement d'onglet
    if (tab !== 'matchsheet') {
      setSelectedTeamSheet(null);
    }
  };

  // Sélectionner une feuille de match d'équipe pour l'affichage
  const handleSelectTeamSheet = (teamId) => {
    setSelectedTeamSheet(teamId);
  };

  // Afficher un message de chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Afficher un message d'erreur
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md my-4">
        <p>{error}</p>
        <button 
          onClick={fetchMatchDetails} 
          className="mt-2 text-sm font-medium text-red-700 underline"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Si pas de données
  if (!match) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-600 px-6 py-8 rounded-md text-center my-4">
        <h3 className="text-lg font-medium mb-2">Match non trouvé</h3>
        <p className="text-gray-500">
          Les détails de ce match ne sont pas disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* En-tête du match */}
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{match.title}</h1>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600">
                {match.scheduledDateTime 
                  ? format(new Date(match.scheduledDateTime), 'EEEE dd MMMM yyyy - HH:mm', { locale: fr }) 
                  : 'Date non définie'}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>
                {match.competitionName}
                {match.round ? ` - ${match.round}` : ''}
                {match.phase ? ` (${match.phase})` : ''}
              </span>
            </div>
            {match.location && (
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{match.location}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <span 
              className={`px-3 py-1 text-sm rounded-full font-medium ${
                match.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-800' :
                match.status === 'IN_PROGRESS' ? 'bg-green-100 text-green-800' :
                match.status === 'COMPLETED' ? 'bg-purple-100 text-purple-800' :
                match.status === 'POSTPONED' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}
            >
              {match.status === 'SCHEDULED' ? 'Programmé' :
               match.status === 'IN_PROGRESS' ? 'En cours' :
               match.status === 'COMPLETED' ? 'Terminé' :
               match.status === 'POSTPONED' ? 'Reporté' :
               'Annulé'}
            </span>
          </div>
        </div>
        
        {/* Actions (boutons d'édition pour coach/organizer) */}
        {!isUserView && (
          <div className="flex flex-wrap gap-2 mb-6">
            {isCoach && (
              <Link 
                href={`/dashboard/coach/matches/${match.id}/match-sheet`}
                className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {match.hasMatchSheet ? 'Modifier la feuille de match' : 'Créer une feuille de match'}
              </Link>
            )}
            
            {isOrganizer && (
              <>
                <Link 
                  href={`/dashboard/organizer/matches/${match.id}/edit`}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Modifier le match
                </Link>
                {match.hasMatchSheet && match.matchSheetStatus === 'SUBMITTED' && (
                  <Link 
                    href={`/dashboard/organizer/matches/${match.id}/validate`}
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Valider la feuille de match
                  </Link>
                )}
              </>
            )}
          </div>
        )}
        
        {/* Score et équipes */}
        <div className="flex items-center justify-center my-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-inner">
          <div className="grid grid-cols-5 w-full max-w-3xl">
            <div className="col-span-2 flex flex-col items-center md:items-end text-center md:text-right">
              <Link 
                href={isUserView ? `/teams/${match.homeTeamId}` : `/dashboard/teams/${match.homeTeamId}`}
                className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors mb-2"
              >
                {match.homeTeamName}
              </Link>
              {/* À remplacer par un logo d'équipe si disponible */}
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xs">Logo</span>
              </div>
            </div>
            
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold my-4">
                {match.status === 'COMPLETED' || match.status === 'IN_PROGRESS'
                  ? `${match.homeTeamScore ?? 0} - ${match.awayTeamScore ?? 0}`
                  : 'VS'}
              </div>
            </div>
            
            <div className="col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
              <Link 
                href={isUserView ? `/teams/${match.awayTeamId}` : `/dashboard/teams/${match.awayTeamId}`}
                className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors mb-2"
              >
                {match.awayTeamName}
              </Link>
              {/* À remplacer par un logo d'équipe si disponible */}
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xs">Logo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation par onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto scrollbar-hide">
          <button
            onClick={() => handleTabChange('details')}
            className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
              activeTab === 'details'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Informations
          </button>
          
          {match.hasMatchSheet && (
            <button
              onClick={() => handleTabChange('matchsheet')}
              className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'matchsheet'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Feuille de match
            </button>
          )}
          
          {consolidatedMatch && (
            <button
              onClick={() => handleTabChange('statistics')}
              className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === 'statistics'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Statistiques
            </button>
          )}
        </nav>
      </div>
      
      {/* Contenu des onglets */}
      <div className="p-6">
        {/* Onglet détails */}
        {activeTab === 'details' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Informations générales</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Compétition</span>
                    <Link 
                      href={isUserView ? `/competitions/${match.competitionId}` : `/dashboard/competitions/${match.competitionId}`}
                      className="font-medium text-green-600 hover:underline"
                    >
                      {match.competitionName}
                    </Link>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Type de compétition</span>
                    <span className="font-medium text-gray-800">{match.competitionType}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Statut</span>
                    <span className="font-medium text-gray-800">
                      {match.status === 'SCHEDULED' ? 'Programmé' :
                       match.status === 'IN_PROGRESS' ? 'En cours' :
                       match.status === 'COMPLETED' ? 'Terminé' :
                       match.status === 'POSTPONED' ? 'Reporté' :
                       'Annulé'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Phase</span>
                    <span className="font-medium text-gray-800">{match.phase || 'Non spécifié'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Tour/Journée</span>
                    <span className="font-medium text-gray-800">{match.round || 'Non spécifié'}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Équipes</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Équipe à domicile</span>
                    <Link 
                      href={isUserView ? `/teams/${match.homeTeamId}` : `/dashboard/teams/${match.homeTeamId}`}
                      className="font-medium text-green-600 hover:underline"
                    >
                      {match.homeTeamName}
                    </Link>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Équipe à l'extérieur</span>
                    <Link 
                      href={isUserView ? `/teams/${match.awayTeamId}` : `/dashboard/teams/${match.awayTeamId}`}
                      className="font-medium text-green-600 hover:underline"
                    >
                      {match.awayTeamName}
                    </Link>
                  </li>
                  {match.status === 'COMPLETED' && (
                    <>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Score final</span>
                        <span className="font-medium text-gray-800">{match.homeTeamScore} - {match.awayTeamScore}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Vainqueur</span>
                        <span className="font-medium text-gray-800">
                          {match.homeTeamScore > match.awayTeamScore
                            ? match.homeTeamName
                            : match.homeTeamScore < match.awayTeamScore
                            ? match.awayTeamName
                            : 'Match nul'}
                        </span>
                      </li>
                    </>
                  )}
                  <li className="flex justify-between">
                    <span className="text-gray-600">Feuille de match</span>
                    <span className="font-medium text-gray-800">
                      {match.hasMatchSheet 
                        ? match.matchSheetStatus === 'VALIDATED' 
                          ? 'Validée' 
                          : 'En attente de validation'
                        : 'Non disponible'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Onglet feuille de match */}
        {activeTab === 'matchsheet' && match.hasMatchSheet && (
          <div>
            {match.matchSheetStatus === 'VALIDATED' ? (
              matchSheets.length > 0 ? (
                <div className="space-y-6">
                  {/* Sélecteur d'équipe si aucune équipe n'est sélectionnée */}
                  {!selectedTeamSheet && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Feuilles de match disponibles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {matchSheets.map(sheet => (
                          <button
                            key={sheet.id}
                            onClick={() => handleSelectTeamSheet(sheet.teamId)}
                            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md transition-all text-left"
                          >
                            <h4 className="font-medium text-lg mb-2">{sheet.teamName}</h4>
                            <p className="text-gray-600 text-sm">
                              {sheet.teamRole === 'HOME' ? 'Équipe à domicile' : 'Équipe à l\'extérieur'}
                            </p>
                            <div className="mt-3 text-green-600 font-medium text-sm">
                              Voir la feuille de match
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Afficher la feuille de match sélectionnée */}
                  {selectedTeamSheet && (
                    <div>
                      <div className="mb-4 flex justify-between items-center">
                        <button
                          onClick={() => setSelectedTeamSheet(null)}
                          className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Retour à la liste des équipes
                        </button>
                      </div>
                      <MatchSheetViewer matchId={matchId} teamId={selectedTeamSheet} isUserView={isUserView} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-4">Les feuilles de match sont validées mais n'ont pas pu être chargées. Veuillez réessayer plus tard.</p>
                  <button 
                    onClick={fetchMatchDetails} 
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Recharger
                  </button>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-1">Les feuilles de match sont en attente de validation par l'organisateur.</p>
                <p className="text-gray-500 text-sm mb-4">Elles seront disponibles une fois validées.</p>
                {isOrganizer && !isUserView && (
                  <Link 
                    href={`/dashboard/organizer/matches/${match.id}/validate`}
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Valider la feuille de match
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Onglet statistiques */}
        {activeTab === 'statistics' && consolidatedMatch && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Statistiques du match</h3>
            
            {consolidatedMatch.statistics ? (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                  <div className="text-center mb-4 md:mb-0">
                    <span className="block text-lg font-semibold">{match.homeTeamName}</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-sm uppercase font-medium text-gray-500 mb-1">Statistiques</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-lg font-semibold">{match.awayTeamName}</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Possession */}
                  <div className="flex items-center">
                    <div className="w-1/4 text-right pr-3">
                      <span className="font-medium">{consolidatedMatch.statistics.homeTeamStats.possession}%</span>
                    </div>
                    <div className="w-1/2">
                      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-green-600"
                          style={{ width: `${consolidatedMatch.statistics.homeTeamStats.possession}%` }}
                        ></div>
                      </div>
                      <div className="text-center text-xs text-gray-500 mt-1">Possession</div>
                    </div>
                    <div className="w-1/4 pl-3">
                      <span className="font-medium">{consolidatedMatch.statistics.awayTeamStats.possession}%</span>
                    </div>
                  </div>
                  
                  {/* Tirs cadrés */}
                  <div className="flex items-center">
                    <div className="w-1/4 text-right pr-3">
                      <span className="font-medium">{consolidatedMatch.statistics.homeTeamStats.shotsOnTarget}</span>
                    </div>
                    <div className="w-1/2">
                      <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-center text-xs text-gray-500 mt-1">Tirs cadrés</div>
                    </div>
                    <div className="w-1/4 pl-3">
                      <span className="font-medium">{consolidatedMatch.statistics.awayTeamStats.shotsOnTarget}</span>
                    </div>
                  </div>
                  
                  {/* Autres statistiques */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                      <div className="font-medium text-xl">{consolidatedMatch.statistics.homeTeamStats.shotsOffTarget}</div>
                      <div className="text-xs text-gray-500">Tirs non cadrés</div>
                      <div className="font-medium text-xl mt-2">{consolidatedMatch.statistics.awayTeamStats.shotsOffTarget}</div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                      <div className="font-medium text-xl">{consolidatedMatch.statistics.homeTeamStats.corners}</div>
                      <div className="text-xs text-gray-500">Corners</div>
                      <div className="font-medium text-xl mt-2">{consolidatedMatch.statistics.awayTeamStats.corners}</div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                      <div className="font-medium text-xl">{consolidatedMatch.statistics.homeTeamStats.fouls}</div>
                      <div className="text-xs text-gray-500">Fautes</div>
                      <div className="font-medium text-xl mt-2">{consolidatedMatch.statistics.awayTeamStats.fouls}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-600">Les statistiques détaillées ne sont pas disponibles pour ce match.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;