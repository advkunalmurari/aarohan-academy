import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Eye,
  Search,
  Calendar,
} from 'lucide-react';
import {
  Language,
  PageId,
  LibraryResource,
  LibraryFilterState,
  filterLibraryResources,
  buildWhatsAppUrl,
  buildGoogleMapsDirectionsUrl,
  ACADEMY_PHONE_DISPLAY,
} from '../utils/academyLogic';
import {
  BRAND_ASSETS,
  TRUST_HIGHLIGHTS,
  WHY_AAROHAN_REASONS,
  LEARNING_APPROACH_STEPS,
  GROWTH_JOURNEY_STAGES,
  SUBJECT_DETAILS,
  ENRICHMENT_PROGRAMMES,
  LEARNING_ACTIVITIES_SHOWCASE,
  GALLERY_PHOTOS,
  PARENT_CORNER_ARTICLES,
  FAQ_ITEMS,
  ArticleItem,
} from '../data/academyData';
import { LIBRARY_RESOURCES } from '../data/libraryResourcesData';
import { GrowthReportPreview } from './GrowthReportPreview';
import { EnquiryFormSection } from './EnquiryFormSection';
import { ParentTestimonialsSection } from './ParentTestimonialsSection';
import {
  HeroCreativeBackdrop,
  RotatingAcademyStamp,
  SectionDoodleBackdrop,
} from './CreativeBackground';
import {
  NurturingYoungMindsStrip,
  InteractiveConceptDiagramsSection,
  OrangeNavyVisualSplitBanner,
  StepVisualDiagramBadge,
  SubjectVisualDiagramBanner,
} from './EducationalDiagramsAndVisuals';

interface HomeViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenWorksheet: (resource: LibraryResource) => void;
  onOpenArticle: (article: ArticleItem) => void;
}

const HERO_STAGE_SPOTLIGHTS = [
  {
    id: 'early',
    badgeEn: 'Nursery · LKG · UKG',
    badgeHi: 'नर्सरी · LKG · UKG',
    stageNameEn: 'Aarambh (Ages 3–6)',
    stageNameHi: 'आरंभ (आयु 3–6 वर्ष)',
    focusEn: 'Playful Phonics, Swar-Vyanjan stories, pre-writing pencil grip & object counting (1–50).',
    focusHi: 'खेल-आधारित फोनेटिक्स, स्वर-व्यंजन कहानियाँ, पेंसिल पकड़ और वस्तुओं से गिनती (1–50)।',
    color: '#F47B45',
    bgTint: '#FFF8EB',
    targetPage: 'prog-early' as PageId,
  },
  {
    id: 'primary-1-2',
    badgeEn: 'Classes 1 – 2',
    badgeHi: 'कक्षा 1 – 2',
    stageNameEn: 'Aadhar Early Primary (Ages 6–8)',
    stageNameHi: 'आधार प्रारंभिक प्राइमरी (आयु 6–8)',
    focusEn: 'Sentence reading fluency, Hindi matras mastery, neat handwriting & place-value maths.',
    focusHi: 'धाराप्रवाह वाक्य पठन, हिंदी मात्राओं का अभ्यास, सुंदर लिखावट और स्थानीय मान गणित।',
    color: '#4CAF80',
    bgTint: '#F4FBF7',
    targetPage: 'prog-primary-1-2' as PageId,
  },
  {
    id: 'primary-3-5',
    badgeEn: 'Classes 3 – 5',
    badgeHi: 'कक्षा 3 – 5',
    stageNameEn: 'Aadhar Preparatory (Ages 8–11)',
    stageNameHi: 'आधार प्राइमरी (आयु 8–11)',
    focusEn: 'Grammar in context, fractions & decimals with visual CPA models, EVS & word problems.',
    focusHi: 'व्यावहारिक व्याकरण, चित्र-आधारित भिन्न व दशमलव, पर्यावरण अध्ययन (EVS) और इबारती सवाल।',
    color: '#36A9E1',
    bgTint: '#F0F7FF',
    targetPage: 'prog-primary-3-5' as PageId,
  },
  {
    id: 'middle-6-8',
    badgeEn: 'Classes 6 – 8',
    badgeHi: 'कक्षा 6 – 8',
    stageNameEn: 'Aagey Middle School (Ages 11–14)',
    stageNameHi: 'आगे मिडिल स्कूल (आयु 11–14)',
    focusEn: 'NCERT Ganita Prakash (Algebra & Geometry), Curiosity Science concepts & exam writing.',
    focusHi: 'NCERT गणित प्रकाश (बीजगणित व ज्यामिति), विज्ञान अवधारणाएँ और व्यवस्थित परीक्षा उत्तर लेखन।',
    color: '#24476B',
    bgTint: '#F1F5F9',
    targetPage: 'prog-middle-6-8' as PageId,
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  lang,
  onNavigate,
  onOpenWorksheet,
  onOpenArticle,
}) => {
  const [libraryFilter, setLibraryFilter] = useState<LibraryFilterState>({
    classFilter: 'All',
    subjectFilter: 'All',
    topicFilter: 'All',
    difficultyFilter: 'All',
    searchQuery: '',
  });
  const [openFaqId, setOpenFaqId] = useState<string>('faq-classes');
  const [activeHeroStageId, setActiveHeroStageId] = useState<string>('early');
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeHeroStage =
    HERO_STAGE_SPOTLIGHTS.find((s) => s.id === activeHeroStageId) || HERO_STAGE_SPOTLIGHTS[0];

  const filteredPreviewResources = filterLibraryResources(LIBRARY_RESOURCES, libraryFilter).slice(
    0,
    6
  );

  const goToPage = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: normX, y: normY });
  };

  return (
    <div className="space-y-0">
      {/* =====================================================================
          SECTION 1: HERO SECTION (WITH CREATIVE ANIMATED BACKGROUND)
      ===================================================================== */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
        className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#24476B]/10"
      >
        {/* Multi-layered Aurora, Notebook Grid & Mouse-Parallax Vector Doodles */}
        <HeroCreativeBackdrop mouseOffset={mouseOffset} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed editorial metadata line */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-bold tracking-wide text-[#24476B]">
                <span className="text-[#F47B45] uppercase tracking-wider">
                  {lang === 'en' ? 'Najafgarh, Delhi' : 'नजफगढ़, दिल्ली'}
                </span>
                <span className="text-slate-300">·</span>
                <span>
                  {lang === 'en'
                    ? 'Nursery to Class 8 (CBSE Curriculum Support)'
                    : 'नर्सरी से कक्षा 8 (CBSE पाठ्यक्रम सहयोग)'}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-[#4CAF80]">
                  {lang === 'en' ? 'Learn • Grow • Shine' : 'सीखें • बढ़ें • चमकें'}
                </span>
              </div>

              {/* Expressive Hero Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-bold text-[#24476B] tracking-tight leading-[1.15]">
                  {lang === 'en' ? (
                    <>
                      Small Batches.{' '}
                      <span className="text-[#36A9E1]">Strong Foundations.</span>{' '}
                      Brighter Futures.
                    </>
                  ) : (
                    <>
                      छोटे बैच।{' '}
                      <span className="text-[#36A9E1]">मजबूत नींव।</span>{' '}
                      उज्ज्वल भविष्य।
                    </>
                  )}
                </h1>
                {/* Secondary bilingual tagline */}
                <p className="text-sm sm:text-base font-bold text-[#F47B45]">
                  {lang === 'en'
                    ? 'छोटे बैच। मजबूत नींव। उज्ज्वल भविष्य। — सीखें • बढ़ें • चमकें'
                    : 'Small Batches. Strong Foundations. Brighter Futures. — Learn • Grow • Shine'}
                </p>
              </div>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
                {lang === 'en'
                  ? 'Personalised supplementary tuition and foundational learning support for Nursery to Class 8 in Gupta Park, Todarmal Colony, Najafgarh. Helping children build strong concepts, reading fluency, mathematical confidence and steady academic growth.'
                  : 'गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़ में नर्सरी से कक्षा 8 के बच्चों के लिए व्यक्तिगत ट्यूशन और फाउंडेशनल शिक्षण सहयोग। हम बच्चों में मजबूत अवधारणाएँ, धाराप्रवाह पठन, गणितीय आत्मविश्वास और निरंतर शैक्षणिक विकास का निर्माण करते हैं।'}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => goToPage('admissions')}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#24476B] hover:bg-[#1b3652] text-white font-bold px-7 py-4 rounded-2xl shadow-lg shadow-[#24476B]/15 transition-all cursor-pointer text-base"
                >
                  <Calendar className="w-5 h-5 text-[#FFC845]" />
                  <span>
                    {lang === 'en'
                      ? 'Book a Learning Assessment'
                      : 'प्रारंभिक मूल्यांकन बुक करें'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-6 py-4 rounded-2xl shadow-md transition-all text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>
                    {lang === 'en' ? 'Chat on WhatsApp' : 'व्हाट्सऐप पर बात करें'}
                  </span>
                </a>
              </div>

              {/* Interactive Hero Class-Stage Live Explorer */}
              <div className="rounded-2xl bg-white/85 backdrop-blur-md border border-[#24476B]/12 p-3.5 sm:p-4 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-extrabold text-[#24476B]">
                    {lang === 'en'
                      ? "Interactive Preview — Select Your Child's Class:"
                      : 'इंटरैक्टिव झलक — अपने बच्चे की कक्षा चुनें:'}
                  </span>
                  <div
                    role="group"
                    aria-label="Select student class stage preview"
                    className="flex flex-wrap items-center gap-1.5"
                  >
                    {HERO_STAGE_SPOTLIGHTS.map((st) => {
                      const isSelected = st.id === activeHeroStage.id;
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setActiveHeroStageId(st.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                            isSelected
                              ? 'bg-[#24476B] text-white shadow-xs'
                              : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80'
                          }`}
                        >
                          {lang === 'en' ? st.badgeEn : st.badgeHi}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroStage.id}
                    initial={{ opacity: 0.75, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0.75, y: -4 }}
                    transition={{ duration: 0.16 }}
                    className="rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-200/70"
                    style={{ backgroundColor: activeHeroStage.bgTint }}
                  >
                    <div className="space-y-0.5">
                      <p
                        className="text-xs font-extrabold"
                        style={{ color: activeHeroStage.color }}
                      >
                        {lang === 'en' ? activeHeroStage.stageNameEn : activeHeroStage.stageNameHi}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                        {lang === 'en' ? activeHeroStage.focusEn : activeHeroStage.focusHi}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToPage(activeHeroStage.targetPage)}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#24476B] hover:text-[#F47B45] shrink-0 whitespace-nowrap cursor-pointer"
                    >
                      <span>{lang === 'en' ? 'View Syllabus' : 'पाठ्यक्रम देखें'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Quick Neighbourhood Location & Direct Call Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-700 border-t border-[#24476B]/10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F47B45] shrink-0" />
                  <span className="font-medium">
                    {lang === 'en'
                      ? 'H.No. 49B, Gupta Park, Todarmal Colony, Najafgarh'
                      : 'मकान नं. 49B, गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़'}
                  </span>
                </div>
                <a
                  href="tel:+919220357826"
                  className="inline-flex items-center gap-1.5 font-bold text-[#24476B] hover:text-[#36A9E1]"
                >
                  <Phone className="w-4 h-4 text-[#36A9E1]" />
                  <span>{ACADEMY_PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>

            {/* Right Visual Collage Column (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none pt-3 pb-4">
                {/* Creative Offset Geometric Backdrop Shapes (inspired by BOO & Edukids references) */}
                <div
                  aria-hidden="true"
                  className="absolute -top-3 -right-3 w-full h-[82%] rounded-[2.2rem] bg-gradient-to-br from-[#FFC845] via-[#F47B45]/85 to-[#36A9E1] rotate-2 opacity-90 shadow-lg"
                />
                <div
                  aria-hidden="true"
                  className="absolute top-4 -left-3 w-full h-[80%] rounded-[2.2rem] border-2 border-dashed border-[#24476B]/25 -rotate-2"
                />

                {/* Rotating Circular Academy Seal Badge (Top-Left Corner Overlay) */}
                <div className="absolute -top-6 -left-4 sm:-left-6 z-20">
                  <RotatingAcademyStamp />
                </div>

                {/* Main Authentic Classroom Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white"
                >
                  <img
                    src={BRAND_ASSETS.happyChildrenTeacher}
                    alt={
                      lang === 'en'
                        ? 'Joyful children learning at Aarohan Academy in Najafgarh'
                        : 'आरोहण अकैडमी नजफगढ़ में सीखते हुए उत्साहित बच्चे'
                    }
                    width={640}
                    height={360}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                  <div className="p-4 sm:p-5 bg-white">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#36A9E1]">
                          {lang === 'en'
                            ? 'Neighbourhood Learning Space'
                            : 'आपकी कॉलोनी का विश्वसनीय शिक्षण केंद्र'}
                        </p>
                        <p className="text-sm sm:text-base font-extrabold text-[#24476B] mt-0.5">
                          {lang === 'en'
                            ? 'Capped at 15–20 Students Per Batch'
                            : 'प्रति बैच केवल 15–20 विद्यार्थियों की सीमित संख्या'}
                        </p>
                      </div>
                      <img
                        src={BRAND_ASSETS.logo}
                        alt="Aarohan Academy Logo"
                        className="w-12 h-12 object-contain shrink-0"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Secondary Authentic Classroom Thumbnail + Floating Skill Badges */}
                <div className="relative z-10 mt-4 grid grid-cols-2 gap-3.5">
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="bg-white/95 backdrop-blur-xs rounded-2xl p-3.5 border border-slate-200/90 shadow-md flex items-center gap-3"
                  >
                    <img
                      src={BRAND_ASSETS.realClassroomFloor}
                      alt={
                        lang === 'en'
                          ? 'Students writing in notebooks during guided practice'
                          : 'निर्देशित अभ्यास के दौरान कॉपी में लिखते विद्यार्थी'
                      }
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <p className="text-xs font-extrabold text-[#24476B]">
                        {lang === 'en' ? 'Guided Practice' : 'निर्देशित अभ्यास'}
                      </p>
                      <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                        {lang === 'en'
                          ? 'Daily notebook & concept checks'
                          : 'दैनिक कॉपी और अवधारणा जाँच'}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="bg-[#24476B] text-white rounded-2xl p-3.5 shadow-md flex items-center gap-3 border border-white/15"
                  >
                    <img
                      src={BRAND_ASSETS.studentWithBooks}
                      alt={
                        lang === 'en'
                          ? 'Young student carrying books with confidence'
                          : 'पुस्तकों के साथ आत्मविश्वासी विद्यार्थी'
                      }
                      className="w-14 h-14 rounded-xl object-cover bg-[#FFF8EB] shrink-0"
                    />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFC845]">
                        {lang === 'en' ? '3 Learning Stages' : '3 शिक्षण चरण'}
                      </p>
                      <p className="text-xs font-bold mt-0.5 leading-snug">
                        {lang === 'en'
                          ? 'Aarambh · Aadhar · Aagey'
                          : 'आरंभ · आधार · आगे'}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: TRUST & PROGRAMME HIGHLIGHTS STRIP
      ===================================================================== */}
      <section className="bg-[#24476B] text-white py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5">
            {TRUST_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 bg-white/5 rounded-2xl p-4 border border-white/10"
              >
                <span className="font-mono text-xs font-bold text-[#FFC845] pt-0.5">
                  0{idx + 1}
                </span>
                <div>
                  <h2 className="text-sm font-extrabold text-white leading-snug">
                    {item.title[lang]}
                  </h2>
                  <p className="text-xs text-slate-200/90 mt-1 leading-relaxed">
                    {item.subtitle[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: DISCOVER OUR LEARNING PROGRAMMES
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-[#FFFDF9] via-[#F7FBFF] to-[#FFFDF9]">
        <SectionDoodleBackdrop variant="cool" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#F47B45]">
                {lang === 'en'
                  ? 'Structured By Developmental Stage'
                  : 'आयु और कक्षा के अनुसार व्यवस्थित कार्यक्रम'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24476B] mt-2 tracking-tight">
                {lang === 'en'
                  ? 'Discover Our Learning Programmes'
                  : 'हमारे शिक्षण कार्यक्रमों को जानें'}
              </h2>
              <p className="text-slate-600 mt-3 text-base leading-relaxed">
                {lang === 'en'
                  ? 'Every stage of childhood needs a distinct teaching method—from playful phonics in Nursery–UKG to visual Concrete–Pictorial–Abstract learning in Primary and analytical reasoning in Middle School.'
                  : 'बचपन के हर चरण में सीखने की अलग पद्धति चाहिए—नर्सरी–UKG में खेल-आधारित फोनेटिक्स से लेकर प्राइमरी में चित्र-आधारित समझ और मिडिल स्कूल में तार्किक विश्लेषण तक।'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => goToPage('programmes')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#24476B] hover:text-[#36A9E1] cursor-pointer shrink-0"
            >
              <span>
                {lang === 'en'
                  ? 'View Full Nursery–Class 8 Curriculum Matrix'
                  : 'नर्सरी–कक्षा 8 का पूरा पाठ्यक्रम मैट्रिक्स देखें'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Main Programme Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1: Early Learning */}
            <div className="rounded-3xl bg-[#FFF8EB] border-2 border-[#FFC845]/60 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200">
              <div>
                {/* Programme Card Photo Banner */}
                <div className="relative h-48 rounded-2xl overflow-hidden mb-5 border-2 border-white shadow-sm bg-amber-100">
                  <img
                    src={BRAND_ASSETS.happyChildrenTeacher}
                    alt={
                      lang === 'en'
                        ? 'Early Learning Nursery LKG UKG at Aarohan Academy'
                        : 'आरोहण अकैडमी में प्रारंभिक शिक्षा (नर्सरी, LKG, UKG)'
                    }
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-[#F47B45] text-white text-xs font-extrabold shadow-sm">
                    {lang === 'en' ? 'Ages 3–6 Yrs' : 'आयु 3–6 वर्ष'}
                  </span>
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-white/95 text-[#24476B] text-xs font-extrabold shadow-sm">
                    AARAMBH · आरंभ
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#24476B]">
                  {lang === 'en' ? 'Early Learning' : 'प्रारंभिक शिक्षा (Early Learning)'}
                </h3>
                <p className="text-sm font-bold text-[#F47B45] mt-1">
                  {lang === 'en' ? 'Nursery | LKG | UKG' : 'नर्सरी | LKG | UKG'}
                </p>
                <p className="text-sm text-slate-700 mt-3 leading-relaxed">
                  {lang === 'en'
                    ? 'Building early learning confidence through stories, phonics, numbers, colours, shapes, creative activities and playful learning experiences.'
                    : 'कहानियों, फोनेटिक्स, संख्याओं, रंगों, आकारों और रचनात्मक खेल गतिविधियों के माध्यम से सीखने का आत्मविश्वास जगाना।'}
                </p>

                <div className="mt-5 pt-5 border-t border-[#FFC845]/40 space-y-2.5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#24476B]">
                    {lang === 'en' ? 'Key Focus Areas:' : 'मुख्य शिक्षण बिंदु:'}
                  </p>
                  {[
                    {
                      en: 'Phonics & alphabet sound recognition (A–Z & Swar/Vyanjan)',
                      hi: 'फोनेटिक्स और अक्षर-ध्वनि पहचान (A–Z एवं स्वर-व्यंजन)',
                    },
                    {
                      en: 'Speaking, listening & storytelling confidence',
                      hi: 'बोलने, सुनने और कहानी सुनाने का आत्मविश्वास',
                    },
                    {
                      en: 'Pre-writing lines, curves & comfortable pencil grip',
                      hi: 'लेखन-पूर्व रेखाएँ और पेंसिल की सहज पकड़',
                    },
                    {
                      en: 'Early numeracy (1–50) with physical objects & shapes',
                      hi: 'वस्तुओं और आकारों की मदद से 1–50 तक गिनती',
                    },
                  ].map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#F47B45] shrink-0 mt-0.5" />
                      <span>{pt[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 pt-4 border-t border-[#FFC845]/40">
                <button
                  type="button"
                  onClick={() => goToPage('prog-early')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F47B45] hover:bg-[#e06934] text-white font-bold py-3.5 px-5 rounded-xl transition-colors cursor-pointer text-sm"
                >
                  <span>
                    {lang === 'en'
                      ? 'Explore Early Learning'
                      : 'प्रारंभिक शिक्षा कार्यक्रम देखें'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 2: Primary Learning */}
            <div className="rounded-3xl bg-[#F4FBF7] border-2 border-[#4CAF80]/50 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200">
              <div>
                {/* Programme Card Photo Banner */}
                <div className="relative h-48 rounded-2xl overflow-hidden mb-5 border-2 border-white shadow-sm bg-emerald-50">
                  <img
                    src={BRAND_ASSETS.studentWithBooks}
                    alt={
                      lang === 'en'
                        ? 'Primary school learner with books at Aarohan Academy'
                        : 'आरोहण अकैडमी में प्राथमिक कक्षा का विद्यार्थी'
                    }
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-[#4CAF80] text-white text-xs font-extrabold shadow-sm">
                    {lang === 'en' ? 'Ages 6–11 Yrs' : 'आयु 6–11 वर्ष'}
                  </span>
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-white/95 text-[#24476B] text-xs font-extrabold shadow-sm">
                    AADHAR · आधार
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#24476B]">
                  {lang === 'en' ? 'Primary Learning' : 'प्राथमिक शिक्षा (Primary Learning)'}
                </h3>
                <p className="text-sm font-bold text-[#4CAF80] mt-1">
                  {lang === 'en'
                    ? 'Class 1 | Class 2 | Class 3 | Class 4 | Class 5'
                    : 'कक्षा 1 | कक्षा 2 | कक्षा 3 | कक्षा 4 | कक्षा 5'}
                </p>
                <p className="text-sm text-slate-700 mt-3 leading-relaxed">
                  {lang === 'en'
                    ? 'Strengthening reading, writing, grammar, mathematics, EVS and study habits through clear explanations and guided practice.'
                    : 'स्पष्ट व्याख्या और निर्देशित अभ्यास के माध्यम से पठन, लेखन, व्याकरण, गणित, EVS और अध्ययन की अच्छी आदतों को मजबूत करना।'}
                </p>

                <div className="mt-5 pt-5 border-t border-[#4CAF80]/30 space-y-2.5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#24476B]">
                    {lang === 'en' ? 'Key Focus Areas:' : 'मुख्य शिक्षण बिंदु:'}
                  </p>
                  {[
                    {
                      en: 'English & Hindi reading fluency, matras & comprehension',
                      hi: 'अंग्रेजी और हिंदी पठन प्रवाह, मात्राएँ और गद्यांश बोध',
                    },
                    {
                      en: 'Grammar in context, neat handwriting & creative writing',
                      hi: 'व्यावहारिक व्याकरण, सुंदर लिखावट और रचनात्मक लेखन',
                    },
                    {
                      en: 'Place value, 4 operations, fractions, decimals & geometry',
                      hi: 'स्थानीय मान, चारों संक्रियाएँ, भिन्न, दशमलव और ज्यामिति',
                    },
                    {
                      en: 'EVS ("Our Wondrous World") & word-problem decoding',
                      hi: 'पर्यावरण अध्ययन (EVS) और इबारती सवालों को हल करना',
                    },
                  ].map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#4CAF80] shrink-0 mt-0.5" />
                      <span>{pt[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 pt-4 border-t border-[#4CAF80]/30 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage('prog-primary-1-2')}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#4CAF80] hover:bg-[#3d9c6e] text-white font-bold py-3 px-3 rounded-xl transition-colors cursor-pointer text-xs sm:text-sm"
                  >
                    <span>{lang === 'en' ? 'Classes 1–2' : 'कक्षा 1–2'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToPage('prog-primary-3-5')}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#24476B] hover:bg-[#1b3652] text-white font-bold py-3 px-3 rounded-xl transition-colors cursor-pointer text-xs sm:text-sm"
                  >
                    <span>{lang === 'en' ? 'Classes 3–5' : 'कक्षा 3–5'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Middle School Learning */}
            <div className="rounded-3xl bg-[#F0F7FF] border-2 border-[#36A9E1]/50 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200">
              <div>
                {/* Programme Card Photo Banner */}
                <div className="relative h-48 rounded-2xl overflow-hidden mb-5 border-2 border-white shadow-sm bg-sky-50">
                  <img
                    src={BRAND_ASSETS.confidentStudentGirl}
                    alt={
                      lang === 'en'
                        ? 'Confident middle school student at Aarohan Academy'
                        : 'आरोहण अकैडमी की आत्मविश्वासी मिडिल स्कूल छात्रा'
                    }
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-[#36A9E1] text-white text-xs font-extrabold shadow-sm">
                    {lang === 'en' ? 'Ages 11–14 Yrs' : 'आयु 11–14 वर्ष'}
                  </span>
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-white/95 text-[#24476B] text-xs font-extrabold shadow-sm">
                    AAGEY · आगे
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#24476B]">
                  {lang === 'en'
                    ? 'Middle School Learning'
                    : 'मिडिल स्कूल शिक्षा (Middle School)'}
                </h3>
                <p className="text-sm font-bold text-[#36A9E1] mt-1">
                  {lang === 'en'
                    ? 'Class 6 | Class 7 | Class 8'
                    : 'कक्षा 6 | कक्षा 7 | कक्षा 8'}
                </p>
                <p className="text-sm text-slate-700 mt-3 leading-relaxed">
                  {lang === 'en'
                    ? 'Developing deeper subject understanding, problem-solving skills, structured writing, analytical thinking and academic confidence.'
                    : 'विषयों की गहरी समझ, समस्या-समाधान कौशल, व्यवस्थित उत्तर-लेखन, तार्किक सोच और परीक्षा में आत्मविश्वास विकसित करना।'}
                </p>

                <div className="mt-5 pt-5 border-t border-[#36A9E1]/30 space-y-2.5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#24476B]">
                    {lang === 'en' ? 'Key Focus Areas:' : 'मुख्य शिक्षण बिंदु:'}
                  </p>
                  {[
                    {
                      en: 'Mathematics (Ganita Prakash): Integers, Algebra, Mensuration',
                      hi: 'गणित (गणित प्रकाश): पूर्णांक, बीजगणित, ज्यामिति और क्षेत्रमिति',
                    },
                    {
                      en: 'Science (Curiosity): Physics, Chemistry & Biology concepts',
                      hi: 'विज्ञान (क्यूरियोसिटी): भौतिकी, रसायन और जीव विज्ञान अवधारणाएँ',
                    },
                    {
                      en: 'Social Science: History, Geography maps & Civics',
                      hi: 'सामाजिक विज्ञान: इतिहास, भूगोल मानचित्र और नागरिक शास्त्र',
                    },
                    {
                      en: 'English & Hindi grammar, note-making & exam answer writing',
                      hi: 'अंग्रेजी व हिंदी व्याकरण, नोट्स बनाना और परीक्षा उत्तर लेखन',
                    },
                  ].map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#36A9E1] shrink-0 mt-0.5" />
                      <span>{pt[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 pt-4 border-t border-[#36A9E1]/30">
                <button
                  type="button"
                  onClick={() => goToPage('prog-middle-6-8')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#24476B] hover:bg-[#1b3652] text-white font-bold py-3.5 px-5 rounded-xl transition-colors cursor-pointer text-sm"
                >
                  <span>
                    {lang === 'en'
                      ? 'Explore Middle School (Classes 6–8)'
                      : 'मिडिल स्कूल कार्यक्रम देखें (कक्षा 6–8)'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Nurturing Young Minds 4 Organic-Blob Student Portrait Showcase */}
          <div className="mt-14">
            <NurturingYoungMindsStrip lang={lang} onNavigate={goToPage} />
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: WHY AAROHAN ACADEMY? (WITH PHOTO COLLAGE & VISUAL CARDS)
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-br from-[#FFF6E3] via-[#FFF8EB] to-[#FEF2E4] border-y border-[#FFC845]/30">
        <SectionDoodleBackdrop variant="warm" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#36A9E1]">
                {lang === 'en' ? 'Why Parents Choose Us' : 'अभिभावक हमें क्यों चुनते हैं'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24476B] mt-2 tracking-tight leading-tight">
                {lang === 'en'
                  ? 'A Warm, Personalised Space Where Children Truly Understand What They Learn'
                  : 'एक आत्मीय और व्यक्तिगत शिक्षण वातावरण जहाँ बच्चे हर विषय को गहराई से समझते हैं'}
              </h2>
              <p className="text-slate-600 mt-3 text-base leading-relaxed">
                {lang === 'en'
                  ? 'Many children struggle in large school classrooms or crowded tuition halls because small doubts go unnoticed. At Aarohan Academy, we focus on clarity, patience, and steady daily practice.'
                  : 'बड़ी कक्षाओं या भीड़भाड़ वाले ट्यूशन में अक्सर बच्चों की छोटी शंकाएँ अनदेखी रह जाती हैं। आरोहण अकैडमी में हम धैर्य, स्पष्टता और नियमित अभ्यास पर ध्यान केंद्रित करते हैं।'}
              </p>
            </div>

            {/* Right Dual-Photo Classroom & Student Collage */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 items-center">
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-white -rotate-2">
                <img
                  src={BRAND_ASSETS.attentiveGirlsWriting}
                  alt={
                    lang === 'en'
                      ? 'Attentive students writing notes in classroom'
                      : 'कक्षा में ध्यानपूर्वक लिखती छात्राएँ'
                  }
                  className="w-full h-44 sm:h-52 object-cover"
                  loading="lazy"
                />
                <div className="p-3 bg-white text-center">
                  <p className="text-xs font-extrabold text-[#24476B]">
                    {lang === 'en' ? 'Personal Attention' : 'व्यक्तिगत ध्यान'}
                  </p>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-white rotate-2 mt-4">
                <img
                  src={BRAND_ASSETS.classroomDesksChalkboard}
                  alt={
                    lang === 'en'
                      ? 'Focused students practicing writing and sums'
                      : 'एकाग्रता से अभ्यास करते विद्यार्थी'
                  }
                  className="w-full h-44 sm:h-52 object-cover"
                  loading="lazy"
                />
                <div className="p-3 bg-white text-center">
                  <p className="text-xs font-extrabold text-[#F47B45]">
                    {lang === 'en' ? 'Daily Writing Practice' : 'दैनिक लेखन अभ्यास'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_AAROHAN_REASONS.map((reason) => (
              <div
                key={reason.number}
                className="bg-white/95 backdrop-blur-xs rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-sm font-extrabold"
                      style={{ color: reason.accentColor }}
                    >
                      {reason.number}.
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#24476B] mt-3">
                    {reason.title[lang]}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {reason.description[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: OUR LEARNING APPROACH (4-STEP PROCESS)
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-white via-[#F4FBF7]/60 to-white">
        <SectionDoodleBackdrop variant="mint" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#4CAF80]">
                {lang === 'en'
                  ? 'Our 4-Step Classroom Cycle'
                  : 'हमारी 4-चरणीय शिक्षण पद्धति'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24476B] mt-2 tracking-tight">
                {lang === 'en'
                  ? 'How Learning Happens Every Day at Aarohan'
                  : 'आरोहण में प्रतिदिन सीखने की प्रक्रिया कैसे चलती है'}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => goToPage('approach')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#24476B] hover:text-[#36A9E1] cursor-pointer"
            >
              <span>
                {lang === 'en'
                  ? 'Read More About Our CPA & Phonics Methodology'
                  : 'हमारी CPA और फोनेटिक्स शिक्षण पद्धति को विस्तार से पढ़ें'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEARNING_APPROACH_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl bg-white/95 backdrop-blur-xs border border-slate-200/90 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="font-mono text-xs font-extrabold uppercase tracking-wider"
                      style={{ color: item.color }}
                    >
                      STEP {item.step}
                    </span>
                    <StepVisualDiagramBadge stepNumber={item.step} />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#24476B] mt-1">
                    {lang === 'en' ? `${item.step}. ${item.title.en}` : item.title.hi}
                  </h3>
                  <p className="text-sm font-semibold text-slate-800 mt-2.5 leading-snug">
                    {item.description[lang]}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {item.detail[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Visual Concept Diagrams Lab (CPA Maths, Phonics, Science, Geometry) */}
          <div className="mt-12">
            <InteractiveConceptDiagramsSection lang={lang} />
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: THE AAROHAN GROWTH JOURNEY
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-br from-[#1B3552] via-[#24476B] to-[#152940] text-white">
        <SectionDoodleBackdrop variant="navy" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-8">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#FFC845]">
                {lang === 'en'
                  ? 'The Aarohan Growth Journey'
                  : 'आरोहण विकास यात्रा (नर्सरी से कक्षा 8)'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
                {lang === 'en'
                  ? 'From Early Curiosity to Independent Academic Confidence'
                  : 'प्रारंभिक जिज्ञासा से लेकर आत्मनिर्भर शैक्षणिक आत्मविश्वास तक'}
              </h2>
              <p className="text-slate-300 mt-3 text-base leading-relaxed">
                {lang === 'en'
                  ? '"Aarohan" means rising or ascending. See how a child’s habits, skills, and visible signs of growth progress across four clear milestones.'
                  : '"आरोहण" का अर्थ है ऊपर उठना और आगे बढ़ना। देखिए कि चार स्पष्ट चरणों में बच्चे की आदतें, कौशल और आत्मविश्वास कैसे विकसित होते हैं।'}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <img
                src={BRAND_ASSETS.educational3DIllustration}
                alt="3D Educational Milestone Globe and Blocks"
                className="w-64 sm:w-72 h-auto object-contain rounded-3xl border-2 border-white/20 shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GROWTH_JOURNEY_STAGES.map((stage, stageIdx) => {
              const stagePhotos = [
                BRAND_ASSETS.happyChildrenTeacher,
                BRAND_ASSETS.studentWithBooks,
                BRAND_ASSETS.attentiveGirlsWriting,
                BRAND_ASSETS.confidentStudentGirl,
              ];
              return (
                <div
                  key={stage.stageNumber}
                  className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/15 p-6 hover:bg-white/15 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-32 rounded-2xl overflow-hidden mb-4 border border-white/20">
                      <img
                        src={stagePhotos[stageIdx % stagePhotos.length]}
                        alt={stage.stageName[lang]}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#FFC845]">{stage.stageNumber}</span>
                      <span className="text-slate-300">{stage.classes[lang]}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white mt-2">
                      {stage.stageName[lang]}
                    </h3>
                    <p className="text-xs font-semibold text-[#36A9E1] mt-0.5">
                      {stage.sanskritName[lang]} · {stage.headline[lang]}
                    </p>

                  <p className="text-xs sm:text-sm text-slate-200 mt-4 leading-relaxed">
                    {stage.whatWeWorkOn[lang]}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/15 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFC845]">
                      {lang === 'en' ? 'Visible Signs of Growth:' : 'प्रगति के स्पष्ट संकेत:'}
                    </p>
                    {stage.signsOfGrowth.map((sign, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF80] shrink-0 mt-0.5" />
                        <span>{sign[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => goToPage(stage.targetPage)}
                  className="mt-6 w-full inline-flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  <span>
                    {lang === 'en' ? 'View Stage Curriculum' : 'इस चरण का पाठ्यक्रम देखें'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: SUBJECT-WISE LEARNING
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-white border-b border-slate-200/60">
        <SectionDoodleBackdrop variant="lavender" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#36A9E1]">
                {lang === 'en'
                  ? 'CBSE & NCERT 2026–27 Aligned'
                  : 'CBSE और NCERT 2026–27 पुस्तकों के अनुरूप'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24476B] mt-2 tracking-tight">
                {lang === 'en'
                  ? 'Subject-Wise Learning Support'
                  : 'विषय-वार शिक्षण और गहरा अभ्यास'}
              </h2>
              <p className="text-slate-600 mt-3 text-base leading-relaxed">
                {lang === 'en'
                  ? 'We teach every core school subject with structured concept notes, visual models, and regular writing practice.'
                  : 'हम स्कूल के प्रत्येक मुख्य विषय को स्पष्ट नोट्स, चित्रों और नियमित लेखन अभ्यास के साथ पढ़ाते हैं।'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => goToPage('subjects')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#24476B] hover:text-[#36A9E1] cursor-pointer"
            >
              <span>
                {lang === 'en'
                  ? 'Explore Detailed Subject Breakdowns'
                  : 'सभी विषयों का विस्तृत विवरण देखें'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUBJECT_DETAILS.map((subj) => (
              <div
                key={subj.id}
                className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xs p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4">
                    <SubjectVisualDiagramBanner subjectId={subj.id} />
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span style={{ color: subj.accentHex }}>{subj.classes[lang]}</span>
                    <BookOpen className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#24476B] mt-2">
                    {subj.name[lang]}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {subj.shortFocus[lang]}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {subj.stageBreakdown.map((st, idx) => (
                      <div key={idx} className="text-xs text-slate-700">
                        <span className="font-bold text-[#24476B]">{st.stage[lang]}: </span>
                        <span>{st.focus[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {lang === 'en' ? 'Includes A4 Practice Sheets' : 'A4 अभ्यास वर्कशीट सहित'}
                  </span>
                  <button
                    type="button"
                    onClick={() => goToPage('subjects')}
                    className="text-xs font-bold text-[#24476B] hover:text-[#36A9E1] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{lang === 'en' ? 'Details' : 'विवरण'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: LEARNING ACTIVITIES & ENRICHMENT
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-[#F8FAFC] border-y border-slate-200/80">
        <SectionDoodleBackdrop variant="sunrise" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#F47B45]">
              {lang === 'en'
                ? 'Beyond Rote Textbook Memorisation'
                : 'केवल रटने से आगे—कौशल संवर्धन'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24476B] mt-2 tracking-tight">
              {lang === 'en'
                ? 'Signature Skill Enrichment & Classroom Activities'
                : 'विशेष कौशल संवर्धन कार्यक्रम और कक्षा गतिविधियाँ'}
            </h2>
            <p className="text-slate-600 mt-3 text-base leading-relaxed">
              {lang === 'en'
                ? 'Every student enrolled at Aarohan participates in our three signature daily skill routines alongside regular school syllabus coverage.'
                : 'आरोहण में पढ़ने वाला प्रत्येक छात्र स्कूल के पाठ्यक्रम के साथ-साथ हमारे तीन विशेष दैनिक कौशल अभ्यासों में भाग लेता है।'}
            </p>
          </div>

          {/* 3 Signature Enrichment Programmes (With Photos) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {ENRICHMENT_PROGRAMMES.map((prog, progIdx) => {
              const enrichmentPhotos = [
                BRAND_ASSETS.realClassroomFloor,
                BRAND_ASSETS.happyChildrenTeacher,
                BRAND_ASSETS.classroomDesksChalkboard,
              ];
              return (
                <div
                  key={prog.id}
                  className="bg-white/95 backdrop-blur-xs rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-36 rounded-2xl overflow-hidden mb-4 border border-slate-200">
                      <img
                        src={enrichmentPhotos[progIdx % enrichmentPhotos.length]}
                        alt={prog.title[lang]}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-xs font-bold text-[#F47B45]">{prog.hindiSubtitle}</div>
                    <h3 className="text-xl font-extrabold text-[#24476B] mt-1">
                      {prog.title[lang]}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      {prog.targetClasses[lang]} · {prog.statusLabel[lang]}
                    </p>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                      {prog.description[lang]}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                      {prog.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <Sparkles className="w-3.5 h-3.5 text-[#FFC845] shrink-0 mt-0.5" />
                          <span>{h[lang]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coral-Orange & Royal-Navy Visual Split Banner with Photos + 3D Illustration */}
          <div className="mb-12">
            <OrangeNavyVisualSplitBanner lang={lang} onNavigate={goToPage} />
          </div>

          {/* 8 Classroom Activity Examples */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEARNING_ACTIVITIES_SHOWCASE.map((act, idx) => (
              <div
                key={idx}
                className="bg-white/95 backdrop-blur-xs rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-[11px] font-bold text-[#36A9E1] uppercase tracking-wider">
                  {act.stage[lang]}
                </div>
                <h4 className="text-base font-extrabold text-[#24476B] mt-1">
                  {act.title[lang]}
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {act.description[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: ASSESSMENT AND PROGRESS
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-white">
        <SectionDoodleBackdrop variant="mint" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#4CAF80]">
                {lang === 'en'
                  ? 'Low-Stress Diagnostic Assessment'
                  : 'बिना तनाव के निरंतर प्रगति मूल्यांकन'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24476B] tracking-tight">
                {lang === 'en'
                  ? 'Every Step of Learning Matters'
                  : 'सीखने का हर कदम महत्वपूर्ण है'}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {lang === 'en'
                  ? 'Instead of waiting for school term exams to discover that a child is struggling, we check understanding continuously and share transparent Monthly Growth Notes with parents.'
                  : 'स्कूल की परीक्षाओं का इंतज़ार करने के बजाय हम हर सप्ताह बच्चे की समझ की जाँच करते हैं और अभिभावकों के साथ पारदर्शी "मासिक ग्रोथ नोट" साझा करते हैं।'}
              </p>

              <div className="space-y-3.5 pt-2">
                {[
                  {
                    title: {
                      en: '01. Initial Learning Check (At Admission)',
                      hi: '01. प्रारंभिक कौशल जाँच (प्रवेश के समय)',
                    },
                    desc: {
                      en: 'A warm 15–20 minute diagnostic interaction to understand current reading fluency, phonics, and calculation comfort.',
                      hi: 'बच्चे के वर्तमान पठन प्रवाह और गणितीय स्तर को समझने के लिए 15–20 मिनट की सहज बातचीत।',
                    },
                  },
                  {
                    title: {
                      en: '02. Topic-Wise Practice & Error Analysis',
                      hi: '02. विषय-वार अभ्यास और त्रुटि विश्लेषण',
                    },
                    desc: {
                      en: 'We identify whether a mistake happened due to a concept gap, place-value confusion, or hasty reading.',
                      hi: 'हम यह पहचानते हैं कि गलती अवधारणा न समझने से हुई है या जल्दबाजी में प्रश्न पढ़ने से।',
                    },
                  },
                  {
                    title: {
                      en: '03. Weekly Revision & Mistake Logs',
                      hi: '03. साप्ताहिक दोहराव और मिस्टेक लॉग',
                    },
                    desc: {
                      en: 'Students re-practise corrected questions so errors are not repeated in school tests.',
                      hi: 'छात्र सुधारी गई गलतियों का पुनः अभ्यास करते हैं ताकि स्कूल परीक्षा में वे दोहराई न जाएँ।',
                    },
                  },
                  {
                    title: {
                      en: '04. Monthly Parent Growth Note',
                      hi: '04. अभिभावकों के लिए मासिक ग्रोथ नोट',
                    },
                    desc: {
                      en: 'Clear update covering attendance, strengths, areas needing practice, and next 2–3 learning goals.',
                      hi: 'उपस्थिति, मजबूत पक्ष, अभ्यास के बिंदु और अगले 2–3 लक्ष्यों की स्पष्ट मासिक रिपोर्ट।',
                    },
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80"
                  >
                    <h3 className="text-sm font-extrabold text-[#24476B]">
                      {step.title[lang]}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {step.desc[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Sample Growth Report Preview (7 cols) */}
            <div className="lg:col-span-7">
              <GrowthReportPreview lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10: OUR LEARNING ENVIRONMENT (AUTHENTIC PHOTO GALLERY)
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-[#FFF8EB] border-y border-slate-200/70">
        <SectionDoodleBackdrop variant="warm" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#F47B45]">
              {lang === 'en'
                ? 'Authentic Neighbourhood Classroom'
                : 'हमारा वास्तविक शिक्षण वातावरण'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24476B] mt-2 tracking-tight">
              {lang === 'en'
                ? 'Inside Our Learning Environment in Gupta Park, Najafgarh'
                : 'गुप्ता पार्क, नजफगढ़ स्थित हमारे शिक्षण केंद्र की झलक'}
            </h2>
            <p className="text-slate-600 mt-3 text-base leading-relaxed">
              {lang === 'en'
                ? 'A clean, calm, well-lit and distraction-free residential learning space where children sit comfortably, ask questions freely, and receive close notebook guidance.'
                : 'एक स्वच्छ, शांत, हवादार और सुरक्षित वातावरण जहाँ बच्चे सहजता से बैठकर पढ़ते हैं और बिना झिझक अपने सवाल पूछते हैं।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GALLERY_PHOTOS.map((photo) => (
              <figure
                key={photo.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <div className="h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img
                    src={photo.src}
                    alt={photo.alt[lang]}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <figcaption className="p-5 sm:p-6">
                  <h3 className="text-lg font-extrabold text-[#24476B]">
                    {photo.caption[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {photo.subcaption[lang]}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 11: PARENT PARTNERSHIP SECTION
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-20 bg-white border-b border-slate-200/70">
        <SectionDoodleBackdrop variant="cool" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl bg-gradient-to-r from-[#24476B] to-[#1B3552] text-white p-8 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#FFC845]">
                  {lang === 'en'
                    ? 'Parent–Educator Partnership'
                    : 'अभिभावक और शिक्षक की साझेदारी'}
                </p>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  {lang === 'en'
                    ? 'Learning Works Best When We Work Together'
                    : 'जब अभिभावक और शिक्षक साथ मिलकर प्रयास करते हैं, तो बच्चे सबसे तेज़ सीखते हैं'}
                </h2>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {lang === 'en'
                    ? 'We welcome parents to discuss their child’s school notebooks, upcoming unit tests, reading habits, and study routine. You never have to wait for a year-end PTM to know how your child is doing.'
                    : 'हम अभिभावकों का स्वागत करते हैं कि वे बच्चे की स्कूल कॉपियों, आगामी टेस्ट, पढ़ने की आदतों और दिनचर्या पर हमसे सीधे चर्चा करें।'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10">
                    <p className="text-xs font-bold text-[#FFC845]">
                      {lang === 'en' ? 'Direct Feedback' : 'सीधा संवाद'}
                    </p>
                    <p className="text-xs text-slate-200 mt-1">
                      {lang === 'en'
                        ? 'Speak with the educator at pickup/drop or via WhatsApp'
                        : 'केंद्र पर या व्हाट्सऐप पर शिक्षक से सीधी बातचीत'}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10">
                    <p className="text-xs font-bold text-[#FFC845]">
                      {lang === 'en' ? 'Home Study Tips' : 'घर पर अभ्यास के सुझाव'}
                    </p>
                    <p className="text-xs text-slate-200 mt-1">
                      {lang === 'en'
                        ? 'Simple 10-minute home routines that don’t burden parents'
                        : 'बिना बोझ के घर पर 10 मिनट के सरल अभ्यास सुझाव'}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10">
                    <p className="text-xs font-bold text-[#FFC845]">
                      {lang === 'en' ? 'School Exam Sync' : 'स्कूल परीक्षा समन्वय'}
                    </p>
                    <p className="text-xs text-slate-200 mt-1">
                      {lang === 'en'
                        ? 'Revision aligned with your child’s school date-sheet'
                        : 'बच्चे के स्कूल की परीक्षा तिथियों के अनुसार दोहराव'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <a
                  href={buildWhatsAppUrl(
                    'Hello Aarohan Academy! I would like to discuss my child’s learning needs with the educator.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all text-center text-sm sm:text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>
                    {lang === 'en'
                      ? 'Talk to Us on WhatsApp'
                      : 'व्हाट्सऐप पर हमसे बात करें'}
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => goToPage('admissions')}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#24476B] font-bold py-3.5 px-6 rounded-2xl transition-colors cursor-pointer text-sm"
                >
                  <span>
                    {lang === 'en'
                      ? 'Schedule a Centre Visit'
                      : 'केंद्र भ्रमण का समय तय करें'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 11B: DISCREET & VERIFIED PARENT REFLECTIONS
      ===================================================================== */}
      <ParentTestimonialsSection lang={lang} />

      {/* =====================================================================
          SECTION 12: LEARNING LIBRARY PREVIEW (WITH INTERACTIVE FILTERS)
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-white">
        <SectionDoodleBackdrop variant="cool" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#36A9E1]">
                {lang === 'en'
                  ? '30 Original A4 Printable Worksheets'
                  : '30 मूल A4 प्रिंट करने योग्य अभ्यास वर्कशीट'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24476B] mt-2 tracking-tight">
                {lang === 'en'
                  ? 'Aarohan Learning Library'
                  : 'आरोहण लर्निंग लाइब्रेरी (अभ्यास संसाधन)'}
              </h2>
              <p className="text-slate-600 mt-2 text-base leading-relaxed">
                {lang === 'en'
                  ? 'Preview and print our classroom-tested practice sheets across Nursery to Class 8. Every sheet includes bilingual instructions and a Parent Support Tip.'
                  : 'नर्सरी से कक्षा 8 के लिए हमारी विशेष अभ्यास वर्कशीट देखें और प्रिंट करें। प्रत्येक शीट में द्विभाषी निर्देश और अभिभावकों के लिए सुझाव दिए गए हैं।'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => goToPage('library')}
              className="inline-flex items-center gap-2 bg-[#24476B] hover:bg-[#1b3652] text-white text-sm font-bold px-5 py-3 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              <span>
                {lang === 'en'
                  ? 'Explore All 30 Library Resources'
                  : 'सभी 30 वर्कशीट और ब्रेन चैलेंज देखें'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Filter Controls */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/90 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div>
              <label
                htmlFor="home-lib-class"
                className="block text-xs font-bold text-[#24476B] mb-1"
              >
                {lang === 'en' ? 'Filter by Class Group' : 'कक्षा समूह चुनें'}
              </label>
              <select
                id="home-lib-class"
                value={libraryFilter.classFilter}
                onChange={(e) =>
                  setLibraryFilter((prev) => ({ ...prev, classFilter: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#36A9E1]"
              >
                <option value="All">{lang === 'en' ? 'All Classes (Nursery–8)' : 'सभी कक्षाएँ (नर्सरी–8)'}</option>
                <option value="Nursery to UKG">Nursery to UKG</option>
                <option value="Classes 1–2">Classes 1–2</option>
                <option value="Classes 3–5">Classes 3–5</option>
                <option value="Classes 6–8">Classes 6–8</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="home-lib-subject"
                className="block text-xs font-bold text-[#24476B] mb-1"
              >
                {lang === 'en' ? 'Filter by Subject' : 'विषय चुनें'}
              </label>
              <select
                id="home-lib-subject"
                value={libraryFilter.subjectFilter}
                onChange={(e) =>
                  setLibraryFilter((prev) => ({ ...prev, subjectFilter: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#36A9E1]"
              >
                <option value="All">{lang === 'en' ? 'All Subjects' : 'सभी विषय'}</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Maths">Maths</option>
                <option value="EVS">EVS</option>
                <option value="Science">Science</option>
                <option value="Social Science">Social Science</option>
                <option value="Pre-writing">Pre-writing</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="home-lib-difficulty"
                className="block text-xs font-bold text-[#24476B] mb-1"
              >
                {lang === 'en' ? 'Difficulty Level' : 'कठिनाई स्तर'}
              </label>
              <select
                id="home-lib-difficulty"
                value={libraryFilter.difficultyFilter}
                onChange={(e) =>
                  setLibraryFilter((prev) => ({ ...prev, difficultyFilter: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#36A9E1]"
              >
                <option value="All">{lang === 'en' ? 'All Levels' : 'सभी स्तर'}</option>
                <option value="Start">Start (Foundation)</option>
                <option value="Build">Build (Practice)</option>
                <option value="Challenge">Challenge (Stretch)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="home-lib-search"
                className="block text-xs font-bold text-[#24476B] mb-1"
              >
                {lang === 'en' ? 'Search Topic' : 'विषय खोजें'}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="home-lib-search"
                  type="text"
                  value={libraryFilter.searchQuery}
                  onChange={(e) =>
                    setLibraryFilter((prev) => ({ ...prev, searchQuery: e.target.value }))
                  }
                  placeholder={
                    lang === 'en' ? 'e.g. Phonics, Fractions, Algebra...' : 'जैसे: Phonics, भिन्न, व्याकरण...'
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#36A9E1]"
                />
              </div>
            </div>
          </div>

          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPreviewResources.map((res) => (
              <div
                key={res.id}
                className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xs p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-bold">
                    <span className="text-[#36A9E1]">{res.classGroup}</span>
                    <span className="text-slate-500">
                      {res.subject} · {res.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#24476B] mt-2">
                    {res.title[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {res.objective[lang]}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500 font-medium">
                    {res.format[lang]}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenWorksheet(res)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#24476B] hover:text-[#F47B45] cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'en' ? 'Preview & Print' : 'देखें और प्रिंट करें'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 13: PARENT CORNER PREVIEW
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-[#F8FAFC] border-y border-slate-200/80">
        <SectionDoodleBackdrop variant="sunrise" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#F47B45]">
                {lang === 'en' ? 'Parent Corner' : 'अभिभावक कॉर्नर (Parent Guides)'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24476B] mt-2 tracking-tight">
                {lang === 'en'
                  ? 'Practical Study & Parenting Guides'
                  : 'बच्चों की पढ़ाई के लिए व्यावहारिक लेख और सुझाव'}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => goToPage('parent-corner')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#24476B] hover:text-[#36A9E1] cursor-pointer"
            >
              <span>
                {lang === 'en' ? 'Read All 6 Parent Guides' : 'सभी 6 मार्गदर्शक लेख पढ़ें'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARENT_CORNER_ARTICLES.slice(0, 3).map((article) => (
              <article
                key={article.id}
                className="bg-white/95 backdrop-blur-xs rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F47B45]">
                    <span>{article.category[lang]}</span>
                    <span>·</span>
                    <span className="text-slate-500">{article.readTime[lang]}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#24476B] mt-2 leading-snug">
                    {article.title[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {article.excerpt[lang]}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#24476B] hover:text-[#36A9E1] cursor-pointer"
                  >
                    <span>
                      {lang === 'en' ? 'Read Full Guide' : 'पूरा लेख पढ़ें'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 14: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-white">
        <SectionDoodleBackdrop variant="mint" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#36A9E1]">
              {lang === 'en' ? 'Clear Answers for Parents' : 'अभिभावकों के प्रश्नों के स्पष्ट उत्तर'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#24476B] mt-2 tracking-tight">
              {lang === 'en'
                ? 'Frequently Asked Questions'
                : 'अक्सर पूछे जाने वाले प्रश्न (FAQs)'}
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQ_ITEMS.slice(0, 7).map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200/90 bg-slate-50/60 overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-extrabold text-[#24476B] hover:bg-slate-100/70 transition-colors cursor-pointer text-sm sm:text-base"
                  >
                    <span>{faq.question[lang]}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#36A9E1]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3.5 bg-white">
                      {faq.answer[lang]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => goToPage('faqs')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#24476B] hover:text-[#36A9E1] cursor-pointer"
            >
              <span>
                {lang === 'en' ? 'View All 10 FAQs' : 'सभी 10 प्रश्न और उत्तर देखें'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 15: FINAL ENQUIRY CTA & ADMISSIONS FORM
      ===================================================================== */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-[#FFF8EB] border-t border-slate-200/80">
        <SectionDoodleBackdrop variant="warm" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="rounded-3xl bg-[#24476B] text-white p-8 sm:p-10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#FFC845]">
                {lang === 'en'
                  ? 'Admissions & Learning Assessment'
                  : 'प्रवेश और प्रारंभिक कौशल मूल्यांकन'}
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {lang === 'en'
                  ? "Let's Begin Your Child's Learning Journey"
                  : 'आइए अपने बच्चे की उज्ज्वल शिक्षण यात्रा शुरू करें'}
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {lang === 'en'
                  ? 'Visit H.No. 49B, Gupta Park, Todarmal Colony, Najafgarh, Delhi or reach us directly on Call / WhatsApp to schedule an informal 15-minute diagnostic check.'
                  : 'मकान नं. 49B, गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़, दिल्ली पर पधारें या 15-मिनट के प्रारंभिक मूल्यांकन के लिए कॉल / व्हाट्सऐप करें।'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:+919220357826"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#24476B] font-bold px-5 py-3.5 rounded-xl text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#36A9E1]" />
                <span>
                  {lang === 'en' ? 'Call Now' : 'अभी कॉल करें'} ({ACADEMY_PHONE_DISPLAY})
                </span>
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-5 py-3.5 rounded-xl text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'en' ? 'WhatsApp Us' : 'व्हाट्सऐप करें'}</span>
              </a>
              <a
                href={buildGoogleMapsDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-xl text-sm border border-white/20 transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#FFC845]" />
                <span>{lang === 'en' ? 'Get Directions' : 'दिशा-निर्देश प्राप्त करें'}</span>
              </a>
            </div>
          </div>

          {/* Embedded Validated Enquiry Form */}
          <EnquiryFormSection lang={lang} />
        </div>
      </section>
    </div>
  );
};
