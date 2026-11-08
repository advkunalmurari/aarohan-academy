import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Calculator,
  Compass,
  Microscope,
  Languages,
  Globe,
} from 'lucide-react';
import { Language, PageId } from '../utils/academyLogic';
import { BRAND_ASSETS } from '../data/academyData';

/* ============================================================================
   1. NURTURING YOUNG MINDS — 4 ORGANIC BLOB STUDENT PORTRAIT SHOWCASE
      (Inspired by BOO "Nurturing Young Minds, One Lesson at a Time" & Edukids)
============================================================================ */
interface NurturingYoungMindsProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const NurturingYoungMindsStrip: React.FC<NurturingYoungMindsProps> = ({
  lang,
  onNavigate,
}) => {
  const personas = [
    {
      id: 'prog-early' as PageId,
      blobBg: '#F47B45',
      ringBorder: '#FFC845',
      cardTint: '#FFF8EB',
      photo: BRAND_ASSETS.happyChildrenTeacher,
      badgeEn: 'Nursery · LKG · UKG',
      badgeHi: 'नर्सरी · LKG · UKG',
      titleEn: 'Little Explorers',
      titleHi: 'नन्हे खोजकर्ता (आरंभ)',
      subtitleEn: 'Phonics, Stories, Shapes & Joyful Counting',
      subtitleHi: 'फोनेटिक्स, कहानियाँ, आकार और खेल-खेल में गिनती',
      shapeRadius: '58% 42% 48% 52% / 44% 56% 44% 56%',
    },
    {
      id: 'prog-primary-1-2' as PageId,
      blobBg: '#36A9E1',
      ringBorder: '#24476B',
      cardTint: '#F0F7FF',
      photo: BRAND_ASSETS.studentWithBooks,
      badgeEn: 'Classes 1 & 2',
      badgeHi: 'कक्षा 1 और 2',
      titleEn: 'Confident Readers',
      titleHi: 'आत्मविश्वासी पाठक (आधार 1–2)',
      subtitleEn: 'Sentence Fluency, Matras & Place-Value Maths',
      subtitleHi: 'धाराप्रवाह पठन, हिंदी मात्राएँ और स्थानीय मान गणित',
      shapeRadius: '45% 55% 60% 40% / 52% 45% 55% 48%',
    },
    {
      id: 'prog-primary-3-5' as PageId,
      blobBg: '#FFC845',
      ringBorder: '#F47B45',
      cardTint: '#FFFDF5',
      photo: BRAND_ASSETS.attentiveGirlsWriting,
      badgeEn: 'Classes 3 to 5',
      badgeHi: 'कक्षा 3 से 5',
      titleEn: 'Curious Thinkers',
      titleHi: 'जिज्ञासु विचारक (आधार 3–5)',
      subtitleEn: 'Fractions, Grammar in Context & EVS Projects',
      subtitleHi: 'भिन्न, व्यावहारिक व्याकरण और पर्यावरण अध्ययन (EVS)',
      shapeRadius: '62% 38% 46% 54% / 48% 58% 42% 52%',
    },
    {
      id: 'prog-middle-6-8' as PageId,
      blobBg: '#4CAF80',
      ringBorder: '#24476B',
      cardTint: '#F4FBF7',
      photo: BRAND_ASSETS.confidentStudentGirl,
      badgeEn: 'Classes 6 to 8',
      badgeHi: 'कक्षा 6 से 8',
      titleEn: 'Future Achievers',
      titleHi: 'भविष्य के विजेता (आगे 6–8)',
      subtitleEn: 'Algebra, Geometry, Curiosity Science & SST',
      subtitleHi: 'बीजगणित, ज्यामिति, विज्ञान प्रयोग और सामाजिक विज्ञान',
      shapeRadius: '48% 52% 56% 44% / 56% 44% 56% 44%',
    },
  ];

  return (
    <div className="rounded-[2rem] bg-white/95 backdrop-blur-xs border-2 border-[#24476B]/10 p-6 sm:p-10 shadow-lg">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#F47B45]">
          {lang === 'en'
            ? 'Every Age Learns Differently'
            : 'हर उम्र के बच्चों के लिए विशेष शिक्षण शैली'}
        </p>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-[#24476B] mt-1.5 tracking-tight">
          {lang === 'en'
            ? 'Nurturing Young Minds, One Lesson at a Time'
            : 'नन्हे मस्तिष्कों का पोषण—एक-एक पाठ से मजबूत होती नींव'}
        </h3>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          {lang === 'en'
            ? 'Click any learner group below to explore their visual syllabus, activities, and worksheets.'
            : 'किसी भी समूह पर क्लिक करके उनका पाठ्यक्रम, गतिविधियाँ और अभ्यास शीट देखें।'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {personas.map((item, idx) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              onNavigate(item.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group cursor-pointer rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all flex flex-col items-center text-center"
            style={{ backgroundColor: item.cardTint }}
          >
            {/* Organic Blob Photo Container */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center mb-4">
              {/* Outer dashed orbit */}
              <div
                className="absolute inset-0 border-2 border-dashed transition-transform duration-500 group-hover:rotate-12"
                style={{
                  borderColor: item.ringBorder,
                  borderRadius: item.shapeRadius,
                  opacity: 0.45,
                }}
              />
              {/* Solid colourful organic blob */}
              <div
                className="w-40 h-40 sm:w-44 sm:h-44 overflow-hidden shadow-md border-4 border-white transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: item.blobBg,
                  borderRadius: item.shapeRadius,
                }}
              >
                <img
                  src={item.photo}
                  alt={lang === 'en' ? item.titleEn : item.titleHi}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              {/* Floating stage number badge */}
              <span
                className="absolute -bottom-1 right-3 px-3 py-1 rounded-xl text-[11px] font-extrabold text-white shadow-md"
                style={{ backgroundColor: item.blobBg }}
              >
                0{idx + 1} · {lang === 'en' ? item.badgeEn : item.badgeHi}
              </span>
            </div>

            <h4 className="text-lg font-extrabold text-[#24476B] mt-2 group-hover:text-[#F47B45] transition-colors">
              {lang === 'en' ? item.titleEn : item.titleHi}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
              {lang === 'en' ? item.subtitleEn : item.subtitleHi}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-[#24476B] group-hover:text-[#36A9E1]">
              <span>{lang === 'en' ? 'Explore Stage' : 'विस्तार से देखें'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
   2. INTERACTIVE VISUAL CONCEPT DIAGRAMS LAB (FOR KIDS, STUDENTS & PARENTS)
      Shows real educational diagrams (CPA Maths, Phonics/Matra, Science, Geometry)
============================================================================ */
export const InteractiveConceptDiagramsSection: React.FC<{ lang: Language }> = ({
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'cpa' | 'phonics' | 'science' | 'geometry'>('cpa');

  const tabs = [
    {
      id: 'cpa' as const,
      icon: Calculator,
      color: '#36A9E1',
      labelEn: '1. CPA Maths Diagram',
      labelHi: '1. CPA गणित आरेख',
      gradeTagEn: 'Nursery – Class 6',
      gradeTagHi: 'नर्सरी – कक्षा 6',
    },
    {
      id: 'phonics' as const,
      icon: Languages,
      color: '#F47B45',
      labelEn: '2. Phonics & Matra Bridge',
      labelHi: '2. फोनेटिक्स और मात्रा सेतु',
      gradeTagEn: 'Nursery – Class 4',
      gradeTagHi: 'नर्सरी – कक्षा 4',
    },
    {
      id: 'science' as const,
      icon: Microscope,
      color: '#4CAF80',
      labelEn: '3. Visual Science & EVS',
      labelHi: '3. चित्रमय विज्ञान और EVS',
      gradeTagEn: 'Classes 3 – 8',
      gradeTagHi: 'कक्षा 3 – 8',
    },
    {
      id: 'geometry' as const,
      icon: Compass,
      color: '#24476B',
      labelEn: '4. Geometry & Algebra Lab',
      labelHi: '4. ज्यामिति और बीजगणित मॉडल',
      gradeTagEn: 'Classes 5 – 8',
      gradeTagHi: 'कक्षा 5 – 8',
    },
  ];

  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-[#FFFDF9] via-white to-[#F0F7FF] border-2 border-[#36A9E1]/25 p-6 sm:p-9 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#36A9E1]">
            <Sparkles className="w-4 h-4 text-[#F47B45]" />
            <span>
              {lang === 'en'
                ? 'Interactive Visual Learning Diagrams'
                : 'बच्चों और छात्रों के लिए इंटरैक्टिव चित्रमय आरेख'}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#24476B] mt-1.5 tracking-tight">
            {lang === 'en'
              ? 'See How We Use Diagrams, Shapes & Visual Models in Class'
              : 'देखिए हम कक्षा में चित्रों, आरेखों और आकारों से कैसे पढ़ाते हैं'}
          </h3>
          <p className="text-sm text-slate-600 mt-1.5">
            {lang === 'en'
              ? 'Children remember pictures 6x better than plain text. Click through our 4 classroom visual models below:'
              : 'बच्चे केवल शब्दों की तुलना में चित्रों और आरेखों से 6 गुना तेज़ी से सीखते हैं। नीचे दिए गए 4 आरेख देखें:'}
          </p>
        </div>

        {/* Diagram Selector Tabs */}
        <div
          role="tablist"
          aria-label="Visual Concept Diagrams"
          className="flex flex-wrap gap-2"
        >
          {tabs.map((t) => {
            const Icon = t.icon;
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#24476B] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon
                  className="w-4 h-4"
                  style={{ color: isSelected ? '#FFC845' : t.color }}
                />
                <span>{lang === 'en' ? t.labelEn : t.labelHi}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Visual Diagram Board */}
      <AnimatePresence mode="wait">
        {activeTab === 'cpa' && (
          <motion.div
            key="cpa"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Visual SVG Diagram of Concrete -> Pictorial -> Abstract */}
            <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-[#36A9E1]/30 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#36A9E1]">
                  {lang === 'en'
                    ? 'Visual Diagram: Understanding Fractions (3/4) Without Rote Memorisation'
                    : 'चित्रमय आरेख: बिना रटे भिन्न (3/4) को तीन चरणों में समझना'}
                </span>
                <span className="text-xs font-mono font-bold text-[#24476B] bg-[#F0F7FF] px-2.5 py-1 rounded-lg">
                  NCF-SE CPA Model
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Step 1: Concrete */}
                <div className="rounded-2xl bg-[#FFF8EB] border border-[#FFC845] p-4 text-center flex flex-col items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F47B45]">
                    {lang === 'en' ? '1. Concrete (Objects)' : '1. मूर्त (वास्तविक वस्तुएँ)'}
                  </span>
                  <svg viewBox="0 0 140 90" className="w-36 h-24 my-2">
                    {/* 4 Pizza/Roti Slices: 3 Coloured, 1 Dashed */}
                    <circle cx="70" cy="45" r="34" fill="#FFF" stroke="#24476B" strokeWidth="2.5" strokeDasharray="4 4" />
                    {/* Top-Left Quadrant */}
                    <path d="M70 45 L70 11 A34 34 0 0 0 36 45 Z" fill="#F47B45" stroke="#24476B" strokeWidth="2" />
                    {/* Bottom-Left Quadrant */}
                    <path d="M70 45 L36 45 A34 34 0 0 0 70 79 Z" fill="#FFC845" stroke="#24476B" strokeWidth="2" />
                    {/* Bottom-Right Quadrant */}
                    <path d="M70 45 L70 79 A34 34 0 0 0 104 45 Z" fill="#4CAF80" stroke="#24476B" strokeWidth="2" />
                    <circle cx="56" cy="32" r="3" fill="#FFF" />
                    <circle cx="56" cy="58" r="3" fill="#24476B" />
                    <circle cx="82" cy="58" r="3" fill="#FFF" />
                  </svg>
                  <p className="text-xs font-bold text-[#24476B]">
                    {lang === 'en'
                      ? 'Fold a paper circle into 4 equal parts & colour 3 parts'
                      : 'कागज के गोले को 4 बराबर भागों में मोड़कर 3 भाग रंगें'}
                  </p>
                </div>

                {/* Step 2: Pictorial */}
                <div className="rounded-2xl bg-[#F0F7FF] border border-[#36A9E1]/50 p-4 text-center flex flex-col items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#36A9E1]">
                    {lang === 'en' ? '2. Pictorial (Bar Model)' : '2. चित्र (बार मॉडल व संख्या रेखा)'}
                  </span>
                  <svg viewBox="0 0 160 90" className="w-40 h-24 my-2">
                    {/* Fraction Bar Model */}
                    <rect x="12" y="20" width="34" height="26" fill="#36A9E1" stroke="#24476B" strokeWidth="2" rx="4" />
                    <rect x="46" y="20" width="34" height="26" fill="#36A9E1" stroke="#24476B" strokeWidth="2" rx="4" />
                    <rect x="80" y="20" width="34" height="26" fill="#36A9E1" stroke="#24476B" strokeWidth="2" rx="4" />
                    <rect x="114" y="20" width="34" height="26" fill="#FFFFFF" stroke="#24476B" strokeWidth="2" strokeDasharray="3 3" rx="4" />
                    <text x="29" y="37" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">1/4</text>
                    <text x="63" y="37" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">1/4</text>
                    <text x="97" y="37" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">1/4</text>
                    {/* Number Line below */}
                    <line x1="12" y1="68" x2="148" y2="68" stroke="#24476B" strokeWidth="2" />
                    <circle cx="12" cy="68" r="3.5" fill="#24476B" />
                    <circle cx="46" cy="68" r="3" fill="#24476B" />
                    <circle cx="80" cy="68" r="3" fill="#24476B" />
                    <circle cx="114" cy="68" r="5" fill="#F47B45" stroke="#24476B" strokeWidth="1.5" />
                    <circle cx="148" cy="68" r="3.5" fill="#24476B" />
                    <text x="12" y="83" textAnchor="middle" fill="#24476B" fontSize="9" fontWeight="bold">0</text>
                    <text x="114" y="84" textAnchor="middle" fill="#F47B45" fontSize="10" fontWeight="bold">3/4</text>
                    <text x="148" y="83" textAnchor="middle" fill="#24476B" fontSize="9" fontWeight="bold">1</text>
                  </svg>
                  <p className="text-xs font-bold text-[#24476B]">
                    {lang === 'en'
                      ? 'Draw a 4-block bar model & mark 3/4 on the number line'
                      : '4-खंड का बार मॉडल बनाएँ और संख्या रेखा पर 3/4 दर्शाएँ'}
                  </p>
                </div>

                {/* Step 3: Abstract */}
                <div className="rounded-2xl bg-[#F4FBF7] border border-[#4CAF80]/50 p-4 text-center flex flex-col items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4CAF80]">
                    {lang === 'en' ? '3. Abstract (Symbols)' : '3. अमूर्त (गणितीय समीकरण)'}
                  </span>
                  <svg viewBox="0 0 150 90" className="w-36 h-24 my-2">
                    <rect x="10" y="14" width="130" height="62" rx="12" fill="#24476B" />
                    <text x="36" y="42" textAnchor="middle" fill="#FFC845" fontSize="18" fontWeight="bold">3</text>
                    <line x1="24" y1="48" x2="48" y2="48" stroke="#FFF" strokeWidth="2.5" />
                    <text x="36" y="66" textAnchor="middle" fill="#36A9E1" fontSize="18" fontWeight="bold">4</text>
                    <text x="64" y="53" textAnchor="middle" fill="#FFF" fontSize="16" fontWeight="bold">=</text>
                    <text x="104" y="46" textAnchor="middle" fill="#4CAF80" fontSize="15" fontWeight="bold">0.75</text>
                    <text x="104" y="64" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">(75%)</text>
                  </svg>
                  <p className="text-xs font-bold text-[#24476B]">
                    {lang === 'en'
                      ? 'Solve symbolic fractions, decimals & percentages with confidence'
                      : 'अंकों, दशमलव (0.75) और प्रतिशत के सवाल आत्मविश्वास से हल करें'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Photo & Explanation Card */}
            <div className="lg:col-span-4 rounded-3xl bg-[#24476B] text-white p-5 sm:p-6 flex flex-col justify-between shadow-md">
              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src={BRAND_ASSETS.studentWithBooks}
                  alt="Student learning with books"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#FFC845] bg-[#FFF8EB] shrink-0"
                />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFC845]">
                    {lang === 'en' ? 'Why It Works' : 'यह क्यों प्रभावी है'}
                  </span>
                  <h4 className="text-base font-extrabold text-white leading-snug">
                    {lang === 'en'
                      ? 'Zero Maths Fear from Class 1 to 8'
                      : 'कक्षा 1 से 8 तक गणित का डर समाप्त'}
                  </h4>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {lang === 'en'
                  ? 'When children see a fraction as a coloured bar before memorising rules, they never confuse numerators and denominators in word problems.'
                  : 'जब बच्चे नियम रटने से पहले भिन्न को रंगीन चित्र के रूप में देखते हैं, तो वे अंश और हर में कभी गलती नहीं करते।'}
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'phonics' && (
          <motion.div
            key="phonics"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-[#F47B45]/30 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#F47B45]">
                  {lang === 'en'
                    ? 'Visual Diagram: English Phonics Sound Blending & Hindi Matra Bridge'
                    : 'चित्रमय आरेख: अंग्रेजी फोनेटिक्स और हिंदी मात्रा ध्वनि जोड़'}
                </span>
                <span className="text-xs font-mono font-bold text-[#24476B] bg-[#FFF8EB] px-2.5 py-1 rounded-lg">
                  Vachan Praveen
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* English CVC Sound Blending Diagram */}
                <div className="rounded-2xl bg-[#FFF8EB] border border-[#FFC845] p-4">
                  <p className="text-xs font-extrabold text-[#F47B45] uppercase tracking-wider mb-3">
                    {lang === 'en' ? 'English Sound Blending' : 'अंग्रेजी ध्वनि जोड़ (Phonics)'}
                  </p>
                  <div className="flex items-center justify-center gap-2 my-3">
                    <div className="w-11 h-11 rounded-xl bg-white border-2 border-[#24476B] flex flex-col items-center justify-center shadow-2xs">
                      <span className="text-sm font-extrabold text-[#F47B45]">sh</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F47B45] mt-0.5" />
                    </div>
                    <span className="font-bold text-slate-400">+</span>
                    <div className="w-11 h-11 rounded-xl bg-white border-2 border-[#24476B] flex flex-col items-center justify-center shadow-2xs">
                      <span className="text-sm font-extrabold text-[#36A9E1]">i</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#36A9E1] mt-0.5" />
                    </div>
                    <span className="font-bold text-slate-400">+</span>
                    <div className="w-11 h-11 rounded-xl bg-white border-2 border-[#24476B] flex flex-col items-center justify-center shadow-2xs">
                      <span className="text-sm font-extrabold text-[#4CAF80]">p</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF80] mt-0.5" />
                    </div>
                    <span className="font-bold text-[#24476B]">=</span>
                    <div className="px-3.5 py-2 rounded-xl bg-[#24476B] text-white font-extrabold text-sm shadow-xs">
                      SHIP 🚢
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 text-center mt-2">
                    {lang === 'en'
                      ? 'Sound buttons under each letter train children to decode unfamiliar words aloud.'
                      : 'प्रत्येक अक्षर के नीचे ध्वनि बिंदु बच्चों को नए शब्द स्वयं पढ़ने में सक्षम बनाते हैं।'}
                  </p>
                </div>

                {/* Hindi Matra Visual Bridge Diagram */}
                <div className="rounded-2xl bg-[#F0F7FF] border border-[#36A9E1]/40 p-4">
                  <p className="text-xs font-extrabold text-[#36A9E1] uppercase tracking-wider mb-3">
                    {lang === 'en' ? 'Hindi Varnamala & Matra Wheel' : 'हिंदी वर्णमाला और मात्रा चक्र'}
                  </p>
                  <div className="flex items-center justify-center gap-2 my-3">
                    <div className="w-11 h-11 rounded-xl bg-white border-2 border-[#24476B] flex items-center justify-center font-extrabold text-base text-[#24476B]">
                      क
                    </div>
                    <span className="font-bold text-slate-400">+</span>
                    <div className="w-11 h-11 rounded-xl bg-[#FFC845]/30 border-2 border-[#F47B45] flex items-center justify-center font-extrabold text-base text-[#F47B45]">
                      ि
                    </div>
                    <span className="font-bold text-slate-400">+</span>
                    <div className="w-12 h-11 rounded-xl bg-white border-2 border-[#24476B] flex items-center justify-center font-extrabold text-sm text-[#36A9E1]">
                      ताब
                    </div>
                    <span className="font-bold text-[#24476B]">=</span>
                    <div className="px-3.5 py-2 rounded-xl bg-[#4CAF80] text-white font-extrabold text-sm shadow-xs">
                      किताब 📖
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 text-center mt-2">
                    {lang === 'en'
                      ? 'Visual colour-coding fixes chhoti-i (ि) and badi-ee (ी) spelling errors.'
                      : 'रंगीन मात्रा कार्ड से छोटी (ि) और बड़ी (ी) की वर्तनी अशुद्धियाँ तुरंत सुधरती हैं।'}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-3xl bg-[#FFF8EB] border-2 border-[#FFC845] p-5 sm:p-6 flex flex-col justify-between">
              <div className="flex items-center gap-3.5 mb-3">
                <img
                  src={BRAND_ASSETS.happyChildrenTeacher}
                  alt="Children reading aloud with teacher"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#F47B45] shrink-0"
                />
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F47B45]">
                    {lang === 'en' ? 'Daily Aloud Reading' : 'दैनिक सस्वर पठन'}
                  </span>
                  <h4 className="text-base font-extrabold text-[#24476B]">
                    {lang === 'en' ? 'Bilingual Reading Confidence' : 'दोनों भाषाओं में धाराप्रवाह पठन'}
                  </h4>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {lang === 'en'
                  ? 'Strong readers understand Science, EVS, and Maths word problems twice as fast.'
                  : 'जब बच्चा दोनों भाषाओं में धाराप्रवाह पढ़ता है, तो वह विज्ञान और गणित के प्रश्न भी आसानी से समझ लेता है।'}
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'science' && (
          <motion.div
            key="science"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-[#4CAF80]/40 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#4CAF80]">
                  {lang === 'en'
                    ? 'Visual Diagram: NCERT "Curiosity" Science Concept & Labelled Diagram'
                    : 'चित्रमय आरेख: NCERT विज्ञान नामांकित चित्र और कारण-प्रभाव चक्र'}
                </span>
                <span className="text-xs font-mono font-bold text-[#24476B] bg-[#F4FBF7] px-2.5 py-1 rounded-lg">
                  Classes 3 – 8
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-5 flex justify-center bg-[#F4FBF7] rounded-2xl p-4 border border-[#4CAF80]/30">
                  <svg viewBox="0 0 180 130" className="w-44 h-32">
                    {/* Sun */}
                    <circle cx="32" cy="28" r="14" fill="#FFC845" stroke="#F47B45" strokeWidth="2" />
                    <line x1="48" y1="36" x2="74" y2="52" stroke="#F47B45" strokeWidth="2" strokeDasharray="3 3" />
                    {/* Plant Stem & Leaf */}
                    <path d="M95 110 L95 45" stroke="#4CAF80" strokeWidth="5" strokeLinecap="round" />
                    <path d="M95 75 C120 65 130 80 95 88 Z" fill="#4CAF80" stroke="#24476B" strokeWidth="1.5" />
                    <path d="M95 62 C70 52 60 68 95 75 Z" fill="#4CAF80" stroke="#24476B" strokeWidth="1.5" />
                    {/* Flower top */}
                    <circle cx="95" cy="38" r="10" fill="#F47B45" stroke="#24476B" strokeWidth="1.5" />
                    <circle cx="95" cy="38" r="4" fill="#FFC845" />
                    {/* Soil & Roots */}
                    <line x1="55" y1="110" x2="135" y2="110" stroke="#24476B" strokeWidth="2.5" />
                    <path d="M95 110 L82 124 M95 110 L108 124 M95 110 L95 126" stroke="#24476B" strokeWidth="2" />
                    {/* Labels */}
                    <text x="28" y="56" fontSize="9" fontWeight="bold" fill="#F47B45">Sunlight</text>
                    <text x="135" y="72" fontSize="9" fontWeight="bold" fill="#4CAF80">O₂ ↑</text>
                    <text x="45" y="96" fontSize="9" fontWeight="bold" fill="#36A9E1">H₂O + CO₂</text>
                  </svg>
                </div>

                <div className="sm:col-span-7 space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-extrabold text-[#24476B]">
                      {lang === 'en'
                        ? 'Step 1: Draw & Label Every Concept'
                        : 'चरण 1: प्रत्येक अवधारणा का नामांकित चित्र बनाना'}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {lang === 'en'
                        ? 'Students learn to sketch clean, labelled diagrams for Photosynthesis, Electric Circuits, Human Digestive System, and Water Cycle.'
                        : 'छात्र प्रकाश-संश्लेषण, विद्युत परिपथ, पाचन तंत्र और जल चक्र के स्पष्ट नामांकित चित्र बनाना सीखते हैं।'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-extrabold text-[#4CAF80]">
                      {lang === 'en'
                        ? 'Step 2: Point-Wise Scientific Answer Writing'
                        : 'चरण 2: बिंदु-वार वैज्ञानिक उत्तर लेखन'}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {lang === 'en'
                        ? 'Converting visual flowcharts into structured 3-mark and 5-mark CBSE school exam answers.'
                        : 'चित्रमय फ्लोचार्ट की मदद से स्कूल परीक्षा के 3 और 5 अंकों के व्यवस्थित उत्तर लिखना।'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-3xl bg-[#24476B] text-white p-5 sm:p-6 flex flex-col justify-between">
              <div className="flex items-center gap-3.5 mb-3">
                <img
                  src={BRAND_ASSETS.attentiveGirlsWriting}
                  alt="Students taking science notes"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#4CAF80] shrink-0"
                />
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FFC845]">
                    {lang === 'en' ? 'Diagram Mastery' : 'चित्र और प्रयोग'}
                  </span>
                  <h4 className="text-base font-extrabold text-white">
                    {lang === 'en' ? 'Visual Notes & Flowcharts' : 'विजुअल नोट्स और फ्लोचार्ट'}
                  </h4>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {lang === 'en'
                  ? 'CBSE examiners award full marks when middle school students support their Science and Geography answers with neat diagrams.'
                  : 'जब छात्र विज्ञान और भूगोल के उत्तरों के साथ साफ नामांकित चित्र बनाते हैं, तो परीक्षा में पूरे अंक प्राप्त होते हैं।'}
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'geometry' && (
          <motion.div
            key="geometry"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-[#24476B]/25 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#24476B]">
                  {lang === 'en'
                    ? 'Visual Diagram: Geometry Angles, Area Models & Algebraic Balance'
                    : 'चित्रमय आरेख: ज्यामिति कोण, क्षेत्रफल मॉडल और बीजगणित संतुलन'}
                </span>
                <span className="text-xs font-mono font-bold text-[#F47B45] bg-[#FFF8EB] px-2.5 py-1 rounded-lg">
                  Ganita Prakash (6–8)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#F0F7FF] border border-[#36A9E1]/40 p-4 flex items-center gap-4">
                  <svg viewBox="0 0 110 95" className="w-28 h-24 shrink-0">
                    <polygon points="15,80 95,80 15,20" fill="#36A9E1" fillOpacity="0.2" stroke="#24476B" strokeWidth="2.5" />
                    <rect x="15" y="68" width="12" height="12" fill="none" stroke="#F47B45" strokeWidth="2" />
                    <path d="M72 80 A23 23 0 0 1 78 67" fill="none" stroke="#4CAF80" strokeWidth="2.5" />
                    <text x="55" y="92" fontSize="10" fontWeight="bold" fill="#24476B" textAnchor="middle">b = 8 cm</text>
                    <text x="6" y="52" fontSize="10" fontWeight="bold" fill="#F47B45">h=6</text>
                    <text x="64" y="45" fontSize="10" fontWeight="bold" fill="#24476B">c = 10</text>
                  </svg>
                  <div>
                    <p className="text-xs font-extrabold text-[#24476B]">
                      {lang === 'en' ? 'Visual Mensuration & Pythagoras' : 'क्षेत्रमिति और पाइथागोरस प्रमेय'}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {lang === 'en'
                        ? 'Seeing why Area of a Triangle = ½ × base × height (half of a rectangle!).'
                        : 'चित्र से समझना कि त्रिभुज का क्षेत्रफल आयत का ठीक आधा (½ × आधार × ऊँचाई) क्यों होता है।'}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#FFF8EB] border border-[#FFC845] p-4 flex items-center gap-4">
                  <svg viewBox="0 0 110 95" className="w-28 h-24 shrink-0">
                    {/* Balance Scale for Linear Equation 2x + 3 = 11 */}
                    <polygon points="55,65 43,85 67,85" fill="#24476B" />
                    <line x1="18" y1="65" x2="92" y2="65" stroke="#24476B" strokeWidth="3" />
                    <rect x="20" y="43" width="28" height="20" rx="4" fill="#F47B45" stroke="#24476B" strokeWidth="2" />
                    <text x="34" y="57" fontSize="10" fontWeight="bold" fill="#FFF" textAnchor="middle">2x + 3</text>
                    <rect x="64" y="43" width="26" height="20" rx="4" fill="#4CAF80" stroke="#24476B" strokeWidth="2" />
                    <text x="77" y="57" fontSize="11" fontWeight="bold" fill="#FFF" textAnchor="middle">11</text>
                    <text x="55" y="28" fontSize="11" fontWeight="bold" fill="#24476B" textAnchor="middle">LHS = RHS</text>
                  </svg>
                  <div>
                    <p className="text-xs font-extrabold text-[#24476B]">
                      {lang === 'en' ? 'Algebraic Balance Beam' : 'बीजगणित तराजू मॉडल (LHS = RHS)'}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {lang === 'en'
                        ? 'Solving linear equations like a balanced beam so sign errors (+ / −) disappear.'
                        : 'रेखीय समीकरणों को तराजू के संतुलन की तरह हल करना ताकि चिह्नों (+ / −) की गलती न हो।'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-3xl bg-[#24476B] text-white p-5 sm:p-6 flex flex-col justify-between">
              <div className="flex items-center gap-3.5 mb-3">
                <img
                  src={BRAND_ASSETS.confidentStudentGirl}
                  alt="Confident middle school student"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#FFC845] bg-white shrink-0"
                />
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FFC845]">
                    {lang === 'en' ? 'Classes 6 to 8' : 'कक्षा 6 से 8'}
                  </span>
                  <h4 className="text-base font-extrabold text-white">
                    {lang === 'en' ? 'Strong High-School Base' : 'उच्च कक्षाओं के लिए मजबूत आधार'}
                  </h4>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {lang === 'en'
                  ? 'Hands-on geometry construction with compass, protractor, and step-by-step algebra verification.'
                  : 'परकार और चाँदे के साथ ज्यामिति रचना और चरण-दर-चरण बीजगणित सत्यापन।'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ============================================================================
   3. CORAL-ORANGE & ROYAL-NAVY VISUAL SPLIT BANNER WITH 3D ILLUSTRATION
      (Inspired by Edukids Split Card + Uploaded 3D Educational Globe Asset)
============================================================================ */
export const OrangeNavyVisualSplitBanner: React.FC<{
  lang: Language;
  onNavigate: (page: PageId) => void;
}> = ({ lang, onNavigate }) => {
  return (
    <div className="rounded-[2.2rem] overflow-hidden shadow-xl border-2 border-white grid grid-cols-1 lg:grid-cols-12">
      {/* Left Coral-Orange Photographic Side (6 cols) */}
      <div className="lg:col-span-6 bg-gradient-to-br from-[#F47B45] via-[#F78D5C] to-[#FFC845] p-6 sm:p-9 text-white relative overflow-hidden flex flex-col justify-between">
        <div className="relative z-10 space-y-3">
          <span className="inline-block px-3 py-1 rounded-lg bg-white/20 backdrop-blur-xs text-xs font-extrabold uppercase tracking-wider text-white">
            {lang === 'en'
              ? 'Joyful & Fear-Free Classroom'
              : 'आनंदमय और भय-मुक्त कक्षा वातावरण'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            {lang === 'en'
              ? 'Where Every Child Raises Their Hand With Confidence'
              : 'जहाँ हर बच्चा पूरे आत्मविश्वास के साथ सवाल पूछता है'}
          </h3>
          <p className="text-sm text-white/95 leading-relaxed">
            {lang === 'en'
              ? 'In our small 15–20 student batches in Gupta Park, Najafgarh, children learn through guided worksheets, mental maths sprints, and aloud reading.'
              : 'गुप्ता पार्क, नजफगढ़ के हमारे छोटे बैचों (15–20 छात्र) में बच्चे वर्कशीट, मानसिक गणित और सस्वर पठन से सीखते हैं।'}
          </p>
        </div>

        {/* Overlapping Authentic Student & Classroom Photos */}
        <div className="relative z-10 mt-6 grid grid-cols-2 gap-3.5 items-center">
          <div className="rounded-2xl overflow-hidden border-3 border-white shadow-lg bg-white">
            <img
              src={BRAND_ASSETS.confidentStudentGirl}
              alt="Confident Aarohan student"
              className="w-full h-40 object-cover object-top"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border-3 border-white shadow-lg bg-white">
            <img
              src={BRAND_ASSETS.classroomDesksChalkboard}
              alt="Focused students writing in notebooks"
              className="w-full h-40 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Right Deep Royal Navy 3D Illustration Side (6 cols) */}
      <div className="lg:col-span-6 bg-[#061A6E] p-6 sm:p-9 text-white relative overflow-hidden flex flex-col justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center relative z-10">
          <div className="sm:col-span-6 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFC845]">
              {lang === 'en'
                ? '30 Free Printable Sheets'
                : '30 निःशुल्क अभ्यास वर्कशीट'}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
              {lang === 'en'
                ? 'Interactive Worksheets, Brain Puzzles & Monthly Growth Notes'
                : 'अभ्यास वर्कशीट, दिमागी पहेलियाँ और मासिक ग्रोथ रिपोर्ट'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {lang === 'en'
                ? 'Explore our digital Learning Library with 30 A4 printable worksheets and weekly Ganit Gati logic challenges.'
                : 'हमारी डिजिटल लाइब्रेरी में नर्सरी से कक्षा 8 के लिए 30 A4 वर्कशीट और साप्ताहिक पहेलियाँ उपलब्ध हैं।'}
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onNavigate('library');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 bg-[#FFC845] hover:bg-[#f5b82e] text-[#24476B] font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>{lang === 'en' ? 'Open Worksheet Library' : 'वर्कशीट लाइब्रेरी खोलें'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Supplied 3D Educational Globe, Blocks, Trophy & Calculator Illustration */}
          <div className="sm:col-span-6 flex justify-center">
            <img
              src={BRAND_ASSETS.educational3DIllustration}
              alt="3D Educational Globe, ABC Blocks, Calculator and Trophy"
              className="w-full max-w-[260px] h-auto object-contain rounded-2xl animate-float-slow"
              loading="lazy"
            />
          </div>
        </div>

        {/* Bottom quick badges */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-200">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4CAF80]" />
            {lang === 'en' ? 'English & Hindi Bilingual' : 'द्विभाषी (English + हिंदी)'}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#FFC845]" />
            {lang === 'en' ? 'NCERT 2026–27 Aligned' : 'NCERT 2026–27 के अनुरूप'}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   4. STEP VISUAL DIAGRAM BADGE (FOR THE 4-STEP LEARNING APPROACH CARDS)
============================================================================ */
export const StepVisualDiagramBadge: React.FC<{ stepNumber: string }> = ({
  stepNumber,
}) => {
  if (stepNumber === '01') {
    // Understand: Visual Bulb + Abacus Beads Diagram
    return (
      <svg viewBox="0 0 120 64" className="w-28 h-16">
        <rect x="4" y="6" width="112" height="52" rx="12" fill="#FFF8EB" stroke="#FFC845" strokeWidth="1.5" />
        <circle cx="30" cy="32" r="14" fill="#FFC845" stroke="#24476B" strokeWidth="2" />
        <path d="M26 46 L34 46 M28 50 L32 50" stroke="#24476B" strokeWidth="2" strokeLinecap="round" />
        <line x1="56" y1="22" x2="104" y2="22" stroke="#24476B" strokeWidth="2" />
        <circle cx="66" cy="22" r="5" fill="#F47B45" stroke="#24476B" strokeWidth="1.5" />
        <circle cx="80" cy="22" r="5" fill="#36A9E1" stroke="#24476B" strokeWidth="1.5" />
        <line x1="56" y1="42" x2="104" y2="42" stroke="#24476B" strokeWidth="2" />
        <circle cx="72" cy="42" r="5" fill="#4CAF80" stroke="#24476B" strokeWidth="1.5" />
        <circle cx="88" cy="42" r="5" fill="#FFC845" stroke="#24476B" strokeWidth="1.5" />
      </svg>
    );
  }
  if (stepNumber === '02') {
    // Practise: A4 Worksheet + Pencil Trace Diagram
    return (
      <svg viewBox="0 0 120 64" className="w-28 h-16">
        <rect x="4" y="6" width="112" height="52" rx="12" fill="#F0F7FF" stroke="#36A9E1" strokeWidth="1.5" strokeOpacity="0.5" />
        <rect x="20" y="12" width="46" height="40" rx="5" fill="#FFF" stroke="#24476B" strokeWidth="2" />
        <line x1="27" y1="22" x2="56" y2="22" stroke="#36A9E1" strokeWidth="2" />
        <line x1="27" y1="30" x2="52" y2="30" stroke="#94A3B8" strokeWidth="2" />
        <line x1="27" y1="38" x2="48" y2="38" stroke="#94A3B8" strokeWidth="2" />
        <path d="M74 44 L96 16 L104 22 L82 50 L72 52 Z" fill="#FFC845" stroke="#24476B" strokeWidth="2" />
      </svg>
    );
  }
  if (stepNumber === '03') {
    // Review: Magnifying Glass + Diagnostic Checkmark Diagram
    return (
      <svg viewBox="0 0 120 64" className="w-28 h-16">
        <rect x="4" y="6" width="112" height="52" rx="12" fill="#F4FBF7" stroke="#4CAF80" strokeWidth="1.5" strokeOpacity="0.5" />
        <circle cx="48" cy="30" r="15" fill="#FFF" stroke="#24476B" strokeWidth="2.5" />
        <path d="M42 30 L46 34 L55 25" fill="none" stroke="#4CAF80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="59" y1="41" x2="72" y2="52" stroke="#F47B45" strokeWidth="4" strokeLinecap="round" />
        <circle cx="90" cy="24" r="6" fill="#FFC845" />
        <circle cx="94" cy="42" r="4" fill="#36A9E1" />
      </svg>
    );
  }
  // 04 Grow: Ascending Bar Graph + Star Badge Diagram
  return (
    <svg viewBox="0 0 120 64" className="w-28 h-16">
      <rect x="4" y="6" width="112" height="52" rx="12" fill="#FFF8EB" stroke="#F47B45" strokeWidth="1.5" strokeOpacity="0.5" />
      <rect x="24" y="38" width="12" height="14" rx="2" fill="#36A9E1" stroke="#24476B" strokeWidth="1.5" />
      <rect x="44" y="28" width="12" height="24" rx="2" fill="#FFC845" stroke="#24476B" strokeWidth="1.5" />
      <rect x="64" y="16" width="12" height="36" rx="2" fill="#4CAF80" stroke="#24476B" strokeWidth="1.5" />
      <path d="M24 32 L48 22 L70 12" fill="none" stroke="#F47B45" strokeWidth="2.5" strokeDasharray="3 3" />
      <circle cx="94" cy="26" r="10" fill="#F47B45" stroke="#24476B" strokeWidth="1.5" />
      <text x="94" y="30" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="bold">★</text>
    </svg>
  );
};

/* ============================================================================
   5. SUBJECT VISUAL DIAGRAM HEADER (FOR SUBJECT CARDS ON HOME & SUBJECTS PAGE)
============================================================================ */
export const SubjectVisualDiagramBanner: React.FC<{ subjectId: string }> = ({
  subjectId,
}) => {
  switch (subjectId) {
    case 'english':
      return (
        <div className="h-28 rounded-2xl bg-gradient-to-r from-[#F0F7FF] to-[#E0F2FE] border border-[#36A9E1]/30 px-4 flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-white border-2 border-[#24476B] flex items-center justify-center font-extrabold text-[#36A9E1] shadow-2xs">
              Aa
            </span>
            <span className="w-10 h-10 rounded-xl bg-[#FFC845] border-2 border-[#24476B] flex items-center justify-center font-extrabold text-[#24476B] shadow-2xs">
              Bb
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#24476B] text-white text-xs font-bold">
              Phonics + Grammar
            </span>
          </div>
          <img
            src={BRAND_ASSETS.studentWithBooks}
            alt="English Reading"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-sm"
            loading="lazy"
          />
        </div>
      );
    case 'hindi':
      return (
        <div className="h-28 rounded-2xl bg-gradient-to-r from-[#FFF8EB] to-[#FEF3C7] border border-[#F47B45]/30 px-4 flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-white border-2 border-[#24476B] flex items-center justify-center font-extrabold text-[#F47B45] shadow-2xs text-lg">
              अ
            </span>
            <span className="w-10 h-10 rounded-xl bg-[#F47B45] border-2 border-[#24476B] flex items-center justify-center font-extrabold text-white shadow-2xs text-lg">
              आ
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#24476B] text-white text-xs font-bold">
              मात्रा एवं व्याकरण
            </span>
          </div>
          <img
            src={BRAND_ASSETS.happyChildrenTeacher}
            alt="Hindi Reading & Writing"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-sm"
            loading="lazy"
          />
        </div>
      );
    case 'mathematics':
      return (
        <div className="h-28 rounded-2xl bg-gradient-to-r from-[#F4FBF7] to-[#DCFCE7] border border-[#4CAF80]/30 px-4 flex items-center justify-between overflow-hidden">
          <svg viewBox="0 0 130 60" className="w-32 h-16">
            <polygon points="10,50 55,50 32,12" fill="#FFC845" stroke="#24476B" strokeWidth="2" />
            <rect x="65" y="16" width="26" height="34" fill="#36A9E1" stroke="#24476B" strokeWidth="2" rx="3" />
            <text x="108" y="38" fontSize="16" fontWeight="bold" fill="#24476B">¾</text>
          </svg>
          <img
            src={BRAND_ASSETS.realClassroomFloor}
            alt="Mathematics Practice"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-sm"
            loading="lazy"
          />
        </div>
      );
    case 'evs':
      return (
        <div className="h-28 rounded-2xl bg-gradient-to-r from-[#FFFDF2] to-[#FEF9C3] border border-[#FFC845]/60 px-4 flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-2">
            <Globe className="w-9 h-9 text-[#4CAF80]" />
            <span className="px-2.5 py-1 rounded-lg bg-[#4CAF80] text-white text-xs font-bold">
              Nature & Society
            </span>
          </div>
          <img
            src={BRAND_ASSETS.educational3DIllustration}
            alt="EVS Our Wondrous World"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-sm"
            loading="lazy"
          />
        </div>
      );
    case 'science':
      return (
        <div className="h-28 rounded-2xl bg-gradient-to-r from-[#F0F7FF] to-[#EDE9FE] border border-[#24476B]/25 px-4 flex items-center justify-between overflow-hidden">
          <svg viewBox="0 0 120 60" className="w-28 h-16">
            <ellipse cx="40" cy="30" rx="28" ry="11" transform="rotate(28 40 30)" fill="none" stroke="#36A9E1" strokeWidth="2" />
            <ellipse cx="40" cy="30" rx="28" ry="11" transform="rotate(-28 40 30)" fill="none" stroke="#F47B45" strokeWidth="2" />
            <circle cx="40" cy="30" r="5" fill="#FFC845" stroke="#24476B" strokeWidth="1.5" />
            <text x="80" y="35" fontSize="11" fontWeight="bold" fill="#24476B">Curiosity</text>
          </svg>
          <img
            src={BRAND_ASSETS.attentiveGirlsWriting}
            alt="Science Observation"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-sm"
            loading="lazy"
          />
        </div>
      );
    default:
      return (
        <div className="h-28 rounded-2xl bg-gradient-to-r from-[#FFF8EB] to-[#FFEDD5] border border-[#F47B45]/30 px-4 flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-2">
            <Compass className="w-9 h-9 text-[#F47B45]" />
            <span className="px-2.5 py-1 rounded-lg bg-[#24476B] text-white text-xs font-bold">
              Maps, Civics & History
            </span>
          </div>
          <img
            src={BRAND_ASSETS.classroomDesksChalkboard}
            alt="Social Science & Maps"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-sm"
            loading="lazy"
          />
        </div>
      );
  }
};
