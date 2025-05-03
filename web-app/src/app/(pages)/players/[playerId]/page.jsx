"use client"
import { useState, useEffect } from 'react';
import Sidebar from '@/component/layout/Sidebar';
import Footer from '@/component/layout/Footer';
import { useRouter } from 'next/navigation';
import {useAuth} from "./hooks/useAuth";
import Header from "@/component/layout/Header";
import React from 'react';
import PlayerStatsCard from '../../../component/players/PlayerStatsCard';

const Page = (playerId) =>{
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white p-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        <Link href="/public">Joueur</Link>
                    </h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="/login" className="hover:underline">
                                    Connexion
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="hover:underline">
                                    Inscription
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>            

            {/* Gallery Section */}
            <section className="bg-blue-50 py-12">
                <div className="container mx-auto text-center">
                   {id ? <PlayerStatsCard playerId={playerId}/> : <p>Chargement...</p> } 
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-600 text-white py-6">
                <div className="container mx-auto text-center">
                    <p className="text-sm">
                        &copy; 2024 Gestion Sportive. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Page();
