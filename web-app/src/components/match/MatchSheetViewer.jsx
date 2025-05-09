import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import MatchService from '@/services/match-service';
import { PlayerStatus, PlayerPosition } from '@/lib/utils/enums';

const MatchSheetViewer = ({ matchId, teamId, isUserView = true }) => {
  // États pour les données et le chargement
  const [matchSheet, setMatchSheet] = useState(null);
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données de la feuille de match
  useEffect(() => {
    const fetchMatchSheetData = async () => {
      if (!matchId || !teamId) return;
      
      setLoading(true);
      try {
        // Récupérer les détails du match
        const matchData = await MatchService.getMatchById(matchId);
        setMatch(matchData);
        
        // Récupérer les feuilles de match de ce match
        const matchSheetsResponse = await MatchService.getMatchSheets(matchId);
        
        // Trouver la feuille de match pour l'équipe spécifiée
        const teamMatchSheet = matchSheetsResponse.data.find(
          sheet => sheet.teamId === Number(teamId)
        );
        
        if (!teamMatchSheet) {
          throw new Error('Feuille de match non trouvée');
        }
        
        // Récupérer les détails complets de la feuille de match
        const detailedMatchSheet = await MatchService.getMatchSheetById(teamMatchSheet.id);
        setMatchSheet(detailedMatchSheet);
        
        setError(null);
      } catch (err) {
        setError('Impossible de charger la feuille de match. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMatchSheetData();
  }, [matchId, teamId]);

  // Afficher un message de chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Afficher un message d'erreur
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>{error}</p>
        <Link
          href={isUserView ? `/matches/${matchId}` : `/dashboard/matches/${matchId}`}
          className="mt-2 inline-block text-sm font-medium text-red-700 underline"
        >
          Retour aux détails du match
        </Link>
      </div>
    );
  }

  // Si pas de données
  if (!matchSheet || !match) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-600 px-6 py-8 rounded-md text-center">
        <h3 className="text-lg font-medium mb-2">Feuille de match non trouvée</h3>
        <p className="text-gray-500">
          La feuille de match demandée n'est pas disponible ou n'a pas encore été validée.
        </p>
        <Link
          href={isUserView ? `/matches/${matchId}` : `/dashboard/matches/${matchId}`}
          className="mt-4 inline-block text-sm font-medium text-green-600 underline"
        >
          Retour aux détails du match
        </Link>
      </div>
    );
  }

  // Formatter la date et l'heure
  const formattedDateTime = match.scheduledDateTime
    ? format(new Date(match.scheduledDateTime), 'dd MMMM yyyy - HH:mm', { locale: fr })
    : 'Date non définie';

  // Déterminer si l'équipe est à domicile ou à l'extérieur
  const isHomeTeam = matchSheet.teamRole === 'HOME';
  const opponentName = isHomeTeam ? match.awayTeamName : match.homeTeamName;
  const opponentId = isHomeTeam ? match.awayTeamId : match.homeTeamId;

  // Grouper les joueurs par statut
  const starters = matchSheet.playerParticipations.filter(p => p.playerStatus === PlayerStatus.STARTER);
  const substitutes = matchSheet.playerParticipations.filter(p => p.playerStatus === PlayerStatus.SUBSTITUTE);
  const notPlayed = matchSheet.playerParticipations.filter(p => p.playerStatus === PlayerStatus.NOT_PLAYED);
  const injured = matchSheet.playerParticipations.filter(p => p.playerStatus === PlayerStatus.INJURED);
  const expelled = matchSheet.playerParticipations.filter(p => p.playerStatus === PlayerStatus.EXPELLED);
  const reserves = matchSheet.playerParticipations.filter(p => p.playerStatus === PlayerStatus.RESERVE);

  return (
    <div className="space-y-8">
      {/* En-tête avec les informations du match */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Feuille de match : {matchSheet.teamName}
            </h1>
            <p className="text-gray-600">{match.title}</p>
            <p className="text-sm text-gray-500">{formattedDateTime}</p>
            <p className="text-sm text-gray-500">{match.competitionName}</p>
            {match.location && <p className="text-sm text-gray-500">Lieu : {match.location}</p>}
          </div>
          
          <Link
            href={isUserView ? `/matches/${matchId}` : `/dashboard/matches/${matchId}`}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Retour au match
          </Link>
        </div>
        
        {/* Score */}
        <div className="flex items-center justify-center my-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between w-full max-w-md">
            <div className="text-center">
              <Link
                href={isUserView ? `/teams/${matchSheet.teamId}` : `/dashboard/teams/${matchSheet.teamId}`}
                className="font-bold text-lg text-gray-800 hover:text-green-600"
              >
                {matchSheet.teamName}
              </Link>
              <div className="mt-2 text-3xl font-bold">{matchSheet.teamScore}</div>
            </div>
            
            <div className="text-xl font-bold text-gray-500">-</div>
            
            <div className="text-center">
              <Link
                href={isUserView ? `/teams/${opponentId}` : `/dashboard/teams/${opponentId}`}
                className="font-bold text-lg text-gray-800 hover:text-green-600"
              >
                {opponentName}
              </Link>
              <div className="mt-2 text-3xl font-bold">{matchSheet.opponentScore}</div>
            </div>
          </div>
        </div>
        
        {/* Formation et commentaires */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {matchSheet.strategy && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Formation tactique</h3>
              <p className="text-gray-700 font-medium bg-gray-50 p-2 rounded">{matchSheet.strategy}</p>
            </div>
          )}
          
          {matchSheet.coachComments && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Commentaires du coach</h3>
              <p className="text-gray-600 bg-gray-50 p-2 rounded">{matchSheet.coachComments}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Joueurs titulaires */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Composition</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N°
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joueur
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Minutes
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buts
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cartons
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Titulaires */}
              {starters.map((player) => (
                <tr key={player.playerId} className="bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {player.shirtNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {player.playerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getPositionLabel(player.positionPlayed)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.minutesPlayed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.goalsScored > 0 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        {player.goalsScored}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.yellowCards > 0 && (
                      <span className="inline-block w-4 h-4 bg-yellow-300 mr-1"></span>
                    )}
                    {player.yellowCards > 1 && (
                      <span className="inline-block w-4 h-4 bg-yellow-300 mr-1"></span>
                    )}
                    {player.redCards > 0 && (
                      <span className="inline-block w-4 h-4 bg-red-500 mr-1"></span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.substitutionOutTime > 0 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        Remplacé à la {player.substitutionOutTime}'
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              
              {/* Remplaçants entrés en jeu */}
              {substitutes.map((player) => (
                <tr key={player.playerId} className="bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {player.shirtNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {player.playerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getPositionLabel(player.positionPlayed)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.minutesPlayed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.goalsScored > 0 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        {player.goalsScored}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {player.yellowCards > 0 && (
                      <span className="inline-block w-4 h-4 bg-yellow-300 mr-1"></span>
                    )}
                    {player.yellowCards > 1 && (
                      <span className="inline-block w-4 h-4 bg-yellow-300 mr-1"></span>
                    )}
                    {player.redCards > 0 && (
                      <span className="inline-block w-4 h-4 bg-red-500 mr-1"></span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      Entré à la {player.substitutionInTime}'
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Banc de touche */}
      {benchPlayers.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Banc de touche</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {benchPlayers.map((player) => (
              <div key={player.playerId} className="p-3 border border-gray-200 rounded-md">
                <div className="font-medium">{player.playerName}</div>
                <div className="text-sm text-gray-500">
                  {player.shirtNumber && `N° ${player.shirtNumber} - `}
                  {getPositionLabel(player.position)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Joueurs non disponibles */}
      {unavailablePlayers.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Joueurs indisponibles</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {unavailablePlayers.map((player) => (
              <div key={player.playerId} className="p-3 border border-gray-200 rounded-md bg-gray-50">
                <div className="font-medium">{player.playerName}</div>
                <div className="text-sm text-gray-500">
                  {getPositionLabel(player.position)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Fonction utilitaire pour obtenir le libellé d'une position
const getPositionLabel = (position) => {
  const positionMap = {
    [PlayerPosition.GOALKEEPER]: 'Gardien',
    [PlayerPosition.DEFENDER]: 'Défenseur',
    [PlayerPosition.MIDFIELDER]: 'Milieu',
    [PlayerPosition.FORWARD]: 'Attaquant'
  };
  
  return positionMap[position] || position;
};

export default MatchSheetViewer;