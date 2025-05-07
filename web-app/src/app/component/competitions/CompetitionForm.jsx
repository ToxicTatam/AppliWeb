import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

export default function CompetitionForm({ competition, onSubmit, isEditing = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: competition?.name || '',
    sport: competition?.sport || '',
    startDate: competition?.startDate ? new Date(competition.startDate).toISOString().split('T')[0] : '',
    endDate: competition?.endDate ? new Date(competition.endDate).toISOString().split('T')[0] : '',
    location: competition?.location || '',
    category: competition?.category || '',
    description: competition?.description || '',
    status: competition?.status || 'upcoming',
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
    if (!formData.name || !formData.sport || !formData.startDate || !formData.endDate) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Vérifier que la date de fin est postérieure à la date de début
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setError('La date de fin doit être postérieure à la date de début');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
      router.push('/dashboard/organizer/competitions');
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Error submitting competition form:', err);
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom de la compétition *
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Entrez le nom de la compétition"
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label htmlFor="sport" className="block text-sm font-medium text-gray-700">
          Sport *
        </label>
        <Select
          id="sport"
          name="sport"
          value={formData.sport}
          onChange={handleChange}
          required
          className="mt-1 block w-full"
          options={[
            { value: '', label: 'Sélectionnez un sport' },
            { value: 'football', label: 'Football' },
            { value: 'basketball', label: 'Basketball' },
            { value: 'volleyball', label: 'Volleyball' },
            { value: 'handball', label: 'Handball' },
            { value: 'rugby', label: 'Rugby' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Date de début *
          </label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            Date de fin *
          </label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
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
          placeholder="Lieu de la compétition"
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Catégorie
        </label>
        <Select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full"
          options={[
            { value: '', label: 'Sélectionnez une catégorie' },
            { value: 'senior', label: 'Senior' },
            { value: 'u21', label: 'U21' },
            { value: 'u18', label: 'U18' },
            { value: 'u16', label: 'U16' },
            { value: 'u14', label: 'U14' },
          ]}
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
            { value: 'upcoming', label: 'À venir' },
            { value: 'ongoing', label: 'En cours' },
            { value: 'completed', label: 'Terminée' },
            { value: 'cancelled', label: 'Annulée' },
          ]}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Description de la compétition"
        />
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
          disabled={loading}
        >
          {loading ? 'En cours...' : isEditing ? 'Mettre à jour' : 'Créer la compétition'}
        </Button>
      </div>
    </form>
  );
}