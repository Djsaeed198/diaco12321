import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Plane,
  ShieldCheck,
  Briefcase,
  Landmark,
  Zap,
  BookOpen,
  ExternalLink,
  AlertTriangle,
  List,
  Award,
  Calendar,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const EASIEST_PATHS = [
  {
    key: 'no-language',
    label: 'بدون مدرک زبان و بدون شرط حضور',
    country: 'پرتغال، اسپانیا و یونان',
    time: '۳ تا ۵ ماه',
    highlights: [
      'پرتغال (D7 / D8): درآمد ماهانه پایدار در ایران حدود ۹۲۰ یورو برای D7، بدون خرید ملک و بدون مدرک زبان؛ مسیر ۵ ساله تا پاسپورت.',
      'اسپانیا: اقامت ۳ ساله دیجیتال نومد برای دورکاران یا ویزای تمکن مالی بدون نیاز به زبان.',
      'یونان: تمکن مالی FIP (درآمد ماهانه ~۳,۵۰۰ یورو) یا گلدن ویزای ۲۵۰,۰۰۰ یورویی تغییر کاربری تجاری به مسکونی، بدون شرط حضور.',
    ],
    ctaLabel: 'بررسی گلدن ویزا و تمکن مالی اسپانیا و یونان',
    ctaPage: 'realestate-greece',
  },
  {
    key: 'work-no-offer',
    label: 'مهاجرت کاری بدون جاب‌آفر اولیه',
    country: 'آلمان و اتریش',
    time: '۲ تا ۶ ماه',
    highlights: [
      'کارت فرصت آلمان (Chancenkarte): با کسب ۶ امتیاز و بدون قرارداد کار از ایران ویزای ۱ ساله دریافت کنید (با ۲۰ ساعت کار پاره‌وقت).',
      'آوسبیلدونگ آلمان: تحصیل رایگان برای زیر ۳۵ سال با زبان B1/B2 و حقوق ماهانه ۹۰۰ تا ۱,۳۰۰ یورو از ماه اول.',
      'کارت RWR و استارتاپ اتریش: همترازی امتیاز زبان انگلیسی با آلمانی و اقامت ۲ ساله.',
    ],
    ctaLabel: 'مشاهده کارت شانس آلمان (Chancenkarte)',
    ctaPage: 'jobseeker-germany',
  },
  {
    key: 'fastest',
    label: 'سریع‌ترین اقامت و ثبت شرکت',
    country: 'امارات (دبی) و مجارستان',
    time: '۲ هفته تا ۴ ماه',
    highlights: [
      'امارات (دبی): سریع‌ترین مسیر جهان؛ ثبت شرکت در مناطق آزاد یا ویزای فریلنسری در کمتر از ۲۰ روز کاری با اقامت ۲ ساله و صفر درصد مالیات.',
      'مجارستان (Guest Investor Program): سرمایه‌گذاری ۲۵۰,۰۰۰ یورو در صندوق املاک مجاز، بدون مدرک زبان و بدون شرط حضور با اقامت ۱۰ ساله شینگن.',
    ],
    ctaLabel: 'بررسی ثبت شرکت و اقامت دبی',
    ctaPage: 'business-dubai',
  },
];

const COMPARISON_TABLE = [
  ['امارات (دبی) 🇦🇪', 'ثبت شرکت، فریلنسری یا ویزای طلایی', 'خیر', '۲ تا ۴ هفته', 'سریع‌ترین اقامت جهان، صفر درصد مالیات بر درآمد و نزدیکی به ایران'],
  ['پرتغال 🇵🇹', 'ویزای تمکن مالی (D7) یا دیجیتال نومد (D8)', 'خیر', '۳ تا ۵ ماه', 'بدون نیاز به خرید ملک؛ مسیر شفاف تا اقامت دائم و پاسپورت پس از ۵ سال'],
  ['آلمان 🇩🇪', 'کارت فرصت (Chancenkarte) و آوسبیلدونگ', 'حداقلی (A1/B1)', '۲ تا ۴ ماه', 'ورود قانونی بدون جاب‌آفر اولیه و امکان ۲۰ ساعت کار پاره‌وقت'],
  ['اتریش 🇦🇹', 'ویزای خودحمایتی، استارتاپ و کارت RWR', 'حداقلی / انگلیسی', '۳ تا ۶ ماه', 'بالاترین کیفیت زندگی در اروپا و همترازی امتیاز انگلیسی با آلمانی'],
  ['یونان و مجارستان 🇬🇷🇭🇺', 'گلدن ویزای ۲۵۰ هزار یورویی یا کالج زبان', 'خیر', '۲ تا ۴ ماه', 'پایین‌ترین آستانه اقامت سرمایه‌گذاری اروپا با پوشش کامل خانواده'],
];

const faqs = [
  {
    q: 'ارزان‌ترین و راحت‌ترین کشور برای مهاجرت ایرانیان در سال ۲۰۲۷ کدام است؟',
    a: 'برای افراد متخصص با مدرک زبان، آلمان (از طریق کارت فرصت و آوسبیلدونگ) و ایتالیا (از طریق بورسیه استانی DSU) ارزان‌ترین مسیرها هستند. برای افرادی که درآمد ماهانه در ایران دارند، ویزای D7 پرتغال کم‌هزینه‌ترین مسیر اقامت اروپا بدون سرمایه‌گذاری کلان است.',
  },
  {
    q: 'کدام کشور بدون مدرک زبان و بدون نیاز به سرمایه بالا ویزا می‌دهد؟',
    a: 'در سال ۲۰۲۷، مسیرهای کالج زبان در کشورهایی مانند اتریش، آلمان و مجارستان، و همچنین پذیرش‌های مشروط دانشگاهی به شما اجازه می‌دهند بدون داشتن مدرک بین‌المللی زبان وارد اروپا شوید و زبان را در کشور مقصد بیاموزید.',
  },
  {
    q: 'آیا مهاجرت به کانادا و استرالیا در سال ۲۰۲۷ همچنان راحت است؟',
    a: 'خیر؛ به دلیل سیاست‌های انقباضی جدید در کانادا و استرالیا (کاهش سقف پذیرش دانشجو، محدودیت سنی زیر ۳۵ سال در استرالیا و امتیازات بالای اکسپرس انتری)، در سال ۲۰۲۷ کشورهای اروپایی (مانند آلمان، اتریش و پرتغال) مسیرهای بسیار هموارتر و قابل پیش‌بینی‌تری نسبت به کانادا و استرالیا دارند.',
  },
  {
    q: 'سریع‌ترین کشور برای گرفتن پاسپورت دوم از طریق مهاجرت کدام است؟',
    a: 'در میان کشورهای توسعه‌یافته، آلمان (در صورت تسلط به زبان آلمانی سطح C1 و ادغام شغلی پس از ۳ سال و در حالت عادی پس از ۵ سال) و پرتغال (پس از ۵ سال اقامت قانونی با زبان پایه A2) سریع‌ترین مسیرهای قانونی برای دریافت پاسپورت معتبر جهانی هستند.',
  },
];

const tocItems = [
  { id: 'what-means-easiest', label: 'تعریف راحت‌ترین کشور در ۲۰۲۷ چیست؟' },
  { id: 'comparison-table', label: 'جدول مقایسه راحت‌ترین کشورها (۲۰۲۷)' },
  { id: 'easiest-work', label: 'راحت‌ترین کشور کاری بدون جاب‌آفر' },
  { id: 'easiest-no-language', label: 'راحت‌ترین بدون مدرک زبان و شرط حضور' },
  { id: 'easiest-fast-track', label: 'سریع‌ترین اقامت و ثبت شرکت (دبی/مجارستان)' },
  { id: 'expert-insights', label: 'ریسک تمدید اقامت و نکته دیاکو' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const EasiestCountries2027Page: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedPathKey, setSelectedPathKey] = useState<string>('no-language');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedPath = EASIEST_PATHS.find((p) => p.key === selectedPathKey) || EASIEST_PATHS[0];

  useSeo({
    title: 'راحت‌ترین کشور برای مهاجرت در ۲۰۲۷ کجاست؟ | مقایسه ارزان‌ترین و سریع‌ترین مسیرها | دیاکو',
    description:
      'بررسی راحت‌ترین کشور برای مهاجرت در سال ۲۰۲۷ از نظر هزینه، مدرک زبان، سرعت صدور ویزا و شرایط اقامت. مقایسه پرتغال، اسپانیا، آلمان، اتریش، مجارستان و امارات.',
    canonical: 'https://www.dia-co.ir/easiest-countries-to-immigrate-2027',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'راحت‌ترین کشور برای مهاجرت ۲۰۲۷',
      'سریع‌ترین روش مهاجرت ایرانیان',
      'مهاجرت بدون مدرک زبان ۲۰۲۷',
      'اقامت دبی و پرتغال D7',
      'کارت فرصت آلمان ۲۰۲۷',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/easiest-countries-to-immigrate-2027/#article',
          headline: 'راحت‌ترین کشور برای مهاجرت در ۲۰۲۷ کجاست؟ | مقایسه ارزان‌ترین و سریع‌ترین مسیرها',
          description:
            'بررسی راحت‌ترین کشور برای مهاجرت در سال ۲۰۲۷ از نظر هزینه، مدرک زبان، سرعت صدور ویزا و شرایط اقامت. مقایسه پرتغال، اسپانیا، آلمان، اتریش و امارات.',
          image: [
            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:17:00+03:30',
          dateModified: '2026-11-14T13:17:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و ارزیابی پرونده‌های بین‌الملل هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          reviewedBy: {
            '@type': 'Organization',
            name: 'دفتر اجرایی هلدینگ دیاکو در وین',
            url: 'https://www.dia-co.ir/',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://www.dia-co.ir/#organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
            logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' },
          },
          citation: [
            'https://www.make-it-in-germany.com/',
            'https://www.migration.gv.at/',
            'https://aima.gov.pt/',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/easiest-countries-to-immigrate-2027',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/easiest-countries-to-immigrate-2027/#faq',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://www.dia-co.ir/' },
            { '@type': 'ListItem', position: 2, name: 'مقالات تخصصی', item: 'https://www.dia-co.ir/blog' },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'راحت‌ترین کشور برای مهاجرت ۲۰۲۷',
              item: 'https://www.dia-co.ir/easiest-countries-to-immigrate-2027',
            },
          ],
        },
      ],
    },
  });

  const handleLinkNav = (page: string, slug?: string) => (e: React.MouseEvent) => {
    if (!e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (slug && onNavigateToBlogPost) onNavigateToBlogPost(slug);
      else if (onNavigateToPage) onNavigateToPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#061a21] text-white font-sans" dir="rtl">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061a21]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
            >
              <ArrowRight className="h-4 w-4 text-amber-400" />
              <span>بازگشت به صفحه اصلی</span>
            </button>
            <span className="text-white/20">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-sm font-black text-amber-300">
              <Plane className="h-4 w-4 text-emerald-400" />
              راحت‌ترین کشور مهاجرت ۲۰۲۷
            </span>
          </div>
          <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-200">
            <a href="#comparison-table" className="hover:text-amber-300">جدول مقایسه</a>
            <a href="#easiest-work" className="hover:text-amber-300">کاری بدون جاب‌آفر</a>
            <a href="#easiest-no-language" className="hover:text-amber-300">بدون مدرک زبان</a>
            <a href="#easiest-fast-track" className="hover:text-amber-300">سریع‌ترین (دبی/مجارستان)</a>
            <a href="#faq" className="hover:text-amber-300">سوالات متداول</a>
          </nav>
          <button
            type="button"
            onClick={onOpenAssessment}
            className="rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
          >
            یافتن راحت‌ترین مسیر شما
          </button>
        </div>
      </header>

      <section className="container mx-auto px-4 md:px-8 pt-10 pb-12 max-w-5xl space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300">
          <Sparkles className="h-4 w-4" />
          تحلیل تطبیقی ۲۰۲۷ | دبی، پرتغال، آلمان، اتریش، یونان و مجارستان
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
          راحت‌ترین کشور برای مهاجرت در ۲۰۲۷ کجاست؟{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-emerald-400">
            (سریع‌ترین و کم‌چالش‌ترین مسیرها)
          </span>
        </h1>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <Award className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-[11px]">نویسنده:</span>
              <strong className="text-white">دپارتمان ارزیابی بین‌الملل دیاکو</strong>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-[11px]">بازبینی:</span>
              <strong className="text-emerald-300">دفتر اجرایی دیاکو در وین</strong>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="h-4 w-4 text-sky-400 shrink-0" />
            <span>به‌روزرسانی: <strong>نوامبر ۲۰۲۶</strong></span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-slate-300">
            <ExternalLink className="h-4 w-4 text-amber-400 shrink-0" />
            <a href="https://aima.gov.pt/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline font-bold">
              aima.gov.pt
            </a>
            <span>•</span>
            <a href="https://www.migration.gv.at/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline font-bold">
              migration.gv.at
            </a>
          </div>
        </div>

        {/* BLUF */}
        <div className="rounded-2xl border-r-4 border-[#f5a623] bg-[#0a2a35] p-5 shadow-lg">
          <div className="text-xs font-black text-amber-300 mb-2">
            خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج هوشمند):
          </div>
          <p className="text-sm text-slate-100 leading-8 text-justify">
            <strong>راحت‌ترین کشور برای مهاجرت در سال ۲۰۲۷</strong> به پروفایل فردی و روش مهاجرتی شما بستگی دارد؛ اما در دسته‌بندی کلان، <strong>امارات متحده عربی (دبی)</strong> به دلیل صدور سریع اقامت بدون نیاز به مدرک زبان،{' '}
            <strong>پرتغال و اسپانیا</strong> از طریق ویزاهای تمکن مالی (D7) و دیجیتال نومد (Digital Nomad)، و <strong>آلمان و اتریش</strong> برای متخصصان فنی از طریق سیستم‌های امتیازی بدون نیاز به جاب‌آفر اولیه (مانند کارت فرصت آلمان)، کم‌چالش‌ترین مسیرها را ارائه می‌دهند.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onOpenAssessment}
            className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
          >
            انتخاب کم‌ریسک‌ترین کشور متناسب با بودجه و سن
          </button>
          <a
            href="/blog/easiest-countries-to-immigrate-2027"
            onClick={handleLinkNav('blog-post', 'easiest-countries-to-immigrate-2027')}
            className="rounded-2xl border border-amber-400/40 bg-amber-500/10 px-5 py-3.5 text-xs sm:text-sm font-bold text-amber-200 hover:bg-amber-500/20 transition inline-flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4 text-amber-300" />
            نسخه کامل مقاله در بخش مقالات دیاکو
          </a>
        </div>

        {/* TOC */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2 text-xs font-black text-amber-300 mb-3">
            <List className="h-4 w-4" />
            <span>فهرست مطالب</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            {tocItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 px-3 py-2 text-slate-200 hover:text-amber-300 transition"
              >
                <span className="text-amber-400 font-black">{idx + 1}.</span>
                <span className="truncate">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 max-w-5xl space-y-12 pb-20">
        {/* Interactive Selector */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
          <div className="text-sm font-black text-amber-300 flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <span>انتخاب راحت‌ترین مسیر بر اساس اولویت شما در ۲۰۲۷:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {EASIEST_PATHS.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setSelectedPathKey(p.key)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  selectedPathKey === p.key
                    ? 'bg-[#f5a623] text-[#082833]'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <strong className="text-base text-white">{selectedPath.country}</strong>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300">
                زمان تقریبی: {selectedPath.time}
              </span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200 leading-7">
              {selectedPath.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <a
                href={`/${selectedPath.ctaPage}`}
                onClick={handleLinkNav(selectedPath.ctaPage)}
                className="text-xs font-black text-amber-300 hover:underline inline-flex items-center gap-1"
              >
                {selectedPath.ctaLabel} ↗
              </a>
            </div>
          </div>
        </div>

        {/* 1. Definition */}
        <div id="what-means-easiest" className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
          <h2 className="text-2xl font-black">تعریف «راحت‌ترین کشور برای مهاجرت» در سال ۲۰۲۷ چیست؟</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {[
              { title: 'حذف شرط Job Offer اولیه', text: 'ورود به کشور مقصد برای جستجوی کار از طریق سیستم‌های امتیازی شفاف.' },
              { title: 'حذف الزام مدرک زبان', text: 'اقامت از طریق تمکن مالی، درآمد غیرفعال، سرمایه‌گذاری یا ثبت شرکت بدون آیلتس.' },
              { title: 'سرعت بالای پردازش', text: 'صدور ویزا و کارت اقامت در ۲ هفته تا ۴ ماه به‌جای انتظارهای چندساله.' },
              { title: 'بودجه کنترل‌شده و منطقی', text: 'امکان اقدام با تحصیل ارزان یا دوره‌های آموزشی با حقوق (آوسبیلدونگ).' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
                <strong className="text-amber-300 block mb-1">{item.title}</strong>
                <p className="text-slate-300 leading-6">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Comparison Table */}
        <div id="comparison-table" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl font-black">جدول مقایسه راحت‌ترین کشورهای جهان برای مهاجرت در ۲۰۲۷</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-xs md:text-sm text-right">
              <thead className="bg-white/5 text-amber-300 font-bold">
                <tr>
                  <th className="p-4">کشور مقصد</th>
                  <th className="p-4">راحت‌ترین مسیر اقامتی در ۲۰۲۷</th>
                  <th className="p-4">نیاز به مدرک زبان</th>
                  <th className="p-4">زمان تقریبی</th>
                  <th className="p-4">مزیت کلیدی برای ایرانیان</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-white/[0.02]">
                {COMPARISON_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.03] transition">
                    <td className="p-4 font-bold text-white">{row[0]}</td>
                    <td className="p-4 text-amber-300 font-bold">{row[1]}</td>
                    <td className="p-4 text-emerald-300 font-bold">{row[2]}</td>
                    <td className="p-4 text-slate-200">{row[3]}</td>
                    <td className="p-4 text-slate-300">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Anchor Sections */}
        <div className="grid md:grid-cols-3 gap-5">
          <div id="easiest-work" className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2">
            <Briefcase className="h-6 w-6 text-amber-400" />
            <h2 className="text-lg font-black">راحت‌ترین کاری بدون جاب‌آفر</h2>
            <p className="text-xs text-slate-300 leading-6">
              <strong>آلمان و اتریش</strong> با کارت فرصت (۶ امتیاز و ۲۰ ساعت کار پاره‌وقت)، آوسبیلدونگ با حقوق ماهانه ۹۰۰ تا ۱,۳۰۰ یورو، و کارت RWR هم‌تراز با زبان انگلیسی.
            </p>
          </div>
          <div id="easiest-no-language" className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2">
            <Landmark className="h-6 w-6 text-emerald-400" />
            <h2 className="text-lg font-black">بدون مدرک زبان و شرط حضور</h2>
            <p className="text-xs text-slate-300 leading-6">
              <strong>پرتغال (D7/D8)</strong> با درآمد ماهانه ~۹۲۰ یورو، <strong>اسپانیا</strong> (نومد و تمکن) و <strong>یونان</strong> با تمکن مالی FIP یا گلدن ویزای ۲۵۰ هزار یورویی.
            </p>
          </div>
          <div id="easiest-fast-track" className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2">
            <Zap className="h-6 w-6 text-cyan-400" />
            <h2 className="text-lg font-black">سریع‌ترین اقامت و ثبت شرکت</h2>
            <p className="text-xs text-slate-300 leading-6">
              <strong>امارات (دبی)</strong> زیر ۲۰ روز کاری با صفر درصد مالیات بر درآمد؛ و <strong>مجارستان</strong> با صندوق املاک ۲۵۰ هزار یورویی و اقامت ۱۰ ساله شینگن.
            </p>
          </div>
        </div>

        {/* Information Gain */}
        <div id="expert-insights" className="scroll-mt-24 rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-[#0a2934] to-[#0a2934] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-7 w-7 text-amber-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-amber-300 mb-3">
                چالش‌های واقعی پرونده‌ها و نکات کلیدی هلدینگ دیاکو (Information Gain)
              </h2>
              <p className="text-sm text-slate-200 leading-8 text-justify">
                خطرناک‌ترین تله تبلیغاتی عبارت <strong>«مهاجرت تضمینی و بدون هیچ‌گونه شرط»</strong> است. در سال ۲۰۲۷ کشوری که ورود به آن راحت‌تر است (مانند تمکن مالی اتریش و پرتغال یا کارت فرصت آلمان)، در مرحله <strong>تمدید اقامت</strong> سخت‌گیری بیشتری اعمال می‌کند؛ از جمله اثبات منشأ پول (Source of Funds) و استمرار درآمد در سیستم مالیاتی و بانکی. تیم حقوقی دیاکو پرونده را از روز اول با هدف <strong>تضمین تمدید و رسیدن به اقامت دائم</strong> طراحی می‌کند.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="scroll-mt-24">
          <h2 className="text-2xl font-black text-center mb-6">سوالات متداول (FAQ)</h2>
          <div className="space-y-3">
            {faqs.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-amber-300 transition cursor-pointer"
                  aria-expanded={openFaq === idx}
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-l from-emerald-900/50 to-[#0a2a33] border border-emerald-400/20 p-8 text-center">
          <h2 className="text-2xl font-black mb-3">راحت‌ترین و مطمئن‌ترین مسیر را متناسب با شرایط خودتان پیدا کنید</h2>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            کارشناسان ارشد هلدینگ مهاجرتی دیاکو آماده بررسی دقیق رزومه، سن و بودجه شما برای انتخاب کم‌ریسک‌ترین مسیر مهاجرت در سال ۲۰۲۷ هستند.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-8 py-3.5 text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
            >
              درخواست تحلیل رایگان پروفایل ۲۰۲۷
            </button>
            <a
              href="https://wa.me/436889763256"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              تهران ۰۲۱-۹۱۶۹۳۹۵۵ | واتساپ وین +43 688 976 3256
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EasiestCountries2027Page;
