import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { ToastProvider } from "@/admin/components/ui/Toast";
import ProtectedRoute from "@/admin/components/ProtectedRoute";
import Sidebar from "@/admin/components/layout/Sidebar";
import Navbar from "@/admin/components/layout/Navbar";

export const Route = createFileRoute("/admin/_layout")({
  component: AdminLayout,
});

const pageTitles: Record<string, string> = {
  "/admin": "Tableau de bord",
  "/admin/phones": "Gestion des téléphones",
  "/admin/marques": "Gestion des marques",
  "/admin/categories": "Gestion des catégories",
  "/admin/services": "Gestion des services",
  "/admin/blogs": "Gestion du blog",
  "/admin/reservations": "Gestion des réservations",
  "/admin/demandes": "Demandes de service",
  "/admin/contacts": "Messages de contact",
};

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || "Back-Office";

  return (
    <ToastProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-50">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="lg:pl-72">
            <Navbar onMenuClick={() => setSidebarOpen(true)} title={title} />
            <main className="px-4 py-6 lg:px-8 lg:py-8">
              <Outlet />
            </main>
          </div>
        </div>
      </ProtectedRoute>
    </ToastProvider>
  );
}
