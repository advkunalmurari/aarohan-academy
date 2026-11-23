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
  PhoneCall,
  UserPlus,
  AlertTriangle,
  Check,
  X,
  FileText,
  DollarSign,
  UserX,
  PhoneForwarded,
  Activity,
  Briefcase,
} from 'lucide-react';
import {
  EnquiryRecord,
  LeadStatus,
  LeadSource,
  AdminRole,
  CallOutcome,
  VisitCompletionRecord,
  AdmissionConversionRecord,
  StudyMode,
  AcademicBoard,
  PriorityLevel,
} from '../../types/enquiry';
import {
  getAllEnquiries,
  createEnquiry,
  updateEnquiry,
  logCall,
  scheduleVisit,
  markVisitCompleted,
  convertLeadToAdmission,
  calculateMetrics,
  exportEnquiriesToCSV,
  detectDuplicateLead,
  COUNSELLORS,
  BRANCHES,
  TIME_SLOTS,
} from '../../services/enquiryService';
import { Language, PageId } from '../../utils/academyLogic';

interface AdminPortalProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

const LIFECYCLE_STATUSES: LeadStatus[] = [
  'New',
  'Contact Pending',
  'Contacted',
  'Interested',
  'Follow-up Required',
  'Visit Scheduled',
  'Visit Completed',
  'Admission Converted',
  'Not Interested',
  'Lost',
  'Invalid Lead',
];

const LEAD_SOURCES: LeadSource[] = [
  'Website',
  'Google Ads',
  'Google Organic',
  'Google Business Profile',
  'WhatsApp',
  'Phone Call',
  'Walk-in',
  'Referral',
  'Instagram',
  'Facebook',
  'Advertisement',
  'Existing Student',
  'Other',
];

const CALL_OUTCOMES: CallOutcome[] = [
  'Connected',
  'Attempted',
  'No Answer',
  'Busy',
  'Callback Requested',
  'Interested',
  'Follow-up Required',
  'Not Interested',
  'Wrong Number',
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
  const [activeTab, setActiveTab] = useState<'workspace' | 'enquiries' | 'calls' | 'visits' | 'pipeline' | 'analytics'>('workspace');

  // Enquiries Data
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);

  // Search & Multiple Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [classFilter, setClassFilter] = useState<string>('All');
  const [staffFilter, setStaffFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  // Modal State Triggers
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showLogCallModal, setShowLogCallModal] = useState<EnquiryRecord | null>(null);
  const [showScheduleVisitModal, setShowScheduleVisitModal] = useState<EnquiryRecord | null>(null);
  const [showCompleteVisitModal, setShowCompleteVisitModal] = useState<EnquiryRecord | null>(null);
  const [showConvertModal, setShowConvertModal] = useState<EnquiryRecord | null>(null);
  const [showFollowupModal, setShowFollowupModal] = useState<EnquiryRecord | null>(null);

  // Form Fields for Modals
  // 1. Add Lead
  const [newLeadForm, setNewLeadForm] = useState({
    student_name: '',
    parent_name: '',
    mobile: '',
    alternate_mobile: '',
    email: '',
    student_class: 'Class 5',
    school_name: '',
    academic_board: 'CBSE' as AcademicBoard,
    preferred_branch: BRANCHES[0],
    subjects: ['Mathematics', 'Science'],
    mode: 'Offline' as StudyMode,
    lead_source: 'Walk-in' as LeadSource,
    priority: 'Medium' as PriorityLevel,
    assigned_to: COUNSELLORS[0],
    remarks: '',
  });
  const [duplicateWarning, setDuplicateWarning] = useState<EnquiryRecord | null>(null);

  // 2. Log Call
  const [callOutcome, setCallOutcome] = useState<CallOutcome>('Connected');
  const [callDuration, setCallDuration] = useState('3 mins');
  const [callRemarks, setCallRemarks] = useState('');
  const [callNextFollowup, setCallNextFollowup] = useState('');

  // 3. Schedule Visit
  const [visitDate, setVisitDate] = useState('');
  const [visitSlot, setVisitSlot] = useState(TIME_SLOTS[0]);
  const [visitorsCount, setVisitorsCount] = useState(2);
  const [visitRemarks, setVisitRemarks] = useState('');

  // 4. Complete Visit
  const [visitCompletion, setVisitCompletion] = useState<VisitCompletionRecord>({
    visitDate: new Date().toISOString().split('T')[0],
    visitTime: '04:30 PM',
    whoVisited: 'Parent & Student',
    parentName: '',
    studentName: '',
    handledBy: COUNSELLORS[0],
    requirementsDiscussed: 'Small batch tuition for Maths & Science',
    programmeInterested: 'Primary Stage 3–5',
    feeDiscussed: 1600,
    interestLevel: 'High',
    nextAction: 'Schedule free 2-day trial class',
    remarks: 'Parent was very impressed with CCTV and small batch guarantee.',
  });

  // 5. Convert Admission
  const [conversionForm, setConversionForm] = useState<AdmissionConversionRecord>({
    admissionDate: new Date().toISOString().split('T')[0],
    studentName: '',
    studentClass: '',
    programme: 'Class 5 Foundation (Maths + Science)',
    subjects: ['Mathematics', 'Science'],
    batchTiming: '04:30 PM - 06:00 PM',
    monthlyFee: 1600,
    paymentStatus: 'Paid',
    counsellor: COUNSELLORS[0],
    remarks: 'Admission confirmed. Welcome kit & worksheets handed over.',
  });

  // 6. Follow-up
  const [followupDate, setFollowupDate] = useState('');
  const [followupTime, setFollowupTime] = useState('04:00 PM');
  const [followupAction, setFollowupAction] = useState('Call parent to discuss trial class feedback');

  // Load Data
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

  // Today string
  const todayStr = new Date().toISOString().split('T')[0];

  // Daily Workspace Items
  const workspaceData = useMemo(() => {
    const callsDueToday = enquiries.filter(
      (e) =>
        e.booking_date === todayStr &&
        e.enquiry_type === 'schedule_call' &&
        e.status !== 'Admission Converted' &&
        e.status !== 'Lost'
    );

    const followupsDueToday = enquiries.filter(
      (e) =>
        e.next_followup_date === todayStr &&
        e.status !== 'Admission Converted' &&
        e.status !== 'Lost' &&
        e.status !== 'Invalid Lead'
    );

    const followupsOverdue = enquiries.filter(
      (e) =>
        e.next_followup_date &&
        e.next_followup_date < todayStr &&
        e.status !== 'Admission Converted' &&
        e.status !== 'Lost' &&
        e.status !== 'Invalid Lead'
    );

    const visitsToday = enquiries.filter(
      (e) =>
        e.booking_date === todayStr &&
        e.status === 'Visit Scheduled'
    );

    const newUncontacted = enquiries.filter((e) => e.status === 'New');

    return {
      callsDueToday,
      followupsDueToday,
      followupsOverdue,
      visitsToday,
      newUncontacted,
    };
  }, [enquiries, todayStr]);

  // Filtered Enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchSearch =
        searchQuery === '' ||
        e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.parent_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.mobile.includes(searchQuery) ||
        (e.email && e.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (e.school_name && e.school_name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = statusFilter === 'All' || e.status === statusFilter;
      const matchSource = sourceFilter === 'All' || e.lead_source === sourceFilter;
      const matchClass = classFilter === 'All' || e.student_class === classFilter;
      const matchStaff = staffFilter === 'All' || e.assigned_to === staffFilter;
      const matchPriority = priorityFilter === 'All' || e.priority === priorityFilter;

      return matchSearch && matchStatus && matchSource && matchClass && matchStaff && matchPriority;
    });
  }, [enquiries, searchQuery, statusFilter, sourceFilter, classFilter, staffFilter, priorityFilter]);

  // Handler: Add Lead Manually
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.parent_name || !newLeadForm.mobile) {
      alert('Parent Name and Mobile number are required.');
      return;
    }

    const created = await createEnquiry({
      enquiry_type: newLeadForm.lead_source === 'Walk-in' ? 'walk_in' : 'course_enquiry',
      parent_name: newLeadForm.parent_name,
      student_name: newLeadForm.student_name || 'Student',
      mobile: newLeadForm.mobile,
      alternate_mobile: newLeadForm.alternate_mobile,
      whatsapp: newLeadForm.mobile,
      email: newLeadForm.email,
      student_class: newLeadForm.student_class,
      school_name: newLeadForm.school_name,
      academic_board: newLeadForm.academic_board,
      preferred_branch: newLeadForm.preferred_branch,
      subjects: newLeadForm.subjects,
      mode: newLeadForm.mode,
      preferred_batch_timing: '04:30 PM - 06:00 PM',
      academic_goal: 'Regular Tuition',
      lead_source: newLeadForm.lead_source,
    });

    if (newLeadForm.remarks.trim()) {
      await updateEnquiry(created.id, {
        remarks: newLeadForm.remarks.trim(),
        assigned_to: newLeadForm.assigned_to,
        priority: newLeadForm.priority,
      });
    }

    setShowAddLeadModal(false);
    setNewLeadForm({
      student_name: '',
      parent_name: '',
      mobile: '',
      alternate_mobile: '',
      email: '',
      student_class: 'Class 5',
      school_name: '',
      academic_board: 'CBSE',
      preferred_branch: BRANCHES[0],
      subjects: ['Mathematics', 'Science'],
      mode: 'Offline',
      lead_source: 'Walk-in',
      priority: 'Medium',
      assigned_to: COUNSELLORS[0],
      remarks: '',
    });
    setDuplicateWarning(null);
    await loadData();
    alert(`New Lead ${created.id} created successfully!`);
  };

  // Check phone duplicate on change
  const handlePhoneBlur = async (phone: string) => {
    if (phone.length >= 10) {
      const dup = await detectDuplicateLead(phone);
      setDuplicateWarning(dup);
    } else {
      setDuplicateWarning(null);
    }
  };

  // Handler: Submit Call Log
  const handleSubmitCallLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showLogCallModal) return;

    await logCall(showLogCallModal.id, {
      staffName: currentUser,
      outcome: callOutcome,
      duration: callDuration,
      remarks: callRemarks,
      nextFollowupDate: callNextFollowup || undefined,
    });

    setShowLogCallModal(null);
    setCallRemarks('');
    setCallNextFollowup('');
    await loadData();
    alert('Call record logged successfully!');
  };

  // Handler: Submit Schedule Visit
  const handleSubmitScheduleVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showScheduleVisitModal || !visitDate) {
      alert('Please select a visit date.');
      return;
    }

    await scheduleVisit(showScheduleVisitModal.id, {
      visitDate,
      visitTime: visitSlot,
      staffName: currentUser,
      visitorsCount: Number(visitorsCount) || 2,
      remarks: visitRemarks,
    });

    setShowScheduleVisitModal(null);
    setVisitDate('');
    setVisitRemarks('');
    await loadData();
    alert('Campus visit scheduled successfully!');
  };

  // Handler: Submit Complete Visit
  const handleSubmitCompleteVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showCompleteVisitModal) return;

    await markVisitCompleted(showCompleteVisitModal.id, {
      ...visitCompletion,
      studentName: showCompleteVisitModal.student_name,
      parentName: showCompleteVisitModal.parent_name,
      handledBy: currentUser,
    });

    setShowCompleteVisitModal(null);
    await loadData();
    alert('Tuition centre visit marked as completed!');
  };

  // Handler: Submit Convert Admission
  const handleSubmitConversion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showConvertModal) return;

    await convertLeadToAdmission(showConvertModal.id, {
      ...conversionForm,
      studentName: showConvertModal.student_name,
      studentClass: showConvertModal.student_class,
      counsellor: currentUser,
    });

    setShowConvertModal(null);
    await loadData();
    alert('🎉 Lead successfully converted to Admission!');
  };

  // Quick WhatsApp Launcher with Automatic Activity Audit
  const handleInitiateWhatsApp = async (e: EnquiryRecord) => {
    const rawNumber = e.whatsapp || e.mobile;
    const cleanNumber = rawNumber.replace(/\D/g, '').slice(-10);
    const msg = `Namaste ${e.parent_name} ji! Greetings from Aarohan Academy, Najafgarh (Gupta Park). We received your tuition inquiry for ${e.student_name} (${e.student_class}). How can we assist you with batch timings and a free demo session today?`;

    // Log to activity timeline
    await updateEnquiry(e.id, {}, {
      type: 'note',
      title: 'WhatsApp Communication Initiated',
      description: `Sent message to +91 ${cleanNumber} via WhatsApp by ${currentUser}.`,
      performedBy: currentUser,
    });

    window.open(`https://wa.me/91${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    await loadData();
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
                className="w-full px-4 py-3 text-center text-sm font-bold tracking-widest rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#24476B]"
              />
              {authError && (
                <p className="text-xs text-red-500 font-semibold mt-2">
                  Incorrect passcode. (Try: aarohan2026)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#24476B] hover:bg-[#1a344f] text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
            >
              Access CRM Console
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
      {/* =========================================================================
          TOP EXECUTIVE CONSOLE BAR
      ========================================================================= */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#24476B] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5 text-[#FFC845]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-[#24476B] leading-none">
                  Aarohan Lead Management & CRM
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Database
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Campus: H.No. 49B Gupta Park, Todarmal Colony, Najafgarh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddLeadModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFC845] hover:bg-[#f8b61e] text-[#1B3552] text-xs font-extrabold transition-all cursor-pointer shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add New Lead</span>
            </button>

            <button
              type="button"
              onClick={() => exportEnquiriesToCSV(filteredEnquiries)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#FFC845]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              type="button"
              onClick={loadData}
              title="Refresh CRM"
              className="p-2 text-slate-600 hover:text-[#24476B] hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#24476B]' : ''}`} />
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

        {/* =========================================================================
            OPERATIONAL KPI CARDS ROW (CLICKABLE FILTERS)
        ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto border-t border-slate-100">
          <div className="flex items-center gap-2 min-w-max">
            {/* Total */}
            <button
              type="button"
              onClick={() => { setStatusFilter('All'); setActiveTab('enquiries'); }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-left cursor-pointer"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Enquiries</span>
              <span className="text-base font-black text-[#24476B]">{metrics.totalEnquiries}</span>
            </button>

            {/* New */}
            <button
              type="button"
              onClick={() => { setStatusFilter('New'); setActiveTab('enquiries'); }}
              className="px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-50 transition-all text-left cursor-pointer"
            >
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">New Uncontacted</span>
              <span className="text-base font-black text-amber-900">{metrics.newEnquiries}</span>
            </button>

            {/* Calls Pending */}
            <button
              type="button"
              onClick={() => setActiveTab('calls')}
              className="px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-50 transition-all text-left cursor-pointer"
            >
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Calls Pending</span>
              <span className="text-base font-black text-blue-900">{metrics.callsPending}</span>
            </button>

            {/* Follow-ups Due Today */}
            <button
              type="button"
              onClick={() => setActiveTab('workspace')}
              className="px-3 py-1.5 rounded-xl border border-orange-200 bg-orange-50/60 hover:bg-orange-50 transition-all text-left cursor-pointer"
            >
              <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block">Follow-ups Today</span>
              <span className="text-base font-black text-orange-900">{metrics.followupsDueToday}</span>
            </button>

            {/* Overdue */}
            <button
              type="button"
              onClick={() => setActiveTab('workspace')}
              className="px-3 py-1.5 rounded-xl border border-red-200 bg-red-50/60 hover:bg-red-50 transition-all text-left cursor-pointer"
            >
              <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">Overdue</span>
              <span className="text-base font-black text-red-900">{metrics.followupsOverdue}</span>
            </button>

            {/* Visits Scheduled */}
            <button
              type="button"
              onClick={() => { setStatusFilter('Visit Scheduled'); setActiveTab('enquiries'); }}
              className="px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-50 transition-all text-left cursor-pointer"
            >
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">Visits Scheduled</span>
              <span className="text-base font-black text-indigo-900">{metrics.visitsScheduled}</span>
            </button>

            {/* Visits Completed */}
            <button
              type="button"
              onClick={() => { setStatusFilter('Visit Completed'); setActiveTab('enquiries'); }}
              className="px-3 py-1.5 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-50 transition-all text-left cursor-pointer"
            >
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Visits Completed</span>
              <span className="text-base font-black text-teal-900">{metrics.visitsCompleted}</span>
            </button>

            {/* Admissions Converted */}
            <button
              type="button"
              onClick={() => { setStatusFilter('Admission Converted'); setActiveTab('enquiries'); }}
              className="px-3.5 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 transition-all text-left cursor-pointer"
            >
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Admissions</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black text-emerald-900">{metrics.admissionsConverted}</span>
                <span className="text-[10px] font-extrabold text-emerald-700">({metrics.conversionRate}%)</span>
              </div>
            </button>

            {/* Lost */}
            <button
              type="button"
              onClick={() => { setStatusFilter('Lost'); setActiveTab('enquiries'); }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-left cursor-pointer"
            >
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Lost / Dropped</span>
              <span className="text-base font-black text-slate-600">{metrics.lostLeads}</span>
            </button>
          </div>
        </div>

        {/* NAVIGATION MODULE TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto text-xs font-bold border-t border-slate-100 py-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('workspace')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'workspace' ? 'bg-[#24476B] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Today's Work & Action Queue</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'enquiries' ? 'bg-[#24476B] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>All Leads ({enquiries.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('calls')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'calls' ? 'bg-[#24476B] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Tracking History</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('visits')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'visits' ? 'bg-[#24476B] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Campus Visit Manager</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'pipeline' ? 'bg-[#24476B] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Conversion Pipeline</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'analytics' ? 'bg-[#24476B] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Source-to-Admission Attribution</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          MODULE 1: TODAY'S WORK & DAILY ADMIN WORKSPACE
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'workspace' && (
          <div className="space-y-6">
            {/* Urgent Overdue Alert Banner if any */}
            {workspaceData.followupsOverdue.length > 0 && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between text-xs text-red-900">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="font-bold">
                    {workspaceData.followupsOverdue.length} follow-up(s) are overdue! Prompt contact increases conversion by 3x.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => { setStatusFilter('Follow-up Required'); setActiveTab('enquiries'); }}
                  className="font-bold underline cursor-pointer hover:text-red-700"
                >
                  View Overdue List →
                </button>
              </div>
            )}

            {/* Split Grid: Today's Follow-ups & Scheduled Visits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Box 1: Follow-ups Due Today */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <h3 className="text-sm font-extrabold text-[#24476B] uppercase tracking-wider">
                      Follow-ups Due Today ({workspaceData.followupsDueToday.length})
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{todayStr}</span>
                </div>

                {workspaceData.followupsDueToday.length === 0 ? (
                  <div className="py-10 text-center text-slate-400 text-xs">
                    No follow-ups due today. You are completely up to date!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {workspaceData.followupsDueToday.map((e) => (
                      <div key={e.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-3">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-[#1B3552]">{e.student_name} ({e.student_class})</span>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                              {e.assigned_to}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Parent: {e.parent_name} • {e.mobile}</p>
                          <p className="text-[11px] text-slate-600 mt-1 italic">
                            Action: {e.next_followup_action || e.remarks || 'General follow-up'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                          <div className="flex gap-2">
                            <a
                              href={`tel:${e.mobile}`}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" /> Call
                            </a>
                            <button
                              type="button"
                              onClick={() => handleInitiateWhatsApp(e)}
                              className="px-2.5 py-1 rounded-lg bg-[#25D366] text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                            >
                              <MessageSquare className="w-3 h-3" /> WhatsApp
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowLogCallModal(e)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 text-white font-bold text-[11px] cursor-pointer"
                            >
                              Log Call
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(e)}
                            className="text-xs text-[#24476B] font-bold hover:underline cursor-pointer"
                          >
                            Details →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Box 2: Tuition Centre Visits Scheduled for Today */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-extrabold text-[#24476B] uppercase tracking-wider">
                      Centre Visits Today ({workspaceData.visitsToday.length})
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">H.No. 49B Gupta Park</span>
                </div>

                {workspaceData.visitsToday.length === 0 ? (
                  <div className="py-10 text-center text-slate-400 text-xs">
                    No tuition centre visits scheduled for today.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {workspaceData.visitsToday.map((e) => (
                      <div key={e.id} className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-200 flex flex-col justify-between gap-3">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-indigo-950">
                              {e.parent_name} (Student: {e.student_name} - {e.student_class})
                            </span>
                            <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                              {e.booking_time_slot || 'Time TBA'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            {e.visitors_count || 2} visitors • Goal: {e.academic_goal || 'Tuition'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-indigo-100">
                          <button
                            type="button"
                            onClick={() => setShowCompleteVisitModal(e)}
                            className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] cursor-pointer"
                          >
                            Mark Visit Completed
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(e)}
                            className="text-xs text-indigo-900 font-bold hover:underline cursor-pointer"
                          >
                            View Record →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Box 3: New Uncontacted Inquiries */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-extrabold text-[#24476B] uppercase tracking-wider">
                    New Inquiries Awaiting First Contact ({workspaceData.newUncontacted.length})
                  </h3>
                </div>
                <span className="text-xs text-slate-400">Target response time: &lt; 15 mins</span>
              </div>

              {workspaceData.newUncontacted.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  Zero uncontacted inquiries! All incoming leads have been assigned and initiated.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {workspaceData.newUncontacted.map((e) => (
                    <div key={e.id} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-[#1B3552]">{e.student_name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                            {e.student_class}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">Parent: {e.parent_name}</p>
                        <p className="text-xs font-mono text-slate-500">{e.mobile}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">Source: {e.lead_source}</span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-amber-200 flex items-center justify-between">
                        <div className="flex gap-2">
                          <a
                            href={`tel:${e.mobile}`}
                            className="p-1.5 rounded-lg bg-emerald-600 text-white"
                            title="Call"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleInitiateWhatsApp(e)}
                            className="p-1.5 rounded-lg bg-[#25D366] text-white cursor-pointer"
                            title="WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowLogCallModal(e)}
                            className="px-2 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-lg cursor-pointer"
                          >
                            Log First Call
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            MODULE 2: MASTER LEAD DATABASE (CENTRAL CRM TABLE)
        ========================================================================= */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-2.5 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student, parent, phone..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#24476B]"
                />
              </div>

              {/* Multi-Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  {LIFECYCLE_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer"
                >
                  <option value="All">All Sources</option>
                  {LEAD_SOURCES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer"
                >
                  <option value="All">All Classes</option>
                  {['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select
                  value={staffFilter}
                  onChange={(e) => setStaffFilter(e.target.value)}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer"
                >
                  <option value="All">All Staff</option>
                  {COUNSELLORS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer"
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                {(statusFilter !== 'All' || sourceFilter !== 'All' || classFilter !== 'All' || staffFilter !== 'All' || priorityFilter !== 'All' || searchQuery !== '') && (
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter('All');
                      setSourceFilter('All');
                      setClassFilter('All');
                      setStaffFilter('All');
                      setPriorityFilter('All');
                      setSearchQuery('');
                    }}
                    className="text-xs text-red-600 font-bold hover:underline px-2 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Real Data Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <th className="py-3 px-4">Lead ID & Date</th>
                      <th className="py-3 px-4">Student & Parent</th>
                      <th className="py-3 px-4">Class & Board</th>
                      <th className="py-3 px-4">Contact Phone</th>
                      <th className="py-3 px-4">Source</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Assigned Staff</th>
                      <th className="py-3 px-4 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center">
                          <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm font-bold text-slate-600">No enquiries found in database</p>
                          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                            Actual enquiries received via the website, Google Ads, or entered manually via "+ Add New Lead" will appear here in real time.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((e) => (
                        <tr
                          key={e.id}
                          className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                          onClick={() => setSelectedEnquiry(e)}
                        >
                          <td className="py-3.5 px-4 font-mono">
                            <span className="font-bold text-[#1B3552] block">{e.id}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(e.created_at).toLocaleDateString()}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block group-hover:text-blue-600 transition-colors">
                              {e.student_name}
                            </span>
                            <span className="text-[11px] text-slate-500">Parent: {e.parent_name}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-800 block">{e.student_class}</span>
                            <span className="text-[10px] text-slate-400">{e.academic_board || 'CBSE'}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-mono text-slate-700 block">{e.mobile}</span>
                            {e.whatsapp && (
                              <span className="text-[10px] text-emerald-600">WA: {e.whatsapp}</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                              {e.lead_source}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                e.status === 'Admission Converted'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : e.status === 'New'
                                    ? 'bg-amber-100 text-amber-800'
                                    : e.status === 'Visit Scheduled'
                                      ? 'bg-indigo-100 text-indigo-800'
                                      : e.status === 'Interested'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {e.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-slate-600 font-medium">
                            {e.assigned_to}
                          </td>

                          <td className="py-3.5 px-4 text-right" onClick={(evt) => evt.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`tel:${e.mobile}`}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                title="Call"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>

                              <button
                                type="button"
                                onClick={() => handleInitiateWhatsApp(e)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-[#25D366] hover:bg-emerald-50 transition-colors cursor-pointer"
                                title="WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setShowLogCallModal(e)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                                title="Log Call Outcome"
                              >
                                <PhoneCall className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setSelectedEnquiry(e)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-[#24476B] hover:bg-slate-100 transition-colors cursor-pointer"
                                title="View Details"
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
            MODULE 3: CALL TRACKING & CONVERSION FUNNEL
        ========================================================================= */}
        {activeTab === 'calls' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-base font-extrabold text-[#24476B]">
                    Call Activity & Outcome Tracking
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Log and measure outbound & inbound counsellor phone communications
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full">
                    {metrics.callsCompleted} Calls Completed
                  </span>
                </div>
              </div>

              {/* Funnel: Total Calls -> Connected -> Interested -> Visits -> Admissions */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">Total Calls Logged</span>
                  <span className="text-xl font-black text-slate-800">{metrics.callsCompleted}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                  <span className="text-[10px] font-bold text-blue-700 block mb-1">Connected Calls</span>
                  <span className="text-xl font-black text-blue-900">
                    {enquiries.filter((e) => (e.call_history || []).some((c) => c.outcome === 'Connected' || c.outcome === 'Interested')).length}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <span className="text-[10px] font-bold text-amber-700 block mb-1">Interested Parents</span>
                  <span className="text-xl font-black text-amber-900">{metrics.interestedLeads}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-center">
                  <span className="text-[10px] font-bold text-indigo-700 block mb-1">Visits Booked</span>
                  <span className="text-xl font-black text-indigo-900">{metrics.visitsScheduled}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-emerald-700 block mb-1">Admissions</span>
                  <span className="text-xl font-black text-emerald-900">{metrics.admissionsConverted}</span>
                </div>
              </div>

              {/* Call History List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Recent Call Logs
                </h4>
                {enquiries.filter((e) => e.call_history && e.call_history.length > 0).length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    No calls logged yet. Click "Log Call" on any lead in the table to record conversation outcomes.
                  </div>
                ) : (
                  enquiries
                    .filter((e) => e.call_history && e.call_history.length > 0)
                    .flatMap((e) => (e.call_history || []).map((c) => ({ ...c, lead: e })))
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map((call) => (
                      <div key={call.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-xs text-[#1B3552]">
                              {call.lead.student_name} ({call.lead.student_class})
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="text-xs text-slate-600">Parent: {call.lead.parent_name} ({call.lead.mobile})</span>
                          </div>
                          <p className="text-xs text-slate-700 font-medium">{call.remarks || 'No remarks entered'}</p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                            <span>Logged by: {call.staffName}</span>
                            <span>•</span>
                            <span>{new Date(call.timestamp).toLocaleString()}</span>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          {call.outcome}
                        </span>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODULE 4: CAMPUS VISIT MANAGEMENT & VISITOR AUDIT
        ========================================================================= */}
        {activeTab === 'visits' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-base font-extrabold text-[#24476B]">
                    Campus Visitor Tracking & Completed Visit Reports
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    How many people actually visited the academy at H.No. 49B Gupta Park?
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full">
                    {metrics.visitsScheduled} Scheduled
                  </span>
                  <span className="text-xs bg-teal-50 text-teal-700 font-bold px-3 py-1 rounded-full">
                    {metrics.visitsCompleted} Completed
                  </span>
                </div>
              </div>

              {/* Completed Visit Audits */}
              <div className="space-y-3">
                {enquiries.filter((e) => e.status === 'Visit Completed' || e.visit_details).length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    No completed visits recorded yet. When parents visit the centre, click "Mark Visit Completed" on their record.
                  </div>
                ) : (
                  enquiries
                    .filter((e) => e.visit_details)
                    .map((e) => {
                      const v = e.visit_details!;
                      return (
                        <div key={e.id} className="p-5 rounded-2xl bg-teal-50/40 border border-teal-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-teal-950">
                              {v.studentName} ({e.student_class}) & {v.parentName}
                            </span>
                            <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-0.5 rounded-full">
                              Interest: {v.interestLevel}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
                            <div>
                              <strong className="text-slate-700 block">Who Visited:</strong> {v.whoVisited}
                            </div>
                            <div>
                              <strong className="text-slate-700 block">Programme Discussed:</strong> {v.programmeInterested}
                            </div>
                            <div>
                              <strong className="text-slate-700 block">Handled By:</strong> {v.handledBy}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-teal-100 text-xs">
                            <strong className="text-slate-800">Discussion Notes:</strong> {v.requirementsDiscussed}
                          </div>
                          <div className="text-xs">
                            <strong className="text-slate-800">Next Action:</strong> {v.nextAction}
                          </div>

                          <div className="pt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={() => setShowConvertModal(e)}
                              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-xs"
                            >
                              Convert to Admission →
                            </button>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODULE 5: CONVERSION SALES PIPELINE (KANBAN MATRIX)
        ========================================================================= */}
        {activeTab === 'pipeline' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-extrabold text-[#24476B]">
                  Admission Conversion Stages
                </h3>
                <p className="text-xs text-slate-500">
                  Track every lead from initial contact to admission confirmation
                </p>
              </div>
              <span className="text-xs text-slate-500">Total Leads: {enquiries.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 overflow-x-auto">
              {['New', 'Contacted', 'Interested', 'Visit Scheduled', 'Visit Completed', 'Admission Converted'].map((stage) => {
                const stageLeads = enquiries.filter((e) => e.status === stage);
                return (
                  <div key={stage} className="bg-slate-100/70 rounded-2xl p-3.5 border border-slate-200">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="font-bold text-xs text-slate-700">{stage}</span>
                      <span className="text-[11px] font-bold bg-white text-slate-600 px-2 py-0.5 rounded-full shadow-2xs">
                        {stageLeads.length}
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
                      {stageLeads.length === 0 ? (
                        <div className="p-4 bg-white/60 rounded-xl text-center text-[11px] text-slate-400">
                          Empty
                        </div>
                      ) : (
                        stageLeads.map((e) => (
                          <div
                            key={e.id}
                            onClick={() => setSelectedEnquiry(e)}
                            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <span className="font-bold text-xs text-[#1B3552]">{e.student_name}</span>
                              <span className="text-[10px] font-semibold text-slate-400">{e.student_class}</span>
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
            MODULE 6: SOURCE-TO-ADMISSION ATTRIBUTION & ANALYTICS
        ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-base font-extrabold text-[#24476B]">
                    Source-to-Admission Attribution Matrix
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Where did our admissions come from? (Calculated 100% dynamically from actual CRM records)
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-200">
                      <th className="py-3 px-4">Marketing Source</th>
                      <th className="py-3 px-4">Total Inquiries</th>
                      <th className="py-3 px-4">Calls Connected</th>
                      <th className="py-3 px-4">Visits Completed</th>
                      <th className="py-3 px-4">Admissions</th>
                      <th className="py-3 px-4 text-right">Conversion Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {LEAD_SOURCES.map((src) => {
                      const srcEnquiries = enquiries.filter((e) => e.lead_source === src);
                      const count = srcEnquiries.length;
                      const calls = srcEnquiries.filter((e) => (e.call_history || []).length > 0 || e.status === 'Contacted').length;
                      const visits = srcEnquiries.filter((e) => e.status === 'Visit Completed' || e.visit_details).length;
                      const admissions = srcEnquiries.filter((e) => e.status === 'Admission Converted' || e.is_converted).length;
                      const rate = count > 0 ? Math.round((admissions / count) * 100) : 0;

                      return (
                        <tr key={src} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-bold text-slate-800">{src}</td>
                          <td className="py-3 px-4 font-semibold text-slate-700">{count}</td>
                          <td className="py-3 px-4 text-slate-600">{calls}</td>
                          <td className="py-3 px-4 text-slate-600">{visits}</td>
                          <td className="py-3 px-4 font-bold text-emerald-600">{admissions}</td>
                          <td className="py-3 px-4 text-right font-extrabold text-[#24476B]">{rate}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          MODAL 1: ADD NEW LEAD MANUALLY
      ========================================================================= */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8 relative">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#24476B]">Add New Lead / Enquiry</h3>
                <p className="text-xs text-slate-500">Record a walk-in, phone call, or WhatsApp inquiry</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddLeadModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.student_name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, student_name: e.target.value })}
                    placeholder="Student Name"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#24476B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Parent Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.parent_name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, parent_name: e.target.value })}
                    placeholder="Parent/Guardian"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#24476B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.mobile}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, mobile: e.target.value })}
                    onBlur={(e) => handlePhoneBlur(e.target.value)}
                    placeholder="10-digit number"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#24476B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class *</label>
                  <select
                    value={newLeadForm.student_class}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, student_class: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    {['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Duplicate Warning Alert */}
              {duplicateWarning && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
                  ⚠️ <strong>Existing Lead Found:</strong> {duplicateWarning.id} ({duplicateWarning.student_name} - {duplicateWarning.parent_name}). Submitting will link this inquiry.
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lead Source *</label>
                  <select
                    value={newLeadForm.lead_source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, lead_source: e.target.value as LeadSource })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    {LEAD_SOURCES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Counsellor</label>
                  <select
                    value={newLeadForm.assigned_to}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, assigned_to: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    {COUNSELLORS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Initial Discussion Remarks</label>
                <textarea
                  rows={2}
                  value={newLeadForm.remarks}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, remarks: e.target.value })}
                  placeholder="Parent requirements, weak subjects, visit preference..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#24476B]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#24476B] hover:bg-[#1a344f] text-white font-bold shadow-md cursor-pointer"
                >
                  Save Lead Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: LOG CALL OUTCOME
      ========================================================================= */}
      {showLogCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-extrabold text-[#24476B] mb-1">
              Log Call Outcome: {showLogCallModal.student_name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Parent: {showLogCallModal.parent_name} ({showLogCallModal.mobile})
            </p>

            <form onSubmit={handleSubmitCallLog} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Call Outcome *</label>
                <select
                  value={callOutcome}
                  onChange={(e) => setCallOutcome(e.target.value as CallOutcome)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
                >
                  {CALL_OUTCOMES.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Call Discussion & Parent Feedback</label>
                <textarea
                  required
                  rows={2}
                  value={callRemarks}
                  onChange={(e) => setCallRemarks(e.target.value)}
                  placeholder="Discussed batch timing, fee, and child learning gaps..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#24476B]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Next Follow-up Date (If needed)</label>
                <input
                  type="date"
                  value={callNextFollowup}
                  onChange={(e) => setCallNextFollowup(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogCallModal(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer"
                >
                  Save Call Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: MARK VISIT COMPLETED
      ========================================================================= */}
      {showCompleteVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8">
            <h3 className="text-base font-extrabold text-[#24476B] mb-1">
              Mark Tuition Centre Visit Completed
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              H.No. 49B Gupta Park • Student: {showCompleteVisitModal.student_name}
            </p>

            <form onSubmit={handleSubmitCompleteVisit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Who Visited? *</label>
                  <select
                    value={visitCompletion.whoVisited}
                    onChange={(e) => setVisitCompletion({ ...visitCompletion, whoVisited: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Parent & Student">Parent & Student</option>
                    <option value="Parent Only">Parent Only</option>
                    <option value="Student Only">Student Only</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Interest Level *</label>
                  <select
                    value={visitCompletion.interestLevel}
                    onChange={(e) => setVisitCompletion({ ...visitCompletion, interestLevel: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value="High">High (Likely to enroll)</option>
                    <option value="Moderate">Moderate (Considering options)</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Discussion & Requirements</label>
                <textarea
                  required
                  rows={2}
                  value={visitCompletion.requirementsDiscussed}
                  onChange={(e) => setVisitCompletion({ ...visitCompletion, requirementsDiscussed: e.target.value })}
                  placeholder="Parent queries, child previous school marks, batch preference..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Next Action *</label>
                <input
                  type="text"
                  required
                  value={visitCompletion.nextAction}
                  onChange={(e) => setVisitCompletion({ ...visitCompletion, nextAction: e.target.value })}
                  placeholder="e.g. Trial class on Monday 4:30 PM, fee payment pending"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCompleteVisitModal(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold cursor-pointer"
                >
                  Save Completed Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: CONVERT TO ADMISSION
      ========================================================================= */}
      {showConvertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8">
            <h3 className="text-base font-extrabold text-[#24476B] mb-1">
              🎉 Convert to Confirmed Admission
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Student: {showConvertModal.student_name} ({showConvertModal.student_class})
            </p>

            <form onSubmit={handleSubmitConversion} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Enrolled Programme *</label>
                  <input
                    type="text"
                    required
                    value={conversionForm.programme}
                    onChange={(e) => setConversionForm({ ...conversionForm, programme: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch Timing *</label>
                  <input
                    type="text"
                    required
                    value={conversionForm.batchTiming}
                    onChange={(e) => setConversionForm({ ...conversionForm, batchTiming: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Monthly Tuition Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    value={conversionForm.monthlyFee}
                    onChange={(e) => setConversionForm({ ...conversionForm, monthlyFee: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Status *</label>
                  <select
                    value={conversionForm.paymentStatus}
                    onChange={(e) => setConversionForm({ ...conversionForm, paymentStatus: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Installment">Installment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Admission Remarks & Receipt No.</label>
                <textarea
                  rows={2}
                  value={conversionForm.remarks}
                  onChange={(e) => setConversionForm({ ...conversionForm, remarks: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowConvertModal(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                >
                  Confirm Admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          DRAWER: 360° LEAD PROFILE DETAILS
      ========================================================================= */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 relative">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Lead Profile: {selectedEnquiry.id}
                </span>
                <h3 className="text-xl font-extrabold text-[#24476B]">
                  {selectedEnquiry.student_name} ({selectedEnquiry.student_class})
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

            {/* Body */}
            <div className="py-4 space-y-4 text-xs">
              {/* Profile Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Status</span>
                  <span className="font-bold text-[#1B3552]">{selectedEnquiry.status}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Source</span>
                  <span className="font-semibold text-slate-700">{selectedEnquiry.lead_source}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Assigned To</span>
                  <span className="font-semibold text-slate-700">{selectedEnquiry.assigned_to}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Curriculum</span>
                  <span className="font-semibold text-slate-700">{selectedEnquiry.academic_board || 'CBSE'}</span>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => { setShowLogCallModal(selectedEnquiry); }}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 font-bold flex items-center gap-1.5 cursor-pointer hover:bg-blue-100"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Log Call
                </button>

                <button
                  type="button"
                  onClick={() => { setShowCompleteVisitModal(selectedEnquiry); }}
                  className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 font-bold flex items-center gap-1.5 cursor-pointer hover:bg-teal-100"
                >
                  <Building className="w-3.5 h-3.5" /> Log Completed Visit
                </button>

                <button
                  type="button"
                  onClick={() => { setShowConvertModal(selectedEnquiry); }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold flex items-center gap-1.5 cursor-pointer hover:bg-emerald-100"
                >
                  <Award className="w-3.5 h-3.5" /> Convert to Admission
                </button>
              </div>

              {/* Activity Timeline */}
              <div>
                <span className="font-bold text-[11px] text-slate-700 block mb-2">Complete Chronological History</span>
                <div className="space-y-2 max-h-48 overflow-y-auto bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedEnquiry.timeline && selectedEnquiry.timeline.length > 0 ? (
                    selectedEnquiry.timeline.map((item, idx) => (
                      <div key={idx} className="text-[11px] text-slate-600 border-l-2 border-[#24476B] pl-2 py-0.5">
                        <span className="font-semibold text-slate-800">{item.title}</span> •{' '}
                        <span className="text-slate-400">{new Date(item.timestamp).toLocaleString()}</span>
                        <p className="text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400 text-center py-2">No timeline recorded yet.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`tel:${selectedEnquiry.mobile}`}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleInitiateWhatsApp(selectedEnquiry)}
                  className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
