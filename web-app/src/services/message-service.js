import api from '../lib/api/client';
import endpoints from '../lib/api/endpoints';
import messagesData from '../data/messages';

// Service pour les messages
const messageService = {
  // Récupérer tous les messages d'un utilisateur (Boîte de réception)
  getInboxMessages: async (filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Récupération de l'ID utilisateur depuis le localStorage
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const userId = user?.id;
        
        if (!userId) {
          throw new Error('Utilisateur non connecté');
        }
        
        // Filtrer les messages où l'utilisateur est le destinataire
        let filteredMessages = messagesData.filter(message => 
          message.recipientId.includes(Number(userId))
        );
        
        // Appliquer les filtres additionnels
        if (filters.isRead !== undefined) {
          filteredMessages = filteredMessages.filter(message => message.isRead === filters.isRead);
        }
        
        if (filters.messageType) {
          filteredMessages = filteredMessages.filter(message => message.messageType === filters.messageType);
        }
        
        if (filters.senderId) {
          filteredMessages = filteredMessages.filter(message => message.senderId === Number(filters.senderId));
        }
        
        if (filters.senderName) {
          filteredMessages = filteredMessages.filter(message => 
            message.senderName.toLowerCase().includes(filters.senderName.toLowerCase())
          );
        }
        
        if (filters.teamId) {
          filteredMessages = filteredMessages.filter(message => message.teamId === Number(filters.teamId));
        }
        
        // Tri par date d'envoi (du plus récent au plus ancien)
        filteredMessages.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
        
        return {
          data: filteredMessages,
          total: filteredMessages.length,
          page: 1,
          pageSize: filteredMessages.length,
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.messages.inbox, filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les messages envoyés par l'utilisateur
  getSentMessages: async (filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Récupération de l'ID utilisateur depuis le localStorage
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const userId = user?.id;
        
        if (!userId) {
          throw new Error('Utilisateur non connecté');
        }
        
        // Filtrer les messages où l'utilisateur est l'expéditeur
        let filteredMessages = messagesData.filter(message => 
          message.senderId === Number(userId)
        );
        
        // Appliquer les filtres additionnels
        if (filters.messageType) {
          filteredMessages = filteredMessages.filter(message => message.messageType === filters.messageType);
        }
        
        if (filters.recipientId) {
          filteredMessages = filteredMessages.filter(message => 
            message.recipientId.includes(Number(filters.recipientId))
          );
        }
        
        if (filters.recipientName) {
          filteredMessages = filteredMessages.filter(message => {
            const lowerCaseFilter = filters.recipientName.toLowerCase();
            return message.recipientName.some(name => 
              name.toLowerCase().includes(lowerCaseFilter)
            );
          });
        }
        
        if (filters.teamId) {
          filteredMessages = filteredMessages.filter(message => message.teamId === Number(filters.teamId));
        }
        
        // Tri par date d'envoi (du plus récent au plus ancien)
        filteredMessages.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
        
        return {
          data: filteredMessages,
          total: filteredMessages.length,
          page: 1,
          pageSize: filteredMessages.length,
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.messages.sent, filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer un message par son ID
  getMessageById: async (id) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const message = messagesData.find(message => message.id === Number(id));
        if (!message) {
          throw new Error('Message non trouvé');
        }
        return message;
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.messages.byId(id));
    } catch (error) {
      throw error;
    }
  },

  // Envoyer un nouveau message
  sendMessage: async (messageData) => {
    try {
      return await api.post(endpoints.messages.send, messageData);
    } catch (error) {
      throw error;
    }
  },

  // Marquer un message comme lu
  markAsRead: async (id) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const message = messagesData.find(message => message.id === Number(id));
        if (message) {
          message.isRead = true;
          message.readAt = new Date().toISOString();
        }
        return { success: true };
      }
      
      // En production, appel à l'API réelle
      return await api.post(endpoints.messages.read(id));
    } catch (error) {
      throw error;
    }
  },

  // Supprimer un message
  deleteMessage: async (id) => {
    try {
      return await api.delete(endpoints.messages.byId(id));
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer le nombre de messages non lus
  getUnreadCount: async () => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Récupération de l'ID utilisateur depuis le localStorage
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const userId = user?.id;
        
        if (!userId) {
          return 0;
        }
        
        // Compter les messages non lus où l'utilisateur est le destinataire
        const unreadCount = messagesData.filter(message => 
          message.recipientId.includes(Number(userId)) && !message.isRead
        ).length;
        
        return { count: unreadCount };
      }
      
      // En production, appel à l'API réelle
      const response = await api.get('/messages/unread-count');
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer les destinataires potentiels selon le rôle de l'utilisateur
  getPotentialRecipients: async (userRole) => {
    try {
      // En production, appel à l'API réelle
      return await api.get(`/messages/potential-recipients?userRole=${userRole}`);
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer l'historique de conversation avec un utilisateur
  getConversationHistory: async (userId) => {
    try {
      // En production, appel à l'API réelle
      return await api.get(`/messages/conversation/${userId}`);
    } catch (error) {
      throw error;
    }
  },
};

export default messageService;