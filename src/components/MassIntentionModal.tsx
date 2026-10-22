import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { X, Cross, Calendar, Clock, User, Phone, Mail, FileText } from 'lucide-react';

interface MassIntentionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MassIntentionModal: React.FC<MassIntentionModalProps> = ({ isOpen, onClose }) => {
  const { submitMassIntention } = useParish();

  const [formData, setFormData] = useState({
    requesterName: '',
    phone: '',
    email: '',
    intentionType: 'Thanksgiving' as const,
    intentionFor: '',
    preferredDate: '',
    preferredMassTime: '07:00 AM Sunday Mass',
    stipendNote: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.requesterName.trim() || !formData.intentionFor.trim() || !formData.phone.trim()) {
      alert('Please fill in your name, contact phone, and intention particulars.');
      return;
    }

    submitMassIntention({
      requesterName: formData.requesterName,
      phone: formData.phone,
      email: formData.email,
      intentionType: formData.intentionType,
      intentionFor: formData.intentionFor,
      preferredDate: formData.preferredDate || new Date().toISOString().split('T')[0],
      preferredMassTime: formData.preferredMassTime,
      stipendNote: formData.stipendNote
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#7A1C28] text-white p-6 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#5F121C] flex items-center justify-center text-[#D4AF37]">
              <Cross className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h2 className="font-cinzel text-xl font-bold">Request a Holy Mass Intention</h2>
              <p className="text-xs text-[#EAE2D7]">St. Michael Parish, Babessi</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm text-[#2E2925]">
          <p className="text-xs text-[#6B635A] leading-relaxed bg-[#F3ECE1] p-3 rounded-lg border border-[#E3D8CA]">
            The Holy Sacrifice of the Mass may be offered in thanksgiving, for the living, for the healing of the sick, or for the eternal repose of departed souls. Please submit your request in advance.
          </p>

          <div>
            <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
              Intention Category *
            </label>
            <select
              value={formData.intentionType}
              onChange={(e) => setFormData({ ...formData, intentionType: e.target.value as any })}
              className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
            >
              <option value="Thanksgiving">Thanksgiving (Family, Work, Protection, Blessings)</option>
              <option value="Memorial / Repose of Soul">Memorial / Repose of Soul (Deceased loved ones)</option>
              <option value="Healing & Deliverance">Healing & Deliverance (Health, Safe delivery)</option>
              <option value="Special Intention">Special Intention (Guidance, Examinations, Peace)</option>
              <option value="Birthday / Anniversary">Birthday / Wedding Anniversary</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
              For Whom / Intention Details *
            </label>
            <textarea
              required
              rows={3}
              value={formData.intentionFor}
              onChange={(e) => setFormData({ ...formData, intentionFor: e.target.value })}
              placeholder="e.g. For the eternal repose of Mama Veronica, or in thanksgiving for God's blessings upon the Foncha family..."
              className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#7A1C28]" />
                <span>Preferred Date</span>
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#7A1C28]" />
                <span>Preferred Liturgy</span>
              </label>
              <select
                value={formData.preferredMassTime}
                onChange={(e) => setFormData({ ...formData, preferredMassTime: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
              >
                <option value="07:00 AM Sunday Early Mass">07:00 AM Sunday Early Mass</option>
                <option value="09:30 AM Sunday Principal Mass">09:30 AM Sunday Principal Mass</option>
                <option value="06:30 AM Weekday Morning Mass">06:30 AM Weekday Morning Mass</option>
                <option value="Next Available Liturgy">Next Available Liturgy</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#7A1C28]" />
                <span>Your Full Name *</span>
              </label>
              <input
                type="text"
                required
                value={formData.requesterName}
                onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                placeholder="e.g. Marie Bih"
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#7A1C28]" />
                <span>Phone Number *</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +237 6XX XXX XXX"
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#7A1C28]" />
              <span>Email Address (Optional)</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. marie@example.com"
              className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#7A1C28]" />
              <span>Mass Stipend Note (Optional)</span>
            </label>
            <input
              type="text"
              value={formData.stipendNote}
              onChange={(e) => setFormData({ ...formData, stipendNote: e.target.value })}
              placeholder="e.g. Stipend will be submitted at parish office or sent via Mobile Money"
              className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
            />
            <p className="text-[11px] text-[#786E64] mt-1">
              * Note: Mass stipends in Cameroon are voluntary offerings towards clergy sustenance in accordance with Diocesan norms.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E2D9CE]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#5E554C] hover:bg-[#EAE2D7] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-sm transition-colors cursor-pointer"
            >
              Submit Mass Intention
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
