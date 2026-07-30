import React, { useEffect, useState } from "react";
import { apiService, Service } from "../../lib/api";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Wrench,
  Loader2,
  X,
  Tag,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";
import DeleteConfirmModal from "./DeleteConfirmModal";

export const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formNom, setFormNom] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrix, setFormPrix] = useState("");

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await apiService.getServices();
      setServices(res.data);
    } catch (error) {
      toast.error("Erreur lors de la récupération des services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormNom("");
    setFormDescription("");
    setFormPrix("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (serv: Service) => {
    setEditingService(serv);
    setFormNom(serv.nom);
    setFormDescription(serv.description);
    setFormPrix(serv.prix.toString());
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNom.trim() || !formPrix) {
      toast.error("Le nom et le prix du service sont obligatoires.");
      return;
    }

    setSubmitting(true);
    try {
      if (editingService) {
        await apiService.updateService(editingService.id, {
          nom: formNom,
          description: formDescription,
          prix: Number(formPrix),
        });
        toast.success("Service mis à jour avec succès !");
      } else {
        await apiService.createService({
          nom: formNom,
          description: formDescription,
          prix: Number(formPrix),
        });
        toast.success("Nouveau service ajouté au catalogue !");
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'enregistrement du service.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await apiService.deleteService(deletingId);
      toast.success("Service supprimé du catalogue.");
      setDeletingId(null);
      fetchServices();
    } catch (error) {
      toast.error("Impossible de supprimer ce service.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredServices = services.filter(
    (s) =>
      s.nom.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Gestion des Services (Canal+ & Tech)
          </h2>
          <p className="text-sm text-muted-foreground">
            Gérez la liste de vos prestations proposées à vos clients.
          </p>
        </div>
        <Button
          onClick={handleOpenAdd}
          className="rounded-xl font-semibold shadow-sm hover:shadow transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> Ajouter un service
        </Button>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3 shadow-sm">
        <Search className="h-4 w-4 text-muted-foreground ml-2" />
        <Input
          placeholder="Rechercher un service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
        />
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-card flex flex-col items-center justify-center p-12 text-center shadow-sm">
          <Wrench className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="font-semibold text-foreground">Aucun service trouvé</p>
          <p className="text-sm text-muted-foreground mt-1">
            Ajoutez votre premier service (ex: installation parabole, réparation).
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((serv) => (
            <div
              key={serv.id}
              className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-5 shadow-xs hover:shadow-md transition-all relative group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleOpenEdit(serv)}
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setDeletingId(serv.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <h3 className="mt-4 font-bold text-foreground text-lg">{serv.nom}</h3>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {serv.description || "Aucune description fournie."}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Tag className="h-3.5 w-3.5 text-primary" />
                  <span>Tarif indicatif</span>
                </div>
                <span className="text-base font-extrabold text-foreground">
                  {serv.prix.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl border border-border/80 bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold text-foreground">
              {editingService ? "Modifier le service" : "Ajouter un nouveau service"}
            </h3>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="nom" className="text-xs font-semibold">
                  Nom du service *
                </Label>
                <Input
                  id="nom"
                  placeholder="ex: Installation Parabole HD"
                  value={formNom}
                  onChange={(e) => setFormNom(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prix" className="text-xs font-semibold">
                  Prix (FCFA) *
                </Label>
                <Input
                  id="prix"
                  type="number"
                  placeholder="15000"
                  value={formPrix}
                  onChange={(e) => setFormPrix(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-xs font-semibold">
                  Description du service
                </Label>
                <Textarea
                  id="description"
                  placeholder="Détails des prestations comprises dans ce service..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="rounded-xl rows-4"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl font-semibold"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : editingService ? (
                    "Mettre à jour"
                  ) : (
                    "Créer le service"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Supprimer ce service ?"
        description="Ce service sera définitivement retiré de votre offre."
      />
    </div>
  );
};

export default ServicesManager;
