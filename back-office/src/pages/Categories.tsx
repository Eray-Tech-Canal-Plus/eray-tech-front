import { useEffect, useState } from 'react';
import { Pencil, Trash2, FolderTree } from 'lucide-react';
import { categoriesApi } from '@/lib/services';
import type { Categorie } from '@/types';
import { formatDate } from '@/lib/format';
import PageHeader from '@/components/ui/PageHeader';
import SearchInput from '@/components/ui/SearchInput';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import FormField from '@/components/ui/FormField';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useToast } from '@/components/ui/Toast';

export default function Categories() {
  const { notify } = useToast();
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Categorie | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [nom, setNom] = useState('');

  async function loadData() {
    setLoading(true);
    try {
      setCategories(await categoriesApi.list());
    } catch {
      notify('Erreur lors du chargement', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); /* eslint-disable-next-line */ }, []);

  const filtered = categories.filter((c) => c.nom.toLowerCase().includes(search.toLowerCase()));

  function openAdd() { setEditing(null); setNom(''); setModalOpen(true); }
  function openEdit(c: Categorie) { setEditing(c); setNom(c.nom); setModalOpen(true); }

  async function handleSave() {
    if (!nom.trim()) { notify('Le nom est obligatoire', 'warning'); return; }
    setSaving(true);
    try {
      if (editing) {
        await categoriesApi.update(editing.id, { nom });
        notify('Catégorie modifiée');
      } else {
        await categoriesApi.create({ nom });
        notify('Catégorie ajoutée');
      }
      setModalOpen(false);
      loadData();
    } catch {
      notify('Erreur lors de la sauvegarde', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (deleteId == null) return;
    try {
      await categoriesApi.remove(deleteId);
      notify('Catégorie supprimée');
      loadData();
    } catch {
      notify('Erreur lors de la suppression', 'error');
    }
  }

  return (
    <div>
      <PageHeader title="Catégories" description="Gérez les catégories de téléphones" onAdd={openAdd} addLabel="Ajouter une catégorie" />
      <div className="mb-4 max-w-md"><SearchInput value={search} onChange={setSearch} placeholder="Rechercher une catégorie..." /></div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? <LoadingSpinner /> : filtered.length === 0 ? (
          <EmptyState title="Aucune catégorie trouvée" message="Ajoutez votre première catégorie" />
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
                {filtered.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50"><FolderTree size={16} className="text-emerald-600" /></div>
                        <span className="font-medium text-slate-700">{c.nom}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(c)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600" title="Modifier"><Pencil size={17} /></button>
                        <button onClick={() => setDeleteId(c.id)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600" title="Supprimer"><Trash2 size={17} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier la catégorie' : 'Ajouter une catégorie'}>
        <FormField label="Nom" name="nom" value={nom} onChange={setNom} required placeholder="Ex: Smartphone" />
        <div className="mt-6 flex gap-3">
          <button onClick={() => setModalOpen(false)} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">Annuler</button>
          <button onClick={handleSave} disabled={saving} className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50">{saving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
        </div>
      </Modal>

      <ConfirmDialog open={deleteId != null} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Supprimer la catégorie" message="Êtes-vous sûr de vouloir supprimer cette catégorie ?" />
    </div>
  );
}
