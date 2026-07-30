import React, { useEffect, useState } from "react";
import { apiService, Product, Post, Service, Reservation } from "../../lib/api";
import {
  ShoppingBag,
  FileText,
  Wrench,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface AdminDashboardProps {
  onNavigate: (tab: "products" | "blog" | "services" | "reservations") => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, postRes, servRes, resRes] = await Promise.all([
          apiService.getProducts(),
          apiService.getPosts(),
          apiService.getServices(),
          apiService.getReservations(),
        ]);
        setProducts(prodRes.data);
        setPosts(postRes.data);
        setServices(servRes.data);
        setReservations(resRes.data);
      } catch (err) {
        console.error("Erreur de chargement du dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  const pendingReservations = reservations.filter((r) => r.statut === "pending");
  const confirmedReservations = reservations.filter((r) => r.statut === "confirmed");
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  const stats = [
    {
      title: "Boutique (Produits)",
      value: products.length,
      subtext: `${lowStockProducts.length} en stock faible`,
      icon: ShoppingBag,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      tab: "products" as const,
    },
    {
      title: "Articles de Blog",
      value: posts.length,
      subtext: "Publications en ligne",
      icon: FileText,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      tab: "blog" as const,
    },
    {
      title: "Services Pro",
      value: services.length,
      subtext: "Offres actives",
      icon: Wrench,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      tab: "services" as const,
    },
    {
      title: "Réservations",
      value: reservations.length,
      subtext: `${pendingReservations.length} en attente`,
      icon: Calendar,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      tab: "reservations" as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner Header */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/90 via-primary to-primary/80 p-6 sm:p-8 text-primary-foreground shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Tableau de bord Admin
            </h1>
            <p className="mt-2 text-sm sm:text-base text-primary-foreground/80 max-w-2xl">
              Bienvenue sur votre espace de gestion Eray Tech. Retrouvez ici un aperçu global de votre activité.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md px-4 py-2 text-xs font-semibold">
            <TrendingUp className="h-4 w-4 text-emerald-300" />
            <span>Système actif & synchronisé</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              onClick={() => onNavigate(stat.tab)}
              className="group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md border-border/60 bg-card"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-xl p-2.5 ${stat.color} transition-transform group-hover:scale-110`}>
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-extrabold text-foreground">{stat.value}</div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{stat.subtext}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Two Column Layout for Quick Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Reservations */}
        <Card className="border-border/60 bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-bold">Dernières Réservations</CardTitle>
            </div>
            <button
              onClick={() => onNavigate("reservations")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Voir tout
            </button>
          </CardHeader>
          <CardContent className="space-y-4">
            {reservations.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucune réservation pour le moment.</p>
            ) : (
              reservations.slice(0, 4).map((res) => (
                <div
                  key={res.id}
                  className="flex items-center justify-between rounded-xl border border-border/40 bg-accent/30 p-3.5 transition-colors hover:bg-accent/60"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">{res.nomClient}</p>
                    <p className="text-xs text-muted-foreground">{res.serviceChoisi}</p>
                    <p className="text-xs text-muted-foreground/80">
                      📅 {res.date} à {res.heure}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`capitalize font-semibold ${
                      res.statut === "confirmed"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                        : res.statut === "pending"
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                        : "bg-rose-500/10 text-rose-600 border-rose-500/30"
                    }`}
                  >
                    {res.statut === "confirmed"
                      ? "Confirmée"
                      : res.statut === "pending"
                      ? "En attente"
                      : "Annulée"}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Low Stock Alerts & Products Summary */}
        <Card className="border-border/60 bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-base font-bold">Alertes de Stock & Boutique</CardTitle>
            </div>
            <button
              onClick={() => onNavigate("products")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Gérer le stock
            </button>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockProducts.length === 0 ? (
              <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <p className="text-sm font-medium">Tous les stocks de vos produits sont à des niveaux satisfaisants.</p>
              </div>
            ) : (
              lowStockProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.nom}
                      className="h-10 w-10 rounded-lg object-cover border border-border"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{prod.nom}</p>
                      <p className="text-xs text-muted-foreground">
                        {prod.prix.toLocaleString("fr-FR")} FCFA
                      </p>
                    </div>
                  </div>
                  <Badge variant="destructive" className="font-bold">
                    Reste : {prod.stock}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
