"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@/component/ui/Card';
import {Button} from '@/component/ui/Button';
import Table from '@/component/ui/Table';
import Input from '@/component/ui/Input';
import Select from '@/component/ui/Select';
import Alert from '@/component/ui/Alert';
import Modal from '@/component/ui/Modal';
import { useAuth } from '@/hooks/useAuth';

export default function PlayersManagement() {
  const { user } = useAuth();
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Form states for adding a player
  const [newPlayer, setNewPlayer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    teamId: '',
    position: '',
    licenseNumber: '',
  });

  // License management state
  const [licenseInfo, setLicenseInfo] = useState({
    licenseNumber: '',
    startDate: '',
    endDate: '',
    status: 'active',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch coach's teams
        const teamsResponse = await fetch(`/api/coach/teams?coachId=${user?.id}`);
        const teamsData = await teamsResponse.json();
        setTeams(teamsData);

        // Fetch all players from coach's teams
        const playersResponse = await fetch(`/api/coach/players?coachId=${user?.id}`);
        const playersData = await playersResponse.json();
        setPlayers(playersData);
        setFilteredPlayers(playersData);

        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Une erreur est survenue lors du chargement des données.");
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    // Filter players based on search term and team filter
    let filtered = players;
    
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(player => 
        player.firstName.toLowerCase().includes(term) || 
        player.lastName.toLowerCase().includes(term) ||
        player.email.toLowerCase().includes(term)
      );
    }
    
    if (teamFilter !== 'all') {
      filtered = filtered.filter(player => player.teamId === teamFilter);
    }
    
    setFilteredPlayers(filtered);
  }, [searchTerm, teamFilter, players]);

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/coach/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newPlayer,
          coachId: user.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add player');
      }

      const addedPlayer = await response.json();
      setPlayers([...players, addedPlayer]);
      setShowAddPlayerModal(false);
      setNewPlayer({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        teamId: '',
        position: '',
        licenseNumber: '',
      });
    } catch (err) {
      console.error("Error adding player:", err);
      setError("Une erreur est survenue lors de l'ajout du joueur.");
    }
  };

  const handleUpdateLicense = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/coach/players/${selectedPlayer.id}/license`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...licenseInfo,
          playerId: selectedPlayer.id,
          coachId: user.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update license');
      }

      // Update the player in the state
      const updatedPlayers = players.map(player => 
        player.id === selectedPlayer.id 
          ? { ...player, licenseNumber: licenseInfo.licenseNumber, licenseStatus: licenseInfo.status }
          : player
      );
      
      setPlayers(updatedPlayers);
      setShowLicenseModal(false);
    } catch (err) {
      console.error("Error updating license:", err);
      setError("Une erreur est survenue lors de la mise à jour de la licence.");
    }
  };

  const openLicenseModal = (player) => {
    setSelectedPlayer(player);
    setLicenseInfo({
      licenseNumber: player.licenseNumber || '',
      startDate: player.licenseStartDate || '',
      endDate: player.licenseEndDate || '',
      status: player.licenseStatus || 'active',
    });
    setShowLicenseModal(true);
  };

  if (isLoading) return <div className="text-center p-4">Chargement des données...</div>;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Joueurs</h1>
        <Button onClick={() => setShowAddPlayerModal(true)}>Ajouter un joueur</Button>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Rechercher un joueur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="md:w-1/3">
            <Select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="w-full"
            >
              <option value="all">Toutes les équipes</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </Select>
          </div>
        </div>

        {filteredPlayers.length > 0 ? (
          <Table
            columns={[
              { header: 'Nom', accessor: 'lastName' },
              { header: 'Prénom', accessor: 'firstName' },
              { header: 'Email', accessor: 'email' },
              { header: 'Équipe', 
                accessor: 'teamName',
                cell: (row) => {
                  const team = teams.find(t => t.id === row.teamId);
                  return team ? team.name : '-';
                }
              },
              { header: 'Position', accessor: 'position' },
              { header: 'Licence', 
                accessor: 'licenseStatus',
                cell: (row) => (
                  <div className="flex items-center">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      row.licenseStatus === 'active' ? 'bg-green-500' : 
                      row.licenseStatus === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                    {row.licenseNumber || 'Non attribuée'}
                  </div>
                )
              },
              { header: 'Actions', 
                accessor: 'actions',
                cell: (row) => (
                  <div className="flex gap-2">
                    <Link href={`/dashboard/players/${row.id}`}>
                      <Button size="xs">Voir</Button>
                    </Link>
                    <Button 
                      size="xs" 
                      variant="primary"
                      onClick={() => openLicenseModal(row)}
                    >
                      Licence
                    </Button>
                  </div>
                )
              },
            ]}
            data={filteredPlayers}
          />
        ) : (
          <p>Aucun joueur trouvé.</p>
        )}
      </Card>

      {/* Add Player Modal */}
      {showAddPlayerModal && (
        <Modal
          title="Ajouter un joueur"
          onClose={() => setShowAddPlayerModal(false)}
          isOpen={showAddPlayerModal}
        >
          <form onSubmit={handleAddPlayer} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block mb-1">Prénom</label>
                <Input
                  id="firstName"
                  type="text"
                  value={newPlayer.firstName}
                  onChange={(e) => setNewPlayer({...newPlayer, firstName: e.target.value})}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-1">Nom</label>
                <Input
                  id="lastName"
                  type="text"
                  value={newPlayer.lastName}
                  onChange={(e) => setNewPlayer({...newPlayer, lastName: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <Input
                id="email"
                type="email"
                value={newPlayer.email}
                onChange={(e) => setNewPlayer({...newPlayer, email: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label htmlFor="birthDate" className="block mb-1">Date de naissance</label>
              <Input
                id="birthDate"
                type="date"
                value={newPlayer.birthDate}
                onChange={(e) => setNewPlayer({...newPlayer, birthDate: e.target.value})}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="team" className="block mb-1">Équipe</label>
                <Select
                  id="team"
                  value={newPlayer.teamId}
                  onChange={(e) => setNewPlayer({...newPlayer, teamId: e.target.value})}
                  required
                >
                  <option value="">Sélectionner une équipe</option>
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label htmlFor="position" className="block mb-1">Position</label>
                <Input
                  id="position"
                  type="text"
                  value={newPlayer.position}
                  onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="licenseNumber" className="block mb-1">Numéro de licence (optionnel)</label>
              <Input
                id="licenseNumber"
                type="text"
                value={newPlayer.licenseNumber}
                onChange={(e) => setNewPlayer({...newPlayer, licenseNumber: e.target.value})}
              />
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="secondary" onClick={() => setShowAddPlayerModal(false)}>
                Annuler
              </Button>
              <Button type="submit">
                Ajouter
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* License Modal */}
      {showLicenseModal && selectedPlayer && (
        <Modal
          title={`Gestion de la licence - ${selectedPlayer.firstName} ${selectedPlayer.lastName}`}
          onClose={() => setShowLicenseModal(false)}
          isOpen={showLicenseModal}
        >
          <form onSubmit={handleUpdateLicense} className="space-y-4">
            <div>
              <label htmlFor="licenseNumber" className="block mb-1">Numéro de licence</label>
              <Input
                id="licenseNumber"
                type="text"
                value={licenseInfo.licenseNumber}
                onChange={(e) => setLicenseInfo({...licenseInfo, licenseNumber: e.target.value})}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block mb-1">Date de début</label>
                <Input
                  id="startDate"
                  type="date"
                  value={licenseInfo.startDate}
                  onChange={(e) => setLicenseInfo({...licenseInfo, startDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block mb-1">Date de fin</label>
                <Input
                  id="endDate"
                  type="date"
                  value={licenseInfo.endDate}
                  onChange={(e) => setLicenseInfo({...licenseInfo, endDate: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="status" className="block mb-1">Statut</label>
              <Select
                id="status"
                value={licenseInfo.status}
                onChange={(e) => setLicenseInfo({...licenseInfo, status: e.target.value})}
              >
                <option value="active">Active</option>
                <option value="pending">En attente</option>
                <option value="expired">Expirée</option>
                <option value="revoked">Révoquée</option>
              </Select>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                type="button" 
                variant="danger" 
                onClick={async () => {
                  try {
                    await fetch(`/api/coach/players/${selectedPlayer.id}/license`, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        playerId: selectedPlayer.id,
                        coachId: user.id
                      }),
                    });
                    
                    const updatedPlayers = players.map(player => 
                      player.id === selectedPlayer.id 
                        ? { ...player, licenseNumber: null, licenseStatus: 'revoked' }
                        : player
                    );
                    
                    setPlayers(updatedPlayers);
                    setShowLicenseModal(false);
                  } catch (err) {
                    console.error("Error removing license:", err);
                    setError("Une erreur est survenue lors de la suppression de la licence.");
                  }
                }}
              >
                Retirer la licence
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowLicenseModal(false)}>
                Annuler
              </Button>
              <Button type="submit">
                Mettre à jour
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}