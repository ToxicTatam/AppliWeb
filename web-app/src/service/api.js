import axios from 'axios';

// Créer une instance axios avec l'URL de base
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Services pour les équipes
export const teamService = {
  getAll: () => api.get('/teams'),
  getById: (id) => api.get(`/teams/${id}`),
  create: (team) => api.post('/teams', team),
  update: (id, team) => api.put(`/teams/${id}`, team),
  delete: (id) => api.delete(`/teams/${id}`),
  getPlayers: (teamId) => api.get(`/teams/${teamId}/players`),
  addPlayer: (teamId, playerId) => api.post(`/teams/${teamId}/players/${playerId}`),
  removePlayer: (teamId, playerId) => api.delete(`/teams/${teamId}/players/${playerId}`),
};

// Services pour les compétitions
export const competitionService = {
  getAll: () => api.get('/competitions'),
  getById: (id) => api.get(`/competitions/${id}`),
  create: (competition) => api.post('/competitions', competition),
  update: (id, competition) => api.put(`/competitions/${id}`, competition),
  delete: (id) => api.delete(`/competitions/${id}`),
  getTeams: (competitionId) => api.get(`/competitions/${competitionId}/teams`),
  registerTeam: (competitionId, teamId) => api.post(`/competitions/${competitionId}/teams/${teamId}`),
  removeTeam: (competitionId, teamId) => api.delete(`/competitions/${competitionId}/teams/${teamId}`),
  getMatches: (competitionId) => api.get(`/competitions/${competitionId}/matches`),
};

// Services pour les joueurs
export const playerService = {
  getAll: () => api.get('/players'),
  getById: (id) => api.get(`/players/${id}`),
  create: (player) => api.post('/players', player),
  update: (id, player) => api.put(`/players/${id}`, player),
  delete: (id) => api.delete(`/players/${id}`),
  getStats: (playerId) => api.get(`/players/${playerId}/stats`),
  getTeams: (playerId) => api.get(`/players/${playerId}/teams`),
};

// Services pour les matchs
export const matchService = {
  getAll: () => api.get('/matches'),
  getById: (id) => api.get(`/matches/${id}`),
  create: (match) => api.post('/matches', match),
  update: (id, match) => api.put(`/matches/${id}`, match),
  delete: (id) => api.delete(`/matches/${id}`),
  getLineups: (matchId) => api.get(`/matches/${matchId}/lineups`),
  updateScore: (matchId, score) => api.put(`/matches/${matchId}/score`, score),
  submitMatchSheet: (matchId, matchSheet) => api.post(`/matches/${matchId}/sheets`, matchSheet),
};

// Services pour les coachs
export const coachService = {
  getTeams: () => api.get('/coaches/teams'),
  getMatches: () => api.get('/coaches/matches'),
  getPlayers: () => api.get('/coaches/players'),
};

// Services pour les médias
export const mediaService = {
  upload: (formData) => api.post('/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  getAll: () => api.get('/media'),
  delete: (id) => api.delete(`/media/${id}`),
};

export default api;