'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import TeamHeader from '@/components/team/TeamHeader';
import TeamTabs from '@/components/team/TeamTabs';
import TeamDetails from '@/components/team/TeamDetails';
import TeamPlayers from '@/components/team/TeamPlayers';
import TeamMatches from '@/components/team/TeamMatches';
import TeamCompetitions from '@/components/team/TeamCompetitions';
import TeamStanding from '@/components/team/TeamStanding';

export default function TeamDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('info');
  
  // Fonction pour gérer le changement d'onglet
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="space-y-8">
      {/* En-tête et contenu principal */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* En-tête de l'équipe - charge ses propres données via TeamService */}
        <TeamHeader teamId={id} />

        {/* Navigation par onglets */}
        <TeamTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Contenu des onglets - chaque composant charge ses propres données */}
        <div className="p-6">
          {activeTab === 'info' && (
            <TeamDetails 
              teamId={id} 
              onViewAllPlayers={() => handleTabChange('players')} 
              onViewAllMatches={() => handleTabChange('matches')} 
            />
          )}

          {activeTab === 'players' && (
            <TeamPlayers teamId={id} />
          )}

          {activeTab === 'matches' && (
            <TeamMatches teamId={id} />
          )}

          {activeTab === 'competitions' && (
            <TeamCompetitions teamId={id} />
          )}
   
         {activeTab === 'standings' && (
            <TeamStanding teamId={id} />
          )}
        </div>
      </div>
    </div>
  );
}