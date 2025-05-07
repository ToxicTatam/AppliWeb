import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

export default function PlayerForm({ player = {}, onSubmit, isEditing = false, teamOptions = [] }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: player?.firstName || '',
    lastName: player?.lastName || '',
    email: player?.email || '',
    phoneNumber: player?.phoneNumber || '',
    dateOfBirth: player?.dateOfBirth || '',
    position: player?.position || '',
    jerseyNumber: player?.jerseyNumber || '',
    teamId: player?.teamId || (teamOptions.length > 0 ? teamOptions[0].value : ''),
    height: player?.height || '',
    weight: player?.weight || '',
    licenseNumber: player?.licenseNumber || '',
    licenseExpiry: player?.licenseExpiry || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.dateOfBirth) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!formData.teamId) {
      setError('Veuillez sélectionner une équipe');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Error submitting player form:', err);
    } finally {
      setLoading(false);
    }
  };

  const positions = [
    { value: '', label: 'Sélectionnez une position' },
    // Football
    { value: 'goalkeeper', label: 'Gardien de but' },
    { value: 'defender', label: 'Défenseur' },
    { value: 'midfielder', label: 'Milieu de terrain' },
    { value: 'forward', label: 'Attaquant' },
    // Basketball
    { value: 'pointGuard', label: 'Meneur de jeu' },
    { value: 'shootingGuard', label: 'Arrière' },
    { value: 'smallForward', label: 'Ailier' },
    { value: 'powerForward', label: 'Ailier fort' },
    { value: 'center', label: 'Pivot' },
    // Volleyball
    { value: 'setter', label: 'Passeur' },
    { value: 'outsideHitter', label: 'Attaquant de côté' },
    { value: 'middleBlocker', label: 'Attaquant central' },
    { value: 'libero', label: 'Libéro' },
    // Handball
    { value: 'hanballGoalkeeper', label: 'Gardien de but (Handball)' },
    { value: 'pivot', label: 'Pivot (Handball)' },
    { value: 'wingPlayer', label: 'Ailier' },
    { value: 'backPlayer', label: 'Arrière' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Prénom *
          </label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Prénom"
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Nom *
          </label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Nom"
            className="mt-1 block w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="email@example.com"
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Numéro de téléphone
          </label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+33612345678"
            className="mt-1 block w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date de naissance *
          </label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label htmlFor="teamId" className="block text-sm font-medium text-gray-700">
            Équipe *
          </label>
          <Select
            id="teamId"
            name="teamId"
            value={formData.teamId}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
            options={teamOptions.length > 0 ? teamOptions : [{ value: '', label: 'Aucune équipe disponible' }]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <Select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 block w-full"
            options={positions}
          />
        </div>

        <div>
          <label htmlFor="jerseyNumber" className="block text-sm font-medium text-gray-700">
            Numéro de maillot
          </label>
          <Input
            id="jerseyNumber"
            name="jerseyNumber"
            type="number"
            min="1"
            max="99"
            value={formData.jerseyNumber}
            onChange={handleChange}
            placeholder="10"
            className="mt-1 block w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Taille (cm)
          </label>
          <Input
            id="height"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            placeholder="180"
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Poids (kg)
          </label>
          <Input
            id="weight"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            placeholder="75"
            className="mt-1 block w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
            Numéro de licence
          </label>
          <Input
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            placeholder="LIC-123456"
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label htmlFor="licenseExpiry" className="block text-sm font-medium text-gray-700">
            Date d'expiration de licence
          </label>
          <Input
            id="licenseExpiry"
            name="licenseExpiry"
            type="date"
            value={formData.licenseExpiry}
            onChange={handleChange}
            className="mt-1 block w-full"
          />
        </div>
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
          {loading ? 'En cours...' : isEditing ? 'Mettre à jour' : 'Ajouter le joueur'}
        </Button>
      </div>
    </form>
  );
}