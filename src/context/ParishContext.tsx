import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ParishInfo,
  MassSchedule,
  SacramentInfo,
  MinistryGroup,
  Announcement,
  ParishEvent,
  EventRegistration,
  SupportProject,
  DonationPledge,
  DonationTransaction,
  DonationFrequency,
  PaymentGateway,
  AdminUser,
  AdminRole,
  AdminPermission,
  MediaUploadItem,
  MassIntention,
  PrayerRequest,
  ContactMessage,
  GalleryItem,
  ScriptureReflection,
  DailyLiturgyAndSaint
} from '../types';
import {
  initialParishInfo,
  initialMassSchedules,
  initialSacraments,
  initialMinistries,
  initialAnnouncements,
  initialEvents,
  initialProjects,
  initialGallery,
  initialScriptureReflection,
  initialWeeklyLiturgyAndSaints,
  initialAdminUsers,
  initialTransactions
} from '../data/defaultData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface ParishContextType {
  parishInfo: ParishInfo;
  massSchedules: MassSchedule[];
  sacraments: SacramentInfo[];
  ministries: MinistryGroup[];
  announcements: Announcement[];
  events: ParishEvent[];
  eventRegistrations: EventRegistration[];
  projects: SupportProject[];
  donationPledges: DonationPledge[];
  transactions: DonationTransaction[];
  massIntentions: MassIntention[];
  prayerRequests: PrayerRequest[];
  contactMessages: ContactMessage[];
  gallery: GalleryItem[];
  mediaUploads: MediaUploadItem[];
  scriptureReflection: ScriptureReflection;
  weeklyLiturgy: DailyLiturgyAndSaint[];
  updateDailyLiturgy: (id: string, updated: Partial<DailyLiturgyAndSaint>) => void;
  
  // Admin auth & RBAC
  isAdmin: boolean;
  currentAdminUser: AdminUser | null;
  adminUsers: AdminUser[];
  loginAdmin: (password: string, email?: string) => boolean;
  switchAdminUser: (userId: string) => void;
  logoutAdmin: () => void;
  canPerform: (permission: AdminPermission) => boolean;
  addAdminUser: (user: Omit<AdminUser, 'id' | 'createdAt'>) => void;
  updateAdminUser: (id: string, user: Partial<AdminUser>) => void;
  deleteAdminUser: (id: string) => void;
  toggleAdminUserActive: (id: string) => void;

  // Notification
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // CRUD Parish Info
  updateParishInfo: (info: Partial<ParishInfo>) => void;
  updateScriptureReflection: (reflection: ScriptureReflection) => void;

  // CRUD Mass Schedules
  addMassSchedule: (schedule: Omit<MassSchedule, 'id'>) => void;
  updateMassSchedule: (id: string, schedule: Partial<MassSchedule>) => void;
  deleteMassSchedule: (id: string) => void;

  // CRUD Sacraments
  updateSacrament: (id: string, sacrament: Partial<SacramentInfo>) => void;

  // CRUD Ministries
  addMinistry: (ministry: Omit<MinistryGroup, 'id'>) => void;
  updateMinistry: (id: string, ministry: Partial<MinistryGroup>) => void;
  deleteMinistry: (id: string) => void;

  // CRUD Announcements
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;

  // CRUD Events
  addEvent: (event: Omit<ParishEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<ParishEvent>) => void;
  deleteEvent: (id: string) => void;
  registerForEvent: (registration: Omit<EventRegistration, 'id' | 'createdAt'>) => void;

  // CRUD Projects & Online Payments
  addProject: (project: Omit<SupportProject, 'id'>) => void;
  updateProject: (id: string, project: Partial<SupportProject>) => void;
  deleteProject: (id: string) => void;
  pledgeDonation: (pledge: Omit<DonationPledge, 'id' | 'createdAt'>) => void;
  processDonation: (data: {
    projectId: string;
    projectTitle: string;
    donorName: string;
    donorEmail: string;
    donorPhone: string;
    amountXAF: number;
    frequency: DonationFrequency;
    gateway: PaymentGateway;
    intention?: string;
    isAnonymous: boolean;
    paymentDetails?: {
      phoneNumber?: string;
      cardLast4?: string;
      cardBrand?: string;
      paypalEmail?: string;
      ussdRef?: string;
    };
  }) => Promise<DonationTransaction>;
  updateTransactionStatus: (id: string, status: DonationTransaction['status']) => void;

  // Media Uploads
  uploadMedia: (file: { title: string; category: string; url: string; caption?: string; fileSize?: string }) => void;
  deleteMediaUpload: (id: string) => void;

  // Parishioner Requests
  submitMassIntention: (intention: Omit<MassIntention, 'id' | 'status' | 'createdAt'>) => void;
  updateMassIntentionStatus: (id: string, status: MassIntention['status']) => void;
  submitPrayerRequest: (request: Omit<PrayerRequest, 'id' | 'createdAt'>) => void;
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => void;
  markContactMessageRead: (id: string) => void;

  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  // Data management
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;

  // Supabase config state
  supabaseConfig: { url: string; anonKey: string; isConnected: boolean };
  saveSupabaseConfig: (url: string, anonKey: string) => void;
}

const ParishContext = createContext<ParishContextType | undefined>(undefined);

const STORAGE_KEY = 'stmichael_parish_data_v5';
const ADMIN_USER_KEY = 'stmichael_admin_user_v5';
const SUPABASE_CONFIG_KEY = 'stmichael_supabase_config_v5';

export const ParishProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parishInfo, setParishInfo] = useState<ParishInfo>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_info`);
      return saved ? JSON.parse(saved) : initialParishInfo;
    } catch {
      return initialParishInfo;
    }
  });

  const [massSchedules, setMassSchedules] = useState<MassSchedule[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_mass`);
      return saved ? JSON.parse(saved) : initialMassSchedules;
    } catch {
      return initialMassSchedules;
    }
  });

  const [sacraments, setSacraments] = useState<SacramentInfo[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_sacraments`);
      return saved ? JSON.parse(saved) : initialSacraments;
    } catch {
      return initialSacraments;
    }
  });

  const [ministries, setMinistries] = useState<MinistryGroup[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_ministries`);
      return saved ? JSON.parse(saved) : initialMinistries;
    } catch {
      return initialMinistries;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_announcements`);
      return saved ? JSON.parse(saved) : initialAnnouncements;
    } catch {
      return initialAnnouncements;
    }
  });

  const [events, setEvents] = useState<ParishEvent[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
      return saved ? JSON.parse(saved) : initialEvents;
    } catch {
      return initialEvents;
    }
  });

  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_registrations`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [projects, setProjects] = useState<SupportProject[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [donationPledges, setDonationPledges] = useState<DonationPledge[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_pledges`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [transactions, setTransactions] = useState<DonationTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_transactions`);
      return saved ? JSON.parse(saved) : initialTransactions;
    } catch {
      return initialTransactions;
    }
  });

  const [massIntentions, setMassIntentions] = useState<MassIntention[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_intentions`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_prayers`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_messages`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_gallery`);
      return saved ? JSON.parse(saved) : initialGallery;
    } catch {
      return initialGallery;
    }
  });

  const [mediaUploads, setMediaUploads] = useState<MediaUploadItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_media`);
      return saved ? JSON.parse(saved) : [
        {
          id: 'med-1',
          title: 'Sanctuary Altar Photo',
          category: 'Holy Mass',
          url: '/src/assets/images/hero_church_parish_1792699770017.jpg',
          fileSize: '420 KB',
          uploadedBy: 'Fr. Parish Priest',
          uploadedAt: '2026-10-15'
        },
        {
          id: 'med-2',
          title: 'Parish Choir & Youth Fellowship',
          category: 'Youth Activities',
          url: '/src/assets/images/parish_community_gathering_1792699771967.jpg',
          fileSize: '512 KB',
          uploadedBy: 'Parish Secretary',
          uploadedAt: '2026-10-18'
        }
      ];
    } catch {
      return [];
    }
  });

  const [scriptureReflection, setScriptureReflection] = useState<ScriptureReflection>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_reflection`);
      return saved ? JSON.parse(saved) : initialScriptureReflection;
    } catch {
      return initialScriptureReflection;
    }
  });

  const [weeklyLiturgy, setWeeklyLiturgy] = useState<DailyLiturgyAndSaint[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_weekly_liturgy`);
      return saved ? JSON.parse(saved) : initialWeeklyLiturgyAndSaints;
    } catch {
      return initialWeeklyLiturgyAndSaints;
    }
  });

  // Admin users state (RBAC)
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_admin_users`);
      return saved ? JSON.parse(saved) : initialAdminUsers;
    } catch {
      return initialAdminUsers;
    }
  });

  // Current logged in admin user
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = sessionStorage.getItem(ADMIN_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAdmin = currentAdminUser !== null;

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [supabaseConfig, setSupabaseConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(SUPABASE_CONFIG_KEY);
      return saved ? JSON.parse(saved) : { url: '', anonKey: '', isConnected: false };
    } catch {
      return { url: '', anonKey: '', isConnected: false };
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_info`, JSON.stringify(parishInfo));
  }, [parishInfo]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_mass`, JSON.stringify(massSchedules));
  }, [massSchedules]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_sacraments`, JSON.stringify(sacraments));
  }, [sacraments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_ministries`, JSON.stringify(ministries));
  }, [ministries]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_announcements`, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_registrations`, JSON.stringify(eventRegistrations));
  }, [eventRegistrations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_pledges`, JSON.stringify(donationPledges));
  }, [donationPledges]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_transactions`, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_intentions`, JSON.stringify(massIntentions));
  }, [massIntentions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_prayers`, JSON.stringify(prayerRequests));
  }, [prayerRequests]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_messages`, JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_media`, JSON.stringify(mediaUploads));
  }, [mediaUploads]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_admin_users`, JSON.stringify(adminUsers));
  }, [adminUsers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_reflection`, JSON.stringify(scriptureReflection));
  }, [scriptureReflection]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_weekly_liturgy`, JSON.stringify(weeklyLiturgy));
  }, [weeklyLiturgy]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // RBAC Permission Evaluator
  const canPerform = (permission: AdminPermission): boolean => {
    if (!currentAdminUser || !currentAdminUser.isActive) return false;
    const role = currentAdminUser.role;

    // Super Admin has all privileges
    if (role === 'SUPER_ADMIN') return true;

    switch (permission) {
      case 'MANAGE_USERS':
      case 'MANAGE_SETTINGS':
        return false;

      case 'MANAGE_FINANCES':
        return role === 'FINANCE_OFFICER';

      case 'MANAGE_CONTENT':
      case 'UPLOAD_MEDIA':
        return role === 'CONTENT_EDITOR';

      case 'MANAGE_LITURGY':
        return role === 'CONTENT_EDITOR' || role === 'LITURGY_COORDINATOR';

      default:
        return false;
    }
  };

  // Admin Auth with Role Matching
  const loginAdmin = (password: string, email?: string): boolean => {
    const cleanedPass = password.trim();

    // Check specific credentials
    if (email) {
      const foundUser = adminUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (foundUser && foundUser.isActive) {
        // Password checks
        const valid = 
          (foundUser.role === 'SUPER_ADMIN' && (cleanedPass === 'priest2026' || cleanedPass === 'stmichael')) ||
          (foundUser.role === 'CONTENT_EDITOR' && (cleanedPass === 'secretary2026' || cleanedPass === 'stmichael')) ||
          (foundUser.role === 'FINANCE_OFFICER' && (cleanedPass === 'finance2026' || cleanedPass === 'stmichael')) ||
          (foundUser.role === 'LITURGY_COORDINATOR' && (cleanedPass === 'liturgy2026' || cleanedPass === 'stmichael'));

        if (valid) {
          const updatedUser: AdminUser = {
            ...foundUser,
            lastLoginAt: new Date().toISOString()
          };
          setCurrentAdminUser(updatedUser);
          sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(updatedUser));
          showToast(`Welcome ${foundUser.name} (${foundUser.title})`, 'success');
          return true;
        }
      }
    }

    // Master pass fallback
    if (cleanedPass === 'stmichael' || cleanedPass === 'babessi2026') {
      const superAdmin = adminUsers.find((u) => u.role === 'SUPER_ADMIN') || adminUsers[0];
      const updatedUser: AdminUser = {
        ...superAdmin,
        lastLoginAt: new Date().toISOString()
      };
      setCurrentAdminUser(updatedUser);
      sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(updatedUser));
      showToast(`Logged in as Administrator (${superAdmin.name})`, 'success');
      return true;
    }

    showToast('Invalid administrative passcode or email credentials', 'error');
    return false;
  };

  const switchAdminUser = (userId: string) => {
    const user = adminUsers.find((u) => u.id === userId);
    if (user && user.isActive) {
      setCurrentAdminUser(user);
      sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
      showToast(`Switched active profile to: ${user.name} (${user.role})`, 'info');
    }
  };

  const logoutAdmin = () => {
    setCurrentAdminUser(null);
    sessionStorage.removeItem(ADMIN_USER_KEY);
    showToast('Signed out of parish administration portal', 'info');
  };

  // User Management (RBAC)
  const addAdminUser = (user: Omit<AdminUser, 'id' | 'createdAt'>) => {
    if (!canPerform('MANAGE_USERS')) {
      showToast('Access Denied: Only Super Admin can manage user accounts', 'error');
      return;
    }
    const newUser: AdminUser = {
      ...user,
      id: 'usr-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAdminUsers((prev) => [...prev, newUser]);
    showToast(`Account created for ${newUser.name}`, 'success');
  };

  const updateAdminUser = (id: string, user: Partial<AdminUser>) => {
    if (!canPerform('MANAGE_USERS')) {
      showToast('Access Denied: Only Super Admin can edit user accounts', 'error');
      return;
    }
    setAdminUsers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...user } : item))
    );
    showToast('User account updated', 'success');
  };

  const deleteAdminUser = (id: string) => {
    if (!canPerform('MANAGE_USERS')) {
      showToast('Access Denied: Only Super Admin can delete user accounts', 'error');
      return;
    }
    if (adminUsers.length <= 1) {
      showToast('Cannot delete the last remaining administrator account', 'error');
      return;
    }
    setAdminUsers((prev) => prev.filter((item) => item.id !== id));
    showToast('User account deleted', 'info');
  };

  const toggleAdminUserActive = (id: string) => {
    if (!canPerform('MANAGE_USERS')) {
      showToast('Access Denied: Only Super Admin can toggle account status', 'error');
      return;
    }
    setAdminUsers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    );
    showToast('User account status updated', 'info');
  };

  // Online Payment Gateway Processing (MTN MoMo, Orange Money, Stripe, PayPal)
  const processDonation = async (data: {
    projectId: string;
    projectTitle: string;
    donorName: string;
    donorEmail: string;
    donorPhone: string;
    amountXAF: number;
    frequency: DonationFrequency;
    gateway: PaymentGateway;
    intention?: string;
    isAnonymous: boolean;
    paymentDetails?: {
      phoneNumber?: string;
      cardLast4?: string;
      cardBrand?: string;
      paypalEmail?: string;
      ussdRef?: string;
    };
  }): Promise<DonationTransaction> => {
    // Generate secure unique transaction reference & receipt
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix = 
      data.gateway === 'MTN Mobile Money' ? 'MOMO' :
      data.gateway === 'Orange Money' ? 'OM' :
      data.gateway === 'Stripe (Cards)' ? 'STRIPE' :
      data.gateway === 'PayPal' ? 'PP' : 'WIRE';

    const reference = `${prefix}-2026-${randomSuffix}`;
    const receiptNumber = `REC-2026-${randomSuffix}`;

    const newTransaction: DonationTransaction = {
      id: 'txn-' + timestamp,
      reference,
      projectId: data.projectId,
      projectTitle: data.projectTitle,
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      donorPhone: data.donorPhone,
      amountXAF: data.amountXAF,
      frequency: data.frequency,
      gateway: data.gateway,
      status: 'completed',
      intention: data.intention,
      isAnonymous: data.isAnonymous,
      createdAt: new Date().toISOString(),
      receiptNumber,
      paymentDetails: data.paymentDetails
    };

    // Update transactions ledger
    setTransactions((prev) => [newTransaction, ...prev]);

    // Update project raised progress
    setProjects((prev) =>
      prev.map((p) =>
        p.id === data.projectId
          ? { ...p, raisedAmountXAF: p.raisedAmountXAF + data.amountXAF }
          : p
      )
    );

    showToast(`Payment of ${data.amountXAF.toLocaleString()} XAF confirmed via ${data.gateway}! Receipt: ${receiptNumber}`, 'success');
    return newTransaction;
  };

  const updateTransactionStatus = (id: string, status: DonationTransaction['status']) => {
    if (!canPerform('MANAGE_FINANCES')) {
      showToast('Access Denied: Only Finance Officers can modify transaction statuses', 'error');
      return;
    }
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    showToast(`Transaction ${id} marked as ${status}`, 'info');
  };

  // Media Uploads
  const uploadMedia = (file: { title: string; category: string; url: string; caption?: string; fileSize?: string }) => {
    if (!canPerform('UPLOAD_MEDIA')) {
      showToast('Access Denied: You do not have media upload privileges', 'error');
      return;
    }
    const newItem: MediaUploadItem = {
      id: 'med-' + Date.now(),
      title: file.title,
      category: file.category,
      url: file.url,
      caption: file.caption,
      fileSize: file.fileSize || '350 KB',
      uploadedBy: currentAdminUser?.name || 'Administrator',
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setMediaUploads((prev) => [newItem, ...prev]);

    // Also add to public Gallery
    const newGal: GalleryItem = {
      id: 'gal-' + Date.now(),
      title: file.title,
      category: file.category as any,
      mediaType: 'image',
      url: file.url,
      caption: file.caption || file.title,
      date: new Date().toISOString().split('T')[0]
    };
    setGallery((prev) => [newGal, ...prev]);

    showToast(`Media "${file.title}" uploaded and published to gallery`, 'success');
  };

  const deleteMediaUpload = (id: string) => {
    if (!canPerform('UPLOAD_MEDIA')) {
      showToast('Access Denied: You do not have media delete privileges', 'error');
      return;
    }
    setMediaUploads((prev) => prev.filter((m) => m.id !== id));
    showToast('Media asset removed', 'info');
  };

  // Parish info
  const updateParishInfo = (info: Partial<ParishInfo>) => {
    if (!canPerform('MANAGE_SETTINGS')) {
      showToast('Access Denied: Only Super Admin can modify parish identity settings', 'error');
      return;
    }
    setParishInfo((prev) => ({ ...prev, ...info }));
    showToast('Parish information updated successfully', 'success');
  };

  const updateScriptureReflection = (reflection: ScriptureReflection) => {
    if (!canPerform('MANAGE_LITURGY')) {
      showToast('Access Denied: Liturgical permissions required to update Scripture reflection', 'error');
      return;
    }
    setScriptureReflection(reflection);
    showToast('Scripture reflection updated', 'success');
  };

  const updateDailyLiturgy = (id: string, updated: Partial<DailyLiturgyAndSaint>) => {
    if (!canPerform('MANAGE_LITURGY') && !canPerform('MANAGE_CONTENT')) {
      showToast('Access Denied: Liturgical permissions required to update daily readings and saints', 'error');
      return;
    }
    setWeeklyLiturgy((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    showToast('Daily readings & saint of the day updated', 'success');
  };

  // Mass schedules
  const addMassSchedule = (schedule: Omit<MassSchedule, 'id'>) => {
    if (!canPerform('MANAGE_LITURGY')) {
      showToast('Access Denied: Liturgical permissions required', 'error');
      return;
    }
    const newSchedule: MassSchedule = {
      ...schedule,
      id: 'mass-' + Date.now()
    };
    setMassSchedules((prev) => [...prev, newSchedule]);
    showToast('Mass schedule entry added', 'success');
  };

  const updateMassSchedule = (id: string, schedule: Partial<MassSchedule>) => {
    if (!canPerform('MANAGE_LITURGY')) {
      showToast('Access Denied: Liturgical permissions required', 'error');
      return;
    }
    setMassSchedules((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...schedule } : item))
    );
    showToast('Mass schedule updated', 'success');
  };

  const deleteMassSchedule = (id: string) => {
    if (!canPerform('MANAGE_LITURGY')) {
      showToast('Access Denied: Liturgical permissions required', 'error');
      return;
    }
    setMassSchedules((prev) => prev.filter((item) => item.id !== id));
    showToast('Mass schedule removed', 'info');
  };

  // Sacraments
  const updateSacrament = (id: string, sacrament: Partial<SacramentInfo>) => {
    if (!canPerform('MANAGE_LITURGY')) {
      showToast('Access Denied: Liturgical permissions required', 'error');
      return;
    }
    setSacraments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...sacrament } : item))
    );
    showToast('Sacramental guidance updated', 'success');
  };

  // Ministries
  const addMinistry = (ministry: Omit<MinistryGroup, 'id'>) => {
    if (!canPerform('MANAGE_CONTENT')) {
      showToast('Access Denied: Content editor permissions required', 'error');
      return;
    }
    const newMin: MinistryGroup = {
      ...ministry,
      id: 'min-' + Date.now()
    };
    setMinistries((prev) => [...prev, newMin]);
    showToast('New ministry group registered', 'success');
  };

  const updateMinistry = (id: string, ministry: Partial<MinistryGroup>) => {
    if (!canPerform('MANAGE_CONTENT')) {
      showToast('Access Denied: Content editor permissions required', 'error');
      return;
    }
    setMinistries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...ministry } : item))
    );
    showToast('Ministry details updated', 'success');
  };

  const deleteMinistry = (id: string) => {
    if (!canPerform('MANAGE_CONTENT')) {
      showToast('Access Denied: Content editor permissions required', 'error');
      return;
    }
    setMinistries((prev) => prev.filter((item) => item.id !== id));
    showToast('Ministry removed', 'info');
  };

  // Announcements
  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    if (!canPerform('MANAGE_CONTENT')) {
      showToast('Access Denied: Content editor permissions required', 'error');
      return;
    }
    const newAnn: Announcement = {
      ...announcement,
      id: 'ann-' + Date.now()
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    showToast('Parish announcement published', 'success');
  };

  const updateAnnouncement = (id: string, announcement: Partial<Announcement>) => {
    if (!canPerform('MANAGE_CONTENT')) {
      showToast('Access Denied: Content editor permissions required', 'error');
      return;
    }
    setAnnouncements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...announcement } : item))
    );
    showToast('Announcement updated', 'success');
  };

  const deleteAnnouncement = (id: string) => {
    if (!canPerform('MANAGE_CONTENT')) {
      showToast('Access Denied: Content editor permissions required', 'error');
      return;
    }
    setAnnouncements((prev) => prev.filter((item) => item.id !== id));
    showToast('Announcement deleted', 'info');
  };

  // Events
  const addEvent = (event: Omit<ParishEvent, 'id'>) => {
    if (!canPerform('MANAGE_CONTENT')) {
      showToast('Access Denied: Content editor permissions required', 'error');
      return;
    }
    const newEvt: ParishEvent = {
      ...event,
      id: 'evt-' + Date.now()
    };
    setEvents((prev) => [...prev, newEvt]);
    showToast('Parish calendar event added', 'success');
  };

  const updateEvent = (id: string, event: Partial<ParishEvent>) => {
    if (!canPerform('MANAGE_CONTENT')) {
      showToast('Access Denied: Content editor permissions required', 'error');
      return;
    }
    setEvents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...event } : item))
    );
    showToast('Event updated', 'success');
  };

  const deleteEvent = (id: string) => {
    if (!canPerform('MANAGE_CONTENT')) {
      showToast('Access Denied: Content editor permissions required', 'error');
      return;
    }
    setEvents((prev) => prev.filter((item) => item.id !== id));
    showToast('Event removed from calendar', 'info');
  };

  const registerForEvent = (reg: Omit<EventRegistration, 'id' | 'createdAt'>) => {
    const newReg: EventRegistration = {
      ...reg,
      id: 'reg-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setEventRegistrations((prev) => [newReg, ...prev]);
    showToast('Registration confirmed! May God bless you.', 'success');
  };

  // Projects
  const addProject = (project: Omit<SupportProject, 'id'>) => {
    if (!canPerform('MANAGE_FINANCES')) {
      showToast('Access Denied: Finance officer permissions required', 'error');
      return;
    }
    const newProj: SupportProject = {
      ...project,
      id: 'proj-' + Date.now()
    };
    setProjects((prev) => [...prev, newProj]);
    showToast('New development project created', 'success');
  };

  const updateProject = (id: string, project: Partial<SupportProject>) => {
    if (!canPerform('MANAGE_FINANCES')) {
      showToast('Access Denied: Finance officer permissions required', 'error');
      return;
    }
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...project } : item))
    );
    showToast('Project progress updated', 'success');
  };

  const deleteProject = (id: string) => {
    if (!canPerform('MANAGE_FINANCES')) {
      showToast('Access Denied: Finance officer permissions required', 'error');
      return;
    }
    setProjects((prev) => prev.filter((item) => item.id !== id));
    showToast('Project removed', 'info');
  };

  const pledgeDonation = (pledge: Omit<DonationPledge, 'id' | 'createdAt'>) => {
    const newPledge: DonationPledge = {
      ...pledge,
      id: 'pledge-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setDonationPledges((prev) => [newPledge, ...prev]);
    setProjects((prev) =>
      prev.map((p) =>
        p.id === pledge.projectId
          ? { ...p, raisedAmountXAF: p.raisedAmountXAF + pledge.amountXAF }
          : p
      )
    );
    showToast('Thank you for your generous pledge and support!', 'success');
  };

  // Intentions & Prayers
  const submitMassIntention = (intention: Omit<MassIntention, 'id' | 'status' | 'createdAt'>) => {
    const newInt: MassIntention = {
      ...intention,
      id: 'int-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setMassIntentions((prev) => [newInt, ...prev]);
    showToast('Mass Intention requested. The Parish Office will schedule it.', 'success');
  };

  const updateMassIntentionStatus = (id: string, status: MassIntention['status']) => {
    if (!canPerform('MANAGE_LITURGY')) {
      showToast('Access Denied: Liturgical permissions required', 'error');
      return;
    }
    setMassIntentions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    showToast(`Mass Intention status updated to ${status}`, 'success');
  };

  const submitPrayerRequest = (request: Omit<PrayerRequest, 'id' | 'createdAt'>) => {
    const newReq: PrayerRequest = {
      ...request,
      id: 'pr-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setPrayerRequests((prev) => [newReq, ...prev]);
    showToast('Prayer request received. Our clergy and community will pray for you.', 'success');
  };

  const submitContactMessage = (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    showToast('Message sent to the Parish Office. We will get back to you.', 'success');
  };

  const markContactMessageRead = (id: string) => {
    setContactMessages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'read' } : item))
    );
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    if (!canPerform('UPLOAD_MEDIA')) {
      showToast('Access Denied: Media upload privileges required', 'error');
      return;
    }
    const newItem: GalleryItem = {
      ...item,
      id: 'gal-' + Date.now()
    };
    setGallery((prev) => [newItem, ...prev]);
    showToast('Photo added to parish gallery', 'success');
  };

  const deleteGalleryItem = (id: string) => {
    if (!canPerform('UPLOAD_MEDIA')) {
      showToast('Access Denied: Media upload privileges required', 'error');
      return;
    }
    setGallery((prev) => prev.filter((item) => item.id !== id));
    showToast('Photo removed from gallery', 'info');
  };

  // JSON Export / Import
  const exportDataJSON = () => {
    const bundle = {
      parishInfo,
      massSchedules,
      sacraments,
      ministries,
      announcements,
      events,
      eventRegistrations,
      projects,
      donationPledges,
      transactions,
      massIntentions,
      prayerRequests,
      contactMessages,
      gallery,
      mediaUploads,
      adminUsers,
      scriptureReflection,
      weeklyLiturgy,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(bundle, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.parishInfo) setParishInfo(data.parishInfo);
      if (data.massSchedules) setMassSchedules(data.massSchedules);
      if (data.sacraments) setSacraments(data.sacraments);
      if (data.ministries) setMinistries(data.ministries);
      if (data.announcements) setAnnouncements(data.announcements);
      if (data.events) setEvents(data.events);
      if (data.eventRegistrations) setEventRegistrations(data.eventRegistrations);
      if (data.projects) setProjects(data.projects);
      if (data.donationPledges) setDonationPledges(data.donationPledges);
      if (data.transactions) setTransactions(data.transactions);
      if (data.massIntentions) setMassIntentions(data.massIntentions);
      if (data.prayerRequests) setPrayerRequests(data.prayerRequests);
      if (data.contactMessages) setContactMessages(data.contactMessages);
      if (data.gallery) setGallery(data.gallery);
      if (data.mediaUploads) setMediaUploads(data.mediaUploads);
      if (data.adminUsers) setAdminUsers(data.adminUsers);
      if (data.scriptureReflection) setScriptureReflection(data.scriptureReflection);
      if (data.weeklyLiturgy) setWeeklyLiturgy(data.weeklyLiturgy);
      showToast('Parish data imported successfully', 'success');
      return true;
    } catch {
      showToast('Invalid JSON backup file', 'error');
      return false;
    }
  };

  const resetToDefaults = () => {
    setParishInfo(initialParishInfo);
    setMassSchedules(initialMassSchedules);
    setSacraments(initialSacraments);
    setMinistries(initialMinistries);
    setAnnouncements(initialAnnouncements);
    setEvents(initialEvents);
    setEventRegistrations([]);
    setProjects(initialProjects);
    setDonationPledges([]);
    setTransactions(initialTransactions);
    setMassIntentions([]);
    setPrayerRequests([]);
    setContactMessages([]);
    setGallery(initialGallery);
    setAdminUsers(initialAdminUsers);
    setScriptureReflection(initialScriptureReflection);
    setWeeklyLiturgy(initialWeeklyLiturgyAndSaints);
    showToast('Reset to default parish records', 'info');
  };

  const saveSupabaseConfig = (url: string, anonKey: string) => {
    const config = { url, anonKey, isConnected: Boolean(url && anonKey) };
    setSupabaseConfig(config);
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(config));
    if (config.isConnected) {
      showToast('Supabase connection parameters saved', 'success');
    } else {
      showToast('Supabase configuration cleared', 'info');
    }
  };

  return (
    <ParishContext.Provider
      value={{
        parishInfo,
        massSchedules,
        sacraments,
        ministries,
        announcements,
        events,
        eventRegistrations,
        projects,
        donationPledges,
        transactions,
        massIntentions,
        prayerRequests,
        contactMessages,
        gallery,
        mediaUploads,
        scriptureReflection,
        weeklyLiturgy,
        updateDailyLiturgy,
        isAdmin,
        currentAdminUser,
        adminUsers,
        loginAdmin,
        switchAdminUser,
        logoutAdmin,
        canPerform,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,
        toggleAdminUserActive,
        toasts,
        showToast,
        removeToast,
        updateParishInfo,
        updateScriptureReflection,
        addMassSchedule,
        updateMassSchedule,
        deleteMassSchedule,
        updateSacrament,
        addMinistry,
        updateMinistry,
        deleteMinistry,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        addEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        addProject,
        updateProject,
        deleteProject,
        pledgeDonation,
        processDonation,
        updateTransactionStatus,
        uploadMedia,
        deleteMediaUpload,
        submitMassIntention,
        updateMassIntentionStatus,
        submitPrayerRequest,
        submitContactMessage,
        markContactMessageRead,
        addGalleryItem,
        deleteGalleryItem,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
        supabaseConfig,
        saveSupabaseConfig
      }}
    >
      {children}
    </ParishContext.Provider>
  );
};

export const useParish = () => {
  const context = useContext(ParishContext);
  if (!context) {
    throw new Error('useParish must be used within a ParishProvider');
  }
  return context;
};
