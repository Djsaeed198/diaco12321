import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Wallet,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  BookOpen,
  ExternalLink,
  AlertTriangle,
  List,
  Award,
  Calendar,
  Calculator,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const BUDGET_PROFILE_MODES = [
  {
    key: 'study-dsu-austria',
    label: 'مسیر تحصیلی ارزان و بورسیه‌دار (ایتالیا DSU / اتریش دولتی)',
    budget: '۶۰۰ میلیون تا ۱.۲ میلیارد تومان',
    highlights: [
      'ایتالیا (بورسیه استانی DSU): با ارائه مدارک درآمدی و اجاره‌نامه در ایران، شهریه دانشگاه (۲ تا ۳ هزار یورو) صفر می‌شود، خوابگاه/کمک‌هزینه مسکن می‌گیرید و سالانه حدود ۷,۰۰۰ یورو به حساب شما واریز می‌گردد.',
      'اتریش (دانشگاه‌های دولتی وین و گراتس): شهریه در سال ۲۰۲۶ تنها حدود ۷۴۶ یورو در هر ترم است و برخلاف آلمان، نیازی به مسدودسازی ۱۲ هزار یورو در Blocked Account نیست.',
      'هزینه‌های واقعی ۱ میلیارد تومانی صرف ترجمه رسمی، آزمون زبان، اپلیکیشن‌فی، بلیت پرواز و استقرار ۱ تا ۲ ماه اول می‌شود.',
    ],
    ctaLabel: 'مشاهده تحصیل در دانشگاه‌های دولتی اتریش',
    ctaPage: 'academic-austria',
  },
  {
    key: 'work-ausbildung',
    label: 'مهاجرت کاری و آوسبیلدونگ (آلمان / عمان و امارات)',
    budget: '۶۰۰ میلیون تا ۱.۱ میلیارد تومان',
    highlights: [
      'آوسبیلدونگ آلمان (Ausbildung): با دیپلم ۱۲ ساله و زبان آلمانی B1/B2، در رشته‌های پرستاری، مکانیک، برق، IT و هتلداری از ماه اول ۱,۰۵۰ تا ۱,۳۰۰ یورو حقوق می‌گیرید و نیازی به حساب بلوکه ۱۲ هزار یورویی ندارید.',
      'ویزای کار مستقیم آلمان و اتریش: برای کادر درمان (پرستاران و کمک‌پرستاران)، مهندسان و برنامه‌نویسان با حقوق ۲,۸۰۰ تا ۴,۵۰۰ یورو در ماه (بسیاری کارفرمایان هزینه پرواز/معادلسازی را می‌پردازند).',
      'بازار کار عمان و امارات: با بودجه ۶۰۰ تا ۸۰۰ میلیون تومان و مکالمه انگلیسی، سریع‌ترین خروج (۳ تا ۶ هفته) و درآمد بدون مالیات.',
    ],
    ctaLabel: 'مشاهده شرایط آوسبیلدونگ آلمان',
    ctaPage: 'ausbildung-germany',
  },
  {
    key: 'language-college',
    label: 'کالج زبان بدون مدرک زبان اولیه (مجارستان و اتریش)',
    budget: '۹۰۰ میلیون تا ۱.۲ میلیارد تومان',
    highlights: [
      'اگر هنوز مدرک زبان آیلتس یا آلمانی B1 ندارید، دوره‌های کالج زبان در مجارستان یا اتریش تنها مسیر قانونی ورود به اروپا با این بودجه هستند.',
      'بودجه شما صرف شهریه دوره زبان، وقت سفارت و مخارج ماه‌های ابتدایی شده و پس از یادگیری زبان در خاک اروپا به اقامت تحصیلی یا کاری متصل می‌شود.',
    ],
    ctaLabel: 'مشاهده راهنمای کامل کالج زبان ۲۰۲۶–۲۰۲۷',
    ctaPage: 'language-college-visa',
  },
];

const BUDGET_1B_TABLE = [
  ['ایتالیا 🇮🇹', 'تحصیلی با بورسیه استانی (DSU)', '۶۰۰ تا ۹۰۰ میلیون تومان (۵ تا ۷.۵ هزار یورو)', 'آیلتس ۶ یا تافل معادل', 'تحصیل رایگان + کمک‌هزینه سالانه ۷,۰۰۰ یورو + خوابگاه و غذا', '۴ تا ۶ ماه'],
  ['آلمان 🇩🇪', 'دوره فنی‌وحرفه‌ای (Ausbildung)', '۷۰۰ میلیون تا ۱ میلیارد تومان (۶ تا ۸.۵ هزار یورو)', 'آلمانی سطح B1 / B2', 'حقوق آموزشی ماهانه ۱,۰۵۰ تا ۱,۳۰۰ یورو از ماه اول', '۵ تا ۸ ماه'],
  ['آلمان / اتریش 🇩🇪🇦🇹', 'ویزای کار مستقیم (Job Offer)', '۸۰۰ میلیون تا ۱.۱ میلیارد تومان (۷ تا ۹ هزار یورو)', 'آلمانی B1/B2 یا انگلیسی تخصصی', 'حقوق تمام‌وقت ماهانه ۲,۸۰۰ تا ۴,۵۰۰ یورو', '۴ تا ۷ ماه'],
  ['اتریش 🇦🇹', 'تحصیلی در دانشگاه‌های دولتی', '۹۰۰ میلیون تا ۱.۲ میلیارد تومان', 'آلمانی A2/B1 یا انگلیسی (ارشد)', 'شهریه پایین (~۷۴۶ یورو در ترم) + اجازه کار ۲۰ ساعته', '۴ تا ۶ ماه'],
  ['عمان / امارات 🇴🇲🇦🇪', 'ویزای کاری یا ثبت شرکت کوچک', '۶۰۰ تا ۹۵۰ میلیون تومان (۵ تا ۸ هزار دلار)', 'مکالمه انگلیسی در سطح کار', 'درآمد بدون مالیات در خلیج فارس و امکان پس‌انداز بالا', '۳ تا ۶ هفته'],
];

const HIGHER_BUDGETS_TABLE = [
  ['۱.۵ تا ۲ میلیارد تومان (۱۲ تا ۱۶ هزار یورو)', 'ویزای تحصیلی آلمان (تامین کامل حساب بلوکه‌شده ۱ ساله ۱۲,۰۰۰ یورویی) + کارت فرصت آلمان (Chancenkarte) برای ۱ سال جستجوی کار'],
  ['۲.۵ تا ۴ میلیارد تومان (۲۰ تا ۳۲ هزار یورو)', 'ثبت شرکت Kft در مجارستان و دریافت اقامت اروپا + ویزای تمکن مالی (D7) پرتغال برای یک نفر'],
  ['۵ میلیارد تومان به بالا (۴۰ هزار یورو به بالا)', 'ویزای استارتاپ اتریش (تامین سرمایه ثبتی شرکت) + اقامت خودحمایتی اتریش یا اسپانیا برای خانواده'],
];

const faqs = [
  {
    q: 'آیا با ۱ میلیارد تومان می‌توان ویزای تمکن مالی اروپا یا خرید ملک گرفت؟',
    a: 'خیر؛ در سال‌های ۲۰۲۶ و ۲۰۲۷، حداقل سرمایه برای ویزای تمکن مالی اروپا (مانند پرتغال، اسپانیا یا اتریش) نیازمند اثبات درآمد ماهانه پایدار و ذخیره بانکی معادل حدود ۱۵ تا ۳۰ هزار یورو (بین ۲ تا ۳.۵ میلیارد تومان) است و خرید ملک نیز حداقل به ۲۵۰ هزار یورو سرمایه نیاز دارد.',
  },
  {
    q: 'بهترین کشور اروپایی برای مهاجرت با ۱ میلیارد تومان بدون مدرک زبان کدام است؟',
    a: 'اگر مدرک زبان ندارید، دوره‌های کالج زبان در اتریش یا مجارستان (با بودجه حدود ۹۰۰ میلیون تا ۱.۲ میلیارد تومان برای پرداخت شهریه دوره زبان و هزینه‌های اولیه) تنها مسیر قانونی ورود به اروپا است که پس از یادگیری زبان در خاک اروپا به اقامت تحصیلی یا کاری متصل می‌شود.',
  },
  {
    q: 'آیا هزینه ۱ میلیارد تومانی شامل همراهی همسر و فرزندان هم می‌شود؟',
    a: 'در بودجه ۱ میلیارد تومانی، بهترین استراتژی این است که ابتدا نفر اصلی (با ویزای دانشجویی اتریش/ایتالیا یا ویزای کاری آلمان) وارد اروپا شود و پس از دریافت اولین حقوق یا ثبت‌نام دانشگاهی (طی ۳ تا ۶ ماه)، برای ویزای پیوست خانواده اقدام کند تا هزینه‌های اولیه به شدت کاهش یابد.',
  },
  {
    q: 'چگونه می‌توانم مطمئن شوم با بودجه فعلی من کدام مسیر شانس ویزای بالاتری دارد؟',
    a: 'ترکیب سن، مدرک تحصیلی، سابقه کار و سطح زبان شما تعیین می‌کند که آیا مسیر ایتالیا، اتریش، آلمان یا عمان برای شما مناسب‌تر است. کارشناسان ارشد هلدینگ دیاکو بر اساس همین ۴ فاکتور، یک برنامه مالی دقیق و بدون ریسک برای شما تدوین می‌کنند.',
  },
];

const tocItems = [
  { id: 'financial-reality', label: 'واقعیت مالی ۱ میلیارد تومان (۲۰۲۶-۲۰۲۷)' },
  { id: 'budget-table', label: 'جدول ۵ کشور قابل مهاجرت با ۱ میلیارد' },
  { id: 'study-pathways', label: 'مسیر تحصیلی ارزان (ایتالیا و اتریش)' },
  { id: 'work-pathways', label: 'مسیر کاری (آوسبیلدونگ آلمان، عمان)' },
  { id: 'higher-budgets', label: 'مقایسه بودجه ۲ تا ۵ میلیارد تومان' },
  { id: 'expert-insights', label: 'هشدار ویزاهای صوری و نکته دیاکو' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const MigrateWith1BillionTomanPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedModeKey, setSelectedModeKey] = useState<string>('study-dsu-austria');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedMode =
    BUDGET_PROFILE_MODES.find((m) => m.key === selectedModeKey) || BUDGET_PROFILE_MODES[0];

  useSeo({
    title: 'با ۱ میلیارد تومان کجا می‌توانم مهاجرت کنم؟ | جدول کامل ۲۰۲۶-۲۰۲۷ | دیاکو',
    description:
      'راهنمای واقعی و شفاف مهاجرت با ۱ میلیارد تومان در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی مسیرهای تحصیلی، کاری و آوسبیلدونگ در آلمان، ایتالیا، اتریش و عمان.',
    canonical: 'https://www.dia-co.ir/migrate-with-1-billion-toman',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'مهاجرت با ۱ میلیارد تومان ۲۰۲۶',
      'ارزان‌ترین کشور برای مهاجرت ۲۰۲۷',
      'بورسیه استانی ایتالیا DSU با ۱ میلیارد',
      'آوسبیلدونگ آلمان با هزینه کم',
      'مهاجرت تحصیلی اتریش با بودجه محدود',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/migrate-with-1-billion-toman/#article',
          headline: 'با ۱ میلیارد تومان کجا می‌توانم مهاجرت کنم؟ | جدول کامل ۲۰۲۶-۲۰۲۷',
          description:
            'راهنمای واقعی و شفاف مهاجرت با ۱ میلیارد تومان در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی مسیرهای تحصیلی، کاری و آوسبیلدونگ در آلمان، ایتالیا، اتریش و عمان.',
          image: [
            'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:22:00+03:30',
          dateModified: '2026-11-14T13:22:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان برنامه‌ریزی مالی و مشاوره مهاجرت هلدینگ مهاجرتی دیاکو',
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
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.dia-co.ir/favicon.svg',
            },
          },
          citation: [
            'https://www.make-it-in-germany.com/',
            'https://oead.at/en/',
            'https://studyinitaly.esteri.it/',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/migrate-with-1-billion-toman',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/migrate-with-1-billion-toman/#faq',
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
              onClick={() => navigateInternal('cost-calculator')}
              className="hover:text-[#f5a623] transition cursor-pointer"
            >
              برنامه‌ریزی مالی و هزینه مهاجرت
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">مهاجرت با ۱ میلیارد تومان (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('migrate-with-1-billion-toman')}
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
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-wrap items-center gap-2.5 text-xs mb-4">
            <span className="rounded-full bg-amber-400/15 border border-amber-400/40 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5" />
              برنامه‌ریزی مالی واقعی ۲۰۲۶–۲۰۲۷ (۸,۰۰۰ تا ۹,۰۰۰ یورو)
            </span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 font-bold text-emerald-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-cyan-300" />
              ممیزی دپارتمان برنامه‌ریزی مالی هلدینگ دیاکو
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            با ۱ میلیارد تومان کجا می‌توانم مهاجرت کنم؟ جدول کامل و واقعی (۲۰۲۶–۲۰۲۷)
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان برنامه‌ریزی مالی و مشاوره مهاجرت هلدینگ دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">نظارت اجرایی: </span>
              <strong className="text-amber-300">دفاتر تهران، وین، بوداپست و آتن</strong>
            </div>
          </div>

          {/* BLUF Box */}
          <div className="mt-6 rounded-3xl border border-amber-400/40 bg-gradient-to-l from-[#0e323f] via-[#092731] to-[#081f27] p-6 md:p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-black text-amber-300 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج AI)</span>
            </div>
            <p className="text-sm md:text-base leading-8 text-slate-100 text-justify">
              با بودجه ۱ میلیارد تومان (معادل تقریبی <strong className="text-amber-300">۸,۰۰۰ تا ۹,۰۰۰ یورو</strong> در
              سال‌های ۲۰۲۶ و ۲۰۲۷)، امکان مهاجرت از طریق خرید ملک یا ویزاهای سرمایه‌گذاری اروپا وجود ندارد؛ اما همچنان{' '}
              <strong className="text-emerald-300">۵ مسیر قانونی، واقعی و کم‌ریسک</strong> برای خروج از کشور و اخذ
              اقامت وجود دارد: ۱) مهاجرت تحصیلی با بورسیه استانی ایتالیا (DSU)، ۲) مهاجرت کاری مستقیم یا آوسبیلدونگ
              آلمان (با حقوق ماهانه)، ۳) تحصیل در دانشگاه‌های دولتی اتریش (بدون حساب بلوکه‌شده سنگین)، ۴) مهاجرت کاری
              به عمان و امارات و ۵) کالج‌های زبان در اروپای شرقی (مانند مجارستان).
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>طراحی نقشه راه بر اساس بودجه دقیق شما</span>
              <Calculator className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('cost-calculator')}
              className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-500/20 px-5 py-3.5 text-sm font-bold text-cyan-200 transition cursor-pointer"
            >
              ماشین‌حساب آنلاین هزینه مهاجرت
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('easiest-countries-to-immigrate-2027')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              راحت‌ترین کشورها در ۲۰۲۷
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
            <span>فهرست مطالب راهنمای مهاجرت با ۱ میلیارد تومان</span>
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

        {/* Financial Reality */}
        <section id="financial-reality" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white">
            واقعیت مالی مهاجرت با ۱ میلیارد تومان در سال ۲۰۲۶–۲۰۲۷ چیست؟
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            وقتی از بودجه ۱ میلیارد تومانی در سال‌های ۲۰۲۶ و ۲۰۲۷ صحبت می‌کنیم، معادل ارزی آن حدود ۸,۰۰۰ تا ۹,۰۰۰ یورو
            (یا حدود ۹,۵۰۰ دلار آمریکا) است. این مبلغ برای روش‌هایی که نیاز به حساب بلوکه‌شده ۱ ساله آلمان (حدود ۱۲,۰۰۰
            یورو) یا سرمایه‌گذاری ملکی دارند کافی نیست؛ اما اگر مهارت فنی، مدرک تحصیلی یا مدرک زبان داشته باشید، ۱ میلیارد
            تومان هزینه موارد زیر را کاملاً پوشش می‌دهد:
          </p>
          <div className="grid gap-4 md:grid-cols-2 text-xs md:text-sm">
            {[
              'هزینه‌های ترجمه رسمی مدارک و تاییدات دادگستری و وزارت امور خارجه',
              'هزینه آزمون‌های بین‌المللی زبان (آیلتس، تافل یا گوته / ÖSD)',
              'هزینه‌های اپلیکیشن‌فی دانشگاه‌ها، معادلسازی مدارک (Anerkennung) و بررسی پرونده سفارت',
              'خرید بلیت هواپیما، بیمه مسافرتی، اجاره خانه و مخارج ۱ تا ۲ ماه اول تا اولین حقوق یا قسط بورسیه',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                <span className="leading-6 text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Complete 1 Billion Table */}
        <section id="budget-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول کامل کشورهای قابل مهاجرت با بودجه ۱ میلیارد تومان (۲۰۲۶–۲۰۲۷)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-amber-400/15 text-amber-300 font-black">
                <tr>
                  <th className="p-3.5">کشور مقصد</th>
                  <th className="p-3.5">روش مهاجرتی</th>
                  <th className="p-3.5">بودجه واقعی مورد نیاز</th>
                  <th className="p-3.5">نیاز به مدرک زبان</th>
                  <th className="p-3.5">درآمد یا حمایت مالی پس از ورود</th>
                  <th className="p-3.5">زمان پروسه</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {BUDGET_1B_TABLE.map((row) => (
                  <tr key={row[0] + row[1]} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-white whitespace-nowrap">{row[0]}</td>
                    <td className="p-3.5 text-cyan-200 font-semibold">{row[1]}</td>
                    <td className="p-3.5 text-amber-200 font-bold">{row[2]}</td>
                    <td className="p-3.5 text-slate-200">{row[3]}</td>
                    <td className="p-3.5 text-emerald-300 leading-6">{row[4]}</td>
                    <td className="p-3.5 text-slate-300 whitespace-nowrap">{row[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Profile Switcher */}
        <section id="study-pathways" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              انتخاب بهترین مسیر متناسب با شرایط شما (تحصیلی، کاری یا کالج زبان)
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-300">
              مسیر مناسب با وضعیت مدرک زبان و رزومه خود را انتخاب کنید:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {BUDGET_PROFILE_MODES.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setSelectedModeKey(m.key)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer border ${
                  selectedModeKey === m.key
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-amber-400/25 bg-[#06181f] p-5 md:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <h3 className="text-base md:text-lg font-black text-amber-300">{selectedMode.label}</h3>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300">
                بودجه برآوردی: {selectedMode.budget}
              </span>
            </div>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-200">
              {selectedMode.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 leading-7">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateInternal(selectedMode.ctaPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                {selectedMode.ctaLabel} ←
              </button>
            </div>
          </div>
        </section>

        {/* Work Pathways */}
        <section id="work-pathways" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-300">
            <Briefcase className="h-5 w-5" />
            <h2 className="text-xl md:text-2xl font-black text-white">
              مسیر دوم: مهاجرت کاری با بودجه زیر ۱ میلیارد تومان (آلمان، عمان و امارات)
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3 text-xs md:text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
              <strong className="text-amber-300 block">آوسبیلدونگ آلمان (Ausbildung)</strong>
              <p className="text-slate-300 leading-6">
                با دیپلم ۱۲ ساله و زبان B1/B2 در رشته‌های پرستاری، مکانیک، برق، IT و هتلداری پذیرش می‌گیرید؛ بدون نیاز
                به حساب بلوکه ۱۲ هزار یورویی با حقوق ~۱,۱۰۰ یورو از ماه اول.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
              <strong className="text-emerald-300 block">ویزای کار مستقیم آلمان و اتریش</strong>
              <p className="text-slate-300 leading-6">
                برای پرستاران، کمک‌پرستاران، مهندسان و برنامه‌نویسان، بسیاری از کارفرمایان هزینه معادلسازی مدرک یا بلیت
                پرواز را تقبل می‌کنند.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
              <strong className="text-cyan-300 block">بازار کار عمان و امارات</strong>
              <p className="text-slate-300 leading-6">
                برای متخصصان فنی، مهندسان عمران، حسابداران و کادر درمان بدون مدرک آلمانی با بودجه ۶۰۰ تا ۸۰۰ میلیون تومان،
                سریع‌ترین مسیر خروج در ۳ تا ۶ هفته.
              </p>
            </div>
          </div>
        </section>

        {/* Higher Budgets Table */}
        <section id="higher-budgets" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            مقایسه بودجه‌های بالاتر: اگر سرمایه شما ۲ تا ۵ میلیارد تومان باشد چه گزینه‌هایی باز می‌شود؟
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-cyan-500/15 text-cyan-200 font-black">
                <tr>
                  <th className="p-3.5">میزان بودجه (تومان / یورو)</th>
                  <th className="p-3.5">مسیرهای مهاجرتی جدید که باز می‌شوند</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {HIGHER_BUDGETS_TABLE.map((row) => (
                  <tr key={row[0]} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-amber-300 whitespace-nowrap">{row[0]}</td>
                    <td className="p-3.5 text-slate-200 leading-6">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            بر اساس تجربه مستقیم تیم حقوقی و مالی هلدینگ مهاجرتی دیاکو در دفاتر تهران، وین، بوداپست و آتن، بزرگ‌ترین دام
            برای متقاضیانی که بودجه محدود (حدود ۱ میلیارد تومان) دارند، «وعده‌های غیرقانونی ویزای کاری تضمینی ارزان‌قیمت»
            در شبکه‌های اجتماعی است. در سال‌های ۲۰۲۶ و ۲۰۲۷، هیچ سفارتی بدون احراز مهارت واقعی، مدرک تحصیلی یا تمکن مالی
            قانونی ویزا صادر نمی‌کند. با سرمایه‌گذاری روی زبان و معادلسازی استاندارد مدارک از مسیرهای قانونی با بازگشت
            سرمایه قطعی (بورسیه ایتالیا، دانشگاه‌های اتریش یا آوسبیلدونگ آلمان) اقدام کنید.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول مهاجرت با ۱ میلیارد تومان (FAQ)</h2>
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

        {/* Internal & Official Links */}
        <section className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>مسیرهای کم‌هزینه و ابزارهای مرتبط در دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'cost-calculator', label: 'ماشین‌حساب هزینه مهاجرت ۲۰۲۶' },
                { page: 'ausbildung-germany', label: 'آوسبیلدونگ آلمان (حقوق از ماه اول)' },
                { page: 'germany-nursing-assistant-visa', label: 'ویزای کار کمک پرستاری آلمان' },
                { page: 'academic-austria', label: 'تحصیل در دانشگاه‌های دولتی اتریش' },
                { page: 'language-college-visa', label: 'مهاجرت از طریق کالج زبان' },
                { page: 'easiest-countries-to-immigrate-2027', label: 'راحت‌ترین کشور برای مهاجرت ۲۰۲۷' },
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
              <span>منابع رسمی دولتی و تماس مشاوره مالی</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'پورتال رسمی آلمان (Make it in Germany)', url: 'https://www.make-it-in-germany.com/' },
                { label: 'سازمان آموزش و مبادلات علمی اتریش (OeAD)', url: 'https://oead.at/en/' },
                { label: 'پورتال رسمی تحصیل در ایتالیا (Study in Italy)', url: 'https://studyinitaly.esteri.it/' },
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
                Wien: +43 688 976 3256
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MigrateWith1BillionTomanPage;
