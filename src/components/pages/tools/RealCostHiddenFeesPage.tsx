import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Receipt,
  ShieldCheck,
  Briefcase,
  Home,
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

const HIDDEN_COST_PHASES = [
  {
    key: 'iran',
    label: 'فاز اول: هزینه‌های پنهان در ایران (قبل از پرواز)',
    totalRange: '۱۵ تا ۴۵ میلیون تومان + €۲۰۰ تا €۶۰۰ + هزینه آزمون',
    highlights: [
      'تله ترجمه رسمی و تاییدات سفارت (Legalization): ترجمه شناسنامه، سند ازدواج، مدارک تحصیلی، ریزنمرات و سوابق بیمه برای خانواده ۳ نفره به راحتی از ۳۰ میلیون تومان عبور می‌کند + ۳۰ تا ۵۰ یورو لگالایز سفارت به ازای هر سند.',
      'کارمزدهای تبدیل ارز و پرداخت‌های بین‌المللی: پرداخت اپلیکیشن‌فی دانشگاه‌ها، سازمان‌های ارزیابی مدرک (ZAB / WES / ENIC-NARIC) و رزرو خوابگاه نیازمند کارت ارزی بین‌المللی و کارمزد صرافی است.',
      'آزمون‌های زبان (آیلتس، تافل، گوته، ÖSD) بین ۲۵ تا ۴۰ میلیون تومان برای هر بار آزمون + هزینه بیمه مسافرتی شینگن با پوشش حداقل ۳۰ هزار یورو برای ویزای نوع D.',
    ],
    ctaLabel: 'بررسی مراحل و هزینه معادلسازی مدرک (ZAB / Anabin)',
    ctaPage: 'degree-recognition-for-immigration',
  },
  {
    key: 'europe-arrival',
    label: 'فاز دوم: شوک مالی ۶۰ روز اول پس از ورود به اروپا',
    totalRange: '€۴,۰۰۰ تا €۷,۰۰۰ بودجه نقدی مازاد',
    highlights: [
      'دیوار بلند اجاره مسکن (Kaution و پیش‌پرداخت): در وین، مونیخ، فرانکفورت یا آمستردام به دلیل نداشتن سابقه اعتباری و فیش حقوقی اروپایی، علاوه بر اجاره ماه اول (€۹۰۰ تا €۱,۴۰۰)، باید معادل ۳ ماه اجاره را نقداً به عنوان ودیعه (Kaution) بپردازید. بسیاری از آپارتمان‌ها بدون مبلمان و حتی بدون آشپزخانه مجهز (Einbauküche) هستند!',
      'شکاف زمانی تا دریافت اولین حقوق: ثبت آدرس (Meldezettel / Anmeldung)، افتتاح حساب بانکی و اخذ کد مالیاتی باعث می‌شود اولین فیش حقوقی تا پایان ماه اول یا دوم به تعویق بیفتد.',
      'هزینه کارت اقامت بیومتریک و ثبت محلی در اروپا بین €۱۶۰ تا €۲۵۰ به ازای هر نفر مجزا از هزینه ویزا در تهران است.',
    ],
    ctaLabel: 'مشاهده خدمات استقرار پس از ورود در اروپا',
    ctaPage: 'after-arrival',
  },
  {
    key: 'business-hidden',
    label: 'فاز سوم: هزینه‌های پنهان ثبت شرکت و استارتاپ در اروپا',
    totalRange: '€۴۱۰ تا €۹۰۰ هزینه ثابت ماهانه نگهداری',
    highlights: [
      'حسابدار رسمی و مشاور مالیاتی (Steuerberater): نگهداری حساب‌ها، اظهارنامه‌های مالیاتی ماهانه و فیش حقوقی مدیرعامل در اتریش و آلمان ماهانه €۲۵۰ تا €۵۰۰ هزینه ثابت دارد (حتی پیش از فروش شرکت).',
      'بیمه اجباری مدیرعامل (SVS در اتریش): به محض ثبت شرکت و دریافت کارت اقامت، مدیرعامل مشمول بیمه اجتماعی و بازنشستگی حدود €۱۶۰ تا €۴۰۰ در ماه است و در سال سوم بر اساس سود واقعی تسویه می‌شود.',
    ],
    ctaLabel: 'مشاهده مقایسه مهاجرت از طریق ثبت شرکت',
    ctaPage: 'immigration-through-company-registration',
  },
];

const HIDDEN_COSTS_TABLE = [
  ['در ایران (پیش از ویزا)', 'ترجمه رسمی + مهر دادگستری و خارجه + لگالایز سفارت', '۱۵ تا ۴۵ میلیون تومان', 'نرخ ترجمه بر اساس تعداد کلمات و صفحات ریزنمرات است و عدد ثابتی ندارد.'],
  ['در ایران (پیش از ویزا)', 'معادلسازی مدرک تحصیلی (ZAB / ENIC-NARIC)', '۲۰۰ تا ۶۰۰ یورو', 'مستقیماً به حساب سازمان‌های ارزیابی اروپا واریز می‌شود و جدا از سفارت است.'],
  ['در ایران (پیش از ویزا)', 'آزمون‌های زبان (آیلتس، تافل، گوته، ÖSD)', '۲۵ تا ۴۰ میلیون تومان (هر بار)', 'در صورت عدم کسب نمره در بار اول، هزینه آزمون مجدد و کلاس فشرده چندبرابر می‌شود.'],
  ['پس از ورود (ماه اول)', 'ودیعه اجاره خانه (Kaution) + اجاره ماه اول', '۲,۵۰۰ تا ۴,۵۰۰ یورو (۳ تا ۴ ماه اجاره)', 'صاحبخانه در اتریش و آلمان معادل ۳ ماه اجاره را به عنوان ودیعه نقدی می‌گیرد.'],
  ['پس از ورود (ماه‌های ۱ تا ۳)', 'هزینه زندگی بدون درآمد (خوراک، حمل‌ونقل، بیمه)', '۱,۲۰۰ تا ۱,۸۰۰ یورو در ماه (نفر)', 'صدور کارت اقامت، کد مالیاتی و اولین حقوق معمولاً ۴۵ تا ۹۰ روز طول می‌کشد.'],
  ['پس از ورود (اداری)', 'صدور کارت اقامت بیومتریک و ثبت محلی', '۱۶۰ تا ۲۵۰ یورو (هر نفر)', 'علاوه بر هزینه سفارت در تهران، هنگام دریافت کارت فیزیکی در اروپا مجدداً دریافت می‌شود.'],
];

const faqs = [
  {
    q: 'چقدر پول نقد همراه خود به اروپا ببریم تا در ماه‌های اول دچار بحران نشویم؟',
    a: 'علاوه بر تمکن مالی که در حساب بانکی نشان داده‌اید، توصیه می‌شود برای یک نفر حداقل ۴,۰۰۰ تا ۵,۰۰۰ یورو و برای یک خانواده ۳ نفره حداقل ۷,۰۰۰ تا ۹,۰۰۰ یورو پول نقد (یورو) برای پرداخت ودیعه مسکن، خرید وسایل اولیه و مخارج ۲ ماه اول همراه داشته باشید.',
  },
  {
    q: 'آیا هزینه ودیعه مسکن (Kaution) در اروپا پس داده می‌شود؟',
    a: 'بله؛ مبلغ Kaution در یک حساب امانی نگهداری می‌شود و هنگام تخلیه خانه (در صورت سالم تحویل دادن ملک و تسویه قبوض انرژی) به همراه سود بانکی ناچیز به شما بازگردانده می‌شود؛ اما تا زمان تخلیه، این پول در دسترس شما نخواهد بود.',
  },
  {
    q: 'آیا می‌توان از همان هفته اول ورود به اروپا با ویزای تحصیلی کار کرد و هزینه‌ها را پوشش داد؟',
    a: 'در عمل خیر؛ پیدا کردن کار دانشجویی، انجام مصاحبه، ثبت کد مالیاتی و افتتاح حساب بانکی معمولاً بین ۱ تا ۲ ماه زمان می‌برد. بنابراین هرگز روی درآمد ماه اول برای پرداخت اجاره خانه حساب نکنید.',
  },
  {
    q: 'چگونه می‌توان هزینه‌های پنهان ترجمه و معادلسازی مدارک را کاهش داد؟',
    a: 'با برنامه‌ریزی دقیق و پرهیز از ترجمه مدارک غیرضروری! بسیاری از متقاضیان تمام مدارک خود را بدون اطلاع از نیاز سفارت ترجمه و تایید می‌کنند. دریافت یک چک‌لیست دقیق از وکیل مهاجرتی می‌تواند میلیون‌ها تومان در هزینه‌های ترجمه صرفه‌جویی کند.',
  },
];

const tocItems = [
  { id: 'why-hidden-costs', label: 'چرا هزینه روی کاغذ با واقعیت فرق دارد؟' },
  { id: 'hidden-costs-table', label: 'جدول ۶ هزینه پنهان مهاجرت (۲۰۲۶-۲۰۲۷)' },
  { id: 'costs-in-iran', label: 'فاز ۱: هزینه‌های پنهان در ایران' },
  { id: 'costs-in-europe', label: 'فاز ۲: شوک مالی ماه اول اروپا (Kaution)' },
  { id: 'business-hidden-costs', label: 'فاز ۳: حسابدار و بیمه مدیرعامل (SVS)' },
  { id: 'expert-insights', label: 'ترازنامه واقعی هلدینگ دیاکو' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const RealCostHiddenFeesPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedPhaseKey, setSelectedPhaseKey] = useState<string>('europe-arrival');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedPhase =
    HIDDEN_COST_PHASES.find((p) => p.key === selectedPhaseKey) || HIDDEN_COST_PHASES[1];

  useSeo({
    title: 'هزینه واقعی مهاجرت ۲۰۲۶-۲۰۲۷ | هزینه‌های پنهانی که هیچ آژانسی نمی‌گوید | دیاکو',
    description:
      'بررسی صادقانه و شفاف هزینه واقعی مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷. افشای هزینه‌های پنهان ترجمه، معادلسازی مدرک، ودیعه مسکن اروپا (Kaution) و مخارج زندگی تا اولین حقوق.',
    canonical: 'https://www.dia-co.ir/real-cost-of-immigration-hidden-fees',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'هزینه واقعی مهاجرت ۲۰۲۶',
      'هزینه های پنهان مهاجرت',
      'ودیعه مسکن در آلمان و اتریش Kaution',
      'هزینه لگالایز و ترجمه مدارک سفارت',
      'هزینه حسابدار و بیمه SVS در اتریش',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/real-cost-of-immigration-hidden-fees/#article',
          headline: 'هزینه واقعی مهاجرت ۲۰۲۶-۲۰۲۷ | هزینه‌های پنهانی که هیچ آژانسی نمی‌گوید',
          description:
            'بررسی صادقانه و شفاف هزینه واقعی مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷. افشای هزینه‌های پنهان ترجمه، معادلسازی مدرک، ودیعه مسکن اروپا و مخارج زندگی تا اولین حقوق.',
          image: [
            'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:24:00+03:30',
          dateModified: '2026-11-14T13:24:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان برنامه‌ریزی مالی و حقوقی هلدینگ مهاجرتی دیاکو',
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
            'https://www.migration.gv.at/',
            'https://www.make-it-in-germany.com/',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/real-cost-of-immigration-hidden-fees',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/real-cost-of-immigration-hidden-fees/#faq',
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
            <span className="text-amber-300 font-bold">هزینه واقعی و پنهان مهاجرت (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('real-cost-of-immigration-hidden-fees')}
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
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-wrap items-center gap-2.5 text-xs mb-4">
            <span className="rounded-full bg-amber-400/15 border border-amber-400/40 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Receipt className="h-3.5 w-3.5" />
              شفاف‌سازی ۳۰ تا ۴۵٪ هزینه‌های پنهان ۲۰۲۶–۲۰۲۷
            </span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 font-bold text-emerald-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-cyan-300" />
              ممیزی ترازنامه مالی دفاتر وین، آتن و تهران
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            هزینه واقعی مهاجرت (۲۰۲۶–۲۰۲۷): چیزهایی که هیچ آژانسی به شما نمی‌گوید!
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان برنامه‌ریزی مالی و حقوقی هلدینگ مهاجرتی دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">بازبینی اجرایی: </span>
              <strong className="text-amber-300">دفاتر وین، بوداپست، آتن و تهران</strong>
            </div>
          </div>

          {/* BLUF Box */}
          <div className="mt-6 rounded-3xl border border-amber-400/40 bg-gradient-to-l from-[#0e323f] via-[#092731] to-[#081f27] p-6 md:p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-black text-amber-300 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج AI)</span>
            </div>
            <p className="text-sm md:text-base leading-8 text-slate-100 text-justify">
              هزینه واقعی مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷ بسیار فراتر از «حق‌الوکاله، تمکن مالی سفارت و بلیت هواپیما»
              است. بر اساس تجربه عملی پرونده‌های مهاجرتی به اروپا، متقاضیان معمولاً با{' '}
              <strong className="text-amber-300">۳۰ تا ۴۵ درصد هزینه‌های پنهان و پیش‌بینی‌نشده</strong> روبه‌رو
              می‌شوند که در قراردادهای اولیه آژانس‌ها ذکر نمی‌شود: ترجمه رسمی و لگالایز سفارت، معادلسازی مدرک (ZAB /
              Anerkennung)، ودیعه مسکن ۳ ماهه (Kaution) و مخارج ۳ تا ۶ ماه اول تا دریافت اولین حقوق یا ثبت شرکت.
              برای مهاجرت بدون تنش به آلمان یا اتریش، حداقل{' '}
              <strong className="text-emerald-300">۴,۰۰۰ تا ۷,۰۰۰ یورو بودجه نقدی مازاد</strong> بر اعداد روی کاغذ در
              نظر بگیرید.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>دریافت ترازنامه مالی واقعی مهاجرت شما</span>
              <Calculator className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('cost-calculator')}
              className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-500/20 px-5 py-3.5 text-sm font-bold text-cyan-200 transition cursor-pointer"
            >
              ماشین‌حساب هزینه مهاجرت ۲۰۲۶
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
            <span>فهرست مطالب راهنمای هزینه‌های پنهان مهاجرت</span>
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

        {/* Why Hidden Costs */}
        <section id="why-hidden-costs" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            چرا محاسبه هزینه‌های مهاجرت روی کاغذ با واقعیت تفاوت دارد؟
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            بسیاری از موسسات مهاجرتی برای جذب سریع‌تر متقاضی، در جلسه اول مشاوره تنها به هزینه‌های رسمی سفارت و تمکن
            مالی بانکی اشاره می‌کنند. اما در دنیای واقعی، از لحظه‌ای که تصمیم به جمع‌آوری مدارک می‌گیرید تا روزی که
            اولین فیش حقوقی خود را در وین، برلین یا آمستردام دریافت می‌کنید، ده‌ها هزینه اداری، مالیاتی و اجرایی وجود دارد
            که عدم آگاهی از آن‌ها می‌تواند کل پروژه مهاجرتی شما را در میانه راه متوقف کند.
          </p>
        </section>

        {/* Hidden Costs Table */}
        <section id="hidden-costs-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول افشای هزینه‌های پنهان مهاجرت (قبل از پرواز و پس از ورود در ۲۰۲۶)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-amber-400/15 text-amber-300 font-black">
                <tr>
                  <th className="p-3.5">مرحله هزینه</th>
                  <th className="p-3.5">عنوان هزینه پنهان</th>
                  <th className="p-3.5">مبلغ واقعی در سال ۲۰۲۶–۲۰۲۷</th>
                  <th className="p-3.5">چرا آژانس‌ها آن را نمی‌گویند؟</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {HIDDEN_COSTS_TABLE.map((row) => (
                  <tr key={row[1]} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-bold text-cyan-200 whitespace-nowrap">{row[0]}</td>
                    <td className="p-3.5 font-black text-white">{row[1]}</td>
                    <td className="p-3.5 font-bold text-amber-300 whitespace-nowrap">{row[2]}</td>
                    <td className="p-3.5 text-slate-300 leading-6">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Phase Breakdown */}
        <section id="costs-in-iran" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              جزئیات ۳ فاز هزینه‌های پنهان (ایران، ماه اول اروپا و ثبت شرکت)
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-300">
              هر مرحله را انتخاب کنید تا ریز هزینه‌های غیرمنتظره و راهکار کنترل آن‌ها را ببینید:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {HIDDEN_COST_PHASES.map((phase) => (
              <button
                key={phase.key}
                type="button"
                onClick={() => setSelectedPhaseKey(phase.key)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer border ${
                  selectedPhaseKey === phase.key
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                {phase.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-amber-400/25 bg-[#06181f] p-5 md:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <h3 className="text-base md:text-lg font-black text-amber-300">{selectedPhase.label}</h3>
              <span className="rounded-full bg-rose-500/15 border border-rose-400/30 px-3 py-1 text-xs font-bold text-rose-200">
                برآورد واقعی: {selectedPhase.totalRange}
              </span>
            </div>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-200">
              {selectedPhase.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 leading-7">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateInternal(selectedPhase.ctaPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                {selectedPhase.ctaLabel} ←
              </button>
            </div>
          </div>
        </section>

        {/* Europe Arrival & Business Sections */}
        <section id="costs-in-europe" className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-black text-base">
              <Home className="h-5 w-5" />
              <h2>شوک مالی ماه‌های اول ورود به اروپا (Kaution و اسکان)</h2>
            </div>
            <p className="text-xs md:text-sm leading-7 text-slate-300 text-justify">
              در وین، مونیخ یا آمستردام، صاحبخانه‌ها در ماه اول علاوه بر اجاره ماه اول (€۹۰۰ تا €۱,۴۰۰)، معادل ۳ ماه
              اجاره را به عنوان ودیعه (Kaution) نقدی دریافت می‌کنند و بسیاری از آپارتمان‌ها بدون آشپزخانه مجهز
              (Einbauküche) تحویل داده می‌شوند. ثبت آدرس (Meldezettel) و کد مالیاتی نیز اولین حقوق را ۱ تا ۲ ماه عقب
              می‌اندازد.
            </p>
          </div>

          <div id="business-hidden-costs" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-black text-base">
              <Briefcase className="h-5 w-5" />
              <h2>هزینه‌های پنهان ثبت شرکت (Steuerberater و بیمه SVS)</h2>
            </div>
            <p className="text-xs md:text-sm leading-7 text-slate-300 text-justify">
              برای شرکت‌های ثبت‌شده در اتریش و آلمان، حسابدار رسمی و مشاور مالیاتی (Steuerberater) ماهانه €۲۵۰ تا
              €۵۰۰ هزینه ثابت دارد (حتی بدون فروش) و بیمه اجباری مدیرعامل (SVS در اتریش) از حدود €۱۶۰ تا €۴۰۰ در ماه
              آغاز شده و در سال سوم بر اساس سود واقعی تسویه می‌شود.
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
            بر اساس تجربه مستقیم تیم اجرایی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران، اصلی‌ترین دلیل
            استرس شدید مهاجران در ماه‌های اول ورود، «خالی شدن ذخیره ارزی به دلیل برنامه‌ریزی مالی ناقص» است. در هلدینگ
            دیاکو، پیش از امضای قرارداد، یک «ترازنامه مالی واقعی از صفر تا صد مهاجرت» شامل تمام هزینه‌های پنهان در
            ایران، ودیعه مسکن مقصد، هزینه حسابدار/بیمه سال اول و ذخیره اضطراری ۳ ماهه تنظیم می‌کنیم.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول هزینه واقعی مهاجرت (FAQ)</h2>
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
              <Calculator className="h-4 w-4" />
              <span>ابزارها و راهنماهای مالی مکمل در دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'cost-calculator', label: 'ماشین‌حساب آنلاین هزینه مهاجرت' },
                { page: 'migrate-with-1-billion-toman', label: 'مهاجرت با ۱ میلیارد تومان (۲۰۲۶–۲۰۲۷)' },
                { page: 'after-arrival', label: 'خدمات پس از ورود و اجاره خانه (Meldezettel)' },
                { page: 'degree-recognition-for-immigration', label: 'هزینه و مراحل معادلسازی مدرک' },
                { page: 'immigration-through-company-registration', label: 'ثبت شرکت و هزینه‌های نگهداری در اروپا' },
                { page: 'document-checker', label: 'چک‌لیست دقیق مدارک سفارت' },
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
              <span>منابع رسمی دولتی و تماس مشاوره ترازنامه</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'پورتال رسمی مهاجرت اتریش (migration.gv.at)', url: 'https://www.migration.gv.at/' },
                { label: 'پورتال رسمی مهاجرت آلمان (Make it in Germany)', url: 'https://www.make-it-in-germany.com/' },
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

export default RealCostHiddenFeesPage;
