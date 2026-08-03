import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = 'Chargement...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Loader2 size={32} className="animate-spin text-blue-500" />
      <p className="mt-3 text-sm text-slate-500">{message}</p>
    </div>
  );
}
