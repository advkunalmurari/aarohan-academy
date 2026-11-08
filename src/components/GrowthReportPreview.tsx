import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Info, Calendar, UserCheck, Target } from 'lucide-react';
import { Language } from '../utils/academyLogic';
import { BRAND_ASSETS } from '../data/academyData';

interface GrowthReportPreviewProps {
  lang: Language;
}

type SampleStageKey = 'early' | 'primary' | 'middle';

export const GrowthReportPreview: React.FC<GrowthReportPreviewProps> = ({ lang }) => {
  const [selectedSample, setSelectedSample] = useState<SampleStageKey>('primary');

  const samples: Record<
    SampleStageKey,
    {
      tabLabel: { en: string; hi: string };
      studentDemoLabel: { en: string; hi: string };
      classLabel: { en: string; hi: string };
      monthLabel: { en: string; hi: string };
      attendance: string;
      overallNote: { en: string; hi: string };
      domainChecks: {
        subject: { en: string; hi: string };
        topic: { en: string; hi: string };
        status: { en: string; hi: string };
        note: { en: string; hi: string };
      }[];
      strengths: { en: string; hi: string }[];
      focusAreas: { en: string; hi: string }[];
      nextGoals: { en: string; hi: string }[];
    }
  > = {
    early: {
      tabLabel: { en: 'Sample: UKG (Early Years)', hi: 'उदाहरण: UKG (प्रारंभिक स्तर)' },
      studentDemoLabel: { en: 'Aarav K. (Fictional Demo Profile)', hi: 'आरव के. (काल्पनिक उदाहरण प्रोफ़ाइल)' },
      classLabel: { en: 'UKG • Aarambh Stage', hi: 'UKG • आरंभ चरण' },
      monthLabel: { en: 'November Monthly Growth Note', hi: 'नवंबर मासिक प्रगति नोट' },
      attendance: '21 / 22 Sessions',
      overallNote: {
        en: 'Aarav participates happily in story circles and now blends 3-letter words with growing confidence.',
        hi: 'आरव कहानी सत्रों में उत्साह से भाग लेता है और अब 3-अक्षरों वाले सरल शब्द आत्मविश्वास से पढ़ने लगा है।',
      },
      domainChecks: [
        {
          subject: { en: 'English Phonics', hi: 'अंग्रेजी फोनेटिक्स' },
          topic: { en: 'Short Vowel CVC Blending (a, i, o)', hi: 'तीन अक्षरों के शब्द पढ़ना (a, i, o)' },
          status: { en: 'Confident', hi: 'अच्छी समझ' },
          note: { en: 'Reads cat, pin, dog, pot without guessing', hi: 'बिना अंदाज़ा लगाए ध्वनि जोड़कर पढ़ता है' },
        },
        {
          subject: { en: 'Hindi Varnamala', hi: 'हिंदी वर्णमाला' },
          topic: { en: 'Swar & Two-Letter Words (घर, जल, फल)', hi: 'स्वर और दो-अक्षर वाले शब्द (घर, जल, फल)' },
          status: { en: 'Confident', hi: 'अच्छी समझ' },
          note: { en: 'Recognises all swar and common vyanjan', hi: 'सभी स्वर और सामान्य व्यंजन पहचानता है' },
        },
        {
          subject: { en: 'Early Numeracy', hi: 'प्रारंभिक गणित' },
          topic: { en: 'Object Counting to 30 & Number Writing', hi: '30 तक वस्तु गिनती और अंक लेखन' },
          status: { en: 'Practising', hi: 'अभ्यास जारी' },
          note: { en: 'Counts accurately; practising writing 6 and 9 without reversal', hi: 'गिनती सही है; 6 और 9 को सीधा लिखने का अभ्यास जारी है' },
        },
      ],
      strengths: [
        { en: 'Speaks in complete sentences during picture-talk activities', hi: 'चित्र वार्ता के दौरान पूरे वाक्यों में अपनी बात कहता है' },
        { en: 'Comfortable tripod pencil grip and neat colouring control', hi: 'पेंसिल की सहज पकड़ और रंग भरने में अच्छा संतुलन' },
      ],
      focusAreas: [
        { en: 'Distinguishing lowercase "b" and "d" during writing', hi: 'लिखते समय अंग्रेजी के छोटे "b" और "d" के अंतर का अभ्यास' },
      ],
      nextGoals: [
        { en: 'Introduce short vowel "e" and "u" three-letter words (pen, sun)', hi: '"e" और "u" ध्वनि वाले तीन अक्षरों के शब्दों का पठन' },
        { en: 'Hands-on addition within 10 using counting beads', hi: 'मोतियों की सहायता से 10 तक जोड़ का व्यावहारिक अभ्यास' },
      ],
    },
    primary: {
      tabLabel: { en: 'Sample: Class 3 (Primary)', hi: 'उदाहरण: कक्षा 3 (प्राइमरी स्तर)' },
      studentDemoLabel: { en: 'Ananya S. (Fictional Demo Profile)', hi: 'अनन्या एस. (काल्पनिक उदाहरण प्रोफ़ाइल)' },
      classLabel: { en: 'Class 3 • Aadhar Stage', hi: 'कक्षा 3 • आधार चरण' },
      monthLabel: { en: 'November Monthly Growth Note', hi: 'नवंबर मासिक प्रगति नोट' },
      attendance: '22 / 22 Sessions',
      overallNote: {
        en: 'Ananya reads English and Hindi passages fluently and has overcome her hesitation with borrowing sums.',
        hi: 'अनन्या अंग्रेजी और हिंदी गद्यांश धाराप्रवाह पढ़ती है और हासिल वाले घटाव की झिझक अब दूर हो गई है।',
      },
      domainChecks: [
        {
          subject: { en: 'Mathematics', hi: 'गणित (Maths Mela)' },
          topic: { en: '3-Digit Subtraction with Regrouping & Tables 2–9', hi: '3-अंकीय हासिल वाला घटाव और 2–9 पहाड़े' },
          status: { en: 'Confident', hi: 'अच्छी समझ' },
          note: { en: 'Correctly regroups across zero (e.g. 405 - 168)', hi: 'शून्य से उधार लेने वाले घटाव (405 - 168) सही हल करती है' },
        },
        {
          subject: { en: 'English (Santoor)', hi: 'अंग्रेजी (संतूर)' },
          topic: { en: 'Story Comprehension & Paragraph Writing', hi: 'गद्यांश बोध और अनुच्छेद लेखन' },
          status: { en: 'Confident', hi: 'अच्छी समझ' },
          note: { en: 'Writes 6-line answers in her own words', hi: 'अपने शब्दों में 6 वाक्यों का स्पष्ट उत्तर लिखती है' },
        },
        {
          subject: { en: 'Hindi (Veena)', hi: 'हिंदी (वीणा)' },
          topic: { en: 'Sangya, Kriya & Shrutlekh (Dictation)', hi: 'संज्ञा, क्रिया और श्रुतलेख अभ्यास' },
          status: { en: 'Practising', hi: 'अभ्यास जारी' },
          note: { en: 'Improving accuracy between कि and की in sentences', hi: 'वाक्यों में "कि" और "की" के सही प्रयोग का अभ्यास जारी' },
        },
      ],
      strengths: [
        { en: 'Explains how she solved a math word problem aloud clearly', hi: 'गणित के इबारती सवाल को हल करने का तरीका स्पष्ट समझाती है' },
        { en: 'Very neat English and Hindi notebook work', hi: 'अंग्रेजी और हिंदी कॉपी का कार्य अत्यंत साफ और व्यवस्थित है' },
      ],
      focusAreas: [
        { en: 'Two-step word problems combining addition and subtraction', hi: 'जोड़ और घटाव दोनों को मिलाकर आने वाले दो-चरणीय इबारती सवाल' },
      ],
      nextGoals: [
        { en: 'Understand division as equal sharing and link with tables', hi: 'भाग (Division) को बराबर बाँटने के रूप में समझना' },
        { en: 'Visual fraction folding (1/2, 1/4, 3/4) and EVs plant diary', hi: 'कागज मोड़कर भिन्न (1/2, 1/4, 3/4) समझना' },
      ],
    },
    middle: {
      tabLabel: { en: 'Sample: Class 7 (Middle School)', hi: 'उदाहरण: कक्षा 7 (मिडिल स्कूल)' },
      studentDemoLabel: { en: 'Rohan M. (Fictional Demo Profile)', hi: 'रोहन एम. (काल्पनिक उदाहरण प्रोफ़ाइल)' },
      classLabel: { en: 'Class 7 • Aagey Stage', hi: 'कक्षा 7 • आगे चरण' },
      monthLabel: { en: 'November Monthly Growth Note', hi: 'नवंबर मासिक प्रगति नोट' },
      attendance: '20 / 22 Sessions',
      overallNote: {
        en: 'Rohan has shown steady improvement in framing algebraic equations and drawing labelled Science diagrams.',
        hi: 'रोहन ने बीजीय समीकरण बनाने और विज्ञान के नामांकित चित्र बनाने में बहुत अच्छा सुधार दिखाया है।',
      },
      domainChecks: [
        {
          subject: { en: 'Mathematics', hi: 'गणित (Ganita Prakash)' },
          topic: { en: 'Simple Linear Equations & Ratio/Percentage', hi: 'सरल रैखिक समीकरण और अनुपात/प्रतिशत' },
          status: { en: 'Confident', hi: 'अच्छी समझ' },
          note: { en: 'Frames equations from stories and checks LHS = RHS', hi: 'इबारती सवालों से समीकरण बनाकर उत्तर की जाँच करता है' },
        },
        {
          subject: { en: 'Science (Curiosity)', hi: 'विज्ञान (क्यूरियोसिटी)' },
          topic: { en: 'Acids, Bases & Heat Transfer Concepts', hi: 'अम्ल, क्षारक और ऊष्मा स्थानांतरण' },
          status: { en: 'Confident', hi: 'अच्छी समझ' },
          note: { en: 'Clear understanding of indicators & conduction/convection', hi: 'सूचकों और चालन/संवहन की स्पष्ट वैज्ञानिक समझ' },
        },
        {
          subject: { en: 'Social Science', hi: 'सामाजिक विज्ञान' },
          topic: { en: 'Medieval History Timelines & Structured 5-Mark Answers', hi: 'मध्यकालीन इतिहास समय-रेखा और 5-अंक के उत्तर' },
          status: { en: 'Practising', hi: 'अभ्यास जारी' },
          note: { en: 'Practising writing point-wise answers with underlined keywords', hi: 'मुख्य शब्दों को रेखांकित करते हुए बिंदुवार उत्तर लिखने का अभ्यास' },
        },
      ],
      strengths: [
        { en: 'Maintains a dedicated Mistake Log for negative integer signs', hi: 'ऋणात्मक चिह्नों की गलतियों को सुधारने के लिए मिस्टेक लॉग रखता है' },
        { en: 'Active participant in classroom science reasoning discussions', hi: 'विज्ञान के तार्किक प्रश्नों में सक्रिय रूप से भाग लेता है' },
      ],
      focusAreas: [
        { en: 'Writing concise 3-mark and 5-mark Social Science answers within time limits', hi: 'सामाजिक विज्ञान के बड़े उत्तरों को समय-सीमा में बिंदुवार लिखना' },
      ],
      nextGoals: [
        { en: 'Triangle properties, congruence rules, and perimeter/area applications', hi: 'त्रिभुज के गुण, सर्वांगसमता और क्षेत्रमिति का अभ्यास' },
        { en: 'Weekly 30-minute written revision paper in school exam format', hi: 'स्कूल परीक्षा पैटर्न पर साप्ताहिक 30-मिनट लिखित अभ्यास' },
      ],
    },
  };

  const current = samples[selectedSample];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Disclosure Banner */}
      <div className="bg-[#24476B] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-[#FFC845] shrink-0" />
          <div>
            <h3 className="text-base font-extrabold">
              {lang === 'en'
                ? 'Aarohan Monthly Growth Note (Interactive Sample Preview)'
                : 'आरोहण मासिक ग्रोथ नोट (उदाहरण पूर्वावलोकन)'}
            </h3>
            <p className="text-xs text-slate-200">
              {lang === 'en'
                ? 'Plain-language parent progress feedback without stressful rank comparisons.'
                : 'बिना किसी रैंक की तुलना के, सरल भाषा में अभिभावकों के लिए मासिक प्रगति जानकारी।'}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFC845] bg-white/10 px-3 py-1.5 rounded-lg shrink-0">
          <Info className="w-3.5 h-3.5" />
          <span>
            {lang === 'en'
              ? 'Fictional Demonstration Data Only'
              : 'केवल काल्पनिक उदाहरण डेटा'}
          </span>
        </span>
      </div>

      {/* Stage Selector Tabs */}
      <div className="px-6 pt-5 pb-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Growth report stage examples">
          {(['early', 'primary', 'middle'] as SampleStageKey[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={selectedSample === key}
              onClick={() => setSelectedSample(key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                selectedSample === key
                  ? 'bg-[#24476B] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {samples[key].tabLabel[lang]}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500">
          {lang === 'en'
            ? 'Shared monthly in person & via WhatsApp'
            : 'प्रत्येक माह अभिभावकों के साथ साझा किया जाने वाला प्रारूप'}
        </div>
      </div>

      {/* Report Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Student Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div className="flex items-center gap-3.5">
            <img
              src={BRAND_ASSETS.logo}
              alt="Aarohan Academy Emblem"
              className="w-12 h-12 object-contain shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="text-lg font-extrabold text-[#24476B]">
                {current.studentDemoLabel[lang]}
              </div>
              <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mt-0.5">
                <span>{current.classLabel[lang]}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#36A9E1]" />
                  {current.monthLabel[lang]}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#FFF8EB] border border-[#FFC845]/50 px-4 py-2.5 rounded-2xl">
            <UserCheck className="w-4 h-4 text-[#F47B45]" />
            <div className="text-xs">
              <div className="text-slate-500">
                {lang === 'en' ? 'Monthly Attendance' : 'मासिक उपस्थिति'}
              </div>
              <div className="font-bold text-[#24476B] font-mono tabular-nums">
                {current.attendance}
              </div>
            </div>
          </div>
        </div>

        {/* Educator Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
          <strong className="text-[#24476B] block mb-1">
            {lang === 'en' ? 'Educator’s Monthly Summary:' : 'शिक्षक की मासिक टिप्पणी:'}
          </strong>
          {current.overallNote[lang]}
        </div>

        {/* Topic-Wise Checks Table */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#24476B]">
            {lang === 'en'
              ? 'Topic-Wise Understanding Checks:'
              : 'विषय-वार समझ और अभ्यास की स्थिति:'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {current.domainChecks.map((check, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#36A9E1]">
                    {check.subject[lang]}
                  </span>
                  <span className="text-xs font-bold text-[#24476B]">
                    ✓ {check.status[lang]}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {check.topic[lang]}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {check.note[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths, Focus Areas & Next Goals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <h5 className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#4CAF80]" />
              <span>{lang === 'en' ? 'Observed Strengths' : 'बच्चे के मजबूत पक्ष'}</span>
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {current.strengths.map((s, idx) => (
                <li key={idx}>• {s[lang]}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF8EB] border border-[#FFC845]/60 space-y-2">
            <h5 className="text-xs font-extrabold text-[#24476B] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F47B45]" />
              <span>
                {lang === 'en' ? 'Areas We Are Reinforcing' : 'जिन विषयों पर अधिक अभ्यास जारी है'}
              </span>
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {current.focusAreas.map((f, idx) => (
                <li key={idx}>• {f[lang]}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-2">
            <h5 className="text-xs font-extrabold text-[#24476B] flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#36A9E1]" />
              <span>
                {lang === 'en' ? 'Next Month’s Learning Goals' : 'अगले माह के शिक्षण लक्ष्य'}
              </span>
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {current.nextGoals.map((g, idx) => (
                <li key={idx}>• {g[lang]}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
