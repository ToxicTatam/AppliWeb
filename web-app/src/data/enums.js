// Énumérations utilisées dans l'application
const enums = {
  // Statuts des matchs
  MatchStatus: {
    SCHEDULED: 'SCHEDULED',     // Match programmé, pas encore commencé
    IN_PROGRESS: 'IN_PROGRESS', // Match en cours
    COMPLETED: 'COMPLETED',     // Match terminé
    POSTPONED: 'POSTPONED',     // Match reporté à une date ultérieure
    CANCELLED: 'CANCELLED',     // Match annulé
    SUSPENDED: 'SUSPENDED'      // Match suspendu (temporairement)
  },
  
  // Statuts des feuilles de match
  MatchSheetStatus: {
    DRAFT: 'DRAFT',           // Brouillon (en cours d'édition par le coach)
    SUBMITTED: 'SUBMITTED',   // Soumise à l'organisateur pour validation
    VALIDATED: 'VALIDATED',   // Validée par l'organisateur
    UNVALIDATED: 'UNVALIDATED', // Non validée (rejetée par l'organisateur)
    ONGOING: 'ONGOING'        // En cours de remplissage pendant le match
  },
  
  // Rôle de l'équipe dans un match
  MatchRole: {
    HOME: 'HOME',  // Équipe à domicile
    AWAY: 'AWAY'   // Équipe à l'extérieur
  },
  
  // Statut du joueur dans une feuille de match
  PlayerStatus: {
    STARTER: 'STARTER',       // Titulaire
    SUBSTITUTE: 'SUBSTITUTE', // Remplaçant
    INJURED: 'INJURED',       // Blessé (non disponible)
    SUSPENDED: 'SUSPENDED',   // Suspendu
    ABSENT: 'ABSENT'          // Absent
  },
  
  // Positions des joueurs
  PlayerPosition: {
    GOALKEEPER: 'GOALKEEPER',   // Gardien de but
    DEFENDER: 'DEFENDER',       // Défenseur
    MIDFIELDER: 'MIDFIELDER',   // Milieu de terrain
    FORWARD: 'FORWARD',         // Attaquant
    UNKNOWN: 'UNKNOWN'          // Position non définie
  },
  
  // Types de compétition
  CompetitionType: {
    LEAGUE: 'LEAGUE',           // Championnat
    CUP: 'CUP',                 // Coupe
    TOURNAMENT: 'TOURNAMENT',   // Tournoi
    FRIENDLY: 'FRIENDLY'        // Match amical
  }
};

export default enums;