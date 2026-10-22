import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { SacramentInfo } from '../types';
import { WeeklyLiturgyAndSaints } from '../components/WeeklyLiturgyAndSaints';
import {
  Cross,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Info,
  ChevronRight,
  BookOpen,
  FileCheck2,
  Phone,
  Check
} from 'lucide-react';

interface MassAndSacramentsViewProps {
  onOpenIntentionModal: () => void;
  onOpenContactOffice: () => void;
}

export const MassAndSacramentsView: React.FC<MassAndSacramentsViewProps> = ({
  onOpenIntentionModal,
  onOpenContactOffice
}) => {
  const { massSchedules, sacraments } = useParish();
  const [selectedSacrament, setSelectedSacrament] = useState<SacramentInfo | null>(sacraments[0]);
  const [activeTab, setActiveTab] = useState<'schedule' | 'sacraments' | 'readings-saints'>('schedule');

  const regularSchedules = massSchedules.filter((m) => !m.isSpecialSeason);
  const specialFeasts = massSchedules.filter((m) => m.isSpecialSeason);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
          <Cross className="w-4 h-4 stroke-[2.5]" />
          <span>Liturgical Life & Pastoral Care</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
          Mass & Sacraments
        </h1>
        <p className="text-sm sm:text-base text-[#615950] font-lora italic">
          "The cup of blessing that we bless, is it not a participation in the blood of Christ?" (1 Corinthians 10:16)
        </p>
      </div>

      {/* Primary Tab Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex flex-wrap p-1.5 bg-[#EAE2D7] rounded-xl border border-[#DCD3C7] gap-1">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-white text-[#7A1C28] shadow-sm'
                : 'text-[#615950] hover:text-[#1E1E1E]'
            }`}
          >
            Mass Schedule
          </button>
          <button
            onClick={() => setActiveTab('readings-saints')}
            className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'readings-saints'
                ? 'bg-white text-[#7A1C28] shadow-sm'
                : 'text-[#615950] hover:text-[#1E1E1E]'
            }`}
          >
            Daily Readings & Saints
          </button>
          <button
            onClick={() => setActiveTab('sacraments')}
            className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'sacraments'
                ? 'bg-white text-[#7A1C28] shadow-sm'
                : 'text-[#615950] hover:text-[#1E1E1E]'
            }`}
          >
            The Seven Holy Sacraments
          </button>
        </div>
      </div>

      {/* TAB 1: MASS & LITURGICAL SCHEDULE */}
      {activeTab === 'schedule' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          
          {/* Important Season Notice */}
          <div className="p-4 bg-[#F5EFE6] border border-[#DDD3C4] rounded-2xl flex items-start gap-3 text-xs text-[#52493F]">
            <Info className="w-5 h-5 text-[#7A1C28] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-[#1E1E1E]">Liturgical Seasonal Notice:</span>
              <p>
                Mass schedules and liturgical ceremonies may vary during special seasons (Advent, Christmas, Lent, Holy Week, Easter Triduum, and Parish Patronal Feasts). Please check announcements or consult the parish office.
              </p>
            </div>
          </div>

          {/* Regular Mass Schedule Cards */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7DFD5] pb-4">
              <div>
                <h2 className="font-cinzel text-2xl font-bold text-[#1E1E1E]">
                  Regular Liturgies & Devotions
                </h2>
                <p className="text-xs text-[#7A7167]">
                  Celebrated at St. Michael Parish Sanctuary, Babessi
                </p>
              </div>

              <button
                onClick={onOpenIntentionModal}
                className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white transition-colors cursor-pointer self-start sm:self-auto"
              >
                Request a Mass Intention
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className={`bg-white border rounded-2xl p-6 flex flex-col justify-between transition-all ${
                    schedule.isActive ? 'border-[#E7DFD5] shadow-sm hover:border-[#7A1C28]/40' : 'border-dashed border-gray-300 opacity-60'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#7A1C28] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#EAE2D7]">
                        {schedule.dayOfWeek}
                      </span>
                      <span className="text-[11px] text-[#7A7167]">
                        {schedule.frequency}
                      </span>
                    </div>

                    <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                      {schedule.celebrationName}
                    </h3>

                    <div className="space-y-2 text-xs text-[#52493F]">
                      <div className="flex items-center gap-2 font-semibold text-[#7A1C28]">
                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                        <span className="tabular-nums">
                          {schedule.startTime} {schedule.endTime ? `– ${schedule.endTime}` : ''}
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#8A7F73] shrink-0 mt-0.5" />
                        <span>{schedule.location}</span>
                      </div>

                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-[#8A7F73] shrink-0 mt-0.5" />
                        <span>Language: {schedule.language}</span>
                      </div>
                    </div>

                    {schedule.additionalInstructions && (
                      <p className="text-[11px] text-[#695F54] italic bg-[#FAF7F2] p-2.5 rounded-lg border border-[#EAE2D7]">
                        {schedule.additionalInstructions}
                      </p>
                    )}
                  </div>

                  {!schedule.isActive && (
                    <div className="mt-4 text-[11px] text-amber-800 bg-amber-50 px-2 py-1 rounded text-center font-medium">
                      Temporarily suspended
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Special Celebrations Section */}
          <div className="space-y-6 pt-6 border-t border-[#E7DFD5]">
            <div className="space-y-1">
              <h2 className="font-cinzel text-2xl font-bold text-[#1E1E1E]">
                Major Solemnities & Feasts
              </h2>
              <p className="text-xs text-[#7A7167]">
                Solemn liturgical milestones observed annually by the parish community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Christmas & Easter overview */}
              <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl p-5 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A1C28]">Liturgy</span>
                <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">The Easter Triduum</h3>
                <p className="text-xs text-[#52493F] leading-relaxed">
                  Holy Thursday Mass of the Lord's Supper, Good Friday Celebration of the Passion & Veneration of the Cross, and Solemn Easter Vigil.
                </p>
              </div>

              <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl p-5 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A1C28]">Liturgy</span>
                <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">Nativity of the Lord (Christmas)</h3>
                <p className="text-xs text-[#52493F] leading-relaxed">
                  Christmas Eve Vigil Mass of the Nativity, Midnight solemn celebration, and Christmas Day Family Eucharistic Liturgies.
                </p>
              </div>

              <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl p-5 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A1C28]">Patronal Solemnity</span>
                <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">Feast of St. Michael (Sept 29)</h3>
                <p className="text-xs text-[#52493F] leading-relaxed">
                  Preceded by the 9-Day Novena. High Mass with choir hymns, youth choreography, reception of new members, and community agape.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: DAILY READINGS & SAINTS */}
      {activeTab === 'readings-saints' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <WeeklyLiturgyAndSaints />
        </div>
      )}

      {/* TAB 3: THE SEVEN HOLY SACRAMENTS */}
      {activeTab === 'sacraments' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sacraments Selector Menu */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7A1C28] block px-2">
                Sacraments of the Church
              </span>

              <div className="space-y-1">
                {sacraments.map((sac) => {
                  const isSelected = selectedSacrament?.id === sac.id;
                  return (
                    <button
                      key={sac.id}
                      onClick={() => setSelectedSacrament(sac)}
                      className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                        isSelected
                          ? 'bg-[#7A1C28] text-white border-[#7A1C28] shadow-sm'
                          : 'bg-white text-[#3E3832] border-[#E7DFD5] hover:bg-[#F7F4EE]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-cinzel text-sm font-bold">
                            {sac.name}
                          </span>
                        </div>
                        {sac.latinName && (
                          <span className={`text-[11px] italic font-lora block ${isSelected ? 'text-[#EAE2D7]' : 'text-[#877E75]'}`}>
                            {sac.latinName}
                          </span>
                        )}
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-[#A09589]'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed Information Panel */}
            {selectedSacrament && (
              <div className="lg:col-span-8 bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm">
                
                <div className="border-b border-[#F0EAE1] pb-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7A1C28]">
                    <span>Sacrament of {selectedSacrament.category}</span>
                    {selectedSacrament.latinName && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="italic font-lora text-[#8A7F73]">{selectedSacrament.latinName}</span>
                      </>
                    )}
                  </div>
                  <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
                    {selectedSacrament.name}
                  </h2>
                  <p className="font-lora text-sm italic text-[#5C534A] leading-relaxed">
                    "{selectedSacrament.shortSummary}"
                  </p>
                </div>

                {/* Theological Explanation */}
                <div className="space-y-2">
                  <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#7A1C28]">
                    Catholic Church Teaching
                  </h3>
                  <p className="text-xs sm:text-sm text-[#443C34] leading-relaxed font-light">
                    {selectedSacrament.fullExplanation}
                  </p>
                </div>

                {/* Who should contact & Preparation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-4 space-y-1.5">
                    <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#1E1E1E] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#7A1C28]" />
                      <span>Who Should Inquire</span>
                    </h4>
                    <p className="text-xs text-[#52493F] leading-relaxed">
                      {selectedSacrament.whoShouldContact}
                    </p>
                  </div>

                  <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-4 space-y-1.5">
                    <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#1E1E1E] flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#7A1C28]" />
                      <span>Catechesis & Preparation</span>
                    </h4>
                    <p className="text-xs text-[#52493F] leading-relaxed">
                      {selectedSacrament.generalPreparation}
                    </p>
                  </div>
                </div>

                {/* Required Documents */}
                <div className="space-y-3">
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#7A1C28] flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Documents Typically Required</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#443C34]">
                    {selectedSacrament.requiredDocuments.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#F8F5EE] p-2.5 rounded-lg border border-[#EAE2D7]">
                        <Check className="w-3.5 h-3.5 text-[#7A1C28] shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to Arrange */}
                <div className="bg-[#F4EFE6] border border-[#DDD3C4] rounded-2xl p-5 space-y-2">
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#1E1E1E]">
                    Arranging This Sacrament
                  </h4>
                  <p className="text-xs text-[#52493F] leading-relaxed">
                    {selectedSacrament.howToArrange}
                  </p>
                </div>

                {/* Contact CTA */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#F0EAE1]">
                  <span className="text-xs text-[#7A7167]">
                    Requirements configurable by authorized Parish Administration.
                  </span>
                  <button
                    onClick={onOpenContactOffice}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contact Parish Office</span>
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
