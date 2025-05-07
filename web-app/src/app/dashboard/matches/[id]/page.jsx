"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/component/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/component/ui/Tabs';
import Button from '@/component/ui/Button';
import Badge from '@/component/ui/Badge';
import Alert from '@/component/ui/Alert';
import { useAuth } from '@/hooks/useAuth';

export default function MatchDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [scoringOpen, setScoringOpen] = useState(false);
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour charger les données du match
    const fetchMatchData = async () => {
      setLoading(true);
      try {
        // Simuler une requête API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data pour ConsolidatedMatchDTO
        const mockConsolidatedMatch = {
          id: parseInt(id),
          title: "Quart de finale - Coupe Régionale 2025",
          description: "Match de quart de finale de la Coupe Régionale 2025",
          competitionId: 2,
          competitionName: "Coupe Régionale 2025",
          matchDateTime: "2025-05-15T15:00:00Z",
          location: "Stade Municipal",
          status: "COMPLETED", // SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED, POSTPONED
          homeScore: 2,
          awayScore: 1,
          
          // Feuilles de match par équipe
          homeTeamSheet: {
            id: 101,
            matchId: parseInt(id),
            teamId: 1,
            status: "VALIDATED", // ONGOING, SUBMITTED, VALIDATED, UNVALIDATED
            submittedAt: "2025-05-15T14:30:00Z",
            validatedAt: "2025-05-15T18:15:00Z",
            validatedBy: "referee123",
            comments: "Équipe au complet, match sans incident majeur",
            playerParticipations: [
              {
                id: 1001,
                matchSheetId: 101,
                playerId: 10,
                playerName: "Martin Dubois",
                shirtNumber: 9,
                playerStatus: "STARTER", // STARTER, SUBSTITUTE, ABSENT, INJURED
                position: "STRIKER",
                goalsScored: 2,
                yellowCards: 0,
                redCards: 0,
                minutesPlayed: 90,
                substitutionInTime: null,
                substitutionOutTime: null,
                positionPlayed: "STRIKER",
                createdAt: "2025-05-14T10:00:00Z",
                updatedAt: "2025-05-15T18:00:00Z"
              },
              {
                id: 1002,
                matchSheetId: 101,
                playerId: 11,
                playerName: "Lucas Petit",
                shirtNumber: 10,
                playerStatus: "STARTER",
                position: "MIDFIELDER",
                goalsScored: 0,
                yellowCards: 1,
                redCards: 0,
                minutesPlayed: 75,
                substitutionInTime: null,
                substitutionOutTime: 75,
                positionPlayed: "MIDFIELDER",
                createdAt: "2025-05-14T10:00:00Z",
                updatedAt: "2025-05-15T18:00:00Z"
              },
              {
                id: 1003,
                matchSheetId: 101,
                playerId: 12,
                playerName: "Jean Lefort",
                shirtNumber: 5,
                playerStatus: "STARTER",
                position: "DEFENDER",
                goalsScored: 0,
                yellowCards: 0,
                redCards: 0,
                minutesPlayed: 90,
                substitutionInTime: null,
                substitutionOutTime: null,
                positionPlayed: "DEFENDER",
                createdAt: "2025-05-14T10:00:00Z",
                updatedAt: "2025-05-15T18:00:00Z"
              },
              {
                id: 1004,
                matchSheetId: 101,
                playerId: 13,
                playerName: "Simon Gautier",
                shirtNumber: 1,
                playerStatus: "STARTER",
                position: "GOALKEEPER",
                goalsScored: 0,
                yellowCards: 0,
                redCards: 0,
                minutesPlayed: 90,
                substitutionInTime: null,
                substitutionOutTime: null,
                positionPlayed: "GOALKEEPER",
                createdAt: "2025-05-14T10:00:00Z",
                updatedAt: "2025-05-15T18:00:00Z"
              },
              {
                id: 1005,
                matchSheetId: 101,
                playerId: 14,
                playerName: "David Blanc",
                shirtNumber: 6,
                playerStatus: "SUBSTITUTE",
                position: "MIDFIELDER",
                goalsScored: 0,
                yellowCards: 0,
                redCards: 0,
                minutesPlayed: 15,
                substitutionInTime: 75,
                substitutionOutTime: null,
                positionPlayed: "MIDFIELDER",
                createdAt: "2025-05-14T10:00:00Z",
                updatedAt: "2025-05-15T18:00:00Z"
              }
            ]
          },
          
          awayTeamSheet: {
            id: 102,
            matchId: parseInt(id),
            teamId: 2,
            status: "VALIDATED",
            submittedAt: "2025-05-15T14:25:00Z",
            validatedAt: "2025-05-15T18:15:00Z",
            validatedBy: "referee123",
            comments: "Équipe réduite en fin de match suite à carton rouge",
            playerParticipations: [
              {
                id: 2001,
                matchSheetId: 102,
                playerId: 20,
                playerName: "Thomas Wilson",
                shirtNumber: 11,
                playerStatus: "STARTER",
                position: "STRIKER",
                goalsScored: 1,
                yellowCards: 0,
                redCards: 0,
                minutesPlayed: 90,
                substitutionInTime: null,
                substitutionOutTime: null,
                positionPlayed: "STRIKER",
                createdAt: "2025-05-14T11:00:00Z",
                updatedAt: "2025-05-15T18:00:00Z"
              },
              {
                id: 2002,
                matchSheetId: 102,
                playerId: 21,
                playerName: "Alex Johnson",
                shirtNumber: 8,
                playerStatus: "STARTER",
                position: "MIDFIELDER",
                goalsScored: 0,
                yellowCards: 1,
                redCards: 0,
                minutesPlayed: 90,
                substitutionInTime: null,
                substitutionOutTime: null,
                positionPlayed: "MIDFIELDER",
                createdAt: "2025-05-14T11:00:00Z",
                updatedAt: "2025-05-15T18:00:00Z"
              },
              {
                id: 2003,
                matchSheetId: 102,
                playerId: 22,
                playerName: "Pablo Martinez",
                shirtNumber: 4,
                playerStatus: "STARTER",
                position: "DEFENDER",
                goalsScored: 0,
                yellowCards: 0,
                redCards: 1,
                minutesPlayed: 85,
                substitutionInTime: null,
                substitutionOutTime: 85,
                positionPlayed: "DEFENDER",
                createdAt: "2025-05-14T11:00:00Z",
                updatedAt: "2025-05-15T18:00:00Z"
              }
            ]
          },
          
          // Informations sur les équipes
          homeTeam: {
            id: 1,
            name: "FC Metropolis",
            logo: "/team-logos/fc-metropolis.png",
            coachId: 101,
            coachName: "Pierre Dupont"
          },
          awayTeam: {
            id: 2,
            name: "Athletico United",
            logo: "/team-logos/athletico-united.png",
            coachId: 102,
            coachName: "Jacques Martin"
          },
          
          createdAt: "2025-04-01T10:00:00Z",
          updatedAt: "2025-05-15T18:20:00Z",
          
          // Informations supplémentaires pour l'affichage
          referee: "Jean Dupont",
          round: "Quart de finale",
          attendance: 2500,
          
          // Statistiques du match générées à partir des feuilles de match
          stats: {
            possession: { home: 58, away: 42 },
            shots: { home: 15, away: 8 },
            shotsOnTarget: { home: 7, away: 3 },
            corners: { home: 6, away: 2 },
            fouls: { home: 7, away: 12 },
            yellowCards: { home: 1, away: 1 },
            redCards: { home: 0, away: 1 },
          }
        };

        setMatch(mockConsolidatedMatch);
      } catch (err) {
        console.error("Erreur lors du chargement des données du match:", err);
        setError("Impossible de charger les détails du match. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [id]);

  // Générer les événements à partir des participations de joueurs
  const generateEvents = () => {
    if (!match) return [];
    
    const events = [];
    let eventId = 1;
    
    // Buts de l'équipe à domicile
    if (match.homeTeamSheet && match.homeTeamSheet.playerParticipations) {
      match.homeTeamSheet.playerParticipations.forEach(player => {
        for (let i = 0; i < player.goalsScored; i++) {
          // Générer un temps aléatoire pour chaque but (pour la démo)
          const minute = Math.floor(Math.random() * 90) + 1;
          events.push({
            id: eventId++,
            time: `${minute}`,
            type: 'goal',
            team: 'home',
            player: player.playerName,
            assist: null
          });
        }
        
        // Ajouter les cartons jaunes
        if (player.yellowCards > 0) {
          const minute = Math.floor(Math.random() * 90) + 1;
          events.push({
            id: eventId++,
            time: `${minute}`,
            type: 'yellowCard',
            team: 'home',
            player: player.playerName
          });
        }
        
        // Ajouter les cartons rouges
        if (player.redCards > 0) {
          const minute = Math.floor(Math.random() * 90) + 1;
          events.push({
            id: eventId++,
            time: `${minute}`,
            type: 'redCard',
            team: 'home',
            player: player.playerName
          });
        }
        
        // Ajouter les remplacements
        if (player.substitutionInTime) {
          events.push({
            id: eventId++,
            time: `${player.substitutionInTime}`,
            type: 'substitutionIn',
            team: 'home',
            player: player.playerName
          });
        }
        
        if (player.substitutionOutTime) {
          events.push({
            id: eventId++,
            time: `${player.substitutionOutTime}`,
            type: 'substitutionOut',
            team: 'home',
            player: player.playerName
          });
        }
      });
    }
    
    // Buts de l'équipe à l'extérieur
    if (match.awayTeamSheet && match.awayTeamSheet.playerParticipations) {
      match.awayTeamSheet.playerParticipations.forEach(player => {
        for (let i = 0; i < player.goalsScored; i++) {
          const minute = Math.floor(Math.random() * 90) + 1;
          events.push({
            id: eventId++,
            time: `${minute}`,
            type: 'goal',
            team: 'away',
            player: player.playerName,
            assist: null
          });
        }
        
        // Ajouter les cartons jaunes
        if (player.yellowCards > 0) {
          const minute = Math.floor(Math.random() * 90) + 1;
          events.push({
            id: eventId++,
            time: `${minute}`,
            type: 'yellowCard',
            team: 'away',
            player: player.playerName
          });
        }
        
        // Ajouter les cartons rouges
        if (player.redCards > 0) {
          const minute = Math.floor(Math.random() * 90) + 1;
          events.push({
            id: eventId++,
            time: `${minute}`,
            type: 'redCard',
            team: 'away',
            player: player.playerName
          });
        }
        
        // Ajouter les remplacements
        if (player.substitutionInTime) {
          events.push({
            id: eventId++,
            time: `${player.substitutionInTime}`,
            type: 'substitutionIn',
            team: 'away',
            player: player.playerName
          });
        }
        
        if (player.substitutionOutTime) {
          events.push({
            id: eventId++,
            time: `${player.substitutionOutTime}`,
            type: 'substitutionOut',
            team: 'away',
            player: player.playerName
          });
        }
      });
    }
    
    // Trier les événements par temps
    return events.sort((a, b) => {
      const timeA = parseInt(a.time.split('+')[0]);
      const timeB = parseInt(b.time.split('+')[0]);
      return timeA - timeB;
    });
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return <Badge variant="outline">À venir</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="warning">En cours</Badge>;
      case 'COMPLETED':
        return <Badge variant="success">Terminé</Badge>;
      case 'CANCELLED':
        return <Badge variant="error">Annulé</Badge>;
      case 'POSTPONED':
        return <Badge variant="error">Reporté</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMatchSheetStatusBadge = (status) => {
    if (!status) return null;
    
    switch (status) {
      case 'ONGOING':
        return <Badge variant="warning">En cours</Badge>;
      case 'SUBMITTED':
        return <Badge variant="info">Soumise</Badge>;
      case 'VALIDATED':
        return <Badge variant="success">Validée</Badge>;
      case 'UNVALIDATED':
        return <Badge variant="error">Rejetée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const [scoreForm, setScoreForm] = useState({
    homeScore: 0,
    awayScore: 0,
    events: [],
  });

  useEffect(() => {
    if (match) {
      setScoreForm({
        homeScore: match.homeScore || 0,
        awayScore: match.awayScore || 0,
        events: generateEvents(),
      });
    }
  }, [match]);

  const handleSubmitScore = (e) => {
    e.preventDefault();
    // Here you would call an API to update the match results
    console.log('Submitting score:', scoreForm);
    alert('Score enregistré avec succès!');
    setScoringOpen(false);
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <Alert variant="error">
          <h3 className="font-bold">Erreur</h3>
          <p>{error}</p>
          <Button className="mt-4" onClick={() => router.back()}>Retour</Button>
        </Alert>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="container py-8">
        <Alert variant="warning">
          <h3 className="font-bold">Match introuvable</h3>
          <p>Les détails de ce match ne sont pas disponibles.</p>
          <Button className="mt-4" onClick={() => router.back()}>Retour</Button>
        </Alert>
      </div>
    );
  }

  // Check if user has permission to enter match results
  // Administrateurs n'ont plus la possibilité de modifier les scores
  const canEditMatchResults = user && 
    (user.role === 'ORGANIZER');

  return (
    <div className="container py-8">
      {/* Match Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {match.homeTeam.name} vs {match.awayTeam.name}
          </h1>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-gray-600">{match.competitionName}</span>
            <span>•</span>
            <span className="text-gray-600">{match.round}</span>
            <span>•</span>
            {getStatusBadge(match.status)}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
          >
            Retour
          </Button>
          
          {canEditMatchResults && match.status !== 'CANCELLED' && (
            <Button 
              variant="primary"
              onClick={() => setScoringOpen(!scoringOpen)}
            >
              {scoringOpen ? 'Annuler' : match.status === 'COMPLETED' ? 'Modifier le score' : 'Saisir le score'}
            </Button>
          )}
        </div>
      </div>

      {/* Score Entry Form */}
      {scoringOpen && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Saisie du score et des événements</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitScore} className="space-y-4">
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="font-bold text-lg">{match.homeTeam.name}</div>
                  <input 
                    type="number" 
                    min="0" 
                    className="mt-2 border rounded p-2 w-16 text-center text-xl" 
                    value={scoreForm.homeScore}
                    onChange={(e) => setScoreForm({...scoreForm, homeScore: parseInt(e.target.value, 10)})}
                  />
                </div>
                
                <div className="text-xl font-bold">-</div>
                
                <div className="text-center">
                  <div className="font-bold text-lg">{match.awayTeam.name}</div>
                  <input 
                    type="number" 
                    min="0" 
                    className="mt-2 border rounded p-2 w-16 text-center text-xl" 
                    value={scoreForm.awayScore}
                    onChange={(e) => setScoreForm({...scoreForm, awayScore: parseInt(e.target.value, 10)})}
                  />
                </div>
              </div>
              
              {/* Ici, vous pourriez ajouter des composants pour gérer les événements comme les buts, cartes, etc. */}
              
              <div className="flex justify-end space-x-4 mt-4">
                <Button type="button" variant="outline" onClick={() => setScoringOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" variant="primary">
                  Enregistrer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Score Display */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-end md:w-2/5">
              <div className="text-xl font-bold">{match.homeTeam.name}</div>
              <div className="text-sm text-gray-500 mt-1">Coach: {match.homeTeam.coachName}</div>
              {match.homeTeam.logo && (
                <img 
                  src={match.homeTeam.logo} 
                  alt={match.homeTeam.name} 
                  className="h-16 w-16 object-contain mt-2"
                />
              )}
              {match.homeTeamSheet && (
                <div className="mt-2">
                  {getMatchSheetStatusBadge(match.homeTeamSheet.status)}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center my-4 md:my-0 md:w-1/5">
              <div className="text-3xl font-bold">
                {match.homeScore !== null ? match.homeScore : '-'}
              </div>
              <div className="mx-3 text-3xl font-bold">:</div>
              <div className="text-3xl font-bold">
                {match.awayScore !== null ? match.awayScore : '-'}
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-start md:w-2/5">
              <div className="text-xl font-bold">{match.awayTeam.name}</div>
              <div className="text-sm text-gray-500 mt-1">Coach: {match.awayTeam.coachName}</div>
              {match.awayTeam.logo && (
                <img 
                  src={match.awayTeam.logo} 
                  alt={match.awayTeam.name} 
                  className="h-16 w-16 object-contain mt-2"
                />
              )}
              {match.awayTeamSheet && (
                <div className="mt-2">
                  {getMatchSheetStatusBadge(match.awayTeamSheet.status)}
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center mt-4">
            <div className="text-gray-600">
              {formatDate(match.matchDateTime)} • {match.location}
            </div>
            {match.referee && (
              <div className="text-gray-500 text-sm mt-1">
                Arbitre: {match.referee}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Match Details Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start border-b mb-6">
          <TabsTrigger value="overview">Résumé</TabsTrigger>
          <TabsTrigger value="compositions">Compositions</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Basic match information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Compétition</dt>
                  <dd className="mt-1 text-sm text-gray-900">{match.competitionName}</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Journée/Phase</dt>
                  <dd className="mt-1 text-sm text-gray-900">{match.round}</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date et heure</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(match.matchDateTime)}</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Lieu</dt>
                  <dd className="mt-1 text-sm text-gray-900">{match.location}</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Arbitre</dt>
                  <dd className="mt-1 text-sm text-gray-900">{match.referee || 'Non assigné'}</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Affluence</dt>
                  <dd className="mt-1 text-sm text-gray-900">{match.attendance ? `${match.attendance} spectateurs` : 'Non renseigné'}</dd>
                </div>
                {match.description && (
                  <div className="col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="mt-1 text-sm text-gray-900">{match.description}</dd>
                  </div>
                )}
                {match.homeTeamSheet && match.homeTeamSheet.comments && (
                  <div className="col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Commentaires feuille de match {match.homeTeam.name}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{match.homeTeamSheet.comments}</dd>
                  </div>
                )}
                {match.awayTeamSheet && match.awayTeamSheet.comments && (
                  <div className="col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Commentaires feuille de match {match.awayTeam.name}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{match.awayTeamSheet.comments}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>
          
          {/* Quick summary of events */}
          <Card>
            <CardHeader>
              <CardTitle>Résumé des événements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreForm.events && scoreForm.events.filter(e => e.type === 'goal').length > 0 ? (
                  scoreForm.events.filter(e => e.type === 'goal').map((event) => (
                    <div key={event.id} className="flex items-center">
                      <div className="font-mono w-12">{event.time}'</div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="material-icons text-yellow-500 mr-2">sports_soccer</span>
                          <span className="font-medium">{event.player}</span>
                          {event.assist && (
                            <span className="text-gray-600 ml-1">(assist: {event.assist})</span>
                          )}
                        </div>
                      </div>
                      <div className="w-24 text-right">
                        {event.team === 'home' ? match.homeTeam.name : match.awayTeam.name}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 italic">Aucun but enregistré pour ce match</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compositions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Composition de l'équipe à domicile */}
            <Card>
              <CardHeader>
                <CardTitle>Composition de {match.homeTeam.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Coach: {match.homeTeam.coachName}</span>
                  {match.homeTeamSheet && (
                    <span>{getMatchSheetStatusBadge(match.homeTeamSheet.status)}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {match.homeTeamSheet && match.homeTeamSheet.playerParticipations && match.homeTeamSheet.playerParticipations.length > 0 ? (
                  <div className="space-y-6">
                    {/* Titulaires */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Titulaires</h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joueur</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buts</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CJ</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {match.homeTeamSheet.playerParticipations
                              .filter(player => player.playerStatus === 'STARTER')
                              .map((player) => (
                                <tr key={player.id}>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.shirtNumber}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{player.playerName}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{player.position}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.goalsScored}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.yellowCards}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.redCards}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {player.substitutionOutTime ? `${player.substitutionOutTime}'` : player.minutesPlayed}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {/* Remplaçants */}
                    {match.homeTeamSheet.playerParticipations.some(player => player.playerStatus === 'SUBSTITUTE') && (
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Remplaçants</h3>
                        <div className="border rounded-md overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joueur</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buts</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CJ</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrée</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {match.homeTeamSheet.playerParticipations
                                .filter(player => player.playerStatus === 'SUBSTITUTE')
                                .map((player) => (
                                  <tr key={player.id}>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.shirtNumber}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{player.playerName}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{player.position}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.goalsScored}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.yellowCards}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.redCards}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {player.substitutionInTime ? `${player.substitutionInTime}'` : '-'}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    
                    {/* Joueurs absents/blessés */}
                    {match.homeTeamSheet.playerParticipations.some(player => 
                      player.playerStatus === 'ABSENT' || player.playerStatus === 'INJURED'
                    ) && (
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Absents / Blessés</h3>
                        <div className="border rounded-md overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joueur</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {match.homeTeamSheet.playerParticipations
                                .filter(player => player.playerStatus === 'ABSENT' || player.playerStatus === 'INJURED')
                                .map((player) => (
                                  <tr key={player.id}>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.shirtNumber}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{player.playerName}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{player.position}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {player.playerStatus === 'INJURED' ? 'Blessé' : 'Absent'}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Alert variant="info">La composition de {match.homeTeam.name} n'est pas disponible.</Alert>
                )}
              </CardContent>
            </Card>

            {/* Composition de l'équipe visiteur */}
            <Card>
              <CardHeader>
                <CardTitle>Composition de {match.awayTeam.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Coach: {match.awayTeam.coachName}</span>
                  {match.awayTeamSheet && (
                    <span>{getMatchSheetStatusBadge(match.awayTeamSheet.status)}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {match.awayTeamSheet && match.awayTeamSheet.playerParticipations && match.awayTeamSheet.playerParticipations.length > 0 ? (
                  <div className="space-y-6">
                    {/* Titulaires */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Titulaires</h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joueur</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buts</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CJ</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {match.awayTeamSheet.playerParticipations
                              .filter(player => player.playerStatus === 'STARTER')
                              .map((player) => (
                                <tr key={player.id}>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.shirtNumber}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{player.playerName}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{player.position}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.goalsScored}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.yellowCards}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.redCards}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {player.substitutionOutTime ? `${player.substitutionOutTime}'` : player.minutesPlayed}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {/* Remplaçants */}
                    {match.awayTeamSheet.playerParticipations.some(player => player.playerStatus === 'SUBSTITUTE') && (
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Remplaçants</h3>
                        <div className="border rounded-md overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joueur</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buts</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CJ</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrée</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {match.awayTeamSheet.playerParticipations
                                .filter(player => player.playerStatus === 'SUBSTITUTE')
                                .map((player) => (
                                  <tr key={player.id}>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.shirtNumber}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{player.playerName}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{player.position}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.goalsScored}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.yellowCards}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.redCards}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {player.substitutionInTime ? `${player.substitutionInTime}'` : '-'}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    
                    {/* Joueurs absents/blessés */}
                    {match.awayTeamSheet.playerParticipations.some(player => 
                      player.playerStatus === 'ABSENT' || player.playerStatus === 'INJURED'
                    ) && (
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Absents / Blessés</h3>
                        <div className="border rounded-md overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joueur</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {match.awayTeamSheet.playerParticipations
                                .filter(player => player.playerStatus === 'ABSENT' || player.playerStatus === 'INJURED')
                                .map((player) => (
                                  <tr key={player.id}>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{player.shirtNumber}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{player.playerName}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{player.position}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {player.playerStatus === 'INJURED' ? 'Blessé' : 'Absent'}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Alert variant="info">La composition de {match.awayTeam.name} n'est pas disponible.</Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chronologie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreForm.events && scoreForm.events.length > 0 ? (
                  scoreForm.events.map((event) => (
                    <div key={event.id} className="flex items-center p-2 border-b last:border-0">
                      <div className="font-mono w-12">{event.time}'</div>
                      <div className="flex-1">
                        {event.type === 'goal' && (
                          <div className="flex items-center">
                            <span className="material-icons text-yellow-500 mr-2">sports_soccer</span>
                            <span className="font-medium">{event.player}</span>
                            {event.assist && (
                              <span className="text-gray-600 ml-1">(assist: {event.assist})</span>
                            )}
                          </div>
                        )}
                        {event.type === 'yellowCard' && (
                          <div className="flex items-center">
                            <div className="bg-yellow-400 w-3 h-4 mr-2"></div>
                            <span className="font-medium">{event.player}</span>
                          </div>
                        )}
                        {event.type === 'redCard' && (
                          <div className="flex items-center">
                            <div className="bg-red-600 w-3 h-4 mr-2"></div>
                            <span className="font-medium">{event.player}</span>
                          </div>
                        )}
                        {event.type === 'substitutionIn' && (
                          <div className="flex items-center">
                            <span className="text-green-500 mr-2">↑</span>
                            <span className="font-medium">{event.player}</span>
                            <span className="text-gray-600 ml-1">entre en jeu</span>
                          </div>
                        )}
                        {event.type === 'substitutionOut' && (
                          <div className="flex items-center">
                            <span className="text-red-500 mr-2">↓</span>
                            <span className="font-medium">{event.player}</span>
                            <span className="text-gray-600 ml-1">sort du jeu</span>
                          </div>
                        )}
                      </div>
                      <div className="w-24 text-right">
                        {event.team === 'home' ? match.homeTeam.name : match.awayTeam.name}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 italic">Aucun événement enregistré</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques du match</CardTitle>
            </CardHeader>
            <CardContent>
              {match.stats ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="text-right w-20 font-medium">{match.stats.possession.home}%</div>
                    <div className="flex-1 mx-4">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${match.stats.possession.home}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-20 font-medium">{match.stats.possession.away}%</div>
                    <div className="w-24 text-gray-600">Possession</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-right w-20 font-medium">{match.stats.shots.home}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${(match.stats.shots.home / (match.stats.shots.home + match.stats.shots.away)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-20 font-medium">{match.stats.shots.away}</div>
                    <div className="w-24 text-gray-600">Tirs</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-right w-20 font-medium">{match.stats.shotsOnTarget.home}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${(match.stats.shotsOnTarget.home / (match.stats.shotsOnTarget.home + match.stats.shotsOnTarget.away)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-20 font-medium">{match.stats.shotsOnTarget.away}</div>
                    <div className="w-24 text-gray-600">Tirs cadrés</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-right w-20 font-medium">{match.stats.corners.home}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${(match.stats.corners.home / (match.stats.corners.home + match.stats.corners.away)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-20 font-medium">{match.stats.corners.away}</div>
                    <div className="w-24 text-gray-600">Corners</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-right w-20 font-medium">{match.stats.fouls.home}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${(match.stats.fouls.home / (match.stats.fouls.home + match.stats.fouls.away)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-20 font-medium">{match.stats.fouls.away}</div>
                    <div className="w-24 text-gray-600">Fautes</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-right w-20 font-medium">{match.stats.yellowCards.home}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full" 
                          style={{ width: `${(match.stats.yellowCards.home / (match.stats.yellowCards.home + match.stats.yellowCards.away || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-20 font-medium">{match.stats.yellowCards.away}</div>
                    <div className="w-24 text-gray-600">Cartons jaunes</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-right w-20 font-medium">{match.stats.redCards.home}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-600 rounded-full" 
                          style={{ width: `${(match.stats.redCards.home / (match.stats.redCards.home + match.stats.redCards.away || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-20 font-medium">{match.stats.redCards.away}</div>
                    <div className="w-24 text-gray-600">Cartons rouges</div>
                  </div>
                </div>
              ) : (
                <Alert variant="info">Les statistiques ne sont pas disponibles pour ce match.</Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}