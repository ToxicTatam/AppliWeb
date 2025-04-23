import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const PageContainer = ({ title, subtitle, children, breadcrumbs = [] }) => {
    const router = useRouter();

    // Générer les breadcrumbs automatiquement si non fournis
    const generateBreadcrumbs = () => {
        if (breadcrumbs.length > 0) return breadcrumbs;

        //const pathSegments = router.asPath.split('/').filter(segment => segment);
        const pathSegments = (typeof window !== 'undefined' ? window.location.pathname : '')
            .split('/')
            .filter(segment => segment);


        const generatedBreadcrumbs = [{ label: 'Accueil', path: '/' }];

        let currentPath = '';
        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`;
            // Convertir les slugs en labels plus lisibles
            const label = segment
                .replace(/-/g, ' ')
                .replace(/^\w/, c => c.toUpperCase());

            generatedBreadcrumbs.push({
                label,
                path: currentPath,
                isActive: index === pathSegments.length - 1
            });
        });

        return generatedBreadcrumbs;
    };

    const displayBreadcrumbs = generateBreadcrumbs();

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Fil d'Ariane */}
            <nav className="text-sm mb-6">
                <ol className="flex flex-wrap items-center">
                    {displayBreadcrumbs.map((crumb, index) => (
                        <li key={index} className="flex items-center">
                            {index > 0 && <ChevronRight size={14} className="mx-2 text-gray-400" />}
                            {crumb.isActive ? (
                                <span className="text-gray-500">{crumb.label}</span>
                            ) : (
                                <Link href={crumb.path} className="text-blue-600 hover:text-blue-800">
                                    {crumb.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>

            {/* En-tête de page */}
            <header className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
                {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
            </header>

            {/* Contenu principal */}
            <main>
                {children}
            </main>
        </div>
    );
};

export default PageContainer;