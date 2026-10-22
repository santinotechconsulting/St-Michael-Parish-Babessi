import React, { useState, useRef } from 'react';
import { useParish } from '../context/ParishContext';
import {
  Announcement,
  MassSchedule,
  ParishEvent,
  MinistryGroup,
  SupportProject,
  AdminUser,
  AdminRole,
  DonationTransaction
} from '../types';
import {
  ShieldCheck,
  LayoutDashboard,
  Bell,
  Clock,
  Calendar,
  Users,
  Heart,
  Settings,
  Database,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  FileDown,
  FileUp,
  RotateCcw,
  LogOut,
  Mail,
  Sparkles,
  Cross,
  Upload,
  Image as ImageIcon,
  DollarSign,
  UserCheck,
  UserX,
  CreditCard,
  Lock,
  Printer,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface AdminDashboardViewProps {
  onLogout: () => void;
  onViewReceipt?: (transaction: DonationTransaction) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onLogout, onViewReceipt }) => {
  const {
    parishInfo,
    massSchedules,
    announcements,
    events,
    eventRegistrations,
    ministries,
    projects,
    transactions,
    massIntentions,
    prayerRequests,
    contactMessages,
    mediaUploads,
    adminUsers,
    currentAdminUser,
    canPerform,
    switchAdminUser,
    addAdminUser,
    updateAdminUser,
    deleteAdminUser,
    toggleAdminUserActive,
    uploadMedia,
    deleteMediaUpload,
    scriptureReflection,
    updateParishInfo,
    updateScriptureReflection,
    addMassSchedule,
    updateMassSchedule,
    deleteMassSchedule,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addEvent,
    updateEvent,
    deleteEvent,
    addMinistry,
    updateMinistry,
    deleteMinistry,
    addProject,
    updateProject,
    deleteProject,
    updateMassIntentionStatus,
    updateTransactionStatus,
    exportDataJSON,
    importDataJSON,
    resetToDefaults,
    supabaseConfig,
    saveSupabaseConfig,
    showToast
  } = useParish();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'transactions' | 'users' | 'media' | 'announcements' | 'masses' | 'events' | 'ministries' | 'projects' | 'settings' | 'database'
  >('overview');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal states
  const [editingAnnouncement, setEditingAnnouncement] = useState<Partial<Announcement> | null>(null);
  const [editingMass, setEditingMass] = useState<Partial<MassSchedule> | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<ParishEvent> | null>(null);
  const [editingMinistry, setEditingMinistry] = useState<Partial<MinistryGroup> | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<SupportProject> | null>(null);
  const [editingUser, setEditingUser] = useState<Partial<AdminUser> | null>(null);

  // Media Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Holy Mass');
  const [uploadCaption, setUploadCaption] = useState('');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [fileSizeStr, setFileSizeStr] = useState<string>('');

  // Settings & Reflection Forms
  const [settingsForm, setSettingsForm] = useState({ ...parishInfo });
  const [reflectionForm, setReflectionForm] = useState({ ...scriptureReflection });

  // Supabase Config form
  const [sbUrl, setSbUrl] = useState(supabaseConfig.url);
  const [sbKey, setSbKey] = useState(supabaseConfig.anonKey);
  const [importText, setImportText] = useState('');

  // Transactions Filter
  const [txnFilter, setTxnFilter] = useState<'all' | 'completed' | 'processing'>('all');

  const filteredTransactions = transactions.filter((t) => {
    if (txnFilter === 'all') return true;
    return t.status === txnFilter;
  });

  const totalCollectedXAF = transactions
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => sum + t.amountXAF, 0);

  const pendingIntentions = massIntentions.filter((m) => m.status === 'pending');
  const unreadMessages = contactMessages.filter((m) => m.status === 'unread');

  // Handle local file selection for media upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }
      setFileSizeStr(`${(file.size / 1024).toFixed(0)} KB`);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewDataUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !previewDataUrl) {
      alert('Please provide a title and select a photo file.');
      return;
    }

    uploadMedia({
      title: uploadTitle,
      category: uploadCategory,
      url: previewDataUrl,
      caption: uploadCaption,
      fileSize: fileSizeStr
    });

    setUploadTitle('');
    setUploadCaption('');
    setPreviewDataUrl(null);
    setFileSizeStr('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Top Header Banner with Active Role Badge */}
      <div className="bg-[#1C1617] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[#3A2D30] shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#7A1C28] text-[#D4AF37] flex items-center justify-center border border-[#9A2D3B]/40 shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D4AF37]">
                Role-Based Administration
              </span>
              <span className="text-white/40">·</span>
              <span className="text-xs text-emerald-400 font-medium">Session Active</span>
            </div>
            <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              St. Michael Parish CMS
            </h1>
            <p className="text-xs text-[#BDB2A6]">
              Logged in as: <strong className="text-white">{currentAdminUser?.name}</strong> ({currentAdminUser?.title})
            </p>
          </div>
        </div>

        {/* RBAC Role Switcher (For demo and authorized switching) */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#261E20] px-3 py-1.5 rounded-xl border border-[#443538] text-xs">
            <span className="text-[#8E8377] text-[11px]">Active Profile:</span>
            <select
              value={currentAdminUser?.id || ''}
              onChange={(e) => switchAdminUser(e.target.value)}
              className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer"
            >
              {adminUsers.map((u) => (
                <option key={u.id} value={u.id} className="bg-[#1C1617] text-white">
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              const json = exportDataJSON();
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `stmichael_parish_backup_${new Date().toISOString().split('T')[0]}.json`;
              a.click();
              showToast('Backup JSON downloaded', 'info');
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#2A2224] hover:bg-[#3D3234] text-[#E5DCD3] border border-[#4A3B3E] transition-colors cursor-pointer flex items-center gap-1.5"
            title="Download full parish database as JSON"
          >
            <FileDown className="w-4 h-4 text-[#D4AF37]" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#7A1C28] hover:bg-[#63141F] text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Role Permissions Notification Bar */}
      <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#52493F]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1E1E1E]">Active RBAC Role:</span>
          <span className="bg-[#7A1C28] text-white px-2 py-0.5 rounded text-[11px] font-semibold">
            {currentAdminUser?.role}
          </span>
          <span className="text-[#8A7F73]">
            {currentAdminUser?.role === 'SUPER_ADMIN' && 'Full unconstrained administrative permissions across all modules'}
            {currentAdminUser?.role === 'CONTENT_EDITOR' && 'Authorized to manage bulletins, calendar, liturgy, and photo uploads'}
            {currentAdminUser?.role === 'FINANCE_OFFICER' && 'Authorized to inspect payment transactions, issue receipts, and manage project finances'}
            {currentAdminUser?.role === 'LITURGY_COORDINATOR' && 'Authorized to manage Mass schedules, confessions, and review Mass Intentions'}
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E7DFD5]">
        {[
          { key: 'overview', label: 'Overview & Petitions', icon: LayoutDashboard },
          { key: 'transactions', label: `Finances & Ledger (${transactions.length})`, icon: DollarSign, perm: 'MANAGE_FINANCES' },
          { key: 'media', label: `Media Uploads (${mediaUploads.length})`, icon: ImageIcon, perm: 'UPLOAD_MEDIA' },
          { key: 'users', label: `Admin Users (${adminUsers.length})`, icon: Users, perm: 'MANAGE_USERS' },
          { key: 'announcements', label: `Bulletins (${announcements.length})`, icon: Bell, perm: 'MANAGE_CONTENT' },
          { key: 'masses', label: `Mass Schedules (${massSchedules.length})`, icon: Clock, perm: 'MANAGE_LITURGY' },
          { key: 'events', label: `Events (${events.length})`, icon: Calendar, perm: 'MANAGE_CONTENT' },
          { key: 'ministries', label: `Ministries (${ministries.length})`, icon: Users, perm: 'MANAGE_CONTENT' },
          { key: 'projects', label: `Projects (${projects.length})`, icon: Heart, perm: 'MANAGE_FINANCES' },
          { key: 'settings', label: 'Parish Identity', icon: Settings, perm: 'MANAGE_SETTINGS' },
          { key: 'database', label: 'Database & Sync', icon: Database, perm: 'MANAGE_SETTINGS' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const isAllowed = !tab.perm || canPerform(tab.perm as any);

          return (
            <button
              key={tab.key}
              onClick={() => {
                if (!isAllowed) {
                  showToast(`Access Denied: Requires ${tab.perm} privilege`, 'error');
                  return;
                }
                setActiveTab(tab.key as any);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#7A1C28] text-white shadow-sm'
                  : isAllowed
                  ? 'bg-white text-[#52493F] border border-[#E7DFD5] hover:bg-[#FAF7F2]'
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {!isAllowed && <Lock className="w-3 h-3 text-gray-400" />}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & PETITIONS */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 shadow-sm space-y-2">
              <span className="text-xs text-[#7A7167] font-semibold uppercase tracking-wider block">Total Online Collections</span>
              <div className="flex items-baseline justify-between">
                <span className="font-cinzel text-2xl font-bold text-[#7A1C28] tabular-nums font-mono">{totalCollectedXAF.toLocaleString()} F</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {transactions.length} payments
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 shadow-sm space-y-2">
              <span className="text-xs text-[#7A7167] font-semibold uppercase tracking-wider block">Mass Intentions</span>
              <div className="flex items-baseline justify-between">
                <span className="font-cinzel text-2xl font-bold text-[#1E1E1E] tabular-nums font-mono">{massIntentions.length}</span>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {pendingIntentions.length} pending
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 shadow-sm space-y-2">
              <span className="text-xs text-[#7A7167] font-semibold uppercase tracking-wider block">Prayer Petitions</span>
              <div className="flex items-baseline justify-between">
                <span className="font-cinzel text-2xl font-bold text-[#1E1E1E] tabular-nums font-mono">{prayerRequests.length}</span>
                <span className="text-xs font-semibold text-[#7A1C28] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E7DFD5]">
                  Adoration
                </span>
              </div>
            </div>

            <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 shadow-sm space-y-2">
              <span className="text-xs text-[#7A7167] font-semibold uppercase tracking-wider block">Registered Admins</span>
              <div className="flex items-baseline justify-between">
                <span className="font-cinzel text-2xl font-bold text-[#1E1E1E] tabular-nums font-mono">{adminUsers.length}</span>
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Active RBAC
                </span>
              </div>
            </div>
          </div>

          {/* Mass Intentions Management */}
          <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-4">
              <div>
                <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">Requested Mass Intentions</h2>
                <p className="text-xs text-[#7A7167]">Submitted by parishioners online or through the office</p>
              </div>
              <span className="text-xs font-semibold text-[#7A1C28] bg-[#FAF7F2] px-3 py-1 rounded-lg border border-[#E7DFD5]">
                {massIntentions.length} Intentions Recorded
              </span>
            </div>

            {massIntentions.length === 0 ? (
              <p className="text-xs text-[#8A7F73] py-6 text-center italic">
                No Mass intentions submitted yet. Test by submitting one from the top navigation!
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] text-[#4A423A] font-semibold uppercase border-b border-[#E7DFD5]">
                    <tr>
                      <th className="p-3">Requester</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Intention Particulars</th>
                      <th className="p-3">Preferred Date / Liturgy</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EAE1]">
                    {massIntentions.map((item) => (
                      <tr key={item.id} className="hover:bg-[#FAF7F2]/60">
                        <td className="p-3">
                          <strong className="block text-[#1E1E1E]">{item.requesterName}</strong>
                          <span className="text-[#7A7167]">{item.phone}</span>
                        </td>
                        <td className="p-3 font-medium text-[#7A1C28]">{item.intentionType}</td>
                        <td className="p-3 max-w-xs">{item.intentionFor}</td>
                        <td className="p-3">
                          <span className="block font-medium">{item.preferredDate}</span>
                          <span className="text-[#7A7167]">{item.preferredMassTime}</span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                              item.status === 'offered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'approved'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          {canPerform('MANAGE_LITURGY') && item.status === 'pending' && (
                            <button
                              onClick={() => updateMassIntentionStatus(item.id, 'approved')}
                              className="px-2.5 py-1 rounded bg-[#7A1C28] text-white text-[11px] font-semibold cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          {canPerform('MANAGE_LITURGY') && item.status === 'approved' && (
                            <button
                              onClick={() => updateMassIntentionStatus(item.id, 'offered')}
                              className="px-2.5 py-1 rounded bg-emerald-700 text-white text-[11px] font-semibold cursor-pointer"
                            >
                              Mark Offered
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Prayer Petitions & Event Signups Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Prayer Petitions */}
            <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="font-cinzel text-lg font-bold text-[#1E1E1E]">Parish Prayer Petitions</h2>
              {prayerRequests.length === 0 ? (
                <p className="text-xs text-[#8A7F73] italic">No prayer petitions submitted yet.</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {prayerRequests.map((pr) => (
                    <div key={pr.id} className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E7DFD5] text-xs space-y-1">
                      <div className="flex justify-between font-semibold text-[#1E1E1E]">
                        <span>{pr.requesterName}</span>
                        {pr.isConfidential && (
                          <span className="text-[10px] text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                            Confidential
                          </span>
                        )}
                      </div>
                      <p className="text-[#52493F] leading-relaxed italic font-lora">"{pr.requestText}"</p>
                      <span className="text-[10px] text-[#8A7F73] block">{new Date(pr.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Event Registrations */}
            <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="font-cinzel text-lg font-bold text-[#1E1E1E]">Event RSVPs & Attendees</h2>
              {eventRegistrations.length === 0 ? (
                <p className="text-xs text-[#8A7F73] italic">No event registrations received yet.</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {eventRegistrations.map((reg) => (
                    <div key={reg.id} className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E7DFD5] text-xs space-y-1">
                      <div className="flex justify-between font-semibold text-[#1E1E1E]">
                        <span>{reg.name} ({reg.numberOfPeople} person{reg.numberOfPeople > 1 ? 's' : ''})</span>
                        <span className="text-[#7A1C28]">{reg.phone}</span>
                      </div>
                      <p className="text-[#52493F] font-medium">{reg.eventTitle}</p>
                      {reg.notes && <p className="text-[11px] text-[#695F54] italic">Note: {reg.notes}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: TRANSACTIONS & FINANCIAL AUDIT LEDGER */}
      {activeTab === 'transactions' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">
                Online Giving & Payment Audit Ledger
              </h2>
              <p className="text-xs text-[#7A7167]">
                Track all Mobile Money (MTN, Orange), Stripe Cards, and PayPal receipts
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTxnFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${txnFilter === 'all' ? 'bg-[#7A1C28] text-white' : 'bg-white border text-[#52493F]'}`}
              >
                All ({transactions.length})
              </button>
              <button
                onClick={() => setTxnFilter('completed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${txnFilter === 'completed' ? 'bg-[#7A1C28] text-white' : 'bg-white border text-[#52493F]'}`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-8 shadow-sm">
            {filteredTransactions.length === 0 ? (
              <p className="text-xs text-[#8A7F73] py-8 text-center italic">
                No financial transactions recorded in this filter.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] text-[#4A423A] font-semibold uppercase border-b border-[#E7DFD5]">
                    <tr>
                      <th className="p-3">Receipt / Ref</th>
                      <th className="p-3">Donor</th>
                      <th className="p-3">Parish Project</th>
                      <th className="p-3">Gateway</th>
                      <th className="p-3">Schedule</th>
                      <th className="p-3">Amount (XAF)</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EAE1]">
                    {filteredTransactions.map((t) => (
                      <tr key={t.id} className="hover:bg-[#FAF7F2]/60">
                        <td className="p-3 font-mono font-bold text-[#7A1C28]">
                          <div>{t.receiptNumber}</div>
                          <span className="text-[10px] text-[#8A7F73] font-normal">{t.reference}</span>
                        </td>
                        <td className="p-3">
                          <strong className="block text-[#1E1E1E]">{t.donorName}</strong>
                          <span className="text-[#7A7167]">{t.donorPhone}</span>
                        </td>
                        <td className="p-3 max-w-[200px] truncate">{t.projectTitle}</td>
                        <td className="p-3 font-semibold">{t.gateway}</td>
                        <td className="p-3 uppercase text-[11px] font-semibold text-[#7A1C28]">{t.frequency}</td>
                        <td className="p-3 font-mono font-bold text-sm text-[#1E1E1E]">{t.amountXAF.toLocaleString()} F</td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-semibold uppercase">
                            {t.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {onViewReceipt && (
                            <button
                              onClick={() => onViewReceipt(t)}
                              className="px-2.5 py-1 rounded bg-[#FAF7F2] border border-[#E7DFD5] hover:bg-[#EAE2D7] text-[#7A1C28] font-semibold text-[11px] cursor-pointer"
                            >
                              View Receipt
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: MEDIA UPLOADS & STORAGE */}
      {activeTab === 'media' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">Parish Media & Photo Manager</h2>
              <p className="text-xs text-[#7A7167]">Upload and publish verified liturgical photographs and event media</p>
            </div>
          </div>

          {/* Upload Form Box */}
          <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-cinzel text-base font-bold text-[#1E1E1E] flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#7A1C28]" />
              <span>Upload New Parish Media</span>
            </h3>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs text-[#3E3832]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Photo Title *</label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Easter Vigil Service, Confirmation Liturgy"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#DCD3C7] rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#DCD3C7] rounded-xl text-xs"
                  >
                    <option value="Holy Mass">Holy Mass</option>
                    <option value="Sacraments">Sacraments</option>
                    <option value="Parish Feast">Parish Feast</option>
                    <option value="Youth Activities">Youth Activities</option>
                    <option value="Choir">Choir</option>
                    <option value="Community Outreach">Community Outreach</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Caption / Description</label>
                <input
                  type="text"
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  placeholder="e.g. Parishioners gathered in reverent praise at the main altar."
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold uppercase tracking-wider text-[#4A423A]">
                  Select Image File (JPG, PNG, WebP) *
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-[#52493F] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#7A1C28] file:text-white hover:file:bg-[#63141F] cursor-pointer"
                />
              </div>

              {previewDataUrl && (
                <div className="pt-2 flex items-center gap-4 bg-[#FAF7F2] p-3 rounded-2xl border border-[#E7DFD5]">
                  <img
                    src={previewDataUrl}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-xl border border-[#DCD3C7]"
                  />
                  <div>
                    <span className="font-semibold text-xs text-[#1E1E1E] block">Image Ready for Upload</span>
                    <span className="text-[11px] text-[#7A7167]">Size: {fileSizeStr}</span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!previewDataUrl}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white disabled:opacity-40 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload & Publish to Gallery</span>
                </button>
              </div>
            </form>
          </div>

          {/* Uploaded Media Grid */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">Uploaded Media Library ({mediaUploads.length})</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaUploads.map((med) => (
                <div key={med.id} className="bg-white border border-[#E7DFD5] rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="h-44 overflow-hidden relative bg-[#1C1617]">
                    <img src={med.url} alt={med.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">
                      {med.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-cinzel text-sm font-bold text-[#1E1E1E] leading-snug">{med.title}</h4>
                    {med.caption && <p className="text-xs text-[#6B635A] line-clamp-2">{med.caption}</p>}
                    <p className="text-[10px] text-[#8A7F73]">
                      Uploaded by: {med.uploadedBy} · {med.uploadedAt}
                    </p>
                  </div>

                  <div className="p-4 pt-0 border-t border-[#F0EAE1] mt-2 flex justify-end">
                    <button
                      onClick={() => {
                        if (confirm(`Remove media "${med.title}"?`)) {
                          deleteMediaUpload(med.id);
                        }
                      }}
                      className="text-xs text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ADMIN USERS & ROLE-BASED ACCESS CONTROL (RBAC) */}
      {activeTab === 'users' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">
                Parish Admin User Accounts & Roles
              </h2>
              <p className="text-xs text-[#7A7167]">
                Configure Role-Based Access Control (RBAC) for Priests, Secretaries, Treasurers, and Liturgists
              </p>
            </div>

            {canPerform('MANAGE_USERS') && (
              <button
                onClick={() =>
                  setEditingUser({
                    name: '',
                    email: '',
                    role: 'CONTENT_EDITOR',
                    title: 'Assistant Editor',
                    isActive: true
                  })
                }
                className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-sm flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create Admin Account</span>
              </button>
            )}
          </div>

          <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] text-[#4A423A] font-semibold uppercase border-b border-[#E7DFD5]">
                  <tr>
                    <th className="p-3">User & Title</th>
                    <th className="p-3">Email Address</th>
                    <th className="p-3">RBAC Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Last Active</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EAE1]">
                  {adminUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#FAF7F2]/60">
                      <td className="p-3">
                        <strong className="block text-[#1E1E1E] text-sm font-cinzel">{user.name}</strong>
                        <span className="text-[#7A7167] text-[11px]">{user.title}</span>
                      </td>
                      <td className="p-3 font-mono">{user.email}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded text-[11px] font-semibold uppercase ${
                          user.role === 'SUPER_ADMIN'
                            ? 'bg-purple-100 text-purple-800'
                            : user.role === 'FINANCE_OFFICER'
                            ? 'bg-emerald-100 text-emerald-800'
                            : user.role === 'CONTENT_EDITOR'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${user.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {user.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="p-3 text-[#7A7167]">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        {canPerform('MANAGE_USERS') && (
                          <>
                            <button
                              onClick={() => toggleAdminUserActive(user.id)}
                              className="p-1.5 text-[#52493F] hover:text-[#7A1C28] rounded cursor-pointer"
                              title={user.isActive ? 'Deactivate' : 'Activate'}
                            >
                              {user.isActive ? <UserX className="w-4 h-4 text-amber-600" /> : <UserCheck className="w-4 h-4 text-emerald-600" />}
                            </button>
                            <button
                              onClick={() => setEditingUser(user)}
                              className="p-1.5 text-[#52493F] hover:text-[#7A1C28] rounded cursor-pointer"
                              title="Edit user"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete account for ${user.name}?`)) {
                                  deleteAdminUser(user.id);
                                }
                              }}
                              className="p-1.5 text-rose-600 hover:text-rose-800 rounded cursor-pointer"
                              title="Delete account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ANNOUNCEMENTS MANAGEMENT */}
      {activeTab === 'announcements' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">Parish Bulletins & Announcements</h2>
              <p className="text-xs text-[#7A7167]">Publish liturgical notices, pastoral letters, and weekly bulletins</p>
            </div>
            {canPerform('MANAGE_CONTENT') && (
              <button
                onClick={() =>
                  setEditingAnnouncement({
                    title: '',
                    slug: 'announcement-' + Date.now(),
                    category: 'Sunday Bulletin',
                    summary: '',
                    content: '',
                    author: parishInfo.priestTitle,
                    date: new Date().toISOString().split('T')[0],
                    isPublished: true,
                    isFeatured: false
                  })
                }
                className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Announcement</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white border border-[#E7DFD5] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#7A1C28]">{ann.category}</span>
                    <span className="tabular-nums text-[#8A7F73]">{ann.date}</span>
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-[#1E1E1E] leading-snug">
                    {ann.title}
                  </h3>
                  <p className="text-xs text-[#52493F] line-clamp-3">
                    {ann.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${ann.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'}`}>
                      {ann.isPublished ? 'Published' : 'Draft'}
                    </span>
                    {ann.isFeatured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">
                        Featured
                      </span>
                    )}
                  </div>

                  {canPerform('MANAGE_CONTENT') && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingAnnouncement(ann)}
                        className="p-1.5 text-[#52493F] hover:text-[#7A1C28] rounded-md transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete announcement "${ann.title}"?`)) {
                            deleteAnnouncement(ann.id);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:text-rose-800 rounded-md transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: MASS SCHEDULES MANAGEMENT */}
      {activeTab === 'masses' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">Mass Schedules & Celebrations</h2>
              <p className="text-xs text-[#7A7167]">Configure Sunday, weekday, adoration, and sacramental times</p>
            </div>
            {canPerform('MANAGE_LITURGY') && (
              <button
                onClick={() =>
                  setEditingMass({
                    celebrationName: '',
                    dayOfWeek: 'Sunday',
                    startTime: '07:00 AM',
                    location: 'Main Sanctuary',
                    frequency: 'Weekly',
                    language: 'English',
                    additionalInstructions: '',
                    isActive: true
                  })
                }
                className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Schedule Entry</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {massSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-white border border-[#E7DFD5] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#7A1C28] bg-[#FAF7F2] px-2.5 py-0.5 rounded border border-[#EAE2D7]">
                      {schedule.dayOfWeek}
                    </span>
                    <span className="font-mono text-[#7A1C28] font-semibold">{schedule.startTime}</span>
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                    {schedule.celebrationName}
                  </h3>
                  <p className="text-xs text-[#52493F]">
                    {schedule.location} ({schedule.language})
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${schedule.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'}`}>
                    {schedule.isActive ? 'Active Schedule' : 'Inactive'}
                  </span>

                  {canPerform('MANAGE_LITURGY') && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingMass(schedule)}
                        className="p-1.5 text-[#52493F] hover:text-[#7A1C28] rounded-md transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove schedule "${schedule.celebrationName}"?`)) {
                            deleteMassSchedule(schedule.id);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:text-rose-800 rounded-md transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: EVENTS MANAGEMENT */}
      {activeTab === 'events' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">Parish Liturgical Calendar & Events</h2>
              <p className="text-xs text-[#7A7167]">Add retreats, youth rallies, and feast day celebrations</p>
            </div>
            {canPerform('MANAGE_CONTENT') && (
              <button
                onClick={() =>
                  setEditingEvent({
                    title: '',
                    date: new Date().toISOString().split('T')[0],
                    startTime: '09:00 AM',
                    venue: 'St. Michael Parish Sanctuary, Babessi',
                    category: 'Liturgy',
                    description: '',
                    organizer: 'Parish Pastoral Council',
                    isPublished: true,
                    registrationRequired: false
                  })
                }
                className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white border border-[#E7DFD5] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#7A1C28]">{evt.category}</span>
                    <span className="tabular-nums font-mono text-[#1E1E1E]">{evt.date}</span>
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-[#52493F] line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#7A7167]">
                    {evt.registrationRequired ? 'RSVP Enabled' : 'Open Entry'}
                  </span>

                  {canPerform('MANAGE_CONTENT') && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingEvent(evt)}
                        className="p-1.5 text-[#52493F] hover:text-[#7A1C28] rounded-md transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove event "${evt.title}"?`)) {
                            deleteEvent(evt.id);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:text-rose-800 rounded-md transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: MINISTRIES MANAGEMENT */}
      {activeTab === 'ministries' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">Ministries & Groups Configuration</h2>
              <p className="text-xs text-[#7A7167]">Configure Catholic Women, Men, Youth, Choir, Catechists, and associations</p>
            </div>
            {canPerform('MANAGE_CONTENT') && (
              <button
                onClick={() =>
                  setEditingMinistry({
                    name: '',
                    acronym: '',
                    category: 'Devotional',
                    shortDesc: '',
                    fullDesc: '',
                    mission: '',
                    activities: [],
                    meetingSchedule: 'Every Sunday after Mass',
                    leadershipRole: 'President',
                    leaderNamePlaceholder: '[Name to be supplied]',
                    membershipInfo: 'Open to all Catholic parishioners',
                    isActive: true
                  })
                }
                className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Ministry</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((min) => (
              <div
                key={min.id}
                className="bg-white border border-[#E7DFD5] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#7A1C28]">{min.category}</span>
                    {min.acronym && <span className="font-bold text-[#1E1E1E]">{min.acronym}</span>}
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-[#1E1E1E]">
                    {min.name}
                  </h3>
                  <p className="text-xs text-[#52493F] line-clamp-3">
                    {min.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#7A7167] truncate max-w-[150px]">
                    Leader: {min.leaderNamePlaceholder}
                  </span>

                  {canPerform('MANAGE_CONTENT') && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingMinistry(min)}
                        className="p-1.5 text-[#52493F] hover:text-[#7A1C28] rounded-md transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove ministry "${min.name}"?`)) {
                            deleteMinistry(min.id);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:text-rose-800 rounded-md transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: PROJECTS & GIVING */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">Parish Development & Giving</h2>
              <p className="text-xs text-[#7A7167]">Track target amounts, funds raised, and online pledges</p>
            </div>
            {canPerform('MANAGE_FINANCES') && (
              <button
                onClick={() =>
                  setEditingProject({
                    title: '',
                    category: 'Infrastructure',
                    description: '',
                    targetAmountXAF: 5000000,
                    raisedAmountXAF: 0,
                    deadline: '2027',
                    status: 'active'
                  })
                }
                className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Project</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => {
              const pct = Math.min(100, Math.round((proj.raisedAmountXAF / proj.targetAmountXAF) * 100));
              return (
                <div
                  key={proj.id}
                  className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-[#7A1C28]">{proj.category}</span>
                    <h3 className="font-cinzel text-lg font-bold text-[#1E1E1E]">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-[#52493F]">
                      {proj.description}
                    </p>
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-xs font-mono font-semibold">
                        <span>Raised: {proj.raisedAmountXAF.toLocaleString()} XAF</span>
                        <span>Goal: {proj.targetAmountXAF.toLocaleString()} XAF</span>
                      </div>
                      <div className="w-full h-2 bg-[#EAE2D7] rounded-full overflow-hidden">
                        <div className="h-full bg-[#7A1C28]" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
                    <span className="font-medium text-[#7A1C28]">{pct}% Funded</span>
                    {canPerform('MANAGE_FINANCES') && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="p-1.5 text-[#52493F] hover:text-[#7A1C28] rounded-md transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove project "${proj.title}"?`)) {
                              deleteProject(proj.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:text-rose-800 rounded-md transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 10: SETTINGS & PARISH IDENTITY */}
      {activeTab === 'settings' && canPerform('MANAGE_SETTINGS') && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-[#F0EAE1] pb-4">
              <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">Parish Identity & Settings</h2>
              <p className="text-xs text-[#7A7167]">Edit details that appear across the website</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                  Parish Name
                </label>
                <input
                  type="text"
                  value={settingsForm.name}
                  onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settingsForm.tagline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                  Parish Priest Name Placeholder
                </label>
                <input
                  type="text"
                  value={settingsForm.priestNamePlaceholder}
                  onChange={(e) => setSettingsForm({ ...settingsForm, priestNamePlaceholder: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                  Office Telephone
                </label>
                <input
                  type="text"
                  value={settingsForm.phonePlaceholder}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phonePlaceholder: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#F0EAE1]">
              <button
                onClick={() => updateParishInfo(settingsForm)}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white transition-colors cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 11: DATABASE & SYNC */}
      {activeTab === 'database' && canPerform('MANAGE_SETTINGS') && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-[#F0EAE1] pb-4">
              <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">Database & Supabase Synchronization</h2>
              <p className="text-xs text-[#7A7167]">Connect to Supabase PostgreSQL, Authentication, and Storage</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  value={sbUrl}
                  onChange={(e) => setSbUrl(e.target.value)}
                  placeholder="https://xyzcompany.supabase.co"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DCD3C7] rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#4A423A] uppercase tracking-wider mb-1">
                  Supabase Anon Public API Key
                </label>
                <input
                  type="password"
                  value={sbKey}
                  onChange={(e) => setSbKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DCD3C7] rounded-xl text-xs font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className={`text-xs font-semibold ${supabaseConfig.isConnected ? 'text-emerald-700' : 'text-[#8A7F73]'}`}>
                  {supabaseConfig.isConnected ? '✓ Supabase Configured' : 'Operating in Secure Local Persistence Mode'}
                </span>
                <button
                  onClick={() => saveSupabaseConfig(sbUrl, sbKey)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] hover:bg-[#63141F] text-white transition-colors cursor-pointer"
                >
                  Save Supabase Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / CREATE ADMIN USER (RBAC) */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">
              {editingUser.id ? 'Edit Admin User Account' : 'New Parish Admin Account'}
            </h2>

            <div className="space-y-3 text-xs text-[#3E3832]">
              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingUser.name || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  placeholder="e.g. Bro. Peter Fongang"
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={editingUser.email || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  placeholder="e.g. peter@stmichaelbabessi.org"
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Parish Title / Function</label>
                <input
                  type="text"
                  value={editingUser.title || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, title: e.target.value })}
                  placeholder="e.g. Assistant Catechist, Communications Team"
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Role-Based Access Level (RBAC) *</label>
                <select
                  value={editingUser.role || 'CONTENT_EDITOR'}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as AdminRole })}
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs font-semibold"
                >
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full control, User accounts, System settings)</option>
                  <option value="CONTENT_EDITOR">CONTENT_EDITOR (News bulletins, Calendar events, Media uploads)</option>
                  <option value="FINANCE_OFFICER">FINANCE_OFFICER (Transactions, Giving ledger, Development projects)</option>
                  <option value="LITURGY_COORDINATOR">LITURGY_COORDINATOR (Mass schedules, Sacraments, Mass Intentions)</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingUser.isActive ?? true}
                    onChange={(e) => setEditingUser({ ...editingUser, isActive: e.target.checked })}
                    className="rounded border-[#C4B7A6] text-[#7A1C28]"
                  />
                  <span>Account is Active and authorized to sign in</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7DFD5] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#52493F] hover:bg-[#EAE2D7] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!editingUser.name || !editingUser.email) {
                    alert('Name and email are required.');
                    return;
                  }
                  if (editingUser.id) {
                    updateAdminUser(editingUser.id, editingUser);
                  } else {
                    addAdminUser(editingUser as any);
                  }
                  setEditingUser(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] text-white hover:bg-[#63141F] cursor-pointer"
              >
                Save Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / CREATE ANNOUNCEMENT */}
      {editingAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-4 shadow-2xl">
            <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">
              {editingAnnouncement.id ? 'Edit Announcement' : 'New Parish Announcement'}
            </h2>

            <div className="space-y-3 text-xs text-[#3E3832]">
              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingAnnouncement.title || ''}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={editingAnnouncement.category || 'Sunday Bulletin'}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, category: e.target.value as any })}
                    className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                  >
                    <option value="Sunday Bulletin">Sunday Bulletin</option>
                    <option value="Pastoral Letter">Pastoral Letter</option>
                    <option value="Liturgical Notice">Liturgical Notice</option>
                    <option value="Community Outreach">Community Outreach</option>
                    <option value="Youth">Youth</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Date</label>
                  <input
                    type="date"
                    value={editingAnnouncement.date || ''}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, date: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Short Excerpt / Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={editingAnnouncement.summary || ''}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, summary: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Full Content / Body *</label>
                <textarea
                  rows={6}
                  required
                  value={editingAnnouncement.content || ''}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7DFD5] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingAnnouncement(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#52493F] hover:bg-[#EAE2D7] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!editingAnnouncement.title || !editingAnnouncement.content) {
                    alert('Title and content are required.');
                    return;
                  }
                  if (editingAnnouncement.id) {
                    updateAnnouncement(editingAnnouncement.id, editingAnnouncement);
                  } else {
                    addAnnouncement(editingAnnouncement as any);
                  }
                  setEditingAnnouncement(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] text-white hover:bg-[#63141F] cursor-pointer"
              >
                Save Announcement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / CREATE MASS SCHEDULE */}
      {editingMass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">
              {editingMass.id ? 'Edit Mass Schedule' : 'New Mass Schedule Entry'}
            </h2>

            <div className="space-y-3 text-xs text-[#3E3832]">
              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Celebration Name *</label>
                <input
                  type="text"
                  required
                  value={editingMass.celebrationName || ''}
                  onChange={(e) => setEditingMass({ ...editingMass, celebrationName: e.target.value })}
                  placeholder="e.g. Sunday Principal Mass"
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Day of Week</label>
                  <input
                    type="text"
                    value={editingMass.dayOfWeek || ''}
                    onChange={(e) => setEditingMass({ ...editingMass, dayOfWeek: e.target.value })}
                    placeholder="e.g. Sunday"
                    className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Start Time</label>
                  <input
                    type="text"
                    value={editingMass.startTime || ''}
                    onChange={(e) => setEditingMass({ ...editingMass, startTime: e.target.value })}
                    placeholder="e.g. 09:30 AM"
                    className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Location</label>
                <input
                  type="text"
                  value={editingMass.location || ''}
                  onChange={(e) => setEditingMass({ ...editingMass, location: e.target.value })}
                  placeholder="e.g. Main Parish Sanctuary"
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7DFD5] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingMass(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#52493F] hover:bg-[#EAE2D7] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!editingMass.celebrationName || !editingMass.startTime) {
                    alert('Celebration name and start time are required.');
                    return;
                  }
                  if (editingMass.id) {
                    updateMassSchedule(editingMass.id, editingMass);
                  } else {
                    addMassSchedule(editingMass as any);
                  }
                  setEditingMass(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] text-white hover:bg-[#63141F] cursor-pointer"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / CREATE EVENT */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">
              {editingEvent.id ? 'Edit Parish Event' : 'New Parish Event'}
            </h2>

            <div className="space-y-3 text-xs text-[#3E3832]">
              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={editingEvent.date || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Time</label>
                  <input
                    type="text"
                    value={editingEvent.startTime || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, startTime: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Venue</label>
                <input
                  type="text"
                  value={editingEvent.venue || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingEvent.description || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7DFD5] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#52493F] hover:bg-[#EAE2D7] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!editingEvent.title || !editingEvent.date) {
                    alert('Title and date are required.');
                    return;
                  }
                  if (editingEvent.id) {
                    updateEvent(editingEvent.id, editingEvent);
                  } else {
                    addEvent(editingEvent as any);
                  }
                  setEditingEvent(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] text-white hover:bg-[#63141F] cursor-pointer"
              >
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / CREATE PROJECT */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border border-[#E2D9CE] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <h2 className="font-cinzel text-xl font-bold text-[#1E1E1E]">
              {editingProject.id ? 'Edit Development Project' : 'New Development Project'}
            </h2>

            <div className="space-y-3 text-xs text-[#3E3832]">
              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Target Amount (XAF) *</label>
                  <input
                    type="number"
                    required
                    value={editingProject.targetAmountXAF || 0}
                    onChange={(e) => setEditingProject({ ...editingProject, targetAmountXAF: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-1">Raised Amount (XAF)</label>
                  <input
                    type="number"
                    value={editingProject.raisedAmountXAF || 0}
                    onChange={(e) => setEditingProject({ ...editingProject, raisedAmountXAF: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#DCD3C7] rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7DFD5] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#52493F] hover:bg-[#EAE2D7] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!editingProject.title || !editingProject.targetAmountXAF) {
                    alert('Title and target amount are required.');
                    return;
                  }
                  if (editingProject.id) {
                    updateProject(editingProject.id, editingProject);
                  } else {
                    addProject(editingProject as any);
                  }
                  setEditingProject(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#7A1C28] text-white hover:bg-[#63141F] cursor-pointer"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
