import api from '../lib/api/client';
import endpoints from '../lib/api/endpoints';

/**
 * Service pour la gestion des joueurs
 */

/**
 * Enregistre un nouveau joueur
 * @param {number} coachId - ID du coach
 * @param {number} teamId - ID de l'équipe
 * @param {Object} playerDTO - Données du joueur à enregistrer
 * @returns {Promise<Object>} - Joueur enregistré
 */
export const registerPlayer = async (coachId, teamId, playerDTO) => {
  const response = await api.post(endpoints.players.coach.register(coachId, teamId), playerDTO);
  return response.data;
};

/**
 * Met à jour un joueur existant
 * @param {number} coachId - ID du coach
 * @param {Object} playerDTO - Nouvelles données du joueur
 * @returns {Promise<Object>} - Joueur mis à jour
 */
export const updatePlayer = async (coachId, playerDTO) => {
  const response = await api.put(endpoints.players.coach.update(coachId), playerDTO);
  return response.data;
};

/**
 * Supprime un joueur
 * @param {number} coachId - ID du coach
 * @param {number} playerId - ID du joueur à supprimer
 * @returns {Promise<void>}
 */
export const removePlayer = async (coachId, playerId) => {
  await api.delete(endpoints.players.coach.remove(coachId, playerId));
};

/**
 * Récupère tous les joueurs d'un coach
 * @param {number} coachId - ID du coach
 * @returns {Promise<Array>} - Liste des joueurs
 */
export const getPlayersByCoach = async (coachId) => {
  const response = await api.get(endpoints.players.coach.all(coachId));
  return response.data;
};

/**
 * Récupère tous les joueurs d'une équipe
 * @param {number} coachId - ID du coach
 * @param {number} teamId - ID de l'équipe
 * @returns {Promise<Array>} - Liste des joueurs
 */
export const getPlayersByTeam = async (coachId, teamId) => {
  const response = await api.get(endpoints.players.coach.byTeam(coachId, teamId));
  return response.data;
};

/**
 * Récupère tous les joueurs d'une compétition (pour organisateurs)
 * @param {number} organizerId - ID de l'organisateur
 * @param {number} competitionId - ID de la compétition
 * @returns {Promise<Array>} - Liste des joueurs
 */
export const getPlayersByCompetition = async (organizerId, competitionId) => {
  const response = await api.get(endpoints.players.organizer.byCompetition(organizerId, competitionId));
  return response.data;
};

/**
 * Met à jour les performances d'un joueur lors d'un match (pour organisateurs)
 * @param {number} organizerId - ID de l'organisateur
 * @param {Object} playerPerformanceDTO - Données de performance
 * @returns {Promise<Object>} - Performance mise à jour
 */
export const updatePlayerMatchPerformance = async (organizerId, playerPerformanceDTO) => {
  const response = await api.put(endpoints.players.organizer.updatePerformance(organizerId), playerPerformanceDTO);
  return response.data;
};

/**
 * Récupère tous les joueurs selon les filtres spécifiés
 * @param {Object} filter - Filtres pour les joueurs
 * @returns {Promise<Array>} - Liste des joueurs
 */
export const getAllPlayers = async (filter = {}) => {
  const response = await api.get(endpoints.players.base, { params: filter });
  return response.data;
};

/**
 * Récupère un joueur par son ID
 * @param {number} playerId - ID du joueur
 * @returns {Promise<Object>} - Joueur trouvé
 */
export const getPlayerById = async (playerId) => {
  const response = await api.get(endpoints.players.byId(playerId));
  return response.data;
};

/**
 * Récupère les performances d'un joueur
 * @param {number} playerId - ID du joueur
 * @param {Object} filter - Filtres pour les performances
 * @returns {Promise<Array>} - Liste des performances
 */
export const getPlayerPerformance = async (playerId, filter = {}) => {
  const response = await api.get(endpoints.players.performance(playerId), { params: filter });
  return response.data;
};