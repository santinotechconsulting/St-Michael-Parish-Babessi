import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { ParishEvent } from '../types';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface EventsViewProps {
  onSelectEventForRSVP: (event: ParishEvent) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onSelectEventForRSVP }) => {
  const { events, showToast } = useParish();
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const categories = [
    { key: 'all', label: 'All Events' },
    { key: 'Liturgy', label: 'Liturgy & Sacraments' },
    { key: 'Feast', label: 'Patronal Feasts' },
    { key: 'Retreat', label: 'Retreats & Recollections' },
    { key: 'Youth', label: 'Youth Rallies' },
  ];

  const filteredEvents = events.filter((e) => {
    if (!e.isPublished) return false;
    if (selectedCategory === 'all') return true;
    return e.category === selectedCategory;
  });

  // Calendar generation helpers
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayIndex = new Date(selectedYear, selectedMonth, 1).getDay();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  // iCal download function for calendar export
  const downloadIcs = (event: ParishEvent) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//St. Michael Parish Babessi//Parish Calendar//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
      `LOCATION:${event.venue}`,
      `DTSTART:${event.date.replace(/-/g, '')}T090000Z`,
      `DTEND:${event.date.replace(/-/g, '')}T120000Z`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Event calendar file downloaded', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
          <CalendarIcon className="w-4 h-4" />
          <span>Liturgical & Community Gatherings</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
          Parish Events Calendar
        </h1>
        <p className="text-sm sm:text-base text-[#615950] font-lora italic">
          Plan ahead for upcoming Masses, retreats, youth conventions, and feast day celebrations.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#E7DFD5] p-4 rounded-2xl shadow-sm">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-[#7A1C28] text-white shadow-sm'
                  : 'bg-[#FAF7F2] text-[#554D44] hover:bg-[#EAE2D7]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="inline-flex p-1 bg-[#F0EAE1] rounded-xl border border-[#DCD3C7]">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-[#7A1C28] shadow-sm'
                : 'text-[#615950] hover:text-[#1E1E1E]'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'calendar'
                ? 'bg-white text-[#7A1C28] shadow-sm'
                : 'text-[#615950] hover:text-[#1E1E1E]'
            }`}
          >
            Monthly Calendar
          </button>
        </div>

      </div>

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#7A1C28]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#7A1C28] bg-[#FAF7F2] px-3 py-1 rounded-md border border-[#EAE2D7]">
                      {evt.category}
                    </span>
                    <span className="tabular-nums font-semibold text-[#1E1E1E] flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
                      {evt.date}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xl font-bold text-[#1E1E1E]">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#52493F] leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="space-y-2 pt-2 text-xs text-[#6B635A] border-t border-[#F0EAE1]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#7A1C28] shrink-0" />
                      <span>{evt.startTime} {evt.endTime ? `– ${evt.endTime}` : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#7A1C28] shrink-0" />
                      <span>{evt.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#7A1C28] shrink-0" />
                      <span>Organizer: {evt.organizer}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#F0EAE1] mt-6 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => downloadIcs(evt)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B635A] hover:text-[#7A1C28] transition-colors cursor-pointer"
                    title="Add to Google / Apple Calendar"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export to Calendar (.ics)</span>
                  </button>

                  {evt.registrationRequired ? (
                    <button
                      onClick={() => onSelectEventForRSVP(evt)}
                      className="px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-sm transition-colors cursor-pointer"
                    >
                      RSVP / Register
                    </button>
                  ) : (
                    <span className="text-xs text-[#8A7F73] italic">
                      Open to all parishioners
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#E7DFD5] p-8">
              <CalendarIcon className="w-8 h-8 text-[#8A7F73] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#1E1E1E]">No events found in this category.</p>
            </div>
          )}
        </div>
      )}

      {/* MONTHLY CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 animate-in fade-in duration-200">
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between">
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1E1E1E]">
              {monthNames[selectedMonth]} {selectedYear}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-lg border border-[#E7DFD5] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-lg border border-[#E7DFD5] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                aria-label="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center font-cinzel text-xs font-bold text-[#7A1C28] border-b border-[#E7DFD5] pb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank leading days */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`blank-${i}`} className="min-h-[70px] sm:min-h-[90px] p-2 bg-[#FAF7F2]/40 rounded-xl" />
            ))}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const dayEvents = events.filter((e) => e.isPublished && e.date === dateStr);

              return (
                <div
                  key={`day-${dayNum}`}
                  className={`min-h-[70px] sm:min-h-[90px] p-2 rounded-xl border transition-all flex flex-col justify-between ${
                    dayEvents.length > 0
                      ? 'border-[#7A1C28]/40 bg-[#FAF7F2]'
                      : 'border-[#F0EAE1] bg-white'
                  }`}
                >
                  <span className="font-mono text-xs font-semibold text-[#1E1E1E]">
                    {dayNum}
                  </span>

                  <div className="space-y-1">
                    {dayEvents.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => onSelectEventForRSVP(evt)}
                        className="text-[10px] font-medium bg-[#7A1C28] text-white p-1 rounded truncate cursor-pointer hover:bg-[#63141F]"
                        title={evt.title}
                      >
                        {evt.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-[#7A7167] text-center pt-2">
            Click on any highlighted calendar event to view particulars and reserve your attendance.
          </p>

        </div>
      )}

    </div>
  );
};
