'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/component/ui/Card';
import Button from '@/component/ui/Button';
import Badge from '@/component/ui/Badge';

export default function PlayersPage() {
  const router = useRouter();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        // Simuler un délai réseau (remplacer par appel API réel)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données mockées pour la démo
        const playersData = [
          {
            id: 1,
            email: "mbouchard@example.com",
            userName: "mbouchard10",
            firstName: "Martin",
            lastName: "Bouchard",
            position: "STRIKER",
            licenseNumber: "FFF-12345-J",
            status: "ACTIVE",
            teamId: 1,
            teamName: "FC Barcelona U19"
          },
          {
            id: 2,
            email: "ldupont@example.com",
            userName: "ldupont08",
            firstName: "Lucas",
            lastName: "Dupont",
            position: "MIDFIELDER",
            licenseNumber: "FFF-12346-J",
            status: "ACTIVE",
            teamId: 1,
            teamName: "FC Barcelona U19"
          },
          {
            id: 3,
            email: "jmartin@example.com",
            userName: "jmartin01",
            firstName: "Jean",
            lastName: "Martin",
            position: "DEFENDER",
            licenseNumber: "FFF-12347-J",
            status: "ACTIVE",
            teamId: 1,
            teamName: "FC Barcelona U19"
          },
          {
            id: 4,
            email: "sgautier@example.com",
            userName: "sgautier01",
            firstName: "Simon",
            lastName: "Gautier",
            position: "GOALKEEPER",
            licenseNumber: "FFF-12348-J",
            status: "ACTIVE",
            teamId: 1,
            teamName: "FC Barcelona U19"
          },
          {
            id: 5,
            email: "trichards@example.com",
            userName: "trichards11",
            firstName: "Thomas",
            lastName: "Richards",
            position: "STRIKER",
            licenseNumber: "FFF-23451-J",
            status: "ACTIVE",
            teamId: 2,
            teamName: "FC Barcelona U17"
          },
          {
            id: 6,
            email: "psmith@example.com",
            userName: "psmith09",
            firstName: "Paul",
            lastName: "Smith",
            position: "MIDFIELDER",
            licenseNumber: "FFF-23452-J",
            status: "INJURED",
            teamId: 2,
            teamName: "FC Barcelona U17"
          },
          {
            id: 7,
            email: "jdoe@example.com",
            userName: "jdoe04",
            firstName: "John",
            lastName: "Doe",
            position: "DEFENDER",
            licenseNumber: "FFF-23453-J",
            status: "SUSPENDED",
            teamId: 2,
            teamName: "FC Barcelona U17"
          },
          {
            id: 8,
            email: "bwilliams@example.com",
            userName: "bwilliams01",
            firstName: "Ben",
            lastName: "Williams",
            position: "GOALKEEPER",
            licenseNumber: "FFF-23454-J",
            status: "ACTIVE",
            teamId: 2,
            teamName: "FC Barcelona U17"
          }
        ];
        
        setPlayers(playersData);
        
        // Extraire les équipes uniques pour le filtre
        const uniqueTeams = [...new Set(playersData.map(player => player.teamName))];
        setTeams(uniqueTeams);
      } catch (error) {
        console.error('Erreur lors de la récupération des joueurs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Fonction pour formater la position du joueur
  const formatPosition = (position) => {
    switch (position) {
      case 'GOALKEEPER':
        return 'Gardien';
      case 'DEFENDER':
        return 'Défenseur';
      case 'MIDFIELDER':
        return 'Milieu';
      case 'STRIKER':
        return 'Attaquant';
      default:
        return position;
    }
  };

  // Fonction pour obtenir le badge du statut du joueur
  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success">Actif</Badge>;
      case 'INJURED':
        return <Badge variant="error">Blessé</Badge>;
      case 'SUSPENDED':
        return <Badge variant="warning">Suspendu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filtrer les joueurs en fonction des critères de recherche et des filtres
  const filteredPlayers = players.filter(player => {
    const matchesSearch = 
      player.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
    const matchesTeam = teamFilter === 'all' || player.teamName === teamFilter;
    
    return matchesSearch && matchesPosition && matchesTeam;
  });

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Joueurs</h1>
        <Button
          onClick={() => router.push('/dashboard/coach/players')}
          variant="primary"
        >
          Ajouter un joueur
        </Button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Rechercher
            </label>
            <input
              type="text"
              id="search"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nom, prénom, identifiant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="position-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <select
              id="position-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option value="all">Toutes les positions</option>
              <option value="GOALKEEPER">Gardien</option>
              <option value="DEFENDER">Défenseur</option>
              <option value="MIDFIELDER">Milieu</option>
              <option value="STRIKER">Attaquant</option>
            </select>
          </div>
          <div>
            <label htmlFor="team-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Équipe
            </label>
            <select
              id="team-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
            >
              <option value="all">Toutes les équipes</option>
              {teams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Liste des joueurs */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow animate-pulse">
              <div className="h-32 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredPlayers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun joueur trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            Essayez de modifier vos filtres ou d'ajouter de nouveaux joueurs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <Link key={player.id} href={`/dashboard/players/${player.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <div className="bg-blue-600 h-24 rounded-t-lg flex items-center justify-center">
                  <span className="text-white font-bold text-5xl">{player.firstName.charAt(0)}{player.lastName.charAt(0)}</span>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-1">
                    {player.firstName} {player.lastName}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="mr-2">
                      {getStatusBadge(player.status)}
                    </div>
                    <span className="text-sm text-gray-600">{formatPosition(player.position)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Équipe: {player.teamName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Licence: {player.licenseNumber}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}