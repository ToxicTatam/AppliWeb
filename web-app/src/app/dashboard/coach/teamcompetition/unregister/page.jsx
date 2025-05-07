'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../../../../component/ui/Card';
import Alert from '../../../../../component/ui/Alert';
import Select from '../../../../../component/ui/Select';
import Button from '../../../../../component/ui/Button';

export default function TeamCompetitionUnregisterPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        // Récupérer les inscriptions des équipes du coach
        const response = await fetch('/api/coach/team-competitions');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des inscriptions');
        }
        const data = await response.json();
        setRegistrations(data);
        if (data.length > 0) {
          setSelectedRegistrationId(data[0].id);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des inscriptions:', err);
        setError(err.message || 'Impossible de charger les inscriptions des équipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleRegistrationChange = (e) => {
    setSelectedRegistrationId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedRegistrationId) {
      setError('Veuillez sélectionner une inscription');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/team-competitions/unregister/${selectedRegistrationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de la désinscription de l\'équipe');
      }

      setSuccess(true);
      // Mettre à jour la liste des inscriptions
      setRegistrations(registrations.filter(reg => reg.id !== selectedRegistrationId));
      
      if (registrations.length > 1) {
        // S'il reste des inscriptions, sélectionner la première
        setSelectedRegistrationId(registrations[0].id !== selectedRegistrationId ? 
          registrations[0].id : registrations[1].id);
      } else {
        setSelectedRegistrationId('');
      }
      
      setTimeout(() => {
        if (registrations.length <= 1) {
          // S'il n'y a plus d'inscriptions, rediriger vers la page des compétitions
          router.push('/dashboard/competitions');
        }
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de la désinscription:', err);
      setError(err.message || 'Une erreur est survenue lors de la désinscription');
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
      <h1 className="text-2xl font-bold mb-6">Désinscrire une équipe d'une compétition</h1>
      
      {error && <Alert variant="error" message={error} className="mb-4" />}
      {success && <Alert variant="success" message="Désinscription réussie!" className="mb-4" />}
      
      {registrations.length === 0 ? (
        <div className="p-6 bg-yellow-100 text-yellow-700 rounded-md mb-4">
          <h3 className="font-bold mb-2">Aucune inscription</h3>
          <p>Vous n'avez aucune équipe inscrite à des compétitions.</p>
          <div className="mt-4 flex space-x-3">
            <button 
              onClick={() => router.push('/dashboard/coach/teamcompetition/register')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Inscrire une équipe
            </button>
            <button 
              onClick={() => router.push('/dashboard/competitions')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Voir les compétitions
            </button>
          </div>
        </div>
      ) : (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="registrationId" className="block text-sm font-medium text-gray-700">
                Inscription à annuler *
              </label>
              <Select
                id="registrationId"
                name="registrationId"
                value={selectedRegistrationId}
                onChange={handleRegistrationChange}
                required
                className="mt-1 block w-full"
                options={registrations.map(reg => ({
                  value: reg.id,
                  label: `${reg.teamName} - ${reg.competitionName} (${reg.competitionStartDate} à ${reg.competitionEndDate})`
                }))}
              />
            </div>

            {selectedRegistrationId && (
              <div className="mt-2 p-4 bg-red-50 rounded-md border border-red-200">
                <h3 className="font-semibold text-red-600 mb-2">Attention:</h3>
                <p className="text-sm text-red-600">
                  La désinscription d'une équipe d'une compétition est définitive. 
                  Vous devrez faire une nouvelle demande d'inscription si vous souhaitez 
                  participer à nouveau à cette compétition.
                </p>
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
                type="submit" 
                disabled={submitting}
                variant="danger"
              >
                {submitting ? 'En cours...' : 'Désinscrire l\'équipe'}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}