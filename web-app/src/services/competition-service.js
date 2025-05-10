import api from '../lib/api/client';
import endpoints from '../lib/api/endpoints';
import competitionsData from '../data/competitions';
import teamsData from '../data/teams';
import standingsData from '../data/standings';

// Service pour les compétitions
const competitionService = {
  // Récupérer toutes les compétitions avec filtres optionnels
  getAllCompetitions: async (filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Filtrage côté client pour les données fictives
        let filteredCompetitions = [...competitionsData];
        
        // Appliquer les filtres
        if (filters.status) {
          filteredCompetitions = filteredCompetitions.filter(comp => comp.status === filters.status);
        }
        
        if (filters.name) {
          filteredCompetitions = filteredCompetitions.filter(comp => 
            comp.name.toLowerCase().includes(filters.name.toLowerCase())
          );
        }
        
        if (filters.category) {
          filteredCompetitions = filteredCompetitions.filter(comp => comp.category === filters.category);
        }
        
        if (filters.organizerId) {
          filteredCompetitions = filteredCompetitions.filter(comp => comp.organizerId === filters.organizerId);
        }
        
        if (filters.organizerName) {
          filteredCompetitions = filteredCompetitions.filter(comp => 
            comp.organizerName.toLowerCase().includes(filters.organizerName.toLowerCase())
          );
        }
        
        // Filtrage par dates
        if (filters.startDate) {
          filteredCompetitions = filteredCompetitions.filter(comp => 
            new Date(comp.startDate) >= new Date(filters.startDate)
          );
        }
        
        if (filters.endDate) {
          filteredCompetitions = filteredCompetitions.filter(comp => 
            new Date(comp.endDate) <= new Date(filters.endDate)
          );
        }
        
        // Filtrage par date de création
        if (filters.createdAt) {
          filteredCompetitions = filteredCompetitions.filter(comp => 
            new Date(comp.createdAt).toDateString() === new Date(filters.createdAt).toDateString()
          );
        }
        
        return {
          data: filteredCompetitions,
          total: filteredCompetitions.length,
          page: 1,
          pageSize: filteredCompetitions.length,
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.competitions.base, filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer une compétition par son ID
  getCompetitionById: async (id) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const competition = competitionsData.find(comp => comp.id === Number(id));
        if (!competition) {
          throw new Error('Compétition non trouvée');
        }
        return competition;
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.competitions.byId(id));
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les classements d'une compétition
  getCompetitionStandings: async (id) => {
    try {
      return await api.get(endpoints.competitions.standings(id));
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les équipes d'une compétition
  getCompetitionTeams: async (id) => {
    try {
      return await api.get(endpoints.competitions.teams(id));
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les matchs d'une compétition
  getCompetitionMatches: async (id, filters = {}) => {
    try {
      return await api.get(endpoints.competitions.matches(id), filters);
    } catch (error) {
      throw error;
    }
  },

  // Créer une nouvelle compétition (Organisateur uniquement)
  createCompetition: async (competitionData) => {
    try {
      return await api.post(endpoints.competitions.base, competitionData);
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour une compétition (Organisateur uniquement)
  updateCompetition: async (id, competitionData) => {
    try {
      return await api.put(endpoints.competitions.byId(id), competitionData);
    } catch (error) {
      throw error;
    }
  },

  // Supprimer une compétition (Organisateur uniquement)
  deleteCompetition: async (id) => {
    try {
      // En mode développement, simuler la suppression
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Vérifier si la compétition existe
        const competitionExists = competitionsData.some(comp => comp.id === Number(id));
        if (!competitionExists) {
          throw new Error('Compétition non trouvée');
        }
        
        return { success: true, message: 'Compétition supprimée avec succès' };
      }
      
      return await api.delete(endpoints.competitions.byId(id));
    } catch (error) {
      throw error;
    }
  },

  // Inscrire une équipe à une compétition (Coach uniquement)
  registerTeamToCompetition: async (competitionId, teamId) => {
    try {
      // En mode développement, simuler l'inscription
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Vérifier si la compétition existe
        const competitionExists = competitionsData.some(comp => comp.id === Number(competitionId));
        if (!competitionExists) {
          throw new Error('Compétition non trouvée');
        }
        
        return { success: true, message: 'Équipe inscrite avec succès à la compétition' };
      }
      
      return await api.post(`${endpoints.competitions.teams(competitionId)}/register`, { teamId });
    } catch (error) {
      throw error;
    }
  },

  // Désinscrire une équipe d'une compétition (Coach uniquement)
  unregisterTeamFromCompetition: async (competitionId, teamId) => {
    try {
      // En mode développement, simuler la désinscription
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Vérifier si la compétition existe
        const competitionExists = competitionsData.some(comp => comp.id === Number(competitionId));
        if (!competitionExists) {
          throw new Error('Compétition non trouvée');
        }
        
        return { success: true, message: 'Équipe désinscrite avec succès de la compétition' };
      }
      
      return await api.delete(`${endpoints.competitions.teams(competitionId)}/unregister/${teamId}`);
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer les compétitions d'un organisateur
  getOrganizerCompetitions: async (organizerId, filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        let filteredCompetitions = competitionsData.filter(comp => comp.organizerId === Number(organizerId));
        
        // Appliquer les filtres additionnels
        if (filters.status) {
          filteredCompetitions = filteredCompetitions.filter(comp => comp.status === filters.status);
        }
        
        if (filters.name) {
          filteredCompetitions = filteredCompetitions.filter(comp => 
            comp.name.toLowerCase().includes(filters.name.toLowerCase())
          );
        }
        
        if (filters.category) {
          filteredCompetitions = filteredCompetitions.filter(comp => comp.category === filters.category);
        }
        
        // Trier par date de début (du plus récent au plus ancien)
        filteredCompetitions.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        
        return {
          data: filteredCompetitions,
          total: filteredCompetitions.length,
          page: 1,
          pageSize: filteredCompetitions.length
        };
      }
      
      return await api.get(`${endpoints.organizers.competitions(organizerId)}`, filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les compétitions d'un utilisateur selon son rôle
  getUserCompetitions: async (userId) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Récupérer le rôle de l'utilisateur depuis le localStorage
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const userRole = user?.role;
        
        if (!userRole) {
          throw new Error('Utilisateur non connecté ou rôle non défini');
        }
        
        let userCompetitions = [];
        
        // Si c'est un organisateur, récupérer ses compétitions
        if (userRole === 'ORGANIZER') {
          userCompetitions = competitionsData.filter(comp => comp.organizerId === Number(userId));
        }
        // Si c'est un coach, récupérer les compétitions de ses équipes
        else if (userRole === 'COACH') {
          // D'abord, trouver les équipes de ce coach
          const coachTeams = teamsData.filter(team => team.coachId === Number(userId));
          
          if (coachTeams.length > 0) {
            // Récupérer les ID d'équipes
            const teamIds = coachTeams.map(team => team.id);
            
            // Récupérer les compétitions pour chaque équipe à partir des classements
            const competitionIds = standingsData
              .filter(standing => teamIds.includes(standing.teamId))
              .map(standing => standing.competitionId);
            
            // Éliminer les doublons
            const uniqueCompetitionIds = [...new Set(competitionIds)];
            
            // Récupérer les informations complètes des compétitions
            userCompetitions = competitionsData.filter(competition => 
              uniqueCompetitionIds.includes(competition.id)
            );
          }
        }
        
        return {
          data: userCompetitions,
          total: userCompetitions.length,
          page: 1,
          pageSize: userCompetitions.length
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.users.competitions(userId));
    } catch (error) {
      throw error;
    }
  },
};

export default competitionService;