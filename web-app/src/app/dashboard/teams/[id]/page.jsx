'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function TeamDetailPage({ params }) {
 // const { id } = params;
  const { id } = React.use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info'); // info, players, matches

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      try {
        // Dans une implémentation réelle, vous utiliseriez teamService.getTeamById(id)
        // Pour cette démonstration, nous utilisons des données simulées
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simuler la récupération des données d'une équipe
        const mockTeam = {
          id: parseInt(id),
          name: 'FC Barcelona',
          description: 'Club de football professionnel basé à Barcelone, Espagne.',
          logo: 'https://via.placeholder.com/150',
          category: 'Professionnelle',
          coach: { 
            id: 3, 
            firstName: 'Lionel', 
            lastName: 'Messi', 
            email: 'lionel.messi@example.com',
            role: 'COACH',
            phoneNumber: '+33 6 12 34 56 78',
            profilPicture: 'https://via.placeholder.com/150'
          },
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-04-15'),
          competitions: [
            { id: 1, name: 'Championnat National', status: 'ONGOING' },
            { id: 2, name: 'Coupe Nationale', status: 'UPCOMING' }
          ]
        };
        
        setTeam(mockTeam);
        
        // Simuler la récupération des joueurs de l'équipe
        const mockPlayers = [
          { 
            id: 1, 
            firstName: 'Gerard', 
            lastName: 'Piqué', 
            dateOfBirth: new Date('1987-02-02'),
            licenseNumber: 'LIC123456',
            profilPicture: 'https://via.placeholder.com/150',
            role: 'PLAYER',
            email: 'gerard.pique@example.com',
            stats: {
              matchesPlayed: 25,
              goalsScored: 3,
              assists: 1,
              yellowCards: 4,
              redCards: 0
            }
          },
          { 
            id: 2, 
            firstName: 'Sergio', 
            lastName: 'Busquets', 
            dateOfBirth: new Date('1988-07-16'),
            licenseNumber: 'LIC234567',
            profilPicture: 'https://via.placeholder.com/150',
            role: 'PLAYER',
            email: 'sergio.busquets@example.com',
            stats: {
              matchesPlayed: 28,
              goalsScored: 1,
              assists: 6,
              yellowCards: 7,
              redCards: 1
            }
          },
          { 
            id: 3, 
            firstName: 'Antoine', 
            lastName: 'Griezmann', 
            dateOfBirth: new Date('1991-03-21'),
            licenseNumber: 'LIC345678',
            profilPicture: 'https://via.placeholder.com/150',
            role: 'PLAYER',
            email: 'antoine.griezmann@example.com',
            stats: {
              matchesPlayed: 30,
              goalsScored: 15,
              assists: 10,
              yellowCards: 2,
              redCards: 0
            }
          },
          { 
            id: 4, 
            firstName: 'Frenkie', 
            lastName: 'De Jong', 
            dateOfBirth: new Date('1997-05-12'),
            licenseNumber: 'LIC456789',
            profilPicture: 'https://via.placeholder.com/150',
            role: 'PLAYER',
            email: 'frenkie.dejong@example.com',
            stats: {
              matchesPlayed: 27,
              goalsScored: 2,
              assists: 8,
              yellowCards: 3,
              redCards: 0
            }
          }
        ];
        
        setPlayers(mockPlayers);
      } catch (err) {
        console.error('Erreur lors de la récupération des données de l\'équipe:', err);
        setError('Impossible de charger les détails de l\'équipe. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTeamData();
    }
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Vérifier si l'utilisateur peut gérer cette équipe (coach ou admin)
  const canManageTeam = user && team && (
    user.role === 'ADMIN' || 
    (user.role === 'COACH' && user.id === team.coach.id)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => router.push('/dashboard/teams')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Retour aux équipes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Équipe non trouvée</h3>
        <p className="mt-1 text-sm text-gray-500">
          L'équipe que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => router.push('/dashboard/teams')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retour aux équipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0 flex items-center">
          {team.logo && (
            <div className="flex-shrink-0 h-16 w-16 mr-4">
              <img className="h-16 w-16 rounded-full" src={team.logo} alt={team.name} />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {team.name}
            </h2>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Catégorie: {team.category}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                {players.length} joueurs
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retour
          </button>
          
          {canManageTeam && (
            <Link
              href={`/dashboard/coach/teams/edit/${team.id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Gérer l'équipe
            </Link>
          )}
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            className={`${
              activeTab === 'info'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('info')}
          >
            Informations
          </button>
          <button
            className={`${
              activeTab === 'players'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('players')}
          >
            Joueurs ({players.length})
          </button>
          <button
            className={`${
              activeTab === 'matches'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('matches')}
          >
            Matchs
          </button>
          <button
            className={`${
              activeTab === 'competitions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('competitions')}
          >
            Compétitions ({team.competitions.length})
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'info' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Détails de l'équipe
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Informations complètes sur cette équipe.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nom</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {team.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {team.description}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Catégorie</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {team.category}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Coach</dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    {team.coach.profilPicture && (
                      <div className="flex-shrink-0 h-10 w-10 mr-3">
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={team.coach.profilPicture} 
                          alt={`${team.coach.firstName} ${team.coach.lastName}`} 
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-gray-900 font-medium">{team.coach.firstName} {team.coach.lastName}</p>
                      <p className="text-gray-500">{team.coach.email}</p>
                      {team.coach.phoneNumber && (
                        <p className="text-gray-500">{team.coach.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nombre de joueurs</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {players.length}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Compétitions</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {team.competitions.length > 0 ? (
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {team.competitions.map((competition) => (
                        <li key={competition.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 flex-1 w-0 truncate">
                              {competition.name}
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <Link
                              href={`/dashboard/competitions/${competition.id}`}
                              className="font-medium text-blue-600 hover:text-blue-500"
                            >
                              Voir
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Cette équipe ne participe à aucune compétition pour le moment.</p>
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Date de création</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDate(team.createdAt)}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Dernière mise à jour</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDate(team.updatedAt)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {activeTab === 'players' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Joueurs de l'équipe
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Liste des joueurs de l'équipe et leurs statistiques.
              </p>
            </div>
            {canManageTeam && (
              <Link
                href={`/dashboard/coach/teams/${team.id}/add-player`}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Ajouter un joueur
              </Link>
            )}
          </div>
          <div className="border-t border-gray-200">
            {players.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun joueur</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Aucun joueur n'est encore inscrit dans cette équipe.
                </p>
                {canManageTeam && (
                  <div className="mt-6">
                    <Link
                      href={`/dashboard/coach/teams/${team.id}/add-player`}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Ajouter un joueur
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joueur
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Licence
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Matchs
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Buts
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Passes
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cartons
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {players.map((player) => (
                      <tr key={player.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {player.profilPicture ? (
                                <img className="h-10 w-10 rounded-full" src={player.profilPicture} alt={`${player.firstName} ${player.lastName}`} />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {player.firstName} {player.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {player.email}
                              </div>
                              <div className="text-xs text-gray-500">
                                Né le {formatDate(player.dateOfBirth)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.licenseNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.stats.matchesPlayed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.stats.goalsScored}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.stats.assists}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-1">
                            {player.stats.yellowCards}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {player.stats.redCards}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/dashboard/players/${player.id}`}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Profil
                          </Link>
                          {canManageTeam && (
                            <Link
                              href={`/dashboard/coach/players/edit/${player.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Modifier
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Matches de l'équipe
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Calendrier des matches prévus et résultats des matches passés.
            </p>
          </div>
          <div className="border-t border-gray-200">
            {/* Ici, vous pouvez ajouter le tableau des matches de l'équipe, 
                similaire à celui que nous avons créé pour les détails de la compétition */}
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Données en cours de chargement</h3>
              <p className="mt-1 text-sm text-gray-500">
                Les matches de cette équipe seront bientôt disponibles.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'competitions' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Compétitions de l'équipe
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Liste des compétitions auxquelles l'équipe participe.
            </p>
          </div>
          <div className="border-t border-gray-200">
            {team.competitions.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune compétition</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Cette équipe ne participe à aucune compétition pour le moment.
                </p>
                {canManageTeam && (
                  <div className="mt-6">
                    <Link
                      href="/dashboard/competitions"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Explorer les compétitions
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {team.competitions.map(competition => (
                  <li key={competition.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{competition.name}</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          Statut: {competition.status}
                        </p>
                      </div>
                      <Link 
                        href={`/dashboard/competitions/${competition.id}`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Voir la compétition
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}