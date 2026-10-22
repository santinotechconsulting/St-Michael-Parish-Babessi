import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { Announcement } from '../types';
import {
  BookOpen,
  Search,
  Calendar,
  User,
  Printer,
  Share2,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';

export const NewsView: React.FC = () => {
  const { announcements, showToast } = useParish();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<Announcement | null>(null);

  const categories = [
    { key: 'all', label: 'All Notices' },
    { key: 'Sunday Bulletin', label: 'Sunday Bulletin' },
    { key: 'Pastoral Letter', label: 'Pastoral Letters' },
    { key: 'Liturgical Notice', label: 'Liturgical Notices' },
    { key: 'Community Outreach', label: 'Community Outreach' },
  ];

  const filteredAnnouncements = announcements.filter((item) => {
    if (!item.isPublished) return false;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = announcements.find((a) => a.isPublished && a.isFeatured);

  const handleShare = (item: Announcement) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#news-${item.slug}`);
      showToast('Announcement link copied to clipboard', 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
          <BookOpen className="w-4 h-4" />
          <span>Parish Communications & Bulletins</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
          News & Announcements
        </h1>
        <p className="text-sm sm:text-base text-[#615950] font-lora italic">
          Keeping parishioners in Babessi and the diaspora informed and united in truth.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#E7DFD5] p-4 rounded-2xl shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8A7F73] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search bulletins & announcements..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#7A1C28]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
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
      </div>

      {/* Featured Headline Spotlight */}
      {featured && selectedCategory === 'all' && !searchTerm && (
        <div
          onClick={() => setActiveArticle(featured)}
          className="bg-white border border-[#E7DFD5] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
        >
          {featured.featuredImage && (
            <div className="lg:col-span-5 h-64 lg:h-auto overflow-hidden relative">
              <img
                src={featured.featuredImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#7A1C28] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow">
                  Featured Announcement
                </span>
              </div>
            </div>
          )}

          <div className={`p-8 sm:p-10 flex flex-col justify-between space-y-4 ${featured.featuredImage ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-[#877E75]">
                <span className="font-semibold text-[#7A1C28]">{featured.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {featured.date}
                </span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1E1E1E] group-hover:text-[#7A1C28] transition-colors">
                {featured.title}
              </h2>

              <p className="text-sm text-[#52493F] leading-relaxed line-clamp-3">
                {featured.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-[#7A7167]">
              <span>Issued by: {featured.author}</span>
              <div className="flex items-center gap-1 text-[#7A1C28] font-semibold">
                <span>Read Full Announcement</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnnouncements.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveArticle(item)}
            className="bg-white border border-[#E7DFD5] rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#7A1C28]/40 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#877E75]">
                <span className="font-semibold text-[#7A1C28] bg-[#FAF7F2] px-2.5 py-0.5 rounded-md border border-[#EAE2D7]">
                  {item.category}
                </span>
                <span className="tabular-nums flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {item.date}
                </span>
              </div>

              <h3 className="font-cinzel text-lg font-bold text-[#1E1E1E] group-hover:text-[#7A1C28] transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-[#52493F] leading-relaxed line-clamp-3">
                {item.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0EAE1] mt-4 flex items-center justify-between text-xs text-[#7A7167]">
              <span>{item.author}</span>
              <span className="text-[#7A1C28] font-semibold group-hover:underline flex items-center gap-1">
                Read Notice
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#E7DFD5] p-8 space-y-3">
          <BookOpen className="w-8 h-8 text-[#8A7F73] mx-auto" />
          <h3 className="font-cinzel text-lg font-bold text-[#1E1E1E]">No announcements match your search</h3>
          <p className="text-xs text-[#6B635A]">Try selecting another category or clearing search terms.</p>
        </div>
      )}

      {/* Full Article Reader Modal with Print & Share */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-10 space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#E7DFD5] pb-4">
              <div className="flex items-center gap-2 text-xs text-[#877E75]">
                <span className="font-semibold text-[#7A1C28] uppercase tracking-wider">{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{activeArticle.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="p-2 text-[#5E554C] hover:text-[#7A1C28] hover:bg-[#EAE2D7] rounded-lg transition-colors cursor-pointer"
                  title="Print Announcement"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare(activeArticle)}
                  className="p-2 text-[#5E554C] hover:text-[#7A1C28] hover:bg-[#EAE2D7] rounded-lg transition-colors cursor-pointer"
                  title="Copy Link to Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 text-[#5E554C] hover:text-[#7A1C28] hover:bg-[#EAE2D7] rounded-lg transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1E1E1E] leading-snug">
                {activeArticle.title}
              </h2>

              {activeArticle.featuredImage && (
                <div className="rounded-2xl overflow-hidden max-h-72 border border-[#E7DFD5]">
                  <img
                    src={activeArticle.featuredImage}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <p className="font-medium text-sm text-[#2E2822] bg-[#F2EDE4] p-4 rounded-xl border border-[#DDD3C4]">
                {activeArticle.summary}
              </p>

              <div className="text-sm text-[#443C34] leading-relaxed whitespace-pre-line space-y-4 font-light">
                {activeArticle.content}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E7DFD5] flex flex-wrap items-center justify-between text-xs text-[#7A7167]">
              <span>Signed: {activeArticle.author} · St. Michael Parish Babessi</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-xl bg-[#7A1C28] text-white hover:bg-[#63141F] transition-colors cursor-pointer"
              >
                Done Reading
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
