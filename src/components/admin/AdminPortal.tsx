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
  Database,
  Copy,
  Check,
  Eye,
  Trash2,
  CalendarDays,
  Sparkles,
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
  SUPABASE_SQL_SCHEMA,
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'enquiries' | 'pipeline' | 'calendar' | 'reports' | 'database'>('dashboard');

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

  // Detail Modal Actions
  const [newRemark, setNewRemark] = useState('');
  const [newFollowupDate, setNewFollowupDate] = useState('');
  const [statusChange, setStatusChange] = useState<LeadStatus>('New');
  const [assignedTo, setAssignedTo] = useState('Pooja Sharma');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlot, setRescheduleSlot] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

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
    // Default passcodes: 'aarohan2026', 'admin', 'aarohan'
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
      // Role filter (Branch admin only sees their branch)
      if (currentRole === 'Branch Admin' && !e.preferred_branch.includes('Najafgarh Main')) {
        return false;
      }
      // Counsellor filter (only sees their assigned leads if preferred)
      if (currentRole === 'Counsellor' && e.assigned_to !== currentUser) {
        // Can still view, but highlighted
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

      return matchSearch && matchStatus && matchType && matchSource && matchBranch;
    });
  }, [enquiries, searchQuery, statusFilter, typeFilter, sourceFilter, branchFilter, currentRole, currentUser]);

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
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-center font-bold text-slate-800 tracking-wider"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-600 font-medium">
                Incorrect passcode. Hint: Use <strong>aarohan2026</strong>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#24476B] hover:bg-[#1a344f] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-400">
            Aarohan Academy • Gupta Park, Todarmal Colony, Najafgarh
          </div>
        </div>
      </div>
    );
  }

  // MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#24476B] text-white font-extrabold rounded-xl flex items-center justify-center shadow-xs text-base">
              AA
            </div>
            <div>
              <span className="font-extrabold text-[#24476B] text-base leading-none block">
                Aarohan CRM
              </span>
              <span className="text-[11px] text-slate-500">Enquiries & Bookings Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Role Switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <span className="px-2 text-slate-500">Role:</span>
              {(['Super Admin', 'Counsellor', 'Branch Admin'] as AdminRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setCurrentRole(r);
                    if (r === 'Counsellor') setCurrentUser('Pooja Sharma');
                    else if (r === 'Branch Admin') setCurrentUser('Amit Verma');
                    else setCurrentUser('Kunal Murari');
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    currentRole === r ? 'bg-white text-[#24476B] shadow-xs font-bold' : 'text-slate-600'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar py-2 text-xs font-bold border-t border-slate-100">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-[#24476B] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'enquiries' ? 'bg-[#24476B] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Enquiries ({enquiries.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'pipeline' ? 'bg-[#24476B] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>CRM Pipeline</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'calendar' ? 'bg-[#24476B] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Calls & Visits Schedule</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'reports' ? 'bg-[#24476B] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Lead Sources & Analytics</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'database' ? 'bg-[#24476B] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase SQL</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Key KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Total Enquiries
                </span>
                <span className="text-2xl font-black text-[#24476B]">{metrics.totalEnquiries}</span>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">All channels</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  New Uncontacted
                </span>
                <span className="text-2xl font-black text-[#F47B45]">{metrics.newEnquiries}</span>
                <div className="text-[11px] text-amber-600 font-semibold mt-1">Needs counsellor call</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Calls Scheduled
                </span>
                <span className="text-2xl font-black text-[#36A9E1]">{metrics.callsScheduled}</span>
                <div className="text-[11px] text-slate-500 font-semibold mt-1">1-on-1 consultations</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Visits Scheduled
                </span>
                <span className="text-2xl font-black text-indigo-600">{metrics.visitsScheduled}</span>
                <div className="text-[11px] text-slate-500 font-semibold mt-1">Gupta Park Centre</div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Converted Leads
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-600">{metrics.convertedLeads}</span>
                  <span className="text-xs font-bold text-slate-400">({metrics.conversionRate}%)</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">Confirmed Admissions</div>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="bg-gradient-to-r from-[#24476B] to-[#1E3A8A] rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FFC845]/20 text-[#FFC845] mb-2">
                  Staff Lead Action Center
                </span>
                <h3 className="text-xl font-black">
                  {metrics.pendingFollowups} Follow-ups Pending Today
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Contact new leads within 15 minutes of submission to achieve high conversion rates for Nursery to Class 8 admissions.
                </p>
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter('New');
                    setActiveTab('enquiries');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#F47B45] hover:bg-[#e06631] text-white text-xs font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  View New Leads ({metrics.newEnquiries})
                </button>

                <button
                  type="button"
                  onClick={() => exportEnquiriesToCSV(enquiries)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Excel</span>
                </button>
              </div>
            </div>

            {/* Two Column Visual Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Channel Attribution Breakdown */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <h4 className="font-extrabold text-sm text-[#24476B] mb-4 flex items-center justify-between">
                  <span>Lead Acquisition Channels</span>
                  <span className="text-xs text-slate-400 font-normal">Google Ads & Organic</span>
                </h4>

                <div className="space-y-3">
                  {[
                    { source: 'Google Ads', count: enquiries.filter((e) => e.lead_source === 'Google Ads').length, color: 'bg-emerald-500' },
                    { source: 'Google Business Profile', count: enquiries.filter((e) => e.lead_source === 'Google Business Profile').length, color: 'bg-blue-500' },
                    { source: 'Google Organic', count: enquiries.filter((e) => e.lead_source === 'Google Organic').length, color: 'bg-indigo-500' },
                    { source: 'Website Direct', count: enquiries.filter((e) => e.lead_source === 'Website' || e.lead_source === 'Direct').length, color: 'bg-amber-500' },
                    { source: 'Referral & Other', count: enquiries.filter((e) => e.lead_source === 'Referral' || e.lead_source === 'Other').length, color: 'bg-slate-400' },
                  ].map((item) => {
                    const pct = metrics.totalEnquiries > 0 ? Math.round((item.count / metrics.totalEnquiries) * 100) : 0;
                    return (
                      <div key={item.source}>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>{item.source}</span>
                          <span>{item.count} leads ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CRM Pipeline Funnel */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <h4 className="font-extrabold text-sm text-[#24476B] mb-4 flex items-center justify-between">
                  <span>Conversion Pipeline Funnel</span>
                  <span className="text-xs text-slate-400 font-normal">Stage Distribution</span>
                </h4>

                <div className="space-y-2">
                  {PIPELINE_STAGES.map((stg) => {
                    const count = enquiries.filter((e) => e.status === stg).length;
                    return (
                      <div
                        key={stg}
                        onClick={() => {
                          setStatusFilter(stg);
                          setActiveTab('enquiries');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#24476B]" />
                          <span className="font-bold text-slate-800">{stg}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENQUIRIES CENTRAL TABLE */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, phone, student, ID..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#24476B]"
                />
              </div>

              {/* Dropdowns */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  {PIPELINE_STAGES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="Lost">Lost / Not Interested</option>
                  <option value="Duplicate">Duplicate</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="schedule_call">📞 Call</option>
                  <option value="book_visit">🏫 Visit</option>
                  <option value="course_enquiry">📚 Course</option>
                  <option value="general_enquiry">💬 General</option>
                </select>

                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="All">All Sources</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Google Organic">Google Organic</option>
                  <option value="Google Business Profile">Google Business</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                </select>

                <button
                  type="button"
                  onClick={() => exportEnquiriesToCSV(filteredEnquiries)}
                  className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold transition-all flex items-center gap-1.5"
                  title="Export to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>

                <button
                  type="button"
                  onClick={loadData}
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4">ID & Date</th>
                      <th className="py-3 px-4">Parent & Student</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Class & Board</th>
                      <th className="py-3 px-4">Type & Slot</th>
                      <th className="py-3 px-4">Lead Source</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Assigned To</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-slate-400 text-sm">
                          No matching enquiries found.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((e) => (
                        <tr key={e.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-extrabold text-[#24476B] block">{e.id}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(e.created_at).toLocaleDateString('en-IN', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-800 block">{e.parent_name}</span>
                            <span className="text-slate-500 text-[11px]">
                              Student: {e.student_name || '—'}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-slate-700">{e.mobile}</span>
                            </div>
                            <div className="flex gap-2 mt-1">
                              <a
                                href={`tel:${e.mobile.replace(/\s+/g, '')}`}
                                className="text-[#24476B] hover:underline inline-flex items-center gap-1 font-bold text-[10px]"
                              >
                                <Phone className="w-3 h-3 text-[#36A9E1]" /> Call
                              </a>
                              <button
                                type="button"
                                onClick={() => openWhatsApp(e, 'confirm')}
                                className="text-emerald-600 hover:underline inline-flex items-center gap-1 font-bold text-[10px]"
                              >
                                <MessageSquare className="w-3 h-3" /> WhatsApp
                              </button>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-800 block">{e.student_class}</span>
                            <span className="text-[10px] text-slate-400">{e.academic_board}</span>
                          </td>

                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                e.enquiry_type === 'schedule_call'
                                  ? 'bg-[#36A9E1]/15 text-[#24476B]'
                                  : e.enquiry_type === 'book_visit'
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {e.enquiry_type === 'schedule_call' && '📞 Call'}
                              {e.enquiry_type === 'book_visit' && '🏫 Visit'}
                              {e.enquiry_type === 'course_enquiry' && '📚 Course'}
                              {e.enquiry_type === 'general_enquiry' && '💬 General'}
                            </span>
                            {e.booking_date && (
                              <span className="block text-[11px] text-slate-600 font-semibold mt-0.5">
                                {e.booking_date} ({e.booking_time_slot})
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-md font-semibold text-[10px] bg-slate-100 text-slate-700">
                              {e.lead_source}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                e.status === 'New'
                                  ? 'bg-rose-100 text-rose-800'
                                  : e.status === 'Converted'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : e.status === 'Visit Scheduled'
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {e.status}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-slate-600 font-medium">
                            {e.assigned_to || 'Unassigned'}
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedEnquiry(e)}
                              className="px-3 py-1.5 bg-[#24476B] hover:bg-[#1a344f] text-white font-bold rounded-xl text-xs transition-all cursor-pointer inline-flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Profile</span>
                            </button>
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

        {/* TAB 3: CRM PIPELINE (KANBAN BOARD) */}
        {activeTab === 'pipeline' && (
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-4 min-w-[1200px]">
              {PIPELINE_STAGES.map((stage) => {
                const stageLeads = enquiries.filter((e) => e.status === stage);
                return (
                  <div key={stage} className="w-72 bg-slate-100/80 rounded-2xl p-3 flex flex-col shrink-0">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="font-extrabold text-xs text-[#24476B]">{stage}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-white rounded-full text-slate-600 shadow-xs">
                        {stageLeads.length}
                      </span>
                    </div>

                    <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[70vh]">
                      {stageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedEnquiry(lead)}
                          className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                            <span className="font-bold text-[#24476B]">{lead.id}</span>
                            <span>{lead.lead_source}</span>
                          </div>

                          <h5 className="font-bold text-xs text-slate-800">{lead.parent_name}</h5>
                          <p className="text-[11px] text-slate-500">
                            {lead.student_name} • {lead.student_class}
                          </p>

                          {lead.booking_date && (
                            <div className="mt-2 text-[10px] font-bold text-[#F47B45] bg-amber-50 px-2 py-1 rounded-md">
                              📅 {lead.booking_date} ({lead.booking_time_slot})
                            </div>
                          )}

                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                            <span>{lead.assigned_to}</span>
                            <span className="font-bold text-emerald-600">Open →</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: CALLS & VISITS SCHEDULE */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-[#24476B]">Scheduled Consultations & Visits</h3>
              <p className="text-xs text-slate-500">
                Preventing overlapping slots across phone calls, WhatsApp consultations, and centre visits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Calls Section */}
              <div className="border border-slate-200 rounded-2xl p-4">
                <h4 className="font-bold text-sm text-[#36A9E1] flex items-center gap-2 mb-3">
                  <Phone className="w-4 h-4" />
                  <span>Scheduled Counselling Calls</span>
                </h4>
                <div className="space-y-2.5">
                  {enquiries
                    .filter((e) => e.enquiry_type === 'schedule_call' && e.booking_date)
                    .map((e) => (
                      <div key={e.id} className="p-3 bg-blue-50/50 rounded-xl flex items-center justify-between text-xs">
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

              {/* Visits Section */}
              <div className="border border-slate-200 rounded-2xl p-4">
                <h4 className="font-bold text-sm text-[#F47B45] flex items-center gap-2 mb-3">
                  <Building className="w-4 h-4" />
                  <span>Tuition Centre Visits (Gupta Park)</span>
                </h4>
                <div className="space-y-2.5">
                  {enquiries
                    .filter((e) => e.enquiry_type === 'book_visit' && e.booking_date)
                    .map((e) => (
                      <div key={e.id} className="p-3 bg-amber-50/50 rounded-xl flex items-center justify-between text-xs">
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
        )}

        {/* TAB 5: REPORTS & ANALYTICS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <h4 className="font-bold text-sm text-[#24476B] mb-2">Overall Conversion Rate</h4>
                <div className="text-4xl font-black text-emerald-600 mb-1">{metrics.conversionRate}%</div>
                <p className="text-xs text-slate-500">
                  {metrics.convertedLeads} admissions from {metrics.totalEnquiries} total inquiries
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <h4 className="font-bold text-sm text-[#24476B] mb-2">Top Lead Channel</h4>
                <div className="text-2xl font-black text-[#F47B45] mb-1">Google Ads & GBP</div>
                <p className="text-xs text-slate-500">Generates 68% of weekly booked centre visits</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                <h4 className="font-bold text-sm text-[#24476B] mb-2">Most Enquired Stage</h4>
                <div className="text-2xl font-black text-indigo-600 mb-1">Class 4 to 8</div>
                <p className="text-xs text-slate-500">Focus on Maths and Science concept foundation</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SUPABASE SQL CONFIGURATION */}
        {activeTab === 'database' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-[#24476B] flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <span>Supabase Schema & Setup</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Run this SQL in your Supabase SQL Editor to enable public inserts and secure counsellor management.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
                  setCopiedSql(true);
                  setTimeout(() => setCopiedSql(false), 2000);
                }}
                className="px-4 py-2 bg-[#24476B] hover:bg-[#1a344f] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedSql ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto max-h-96">
              {SUPABASE_SQL_SCHEMA}
            </pre>
          </div>
        )}
      </div>

      {/* ENQUIRY DETAIL MODAL / PROFILE DRAWER */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in duration-150">
            {/* Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg text-[#24476B]">
                    Enquiry {selectedEnquiry.id}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      selectedEnquiry.status === 'New'
                        ? 'bg-rose-100 text-rose-800'
                        : selectedEnquiry.status === 'Converted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {selectedEnquiry.status}
                  </span>
                  {selectedEnquiry.is_duplicate && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                      Duplicate Lead
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500">
                  Received via {selectedEnquiry.lead_source} on{' '}
                  {new Date(selectedEnquiry.created_at).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              {/* Quick Communication Actions */}
              <div className="p-4 bg-emerald-50 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-emerald-900 block text-sm">
                    {selectedEnquiry.parent_name} • {selectedEnquiry.mobile}
                  </span>
                  <span className="text-emerald-700 text-xs">
                    Student: {selectedEnquiry.student_name} ({selectedEnquiry.student_class} - {selectedEnquiry.academic_board})
                  </span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${selectedEnquiry.mobile.replace(/\s+/g, '')}`}
                    className="px-3.5 py-2 bg-white text-slate-800 hover:bg-slate-50 font-bold rounded-xl shadow-xs inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-4 h-4 text-[#36A9E1]" /> Call Now
                  </a>
                  <button
                    type="button"
                    onClick={() => openWhatsApp(selectedEnquiry, 'confirm')}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" /> Send WhatsApp
                  </button>
                </div>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                  <h5 className="font-extrabold text-[#24476B] text-xs uppercase tracking-wider">
                    Student & Academic Profile
                  </h5>
                  <div><strong>Class:</strong> {selectedEnquiry.student_class}</div>
                  <div><strong>Board:</strong> {selectedEnquiry.academic_board}</div>
                  <div><strong>School:</strong> {selectedEnquiry.school_name || 'Not provided'}</div>
                  <div><strong>Branch:</strong> {selectedEnquiry.preferred_branch}</div>
                  <div><strong>Subjects:</strong> {(selectedEnquiry.subjects || []).join(', ') || 'General'}</div>
                  <div><strong>Learning Mode:</strong> {selectedEnquiry.mode}</div>
                  <div><strong>Batch Timing:</strong> {selectedEnquiry.preferred_batch_timing}</div>
                  <div><strong>Goal:</strong> {selectedEnquiry.academic_goal}</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                  <h5 className="font-extrabold text-[#24476B] text-xs uppercase tracking-wider">
                    Booking & Campaign Info
                  </h5>
                  <div><strong>Enquiry Type:</strong> {selectedEnquiry.enquiry_type.replace('_', ' ')}</div>
                  {selectedEnquiry.booking_date && (
                    <div>
                      <strong>Appointment Slot:</strong> {selectedEnquiry.booking_date} at {selectedEnquiry.booking_time_slot}
                    </div>
                  )}
                  {selectedEnquiry.call_preference && (
                    <div><strong>Call Preference:</strong> {selectedEnquiry.call_preference}</div>
                  )}
                  <div><strong>Lead Source:</strong> {selectedEnquiry.lead_source}</div>
                  {selectedEnquiry.utm_campaign && (
                    <div><strong>Campaign:</strong> {selectedEnquiry.utm_campaign}</div>
                  )}
                  {selectedEnquiry.specific_requirement && (
                    <div className="mt-2 p-2 bg-amber-50 text-amber-900 rounded-lg">
                      <strong>Specific Notes:</strong> {selectedEnquiry.specific_requirement}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Update & Rescheduling Form */}
              <div className="p-4 bg-slate-50 rounded-2xl space-y-4">
                <h5 className="font-extrabold text-[#24476B] text-xs uppercase tracking-wider">
                  Counsellor Action & Workflow
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Update Status</label>
                    <select
                      value={statusChange}
                      onChange={(e) => setStatusChange(e.target.value as LeadStatus)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    >
                      {PIPELINE_STAGES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                      <option value="Not Interested">Not Interested</option>
                      <option value="Not Reachable">Not Reachable</option>
                      <option value="Lost">Lost</option>
                      <option value="Duplicate">Duplicate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Assigned Counsellor</label>
                    <select
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    >
                      {COUNSELLORS.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Next Follow-up Date</label>
                    <input
                      type="date"
                      value={newFollowupDate}
                      onChange={(e) => setNewFollowupDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                {(selectedEnquiry.enquiry_type === 'schedule_call' || selectedEnquiry.enquiry_type === 'book_visit') && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Reschedule Date</label>
                      <input
                        type="date"
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Reschedule Slot</label>
                      <select
                        value={rescheduleSlot}
                        onChange={(e) => setRescheduleSlot(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                      >
                        {TIME_SLOTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Add Follow-up Note / Remark</label>
                  <textarea
                    rows={2}
                    value={newRemark}
                    onChange={(e) => setNewRemark(e.target.value)}
                    placeholder="Enter discussion summary, student needs, next steps..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleSaveEnquiry}
                    className="px-5 py-2.5 bg-[#24476B] hover:bg-[#1a344f] text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Save & Update Lead
                  </button>
                </div>
              </div>

              {/* Activity Timeline */}
              <div>
                <h5 className="font-extrabold text-[#24476B] text-xs uppercase tracking-wider mb-3">
                  Activity Timeline & Audit Trail
                </h5>
                <div className="space-y-2 border-l-2 border-slate-200 pl-4 ml-2">
                  {(selectedEnquiry.timeline || []).map((log) => (
                    <div key={log.id} className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#24476B] absolute -left-[21px] top-1" />
                      <div className="font-bold text-slate-800 text-xs">{log.title}</div>
                      <div className="text-slate-500 text-[11px]">{log.description}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(log.timestamp).toLocaleString('en-IN')} by {log.performedBy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
