import React, { useState } from 'react';
import { Check, X, Sparkles, Users, Award, ShieldAlert, ArrowRight, Heart } from 'lucide-react';
import { Language, PageId } from '../utils/academyLogic';

interface TuitionComparisonSectionProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const TuitionComparisonSection: React.FC<TuitionComparisonSectionProps> = ({
  lang,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'aarohan' | 'crowded'>('aarohan');

  const comparisonPoints = [
    {
      titleEn: 'Batch Size & Space',
      titleHi: 'बैच का आकार और स्थान',
      crowdedEn: '40 to 60 students packed in large commercial halls.',
      crowdedHi: '40 से 60 बच्चों की अत्यधिक भीड़ भरी कक्षाएँ।',
      aarohanEn: 'Strictly capped at 15–20 students per batch. Ample breathing room.',
      aarohanHi: 'प्रति बैच केवल 15–20 विद्यार्थी। हर बच्चे पर व्यक्तिगत ध्यान।',
      highlight: true,
    },
    {
      titleEn: 'Doubt Resolution',
      titleHi: 'सवालों और शंकाओं का समाधान',
      crowdedEn: 'Shy children hesitate to raise hands; doubts remain unresolved.',
      crowdedHi: 'संकोची बच्चे हाथ उठाने से डरते हैं; शंकाएँ अधूरी रह जाती हैं।',
      aarohanEn: 'Encouraging, approachable teachers. Daily 1-on-1 concept checks.',
      aarohanHi: 'आत्मीय वातावरण। कक्षा में ही हर बच्चे के सवालों का पूरा समाधान।',
      highlight: true,
    },
    {
      titleEn: 'Teaching Methodology',
      titleHi: 'पढ़ाने की पद्धति',
      crowdedEn: 'Rote memorization and fast-paced lecturing to finish syllabus.',
      crowdedHi: 'पाठ्यक्रम पूरा करने के लिए केवल रटने पर जोर और तेज गति।',
      aarohanEn: 'Concept-first learning (Understand → Practise → Review → Grow).',
      aarohanHi: 'अवधारणा-आधारित समझ (CPA तकनीक) और दैनिक तार्किक अभ्यास।',
      highlight: false,
    },
    {
      titleEn: 'Daily Homework & Notebooks',
      titleHi: 'दैनिक गृहकार्य व कॉपियाँ',
      crowdedEn: 'Heavy homework assigned for parents to struggle with at home.',
      crowdedHi: 'अभिभावकों पर गृहकार्य कराने का भारी मानसिक तनाव।',
      aarohanEn: 'Guided notebook practice in class. No bedtime homework struggle.',
      aarohanHi: 'कक्षा में ही व्यवस्थित कॉपी कार्य व दैनिक अभ्यास की पूर्णता।',
      highlight: true,
    },
    {
      titleEn: 'Parent Transparency',
      titleHi: 'अभिभावक संवाद व रिपोर्ट',
      crowdedEn: 'Generic once-a-term PTM with little actionable student feedback.',
      crowdedHi: 'सत्र में केवल एक बार औपचारिक PTM, बिना ठोस जानकारी।',
      aarohanEn: 'Transparent growth tracking and open WhatsApp counsellor support.',
      aarohanHi: 'पारदर्शी प्रगति रिपोर्ट और शिक्षकों से सहज संवाद।',
      highlight: false,
    },
  ];

  const handleBookVisit = () => {
    const el = document.getElementById('booking-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('enquiry');
    }
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EB]/50 to-[#FFFDF9] border-y border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8EB] border border-[#FFC845]/70 text-[#F47B45] text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'en' ? 'The Neighbourhood Difference' : 'आपके बच्चे के लिए सही चयन'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24476B] tracking-tight">
            {lang === 'en'
              ? 'Why Discerning Parents Choose Aarohan Academy'
              : 'नजफगढ़ के जागरूक माता-पिता आरोहण को क्यों चुनते हैं?'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'en'
              ? 'Compare the experience of a crowded commercial coaching institute with our nurturing, small-batch learning space in Gupta Park.'
              : 'भीड़-भाड़ वाली कमर्शियल कोचिंग और गुप्ता पार्क स्थित हमारे बाल-केंद्रित छोटे बैच की तुलना करें।'}
          </p>
        </div>

        {/* Mobile View Toggle Pills */}
        <div className="sm:hidden flex items-center justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('aarohan')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all shadow-xs ${
              activeTab === 'aarohan'
                ? 'bg-[#24476B] text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            🌟 Aarohan Academy (15–20)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('crowded')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all shadow-xs ${
              activeTab === 'crowded'
                ? 'bg-rose-900 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            ⚠️ Crowded Tuition (50+)
          </button>
        </div>

        {/* Side-by-Side Comparison Grid (Responsive for Mobile & Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card 1: Crowded Coaching Centres */}
          <div
            className={`rounded-3xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8 space-y-6 transition-all ${
              activeTab === 'crowded' ? 'block' : 'hidden sm:block'
            }`}
          >
            <div className="flex items-center gap-3 pb-4 border-b border-rose-200/80">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#24476B] text-base sm:text-lg">
                  {lang === 'en' ? 'Crowded Mega Coaching' : 'भीड़-भाड़ वाली कोचिंग'}
                </h3>
                <span className="text-xs text-rose-700 font-semibold">
                  {lang === 'en' ? '40 to 60+ students per class' : '40 से 60+ बच्चों का बड़ा बैच'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {comparisonPoints.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-0.5">
                      {lang === 'en' ? item.titleEn : item.titleHi}
                    </strong>
                    <p className="text-slate-600 leading-snug">
                      {lang === 'en' ? item.crowdedEn : item.crowdedHi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Aarohan Academy (Highlight Champion Card) */}
          <div
            className={`rounded-3xl border-2 border-[#FFC845] bg-white p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden transition-all ring-4 ring-amber-100/60 ${
              activeTab === 'aarohan' ? 'block' : 'hidden sm:block'
            }`}
          >
            {/* Top Right Pill */}
            <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'RECOMMENDED' : 'श्रेष्ठ विकल्प'}</span>
            </div>

            <div className="flex items-center gap-3 pb-4 border-b border-amber-100">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-emerald-600 fill-emerald-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#24476B] text-base sm:text-lg">
                  Aarohan Academy
                </h3>
                <span className="text-xs text-emerald-700 font-bold">
                  {lang === 'en' ? 'Strictly 15–20 Students Batch' : 'केवल 15–20 बच्चों का सीमित बैच'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {comparisonPoints.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="block text-[#24476B] mb-0.5">
                      {lang === 'en' ? item.titleEn : item.titleHi}
                    </strong>
                    <p className="text-slate-700 leading-snug">
                      {lang === 'en' ? item.aarohanEn : item.aarohanHi}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* In-Card CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleBookVisit}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#F47B45] to-[#E06631] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>{lang === 'en' ? 'Experience the Difference — Book a Visit' : 'खुद फर्क महसूस करें — सेंटर विज़िट बुक करें'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
