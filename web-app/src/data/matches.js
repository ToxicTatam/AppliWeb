// Données fictives pour les matchs
const matches = [
  {
    id: 1,
    title: "FC Olympique vs Racing Club",
    homeTeamId: 1,
    homeTeamName: "FC Olympique",
    awayTeamId: 4,
    awayTeamName: "Racing Club",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    competitionType: "LEAGUE",
    scheduledDateTime: "2024-09-15T15:00:00Z",
    status: "COMPLETED",
    homeTeamScore: 2,
    awayTeamScore: 1,
    hasMatchSheet: true,
    matchSheetStatus: "VALIDATED",
    round: "Journée 1",
    phase: "Phase régulière"
  },
  {
    id: 2,
    title: "Atlético FC vs FC Métropole",
    homeTeamId: 10,
    homeTeamName: "Atlético FC",
    awayTeamId: 7,
    awayTeamName: "FC Métropole",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    competitionType: "LEAGUE",
    scheduledDateTime: "2024-09-15T17:30:00Z",
    status: "COMPLETED",
    homeTeamScore: 0,
    awayTeamScore: 3,
    hasMatchSheet: true,
    matchSheetStatus: "VALIDATED",
    round: "Journée 1",
    phase: "Phase régulière"
  },
  {
    id: 3,
    title: "FC Olympique vs FC Métropole",
    homeTeamId: 1,
    homeTeamName: "FC Olympique",
    awayTeamId: 7,
    awayTeamName: "FC Métropole",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    competitionType: "LEAGUE",
    scheduledDateTime: "2024-09-29T15:00:00Z",
    status: "COMPLETED",
    homeTeamScore: 1,
    awayTeamScore: 1,
    hasMatchSheet: true,
    matchSheetStatus: "VALIDATED",
    round: "Journée 2",
    phase: "Phase régulière"
  },
  {
    id: 4,
    title: "Racing Club vs Atlético FC",
    homeTeamId: 4,
    homeTeamName: "Racing Club",
    awayTeamId: 10,
    awayTeamName: "Atlético FC",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    competitionType: "LEAGUE",
    scheduledDateTime: "2024-09-29T17:30:00Z",
    status: "COMPLETED",
    homeTeamScore: 2,
    awayTeamScore: 0,
    hasMatchSheet: true,
    matchSheetStatus: "VALIDATED",
    round: "Journée 2",
    phase: "Phase régulière"
  },
  {
    id: 5,
    title: "FC Métropole vs Racing Club",
    homeTeamId: 7,
    homeTeamName: "FC Métropole",
    awayTeamId: 4,
    awayTeamName: "Racing Club",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    competitionType: "LEAGUE",
    scheduledDateTime: "2024-10-13T15:00:00Z",
    status: "SCHEDULED",
    homeTeamScore: null,
    awayTeamScore: null,
    hasMatchSheet: false,
    matchSheetStatus: null,
    round: "Journée 3",
    phase: "Phase régulière"
  },
  {
    id: 6,
    title: "AS Victoria vs Jeunesse Athlétique",
    homeTeamId: 2,
    homeTeamName: "AS Victoria",
    awayTeamId: 5,
    awayTeamName: "Jeunesse Athlétique",
    competitionId: 2,
    competitionName: "Coupe Nationale Junior",
    competitionType: "CUP",
    scheduledDateTime: "2024-10-20T14:00:00Z",
    status: "SCHEDULED",
    homeTeamScore: null,
    awayTeamScore: null,
    hasMatchSheet: false,
    matchSheetStatus: null,
    round: "16ème de finale",
    phase: "Éliminatoires"
  },
  {
    id: 7,
    title: "Académie Sportive vs AS Victoria",
    homeTeamId: 8,
    homeTeamName: "Académie Sportive",
    awayTeamId: 2,
    awayTeamName: "AS Victoria",
    competitionId: 5,
    competitionName: "Championnat Départemental Junior",
    competitionType: "LEAGUE",
    scheduledDateTime: "2024-09-20T15:30:00Z",
    status: "COMPLETED",
    homeTeamScore: 1,
    awayTeamScore: 3,
    hasMatchSheet: true,
    matchSheetStatus: "VALIDATED",
    round: "Journée 1",
    phase: "Phase régulière"
  },
  {
    id: 8,
    title: "Étoile Sportive vs United Veterans",
    homeTeamId: 3,
    homeTeamName: "Étoile Sportive",
    awayTeamId: 6,
    awayTeamName: "United Veterans",
    competitionId: 3,
    competitionName: "Tournoi Régional Vétéran",
    competitionType: "TOURNAMENT",
    scheduledDateTime: "2024-06-12T16:00:00Z",
    status: "COMPLETED",
    homeTeamScore: 2,
    awayTeamScore: 2,
    hasMatchSheet: true,
    matchSheetStatus: "VALIDATED",
    round: "Phase de groupe",
    phase: "Groupe A"
  },
  {
    id: 9,
    title: "United Veterans vs Vétérans United",
    homeTeamId: 6,
    homeTeamName: "United Veterans",
    awayTeamId: 9,
    awayTeamName: "Vétérans United",
    competitionId: 3,
    competitionName: "Tournoi Régional Vétéran",
    competitionType: "TOURNAMENT",
    scheduledDateTime: "2024-06-15T16:00:00Z",
    status: "COMPLETED",
    homeTeamScore: 3,
    awayTeamScore: 1,
    hasMatchSheet: true,
    matchSheetStatus: "VALIDATED",
    round: "Phase de groupe",
    phase: "Groupe A"
  },
  {
    id: 10,
    title: "Atlético FC vs FC Olympique",
    homeTeamId: 10,
    homeTeamName: "Atlético FC",
    awayTeamId: 1,
    awayTeamName: "FC Olympique",
    competitionId: 1,
    competitionName: "Championnat National Senior",
    competitionType: "LEAGUE",
    scheduledDateTime: "2024-10-13T17:30:00Z",
    status: "SCHEDULED",
    homeTeamScore: null,
    awayTeamScore: null,
    hasMatchSheet: false,
    matchSheetStatus: null,
    round: "Journée 3",
    phase: "Phase régulière"
  },
  {
    id: 11,
    title: "Jeunesse Athlétique vs Académie Sportive",
    homeTeamId: 5,
    homeTeamName: "Jeunesse Athlétique",
    awayTeamId: 8,
    awayTeamName: "Académie Sportive",
    competitionId: 5,
    competitionName: "Championnat Départemental Junior",
    competitionType: "LEAGUE",
    scheduledDateTime: "2024-10-04T15:30:00Z",
    status: "IN_PROGRESS",
    homeTeamScore: 1,
    awayTeamScore: 0,
    hasMatchSheet: false,
    matchSheetStatus: null,
    round: "Journée 2",
    phase: "Phase régulière"
  },
  {
    id: 12,
    title: "Vétérans United vs Étoile Sportive",
    homeTeamId: 9,
    homeTeamName: "Vétérans United",
    awayTeamId: 3,
    awayTeamName: "Étoile Sportive",
    competitionId: 7,
    competitionName: "Coupe des Champions Vétérans",
    competitionType: "CUP",
    scheduledDateTime: "2024-11-10T14:00:00Z",
    status: "SCHEDULED",
    homeTeamScore: null,
    awayTeamScore: null,
    hasMatchSheet: false,
    matchSheetStatus: null,
    round: "Phase préliminaire",
    phase: "Tour 1"
  }
];

export default matches;