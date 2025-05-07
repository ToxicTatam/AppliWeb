'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/component/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/component/ui/Tabs';

export default function PlayerPerformances() {
  const { user } = useAuth();
  const [performances, setPerformances] = useState({
    overall: null,
    byCompetition: [],
    byMatch: []
  });
  const [selectedView, setSelectedView] = useState('overall');
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      setLoading(true);
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées pour les compétitions
        const competitionsData = [
          { id: 1, name: 'Championnat National 2025' },
          { id: 2, name: 'Coupe Régionale 2025' },
          { id: 3, name: 'Tournoi Inter-clubs' }
        ];
        
        // Données simulées pour les performances globales
        const overallStats = {
          id: 1,
          playerId: user?.id || 1,
          playerName: 'Martin Bouchard',
          competitionId: null,
          competitionName: null,
          
          // Common statistics
          totalMatches: 15,
          totalMinutesPlayed: 1350,
          totalFouls: 12,
          totalYellowCards: 2,
          totalRedCards: 0,
          
          // Offensive statistics
          totalGoals: 8,
          totalAssists: 5,
          totalShots: 42,
          shotsOnTarget: 22,
          penaltiesScored: 2,
          penaltiesTaken: 3,
          successfulDribbles: 24,
          
          // Midfield statistics
          passAccuracy: 78.5,
          successfulPasses: 305,
          ballsRecovered: 45,
          successfulCrosses: 18,
          
          // Defensive statistics
          interceptions: 22,
          ballsLost: 17,
          
          // Goalkeeper statistics (non applicable for this player)
          savesMade: null,
          cleanSheets: null,
          penaltiesSaved: null,
          goalsConceded: null,
          savePercentage: null,
          
          rating: 7.6,
          notes: "Joueur offensif avec de bonnes statistiques de buts",
          
          performanceType: "GLOBAL",
          matchId: null,
          matchTitle: null
        };
        
        // Données simulées pour les performances par compétition
        const byCompetitionStats = [
          { 
            id: 2,
            playerId: user?.id || 1,
            playerName: 'Martin Bouchard',
            competitionId: 1,
            competitionName: 'Championnat National 2025',
            
            totalMatches: 8,
            totalMinutesPlayed: 720,
            totalFouls: 7,
            totalYellowCards: 1,
            totalRedCards: 0,
            
            totalGoals: 5,
            totalAssists: 3,
            totalShots: 23,
            shotsOnTarget: 12,
            penaltiesScored: 1,
            penaltiesTaken: 1,
            successfulDribbles: 16,
            
            passAccuracy: 79.2,
            successfulPasses: 165,
            ballsRecovered: 28,
            successfulCrosses: 10,
            
            interceptions: 12,
            ballsLost: 9,
            
            savesMade: null,
            cleanSheets: null,
            penaltiesSaved: null,
            goalsConceded: null,
            savePercentage: null,
            
            rating: 7.8,
            notes: "Bonnes performances dans cette compétition majeure",
            
            performanceType: "COMPETITION",
            matchId: null,
            matchTitle: null
          },
          { 
            id: 3,
            playerId: user?.id || 1,
            playerName: 'Martin Bouchard',
            competitionId: 2,
            competitionName: 'Coupe Régionale 2025',
            
            totalMatches: 4,
            totalMinutesPlayed: 360,
            totalFouls: 3,
            totalYellowCards: 1,
            totalRedCards: 0,
            
            totalGoals: 2,
            totalAssists: 1,
            totalShots: 12,
            shotsOnTarget: 6,
            penaltiesScored: 1,
            penaltiesTaken: 2,
            successfulDribbles: 5,
            
            passAccuracy: 77.5,
            successfulPasses: 84,
            ballsRecovered: 11,
            successfulCrosses: 5,
            
            interceptions: 7,
            ballsLost: 4,
            
            savesMade: null,
            cleanSheets: null,
            penaltiesSaved: null,
            goalsConceded: null,
            savePercentage: null,
            
            rating: 7.2,
            notes: "Performance solide en coupe",
            
            performanceType: "COMPETITION",
            matchId: null,
            matchTitle: null
          },
          { 
            id: 4,
            playerId: user?.id || 1,
            playerName: 'Martin Bouchard',
            competitionId: 3,
            competitionName: 'Tournoi Inter-clubs',
            
            totalMatches: 3,
            totalMinutesPlayed: 270,
            totalFouls: 2,
            totalYellowCards: 0,
            totalRedCards: 0,
            
            totalGoals: 1,
            totalAssists: 1,
            totalShots: 7,
            shotsOnTarget: 4,
            penaltiesScored: 0,
            penaltiesTaken: 0,
            successfulDribbles: 3,
            
            passAccuracy: 76.8,
            successfulPasses: 56,
            ballsRecovered: 6,
            successfulCrosses: 3,
            
            interceptions: 3,
            ballsLost: 4,
            
            savesMade: null,
            cleanSheets: null,
            penaltiesSaved: null,
            goalsConceded: null,
            savePercentage: null,
            
            rating: 6.8,
            notes: "Performance en dessous de sa moyenne habituelle",
            
            performanceType: "COMPETITION",
            matchId: null,
            matchTitle: null
          }
        ];
        
        // Données simulées pour les performances par match
        const byMatchStats = [
          { 
            id: 5,
            playerId: user?.id || 1,
            playerName: 'Martin Bouchard',
            competitionId: 1,
            competitionName: 'Championnat National 2025',
            
            totalMatches: 1,
            totalMinutesPlayed: 90,
            totalFouls: 1,
            totalYellowCards: 0,
            totalRedCards: 0,
            
            totalGoals: 2,
            totalAssists: 1,
            totalShots: 5,
            shotsOnTarget: 3,
            penaltiesScored: 1,
            penaltiesTaken: 1,
            successfulDribbles: 6,
            
            passAccuracy: 82.5,
            successfulPasses: 32,
            ballsRecovered: 8,
            successfulCrosses: 2,
            
            interceptions: 3,
            ballsLost: 1,
            
            savesMade: null,
            cleanSheets: null,
            penaltiesSaved: null,
            goalsConceded: null,
            savePercentage: null,
            
            rating: 8.5,
            notes: "Performance exceptionnelle avec 2 buts et une passe décisive",
            
            performanceType: "MATCH",
            matchId: 1001,
            matchTitle: 'FC Barcelona vs Real Madrid (3-2)'
          },
          { 
            id: 6,
            playerId: user?.id || 1,
            playerName: 'Martin Bouchard',
            competitionId: 1,
            competitionName: 'Championnat National 2025',
            
            totalMatches: 1,
            totalMinutesPlayed: 90,
            totalFouls: 2,
            totalYellowCards: 1,
            totalRedCards: 0,
            
            totalGoals: 1,
            totalAssists: 0,
            totalShots: 4,
            shotsOnTarget: 2,
            penaltiesScored: 0,
            penaltiesTaken: 0,
            successfulDribbles: 3,
            
            passAccuracy: 75.8,
            successfulPasses: 28,
            ballsRecovered: 5,
            successfulCrosses: 1,
            
            interceptions: 2,
            ballsLost: 3,
            
            savesMade: null,
            cleanSheets: null,
            penaltiesSaved: null,
            goalsConceded: null,
            savePercentage: null,
            
            rating: 7.2,
            notes: "Performance correcte avec un but mais un carton jaune",
            
            performanceType: "MATCH",
            matchId: 1002,
            matchTitle: 'Real Madrid vs Atletico Madrid (1-1)'
          },
          { 
            id: 7,
            playerId: user?.id || 1,
            playerName: 'Martin Bouchard',
            competitionId: 2,
            competitionName: 'Coupe Régionale 2025',
            
            totalMatches: 1,
            totalMinutesPlayed: 75,
            totalFouls: 0,
            totalYellowCards: 0,
            totalRedCards: 0,
            
            totalGoals: 0,
            totalAssists: 1,
            totalShots: 2,
            shotsOnTarget: 1,
            penaltiesScored: 0,
            penaltiesTaken: 0,
            successfulDribbles: 2,
            
            passAccuracy: 79.6,
            successfulPasses: 22,
            ballsRecovered: 3,
            successfulCrosses: 2,
            
            interceptions: 1,
            ballsLost: 2,
            
            savesMade: null,
            cleanSheets: null,
            penaltiesSaved: null,
            goalsConceded: null,
            savePercentage: null,
            
            rating: 7.0,
            notes: "Remplacé à la 75e minute, a fourni une passe décisive",
            
            performanceType: "MATCH",
            matchId: 1003,
            matchTitle: 'Real Madrid vs Sevilla (2-0)'
          },
          { 
            id: 8,
            playerId: user?.id || 1,
            playerName: 'Martin Bouchard',
            competitionId: 1,
            competitionName: 'Championnat National 2025',
            
            totalMatches: 1,
            totalMinutesPlayed: 90,
            totalFouls: 1,
            totalYellowCards: 0,
            totalRedCards: 0,
            
            totalGoals: 1,
            totalAssists: 0,
            totalShots: 3,
            shotsOnTarget: 2,
            penaltiesScored: 0,
            penaltiesTaken: 0,
            successfulDribbles: 4,
            
            passAccuracy: 81.2,
            successfulPasses: 26,
            ballsRecovered: 7,
            successfulCrosses: 1,
            
            interceptions: 2,
            ballsLost: 1,
            
            savesMade: null,
            cleanSheets: null,
            penaltiesSaved: null,
            goalsConceded: null,
            savePercentage: null,
            
            rating: 7.8,
            notes: "But décisif dans une rencontre difficile",
            
            performanceType: "MATCH",
            matchId: 1004,
            matchTitle: 'Valencia vs Real Madrid (0-1)'
          },
          { 
            id: 9,
            playerId: user?.id || 1,
            playerName: 'Martin Bouchard',
            competitionId: 3,
            competitionName: 'Tournoi Inter-clubs',
            
            totalMatches: 1,
            totalMinutesPlayed: 90,
            totalFouls: 1,
            totalYellowCards: 0,
            totalRedCards: 0,
            
            totalGoals: 1,
            totalAssists: 0,
            totalShots: 4,
            shotsOnTarget: 2,
            penaltiesScored: 0,
            penaltiesTaken: 0,
            successfulDribbles: 5,
            
            passAccuracy: 80.0,
            successfulPasses: 30,
            ballsRecovered: 4,
            successfulCrosses: 0,
            
            interceptions: 1,
            ballsLost: 2,
            
            savesMade: null,
            cleanSheets: null,
            penaltiesSaved: null,
            goalsConceded: null,
            savePercentage: null,
            
            rating: 8.0,
            notes: "Excellente prestation internationale",
            
            performanceType: "MATCH",
            matchId: 1005,
            matchTitle: 'Real Madrid vs Bayern Munich (2-1)'
          }
        ];
        
        setCompetitions(competitionsData);
        setPerformances({
          overall: overallStats,
          byCompetition: byCompetitionStats,
          byMatch: byMatchStats
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des performances:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [user]);

  // Filtrer les matchs par compétition sélectionnée
  const filteredMatches = selectedCompetition 
    ? performances.byMatch.filter(match => match.competitionName === selectedCompetition)
    : performances.byMatch;

  const renderPerformanceMetric = (label, value, total = null, bgColor = 'bg-blue-100', textColor = 'text-blue-800') => (
    <div className={`${bgColor} px-4 py-4 rounded-lg`}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className={`mt-1 text-3xl font-semibold ${textColor}`}>
        {value}
        {total !== null && (
          <span className="ml-1 text-lg font-normal text-gray-500">
            / {total}
          </span>
        )}
      </dd>
    </div>
  );

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Mes performances</h1>
        <p className="mt-1 text-sm text-gray-500">
          Consultez vos statistiques de jeu et performances détaillées
        </p>
      </div>

      {/* Navigation entre les vues */}
      <div className="mb-6">
        <div className="sm:hidden">
          <select
            id="view-selector-mobile"
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="overall">Vue d'ensemble</option>
            <option value="byCompetition">Par compétition</option>
            <option value="byMatch">Par match</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setSelectedView('overall')}
              className={`${
                selectedView === 'overall'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 font-medium text-sm rounded-md`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setSelectedView('byCompetition')}
              className={`${
                selectedView === 'byCompetition'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 font-medium text-sm rounded-md`}
            >
              Par compétition
            </button>
            <button
              onClick={() => setSelectedView('byMatch')}
              className={`${
                selectedView === 'byMatch'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 font-medium text-sm rounded-md`}
            >
              Par match
            </button>
          </nav>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-gray-100 h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {selectedView === 'overall' && performances.overall && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Statistiques globales</h2>
              
              {/* Metrics principales */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-6">
                {renderPerformanceMetric('Matchs joués', performances.overall.totalMatches)}
                {renderPerformanceMetric('Buts marqués', performances.overall.totalGoals, null, 'bg-green-100', 'text-green-800')}
                {renderPerformanceMetric('Passes décisives', performances.overall.totalAssists, null, 'bg-purple-100', 'text-purple-800')}
                {renderPerformanceMetric('Minutes jouées', performances.overall.totalMinutesPlayed, null, 'bg-indigo-100', 'text-indigo-800')}
                {renderPerformanceMetric('Note moyenne', performances.overall.rating.toFixed(1), 10, 'bg-yellow-100', 'text-yellow-800')}
              </div>
              
              {/* Onglets pour les différentes catégories de statistiques */}
              <Tabs defaultValue="offensive" className="mt-8">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="offensive">Statistiques offensives</TabsTrigger>
                  <TabsTrigger value="midfield">Statistiques de milieu</TabsTrigger>
                  <TabsTrigger value="defensive">Statistiques défensives</TabsTrigger>
                  <TabsTrigger value="discipline">Discipline</TabsTrigger>
                </TabsList>
                
                {/* Statistiques offensives */}
                <TabsContent value="offensive">
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistiques offensives</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Buts marqués</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.totalGoals}</p>
                            </div>
                            <div className="bg-green-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Passes décisives</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.totalAssists}</p>
                            </div>
                            <div className="bg-purple-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Tirs</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.totalShots}</p>
                              <p className="text-sm text-gray-500">{performances.overall.shotsOnTarget} cadrés ({Math.round(performances.overall.shotsOnTarget / performances.overall.totalShots * 100)}%)</p>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Penalties</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.penaltiesScored} / {performances.overall.penaltiesTaken}</p>
                              <p className="text-sm text-gray-500">
                                {performances.overall.penaltiesTaken > 0 
                                  ? `${Math.round(performances.overall.penaltiesScored / performances.overall.penaltiesTaken * 100)}% de réussite`
                                  : "Aucun penalty tiré"}
                              </p>
                            </div>
                            <div className="bg-yellow-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Dribbles réussis</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.successfulDribbles}</p>
                            </div>
                            <div className="bg-indigo-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4m0 0l4 4m-4-4v18"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Statistiques de milieu */}
                <TabsContent value="midfield">
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistiques de milieu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Précision des passes</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.passAccuracy.toFixed(1)}%</p>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Passes réussies</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.successfulPasses}</p>
                            </div>
                            <div className="bg-green-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Ballons récupérés</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.ballsRecovered}</p>
                            </div>
                            <div className="bg-yellow-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Centres réussis</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.successfulCrosses}</p>
                            </div>
                            <div className="bg-purple-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Statistiques défensives */}
                <TabsContent value="defensive">
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistiques défensives</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Interceptions</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.interceptions}</p>
                            </div>
                            <div className="bg-red-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Ballons perdus</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.ballsLost}</p>
                            </div>
                            <div className="bg-orange-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Discipline */}
                <TabsContent value="discipline">
                  <Card>
                    <CardHeader>
                      <CardTitle>Discipline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Fautes commises</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.totalFouls}</p>
                            </div>
                            <div className="bg-gray-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Cartons jaunes</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.totalYellowCards}</p>
                            </div>
                            <div className="bg-yellow-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Cartons rouges</p>
                              <p className="text-2xl font-bold text-gray-900">{performances.overall.totalRedCards}</p>
                            </div>
                            <div className="bg-red-100 p-2 rounded-full">
                              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Notes sur le joueur */}
              {performances.overall.notes && (
                <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Notes générales</h3>
                    <p className="mt-2 text-gray-600">{performances.overall.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedView === 'byCompetition' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Performances par compétition</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Compétition
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Matchs
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Buts
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Passes déc.
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Minutes
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tirs (Cadrés)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pass %
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Note
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {performances.byCompetition.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.competitionName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.totalMatches}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.totalGoals}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.totalAssists}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.totalMinutesPlayed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.totalShots} ({item.shotsOnTarget})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.passAccuracy.toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <span 
                              className={`inline-block h-2.5 mr-2 rounded-full w-16 ${
                                item.rating >= 8 ? 'bg-green-500' : 
                                item.rating >= 7 ? 'bg-green-300' : 
                                item.rating >= 6 ? 'bg-yellow-400' : 
                                'bg-red-400'
                              }`}
                            >
                              <span 
                                className={`inline-block h-2.5 rounded-full`} 
                                style={{ width: `${(item.rating / 10) * 100}%` }}
                              ></span>
                            </span>
                            {item.rating.toFixed(1)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => {
                              setSelectedCompetition(item.competitionName);
                              setSelectedView('byMatch');
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Voir matchs
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedView === 'byMatch' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Performance par match</h2>
                <div>
                  <select
                    id="competition-filter"
                    value={selectedCompetition}
                    onChange={(e) => setSelectedCompetition(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Toutes les compétitions</option>
                    {performances.byCompetition.map(comp => (
                      <option key={comp.id} value={comp.competitionName}>{comp.competitionName}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Match
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mins
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Buts
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Passes
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tirs
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pass %
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        C.J/R
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Note
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMatches.map((match) => (
                      <tr key={match.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {match.matchTitle}
                          <div className="text-xs text-gray-500">{match.competitionName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.totalMinutesPlayed}'
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.totalGoals}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.totalAssists}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.totalShots} ({match.shotsOnTarget})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.passAccuracy.toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.totalYellowCards}/{match.totalRedCards}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span 
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              match.rating >= 8 ? 'bg-green-100 text-green-800' : 
                              match.rating >= 7 ? 'bg-green-50 text-green-600' : 
                              match.rating >= 6 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {match.rating.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Link href={`/dashboard/matches/${match.matchId}`} className="text-blue-600 hover:text-blue-900">
                            Détails
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}