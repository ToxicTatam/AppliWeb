'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {Card} from '../../../component/ui/Card';
import Alert from '../../../component/ui/Alert';
import Select from '../../../component/ui/Select';
import Button from '../../../component/ui/Button';
import Modal from '../../../component/ui/Modal';

export default function RemovePlayerPage() {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Récupérer les équipes du coach
        const response = await fetch('/api/coach/teams');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des équipes');
        }
        const data = await response.json();
        setTeams(data);
        if (data.length > 0) {
          setSelectedTeamId(data[0].id);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des équipes:', err);
        setError(err.message || 'Impossible de charger les équipes');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    if (!selectedTeamId) return;

    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/teams/${selectedTeamId}/players`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des joueurs');
        }
        const data = await response.json();
        setPlayers(data);
        if (data.length > 0) {
          setSelectedPlayerId(data[0].id);
        } else {
          setSelectedPlayerId('');
        }
      } catch (err) {
        console.error('Erreur lors du chargement des joueurs:', err);
        setError(err.message || 'Impossible de charger les joueurs');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [selectedTeamId]);

  const handleTeamChange = (e) => {
    setSelectedTeamId(e.target.value);
    setSelectedPlayerId('');
  };

  const handlePlayerChange = (e) => {
    setSelectedPlayerId(e.target.value);
  };

  const handleRemovePlayer = async () => {
    if (!selectedPlayerId || !selectedTeamId) {
      setError('Veuillez sélectionner une équipe et un joueur');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/teams/${selectedTeamId}/players/${selectedPlayerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec du retrait du joueur');
      }

      setSuccess(true);
      setShowConfirmModal(false);
      
      // Mettre à jour la liste des joueurs
      setPlayers(players.filter(player => player.id !== selectedPlayerId));
      if (players.length > 1) {
        // S'il reste des joueurs, sélectionner le premier
        setSelectedPlayerId(players[0].id !== selectedPlayerId ? 
          players[0].id : players[1].id);
      } else {
        setSelectedPlayerId('');
      }
      
      setTimeout(() => {
        if (players.length <= 1) {
          // S'il n'y a plus de joueurs, rediriger vers la liste des équipes
          router.push('/dashboard/coach/players');
        }
      }, 2000);
    } catch (err) {
      console.error('Erreur lors du retrait du joueur:', err);
      setError(err.message || 'Une erreur est survenue lors du retrait du joueur');
      setShowConfirmModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && teams.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        </Card>
      </div>
    );
  }

  const selectedPlayer = players.find(p => p.id === selectedPlayerId);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Retirer un joueur d'une équipe</h1>
      
      {error && <Alert variant="error" message={error} className="mb-4" />}
      {success && <Alert variant="success" message="Joueur retiré avec succès!" className="mb-4" />}
      
      {teams.length === 0 ? (
        <div className="p-6 bg-yellow-100 text-yellow-700 rounded-md mb-4">
          <h3 className="font-bold mb-2">Aucune équipe disponible</h3>
          <p>Vous devez d'abord créer une équipe avant de pouvoir gérer des joueurs.</p>
          <button 
            onClick={() => router.push('/dashboard/coach/teams/create')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Créer une équipe
          </button>
        </div>
      ) : (
        <Card>
          <div className="space-y-6">
            <div>
              <label htmlFor="teamId" className="block text-sm font-medium text-gray-700">
                Équipe *
              </label>
              <Select
                id="teamId"
                name="teamId"
                value={selectedTeamId}
                onChange={handleTeamChange}
                required
                className="mt-1 block w-full"
                options={teams.map(team => ({
                  value: team.id,
                  label: `${team.name} (${team.category} - ${team.sport})`
                }))}
              />
            </div>

            {loading && selectedTeamId ? (
              <div className="flex justify-center items-center p-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            ) : players.length === 0 ? (
              <div className="p-4 bg-yellow-50 rounded-md">
                <p>Aucun joueur dans cette équipe.</p>
                <button 
                  onClick={() => router.push('/dashboard/coach/team/new')}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  Ajouter un joueur
                </button>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="playerId" className="block text-sm font-medium text-gray-700">
                    Joueur à retirer *
                  </label>
                  <Select
                    id="playerId"
                    name="playerId"
                    value={selectedPlayerId}
                    onChange={handlePlayerChange}
                    required
                    className="mt-1 block w-full"
                    options={players.map(player => ({
                      value: player.id,
                      label: `${player.firstName} ${player.lastName} (${player.position || 'Aucune position'})`
                    }))}
                  />
                </div>

                {selectedPlayer && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-semibold mb-2">Informations sur le joueur:</h3>
                    <div className="text-sm">
                      <p><span className="font-medium">Nom complet:</span> {selectedPlayer.firstName} {selectedPlayer.lastName}</p>
                      <p><span className="font-medium">Email:</span> {selectedPlayer.email}</p>
                      {selectedPlayer.position && <p><span className="font-medium">Position:</span> {selectedPlayer.position}</p>}
                      {selectedPlayer.jerseyNumber && <p><span className="font-medium">Numéro de maillot:</span> {selectedPlayer.jerseyNumber}</p>}
                      {selectedPlayer.licenseNumber && <p><span className="font-medium">Numéro de licence:</span> {selectedPlayer.licenseNumber}</p>}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end space-x-3">
                  <Button 
                    type="button" 
                    onClick={() => router.back()}
                    variant="outline"
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setShowConfirmModal(true)}
                    variant="danger"
                    disabled={!selectedPlayerId || submitting}
                  >
                    {submitting ? 'En cours...' : 'Retirer le joueur'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>
      )}

      {showConfirmModal && (
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="Confirmer le retrait"
        >
          <div className="p-4">
            <p className="mb-4">
              Êtes-vous sûr de vouloir retirer{' '}
              <strong>{selectedPlayer?.firstName} {selectedPlayer?.lastName}</strong>{' '}
              de l'équipe{' '}
              <strong>{teams.find(t => t.id === selectedTeamId)?.name}</strong>?
            </p>
            <p className="mb-6 text-red-600 text-sm">
              Cette action est irréversible. Le joueur ne sera plus associé à cette équipe.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                disabled={submitting}
              >
                Annuler
              </Button>
              <Button
                variant="danger"
                onClick={handleRemovePlayer}
                disabled={submitting}
              >
                {submitting ? 'En cours...' : 'Confirmer le retrait'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}