/**
 * Type definitions for Aarohan Academy India
 * Enquiry, Call Scheduling & Tuition Visit Booking System
 */

export type EnquiryType =
  | 'schedule_call'
  | 'book_visit'
  | 'course_enquiry'
  | 'general_enquiry';

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
  | 'Google Ads'
  | 'Google Organic'
  | 'Google Business Profile'
  | 'Website'
  | 'Instagram'
  | 'Facebook'
  | 'WhatsApp'
  | 'Referral'
  | 'Direct'
  | 'Other';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Follow-up Required'
  | 'Counselling Done'
  | 'Visit Scheduled'
  | 'Admission in Progress'
  | 'Converted'
  | 'Not Interested'
  | 'Not Reachable'
  | 'Lost'
  | 'Duplicate';

export type PriorityLevel = 'High' | 'Medium' | 'Low';

export type AdminRole = 'Super Admin' | 'Counsellor' | 'Branch Admin';

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'status_change' | 'note' | 'call' | 'visit' | 'assigned' | 'created';
  title: string;
  description: string;
  performedBy: string;
}

export interface EnquiryRecord {
  id: string;
  created_at: string;
  enquiry_type: EnquiryType;
  
  // Parent Details
  parent_name: string;
  mobile: string;
  whatsapp: string;
  email: string;
  
  // Student Details
  student_name: string;
  student_class: string;
  school_name: string;
  academic_board: AcademicBoard;
  preferred_branch: string;
  
  // Academic Requirements
  subjects: string[];
  mode: StudyMode;
  preferred_batch_timing: string;
  academic_goal: AcademicGoal;
  
  // Booking Details (For Call & Visit)
  booking_date?: string; // YYYY-MM-DD
  booking_time_slot?: string; // e.g. "10:30 AM"
  call_preference?: CallPreference;
  visitors_count?: number;
  specific_requirement?: string;
  
  // Lead Attribution & Google Tracking
  lead_source: LeadSource;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer_url?: string;
  landing_page?: string;
  
  // CRM Workflow
  status: LeadStatus;
  assigned_to: string;
  remarks: string;
  next_followup_date?: string;
  priority: PriorityLevel;
  
  // Duplicate Detection
  is_duplicate?: boolean;
  duplicate_of_id?: string;
  
  // Timeline
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
  todayEnquiries: number;
  callsScheduled: number;
  visitsScheduled: number;
  pendingFollowups: number;
  convertedLeads: number;
  lostLeads: number;
  conversionRate: number;
}
