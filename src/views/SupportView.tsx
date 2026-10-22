import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { SupportProject, DonationTransaction } from '../types';
import {
  Heart,
  Smartphone,
  CreditCard,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  User,
  Phone,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  Repeat
} from 'lucide-react';

interface SupportViewProps {
  onOpenPaymentModal: (project?: SupportProject) => void;
}

export const SupportView: React.FC<SupportViewProps> = ({ onOpenPaymentModal }) => {
  const { parishInfo, projects, pledgeDonation } = useParish();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  
  const [pledgeForm, setPledgeForm] = useState({
    donorName: '',
    phone: '',
    email: '',
    amountXAF: '10000',
    paymentMethod: 'MTN Mobile Money' as const,
    intention: ''
  });

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeForm.donorName.trim() || !pledgeForm.phone.trim() || !pledgeForm.amountXAF) {
      alert('Please fill in your name, contact phone, and pledge amount.');
      return;
    }

    const amount = Number(pledgeForm.amountXAF);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    pledgeDonation({
      projectId: selectedProject ? selectedProject.id : 'gen-support',
      projectTitle: selectedProject ? selectedProject.title : 'General Parish Support',
      donorName: pledgeForm.donorName,
      phone: pledgeForm.phone,
      email: pledgeForm.email,
      amountXAF: amount,
      paymentMethod: pledgeForm.paymentMethod,
      intention: pledgeForm.intention
    });

    setPledgeForm({
      donorName: '',
      phone: '',
      email: '',
      amountXAF: '10000',
      paymentMethod: 'MTN Mobile Money',
      intention: ''
    });
  };

  const formatXAF = (val: number) => {
    return new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
          <Heart className="w-4 h-4 text-[#7A1C28]" />
          <span>Christian Stewardship & Development</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
          Support St. Michael Parish
        </h1>
        <p className="text-sm sm:text-base text-[#615950] font-lora italic">
          "Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver." (2 Corinthians 9:7)
        </p>
      </div>

      {/* Online Payment Gateway Callout Banner */}
      <div className="bg-gradient-to-br from-[#1C1617] to-[#2B1B1E] text-white rounded-3xl p-8 sm:p-10 border border-[#3A2D30] shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D4AF37] bg-white/10 px-2.5 py-0.5 rounded">
                Secure Online Gateway
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>One-Time & Recurring Giving Supported</span>
              </span>
            </div>

            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-tight">
              Instant Online Giving with Electronic Receipt
            </h2>

            <p className="text-xs sm:text-sm text-[#D8CFBF] leading-relaxed">
              Make a secure offering directly to St. Michael Parish projects using <strong>MTN Mobile Money</strong>, <strong>Orange Money</strong>, <strong>Debit/Credit Cards (Stripe)</strong>, or <strong>PayPal</strong>. Set up a one-time gift or recurring monthly commitment for parish maintenance.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#C5BDB2] pt-2">
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>MTN MoMo (*126#)</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-orange-400" />
                <span>Orange Money (#150*50#)</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                <span>Stripe (Visa/Mastercard)</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Repeat className="w-4 h-4 text-blue-400" />
                <span>Monthly Recurring</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-3">
            <button
              onClick={() => onOpenPaymentModal(selectedProject)}
              className="px-8 py-4 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-xl shadow-[#7A1C28]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              <span>Give Online Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-[#A89F93] text-center">
              Instant verifiable PDF / print confirmation
            </span>
          </div>
        </div>
      </div>

      {/* Stewardship Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center mx-auto">
            <Landmark className="w-5 h-5" />
          </div>
          <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">Parish Infrastructure</h3>
          <p className="text-xs text-[#5C554E] leading-relaxed">
            Preserving and building the sanctuary, hall, and mission stations for future generations.
          </p>
        </div>

        <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#997A16] flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">Liturgical & Pastoral Life</h3>
          <p className="text-xs text-[#5C554E] leading-relaxed">
            Supporting sacred vessels, catechist formation, youth camps, and liturgical vestments.
          </p>
        </div>

        <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 space-y-2 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center mx-auto">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">Charity & Needy Families</h3>
          <p className="text-xs text-[#5C554E] leading-relaxed">
            Reaching out to orphans, elderly, widows, and vulnerable community members in Babessi.
          </p>
        </div>
      </div>

      {/* Development Projects & Progress Bars */}
      <div className="space-y-6">
        <div className="border-b border-[#E7DFD5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-cinzel text-2xl font-bold text-[#1E1E1E]">
              Active Parish Development Projects
            </h2>
            <p className="text-xs text-[#7A7167]">
              Choose a project to support online or pledge an offering
            </p>
          </div>

          <button
            onClick={() => onOpenPaymentModal(selectedProject)}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] text-white hover:bg-[#63141F] transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-2"
          >
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Donate Online via Gateway</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => {
            const percentage = Math.min(100, Math.round((proj.raisedAmountXAF / proj.targetAmountXAF) * 100));
            const isSelected = selectedProjectId === proj.id;

            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`bg-white border rounded-3xl p-6 sm:p-8 space-y-4 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#7A1C28] ring-2 ring-[#7A1C28]/20 shadow-md'
                    : 'border-[#E7DFD5] shadow-sm hover:border-[#7A1C28]/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#7A1C28] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#EAE2D7]">
                      {proj.category}
                    </span>
                    {proj.deadline && (
                      <span className="text-[11px] text-[#7A7167]">
                        Target: {proj.deadline}
                      </span>
                    )}
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-[#1E1E1E]">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-[#52493F] leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#7A1C28] tabular-nums font-mono">
                        Raised: {formatXAF(proj.raisedAmountXAF)}
                      </span>
                      <span className="text-[#6B635A] tabular-nums font-mono">
                        Goal: {formatXAF(proj.targetAmountXAF)}
                      </span>
                    </div>

                    <div className="w-full h-3 bg-[#EAE2D7] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#7A1C28] to-[#D4AF37] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-[#8A7F73]">
                      <span className="font-medium text-[#7A1C28]">{percentage}% funded</span>
                      <span>Remaining: {formatXAF(Math.max(0, proj.targetAmountXAF - proj.raisedAmountXAF))}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between gap-3">
                  <span className={`text-xs font-semibold ${isSelected ? 'text-[#7A1C28]' : 'text-[#8A7F73]'}`}>
                    {isSelected ? '✓ Selected' : 'Click to select'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPaymentModal(proj);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span>Donate to this Project</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Payment Accounts & Online Pledge Form Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cameroon Mobile Money & Bank Wire Instructions (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#DDD3C4] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
              Parish Accounts
            </span>
            <h3 className="font-cinzel text-xl font-bold text-[#1E1E1E]">
              Payment Channels (Cameroon & Diaspora)
            </h3>
            <p className="text-xs text-[#6B635A]">
              Managed under the supervision of the Parish Finance Council.
            </p>
          </div>

          {/* MTN Mobile Money */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E1E1E]">
              <Smartphone className="w-4 h-4 text-amber-500" />
              <span>MTN Mobile Money (MoMo)</span>
            </div>
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/50 text-xs space-y-1">
              <p className="font-mono font-bold text-[#1E1E1E]">{parishInfo.momoMtn}</p>
              <p className="text-[11px] text-[#6B635A]">Account Name: {parishInfo.accountName}</p>
            </div>
          </div>

          {/* Orange Money */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E1E1E]">
              <Smartphone className="w-4 h-4 text-orange-600" />
              <span>Orange Money (OM)</span>
            </div>
            <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-200/50 text-xs space-y-1">
              <p className="font-mono font-bold text-[#1E1E1E]">{parishInfo.momoOrange}</p>
              <p className="text-[11px] text-[#6B635A]">Account Name: {parishInfo.accountName}</p>
            </div>
          </div>

          {/* Bank Wire Details */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E1E1E]">
              <Landmark className="w-4 h-4 text-[#7A1C28]" />
              <span>Bank Account (Diaspora / Wire Transfer)</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E7DFD5] text-xs space-y-1">
              <p className="font-mono text-[#1E1E1E]">{parishInfo.bankAccount}</p>
              <p className="text-[11px] text-[#6B635A]">Beneficiary: {parishInfo.accountName}</p>
              <p className="text-[11px] text-[#6B635A]">Branch: Bamenda / Ndop, Cameroon</p>
            </div>
          </div>

          <div className="text-[11px] text-[#82766A] space-y-1 border-t border-[#E7DFD5] pt-3">
            <p className="font-semibold text-[#1E1E1E]">Accountability & Transparency:</p>
            <p>
              Donations are audited quarterly by the Parish Finance Committee and read in the parish financial report to ensure complete transparency and fidelity to canonical norms.
            </p>
          </div>
        </div>

        {/* Right: Manual Stewardship Pledge Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
              Manual Pledge & Offertory Form
            </span>
            <h3 className="font-cinzel text-xl font-bold text-[#1E1E1E]">
              Pledge a Future Offering
            </h3>
            <p className="text-xs text-[#6B635A]">
              For parishioners wishing to register a pledge to be fulfilled at the parish office or during Sunday thanksgiving collection.
            </p>
          </div>

          <form onSubmit={handlePledgeSubmit} className="space-y-4 text-sm text-[#2E2822]">
            
            {/* Amount & Currency */}
            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#7A1C28]" />
                <span>Pledge Amount in FCFA / XAF *</span>
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {['5000', '10000', '25000', '50000'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setPledgeForm({ ...pledgeForm, amountXAF: amt })}
                    className={`py-2 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                      pledgeForm.amountXAF === amt
                        ? 'bg-[#7A1C28] text-white border-[#7A1C28]'
                        : 'bg-[#FAF7F2] text-[#3E3832] border-[#E7DFD5] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    {Number(amt).toLocaleString()} F
                  </button>
                ))}
              </div>
              <input
                type="number"
                required
                min="500"
                value={pledgeForm.amountXAF}
                onChange={(e) => setPledgeForm({ ...pledgeForm, amountXAF: e.target.value })}
                placeholder="Or enter custom amount in FCFA"
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm font-mono"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                Fulfillment Method *
              </label>
              <select
                value={pledgeForm.paymentMethod}
                onChange={(e) => setPledgeForm({ ...pledgeForm, paymentMethod: e.target.value as any })}
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
              >
                <option value="MTN Mobile Money">MTN Mobile Money</option>
                <option value="Orange Money">Orange Money</option>
                <option value="Bank Transfer">Bank Wire Transfer</option>
                <option value="Cash / Parish Office">Cash at Sunday Collection / Parish Office</option>
              </select>
            </div>

            {/* Donor particulars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#7A1C28]" />
                  <span>Your Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={pledgeForm.donorName}
                  onChange={(e) => setPledgeForm({ ...pledgeForm, donorName: e.target.value })}
                  placeholder="e.g. Papa Stephen Nkwenti"
                  className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
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
                  value={pledgeForm.phone}
                  onChange={(e) => setPledgeForm({ ...pledgeForm, phone: e.target.value })}
                  placeholder="+237 6XX XXX XXX"
                  className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
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
                value={pledgeForm.email}
                onChange={(e) => setPledgeForm({ ...pledgeForm, email: e.target.value })}
                placeholder="e.g. stephen@example.com"
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
              />
            </div>

            {/* Dedication or Intention */}
            <div>
              <label className="block text-xs font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                Pledge Dedication / Prayer Intention (Optional)
              </label>
              <textarea
                rows={2}
                value={pledgeForm.intention}
                onChange={(e) => setPledgeForm({ ...pledgeForm, intention: e.target.value })}
                placeholder="e.g. In loving memory of parents, or thanksgiving for safe child delivery..."
                className="w-full px-3 py-2 bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C28] text-sm"
              />
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onOpenPaymentModal(selectedProject)}
                className="text-xs font-semibold text-[#7A1C28] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Prefer to pay online right now?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#1E1E1E] hover:bg-black text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                <span>Register Pledge</span>
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};
