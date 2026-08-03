import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthProvider } from '@/lib/auth';
import { ToastProvider } from '@/components/ui/Toast';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Phones from '@/pages/Phones';
import Marques from '@/pages/Marques';
import Categories from '@/pages/Categories';
import Services from '@/pages/Services';
import Blogs from '@/pages/Blogs';
import Reservations from '@/pages/Reservations';
import Contacts from '@/pages/Contacts';

const pageTitles: Record<string, string> = {
  '/': 'Tableau de bord',
  '/phones': 'Gestion des téléphones',
  '/marques': 'Gestion des marques',
  '/categories': 'Gestion des catégories',
  '/services': 'Gestion des services',
  '/blogs': 'Gestion du blog',
  '/reservations': 'Gestion des réservations',
  '/contacts': 'Messages de contact',
};

function BackOfficeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Back-Office';

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-72">
        <Navbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="px-4 py-6 lg:px-8 lg:py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/phones" element={<Phones />} />
            <Route path="/marques" element={<Marques />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <BackOfficeLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
