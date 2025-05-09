/**
 * Configuration des endpoints de l'API pour l'application SportApp
 * Ce fichier centralise tous les points d'entrée de l'API utilisés dans les services
 */

// Base URL de l'API
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Endpoints pour l'authentification
const authEndpoints = {
  login: `${baseUrl}/auth/login`,
  register: `${baseUrl}/auth/register`,
  forgotPassword: `${baseUrl}/auth/forgot-password`,
  resetPassword: `${baseUrl}/auth/reset-password`,
  refreshToken: `${baseUrl}/auth/refresh-token`,
  logout: `${baseUrl}/auth/logout`,
  verifyEmail: `${baseUrl}/auth/verify-email`,
  me: `${baseUrl}/auth/me`,
};

// Endpoints pour les utilisateurs
const usersEndpoints = {
  base: `${baseUrl}/users`,
  byId: (id) => `${baseUrl}/users/${id}`,
  profile: `${baseUrl}/users/profile`,
  updateProfile: `${baseUrl}/users/profile`,
  changePassword: `${baseUrl}/users/change-password`,
  uploadProfilePicture: `${baseUrl}/users/profile-picture`,
};

// Endpoints pour les compétitions
const competitionsEndpoints = {
  base: `${baseUrl}/competitions`,
  byId: (id) => `${baseUrl}/competitions/${id}`,
  standings: (id) => `${baseUrl}/competitions/${id}/standings`,
  teams: (id) => `${baseUrl}/competitions/${id}/teams`,
  matches: (id) => `${baseUrl}/competitions/${id}/matches`,
  register: (id) => `${baseUrl}/competitions/${id}/register-team`,
  unregister: (id, teamId) => `${baseUrl}/competitions/${id}/unregister-team/${teamId}`,
  upcoming: `${baseUrl}/competitions/upcoming`,
  ongoing: `${baseUrl}/competitions/ongoing`,
  completed: `${baseUrl}/competitions/completed`,
  byOrganizer: (organizerId) => `${baseUrl}/competitions/organizer/${organizerId}`,
};

// Endpoints pour les équipes
const teamsEndpoints = {
  base: `${baseUrl}/teams`,
  byId: (id) => `${baseUrl}/teams/${id}`,
  players: (id) => `${baseUrl}/teams/${id}/players`,
  matches: (id) => `${baseUrl}/teams/${id}/matches`,
  competitions: (id) => `${baseUrl}/teams/${id}/competitions`,
  standings: (id) => `${baseUrl}/teams/${id}/standings`,
  coaches: (id) => `${baseUrl}/teams/${id}/coaches`,
  addPlayer: (id) => `${baseUrl}/teams/${id}/add-player`,
  removePlayer: (id, playerId) => `${baseUrl}/teams/${id}/remove-player/${playerId}`,
  byCoach: (coachId) => `${baseUrl}/teams/coach/${coachId}`,
};

// Endpoints pour les joueurs
const playersEndpoints = {
  base: `${baseUrl}/players`,
  byId: (id) => `${baseUrl}/players/${id}`,
  performances: (id) => `${baseUrl}/players/${id}/performances`,
  byTeam: (teamId) => `${baseUrl}/players/team/${teamId}`,
  byCompetition: (competitionId) => `${baseUrl}/players/competition/${competitionId}`,
  performanceByCompetition: (playerId, competitionId) => `${baseUrl}/players/${playerId}/competitions/${competitionId}/performance`,
};

// Endpoints pour les matchs
const matchesEndpoints = {
  base: `${baseUrl}/matches`,
  byId: (id) => `${baseUrl}/matches/${id}`,
  consolidated: (id) => `${baseUrl}/matches/${id}/consolidated`,
  byCompetition: (competitionId) => `${baseUrl}/matches/competition/${competitionId}`,
  byTeam: (teamId) => `${baseUrl}/matches/team/${teamId}`,
  upcoming: `${baseUrl}/matches/upcoming`,
  completed: `${baseUrl}/matches/completed`,
  live: `${baseUrl}/matches/live`,
  
  // Endpoints pour les feuilles de match
  matchSheets: {
    base: `${baseUrl}/match-sheets`,
    byId: (id) => `${baseUrl}/match-sheets/${id}`,
    byMatch: (matchId) => `${baseUrl}/match-sheets/match/${matchId}`,
    submit: (id) => `${baseUrl}/match-sheets/${id}/submit`,
    validate: (id) => `${baseUrl}/match-sheets/${id}/validate`,
    byTeam: (teamId) => `${baseUrl}/match-sheets/team/${teamId}`,
  },
};

// Endpoints pour les médias
const mediaEndpoints = {
  base: `${baseUrl}/media`,
  byId: (id) => `${baseUrl}/media/${id}`,
  upload: `${baseUrl}/media/upload`,
  byCompetition: (competitionId) => `${baseUrl}/media/competition/${competitionId}`,
  byTeam: (teamId) => `${baseUrl}/media/team/${teamId}`,
  byMatch: (matchId) => `${baseUrl}/media/match/${matchId}`,
  byUser: (userId) => `${baseUrl}/media/user/${userId}`,
};

// Endpoints pour les messages
const messagesEndpoints = {
  base: `${baseUrl}/messages`,
  byId: (id) => `${baseUrl}/messages/${id}`,
  inbox: `${baseUrl}/messages/inbox`,
  sent: `${baseUrl}/messages/sent`,
  send: `${baseUrl}/messages/send`,
  read: (id) => `${baseUrl}/messages/${id}/read`,
  conversation: (userId) => `${baseUrl}/messages/conversation/${userId}`,
  unreadCount: `${baseUrl}/messages/unread-count`,
  potentialRecipients: `${baseUrl}/messages/potential-recipients`,
};

// Endpoints pour les notifications
const notificationsEndpoints = {
  base: `${baseUrl}/notifications`,
  byId: (id) => `${baseUrl}/notifications/${id}`,
  read: (id) => `${baseUrl}/notifications/${id}/read`,
  readAll: `${baseUrl}/notifications/read-all`,
  count: `${baseUrl}/notifications/unread-count`,
};

// Endpoints pour les organisateurs
const organizersEndpoints = {
  base: `${baseUrl}/organizers`,
  byId: (id) => `${baseUrl}/organizers/${id}`,
  competitions: (id) => `${baseUrl}/organizers/${id}/competitions`,
};

// Endpoints pour les coachs
const coachesEndpoints = {
  base: `${baseUrl}/coaches`,
  byId: (id) => `${baseUrl}/coaches/${id}`,
  teams: (id) => `${baseUrl}/coaches/${id}/teams`,
  players: (id) => `${baseUrl}/coaches/${id}/players`,
};

// Endpoints pour les statistiques
const statsEndpoints = {
  topScorers: (competitionId) => `${baseUrl}/stats/top-scorers${competitionId ? `?competitionId=${competitionId}` : ''}`,
  topAssists: (competitionId) => `${baseUrl}/stats/top-assists${competitionId ? `?competitionId=${competitionId}` : ''}`,
  teamStats: (teamId) => `${baseUrl}/stats/team/${teamId}`,
  playerStats: (playerId) => `${baseUrl}/stats/player/${playerId}`,
  competitionStats: (competitionId) => `${baseUrl}/stats/competition/${competitionId}`,
};

// Regroupement de tous les endpoints
const endpoints = {
  auth: authEndpoints,
  users: usersEndpoints,
  competitions: competitionsEndpoints,
  teams: teamsEndpoints,
  players: playersEndpoints,
  matches: matchesEndpoints,
  media: mediaEndpoints,
  messages: messagesEndpoints,
  notifications: notificationsEndpoints,
  organizers: organizersEndpoints,
  coaches: coachesEndpoints,
  stats: statsEndpoints,
};

export default endpoints;