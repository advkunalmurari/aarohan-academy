import React, { useState, useEffect } from 'react';
import {
  Phone,
  Building,
  BookOpen,
  MessageSquare,
  Calendar,
  Clock,
  User,
  Mail,
  GraduationCap,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  EnquiryType,
  AcademicBoard,
  StudyMode,
  AcademicGoal,
  CallPreference,
} from '../types/enquiry';
import {
  TIME_SLOTS,
  BRANCHES,
  createEnquiry,
  checkSlotAvailability,
} from '../services/enquiryService';
import { captureLeadAttribution } from '../utils/utmTracker';
import { trackEnquirySubmission, trackAppointmentBooking, trackWhatsAppClick } from '../utils/analytics';
import { Language, PageId } from '../utils/academyLogic';

interface EnquiryBookingViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  initialType?: EnquiryType;
  isModal?: boolean;
  onClose?: () => void;
}

const CLASS_OPTIONS = [
  'Nursery',
  'LKG',
  'UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
];

const SUBJECT_OPTIONS = [
  'Mathematics',
  'Science / EVS',
  'English & Phonics',
  'Hindi',
  'Social Studies',
  'All Foundation Subjects (Complete Care)',
];

const TIMING_OPTIONS = [
  '3:00 PM - 4:30 PM (Early Primary)',
  '4:30 PM - 6:00 PM (Middle Wing)',
  '6:00 PM - 7:30 PM (Evening Batch)',
  'Weekend Foundation Batch',
  'Flexible / Any Available Slot',
];

export const EnquiryBookingView: React.FC<EnquiryBookingViewProps> = ({
  lang,
  onNavigate,
  initialType = 'schedule_call',
  isModal = false,
  onClose,
}) => {
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(initialType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ id: string; type: EnquiryType } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [sameWhatsapp, setSameWhatsapp] = useState(true);
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('Class 5');
  const [schoolName, setSchoolName] = useState('');
  const [board, setBoard] = useState<AcademicBoard>('CBSE');
  const [branch, setBranch] = useState(BRANCHES[0]);

  // Academic Requirements
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics', 'Science / EVS']);
  const [mode, setMode] = useState<StudyMode>('Offline');
  const [batchTiming, setBatchTiming] = useState(TIMING_OPTIONS[1]);
  const [goal, setGoal] = useState<AcademicGoal>('Regular Tuition');

  // Booking (Date & Slot)
  const todayStr = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[2]);
  const [unavailableSlots, setUnavailableSlots] = useState<string[]>([]);
  const [checkingSlots, setCheckingSlots] = useState(false);
  const [callPreference, setCallPreference] = useState<CallPreference>('Phone Call');
  const [visitorsCount, setVisitorsCount] = useState<number>(2);
  const [specificRequirement, setSpecificRequirement] = useState('');

  // Sync WhatsApp with mobile
  useEffect(() => {
    if (sameWhatsapp) {
      setWhatsapp(mobile);
    }
  }, [mobile, sameWhatsapp]);

  // Check slot collisions whenever date or type changes
  useEffect(() => {
    if (enquiryType === 'schedule_call' || enquiryType === 'book_visit') {
      let isMounted = true;
      setCheckingSlots(true);
      async function verifySlots() {
        const occupied: string[] = [];
        for (const slot of TIME_SLOTS) {
          const avail = await checkSlotAvailability(bookingDate, slot, enquiryType as any);
          if (!avail) occupied.push(slot);
        }
        if (isMounted) {
          setUnavailableSlots(occupied);
          setCheckingSlots(false);
        }
      }
      verifySlots();
      return () => {
        isMounted = false;
      };
    }
  }, [bookingDate, enquiryType]);

  const toggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!parentName.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter parent/guardian name' : 'कृपया अभिभावक का नाम दर्ज करें');
      return;
    }
    if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10) {
      setErrorMsg(lang === 'en' ? 'Please enter a valid 10-digit mobile number' : 'कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें');
      return;
    }
    if (enquiryType !== 'general_enquiry' && !studentName.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter student name' : 'कृपया विद्यार्थी का नाम दर्ज करें');
      return;
    }
    if ((enquiryType === 'schedule_call' || enquiryType === 'book_visit') && !selectedSlot) {
      setErrorMsg(lang === 'en' ? 'Please select a preferred time slot' : 'कृपया उपयुक्त समय स्लॉट चुनें');
      return;
    }

    setIsSubmitting(true);

    try {
      const attribution = captureLeadAttribution();

      const newRecord = await createEnquiry({
        enquiry_type: enquiryType,
        parent_name: parentName.trim(),
        mobile: mobile.trim(),
        whatsapp: (sameWhatsapp ? mobile : whatsapp).trim(),
        email: email.trim(),
        student_name: studentName.trim() || parentName.trim(),
        student_class: studentClass,
        school_name: schoolName.trim(),
        academic_board: board,
        preferred_branch: branch,
        subjects: selectedSubjects,
        mode,
        preferred_batch_timing: batchTiming,
        academic_goal: goal,
        booking_date: enquiryType === 'schedule_call' || enquiryType === 'book_visit' ? bookingDate : undefined,
        booking_time_slot: enquiryType === 'schedule_call' || enquiryType === 'book_visit' ? selectedSlot : undefined,
        call_preference: enquiryType === 'schedule_call' ? callPreference : undefined,
        visitors_count: enquiryType === 'book_visit' ? visitorsCount : undefined,
        specific_requirement: specificRequirement.trim(),
        ...attribution,
      });

      setSubmittedData({ id: newRecord.id, type: enquiryType });

      trackEnquirySubmission({
        enquiryId: newRecord.id,
        enquiryType,
        studentClass,
        leadSource: newRecord.lead_source,
      });

      if ((enquiryType === 'schedule_call' || enquiryType === 'book_visit') && bookingDate && selectedSlot) {
        trackAppointmentBooking({
          enquiryId: newRecord.id,
          type: enquiryType === 'schedule_call' ? 'call' : 'visit',
          date: bookingDate,
          slot: selectedSlot,
        });
      }
    } catch (err: any) {
      console.error('Error submitting enquiry:', err);
      setErrorMsg(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedData) {
    const waMessage = encodeURIComponent(
      `Hello Aarohan Academy, I have submitted an enquiry [${submittedData.id}] for ${studentName || parentName} (${studentClass}).` +
        (submittedData.type === 'schedule_call'
          ? ` Call scheduled on ${bookingDate} at ${selectedSlot}.`
          : submittedData.type === 'book_visit'
          ? ` Centre visit requested on ${bookingDate} at ${selectedSlot} (${branch}).`
          : ' Please share syllabus and batch details.')
    );

    return (
      <div className={`bg-white rounded-3xl ${isModal ? 'p-6' : 'max-w-3xl mx-auto my-12 p-8 shadow-xl border border-slate-100'}`}>
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-[#36A9E1]/15 text-[#24476B] mb-3">
            Enquiry ID: {submittedData.id}
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24476B] mb-3">
            {submittedData.type === 'schedule_call' && (lang === 'en' ? 'Call Scheduled Successfully!' : 'कॉल सफलतापूर्वक शेड्यूल हो गई!')}
            {submittedData.type === 'book_visit' && (lang === 'en' ? 'Tuition Visit Request Received!' : 'सेंटर विज़िट अनुरोध प्राप्त हुआ!')}
            {submittedData.type === 'course_enquiry' && (lang === 'en' ? 'Course Enquiry Received!' : 'पाठ्यक्रम पूछताछ प्राप्त हुई!')}
            {submittedData.type === 'general_enquiry' && (lang === 'en' ? 'Thank You For Contacting Us!' : 'संपर्क करने के लिए धन्यवाद!')}
          </h2>

          <p className="text-slate-600 text-base max-w-xl mx-auto mb-8">
            {submittedData.type === 'schedule_call' &&
              'Thank you! Your call has been scheduled. Our academic counsellor will contact you at the selected time.'}
            {submittedData.type === 'book_visit' &&
              'Your visit request has been received. Our team will confirm your appointment shortly.'}
            {submittedData.type === 'course_enquiry' &&
              'Thank you for your interest! Our academic counsellor will reach out with the complete syllabus, batch timings and fee structure.'}
            {submittedData.type === 'general_enquiry' &&
              'Your message has been received. Our team will contact you shortly.'}
          </p>

          <div className="bg-[#FFFDF9] border border-amber-200/70 rounded-2xl p-5 max-w-lg mx-auto text-left mb-8 space-y-2.5 text-sm">
            <div className="flex justify-between border-b border-amber-100 pb-2">
              <span className="text-slate-500">{lang === 'en' ? 'Student' : 'विद्यार्थी'}:</span>
              <span className="font-bold text-slate-800">{studentName || parentName} ({studentClass})</span>
            </div>
            {(submittedData.type === 'schedule_call' || submittedData.type === 'book_visit') && (
              <div className="flex justify-between border-b border-amber-100 pb-2">
                <span className="text-slate-500">{lang === 'en' ? 'Appointment' : 'अपॉइंटमेंट'}:</span>
                <span className="font-bold text-[#F47B45]">{bookingDate} at {selectedSlot}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-500">{lang === 'en' ? 'Contact' : 'संपर्क'}:</span>
              <span className="font-bold text-slate-800">{mobile}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/919220357826?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{lang === 'en' ? 'Instant WhatsApp Confirmation' : 'व्हाट्सएप पर तुरंत पुष्टि करें'}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setSubmittedData(null);
                if (onClose) onClose();
                else onNavigate('home');
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all"
            >
              {lang === 'en' ? 'Back to Home' : 'मुख्य पृष्ठ पर लौटें'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isModal ? 'p-2 sm:p-4' : 'max-w-4xl mx-auto my-8 px-4 sm:px-6'}`}>
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8EB] border border-[#FFC845]/60 text-[#F47B45] text-xs font-bold mb-3">
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'en' ? 'Gupta Park, Najafgarh • Capped at 15–20 Students' : 'गुप्ता पार्क, नजफगढ़ • सीमित 15–20 बच्चे प्रति बैच'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24476B] tracking-tight">
          {lang === 'en' ? 'Enquiry, Call & Centre Visit Booking' : 'पूछताछ, कॉल और ट्यूशन सेंटर विज़िट बुकिंग'}
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          {lang === 'en'
            ? 'Schedule a 1-on-1 academic counselling call, book a classroom tour, or enquire about tailored batches for Nursery to Class 8.'
            : 'अपने बच्चे के लिए 1-on-1 शैक्षणिक परामर्श कॉल शेड्यूल करें या गुप्ता पार्क सेंटर आकर व्यक्तिगत मुलाकात करें।'}
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Step 1: Purpose Selector Tabs */}
        <div className="p-4 sm:p-6 bg-slate-50/80 border-b border-slate-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            {lang === 'en' ? 'Step 1: Select Purpose of Enquiry' : 'चरण 1: पूछताछ का उद्देश्य चुनें'}
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setEnquiryType('schedule_call')}
              className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                enquiryType === 'schedule_call'
                  ? 'bg-[#24476B] text-white shadow-md ring-2 ring-[#24476B]'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Phone className="w-5 h-5 mb-1.5 text-[#FFC845]" />
              <span className="font-bold text-xs sm:text-sm">Schedule a Call</span>
              <span className="text-[11px] opacity-80 hidden sm:inline">1-on-1 Counsellor</span>
            </button>

            <button
              type="button"
              onClick={() => setEnquiryType('book_visit')}
              className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                enquiryType === 'book_visit'
                  ? 'bg-[#24476B] text-white shadow-md ring-2 ring-[#24476B]'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Building className="w-5 h-5 mb-1.5 text-[#36A9E1]" />
              <span className="font-bold text-xs sm:text-sm">Book Centre Visit</span>
              <span className="text-[11px] opacity-80 hidden sm:inline">Gupta Park Centre</span>
            </button>

            <button
              type="button"
              onClick={() => setEnquiryType('course_enquiry')}
              className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                enquiryType === 'course_enquiry'
                  ? 'bg-[#24476B] text-white shadow-md ring-2 ring-[#24476B]'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <BookOpen className="w-5 h-5 mb-1.5 text-[#4CAF80]" />
              <span className="font-bold text-xs sm:text-sm">Courses & Fees</span>
              <span className="text-[11px] opacity-80 hidden sm:inline">Class & Subject Info</span>
            </button>

            <button
              type="button"
              onClick={() => setEnquiryType('general_enquiry')}
              className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                enquiryType === 'general_enquiry'
                  ? 'bg-[#24476B] text-white shadow-md ring-2 ring-[#24476B]'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <MessageSquare className="w-5 h-5 mb-1.5 text-[#F47B45]" />
              <span className="font-bold text-xs sm:text-sm">General Enquiry</span>
              <span className="text-[11px] opacity-80 hidden sm:inline">Quick Question</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {errorMsg && (
            <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-sm font-medium">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Student & Parent Details */}
          <div>
            <h3 className="text-base font-extrabold text-[#24476B] flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-[#36A9E1]" />
              <span>{lang === 'en' ? 'Parent & Student Details' : 'अभिभावक एवं विद्यार्थी विवरण'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'en' ? 'Parent / Guardian Name *' : 'अभिभावक का नाम *'}
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm"
                />
              </div>

              {enquiryType !== 'general_enquiry' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Student Name *' : 'विद्यार्थी का नाम *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'en' ? 'Mobile Number *' : 'मोबाइल नंबर *'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">+91</span>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="9811234567"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex justify-between">
                  <span>{lang === 'en' ? 'WhatsApp Number' : 'व्हाट्सएप नंबर'}</span>
                  <label className="text-[11px] font-normal text-slate-500 inline-flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameWhatsapp}
                      onChange={(e) => setSameWhatsapp(e.target.checked)}
                      className="rounded text-[#24476B] focus:ring-0"
                    />
                    <span>Same as mobile</span>
                  </label>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">+91</span>
                  <input
                    type="tel"
                    disabled={sameWhatsapp}
                    value={sameWhatsapp ? mobile : whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="WhatsApp number"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'en' ? 'Email Address (Optional)' : 'ईमेल पता (वैकल्पिक)'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm"
                />
              </div>

              {enquiryType !== 'general_enquiry' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'en' ? "Student's Class *" : 'कक्षा *'}
                  </label>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm bg-white"
                  >
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {enquiryType !== 'general_enquiry' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Academic Board' : 'एकेडमिक बोर्ड'}
                  </label>
                  <select
                    value={board}
                    onChange={(e) => setBoard(e.target.value as AcademicBoard)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm bg-white"
                  >
                    <option value="CBSE">CBSE Board</option>
                    <option value="ICSE">ICSE Board</option>
                    <option value="State Board">State Board (Delhi)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'School Name' : 'स्कूल का नाम'}
                  </label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="e.g. Kendriya Vidyalaya"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Preferred Branch' : 'शाखा'}
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm bg-white"
                  >
                    {BRANCHES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Academic Requirements (For Call, Visit, and Course) */}
          {enquiryType !== 'general_enquiry' && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-base font-extrabold text-[#24476B] flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-[#4CAF80]" />
                <span>{lang === 'en' ? 'Subjects & Academic Goal' : 'विषय और शैक्षणिक लक्ष्य'}</span>
              </h3>

              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {lang === 'en' ? 'Subjects Required (Select all that apply):' : 'आवश्यक विषय चुनें:'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECT_OPTIONS.map((sub) => {
                    const active = selectedSubjects.includes(sub);
                    return (
                      <button
                        type="button"
                        key={sub}
                        onClick={() => toggleSubject(sub)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          active
                            ? 'bg-[#24476B] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {active ? '✓ ' : '+ '}
                        {sub}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Preferred Learning Mode' : 'पसंदीदा मोड'}
                  </label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as StudyMode)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm bg-white"
                  >
                    <option value="Offline">Offline (Gupta Park Centre)</option>
                    <option value="Online">Online Interactive</option>
                    <option value="Both">Hybrid / Both</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Preferred Batch Timing' : 'बैच समय'}
                  </label>
                  <select
                    value={batchTiming}
                    onChange={(e) => setBatchTiming(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm bg-white"
                  >
                    {TIMING_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Primary Academic Goal' : 'मुख्य उद्देश्य'}
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value as AcademicGoal)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm bg-white"
                  >
                    <option value="Regular Tuition">Regular Tuition & Daily Homework</option>
                    <option value="Foundation">Concept Foundation Building</option>
                    <option value="Exam Preparation">Exam & Olympiad Preparation</option>
                    <option value="Improvement">Weak Subject Improvement</option>
                    <option value="Doubt Solving">Doubt Solving & Practice</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Booking Slots (For Schedule a Call & Centre Visit) */}
          {(enquiryType === 'schedule_call' || enquiryType === 'book_visit') && (
            <div className="pt-4 border-t border-slate-100 bg-[#FFFDF9] -mx-6 sm:-mx-8 px-6 sm:px-8 py-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-extrabold text-[#24476B] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#F47B45]" />
                  <span>
                    {enquiryType === 'schedule_call'
                      ? (lang === 'en' ? 'Select Date & Call Slot' : 'तारीख एवं कॉल समय स्लॉट चुनें')
                      : (lang === 'en' ? 'Select Centre Visit Date & Slot' : 'सेंटर विज़िट तारीख एवं समय स्लॉट चुनें')}
                  </span>
                </h3>
                {checkingSlots && (
                  <span className="text-xs text-slate-500 animate-pulse">Checking availability...</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'en' ? 'Preferred Date' : 'तारीख'}
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm bg-white font-medium"
                  />
                </div>

                {enquiryType === 'schedule_call' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {lang === 'en' ? 'Call Mode' : 'कॉल का प्रकार'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCallPreference('Phone Call')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          callPreference === 'Phone Call'
                            ? 'bg-[#24476B] text-white border-[#24476B]'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        📞 Phone Call
                      </button>
                      <button
                        type="button"
                        onClick={() => setCallPreference('WhatsApp Call')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          callPreference === 'WhatsApp Call'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        💬 WhatsApp Call
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {lang === 'en' ? 'Number of People Visiting' : 'आने वाले व्यक्तियों की संख्या'}
                    </label>
                    <select
                      value={visitorsCount}
                      onChange={(e) => setVisitorsCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm bg-white"
                    >
                      <option value={1}>1 person (Parent or Student)</option>
                      <option value={2}>2 people (Student + 1 Parent)</option>
                      <option value={3}>3 people (Student + Both Parents)</option>
                      <option value={4}>4+ people</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Dynamic Time Slot Grid */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                  <span>{lang === 'en' ? 'Available Time Slots' : 'उपलब्ध समय स्लॉट'}</span>
                  <span className="text-[11px] font-normal text-slate-500">
                    🟢 Available • 🔴 Booked
                  </span>
                </label>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isOccupied = unavailableSlots.includes(slot);
                    const isSelected = selectedSlot === slot;

                    return (
                      <button
                        type="button"
                        key={slot}
                        disabled={isOccupied}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                          isOccupied
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#F47B45] text-white border-[#F47B45] shadow-xs'
                            : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Specific Requirement or Message */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {enquiryType === 'general_enquiry'
                ? (lang === 'en' ? 'Your Message / Question *' : 'आपका संदेश *')
                : (lang === 'en' ? 'Any specific requirement or question for the counsellor (Optional)' : 'कोई विशिष्ट आवश्यकता या प्रश्न (वैकल्पिक)')}
            </label>
            <textarea
              rows={3}
              required={enquiryType === 'general_enquiry'}
              value={specificRequirement}
              onChange={(e) => setSpecificRequirement(e.target.value)}
              placeholder={
                enquiryType === 'schedule_call'
                  ? 'e.g. Please discuss fees, weekly schedule, and how foundation maths is taught...'
                  : enquiryType === 'book_visit'
                  ? 'e.g. Visiting to inspect student worksheets, study rooms, and meet director...'
                  : 'Tell us how we can help your child learn and grow...'
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24476B] text-sm"
            />
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Strictly 15–20 batch limit</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#36A9E1] shrink-0" />
              <span>Free baseline evaluation</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F47B45] shrink-0" />
              <span>Gupta Park, Najafgarh</span>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#F47B45] hover:bg-[#e06631] text-white text-base font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {enquiryType === 'schedule_call' && 'Confirm & Schedule Call'}
                    {enquiryType === 'book_visit' && 'Confirm & Book Centre Visit'}
                    {enquiryType === 'course_enquiry' && 'Submit Course Enquiry'}
                    {enquiryType === 'general_enquiry' && 'Send Enquiry'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
