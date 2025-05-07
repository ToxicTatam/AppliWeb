import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();

  const isActive = (path) => {
    return pathname === path ? 'bg-blue-700' : '';
  };

  // Navigation links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { href: '/dashboard', label: 'Tableau de bord' },
      { href: '/dashboard/profile', label: 'Profil' },
    ];

    const roleSpecificLinks = {
      admin: [
        { href: '/dashboard/admin', label: 'Administration' },
      ],
      coach: [
        { href: '/dashboard/coach/teams', label: 'Mes équipes' },
        { href: '/dashboard/coach/match-sheets', label: 'Feuilles de match' },
      ],
      player: [
        { href: '/dashboard/player/performances', label: 'Mes performances' },
      ],
      organizer: [
        { href: '/dashboard/organizer/competitions', label: 'Compétitions' },
      ],
    };

    return [...commonLinks, ...(roleSpecificLinks[role] || [])];
  };

  return (
    <nav className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0">
              <span className="text-xl font-bold">AppliSport</span>
            </Link>
            
            {user && (
              <div className="ml-10 flex items-baseline space-x-4">
                {getNavLinks().map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(link.href)}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            {user ? (
              <button
                onClick={logout}
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
              >
                Déconnexion
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}