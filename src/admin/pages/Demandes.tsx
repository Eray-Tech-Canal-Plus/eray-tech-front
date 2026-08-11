import { useEffect, useState } from "react";
import { Eye, Trash2, PhoneCall, Phone as PhoneIcon } from "lucide-react";
import { reservationServiceApi } from "@/admin/services";
import type { ReservationService } from "@/admin/types";
import { formatDateTime } from "@/admin/format";
import PageHeader from "@/admin/components/ui/PageHeader";
import Modal from "@/admin/components/ui/Modal";
import ConfirmDialog from "@/admin/components/ui/ConfirmDialog";
import EmptyState from "@/admin/components/ui/EmptyState";
import LoadingSpinner from "@/admin/components/ui/LoadingSpinner";
import { useToast } from "@/admin/components/ui/Toast";

export default function Demandes() {
  const { notify } = useToast();
  const [demandes, setDemandes] = useState<ReservationService[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewItem, setViewItem] = useState<ReservationService | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      setDemandes(await reservationServiceApi.list());
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
      await reservationServiceApi.remove(deleteId);
      notify("Demande supprimée");
      loadData();
    } catch {
      notify("Erreur lors de la suppression", "error");
    }
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <LoadingSpinner />
        ) : demandes.length === 0 ? (
          <EmptyState
            title="Aucune demande trouvée"
            message="Les demandes de service apparaîtront ici"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Nom</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Téléphone</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Date</th>
                  <th className="px-5 py-3.5 text-right font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {demandes.map((d) => (
                  <tr key={d.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                          <PhoneCall size={16} className="text-blue-600" />
                        </div>
                        <span className="font-medium text-slate-700">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <a
                        href={`tel:${d.telephone}`}
                        className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:underline"
                      >
                        <PhoneIcon size={14} />
                        {d.telephone}
                      </a>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{formatDateTime(d.created_at)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setViewItem(d);
                            setViewOpen(true);
                          }}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                          title="Voir"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          onClick={() => setDeleteId(d.id)}
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
        title="Détails de la demande"
        size="sm"
      >
        {viewItem && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-xl bg-blue-50 p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
                <PhoneCall size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{viewItem.name}</h3>
                <a
                  href={`tel:${viewItem.telephone}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {viewItem.telephone}
                </a>
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Date de la demande
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {formatDateTime(viewItem.created_at)}
              </p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={deleteId != null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Supprimer la demande"
        message="Êtes-vous sûr de vouloir supprimer cette demande ?"
      />
    </div>
  );
}
