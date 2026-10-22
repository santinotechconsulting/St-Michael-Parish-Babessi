import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Send,
  Cross,
  Sparkles,
  Heart,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

interface ContactViewProps {
  onOpenIntentionModal: () => void;
  onOpenPrayerModal: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onOpenIntentionModal,
  onOpenPrayerModal
}) => {
  const { parishInfo, submitContactMessage } = useParish();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      alert('Please fill in your name and message.');
      return;
    }

    submitContactMessage({
      name: form.name,
      email: form.email || 'parishioner@stmichael.cm',
      phone: form.phone,
      subject: form.subject || 'General Inquiry',
      message: form.message
    });

    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
          <Mail className="w-4 h-4" />
          <span>Pastoral Office & Inquiries</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
          Contact St. Michael Parish
        </h1>
        <p className="text-sm sm:text-base text-[#615950] font-lora italic">
          "Come to me, all who labor and are heavy laden, and I will give you rest." (Matthew 11:28)
        </p>
      </div>

      {/* Quick Action Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <button
          onClick={onOpenIntentionModal}
          className="p-4 bg-white border border-[#E7DFD5] rounded-2xl hover:border-[#7A1C28] hover:shadow-sm transition-all text-left flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center shrink-0">
            <Cross className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="font-cinzel text-sm font-bold text-[#1E1E1E]">Book a Mass Intention</h4>
            <p className="text-xs text-[#6B635A]">For thanksgiving, healing, or deceased</p>
          </div>
        </button>

        <button
          onClick={onOpenPrayerModal}
          className="p-4 bg-white border border-[#E7DFD5] rounded-2xl hover:border-[#7A1C28] hover:shadow-sm transition-all text-left flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#997A16] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-cinzel text-sm font-bold text-[#1E1E1E]">Submit Prayer Petition</h4>
            <p className="text-xs text-[#6B635A]">Remembered during Eucharistic Adoration</p>
          </div>
        </button>
      </div>

      {/* Main Grid: Details & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Office Information (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#DDD3C4] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
              Parish Secretariat
            </span>
            <h3 className="font-cinzel text-xl font-bold text-[#1E1E1E]">
              Visit or Reach the Office
            </h3>
            <p className="text-xs text-[#6B635A]">
              We welcome your questions regarding Sacraments, catechism enrollment, or pastoral appointments.
            </p>
          </div>

          <div className="space-y-4 text-xs text-[#443C34]">
            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#E7DFD5]">
              <MapPin className="w-5 h-5 text-[#7A1C28] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm text-[#1E1E1E] font-cinzel mb-0.5">Parish Compound</strong>
                <p className="text-[#6B635A] leading-relaxed">{parishInfo.addressPlaceholder}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#E7DFD5]">
              <Clock className="w-5 h-5 text-[#7A1C28] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm text-[#1E1E1E] font-cinzel mb-0.5">Office Hours</strong>
                <p className="text-[#6B635A] leading-relaxed">{parishInfo.officeHours}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#E7DFD5]">
              <Phone className="w-5 h-5 text-[#7A1C28] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm text-[#1E1E1E] font-cinzel mb-0.5">Parish Telephone</strong>
                <p className="text-[#6B635A] italic">{parishInfo.phonePlaceholder}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#E7DFD5]">
              <Mail className="w-5 h-5 text-[#7A1C28] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm text-[#1E1E1E] font-cinzel mb-0.5">Official Email</strong>
                <p className="text-[#6B635A]">{parishInfo.emailPlaceholder}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#EFE9DF] p-4 rounded-2xl border border-[#DDD3C4] text-[11px] text-[#63594F] space-y-1">
            <p className="font-semibold text-[#1E1E1E]">Priestly Emergency (Viaticum / Sick Calls):</p>
            <p>
              For emergency administration of the Sacrament of the Anointing of the Sick or Viaticum at home or health center, please alert the parish office or church wardens immediately at any hour.
            </p>
          </div>
        </div>

        {/* Right: Interactive Message Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
              Message the Parish Office
            </span>
            <h3 className="font-cinzel text-xl font-bold text-[#1E1E1E]">
              Send Us a Pastoral Message
            </h3>
            <p className="text-xs text-[#6B635A]">
              Inquiries will be attended to by the parish secretariat and priest during official office hours.
            </p>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you. Your message has been safely received. The parish office will get back to you promptly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-sm text-[#2E2822]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Martha Nsom"
                  className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+237 6XX XXX XXX"
                  className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. martha@example.com"
                  className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Baptism inquiry, Catechism, Marriage counseling"
                  className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                Your Message *
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Write your inquiry or message here..."
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Secretariat</span>
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};
