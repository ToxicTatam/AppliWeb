import api from '../lib/api/client';
import endpoints from '../lib/api/endpoints';

/**
 * Service de gestion des messages
 */

/**
 * Récupère les messages de la boîte de réception selon les filtres spécifiés
 * @param {Object} filter - Filtres pour la boîte de réception
 * @returns {Promise<Object>} - Messages de la boîte de réception
 */
export const getInboxMessages = async (filter = {}) => {
  const response = await api.get(endpoints.messages.inbox, { params: filter });
  return response.data;
};

/**
 * Récupère les messages envoyés selon les filtres spécifiés
 * @param {Object} filter - Filtres pour les messages envoyés
 * @returns {Promise<Object>} - Messages envoyés
 */
export const getSentMessages = async (filter = {}) => {
  const response = await api.get(endpoints.messages.sent, { params: filter });
  return response.data;
};

/**
 * Récupère un message spécifique par son ID
 * @param {number} messageId - ID du message
 * @returns {Promise<Object>} - Message trouvé
 */
export const getMessageById = async (messageId) => {
  const response = await api.get(endpoints.messages.byId(messageId));
  return response.data;
};

/**
 * Envoie un nouveau message
 * @param {Object} message - Données du message à envoyer
 * @returns {Promise<Object>} - Message envoyé
 */
export const sendMessage = async (message) => {
  const response = await api.post(endpoints.messages.send, message);
  return response.data;
};

/**
 * Marque un message comme lu
 * @param {number} messageId - ID du message à marquer comme lu
 * @returns {Promise<boolean>} - Status de l'opération
 */
export const markAsRead = async (messageId) => {
  const response = await api.put(endpoints.messages.read(messageId));
  return response.data;
};

/**
 * Marque tous les messages comme lus
 * @returns {Promise<boolean>} - Status de l'opération
 */
export const markAllAsRead = async () => {
  const response = await api.put(endpoints.messages.readAll);
  return response.data;
};

/**
 * Supprime un message
 * @param {number} messageId - ID du message à supprimer
 * @param {number} userId - ID de l'utilisateur qui effectue la suppression
 * @returns {Promise<void>}
 */
export const deleteMessage = async (messageId, userId) => {
  await api.delete(endpoints.messages.delete(messageId, userId));
};

/**
 * Récupère la liste des destinataires potentiels selon les filtres spécifiés
 * @param {Object} filter - Filtres pour les destinataires
 * @returns {Promise<Array>} - Liste des destinataires potentiels
 */
export const getPotentialRecipients = async (filter = {}) => {
  const response = await api.get(endpoints.messages.recipients, { params: filter });
  return response.data;
};

/**
 * Récupère les catégories de destinataires disponibles pour un rôle utilisateur spécifique
 * @param {string} userRole - Rôle de l'utilisateur
 * @returns {Promise<Array>} - Liste des catégories de destinataires
 */
export const getAvailableRecipientCategories = async (userRole) => {
  const response = await api.get(endpoints.messages.recipientCategories(userRole));
  return response.data;
};
