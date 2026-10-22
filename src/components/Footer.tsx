import React from 'react';
import { NavigationTab } from '../types';
import { useParish } from '../context/ParishContext';
import { Cross, MapPin, Clock, Mail, Phone, Shield, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: NavigationTab) => void;
  onOpenAdminLogin: () => void;
  onOpenIntentionModal: () => void;
  onOpenPrayerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentTab,
  onOpenAdminLogin,
  onOpenIntentionModal,
  onOpenPrayerModal
}) => {
  const { parishInfo, isAdmin } = useParish();

  const handleNav = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1617] text-[#D8D2C9] border-t border-[#3A2D30] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Patronal Invocation Banner */}
        <div className="pb-12 border-b border-[#3A2D30] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7A1C28] flex items-center justify-center text-[#D4AF37] shrink-0 border border-[#9A2D3B]/40">
              <Cross className="w-7 h-7 stroke-[2]" />
            </div>
            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#F7F4EE] tracking-tight">
                St. Michael Parish, Babessi
              </h2>
              <p className="text-xs text-[#C5A059] tracking-widest uppercase font-medium">
                Growing in Faith, United in Christ
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenIntentionModal}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#2B2325] hover:bg-[#3D3134] text-[#E5DCD3] border border-[#4D3E42] transition-colors cursor-pointer"
            >
              Request Mass Intention
            </button>
            <button
              onClick={onOpenPrayerModal}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#2B2325] hover:bg-[#3D3134] text-[#E5DCD3] border border-[#4D3E42] transition-colors cursor-pointer"
            >
              Submit Prayer Petition
            </button>
            <button
              onClick={() => handleNav('support')}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#7A1C28] hover:bg-[#63141F] text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span>Support Development</span>
            </button>
          </div>
        </div>

        {/* 4 Column Institutional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-[#3A2D30] text-sm">
          
          {/* Col 1: Identity & Church Authority */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-sm font-semibold tracking-wider text-[#F7F4EE] uppercase">
              Parish Sanctuary
            </h3>
            <p className="text-xs text-[#ACA297] leading-relaxed">
              St. Michael Catholic Church is a parish in Babessi Sub-Division, Ngoketunjia Division, Northwest Region of Cameroon. A joyful community dedicated to the Holy Eucharist and the Mother of God under the heavenly patronage of St. Michael the Archangel.
            </p>
            <div className="pt-2 text-xs text-[#8E8377] space-y-1">
              <p>Ecclesiastical Jurisdiction:</p>
              <p className="text-[#C5A059] font-medium">Archdiocese of Bamenda · Ndop Deanery</p>
            </div>
          </div>

          {/* Col 2: Contact & Office Hours */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-sm font-semibold tracking-wider text-[#F7F4EE] uppercase">
              Location & Hours
            </h3>
            <ul className="space-y-3 text-xs text-[#ACA297]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Babessi Township, Northwest Region, Cameroon</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{parishInfo.officeHours}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="italic">{parishInfo.phonePlaceholder}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{parishInfo.emailPlaceholder}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-sm font-semibold tracking-wider text-[#F7F4EE] uppercase">
              Parish Directory
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('mass-sacraments')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Mass Times & Confession Schedule
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('mass-sacraments')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Sacraments & Catechism Preparation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('ministries')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Parish Ministries & Associations (CWA, CMA, CYA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('news')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Sunday Bulletins & Announcements
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('events')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Parish Liturgical Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Devotion to St. Michael the Archangel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Patron Prayer & Pastoral Reflection */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-sm font-semibold tracking-wider text-[#F7F4EE] uppercase flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span>Patron Prayer</span>
            </h3>
            <blockquote className="font-lora text-xs italic text-[#C5BDB2] leading-relaxed border-l-2 border-[#7A1C28] pl-3 py-1">
              "Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray."
            </blockquote>
            <p className="text-[11px] text-[#8E8377]">
              Pope Leo XIII prayer for spiritual protection.
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin Portal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E8377] gap-4">
          <p>
            © {new Date().getFullYear()} St. Michael Parish, Babessi. All rights reserved. Roman Catholic Church.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('about')}
              className="hover:text-[#D8D2C9] transition-colors cursor-pointer"
            >
              Parish Leadership
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-[#D8D2C9] transition-colors cursor-pointer"
            >
              Contact Office
            </button>
            <span aria-hidden="true">·</span>
            {isAdmin ? (
              <button
                onClick={() => handleNav('admin')}
                className="text-[#D4AF37] font-semibold hover:underline cursor-pointer"
              >
                Admin CMS
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Parish Admin Login
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
