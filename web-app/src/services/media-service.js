import api from '../lib/api/client';
import endpoints from '../lib/api/endpoints';
import mediaData from '../data/media';

// Service pour les médias
const mediaService = {
  // Récupérer tous les médias avec filtres optionnels
  getAllMedia: async (filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Filtrage côté client pour les données fictives
        let filteredMedia = [...mediaData];
        
        // Appliquer les filtres
        if (filters.title) {
          filteredMedia = filteredMedia.filter(media => 
            media.title.toLowerCase().includes(filters.title.toLowerCase())
          );
        }
        
        if (filters.mediaType) {
          filteredMedia = filteredMedia.filter(media => media.mediaType === filters.mediaType);
        }
        
        if (filters.competitionId) {
          filteredMedia = filteredMedia.filter(media => media.competitionId === Number(filters.competitionId));
        }
        
        if (filters.teamId) {
          filteredMedia = filteredMedia.filter(media => media.teamId === Number(filters.teamId));
        }
        
        if (filters.teamName) {
          filteredMedia = filteredMedia.filter(media => 
            media.teamName && media.teamName.toLowerCase().includes(filters.teamName.toLowerCase())
          );
        }
        
        if (filters.matchId) {
          filteredMedia = filteredMedia.filter(media => media.matchId === Number(filters.matchId));
        }
        
        if (filters.uploaderRole) {
          filteredMedia = filteredMedia.filter(media => media.uploaderRole === filters.uploaderRole);
        }
        
        // Filtrage par date
        if (filters.startDate) {
          filteredMedia = filteredMedia.filter(media => 
            new Date(media.uploadedAt) >= new Date(filters.startDate)
          );
        }
        
        if (filters.endDate) {
          filteredMedia = filteredMedia.filter(media => 
            new Date(media.uploadedAt) <= new Date(filters.endDate)
          );
        }
        
        return {
          data: filteredMedia,
          total: filteredMedia.length,
          page: 1,
          pageSize: filteredMedia.length,
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.media.base, filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer un média par son ID
  getMediaById: async (id) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const media = mediaData.find(media => media.id === Number(id));
        if (!media) {
          throw new Error('Média non trouvé');
        }
        return media;
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.media.byId(id));
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les médias d'une équipe
  getTeamMedia: async (teamId, filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        let filteredMedia = mediaData.filter(media => media.teamId === Number(teamId));
        
        // Appliquer les filtres additionnels
        if (filters.mediaType) {
          filteredMedia = filteredMedia.filter(media => media.mediaType === filters.mediaType);
        }
        
        if (filters.title) {
          filteredMedia = filteredMedia.filter(media => 
            media.title.toLowerCase().includes(filters.title.toLowerCase())
          );
        }
        
        // Trier par date de téléchargement (du plus récent au plus ancien)
        filteredMedia.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        
        return {
          data: filteredMedia,
          total: filteredMedia.length,
          page: 1,
          pageSize: filteredMedia.length
        };
      }
      
      return await api.get(endpoints.media.byTeam(teamId), filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les médias d'une compétition
  getCompetitionMedia: async (competitionId, filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        let filteredMedia = mediaData.filter(media => media.competitionId === Number(competitionId));
        
        // Appliquer les filtres additionnels
        if (filters.mediaType) {
          filteredMedia = filteredMedia.filter(media => media.mediaType === filters.mediaType);
        }
        
        if (filters.title) {
          filteredMedia = filteredMedia.filter(media => 
            media.title.toLowerCase().includes(filters.title.toLowerCase())
          );
        }
        
        // Trier par date de téléchargement (du plus récent au plus ancien)
        filteredMedia.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        
        return {
          data: filteredMedia,
          total: filteredMedia.length,
          page: 1,
          pageSize: filteredMedia.length
        };
      }
      
      return await api.get(endpoints.media.byCompetition(competitionId), filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les médias d'un match
  getMatchMedia: async (matchId, filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        let filteredMedia = mediaData.filter(media => media.matchId === Number(matchId));
        
        // Appliquer les filtres additionnels
        if (filters.mediaType) {
          filteredMedia = filteredMedia.filter(media => media.mediaType === filters.mediaType);
        }
        
        // Trier par date de téléchargement (du plus récent au plus ancien)
        filteredMedia.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        
        return {
          data: filteredMedia,
          total: filteredMedia.length,
          page: 1,
          pageSize: filteredMedia.length
        };
      }
      
      return await api.get(endpoints.media.byMatch(matchId), filters);
    } catch (error) {
      throw error;
    }
  },

  // Télécharger un nouveau média
  uploadMedia: async (mediaData, file) => {
    try {
      // En mode développement, simuler le téléchargement
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Créer un nouvel objet média (sans réellement l'ajouter aux données)
        const newMedia = {
          id: mediaData.length + 1,
          ...mediaData,
          uploadedAt: new Date().toISOString(),
          uploaderId: 1, // ID de l'utilisateur connecté
          viewCount: 0,
          url: file ? URL.createObjectURL(file) : 'https://example.com/mock-media-url',
          thumbnailUrl: 'https://example.com/mock-thumbnail-url'
        };
        
        return newMedia;
      }
      
      // Création d'un FormData pour envoyer le fichier
      const formData = new FormData();
      formData.append('file', file);
      
      // Ajout des métadonnées du média
      Object.keys(mediaData).forEach(key => {
        formData.append(key, mediaData[key]);
      });
      
      return await api.post(endpoints.media.upload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour un média
  updateMedia: async (id, mediaData) => {
    try {
      // En mode développement, simuler la mise à jour
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Vérifier si le média existe
        const mediaIndex = mediaData.findIndex(media => media.id === Number(id));
        if (mediaIndex === -1) {
          throw new Error('Média non trouvé');
        }
        
        // Créer un objet mis à jour (sans réellement modifier les données)
        const updatedMedia = {
          ...mediaData[mediaIndex],
          ...mediaData,
          updatedAt: new Date().toISOString()
        };
        
        return updatedMedia;
      }
      
      return await api.put(endpoints.media.byId(id), mediaData);
    } catch (error) {
      throw error;
    }
  },

  // Supprimer un média
  deleteMedia: async (id) => {
    try {
      // En mode développement, simuler la suppression
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Vérifier si le média existe
        const mediaExists = mediaData.some(media => media.id === Number(id));
        if (!mediaExists) {
          throw new Error('Média non trouvé');
        }
        
        return { success: true, message: 'Média supprimé avec succès' };
      }
      
      return await api.delete(endpoints.media.byId(id));
    } catch (error) {
      throw error;
    }
  },
  
  // Incrémenter le compteur de vues d'un média
  incrementViewCount: async (id) => {
    try {
      // En mode développement, simuler l'incrémentation
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Vérifier si le média existe
        const mediaIndex = mediaData.findIndex(media => media.id === Number(id));
        if (mediaIndex === -1) {
          throw new Error('Média non trouvé');
        }
        
        // Incrémenter le compteur (sans réellement modifier les données)
        const updatedMedia = {
          ...mediaData[mediaIndex],
          viewCount: (mediaData[mediaIndex].viewCount || 0) + 1
        };
        
        return updatedMedia;
      }
      
      return await api.post(`${endpoints.media.byId(id)}/view`);
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer les médias les plus populaires
  getPopularMedia: async (limit = 5) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Trier par nombre de vues (du plus vu au moins vu)
        const sortedMedia = [...mediaData].sort((a, b) => b.viewCount - a.viewCount);
        
        // Limiter le nombre de résultats
        return sortedMedia.slice(0, limit);
      }
      
      return await api.get(`${endpoints.media.base}/popular?limit=${limit}`);
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer les médias récents
  getRecentMedia: async (limit = 5) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Trier par date d'upload (du plus récent au plus ancien)
        const sortedMedia = [...mediaData].sort((a, b) => 
          new Date(b.uploadedAt) - new Date(a.uploadedAt)
        );
        
        // Limiter le nombre de résultats
        return sortedMedia.slice(0, limit);
      }
      
      return await api.get(`${endpoints.media.base}/recent?limit=${limit}`);
    } catch (error) {
      throw error;
    }
  },
};

export default mediaService;