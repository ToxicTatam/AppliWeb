'use client';
import React, { useState } from 'react';
import { BarChart, TrendingUp, Stopwatch, Award, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

const PlayerStatsDashboard = ({ performance, showAllStats = false }) => {
  const [activeTab, setActiveTab] = useState('offensive');

  if (!performance) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
      </div>
    );
  }

  const renderStatItem = (label, value, bgColor = 'bg-blue-100', textColor = 'text-blue-800') => (
    <div className={`${bgColor} px-3 py-3 rounded-lg`}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className={`mt-1 text-xl font-semibold ${textColor}`}>{value}</dd>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header information */}
      {performance.competitionName && (
        <div className="flex items-center space-x-2 mb-2">
          <Award className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            {performance.performanceType === 'match' 
              ? `Match: ${performance.matchTitle || 'Non spécifié'}`
              : `Compétition: ${performance.competitionName}`}
          </span>
        </div>
      )}

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {renderStatItem('Matchs', performance.totalMatches, 'bg-purple-100', 'text-purple-800')}
        {renderStatItem('Buts', performance.totalGoals, 'bg-green-100', 'text-green-800')}
        {renderStatItem('Passes déc.', performance.totalAssists, 'bg-indigo-100', 'text-indigo-800')}
        {renderStatItem('Note moy.', performance.rating?.toFixed(1) || 'N/A', 'bg-yellow-100', 'text-yellow-800')}
      </div>

      {/* Tabs navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('offensive')}
            className={`${
              activeTab === 'offensive'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Offensive
          </button>
          <button
            onClick={() => setActiveTab('midfield')}
            className={`${
              activeTab === 'midfield'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Milieu
          </button>
          <button
            onClick={() => setActiveTab('defensive')}
            className={`${
              activeTab === 'defensive'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Défensive
          </button>
          <button
            onClick={() => setActiveTab('discipline')}
            className={`${
              activeTab === 'discipline'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Discipline
          </button>
          <button
            onClick={() => setActiveTab('physical')}
            className={`${
              activeTab === 'physical'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Physique
          </button>
          {performance.savesMade !== null && (
            <button
              onClick={() => setActiveTab('goalkeeper')}
              className={`${
                activeTab === 'goalkeeper'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
            >
              Gardien
            </button>
          )}
        </nav>
      </div>

      {/* Tab content */}
      <div className="py-2">
        {activeTab === 'offensive' && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {renderStatItem('Buts', performance.totalGoals, 'bg-green-50', 'text-green-700')}
            {renderStatItem('Passes décisives', performance.totalAssists, 'bg-indigo-50', 'text-indigo-700')}
            {renderStatItem('Tirs', `${performance.totalShots || 0} (${performance.shotsOnTarget || 0})`, 'bg-blue-50', 'text-blue-700')}
            {renderStatItem('Penalties', `${performance.penaltiesScored || 0}/${performance.penaltiesTaken || 0}`, 'bg-yellow-50', 'text-yellow-700')}
            {renderStatItem('Dribbles réussis', performance.successfulDribbles || 0, 'bg-purple-50', 'text-purple-700')}
            {showAllStats && (
              <>
                {renderStatItem('Précision tirs', `${performance.totalShots > 0 ? Math.round((performance.shotsOnTarget / performance.totalShots) * 100) : 0}%`, 'bg-blue-50', 'text-blue-700')}
                {renderStatItem('Pénalty %', `${performance.penaltiesTaken > 0 ? Math.round((performance.penaltiesScored / performance.penaltiesTaken) * 100) : 0}%`, 'bg-yellow-50', 'text-yellow-700')}
                {renderStatItem('Buts / match', (performance.totalGoals / (performance.totalMatches || 1)).toFixed(1), 'bg-green-50', 'text-green-700')}
              </>
            )}
          </div>
        )}

        {activeTab === 'midfield' && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {renderStatItem('Précision passes', `${performance.passAccuracy?.toFixed(1) || 0}%`, 'bg-blue-50', 'text-blue-700')}
            {renderStatItem('Passes réussies', performance.successfulPasses || 0, 'bg-green-50', 'text-green-700')}
            {renderStatItem('Ballons récupérés', performance.ballsRecovered || 0, 'bg-yellow-50', 'text-yellow-700')}
            {renderStatItem('Centres réussis', performance.successfulCrosses || 0, 'bg-purple-50', 'text-purple-700')}
            {showAllStats && (
              <>
                {renderStatItem('Passes / match', ((performance.successfulPasses || 0) / (performance.totalMatches || 1)).toFixed(1), 'bg-green-50', 'text-green-700')}
                {renderStatItem('Récup. / match', ((performance.ballsRecovered || 0) / (performance.totalMatches || 1)).toFixed(1), 'bg-yellow-50', 'text-yellow-700')}
                {renderStatItem('Centres / match', ((performance.successfulCrosses || 0) / (performance.totalMatches || 1)).toFixed(1), 'bg-purple-50', 'text-purple-700')}
              </>
            )}
          </div>
        )}

        {activeTab === 'defensive' && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {renderStatItem('Interceptions', performance.interceptions || 0, 'bg-red-50', 'text-red-700')}
            {renderStatItem('Ballons perdus', performance.ballsLost || 0, 'bg-orange-50', 'text-orange-700')}
            {renderStatItem('Balance récup/perdu', ((performance.ballsRecovered || 0) - (performance.ballsLost || 0)), 'bg-indigo-50', 'text-indigo-700')}
            {showAllStats && (
              <>
                {renderStatItem('Interceptions / match', ((performance.interceptions || 0) / (performance.totalMatches || 1)).toFixed(1), 'bg-red-50', 'text-red-700')}
                {renderStatItem('Pertes / match', ((performance.ballsLost || 0) / (performance.totalMatches || 1)).toFixed(1), 'bg-orange-50', 'text-orange-700')}
              </>
            )}
          </div>
        )}

        {activeTab === 'discipline' && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {renderStatItem('Fautes', performance.totalFouls || 0, 'bg-gray-50', 'text-gray-700')}
            {renderStatItem('Cartons jaunes', performance.totalYellowCards || 0, 'bg-yellow-50', 'text-yellow-700')}
            {renderStatItem('Cartons rouges', performance.totalRedCards || 0, 'bg-red-50', 'text-red-700')}
            {showAllStats && (
              <>
                {renderStatItem('Fautes / match', ((performance.totalFouls || 0) / (performance.totalMatches || 1)).toFixed(1), 'bg-gray-50', 'text-gray-700')}
                {renderStatItem('Mins par carton', (performance.totalYellowCards || 0) > 0 ? Math.round((performance.totalMinutesPlayed || 0) / performance.totalYellowCards) : 'N/A', 'bg-yellow-50', 'text-yellow-700')}
              </>
            )}
          </div>
        )}

        {activeTab === 'physical' && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {renderStatItem('Mins jouées', performance.totalMinutesPlayed || 0, 'bg-blue-50', 'text-blue-700')}
            {renderStatItem('Mins moyennes', Math.round((performance.totalMinutesPlayed || 0) / (performance.totalMatches || 1)), 'bg-indigo-50', 'text-indigo-700')}
            {renderStatItem('Matchs complets', Math.floor((performance.totalMinutesPlayed || 0) / 90), 'bg-green-50', 'text-green-700')}
            {showAllStats && (
              <>
                {renderStatItem('% temps de jeu', Math.round(((performance.totalMinutesPlayed || 0) / ((performance.totalMatches || 1) * 90)) * 100) + '%', 'bg-purple-50', 'text-purple-700')}
              </>
            )}
          </div>
        )}

        {activeTab === 'goalkeeper' && performance.savesMade !== null && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {renderStatItem('Arrêts', performance.savesMade || 0, 'bg-blue-50', 'text-blue-700')}
            {renderStatItem('Clean sheets', performance.cleanSheets || 0, 'bg-green-50', 'text-green-700')}
            {renderStatItem('Penalties arrêtés', performance.penaltiesSaved || 0, 'bg-yellow-50', 'text-yellow-700')}
            {renderStatItem('Buts concédés', performance.goalsConceded || 0, 'bg-red-50', 'text-red-700')}
            {renderStatItem('% Arrêts', `${performance.savePercentage?.toFixed(1) || 0}%`, 'bg-indigo-50', 'text-indigo-700')}
            {showAllStats && (
              <>
                {renderStatItem('Arrêts / match', ((performance.savesMade || 0) / (performance.totalMatches || 1)).toFixed(1), 'bg-blue-50', 'text-blue-700')}
                {renderStatItem('Buts concédés / match', ((performance.goalsConceded || 0) / (performance.totalMatches || 1)).toFixed(1), 'bg-red-50', 'text-red-700')}
                {renderStatItem('% Clean sheets', Math.round(((performance.cleanSheets || 0) / (performance.totalMatches || 1)) * 100) + '%', 'bg-green-50', 'text-green-700')}
              </>
            )}
          </div>
        )}
      </div>

      {/* Performance metadata */}
      <div className="flex flex-wrap gap-3 mt-2">
        {performance.performanceType && (
          <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
            {performance.performanceType === 'match' ? 'Match individuel' : 
             performance.performanceType === 'competition' ? 'Compétition' : 'Statistiques globales'}
          </div>
        )}
        {performance.playerName && (
          <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
            {performance.playerName}
          </div>
        )}
      </div>

      {/* Notes */}
      {performance.notes && (
        <div className="mt-4 bg-gray-50 p-3 rounded-md">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Notes</h4>
          <p className="text-sm text-gray-600">{performance.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PlayerStatsDashboard;