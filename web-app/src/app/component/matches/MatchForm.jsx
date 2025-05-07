import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

export default function MatchForm({ match, teams, competitions, onSubmit, isEditing = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    competitionId: match?.competitionId || '',
    homeTeamId: match?.homeTeamId || '',
    awayTeamId: match?.awayTeamId || '',
    date: match?.date ? new Date(match.date).toISOString().split('T')[0] : '',
    time: match?.time || '',
    location: match?.location || '',
    status: match?.status || 'scheduled',
    homeScore: match?.homeScore || 0,
    awayScore: match?.awayScore || 0,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.competitionId || !formData.homeTeamId || !formData.awayTeamId || !formData.date || !formData.time) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Vérifier que les équipes sont différentes
    if (formData.homeTeamId === formData.awayTeamId) {
      setError('Les équipes à domicile et à l\'extérieur doivent être différentes');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
      router.push('/dashboard/organizer/competitions');
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Error submitting match form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div>
        <label htmlFor="competitionId" className="block text-sm font-medium text-gray-700">
          Compétition *
        </label>
        <Select
          id="competitionId"
          name="competitionId"
          value={formData.competitionId}
          onChange={handleChange}
          required
          className="mt-1 block w-full"
          options={[
            { value: '', label: 'Sélectionnez une compétition' },
            ...(competitions || []).map(comp => ({ 
              value: comp.id, 
              label: comp.name 
            }))
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="homeTeamId" className="block text-sm font-medium text-gray-700">
            Équipe à domicile *
          </label>
          <Select
            id="homeTeamId"
            name="homeTeamId"
            value={formData.homeTeamId}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
            options={[
              { value: '', label: 'Sélectionnez une équipe' },
              ...(teams || []).map(team => ({ 
                value: team.id, 
                label: team.name 
              }))
            ]}
          />
        </div>

        <div>
          <label htmlFor="awayTeamId" className="block text-sm font-medium text-gray-700">
            Équipe à l'extérieur *
          </label>
          <Select
            id="awayTeamId"
            name="awayTeamId"
            value={formData.awayTeamId}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
            options={[
              { value: '', label: 'Sélectionnez une équipe' },
              ...(teams || [])
                .filter(team => team.id !== formData.homeTeamId)
                .map(team => ({ 
                  value: team.id, 
                  label: team.name 
                }))
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date *
          </label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Heure *
          </label>
          <Input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Lieu
        </label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Lieu du match"
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Statut
        </label>
        <Select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full"
          options={[
            { value: 'scheduled', label: 'Programmé' },
            { value: 'live', label: 'En cours' },
            { value: 'completed', label: 'Terminé' },
            { value: 'postponed', label: 'Reporté' },
            { value: 'cancelled', label: 'Annulé' },
          ]}
        />
      </div>

      {(formData.status === 'live' || formData.status === 'completed') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="homeScore" className="block text-sm font-medium text-gray-700">
              Score équipe domicile
            </label>
            <Input
              id="homeScore"
              name="homeScore"
              type="number"
              min="0"
              value={formData.homeScore}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <label htmlFor="awayScore" className="block text-sm font-medium text-gray-700">
              Score équipe extérieure
            </label>
            <Input
              id="awayScore"
              name="awayScore"
              type="number"
              min="0"
              value={formData.awayScore}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
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
          type="submit" 
          disabled={loading}
        >
          {loading ? 'En cours...' : isEditing ? 'Mettre à jour' : 'Créer le match'}
        </Button>
      </div>
    </form>
  );
}