import React, { useEffect, useState } from "react";
import { apiService, Reservation } from "../../lib/api";
import {
  Search,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ITEMS_PER_PAGE = 5;

export const ReservationsManager: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await apiService.getReservations();
      setReservations(res.data);
    } catch (error) {
      toast.error("Erreur lors de la récupération des réservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Update Status Handler
  const handleStatusChange = async (id: string, newStatus: Reservation["statut"]) => {
    setUpdatingId(id);
    try {
      await apiService.updateReservationStatus(id, newStatus);
      const label =
        newStatus === "confirmed"
          ? "Confirmée"
          : newStatus === "cancelled"
          ? "Annulée"
          : "Mise en attente";
      toast.success(`Statut de la réservation mis à jour : ${label}`);
      fetchReservations();
    } catch (error) {
      toast.error("Impossible de modifier le statut.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete Handler
  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await apiService.deleteReservation(deletingId);
      toast.success("Réservation supprimée.");
      setDeletingId(null);
      fetchReservations();
    } catch (error) {
      toast.error("Erreur lors de la suppression.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter Logic
  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.nomClient.toLowerCase().includes(search.toLowerCase()) ||
      r.serviceChoisi.toLowerCase().includes(search.toLowerCase()) ||
      r.adresse.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || r.statut === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredReservations.length / ITEMS_PER_PAGE) || 1;
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Gestion des Réservations
          </h2>
          <p className="text-sm text-muted-foreground">
            Suivez et validez les rendez-vous d'intervention à domicile.
          </p>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border/60 bg-card p-3 shadow-sm">
          <Search className="h-4 w-4 text-muted-foreground ml-2" />
          <Input
            placeholder="Rechercher par nom client, service ou adresse..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 rounded-2xl border border-border/60 bg-card p-1.5 shadow-sm overflow-x-auto">
          <Button
            variant={statusFilter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setStatusFilter("all");
              setCurrentPage(1);
            }}
            className="rounded-xl text-xs font-semibold"
          >
            Toutes ({reservations.length})
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setStatusFilter("pending");
              setCurrentPage(1);
            }}
            className="rounded-xl text-xs font-semibold text-amber-600 dark:text-amber-400"
          >
            En attente ({reservations.filter((r) => r.statut === "pending").length})
          </Button>
          <Button
            variant={statusFilter === "confirmed" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setStatusFilter("confirmed");
              setCurrentPage(1);
            }}
            className="rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400"
          >
            Confirmées ({reservations.filter((r) => r.statut === "confirmed").length})
          </Button>
          <Button
            variant={statusFilter === "cancelled" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setStatusFilter("cancelled");
              setCurrentPage(1);
            }}
            className="rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400"
          >
            Annulées ({reservations.filter((r) => r.statut === "cancelled").length})
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : paginatedReservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="font-semibold text-foreground">Aucune réservation trouvée</p>
            <p className="text-sm text-muted-foreground mt-1">
              Aucun rendez-vous ne correspond à vos filtres actuels.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase font-semibold text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Nom Client</th>
                  <th className="px-6 py-4">Service Choisi</th>
                  <th className="px-6 py-4">Date & Heure</th>
                  <th className="px-6 py-4">Adresse</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Changer le statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {paginatedReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-accent/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">
                      {res.nomClient}
                    </td>
                    <td className="px-6 py-4 text-foreground font-medium">
                      {res.serviceChoisi}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-xs text-muted-foreground gap-0.5">
                        <span className="font-medium text-foreground flex items-center gap-1">
                          <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                          {res.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {res.heure}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs text-xs text-muted-foreground truncate">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="truncate">{res.adresse}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={`capitalize font-bold ${
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
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {updatingId === res.id ? (
                          <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                        ) : (
                          <>
                            {/* Status Change Buttons */}
                            <Button
                              size="sm"
                              variant={res.statut === "pending" ? "default" : "outline"}
                              onClick={() => handleStatusChange(res.id, "pending")}
                              className="rounded-lg text-xs h-7 px-2.5 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border-amber-500/30 dark:text-amber-400"
                            >
                              <AlertCircle className="mr-1 h-3 w-3" /> Pending
                            </Button>
                            <Button
                              size="sm"
                              variant={res.statut === "confirmed" ? "default" : "outline"}
                              onClick={() => handleStatusChange(res.id, "confirmed")}
                              className="rounded-lg text-xs h-7 px-2.5 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-emerald-500/30 dark:text-emerald-400"
                            >
                              <CheckCircle2 className="mr-1 h-3 w-3" /> Confirmed
                            </Button>
                            <Button
                              size="sm"
                              variant={res.statut === "cancelled" ? "default" : "outline"}
                              onClick={() => handleStatusChange(res.id, "cancelled")}
                              className="rounded-lg text-xs h-7 px-2.5 bg-rose-500/10 text-rose-700 hover:bg-rose-500/20 border-rose-500/30 dark:text-rose-400"
                            >
                              <XCircle className="mr-1 h-3 w-3" /> Cancelled
                            </Button>

                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setDeletingId(res.id)}
                              className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg ml-1"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && filteredReservations.length > 0 && (
          <div className="flex items-center justify-between border-t border-border/60 px-6 py-4 bg-card">
            <span className="text-xs text-muted-foreground">
              Affichage de {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredReservations.length)} à{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredReservations.length)} sur{" "}
              {filteredReservations.length} réservations
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="rounded-lg text-xs"
              >
                <ChevronLeft className="mr-1 h-3.5 w-3.5" /> Précédent
              </Button>
              <span className="text-xs font-semibold px-2">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg text-xs"
              >
                Suivant <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Supprimer cette réservation ?"
        description="Cette demande de réservation sera définitivement supprimée du système."
      />
    </div>
  );
};

export default ReservationsManager;
