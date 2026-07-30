import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Wrench,
  Calendar,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

import AdminDashboard from "../components/admin/AdminDashboard";
import ProductsManager from "../components/admin/ProductsManager";
import BlogManager from "../components/admin/BlogManager";
import ServicesManager from "../components/admin/ServicesManager";
import ReservationsManager from "../components/admin/ReservationsManager";
import AdminLoginForm from "../components/admin/AdminLoginForm";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

type TabType = "dashboard" | "products" | "blog" | "services" | "reservations";

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check Auth State on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("eray_admin_authenticated");
      setIsAuthenticated(auth === "true");
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("eray_admin_authenticated");
    }
    setIsAuthenticated(false);
    toast.success("Vous avez été déconnecté de l'administration.");
  };

  if (isAuthenticated === null) {
    return null; // Silent loader or initial hydration check
  }

  // Render Login Page if Not Authenticated
  if (!isAuthenticated) {
    return <AdminLoginForm onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const navItems = [
    {
      id: "dashboard" as TabType,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "products" as TabType,
      label: "Boutique",
      icon: ShoppingBag,
    },
    {
      id: "blog" as TabType,
      label: "Blog",
      icon: FileText,
    },
    {
      id: "services" as TabType,
      label: "Services",
      icon: Wrench,
    },
    {
      id: "reservations" as TabType,
      label: "Réservations",
      icon: Calendar,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground">
      {/* Mobile Header overlay */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between border-b border-border/60 bg-background/95 backdrop-blur-md px-4 py-3">
        <div className="flex items-center gap-3">
          <img src="/images/logo-area.svg" alt="Eray Tech" className="h-7 w-auto" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Admin</span>
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-xl"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border/60 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-border/40 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <img src="/images/logo-area.svg" alt="Eray Tech" className="h-8 w-auto" />
            </a>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary border border-primary/20">
              BACKOFFICE
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Menu principal
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer & Logout */}
        <div className="p-4 border-t border-border/40 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-border/60 bg-accent/30 p-3 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
          >
            <span>Voir le site public</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="hidden md:flex sticky top-0 z-30 h-16 items-center justify-between border-b border-border/60 bg-background/95 backdrop-blur-md px-8">
          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Admin</span>
            <span className="text-xs text-muted-foreground">/</span>
            <h1 className="text-sm font-bold text-foreground capitalize">
              {activeTab === "dashboard"
                ? "Tableau de bord"
                : activeTab === "products"
                ? "Boutique & Produits"
                : activeTab === "blog"
                ? "Blog & Articles"
                : activeTab === "services"
                ? "Services & Prestations"
                : "Réservations"}
            </h1>
          </div>

          {/* User & Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-3.5 py-1.5 shadow-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-bold text-foreground">Administrateur Connecté</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && (
            <AdminDashboard onNavigate={(tab) => setActiveTab(tab)} />
          )}
          {activeTab === "products" && <ProductsManager />}
          {activeTab === "blog" && <BlogManager />}
          {activeTab === "services" && <ServicesManager />}
          {activeTab === "reservations" && <ReservationsManager />}
        </main>
      </div>
    </div>
  );
}
