"use client"
import { useState, useEffect } from 'react';
import Sidebar from '@/component/layout/Sidebar';
import Footer from '@/component/layout/Footer';
import { useRouter } from 'next/navigation';
import {useAuth} from "./hooks/useAuth";
import Header from "@/component/layout/Header";
import React from 'react';

const Page = (playerId) =>{
    //fetch player data from db
    //fetch player History
    //fetch player participation

    const data = {};
    const history = {};
    const participation = {}; 

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
                    <h3 className="text-2xl font-bold text-gray-700 mb-6">
                        Informations
                    </h3>
                    <h3
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Voir l'historique
                    </h3>
                    <h3
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Voir les participations
                    </h3>
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
