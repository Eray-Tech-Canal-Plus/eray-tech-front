import { useEffect, useState } from 'react';
import { Pencil, Trash2, Newspaper, Calendar } from 'lucide-react';
import { blogsApi } from '@/lib/services';
import type { Blog } from '@/types';
import { formatDate } from '@/lib/format';
import PageHeader from '@/components/ui/PageHeader';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import FormField from '@/components/ui/FormField';
import RichTextEditor from '@/components/ui/RichTextEditor';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useToast } from '@/components/ui/Toast';

export default function Blogs() {
  const { notify } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    titre: '',
    type: '',
    auteur: '',
    contenu: '',
    image: '',
    date_publication: '',
  });

  async function loadData() {
    setLoading(true);
    try {
      setBlogs(await blogsApi.list());
    } catch {
      notify('Erreur lors du chargement', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); /* eslint-disable-next-line */ }, []);

  function openAdd() {
    setEditing(null);
    setForm({ titre: '', type: '', auteur: '', contenu: '', image: '', date_publication: new Date().toISOString().slice(0, 10) });
    setModalOpen(true);
  }

  function openEdit(b: Blog) {
    setEditing(b);
    setForm({
      titre: b.titre,
      type: b.type || '',
      auteur: b.auteur || '',
      contenu: b.contenu || '',
      image: b.image || '',
      date_publication: b.date_publication || '',
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.titre.trim()) { notify('Le titre est obligatoire', 'warning'); return; }
    setSaving(true);
    try {
      const payload = {
        titre: form.titre,
        type: form.type || null,
        auteur: form.auteur || null,
        contenu: form.contenu || null,
        image: form.image || null,
        date_publication: form.date_publication || null,
      };
      if (editing) {
        await blogsApi.update(editing.id, payload);
        notify('Article modifié');
      } else {
        await blogsApi.create(payload);
        notify('Article ajouté');
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
      await blogsApi.remove(deleteId);
      notify('Article supprimé');
      loadData();
    } catch {
      notify('Erreur lors de la suppression', 'error');
    }
  }

  return (
    <div>
      <PageHeader title="Blog" description="Gérez les articles du blog" onAdd={openAdd} addLabel="Ajouter un article" />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? <LoadingSpinner /> : blogs.length === 0 ? (
          <EmptyState title="Aucun article trouvé" message="Ajoutez votre premier article" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Image</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Titre</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Type</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Auteur</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Date de publication</th>
                  <th className="px-5 py-3.5 text-right font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {blogs.map((b) => (
                  <tr key={b.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-5 py-3.5">
                      {b.image ? (
                        <img src={b.image} alt={b.titre} className="h-12 w-16 rounded-lg object-cover" />
                      ) : (
                        <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-rose-50"><Newspaper size={18} className="text-rose-500" /></div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-700">{b.titre}</td>
                    <td className="px-5 py-3.5 text-slate-600">{b.type || '-'}</td>
                    <td className="px-5 py-3.5 text-slate-600">{b.auteur || '-'}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-slate-500"><Calendar size={14} className="text-slate-400" />{formatDate(b.date_publication)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(b)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600" title="Modifier"><Pencil size={17} /></button>
                        <button onClick={() => setDeleteId(b.id)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600" title="Supprimer"><Trash2 size={17} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Modifier l\'article' : 'Ajouter un article'} size="xl">
        <div className="space-y-4">
          <FormField label="Titre" name="titre" value={form.titre} onChange={(v) => setForm({ ...form, titre: v })} required placeholder="Titre de l'article" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Type" name="type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} placeholder="Type d'article" />
            <FormField label="Auteur" name="auteur" value={form.auteur} onChange={(v) => setForm({ ...form, auteur: v })} placeholder="Nom de l'auteur" />
            <FormField label="Date de publication" name="date_publication" type="date" value={form.date_publication} onChange={(v) => setForm({ ...form, date_publication: v })} />
          </div>
          <FormField label="Image (URL)" name="image" value={form.image} onChange={(v) => setForm({ ...form, image: v })} placeholder="https://..." />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Contenu</label>
            <RichTextEditor value={form.contenu} onChange={(v) => setForm({ ...form, contenu: v })} placeholder="Rédigez votre article..." />
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={() => setModalOpen(false)} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">Annuler</button>
          <button onClick={handleSave} disabled={saving} className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50">{saving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
        </div>
      </Modal>

      <ConfirmDialog open={deleteId != null} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Supprimer l'article" message="Êtes-vous sûr de vouloir supprimer cet article ?" />
    </div>
  );
}
