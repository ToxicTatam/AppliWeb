'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TeamForm from '../../../../component/teams/TeamForm';
import {Card} from '../../../../component/ui/Card';
import Alert from '../../../../component/ui/Alert';

export default function CreateTeamPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCreateTeam = async (teamData) => {
    try {
      // Ajoutez ici l'appel API vers votre backend Spring Boot
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });

      if (!response.ok) {
        throw new Error('Échec de la création de l\'équipe');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/coach/teams');
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de la création de l\'équipe:', err);
      setError(err.message || 'Une erreur est survenue lors de la création de l\'équipe');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Créer une nouvelle équipe</h1>
      
      {error && <Alert variant="error" message={error} className="mb-4" />}
      {success && <Alert variant="success" message="Équipe créée avec succès!" className="mb-4" />}
      
      <Card>
        <TeamForm onSubmit={handleCreateTeam} isEditing={false} />
      </Card>
    </div>
  );
}