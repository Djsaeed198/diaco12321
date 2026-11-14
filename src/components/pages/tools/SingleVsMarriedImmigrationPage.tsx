import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  HeartHandshake,
  Home,
  List,
  PhoneCall,
  Rocket,
  Scale,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const COMPARISON_ROWS = [
  {
    criterion: 'هزینه تمکن مالی اولیه (۲۰۲۶)',
    single: 'پایین (~۱۲,۰۰۰ یورو برای تحصیل آلمان یا ~۱,۳۰۸ یورو درآمد ماهانه اتریش)',
    married: 'بالا (افزایش حدود ۶۰٪ برای زوج + حدود ۲۰٪ به ازای هر فرزند)',
    winner: 'مجردها',
    winnerTone: 'text-cyan-300',
  },
  {
    criterion: 'پیدا کردن خانه در ماه اول',
    single: 'بسیار آسان‌تر (اتاق دانشجویی، سوئیت نقلی یا آپارتمان مشترک WG)',
    married: 'چالش‌برانگیزتر (نیاز به آپارتمان بزرگ با حداقل متراژ قانونی به ازای هر نفر)',
    winner: 'مجردها',
    winnerTone: 'text-cyan-300',
  },
  {
    criterion: 'درآمدزایی پس از ورود',
    single: 'متکی به یک منبع درآمد (کار دانشجویی یا حقوق نفر اصلی)',
    married: 'موتور دوقلو: امکان اشتغال تمام‌وقت همسر همزمان با کار یا تحصیل نفر اصلی',
    winner: 'متأهل‌ها',
    winnerTone: 'text-emerald-300',
  },
  {
    criterion: 'الزام مدرک زبان برای همراه',
    single: 'وجود ندارد',
    married: 'در بسیاری از مسیرهای آلمان و اتریش، همسر نیازمند مدرک زبان پایه (A1 آلمانی) است (جز بلوکارت)',
    winner: 'مجردها',
    winnerTone: 'text-cyan-300',
  },
  {
    criterion: 'فشار روانی و سازگاری',
    single: 'انعطاف‌پذیری بالا در تغییر شهر یا شغل، اما ریسک تنهایی در سال اول',
    married: 'حمایت عاطفی متقابل خانواده و ثبات بیشتر در محیط جدید',
    winner: 'متأهل‌ها',
    winnerTone: 'text-emerald-300',
  },
  {
    criterion: 'شانس ویزای توریستی (نوع C)',
    single: 'سخت‌گیری بیشتر افسر کنسولی برای اثبات بازگشت به ایران (در نبود سابقه سفر)',
    married: 'در صورت سفر تنها (باقی ماندن همسر و فرزند در ایران)، بهترین مدرک پیوند عاطفی است',
    winner: 'متأهل‌ها (در ویزای C)',
    winnerTone: 'text-emerald-300',
  },
];

const PROFILE_STRATEGIES = {
  single: {
    badge: 'استراتژی پیشنهادی برای متقاضیان مجرد (۲۰۲۶–۲۰۲۷)',
    headline: '۴۰ تا ۵۰ درصد ارزان‌تر، سریع‌تر و با بیشترین قدرت مانور در جهان',
    summary:
      'با حذف موانع اداری الحاق خانواده (ترجمه سند ازدواج، متراژ خانه و زبان A1 همراه)، پرونده فرد مجرد ظرف ۳ تا ۶ ماه زودتر به نتیجه می‌رسد. بهترین انتخاب‌ها برای مجردهای زیر ۳۵ سال شامل آوسبیلدونگ آلمان (حقوق ~۱,۱۰۰ یورو/ماه)، تحصیل با بورسیه DSU ایتالیا، کارت فرصت آلمان و تحصیل کارشناسی/ارشد اتریش است.',
    points: [
      'عدم نیاز به بلوکه سنگین چند نفره و سهولت اجاره اتاق دانشجویی یا WG در ماه اول',
      'کفایت کامل حقوق ۱,۱۰۰ تا ۱,۳۰۰ یورویی آوسبیلدونگ برای زندگی تک‌نفره',
      'هشدار مهم: در ویزای کوتاه‌مدت (نوع C) یا کالج زبان، حتماً مدارک شغلی/ملکی قوی برای اثبات بازگشت به ایران ارائه دهید',
    ],
    ctaLabel: 'مهاجرت با بودجه ۱ میلیارد تومان (مسیرهای مجردی)',
    ctaPage: 'migrate-with-1-billion-toman',
  },
  married: {
    badge: 'استراتژی پیشنهادی برای زوج‌ها و خانواده‌ها (۲۰۲۶–۲۰۲۷)',
    headline: 'قدرت موتور دوقلو (۲ حقوق یورویی) + تحصیل رایگان و کمک‌هزینه فرزند',
    summary:
      'اگرچه تمکن مالی اولیه زوج (~۶۰٪ بیشتر از فرد مجرد) و اجاره آپارتمان خانوادگی بزرگ‌تر است، اما در مسیرهایی مانند بلوکارت آلمان (همسر معاف از A1 با اجازه کار نامحدود)، کارت RWR اتریش، تحصیل ارشد/دکتری در آلمان و اتریش، ثبت شرکت مجارستان و D7 پرتغال، خانواده با دو حقوق ارزی و کمک‌هزینه ماهانه ۲۰۰ تا ۲۵۰ یورویی فرزند (Kindergeld / Familienbeihilfe) سریع‌تر به پس‌انداز می‌رسد.',
    points: [
      'اقدام همزمان: ایده‌آل برای بلوکارت آلمان، استارتاپ/RWR اتریش، ثبت شرکت مجارستان و D7 پرتغال',
      'الحاق بعد از استقرار (۳ تا ۶ ماه بعد): هوشمندانه‌ترین راه در ویزای تحصیلی با بودجه محدود (~۱ تا ۱.۵ میلیارد تومان)',
      'هشدار ۲۰۲۶: دانشجویان کالج/کارشناسی کانادا و ارشد غیرپژوهشی بریتانیا اجازه بردن یا کار تمام‌وقت همسر ندارند',
    ],
    ctaLabel: 'مقایسه ثبت شرکت و مسیرهای خانوادگی اروپا',
    ctaPage: 'immigration-through-company-registration',
  },
};

const faqs = [
  {
    q: 'آیا اگر در حین پروسه مهاجرت عقد کنیم، سفارت ازدواج ما را می‌پذیرد؟',
    a: 'بله؛ اما در برخی کشورها (مانند اتریش) برای درخواست اقامت همراه، حداقل سن هر دو زوج در زمان ثبت درخواست باید ۲۱ سال تمام باشد و ازدواج باید کاملاً قانونی و رسمی ثبت شده باشد. همچنین اگر ازدواج بلافاصله پیش از وقت سفارت انجام شود، باید مدارک مستندی برای واقعی بودن رابطه ارائه دهید تا شائبه ازدواج صوری ایجاد نشود.',
  },
  {
    q: 'آیا همسر فردی که ویزای تحصیلی آلمان یا اتریش دارد، اجازه کار تمام‌وقت می‌گیرد؟',
    a: 'بله؛ در آلمان همسر دانشجو اجازه کار نامحدود (تمام‌وقت) دریافت می‌کند. در اتریش نیز همسر دانشجوی مقطع ارشد یا دکتری با تایید اداره کار اتریش (AMS) می‌تواند مشغول به کار شود (که در سال ۲۰۲۶ برای مشاغل مورد نیاز به سرعت صادر می‌شود).',
  },
  {
    q: 'برای متأهل‌ها که مدرک زبان ندارند، کدام کشور اروپایی در سال ۲۰۲۶–۲۰۲۷ بهتر است؟',
    a: 'برای زوج‌های بدون مدرک زبان، ثبت شرکت در مجارستان (Kft)، ویزای استارتاپ اتریش (در صورت داشتن ایده نوآورانه و سرمایه)، یا ویزای تمکن مالی D7 پرتغال بهترین گزینه‌ها هستند؛ زیرا نه نیاز به مدرک زبان نفر اصلی دارند و نه مدرک زبان A1 برای همسر مطالبه می‌کنند.',
  },
  {
    q: 'هزینه تمکن مالی اضافه برای هر همراه (همسر و فرزند) در اروپا چقدر است؟',
    a: 'بر اساس نرخ‌های سال ۲۰۲۶ در کشورهایی مثل اتریش و آلمان، به ازای همسر حدود ۶۵ تا ۷۵ درصد مبلغ تمکن مالی نفر اصلی (حدود ۷۵۰ تا ۸۵۰ یورو در ماه) و به ازای هر فرزند زیر ۱۸ سال حدود ۲۰۰ تا ۳۰۰ یورو در ماه به تمکن مالی کل خانواده اضافه می‌شود.',
  },
];

const tocItems = [
  { id: 'comparison-table', label: 'جدول مقایسه رو در روی مجردها و متأهل‌ها' },
  { id: 'singles-pros-cons', label: 'چرا مهاجرت برای مجردها سریع‌تر و ارزان‌تر است؟' },
  { id: 'married-pros-cons', label: 'چرا مهاجرت برای متأهل‌ها پایدارتر است؟' },
  { id: 'dependent-visa-rules-2026', label: 'تغییرات قوانین ویزای همراه (اروپا، کانادا، بریتانیا)' },
  { id: 'simultaneous-vs-reunification', label: 'اقدام همزمان یا الحاق بعد از استقرار؟' },
  { id: 'expert-insights', label: 'نکته دیاکو: استراتژی نفر قوی‌تر (Lead Applicant)' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const SingleVsMarriedImmigrationPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedProfile, setSelectedProfile] = useState<'single' | 'married'>('single');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeStrategy = PROFILE_STRATEGIES[selectedProfile];

  useSeo({
    title: 'مهاجرت مجردها در مقابل متأهل‌ها (۲۰۲۶-۲۰۲۷) | کدام مسیر آسان‌تر است؟ | دیاکو',
    description:
      'مقایسه صادقانه و تخصصی مهاجرت مجردها و متأهل‌ها در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی هزینه تمکن مالی، قوانین ویزای همراه اروپا و کانادا، اجازه کار همسر و اقدام همزمان یا الحاق.',
    canonical: 'https://www.dia-co.ir/single-vs-married-immigration-which-is-easier',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'مهاجرت مجردها یا متاهلها ۲۰۲۶',
      'ویزای همراه آلمان و اتریش ۲۰۲۶',
      'اقدام همزمان یا الحاق خانواده',
      'اجازه کار همسر دانشجو در اروپا',
      'تمکن مالی همراه همسر و فرزند',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/single-vs-married-immigration-which-is-easier/#article',
          headline: 'مهاجرت مجردها در مقابل متأهل‌ها (۲۰۲۶-۲۰۲۷) | کدام مسیر آسان‌تر است؟',
          description:
            'مقایسه صادقانه و تخصصی مهاجرت مجردها و متأهل‌ها در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی هزینه تمکن مالی، قوانین ویزای همراه اروپا و کانادا، اجازه کار همسر و شانس ویزا.',
          image: [
            'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:43:00+03:30',
          dateModified: '2026-11-14T13:43:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و ارزیابی پرونده‌های خانوادگی و فردی هلدینگ مهاجرتی دیاکو',
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
          citation: ['https://www.migration.gv.at/', 'https://www.make-it-in-germany.com/'],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/single-vs-married-immigration-which-is-easier',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/single-vs-married-immigration-which-is-easier/#faq',
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
              onClick={() => navigateInternal('method-comparator')}
              className="hover:text-[#f5a623] transition cursor-pointer"
            >
              مقایسه‌گر استراتژی مهاجرت
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">مهاجرت مجردها در مقابل متأهل‌ها (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('single-vs-married-immigration-which-is-easier')}
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
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-wrap items-center gap-2.5 text-xs mb-4">
            <span className="rounded-full bg-cyan-500/15 border border-cyan-400/40 px-3 py-1 font-bold text-cyan-200 flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5" />
              مقایسه پرونده فردی در مقابل خانوادگی ۲۰۲۶–۲۰۲۷
            </span>
            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-300" />
              تایید دپارتمان پرونده‌های خانوادگی دیاکو
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            مهاجرت مجردها در مقابل متأهل‌ها (۲۰۲۶–۲۰۲۷): کدام مسیر واقعاً آسان‌تر است؟
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان حقوقی و ارزیابی پرونده‌های خانوادگی و فردی دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">بازبینی حقوقی: </span>
              <strong className="text-amber-300">دفاتر وین، بوداپست، آتن و تهران</strong>
            </div>
          </div>

          {/* BLUF Box */}
          <div className="mt-6 rounded-3xl border border-cyan-400/40 bg-gradient-to-l from-[#0e3240] via-[#092731] to-[#081f27] p-6 md:p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-black text-cyan-300 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج AI)</span>
            </div>
            <p className="text-sm md:text-base leading-8 text-slate-100 text-justify">
              از نظر <strong className="text-amber-300">هزینه اولیه، سرعت اجرا و پیدا کردن مسکن</strong>، مهاجرت برای
              مجردها حدود ۴۰ تا ۵۰ درصد ساده‌تر و ارزان‌تر است (بدون نیاز به تمکن مالی خانواده، آپارتمان بزرگ و مدرک
              زبان A1 همسر). اما از نظر{' '}
              <strong className="text-emerald-300">تقسیم فشار مالی با دو درآمد یورویی و شانس بالاتر در ویزای کوتاه‌مدت</strong>
              ، متأهل‌ها دارای مزیت استراتژیک هستند؛ مشروط بر اینکه از مسیرهایی اقدام کنند که همسر از روز اول اجازه کار
              تمام‌وقت داشته باشد (مانند بلوکارت آلمان، کارت RWR اتریش، ارشد/دکتری اتریش یا ثبت شرکت در اروپا).
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>طراحی نقشه راه فردی یا خانوادگی شما</span>
              <Rocket className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('real-cost-of-immigration-hidden-fees')}
              className="rounded-2xl border border-cyan-400/35 bg-cyan-500/10 hover:bg-cyan-500/20 px-5 py-3.5 text-sm font-bold text-cyan-200 transition cursor-pointer"
            >
              محاسبه هزینه واقعی و هزینه‌های پنهان
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('german-blue-card')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              بلوکارت آلمان (همراه معاف از A1)
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
            <span>فهرست مطالب مقایسه مهاجرت مجردها و متأهل‌ها (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            {tocItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#08222b] px-3 py-2.5 text-slate-200 hover:border-[#f5a623] hover:text-amber-300 transition"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-400/15 text-[10px] font-black text-amber-300">
                  {idx + 1}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Interactive Profile Explorer */}
        <section className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white">
                شبیه‌ساز استراتژی بر اساس وضعیت تأهل شما
              </h2>
              <p className="mt-1 text-xs md:text-sm text-slate-300">
                وضعیت پرونده خود را انتخاب کنید تا بهترین مسیرها و هشدارهای ۲۰۲۶–۲۰۲۷ نمایش داده شود:
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedProfile('single')}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer border ${
                  selectedProfile === 'single'
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                <User className="h-4 w-4" />
                <span>پرونده فردی (مجرد)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedProfile('married')}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-black transition cursor-pointer border ${
                  selectedProfile === 'married'
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>پرونده خانوادگی (متأهل)</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-400/25 bg-[#06181f] p-5 md:p-6 space-y-4">
            <span className="inline-flex rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 text-[11px] font-bold text-amber-300">
              {activeStrategy.badge}
            </span>
            <h3 className="text-base md:text-lg font-black text-white">{activeStrategy.headline}</h3>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">{activeStrategy.summary}</p>
            <ul className="space-y-2 text-xs md:text-sm text-slate-200">
              {activeStrategy.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div>
              <button
                type="button"
                onClick={() => navigateInternal(activeStrategy.ctaPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                {activeStrategy.ctaLabel} ←
              </button>
            </div>
          </div>
        </section>

        {/* Head-to-Head Comparison Table */}
        <section id="comparison-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول مقایسه رو در روی مهاجرت مجردها و متأهل‌ها در ۲۰۲۶–۲۰۲۷
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-amber-400/15 text-amber-300 font-black">
                <tr>
                  <th className="p-3.5">معیار مقایسه</th>
                  <th className="p-3.5">پرونده فردی (مجرد)</th>
                  <th className="p-3.5">پرونده خانوادگی (متأهل)</th>
                  <th className="p-3.5">برنده معیار</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.criterion} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-white">{row.criterion}</td>
                    <td className="p-3.5 text-slate-200 leading-6">{row.single}</td>
                    <td className="p-3.5 text-slate-200 leading-6">{row.married}</td>
                    <td className={`p-3.5 font-black whitespace-nowrap ${row.winnerTone}`}>{row.winner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Singles vs Married Deep Cards */}
        <section className="grid gap-6 md:grid-cols-2">
          <div id="singles-pros-cons" className="rounded-3xl border border-cyan-400/25 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-black text-base">
              <User className="h-5 w-5" />
              <h2>چرا مهاجرت برای مجردها سریع‌تر و ارزان‌تر است؟</h2>
            </div>
            <ul className="space-y-2.5 text-xs md:text-sm leading-7 text-slate-200 text-justify">
              <li>
                <strong className="text-amber-300">حذف موانع اداری الحاق خانواده:</strong> در پرونده‌های متأهلین،
                ترجمه سند ازدواج و شناسنامه فرزندان، اثبات متراژ مسکن متناسب و آزمون زبان A1 همسر گاهی زمان پروسه را
                ۳ تا ۶ ماه افزایش می‌دهد.
              </li>
              <li>
                <strong className="text-amber-300">ورود آسان به آوسبیلدونگ:</strong> حقوق ۱,۱۰۰ یورویی آوسبیلدونگ
                آلمان برای زندگی یک فرد مجرد کافی است، اما تامین مخارج یک خانواده ۳ نفره با آن دشوار است.
              </li>
              <li>
                <strong className="text-rose-300">چالش اصلی مجردها:</strong> در ویزای کوتاه‌مدت (توریستی) یا کالج
                زبان، افسران کنسولی حساسیت بیشتری روی جوانان مجرد دارند و مدارک شغلی و ملکی قوی لازم است.
              </li>
            </ul>
          </div>

          <div id="married-pros-cons" className="rounded-3xl border border-emerald-400/25 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-black text-base">
              <HeartHandshake className="h-5 w-5" />
              <h2>چرا مهاجرت برای متأهل‌ها در بلندمدت پایدارتر است؟</h2>
            </div>
            <ul className="space-y-2.5 text-xs md:text-sm leading-7 text-slate-200 text-justify">
              <li>
                <strong className="text-emerald-300">قدرت دو درآمد ارزی (موتور دوقلو):</strong> پس از ورود با
                بلوکارت آلمان، ارشد اتریش یا ثبت شرکت، اجازه کار تمام‌وقت همسر امکان پرداخت راحت اجاره و پس‌انداز
                خانوار را فراهم می‌کند.
              </li>
              <li>
                <strong className="text-emerald-300">تحصیل رایگان و کمک‌هزینه فرزند:</strong> در اتریش، آلمان، هلند و
                پرتغال مدارس دولتی رایگان هستند و در اتریش و آلمان ماهانه حدود ۲۰۰ تا ۲۵۰ یورو کمک‌هزینه فرزند
                (Familienbeihilfe / Kindergeld) پرداخت می‌شود.
              </li>
            </ul>
          </div>
        </section>

        {/* Dependent Rules & Simultaneous vs Post-Settlement */}
        <section className="grid gap-6 md:grid-cols-2">
          <div id="dependent-visa-rules-2026" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
            <h2 className="text-lg font-black text-amber-300">
              تغییرات مهم قوانین ویزای همراه در ۲۰۲۶–۲۰۲۷
            </h2>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">
              <strong className="text-emerald-300">اتریش و آلمان (باز و قانونمند):</strong> دارندگان کارت RWR اتریش،
              بلوکارت آلمان/اتریش (با معافیت همسر از مدرک زبان A1) و دانشجویان ارشد و دکتری حق بردن همسر و فرزندان و
              اجازه کار تمام‌وقت دارند.
            </p>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">
              <strong className="text-rose-300">کانادا و بریتانیا (محدودیت شدید):</strong> در کانادا اجازه کار باز
              همسر به ارشد ۱۶ ماهه به بالا و دکتری محدود شده و دانشجویان کالج و کارشناسی اجازه کار همسر نمی‌گیرند؛ در
              بریتانیا نیز دانشجویان ارشد غیرپژوهشی حق بردن همراه ندارند.
            </p>
          </div>

          <div
            id="simultaneous-vs-reunification"
            className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3"
          >
            <h2 className="text-lg font-black text-cyan-300 flex items-center gap-2">
              <Home className="h-5 w-5" />
              <span>بهترین استراتژی: اقدام همزمان یا الحاق بعد از استقرار؟</span>
            </h2>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">
              <strong className="text-white">اقدام همزمان:</strong> بهترین انتخاب در ویزای کار تخصصی (بلوکارت)، ثبت
              شرکت، استارتاپ و ویزای تمکن مالی D7 پرتغال است.
            </p>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">
              <strong className="text-white">الحاق بعد از استقرار (۳ تا ۶ ماه بعد):</strong> اگر بودجه محدودی (۱ تا
              ۱.۵ میلیارد تومان) برای تحصیل در اتریش یا ایتالیا دارید، ابتدا نفر اصلی خانه اجاره کرده و کار دانشجویی
              می‌گیرد و سپس الحاق خانواده ثبت می‌شود تا هزینه اولیه نصف و ریسک ریجکتی همراه صفر شود.
            </p>
          </div>
        </section>

        {/* Information Gain */}
        <section
          id="expert-insights"
          className="rounded-3xl border border-emerald-400/35 bg-gradient-to-l from-emerald-950/35 via-[#0a232d] to-[#081f27] p-6 md:p-8 space-y-4"
        >
          <div className="flex items-center gap-2 text-emerald-300 font-black text-sm">
            <AlertTriangle className="h-5 w-5" />
            <span>نکته تجربی از پرونده‌های واقعی (Information Gain — هلدینگ مهاجرتی دیاکو)</span>
          </div>
          <p className="text-sm leading-8 text-slate-100 text-justify">
            بر اساس تجربه مستقیم تیم حقوقی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران، یک ترفند طلایی
            برای زوج‌های متقاضی مهاجرت تحصیلی یا کاری، استفاده از{' '}
            <strong className="text-amber-300">«استراتژی نفر قوی‌تر (Lead Applicant Strategy)»</strong> است. بسیاری از
            زوج‌ها به‌صورت سنتی پرونده را به نام همسر (مرد) ثبت می‌کنند، در حالی که ممکن است همسر دیگر (زن) مدرک
            مرتبط‌تر، سن پایین‌تر یا سطح زبان بهتری داشته باشد. در قوانین اروپا فرقی نمی‌کند کدام‌یک متقاضی اصلی
            باشد؛ جابه‌جایی نقش اصلی و همراه بارها زمان صدور ویزا را نصف کرده و حق کار تمام‌وقت هر دو نفر را تضمین
            کرده است.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول مجردها و متأهل‌ها (FAQ)</h2>
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
              <Rocket className="h-4 w-4" />
              <span>مسیرهای برتر مجردها و خانواده‌ها در دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'german-blue-card', label: 'بلوکارت آلمان (همراه با کار نامحدود)' },
                { page: 'austria-rwr', label: 'کارت قرمز-سفید-قرمز اتریش (RWR)' },
                { page: 'ausbildung-germany', label: 'آوسبیلدونگ آلمان (ویژه مجردها)' },
                { page: 'migrate-with-1-billion-toman', label: 'مهاجرت با بودجه ۱ میلیارد تومان' },
                { page: 'visa-approval-rate-for-iranians-by-country', label: 'نرخ موفقیت ویزا به تفکیک کشور' },
                { page: 'germany-vs-austria-immigration-comparison', label: 'مقایسه آلمان یا اتریش (۶ معیار)' },
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
              <span>منابع رسمی قوانین الحاق خانواده و مشاوره</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'پورتال رسمی دولت اتریش (Migration.gv.at)', url: 'https://www.migration.gv.at/' },
                { label: 'پورتال رسمی دولت آلمان (Make it in Germany)', url: 'https://www.make-it-in-germany.com/' },
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

export default SingleVsMarriedImmigrationPage;
