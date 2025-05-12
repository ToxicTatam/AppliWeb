import api from '../lib/api/client';
import endpoints from '../lib/api/endpoints';

// Utilisateurs prédéfinis pour le développement
const predefinedUsers = [
  {
    id: 1,
    userName: "user1",
    email: "user@example.com",
    firstName: "Utilisateur",
    lastName: "Simple",
    phone: "+33123456789",
    address: "123 Rue de Paris, 75001 Paris",
    profilePicture: "/avatars/user.jpg",
    role: "USER",
    createdAt: "2025-01-15T08:30:00Z"
  },    
  {
    id: 2,
    userName: "player1",
    email: "player@example.com",
    firstName: "Pierre",
    lastName: "Joueur",
    phone: "+33987654321",
    address: "456 Rue de Lyon, 69001 Lyon",
    dateOfBirth: "1992-08-20",
    profilePicture: "/avatars/player.jpg",
    role: "PLAYER",
    position: "MIDFIELDER",
    licenseNumber: "PL12345",
    teamId: 1,
    teamName: "Équipe A",
    createdAt: "2025-01-20T10:15:00Z"
  },
  {
    id: 3,
    userName: "coach1",
    email: "coach@example.com",
    firstName: "Claude",
    lastName: "Entraîneur",
    phone: "+33678901234",
    profilePicture: "/avatars/coach.jpg",
    role: "COACH",
    licenseNumber: "CO54321",
    yearsOfExperience: 8,
    numberOfTeams: 2,
    createdAt: "2025-01-25T09:45:00Z",
    address: "dans le 8ème arrondissement de Lyon",
    contactDetails: "contact@coach.com",
    specialization: "tranquillement",
    organization: "lycee"
  },
  {
    id: 4,
    userName: "organizer1",
    email: "organizer@example.com",
    firstName: "Olivier",
    lastName: "Organisateur",
    phone: "+33567890123",
    profilePicture: "/avatars/organizer.jpg",
    role: "ORGANIZER",
    organization: "Ligue Régionale de Football",
    activeCompetitionsCount: 3,
    createdAt: "2025-02-01T11:30:00Z",
    address: "456 Rue de Lyon, 69001 Lyon",
    contactDetails: "contact@organizer.com"
  },
  {
    id: 5,
    userName: "admin1",
    email: "admin@example.com",
    firstName: "Albert",
    lastName: "Administrateur",
    phone: "+33456789012",
    profilePicture: "/avatars/admin.jpg",
    role: "ADMIN",
    createdAt: "2025-01-10T08:00:00Z",
     address: "456 Rue de Lyon, 69001 Lyon",
    contactDetails: "contact@admin.com"
  }
];

// Service d'authentification
const AuthService = {
  // Connexion utilisateur
  login: async (credentials) => {
    try {
      // En mode développement, utiliser les utilisateurs prédéfinis
      // if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      //   // Simuler un délai réseau
      //   await new Promise(resolve => setTimeout(resolve, 800));
        
      //   // Rechercher l'utilisateur correspondant
      //   const user = predefinedUsers.find(
      //     u => (u.email === credentials.email || u.userName === credentials.email) && 
      //          // Dans un environnement réel, le mot de passe serait haché
      //          // Pour le développement, acceptons n'importe quel mot de passe qui a au moins 6 caractères
      //          credentials.password && credentials.password.length >= 6
      //   );
        
      //   if (!user) {
      //     throw new Error("Identifiants invalides");
      //   }
        
      //   // Générer un token fictif (dans un environnement réel, ce serait un JWT)
      //   const token = `mock-token-${user.id}-${Date.now()}`;
        
      //   // Simuler la réponse de l'API
      //   const response = {
      //     token,
      //     user,
      //     success: true,
      //     message: "Connexion réussie"
      //   };
        
      //   // Stocker dans localStorage comme avec l'API réelle
      //   localStorage.setItem('authToken', response.token);
      //   localStorage.setItem('user', JSON.stringify(response.user));
        
      //   return response;
      // }
      
      // En production, appel à l'API réelle
      const response = await api.post(endpoints.auth.login, credentials);
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Inscription utilisateur
  register: async (userData) => {
    try {
      // En mode développement, simuler l'inscription
      // if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      //   // Simuler un délai réseau
      //   await new Promise(resolve => setTimeout(resolve, 1000));
        
      //   // Vérifier si l'email ou le nom d'utilisateur existe déjà
      //   const userExists = predefinedUsers.some(
      //     u => u.email === userData.email || u.userName === userData.userName
      //   );
        
      //   if (userExists) {
      //     throw new Error("Cet email ou nom d'utilisateur est déjà utilisé");
      //   }
        
      //   // Simuler la création d'un utilisateur (sans réellement l'ajouter à la liste)
      //   const newUser = {
      //     id: predefinedUsers.length + 1,
      //     ...userData,
      //     createdAt: new Date().toISOString()
      //   };
        
      //   return {
      //     success: true,
      //     message: "Inscription réussie",
      //     user: newUser
      //   };
      // }
      
      // En production, appel à l'API réelle
      return await api.post(endpoints.auth.register, userData);
    } catch (error) {
      throw error;
    }
  },

  // Récupération du mot de passe
  forgotPassword: async (email) => {
    try {
      // En mode développement, simuler l'envoi d'email
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Vérifier si l'email existe
        const userExists = predefinedUsers.some(u => u.email === email);
        
        if (!userExists) {
          // Pour des raisons de sécurité, ne pas indiquer si l'email existe ou non
          return {
            success: true,
            message: "Si cet email existe dans notre système, des instructions de récupération ont été envoyées"
          };
        }
        
        return {
          success: true,
          message: "Instructions de récupération envoyées à votre adresse email"
        };
      }
      
      // En production, appel à l'API réelle
      return await api.post(endpoints.auth.forgotPassword, { email });
    } catch (error) {
      throw error;
    }
  },

  // Réinitialisation du mot de passe
  resetPassword: async (token, newPassword) => {
    try {
      return await api.post(endpoints.auth.resetPassword, { token, newPassword });
    } catch (error) {
      throw error;
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // Optionnel : appel à l'API pour invalider le token côté serveur
    return api.post(endpoints.auth.logout);
  },

  // Récupération des infos de l'utilisateur connecté
  getCurrentUser: async () => {
    try {
      // Essayer de récupérer l'utilisateur du localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr);
      }

      // Si non disponible, faire un appel API
      const response = await api.get(endpoints.auth.me);
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return localStorage.getItem('authToken') !== null;
  },

  // Récupérer le rôle de l'utilisateur
  getUserRole: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.role;
    }
    return null;
  },

  // Rafraîchir le token
  refreshToken: async () => {
    try {
      const response = await api.post(endpoints.auth.refreshToken);
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;