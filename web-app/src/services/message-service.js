import api from '../lib/api/client';
import endpoints from '../lib/api/endpoints';
import messagesData from '../data/messages';

// Énumération des catégories de destinataires
const RecipientCategory = {
  INDIVIDUAL: 'INDIVIDUAL',
  TEAM: 'TEAM',
  TEAM_WITH_COACH: 'TEAM_WITH_COACH',
  ALL_PLAYERS: 'ALL_PLAYERS',
  ALL_COACHES: 'ALL_COACHES',
  ALL_ORGANIZERS: 'ALL_ORGANIZERS',
  COMPETITION_COACHES: 'COMPETITION_COACHES',
  GLOBAL: 'GLOBAL'
};

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
        const userRole = user?.role;
        
        if (!userId) {
          throw new Error('Utilisateur non connecté');
        }
        
        // Filtrer les messages où l'utilisateur est le destinataire
        let filteredMessages = messagesData.filter(message => {
          // Messages adressés directement à l'utilisateur
          if (message.recipientCategory === RecipientCategory.INDIVIDUAL && 
              message.recipientIds.includes(Number(userId))) {
            return true;
          }
          
          // Messages adressés à tous les membres d'une équipe
          if ((message.recipientCategory === RecipientCategory.TEAM || 
               message.recipientCategory === RecipientCategory.TEAM_WITH_COACH) && 
              userRole === 'PLAYER') {
            // Vérifier si le joueur fait partie de l'équipe concernée
            // Note: Ceci nécessiterait une requête additionnelle pour vérifier l'appartenance à l'équipe
            // Pour la démo, nous supposons que tous les messages de type TEAM sont visibles par le joueur
            return true;
          }
          
          // Messages adressés aux coachs des équipes d'une compétition
          if (message.recipientCategory === RecipientCategory.COMPETITION_COACHES && 
              userRole === 'COACH') {
            // Vérifier si le coach a une équipe inscrite dans la compétition concernée
            // Note: Ceci nécessiterait une requête additionnelle pour vérifier l'appartenance à la compétition
            // Pour la démo, nous supposons que tous les messages de ce type sont visibles par le coach
            return true;
          }
          
          // Messages adressés à tous les coachs
          if (message.recipientCategory === RecipientCategory.ALL_COACHES && 
              userRole === 'COACH') {
            return true;
          }
          
          // Messages adressés à tous les organisateurs
          if (message.recipientCategory === RecipientCategory.ALL_ORGANIZERS && 
              userRole === 'ORGANIZER') {
            return true;
          }
          
          // Messages adressés à tous les joueurs
          if (message.recipientCategory === RecipientCategory.ALL_PLAYERS && 
              userRole === 'PLAYER') {
            return true;
          }
          
          // Messages adressés à tout le monde
          if (message.recipientCategory === RecipientCategory.GLOBAL) {
            return true;
          }
          
          return false;
        });
        
        // Appliquer les filtres additionnels
        if (filters.isRead !== undefined) {
          filteredMessages = filteredMessages.filter(message => message.isRead === filters.isRead);
        }
        
        if (filters.recipientCategory) {
          filteredMessages = filteredMessages.filter(message => 
            message.recipientCategory === filters.recipientCategory
          );
        }
        
        if (filters.senderId) {
          filteredMessages = filteredMessages.filter(message => message.senderId === Number(filters.senderId));
        }
        
        if (filters.senderRole) {
          filteredMessages = filteredMessages.filter(message => 
            message.senderRole === filters.senderRole
          );
        }
        
        // Ajout du support pour le filtre par plusieurs rôles d'expéditeur
        if (filters.senderRoles && Array.isArray(filters.senderRoles)) {
          filteredMessages = filteredMessages.filter(message => 
            filters.senderRoles.includes(message.senderRole)
          );
        }
        
        // Exclusion de certains rôles d'expéditeur
        if (filters.excludeSenderRoles && Array.isArray(filters.excludeSenderRoles)) {
          filteredMessages = filteredMessages.filter(message => 
            !filters.excludeSenderRoles.includes(message.senderRole)
          );
        }
        
        if (filters.senderName) {
          filteredMessages = filteredMessages.filter(message => 
            message.senderName?.toLowerCase().includes(filters.senderName.toLowerCase())
          );
        }
        
        if (filters.relatedEntityId) {
          filteredMessages = filteredMessages.filter(message => 
            message.relatedEntityId === Number(filters.relatedEntityId)
          );
        }
        
        if (filters.relatedEntityType) {
          filteredMessages = filteredMessages.filter(message => 
            message.relatedEntityType === filters.relatedEntityType
          );
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
        if (filters.recipientCategory) {
          filteredMessages = filteredMessages.filter(message => 
            message.recipientCategory === filters.recipientCategory
          );
        }
        
        if (filters.recipientId) {
          filteredMessages = filteredMessages.filter(message => 
            message.recipientIds && message.recipientIds.includes(Number(filters.recipientId))
          );
        }
        
        if (filters.relatedEntityId) {
          filteredMessages = filteredMessages.filter(message => 
            message.relatedEntityId === Number(filters.relatedEntityId)
          );
        }
        
        if (filters.relatedEntityType) {
          filteredMessages = filteredMessages.filter(message => 
            message.relatedEntityType === filters.relatedEntityType
          );
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
      // Validation selon le rôle de l'utilisateur
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      const userRole = user?.role;
      
      if (!userRole) {
        throw new Error('Utilisateur non connecté ou rôle non défini');
      }
      
      // Validation de la structure du message selon le rôle
      validateMessageByRole(userRole, messageData);
      
      // En mode développement, simuler l'envoi
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler l'ajout du message aux données fictives
        const newMessage = {
          id: Math.max(...messagesData.map(m => m.id)) + 1,
          ...messageData,
          senderId: user.id,
          senderName: user.name || 'Utilisateur',
          senderRole: userRole,
          sentAt: new Date().toISOString(),
          readAt: null,
          isRead: false
        };
        
        messagesData.push(newMessage);
        return newMessage;
      }
      
      // En production, appel à l'API réelle
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
        const userRole = user?.role;
        
        if (!userId) {
          return 0;
        }
        
        // Compter les messages non lus où l'utilisateur est le destinataire
        const unreadCount = messagesData.filter(message => {
          // Messages adressés directement à l'utilisateur
          if (message.recipientCategory === RecipientCategory.INDIVIDUAL && 
              message.recipientIds.includes(Number(userId)) && 
              !message.isRead) {
            return true;
          }
          
          // Messages adressés à tous les membres d'une équipe
          if ((message.recipientCategory === RecipientCategory.TEAM || 
               message.recipientCategory === RecipientCategory.TEAM_WITH_COACH) && 
              userRole === 'PLAYER' && 
              !message.isRead) {
            return true;
          }
          
          // Messages adressés aux coachs des équipes d'une compétition
          if (message.recipientCategory === RecipientCategory.COMPETITION_COACHES && 
              userRole === 'COACH' && 
              !message.isRead) {
            return true;
          }
          
          // Messages adressés à tous les coachs
          if (message.recipientCategory === RecipientCategory.ALL_COACHES && 
              userRole === 'COACH' && 
              !message.isRead) {
            return true;
          }
          
          // Messages adressés à tous les organisateurs
          if (message.recipientCategory === RecipientCategory.ALL_ORGANIZERS && 
              userRole === 'ORGANIZER' && 
              !message.isRead) {
            return true;
          }
          
          // Messages adressés à tous les joueurs
          if (message.recipientCategory === RecipientCategory.ALL_PLAYERS && 
              userRole === 'PLAYER' && 
              !message.isRead) {
            return true;
          }
          
          // Messages adressés à tout le monde
          if (message.recipientCategory === RecipientCategory.GLOBAL && 
              !message.isRead) {
            return true;
          }
          
          return false;
        }).length;
        
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
  getPotentialRecipients: async (filters = {}) => {
    try {
      // Récupération du rôle utilisateur
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      const userRole = user?.role;
      
      if (!userRole) {
        throw new Error('Utilisateur non connecté ou rôle non défini');
      }
      
      let endpoint = '/messages/potential-recipients';
      
      // Adapter l'endpoint selon le rôle
      switch (userRole) {
        case 'PLAYER':
          // Un joueur peut contacter son coach, les joueurs de son équipe
          endpoint += `?userRole=${userRole}`;
          if (filters.teamId) {
            endpoint += `&teamId=${filters.teamId}`;
          }
          break;
        
        case 'COACH':
          // Un coach peut contacter les joueurs de ses équipes, les organisateurs
          endpoint += `?userRole=${userRole}`;
          if (filters.teamId) {
            endpoint += `&teamId=${filters.teamId}`;
          }
          if (filters.competitionId) {
            endpoint += `&competitionId=${filters.competitionId}`;
          }
          break;
        
        case 'ORGANIZER':
          // Un organisateur peut contacter les coachs, notamment ceux inscrits à ses compétitions
          endpoint += `?userRole=${userRole}`;
          if (filters.competitionId) {
            endpoint += `&competitionId=${filters.competitionId}`;
          }
          break;
        
        case 'ADMIN':
          // Un admin peut contacter tout le monde
          endpoint += `?userRole=${userRole}`;
          if (filters.targetRole) {
            endpoint += `&targetRole=${filters.targetRole}`;
          }
          break;
          
        default:
          throw new Error('Rôle non reconnu pour la récupération des destinataires potentiels');
      }
      
      // Ajout des filtres supplémentaires
      if (filters.search) {
        endpoint += `&search=${encodeURIComponent(filters.search)}`;
      }
      
      return await api.get(endpoint);
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer l'historique de conversation avec un utilisateur
  getConversationHistory: async (userId) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Récupération de l'ID utilisateur courant
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const currentUserId = user?.id;
        
        if (!currentUserId) {
          throw new Error('Utilisateur non connecté');
        }
        
        // Filtrer les messages échangés entre les deux utilisateurs
        const conversationMessages = messagesData.filter(message => {
          // Messages envoyés par l'utilisateur courant à l'utilisateur spécifique
          const sentByCurrentUser = message.senderId === Number(currentUserId) && 
                                   message.recipientCategory === RecipientCategory.INDIVIDUAL && 
                                   message.recipientIds.includes(Number(userId));
          
          // Messages reçus par l'utilisateur courant de la part de l'utilisateur spécifique
          const receivedFromUser = message.senderId === Number(userId) && 
                                  message.recipientCategory === RecipientCategory.INDIVIDUAL && 
                                  message.recipientIds.includes(Number(currentUserId));
          
          return sentByCurrentUser || receivedFromUser;
        });
        
        // Tri par date d'envoi (du plus ancien au plus récent)
        conversationMessages.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));
        
        return {
          data: conversationMessages,
          total: conversationMessages.length
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(`/messages/conversation/${userId}`);
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer les catégories de destinataires disponibles selon le rôle
  getAvailableRecipientCategories: (userRole) => {
    switch (userRole) {
      case 'PLAYER':
        return [
          RecipientCategory.INDIVIDUAL,  // Coach ou autre joueur
          RecipientCategory.TEAM,        // Tous les joueurs de l'équipe
          RecipientCategory.TEAM_WITH_COACH  // Tous les joueurs + coach
        ];
      
      case 'COACH':
        return [
          RecipientCategory.INDIVIDUAL,  // Joueur spécifique ou organisateur
          RecipientCategory.TEAM         // Tous les joueurs d'une équipe
        ];
      
      case 'ORGANIZER':
        return [
          RecipientCategory.INDIVIDUAL,          // Coach spécifique
          RecipientCategory.COMPETITION_COACHES  // Tous les coachs d'une compétition
        ];
      
      case 'ADMIN':
        return [
          RecipientCategory.INDIVIDUAL,      // Utilisateur spécifique
          RecipientCategory.ALL_COACHES,     // Tous les coachs
          RecipientCategory.ALL_ORGANIZERS,  // Tous les organisateurs
          RecipientCategory.ALL_PLAYERS,     // Tous les joueurs
          RecipientCategory.GLOBAL           // Tout le monde
        ];
      
      default:
        return [];
    }
  }
};

// Fonction de validation d'un message selon le rôle de l'expéditeur
function validateMessageByRole(userRole, messageData) {
  const { recipientCategory, recipientIds, relatedEntityId, relatedEntityType } = messageData;
  
  switch (userRole) {
    case 'PLAYER':
      // Vérifier que le joueur envoie un message à un destinataire autorisé
      if (![RecipientCategory.INDIVIDUAL, RecipientCategory.TEAM, RecipientCategory.TEAM_WITH_COACH].includes(recipientCategory)) {
        throw new Error("Un joueur ne peut envoyer un message qu'à son coach, à un autre joueur, ou à toute son équipe");
      }
      
      // Pour un message individuel, vérifier que recipientIds est renseigné
      if (recipientCategory === RecipientCategory.INDIVIDUAL && (!recipientIds || recipientIds.length === 0)) {
        throw new Error("L'ID du destinataire est requis pour un message individuel");
      }
      
      // Pour un message d'équipe, vérifier que relatedEntityId est renseigné
      if ([RecipientCategory.TEAM, RecipientCategory.TEAM_WITH_COACH].includes(recipientCategory) && !relatedEntityId) {
        throw new Error("L'ID de l'équipe est requis pour un message d'équipe");
      }
      break;
    
    case 'COACH':
      // Vérifier que le coach envoie un message à un destinataire autorisé
      if (![RecipientCategory.INDIVIDUAL, RecipientCategory.TEAM].includes(recipientCategory)) {
        throw new Error("Un coach ne peut envoyer un message qu'à un joueur, à tous les joueurs d'une équipe, ou à un organisateur");
      }
      
      // Pour un message individuel, vérifier que recipientIds est renseigné
      if (recipientCategory === RecipientCategory.INDIVIDUAL && (!recipientIds || recipientIds.length === 0)) {
        throw new Error("L'ID du destinataire est requis pour un message individuel");
      }
      
      // Pour un message d'équipe, vérifier que relatedEntityId est renseigné
      if (recipientCategory === RecipientCategory.TEAM && !relatedEntityId) {
        throw new Error("L'ID de l'équipe est requis pour un message d'équipe");
      }
      break;
    
    case 'ORGANIZER':
      // Vérifier que l'organisateur envoie un message à un destinataire autorisé
      if (![RecipientCategory.INDIVIDUAL, RecipientCategory.COMPETITION_COACHES].includes(recipientCategory)) {
        throw new Error("Un organisateur ne peut envoyer un message qu'à un coach ou à tous les coachs d'une compétition");
      }
      
      // Pour un message individuel, vérifier que recipientIds est renseigné
      if (recipientCategory === RecipientCategory.INDIVIDUAL && (!recipientIds || recipientIds.length === 0)) {
        throw new Error("L'ID du destinataire est requis pour un message individuel");
      }
      
      // Pour un message aux coachs d'une compétition, vérifier que relatedEntityId est renseigné
      if (recipientCategory === RecipientCategory.COMPETITION_COACHES && !relatedEntityId) {
        throw new Error("L'ID de la compétition est requis pour un message aux coachs d'une compétition");
      }
      break;
    
    case 'ADMIN':
      // L'admin peut envoyer un message à n'importe quel destinataire
      if (recipientCategory === RecipientCategory.INDIVIDUAL && (!recipientIds || recipientIds.length === 0)) {
        throw new Error("L'ID du destinataire est requis pour un message individuel");
      }
      break;
    
    default:
      throw new Error("Rôle non reconnu pour l'envoi de message");
  }
  
  // Vérification commune du contenu du message
  if (!messageData.content || messageData.content.trim() === '') {
    throw new Error("Le contenu du message ne peut pas être vide");
  }
  
  return true;
}

export default messageService;