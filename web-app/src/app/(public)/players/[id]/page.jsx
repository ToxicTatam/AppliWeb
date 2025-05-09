'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PlayerService from '@/services/player-service';
import PlayerDetails from '@/components/player/PlayerDetails';


export default function PlayerDetailsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [player, setPlayer] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        // Juste vérifier si le joueur existe pour le traitement d'erreur
        const playerData = await PlayerService.getPlayerById(id);
        setPlayer(playerData);
        setError(null);
      } catch (err) {
        setError('Impossible de charger les détails du joueur. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlayerData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>{error}</p>
        <Link href="/players" className="mt-4 inline-block text-blue-600 hover:underline">
          Retour aux joueurs
        </Link>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-600 px-6 py-8 rounded-md text-center">
        <h3 className="text-lg font-medium mb-2">Joueur non trouvé</h3>
        <p className="text-gray-500 mb-4">
          Le joueur que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Link href="/players" className="text-blue-600 hover:underline">
          Retour aux joueurs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête et détails du joueur */}
      <PlayerDetails playerId={id} isUserView={true} />
    
    </div>
  );
}