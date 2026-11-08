import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import {
  Language,
  PageId,
  ACADEMY_PHONE_DISPLAY,
  ACADEMY_ADDRESS_EN,
  ACADEMY_ADDRESS_HI,
  buildWhatsAppUrl,
  buildGoogleMapsDirectionsUrl,
} from '../utils/academyLogic';
import { BRAND_ASSETS } from '../data/academyData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const handleLink = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-[#1B3552] text-white pt-16 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="bg-white p-1.5 rounded-2xl shadow-md shrink-0">
                  <img
                    src={BRAND_ASSETS.logo}
                    alt="Aarohan Academy Logo"
                    className="w-14 h-14 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-white">
                    Aarohan Academy
                  </h2>
                  <p className="text-sm font-semibold text-[#FFC845]">
                    Learn • Grow • Shine | सीखें • बढ़ें • चमकें
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                {lang === 'en'
                  ? 'A warm, child-centred neighbourhood tuition and learning-support centre in Gupta Park, Todarmal Colony, Najafgarh. Helping children from Nursery to Class 8 build strong conceptual foundations in small batches.'
                  : 'गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़ में स्थित एक आत्मीय और बाल-केंद्रित शिक्षण केंद्र। छोटे बैच में नर्सरी से कक्षा 8 तक के बच्चों की मजबूत शैक्षणिक नींव और आत्मविश्वास का निर्माण।'}
              </p>

              <div className="p-3.5 rounded-xl bg-white/8 border border-white/10 text-xs text-slate-200 leading-relaxed">
                <strong className="text-[#FFC845] block mb-1">
                  {lang === 'en' ? 'Important Academic Disclosure:' : 'महत्वपूर्ण शैक्षणिक सूचना:'}
                </strong>
                {lang === 'en'
                  ? 'Aarohan Academy is a supplementary neighbourhood tuition and learning-support centre for students studying in CBSE schools. It is not a formal school, examination board, or CBSE-affiliated institution.'
                  : 'आरोहण अकैडमी CBSE स्कूलों में पढ़ने वाले विद्यार्थियों के लिए एक पूरक ट्यूशन और शिक्षण-सहयोग केंद्र है। यह कोई औपचारिक स्कूल, परीक्षा बोर्ड या CBSE से संबद्ध संस्थान नहीं है।'}
              </div>
            </div>

            {/* Programmes Links */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-sm font-bold text-[#FFC845] tracking-wide">
                {lang === 'en' ? 'Learning Programmes' : 'शिक्षण कार्यक्रम'}
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-200">
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('prog-early')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer"
                  >
                    {lang === 'en' ? 'Nursery, LKG & UKG (Aarambh)' : 'नर्सरी, LKG और UKG (आरंभ)'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('prog-primary-1-2')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer"
                  >
                    {lang === 'en' ? 'Classes 1 & 2 (Early Primary)' : 'कक्षा 1 और 2 (प्रारंभिक प्राथमिक)'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('prog-primary-3-5')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer"
                  >
                    {lang === 'en' ? 'Classes 3 to 5 (Primary Stage)' : 'कक्षा 3 से 5 (प्राथमिक स्तर)'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('prog-middle-6-8')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer"
                  >
                    {lang === 'en' ? 'Classes 6 to 8 (Middle School)' : 'कक्षा 6 से 8 (मिडिल स्कूल)'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('programmes')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer"
                  >
                    {lang === 'en' ? 'Complete Grade-Wise Matrix' : 'संपूर्ण कक्षा-वार पाठ्यक्रम'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('subjects')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer"
                  >
                    {lang === 'en' ? 'Subject-Wise Learning Focus' : 'विषय-वार शिक्षण और संवर्धन'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Explore & Resources Links */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-sm font-bold text-[#FFC845] tracking-wide">
                {lang === 'en' ? 'Academy & Resources' : 'अकैडमी और संसाधन'}
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-200">
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('about')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer"
                  >
                    {lang === 'en' ? 'About Aarohan' : 'हमारे बारे में'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('approach')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer"
                  >
                    {lang === 'en' ? 'Our Teaching Approach' : 'हमारी शिक्षण पद्धति'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('assessment')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer"
                  >
                    {lang === 'en' ? 'Assessment & Growth Report' : 'मूल्यांकन और ग्रोथ रिपोर्ट'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('library')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer"
                  >
                    {lang === 'en' ? 'Learning Library (30 PDFs)' : 'लर्निंग लाइब्रेरी (30 वर्कशीट)'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('parent-corner')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer"
                  >
                    {lang === 'en' ? 'Parent Corner Articles' : 'अभिभावक कॉर्नर लेख'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('faqs')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer"
                  >
                    {lang === 'en' ? 'FAQs' : 'सामान्य प्रश्न (FAQs)'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleLink('privacy')}
                    className="hover:text-[#FFC845] transition-colors text-left cursor-pointer flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF80]" />
                    <span>{lang === 'en' ? 'Child Safety & Privacy' : 'बाल सुरक्षा और गोपनीयता'}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact & Location Column */}
            <div className="lg:col-span-3 space-y-3.5">
              <h3 className="text-sm font-bold text-[#FFC845] tracking-wide">
                {lang === 'en' ? 'Visit or Contact Us' : 'संपर्क और पता'}
              </h3>

              <div className="space-y-3 text-sm text-slate-200">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#36A9E1] mt-1 shrink-0" />
                  <span>{lang === 'en' ? ACADEMY_ADDRESS_EN : ACADEMY_ADDRESS_HI}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FFC845] shrink-0" />
                  <a
                    href="tel:+919220357826"
                    className="hover:text-[#FFC845] font-semibold transition-colors"
                  >
                    {ACADEMY_PHONE_DISPLAY}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#4CAF80] shrink-0" />
                  <span>
                    {lang === 'en'
                      ? 'Mon – Sat: 3:00 PM – 7:30 PM'
                      : 'सोमवार – शनिवार: दोपहर 3:00 – शाम 7:30'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {lang === 'en' ? 'Chat on WhatsApp (+91 9220357826)' : 'व्हाट्सऐप पर बात करें (+91 9220357826)'}
                  </span>
                </a>

                <a
                  href={buildGoogleMapsDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FFC845]" />
                  <span>{lang === 'en' ? 'Get Google Maps Directions' : 'गूगल मैप्स पर रास्ता देखें'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <p>
              © {new Date().getFullYear()} Aarohan Academy (H.No. 54B, Gupta Park, Todarmal Colony, Najafgarh, Delhi).{' '}
              {lang === 'en' ? 'All rights reserved.' : 'सर्वाधिकार सुरक्षित।'}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => handleLink('admissions')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Admissions & Enquiry' : 'प्रवेश पूछताछ'}
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => handleLink('privacy')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Privacy & Child Safety Policy' : 'गोपनीयता और बाल सुरक्षा नीति'}
              </button>
              <span aria-hidden="true">·</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick-Action Button (accessible & non-intrusive) */}
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={lang === 'en' ? 'Chat with Aarohan Academy on WhatsApp' : 'व्हाट्सऐप पर आरोहण अकैडमी से संपर्क करें'}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs sm:text-sm shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">
          {lang === 'en' ? 'WhatsApp Us' : 'व्हाट्सऐप करें'}
        </span>
      </a>
    </>
  );
};
