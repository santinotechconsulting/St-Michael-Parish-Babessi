import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { ParishEvent } from '../types';
import { X, Calendar, MapPin, User, Phone, Mail, Users } from 'lucide-react';

interface EventRegisterModalProps {
  event: ParishEvent | null;
  onClose: () => void;
}

export const EventRegisterModal: React.FC<EventRegisterModalProps> = ({ event, onClose }) => {
  const { registerForEvent } = useParish();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    numberOfPeople: 1,
    notes: ''
  });

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    registerForEvent({
      eventId: event.id,
      eventTitle: event.title,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      numberOfPeople: Number(formData.numberOfPeople) || 1,
      notes: formData.notes
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
              Event Registration
            </span>
            <h2 className="font-cinzel text-lg sm:text-xl font-bold mt-0.5 line-clamp-2">
              {event.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#EAE2D7] mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                {event.date} ({event.startTime})
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                {event.venue}
              </span>
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
          <p className="text-xs text-[#6B635A] leading-relaxed">
            Please register so the organizing committee can properly prepare materials, seating, and liturgical order for this parish gathering.
          </p>

          <div>
            <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#7A1C28]" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. John Fru"
              className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                placeholder="+237 6XX XXX XXX"
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#7A1C28]" />
                <span>Number of Attendees</span>
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.numberOfPeople}
                onChange={(e) => setFormData({ ...formData, numberOfPeople: parseInt(e.target.value) || 1 })}
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
              placeholder="e.g. john@example.com"
              className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
              Special Notes / Needs (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Coming with family, choir member, elder needing accessible seating..."
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
              Confirm Registration
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
