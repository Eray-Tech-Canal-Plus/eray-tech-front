import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Smartphone,
  Tag,
  FolderTree,
  Wrench,
  Newspaper,
  CalendarCheck,
  PhoneCall,
  Mail,
  X,
  Store,
} from 'lucide-react';

import { useAuth } from '@/lib/auth';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/phones', label: 'Téléphones', icon: Smartphone },
  { to: '/marques', label: 'Marques', icon: Tag },
  { to: '/categories', label: 'Catégories', icon: FolderTree },
  { to: '/services', label: 'Services', icon: Wrench },
  { to: '/blogs', label: 'Blog', icon: Newspaper },
  { to: '/reservations', label: 'Réservations', icon: CalendarCheck },
  { to: '/contacts', label: 'Contacts', icon: Mail },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user } = useAuth();
  const initials = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : 'A';
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-200">
              <Store size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800">Back-Office</h1>
              <p className="text-xs text-slate-400">Phones & Canal+</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Menu</p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon size={19} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                        {item.label}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-sm font-semibold text-white">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">{user?.name || 'Administrateur'}</p>
              <p className="text-xs text-slate-400">{user?.email || 'admin@boutique.com'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
