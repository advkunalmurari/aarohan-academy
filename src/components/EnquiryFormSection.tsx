import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  AlertCircle,
  Clock,
} from 'lucide-react';
import {
  Language,
  EnquiryFormInput,
  validateEnquiryForm,
  buildWhatsAppUrl,
  buildGoogleMapsDirectionsUrl,
  ACADEMY_PHONE_DISPLAY,
  ACADEMY_ADDRESS_EN,
  ACADEMY_ADDRESS_HI,
} from '../utils/academyLogic';

interface EnquiryFormSectionProps {
  lang: Language;
  defaultClass?: string;
  defaultProgramme?: string;
}

interface SavedEnquiry extends EnquiryFormInput {
  referenceId: string;
  submittedAt: string;
}

export const EnquiryFormSection: React.FC<EnquiryFormSectionProps> = ({
  lang,
  defaultClass = '',
  defaultProgramme = '',
}) => {
  const [formData, setFormData] = useState<EnquiryFormInput>({
    parentName: '',
    phone: '',
    studentClass: defaultClass,
    preferredProgramme: defaultProgramme,
    message: '',
    consentGiven: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormInput, string>>>({});
  const [submittedEnquiry, setSubmittedEnquiry] = useState<SavedEnquiry | null>(null);

  const classOptions = [
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
  ];

  const programmeOptions = [
    {
      value: 'Early Learning (Nursery, LKG, UKG)',
      labelEn: 'Early Learning (Nursery, LKG, UKG)',
      labelHi: 'प्रारंभिक शिक्षा (नर्सरी, LKG, UKG)',
    },
    {
      value: 'Early Primary (Classes 1–2)',
      labelEn: 'Early Primary (Classes 1–2)',
      labelHi: 'प्रारंभिक प्राथमिक (कक्षा 1–2)',
    },
    {
      value: 'Primary Learning (Classes 3–5)',
      labelEn: 'Primary Learning (Classes 3–5)',
      labelHi: 'प्राथमिक शिक्षा (कक्षा 3–5)',
    },
    {
      value: 'Middle School Learning (Classes 6–8)',
      labelEn: 'Middle School Learning (Classes 6–8)',
      labelHi: 'मिडिल स्कूल शिक्षा (कक्षा 6–8)',
    },
    {
      value: 'Diagnostic Learning Assessment & Consultation',
      labelEn: 'Diagnostic Learning Assessment & Consultation',
      labelHi: 'प्रारंभिक कौशल मूल्यांकन और परामर्श',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEnquiryForm(formData, lang);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const refId = `AAR-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: SavedEnquiry = {
      ...formData,
      referenceId: refId,
      submittedAt: new Date().toLocaleString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('aarohan_enquiries') || '[]');
      localStorage.setItem('aarohan_enquiries', JSON.stringify([record, ...existing]));
    } catch {
      // Ignore storage restrictions
    }

    setSubmittedEnquiry(record);
  };

  const buildSubmittedWhatsAppMessage = (record: SavedEnquiry) => {
    return `Hello Aarohan Academy! I have filled the enquiry form (Ref: ${record.referenceId}).\nParent Name: ${record.parentName}\nContact: ${record.phone}\nStudent's Class: ${record.studentClass}\nProgramme: ${record.preferredProgramme}${
      record.message ? `\nNote: ${record.message}` : ''
    }`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Direct Contact & Location Details */}
      <div className="lg:col-span-5 space-y-6 bg-[#24476B] text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#FFC845] tracking-wide">
            {lang === 'en'
              ? 'Admissions & Parent Consultation'
              : 'प्रवेश और अभिभावक परामर्श'}
          </span>
          <h3 className="text-2xl font-extrabold leading-tight">
            {lang === 'en'
              ? 'Visit Our Learning Centre in Gupta Park, Najafgarh'
              : 'गुप्ता पार्क, नजफगढ़ स्थित हमारे केंद्र पर पधारें'}
          </h3>
          <p className="text-sm text-slate-200 leading-relaxed">
            {lang === 'en'
              ? 'We welcome parents and guardians to visit our classroom, see our learning materials, and book a low-stress 15–20 minute Entry Learning Check for their child.'
              : 'हम अभिभावकों का स्वागत करते हैं कि वे हमारे केंद्र पर आएँ, शिक्षण सामग्री देखें और अपने बच्चे के लिए 15–20 मिनट की सहज प्रारंभिक कौशल जाँच बुक करें।'}
          </p>
        </div>

        <div className="space-y-4 pt-2 border-t border-white/15 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#FFC845] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">
                {lang === 'en' ? 'Academy Address:' : 'अकैडमी का पता:'}
              </div>
              <div className="text-slate-200 mt-0.5">
                {lang === 'en' ? ACADEMY_ADDRESS_EN : ACADEMY_ADDRESS_HI}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[#36A9E1] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">
                {lang === 'en' ? 'Call / WhatsApp:' : 'कॉल और व्हाट्सऐप नंबर:'}
              </div>
              <a
                href="tel:+919220357826"
                className="text-[#FFC845] font-bold hover:underline block mt-0.5"
              >
                {ACADEMY_PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#4CAF80] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">
                {lang === 'en' ? 'Visiting & Class Hours:' : 'मिलने और कक्षा का समय:'}
              </div>
              <div className="text-slate-200 mt-0.5">
                {lang === 'en'
                  ? 'Monday to Saturday • 3:00 PM to 7:30 PM'
                  : 'सोमवार से शनिवार • दोपहर 3:00 बजे से शाम 7:30 बजे तक'}
              </div>
            </div>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="pt-2 space-y-2.5">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>
              {lang === 'en' ? 'Chat Directly on WhatsApp' : 'सीधे व्हाट्सऐप पर संदेश भेजें'}
            </span>
          </a>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="tel:+919220357826"
              className="py-2.5 px-3 rounded-xl bg-white/12 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC845]" />
              <span>{lang === 'en' ? 'Call Now' : 'अभी कॉल करें'}</span>
            </a>

            <a
              href={buildGoogleMapsDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-white/12 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#36A9E1]" />
              <span>{lang === 'en' ? 'Get Directions' : 'रास्ता देखें'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Enquiry Form or Confirmation */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        {submittedEnquiry ? (
          <div className="space-y-5 py-4" data-testid="enquiry-confirmation">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-bold text-emerald-700 font-mono">
                {lang === 'en'
                  ? `Enquiry Recorded • Ref: ${submittedEnquiry.referenceId}`
                  : `पूछताछ दर्ज • संदर्भ संख्या: ${submittedEnquiry.referenceId}`}
              </div>
              <h3 className="text-2xl font-extrabold text-[#24476B]">
                {lang === 'en'
                  ? `Thank you, ${submittedEnquiry.parentName}!`
                  : `धन्यवाद, ${submittedEnquiry.parentName}!`}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {lang === 'en'
                  ? 'Your enquiry details have been prepared below. Because this website operates without an external cloud CRM server by default for privacy, please click the button below to send your formatted enquiry directly to our official WhatsApp (+91 9220357826) or call us to confirm your visit slot.'
                  : 'आपकी पूछताछ का विवरण नीचे तैयार कर लिया गया है। गोपनीयता की दृष्टि से यह फॉर्म बाहरी क्लाउड सर्वर पर डेटा नहीं भेजता; कृपया नीचे दिए गए बटन पर क्लिक करके अपना विवरण सीधे हमारे आधिकारिक व्हाट्सऐप (+91 9220357826) पर भेजें या हमें कॉल करें।'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF8EB] border border-[#FFC845]/60 text-xs sm:text-sm space-y-1.5 text-slate-800">
              <div>
                <strong>{lang === 'en' ? 'Parent/Guardian:' : 'अभिभावक का नाम:'}</strong>{' '}
                {submittedEnquiry.parentName} ({submittedEnquiry.phone})
              </div>
              <div>
                <strong>{lang === 'en' ? 'Student’s Current Class:' : 'वर्तमान कक्षा:'}</strong>{' '}
                {submittedEnquiry.studentClass}
              </div>
              <div>
                <strong>{lang === 'en' ? 'Preferred Programme:' : 'चयनित कार्यक्रम:'}</strong>{' '}
                {submittedEnquiry.preferredProgramme}
              </div>
              {submittedEnquiry.message && (
                <div>
                  <strong>{lang === 'en' ? 'Message:' : 'संदेश:'}</strong>{' '}
                  {submittedEnquiry.message}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={buildWhatsAppUrl(buildSubmittedWhatsAppMessage(submittedEnquiry))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {lang === 'en'
                    ? 'Send Enquiry via WhatsApp Now'
                    : 'अभी व्हाट्सऐप पर पूछताछ भेजें'}
                </span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setSubmittedEnquiry(null);
                  setFormData({
                    parentName: '',
                    phone: '',
                    studentClass: '',
                    preferredProgramme: '',
                    message: '',
                    consentGiven: false,
                  });
                }}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Submit Another Enquiry' : 'नई पूछताछ भरें'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-1 pb-2 border-b border-slate-100">
              <h3 className="text-xl font-extrabold text-[#24476B]">
                {lang === 'en'
                  ? 'Book a Learning Assessment / Admission Enquiry'
                  : 'प्रारंभिक मूल्यांकन और प्रवेश पूछताछ फॉर्म'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'en'
                  ? 'Short, parent-friendly form. We collect only the minimum details needed to guide you.'
                  : 'संक्षिप्त और सरल फॉर्म। हम केवल आपसे संपर्क करने के लिए आवश्यक न्यूनतम जानकारी ही लेते हैं।'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Parent Name */}
              <div>
                <label
                  htmlFor="enquiry-parent-name"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  {lang === 'en' ? 'Parent / Guardian Name *' : 'माता-पिता / अभिभावक का नाम *'}
                </label>
                <input
                  id="enquiry-parent-name"
                  type="text"
                  value={formData.parentName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, parentName: e.target.value }))
                  }
                  placeholder={lang === 'en' ? 'e.g. Rajesh Sharma' : 'जैसे: राजेश शर्मा'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#36A9E1] focus:border-transparent"
                />
                {errors.parentName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.parentName}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="enquiry-phone"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  {lang === 'en' ? 'Contact / WhatsApp Number *' : 'मोबाइल / व्हाट्सऐप नंबर *'}
                </label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder={lang === 'en' ? '10-digit mobile number' : '10 अंकों का मोबाइल नंबर'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#36A9E1] focus:border-transparent"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Student's Current Class */}
              <div>
                <label
                  htmlFor="enquiry-student-class"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  {lang === 'en' ? "Student's Current Class *" : 'बच्चे की वर्तमान कक्षा *'}
                </label>
                <select
                  id="enquiry-student-class"
                  value={formData.studentClass}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, studentClass: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#36A9E1]"
                >
                  <option value="">
                    {lang === 'en' ? 'Select Class (Nursery – Class 8)' : 'कक्षा चुनें (नर्सरी – कक्षा 8)'}
                  </option>
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                {errors.studentClass && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.studentClass}</span>
                  </p>
                )}
              </div>

              {/* Preferred Programme */}
              <div>
                <label
                  htmlFor="enquiry-programme"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  {lang === 'en' ? 'Preferred Programme *' : 'पसंदीदा कार्यक्रम *'}
                </label>
                <select
                  id="enquiry-programme"
                  value={formData.preferredProgramme}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, preferredProgramme: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#36A9E1]"
                >
                  <option value="">
                    {lang === 'en' ? 'Select Programme' : 'कार्यक्रम चुनें'}
                  </option>
                  {programmeOptions.map((prog) => (
                    <option key={prog.value} value={prog.value}>
                      {lang === 'en' ? prog.labelEn : prog.labelHi}
                    </option>
                  ))}
                </select>
                {errors.preferredProgramme && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.preferredProgramme}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Optional Message */}
            <div>
              <label
                htmlFor="enquiry-message"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                {lang === 'en'
                  ? 'Learning Needs / Message (Optional)'
                  : 'बच्चे की शिक्षण आवश्यकता या संदेश (ऐच्छिक)'}
              </label>
              <textarea
                id="enquiry-message"
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder={
                  lang === 'en'
                    ? 'Share subjects or topics where your child needs support...'
                    : 'उन विषयों का उल्लेख करें जिनमें बच्चे को विशेष सहयोग चाहिए...'
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#36A9E1]"
              />
            </div>

            {/* Privacy & Consent Notice */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-start gap-2.5">
                <input
                  id="enquiry-consent"
                  type="checkbox"
                  checked={formData.consentGiven}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, consentGiven: e.target.checked }))
                  }
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-[#24476B] focus:ring-[#36A9E1]"
                />
                <label htmlFor="enquiry-consent" className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'en'
                    ? 'I am the parent/legal guardian and consent to Aarohan Academy contacting me via phone or WhatsApp regarding this admission enquiry. We never share contact data with third parties.'
                    : 'मैं बच्चे का अभिभावक हूँ और इस प्रवेश पूछताछ के संबंध में आरोहण अकैडमी द्वारा फोन या व्हाट्सऐप पर संपर्क किए जाने की सहमति देता/देती हूँ।'}
                </label>
              </div>
              {errors.consentGiven && (
                <p className="text-xs text-red-600 flex items-center gap-1 pl-6">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.consentGiven}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F47B45] hover:bg-[#e06631] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {lang === 'en' ? 'Submit Admission Enquiry' : 'पूछताछ दर्ज करें'}
                </span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#4CAF80] shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Child-Safe & DPDP Privacy Compliant'
                    : 'बाल-सुरक्षा एवं गोपनीयता नीति के अनुरूप'}
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
