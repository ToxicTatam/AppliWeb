'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardContent } from '@/component/ui/Card';
import { Alert } from '@/component/ui/Alert';
import Button from '@/component/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/component/ui/Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/component/ui/Tabs';
import { Select } from '@/component/ui/Select';
import Modal from '@/component/ui/Modal';
import { Badge } from '@/component/ui/Badge';

export default function EditMatchSheet() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [matchSheet, setMatchSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  
  // État pour les joueurs de l'équipe et leurs participations
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [playerParticipations, setPlayerParticipations] = useState([]);
  
  // État pour la stratégie
  const [strategy, setStrategy] = useState('');
  const [comments, setComments] = useState('');

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
          status: "DRAFT", // DRAFT, SUBMITTED, VALIDARED, UNVALIDED,ONGOING
          playerParticipations: [
            {
              id: 1,
              matchSheetId: parseInt(id),
              playerId: 1,
              playerName: "Marc-André ter Stegen",
              shirtNumber: 1,
              playerStatus: "STARTER", // STARTER, SUBSTITUTE, RESERVE, 
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
            // Autres joueurs de l'équipe
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
            }
          ],
          comments: "Stratégie défensive face à un adversaire rapide",
          submittedAt: null,
          validatedAt: null,
          strategy: "4-3-3 avec pressing haut"
        };
        
        // Joueurs disponibles pour l'équipe (qui ne sont pas déjà dans les participations)
        const availableTeamPlayers = [
          { id: 1, name: "Marc-André ter Stegen", shirtNumber: 1, position: "GK" },
          { id: 2, name: "Sergiño Dest", shirtNumber: 2, position: "DEF" },
          { id: 3, name: "Gerard Piqué", shirtNumber: 3, position: "DEF" },
          { id: 4, name: "Ronald Araújo", shirtNumber: 4, position: "DEF" },
          { id: 5, name: "Jordi Alba", shirtNumber: 18, position: "DEF" },
          { id: 6, name: "Sergio Busquets", shirtNumber: 5, position: "MID" },
          { id: 7, name: "Pedri", shirtNumber: 8, position: "MID" },
          { id: 8, name: "Frenkie de Jong", shirtNumber: 21, position: "MID" },
          { id: 9, name: "Ousmane Dembélé", shirtNumber: 7, position: "FWD" },
          { id: 10, name: "Memphis Depay", shirtNumber: 9, position: "FWD" },
          { id: 11, name: "Ansu Fati", shirtNumber: 10, position: "FWD" },
          { id: 12, name: "Neto", shirtNumber: 13, position: "GK" },
          { id: 13, name: "Sergi Roberto", shirtNumber: 20, position: "DEF" },
          { id: 14, name: "Clément Lenglet", shirtNumber: 15, position: "DEF" },
          { id: 15, name: "Riqui Puig", shirtNumber: 16, position: "MID" },
          { id: 16, name: "Yusuf Demir", shirtNumber: 11, position: "FWD" },
          { id: 17, name: "Philippe Coutinho", shirtNumber: 14, position: "MID" },
          { id: 18, name: "Luuk de Jong", shirtNumber: 17, position: "FWD" },
        ];
        
        setMatchSheet(matchSheetData);
        setTeamPlayers(availableTeamPlayers);
        setPlayerParticipations(matchSheetData.playerParticipations);
        setStrategy(matchSheetData.strategy || '');
        setComments(matchSheetData.comments || '');
        
      } catch (error) {
        console.error('Erreur lors de la récupération de la feuille de match:', error);
        setError('Erreur lors du chargement de la feuille de match. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchSheet();
  }, [id]);

  // Gérer la mise à jour du statut d'un joueur (titulaire, remplaçant, réserviste, non convoqué)
  const handlePlayerStatusChange = (playerId, newStatus) => {
    const updatedParticipations = playerParticipations.map(participation => {
      if (participation.playerId === playerId) {
        // Réinitialiser les valeurs si le joueur devient non convoqué
        if (newStatus === 'NOT_IN_SQUAD') {
          return {
            ...participation,
            playerStatus: newStatus,
            minutesPlayed: 0,
            goalsScored: 0,
            yellowCards: 0,
            redCards: 0,
            substitutionInTime: null,
            substitutionOutTime: null
          };
        }
        // Si le joueur devient titulaire, définir minutesPlayed par défaut à 90
        if (newStatus === 'STARTER') {
          return {
            ...participation,
            playerStatus: newStatus,
            minutesPlayed: 90,
            substitutionInTime: null,
            substitutionOutTime: null
          };
        }
        // Si le joueur devient remplaçant, réinitialiser minutes jouées
        if (newStatus === 'SUBSTITUTE') {
          return {
            ...participation,
            playerStatus: newStatus,
            minutesPlayed: 0
          };
        }
        
        return { ...participation, playerStatus: newStatus };
      }
      return participation;
    });
    
    setPlayerParticipations(updatedParticipations);
  };
  
  // Mise à jour d'un champ numérique pour un joueur (buts, cartons, etc.)
  const handleNumericFieldChange = (playerId, field, value) => {
    const numValue = parseInt(value) || 0;
    const updatedParticipations = playerParticipations.map(participation => {
      if (participation.playerId === playerId) {
        return { ...participation, [field]: numValue };
      }
      return participation;
    });
    
    setPlayerParticipations(updatedParticipations);
  };
  
  // Ajouter un joueur à la feuille de match
  const handleAddPlayer = (playerId) => {
    // Vérifier si le joueur est déjà dans les participations
    const existingParticipation = playerParticipations.find(p => p.playerId === playerId);
    if (existingParticipation) return;
    
    const player = teamPlayers.find(p => p.id === playerId);
    if (!player) return;
    
    const newParticipation = {
      id: null, // Sera assigné par le backend
      matchSheetId: parseInt(id),
      playerId: player.id,
      playerName: player.name,
      shirtNumber: player.shirtNumber,
      playerStatus: 'NOT_IN_SQUAD', // Par défaut
      position: player.position,
      goalsScored: 0,
      yellowCards: 0,
      redCards: 0,
      minutesPlayed: 0,
      substitutionInTime: null,
      substitutionOutTime: null,
      positionPlayed: player.position,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setPlayerParticipations([...playerParticipations, newParticipation]);
  };
  
  // Supprimer un joueur de la feuille de match
  const handleRemovePlayer = (playerId) => {
    setPlayerParticipations(playerParticipations.filter(p => p.playerId !== playerId));
  };

  // Soumettre la feuille de match
  const handleSubmit = async () => {
    setSaving(true);
    
    try {
      // Validation
      const starterCount = playerParticipations.filter(p => p.playerStatus === 'STARTER').length;
      if (starterCount !== 11) {
        setError('Vous devez sélectionner exactement 11 joueurs titulaires');
        setSaving(false);
        return;
      }
      
      // Dans une application réelle, vous feriez un appel d'API ici
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Préparer les données à envoyer
      const matchSheetData = {
        ...matchSheet,
        playerParticipations: playerParticipations,
        strategy,
        comments,
        status: 'SUBMITTED',
        submittedAt: new Date().toISOString()
      };
      
      console.log('Données soumises:', matchSheetData);
      
      setSuccess('Feuille de match soumise avec succès!');
      setConfirmSubmit(false);
      
      // Rediriger vers la page des feuilles de match après un délai
      setTimeout(() => {
        router.push('/dashboard/coach/match-sheets');
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de la soumission de la feuille de match:', error);
      setError('Erreur lors de la soumission. Veuillez réessayer plus tard.');
    } finally {
      setSaving(false);
    }
  };
  
  // Sauvegarder un brouillon
  const handleSaveDraft = async () => {
    setSaving(true);
    
    try {
      // Préparer les données à envoyer
      const matchSheetData = {
        ...matchSheet,
        playerParticipations: playerParticipations,
        strategy,
        comments,
        status: 'DRAFT'
      };
      
      console.log('Brouillon sauvegardé:', matchSheetData);
      
      // Dans une application réelle, vous feriez un appel d'API ici
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Brouillon sauvegardé!');
      
      // Effacer le message après 3 secondes
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du brouillon:', error);
      setError('Erreur lors de la sauvegarde. Veuillez réessayer plus tard.');
    } finally {
      setSaving(false);
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
  const starters = playerParticipations.filter(p => p.playerStatus === 'STARTER');
  const substitutes = playerParticipations.filter(p => p.playerStatus === 'SUBSTITUTE');
  const reserves = playerParticipations.filter(p => p.playerStatus === 'RESERVE');
  const notInSquad = playerParticipations.filter(p => p.playerStatus === 'NOT_IN_SQUAD');
  
  // Trouver les joueurs qui ne sont pas encore ajoutés
  const playersNotAdded = teamPlayers.filter(player => 
    !playerParticipations.some(p => p.playerId === player.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Éditer la feuille de match</h1>
          <p className="mt-1 text-sm text-gray-500">
            {matchSheet.competitionName} • {matchSheet.matchTitle}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/coach/match-sheets')}
          >
            Annuler
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={saving}
          >
            Sauvegarder brouillon
          </Button>
          <Button
            variant="primary"
            onClick={() => setConfirmSubmit(true)}
            disabled={saving}
          >
            Soumettre la feuille
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert variant="success" onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}
      
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-lg font-semibold">{matchSheet.teamName}</span>
            </div>
            
            <div className="text-center">
              <span className="text-lg">vs</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-lg font-semibold">{matchSheet.opponentName}</span>
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
                  Titulaires ({starters.length}/11)
                </TabsTrigger>
                <TabsTrigger value="substitutes">
                  Remplaçants ({substitutes.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="starters" className="mt-4">
                {starters.length === 0 ? (
                  <p className="text-gray-500 italic">Aucun joueur titulaire sélectionné</p>
                ) : (
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
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {starters.map(player => (
                        <TableRow key={player.playerId}>
                          <TableCell>{player.shirtNumber}</TableCell>
                          <TableCell>{player.playerName}</TableCell>
                          <TableCell>
                            <select
                              className="border border-gray-300 rounded-md p-1"
                              value={player.positionPlayed}
                              onChange={(e) => {
                                const updatedParticipations = playerParticipations.map(p => 
                                  p.playerId === player.playerId 
                                    ? {...p, positionPlayed: e.target.value} 
                                    : p
                                );
                                setPlayerParticipations(updatedParticipations);
                              }}
                            >
                              <option value="GK">Gardien</option>
                              <option value="LB">Arrière gauche</option>
                              <option value="CB">Défenseur central</option>
                              <option value="RB">Arrière droit</option>
                              <option value="LWB">Piston gauche</option>
                              <option value="RWB">Piston droit</option>
                              <option value="CDM">Milieu défensif</option>
                              <option value="CM">Milieu central</option>
                              <option value="CAM">Milieu offensif</option>
                              <option value="LW">Ailier gauche</option>
                              <option value="RW">Ailier droit</option>
                              <option value="ST">Attaquant</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <input
                              type="number"
                              min="0"
                              max="120"
                              className="w-16 border border-gray-300 rounded-md p-1"
                              value={player.minutesPlayed}
                              onChange={(e) => handleNumericFieldChange(player.playerId, 'minutesPlayed', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <input
                              type="number"
                              min="0"
                              className="w-16 border border-gray-300 rounded-md p-1"
                              value={player.goalsScored}
                              onChange={(e) => handleNumericFieldChange(player.playerId, 'goalsScored', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <input
                              type="number"
                              min="0"
                              max="2"
                              className="w-16 border border-gray-300 rounded-md p-1"
                              value={player.yellowCards}
                              onChange={(e) => handleNumericFieldChange(player.playerId, 'yellowCards', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <input
                              type="number"
                              min="0"
                              max="1"
                              className="w-16 border border-gray-300 rounded-md p-1"
                              value={player.redCards}
                              onChange={(e) => handleNumericFieldChange(player.playerId, 'redCards', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handlePlayerStatusChange(player.playerId, 'SUBSTITUTE')}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                → Remplaçant
                              </button>
                              <button
                                onClick={() => handleRemovePlayer(player.playerId)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Retirer
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
              
              <TabsContent value="substitutes" className="mt-4">
                {substitutes.length === 0 ? (
                  <p className="text-gray-500 italic">Aucun joueur remplaçant sélectionné</p>
                ) : (
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
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {substitutes.map(player => (
                        <TableRow key={player.playerId}>
                          <TableCell>{player.shirtNumber}</TableCell>
                          <TableCell>{player.playerName}</TableCell>
                          <TableCell>
                            <select
                              className="border border-gray-300 rounded-md p-1"
                              value={player.positionPlayed}
                              onChange={(e) => {
                                const updatedParticipations = playerParticipations.map(p => 
                                  p.playerId === player.playerId 
                                    ? {...p, positionPlayed: e.target.value} 
                                    : p
                                );
                                setPlayerParticipations(updatedParticipations);
                              }}
                            >
                              <option value="GK">Gardien</option>
                              <option value="LB">Arrière gauche</option>
                              <option value="CB">Défenseur central</option>
                              <option value="RB">Arrière droit</option>
                              <option value="LWB">Piston gauche</option>
                              <option value="RWB">Piston droit</option>
                              <option value="CDM">Milieu défensif</option>
                              <option value="CM">Milieu central</option>
                              <option value="CAM">Milieu offensif</option>
                              <option value="LW">Ailier gauche</option>
                              <option value="RW">Ailier droit</option>
                              <option value="ST">Attaquant</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <input
                              type="number"
                              min="0"
                              max="120"
                              className="w-16 border border-gray-300 rounded-md p-1"
                              value={player.substitutionInTime || ''}
                              onChange={(e) => {
                                const updatedParticipations = playerParticipations.map(p => 
                                  p.playerId === player.playerId 
                                    ? {...p, substitutionInTime: e.target.value ? parseInt(e.target.value) : null} 
                                    : p
                                );
                                setPlayerParticipations(updatedParticipations);
                              }}
                              placeholder="-"
                            />
                          </TableCell>
                          <TableCell>
                            <input
                              type="number"
                              min="0"
                              max="120"
                              className="w-16 border border-gray-300 rounded-md p-1"
                              value={player.substitutionOutTime || ''}
                              onChange={(e) => {
                                const updatedParticipations = playerParticipations.map(p => 
                                  p.playerId === player.playerId 
                                    ? {...p, substitutionOutTime: e.target.value ? parseInt(e.target.value) : null} 
                                    : p
                                );
                                setPlayerParticipations(updatedParticipations);
                              }}
                              placeholder="-"
                            />
                          </TableCell>
                          <TableCell>
                            <input
                              type="number"
                              min="0"
                              max="120"
                              className="w-16 border border-gray-300 rounded-md p-1"
                              value={player.minutesPlayed}
                              onChange={(e) => handleNumericFieldChange(player.playerId, 'minutesPlayed', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <input
                              type="number"
                              min="0"
                              className="w-16 border border-gray-300 rounded-md p-1"
                              value={player.goalsScored}
                              onChange={(e) => handleNumericFieldChange(player.playerId, 'goalsScored', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <input
                              type="number"
                              min="0"
                              max="2"
                              className="w-16 border border-gray-300 rounded-md p-1"
                              value={player.yellowCards}
                              onChange={(e) => handleNumericFieldChange(player.playerId, 'yellowCards', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <input
                              type="number"
                              min="0"
                              max="1"
                              className="w-16 border border-gray-300 rounded-md p-1"
                              value={player.redCards}
                              onChange={(e) => handleNumericFieldChange(player.playerId, 'redCards', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handlePlayerStatusChange(player.playerId, 'STARTER')}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                → Titulaire
                              </button>
                              <button
                                onClick={() => handlePlayerStatusChange(player.playerId, 'RESERVE')}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                → Réserviste
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
              
              <TabsContent value="reserves" className="mt-4">
                {reserves.length === 0 ? (
                  <p className="text-gray-500 italic">Aucun joueur réserviste sélectionné</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Poste</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reserves.map(player => (
                        <TableRow key={player.playerId}>
                          <TableCell>{player.shirtNumber}</TableCell>
                          <TableCell>{player.playerName}</TableCell>
                          <TableCell>{player.position}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handlePlayerStatusChange(player.playerId, 'SUBSTITUTE')}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                → Remplaçant
                              </button>
                              <button
                                onClick={() => handlePlayerStatusChange(player.playerId, 'NOT_IN_SQUAD')}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                → Non convoqué
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
              
              <TabsContent value="not-in-squad" className="mt-4">
                {notInSquad.length === 0 ? (
                  <p className="text-gray-500 italic">Tous les joueurs sont convoqués</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Poste</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notInSquad.map(player => (
                        <TableRow key={player.playerId}>
                          <TableCell>{player.shirtNumber}</TableCell>
                          <TableCell>{player.playerName}</TableCell>
                          <TableCell>{player.position}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handlePlayerStatusChange(player.playerId, 'STARTER')}
                                className="text-blue-500 hover:text-blue-700"
                                disabled={starters.length >= 11}
                              >
                                → Titulaire
                              </button>
                              <button
                                onClick={() => handlePlayerStatusChange(player.playerId, 'SUBSTITUTE')}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                → Remplaçant
                              </button>
                              <button
                                onClick={() => handlePlayerStatusChange(player.playerId, 'RESERVE')}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                → Réserviste
                              </button>
                              <button
                                onClick={() => handleRemovePlayer(player.playerId)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Retirer
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Joueurs disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            {playersNotAdded.length === 0 ? (
              <p className="text-gray-500 italic">Tous les joueurs ont été ajoutés à la feuille de match</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Poste</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playersNotAdded.map(player => (
                    <TableRow key={player.id}>
                      <TableCell>{player.shirtNumber}</TableCell>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleAddPlayer(player.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Ajouter
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Stratégie et commentaires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stratégie de jeu
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                placeholder="Ex: 4-3-3 avec pressing haut"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commentaires
              </label>
              <textarea
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Notes pour l'équipe..."
              ></textarea>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Modal de confirmation pour soumettre la feuille */}
      <Modal
        isOpen={confirmSubmit}
        onClose={() => setConfirmSubmit(false)}
        title="Confirmation de soumission"
      >
        <div className="space-y-4">
          <p>Êtes-vous sûr de vouloir soumettre cette feuille de match ? Une fois soumise, elle sera envoyée pour validation et vous ne pourrez plus la modifier.</p>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setConfirmSubmit(false)}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? 'Soumission en cours...' : 'Confirmer la soumission'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}