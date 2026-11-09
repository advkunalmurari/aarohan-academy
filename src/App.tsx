/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import {
  Language,
  PageId,
  LibraryResource,
  getPageSeoMeta,
} from './utils/academyLogic';
import { ArticleItem } from './data/academyData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';

const CurriculumPagesView = React.lazy(() =>
  import('./components/CurriculumPagesView').then((m) => ({ default: m.CurriculumPagesView }))
);
const ResourcesAndSupportView = React.lazy(() =>
  import('./components/ResourcesAndSupportView').then((m) => ({ default: m.ResourcesAndSupportView }))
);
const WorksheetModal = React.lazy(() =>
  import('./components/WorksheetModal').then((m) => ({ default: m.WorksheetModal }))
);

const VALID_PAGES: PageId[] = [
  'home',
  'about',
  'approach',
  'programmes',
  'prog-early',
  'prog-primary-1-2',
  'prog-primary-3-5',
  'prog-middle-6-8',
  'subjects',
  'assessment',
  'library',
  'parent-corner',
  'faqs',
  'admissions',
  'contact',
  'privacy',
];

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'home';
  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get('page') as PageId | null;
  if (pageParam && VALID_PAGES.includes(pageParam)) {
    return pageParam;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [lang, setLang] = useState<Language>('en');
  const [selectedWorksheet, setSelectedWorksheet] = useState<LibraryResource | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const meta = getPageSeoMeta(currentPage, lang);
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }
    document.documentElement.lang = lang;
  }, [currentPage, lang]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (page === 'home') {
        url.searchParams.delete('page');
      } else {
        url.searchParams.set('page', page);
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={setLang}
      />

      <main id="main-content" className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            lang={lang}
            onNavigate={handleNavigate}
            onOpenWorksheet={(res) => setSelectedWorksheet(res)}
            onOpenArticle={(art) => setSelectedArticle(art)}
          />
        )}

        <React.Suspense
          fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#24476B] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          {(currentPage === 'about' ||
            currentPage === 'approach' ||
            currentPage === 'programmes' ||
            currentPage === 'prog-early' ||
            currentPage === 'prog-primary-1-2' ||
            currentPage === 'prog-primary-3-5' ||
            currentPage === 'prog-middle-6-8' ||
            currentPage === 'subjects' ||
            currentPage === 'assessment') && (
            <CurriculumPagesView
              page={currentPage}
              lang={lang}
              onNavigate={handleNavigate}
              onOpenWorksheet={(res) => setSelectedWorksheet(res)}
            />
          )}

          {(currentPage === 'library' ||
            currentPage === 'parent-corner' ||
            currentPage === 'faqs' ||
            currentPage === 'admissions' ||
            currentPage === 'contact' ||
            currentPage === 'privacy') && (
            <ResourcesAndSupportView
              page={currentPage}
              lang={lang}
              onNavigate={handleNavigate}
              onOpenWorksheet={(res) => setSelectedWorksheet(res)}
              onOpenArticle={(art) => setSelectedArticle(art)}
            />
          )}

          {selectedWorksheet && (
            <WorksheetModal
              resource={selectedWorksheet}
              onClose={() => setSelectedWorksheet(null)}
              lang={lang}
            />
          )}
        </React.Suspense>
      </main>

      <Footer onNavigate={handleNavigate} lang={lang} />

      {/* Parent Corner Quick Article Reader Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 relative">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#F47B45]">
                  {selectedArticle.category[lang]} · {selectedArticle.readTime[lang]}
                </p>
                <h2
                  id="article-modal-title"
                  className="text-xl sm:text-2xl font-extrabold text-[#24476B] mt-1"
                >
                  {selectedArticle.title[lang]}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close article"
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              {selectedArticle.fullContent.map((p, i) => (
                <p key={i}>{p[lang]}</p>
              ))}

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#24476B]">
                  {lang === 'en' ? 'Key Takeaways:' : 'मुख्य बिंदु:'}
                </p>
                {selectedArticle.keyTakeaways.map((kt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#4CAF80] shrink-0 mt-0.5" />
                    <span>{kt[lang]}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-[#FFF8EB] border border-[#FFC845]/50 p-4">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#F47B45] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'en' ? 'Home Action Tip:' : 'घर पर अभ्यास का सुझाव:'}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-slate-800 mt-1">
                  {selectedArticle.homeActionTip[lang]}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="bg-[#24476B] hover:bg-[#1b3652] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl cursor-pointer"
              >
                {lang === 'en' ? 'Close Guide' : 'बंद करें'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
