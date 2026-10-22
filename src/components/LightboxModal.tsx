import React from 'react';
import { GalleryItem } from '../types';
import { X, Calendar, Tag } from 'lucide-react';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[95vh] flex flex-col items-center bg-[#151213] rounded-2xl overflow-hidden border border-[#3A2E31] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
          aria-label="Close image preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full flex-1 flex items-center justify-center overflow-hidden bg-black/40">
          <img
            src={item.url}
            alt={item.title}
            className="max-h-[70vh] w-auto max-w-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="w-full p-6 bg-[#1A1516] text-[#EAE2D7] border-t border-[#3A2E31]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
              {item.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-[#C5A059]">
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                {item.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </span>
            </div>
          </div>
          <p className="text-sm text-[#BDB2A6] font-lora italic leading-relaxed">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
