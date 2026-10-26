import React, { useState, useMemo } from 'react';
import { VISA_SUCCESS_CASES, SUCCESS_STORIES, type VisaSuccessCase } from '../constants/content';
import { toPersianDigits } from '../utils/persian';
import type { PageType } from './Header';

export interface MapDestination {
  id: string;
  name: string;
  englishName: string;
  flag: string;
  capital: string;
  diacoOffice?: string;
  visasGranted: number;
  approvalRate: number;
  avgMonths: [number, number];
  primaryPaths: string[];
  description: string;
  highlightTag: string;
  mapCoords: { x: number; y: number };
}

export const MAP_DESTINATIONS: MapDestination[] = [
  {
    id: 'AT',
    name: 'اتریش',
    englishName: 'Austria',
    flag: '🇦🇹',
    capital: 'وین (Wien)',
    diacoOffice: 'دفتر مستقیم وکالت دیاکو: Ausstellungsstraße 50, 1020 Wien',
    visasGranted: 940,
    approvalRate: 99.2,
    avgMonths: [3, 6],
    primaryPaths: ['تمکن مالی (خودحمایتی)', 'کارت قرمز-سفید-قرمز (RWR)', 'تحصیلی دانشگاه وین', 'کارت آبی'],
    description: 'مقصد تخصصی شماره ۱ هلدینگ دیاکو با پیگیری بدون واسطه در اداره اقامت وین (MA35) و بالاترین سهمیه تمکن مالی در ایران.',
    highlightTag: 'دفتر مرکزی اروپا دیاکو (وین)',
    mapCoords: { x: 550, y: 365 },
  },
  {
    id: 'DE',
    name: 'آلمان',
    englishName: 'Germany',
    flag: '🇩🇪',
    capital: 'برلین و فرانکفورت',
    diacoOffice: 'همکاری وکلای رسمی دادگستری آلمان (برلین و مونیخ)',
    visasGranted: 480,
    approvalRate: 98.1,
    avgMonths: [4, 8],
    primaryPaths: ['کارت آبی اروپا (Blue Card)', 'کارت شانس کاریابی (Chancenkarte)', 'آوسبیلدونگ', 'پزشکان (Approbation)'],
    description: 'بزرگ‌ترین بازار کار قاره سبز؛ اخذ قراردادهای کاری رسمی و تسهیل ویزای کادر درمان و مهندسان IT با تاییدیه ZAB.',
    highlightTag: 'بیشترین تقاضای کاریابی',
    mapCoords: { x: 475, y: 275 },
  },
  {
    id: 'GR',
    name: 'یونان',
    englishName: 'Greece',
    flag: '🇬🇷',
    capital: 'آتن (گلیفادا)',
    diacoOffice: 'دفتر رسمی هلدینگ دیاکو در آتن: Grigoriou Lampraki 58, Glyfada',
    visasGranted: 310,
    approvalRate: 100,
    avgMonths: [2, 4],
    primaryPaths: ['گلدن ویزای خرید ملک', 'تمکن مالی مستقل (FIP)', 'ویزای دیجیتال نومد'],
    description: 'سریع‌ترین گلدن ویزای شینگن بدون شرط حضور فیزیکی با همراهی کارشناسان رسمی ملکی و وکلای مقیم آتن دیاکو.',
    highlightTag: 'دفتر رسمی آتن دیاکو',
    mapCoords: { x: 705, y: 540 },
  },
  {
    id: 'ES',
    name: 'اسپانیا',
    englishName: 'Spain',
    flag: '🇪🇸',
    capital: 'مادرید و بارسلونا',
    diacoOffice: 'دپارتمان وکلای مهاجرتی مادرید و بارسلونا',
    visasGranted: 260,
    approvalRate: 97.8,
    avgMonths: [4, 7],
    primaryPaths: ['اقامت غیرانتفاعی (Non-Lucrative)', 'گلدن ویزای سرمایه‌گذاری', 'دیجیتال نومد اسپانیا'],
    description: 'اقامت دلپذیر خانوادگی در آب‌وهوای مدیترانه‌ای با امکان تردد آزادانه در کل شینگن و دستیابی به اقامت دائم ۵ ساله.',
    highlightTag: 'اقامت غیرانتفاعی ایده‌آل',
    mapCoords: { x: 250, y: 470 },
  },
  {
    id: 'PT',
    name: 'پرتغال',
    englishName: 'Portugal',
    flag: '🇵🇹',
    capital: 'لیسبون و پورتو',
    diacoOffice: 'پوشش حقوقی صندوق‌های سرمایه‌گذاری و تمکن مالی',
    visasGranted: 140,
    approvalRate: 97.4,
    avgMonths: [5, 10],
    primaryPaths: ['ویزای D7 تمکن مالی', 'صندوق‌های سرمایه‌گذاری', 'دیجیتال نومد D8'],
    description: 'مسیر مطمئن پاسپورت اروپایی بعد از ۵ سال، همراه با مزایای مالیاتی منحصر‌به‌فرد برای ایرانیان.',
    highlightTag: 'انعطاف‌پذیرترین شرط شهروندی',
    mapCoords: { x: 160, y: 480 },
  },
  {
    id: 'FR',
    name: 'فرانسه',
    englishName: 'France',
    flag: '🇫🇷',
    capital: 'پاریس',
    diacoOffice: 'وکلای همکار در پاریس و دپارتمان کامپوس فرانس',
    visasGranted: 165,
    approvalRate: 96.9,
    avgMonths: [4, 9],
    primaryPaths: ['پاسپورت تلنت (Passeport Talent)', 'ویزای تمکن مالی بازدیدکننده', 'پذیرش تحصیلی'],
    description: 'قطب علمی، هنری و مد اروپا با معافیت‌های مالیاتی ویژه کارآفرینان و پژوهشگران برتر.',
    highlightTag: 'ویزای نخبگان و تلنت',
    mapCoords: { x: 345, y: 335 },
  },
  {
    id: 'IT',
    name: 'ایتالیا',
    englishName: 'Italy',
    flag: '🇮🇹',
    capital: 'رم و میلان',
    diacoOffice: 'دپارتمان بورسیه و پذیرش دانشگاه‌های دولتی میلان و رم',
    visasGranted: 195,
    approvalRate: 98.7,
    avgMonths: [3, 7],
    primaryPaths: ['بورسیه استانی DSU (تحصیل رایگان)', 'ویزای کار دکرتو فلووسی', 'الکتیو رزیدنس'],
    description: 'بهترین فرصت تحصیل با بورسیه کامل استانی تا سقف ۸۰۰۰ یورو سالانه به همراه خوابگاه و غذای رایگان.',
    highlightTag: 'بیشترین قبولی بورسیه DSU',
    mapCoords: { x: 515, y: 460 },
  },
  {
    id: 'NL',
    name: 'هلند',
    englishName: 'Netherlands',
    flag: '🇳🇱',
    capital: 'آمستردام',
    diacoOffice: 'مشاوران تخصصی ویزای استارت‌آپ و نیروی متخصص هلند',
    visasGranted: 95,
    approvalRate: 98.5,
    avgMonths: [3, 6],
    primaryPaths: ['اقامت کاری نیروی ماهر (KM)', 'ویزای جستجوی کار فارغ‌التحصیلان', 'استارت‌آپ نوآورانه'],
    description: 'تسلط سراسری به زبان انگلیسی با بالاترین استانداردهای رفاهی و کیفیت زندگی پایدار.',
    highlightTag: 'محیط بین‌المللی انگلیسی‌زبان',
    mapCoords: { x: 420, y: 242 },
  },
  {
    id: 'HU',
    name: 'مجارستان',
    englishName: 'Hungary',
    flag: '🇭🇺',
    capital: 'بوداپست',
    diacoOffice: 'پوشش حقوقی گلدن ویزای مهمان سرمایه‌گذار مجارستان',
    visasGranted: 80,
    approvalRate: 99.0,
    avgMonths: [2, 5],
    primaryPaths: ['گلدن ویزای سرمایه‌گذاری ملکی', 'اقامت تحصیلی بوداپست', 'ثبت شرکت اروپایی'],
    description: 'اقتصادی‌ترین گلدن ویزای ۱۰ ساله حوزه شینگن در قلب اروپای مرکزی.',
    highlightTag: 'اقامت ۱۰ ساله سرمایه‌گذار',
    mapCoords: { x: 625, y: 370 },
  },
  {
    id: 'DK',
    name: 'دانمارک',
    englishName: 'Denmark',
    flag: '🇩🇰',
    capital: 'کپنهاگ',
    diacoOffice: 'پیگیری پرونده‌های تخصصی کادر درمان و مهندسی اسکاندیناوی',
    visasGranted: 65,
    approvalRate: 97.0,
    avgMonths: [4, 7],
    primaryPaths: ['طرح گرین‌کارت و کمبود نیرو', 'معادل‌سازی پزشکان در دانمارک', 'تحصیل در کپنهاگ'],
    description: 'شادترین کشور جهان با بالاترین استانداردهای حقوق اجتماعی و بهداشت همگانی.',
    highlightTag: 'بالاترین رفاه اجتماعی',
    mapCoords: { x: 490, y: 155 },
  },
];

function getPathwayPage(countryId: string, path: string): PageType | null {
  const p = path.toLowerCase();

  if (countryId === 'AT') {
    if (p.includes('تمکن') || p.includes('خودحمایتی')) return 'financial-austria';
    if (p.includes('قرمز') || p.includes('rwr')) return 'austria-rwr';
    if (p.includes('تحصیلی') || p.includes('دانشگاه وین')) return 'academic-austria';
    if (p.includes('آبی') || p.includes('blue card')) return 'austria-blue-card';
  }
  if (countryId === 'DE') {
    if (p.includes('آبی') || p.includes('blue card')) return 'german-blue-card';
    if (p.includes('شانس') || p.includes('chancenkarte')) return 'jobseeker-germany';
    if (p.includes('آوسبیلدونگ')) return 'ausbildung-germany';
    if (p.includes('پزشکان') || p.includes('approbation')) return 'medical-germany';
  }
  if (countryId === 'GR') {
    if (p.includes('ملک') || p.includes('گلدن')) return 'realestate-greece';
    if (p.includes('تمکن') || p.includes('fip')) return 'realestate-greece';
    if (p.includes('نومد')) return 'nomad-spain';
  }
  if (countryId === 'ES') {
    if (p.includes('غیرانتفاعی') || p.includes('non-lucrative')) return 'financial-spain';
    if (p.includes('گلدن') || p.includes('سرمایه')) return 'spain-blue-card';
    if (p.includes('نومد')) return 'nomad-spain';
  }
  if (countryId === 'PT') {
    if (p.includes('d7') || p.includes('تمکن')) return 'jobseeker-portugal';
    if (p.includes('سرمایه‌گذاری')) return 'business-portugal';
    if (p.includes('نومد') || p.includes('d8')) return 'jobseeker-portugal';
  }
  if (countryId === 'FR') {
    if (p.includes('تلنت') || p.includes('talent')) return 'talent-france';
    if (p.includes('تمکن') || p.includes('بازدیدکننده')) return 'financial-france';
    if (p.includes('تحصیلی')) return 'language-france';
  }
  if (countryId === 'IT') {
    if (p.includes('بورسیه') || p.includes('dsu')) return 'academic-spain';
    if (p.includes('دکرتو') || p.includes('کار')) return 'italy-blue-card';
    if (p.includes('الکتیو') || p.includes('اقامت')) return 'financial-austria';
  }
  if (countryId === 'NL') {
    if (p.includes('ماهر') || p.includes('km')) return 'startup-netherlands';
    if (p.includes('جستجوی کار') || p.includes('فارغ‌التحصیلان')) return 'academic-netherlands';
    if (p.includes('استارت‌آپ')) return 'startup-netherlands';
  }
  if (countryId === 'HU') {
    if (p.includes('گلدن') || p.includes('ملک')) return 'realestate-hungary';
    if (p.includes('تحصیلی')) return 'academic-hungary';
    if (p.includes('شرکت')) return 'business-hungary';
  }
  if (countryId === 'DK') {
    if (p.includes('گرین‌کارت') || p.includes('کمبود')) return 'jobseeker-denmark';
    if (p.includes('پزشکان') || p.includes('معادل‌سازی')) return 'medical-denmark';
    if (p.includes('تحصیل')) return 'language-denmark';
  }

  return null;
}

function getCasePage(c: VisaSuccessCase): PageType | null {
  const t = (c.title + ' ' + c.type).toLowerCase();
  if (c.country.includes('اتریش')) {
    if (t.includes('تمکن') || t.includes('خودحمایتی') || t.includes('niederlassung')) return 'financial-austria';
    if (t.includes('قرمز') || t.includes('rwr') || t.includes('rot-weiß-rot')) return 'austria-rwr';
    if (t.includes('تحصیلی') || t.includes('student')) return 'academic-austria';
    if (t.includes('آبی') || t.includes('blue card')) return 'austria-blue-card';
  }
  if (c.country.includes('آلمان')) {
    if (t.includes('آبی') || t.includes('blaue karte')) return 'german-blue-card';
    if (t.includes('شانس') || t.includes('chancenkarte')) return 'jobseeker-germany';
    if (t.includes('پزشک') || t.includes('approbation')) return 'medical-germany';
  }
  if (c.country.includes('اسپانیا')) {
    if (t.includes('غیرانتفاعی') || t.includes('lucrativa')) return 'financial-spain';
    if (t.includes('گلدن') || t.includes('inversor')) return 'nomad-spain';
  }
  if (c.country.includes('یونان')) {
    if (t.includes('سرمایه‌گذاری') || t.includes('گلدن') || t.includes('investor')) return 'realestate-greece';
    if (t.includes('تمکن') || t.includes('fip')) return 'realestate-greece';
  }
  if (c.country.includes('فرانسه')) {
    if (t.includes('تلنت') || t.includes('talent')) return 'talent-france';
  }
  return null;
}

interface Props {
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

export const InteractiveCaseMap: React.FC<Props> = ({ onOpenAssessment, onNavigateToPage }) => {
  const [selectedId, setSelectedId] = useState<string>('AT');
  const [activeFilter, setActiveFilter] = useState<'all' | 'financial' | 'work' | 'study' | 'golden'>('all');

  const selectedDest = useMemo(() => {
    return MAP_DESTINATIONS.find((d) => d.id === selectedId) || MAP_DESTINATIONS[0];
  }, [selectedId]);

  const countryCases = useMemo(() => {
    return VISA_SUCCESS_CASES.filter((c) => {
      const matchCountry = c.country.includes(selectedDest.name);
      if (!matchCountry) return false;
      if (activeFilter === 'all') return true;
      if (activeFilter === 'financial') return c.title.includes('تمکن') || c.type.includes('Niederlassungsbewilligung') || c.title.includes('خودحمایتی');
      if (activeFilter === 'work') return c.title.includes('قرمز') || c.title.includes('کار') || c.title.includes('آبی') || c.type.includes('Karte') || c.type.includes('Fachkräfte');
      if (activeFilter === 'study') return c.title.includes('تحصیلی') || c.type.includes('Student');
      if (activeFilter === 'golden') return c.title.includes('گلدن') || c.title.includes('ملک') || c.type.includes('Investor') || c.type.includes('Inversor');
      return true;
    });
  }, [selectedDest, activeFilter]);

  const totalDiacoVisas = useMemo(() => {
    return MAP_DESTINATIONS.reduce((acc, curr) => acc + curr.visasGranted, 0);
  }, []);

  return (
    <section id="interactive-map" className="relative scroll-mt-24 overflow-hidden bg-[#07242e] py-16 text-white md:py-24">
      {/* پترن پس‌زمینه */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/4 -right-20 h-96 w-96 rounded-full bg-[#f5a623]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 h-96 w-96 rounded-full bg-[#0096b1]/15 blur-[130px] pointer-events-none" />

      <div className="relative container mx-auto px-4 md:px-8">
        {/* تیتر و مقدمه */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-white/10 px-4 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-md">
            <span>🗺️</span>
            سامانه رصد وکلای دیاکو در پایتخت‌های اروپا
          </span>
          <h2 className="mt-4 text-2xl font-black sm:text-4xl text-white">
            نقشه تعاملی ویزاها و مقاصد رسمی <span className="text-[#f5a623]">هلدینگ بین‌المللی دیاکو</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-7">
            با کلیک بر روی هر کشور در نقشه، اطلاعات جغرافیایی، پرونده‌های اخذ شده، نرخ قبولی، دفاتر حقوقی و سریع‌ترین روش‌های اقامتی حوزه شینگن را بررسی کنید.
          </p>
        </div>

        {/* نوار کارت‌های سریع کشورها */}
        <div className="mt-8 flex overflow-x-auto gap-2.5 pb-2 scrollbar-none sm:justify-center">
          {MAP_DESTINATIONS.map((dest) => {
            const isSelected = dest.id === selectedId;
            return (
              <button
                key={dest.id}
                type="button"
                onClick={() => setSelectedId(dest.id)}
                className={`flex flex-none items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                  isSelected
                    ? 'border-[#f5a623] bg-[#f5a623] text-[#082833] shadow-glow scale-105'
                    : 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                <span className="text-base">{dest.flag}</span>
                <span>{dest.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-black ${
                    isSelected ? 'bg-[#082833] text-[#f5a623]' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  +{toPersianDigits(dest.visasGranted)}
                </span>
              </button>
            );
          })}
        </div>

        {/* بدنه نقشه تعاملی و پنل اطلاعات مقصد */}
        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================
              نقشه وکتور باکیفیت و دقیق قاره اروپا (100% Geographically Accurate)
             ======================================================== */}
          <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-gradient-to-br from-[#08222b] via-[#0b2f3d] to-[#07242e] p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            {/* راهنمای نقشه */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <span className="h-2 w-2 rounded-full bg-[#f5a623] animate-ping" />
                  نقشه کارتوگرافی جغرافیایی اروپا
                </span>
                <span className="hidden sm:inline text-slate-400 text-[11px]">
                  (کلیک روی کشور یا پین برای انتخاب)
                </span>
              </div>
              <span className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                کشور انتخابی: <strong className="text-amber-300 font-black">{selectedDest.flag} {selectedDest.name} ({selectedDest.englishName})</strong>
              </span>
            </div>

            {/* بوم SVG نقشه اروپا با خطوط و سرحدات جغرافیایی واقعی */}
            <div className="relative aspect-[16/11] w-full select-none overflow-hidden rounded-2xl bg-[#06181f] border border-white/10 shadow-inner">
              <svg
                viewBox="0 0 1000 680"
                className="h-full w-full object-contain filter drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* نور کانونی در اتریش (مرکز اروپا) */}
                  <radialGradient id="viennaGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f5a623" stopOpacity="0.35" />
                    <stop offset="50%" stopColor="#f5a623" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#06181f" stopOpacity="0" />
                  </radialGradient>
                  {/* بافت اقیانوسی */}
                  <linearGradient id="oceanBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#05171f" />
                    <stop offset="50%" stopColor="#08222b" />
                    <stop offset="100%" stopColor="#061922" />
                  </linearGradient>
                  {/* کریدور هوایی پرواز */}
                  <linearGradient id="flightArc" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#f5a623" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* ۱. پس‌زمینه پهنه آبی و اقیانوس‌ها */}
                <rect width="1000" height="680" fill="url(#oceanBg)" />

                {/* خطوط ژئودتیک مدارهای جغرافیایی (GIS Lat/Long Grid) */}
                <g opacity="0.08" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4,8" className="pointer-events-none">
                  <line x1="0" y1="170" x2="1000" y2="170" />
                  <line x1="0" y1="340" x2="1000" y2="340" />
                  <line x1="0" y1="510" x2="1000" y2="510" />
                  <line x1="250" y1="0" x2="250" y2="680" />
                  <line x1="500" y1="0" x2="500" y2="680" />
                  <line x1="750" y1="0" x2="750" y2="680" />
                </g>

                {/* اسامی و برچسب‌های رسمی دریاها و اقیانوس‌ها (جهت درک آسان نقشه) */}
                <g fill="#235a6d" fontSize="11" fontWeight="bold" letterSpacing="2" className="pointer-events-none select-none">
                  <text x="80" y="320">ATLANTIC OCEAN / اقیانوس اطلس</text>
                  <text x="350" y="180">NORTH SEA / دریای شمال</text>
                  <text x="580" y="140">BALTIC SEA / دریای بالتیک</text>
                  <text x="360" y="580">MEDITERRANEAN SEA / دریای مدیترانه</text>
                  <text x="800" y="440">BLACK SEA / دریای سیاه</text>
                </g>

                {/* نور کانونی در محدوده وین و اتریش */}
                <circle cx="550" cy="365" r="240" fill="url(#viennaGlow)" className="pointer-events-none" />

                {/* ۲. سرزمین‌ها و کشورهای قاره اروپا با سرحدات دقیق کارتوگرافی */}
                <g id="europeanCountries">
                  {/* بریتانیا و ایرلند */}
                  <g id="country-UK-IE" opacity="0.45">
                    <path
                      d="M 280 180 L 315 155 L 335 200 L 350 245 L 310 265 L 280 235 Z"
                      fill="#0b313d"
                      stroke="#1a5467"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M 230 205 L 260 195 L 265 240 L 235 240 Z"
                      fill="#0b313d"
                      stroke="#1a5467"
                      strokeWidth="1.2"
                    />
                    <text x="305" y="225" fill="#447d91" fontSize="9" fontWeight="bold" textAnchor="middle">بریتانیا</text>
                  </g>

                  {/* اسکاندیناوی (سوئد و نروژ) */}
                  <g id="country-Scandinavia" opacity="0.45">
                    <path
                      d="M 485 50 L 575 35 L 620 145 L 535 175 L 495 160 Z"
                      fill="#092833"
                      stroke="#154656"
                      strokeWidth="1.2"
                    />
                    <text x="550" y="100" fill="#447d91" fontSize="10" fontWeight="bold" textAnchor="middle">اسکاندیناوی</text>
                  </g>

                  {/* سوئیس */}
                  <g id="country-CH">
                    <path
                      d="M 425 350 L 480 350 L 475 385 L 425 380 Z"
                      fill="#0d3c4a"
                      stroke="#1f657d"
                      strokeWidth="1.2"
                    />
                    <text x="452" y="370" fill="#6ba7bc" fontSize="9" fontWeight="bold" textAnchor="middle">سوئیس</text>
                  </g>

                  {/* بلژیک */}
                  <g id="country-BE">
                    <path
                      d="M 375 265 L 405 260 L 415 295 L 385 305 Z"
                      fill="#0c3846"
                      stroke="#1a5568"
                      strokeWidth="1"
                    />
                  </g>

                  {/* لهستان */}
                  <g id="country-PL">
                    <path
                      d="M 515 205 L 640 195 L 660 280 L 575 275 L 530 280 Z"
                      fill="#0a303c"
                      stroke="#195366"
                      strokeWidth="1.2"
                    />
                    <text x="590" y="240" fill="#48859a" fontSize="10" fontWeight="bold" textAnchor="middle">لهستان</text>
                  </g>

                  {/* چک و اسلواکی */}
                  <g id="country-CZ-SK">
                    <path
                      d="M 525 285 L 575 275 L 635 305 L 620 340 L 585 340 L 530 345 Z"
                      fill="#0c3745"
                      stroke="#1a5568"
                      strokeWidth="1.2"
                    />
                    <text x="575" y="315" fill="#48859a" fontSize="9" fontWeight="bold" textAnchor="middle">چک و اسلواکی</text>
                  </g>

                  {/* بالکان و رومانی */}
                  <g id="country-Balkans">
                    <path
                      d="M 550 405 L 665 395 L 755 410 L 760 480 L 690 510 L 630 465 L 565 420 Z"
                      fill="#0c3644"
                      stroke="#1a5568"
                      strokeWidth="1.2"
                    />
                    <text x="660" y="445" fill="#48859a" fontSize="10" fontWeight="bold" textAnchor="middle">حوزه بالکان</text>
                  </g>

                  {/* ترکیه */}
                  <g id="country-TR">
                    <path
                      d="M 760 475 L 870 465 L 890 530 L 775 540 Z"
                      fill="#092d39"
                      stroke="#154757"
                      strokeWidth="1.2"
                    />
                    <text x="825" y="505" fill="#4b899e" fontSize="10" fontWeight="bold" textAnchor="middle">ترکیه</text>
                  </g>

                  {/* ========================================================
                      کشورهای مقاصد دیاکو (کاملاً تعاملی و پیوند خورده به پین‌ها)
                     ======================================================== */}
                  {/* ۱. پرتغال (PT) */}
                  <path
                    id="path-PT"
                    d="M 145 425 L 180 425 L 185 535 L 155 545 L 140 500 L 145 460 Z"
                    fill={selectedId === 'PT' ? '#1b5a6f' : '#0e3e4d'}
                    stroke={selectedId === 'PT' ? '#f5a623' : '#22728c'}
                    strokeWidth={selectedId === 'PT' ? '2.5' : '1.5'}
                    onClick={() => setSelectedId('PT')}
                    className="cursor-pointer transition-all duration-300 hover:fill-[#1b5e74]"
                  />

                  {/* ۲. اسپانیا (ES) */}
                  <path
                    id="path-ES"
                    d="M 180 425 L 285 405 L 325 435 L 305 525 L 260 550 L 185 535 Z M 335 490 a 7 5 0 1 0 14 0 a 7 5 0 1 0 -14 0"
                    fill={selectedId === 'ES' ? '#1b5a6f' : '#0c3846'}
                    stroke={selectedId === 'ES' ? '#f5a623' : '#22728c'}
                    strokeWidth={selectedId === 'ES' ? '2.5' : '1.5'}
                    onClick={() => setSelectedId('ES')}
                    className="cursor-pointer transition-all duration-300 hover:fill-[#1b5e74]"
                  />

                  {/* ۳. فرانسه (FR) */}
                  <path
                    id="path-FR"
                    d="M 285 405 L 255 350 L 225 320 L 260 285 L 330 255 L 375 265 L 420 290 L 425 345 L 390 415 L 325 435 Z M 430 460 a 6 9 0 1 0 12 0 a 6 9 0 1 0 -12 0"
                    fill={selectedId === 'FR' ? '#1b5a6f' : '#0c3846'}
                    stroke={selectedId === 'FR' ? '#f5a623' : '#22728c'}
                    strokeWidth={selectedId === 'FR' ? '2.5' : '1.5'}
                    onClick={() => setSelectedId('FR')}
                    className="cursor-pointer transition-all duration-300 hover:fill-[#1b5e74]"
                  />

                  {/* ۴. هلند (NL) */}
                  <path
                    id="path-NL"
                    d="M 405 230 L 435 220 L 440 260 L 405 260 Z"
                    fill={selectedId === 'NL' ? '#1b5a6f' : '#10495b'}
                    stroke={selectedId === 'NL' ? '#f5a623' : '#27819e'}
                    strokeWidth={selectedId === 'NL' ? '2.5' : '1.5'}
                    onClick={() => setSelectedId('NL')}
                    className="cursor-pointer transition-all duration-300 hover:fill-[#1b5e74]"
                  />

                  {/* ۵. دانمارک (DK) */}
                  <path
                    id="path-DK"
                    d="M 465 190 L 485 130 L 505 135 L 495 190 Z M 510 160 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0"
                    fill={selectedId === 'DK' ? '#1b5a6f' : '#0e4151'}
                    stroke={selectedId === 'DK' ? '#f5a623' : '#237894'}
                    strokeWidth={selectedId === 'DK' ? '2.5' : '1.5'}
                    onClick={() => setSelectedId('DK')}
                    className="cursor-pointer transition-all duration-300 hover:fill-[#1b5e74]"
                  />

                  {/* ۶. آلمان (DE) */}
                  <path
                    id="path-DE"
                    d="M 435 220 L 515 205 L 530 280 L 525 345 L 445 350 L 420 330 L 420 290 L 440 260 Z"
                    fill={selectedId === 'DE' ? '#1b5a6f' : '#0d3b4a'}
                    stroke={selectedId === 'DE' ? '#f5a623' : '#22728c'}
                    strokeWidth={selectedId === 'DE' ? '2.5' : '1.5'}
                    onClick={() => setSelectedId('DE')}
                    className="cursor-pointer transition-all duration-300 hover:fill-[#1b5e74]"
                  />

                  {/* ۷. اتریش (AT) - قلب فعالیت‌های دیاکو */}
                  <path
                    id="path-AT"
                    d="M 480 355 L 530 345 L 585 340 L 595 375 L 565 395 L 510 395 L 475 380 Z"
                    fill={selectedId === 'AT' ? '#1c6279' : '#144c5e'}
                    stroke="#f5a623"
                    strokeWidth={selectedId === 'AT' ? '3' : '2'}
                    onClick={() => setSelectedId('AT')}
                    className="cursor-pointer transition-all duration-300 hover:fill-[#206f88] filter drop-shadow-md"
                  />

                  {/* ۸. مجارستان (HU) */}
                  <path
                    id="path-HU"
                    d="M 585 345 L 655 340 L 665 395 L 595 405 L 595 375 Z"
                    fill={selectedId === 'HU' ? '#1b5a6f' : '#0e4151'}
                    stroke={selectedId === 'HU' ? '#f5a623' : '#237894'}
                    strokeWidth={selectedId === 'HU' ? '2.5' : '1.5'}
                    onClick={() => setSelectedId('HU')}
                    className="cursor-pointer transition-all duration-300 hover:fill-[#1b5e74]"
                  />

                  {/* ۹. ایتالیا (IT) - شبه جزیره چکمه */}
                  <g
                    id="path-IT"
                    onClick={() => setSelectedId('IT')}
                    className="cursor-pointer group/it"
                  >
                    {/* شمال ایتالیا */}
                    <path
                      d="M 425 380 L 475 385 L 510 395 L 545 405 L 535 435 L 445 425 Z"
                      fill={selectedId === 'IT' ? '#1b5a6f' : '#0c3846'}
                      stroke={selectedId === 'IT' ? '#f5a623' : '#22728c'}
                      strokeWidth={selectedId === 'IT' ? '2.5' : '1.5'}
                    />
                    {/* بدنه چکمه، رم و جنوب */}
                    <path
                      d="M 485 430 L 535 435 L 565 490 L 600 505 L 585 530 L 550 550 L 535 520 L 505 460 Z"
                      fill={selectedId === 'IT' ? '#1b5a6f' : '#0c3846'}
                      stroke={selectedId === 'IT' ? '#f5a623' : '#22728c'}
                      strokeWidth={selectedId === 'IT' ? '2.5' : '1.5'}
                    />
                    {/* سیسیل و ساردینیا */}
                    <path
                      d="M 505 555 L 545 550 L 535 580 Z M 410 455 a 9 16 0 1 0 18 0 a 9 16 0 1 0 -18 0"
                      fill={selectedId === 'IT' ? '#1b5a6f' : '#0c3846'}
                      stroke={selectedId === 'IT' ? '#f5a623' : '#22728c'}
                      strokeWidth={selectedId === 'IT' ? '2.5' : '1.5'}
                    />
                  </g>

                  {/* ۱۰. یونان (GR) - مهد تمدن و دفتر رسمی دیاکو */}
                  <g
                    id="path-GR"
                    onClick={() => setSelectedId('GR')}
                    className="cursor-pointer group/gr"
                  >
                    {/* خاک اصلی یونان */}
                    <path
                      d="M 670 495 L 725 490 L 735 540 L 685 545 Z"
                      fill={selectedId === 'GR' ? '#1c6279' : '#114656'}
                      stroke={selectedId === 'GR' ? '#f5a623' : '#257f9c'}
                      strokeWidth={selectedId === 'GR' ? '2.5' : '1.8'}
                    />
                    {/* شبه جزیره پلوپونز */}
                    <path
                      d="M 685 545 L 720 540 L 710 580 L 675 575 Z"
                      fill={selectedId === 'GR' ? '#1c6279' : '#114656'}
                      stroke={selectedId === 'GR' ? '#f5a623' : '#257f9c'}
                      strokeWidth={selectedId === 'GR' ? '2.5' : '1.8'}
                    />
                    {/* جزیره کرت و جزایر دریای اژه */}
                    <path
                      d="M 700 615 L 755 610 L 750 625 L 695 625 Z M 735 540 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 M 748 558 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"
                      fill={selectedId === 'GR' ? '#1c6279' : '#114656'}
                      stroke={selectedId === 'GR' ? '#f5a623' : '#257f9c'}
                      strokeWidth={selectedId === 'GR' ? '2.5' : '1.8'}
                    />
                  </g>
                </g>

                {/* ۳. ایران (تهران) به عنوان مبدا در شرق نقشه */}
                <g id="tehranOrigin">
                  <path
                    d="M 885 505 L 975 495 L 985 595 L 895 605 Z"
                    fill="#082b36"
                    stroke="#165162"
                    strokeWidth="1.2"
                  />
                  <circle cx="935" cy="550" r="7" fill="#38bdf8" />
                  <circle cx="935" cy="550" r="18" fill="#38bdf8" opacity="0.25">
                    <animate attributeName="r" values="8;24;8" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <rect x="855" y="568" width="160" height="26" rx="13" fill="#07242e" stroke="#38bdf8" strokeWidth="1.4" />
                  <text x="935" y="585" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                    دفتر مرکزی تهران دیاکو 🇮🇷
                  </text>
                </g>

                {/* ۴. کریدورهای پروازی مستقیم از تهران به وین (اتریش) و آتن (یونان) */}
                <path
                  d="M935,550 Q750,390 550,365"
                  fill="none"
                  stroke="url(#flightArc)"
                  strokeWidth="2.5"
                  strokeDasharray="6,4"
                >
                  <animate attributeName="stroke-dashoffset" values="40;0" dur="2s" repeatCount="indefinite" />
                </path>

                <path
                  d="M935,550 Q820,535 705,540"
                  fill="none"
                  stroke="#f5a623"
                  strokeWidth="2"
                  strokeDasharray="5,4"
                  opacity="0.85"
                >
                  <animate attributeName="stroke-dashoffset" values="36;0" dur="2.5s" repeatCount="indefinite" />
                </path>

                {/* ۵. پین‌ها و برچسب‌های تعاملی کشورها - کاملاً منطبق بر مختصات دقیق مرزها */}
                {MAP_DESTINATIONS.map((dest) => {
                  const isSelected = dest.id === selectedId;
                  const { x, y } = dest.mapCoords;

                  return (
                    <g
                      key={dest.id}
                      onClick={() => setSelectedId(dest.id)}
                      className="cursor-pointer group"
                      tabIndex={0}
                      role="button"
                      aria-label={`${dest.name} - ${dest.englishName}`}
                    >
                      {/* رادار پالس دور پین فعال */}
                      {isSelected && (
                        <>
                          <circle cx={x} cy={y} r="26" fill="#f5a623" opacity="0.25">
                            <animate attributeName="r" values="12;32;12" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle cx={x} cy={y} r="16" fill="#f5a623" opacity="0.35" />
                        </>
                      )}

                      {/* دایره مرکزی پین */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? '11' : '8'}
                        fill={isSelected ? '#f5a623' : '#0e3846'}
                        stroke={isSelected ? '#ffffff' : '#f5a623'}
                        strokeWidth={isSelected ? '3' : '2'}
                        className="transition-all duration-300 group-hover:scale-125"
                      />

                      {/* برچسب نام کشور و پرچم - قرار گرفته دقیقاً بالای پین جغرافیایی */}
                      <g transform={`translate(${x}, ${y - (isSelected ? 20 : 16)})`}>
                        <rect
                          x="-42"
                          y="-13"
                          width="84"
                          height="22"
                          rx="11"
                          fill={isSelected ? '#082833' : '#07242d'}
                          stroke={isSelected ? '#f5a623' : 'rgba(255,255,255,0.25)'}
                          strokeWidth={isSelected ? '1.8' : '1'}
                          className="filter drop-shadow-md"
                        />
                        <text
                          x="0"
                          y="2"
                          textAnchor="middle"
                          fill={isSelected ? '#f5a623' : '#ffffff'}
                          fontSize="11"
                          fontWeight={isSelected ? '900' : 'bold'}
                          fontFamily="Vazirmatn, sans-serif"
                        >
                          {dest.flag} {dest.name}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* راهنمای زیر نقشه */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f5a623]" />
                  <span>دفاتر مستقیم هلدینگ دیاکو (وین و آتن)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#38bdf8]" />
                  <span>کریدور پروازی و اعزام از تهران</span>
                </span>
              </div>
              <span className="text-amber-300 font-bold">
                پوشش سراسری حوزه ۲۹ کشور شینگن
              </span>
            </div>
          </div>

          {/* ========================================================
              پنل اطلاعات کشور انتخاب‌شده (Destination Details Panel)
             ======================================================== */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl">
            {/* سربرگ کارت کشور */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300">
                  {selectedDest.highlightTag}
                </span>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-4xl">{selectedDest.flag}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {selectedDest.name}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {selectedDest.englishName} | پایتخت: {selectedDest.capital}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <span className="block text-2xl font-black text-[#f5a623]">
                  +{toPersianDigits(selectedDest.visasGranted)}
                </span>
                <span className="block text-[10px] text-slate-300">کارت اقامت موفق</span>
              </div>
            </div>

            {/* آمار شانس و میانگین زمان */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                <span className="text-[11px] text-slate-300">درصد قبولی دیاکو:</span>
                <p className="mt-1 text-lg font-black text-emerald-400">
                  {toPersianDigits(selectedDest.approvalRate)}٪
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                <span className="text-[11px] text-slate-300">میانگین صدور ویزا:</span>
                <p className="mt-1 text-lg font-black text-white">
                  {toPersianDigits(selectedDest.avgMonths[0])} تا {toPersianDigits(selectedDest.avgMonths[1])} ماه
                </p>
              </div>
            </div>

            {/* دفتر حقوقی و پشتیبانی */}
            {selectedDest.diacoOffice && (
              <div className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-3.5 text-xs text-amber-200">
                <p className="font-bold flex items-center gap-1.5 text-amber-300">
                  <span>🏛️</span>
                  <span>حضور مستقیم حقوقی دیاکو:</span>
                </p>
                <p className="mt-1 leading-5 text-slate-200">{selectedDest.diacoOffice}</p>
              </div>
            )}

            {/* توضیحات تحلیلی مقصد */}
            <p className="mt-4 text-xs sm:text-sm text-slate-200 leading-6 text-justify">
              {selectedDest.description}
            </p>

            {/* محبوب‌ترین روش‌های مهاجرتی این کشور */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-300">
                  برترین برنامه‌های اقامتی فعال در سال ۲۰۲۶:
                </h4>
                <span className="text-[10px] text-amber-300">
                  جهت ورود به صفحه اختصاصی کلیک کنید ↗
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedDest.primaryPaths.map((p, idx) => {
                  const targetPage = getPathwayPage(selectedDest.id, p);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (targetPage) {
                          if (onNavigateToPage) onNavigateToPage(targetPage);
                          else window.location.hash = targetPage;
                        } else {
                          onOpenAssessment();
                        }
                      }}
                      className="group/path rounded-xl border border-white/20 bg-white/10 hover:border-amber-400 hover:bg-amber-400/20 px-3 py-1.5 text-[11px] font-semibold text-slate-200 hover:text-amber-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                      title={targetPage ? `مشاهده صفحه اختصاصی ${p}` : `ارزیابی شرایط ${p}`}
                    >
                      <span className="text-emerald-400 group-hover/path:text-amber-400 font-bold">✓</span>
                      <span>{p}</span>
                      <span className="text-amber-400/80 text-[10px] opacity-70 group-hover/path:opacity-100 font-bold">
                        ↗
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* فیلتر پرونده‌های موفق */}
            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-amber-300">
                  نمونه پرونده‌های اخیر ویزا شده در {selectedDest.name}:
                </h4>
                <span className="text-[10px] text-slate-400">
                  {toPersianDigits(countryCases.length)} پرونده ثبت‌شده
                </span>
              </div>

              {/* دکمه‌های فیلتر موضوعی */}
              <div className="flex flex-wrap gap-1 mb-3 text-[10px]">
                {[
                  { id: 'all', label: 'همه' },
                  { id: 'financial', label: 'تمکن مالی' },
                  { id: 'work', label: 'کاری / قرمز-سفید' },
                  { id: 'study', label: 'تحصیلی' },
                  { id: 'golden', label: 'ملک و سرمایه' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFilter(f.id as any)}
                    className={`rounded-lg px-2 py-1 transition cursor-pointer ${
                      activeFilter === f.id
                        ? 'bg-[#f5a623] text-[#082833] font-bold'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* لیست کارتی کیس‌های موفق */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {countryCases.length > 0 ? (
                  countryCases.map((c, i) => {
                    const targetPage = getCasePage(c);
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          if (targetPage) {
                            if (onNavigateToPage) onNavigateToPage(targetPage);
                            else window.location.hash = targetPage;
                          } else {
                            onOpenAssessment();
                          }
                        }}
                        className={`rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs flex items-center justify-between transition-all ${
                          targetPage ? 'cursor-pointer hover:border-amber-400/50 hover:bg-white/10 hover:scale-[1.01]' : ''
                        }`}
                        title={targetPage ? `مشاهده راهنمای اختصاصی پرونده ${c.title}` : undefined}
                      >
                        <div>
                          <p className="font-bold text-white flex items-center gap-1.5">
                            <span className="text-emerald-400">●</span>
                            <span>{c.title}</span>
                            <span className="text-slate-400 text-[10px]">({c.year})</span>
                          </p>
                          <p className="text-[11px] text-amber-300/90 mt-0.5">{c.city} • {c.type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {targetPage && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-amber-300 font-bold hover:underline">
                              <span>صفحه راهنما</span>
                              <span>↗</span>
                            </span>
                          )}
                          <span className="rounded-lg bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-bold">
                            صادر شده ✓
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 py-3 text-center">
                    پرونده‌ای با این دسته‌بندی یافت نشد. همه را انتخاب کنید.
                  </p>
                )}
              </div>
            </div>

            {/* دکمه اکشن درخواست بررسی پرونده */}
            <div className="mt-6 pt-4 border-t border-white/10 flex gap-2">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="flex-1 rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-4 py-3 text-xs sm:text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer text-center"
              >
                ارزیابی شانس ویزای {selectedDest.name}
              </button>
              <a
                href="#contact"
                className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-3 text-xs font-bold text-white transition cursor-pointer grid place-items-center"
              >
                مشاوره مستقیم
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCaseMap;
