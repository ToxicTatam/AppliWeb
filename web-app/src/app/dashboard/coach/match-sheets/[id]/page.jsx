'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardContent } from '@/component/ui/Card';
import { Alert } from '@/component/ui/Alert';
import Button from '@/component/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/component/ui/Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/component/ui/Tabs';
import  Badge  from '@/component/ui/Badge';
import Link from 'next/link';

export default function MatchSheetDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [matchSheet, setMatchSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatchSheet = async () => {
      setLoading(true);
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées pour la feuille de match basées sur le DTO
        const matchSheetData = {
          id: parseInt(id),
          matchId: 101,
          matchTitle: "FC Barcelona U19 vs Real Madrid U19",
          teamId: 1,
          teamName: "FC Barcelona U19",
          opponentId: 3,
          opponentName: "Real Madrid U19",
          competitionId: 5,
          competitionName: "Championnat National 2025",
          venue: "Stade Municipal",
          status: "SUBMITTED", // DRAFT, SUBMITTED, VALIDATED, UNVALIDATED
          playerParticipations: [
            {
              id: 1,
              matchSheetId: parseInt(id),
              playerId: 1,
              playerName: "Marc-André ter Stegen",
              shirtNumber: 1,
              playerStatus: "STARTER", // STARTER, SUBSTITUTE, RESERVE, NOT_IN_SQUAD
              position: "GK",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 90,
              substitutionInTime: null,
              substitutionOutTime: null,
              positionPlayed: "GK",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 2,
              matchSheetId: parseInt(id),
              playerId: 2,
              playerName: "Sergiño Dest",
              shirtNumber: 2,
              playerStatus: "STARTER",
              position: "DEF",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 90,
              substitutionInTime: null,
              substitutionOutTime: null,
              positionPlayed: "RB",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 3,
              matchSheetId: parseInt(id),
              playerId: 3,
              playerName: "Gerard Piqué",
              shirtNumber: 3,
              playerStatus: "STARTER",
              position: "DEF",
              goalsScored: 0,
              yellowCards: 1,
              redCards: 0,
              minutesPlayed: 90,
              substitutionInTime: null,
              substitutionOutTime: null,
              positionPlayed: "CB",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 4,
              matchSheetId: parseInt(id),
              playerId: 4,
              playerName: "Ronald Araújo",
              shirtNumber: 4,
              playerStatus: "STARTER",
              position: "DEF",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 90,
              substitutionInTime: null,
              substitutionOutTime: null,
              positionPlayed: "CB",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 5,
              matchSheetId: parseInt(id),
              playerId: 5,
              playerName: "Jordi Alba",
              shirtNumber: 18,
              playerStatus: "STARTER",
              position: "DEF",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 90,
              substitutionInTime: null,
              substitutionOutTime: null,
              positionPlayed: "LB",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 6,
              matchSheetId: parseInt(id),
              playerId: 6,
              playerName: "Sergio Busquets",
              shirtNumber: 5,
              playerStatus: "STARTER",
              position: "MID",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 90,
              substitutionInTime: null,
              substitutionOutTime: null,
              positionPlayed: "CDM",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 7,
              matchSheetId: parseInt(id),
              playerId: 7,
              playerName: "Pedri",
              shirtNumber: 8,
              playerStatus: "STARTER",
              position: "MID",
              goalsScored: 1,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 85,
              substitutionInTime: null,
              substitutionOutTime: 85,
              positionPlayed: "CM",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 8,
              matchSheetId: parseInt(id),
              playerId: 8,
              playerName: "Frenkie de Jong",
              shirtNumber: 21,
              playerStatus: "STARTER",
              position: "MID",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 90,
              substitutionInTime: null,
              substitutionOutTime: null,
              positionPlayed: "CM",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 9,
              matchSheetId: parseInt(id),
              playerId: 9,
              playerName: "Ousmane Dembélé",
              shirtNumber: 7,
              playerStatus: "STARTER",
              position: "FWD",
              goalsScored: 1,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 75,
              substitutionInTime: null,
              substitutionOutTime: 75,
              positionPlayed: "RW",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 10,
              matchSheetId: parseInt(id),
              playerId: 10,
              playerName: "Memphis Depay",
              shirtNumber: 9,
              playerStatus: "STARTER",
              position: "FWD",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 68,
              substitutionInTime: null,
              substitutionOutTime: 68,
              positionPlayed: "ST",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 11,
              matchSheetId: parseInt(id),
              playerId: 11,
              playerName: "Ansu Fati",
              shirtNumber: 10,
              playerStatus: "STARTER",
              position: "FWD",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 90,
              substitutionInTime: null,
              substitutionOutTime: null,
              positionPlayed: "LW",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            // Remplaçants
            {
              id: 12,
              matchSheetId: parseInt(id),
              playerId: 12,
              playerName: "Neto",
              shirtNumber: 13,
              playerStatus: "SUBSTITUTE",
              position: "GK",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 0,
              substitutionInTime: null,
              substitutionOutTime: null,
              positionPlayed: "GK",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 13,
              matchSheetId: parseInt(id),
              playerId: 13,
              playerName: "Sergi Roberto",
              shirtNumber: 20,
              playerStatus: "SUBSTITUTE",
              position: "DEF",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 0,
              substitutionInTime: null,
              substitutionOutTime: null,
              positionPlayed: "RB",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 14,
              matchSheetId: parseInt(id),
              playerId: 15,
              playerName: "Riqui Puig",
              shirtNumber: 16,
              playerStatus: "SUBSTITUTE",
              position: "MID",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 5,
              substitutionInTime: 85,
              substitutionOutTime: null,
              positionPlayed: "CM",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 15,
              matchSheetId: parseInt(id),
              playerId: 16,
              playerName: "Yusuf Demir",
              shirtNumber: 11,
              playerStatus: "SUBSTITUTE",
              position: "FWD",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 15,
              substitutionInTime: 75,
              substitutionOutTime: null,
              positionPlayed: "RW",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 16,
              matchSheetId: parseInt(id),
              playerId: 18,
              playerName: "Luuk de Jong",
              shirtNumber: 17,
              playerStatus: "SUBSTITUTE",
              position: "FWD",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 22,
              substitutionInTime: 68,
              substitutionOutTime: null,
              positionPlayed: "ST",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            // Réservistes
            {
              id: 17,
              matchSheetId: parseInt(id),
              playerId: 14,
              playerName: "Clément Lenglet",
              shirtNumber: 15,
              playerStatus: "RESERVE",
              position: "DEF",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 0,
              substitutionInTime: null,
              substitutionOutTime: null,
              positionPlayed: "CB",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            },
            {
              id: 18,
              matchSheetId: parseInt(id),
              playerId: 17,
              playerName: "Philippe Coutinho",
              shirtNumber: 14,
              playerStatus: "RESERVE",
              position: "MID",
              goalsScored: 0,
              yellowCards: 0,
              redCards: 0,
              minutesPlayed: 0,
              substitutionInTime: null,
              substitutionOutTime: null,
              positionPlayed: "CAM",
              createdAt: "2025-05-01T10:00:00",
              updatedAt: "2025-05-01T10:00:00"
            }
          ],
          comments: "L'équipe a bien appliqué la stratégie défensive face à cet adversaire rapide.",
          submittedAt: "2025-05-08T10:30:00",
          validatedAt: null,
          strategy: "4-3-3 avec pressing haut et transitions rapides"
        };
        
        setMatchSheet(matchSheetData);
      } catch (error) {
        console.error('Erreur lors de la récupération de la feuille de match:', error);
        setError('Erreur lors du chargement de la feuille de match. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchSheet();
  }, [id]);

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DRAFT':
        return (
          <Badge variant="warning">Brouillon</Badge>
        );
      case 'SUBMITTED':
        return (
          <Badge variant="info">Soumise</Badge>
        );
      case 'VALIDATED':
        return (
          <Badge variant="success">Approuvée</Badge>
        );
      case 'UNVALIDATED':
        return (
          <Badge variant="error">Rejetée</Badge>
        );
      default:
        return (
          <Badge variant="default">{status}</Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!matchSheet) {
    return (
      <Alert variant="error">
        Feuille de match introuvable ou vous n'avez pas les droits nécessaires.
      </Alert>
    );
  }

  // Obtenir les listes de joueurs par statut
  const starters = matchSheet.playerParticipations.filter(p => p.playerStatus === 'STARTER');
  const substitutes = matchSheet.playerParticipations.filter(p => p.playerStatus === 'SUBSTITUTE');
  const reserves = matchSheet.playerParticipations.filter(p => p.playerStatus === 'RESERVE');
  
  // Calculer les statistiques d'équipe
  const totalGoals = matchSheet.playerParticipations.reduce((sum, p) => sum + p.goalsScored, 0);
  const totalYellowCards = matchSheet.playerParticipations.reduce((sum, p) => sum + p.yellowCards, 0);
  const totalRedCards = matchSheet.playerParticipations.reduce((sum, p) => sum + p.redCards, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Feuille de match</h1>
          <p className="mt-1 text-sm text-gray-500">
            {matchSheet.competitionName} • {matchSheet.matchTitle}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href="/dashboard/coach/match-sheets">
            <Button variant="outline">
              Retour
            </Button>
          </Link>
          {matchSheet.status === 'DRAFT' && (
            <Link href={`/dashboard/coach/match-sheets/${matchSheet.id}/edit`}>
              <Button variant="primary">
                Modifier
              </Button>
            </Link>
          )}
          {matchSheet.status === 'UNVALIDATED' && (
            <Link href={`/dashboard/coach/match-sheets/${matchSheet.id}/edit`}>
              <Button variant="danger">
                Corriger
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      {error && (
        <Alert variant="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 flex flex-row justify-between items-center">
          <div>
            <div className="flex items-center">
              <span className="text-lg font-semibold">{matchSheet.teamName}</span>
              <span className="mx-3 text-gray-500">vs</span>
              <span className="text-lg font-semibold">{matchSheet.opponentName}</span>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Lieu: {matchSheet.venue}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="mb-1">
              {getStatusBadge(matchSheet.status)}
            </div>
            <div className="text-sm text-gray-500">
              {matchSheet.status === 'SUBMITTED' && `Soumise le ${formatDate(matchSheet.submittedAt)}`}
              {matchSheet.status === 'VALIDATED' && `Validée le ${formatDate(matchSheet.validatedAt)}`}
              {matchSheet.status === 'UNVALIDATED' && `Rejetée le ${formatDate(matchSheet.validatedAt)}`}
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Composition de l'équipe</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="starters">
              <TabsList className="w-full justify-start border-b">
                <TabsTrigger value="starters">
                  Titulaires ({starters.length})
                </TabsTrigger>
                <TabsTrigger value="substitutes">
                  Remplaçants ({substitutes.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="starters" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Poste</TableHead>
                      <TableHead>Minutes</TableHead>
                      <TableHead>Buts</TableHead>
                      <TableHead>Jaune</TableHead>
                      <TableHead>Rouge</TableHead>
                      <TableHead>Sortie</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {starters.map(player => (
                      <TableRow key={player.playerId}>
                        <TableCell>{player.shirtNumber}</TableCell>
                        <TableCell>
                          <div className="font-medium">{player.playerName}</div>
                        </TableCell>
                        <TableCell>
                          {player.positionPlayed === 'GK' && 'Gardien'}
                          {player.positionPlayed === 'LB' && 'Arrière gauche'}
                          {player.positionPlayed === 'CB' && 'Défenseur central'}
                          {player.positionPlayed === 'RB' && 'Arrière droit'}
                          {player.positionPlayed === 'LWB' && 'Piston gauche'}
                          {player.positionPlayed === 'RWB' && 'Piston droit'}
                          {player.positionPlayed === 'CDM' && 'Milieu défensif'}
                          {player.positionPlayed === 'CM' && 'Milieu central'}
                          {player.positionPlayed === 'CAM' && 'Milieu offensif'}
                          {player.positionPlayed === 'LW' && 'Ailier gauche'}
                          {player.positionPlayed === 'RW' && 'Ailier droit'}
                          {player.positionPlayed === 'ST' && 'Attaquant'}
                        </TableCell>
                        <TableCell>{player.minutesPlayed || 0}'</TableCell>
                        <TableCell>{player.goalsScored || 0}</TableCell>
                        <TableCell>{player.yellowCards || 0}</TableCell>
                        <TableCell>{player.redCards || 0}</TableCell>
                        <TableCell>{player.substitutionOutTime ? `${player.substitutionOutTime}'` : '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="substitutes" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Poste</TableHead>
                      <TableHead>Entrée</TableHead>
                      <TableHead>Sortie</TableHead>
                      <TableHead>Minutes</TableHead>
                      <TableHead>Buts</TableHead>
                      <TableHead>Jaune</TableHead>
                      <TableHead>Rouge</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {substitutes.map(player => (
                      <TableRow key={player.playerId}>
                        <TableCell>{player.shirtNumber}</TableCell>
                        <TableCell>
                          <div className="font-medium">{player.playerName}</div>
                        </TableCell>
                        <TableCell>
                          {player.positionPlayed === 'GK' && 'Gardien'}
                          {player.positionPlayed === 'LB' && 'Arrière gauche'}
                          {player.positionPlayed === 'CB' && 'Défenseur central'}
                          {player.positionPlayed === 'RB' && 'Arrière droit'}
                          {player.positionPlayed === 'LWB' && 'Piston gauche'}
                          {player.positionPlayed === 'RWB' && 'Piston droit'}
                          {player.positionPlayed === 'CDM' && 'Milieu défensif'}
                          {player.positionPlayed === 'CM' && 'Milieu central'}
                          {player.positionPlayed === 'CAM' && 'Milieu offensif'}
                          {player.positionPlayed === 'LW' && 'Ailier gauche'}
                          {player.positionPlayed === 'RW' && 'Ailier droit'}
                          {player.positionPlayed === 'ST' && 'Attaquant'}
                        </TableCell>
                        <TableCell>{player.substitutionInTime ? `${player.substitutionInTime}'` : '-'}</TableCell>
                        <TableCell>{player.substitutionOutTime ? `${player.substitutionOutTime}'` : '-'}</TableCell>
                        <TableCell>{player.minutesPlayed || 0}'</TableCell>
                        <TableCell>{player.goalsScored || 0}</TableCell>
                        <TableCell>{player.yellowCards || 0}</TableCell>
                        <TableCell>{player.redCards || 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="reserves" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Poste</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reserves.map(player => (
                      <TableRow key={player.playerId}>
                        <TableCell>{player.shirtNumber}</TableCell>
                        <TableCell>
                          <div className="font-medium">{player.playerName}</div>
                        </TableCell>
                        <TableCell>
                          {player.position === 'GK' && 'Gardien'}
                          {player.position === 'DEF' && 'Défenseur'}
                          {player.position === 'MID' && 'Milieu'}
                          {player.position === 'FWD' && 'Attaquant'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Statistiques d'équipe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{totalGoals}</div>
                  <div className="text-sm text-gray-500">Buts</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{totalYellowCards}</div>
                  <div className="text-sm text-gray-500">Jaunes</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{totalRedCards}</div>
                  <div className="text-sm text-gray-500">Rouges</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Stratégie</h3>
                <div className="p-3 bg-gray-50 rounded-md">
                  {matchSheet.strategy || 'Aucune stratégie définie'}
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Commentaires</h3>
                <div className="p-3 bg-gray-50 rounded-md">
                  {matchSheet.comments || 'Aucun commentaire'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between mt-8">
        <div>
          {matchSheet.status === 'UNVALIDATED' && (
            <Alert variant="warning">
              <div className="font-medium">Motif du rejet :</div>
              <div className="mt-1">Certaines informations sont manquantes concernant les remplacements. Veuillez préciser les minutes exactes des changements.</div>
            </Alert>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-500 italic">
            Dernière mise à jour : {formatDate(matchSheet.updatedAt || matchSheet.submittedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}