import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2, Clock, ArrowRight, ChevronDown, PhoneCall,
  Sparkles, GraduationCap, Building2, Award, Euro, FileCheck2,
  Users, Calculator, TrendingUp, Globe, AlertTriangle, BookOpen,
  MapPin, Briefcase, Languages, Plane, Home, Stethoscope,
  HeartPulse, Microscope, CalendarDays, BarChart3, Target,
  Timer, Banknote, Landmark, Scale, Quote, Info,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ============================================================
   1. ثابت‌ها
   ============================================================ */
const BRAND = {
  name: 'هلدینگ مهاجرتی دیاکو',
  origin: 'https://www.dia-co.ir',
  phone: '+43 688 976 3256',
  phoneDisplay: '+۴۳ ۶۸۸ ۹۷۶ ۳۲۵۶',
} as const;

const CANONICAL_URL = `${BRAND.origin}/academic-austria-medical`;

/* ============================================================
   2. داده‌ها (بر اساس 2026 رسمی)
   ============================================================ */
const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
  srcSet:
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=75 800w, ' +
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=75 1200w, ' +
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80 1600w',
  alt: 'دانشگاه علوم پزشکی وین MedUni Wien — تحصیل پزشکی در اتریش ۲۰۲۶',
  width: 1600,
  height: 900,
};

const UNIVERSITIES = [
  { name: 'MedUni Wien', city: 'وین', medicine: 704, dentistry: 80, total: 784, nonEU: '~۳۵' },
  { name: 'MedUni Innsbruck', city: 'اینسبروک', medicine: 390, dentistry: 40, total: 430, nonEU: '~۱۹' },
  { name: 'MedUni Graz', city: 'گراتس', medicine: 382, dentistry: 24, total: 406, nonEU: '~۱۹' },
  { name: 'JKU Linz', city: 'لینتس', medicine: 330, dentistry: 0, total: 330, nonEU: '~۱۶' },
];

const EXAM_SECTIONS = [
  { name: 'BMS — دانش پایه پزشکی', weight: '۴۰٪', detail: 'زیست، شیمی، فیزیک، ریاضی — سطح دبیرستان', color: 'text-amber-300', bar: 'bg-amber-400', width: 'w-[40%]' },
  { name: 'KFF — توانایی‌های شناختی', weight: '۴۰٪', detail: 'استدلال فضایی، حافظه، دنباله اعداد، روانی کلامی، استنتاج', color: 'text-teal-300', bar: 'bg-teal-400', width: 'w-[40%]' },
  { name: 'TV — درک متن', weight: '۱۰٪', detail: 'فهم و تحلیل متون علمی', color: 'text-sky-300', bar: 'bg-sky-400', width: 'w-[10%]' },
  { name: 'SEK — توانایی‌های اجتماعی-عاطفی', weight: '۱۰٪', detail: 'شناخت احساسات، تنظیم هیجان، تصمیم‌گیری اجتماعی', color: 'text-rose-300', bar: 'bg-rose-400', width: 'w-[10%]' },
];

const TIMELINE = [
  { date: '۲ مارس ۲۰۲۶', event: 'شروع ثبت‌نام آنلاین', detail: 'در medizinstudieren.at — انتخاب محل و سهمیه' },
  { date: '۳۱ مارس ۲۰۲۶', event: 'پایان ثبت‌نام و پرداخت €۱۱۰', detail: 'بدون تمدید — تأخیر = از دست دادن آزمون' },
  { date: '۳ جولای ۲۰۲۶', event: 'آزمون MedAT', detail: '۸:۰۰–۱۷:۰۰ — همزمان در چهار شهر' },
  { date: 'هفته ۳۲ (آگوست)', event: 'اعلام نتایج', detail: 'رتبه‌بندی و دعوت به پذیرش' },
];

const FAQS = [
  { q: 'آزمون MedAT ۲۰۲۶ چه زمانی برگزار می‌شود؟', a: 'آزمون MedAT ۲۰۲۶ در روز جمعه ۳ جولای ۲۰۲۶ (۱۲ تیر ۱۴۰۵) از ساعت ۸:۰۰ تا ۱۷:۰۰ در وین، اینسبروک، گراتس و ولز برگزار می‌شود. ثبت‌نام آنلاین از ۲ تا ۳۱ مارس ۲۰۲۶ است و هزینه آن €۱۱۰ می‌باشد.' },
  { q: 'سهمیه دانشجویان غیر اتحادیه اروپا در MedAT چقدر است؟', a: 'حداکثر ۵٪ از صندلی‌های پزشکی به متقاضیان غیر اتحادیه اروپا تعلق دارد. در ۲۰۲۶ از ۱,۸۰۶ صندلی پزشکی، حداکثر ~۸۷ صندلی (۵٪) برای این گروه است. دندانپزشکی (۱۴۴ صندلی) سهمیه‌بندی ندارد. این ۵٪ یک سقف است، نه تعداد تضمینی.' },
  { q: 'شهریه تحصیل پزشکی در اتریش چقدر است؟', a: 'برای دانشجویان غیر اتحادیه اروپا: €۷۲۶.۷۲ + €۲۶.۲۰ ÖH = €۷۵۲.۹۲ در هر ترم. ۱۲ ترم = حدود €۹,۰۳۵ برای کل دوره. دانشجویان EU فقط €۳۶۳.۳۶ + €۲۶.۲۰ پرداخت می‌کنند.' },
  { q: 'ساختار آزمون MedAT چگونه است؟', a: 'BMS (دانش پایه) ۴۰٪، KFF (توانایی شناختی) ۴۰٪، TV (درک متن) ۱۰٪، SEK (اجتماعی-عاطفی) ۱۰٪. کاملاً به زبان آلمانی و حضوری.' },
  { q: 'چه سطحی از آلمانی لازم است؟', a: 'سطح C1 برای ثبت‌نام و ادامه تحصیل الزامی است. معمولاً ۱۲ تا ۱۸ ماه آمادگی زبان نیاز دارد.' },
  { q: 'شانس قبولی در MedAT چقدر است؟', a: 'در ۲۰۲۶، ۱۶,۸۸۰ نفر ثبت‌نام کردند و ۱,۹۵۰ پذیرش گرفتند — نرخ کلی ~۱۱.۶٪. برای سهمیه غیر EU رقابت بسیار شدیدتر است. آمادگی ۶–۱۲ ماهه شانس را به‌طور قابل‌توجهی افزایش می‌دهد.' },
];

const INTERNAL_LINKS = [
  { href: '/academic-austria', title: 'تحصیل در دانشگاه‌های اتریش', desc: 'راهنمای کامل پذیرش' },
  { href: '/academic-austria-medical', title: 'پزشکی اتریش (MedAT)', desc: 'همین صفحه' },
  { href: '/language-college-visa', title: 'دوره زبان و کالج', desc: 'آمادگی C1' },
  { href: '/ausbildung-germany', title: 'آوسبیلدونگ آلمان', desc: 'مسیر جایگزین' },
  { href: '/?assessment=1', title: 'ارزیابی رایگان', desc: 'سنجش شانس' },
  { href: '/contact-us', title: 'مشاوره با وکلای وین', desc: 'تماس مستقیم' },
];

/* ============================================================
   3. Schema.org JSON-LD
   ============================================================ */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${CANONICAL_URL}#article`,
      headline: 'راهنمای جامع آزمون MedAT ۲۰۲۶: سهمیه ۵٪، شهریه €۷۵۲ و ساختار آزمون',
      description: 'بررسی کامل پذیرش پزشکی و دندانپزشکی در اتریش ۲۰۲۶: ثبت‌نام ۲-۳۱ مارس، آزمون ۳ جولای، سهمیه ۵٪ غیر اتحادیه اروپا، شهریه €۷۵۲.۹۲/ترم، زبان C1 و ساختار BMS/KFF/TV/SEK.',
      image: {
        '@type': 'ImageObject',
        url: HERO_IMAGE.src,
        width: HERO_IMAGE.width,
        height: HERO_IMAGE.height,
        caption: HERO_IMAGE.alt,
      },
      author: { '@type': 'Organization', name: BRAND.name, url: BRAND.origin },
      publisher: {
        '@type': 'Organization',
        name: BRAND.name,
        logo: { '@type': 'ImageObject', url: `${BRAND.origin}/logo.png` },
      },
      datePublished: '2026-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      mainEntityOfPage: CANONICAL_URL,
      inLanguage: 'fa-IR',
      about: [
        { '@type': 'Thing', name: 'MedAT 2026' },
        { '@type': 'Thing', name: 'MedUni Wien' },
        { '@type': 'Thing', name: 'پزشکی در اتریش' },
      ],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.speakable-summary'],
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${CANONICAL_URL}#howto`,
      name: 'مراحل ثبت‌نام و آمادگی آزمون MedAT ۲۰۲۶',
      description: 'فرآیند گام‌به‌گام از آمادگی زبان تا پذیرش در دانشگاه پزشکی اتریش',
      totalTime: 'P12M',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'کسب مدرک زبان آلمانی C1', text: 'زبان آلمانی سطح C1 برای ثبت‌نام الزامی است. آزمون‌های ÖSD، Goethe یا Telc معتبر هستند.' },
        { '@type': 'HowToStep', position: 2, name: 'آمادگی برای MedAT', text: 'شروع آمادگی ۶ تا ۱۲ ماه قبل با منابع رسمی BMS و تمرین KFF، TV و SEK.' },
        { '@type': 'HowToStep', position: 3, name: 'ثبت‌نام آنلاین (۲-۳۱ مارس ۲۰۲۶)', text: 'ثبت‌نام در medizinstudieren.at و پرداخت €۱۱۰. انتخاب محل و سهمیه (غیر EU).' },
        { '@type': 'HowToStep', position: 4, name: 'شرکت در آزمون (۳ جولای ۲۰۲۶)', text: 'آزمون یک‌روزه (۸:۰۰–۱۷:۰۰) در وین، اینسبروک، گراتس یا ولز. زبان آلمانی.' },
        { '@type': 'HowToStep', position: 5, name: 'دریافت نتیجه و پذیرش', text: 'نتایج هفته ۳۲ (آگوست). پذیرش بر اساس رتبه در سهمیه.' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${CANONICAL_URL}#faq`,
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${CANONICAL_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'خانه', item: BRAND.origin },
        { '@type': 'ListItem', position: 2, name: 'تحصیل در اتریش', item: `${BRAND.origin}/academic-austria` },
        { '@type': 'ListItem', position: 3, name: 'پزشکی اتریش (MedAT)', item: CANONICAL_URL },
      ],
    },
  ],
};

/* ============================================================
   4. Component
   ============================================================ */
export const AcademicAustriaMedicalPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useSeo({
    title: 'پزشکی اتریش ۲۰۲۶ | MedAT + سهمیه ۵٪ و شهریه €۷۵۲',
    description: 'راهنمای کامل پذیرش پزشکی و دندانپزشکی اتریش ۲۰۲۶: آزمون MedAT در ۳ جولای، سهمیه ۵٪ غیر EU، شهریه €۷۵۲.۹۲/ترم، زبان C1، ساختار BMS/KFF/TV/SEK با دیاکو.',
    canonical: '/academic-austria-medical',
    ogType: 'article',
    ogImage: HERO_IMAGE.src,
    keywords: ['تحصیل پزشکی در اتریش ۲۰۲۶', 'آزمون MedAT', 'MedUni Wien', 'سهمیه ۵ درصد MedAT', 'شهریه پزشکی اتریش', 'BMS KFF TV SEK', 'دوره آمادگی MedAT وین'],
    jsonLd: SCHEMA,
  });

  /* ---------- Reading Progress ---------- */
  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setReadingProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyPhone = () => {
    navigator.clipboard.writeText(BRAND.phone);
  };

  return (
    <div className="min-h-screen bg-[#061a21] text-white pt-24 pb-16 font-sans" dir="rtl">
      {/* Reading Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/20">
        <div className="h-full bg-gradient-to-l from-amber-400 to-red-500 transition-[width] duration-150" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* ============================================================
          BREADCRUMB
         ============================================================ */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button type="button" onClick={onBackToHome} className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 transition cursor-pointer">
            <ArrowRight className="h-4 w-4" /> بازگشت به صفحه اصلی
          </button>
          <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-xs text-slate-300">
            <a href="/" className="hover:text-amber-300">خانه</a>
            <span>/</span>
            <a href="/academic-austria" className="hover:text-amber-300">تحصیل در اتریش</a>
            <span>/</span>
            <span className="text-amber-300 font-bold">پزشکی (MedAT)</span>
          </nav>
        </div>
      </div>

      <article ref={articleRef}>
        {/* ============================================================
            SECTION 1: HERO — H1 + Above the Fold
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-300 mb-4">
                <GraduationCap className="h-4 w-4 text-red-400" />
                MedUni Wien & MedAT — تحصیل علوم پزشکی در اتریش ۲۰۲۶
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6" itemProp="headline">
                پزشکی و دندانپزشکی اتریش ۲۰۲۶{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-red-400">
                  (آزمون MedAT)
                </span>
              </h1>

              {/* Answer-First for AIO */}
              <p className="speakable-summary text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify" itemProp="description">
                <strong className="text-amber-300">خلاصه:</strong> دانشگاه علوم پزشکی وین (MedUni Wien) بزرگ‌ترین قطب آموزش پزشکی در اروپای مرکزی است. شهریه برای دانشجویان غیر اتحادیه اروپا <strong className="text-amber-300">€۷۵۲.۹۲ در هر ترم</strong> است. ورود منوط به قبولی در آزمون <strong className="text-amber-300">MedAT در ۳ جولای ۲۰۲۶</strong> است. سهمیه غیر اتحادیه اروپا تنها <strong className="text-red-300">۵٪</strong> (حداکثر ~۸۷ صندلی از ۱,۸۰۶) است. ثبت‌نام: <strong className="text-white">۲–۳۱ مارس ۲۰۲۶</strong>. زبان آلمانی: <strong className="text-white">C1</strong>.
              </p>

              {/* 4 Key Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { value: '۳ جولای', label: 'تاریخ آزمون ۲۰۲۶', color: 'text-amber-300' },
                  { value: '۵٪', label: 'سهمیه غیر EU', color: 'text-red-300' },
                  { value: '€۷۵۲.۹۲', label: 'شهریه هر ترم', color: 'text-emerald-400' },
                  { value: 'C1', label: 'سطح زبان آلمانی', color: 'text-sky-300' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                    <div className={`text-base font-black ${item.color}`}>{item.value}</div>
                    <div className="text-[10px] text-slate-300 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer">
                  مشاوره ثبت‌نام و آمادگی MedAT
                </button>
                <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-emerald-400" />
                  دفتر وین: {BRAND.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Hero Image — LCP optimized */}
            <div className="lg:col-span-5">
              <figure className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
                <img
                  src={HERO_IMAGE.src}
                  srcSet={HERO_IMAGE.srcSet}
                  sizes="(max-width: 1024px) 100vw, 500px"
                  alt={HERO_IMAGE.alt}
                  width={HERO_IMAGE.width}
                  height={HERO_IMAGE.height}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-80 sm:h-96 object-cover"
                  itemProp="image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                    <Building2 className="h-4 w-4" />
                    دانشگاه‌های پزشکی وین، گراتس، اینسبروک و لینتس
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    پوشش BMS (زیست، شیمی، فیزیک، ریاضی)، KFF، TV و SEK — همراهی در وین
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: QUOTA & COMPETITION
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-red-500/5 border border-red-400/20 rounded-3xl p-6 md:p-10">
            <div className="flex items-start gap-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white mb-2">
                  واقعیت سهمیه ۵٪: رقابت شدید برای حداکثر ~۸۷ صندلی
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  این مهم‌ترین بخش برای متقاضیان ایرانی است. اعداد ۲۰۲۶ را دقیق بشناسید.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-6">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs md:text-sm">
                  <caption className="sr-only">صندلی‌های پزشکی و سهمیه ۵٪ در اتریش ۲۰۲۶</caption>
                  <thead>
                    <tr className="border-b border-white/15 text-slate-300">
                      <th scope="col" className="py-3 px-3">دانشگاه</th>
                      <th scope="col" className="py-3 px-3">پزشکی</th>
                      <th scope="col" className="py-3 px-3">دندانپزشکی</th>
                      <th scope="col" className="py-3 px-3 text-red-300">۵٪ غیر EU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-slate-200">
                    {UNIVERSITIES.map((u) => (
                      <tr key={u.name}>
                        <th scope="row" className="py-3 px-3 font-bold text-white">{u.name}</th>
                        <td className="py-3 px-3">{u.medicine.toLocaleString('fa-IR')}</td>
                        <td className="py-3 px-3">{u.dentistry > 0 ? u.dentistry.toLocaleString('fa-IR') : '—'}</td>
                        <td className="py-3 px-3 text-red-300 font-black">{u.nonEU}</td>
                      </tr>
                    ))}
                    <tr className="bg-white/5">
                      <th scope="row" className="py-3 px-3 font-black text-white">مجموع</th>
                      <td className="py-3 px-3 font-black text-white">۱,۸۰۶</td>
                      <td className="py-3 px-3 font-black text-white">۱۴۴</td>
                      <td className="py-3 px-3 font-black text-red-300">~۸۷</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">آمار کل ۲۰۲۶</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    <li>ثبت‌نام‌کنندگان: <strong className="text-white">۱۶,۸۸۰ نفر</strong></li>
                    <li>صندلی کل: <strong className="text-white">۱,۹۵۰</strong></li>
                    <li>نرخ پذیرش کلی: <strong className="text-amber-300">~۱۱.۶٪</strong></li>
                    <li>رقابت سهمیه غیر EU: <strong className="text-red-300">بسیار شدیدتر</strong></li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                  <p className="text-[11px] text-amber-200 leading-relaxed">
                    <strong>نکته حیاتی:</strong> ۵٪ یک <strong>سقف</strong> است، نه تعداد تضمینی. حداقل ۹۵٪ صندلی‌ها برای EU رزرو شده. اگر متقاضیان واجد شرایط غیر EU کمتر باشند، صندلی‌های خالی به سهمیه EU منتقل می‌شوند. دندانپزشکی <strong>هیچ سهمیه‌ای ندارد</strong>.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              منبع: MedUni Wien، medizinstudieren.at — صندلی‌های ۲۰۲۶/۲۷
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: EXAM STRUCTURE
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 mb-3">
                  <Microscope className="h-4 w-4" />
                  ساختار آزمون
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                  MedAT از چه بخش‌هایی تشکیل شده؟
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 text-justify">
                  آزمون MedAT-H یک آزمون کتبی چندبخشی است که چهار بخش اصلی دارد. BMS و KFF هر کدام ۴۰٪ وزن دارند و مهم‌ترین بخش‌ها هستند.
                </p>

                <div className="space-y-3">
                  {EXAM_SECTIONS.map((item) => (
                    <div key={item.name} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-bold ${item.color}`}>{item.name}</span>
                        <span className={`text-xs font-black ${item.color}`}>{item.weight}</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-1.5">
                        <div className={`h-full ${item.bar} ${item.width} rounded-full`} />
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-400/20">
                  <p className="text-[11px] text-red-200 leading-relaxed">
                    <strong>هشدار:</strong> آزمون کاملاً به زبان آلمانی است. بدون C1، درک KFF و TV بسیار دشوار خواهد بود.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <figure className="rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=75"
                    alt="ساختار آزمون MedAT ۲۰۲۶ — منابع BMS KFF TV SEK"
                    width={800}
                    height={533}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover"
                  />
                  <figcaption className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                    منابع رسمی آمادگی MedAT در medizinstudieren.at رایگان است.
                  </figcaption>
                </figure>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Timer className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">زمان‌بندی آزمون</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    <li>تاریخ: <strong className="text-white">۳ جولای ۲۰۲۶ (جمعه)</strong></li>
                    <li>ساعت: <strong className="text-white">۸:۰۰ تا ۱۷:۰۰</strong></li>
                    <li>محل: وین، اینسبروک، گراتس، ولز</li>
                    <li>هزینه ثبت‌نام: <strong className="text-white">€۱۱۰</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4: TIMELINE 2026
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-gradient-to-br from-sky-950/40 via-slate-900/60 to-[#061a21] border border-sky-400/20 rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=75"
                  alt="تقویم ثبت‌نام و آزمون MedAT ۲۰۲۶ — برنامه‌ریزی"
                  width={800}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                  ثبت‌نام: ۲–۳۱ مارس | آزمون: ۳ جولای | نتایج: هفته ۳۲
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 mb-3">
                  <CalendarDays className="h-4 w-4" />
                  تقویم ۲۰۲۶
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                  زمان‌بندی دقیق ثبت‌نام و آزمون
                </h2>

                <div className="space-y-3">
                  {TIMELINE.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="shrink-0 w-20 text-[10px] font-black text-sky-300">{item.date}</span>
                      <div>
                        <div className="text-xs font-bold text-white">{item.event}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                  * برای ۲۰۲۷، تاریخ‌ها اوایل سال اعلام می‌شوند. الگو: ثبت‌نام مارس، آزمون جولای، نتایج آگوست.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: TUITION & COSTS
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mb-3">
                  <Banknote className="h-4 w-4" />
                  هزینه‌ها
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                  شهریه و هزینه‌های تحصیل پزشکی در اتریش
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                  برخلاف تصور رایج، تحصیل پزشکی در اتریش برای دانشجویان غیر EU رایگان نیست — اما در مقایسه با انگلستان یا آمریکا بسیار مقرون‌به‌صرفه است.
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-300">شهریه هر ترم (غیر EU)</span>
                      <span className="text-lg font-black text-white">€۷۲۶.۷۲</span>
                    </div>
                    <p className="text-[10px] text-emerald-200/80">+ €۲۶.۲۰ هزینه ÖH (بیمه دانشجویی)</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">مجموع هر ترم</span>
                      <span className="text-lg font-black text-amber-300">€۷۵۲.۹۲</span>
                    </div>
                    <p className="text-[10px] text-slate-400">۱۲ ترم = حدود €۹,۰۳۵ برای کل دوره</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">هزینه ÖH (کل سال)</span>
                      <span className="text-lg font-black text-sky-300">€۵۲.۴۰</span>
                    </div>
                    <p className="text-[10px] text-slate-400">شامل بیمه دانشجویی پایه</p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                  هزینه زندگی در وین (خوابگاه، غذا، حمل‌ونقل) حدود €۹۰۰ تا €۱,۲۰۰ در ماه است. خوابگاه از €۳۰۰ در ماه شروع می‌شود.
                </p>
              </div>

              <div className="space-y-4">
                <figure className="rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=75"
                    alt="شهریه تحصیل پزشکی در اتریش ۲۰۲۶ — €۷۵۲.۹۲ در ترم"
                    width={800}
                    height={533}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover"
                  />
                  <figcaption className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                    شهریه غیر EU: €۷۲۶.۷۲ + €۲۶.۲۰ ÖH = €۷۵۲.۹۲ در هر ترم
                  </figcaption>
                </figure>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/20">
                  <p className="text-[11px] text-amber-200 leading-relaxed">
                    <strong>مقایسه:</strong> شهریه پزشکی در انگلستان £۳۰,۰۰۰-۴۰,۰۰۰ در سال است. اتریش با €۱,۵۰۵.۸۴ در سال یکی از مقرون‌به‌صرفه‌ترین گزینه‌های پزشکی با کیفیت جهانی است.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: PREPARATION STRATEGY
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=75"
                  alt="دوره آمادگی MedAT در وین — گروه مطالعه و منابع"
                  width={800}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                  آمادگی هدفمند ۶ تا ۱۲ ماهه، شانس قبولی را به‌طور قابل‌توجهی افزایش می‌دهد.
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-3">
                  <Target className="h-4 w-4" />
                  استراتژی آمادگی
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                  چگونه برای MedAT آماده شویم؟
                </h2>

                <div className="space-y-3">
                  {[
                    { step: '۱', title: 'زبان آلمانی را به C1 برسانید', detail: 'بدون C1، درک KFF و TV دشوار است. حداقل ۱۲ ماه آمادگی زبان.' },
                    { step: '۲', title: 'منابع رسمی BMS را تسلط کنید', detail: 'زیست، شیمی، فیزیک و ریاضی — منابع رایگان در medizinstudieren.at.' },
                    { step: '۳', title: 'KFF را با تمرین روزانه تقویت کنید', detail: 'استدلال فضایی، حافظه، دنباله اعداد — ۴۰٪ نمره و قابل بهبود.' },
                    { step: '۴', title: 'در آزمون‌های شبیه‌سازی‌شده شرکت کنید', detail: 'دوره‌های وین (BFI، Studentenkurse) آزمون کامل را شبیه‌سازی می‌کنند.' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-400 text-[#082833] grid place-items-center text-xs font-black">{item.step}</span>
                      <div>
                        <div className="text-xs font-bold text-white">{item.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
                  <p className="text-[11px] text-emerald-200 leading-relaxed">
                    <strong>توصیه دیاکو:</strong> متقاضیانی که از پایه زبان پایین‌تری شروع می‌کنند، معمولاً یک سال آمادگی زبان در وین سپری می‌کنند. دفتر وین دیاکو دوره‌های زبان و آمادگی را هماهنگ می‌کند.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 7: ARTICLE — مقاله کامل
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <article className="prose prose-invert prose-slate max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              همه چیز درباره تحصیل پزشکی در اتریش: راهنمای کامل ۲۰۲۶
            </h2>

            <div className="space-y-4 text-sm leading-8 text-slate-300 text-justify">
              <p>
                اتریش یکی از مقرون‌به‌صرفه‌ترین و معتبرترین مقاصد تحصیل پزشکی در اروپاست. دانشگاه‌های پزشکی وین، اینسبروک، گراتس و لینتس در رتبه‌بندی‌های جهانی جایگاه بالایی دارند و مدارک آن‌ها در سراسر اتحادیه اروپا و سازمان جهانی بهداشت (WHO) به رسمیت شناخته می‌شود. اما ورود به این دانشگاه‌ها بدون قبولی در آزمون MedAT ممکن نیست — آزمونی که هر ساله در ماه جولای برگزار می‌شود و رقابتی بسیار شدید دارد.
              </p>

              <h3 className="text-lg font-black text-white mt-6 mb-3">
                MedAT چیست و چه بخش‌هایی دارد؟
              </h3>
              <p>
                MedAT (Medizinische Aufnahmetest) یک آزمون کتبی یک‌روزه است که برای پذیرش در رشته‌های پزشکی و دندانپزشکی دانشگاه‌های دولتی اتریش برگزار می‌شود. این آزمون چهار بخش اصلی دارد: <strong className="text-amber-300">BMS</strong> (دانش پایه پزشکی: زیست، شیمی، فیزیک، ریاضی) با وزن ۴۰٪، <strong className="text-amber-300">KFF</strong> (توانایی‌های شناختی: استدلال فضایی، حافظه، دنباله اعداد) با وزن ۴۰٪، <strong className="text-amber-300">TV</strong> (درک متن) با وزن ۱۰٪ و <strong className="text-amber-300">SEK</strong> (توانایی‌های اجتماعی-عاطفی) با وزن ۱۰٪. آزمون کاملاً به زبان آلمانی و به‌صورت حضوری برگزار می‌شود.
              </p>

              <h3 className="text-lg font-black text-white mt-6 mb-3">
                سهمیه ۵٪ غیر اتحادیه اروپا: واقعیت رقابت
              </h3>
              <p>
                برای متقاضیان ایرانی، مهم‌ترین نکته سهمیه ۵٪ است. بر اساس قوانین اتریش، حداقل ۹۵٪ از صندلی‌های پزشکی برای شهروندان اتحادیه اروپا رزرو شده است. سهمیه غیر اتحادیه اروپا حداکثر ۵٪ است — یعنی در سال ۲۰۲۶ که ۱,۸۰۶ صندلی پزشکی وجود دارد، حداکثر ~۸۷ صندلی برای متقاضیان غیر EU در دسترس است. این ۵٪ یک سقف است، نه تعداد تضمینی. اگر متقاضیان واجد شرایط کمتر باشند، صندلی‌های خالی به سهمیه EU منتقل می‌شوند. دندانپزشکی (۱۴۴ صندلی) هیچ سهمیه‌ای ندارد و پذیرش صرفاً بر اساس رتبه آزمون است.
              </p>

              <h3 className="text-lg font-black text-white mt-6 mb-3">
                شهریه و هزینه‌های واقعی
              </h3>
              <p>
                برای دانشجویان غیر اتحادیه اروپا، شهریه هر ترم €۷۲۶.۷۲ به‌علاوه €۲۶.۲۰ هزینه ÖH (بیمه دانشجویی) است — مجموعاً €۷۵۲.۹۲ در هر ترم. تحصیل پزشکی ۱۲ ترم (۶ سال) طول می‌کشد، بنابراین کل شهریه حدود €۹,۰۳۵ است. این مبلغ در مقایسه با انگلستان (£۳۰,۰۰۰-۴۰,۰۰۰ در سال) یا آمریکا بسیار مقرون‌به‌صرفه است. هزینه زندگی در وین (خوابگاه، غذا، حمل‌ونقل) حدود €۹۰۰ تا €۱,۲۰۰ در ماه است.
              </p>

              <h3 className="text-lg font-black text-white mt-6 mb-3">
                نقش دفتر وین دیاکو
              </h3>
              <p>
                دفتر وین هلدینگ دیاکو از سال ۲۰۱۵ در کنار متقاضیان ایرانی بوده است. این دفتر خدمات زیر را ارائه می‌دهد: برنامه‌ریزی ثبت‌نام MedAT (۲–۳۱ مارس ۲۰۲۶)، هماهنگی دوره‌های زبان آلمانی تا سطح C1، رزرو خوابگاه دانشجویی در وین، و همراهی در تمام مراحل اداری پس از پذیرش. برای دریافت مشاوره رایگان، فرم ارزیابی آنلاین را تکمیل کنید یا با دفتر وین تماس بگیرید.
              </p>
            </div>
          </article>
        </section>

        {/* ============================================================
            SECTION 8: FAQ
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <BookOpen className="h-4 w-4" />
              پرسش‌های متداول
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              سوالات پرتکرار تحصیل پزشکی در اتریش
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  <h3 className="m-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold text-white hover:text-amber-300 transition cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            SECTION 9: INTERNAL LINKS
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
            راهنماهای مرتبط
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {INTERNAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-amber-400/40 hover:bg-white/[0.05]"
              >
                <ArrowRight className="h-4 w-4 text-amber-400 shrink-0 mt-0.5 group-hover:-translate-x-1 transition" />
                <div>
                  <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition">{link.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{link.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ============================================================
            SECTION 10: FINAL CTA
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-gradient-to-l from-[#0b2933] to-[#082833] border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              مسیر شما به پزشکی اتریش از اینجا شروع می‌شود
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
              دفتر وین دیاکو برنامه‌ریزی ثبت‌نام MedAT، دوره آمادگی زبان و آزمون، و رزرو خوابگاه را انجام می‌دهد. ارزیابی رایگان شرایط خود را همین حالا شروع کنید.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-8 py-4 text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer">
                شروع ارزیابی رایگان
              </button>
              <a href="https://wa.me/436889763256" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                گفتگو با دفتر وین
              </a>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default AcademicAustriaMedicalPage;