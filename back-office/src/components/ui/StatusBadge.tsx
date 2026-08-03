interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  'En stock': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Rupture de stock': { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  'Précommande': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  'En attente': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  'Confirmée': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Terminée': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Annulée': { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}

export const AVAILABILITY_OPTIONS = ['En stock', 'Rupture de stock'];
export const RESERVATION_STATUSES = ['en_attente', 'confirmee', 'terminee', 'annulee'];
