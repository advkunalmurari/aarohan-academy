import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Compass,
  Award,
  Layers,
  GraduationCap,
  MapPin,
  MessageCircle,
  Eye,
} from 'lucide-react';
import {
  Language,
  PageId,
  LibraryResource,
  buildWhatsAppUrl,
  ACADEMY_ADDRESS_EN,
  ACADEMY_ADDRESS_HI,
} from '../utils/academyLogic';
import {
  BRAND_ASSETS,
  PROGRAMME_STAGE_DETAILS,
  GRADE_WISE_MATRIX,
  SUBJECT_DETAILS,
  ENRICHMENT_PROGRAMMES,
  LEARNING_APPROACH_STEPS,
  GROWTH_JOURNEY_STAGES,
  GALLERY_PHOTOS,
} from '../data/academyData';
import { LIBRARY_RESOURCES } from '../data/libraryResourcesData';
import { GrowthReportPreview } from './GrowthReportPreview';
import { EnquiryFormSection } from './EnquiryFormSection';
import { ParentTestimonialsSection } from './ParentTestimonialsSection';
import { PageHeroBackdrop, SectionDoodleBackdrop } from './CreativeBackground';
import {
  NurturingYoungMindsStrip,
  InteractiveConceptDiagramsSection,
  StepVisualDiagramBadge,
  SubjectVisualDiagramBanner,
} from './EducationalDiagramsAndVisuals';

interface CurriculumPagesViewProps {
  page:
    | 'about'
    | 'approach'
    | 'programmes'
    | 'prog-early'
    | 'prog-primary-1-2'
    | 'prog-primary-3-5'
    | 'prog-middle-6-8'
    | 'subjects'
    | 'assessment';
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenWorksheet: (resource: LibraryResource) => void;
}

export const CurriculumPagesView: React.FC<CurriculumPagesViewProps> = ({
  page,
  lang,
  onNavigate,
  onOpenWorksheet,
}) => {
  const [selectedMatrixStage, setSelectedMatrixStage] = useState<string>('All');

  const goTo = (target: PageId) => {
    onNavigate(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===========================================================================
  // 1. ABOUT US PAGE
  // ===========================================================================
  if (page === 'about') {
    return (
      <div className="bg-white">
        {/* Hero Header with Photo Collage */}
        <section className="relative overflow-hidden bg-[#FFF8EB] py-14 lg:py-20 border-b border-slate-200/80">
          <PageHeroBackdrop />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#F47B45]">
                {lang === 'en'
                  ? 'About Aarohan Academy · Gupta Park, Najafgarh'
                  : 'आरोहण अकैडमी के बारे में · गुप्ता पार्क, नजफगढ़'}
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24476B] mt-2 tracking-tight leading-tight">
                {lang === 'en'
                  ? 'A Neighbourhood Learning Space Dedicated to Strong Foundations'
                  : 'मजबूत शैक्षणिक नींव और आत्मविश्वास के लिए समर्पित आपका स्थानीय शिक्षण केंद्र'}
              </h1>
              <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed">
                {lang === 'en'
                  ? 'Located at H.No. 54B, Gupta Park, Todarmal Colony, Najafgarh, Aarohan Academy provides warm, structured supplementary tuition for children from Nursery to Class 8 studying in CBSE schools.'
                  : 'मकान नं. 54B, गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़ में स्थित आरोहण अकैडमी नर्सरी से कक्षा 8 तक के बच्चों को शांत, सुरक्षित और अवधारणा-आधारित ट्यूशन सहयोग प्रदान करती है।'}
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 items-center">
              <img
                src={BRAND_ASSETS.happyChildrenTeacher}
                alt="Aarohan Academy students and teacher"
                className="w-full h-48 sm:h-56 object-cover rounded-3xl border-4 border-white shadow-lg"
              />
              <img
                src={BRAND_ASSETS.confidentStudentGirl}
                alt="Confident student at Aarohan Academy"
                className="w-full h-48 sm:h-56 object-cover object-top rounded-3xl border-4 border-white shadow-lg bg-white"
              />
            </div>
          </div>
        </section>

        {/* Story & Meaning of Aarohan */}
        <section className="relative overflow-hidden py-16 lg:py-20">
          <SectionDoodleBackdrop variant="cool" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24476B]">
                {lang === 'en'
                  ? 'The Meaning of "Aarohan" (आरोहण): Rising Step by Step'
                  : '"आरोहण" का अर्थ: कदम-दर-कदम ऊपर उठना और निखरना'}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {lang === 'en'
                  ? 'In Sanskrit and Hindi, "Aarohan" means ascending, rising, or progressing upward. In music, Aarohan is the ascending scale of notes—each note building harmoniously on the one before it. We believe a child’s education works the exact same way.'
                  : 'संस्कृत और हिंदी में "आरोहण" का अर्थ है ऊपर चढ़ना, प्रगति करना और आगे बढ़ना। जिस प्रकार संगीत के आरोह में प्रत्येक स्वर पिछले स्वर के आधार पर ऊपर उठता है, उसी प्रकार बच्चे की शिक्षा भी मजबूत बुनियादी समझ के सहारे आगे बढ़ती है।'}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {lang === 'en'
                  ? 'When a child in Class 1 or 2 truly understands phonetic sounds, Hindi matras, and tens-and-ones place value, they do not fear fractions in Class 4 or algebra and science in Class 7. Our mission is to make sure no foundational stone is left shaky.'
                  : 'जब कोई बच्चा प्रारंभिक कक्षाओं में ध्वनि, मात्राओं और स्थानीय मान को सही ढंग से समझ लेता है, तो आगे की कक्षाओं में उसे भिन्न, बीजगणित या विज्ञान से डर नहीं लगता। हमारा उद्देश्य हर बच्चे की इसी बुनियाद को मजबूत करना है।'}
              </p>

              {/* Accurate Positioning Disclosure Card */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#24476B]">
                  {lang === 'en'
                    ? 'Transparent Academic Positioning'
                    : 'स्पष्ट शैक्षणिक भूमिका'}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {lang === 'en'
                    ? 'Aarohan Academy is a supplementary neighbourhood tuition and learning-support centre. We are not a formal school or CBSE examination board; instead, we work alongside your child’s school curriculum (aligned with NCERT textbooks, NCF-FS 2022, NCF-SE 2023, and NIPUN Bharat goals) to reinforce classroom learning.'
                    : 'आरोहण अकैडमी एक पूरक शिक्षण और ट्यूशन केंद्र है (कोई औपचारिक स्कूल या बोर्ड संस्थान नहीं)। हम NCERT की नई पुस्तकों, NCF-FS 2022, NCF-SE 2023 और निपुण भारत लक्ष्यों के अनुरूप बच्चे के स्कूल के पाठ्यक्रम को गहराई से समझने में सहयोग करते हैं।'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
                <img
                  src={BRAND_ASSETS.realClassroomFloor}
                  alt="Aarohan Academy classroom session"
                  className="w-full h-72 object-cover"
                />
                <div className="p-5 bg-white">
                  <p className="text-sm font-extrabold text-[#24476B]">
                    {lang === 'en'
                      ? 'Small Batches Capped at 15–20 Students'
                      : 'प्रति बैच केवल 15–20 छात्रों की सीमित संख्या'}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {lang === 'en' ? ACADEMY_ADDRESS_EN : ACADEMY_ADDRESS_HI}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Classroom Environment & Child Safety Standards */}
        <section className="relative overflow-hidden py-16 bg-[#F8FAFC] border-t border-slate-200">
          <SectionDoodleBackdrop variant="mint" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24476B] mb-8">
              {lang === 'en'
                ? 'Our Classroom Standards & Neighbourhood Safety'
                : 'हमारी कक्षा के मानक और बाल सुरक्षा व्यवस्था'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: { en: 'Small Batch Cap (15–20)', hi: 'छोटा बैच (अधिकतम 15–20)' },
                  desc: {
                    en: 'Every learner sits within direct view of the educator for daily notebook and posture checks.',
                    hi: 'हर बच्चा शिक्षक की सीधी नज़र में बैठता है जिससे उसकी कॉपी और समझ पर पूरा ध्यान रहता है।',
                  },
                },
                {
                  title: { en: 'Safe Pickup & Handover', hi: 'सुरक्षित आवागमन' },
                  desc: {
                    en: 'Younger children (Nursery–Class 3) are handed over strictly to authorised parents or guardians.',
                    hi: 'छोटे बच्चों को छुट्टी के समय केवल उनके माता-पिता या अधिकृत अभिभावक को ही सौंपा जाता है।',
                  },
                },
                {
                  title: { en: 'Clean & Well-Ventilated', hi: 'स्वच्छ और हवादार कक्ष' },
                  desc: {
                    en: 'Bright lighting, clean drinking water, sanitised seating mats/desks, and a first-aid kit on premises.',
                    hi: 'पर्याप्त रोशनी, स्वच्छ पेयजल, साफ बैठने की व्यवस्था और प्राथमिक उपचार किट की उपलब्धता।',
                  },
                },
                {
                  title: { en: 'Zero-Fear Questioning', hi: 'बिना झिझक प्रश्न पूछने की स्वतंत्रता' },
                  desc: {
                    en: 'We never shame a child for not knowing an answer; mistakes are treated as stepping stones.',
                    hi: 'किसी प्रश्न का उत्तर न आने पर बच्चे को कभी हतोत्साहित नहीं किया जाता, बल्कि धैर्य से समझाया जाता है।',
                  },
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white/95 backdrop-blur-xs rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <ShieldCheck className="w-6 h-6 text-[#4CAF80] mb-3" />
                  <h3 className="text-base font-extrabold text-[#24476B]">
                    {card.title[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {card.desc[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ParentTestimonialsSection lang={lang} />

        <section className="relative overflow-hidden py-16 bg-white border-t border-slate-200">
          <SectionDoodleBackdrop variant="warm" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <EnquiryFormSection lang={lang} />
          </div>
        </section>
      </div>
    );
  }

  // ===========================================================================
  // 2. OUR TEACHING APPROACH PAGE
  // ===========================================================================
  if (page === 'approach') {
    return (
      <div className="bg-white">
        <section className="relative overflow-hidden bg-[#FFF8EB] py-14 lg:py-20 border-b border-slate-200/80">
          <PageHeroBackdrop />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#4CAF80]">
                {lang === 'en'
                  ? 'Pedagogy & Methodology'
                  : 'हमारी शिक्षण प्रणाली और वैज्ञानिक पद्धति'}
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24476B] mt-2 tracking-tight">
                {lang === 'en'
                  ? 'How We Turn Confusion Into Conceptual Clarity'
                  : 'हम रटने की आदत को बदलकर गहरी समझ कैसे विकसित करते हैं'}
              </h1>
              <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed">
                {lang === 'en'
                  ? 'Aligned with NCF-FS 2022, NCF-SE 2023, and NIPUN Bharat foundational literacy and numeracy principles, our teaching adapts to how children’s brains naturally learn at ages 3–6, 6–11, and 11–14.'
                  : 'NCF-FS 2022, NCF-SE 2023 और निपुण भारत के सिद्धांतों पर आधारित हमारी शिक्षण पद्धति 3–6 वर्ष, 6–11 वर्ष और 11–14 वर्ष के बच्चों की सीखने की स्वाभाविक क्षमता के अनुसार काम करती है।'}
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 items-center">
              <img
                src={BRAND_ASSETS.studentWithBooks}
                alt="Student learning with books"
                className="w-full h-48 sm:h-56 object-cover object-top rounded-3xl border-4 border-white shadow-lg bg-white"
              />
              <img
                src={BRAND_ASSETS.attentiveGirlsWriting}
                alt="Attentive students writing in notebooks"
                className="w-full h-48 sm:h-56 object-cover rounded-3xl border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* 4-Step Process + Interactive Visual Diagrams */}
        <section className="relative overflow-hidden py-16">
          <SectionDoodleBackdrop variant="mint" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24476B] mb-8">
              {lang === 'en'
                ? 'The 4-Step Aarohan Learning Loop'
                : 'आरोहण का 4-चरणीय शिक्षण चक्र'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {LEARNING_APPROACH_STEPS.map((s) => (
                <div
                  key={s.step}
                  className="rounded-3xl bg-white/95 backdrop-blur-xs border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="font-mono text-xs font-extrabold"
                      style={{ color: s.color }}
                    >
                      STEP {s.step}
                    </span>
                    <StepVisualDiagramBadge stepNumber={s.step} />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#24476B] mt-1">
                    {s.title[lang]}
                  </h3>
                  <p className="text-sm font-semibold text-slate-800 mt-2">
                    {s.description[lang]}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {s.detail[lang]}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <InteractiveConceptDiagramsSection lang={lang} />
            </div>
          </div>
        </section>

        {/* Deep Pedagogical Pillars */}
        <section className="relative overflow-hidden py-16 bg-[#F8FAFC] border-y border-slate-200">
          <SectionDoodleBackdrop variant="cool" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24476B]">
              {lang === 'en'
                ? 'Core Instructional Methods Across Subjects'
                : 'विभिन्न विषयों में हमारी मुख्य शिक्षण विधियाँ'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/95 backdrop-blur-xs rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <p className="text-xs font-bold uppercase tracking-wider text-[#36A9E1]">
                  Mathematics
                </p>
                <h3 className="text-xl font-extrabold text-[#24476B] mt-1">
                  {lang === 'en'
                    ? 'Concrete – Pictorial – Abstract (CPA)'
                    : 'मूर्त – चित्र – अमूर्त (CPA पद्धति)'}
                </h3>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {lang === 'en'
                    ? '1. Concrete: Children group physical counters, beads, or folded paper strips. 2. Pictorial: They draw number lines, bar models, or area grids. 3. Abstract: They solve symbolic sums and equations with complete understanding.'
                    : '1. मूर्त (Concrete): बच्चे वस्तुओं, तीलियों या कागज की पट्टियों से गिनते हैं। 2. चित्र (Pictorial): वे संख्या रेखा या चित्र मॉडल बनाते हैं। 3. अमूर्त (Abstract): अंत में वे अंकों और सूत्रों से सवाल हल करते हैं।'}
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-xs rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F47B45]">
                  English & Hindi
                </p>
                <h3 className="text-xl font-extrabold text-[#24476B] mt-1">
                  {lang === 'en'
                    ? 'Synthetic Phonics & Bilingual Bridging'
                    : 'फोनेटिक्स और द्विभाषी भाषा सेतु'}
                </h3>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {lang === 'en'
                    ? 'We connect English phonetic decoding with Hindi Varnamala and Matra awareness. Students practise daily aloud reading (Vachan Praveen) and grammar in real sentences rather than memorising isolated definitions.'
                    : 'हम अंग्रेजी फोनेटिक्स को हिंदी वर्णमाला और मात्राओं की ध्वनि के साथ जोड़ते हैं। बच्चे परिभाषाएँ रटने के बजाय वाक्यों के प्रयोग से व्याकरण और धाराप्रवाह पठन सीखते हैं।'}
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-xs rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <p className="text-xs font-bold uppercase tracking-wider text-[#4CAF80]">
                  Science, EVS & Reasoning
                </p>
                <h3 className="text-xl font-extrabold text-[#24476B] mt-1">
                  {lang === 'en'
                    ? 'Inquiry, Diagrams & Unplugged Logic'
                    : 'अवलोकन, नामांकित चित्र और तार्किक सोच'}
                </h3>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {lang === 'en'
                    ? 'Students conduct safe tabletop observations, draw labelled scientific diagrams, mark maps, and solve unplugged computational thinking puzzles (sequencing, patterns, step-by-step decomposition).'
                    : 'छात्र सुरक्षित अवलोकन, नामांकित विज्ञान चित्र, मानचित्र अभ्यास और बिना कंप्यूटर के तार्किक पहेलियों (पैटर्न और क्रमबद्ध सोच) का अभ्यास करते हैं।'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-16">
          <SectionDoodleBackdrop variant="warm" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <EnquiryFormSection lang={lang} />
          </div>
        </section>
      </div>
    );
  }

  // ===========================================================================
  // 3. ALL PROGRAMMES OVERVIEW + NURSERY–CLASS 8 CURRICULUM MATRIX
  // ===========================================================================
  if (page === 'programmes') {
    const filteredMatrix =
      selectedMatrixStage === 'All'
        ? GRADE_WISE_MATRIX
        : GRADE_WISE_MATRIX.filter((row) =>
            row.stageName.en.toLowerCase().includes(selectedMatrixStage.toLowerCase())
          );

    return (
      <div className="bg-white">
        <section className="relative overflow-hidden bg-[#FFF8EB] py-14 lg:py-20 border-b border-slate-200/80">
          <PageHeroBackdrop />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#F47B45]">
                {lang === 'en'
                  ? 'Nursery to Class 8 Academic Blueprint'
                  : 'नर्सरी से कक्षा 8 तक का पूर्ण शैक्षणिक पाठ्यक्रम'}
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24476B] mt-2 tracking-tight">
                {lang === 'en'
                  ? 'Our Learning Programmes & Grade-Wise Curriculum Matrix'
                  : 'हमारे शिक्षण कार्यक्रम और कक्षा-वार पाठ्यक्रम तालिका'}
              </h1>
              <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed">
                {lang === 'en'
                  ? 'Explore our four age-specific programme tracks and inspect the complete grade-by-grade learning matrix aligned with the latest NCERT 2026–27 textbooks (Mridang, Sarangi, Joyful Mathematics, Santoor, Veena, Maths Mela, Poorvi, Malhar, Ganita Prakash, Curiosity, Exploring Society).'
                  : 'हमारे चार आयु-वार शिक्षण कार्यक्रमों को जानें और नई NCERT 2026–27 पुस्तकों (मृदंग, सारंगी, जॉयफुल मैथमेटिक्स, संतूर, वीणा, मैथ्स मेला, पूर्वी, मल्हार, गणित प्रकाश, क्यूरियोसिटी, एक्सप्लोरिंग सोसाइटी) के अनुरूप कक्षा-वार तालिका देखें।'}
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <img
                src={BRAND_ASSETS.educational3DIllustration}
                alt="3D Educational Curriculum Illustration"
                className="w-64 sm:w-72 h-auto object-contain rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* 4 Dedicated Track Cards with Photos */}
        <section className="relative overflow-hidden py-14">
          <SectionDoodleBackdrop variant="cool" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(
                [
                  'prog-early',
                  'prog-primary-1-2',
                  'prog-primary-3-5',
                  'prog-middle-6-8',
                ] as const
              ).map((stageKey, idx) => {
                const st = PROGRAMME_STAGE_DETAILS[stageKey];
                const trackPhotos = [
                  BRAND_ASSETS.happyChildrenTeacher,
                  BRAND_ASSETS.studentWithBooks,
                  BRAND_ASSETS.attentiveGirlsWriting,
                  BRAND_ASSETS.confidentStudentGirl,
                ];
                return (
                  <div
                    key={st.id}
                    className="rounded-3xl border-2 p-5 sm:p-6 flex flex-col justify-between bg-white/95 backdrop-blur-xs shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                    style={{ borderColor: st.borderColor }}
                  >
                    <div>
                      <div className="h-36 rounded-2xl overflow-hidden mb-4 border border-slate-200">
                        <img
                          src={trackPhotos[idx % trackPhotos.length]}
                          alt={st.title[lang]}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                      <span
                        className="text-xs font-extrabold uppercase tracking-wider"
                        style={{ color: st.themeColor }}
                      >
                        {st.stageCode}
                      </span>
                      <h2 className="text-xl font-extrabold text-[#24476B] mt-1.5">
                        {st.title[lang]}
                      </h2>
                      <p className="text-xs font-bold text-slate-500 mt-1">
                        {st.classes[lang]} · {st.ageRange[lang]}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                        {st.subtitle[lang]}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => goTo(st.id)}
                      className="mt-6 w-full inline-flex items-center justify-center gap-1.5 bg-[#24476B] hover:bg-[#1b3652] text-white text-xs font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer"
                    >
                      <span>
                        {lang === 'en' ? 'Open Detailed Syllabus' : 'विस्तृत पाठ्यक्रम देखें'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            <NurturingYoungMindsStrip lang={lang} onNavigate={goTo} />
          </div>
        </section>

        {/* Grade-Wise Curriculum Matrix (Nursery to Class 8) */}
        <section className="relative overflow-hidden py-14 bg-[#F8FAFC] border-y border-slate-200">
          <SectionDoodleBackdrop variant="sunrise" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#24476B]">
                  {lang === 'en'
                    ? 'Complete Grade-Wise Curriculum Matrix (Nursery to Class 8)'
                    : 'नर्सरी से कक्षा 8 तक का कक्षा-वार पाठ्यक्रम विवरण'}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {lang === 'en'
                    ? 'Includes NCERT textbook mapping, core learning outcomes, common student learning gaps we fix, and home support tips.'
                    : 'NCERT पुस्तकें, मुख्य शिक्षण लक्ष्य, छात्रों की सामान्य कठिनाइयाँ और घर पर अभ्यास के सुझाव।'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'All', label: lang === 'en' ? 'All 11 Classes' : 'सभी 11 कक्षाएँ' },
                  { key: 'Aarambh', label: 'Nursery–UKG' },
                  { key: 'Aadhar', label: 'Classes 1–5' },
                  { key: 'Aagey', label: 'Classes 6–8' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSelectedMatrixStage(tab.key)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      selectedMatrixStage === tab.key
                        ? 'bg-[#24476B] text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredMatrix.map((row, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-lg sm:text-xl font-extrabold text-[#24476B]">
                        {row.grade[lang]}
                      </span>
                      <span className="text-xs font-bold text-[#36A9E1]">
                        · {row.age[lang]} · {row.stageName[lang]}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                      {row.ncertBooks[lang]}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-[#24476B]">
                        {lang === 'en'
                          ? 'Core Objectives & Topics'
                          : 'मुख्य विषय और शिक्षण लक्ष्य'}
                      </p>
                      <p className="text-xs font-bold text-[#F47B45] mt-1">
                        {row.coreFocus[lang]}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {row.objectivesAndTopics[lang]}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-[#24476B]">
                        {lang === 'en'
                          ? 'Common Gaps We Address'
                          : 'सामान्य कठिनाइयाँ जिन्हें हम सुधारते हैं'}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {row.commonGaps[lang]}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-[#4CAF80]">
                        {lang === 'en'
                          ? 'Assessment & Home Support'
                          : 'मूल्यांकन और घर पर सहयोग'}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {row.assessmentAndHomeSupport[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-16">
          <SectionDoodleBackdrop variant="warm" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <EnquiryFormSection lang={lang} />
          </div>
        </section>
      </div>
    );
  }

  // ===========================================================================
  // 4. DEDICATED STAGE PAGES (prog-early, prog-primary-1-2, prog-primary-3-5, prog-middle-6-8)
  // ===========================================================================
  if (
    page === 'prog-early' ||
    page === 'prog-primary-1-2' ||
    page === 'prog-primary-3-5' ||
    page === 'prog-middle-6-8'
  ) {
    const stageData = PROGRAMME_STAGE_DETAILS[page];
    const stageClassFilter =
      page === 'prog-early'
        ? 'Nursery to UKG'
        : page === 'prog-primary-1-2'
          ? 'Classes 1–2'
          : page === 'prog-primary-3-5'
            ? 'Classes 3–5'
            : 'Classes 6–8';

    const matchingWorksheets = LIBRARY_RESOURCES.filter(
      (r) => r.classGroup === stageClassFilter
    ).slice(0, 4);

    return (
      <div className="bg-white">
        {/* Stage Hero with Stage Photograph */}
        <section
          className="relative overflow-hidden py-14 lg:py-20 border-b border-slate-200"
          style={{ backgroundColor: stageData.accentBg }}
        >
          <PageHeroBackdrop />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <button
                type="button"
                onClick={() => goTo('programmes')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#24476B] hover:text-[#36A9E1] mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>
                  {lang === 'en' ? 'Back to All Programmes' : 'सभी कार्यक्रमों पर वापस जाएँ'}
                </span>
              </button>

              <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-wider">
                <span style={{ color: stageData.themeColor }}>{stageData.stageCode}</span>
                <span>·</span>
                <span className="text-[#24476B]">{stageData.classes[lang]}</span>
                <span>·</span>
                <span className="text-slate-600">{stageData.ageRange[lang]}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24476B] mt-2 tracking-tight">
                {stageData.title[lang]}
              </h1>
              <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed">
                {stageData.subtitle[lang]}
              </p>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                {stageData.summary[lang]}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white">
                <img
                  src={
                    page === 'prog-early'
                      ? BRAND_ASSETS.happyChildrenTeacher
                      : page === 'prog-primary-1-2'
                        ? BRAND_ASSETS.studentWithBooks
                        : page === 'prog-primary-3-5'
                          ? BRAND_ASSETS.attentiveGirlsWriting
                          : BRAND_ASSETS.confidentStudentGirl
                  }
                  alt={stageData.title[lang]}
                  className="w-full h-64 sm:h-72 object-cover object-top"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Topics & Syllabus Breakdown */}
        <section className="relative overflow-hidden py-16">
          <SectionDoodleBackdrop variant="cool" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
            {/* Subjects Covered */}
            <div>
              <h2 className="text-2xl font-extrabold text-[#24476B] mb-4">
                {lang === 'en' ? 'Subjects & Domains Covered' : 'पढ़ाए जाने वाले मुख्य विषय'}
              </h2>
              <div className="flex flex-wrap gap-3">
                {stageData.subjectsCovered.map((sub, i) => (
                  <div
                    key={i}
                    className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-[#24476B]"
                  >
                    {sub[lang]}
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Breakdown Grid */}
            <div>
              <h2 className="text-2xl font-extrabold text-[#24476B] mb-6">
                {lang === 'en'
                  ? 'Detailed Curriculum & Skill Focus'
                  : 'विस्तृत पाठ्यक्रम और कौशल विकास'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stageData.coreTopics.map((cat, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl border border-slate-200 p-6 bg-white shadow-xs"
                  >
                    <h3 className="text-lg font-extrabold text-[#24476B]">
                      {cat.category[lang]}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {cat.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                        >
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: stageData.themeColor }}
                          />
                          <span>{item[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Classroom Activities & Common Gaps Addressed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-3xl bg-[#F8FAFC] border border-slate-200 p-6 sm:p-7">
                <h3 className="text-xl font-extrabold text-[#24476B]">
                  {lang === 'en'
                    ? 'Classroom Activities in This Stage'
                    : 'इस स्तर की प्रमुख कक्षा गतिविधियाँ'}
                </h3>
                <ul className="mt-4 space-y-3">
                  {stageData.classroomActivities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Sparkles className="w-4 h-4 text-[#F47B45] shrink-0 mt-0.5" />
                      <span>{act[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-[#FFF8EB] border border-[#FFC845]/50 p-6 sm:p-7">
                <h3 className="text-xl font-extrabold text-[#24476B]">
                  {lang === 'en'
                    ? 'Common Learning Gaps We Fix'
                    : 'छात्रों की सामान्य कठिनाइयाँ जिन्हें हम दूर करते हैं'}
                </h3>
                <ul className="mt-4 space-y-3">
                  {stageData.commonGapsAddressed.map((gap, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#4CAF80] shrink-0 mt-0.5" />
                      <span>{gap[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Matching Printable Worksheets for This Stage */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-extrabold text-[#24476B]">
                  {lang === 'en'
                    ? `Sample Printable Worksheets for ${stageData.classes.en}`
                    : `${stageData.classes.hi} के लिए नमूना अभ्यास वर्कशीट`}
                </h3>
                <button
                  type="button"
                  onClick={() => goTo('library')}
                  className="text-xs sm:text-sm font-bold text-[#36A9E1] hover:underline cursor-pointer"
                >
                  {lang === 'en' ? 'View All 30 Sheets →' : 'सभी 30 वर्कशीट देखें →'}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {matchingWorksheets.map((res) => (
                  <div
                    key={res.id}
                    className="rounded-2xl border border-slate-200 p-5 flex flex-col justify-between bg-white"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#36A9E1]">
                        {res.subject} · {res.difficulty}
                      </span>
                      <h4 className="text-base font-extrabold text-[#24476B] mt-1">
                        {res.title[lang]}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5">{res.objective[lang]}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenWorksheet(res)}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#24476B] hover:text-[#F47B45] cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>
                        {lang === 'en' ? 'Preview & Print' : 'वर्कशीट देखें'}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-16 bg-slate-50 border-t border-slate-200">
          <SectionDoodleBackdrop variant="warm" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <EnquiryFormSection
              lang={lang}
              defaultProgramme={stageData.title.en}
            />
          </div>
        </section>
      </div>
    );
  }

  // ===========================================================================
  // 5. SUBJECT-WISE LEARNING & ENRICHMENT PAGE
  // ===========================================================================
  if (page === 'subjects') {
    return (
      <div className="bg-white">
        <section className="relative overflow-hidden bg-[#FFF8EB] py-14 lg:py-20 border-b border-slate-200/80">
          <PageHeroBackdrop />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#36A9E1]">
                {lang === 'en'
                  ? 'Subject-Wise Tuition & Skill Enrichment'
                  : 'विषय-वार शिक्षण और कौशल संवर्धन'}
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24476B] mt-2 tracking-tight">
                {lang === 'en'
                  ? 'Deep Subject Mastery Across English, Hindi, Maths, EVS, Science & SST'
                  : 'अंग्रेजी, हिंदी, गणित, EVS, विज्ञान और सामाजिक विज्ञान में गहरी समझ'}
              </h1>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 items-center">
              <img
                src={BRAND_ASSETS.classroomDesksChalkboard}
                alt="Classroom subject learning"
                className="w-full h-44 sm:h-52 object-cover rounded-3xl border-4 border-white shadow-lg"
              />
              <img
                src={BRAND_ASSETS.studentWithBooks}
                alt="Student with subject textbooks"
                className="w-full h-44 sm:h-52 object-cover object-top rounded-3xl border-4 border-white shadow-lg bg-white"
              />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-16">
          <SectionDoodleBackdrop variant="lavender" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
            {SUBJECT_DETAILS.map((subj) => (
              <div
                key={subj.id}
                className="rounded-3xl border border-slate-200 p-6 sm:p-8 bg-white/95 backdrop-blur-xs shadow-xs"
              >
                <div className="mb-5">
                  <SubjectVisualDiagramBanner subjectId={subj.id} />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <span
                      className="text-xs font-extrabold uppercase tracking-wider"
                      style={{ color: subj.accentHex }}
                    >
                      {subj.classes[lang]}
                    </span>
                    <h2 className="text-2xl font-extrabold text-[#24476B] mt-1">
                      {subj.name[lang]}
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 mt-4 leading-relaxed">
                  {subj.methodology[lang]}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {subj.stageBreakdown.map((st, i) => (
                    <div key={i} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                      <p className="text-xs font-extrabold text-[#24476B]">
                        {st.stage[lang]}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {st.focus[lang]}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                  <div className="text-xs sm:text-sm text-slate-700">
                    <span className="font-bold text-[#24476B]">
                      {lang === 'en' ? 'Classroom Activity: ' : 'कक्षा गतिविधि: '}
                    </span>
                    {subj.sampleActivity[lang]}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700">
                    <span className="font-bold text-[#F47B45]">
                      {lang === 'en' ? 'Practice Worksheet: ' : 'अभ्यास वर्कशीट: '}
                    </span>
                    {subj.sampleWorksheet[lang]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden py-16 bg-slate-50 border-t border-slate-200">
          <SectionDoodleBackdrop variant="warm" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <EnquiryFormSection lang={lang} />
          </div>
        </section>
      </div>
    );
  }

  // ===========================================================================
  // 6. ASSESSMENT & AAROHAN GROWTH JOURNEY PAGE
  // ===========================================================================
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#FFF8EB] py-14 lg:py-20 border-b border-slate-200/80">
        <PageHeroBackdrop />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#4CAF80]">
              {lang === 'en'
                ? 'Diagnostic Assessment & Parent Feedback'
                : 'प्रगति मूल्यांकन और अभिभावक रिपोर्ट'}
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24476B] mt-2 tracking-tight">
              {lang === 'en'
                ? 'How We Track Every Child’s Academic Growth'
                : 'हम प्रत्येक बच्चे की शैक्षणिक प्रगति को कैसे ट्रैक करते हैं'}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed">
              {lang === 'en'
                ? 'Explore the 4 stages of the Aarohan Growth Journey and interact with a sample Monthly Growth Note below.'
                : 'आरोहण विकास यात्रा के 4 चरणों को जानें और नीचे दिए गए "मासिक ग्रोथ नोट" के नमूने को देखें।'}
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <img
              src={BRAND_ASSETS.educational3DIllustration}
              alt="Diagnostic Assessment and Growth Tracking"
              className="w-60 sm:w-68 h-auto object-contain rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
        <SectionDoodleBackdrop variant="mint" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <GrowthReportPreview lang={lang} />
        </div>
      </section>

      <ParentTestimonialsSection lang={lang} />

      <section className="relative overflow-hidden py-16 bg-slate-50 border-t border-slate-200">
        <SectionDoodleBackdrop variant="warm" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <EnquiryFormSection lang={lang} />
        </div>
      </section>
    </div>
  );
};
