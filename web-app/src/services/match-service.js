import api from '../lib/api/client';
import endpoints from '../lib/api/endpoints';
import matchesData from '../data/matches';
import matchSheetsData from '../data/matchSheets';

// Service pour les matchs
const matchService = {
  // Récupérer tous les matchs avec filtres optionnels
  getAllMatches: async (filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Filtrage côté client pour les données fictives
        let filteredMatches = [...matchesData];
        
        // Appliquer les filtres
        if (filters.status) {
          filteredMatches = filteredMatches.filter(match => match.status === filters.status);
        }
        
        if (filters.title) {
          filteredMatches = filteredMatches.filter(match => 
            match.title.toLowerCase().includes(filters.title.toLowerCase())
          );
        }
        
        if (filters.competitionId) {
          filteredMatches = filteredMatches.filter(match => match.competitionId === Number(filters.competitionId));
        }
        
        if (filters.teamId) {
          filteredMatches = filteredMatches.filter(match => 
            match.homeTeamId === Number(filters.teamId) || match.awayTeamId === Number(filters.teamId)
          );
        }
        
        if (filters.teamName) {
          filteredMatches = filteredMatches.filter(match => 
            match.homeTeamName.toLowerCase().includes(filters.teamName.toLowerCase()) || 
            match.awayTeamName.toLowerCase().includes(filters.teamName.toLowerCase())
          );
        }
        
        // Filtrage par date
        if (filters.startDate) {
          filteredMatches = filteredMatches.filter(match => 
            new Date(match.scheduledDateTime) >= new Date(filters.startDate)
          );
        }
        
        if (filters.endDate) {
          filteredMatches = filteredMatches.filter(match => 
            new Date(match.scheduledDateTime) <= new Date(filters.endDate)
          );
        }
        
        return {
          data: filteredMatches,
          total: filteredMatches.length,
          page: 1,
          pageSize: filteredMatches.length,
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.matches.base, filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer un match par son ID
  getMatchById: async (id) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const match = matchesData.find(match => match.id === Number(id));
        if (!match) {
          throw new Error('Match non trouvé');
        }
        return match;
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.matches.byId(id));
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les informations consolidées d'un match (avec feuilles de match)
  getConsolidatedMatch: async (id) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const match = matchesData.find(match => match.id === Number(id));
        if (!match) {
          throw new Error('Match non trouvé');
        }
        
        // Simuler des données consolidées avec feuilles de match
        return {
          ...match,
          matchSheets: [], // Normalement on aurait les feuilles de match ici
          statistics: {
            homeTeamStats: {
              goals: match.homeTeamScore || 0,
              possession: 55,
              shotsOnTarget: 8,
              shotsOffTarget: 7,
              corners: 5,
              fouls: 10
            },
            awayTeamStats: {
              goals: match.awayTeamScore || 0,
              possession: 45,
              shotsOnTarget: 6,
              shotsOffTarget: 4,
              corners: 3,
              fouls: 12
            }
          }
        };
      }
      
      return await api.get(endpoints.matches.consolidated(id));
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les feuilles de match d'un match
  getMatchSheets: async (matchId) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler des feuilles de match (devrait être dans un fichier de données séparé)
        const matchSheets = [
          {
            id: 1,
            matchId: Number(matchId),
            teamId: matchesData.find(m => m.id === Number(matchId))?.homeTeamId,
            createdBy: 'coach1',
            status: 'SUBMITTED',
            lineup: [],
            substitutes: [],
            createdAt: '2025-03-15T14:00:00Z',
            updatedAt: '2025-03-15T18:30:00Z'
          },
          {
            id: 2,
            matchId: Number(matchId),
            teamId: matchesData.find(m => m.id === Number(matchId))?.awayTeamId,
            createdBy: 'coach2',
            status: 'VALIDATED',
            lineup: [],
            substitutes: [],
            createdAt: '2025-03-15T14:30:00Z',
            updatedAt: '2025-03-15T18:30:00Z'
          }
        ];
        
        return {
          data: matchSheets,
          total: matchSheets.length
        };
      }
      
      return await api.get(endpoints.matches.matchSheets.byMatch(matchId));
    } catch (error) {
      throw error;
    }
  },

  // Récupérer une feuille de match par son ID
  getMatchSheetById: async (matchSheetId) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler une feuille de match (devrait être dans un fichier de données séparé)
        const matchSheet = {
          id: Number(matchSheetId),
          matchId: 1, // Correspond à l'ID du match
          teamId: 1,
          createdBy: 'coach1',
          status: 'VALIDATED',
          lineup: [],
          substitutes: [],
          createdAt: '2025-03-15T14:00:00Z',
          updatedAt: '2025-03-15T18:30:00Z'
        };
        
        return matchSheet;
      }
      
      return await api.get(endpoints.matches.matchSheets.byId(matchSheetId));
    } catch (error) {
      throw error;
    }
  },

  // Créer un nouveau match (Organisateur uniquement)
  createMatch: async (matchData) => {
    try {
      // En mode développement, simuler la création
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Créer un nouveau match (sans réellement l'ajouter aux données)
        const newMatch = {
          id: matchesData.length + 1,
          ...matchData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        return newMatch;
      }
      
      return await api.post(endpoints.matches.base, matchData);
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour un match (Organisateur uniquement)
  updateMatch: async (id, matchData) => {
    try {
      // En mode développement, simuler la mise à jour
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Vérifier si le match existe
        const matchIndex = matchesData.findIndex(match => match.id === Number(id));
        if (matchIndex === -1) {
          throw new Error('Match non trouvé');
        }
        
        // Créer un objet mis à jour (sans réellement modifier les données)
        const updatedMatch = {
          ...matchesData[matchIndex],
          ...matchData,
          updatedAt: new Date().toISOString()
        };
        
        return updatedMatch;
      }
      
      return await api.put(endpoints.matches.byId(id), matchData);
    } catch (error) {
      throw error;
    }
  },

  // Supprimer un match (Organisateur uniquement)
  deleteMatch: async (id) => {
    try {
      return await api.delete(endpoints.matches.byId(id));
    } catch (error) {
      throw error;
    }
  },

  // Créer une feuille de match (Coach uniquement)
  createMatchSheet: async (matchSheetData) => {
    try {
      return await api.post(endpoints.matches.matchSheets.base, matchSheetData);
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour une feuille de match (Coach uniquement)
  updateMatchSheet: async (id, matchSheetData) => {
    try {
      return await api.put(endpoints.matches.matchSheets.byId(id), matchSheetData);
    } catch (error) {
      throw error;
    }
  },

  // Soumettre une feuille de match pour validation (Coach uniquement)
  submitMatchSheet: async (id) => {
    try {
      return await api.post(endpoints.matches.matchSheets.submit(id));
    } catch (error) {
      throw error;
    }
  },

  // Valider une feuille de match (Organisateur uniquement)
  validateMatchSheet: async (id, validationData) => {
    try {
      return await api.post(endpoints.matches.matchSheets.validate(id), validationData);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les matchs d'une compétition
  getCompetitionMatches: async (competitionId, filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        let filteredMatches = matchesData.filter(match => match.competitionId === Number(competitionId));
        
        // Appliquer les filtres additionnels
        if (filters.status) {
          filteredMatches = filteredMatches.filter(match => match.status === filters.status);
        }
        
        if (filters.teamId) {
          filteredMatches = filteredMatches.filter(match => 
            match.homeTeamId === Number(filters.teamId) || match.awayTeamId === Number(filters.teamId)
          );
        }
        
        if (filters.round) {
          filteredMatches = filteredMatches.filter(match => match.round === filters.round);
        }
        
        if (filters.phase) {
          filteredMatches = filteredMatches.filter(match => match.phase === filters.phase);
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
      
      return await api.get(endpoints.competitions.matches(competitionId), filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les matchs d'une équipe
  getTeamMatches: async (teamId, filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        let filteredMatches = matchesData.filter(match => 
          match.homeTeamId === Number(teamId) || match.awayTeamId === Number(teamId)
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
      
      return await api.get(endpoints.teams.matches(teamId), filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les matchs par équipe et avec filtres (date, compétition, etc.)
  getFilteredMatches: async (filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Filtrage côté client pour les données fictives
        let filteredMatches = [...matchesData];
        
        // Filtrage par équipe (domicile ou extérieur)
        if (filters.teamIds && filters.teamIds.length > 0) {
          filteredMatches = filteredMatches.filter(match => 
            filters.teamIds.includes(match.homeTeamId) || filters.teamIds.includes(match.awayTeamId)
          );
        }
        
        // Filtrage par compétitions
        if (filters.competitionIds && filters.competitionIds.length > 0) {
          filteredMatches = filteredMatches.filter(match => 
            filters.competitionIds.includes(match.competitionId)
          );
        }
        
        // Filtrage par résultat (victoire, défaite, match nul)
        if (filters.result) {
          filteredMatches = filteredMatches.filter(match => {
            if (match.status !== 'COMPLETED') return false;
            
            const teamId = filters.teamId;
            const isHomeTeam = match.homeTeamId === Number(teamId);
            const isAwayTeam = match.awayTeamId === Number(teamId);
            
            if (!isHomeTeam && !isAwayTeam) return false;
            
            if (filters.result === 'WIN') {
              return (isHomeTeam && match.homeTeamScore > match.awayTeamScore) || 
                     (isAwayTeam && match.awayTeamScore > match.homeTeamScore);
            } else if (filters.result === 'LOSS') {
              return (isHomeTeam && match.homeTeamScore < match.awayTeamScore) || 
                     (isAwayTeam && match.awayTeamScore < match.homeTeamScore);
            } else if (filters.result === 'DRAW') {
              return match.homeTeamScore === match.awayTeamScore;
            }
            
            return true;
          });
        }
        
        return {
          data: filteredMatches,
          total: filteredMatches.length,
          page: 1,
          pageSize: filteredMatches.length,
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.matches.filtered, filters);
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer la feuille de match d'une équipe spécifique pour un match donné
  getMatchSheetByTeam: async (matchId, teamId) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const matchSheets = matchSheetsData || [];
        const matchSheet = matchSheets.find(
          sheet => sheet.matchId === Number(matchId) && sheet.teamId === Number(teamId)
        );
        
        if (!matchSheet) {
          throw new Error('Feuille de match non trouvée pour cette équipe');
        }
        
        return matchSheet;
      }
      
      // En production, appel à l'API réelle
      return await api.get(`${endpoints.matches.matchSheets.byMatch(matchId)}/team/${teamId}`);
    } catch (error) {
      throw error;
    }
  },

  // Valider ou invalider une feuille de match (avec commentaires)
  reviewMatchSheet: async (id, reviewData) => {
    try {
      // En mode développement, simuler la validation
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Dans un environnement réel, cette logique serait côté serveur
        return {
          success: true,
          message: reviewData.approved ? 'Feuille de match validée' : 'Feuille de match invalidée',
          matchSheetId: id
        };
      }
      
      return await api.post(
        reviewData.approved 
          ? endpoints.matches.matchSheets.validate(id) 
          : endpoints.matches.matchSheets.invalidate(id), 
        { comments: reviewData.comments }
      );
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les statistiques des joueurs pour un match
  getMatchPlayerStats: async (matchId) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler des statistiques de joueurs (à remplacer par une vraie source de données)
        const playerStats = [];
        
        return {
          data: playerStats,
          total: playerStats.length
        };
      }
      
      return await api.get(endpoints.matches.playerStats(matchId));
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer les évènements d'un match (buts, cartons, etc.)
  getMatchEvents: async (matchId) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler des événements de match (à remplacer par une vraie source de données)
        const matchEvents = [];
        
        // Trier par minute
        matchEvents.sort((a, b) => a.minute - b.minute);
        
        return {
          data: matchEvents,
          total: matchEvents.length
        };
      }
      
      return await api.get(endpoints.matches.events(matchId));
    } catch (error) {
      throw error;
    }
  },
  
  // Rechercher des matchs à venir (prochains matchs)
  getUpcomingMatches: async (options = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        let upcomingMatches = matchesData.filter(match => match.status === 'SCHEDULED');
        
        // Filtrer par équipe si spécifié
        if (options.teamId) {
          upcomingMatches = upcomingMatches.filter(match => 
            match.homeTeamId === Number(options.teamId) || match.awayTeamId === Number(options.teamId)
          );
        }
        
        // Filtrer par compétition si spécifié
        if (options.competitionId) {
          upcomingMatches = upcomingMatches.filter(match => 
            match.competitionId === Number(options.competitionId)
          );
        }
        
        // Limiter le nombre de résultats si spécifié
        if (options.limit) {
          upcomingMatches = upcomingMatches.slice(0, options.limit);
        }
        
        // Trier par date (du plus proche au plus loin)
        upcomingMatches.sort((a, b) => new Date(a.scheduledDateTime) - new Date(b.scheduledDateTime));
        
        return {
          data: upcomingMatches,
          total: upcomingMatches.length,
          page: 1,
          pageSize: upcomingMatches.length
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.matches.upcoming, options);
    } catch (error) {
      throw error;
    }
  },
  
  // Rechercher des matchs récents (terminés récemment)
  getRecentMatches: async (options = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        let recentMatches = matchesData.filter(match => match.status === 'COMPLETED');
        
        // Filtrer par équipe si spécifié
        if (options.teamId) {
          recentMatches = recentMatches.filter(match => 
            match.homeTeamId === Number(options.teamId) || match.awayTeamId === Number(options.teamId)
          );
        }
        
        // Filtrer par compétition si spécifié
        if (options.competitionId) {
          recentMatches = recentMatches.filter(match => 
            match.competitionId === Number(options.competitionId)
          );
        }
        
        // Limiter le nombre de résultats si spécifié
        if (options.limit) {
          recentMatches = recentMatches.slice(0, options.limit);
        }
        
        // Trier par date (du plus récent au plus ancien)
        recentMatches.sort((a, b) => new Date(b.scheduledDateTime) - new Date(a.scheduledDateTime));
        
        return {
          data: recentMatches,
          total: recentMatches.length,
          page: 1,
          pageSize: recentMatches.length
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.matches.recent, options);
    } catch (error) {
      throw error;
    }
  }
};

export default matchService;