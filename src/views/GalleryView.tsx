import React, { useState } from 'react';
import { useParish } from '../context/ParishContext';
import { GalleryItem } from '../types';
import { Image, Tag, Calendar, Maximize2 } from 'lucide-react';

interface GalleryViewProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onOpenLightbox }) => {
  const { gallery } = useParish();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Photos' },
    { key: 'Holy Mass', label: 'Holy Mass' },
    { key: 'Parish Feast', label: 'Patronal Feast' },
    { key: 'Community Outreach', label: 'Community & Choir' },
  ];

  const filteredGallery = gallery.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7A1C28]">
          <Image className="w-4 h-4" />
          <span>Sacred Moments & Community Celebrations</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E]">
          Parish Photo Gallery
        </h1>
        <p className="text-sm sm:text-base text-[#615950] font-lora italic">
          Glimpses of divine worship, patronal festivities, choir praise, and parish life in Babessi.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-[#7A1C28] text-white shadow-sm'
                : 'bg-white text-[#52493F] border border-[#E7DFD5] hover:bg-[#F7F4EE]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenLightbox(item)}
            className="group relative bg-white border border-[#E7DFD5] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="h-72 sm:h-80 overflow-hidden relative bg-[#1E1819]">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <div className="flex items-center gap-2 text-[11px] text-[#D4AF37] font-semibold uppercase tracking-wider">
                  <span>{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{item.date}</span>
                </div>
                <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="p-5 bg-white border-t border-[#F0EAE1]">
              <p className="text-xs text-[#52493F] font-lora italic leading-relaxed">
                "{item.caption}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Safeguarding & Authorized Photos Notice */}
      <div className="p-5 bg-[#FAF7F2] border border-[#E2D9CE] rounded-2xl text-xs text-[#695F53] leading-relaxed max-w-3xl mx-auto text-center space-y-1">
        <p className="font-semibold text-[#1E1E1E]">Parish Safeguarding & Media Policy</p>
        <p>
          Photographs published on this official parish website comply with Catholic diocesan pastoral guidelines and child safeguarding standards. Authorized administrators may upload official parish event photos via the CMS.
        </p>
      </div>

    </div>
  );
};
