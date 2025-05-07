'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardContent } from '@/component/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/component/ui/Table';
import  Button  from '@/component/ui/Button';
import { Search } from 'lucide-react';

export default function TeamsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        // Dans une implémentation réelle, vous utiliseriez un appel API
        // Pour cette démonstration, nous utilisons des données simulées
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simuler la récupération des équipes
        const mockTeams = [
          {
            id: 1,
            name: 'FC Barcelona',
            logo: 'https://via.placeholder.com/150',
            category: 'Professionnelle',
            coach: { firstName: 'Lionel', lastName: 'Messi' },
            players: 24,
            competitions: 3,
            createdAt: new Date('2024-01-01')
          },
          {
            id: 2,
            name: 'Real Madrid',
            logo: 'https://via.placeholder.com/150',
            category: 'Professionnelle',
            coach: { firstName: 'Carlo', lastName: 'Ancelotti' },
            players: 26,
            competitions: 4,
            createdAt: new Date('2024-02-15')
          },
          {
            id: 3,
            name: 'Manchester United',
            logo: 'https://via.placeholder.com/150',
            category: 'Professionnelle',
            coach: { firstName: 'Erik', lastName: 'ten Hag' },
            players: 28,
            competitions: 3,
            createdAt: new Date('2024-01-20')
          },
          {
            id: 4,
            name: 'Paris Saint-Germain',
            logo: 'https://via.placeholder.com/150',
            category: 'Professionnelle',
            coach: { firstName: 'Luis', lastName: 'Enrique' },
            players: 25,
            competitions: 3,
            createdAt: new Date('2024-03-10')
          },
          {
            id: 5,
            name: 'Bayern Munich',
            logo: 'https://via.placeholder.com/150',
            category: 'Professionnelle',
            coach: { firstName: 'Thomas', lastName: 'Tuchel' },
            players: 27,
            competitions: 4,
            createdAt: new Date('2024-02-01')
          }
        ];
        
        setTeams(mockTeams);
      } catch (err) {
        console.error('Erreur lors de la récupération des équipes:', err);
        setError('Impossible de charger les équipes. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Filtrer les équipes en fonction du terme de recherche
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${team.coach.firstName} ${team.coach.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Vérifier si l'utilisateur peut créer une équipe (Admin ou Coach)
  const canCreateTeam = user && (user.role === 'ADMIN' || user.role === 'COACH');

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Équipes
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Liste des équipes enregistrées dans la plateforme.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {canCreateTeam && (
            <Button 
              variant="primary"
              onClick={() => router.push('/dashboard/coach/teams/create')}
            >
              Ajouter une équipe
            </Button>
          )}
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Rechercher par nom, catégorie ou coach..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {filteredTeams.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune équipe trouvée</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Aucune équipe ne correspond à votre recherche." : "Aucune équipe n'est enregistrée pour le moment."}
            </p>
            {canCreateTeam && (
              <div className="mt-6">
                <Button 
                  variant="primary"
                  onClick={() => router.push('/dashboard/coach/teams/create')}
                >
                  Ajouter une équipe
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Équipe</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Coach</TableHead>
              <TableHead>Joueurs</TableHead>
              <TableHead>Compétitions</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.map((team) => (
              <TableRow key={team.id} className="cursor-pointer hover:bg-gray-50" onClick={() => router.push(`/dashboard/teams/${team.id}`)}>
                <TableCell className="pl-4 py-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      {team.logo ? (
                        <img className="h-10 w-10 rounded-full" src={team.logo} alt={team.name} />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{team.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{team.category}</TableCell>
                <TableCell>{team.coach.firstName} {team.coach.lastName}</TableCell>
                <TableCell>{team.players}</TableCell>
                <TableCell>{team.competitions}</TableCell>
                <TableCell>{formatDate(team.createdAt)}</TableCell>
                <TableCell className="text-right pr-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/teams/${team.id}`);
                    }}
                  >
                    Voir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}