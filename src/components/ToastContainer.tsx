import React from 'react';
import { useParish } from '../context/ParishContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useParish();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border text-sm transition-all duration-200 animate-in slide-in-from-bottom-2 ${
            toast.type === 'success'
              ? 'bg-[#1C2E24] text-[#E0F2E9] border-[#2E5943]'
              : toast.type === 'error'
              ? 'bg-[#3A1418] text-[#FDE8E9] border-[#69242C]'
              : 'bg-[#1F242C] text-[#E5ECF6] border-[#394556]'
          }`}
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}
          
          <div className="flex-1 font-medium">{toast.message}</div>
          
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
