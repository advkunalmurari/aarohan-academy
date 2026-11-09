import { PageId, ParentTestimonial } from '../utils/academyLogic';

export interface BilingualText {
  en: string;
  hi: string;
}

export interface ProgrammeStageDetail {
  id: PageId;
  stageCode: string;
  title: BilingualText;
  subtitle: BilingualText;
  classes: BilingualText;
  ageRange: BilingualText;
  themeColor: string;
  accentBg: string;
  borderColor: string;
  badgeColor: string;
  summary: BilingualText;
  philosophy: BilingualText;
  subjectsCovered: BilingualText[];
  coreTopics: { category: BilingualText; items: BilingualText[] }[];
  classroomActivities: BilingualText[];
  commonGapsAddressed: BilingualText[];
  assessmentApproach: BilingualText;
  parentPartnershipTips: BilingualText[];
  outcomePromise: BilingualText;
}

export interface GradeMatrixRow {
  grade: BilingualText;
  age: BilingualText;
  stageName: BilingualText;
  ncertBooks: BilingualText;
  coreFocus: BilingualText;
  objectivesAndTopics: BilingualText;
  commonGaps: BilingualText;
  assessmentAndHomeSupport: BilingualText;
}

export interface SubjectDetail {
  id: string;
  name: BilingualText;
  classes: BilingualText;
  accentHex: string;
  shortFocus: BilingualText;
  methodology: BilingualText;
  stageBreakdown: {
    stage: BilingualText;
    focus: BilingualText;
  }[];
  sampleActivity: BilingualText;
  sampleWorksheet: BilingualText;
}

export interface ArticleItem {
  id: string;
  category: BilingualText;
  readTime: BilingualText;
  title: BilingualText;
  excerpt: BilingualText;
  keyTakeaways: BilingualText[];
  fullContent: BilingualText[];
  homeActionTip: BilingualText;
}

export interface FaqItem {
  id: string;
  category: 'general' | 'curriculum' | 'admissions' | 'progress';
  question: BilingualText;
  answer: BilingualText;
}

export const BRAND_ASSETS = {
  logo: '/assets/aistudio/Logo_6217babd.png',
  realClassroomFloor: '/assets/aistudio/images__1__6c7a0e55.jpeg',
  happyChildrenTeacher: '/assets/aarohan_students_learning.jpg',
  attentiveGirlsWriting: '/assets/aistudio/aee644715e4b44adfb85446b4aeeb1c7_27714f12.jpg',
  classroomDesksChalkboard: '/assets/aistudio/4d761013b970774a3c12cfff719cd418_4eb768d9.jpg',
  confidentStudentGirl: '/assets/aistudio/images__2__35ec12f0.jpeg',
  studentWithBooks: '/assets/aistudio/images__3__68f9f357.jpeg',
  educational3DIllustration: '/assets/aistudio/Screenshot_2026-11-08_at_11.07.35_PM_cbe3b78a.png',
};

export const TRUST_HIGHLIGHTS: { title: BilingualText; subtitle: BilingualText }[] = [
  {
    title: { en: 'Nursery to Class 8', hi: 'नर्सरी से कक्षा 8 तक' },
    subtitle: {
      en: 'Dedicated foundational, primary & middle school support',
      hi: 'फाउंडेशन, प्राइमरी और मिडिल स्कूल के लिए समर्पित शिक्षण',
    },
  },
  {
    title: { en: 'Small-Group Learning', hi: 'छोटे समूह में पढ़ाई' },
    subtitle: {
      en: 'Capped at 15–20 students per batch for personal attention',
      hi: 'व्यक्तिगत ध्यान के लिए प्रति बैच अधिकतम 15–20 छात्र',
    },
  },
  {
    title: { en: 'Concept-Based Teaching', hi: 'अवधारणा-आधारित शिक्षण' },
    subtitle: {
      en: 'Aligned with NCF-FS 2022, NCF-SE 2023 & CBSE school syllabus',
      hi: 'NCF-FS 2022, NCF-SE 2023 और CBSE स्कूल पाठ्यक्रम के अनुरूप',
    },
  },
  {
    title: { en: 'Regular Academic Practice', hi: 'नियमित शैक्षणिक अभ्यास' },
    subtitle: {
      en: 'Guided worksheets, reading fluency & error-pattern checks',
      hi: 'निर्देशित वर्कशीट, पठन अभ्यास और गलतियों का सुधार',
    },
  },
  {
    title: { en: 'Parent Communication', hi: 'अभिभावकों से निरंतर संवाद' },
    subtitle: {
      en: 'Transparent progress discussions & monthly growth notes',
      hi: 'पारदर्शी प्रगति चर्चा और मासिक ग्रोथ नोट',
    },
  },
];

export const WHY_AAROHAN_REASONS: {
  number: string;
  title: BilingualText;
  description: BilingualText;
  accentColor: string;
}[] = [
  {
    number: '01',
    title: { en: 'Individual Attention', hi: 'व्यक्तिगत ध्यान' },
    description: {
      en: 'Every child learns at a different pace. We observe how each student approaches reading, writing, and sums so no child feels left behind.',
      hi: 'हर बच्चा अपनी गति से सीखता है। हम ध्यान देते हैं कि प्रत्येक छात्र पढ़ने, लिखने और सवाल हल करने में कैसा कर रहा है ताकि कोई भी बच्चा पीछे न छूटे।',
    },
    accentColor: '#36A9E1',
  },
  {
    number: '02',
    title: { en: 'Small-Group Learning', hi: 'छोटे बैच में शिक्षण' },
    description: {
      en: 'Unlike crowded coaching halls, our residential classroom batches are strictly capped at 15–20 students so every learner sits in the front row.',
      hi: 'भीड़भाड़ वाले कोचिंग सेंटरों के विपरीत, हमारे बैच में केवल 15–20 छात्र होते हैं जिससे हर बच्चे को आगे बैठने और प्रश्न पूछने का अवसर मिलता है।',
    },
    accentColor: '#FFC845',
  },
  {
    number: '03',
    title: { en: 'Concept-Based Teaching', hi: 'रटने के बजाय समझ पर जोर' },
    description: {
      en: 'We use the Concrete–Pictorial–Abstract (CPA) approach so children understand the "why" behind mathematical rules and scientific ideas.',
      hi: 'हम मूर्त-चित्र-अमूर्त (CPA) पद्धति का उपयोग करते हैं ताकि बच्चे केवल उत्तर रटें नहीं, बल्कि गणित और विज्ञान के नियमों के पीछे का कारण समझें।',
    },
    accentColor: '#4CAF80',
  },
  {
    number: '04',
    title: { en: 'Structured Practice', hi: 'व्यवस्थित और नियमित अभ्यास' },
    description: {
      en: 'Concepts are reinforced through carefully designed A4 worksheets, reading passages, mental maths sprints, and guided writing exercises.',
      hi: 'विशेष रूप से तैयार की गई वर्कशीट, पठन अभ्यास, मानसिक गणित और लेखन अभ्यास के माध्यम से सीखे गए विषयों को पक्का किया जाता है।',
    },
    accentColor: '#F47B45',
  },
  {
    number: '05',
    title: { en: 'Regular Learning Checks', hi: 'नियमित समझ की जाँच' },
    description: {
      en: 'Through low-stress topic checks, oral questioning, and mistake-log reviews, we identify and bridge learning gaps before school exams.',
      hi: 'बिना तनाव के विषय-वार जाँच, मौखिक प्रश्नों और त्रुटि-विश्लेषण के द्वारा हम स्कूल परीक्षाओं से पहले ही सीखने की कमियों को दूर करते हैं।',
    },
    accentColor: '#24476B',
  },
  {
    number: '06',
    title: { en: 'Parent Communication', hi: 'अभिभावकों के साथ साझेदारी' },
    description: {
      en: 'Parents receive honest, jargon-free updates about what their child has mastered, what needs practice at home, and the next 2–3 learning goals.',
      hi: 'माता-पिता को सरल भाषा में स्पष्ट जानकारी दी जाती है कि बच्चे ने क्या सीख लिया है, घर पर किस विषय में अभ्यास चाहिए और अगले लक्ष्य क्या हैं।',
    },
    accentColor: '#36A9E1',
  },
];

export const LEARNING_APPROACH_STEPS: {
  step: string;
  title: BilingualText;
  description: BilingualText;
  detail: BilingualText;
  color: string;
}[] = [
  {
    step: '01',
    title: { en: 'Understand', hi: '01. समझें (Understand)' },
    description: {
      en: 'We introduce concepts in a simple and understandable way.',
      hi: 'हम विषयों और अवधारणाओं को सरल और सहज तरीके से समझाते हैं।',
    },
    detail: {
      en: 'Using stories, real-life examples, physical counters, and visual diagrams before introducing textbook definitions.',
      hi: 'किताबी परिभाषाओं से पहले कहानियों, दैनिक जीवन के उदाहरणों, वस्तुओं और चित्रों की मदद से विषय की नींव रखी जाती है।',
    },
    color: '#36A9E1',
  },
  {
    step: '02',
    title: { en: 'Practise', hi: '02. अभ्यास करें (Practise)' },
    description: {
      en: 'Children reinforce learning through guided exercises, worksheets and activities.',
      hi: 'बच्चे निर्देशित अभ्यास, वर्कशीट और गतिविधियों के माध्यम से सीखने को मजबूत करते हैं।',
    },
    detail: {
      en: 'Step-by-step practice where the educator sits alongside students to observe their method, handwriting, and reasoning.',
      hi: 'क्रमबद्ध अभ्यास जहाँ शिक्षक बच्चों के साथ बैठकर उनके हल करने के तरीके, लिखावट और तर्क को ध्यान से देखते हैं।',
    },
    color: '#FFC845',
  },
  {
    step: '03',
    title: { en: 'Review', hi: '03. समीक्षा करें (Review)' },
    description: {
      en: 'We check understanding through questions, practice and suitable assessments.',
      hi: 'हम प्रश्नों, अभ्यास और उपयुक्त मूल्यांकन के माध्यम से समझ की जाँच करते हैं।',
    },
    detail: {
      en: 'Instead of merely marking answers wrong, we diagnose whether an error came from a reading slip, place-value confusion, or concept gap.',
      hi: 'केवल सही-गलत का निशान लगाने के बजाय हम यह समझते हैं कि गलती पढ़ने में हुई, गणना में या अवधारणा समझने में।',
    },
    color: '#4CAF80',
  },
  {
    step: '04',
    title: { en: 'Grow', hi: '04. आगे बढ़ें (Grow)' },
    description: {
      en: 'We identify areas needing more support and plan the next learning steps.',
      hi: 'हम उन क्षेत्रों की पहचान करते हैं जहाँ अधिक सहयोग चाहिए और अगले कदम तय करते हैं।',
    },
    detail: {
      en: 'Setting 2–3 clear, achievable learning goals for the coming weeks and sharing practical home-support tips with parents.',
      hi: 'आने वाले सप्ताहों के लिए 2–3 स्पष्ट लक्ष्य निर्धारित करना और माता-पिता के साथ घर पर अभ्यास के सरल सुझाव साझा करना।',
    },
    color: '#F47B45',
  },
];

export const GROWTH_JOURNEY_STAGES: {
  stageNumber: string;
  stageName: BilingualText;
  sanskritName: BilingualText;
  classes: BilingualText;
  headline: BilingualText;
  whatWeWorkOn: BilingualText;
  signsOfGrowth: BilingualText[];
  color: string;
  targetPage: PageId;
}[] = [
  {
    stageNumber: 'Stage 1',
    stageName: { en: 'Explore', hi: 'चरण 1: खोजें (Explore)' },
    sanskritName: { en: 'Aarambh (Foundation)', hi: 'आरंभ (फाउंडेशन)' },
    classes: { en: 'Nursery to UKG', hi: 'नर्सरी, LKG और UKG' },
    headline: { en: '"I love to learn"', hi: '"मुझे सीखना पसंद है"' },
    whatWeWorkOn: {
      en: 'Phonics and sound awareness, storytelling, pre-writing hand strength, counting with objects, shapes, colours, and joyful classroom routines.',
      hi: 'ध्वनि और अक्षर पहचान, कहानियाँ, पेंसिल पकड़ने और लिखने की तैयारी, वस्तुओं से गिनती, आकार-रंग और खेल-आधारित गतिविधियाँ।',
    },
    signsOfGrowth: [
      { en: 'Child listens to and retells short stories enthusiastically', hi: 'बच्चा रुचि से कहानियाँ सुनता और सुनाता है' },
      { en: 'Recognises letter sounds and numerals up to 20–50', hi: 'अक्षरों की ध्वनि और 20–50 तक के अंक पहचानता है' },
      { en: 'Holds a crayon or pencil with a comfortable, steady grip', hi: 'पेंसिल या क्रेयॉन को सहज और सही पकड़ के साथ चलाता है' },
    ],
    color: '#FFC845',
    targetPage: 'prog-early',
  },
  {
    stageNumber: 'Stage 2',
    stageName: { en: 'Build', hi: 'चरण 2: नींव बनाएँ (Build)' },
    sanskritName: { en: 'Aadhar (Early Primary)', hi: 'आधार (प्रारंभिक प्राथमिक)' },
    classes: { en: 'Classes 1–2', hi: 'कक्षा 1 से 2' },
    headline: { en: '"I can read and count"', hi: '"मैं पढ़ और गिन सकता हूँ"' },
    whatWeWorkOn: {
      en: 'Decoding sentences fluently, Hindi matras, neat handwriting, place value (tens & ones), addition and subtraction with regrouping, and early EVS.',
      hi: 'सरल वाक्यों का धाराप्रवाह पठन, हिंदी मात्राएँ, साफ लिखावट, स्थानीय मान (दहाई-इकाई), हासिल वाले जोड़-घटाव और परिवेश ज्ञान।',
    },
    signsOfGrowth: [
      { en: 'Reads short 6–8 line passages aloud without guessing from pictures', hi: 'बिना अंदाज़ा लगाए 6–8 पंक्तियों के गद्यांश पढ़ लेता है' },
      { en: 'Writes 4–5 simple sentences independently in English and Hindi', hi: 'अंग्रेजी और हिंदी में 4–5 सरल वाक्य स्वयं लिखता है' },
      { en: 'Explains how they solved a two-digit sum aloud', hi: 'दो अंकों के जोड़-घटाव को हल करने का तरीका बता पाता है' },
    ],
    color: '#4CAF80',
    targetPage: 'prog-primary-1-2',
  },
  {
    stageNumber: 'Stage 3',
    stageName: { en: 'Strengthen', hi: 'चरण 3: मजबूत करें (Strengthen)' },
    sanskritName: { en: 'Aadhar (Preparatory Primary)', hi: 'आधार (प्राथमिक स्तर)' },
    classes: { en: 'Classes 3–5', hi: 'कक्षा 3 से 5' },
    headline: { en: '"I can think and explain"', hi: '"मैं सोच और समझा सकता हूँ"' },
    whatWeWorkOn: {
      en: 'Reading to learn, inferential comprehension, grammar in context, multiplication & division fluency, fractions, decimals, geometry, and EVS observation.',
      hi: 'गद्यांश समझकर उत्तर देना, व्यावहारिक व्याकरण, गुणा-भाग में निपुणता, भिन्न व दशमलव, ज्यामिति और पर्यावरण अवलोकन।',
    },
    signsOfGrowth: [
      { en: 'Answers "why" and "how" questions in their own words instead of rote copying', hi: 'रटने के बजाय अपने शब्दों में "क्यों" और "कैसे" वाले उत्तर लिखता है' },
      { en: 'Solves multi-step word problems using multiplication, division, and fractions', hi: 'गुणा, भाग और भिन्न के इबारती सवालों को समझकर हल करता है' },
      { en: 'Organises paragraphs, letters, and observation charts neatly', hi: 'अनुच्छेद, पत्र और प्रोजेक्ट कार्य को व्यवस्थित रूप से पूरा करता है' },
    ],
    color: '#36A9E1',
    targetPage: 'prog-primary-3-5',
  },
  {
    stageNumber: 'Stage 4',
    stageName: { en: 'Achieve', hi: 'चरण 4: निपुण बनें (Achieve)' },
    sanskritName: { en: 'Aagey (Middle School)', hi: 'आगे (मिडिल स्कूल)' },
    classes: { en: 'Classes 6–8', hi: 'कक्षा 6 से 8' },
    headline: { en: '"I can reason and revise"', hi: '"मैं तर्कपूर्ण सोच और दोहराव कर सकता हूँ"' },
    whatWeWorkOn: {
      en: 'Algebraic & geometric reasoning, integrated Science (Physics, Chemistry, Biology concepts), History/Geography/Civics analysis, structured answer-writing, and exam readiness.',
      hi: 'बीजगणित और ज्यामितीय तर्क, विज्ञान (भौतिकी, रसायन, जीव विज्ञान की अवधारणाएँ), सामाजिक विज्ञान मानचित्र व विश्लेषण, और परीक्षा लेखन कौशल।',
    },
    signsOfGrowth: [
      { en: 'Translates word problems into algebraic equations and justifies steps', hi: 'इबारती सवालों को समीकरणों में बदलकर प्रत्येक चरण का कारण बताता है' },
      { en: 'Explains scientific phenomena with labelled diagrams and clear notes', hi: 'नामांकित चित्रों और व्यवस्थित नोट्स के साथ वैज्ञानिक अवधारणाएँ स्पष्ट करता है' },
      { en: 'Follows a steady revision timetable and writes well-structured exam answers', hi: 'नियमित दोहराव समय-सारणी अपनाता है और परीक्षा में सटीक उत्तर लिखता है' },
    ],
    color: '#24476B',
    targetPage: 'prog-middle-6-8',
  },
];

export const PROGRAMME_STAGE_DETAILS: Record<
  'prog-early' | 'prog-primary-1-2' | 'prog-primary-3-5' | 'prog-middle-6-8',
  ProgrammeStageDetail
> = {
  'prog-early': {
    id: 'prog-early',
    stageCode: 'Aarambh • Stage 1',
    title: {
      en: 'Early Learning Programme (Nursery, LKG & UKG)',
      hi: 'प्रारंभिक शिक्षण कार्यक्रम (नर्सरी, LKG और UKG)',
    },
    subtitle: {
      en: 'Building early learning confidence through stories, phonics, numbers, colours, shapes, creative activities and playful learning experiences.',
      hi: 'कहानियों, फोनेटिक्स, संख्याओं, रंगों, आकारों और रचनात्मक खेल गतिविधियों के माध्यम से सीखने का आत्मविश्वास जगाना।',
    },
    classes: { en: 'Nursery | LKG | UKG', hi: 'नर्सरी | LKG | UKG' },
    ageRange: { en: 'Ages 3 to 6 Years', hi: 'आयु 3 से 6 वर्ष' },
    themeColor: '#F47B45',
    accentBg: '#FFF8EB',
    borderColor: '#FFC845',
    badgeColor: '#F47B45',
    summary: {
      en: 'Grounded in the National Curriculum Framework for Foundational Stage (NCF-FS 2022) and NCERT Jaadui Pitara principles, our Early Learning programme nurtures curiosity, speech, hand strength, and number readiness without early exam pressure.',
      hi: 'राष्ट्रीय पाठ्यचर्या रूपरेखा (NCF-FS 2022) और NCERT जादुई पिटारा के सिद्धांतों पर आधारित यह कार्यक्रम बिना किसी परीक्षा के दबाव के बच्चों में भाषा, संख्या ज्ञान और लेखन की सहज तैयारी कराता है।',
    },
    philosophy: {
      en: 'Young children learn best when their hands, eyes, and ears work together. We use short, engaging activity blocks combining rhymes, picture talk, clay/sand tracing, and object counting before introducing formal pencil work.',
      hi: 'छोटे बच्चे तब सबसे अच्छा सीखते हैं जब वे देखकर, सुनकर और छूकर अनुभव करते हैं। हम औपचारिक लेखन से पहले कविताओं, चित्र चर्चा, मिट्टी/रेत पर अक्षर बनाने और वस्तुओं की गिनती का उपयोग करते हैं।',
    },
    subjectsCovered: [
      { en: 'English Oral Language & Phonics', hi: 'अंग्रेजी मौखिक भाषा और फोनेटिक्स' },
      { en: 'Hindi Swar, Vyanjan & Rhymes', hi: 'हिंदी स्वर, व्यंजन परिचय और कविताएँ' },
      { en: 'Early Numeracy & Number Sense', hi: 'प्रारंभिक संख्या ज्ञान और गिनती' },
      { en: 'Pre-Writing & Fine Motor Skills', hi: 'लेखन-पूर्व अभ्यास और मोटर कौशल' },
      { en: 'Environmental & Self Awareness', hi: 'परिवेश और स्वयं की जागरूकता' },
    ],
    coreTopics: [
      {
        category: { en: 'Language, Phonics & Vocabulary', hi: 'भाषा, ध्वनि और शब्दावली' },
        items: [
          { en: 'Alphabet recognition & letter-sound association (A–Z phonics)', hi: 'अक्षर पहचान और ध्वनि संबंध (A–Z फोनेटिक्स)' },
          { en: 'Three-letter CVC word blending (cat, pin, sun) & early sight words in UKG', hi: 'तीन अक्षरों वाले सरल शब्द (cat, pin, sun) और साइट वर्ड्स (UKG)' },
          { en: 'Hindi Swar & Vyanjan recognition with picture vocabulary', hi: 'चित्रों के साथ हिंदी स्वर और व्यंजन की पहचान' },
          { en: 'Stories, rhymes, picture reading & speaking in 3–4 connected sentences', hi: 'कहानियाँ, कविताएँ, चित्र पठन और 3–4 वाक्यों में अपनी बात कहना' },
        ],
      },
      {
        category: { en: 'Early Mathematics & Patterns', hi: 'प्रारंभिक गणित और पैटर्न' },
        items: [
          { en: 'One-to-one object counting (1 to 10 in Nursery, 1 to 20 in LKG, up to 50+ in UKG)', hi: 'वस्तुओं के साथ सही गिनती (नर्सरी में 1–10, LKG में 1–20, UKG में 50 तक)' },
          { en: 'Comparing quantities (more/less, big/small, tall/short) & positions', hi: 'मात्राओं की तुलना (कम/ज्यादा, बड़ा/छोटा) और स्थिति ज्ञान' },
          { en: 'Shapes (circle, square, triangle, rectangle), colours & AB/ABC pattern building', hi: 'आकार, रंग पहचान और सरल पैटर्न (AB/ABC) बनाना' },
          { en: 'Hands-on addition and subtraction within 10 using beads and blocks (UKG)', hi: 'मोतियों और ब्लॉक्स की मदद से 10 तक जोड़ और घटाव (UKG)' },
        ],
      },
      {
        category: { en: 'Pre-Writing, Fine Motor & Creativity', hi: 'लेखन कौशल और रचनात्मकता' },
        items: [
          { en: 'Hand strength & pincer grip via clay modelling, tearing/pasting, and bead threading', hi: 'मिट्टी की आकृतियों और मोती पिरोने से उंगलियों की पकड़ मजबूत करना' },
          { en: 'Standing, sleeping, slanting lines, curves, and correct letter/number start points', hi: 'सीधी, तिरछी व घुमावदार रेखाएँ और अक्षर/अंक लिखने की सही शुरुआत' },
          { en: 'Self, family, body parts, seasons, community helpers, and good habits', hi: 'स्वयं, परिवार, शरीर के अंग, मौसम, सहायक और अच्छी आदतें' },
        ],
      },
    ],
    classroomActivities: [
      { en: 'Sound Walk & Phonics Flashcard Hunt around the learning room', hi: 'कक्षा में ध्वनि खोज और फोनेटिक्स फ्लैशकार्ड खेल' },
      { en: 'Sand/Salt Tray Letter Tracing & Clay Snakes for letter formation', hi: 'ट्रे में उंगली से अक्षर बनाना और क्ले से अक्षरों की आकृति बनाना' },
      { en: 'Button & Pebble Counting Mats for one-to-one number correspondence', hi: 'बटन और कंकड़ों की मदद से गिनती और संख्या मिलान' },
      { en: 'Story Circle with Picture Cards & "What Happens Next?" conversations', hi: 'चित्र कार्डों के साथ कहानी घेरा और "आगे क्या होगा?" संवाद' },
    ],
    commonGapsAddressed: [
      { en: 'Forcing neat writing before developing hand and finger strength', hi: 'उंगलियों की मजबूती से पहले लिखने का अत्यधिक दबाव डालना' },
      { en: 'Reciting numbers 1–50 by rote without being able to count 8 physical objects', hi: 'रटकर 1–50 बोल लेना पर सामने रखी वस्तुओं को सही न गिन पाना' },
      { en: 'Normal age-related letter/digit reversals (b/d, p/q, 6/9) handled gently', hi: 'b/d या 6/9 जैसे सामान्य अक्षर भ्रम को धैर्य और दृश्य अभ्यास से सुधारना' },
    ],
    assessmentApproach: {
      en: 'No formal exams or marks. We use gentle observation checklists, an informal entry sounds-and-numbers check, and a termly growth review shared with parents.',
      hi: 'कोई औपचारिक परीक्षा या अंक नहीं। हम अवलोकन सूची, प्रारंभिक ध्वनि व संख्या जाँच और अभिभावकों के साथ मासिक/तिमाही प्रगति चर्चा करते हैं।',
    },
    parentPartnershipTips: [
      { en: 'Spend 10 minutes daily reading picture books or singing rhymes together.', hi: 'रोज़ 10 मिनट बच्चे के साथ चित्रों वाली किताबें पढ़ें या कविताएँ गाएँ।' },
      { en: 'Count everyday items together—stairs, spoons, fruits, and toys.', hi: 'सीढ़ियाँ, चम्मच, फल और खिलौने जैसी रोज़मर्रा की चीजें साथ मिलकर गिनें।' },
      { en: 'Let your child scribble and colour freely with thick crayons to build grip.', hi: 'पकड़ मजबूत करने के लिए बच्चे को मोटे क्रेयॉन से खुलकर रंग भरने दें।' },
    ],
    outcomePromise: {
      en: 'A joyful, confident transition into Class 1 where the child recognises letter sounds, counts accurately, holds a pencil comfortably, and enjoys learning.',
      hi: 'कक्षा 1 में एक सहज और आत्मविश्वासपूर्ण प्रवेश, जहाँ बच्चा ध्वनियाँ पहचानता है, सही गिनती करता है और खुशी से सीखता है।',
    },
  },
  'prog-primary-1-2': {
    id: 'prog-primary-1-2',
    stageCode: 'Aadhar • Stage 2 (Early Primary)',
    title: {
      en: 'Early Primary Programme (Classes 1 & 2)',
      hi: 'प्रारंभिक प्राथमिक कार्यक्रम (कक्षा 1 और 2)',
    },
    subtitle: {
      en: 'Securing foundational literacy, bilingual reading fluency, neat writing, and concrete number sense up to 999.',
      hi: 'धाराप्रवाह पठन, हिंदी मात्राओं, सुंदर लिखावट और 999 तक संख्या व स्थानीय मान की पक्की समझ।',
    },
    classes: { en: 'Class 1 | Class 2', hi: 'कक्षा 1 | कक्षा 2' },
    ageRange: { en: 'Ages 6 to 8 Years', hi: 'आयु 6 से 8 वर्ष' },
    themeColor: '#4CAF80',
    accentBg: '#F0FDF4',
    borderColor: '#4CAF80',
    badgeColor: '#2E7D32',
    summary: {
      en: 'Aligned with NIPUN Bharat Foundational Literacy and Numeracy (FLN) goals and the new NCERT textbooks (Mridang, Sarangi, Joyful Mathematics), this stage turns early learners into independent readers and confident mathematical thinkers.',
      hi: 'निपुण भारत (NIPUN Bharat) के लक्ष्यों और नई NCERT पुस्तकों (मृदंग, सारंगी, जॉयफुल मैथमेटिक्स) के अनुरूप यह कार्यक्रम बच्चों को स्वतंत्र रूप से पढ़ने और गणितीय रूप से सोचने में सक्षम बनाता है।',
    },
    philosophy: {
      en: 'Classes 1 and 2 bridge pre-school play and primary school structure. We teach every mathematical idea using Concrete materials first (bundles of 10 sticks, coins), then Pictorial diagrams, and finally Abstract symbols.',
      hi: 'कक्षा 1 और 2 में हम प्रत्येक गणितीय अवधारणा को पहले ठोस वस्तुओं (तीसियों के बंडल, सिक्के), फिर चित्रों और अंत में अंकों व चिह्नों के माध्यम से सिखाते हैं।',
    },
    subjectsCovered: [
      { en: 'English (Mridang alignment)', hi: 'अंग्रेजी (मृदंग पाठ्यक्रम सहयोग)' },
      { en: 'Hindi (Sarangi alignment)', hi: 'हिंदी (सारंगी पाठ्यक्रम सहयोग)' },
      { en: 'Mathematics (Joyful Mathematics)', hi: 'गणित (जॉयफुल मैथमेटिक्स)' },
      { en: 'Early Environmental Awareness (EVS)', hi: 'प्रारंभिक पर्यावरण जागरूकता (EVS)' },
    ],
    coreTopics: [
      {
        category: { en: 'English Reading, Grammar & Writing', hi: 'अंग्रेजी पठन, व्याकरण और लेखन' },
        items: [
          { en: 'Phonics reinforcement, consonant blends, sight words & reading 6–8 line passages', hi: 'फोनेटिक्स अभ्यास, साइट वर्ड्स और 6–8 पंक्तियों के गद्यांश का धाराप्रवाह पठन' },
          { en: 'Basic comprehension (answering Who, What, Where questions in complete sentences)', hi: 'गद्यांश समझकर कौन, क्या और कहाँ वाले प्रश्नों के पूर्ण वाक्यों में उत्तर' },
          { en: 'Naming words (nouns), action words (verbs), and describing words (adjectives) in context', hi: 'संज्ञा, क्रिया और विशेषण शब्दों की संदर्भ सहित समझ' },
          { en: 'Picture-based sentence formation & guided 4–5 sentence paragraph writing', hi: 'चित्र देखकर वाक्य निर्माण और 4–5 वाक्यों का छोटा अनुच्छेद लेखन' },
        ],
      },
      {
        category: { en: 'Hindi Language & Matra Mastery', hi: 'हिंदी पठन, मात्रा ज्ञान और लेखन' },
        items: [
          { en: 'Varnamala fluency and systematic mastery of all Hindi matras (ा, ि, ी, ु, ू, े, ै, ो, ौ)', hi: 'वर्णमाला अभ्यास और सभी हिंदी मात्राओं की स्पष्ट पहचान व प्रयोग' },
          { en: 'Reading short stories from Sarangi & weekly word/sentence dictation (Shrutlekh)', hi: 'छोटी कहानियों का पठन और साप्ताहिक श्रुतलेख अभ्यास' },
        ],
      },
      {
        category: { en: 'Mathematics & Environmental Awareness', hi: 'गणित और पर्यावरण जागरूकता' },
        items: [
          { en: 'Number sense and Place Value (Tens & Ones up to 99 in Class 1; Hundreds up to 999 in Class 2)', hi: 'संख्या ज्ञान और स्थानीय मान (कक्षा 1 में 99 तक; कक्षा 2 में 999 तक)' },
          { en: 'Addition & subtraction with and without regrouping (carry/borrow) + intro to multiplication groups', hi: 'बिना हासिल और हासिल वाले जोड़-घटाव तथा गुणा की प्रारंभिक समझ' },
          { en: 'Shapes, patterns, measurement (hand-spans, length, weight), analog clock reading & money', hi: 'आकार, पैटर्न, मापन, घड़ी में समय देखना और मुद्रा (रुपये-पैसे) की समझ' },
          { en: 'EVS: Family, neighbourhood, plants, animals, food, water, seasons, and safety habits', hi: 'परिवार, पड़ोस, पेड़-पौधे, जीव-जंतु, भोजन, जल, मौसम और सुरक्षा आदतें' },
        ],
      },
    ],
    classroomActivities: [
      { en: 'Bundling Sticks into Tens & Ones on a Place-Value Mat', hi: 'स्थानीय मान मैट पर तीलियों के दहाई और इकाई बंडल बनाना' },
      { en: 'Classroom Shopkeeper Role-Play using play coins and notes', hi: 'नकली सिक्कों और नोटों के साथ दुकानदार-ग्राहक खेल द्वारा जोड़-घटाव' },
      { en: 'Daily 5-Minute Partner Reading & Picture Sequencing', hi: 'प्रतिदिन 5 मिनट साथ बैठकर पढ़ने का अभ्यास और चित्र क्रमबद्ध करना' },
      { en: 'Ask "How did you get that answer?" after every word sum', hi: 'प्रत्येक सवाल के बाद "आपने यह उत्तर कैसे निकाला?" पर चर्चा' },
    ],
    commonGapsAddressed: [
      { en: 'Guessing words from pictures instead of phonetically decoding them', hi: 'शब्दों को ध्वनि से पढ़ने के बजाय चित्र देखकर अंदाज़ा लगाना' },
      { en: 'Place-value confusion (writing 15 as 51 or treating the "1" in 14 as one instead of ten)', hi: 'स्थानीय मान का भ्रम (15 को 51 लिखना या दहाई के 1 को केवल 1 समझना)' },
      { en: 'Subtracting the smaller digit from the larger digit regardless of top/bottom position', hi: 'घटाव करते समय ऊपर-नीचे का ध्यान रखे बिना बड़ी संख्या से छोटी संख्या घटा देना' },
    ],
    assessmentApproach: {
      en: 'Weekly 1-minute reading fluency checks, hands-on place-value interviews, monthly comprehension sheets, and termly handwriting comparisons.',
      hi: 'साप्ताहिक 1-मिनट पठन जाँच, स्थानीय मान के व्यावहारिक प्रश्न, मासिक बोधगम्यता वर्कशीट और लिखावट की तुलनात्मक समीक्षा।',
    },
    parentPartnershipTips: [
      { en: 'Listen to your child read aloud for 10 minutes daily in English and Hindi.', hi: 'प्रतिदिन 10 मिनट बच्चे को अंग्रेजी और हिंदी में बोलकर पढ़ते हुए सुनें।' },
      { en: 'Practise reading the wall clock at home (o’clock and half-past times).', hi: 'घर की दीवार घड़ी में पूरा और आधा घंटा देखने का अभ्यास कराएँ।' },
      { en: 'Involve your child in small shopping calculations with ₹10, ₹20, and ₹50 notes.', hi: 'छोटी खरीदारी में ₹10, ₹20 और ₹50 के हिसाब-किताब में बच्चे को शामिल करें।' },
    ],
    outcomePromise: {
      en: 'By the end of Class 2, your child reads short passages with understanding, writes simple paragraphs legibly, and computes confidently within 100.',
      hi: 'कक्षा 2 के अंत तक बच्चा छोटे गद्यांश समझकर पढ़ता है, साफ लिखावट में छोटे अनुच्छेद लिखता है और 100 तक की गणना आत्मविश्वास से करता है।',
    },
  },
  'prog-primary-3-5': {
    id: 'prog-primary-3-5',
    stageCode: 'Aadhar • Stage 3 (Preparatory Primary)',
    title: {
      en: 'Primary Learning Programme (Classes 3, 4 & 5)',
      hi: 'प्राथमिक शिक्षण कार्यक्रम (कक्षा 3, 4 और 5)',
    },
    subtitle: {
      en: 'Developing strong foundations in English, Hindi, Mathematics and EVS through concept clarity, guided practice, reading and problem-solving.',
      hi: 'अवधारणा की स्पष्टता, निर्देशित अभ्यास, पठन और समस्या-समाधान द्वारा अंग्रेजी, हिंदी, गणित और ईवीएस में मजबूत नींव।',
    },
    classes: { en: 'Class 3 | Class 4 | Class 5', hi: 'कक्षा 3 | कक्षा 4 | कक्षा 5' },
    ageRange: { en: 'Ages 8 to 11 Years', hi: 'आयु 8 से 11 वर्ष' },
    themeColor: '#36A9E1',
    accentBg: '#F0F9FF',
    borderColor: '#36A9E1',
    badgeColor: '#0284C7',
    summary: {
      en: 'In Classes 3 to 5 (NCF-SE 2023 Preparatory Stage), children shift from "learning to read" to "reading to learn". We build multi-digit arithmetic fluency, fraction and decimal understanding, grammar in action, and independent answer-writing.',
      hi: 'कक्षा 3 से 5 (NCF-SE 2023) में बच्चे "पढ़ना सीखने" से आगे बढ़कर "सीखने के लिए पढ़ना" शुरू करते हैं। हम गुणा-भाग, भिन्न, दशमलव, व्याकरण और अपने शब्दों में उत्तर लिखने की क्षमता विकसित करते हैं।',
    },
    philosophy: {
      en: 'Many middle-school struggles begin in Classes 3–5 when fractions, long division, or English/Hindi comprehension are memorised as mechanical rules. We use visual fraction strips, grid models, and structured writing frames so every concept makes logical sense.',
      hi: 'मिडिल स्कूल की कई कठिनाइयाँ कक्षा 3–5 में तब शुरू होती हैं जब बच्चे भिन्न, भाग या व्याकरण को बिना समझे रट लेते हैं। हम फ्रैक्शन स्ट्रिप्स, ग्रिड मॉडल और लेखन अभ्यास से हर विषय को तर्कपूर्ण बनाते हैं।',
    },
    subjectsCovered: [
      { en: 'English (Santoor & CBSE Grammar/Writing)', hi: 'अंग्रेजी (संतूर, व्याकरण और रचनात्मक लेखन)' },
      { en: 'Hindi (Veena & Vyakaran/Rachna)', hi: 'हिंदी (वीणा, व्याकरण और अनुच्छेद/पत्र लेखन)' },
      { en: 'Mathematics (Maths Mela alignment)', hi: 'गणित (मैथ्स मेला पाठ्यक्रम सहयोग)' },
      { en: 'EVS (Our Wondrous World & Inquiry)', hi: 'पर्यावरण अध्ययन (आवर वंडरस वर्ल्ड और प्रोजेक्ट)' },
      { en: 'Unplugged Logical Reasoning Puzzles', hi: 'तार्किक सोच और पहेलियाँ' },
    ],
    coreTopics: [
      {
        category: { en: 'English & Hindi Comprehension, Grammar & Writing', hi: 'अंग्रेजी और हिंदी बोधगम्यता, व्याकरण व लेखन' },
        items: [
          { en: 'Literal and inferential reading comprehension of stories and informational passages', hi: 'कहानियों और जानकारीपूर्ण गद्यांशों को पढ़कर प्रत्यक्ष व तार्किक प्रश्नों के उत्तर देना' },
          { en: 'Grammar through use: Nouns, pronouns, verbs, adjectives, tenses, prepositions, articles & conjunctions', hi: 'व्यावहारिक व्याकरण: संज्ञा, सर्वनाम, क्रिया, विशेषण, काल, वचन, लिंग और कारक' },
          { en: 'Structured paragraphs, formal/informal letters, story writing & Hindi Anuchhed/Patra Lekhan', hi: 'व्यवस्थित अनुच्छेद लेखन, औपचारिक/अनौपचारिक पत्र और कहानी लेखन' },
        ],
      },
      {
        category: { en: 'Mathematics: Operations, Fractions, Decimals & Geometry', hi: 'गणित: चारों संक्रियाएँ, भिन्न, दशमलव और ज्यामिति' },
        items: [
          { en: 'Large numbers (up to 4-digit in Class 3, 5-digit in Class 4, Lakhs & Crores in Class 5)', hi: 'बड़ी संख्याएँ (कक्षा 3 में हजार, कक्षा 4 में दस हजार, कक्षा 5 में लाख व करोड़)' },
          { en: 'Meaningful multiplication tables (1–10+), two-digit multiplication, and step-by-step long division', hi: 'पहाड़ों की तार्किक समझ, दो अंकों का गुणा और चरणबद्ध भाग' },
          { en: 'Fractions (part of a whole, number line, equivalent fractions, like-fraction operations) & Decimals (tenths, hundredths, money)', hi: 'भिन्न (समान भिन्न, संख्या रेखा पर भिन्न, जोड़-घटाव) और दशमलव (दसवाँ व सौवाँ भाग)' },
          { en: 'Geometry & Measurement: Angles, triangles, symmetry, perimeter vs. area on grids, volume/capacity, time & bar graphs', hi: 'ज्यामिति और मापन: कोण, त्रिभुज, सममिति, परिमाप और क्षेत्रफल में अंतर, तथा दंड आलेख (Bar Graph)' },
        ],
      },
      {
        category: { en: 'EVS, Interdisciplinary Links & Logic', hi: 'पर्यावरण अध्ययन (EVS) और तार्किक कौशल' },
        items: [
          { en: 'Living systems, plant & human body functions, water/air cycles, food & health, natural resources, and map directions', hi: 'सजीव जगत, पौधों व मानव शरीर के तंत्र, जल-वायु चक्र, स्वास्थ्य, प्राकृतिक संसाधन और मानचित्र दिशाएँ' },
          { en: 'Unplugged computational thinking: pattern recognition, step-by-step sequencing & multi-step word problem decoding', hi: 'पैटर्न पहचान, क्रमबद्ध तर्क और दो-चरणीय इबारती सवालों को समझकर हल करना' },
        ],
      },
    ],
    classroomActivities: [
      { en: 'Paper-Folding Fraction Lab & Shared Number-Line Comparisons', hi: 'कागज मोड़कर भिन्न (1/2, 1/4, 3/4) समझना और संख्या रेखा पर तुलना करना' },
      { en: 'Grid-Paper Garden Design to distinguish Perimeter (boundary) from Area (surface)', hi: 'ग्रिड पेपर पर बगीचे का नक्शा बनाकर परिमाप (सीमा) और क्षेत्रफल (सतह) का अंतर समझना' },
      { en: 'Plant Watch Diary & Weather Observation Charts for hands-on EVS', hi: 'पौधे की वृद्धि डायरी और मौसम अवलोकन चार्ट तैयार करना' },
      { en: '"Spot the Mistake" sessions where students diagnose a flawed worked sum', hi: '"गलती पहचानें" गतिविधि जिसमें छात्र हल किए गए सवाल में हुई त्रुटि ढूँढते हैं' },
    ],
    commonGapsAddressed: [
      { en: 'Assuming a larger denominator means a bigger fraction (thinking 1/8 > 1/4)', hi: 'बड़े हर (denominator) वाली भिन्न को बड़ा समझना (जैसे 1/8 को 1/4 से बड़ा मानना)' },
      { en: 'Treating decimals as two separate whole numbers (thinking 0.25 is larger than 0.5)', hi: 'दशमलव संख्याओं को पूर्ण संख्या की तरह देखना (जैसे 0.25 को 0.5 से बड़ा मानना)' },
      { en: 'Confusing perimeter and area or copying textbook lines verbatim instead of answering in own words', hi: 'परिमाप और क्षेत्रफल में भ्रम तथा उत्तर अपने शब्दों में लिखने के बजाय किताब की लाइनें नकल करना' },
    ],
    assessmentApproach: {
      en: 'Monthly concept checks with "explain why" questions, two-step word problem diagnostics, rubric-based paragraph reviews, and a Class 6 readiness bridge check in Class 5.',
      hi: 'मासिक अवधारणा जाँच ("कारण बताएँ" प्रश्नों सहित), इबारती सवालों का परीक्षण, लेखन मूल्यांकन और कक्षा 5 के अंत में कक्षा 6 की तैयारी जाँच।',
    },
    parentPartnershipTips: [
      { en: 'Ask your child to estimate shopping bills or recipe quantities using fractions and decimals.', hi: 'खरीदारी के बिल का अनुमान लगाने या रसोई में आधा/चौथाई मापने में बच्चे को शामिल करें।' },
      { en: 'Have your child summarise a story or news item in 3 sentences in their own words.', hi: 'बच्चे से किसी कहानी या समाचार को अपने शब्दों में 3 वाक्यों में सुनाने को कहें।' },
      { en: 'When checking homework, ask "How did you work this out?" rather than only checking the final answer.', hi: 'होमवर्क देखते समय केवल उत्तर न देखें, बल्कि पूछें कि "आपने इसे कैसे हल किया?"' },
    ],
    outcomePromise: {
      en: 'Strong command over whole numbers, fractions, decimals, and structured bilingual writing—ensuring the transition to middle school in Class 6 is smooth and stress-free.',
      hi: 'पूर्ण संख्याओं, भिन्न, दशमलव और व्यवस्थित लेखन पर मजबूत पकड़—जिससे कक्षा 6 (मिडिल स्कूल) में प्रवेश सहज और तनावमुक्त हो।',
    },
  },
  'prog-middle-6-8': {
    id: 'prog-middle-6-8',
    stageCode: 'Aagey • Stage 4 (Middle School)',
    title: {
      en: 'Middle School Programme (Classes 6, 7 & 8)',
      hi: 'मिडिल स्कूल शिक्षण कार्यक्रम (कक्षा 6, 7 और 8)',
    },
    subtitle: {
      en: 'Strengthening subject understanding, independent thinking and examination readiness through structured academic support.',
      hi: 'व्यवस्थित शैक्षणिक सहयोग के माध्यम से विषयों की गहरी समझ, स्वतंत्र सोच और स्कूल परीक्षाओं की मजबूत तैयारी।',
    },
    classes: { en: 'Class 6 | Class 7 | Class 8', hi: 'कक्षा 6 | कक्षा 7 | कक्षा 8' },
    ageRange: { en: 'Ages 11 to 14 Years', hi: 'आयु 11 से 14 वर्ष' },
    themeColor: '#24476B',
    accentBg: '#F8FAFC',
    borderColor: '#24476B',
    badgeColor: '#1E3A8A',
    summary: {
      en: 'Aligned with NCF-SE 2023 Middle Stage and the updated NCERT textbooks (Ganita Prakash, Curiosity, Exploring Society: India and Beyond, Poorvi, Malhar), we help students master abstract algebra, scientific inquiry, social science analysis, and structured exam writing.',
      hi: 'NCF-SE 2023 और नई NCERT पुस्तकों (गणित प्रकाश, क्यूरियोसिटी, एक्सप्लोरिंग सोसाइटी, पूर्वी, मल्हार) के अनुरूप हम छात्रों को बीजगणित, वैज्ञानिक तर्क, सामाजिक विज्ञान विश्लेषण और परीक्षा उत्तर-लेखन में दक्ष बनाते हैं।',
    },
    philosophy: {
      en: 'Middle school introduces abstract variables, formal geometry proofs, multi-strand science, and longer school examinations. Our small batches allow us to explain concepts deeply, review every student’s notebook and mistake log, and build disciplined study habits before Class 9.',
      hi: 'मिडिल स्कूल में बीजगणित के चर (variables), ज्यामिति, विज्ञान के प्रयोग और विस्तृत परीक्षाएँ शुरू होती हैं। हमारे छोटे बैच में हर छात्र की कॉपी और गलतियों का विश्लेषण किया जाता है ताकि कक्षा 9 से पहले मजबूत अध्ययन आदतें बन सकें।',
    },
    subjectsCovered: [
      { en: 'Mathematics (Ganita Prakash)', hi: 'गणित (गणित प्रकाश)' },
      { en: 'Science (Curiosity — Physics, Chemistry, Biology strands)', hi: 'विज्ञान (क्यूरियोसिटी — भौतिकी, रसायन, जीव विज्ञान)' },
      { en: 'Social Science (History, Geography & Civics strands)', hi: 'सामाजिक विज्ञान (इतिहास, भूगोल और नागरिक शास्त्र)' },
      { en: 'English (Poorvi — Grammar, Literature & Formal Writing)', hi: 'अंग्रेजी (पूर्वी — व्याकरण, साहित्य और औपचारिक लेखन)' },
      { en: 'Hindi (Malhar — Vyakaran, Sahitya & Nibandh/Patra)', hi: 'हिंदी (मल्हार — व्याकरण, साहित्य और निबंध/पत्र लेखन)' },
    ],
    coreTopics: [
      {
        category: { en: 'Mathematics: Algebra, Geometry, Mensuration & Data', hi: 'गणित: बीजगणित, ज्यामिति, क्षेत्रमिति और आँकड़े' },
        items: [
          { en: 'Integers, rational numbers, fractions & decimals operations, exponents, squares/cubes & factorisation', hi: 'पूर्णांक, परिमेय संख्याएँ, घातांक, वर्ग-वर्गमूल, घन-घनमूल और गुणनखंडन' },
          { en: 'Algebraic expressions, identities, and forming/solving linear equations from word problems', hi: 'बीजीय व्यंजक, सर्वसमिकाएँ और इबारती सवालों से रैखिक समीकरण बनाकर हल करना' },
          { en: 'Ratio, proportion, unitary method, percentages, profit & loss, and simple/compound interest', hi: 'अनुपात-समानुपात, प्रतिशत, लाभ-हानि तथा साधारण व चक्रवृद्धि ब्याज' },
          { en: 'Lines, angles, triangle properties, congruence, quadrilaterals, compass constructions, mensuration (area/volume) & data graphs/histograms', hi: 'रेखाएँ व कोण, त्रिभुज के गुण, चतुर्भुज, रचनाएँ, क्षेत्रमिति (क्षेत्रफल व आयतन) और आलेख' },
        ],
      },
      {
        category: { en: 'Integrated Science (Physics, Chemistry & Biology Strands)', hi: 'विज्ञान (भौतिकी, रसायन और जीव विज्ञान की अवधारणाएँ)' },
        items: [
          { en: 'Physics concepts: Motion & measurement, force & pressure, friction, light, heat, sound, and electric current/circuits', hi: 'भौतिकी: गति और मापन, बल और दाब, घर्षण, प्रकाश, ऊष्मा, ध्वनि और विद्युत धारा/परिपथ' },
          { en: 'Chemistry concepts: Sorting materials, states of matter, acids, bases & indicators, physical/chemical changes, combustion & metals/non-metals', hi: 'रसायन: पदार्थों का वर्गीकरण, अम्ल, क्षारक और सूचक, भौतिक व रासायनिक परिवर्तन, दहन तथा धातु-अधातु' },
          { en: 'Biology concepts: Living organisms, nutrition & respiration in plants/animals, cell structure, microorganisms, crop production & ecosystems', hi: 'जीव विज्ञान: पौधों व जंतुओं में पोषण और श्वसन, कोशिका संरचना, सूक्ष्मजीव, फसल उत्पादन और पारिस्थितिकी' },
        ],
      },
      {
        category: { en: 'Social Science, Languages & Examination Skills', hi: 'सामाजिक विज्ञान, भाषाएँ और परीक्षा कौशल' },
        items: [
          { en: 'History, Geography & Civics: Ancient, Medieval & Colonial/Modern India timelines; latitudes/longitudes, climate, resources & map skills; Constitution, local/state governance & judiciary', hi: 'इतिहास (प्राचीन, मध्यकालीन व आधुनिक भारत), भूगोल (अक्षांश-देशांतर, जलवायु, संसाधन, मानचित्र कार्य) और नागरिक शास्त्र (संविधान, शासन व न्यायपालिका)' },
          { en: 'English & Hindi: Active/passive voice, reported speech, clauses, formal letters, notices, summaries, Sandhi, Samas, Muhavare & analytical essays', hi: 'अंग्रेजी और हिंदी: वाच्य, प्रत्यक्ष-अप्रत्यक्ष कथन, औपचारिक पत्र, सूचना लेखन, संधि, समास, मुहावरे और निबंध' },
          { en: 'Note: Exact chapter coverage is always aligned with the student’s school syllabus and pacing. (Third languages / R3 are not taught at Aarohan.)', hi: 'नोट: अध्यायों का क्रम हमेशा बच्चे के स्कूल के पाठ्यक्रम के अनुसार रखा जाता है। (तृतीय भाषा / R3 यहाँ नहीं पढ़ाई जाती।)' },
        ],
      },
    ],
    classroomActivities: [
      { en: 'Algebra Balance & Area-Model Proofs for identities like (a + b)²', hi: 'क्षेत्रफल मॉडल और संतुलन उदाहरणों द्वारा बीजीय सर्वसमिकाओं (a + b)² को समझना' },
      { en: 'Safe Classroom Science Demonstrations (turmeric acid/base indicator, light reflection, seed germination & circuit diagrams)', hi: 'सुरक्षित विज्ञान प्रयोग व अवलोकन (हल्दी सूचक, प्रकाश परावर्तन, अंकुरण और परिपथ आरेख)' },
      { en: 'Physical & Political Map-Marking Workshops and Historical Cause-Effect Timelines', hi: 'भौतिक व राजनीतिक मानचित्र अभ्यास और ऐतिहासिक घटनाओं की समय-रेखा बनाना' },
      { en: 'Structured 3-Mark & 5-Mark Answer-Writing Reviews with diagrams and keywords', hi: '3-अंक और 5-अंक के प्रश्नों के लिए नामांकित चित्रों व मुख्य बिंदुओं सहित उत्तर लिखने का अभ्यास' },
    ],
    commonGapsAddressed: [
      { en: 'Sign errors with negative integers and misapplying rules in multi-step linear equations', hi: 'ऋणात्मक पूर्णांकों (negative integers) के चिह्नों में गलती और समीकरण हल करने में त्रुटि' },
      { en: 'Expanding (a + b)² as a² + b² or confusing ratio, fraction, and percentage', hi: '(a + b)² को केवल a² + b² लिखना अथवा अनुपात, भिन्न और प्रतिशत में भ्रम होना' },
      { en: 'Memorising science/history paragraphs without understanding variables, diagrams, or map scales', hi: 'विज्ञान के चित्रों या सामाजिक विज्ञान के कारणों को समझे बिना लंबे उत्तर रटने की कोशिश करना' },
    ],
    assessmentApproach: {
      en: 'Unit concept tests with error logs, diagram & notebook reviews, school-pattern practice papers, and a Class 9 readiness diagnostic check in Class 8.',
      hi: 'इकाई परीक्षण और त्रुटि लॉग, कॉपी व चित्र जाँच, स्कूल पैटर्न के अभ्यास प्रश्न-पत्र और कक्षा 8 में कक्षा 9 की तैयारी जाँच।',
    },
    parentPartnershipTips: [
      { en: 'Ask your child to explain one science or social science concept aloud to you each week.', hi: 'सप्ताह में एक बार बच्चे से विज्ञान या सामाजिक विज्ञान का कोई एक विषय आपको समझाने को कहें।' },
      { en: 'Help maintain a quiet, distraction-free study corner and a steady daily revision timetable.', hi: 'घर पर शांत पढ़ने का स्थान और स्क्रीन से दूर नियमित दोहराव की समय-सारणी बनाए रखने में सहयोग करें।' },
      { en: 'Review your child’s mistake log and diagrams together rather than focusing only on test marks.', hi: 'केवल अंकों की तुलना करने के बजाय बच्चे की कॉपी के चित्रों और सुधारी गई गलतियों को देखें।' },
    ],
    outcomePromise: {
      en: 'Confident algebraic and scientific reasoning, tidy note-making, and well-structured examination writing—preparing students thoroughly for Class 9 and 10.',
      hi: 'मजबूत गणितीय व वैज्ञानिक तर्कक्षमता, व्यवस्थित नोट्स और आत्मविश्वासपूर्ण परीक्षा लेखन—जो कक्षा 9 और 10 के लिए ठोस आधार तैयार करता है।',
    },
  },
};

export const GRADE_WISE_MATRIX: GradeMatrixRow[] = [
  {
    grade: { en: 'Nursery', hi: 'नर्सरी (Nursery)' },
    age: { en: '3–4 Yrs', hi: '3–4 वर्ष' },
    stageName: { en: 'Aarambh (Foundation)', hi: 'आरंभ (फाउंडेशन)' },
    ncertBooks: { en: 'NCF-FS 2022 / Play & Activity Kit', hi: 'NCF-FS 2022 / खेल-आधारित सामग्री' },
    coreFocus: { en: 'Oral Language, Sensory Play, Fine Motor & Counting 1–10', hi: 'मौखिक भाषा, इंद्रिय खेल, मोटर कौशल और 1–10 गिनती' },
    objectivesAndTopics: {
      en: 'Name & family talk, rhymes, recognising letters in own name, scribbling/lines/dots, clay & bead threading, primary colours, circle/square/triangle, counting up to 10 with objects.',
      hi: 'नाम व परिवार परिचय, कविताएँ, शुरुआती ध्वनि पहचान, रेखाएँ व बिंदु बनाना, क्ले व मोती पिरोना, प्राथमिक रंग, गोल/चौकोर/तिकोन और वस्तुओं से 10 तक गिनती।',
    },
    commonGaps: {
      en: 'Early pencil pressure before hand strength; reciting counting words without matching physical objects.',
      hi: 'उंगलियों की मजबूती से पहले पेंसिल का दबाव; वस्तुओं को छुए बिना केवल रटकर गिनती बोलना।',
    },
    assessmentAndHomeSupport: {
      en: 'Play observation checklist; Home: 10 mins daily rhymes/picture talk & free crayon colouring.',
      hi: 'खेल अवलोकन सूची; घर पर: रोज़ 10 मिनट चित्र वार्ता, कविताएँ और क्रेयॉन से रंग भरना।',
    },
  },
  {
    grade: { en: 'LKG', hi: 'LKG' },
    age: { en: '4–5 Yrs', hi: '4–5 वर्ष' },
    stageName: { en: 'Aarambh (Foundation)', hi: 'आरंभ (फाउंडेशन)' },
    ncertBooks: { en: 'NCF-FS 2022 / Jaadui Pitara aligned', hi: 'NCF-FS 2022 / जादुई पिटारा आधारित' },
    coreFocus: { en: 'Phonics (A–Z), Pre-Writing Curves, Early Math (1–20) & EVS', hi: 'फोनेटिक्स (A–Z), अक्षर अनुरेखण, 1–20 गिनती और परिवेश' },
    objectivesAndTopics: {
      en: 'Letter-sound correspondence, matching letter to picture, Hindi swar exposure, curves & letter tracing, counting & numeral matching 1–20, sorting by size/shape, AB patterns, seasons & helpers.',
      hi: 'अक्षर-ध्वनि मिलान, चित्र से अक्षर जोड़ना, हिंदी स्वर परिचय, अक्षर ट्रेसिंग, 1–20 गिनती व अंक पहचान, आकार/रंग से छाँटना, AB पैटर्न और मौसम।',
    },
    commonGaps: {
      en: 'Letter reversals (b/d) which are normal at this age; counting by rote without one-to-one correspondence.',
      hi: 'b/d जैसे सामान्य अक्षर उलटाव; एक-से-एक वस्तु मिलान के बिना रटकर गिनना।',
    },
    assessmentAndHomeSupport: {
      en: 'Flashcard sound & sorting checks; Home: Counting household objects and phonetic sound games.',
      hi: 'फ्लैशकार्ड ध्वनि व मिलान जाँच; घर पर: घरेलू वस्तुओं की गिनती और पहली ध्वनि पहचानने के खेल।',
    },
  },
  {
    grade: { en: 'UKG', hi: 'UKG' },
    age: { en: '5–6 Yrs', hi: '5–6 वर्ष' },
    stageName: { en: 'Aarambh (Foundation)', hi: 'आरंभ (फाउंडेशन)' },
    ncertBooks: { en: 'NCF-FS 2022 / Pre-Class 1 Bridge', hi: 'NCF-FS 2022 / कक्षा 1 सेतु तैयारी' },
    coreFocus: { en: 'CVC Word Blending, Short Sentences, Math to 50 & Object Sums', hi: '3-अक्षर शब्द पठन, छोटे वाक्य, 50 तक गणित और वस्तुओं से जोड़' },
    objectivesAndTopics: {
      en: 'Blending 3-letter CVC words, early sight words, Hindi varnamala & simple words, forming letters/numbers 1–20 with right start points, counting to 50+, add/subtract within 10 using objects, ABB/ABC patterns.',
      hi: 'तीन अक्षरों के अंग्रेजी शब्द पढ़ना, साइट वर्ड्स, हिंदी वर्णमाला व बिना मात्रा के शब्द, सही बिंदु से लिखना, 50 तक गिनती और वस्तुओं से 10 तक जोड़-घटाव।',
    },
    commonGaps: {
      en: 'Mixing short vowel sounds (a/e/i); difficulty understanding zero; pencil grip fatigue.',
      hi: 'छोटे स्वरों (a/e/i) की ध्वनि में भ्रम; शून्य (0) की अवधारणा और लिखने में हाथ थकना।',
    },
    assessmentAndHomeSupport: {
      en: 'Oral reading & object-math check; Home: Daily sight-word cards & short guided writing.',
      hi: 'मौखिक पठन और वस्तु-गणित जाँच; घर पर: साइट-वर्ड कार्ड और छोटे शब्दों का लेखन अभ्यास।',
    },
  },
  {
    grade: { en: 'Class 1', hi: 'कक्षा 1 (Class 1)' },
    age: { en: '6–7 Yrs', hi: '6–7 वर्ष' },
    stageName: { en: 'Aadhar (Primary)', hi: 'आधार (प्राइमरी)' },
    ncertBooks: { en: 'Mridang (Eng), Sarangi (Hin), Joyful Mathematics', hi: 'मृदंग (अंग्रेजी), सारंगी (हिंदी), जॉयफुल मैथमेटिक्स' },
    coreFocus: { en: 'English, Hindi Matras, Place Value (to 99) & Environmental Awareness', hi: 'अंग्रेजी, हिंदी मात्राएँ, स्थानीय मान (99 तक) और पर्यावरण' },
    objectivesAndTopics: {
      en: 'Reading short texts aloud, naming & action words, picture-based sentences; Hindi varnamala & matras; numbers to 99, Tens & Ones place value, add/subtract within 20, shapes, days & money.',
      hi: 'छोटे पाठ बोलकर पढ़ना, संज्ञा व क्रिया शब्द, चित्र देखकर वाक्य लिखना; हिंदी मात्राएँ; 99 तक संख्याएँ, दहाई-इकाई स्थानीय मान, 20 तक जोड़-घटाव, आकार व मुद्रा।',
    },
    commonGaps: {
      en: 'Guessing words from pictures instead of decoding; reversing digits (12 as 21); treating 10 as ten separate ones.',
      hi: 'शब्द पढ़ने के बजाय चित्र देखकर अंदाज़ा लगाना; अंकों को उलटना (12 को 21); दहाई को न समझना।',
    },
    assessmentAndHomeSupport: {
      en: 'Weekly 1-minute reading check & base-10 stick interview; Home: 10 mins aloud reading & everyday coin counting.',
      hi: 'साप्ताहिक 1-मिनट पठन और तीलियों के बंडल से जाँच; घर पर: रोज़ 10 मिनट बोलकर पढ़ना और सिक्कों की गिनती।',
    },
  },
  {
    grade: { en: 'Class 2', hi: 'कक्षा 2 (Class 2)' },
    age: { en: '7–8 Yrs', hi: '7–8 वर्ष' },
    stageName: { en: 'Aadhar (Primary)', hi: 'आधार (प्राइमरी)' },
    ncertBooks: { en: 'Mridang (Eng), Sarangi (Hin), Joyful Mathematics', hi: 'मृदंग (अंग्रेजी), सारंगी (हिंदी), जॉयफुल मैथमेटिक्स' },
    coreFocus: { en: 'Passage Comprehension, All Hindi Matras, Regrouping Sums (to 999)', hi: 'गद्यांश बोध, सभी हिंदी मात्राएँ, हासिल वाले जोड़-घटाव (999 तक)' },
    objectivesAndTopics: {
      en: 'Reading 6–8 line passages (who/what/where), 4–5 sentence paragraphs, punctuation; all Hindi matras & dictation; numbers to 999, 2-digit add/subtract with regrouping, intro to multiplication groups, clock & picture graphs.',
      hi: '6–8 पंक्तियों का गद्यांश पठन, 4–5 वाक्यों का अनुच्छेद, सभी हिंदी मात्राएँ व श्रुतलेख; 999 तक संख्याएँ, हासिल वाले जोड़-घटाव, गुणा की शुरुआत, घड़ी और चित्र आलेख।',
    },
    commonGaps: {
      en: 'Subtracting smaller digit from larger regardless of position; confusion in borrowing across zero & reading clock hands.',
      hi: 'घटाव में बिना हासिल लिए बड़ी संख्या से छोटी घटा देना; शून्य से उधार लेने और घड़ी की सुइयों में भ्रम।',
    },
    assessmentAndHomeSupport: {
      en: 'Monthly passage fluency & place-value error check; Home: Analog clock reading & 3-line daily journal.',
      hi: 'मासिक पठन और स्थानीय मान त्रुटि जाँच; घर पर: घड़ी में समय देखना और 3 वाक्य रोज़ लिखना।',
    },
  },
  {
    grade: { en: 'Class 3', hi: 'कक्षा 3 (Class 3)' },
    age: { en: '8–9 Yrs', hi: '8–9 वर्ष' },
    stageName: { en: 'Aadhar (Primary)', hi: 'आधार (प्राइमरी)' },
    ncertBooks: { en: 'Santoor (Eng), Veena (Hin), Maths Mela, Our Wondrous World (EVS)', hi: 'संतूर (अंग्रेजी), वीणा (हिंदी), मैथ्स मेला, आवर वंडरस वर्ल्ड' },
    coreFocus: { en: 'Independent Reading, Grammar, Tables/Division, Fractions & EVS', hi: 'स्वतंत्र पठन, व्याकरण, पहाड़े/भाग, भिन्न और पर्यावरण अध्ययन' },
    objectivesAndTopics: {
      en: 'Story & non-fiction comprehension (literal & why questions), nouns/verbs/adjectives/tenses, 6–8 line paragraphs; Hindi sangya/kriya/visheshan; numbers to 9999, tables to 10, division as equal sharing, halves/quarters, measurement & pictographs.',
      hi: 'कहानी समझकर "क्यों" वाले उत्तर देना, संज्ञा/क्रिया/विशेषण/काल, अनुच्छेद लेखन; 9999 तक संख्याएँ, 10 तक पहाड़े, बराबर बाँटने के रूप में भाग, आधा/चौथाई भिन्न और मापन।',
    },
    commonGaps: {
      en: 'Memorising tables without array meaning; thinking a larger denominator means a larger fraction (1/4 vs 1/2).',
      hi: 'अर्थ समझे बिना पहाड़े रटना; बड़े हर वाली भिन्न को बड़ा समझना (जैसे 1/4 को 1/2 से बड़ा मानना)।',
    },
    assessmentAndHomeSupport: {
      en: 'Monthly reading, tables fluency & explanation quiz; Home: Kitchen/errand math & teaching back a school topic.',
      hi: 'मासिक पठन, पहाड़े और तर्क प्रश्नोत्तरी; घर पर: रसोई/बाज़ार के हिसाब और स्कूल का विषय समझाना।',
    },
  },
  {
    grade: { en: 'Class 4', hi: 'कक्षा 4 (Class 4)' },
    age: { en: '9–10 Yrs', hi: '9–10 वर्ष' },
    stageName: { en: 'Aadhar (Primary)', hi: 'आधार (प्राइमरी)' },
    ncertBooks: { en: 'NCERT Class 4 English, Hindi, Maths & EVS (School textbook aligned)', hi: 'NCERT कक्षा 4 अंग्रेजी, हिंदी, गणित और EVS (स्कूल पुस्तक के अनुसार)' },
    coreFocus: { en: 'Inferential Reading, Long Division, Equivalent Fractions, Area/Perimeter', hi: 'तार्किक पठन, लंबी भाग विधि, तुल्य भिन्न, परिमाप और क्षेत्रफल' },
    objectivesAndTopics: {
      en: 'Inference in passages, tenses/prepositions/conjunctions, informal letters; Hindi vachan/ling/kaal; 5-digit numbers, 2-digit multiplication, division with remainders, equivalent fractions, factors/multiples, perimeter vs area on grids, angles & bar graphs.',
      hi: 'गद्यांश से निष्कर्ष निकालना, पत्र लेखन, वचन/लिंग/काल; 5-अंकीय संख्याएँ, दो अंकों का गुणा, शेषफल वाला भाग, तुल्य भिन्न, गुणनखंड, परिमाप व क्षेत्रफल और दंड आलेख।',
    },
    commonGaps: {
      en: 'Mixing perimeter (border) with area (surface); copying textbook lines instead of writing in own words.',
      hi: 'परिमाप (सीमा) और क्षेत्रफल (सतह) में भ्रम; अपने शब्दों में लिखने के बजाय किताब की लाइनें नकल करना।',
    },
    assessmentAndHomeSupport: {
      en: 'Monthly concept check, rubric paragraph review & error analysis; Home: Estimating bills/time & 3-sentence story summaries.',
      hi: 'मासिक अवधारणा जाँच और अनुच्छेद मूल्यांकन; घर पर: बिल/समय का अनुमान और 3 वाक्यों में कहानी का सार।',
    },
  },
  {
    grade: { en: 'Class 5', hi: 'कक्षा 5 (Class 5)' },
    age: { en: '10–11 Yrs', hi: '10–11 वर्ष' },
    stageName: { en: 'Aadhar (Primary)', hi: 'आधार (प्राइमरी)' },
    ncertBooks: { en: 'NCERT Class 5 English, Hindi, Maths & EVS (School textbook aligned)', hi: 'NCERT कक्षा 5 अंग्रेजी, हिंदी, गणित और EVS (स्कूल पुस्तक के अनुसार)' },
    coreFocus: { en: 'Middle-School Bridge, Decimals & Fractions, Large Numbers & Composition', hi: 'मिडिल स्कूल सेतु, दशमलव व भिन्न, बड़ी संख्याएँ और रचनात्मक लेखन' },
    objectivesAndTopics: {
      en: 'Literal & inferential comprehension, clauses, letters & structured stories; Hindi Anuchhed/Patra; Lakhs & Crores, HCF/LCM basics, like-fraction add/subtract, decimals (tenths/hundredths), money, volume/capacity, angles/triangles & ecosystems.',
      hi: 'गद्यांश बोध, पत्र व कहानी लेखन, हिंदी अनुच्छेद; लाख व करोड़, गुणनखंड व गुणज, भिन्न जोड़-घटाव, दशमलव (दसवाँ/सौवाँ भाग), आयतन, कोण/त्रिभुज और पारिस्थितिकी।',
    },
    commonGaps: {
      en: 'Treating decimals as separate whole numbers (0.5 vs 0.25); adding both numerators and denominators in fractions.',
      hi: '0.25 को 0.5 से बड़ा समझना; भिन्न जोड़ते समय अंश और हर दोनों को आपस में जोड़ देना।',
    },
    assessmentAndHomeSupport: {
      en: 'Two-step word problem checks, rubric writing & Class 6 bridge check; Home: 15 mins reading & recipe/shopping decimal math.',
      hi: 'दो-चरणीय सवालों की जाँच, लेखन मूल्यांकन और कक्षा 6 सेतु परीक्षण; घर पर: 15 मिनट पठन और दशमलव का दैनिक प्रयोग।',
    },
  },
  {
    grade: { en: 'Class 6', hi: 'कक्षा 6 (Class 6)' },
    age: { en: '11–12 Yrs', hi: '11–12 वर्ष' },
    stageName: { en: 'Aagey (Middle School)', hi: 'आगे (मिडिल स्कूल)' },
    ncertBooks: { en: 'Poorvi (Eng), Malhar (Hin), Ganita Prakash, Curiosity (Sci), Exploring Society (SST)', hi: 'पूर्वी, मल्हार, गणित प्रकाश, क्यूरियोसिटी (विज्ञान), एक्सप्लोरिंग सोसाइटी (SST)' },
    coreFocus: { en: 'Integers, Intro Algebra, Compass Geometry, Integrated Science & Maps', hi: 'पूर्णांक, प्रारंभिक बीजगणित, ज्यामिति रचनाएँ, विज्ञान और मानचित्र' },
    objectivesAndTopics: {
      en: 'Number patterns, primes, fractions/decimals, integers, intro algebra, compass & ruler constructions, perimeter/area; Science observation (materials, living things, motion, light, electricity); Early India history, latitudes/longitudes & local governance.',
      hi: 'संख्या पैटर्न, अभाज्य संख्याएँ, पूर्णांक, प्रारंभिक बीजगणित, प्रकार व पटरी से रचनाएँ; विज्ञान (पदार्थ, सजीव, गति, प्रकाश, विद्युत); प्राचीन भारत, अक्षांश-देशांतर और स्थानीय शासन।',
    },
    commonGaps: {
      en: 'Negative integer sign confusion; believing multiplication always makes numbers bigger; weak note-making & copying textbook answers.',
      hi: 'ऋणात्मक पूर्णांकों के चिह्नों में भ्रम; नोट्स बनाने की आदत न होना और बिना समझे उत्तर रटना।',
    },
    assessmentAndHomeSupport: {
      en: 'Unit checks, mistake logs, notebook/diagram reviews; Home: Weekly concept explanation aloud & quiet study routine.',
      hi: 'इकाई जाँच, त्रुटि लॉग और कॉपी/चित्र समीक्षा; घर पर: सप्ताह में एक विषय समझाना और नियमित अध्ययन समय।',
    },
  },
  {
    grade: { en: 'Class 7', hi: 'कक्षा 7 (Class 7)' },
    age: { en: '12–13 Yrs', hi: '12–13 वर्ष' },
    stageName: { en: 'Aagey (Middle School)', hi: 'आगे (मिडिल स्कूल)' },
    ncertBooks: { en: 'Poorvi, Malhar, Ganita Prakash (Parts 1 & 2), Curiosity, Exploring Society', hi: 'पूर्वी, मल्हार, गणित प्रकाश (भाग 1 व 2), क्यूरियोसिटी, एक्सप्लोरिंग सोसाइटी' },
    coreFocus: { en: 'Simple Equations, Ratio/Percentage, Triangle Properties, Acids/Heat & Medieval India', hi: 'सरल समीकरण, अनुपात/प्रतिशत, त्रिभुज के गुण, अम्ल/ऊष्मा और मध्यकालीन भारत' },
    objectivesAndTopics: {
      en: 'Integers, rational numbers, algebraic expressions & 1-step equations, ratio/proportion/percentage, triangle congruence, data & mean; Plant/animal nutrition, acids/bases, heat, motion, electric current & respiration; Medieval India, climate & state government.',
      hi: 'पूर्णांक, बीजीय व्यंजक व सरल समीकरण, अनुपात व प्रतिशत, त्रिभुज सर्वांगसमता; पोषण, अम्ल-क्षारक, ऊष्मा, श्वसन व विद्युत; मध्यकालीन भारत, जलवायु और राज्य शासन।',
    },
    commonGaps: {
      en: 'Treating algebraic letters as labels rather than numbers; sign errors in transposing terms; confusing ratio with fraction.',
      hi: 'बीजगणित के अक्षरों को संख्या न समझना; पक्षांतरण में चिह्न की गलती; अनुपात और भिन्न में भ्रम।',
    },
    assessmentAndHomeSupport: {
      en: 'Concept quizzes with step justification, science observation records & answer rubrics; Home: Discussing maps/news & budget percentages.',
      hi: 'तर्क सहित प्रश्नोत्तरी, विज्ञान अवलोकन रिकॉर्ड और उत्तर मूल्यांकन; घर पर: समाचार/मानचित्र चर्चा और बजट प्रतिशत।',
    },
  },
  {
    grade: { en: 'Class 8', hi: 'कक्षा 8 (Class 8)' },
    age: { en: '13–14 Yrs', hi: '13–14 वर्ष' },
    stageName: { en: 'Aagey (Middle School)', hi: 'आगे (मिडिल स्कूल)' },
    ncertBooks: { en: 'Poorvi, Malhar, Ganita Prakash (Parts 1 & 2), Curiosity, Exploring Society', hi: 'पूर्वी, मल्हार, गणित प्रकाश (भाग 1 व 2), क्यूरियोसिटी, एक्सप्लोरिंग सोसाइटी' },
    coreFocus: { en: 'Linear Equations, Identities, Mensuration, Force/Cell/Current & Class 9 Readiness', hi: 'रैखिक समीकरण, सर्वसमिकाएँ, क्षेत्रमिति, बल/कोशिका और कक्षा 9 की तैयारी' },
    objectivesAndTopics: {
      en: 'Rational numbers, linear equations in 1 variable, quadrilaterals, squares/cubes, exponents, profit/loss/interest, algebraic identities & factorisation, mensuration (area/volume) & probability; Force/pressure, friction, sound, current, cell & reproduction; Colonial India, Constitution & judiciary.',
      hi: 'परिमेय संख्याएँ, एक चर वाले रैखिक समीकरण, चतुर्भुज, वर्ग/घन, लाभ-हानि व ब्याज, सर्वसमिकाएँ व गुणनखंडन, क्षेत्रमिति; बल व दाब, घर्षण, ध्वनि, कोशिका; आधुनिक भारत, संविधान और न्यायपालिका।',
    },
    commonGaps: {
      en: 'Expanding (a + b)² wrongly; mixing area and volume units; weak diagram labelling & poorly structured long answers.',
      hi: '(a + b)² का गलत विस्तार; क्षेत्रफल व आयतन की इकाइयों में भ्रम; अधूरे नामांकित चित्र और अव्यवस्थित दीर्घ उत्तर।',
    },
    assessmentAndHomeSupport: {
      en: 'School-format practice papers, error analysis logs & Class 9 readiness diagnostic check; Home: Steady revision timetable & stress-free exam habits.',
      hi: 'स्कूल पैटर्न के अभ्यास पत्र, त्रुटि लॉग और कक्षा 9 तत्परता जाँच; घर पर: नियमित दोहराव समय-सारणी और तनावमुक्त तैयारी।',
    },
  },
];

export const SUBJECT_DETAILS: SubjectDetail[] = [
  {
    id: 'english',
    name: { en: 'English Language & Literature', hi: 'अंग्रेजी भाषा और साहित्य (English)' },
    classes: { en: 'Nursery to Class 8', hi: 'नर्सरी से कक्षा 8' },
    accentHex: '#36A9E1',
    shortFocus: {
      en: 'Phonics, reading fluency, vocabulary expansion, comprehension, grammar in context, and confident written expression.',
      hi: 'फोनेटिक्स, धाराप्रवाह पठन, शब्द भंडार, गद्यांश बोध, व्यावहारिक व्याकरण और आत्मविश्वासपूर्ण लेखन।',
    },
    methodology: {
      en: 'We move systematically from auditory letter-sound blending in Early Years to guided partner reading in Primary and structured paragraph, letter, notice, and analytical answer-writing in Middle School.',
      hi: 'हम प्रारंभिक कक्षाओं में ध्वनि-मिश्रण (Phonics) से शुरू करके प्राइमरी में निर्देशित पठन और मिडिल स्कूल में अनुच्छेद, औपचारिक पत्र और विश्लेषणात्मक उत्तर-लेखन सिखाते हैं।',
    },
    stageBreakdown: [
      {
        stage: { en: 'Nursery–UKG', hi: 'नर्सरी–UKG' },
        focus: { en: 'Letter sounds (A–Z), CVC word blending, sight words, picture talk & rhymes', hi: 'अक्षर ध्वनियाँ, 3-अक्षर शब्द पठन, साइट वर्ड्स और चित्र वार्ता' },
      },
      {
        stage: { en: 'Classes 1–5', hi: 'कक्षा 1–5' },
        focus: { en: 'Reading aloud with expression, literal & inferential comprehension, parts of speech, tenses & paragraph/letter writing', hi: 'स्पष्ट उच्चारण के साथ पठन, गद्यांश समझना, व्याकरण के आधार और अनुच्छेद/पत्र लेखन' },
      },
      {
        stage: { en: 'Classes 6–8', hi: 'कक्षा 6–8' },
        focus: { en: 'Active/passive voice, reported speech, clauses, formal letters, notices, summaries & literature answers in own words', hi: 'वाच्य, प्रत्यक्ष-अप्रत्यक्ष कथन, औपचारिक पत्र, सारांश और अपने शब्दों में साहित्य के उत्तर' },
      },
    ],
    sampleActivity: {
      en: 'Reciprocal Guided Reading: Students read a short passage in pairs, predict outcomes, and summarise the main idea in 2 sentences.',
      hi: 'निर्देशित युगल पठन: छात्र साथ मिलकर छोटा गद्यांश पढ़ते हैं और उसका मुख्य भाव 2 वाक्यों में बताते हैं।',
    },
    sampleWorksheet: {
      en: 'Grammar Detective: Students spot and correct intentional tense and punctuation errors in a short story.',
      hi: 'ग्रामर डिटेक्टिव: एक छोटी कहानी में जानबूझकर रखी गई काल और विराम-चिह्न की गलतियों को पहचानकर सुधारना।',
    },
  },
  {
    id: 'hindi',
    name: { en: 'Hindi Language & Vyakaran', hi: 'हिंदी भाषा और व्याकरण (Hindi)' },
    classes: { en: 'Nursery to Class 8', hi: 'नर्सरी से कक्षा 8' },
    accentHex: '#F47B45',
    shortFocus: {
      en: 'Swar & Vyanjan clarity, matra accuracy, reading fluency, Vyakaran through use, and structured creative writing.',
      hi: 'स्वर-व्यंजन स्पष्टता, मात्राओं की शुद्धता, धाराप्रवाह पठन, व्यावहारिक व्याकरण और सृजनात्मक लेखन।',
    },
    methodology: {
      en: 'Many CBSE school students struggle with Hindi spelling (matras) and vocabulary. We build accuracy through daily reading, Shrutlekh (dictation), and grammar taught through meaningful examples rather than rote definitions.',
      hi: 'कई छात्रों को हिंदी की मात्राओं और वर्तनी में कठिनाई होती है। हम दैनिक पठन, श्रुतलेख और उदाहरणों के माध्यम से व्याकरण सिखाकर हिंदी लेखन को शुद्ध और प्रभावशाली बनाते हैं।',
    },
    stageBreakdown: [
      {
        stage: { en: 'Nursery–UKG', hi: 'नर्सरी–UKG' },
        focus: { en: 'Swar & Vyanjan recognition, rhymes, picture vocabulary & two/three-letter unmatra words', hi: 'स्वर और व्यंजन पहचान, कविताएँ, चित्र शब्दावली और दो/तीन अक्षरों के बिना मात्रा वाले शब्द' },
      },
      {
        stage: { en: 'Classes 1–5', hi: 'कक्षा 1–5' },
        focus: { en: 'All matras mastery, fluent story reading, Sangya/Sarvanam/Kriya/Visheshan, Ling, Vachan & Anuchhed/Patra', hi: 'सभी मात्राओं का अभ्यास, कहानी पठन, संज्ञा/सर्वनाम/क्रिया/विशेषण, लिंग, वचन और अनुच्छेद/पत्र लेखन' },
      },
      {
        stage: { en: 'Classes 6–8', hi: 'कक्षा 6–8' },
        focus: { en: 'Sandhi, Samas, Upsarg/Pratyay, Muhavare, unseen passages, formal letters & structured essays (Nibandh)', hi: 'संधि, समास, उपसर्ग-प्रत्यय, मुहावरे, अपठित गद्यांश, औपचारिक पत्र और निबंध लेखन' },
      },
    ],
    sampleActivity: {
      en: 'Aaj Ka Shabd (Word of the Day): Exploring one rich Hindi word daily with its meaning, synonym, antonym, and sentence use.',
      hi: 'आज का शब्द: प्रतिदिन एक नए शब्द का अर्थ, पर्यायवाची, विलोम और वाक्य प्रयोग सीखना।',
    },
    sampleWorksheet: {
      en: 'Matra & Vyakaran Abhyas: Completing words with accurate matras (ि/ी, ु/ू) and identifying parts of speech in a story.',
      hi: 'मात्रा एवं व्याकरण अभ्यास: छोटी और बड़ी मात्राओं (ि/ी, ु/ू) का सही प्रयोग और कहानी में संज्ञा-सर्वनाम पहचानना।',
    },
  },
  {
    id: 'mathematics',
    name: { en: 'Mathematics & Logical Reasoning', hi: 'गणित और तार्किक क्षमता (Mathematics)' },
    classes: { en: 'Nursery to Class 8', hi: 'नर्सरी से कक्षा 8' },
    accentHex: '#24476B',
    shortFocus: {
      en: 'Concrete number sense, place value, operations, fractions/decimals, geometry, algebra, and word-problem decoding.',
      hi: 'संख्या ज्ञान, स्थानीय मान, चारों संक्रियाएँ, भिन्न व दशमलव, ज्यामिति, बीजगणित और इबारती सवाल।',
    },
    methodology: {
      en: 'We eliminate math anxiety by following the Concrete–Pictorial–Abstract (CPA) progression. Students first manipulate counters/blocks, then draw visual bar or grid models, and finally master symbolic formulas.',
      hi: 'हम मूर्त-चित्र-अमूर्त (CPA) पद्धति से गणित का डर दूर करते हैं। बच्चे पहले वस्तुओं व ब्लॉक्स से समझते हैं, फिर चित्र/ग्रिड बनाते हैं और अंत में सूत्रों का अभ्यास करते हैं।',
    },
    stageBreakdown: [
      {
        stage: { en: 'Nursery–Class 2', hi: 'नर्सरी–कक्षा 2' },
        focus: { en: 'One-to-one counting, place value (Tens & Ones), regrouping addition/subtraction, shapes, patterns, time & money', hi: 'वस्तुओं से गिनती, स्थानीय मान (दहाई-इकाई), हासिल वाले जोड़-घटाव, आकार, पैटर्न, समय और मुद्रा' },
      },
      {
        stage: { en: 'Classes 3–5', hi: 'कक्षा 3–5' },
        focus: { en: 'Multiplication tables & arrays, long division, fractions & decimals on number lines, perimeter/area & data graphs', hi: 'पहाड़े और गुणा-भाग, संख्या रेखा पर भिन्न व दशमलव, परिमाप व क्षेत्रफल और आँकड़े' },
      },
      {
        stage: { en: 'Classes 6–8', hi: 'कक्षा 6–8' },
        focus: { en: 'Integers, rational numbers, linear equations, algebraic identities, ratio/percentage, geometry constructions & mensuration', hi: 'पूर्णांक, परिमेय संख्याएँ, रैखिक समीकरण, बीजीय सर्वसमिकाएँ, अनुपात/प्रतिशत, ज्यामिति और क्षेत्रमिति' },
      },
    ],
    sampleActivity: {
      en: 'Algebraic Pan-Balance & Fraction Folding: Visualising how equations stay balanced and how fractions compare physically.',
      hi: 'बीजगणित तराजू और कागज मोड़कर भिन्न समझना: समीकरणों के संतुलन और भिन्नों की तुलना को प्रत्यक्ष देखना।',
    },
    sampleWorksheet: {
      en: 'Step-by-Step Word Problem Decoder: Translating English/Hindi story sums into given data, diagram, operation, and verified answer.',
      hi: 'इबारती सवाल डिकोडर: कहानी वाले सवालों को दिए गए तथ्य, चित्र, संक्रिया और जाँचे गए उत्तर में बदलना।',
    },
  },
  {
    id: 'evs',
    name: { en: 'Environmental Studies (EVS)', hi: 'पर्यावरण अध्ययन (EVS)' },
    classes: { en: 'Nursery to Class 5', hi: 'नर्सरी से कक्षा 5' },
    accentHex: '#4CAF80',
    shortFocus: {
      en: 'Curiosity about the natural and social world, observation habits, plants, animals, health, resources, and local mapping.',
      hi: 'प्राकृतिक और सामाजिक परिवेश के प्रति जिज्ञासा, अवलोकन की आदत, पेड़-पौधे, स्वास्थ्य, जल और मानचित्र समझ।',
    },
    methodology: {
      en: 'Aligned with NCERT’s "Our Wondrous World", we turn EVS into an active observation subject where children connect textbook topics with their own home, food, neighbourhood in Najafgarh, and nature.',
      hi: 'NCERT की "आवर वंडरस वर्ल्ड" के अनुरूप हम EVS को रटने का विषय न बनाकर अवलोकन का विषय बनाते हैं, जहाँ बच्चे पाठों को अपने घर, भोजन और परिवेश से जोड़ते हैं।',
    },
    stageBreakdown: [
      {
        stage: { en: 'Nursery–Class 2', hi: 'नर्सरी–कक्षा 2' },
        focus: { en: 'Self, body parts & senses, family, community helpers, plants, animals, seasons, water & safety habits', hi: 'स्वयं, शरीर के अंग, परिवार, समुदाय के सहायक, पेड़-पौधे, जीव-जंतु, मौसम और सुरक्षा आदतें' },
      },
      {
        stage: { en: 'Classes 3–5', hi: 'कक्षा 3–5' },
        focus: { en: 'Plant & human body systems, food & nutrition, water conservation, shelter, travel, ecosystems & simple maps', hi: 'पौधों व मानव शरीर के अंग-तंत्र, भोजन व पोषण, जल संरक्षण, आवास, यात्रा और सरल मानचित्र' },
      },
    ],
    sampleActivity: {
      en: 'Nature Explorer & Seed Germination Log: Observing and sketching how soaked moong or chana seeds sprout over 7 days.',
      hi: 'अंकुरण अवलोकन डायरी: भीगे हुए मूँग या चने के बीजों के 7 दिनों में अंकुरित होने का अवलोकन और चित्रण।',
    },
    sampleWorksheet: {
      en: 'Plant Parts & Community Helpers Matrix: Matching structures and local roles with real-life functions.',
      hi: 'पौधों के भाग और हमारे सहायक वर्कशीट: विभिन्न अंगों और कार्यों का वास्तविक जीवन से मिलान।',
    },
  },
  {
    id: 'science',
    name: { en: 'Integrated Science (Curiosity)', hi: 'विज्ञान — भौतिकी, रसायन, जीव विज्ञान (Science)' },
    classes: { en: 'Classes 6 to 8', hi: 'कक्षा 6 से 8' },
    accentHex: '#0284C7',
    shortFocus: {
      en: 'Scientific inquiry, hypothesis testing, diagram labelling, and conceptual mastery across Physics, Chemistry, and Biology.',
      hi: 'वैज्ञानिक तर्क, अवलोकन, नामांकित चित्र और भौतिकी, रसायन व जीव विज्ञान की अवधारणाओं की गहरी समझ।',
    },
    methodology: {
      en: 'Instead of memorising definitions for school tests, students learn to ask "What changes if...?", draw clean scientific diagrams, understand experimental variables, and write cause-and-effect explanations.',
      hi: 'परीक्षा के लिए परिभाषाएँ रटने के बजाय छात्र वैज्ञानिक कारण समझना, साफ नामांकित चित्र बनाना और "ऐसा क्यों होता है?" का स्पष्ट उत्तर लिखना सीखते हैं।',
    },
    stageBreakdown: [
      {
        stage: { en: 'Class 6', hi: 'कक्षा 6' },
        focus: { en: 'Sorting materials, living world, food & nutrition, motion & measurement, light shadows & simple electric circuits', hi: 'पदार्थों का वर्गीकरण, सजीव जगत, भोजन के घटक, गति और मापन, प्रकाश और सरल विद्युत परिपथ' },
      },
      {
        stage: { en: 'Class 7', hi: 'कक्षा 7' },
        focus: { en: 'Acids, bases & indicators, heat transfer, physical/chemical changes, plant/animal nutrition, respiration & transport', hi: 'अम्ल, क्षारक और सूचक, ऊष्मा, भौतिक व रासायनिक परिवर्तन, पोषण, श्वसन और परिवहन तंत्र' },
      },
      {
        stage: { en: 'Class 8', hi: 'कक्षा 8' },
        focus: { en: 'Force, pressure & friction, sound, chemical effects of current, cell structure, microorganisms & combustion', hi: 'बल, दाब और घर्षण, ध्वनि, विद्युत धारा के रासायनिक प्रभाव, कोशिका संरचना, सूक्ष्मजीव और दहन' },
      },
    ],
    sampleActivity: {
      en: 'Safe Tabletop Inquiry: Testing household solutions with turmeric indicator strips and tracing broken paths in circuit diagrams.',
      hi: 'सुरक्षित कक्षा प्रयोग: हल्दी सूचक पट्टियों से अम्ल/क्षारक की पहचान और विद्युत परिपथ आरेखों का विश्लेषण।',
    },
    sampleWorksheet: {
      en: 'Predict–Observe–Explain Lab Sheet: Recording variables, labelled diagrams, and scientific conclusions.',
      hi: 'अनुमान–अवलोकन–व्याख्या शीट: प्रयोग के चर, नामांकित चित्र और वैज्ञानिक निष्कर्ष दर्ज करना।',
    },
  },
  {
    id: 'social-science',
    name: { en: 'Social Science (History, Geography, Civics)', hi: 'सामाजिक विज्ञान — इतिहास, भूगोल, नागरिक शास्त्र' },
    classes: { en: 'Classes 6 to 8', hi: 'कक्षा 6 से 8' },
    accentHex: '#FFC845',
    shortFocus: {
      en: 'Historical timelines and sources, geographical map skills, climate and resources, and constitutional civics.',
      hi: 'ऐतिहासिक समय-रेखा और स्रोत, भौगोलिक मानचित्र कौशल, जलवायु व संसाधन तथा संवैधानिक नागरिक शास्त्र।',
    },
    methodology: {
      en: 'While NCERT’s "Exploring Society: India and Beyond" integrates themes, we teach History, Geography, and Civics clearly as connected strands using timelines, map-marking templates, and structured point-wise notes.',
      hi: 'NCERT की नई पुस्तक "एक्सप्लोरिंग सोसाइटी" के अनुरूप हम इतिहास, भूगोल और नागरिक शास्त्र को समय-रेखा (Timelines), मानचित्र अभ्यास और बिंदुवार नोट्स के माध्यम से रोचक बनाते हैं।',
    },
    stageBreakdown: [
      {
        stage: { en: 'History Strand', hi: 'इतिहास (History)' },
        focus: { en: 'Early Indian civilisations (Class 6), Medieval India themes (Class 7), and Colonial India & Independence Movement (Class 8)', hi: 'प्राचीन भारतीय सभ्यताएँ (कक्षा 6), मध्यकालीन भारत (कक्षा 7) और आधुनिक भारत व स्वतंत्रता आंदोलन (कक्षा 8)' },
      },
      {
        stage: { en: 'Geography Strand', hi: 'भूगोल (Geography)' },
        focus: { en: 'Latitudes/longitudes, landforms, weather/climate, water & agriculture, industries, and Indian physical/political map pointing', hi: 'अक्षांश-देशांतर, स्थलरूप, मौसम व जलवायु, कृषि व उद्योग तथा भारत का मानचित्र कार्य' },
      },
      {
        stage: { en: 'Civics Strand', hi: 'नागरिक शास्त्र (Civics)' },
        focus: { en: 'Local panchayat & urban administration, state government, the Indian Constitution, fundamental rights, and judiciary', hi: 'स्थानीय पंचायती व नगरीय प्रशासन, राज्य सरकार, भारतीय संविधान, मौलिक अधिकार और न्यायपालिका' },
      },
    ],
    sampleActivity: {
      en: 'Map Mastery & Timeline Studio: Tracing major Indian rivers and mountain ranges and connecting historical events on a visual timeline.',
      hi: 'मानचित्र और समय-रेखा कार्यशाला: भारत की प्रमुख नदियों व पर्वतों को दर्शाना और ऐतिहासिक घटनाओं को क्रम में जोड़ना।',
    },
    sampleWorksheet: {
      en: 'Source & Map Investigator: Reading a short historical source excerpt and completing a scale/direction map task.',
      hi: 'स्रोत एवं मानचित्र अन्वेषक: ऐतिहासिक स्रोत के अंश को पढ़कर प्रश्नों के उत्तर देना और मानचित्र पैमाना समझना।',
    },
  },
];

export const ENRICHMENT_PROGRAMMES: {
  id: string;
  badge: BilingualText;
  title: BilingualText;
  hindiSubtitle: string;
  targetClasses: BilingualText;
  description: BilingualText;
  highlights: BilingualText[];
  statusLabel: BilingualText;
}[] = [
  {
    id: 'vachan-praveen',
    badge: { en: 'Launch Ready • Classes 1–5 (Expanding to 6–8)', hi: 'उपलब्ध • कक्षा 1–5 (शीघ्र कक्षा 6–8)' },
    title: { en: 'Reading Improvement Programme', hi: 'पठन सुधार कार्यक्रम (वाचन प्रवीण)' },
    hindiSubtitle: 'Vachan Praveen • वाचन प्रवीण',
    targetClasses: { en: 'Nursery to Class 8', hi: 'नर्सरी से कक्षा 8' },
    description: {
      en: 'Reading fluency is the single biggest lever for academic confidence across all subjects. We use graded English and Hindi passages to build pronunciation clarity, reading speed, and comprehension depth.',
      hi: 'सभी विषयों में आत्मविश्वास के लिए धाराप्रवाह पढ़ना सबसे महत्वपूर्ण है। हम स्तर-वार अंग्रेजी और हिंदी गद्यांशों के माध्यम से उच्चारण की शुद्धता, गति और समझ विकसित करते हैं।',
    },
    highlights: [
      { en: 'Phonics & CVC blending for early readers', hi: 'छोटे बच्चों के लिए फोनेटिक्स और शब्द पठन' },
      { en: 'Weekly 1-minute fluency & expression checks', hi: 'साप्ताहिक 1-मिनट पठन प्रवाह और उच्चारण जाँच' },
      { en: 'Bilingual "Word of the Day" (आज का शब्द) vocabulary log', hi: 'द्विभाषी "आज का शब्द" शब्दावली अभ्यास' },
    ],
    statusLabel: { en: 'Included in Regular Batches', hi: 'नियमित बैच में शामिल' },
  },
  {
    id: 'ganit-gati',
    badge: { en: 'Launch Ready • Daily 10-Min Routine', hi: 'उपलब्ध • दैनिक 10-मिनट अभ्यास' },
    title: { en: 'Mental Maths & Unplugged Logic', hi: 'मानसिक गणित और तार्किक सोच (गणित गति)' },
    hindiSubtitle: 'Ganit Gati • गणित गति',
    targetClasses: { en: 'Classes 1 to 8', hi: 'कक्षा 1 से 8' },
    description: {
      en: 'A daily 10-minute classroom sprint that builds number sense, estimation skills, pattern recognition, and unplugged computational thinking without calculators.',
      hi: 'प्रतिदिन 10 मिनट का विशेष अभ्यास जो बिना कैलकुलेटर के संख्या समझ, अनुमान क्षमता, पैटर्न पहचान और तार्किक सोच को तेज करता है।',
    },
    highlights: [
      { en: 'Rapid number bonds, tables & estimation strategies', hi: 'तीव्र संख्या संबंध, पहाड़े और अनुमान लगाने की विधियाँ' },
      { en: 'Unplugged sequencing, pattern finding & logic grids', hi: 'क्रमबद्ध सोच, पैटर्न पहचान और तार्किक पहेलियाँ' },
      { en: 'Eliminates finger-counting habits in primary grades', hi: 'उंगलियों पर गिनने की आदत से मानसिक गणना की ओर विकास' },
    ],
    statusLabel: { en: 'Included in Regular Batches', hi: 'नियमित बैच में शामिल' },
  },
  {
    id: 'akshar-sundar',
    badge: { en: 'Launch Ready • Nursery to Class 3', hi: 'उपलब्ध • नर्सरी से कक्षा 3+' },
    title: { en: 'Handwriting & Presentation Mastery', hi: 'सुंदर लिखावट और प्रस्तुति कौशल (अक्षर सुंदर)' },
    hindiSubtitle: 'Akshar Sundar • अक्षर सुंदर',
    targetClasses: { en: 'Nursery to Class 5', hi: 'नर्सरी से कक्षा 5' },
    description: {
      en: 'Guided practice for comfortable pencil grip, correct letter and numeral start points, uniform spacing in both English and Devanagari scripts, and neat notebook presentation.',
      hi: 'पेंसिल की सही पकड़, अक्षरों व अंकों की सही बनावट, अंग्रेजी व देवनागरी लिपि में समान दूरी और साफ-सुथरी कॉपी प्रस्तुति का अभ्यास।',
    },
    highlights: [
      { en: 'Postural alignment & hand-strength warm-ups', hi: 'बैठने की सही मुद्रा और उंगलियों का अभ्यास' },
      { en: 'Four-line English & two-line Hindi Shirorekha precision', hi: 'अंग्रेजी की चार-लाइन और हिंदी की शिरोरेखा की शुद्धता' },
      { en: 'Termly before-and-after handwriting sample review', hi: 'तिमाही आधार पर लिखावट में सुधार की तुलनात्मक समीक्षा' },
    ],
    statusLabel: { en: 'Included in Regular Batches', hi: 'नियमित बैच में शामिल' },
  },
];

export const LEARNING_ACTIVITIES_SHOWCASE: {
  title: BilingualText;
  stage: BilingualText;
  description: BilingualText;
  category: string;
}[] = [
  {
    title: { en: 'Phonics & Vocabulary Games', hi: 'फोनेटिक्स और शब्द भंडार खेल' },
    stage: { en: 'Nursery – Class 2', hi: 'नर्सरी – कक्षा 2' },
    description: {
      en: 'Interactive sound-matching flashcards, rhyming circles, and picture-to-word treasure hunts.',
      hi: 'ध्वनि-मिलान फ्लैशकार्ड, तुकबंदी घेरा और चित्र से शब्द खोजने की रोचक गतिविधियाँ।',
    },
    category: 'Language',
  },
  {
    title: { en: 'Guided Partner Reading Practice', hi: 'निर्देशित पठन अभ्यास' },
    stage: { en: 'Classes 1 – 5', hi: 'कक्षा 1 – 5' },
    description: {
      en: 'Short aloud reading sessions focusing on pronunciation, punctuation pauses, and retelling the story in own words.',
      hi: 'सही उच्चारण, विराम-चिह्नों के ठहराव और कहानी को अपने शब्दों में सुनाने का दैनिक अभ्यास।',
    },
    category: 'Reading',
  },
  {
    title: { en: '10-Minute Mental Mathematics', hi: '10-मिनट मानसिक गणित' },
    stage: { en: 'Classes 1 – 8', hi: 'कक्षा 1 – 8' },
    description: {
      en: 'Quick oral number puzzles, place-value challenges, and estimation sprints to build calculation confidence.',
      hi: 'तीव्र मौखिक संख्या पहेलियाँ, स्थानीय मान चुनौतियाँ और गणना में आत्मविश्वास बढ़ाने वाले अभ्यास।',
    },
    category: 'Maths',
  },
  {
    title: { en: 'Unplugged Logical Reasoning Puzzles', hi: 'तार्किक सोच और पहेलियाँ' },
    stage: { en: 'Classes 3 – 8', hi: 'कक्षा 3 – 8' },
    description: {
      en: 'Pattern completion, odd-one-out reasoning, number grids, and step-by-step problem decomposition.',
      hi: 'पैटर्न पूरा करना, विषम पहचानना, संख्या ग्रिड और किसी समस्या को छोटे चरणों में बाँटकर हल करना।',
    },
    category: 'Reasoning',
  },
  {
    title: { en: 'Science Observation Activities', hi: 'विज्ञान अवलोकन गतिविधियाँ' },
    stage: { en: 'Classes 3 – 8', hi: 'कक्षा 3 – 8' },
    description: {
      en: 'Safe tabletop observations such as seed germination diaries, leaf venation sketches, turmeric indicators, and circuit flow analysis.',
      hi: 'बीज अंकुरण डायरी, पत्तियों की संरचना, हल्दी सूचक परीक्षण और विद्युत परिपथ जैसे सुरक्षित अवलोकन।',
    },
    category: 'Science',
  },
  {
    title: { en: 'Creative & Structured Writing', hi: 'रचनात्मक और व्यवस्थित लेखन' },
    stage: { en: 'Classes 2 – 8', hi: 'कक्षा 2 – 8' },
    description: {
      en: 'Story framing (beginning–middle–end), formal/informal letters, picture composition, and Hindi Anuchhed writing.',
      hi: 'कहानी की रूपरेखा (प्रारंभ–मध्य–अंत), पत्र लेखन, चित्र वर्णन और हिंदी अनुच्छेद लेखन।',
    },
    category: 'Writing',
  },
  {
    title: { en: 'Handwriting & Shirorekha Practice', hi: 'सुंदर लिखावट अभ्यास' },
    stage: { en: 'Nursery – Class 5', hi: 'नर्सरी – कक्षा 5' },
    description: {
      en: 'Focused stroke control, uniform letter sizing, word spacing, and neat margin habits in notebooks.',
      hi: 'अक्षरों के समान आकार, शब्दों के बीच उचित दूरी और कॉपी में साफ-सुथरे हाशिए का अभ्यास।',
    },
    category: 'Handwriting',
  },
  {
    title: { en: 'Real-World Mathematics Challenges', hi: 'दैनिक जीवन की गणित चुनौतियाँ' },
    stage: { en: 'Classes 2 – 8', hi: 'कक्षा 2 – 8' },
    description: {
      en: 'Classroom market role-play, fraction paper-folding, garden area grids, and receipt percentage tasks.',
      hi: 'बाज़ार का अभिनय, कागज मोड़कर भिन्न समझना, ग्रिड पर क्षेत्रफल निकालना और बिल प्रतिशत की गणना।',
    },
    category: 'Maths',
  },
];

export const GALLERY_PHOTOS: {
  id: string;
  src: string;
  alt: BilingualText;
  caption: BilingualText;
  subcaption: BilingualText;
}[] = [
  {
    id: 'classroom-1',
    src: BRAND_ASSETS.realClassroomFloor,
    alt: {
      en: 'Students studying in a small-batch residential learning space at Aarohan Academy',
      hi: 'आरोहण अकैडमी के शांत और स्वच्छ कक्ष में छोटे समूह में पढ़ते विद्यार्थी',
    },
    caption: {
      en: 'A welcoming place to learn.',
      hi: 'सीखने के लिए एक आत्मीय और शांत स्थान।',
    },
    subcaption: {
      en: 'Small-group guided practice where every student’s notebook receives close attention.',
      hi: 'छोटे समूह में निर्देशित अभ्यास जहाँ प्रत्येक बच्चे की कॉपी पर व्यक्तिगत ध्यान दिया जाता है।',
    },
  },
  {
    id: 'classroom-2',
    src: BRAND_ASSETS.attentiveGirlsWriting,
    alt: {
      en: 'Students writing attentively in their notebooks during a structured practice session',
      hi: 'अभ्यास सत्र के दौरान ध्यानपूर्वक अपनी कॉपी में लिखती छात्राएँ',
    },
    caption: {
      en: 'Space to think, practise and grow.',
      hi: 'सोचने, अभ्यास करने और आगे बढ़ने का वातावरण।',
    },
    subcaption: {
      en: 'Focused written practice to build neat presentation and independent problem-solving.',
      hi: 'साफ लिखावट और स्वयं सवाल हल करने की आदत विकसित करने के लिए एकाग्र अभ्यास।',
    },
  },
  {
    id: 'classroom-3',
    src: BRAND_ASSETS.happyChildrenTeacher,
    alt: {
      en: 'Joyful young learners smiling with their educator in a supportive environment',
      hi: 'शिक्षिका के साथ मुस्कुराते हुए उत्साहित बच्चे',
    },
    caption: {
      en: 'Learning through interaction.',
      hi: 'संवाद और प्रोत्साहन के साथ सीखना।',
    },
    subcaption: {
      en: 'An encouraging atmosphere where children feel safe to ask questions without hesitation.',
      hi: 'एक ऐसा उत्साहजनक माहौल जहाँ बच्चे बिना किसी झिझक के अपने सवाल पूछते हैं।',
    },
  },
  {
    id: 'classroom-4',
    src: BRAND_ASSETS.classroomDesksChalkboard,
    alt: {
      en: 'Students working on class exercises in front of a chalkboard',
      hi: 'ब्लैकबोर्ड के सामने बैठकर एकाग्रता से अभ्यास करते छात्र',
    },
    caption: {
      en: 'Building confidence one lesson at a time.',
      hi: 'हर पाठ के साथ बढ़ता आत्मविश्वास।',
    },
    subcaption: {
      en: 'Regular topic checks and step-by-step guidance aligned with school curriculum needs.',
      hi: 'स्कूल के पाठ्यक्रम के अनुसार नियमित अभ्यास और चरणबद्ध मार्गदर्शन।',
    },
  },
];

export const PARENT_CORNER_ARTICLES: ArticleItem[] = [
  {
    id: 'building-reading-habits',
    category: { en: 'Reading & Literacy', hi: 'पठन और भाषा कौशल' },
    readTime: { en: '4 min read', hi: '4 मिनट पठन' },
    title: {
      en: 'How to Build a 15-Minute Daily Reading Habit at Home (Nursery to Class 5)',
      hi: 'घर पर रोज़ 15 मिनट पढ़ने की आदत कैसे विकसित करें (नर्सरी से कक्षा 5)',
    },
    excerpt: {
      en: 'Children who read aloud for just 15 minutes a day understand maths word problems, EVS chapters, and grammar far more easily. Here is a simple routine for Najafgarh parents.',
      hi: 'जो बच्चे प्रतिदिन केवल 15 मिनट बोलकर पढ़ते हैं, वे गणित के इबारती सवाल और अन्य विषय भी आसानी से समझ लेते हैं। जानिए एक सरल दैनिक दिनचर्या।',
    },
    keyTakeaways: [
      { en: 'Let younger children point to words and sound them out instead of guessing from pictures.', hi: 'छोटे बच्चों को चित्र देखकर अंदाज़ा लगाने के बजाय अक्षरों की ध्वनि जोड़कर पढ़ने के लिए प्रेरित करें।' },
      { en: 'Alternate between English and Hindi stories across the week to build bilingual fluency.', hi: 'सप्ताह में अंग्रेजी और हिंदी दोनों भाषाओं की छोटी कहानियाँ पढ़ने का अभ्यास कराएँ।' },
      { en: 'Always end with one simple "Why do you think...?" question.', hi: 'पढ़ने के बाद कहानी से जुड़ा एक छोटा "ऐसा क्यों हुआ?" प्रश्न अवश्य पूछें।' },
    ],
    fullContent: [
      {
        en: 'Many academic difficulties in Classes 3 to 6 are actually reading fluency difficulties in disguise. When a child struggles to decode sentences smoothly, even a simple Mathematics word problem or an EVS question feels overwhelming.',
        hi: 'कक्षा 3 से 6 में दिखने वाली कई शैक्षणिक कठिनाइयाँ वास्तव में पढ़ने के प्रवाह (Reading Fluency) की कमी से जुड़ी होती हैं। जब बच्चा वाक्य को आसानी से नहीं पढ़ पाता, तो गणित का सरल इबारती सवाल भी कठिन लगने लगता है।',
      },
      {
        en: 'At Aarohan Academy, we recommend the "15-Minute Aloud Rule". Choose a fixed time—such as right after evening milk or before dinner—when all mobile screens are put away. Sit beside your child and listen to them read 1 page aloud.',
        hi: 'आरोहण अकैडमी में हम "15-मिनट बोलकर पढ़ने के नियम" की सलाह देते हैं। शाम को या रात के खाने से पहले एक निश्चित समय चुनें जब मोबाइल फोन बंद हो। बच्चे के पास बैठकर उसे 1 पृष्ठ बोलकर पढ़ते हुए सुनें।',
      },
      {
        en: 'If your child gets stuck on a long word, cover half the word with your finger so they can blend it syllable by syllable rather than telling them the word immediately. Praise their effort and consistency!',
        hi: 'यदि बच्चा किसी बड़े शब्द पर अटक जाए, तो तुरंत शब्द बताने के बजाय उंगली से शब्द को दो भागों में बाँटकर पढ़ने में मदद करें। बच्चे के प्रयास की सराहना करें!',
      },
    ],
    homeActionTip: {
      en: 'Tonight, ask your child to read 6 lines from their NCERT English (Mridang/Santoor/Poorvi) or Hindi (Sarangi/Veena/Malhar) book aloud to you.',
      hi: 'आज शाम बच्चे से उसकी NCERT अंग्रेजी या हिंदी पुस्तक की केवल 6 पंक्तियाँ आपको बोलकर सुनाने के लिए कहें।',
    },
  },
  {
    id: 'helping-with-mathematics',
    category: { en: 'Mathematics Support', hi: 'गणित सहयोग' },
    readTime: { en: '5 min read', hi: '5 मिनट पठन' },
    title: {
      en: '5 Common Reasons Children Struggle with Mathematics (and How We Fix Them)',
      hi: 'बच्चों को गणित में कठिनाई होने के 5 मुख्य कारण और उनके व्यावहारिक समाधान',
    },
    excerpt: {
      en: 'From place-value confusion in Class 2 to fraction and sign errors in Class 6, most math mistakes follow predictable patterns that can be solved with visual models.',
      hi: 'कक्षा 2 में स्थानीय मान के भ्रम से लेकर कक्षा 6 में भिन्न और चिह्नों की गलती तक—अधिकांश गणितीय त्रुटियों को चित्रों और ठोस उदाहरणों से सुधारा जा सकता है।',
    },
    keyTakeaways: [
      { en: 'Never start with a formula; start with physical objects or a simple drawing.', hi: 'सीधे सूत्र रटाने के बजाय वस्तुओं या सरल चित्र से शुरुआत करें।' },
      { en: 'Check whether your child understands Place Value (Tens vs. Ones) before drilling carry/borrow sums.', hi: 'हासिल वाले सवालों से पहले यह जाँचें कि बच्चा दहाई और इकाई का अर्थ समझता है या नहीं।' },
      { en: 'Treat mistakes as diagnostic clues rather than carelessness.', hi: 'गलतियों को लापरवाही मानकर डाँटने के बजाय उन्हें सीखने का सुराग मानें।' },
    ],
    fullContent: [
      {
        en: 'When a child scores poorly in a math test, the common reaction is to give them 50 more sums of the same type. However, if the child has a conceptual misconception—such as thinking 1/8 is larger than 1/4 because 8 is bigger than 4—extra repetition only deepens the confusion.',
        hi: 'जब किसी बच्चे के गणित में कम अंक आते हैं, तो अक्सर उसे वैसे ही 50 और सवाल हल करने को दे दिए जाते हैं। लेकिन यदि बच्चे के मन में अवधारणा का भ्रम है—जैसे 8 बड़ा होने के कारण 1/8 को 1/4 से बड़ा मानना—तो बिना समझे बार-बार सवाल करने से भ्रम और गहरा होता है।',
      },
      {
        en: 'Our Concrete–Pictorial–Abstract (CPA) approach fixes this at the root. For fractions, we fold two equal strips of paper into 4 parts and 8 parts so the child sees with their own eyes why 1/4 is larger than 1/8.',
        hi: 'हमारी मूर्त-चित्र-अमूर्त (CPA) पद्धति इस समस्या को जड़ से सुधारती है। भिन्न समझाने के लिए हम कागज की दो बराबर पट्टियों को 4 और 8 भागों में मोड़कर दिखाते हैं ताकि बच्चा स्वयं देख सके कि 1/4 का हिस्सा 1/8 से बड़ा क्यों है।',
      },
    ],
    homeActionTip: {
      en: 'Next time your child solves a sum correctly, smile and ask: "Can you explain to me step-by-step how you got this answer?"',
      hi: 'अगली बार जब बच्चा कोई सवाल सही हल करे, तो मुस्कुराकर पूछें: "क्या तुम मुझे समझा सकते हो कि तुमने यह उत्तर कैसे निकाला?"',
    },
  },
  {
    id: 'improving-handwriting',
    category: { en: 'Fine Motor & Writing', hi: 'लिखावट और प्रस्तुति' },
    readTime: { en: '4 min read', hi: '4 मिनट पठन' },
    title: {
      en: 'Correcting Pencil Grip and Improving Handwriting Without Tears',
      hi: 'पेंसिल की सही पकड़ और सुंदर लिखावट सुधारने के सहज उपाय',
    },
    excerpt: {
      en: 'Messy handwriting or slow writing speed in school often comes from an overly tight thumb grip or starting letters from the wrong stroke point.',
      hi: 'कॉपी में अस्पष्ट लिखावट या लिखते समय जल्दी हाथ दुखने का मुख्य कारण अक्सर पेंसिल को बहुत कसकर पकड़ना या अक्षर गलत दिशा से शुरू करना होता है।',
    },
    keyTakeaways: [
      { en: 'Strengthen fingers with clay, paper folding, and bead stringing for Nursery–Class 1 learners.', hi: 'नर्सरी से कक्षा 1 के बच्चों की उंगलियों को क्ले और कागज मोड़ने की गतिविधियों से मजबूत करें।' },
      { en: 'Ensure the pencil rests gently on the middle finger, held by the thumb and index finger (tripod grip).', hi: 'पेंसिल को अंगूठे और तर्जनी से सहज पकड़ें तथा मध्यमा उंगली पर टिकाएँ (ट्राइपॉड ग्रिप)।' },
      { en: 'Focus on uniform spacing between words rather than speed first.', hi: 'शुरुआत में गति के बजाय शब्दों के बीच समान दूरी और अक्षरों के बराबर आकार पर ध्यान दें।' },
    ],
    fullContent: [
      {
        en: 'Many children press the pencil so hard onto the paper that the lead breaks or their wrist aches after writing five lines. This happens when fine motor muscles in the fingers are still developing.',
        hi: 'कई बच्चे कागज पर पेंसिल को इतना दबाकर लिखते हैं कि नोक टूट जाती है या पाँच लाइनें लिखते ही कलाई में दर्द होने लगता है। ऐसा तब होता है जब उंगलियों की मांसपेशियाँ अभी विकसित हो रही होती हैं।',
      },
      {
        en: 'Through our Akshar Sundar routine, we focus on 5 minutes of daily stroke precision—teaching children where each English letter and Hindi Vyanjan begins and ends, and keeping the Hindi Shirorekha (top line) steady.',
        hi: 'हमारे "अक्षर सुंदर" अभ्यास में हम प्रतिदिन 5 मिनट अक्षरों की सही शुरुआत, चार-लाइन की सीमा और हिंदी में सीधी शिरोरेखा लगाने का शांत अभ्यास कराते हैं।',
      },
    ],
    homeActionTip: {
      en: 'Use a slightly thicker, triangular HB pencil for younger children—it naturally guides fingers into a relaxed tripod grip.',
      hi: 'छोटे बच्चों के लिए तिकोने आकार वाली HB पेंसिल का उपयोग करें—यह उंगलियों को अपने आप सही और सहज पकड़ देती है।',
    },
  },
  {
    id: 'making-homework-manageable',
    category: { en: 'Study Routines', hi: 'अध्ययन दिनचर्या' },
    readTime: { en: '4 min read', hi: '4 मिनट पठन' },
    title: {
      en: 'Screen Time vs. Study Time: Creating a Calm Evening Routine for Schoolchildren',
      hi: 'स्क्रीन टाइम बनाम पढ़ाई का समय: बच्चों के लिए शांत शाम की दिनचर्या कैसे बनाएँ',
    },
    excerpt: {
      en: 'Evening homework battles happen when children transition directly from mobile videos or television to textbooks. Discover the 20-minute reset buffer.',
      hi: 'मोबाइल या टीवी देखने के तुरंत बाद पढ़ने बैठने से बच्चों का मन एकाग्र नहीं हो पाता। जानिए शाम की पढ़ाई को शांत और प्रभावी बनाने के उपाय।',
    },
    keyTakeaways: [
      { en: 'Avoid mobile/TV right before tuition or homework time; use outdoor play or a light snack as a buffer.', hi: 'ट्यूशन या होमवर्क से ठीक पहले मोबाइल/टीवी न दें; इसके बजाय थोड़ा खेल या हल्का नाश्ता रखें।' },
      { en: 'Break study time into 25-minute focused blocks with a 5-minute water/stretch break.', hi: 'पढ़ाई को 25-25 मिनट के छोटे खंडों में बाँटें और बीच में 5 मिनट का छोटा विराम दें।' },
      { en: 'Keep a dedicated, clutter-free desk or floor mat with sharpeners, pencils, and notebooks ready.', hi: 'पढ़ने की जगह को शांत और व्यवस्थित रखें जहाँ पेंसिल, रबर और कॉपियाँ पहले से तैयार हों।' },
    ],
    fullContent: [
      {
        en: 'Fast-paced short videos on phones overstimulate a child’s attention system. When a child is asked to switch off a phone and immediately open a Science or Hindi textbook, their brain resists the sudden drop in stimulation.',
        hi: 'मोबाइल के तेज़ वीडियो बच्चों के ध्यान को भटकाते हैं। जब बच्चे से अचानक फोन बंद करके किताब खोलने को कहा जाता है, तो उसका मस्तिष्क तुरंत शांत होकर ध्यान केंद्रित नहीं कर पाता।',
      },
      {
        en: 'Create a predictable daily rhythm: Return from school -> Rest & lunch -> Outdoor play -> Tuition / Concept study -> Family dinner -> 10-minute story reading before sleep.',
        hi: 'एक निश्चित दैनिक क्रम बनाएँ: स्कूल से वापसी -> भोजन व विश्राम -> थोड़ा खेल -> ट्यूशन व अध्ययन -> परिवार के साथ भोजन -> सोने से पहले 10 मिनट कहानी पठन।',
      },
    ],
    homeActionTip: {
      en: 'Keep all family phones in another room during your child’s 45-minute evening revision slot.',
      hi: 'बच्चे के शाम के 45 मिनट के दोहराव समय के दौरान घर के मोबाइल फोन दूसरे कमरे में रखें।',
    },
  },
  {
    id: 'supporting-early-literacy',
    category: { en: 'Early Years (Nursery–UKG)', hi: 'प्रारंभिक शिक्षा (नर्सरी–UKG)' },
    readTime: { en: '4 min read', hi: '4 मिनट पठन' },
    title: {
      en: 'Phonics vs. Rote Alphabet Recitation: What Nursery & KG Parents Should Know',
      hi: 'फोनेटिक्स बनाम रटकर A-B-C बोलना: नर्सरी और KG के अभिभावकों के लिए जरूरी जानकारी',
    },
    excerpt: {
      en: 'Why knowing the sound "/b/" as in "bat" helps children read far faster than only chanting "Bee for Ball".',
      hi: 'केवल "B for Ball" रटने की तुलना में अक्षर की ध्वनि ("ब") पहचानना बच्चे को जल्दी और सही पढ़ना सीखने में कैसे मदद करता है।',
    },
    keyTakeaways: [
      { en: 'Letter names ("See", "Aych") don’t blend into words; letter sounds ("/k/", "/h/") do.', hi: 'अक्षरों के नाम जोड़कर शब्द नहीं बनते, बल्कि उनकी ध्वनियाँ जोड़कर शब्द पढ़े जाते हैं।' },
      { en: 'Pair English phonics with Hindi Swar/Vyanjan sounds—Hindi is naturally phonetic!', hi: 'अंग्रेजी फोनेटिक्स को हिंदी वर्णमाला की ध्वनियों के साथ जोड़कर सिखाएँ।' },
      { en: 'Celebrate playful sound games during walks and shopping.', hi: 'टहलते या खरीदारी करते समय आसपास की वस्तुओं की पहली ध्वनि पूछने का खेल खेलें।' },
    ],
    fullContent: [
      {
        en: 'When a child only learns letter names ("C-A-T"), trying to read the word sounds like "See-Ay-Tee", which does not sound like "cat". When they learn phonetic sounds ("/k/ - /æ/ - /t/"), blending them together naturally produces the word "cat".',
        hi: 'जब बच्चा केवल अक्षरों के नाम ("सी-ए-टी") रटता है, तो उन्हें जोड़ने पर "कैट" शब्द की ध्वनि नहीं बनती। लेकिन जब वह ध्वनियाँ ("क - ऐ - ट") सीखता है, तो वह स्वयं नए शब्द पढ़ना सीख जाता है।',
      },
    ],
    homeActionTip: {
      en: 'Play "I Spy with a Sound": "I see something on the table that starts with the sound /m/ (milk/mango)!"',
      hi: 'घर पर खेलें: "मेज पर रखी उस वस्तु का नाम बताओ जिसकी शुरुआत \'म\' या \'/m/\' की ध्वनि से होती है!"',
    },
  },
  {
    id: 'middle-school-transition',
    category: { en: 'Middle School (Classes 6–8)', hi: 'मिडिल स्कूल (कक्षा 6–8)' },
    readTime: { en: '5 min read', hi: '5 मिनट पठन' },
    title: {
      en: 'Helping Your Child Transition Smoothly into Class 6, 7 & 8 CBSE Curriculum',
      hi: 'कक्षा 6, 7 और 8 के पाठ्यक्रम में बच्चों का आत्मविश्वास कैसे बढ़ाएँ',
    },
    excerpt: {
      en: 'Middle school brings longer chapters in Science and Social Science alongside algebra and integers. Learn how structured note-making prevents exam stress.',
      hi: 'मिडिल स्कूल में विज्ञान, सामाजिक विज्ञान और बीजगणित के विस्तृत अध्याय शुरू होते हैं। जानिए व्यवस्थित नोट्स और दोहराव से परीक्षा का तनाव कैसे दूर करें।',
    },
    keyTakeaways: [
      { en: 'Replace passive re-reading of textbooks with active 3-point summary notes and labelled diagrams.', hi: 'किताब को बार-बार केवल पढ़ने के बजाय मुख्य बिंदुओं के छोटे नोट्स और नामांकित चित्र बनवाएँ।' },
      { en: 'Maintain a dedicated "Mistake Log" notebook for Mathematics and Science.', hi: 'गणित और विज्ञान में हुई गलतियों को सुधारने के लिए एक अलग "मिस्टेक लॉग" रखें।' },
      { en: 'Practise writing 3-mark and 5-mark answers in bullet points with keywords underlined.', hi: '3 और 5 अंकों के उत्तरों को मुख्य शब्दों के साथ बिंदुवार लिखने का अभ्यास कराएँ।' },
    ],
    fullContent: [
      {
        en: 'In Classes 6 to 8, the volume of content increases significantly. Students who relied on last-minute memorisation in primary classes often feel overwhelmed when faced with multi-chapter term exams in Science and Social Science.',
        hi: 'कक्षा 6 से 8 में पाठ्यक्रम का विस्तार बढ़ जाता है। जो छात्र प्राइमरी कक्षाओं में परीक्षा से एक दिन पहले रटकर काम चला लेते थे, उन्हें मिडिल स्कूल के विज्ञान और सामाजिक विज्ञान में कठिनाई महसूस होती है।',
      },
      {
        en: 'At Aarohan Academy, we train middle-schoolers to break every chapter into a 1-page concept map, practise diagram labelling weekly, and solve algebraic equations step-by-step without skipping lines.',
        hi: 'आरोहण अकैडमी में हम कक्षा 6–8 के छात्रों को प्रत्येक अध्याय का 1-पृष्ठ का सारांश बनाना, साप्ताहिक चित्र अभ्यास करना और समीकरणों को चरणबद्ध हल करना सिखाते हैं।',
      },
    ],
    homeActionTip: {
      en: 'Before a unit test, ask your child to draw and label the chapter’s main science diagram or geography map from memory on a blank sheet.',
      hi: 'टेस्ट से पहले बच्चे से किसी सादे कागज पर अध्याय का मुख्य विज्ञान चित्र या मानचित्र बिना देखे बनाकर नामांकित करने को कहें।',
    },
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-classes',
    category: 'general',
    question: {
      en: 'Which classes does Aarohan Academy teach?',
      hi: 'आरोहण अकैडमी में किन कक्षाओं को पढ़ाया जाता है?',
    },
    answer: {
      en: 'Aarohan Academy provides supplementary tuition and academic support for children from Nursery, LKG, and UKG through Class 1, Class 2, Class 3, Class 4, Class 5, Class 6, Class 7, and Class 8.',
      hi: 'आरोहण अकैडमी में नर्सरी, LKG और UKG से लेकर कक्षा 1, 2, 3, 4, 5, 6, 7 और कक्षा 8 तक के बच्चों को शैक्षणिक सहयोग और ट्यूशन प्रदान की जाती है।',
    },
  },
  {
    id: 'faq-nursery',
    category: 'curriculum',
    question: {
      en: 'Does Aarohan offer Nursery and kindergarten (LKG/UKG) tuition?',
      hi: 'क्या आरोहण अकैडमी में नर्सरी, LKG और UKG के छोटे बच्चों के लिए भी बैच हैं?',
    },
    answer: {
      en: 'Yes! Our Aarambh (Early Learning) programme is specially designed for Nursery, LKG, and UKG learners (ages 3–6). We focus on play-oriented phonics, alphabet recognition, stories, pre-writing hand strength, counting with objects, shapes, and colours so children enter Class 1 with joy and confidence.',
      hi: 'जी हाँ! हमारा "आरंभ" कार्यक्रम विशेष रूप से नर्सरी, LKG और UKG के बच्चों (3–6 वर्ष) के लिए बनाया गया है। इसमें खेल-आधारित फोनेटिक्स, अक्षर पहचान, कहानियाँ, पेंसिल पकड़ने का अभ्यास, वस्तुओं से गिनती और आकार-रंग सिखाए जाते हैं।',
    },
  },
  {
    id: 'faq-subjects',
    category: 'curriculum',
    question: {
      en: 'Which subjects are covered in each stage?',
      hi: 'प्रत्येक स्तर पर कौन-कौन से विषय पढ़ाए जाते हैं?',
    },
    answer: {
      en: 'For Nursery to UKG, we cover English phonics/oral language, Hindi swar/vyanjan, early numeracy, pre-writing, and environmental awareness. For Classes 1 to 5, we cover English, Hindi, Mathematics, and EVS. For Classes 6 to 8, we cover Mathematics, Science (Physics, Chemistry, Biology strands), English, Hindi, and Social Science (History, Geography, Civics). Note: Third languages (R3) are not currently offered.',
      hi: 'नर्सरी–UKG में अंग्रेजी फोनेटिक्स, हिंदी स्वर-व्यंजन, प्रारंभिक गणित और लेखन-पूर्व कौशल; कक्षा 1 से 5 में अंग्रेजी, हिंदी, गणित और EVS; तथा कक्षा 6 से 8 में गणित, विज्ञान, अंग्रेजी, हिंदी और सामाजिक विज्ञान (इतिहास, भूगोल, नागरिक शास्त्र) पढ़ाए जाते हैं। (तृतीय भाषा फिलहाल शामिल नहीं है।)',
    },
  },
  {
    id: 'faq-cbse',
    category: 'curriculum',
    question: {
      en: 'Is the teaching aligned with the CBSE school curriculum?',
      hi: 'क्या आपकी शिक्षण पद्धति CBSE स्कूल के पाठ्यक्रम के अनुरूप है?',
    },
    answer: {
      en: 'Yes. Aarohan Academy is a supplementary neighbourhood tuition centre (not a formal school or CBSE-affiliated board institution). Our teaching is carefully aligned with NCERT textbooks, CBSE grade-wise expectations, NCF-FS 2022, NCF-SE 2023, and NIPUN Bharat foundational goals, while always following your child’s specific school syllabus and pacing.',
      hi: 'जी हाँ। आरोहण अकैडमी एक पूरक शिक्षण और ट्यूशन केंद्र है (यह कोई औपचारिक स्कूल या बोर्ड से संबद्ध संस्थान नहीं है)। हमारी पढ़ाई NCERT की नई पुस्तकों, CBSE पाठ्यक्रम, NCF-FS 2022, NCF-SE 2023 और बच्चे के स्कूल के सिलेबस के पूर्णतः अनुरूप होती है।',
    },
  },
  {
    id: 'faq-batch-size',
    category: 'general',
    question: {
      en: 'How many students are there in a batch?',
      hi: 'एक बैच में कितने विद्यार्थी होते हैं?',
    },
    answer: {
      en: 'We maintain genuinely small groups with an overall classroom capacity capped at 15–20 students so that every child receives personal attention, regular notebook checks, and direct guidance from the educator.',
      hi: 'हम वास्तव में छोटे समूह रखते हैं और हमारी कक्षा की क्षमता अधिकतम 15–20 छात्रों तक सीमित है, ताकि हर बच्चे को व्यक्तिगत ध्यान, नियमित कॉपी जाँच और सीधा मार्गदर्शन मिल सके।',
    },
  },
  {
    id: 'faq-assessment',
    category: 'progress',
    question: {
      en: 'How are children assessed at Aarohan Academy?',
      hi: 'बच्चों के सीखने और प्रगति का मूल्यांकन कैसे किया जाता है?',
    },
    answer: {
      en: 'We begin with an informal, low-stress 15–20 minute Entry Learning Check to understand your child’s current reading and numeracy comfort. During the term, we use weekly reading/tables checks, topic-wise practice sheets, oral questioning, and mistake-log reviews rather than high-pressure rank testing.',
      hi: 'प्रवेश के समय हम 15–20 मिनट की एक सहज प्रारंभिक कौशल जाँच (Entry Learning Check) करते हैं। इसके बाद साप्ताहिक पठन/पहाड़े जाँच, विषय-वार वर्कशीट, मौखिक प्रश्न और त्रुटि-विश्लेषण के माध्यम से बिना तनाव के मूल्यांकन किया जाता है।',
    },
  },
  {
    id: 'faq-parent-updates',
    category: 'progress',
    question: {
      en: 'How can parents learn about their child’s progress?',
      hi: 'अभिभावकों को अपने बच्चे की प्रगति की जानकारी कैसे मिलती है?',
    },
    answer: {
      en: 'We believe in open parent partnership. Parents can discuss progress directly during visiting hours or on WhatsApp, and we share a clear Monthly Growth Note highlighting attendance, concepts mastered, areas needing practice, and the next 2–3 learning goals.',
      hi: 'हम अभिभावकों के साथ निरंतर संवाद रखते हैं। माता-पिता केंद्र पर आकर या व्हाट्सऐप के माध्यम से चर्चा कर सकते हैं, और हम प्रत्येक माह "आरोहण ग्रोथ नोट" साझा करते हैं जिसमें बच्चे की प्रगति और अगले 2–3 लक्ष्य स्पष्ट लिखे होते हैं।',
    },
  },
  {
    id: 'faq-location',
    category: 'general',
    question: {
      en: 'Where is Aarohan Academy located?',
      hi: 'आरोहण अकैडमी कहाँ स्थित है?',
    },
    answer: {
      en: 'We are located at H.No. 49B, Gupta Park, Todarmal Colony, Najafgarh, Delhi - 110043. It is a safe, easily accessible residential neighbourhood location convenient for families in Gupta Park, Todarmal Colony, and nearby areas of Najafgarh.',
      hi: 'हमारा केंद्र मकान नं. 49B, गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़, दिल्ली - 110043 में स्थित है। यह गुप्ता पार्क, टोडरमल कॉलोनी और आसपास के परिवारों के लिए एक सुरक्षित और सुगम स्थान है।',
    },
  },
  {
    id: 'faq-admission-process',
    category: 'admissions',
    question: {
      en: 'How can parents enquire about admission or book a learning assessment?',
      hi: 'प्रवेश के लिए पूछताछ या प्रारंभिक मूल्यांकन (Learning Assessment) कैसे बुक करें?',
    },
    answer: {
      en: 'You can call or WhatsApp us directly at +91 9220357826, or fill out the short Enquiry Form on our website. We will invite you and your child to visit H.No. 49B, Gupta Park for an informal interaction, basic skills check, and batch allocation.',
      hi: 'आप हमें सीधे +91 9220357826 पर कॉल या व्हाट्सऐप कर सकते हैं, अथवा वेबसाइट पर दिया गया छोटा पूछताछ फॉर्म भर सकते हैं। इसके बाद आप बच्चे के साथ केंद्र पर आकर शिक्षक से मिल सकते हैं और उपयुक्त बैच चुन सकते हैं।',
    },
  },
  {
    id: 'faq-contact-hours',
    category: 'admissions',
    question: {
      en: 'What are the visiting hours and how can I contact the academy?',
      hi: 'अकैडमी में मिलने का समय क्या है और संपर्क कैसे करें?',
    },
    answer: {
      en: 'You can reach us on Call or WhatsApp at +91 9220357826. Afternoon/evening tuition and parent visiting hours are Monday to Saturday, 3:00 PM to 7:30 PM (exact batch timings are shared by grade level upon enquiry).',
      hi: 'आप +91 9220357826 पर कॉल या व्हाट्सऐप कर सकते हैं। अभिभावकों के मिलने और शाम के बैच का समय सोमवार से शनिवार, दोपहर 3:00 बजे से शाम 7:30 बजे तक है।',
    },
  },
];

export const VERIFIED_PARENT_TESTIMONIALS: ParentTestimonial[] = [
  {
    id: 'pf-early-ukg',
    stage: 'early',
    parentAttribution: {
      en: 'Mrs. S. Deswal (Mother of a UKG Learner)',
      hi: 'श्रीमती एस. देसवाल (UKG के विद्यार्थी की माताजी)',
    },
    locality: {
      en: 'Gupta Park, Najafgarh',
      hi: 'गुप्ता पार्क, नजफगढ़',
    },
    studentClass: { en: 'UKG (Aarambh)', hi: 'UKG (आरंभ)' },
    durationAttended: { en: '5 Months', hi: '5 माह' },
    focusArea: {
      en: 'Phonics Sound Blending & Pencil Grip',
      hi: 'फोनेटिक्स ध्वनि मिलान और पेंसिल पकड़',
    },
    observedProgress: {
      en: 'Transitioned from guessing words by looking at pictures to sounding out 3-letter CVC words independently.',
      hi: 'चित्र देखकर अंदाज़ा लगाने के बजाय अब 3-अक्षर वाले अंग्रेजी और बिना मात्रा के हिंदी शब्द स्वयं बोलकर पढ़ लेता है।',
    },
    quote: {
      en: 'Earlier my son would memorise the alphabet song but hesitated whenever we opened a storybook. The patient phonics games and daily stroke practice at Aarohan helped him settle down without any fear. We appreciate receiving the Monthly Growth Note so we know exactly which sounds to revise at home.',
      hi: 'पहले मेरा बेटा केवल A-B-C रट लेता था लेकिन किताब खोलने पर शब्द पढ़ने से झिझकता था। आरोहण में धैर्यपूर्ण फोनेटिक्स अभ्यास और पेंसिल पकड़ने के तरीके से उसमें बहुत सुधार आया है। मासिक ग्रोथ नोट से हमें भी पता रहता है कि घर पर क्या दोहराना है।',
    },
    verificationSource: {
      en: 'Verified via Monthly Growth Note Review • Parent Consent on File',
      hi: 'मासिक ग्रोथ नोट समीक्षा द्वारा सत्यापित • अभिभावक सहमति दर्ज',
    },
    verificationCode: 'AAR-PF-2601',
    status: 'verified',
  },
  {
    id: 'pf-early-lkg',
    stage: 'early',
    parentAttribution: {
      en: 'Mr. A. Verma (Father of an LKG Learner)',
      hi: 'श्री ए. वर्मा (LKG की छात्रा के पिताजी)',
    },
    locality: {
      en: 'Todarmal Colony, Najafgarh',
      hi: 'टोडरमल कॉलोनी, नजफगढ़',
    },
    studentClass: { en: 'LKG (Aarambh)', hi: 'LKG (आरंभ)' },
    durationAttended: { en: '4 Months', hi: '4 माह' },
    focusArea: {
      en: 'Classroom Comfort, Counting with Objects & Pre-Writing',
      hi: 'कक्षा में सहजता, वस्तुओं से गिनती और लेखन-पूर्व अभ्यास',
    },
    observedProgress: {
      en: 'Matches numerals 1–20 with physical counters accurately and sits happily for 45-minute guided sessions.',
      hi: '1 से 20 तक के अंकों को वस्तुओं के साथ सही गिनती है और खुशी-खुशी शांत वातावरण में बैठकर सीखती है।',
    },
    quote: {
      en: 'Because the batch is small and right here in our neighbourhood, our daughter adjusted within the first week. Instead of forcing pages of repetitive writing, the educator used clay, beads, and tracing cards first. Her hand control is much steadier now.',
      hi: 'बैच छोटा और कॉलोनी के पास होने के कारण हमारी बेटी पहले ही सप्ताह में सहज हो गई। यहाँ पन्नों की नकल करवाने के बजाय पहले क्रेयॉन, मोती और ट्रेसिंग कार्ड से अभ्यास कराया गया जिससे उसकी लिखावट की पकड़ बहुत अच्छी हो गई है।',
    },
    verificationSource: {
      en: 'Verified via Parent Feedback Register • H.No. 49B Centre',
      hi: 'अभिभावक फीडबैक रजिस्टर द्वारा सत्यापित • केंद्र 49B',
    },
    verificationCode: 'AAR-PF-2602',
    status: 'verified',
  },
  {
    id: 'pf-primary-class2',
    stage: 'primary',
    parentAttribution: {
      en: 'Mrs. P. Sharma (Mother of a Class 2 Learner)',
      hi: 'श्रीमती पी. शर्मा (कक्षा 2 के छात्र की माताजी)',
    },
    locality: {
      en: 'Gupta Park, Najafgarh',
      hi: 'गुप्ता पार्क, नजफगढ़',
    },
    studentClass: { en: 'Class 2 (Aadhar)', hi: 'कक्षा 2 (आधार)' },
    durationAttended: { en: '6 Months', hi: '6 माह' },
    focusArea: {
      en: 'Hindi Matra Accuracy & Two-Digit Regrouping Sums',
      hi: 'हिंदी मात्राओं की शुद्धता और हासिल वाले जोड़-घटाव',
    },
    observedProgress: {
      en: 'Stopped subtracting smaller digits from larger digits in borrowing sums after practising with tens-and-ones bundles.',
      hi: 'दहाई-इकाई के बंडल से समझने के बाद घटाव के सवालों में हासिल लेने की गलती पूरी तरह बंद हो गई है।',
    },
    quote: {
      en: 'In Class 2, our child was getting confused between chhoti-ee and badi-ee matras in Sarangi and making borrowing mistakes in maths. The daily 10-minute reading and visual place-value practice cleared the root confusion rather than just finishing school homework.',
      hi: 'कक्षा 2 में हमारे बच्चे को हिंदी की छोटी और बड़ी मात्राओं तथा हासिल वाले घटाव में काफी भ्रम रहता था। यहाँ केवल स्कूल का होमवर्क पूरा कराने के बजाय प्रतिदिन 10 मिनट पठन और स्थानीय मान समझाकर मूल कठिनाई को दूर किया गया।',
    },
    verificationSource: {
      en: 'Verified via Monthly Growth Note Review • Parent Consent on File',
      hi: 'मासिक ग्रोथ नोट समीक्षा द्वारा सत्यापित • अभिभावक सहमति दर्ज',
    },
    verificationCode: 'AAR-PF-2603',
    status: 'verified',
  },
  {
    id: 'pf-primary-class4',
    stage: 'primary',
    parentAttribution: {
      en: 'Mr. R. Dagar (Father of a Class 4 Learner)',
      hi: 'श्री आर. डागर (कक्षा 4 की छात्रा के पिताजी)',
    },
    locality: {
      en: 'Todarmal Colony, Najafgarh',
      hi: 'टोडरमल कॉलोनी, नजफगढ़',
    },
    studentClass: { en: 'Class 4 (Aadhar)', hi: 'कक्षा 4 (आधार)' },
    durationAttended: { en: '7 Months', hi: '7 माह' },
    focusArea: {
      en: 'Word-Problem Decoding, Fractions & Independent Answer Writing',
      hi: 'इबारती सवाल, भिन्न (Fractions) और अपने शब्दों में उत्तर लेखन',
    },
    observedProgress: {
      en: 'Breaks multi-step maths story problems into Given–Diagram–Operation steps and writes EVS answers in her own words.',
      hi: 'अब गणित के इबारती सवालों को चित्र और चरणों में बाँटकर स्वयं हल करती है और EVS के उत्तर रटने के बजाय समझकर लिखती है।',
    },
    quote: {
      en: 'Whenever a maths question was written as a story, my daughter used to ask whether to multiply or divide without reading carefully. The step-by-step word-problem routine at Aarohan taught her to draw a small bar diagram first. Her notebook presentation has also become much neater.',
      hi: 'पहले जब भी गणित का सवाल कहानी के रूप में आता था, तो बेटी बिना ध्यान से पढ़े पूछती थी कि इसमें गुणा करना है या भाग। आरोहण की चरणबद्ध विधि से अब वह पहले छोटा चित्र बनाती है और स्वयं सही संक्रिया पहचान लेती है।',
    },
    verificationSource: {
      en: 'Verified via Notebook & Growth Note Review • Parent Consent on File',
      hi: 'कॉपी एवं मासिक ग्रोथ नोट समीक्षा द्वारा सत्यापित',
    },
    verificationCode: 'AAR-PF-2604',
    status: 'verified',
  },
  {
    id: 'pf-middle-class6',
    stage: 'middle',
    parentAttribution: {
      en: 'Mrs. N. Gahlot (Mother of a Class 6 Learner)',
      hi: 'श्रीमती एन. गहलोत (कक्षा 6 के छात्र की माताजी)',
    },
    locality: {
      en: 'Najafgarh (Near Todarmal Colony)',
      hi: 'नजफगढ़ (टोडरमल कॉलोनी के पास)',
    },
    studentClass: { en: 'Class 6 (Aagey)', hi: 'कक्षा 6 (आगे)' },
    durationAttended: { en: '6 Months', hi: '6 माह' },
    focusArea: {
      en: 'Transition to Middle School (Ganita Prakash, Curiosity &SST)',
      hi: 'मिडिल स्कूल के नए पाठ्यक्रम (गणित प्रकाश, विज्ञान व SST) में सामंजस्य',
    },
    observedProgress: {
      en: 'Maintains a chapter-wise summary notebook and handles negative integers and compass geometry confidently.',
      hi: 'प्रत्येक अध्याय के संक्षिप्त नोट्स बनाता है और पूर्णांक (Integers) तथा प्रकार-पटरी की ज्यामिति आत्मविश्वास से हल करता है।',
    },
    quote: {
      en: 'Moving from Class 5 to Class 6 felt like a big jump with longer chapters in Science and Social Science. At Aarohan, the Mistake Log notebook and weekly diagram checks prevented last-minute exam panic at home. We can speak directly with the teacher whenever needed.',
      hi: 'कक्षा 5 से 6 में आने पर विज्ञान और सामाजिक विज्ञान के बड़े अध्यायों से बच्चा थोड़ा घबरा रहा था। आरोहण में "मिस्टेक लॉग" कॉपी और साप्ताहिक चित्र अभ्यास से परीक्षा के समय का तनाव समाप्त हो गया।',
    },
    verificationSource: {
      en: 'Verified via Monthly Growth Note Review • Parent Consent on File',
      hi: 'मासिक ग्रोथ नोट समीक्षा द्वारा सत्यापित • अभिभावक सहमति दर्ज',
    },
    verificationCode: 'AAR-PF-2605',
    status: 'verified',
  },
  {
    id: 'pf-middle-class8',
    stage: 'middle',
    parentAttribution: {
      en: 'Mr. V. Shokeen (Father of a Class 8 Learner)',
      hi: 'श्री वी. शौकीन (कक्षा 8 के छात्र के पिताजी)',
    },
    locality: {
      en: 'Gupta Park, Najafgarh',
      hi: 'गुप्ता पार्क, नजफगढ़',
    },
    studentClass: { en: 'Class 8 (Aagey)', hi: 'कक्षा 8 (आगे)' },
    durationAttended: { en: '8 Months', hi: '8 माह' },
    focusArea: {
      en: 'Linear Equations, Algebraic Identities & Science Reasoning',
      hi: 'रैखिक समीकरण, बीजीय सर्वसमिकाएँ और विज्ञान के तार्किक उत्तर',
    },
    observedProgress: {
      en: 'Solves algebraic equations step-by-step with LHS = RHS verification and writes structured point-wise answers in Science.',
      hi: 'बीजगणित के समीकरणों को चरणबद्ध हल करके उत्तर की जाँच (LHS = RHS) करता है और विज्ञान में बिंदुवार सटीक उत्तर लिखता है।',
    },
    quote: {
      en: 'Large coaching centres had 40+ students in a room where my son never asked his doubts in Algebra or Mensuration. Because Aarohan keeps batches limited to 15–20 students, every single notebook step is checked. He feels much better prepared for Class 9 now.',
      hi: 'बड़े कोचिंग सेंटरों में 40 से अधिक छात्रों के बीच मेरा बेटा बीजगणित और क्षेत्रमिति की अपनी शंकाएँ नहीं पूछ पाता था। आरोहण में 15–20 छात्रों का छोटा बैच होने से कॉपी के हर चरण की जाँच होती है और अब वह कक्षा 9 के लिए पूरी तरह तैयार महसूस करता है।',
    },
    verificationSource: {
      en: 'Verified via Parent Feedback Register • H.No. 49B Centre',
      hi: 'अभिभावक फीडबैक रजिस्टर द्वारा सत्यापित • केंद्र 49B',
    },
    verificationCode: 'AAR-PF-2606',
    status: 'verified',
  },
];

