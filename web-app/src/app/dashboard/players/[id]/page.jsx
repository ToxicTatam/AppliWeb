'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/component/ui/Card';
import Button from '@/component/ui/Button';
import Badge from '@/component/ui/Badge';
import Alert from '@/component/ui/Alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/component/ui/Tabs';
import PlayerStatsDashboard from '@/component/ui/PlayerStatsDashboard';

export default function PlayerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [stats, setStats] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);
  const [performance, setPerformance] = useState(null);
  const [showAllStats, setShowAllStats] = useState(false);

  useEffect(() => {
    const fetchPlayerData = async () => {
      setLoading(true);
      try {
        // Simuler un délai réseau (remplacer par appel API réel)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données mockées pour la démo
        const playerData = {
          id: parseInt(id),
          email: "mbouchard@example.com",
          userName: "mbouchard10",
          firstName: "Martin",
          lastName: "Bouchard",
          position: "STRIKER",
          licenseNumber: "FFF-12345-J",
          status: "ACTIVE",
          teamId: 1,
          teamName: "FC Barcelona U19",
          birthDate: "2005-05-15",
          age: 20,
          height: 183,
          weight: 75,
          nationality: "Français",
          profilePicture: null,
          phoneNumber: "+33 6 12 34 56 78",
          address: "10 rue des Sportifs, 75001 Paris",
          emergencyContact: "Pierre Bouchard (+33 6 98 76 54 32)",
          joinedDate: "2022-08-01"
        };
        
        const playerStats = {
          totalMatches: 28,
          totalGoals: 17,
          totalAssists: 8,
          yellowCards: 3,
          redCards: 0,
          minutesPlayed: 2230,
          averageRating: 7.8,
          seasonStats: [
            { season: "2023-2024", matches: 15, goals: 9, assists: 5, yellowCards: 2, redCards: 0, minutesPlayed: 1230 },
            { season: "2022-2023", matches: 13, goals: 8, assists: 3, yellowCards: 1, redCards: 0, minutesPlayed: 1000 }
          ]
        };

        // Création d'un PlayerPerformanceDTO basé sur les stats existantes
        const performanceData = {
          id: parseInt(id),
          playerId: parseInt(id),
          playerName: `${playerData.firstName} ${playerData.lastName}`,
          competitionId: 1,
          competitionName: "Toutes compétitions",
          
          // Stats communes
          totalMatches: playerStats.totalMatches,
          totalMinutesPlayed: playerStats.minutesPlayed,
          totalFouls: 24, // Exemple de donnée mockée
          totalYellowCards: playerStats.yellowCards,
          totalRedCards: playerStats.redCards,
          
          // Stats offensives
          totalGoals: playerStats.totalGoals,
          totalAssists: playerStats.totalAssists,
          totalShots: 58, // Données mockées
          shotsOnTarget: 32,
          penaltiesScored: 3,
          penaltiesTaken: 4,
          successfulDribbles: 43,
          
          // Stats milieu
          passAccuracy: 78.5,
          successfulPasses: 854,
          ballsRecovered: 112,
          successfulCrosses: 27,
          
          // Stats défensives
          interceptions: 64,
          ballsLost: 79,
          
          // Stats gardien (null pour les joueurs de champ)
          savesMade: null,
          cleanSheets: null,
          penaltiesSaved: null,
          goalsConceded: null,
          savePercentage: null,
          
          rating: playerStats.averageRating,
          notes: "Joueur en progression constante cette saison.",
          
          performanceType: "global",
          matchId: null,
          matchTitle: null
        };
        
        const matchHistoryData = [
          {
            id: 101,
            date: "2025-05-01",
            competition: "Championnat National U19",
            opponent: "Real Madrid U19",
            result: "2-1",
            goals: 1,
            assists: 1,
            yellowCards: 0,
            redCards: 0,
            minutesPlayed: 90,
            rating: 8.5
          },
          {
            id: 102,
            date: "2025-04-24",
            competition: "Coupe Nationale U19",
            opponent: "Sevilla U19",
            result: "3-0",
            goals: 2,
            assists: 0,
            yellowCards: 0,
            redCards: 0,
            minutesPlayed: 80,
            rating: 9.0
          },
          {
            id: 103,
            date: "2025-04-17",
            competition: "Championnat National U19",
            opponent: "Atletico Madrid U19",
            result: "1-1",
            goals: 0,
            assists: 1,
            yellowCards: 1,
            redCards: 0,
            minutesPlayed: 90,
            rating: 7.5
          },
        ];
        
        setPlayer(playerData);
        setStats(playerStats);
        setMatchHistory(matchHistoryData);
        setPerformance(performanceData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du joueur:', error);
        setError("Impossible de charger les informations du joueur. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlayerData();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

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

  if (loading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="container py-8">
        <Alert variant="error">
          <h3 className="font-bold">Erreur</h3>
          <p>{error || "Joueur non trouvé"}</p>
          <Button className="mt-4" onClick={() => router.back()}>Retour</Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          Retour
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => router.push(`/dashboard/players/${player.id}/edit`)}>
            Modifier
          </Button>
        </div>
      </div>

      {/* Profil principal du joueur */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-600 h-32 flex items-center justify-center">
          {player.profilePicture ? (
            <img 
              src={player.profilePicture}
              alt={`${player.firstName} ${player.lastName}`}
              className="h-24 w-24 rounded-full border-4 border-white object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full border-4 border-white bg-blue-400 flex items-center justify-center">
              <span className="text-white font-bold text-4xl">
                {player.firstName.charAt(0)}{player.lastName.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="px-6 py-4 flex flex-col md:flex-row">
          <div className="flex-1 mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-900">
              {player.firstName} {player.lastName}
            </h1>
            <div className="flex items-center mt-2">
              {getStatusBadge(player.status)}
              <span className="ml-2 text-gray-600">{formatPosition(player.position)}</span>
            </div>
            <p className="text-gray-500 mt-2">Licence: {player.licenseNumber}</p>
          </div>
          <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200 md:pl-6 pt-4 md:pt-0">
            <div className="flex flex-col">
              <p className="text-gray-600">
                <span className="font-medium">Équipe:</span> {player.teamName}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Date de naissance:</span> {formatDate(player.birthDate)} ({player.age} ans)
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Nationalité:</span> {player.nationality}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">A rejoint le:</span> {formatDate(player.joinedDate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets pour les différentes sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-white rounded-lg mb-6 shadow-sm">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="matches">Historique des matchs</TabsTrigger>
        </TabsList>

        {/* Onglet Profil */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Coordonnées</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {player.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Téléphone:</span> {player.phoneNumber}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Adresse:</span> {player.address}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Contact d'urgence:</span> {player.emergencyContact}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Caractéristiques physiques</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Taille:</span> {player.height} cm
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Poids:</span> {player.weight} kg
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations de compte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Nom d'utilisateur:</span> {player.userName}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Identifiant joueur:</span> #{player.id}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Statistiques */}
        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Statistiques détaillées</CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setShowAllStats(!showAllStats)}
                size="sm"
              >
                {showAllStats ? "Affichage simplifié" : "Voir toutes les stats"}
              </Button>
            </CardHeader>
            <CardContent>
              {performance ? (
                <PlayerStatsDashboard 
                  performance={performance} 
                  showAllStats={showAllStats} 
                />
              ) : (
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistiques par saison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Saison
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Matchs
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Buts
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Passes déc.
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CJ
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CR
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Minutes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stats?.seasonStats?.map((season, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {season.season}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {season.matches}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {season.goals}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {season.assists}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {season.yellowCards}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {season.redCards}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {season.minutesPlayed}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Historique des Matchs */}
        <TabsContent value="matches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Derniers matchs joués</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Compétition
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Adversaire
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Résultat
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Buts
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Passes
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CJ/CR
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Minutes
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {matchHistory.map((match) => (
                      <tr key={match.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(match.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.competition}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {match.opponent}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                          {match.result}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.goals}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.assists}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.yellowCards}/{match.redCards}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.minutesPlayed}'
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            match.rating >= 8 ? 'bg-green-100 text-green-800' : 
                            match.rating >= 6 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {match.rating}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}