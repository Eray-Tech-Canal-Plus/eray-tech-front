import { useEffect, useState } from "react";
import { Pencil, Trash2, Tag } from "lucide-react";
import { marquesApi } from "@/admin/services";
import type { Marque } from "@/admin/types";
import { formatDate } from "@/admin/format";
import PageHeader from "@/admin/components/ui/PageHeader";
import SearchInput from "@/admin/components/ui/SearchInput";
import Modal from "@/admin/components/ui/Modal";
import ConfirmDialog from "@/admin/components/ui/ConfirmDialog";
import FormField from "@/admin/components/ui/FormField";
import EmptyState from "@/admin/components/ui/EmptyState";
import LoadingSpinner from "@/admin/components/ui/LoadingSpinner";
import { useToast } from "@/admin/components/ui/Toast";

export default function Marques() {
  const { notify } = useToast();
  const [marques, setMarques] = useState<Marque[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Marque | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [nom, setNom] = useState("");

  async function loadData() {
    setLoading(true);
    try {
      setMarques(await marquesApi.list());
    } catch {
      notify("Erreur lors du chargement", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData(); /* eslint-disable-next-line */
  }, []);

  const filtered = marques.filter((m) => m.nom.toLowerCase().includes(search.toLowerCase()));

  function openAdd() {
    setEditing(null);
    setNom("");
    setModalOpen(true);
  }
  function openEdit(m: Marque) {
    setEditing(m);
    setNom(m.nom);
    setModalOpen(true);
  }

  async function handleSave() {
    if (!nom.trim()) {
      notify("Le nom est obligatoire", "warning");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await marquesApi.update(editing.id, { nom });
        notify("Marque modifiée");
      } else {
        await marquesApi.create({ nom });
        notify("Marque ajoutée");
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
      await marquesApi.remove(deleteId);
      notify("Marque supprimée");
      loadData();
    } catch {
      notify("Erreur lors de la suppression", "error");
    }
  }

  return (
    <div>
      <PageHeader
        title="Marques"
        description="Gérez les marques de téléphones"
        onAdd={openAdd}
        addLabel="Ajouter une marque"
      />
      <div className="mb-4 max-w-md">
        <SearchInput value={search} onChange={setSearch} placeholder="Rechercher une marque..." />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <LoadingSpinner />
        ) : filtered.length === 0 ? (
          <EmptyState title="Aucune marque trouvée" message="Ajoutez votre première marque" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Nom</th>
                  <th className="px-5 py-3.5 text-right font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((m) => (
                  <tr key={m.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                          <Tag size={16} className="text-purple-600" />
                        </div>
                        <span className="font-medium text-slate-700">{m.nom}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(m)}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
                          title="Modifier"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          onClick={() => setDeleteId(m.id)}
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
        title={editing ? "Modifier la marque" : "Ajouter une marque"}
      >
        <FormField
          label="Nom"
          name="nom"
          value={nom}
          onChange={setNom}
          required
          placeholder="Ex: Samsung"
        />
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
        title="Supprimer la marque"
        message="Êtes-vous sûr de vouloir supprimer cette marque ?"
      />
    </div>
  );
}
