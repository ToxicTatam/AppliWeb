'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getMatchesByOrganizer } from '@/services/match-service';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Table from '@/components/ui/Table';

export default function OrganizerMatchesPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', type: '' });
  
  const [filters, setFilters] = useState({
    competitionId: '',
    status: '',
    team: '',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'ORGANIZER') {
      router.push('/dashboard');
      return;
    }

    fetchMatches();
  }, [user, router]);

  useEffect(() => {
    applyFilters();
  }, [matches, filters]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const matchesData = await getMatchesByOrganizer(user.id);
      setMatches(matchesData || []);
      setFilteredMatches(matchesData || []);
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des matchs:', err);
      setError('Impossible de récupérer vos matchs. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...matches];
    
    if (filters.competitionId) {
      filtered = filtered.filter(match => 
        match.competitionId === parseInt(filters.competitionId) ||
        match.competitionName?.toLowerCase().includes(filters.competitionId.toLowerCase())
      );
    }
    
    if (filters.status) {
      filtered = filtered.filter(match => match.status === filters.status);
    }
    
    if (filters.team) {
      filtered = filtered.filter(match => {
        const homeTeam = match.participants?.find(p => p.role === 'HOME')?.teamName;
        const awayTeam = match.participants?.find(p => p.role === 'AWAY')?.teamName;
        
        return (
          homeTeam?.toLowerCase().includes(filters.team.toLowerCase()) ||
          awayTeam?.toLowerCase().includes(filters.team.toLowerCase())
        );
      });
    }
    
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(match => 
        match.scheduledDateTime && new Date(match.scheduledDateTime) >= fromDate
      );
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      // Ajuster la date de fin à 23:59:59
      toDate.setHours(23, 59, 59);
      filtered = filtered.filter(match => 
        match.scheduledDateTime && new Date(match.scheduledDateTime) <= toDate
      );
    }
    
    setFilteredMatches(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      'SCHEDULED': 'Planifié',
      'IN_PROGRESS': 'En cours',
      'COMPLETED': 'Terminé',
      'POSTPONED': 'Reporté',
      'CANCELLED': 'Annulé'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-green-100 text-green-800';
      case 'COMPLETED': return 'bg-purple-100 text-purple-800';
      case 'POSTPONED': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const matchColumns = [
    { header: 'Match', accessor: 'title' },
    { header: 'Compétition', accessor: 'competitionName' },
    { header: 'Date', accessor: (row) => {
      if (!row.scheduledDateTime) return 'Non planifié';
      return new Date(row.scheduledDateTime).toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }},
    { header: 'Équipes', accessor: (row) => {
      const home = row.participants?.find(p => p.role === 'HOME')?.teamName || 'TBD';
      const away = row.participants?.find(p => p.role === 'AWAY')?.teamName || 'TBD';
      return `${home} vs ${away}`;
    }},
    { header: 'Score', accessor: (row) => {
      if (row.status !== 'COMPLETED' && row.status !== 'IN_PROGRESS') return '-';
      return `${row.homeTeamScore || 0} - ${row.awayTeamScore || 0}`;
    }},
    { header: 'Statut', accessor: 'status', render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(value)}`}>
        {getStatusLabel(value)}
      </span>
    )},
    { header: 'Actions', accessor: (row) => (
      <div className="flex space-x-2">
        <Button
          onClick={() => router.push(`/dashboard/organizer/matches/${row.id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1"
        >
          Détails
        </Button>
        {row.status === 'COMPLETED' && row.matchSheetStatus !== 'VALIDATED' && (
          <Button
            onClick={() => router.push(`/dashboard/organizer/match-validation?matchId=${row.id}`)}
            className="bg-orange-600 hover:bg-orange-700 text-xs px-2 py-1"
          >
            Valider
          </Button>
        )}
      </div>
    )}
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestion des matchs</h1>
        <Button 
          onClick={() => router.push('/dashboard/organizer/matches/schedule')}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Programmer un match
        </Button>
      </div>
      
      {alertInfo.show && (
        <Alert 
          type={alertInfo.type} 
          message={alertInfo.message} 
          onClose={() => setAlertInfo({ ...alertInfo, show: false })}
          className="mb-6"
        />
      )}
      
      {error && (
        <Alert 
          type="error" 
          message={error} 
          onClose={() => setError(null)}
          className="mb-6"
        />
      )}
      
      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Filtres</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Compétition"
              name="competitionId"
              value={filters.competitionId}
              onChange={handleFilterChange}
              placeholder="Nom ou ID de la compétition"
            />
            
            <Input
              label="Équipe"
              name="team"
              value={filters.team}
              onChange={handleFilterChange}
              placeholder="Nom de l'équipe"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tous les statuts</option>
                <option value="SCHEDULED">Planifié</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="COMPLETED">Terminé</option>
                <option value="POSTPONED">Reporté</option>
                <option value="CANCELLED">Annulé</option>
              </select>
            </div>
            
            <Input
              label="Date de début"
              name="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={handleFilterChange}
            />
            
            <Input
              label="Date de fin"
              name="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Liste des matchs ({filteredMatches.length})</h2>
          
          {filteredMatches.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500 mb-4">Aucun match trouvé avec les filtres actuels</p>
              <Button 
                onClick={() => router.push('/dashboard/organizer/matches/schedule')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Programmer un match
              </Button>
            </div>
          ) : (
            <Table 
              columns={matchColumns} 
              data={filteredMatches}
              pagination={{ itemsPerPage: 10 }}
              emptyMessage="Aucun match trouvé"
            />
          )}
        </div>
      </Card>
    </div>
  );
} 