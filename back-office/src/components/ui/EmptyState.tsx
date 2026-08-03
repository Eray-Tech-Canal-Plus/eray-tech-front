import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message?: string;
}

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        <Inbox size={32} className="text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-700">{title}</h3>
      {message && <p className="mt-1 text-sm text-slate-500">{message}</p>}
    </div>
  );
}
