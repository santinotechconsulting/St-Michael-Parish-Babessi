import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { MinistryGroup } from '../types';
import { Cross, Users, Calendar, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';

interface MinistriesViewProps {
  onJoinMinistry: (ministry: MinistryGroup) => void;
}

export const MinistriesView: React.FC<MinistriesViewProps> = ({ onJoinMinistry }) => {
  const { ministries } = useParish();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedGroupModal, setSelectedGroupModal] = useState<MinistryGroup | null>(null);

  const categories = [
    { key: 'all', label: 'All Ministries' },
    { key: 'Devotional', label: 'Devotional & Family' },
    { key: 'Liturgical', label: 'Liturgical & Music' },
    { key: 'Youth', label: 'Youth Apostolates' },
    { key: 'Council', label: 'Catechesis & Councils' },
  ];

  const filteredMinistries = ministries.filter((m) => {
    if (!m.isActive) return false;
    if (activeCategory === 'all') return true;
    return m.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
          <Users className="w-4 h-4" />
          <span>Lay Apostolates & Associations</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
          Ministries & Parish Groups
        </h1>
        <p className="text-sm sm:text-base text-[#615950] font-lora italic">
          "As each has received a gift, use it to serve one another, as good stewards of God's varied grace." (1 Peter 4:10)
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat.key
                ? 'bg-[#7A1C28] text-white shadow-sm'
                : 'bg-white text-[#52493F] border border-[#E7DFD5] hover:bg-[#F7F4EE]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Ministry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMinistries.map((ministry) => (
          <div
            key={ministry.id}
            className="bg-white border border-[#E7DFD5] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo header if available */}
              {ministry.imageUrl && (
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={ministry.imageUrl}
                    alt={ministry.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-white tracking-wider uppercase">
                    {ministry.category}
                  </span>
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-cinzel text-lg font-bold text-[#1E1E1E] leading-snug">
                    {ministry.name}
                  </h3>
                  <p className="text-xs text-[#52493F] leading-relaxed">
                    {ministry.shortDesc}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-[#6B635A] bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D7]">
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#7A1C28] shrink-0 mt-0.5" />
                    <span><strong className="text-[#3E3832]">Meetings:</strong> {ministry.meetingSchedule}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-3.5 h-3.5 text-[#7A1C28] shrink-0 mt-0.5" />
                    <span><strong className="text-[#3E3832]">Leader:</strong> {ministry.leaderNamePlaceholder}</span>
                  </div>
                </div>

                {ministry.activities && ministry.activities.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A1C28] block">
                      Key Activities:
                    </span>
                    <ul className="text-xs text-[#52493F] space-y-1">
                      {ministry.activities.slice(0, 2).map((act, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#7A1C28] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#F0EAE1] mt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedGroupModal(ministry)}
                className="text-xs font-semibold text-[#7A1C28] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Read More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onJoinMinistry(ministry)}
                className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-sm transition-colors cursor-pointer"
              >
                Join Ministry
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Ministry Full Details Modal */}
      {selectedGroupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-[#E7DFD5] pb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
                {selectedGroupModal.category} Apostolate
              </span>
              <h2 className="font-cinzel text-2xl font-bold text-[#1E1E1E] mt-1">
                {selectedGroupModal.name}
              </h2>
            </div>

            <div className="space-y-4 text-sm text-[#3E3832]">
              <div className="space-y-1">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#7A1C28]">
                  About the Ministry
                </h3>
                <p className="text-xs sm:text-sm text-[#52493F] leading-relaxed">
                  {selectedGroupModal.fullDesc}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#7A1C28]">
                  Mission & Calling
                </h3>
                <p className="text-xs sm:text-sm text-[#52493F] leading-relaxed">
                  {selectedGroupModal.mission}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#7A1C28]">
                  Activities & Commitments
                </h3>
                <ul className="space-y-1.5 text-xs text-[#52493F]">
                  {selectedGroupModal.activities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-[#E7DFD5]">
                      <CheckCircle2 className="w-4 h-4 text-[#7A1C28] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#EFEAE1] p-4 rounded-xl border border-[#DDD3C4] text-xs space-y-2">
                <p><strong>Meeting Schedule:</strong> {selectedGroupModal.meetingSchedule}</p>
                <p><strong>Membership Eligibility:</strong> {selectedGroupModal.membershipInfo}</p>
                <p><strong>Leadership Contact:</strong> {selectedGroupModal.leaderNamePlaceholder} ({selectedGroupModal.leadershipRole})</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7DFD5] flex items-center justify-between">
              <button
                onClick={() => setSelectedGroupModal(null)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-[#5E554C] hover:bg-[#EAE2D7] cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const m = selectedGroupModal;
                  setSelectedGroupModal(null);
                  onJoinMinistry(m);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-sm cursor-pointer"
              >
                Express Interest to Join
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
