export interface SeoLandingPageData {
  slug: string;
  category: 'class' | 'subject' | 'locality';
  targetClass?: string;
  targetSubject?: string;
  targetLocality?: string;
  h1En: string;
  h1Hi: string;
  metaTitleEn: string;
  metaTitleHi: string;
  metaDescEn: string;
  metaDescHi: string;
  valuePropEn: string;
  valuePropHi: string;
  badgeEn: string;
  badgeHi: string;
  introEn: string;
  introHi: string;
  subjectsCovered: string[];
  keyChaptersEn: string[];
  keyChaptersHi: string[];
  teachingApproachEn: string;
  teachingApproachHi: string;
  whyAarohanEn: string[];
  whyAarohanHi: string[];
  faqs: {
    questionEn: string;
    questionHi: string;
    answerEn: string;
    answerHi: string;
  }[];
  testimonial: {
    parentName: string;
    studentClass: string;
    quoteEn: string;
    quoteHi: string;
    locality: string;
  };
  relatedLinks: {
    slug: string;
    labelEn: string;
    labelHi: string;
  }[];
}

export const SEO_LANDING_PAGES: Record<string, SeoLandingPageData> = {
  // CLASS 1
  'class-1-tuition': {
    slug: 'class-1-tuition',
    category: 'class',
    targetClass: 'Class 1',
    h1En: 'Class 1 Tuition Classes in Najafgarh (CBSE / ICSE Foundation)',
    h1Hi: 'नजफगढ़ में कक्षा 1 के लिए ट्यूशन कक्षाएं (CBSE / ICSE फाउंडेशन)',
    metaTitleEn: 'Class 1 Tuition Classes in Najafgarh | Aarohan Academy',
    metaTitleHi: 'कक्षा 1 ट्यूशन नजफगढ़ | आरोहण अकैडमी गुप्ता पार्क',
    metaDescEn: 'Small-batch Class 1 tuition in Gupta Park, Todarmal Colony, Najafgarh. Phonics, basic maths, English handwriting & mental math for 5-6 year olds.',
    metaDescHi: 'गुप्ता पार्क, नजफगढ़ में कक्षा 1 के बच्चों के लिए व्यक्तिगत ट्यूशन। पठन, गणितीय बुनियादी समझ और सुंदर लिखावट पर विशेष ध्यान।',
    valuePropEn: 'Transform Early Hesitation into Confident Reading & Number Sense (Max 12 Students)',
    valuePropHi: 'झिझक दूर कर धाराप्रवाह पठन और बुनियादी अंकगणित में आत्मविश्वास (अधिकतम 12 बच्चे)',
    badgeEn: 'Grade 1 Foundation Batch',
    badgeHi: 'कक्षा 1 फाउंडेशन बैच',
    introEn: 'Transitioning from Kindergarten to Class 1 brings formal notebooks, English sentences, and structured arithmetic. At Aarohan Academy, we ensure 5-6 year olds develop strong phonics, neat pencil grip, and joyful number sense without academic stress.',
    introHi: 'यूकेजी से कक्षा 1 में आने पर बच्चे पहली बार औपचारिक नोटबुक और वाक्यों का सामना करते हैं। आरोहण अकैडमी में हम बिना किसी दबाव के फोनिक्स, लिखावट और बुनियादी गणित को खेल-खेल में मजबूत करते हैं।',
    subjectsCovered: ['Mathematics (Mental Math)', 'English Reading & Phonics', 'Hindi Vyakaran & Varnamala', 'EVS & General Awareness'],
    keyChaptersEn: ['Numbers 1 to 100 & Place Value', 'Single-digit Addition & Subtraction', 'Sight Words & Sentence Reading', 'Animal & Plant Habitats'],
    keyChaptersHi: ['1 से 100 तक गिनती व स्थानीय मान', 'एक अंकीय जोड़ व घटाव', 'वाक्य पठन व सुंदर लिखावट', 'पर्यावरण और सामान्य ज्ञान'],
    teachingApproachEn: 'Using concrete beads, story cards, and pictorial number lines so children visualize math before writing formulas.',
    teachingApproachHi: 'गिनती की मोतियों, कहानी कार्डों और चित्रों द्वारा बच्चों को पहले अवधारणा समझाना, फिर लिखाना।',
    whyAarohanEn: [
      'Maximum 12 children per batch ensures the teacher sits with every child daily',
      'Daily notebook checks and homework assistance so parents stay stress-free',
      'Focus on neat handwriting, pencil grip, and phonics pronunciation',
      'Safe, CCTV-monitored ground floor classrooms in Gupta Park',
    ],
    whyAarohanHi: [
      'प्रति बैच अधिकतम 12 बच्चे, जिससे शिक्षक हर बच्चे को व्यक्तिगत समय दे सकें',
      'स्कूल के गृहकार्य में पूरी सहायता ताकि माता-पिता को घर पर तनाव न हो',
      'सुंदर लिखावट और सही उच्चारण पर विशेष मार्गदर्शन',
      'गुप्ता पार्क में सुरक्षित, सीसीटीवी निगरानी युक्त शांत कक्षाएं',
    ],
    faqs: [
      {
        questionEn: 'How many students are there in a Class 1 batch?',
        questionHi: 'कक्षा 1 के बैच में कितने बच्चे होते हैं?',
        answerEn: 'Our Class 1 batches are strictly capped at 10 to 12 students to ensure young learners receive continuous teacher attention.',
        answerHi: 'हमारे कक्षा 1 के बैच में अधिकतम 10 से 12 बच्चे होते हैं ताकि प्रत्येक बच्चे को शिक्षक का पूरा ध्यान मिल सके।',
      },
      {
        questionEn: 'Do you help with school homework for Class 1?',
        questionHi: 'क्या आप स्कूल के गृहकार्य में मदद करते हैं?',
        answerEn: 'Yes, the first 15 minutes of every daily session are dedicated to clearing school homework doubts and ensuring complete understanding.',
        answerHi: 'हाँ, प्रतिदिन पहले 15 मिनट स्कूल के गृहकार्य को समझकर पूरा कराने के लिए समर्पित होते हैं।',
      },
    ],
    testimonial: {
      parentName: 'Pooja Sharma',
      studentClass: 'Class 1 Parent',
      quoteEn: 'My son was struggling with sentence reading in Class 1. After 2 months at Aarohan, his reading fluency and handwriting have improved dramatically.',
      quoteHi: 'मेरा बेटा कक्षा 1 में अंग्रेज़ी वाक्य पढ़ने में हिचकिचाता था। आरोहण में 2 महीने बाद उसका आत्मविश्वास और लिखावट दोनों बहुत सुंदर हो गए हैं।',
      locality: 'Todarmal Colony, Najafgarh',
    },
    relatedLinks: [
      { slug: 'class-2-tuition', labelEn: 'Class 2 Tuition', labelHi: 'कक्षा 2 ट्यूशन' },
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition in Najafgarh', labelHi: 'नजफगढ़ में गणित ट्यूशन' },
      { slug: 'tuition-in-todarmal-colony', labelEn: 'Tuition in Todarmal Colony', labelHi: 'टोडरमल कॉलोनी ट्यूशन' },
    ],
  },

  // CLASS 5
  'class-5-tuition': {
    slug: 'class-5-tuition',
    category: 'class',
    targetClass: 'Class 5',
    h1En: 'Class 5 Tuition Classes in Najafgarh (CBSE Maths & Science)',
    h1Hi: 'नजफगढ़ में कक्षा 5 के लिए ट्यूशन कक्षाएं (गणित एवं विज्ञान)',
    metaTitleEn: 'Class 5 Tuition Classes in Najafgarh | Aarohan Academy',
    metaTitleHi: 'कक्षा 5 ट्यूशन नजफगढ़ | आरोहण अकैडमी गुप्ता पार्क',
    metaDescEn: 'Best Class 5 tuition in Najafgarh. Fractions, Decimals, Science experiments, English grammar & CBSE exam preparation with small batches of 15 students.',
    metaDescHi: 'कक्षा 5 के लिए सर्वश्रेष्ठ ट्यूशन नजफगढ़ में। भिन्न, दशमलव, विज्ञान और अंग्रेज़ी व्याकरण की मजबूत तैयारी। छोटे बैच और व्यक्तिगत मार्गदर्शन।',
    valuePropEn: 'Master Critical Primary-to-Middle Transition Concepts (Fractions, Geometry, Grammar)',
    valuePropHi: 'प्राइमरी से मिडिल स्कूल की महत्वपूर्ण अवधारणाओं (भिन्न, ज्यामिति, व्याकरण) पर पूर्ण पकड़',
    badgeEn: 'Grade 5 Primary Mastery',
    badgeHi: 'कक्षा 5 प्राइमरी मास्टरी',
    introEn: 'Class 5 is the crucial transition year where mathematics introduces fractions, decimals, factors, and area/perimeter, while Science transitions to conceptual human body and matter topics. Aarohan Academy equips students with deep conceptual clarity before middle school.',
    introHi: 'कक्षा 5 वह महत्वपूर्ण वर्ष है जहाँ गणित में भिन्न, दशमलव, गुणनखंड और क्षेत्रफल जैसे गंभीर विषय आते हैं। आरोहण अकैडमी मिडिल स्कूल में जाने से पहले बच्चों की बुनियादी नींव को अटूट बनाती है।',
    subjectsCovered: ['Mathematics (CPA Method)', 'Science & EVS', 'English Grammar & Writing', 'Hindi'],
    keyChaptersEn: ['Fractions, Decimals & Percentages', 'Factors & Multiples (LCM/HCF)', 'Perimeter, Area & Volume', 'Human Skeletal & Circulatory Systems'],
    keyChaptersHi: ['भिन्न, दशमलव एवं प्रतिशत', 'गुणनखंड व गुणज (LCM / HCF)', 'परिमाप, क्षेत्रफल और आयतन', 'मानव शरीर तंत्र व पदार्थ की अवस्थाएं'],
    teachingApproachEn: 'Fraction circles, 3D geometric shapes, and word-problem translation exercises ensuring zero fear of word problems.',
    teachingApproachHi: 'भिन्नों के मॉडल, ज्यामितीय आकृतियों और शाब्दिक प्रश्नों को आरेख बनाकर हल करने का चरणबद्ध अभ्यास।',
    whyAarohanEn: [
      'Maximum 15 students per batch: no student gets lost in a crowded crowd',
      'Daily supervised notebook practice with line-by-line calculation checks',
      'Weekly chapter mock tests mirroring CBSE school exam formats',
      'Immediate school homework and doubts resolution',
    ],
    whyAarohanHi: [
      'प्रति बैच अधिकतम 15 विद्यार्थी: किसी बच्चे की उपेक्षा नहीं होती',
      'दैनिक नोटबुक जांच और गणना की गलतियों को तुरंत सुधारना',
      'स्कूल की परीक्षाओं के अनुसार साप्ताहिक अध्याय-वार टेस्ट',
      'स्कूल के सभी गृहकार्य और कठिन प्रश्नों का तत्काल समाधान',
    ],
    faqs: [
      {
        questionEn: 'How do you help students struggling with Class 5 word problems?',
        questionHi: 'कक्षा 5 के शाब्दिक प्रश्नों (Word Problems) में कमजोर छात्रों की कैसे मदद करते हैं?',
        answerEn: 'We teach a 3-step Bar Modelling method where students draw the problem visually before deciding whether to multiply or divide, eliminating guesswork.',
        answerHi: 'हम बार मॉडलिंग (Bar Modeling) तकनीक सिखाते हैं, जिसमें बच्चे प्रश्न का चित्र बनाकर हल करते हैं, जिससे गलतियों की संभावना समाप्त हो जाती है।',
      },
    ],
    testimonial: {
      parentName: 'Rajesh Verma',
      studentClass: 'Class 5 Parent',
      quoteEn: 'Aarohan Academy simplified fractions and geometry for my daughter. Her school marks jumped from 72% to 91% in the final term.',
      quoteHi: 'मेरी बेटी को भिन्न और ज्यामिति बहुत कठिन लगते थे। आरोहण अकैडमी के शिक्षकों ने बहुत सरलता से समझाया और उसके अंक 72% से बढ़कर 91% हो गए।',
      locality: 'Roshanpura, Najafgarh',
    },
    relatedLinks: [
      { slug: 'class-6-tuition', labelEn: 'Class 6 Tuition', labelHi: 'कक्षा 6 ट्यूशन' },
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition in Najafgarh', labelHi: 'गणित ट्यूशन' },
      { slug: 'tuition-in-roshanpura', labelEn: 'Tuition in Roshanpura', labelHi: 'रोशनपुरा ट्यूशन' },
    ],
  },

  // CLASS 6
  'class-6-tuition': {
    slug: 'class-6-tuition',
    category: 'class',
    targetClass: 'Class 6',
    h1En: 'Class 6 Tuition Classes in Najafgarh (CBSE Maths, Science & English)',
    h1Hi: 'नजफगढ़ में कक्षा 6 के लिए ट्यूशन कक्षाएं (CBSE गणित व विज्ञान)',
    metaTitleEn: 'Class 6 Tuition Classes in Najafgarh | Aarohan Academy',
    metaTitleHi: 'कक्षा 6 ट्यूशन नजफगढ़ | आरोहण अकैडमी गुप्ता पार्क',
    metaDescEn: 'Class 6 tuition in Najafgarh with NCERT syllabus alignment. Integers, Algebra, Physics, Chemistry, Biology & English grammar in small batches.',
    metaDescHi: 'नजफगढ़ में कक्षा 6 के लिए NCERT आधारित ट्यूशन। पूर्णांक, बीजगणित, विज्ञान और अंग्रेज़ी की संपूर्ण तैयारी। छोटे बैच और व्यक्तिगत ध्यान।',
    valuePropEn: 'Crack Class 6 Algebra, Integers, and Science Experiments with Confidence',
    valuePropHi: 'कक्षा 6 के बीजगणित, पूर्णांक और विज्ञान के प्रयोगों में आत्मविश्वास प्राप्त करें',
    badgeEn: 'Grade 6 Middle School Launch',
    badgeHi: 'कक्षा 6 मिडिल स्कूल बैच',
    introEn: 'Class 6 is a major leap: students encounter negative integers, algebraic variables (x and y), ratios, and separate scientific disciplines for the first time. Our structured curriculum helps them navigate this transition with rock-solid fundamentals.',
    introHi: 'कक्षा 6 में बच्चे पहली बार ऋणात्मक पूर्णांक (Negative Integers), बीजगणित (Algebra) और विस्तृत विज्ञान का सामना करते हैं। आरोहण अकैडमी इन नए विषयों को अत्यंत सरल बनाकर सिखाती है।',
    subjectsCovered: ['Mathematics (NCERT + Exemplar)', 'Science (Physics, Chemistry, Biology)', 'English Grammar & Literature', 'Social Science'],
    keyChaptersEn: ['Integers & Number Line Operations', 'Introduction to Algebra & Equations', 'Fractions, Decimals, Ratio & Proportion', 'Light, Shadows & Reflections', 'Components of Food & Body Movements'],
    keyChaptersHi: ['पूर्णांक एवं संख्या रेखा', 'बीजगणित व सरल समीकरण', 'अनुपात एवं समानुपात', 'प्रकाश, छाया एवं परावर्तन', 'भोजन के घटक एवं शरीर में गति'],
    teachingApproachEn: 'Visual algebraic tiles and step-by-step problem-solving templates that make equations logical rather than intimidating.',
    teachingApproachHi: 'समीकरणों और बीजगणित को सूत्रों के रटने के बजाय तर्क और आरेखों द्वारा समझाना।',
    whyAarohanEn: [
      'Maximum 15 students per batch ensures regular doubts resolution',
      'Daily notebook checks to verify step-by-step algebraic presentation',
      'Weekly unit tests based on school exam marking schemes',
      'Convenient evening timings suited for school commuters',
    ],
    whyAarohanHi: [
      'अधिकतम 15 छात्रों का बैच: हर विद्यार्थी की नोटबुक की दैनिक जांच',
      'बीजगणित में चरणबद्ध लिखने की सही आदत विकसित करना',
      'स्कूल के पैटर्न पर साप्ताहिक यूनिट टेस्ट',
      'शाम के सुविधाजनक बैच जो स्कूल के समय से नहीं टकराते',
    ],
    faqs: [
      {
        questionEn: 'How do you prepare Class 6 students for school exams?',
        questionHi: 'कक्षा 6 के छात्रों को स्कूल परीक्षा के लिए कैसे तैयार किया जाता है?',
        answerEn: 'We conduct chapter-wise tests and 2 full-syllabus mock papers before school term exams, training students on step marking and time management.',
        answerHi: 'हम स्कूल की परीक्षाओं से पहले अध्याय-वार टेस्ट और 2 सम्पूर्ण पाठ्यक्रम के मॉक पेपर कराते हैं ताकि बच्चे समय प्रबंधन सीख सकें।',
      },
    ],
    testimonial: {
      parentName: 'Sunil Dahiya',
      studentClass: 'Class 6 Parent',
      quoteEn: 'Algebra was terrifying for my son when he entered Class 6. Aarohan Academy tutors made it so simple that Maths is now his highest scoring subject.',
      quoteHi: 'कक्षा 6 में आने पर मेरा बेटा बीजगणित से डरता था। आरोहण अकैडमी के शिक्षकों ने इतनी सरलता से सिखाया कि अब गणित उसका सबसे पसंदीदा विषय बन गया है।',
      locality: 'Gupta Park, Najafgarh',
    },
    relatedLinks: [
      { slug: 'class-7-tuition', labelEn: 'Class 7 Tuition', labelHi: 'कक्षा 7 ट्यूशन' },
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition in Najafgarh', labelHi: 'गणित ट्यूशन' },
      { slug: 'science-tuition-najafgarh', labelEn: 'Science Tuition in Najafgarh', labelHi: 'विज्ञान ट्यूशन' },
    ],
  },

  // CLASS 8
  'class-8-tuition': {
    slug: 'class-8-tuition',
    category: 'class',
    targetClass: 'Class 8',
    h1En: 'Class 8 Tuition Classes in Najafgarh (CBSE Foundation for Class 9 & 10)',
    h1Hi: 'नजफगढ़ में कक्षा 8 के लिए ट्यूशन कक्षाएं (कक्षा 9 और 10 के लिए मजबूत नींव)',
    metaTitleEn: 'Class 8 Tuition Classes in Najafgarh | Aarohan Academy',
    metaTitleHi: 'कक्षा 8 ट्यूशन नजफगढ़ | आरोहण अकैडमी',
    metaDescEn: 'Class 8 tuition in Najafgarh for CBSE students. Rational numbers, Linear equations, Mensuration, Science & high school foundation in small batches.',
    metaDescHi: 'नजफगढ़ में कक्षा 8 के लिए ट्यूशन। परिमेय संख्याएं, रैखिक समीकरण, क्षेत्रमिति और विज्ञान की उच्च विद्यालय हेतु मजबूत तैयारी।',
    valuePropEn: 'Build the Critical Academic Muscle Needed to Excel in Class 9 & Board Exams',
    valuePropHi: 'कक्षा 9 और बोर्ड परीक्षाओं में शीर्ष स्थान प्राप्त करने के लिए अनिवार्य शैक्षणिक आधार',
    badgeEn: 'Grade 8 High School Foundation',
    badgeHi: 'कक्षा 8 हाई स्कूल फाउंडेशन',
    introEn: 'Class 8 is the final stepping stone before secondary school. Topics like Linear Equations, Exponents, Mensuration, and Force & Pressure form the direct foundation for Class 9 and 10 Board exams. Aarohan Academy guarantees mastery of these foundational pillars.',
    introHi: 'कक्षा 8 माध्यमिक स्कूल में प्रवेश की अंतिम सीढ़ी है। रैखिक समीकरण, घातांक, क्षेत्रमिति और बल एवं दाब जैसे अध्याय सीधे कक्षा 9 और 10 के बोर्ड पाठ्यक्रम से जुड़े हैं।',
    subjectsCovered: ['Mathematics (NCERT + RS Aggarwal / RD Sharma)', 'Science (Physics, Chemistry, Biology)', 'English Grammar', 'Social Studies'],
    keyChaptersEn: ['Rational Numbers & Linear Equations in One Variable', 'Understanding Quadrilaterals & Practical Geometry', 'Mensuration (Surface Area & Volume)', 'Force, Pressure & Friction', 'Chemical Effects of Electric Current'],
    keyChaptersHi: ['परिमेय संख्याएं व एक चर वाले रैखिक समीकरण', 'चतुर्भुजों को समझना व प्रायोगिक ज्यामिति', 'क्षेत्रमिति (पृष्ठीय क्षेत्रफल एवं आयतन)', 'बल, दाब और घर्षण', 'विद्युत धारा के रासायनिक प्रभाव'],
    teachingApproachEn: 'Derivation-first approach with extensive numerical practice and weekly chapter-wise performance analytics.',
    teachingApproachHi: 'सूत्रों को सीधे रटने के बजाय उनकी उत्पत्ति समझाना और गहन संख्यात्मक प्रश्नों (Numericals) का अभ्यास।',
    whyAarohanEn: [
      'Prepares students 6 months ahead for Class 9 competitive readiness',
      'Small batch of 15 students ensures individual problem resolution',
      'Focus on error analysis in algebraic simplification and calculation speed',
      'Weekly parent report cards shared directly on WhatsApp',
    ],
    whyAarohanHi: [
      'कक्षा 9 के कठिन पाठ्यक्रम के लिए 6 महीने पूर्व से तैयार करना',
      '15 विद्यार्थियों का सीमित बैच जिससे कोई शंका अनसुलझी न रहे',
      'गणना की गति और बीजगणितीय गलतियों पर विशेष ध्यान',
      'व्हाट्सएप पर साप्ताहिक प्रगति रिपोर्ट',
    ],
    faqs: [
      {
        questionEn: 'Do you cover reference books like RS Aggarwal and RD Sharma for Class 8?',
        questionHi: 'क्या आप NCERT के अलावा RS Aggarwal या RD Sharma की भी तैयारी कराते हैं?',
        answerEn: 'Yes, after mastering NCERT concepts, students solve curated exemplar problems from RD Sharma and RS Aggarwal to build strong analytical muscle.',
        answerHi: 'हाँ, NCERT की अवधारणाएं स्पष्ट होने के बाद RD Sharma और RS Aggarwal के महत्वपूर्ण प्रश्नों का अभ्यास कराया जाता है।',
      },
    ],
    testimonial: {
      parentName: 'Manoj Kumar',
      studentClass: 'Class 8 Parent',
      quoteEn: 'Aarohan Academy gave my daughter the exact academic discipline she needed. She secured 94% in Class 8 and entered Class 9 with absolute confidence.',
      quoteHi: 'मेरी बेटी को जैसी शैक्षणिक अनुशासन की आवश्यकता थी, आरोहण अकैडमी ने वही दिया। उसने कक्षा 8 में 94% अंक प्राप्त किए।',
      locality: 'Todarmal Colony, Najafgarh',
    },
    relatedLinks: [
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition in Najafgarh', labelHi: 'गणित ट्यूशन' },
      { slug: 'science-tuition-najafgarh', labelEn: 'Science Tuition in Najafgarh', labelHi: 'विज्ञान ट्यूशन' },
      { slug: 'tuition-in-todarmal-colony', labelEn: 'Tuition in Todarmal Colony', labelHi: 'टोडरमल कॉलोनी ट्यूशन' },
    ],
  },

  // MATHS TUITION
  'maths-tuition-najafgarh': {
    slug: 'maths-tuition-najafgarh',
    category: 'subject',
    targetSubject: 'Mathematics',
    h1En: 'Maths Tuition Classes in Najafgarh (Nursery to Class 8)',
    h1Hi: 'नजफगढ़ में गणित ट्यूशन कक्षाएं (नर्सरी से कक्षा 8)',
    metaTitleEn: 'Best Maths Tuition in Najafgarh | Aarohan Academy',
    metaTitleHi: 'नजफगढ़ में सर्वश्रेष्ठ गणित ट्यूशन | आरोहण अकैडमी',
    metaDescEn: 'Best Maths tuition in Najafgarh, Gupta Park & Todarmal Colony. Concrete-Pictorial-Abstract (CPA) teaching, zero math fear, and daily notebook checking.',
    metaDescHi: 'गुप्ता पार्क, नजफगढ़ में गणित ट्यूशन। गणित के डर को दूर करें, दैनिक अभ्यास और छोटे बैच (अधिकतम 15 छात्र)। फ्री डेमो बुक करें।',
    valuePropEn: 'Eliminate Math Anxiety: Visual Concept Teaching + Daily Step-by-Step Practice',
    valuePropHi: 'गणित के डर का स्थायी समाधान: दृश्य अवधारणा शिक्षण और दैनिक चरणबद्ध अभ्यास',
    badgeEn: 'Specialist Maths Programme',
    badgeHi: 'विशेषज्ञ गणित कार्यक्रम',
    introEn: 'Mathematics is not about memorizing formulas—it is a language of logic. At Aarohan Academy in Najafgarh, we use the internationally proven Concrete-Pictorial-Abstract (CPA) approach so children see why 3/4 + 1/2 works before writing equations.',
    introHi: 'गणित सूत्रों को रटने का विषय नहीं, बल्कि तर्क की भाषा है। आरोहण अकैडमी, नजफगढ़ में हम CPA पद्धति से बच्चों को सिखाते हैं ताकि वे गणित के सूत्रों के पीछे के कारणों को समझ सकें।',
    subjectsCovered: ['Number Sense & Tables', 'Fractions & Decimals', 'Algebra & Linear Equations', 'Geometry & Mensuration'],
    keyChaptersEn: ['Mental Math & Rapid Calculations', 'Word Problems & Mathematical Reasoning', 'Ratio, Percentage & Profit/Loss', 'Perimeter, Area & Volume'],
    keyChaptersHi: ['मौखिक गणित एवं तीव्र गणना', 'शाब्दिक प्रश्न और तार्किक समझ', 'अनुपात, प्रतिशत व लाभ-हानि', 'ज्यामिति व क्षेत्रमिति'],
    teachingApproachEn: 'Every student receives a physical Math Kit with fraction strips, geometric blocks, and number lines during classes.',
    teachingApproachHi: 'प्रत्येक विद्यार्थी को भिन्नों के स्ट्रिप्स और ज्यामितीय मॉडल्स के साथ प्रत्यक्ष अभ्यास कराया जाता है।',
    whyAarohanEn: [
      '100% notebook correction: teacher checks rough work line-by-line',
      'Daily 5-minute mental math drills to improve speed and eliminate careless slips',
      'Small batch of 12-15 students: every doubt is answered immediately',
      'Free diagnostic test to identify your child’s exact math learning gaps',
    ],
    whyAarohanHi: [
      '100% नोटबुक जांच: शिक्षक रफ वर्क और गणना की हर पंक्ति की जांच करते हैं',
      'दैनिक 5-मिनट का मानसिक गणित अभ्यास ताकि बच्चे तेजी से गणना कर सकें',
      '12-15 बच्चों का छोटा बैच: हर शंका का तुरंत समाधान',
      'गणित की कमजोरियों को जानने के लिए निःशुल्क डायग्नोस्टिक टेस्ट',
    ],
    faqs: [
      {
        questionEn: 'My child has a deep fear of Maths. How do you help?',
        questionHi: 'मेरे बच्चे को गणित से बहुत डर लगता है। आप कैसे मदद करते हैं?',
        answerEn: 'We start with a low-stress diagnostic check to identify missing prerequisites from previous classes. By solving simpler foundational problems with visual aids, the child experiences small wins and gains genuine confidence.',
        answerHi: 'हम पिछली कक्षाओं की कमियों को पहचानकर दृश्य मॉडलों के माध्यम से बुनियादी स्तर से शुरू करते हैं। जब बच्चा स्वयं प्रश्न हल करने लगता है, तो उसका डर स्वाभाविक रूप से दूर हो जाता है।',
      },
    ],
    testimonial: {
      parentName: 'Deepak Sehrawat',
      studentClass: 'Class 7 Parent',
      quoteEn: 'Before Aarohan, math was a daily crying battle at home. Within 3 months, my son began solving geometry and algebra problems on his own with excitement.',
      quoteHi: 'आरोहण में आने से पहले घर पर गणित का गृहकार्य एक बड़ा तनाव था। 3 महीने में मेरे बेटे ने स्वयं ज्यामिति और समीकरण हल करना शुरू कर दिया।',
      locality: 'Todarmal Colony, Najafgarh',
    },
    relatedLinks: [
      { slug: 'class-6-tuition', labelEn: 'Class 6 Tuition', labelHi: 'कक्षा 6 ट्यूशन' },
      { slug: 'class-8-tuition', labelEn: 'Class 8 Tuition', labelHi: 'कक्षा 8 ट्यूशन' },
      { slug: 'science-tuition-najafgarh', labelEn: 'Science Tuition', labelHi: 'विज्ञान ट्यूशन' },
      { slug: 'tuition-in-najafgarh', labelEn: 'Tuition in Najafgarh', labelHi: 'नजफगढ़ ट्यूशन' },
    ],
  },

  // SCIENCE TUITION
  'science-tuition-najafgarh': {
    slug: 'science-tuition-najafgarh',
    category: 'subject',
    targetSubject: 'Science',
    h1En: 'Science Tuition Classes in Najafgarh (Classes 1 to 8)',
    h1Hi: 'नजफगढ़ में विज्ञान ट्यूशन कक्षाएं (कक्षा 1 से 8)',
    metaTitleEn: 'Best Science Tuition in Najafgarh | Aarohan Academy',
    metaTitleHi: 'नजफगढ़ में सर्वश्रेष्ठ विज्ञान ट्यूशन | आरोहण अकैडमी',
    metaDescEn: 'Conceptual Science tuition in Najafgarh. Physics, Chemistry, Biology & EVS with diagrams, experiments, and NCERT curriculum mastery.',
    metaDescHi: 'नजफगढ़ में विज्ञान ट्यूशन। भौतिकी, रसायन और जीव विज्ञान की आरेखों और प्रयोगों के माध्यम से समझ। छोटे बैच और व्यक्तिगत मार्गदर्शन।',
    valuePropEn: 'Learn Science through Real-World Demonstration & Clear Diagrams, Not Rote Learning',
    valuePropHi: 'रटने के बजाय वास्तविक प्रयोगों और स्पष्ट आरेखों के माध्यम से विज्ञान की गहरी समझ',
    badgeEn: 'Hands-on Science Hub',
    badgeHi: 'प्रायोगिक विज्ञान केंद्र',
    introEn: 'Science is the study of how our universe functions. At Aarohan Academy, students don’t just read definitions of refraction or photosynthesis—they see light bend through a prism and understand the biological logic with step-by-step hand-drawn diagrams.',
    introHi: 'विज्ञान परिभाषाओं को रटने का विषय नहीं है। आरोहण अकैडमी में हम प्रिज्म से प्रकाश का मुड़ना और पौधों में भोजन निर्माण की प्रक्रिया को प्रत्यक्ष आरेखों से समझाते हैं।',
    subjectsCovered: ['Physics (Motion, Light, Electricity)', 'Chemistry (Matter, Changes, Acids/Bases)', 'Biology (Living World, Nutrition, Cells)', 'EVS'],
    keyChaptersEn: ['Light, Shadows & Reflection', 'Electricity & Circuits', 'Acids, Bases & Salts', 'Respiration & Circulation in Living Organisms'],
    keyChaptersHi: ['प्रकाश, छाया एवं परावर्तन', 'विद्युत एवं परिपथ', 'अम्ल, क्षारक एवं लवण', 'जीवों में श्वसन एवं परिसंचरण'],
    teachingApproachEn: 'Every concept begins with a 5-minute table demonstration followed by guided notebook sketching of scientific diagrams.',
    teachingApproachHi: 'हर अध्याय एक संक्षिप्त प्रयोग से शुरू होता है और उसके बाद आरेख बनाने का अभ्यास कराया जाता है।',
    whyAarohanEn: [
      'Focus on drawing and labelling correct scientific diagrams for full school exam marks',
      'Thorough coverage of NCERT in-text questions and exemplar problems',
      'Daily notebook checks ensuring correct scientific terminology',
      'Small batch of 15 students ensures individual attention',
    ],
    whyAarohanHi: [
      'स्कूल की परीक्षाओं में पूरे अंक पाने के लिए सही आरेख और नामांकन का अभ्यास',
      'NCERT के सभी प्रश्नों और क्रियाकलापों का विस्तृत समाधान',
      'वैज्ञानिक शब्दावली और उत्तर लेखन शैली का विकास',
      '15 विद्यार्थियों का सीमित बैच',
    ],
    faqs: [
      {
        questionEn: 'Do you conduct practical experiments in Science tuition?',
        questionHi: 'क्या आप विज्ञान ट्यूशन में प्रयोग भी कराते हैं?',
        answerEn: 'Yes, we use safe classroom science kits for optics, magnetism, simple circuits, and plant biology so students experience the science firsthand.',
        answerHi: 'हाँ, हम चुंबकत्व, परिपथ, प्रकाश और पौधों के लिए सुरक्षित क्लासरूम किट्स का उपयोग करते हैं।',
      },
    ],
    testimonial: {
      parentName: 'Meenakshi Yadav',
      studentClass: 'Class 8 Parent',
      quoteEn: 'My son used to struggle with Science answer writing and diagrams. Aarohan’s structured notes and daily practice helped him score 89/100 in his mid-term exams.',
      quoteHi: 'मेरा बेटा विज्ञान के लंबे उत्तर और आरेख बनाने में परेशान रहता था। आरोहण के नोट्स और दैनिक अभ्यास से उसने 89/100 अंक हासिल किए।',
      locality: 'Prem Nagar, Najafgarh',
    },
    relatedLinks: [
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition in Najafgarh', labelHi: 'गणित ट्यूशन' },
      { slug: 'class-7-tuition', labelEn: 'Class 7 Tuition', labelHi: 'कक्षा 7 ट्यूशन' },
      { slug: 'class-8-tuition', labelEn: 'Class 8 Tuition', labelHi: 'कक्षा 8 ट्यूशन' },
    ],
  },

  // LOCALITY: TODARMAL COLONY
  'tuition-in-todarmal-colony': {
    slug: 'tuition-in-todarmal-colony',
    category: 'locality',
    targetLocality: 'Todarmal Colony',
    h1En: 'Tuition Classes in Todarmal Colony, Najafgarh (Nursery to Class 8)',
    h1Hi: 'टोडरमल कॉलोनी, नजफगढ़ में ट्यूशन कक्षाएं (नर्सरी से कक्षा 8)',
    metaTitleEn: 'Tuition Classes in Todarmal Colony Najafgarh | Aarohan Academy',
    metaTitleHi: 'टोडरमल कॉलोनी नजफगढ़ में ट्यूशन | आरोहण अकैडमी',
    metaDescEn: 'Best tuition centre in Todarmal Colony & Gupta Park, Najafgarh. Just 2 mins walk. Small batches, CBSE curriculum, maths & science foundation.',
    metaDescHi: 'टोडरमल कॉलोनी व गुप्ता पार्क, नजफगढ़ में सर्वश्रेष्ठ ट्यूशन सेंटर। केवल 2 मिनट की पैदल दूरी। छोटे बैच, सुरक्षित माहौल और व्यक्तिगत ध्यान।',
    valuePropEn: 'Your Neighbourhood Tuition Centre: Just 2 Minutes Walk from Todarmal Colony Main Lane',
    valuePropHi: 'आपकी अपनी कॉलोनी का ट्यूशन सेंटर: टोडरमल कॉलोनी की मुख्य गली से केवल 2 मिनट की पैदल दूरी',
    badgeEn: 'Todarmal Colony Neighbourhood Centre',
    badgeHi: 'टोडरमल कॉलोनी स्थानीय केंद्र',
    introEn: 'For parents in Todarmal Colony, Aarohan Academy at H.No. 49B Gupta Park is right next door. Children can walk safely through interior residential lanes without crossing busy highways or dodging heavy vehicle traffic.',
    introHi: 'टोडरमल कॉलोनी के परिवारों के लिए H.No. 49B, गुप्ता पार्क स्थित आरोहण अकैडमी बिल्कुल पास में है। बच्चे बिना किसी मुख्य सड़क को पार किए सुरक्षित पैदल आ सकते हैं।',
    subjectsCovered: ['Mathematics', 'Science', 'English Grammar & Reading', 'Hindi & EVS'],
    keyChaptersEn: ['CBSE & ICSE School Curriculum Support', 'Daily School Homework Completion', 'Weekly Test Series & Performance Updates', 'Mental Math & Phonics'],
    keyChaptersHi: ['CBSE एवं ICSE पाठ्यक्रम सहयोग', 'दैनिक स्कूल गृहकार्य समाधान', 'साप्ताहिक टेस्ट व व्हाट्सएप अपडेट', 'मौखिक गणित व फोनिक्स'],
    teachingApproachEn: 'Safe, community-rooted learning with small batches of 12-15 students and direct parent-teacher communication.',
    teachingApproachHi: 'सुरक्षित, पारिवारिक माहौल जहाँ हर बच्चे पर व्यक्तिगत ध्यान दिया जाता है।',
    whyAarohanEn: [
      'Just 150 meters away: 2-minute safe walk for children of all ages',
      'No heavy auto or rickshaw charges needed daily',
      'Peaceful interior residential environment away from main road dust',
      'Direct WhatsApp access to faculty for daily updates',
    ],
    whyAarohanHi: [
      'केवल 150 मीटर दूर: बच्चों के लिए 2 मिनट की सुरक्षित पैदल दूरी',
      'दैनिक वाहन अथवा रिक्शा के खर्च की कोई आवश्यकता नहीं',
      'मुख्य सड़क की धूल और शोर से दूर शांत आवासीय वातावरण',
      'शिक्षकों से सीधे संपर्क और दैनिक अपडेट की सुविधा',
    ],
    faqs: [
      {
        questionEn: 'Where exactly is the centre located from Todarmal Colony?',
        questionHi: 'टोडरमल कॉलोनी से सेंटर वास्तव में कहाँ स्थित है?',
        answerEn: 'We are located at H.No. 49B, Gupta Park, which directly adjoins Todarmal Colony. It is a straight 2-minute walk through the peaceful residential lane.',
        answerHi: 'हम H.No. 49B, गुप्ता पार्क में स्थित हैं, जो टोडरमल कॉलोनी से सीधे जुड़ा है। यह केवल 2 मिनट की सुरक्षित पैदल दूरी है।',
      },
    ],
    testimonial: {
      parentName: 'Kavita Sharma',
      studentClass: 'Class 4 & Class 7 Parent',
      quoteEn: 'Both my children walk to Aarohan Academy daily from Todarmal Colony in 2 minutes. The peaceful environment and caring teachers make it the best choice.',
      quoteHi: 'मेरे दोनों बच्चे टोडरमल कॉलोनी से 2 मिनट में पैदल आ जाते हैं। शांत वातावरण और समर्पित शिक्षकों के कारण यह हमारे लिए सबसे उत्तम विकल्प है।',
      locality: 'Todarmal Colony, Najafgarh',
    },
    relatedLinks: [
      { slug: 'tuition-in-gupta-park', labelEn: 'Tuition in Gupta Park', labelHi: 'गुप्ता पार्क ट्यूशन' },
      { slug: 'tuition-in-roshanpura', labelEn: 'Tuition in Roshanpura', labelHi: 'रोशनपुरा ट्यूशन' },
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition', labelHi: 'गणित ट्यूशन' },
    ],
  },

  // LOCALITY: ROSHANPURA
  'tuition-in-roshanpura': {
    slug: 'tuition-in-roshanpura',
    category: 'locality',
    targetLocality: 'Roshanpura',
    h1En: 'Tuition Classes in Roshanpura, Najafgarh (Nursery to Class 8)',
    h1Hi: 'रोशनपुरा, नजफगढ़ में ट्यूशन कक्षाएं (नर्सरी से कक्षा 8)',
    metaTitleEn: 'Best Tuition Classes in Roshanpura Najafgarh | Aarohan Academy',
    metaTitleHi: 'रोशनपुरा नजफगढ़ में ट्यूशन | आरोहण अकैडमी',
    metaDescEn: 'Top tuition classes near Roshanpura & Thana Road, Najafgarh. Only 5 mins away. Small batches of 15 students, concept-based CBSE learning.',
    metaDescHi: 'रोशनपुरा व थाना रोड, नजफगढ़ के निकट सर्वश्रेष्ठ ट्यूशन केंद्र। केवल 5 मिनट की दूरी। छोटे बैच, गणित और विज्ञान की मजबूत नींव।',
    valuePropEn: '5 Minutes from Roshanpura Main Road: Premium Small-Batch Tuition without Crowds',
    valuePropHi: 'रोशनपुरा मुख्य मार्ग से केवल 5 मिनट: बिना भीड़भाड़ के व्यक्तिगत गुणवत्तापूर्ण ट्यूशन',
    badgeEn: 'Roshanpura Area Learning Hub',
    badgeHi: 'रोशनपुरा क्षेत्र शिक्षण केंद्र',
    introEn: 'Parents in Roshanpura and Thana Road looking for high-quality, concept-based tuition can reach Aarohan Academy in just 5-7 minutes. Instead of 40-student crowded institutes, we offer intimate batches of 12-15 students where every child is personally coached.',
    introHi: 'रोशनपुरा और थाना रोड के परिवारों के लिए आरोहण अकैडमी केवल 5-7 मिनट की दूरी पर है। 40-50 बच्चों के भीड़भाड़ वाले कोचिंग के स्थान पर हम 12-15 बच्चों का छोटा बैच उपलब्ध कराते हैं।',
    subjectsCovered: ['Mathematics', 'Science', 'English Grammar', 'Hindi & Social Studies'],
    keyChaptersEn: ['CBSE & NCERT Curriculum Alignment', 'Exam Preparation & Time Management', 'Daily Notebook Correction', 'Diagnostic Gap Analysis'],
    keyChaptersHi: ['NCERT और CBSE पाठ्यक्रम पर पूर्ण पकड़', 'परीक्षा तैयारी और समय प्रबंधन', 'दैनिक नोटबुक जांच', 'कमजोरियों की पहचान और सुधार'],
    teachingApproachEn: 'Step-by-step concept clarity with daily notebook correction and weekly progress updates.',
    teachingApproachHi: 'चरणबद्ध अवधारणा स्पष्टता, दैनिक नोटबुक जांच और साप्ताहिक प्रगति रिपोर्ट।',
    whyAarohanEn: [
      'Quick 5-minute commute via direct e-rickshaw or bicycle',
      'Small batch guarantee: max 15 students per batch',
      'Experienced subject mentors who solve doubts patiently',
      'Affordable, fair monthly tuition fees with no hidden costs',
    ],
    whyAarohanHi: [
      'ई-रिक्शा अथवा साइकिल से केवल 5 मिनट का सीधा मार्ग',
      'अधिकतम 15 विद्यार्थियों का छोटा बैच गारंटी',
      'अनुभवी शिक्षक जो धैर्यपूर्वक हर शंका का समाधान करते हैं',
      'पारदर्शी और किफायती मासिक फीस',
    ],
    faqs: [
      {
        questionEn: 'How can students from Roshanpura commute to Aarohan Academy?',
        questionHi: 'रोशनपुरा से बच्चे आरोहण अकैडमी कैसे आ सकते हैं?',
        answerEn: 'Frequent shared e-rickshaws connect Roshanpura and Thana Road directly to Todarmal Colony / Gupta Park lane in 3–5 minutes.',
        answerHi: 'थाना रोड और रोशनपुरा से नियमित ई-रिक्शा उपलब्ध हैं जो 3 से 5 मिनट में सीधे गुप्ता पार्क मोड़ तक पहुंचाते हैं।',
      },
    ],
    testimonial: {
      parentName: 'Ramesh Chander',
      studentClass: 'Class 6 Parent',
      quoteEn: 'We live near Roshanpura police station. Aarohan Academy is just a 5-minute ride away, and the academic progress of my son has been incredible.',
      quoteHi: 'हम रोशनपुरा थाना रोड के पास रहते हैं। यहाँ से सेंटर 5 मिनट की दूरी पर है और मेरे बेटे की पढ़ाई में बहुत अच्छा सुधार हुआ है।',
      locality: 'Roshanpura, Najafgarh',
    },
    relatedLinks: [
      { slug: 'tuition-in-todarmal-colony', labelEn: 'Tuition in Todarmal Colony', labelHi: 'टोडरमल कॉलोनी ट्यूशन' },
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition', labelHi: 'गणित ट्यूशन' },
      { slug: 'class-6-tuition', labelEn: 'Class 6 Tuition', labelHi: 'कक्षा 6 ट्यूशन' },
    ],
  },

  // LOCALITY: NAJAFGARH
  'tuition-in-najafgarh': {
    slug: 'tuition-in-najafgarh',
    category: 'locality',
    targetLocality: 'Najafgarh',
    h1En: 'Best Tuition Classes in Najafgarh, New Delhi (Nursery to Class 8)',
    h1Hi: 'नजफगढ़, नई दिल्ली में सर्वश्रेष्ठ ट्यूशन कक्षाएं (नर्सरी से कक्षा 8)',
    metaTitleEn: 'Best Tuition Classes in Najafgarh New Delhi | Aarohan Academy',
    metaTitleHi: 'नजफगढ़ में सर्वश्रेष्ठ ट्यूशन कक्षाएं | आरोहण अकैडमी',
    metaDescEn: 'Best tuition classes in Najafgarh for Nursery to Class 8. Small batches of 15 students, CBSE curriculum, expert teachers, Gupta Park, New Delhi 110043.',
    metaDescHi: 'नजफगढ़, नई दिल्ली में नर्सरी से कक्षा 8 के लिए सर्वोत्तम ट्यूशन कक्षाएं। छोटे बैच, व्यक्तिगत ध्यान, H.No. 49B, गुप्ता पार्क, टोडरमल कॉलोनी।',
    valuePropEn: 'Najafgarh’s Most Trusted Small-Batch Tuition Institute for School Academic Excellence',
    valuePropHi: 'स्कूली शिक्षा में उत्कृष्टता के लिए नजफगढ़ का सबसे विश्वसनीय छोटे बैच का ट्यूशन संस्थान',
    badgeEn: '#1 Ranked Najafgarh Learning Space',
    badgeHi: '#1 गुणवत्तापूर्ण नजफगढ़ शिक्षण केंद्र',
    introEn: 'Aarohan Academy is Najafgarh’s premier supplementary education institution located at H.No. 49B, Gupta Park, Todarmal Colony. Dedicated exclusively to foundational school education (Nursery to Class 8), we provide small-batch, concept-driven learning that builds lifelong academic confidence.',
    introHi: 'आरोहण अकैडमी H.No. 49B, गुप्ता पार्क, टोडरमल कॉलोनी, नजफगढ़ में स्थित एक प्रतिष्ठित शिक्षण संस्थान है। नर्सरी से कक्षा 8 तक के विद्यार्थियों के लिए समर्पित, हमारा उद्देश्य छोटे बैच में अवधारणा-आधारित शिक्षा प्रदान करना है।',
    subjectsCovered: ['Mathematics (Mental Math & CPA)', 'Science & EVS', 'English Grammar & Writing', 'Hindi & Social Studies'],
    keyChaptersEn: ['CBSE & ICSE Complete Syllabus Support', 'Daily School Homework Assistance', 'Weekly Chapter Quizzes & Reports', 'Free Diagnostic Assessments'],
    keyChaptersHi: ['CBSE एवं ICSE पाठ्यक्रम की संपूर्ण तैयारी', 'दैनिक स्कूल गृहकार्य में सहायता', 'साप्ताहिक टेस्ट और विस्तृत रिपोर्ट', 'निःशुल्क डायग्नोस्टिक मूल्यांकन'],
    teachingApproachEn: 'Concrete-Pictorial-Abstract (CPA) methodology, daily individual notebook correction, and transparent parent partnerships.',
    teachingApproachHi: 'CPA शिक्षण पद्धति, दैनिक व्यक्तिगत नोटबुक जांच और पारदर्शी अभिभावक संवाद।',
    whyAarohanEn: [
      'Strict limit of 12–15 students per batch: unlike crowded mass coaching centres',
      'Daily notebook checks ensuring every child solves problems independently',
      'Central Najafgarh location in a safe, dust-free residential colony',
      'Transparent monthly fees with zero hidden admission costs',
    ],
    whyAarohanHi: [
      'प्रति बैच केवल 12-15 विद्यार्थी: भीड़भाड़ वाले संस्थानों से बिल्कुल अलग',
      'दैनिक नोटबुक जांच से हर बच्चे का स्वतंत्र अभ्यास सुनिश्चित',
      'सुरक्षित और प्रदूषण-मुक्त आवासीय कॉलोनी में स्थित केंद्र',
      'बिना किसी अतिरिक्त पंजीकरण शुल्क के पारदर्शी मासिक फीस',
    ],
    faqs: [
      {
        questionEn: 'Why choose Aarohan Academy over other tuition centres in Najafgarh?',
        questionHi: 'नजफगढ़ के अन्य ट्यूशन सेंटरों की तुलना में आरोहण अकैडमी क्यों चुनें?',
        answerEn: 'Most tuition centres in Najafgarh pack 30 to 50 students in a single room where teachers simply lecture on the board. At Aarohan, we cap batches at 15 students, check every child’s notebook in every class, and provide daily homework support.',
        answerHi: 'नजफगढ़ के अधिकांश कोचिंग सेंटरों में एक कमरे में 30 से 50 बच्चे बैठाए जाते हैं जहाँ शिक्षक केवल बोर्ड पर हल करते हैं। आरोहण में अधिकतम 15 बच्चों का बैच होता है और हर बच्चे की नोटबुक प्रतिदिन जांची जाती है।',
      },
    ],
    testimonial: {
      parentName: 'Vandana Vats',
      studentClass: 'Class 3 & Class 5 Parent',
      quoteEn: 'Aarohan Academy is truly a blessing for parents in Najafgarh. The personal care and conceptual teaching method have made learning joyful for both my children.',
      quoteHi: 'नजफगढ़ के अभिभावकों के लिए आरोहण अकैडमी एक वरदान की तरह है। व्यक्तिगत देखभाल और समझ आधारित शिक्षण ने बच्चों की पढ़ाई को बहुत आसान बना दिया है।',
      locality: 'Gupta Park, Najafgarh',
    },
    relatedLinks: [
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition in Najafgarh', labelHi: 'गणित ट्यूशन' },
      { slug: 'science-tuition-najafgarh', labelEn: 'Science Tuition in Najafgarh', labelHi: 'विज्ञान ट्यूशन' },
      { slug: 'tuition-in-todarmal-colony', labelEn: 'Tuition in Todarmal Colony', labelHi: 'टोडरमल कॉलोनी ट्यूशन' },
      { slug: 'tuition-in-roshanpura', labelEn: 'Tuition in Roshanpura', labelHi: 'रोशनपुरा ट्यूशन' },
    ],
  },

  // CLASS 2
  'class-2-tuition': {
    slug: 'class-2-tuition',
    category: 'class',
    targetClass: 'Class 2',
    h1En: 'Class 2 Tuition Classes in Najafgarh (CBSE Foundation)',
    h1Hi: 'नजफगढ़ में कक्षा 2 के लिए ट्यूशन कक्षाएं',
    metaTitleEn: 'Class 2 Tuition Classes in Najafgarh | Aarohan Academy',
    metaTitleHi: 'कक्षा 2 ट्यूशन नजफगढ़ | आरोहण अकैडमी',
    metaDescEn: 'Small-batch Class 2 tuition in Najafgarh. 2-digit addition, subtraction, English sentences, Hindi reading and daily handwriting improvement.',
    metaDescHi: 'गुप्ता पार्क, नजफगढ़ में कक्षा 2 के लिए ट्यूशन। दो-अंकीय जोड़-घटाव, पठन और सुंदर लिखावट पर व्यक्तिगत ध्यान।',
    valuePropEn: 'Strengthen 2-Digit Math, Sentence Reading & Daily Homework Routine (Max 12 Students)',
    valuePropHi: 'दो-अंकीय गणित, वाक्य पठन और दैनिक स्वाध्याय की आदत (अधिकतम 12 बच्चे)',
    badgeEn: 'Grade 2 Fluency Batch',
    badgeHi: 'कक्षा 2 प्रवाह बैच',
    introEn: 'In Class 2, children encounter 2-digit carry-over addition, borrow subtraction, multiplication tables, and paragraph reading. Our small batches ensure every child grasps foundational logic joyfully.',
    introHi: 'कक्षा 2 में बच्चे हासिल वाले जोड़, घटाव, पहाड़े और अनुच्छेद पठन सीखते हैं। हमारे छोटे बैच में शिक्षक हर बच्चे की नोटबुक व्यक्तिगत रूप से देखते हैं।',
    subjectsCovered: ['Mathematics (Mental Math & Tables)', 'English Reading & Writing', 'Hindi Vyakaran', 'EVS'],
    keyChaptersEn: ['2-Digit Addition & Subtraction with Regrouping', 'Multiplication as Repeated Addition & Tables 2 to 10', 'Simple Sentences & Punctuation', 'Seasons, Animals & Family'],
    keyChaptersHi: ['हासिल वाले जोड़ और घटाव', 'गुणा की समझ और 2 से 10 तक पहाड़े', 'सरल वाक्य और विराम चिह्न', 'ऋतुएं, परिवेश और परिवार'],
    teachingApproachEn: 'Using base-ten blocks, pictorial storytelling, and daily 5-minute mental math drills.',
    teachingApproachHi: 'गिनतारा, ब्लॉक और चित्रों के माध्यम से दैनिक 5-मिनट का मौखिक अभ्यास।',
    whyAarohanEn: [
      'Maximum 12 students per batch for direct teacher supervision',
      'Daily notebook checks and homework assistance',
      'Focus on neat handwriting and phonics pronunciation',
      'Weekly progress updates on WhatsApp',
    ],
    whyAarohanHi: [
      'प्रति बैच अधिकतम 12 बच्चे',
      'दैनिक स्कूल गृहकार्य में पूरी सहायता',
      'सुंदर लिखावट और सही उच्चारण पर ध्यान',
      'व्हाट्सएप पर साप्ताहिक प्रगति रिपोर्ट',
    ],
    faqs: [
      {
        questionEn: 'How do you teach multiplication tables to Class 2 students?',
        questionHi: 'कक्षा 2 के बच्चों को पहाड़े कैसे सिखाए जाते हैं?',
        answerEn: 'We use pattern skip-counting and rhythmic visual arrays rather than mindless rote chanting.',
        answerHi: 'हम रटने के बजाय चित्रों और स्किप-काउंटिंग पैटर्न के माध्यम से पहाड़े सिखाते हैं।',
      },
    ],
    testimonial: {
      parentName: 'Seema Ahlawat',
      studentClass: 'Class 2 Parent',
      quoteEn: 'My daughter learned multiplication tables effortlessly within a month. Her handwriting and reading confidence are now excellent.',
      quoteHi: 'मेरी बेटी ने एक महीने में बिना किसी तनाव के पहाड़े सीख लिए। उसकी लिखावट में भी बहुत सुधार आया है।',
      locality: 'Gupta Park, Najafgarh',
    },
    relatedLinks: [
      { slug: 'class-1-tuition', labelEn: 'Class 1 Tuition', labelHi: 'कक्षा 1 ट्यूशन' },
      { slug: 'class-3-tuition', labelEn: 'Class 3 Tuition', labelHi: 'कक्षा 3 ट्यूशन' },
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition', labelHi: 'गणित ट्यूशन' },
    ],
  },

  // CLASS 3
  'class-3-tuition': {
    slug: 'class-3-tuition',
    category: 'class',
    targetClass: 'Class 3',
    h1En: 'Class 3 Tuition Classes in Najafgarh (CBSE Maths & Science)',
    h1Hi: 'नजफगढ़ में कक्षा 3 के लिए ट्यूशन कक्षाएं',
    metaTitleEn: 'Class 3 Tuition Classes in Najafgarh | Aarohan Academy',
    metaTitleHi: 'कक्षा 3 ट्यूशन नजफगढ़ | आरोहण अकैडमी',
    metaDescEn: 'Class 3 tuition in Najafgarh. 3-digit multiplication, division, word problems, science and English grammar with small batches.',
    metaDescHi: 'कक्षा 3 के लिए ट्यूशन नजफगढ़। गुणा, भाग, शाब्दिक प्रश्न, विज्ञान और अंग्रेज़ी व्याकरण की मजबूत तैयारी।',
    valuePropEn: 'Master 3-Digit Multiplication, Long Division & Science Concepts with Joy',
    valuePropHi: 'गुणा, भाग, शाब्दिक प्रश्नों और विज्ञान की बुनियादी अवधारणाओं पर मजबूत पकड़',
    badgeEn: 'Grade 3 Concept Builder',
    badgeHi: 'कक्षा 3 अवधारणा निर्माण',
    introEn: 'Class 3 marks the beginning of formal division, word problems, and independent reading. Aarohan Academy provides supportive coaching to ensure children transition confidently.',
    introHi: 'कक्षा 3 में बच्चे पहली बार भाग और शाब्दिक प्रश्नों से परिचित होते हैं। आरोहण अकैडमी में हम आरेखों द्वारा प्रश्नों को हल करना सिखाते हैं।',
    subjectsCovered: ['Mathematics (Mental Math)', 'Science & EVS', 'English Grammar', 'Hindi'],
    keyChaptersEn: ['Multiplication & Division Fundamentals', 'Time, Calendar & Money Word Problems', 'Fractions Introduction (Halves & Quarters)', 'Living & Non-Living Things'],
    keyChaptersHi: ['गुणा और भाग की बुनियादी समझ', 'समय, कैलेंडर और मुद्रा के प्रश्न', 'भिन्न की प्रारंभिक समझ', 'सजीव एवं निर्जीव वस्तुएं'],
    teachingApproachEn: 'Bar modelling and visual division sharing plates to make word problems easy.',
    teachingApproachHi: 'चित्रों और दैनिक जीवन के उदाहरणों से शाब्दिक प्रश्नों का चरणबद्ध अभ्यास।',
    whyAarohanEn: [
      'Small batch of 12-15 students ensures individual attention',
      'Daily supervised notebook practice with calculation checks',
      'School homework support and doubt solving',
      'Free diagnostic test before enrolment',
    ],
    whyAarohanHi: [
      '12-15 बच्चों का छोटा बैच: हर बच्चे पर व्यक्तिगत ध्यान',
      'दैनिक नोटबुक जांच और गलतियों का तुरंत समाधान',
      'स्कूल के गृहकार्य में पूरी मदद',
      'प्रवेश से पूर्व निःशुल्क जांच',
    ],
    faqs: [
      {
        questionEn: 'Do you help with Class 3 school exam preparation?',
        questionHi: 'क्या आप कक्षा 3 की स्कूल परीक्षाओं की तैयारी कराते हैं?',
        answerEn: 'Yes, we conduct chapter-wise revision worksheets and mock practice before every school periodic test.',
        answerHi: 'हाँ, स्कूल के हर टेस्ट से पहले हम रिवीजन और अभ्यास टेस्ट कराते हैं।',
      },
    ],
    testimonial: {
      parentName: 'Amit Solanki',
      studentClass: 'Class 3 Parent',
      quoteEn: 'Aarohan Academy helped my son overcome his fear of division and word problems. Truly personalized coaching.',
      quoteHi: 'मेरे बेटे को भाग के प्रश्नों से डर लगता था। आरोहण के शिक्षकों ने बहुत प्यार से सिखाया।',
      locality: 'Todarmal Colony, Najafgarh',
    },
    relatedLinks: [
      { slug: 'class-2-tuition', labelEn: 'Class 2 Tuition', labelHi: 'कक्षा 2 ट्यूशन' },
      { slug: 'class-4-tuition', labelEn: 'Class 4 Tuition', labelHi: 'कक्षा 4 ट्यूशन' },
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition', labelHi: 'गणित ट्यूशन' },
    ],
  },

  // CLASS 4
  'class-4-tuition': {
    slug: 'class-4-tuition',
    category: 'class',
    targetClass: 'Class 4',
    h1En: 'Class 4 Tuition Classes in Najafgarh (CBSE Curriculum)',
    h1Hi: 'नजफगढ़ में कक्षा 4 के लिए ट्यूशन कक्षाएं',
    metaTitleEn: 'Class 4 Tuition Classes in Najafgarh | Aarohan Academy',
    metaTitleHi: 'कक्षा 4 ट्यूशन नजफगढ़ | आरोहण अकैडमी',
    metaDescEn: 'Class 4 tuition in Najafgarh for CBSE students. Factors, Multiples, Fractions, EVS & English grammar in small batches of 15 students.',
    metaDescHi: 'कक्षा 4 के लिए ट्यूशन नजफगढ़। गुणनखंड, गुणज, भिन्न, विज्ञान और अंग्रेज़ी की संपूर्ण तैयारी।',
    valuePropEn: 'Solidify Multi-Step Math, Fractions & Science Observations Ahead of Middle School',
    valuePropHi: 'मिडिल स्कूल से पहले भिन्न, गुणनखंड और विज्ञान की गहरी समझ का निर्माण',
    badgeEn: 'Grade 4 Core Mastery',
    badgeHi: 'कक्षा 4 कोर मास्टरी',
    introEn: 'Class 4 bridges primary school into higher academic thinking: factors, multiples, fractions, perimeter, and scientific exploration. We guide students with visual teaching methods.',
    introHi: 'कक्षा 4 प्राइमरी से मिडिल स्कूल की ओर एक महत्वपूर्ण कदम है। आरोहण अकैडमी में हम गणितीय गणनाओं को तेज और सटीक बनाते हैं।',
    subjectsCovered: ['Mathematics (Mental Math & Geometry)', 'Science & EVS', 'English Grammar & Writing', 'Hindi'],
    keyChaptersEn: ['Factors & Multiples (LCM/HCF basics)', 'Fractions Addition & Subtraction', 'Perimeter & Area Basics', 'Digestive & Respiratory Systems'],
    keyChaptersHi: ['गुणनखंड एवं गुणज', 'भिन्नों का जोड़ और घटाव', 'परिमाप एवं क्षेत्रफल', 'पाचन एवं श्वसन तंत्र'],
    teachingApproachEn: 'Fraction strips and step-by-step problem templates ensuring speed and accuracy.',
    teachingApproachHi: 'भिन्नों के स्ट्रिप्स और चरणबद्ध आरेख बनाकर हल करने का अभ्यास।',
    whyAarohanEn: [
      'Small batch capped at 15 students',
      'Daily notebook checks and homework assistance',
      'Regular test series aligned with CBSE school exams',
      'Direct parent updates on WhatsApp',
    ],
    whyAarohanHi: [
      'अधिकतम 15 छात्रों का सीमित बैच',
      'दैनिक नोटबुक जांच और गणना की गलतियों को सुधारना',
      'स्कूल के पैटर्न पर नियमित टेस्ट',
      'व्हाट्सएप पर अभिभावक अपडेट',
    ],
    faqs: [
      {
        questionEn: 'How are doubts handled in Class 4 tuition?',
        questionHi: 'कक्षा 4 की ट्यूशन में शंकाएं कैसे हल की जाती हैं?',
        answerEn: 'Because batches are limited to 15 students, the teacher answers every student during class, with extra 1-on-1 time for anyone needing help.',
        answerHi: 'छोटा बैच होने के कारण शिक्षक कक्षा में ही हर बच्चे की शंका दूर करते हैं।',
      },
    ],
    testimonial: {
      parentName: 'Rekha Gulia',
      studentClass: 'Class 4 Parent',
      quoteEn: 'My son is now top of his class in Maths after joining Aarohan Academy. The conceptual teaching method really works.',
      quoteHi: 'आरोहण अकैडमी से जुड़ने के बाद मेरा बेटा स्कूल में गणित में प्रथम आ रहा है।',
      locality: 'Roshanpura, Najafgarh',
    },
    relatedLinks: [
      { slug: 'class-3-tuition', labelEn: 'Class 3 Tuition', labelHi: 'कक्षा 3 ट्यूशन' },
      { slug: 'class-5-tuition', labelEn: 'Class 5 Tuition', labelHi: 'कक्षा 5 ट्यूशन' },
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition', labelHi: 'गणित ट्यूशन' },
    ],
  },

  // CLASS 7
  'class-7-tuition': {
    slug: 'class-7-tuition',
    category: 'class',
    targetClass: 'Class 7',
    h1En: 'Class 7 Tuition Classes in Najafgarh (CBSE Maths & Science)',
    h1Hi: 'नजफगढ़ में कक्षा 7 के लिए ट्यूशन कक्षाएं',
    metaTitleEn: 'Class 7 Tuition Classes in Najafgarh | Aarohan Academy',
    metaTitleHi: 'कक्षा 7 ट्यूशन नजफगढ़ | आरोहण अकैडमी',
    metaDescEn: 'Best Class 7 tuition in Najafgarh for CBSE students. Algebraic expressions, Integers, Triangles, Physics, Chemistry & Biology in small batches.',
    metaDescHi: 'कक्षा 7 के लिए सर्वश्रेष्ठ ट्यूशन नजफगढ़। बीजीय व्यंजक, त्रिभुज, भौतिकी, रसायन और जीव विज्ञान की मजबूत तैयारी।',
    valuePropEn: 'Master Advanced Middle School Algebra, Triangles & Science Numericals',
    valuePropHi: 'मिडिल स्कूल बीजगणित, त्रिभुजों और विज्ञान के संख्यात्मक प्रश्नों में पूर्ण दक्षता',
    badgeEn: 'Grade 7 Middle School Milestone',
    badgeHi: 'कक्षा 7 मिडिल स्कूल बैच',
    introEn: 'Class 7 introduces rigorous algebra, properties of triangles, congruent geometry, and quantitative science topics. Aarohan Academy delivers rigorous coaching with small-batch mentoring.',
    introHi: 'कक्षा 7 में बीजगणितीय व्यंजक, त्रिभुजों के गुण और गहन विज्ञान आता है। आरोहण अकैडमी में हम प्रत्येक अध्याय को चरणबद्ध तरीके से समझाते हैं।',
    subjectsCovered: ['Mathematics (NCERT + Exemplar)', 'Science (Physics, Chemistry, Biology)', 'English Grammar', 'Social Science'],
    keyChaptersEn: ['Integers & Rational Numbers', 'Algebraic Expressions & Simple Equations', 'Lines, Angles & Triangles Properties', 'Heat, Motion & Time', 'Acids, Bases & Salts'],
    keyChaptersHi: ['पूर्णांक एवं परिमेय संख्याएं', 'बीजीय व्यंजक व सरल समीकरण', 'रेखाएं, कोण और त्रिभुज', 'ऊष्मा, गति एवं समय', 'अम्ल, क्षारक एवं लवण'],
    teachingApproachEn: 'Step-by-step mathematical proofs, numerical practice, and error analysis.',
    teachingApproachHi: 'चरणबद्ध गणितीय हल, संख्यात्मक प्रश्नों का अभ्यास और गलतियों का विश्लेषण।',
    whyAarohanEn: [
      'Small batch capped at 15 students ensures zero neglected doubts',
      'Daily notebook checks for mathematical step accuracy',
      'Weekly unit tests based on school exam marking scheme',
      'Free diagnostic assessment and trial classes',
    ],
    whyAarohanHi: [
      'अधिकतम 15 छात्रों का बैच: हर विद्यार्थी की नोटबुक की जांच',
      'चरणबद्ध लिखने की सही आदत जिससे स्कूल में पूरे अंक मिलें',
      'स्कूल के पैटर्न पर साप्ताहिक टेस्ट',
      'निःशुल्क मूल्यांकन एवं ट्रायल कक्षाएं',
    ],
    faqs: [
      {
        questionEn: 'How do you help Class 7 students score well in Maths and Science?',
        questionHi: 'कक्षा 7 के छात्रों को गणित और विज्ञान में अच्छे अंक दिलाने में कैसे मदद करते हैं?',
        answerEn: 'We focus on clear mathematical steps and accurate science diagram labelling, training students to avoid careless calculation slips.',
        answerHi: 'हम चरणबद्ध उत्तर लेखन और सही आरेख बनाने पर जोर देते हैं जिससे सिली मिस्टेक्स समाप्त हो जाएं।',
      },
    ],
    testimonial: {
      parentName: 'Joginder Singh',
      studentClass: 'Class 7 Parent',
      quoteEn: 'My daughter’s understanding of Class 7 Algebra and Science is rock solid thanks to Aarohan Academy. Her school marks improved from 68% to 92%.',
      quoteHi: 'मेरी बेटी की कक्षा 7 के बीजगणित और विज्ञान में समझ बहुत मजबूत हो गई है। उसके अंक 68% से बढ़कर 92% हो गए।',
      locality: 'Todarmal Colony, Najafgarh',
    },
    relatedLinks: [
      { slug: 'class-6-tuition', labelEn: 'Class 6 Tuition', labelHi: 'कक्षा 6 ट्यूशन' },
      { slug: 'class-8-tuition', labelEn: 'Class 8 Tuition', labelHi: 'कक्षा 8 ट्यूशन' },
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition', labelHi: 'गणित ट्यूशन' },
    ],
  },

  // ENGLISH TUITION
  'english-tuition-najafgarh': {
    slug: 'english-tuition-najafgarh',
    category: 'subject',
    targetSubject: 'English',
    h1En: 'English Reading, Grammar & Writing Tuition in Najafgarh',
    h1Hi: 'नजफगढ़ में अंग्रेज़ी पठन, व्याकरण एवं लेखन ट्यूशन',
    metaTitleEn: 'English Tuition in Najafgarh | Aarohan Academy',
    metaTitleHi: 'नजफगढ़ में अंग्रेज़ी ट्यूशन | आरोहण अकैडमी',
    metaDescEn: 'Best English tuition in Najafgarh for Nursery to Class 8. Phonics, reading fluency, grammar rules, vocabulary & creative writing in small batches.',
    metaDescHi: 'नजफगढ़ में अंग्रेज़ी ट्यूशन। फोनिक्स, पठन प्रवाह, व्याकरण, शब्द भंडार और रचनात्मक लेखन की व्यक्तिगत तैयारी।',
    valuePropEn: 'Transform Hesitant English into Fluent Reading, Grammatical Accuracy & Confident Expression',
    valuePropHi: 'झिझक दूर कर धाराप्रवाह पठन, शुद्ध व्याकरण और आत्मविश्वासी अभिव्यक्ति का विकास',
    badgeEn: 'Language & Literacy Wing',
    badgeHi: 'भाषा एवं साक्षरता विंग',
    introEn: 'English is the medium of learning across all school subjects. At Aarohan Academy, we build foundational phonics in early years and structured grammar and creative writing in primary and middle school.',
    introHi: 'अंग्रेज़ी सभी विषयों के सीखने का माध्यम है। आरोहण अकैडमी में हम छोटी उम्र से फोनिक्स और आगे चलकर व्याकरण व रचनात्मक लेखन को मजबूत बनाते हैं।',
    subjectsCovered: ['Phonics & Pronunciation', 'Reading Fluency & Comprehension', 'English Grammar (Parts of Speech, Tenses)', 'Creative Writing & Vocabulary'],
    keyChaptersEn: ['Nouns, Pronouns, Verbs, Adjectives & Adverbs', 'Tenses (Present, Past, Future) & Subject-Verb Agreement', 'Reading Comprehension & Answering Techniques', 'Paragraph, Letter & Story Writing'],
    keyChaptersHi: ['संज्ञा, सर्वनाम, क्रिया, विशेषण', 'काल (Tenses) एवं वाक्य रचना', 'अपठित गद्यांश एवं उत्तर लेखन', 'अनुच्छेद, पत्र एवं कहानी लेखन'],
    teachingApproachEn: 'Daily reading circles, vocabulary games, and guided sentence writing.',
    teachingApproachHi: 'दैनिक पठन अभ्यास, शब्द भंडार खेल और वाक्य निर्माण का नियमित अभ्यास।',
    whyAarohanEn: [
      'Individual reading time for every student in every class',
      'Strict focus on neat cursive handwriting and correct spellings',
      'Small batch of 12-15 students ensures shy children speak up',
      'School English syllabus and exam question bank coverage',
    ],
    whyAarohanHi: [
      'प्रत्येक कक्षा में हर बच्चे को व्यक्तिगत पठन का अवसर',
      'सुंदर लिखावट और सही वर्तनी (Spelling) पर विशेष ध्यान',
      '12-15 बच्चों का छोटा बैच जिससे झिझकने वाले बच्चे भी बोल सकें',
      'स्कूल के पूरे अंग्रेजी पाठ्यक्रम की तैयारी',
    ],
    faqs: [
      {
        questionEn: 'Can you help a child who cannot read English fluently?',
        questionHi: 'क्या आप ऐसे बच्चे की मदद कर सकते हैं जो अंग्रेज़ी धाराप्रवाह नहीं पढ़ पाता?',
        answerEn: 'Yes, we start with phonetic decoding and daily 10-minute guided reading sessions until fluency is achieved.',
        answerHi: 'हाँ, हम फोनिक्स और दैनिक 10 मिनट के व्यक्तिगत पठन अभ्यास से शुरुआत करते हैं।',
      },
    ],
    testimonial: {
      parentName: 'Priya Kadyan',
      studentClass: 'Class 4 Parent',
      quoteEn: 'My daughter was very shy and hesitant in English. After 4 months at Aarohan, she reads storybooks independently with clear pronunciation.',
      quoteHi: 'मेरी बेटी अंग्रेज़ी बोलने में बहुत झिझकती थी। आरोहण में 4 महीने बाद वह स्वयं किताबें पढ़ती है।',
      locality: 'Prem Nagar, Najafgarh',
    },
    relatedLinks: [
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition', labelHi: 'गणित ट्यूशन' },
      { slug: 'class-4-tuition', labelEn: 'Class 4 Tuition', labelHi: 'कक्षा 4 ट्यूशन' },
      { slug: 'tuition-in-najafgarh', labelEn: 'Tuition in Najafgarh', labelHi: 'नजफगढ़ ट्यूशन' },
    ],
  },

  // LOCALITY: GUPTA PARK
  'tuition-in-gupta-park': {
    slug: 'tuition-in-gupta-park',
    category: 'locality',
    targetLocality: 'Gupta Park',
    h1En: 'Tuition Classes in Gupta Park, Najafgarh (H.No. 49B Campus)',
    h1Hi: 'गुप्ता पार्क, नजफगढ़ में ट्यूशन कक्षाएं (H.No. 49B कैंपस)',
    metaTitleEn: 'Tuition Classes in Gupta Park Najafgarh | Aarohan Academy',
    metaTitleHi: 'गुप्ता पार्क नजफगढ़ में ट्यूशन | आरोहण अकैडमी',
    metaDescEn: 'Best tuition classes in Gupta Park, Todarmal Colony, Najafgarh. Right at your doorstep at H.No. 49B. Nursery to Class 8, small batches of 15 students.',
    metaDescHi: 'गुप्ता पार्क, नजफगढ़ में सर्वोत्तम ट्यूशन केंद्र। आपके घर के पास H.No. 49B पर। नर्सरी से कक्षा 8, छोटे बैच और सुरक्षित वातावरण।',
    valuePropEn: 'Right At Your Doorstep: H.No. 49B Gupta Park – 1 Minute Safe Walk For Your Child',
    valuePropHi: 'आपके घर के बिल्कुल निकट: H.No. 49B गुप्ता पार्क – बच्चों के लिए 1 मिनट की सुरक्षित पैदल दूरी',
    badgeEn: 'Gupta Park Main Campus',
    badgeHi: 'गुप्ता पार्क मुख्य केंद्र',
    introEn: 'Residents of Gupta Park don’t need to send their children to crowded main-road institutes. Aarohan Academy is located directly within Gupta Park at H.No. 49B, providing a safe, clean, and CCTV-monitored educational sanctuary.',
    introHi: 'गुप्ता पार्क के निवासियों को बच्चों को मुख्य सड़क के भीड़भाड़ वाले संस्थानों में भेजने की जरूरत नहीं है। आरोहण अकैडमी सीधे गुप्ता पार्क में H.No. 49B पर स्थित है।',
    subjectsCovered: ['Mathematics', 'Science', 'English Grammar', 'Hindi & Social Studies'],
    keyChaptersEn: ['CBSE Curriculum Mastery', 'Daily School Homework Assistance', 'Diagnostic Skill Check', 'Weekly Test Series'],
    keyChaptersHi: ['CBSE पाठ्यक्रम की संपूर्ण तैयारी', 'दैनिक स्कूल गृहकार्य में सहायता', 'साप्ताहिक टेस्ट और मूल्यांकन', 'मौखिक गणित व फोनिक्स'],
    teachingApproachEn: 'Warm, community-centred environment with small batches and daily notebook checks.',
    teachingApproachHi: 'आत्मीय, सुरक्षित माहौल जहाँ हर बच्चे पर व्यक्तिगत ध्यान दिया जाता है।',
    whyAarohanEn: [
      'Located directly in Gupta Park at H.No. 49B',
      'Zero commute stress: children walk safely in 1–2 minutes',
      'CCTV monitored ground-floor classrooms',
      'Direct WhatsApp access to faculty',
    ],
    whyAarohanHi: [
      'सीधे गुप्ता पार्क में मकान नं. 49B पर स्थित',
      'शून्य आवागमन तनाव: बच्चे 1-2 मिनट में सुरक्षित आ सकते हैं',
      'सीसीटीवी निगरानी युक्त शांत कक्षाएं',
      'शिक्षकों से सीधे संपर्क की सुविधा',
    ],
    faqs: [
      {
        questionEn: 'Can parents visit the centre in Gupta Park to inspect classrooms?',
        questionHi: 'क्या अभिभावक केंद्र आकर कक्षाओं का निरीक्षण कर सकते हैं?',
        answerEn: 'Yes! We warmly welcome parents Monday to Saturday between 3:00 PM and 7:30 PM. Book a visit or simply walk in.',
        answerHi: 'हाँ! सोमवार से शनिवार दोपहर 3:00 से शाम 7:30 बजे के बीच अभिभावकों का हार्दिक स्वागत है।',
      },
    ],
    testimonial: {
      parentName: 'Satish Kumar',
      studentClass: 'Class 5 Parent',
      quoteEn: 'Living in Gupta Park, having Aarohan Academy next door has been incredible. My son walks to class safely and his marks have improved significantly.',
      quoteHi: 'गुप्ता पार्क में रहते हुए घर के पास आरोहण अकैडमी का होना बहुत सुविधाजनक है। मेरा बेटा सुरक्षित आता है और उसकी पढ़ाई में बहुत सुधार हुआ है।',
      locality: 'Gupta Park, Najafgarh',
    },
    relatedLinks: [
      { slug: 'tuition-in-todarmal-colony', labelEn: 'Tuition in Todarmal Colony', labelHi: 'टोडरमल कॉलोनी ट्यूशन' },
      { slug: 'tuition-in-najafgarh', labelEn: 'Tuition in Najafgarh', labelHi: 'नजफगढ़ ट्यूशन' },
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition', labelHi: 'गणित ट्यूशन' },
    ],
  },

  // LOCALITY: PREM NAGAR
  'tuition-in-prem-nagar': {
    slug: 'tuition-in-prem-nagar',
    category: 'locality',
    targetLocality: 'Prem Nagar',
    h1En: 'Tuition Classes for Prem Nagar Students (Najafgarh Campus)',
    h1Hi: 'प्रेम नगर के विद्यार्थियों के लिए ट्यूशन कक्षाएं',
    metaTitleEn: 'Tuition Classes for Prem Nagar Najafgarh | Aarohan Academy',
    metaTitleHi: 'प्रेम नगर नजफगढ़ ट्यूशन | आरोहण अकैडमी',
    metaDescEn: 'Top tuition classes near Prem Nagar, Najafgarh. Quick 5 mins e-rickshaw ride to Gupta Park. Small batches of 15 students, concept-based CBSE learning.',
    metaDescHi: 'प्रेम नगर, नजफगढ़ के निकट सर्वोत्तम ट्यूशन। गुप्ता पार्क सेंटर तक 5 मिनट का सीधा मार्ग। छोटे बैच और व्यक्तिगत मार्गदर्शन।',
    valuePropEn: '5-Minute Commute from Prem Nagar: Premium Small-Batch Tuition without Mass Coaching Chaos',
    valuePropHi: 'प्रेम नगर से केवल 5 मिनट: बिना भीड़भाड़ के व्यक्तिगत गुणवत्तापूर्ण ट्यूशन',
    badgeEn: 'Prem Nagar Area Learning Hub',
    badgeHi: 'प्रेम नगर क्षेत्र शिक्षण केंद्र',
    introEn: 'For parents in Prem Nagar, Aarohan Academy at Gupta Park offers the ideal supplementary learning environment just 5 minutes away via direct e-rickshaw or bicycle.',
    introHi: 'प्रेम नगर के परिवारों के लिए गुप्ता पार्क स्थित आरोहण अकैडमी केवल 5 मिनट की दूरी पर व्यक्तिगत और गुणवत्तापूर्ण शिक्षा का उत्तम केंद्र है।',
    subjectsCovered: ['Mathematics', 'Science', 'English Grammar', 'Hindi & EVS'],
    keyChaptersEn: ['CBSE Curriculum Alignment', 'Exam Preparation & Step Marking', 'Daily Homework Support', 'Weekly Quizzes'],
    keyChaptersHi: ['CBSE पाठ्यक्रम पर पूर्ण पकड़', 'परीक्षा तैयारी और समय प्रबंधन', 'दैनिक गृहकार्य समाधान', 'साप्ताहिक टेस्ट'],
    teachingApproachEn: 'Concept-first learning with daily notebook correction and weekly performance updates.',
    teachingApproachHi: 'अवधारणा-आधारित शिक्षण, दैनिक नोटबुक जांच और साप्ताहिक प्रगति रिपोर्ट।',
    whyAarohanEn: [
      'Just 5 minutes ride from Prem Nagar main stand',
      'Small batch capped at 15 students: every child is seen and heard',
      'Peaceful campus away from main road dust and traffic noise',
      'Affordable monthly tuition fees with zero registration charges',
    ],
    whyAarohanHi: [
      'प्रेम नगर मुख्य स्टैंड से केवल 5 मिनट का सीधा रास्ता',
      'अधिकतम 15 विद्यार्थियों का सीमित बैच',
      'मुख्य मार्ग के शोर और प्रदूषण से दूर शांत वातावरण',
      'बिना किसी पंजीकरण शुल्क के पारदर्शी मासिक फीस',
    ],
    faqs: [
      {
        questionEn: 'How can students from Prem Nagar travel to the centre?',
        questionHi: 'प्रेम नगर से छात्र केंद्र तक कैसे पहुंच सकते हैं?',
        answerEn: 'Frequent shared e-rickshaws connect Prem Nagar directly to the Gupta Park / Todarmal Colony entrance in 3–5 minutes.',
        answerHi: 'प्रेम नगर से सीधे ई-रिक्शा 3 से 5 मिनट में गुप्ता पार्क मोड़ तक पहुंचा देते हैं।',
      },
    ],
    testimonial: {
      parentName: 'Anil Yadav',
      studentClass: 'Class 7 Parent',
      quoteEn: 'We travel from Prem Nagar to Aarohan Academy. The 5-minute commute is totally worth it because the teaching quality and personal attention are unmatched.',
      quoteHi: 'हम प्रेम नगर से आते हैं। यहाँ की शिक्षण गुणवत्ता और शिक्षकों का व्यक्तिगत ध्यान वास्तव में अद्वितीय है।',
      locality: 'Prem Nagar, Najafgarh',
    },
    relatedLinks: [
      { slug: 'tuition-in-todarmal-colony', labelEn: 'Tuition in Todarmal Colony', labelHi: 'टोडरमल कॉलोनी ट्यूशन' },
      { slug: 'tuition-in-najafgarh', labelEn: 'Tuition in Najafgarh', labelHi: 'नजफगढ़ ट्यूशन' },
      { slug: 'maths-tuition-najafgarh', labelEn: 'Maths Tuition', labelHi: 'गणित ट्यूशन' },
    ],
  },
};
