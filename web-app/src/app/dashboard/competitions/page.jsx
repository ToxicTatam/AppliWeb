'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { CompetitionStatus, CompetitionType } from '@/service/model';

export default function CompetitionsPage() {
  const { user } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    searchQuery: ''
  });

  useEffect(() => {
    const fetchCompetitions = async () => {
      setLoading(true);
      try {
        // Dans une implémentation réelle, vous utiliseriez competitionService.getAllCompetitions()
        // Pour cette démonstration, nous utilisons des données simulées
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockCompetitions = [
          {
            id: 1,
            name: 'Championnat National',
            description: 'Championnat national annuel',
            startDate: new Date('2025-06-01'),
            endDate: new Date('2025-08-30'),
            registrationDeadline: new Date('2025-05-15'),
            location: 'Paris',
            maxTeams: 20,
            competitionType: CompetitionType.LEAGUE,
            status: CompetitionStatus.REGISTRATION,
            organizer: { id: 3, firstName: 'Jean', lastName: 'Dupont' },
            teams: [/* ... */],
            createdAt: new Date('2025-01-15')
          },
          {
            id: 2,
            name: 'Tournoi Régional',
            description: 'Tournoi des clubs régionaux',
            startDate: new Date('2025-07-10'),
            endDate: new Date('2025-07-20'),
            registrationDeadline: new Date('2025-06-25'),
            location: 'Lyon',
            maxTeams: 12,
            competitionType: CompetitionType.TOURNAMENT,
            status: CompetitionStatus.UPCOMING,
            organizer: { id: 4, firstName: 'Marie', lastName: 'Laurent' },
            teams: [/* ... */],
            createdAt: new Date('2025-02-20')
          },
          {
            id: 3,
            name: 'Coupe Inter-Écoles',
            description: 'Compétition entre écoles',
            startDate: new Date('2025-04-10'),
            endDate: new Date('2025-05-10'),
            registrationDeadline: new Date('2025-03-25'),
            location: 'Marseille',
            maxTeams: 16,
            competitionType: CompetitionType.CUP,
            status: CompetitionStatus.ONGOING,
            organizer: { id: 5, firstName: 'Pierre', lastName: 'Martin' },
            teams: [/* ... */],
            createdAt: new Date('2025-01-30')
          },
          {
            id: 4,
            name: 'Championnat de Jeunes',
            description: 'Compétition pour les joueurs de moins de 18 ans',
            startDate: new Date('2025-09-05'),
            endDate: new Date('2025-12-15'),
            registrationDeadline: new Date('2025-08-20'),
            location: 'Lille',
            maxTeams: 24,
            competitionType: CompetitionType.LEAGUE,
            status: CompetitionStatus.UPCOMING,
            organizer: { id: 6, firstName: 'Sophie', lastName: 'Petit' },
            teams: [/* ... */],
            createdAt: new Date('2025-03-10')
          },
          {
            id: 5,
            name: 'Tournoi d\'été',
            description: 'Tournoi amical d\'été',
            startDate: new Date('2024-07-15'),
            endDate: new Date('2024-08-05'),
            registrationDeadline: new Date('2024-06-30'),
            location: 'Nice',
            maxTeams: 10,
            competitionType: CompetitionType.TOURNAMENT,
            status: CompetitionStatus.COMPLETED,
            organizer: { id: 7, firstName: 'Lucas', lastName: 'Dubois' },
            teams: [/* ... */],
            createdAt: new Date('2024-05-20')
          },
          {
            id: 6,
            name: 'Coupe Régionale 2024',
            description: 'Coupe régionale annuelle',
            startDate: new Date('2024-10-10'),
            endDate: new Date('2024-11-30'),
            registrationDeadline: new Date('2024-09-25'),
            location: 'Bordeaux',
            maxTeams: 16,
            competitionType: CompetitionType.CUP,
            status: CompetitionStatus.COMPLETED,
            organizer: { id: 8, firstName: 'Emma', lastName: 'Leroy' },
            teams: [/* ... */],
            createdAt: new Date('2024-08-15')
          }
        ];
        
        setCompetitions(mockCompetitions);
      } catch (err) {
        console.error('Erreur lors de la récupération des compétitions:', err);
        setError('Impossible de charger les compétitions. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  // Filtrer les compétitions en fonction des critères
  const filteredCompetitions = competitions.filter(competition => {
    let matchesStatus = true;
    let matchesType = true;
    let matchesSearch = true;

    if (filters.status) {
      matchesStatus = competition.status === filters.status;
    }

    if (filters.type) {
      matchesType = competition.competitionType === filters.type;
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      matchesSearch = 
        competition.name.toLowerCase().includes(query) || 
        competition.description.toLowerCase().includes(query) ||
        competition.location.toLowerCase().includes(query);
    }

    return matchesStatus && matchesType && matchesSearch;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      type: '',
      searchQuery: ''
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case CompetitionStatus.UPCOMING:
        return 'bg-blue-100 text-blue-800';
      case CompetitionStatus.REGISTRATION:
        return 'bg-green-100 text-green-800';
      case CompetitionStatus.ONGOING:
        return 'bg-yellow-100 text-yellow-800';
      case CompetitionStatus.COMPLETED:
        return 'bg-gray-100 text-gray-800';
      case CompetitionStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case CompetitionStatus.UPCOMING:
        return 'À venir';
      case CompetitionStatus.REGISTRATION:
        return 'Inscription en cours';
      case CompetitionStatus.ONGOING:
        return 'En cours';
      case CompetitionStatus.COMPLETED:
        return 'Terminée';
      case CompetitionStatus.CANCELLED:
        return 'Annulée';
      default:
        return status;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case CompetitionType.LEAGUE:
        return 'Championnat';
      case CompetitionType.TOURNAMENT:
        return 'Tournoi';
      case CompetitionType.CUP:
        return 'Coupe';
      default:
        return type;
    }
  };

  // Déterminer si l'utilisateur peut créer une compétition
  const canCreateCompetition = user && (user.role === 'ADMIN' || user.role === 'ORGANIZER');

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Compétitions
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Consultez toutes les compétitions disponibles
          </p>
        </div>
        {canCreateCompetition && (
          <div className="mt-4 flex md:mt-0">
            <Link
              href="/dashboard/organizer/competitions/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Créer une compétition
            </Link>
          </div>
        )}
      </div>

      {/* Filtres */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-6">
        <div className="md:grid md:grid-cols-4 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Filtres</h3>
            <p className="mt-1 text-sm text-gray-500">
              Filtrez les compétitions selon vos critères.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-3">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Statut
                </label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Tous les statuts</option>
                  <option value={CompetitionStatus.UPCOMING}>À venir</option>
                  <option value={CompetitionStatus.REGISTRATION}>Inscription en cours</option>
                  <option value={CompetitionStatus.ONGOING}>En cours</option>
                  <option value={CompetitionStatus.COMPLETED}>Terminée</option>
                  <option value={CompetitionStatus.CANCELLED}>Annulée</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Tous les types</option>
                  <option value={CompetitionType.LEAGUE}>Championnat</option>
                  <option value={CompetitionType.TOURNAMENT}>Tournoi</option>
                  <option value={CompetitionType.CUP}>Coupe</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700">
                  Recherche
                </label>
                <input
                  type="text"
                  name="searchQuery"
                  id="searchQuery"
                  value={filters.searchQuery}
                  onChange={handleFilterChange}
                  placeholder="Nom, description, lieu..."
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="sm:col-span-6 flex justify-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des compétitions */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
      ) : filteredCompetitions.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M9 16h.01M15 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune compétition trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            Aucune compétition ne correspond à vos critères de recherche.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompetitions.map((competition) => (
            <div key={competition.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 truncate">{competition.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{competition.description}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(competition.status)}`}>
                    {getStatusLabel(competition.status)}
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm font-medium">{getTypeLabel(competition.competitionType)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Lieu</p>
                    <p className="text-sm font-medium">{competition.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date de début</p>
                    <p className="text-sm font-medium">{formatDate(competition.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date de fin</p>
                    <p className="text-sm font-medium">{formatDate(competition.endDate)}</p>
                  </div>
                </div>

                {competition.status === CompetitionStatus.REGISTRATION && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500">Fin des inscriptions</p>
                    <p className="text-sm font-medium text-red-600">{formatDate(competition.registrationDeadline)}</p>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    href={`/dashboard/competitions/${competition.id}`}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Voir les détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}