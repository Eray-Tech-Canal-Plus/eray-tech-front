import { Link } from "@tanstack/react-router";
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
} from "lucide-react";

import { useAuth } from "@/admin/auth";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: "/admin" as const, label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/admin/phones" as const, label: "Téléphones", icon: Smartphone },
  { to: "/admin/marques" as const, label: "Marques", icon: Tag },
  { to: "/admin/categories" as const, label: "Catégories", icon: FolderTree },
  { to: "/admin/services" as const, label: "Services", icon: Wrench },
  { to: "/admin/blogs" as const, label: "Blog", icon: Newspaper },
  { to: "/admin/reservations" as const, label: "Réservations", icon: CalendarCheck },
  { to: "/admin/demandes" as const, label: "Demandes", icon: PhoneCall },
  { to: "/admin/contacts" as const, label: "Contacts", icon: Mail },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user } = useAuth();
  const initials = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : "A";
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
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
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.end }}
                    onClick={onClose}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-800 data-[status=active]:bg-blue-50 data-[status=active]:text-blue-700"
                  >
                    <Icon
                      size={19}
                      className="text-slate-400 transition-colors group-data-[status=active]:text-blue-600"
                    />
                    {item.label}
                  </Link>
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
              <p className="text-sm font-semibold text-slate-700">
                {user?.name || "Administrateur"}
              </p>
              <p className="text-xs text-slate-400">{user?.email || "admin@boutique.com"}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
