import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2, Clock, ArrowRight, ChevronDown, PhoneCall,
  Sparkles, GraduationCap, Building2, Euro, FileCheck2,
  Users, Calculator, TrendingUp, Globe, AlertTriangle, BookOpen,
  MapPin, Briefcase, Languages, Plane, Home, HeartPulse, FileText,
  Landmark, Timer, Coffee, Wrench, ShieldCheck, Banknote,
  CalendarDays, Scale, Quote, Info, ExternalLink,
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

const CANONICAL_URL = `${BRAND.origin}/guides/academic-austria`;

/* ============================================================
   2. داده‌های رسمی 2026
   ============================================================ */
const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=80',
  srcSet:
    'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=75 800w, ' +
    'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=75 1200w, ' +
    'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=80 1600w',
  alt: 'دانشگاه وین Universität Wien — تحصیل در اتریش ۲۰۲۶',
  width: 1600,
  height: 900,
};

const COSTS = [
  { label: 'شهریه پایه (غیر EU)', value: '€۷۲۶.۷۲', note: 'در هر ترم — همه رشته‌ها', color: 'emerald' },
  { label: 'هزینه ÖH (بیمه دانشجویی)', value: '€۲۶.۲۰', note: 'در هر ترم — اجباری', color: 'amber' },
  { label: 'مجموع هر ترم', value: '€۷۵۲.۹۲', note: '۱۲ ترم ≈ €۹,۰۳۵', color: 'gold' },
];

const VWU_OPTIONS = [
  { path: 'VWU مستقیم (OeAD)', cost: '€۶۱۲ / ترم', note: 'ارزان‌ترین گزینه — دوره‌های OeAD', source: 'studyu.org' },
  { path: 'دانشگاه وین (Sprachenzentrum)', cost: '€۱,۸۹۰ / ترم', note: 'شامل مواد آموزشی + کتاب', source: 'univie.ac.at' },
  { path: 'مؤسسات همکار VWU', cost: '€۱,۸۵۰ + €۴۰ مواد', note: 'بسته به مؤسسه', source: 'studyu.org' },
];

const TIMELINE = [
  { university: 'Universität Wien', deadline: '۳ آگوست ۲۰۲۶', start: '۱ اکتبر ۲۰۲۶', note: 'غیر EU — ۲۲ ژوئن تا ۳ آگوست' },
  { university: 'TU Wien', deadline: '۱۵ جولای ۲۰۲۶', start: '۱ اکتبر ۲۰۲۶', note: 'غیر EU — ۱۶ ژانویه تا ۱۵ جولای' },
];

const VISA_REQUIREMENTS = [
  { label: 'تمکن مالی (مجرد)', value: '€۱,۳۰۸.۳۹ / ماه', icon: Banknote, color: 'text-amber-300' },
  { label: 'تمکن مالی (متأهل)', value: '€۲,۰۶۴.۱۲ / ماه', icon: Users, color: 'text-amber-300' },
  { label: 'هر فرزند وابسته', value: '+ €۲۰۱.۸۸ / ماه', icon: HeartPulse, color: 'text-amber-300' },
  { label: 'بیمه درمانی', value: 'پوشش ≥ €۳۰,۰۰۰', icon: ShieldCheck, color: 'text-emerald-300' },
  { label: 'بیمه دانشجویی ÖGK', value: '€۷۸.۸۴ / ماه', icon: HeartPulse, color: 'text-emerald-300' },
  { label: 'هزینه ویزا', value: '€۲۱۸', icon: FileCheck2, color: 'text-sky-300' },
  { label: 'زمان پردازش', value: 'تا ۶ ماه', icon: Clock, color: 'text-sky-300' },
];

const FAQS = [
  { q: 'شهریه تحصیل در دانشگاه‌های اتریش برای دانشجویان ایرانی چقدر است؟', a: 'برای دانشجویان غیر اتحادیه اروپا (شامل ایران)، شهریه هر ترم €۷۲۶.۷۲ به‌علاوه €۲۶.۲۰ هزینه ÖH است. مجموعاً €۷۵۲.۹۲ در هر ترم. این شهریه برای همه دانشگاه‌های دولتی اتریش یکسان است. برای مقایسه، دانشجویان اتحادیه اروپا فقط €۳۶۳.۳۶ + €۲۶.۲۰ پرداخت می‌کنند.' },
  { q: 'آیا بدون مدرک زبان آلمانی می‌توانم از اتریش پذیرش بگیرم؟', a: 'بله. برای دریافت پذیرش مشروط، حداقل سطح A2 آلمانی کافی است. پس از ورود، در کالج زبان VWU ثبت‌نام می‌کنید و سطح خود را تا C1 ارتقا می‌دهید. در پایان، آزمون EPD را می‌دهید. حداکثر ۴ ترم (۲ سال) برای تکمیل این مرحله فرصت دارید.' },
  { q: 'هزینه کالج زبان VWU چقدر است؟', a: 'بسته به مسیر انتخاب‌شده متفاوت است: VWU مستقیم (OeAD) €۶۱۲/ترم، دانشگاه وین (Sprachenzentrum) €۱,۸۹۰/ترم، مؤسسات همکار €۱,۸۵۰ + €۴۰ مواد. دوره‌های دانشگاه وین شامل مواد آموزشی هستند. آزمون EPD در پایان هر ترم برگزار می‌شود.' },
  { q: 'تمکن مالی لازم برای ویزای تحصیلی اتریش در ۲۰۲۶ چقدر است؟', a: 'طبق استاندارد ۲۰۲۶: برای مجرد €۱,۳۰۸.۳۹ در ماه، برای متأهل €۲,۰۶۴.۱۲ و برای هر فرزند €۲۰۱.۸۸ اضافه می‌شود. مبلغ باید به‌صورت خالص (Netto) برای یک سال اثبات شود. بیمه درمانی با پوشش ≥ €۳۰,۰۰۰ الزامی است (ÖGK: €۷۸.۸۴/ماه).' },
  { q: 'آیا دانشجویان اتریش اجازه کار دارند؟', a: 'بله. دانشجویان غیر اتحادیه اروپا با ویزای Student می‌توانند تا ۲۰ ساعت در هفته کار کنند. کارفرما باید از AMS مجوز Beschäftigungsbewilligung بگیرد، اما آزمون بازار کار برای این ۲۰ ساعت حذف شده است. کار بیش از ۲۰ ساعت نیاز به مجوز جداگانه دارد.' },
  { q: 'مهلت申請 دانشگاه وین و TU Wien برای ۲۰۲۶ چه زمانی است؟', a: 'Universität Wien: برای غیر EU، ۲۲ ژوئن تا ۳ آگوست ۲۰۲۶. TU Wien: مهلت ارسال درخواست کتبی تا ۱۵ جولای ۲۰۲۶، و مرحله VoR از ۱ آوریل تا ۵ سپتامبر ۲۰۲۶. توصیه: مدارک را حداقل ۳ ماه قبل آماده کنید.' },
  { q: 'آیا مدرک دیپلم ایران برای پذیرش در اتریش کافی است؟', a: 'دیپلم ۱۲ ساله ایران با ریزنمرات و ترجمه سوگندخورده پذیرفته می‌شود. اما برای برخی رشته‌ها یا دانشگاه‌ها، اثبات صلاحیت تحصیلی (قبولی در کنکور یا مدرک پیش‌دانشگاهی) نیز لازم است. Universität Wien برای ایران، مدرک کنکور را به‌عنوان بخشی از مدارک الزامی درخواست می‌کند. مدارک باید دارای تأییدیه (Legalisation/Apostille) باشند.' },
];

const INTERNAL_LINKS = [
  { href: '/academic-austria-medical', title: 'پزشکی اتریش (MedAT)', desc: 'آزمون ورودی و سهمیه ۵٪' },
  { href: '/financial-austria', title: 'تمکن مالی اتریش', desc: 'اقامت بدون اجازه کار' },
  { href: '/language-austria', title: 'دوره زبان آلمانی', desc: 'آمادگی C1 در وین' },
  { href: '/ausbildung-germany', title: 'آوسبیلدونگ آلمان', desc: 'مسیر جایگزین' },
  { href: '/assessment', title: 'ارزیابی رایگان', desc: 'سنجش شانس پذیرش' },
  { href: '/contact', title: 'مشاوره با وکلای وین', desc: 'تماس مستقیم' },
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
      headline: 'راهنمای جامع تحصیل در دانشگاه‌های اتریش ۲۰۲۶: شهریه €۷۵۲، VWU و ویزای تحصیلی',
      description: 'بررسی کامل پذیرش Universität Wien و TU Wien برای دانشجویان غیر اتحادیه اروپا: شهریه €۷۵۲.۹۲/ترم، کالج زبان VWU، تمکن مالی €۱,۳۰۸.۳۹/ماه، بیمه €۷۸.۸۴/ماه، کار ۲۰ ساعته و مهلت‌های دقیق ۲۰۲۶.',
      image: { '@type': 'ImageObject', url: HERO_IMAGE.src, width: HERO_IMAGE.width, height: HERO_IMAGE.height, caption: HERO_IMAGE.alt },
      author: { '@type': 'Organization', name: BRAND.name, url: BRAND.origin },
      publisher: { '@type': 'Organization', name: BRAND.name, logo: { '@type': 'ImageObject', url: `${BRAND.origin}/logo.png` } },
      datePublished: '2026-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      mainEntityOfPage: CANONICAL_URL,
      inLanguage: 'fa-IR',
      about: [
        { '@type': 'Thing', name: 'تحصیل در اتریش' },
        { '@type': 'Thing', name: 'Universität Wien' },
        { '@type': 'Thing', name: 'VWU' },
      ],
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.speakable-summary'] },
    },
    {
      '@type': 'HowTo',
      '@id': `${CANONICAL_URL}#howto`,
      name: 'مراحل پذیرش و ویزای تحصیلی اتریش',
      description: 'فرآیند گام‌به‌گام از اپلای تا ورود به دانشگاه اتریش',
      totalTime: 'P9M',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'آماده‌سازی مدارک و ترجمه رسمی', text: 'دیپلم ۱۲ ساله با ریزنمرات، ترجمه سوگندخورده و تأییدیه. برای ایران، مدرک پیش‌دانشگاهی یا کنکور نیز لازم است.' },
        { '@type': 'HowToStep', position: 2, name: 'ثبت درخواست آنلاین', text: 'Universität Wien: ۲۲ ژوئن – ۳ آگوست ۲۰۲۶ (غیر EU). TU Wien: تا ۱۵ جولای ۲۰۲۶.' },
        { '@type': 'HowToStep', position: 3, name: 'دریافت پذیرش مشروط و ثبت در VWU', text: 'با پذیرش دانشگاه، در کالج زبان VWU ثبت‌نام کنید. هزینه بسته به مسیر (€۶۱۲ تا €۱,۸۹۰). حداکثر ۴ ترم فرصت دارید.' },
        { '@type': 'HowToStep', position: 4, name: 'درخواست ویزای تحصیلی', text: 'مدارک: پذیرش، تمکن مالی €۱,۳۰۸.۳۹/ماه، بیمه €۳۰,۰۰۰+، مسکن. هزینه €۲۱۸. زمان پردازش تا ۶ ماه.' },
        { '@type': 'HowToStep', position: 5, name: 'ورود به اتریش و ثبت‌نام نهایی', text: 'ثبت Meldezettel ظرف ۳ روز. فعال‌سازی بیمه دانشجویی (€۷۸.۸۴/ماه). شرکت در آزمون تعیین سطح VWU.' },
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
      ],
    },
  ],
};

/* ============================================================
   4. Component
   ============================================================ */
export const AcademicAustriaPage: React.FC<Props> = ({ onBackToHome, onOpenAssessment }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useSeo({
    title: 'تحصیل در اتریش ۲۰۲۶ | شهریه €۷۵۲ + VWU و ویزا',
    description: 'راهنمای کامل تحصیل در دانشگاه‌های دولتی اتریش ۲۰۲۶: شهریه غیر EU €۷۵۲.۹۲/ترم، کالج زبان VWU (€۶۱۲–€۱,۸۹۰)، تمکن مالی €۱,۳۰۸/ماه، کار ۲۰ ساعته و مهلت‌های Universität Wien و TU Wien.',
    canonical: '/guides/academic-austria',
    ogType: 'article',
    ogImage: HERO_IMAGE.src,
    keywords: ['تحصیل در اتریش ۲۰۲۶', 'شهریه دانشگاه اتریش', 'پذیرش Universität Wien', 'کالج زبان VWU', 'تمکن مالی ویزای تحصیلی', 'کار دانشجویی اتریش', 'مهلت TU Wien ۲۰۲۶'],
    jsonLd: SCHEMA,
  });

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
            <span className="text-amber-300 font-bold">راهنمای جامع</span>
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
                Universität Wien & TU Wien — آموزش عالی دولتی اتریش ۲۰۲۶
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6" itemProp="headline">
                تحصیل در دانشگاه‌های اتریش ۲۰۲۶{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-red-400">
                  (شهریه €۷۵۲ در ترم)
                </span>
              </h1>

              <p className="speakable-summary text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify" itemProp="description">
                <strong className="text-amber-300">خلاصه:</strong> دانشگاه‌های دولتی اتریش (Universität Wien، TU Wien) از برترین‌های جهان هستند. شهریه برای غیر اتحادیه اروپا <strong className="text-amber-300">€۷۵۲.۹۲/ترم</strong> است. پذیرش مشروط با <strong className="text-white">سطح A2</strong> آلمانی ممکن است؛ سپس در کالج <strong className="text-white">VWU</strong> تا C1 پیش می‌روید. کار دانشجویی <strong className="text-emerald-400">۲۰ ساعت/هفته</strong> مجاز است. مهلت Universität Wien: <strong className="text-white">۳ آگوست ۲۰۲۶</strong>؛ TU Wien: <strong className="text-white">۱۵ جولای ۲۰۲۶</strong>.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { value: '€۷۵۲.۹۲', label: 'شهریه هر ترم', color: 'text-amber-300' },
                  { value: 'VWU', label: 'کالج زبان (€۶۱۲+)', color: 'text-red-300' },
                  { value: '۲۰ ساعت', label: 'کار دانشجویی/هفته', color: 'text-emerald-400' },
                  { value: 'A2', label: 'حداقل زبان برای پذیرش', color: 'text-sky-300' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                    <div className={`text-base font-black ${item.color}`}>{item.value}</div>
                    <div className="text-[10px] text-slate-300 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer">
                  ارزیابی شانس پذیرش دانشگاه وین
                </button>
                <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-emerald-400" /> دفتر وین: {BRAND.phoneDisplay}
                </a>
              </div>
            </div>

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
                    <Building2 className="h-4 w-4" /> تحویل مستقیم پرونده به Universität Wien و TU Wien
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">دفتر وین دیاکو مدارک را مستقیماً به دبیرخانه تحویل می‌دهد.</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: TUITION
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mb-3"><Banknote className="h-4 w-4" /> شهریه و هزینه‌ها</span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">شهریه تحصیل در اتریش چقدر است؟</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 text-justify">برخلاف تصور رایج، تحصیل برای غیر EU رایگان نیست — اما در مقایسه با انگلستان یا آمریکا بسیار مقرون‌به‌صرفه است.</p>
                <div className="space-y-3">
                  {COSTS.map((c) => (
                    <div key={c.label} className={`p-4 rounded-2xl border ${c.color === 'gold' ? 'bg-amber-500/10 border-amber-400/20' : 'bg-white/5 border-white/10'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${c.color === 'gold' ? 'text-amber-300' : c.color === 'emerald' ? 'text-emerald-300' : 'text-white'}`}>{c.label}</span>
                        <span className={`text-lg font-black ${c.color === 'gold' ? 'text-white' : 'text-amber-300'}`}>{c.value}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">{c.note}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="text-xs text-slate-300">مقایسه: دانشجویان <strong className="text-white">EU</strong> فقط <strong className="text-emerald-300">€۳۸۹.۵۶</strong> در ترم پرداخت می‌کنند.</span>
                </div>
              </div>

              <div className="space-y-4">
                <figure className="rounded-2xl overflow-hidden border border-white/10">
                  <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=75" alt="شهریه تحصیل در اتریش €۷۵۲.۹۲ در ترم" width={800} height={533} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
                  <figcaption className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">شهریه غیر EU: €۷۲۶.۷۲ + €۲۶.۲۰ ÖH = €۷۵۲.۹۲</figcaption>
                </figure>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2"><Home className="h-4 w-4 text-amber-400" /><span className="text-xs font-bold text-white">هزینه زندگی ماهانه</span></div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    <li className="flex justify-between"><span>خوابگاه</span><span className="font-bold">€۳۰۰–۵۰۰</span></li>
                    <li className="flex justify-between"><span>خوراک</span><span className="font-bold">€۲۵۰–۴۰۰</span></li>
                    <li className="flex justify-between"><span>حمل‌ونقل</span><span className="font-bold">€۳۰–۷۵</span></li>
                    <li className="flex justify-between"><span>بیمه ÖGK</span><span className="font-bold">€۷۸.۸۴</span></li>
                    <li className="flex justify-between border-t border-white/10 pt-1 mt-1"><span className="text-white font-bold">مجموع</span><span className="text-amber-300 font-black">€۹۰۰–۱,۲۰۰</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: VWU LANGUAGE PROGRAMME
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-gradient-to-br from-sky-950/40 via-slate-900/60 to-[#061a21] border border-sky-400/20 rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=75" alt="کالج زبان VWU وین — دوره آمادگی آلمانی" width={800} height={533} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">VWU — کالج رسمی زبان، حداکثر ۴ ترم فرصت</div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 mb-3"><Languages className="h-4 w-4" /> کالج زبان VWU</span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">پذیرش مشروط + سه مسیر VWU</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">با <strong className="text-sky-300">سطح A2</strong> پذیرش مشروط بگیرید و در VWU ثبت‌نام کنید. سه گزینه با هزینه‌های متفاوت وجود دارد:</p>
                <div className="space-y-2">
                  {VWU_OPTIONS.map((o) => (
                    <div key={o.path} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{o.path}</span>
                        <span className="text-sm font-black text-amber-300">{o.cost}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">{o.note}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl bg-sky-500/10 border border-sky-400/20">
                  <p className="text-[11px] text-sky-200 leading-relaxed"><strong>نکته:</strong> برای ثبت‌نام در VWU ابتدا پذیرش مشروط دانشگاه لازم است. آزمون EPD در پایان هر ترم برگزار می‌شود.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4: TIMELINE
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-3"><CalendarDays className="h-4 w-4" /> تقویم ۲۰۲۶</span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">مهلت‌های Universität Wien و TU Wien</h2>
                <div className="space-y-3">
                  {TIMELINE.map((t) => (
                    <div key={t.university} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-2"><Landmark className="h-4 w-4 text-amber-400" /><span className="text-xs font-bold text-amber-300">{t.university}</span></div>
                      <ul className="space-y-1 text-[11px] text-slate-300">
                        <li className="flex justify-between"><span>مهلت申请 (غیر EU)</span><span className="font-bold text-red-300">{t.deadline}</span></li>
                        <li className="flex justify-between"><span>شروع ترم</span><span className="font-bold">{t.start}</span></li>
                        <li className="text-[10px] text-slate-400 pt-1">{t.note}</li>
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">* مدارک ترجمه‌شده و تأییدشده را حداقل ۳ ماه قبل آماده کنید. تأخیر در Legalisation می‌تواند کل برنامه را به خطر بیندازد.</p>
              </div>
              <div className="space-y-4">
                <figure className="rounded-2xl overflow-hidden border border-white/10">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=75" alt="تقویم申请 دانشگاه وین و TU Wien ۲۰۲۶" width={800} height={533} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
                  <figcaption className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">Universität Wien: تا ۳ آگوست | TU Wien: تا ۱۵ جولای (غیر EU)</figcaption>
                </figure>
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-400/20">
                  <div className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /><p className="text-[11px] text-red-200 leading-relaxed"><strong>هشدار:</strong> برای ایران، مدارک کنکور یا پیش‌دانشگاهی نیز ممکن است لازم باشد. Universität Wien صراحتاً اعلام کرده که برای ایران، اثبات صلاحیت تحصیلی الزامی است.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: VISA
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
                <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=75" alt="ویزای تحصیلی اتریش ۲۰۲۶ — تمکن مالی و بیمه" width={800} height={533} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">تمکن مالی ۲۰۲۶: €۱,۳۰۸.۳۹/ماه | بیمه: €۷۸.۸۴/ماه</div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mb-3"><ShieldCheck className="h-4 w-4" /> ویزای تحصیلی</span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">مدارک و شرایط ویزای Student</h2>
                <div className="space-y-2.5">
                  {VISA_REQUIREMENTS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2"><Icon className={`h-4 w-4 ${item.color}`} /><span className="text-xs text-white">{item.label}</span></div>
                        <span className={`text-xs font-black ${item.color}`}>{item.value}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">* مبالغ بر اساس استانداردهای ۲۰۲۶. تمکن مالی باید خالص (Netto) و برای یک سال اثبات شود.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: WORK
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-3"><Briefcase className="h-4 w-4" /> کار دانشجویی</span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">۲۰ ساعت کار در هفته — بدون آزمون بازار کار</h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">دانشجویان غیر EU با ویزای Student می‌توانند تا <strong className="text-amber-300">۲۰ ساعت/هفته</strong> کار کنند. <strong className="text-white">آزمون بازار کار حذف شده</strong> — کارفرما فقط مجوز AMS می‌گیرد.</p>
                <div className="space-y-2">
                  {['کار تا ۲۰ ساعت/هفته: بدون آزمون بازار کار', 'بیش از ۲۰ ساعت: نیاز به مجوز جداگانه', 'کارفرما باید مجوز AMS را بگیرد', 'کار نباید هدف اصلی اقامت را تحت‌الشعاع قرار دهد'].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-slate-300"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>{item}</span></div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">* درآمد ۲۰ ساعت: €۸۰۰–۱,۲۰۰/ماه — بخش قابل‌توجهی از هزینه زندگی.</p>
              </div>
              <figure className="rounded-2xl overflow-hidden border border-white/10">
                <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=75" alt="کار دانشجویی در اتریش — ۲۰ ساعت در هفته" width={800} height={533} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
                <figcaption className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">۲۰ ساعت/هفته — مجوز AMS لازم است</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 7: ARTICLE
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <article className="prose prose-invert prose-slate max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">راهنمای کامل تحصیل در اتریش ۲۰۲۶</h2>
            <div className="space-y-4 text-sm leading-8 text-slate-300 text-justify">
              <p>اتریش یکی از مقرون‌به‌صرفه‌ترین و معتبرترین مقاصد تحصیل در اروپاست. دانشگاه‌های دولتی مانند Universität Wien (با قدمت بیش از ۶۵۰ سال) و TU Wien در رتبه‌بندی‌های جهانی جایگاه بالایی دارند. شهریه برای دانشجویان غیر اتحادیه اروپا تنها <strong className="text-amber-300">€۷۵۲.۹۲ در هر ترم</strong> است — در مقایسه با £۳۰,۰۰۰-۴۰,۰۰۰ در انگلستان.</p>
              <h3 className="text-lg font-black text-white mt-6 mb-3">پذیرش مشروط: کلید ورود بدون مدرک زبان</h3>
              <p>بسیاری از متقاضیان تصور می‌کنند برای پذیرش در اتریش باید مدرک C1 آلمانی داشته باشند. اما با <strong className="text-amber-300">سطح A2</strong> می‌توانید پذیرش مشروط بگیرید. پس از ورود، در کالج زبان VWU ثبت‌نام می‌کنید و سطح خود را تا C1 ارتقا می‌دهید. آزمون EPD در پایان هر ترم برگزار می‌شود. حداکثر ۴ ترم (۲ سال) فرصت دارید.</p>
              <p>هزینه VWU بسته به مسیر متفاوت است: مستقیم از OeAD <strong className="text-white">€۶۱۲/ترم</strong>، از دانشگاه وین <strong className="text-white">€۱,۸۹۰/ترم</strong>، و از مؤسسات همکار <strong className="text-white">€۱,۸۵۰ + €۴۰ مواد</strong>. انتخاب مسیر ارزان‌تر (OeAD) نیازمند برنامه‌ریزی زودتر است.</p>
              <h3 className="text-lg font-black text-white mt-6 mb-3">مهلت‌های حیاتی ۲۰۲۶</h3>
              <p>Universitat Wien برای غیر اتحادیه اروپا: <strong className="text-red-300">۲۲ ژوئن تا ۳ آگوست ۲۰۲۶</strong>. TU Wien: <strong className="text-red-300">تا ۱۵ جولای ۲۰۲۶</strong> (مرحله VoR از ۱ آوریل تا ۵ سپتامبر). توصیه می‌شود مدارک ترجمه‌شده و تأییدشده را حداقل ۳ ماه قبل آماده کنید — تأخیر در تأییدیه (Legalisation) می‌تواند کل برنامه را به خطر بیندازد.</p>
              <h3 className="text-lg font-black text-white mt-6 mb-3">نقش دفتر وین دیاکو</h3>
              <p>دفتر وین هلدینگ دیاکو از سال ۲۰۱۵ در کنار متقاضیان ایرانی بوده است. این دفتر پرونده شما را مستقیماً به دبیرخانه Universität Wien و TU Wien تحویل می‌دهد، ثبت‌نام VWU را هماهنگ می‌کند، و در تمام مراحل ویزا همراه شماست. برای دریافت مشاوره رایگان، فرم ارزیابی آنلاین را تکمیل کنید.</p>
            </div>
          </article>
        </section>

        {/* ============================================================
            SECTION 8: FAQ
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><BookOpen className="h-4 w-4" /> پرسش‌های متداول</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">سوالات پرتکرار تحصیل در اتریش</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  <h3 className="m-0">
                    <button type="button" onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold text-white hover:text-amber-300 transition cursor-pointer" aria-expanded={isOpen}>
                      <span>{item.q}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} aria-hidden="true" />
                    </button>
                  </h3>
                  {isOpen && <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">{item.a}</div>}
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            SECTION 9: INTERNAL LINKS
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">راهنماهای مرتبط</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {INTERNAL_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-amber-400/40 hover:bg-white/[0.05]">
                <ArrowRight className="h-4 w-4 text-amber-400 shrink-0 mt-0.5 group-hover:-translate-x-1 transition" />
                <div><h3 className="text-sm font-black text-white group-hover:text-amber-300 transition">{link.title}</h3><p className="text-[11px] text-slate-400 mt-0.5">{link.desc}</p></div>
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
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">مسیر شما به دانشگاه‌های اتریش از اینجا شروع می‌شود</h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">دفتر وین دیاکو پرونده شما را مستقیماً به Universität Wien و TU Wien تحویل می‌دهد، ثبت‌نام VWU را هماهنگ می‌کند و در تمام مراحل ویزا همراه شماست.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-8 py-4 text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer">شروع ارزیابی رایگان</button>
              <a href="https://wa.me/436889763256" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"><PhoneCall className="h-4 w-4 text-emerald-400" /> گفتگو با دفتر وین</a>
            </div>
          </div>
        </section>

        {/* ============================================================
            FOOTER DISCLAIMER
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8">
          <div className="rounded-2xl bg-amber-500/5 border border-amber-400/20 p-4 flex items-start gap-3 text-[11px] text-amber-200 leading-relaxed">
            <Scale className="h-4 w-4 shrink-0 mt-0.5" />
            <span><strong>سلب مسئولیت (YMYL):</strong> اطلاعات این صفحه صرفاً آموزشی است و جایگزین مشاوره حقوقی رسمی نیست. تصمیم نهایی بر عهده مقامات ذیصلاح اتریش (Universität Wien، TU Wien، MA35، OeAD) است. قوانین و مهلت‌ها ممکن است تغییر کنند؛ پیش از اقدام، از منابع رسمی تأیید بگیرید.</span>
          </div>
        </section>
      </article>
    </div>
  );
};

export default AcademicAustriaPage;