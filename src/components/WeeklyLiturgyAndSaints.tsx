import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { DailyLiturgyAndSaint, LiturgicalColor } from '../types';
import { 
  BookOpen, 
  Calendar, 
  Sparkles, 
  Share2, 
  Check, 
  HeartHandshake, 
  Flame, 
  ScrollText,
  Bookmark,
  ChevronRight,
  Sun
} from 'lucide-react';

export const WeeklyLiturgyAndSaints: React.FC = () => {
  const { weeklyLiturgy, showToast } = useParish();
  const [selectedDayId, setSelectedDayId] = useState<string>(weeklyLiturgy[0]?.id || 'lit-sun');
  const [copied, setCopied] = useState(false);

  const activeItem: DailyLiturgyAndSaint = 
    weeklyLiturgy.find((item) => item.id === selectedDayId) || weeklyLiturgy[0];

  const getColorStyles = (color: LiturgicalColor) => {
    switch (color) {
      case 'Green':
        return {
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-600',
          accent: 'border-l-emerald-600',
          desc: 'Green · Hope, Growth & Ordinary Time'
        };
      case 'Red':
        return {
          badge: 'bg-rose-100 text-rose-900 border-rose-300',
          dot: 'bg-rose-600',
          accent: 'border-l-rose-600',
          desc: 'Red · The Holy Spirit, Fire & Martyrs'
        };
      case 'White':
      case 'Gold':
        return {
          badge: 'bg-amber-50 text-amber-950 border-amber-300',
          dot: 'bg-amber-500',
          accent: 'border-l-amber-500',
          desc: 'White / Gold · Purity, Joy, Solemnities & Saints'
        };
      case 'Purple':
        return {
          badge: 'bg-purple-100 text-purple-900 border-purple-300',
          dot: 'bg-purple-700',
          accent: 'border-l-purple-700',
          desc: 'Purple · Penance, Conversion & Expectation'
        };
      case 'Rose':
        return {
          badge: 'bg-pink-100 text-pink-900 border-pink-300',
          dot: 'bg-pink-500',
          accent: 'border-l-pink-500',
          desc: 'Rose · Mid-season Joy (Gaudete / Laetare)'
        };
      default:
        return {
          badge: 'bg-[#FAF7F2] text-[#1E1E1E] border-[#E7DFD5]',
          dot: 'bg-[#7A1C28]',
          accent: 'border-l-[#7A1C28]',
          desc: 'Liturgical Color'
        };
    }
  };

  const activeColor = getColorStyles(activeItem?.liturgicalColor || 'Green');

  const handleShare = () => {
    if (!activeItem) return;
    const textToShare = `*${activeItem.saintOrFeastName}* (${activeItem.liturgicalTitle})\n\nDaily Gospel: ${activeItem.gospel.reference}\n"${activeItem.gospel.keyVerse}"\n\nReflection by ${activeItem.author}:\n${activeItem.reflectionTitle}\n\nSt. Michael Parish, Babessi · Archdiocese of Bamenda (Ndop Deanery)`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setCopied(true);
      showToast('Daily Scripture & Saint shared to clipboard!', 'success');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E7DFD5] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7A1C28] mb-1">
            <ScrollText className="w-4 h-4 text-[#D4AF37]" />
            <span>Liturgical Calendar & Daily Bread</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1E1E1E]">
            Saints, Feast Days & Daily Scripture
          </h2>
          <p className="text-xs sm:text-sm text-[#6B635A] max-w-2xl mt-1">
            Journey with the Universal Catholic Church throughout this week with daily Mass readings, venerable saints' lives, and pastoral reflections from St. Michael Parish.
          </p>
        </div>

        {/* Quick Liturgical Context Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="block text-[11px] font-semibold uppercase text-[#7A1C28]">Current Season</span>
            <span className="text-xs text-[#1E1E1E] font-medium">30th Week in Ordinary Time</span>
          </div>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E7DFD5] text-[#1E1E1E] hover:bg-[#FAF7F2] transition-colors shadow-sm cursor-pointer"
            title="Share daily reading & saint reflection"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#7A1C28]" />}
            <span>{copied ? 'Copied' : 'Share Day'}</span>
          </button>
        </div>
      </div>

      {/* 7-Day Liturgical Week Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
        {weeklyLiturgy.map((day) => {
          const isSelected = day.id === selectedDayId;
          const dayColor = getColorStyles(day.liturgicalColor);
          const dateNumber = day.date.split('-')[2];

          return (
            <button
              key={day.id}
              onClick={() => setSelectedDayId(day.id)}
              className={`text-left p-3.5 rounded-2xl transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between border ${
                isSelected
                  ? 'bg-white border-[#7A1C28] shadow-md ring-2 ring-[#7A1C28]/20'
                  : 'bg-[#FAF7F2] border-[#E7DFD5] hover:bg-white hover:border-[#7A1C28]/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#7A1C28]' : 'text-[#82766A]'}`}>
                  {day.dayOfWeek.slice(0, 3)}
                </span>
                <span className={`w-2.5 h-2.5 rounded-full ${dayColor.dot}`} title={dayColor.desc} />
              </div>

              <div className="my-2">
                <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#1E1E1E] block">
                  {dateNumber}
                </span>
                <p className="text-[10px] text-[#6B635A] truncate font-medium mt-0.5" title={day.saintOrFeastName}>
                  {day.saintOrFeastName}
                </p>
              </div>

              <div className="pt-1.5 border-t border-[#F0EAE1] flex items-center justify-between text-[10px]">
                <span className="text-[#8E8377]">{day.feastRank}</span>
                {isSelected && <span className="font-bold text-[#7A1C28]">Today</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Day Detail Display */}
      {activeItem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): Saint & Liturgical Profile */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Saint of the Day Card */}
            <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-7 shadow-sm space-y-5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${activeColor.badge}`}>
                  {activeItem.feastRank}
                </span>
                <span className="text-xs text-[#7A7167] font-mono flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {activeItem.date}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#7A1C28] font-bold uppercase tracking-widest block mb-1">
                  Saint & Feast of the Day
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1E1E1E] leading-snug">
                  {activeItem.saintOrFeastName}
                </h3>
                {activeItem.saintTitle && (
                  <p className="text-xs text-[#7A1C28] font-semibold mt-1">
                    {activeItem.saintTitle}
                  </p>
                )}
              </div>

              {/* Liturgical Vestment Meaning Indicator */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E7DFD5] flex items-center gap-3 text-xs">
                <span className={`w-3.5 h-3.5 rounded-full ${activeColor.dot} shrink-0`} />
                <div>
                  <span className="font-semibold text-[#1E1E1E]">Liturgical Vestment: </span>
                  <span className="text-[#6B635A]">{activeColor.desc}</span>
                </div>
              </div>

              {/* Saint Bio / Spiritual Narrative */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A433B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Life & Holy Witness</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#4A433B] leading-relaxed font-light">
                  {activeItem.saintBio}
                </p>
              </div>

              {activeItem.patronage && (
                <div className="pt-3 border-t border-[#F0EAE1] text-xs">
                  <span className="font-semibold text-[#1E1E1E]">Patron Saint of: </span>
                  <span className="text-[#6B635A]">{activeItem.patronage}</span>
                </div>
              )}

              {/* Collect / Daily Family Prayer */}
              <div className="bg-[#FAF7F2] border-l-4 border-[#7A1C28] rounded-r-2xl p-4 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#7A1C28] uppercase tracking-wide">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Daily Family Prayer (Collect)</span>
                </div>
                <p className="font-lora text-xs sm:text-sm italic text-[#3B332A] leading-relaxed">
                  "{activeItem.dailyPrayer}"
                </p>
              </div>

            </div>

            {/* Quick Reference: Weekly Saints Roster */}
            <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-3xl p-5 space-y-3">
              <h4 className="font-cinzel text-sm font-bold text-[#1E1E1E] flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#D4AF37]" />
                <span>This Week's Holy Companions</span>
              </h4>
              <ul className="space-y-2 text-xs">
                {weeklyLiturgy.map((day) => (
                  <li 
                    key={day.id}
                    onClick={() => setSelectedDayId(day.id)}
                    className={`flex items-center justify-between p-2 rounded-xl transition-colors cursor-pointer ${
                      day.id === selectedDayId ? 'bg-white shadow-xs font-semibold text-[#7A1C28]' : 'hover:bg-white/60 text-[#595147]'
                    }`}
                  >
                    <span className="truncate max-w-[200px]">{day.dayOfWeek}: {day.saintOrFeastName}</span>
                    <span className="text-[10px] text-[#8A8074] shrink-0">{day.feastRank}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column (7 cols): Liturgy of the Word & Pastoral Reflection */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Mass Scripture Readings Container */}
            <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#7A1C28]" />
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#1E1E1E]">
                    Mass Readings of the Day
                  </h3>
                </div>
                <span className="text-xs text-[#7A7167] font-medium">
                  {activeItem.liturgicalTitle}
                </span>
              </div>

              {/* 1. First Reading */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-bold text-[#7A1C28] uppercase tracking-wider">First Reading</span>
                  <span className="font-semibold text-[#1E1E1E]">{activeItem.firstReading.reference}</span>
                </div>
                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E7DFD5] text-xs sm:text-sm text-[#4A433B] leading-relaxed">
                  <p>{activeItem.firstReading.excerpt}</p>
                </div>
              </div>

              {/* 2. Responsorial Psalm */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-bold text-[#7A1C28] uppercase tracking-wider">Responsorial Psalm</span>
                  <span className="font-semibold text-[#1E1E1E]">{activeItem.responsorialPsalm.reference}</span>
                </div>
                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E7DFD5] space-y-2 text-xs sm:text-sm text-[#4A433B]">
                  <p className="font-semibold text-[#7A1C28]">
                    <span className="italic mr-1">R/.</span> {activeItem.responsorialPsalm.refrain}
                  </p>
                  <p className="text-xs text-[#5C5349] leading-relaxed font-light">
                    {activeItem.responsorialPsalm.verseExcerpt}
                  </p>
                </div>
              </div>

              {/* 3. Second Reading (if applicable) */}
              {activeItem.secondReading && (
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-bold text-[#7A1C28] uppercase tracking-wider">Second Reading</span>
                    <span className="font-semibold text-[#1E1E1E]">{activeItem.secondReading.reference}</span>
                  </div>
                  <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E7DFD5] text-xs sm:text-sm text-[#4A433B] leading-relaxed">
                    <p>{activeItem.secondReading.excerpt}</p>
                  </div>
                </div>
              )}

              {/* 4. The Holy Gospel */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#7A1C28] uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>The Holy Gospel</span>
                  </div>
                  <span className="font-semibold text-[#1E1E1E]">{activeItem.gospel.reference}</span>
                </div>

                <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-[#F5ECE0] rounded-2xl border-2 border-[#D4AF37]/40 space-y-3">
                  <div className="font-lora italic text-sm sm:text-base font-semibold text-[#7A1C28] border-l-2 border-[#7A1C28] pl-3 py-0.5">
                    "{activeItem.gospel.keyVerse}"
                  </div>
                  <p className="text-xs sm:text-sm text-[#3E362D] leading-relaxed font-light">
                    {activeItem.gospel.excerpt}
                  </p>
                </div>
              </div>

            </div>

            {/* Pastoral Reflection Card */}
            <div className="bg-[#1C1617] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg border border-[#3A2D30] relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                <Bookmark className="w-4 h-4" />
                <span>Pastoral Reflection · {activeItem.dayOfWeek}</span>
              </div>

              <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                "{activeItem.reflectionTitle}"
              </h4>

              <p className="text-xs sm:text-sm text-[#D5CBC0] leading-relaxed font-light">
                {activeItem.reflectionText}
              </p>

              <div className="pt-3 border-t border-[#3A2D30] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#9B8F82]">
                <span className="font-medium text-[#E5DCD3]">Reflected by: {activeItem.author}</span>
                <span>St. Michael Parish Pastoral Team, Babessi</span>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};
