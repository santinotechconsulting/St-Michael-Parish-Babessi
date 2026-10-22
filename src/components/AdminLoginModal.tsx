import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { X, Lock, ShieldCheck, KeyRound, UserCheck, ChevronRight } from 'lucide-react';
import { AdminRole } from '../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginAdmin, adminUsers } = useParish();
  const [selectedEmail, setSelectedEmail] = useState<string>('priest@stmichaelbabessi.org');
  const [password, setPassword] = useState('stmichael');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const success = loginAdmin(password, selectedEmail);
    if (success) {
      setPassword('');
      onClose();
      onSuccess();
    } else {
      setErrorMsg('Incorrect administrative passcode or email credentials.');
    }
  };

  const handleQuickLoginAs = (email: string, pass: string) => {
    const success = loginAdmin(pass, email);
    if (success) {
      onClose();
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#1C1617] text-white p-6 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7A1C28] flex items-center justify-center text-[#D4AF37] border border-[#9A2D3B]/40">
              <Lock className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                  Role-Based Administration
                </span>
              </div>
              <h2 className="font-cinzel text-lg font-bold">Parish CMS Login</h2>
              <p className="text-xs text-[#C5BDB2]">St. Michael Parish, Babessi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 text-sm text-[#2E2925]">
          
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider">
              1. Select Administrative Account / Role *
            </label>
            <select
              value={selectedEmail}
              onChange={(e) => {
                setSelectedEmail(e.target.value);
                setPassword('stmichael');
              }}
              className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs font-medium"
            >
              {adminUsers.map((u) => (
                <option key={u.id} value={u.email}>
                  {u.name} — {u.role} ({u.title})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#7A1C28]" />
              <span>2. Enter Passcode *</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg('');
              }}
              placeholder="Enter passcode (e.g. stmichael)"
              className="w-full px-3 py-2.5 bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm font-mono"
            />
          </div>

          {/* Quick Demo Role Switcher for instant access */}
          <div className="bg-[#F0EBE1] p-3 rounded-2xl border border-[#DDD3C4] space-y-2">
            <span className="text-[11px] font-bold text-[#1C1617] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7A1C28]" />
              <span>Quick Login by Role (For Demonstration)</span>
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickLoginAs('priest@stmichaelbabessi.org', 'stmichael')}
                className="p-2 bg-white rounded-xl border border-[#DDD3C4] text-left hover:border-[#7A1C28] transition-all cursor-pointer"
              >
                <span className="font-bold block text-[#1E1E1E]">Parish Priest</span>
                <span className="text-[10px] text-purple-700 font-semibold">SUPER_ADMIN</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLoginAs('finance@stmichaelbabessi.org', 'stmichael')}
                className="p-2 bg-white rounded-xl border border-[#DDD3C4] text-left hover:border-[#7A1C28] transition-all cursor-pointer"
              >
                <span className="font-bold block text-[#1E1E1E]">Finance Officer</span>
                <span className="text-[10px] text-emerald-700 font-semibold">FINANCE_OFFICER</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLoginAs('secretary@stmichaelbabessi.org', 'stmichael')}
                className="p-2 bg-white rounded-xl border border-[#DDD3C4] text-left hover:border-[#7A1C28] transition-all cursor-pointer"
              >
                <span className="font-bold block text-[#1E1E1E]">Parish Secretary</span>
                <span className="text-[10px] text-blue-700 font-semibold">CONTENT_EDITOR</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLoginAs('liturgy@stmichaelbabessi.org', 'stmichael')}
                className="p-2 bg-white rounded-xl border border-[#DDD3C4] text-left hover:border-[#7A1C28] transition-all cursor-pointer"
              >
                <span className="font-bold block text-[#1E1E1E]">Chief Catechist</span>
                <span className="text-[10px] text-amber-700 font-semibold">LITURGY_COORDINATOR</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="text-xs text-rose-700 font-medium bg-rose-50 border border-rose-200 p-2.5 rounded-xl">
              {errorMsg}
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E2D9CE]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#5E554C] hover:bg-[#EAE2D7] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Sign In to Dashboard</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
