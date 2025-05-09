import api from '../lib/api/client';
import endpoints from '../lib/api/endpoints';
import teamsData from '../data/teams';
import standingsData from '../data/standings';
import matchesData from '../data/matches';
import playersData from '../data/players';
import competitionsData from '../data/competitions';

// Service pour les équipes
const teamService = {
  // Récupérer toutes les équipes avec filtres optionnels
  getAllTeams: async (filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Filtrage côté client pour les données fictives
        let filteredTeams = [...teamsData];
        
        // Appliquer les filtres
        if (filters.name) {
          filteredTeams = filteredTeams.filter(team => 
            team.name.toLowerCase().includes(filters.name.toLowerCase())
          );
        }
        
        if (filters.category) {
          filteredTeams = filteredTeams.filter(team => team.category === filters.category);
        }
        
        if (filters.coachId) {
          filteredTeams = filteredTeams.filter(team => team.coachId === Number(filters.coachId));
        }
        
        if (filters.coachName) {
          filteredTeams = filteredTeams.filter(team => 
            team.coachName.toLowerCase().includes(filters.coachName.toLowerCase())
          );
        }
        
        return {
          data: filteredTeams,
          total: filteredTeams.length,
          page: 1,
          pageSize: filteredTeams.length,
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.teams.base, filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer une équipe par son ID
  getTeamById: async (id) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const team = teamsData.find(team => team.id === Number(id));
        if (!team) {
          throw new Error('Équipe non trouvée');
        }
        return team;
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.teams.byId(id));
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les joueurs d'une équipe
  getTeamPlayers: async (id) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler une requête pour obtenir les joueurs d'une équipe
        const teamPlayers = playersData.filter(player => player.teamId === Number(id));
        return {
          data: teamPlayers,
          total: teamPlayers.length,
          page: 1,
          pageSize: teamPlayers.length
        };
      }
      
      return await api.get(endpoints.teams.players(id));
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les matchs d'une équipe
  getTeamMatches: async (id, filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Filtrer les matchs où l'équipe est impliquée (domicile ou extérieur)
        let filteredMatches = matchesData.filter(match => 
          match.homeTeamId === Number(id) || match.awayTeamId === Number(id)
        );
        
        // Appliquer les filtres additionnels
        if (filters.status) {
          filteredMatches = filteredMatches.filter(match => match.status === filters.status);
        }
        
        if (filters.competitionId) {
          filteredMatches = filteredMatches.filter(match => match.competitionId === Number(filters.competitionId));
        }
        
        // Trier par date
        filteredMatches.sort((a, b) => new Date(a.scheduledDateTime) - new Date(b.scheduledDateTime));
        
        return {
          data: filteredMatches,
          total: filteredMatches.length,
          page: 1,
          pageSize: filteredMatches.length
        };
      }
      
      return await api.get(endpoints.teams.matches(id), filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les compétitions d'une équipe
  getTeamCompetitions: async (id) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Récupérer les compétitions à partir des classements
        const competitionIds = standingsData
          .filter(standing => standing.teamId === Number(id))
          .map(standing => standing.competitionId);
        
        // Éliminer les doublons
        const uniqueCompetitionIds = [...new Set(competitionIds)];
        
        // Récupérer les informations complètes des compétitions
        const teamCompetitions = competitionsData.filter(competition => 
          uniqueCompetitionIds.includes(competition.id)
        );
        
        return {
          data: teamCompetitions,
          total: teamCompetitions.length,
          page: 1,
          pageSize: teamCompetitions.length
        };
      }
      
      return await api.get(endpoints.teams.competitions(id));
    } catch (error) {
      throw error;
    }
  },

  // Créer une nouvelle équipe (Coach uniquement)
  createTeam: async (teamData) => {
    try {
      return await api.post(endpoints.teams.base, teamData);
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour une équipe (Coach uniquement)
  updateTeam: async (id, teamData) => {
    try {
      return await api.put(endpoints.teams.byId(id), teamData);
    } catch (error) {
      throw error;
    }
  },

  // Supprimer une équipe (Coach uniquement)
  deleteTeam: async (id) => {
    try {
      return await api.delete(endpoints.teams.byId(id));
    } catch (error) {
      throw error;
    }
  },

  // Ajouter un joueur à une équipe (Coach uniquement)
  addPlayerToTeam: async (teamId, playerId) => {
    try {
      return await api.post(`${endpoints.teams.players(teamId)}/add`, { playerId });
    } catch (error) {
      throw error;
    }
  },

  // Retirer un joueur d'une équipe (Coach uniquement)
  removePlayerFromTeam: async (teamId, playerId) => {
    try {
      return await api.delete(`${endpoints.teams.players(teamId)}/remove/${playerId}`);
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer les équipes d'un coach
  getCoachTeams: async (coachId, filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        let filteredTeams = teamsData.filter(team => team.coachId === Number(coachId));
        
        // Appliquer les filtres additionnels
        if (filters.category) {
          filteredTeams = filteredTeams.filter(team => team.category === filters.category);
        }
        
        if (filters.name) {
          filteredTeams = filteredTeams.filter(team => 
            team.name.toLowerCase().includes(filters.name.toLowerCase())
          );
        }
        
        return {
          data: filteredTeams,
          total: filteredTeams.length,
          page: 1,
          pageSize: filteredTeams.length
        };
      }
      
      return await api.get(`${endpoints.coaches.teams(coachId)}`, filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les classements d'une équipe (tous ou par défaut le plus récent)
  getTeamStandings: async (teamId) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const teamStandings = standingsData.filter(standing => standing.teamId === Number(teamId));
        
        if (!teamStandings || teamStandings.length === 0) {
          return null;
        }
        
        // Trier par date de mise à jour (du plus récent au plus ancien)
        teamStandings.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        
        return teamStandings;
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.teams.standings(teamId));
    } catch (error) {
      throw error;
    }
  },

  // Récupérer le classement d'une équipe dans une compétition spécifique
  getTeamStandingInCompetition: async (teamId, competitionId) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const standing = standingsData.find(
          s => s.teamId === Number(teamId) && s.competitionId === Number(competitionId)
        );
        
        if (!standing) {
          throw new Error('Classement non trouvé pour cette équipe dans cette compétition');
        }
        
        return standing;
      }
      
      // En production, appel à l'API réelle
      return await api.get(`${endpoints.teams.standings(teamId)}/${competitionId}`);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les équipes d'une compétition spécifique
  getTeamsByCompetition: async (competitionId, filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Récupérer les équipes à partir des classements
        const teamsInStandings = standingsData
          .filter(standing => standing.competitionId === Number(competitionId))
          .map(standing => standing.teamId);
        
        // Récupérer les informations complètes des équipes
        let competitionTeams = teamsData.filter(team => teamsInStandings.includes(team.id));
        
        // Appliquer les filtres additionnels
        if (filters.name) {
          competitionTeams = competitionTeams.filter(team => 
            team.name.toLowerCase().includes(filters.name.toLowerCase())
          );
        }
        
        if (filters.category) {
          competitionTeams = competitionTeams.filter(team => team.category === filters.category);
        }
        
        return {
          data: competitionTeams,
          total: competitionTeams.length,
          page: 1,
          pageSize: competitionTeams.length
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.competitions.teams(competitionId), filters);
    } catch (error) {
      throw error;
    }
  },
};

export default teamService;