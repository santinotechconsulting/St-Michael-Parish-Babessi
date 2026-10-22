import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { Cross, Shield, Users, Heart, BookOpen, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { parishInfo } = useParish();
  const [activeSection, setActiveSection] = useState<'patron' | 'history' | 'mission' | 'leadership' | 'community'>('patron');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
          <Cross className="w-4 h-4 stroke-[2.5]" />
          <span>About St. Michael Catholic Parish</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
          Our Parish & Sacred Heritage
        </h1>
        <p className="text-sm sm:text-base text-[#615950] font-lora italic">
          "Growing in Faith, United in Christ."
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#E7DFD5] pb-4">
        {[
          { key: 'patron', label: 'Patron St. Michael' },
          { key: 'history', label: 'Parish History' },
          { key: 'mission', label: 'Mission & Vision' },
          { key: 'leadership', label: 'Parish Leadership' },
          { key: 'community', label: 'Parish Community' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeSection === tab.key
                ? 'bg-[#7A1C28] text-white shadow-sm'
                : 'bg-white text-[#554D44] hover:bg-[#EAE2D7]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION D: PARISH PATRON (ST. MICHAEL THE ARCHANGEL) */}
      {activeSection === 'patron' && (
        <section className="space-y-12 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-xl bg-[#1C1617] max-h-[560px]">
                <img
                  src="/src/assets/images/st_michael_patron_1792699772746.jpg"
                  alt="Saint Michael the Archangel"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
                  Patron Saint of Babessi Parish
                </span>
                <h2 className="font-cinzel text-3xl font-bold text-[#1E1E1E]">
                  St. Michael the Archangel
                </h2>
                <p className="text-xs text-[#82766A]">
                  Feast Day: September 29th (Solemnity of the Archangels Michael, Gabriel, and Raphael)
                </p>
              </div>

              <div className="text-sm text-[#3E3832] leading-relaxed space-y-4 font-light">
                <p>
                  In Catholic Sacred Scripture and Sacred Tradition, Saint Michael is revered as the glorious Prince of the Heavenly Host, the champion of God's holy people, and the great defender against the deceits of the devil.
                </p>
                <p>
                  His very name in Hebrew — <span className="font-semibold text-[#7A1C28] italic">Mîkā’ēl</span> — poses the eternal, humble question: <strong className="font-medium text-[#1E1E1E]">"Who is like God?" (Quis ut Deus)</strong>. This cry shattered the pride of Lucifer when the heavenly battle was fought, casting the rebellious angels down.
                </p>
              </div>

              {/* Catholic Scriptural Grounding */}
              <div className="bg-white border border-[#E7DFD5] rounded-2xl p-5 space-y-3">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#7A1C28]">
                  Scriptural References
                </h3>
                <ul className="text-xs text-[#4A433B] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-[#7A1C28] shrink-0">Revelation 12:7-9:</span>
                    <span>"Now war arose in heaven, Michael and his angels fighting against the dragon... And the great dragon was thrown down, that ancient serpent, who is called the devil and Satan."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-[#7A1C28] shrink-0">Daniel 10:13, 21:</span>
                    <span>Michael is identified as "one of the chief princes" and the great prince who protects the children of God.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-[#7A1C28] shrink-0">Jude 1:9:</span>
                    <span>"When the archangel Michael, contending with the devil, disputed about the body of Moses, he did not presume to pronounce a reviling judgment upon him, but said, 'The Lord rebuke you.'"</span>
                  </li>
                </ul>
              </div>

              {/* The Traditional St. Michael Prayer */}
              <div className="bg-[#1C1617] text-white rounded-2xl p-6 border border-[#3A2D30] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                  <Shield className="w-4 h-4" />
                  <span>The Prayer to St. Michael (Pope Leo XIII)</span>
                </div>
                <blockquote className="font-lora text-sm italic text-[#E5DCD3] leading-relaxed">
                  "Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the Heavenly Host, by the power of God, cast into hell Satan and all the evil spirits who prowl through the world seeking the ruin of souls. Amen."
                </blockquote>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* SECTION A: PARISH HISTORY */}
      {activeSection === 'history' && (
        <section className="space-y-8 animate-in fade-in duration-300">
          <div className="bg-white border border-[#E7DFD5] rounded-3xl p-8 sm:p-12 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
                Historical Journey
              </span>
              <h2 className="font-cinzel text-3xl font-bold text-[#1E1E1E]">
                The Catholic Church in Babessi
              </h2>
              <p className="text-xs text-[#82766A]">
                Note: Official historical milestones are subject to ongoing verification by the Archdiocesan/Diocesan archives.
              </p>
            </div>

            <div className="text-sm text-[#443C34] leading-relaxed space-y-4">
              <p>
                The Catholic faith in Babessi took root through the tireless missionary endeavors of early catechists and Mill Hill Missionaries who traveled across the Ndop plains and the grasslands of the Northwest Region of Cameroon.
              </p>
              <p>
                From humble beginnings as an outstation community gathering under thatch structures for prayer and catechism, the Catholic flock in Babessi grew steadily through the baptism of families, the establishment of Catholic schools, and the steadfast perseverance of early Christian converts.
              </p>
            </div>

            {/* Editable Timeline Placeholders */}
            <div className="border-t border-[#F0EAE1] pt-6 space-y-6">
              <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                Parish Milestones & Chronology
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#7A1C28] text-white flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div className="w-0.5 h-full bg-[#E7DFD5] my-1" />
                  </div>
                  <div className="pb-4">
                    <h4 className="font-cinzel text-sm font-bold text-[#1E1E1E]">
                      Early Mission Outstation Era
                    </h4>
                    <p className="text-xs text-[#6B635A] mt-1">
                      Babessi served as an outstation with periodic visits by missionary priests for the celebration of the Holy Sacraments and administration of infant baptisms.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#7A1C28] text-white flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div className="w-0.5 h-full bg-[#E7DFD5] my-1" />
                  </div>
                  <div className="pb-4">
                    <h4 className="font-cinzel text-sm font-bold text-[#1E1E1E]">
                      Erection as an Autonomous Parish
                    </h4>
                    <p className="text-xs text-[#6B635A] mt-1">
                      [Official Date / Decree of Erection to be confirmed by the Diocesan Chancery]. Dedicated to Saint Michael the Archangel as the titular patron.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#7A1C28] text-white flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-[#1E1E1E]">
                      Growth of Mission Outstations & Infrastructure
                    </h4>
                    <p className="text-xs text-[#6B635A] mt-1">
                      Expansion into mission stations, construction of the parish sanctuary, parish hall, and establishment of vibrant Small Christian Communities across all quarters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F8F4EE] rounded-xl border border-[#E7DFD5] text-xs text-[#695F53] italic">
              * Authorized Parish Administrators may update this history with confirmed records and historical photographs via the Admin CMS Dashboard.
            </div>
          </div>
        </section>
      )}

      {/* SECTION B: MISSION & VISION */}
      {activeSection === 'mission' && (
        <section className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white border border-[#E7DFD5] rounded-3xl p-8 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="font-cinzel text-2xl font-bold text-[#1E1E1E]">
                Parish Mission
              </h2>
              <p className="text-sm text-[#443C34] leading-relaxed">
                St. Michael Parish, Babessi is called by Christ to proclaim the Gospel through reverent liturgical worship, steadfast Catholic catechesis, works of Christian charity, and the cultivation of authentic Christian unity in Babessi and surrounding mission communities.
              </p>
              <ul className="text-xs text-[#5C534A] space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7A1C28]" />
                  <span>Nourishing souls through the Eucharist and the Sacraments</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7A1C28]" />
                  <span>Forming children, youth, and families in the Catholic moral life</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7A1C28]" />
                  <span>Reaching out in charity to the poor, sick, widows, and vulnerable</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-[#E7DFD5] rounded-3xl p-8 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 text-[#997A16] flex items-center justify-center">
                <Cross className="w-6 h-6 stroke-[2]" />
              </div>
              <h2 className="font-cinzel text-2xl font-bold text-[#1E1E1E]">
                Parish Vision
              </h2>
              <p className="text-sm text-[#443C34] leading-relaxed">
                To be a radiant, prayerful, and self-reliant Catholic parish community, united in the Holy Trinity, where every parishioner actively exercises their baptismal calling and witnesses to the peace, love, and truth of Christ in society.
              </p>
              <ul className="text-xs text-[#5C534A] space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7A1C28]" />
                  <span>Deepening spiritual life through daily prayer and Adoration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7A1C28]" />
                  <span>Strengthening family and Small Christian Community bonds</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7A1C28]" />
                  <span>Promoting peace, justice, and reconciliation in our land</span>
                </li>
              </ul>
            </div>

          </div>
        </section>
      )}

      {/* SECTION C: PARISH LEADERSHIP */}
      {activeSection === 'leadership' && (
        <section className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
              Pastoral Leadership & Councils
            </h2>
            <p className="text-xs text-[#7A7167]">
              Under canonical obedience to our Diocesan Bishop and in collaboration with the Parish Pastoral and Finance Councils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Priest Profile */}
            <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 text-center space-y-3 shadow-sm">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center border-2 border-[#D4AF37]/40">
                <Cross className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                  {parishInfo.priestNamePlaceholder}
                </h3>
                <p className="text-xs text-[#7A1C28] font-semibold uppercase tracking-wider mt-0.5">
                  Parish Priest
                </p>
                <p className="text-[11px] text-[#7A7167] mt-1">
                  Spiritual & Sacramental Shepherd
                </p>
              </div>
            </div>

            {/* Assistant Priest Profile */}
            <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 text-center space-y-3 shadow-sm">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#EAE2D7] text-[#554D44] flex items-center justify-center border border-[#DDD3C4]">
                <Cross className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                  [Assistant Priest Placeholder]
                </h3>
                <p className="text-xs text-[#7A1C28] font-semibold uppercase tracking-wider mt-0.5">
                  Assistant Priest / Curate
                </p>
                <p className="text-[11px] text-[#7A7167] mt-1">
                  When appointed by the Bishop
                </p>
              </div>
            </div>

            {/* PPC Chair */}
            <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 text-center space-y-3 shadow-sm">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#EAE2D7] text-[#554D44] flex items-center justify-center border border-[#DDD3C4]">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                  [PPC Chairperson Placeholder]
                </h3>
                <p className="text-xs text-[#7A1C28] font-semibold uppercase tracking-wider mt-0.5">
                  Pastoral Council Chair
                </p>
                <p className="text-[11px] text-[#7A7167] mt-1">
                  Coordinating lay apostolates & outstations
                </p>
              </div>
            </div>

            {/* Finance Chair */}
            <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 text-center space-y-3 shadow-sm">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#EAE2D7] text-[#554D44] flex items-center justify-center border border-[#DDD3C4]">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                  [Finance Council Chair]
                </h3>
                <p className="text-xs text-[#7A1C28] font-semibold uppercase tracking-wider mt-0.5">
                  Parish Finance Committee
                </p>
                <p className="text-[11px] text-[#7A7167] mt-1">
                  Stewardship of temporal goods & projects
                </p>
              </div>
            </div>

          </div>

          <p className="text-center text-xs text-[#8A7F73] italic">
            * All names and pastoral leadership appointments are officially updated through the Parish Administration CMS.
          </p>
        </section>
      )}

      {/* SECTION E: PARISH COMMUNITY */}
      {activeSection === 'community' && (
        <section className="space-y-8 animate-in fade-in duration-300">
          <div className="bg-white border border-[#E7DFD5] rounded-3xl p-8 sm:p-12 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
                Small Christian Communities
              </span>
              <h2 className="font-cinzel text-3xl font-bold text-[#1E1E1E]">
                The Community of the Faithful
              </h2>
              <p className="text-xs text-[#82766A]">
                Living the early Christian communion in Babessi's quarters and mission outstations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#443C34] leading-relaxed">
              <div className="space-y-3">
                <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                  Grassroots Neighborhood Prayer
                </h3>
                <p className="text-xs text-[#5C534A] leading-relaxed">
                  The parish is subdivided into neighborhood Small Christian Communities (SCCs). Every Tuesday evening, families gather in rotation to read and meditate on the upcoming Sunday Gospel, offer mutual prayers, and extend care to vulnerable neighbors.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                  Mission Outstations
                </h3>
                <p className="text-xs text-[#5C534A] leading-relaxed">
                  In addition to the central parish seat, St. Michael Parish shepherds several mission outstations in the surrounding rural localities. Catechists lead Sunday Liturgies of the Word when priests are ministering elsewhere, ensuring constant spiritual presence.
                </p>
              </div>
            </div>

            <div className="border-t border-[#F0EAE1] pt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-cinzel text-sm font-bold text-[#1E1E1E]">
                  Want to locate your Small Christian Community?
                </h4>
                <p className="text-xs text-[#6B635A]">
                  Inquire at the parish office on Sunday after Mass to find your neighborhood cell leader.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
