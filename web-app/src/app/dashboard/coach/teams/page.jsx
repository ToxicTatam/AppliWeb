'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CoachTeams() {
  const router = useRouter();
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        // Dans une vraie application, remplacer par un appel API réel
        const response = await fetch('/api/coach/teams');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des équipes');
        }
        
        // Simuler des données pour le développement
        const teamsData = [
          {
            id: 1,
            name: 'FC Barcelona U19',
            category: 'U19',
            createdAt: '2024-01-15',
            playerCount: 22,
            registeredCompetitions: [
              { id: 1, name: 'Championnat National 2025' }
            ]
          },
          {
            id: 2,
            name: 'FC Barcelona U17',
            category: 'U17',
            createdAt: '2024-01-20',
            playerCount: 18,
            registeredCompetitions: [
              { id: 1, name: 'Championnat National 2025' },
              { id: 2, name: 'Coupe Régionale 2025' }
            ]
          },
          {
            id: 3,
            name: 'FC Barcelona U15',
            category: 'U15',
            createdAt: '2024-02-05',
            playerCount: 20,
            registeredCompetitions: [
              { id: 3, name: 'Tournoi Inter-clubs' }
            ]
          }
        ];
        
        setTeams(teamsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setErrorMessage('Erreur lors du chargement des données. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleRemoveTeam = async (teamId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette équipe ? Cette action est irréversible.')) {
      return;
    }
    
    try {
      // Simuler un appel API pour supprimer l'équipe
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mise à jour de l'état local pour refléter la suppression
      const updatedTeams = teams.filter(team => team.id !== teamId);
      setTeams(updatedTeams);
      
      setSuccessMessage('Équipe supprimée avec succès !');
      
      // Masquer la notification de succès après 5 secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'équipe:', error);
      setErrorMessage('Erreur lors de la suppression de l\'équipe. Veuillez réessayer.');
      
      // Masquer la notification d'erreur après 5 secondes
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-5 border-b border-gray-200 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Gestion des équipes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos équipes et leurs inscriptions aux compétitions
          </p>
        </div>
        <Link
          href="/dashboard/coach/teams/create"
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
          Créer une équipe
        </Link>
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

      {loading ? (
        <div className="animate-pulse">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white shadow overflow-hidden sm:rounded-md mb-4">
              <div className="px-4 py-5 sm:px-6 flex justify-between">
                <div className="h-7 bg-gray-200 rounded w-1/4"></div>
                <div className="h-7 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center py-12 bg-white shadow overflow-hidden sm:rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune équipe</h3>
          <p className="mt-1 text-sm text-gray-500">Commencez par créer une équipe pour pouvoir la gérer et l'inscrire à des compétitions.</p>
          <div className="mt-6">
            <Link
              href="/dashboard/coach/teams/create"
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
              Créer une équipe
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {teams.map((team) => (
            <div key={team.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                    {team.name}
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {team.category}
                    </span>
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Créée le {team.createdAt} • {team.playerCount} joueurs
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href="/dashboard/coach/teamcompetition/register"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Inscrire à une compétition
                  </Link>
                  <Link
                    href={`/dashboard/coach/teams/update?id=${team.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Modifier
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleRemoveTeam(team.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Compétitions inscrites</h4>
                  {team.registeredCompetitions.length === 0 ? (
                    <p className="text-sm text-gray-500">Aucune inscription à une compétition</p>
                  ) : (
                    <div className="space-y-3">
                      {team.registeredCompetitions.map((comp) => (
                        <div key={comp.id} className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md">
                          <span className="text-sm font-medium text-gray-900">{comp.name}</span>
                          <Link
                            href="/dashboard/coach/teamcompetition/unregister"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Désinscrire
                          </Link>
                        </div>
                      ))}
                      
                      {team.registeredCompetitions.length > 1 && (
                        <div className="mt-3 flex justify-end">
                          <Link
                            href="/dashboard/coach/teamcompetition/unregister"
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Désinscrire de toutes les compétitions
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">Gestion des joueurs</span>
                    <div className="flex space-x-2">
                      <Link 
                        href="/dashboard/coach/team/new"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Ajouter un joueur
                      </Link>
                      <Link 
                        href="/dashboard/coach/removeplayer"
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Retirer un joueur
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}