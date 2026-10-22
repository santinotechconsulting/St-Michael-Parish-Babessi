import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { SupportProject, PaymentGateway, DonationFrequency, DonationTransaction } from '../types';
import {
  X,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Lock,
  Heart,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Loader2,
  Building
} from 'lucide-react';

interface DonationPaymentModalProps {
  isOpen: boolean;
  project: SupportProject | null;
  onClose: () => void;
  onSuccess: (transaction: DonationTransaction) => void;
}

export const DonationPaymentModal: React.FC<DonationPaymentModalProps> = ({
  isOpen,
  project,
  onClose,
  onSuccess
}) => {
  const { projects, processDonation } = useParish();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(project?.id || projects[0]?.id || 'gen-support');
  const [gateway, setGateway] = useState<PaymentGateway>('MTN Mobile Money');
  const [frequency, setFrequency] = useState<DonationFrequency>('one-time');
  const [amountXAF, setAmountXAF] = useState<string>('10000');
  
  // Donor particulars
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [intention, setIntention] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Gateway specific states
  const [momoNumber, setMomoNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');

  if (!isOpen) return null;

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleQuickAmount = (val: string) => {
    setAmountXAF(val);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardExpiry = (val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    if (clean.length <= 2) {
      setCardExpiry(clean);
    } else {
      setCardExpiry(`${clean.slice(0, 2)}/${clean.slice(2, 4)}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = Number(amountXAF);
    if (isNaN(numericAmount) || numericAmount < 500) {
      alert('Please enter a valid donation amount (minimum 500 XAF).');
      return;
    }

    if (!donorPhone.trim()) {
      alert('Please provide your phone number for transaction confirmation.');
      return;
    }

    if (gateway === 'MTN Mobile Money' || gateway === 'Orange Money') {
      const pNum = momoNumber || donorPhone;
      if (!pNum.trim()) {
        alert('Please enter your Mobile Money telephone number.');
        return;
      }
    }

    if (gateway === 'Stripe (Cards)') {
      if (cardNumber.replace(/\s/g, '').length < 15 || !cardExpiry || !cardCvc) {
        alert('Please complete valid card details (16 digits, MM/YY, and CVC).');
        return;
      }
    }

    if (gateway === 'PayPal') {
      if (!paypalEmail.includes('@')) {
        alert('Please enter a valid PayPal account email address.');
        return;
      }
    }

    // Begin Simulated Secure Processing
    setIsProcessing(true);

    try {
      if (gateway === 'MTN Mobile Money') {
        setProcessingStep('Sending MoMo USSD prompt to your mobile handset (*126#)...');
        await new Promise((r) => setTimeout(r, 1400));
        setProcessingStep('Verifying Mobile Money transaction reference...');
        await new Promise((r) => setTimeout(r, 1200));
      } else if (gateway === 'Orange Money') {
        setProcessingStep('Initiating Orange Money WebPay push notification (#150*50#)...');
        await new Promise((r) => setTimeout(r, 1400));
        setProcessingStep('Validating subscriber approval code...');
        await new Promise((r) => setTimeout(r, 1200));
      } else if (gateway === 'Stripe (Cards)') {
        setProcessingStep('Contacting Stripe Payment Gateway via TLS 1.3 encryption...');
        await new Promise((r) => setTimeout(r, 1200));
        setProcessingStep('Authenticating 3D Secure bank OTP check...');
        await new Promise((r) => setTimeout(r, 1200));
      } else {
        setProcessingStep('Connecting to PayPal Express Checkout...');
        await new Promise((r) => setTimeout(r, 1400));
      }

      setProcessingStep('Recording contribution into St. Michael Parish ledger...');
      await new Promise((r) => setTimeout(r, 900));

      const transaction = await processDonation({
        projectId: currentProject?.id || 'gen-support',
        projectTitle: currentProject?.title || 'General Parish Stewardship',
        donorName: isAnonymous ? 'Anonymous Parishioner' : (donorName.trim() || 'Parishioner'),
        donorEmail: donorEmail.trim(),
        donorPhone: donorPhone.trim(),
        amountXAF: numericAmount,
        frequency,
        gateway,
        intention: intention.trim(),
        isAnonymous,
        paymentDetails: {
          phoneNumber: momoNumber || donorPhone,
          cardLast4: cardNumber ? cardNumber.slice(-4) : undefined,
          cardBrand: cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
          paypalEmail: paypalEmail || donorEmail
        }
      });

      setIsProcessing(false);
      onClose();
      onSuccess(transaction);

    } catch (err) {
      setIsProcessing(false);
      alert('An error occurred while processing transaction. Please retry.');
    }
  };

  const estUSD = Math.round(Number(amountXAF) / 610) || 0;
  const estEUR = Math.round(Number(amountXAF) / 655) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl">
        
        {/* Modal Header */}
        <div className="bg-[#7A1C28] text-white p-6 relative">
          <div className="pr-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5D141E] flex items-center justify-center text-[#D4AF37] shrink-0 border border-[#9A2D3B]/40">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                  Secure Online Giving Gateway
                </span>
                <span className="text-white/40">·</span>
                <span className="text-[10px] text-white/80 bg-white/10 px-1.5 py-0.5 rounded">256-Bit SSL</span>
              </div>
              <h2 className="font-cinzel text-xl font-bold">
                Support St. Michael Parish
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-1 rounded-md transition-colors cursor-pointer disabled:opacity-40"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {isProcessing ? (
          <div className="p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#7A1C28]/10 text-[#7A1C28] mx-auto flex items-center justify-center animate-spin">
              <Loader2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-cinzel text-xl font-bold text-[#1E1E1E]">Processing Your Donation...</h3>
              <p className="text-sm text-[#7A1C28] font-medium animate-pulse">{processingStep}</p>
              <p className="text-xs text-[#8A7F73]">Please do not refresh this page while communicating with the payment gateway.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-xs text-[#2E2822]">
            
            {/* Step 1: Select Parish Project / Cause */}
            <div className="space-y-1.5">
              <label className="block font-semibold uppercase tracking-wider text-[#4A423A]">
                1. Select Parish Project or Fund *
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs focus:ring-2 focus:ring-[#7A1C28]"
              >
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.title} ({proj.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Frequency (One-Time vs Recurring) */}
            <div className="space-y-1.5">
              <label className="block font-semibold uppercase tracking-wider text-[#4A423A]">
                2. Donation Schedule *
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: 'one-time', label: 'One-Time' },
                  { key: 'monthly', label: 'Monthly' },
                  { key: 'quarterly', label: 'Quarterly' },
                  { key: 'annual', label: 'Annual' },
                ].map((freq) => (
                  <button
                    key={freq.key}
                    type="button"
                    onClick={() => setFrequency(freq.key as DonationFrequency)}
                    className={`py-2 px-1 text-center rounded-xl font-semibold border transition-all cursor-pointer ${
                      frequency === freq.key
                        ? 'bg-[#7A1C28] text-white border-[#7A1C28] shadow-sm'
                        : 'bg-white text-[#52493F] border-[#E7DFD5] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {freq.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Amount in XAF */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="font-semibold uppercase tracking-wider text-[#4A423A]">
                  3. Contribution Amount (XAF / FCFA) *
                </label>
                <span className="text-[11px] text-[#7A7167]">
                  ≈ ${estUSD} USD / €{estEUR} EUR
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {['5000', '10000', '25000', '50000', '100000'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleQuickAmount(amt)}
                    className={`py-2 text-center rounded-xl font-mono font-semibold border transition-all cursor-pointer ${
                      amountXAF === amt
                        ? 'bg-[#7A1C28] text-white border-[#7A1C28]'
                        : 'bg-white text-[#52493F] border-[#E7DFD5] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {Number(amt).toLocaleString()}
                  </button>
                ))}
              </div>

              <input
                type="number"
                min="500"
                required
                value={amountXAF}
                onChange={(e) => setAmountXAF(e.target.value)}
                placeholder="Or enter custom amount in XAF"
                className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl font-mono text-sm focus:ring-2 focus:ring-[#7A1C28]"
              />
            </div>

            {/* Step 4: Payment Gateway Choice */}
            <div className="space-y-2">
              <label className="block font-semibold uppercase tracking-wider text-[#4A423A]">
                4. Select Secure Payment Gateway *
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* MTN MoMo */}
                <button
                  type="button"
                  onClick={() => setGateway('MTN Mobile Money')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    gateway === 'MTN Mobile Money'
                      ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20 text-[#1E1E1E]'
                      : 'bg-white border-[#E7DFD5] text-[#554D44] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-amber-500" />
                  <span className="font-bold text-[11px] leading-tight">MTN MoMo</span>
                  <span className="text-[9px] text-[#7A7167]">Cameroon</span>
                </button>

                {/* Orange Money */}
                <button
                  type="button"
                  onClick={() => setGateway('Orange Money')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    gateway === 'Orange Money'
                      ? 'bg-orange-500/10 border-orange-500 ring-2 ring-orange-500/20 text-[#1E1E1E]'
                      : 'bg-white border-[#E7DFD5] text-[#554D44] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-orange-600" />
                  <span className="font-bold text-[11px] leading-tight">Orange Money</span>
                  <span className="text-[9px] text-[#7A7167]">Cameroon</span>
                </button>

                {/* Stripe Cards */}
                <button
                  type="button"
                  onClick={() => setGateway('Stripe (Cards)')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    gateway === 'Stripe (Cards)'
                      ? 'bg-[#7A1C28]/10 border-[#7A1C28] ring-2 ring-[#7A1C28]/20 text-[#1E1E1E]'
                      : 'bg-white border-[#E7DFD5] text-[#554D44] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#7A1C28]" />
                  <span className="font-bold text-[11px] leading-tight">Cards (Stripe)</span>
                  <span className="text-[9px] text-[#7A7167]">Visa/Mastercard</span>
                </button>

                {/* PayPal */}
                <button
                  type="button"
                  onClick={() => setGateway('PayPal')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    gateway === 'PayPal'
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-[#1E1E1E]'
                      : 'bg-white border-[#E7DFD5] text-[#554D44] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Building className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-[11px] leading-tight">PayPal</span>
                  <span className="text-[9px] text-[#7A7167]">International</span>
                </button>
              </div>
            </div>

            {/* Dynamic Gateway Specific Form */}
            <div className="bg-[#F4EFE6] border border-[#DDD3C4] rounded-2xl p-4 space-y-3">
              
              {/* MTN or Orange MoMo fields */}
              {(gateway === 'MTN Mobile Money' || gateway === 'Orange Money') && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{gateway} Payment Details</span>
                    <span className="text-[#7A1C28]">Direct USSD Prompt</span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#695F53] mb-1">
                      Enter your {gateway.includes('MTN') ? 'MTN' : 'Orange'} Telephone Number (e.g. 67X / 69X)
                    </label>
                    <input
                      type="tel"
                      required
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value)}
                      placeholder="+237 6XX XXX XXX"
                      className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl font-mono text-xs"
                    />
                  </div>
                  <p className="text-[11px] text-[#786D61]">
                    * After clicking "Process Payment", you will receive a flash prompt on your mobile handset asking you to enter your MoMo PIN to authorize this donation.
                  </p>
                </div>
              )}

              {/* Stripe Credit/Debit Card Form */}
              {gateway === 'Stripe (Cards)' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Credit or Debit Card Details</span>
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>Encrypted by Stripe</span>
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#695F53] mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name on card"
                      className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#695F53] mb-1">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="4000 1234 5678 9010"
                      className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl font-mono text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#695F53] mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        maxLength={5}
                        required
                        value={cardExpiry}
                        onChange={(e) => handleCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#695F53] mb-1">CVC / CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal Form */}
              {gateway === 'PayPal' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>PayPal Account Login</span>
                    <span className="text-blue-700">Buyer Protection</span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#695F53] mb-1">PayPal Account Email</label>
                    <input
                      type="email"
                      required
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      placeholder="paypal.donor@example.com"
                      className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                    />
                  </div>
                  <p className="text-[11px] text-[#786D61]">
                    * You will be prompted to approve the transfer of {Number(amountXAF).toLocaleString()} XAF (approx. ${estUSD} USD) via PayPal.
                  </p>
                </div>
              )}

            </div>

            {/* Step 5: Donor Details & Confirmation Email */}
            <div className="space-y-3">
              <label className="block font-semibold uppercase tracking-wider text-[#4A423A]">
                5. Donor Contact & Receipt Information *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#695F53] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Pa Thomas Ngu"
                    className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#695F53] mb-1">Phone Number (Required) *</label>
                  <input
                    type="tel"
                    required
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="+237 6XX XXX XXX"
                    className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#695F53] mb-1">Email Address (For electronic receipt)</label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="donor@example.com"
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#695F53] mb-1">Dedication / Prayer Intention (Optional)</label>
                <input
                  type="text"
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  placeholder="e.g. Thanksgiving for peace in Babessi, or in memory of Papa..."
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#4A423A]">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-[#C4B7A6] text-[#7A1C28]"
                  />
                  <span>Make my donation anonymous on public parish benefactor acknowledgements</span>
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E7DFD5] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#6B635A] text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Parish Account</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs text-[#52493F] hover:bg-[#EAE2D7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-lg shadow-[#7A1C28]/25 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>
                    Pay {Number(amountXAF).toLocaleString()} XAF ({frequency})
                  </span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
