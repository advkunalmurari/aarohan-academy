import {
  EnquiryRecord,
  DashboardMetrics,
  LeadStatus,
  ActivityLog,
} from '../types/enquiry';
import { supabase } from '../utils/supabase';

const STORAGE_KEY = 'aarohan_enquiries_v1';

// Available hourly/half-hourly booking slots
export const TIME_SLOTS = [
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
];

export const BRANCHES = [
  'Najafgarh Main (Gupta Park, Todarmal Colony)',
  'Najafgarh Extension (Roshanpura)',
  'Online Live Interactive Campus',
];

export const COUNSELLORS = [
  { id: 'c1', name: 'Pooja Sharma', role: 'Head Academic Counsellor' },
  { id: 'c2', name: 'Kunal Murari', role: 'Academy Director' },
  { id: 'c3', name: 'Amit Verma', role: 'Senior Admissions Lead' },
];

// Realistic seed data so Admin Portal has rich reporting immediately
const SEED_DATA: EnquiryRecord[] = [
  {
    id: 'AA-2026-001',
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    enquiry_type: 'book_visit',
    parent_name: 'Rajesh Sharma',
    mobile: '+91 98112 34567',
    whatsapp: '+91 98112 34567',
    email: 'rajesh.sharma@example.com',
    student_name: 'Aarav Sharma',
    student_class: 'Class 6',
    school_name: 'Holy Cross School, Najafgarh',
    academic_board: 'CBSE',
    preferred_branch: 'Najafgarh Main (Gupta Park, Todarmal Colony)',
    subjects: ['Mathematics', 'Science'],
    mode: 'Offline',
    preferred_batch_timing: '4:30 PM - 6:00 PM',
    academic_goal: 'Foundation',
    booking_date: new Date(Date.now() + 86400 * 1000).toISOString().split('T')[0],
    booking_time_slot: '04:30 PM',
    visitors_count: 2,
    specific_requirement: 'Interested in small batch size (15 students) and regular weekly tests.',
    lead_source: 'Google Ads',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'najafgarh_tuition_search',
    status: 'Visit Scheduled',
    assigned_to: 'Pooja Sharma',
    remarks: 'Father wants to inspect classrooms and meet maths faculty.',
    next_followup_date: new Date(Date.now() + 86400 * 1000).toISOString().split('T')[0],
    priority: 'High',
    timeline: [
      {
        id: 't-1',
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        type: 'created',
        title: 'Centre Visit Booked via Google Ads',
        description: 'Selected slot: Tomorrow at 04:30 PM for Aarav (Class 6).',
        performedBy: 'System',
      },
      {
        id: 't-2',
        timestamp: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
        type: 'assigned',
        title: 'Assigned to Pooja Sharma',
        description: 'Auto-assigned based on Najafgarh Main branch load.',
        performedBy: 'System',
      },
    ],
  },
  {
    id: 'AA-2026-002',
    created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    enquiry_type: 'schedule_call',
    parent_name: 'Sunita Verma',
    mobile: '+91 98711 88990',
    whatsapp: '+91 98711 88990',
    email: 'sunita.v@example.com',
    student_name: 'Diya Verma',
    student_class: 'Class 4',
    school_name: 'Kendriya Vidyalaya, Najafgarh',
    academic_board: 'CBSE',
    preferred_branch: 'Najafgarh Main (Gupta Park, Todarmal Colony)',
    subjects: ['English', 'Mathematics', 'EVS / Science'],
    mode: 'Offline',
    preferred_batch_timing: '3:00 PM - 4:30 PM',
    academic_goal: 'Regular Tuition',
    booking_date: new Date().toISOString().split('T')[0],
    booking_time_slot: '05:30 PM',
    call_preference: 'WhatsApp Call',
    specific_requirement: 'Child needs confidence building in mental maths and English reading fluency.',
    lead_source: 'Google Business Profile',
    status: 'New',
    assigned_to: 'Amit Verma',
    remarks: 'Call scheduled for today evening.',
    next_followup_date: new Date().toISOString().split('T')[0],
    priority: 'High',
    timeline: [
      {
        id: 't-3',
        timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
        type: 'created',
        title: 'WhatsApp Call Scheduled',
        description: 'Parent requested consultation today at 05:30 PM.',
        performedBy: 'System',
      },
    ],
  },
  {
    id: 'AA-2026-003',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    enquiry_type: 'course_enquiry',
    parent_name: 'Manish Rawat',
    mobile: '+91 99990 12345',
    whatsapp: '+91 99990 12345',
    email: 'm.rawat@example.com',
    student_name: 'Kabir Rawat',
    student_class: 'Class 8',
    school_name: 'Rao Mohar Singh Memorial School',
    academic_board: 'CBSE',
    preferred_branch: 'Najafgarh Main (Gupta Park, Todarmal Colony)',
    subjects: ['Mathematics', 'Science'],
    mode: 'Offline',
    preferred_batch_timing: '6:00 PM - 7:30 PM',
    academic_goal: 'Exam Preparation',
    lead_source: 'Google Organic',
    status: 'Counselling Done',
    assigned_to: 'Pooja Sharma',
    remarks: 'Counselling call completed. Child evaluated in baseline assessment. Parents visiting Saturday.',
    next_followup_date: new Date(Date.now() + 2 * 86400 * 1000).toISOString().split('T')[0],
    priority: 'Medium',
    timeline: [
      {
        id: 't-4',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        type: 'created',
        title: 'Course Enquiry Submitted',
        description: 'Enquired about Class 8 Maths & Science exam prep.',
        performedBy: 'System',
      },
      {
        id: 't-5',
        timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        type: 'status_change',
        title: 'Status changed to Counselling Done',
        description: 'Discussed batch timings and fee structure. Positive interest.',
        performedBy: 'Pooja Sharma',
      },
    ],
  },
  {
    id: 'AA-2026-004',
    created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    enquiry_type: 'book_visit',
    parent_name: 'Priyanka Goyal',
    mobile: '+91 98102 77665',
    whatsapp: '+91 98102 77665',
    email: 'priyanka.goyal@example.com',
    student_name: 'Ananya Goyal',
    student_class: 'Class 2',
    school_name: 'Delhi Public School, Dwarka',
    academic_board: 'CBSE',
    preferred_branch: 'Najafgarh Main (Gupta Park, Todarmal Colony)',
    subjects: ['Foundational Literacy & Numeracy'],
    mode: 'Offline',
    preferred_batch_timing: '3:00 PM - 4:30 PM',
    academic_goal: 'Foundation',
    booking_date: new Date(Date.now() - 24 * 3600 * 1000).toISOString().split('T')[0],
    booking_time_slot: '04:00 PM',
    visitors_count: 2,
    lead_source: 'Referral',
    status: 'Converted',
    assigned_to: 'Kunal Murari',
    remarks: 'Admission confirmed for Primary Stage batch. Registration completed.',
    priority: 'High',
    timeline: [
      {
        id: 't-6',
        timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
        type: 'created',
        title: 'Visit Booked',
        description: 'Parent booked visit through neighbour referral.',
        performedBy: 'System',
      },
      {
        id: 't-7',
        timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
        type: 'status_change',
        title: 'Lead Converted to Admission',
        description: 'Enrolled in Primary Stage 1-2 batch starting next Monday.',
        performedBy: 'Kunal Murari',
      },
    ],
  },
];

/**
 * Loads all enquiries with fallback to local storage
 */
export async function getAllEnquiries(): Promise<EnquiryRecord[]> {
  try {
    // Attempt Supabase fetch
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      // Sync local storage cache
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      return data as EnquiryRecord[];
    }
  } catch (err) {
    console.warn('Supabase not available yet, using local storage cache:', err);
  }

  // Fallback to local storage or seed data
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Parse error fallback
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
  }
  return SEED_DATA;
}

/**
 * Checks if a specific date and time slot is already booked for Calls or Visits.
 */
export async function checkSlotAvailability(
  date: string,
  slot: string,
  enquiryType: 'schedule_call' | 'book_visit'
): Promise<boolean> {
  const enquiries = await getAllEnquiries();
  const collision = enquiries.find(
    (e) =>
      e.booking_date === date &&
      e.booking_time_slot === slot &&
      (e.enquiry_type === enquiryType || e.enquiry_type === 'book_visit' || e.enquiry_type === 'schedule_call') &&
      e.status !== 'Lost' &&
      e.status !== 'Not Interested'
  );
  return !collision; // true if available, false if booked
}

/**
 * Detects if a lead with same mobile, whatsapp or email already exists.
 */
export async function detectDuplicateLead(
  mobile: string,
  whatsapp?: string,
  email?: string
): Promise<EnquiryRecord | null> {
  const cleanPhone = (p: string) => p.replace(/\D/g, '').slice(-10);
  const targetPhone = cleanPhone(mobile);
  const targetWa = whatsapp ? cleanPhone(whatsapp) : targetPhone;

  const enquiries = await getAllEnquiries();
  for (const item of enquiries) {
    if (item.mobile && cleanPhone(item.mobile) === targetPhone) return item;
    if (item.whatsapp && cleanPhone(item.whatsapp) === targetWa) return item;
    if (email && item.email && item.email.toLowerCase().trim() === email.toLowerCase().trim()) return item;
  }
  return null;
}

/**
 * Creates a new enquiry (saves to Supabase & localStorage).
 */
export async function createEnquiry(
  payload: Omit<EnquiryRecord, 'id' | 'created_at' | 'status' | 'assigned_to' | 'remarks' | 'priority' | 'timeline'>
): Promise<EnquiryRecord> {
  const existingDuplicate = await detectDuplicateLead(payload.mobile, payload.whatsapp, payload.email);

  const newId = `AA-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
  const now = new Date().toISOString();

  const newRecord: EnquiryRecord = {
    ...payload,
    id: newId,
    created_at: now,
    status: existingDuplicate ? 'Duplicate' : 'New',
    assigned_to: 'Pooja Sharma',
    remarks: existingDuplicate
      ? `Existing lead detected: ${existingDuplicate.id} (${existingDuplicate.parent_name})`
      : '',
    priority: payload.enquiry_type === 'book_visit' || payload.enquiry_type === 'schedule_call' ? 'High' : 'Medium',
    is_duplicate: !!existingDuplicate,
    duplicate_of_id: existingDuplicate?.id,
    timeline: [
      {
        id: `t-${Date.now()}`,
        timestamp: now,
        type: 'created',
        title: `Enquiry received (${payload.enquiry_type.replace('_', ' ')})`,
        description: `Source: ${payload.lead_source}. Student: ${payload.student_name} (${payload.student_class}).`,
        performedBy: 'Public Form',
      },
    ],
  };

  // Try Supabase insert
  try {
    await supabase.from('enquiries').insert([newRecord]);
  } catch (err) {
    console.warn('Supabase insert failed, persisting to local storage:', err);
  }

  // Update local storage
  if (typeof window !== 'undefined') {
    const list = await getAllEnquiries();
    const updated = [newRecord, ...list.filter((x) => x.id !== newRecord.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return newRecord;
}

/**
 * Updates an enquiry record (status, counsellor, remarks, etc.)
 */
export async function updateEnquiry(
  id: string,
  updates: Partial<EnquiryRecord>,
  logEntry?: Omit<ActivityLog, 'id' | 'timestamp'>
): Promise<EnquiryRecord | null> {
  const list = await getAllEnquiries();
  const index = list.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const existing = list[index];
  const now = new Date().toISOString();

  const newTimeline = [...(existing.timeline || [])];
  if (logEntry) {
    newTimeline.push({
      id: `t-${Date.now()}`,
      timestamp: now,
      ...logEntry,
    });
  }

  const updatedRecord: EnquiryRecord = {
    ...existing,
    ...updates,
    timeline: newTimeline,
  };

  list[index] = updatedRecord;

  // Supabase update
  try {
    await supabase.from('enquiries').update(updatedRecord).eq('id', id);
  } catch (err) {
    console.warn('Supabase update failed, updating local storage:', err);
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  return updatedRecord;
}

/**
 * Calculates dashboard KPI metrics.
 */
export function calculateMetrics(enquiries: EnquiryRecord[]): DashboardMetrics {
  const todayStr = new Date().toISOString().split('T')[0];

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === 'New').length;
  const todayEnquiries = enquiries.filter((e) => e.created_at.startsWith(todayStr)).length;
  const callsScheduled = enquiries.filter((e) => e.enquiry_type === 'schedule_call' && e.status !== 'Lost').length;
  const visitsScheduled = enquiries.filter((e) => e.enquiry_type === 'book_visit' && e.status !== 'Lost').length;
  const pendingFollowups = enquiries.filter(
    (e) => e.status === 'Follow-up Required' || (e.next_followup_date && e.next_followup_date <= todayStr && e.status !== 'Converted' && e.status !== 'Lost')
  ).length;
  const convertedLeads = enquiries.filter((e) => e.status === 'Converted').length;
  const lostLeads = enquiries.filter((e) => e.status === 'Lost' || e.status === 'Not Interested').length;

  const validDenominator = totalEnquiries - lostLeads;
  const conversionRate = validDenominator > 0 ? Math.round((convertedLeads / validDenominator) * 100) : 0;

  return {
    totalEnquiries,
    newEnquiries,
    todayEnquiries,
    callsScheduled,
    visitsScheduled,
    pendingFollowups,
    convertedLeads,
    lostLeads,
    conversionRate,
  };
}

/**
 * Exports enquiries as an Excel-compatible CSV file.
 */
export function exportEnquiriesToCSV(enquiries: EnquiryRecord[]) {
  const headers = [
    'Enquiry ID',
    'Created At',
    'Enquiry Type',
    'Status',
    'Parent Name',
    'Mobile',
    'WhatsApp',
    'Email',
    'Student Name',
    'Class',
    'Board',
    'School',
    'Branch',
    'Subjects',
    'Mode',
    'Batch Timing',
    'Goal',
    'Booking Date',
    'Booking Slot',
    'Call Preference',
    'Lead Source',
    'Assigned To',
    'Next Follow-up',
    'Priority',
    'Remarks',
  ];

  const rows = enquiries.map((e) => [
    e.id,
    new Date(e.created_at).toLocaleString('en-IN'),
    e.enquiry_type,
    e.status,
    `"${e.parent_name || ''}"`,
    `"${e.mobile || ''}"`,
    `"${e.whatsapp || ''}"`,
    `"${e.email || ''}"`,
    `"${e.student_name || ''}"`,
    `"${e.student_class || ''}"`,
    `"${e.academic_board || ''}"`,
    `"${e.school_name || ''}"`,
    `"${e.preferred_branch || ''}"`,
    `"${(e.subjects || []).join('; ')}"`,
    e.mode,
    `"${e.preferred_batch_timing || ''}"`,
    `"${e.academic_goal || ''}"`,
    e.booking_date || '',
    e.booking_time_slot || '',
    e.call_preference || '',
    e.lead_source,
    `"${e.assigned_to || ''}"`,
    e.next_followup_date || '',
    e.priority,
    `"${(e.remarks || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Aarohan_Academy_Enquiries_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * SQL Schema script for Supabase
 */
export const SUPABASE_SQL_SCHEMA = `-- Aarohan Academy India: Enquiries & Bookings Schema
CREATE TABLE IF NOT EXISTS public.enquiries (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  enquiry_type TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  student_name TEXT,
  student_class TEXT,
  school_name TEXT,
  academic_board TEXT,
  preferred_branch TEXT,
  subjects JSONB DEFAULT '[]'::jsonb,
  mode TEXT,
  preferred_batch_timing TEXT,
  academic_goal TEXT,
  booking_date DATE,
  booking_time_slot TEXT,
  call_preference TEXT,
  visitors_count INT DEFAULT 1,
  specific_requirement TEXT,
  lead_source TEXT DEFAULT 'Website',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer_url TEXT,
  landing_page TEXT,
  status TEXT DEFAULT 'New',
  assigned_to TEXT DEFAULT 'Pooja Sharma',
  remarks TEXT,
  next_followup_date DATE,
  priority TEXT DEFAULT 'Medium',
  is_duplicate BOOLEAN DEFAULT FALSE,
  duplicate_of_id TEXT,
  timeline JSONB DEFAULT '[]'::jsonb
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts (for public enquiry form)
CREATE POLICY "Allow public inserts" ON public.enquiries
  FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated and service role full read/update
CREATE POLICY "Allow authenticated read and manage" ON public.enquiries
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Allow anon select for checking slot availability
CREATE POLICY "Allow anon select" ON public.enquiries
  FOR SELECT TO anon USING (true);
`;
