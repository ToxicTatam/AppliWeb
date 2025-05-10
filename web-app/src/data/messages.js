// Données fictives pour les messages
const messages = [
  {
    id: 1,
    content: "Bonjour à tous les joueurs de l'équipe FC Olympique. L'entraînement de demain est déplacé à 18h00 en raison de travaux sur le terrain principal. Merci de votre compréhension.",
    senderId: 1,
    senderName: "Martin Dupont",
    senderRole: "COACH",
    recipientIds: [101, 102, 103, 104], // IDs des joueurs de l'équipe
    recipientCategory: "TEAM", // Message à toute l'équipe sans le coach
    relatedEntityId: 1,
    relatedEntityType: "TEAM",
    sentAt: "2024-09-10T10:15:00Z",
    readAt: "2024-09-10T11:30:00Z",
    isRead: true
  },
  {
    id: 2,
    content: "Thomas, j'ai remarqué que tu avais une légère gêne à l'entraînement d'hier. Comment te sens-tu aujourd'hui? Dois-tu consulter le kiné avant le match?",
    senderId: 1,
    senderName: "Martin Dupont",
    senderRole: "COACH",
    recipientIds: [102], // ID de Thomas Dupont
    recipientCategory: "INDIVIDUAL", // Message individuel
    relatedEntityId: 1,
    relatedEntityType: "TEAM",
    sentAt: "2024-09-12T08:45:00Z",
    readAt: "2024-09-12T09:20:00Z",
    isRead: true
  },
  {
    id: 3,
    content: "Coach, merci de vous inquiéter. J'ai fait quelques étirements et ça va mieux. Je serai en forme pour le match de dimanche.",
    senderId: 102, // ID de Thomas Dupont
    senderName: "Thomas Dupont",
    senderRole: "PLAYER",
    recipientIds: [1], // ID du coach Martin Dupont
    recipientCategory: "INDIVIDUAL",
    relatedEntityId: 1,
    relatedEntityType: "TEAM",
    sentAt: "2024-09-12T09:30:00Z",
    readAt: "2024-09-12T10:15:00Z",
    isRead: true
  },
  {
    id: 4,
    content: "Chers coachs, nous organisons une réunion technique le 15 octobre à 19h00 pour discuter des modifications de règlement pour la saison en cours. Votre présence est indispensable.",
    senderId: 201,
    senderName: "Fédération Nationale de Football",
    senderRole: "ORGANIZER",
    recipientIds: [], // Liste vide car on utilise une catégorie
    recipientCategory: "ALL_COACHES", // Message à tous les coachs
    relatedEntityId: null,
    relatedEntityType: null,
    sentAt: "2024-09-20T14:00:00Z",
    readAt: null,
    isRead: false
  },
  {
    id: 5,
    content: "Bonjour Pierre, j'aimerais que nous travaillions spécifiquement sur tes sorties aériennes lors de la prochaine séance. Qu'en penses-tu?",
    senderId: 1,
    senderName: "Martin Dupont",
    senderRole: "COACH",
    recipientIds: [101], // ID de Pierre Martin
    recipientCategory: "INDIVIDUAL",
    relatedEntityId: 1,
    relatedEntityType: "TEAM",
    sentAt: "2024-09-25T11:20:00Z",
    readAt: "2024-09-25T12:05:00Z",
    isRead: true
  },
  {
    id: 6,
    content: "Bien sûr coach, je suis tout à fait d'accord. C'est un point que je souhaite améliorer également.",
    senderId: 101, // ID de Pierre Martin
    senderName: "Pierre Martin",
    senderRole: "PLAYER",
    recipientIds: [1], // ID du coach Martin Dupont
    recipientCategory: "INDIVIDUAL",
    relatedEntityId: 1,
    relatedEntityType: "TEAM",
    sentAt: "2024-09-25T12:10:00Z",
    readAt: "2024-09-25T13:30:00Z",
    isRead: true
  },
  {
    id: 7,
    content: "Félicitations pour votre victoire! N'oubliez pas de compléter la feuille de match dans l'application avant ce soir.",
    senderId: 202, // ID de la Ligue Régionale Sud
    senderName: "Ligue Régionale Sud",
    senderRole: "ORGANIZER",
    recipientIds: [6], // ID du coach Paul Dubois
    recipientCategory: "INDIVIDUAL",
    relatedEntityId: 301, // ID de la compétition concernée
    relatedEntityType: "COMPETITION",
    sentAt: "2024-09-15T18:45:00Z",
    readAt: "2024-09-15T19:30:00Z",
    isRead: true
  },
  {
    id: 8,
    content: "Rappel à tous les joueurs: le photographe du club sera présent jeudi pour les photos officielles de l'équipe. Tenue officielle requise.",
    senderId: 4, // ID du coach Alexandre Blanc
    senderName: "Alexandre Blanc",
    senderRole: "COACH",
    recipientIds: [], // Liste vide car on utilise une catégorie
    recipientCategory: "TEAM", 
    relatedEntityId: 4, // ID de l'équipe Racing Club
    relatedEntityType: "TEAM",
    sentAt: "2024-09-28T09:00:00Z",
    readAt: null,
    isRead: false
  },
  {
    id: 9,
    content: "Nicolas, après analyse vidéo du dernier match, j'ai noté quelques points à travailler sur ton positionnement défensif. Pouvons-nous en discuter à l'entraînement demain?",
    senderId: 1,
    senderName: "Martin Dupont",
    senderRole: "COACH",
    recipientIds: [103], // ID de Nicolas Durand
    recipientCategory: "INDIVIDUAL",
    relatedEntityId: 1,
    relatedEntityType: "TEAM",
    sentAt: "2024-09-30T16:20:00Z",
    readAt: null,
    isRead: false
  },
  {
    id: 10,
    content: "Chers participants au Tournoi Régional Vétéran, nous vous rappelons que la cérémonie de remise des trophées aura lieu le 30 juin à 18h00 au Club House. Un cocktail suivra la remise des prix.",
    senderId: 202, // ID de la Ligue Régionale Sud
    senderName: "Ligue Régionale Sud",
    senderRole: "ORGANIZER",
    recipientIds: [], // Liste vide car on utilise une catégorie
    recipientCategory: "COMPETITION_COACHES", // Tous les coachs d'une compétition spécifique
    relatedEntityId: 302, // ID du Tournoi Régional Vétéran
    relatedEntityType: "COMPETITION",
    sentAt: "2024-06-20T10:15:00Z",
    readAt: "2024-06-20T11:45:00Z",
    isRead: true
  },
  {
    id: 11,
    content: "Bonjour à tous les joueurs et au coach. Notre équipe a une séance photos demain à 17h avant l'entraînement. Merci d'être ponctuels.",
    senderId: 101, // ID de Pierre Martin (capitaine)
    senderName: "Pierre Martin",
    senderRole: "PLAYER",
    recipientIds: [], // Liste vide car on utilise une catégorie
    recipientCategory: "TEAM_WITH_COACH", // Message à toute l'équipe et au coach
    relatedEntityId: 1,
    relatedEntityType: "TEAM",
    sentAt: "2024-10-01T08:30:00Z",
    readAt: null,
    isRead: false
  },
  {
    id: 12,
    content: "Attention à tous les organisateurs: la mise à jour de la plateforme est programmée pour ce soir à 23h. Le système sera indisponible pendant environ 2 heures.",
    senderId: 301, // ID de l'administrateur
    senderName: "Admin Système",
    senderRole: "ADMIN",
    recipientIds: [], // Liste vide car on utilise une catégorie
    recipientCategory: "ALL_ORGANIZERS", // Message à tous les organisateurs
    relatedEntityId: null,
    relatedEntityType: null,
    sentAt: "2024-10-05T15:00:00Z",
    readAt: null,
    isRead: false
  },
  {
    id: 13,
    content: "Message global à tous les utilisateurs de la plateforme: nous sommes heureux de vous annoncer le lancement de notre nouvelle fonctionnalité de statistiques avancées!",
    senderId: 301, // ID de l'administrateur
    senderName: "Admin Système",
    senderRole: "ADMIN",
    recipientIds: [], // Liste vide car on utilise une catégorie
    recipientCategory: "GLOBAL", // Message à tout le monde
    relatedEntityId: null,
    relatedEntityType: null,
    sentAt: "2024-10-10T09:15:00Z",
    readAt: null,
    isRead: false
  }
];

export default messages;