"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@/app/component/ui/Card';
import Button from '@/app/component/ui/Button';
import Table from '@/app/component/ui/Table';
import Input from '@/app/component/ui/Input';
import Select from '@/app/component/ui/Select';
import Alert from '@/app/component/ui/Alert';
import Modal from '@/app/component/ui/Modal';
import { useAuth } from '@/app/hooks/useAuth';

export default function CoachMedia() {
  const { user } = useAuth();
  const [media, setMedia] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [showEditMediaModal, setShowEditMediaModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  
  // New media form
  const [newMedia, setNewMedia] = useState({
    title: '',
    description: '',
    type: 'image',
    url: '',
    sourceType: 'team',
    sourceId: '',
    competitionId: '',
    matchId: '',
    isPublic: true,
  });
  
  // Edit media form
  const [editMedia, setEditMedia] = useState({
    id: '',
    title: '',
    description: '',
    type: '',
    url: '',
    sourceType: '',
    sourceId: '',
    competitionId: '',
    matchId: '',
    isPublic: true,
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
        
        // Fetch competitions where coach's teams are registered
        const competitionsResponse = await fetch(`/api/coach/competitions/registered?coachId=${user?.id}`);
        const competitionsData = await competitionsResponse.json();
        setCompetitions(competitionsData);
        
        // Fetch matches for coach's teams
        const matchesResponse = await fetch(`/api/coach/matches?coachId=${user?.id}`);
        const matchesData = await matchesResponse.json();
        setMatches(matchesData);
        
        // Fetch media for coach's teams and players
        const mediaResponse = await fetch(`/api/coach/media?coachId=${user?.id}`);
        const mediaData = await mediaResponse.json();
        setMedia(mediaData);
        setFilteredMedia(mediaData);
        
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
    // Filter media based on search term and filters
    let filtered = media;
    
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term)
      );
    }
    
    if (dateFilter !== '') {
      filtered = filtered.filter(item => {
        const mediaDate = new Date(item.createdAt).toISOString().split('T')[0];
        return mediaDate === dateFilter;
      });
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter);
    }
    
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(item => item.sourceType === sourceFilter);
    }
    
    setFilteredMedia(filtered);
  }, [searchTerm, dateFilter, typeFilter, sourceFilter, media]);

  const handleAddMedia = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/coach/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newMedia,
          coachId: user.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add media');
      }

      const addedMedia = await response.json();
      setMedia([...media, addedMedia]);
      setShowAddMediaModal(false);
      setNewMedia({
        title: '',
        description: '',
        type: 'image',
        url: '',
        sourceType: 'team',
        sourceId: '',
        competitionId: '',
        matchId: '',
        isPublic: true,
      });
    } catch (err) {
      console.error("Error adding media:", err);
      setError("Une erreur est survenue lors de l'ajout du média.");
    }
  };

  const handleEditMedia = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/coach/media/${editMedia.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editMedia,
          coachId: user.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update media');
      }

      // Update the media in the state
      const updatedMedia = await response.json();
      setMedia(media.map(item => item.id === updatedMedia.id ? updatedMedia : item));
      setShowEditMediaModal(false);
    } catch (err) {
      console.error("Error updating media:", err);
      setError("Une erreur est survenue lors de la mise à jour du média.");
    }
  };

  const handleDeleteMedia = async () => {
    try {
      const response = await fetch(`/api/coach/media/${selectedMedia.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coachId: user.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete media');
      }

      // Remove the media from the state
      setMedia(media.filter(item => item.id !== selectedMedia.id));
      setShowDeleteConfirmModal(false);
    } catch (err) {
      console.error("Error deleting media:", err);
      setError("Une erreur est survenue lors de la suppression du média.");
    }
  };

  const openEditMediaModal = (item) => {
    setEditMedia({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type,
      url: item.url,
      sourceType: item.sourceType,
      sourceId: item.sourceId,
      competitionId: item.competitionId || '',
      matchId: item.matchId || '',
      isPublic: item.isPublic,
    });
    setShowEditMediaModal(true);
  };

  const openDeleteConfirmModal = (item) => {
    setSelectedMedia(item);
    setShowDeleteConfirmModal(true);
  };

  // Helper function to get source name based on type and ID
  const getSourceName = (sourceType, sourceId) => {
    if (sourceType === 'team') {
      const team = teams.find(t => t.id === sourceId);
      return team ? team.name : 'Équipe inconnue';
    } else if (sourceType === 'player') {
      const player = players.find(p => p.id === sourceId);
      return player ? `${player.firstName} ${player.lastName}` : 'Joueur inconnu';
    } else if (sourceType === 'match') {
      const match = matches.find(m => m.id === sourceId);
      return match ? `Match #${match.id}` : 'Match inconnu';
    } else if (sourceType === 'competition') {
      const competition = competitions.find(c => c.id === sourceId);
      return competition ? competition.name : 'Compétition inconnue';
    }
    return 'Source inconnue';
  };

  if (isLoading) return <div className="text-center p-4">Chargement des données...</div>;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion de la Médiathèque</h1>
        <Button onClick={() => setShowAddMediaModal(true)}>Ajouter un média</Button>
      </div>

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <Input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full"
            >
              <option value="all">Tous les types</option>
              <option value="image">Image</option>
              <option value="video">Vidéo</option>
              <option value="document">Document</option>
              <option value="other">Autre</option>
            </Select>
          </div>
          <div>
            <Select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full"
            >
              <option value="all">Toutes les sources</option>
              <option value="team">Équipe</option>
              <option value="player">Joueur</option>
              <option value="match">Match</option>
              <option value="competition">Compétition</option>
            </Select>
          </div>
        </div>

        {filteredMedia.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMedia.map(item => (
              <Card key={item.id} className="border-t-4 border-blue-500 overflow-hidden">
                <div className="relative">
                  {item.type === 'image' && (
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-48 object-cover" 
                    />
                  )}
                  {item.type === 'video' && (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  {item.type === 'document' && (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                  <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                    item.isPublic ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.isPublic ? 'Public' : 'Privé'}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.type === 'image' ? 'bg-blue-100 text-blue-800' : 
                      item.type === 'video' ? 'bg-purple-100 text-purple-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Source: {getSourceName(item.sourceType, item.sourceId)}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex mt-4 gap-2">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Button size="sm">Voir</Button>
                    </a>
                    <Button size="sm" variant="secondary" onClick={() => openEditMediaModal(item)}>
                      Modifier
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => openDeleteConfirmModal(item)}>
                      Supprimer
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p>Aucun média trouvé. <Button size="sm" onClick={() => setShowAddMediaModal(true)}>Ajouter un média</Button></p>
        )}
      </Card>

      {/* Add Media Modal */}
      {showAddMediaModal && (
        <Modal
          title="Ajouter un média"
          onClose={() => setShowAddMediaModal(false)}
          isOpen={showAddMediaModal}
        >
          <form onSubmit={handleAddMedia} className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-1">Titre</label>
              <Input
                id="title"
                type="text"
                value={newMedia.title}
                onChange={(e) => setNewMedia({...newMedia, title: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block mb-1">Description</label>
              <Input
                id="description"
                type="text"
                value={newMedia.description}
                onChange={(e) => setNewMedia({...newMedia, description: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block mb-1">Type de média</label>
              <Select
                id="type"
                value={newMedia.type}
                onChange={(e) => setNewMedia({...newMedia, type: e.target.value})}
                required
              >
                <option value="image">Image</option>
                <option value="video">Vidéo</option>
                <option value="document">Document</option>
                <option value="other">Autre</option>
              </Select>
            </div>
            
            <div>
              <label htmlFor="url" className="block mb-1">URL</label>
              <Input
                id="url"
                type="url"
                value={newMedia.url}
                onChange={(e) => setNewMedia({...newMedia, url: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label htmlFor="sourceType" className="block mb-1">Type de source</label>
              <Select
                id="sourceType"
                value={newMedia.sourceType}
                onChange={(e) => setNewMedia({...newMedia, sourceType: e.target.value})}
                required
              >
                <option value="team">Équipe</option>
                <option value="player">Joueur</option>
                <option value="match">Match</option>
                <option value="competition">Compétition</option>
              </Select>
            </div>
            
            {newMedia.sourceType === 'team' && (
              <div>
                <label htmlFor="sourceId" className="block mb-1">Équipe</label>
                <Select
                  id="sourceId"
                  value={newMedia.sourceId}
                  onChange={(e) => setNewMedia({...newMedia, sourceId: e.target.value})}
                  required
                >
                  <option value="">Sélectionner une équipe</option>
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </Select>
              </div>
            )}
            
            {newMedia.sourceType === 'player' && (
              <div>
                <label htmlFor="sourceId" className="block mb-1">Joueur</label>
                <Select
                  id="sourceId"
                  value={newMedia.sourceId}
                  onChange={(e) => setNewMedia({...newMedia, sourceId: e.target.value})}
                  required
                >
                  <option value="">Sélectionner un joueur</option>
                  {players.map(player => (
                    <option key={player.id} value={player.id}>{player.firstName} {player.lastName}</option>
                  ))}
                </Select>
              </div>
            )}
            
            {newMedia.sourceType === 'match' && (
              <div>
                <label htmlFor="sourceId" className="block mb-1">Match</label>
                <Select
                  id="sourceId"
                  value={newMedia.sourceId}
                  onChange={(e) => setNewMedia({...newMedia, sourceId: e.target.value})}
                  required
                >
                  <option value="">Sélectionner un match</option>
                  {matches.map(match => (
                    <option key={match.id} value={match.id}>
                      {match.teamHome} vs {match.teamAway} ({new Date(match.date).toLocaleDateString()})
                    </option>
                  ))}
                </Select>
              </div>
            )}
            
            {newMedia.sourceType === 'competition' && (
              <div>
                <label htmlFor="sourceId" className="block mb-1">Compétition</label>
                <Select
                  id="sourceId"
                  value={newMedia.sourceId}
                  onChange={(e) => setNewMedia({...newMedia, sourceId: e.target.value})}
                  required
                >
                  <option value="">Sélectionner une compétition</option>
                  {competitions.map(comp => (
                    <option key={comp.id} value={comp.id}>{comp.name}</option>
                  ))}
                </Select>
              </div>
            )}
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newMedia.isPublic}
                  onChange={(e) => setNewMedia({...newMedia, isPublic: e.target.checked})}
                  className="mr-2"
                />
                <span>Rendre public</span>
              </label>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="secondary" onClick={() => setShowAddMediaModal(false)}>
                Annuler
              </Button>
              <Button type="submit">
                Ajouter
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Media Modal */}
      {showEditMediaModal && (
        <Modal
          title="Modifier le média"
          onClose={() => setShowEditMediaModal(false)}
          isOpen={showEditMediaModal}
        >
          <form onSubmit={handleEditMedia} className="space-y-4">
            <div>
              <label htmlFor="editTitle" className="block mb-1">Titre</label>
              <Input
                id="editTitle"
                type="text"
                value={editMedia.title}
                onChange={(e) => setEditMedia({...editMedia, title: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label htmlFor="editDescription" className="block mb-1">Description</label>
              <Input
                id="editDescription"
                type="text"
                value={editMedia.description}
                onChange={(e) => setEditMedia({...editMedia, description: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="editType" className="block mb-1">Type de média</label>
              <Select
                id="editType"
                value={editMedia.type}
                onChange={(e) => setEditMedia({...editMedia, type: e.target.value})}
                required
              >
                <option value="image">Image</option>
                <option value="video">Vidéo</option>
                <option value="document">Document</option>
                <option value="other">Autre</option>
              </Select>
            </div>
            
            <div>
              <label htmlFor="editUrl" className="block mb-1">URL</label>
              <Input
                id="editUrl"
                type="url"
                value={editMedia.url}
                onChange={(e) => setEditMedia({...editMedia, url: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editMedia.isPublic}
                  onChange={(e) => setEditMedia({...editMedia, isPublic: e.target.checked})}
                  className="mr-2"
                />
                <span>Rendre public</span>
              </label>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="secondary" onClick={() => setShowEditMediaModal(false)}>
                Annuler
              </Button>
              <Button type="submit">
                Mettre à jour
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && selectedMedia && (
        <Modal
          title="Confirmer la suppression"
          onClose={() => setShowDeleteConfirmModal(false)}
          isOpen={showDeleteConfirmModal}
        >
          <div className="space-y-4">
            <p>Êtes-vous sûr de vouloir supprimer "{selectedMedia.title}"?</p>
            <p className="text-sm text-gray-500">Cette action est irréversible.</p>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="secondary" onClick={() => setShowDeleteConfirmModal(false)}>
                Annuler
              </Button>
              <Button type="button" variant="danger" onClick={handleDeleteMedia}>
                Supprimer
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}