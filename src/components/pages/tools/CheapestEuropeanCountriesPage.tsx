import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Euro,
  ShieldCheck,
  Trophy,
  GraduationCap,
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

const RANKED_COUNTRIES = [
  {
    key: 'italy',
    rank: 'رتبه ۱',
    label: 'ایتالیا — تحصیل رایگان + کمک‌هزینه ۷,۰۰۰ یورو 🇮🇹',
    entryBudget: '۵,۰۰۰ تا ۷,۵۰۰ یورو',
    monthlyCost: '۶۵۰ تا ۹۵۰ یورو',
    summary:
      'ایتالیا در سال‌های ۲۰۲۶ و ۲۰۲۷ در صدر ارزان‌ترین مقاصد مهاجرتی برای ایرانیان قرار دارد. بورسیه استانی ایتالیا (DSU) بر اساس وضعیت اقتصادی خانواده در ایران اعطا می‌شود و شامل معافیت ۱۰۰٪ شهریه، خوابگاه رایگان/کمک‌هزینه مسکن، بن غذای روزانه و ۶,۵۰۰ تا ۷,۵۰۰ یورو کمک‌هزینه نقدی سالانه در مقاطع کارشناسی، ارشد و دکتری است.',
    ctaLabel: 'بررسی بودجه ۱ میلیارد تومان (بورسیه ایتالیا و اتریش)',
    ctaPage: 'migrate-with-1-billion-toman',
  },
  {
    key: 'germany',
    rank: 'رتبه ۲',
    label: 'آلمان — آوسبیلدونگ با حقوق یا تحصیل رایگان 🇩🇪',
    entryBudget: '۶,۰۰۰ تا ۸,۵۰۰ یورو (بدون نیاز به بلوکه)',
    monthlyCost: '۹۵۰ تا ۱,۲۰۰ یورو',
    summary:
      'در مسیر آوسبیلدونگ (Ausbildung) با دیپلم و زبان آلمانی B1/B2 بدون پرداخت حتی ۱ یورو شهریه وارد دوره‌های فنی‌وحرفه‌ای شده و از ماه اول ۱,۰۵۰ تا ۱,۳۰۰ یورو حقوق می‌گیرید. دانشگاه‌های دولتی اکثر ایالت‌ها نیز رایگان بوده و تنها ۱۵۰ تا ۳۵۰ یورو هزینه خدمات و بلیت شهری دارند.',
    ctaLabel: 'مشاهده شرایط کامل آوسبیلدونگ آلمان',
    ctaPage: 'ausbildung-germany',
  },
  {
    key: 'austria',
    rank: 'رتبه ۳',
    label: 'اتریش — شهریه €۷۵۲.۹۲ در ترم (با ÖH) و کیفیت برتر زندگی 🇦🇹',
    entryBudget: '۸,۰۰۰ تا ۱۰,۰۰۰ یورو',
    monthlyCost: '۹۵۰ تا ۱,۲۵۰ یورو (گراتس و لینتس ارزان‌تر)',
    summary:
      'تحصیل در دانشگاه‌های دولتی اتریش برای ایرانیان در سال ۲۰۲۶ معادل €۷۲۶.۷۲ شهریه بعلاوه €۲۶.۲۰ حق عضویت ÖH (مجموع €۷۵۲.۹۲ در هر ترم) است. برخلاف آلمان، برای ویزای دانشجویی اتریش نیازی به افتتاح حساب بلوکه‌شده در اروپا نیست و امکان کار دانشجویی تا ۲۰ ساعت در هفته بخش عمده مخارج وین یا گراتس را پوشش می‌دهد.',
    ctaLabel: 'مشاهده تحصیل در دانشگاه‌های دولتی اتریش',
    ctaPage: 'academic-austria',
  },
  {
    key: 'hungary',
    rank: 'رتبه ۴',
    label: 'مجارستان — ارزان‌ترین هزینه زندگی و مالیات ۹٪ شینگن 🇭🇺',
    entryBudget: '۷,۰۰۰ تا ۱۲,۰۰۰ یورو',
    monthlyCost: '۵۵۰ تا ۸۰۰ یورو',
    summary:
      'بوداپست عضو شینگن است اما به دلیل استفاده از فورینت (HUF)، اجاره اتاق دانشجویی یا آپارتمان نقلی بین ۳۵۰ تا ۵۵۰ یورو و خوراک/حمل‌ونقل حدود ۲۵۰ یورو است. ثبت شرکت Kft در مجارستان نیز کمترین مالیات سود شرکتی در اتحادیه اروپا (۹٪) را ارائه می‌دهد.',
    ctaLabel: 'مشاهده جزئیات ثبت شرکت و اقامت مجارستان',
    ctaPage: 'business-hungary',
  },
  {
    key: 'portugal',
    rank: 'رتبه ۵',
    label: 'پرتغال — ارزان‌ترین خودحمایتی D7 بدون مدرک زبان 🇵🇹',
    entryBudget: '۱۲,۰۰۰ تا ۱۵,۰۰۰ یورو (تمکن بانکی)',
    monthlyCost: '۸۰۰ تا ۱,۱۰۰ یورو',
    summary:
      'اگر دانشجو نیستید و مدرک زبان ندارید اما درآمد غیرفعال در ایران (اجاره ملک، سود سپرده یا سهام) معادل حداقل حدود ۹۲۰ یورو در ماه دارید، ویزای D7 پرتغال بدون خرید ملک و بدون ثبت شرکت اقامت اروپا و مسیر ۵ ساله تا پاسپورت را به شما می‌دهد.',
    ctaLabel: 'بررسی راحت‌ترین کشورها برای مهاجرت ۲۰۲۷',
    ctaPage: 'easiest-countries-to-immigrate-2027',
  },
];

const RANKING_TABLE = [
  ['۱', 'ایتالیا 🇮🇹', 'تحصیلی با بورسیه استانی (DSU)', '۵,۰۰۰ تا ۷,۵۰۰ یورو', '۶۵۰ تا ۹۵۰ یورو', 'تحصیل رایگان + دریافت حدود ۷,۰۰۰ یورو کمک‌هزینه سالانه'],
  ['۲', 'آلمان 🇩🇪', 'آوسبیلدونگ (Ausbildung) یا جاب‌آفر', '۶,۰۰۰ تا ۸,۵۰۰ یورو (بدون بلوکه)', '۹۵۰ تا ۱,۲۰۰ یورو', 'دریافت حقوق ماهانه ۱,۰۵۰ تا ۱,۳۰۰ یورو از ماه اول آموزش'],
  ['۳', 'اتریش 🇦🇹', 'تحصیل در دانشگاه‌های دولتی (وین/گراتس)', '۸,۰۰۰ تا ۱۰,۰۰۰ یورو', '۹۵۰ تا ۱,۲۵۰ یورو', 'شهریه ثابت دولتی ~۷۵۰ یورو در ترم + عدم نیاز به بلوکه پول'],
  ['۴', 'مجارستان 🇭🇺', 'کالج زبان، تحصیل یا ثبت شرکت (Kft)', '۷,۰۰۰ تا ۱۲,۰۰۰ یورو', '۵۵۰ تا ۸۰۰ یورو', 'پایین‌ترین هزینه اجاره مسکن در شینگن + مالیات شرکتی ۹٪'],
  ['۵', 'پرتغال 🇵🇹', 'ویزای تمکن مالی (D7) یا دیجیتال نومد', '۱۲,۰۰۰ تا ۱۵,۰۰۰ یورو (تمکن)', '۸۰۰ تا ۱,۱۰۰ یورو', 'اقامت اروپا بدون خرید ملک، بدون ثبت شرکت و بدون مدرک زبان'],
];

const faqs = [
  {
    q: 'ارزان‌ترین کشور اروپایی برای مهاجرت کاری بدون مدرک زبان کدام است؟',
    a: 'در سال ۲۰۲۶، مهاجرت کاری مستقیم به اروپا بدون مدرک زبان عملاً بسیار محدود است؛ اما اگر تخصص فنی یا IT دارید، در کشورهایی مانند آلمان و هلند شرکت‌های بین‌المللی متعددی وجود دارند که صرفاً با زبان انگلیسی (بدون نیاز به آلمانی یا هلندی) قرارداد کاری صادر می‌کنند.',
  },
  {
    q: 'آیا هزینه زندگی در شهرهای کوچک اتریش و آلمان از پایتخت‌ها ارزان‌تر است؟',
    a: 'بله؛ به شدت. برای مثال، هزینه اجاره مسکن در شهرهایی مانند گراتس یا لینتس در اتریش یا لایپزیگ و درسدن در آلمان تا ۳۵ تا ۴۵ درصد ارزان‌تر از شهرهایی مانند وین یا مونیخ است، در حالی که کیفیت دانشگاه‌ها و خدمات شهری در همان سطح بالا قرار دارد.',
  },
  {
    q: 'برای مهاجرت خانوادگی (همسر و فرزند) ارزان‌ترین کشور اروپایی کدام است؟',
    a: 'برای خانواده‌هایی که قصد کار و تحصیل دارند، اتریش (تحصیل ارشد یا دکتری به همراه ویزای پیوست خانواده و تحصیل رایگان فرزندان در مدارس دولتی) و برای خانواده‌هایی که درآمد پایدار در ایران دارند، ویزای D7 پرتغال اقتصادی‌ترین گزینه‌ها در سال ۲۰۲۶–۲۰۲۷ هستند.',
  },
  {
    q: 'آیا می‌توان با مهاجرت به یک کشور ارزان اروپایی (مثل مجارستان)، در کشور دیگری (مثل آلمان) کار کرد؟',
    a: 'خیر؛ کارت اقامت موقت (تحصیلی، کاری یا ثبت شرکت) هر کشور عضو شینگن به شما اجازه سفر توریستی ۹۰ روزه به سایر کشورهای شینگن را می‌دهد، اما اجازه کار و اقامت دائم شما فقط در همان کشوری معتبر است که کارت اقامت را صادر کرده است.',
  },
];

const tocItems = [
  { id: 'ranking-criteria', label: '۳ شاخص رتبه‌بندی واقعی ارزان‌ترین کشورها' },
  { id: 'ranking-table', label: 'جدول رتبه‌بندی ۵ کشور ارزان اروپا (۲۰۲۶–۲۰۲۷)' },
  { id: 'rank-1-italy', label: 'رتبه ۱ تا ۳: ایتالیا، آلمان و اتریش' },
  { id: 'rank-4-hungary', label: 'رتبه ۴ و ۵: مجارستان و پرتغال D7' },
  { id: 'expert-insights', label: 'نکته دیاکو: تله بورسیه و بازگشت سرمایه' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const CheapestEuropeanCountriesPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedRankKey, setSelectedRankKey] = useState<string>('italy');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedCountry =
    RANKED_COUNTRIES.find((c) => c.key === selectedRankKey) || RANKED_COUNTRIES[0];

  useSeo({
    title: 'ارزان‌ترین کشورهای اروپایی برای مهاجرت در ۲۰۲۶-۲۰۲۷ (با رتبه‌بندی واقعی) | دیاکو',
    description:
      'رتبه‌بندی واقعی ارزان‌ترین کشورهای اروپایی برای مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی هزینه تحصیل، زندگی و ویزا در ایتالیا (DSU)، آلمان (آوسبیلدونگ)، اتریش، مجارستان و پرتغال.',
    canonical: 'https://www.dia-co.ir/cheapest-european-countries-to-immigrate',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'ارزان ترین کشورهای اروپایی برای مهاجرت ۲۰۲۶',
      'رتبه بندی کشورهای ارزان اروپا ۲۰۲۷',
      'بورسیه استانی DSU ایتالیا',
      'شهریه دانشگاه دولتی اتریش ۷۵۲.۹۲ یورو',
      'ویزای D7 پرتغال بدون خرید ملک',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/cheapest-european-countries-to-immigrate/#article',
          headline: 'ارزان‌ترین کشورهای اروپایی برای مهاجرت در ۲۰۲۶-۲۰۲۷ (با رتبه‌بندی واقعی)',
          description:
            'رتبه‌بندی واقعی ارزان‌ترین کشورهای اروپایی برای مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی هزینه تحصیل، زندگی و ویزا در ایتالیا، آلمان، اتریش، مجارستان و پرتغال.',
          image: [
            'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:26:00+03:30',
          dateModified: '2026-11-14T13:26:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان برنامه‌ریزی مالی و حقوق مهاجرت هلدینگ مهاجرتی دیاکو',
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
            'https://ec.europa.eu/eurostat',
            'https://studyinitaly.esteri.it/',
            'https://oead.at/en/',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/cheapest-european-countries-to-immigrate',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/cheapest-european-countries-to-immigrate/#faq',
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
              onClick={() => navigateInternal('best-countries-to-immigrate-to')}
              className="hover:text-[#f5a623] transition cursor-pointer"
            >
              مقایسه کشورهای اروپا
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">ارزان‌ترین کشورهای اروپایی (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('cheapest-european-countries-to-immigrate')}
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
              <Euro className="h-3.5 w-3.5" />
              رتبه‌بندی اقتصادی اروپا ۲۰۲۶–۲۰۲۷
            </span>
            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-cyan-300" />
              تایید دپارتمان برنامه‌ریزی مالی و حقوق مهاجرت دیاکو
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            ارزان‌ترین کشورهای اروپایی برای مهاجرت در ۲۰۲۶–۲۰۲۷ (با رتبه‌بندی واقعی)
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان برنامه‌ریزی مالی و حقوق مهاجرت هلدینگ دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">بازبینی اجرایی: </span>
              <strong className="text-amber-300">دفاتر وین، بوداپست، آتن و تهران</strong>
            </div>
          </div>

          {/* BLUF Box */}
          <div className="mt-6 rounded-3xl border border-emerald-400/40 bg-gradient-to-l from-[#0b332f] via-[#092731] to-[#081f27] p-6 md:p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-black text-emerald-300 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج AI)</span>
            </div>
            <p className="text-sm md:text-base leading-8 text-slate-100 text-justify">
              ارزان‌ترین کشورهای اروپایی برای مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷ بر اساس مجموع «هزینه اولیه اخذ ویزا»،
              «شهریه یا سرمایه مورد نیاز» و «هزینه ماهانه زندگی» عبارت‌اند از: ۱){' '}
              <strong className="text-amber-300">ایتالیا</strong> (بورسیه استانی DSU با پوشش شهریه و کمک‌هزینه ۷,۰۰۰
              یورویی)، ۲) <strong className="text-cyan-300">آلمان</strong> (تحصیل رایگان دانشگاه‌های دولتی و آوسبیلدونگ
              با حقوق ماهانه)، ۳) <strong className="text-emerald-300">اتریش</strong> (شهریه دولتی حدود ۷۵۰ یورو در
              ترم و عدم نیاز به حساب بلوکه‌شده سنگین)، ۴){' '}
              <strong className="text-white">مجارستان</strong> (پایین‌ترین هزینه اجاره در اروپای مرکزی و مالیات شرکتی
              ۹٪) و ۵) <strong className="text-amber-200">پرتغال</strong> (کم‌هزینه‌ترین مسیر اقامت اروپا از طریق تمکن
              مالی D7 بدون خرید ملک).
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>انتخاب اقتصادی‌ترین کشور بر اساس شرایط شما</span>
              <Trophy className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('real-cost-of-immigration-hidden-fees')}
              className="rounded-2xl border border-rose-400/35 bg-rose-500/10 hover:bg-rose-500/20 px-5 py-3.5 text-sm font-bold text-rose-200 transition cursor-pointer"
            >
              هزینه‌های پنهان مهاجرت (۲۰۲۶)
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('migrate-with-1-billion-toman')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              مهاجرت با ۱ میلیارد تومان
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
            <span>فهرست مطالب رتبه‌بندی ارزان‌ترین کشورهای اروپا</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs">
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

        {/* Ranking Criteria */}
        <section id="ranking-criteria" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white">
            معیار رتبه‌بندی واقعی ارزان‌ترین کشورهای اروپا در سال ۲۰۲۶ چیست؟
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            بسیاری از لیست‌های اینترنتی صرفاً بر اساس قیمت خرید یا اجاره کشورها را ارزان معرفی می‌کنند؛ اما در مهاجرت
            واقعی، یک کشور زمانی ارزان محسوب می‌شود که در ۳ شاخص همزمان فشار مالی کمی به متقاضی وارد کند:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: '۱. هزینه ورودی پرونده (Entry Cost)',
                desc: 'شهریه دانشگاه، سرمایه ثبت شرکت یا مبلغی که باید در بانک مسدود (Blocked) شود.',
              },
              {
                title: '۲. هزینه ماهانه زندگی (Cost of Living)',
                desc: 'اجاره یک اتاق یا آپارتمان دانشجویی، بیمه درمانی، حمل‌ونقل و خوراک در سال ۲۰۲۶.',
              },
              {
                title: '۳. پتانسیل پوشش هزینه‌ها (Income Offset)',
                desc: 'امکان دریافت حقوق آموزشی، کار دانشجویی یا کمک‌هزینه دولتی برای جبران مخارج زندگی.',
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{c.title}</span>
                </div>
                <p className="text-xs leading-6 text-slate-300">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ranking Table */}
        <section id="ranking-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول رتبه‌بندی ۵ کشور ارزان اروپایی برای مهاجرت (۲۰۲۶–۲۰۲۷)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-emerald-500/15 text-emerald-300 font-black">
                <tr>
                  <th className="p-3.5">رتبه</th>
                  <th className="p-3.5">کشور مقصد</th>
                  <th className="p-3.5">ارزان‌ترین مسیر ورود (۲۰۲۶–۲۰۲۷)</th>
                  <th className="p-3.5">حداقل بودجه اولیه</th>
                  <th className="p-3.5">هزینه زندگی (۱ نفر)</th>
                  <th className="p-3.5">مزیت مالی کلیدی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {RANKING_TABLE.map((row) => (
                  <tr key={row[1]} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-amber-300 whitespace-nowrap">{row[0]}</td>
                    <td className="p-3.5 font-black text-white whitespace-nowrap">{row[1]}</td>
                    <td className="p-3.5 text-cyan-200 font-semibold">{row[2]}</td>
                    <td className="p-3.5 text-amber-200 font-bold">{row[3]}</td>
                    <td className="p-3.5 text-slate-200 whitespace-nowrap">{row[4]}</td>
                    <td className="p-3.5 text-emerald-300 leading-6">{row[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Rank Explorer */}
        <section id="rank-1-italy" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              بررسی تخصصی رتبه‌های ۱ تا ۵ ارزان‌ترین کشورهای اروپا
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-300">
              هر کشور را انتخاب کنید تا جزئیات شهریه، اجاره مسکن، تمکن مالی و مسیر اقامت آن را ببینید:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {RANKED_COUNTRIES.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedRankKey(c.key)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer border ${
                  selectedRankKey === c.key
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                {c.rank}: {c.key === 'italy' ? 'ایتالیا' : c.key === 'germany' ? 'آلمان' : c.key === 'austria' ? 'اتریش' : c.key === 'hungary' ? 'مجارستان' : 'پرتغال'}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-emerald-400/25 bg-[#06181f] p-5 md:p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <h3 className="text-base md:text-lg font-black text-amber-300">{selectedCountry.label}</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-amber-400/15 border border-amber-400/30 px-3 py-1 font-bold text-amber-200">
                  ورود: {selectedCountry.entryBudget}
                </span>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 font-bold text-emerald-300">
                  ماهانه: {selectedCountry.monthlyCost}
                </span>
              </div>
            </div>
            <p className="text-xs md:text-sm leading-8 text-slate-200 text-justify">{selectedCountry.summary}</p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateInternal(selectedCountry.ctaPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                {selectedCountry.ctaLabel} ←
              </button>
            </div>
          </div>
        </section>

        {/* Hungary & Portugal Highlights */}
        <section id="rank-4-hungary" className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-2.5">
            <h2 className="text-base md:text-lg font-black text-amber-300">
              رتبه چهارم: مجارستان (ارزان‌ترین زندگی روزمره و مالیات ۹٪ شینگن)
            </h2>
            <p className="text-xs md:text-sm leading-7 text-slate-300 text-justify">
              بوداپست به دلیل واحد پول ملی فورینت (HUF)، اجاره اتاق دانشجویی ۳۵۰ تا ۵۵۰ یورویی و مخارج خوراک ماهانه
              حدود ۲۵۰ یورو بسیار اقتصادی است و شرکت Kft مجارستان پایین‌ترین مالیات سود شرکتی اروپا (۹٪) را دارد.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-2.5">
            <h2 className="text-base md:text-lg font-black text-cyan-300">
              رتبه پنجم: پرتغال (ارزان‌ترین خودحمایتی بدون مدرک زبان)
            </h2>
            <p className="text-xs md:text-sm leading-7 text-slate-300 text-justify">
              ویزای D7 پرتغال با اثبات درآمد ماهانه غیرفعال حدود ۹۲۰ یورو در ایران (اجاره ملک، سود سپرده یا سهام)، بدون
              خرید ملک و بدون ثبت شرکت اقامت اروپا و مسیر ۵ ساله پاسپورت پرتغال را فراهم می‌کند.
            </p>
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
            بر اساس تجربه عملی دپارتمان حقوقی و مالی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران،
            مهم‌ترین نکته درباره «کشورهای ارزان اروپایی» این است که «ارزان بودن هزینه ورود به معنای آسان بودن فرآیند
            اداری نیست». برای مثال، کوچک‌ترین اشتباه در ترجمه و تایید مدارک دارایی و اجاره‌نامه خانواده در بورسیه DSU
            ایتالیا باعث رد بورسیه می‌شود؛ یا در مجارستان و پرتغال سطح حقوق محلی نسبت به اتریش و آلمان کمتر است. برای
            ورود به بازار کار پردرآمد میان‌مدت، اتریش و آلمان بازگشت سرمایه بسیار بالاتری دارند.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول ارزان‌ترین کشورهای اروپا (FAQ)</h2>
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
              <span>مسیرهای اقتصادی و ابزارهای مرتبط در دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'migrate-with-1-billion-toman', label: 'مهاجرت با ۱ میلیارد تومان (۲۰۲۶–۲۰۲۷)' },
                { page: 'real-cost-of-immigration-hidden-fees', label: 'افشای هزینه‌های پنهان مهاجرت' },
                { page: 'academic-austria', label: 'تحصیل در دانشگاه‌های دولتی اتریش' },
                { page: 'ausbildung-germany', label: 'آوسبیلدونگ آلمان (حقوق از ماه اول)' },
                { page: 'cost-calculator', label: 'ماشین‌حساب آنلاین هزینه مهاجرت' },
                { page: 'best-countries-to-immigrate-to', label: 'بهترین کشور برای مهاجرت (۲۰۲۶–۲۰۲۷)' },
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
              <span>منابع رسمی اروپایی و تماس مستقیم</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'آمار هزینه زندگی اتحادیه اروپا (Eurostat)', url: 'https://ec.europa.eu/eurostat' },
                { label: 'پورتال رسمی تحصیل در ایتالیا (Study in Italy)', url: 'https://studyinitaly.esteri.it/' },
                { label: 'سازمان آموزش عالی اتریش (OeAD)', url: 'https://oead.at/en/' },
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

export default CheapestEuropeanCountriesPage;
