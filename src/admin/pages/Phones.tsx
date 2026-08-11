import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Smartphone } from "lucide-react";
import { phonesApi, marquesApi, categoriesApi } from "@/admin/services";
import type { Phone, Marque, Categorie } from "@/admin/types";
import { formatPrice } from "@/admin/format";
import PageHeader from "@/admin/components/ui/PageHeader";
import SearchInput from "@/admin/components/ui/SearchInput";
import Modal from "@/admin/components/ui/Modal";
import ConfirmDialog from "@/admin/components/ui/ConfirmDialog";
import StatusBadge, { AVAILABILITY_OPTIONS } from "@/admin/components/ui/StatusBadge";
import FormField from "@/admin/components/ui/FormField";
import EmptyState from "@/admin/components/ui/EmptyState";
import LoadingSpinner from "@/admin/components/ui/LoadingSpinner";
import { useToast } from "@/admin/components/ui/Toast";

const ETAT_OPTIONS = ["neuf", "reconditionné", "occasion"];

export default function Phones() {
  const { notify } = useToast();
  const [phones, setPhones] = useState<Phone[]>([]);
  const [marques, setMarques] = useState<Marque[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewPhone, setViewPhone] = useState<Phone | null>(null);
  const [editing, setEditing] = useState<Phone | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    image: "",
    name: "",
    couleur: "",
    prix: "",
    stockage: "",
    etat: "",
    id_marque: "",
    id_categorie: "",
    disponibilite: "En Stock",
  });

  async function loadData() {
    setLoading(true);
    try {
      const [phoneData, marqueData, catData] = await Promise.all([
        phonesApi.list(),
        marquesApi.list(),
        categoriesApi.list(),
      ]);
      setPhones(phoneData);
      setMarques(marqueData);
      setCategories(catData);
    } catch {
      notify("Erreur lors du chargement des téléphones", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = phones.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.marque?.nom?.toLowerCase().includes(search.toLowerCase()) ||
      p.categorie?.nom?.toLowerCase().includes(search.toLowerCase()),
  );

  function openAdd() {
    setEditing(null);
    setForm({
      image: "",
      name: "",
      couleur: "",
      prix: "",
      stockage: "",
      etat: "",
      id_marque: "",
      id_categorie: "",
      disponibilite: "En Stock",
    });
    setModalOpen(true);
  }

  function openEdit(phone: Phone) {
    setEditing(phone);
    setForm({
      image: phone.image || "",
      name: phone.name || "",
      couleur: phone.couleur || "",
      prix: phone.prix?.toString() || "",
      stockage: phone.stockage || "",
      etat: phone.etat || "",
      id_marque: phone.id_marque?.toString() || "",
      id_categorie: phone.id_categorie?.toString() || "",
      disponibilite: phone.disponibilite || "En Stock",
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.name.trim()) {
      notify("Le nom est obligatoire", "warning");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        image: form.image || null,
        name: form.name,
        couleur: form.couleur || null,
        prix: form.prix ? parseFloat(form.prix) : null,
        stockage: form.stockage || null,
        etat: form.etat || null,
        id_marque: form.id_marque ? parseInt(form.id_marque) : null,
        id_categorie: form.id_categorie ? parseInt(form.id_categorie) : null,
        disponibilite: form.disponibilite,
      };
      if (editing) {
        await phonesApi.update(editing.id, payload);
        notify("Téléphone modifié avec succès");
      } else {
        await phonesApi.create(payload);
        notify("Téléphone ajouté avec succès");
      }
      setModalOpen(false);
      loadData();
    } catch (error: unknown) {
      const data = (error as { response?: { data?: unknown } })?.response?.data;
      console.log(data);
      notify(JSON.stringify(data), "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (deleteId == null) return;
    try {
      await phonesApi.remove(deleteId);
      notify("Téléphone supprimé");
      loadData();
    } catch {
      notify("Erreur lors de la suppression", "error");
    }
  }

  return (
    <div>
      <PageHeader
        title="Téléphones"
        description="Gérez votre catalogue de téléphones"
        onAdd={openAdd}
        addLabel="Ajouter un téléphone"
      />

      <div className="mb-4 max-w-md">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Rechercher par nom, marque, catégorie..."
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <LoadingSpinner />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Aucun téléphone trouvé"
            message="Ajoutez votre premier téléphone pour commencer"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Nom</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Marque</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Catégorie</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Prix</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Couleur</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Stockage</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">État</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Disponibilité</th>
                  <th className="px-5 py-3.5 text-right font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((phone) => (
                  <tr key={phone.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={phone.image || undefined}
                            alt={phone.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <span className="font-medium text-slate-700">{phone.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{phone.marque?.nom || "-"}</td>
                    <td className="px-5 py-3.5 text-slate-600">{phone.categorie?.nom || "-"}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-700">
                      {formatPrice(phone.prix)}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{phone.couleur || "-"}</td>
                    <td className="px-5 py-3.5 text-slate-600">{phone.stockage || "-"}</td>
                    <td className="px-5 py-3.5 text-slate-600">{phone.etat || "-"}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={phone.disponibilite} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setViewPhone(phone);
                            setViewOpen(true);
                          }}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                          title="Voir"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          onClick={() => openEdit(phone)}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
                          title="Modifier"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          onClick={() => setDeleteId(phone.id)}
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

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Modifier le téléphone" : "Ajouter un téléphone"}
        size="lg"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField
              label="Nom"
              name="name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              required
              placeholder="Ex: Galaxy S24 Ultra"
            />
          </div>
          <FormField
            label="Image"
            name="image"
            value={form.image}
            onChange={(v) => setForm({ ...form, image: v })}
            placeholder="images/iphone16.jpg"
          />
          <FormField
            label="Marque"
            name="id_marque"
            value={form.id_marque}
            onChange={(v) => setForm({ ...form, id_marque: v })}
            options={marques.map((m) => ({ value: m.id, label: m.nom }))}
          />
          <FormField
            label="Catégorie"
            name="id_categorie"
            value={form.id_categorie}
            onChange={(v) => setForm({ ...form, id_categorie: v })}
            options={categories.map((c) => ({ value: c.id, label: c.nom }))}
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
            label="Couleur"
            name="couleur"
            value={form.couleur}
            onChange={(v) => setForm({ ...form, couleur: v })}
            placeholder="Ex: Noir"
          />
          <FormField
            label="Stockage"
            name="stockage"
            value={form.stockage}
            onChange={(v) => setForm({ ...form, stockage: v })}
            placeholder="Ex: 256 Go"
          />
          <FormField
            label="État"
            name="etat"
            value={form.etat}
            onChange={(v) => setForm({ ...form, etat: v })}
            options={ETAT_OPTIONS.map((e) => ({ value: e, label: e }))}
          />
          <FormField
            label="Disponibilité"
            name="disponibilite"
            value={form.disponibilite}
            onChange={(v) => setForm({ ...form, disponibilite: v })}
            options={AVAILABILITY_OPTIONS.map((a: string) => ({ value: a, label: a }))}
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

      {/* View Modal */}
      <Modal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title="Détails du téléphone"
        size="md"
      >
        {viewPhone && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-xl bg-blue-50 p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
                <Smartphone size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{viewPhone.name}</h3>
                <p className="text-sm text-slate-500">
                  {viewPhone.marque?.nom || "-"} · {viewPhone.categorie?.nom || "-"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Prix" value={formatPrice(viewPhone.prix)} />
              <DetailItem label="Couleur" value={viewPhone.couleur || "-"} />
              <DetailItem label="Stockage" value={viewPhone.stockage || "-"} />
              <DetailItem label="État" value={viewPhone.etat || "-"} />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                Disponibilité
              </p>
              <StatusBadge status={viewPhone.disponibilite} />
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={deleteId != null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Supprimer le téléphone"
        message="Êtes-vous sûr de vouloir supprimer ce téléphone ? Cette action est irréversible."
      />
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
}
