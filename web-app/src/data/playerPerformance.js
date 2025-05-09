// Données fictives pour les performances des joueurs
const playerPerformance = [
  {
    id: 1,
    playerId: 1,
    playerName: "Pierre Martin",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    
    // Statistiques communes
    totalMatches: 5,
    totalMinutesPlayed: 450,
    totalFouls: 2,
    totalYellowCards: 0,
    totalRedCards: 0,
    
    // Statistiques pour gardien de but
    savesMade: 25,
    cleanSheets: 2,
    penaltiesSaved: 1,
    goalsConceded: 5,
    savePercentage: 83.4,
    
    rating: 7.8,
    notes: "Gardien solide, bonne communication avec sa défense"
  },
  {
    id: 2,
    playerId: 2,
    playerName: "Thomas Dupont",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    
    // Statistiques communes
    totalMatches: 5,
    totalMinutesPlayed: 450,
    totalFouls: 6,
    totalYellowCards: 2,
    totalRedCards: 0,
    
    // Statistiques défensives
    interceptions: 18,
    ballsLost: 4,
    
    // Autres statistiques
    totalGoals: 1,
    totalAssists: 0,
    ballsRecovered: 25,
    successfulPasses: 210,
    passAccuracy: 88.5,
    
    rating: 7.5,
    notes: "Défenseur fiable, bon dans le jeu aérien"
  },
  {
    id: 3,
    playerId: 3,
    playerName: "Nicolas Durand",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    
    // Statistiques communes
    totalMatches: 3,
    totalMinutesPlayed: 210,
    totalFouls: 5,
    totalYellowCards: 1,
    totalRedCards: 0,
    
    // Statistiques milieu de terrain
    passAccuracy: 91.2,
    successfulPasses: 186,
    ballsRecovered: 20,
    successfulCrosses: 8,
    
    // Autres statistiques
    totalGoals: 1,
    totalAssists: 2,
    totalShots: 6,
    shotsOnTarget: 3,
    successfulDribbles: 14,
    interceptions: 12,
    ballsLost: 9,
    
    rating: 7.4,
    notes: "Bon créateur de jeu, vision excellente"
  },
  {
    id: 4,
    playerId: 4,
    playerName: "Alexandre Petit",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    
    // Statistiques communes
    totalMatches: 5,
    totalMinutesPlayed: 425,
    totalFouls: 6,
    totalYellowCards: 1,
    totalRedCards: 0,
    
    // Statistiques offensives
    totalGoals: 3,
    totalAssists: 2,
    totalShots: 15,
    shotsOnTarget: 10,
    penaltiesScored: 1,
    penaltiesTaken: 1,
    successfulDribbles: 20,
    
    // Autres statistiques
    passAccuracy: 79.5,
    successfulPasses: 102,
    successfulCrosses: 6,
    ballsLost: 18,
    
    rating: 8.2,
    notes: "Attaquant efficace, bon à la finition"
  },
  {
    id: 5,
    playerId: 5,
    playerName: "Lucas Moreau",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    
    // Statistiques communes
    totalMatches: 5,
    totalMinutesPlayed: 450,
    totalFouls: 1,
    totalYellowCards: 0,
    totalRedCards: 0,
    
    // Statistiques pour gardien de but
    savesMade: 22,
    cleanSheets: 1,
    penaltiesSaved: 0,
    goalsConceded: 7,
    savePercentage: 75.8,
    
    rating: 7.2,
    notes: "Gardien réactif, réflexes rapides"
  },
  {
    id: 6,
    playerId: 8,
    playerName: "Antoine Michel",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    
    // Statistiques communes
    totalMatches: 5,
    totalMinutesPlayed: 435,
    totalFouls: 8,
    totalYellowCards: 2,
    totalRedCards: 0,
    
    // Statistiques offensives
    totalGoals: 4,
    totalAssists: 1,
    totalShots: 18,
    shotsOnTarget: 11,
    penaltiesScored: 1,
    penaltiesTaken: 2,
    successfulDribbles: 15,
    
    // Autres statistiques
    passAccuracy: 76.2,
    successfulPasses: 94,
    successfulCrosses: 4,
    ballsLost: 22,
    
    rating: 8.0,
    notes: "Buteur efficace, bonne présence dans la surface"
  },
  {
    id: 7,
    playerId: 13,
    playerName: "Paul Dubois",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    
    // Statistiques communes
    totalMatches: 5,
    totalMinutesPlayed: 450,
    totalFouls: 0,
    totalYellowCards: 0,
    totalRedCards: 0,
    
    // Statistiques pour gardien de but
    savesMade: 29,
    cleanSheets: 2,
    penaltiesSaved: 1,
    goalsConceded: 4,
    savePercentage: 87.9,
    
    rating: 8.1,
    notes: "Gardien talentueux, excellentes sorties aériennes"
  },
  {
    id: 8,
    playerId: 16,
    playerName: "Gabriel Perrin",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    
    // Statistiques communes
    totalMatches: 5,
    totalMinutesPlayed: 415,
    totalFouls: 7,
    totalYellowCards: 1,
    totalRedCards: 0,
    
    // Statistiques offensives
    totalGoals: 5,
    totalAssists: 3,
    totalShots: 20,
    shotsOnTarget: 12,
    penaltiesScored: 2,
    penaltiesTaken: 2,
    successfulDribbles: 24,
    
    // Autres statistiques
    passAccuracy: 80.1,
    successfulPasses: 110,
    successfulCrosses: 7,
    ballsLost: 16,
    
    rating: 8.5,
    notes: "Attaquant vedette, technique exceptionnelle"
  },
  {
    id: 9,
    playerId: 9,
    playerName: "Mathis Robert",
    competitionId: 5,
    competitionName: "Championnat Départemental Junior",
    
    // Statistiques communes
    totalMatches: 2,
    totalMinutesPlayed: 180,
    totalFouls: 0,
    totalYellowCards: 0,
    totalRedCards: 0,
    
    // Statistiques pour gardien de but
    savesMade: 10,
    cleanSheets: 0,
    penaltiesSaved: 0,
    goalsConceded: 3,
    savePercentage: 76.9,
    
    rating: 7.0,
    notes: "Jeune gardien prometteur, bonne lecture du jeu"
  },
  {
    id: 10,
    playerId: 12,
    playerName: "Léo Roux",
    competitionId: 5,
    competitionName: "Championnat Départemental Junior",
    
    // Statistiques communes
    totalMatches: 2,
    totalMinutesPlayed: 180,
    totalFouls: 3,
    totalYellowCards: 0,
    totalRedCards: 0,
    
    // Statistiques offensives
    totalGoals: 3,
    totalAssists: 1,
    totalShots: 8,
    shotsOnTarget: 5,
    penaltiesScored: 0,
    penaltiesTaken: 0,
    successfulDribbles: 11,
    
    // Autres statistiques
    passAccuracy: 75.0,
    successfulPasses: 48,
    successfulCrosses: 2,
    ballsLost: 8,
    
    rating: 8.3,
    notes: "Jeune attaquant talentueux, excellente finition"
  }
];

export default playerPerformance;