import React from 'react';
import {
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Calendar,
  MessageCircle,
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Quote,
  Star,
} from 'lucide-react';
import { Language, PageId } from '../../utils/academyLogic';
import { SeoLandingPageData } from '../../data/seoLandingData';
import { TuitionFeeEstimator } from '../TuitionFeeEstimator';
import { LocalCommuteChecker } from '../LocalCommuteChecker';
import { ClassTimelineVisual } from '../ClassTimelineVisual';
import { pushDataLayerEvent } from '../../utils/analytics';

interface SeoLandingPageViewProps {
  pageData: SeoLandingPageData;
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const SeoLandingPageView: React.FC<SeoLandingPageViewProps> = ({
  pageData,
  lang,
  onNavigate,
}) => {
  const handleCall = () => {
    pushDataLayerEvent('lead_call_click', {
      source: 'seo_landing_page',
      slug: pageData.slug,
    });
    window.location.href = 'tel:+919220357826';
  };

  const handleWhatsApp = () => {
    pushDataLayerEvent('lead_whatsapp_click', {
      source: 'seo_landing_page',
      slug: pageData.slug,
    });
    const msg = encodeURIComponent(
      `Hello Aarohan Academy! I am interested in ${pageData.h1En}. Please share details about upcoming batch timings and a free demo class.`
    );
    window.open(`https://wa.me/919220357826?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleScrollToBooking = () => {
    pushDataLayerEvent('appointment_booked', {
      source: 'seo_landing_cta',
      slug: pageData.slug,
    });
    onNavigate('enquiry');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* 1. HERO SECTION & VALUE PROPOSITION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#182E46] via-[#203D5E] to-[#16273B] text-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Category / Area Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC845]/20 text-[#FFC845] border border-[#FFC845]/30 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? pageData.badgeEn : pageData.badgeHi}</span>
            </div>

            {/* SEO-Optimized H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-4">
              {lang === 'en' ? pageData.h1En : pageData.h1Hi}
            </h1>

            {/* Value Proposition */}
            <p className="text-lg sm:text-xl text-[#FFC845] font-semibold mb-6 leading-snug">
              {lang === 'en' ? pageData.valuePropEn : pageData.valuePropHi}
            </p>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              {lang === 'en' ? pageData.introEn : pageData.introHi}
            </p>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="bg-white/10 backdrop-blur-xs border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#FFC845] shrink-0" />
                <span className="text-xs font-semibold text-white">
                  {lang === 'en' ? 'Max 12–15 Kids / Batch' : 'अधिकतम 12-15 बच्चे / बैच'}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-white">
                  {lang === 'en' ? 'Daily Notebook Check' : 'दैनिक नोटबुक जांच'}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs border border-white/10 rounded-xl p-3 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <MapPin className="w-4 h-4 text-[#FFC845] shrink-0" />
                <span className="text-xs font-semibold text-white">
                  {lang === 'en' ? 'Gupta Park, Najafgarh' : 'गुप्ता पार्क, नजफगढ़'}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleScrollToBooking}
                className="bg-[#FFC845] hover:bg-[#f8b61e] text-[#1B3552] font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'en' ? 'Book 2-Day Free Trial' : '2 दिन का मुफ्त ट्रायल बुक करें'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleCall}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-5 py-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>+91 9220357826</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SYLLABUS & KEY CHAPTERS COVERED */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#24476B] bg-[#24476B]/10 px-3 py-1 rounded-full">
                {lang === 'en' ? 'Targeted Academic Coverage' : 'विस्तृत शैक्षणिक पाठ्यक्रम'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B3552] mt-2 tracking-tight">
                {lang === 'en' ? 'Core Subjects & Important Concepts Taught' : 'पढ़ाए जाने वाले मुख्य विषय एवं महत्वपूर्ण अध्याय'}
              </h2>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-2 gap-3">
              {pageData.subjectsCovered.map((sub, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center gap-2.5 shadow-xs">
                  <BookOpen className="w-4 h-4 text-[#24476B] shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">{sub}</span>
                </div>
              ))}
            </div>

            {/* Key Chapters Checklist */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-[#1B3552] uppercase tracking-wider mb-3">
                {lang === 'en' ? 'Critical Focus Chapters' : 'विशेष ध्यान देने योग्य अध्याय'}
              </h3>
              <div className="space-y-2.5">
                {(lang === 'en' ? pageData.keyChaptersEn : pageData.keyChaptersHi).map((chapter, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{chapter}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Approach */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200/80">
              <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Our Concrete Teaching Methodology' : 'हमारी शिक्षण पद्धति'}
              </h3>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                {lang === 'en' ? pageData.teachingApproachEn : pageData.teachingApproachHi}
              </p>
            </div>
          </div>

          {/* Right Why Aarohan Box (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                {lang === 'en' ? 'Why Parents Choose Us' : 'माता-पिता हमें क्यों चुनते हैं'}
              </span>
              <h3 className="text-xl font-bold text-[#1B3552] mt-2">
                {lang === 'en' ? 'The Aarohan Small-Batch Advantage' : 'आरोहण के छोटे बैच का लाभ'}
              </h3>
            </div>

            <div className="space-y-3">
              {(lang === 'en' ? pageData.whyAarohanEn : pageData.whyAarohanHi).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Parent Testimonial Card */}
            <div className="pt-4 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-2xl">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed mb-2">
                "{lang === 'en' ? pageData.testimonial.quoteEn : pageData.testimonial.quoteHi}"
              </p>
              <div className="text-[11px] font-bold text-[#1B3552]">
                {pageData.testimonial.parentName} •{' '}
                <span className="font-normal text-slate-500">{pageData.testimonial.studentClass} ({pageData.testimonial.locality})</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE 90-MINUTE SESSION VISUAL */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClassTimelineVisual lang={lang} />
      </section>

      {/* 4. INTERACTIVE FEE ESTIMATOR */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <TuitionFeeEstimator lang={lang} onSelectPlan={() => handleScrollToBooking()} />
      </section>

      {/* 5. COMMUTE & LOCALITY CHECKER */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <LocalCommuteChecker lang={lang} />
      </section>

      {/* 6. FAQS ACCORDION */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            {lang === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3552]">
            {lang === 'en' ? `Questions About ${pageData.h1En}` : 'अभिभावकों के सामान्य प्रश्न'}
          </h2>
        </div>

        <div className="space-y-4">
          {pageData.faqs.map((faq, fIdx) => (
            <div key={fIdx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-[#1B3552] mb-2 flex items-start gap-2">
                <span className="text-[#FFC845] font-extrabold">Q.</span>
                <span>{lang === 'en' ? faq.questionEn : faq.questionHi}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-5">
                {lang === 'en' ? faq.answerEn : faq.answerHi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. RELATED INTERNAL LINKS GRID (SILO ARCHITECTURE) */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
            {lang === 'en' ? 'Explore Other Classes & Nearby Locations' : 'अन्य कक्षाएं और निकटवर्ती क्षेत्र'}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {pageData.relatedLinks.map((link) => (
              <button
                key={link.slug}
                type="button"
                onClick={() => onNavigate(link.slug as PageId)}
                className="bg-slate-50 hover:bg-[#1B3552] hover:text-white text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{lang === 'en' ? link.labelEn : link.labelHi}</span>
                <ArrowRight className="w-3 h-3 opacity-60" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="bg-[#FFC845]/15 hover:bg-[#FFC845] text-[#1B3552] text-xs font-bold px-4 py-2.5 rounded-xl border border-[#FFC845]/40 transition-all cursor-pointer"
            >
              {lang === 'en' ? '← Back to Main Home' : '← मुख्य पृष्ठ पर वापस जाएं'}
            </button>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM STICKY CONVERSION BANNER */}
      <div className="bg-[#1B3552] text-white py-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-base font-bold text-white">
              {lang === 'en' ? 'Ready to give your child the Aarohan advantage?' : 'अपने बच्चे को एक मजबूत शैक्षणिक शुरुआत दें'}
            </div>
            <div className="text-xs text-slate-300">
              {lang === 'en'
                ? 'H.No. 49B, Gupta Park, Todarmal Colony, Najafgarh • Call 9220357826'
                : 'गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़ • संपर्क: 9220357826'}
            </div>
          </div>
          <button
            type="button"
            onClick={handleScrollToBooking}
            className="bg-[#FFC845] hover:bg-[#f8b61e] text-[#1B3552] font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer shrink-0"
          >
            {lang === 'en' ? 'Book Free Diagnostic Class' : 'निःशुल्क डेमो क्लास बुक करें'}
          </button>
        </div>
      </div>
    </div>
  );
};
