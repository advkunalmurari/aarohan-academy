import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, BookOpen, Clock, Users, Gift } from 'lucide-react';
import { Language } from '../utils/academyLogic';
import { pushDataLayerEvent } from '../utils/analytics';

interface TuitionFeeEstimatorProps {
  lang: Language;
  onSelectPlan?: (details: { classGroup: string; subjectPlan: string; mode: string }) => void;
}

interface ClassOption {
  id: string;
  labelEn: string;
  labelHi: string;
  badgeEn: string;
  badgeHi: string;
  baseFeeMonth: number;
  gradeNumber: number;
}

const CLASS_OPTIONS: ClassOption[] = [
  { id: 'early', labelEn: 'Nursery – UKG', labelHi: 'नर्सरी – यूकेजी', badgeEn: 'Foundational Phonics', badgeHi: 'बुनियादी फोनेटिक्स', baseFeeMonth: 1200, gradeNumber: 0 },
  { id: 'primary-1-2', labelEn: 'Class 1 – 2', labelHi: 'कक्षा 1 – 2', badgeEn: 'Reading & Numeracy', badgeHi: 'पठन एवं अंकगणित', baseFeeMonth: 1400, gradeNumber: 1 },
  { id: 'primary-3-5', labelEn: 'Class 3 – 5', labelHi: 'कक्षा 3 – 5', badgeEn: 'CPA Concept Building', badgeHi: 'अवधारणा निर्माण', baseFeeMonth: 1600, gradeNumber: 4 },
  { id: 'middle-6-8', labelEn: 'Class 6 – 8', labelHi: 'कक्षा 6 – 8', badgeEn: 'CBSE Middle School', badgeHi: 'सीबीएसई मिडिल स्कूल', baseFeeMonth: 1900, gradeNumber: 7 },
];

export const TuitionFeeEstimator: React.FC<TuitionFeeEstimatorProps> = ({ lang, onSelectPlan }) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('primary-3-5');
  const [subjectPlan, setSubjectPlan] = useState<'all' | 'maths_science' | 'single'>('all');
  const [learningMode, setLearningMode] = useState<'centre' | 'personal' | 'hybrid'>('centre');
  const [appliedPromo, setAppliedPromo] = useState<boolean>(true);

  const currentClass = CLASS_OPTIONS.find((c) => c.id === selectedClassId) || CLASS_OPTIONS[2];

  // Fee calculation logic
  let multiplier = 1.0;
  if (subjectPlan === 'all') multiplier = 1.0;
  else if (subjectPlan === 'maths_science') multiplier = 0.85;
  else if (subjectPlan === 'single') multiplier = 0.65;

  let modeFee = 0;
  if (learningMode === 'personal') modeFee = 800;
  else if (learningMode === 'hybrid') modeFee = 250;

  const estimatedMonthly = Math.round((currentClass.baseFeeMonth * multiplier + modeFee) / 50) * 50;

  const handleBookDemo = () => {
    pushDataLayerEvent('lead_form_submit', {
      form_name: 'fee_estimator_cta',
      class_selected: currentClass.labelEn,
      subject_plan: subjectPlan,
      learning_mode: learningMode,
      estimated_fee: estimatedMonthly,
    });

    if (onSelectPlan) {
      onSelectPlan({
        classGroup: currentClass.labelEn,
        subjectPlan,
        mode: learningMode,
      });
    }

    const bookingEl = document.getElementById('booking-form');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1B3552] via-[#24476B] to-[#0F2238] rounded-3xl p-6 md:p-10 text-white shadow-2xl border border-white/10 relative overflow-hidden">
      {/* Background ambient decorative circles */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#FFC845]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#29A383]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC845]/20 text-[#FFC845] text-xs font-semibold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            {lang === 'en' ? 'Transparent Tuition Calculator' : 'पारदर्शी ट्यूशन फीस कैलकुलेटर'}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            {lang === 'en' ? 'Estimate Monthly Tuition Investment' : 'मासिक ट्यूशन निवेश का पारदर्शी अनुमान'}
          </h3>
          <p className="text-sm md:text-base text-slate-300 mt-1">
            {lang === 'en'
              ? 'No hidden admission charges. Fair, small-batch fees with daily teacher attention in Najafgarh.'
              : 'कोई छुपा हुआ शुल्क नहीं। गुप्ता पार्क, नजफगढ़ में व्यक्तिगत ध्यान और निष्पक्ष मासिक फीस।'}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1.5 rounded-xl text-xs font-medium self-start md:self-auto">
          <Gift className="w-4 h-4 text-emerald-300" />
          <span>{lang === 'en' ? '2-Day Free Trial Included' : '2 दिन का मुफ्त ट्रायल शामिल'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Interactive Selectors (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Select Class */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              1. {lang === 'en' ? "Select Student's Class" : 'छात्र की कक्षा चुनें'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CLASS_OPTIONS.map((opt) => {
                const isSelected = selectedClassId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedClassId(opt.id)}
                    className={`flex flex-col text-left p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFC845] text-[#1B3552] border-[#FFC845] shadow-lg font-bold scale-[1.02]'
                        : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                    }`}
                  >
                    <span className="text-sm">{lang === 'en' ? opt.labelEn : opt.labelHi}</span>
                    <span
                      className={`text-[11px] mt-1 font-normal ${
                        isSelected ? 'text-[#1B3552]/80' : 'text-slate-400'
                      }`}
                    >
                      {lang === 'en' ? opt.badgeEn : opt.badgeHi}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Subject Coverage */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              2. {lang === 'en' ? 'Select Subject Package' : 'विषय पैकेज चुनें'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setSubjectPlan('all')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  subjectPlan === 'all'
                    ? 'bg-white text-[#1B3552] border-white shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-0.5">
                  {lang === 'en' ? '★ Most Popular' : '★ सबसे लोकप्रिय'}
                </div>
                <div className="text-sm font-bold">
                  {lang === 'en' ? 'All Core Subjects' : 'सभी मुख्य विषय'}
                </div>
                <div className={`text-xs mt-1 ${subjectPlan === 'all' ? 'text-slate-600' : 'text-slate-400'}`}>
                  {lang === 'en' ? 'Maths, Science, English, Hindi/EVS' : 'गणित, विज्ञान, अंग्रेज़ी, EVS'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSubjectPlan('maths_science')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  subjectPlan === 'maths_science'
                    ? 'bg-white text-[#1B3552] border-white shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-0.5">
                  {lang === 'en' ? 'STEM Focus' : 'STEM फोकस'}
                </div>
                <div className="text-sm font-bold">
                  {lang === 'en' ? 'Maths & Science Duo' : 'गणित और विज्ञान'}
                </div>
                <div className={`text-xs mt-1 ${subjectPlan === 'maths_science' ? 'text-slate-600' : 'text-slate-400'}`}>
                  {lang === 'en' ? 'Deep concept clarity & problem solving' : 'अवधारणा स्पष्टता और अभ्यास'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSubjectPlan('single')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  subjectPlan === 'single'
                    ? 'bg-white text-[#1B3552] border-white shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-0.5">
                  {lang === 'en' ? 'Targeted' : 'विशिष्ट'}
                </div>
                <div className="text-sm font-bold">
                  {lang === 'en' ? 'Single Subject Focus' : 'केवल एक विषय'}
                </div>
                <div className={`text-xs mt-1 ${subjectPlan === 'single' ? 'text-slate-600' : 'text-slate-400'}`}>
                  {lang === 'en' ? 'Targeted subject improvement' : 'विशेष विषय में सुधार हेतु'}
                </div>
              </button>
            </div>
          </div>

          {/* Step 3: Learning Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              3. {lang === 'en' ? 'Batch Learning Mode' : 'सीखने का माध्यम'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setLearningMode('centre')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  learningMode === 'centre'
                    ? 'bg-[#FFC845] text-[#1B3552] border-[#FFC845] font-semibold'
                    : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                }`}
              >
                <div className="text-xs font-bold">{lang === 'en' ? 'Offline Small Batch' : 'ऑफलाइन छोटा बैच'}</div>
                <div className={`text-[11px] mt-0.5 ${learningMode === 'centre' ? 'text-[#1B3552]/80' : 'text-slate-400'}`}>
                  {lang === 'en' ? 'Max 12-15 students' : 'अधिकतम 12-15 विद्यार्थी'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLearningMode('personal')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  learningMode === 'personal'
                    ? 'bg-[#FFC845] text-[#1B3552] border-[#FFC845] font-semibold'
                    : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                }`}
              >
                <div className="text-xs font-bold">{lang === 'en' ? '1-on-1 Personalized' : 'व्यक्तिगत 1-ऑन-1'}</div>
                <div className={`text-[11px] mt-0.5 ${learningMode === 'personal' ? 'text-[#1B3552]/80' : 'text-slate-400'}`}>
                  {lang === 'en' ? 'Individual dedicated tutor' : 'समर्पित व्यक्तिगत शिक्षक'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLearningMode('hybrid')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  learningMode === 'hybrid'
                    ? 'bg-[#FFC845] text-[#1B3552] border-[#FFC845] font-semibold'
                    : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                }`}
              >
                <div className="text-xs font-bold">{lang === 'en' ? 'Hybrid / Doubt Support' : 'हाइब्रिड / ऑनलाइन'}</div>
                <div className={`text-[11px] mt-0.5 ${learningMode === 'hybrid' ? 'text-[#1B3552]/80' : 'text-slate-400'}`}>
                  {lang === 'en' ? 'Classroom + Digital notes' : 'कक्षा + डिजिटल सहयोग'}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Fee Calculation Summary Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white text-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between border border-slate-100">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {lang === 'en' ? 'Estimated Plan' : 'चयनित योजना'}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B3552] bg-slate-100 px-2.5 py-1 rounded-full">
                <BookOpen className="w-3.5 h-3.5 text-[#24476B]" />
                {lang === 'en' ? currentClass.labelEn : currentClass.labelHi}
              </span>
            </div>

            {/* Estimated Number */}
            <div className="my-5 text-center">
              <span className="text-xs text-slate-500 font-medium block mb-1">
                {lang === 'en' ? 'Estimated Monthly Fee' : 'अनुमानित मासिक ट्यूशन शुल्क'}
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl md:text-5xl font-black text-[#1B3552] tracking-tight">
                  ₹{estimatedMonthly.toLocaleString('en-IN')}
                </span>
                <span className="text-slate-500 text-sm font-medium">
                  {lang === 'en' ? '/ month' : '/ माह'}
                </span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === 'en' ? 'Zero Registration Fee • No Lock-in Period' : 'शून्य पंजीकरण शुल्क • मासिक भुगतान'}
              </div>
            </div>

            {/* Inclusions Checklist */}
            <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'en' ? 'Small batch capped at 12–15 students' : 'अधिकतम 12-15 बच्चों का छोटा बैच'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'en' ? 'Daily homework checking & school test prep' : 'दैनिक गृहकार्य जांच और स्कूल परीक्षा तैयारी'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'en' ? 'Weekly concept quizzes & WhatsApp progress updates' : 'साप्ताहिक क्विज़ और व्हाट्सएप पर प्रगति रिपोर्ट'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'en' ? 'Free Diagnostic Assessment before batch placement' : 'बैच शुरू करने से पहले निःशुल्क मूल्यांकन'}</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleBookDemo}
              className="w-full group bg-gradient-to-r from-[#FFC845] to-[#f8b61e] hover:from-[#f8b61e] hover:to-[#e5a415] text-[#1B3552] font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
            >
              <span>{lang === 'en' ? 'Lock This Plan & Book Free Demo' : 'यह प्लान चुनें और फ्री डेमो बुक करें'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-2">
              {lang === 'en'
                ? '📍 Centre at H.No. 49B, Gupta Park, Najafgarh • Call 9220357826'
                : '📍 केंद्र: H.No. 49B, गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़ • 9220357826'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
