import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  MessageSquarePlus,
  Sparkles,
  AlertCircle,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  Language,
  ParentTestimonial,
  TestimonialStageFilter,
  ParentFeedbackSubmissionInput,
  filterParentTestimonials,
  validateParentFeedbackInput,
} from '../utils/academyLogic';
import { VERIFIED_PARENT_TESTIMONIALS } from '../data/academyData';
import { SectionDoodleBackdrop } from './CreativeBackground';

interface ParentTestimonialsSectionProps {
  lang: Language;
  initialStageFilter?: TestimonialStageFilter;
}

export const ParentTestimonialsSection: React.FC<ParentTestimonialsSectionProps> = ({
  lang,
  initialStageFilter = 'all',
}) => {
  const [testimonials, setTestimonials] = useState<ParentTestimonial[]>(
    VERIFIED_PARENT_TESTIMONIALS
  );
  const [stageFilter, setStageFilter] = useState<TestimonialStageFilter>(initialStageFilter);
  const [showSubmitForm, setShowSubmitForm] = useState<boolean>(false);

  const [formInput, setFormInput] = useState<ParentFeedbackSubmissionInput>({
    parentInitialsOrName: '',
    registeredPhone: '',
    studentClass: '',
    stage: 'primary',
    focusArea: '',
    feedbackText: '',
    privacyConsent: false,
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof ParentFeedbackSubmissionInput, string>>
  >({});
  const [submissionSuccessId, setSubmissionSuccessId] = useState<string | null>(null);

  const visibleTestimonials = filterParentTestimonials(testimonials, stageFilter);

  const handleClassSelect = (selectedClass: string) => {
    let derivedStage: 'early' | 'primary' | 'middle' = 'primary';
    if (['Nursery', 'LKG', 'UKG'].includes(selectedClass)) {
      derivedStage = 'early';
    } else if (['Class 6', 'Class 7', 'Class 8'].includes(selectedClass)) {
      derivedStage = 'middle';
    }
    setFormInput((prev) => ({
      ...prev,
      studentClass: selectedClass,
      stage: derivedStage,
    }));
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateParentFeedbackInput(formInput, lang);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    const newCode = `AAR-PF-SUB-${Math.floor(100 + Math.random() * 900)}`;
    const newEntry: ParentTestimonial = {
      id: `user-${Date.now()}`,
      stage: formInput.stage,
      parentAttribution: {
        en: `${formInput.parentInitialsOrName.trim()} (Parent of a ${formInput.studentClass} Learner)`,
        hi: `${formInput.parentInitialsOrName.trim()} (${formInput.studentClass} के विद्यार्थी के अभिभावक)`,
      },
      locality: {
        en: 'Najafgarh, Delhi',
        hi: 'नजफगढ़, दिल्ली',
      },
      studentClass: {
        en: formInput.studentClass,
        hi: formInput.studentClass,
      },
      durationAttended: {
        en: 'Current Term',
        hi: 'वर्तमान सत्र',
      },
      focusArea: {
        en: formInput.focusArea.trim(),
        hi: formInput.focusArea.trim(),
      },
      observedProgress: {
        en: `Parent-reported progress in ${formInput.focusArea.trim()}`,
        hi: `${formInput.focusArea.trim()} में अभिभावक द्वारा साझा सुधार`,
      },
      quote: {
        en: formInput.feedbackText.trim(),
        hi: formInput.feedbackText.trim(),
      },
      verificationSource: {
        en: 'Submitted by Parent • Pending Centre Phone Verification',
        hi: 'अभिभावक द्वारा प्रस्तुत • केंद्र सत्यापन प्रक्रियाधीन',
      },
      verificationCode: newCode,
      status: 'pending-verification',
    };

    setTestimonials((prev) => [newEntry, ...prev]);
    setStageFilter('all');
    setSubmissionSuccessId(newCode);
    setShowSubmitForm(false);
    setFormInput({
      parentInitialsOrName: '',
      registeredPhone: '',
      studentClass: '',
      stage: 'primary',
      focusArea: '',
      feedbackText: '',
      privacyConsent: false,
    });
  };

  return (
    <section
      id="verified-parent-reflections"
      aria-labelledby="parent-reflections-heading"
      className="relative overflow-hidden py-16 lg:py-24 bg-[#FAFBFD] border-y border-slate-200/80"
    >
      <SectionDoodleBackdrop variant="lavender" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header & Discreet Privacy / Verification Standard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-7 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#4CAF80]">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {lang === 'en'
                  ? 'Discreet & Verified Parent Reflections'
                  : 'सत्यापित एवं गोपनीय अभिभावक अनुभव'}
              </span>
            </div>
            <h2
              id="parent-reflections-heading"
              className="text-3xl sm:text-4xl font-extrabold text-[#24476B] tracking-tight"
            >
              {lang === 'en'
                ? 'What Parents Observe in Their Child’s Daily Learning'
                : 'बच्चों की पढ़ाई और आत्मविश्वास में अभिभावकों द्वारा देखे गए बदलाव'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {lang === 'en'
                ? 'Collected during our Monthly Growth Note interactions at H.No. 54B, Gupta Park, Todarmal Colony, Najafgarh. Focused on real reading, writing, and conceptual habits rather than commercial hype.'
                : 'मकान नं. 54B, गुप्ता पार्क, नजफगढ़ में मासिक ग्रोथ नोट चर्चा के दौरान अभिभावकों द्वारा साझा किए गए वास्तविक अनुभव।'}
            </p>
          </div>

          {/* Discreet Child-Privacy & Verification Note Box */}
          <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
            <div className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-[#24476B] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-[#24476B] block mb-0.5">
                  {lang === 'en'
                    ? 'Child-Privacy & Verification Standard (DPDP Compliant)'
                    : 'बाल-गोपनीयता और सत्यापन मानक (DPDP के अनुरूप)'}
                </strong>
                {lang === 'en'
                  ? 'To protect children’s privacy, we publish only parent initials/surnames and class levels—never exposing a child’s full name, photograph, or school test marks. Every entry is cross-verified against our centre’s Monthly Growth Note log.'
                  : 'बच्चों की गोपनीयता की रक्षा के लिए हम केवल अभिभावकों के संक्षिप्त नाम और कक्षा दर्शाते हैं—बच्चे का पूरा नाम, फोटो या स्कूल के अंक कभी सार्वजनिक नहीं किए जाते।'}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar + Share Feedback Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-200/80">
          <div
            role="group"
            aria-label={lang === 'en' ? 'Filter parent reflections by stage' : 'चरण के अनुसार अभिभावक अनुभव चुनें'}
            className="flex flex-wrap items-center gap-2"
          >
            {(
              [
                {
                  id: 'all',
                  label:
                    lang === 'en'
                      ? `All Stages (${testimonials.length})`
                      : `सभी चरण (${testimonials.length})`,
                },
                {
                  id: 'early',
                  label:
                    lang === 'en'
                      ? 'Early Learning (Nursery–UKG)'
                      : 'प्रारंभिक (नर्सरी–UKG)',
                },
                {
                  id: 'primary',
                  label:
                    lang === 'en'
                      ? 'Primary (Classes 1–5)'
                      : 'प्राइमरी (कक्षा 1–5)',
                },
                {
                  id: 'middle',
                  label:
                    lang === 'en'
                      ? 'Middle School (Classes 6–8)'
                      : 'मिडिल स्कूल (कक्षा 6–8)',
                },
              ] as const
            ).map((tab) => {
              const active = stageFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStageFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#24476B] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-expanded={showSubmitForm}
            onClick={() => {
              setShowSubmitForm((prev) => !prev);
              setSubmissionSuccessId(null);
            }}
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#24476B] bg-[#FFF8EB] hover:bg-[#FFC845]/30 border border-[#FFC845] px-4 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#F47B45]" />
            <span>
              {lang === 'en'
                ? 'Share Your Experience (Enrolled Parents)'
                : 'अपना अनुभव साझा करें (पंजीकृत अभिभावक)'}
            </span>
            {showSubmitForm ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Submission Confirmation Banner */}
        {submissionSuccessId && (
          <div
            role="status"
            className="mb-8 rounded-2xl bg-[#F4FBF7] border border-[#4CAF80] p-5 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#4CAF80] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-extrabold text-[#24476B]">
                  {lang === 'en'
                    ? `Thank you! Your parent reflection (${submissionSuccessId}) has been added below.`
                    : `धन्यवाद! आपकी प्रतिक्रिया (${submissionSuccessId}) नीचे जोड़ दी गई है।`}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {lang === 'en'
                    ? 'It is currently marked as "Pending Centre Verification" and will be verified against your registered mobile number during centre hours.'
                    : 'इसे वर्तमान में "केंद्र सत्यापन प्रक्रियाधीन" के रूप में दर्शाया गया है।'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSubmissionSuccessId(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              {lang === 'en' ? 'Dismiss' : 'बंद करें'}
            </button>
          </div>
        )}

        {/* Collapsible Enrolled Parent Feedback Form */}
        {showSubmitForm && (
          <form
            onSubmit={handleFeedbackSubmit}
            noValidate
            className="mb-10 rounded-3xl bg-white border-2 border-[#24476B]/15 p-6 sm:p-8 shadow-md space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#24476B]">
                  {lang === 'en'
                    ? 'Submit a Verified Parent Learning Reflection'
                    : 'पंजीकृत अभिभावक प्रतिक्रिया फॉर्म'}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {lang === 'en'
                    ? 'Your mobile number is used strictly to verify enrolment and is never displayed publicly.'
                    : 'आपका मोबाइल नंबर केवल पंजीकरण सत्यापित करने के लिए है और इसे कभी सार्वजनिक नहीं किया जाता।'}
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-[#4CAF80]">
                {lang === 'en'
                  ? 'Initials-Only Public Display'
                  : 'केवल संक्षिप्त नाम प्रदर्शित होगा'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="pf-parent-name"
                  className="block text-xs font-bold text-[#24476B] mb-1"
                >
                  {lang === 'en'
                    ? 'Parent Initials / Name *'
                    : 'अभिभावक का नाम / आद्याक्षर *'}
                </label>
                <input
                  id="pf-parent-name"
                  type="text"
                  value={formInput.parentInitialsOrName}
                  onChange={(e) =>
                    setFormInput((prev) => ({
                      ...prev,
                      parentInitialsOrName: e.target.value,
                    }))
                  }
                  placeholder={lang === 'en' ? 'e.g. Mrs. K. Yadav' : 'जैसे: श्रीमती के. यादव'}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#36A9E1]"
                />
                {formErrors.parentInitialsOrName && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.parentInitialsOrName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pf-phone"
                  className="block text-xs font-bold text-[#24476B] mb-1"
                >
                  {lang === 'en'
                    ? 'Registered Mobile (For Verification) *'
                    : 'पंजीकृत मोबाइल नंबर (सत्यापन हेतु) *'}
                </label>
                <input
                  id="pf-phone"
                  type="tel"
                  value={formInput.registeredPhone}
                  onChange={(e) =>
                    setFormInput((prev) => ({
                      ...prev,
                      registeredPhone: e.target.value,
                    }))
                  }
                  placeholder={lang === 'en' ? '10-digit mobile number' : '10 अंकों का मोबाइल नंबर'}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#36A9E1]"
                />
                {formErrors.registeredPhone && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.registeredPhone}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pf-student-class"
                  className="block text-xs font-bold text-[#24476B] mb-1"
                >
                  {lang === 'en' ? "Child's Class *" : 'बच्चे की कक्षा *'}
                </label>
                <select
                  id="pf-student-class"
                  value={formInput.studentClass}
                  onChange={(e) => handleClassSelect(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#36A9E1]"
                >
                  <option value="">
                    {lang === 'en' ? 'Select Class' : 'कक्षा चुनें'}
                  </option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 6">Class 6</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                </select>
                {formErrors.studentClass && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.studentClass}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pf-focus-area"
                  className="block text-xs font-bold text-[#24476B] mb-1"
                >
                  {lang === 'en'
                    ? 'Area of Progress Observed *'
                    : 'किस विषय/आदत में सुधार दिखा *'}
                </label>
                <input
                  id="pf-focus-area"
                  type="text"
                  value={formInput.focusArea}
                  onChange={(e) =>
                    setFormInput((prev) => ({ ...prev, focusArea: e.target.value }))
                  }
                  placeholder={
                    lang === 'en'
                      ? 'e.g. Reading Fluency & Fractions'
                      : 'जैसे: हिंदी पठन और भिन्न के सवाल'
                  }
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#36A9E1]"
                />
                {formErrors.focusArea && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.focusArea}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="pf-feedback-text"
                className="block text-xs font-bold text-[#24476B] mb-1"
              >
                {lang === 'en'
                  ? "Your Reflection on Your Child's Learning Experience *"
                  : 'बच्चे के सीखने के अनुभव के बारे में आपकी प्रतिक्रिया *'}
              </label>
              <textarea
                id="pf-feedback-text"
                rows={3}
                value={formInput.feedbackText}
                onChange={(e) =>
                  setFormInput((prev) => ({
                    ...prev,
                    feedbackText: e.target.value,
                  }))
                }
                placeholder={
                  lang === 'en'
                    ? 'Share specific changes you noticed in your child’s understanding, confidence, or study routine...'
                    : 'बच्चे की समझ, आत्मविश्वास या पढ़ने की दिनचर्या में आपने जो बदलाव देखा उसे साझा करें...'
                }
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#36A9E1]"
              />
              {formErrors.feedbackText && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{formErrors.feedbackText}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="space-y-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={formInput.privacyConsent}
                    onChange={(e) =>
                      setFormInput((prev) => ({
                        ...prev,
                        privacyConsent: e.target.checked,
                      }))
                    }
                    className="mt-0.5 rounded border-slate-300 text-[#24476B] focus:ring-[#36A9E1]"
                  />
                  <span>
                    {lang === 'en'
                      ? 'I am an enrolled parent/guardian at Aarohan Academy and consent to displaying this reflection discreetly using parent initials and class level only.'
                      : 'मैं आरोहण अकैडमी का पंजीकृत अभिभावक हूँ और केवल संक्षिप्त नाम व कक्षा के साथ यह अनुभव प्रदर्शित करने की सहमति देता/देती हूँ।'}
                  </span>
                </label>
                {formErrors.privacyConsent && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.privacyConsent}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-[#24476B] hover:bg-[#1b3652] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                {lang === 'en'
                  ? 'Submit Verified Reflection'
                  : 'प्रतिक्रिया प्रस्तुत करें'}
              </button>
            </div>
          </form>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTestimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl bg-white/95 backdrop-blur-xs border border-slate-200/90 p-6 sm:p-7 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Discreet Unboxed Metadata Header */}
                <div className="flex items-center justify-between gap-2 text-xs font-bold">
                  <span className="text-[#36A9E1]">
                    {item.studentClass[lang]} · {item.durationAttended[lang]}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    {item.verificationCode}
                  </span>
                </div>

                {/* Specific Learning Progress Highlight */}
                <div className="mt-3.5 rounded-2xl bg-[#FFF8EB] border border-[#FFC845]/50 p-3.5">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#F47B45]">
                    {lang === 'en' ? 'Focus Area: ' : 'मुख्य क्षेत्र: '}
                    <span className="text-[#24476B]">{item.focusArea[lang]}</span>
                  </p>
                  <p className="text-xs text-slate-700 mt-1 leading-snug">
                    <strong className="text-[#4CAF80]">
                      {lang === 'en' ? 'Observed Progress: ' : 'देखा गया सुधार: '}
                    </strong>
                    {item.observedProgress[lang]}
                  </p>
                </div>

                {/* Parent Reflection Quote */}
                <blockquote className="mt-4 text-sm text-slate-700 leading-relaxed">
                  “{item.quote[lang]}”
                </blockquote>
              </div>

              {/* Discreet Attribution & Verification Footer */}
              <footer className="mt-6 pt-4 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs sm:text-sm font-extrabold text-[#24476B]">
                    {item.parentAttribution[lang]}
                  </p>
                </div>
                <p className="text-xs text-slate-500">{item.locality[lang]}</p>
                <div className="flex items-center gap-1.5 pt-1 text-[11px] font-semibold">
                  {item.status === 'verified' ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF80] shrink-0" />
                      <span className="text-[#4CAF80]">
                        {item.verificationSource[lang]}
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[#F47B45] shrink-0" />
                      <span className="text-[#F47B45]">
                        {item.verificationSource[lang]}
                      </span>
                    </>
                  )}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
