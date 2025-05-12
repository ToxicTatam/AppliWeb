'use client';

import React, { useState, useEffect } from 'react';
import * as TeamService from '@/services/team-service';
import TeamList from '@/components/team/TeamList';

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    coachName: '',
  });

  // Chargement des équipes
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await TeamService.getAllTeams(filters);
        setTeams(response.data || []);
        setError(null);
      } catch (err) {
        setError('Impossible de charger les équipes. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [filters]);

  // Gestion des changements de filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Réinitialisation des filtres
  const resetFilters = () => {
    setFilters({
      name: '',
      category: '',
      coachName: '',
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Équipes</h1>
        
        
        {/* Affichage des résultats */}
        <TeamList 
          teams={teams} 
          loading={loading} 
          error={error} 
        />
      </div>
    </div>
  );
}