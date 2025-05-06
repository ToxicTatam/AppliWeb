'use client'
import React from 'react';

export default function Page() {
    //A modifier, mettre qqch qui sort de la base de donnée. 
    // Liste étendue de compétitions
    const competitions = [
        { id: 1, name: 'Ligue des Champions', description: 'La plus prestigieuse compétition européenne.', image: '/images/champions-league.jpg' },
        { id: 2, name: 'Ligue 1', description: 'Le championnat de football français.', image: '/images/ligue-1.jpg' },
        { id: 3, name: 'La Liga', description: 'Le championnat de football espagnol.', image: '/images/la-liga.jpg' },
        { id: 4, name: 'Bundesliga', description: 'Le championnat de football allemand.', image: '/images/bundesliga.jpg' },
        { id: 5, name: 'Serie A', description: 'Le championnat de football italien.', image: '/images/serie-a.jpg' },
        { id: 6, name: 'Premier League', description: 'Le championnat de football anglais.', image: '/images/premier-league.jpg' },
        { id: 7, name: 'Europa League', description: 'La deuxième compétition européenne.', image: '/images/europa-league.jpg' },
        { id: 8, name: 'Copa del Rey', description: 'La coupe nationale espagnole.', image: '/images/copa-del-rey.jpg' },
        { id: 9, name: 'FA Cup', description: 'La coupe nationale anglaise.', image: '/images/fa-cup.jpg' },
        { id: 10, name: 'Coupe de France', description: 'La coupe nationale française.', image: '/images/coupe-de-france.jpg' },
        { id: 11, name: 'Super Lig', description: 'Le championnat de football turc.', image: '/images/super-lig.jpg' },
        { id: 12, name: 'Eredivisie', description: 'Le championnat de football néerlandais.', image: '/images/eredivisie.jpg' },
        { id: 13, name: 'Primeira Liga', description: 'Le championnat de football portugais.', image: '/images/primeira-liga.jpg' },
        { id: 14, name: 'MLS', description: 'Le championnat de football nord-américain.', image: '/images/mls.jpg' },
        { id: 15, name: 'J-League', description: 'Le championnat de football japonais.', image: '/images/j-league.jpg' },
        { id: 16, name: 'K-League', description: 'Le championnat de football coréen.', image: '/images/k-league.jpg' },
        { id: 17, name: 'Chinese Super League', description: 'Le championnat de football chinois.', image: '/images/chinese-super-league.jpg' },
        { id: 18, name: 'Copa Libertadores', description: 'La compétition sud-américaine la plus prestigieuse.', image: '/images/copa-libertadores.jpg' },
        { id: 19, name: 'Copa Sudamericana', description: 'La deuxième compétition sud-américaine.', image: '/images/copa-sudamericana.jpg' },
        { id: 20, name: 'A-League', description: 'Le championnat de football australien.', image: '/images/a-league.jpg' },
        { id: 21, name: 'Scottish Premiership', description: 'Le championnat de football écossais.', image: '/images/scottish-premiership.jpg' },
        { id: 22, name: 'Belgian Pro League', description: 'Le championnat de football belge.', image: '/images/belgian-pro-league.jpg' },
        { id: 23, name: 'Russian Premier League', description: 'Le championnat de football russe.', image: '/images/russian-premier-league.jpg' },
        { id: 24, name: 'Saudi Pro League', description: 'Le championnat de football saoudien.', image: '/images/saudi-pro-league.jpg' },
        { id: 25, name: 'African Champions League', description: 'La compétition africaine la plus prestigieuse.', image: '/images/african-champions-league.jpg' },
    ];
    
    return (
        <div>
            {/* Header */}
            <header className="sticky top-0 bg-blue-600 text-white p-4 shadow-md z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Gestion Sportive</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <a href="/competitions" className="hover:underline">
                                    Compétitions
                                </a>
                            </li>
                            <li>
                                <a href="/dashboard" className="hover:underline">
                                    Tableau de Bord
                                </a>
                            </li>
                            <li>
                                <a href="/" className="hover:underline">
                                    Accueil
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Liste des Compétitions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {competitions.map((competition) => (
                        <div key={competition.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div
                                key={competition.id}
                                className="bg-cover bg-center bg-no-repeat rounded-lg shadow-md h-60 flex flex-col justify-end p-4 text-white"
                                style={{ backgroundImage: `url(${competition.image})` }}
                            >
                                <h3 className="text-lg font-bold">{competition.name}</h3>
                                <p className="text-sm">{competition.description}</p>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="bg-grey-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                                >
                                    Inscription
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

