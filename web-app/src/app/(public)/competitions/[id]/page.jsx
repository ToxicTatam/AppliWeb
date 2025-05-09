'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import CompetitionService from '@/services/competition-service';
import CompetitionDetails from '@/components/competition/CompetitionDetails';
import LoadingSpinner from '@/components/ui/LoadingSpinner';


export default function CompetitionDetailsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [competition, setCompetition] = useState(null);

  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        setLoading(true);
        // Juste vérifier si la compétition existe pour le traitement d'erreur
        const competitionData = await CompetitionService.getCompetitionById(id);
        setCompetition(competitionData);
        setError(null);
      } catch (err) {
        setError('Impossible de charger les détails de la compétition. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitionData();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>{error}</p>
        <Link href="/competitions" className="mt-4 inline-block text-blue-600 hover:underline">
          Retour aux compétitions
        </Link>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-600 px-6 py-8 rounded-md text-center">
        <h3 className="text-lg font-medium mb-2">Compétition non trouvée</h3>
        <p className="text-gray-500 mb-4">
          La compétition que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <Link href="/competitions" className="text-blue-600 hover:underline">
          Retour aux compétitions
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CompetitionDetails competitionId={id} isUserView={true} />
    </div>
  );
}