'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PlayerForm from '../../../../component/teams/PlayerForm';
import {Card }from '../../../../component/ui/Card';
import Alert from '../../../../component/ui/Alert';

export default function AddPlayerPage() {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Récupérer uniquement les équipes dont l'utilisateur est coach
        const response = await fetch('/api/coach/teams');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des équipes');
        }
        const data = await response.json();
        const teamOptions = data.map(team => ({
          value: team.id,
          label: team.name
        }));
        setTeams(teamOptions);
      } catch (err) {
        console.error('Erreur lors du chargement des équipes:', err);
        setError('Impossible de charger les équipes');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleAddPlayer = async (playerData) => {
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'ajout du joueur');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/coach/players');
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de l\'ajout du joueur:', err);
      setError(err.message || 'Une erreur est survenue lors de l\'ajout du joueur');
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Ajouter un nouveau joueur</h1>
      
      {error && <Alert variant="error" message={error} className="mb-4" />}
      {success && <Alert variant="success" message="Joueur ajouté avec succès!" className="mb-4" />}
      
      {teams.length === 0 ? (
        <div className="p-6 bg-yellow-100 text-yellow-700 rounded-md mb-4">
          <h3 className="font-bold mb-2">Aucune équipe disponible</h3>
          <p>Vous devez d'abord créer une équipe avant de pouvoir ajouter des joueurs.</p>
          <button 
            onClick={() => router.push('/dashboard/coach/teams/create')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Créer une équipe
          </button>
        </div>
      ) : (
        <Card>
          <PlayerForm onSubmit={handleAddPlayer} teamOptions={teams} />
        </Card>
      )}
    </div>
  );
}