import api from '../lib/api/client';
import endpoints from '../lib/api/endpoints';
import playersData from '../data/players';
import playerPerformanceData from '../data/playerPerformance';
import matchesData from '../data/matches';
import matchSheetsData from '../data/matchSheets';

// Service pour les joueurs
const playerService = {
  // Récupérer tous les joueurs avec filtres optionnels
  getAllPlayers: async (filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Filtrage côté client pour les données fictives
        let filteredPlayers = [...playersData];
        
        // Appliquer les filtres
        if (filters.userName) {
          filteredPlayers = filteredPlayers.filter(player => 
            player.userName.toLowerCase().includes(filters.userName.toLowerCase())
          );
        }
        
        if (filters.firstName) {
          filteredPlayers = filteredPlayers.filter(player => 
            player.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
          );
        }
        
        if (filters.lastName) {
          filteredPlayers = filteredPlayers.filter(player => 
            player.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
          );
        }
        
        if (filters.position) {
          filteredPlayers = filteredPlayers.filter(player => player.position === filters.position);
        }
        
        if (filters.status) {
          filteredPlayers = filteredPlayers.filter(player => player.status === filters.status);
        }
        
        if (filters.teamId) {
          filteredPlayers = filteredPlayers.filter(player => player.teamId === Number(filters.teamId));
        }
        
        if (filters.teamName) {
          filteredPlayers = filteredPlayers.filter(player => 
            player.teamName.toLowerCase().includes(filters.teamName.toLowerCase())
          );
        }
        
        return {
          data: filteredPlayers,
          total: filteredPlayers.length,
          page: 1,
          pageSize: filteredPlayers.length,
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.players.base, filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer un joueur par son ID
  getPlayerById: async (id) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const player = playersData.find(player => player.id === Number(id));
        if (!player) {
          throw new Error('Joueur non trouvé');
        }
        return player;
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.players.byId(id));
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les performances d'un joueur
  getPlayerPerformance: async (id, competitionId = null) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        let performances = playerPerformanceData.filter(perf => perf.playerId === Number(id));
        
        // Filtrer par compétition si demandé
        if (competitionId) {
          performances = performances.filter(perf => perf.competitionId === Number(competitionId));
        }
        
        if (performances.length === 0) {
          return null;
        }
        
        return performances;
      }
      
      // En production, appel à l'API réelle
      const endpoint = competitionId 
        ? `${endpoints.players.performance(id)}?competitionId=${competitionId}`
        : endpoints.players.performance(id);
      return await api.get(endpoint);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les matchs d'un joueur
  getPlayerMatches: async (id, filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Récupérer tous les matchs
        const matches = matchesData || [];
        
        // Récupérer le joueur pour connaître son équipe
        const player = playersData.find(p => p.id === Number(id));
        if (!player) {
          throw new Error('Joueur non trouvé');
        }
        
        // Récupérer les participations du joueur aux matchs à partir des feuilles de match
        const matchSheets = matchSheetsData || [];
        const playerParticipations = [];
        
        // Collecter tous les IDs de matchs où le joueur a participé
        matchSheets.forEach(sheet => {
          const participation = sheet.playerParticipations.find(p => p.playerId === Number(id));
          if (participation) {
            playerParticipations.push({
              matchId: sheet.matchId,
              matchSheetId: sheet.id,
              teamId: sheet.teamId,
              participation
            });
          }
        });
        
        // Récupérer les matchs correspondants
        let playerMatches = matches.filter(match => {
          // Inclure les matchs où le joueur a participé
          const hasParticipation = playerParticipations.some(p => p.matchId === match.id);
          
          // Ou les matchs de l'équipe du joueur (même s'il n'a pas participé)
          const isTeamMatch = match.homeTeamId === player.teamId || match.awayTeamId === player.teamId;
          
          return hasParticipation || isTeamMatch;
        });
        
        // Appliquer les filtres additionnels
        if (filters.status) {
          playerMatches = playerMatches.filter(match => match.status === filters.status);
        }
        
        if (filters.competitionId) {
          playerMatches = playerMatches.filter(match => match.competitionId === Number(filters.competitionId));
        }
        
        if (filters.startDate) {
          playerMatches = playerMatches.filter(match => 
            new Date(match.scheduledDateTime) >= new Date(filters.startDate)
          );
        }
        
        if (filters.endDate) {
          playerMatches = playerMatches.filter(match => 
            new Date(match.scheduledDateTime) <= new Date(filters.endDate)
          );
        }
        
        // Trier par date (du plus récent au plus ancien par défaut)
        playerMatches.sort((a, b) => new Date(b.scheduledDateTime) - new Date(a.scheduledDateTime));
        
        return {
          data: playerMatches,
          total: playerMatches.length,
          page: 1,
          pageSize: playerMatches.length
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.players.matches(id), filters);
    } catch (error) {
      throw error;
    }
  },

  // Créer un nouveau joueur (Coach uniquement)
  createPlayer: async (playerData) => {
    try {
      return await api.post(endpoints.players.base, playerData);
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour un joueur (Coach uniquement)
  updatePlayer: async (id, playerData) => {
    try {
      return await api.put(endpoints.players.byId(id), playerData);
    } catch (error) {
      throw error;
    }
  },

  // Supprimer un joueur (Coach uniquement)
  deletePlayer: async (id) => {
    try {
      return await api.delete(endpoints.players.byId(id));
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les joueurs d'une équipe
  getTeamPlayers: async (teamId, filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        let filteredPlayers = playersData.filter(player => player.teamId === Number(teamId));
        
        // Appliquer les filtres additionnels
        if (filters.position) {
          filteredPlayers = filteredPlayers.filter(player => player.position === filters.position);
        }
        
        if (filters.status) {
          filteredPlayers = filteredPlayers.filter(player => player.status === filters.status);
        }
        
        if (filters.name) {
          filteredPlayers = filteredPlayers.filter(player => 
            player.firstName.toLowerCase().includes(filters.name.toLowerCase()) ||
            player.lastName.toLowerCase().includes(filters.name.toLowerCase())
          );
        }
        
        return {
          data: filteredPlayers,
          total: filteredPlayers.length,
          page: 1,
          pageSize: filteredPlayers.length
        };
      }
      
      return await api.get(endpoints.teams.players(teamId), filters);
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer les joueurs disponibles (non assignés à une équipe)
  getAvailablePlayers: async (filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        let filteredPlayers = playersData.filter(player => !player.teamId);
        
        // Appliquer les filtres additionnels
        if (filters.position) {
          filteredPlayers = filteredPlayers.filter(player => player.position === filters.position);
        }
        
        if (filters.name) {
          filteredPlayers = filteredPlayers.filter(player => 
            player.firstName.toLowerCase().includes(filters.name.toLowerCase()) ||
            player.lastName.toLowerCase().includes(filters.name.toLowerCase())
          );
        }
        
        return {
          data: filteredPlayers,
          total: filteredPlayers.length,
          page: 1,
          pageSize: filteredPlayers.length
        };
      }
      
      return await api.get(`${endpoints.players.base}/available`, filters);
    } catch (error) {
      throw error;
    }
  },
};

export default playerService;