import React, { useState } from 'react';
import { NavigationTab, Announcement, ParishEvent } from '../types';
import { useParish } from '../context/ParishContext';
import { WeeklyLiturgyAndSaints } from '../components/WeeklyLiturgyAndSaints';
import {
  Cross,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  BookOpen,
  Heart,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface HomeViewProps {
  setCurrentTab: (tab: NavigationTab) => void;
  onOpenIntentionModal: () => void;
  onOpenPrayerModal: () => void;
  onSelectEventForRSVP: (event: ParishEvent) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentTab,
  onOpenIntentionModal,
  onOpenPrayerModal,
  onSelectEventForRSVP
}) => {
  const { parishInfo, massSchedules, announcements, events, scriptureReflection } = useParish();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  // Active Sunday Masses
  const sundayMasses = massSchedules.filter((m) => m.isActive && m.dayOfWeek.includes('Sunday'));
  const weekdayMasses = massSchedules.filter((m) => m.isActive && !m.dayOfWeek.includes('Sunday'));

  // Featured announcements
  const publishedAnnouncements = announcements
    .filter((a) => a.isPublished)
    .slice(0, 3);

  // Upcoming published events
  const publishedEvents = events
    .filter((e) => e.isPublished)
    .slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24">
      
      {/* A. HERO SECTION */}
      <section className="relative bg-[#1A1415] text-white overflow-hidden">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_church_parish_1792699770017.jpg"
            alt="St. Michael Parish Sanctuary"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140E0F] via-[#1A1415]/75 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#140E0F]/40 to-[#140E0F]/90" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col justify-center">
          <div className="max-w-3xl space-y-6">
            
            {/* Kicker with Subtle Cross Motif */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              <Cross className="w-4 h-4 stroke-[2.5]" />
              <span>Roman Catholic Church · Babessi, Cameroon</span>
            </div>

            {/* Parish Name & Tagline */}
            <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.1] text-balance">
              St. Michael Parish, Babessi
            </h1>

            <p className="font-lora text-lg sm:text-xl text-[#D8CFBF] italic font-medium">
              "{parishInfo.tagline}"
            </p>

            {/* Welcome message */}
            <p className="text-sm sm:text-base text-[#D4CBC0] leading-relaxed max-w-2xl font-light">
              {parishInfo.heroWelcomeMessage}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCurrentTab('about')}
                className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-lg shadow-[#7A1C28]/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Discover Our Parish</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentTab('mass-sacraments')}
                className="px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/25 backdrop-blur-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>Mass Times & Liturgy</span>
              </button>

              <button
                onClick={onOpenIntentionModal}
                className="px-5 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                Request Mass Intention
              </button>
            </div>

          </div>
        </div>

        {/* Operational Liturgical Utility Ribbon */}
        <div className="relative z-10 border-t border-white/15 bg-[#120D0E]/85 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="text-[#9E9488] block text-[11px] uppercase tracking-wider font-semibold">Sunday Masses</span>
                  <span className="text-white font-medium">07:00 AM & 09:30 AM (Solemn)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:pl-4 pt-3 sm:pt-0">
                <Cross className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="text-[#9E9488] block text-[11px] uppercase tracking-wider font-semibold">Weekday Mass</span>
                  <span className="text-white font-medium">Tue – Fri: 06:30 AM | Sat: 07:00 AM</span>
                </div>
              </div>

              <div className="flex items-center gap-3 lg:pl-4 pt-3 sm:pt-0">
                <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="text-[#9E9488] block text-[11px] uppercase tracking-wider font-semibold">Adoration & Confession</span>
                  <span className="text-white font-medium">Thu: 05:00 PM | Sat: 04:00 PM</span>
                </div>
              </div>

              <div className="flex items-center gap-3 lg:pl-4 pt-3 sm:pt-0">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="text-[#9E9488] block text-[11px] uppercase tracking-wider font-semibold">Location</span>
                  <span className="text-white font-medium">Babessi Sub-Division, Cameroon</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* B. QUICK INFORMATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Mass Times & Sacraments */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-[#1E1E1E]">
                Liturgical Schedule
              </h3>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Join our Eucharistic gatherings throughout the week. Reconciliation, Benediction, and holy devotions available for spiritual nourishment.
              </p>
              <div className="pt-2 text-xs space-y-1 text-[#3E3832]">
                <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
                  <span className="font-medium">Sunday Early Mass:</span>
                  <span className="tabular-nums font-semibold text-[#7A1C28]">07:00 AM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
                  <span className="font-medium">Principal Parish Mass:</span>
                  <span className="tabular-nums font-semibold text-[#7A1C28]">09:30 AM</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentTab('mass-sacraments')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A1C28] hover:text-[#5F121C] transition-colors cursor-pointer"
            >
              <span>View Full Liturgical Calendar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Parish Sacraments & Catechism */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#997A16] flex items-center justify-center">
                <Cross className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-[#1E1E1E]">
                Sacraments & Guidance
              </h3>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Preparation for Holy Baptism, First Holy Communion, Confirmation, Christian Matrimony, and Vocations under canonical pastoral care.
              </p>
              <ul className="pt-2 text-xs text-[#5C554E] space-y-1.5">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#7A1C28]" />
                  <span>Infant & Adult Baptismal Catechesis</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#7A1C28]" />
                  <span>Pre-Cana Marriage Preparation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#7A1C28]" />
                  <span>Anointing of the Sick & Home Visits</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setCurrentTab('mass-sacraments')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A1C28] hover:text-[#5F121C] transition-colors cursor-pointer"
            >
              <span>Explore Sacramental Requirements</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Ministries & Fellowship */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#7A1C28]/10 text-[#7A1C28] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-[#1E1E1E]">
                Ministries & Groups
              </h3>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Be an active stone in God's temple. Connect with the Catholic Women's Association (CWA), Catholic Men's Association (CMA), Youth (CYA), and Choir.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-[#6B635A]">
                <span className="bg-[#FAF7F2] border border-[#E7DFD5] px-2.5 py-1 rounded-md">CWA</span>
                <span className="bg-[#FAF7F2] border border-[#E7DFD5] px-2.5 py-1 rounded-md">CMA</span>
                <span className="bg-[#FAF7F2] border border-[#E7DFD5] px-2.5 py-1 rounded-md">CYA Youth</span>
                <span className="bg-[#FAF7F2] border border-[#E7DFD5] px-2.5 py-1 rounded-md">Choir</span>
                <span className="bg-[#FAF7F2] border border-[#E7DFD5] px-2.5 py-1 rounded-md">Altar Servers</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentTab('ministries')}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A1C28] hover:text-[#5F121C] transition-colors cursor-pointer"
            >
              <span>Join a Parish Ministry</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* C. WELCOME FROM THE PARISH PRIEST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4EFE6] border border-[#E3D9CC] rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Priest Visual Placeholder */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-md bg-[#E2D8C9]">
                <img
                  src="/src/assets/images/parish_eucharist_mass_1792699771885.jpg"
                  alt="Celebration of Holy Mass"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-center">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37] bg-black/60 px-2 py-0.5 rounded">
                    Parish Sanctuary
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                  {parishInfo.priestNamePlaceholder}
                </h3>
                <p className="text-xs text-[#7A1C28] font-semibold tracking-wide uppercase mt-0.5">
                  {parishInfo.priestTitle}
                </p>
                <p className="text-[11px] text-[#6B635A] mt-1">
                  St. Michael Parish, Babessi
                </p>
              </div>
            </div>

            {/* Welcome Letter & Pastoral Reflection */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
                <span>Pastoral Welcome</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#877D72]">Message to Parishioners & Visitors</span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1E1E1E] leading-snug">
                "Welcome to Our Spiritual Family"
              </h2>

              <p className="text-sm text-[#4A433B] leading-relaxed font-light">
                {parishInfo.priestWelcomeMessage}
              </p>

              {/* Highlighted Pastoral Reflection Box */}
              <div className="bg-[#FAF7F2] border border-[#DDD3C4] rounded-2xl p-5 mt-4 space-y-2">
                <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#7A1C28] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Pastoral Reflection</span>
                </h4>
                <p className="font-lora text-xs sm:text-sm italic text-[#38322C] leading-relaxed">
                  "{parishInfo.pastoralReflection}"
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium">
                <button
                  onClick={onOpenPrayerModal}
                  className="px-4 py-2.5 rounded-lg bg-[#7A1C28] text-white hover:bg-[#63141F] transition-colors cursor-pointer"
                >
                  Submit a Prayer Request
                </button>
                <button
                  onClick={() => setCurrentTab('contact')}
                  className="px-4 py-2.5 rounded-lg border border-[#7A1C28] text-[#7A1C28] hover:bg-[#7A1C28]/5 transition-colors cursor-pointer"
                >
                  Schedule Pastoral Appointment
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* D. PARISH LIFE (Visual Bento) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
            Living Our Catholic Faith
          </span>
          <h2 className="font-cinzel text-3xl font-bold text-[#1E1E1E]">
            Parish Life in Babessi
          </h2>
          <p className="text-xs text-[#6B635A]">
            Discover the life of our parish where the liturgy is reverent, charity is alive, and Christ is praised.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: The Holy Eucharist */}
          <div className="group relative rounded-2xl overflow-hidden border border-[#E7DFD5] bg-white shadow-sm flex flex-col justify-between">
            <div className="h-52 overflow-hidden relative">
              <img
                src="/src/assets/images/parish_eucharist_mass_1792699771885.jpg"
                alt="Holy Mass in St. Michael Church"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-semibold text-white tracking-wide uppercase">
                Holy Mass & Adoration
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                The Source and Summit
              </h3>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Nourished every Sunday and weekday by the true presence of Jesus Christ in the Holy Eucharist.
              </p>
              <button
                onClick={() => setCurrentTab('mass-sacraments')}
                className="pt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#7A1C28] hover:underline cursor-pointer"
              >
                <span>Liturgical schedule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Patron Saint Devotion */}
          <div className="group relative rounded-2xl overflow-hidden border border-[#E7DFD5] bg-white shadow-sm flex flex-col justify-between">
            <div className="h-52 overflow-hidden relative">
              <img
                src="/src/assets/images/st_michael_patron_1792699772746.jpg"
                alt="St. Michael the Archangel Shrine"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-semibold text-white tracking-wide uppercase">
                Patronal Protection
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                Devotion to St. Michael
              </h3>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Under the heavenly patronage of the Prince of the Heavenly Host, we pray for spiritual defense, family protection, and peace.
              </p>
              <button
                onClick={() => setCurrentTab('about')}
                className="pt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#7A1C28] hover:underline cursor-pointer"
              >
                <span>Learn about our Patron</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Joyful Community & Fellowship */}
          <div className="group relative rounded-2xl overflow-hidden border border-[#E7DFD5] bg-white shadow-sm flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div className="h-52 overflow-hidden relative">
              <img
                src="/src/assets/images/parish_community_gathering_1792699771967.jpg"
                alt="Parishioners gathering in joy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-semibold text-white tracking-wide uppercase">
                Apostolates & Community
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                United in Christ
              </h3>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Vibrant choir harmonies, active youth, caring mothers in CWA, dedicated fathers in CMA, and Small Christian Communities.
              </p>
              <button
                onClick={() => setCurrentTab('ministries')}
                className="pt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#7A1C28] hover:underline cursor-pointer"
              >
                <span>View all ministries</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* G. SAINTS, FEAST DAYS OF THE WEEK, DAILY READINGS & REFLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WeeklyLiturgyAndSaints />
      </section>

      {/* E & F. LATEST NEWS & UPCOMING EVENTS SPLIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* E. Latest News (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
                  Parish Bulletins
                </span>
                <h2 className="font-cinzel text-2xl font-bold text-[#1E1E1E]">
                  News & Announcements
                </h2>
              </div>
              <button
                onClick={() => setCurrentTab('news')}
                className="text-xs font-semibold text-[#7A1C28] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>All News</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {publishedAnnouncements.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedAnnouncement(item)}
                  className="p-5 bg-white border border-[#E7DFD5] rounded-2xl hover:border-[#7A1C28]/40 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs text-[#877E75] mb-2">
                    <span className="font-semibold text-[#7A1C28]">{item.category}</span>
                    <span className="tabular-nums">{item.date}</span>
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-[#1E1E1E] group-hover:text-[#7A1C28] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5C554E] leading-relaxed mt-1 line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#7A1C28]">
                    <span>Read Announcement</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* F. Upcoming Events (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
                  Liturgical Calendar
                </span>
                <h2 className="font-cinzel text-2xl font-bold text-[#1E1E1E]">
                  Upcoming Events
                </h2>
              </div>
              <button
                onClick={() => setCurrentTab('events')}
                className="text-xs font-semibold text-[#7A1C28] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Calendar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {publishedEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-5 bg-white border border-[#E7DFD5] rounded-2xl hover:border-[#7A1C28]/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#877E75]">
                      <span className="bg-[#FAF7F2] text-[#7A1C28] font-semibold px-2 py-0.5 rounded text-[11px] border border-[#E7DFD5]">
                        {evt.category}
                      </span>
                      <span className="tabular-nums flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {evt.date}
                      </span>
                    </div>

                    <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-[#5C554E] line-clamp-2">
                      {evt.description}
                    </p>

                    <div className="text-xs text-[#7A7167] flex items-center gap-4 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#7A1C28]" />
                        {evt.startTime}
                      </span>
                      <span className="flex items-center gap-1 truncate max-w-[180px]">
                        <MapPin className="w-3.5 h-3.5 text-[#7A1C28]" />
                        {evt.venue}
                      </span>
                    </div>
                  </div>

                  {evt.registrationRequired && (
                    <div className="pt-4 border-t border-[#F0EAE1] mt-3 flex justify-end">
                      <button
                        onClick={() => onSelectEventForRSVP(evt)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#7A1C28] text-white hover:bg-[#63141F] transition-colors cursor-pointer"
                      >
                        RSVP / Sign Up
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* H. PARISH CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#7A1C28] to-[#55101A] text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-white/10 mx-auto flex items-center justify-center text-[#D4AF37] border border-white/20">
            <Cross className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight">
              Join Us in Faith and Fellowship
            </h2>
            <p className="text-sm text-[#F0EAE1] font-light leading-relaxed">
              Whether you are residing in Babessi, visiting the Northwest Region, or keeping ties from the diaspora, you belong to this Catholic family.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentTab('mass-sacraments')}
              className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white text-[#7A1C28] hover:bg-[#FAF7F2] transition-colors shadow cursor-pointer"
            >
              Join Us in Worship
            </button>
            <button
              onClick={() => setCurrentTab('ministries')}
              className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/15 text-white hover:bg-white/25 border border-white/25 transition-colors cursor-pointer"
            >
              Explore Parish Activities
            </button>
            <button
              onClick={() => setCurrentTab('support')}
              className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-[#1E1E1E] hover:bg-[#E5BF47] transition-colors shadow cursor-pointer flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Support Parish Projects</span>
            </button>
          </div>
        </div>
      </section>

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-4">
            
            <div className="flex items-center justify-between text-xs text-[#877E75] border-b border-[#E7DFD5] pb-3">
              <span className="font-semibold text-[#7A1C28]">{selectedAnnouncement.category}</span>
              <span className="tabular-nums">{selectedAnnouncement.date}</span>
            </div>

            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1E1E1E]">
              {selectedAnnouncement.title}
            </h2>

            {selectedAnnouncement.featuredImage && (
              <div className="rounded-xl overflow-hidden max-h-64 border border-[#E7DFD5]">
                <img
                  src={selectedAnnouncement.featuredImage}
                  alt={selectedAnnouncement.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="text-sm text-[#3E3832] leading-relaxed space-y-3 font-light">
              <p className="font-medium text-[#1E1E1E]">{selectedAnnouncement.summary}</p>
              <div className="whitespace-pre-line">{selectedAnnouncement.content}</div>
            </div>

            <div className="pt-4 border-t border-[#E7DFD5] flex items-center justify-between text-xs text-[#7A7167]">
              <span>Issued by: {selectedAnnouncement.author}</span>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 rounded-lg bg-[#7A1C28] text-white hover:bg-[#63141F] transition-colors cursor-pointer"
              >
                Close Notice
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
