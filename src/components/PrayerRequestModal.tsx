import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { X, Sparkles, Lock, User, Phone } from 'lucide-react';

interface PrayerRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerRequestModal: React.FC<PrayerRequestModalProps> = ({ isOpen, onClose }) => {
  const { submitPrayerRequest } = useParish();

  const [formData, setFormData] = useState({
    requesterName: '',
    phone: '',
    requestText: '',
    isConfidential: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.requestText.trim()) {
      alert('Please enter your prayer petition.');
      return;
    }

    submitPrayerRequest({
      requesterName: formData.requesterName.trim() || 'Anonymous Parishioner',
      phone: formData.phone,
      requestText: formData.requestText,
      isConfidential: formData.isConfidential
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#1C242C] text-white p-6 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#2A3440] flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h2 className="font-cinzel text-xl font-bold">Submit a Prayer Request</h2>
              <p className="text-xs text-[#C6D2E1]">St. Michael Parish Intercessory Ministry</p>
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
            "Pray without ceasing. In all circumstances give thanks, for this is the will of God for you in Christ Jesus." (1 Thessalonians 5:17-18). Your intentions will be remembered at Eucharistic Adoration.
          </p>

          <div>
            <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
              Your Prayer Petition *
            </label>
            <textarea
              required
              rows={4}
              value={formData.requestText}
              onChange={(e) => setFormData({ ...formData, requestText: e.target.value })}
              placeholder="Share what is in your heart — prayers for sick relatives, peace in our community, children's guidance, personal spiritual strength..."
              className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#7A1C28]" />
                <span>Your Name (or leave blank for Anonymous)</span>
              </label>
              <input
                type="text"
                value={formData.requesterName}
                onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                placeholder="Anonymous"
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#7A1C28]" />
                <span>Phone (Optional)</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+237 6XX XXX XXX"
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
              />
            </div>
          </div>

          <div className="p-3 bg-[#EFE9DF] rounded-lg flex items-start gap-3">
            <input
              type="checkbox"
              id="confidential"
              checked={formData.isConfidential}
              onChange={(e) => setFormData({ ...formData, isConfidential: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-[#C4B7A6] text-[#7A1C28] focus:ring-[#7A1C28]"
            />
            <label htmlFor="confidential" className="text-xs text-[#4A423A] cursor-pointer">
              <span className="font-semibold block flex items-center gap-1 text-[#2E2823]">
                <Lock className="w-3.5 h-3.5 text-[#7A1C28]" />
                Keep Confidential (Clergy & Prayer Leader Only)
              </span>
              Uncheck if you would like this intention included in the general parish prayer intentions during Sunday prayers of the faithful.
            </label>
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
              className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#1C242C] hover:bg-[#2F3B47] text-white shadow-sm transition-colors cursor-pointer"
            >
              Submit Prayer Request
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
