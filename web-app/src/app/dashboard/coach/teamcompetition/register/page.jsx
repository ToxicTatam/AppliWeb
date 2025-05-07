'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../../../../component/ui/Card';
import Alert from '../../../../../component/ui/Alert';
import Select from '../../../../../component/ui/Select';
import Button from '../../../../../component/ui/Button';

export default function TeamCompetitionRegisterPage() {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [selectedCompetitionId, setSelectedCompetitionId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les équipes du coach
        const teamsResponse = await fetch('/api/coach/teams');
        if (!teamsResponse.ok) {
          throw new Error('Erreur lors de la récupération des équipes');
        }
        const teamsData = await teamsResponse.json();
        setTeams(teamsData);
        if (teamsData.length > 0) {
          setSelectedTeamId(teamsData[0].id);
        }

        // Récupérer les compétitions disponibles
        const competitionsResponse = await fetch('/api/competitions?status=open');
        if (!competitionsResponse.ok) {
          throw new Error('Erreur lors de la récupération des compétitions');
        }
        const competitionsData = await competitionsResponse.json();
        setCompetitions(competitionsData);
        if (competitionsData.length > 0) {
          setSelectedCompetitionId(competitionsData[0].id);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError(err.message || 'Impossible de charger les données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTeamChange = (e) => {
    setSelectedTeamId(e.target.value);
  };

  const handleCompetitionChange = (e) => {
    setSelectedCompetitionId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTeamId || !selectedCompetitionId) {
      setError('Veuillez sélectionner une équipe et une compétition');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/team-competitions/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamId: selectedTeamId,
          competitionId: selectedCompetitionId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de l\'inscription de l\'équipe à la compétition');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/competitions');
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de l\'inscription à la compétition:', err);
      setError(err.message || 'Une erreur est survenue lors de l\'inscription à la compétition');
    } finally {
      setSubmitting(false);
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
      <h1 className="text-2xl font-bold mb-6">Inscrire une équipe à une compétition</h1>
      
      {error && <Alert variant="error" message={error} className="mb-4" />}
      {success && <Alert variant="success" message="Inscription à la compétition réussie!" className="mb-4" />}
      
      {teams.length === 0 ? (
        <div className="p-6 bg-yellow-100 text-yellow-700 rounded-md mb-4">
          <h3 className="font-bold mb-2">Aucune équipe disponible</h3>
          <p>Vous devez d'abord créer une équipe avant de pouvoir l'inscrire à une compétition.</p>
          <button 
            onClick={() => router.push('/dashboard/coach/teams/create')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Créer une équipe
          </button>
        </div>
      ) : competitions.length === 0 ? (
        <div className="p-6 bg-yellow-100 text-yellow-700 rounded-md mb-4">
          <h3 className="font-bold mb-2">Aucune compétition disponible</h3>
          <p>Il n'y a actuellement aucune compétition ouverte aux inscriptions.</p>
          <button 
            onClick={() => router.push('/dashboard/competitions')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Voir toutes les compétitions
          </button>
        </div>
      ) : (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="teamId" className="block text-sm font-medium text-gray-700">
                Équipe à inscrire *
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

            <div>
              <label htmlFor="competitionId" className="block text-sm font-medium text-gray-700">
                Compétition *
              </label>
              <Select
                id="competitionId"
                name="competitionId"
                value={selectedCompetitionId}
                onChange={handleCompetitionChange}
                required
                className="mt-1 block w-full"
                options={competitions.map(competition => ({
                  value: competition.id,
                  label: `${competition.name} (${competition.sport} - ${competition.startDate} à ${competition.endDate})`
                }))}
              />
              {selectedCompetitionId && (
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-semibold mb-2">Informations sur la compétition:</h3>
                  {competitions.find(c => c.id === selectedCompetitionId) && (
                    <div className="text-sm">
                      <p><span className="font-medium">Description:</span> {competitions.find(c => c.id === selectedCompetitionId).description}</p>
                      <p><span className="font-medium">Dates:</span> Du {competitions.find(c => c.id === selectedCompetitionId).startDate} au {competitions.find(c => c.id === selectedCompetitionId).endDate}</p>
                      <p><span className="font-medium">Lieu:</span> {competitions.find(c => c.id === selectedCompetitionId).location}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3">
              <Button 
                type="button" 
                onClick={() => router.back()}
                variant="outline"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={submitting}
              >
                {submitting ? 'En cours...' : 'Inscrire l\'équipe'}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}