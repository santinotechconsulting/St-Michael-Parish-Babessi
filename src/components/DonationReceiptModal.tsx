import React from 'react';
import { DonationTransaction } from '../types';
import { Cross, Printer, Download, CheckCircle2, X, ShieldCheck, Heart } from 'lucide-react';

interface DonationReceiptModalProps {
  transaction: DonationTransaction | null;
  onClose: () => void;
}

export const DonationReceiptModal: React.FC<DonationReceiptModalProps> = ({ transaction, onClose }) => {
  if (!transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const receiptContent = `
============================================================
       ST. MICHAEL CATHOLIC PARISH, BABESSI
           "Growing in Faith, United in Christ"
   Archdiocese of Bamenda · Ndop Deanery, Cameroon
============================================================

OFFICIAL DONATION RECEIPT: ${transaction.receiptNumber}
DATE / TIME: ${new Date(transaction.createdAt).toLocaleString()}
TRANSACTION REF: ${transaction.reference}
PAYMENT GATEWAY: ${transaction.gateway}
STATUS: CONFIRMED & RECORDED IN PARISH LEDGER

DONOR INFORMATION:
Donor Name: ${transaction.isAnonymous ? 'Anonymous Parishioner' : transaction.donorName}
Contact Email: ${transaction.donorEmail || 'N/A'}
Contact Phone: ${transaction.donorPhone}

CONTRIBUTION DETAILS:
Parish Project / Cause: ${transaction.projectTitle}
Donation Frequency: ${transaction.frequency.toUpperCase()}
Amount Donated: ${transaction.amountXAF.toLocaleString()} XAF (FCFA)
${transaction.intention ? `Dedication / Prayer Intention: ${transaction.intention}` : ''}

CANONICAL BLESSING & ACKNOWLEDGEMENT:
"May the Almighty God, through the powerful intercession of
Saint Michael the Archangel, reward your generous stewardship
and grant peace, health, and abundant grace to you and your family."

Parish Finance Council & Office Secretariat
St. Michael Catholic Church, Babessi, Cameroon
============================================================
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${transaction.receiptNumber}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header with Church Seal */}
        <div className="flex items-start justify-between border-b border-[#E7DFD5] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#7A1C28] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#9A2D3B]/40 shadow-sm">
              <Cross className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Payment Confirmed & Verified</span>
              </div>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#1E1E1E]">
                Official Donation Receipt
              </h2>
              <p className="text-[11px] text-[#7A7167]">
                St. Michael Catholic Parish · Babessi, Cameroon
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#6B635A] hover:text-[#1E1E1E] rounded-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Card */}
        <div className="bg-white border-2 border-[#E7DFD5] rounded-2xl p-6 space-y-4 shadow-sm relative overflow-hidden print:border-none print:shadow-none">
          
          {/* Subtle watermark seal */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
            <Cross className="w-40 h-40" />
          </div>

          <div className="flex justify-between items-baseline border-b border-[#F0EAE1] pb-3 text-xs">
            <div>
              <span className="text-[#8A7F73] block text-[10px] uppercase font-semibold">Receipt Number</span>
              <span className="font-mono font-bold text-sm text-[#7A1C28]">{transaction.receiptNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-[#8A7F73] block text-[10px] uppercase font-semibold">Date & Time</span>
              <span className="font-mono text-xs text-[#1E1E1E]">{new Date(transaction.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-[#3E3832]">
            <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
              <span className="text-[#7A7167]">Beneficiary:</span>
              <span className="font-medium text-[#1E1E1E]">St. Michael Parish Babessi</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
              <span className="text-[#7A7167]">Parish Project / Cause:</span>
              <span className="font-semibold text-[#1E1E1E] text-right max-w-[240px] truncate">{transaction.projectTitle}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
              <span className="text-[#7A7167]">Donor:</span>
              <span className="font-medium text-[#1E1E1E]">{transaction.isAnonymous ? 'Anonymous Parishioner' : transaction.donorName}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
              <span className="text-[#7A7167]">Payment Gateway:</span>
              <span className="font-medium text-[#1E1E1E]">{transaction.gateway}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
              <span className="text-[#7A7167]">Frequency:</span>
              <span className="font-semibold text-[#7A1C28] uppercase">{transaction.frequency}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
              <span className="text-[#7A7167]">Transaction Reference:</span>
              <span className="font-mono font-bold text-[#1E1E1E]">{transaction.reference}</span>
            </div>

            {transaction.intention && (
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E7DFD5] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#7A1C28] tracking-wider block">
                  Prayer Intention / Dedication:
                </span>
                <p className="font-lora italic text-xs text-[#443C34]">
                  "{transaction.intention}"
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-between items-center text-sm font-bold bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D7]">
              <span className="font-cinzel text-[#1E1E1E]">Total Amount Paid:</span>
              <span className="font-mono text-base text-[#7A1C28]">{transaction.amountXAF.toLocaleString()} XAF</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F0EAE1] text-[11px] text-[#7A7167] space-y-1">
            <p className="font-lora italic text-center text-[#554D44]">
              "May the Lord reward your generous offering and pour His heavenly blessings upon you and your loved ones."
            </p>
            <p className="text-[10px] text-center text-[#9E9386]">
              Parish Finance Committee · St. Michael Church, Babessi
            </p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E7DFD5] hover:bg-[#F2ECE3] text-[#3E3832] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-[#7A1C28]" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E7DFD5] hover:bg-[#F2ECE3] text-[#3E3832] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-[#7A1C28]" />
              <span>Download (.txt)</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
