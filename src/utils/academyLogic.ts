export type Language = 'en' | 'hi';

export type PageId =
  | 'home'
  | 'about'
  | 'approach'
  | 'programmes'
  | 'prog-early'
  | 'prog-primary-1-2'
  | 'prog-primary-3-5'
  | 'prog-middle-6-8'
  | 'subjects'
  | 'assessment'
  | 'library'
  | 'parent-corner'
  | 'faqs'
  | 'admissions'
  | 'contact'
  | 'privacy';

export type DifficultyLevel = 'Start' | 'Build' | 'Challenge';

export interface LibraryResource {
  id: number;
  title: { en: string; hi: string };
  classGroup: string;
  gradeTags: string[];
  subject: string;
  topic: string;
  difficulty: DifficultyLevel;
  objective: { en: string; hi: string };
  format: { en: string; hi: string };
  fileName: string;
  status: 'ready' | 'coming-soon';
  worksheetPreview: {
    instructionsEn: string;
    instructionsHi: string;
    tasks: { promptEn: string; promptHi: string; hint?: string }[];
    parentTipEn: string;
    parentTipHi: string;
  };
}

export interface LibraryFilterState {
  classFilter: string;
  subjectFilter: string;
  topicFilter: string;
  difficultyFilter: string;
  searchQuery: string;
}

export interface EnquiryFormInput {
  parentName: string;
  phone: string;
  studentClass: string;
  preferredProgramme: string;
  message: string;
  consentGiven: boolean;
}

export interface EnquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof EnquiryFormInput, string>>;
}

export const ACADEMY_PHONE_RAW = '919220357826';
export const ACADEMY_PHONE_DISPLAY = '+91 9220357826';
export const ACADEMY_ADDRESS_EN =
  'H.No. 54B, Gupta Park, Todarmal Colony, Najafgarh, Delhi - 110043, India';
export const ACADEMY_ADDRESS_HI =
  'मकान नं. 54B, गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़, दिल्ली - 110043, भारत';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hello Aarohan Academy! I would like to know more about tuition classes for my child. Please share the programme and admission details.';

export function buildWhatsAppUrl(customMessage?: string): string {
  const text = (customMessage && customMessage.trim()) || DEFAULT_WHATSAPP_MESSAGE;
  return `https://wa.me/${ACADEMY_PHONE_RAW}?text=${encodeURIComponent(text)}`;
}

export function buildGoogleMapsDirectionsUrl(): string {
  const destination = 'H.No. 54B, Gupta Park, Todarmal Colony, Najafgarh, New Delhi, Delhi 110043';
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

export function validateEnquiryForm(
  input: EnquiryFormInput,
  lang: Language = 'en'
): EnquiryValidationResult {
  const errors: Partial<Record<keyof EnquiryFormInput, string>> = {};

  const trimmedName = input.parentName.trim();
  if (!trimmedName || trimmedName.length < 2) {
    errors.parentName =
      lang === 'en'
        ? 'Please enter the parent or guardian name (at least 2 characters).'
        : 'कृपया माता-पिता या अभिभावक का नाम दर्ज करें (कम से कम 2 अक्षर)।';
  }

  const digitsOnly = input.phone.replace(/[\s\-+()]/g, '');
  const normalizedPhone = digitsOnly.startsWith('91') && digitsOnly.length === 12
    ? digitsOnly.slice(2)
    : digitsOnly.startsWith('0') && digitsOnly.length === 11
      ? digitsOnly.slice(1)
      : digitsOnly;

  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    errors.phone =
      lang === 'en'
        ? 'Please enter a valid 10-digit Indian mobile number.'
        : 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।';
  }

  if (!input.studentClass.trim()) {
    errors.studentClass =
      lang === 'en'
        ? "Please select your child's current class."
        : 'कृपया बच्चे की वर्तमान कक्षा चुनें।';
  }

  if (!input.preferredProgramme.trim()) {
    errors.preferredProgramme =
      lang === 'en'
        ? 'Please select a preferred learning programme.'
        : 'कृपया पसंदीदा शिक्षण कार्यक्रम चुनें।';
  }

  if (!input.consentGiven) {
    errors.consentGiven =
      lang === 'en'
        ? 'Please provide consent to be contacted regarding your enquiry.'
        : 'कृपया अपनी पूछताछ के संबंध में संपर्क किए जाने के लिए सहमति दें।';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterLibraryResources(
  resources: LibraryResource[],
  filters: LibraryFilterState
): LibraryResource[] {
  const query = filters.searchQuery.trim().toLowerCase();

  return resources.filter((item) => {
    if (filters.classFilter && filters.classFilter !== 'All') {
      const matchesClass =
        item.classGroup === filters.classFilter ||
        item.gradeTags.includes(filters.classFilter);
      if (!matchesClass) return false;
    }

    if (filters.subjectFilter && filters.subjectFilter !== 'All') {
      if (item.subject.toLowerCase() !== filters.subjectFilter.toLowerCase()) {
        return false;
      }
    }

    if (filters.topicFilter && filters.topicFilter !== 'All') {
      if (item.topic.toLowerCase() !== filters.topicFilter.toLowerCase()) {
        return false;
      }
    }

    if (filters.difficultyFilter && filters.difficultyFilter !== 'All') {
      if (item.difficulty !== filters.difficultyFilter) {
        return false;
      }
    }

    if (query) {
      const haystack = [
        item.title.en,
        item.title.hi,
        item.subject,
        item.topic,
        item.classGroup,
        item.objective.en,
        item.objective.hi,
        item.fileName,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}

export function getPageSeoMeta(
  page: PageId,
  lang: Language
): { title: string; description: string } {
  const seoMap: Record<PageId, { en: { title: string; description: string }; hi: { title: string; description: string } }> = {
    home: {
      en: {
        title: 'Aarohan Academy | Tuition Classes in Najafgarh (Nursery to Class 8)',
        description:
          'Small-batch supplementary tuition for Nursery to Class 8 (CBSE curriculum support) at H.No. 54B, Gupta Park, Todarmal Colony, Najafgarh, Delhi.',
      },
      hi: {
        title: 'आरोहण अकैडमी | नजफगढ़ में नर्सरी से कक्षा 8 तक व्यक्तिगत ट्यूशन',
        description:
          'गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़ में नर्सरी से कक्षा 8 के लिए छोटे बैच (15–20 छात्र) और अवधारणा-आधारित CBSE पाठ्यक्रम सहयोग।',
      },
    },
    about: {
      en: {
        title: 'About Aarohan Academy | Neighbourhood Tuition Centre in Najafgarh',
        description:
          'Learn about Aarohan Academy at Gupta Park, Todarmal Colony, Najafgarh—a warm, child-centred supplementary learning space for Nursery to Class 8.',
      },
      hi: {
        title: 'हमारे बारे में | आरोहण अकैडमी नजफगढ़ (गुप्ता पार्क, टोडरमल कॉलोनी)',
        description:
          'जानिए आरोहण अकैडमी की कहानी, हमारी शिक्षण दर्शन और गुप्ता पार्क, नजफगढ़ में नर्सरी से कक्षा 8 तक छोटे बैच की शिक्षा।',
      },
    },
    approach: {
      en: {
        title: 'Our Teaching Approach | Concept-Based Learning at Aarohan Academy',
        description:
          'Explore our 4-step Understand-Practise-Review-Grow methodology, Concrete-Pictorial-Abstract (CPA) approach, and NCF-aligned supplementary teaching.',
      },
      hi: {
        title: 'हमारी शिक्षण पद्धति | आरोहण अकैडमी नजफगढ़',
        description:
          'समझें, अभ्यास करें, समीक्षा करें और आगे बढ़ें—खेल-आधारित फाउंडेशन से लेकर मिडिल स्कूल की तार्किक समझ तक हमारी शिक्षण प्रणाली।',
      },
    },
    programmes: {
      en: {
        title: 'Learning Programmes (Nursery to Class 8) | Aarohan Academy Najafgarh',
        description:
          'Explore structured small-batch tuition programmes across Early Learning (Nursery–UKG), Primary (Classes 1–5), and Middle School (Classes 6–8).',
      },
      hi: {
        title: 'शिक्षण कार्यक्रम (नर्सरी से कक्षा 8) | आरोहण अकैडमी नजफगढ़',
        description:
          'आरंभ (नर्सरी–UKG), आधार (कक्षा 1–5) और आगे (कक्षा 6–8) के लिए विस्तृत कक्षा-वार पाठ्यक्रम और शिक्षण सहयोग।',
      },
    },
    'prog-early': {
      en: {
        title: 'Nursery, LKG & UKG Tuition in Najafgarh | Aarambh Early Learning',
        description:
          'Play-oriented early childhood learning in Gupta Park, Najafgarh: phonics, alphabet recognition, stories, number sense, shapes, and fine motor skills.',
      },
      hi: {
        title: 'नर्सरी, LKG और UKG ट्यूशन नजफगढ़ | आरंभ प्रारंभिक शिक्षा',
        description:
          'खेल-आधारित प्रारंभिक शिक्षा: फोनेटिक्स, अक्षर पहचान, कहानियाँ, गिनती, आकार और लेखन की मजबूत शुरुआत।',
      },
    },
    'prog-primary-1-2': {
      en: {
        title: 'Classes 1 & 2 Tuition in Najafgarh | Foundational Literacy & Numeracy',
        description:
          'Build reading fluency, phonics, Hindi matras, place value, and addition/subtraction for Class 1 and Class 2 students in Todarmal Colony, Najafgarh.',
      },
      hi: {
        title: 'कक्षा 1 और 2 ट्यूशन नजफगढ़ | बुनियादी भाषा और गणित कौशल',
        description:
          'कक्षा 1 और 2 के बच्चों के लिए धाराप्रवाह पठन, हिंदी मात्राएँ, स्थानीय मान, जोड़-घटाव और पर्यावरण जागरूकता।',
      },
    },
    'prog-primary-3-5': {
      en: {
        title: 'Classes 3 to 5 CBSE Tuition in Najafgarh | Primary Learning Support',
        description:
          'Strengthen English & Hindi comprehension, grammar, multiplication, division, fractions, geometry, and EVS for Classes 3, 4, and 5 in Najafgarh.',
      },
      hi: {
        title: 'कक्षा 3 से 5 ट्यूशन नजफगढ़ | प्राथमिक स्तर शिक्षण सहयोग',
        description:
          'कक्षा 3, 4 और 5 के लिए अंग्रेजी व हिंदी व्याकरण, गुणा-भाग, भिन्न, ज्यामिति और पर्यावरण अध्ययन (EVS) की स्पष्ट समझ।',
      },
    },
    'prog-middle-6-8': {
      en: {
        title: 'Classes 6 to 8 Maths, Science & English Tuition in Najafgarh',
        description:
          'Structured middle school tuition for Classes 6, 7, and 8 in Gupta Park, Najafgarh covering Mathematics, Science, English, Hindi, and Social Science.',
      },
      hi: {
        title: 'कक्षा 6 से 8 गणित, विज्ञान और अंग्रेजी ट्यूशन | आरोहण अकैडमी',
        description:
          'कक्षा 6, 7 और 8 के छात्रों के लिए गणित, विज्ञान, सामाजिक विज्ञान, अंग्रेजी और हिंदी में गहरी समझ और परीक्षा की तैयारी।',
      },
    },
    subjects: {
      en: {
        title: 'Subject-Wise Tuition & Enrichment | Maths, English, Science, Hindi',
        description:
          'Discover how Aarohan Academy teaches English, Hindi, Mathematics, EVS, Science, and Social Science along with reading and mental maths enrichment.',
      },
      hi: {
        title: 'विषय-वार शिक्षण और कौशल संवर्धन | आरोहण अकैडमी नजफगढ़',
        description:
          'अंग्रेजी, हिंदी, गणित, ईवीएस, विज्ञान और सामाजिक विज्ञान के साथ वाचन प्रवीण, गणित गति और अक्षर सुंदर कार्यक्रम।',
      },
    },
    assessment: {
      en: {
        title: 'Assessment & Aarohan Growth Journey | Progress Tracking for Parents',
        description:
          'See how we track every child’s conceptual progress through topic checks, error analysis, and our Monthly Growth Note for parents.',
      },
      hi: {
        title: 'मूल्यांकन और आरोहण विकास यात्रा | अभिभावकों के लिए प्रगति रिपोर्ट',
        description:
          'नियमित अभ्यास, त्रुटि विश्लेषण और मासिक प्रगति नोट के माध्यम से हर बच्चे के सीखने के सफर की पारदर्शी जानकारी।',
      },
    },
    library: {
      en: {
        title: 'Aarohan Learning Library | 30 Free Printable Worksheets (Nursery–8)',
        description:
          'Explore and print 30 original A4 learning worksheets, phonics cards, math puzzles, and weekly brain challenges for Nursery to Class 8.',
      },
      hi: {
        title: 'आरोहण लर्निंग लाइब्रेरी | 30 निःशुल्क अभ्यास वर्कशीट (नर्सरी–कक्षा 8)',
        description:
          'नर्सरी से कक्षा 8 तक के बच्चों के लिए 30 मूल वर्कशीट, फोनेटिक्स कार्ड, गणित पहेलियाँ और साप्ताहिक दिमागी चुनौतियाँ।',
      },
    },
    'parent-corner': {
      en: {
        title: 'Parent Corner | Practical Study & Parenting Guides | Aarohan Academy',
        description:
          'Helpful bilingual articles for parents on building reading habits, overcoming math anxiety, improving handwriting, and managing homework.',
      },
      hi: {
        title: 'अभिभावक कॉर्नर | बच्चों की पढ़ाई के लिए उपयोगी लेख और सुझाव',
        description:
          'पढ़ने की आदत, गणित का डर दूर करने, सुंदर लिखावट और घर पर पढ़ाई की दिनचर्या बनाने के लिए व्यावहारिक मार्गदर्शिकाएँ।',
      },
    },
    faqs: {
      en: {
        title: 'Frequently Asked Questions (FAQs) | Aarohan Academy Najafgarh',
        description:
          'Answers to common parent questions about classes offered, CBSE alignment, batch sizes, learning assessments, location, and parent feedback.',
      },
      hi: {
        title: 'अक्सर पूछे जाने वाले प्रश्न (FAQs) | आरोहण अकैडमी नजफगढ़',
        description:
          'कक्षाओं, छोटे बैच, CBSE पाठ्यक्रम सहयोग, मूल्यांकन, समय और प्रवेश प्रक्रिया से जुड़े अभिभावकों के सभी प्रश्नों के उत्तर।',
      },
    },
    admissions: {
      en: {
        title: 'Admissions & Learning Assessment Enquiry | Aarohan Academy',
        description:
          'Book a diagnostic learning assessment or enquire about small-batch admission for Nursery to Class 8 at Gupta Park, Todarmal Colony, Najafgarh.',
      },
      hi: {
        title: 'प्रवेश और शिक्षण मूल्यांकन पूछताछ | आरोहण अकैडमी नजफगढ़',
        description:
          'नर्सरी से कक्षा 8 तक छोटे बैच में प्रवेश और प्रारंभिक कौशल मूल्यांकन बुक करने के लिए फॉर्म भरें या व्हाट्सऐप करें।',
      },
    },
    contact: {
      en: {
        title: 'Contact Us | H.No. 54B, Gupta Park, Todarmal Colony, Najafgarh',
        description:
          'Call or WhatsApp +91 9220357826 or visit Aarohan Academy at H.No. 54B, Gupta Park, Todarmal Colony, Najafgarh, Delhi.',
      },
      hi: {
        title: 'संपर्क करें | मकान नं. 54B, गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़',
        description:
          '+91 9220357826 पर कॉल या व्हाट्सऐप करें अथवा मकान नं. 54B, गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़, दिल्ली पर पधारें।',
      },
    },
    privacy: {
      en: {
        title: 'Child Safety & Privacy Policy (DPDP Compliant) | Aarohan Academy',
        description:
          'Our commitment to child safety, parent consent, data minimization under the DPDP framework, and physical classroom safety standards.',
      },
      hi: {
        title: 'बाल सुरक्षा और गोपनीयता नीति | आरोहण अकैडमी नजफगढ़',
        description:
          'बच्चों की सुरक्षा, अभिभावकों की सहमति, न्यूनतम डेटा संग्रह और सुरक्षित कक्षा वातावरण के प्रति हमारी प्रतिबद्धता।',
      },
    },
  };

  return seoMap[page][lang];
}

export type TestimonialStageFilter = 'all' | 'early' | 'primary' | 'middle';

export interface ParentTestimonial {
  id: string;
  stage: 'early' | 'primary' | 'middle';
  parentAttribution: { en: string; hi: string };
  locality: { en: string; hi: string };
  studentClass: { en: string; hi: string };
  durationAttended: { en: string; hi: string };
  focusArea: { en: string; hi: string };
  observedProgress: { en: string; hi: string };
  quote: { en: string; hi: string };
  verificationSource: { en: string; hi: string };
  verificationCode: string;
  status: 'verified' | 'pending-verification';
}

export interface ParentFeedbackSubmissionInput {
  parentInitialsOrName: string;
  registeredPhone: string;
  studentClass: string;
  stage: 'early' | 'primary' | 'middle';
  focusArea: string;
  feedbackText: string;
  privacyConsent: boolean;
}

export interface ParentFeedbackValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ParentFeedbackSubmissionInput, string>>;
}

export function filterParentTestimonials(
  testimonials: ParentTestimonial[],
  stageFilter: TestimonialStageFilter
): ParentTestimonial[] {
  if (!stageFilter || stageFilter === 'all') {
    return testimonials;
  }
  return testimonials.filter((item) => item.stage === stageFilter);
}

export function validateParentFeedbackInput(
  input: ParentFeedbackSubmissionInput,
  lang: Language = 'en'
): ParentFeedbackValidationResult {
  const errors: Partial<Record<keyof ParentFeedbackSubmissionInput, string>> = {};

  if (!input.parentInitialsOrName || input.parentInitialsOrName.trim().length < 2) {
    errors.parentInitialsOrName =
      lang === 'en'
        ? 'Please enter parent initials or name (at least 2 characters).'
        : 'कृपया अभिभावक का नाम या आद्याक्षर दर्ज करें (कम से कम 2 अक्षर)।';
  }

  const digitsOnly = input.registeredPhone.replace(/[\s\-+()]/g, '');
  const normalizedPhone =
    digitsOnly.startsWith('91') && digitsOnly.length === 12
      ? digitsOnly.slice(2)
      : digitsOnly.startsWith('0') && digitsOnly.length === 11
        ? digitsOnly.slice(1)
        : digitsOnly;

  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    errors.registeredPhone =
      lang === 'en'
        ? 'Please enter your 10-digit registered mobile number for parent verification.'
        : 'कृपया सत्यापन के लिए अपना 10 अंकों का पंजीकृत मोबाइल नंबर दर्ज करें।';
  }

  if (!input.studentClass.trim()) {
    errors.studentClass =
      lang === 'en'
        ? "Please select your child's class."
        : 'कृपया बच्चे की कक्षा चुनें।';
  }

  if (!input.focusArea.trim() || input.focusArea.trim().length < 3) {
    errors.focusArea =
      lang === 'en'
        ? 'Please mention the subject or habit where you noticed improvement.'
        : 'कृपया वह विषय या आदत लिखें जिसमें आपने सुधार देखा है।';
  }

  if (!input.feedbackText.trim() || input.feedbackText.trim().length < 15) {
    errors.feedbackText =
      lang === 'en'
        ? 'Please share a brief reflection (at least 15 characters) about your child’s learning experience.'
        : 'कृपया बच्चे के सीखने के अनुभव के बारे में संक्षिप्त प्रतिक्रिया लिखें (कम से कम 15 अक्षर)।';
  }

  if (!input.privacyConsent) {
    errors.privacyConsent =
      lang === 'en'
        ? 'Please confirm parent consent to display your reflection discreetly using initials.'
        : 'कृपया केवल आद्याक्षरों के साथ अपनी प्रतिक्रिया प्रदर्शित करने की सहमति दें।';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

