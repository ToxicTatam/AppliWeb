import api from '../lib/api/client';
import endpoints from '../lib/api/endpoints';
import notificationsData from '../data/notifications';

// Service pour les notifications
const notificationService = {
  // Récupérer toutes les notifications de l'utilisateur
  getAllNotifications: async (filters = {}) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Récupération de l'ID utilisateur depuis le localStorage
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const userId = user?.id;
        
        if (!userId) {
         // throw new Error('Utilisateur non connecté');
        }
        
        // Filtrer les notifications de l'utilisateur
        let filteredNotifications = notificationsData.filter(notification => 
          notification.recipientId === Number(userId)
        );
        
        // Appliquer les filtres additionnels
        if (filters.isRead !== undefined) {
          filteredNotifications = filteredNotifications.filter(notification => 
            notification.isRead === filters.isRead
          );
        }
        
        if (filters.notificationType) {
          filteredNotifications = filteredNotifications.filter(notification => 
            notification.notificationType === filters.notificationType
          );
        }
        
        if (filters.relatedEntityType) {
          filteredNotifications = filteredNotifications.filter(notification => 
            notification.relatedEntityType === filters.relatedEntityType
          );
        }
        
        // Tri par date de création (du plus récent au plus ancien)
        filteredNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        return {
          data: filteredNotifications,
          total: filteredNotifications.length,
          page: 1,
          pageSize: filteredNotifications.length,
        };
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.notifications.base, filters);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer une notification par son ID
  getNotificationById: async (id) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const notification = notificationsData.find(notification => notification.id === Number(id));
        if (!notification) {
          throw new Error('Notification non trouvée');
        }
        return notification;
      }
      
      // En production, appel à l'API réelle
      return await api.get(endpoints.notifications.byId(id));
    } catch (error) {
      throw error;
    }
  },

  // Marquer une notification comme lue
  markAsRead: async (id) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        const notification = notificationsData.find(notification => notification.id === Number(id));
        if (notification) {
          notification.isRead = true;
          notification.readAt = new Date().toISOString();
        }
        return { success: true };
      }
      
      // En production, appel à l'API réelle
      return await api.post(endpoints.notifications.read(id));
    } catch (error) {
      throw error;
    }
  },

  // Marquer toutes les notifications comme lues
  markAllAsRead: async () => {
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
        
        // Marquer toutes les notifications de l'utilisateur comme lues
        notificationsData.forEach(notification => {
          if (notification.recipientId === Number(userId) && !notification.isRead) {
            notification.isRead = true;
            notification.readAt = new Date().toISOString();
          }
        });
        
        return { success: true };
      }
      
      // En production, appel à l'API réelle
      return await api.post(endpoints.notifications.readAll);
    } catch (error) {
      throw error;
    }
  },

  // Récupérer le nombre de notifications non lues
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
        
        // Compter les notifications non lues de l'utilisateur
        const unreadCount = notificationsData.filter(notification => 
          notification.recipientId === Number(userId) && !notification.isRead
        ).length;
        
        return { count: unreadCount };
      }
      
      // En production, appel à l'API réelle
      const response = await api.get(endpoints.notifications.count);
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  // Récupérer les dernières notifications (nombre limité)
  getRecentNotifications: async (limit = 5) => {
    try {
      // En mode développement, utiliser les données fictives
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Récupération de l'ID utilisateur depuis le localStorage
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const userId = user?.id;
        
        if (!userId) {
          return [];
        }
        
        // Filtrer les notifications de l'utilisateur
        const userNotifications = notificationsData.filter(notification => 
          notification.recipientId === Number(userId)
        );
        
        // Trier par date de création (du plus récent au plus ancien)
        userNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Limiter le nombre de résultats
        return userNotifications.slice(0, limit);
      }
      
      // En production, appel à l'API réelle
      return await api.get(`${endpoints.notifications.base}/recent?limit=${limit}`);
    } catch (error) {
      throw error;
    }
  },
  
  // Supprimer une notification
  deleteNotification: async (id) => {
    try {
      return await api.delete(endpoints.notifications.byId(id));
    } catch (error) {
      throw error;
    }
  },
  
  // S'abonner à un canal de notifications (WebSocket)
  subscribeToNotifications: (userId, onNotificationReceived) => {
    if (typeof window !== 'undefined') {
      // Vérifier si l'API WebSocket est disponible
      if ('WebSocket' in window) {
        // URL du WebSocket
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws';
        const authToken = localStorage.getItem('authToken');
        
        // Connexion au WebSocket
        const socket = new WebSocket(`${wsUrl}/notifications?userId=${userId}&token=${authToken}`);
        
        socket.onmessage = (event) => {
          const notification = JSON.parse(event.data);
          onNotificationReceived(notification);
        };
        
        socket.onclose = () => {
          console.log('Connexion WebSocket fermée.');
        };
        
        socket.onerror = (error) => {
          console.error('Erreur WebSocket:', error);
        };
        
        // Retourner la connexion socket pour pouvoir la fermer plus tard
        return socket;
      }
    }
    
    return null;
  },
  
  // Fermer la connexion WebSocket
  unsubscribeFromNotifications: (socket) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  }
};

export default notificationService;