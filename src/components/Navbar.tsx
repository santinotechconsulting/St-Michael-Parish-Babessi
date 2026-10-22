import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { useParish } from '../context/ParishContext';
import { Cross, Menu, X, ShieldCheck, Heart, Lock } from 'lucide-react';

interface NavbarProps {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  onOpenAdminLogin: () => void;
  onOpenIntentionModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAdminLogin,
  onOpenIntentionModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin, logoutAdmin } = useParish();

  const navLinks: { tab: NavigationTab; label: string }[] = [
    { tab: 'home', label: 'Home' },
    { tab: 'about', label: 'About' },
    { tab: 'mass-sacraments', label: 'Mass & Sacraments' },
    { tab: 'ministries', label: 'Ministries' },
    { tab: 'news', label: 'News' },
    { tab: 'events', label: 'Calendar' },
    { tab: 'gallery', label: 'Gallery' },
    { tab: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DFD5] transition-all">
      {/* Liturgical ribbon top notice */}
      <div className="bg-[#7A1C28] text-[#F7F4EE] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-sans">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="font-medium tracking-wide">Archdiocese of Bamenda · Ndop Deanery · Babessi, Cameroon</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-[#EAE2D7]">
            <button
              onClick={onOpenIntentionModal}
              className="hover:text-[#D4AF37] underline underline-offset-2 transition-colors cursor-pointer"
            >
              Request Mass Intention
            </button>
            <span aria-hidden="true" className="text-[#A3525D]">·</span>
            <span>Feast of St. Michael: Sept 29</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar strictly obeying Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element with sacred cross insignia) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-[#7A1C28] flex items-center justify-center text-[#D4AF37] shadow-sm group-hover:bg-[#63141F] transition-colors">
              <Cross className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-tight text-[#1E1E1E] whitespace-nowrap group-hover:text-[#7A1C28] transition-colors">
                St. Michael Parish
              </span>
              <span className="text-[11px] font-medium tracking-widest uppercase text-[#7A1C28] -mt-0.5">
                Babessi, Cameroon
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Single-line, unboxed, hover underline) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4A4540]">
            {navLinks.map((item) => {
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#7A1C28] font-semibold'
                      : 'hover:text-[#7A1C28]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7A1C28] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Admin portal trigger */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('support')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm ${
                currentTab === 'support'
                  ? 'bg-[#63141F] text-white ring-2 ring-[#D4AF37]'
                  : 'bg-[#7A1C28] text-white hover:bg-[#63141F]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
              <span>Support Parish</span>
            </button>

            {isAdmin ? (
              <div className="flex items-center gap-2 border-l border-[#E2D9CE] pl-3">
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                    currentTab === 'admin'
                      ? 'bg-[#EAE2D7] text-[#7A1C28]'
                      : 'bg-[#F2ECE3] text-[#4A4540] hover:text-[#7A1C28]'
                  }`}
                  title="Parish Admin CMS"
                >
                  <ShieldCheck className="w-4 h-4 text-[#7A1C28]" />
                  <span>CMS Portal</span>
                </button>
                <button
                  onClick={logoutAdmin}
                  className="text-xs text-[#7A1C28] hover:underline cursor-pointer"
                  title="Sign out of Admin"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-2 text-[#6D655E] hover:text-[#7A1C28] hover:bg-[#F2ECE3] rounded-lg transition-colors cursor-pointer"
                title="Parish Priest & Council Admin Login"
                aria-label="Admin Login"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('support')}
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[#7A1C28] text-white cursor-pointer"
            >
              Support
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#332F2B] hover:bg-[#EAE2D7] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7DFD5] bg-[#FAF7F2] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#EAE2D7] text-[#7A1C28] font-bold'
                      : 'text-[#4A4540] hover:bg-[#F2ECE3]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-3 border-t border-[#E7DFD5] flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenIntentionModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 px-4 rounded-lg text-xs font-semibold border border-[#7A1C28] text-[#7A1C28] hover:bg-[#7A1C28]/5 cursor-pointer"
              >
                Request Holy Mass Intention
              </button>

              <button
                onClick={() => handleNavClick('support')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] text-white hover:bg-[#63141F] cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current text-[#D4AF37]" />
                <span>Support the Parish & Projects</span>
              </button>

              <div className="pt-2 flex justify-between items-center text-xs text-[#6D655E]">
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="font-semibold text-[#7A1C28] underline"
                    >
                      Open Admin Dashboard
                    </button>
                    <button onClick={logoutAdmin} className="text-red-700">
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      onOpenAdminLogin();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 text-[#6D655E] hover:text-[#7A1C28]"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorized Admin Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
