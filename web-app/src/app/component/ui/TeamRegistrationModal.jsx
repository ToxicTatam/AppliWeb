import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Select from '../ui/Select';

export default function TeamRegistrationModal({ 
  isOpen, 
  onClose, 
  teams = [], 
  competitionId, 
  onRegister 
}) {
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!selectedTeamId) {
      setError('Veuillez sélectionner une équipe');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onRegister({
        teamId: selectedTeamId,
        competitionId
      });
      onClose();
    } catch (err) {
      setError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
      console.error('Error registering team:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSelectedTeamId(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Inscrire une équipe à la compétition"
    >
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
        )}
        
        <div>
          <label htmlFor="teamId" className="block text-sm font-medium text-gray-700 mb-1">
            Sélectionnez une équipe
          </label>
          <Select
            id="teamId"
            name="teamId"
            value={selectedTeamId}
            onChange={handleChange}
            options={[
              { value: '', label: 'Choisir une équipe' },
              ...teams.map(team => ({ 
                value: team.id, 
                label: team.name 
              }))
            ]}
            className="w-full"
          />
        </div>
        
        <div className="pt-4 flex justify-end space-x-3">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleRegister} 
            disabled={loading}
          >
            {loading ? 'En cours...' : 'Inscrire'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}