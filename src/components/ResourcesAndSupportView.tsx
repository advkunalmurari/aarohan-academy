import React, { useState } from 'react';
import {
  Search,
  Eye,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  RotateCcw,
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
  ACADEMY_ADDRESS_EN,
  ACADEMY_ADDRESS_HI,
} from '../utils/academyLogic';
import {
  BRAND_ASSETS,
  PARENT_CORNER_ARTICLES,
  FAQ_ITEMS,
  ArticleItem,
} from '../data/academyData';
import {
  LIBRARY_RESOURCES,
  WEEKLY_BRAIN_CHALLENGES,
} from '../data/libraryResourcesData';
import { EnquiryFormSection } from './EnquiryFormSection';
import { PageHeroBackdrop, SectionDoodleBackdrop } from './CreativeBackground';

interface ResourcesAndSupportViewProps {
  page: 'library' | 'parent-corner' | 'faqs' | 'admissions' | 'contact' | 'privacy';
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenWorksheet: (resource: LibraryResource) => void;
  onOpenArticle: (article: ArticleItem) => void;
}

export const ResourcesAndSupportView: React.FC<ResourcesAndSupportViewProps> = ({
  page,
  lang,
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
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string>('faq-classes');

  // ===========================================================================
  // 1. AAROHAN LEARNING LIBRARY (ALL 30 PRINTABLE RESOURCES + BRAIN CHALLENGES)
  // ===========================================================================
  if (page === 'library') {
    const filteredResources = filterLibraryResources(LIBRARY_RESOURCES, libraryFilter);
    const uniqueTopics = Array.from(new Set(LIBRARY_RESOURCES.map((r) => r.topic)));

    const resetFilters = () => {
      setLibraryFilter({
        classFilter: 'All',
        subjectFilter: 'All',
        topicFilter: 'All',
        difficultyFilter: 'All',
        searchQuery: '',
      });
    };

    return (
      <div className="bg-white">
        <section className="relative overflow-hidden bg-[#FFF8EB] py-14 lg:py-20 border-b border-slate-200/80">
          <PageHeroBackdrop />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#36A9E1]">
                {lang === 'en'
                  ? '30 Original A4 Practice Sheets · Nursery to Class 8'
                  : '30 मूल A4 अभ्यास वर्कशीट · नर्सरी से कक्षा 8'}
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24476B] mt-2 tracking-tight">
                {lang === 'en'
                  ? 'Aarohan Learning Library'
                  : 'आरोहण लर्निंग लाइब्रेरी (निःशुल्क अभ्यास संसाधन)'}
              </h1>
              <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed">
                {lang === 'en'
                  ? 'Browse, preview, and print 30 classroom-tested worksheets across English, Hindi, Mathematics, EVS, Science, Social Science, and Pre-writing. Every sheet includes bilingual instructions and a Parent Support Tip.'
                  : 'अंग्रेजी, हिंदी, गणित, EVS, विज्ञान, सामाजिक विज्ञान और लेखन-पूर्व कौशल की 30 वर्कशीट देखें और प्रिंट करें। प्रत्येक शीट में द्विभाषी निर्देश और अभिभावकों के लिए सुझाव शामिल हैं।'}
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 items-center">
              <img
                src={BRAND_ASSETS.studentWithBooks}
                alt="Student with practice books"
                className="w-full h-44 sm:h-52 object-cover object-top rounded-3xl border-4 border-white shadow-lg bg-white"
              />
              <img
                src={BRAND_ASSETS.educational3DIllustration}
                alt="3D Educational Resources"
                className="w-full h-44 sm:h-52 object-cover rounded-3xl border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="relative overflow-hidden py-12">
          <SectionDoodleBackdrop variant="cool" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/90 mb-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                <div>
                  <label
                    htmlFor="lib-page-class"
                    className="block text-xs font-bold text-[#24476B] mb-1"
                  >
                    {lang === 'en' ? 'Class Group' : 'कक्षा समूह'}
                  </label>
                  <select
                    id="lib-page-class"
                    value={libraryFilter.classFilter}
                    onChange={(e) =>
                      setLibraryFilter((prev) => ({ ...prev, classFilter: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 font-medium"
                  >
                    <option value="All">{lang === 'en' ? 'All Classes' : 'सभी कक्षाएँ'}</option>
                    <option value="Nursery to UKG">Nursery to UKG</option>
                    <option value="Classes 1–2">Classes 1–2</option>
                    <option value="Classes 3–5">Classes 3–5</option>
                    <option value="Classes 6–8">Classes 6–8</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="lib-page-subject"
                    className="block text-xs font-bold text-[#24476B] mb-1"
                  >
                    {lang === 'en' ? 'Subject' : 'विषय'}
                  </label>
                  <select
                    id="lib-page-subject"
                    value={libraryFilter.subjectFilter}
                    onChange={(e) =>
                      setLibraryFilter((prev) => ({ ...prev, subjectFilter: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 font-medium"
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
                    htmlFor="lib-page-topic"
                    className="block text-xs font-bold text-[#24476B] mb-1"
                  >
                    {lang === 'en' ? 'Skill / Topic' : 'कौशल / टॉपिक'}
                  </label>
                  <select
                    id="lib-page-topic"
                    value={libraryFilter.topicFilter}
                    onChange={(e) =>
                      setLibraryFilter((prev) => ({ ...prev, topicFilter: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 font-medium"
                  >
                    <option value="All">{lang === 'en' ? 'All Topics' : 'सभी टॉपिक'}</option>
                    {uniqueTopics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="lib-page-difficulty"
                    className="block text-xs font-bold text-[#24476B] mb-1"
                  >
                    {lang === 'en' ? 'Difficulty' : 'कठिनाई स्तर'}
                  </label>
                  <select
                    id="lib-page-difficulty"
                    value={libraryFilter.difficultyFilter}
                    onChange={(e) =>
                      setLibraryFilter((prev) => ({
                        ...prev,
                        difficultyFilter: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 font-medium"
                  >
                    <option value="All">{lang === 'en' ? 'All Levels' : 'सभी स्तर'}</option>
                    <option value="Start">Start</option>
                    <option value="Build">Build</option>
                    <option value="Challenge">Challenge</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="lib-page-search"
                    className="block text-xs font-bold text-[#24476B] mb-1"
                  >
                    {lang === 'en' ? 'Keyword Search' : 'खोजें'}
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="lib-page-search"
                      type="text"
                      value={libraryFilter.searchQuery}
                      onChange={(e) =>
                        setLibraryFilter((prev) => ({
                          ...prev,
                          searchQuery: e.target.value,
                        }))
                      }
                      placeholder={
                        lang === 'en' ? 'Search title or skill...' : 'शीर्षक या कौशल खोजें...'
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2.5 text-sm text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs text-slate-600">
                <span>
                  {lang === 'en'
                    ? `Showing ${filteredResources.length} of ${LIBRARY_RESOURCES.length} printable resources`
                    : `${LIBRARY_RESOURCES.length} में से ${filteredResources.length} अभ्यास संसाधन प्रदर्शित`}
                </span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 font-bold text-[#24476B] hover:text-[#F47B45] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Reset Filters' : 'फ़िल्टर रीसेट करें'}</span>
                </button>
              </div>
            </div>

            {/* Resources Grid */}
            {filteredResources.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-200">
                <p className="text-base font-bold text-[#24476B]">
                  {lang === 'en'
                    ? 'No worksheets match your current filters.'
                    : 'आपके द्वारा चुने गए फ़िल्टर से कोई वर्कशीट नहीं मिली।'}
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-3 inline-flex items-center gap-1.5 bg-[#24476B] text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
                >
                  {lang === 'en' ? 'Show All 30 Worksheets' : 'सभी 30 वर्कशीट दिखाएँ'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((res) => (
                  <div
                    key={res.id}
                    className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xs p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-[#36A9E1]">
                          #{String(res.id).padStart(2, '0')} · {res.classGroup}
                        </span>
                        <span className="text-slate-500">
                          {res.subject} · {res.topic} · {res.difficulty}
                        </span>
                      </div>
                      <h2 className="text-lg font-extrabold text-[#24476B] mt-2">
                        {res.title[lang]}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {res.objective[lang]}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <span className="text-xs text-slate-500 font-medium truncate">
                        {res.format[lang]}
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenWorksheet(res)}
                        className="inline-flex items-center gap-1.5 bg-[#24476B] hover:bg-[#1b3652] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'en'
                            ? 'Preview & Print'
                            : 'देखें व प्रिंट करें'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Weekly Brain Challenges Section */}
        <section className="relative overflow-hidden py-16 bg-[#1B3552] text-white">
          <SectionDoodleBackdrop variant="navy" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#FFC845]">
                {lang === 'en'
                  ? 'Ganit Gati · Weekly Brain Challenges'
                  : 'गणित गति · साप्ताहिक दिमागी पहेलियाँ'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                {lang === 'en'
                  ? 'Try This Week’s Classroom Logic Puzzles With Your Child'
                  : 'अपने बच्चे के साथ इस सप्ताह की तार्किक पहेलियाँ हल करें'}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {WEEKLY_BRAIN_CHALLENGES.map((ch) => {
                const hintShown = !!revealedHints[ch.id];
                const solShown = !!revealedSolutions[ch.id];
                return (
                  <div
                    key={ch.id}
                    className="rounded-3xl bg-white/10 border border-white/15 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#FFC845]">
                        {ch.stage[lang]}
                      </span>
                      <h3 className="text-xl font-extrabold text-white mt-1">
                        {ch.title[lang]}
                      </h3>
                      <p className="text-sm text-slate-200 mt-3 leading-relaxed">
                        {ch.puzzle[lang]}
                      </p>

                      {hintShown && (
                        <div className="mt-4 p-3.5 rounded-xl bg-white/10 border border-[#FFC845]/40 text-xs text-[#FFC845]">
                          <strong>{lang === 'en' ? 'Hint: ' : 'संकेत: '}</strong>
                          {ch.hint[lang]}
                        </div>
                      )}

                      {solShown && (
                        <div className="mt-3 p-3.5 rounded-xl bg-[#4CAF80]/20 border border-[#4CAF80]/50 text-xs text-white">
                          <strong>{lang === 'en' ? 'Answer: ' : 'उत्तर: '}</strong>
                          {ch.solution[lang]}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/15 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setRevealedHints((p) => ({ ...p, [ch.id]: !p[ch.id] }))
                        }
                        className="text-xs font-bold text-[#FFC845] hover:underline cursor-pointer"
                      >
                        {hintShown
                          ? lang === 'en'
                            ? 'Hide Hint'
                            : 'संकेत छिपाएँ'
                          : lang === 'en'
                            ? 'Show Hint'
                            : 'संकेत देखें'}
                      </button>
                      <span className="text-white/30">·</span>
                      <button
                        type="button"
                        onClick={() =>
                          setRevealedSolutions((p) => ({ ...p, [ch.id]: !p[ch.id] }))
                        }
                        className="text-xs font-bold text-[#4CAF80] hover:underline cursor-pointer"
                      >
                        {solShown
                          ? lang === 'en'
                            ? 'Hide Answer'
                            : 'उत्तर छिपाएँ'
                          : lang === 'en'
                            ? 'Reveal Answer'
                            : 'उत्तर देखें'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ===========================================================================
  // 2. PARENT CORNER PAGE (ALL 6 FULL BILINGUAL GUIDES)
  // ===========================================================================
  if (page === 'parent-corner') {
    return (
      <div className="bg-white">
        <section className="relative overflow-hidden bg-[#FFF8EB] py-14 lg:py-20 border-b border-slate-200/80">
          <PageHeroBackdrop />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#F47B45]">
                {lang === 'en'
                  ? 'Aarohan Parent Corner'
                  : 'अभिभावक कॉर्नर · व्यावहारिक मार्गदर्शिकाएँ'}
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24476B] mt-2 tracking-tight">
                {lang === 'en'
                  ? 'Practical Study & Parenting Guides for Najafgarh Families'
                  : 'बच्चों की पढ़ाई, आदतों और आत्मविश्वास के लिए उपयोगी लेख'}
              </h1>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 items-center">
              <img
                src={BRAND_ASSETS.happyChildrenTeacher}
                alt="Parent and Educator Partnership"
                className="w-full h-44 sm:h-52 object-cover rounded-3xl border-4 border-white shadow-lg"
              />
              <img
                src={BRAND_ASSETS.attentiveGirlsWriting}
                alt="Students developing strong study habits"
                className="w-full h-44 sm:h-52 object-cover rounded-3xl border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-16">
          <SectionDoodleBackdrop variant="sunrise" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
            {PARENT_CORNER_ARTICLES.map((article) => (
              <article
                key={article.id}
                className="rounded-3xl border border-slate-200 p-6 sm:p-8 bg-white shadow-xs"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#F47B45]">
                  <span>{article.category[lang]}</span>
                  <span>·</span>
                  <span className="text-slate-500">{article.readTime[lang]}</span>
                </div>

                <h2 className="text-2xl font-extrabold text-[#24476B] mt-2">
                  {article.title[lang]}
                </h2>

                <div className="mt-4 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {article.fullContent.map((para, i) => (
                    <p key={i}>{para[lang]}</p>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-slate-100">
                  <div className="lg:col-span-7 space-y-2">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#24476B]">
                      {lang === 'en' ? 'Key Takeaways:' : 'मुख्य बिंदु:'}
                    </p>
                    {article.keyTakeaways.map((kt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#4CAF80] shrink-0 mt-0.5" />
                        <span>{kt[lang]}</span>
                      </div>
                    ))}
                  </div>

                  <div className="lg:col-span-5 rounded-2xl bg-[#FFF8EB] border border-[#FFC845]/50 p-4">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#F47B45]">
                      {lang === 'en'
                        ? 'Try This Tonight at Home:'
                        : 'आज ही घर पर आज़माएँ:'}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-800 mt-1.5 leading-relaxed">
                      {article.homeActionTip[lang]}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // ===========================================================================
  // 3. FREQUENTLY ASKED QUESTIONS (FAQS) PAGE
  // ===========================================================================
  if (page === 'faqs') {
    const filteredFaqs =
      faqCategory === 'all'
        ? FAQ_ITEMS
        : FAQ_ITEMS.filter((f) => f.category === faqCategory);

    return (
      <div className="bg-white">
        <section className="relative overflow-hidden bg-[#FFF8EB] py-14 lg:py-20 border-b border-slate-200/80">
          <PageHeroBackdrop />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#36A9E1]">
              {lang === 'en' ? 'Parent Questions Answered' : 'अभिभावकों के सामान्य प्रश्न'}
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24476B] mt-2 tracking-tight">
              {lang === 'en'
                ? 'Frequently Asked Questions'
                : 'अक्सर पूछे जाने वाले प्रश्न (FAQs)'}
            </h1>
          </div>
        </section>

        <section className="relative overflow-hidden py-16">
          <SectionDoodleBackdrop variant="mint" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { id: 'all', label: lang === 'en' ? 'All Questions' : 'सभी प्रश्न' },
                { id: 'general', label: lang === 'en' ? 'General & Batch Size' : 'सामान्य और बैच' },
                { id: 'curriculum', label: lang === 'en' ? 'Classes & CBSE Syllabus' : 'कक्षाएँ और पाठ्यक्रम' },
                { id: 'progress', label: lang === 'en' ? 'Assessment & Feedback' : 'मूल्यांकन और रिपोर्ट' },
                { id: 'admissions', label: lang === 'en' ? 'Admissions & Timings' : 'प्रवेश और समय' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFaqCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    faqCategory === tab.id
                      ? 'bg-[#24476B] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-3.5">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left font-extrabold text-[#24476B] cursor-pointer text-sm sm:text-base"
                    >
                      <span>{faq.question[lang]}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#36A9E1]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-3.5 bg-white border-t border-slate-200/60 text-sm text-slate-600 leading-relaxed">
                        {faq.answer[lang]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
  // 4. PRIVACY POLICY & CHILD SAFETY PAGE (DPDP COMPLIANT)
  // ===========================================================================
  if (page === 'privacy') {
    return (
      <div className="bg-white">
        <section className="relative overflow-hidden bg-[#FFF8EB] py-14 lg:py-20 border-b border-slate-200/80">
          <PageHeroBackdrop />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#4CAF80]">
              {lang === 'en'
                ? 'Child Protection & Data Privacy (DPDP Framework)'
                : 'बाल सुरक्षा और डेटा गोपनीयता नीति'}
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24476B] mt-2 tracking-tight">
              {lang === 'en'
                ? 'Child Safety, Parent Consent & Privacy Policy'
                : 'बाल सुरक्षा, अभिभावक सहमति और गोपनीयता नीति'}
            </h1>
          </div>
        </section>

        <section className="relative overflow-hidden py-16">
          <SectionDoodleBackdrop variant="cool" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 leading-relaxed relative z-10">
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-extrabold text-[#24476B]">
                {lang === 'en'
                  ? '1. Data Minimization & Parent Consent (DPDP Act Alignment)'
                  : '1. न्यूनतम डेटा संग्रह और अभिभावकों की सहमति'}
              </h2>
              <p className="text-sm sm:text-base">
                {lang === 'en'
                  ? 'When you submit an enquiry at Aarohan Academy, we collect only the essential contact details required to respond to your admission or assessment request: Parent/Guardian Name, Mobile Number, Child’s Current Class, Preferred Programme, and any voluntary note you share.'
                  : 'जब आप आरोहण अकैडमी में पूछताछ फॉर्म भरते हैं, तो हम केवल आपसे संपर्क करने और उपयुक्त बैच की जानकारी देने के लिए आवश्यक विवरण (अभिभावक का नाम, मोबाइल नंबर, बच्चे की कक्षा और कार्यक्रम) ही एकत्र करते हैं।'}
              </p>
              <p className="text-sm sm:text-base">
                {lang === 'en'
                  ? 'We never sell, rent, or share parent phone numbers or student records with third-party marketers or external agencies. Parents may request correction or deletion of their enquiry data at any time by calling or messaging +91 9220357826.'
                  : 'हम अभिभावकों के फोन नंबर या छात्रों की जानकारी किसी भी बाहरी विज्ञापन एजेंसी के साथ कभी साझा नहीं करते। अभिभावक किसी भी समय +91 9220357826 पर संपर्क करके अपना डेटा हटाने का अनुरोध कर सकते हैं।'}
            </p>
            </div>

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-extrabold text-[#24476B]">
                {lang === 'en'
                  ? '2. Student Photograph & Identity Protection Policy'
                  : '2. छात्रों के चित्र और पहचान की सुरक्षा'}
              </h2>
              <p className="text-sm sm:text-base">
                {lang === 'en'
                  ? 'We respect every child’s privacy. We never publish a child’s full name paired with their school name, residential address, or personal academic scores on public websites or social media.'
                  : 'हम प्रत्येक बच्चे की गोपनीयता का सम्मान करते हैं। हम वेबसाइट पर किसी भी बच्चे का पूरा नाम, घर का पता या व्यक्तिगत अंक सार्वजनिक रूप से प्रदर्शित नहीं करते।'}
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-extrabold text-[#24476B]">
                {lang === 'en'
                  ? '3. Physical Classroom Safety at H.No. 49B, Gupta Park'
                  : '3. कक्षा के भीतर भौतिक सुरक्षा मानक'}
              </h2>
              <ul className="space-y-2.5 text-sm sm:text-base">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#4CAF80] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'en'
                      ? 'Supervised entry and exit: Young learners (Nursery to Class 3) are released only to parents or authorised family members.'
                      : 'सुरक्षित आगमन और प्रस्थान: छोटे बच्चों (नर्सरी से कक्षा 3) को केवल माता-पिता या अधिकृत परिवार के सदस्य को ही सौंपा जाता है।'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#4CAF80] shrink-0 mt-0.5" />
                  <span>
                    {lang === 'en'
                      ? 'Safe tabletop science activities: All primary and middle school demonstrations use non-hazardous household materials under direct educator supervision.'
                      : 'सुरक्षित विज्ञान गतिविधियाँ: सभी कक्षा प्रयोग केवल सुरक्षित घरेलू सामग्री और शिक्षक की सीधी देखरेख में कराए जाते हैं।'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ===========================================================================
  // 5. ADMISSIONS & CONTACT US PAGE ('admissions' | 'contact')
  // ===========================================================================
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#FFF8EB] py-14 lg:py-20 border-b border-slate-200/80">
        <PageHeroBackdrop />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#F47B45]">
              {lang === 'en'
                ? 'Admissions & Contact · Gupta Park, Todarmal Colony, Najafgarh'
                : 'प्रवेश और संपर्क · गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़'}
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#24476B] mt-2 tracking-tight">
              {lang === 'en'
                ? 'Book a Diagnostic Learning Assessment or Visit Our Centre'
                : 'प्रारंभिक कौशल मूल्यांकन बुक करें या हमारे केंद्र पर पधारें'}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed">
              {lang === 'en'
                ? 'We welcome parents from Gupta Park, Todarmal Colony, and nearby areas of Najafgarh to visit H.No. 49B, meet the educator, inspect our learning materials, and discuss their child’s academic goals.'
                : 'हम गुप्ता पार्क, टोडरमल कॉलोनी और नजफगढ़ के आसपास के अभिभावकों का स्वागत करते हैं कि वे मकान नं. 49B पर आकर शिक्षक से मिलें, हमारी अध्ययन सामग्री देखें और अपने बच्चे की पढ़ाई पर चर्चा करें।'}
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 items-center">
            <img
              src={BRAND_ASSETS.realClassroomFloor}
              alt="Aarohan Academy Classroom"
              className="w-full h-44 sm:h-52 object-cover rounded-3xl border-4 border-white shadow-lg"
            />
            <img
              src={BRAND_ASSETS.confidentStudentGirl}
              alt="Confident Student at Aarohan Academy"
              className="w-full h-44 sm:h-52 object-cover object-top rounded-3xl border-4 border-white shadow-lg bg-white"
            />
          </div>
        </div>
      </section>

      {/* 3-Step Simple Admission Process */}
      <section className="relative overflow-hidden py-14 bg-white border-b border-slate-200/70">
        <SectionDoodleBackdrop variant="mint" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl font-extrabold text-[#24476B] mb-6">
            {lang === 'en'
              ? 'How Our Simple 3-Step Admission Process Works'
              : 'हमारी सरल 3-चरणीय प्रवेश प्रक्रिया'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: {
                  en: 'Enquire via Form, Call or WhatsApp',
                  hi: '01. फॉर्म, कॉल या व्हाट्सऐप से संपर्क करें',
                },
                desc: {
                  en: 'Share your child’s class and school details below or message us on +91 9220357826 to fix a convenient afternoon/evening visiting slot.',
                  hi: 'नीचे दिए गए फॉर्म में बच्चे की कक्षा साझा करें या +91 9220357826 पर कॉल/व्हाट्सऐप करके मिलने का समय तय करें।',
                },
              },
              {
                step: '02',
                title: {
                  en: '15-Minute Friendly Skills Check',
                  hi: '02. 15-मिनट की सहज कौशल जाँच',
                },
                desc: {
                  en: 'Bring your child and their recent school notebooks. We conduct a calm, zero-pressure reading and maths check to understand their current comfort level.',
                  hi: 'बच्चे और उसकी स्कूल कॉपियों के साथ केंद्र पर आएँ। हम बिना किसी दबाव के पठन और गणित की बुनियादी समझ देखते हैं।',
                },
              },
              {
                step: '03',
                title: {
                  en: 'Small-Batch Allocation & Start',
                  hi: '03. उपयुक्त छोटे बैच में प्रवेश',
                },
                desc: {
                  en: 'We place your child in the right stage group (Aarambh, Aadhar, or Aagey) and share their personalized learning plan with you.',
                  hi: 'हम बच्चे को उपयुक्त समूह (आरंभ, आधार या आगे) में शामिल करते हैं और आपके साथ उसकी शिक्षण योजना साझा करते हैं।',
                },
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl bg-slate-50 border border-slate-200 p-6"
              >
                <span className="font-mono text-xs font-extrabold text-[#F47B45]">
                  STEP {item.step}
                </span>
                <h3 className="text-lg font-extrabold text-[#24476B] mt-2">
                  {item.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.desc[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Validated Enquiry Form & Contact Info */}
      <section className="relative overflow-hidden py-16">
        <SectionDoodleBackdrop variant="warm" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <EnquiryFormSection lang={lang} />
        </div>
      </section>
    </div>
  );
};
