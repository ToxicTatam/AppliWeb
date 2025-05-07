'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PlayerForm from '../../../../component/teams/PlayerForm';
import Card from '../../../../component/ui/Card';
import Alert from '../../../../component/ui/Alert';

export default function UpdatePlayerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const playerId = searchParams.get('id');
  
  const [player, setPlayer] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!playerId) {
      setError('ID du joueur non spécifié');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Charger les équipes
        const teamsResponse = await fetch('/api/coach/teams');
        if (!teamsResponse.ok) {
          throw new Error('Erreur lors de la récupération des équipes');
        }
        const teamsData = await teamsResponse.json();
        const teamOptions = teamsData.map(team => ({
          value: team.id,
          label: team.name
        }));
        setTeams(teamOptions);

        // Charger les données du joueur
        const playerResponse = await fetch(`/api/players/${playerId}`);
        if (!playerResponse.ok) {
          throw new Error('Joueur non trouvé');
        }
        const playerData = await playerResponse.json();
        setPlayer(playerData);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError(err.message || 'Impossible de charger les données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [playerId]);

  const handleUpdatePlayer = async (playerData) => {
    try {
      const response = await fetch(`/api/players/${playerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      });

      if (!response.ok) {
        throw new Error('Échec de la mise à jour du joueur');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/coach/players');
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de la mise à jour du joueur:', err);
      setError(err.message || 'Une erreur est survenue lors de la mise à jour du joueur');
    }
  };

  if (loading) {
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

  if (error && !player) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="error" message={error} />
        <div className="mt-4">
          <button 
            onClick={() => router.push('/dashboard/coach/players')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retourner à la liste des joueurs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Mettre à jour les informations du joueur</h1>
      
      {error && <Alert variant="error" message={error} className="mb-4" />}
      {success && <Alert variant="success" message="Joueur mis à jour avec succès!" className="mb-4" />}
      
      <Card>
        {player && <PlayerForm player={player} onSubmit={handleUpdatePlayer} isEditing={true} teamOptions={teams} />}
      </Card>
    </div>
  );
}