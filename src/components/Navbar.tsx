import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  MessageCircle,
  BookOpen,
  Sparkles,
  GraduationCap,
  Layers,
  FileText,
  HelpCircle,
  Award,
} from 'lucide-react';
import { Language, PageId, ACADEMY_PHONE_DISPLAY, buildWhatsAppUrl } from '../utils/academyLogic';
import { BRAND_ASSETS } from '../data/academyData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  lang: Language;
  onToggleLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  lang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programmesDropdownOpen, setProgrammesDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const progDropdownRef = useRef<HTMLDivElement>(null);
  const resDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (progDropdownRef.current && !progDropdownRef.current.contains(e.target as Node)) {
        setProgrammesDropdownOpen(false);
      }
      if (resDropdownRef.current && !resDropdownRef.current.contains(e.target as Node)) {
        setResourcesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setProgrammesDropdownOpen(false);
    setResourcesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isProgrammeActive = [
    'programmes',
    'prog-early',
    'prog-primary-1-2',
    'prog-primary-3-5',
    'prog-middle-6-8',
    'subjects',
  ].includes(currentPage);

  const isApproachActive = ['approach', 'assessment'].includes(currentPage);
  const isResourcesActive = ['library', 'parent-corner', 'faqs'].includes(currentPage);

  const programmeLinks: { id: PageId; label: { en: string; hi: string }; sub: { en: string; hi: string }; color: string }[] = [
    {
      id: 'prog-early',
      label: { en: 'Nursery to UKG', hi: 'नर्सरी, LKG और UKG' },
      sub: { en: 'Aarambh • Play & Phonics Foundation', hi: 'आरंभ • खेल और फोनेटिक्स नींव' },
      color: '#F47B45',
    },
    {
      id: 'prog-primary-1-2',
      label: { en: 'Classes 1–2', hi: 'कक्षा 1 से 2' },
      sub: { en: 'Aadhar • Reading & Number Sense', hi: 'आधार • पठन और संख्या ज्ञान' },
      color: '#4CAF80',
    },
    {
      id: 'prog-primary-3-5',
      label: { en: 'Classes 3–5', hi: 'कक्षा 3 से 5' },
      sub: { en: 'Aadhar • Concepts, Fractions & Writing', hi: 'आधार • अवधारणा, भिन्न और लेखन' },
      color: '#36A9E1',
    },
    {
      id: 'prog-middle-6-8',
      label: { en: 'Classes 6–8', hi: 'कक्षा 6 से 8' },
      sub: { en: 'Aagey • Maths, Science, SST & English', hi: 'आगे • गणित, विज्ञान, SST और अंग्रेजी' },
      color: '#24476B',
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Official Brand Identity */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36A9E1] rounded-xl p-1 shrink-0"
          aria-label="Aarohan Academy Home"
        >
          <img
            src={BRAND_ASSETS.logo}
            alt="Aarohan Academy Official Logo"
            className="w-13 h-13 sm:w-14 sm:h-14 object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#24476B] whitespace-nowrap leading-tight">
              Aarohan Academy
            </span>
            <span className="text-xs font-semibold text-[#F47B45] whitespace-nowrap">
              {lang === 'en' ? 'Learn • Grow • Shine' : 'सीखें • बढ़ें • चमकें'}
            </span>
          </div>
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-700"
          aria-label="Main Navigation"
        >
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'home'
                ? 'text-[#24476B] bg-[#36A9E1]/10 font-bold'
                : 'hover:text-[#24476B] hover:bg-slate-100'
            }`}
          >
            {lang === 'en' ? 'Home' : 'मुख्य पृष्ठ'}
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'about'
                ? 'text-[#24476B] bg-[#36A9E1]/10 font-bold'
                : 'hover:text-[#24476B] hover:bg-slate-100'
            }`}
          >
            {lang === 'en' ? 'About Us' : 'हमारे बारे में'}
          </button>

          {/* Programmes Dropdown */}
          <div className="relative" ref={progDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setProgrammesDropdownOpen((prev) => !prev);
                setResourcesDropdownOpen(false);
              }}
              aria-expanded={programmesDropdownOpen}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isProgrammeActive
                  ? 'text-[#24476B] bg-[#36A9E1]/10 font-bold'
                  : 'hover:text-[#24476B] hover:bg-slate-100'
              }`}
            >
              <span>{lang === 'en' ? 'Programmes' : 'शिक्षण कार्यक्रम'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  programmesDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {programmesDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 z-50">
                <div className="space-y-1">
                  {programmeLinks.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors flex items-start gap-3 ${
                        currentPage === item.id
                          ? 'bg-[#FFF8EB] text-[#24476B]'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <div className="font-bold text-sm text-[#24476B]">
                          {item.label[lang]}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {item.sub[lang]}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleNavClick('programmes')}
                    className="px-3 py-2 text-xs font-bold text-[#24476B] hover:bg-slate-100 rounded-lg text-left flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#36A9E1]" />
                    <span>{lang === 'en' ? 'All Classes Matrix' : 'संपूर्ण पाठ्यक्रम'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('subjects')}
                    className="px-3 py-2 text-xs font-bold text-[#24476B] hover:bg-slate-100 rounded-lg text-left flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#F47B45]" />
                    <span>{lang === 'en' ? 'Subjects Focus' : 'विषय-वार शिक्षण'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('approach')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              isApproachActive
                ? 'text-[#24476B] bg-[#36A9E1]/10 font-bold'
                : 'hover:text-[#24476B] hover:bg-slate-100'
            }`}
          >
            {lang === 'en' ? 'Learning Approach' : 'शिक्षण पद्धति'}
          </button>

          {/* Learning Resources Dropdown */}
          <div className="relative" ref={resDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setResourcesDropdownOpen((prev) => !prev);
                setProgrammesDropdownOpen(false);
              }}
              aria-expanded={resourcesDropdownOpen}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isResourcesActive
                  ? 'text-[#24476B] bg-[#36A9E1]/10 font-bold'
                  : 'hover:text-[#24476B] hover:bg-slate-100'
              }`}
            >
              <span>{lang === 'en' ? 'Learning Resources' : 'लर्निंग रिसोर्स'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  resourcesDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {resourcesDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 z-50 space-y-1">
                <button
                  type="button"
                  onClick={() => handleNavClick('library')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-50 flex items-start gap-3"
                >
                  <FileText className="w-4 h-4 text-[#36A9E1] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-[#24476B]">
                      {lang === 'en' ? 'Learning Library (30 Worksheets)' : 'लर्निंग लाइब्रेरी (30 वर्कशीट)'}
                    </div>
                    <div className="text-xs text-slate-500">
                      {lang === 'en' ? 'Free printable A4 practice sheets' : 'निःशुल्क प्रिंट करने योग्य अभ्यास पत्र'}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('assessment')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-50 flex items-start gap-3"
                >
                  <Award className="w-4 h-4 text-[#4CAF80] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-[#24476B]">
                      {lang === 'en' ? 'Assessment & Growth Report' : 'मूल्यांकन और ग्रोथ रिपोर्ट'}
                    </div>
                    <div className="text-xs text-slate-500">
                      {lang === 'en' ? 'How we track student progress' : 'बच्चों की प्रगति की पारदर्शी जाँच'}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('parent-corner')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-50 flex items-start gap-3"
                >
                  <Sparkles className="w-4 h-4 text-[#F47B45] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-[#24476B]">
                      {lang === 'en' ? 'Parent Corner Guides' : 'अभिभावक कॉर्नर लेख'}
                    </div>
                    <div className="text-xs text-slate-500">
                      {lang === 'en' ? 'Practical home study tips' : 'घर पर पढ़ाई के उपयोगी सुझाव'}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('faqs')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-50 flex items-start gap-3"
                >
                  <HelpCircle className="w-4 h-4 text-[#24476B] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-[#24476B]">
                      {lang === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न (FAQs)'}
                    </div>
                    <div className="text-xs text-slate-500">
                      {lang === 'en' ? 'Batches, syllabus & admissions' : 'बैच, पाठ्यक्रम और प्रवेश जानकारी'}
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentPage === 'contact' || currentPage === 'admissions'
                ? 'text-[#24476B] bg-[#36A9E1]/10 font-bold'
                : 'hover:text-[#24476B] hover:bg-slate-100'
            }`}
          >
            {lang === 'en' ? 'Contact' : 'संपर्क करें'}
          </button>
        </nav>

        {/* Zone 3: Language Switcher & Primary CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Bilingual Switcher: EN | हिंदी */}
          <div
            className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200"
            role="group"
            aria-label="Language Switcher"
          >
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              aria-pressed={lang === 'en'}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#24476B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#24476B]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onToggleLang('hi')}
              aria-pressed={lang === 'hi'}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                lang === 'hi'
                  ? 'bg-[#24476B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#24476B]'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Prominent Enquire Now Button */}
          <button
            type="button"
            onClick={() => handleNavClick('admissions')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white bg-[#F47B45] hover:bg-[#e06631] rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'en' ? 'Enquire Now' : 'प्रवेश पूछताछ'}
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl text-[#24476B] hover:bg-slate-100 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 max-h-[82vh] overflow-y-auto shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2.5 rounded-xl text-left text-sm font-bold ${
                currentPage === 'home' ? 'bg-[#24476B] text-white' : 'bg-slate-50 text-slate-800'
              }`}
            >
              {lang === 'en' ? 'Home' : 'मुख्य पृष्ठ'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2.5 rounded-xl text-left text-sm font-bold ${
                currentPage === 'about' ? 'bg-[#24476B] text-white' : 'bg-slate-50 text-slate-800'
              }`}
            >
              {lang === 'en' ? 'About Us' : 'हमारे बारे में'}
            </button>
          </div>

          <div className="bg-[#FFF8EB] rounded-2xl p-3.5 border border-[#FFC845]/40">
            <div className="text-xs font-bold text-[#24476B] mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#F47B45]" />
              <span>{lang === 'en' ? 'Learning Programmes (Nursery to Class 8)' : 'शिक्षण कार्यक्रम (नर्सरी से कक्षा 8)'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {programmeLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-left text-xs font-bold border ${
                    currentPage === item.id
                      ? 'bg-[#24476B] text-white border-[#24476B]'
                      : 'bg-white text-[#24476B] border-slate-200'
                  }`}
                >
                  <div>{item.label[lang]}</div>
                  <div className={`text-[11px] font-normal ${currentPage === item.id ? 'text-slate-200' : 'text-slate-500'}`}>
                    {item.sub[lang]}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('programmes')}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#24476B] text-left"
              >
                {lang === 'en' ? 'All Classes Matrix →' : 'संपूर्ण कक्षा मैट्रिक्स →'}
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('subjects')}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#24476B] text-left"
              >
                {lang === 'en' ? 'Subjects Covered →' : 'सभी विषय देखें →'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('approach')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 text-left text-sm font-bold text-slate-800"
            >
              {lang === 'en' ? 'Learning Approach' : 'शिक्षण पद्धति'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('assessment')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 text-left text-sm font-bold text-slate-800"
            >
              {lang === 'en' ? 'Growth Report' : 'प्रगति रिपोर्ट'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('library')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 text-left text-sm font-bold text-slate-800"
            >
              {lang === 'en' ? 'Learning Library' : 'लर्निंग लाइब्रेरी'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('parent-corner')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 text-left text-sm font-bold text-slate-800"
            >
              {lang === 'en' ? 'Parent Corner' : 'अभिभावक कॉर्नर'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('faqs')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 text-left text-sm font-bold text-slate-800"
            >
              {lang === 'en' ? 'FAQs' : 'सामान्य प्रश्न (FAQs)'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-50 text-left text-sm font-bold text-slate-800"
            >
              {lang === 'en' ? 'Contact & Map' : 'संपर्क और पता'}
            </button>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => handleNavClick('admissions')}
              className="w-full py-3 px-4 rounded-xl bg-[#F47B45] text-white font-bold text-sm text-center shadow-xs"
            >
              {lang === 'en' ? 'Book a Learning Assessment' : 'प्रारंभिक मूल्यांकन बुक करें'}
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+919220357826"
                className="py-2.5 px-3 rounded-xl bg-[#24476B] text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{ACADEMY_PHONE_DISPLAY}</span>
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
