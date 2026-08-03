import { useEffect, useState } from 'react';
import { CalendarCheck, User, Wrench } from 'lucide-react';
import { reservationsApi } from '@/lib/services';
import type { Reservation } from '@/types';
import { formatDate } from '@/lib/format';
import PageHeader from '@/components/ui/PageHeader';
import { RESERVATION_STATUSES } from '@/components/ui/StatusBadge';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useToast } from '@/components/ui/Toast';

export default function Reservations() {
  const { notify } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      setReservations(await reservationsApi.list());
      const data = await reservationsApi.list();
      console.log(data);
      setReservations(data);
    } catch {
      notify('Erreur lors du chargement', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); /* eslint-disable-next-line */ }, []);

  async function handleStatusChange(id: number, statut: string) {
    setUpdatingId(id);
    try {
      await reservationsApi.update(id, { statut });
      setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, statut } : r)));
      notify('Statut mis à jour');
    } catch {
      notify('Erreur lors de la mise à jour', 'error');
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <PageHeader title="Réservations" description="Gérez les réservations des clients" />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? <LoadingSpinner /> : reservations.length === 0 ? (
          <EmptyState title="Aucune réservation trouvée" message="Les réservations apparaîtront ici" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Client</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Service</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Date</th>
                  <th className="px-5 py-3.5 font-semibold text-slate-600">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {reservations.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                          <User size={16} className="text-slate-500" />
                        </div>
                        <span className="font-medium text-slate-700">{r.client?.nom || '-'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {r.service ? (
                        <span className="inline-flex items-center gap-1.5 text-slate-600"><Wrench size={14} className="text-purple-400" />{r.service.nom}</span>
                      ) : '-'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-slate-500"><CalendarCheck size={14} className="text-slate-400" />{formatDate(r.date)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={r.statut}
                        onChange={(e) => handleStatusChange(r.id, e.target.value)}
                        disabled={updatingId === r.id}
                        className="cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 disabled:opacity-50"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 8px center',
                        }}
                      >
                        {RESERVATION_STATUSES.map((s: string) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
