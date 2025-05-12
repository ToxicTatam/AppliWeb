'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import TeamDetails from '@/components/team/TeamDetails';


export default function TeamDetailsPage() {
  const { id } = useParams();

  console.log('TeamDetailsPage', id);
  return (
    <div className="space-y-8">

        {/* Contenu des onglets - chaque composant charge ses propres données */}
        <div className="p-6">
        
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Détails de l'équipe</h1>
            <TeamDetails 
              teamId={id} 
              onViewAllPlayers={() => handleTabChange('players')} 
              onViewAllMatches={() => handleTabChange('matches')} 
            />
      </div>
    </div>
  );
}