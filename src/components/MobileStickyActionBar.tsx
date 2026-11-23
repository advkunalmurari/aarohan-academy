import React, { useState, useEffect } from 'react';
import { Phone, Calendar, MessageCircle, Sparkles, X } from 'lucide-react';
import { Language, PageId, buildWhatsAppUrl, ACADEMY_PHONE_DISPLAY } from '../utils/academyLogic';

interface MobileStickyActionBarProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const MobileStickyActionBar: React.FC<MobileStickyActionBarProps> = ({
  lang,
  onNavigate,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after scrolling 150px so it doesn't collide with immediate hero elements
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed || !isVisible) {
    return null;
  }

  const handleBookVisit = () => {
    const el = document.getElementById('booking-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('enquiry');
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-2 sm:p-3 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none">
      <div className="max-w-md mx-auto bg-white/95 backdrop-blur-lg border border-amber-200/90 rounded-2xl shadow-2xl p-2 flex items-center justify-between gap-1.5 pointer-events-auto">
        {/* Call Action */}
        <a
          href="tel:+919220357826"
          className="flex-1 py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#24476B] font-bold text-xs flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-[#36A9E1]" />
          <span className="leading-tight">{lang === 'en' ? 'Call Now' : 'कॉल करें'}</span>
        </a>

        {/* Primary Shimmering Book Visit Action */}
        <button
          type="button"
          onClick={handleBookVisit}
          className="flex-[1.6] relative overflow-hidden py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#F47B45] via-[#FF8F50] to-[#E06631] text-white font-extrabold text-xs flex flex-col items-center justify-center gap-0.5 shadow-md active:scale-95 transition-all cursor-pointer text-center"
        >
          {/* Shimmer Light Ray */}
          <div className="absolute inset-0 animate-shimmer pointer-events-none" />

          <div className="flex items-center gap-1 leading-tight relative z-10">
            <Calendar className="w-3.5 h-3.5 text-[#FFC845]" />
            <span>{lang === 'en' ? 'Book Visit' : 'विज़िट बुक करें'}</span>
          </div>
          <span className="text-[10px] text-amber-100 font-medium leading-none relative z-10">
            {lang === 'en' ? 'Free Demo • 15–20 Batch' : 'निःशुल्क डेमो • 15–20 बैच'}
          </span>
        </button>

        {/* WhatsApp Action */}
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs flex flex-col items-center justify-center gap-0.5 shadow-xs active:scale-95 transition-all text-center"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="leading-tight">WhatsApp</span>
        </a>

        {/* Dismiss Tiny Button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="w-6 h-6 rounded-full text-slate-400 hover:text-slate-600 flex items-center justify-center text-xs shrink-0 cursor-pointer"
          title="Close quick bar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
