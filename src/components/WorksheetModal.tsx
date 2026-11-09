import React from 'react';
import { X, Printer, Download, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';
import { Language, LibraryResource } from '../utils/academyLogic';
import { BRAND_ASSETS } from '../data/academyData';

interface WorksheetModalProps {
  resource: LibraryResource | null;
  onClose: () => void;
  lang: Language;
}

export const WorksheetModal: React.FC<WorksheetModalProps> = ({
  resource,
  onClose,
  lang,
}) => {
  if (!resource) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtmlWorksheet = () => {
    const htmlContent = `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <title>${resource.title.en} - Aarohan Academy Worksheet</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
    body { font-family: 'Bricolage Grotesque', 'Noto Sans Devanagari', sans-serif; padding: 36px; color: #0f172a; max-width: 780px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #24476B; padding-bottom: 16px; margin-bottom: 20px; }
    .title { font-size: 22px; font-weight: 800; color: #24476B; margin: 0; }
    .meta { font-size: 13px; color: #475569; margin-top: 4px; }
    .instructions { background: #FFF8EB; border: 1px solid #FFC845; border-radius: 12px; padding: 14px 18px; margin-bottom: 20px; }
    .task { border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; margin-bottom: 12px; font-size: 15px; line-height: 1.6; }
    .write-line { border-bottom: 1px dashed #94a3b8; height: 26px; margin-top: 8px; }
    .parent-box { background: #f0fdf4; border: 1px solid #4CAF80; border-radius: 12px; padding: 14px 18px; margin-top: 24px; font-size: 13px; }
    .footer { margin-top: 28px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="title">Aarohan Academy • आरोहण अकैडमी</h1>
      <div class="meta">Learn • Grow • Shine | H.No. 49B, Gupta Park, Todarmal Colony, Najafgarh, Delhi (+91 9220357826)</div>
    </div>
    <div style="text-align:right; font-size:12px;">
      <div><strong>Worksheet #${resource.id}</strong></div>
      <div>${resource.classGroup} • ${resource.subject}</div>
      <div>Level: ${resource.difficulty}</div>
    </div>
  </div>
  <h2 style="margin-bottom:4px; color:#24476B;">${resource.title.en} / ${resource.title.hi}</h2>
  <p style="margin-top:0; font-size:13px; color:#475569;"><strong>Learning Objective:</strong> ${resource.objective.en} | ${resource.objective.hi}</p>
  <div style="display:flex; gap:24px; margin: 14px 0 20px; font-size:13px;">
    <div>Student Name (नाम): ___________________________</div>
    <div>Date (दिनांक): _______________</div>
  </div>
  <div class="instructions">
    <div><strong>Instructions (English):</strong> ${resource.worksheetPreview.instructionsEn}</div>
    <div style="margin-top:6px;"><strong>निर्देश (हिंदी):</strong> ${resource.worksheetPreview.instructionsHi}</div>
  </div>
  ${resource.worksheetPreview.tasks
    .map(
      (t, idx) => `<div class="task">
      <div><strong>${idx + 1}.</strong> ${t.promptEn}</div>
      <div style="color:#334155; font-size:14px; margin-top:4px;">${t.promptHi}</div>
      <div class="write-line"></div>
    </div>`
    )
    .join('')}
  <div class="parent-box">
    <div><strong>For Parents (अभिभावकों के लिए सुझाव):</strong></div>
    <div style="margin-top:4px;">${resource.worksheetPreview.parentTipEn}</div>
    <div style="margin-top:4px;">${resource.worksheetPreview.parentTipHi}</div>
  </div>
  <div class="footer">
    Original Educational Resource by Aarohan Academy, Najafgarh • File: ${resource.fileName}
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = resource.fileName.replace('.pdf', '.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="worksheet-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Modal Top Controls */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#36A9E1]" />
            <span className="text-xs font-bold text-slate-500">
              {lang === 'en'
                ? `Aarohan Learning Library • Resource #${resource.id}`
                : `आरोहण लर्निंग लाइब्रेरी • वर्कशीट #${resource.id}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#24476B] hover:bg-[#1b3552] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'en' ? 'Print / Save PDF' : 'प्रिंट / PDF सेव करें'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadHtmlWorksheet}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#36A9E1]/15 hover:bg-[#36A9E1]/25 text-[#24476B] text-xs font-bold transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'en' ? 'Download Sheet' : 'डाउनलोड करें'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close worksheet preview"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable A4 Worksheet Sheet */}
        <div id="printable-worksheet-area" className="p-6 sm:p-8 space-y-6">
          {/* A4 Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-[#24476B]">
            <div className="flex items-center gap-3.5">
              <img
                src={BRAND_ASSETS.logo}
                alt="Aarohan Academy Logo"
                className="w-14 h-14 object-contain shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-lg font-extrabold text-[#24476B]">
                  Aarohan Academy • आरोहण अकैडमी
                </div>
                <div className="text-xs text-slate-600">
                  H.No. 49B, Gupta Park, Todarmal Colony, Najafgarh, Delhi • +91 9220357826
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 sm:text-right space-y-0.5 font-mono">
              <div className="font-bold text-[#24476B]">{resource.fileName}</div>
              <div>
                {resource.classGroup} · {resource.subject} · {resource.difficulty}
              </div>
            </div>
          </div>

          {/* Worksheet Title & Objective */}
          <div className="space-y-2">
            <h2
              id="worksheet-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-[#24476B]"
            >
              {resource.title[lang]}
            </h2>
            <p className="text-sm text-slate-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4CAF80] shrink-0" />
              <span>
                <strong>{lang === 'en' ? 'Learning Goal:' : 'सीखने का उद्देश्य:'}</strong>{' '}
                {resource.objective[lang]}
              </span>
            </p>
          </div>

          {/* Student Name & Date Line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <div>
              <strong>{lang === 'en' ? 'Student Name:' : 'विद्यार्थी का नाम:'}</strong>{' '}
              __________________________________
            </div>
            <div>
              <strong>{lang === 'en' ? 'Class & Date:' : 'कक्षा एवं दिनांक:'}</strong>{' '}
              __________________________________
            </div>
          </div>

          {/* Bilingual Instructions Box */}
          <div className="p-4 rounded-2xl bg-[#FFF8EB] border border-[#FFC845] space-y-1.5">
            <div className="text-xs font-bold text-[#24476B]">
              {lang === 'en' ? 'Instructions (English & Hindi):' : 'अभ्यास निर्देश (हिंदी और अंग्रेजी):'}
            </div>
            <p className="text-sm font-medium text-slate-900">
              {resource.worksheetPreview.instructionsEn}
            </p>
            <p className="text-sm text-slate-700" lang="hi">
              {resource.worksheetPreview.instructionsHi}
            </p>
          </div>

          {/* Tasks / Exercises */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-bold text-[#24476B]">
              {lang === 'en' ? 'Practice Exercises:' : 'अभ्यास प्रश्न:'}
            </h3>

            {resource.worksheetPreview.tasks.map((task, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs"
              >
                <div className="text-sm font-bold text-slate-900">
                  <span className="text-[#F47B45] mr-2">Q{idx + 1}.</span>
                  {task.promptEn}
                </div>
                <div className="text-xs sm:text-sm text-slate-600" lang="hi">
                  {task.promptHi}
                </div>
                <div className="pt-3 border-b border-dashed border-slate-300 text-xs text-slate-400">
                  {lang === 'en' ? 'Write / Draw your answer here...' : 'यहाँ अपना उत्तर लिखें या चित्र बनाएँ...'}
                </div>
              </div>
            ))}
          </div>

          {/* For Parents Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-[#4CAF80]/40 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#4CAF80] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="font-bold text-[#24476B]">
                {lang === 'en'
                  ? 'For Parents (Home Support Tip):'
                  : 'अभिभावकों के लिए सुझाव (घर पर सहयोग):'}
              </div>
              <p className="text-slate-700">{resource.worksheetPreview.parentTipEn}</p>
              <p className="text-slate-600" lang="hi">
                {resource.worksheetPreview.parentTipHi}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
