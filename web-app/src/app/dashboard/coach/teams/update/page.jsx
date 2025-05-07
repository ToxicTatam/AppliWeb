'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TeamForm from '../../../../component/teams/TeamForm';
import {Card} from '../../../../component/ui/Card';
import Alert from '../../../../component/ui/Alert';

export default function UpdateTeamPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teamId = searchParams.get('id');
  
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!teamId) {
      setError('ID de l\'équipe non spécifié');
      setLoading(false);
      return;
    }

    const fetchTeam = async () => {
      try {
        const response = await fetch(`/api/teams/${teamId}`);
        if (!response.ok) {
          throw new Error('Équipe non trouvée');
        }
        const data = await response.json();
        setTeam(data);
      } catch (err) {
        console.error('Erreur lors du chargement de l\'équipe:', err);
        setError(err.message || 'Impossible de charger les détails de l\'équipe');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  const handleUpdateTeam = async (teamData) => {
    try {
      const response = await fetch(`/api/teams/${teamId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });

      if (!response.ok) {
        throw new Error('Échec de la mise à jour de l\'équipe');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/coach/teams');
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'équipe:', err);
      setError(err.message || 'Une erreur est survenue lors de la mise à jour de l\'équipe');
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

  if (error && !team) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="error" message={error} />
        <div className="mt-4">
          <button 
            onClick={() => router.push('/dashboard/coach/teams')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retourner à la liste des équipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Modifier l'équipe</h1>
      
      {error && <Alert variant="error" message={error} className="mb-4" />}
      {success && <Alert variant="success" message="Équipe mise à jour avec succès!" className="mb-4" />}
      
      <Card>
        {team && <TeamForm team={team} onSubmit={handleUpdateTeam} isEditing={true} />}
      </Card>
    </div>
  );
}