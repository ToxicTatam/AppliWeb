import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import MatchService from '@/services/match-service';

const TeamMatches = ({ teamId }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMatches = async () => {
      if (!teamId) return;
      
      setLoading(true);
      try {
        const response = await MatchService.getTeamMatches(teamId);
        setMatches(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des matchs:', err);
        setError('Impossible de charger les matchs de l\'équipe.');
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMatches();
  }, [teamId]);

  // Afficher un état de chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Afficher un message d'erreur si nécessaire
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-600 px-6 py-8 rounded-md text-center">
        <h3 className="text-lg font-medium mb-2">Aucun match programmé</h3>
        <p className="text-gray-500">
          Aucun match n'est encore programmé pour cette équipe.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Matchs de l'équipe</h2>
      
      <div className="space-y-4">
        {matches.map(match => (
          <div 
            key={match.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-bold text-lg">{match.title}</h3>
                <span 
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
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
              
              <p className="text-sm text-gray-600 mb-1">
                {match.scheduledDateTime 
                  ? format(new Date(match.scheduledDateTime), 'dd MMMM yyyy - HH:mm', { locale: fr }) 
                  : 'Date non définie'}
              </p>
              
              <p className="text-xs text-gray-500 mb-3">
                {match.competitionName}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="text-right mr-2">
                    <span className={`font-semibold ${teamId === match.homeTeamId ? 'text-green-600' : ''}`}>
                      {match.homeTeamName}
                    </span>
                  </div>
                  <span className="bg-gray-200 px-2 py-1 rounded text-sm font-bold">
                    {match.status === 'COMPLETED' ? `${match.homeTeamScore} - ${match.awayTeamScore}` : 'VS'}
                  </span>
                  <div className="ml-2">
                    <span className={`font-semibold ${teamId === match.awayTeamId ? 'text-green-600' : ''}`}>
                      {match.awayTeamName}
                    </span>
                  </div>
                </div>
                
                <Link 
                  href={`/matches/${match.id}`}
                  className="text-green-600 hover:text-green-800 font-medium text-sm"
                >
                  Détails
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMatches;