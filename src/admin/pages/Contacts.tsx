import { useEffect, useState } from "react";
import { Eye, Trash2, Mail, User, Phone as PhoneIcon, Calendar } from "lucide-react";
import { contactsApi } from "@/admin/services";
import type { Contact } from "@/admin/types";
import { formatDateTime } from "@/admin/format";
import PageHeader from "@/admin/components/ui/PageHeader";
import Modal from "@/admin/components/ui/Modal";
import ConfirmDialog from "@/admin/components/ui/ConfirmDialog";
import EmptyState from "@/admin/components/ui/EmptyState";
import LoadingSpinner from "@/admin/components/ui/LoadingSpinner";
import { useToast } from "@/admin/components/ui/Toast";

export default function Contacts() {
  const { notify } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewItem, setViewItem] = useState<Contact | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      setContacts(await contactsApi.list());
    } catch {
      notify("Erreur lors du chargement", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData(); /* eslint-disable-next-line */
  }, []);

  async function handleDelete() {
    if (deleteId == null) return;
    try {
      await contactsApi.remove(deleteId);
      notify("Message supprimé");
      loadData();
    } catch {
      notify("Erreur lors de la suppression", "error");
    }
  }

  return (
    <div>
      <PageHeader
        title="Messages de contact"
        description="Les messages reçus via le formulaire de contact"
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <LoadingSpinner />
        ) : contacts.length === 0 ? (
          <EmptyState
            title="Aucun message trouvé"
            message="Les messages de contact apparaîtront ici"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Nom</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Email</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Téléphone</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Adresse</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {contacts.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50">
                          <User size={16} className="text-amber-600" />
                        </div>
                        <span className="font-medium text-slate-700">{c.nom || "-"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{c.email || "-"}</td>
                    <td className="px-5 py-3.5 text-slate-600">{c.telephone || "-"}</td>
                    <td className="px-5 py-3.5 text-slate-600">{c.adresse || "-"}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setViewItem(c);
                            setViewOpen(true);
                          }}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                          title="Voir"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          onClick={() => setDeleteId(c.id)}
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
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title="Détails du message"
        size="md"
      >
        {viewItem && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-xl bg-amber-50 p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500">
                <Mail size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{viewItem.nom || "Anonyme"}</h3>
                <p className="text-sm text-slate-500">{formatDateTime(viewItem.created_at)}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {viewItem.email && (
                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Email
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{viewItem.email}</p>
                </div>
              )}
              {viewItem.telephone && (
                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Téléphone
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{viewItem.telephone}</p>
                </div>
              )}
              {viewItem.adresse && (
                <div className="rounded-xl border border-slate-100 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Adresse
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{viewItem.adresse}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={deleteId != null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Supprimer le message"
        message="Êtes-vous sûr de vouloir supprimer ce message ?"
      />
    </div>
  );
}
