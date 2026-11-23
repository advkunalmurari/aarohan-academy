import React, { useState } from 'react';
import { Clock, CheckSquare, Lightbulb, Edit3, Award, Sparkles, UserCheck, Shield } from 'lucide-react';
import { Language } from '../utils/academyLogic';

interface ClassTimelineVisualProps {
  lang: Language;
}

interface TimelinePhase {
  timeSpan: string;
  duration: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  icon: React.ReactNode;
  colorBg: string;
  badgeColor: string;
  keyPointsEn: string[];
  keyPointsHi: string[];
}

export const ClassTimelineVisual: React.FC<ClassTimelineVisualProps> = ({ lang }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const PHASES: TimelinePhase[] = [
    {
      timeSpan: '00 – 15 Min',
      duration: '15 Minutes',
      titleEn: 'School Homework & Doubt Clearing',
      titleHi: 'स्कूल गृहकार्य एवं शंका समाधान',
      subtitleEn: 'Zero backlog guarantee before new concepts begin',
      subtitleHi: 'नया अध्याय शुरू करने से पहले पिछले दिन की शंकाओं का समाधान',
      icon: <CheckSquare className="w-5 h-5 text-amber-600" />,
      colorBg: 'from-amber-500/10 to-amber-500/5 border-amber-300',
      badgeColor: 'bg-amber-100 text-amber-800',
      keyPointsEn: [
        "Teacher inspects today's school diary and notebooks",
        'Clears any difficult questions from school lectures',
        'Ensures homework is understood, not mindlessly copied',
      ],
      keyPointsHi: [
        'स्कूल डायरी और गृहकार्य का सीधा निरीक्षण',
        'स्कूल में न समझ आए प्रश्नों का तत्काल समाधान',
        'रटने के बजाय समझकर स्वयं करने पर जोर',
      ],
    },
    {
      timeSpan: '15 – 50 Min',
      duration: '35 Minutes',
      titleEn: 'Concrete-Pictorial-Abstract (CPA) Concept Teaching',
      titleHi: 'CPA अवधारणा शिक्षण (मूर्त-चित्रात्मक-अमूर्त)',
      subtitleEn: 'Real physical examples and visual models before formulas',
      subtitleHi: 'सूत्रों और परिभाषाओं से पहले दृश्य मॉडल और वास्तविक जीवन उदाहरण',
      icon: <Lightbulb className="w-5 h-5 text-blue-600" />,
      colorBg: 'from-blue-500/10 to-blue-500/5 border-blue-300',
      badgeColor: 'bg-blue-100 text-blue-800',
      keyPointsEn: [
        'Concrete: Physical learning aids, fraction blocks, geometric shapes',
        'Pictorial: Step-by-step whiteboard diagrams & number lines',
        'Abstract: Introducing mathematical symbols and formulas with deep clarity',
      ],
      keyPointsHi: [
        'मूर्त (Concrete): वास्तविक वस्तुएं व मॉडल',
        'चित्रात्मक (Pictorial): बोर्ड पर चरणबद्ध आरेख और रेखाचित्र',
        'अमूर्त (Abstract): गणितीय सूत्र और प्रतीकों की स्पष्ट समझ',
      ],
    },
    {
      timeSpan: '50 – 80 Min',
      duration: '30 Minutes',
      titleEn: 'Supervised Individual Notebook Practice',
      titleHi: 'निगरानी में व्यक्तिगत नोटबुक अभ्यास',
      subtitleEn: 'Teacher sits with each child and checks line-by-line calculations',
      subtitleHi: 'शिक्षक प्रत्येक बच्चे के पास बैठकर चरणबद्ध गणना की जांच करते हैं',
      icon: <Edit3 className="w-5 h-5 text-emerald-600" />,
      colorBg: 'from-emerald-500/10 to-emerald-500/5 border-emerald-300',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      keyPointsEn: [
        'Each student solves fresh worksheet problems independently',
        'Teacher checks rough work and corrects calculation slips immediately',
        'Fast learners get Challenge questions; struggling students get 1-on-1 scaffolding',
      ],
      keyPointsHi: [
        'प्रत्येक विद्यार्थी वर्कशीट के प्रश्नों को स्वयं हल करता है',
        'गलतियों को तुरंत पकड़कर सही विधि सिखाई जाती है',
        'तेज छात्रों को चुनौती प्रश्न और कमजोर छात्रों को व्यक्तिगत सहयोग',
      ],
    },
    {
      timeSpan: '80 – 90 Min',
      duration: '10 Minutes',
      titleEn: '5-Minute Speed Drill & Daily Parent Update Note',
      titleHi: '5-मिनट गति अभ्यास व दैनिक प्रगति नोट',
      subtitleEn: 'Daily confidence boost and structured feedback on WhatsApp',
      subtitleHi: 'दैनिक आत्मविश्वास निर्माण और व्हाट्सएप पर अभिभावक अपडेट',
      icon: <Award className="w-5 h-5 text-purple-600" />,
      colorBg: 'from-purple-500/10 to-purple-500/5 border-purple-300',
      badgeColor: 'bg-purple-100 text-purple-800',
      keyPointsEn: [
        '5-Minute timed mental math / vocabulary recall test',
        'Daily star stamp in student diary for genuine effort',
        'Regular topic progress recorded for weekly parent WhatsApp bulletin',
      ],
      keyPointsHi: [
        '5 मिनट का मौखिक गणित अथवा शब्द भंडार टेस्ट',
        'मेहनत और सही प्रयास के लिए डायरी में स्टार स्टैंप',
        'साप्ताहिक अभिभावक व्हाट्सएप अपडेट हेतु दैनिक रिकॉर्डिंग',
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#FFFDF9] via-white to-[#F7FBFF] rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-xl">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC845]/20 text-[#966b0a] text-xs font-semibold uppercase tracking-wider mb-2">
          <Clock className="w-3.5 h-3.5" />
          {lang === 'en' ? 'Daily 90-Minute Session Architecture' : 'दैनिक 90-मिनट सत्र की संरचना'}
        </div>
        <h3 className="text-2xl md:text-4xl font-extrabold text-[#1B3552] tracking-tight">
          {lang === 'en'
            ? 'What Happens Inside an Aarohan Classroom?'
            : 'आरोहण की कक्षा में 90 मिनट कैसे बीतते हैं?'}
        </h3>
        <p className="text-sm md:text-base text-slate-600 mt-2">
          {lang === 'en'
            ? 'Unlike crowded coaching where students merely copy notes from a blackboard, every minute here is engineered for deep conceptual understanding.'
            : 'भीड़भाड़ वाले कोचिंग के विपरीत जहाँ बच्चे केवल ब्लैकबोर्ड से नकल करते हैं, यहाँ प्रत्येक मिनट अवधारणा को गहराई से सिखाने के लिए संरचित है।'}
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {PHASES.map((phase, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#1B3552] text-white border-[#1B3552] shadow-lg scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : phase.badgeColor
                  }`}
                >
                  {phase.timeSpan}
                </span>
                <span className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {phase.duration}
                </span>
              </div>
              <h4 className="text-xs md:text-sm font-bold line-clamp-2">
                {lang === 'en' ? phase.titleEn : phase.titleHi}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Phase Deep Dive Card */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-slate-100 shrink-0">
              {PHASES[activeStep].icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Phase {activeStep + 1} • {PHASES[activeStep].timeSpan}
                </span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-[#1B3552]">
                {lang === 'en' ? PHASES[activeStep].titleEn : PHASES[activeStep].titleHi}
              </h4>
              <p className="text-xs md:text-sm text-slate-600 mt-0.5">
                {lang === 'en' ? PHASES[activeStep].subtitleEn : PHASES[activeStep].subtitleHi}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-semibold self-start md:self-auto shrink-0">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'en' ? 'Max 12–15 Kids / Batch' : 'अधिकतम 12-15 बच्चे / बैच'}</span>
          </div>
        </div>

        {/* Phase Action Points */}
        <div className="mt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
            {lang === 'en' ? 'Classroom Execution Checklist' : 'कक्षा में शिक्षण प्रक्रिया'}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(lang === 'en' ? PHASES[activeStep].keyPointsEn : PHASES[activeStep].keyPointsHi).map(
              (point, pIdx) => (
                <div
                  key={pIdx}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-[#1B3552] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {pIdx + 1}
                  </span>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                    {point}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom Small Batch Guarantee Pill */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#24476B]" />
            <span>
              {lang === 'en'
                ? 'Every student receives direct eye contact and notebook review in every single class.'
                : 'प्रत्येक कक्षा में प्रत्येक बच्चे की नोटबुक की व्यक्तिगत समीक्षा सुनिश्चित की जाती है।'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('booking-form');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[#1B3552] font-bold hover:underline cursor-pointer"
          >
            {lang === 'en' ? 'Book a Free Trial Class →' : 'निःशुल्क ट्रायल क्लास बुक करें →'}
          </button>
        </div>
      </div>
    </div>
  );
};
