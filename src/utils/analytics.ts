/**
 * Google Tag Manager & Google Analytics 4 Event Dispatcher
 * Tracks high-intent conversion actions across Aarohan Academy India
 */

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export function pushDataLayerEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...params,
    });
  }
}

/**
 * Track Click-to-Call actions (+91 9220357826)
 */
export function trackCallClick(locationContext: string = 'header') {
  pushDataLayerEvent('lead_call_click', {
    action: 'phone_call',
    target_number: '+919220357826',
    placement: locationContext,
  });
}

/**
 * Track WhatsApp Chat Initiation
 */
export function trackWhatsAppClick(locationContext: string = 'floating_button') {
  pushDataLayerEvent('lead_whatsapp_click', {
    action: 'whatsapp_chat',
    target_number: '+919220357826',
    placement: locationContext,
  });
}

/**
 * Track Successful Enquiry Form Submission
 */
export function trackEnquirySubmission(payload: {
  enquiryId: string;
  enquiryType: string;
  studentClass: string;
  leadSource: string;
}) {
  pushDataLayerEvent('lead_form_submit', {
    enquiry_id: payload.enquiryId,
    enquiry_type: payload.enquiryType,
    student_class: payload.studentClass,
    lead_source: payload.leadSource,
    value: payload.enquiryType === 'book_visit' ? 500 : 250, // Arbitrary conversion score weight
    currency: 'INR',
  });
}

/**
 * Track Appointment Slot Booking (Call or Centre Visit)
 */
export function trackAppointmentBooking(payload: {
  enquiryId: string;
  type: 'call' | 'visit';
  date: string;
  slot: string;
}) {
  pushDataLayerEvent('appointment_booked', {
    enquiry_id: payload.enquiryId,
    appointment_type: payload.type,
    booking_date: payload.date,
    booking_slot: payload.slot,
  });
}

/**
 * Track Worksheet Download / Preview
 */
export function trackWorksheetAction(worksheetId: number, subject: string, classGroup: string) {
  pushDataLayerEvent('worksheet_download_preview', {
    worksheet_id: worksheetId,
    subject,
    class_group: classGroup,
  });
}
