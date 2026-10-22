import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { MinistryGroup } from '../types';
import { X, Users, User, Phone, Mail, MessageSquare } from 'lucide-react';

interface MinistryJoinModalProps {
  ministry: MinistryGroup | null;
  onClose: () => void;
}

export const MinistryJoinModal: React.FC<MinistryJoinModalProps> = ({ ministry, onClose }) => {
  const { submitContactMessage } = useParish();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: '',
    quarter: ''
  });

  if (!ministry) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    submitContactMessage({
      name: formData.name,
      email: formData.email || 'parishioner@stmichael.cm',
      phone: formData.phone,
      subject: `Ministry Enrollment Inquiry: ${ministry.name}`,
      message: `Quarter/Location: ${formData.quarter || 'Babessi'}. Information: ${formData.experience || 'Interested in joining and actively participating in this ministry.'}`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#7A1C28] text-white p-6 relative">
          <div className="pr-8">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D4AF37] block">
              Ministry & Apostolate
            </span>
            <h2 className="font-cinzel text-lg sm:text-xl font-bold mt-0.5">
              Join {ministry.name}
            </h2>
            <p className="text-xs text-[#EAE2D7] mt-1">
              Meetings: {ministry.meetingSchedule}
            </p>
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
          <div className="bg-[#F3ECE1] p-3 rounded-lg border border-[#E3D8CA] text-xs text-[#5C534A] leading-relaxed">
            <p className="font-semibold text-[#2E2925] mb-1">Membership Information:</p>
            <p>{ministry.membershipInfo}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#7A1C28]" />
              <span>Your Full Name *</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sister Grace Lum"
              className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#7A1C28]" />
                <span>Phone / WhatsApp *</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+237 6XX XXX XXX"
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#7A1C28]" />
                <span>Quarter / Small Christian Comm.</span>
              </label>
              <input
                type="text"
                value={formData.quarter}
                onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
                placeholder="e.g. Mission Quarter, Mbikeng"
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
              placeholder="e.g. grace@example.com"
              className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#7A1C28]" />
              <span>Any previous experience or questions? (Optional)</span>
            </label>
            <textarea
              rows={2}
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g. Sung in student choir, received confirmation in 2022, eager to assist..."
              className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
            />
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
              Submit Membership Inquiry
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
