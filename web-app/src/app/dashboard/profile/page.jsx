'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/component/ui/Card';
import Button from '@/component/ui/Button';
import Badge from '@/component/ui/Badge';
import Alert from '@/component/ui/Alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/component/ui/Tabs';
import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setError("Vous devez être connecté pour accéder à cette page");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Simuler un délai réseau (remplacer par appel API réel)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données mockées pour la démo en fonction du rôle
        let profileData;
        
        switch(user.role) {
          case 'PLAYER':
            profileData = {
              type: 'PLAYER',
              id: 1,
              email: "mbouchard@example.com",
              userName: "mbouchard10",
              firstName: "Martin",
              lastName: "Bouchard",
              position: "STRIKER",
              licenseNumber: "FFF-12345-J",
              status: "ACTIVE",
              teamId: 1,
              teamName: "FC Barcelona U19",
              birthDate: "2005-05-15",
              age: 20,
              height: 183,
              weight: 75,
              nationality: "Français",
              profilePicture: null,
              phoneNumber: "+33 6 12 34 56 78",
              joinedDate: "2022-08-01"
            };
            break;
            
          case 'COACH':
            profileData = {
              type: 'COACH',
              id: 101,
              email: "pdupont@example.com",
              userName: "pdupont",
              firstName: "Pierre",
              lastName: "Dupont",
              licenseNumber: "FFF-COACH-567",
              phone: "+33 6 23 45 67 89",
              profilePicture: null,
              yearsOfExperience: 12,
              numberOfTeams: 2,
              teams: [
                { id: 1, name: "FC Barcelona U19" },
                { id: 2, name: "FC Barcelona U17" }
              ],
              specialization: "Formation de jeunes talents",
              certifications: ["UEFA Pro License", "Préparateur Physique Niveau 2"],
              birthDate: "1980-07-22",
              nationality: "Français",
              joinedDate: "2020-06-15"
            };
            break;
            
          case 'ORGANIZER':
            profileData = {
              type: 'ORGANIZER',
              id: 201,
              email: "aleclerc@example.com",
              userName: "aleclerc",
              firstName: "Antoine",
              lastName: "Leclerc",
              phone: "+33 6 34 56 78 90",
              profilePicture: null,
              organization: "Fédération Française de Football - Région Sud",
              activeCompetitionsCount: 4,
              competitions: [
                { id: 1, name: "Championnat National U19" },
                { id: 2, name: "Coupe Régionale U19" },
                { id: 3, name: "Championnat National U17" },
                { id: 4, name: "Tournoi de Préparation 2025" }
              ],
              role: "Directeur des compétitions jeunes",
              joinedDate: "2019-03-10"
            };
            break;
            
          case 'ADMIN':
            profileData = {
              type: 'ADMIN',
              id: 301,
              email: "admin@tournamenttracker.com",
              userName: "admin",
              firstName: "Admin",
              lastName: "System",
              profilePicture: null,
              joinedDate: "2019-01-01",
              lastLogin: "2025-05-06T08:30:00"
            };
            break;
            
          default:
            setError("Type d'utilisateur non reconnu");
            setLoading(false);
            return;
        }
        
        setProfile(profileData);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        setError("Impossible de charger votre profil. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const formatPosition = (position) => {
    switch (position) {
      case 'GOALKEEPER':
        return 'Gardien';
      case 'DEFENDER':
        return 'Défenseur';
      case 'MIDFIELDER':
        return 'Milieu';
      case 'STRIKER':
        return 'Attaquant';
      default:
        return position;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success">Actif</Badge>;
      case 'INJURED':
        return <Badge variant="error">Blessé</Badge>;
      case 'SUSPENDED':
        return <Badge variant="warning">Suspendu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container py-8">
        <Alert variant="error">
          <h3 className="font-bold">Erreur</h3>
          <p>{error || "Profil non trouvé"}</p>
          <Button className="mt-4" onClick={() => router.push('/dashboard')}>
            Retour au tableau de bord
          </Button>
        </Alert>
      </div>
    );
  }

  // Obtenir le titre de la page en fonction du type d'utilisateur
  const getProfileTitle = () => {
    switch(profile.type) {
      case 'PLAYER':
        return 'Profil Joueur';
      case 'COACH':
        return 'Profil Entraîneur';
      case 'ORGANIZER':
        return 'Profil Organisateur';
      case 'ADMIN':
        return 'Profil Administrateur';
      default:
        return 'Profil Utilisateur';
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{getProfileTitle()}</h1>
        <Button variant="outline" onClick={() => router.push('/dashboard/profile/edit')}>
          Modifier mon profil
        </Button>
      </div>

      {/* En-tête du profil */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-600 h-32 flex items-center justify-center">
          {profile.profilePicture ? (
            <img 
              src={profile.profilePicture}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="h-24 w-24 rounded-full border-4 border-white object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full border-4 border-white bg-blue-400 flex items-center justify-center">
              <span className="text-white font-bold text-4xl">
                {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {profile.firstName} {profile.lastName}
          </h2>
          
          {profile.type === 'PLAYER' && (
            <div className="flex items-center mt-2">
              {getStatusBadge(profile.status)}
              <span className="ml-2 text-gray-600">{formatPosition(profile.position)}</span>
            </div>
          )}
          
          {profile.type === 'COACH' && (
            <div className="mt-2 text-gray-600">
              Entraîneur avec {profile.yearsOfExperience} ans d'expérience
            </div>
          )}
          
          {profile.type === 'ORGANIZER' && (
            <div className="mt-2 text-gray-600">
              {profile.role} - {profile.organization}
            </div>
          )}
          
          <p className="text-gray-500 mt-2">Membre depuis {formatDate(profile.joinedDate)}</p>
        </div>
      </div>

      {/* Onglets pour les différentes sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-white rounded-lg mb-6 shadow-sm">
          <TabsTrigger value="info">Informations</TabsTrigger>
          
          {profile.type === 'PLAYER' && (
            <TabsTrigger value="team">Équipe</TabsTrigger>
          )}
          
          {profile.type === 'COACH' && (
            <TabsTrigger value="teams">Mes équipes</TabsTrigger>
          )}
          
          {profile.type === 'ORGANIZER' && (
            <TabsTrigger value="competitions">Mes compétitions</TabsTrigger>
          )}
          
          <TabsTrigger value="account">Compte</TabsTrigger>
        </TabsList>

        {/* Onglet Informations */}
        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Coordonnées</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {profile.email}
                    </p>
                    
                    {(profile.type === 'PLAYER' || profile.type === 'COACH' || profile.type === 'ORGANIZER') && (
                      <p className="text-gray-600">
                        <span className="font-medium">Téléphone:</span> {profile.type === 'PLAYER' ? profile.phoneNumber : profile.phone}
                      </p>
                    )}

                    {profile.type === 'PLAYER' && (
                      <>
                        <p className="text-gray-600">
                          <span className="font-medium">Adresse:</span> {profile.address}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Nationalité:</span> {profile.nationality}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Date de naissance:</span> {formatDate(profile.birthDate)} ({profile.age} ans)
                        </p>
                      </>
                    )}

                    {profile.type === 'COACH' && (
                      <>
                        <p className="text-gray-600">
                          <span className="font-medium">Licence:</span> {profile.licenseNumber}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Nationalité:</span> {profile.nationality}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Date de naissance:</span> {formatDate(profile.birthDate)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                {profile.type === 'PLAYER' && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Caractéristiques sportives</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Position:</span> {formatPosition(profile.position)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Équipe:</span> {profile.teamName}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Taille:</span> {profile.height} cm
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Poids:</span> {profile.weight} kg
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Numéro de licence:</span> {profile.licenseNumber}
                      </p>
                    </div>
                  </div>
                )}

                {profile.type === 'COACH' && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Expertise</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Années d'expérience:</span> {profile.yearsOfExperience}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Spécialisation:</span> {profile.specialization}
                      </p>
                      <div>
                        <p className="font-medium text-gray-600 mb-1">Certifications:</p>
                        <ul className="list-disc list-inside text-gray-600 pl-2">
                          {profile.certifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {profile.type === 'ORGANIZER' && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Organisation</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Organisation:</span> {profile.organization}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Rôle:</span> {profile.role}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Compétitions actives:</span> {profile.activeCompetitionsCount}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Équipe (Joueur) */}
        {profile.type === 'PLAYER' && (
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mon équipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">{profile.teamName.split(' ').map(word => word[0]).join('')}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{profile.teamName}</h3>
                    <p className="text-gray-500">ID équipe: {profile.teamId}</p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => router.push(`/dashboard/teams/${profile.teamId}`)}
                  className="w-full"
                >
                  Voir la page de l'équipe
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Onglet Équipes (Entraîneur) */}
        {profile.type === 'COACH' && (
          <TabsContent value="teams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes équipes ({profile.numberOfTeams})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.teams.map((team) => (
                    <div 
                      key={team.id}
                      className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/dashboard/teams/${team.id}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">{team.name.split(' ').map(word => word[0]).join('')}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{team.name}</h3>
                        </div>
                      </div>
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Onglet Compétitions (Organisateur) */}
        {profile.type === 'ORGANIZER' && (
          <TabsContent value="competitions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes compétitions ({profile.activeCompetitionsCount})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.competitions.map((competition) => (
                    <div 
                      key={competition.id}
                      className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/dashboard/competitions/${competition.id}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600 font-bold">C</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{competition.name}</h3>
                        </div>
                      </div>
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Onglet Compte (pour tous) */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de compte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">
                    <span className="font-medium">Nom d'utilisateur:</span> {profile.userName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {profile.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">ID utilisateur:</span> #{profile.id}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Membre depuis:</span> {formatDate(profile.joinedDate)}
                  </p>
                  {profile.type === 'ADMIN' && profile.lastLogin && (
                    <p className="text-gray-600">
                      <span className="font-medium">Dernière connexion:</span> {formatDate(profile.lastLogin)}
                    </p>
                  )}
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-4">Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline" 
                      onClick={() => router.push('/dashboard/profile/change-password')}
                      className="w-full sm:w-auto"
                    >
                      Changer mon mot de passe
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}