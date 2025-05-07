'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { CompetitionStatus, CompetitionType } from '@/service/model';

export default function CompetitionDetailPage({ params }) {
  //const { id } = params;
  const { id } = React.use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [competition, setCompetition] = useState(null);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info'); // info, teams, matches, standings

  useEffect(() => {
    const fetchCompetitionData = async () => {
      setLoading(true);
      try {
        // Dans une implémentation réelle, vous utiliseriez competitionService.getCompetitionById(id)
        // Pour cette démonstration, nous utilisons des données simulées
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simuler la récupération des données d'une compétition
        const mockCompetition = {
          id: parseInt(id),
          name: 'Championnat National',
          description: 'Championnat national annuel des clubs élites. Ce championnat réunit les meilleures équipes du pays pour une compétition qui s\'étale sur plusieurs mois.',
          startDate: new Date('2025-06-01'),
          endDate: new Date('2025-08-30'),
          registrationDeadline: new Date('2025-05-15'),
          location: 'Paris',
          maxTeams: 20,
          competitionType: CompetitionType.LEAGUE,
          status: CompetitionStatus.REGISTRATION,
          organizer: { id: 3, firstName: 'Jean', lastName: 'Dupont', email: 'jean.dupont@example.com' },
          createdAt: new Date('2025-01-15')
        };
        
        setCompetition(mockCompetition);
        
        // Simuler la récupération des équipes inscrites
        const mockTeams = [
          { id: 1, name: 'FC Barcelona', logo: 'https://via.placeholder.com/50', description: 'Club de football professionnel', coach: { firstName: 'Lionel', lastName: 'Messi' }, createdAt: new Date('2024-01-01') },
          { id: 2, name: 'Real Madrid', logo: 'https://via.placeholder.com/50', description: 'Club de football professionnel', coach: { firstName: 'Zinedine', lastName: 'Zidane' }, createdAt: new Date('2024-01-02') },
          { id: 3, name: 'Manchester United', logo: 'https://via.placeholder.com/50', description: 'Club de football professionnel', coach: { firstName: 'Alex', lastName: 'Ferguson' }, createdAt: new Date('2024-01-03') },
          { id: 4, name: 'Liverpool', logo: 'https://via.placeholder.com/50', description: 'Club de football professionnel', coach: { firstName: 'Jurgen', lastName: 'Klopp' }, createdAt: new Date('2024-01-04') },
        ];
        
        setTeams(mockTeams);
        
        // Simuler la récupération des matches
        const mockMatches = [
          { id: 1, matchDate: new Date('2025-06-05'), homeTeam: { id: 1, name: 'FC Barcelona' }, awayTeam: { id: 2, name: 'Real Madrid' }, homeScore: null, awayScore: null, status: 'SCHEDULED', location: 'Camp Nou' },
          { id: 2, matchDate: new Date('2025-06-12'), homeTeam: { id: 3, name: 'Manchester United' }, awayTeam: { id: 4, name: 'Liverpool' }, homeScore: null, awayScore: null, status: 'SCHEDULED', location: 'Old Trafford' },
          { id: 3, matchDate: new Date('2025-06-19'), homeTeam: { id: 1, name: 'FC Barcelona' }, awayTeam: { id: 3, name: 'Manchester United' }, homeScore: null, awayScore: null, status: 'SCHEDULED', location: 'Camp Nou' },
          { id: 4, matchDate: new Date('2025-06-26'), homeTeam: { id: 2, name: 'Real Madrid' }, awayTeam: { id: 4, name: 'Liverpool' }, homeScore: null, awayScore: null, status: 'SCHEDULED', location: 'Santiago Bernabeu' },
        ];
        
        setMatches(mockMatches);
      } catch (err) {
        console.error('Erreur lors de la récupération des données de la compétition:', err);
        setError('Impossible de charger les détails de la compétition. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompetitionData();
    }
  }, [id]);

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

  // Vérifier si l'utilisateur est l'organisateur de cette compétition
  const isOrganizer = user && competition && (user.id === competition.organizer.id || user.role === 'ADMIN');
  
  // Vérifier si l'utilisateur est un coach et peut inscrire une équipe
  const isCoach = user && user.role === 'COACH';
  
  // Vérifier si l'inscription est possible
  const canRegister = isCoach && competition && competition.status === CompetitionStatus.REGISTRATION;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => router.push('/dashboard/competitions')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Retour aux compétitions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Compétition non trouvée</h3>
        <p className="mt-1 text-sm text-gray-500">
          La compétition que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => router.push('/dashboard/competitions')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retour aux compétitions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {competition.name}
          </h2>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {competition.location}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              {competition.maxTeams} équipes max.
            </div>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(competition.status)}`}>
                {getStatusLabel(competition.status)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <button
            type="button"
            onClick={() => router.push('/dashboard/competitions')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retour
          </button>
          
          {isOrganizer && (
            <Link
              href={`/dashboard/organizer/competitions/edit/${competition.id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Modifier
            </Link>
          )}
          
          {canRegister && (
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Inscrire mon équipe
            </button>
          )}
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            className={`${
              activeTab === 'info'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('info')}
          >
            Informations
          </button>
          <button
            className={`${
              activeTab === 'teams'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('teams')}
          >
            Équipes ({teams.length})
          </button>
          <button
            className={`${
              activeTab === 'matches'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('matches')}
          >
            Matchs ({matches.length})
          </button>
          {competition.competitionType === CompetitionType.LEAGUE && (
            <button
              className={`${
                activeTab === 'standings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('standings')}
            >
              Classement
            </button>
          )}
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'info' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Détails de la compétition
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Informations complètes sur cette compétition.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nom</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {competition.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {competition.description}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {getTypeLabel(competition.competitionType)}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Statut</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(competition.status)}`}>
                    {getStatusLabel(competition.status)}
                  </span>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Dates</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Du {formatDate(competition.startDate)} au {formatDate(competition.endDate)}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Lieu</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {competition.location}
                </dd>
              </div>
              {competition.status === CompetitionStatus.REGISTRATION && (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date limite d'inscription</dt>
                  <dd className="mt-1 text-sm text-red-600 font-medium sm:mt-0 sm:col-span-2">
                    {formatDate(competition.registrationDeadline)}
                  </dd>
                </div>
              )}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nombre maximum d'équipes</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {competition.maxTeams}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Organisateur</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {competition.organizer.firstName} {competition.organizer.lastName}
                  <br />
                  <a href={`mailto:${competition.organizer.email}`} className="text-blue-600 hover:text-blue-500">
                    {competition.organizer.email}
                  </a>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Date de création</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDate(competition.createdAt)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Équipes inscrites
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Liste des équipes participant à la compétition.
              </p>
            </div>
            {teams.length > 0 && (
              <div className="text-sm text-gray-700">
                {teams.length} {teams.length === 1 ? 'équipe inscrite' : 'équipes inscrites'} sur {competition.maxTeams}
              </div>
            )}
          </div>
          <div className="border-t border-gray-200">
            {teams.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune équipe inscrite</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Aucune équipe n'est encore inscrite à cette compétition.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {teams.map(team => (
                  <li key={team.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        {team.logo ? (
                          <img className="h-12 w-12 rounded-full" src={team.logo} alt={team.name} />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{team.name}</h4>
                            <p className="text-sm text-gray-500">{team.description}</p>
                          </div>
                          <Link 
                            href={`/dashboard/teams/${team.id}`}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Voir l'équipe
                          </Link>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Coach: {team.coach.firstName} {team.coach.lastName}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Calendrier des matches
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Liste des matches prévus pour cette compétition.
            </p>
          </div>
          <div className="border-t border-gray-200">
            {matches.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun match planifié</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Les matches de cette compétition n'ont pas encore été planifiés.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Équipes
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lieu
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {matches.map((match) => (
                      <tr key={match.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(match.matchDate).toLocaleDateString('fr-FR')}
                          <div className="text-xs">
                            {new Date(match.matchDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{match.homeTeam.name}</span>
                            <span className="mx-2 text-gray-500">vs</span>
                            <span className="text-sm font-medium text-gray-900">{match.awayTeam.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {match.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.homeScore !== null && match.awayScore !== null
                            ? `${match.homeScore} - ${match.awayScore}`
                            : '-'
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/dashboard/matches/${match.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Détails
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'standings' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Classement
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Classement actuel des équipes dans cette compétition.
            </p>
          </div>
          <div className="border-t border-gray-200">
            {competition.status === CompetitionStatus.UPCOMING || competition.status === CompetitionStatus.REGISTRATION ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Classement non disponible</h3>
                <p className="mt-1 text-sm text-gray-500">
                  La compétition n'a pas encore commencé.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pos.
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Équipe
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        J
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        G
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        N
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        P
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        BP
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        BC
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Diff
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pts
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Exemple de données de classement (à remplacer par des données réelles) */}
                    {[
                      { position: 1, team: teams[0], played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 10, goalsAgainst: 2, goalDifference: 8, points: 9 },
                      { position: 2, team: teams[1], played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 3, goalDifference: 4, points: 7 },
                      { position: 3, team: teams[2], played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 5, goalDifference: -1, points: 4 },
                      { position: 4, team: teams[3], played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 12, goalDifference: -11, points: 0 }
                    ].map((standing) => (
                      <tr key={standing.position}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {standing.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {standing.team.logo && (
                              <div className="flex-shrink-0 h-10 w-10 mr-3">
                                <img className="h-10 w-10 rounded-full" src={standing.team.logo} alt={standing.team.name} />
                              </div>
                            )}
                            <div className="ml-0">
                              <div className="text-sm font-medium text-gray-900">{standing.team.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {standing.played}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {standing.won}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {standing.drawn}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {standing.lost}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {standing.goalsFor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {standing.goalsAgainst}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {standing.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}