// Enums
export enum CompetitionStatus {
    UPCOMING = 'UPCOMING',
    REGISTRATION = 'REGISTRATION',
    ONGOING = 'ONGOING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
  }
  
  export enum CompetitionType {
    LEAGUE = 'LEAGUE',
    TOURNAMENT = 'TOURNAMENT',
    CUP = 'CUP'
  }
  
  export enum MatchStatus {
    SCHEDULED = 'SCHEDULED',
    ONGOING = 'ONGOING',
    COMPLETED = 'COMPLETED',
    POSTPONED = 'POSTPONED',
    CANCELLED = 'CANCELLED'
  }
  
  export enum MatchSheetStatus {
    VALIDATED = 'VALIDATED',
    UNVALIDATED = 'UNVALIDATED',
    ONGOING = 'ONGOING'
  }
  
  export enum MediaType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO',
    DOCUMENT = 'DOCUMENT'
  }
  
  export enum NotificationType {
    COMPETITION_REGISTRATION = 'COMPETITION_REGISTRATION',
    MATCH_REMINDER = 'MATCH_REMINDER',
    RESULT_UPDATE = 'RESULT_UPDATE',
    SYSTEM_MESSAGE = 'SYSTEM_MESSAGE'
  }
  
  export enum PlayerStatus {
    STARTER = 'STARTER',
    SUBSTITUTE = 'SUBSTITUTE',
    ENTERED = 'ENTERED',
    NOT_PLAYED = 'NOT_PLAYED',
    INJURED = 'INJURED',
    EXPELLED = 'EXPELLED'
  }
  
  export enum Role {
    COACH = 'COACH',
    ORGANIZER = 'ORGANIZER',
    ADMIN = 'ADMIN',
    PLAYER = 'PLAYER'
  }
  
  // Interfaces pour les modèles
  export interface User {
    id: number;
    email: string;
    password?: string;
    phoneNumber?: string;
    userName?: string;
    firstName: string;
    lastName: string;
    role: Role;
    profilPicture?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface Player extends User {
    licenseNumber: string;
    dateOfBirth: Date;
    team: Team;
  }
  
  export interface Team {
    id: number;
    name: string;
    description?: string;
    logo?: string;
    category: string;
    coach: User;
    players: Player[];
    competitions: Competition[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface Competition {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    registrationDeadline?: Date;
    location: string;
    maxTeams?: number;
    competitionType: CompetitionType;
    status: CompetitionStatus;
    organizer: User;
    teams: Team[];
    matches: Match[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface Match {
    id: number;
    competition: Competition;
    homeTeam: Team;
    awayTeam: Team;
    matchDate: Date;
    location?: string;
    homeScore?: number;
    awayScore?: number;
    status: MatchStatus;
    matchSheet?: MatchSheet;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface MatchSheet {
    id: number;
    match: Match;
    status: MatchSheetStatus;
    validationDate?: Date;
    playerParticipations: PlayerParticipation[];
    createdAt?: Date;
    updatedAt?: Date;
    homeStrategy?: string;
    awayStrategy?: string;
  }
  
  export interface PlayerParticipation {
    id: number;
    matchSheet: MatchSheet;
    player: Player;
    shirtNumber?: number;
    status: PlayerStatus;
    position?: string;
    goalsScored?: number;
    yellowCards?: number;
    redCards?: number;
    minutesPlayed?: number;
    createdAt?: Date;
    updatedAt?: Date;
    substitutionInTime?: number;
    substitutionOutTime?: number;
  }
  
  export interface PlayerHistory {
    id: number;
    player: Player;
    match: Match;
    goalsScored?: number;
    assists?: number;
    minutesPlayed?: number;
    yellowCards?: number;
    redCards?: number;
    status: PlayerStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface Standing {
    id: number;
    competition: Competition;
    team: Team;
    matchesPlayed?: number;
    matchesWon?: number;
    matchesDrawn?: number;
    matchesLost?: number;
    goalsFor?: number;
    goalsAgainst?: number;
    goalDifference?: number;
    points?: number;
    rank?: number;
    updatedAt?: Date;
  }
  
  export interface Media {
    id: number;
    title: string;
    url: string;
    type: MediaType;
    competition?: Competition;
    match?: Match;
    uploadedBy: User;
    createdAt?: Date;
  }
  
  export interface Notification {
    id: number;
    user: User;
    title: string;
    message: string;
    isRead: boolean;
    type: NotificationType;
    createdAt?: Date;
  }
  
  // DTOs
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }
  
  export interface ParticipationAndStrategyRequest {
    playerParticipations: PlayerParticipation[];
    strategy: string;
    homeTeam: boolean;
  }
  
  export interface PlayerPerformanceResponse {
    playerId: number;
    performancesByCompetition: CompetitionPerformance;
    overallStats: OverallPerformance;
  }
  
  export interface CompetitionPerformance {
    competitionId: number;
    competitionName: string;
    matchesPlayed: number;
    goalsScored: number;
    assists: number;
    minutesPlayed: number;
    yellowCards: number;
    redCards: number;
  }
  
  export interface OverallPerformance {
    matchesPlayed: number;
    goalsScored: number;
    assists: number;
    minutesPlayed: number;
    yellowCards: number;
    redCards: number;
  }