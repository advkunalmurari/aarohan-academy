/**
 * Type definitions for Aarohan Academy India
 * Complete Lead Management & CRM System
 */

export type EnquiryType =
  | 'schedule_call'
  | 'book_visit'
  | 'course_enquiry'
  | 'general_enquiry'
  | 'walk_in'
  | 'phone_inquiry'
  | 'whatsapp_inquiry';

export type AcademicBoard = 'CBSE' | 'ICSE' | 'State Board' | 'Other';

export type StudyMode = 'Offline' | 'Online' | 'Both';

export type AcademicGoal =
  | 'Regular Tuition'
  | 'Exam Preparation'
  | 'Foundation'
  | 'Improvement'
  | 'Doubt Solving'
  | 'Other';

export type CallPreference = 'Phone Call' | 'WhatsApp Call';

export type LeadSource =
  | 'Website'
  | 'Google'
  | 'Google Ads'
  | 'Google Organic'
  | 'Google Business Profile'
  | 'WhatsApp'
  | 'Phone Call'
  | 'Walk-in'
  | 'Referral'
  | 'Instagram'
  | 'Facebook'
  | 'Advertisement'
  | 'Existing Student'
  | 'Direct'
  | 'Other';

export type LeadStatus =
  | 'New'
  | 'Contact Pending'
  | 'Contacted'
  | 'Interested'
  | 'Follow-up Required'
  | 'Visit Scheduled'
  | 'Visit Completed'
  | 'Admission Converted'
  | 'Not Interested'
  | 'Lost'
  | 'Invalid Lead';

export type CallOutcome =
  | 'Attempted'
  | 'Connected'
  | 'No Answer'
  | 'Busy'
  | 'Wrong Number'
  | 'Callback Requested'
  | 'Interested'
  | 'Not Interested'
  | 'Follow-up Required';

export type PriorityLevel = 'High' | 'Medium' | 'Low';

export type AdminRole = 'Super Admin' | 'Admin' | 'Counsellor' | 'Staff' | 'Management';

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'status_change' | 'note' | 'call' | 'visit' | 'assigned' | 'created' | 'admission';
  title: string;
  description: string;
  performedBy: string;
  metadata?: Record<string, any>;
}

export interface CallLogRecord {
  id: string;
  timestamp: string;
  staffName: string;
  outcome: CallOutcome;
  duration?: string;
  remarks: string;
  nextFollowupDate?: string;
}

export interface VisitCompletionRecord {
  visitDate: string;
  visitTime: string;
  whoVisited: 'Parent Only' | 'Student Only' | 'Parent & Student';
  parentName: string;
  studentName: string;
  handledBy: string;
  requirementsDiscussed: string;
  programmeInterested: string;
  feeDiscussed?: number;
  interestLevel: 'High' | 'Moderate' | 'Low';
  nextAction: string;
  remarks: string;
}

export interface AdmissionConversionRecord {
  admissionDate: string;
  studentName: string;
  studentClass: string;
  programme: string;
  subjects: string[];
  batchTiming: string;
  monthlyFee: number;
  paymentStatus: 'Paid' | 'Pending' | 'Installment';
  counsellor: string;
  remarks: string;
}

export interface EnquiryRecord {
  id: string; // Unique Lead ID (e.g. AA-2026-1042)
  created_at: string;
  enquiry_type: EnquiryType;
  
  // Student & Parent Information
  student_name: string;
  parent_name: string;
  mobile: string;
  alternate_mobile?: string;
  whatsapp?: string;
  email?: string;
  student_class: string;
  school_name?: string;
  academic_board?: AcademicBoard;
  preferred_branch: string;
  
  // Requirements
  subjects: string[];
  mode: StudyMode;
  preferred_batch_timing?: string;
  academic_goal?: AcademicGoal;
  tuition_requirement?: string;
  specific_requirement?: string;
  
  // Booking Details (For Call & Visit)
  booking_date?: string; // YYYY-MM-DD
  booking_time_slot?: string;
  call_preference?: CallPreference;
  visitors_count?: number;
  visit_status?: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show' | 'Rescheduled';
  visit_details?: VisitCompletionRecord;
  
  // Lead Attribution
  lead_source: LeadSource;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer_url?: string;
  landing_page?: string;
  
  // CRM Workflow & Lifecycle
  status: LeadStatus;
  priority: PriorityLevel;
  assigned_to: string;
  remarks: string;
  next_followup_date?: string;
  next_followup_time?: string;
  next_followup_action?: string;
  
  // Call History
  call_history?: CallLogRecord[];
  
  // Admission Conversion Record
  conversion_details?: AdmissionConversionRecord;
  is_converted?: boolean;
  converted_at?: string;
  
  // Duplicate Tracking
  is_duplicate?: boolean;
  duplicate_of_id?: string;
  
  // Timeline Audit
  created_by?: string;
  last_updated?: string;
  timeline: ActivityLog[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  branch: string;
}

export interface DashboardMetrics {
  totalEnquiries: number;
  newEnquiries: number;
  callsPending: number;
  callsCompleted: number;
  followupsDueToday: number;
  followupsOverdue: number;
  interestedLeads: number;
  visitsScheduled: number;
  visitsCompleted: number;
  noShows: number;
  admissionsConverted: number;
  lostLeads: number;
  conversionRate: number;
  pendingEnquiries: number;
}
