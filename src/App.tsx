import React, { useState } from 'react';
import { ParishProvider } from './context/ParishContext';
import {
  NavigationTab,
  ParishEvent,
  MinistryGroup,
  GalleryItem,
  SupportProject,
  DonationTransaction
} from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { MassIntentionModal } from './components/MassIntentionModal';
import { PrayerRequestModal } from './components/PrayerRequestModal';
import { EventRegisterModal } from './components/EventRegisterModal';
import { MinistryJoinModal } from './components/MinistryJoinModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { LightboxModal } from './components/LightboxModal';
import { DonationPaymentModal } from './components/DonationPaymentModal';
import { DonationReceiptModal } from './components/DonationReceiptModal';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { MassAndSacramentsView } from './views/MassAndSacramentsView';
import { MinistriesView } from './views/MinistriesView';
import { NewsView } from './views/NewsView';
import { EventsView } from './views/EventsView';
import { GalleryView } from './views/GalleryView';
import { SupportView } from './views/SupportView';
import { ContactView } from './views/ContactView';
import { AdminDashboardView } from './views/AdminDashboardView';

const ParishApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');

  // Modals state
  const [intentionModalOpen, setIntentionModalOpen] = useState(false);
  const [prayerModalOpen, setPrayerModalOpen] = useState(false);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [rsvpEvent, setRsvpEvent] = useState<ParishEvent | null>(null);
  const [joinMinistry, setJoinMinistry] = useState<MinistryGroup | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Online Payment & Receipt states
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentTargetProject, setPaymentTargetProject] = useState<SupportProject | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<DonationTransaction | null>(null);

  const handleOpenPayment = (project?: SupportProject) => {
    setPaymentTargetProject(project || null);
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (transaction: DonationTransaction) => {
    setActiveReceipt(transaction);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1E1E]">
      
      {/* Top Bar Contract Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAdminLogin={() => setAdminLoginModalOpen(true)}
        onOpenIntentionModal={() => setIntentionModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            setCurrentTab={setCurrentTab}
            onOpenIntentionModal={() => setIntentionModalOpen(true)}
            onOpenPrayerModal={() => setPrayerModalOpen(true)}
            onSelectEventForRSVP={(evt) => setRsvpEvent(evt)}
          />
        )}

        {currentTab === 'about' && <AboutView />}

        {currentTab === 'mass-sacraments' && (
          <MassAndSacramentsView
            onOpenIntentionModal={() => setIntentionModalOpen(true)}
            onOpenContactOffice={() => setCurrentTab('contact')}
          />
        )}

        {currentTab === 'ministries' && (
          <MinistriesView
            onJoinMinistry={(ministry) => setJoinMinistry(ministry)}
          />
        )}

        {currentTab === 'news' && <NewsView />}

        {currentTab === 'events' && (
          <EventsView
            onSelectEventForRSVP={(evt) => setRsvpEvent(evt)}
          />
        )}

        {currentTab === 'gallery' && (
          <GalleryView
            onOpenLightbox={(item) => setLightboxItem(item)}
          />
        )}

        {currentTab === 'support' && (
          <SupportView
            onOpenPaymentModal={handleOpenPayment}
          />
        )}

        {currentTab === 'contact' && (
          <ContactView
            onOpenIntentionModal={() => setIntentionModalOpen(true)}
            onOpenPrayerModal={() => setPrayerModalOpen(true)}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboardView
            onLogout={() => setCurrentTab('home')}
            onViewReceipt={(txn) => setActiveReceipt(txn)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        onOpenAdminLogin={() => setAdminLoginModalOpen(true)}
        onOpenIntentionModal={() => setIntentionModalOpen(true)}
        onOpenPrayerModal={() => setPrayerModalOpen(true)}
      />

      {/* Interactive Modals */}
      <MassIntentionModal
        isOpen={intentionModalOpen}
        onClose={() => setIntentionModalOpen(false)}
      />

      <PrayerRequestModal
        isOpen={prayerModalOpen}
        onClose={() => setPrayerModalOpen(false)}
      />

      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onSuccess={() => setCurrentTab('admin')}
      />

      <EventRegisterModal
        event={rsvpEvent}
        onClose={() => setRsvpEvent(null)}
      />

      <MinistryJoinModal
        ministry={joinMinistry}
        onClose={() => setJoinMinistry(null)}
      />

      <LightboxModal
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />

      {/* Payment Gateway Modal */}
      <DonationPaymentModal
        isOpen={paymentModalOpen}
        project={paymentTargetProject}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      {/* Official Donation Receipt Modal */}
      <DonationReceiptModal
        transaction={activeReceipt}
        onClose={() => setActiveReceipt(null)}
      />

      {/* Global Toast Notifications */}
      <ToastContainer />

    </div>
  );
};

export default function App() {
  return (
    <ParishProvider>
      <ParishApp />
    </ParishProvider>
  );
}
