import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppUrl,
  buildGoogleMapsDirectionsUrl,
  validateEnquiryForm,
  filterLibraryResources,
  getPageSeoMeta,
  filterParentTestimonials,
  validateParentFeedbackInput,
  DEFAULT_WHATSAPP_MESSAGE,
  LibraryResource,
  ParentTestimonial,
} from './academyLogic';

const sampleResources: LibraryResource[] = [
  {
    id: 1,
    title: { en: 'Alphabet Sound Hunt', hi: 'अक्षर ध्वनि खोज' },
    classGroup: 'Nursery to UKG',
    gradeTags: ['Nursery', 'LKG', 'Nursery to UKG'],
    subject: 'English',
    topic: 'Phonics',
    difficulty: 'Start',
    objective: { en: 'Link letters to their sounds', hi: 'अक्षरों को उनकी ध्वनि से जोड़ना' },
    format: { en: 'Picture match page', hi: 'चित्र मिलान पृष्ठ' },
    fileName: 'nursery-english-phonics-start.pdf',
    status: 'ready',
    worksheetPreview: {
      instructionsEn: 'Say each picture name aloud and circle its starting sound.',
      instructionsHi: 'प्रत्येक चित्र का नाम बोलें और उसकी पहली ध्वनि पर घेरा लगाएँ।',
      tasks: [{ promptEn: 'Apple -> a / b / c', promptHi: 'सेब (Apple) -> a / b / c' }],
      parentTipEn: 'Focus on the sound, not just the letter name.',
      parentTipHi: 'केवल अक्षर के नाम पर नहीं, उसकी ध्वनि पर ध्यान दें।',
    },
  },
  {
    id: 15,
    title: { en: 'Table Patterns 2 to 5', hi: 'पहाड़ों के पैटर्न 2 से 5' },
    classGroup: 'Classes 3–5',
    gradeTags: ['Class 3', 'Classes 3–5'],
    subject: 'Mathematics',
    topic: 'Multiplication',
    difficulty: 'Build',
    objective: { en: 'See patterns in tables', hi: 'पहाड़ों में पैटर्न समझना' },
    format: { en: 'Grid page', hi: 'ग्रिड वर्कशीट' },
    fileName: 'class3-maths-tables-build.pdf',
    status: 'ready',
    worksheetPreview: {
      instructionsEn: 'Complete the number grid and colour multiples of 5.',
      instructionsHi: 'संख्या ग्रिड पूरा करें और 5 के गुणजों में रंग भरें।',
      tasks: [{ promptEn: '5, 10, 15, __, 25', promptHi: '5, 10, 15, __, 25' }],
      parentTipEn: 'Ask your child what digit all multiples of 5 end with.',
      parentTipHi: 'बच्चे से पूछें कि 5 के सभी गुणज किस अंक पर समाप्त होते हैं।',
    },
  },
];

test('buildWhatsAppUrl constructs valid click-to-chat URL for +91 9220357826', () => {
  const defaultUrl = buildWhatsAppUrl();
  assert.ok(defaultUrl.startsWith('https://wa.me/919220357826?text='));
  assert.ok(defaultUrl.includes(encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)));

  const customUrl = buildWhatsAppUrl('Namaste Aarohan!');
  assert.equal(customUrl, 'https://wa.me/919220357826?text=Namaste%20Aarohan!');
});

test('buildGoogleMapsDirectionsUrl includes Gupta Park, Todarmal Colony, Najafgarh', () => {
  const mapsUrl = buildGoogleMapsDirectionsUrl();
  assert.ok(mapsUrl.startsWith('https://www.google.com/maps/dir/?api=1&destination='));
  assert.ok(decodeURIComponent(mapsUrl).includes('H.No. 54B, Gupta Park, Todarmal Colony, Najafgarh'));
});

test('validateEnquiryForm rejects empty or invalid inputs and accepts valid data', () => {
  const invalidResult = validateEnquiryForm(
    {
      parentName: 'A',
      phone: '12345',
      studentClass: '',
      preferredProgramme: '',
      message: '',
      consentGiven: false,
    },
    'en'
  );
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.parentName);
  assert.ok(invalidResult.errors.phone);
  assert.ok(invalidResult.errors.studentClass);
  assert.ok(invalidResult.errors.preferredProgramme);
  assert.ok(invalidResult.errors.consentGiven);

  const validResult = validateEnquiryForm(
    {
      parentName: 'Rajesh Sharma',
      phone: '+91 9876543210',
      studentClass: 'Class 3',
      preferredProgramme: 'Primary Learning (Classes 3–5)',
      message: 'Looking for evening batch.',
      consentGiven: true,
    },
    'en'
  );
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('filterLibraryResources filters by class, subject, difficulty, and search query', () => {
  const all = filterLibraryResources(sampleResources, {
    classFilter: 'All',
    subjectFilter: 'All',
    topicFilter: 'All',
    difficultyFilter: 'All',
    searchQuery: '',
  });
  assert.equal(all.length, 2);

  const mathOnly = filterLibraryResources(sampleResources, {
    classFilter: 'Class 3',
    subjectFilter: 'Mathematics',
    topicFilter: 'All',
    difficultyFilter: 'Build',
    searchQuery: '',
  });
  assert.equal(mathOnly.length, 1);
  assert.equal(mathOnly[0].id, 15);

  const hindiQuery = filterLibraryResources(sampleResources, {
    classFilter: 'All',
    subjectFilter: 'All',
    topicFilter: 'All',
    difficultyFilter: 'All',
    searchQuery: 'ध्वनि',
  });
  assert.equal(hindiQuery.length, 1);
  assert.equal(hindiQuery[0].id, 1);
});

test('getPageSeoMeta returns localized titles and descriptions for all pages', () => {
  const homeEn = getPageSeoMeta('home', 'en');
  const homeHi = getPageSeoMeta('home', 'hi');
  assert.ok(homeEn.title.includes('Aarohan Academy'));
  assert.ok(homeHi.title.includes('आरोहण अकैडमी'));
});

test('filterParentTestimonials and validateParentFeedbackInput work accurately', () => {
  const mockTestimonials: ParentTestimonial[] = [
    {
      id: 't1',
      stage: 'early',
      parentAttribution: { en: 'Mrs. S. Deswal', hi: 'श्रीमती एस. देसवाल' },
      locality: { en: 'Gupta Park', hi: 'गुप्ता पार्क' },
      studentClass: { en: 'UKG', hi: 'UKG' },
      durationAttended: { en: '5 Months', hi: '5 माह' },
      focusArea: { en: 'Phonics & Pencil Grip', hi: 'फोनेटिक्स और पेंसिल पकड़' },
      observedProgress: { en: 'Blends 3-letter words independently', hi: '3-अक्षर के शब्द स्वयं पढ़ता है' },
      quote: { en: 'Calm environment.', hi: 'शांत वातावरण।' },
      verificationSource: { en: 'Monthly Growth Note Review', hi: 'मासिक ग्रोथ नोट समीक्षा' },
      verificationCode: 'AAR-PF-01',
      status: 'verified',
    },
    {
      id: 't2',
      stage: 'middle',
      parentAttribution: { en: 'Mr. R. Shokeen', hi: 'श्री आर. शौकीन' },
      locality: { en: 'Todarmal Colony', hi: 'टोडरमल कॉलोनी' },
      studentClass: { en: 'Class 7', hi: 'कक्षा 7' },
      durationAttended: { en: '6 Months', hi: '6 माह' },
      focusArea: { en: 'Maths Equations', hi: 'बीजगणित समीकरण' },
      observedProgress: { en: 'Step-by-step solving', hi: 'चरणबद्ध समाधान' },
      quote: { en: 'Clear concepts.', hi: 'स्पष्ट समझ।' },
      verificationSource: { en: 'Parent Feedback Log', hi: 'अभिभावक फीडबैक रजिस्टर' },
      verificationCode: 'AAR-PF-02',
      status: 'verified',
    },
  ];

  assert.equal(filterParentTestimonials(mockTestimonials, 'all').length, 2);
  assert.equal(filterParentTestimonials(mockTestimonials, 'early').length, 1);
  assert.equal(filterParentTestimonials(mockTestimonials, 'primary').length, 0);
  assert.equal(filterParentTestimonials(mockTestimonials, 'middle').length, 1);

  const invalidFeedback = validateParentFeedbackInput(
    {
      parentInitialsOrName: 'A',
      registeredPhone: '123',
      studentClass: '',
      stage: 'primary',
      focusArea: '',
      feedbackText: 'Too short',
      privacyConsent: false,
    },
    'en'
  );
  assert.equal(invalidFeedback.valid, false);
  assert.ok(invalidFeedback.errors.parentInitialsOrName);
  assert.ok(invalidFeedback.errors.registeredPhone);
  assert.ok(invalidFeedback.errors.studentClass);
  assert.ok(invalidFeedback.errors.focusArea);
  assert.ok(invalidFeedback.errors.feedbackText);
  assert.ok(invalidFeedback.errors.privacyConsent);

  const validFeedback = validateParentFeedbackInput(
    {
      parentInitialsOrName: 'Mrs. K. Yadav',
      registeredPhone: '9811223344',
      studentClass: 'Class 4',
      stage: 'primary',
      focusArea: 'Fractions & Hindi Dictation',
      feedbackText: 'My daughter now reads her Hindi chapters aloud without hesitation and understands fractions clearly.',
      privacyConsent: true,
    },
    'en'
  );
  assert.equal(validFeedback.valid, true);
  assert.deepEqual(validFeedback.errors, {});
});

