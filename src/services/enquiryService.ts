import {
  EnquiryRecord,
  DashboardMetrics,
  ActivityLog,
  CallOutcome,
  VisitCompletionRecord,
  AdmissionConversionRecord,
  LeadStatus,
} from '../types/enquiry';
import { supabase } from '../utils/supabase/client';

const STORAGE_KEY = 'aarohan_enquiries_cache';

// Known dummy IDs from initial template to be purged from any client browser cache
const LEGACY_DUMMY_IDS = new Set(['AA-2026-001', 'AA-2026-002', 'AA-2026-003', 'AA-2026-004']);

export const COUNSELLORS = [
  'Pooja Sharma',
  'Amit Verma',
  'Kunal Murari',
  'Sunita Deswal',
];

export const BRANCHES = [
  'Najafgarh Main (Gupta Park, Todarmal Colony)',
  'Roshanpura / Thana Road (Extension)',
  'Prem Nagar (Counselling Desk)',
];

export const TIME_SLOTS = [
  '03:00 PM - 03:30 PM',
  '03:30 PM - 04:00 PM',
  '04:00 PM - 04:30 PM',
  '04:30 PM - 05:00 PM',
  '05:00 PM - 05:30 PM',
  '05:30 PM - 06:00 PM',
  '06:00 PM - 06:30 PM',
  '06:30 PM - 07:00 PM',
  '07:00 PM - 07:30 PM',
];

/**
 * Loads all real enquiries from Supabase with fallback to local storage cache.
 * NO dummy or seed data is injected.
 */
export async function getAllEnquiries(): Promise<EnquiryRecord[]> {
  try {
    // Attempt Supabase fetch
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Filter out any legacy dummy records if they exist in DB
      const cleanData = (data as EnquiryRecord[]).filter((x) => !LEGACY_DUMMY_IDS.has(x.id));
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanData));
      }
      return cleanData;
    }
  } catch (err) {
    console.warn('Supabase not available yet, using local storage cache:', err);
  }

  // Fallback to local storage
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const parsed: EnquiryRecord[] = JSON.parse(cached);
        // Purge dummy records from cache
        const realRecords = parsed.filter((x) => !LEGACY_DUMMY_IDS.has(x.id));
        if (realRecords.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(realRecords));
        }
        return realRecords;
      } catch (e) {
        // Parse error fallback
      }
    }
  }
  return [];
}

/**
 * Checks if a specific date and time slot is already booked for Calls or Visits.
 */
export async function checkSlotAvailability(
  date: string,
  slot: string,
  enquiryType: string
): Promise<boolean> {
  const enquiries = await getAllEnquiries();
  const collision = enquiries.find(
    (e) =>
      e.booking_date === date &&
      e.booking_time_slot === slot &&
      (e.status === 'Visit Scheduled' || e.enquiry_type === 'schedule_call') &&
      e.status !== 'Lost' &&
      e.status !== 'Invalid Lead' &&
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
    last_updated: now,
    status: existingDuplicate ? 'New' : 'New',
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
        performedBy: 'System',
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
      id: `t-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: now,
      ...logEntry,
    });
  }

  const updatedRecord: EnquiryRecord = {
    ...existing,
    ...updates,
    last_updated: now,
    timeline: newTimeline,
  };

  list[index] = updatedRecord;

  // Sync Supabase
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
 * Logs a call with outcome and appends to call history
 */
export async function logCall(
  id: string,
  callData: {
    staffName: string;
    outcome: CallOutcome;
    duration?: string;
    remarks: string;
    nextFollowupDate?: string;
  }
): Promise<EnquiryRecord | null> {
  const list = await getAllEnquiries();
  const existing = list.find((e) => e.id === id);
  if (!existing) return null;

  const newCallLog = {
    id: `call-${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...callData,
  };

  let newStatus: LeadStatus = existing.status;
  if (callData.outcome === 'Connected' || callData.outcome === 'Interested') {
    newStatus = 'Interested';
  } else if (callData.outcome === 'Follow-up Required' || callData.outcome === 'Callback Requested') {
    newStatus = 'Follow-up Required';
  } else if (callData.outcome === 'Not Interested') {
    newStatus = 'Not Interested';
  } else if (callData.outcome === 'Wrong Number') {
    newStatus = 'Invalid Lead';
  } else if (existing.status === 'New') {
    newStatus = 'Contacted';
  }

  const updates: Partial<EnquiryRecord> = {
    status: newStatus,
    call_history: [...(existing.call_history || []), newCallLog],
    remarks: callData.remarks ? `${existing.remarks ? existing.remarks + ' | ' : ''}${callData.remarks}` : existing.remarks,
    next_followup_date: callData.nextFollowupDate || existing.next_followup_date,
  };

  return updateEnquiry(id, updates, {
    type: 'call',
    title: `Call: ${callData.outcome}`,
    description: `${callData.staffName} logged call (${callData.outcome}). Remarks: ${callData.remarks || 'None'}`,
    performedBy: callData.staffName,
  });
}

/**
 * Schedules a tuition centre visit
 */
export async function scheduleVisit(
  id: string,
  visitData: {
    visitDate: string;
    visitTime: string;
    staffName: string;
    visitorsCount: number;
    remarks: string;
  }
): Promise<EnquiryRecord | null> {
  const updates: Partial<EnquiryRecord> = {
    status: 'Visit Scheduled',
    booking_date: visitData.visitDate,
    booking_time_slot: visitData.visitTime,
    visitors_count: visitData.visitorsCount,
    visit_status: 'Scheduled',
    assigned_to: visitData.staffName,
  };

  return updateEnquiry(id, updates, {
    type: 'visit',
    title: `Visit Scheduled for ${visitData.visitDate} at ${visitData.visitTime}`,
    description: `Tuition centre visit scheduled by ${visitData.staffName}. Note: ${visitData.remarks || 'Standard campus tour'}`,
    performedBy: visitData.staffName,
  });
}

/**
 * Marks a scheduled tuition centre visit as completed
 */
export async function markVisitCompleted(
  id: string,
  visitDetails: VisitCompletionRecord
): Promise<EnquiryRecord | null> {
  const updates: Partial<EnquiryRecord> = {
    status: 'Visit Completed',
    visit_status: 'Completed',
    visit_details: visitDetails,
  };

  return updateEnquiry(id, updates, {
    type: 'visit',
    title: 'Tuition Centre Visit Completed',
    description: `Visit handled by ${visitDetails.handledBy}. Attendees: ${visitDetails.whoVisited}. Interest Level: ${visitDetails.interestLevel}. Next Action: ${visitDetails.nextAction}`,
    performedBy: visitDetails.handledBy,
  });
}

/**
 * Converts a lead to an active admission
 */
export async function convertLeadToAdmission(
  id: string,
  conversionDetails: AdmissionConversionRecord
): Promise<EnquiryRecord | null> {
  const updates: Partial<EnquiryRecord> = {
    status: 'Admission Converted',
    is_converted: true,
    converted_at: conversionDetails.admissionDate,
    conversion_details: conversionDetails,
  };

  return updateEnquiry(id, updates, {
    type: 'admission',
    title: '🎉 Admission Converted',
    description: `Enrolled in ${conversionDetails.programme} (${conversionDetails.batchTiming}). Fee: ₹${conversionDetails.monthlyFee}/month. Payment: ${conversionDetails.paymentStatus}. Counsellor: ${conversionDetails.counsellor}`,
    performedBy: conversionDetails.counsellor,
  });
}

/**
 * Calculates all 14 requested real operational metrics dynamically.
 */
export function calculateMetrics(enquiries: EnquiryRecord[]): DashboardMetrics {
  const todayStr = new Date().toISOString().split('T')[0];

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === 'New').length;
  
  const callsPending = enquiries.filter(
    (e) => e.enquiry_type === 'schedule_call' && e.status !== 'Contacted' && e.status !== 'Admission Converted' && e.status !== 'Lost'
  ).length;

  const callsCompleted = enquiries.filter(
    (e) => (e.call_history && e.call_history.length > 0) || e.status === 'Contacted' || e.status === 'Interested' || e.status === 'Admission Converted'
  ).length;

  const followupsDueToday = enquiries.filter(
    (e) => e.next_followup_date === todayStr && e.status !== 'Admission Converted' && e.status !== 'Lost' && e.status !== 'Invalid Lead'
  ).length;

  const followupsOverdue = enquiries.filter(
    (e) => e.next_followup_date && e.next_followup_date < todayStr && e.status !== 'Admission Converted' && e.status !== 'Lost' && e.status !== 'Invalid Lead'
  ).length;

  const interestedLeads = enquiries.filter((e) => e.status === 'Interested').length;
  const visitsScheduled = enquiries.filter((e) => e.status === 'Visit Scheduled').length;
  const visitsCompleted = enquiries.filter((e) => e.status === 'Visit Completed').length;
  const noShows = enquiries.filter((e) => e.visit_status === 'No-Show').length;

  const admissionsConverted = enquiries.filter((e) => e.status === 'Admission Converted' || e.is_converted).length;
  const lostLeads = enquiries.filter((e) => e.status === 'Lost' || e.status === 'Not Interested' || e.status === 'Invalid Lead').length;

  const validDenominator = totalEnquiries - lostLeads;
  const conversionRate = validDenominator > 0 ? Math.round((admissionsConverted / validDenominator) * 100) : 0;

  const pendingEnquiries = enquiries.filter(
    (e) => e.status === 'New' || e.status === 'Contact Pending' || e.status === 'Follow-up Required'
  ).length;

  return {
    totalEnquiries,
    newEnquiries,
    callsPending,
    callsCompleted,
    followupsDueToday,
    followupsOverdue,
    interestedLeads,
    visitsScheduled,
    visitsCompleted,
    noShows,
    admissionsConverted,
    lostLeads,
    conversionRate,
    pendingEnquiries,
  };
}

/**
 * Exports current enquiries list to formatted CSV
 */
export function exportEnquiriesToCSV(enquiries: EnquiryRecord[], filename = 'aarohan_enquiries_crm.csv') {
  if (enquiries.length === 0) {
    alert('No data to export.');
    return;
  }

  const headers = [
    'Lead ID',
    'Date',
    'Student Name',
    'Parent Name',
    'Mobile',
    'WhatsApp',
    'Email',
    'Class',
    'School',
    'Academic Board',
    'Subjects',
    'Study Mode',
    'Enquiry Type',
    'Lead Source',
    'Status',
    'Assigned Counsellor',
    'Next Follow-up',
    'Remarks',
  ];

  const rows = enquiries.map((e) => [
    e.id,
    new Date(e.created_at).toLocaleDateString(),
    `"${e.student_name || ''}"`,
    `"${e.parent_name || ''}"`,
    `"${e.mobile || ''}"`,
    `"${e.whatsapp || ''}"`,
    `"${e.email || ''}"`,
    `"${e.student_class || ''}"`,
    `"${e.school_name || ''}"`,
    `"${e.academic_board || ''}"`,
    `"${(e.subjects || []).join(', ')}"`,
    `"${e.mode || ''}"`,
    `"${e.enquiry_type || ''}"`,
    `"${e.lead_source || ''}"`,
    `"${e.status || ''}"`,
    `"${e.assigned_to || ''}"`,
    `"${e.next_followup_date || ''}"`,
    `"${(e.remarks || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
