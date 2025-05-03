"use client"
import React from 'react';
import Link from "next/link";

const Page = () => {
    const router = useRouter();

    const handleSearch = async (e) => {
        e.preventDefault();
    
        //const res = await fetch(`/api/joueurs?nom=${encodeURIComponent(query)}`);
        //const data = await res.json();
    
        //if (e) {
          router.push("/joueurs/" + e);
        //} else {
        //  alert('Joueur non trouvé');
        //}
      };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white p-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        <Link href="/public"> Recherche de Joueurs</Link>
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

            {/* Hero Section */}
            <main className="flex-grow bg-gray-100 py-12">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex justify-center space-x-6">
                        <form onSubmit={handleSearch}>
                            <input 
                                type="text"
                                value="text"
                                placeholder="Nom du Joueur"
                            /> 
                            <button type="submit">Rechercher</button>
                        </form>
                    </div>
                </div>
            </main>



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
