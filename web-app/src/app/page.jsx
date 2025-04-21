import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white p-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        <Link href="/public">Gestion Sportive</Link>
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
                    <h2 className="text-4xl font-bold text-blue-600 mb-6">
                        Bienvenue sur la plateforme de gestion sportive
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Gérez vos compétitions, équipes, feuilles de match et bien plus encore, le tout sur une seule plateforme.
                    </p>
                    <div className="flex justify-center space-x-6">
                        <Link
                            href="/competitions"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            Voir les Compétitions
                        </Link>
                        <Link
                            href="/dashboard"
                            className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400"
                        >
                            Aller au Tableau de Bord
                        </Link>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section className="container mx-auto py-8 px-6">
                <h3 className="text-3xl font-bold text-center text-gray-700 mb-12">
                    Fonctionnalités Principales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                        <Image
                            src="/images/competition.png"
                            alt="Gestion des Compétitions"
                            width={100}
                            height={100}
                            className="mx-auto mb-4"
                        />
                        <h4 className="text-xl font-semibold mb-2">Gestion des Compétitions</h4>
                        <p className="text-gray-600">
                            Créez, suivez et gérez toutes vos compétitions. Classements et résultats inclus.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                        <Image
                            src="/images/team.png"
                            alt="Gestion des Équipes"
                            width={100}
                            height={100}
                            className="mx-auto mb-4"
                        />
                        <h4 className="text-xl font-semibold mb-2">Gestion des Équipes</h4>
                        <p className="text-gray-600">
                            Inscrivez vos équipes, gérez les joueurs et planifiez les feuilles de match.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                        <Image
                            src="/images/stats.png"
                            alt="Tableaux et Classements"
                            width={100}
                            height={100}
                            className="mx-auto mb-4"
                        />
                        <h4 className="text-xl font-semibold mb-2">
                            Statistiques et Classements
                        </h4>
                        <p className="text-gray-600">
                            Visualisez les statistiques des équipes et des joueurs, avec des graphiques détaillés.
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="bg-blue-50 py-12">
                <div className="container mx-auto text-center">
                    <h3 className="text-2xl font-bold text-gray-700 mb-6">
                        Galerie des Événements Récentes
                    </h3>
                    <p className="text-gray-600 mb-8">
                        Revivez les plus beaux moments partagés par notre communauté.
                    </p>
                    <Link
                        href="/gallery"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Voir la Galerie
                    </Link>
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
}