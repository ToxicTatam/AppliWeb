import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

export default function TeamForm({ team, onSubmit, isEditing = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: team?.name || '',
    category: team?.category || '',
    description: team?.description || '',
    logoUrl: team?.logo || '',
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
    if (!formData.name || !formData.category) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
      router.push('/dashboard/coach/teams');
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Error submitting team form:', err);
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
          Nom de l'équipe *
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Entrez le nom de l'équipe"
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Catégorie *
        </label>
        <Select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
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
          placeholder="Description de l'équipe"
        />
      </div>

      <div>
        <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
          URL du logo
        </label>
        <Input
          id="logoUrl"
          name="logoUrl"
          value={formData.logoUrl}
          onChange={handleChange}
          placeholder="https://example.com/logo.png"
          className="mt-1 block w-full"
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
          {loading ? 'En cours...' : isEditing ? 'Mettre à jour' : 'Créer l\'équipe'}
        </Button>
      </div>
    </form>
  );
}