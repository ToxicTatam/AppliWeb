// Définition des liens de navigation pour l'application SportApp
// Ces liens sont utilisés dans les différents layouts pour générer le menu de navigation

export const navigationLinks = [
  { name: 'Tableau de bord', href: '/dashboard', icon: 'dashboard' },
  { name: 'Compétitions', href: '/dashboard/competitions', icon: 'trophy' },
  { name: 'Équipes', href: '/dashboard/teams', icon: 'team' },
  { name: 'Joueurs', href: '/dashboard/players', icon: 'user' },
  { name: 'Matchs', href: '/dashboard/matches', icon: 'whistle' },
  { name: 'Médiathèque', href: '/dashboard/media', icon: 'media' },
];

// Liens pour la partie publique (accessibles sans authentification)
export const publicNavigationLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Compétitions', href: '/competitions' },
  { name: 'Équipes', href: '/teams' },
  { name: 'Joueurs', href: '/players' },
  { name: 'Matchs', href: '/matches' },
  { name: 'Médiathèque', href: '/media' },
];

// Liens supplémentaires pour les utilisateurs authentifiés selon leur rôle
export const getAdditionalLinks = (userRole) => {
  const additionalLinks = [];
  
  // Liens communs pour PLAYER, COACH, ORGANIZER et ADMIN
  if (['PLAYER', 'COACH', 'ORGANIZER', 'ADMIN'].includes(userRole)) {
    additionalLinks.push(
      { name: 'Messagerie', href: '/dashboard/messages', icon: 'message' },
      { name: 'Notifications', href: '/dashboard/notifications', icon: 'notification' }
    );
  }
  
  // Liens spécifiques pour COACH
  if (userRole === 'COACH') {
    additionalLinks.push(
      { name: 'Gestion d\'équipe', href: '/dashboard/coach/teams', icon: 'manage-teams' },
      { name: 'Gestion de joueurs', href: '/dashboard/coach/players', icon: 'manage-players' },
      { name: 'Gestion de matchs', href: '/dashboard/coach/matches', icon: 'manage-matches' }
    );
  }
  
  // Liens spécifiques pour ORGANIZER
  if (userRole === 'ORGANIZER') {
    additionalLinks.push(
      { name: 'Gestion de compétitions', href: '/dashboard/organizer/competitions', icon: 'manage-competitions' },
      { name: 'Gestion de matchs', href: '/dashboard/organizer/matches', icon: 'manage-matches' }
    );
  }
  
  // Liens spécifiques pour ADMIN
  if (userRole === 'ADMIN') {
    additionalLinks.push(
      { name: 'Administration', href: '/dashboard/admin', icon: 'admin' }
    );
  }
  
  return additionalLinks;
};