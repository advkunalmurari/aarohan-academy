import { LeadSource } from '../types/enquiry';

export interface UtmParams {
  lead_source: LeadSource;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer_url: string;
  landing_page: string;
}

/**
 * Detects UTM parameters and lead source from the current URL and referrer.
 */
export function captureLeadAttribution(): UtmParams {
  if (typeof window === 'undefined') {
    return {
      lead_source: 'Website',
      referrer_url: '',
      landing_page: '/',
    };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source') || undefined;
  const utmMedium = urlParams.get('utm_medium') || undefined;
  const utmCampaign = urlParams.get('utm_campaign') || undefined;
  const utmTerm = urlParams.get('utm_term') || undefined;
  const utmContent = urlParams.get('utm_content') || undefined;
  const gclid = urlParams.get('gclid');
  const referrer = document.referrer || '';
  const landingPage = window.location.pathname + window.location.search;

  let source: LeadSource = 'Website';

  // 1. Google Ads detection (gclid or utm_medium=cpc / paidsearch)
  if (gclid || (utmSource?.toLowerCase().includes('google') && utmMedium?.toLowerCase().match(/cpc|ad|paid/))) {
    source = 'Google Ads';
  }
  // 2. Google Business Profile (source=gbp or gmb)
  else if (utmSource?.toLowerCase().match(/gbp|gmb|google_business|maps/)) {
    source = 'Google Business Profile';
  }
  // 3. Instagram / Facebook / Social
  else if (utmSource?.toLowerCase().includes('instagram') || referrer.includes('instagram.com')) {
    source = 'Instagram';
  } else if (utmSource?.toLowerCase().includes('facebook') || referrer.includes('facebook.com')) {
    source = 'Facebook';
  } else if (utmSource?.toLowerCase().includes('whatsapp') || referrer.includes('whatsapp.com')) {
    source = 'WhatsApp';
  }
  // 4. Google Organic Search
  else if (referrer.includes('google.com') || referrer.includes('google.co.in')) {
    source = 'Google Organic';
  }
  // 5. Explicit UTM source
  else if (utmSource) {
    if (utmSource.toLowerCase().includes('referral')) {
      source = 'Referral';
    } else {
      source = 'Other';
    }
  } else if (!referrer || referrer.includes(window.location.hostname)) {
    source = 'Direct';
  }

  return {
    lead_source: source,
    utm_source: utmSource || (gclid ? 'google_ads' : undefined),
    utm_medium: utmMedium || (gclid ? 'cpc' : undefined),
    utm_campaign: utmCampaign,
    utm_term: utmTerm,
    utm_content: utmContent,
    referrer_url: referrer,
    landing_page: landingPage,
  };
}
