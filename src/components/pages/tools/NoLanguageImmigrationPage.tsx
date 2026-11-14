import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Globe,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Landmark,
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

const PATH_CARDS = [
  {
    key: 'study',
    icon: GraduationCap,
    title: 'مسیر تحصیلی (پذیرش مشروط و MOI)',
    summary: 'شروع تحصیل بدون آیلتس از طریق آزمون ورودی داخلی، گواهی MOI یا دوره کالج زبان.',
    examples: [
      'مجارستان: پذیرش پزشکی، مهندسی و بیزینس با آزمون ورودی داخلی بدون آیلتس سنگین',
      'ایتالیا: برخی رشته‌های انگلیسی‌زبان با مصاحبه آنلاین یا گواهی تحصیل به انگلیسی (MOI)',
      'آلمان و اتریش: پذیرش از طریق کالج‌های زبان و دوره‌های آمادگی پیش‌دانشگاهی',
    ],
    ctaLabel: 'مشاهده راهنمای کالج زبان ۲۰۲۶–۲۰۲۷',
    ctaPage: 'language-college-visa',
  },
  {
    key: 'work',
    icon: Briefcase,
    title: 'مسیر کاری (IT، هایتک و جبران امتیاز)',
    summary: 'استخدام بر پایه مصاحبه فنی در استارتاپ‌های بین‌المللی یا جبران امتیاز زبان.',
    examples: [
      'شرکت‌های فناوری در برلین، آمستردام و وین با محیط کاری ۱۰۰٪ انگلیسی و مصاحبه فنی مستقیم',
      'سیستم‌های امتیازی منعطف که نبود مدرک زبان کاغذی با مدرک دانشگاهی یا سابقه کار جبران می‌شود',
      'نکته سفارت: برای ویزاهای کاری سنتی، حداقل مکالمه پایه (A2/B1) شانس قبولی را بالا می‌برد',
    ],
    ctaLabel: 'بررسی بلوکارت آلمان ۲۰۲۶',
    ctaPage: 'german-blue-card',
  },
  {
    key: 'investment',
    icon: Landmark,
    title: 'سرمایه‌گذاری، تمکن مالی و ثبت شرکت',
    summary: 'امن‌ترین روش‌های بدون مدرک زبان؛ تمرکز ۱۰۰٪ بر تمکن مالی و طرح اقتصادی.',
    examples: [
      'اقامت تمکن مالی (اتریش، اسپانیا، فرانسه): مبتنی بر درآمد غیرفعال و بدون شرط کار یا آزمون زبان',
      'گلدن ویزای یونان و سرمایه‌گذاری ملکی اروپا: اقامت ۵ ساله خانواده بدون مدرک زبان و شرط حضور',
      'ثبت شرکت و استارتاپ اتریش: تمرکز بر سرمایه، نوآوری و گردش حساب تجاری',
    ],
    ctaLabel: 'بررسی تمکن مالی اتریش (NAG §44)',
    ctaPage: 'financial-austria',
  },
];

const faqs = [
  {
    q: 'آیا واقعاً کشوری وجود دارد که برای ویزا هیچ مدرک زبانی نخواهد؟',
    a: 'بله؛ در روش‌های سرمایه‌گذاری، تمکن مالی و برخی ویزاهای استارتاپ یا ثبت شرکت، تمرکز روی تمکن مالی و بیزینس‌پلن است و در قانون آن‌ها مدرک زبان اجباری نشده است؛ اما یادگیری زبان برای زندگی در آن کشور ضروری است.',
  },
  {
    q: 'آیا برای پذیرش مشروط تحصیلی باید هزینه بیشتری پرداخت کرد؟',
    a: 'بله؛ دوره‌های زبان پیش از دانشگاه که توسط خود دانشگاه یا کالج‌های وابسته برگزار می‌شوند، شهریه جداگانه‌ای دارند و باید هزینه‌های تحصیل در دوره زبان را به عنوان بخشی از بودجه تحصیلی خود در نظر بگیرید.',
  },
  {
    q: 'تفاوت مدرک جایگزین زبان (MOI) با آیلتس چیست؟',
    a: 'نامه MOI (Medium of Instruction) تاییدیه رسمی از دانشگاه محل تحصیل قبلی شماست که نشان می‌دهد دروس شما به زبان انگلیسی تدریس شده است. برخی دانشگاه‌ها آن را به جای آیلتس قبول می‌کنند، اما سفارت ممکن است بسته به قوانین کشور مقصد سخت‌گیری متفاوتی داشته باشد.',
  },
  {
    q: 'امن‌ترین روش مهاجرت بدون مدرک زبان کدام است؟',
    a: 'روش‌های سرمایه‌گذاری، ثبت شرکت و ویزاهای تمکن مالی (Financially Independent) به دلیل عدم وابستگی به بازار کار محلی یا دانشگاه‌ها، کمترین چالش را از نظر مدرک زبان در مرحله اخذ اقامت دارند.',
  },
];

const tocItems = [
  { id: 'is-it-possible', label: 'آیا مهاجرت بدون مدرک زبان واقعاً ممکن است؟' },
  { id: 'study-without-language', label: 'مهاجرت تحصیلی بدون مدرک زبان (MOI / مشروط)' },
  { id: 'work-without-language', label: 'مهاجرت کاری بدون مدرک زبان (۲۰۲۶)' },
  { id: 'investment-without-language', label: 'سرمایه‌گذاری، ثبت شرکت و تمکن مالی' },
  { id: 'expert-insights', label: 'چالش‌های واقعی سفارت و نکات دیاکو' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const NoLanguageImmigrationPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'مهاجرت بدون مدرک زبان ۲۰۲۶-۲۰۲۷ | تحصیلی، کاری و سرمایه‌گذاری | دیاکو',
    description:
      'راهنمای جامع مهاجرت بدون مدرک زبان در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی روش‌های مهاجرت تحصیلی، کاری و سرمایه‌گذاری به اروپا بدون نیاز به مدرک آیلتس با هلدینگ دیاکو.',
    canonical: 'https://www.dia-co.ir/immigration-without-language-certificate',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'مهاجرت بدون مدرک زبان ۲۰۲۶',
      'اقامت بدون آیلتس اروپا',
      'پذیرش مشروط دانشگاه',
      'نامه MOI برای پذیرش',
      'تمکن مالی بدون مدرک زبان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/immigration-without-language-certificate/#article',
          headline: 'مهاجرت بدون مدرک زبان ۲۰۲۶-۲۰۲۷ | تحصیلی، کاری و سرمایه‌گذاری',
          description:
            'راهنمای جامع مهاجرت بدون مدرک زبان در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی روش‌های مهاجرت تحصیلی، کاری و سرمایه‌گذاری به اروپا بدون نیاز به مدرک آیلتس.',
          image: [
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T10:00:00+03:30',
          dateModified: '2026-11-14T12:30:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          reviewedBy: {
            '@type': 'Organization',
            name: 'دفتر اجرایی هلدینگ دیاکو در اروپا',
            url: 'https://www.dia-co.ir/',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://www.dia-co.ir/#organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
            logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' },
          },
          citation: ['https://www.studyinholland.nl/', 'https://www.migration.gv.at/'],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/immigration-without-language-certificate',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/immigration-without-language-certificate/#faq',
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
              name: 'مهاجرت بدون مدرک زبان',
              item: 'https://www.dia-co.ir/immigration-without-language-certificate',
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
      {/* Header */}
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
              <Globe className="h-4 w-4 text-cyan-400" />
              مهاجرت بدون مدرک زبان ۲۰۲۶–۲۰۲۷
            </span>
          </div>
          <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-200">
            <a href="#is-it-possible" className="hover:text-amber-300">امکان‌سنجی</a>
            <a href="#study-without-language" className="hover:text-amber-300">تحصیلی</a>
            <a href="#work-without-language" className="hover:text-amber-300">کاری</a>
            <a href="#investment-without-language" className="hover:text-amber-300">سرمایه‌گذاری</a>
            <a href="#faq" className="hover:text-amber-300">سوالات متداول</a>
          </nav>
          <button
            type="button"
            onClick={onOpenAssessment}
            className="rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
          >
            ارزیابی مسیر بدون زبان
          </button>
        </div>
      </header>

      {/* Hero + BLUF */}
      <section className="container mx-auto px-4 md:px-8 pt-10 pb-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-300">
            <Sparkles className="h-4 w-4" />
            تحلیل حقوقی ۲۰۲۶–۲۰۲۷ | روش‌های جایگزین آیلتس و تافل
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            راهنمای جامع مهاجرت بدون مدرک زبان (۲۰۲۶–۲۰۲۷):{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-cyan-300">
              تحصیلی، کاری و سرمایه‌گذاری
            </span>
          </h1>

          {/* E-E-A-T */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <Award className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">نویسنده:</span>
                <strong className="text-white">دپارتمان حقوقی هلدینگ دیاکو</strong>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">بازبینی:</span>
                <strong className="text-emerald-300">دفتر اجرایی اروپا (وین)</strong>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="h-4 w-4 text-sky-400 shrink-0" />
              <span>به‌روزرسانی: <strong>نوامبر ۲۰۲۶</strong></span>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-slate-300">
              <ExternalLink className="h-4 w-4 text-amber-400 shrink-0" />
              <a href="https://www.migration.gv.at/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline font-bold">
                migration.gv.at
              </a>
              <span>•</span>
              <a href="https://www.studyinholland.nl/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline font-bold">
                studyinholland.nl
              </a>
            </div>
          </div>

          {/* BLUF Box */}
          <div className="rounded-2xl border-r-4 border-[#f5a623] bg-[#0a2a35] p-5 shadow-lg">
            <div className="text-xs font-black text-amber-300 mb-2">
              خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج هوشمند):
            </div>
            <p className="text-sm text-slate-100 leading-8 text-justify">
              <strong>مهاجرت بدون مدرک زبان</strong> برای سال‌های ۲۰۲۶ و ۲۰۲۷ همچنان در برخی کشورها و روش‌ها امکان‌پذیر است؛ اما معنای آن «عدم نیاز مطلق به زبان» نیست، بلکه به این معناست که می‌توانید بدون ارائه مدرک بین‌المللی (مانند آیلتس یا تافل) در مرحله اولیه اپلای، فرآیند خود را آغاز کنید. این مسیر عمدتاً از طریق{' '}
              <strong>پذیرش‌های مشروط تحصیلی (Conditional Offer)</strong>، <strong>ویزاهای کاری خاص با حمایت کارفرما</strong>، یا{' '}
              <strong>برنامه‌های سرمایه‌گذاری، تمکن مالی و ثبت شرکت</strong> انجام می‌شود.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
            >
              سنجش هوشمند بهترین مسیر بدون زبان
            </button>
            <a
              href="/blog/immigration-without-language-certificate"
              onClick={handleLinkNav('blog-post', 'immigration-without-language-certificate')}
              className="rounded-2xl border border-amber-400/40 bg-amber-500/10 px-5 py-3.5 text-xs sm:text-sm font-bold text-amber-200 hover:bg-amber-500/20 transition inline-flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-amber-300" />
              مطالعه مقاله کامل در بخش بلاگ دیاکو
            </a>
          </div>

          {/* TOC */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 text-xs font-black text-amber-300 mb-3">
              <List className="h-4 w-4" />
              <span>فهرست مطالب</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
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
        </div>
      </section>

      {/* Sections */}
      <section className="container mx-auto px-4 md:px-8 space-y-14 max-w-5xl pb-20">
        {/* 1 */}
        <div id="is-it-possible" className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-black">آیا مهاجرت بدون مدرک زبان واقعاً امکان‌پذیر است؟</h2>
          <p className="text-sm text-slate-200 leading-8 text-justify">
            حقیقت حقوقی و اجرایی در سال ۲۰۲۶ این است که هیچ کشور توسعه‌یافته‌ای به شما اقامت دائم یا شهروندی بدون برقراری ارتباط زبانی نمی‌دهد؛ اما در بسیاری از روش‌ها راه‌های جایگزینی وجود دارد که شما را از ارائه مدرک کاغذی در روز اول معاف می‌کند:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            {[
              'ارائه گواهی تحصیل به زبان انگلیسی از مقطع قبلی (Medium of Instruction / MOI).',
              'شرکت در دوره‌های کالج زبان یا فاندیشن در کشور مقصد.',
              'اثبات مهارت فنی بالا به کارفرمای خارجی بدون نیاز به مدرک رسمی.',
              'سرمایه‌گذاری، تمکن مالی یا ثبت شرکت با تمرکز بر اقتصاد به‌جای آزمون زبان.',
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-white/[0.02] border border-white/10 p-3.5 flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                <span className="text-slate-200 leading-6">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive 3-Pillar Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PATH_CARDS.map((card) => (
            <div
              key={card.key}
              id={
                card.key === 'study'
                  ? 'study-without-language'
                  : card.key === 'work'
                    ? 'work-without-language'
                    : 'investment-without-language'
              }
              className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <card.icon className="h-7 w-7 text-amber-400" />
                <h2 className="text-lg font-black text-white">{card.title}</h2>
                <p className="text-xs text-slate-300 leading-6">{card.summary}</p>
                <ul className="space-y-2 text-xs text-slate-200 leading-6">
                  {card.examples.map((ex, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={`/${card.ctaPage}`}
                onClick={handleLinkNav(card.ctaPage)}
                className="inline-flex items-center justify-center rounded-xl border border-amber-400/30 bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2.5 text-xs font-bold text-amber-200 transition"
              >
                {card.ctaLabel} ↗
              </a>
            </div>
          ))}
        </div>

        {/* Information Gain */}
        <div id="expert-insights" className="scroll-mt-24 rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-[#0a2934] to-[#0a2934] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-7 w-7 text-amber-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-amber-300 mb-3">
                چالش‌های واقعی پرونده‌ها و نکات کلیدی هلدینگ دیاکو (Information Gain)
              </h2>
              <p className="text-sm text-slate-200 leading-8 text-justify mb-3">
                بزرگ‌ترین خطای متقاضیان این است که عبارت «بدون مدرک زبان» را به معنای «عدم نیاز به یادگیری زبان» تفسیر می‌کنند. حتی اگر سفارت یا دانشگاه در روز اول از شما مدرک آیلتس نخواهد، برای زندگی روزمره، امور بانکی، اجاره مسکن و تعاملات اداری در اروپا به شدت به زبان نیاز خواهید داشت.
              </p>
              <p className="text-sm text-slate-200 leading-8 text-justify">
                علاوه بر این، افسران سفارت در ویزاهای تحصیلی یا کاری به شدت روی انگیزه‌نامه حساس هستند؛ اگر پرونده‌ای بدون مدرک زبان ارائه شود ولی برنامه فرد برای یادگیری زبان شفاف نباشد، احتمال ریجکتی به دلیل «عدم توجیه منطقی اقامت» بسیار بالا خواهد بود.
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
        <div className="rounded-3xl bg-gradient-to-l from-cyan-900/50 to-[#0a2a33] border border-cyan-400/20 p-8 text-center">
          <h2 className="text-2xl font-black mb-3">شرایط خود را برای مهاجرت بدون مدرک زبان ارزیابی کنید</h2>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            تیم متخصصان حقوقی هلدینگ مهاجرتی دیاکو با دفاتر فعال در تهران و اروپا، امن‌ترین و قانونی‌ترین مسیر جایگزین را متناسب با سرمایه، سوابق کاری و تحصیلی شما انتخاب می‌کند.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-8 py-3.5 text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
            >
              درخواست ارزیابی تخصصی
            </button>
            <a
              href="https://wa.me/989197340829"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              ۰۲۱-۹۱۶۹۳۹۵۵ | واتساپ ۰۹۱۹۷۳۴۰۸۲۹
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoLanguageImmigrationPage;
