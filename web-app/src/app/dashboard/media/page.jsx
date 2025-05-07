'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

export default function MediaLibrary() {
  const { user } = useAuth();
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    competitionId: '',
    matchId: '',
    startDate: '',
    endDate: ''
  });
  const [competitions, setCompetitions] = useState([]);
  const [matches, setMatches] = useState([]);

  // Types de média
  const mediaTypes = [
    { value: '', label: 'Tous les types' },
    { value: 'IMAGE', label: 'Images' },
    { value: 'VIDEO', label: 'Vidéos' },
    { value: 'DOCUMENT', label: 'Documents' }
  ];

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        // Simuler la récupération des compétitions
        const competitionsData = [
          { id: 1, name: 'Championnat National 2025' },
          { id: 2, name: 'Coupe Régionale 2025' },
          { id: 3, name: 'Tournoi Inter-clubs' }
        ];
        setCompetitions(competitionsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des compétitions:', error);
      }
    };

    const fetchMatches = async () => {
      try {
        // Simuler la récupération des matchs
        const matchesData = [
          { id: 1, name: 'FC Barcelona vs Real Madrid', date: '2025-05-10' },
          { id: 2, name: 'Manchester United vs Liverpool', date: '2025-05-05' },
          { id: 3, name: 'PSG vs Marseille', date: '2025-05-12' }
        ];
        setMatches(matchesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des matchs:', error);
      }
    };

    fetchCompetitions();
    fetchMatches();
  }, []);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        // Simuler l'appel à l'API avec les filtres
        // Dans une implémentation réelle, vous utiliseriez mediaService avec les filtres appropriés
        
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées pour les médias
        const mediaData = [
          { 
            id: 1, 
            title: 'Action de jeu remarquable', 
            type: 'VIDEO', 
            url: 'https://example.com/videos/action1.mp4', 
            thumbnailUrl: 'https://via.placeholder.com/300x200',
            uploadedBy: 'Coach Martin',
            uploadDate: '2025-05-01',
            competitionName: 'Championnat National 2025',
            matchName: 'FC Barcelona vs Real Madrid'
          },
          { 
            id: 2, 
            title: 'Photo d\'équipe', 
            type: 'IMAGE', 
            url: 'https://example.com/images/team-photo.jpg', 
            thumbnailUrl: 'https://via.placeholder.com/300x200',
            uploadedBy: 'Joueur Thomas',
            uploadDate: '2025-04-28',
            competitionName: 'Coupe Régionale 2025',
            matchName: null
          },
          { 
            id: 3, 
            title: 'Rapport d\'analyse', 
            type: 'DOCUMENT', 
            url: 'https://example.com/docs/analysis.pdf', 
            thumbnailUrl: 'https://via.placeholder.com/300x200',
            uploadedBy: 'Analyste Sarah',
            uploadDate: '2025-04-30',
            competitionName: 'Tournoi Inter-clubs',
            matchName: 'Manchester United vs Liverpool'
          },
          { 
            id: 4, 
            title: 'Highlights du match', 
            type: 'VIDEO', 
            url: 'https://example.com/videos/highlights.mp4', 
            thumbnailUrl: 'https://via.placeholder.com/300x200',
            uploadedBy: 'Organisateur Philippe',
            uploadDate: '2025-05-02',
            competitionName: 'Championnat National 2025',
            matchName: 'PSG vs Marseille'
          }
        ];
        
        // Appliquer les filtres (simulation)
        let filteredData = [...mediaData];
        
        if (filters.type) {
          filteredData = filteredData.filter(item => item.type === filters.type);
        }
        
        if (filters.competitionId) {
          const competitionName = competitions.find(c => c.id.toString() === filters.competitionId)?.name;
          filteredData = filteredData.filter(item => item.competitionName === competitionName);
        }
        
        if (filters.matchId) {
          const matchName = matches.find(m => m.id.toString() === filters.matchId)?.name;
          filteredData = filteredData.filter(item => item.matchName === matchName);
        }
        
        if (filters.startDate && filters.endDate) {
          const start = new Date(filters.startDate);
          const end = new Date(filters.endDate);
          filteredData = filteredData.filter(item => {
            const itemDate = new Date(item.uploadDate);
            return itemDate >= start && itemDate <= end;
          });
        }
        
        setMediaItems(filteredData);
      } catch (error) {
        console.error('Erreur lors de la récupération des médias:', error);
        setError('Impossible de charger les médias. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [filters, competitions, matches]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      competitionId: '',
      matchId: '',
      startDate: '',
      endDate: ''
    });
  };

  // Fonction pour déterminer si l'utilisateur peut ajouter des médias
  const canAddMedia = () => {
    if (!user) return false;
    
    // Admin, Coach et Organisateur peuvent ajouter des médias
    return ['ADMIN', 'COACH', 'ORGANIZER', 'PLAYER'].includes(user.role);
  };

  // Fonction pour déterminer si l'utilisateur peut modifier/supprimer un média
  const canEditMedia = (mediaItem) => {
    if (!user) return false;
    
    // Admin peut tout modifier
    if (user.role === 'ADMIN') return true;
    
    // Coach peut modifier les médias qu'il a ajoutés ou ceux ajoutés par ses joueurs
    if (user.role === 'COACH') {
      // Dans une implémentation réelle, vous vérifieriez si le média est ajouté par le coach ou ses joueurs
      return mediaItem.uploadedBy === 'Coach Martin' || mediaItem.uploadedBy === 'Joueur Thomas';
    }
    
    // Organisateur peut modifier les médias liés à ses compétitions
    if (user.role === 'ORGANIZER') {
      // Dans une implémentation réelle, vérifiez si la compétition appartient à l'organisateur
      return mediaItem.competitionName === 'Championnat National 2025' || mediaItem.competitionName === 'Tournoi Inter-clubs';
    }
    
    // Joueur peut modifier ses propres médias
    if (user.role === 'PLAYER') {
      return mediaItem.uploadedBy === 'Joueur Thomas';
    }
    
    return false;
  };

  const handleOpenMedia = (media) => {
    // Dans une implémentation réelle, vous ouvririez le média selon son type
    window.open(media.url, '_blank');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Médiathèque</h1>
        {canAddMedia() && (
          <Link 
            href="/dashboard/media/add" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Ajouter un média
          </Link>
        )}
      </div>

      {/* Filtres */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
        <div className="md:grid md:grid-cols-6 md:gap-6">
          <div className="md:col-span-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Filtres</h3>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type de média
                </label>
                <select
                  id="type"
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {mediaTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="competitionId" className="block text-sm font-medium text-gray-700">
                  Compétition
                </label>
                <select
                  id="competitionId"
                  name="competitionId"
                  value={filters.competitionId}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Toutes les compétitions</option>
                  {competitions.map(competition => (
                    <option key={competition.id} value={competition.id}>{competition.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="matchId" className="block text-sm font-medium text-gray-700">
                  Match
                </label>
                <select
                  id="matchId"
                  name="matchId"
                  value={filters.matchId}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Tous les matchs</option>
                  {matches.map(match => (
                    <option key={match.id} value={match.id}>{match.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Date de début
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  Date de fin
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2 flex items-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des médias */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : mediaItems.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="mt-2 text-sm text-gray-600">Aucun média trouvé avec les filtres actuels.</p>
          <p className="mt-1 text-sm text-gray-500">Essayez de modifier vos critères de recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mediaItems.map((media) => (
            <div key={media.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="relative">
                <div 
                  className="h-48 bg-gray-100 flex items-center justify-center cursor-pointer"
                  onClick={() => handleOpenMedia(media)}
                >
                  {media.type === 'VIDEO' ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={media.thumbnailUrl} 
                        alt={media.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="h-12 w-12 text-white opacity-75" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  ) : media.type === 'IMAGE' ? (
                    <img 
                      src={media.thumbnailUrl} 
                      alt={media.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <svg className="h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="mt-2 text-sm text-gray-500">Document</span>
                    </div>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    media.type === 'VIDEO' ? 'bg-red-100 text-red-800' : 
                    media.type === 'IMAGE' ? 'bg-green-100 text-green-800' : 
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {media.type === 'VIDEO' ? 'Vidéo' : media.type === 'IMAGE' ? 'Image' : 'Document'}
                  </span>
                </div>
              </div>
              
              <div className="px-4 py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 truncate" title={media.title}>
                      {media.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Par {media.uploadedBy} • {media.uploadDate}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {media.competitionName}
                      {media.matchName && ` • ${media.matchName}`}
                    </p>
                  </div>
                  
                  {canEditMedia(media) && (
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/media/edit/${media.id}`}>
                        <svg className="h-5 w-5 text-gray-500 hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button onClick={() => {
                        // Dans une implémentation réelle, vous auriez une confirmation et un appel API pour supprimer
                        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) {
                          console.log('Suppression du média', media.id);
                        }
                      }}>
                        <svg className="h-5 w-5 text-gray-500 hover:text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}