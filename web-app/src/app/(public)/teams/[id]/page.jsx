'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import TeamDetails from '@/components/team/TeamDetails';


export default function TeamDetailsPage() {
  const { id } = useParams();


  return (
    <div className="space-y-8">

        {/* Contenu des onglets - chaque composant charge ses propres données */}
        <div className="p-6">
         
            <TeamDetails 
              teamId={id} 
              onViewAllPlayers={() => handleTabChange('players')} 
              onViewAllMatches={() => handleTabChange('matches')} 
            />
      </div>
    </div>
  );
}