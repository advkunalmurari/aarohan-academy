import React, { useState } from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, Footprints, Bus, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { Language } from '../utils/academyLogic';
import { pushDataLayerEvent } from '../utils/analytics';

interface LocalCommuteCheckerProps {
  lang: Language;
}

interface LocalityDetail {
  id: string;
  nameEn: string;
  nameHi: string;
  distance: string;
  walkTimeEn: string;
  walkTimeHi: string;
  rickshawTimeEn: string;
  rickshawTimeHi: string;
  routeHighlightEn: string;
  routeHighlightHi: string;
  popularForEn: string;
  popularForHi: string;
  mapsUrl: string;
}

const LOCALITIES: LocalityDetail[] = [
  {
    id: 'gupta-park',
    nameEn: 'Gupta Park',
    nameHi: 'गुप्ता पार्क',
    distance: '50 m',
    walkTimeEn: '1 – 2 mins walk',
    walkTimeHi: '1 – 2 मिनट पैदल',
    rickshawTimeEn: 'Walking distance',
    rickshawTimeHi: 'पैदल दूरी',
    routeHighlightEn: 'Direct interior residential lane, zero main road traffic, completely pedestrian safe.',
    routeHighlightHi: 'सीधी आवासीय गली, भारी वाहनों से सुरक्षित, बच्चों के लिए पैदल सुलभ।',
    popularForEn: 'Nursery to Class 8 kids walk safely to class daily',
    popularForHi: 'नर्सरी से कक्षा 8 के बच्चे प्रतिदिन आसानी से आते हैं',
    mapsUrl: 'https://maps.google.com/?q=28.6139,76.9830',
  },
  {
    id: 'todarmal-colony',
    nameEn: 'Todarmal Colony',
    nameHi: 'टोडरमल कॉलोनी',
    distance: '150 m',
    walkTimeEn: '2 – 3 mins walk',
    walkTimeHi: '2 – 3 मिनट पैदल',
    rickshawTimeEn: 'Walking distance',
    rickshawTimeHi: 'पैदल दूरी',
    routeHighlightEn: 'Adjacent colony lane leading directly into Gupta Park H.No. 49B.',
    routeHighlightHi: 'निकटवर्ती शांत कॉलोनी मार्ग, सीधे गुप्ता पार्क प्रवेश द्वार से जुड़ा।',
    popularForEn: 'Adjacent neighbourhood with 40+ active students',
    popularForHi: 'निकटवर्ती कॉलोनी जहाँ से 40 से अधिक छात्र अध्ययनरत हैं',
    mapsUrl: 'https://maps.google.com/?q=28.6139,76.9830',
  },
  {
    id: 'roshanpura',
    nameEn: 'Roshanpura & Thana Rd',
    nameHi: 'रोशनपुरा व थाना रोड',
    distance: '550 m',
    walkTimeEn: '6 – 8 mins walk',
    walkTimeHi: '6 – 8 मिनट पैदल',
    rickshawTimeEn: '2 – 3 mins via E-Rickshaw',
    rickshawTimeHi: '2 – 3 मिनट ई-रिक्शा द्वारा',
    routeHighlightEn: 'Straight access from Thana Road turn into Todarmal Colony lane.',
    routeHighlightHi: 'थाना रोड से सीधा टोडरमल कॉलोनी मोड़, ई-रिक्शा लगातार उपलब्ध।',
    popularForEn: 'Frequent shared e-rickshaws right to Gupta Park lane',
    popularForHi: 'गुप्ता पार्क मोड़ तक नियमित ई-रिक्शा सेवा उपलब्ध',
    mapsUrl: 'https://maps.google.com/?q=28.6139,76.9830',
  },
  {
    id: 'prem-nagar',
    nameEn: 'Prem Nagar',
    nameHi: 'प्रेम नगर',
    distance: '850 m',
    walkTimeEn: '10 – 12 mins walk',
    walkTimeHi: '10 – 12 मिनट पैदल',
    rickshawTimeEn: '3 – 5 mins via E-Rickshaw',
    rickshawTimeHi: '3 – 5 मिनट ई-रिक्शा द्वारा',
    routeHighlightEn: 'Quick ride along Main Road into Todarmal/Gupta Park residential area.',
    routeHighlightHi: 'मुख्य मार्ग से सीधा गुप्ता पार्क आवासीय मोड़, 5 मिनट में पहुंच।',
    popularForEn: 'Middle school students commute smoothly via cycle or rickshaw',
    popularForHi: 'कक्षा 5 से 8 के छात्र साइकिल अथवा ई-रिक्शा से आते हैं',
    mapsUrl: 'https://maps.google.com/?q=28.6139,76.9830',
  },
  {
    id: 'najafgarh-metro',
    nameEn: 'Najafgarh Metro / Nangloi Stand',
    nameHi: 'नजफगढ़ मेट्रो / नांगलोई स्टैंड',
    distance: '1.2 km',
    walkTimeEn: '15 mins walk',
    walkTimeHi: '15 मिनट पैदल',
    rickshawTimeEn: '6 – 8 mins via E-Rickshaw',
    rickshawTimeHi: '6 – 8 मिनट ई-रिक्शा द्वारा',
    routeHighlightEn: 'Grey Line Metro station proximity, direct e-rickshaw stand to Todarmal Colony.',
    routeHighlightHi: 'ग्रे लाइन मेट्रो स्टेशन से सीधी ई-रिक्शा कनेक्टिविटी।',
    popularForEn: 'Parents working in Delhi can drop kids easily after metro commute',
    popularForHi: 'मेट्रो से आने-जाने वाले अभिभावकों के लिए सुविधाजनक ड्रॉप-ऑफ',
    mapsUrl: 'https://maps.google.com/?q=28.6139,76.9830',
  },
];

export const LocalCommuteChecker: React.FC<LocalCommuteCheckerProps> = ({ lang }) => {
  const [activeLocalityId, setActiveLocalityId] = useState<string>('gupta-park');

  const activeLocality = LOCALITIES.find((l) => l.id === activeLocalityId) || LOCALITIES[0];

  const handleOpenMaps = () => {
    pushDataLayerEvent('lead_call_click', {
      action: 'open_google_maps',
      locality: activeLocality.nameEn,
    });
    window.open(
      'https://www.google.com/maps/search/?api=1&query=H.No.+49B,+Gupta+Park,+Todarmal+Colony,+Najafgarh,+New+Delhi+110043',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleScrollToBooking = () => {
    const el = document.getElementById('booking-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200/80">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24476B]/10 text-[#24476B] text-xs font-semibold uppercase tracking-wider mb-2">
            <Navigation className="w-3.5 h-3.5 text-[#24476B]" />
            {lang === 'en' ? 'Local Najafgarh Commute Guide' : 'नजफगढ़ स्थानीय आवागमन गाइड'}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#1B3552] tracking-tight">
            {lang === 'en' ? 'How Far Is Aarohan Academy From Your Home?' : 'आपके घर से आरोहण अकैडमी कितनी दूर है?'}
          </h3>
          <p className="text-sm md:text-base text-slate-600 mt-1">
            {lang === 'en'
              ? 'Located in peaceful, dust-free interior lanes of Gupta Park & Todarmal Colony, Najafgarh.'
              : 'गुप्ता पार्क व टोडरमल कॉलोनी की शांत, सुरक्षित आवासीय गलियों में स्थित।'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenMaps}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer self-start md:self-auto"
        >
          <MapPin className="w-4 h-4 text-[#FFC845]" />
          <span>{lang === 'en' ? 'Open in Google Maps' : 'गूगल मैप्स पर देखें'}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </button>
      </div>

      {/* Locality Selector Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {LOCALITIES.map((loc) => {
          const isActive = loc.id === activeLocalityId;
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => setActiveLocalityId(loc.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#1B3552] text-white border-[#1B3552] shadow-md scale-[1.02]'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-[#FFC845]' : 'text-slate-400'}`} />
              <span>{lang === 'en' ? loc.nameEn : loc.nameHi}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {loc.distance}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Locality Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-br from-slate-50 via-white to-amber-50/40 rounded-2xl p-6 border border-slate-200">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#1B3552]">
              {lang === 'en' ? activeLocality.nameEn : activeLocality.nameHi}
            </span>
            <span className="text-xs bg-[#29A383]/15 text-[#29A383] font-bold px-2.5 py-0.5 rounded-full">
              {activeLocality.distance} {lang === 'en' ? 'away' : 'दूरी'}
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            {lang === 'en' ? activeLocality.routeHighlightEn : activeLocality.routeHighlightHi}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <Footprints className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {lang === 'en' ? 'Walking Time' : 'पैदल समय'}
                </span>
                <span className="text-sm font-bold text-[#1B3552]">
                  {lang === 'en' ? activeLocality.walkTimeEn : activeLocality.walkTimeHi}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <Bus className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {lang === 'en' ? 'E-Rickshaw / Transit' : 'ई-रिक्शा / वाहन'}
                </span>
                <span className="text-sm font-bold text-[#1B3552]">
                  {lang === 'en' ? activeLocality.rickshawTimeEn : activeLocality.rickshawTimeHi}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 bg-white/80 px-3 py-2 rounded-xl border border-slate-100">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{lang === 'en' ? activeLocality.popularForEn : activeLocality.popularForHi}</span>
          </div>
        </div>

        {/* Right Safety & Visit Card (5 Cols) */}
        <div className="lg:col-span-5 bg-[#1B3552] text-white rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FFC845] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'en' ? 'Student Safety Protocols' : 'छात्र सुरक्षा व्यवस्था'}</span>
            </div>
            <h4 className="text-base font-bold text-white mb-3">
              {lang === 'en' ? 'Quiet & Safe Residential Street' : 'सुरक्षित एवं शांत आवासीय वातावरण'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-[#FFC845] font-bold">•</span>
                <span>{lang === 'en' ? 'Away from highway truck traffic & pollution' : 'मुख्य सड़क के शोर और प्रदूषण से दूर शांत वातावरण'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFC845] font-bold">•</span>
                <span>{lang === 'en' ? '24x7 CCTV cameras covering entrance and classrooms' : 'प्रवेश द्वार एवं कक्षाओं में 24x7 सीसीटीवी निगरानी'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFC845] font-bold">•</span>
                <span>{lang === 'en' ? 'Supervised handoff at dismissal time' : 'छुट्टी के समय सुरक्षित अभिभावक हैंडओवर'}</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleScrollToBooking}
              className="w-full bg-[#FFC845] hover:bg-[#f8b61e] text-[#1B3552] font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Book a Centre Visit' : 'सेंटर विजिट बुक करें'}</span>
            </button>
            <span className="text-[10px] text-slate-400 text-center">
              📍 H.No. 49B, Gupta Park, Najafgarh, New Delhi - 110043
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
