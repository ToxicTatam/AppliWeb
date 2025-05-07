import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { 
  Home, 
  Users, 
  Trophy, 
  CalendarDays, 
  UserCircle, 
  Image,
  ClipboardList,
  Shield,
  UserPlus,
  UserMinus,
  FileEdit,
  PlusSquare,
  MinusSquare
} from 'lucide-react';
import React from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useAuth();
  
  const isActive = (path) => {
    return pathname === path || pathname.startsWith(path + '/') ? 'bg-blue-800 text-white' : 'text-gray-300 hover:bg-blue-700';
  };

  // Navigation links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { href: '/dashboard', label: 'Tableau de bord', icon: <Home size={20} /> },
      { href: '/dashboard/profile', label: 'Profil', icon: <UserCircle size={20} /> },
    ];

    const roleBasedLinks = {
      admin: [
        { href: '/dashboard/admin', label: 'Administration', icon: <Shield size={20} /> },
        { href: '/dashboard/teams', label: 'Équipes', icon: <Users size={20} /> },
        { href: '/dashboard/players', label: 'Joueurs', icon: <Users size={20} /> },
        { href: '/dashboard/competitions', label: 'Compétitions', icon: <Trophy size={20} /> },
        { href: '/dashboard/matches', label: 'Matchs', icon: <CalendarDays size={20} /> },
        { href: '/dashboard/media', label: 'Médias', icon: <Image size={20} /> },
      ],
      coach: [
        { href: '/dashboard/coach/teams', label: 'Mes équipes', icon: <Users size={20} /> },
        { 
          href: '#', 
          label: 'Gestion des équipes', 
          icon: <FileEdit size={20} />,
          subLinks: [
            { href: '/dashboard/coach/teams/create', label: 'Créer une équipe', icon: <PlusSquare size={16} /> },
            { href: '/dashboard/coach/teams/update', label: 'Modifier une équipe', icon: <FileEdit size={16} /> }
          ]
        },
        { 
          href: '#', 
          label: 'Gestion des joueurs', 
          icon: <Users size={20} />,
          subLinks: [
            { href: '/dashboard/coach/team/new', label: 'Ajouter un joueur', icon: <UserPlus size={16} /> },
            { href: '/dashboard/coach/team/update', label: 'Modifier un joueur', icon: <FileEdit size={16} /> },
            { href: '/dashboard/coach/removeplayer', label: 'Retirer un joueur', icon: <UserMinus size={16} /> }
          ]
        },
        { 
          href: '#', 
          label: 'Compétitions', 
          icon: <Trophy size={20} />,
          subLinks: [
            { href: '/dashboard/coach/teamcompetition/register', label: 'Inscrire à une compétition', icon: <PlusSquare size={16} /> },
            { href: '/dashboard/coach/teamcompetition/unregister', label: 'Désinscrire d\'une compétition', icon: <MinusSquare size={16} /> }
          ]
        },
        { href: '/dashboard/coach/match-sheets', label: 'Feuilles de match', icon: <ClipboardList size={20} /> },
        { href: '/dashboard/coach/media', label: 'Gestion des médias', icon: <Image size={20} /> },
        { href: '/dashboard/matches', label: 'Matchs', icon: <CalendarDays size={20} /> },
        { href: '/dashboard/coach/players', label: 'Liste des joueurs', icon: <Users size={20} /> },
      ],
      player: [
        { href: '/dashboard/player/performances', label: 'Mes performances', icon: <Trophy size={20} /> },
        { href: '/dashboard/matches', label: 'Matchs', icon: <CalendarDays size={20} /> },
      ],
      organizer: [
        { href: '/dashboard/organizer/competitions', label: 'Compétitions', icon: <Trophy size={20} /> },
        { href: '/dashboard/matches', label: 'Matchs', icon: <CalendarDays size={20} /> },
        { href: '/dashboard/teams', label: 'Équipes', icon: <Users size={20} /> },
      ],
    };

    return [...commonLinks, ...(roleBasedLinks[role] || [])];
  };
  
  // State to track which dropdown is open
  const [openDropdowns, setOpenDropdowns] = React.useState({});

  // Toggle dropdown visibility
  const toggleDropdown = (label) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };
  
  return (
    <div className="flex flex-col h-full bg-blue-900 w-64 py-5">
      <div className="px-4 mb-6">
        <h2 className="text-white text-xl font-semibold">AppliSport</h2>
      </div>
      
      <div className="flex-1 flex flex-col">
        <nav className="flex-1 px-2 space-y-1">
          {getNavLinks().map((item) => (
            <div key={item.href || item.label}>
              {item.subLinks ? (
                <div className="space-y-1">
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-blue-700`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </div>
                    <span>
                      {openDropdowns[item.label] ? (
                        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M19 9l-7 7-7-7"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M9 5l7 7-7 7"></path>
                        </svg>
                      )}
                    </span>
                  </button>
                  
                  {openDropdowns[item.label] && (
                    <div className="pl-6 space-y-1">
                      {item.subLinks.map(subItem => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(subItem.href)}`}
                        >
                          <span className="mr-3">{subItem.icon}</span>
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(item.href)}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}