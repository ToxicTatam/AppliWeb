'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import CompetitionDetails from '../../../../components/competition/CompetitionDetails';

// Page pour afficher les détails d'une compétition spécifique
const CompetitionDetailsPage = () => {
  const params = useParams();
  const competitionId = params.competitionId;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <CompetitionDetails 
        competitionId={competitionId} 
        isUserView={true} 
      />
    </div>
  );
};

export default CompetitionDetailsPage;