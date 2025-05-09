  import React, { useState, useEffect } from 'react';
import MatchList from '../match/MatchList';
import MatchService from '../../services/match-service';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '../ui/Button';


const CompetitionMatchList = ({ competitionId, isUserView = true }) => {
  const { hasAccess, userRole } = useRoleAccess();
  const isOrganizer = hasAccess(['ORGANIZER', 'ADMIN']);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
      {isOrganizer && !isUserView && (
          <Button 
            href={`/dashboard/organizer/competitions/${competitionId}/matches/create`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Programmer un match
          </Button>
        )}
      </div>
      
      {/* Liste des matchs */}
    
        <MatchList 
          isUserView={isUserView}
          competitionId={competitionId}
        />
      
    </div>
  );
};

export default CompetitionMatchList;