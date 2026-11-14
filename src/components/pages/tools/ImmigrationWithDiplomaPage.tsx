import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  List,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const DIPLOMA_TABLE = [
  [
    'آلمان 🇩🇪',
    'دوره فنی‌وحرفه‌ای (Ausbildung)',
    'دیپلم ۱۲ ساله + ترجیحاً زیر ۳۵ سال',
    'آلمانی B1 / B2',
    'دریافت حقوق ماهانه بین ۱,۰۵۰ تا ۱,۳۵۰ یورو از ماه اول',
  ],
  [
    'آلمان 🇩🇪',
    'ویزای کار فنی (§ 18a AufenthG)',
    'مدرک فنی‌وحرفه‌ای (معادل ۲ ساله) + معادل‌سازی',
    'آلمانی B1',
    'استخدام تمام‌وقت با حقوق ۲,۷۰۰ تا ۳,۸۰۰ یورو در ماه',
  ],
  [
    'اتریش 🇦🇹',
    'کارت RWR مشاغل مورد نیاز (Mangelberufe)',
    'مدرک فنی‌وحرفه‌ای معتبر + سابقه کار + جاب‌آفر',
    'آلمانی A2/B1 یا انگلیسی',
    'حقوق تمام‌وقت طبق تعرفه رسمی اتریش (۱۴ حقوق در سال)',
  ],
  [
    'اتریش / ایتالیا 🇦🇹🇮🇹',
    'تحصیل در مقطع کارشناسی (Bachelor)',
    'مدرک دیپلم و پیش‌دانشگاهی (معدل مناسب)',
    'آلمانی B2/C1 یا آیلتس ۶',
    'شهریه رایگان در ایتالیا (بورسیه DSU) یا حدود ۷۵۰ یورو در اتریش',
  ],
  [
    'مجارستان / پرتغال 🇭🇺🇵🇹',
    'ثبت شرکت (Kft) یا ویزای تمکن مالی (D7)',
    'تمکن مالی بانکی یا سرمایه ثبتی شرکت',
    'خیر',
    'عدم نیاز به هیچ‌گونه مدرک دانشگاهی؛ اخذ اقامت کامل خانوادگی',
  ],
];

const ROUTE_EXPLORER = [
  {
    key: 'germany',
    anchor: 'germany-diploma',
    tab: 'مسیر ۱: آلمان (آوسبیلدونگ و کار فنی)',
    title: 'مسیر اول: آلمان — بهشت دیپلمه‌ها و متخصصان فنی‌وحرفه‌ای',
    badge: 'بدون نیاز به حساب بلوکه‌شده در آوسبیلدونگ',
    points: [
      'دوره‌های آوسبیلدونگ (Ausbildung): با دیپلم ۱۲ ساله و زبان آلمانی B1 یا B2 وارد دوره ۲ تا ۳ ساله (تئوری + عملی در شرکت) در رشته‌های پرستاری/کمک‌پرستاری، مکانیک خودرو، برق صنعتی، تاسیسات، برنامه‌نویسی (IT)، فروشندگی و هتلداری می‌شوید و از ماه اول حقوق می‌گیرید.',
      'ویزای کار فنی با مدرک مهارتی (§ 18a): با مدارک فنی‌وحرفه‌ای معادل ۲ ساله (جوشکاری، تاسیسات، برق، آشپزی صنعتی یا کمک‌پرستاری) پس از معادل‌سازی (Anerkennung) و داشتن قرارداد کاری + زبان B1، ویزای کار تمام‌وقت می‌گیرید.',
      'کارت فرصت آلمان (Chancenkarte): حتی با مدرک فنی‌وحرفه‌ای معادل‌سازی‌شده (بدون نیاز به لیسانس) می‌توانید ۶ امتیاز لازم را کسب کرده و تا ۱ سال در آلمان دنبال کار بگردید.',
    ],
    ctaLabel: 'مشاهده جزئیات آوسبیلدونگ آلمان',
    ctaPage: 'ausbildung-germany',
  },
  {
    key: 'austria',
    anchor: 'austria-diploma',
    tab: 'مسیر ۲: اتریش (Mangelberufe و کارشناسی)',
    title: 'مسیر دوم: اتریش — مشاغل کمبود نیرو و دانشگاه‌های دولتی',
    badge: '۱۴ حقوق در سال + تحصیل بدون بلوکه',
    points: [
      'کارت قرمز-سفید-قرمز مشاغل فنی (Fachkräfte in Mangelberufen): مشاغلی مانند برقکار، لوله‌کش و تاسیسات، جوشکار، نجار، مکانیک ماشین‌آلات سنگین، آشپز و تکنسین IT با مدرک فنی معتبر (معادل دوره کارآموزی اتریش)، سابقه کار و جاب‌آفر، کارت اقامت ۲ ساله می‌گیرند.',
      'مهاجرت تحصیلی با دیپلم: با دیپلم ۱۲ ساله (یا ۱۱ ساله + پیش‌دانشگاهی) حتی بدون قبولی کنکور در ایران، در رشته‌های غیرمحدود دانشگاه‌های دولتی اتریش از طریق کالج پیش‌نیاز پذیرش دریافت می‌کنید.',
    ],
    ctaLabel: 'بررسی کارت قرمز-سفید-قرمز اتریش',
    ctaPage: 'austria-rwr',
  },
  {
    key: 'italy-hungary',
    anchor: 'italy-hungary-diploma',
    tab: 'مسیر ۳: ایتالیا (DSU) و مجارستان',
    title: 'مسیر سوم: ایتالیا و مجارستان — کارشناسی انگلیسی‌زبان و کالج زبان',
    badge: 'تحصیل رایگان + ۷,۰۰۰ یورو کمک‌هزینه در ایتالیا',
    points: [
      'ایتالیا (کارشناسی انگلیسی‌زبان با بورسیه DSU): بسیاری از دانشگاه‌های دولتی ایتالیا رشته‌های کارشناسی را به زبان انگلیسی (با آیلتس ۶) ارائه می‌دهند و دیپلمه‌های ایرانی مشمول بورسیه استانی (تحصیل رایگان + ~۷,۰۰۰ یورو کمک‌هزینه سالانه) می‌شوند.',
      'مجارستان (کالج زبان و فاندیشن): با مدرک دیپلم و بدون نیاز به مدرک زبان اولیه می‌توانید وارد کالج‌های زبان انگلیسی یا دوره‌های فاندیشن پزشکی و مهندسی در بوداپست شده و ویزای تحصیلی شینگن بگیرید.',
    ],
    ctaLabel: 'بررسی ویزای کالج زبان و کالج مجارستان',
    ctaPage: 'colleges-hungary',
  },
  {
    key: 'business',
    anchor: 'business-without-degree',
    tab: 'مسیر ۴: ثبت شرکت، استارتاپ و تمکن',
    title: 'مسیر چهارم: ثبت شرکت و اقامت خودحمایتی — بدون هیچ مدرک تحصیلی',
    badge: 'اقامت خانوادگی بدون مدرک دانشگاهی',
    points: [
      'در اتریش، مجارستان، اسپانیا و امارات (دبی) ملاک صدور اقامت کارآفرینی قدرت بیزنس‌پلن، سابقه مدیریت عملی و شفافیت تمکن مالی است؛ نه مدرک لیسانس یا فوق‌لیسانس.',
      'در ویزاهای تمکن مالی (D7 پرتغال، خودحمایتی اتریش و یونان) تنها اثبات درآمد ماهانه پایدار در ایران (اجاره ملک، سود سپرده یا سهام) برای اخذ اقامت کل خانواده کافی است.',
    ],
    ctaLabel: 'مقایسه ثبت شرکت اروپا و دبی',
    ctaPage: 'immigration-through-company-registration',
  },
];

const faqs = [
  {
    q: 'آیا با مدرک دیپلم کاردانش یا فنی‌وحرفه‌ای ایران هم می‌توان مهاجرت کرد؟',
    a: 'بله؛ دیپلم ۱۲ ساله شاخه‌های کاردانش و فنی‌وحرفه‌ای ایران در آلمان و اتریش برای ورود به دوره‌های آوسبیلدونگ و کارهای فنی کاملاً معتبر است و اتفاقاً به دلیل داشتن مهارت عملی، شانس مصاحبه بالاتری نزد کارفرمایان اروپایی دارد.',
  },
  {
    q: 'حداکثر سن برای مهاجرت با مدرک دیپلم (به‌ویژه آوسبیلدونگ آلمان) چقدر است؟',
    a: 'در قانون آلمان محدودیت سنی رسمی وجود ندارد، اما در عمل کارفرمایان و سفارت برای دوره‌های آوسبیلدونگ متقاضیان ۱۸ تا ۳۲ سال را ترجیح می‌دهند. برای افراد بالای ۳۵ سال با مدرک دیپلم، مسیرهای ویزای کار فنی با سابقه کار، ثبت شرکت یا ویزاهای تمکن مالی مناسب‌تر هستند.',
  },
  {
    q: 'اگر نه مدرک دانشگاهی داشته باشیم و نه مدرک فنی‌وحرفه‌ای، چه راهی وجود دارد؟',
    a: 'شما همچنان سه راه قانونی دارید: ۱) یادگیری زبان آلمانی (B1/B2) و اقدام برای آوسبیلدونگ (که نیاز به سابقه کار قبلی ندارد)، ۲) اقدام برای مقطع کارشناسی در دانشگاه‌های اروپا، و ۳) مهاجرت از طریق ثبت شرکت یا تمکن مالی.',
  },
  {
    q: 'آیا با مدرک دیپلم می‌توان ویزای جستجوی کار یا جاب‌آفر کانادا گرفت؟',
    a: 'در سیستم امتیازی فدرال کانادا (Express Entry)، بدون مدرک دانشگاهی کسب امتیاز قبولی بسیار دشوار است؛ مگر اینکه در یک شغل فنی تخصصی (Federal Skilled Trades) سابقه کار بیمه‌شده داشته باشید و از یک کارفرمای کانادایی جاب‌آفر تاییدشده (LMIA) دریافت کنید که در سال ۲۰۲۶ فرآیند بسیار رقابتی است. بنابراین اروپا (به‌ویژه آلمان و اتریش) مسیر بسیار واقعی‌تری برای دیپلمه‌هاست.',
  },
];

const tocItems = [
  { id: 'is-diploma-enough', label: 'آیا دیپلم بدون مدرک دانشگاهی کافی است؟ (۳ اهرم)' },
  { id: 'comparison-table', label: 'جدول مقایسه ۵ مسیر واقعی دیپلم (۲۰۲۶–۲۰۲۷)' },
  { id: 'germany-diploma', label: 'مسیر اول و دوم: آلمان و اتریش فنی‌وحرفه‌ای' },
  { id: 'italy-hungary-diploma', label: 'مسیر سوم و چهارم: کارشناسی، کالج و بیزینس' },
  { id: 'expert-insights', label: 'نکته دیاکو: تله مدارک کوتاه‌مدت ۵۰ ساعته' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const ImmigrationWithDiplomaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedRoute, setSelectedRoute] = useState<string>('germany');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeRoute = ROUTE_EXPLORER.find((r) => r.key === selectedRoute) || ROUTE_EXPLORER[0];

  useSeo({
    title: 'مهاجرت با مدرک دیپلم ۲۰۲۶-۲۰۲۷ | کدام کشورها واقعاً راه می‌دهند؟ | دیاکو',
    description:
      'راهنمای واقعی مهاجرت با مدرک دیپلم و بدون مدرک دانشگاهی در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی آوسبیلدونگ آلمان، کار فنی در اتریش، کالج زبان و ثبت شرکت.',
    canonical: 'https://www.dia-co.ir/immigration-with-high-school-diploma',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'مهاجرت با مدرک دیپلم ۲۰۲۶',
      'مهاجرت بدون مدرک دانشگاهی ۲۰۲۷',
      'آوسبیلدونگ آلمان با دیپلم کاردانش',
      'ویزای کار فنی آلمان ماده 18a',
      'مشاغل کمبود نیرو اتریش Mangelberufe',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/immigration-with-high-school-diploma/#article',
          headline: 'مهاجرت با مدرک دیپلم ۲۰۲۶-۲۰۲۷ | کدام کشورها واقعاً راه می‌دهند؟',
          description:
            'راهنمای واقعی مهاجرت با مدرک دیپلم و بدون مدرک دانشگاهی در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی آوسبیلدونگ آلمان، کار فنی در اتریش، کالج زبان و ثبت شرکت.',
          image: [
            'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:35:00+03:30',
          dateModified: '2026-11-14T13:35:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و کاریابی فنی‌وحرفه‌ای هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          reviewedBy: {
            '@type': 'Organization',
            name: 'دفتر اجرایی هلدینگ دیاکو در وین',
            url: 'https://dia-co.eu/',
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
            'https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany',
            'https://www.migration.gv.at/en/types-of-immigration/permanent-immigration/skilled-workers-in-shortage-occupations/',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/immigration-with-high-school-diploma',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/immigration-with-high-school-diploma/#faq',
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
              onClick={() => navigateInternal('ausbildung-germany')}
              className="hover:text-[#f5a623] transition cursor-pointer"
            >
              مسیرهای فنی‌وحرفه‌ای و تحصیلی
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">مهاجرت با مدرک دیپلم (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('immigration-with-high-school-diploma')}
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
            <span className="rounded-full bg-emerald-500/15 border border-emerald-400/40 px-3 py-1 font-bold text-emerald-300 flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5" />
              مسیرهای فنی، آوسبیلدونگ و کارشناسی ۲۰۲۶–۲۰۲۷
            </span>
            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-cyan-300" />
              دپارتمان کاریابی فنی‌وحرفه‌ای و حقوقی دیاکو
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            مهاجرت با مدرک دیپلم (۲۰۲۶–۲۰۲۷): کدام کشورها واقعاً راه می‌دهند؟
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان حقوقی و کاریابی فنی‌وحرفه‌ای هلدینگ دیاکو</strong>
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
              مهاجرت با مدرک دیپلم در سال‌های ۲۰۲۶ و ۲۰۲۷ به‌دلیل بحران کمبود نیروی کار فنی و مهارتی در اروپا یکی از
              پرتقاضاترین مسیرهاست. در حال حاضر <strong className="text-amber-300">۴ مسیر قانونی و واقعی</strong> برای
              دارندگان دیپلم ۱۲ ساله وجود دارد: ۱) دوره‌های فنی‌وحرفه‌ای آلمان (<strong className="text-cyan-300">Ausbildung</strong>)
              با دریافت حقوق ۱,۰۵۰ تا ۱,۳۵۰ یورو از ماه اول، ۲) ویزای کار فنی با مدرک ۲ ساله در آلمان (ماده 18a) و
              اتریش (کارت RWR مشاغل کمبود نیرو)، ۳) تحصیل کارشناسی یا کالج زبان در اتریش، ایتالیا (بورسیه DSU) و
              مجارستان، و ۴) ثبت شرکت، استارتاپ یا ویزاهای تمکن مالی بدون هیچ‌گونه نیاز به مدرک دانشگاهی.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>سنجش مسیر مهاجرت با دیپلم و مهارت شما</span>
              <GraduationCap className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('ausbildung-germany')}
              className="rounded-2xl border border-emerald-400/35 bg-emerald-500/10 hover:bg-emerald-500/20 px-5 py-3.5 text-sm font-bold text-emerald-200 transition cursor-pointer"
            >
              آوسبیلدونگ آلمان با دیپلم
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('language-college-visa')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              مهاجرت از طریق کالج زبان
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
            <span>فهرست مطالب مهاجرت با مدرک دیپلم (۲۰۲۶–۲۰۲۷)</span>
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

        {/* 3 Levers */}
        <section id="is-diploma-enough" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white">
            آیا نداشتن مدرک دانشگاهی مانع مهاجرت در سال ۲۰۲۶–۲۰۲۷ است؟
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            اقتصادهای صنعتی اروپا با کمبود میلیون‌ها نیروی کار فنی، ماهر و خدماتی روبه‌رو هستند. با این حال «دیپلم
            خالی بدون مهارت یا زبان» ویزای کاری نمی‌آورد؛ برای موفقیت باید یکی از سه اهرم زیر را کنار دیپلم خود قرار
            دهید:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: '۱. اهرم زبان',
                desc: 'یادگیری زبان آلمانی (سطح B1 یا B2) برای آوسبیلدونگ یا انگلیسی (آیلتس ۶) برای کارشناسی اروپا.',
              },
              {
                title: '۲. اهرم مهارت فنی',
                desc: 'داشتن گواهینامه فنی‌وحرفه‌ای معتبر (حداقل معادل ۲ سال آموزش عملی) و سابقه کار مرتبط.',
              },
              {
                title: '۳. اهرم سرمایه یا درآمد',
                desc: 'توانایی تامین تمکن مالی برای تحصیل کارشناسی، ثبت شرکت یا اقامت خودحمایتی بدون مدرک دانشگاهی.',
              },
            ].map((lever) => (
              <div key={lever.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{lever.title}</span>
                </div>
                <p className="text-xs leading-6 text-slate-300">{lever.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول مقایسه بهترین کشورها و روش‌ها برای مهاجرت با مدرک دیپلم (۲۰۲۶–۲۰۲۷)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-amber-400/15 text-amber-300 font-black">
                <tr>
                  <th className="p-3.5">کشور مقصد</th>
                  <th className="p-3.5">مسیر واقعی با مدرک دیپلم</th>
                  <th className="p-3.5">پیش‌نیاز اصلی (علاوه بر دیپلم ۱۲ ساله)</th>
                  <th className="p-3.5">نیاز به مدرک زبان</th>
                  <th className="p-3.5">وضعیت درآمد یا هزینه در سال اول</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {DIPLOMA_TABLE.map((row) => (
                  <tr key={row[1]} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-white whitespace-nowrap">{row[0]}</td>
                    <td className="p-3.5 text-cyan-200 font-bold">{row[1]}</td>
                    <td className="p-3.5 text-slate-200 leading-6">{row[2]}</td>
                    <td className="p-3.5 text-amber-200 whitespace-nowrap">{row[3]}</td>
                    <td className="p-3.5 text-emerald-300 leading-6">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Route Explorer */}
        <section id="germany-diploma" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              بررسی تخصصی ۴ مسیر قانونی مهاجرت با دیپلم
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-300">
              هر مسیر را انتخاب کنید تا شرایط سنی، مدرک زبان، معادل‌سازی فنی و وضعیت درآمد آن را مشاهده کنید:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {ROUTE_EXPLORER.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setSelectedRoute(r.key)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer border ${
                  selectedRoute === r.key
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                {r.tab}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-emerald-400/25 bg-[#06181f] p-5 md:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <h3 className="text-base md:text-lg font-black text-amber-300">{activeRoute.title}</h3>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300">
                {activeRoute.badge}
              </span>
            </div>
            <ul className="space-y-2.5 text-xs md:text-sm leading-7 text-slate-200">
              {activeRoute.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => navigateInternal(activeRoute.ctaPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                {activeRoute.ctaLabel} ←
              </button>
            </div>
          </div>
        </section>

        {/* Anchored highlights for Austria, Italy/Hungary & Business */}
        <section id="austria-diploma" className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
              <Briefcase className="h-4 w-4" />
              <span>اتریش: لیست مشاغل کمبود نیرو</span>
            </div>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              برقکار، لوله‌کش و تاسیسات، جوشکار، نجار، مکانیک ماشین‌آلات سنگین، آشپز و تکنسین IT با مدرک فنی معتبر و
              جاب‌آفر بدون مدرک دانشگاهی کارت ۲ ساله RWR (با ۱۴ حقوق در سال) می‌گیرند.
            </p>
          </div>
          <div id="italy-hungary-diploma" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-black text-sm">
              <GraduationCap className="h-4 w-4" />
              <span>ایتالیا (DSU) و کالج مجارستان</span>
            </div>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              کارشناسی انگلیسی‌زبان ایتالیا (آیلتس ۶) با بورسیه استانی DSU رایگان می‌شود؛ مجارستان نیز با دیپلم و
              بدون مدرک زبان اولیه پذیرش کالج زبان و فاندیشن پزشکی/مهندسی می‌دهد.
            </p>
          </div>
          <div id="business-without-degree" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-black text-sm">
              <Building2 className="h-4 w-4" />
              <span>ثبت شرکت و تمکن مالی</span>
            </div>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              در اتریش، مجارستان، اسپانیا، پرتغال D7 و دبی، اقامت کارآفرینی یا تمکن مالی بر پایه بیزنس‌پلن و درآمد
              پایدار صادر می‌شود و هیچ شرط مدرک دانشگاهی وجود ندارد.
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
            بر اساس تجربه مستقیم دپارتمان حقوقی و کاریابی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران،
            بزرگترین اشتباه متقاضیان دیپلمه این است که <strong className="text-amber-300">«مدارک کوتاه‌مدت آزاد
            (مثل دوره‌های ۵۰ ساعته آموزشگاه‌ها) را با مدرک فنی‌وحرفه‌ای معتبر اشتباه می‌گیرند»</strong>. در آلمان و
            اتریش، برای معادل‌سازی مدرک فنی باید دوره آموزشی دارای سرفصل‌های استاندارد و ساعات کافی (معمولاً معادل ۲
            سال آموزش فنی) باشد؛ در غیر این صورت، مسیر کم‌ریسک‌ترِ آوسبیلدونگ یا تحصیل کارشناسی پیشنهاد می‌شود.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول مهاجرت با دیپلم (FAQ)</h2>
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
              <span>مسیرهای مرتبط برای دارندگان مدرک دیپلم</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'ausbildung-germany', label: 'آوسبیلدونگ آلمان (حقوق از ماه اول)' },
                { page: 'germany-nursing-assistant-visa', label: 'ویزای کار کمک پرستاری آلمان' },
                { page: 'austria-rwr', label: 'کارت RWR مشاغل کمبود نیرو اتریش' },
                { page: 'language-college-visa', label: 'مهاجرت از طریق کالج زبان اروپا' },
                { page: 'migrate-with-1-billion-toman', label: 'مهاجرت با بودجه ۱ میلیارد تومان' },
                { page: 'immigration-through-company-registration', label: 'ثبت شرکت بدون مدرک دانشگاهی' },
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
              <span>منابع رسمی آموزش فنی اروپا و تماس مستقیم</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                {
                  label: 'پورتال رسمی آوسبیلدونگ و آموزش فنی آلمان (Make it in Germany)',
                  url: 'https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany',
                },
                {
                  label: 'لیست رسمی مشاغل کمبود نیرو اتریش (Migration.gv.at)',
                  url: 'https://www.migration.gv.at/en/types-of-immigration/permanent-immigration/skilled-workers-in-shortage-occupations/',
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
                Wien: +43 688 976 3256
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImmigrationWithDiplomaPage;
