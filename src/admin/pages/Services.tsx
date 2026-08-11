import { useEffect, useState } from "react";
import { Pencil, Trash2, Wrench } from "lucide-react";
import { servicesApi } from "@/admin/services";
import type { Service } from "@/admin/types";
import { formatPrice } from "@/admin/format";
import PageHeader from "@/admin/components/ui/PageHeader";
import Modal from "@/admin/components/ui/Modal";
import ConfirmDialog from "@/admin/components/ui/ConfirmDialog";
import FormField from "@/admin/components/ui/FormField";
import EmptyState from "@/admin/components/ui/EmptyState";
import LoadingSpinner from "@/admin/components/ui/LoadingSpinner";
import { useToast } from "@/admin/components/ui/Toast";

export default function Services() {
  const { notify } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix: "",
    avantages: "",
    promotion: "",
  });

  async function loadData() {
    setLoading(true);
    try {
      setServices(await servicesApi.list());
    } catch {
      notify("Erreur lors du chargement", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData(); /* eslint-disable-next-line */
  }, []);

  function openAdd() {
    setEditing(null);
    setForm({ nom: "", description: "", prix: "", avantages: "", promotion: "" });
    setModalOpen(true);
  }

  function openEdit(s: Service) {
    setEditing(s);
    setForm({
      nom: s.nom,
      description: s.description || "",
      prix: s.prix?.toString() || "",
      avantages: s.avantages || "",
      promotion: s.promotion || "",
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.nom.trim()) {
      notify("Le nom est obligatoire", "warning");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        nom: form.nom,
        description: form.description || null,
        prix: form.prix ? parseFloat(form.prix) : null,
        avantages: form.avantages || null,
        promotion: form.promotion || null,
      };
      if (editing) {
        await servicesApi.update(editing.id, payload);
        notify("Service modifié");
      } else {
        await servicesApi.create(payload);
        notify("Service ajouté");
      }
      setModalOpen(false);
      loadData();
    } catch {
      notify("Erreur lors de la sauvegarde", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (deleteId == null) return;
    try {
      await servicesApi.remove(deleteId);
      notify("Service supprimé");
      loadData();
    } catch {
      notify("Erreur lors de la suppression", "error");
    }
  }

  return (
    <div>
      <PageHeader
        title="Services"
        description="Gérez les services Canal+ et autres prestations"
        onAdd={openAdd}
        addLabel="Ajouter un service"
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <LoadingSpinner />
        ) : services.length === 0 ? (
          <EmptyState title="Aucun service trouvé" message="Ajoutez votre premier service" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Nom</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Prix</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Description</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Avantages</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Promotion</th>
                  <th className="px-5 py-3.5 text-right font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {services.map((s) => (
                  <tr key={s.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                          <Wrench size={16} className="text-purple-600" />
                        </div>
                        <div>
                          <span className="font-medium text-slate-700">{s.nom}</span>
                          {s.description && (
                            <p className="text-xs text-slate-400 line-clamp-1">{s.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-700">
                      {formatPrice(s.prix)}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{s.description || "-"}</td>
                    <td className="px-5 py-3.5 text-slate-600">{s.avantages || "-"}</td>
                    <td className="px-5 py-3.5 text-slate-600">{s.promotion || "-"}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(s)}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
                          title="Modifier"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          onClick={() => setDeleteId(s.id)}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          title="Supprimer"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Modifier le service" : "Ajouter un service"}
        size="lg"
      >
        <div className="space-y-4">
          <FormField
            label="Nom"
            name="nom"
            value={form.nom}
            onChange={(v) => setForm({ ...form, nom: v })}
            required
            placeholder="Ex: Installation Canal+"
          />
          <FormField
            label="Description"
            name="description"
            value={form.description}
            onChange={(v) => setForm({ ...form, description: v })}
            textarea
            placeholder="Description du service"
          />
          <FormField
            label="Prix (ARIARY)"
            name="prix"
            type="number"
            value={form.prix}
            onChange={(v) => setForm({ ...form, prix: v })}
            placeholder="0"
          />
          <FormField
            label="Avantages"
            name="avantages"
            value={form.avantages}
            onChange={(v) => setForm({ ...form, avantages: v })}
            textarea
            placeholder="Ex: Installation gratuite, garantie..."
          />
          <FormField
            label="Promotion"
            name="promotion"
            value={form.promotion}
            onChange={(v) => setForm({ ...form, promotion: v })}
            placeholder="Ex: -20% ou Offre spéciale"
          />
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setModalOpen(false)}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Sauvegarde..." : "Sauvegarder"}
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        open={deleteId != null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Supprimer le service"
        message="Êtes-vous sûr de vouloir supprimer ce service ?"
      />
    </div>
  );
}
