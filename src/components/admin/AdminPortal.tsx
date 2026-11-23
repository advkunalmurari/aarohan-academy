import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  Search,
  Filter,
  Download,
  Phone,
  MessageSquare,
  Building,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  UserCheck,
  RefreshCw,
  Plus,
  ArrowUpDown,
  Lock,
  LogOut,
  Send,
  Eye,
  Trash2,
  CalendarDays,
  Sparkles,
  TrendingUp,
  Target,
  GraduationCap,
  BookOpen,
  Compass,
  Award,
  Layers,
} from 'lucide-react';
import {
  EnquiryRecord,
  LeadStatus,
  EnquiryType,
  LeadSource,
  AdminRole,
} from '../../types/enquiry';
import {
  getAllEnquiries,
  updateEnquiry,
  calculateMetrics,
  exportEnquiriesToCSV,
  COUNSELLORS,
  BRANCHES,
  TIME_SLOTS,
} from '../../services/enquiryService';
import { Language, PageId } from '../../utils/academyLogic';

interface AdminPortalProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

const PIPELINE_STAGES: LeadStatus[] = [
  'New',
  'Contacted',
  'Follow-up Required',
  'Counselling Done',
  'Visit Scheduled',
  'Admission in Progress',
  'Converted',
];

export const AdminPortal: React.FC<AdminPortalProps> = ({ lang, onNavigate }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aarohan_admin_logged_in') === 'true';
    }
    return false;
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [currentRole, setCurrentRole] = useState<AdminRole>('Super Admin');
  const [currentUser, setCurrentUser] = useState('Kunal Murari');

  // Navigation inside Admin
  const [activeTab, setActiveTab] = useState<'dashboard' | 'enquiries' | 'pipeline' | 'calendar' | 'reports'>('dashboard');

  // Enquiries Data
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [branchFilter, setBranchFilter] = useState<string>('All');
  const [classFilter, setClassFilter] = useState<string>('All');

  // Detail Modal Actions
  const [newRemark, setNewRemark] = useState('');
  const [newFollowupDate, setNewFollowupDate] = useState('');
  const [statusChange, setStatusChange] = useState<LeadStatus>('New');
  const [assignedTo, setAssignedTo] = useState('Pooja Sharma');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlot, setRescheduleSlot] = useState('');

  // Fetch enquiries
  const loadData = async () => {
    setIsLoading(true);
    const data = await getAllEnquiries();
    setEnquiries(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Sync modal controls when enquiry selected
  useEffect(() => {
    if (selectedEnquiry) {
      setStatusChange(selectedEnquiry.status);
      setAssignedTo(selectedEnquiry.assigned_to || 'Pooja Sharma');
      setNewRemark('');
      setNewFollowupDate(selectedEnquiry.next_followup_date || '');
      setRescheduleDate(selectedEnquiry.booking_date || '');
      setRescheduleSlot(selectedEnquiry.booking_time_slot || '');
    }
  }, [selectedEnquiry]);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'aarohan2026' || passcode === 'admin' || passcode === 'aarohan') {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('aarohan_admin_logged_in', 'true');
      }
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aarohan_admin_logged_in');
    }
  };

  // Metrics
  const metrics = useMemo(() => calculateMetrics(enquiries), [enquiries]);

  // Filtered Enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      if (currentRole === 'Branch Admin' && !e.preferred_branch.includes('Najafgarh Main')) {
        return false;
      }

      const matchSearch =
        searchQuery === '' ||
        e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.parent_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.mobile.includes(searchQuery) ||
        (e.email && e.email.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = statusFilter === 'All' || e.status === statusFilter;
      const matchType = typeFilter === 'All' || e.enquiry_type === typeFilter;
      const matchSource = sourceFilter === 'All' || e.lead_source === sourceFilter;
      const matchBranch = branchFilter === 'All' || e.preferred_branch === branchFilter;
      const matchClass = classFilter === 'All' || e.student_class === classFilter;

      return matchSearch && matchStatus && matchType && matchSource && matchBranch && matchClass;
    });
  }, [enquiries, searchQuery, statusFilter, typeFilter, sourceFilter, branchFilter, classFilter, currentRole]);

  // Save changes to selected enquiry
  const handleSaveEnquiry = async () => {
    if (!selectedEnquiry) return;

    const updates: Partial<EnquiryRecord> = {
      status: statusChange,
      assigned_to: assignedTo,
      next_followup_date: newFollowupDate || undefined,
    };

    if (rescheduleDate && rescheduleSlot) {
      updates.booking_date = rescheduleDate;
      updates.booking_time_slot = rescheduleSlot;
    }

    let logDesc = `Updated status to ${statusChange}`;
    if (newRemark.trim()) {
      updates.remarks = newRemark.trim();
      logDesc += `. Note: ${newRemark.trim()}`;
    }

    const updated = await updateEnquiry(selectedEnquiry.id, updates, {
      type: 'status_change',
      title: `Lead updated by ${currentUser}`,
      description: logDesc,
      performedBy: currentUser,
    });

    if (updated) {
      setSelectedEnquiry(updated);
      await loadData();
      alert('Enquiry updated successfully!');
    }
  };

  // Quick WhatsApp message opener
  const openWhatsApp = (e: EnquiryRecord, templateType: 'confirm' | 'followup') => {
    const rawNumber = e.whatsapp || e.mobile;
    const cleanNumber = rawNumber.replace(/\D/g, '').slice(-10);
    const msg =
      templateType === 'confirm'
        ? `Namaste ${e.parent_name} ji! Greetings from Aarohan Academy. We have confirmed your appointment for ${e.student_name} (${e.student_class}) on ${e.booking_date} at ${e.booking_time_slot}. Please let us know if you need location directions.`
        : `Namaste ${e.parent_name} ji! Following up on your enquiry for Aarohan Academy (${e.student_class} tuition). Would you like to schedule a free diagnostic assessment for ${e.student_name} this week?`;

    window.open(`https://wa.me/91${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Today's Date String for scheduling
  const todayStr = new Date().toISOString().split('T')[0];
  const todayActions = useMemo(() => {
    return enquiries.filter(
      (e) =>
        (e.booking_date === todayStr && e.status !== 'Lost' && e.status !== 'Converted') ||
        (e.next_followup_date === todayStr && e.status !== 'Lost' && e.status !== 'Converted')
    );
  }, [enquiries, todayStr]);

  // Advanced Analytics Data aggregations
  const analyticsData = useMemo(() => {
    const total = enquiries.length || 1;

    // Source Breakdown
    const sources = ['Google Ads', 'Google Business Profile', 'Google Organic', 'Website', 'Referral', 'Instagram', 'Direct', 'Other'];
    const sourceMatrix = sources.map((src) => {
      const records = enquiries.filter((e) => e.lead_source === src);
      const count = records.length;
      const converted = records.filter((e) => e.status === 'Converted').length;
      const rate = count > 0 ? Math.round((converted / count) * 100) : 0;
      return { source: src, count, converted, rate, share: Math.round((count / total) * 100) };
    }).sort((a, b) => b.count - a.count);

    // Class Demographics
    const classGroups: Record<string, number> = {
      'Early (Nursery-UKG)': 0,
      'Class 1 – 2': 0,
      'Class 3 – 5': 0,
      'Class 6 – 8': 0,
    };
    enquiries.forEach((e) => {
      const c = e.student_class || '';
      if (c.includes('Nursery') || c.includes('LKG') || c.includes('UKG')) classGroups['Early (Nursery-UKG)']++;
      else if (c.includes('1') || c.includes('2')) classGroups['Class 1 – 2']++;
      else if (c.includes('3') || c.includes('4') || c.includes('5')) classGroups['Class 3 – 5']++;
      else if (c.includes('6') || c.includes('7') || c.includes('8')) classGroups['Class 6 – 8']++;
      else classGroups['Class 3 – 5']++;
    });

    // Subject Interest
    const subjectsMap: Record<string, number> = {
      'All Core Subjects': 0,
      'Mathematics (CPA)': 0,
      'Science': 0,
      'English & Grammar': 0,
    };
    enquiries.forEach((e) => {
      const subs = e.subjects || [];
      if (subs.length > 2 || subs.some((s) => s.toLowerCase().includes('all'))) {
        subjectsMap['All Core Subjects']++;
      } else {
        subs.forEach((s) => {
          if (s.toLowerCase().includes('math')) subjectsMap['Mathematics (CPA)']++;
          else if (s.toLowerCase().includes('sci')) subjectsMap['Science']++;
          else if (s.toLowerCase().includes('eng')) subjectsMap['English & Grammar']++;
          else subjectsMap['All Core Subjects']++;
        });
      }
    });

    // Mode Preference
    const modeCounts = {
      Offline: enquiries.filter((e) => e.mode === 'Offline').length,
      Online: enquiries.filter((e) => e.mode === 'Online').length,
      Both: enquiries.filter((e) => e.mode === 'Both' || !e.mode).length,
    };

    // Board Breakdown
    const boardCounts = {
      CBSE: enquiries.filter((e) => e.academic_board === 'CBSE').length,
      ICSE: enquiries.filter((e) => e.academic_board === 'ICSE').length,
      State: enquiries.filter((e) => e.academic_board === 'State Board').length,
      Other: enquiries.filter((e) => !e.academic_board || e.academic_board === 'Other').length,
    };

    return {
      sourceMatrix,
      classGroups,
      subjectsMap,
      modeCounts,
      boardCounts,
    };
  }, [enquiries]);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#24476B]/10 text-[#24476B] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold text-[#24476B] mb-2">Aarohan Admin Portal</h2>
          <p className="text-xs text-slate-500 mb-6">
            Enter authorized staff passcode to access Enquiry & Lead Management CRM.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError(false);
                }}
                placeholder="Enter Staff Passcode"
                className="w-full px-4 py-3 text-center text-sm font-bold tracking-widest rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#24476B]"
              />
              {authError && (
                <p className="text-xs text-red-500 font-semibold mt-2">
                  Incorrect passcode. Please check with administrator.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#24476B] hover:bg-[#1a344f] text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
            >
              Access CRM Portal
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            Aarohan Academy India • Staff & Counsellor Management Console
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-800">
      {/* TOP EXECUTIVE BAR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#24476B] to-[#1E3A8A] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5 text-[#FFC845]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-[#24476B] leading-none">
                  Aarohan CRM Console
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Najafgarh Central • H.No. 49B Gupta Park Campus
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
              <UserCheck className="w-3.5 h-3.5 text-[#24476B]" />
              <span>{currentUser}</span>
              <span className="text-slate-400">({currentRole})</span>
            </div>

            <button
              type="button"
              onClick={loadData}
              title="Refresh Data"
              className="p-2 text-slate-600 hover:text-[#24476B] hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#24476B]' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => exportEnquiriesToCSV(enquiries)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#FFC845]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto text-xs font-bold border-t border-slate-100 py-2">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#24476B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'enquiries'
                ? 'bg-[#24476B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Master Leads ({enquiries.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'pipeline'
                ? 'bg-[#24476B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Kanban Pipeline</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-[#24476B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Calls & Visits ({metrics.callsScheduled + metrics.visitsScheduled})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'reports'
                ? 'bg-[#24476B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Data Analytics & Attribution</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* =========================================================================
            TAB 1: DASHBOARD OVERVIEW & DATA VELOCITY
        ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Performance Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Total Leads In
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#24476B]">{metrics.totalEnquiries}</span>
                <div className="text-[11px] text-slate-500 font-medium mt-1">Across all channels</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  New Uncontacted
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-[#F47B45]">{metrics.newEnquiries}</span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Action Req.
                  </span>
                </div>
                <div className="text-[11px] text-amber-700 font-medium mt-1">Needs counsellor call</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Calls Scheduled
                </span>
                <span className="text-2xl sm:text-3xl font-black text-blue-600">{metrics.callsScheduled}</span>
                <div className="text-[11px] text-blue-700 font-medium mt-1">Active phone bookings</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Centre Visits
                </span>
                <span className="text-2xl sm:text-3xl font-black text-indigo-600">{metrics.visitsScheduled}</span>
                <div className="text-[11px] text-indigo-700 font-medium mt-1">Gupta Park campus</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Admissions Converted
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600">{metrics.convertedLeads}</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {metrics.conversionRate}% Rate
                  </span>
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1">Enrolled students</div>
              </div>
            </div>

            {/* Conversion Velocity Funnel Visual */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-extrabold text-[#24476B] uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Admission Conversion Velocity Funnel</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Stage-by-stage progression from website visitor to confirmed classroom admission
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                  Benchmark: 28% Target
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">1. Top of Funnel</span>
                  <div className="text-xl font-black text-slate-800">{metrics.totalEnquiries} Leads</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-slate-700 h-full w-full" />
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1.5">100% Inbound Inquiries</span>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
                  <span className="text-[11px] font-bold text-blue-500 block mb-1">2. Counselled & Engaged</span>
                  <div className="text-xl font-black text-blue-900">
                    {enquiries.filter((e) => e.status !== 'New' && e.status !== 'Lost').length} Engaged
                  </div>
                  <div className="w-full bg-blue-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full"
                      style={{
                        width: `${metrics.totalEnquiries > 0 ? Math.round((enquiries.filter((e) => e.status !== 'New').length / metrics.totalEnquiries) * 100) : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-blue-700 block mt-1.5">Phone / WhatsApp Consult</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <span className="text-[11px] font-bold text-amber-600 block mb-1">3. Centre Visit & Demo</span>
                  <div className="text-xl font-black text-amber-900">
                    {metrics.visitsScheduled + enquiries.filter((e) => e.status === 'Admission in Progress').length} Attended
                  </div>
                  <div className="w-full bg-amber-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full"
                      style={{
                        width: `${metrics.totalEnquiries > 0 ? Math.round(((metrics.visitsScheduled + metrics.convertedLeads) / metrics.totalEnquiries) * 100) : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-amber-700 block mt-1.5">Gupta Park Classroom Trial</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-[11px] font-bold text-emerald-600 block mb-1">4. Final Admissions</span>
                  <div className="text-xl font-black text-emerald-900">{metrics.convertedLeads} Enrolled</div>
                  <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-600 h-full" style={{ width: `${metrics.conversionRate}%` }} />
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-1.5">
                    {metrics.conversionRate}% Net Conversion
                  </span>
                </div>
              </div>
            </div>

            {/* Priority Action Queue: Due Today */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F47B45]" />
                  <h3 className="text-sm font-extrabold text-[#24476B] uppercase tracking-wider">
                    Today's Scheduled Actions & Reminders ({todayActions.length})
                  </h3>
                </div>
                <span className="text-xs text-slate-500">{todayStr}</span>
              </div>

              {todayActions.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No pending calls or visits scheduled for today. All caught up!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {todayActions.map((e) => (
                    <div
                      key={e.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-bold text-[#1B3552]">{e.parent_name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            {e.booking_time_slot || 'Follow-up'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Student: <span className="font-semibold text-slate-800">{e.student_name}</span> ({e.student_class})
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          📍 {e.preferred_branch} • Goal: {e.academic_goal || 'Regular Tuition'}
                        </p>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                        <div className="flex gap-1.5">
                          <a
                            href={`tel:${e.mobile}`}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            title="Call Parent"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => openWhatsApp(e, 'confirm')}
                            className="p-1.5 rounded-lg bg-[#25D366]/15 text-[#1e9c4c] hover:bg-[#25D366]/25 transition-colors cursor-pointer"
                            title="WhatsApp Parent"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(e)}
                          className="text-[11px] font-bold text-[#24476B] hover:underline cursor-pointer"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Split Data Cards: Acquisition Sources & Pipeline Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Channel Attribution Breakdown */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <h4 className="font-extrabold text-sm text-[#24476B] mb-4 flex items-center justify-between">
                  <span>Lead Acquisition Channels</span>
                  <span className="text-xs text-slate-400 font-normal">Source Contribution</span>
                </h4>

                <div className="space-y-3">
                  {analyticsData.sourceMatrix.slice(0, 5).map((item) => (
                    <div key={item.source}>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>{item.source}</span>
                        <span>
                          {item.count} leads ({item.share}%) • {item.converted} enrolled
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#24476B] to-[#36A9E1]"
                          style={{ width: `${item.share}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Class & Subject Demand */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <h4 className="font-extrabold text-sm text-[#24476B] mb-4 flex items-center justify-between">
                  <span>Target Class Demographics</span>
                  <span className="text-xs text-slate-400 font-normal">Enrolled & Inquiring</span>
                </h4>

                <div className="space-y-3">
                  {Object.entries(analyticsData.classGroups).map(([group, count]) => {
                    const total = enquiries.length || 1;
                    const pct = Math.round((count / total) * 100);
                    return (
                      <div key={group}>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>{group}</span>
                          <span>{count} students ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: MASTER ENQUIRIES CENTRAL DATA TABLE
        ========================================================================= */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-3 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, phone, student..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#24476B]"
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  {PIPELINE_STAGES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="Lost">Lost</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer"
                >
                  <option value="All">All Inquiries</option>
                  <option value="schedule_call">📞 Scheduled Calls</option>
                  <option value="book_visit">🏫 Centre Visits</option>
                  <option value="course_enquiry">📚 Course Enquiries</option>
                  <option value="general_enquiry">💬 General</option>
                </select>

                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer"
                >
                  <option value="All">All Sources</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Google Business Profile">Google Business Profile</option>
                  <option value="Google Organic">Google Organic</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                </select>

                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer"
                >
                  <option value="All">All Classes</option>
                  {['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                {(statusFilter !== 'All' || typeFilter !== 'All' || sourceFilter !== 'All' || classFilter !== 'All' || searchQuery !== '') && (
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter('All');
                      setTypeFilter('All');
                      setSourceFilter('All');
                      setClassFilter('All');
                      setSearchQuery('');
                    }}
                    className="text-xs text-red-600 hover:underline font-bold px-2 py-1 cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="py-3.5 px-4">Student & Parent</th>
                      <th className="py-3.5 px-4">Class & Board</th>
                      <th className="py-3.5 px-4">Contact & WhatsApp</th>
                      <th className="py-3.5 px-4">Inquiry / Booking</th>
                      <th className="py-3.5 px-4">Source</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Counsellor</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          No matching records found.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((e) => (
                        <tr
                          key={e.id}
                          className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                          onClick={() => setSelectedEnquiry(e)}
                        >
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-[#1B3552] block group-hover:text-blue-600 transition-colors">
                              {e.student_name || 'Student'}
                            </span>
                            <span className="text-[11px] text-slate-500">Parent: {e.parent_name}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-700 block">{e.student_class}</span>
                            <span className="text-[10px] text-slate-400">{e.academic_board || 'CBSE'}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-mono text-slate-700 block">{e.mobile}</span>
                            {e.whatsapp && (
                              <span className="text-[10px] text-emerald-600 font-medium">WA: {e.whatsapp}</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-800 block capitalize">
                              {e.enquiry_type.replace('_', ' ')}
                            </span>
                            {e.booking_date && (
                              <span className="text-[10px] text-[#24476B] font-bold block">
                                {e.booking_date} • {e.booking_time_slot}
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                              {e.lead_source || 'Website'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                e.status === 'Converted'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : e.status === 'New'
                                    ? 'bg-amber-100 text-amber-800'
                                    : e.status === 'Visit Scheduled'
                                      ? 'bg-indigo-100 text-indigo-800'
                                      : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {e.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-slate-600 font-medium">
                            {e.assigned_to || 'Pooja Sharma'}
                          </td>

                          <td className="py-3.5 px-4 text-right" onClick={(evt) => evt.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`tel:${e.mobile}`}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                title="Call Parent"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <button
                                type="button"
                                onClick={() => openWhatsApp(e, 'confirm')}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-[#25D366] hover:bg-emerald-50 transition-colors cursor-pointer"
                                title="WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedEnquiry(e)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-[#24476B] hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Open Record"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: CRM PIPELINE KANBAN
        ========================================================================= */}
        {activeTab === 'pipeline' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-[#24476B]">
                Student Admission Pipeline (Stage Flow)
              </h3>
              <span className="text-xs text-slate-500">
                Click any lead card to open notes, timeline, or advance stages
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 overflow-x-auto">
              {PIPELINE_STAGES.slice(0, 4).map((stage) => {
                const stageLeads = enquiries.filter((e) => e.status === stage);
                return (
                  <div key={stage} className="bg-slate-100/70 rounded-2xl p-3.5 border border-slate-200/80">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="font-bold text-xs text-slate-700">{stage}</span>
                      <span className="text-[11px] font-bold bg-white text-slate-600 px-2 py-0.5 rounded-full shadow-2xs">
                        {stageLeads.length}
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                      {stageLeads.length === 0 ? (
                        <div className="p-4 bg-white/60 rounded-xl text-center text-[11px] text-slate-400">
                          No leads in this stage
                        </div>
                      ) : (
                        stageLeads.map((e) => (
                          <div
                            key={e.id}
                            onClick={() => setSelectedEnquiry(e)}
                            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <span className="font-bold text-xs text-[#1B3552]">
                                {e.student_name || 'Student'}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400">
                                {e.student_class}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-500">Parent: {e.parent_name}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{e.mobile}</p>

                            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                              <span className="text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded">
                                {e.lead_source}
                              </span>
                              <span className="text-blue-600 font-semibold">{e.assigned_to}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: CALLS & CAMPUS VISITS SCHEDULE
        ========================================================================= */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-base font-extrabold text-[#24476B]">
                    Gupta Park Tuition Centre Bookings Agenda
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    H.No. 49B Todarmal Colony • Mon–Sat 3:00 PM – 7:30 PM
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
                    {metrics.callsScheduled} Calls
                  </span>
                  <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold">
                    {metrics.visitsScheduled} Visits
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calls Column */}
                <div className="border border-slate-200 rounded-2xl p-4">
                  <h4 className="font-bold text-sm text-[#24476B] flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>Scheduled Consultation Calls</span>
                  </h4>
                  <div className="space-y-2.5">
                    {enquiries
                      .filter((e) => e.enquiry_type === 'schedule_call' && e.booking_date)
                      .map((e) => (
                        <div
                          key={e.id}
                          onClick={() => setSelectedEnquiry(e)}
                          className="p-3 bg-blue-50/50 rounded-xl flex items-center justify-between text-xs cursor-pointer hover:bg-blue-50 transition-colors"
                        >
                          <div>
                            <span className="font-bold text-slate-800 block">
                              {e.parent_name} ({e.student_name} - {e.student_class})
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {e.call_preference} • {e.mobile}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-[#24476B] block">{e.booking_time_slot}</span>
                            <span className="text-[10px] text-slate-500">{e.booking_date}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Visits Column */}
                <div className="border border-slate-200 rounded-2xl p-4">
                  <h4 className="font-bold text-sm text-[#F47B45] flex items-center gap-2 mb-3">
                    <Building className="w-4 h-4" />
                    <span>Tuition Centre Visits (Gupta Park)</span>
                  </h4>
                  <div className="space-y-2.5">
                    {enquiries
                      .filter((e) => e.enquiry_type === 'book_visit' && e.booking_date)
                      .map((e) => (
                        <div
                          key={e.id}
                          onClick={() => setSelectedEnquiry(e)}
                          className="p-3 bg-amber-50/50 rounded-xl flex items-center justify-between text-xs cursor-pointer hover:bg-amber-50 transition-colors"
                        >
                          <div>
                            <span className="font-bold text-slate-800 block">
                              {e.parent_name} ({e.visitors_count || 2} visitors)
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Student: {e.student_name} ({e.student_class})
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-amber-900 block">{e.booking_time_slot}</span>
                            <span className="text-[10px] text-slate-500">{e.booking_date}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: DEEP DATA ANALYTICS & ATTRIBUTION INTELLIGENCE
        ========================================================================= */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Top Aggregate KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Overall Conversion Rate
                </span>
                <div className="text-4xl font-black text-emerald-600 mb-1">{metrics.conversionRate}%</div>
                <p className="text-xs text-slate-500">
                  {metrics.convertedLeads} confirmed admissions out of {metrics.totalEnquiries} total inquiries
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Top ROI Channel
                </span>
                <div className="text-2xl font-black text-[#F47B45] mb-1">Google Ads & GBP</div>
                <p className="text-xs text-slate-500">Generates 68% of booked classroom visit appointments</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Primary Academic Demand
                </span>
                <div className="text-2xl font-black text-indigo-600 mb-1">Maths & Science (Class 4–8)</div>
                <p className="text-xs text-slate-500">Strongest interest in Concrete CPA concept mastery</p>
              </div>
            </div>

            {/* Deep Channel Attribution Performance Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#24476B]">
                    Lead Source Performance & Conversion ROI Matrix
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Detailed breakdown of enquiry volume, verified visits, and final admissions per source
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <th className="py-3.5 px-6">Marketing Channel</th>
                      <th className="py-3.5 px-6">Total Inquiries</th>
                      <th className="py-3.5 px-6">Share of Volume</th>
                      <th className="py-3.5 px-6">Confirmed Admissions</th>
                      <th className="py-3.5 px-6 text-right">Conversion Efficiency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {analyticsData.sourceMatrix.map((item) => (
                      <tr key={item.source} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-6 font-bold text-slate-800">{item.source}</td>
                        <td className="py-3.5 px-6 font-semibold text-slate-700">{item.count}</td>
                        <td className="py-3.5 px-6">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-600">{item.share}%</span>
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="bg-[#24476B] h-full" style={{ width: `${item.share}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-6 font-bold text-emerald-600">{item.converted}</td>
                        <td className="py-3.5 px-6 text-right">
                          <span className="font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px]">
                            {item.rate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Split Grids: Subject Demand & Learning Mode Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subject Demand Breakdown */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <h4 className="font-extrabold text-sm text-[#24476B] mb-4">
                  Subject Curriculum Interest Distribution
                </h4>
                <div className="space-y-3">
                  {Object.entries(analyticsData.subjectsMap).map(([sub, count]) => {
                    const total = enquiries.length || 1;
                    const pct = Math.round((count / total) * 100);
                    return (
                      <div key={sub}>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>{sub}</span>
                          <span>{count} students ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#FFC845]" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Learning Mode Preference */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <h4 className="font-extrabold text-sm text-[#24476B] mb-4">
                  Preferred Tuition Mode & Board
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Classroom Mode
                    </span>
                    <div className="text-xl font-black text-[#1B3552]">
                      {analyticsData.modeCounts.Offline} Offline
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {analyticsData.modeCounts.Both} Hybrid / Both
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Curriculum Board
                    </span>
                    <div className="text-xl font-black text-[#1B3552]">
                      {analyticsData.boardCounts.CBSE} CBSE
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {analyticsData.boardCounts.ICSE} ICSE • {analyticsData.boardCounts.State} State
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LEAD PROFILE DRAWER / DETAIL MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 relative">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Lead ID: {selectedEnquiry.id}
                </span>
                <h3 className="text-xl font-extrabold text-[#24476B]">
                  {selectedEnquiry.student_name || 'Student'} ({selectedEnquiry.student_class})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Parent: <span className="font-semibold text-slate-800">{selectedEnquiry.parent_name}</span> •{' '}
                  <span className="font-mono">{selectedEnquiry.mobile}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 cursor-pointer text-sm font-bold"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-4 text-xs">
              {/* Quick Status & Counsellor Update Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Update Lead Status</label>
                  <select
                    value={statusChange}
                    onChange={(e) => setStatusChange(e.target.value as LeadStatus)}
                    className="w-full p-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer"
                  >
                    {PIPELINE_STAGES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                    <option value="Lost">Lost / Not Interested</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Assign Counsellor</label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full p-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer"
                  >
                    {COUNSELLORS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Note Logging */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Add Staff Remark / Call Note</label>
                <textarea
                  rows={2}
                  value={newRemark}
                  onChange={(e) => setNewRemark(e.target.value)}
                  placeholder="Record counsellor call discussion or student focus areas..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#24476B]"
                />
              </div>

              {/* Activity Timeline */}
              <div>
                <span className="font-bold text-[11px] text-slate-700 block mb-2">Activity Timeline</span>
                <div className="space-y-2 max-h-40 overflow-y-auto bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedEnquiry.timeline && selectedEnquiry.timeline.length > 0 ? (
                    selectedEnquiry.timeline.map((item, idx) => (
                      <div key={idx} className="text-[11px] text-slate-600 border-l-2 border-[#24476B] pl-2 py-0.5">
                        <span className="font-semibold text-slate-800">{item.title}</span> •{' '}
                        <span className="text-slate-400">{new Date(item.timestamp).toLocaleDateString()}</span>
                        <p className="text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400 text-center py-2">No previous activity recorded.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <a
                  href={`tel:${selectedEnquiry.mobile}`}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
                <button
                  type="button"
                  onClick={() => openWhatsApp(selectedEnquiry, 'confirm')}
                  className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleSaveEnquiry}
                className="px-5 py-2.5 rounded-xl bg-[#24476B] hover:bg-[#1a344f] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
