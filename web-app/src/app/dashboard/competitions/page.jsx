'use client';

import React from 'react';
import CompetitionList from '@/components/competition/CompetitionList';

// Page pour afficher la liste des compétitions dans le tableau de bord
const CompetitionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Compétitions</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Liste des compétitions</h2>
            <p className="text-gray-500 mt-1">
              Découvrez toutes les compétitions disponibles sur la plateforme
            </p>
          </div>
        </div>
        
        <CompetitionList isUserView={true} />
      </div>
    </div>
  );
};

export default CompetitionsPage;