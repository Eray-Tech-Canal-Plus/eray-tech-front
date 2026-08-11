import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type * as React from "react";
import {
  Smartphone,
  CalendarCheck,
  Mail,
  Wrench,
  Newspaper,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { phonesApi, reservationsApi, contactsApi, servicesApi, blogsApi } from "@/admin/services";
import type { Phone, Reservation, Contact } from "@/admin/types";
import { formatDate, formatPrice } from "@/admin/format";
import StatusBadge from "@/admin/components/ui/StatusBadge";
import LoadingSpinner from "@/admin/components/ui/LoadingSpinner";

type AdminLink =
  | "/admin"
  | "/admin/phones"
  | "/admin/reservations"
  | "/admin/contacts"
  | "/admin/services"
  | "/admin/blogs";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  link: AdminLink;
  loading: boolean;
}

function StatCard({ title, value, icon: Icon, color, bgColor, link, loading }: StatCardProps) {
  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          {loading ? (
            <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgColor}`}>
          <Icon size={24} className={color} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-blue-600">
        <span>Voir détails</span>
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    phones: 0,
    reservations: 0,
    contacts: 0,
    services: 0,
    blogs: 0,
  });
  const [recentPhones, setRecentPhones] = useState<Phone[]>([]);
  const [recentReservations, setRecentReservations] = useState<Reservation[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [phones, reservations, contacts, services, blogs] = await Promise.all([
          phonesApi.list(),
          reservationsApi.list(),
          contactsApi.list(),
          servicesApi.list(),
          blogsApi.list(),
        ]);

        setStats({
          phones: phones.length,
          reservations: reservations.length,
          contacts: contacts.length,
          services: services.length,
          blogs: blogs.length,
        });

        setRecentPhones([...phones].slice(0, 5));
        setRecentReservations([...reservations].slice(0, 5));
        setRecentContacts([...contacts].slice(0, 5));
      } catch (err) {
        console.error("Erreur lors du chargement du tableau de bord", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const statCards: {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    link: AdminLink;
  }[] = [
    {
      title: "Téléphones",
      value: stats.phones,
      icon: Smartphone,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/admin/phones",
    },
    {
      title: "Réservations",
      value: stats.reservations,
      icon: CalendarCheck,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      link: "/admin/reservations",
    },
    {
      title: "Messages",
      value: stats.contacts,
      icon: Mail,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      link: "/admin/contacts",
    },
    {
      title: "Services",
      value: stats.services,
      icon: Wrench,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "/admin/services",
    },
    {
      title: "Articles blog",
      value: stats.blogs,
      icon: Newspaper,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      link: "/admin/blogs",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
        <p className="mt-1 text-sm text-slate-500">Vue d'ensemble de votre activité</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} loading={loading} />
        ))}
      </div>

      {/* Recent sections */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* Recent phones */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Smartphone size={18} className="text-blue-600" />
                Derniers téléphones
              </h3>
              <Link
                to="/admin/phones"
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                Tout voir
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {recentPhones.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-slate-400">Aucun téléphone</p>
              ) : (
                recentPhones.map((phone) => (
                  <div key={phone.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{phone.name}</p>
                      <p className="text-xs text-slate-400">
                        {phone.marque?.nom || "-"} · {phone.categorie?.nom || "-"}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-slate-600">
                      {formatPrice(phone.prix)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent reservations */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <CalendarCheck size={18} className="text-emerald-600" />
                Dernières réservations
              </h3>
              <Link
                to="/admin/reservations"
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                Tout voir
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {recentReservations.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-slate-400">Aucune réservation</p>
              ) : (
                recentReservations.map((res) => (
                  <div key={res.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {res.client?.nom || "Client"}
                      </p>
                      <p className="text-xs text-slate-400">{formatDate(res.date)}</p>
                    </div>
                    <StatusBadge status={res.statut} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent contacts */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Mail size={18} className="text-amber-600" />
                Derniers messages
              </h3>
              <Link
                to="/admin/contacts"
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                Tout voir
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {recentContacts.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-slate-400">Aucun message</p>
              ) : (
                recentContacts.map((contact) => (
                  <div key={contact.id} className="px-5 py-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-700">
                        {contact.nom || "Anonyme"}
                      </p>
                      <span className="text-xs text-slate-400">
                        {formatDate(contact.created_at)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Activity banner */}
      <div className="mt-8 flex items-center gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600">
          <TrendingUp size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Bienvenue dans votre back-office</h3>
          <p className="mt-0.5 text-sm text-slate-500">
            Gérez vos téléphones, services Canal+, réservations et plus encore depuis une interface
            unique.
          </p>
        </div>
      </div>
    </div>
  );
}
