import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">FootballManager</h3>
                        <p className="text-gray-300">
                            Plateforme de gestion des compétitions pour votre association sportive.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-white">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="/competitions" className="text-gray-300 hover:text-white">
                                    Compétitions
                                </Link>
                            </li>
                            <li>
                                <Link href="/teams" className="text-gray-300 hover:text-white">
                                    Équipes
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="text-gray-300 hover:text-white">
                                    Galerie photos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <address className="not-italic text-gray-300">
                            <p>Association Sportive de Football</p>
                            <p>123 Rue du Stade</p>
                            <p>75000 Paris</p>
                            <p className="mt-2">contact@football-manager.fr</p>
                        </address>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>&copy; {currentYear} FootballManager - Tous droits réservés</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;