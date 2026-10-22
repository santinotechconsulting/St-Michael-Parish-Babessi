export type NavigationTab = 
  | 'home'
  | 'about'
  | 'mass-sacraments'
  | 'ministries'
  | 'news'
  | 'events'
  | 'gallery'
  | 'support'
  | 'contact'
  | 'admin';

export interface ParishInfo {
  name: string;
  tagline: string;
  denomination: string;
  location: string;
  diocese: string;
  archdiocese: string;
  country: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  addressPlaceholder: string;
  officeHours: string;
  priestNamePlaceholder: string;
  priestTitle: string;
  priestWelcomeMessage: string;
  pastoralReflection: string;
  heroWelcomeMessage: string;
  momoMtn: string;
  momoOrange: string;
  bankAccount: string;
  accountName: string;
}

export interface MassSchedule {
  id: string;
  celebrationName: string;
  dayOfWeek: string;
  startTime: string;
  endTime?: string;
  location: string;
  frequency: string;
  language: string;
  additionalInstructions?: string;
  isActive: boolean;
  isSpecialSeason?: boolean;
}

export interface SacramentInfo {
  id: string;
  name: string;
  latinName?: string;
  category: 'Initiation' | 'Healing' | 'Service';
  shortSummary: string;
  fullExplanation: string;
  whoShouldContact: string;
  generalPreparation: string;
  requiredDocuments: string[];
  howToArrange: string;
}

export interface MinistryGroup {
  id: string;
  name: string;
  acronym?: string;
  category: 'Devotional' | 'Liturgical' | 'Youth' | 'Welfare' | 'Council';
  shortDesc: string;
  fullDesc: string;
  mission: string;
  activities: string[];
  meetingSchedule: string;
  leadershipRole: string;
  leaderNamePlaceholder: string;
  membershipInfo: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  slug: string;
  category: 'Sunday Bulletin' | 'Pastoral Letter' | 'Liturgical Notice' | 'Community Outreach' | 'Youth' | 'General';
  featuredImage?: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  expiryDate?: string;
  isPublished: boolean;
  isFeatured: boolean;
}

export interface ParishEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime?: string;
  venue: string;
  category: 'Liturgy' | 'Meeting' | 'Youth' | 'Retreat' | 'Feast' | 'Community';
  description: string;
  organizer: string;
  isPublished: boolean;
  registrationRequired: boolean;
  imageUrl?: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  name: string;
  phone: string;
  email?: string;
  numberOfPeople: number;
  notes?: string;
  createdAt: string;
}

export interface SupportProject {
  id: string;
  title: string;
  category: string;
  description: string;
  targetAmountXAF: number;
  raisedAmountXAF: number;
  deadline?: string;
  status: 'active' | 'completed';
}

export interface DonationPledge {
  id: string;
  projectId: string;
  projectTitle: string;
  donorName: string;
  phone: string;
  email?: string;
  amountXAF: number;
  paymentMethod: 'MTN Mobile Money' | 'Orange Money' | 'Bank Transfer' | 'Cash / Parish Office';
  intention?: string;
  createdAt: string;
}

export interface MassIntention {
  id: string;
  requesterName: string;
  phone: string;
  email?: string;
  intentionType: 'Thanksgiving' | 'Memorial / Repose of Soul' | 'Healing & Deliverance' | 'Special Intention' | 'Birthday / Anniversary';
  intentionFor: string;
  preferredDate: string;
  preferredMassTime: string;
  stipendNote?: string;
  status: 'pending' | 'approved' | 'offered';
  createdAt: string;
}

export interface PrayerRequest {
  id: string;
  requesterName: string;
  phone?: string;
  requestText: string;
  isConfidential: boolean;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Holy Mass' | 'Sacraments' | 'Parish Feast' | 'Youth Activities' | 'Choir' | 'Community Outreach';
  mediaType: 'image' | 'video';
  url: string;
  caption: string;
  date: string;
}

export interface ScriptureReflection {
  id: string;
  date: string;
  liturgicalTitle: string;
  readingReference: string;
  scriptureText: string;
  reflection: string;
  author: string;
}

export type LiturgicalColor = 'Green' | 'White' | 'Red' | 'Purple' | 'Rose' | 'Gold';

export interface DailyLiturgyAndSaint {
  id: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  liturgicalTitle: string;
  liturgicalColor: LiturgicalColor;
  feastRank: 'Solemnity' | 'Feast' | 'Memorial' | 'Optional Memorial' | 'Ferial Day (Weekday)';
  saintOrFeastName: string;
  saintTitle?: string;
  saintBio: string;
  patronage?: string;
  firstReading: {
    reference: string;
    excerpt: string;
  };
  responsorialPsalm: {
    reference: string;
    refrain: string;
    verseExcerpt: string;
  };
  secondReading?: {
    reference: string;
    excerpt: string;
  };
  gospel: {
    reference: string;
    keyVerse: string;
    excerpt: string;
  };
  reflectionTitle: string;
  reflectionText: string;
  author: string;
  dailyPrayer: string;
}

export type DonationFrequency = 'one-time' | 'monthly' | 'quarterly' | 'annual';
export type PaymentGateway = 'MTN Mobile Money' | 'Orange Money' | 'Stripe (Cards)' | 'PayPal' | 'Bank Wire';

export interface DonationTransaction {
  id: string;
  reference: string;
  projectId: string;
  projectTitle: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amountXAF: number;
  frequency: DonationFrequency;
  gateway: PaymentGateway;
  status: 'completed' | 'processing' | 'failed' | 'refunded';
  intention?: string;
  isAnonymous: boolean;
  createdAt: string;
  receiptNumber: string;
  paymentDetails?: {
    phoneNumber?: string;
    cardLast4?: string;
    cardBrand?: string;
    paypalEmail?: string;
    ussdRef?: string;
  };
}

export type AdminRole = 
  | 'SUPER_ADMIN' 
  | 'CONTENT_EDITOR' 
  | 'FINANCE_OFFICER' 
  | 'LITURGY_COORDINATOR';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  title: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export type AdminPermission = 
  | 'MANAGE_USERS'
  | 'MANAGE_FINANCES'
  | 'MANAGE_CONTENT'
  | 'MANAGE_LITURGY'
  | 'MANAGE_SETTINGS'
  | 'UPLOAD_MEDIA';

export interface MediaUploadItem {
  id: string;
  title: string;
  category: string;
  url: string;
  caption?: string;
  fileSize?: string;
  uploadedBy: string;
  uploadedAt: string;
}

