import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Stethoscope,
  ShieldCheck,
  BookOpen,
  ExternalLink,
  AlertTriangle,
  List,
  Award,
  Calendar,
  Euro,
  FileCheck,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const NURSING_PATHWAYS = [
  {
    key: 'direct-work',
    label: 'ویزای کار مستقیم (§ 18a AufenthG)',
    requirement: 'معادلسازی کامل (بدون کسری واحد) + زبان B1/B2 + قرارداد کار',
    salary: '۲,۶۰۰ تا ۳,۲۰۰ یورو ناخالص/ماه',
    summary:
      'اگر مدرک کمک پرستاری یا کاردانی شما پس از بررسی سرفصل‌ها توسط اداره ایالتی آلمان بدون کسری واحد تایید شود، با داشتن قرارداد رسمی بیمارستانی یا مرکز مراقبتی و مدرک زبان B1/B2 مستقیماً ویزای کار دریافت می‌کنید.',
    ctaLabel: 'مشاهده راهنمای معادلسازی مدرک (Anerkennung)',
    ctaPage: 'degree-recognition-for-immigration',
  },
  {
    key: 'defizit-16d',
    label: 'ویزای تکمیل دوره و تطبیق (§ 16d AufenthG)',
    requirement: 'نامه کسری واحد (Defizitbescheid) + زبان B1 + قرارداد با کارفرما',
    salary: 'دریافت حقوق همزمان در دوره تطبیقی ۶ تا ۱۲ ماهه',
    summary:
      'در صورتی که اداره ارزشیابی آلمان برای مدرک شما کسری واحد صادر کند، با زبان آلمانی سطح B1 و قرارداد کار با یک مرکز درمانی وارد آلمان می‌شوید، همزمان به عنوان کمک پرستار کار و حقوق دریافت می‌کنید و دوره تطبیقی را می‌گذرانید.',
    ctaLabel: 'مشاهده مهاجرت پزشکان و کادر درمان آلمان',
    ctaPage: 'medical-germany',
  },
  {
    key: 'ausbildung',
    label: 'آوسبیلدونگ کمک پرستاری (۱ تا ۲ ساله)',
    requirement: 'دیپلم ۱۲ ساله + مدرک زبان آلمانی B1/B2 (بدون نیاز به مدرک پزشکی قبلی)',
    salary: '۱,۰۵۰ تا ۱,۲۵۰ یورو کمک‌هزینه آموزشی ماهانه از ماه اول',
    summary:
      'اگر مدرک تحصیلی یا سابقه کادر درمان ندارید، می‌توانید در دوره آموزشی ۱ تا ۲ ساله Pflegefachhelfer Ausbildung شرکت کنید، از ماه اول حقوق آموزشی دریافت کنید و بلافاصله پس از پایان دوره در کلینیک‌ها استخدام شوید.',
    ctaLabel: 'بررسی جزئیات آوسبیلدونگ آلمان',
    ctaPage: 'ausbildung-germany',
  },
];

const COMPARISON_TABLE = [
  ['مدرک تحصیلی پایه', 'مدرک کمک پرستاری (۱ تا ۲ ساله) یا کاردانی مرتبط', 'کارشناسی یا کارشناسی ارشد پیوسته پرستاری'],
  ['سطح زبان مورد نیاز', 'حداقل B1 آلمانی (در برخی ایالت‌ها B2)', 'الزامی در سطح B2 آلمانی'],
  ['وظایف شغلی در آلمان', 'مراقبت‌های اولیه، کمک در امور روزمره، ثبت علائم حیاتی پایه زیر نظر پرستار', 'مدیریت کامل درمان بیمار، تزریقات تخصصی، دارودهی و نظارت بر تیم مراقبت'],
  ['میانگین حقوق ناخالص (۲۰۲۶)', '۲,۶۰۰ تا ۳,۲۰۰ یورو در ماه', '۳,۵۰۰ تا ۴,۴۰۰ یورو در ماه'],
  ['زمان معادلسازی مدرک', '۳ تا ۶ ماه', '۴ تا ۸ ماه'],
];

const STEPS = [
  {
    step: 'گام اول',
    title: 'آماده‌سازی و ترجمه رسمی مدارک',
    detail: 'ترجمه رسمی دانشنامه، ریزنمرات، گواهی‌های دوره‌های کمک پرستاری و سوابق بیمه تامین اجتماعی به آلمانی با تایید دادگستری و امور خارجه.',
  },
  {
    step: 'گام دوم',
    title: 'ارسال پرونده برای معادلسازی (Anerkennung)',
    detail: 'ارسال مدارک به اداره سلامت و امور اجتماعی ایالت مقصد (مثل Regierung von Oberbayern یا Bezirksregierung Münster).',
  },
  {
    step: 'گام سوم',
    title: 'دریافت تاییدیه معادلسازی یا نامه Defizitbescheid',
    detail: 'دریافت برگه رسمی ارزیابی مدارک از آلمان مبنی بر تایید کامل یا نیاز به دوره تطبیقی کوتاه‌مدت.',
  },
  {
    step: 'گام چهارم',
    title: 'مصاحبه آنلاین، جاب‌آفر و پیش‌تاییدیه (Vorabzustimmung)',
    detail: 'مصاحبه با کارفرمایان بیمارستانی یا مراکز سالمندان آلمان، امضای قرارداد مطابق تعرفه ۲۰۲۶ و تسریع وقت از مسیر نیروی متخصص.',
  },
  {
    step: 'گام پنجم',
    title: 'وقت سفارت آلمان و دریافت ویزای ملی (نوع D)',
    detail: 'ارائه قرارداد و مدارک به کارگزاری ویزامتریک یا سفارت آلمان در تهران و دریافت ویزای کار.',
  },
];

const faqs = [
  {
    q: 'آیا با مدرک کمک پرستاری جهاد دانشگاهی یا فنی‌وحرفه‌ای می‌توان ویزای کار آلمان گرفت؟',
    a: 'بله؛ به شرطی که دوره گذرانده‌شده دارای سرفصل‌های مشخص نظری و کارآموزی بالینی باشد و توسط اداره ارزشیابی ایالت مقصد در آلمان به عنوان دوره معتبر به رسمیت شناخته شود. در غیر این صورت، مسیر آوسبیلدونگ کمک پرستاری جایگزین مطمئن‌تری است.',
  },
  {
    q: 'آیا برای ویزای کار کمک پرستاری آلمان محدودیت سنی وجود دارد؟',
    a: 'در قانون ویزای کار آلمان محدودیت سنی مطلق وجود ندارد؛ اما متقاضیان بالای ۴۵ سال برای دریافت ویزای کار باید قرارداد کاری با حقوقی بالاتر از سقف تعیین‌شده سالانه (حدود ۵۳,۰۰۰ یورو در سال ۲۰۲۶) ارائه دهند یا سابقه بیمه بازنشستگی مکفی نشان دهند.',
  },
  {
    q: 'آیا می‌توانیم همسر و فرزندان خود را همزمان به آلمان ببریم؟',
    a: 'بله؛ در صورتی که قرارداد کاری شما حقوق خالصی بالاتر از حداقل معیشت خانواده در ایالت مقصد داشته باشد و فضای مسکن متناسب (حداقل متراژ قانونی به ازای هر نفر) تامین شود، همسر و فرزندان زیر ۱۸ سال می‌توانند ویزای پیوست دریافت کنند.',
  },
  {
    q: 'مدرک زبان آلمانی برای کمک پرستاری حتماً باید B2 باشد؟',
    a: 'برای شروع کار از طریق ویزای معادلسازی (§ 16d) یا دوره‌های آوسبیلدونگ در بسیاری از ایالت‌ها مدرک B1 کافی است، اما برای دریافت مجوز رسمی و دائمی عنوان شغلی کمک پرستار آموزش‌دیده در اکثر ایالت‌ها ارائه مدرک B2 الزامی است.',
  },
];

const tocItems = [
  { id: 'requirements', label: 'شرایط اصلی اخذ ویزای کار کمک پرستاری' },
  { id: 'comparison', label: 'تفاوت کمک پرستار (Pflegehelfer) و پرستار' },
  { id: 'pathways', label: 'مسیرهای قانونی کار مستقیم و آوسبیلدونگ' },
  { id: 'step-by-step', label: 'مراحل گام‌به‌گام از ایران تا آلمان' },
  { id: 'salary-and-pr', label: 'حقوق ۲۰۲۶ و شرایط اقامت دائم' },
  { id: 'expert-insights', label: 'انتخاب ایالت مناسب و تعرفه دستمزد' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const GermanyNursingAssistantVisaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedPathKey, setSelectedPathKey] = useState<string>('direct-work');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedPath =
    NURSING_PATHWAYS.find((p) => p.key === selectedPathKey) || NURSING_PATHWAYS[0];

  useSeo({
    title: 'نحوه اخذ ویزای کار کمک پرستاری آلمان ۲۰۲۶-۲۰۲۷ | شرایط، مدرک زبان و حقوق | دیاکو',
    description:
      'راهنمای جامع نحوه اخذ ویزای کار کمک پرستاری آلمان (Pflegehelfer) در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی شرایط معادلسازی مدرک، زبان آلمانی B1/B2 و حقوق ماهانه.',
    canonical: 'https://www.dia-co.ir/germany-nursing-assistant-visa',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'ویزای کار کمک پرستاری آلمان ۲۰۲۶',
      'Pflegehelfer آلمان',
      'معادلسازی مدرک کمک پرستاری Anerkennung',
      'آوسبیلدونگ کمک پرستاری آلمان',
      'حقوق کمک پرستار در آلمان ۲۰۲۶',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/germany-nursing-assistant-visa/#article',
          headline: 'نحوه اخذ ویزای کار کمک پرستاری آلمان ۲۰۲۶-۲۰۲۷ | شرایط، مدرک زبان و حقوق',
          description:
            'راهنمای جامع نحوه اخذ ویزای کار کمک پرستاری آلمان (Pflegehelfer) در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی شرایط معادلسازی مدرک، زبان آلمانی B1/B2 و حقوق ماهانه.',
          image: [
            'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:20:00+03:30',
          dateModified: '2026-11-14T13:20:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و کاریابی بین‌الملل هلدینگ مهاجرتی دیاکو',
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
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.dia-co.ir/favicon.svg',
            },
          },
          citation: [
            'https://www.make-it-in-germany.com/en/working-in-germany/professions-in-demand/nursing',
            'https://www.anerkennung-in-deutschland.de/',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/germany-nursing-assistant-visa',
          },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/germany-nursing-assistant-visa/#howto',
          name: 'مراحل گام‌به‌گام اخذ ویزای کار کمک پرستاری آلمان',
          step: STEPS.map((s, idx) => ({
            '@type': 'HowToStep',
            position: idx + 1,
            name: s.title,
            text: s.detail,
          })),
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/germany-nursing-assistant-visa/#faq',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        },
      ],
    },
  });

  const navigateInternal = (page: string) => {
    if (onNavigateToPage) onNavigateToPage(page);
    else window.location.pathname = `/${page}`;
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#06181f] text-white">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-white/10 bg-[#08222b]/90 backdrop-blur-md">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 md:px-8 text-xs">
          <div className="flex items-center gap-2 text-slate-300 flex-wrap">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-[#f5a623] transition font-semibold cursor-pointer"
            >
              صفحه اصلی دیاکو
            </button>
            <span className="text-slate-500">‹</span>
            <button
              type="button"
              onClick={() => navigateInternal('medical-germany')}
              className="hover:text-[#f5a623] transition cursor-pointer"
            >
              کادر درمان آلمان
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">ویزای کار کمک پرستاری آلمان ۲۰۲۶–۲۰۲۷</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('germany-nursing-assistant-visa')}
                className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 font-bold text-cyan-200 hover:bg-cyan-500/20 transition cursor-pointer"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>نسخه مقاله در وبلاگ</span>
              </button>
            )}
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition cursor-pointer font-semibold"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>بازگشت</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero + BLUF Box */}
      <section className="relative overflow-hidden py-12 md:py-16 border-b border-white/10">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-wrap items-center gap-2.5 text-xs mb-4">
            <span className="rounded-full bg-emerald-500/15 border border-emerald-400/40 px-3 py-1 font-bold text-emerald-300 flex items-center gap-1.5">
              <Stethoscope className="h-3.5 w-3.5" />
              ویژه کادر درمان و کمک پرستاران ۲۰۲۶–۲۰۲۷
            </span>
            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              مطابق مصوبه دستمزد ۲۰۲۶ آلمان
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-cyan-300" />
              بازبینی دپارتمان کاریابی و کادر درمان دیاکو
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            نحوه اخذ ویزای کار کمک پرستاری آلمان (۲۰۲۶–۲۰۲۷): شرایط، حقوق و مراحل
          </h1>

          {/* Author & Reviewer E-E-A-T */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان حقوقی و کاریابی بین‌الملل هلدینگ مهاجرتی دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">دفتر اجرایی: </span>
              <strong className="text-amber-300">دفتر وین، مونیخ و تهران</strong>
            </div>
          </div>

          {/* BLUF Box */}
          <div className="mt-6 rounded-3xl border border-emerald-400/40 bg-gradient-to-l from-[#0b332f] via-[#092731] to-[#081f27] p-6 md:p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-black text-emerald-300 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج AI)</span>
            </div>
            <p className="text-sm md:text-base leading-8 text-slate-100 text-justify">
              ویزای کار کمک پرستاری آلمان (Pflegehelfer / Pflegefachhelfer) در سال‌های ۲۰۲۶ و ۲۰۲۷ یکی از سریع‌ترین و
              پرتقاضاترین مسیرهای مهاجرت کاری برای کادر درمان است. به دلیل کمبود شدید نیروی پرستاری در آلمان، شما
              می‌توانید از دو مسیر اصلی اقدام کنید: ۱){' '}
              <strong className="text-amber-300">ویزای کاری مستقیم</strong> (در صورت داشتن مدرک تحصیلی یا دوره فنی
              کمک پرستاری معتبر، معادلسازی مدرک / Anerkennung، مدرک زبان آلمانی حداقل B1 و پیشنهاد شغلی از کارفرما) و
              ۲){' '}
              <strong className="text-cyan-300">ویزای آوسبیلدونگ کمک پرستاری</strong> (دوره آموزشی ۱ تا ۲ ساله همراه با
              حقوق ماهانه). حداقل حقوق ناخالص کمک پرستاران در آلمان در سال ۲۰۲۶ حدود{' '}
              <strong className="text-emerald-300">۲,۶۰۰ تا ۳,۲۰۰ یورو در ماه</strong> است.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>ارزیابی مدارک کمک پرستاری برای آلمان</span>
              <FileCheck className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('degree-recognition-for-immigration')}
              className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-500/20 px-5 py-3.5 text-sm font-bold text-cyan-200 transition cursor-pointer"
            >
              راهنمای معادلسازی مدرک (ZAB/Anabin)
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('ausbildung-germany')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              آوسبیلدونگ آلمان
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:px-8 max-w-6xl space-y-12">
        {/* Table of Contents */}
        <nav aria-label="فهرست مطالب" className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-2 text-sm font-black text-amber-300 mb-4">
            <List className="h-4 w-4" />
            <span>فهرست مطالب راهنمای کمک پرستاری آلمان</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            {tocItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#08222b] px-3 py-2.5 text-slate-200 hover:border-[#f5a623] hover:text-amber-300 transition"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-400/15 text-[10px] font-black text-amber-300">
                  {idx + 1}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Requirements */}
        <section id="requirements" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white">
            شرایط اصلی اخذ ویزای کار کمک پرستاری آلمان در سال ۲۰۲۶–۲۰۲۷
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            از آنجا که شغل کمک پرستاری در آلمان جزو مشاغل قانونمند (Regulated Professions / Reglementierte Berufe)
            محسوب می‌شود، اداره مهاجرت و ادارات بهداشت ایالتی آلمان پیش از صدور مجوز کار موارد زیر را بررسی می‌کنند:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'مدرک تحصیلی یا گواهی مهارتی معتبر',
                desc: 'داشتن مدرک کاردانی یا کارشناسی پرستاری/مامایی/اتاق عمل، یا گواهی رسمی دوره کمک پرستاری (حداقل ۱ ساله) از مراکز معتبر (مانند جهاد دانشگاهی یا سازمان فنی‌وحرفه‌ای با ساعات آموزشی استاندارد).',
              },
              {
                title: 'مدرک زبان آلمانی معتبر (B1 تا B2)',
                desc: 'ارائه مدرک زبان آلمانی در سطح B1 (برای شروع معادلسازی یا دوره‌های تطبیقی) و B2 (برای مجوز کار قطعی در اکثر ایالت‌ها) از موسسات مورد تایید سفارت (Goethe، ÖSD یا Telc).',
              },
              {
                title: 'تاییدیه معادلسازی مدرک (Anerkennung)',
                desc: 'بررسی سرفصل‌های آموزشی شما توسط اداره ایالتی مربوطه در آلمان و صدور تاییدیه کامل یا نامه کسری واحد (Defizitbescheid).',
              },
              {
                title: 'پیشنهاد شغلی رسمی و گواهی سلامت',
                desc: 'قرارداد کاری معتبر (Arbeitsvertrag) از بیمارستان، کلینیک یا مرکز سالمندان مطابق تعرفه ۲۰۲۶ همراه با تاییدیه سلامت پزشکی و عدم سوءپیشینه.',
              },
            ].map((req) => (
              <div key={req.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{req.title}</span>
                </div>
                <p className="text-xs leading-6 text-slate-300">{req.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            تفاوت کمک پرستار (Pflegehelfer) با پرستار رسمی (Pflegefachkraft) چیست؟
          </h2>
          <p className="text-xs md:text-sm text-slate-300">
            شناخت دقیق تفاوت این دو عنوان شغلی از ریجکت شدن پرونده در مرحله معادلسازی جلوگیری می‌کند:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-emerald-500/15 text-emerald-300 font-black">
                <tr>
                  <th className="p-3.5">معیار مقایسه</th>
                  <th className="p-3.5">کمک پرستار (Pflegehelfer)</th>
                  <th className="p-3.5">پرستار رسمی (Pflegefachkraft)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {COMPARISON_TABLE.map((row) => (
                  <tr key={row[0]} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-white whitespace-nowrap">{row[0]}</td>
                    <td className="p-3.5 text-amber-200 leading-6">{row[1]}</td>
                    <td className="p-3.5 text-cyan-200 leading-6">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Pathways Selector */}
        <section id="pathways" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              مسیرهای قانونی مهاجرت کمک پرستاران به آلمان (کاری مستقیم و آوسبیلدونگ)
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-300">
              بر اساس مدرک فعلی و سطح زبان آلمانی خود، یکی از سه مسیر زیر را انتخاب و بررسی کنید:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {NURSING_PATHWAYS.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setSelectedPathKey(p.key)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer border ${
                  selectedPathKey === p.key
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-emerald-400/25 bg-[#06181f] p-5 md:p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <h3 className="text-base md:text-lg font-black text-amber-300">{selectedPath.label}</h3>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300">
                {selectedPath.salary}
              </span>
            </div>
            <p className="text-xs text-cyan-200 font-semibold">پیش‌نیاز اصلی: {selectedPath.requirement}</p>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">{selectedPath.summary}</p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateInternal(selectedPath.ctaPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                {selectedPath.ctaLabel} ←
              </button>
            </div>
          </div>
        </section>

        {/* Step by Step */}
        <section id="step-by-step" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white">
            مراحل گام‌به‌گام اخذ ویزای کار کمک پرستاری از ایران تا آلمان (۶ تا ۱۰ ماه)
          </h2>
          <div className="grid gap-4 md:grid-cols-5">
            {STEPS.map((item) => (
              <div key={item.step} className="rounded-2xl border border-white/10 bg-[#06181f] p-4 space-y-2">
                <span className="inline-block w-fit rounded-lg bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-0.5 text-[11px] font-black text-emerald-300">
                  {item.step}
                </span>
                <h3 className="text-xs font-black text-white leading-5">{item.title}</h3>
                <p className="text-[11px] leading-6 text-slate-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Salary & PR */}
        <section id="salary-and-pr" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-amber-300">
            <Euro className="h-5 w-5" />
            <h2 className="text-xl md:text-2xl font-black text-white">
              میزان حقوق، مزایا و شرایط اقامت دائم کمک پرستاران در آلمان (۲۰۲۶)
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3 text-xs md:text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
              <strong className="text-emerald-300 block">حداقل دستمزد قانونی در سال ۲۰۲۶</strong>
              <p className="text-slate-300 leading-6">
                طبق مصوبه کمیسیون دستمزد بخش مراقبت آلمان (Pflegekommission)، حقوق تمام‌وقت بین ۲,۶۰۰ تا ۳,۲۰۰ یورو
                ناخالص در ماه (بسته به ایالت، سابقه و شیفت‌های شب/تعطیلات) است.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
              <strong className="text-amber-300 block">مسیر اقامت دائم (Niederlassungserlaubnis)</strong>
              <p className="text-slate-300 leading-6">
                پس از ۳ سال کار تمام‌وقت، پرداخت بیمه بازنشستگی و زبان آلمانی B1 واجد شرایط اقامت دائم و پس از ۵ سال
                (یا ۳ سال با C1) واجد شرایط پاسپورت آلمان می‌شوید.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
              <strong className="text-cyan-300 block">امکان ارتقای شغلی با هزینه کارفرما</strong>
              <p className="text-slate-300 leading-6">
                بسیاری از کارفرمایان بیمارستانی در حین کار، هزینه تحصیل تکمیلی شما را برای ارتقا به رتبه پرستار رسمی
                (Pflegefachkraft) پرداخت می‌کنند.
              </p>
            </div>
          </div>
        </section>

        {/* Information Gain */}
        <section
          id="expert-insights"
          className="rounded-3xl border border-rose-400/35 bg-gradient-to-l from-rose-950/35 via-[#0a232d] to-[#081f27] p-6 md:p-8 space-y-4"
        >
          <div className="flex items-center gap-2 text-rose-300 font-black text-sm">
            <AlertTriangle className="h-5 w-5" />
            <span>نکته تجربی از پرونده‌های واقعی (Information Gain — هلدینگ مهاجرتی دیاکو)</span>
          </div>
          <p className="text-sm leading-8 text-slate-100 text-justify">
            بر اساس تجربه مستقیم تیم حقوقی و کاریابی هلدینگ مهاجرتی دیاکو در پرونده‌های کادر درمان، بزرگ‌ترین چالش
            متقاضیان کمک پرستاری ایران، «عدم تطابق ساعات آموزش عملی و تئوری گواهی‌های داخلی با استانداردهای ایالت‌های
            آلمان» است. برای مثال، ایالت‌هایی مانند بایرن و بادن-وورتمبرگ در بررسی ریزنمرات بسیار سخت‌گیرتر از ایالت‌هایی
            مانند نوردراین-وستفالن یا نیدرزاکسن عمل می‌کنند.
          </p>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            همچنین بسیاری از متقاضیان به دلیل انتخاب نادرست کارفرما، قراردادهایی امضا می‌کنند که حقوق آن‌ها پایین‌تر از
            حداقل تعرفه جدید سال ۲۰۲۶ است و در نتیجه اداره کار آلمان (Bundesagentur für Arbeit) قرارداد را رد می‌کند.
            تیم دیاکو پیش از ارسال پرونده برای معادلسازی، ایالت مناسب با رزومه شما را انتخاب کرده و قرارداد کاری را
            پیش از امضا با قوانین دستمزد ۲۰۲۶ ممیزی می‌کند.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول ویزای کار کمک پرستاری آلمان (FAQ)</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-[#06181f] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-right text-sm font-bold text-white hover:bg-white/[0.03] transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-amber-300 shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="border-t border-white/10 px-4 py-3 text-xs md:text-sm leading-7 text-slate-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Internal & Official Links Footer Card */}
        <section className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              <span>راهنماهای مکمل کادر درمان و آلمان در دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'medical-germany', label: 'مهاجرت پزشکان و پرستاران به آلمان' },
                { page: 'ausbildung-germany', label: 'دوره‌های آوسبیلدونگ آلمان' },
                { page: 'degree-recognition-for-immigration', label: 'معادل‌سازی مدرک تحصیلی (Anerkennung / ZAB)' },
                { page: 'jobseeker-germany', label: 'کارت فرصت آلمان (Chancenkarte)' },
                { page: 'medical-austria-nursing', label: 'مهاجرت پرستاران به اتریش' },
                { page: 'best-countries-to-immigrate-to', label: 'بهترین کشور برای مهاجرت ۲۰۲۶-۲۰۲۷' },
              ].map((link) => (
                <button
                  key={link.page}
                  type="button"
                  onClick={() => navigateInternal(link.page)}
                  className="text-right rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-slate-200 hover:border-amber-400/50 hover:text-amber-300 transition cursor-pointer"
                >
                  ← {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-black text-cyan-300 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>منابع رسمی دولتی آلمان و تماس مستقیم</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                {
                  label: 'پورتال رسمی پرستاری در آلمان (Make it in Germany)',
                  url: 'https://www.make-it-in-germany.com/en/working-in-germany/professions-in-demand/nursing',
                },
                {
                  label: 'سامانه رسمی معادلسازی مدارک در آلمان (Anerkennung)',
                  url: 'https://www.anerkennung-in-deutschland.de/',
                },
              ].map((src) => (
                <a
                  key={src.url}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-slate-200 hover:text-cyan-300 transition"
                >
                  <span>{src.label}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="tel:02191693955"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-[#082833] hover:bg-amber-300 transition"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>تهران: 021-91693955</span>
              </a>
              <span className="text-[11px] text-slate-300" dir="ltr">
                WhatsApp EU: +43 688 976 3256
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GermanyNursingAssistantVisaPage;
