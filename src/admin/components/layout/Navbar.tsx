import { Menu, Bell, LogOut } from "lucide-react";
import { useAuth } from "@/admin/auth";
import { useNavigate } from "@tanstack/react-router";

interface NavbarProps {
  onMenuClick: () => void;
  title: string;
}

export default function Navbar({ onMenuClick, title }: NavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate({ to: "/admin/login", replace: true });
  }

  const initials = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : "A";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:block"></div>
        <button className="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100">
          <Bell size={20} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <div className="hidden items-center gap-2.5 sm:flex">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-700">{user?.name || "Administrateur"}</p>
            <p className="text-xs text-slate-400">{user?.email || ""}</p>
          </div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-sm font-semibold text-white">
          {initials}
        </div>
        <button
          onClick={handleLogout}
          className="rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
          title="Se déconnecter"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
