'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import authService from '@/services/auth-service';
import { USER_ROLES } from '@/context/AuthContext';
import teamService from '@/services/team-service';
import { useParams } from 'next/navigation';
import competitionService from '@/services/competition-service';
import { Card, CardContent, Typography, Box, Chip, Avatar, Button, Grid, Divider, Container, CircularProgress } from '@mui/material';
import { Email, Phone, Sports, LocationOn, WorkOutline, CalendarToday, Groups } from '@mui/icons-material';

const PublicProfilePage = ({ params }) => {
  const router = useRouter();
  const userId = useParams().id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Dans une app réelle, on utiliserait une API pour récupérer le profil public
        // Pour la démo, on utilise les utilisateurs prédéfinis
        
        // Simuler l'appel API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Récupérer les utilisateurs de la démo
        const predefinedUsers = [
          {
            id: 1,
            userName: "coach1",
            firstName: "Claude",
            lastName: "Entraîneur",
            phone: "+33678901234",
            profilePicture: "/avatars/coach.jpg",
            role: "COACH",
            licenseNumber: "CO54321",
            yearsOfExperience: 8,
            numberOfTeams: 2,
            createdAt: "2025-01-25T09:45:00Z",
            address: "Dans le 8ème arrondissement de Lyon",
            contactDetails: "contact@coach.com",
            specialization: "Entraînement technique et tactique",
            organization: "Lycée Jean Moulin",
            biography: "Entraîneur passionné avec plus de 8 ans d'expérience. Spécialisé dans le développement des jeunes talents et la tactique de jeu moderne. Diplômé de l'Institut National du Sport avec une certification UEFA B."
          },
          {
            id: 2,
            userName: "organizer1",
            firstName: "Olivier",
            lastName: "Organisateur",
            phone: "+33567890123",
            profilePicture: "/avatars/organizer.jpg",
            role: "ORGANIZER",
            organization: "Ligue Régionale de Football",
            activeCompetitionsCount: 3,
            createdAt: "2025-02-01T11:30:00Z",
            address: "456 Rue de Lyon, 69001 Lyon",
            contactDetails: "contact@organizer.com",
            biography: "Responsable de l'organisation des compétitions régionales depuis 2020. Expérience dans la gestion d'événements sportifs de grande envergure et dans la coordination de plus de 50 clubs. Passionné par le développement du sport local."
          }
        ];
        
        // Trouver l'utilisateur par ID
        const foundUser = predefinedUsers.find(u => u.id === Number(userId));
        
        if (!foundUser) {
          setError("Profil non trouvé");
          return;
        }
        
        // Vérifier si c'est un coach ou un organisateur
        if (foundUser.role !== USER_ROLES.COACH && foundUser.role !== USER_ROLES.ORGANIZER) {
          setError("Ce profil n'est pas accessible publiquement");
          return;
        }
        
        setUser(foundUser);
        
        // Charger les données supplémentaires selon le rôle
        if (foundUser.role === USER_ROLES.COACH) {
          // Simuler la récupération des équipes du coach
          const coachTeams = [
            { id: 1, name: "Équipe Senior A", category: "Senior", players: 22, competitions: 2 },
            { id: 2, name: "Équipe U19", category: "Junior", players: 18, competitions: 1 }
          ];
          setTeams(coachTeams);
        } else if (foundUser.role === USER_ROLES.ORGANIZER) {
          // Simuler la récupération des compétitions de l'organisateur
          const organizerCompetitions = [
            { id: 101, name: "Championnat Régional Senior", teams: 14, startDate: "2025-09-01", endDate: "2026-05-30", status: "À venir" },
            { id: 102, name: "Coupe Junior", teams: 32, startDate: "2025-10-15", endDate: "2026-04-20", status: "À venir" },
            { id: 103, name: "Tournoi d'Été", teams: 8, startDate: "2025-07-20", endDate: "2025-07-25", status: "À venir" }
          ];
          setCompetitions(organizerCompetitions);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du profil:", err);
        setError("Une erreur est survenue lors du chargement du profil");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [userId]);
  
  // Format date to show in a readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'Non renseigné';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h5" color="error" gutterBottom>{error}</Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/')}>
          Retour à l'accueil
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={4}>
            {/* Photo de profil et informations de base */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                sx={{ width: 180, height: 180, mb: 2 }}
                src={user.profilePicture || undefined}
                alt={`${user.firstName} ${user.lastName}`}
              >
                {user.firstName?.charAt(0) || user.userName?.charAt(0) || 'U'}
              </Avatar>
              
              <Chip 
                label={user.role === USER_ROLES.COACH ? 'Entraîneur' : 'Organisateur'} 
                color={user.role === USER_ROLES.COACH ? 'success' : 'warning'}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {user.firstName} {user.lastName}
              </Typography>
              
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', mb: 2 }}>
                @{user.userName}
              </Typography>
              
              {user.organization && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WorkOutline fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{user.organization}</Typography>
                </Box>
              )}
              
              {user.address && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{user.address}</Typography>
                </Box>
              )}
              
              {user.contactDetails && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{user.contactDetails}</Typography>
                </Box>
              )}
              
              {user.phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{user.phone}</Typography>
                </Box>
              )}
              
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                Membre depuis {formatDate(user.createdAt)}
              </Typography>
            </Grid>
            
            {/* Biographie et informations détaillées */}
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>Biographie</Typography>
              <Typography variant="body1" paragraph>
                {user.biography || "Aucune biographie disponible."}
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                {user.role === USER_ROLES.COACH ? 'Informations d\'entraîneur' : 'Informations d\'organisateur'}
              </Typography>
              
              <Grid container spacing={2}>
                {user.role === USER_ROLES.COACH && (
                  <>
                    {user.licenseNumber && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">Numéro de licence</Typography>
                        <Typography variant="body1">{user.licenseNumber}</Typography>
                      </Grid>
                    )}
                    
                    {user.yearsOfExperience !== undefined && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">Années d'expérience</Typography>
                        <Typography variant="body1">{user.yearsOfExperience} ans</Typography>
                      </Grid>
                    )}
                    
                    {user.specialization && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">Spécialisation</Typography>
                        <Typography variant="body1">{user.specialization}</Typography>
                      </Grid>
                    )}
                    
                    {user.numberOfTeams !== undefined && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">Nombre d'équipes</Typography>
                        <Typography variant="body1">{user.numberOfTeams} équipes</Typography>
                      </Grid>
                    )}
                  </>
                )}
                
                {user.role === USER_ROLES.ORGANIZER && (
                  <>
                    {user.organization && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">Organisation</Typography>
                        <Typography variant="body1">{user.organization}</Typography>
                      </Grid>
                    )}
                    
                    {user.activeCompetitionsCount !== undefined && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">Compétitions actives</Typography>
                        <Typography variant="body1">{user.activeCompetitionsCount} compétitions</Typography>
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Section des équipes (pour les coachs) */}
      {user.role === USER_ROLES.COACH && teams.length > 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Groups color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Équipes</Typography>
            </Box>
            
            <Grid container spacing={2}>
              {teams.map(team => (
                <Grid item xs={12} sm={6} md={4} key={team.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">{team.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{team.category}</Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip 
                          label={`${team.players} joueurs`} 
                          size="small" 
                          variant="outlined" 
                          sx={{ mr: 1, mb: 1 }} 
                        />
                        <Chip 
                          label={`${team.competitions} compétitions`} 
                          size="small" 
                          variant="outlined" 
                          sx={{ mb: 1 }} 
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
      
      {/* Section des compétitions (pour les organisateurs) */}
      {user.role === USER_ROLES.ORGANIZER && competitions.length > 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Sports color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Compétitions</Typography>
            </Box>
            
            <Grid container spacing={2}>
              {competitions.map(competition => (
                <Grid item xs={12} sm={6} key={competition.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">{competition.name}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                          {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
                        </Typography>
                        <Chip 
                          label={competition.status} 
                          size="small" 
                          color={competition.status === 'En cours' ? 'success' : competition.status === 'Terminé' ? 'default' : 'primary'}
                        />
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Chip 
                          label={`${competition.teams} équipes`} 
                          size="small" 
                          variant="outlined" 
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => router.push('/')}
        >
          Retour à l'accueil
        </Button>
      </Box>
    </Container>
  );
};

export default PublicProfilePage;