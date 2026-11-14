import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Compass,
  ExternalLink,
  Globe,
  List,
  MapPin,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
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

const REGION_STATS = [
  {
    key: 'central-eu',
    region: 'اروپای مرکزی',
    countries: 'آلمان و اتریش',
    share: '~۳۸٪',
    shareNum: 38,
    color: 'from-amber-400 to-amber-500',
    badgeColor: 'text-amber-300 border-amber-400/40 bg-amber-400/10',
    methods: 'ویزای کار تخصصی (بلوکارت / RWR)، آوسبیلدونگ، تحصیل و استارتاپ',
    profile: 'متخصصان IT، کادر درمان، مهندسان و دانشجویان ۲۵ تا ۳۸ سال',
    analysis:
      'آلمان به تنهایی مقصد اول پرستاران، پزشکان، مهندسان و متقاضیان دوره‌های آوسبیلدونگ ایران است؛ همزمان اتریش در صدر انتخاب‌های استارتاپی، خودحمایتی و تحصیل بدون بلوکه سنگین قرار دارد.',
    ctaLabel: 'مقایسه آلمان یا اتریش (۶ معیار واقعی)',
    ctaPage: 'germany-vs-austria-immigration-comparison',
  },
  {
    key: 'south-east-eu',
    region: 'اروپای جنوبی و شرقی',
    countries: 'ایتالیا، اسپانیا، مجارستان و یونان',
    share: '~۲۴٪',
    shareNum: 24,
    color: 'from-cyan-400 to-sky-500',
    badgeColor: 'text-cyan-300 border-cyan-400/40 bg-cyan-400/10',
    methods: 'تحصیل با بورسیه (DSU)، تمکن مالی (D7/اسپانیا)، ثبت شرکت و گلدن ویزا',
    profile: 'دانشجویان کارشناسی/ارشد، خانواده‌های دارای درآمد غیرفعال و سرمایه‌گذاران',
    analysis:
      'بیش از نیمی از دانشجویان ایرانی در اروپا طی دو سال گذشته به دلیل بورسیه استانی DSU (پوشش شهریه + ~۷,۰۰۰ یورو کمک‌هزینه) به ایتالیا رفته‌اند؛ مجارستان و یونان نیز قطب ثبت شرکت و گلدن ویزای خانوادگی هستند.',
    ctaLabel: 'ارزان‌ترین کشورهای اروپایی برای مهاجرت',
    ctaPage: 'cheapest-european-countries-to-immigrate',
  },
  {
    key: 'gulf',
    region: 'حوزه خلیج فارس',
    countries: 'امارات (دبی) و عمان',
    share: '~۲۰٪',
    shareNum: 20,
    color: 'from-emerald-400 to-teal-500',
    badgeColor: 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10',
    methods: 'ثبت شرکت در مناطق آزاد، جاب‌آفر تخصصی و ویزای کادر درمان',
    profile: 'کارآفرینان، پزشکان، پرستاران و مدیران بازرگانی ۳۰ تا ۵۰ سال',
    analysis:
      'معافیت مالیاتی بر درآمد شخصی و سرعت ۲ تا ۳ هفته‌ای صدور اقامت، دبی را به رتبه اول کارآفرینان تبدیل کرده و عمان نیز به دلیل نیاز فوری به پزشکان، دندانپزشکان و پرستاران ایرانی رشد جهشی داشته است.',
    ctaLabel: 'ثبت شرکت و اقامت دبی (کمتر از ۳ هفته)',
    ctaPage: 'business-dubai',
  },
  {
    key: 'north-america',
    region: 'آمریکای شمالی',
    countries: 'کانادا و آمریکا',
    share: '~۱۳٪',
    shareNum: 13,
    color: 'from-indigo-400 to-violet-500',
    badgeColor: 'text-indigo-300 border-indigo-400/40 bg-indigo-400/10',
    methods: 'دکتری و ارشد پژوهشی با فاند کامل، اکسپرس انتری فرانسه‌زبان',
    profile: 'نخبگان دانشگاهی، پژوهشگران STEM و افراد دارای پیوند خانوادگی',
    analysis:
      'سقف‌گذاری مجوزهای تحصیلی کانادا (Study Permits)، محدودیت اجازه کار همسران و افزایش کف تمکن مالی باعث افت ویزای دانشجویی عادی شد؛ تمرکز فعلی بر دکتری فول‌فاند و متخصصان مسلط به زبان فرانسه است.',
    ctaLabel: 'چرا برخی در صف کانادا ۵ سال می‌مانند؟',
    ctaPage: 'why-some-wait-5-years-for-immigration-case-studies',
  },
  {
    key: 'others',
    region: 'سایر مقاصد',
    countries: 'استرالیا، بریتانیا و هلند',
    share: '~۵٪',
    shareNum: 5,
    color: 'from-purple-400 to-fuchsia-500',
    badgeColor: 'text-purple-300 border-purple-400/40 bg-purple-400/10',
    methods: 'ویزاهای نیروی کار فوق‌تخصصی و رشته‌های انگلیسی‌زبان فناوری',
    profile: 'متخصصان ارشد دارای جاب‌آفر مستقیم و نخبگان علمی',
    analysis:
      'با محدودیت سنی ۳۵ سال استرالیا و افزایش حداقل حقوق بریتانیا به ۳۸,۷۰۰ پوند، سهم این مقاصد به نخبگان دارای جاب‌آفر مستقیم و دانشجویان دانشگاه‌های پژوهشی هلند (با ویزای ۱ ساله Zoekjaar) محدود شده است.',
    ctaLabel: 'مهاجرت تحصیلی به هلند (۲۰۲۶)',
    ctaPage: 'netherlands-study-visa',
  },
];

const MAJOR_SHIFTS = [
  {
    num: '۱',
    title: 'چرخش اول: از کانادا و مقاصد انگلیسی‌زبان به اتحادیه اروپا',
    text: 'اعمال سقف پذیرش دانشجویان بین‌المللی در کانادا، محدودیت اجازه کار همسران و افزایش امتیازات اکسپرس انتری، باعث شد بخش بزرگی از تقاضای مهاجرت ایرانیان در بازه ۲۰۲۵–۲۰۲۶ به سمت آلمان، اتریش و ایتالیا هدایت شود.',
  },
  {
    num: '۲',
    title: 'چرخش دوم: اقتصادمحور شدن انتخاب مقصد',
    text: 'به‌دلیل نوسانات نرخ ارز، مسیرهایی که نیاز به سرمایه اولیه سنگین یا حساب بلوکه‌شده دلاری داشتند افت کردند و روش‌های «تحصیل با بورسیه استانی»، «آوسبیلدونگ همراه با حقوق» و «ویزاهای کاری مستقیم» بیش از ۶۵٪ سبد مهاجرتی جوانان را تشکیل دادند.',
  },
  {
    num: '۳',
    title: 'چرخش سوم: مهاجرت تجاری نزدیک به ایران',
    text: 'صاحبان کسب‌وکار، پزشکان و مدیران ایرانی برای حفظ ارتباط با بازار داخل و دسترسی به سیستم بانکی بین‌المللی، امارات (دبی) و اتریش/مجارستان را جایگزین مقاصد دوردست و ترکیه کرده‌اند.',
  },
];

const DEMOGRAPHIC_METRICS = [
  {
    label: 'بازه سنی غالب متقاضیان',
    value: '۷۲٪',
    detail: 'در بازه سنی ۲۲ تا ۳۸ سال قرار دارند (بخش اصلی نیروی کار جوان و دانش‌آموخته).',
  },
  {
    label: 'دارندگان مدرک کارشناسی و ارشد',
    value: '+۶۸٪',
    detail: 'بیش از ۶۸٪ متقاضیان دارای تحصیلات دانشگاهی (به‌ویژه STEM، پزشکی و مدیریت) هستند.',
  },
  {
    label: 'دارندگان مدرک دیپلم و فنی‌وحرفه‌ای',
    value: '۲۲٪',
    detail: 'عمدتاً از مسیر آوسبیلدونگ آلمان با حقوق ماهانه یا تحصیل کارشناسی ایتالیا/اتریش اقدام می‌کنند.',
  },
  {
    label: 'سهم سبد مسیرهای کم‌هزینه در جوانان',
    value: '+۶۵٪',
    detail: 'ترکیب تحصیل با بورسیه DSU، آوسبیلدونگ حقوق‌بگیر و ویزاهای کاری مستقیم اروپا.',
  },
];

const faqs = [
  {
    q: 'در حال حاضر بیشترین آمار مهاجرت ایرانیان به کدام کشور اروپایی است؟',
    a: 'آلمان در بخش مهاجرت کاری و فنی (بلوکارت، کادر درمان و آوسبیلدونگ)، و ایتالیا در بخش مهاجرت تحصیلی (به دلیل بورسیه استانی DSU) بیشترین تعداد ویزای صادرشده برای شهروندان ایرانی را در اتحادیه اروپا به خود اختصاص داده‌اند.',
  },
  {
    q: 'چرا آمار مهاجرت ایرانیان به ترکیه در سال‌های ۲۰۲۵ و ۲۰۲۶ کاهش یافته است؟',
    a: 'به دلیل تورم بالای اقتصادی در ترکیه، افزایش حداقل سرمایه خرید ملک برای شهروندی به ۴۰۰ هزار دلار و محدودیت‌های شدید در تمدید اقامت‌های ملکی و توریستی، بخش بزرگی از ایرانیان مقیم ترکیه نیز سرمایه خود را به سمت امارات، یونان، مجارستان و اتریش منتقل کرده‌اند.',
  },
  {
    q: 'پیش‌بینی نقشه مهاجرت ایرانیان برای سال ۲۰۲۷ چیست؟',
    a: 'پیش‌بینی می‌شود در سال ۲۰۲۷ سهم آلمان و اتریش در جذب نیروی کار فنی و متخصصان IT باز هم افزایش یابد، در حالی که مجارستان، پرتغال و یونان به دلیل برنامه‌های گلدن ویزا و ثبت شرکت کم‌مالیات، مقصد اصلی کارآفرینان ایرانی در اروپا باقی خواهند ماند.',
  },
  {
    q: 'آیا آمار مهاجرت کادر درمان ایران به خارج از کشور همچنان صعودی است؟',
    a: 'بله؛ پزشکان، پرستاران و کمک‌پرستاران ایرانی همچنان یکی از پرتقاضاترین گروه‌های مهاجرتی هستند و کشورهای آلمان، اتریش، عمان و امارات بیشترین سهم جذب کادر درمان ایران را در اختیار دارند.',
  },
];

const tocItems = [
  { id: 'major-shift', label: 'بزرگ‌ترین چرخش در نقشه مهاجرت (۲۰۲۵–۲۰۲۶)' },
  { id: 'statistics-table', label: 'جدول آماری و اینفوگرافیک مقاصد برتر' },
  { id: 'europe-share', label: 'سهم +۶۰٪ اروپا: آلمان، ایتالیا و اتریش' },
  { id: 'north-america-australia', label: 'سهم آمریکای شمالی، استرالیا و بریتانیا' },
  { id: 'gulf-share', label: 'سهم خلیج فارس (دبی و عمان) و افت ترکیه' },
  { id: 'demographic-profile', label: 'پروفایل سنی و تحصیلی مهاجران ایرانی' },
  { id: 'expert-insights', label: 'نکته دیاکو: تله صف‌های شلوغ و مسیرهای موازی' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const IranianImmigrationMapPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedRegionKey, setSelectedRegionKey] = useState<string>('central-eu');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeRegion = REGION_STATS.find((r) => r.key === selectedRegionKey) || REGION_STATS[0];

  useSeo({
    title: 'نقشه مهاجرت ایرانیان در ۲۰۲۵ (و روندهای ۲۰۲۶-۲۰۲۷): به کدام کشورها بیشتر می‌روند؟ | دیاکو',
    description:
      'بررسی داده‌محور نقشه مهاجرت ایرانیان در سال ۲۰۲۵ و روندهای ۲۰۲۶–۲۰۲۷. آمار سهم اروپا (+۶۰٪)، آلمان، ایتالیا، اتریش، دبی، عمان و افت ویزای دانشجویی کانادا.',
    canonical: 'https://www.dia-co.ir/iranian-immigration-map-statistics',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'نقشه مهاجرت ایرانیان ۲۰۲۵ و ۲۰۲۶',
      'آمار مهاجرت ایرانیان به اروپا',
      'بیشترین کشور مقصد مهاجرت ایرانیان',
      'مهاجرت ایرانیان به آلمان ایتالیا اتریش دبی',
      'روندهای مهاجرتی ایرانیان ۲۰۲۶-۲۰۲۷',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/iranian-immigration-map-statistics/#article',
          headline: 'نقشه مهاجرت ایرانیان در ۲۰۲۵ (و روندهای ۲۰۲۶-۲۰۲۷): به کدام کشورها بیشتر می‌روند؟',
          description:
            'بررسی داده‌محور نقشه مهاجرت ایرانیان در سال ۲۰۲۵ و روندهای جدید ۲۰۲۶-۲۰۲۷. آمار مهاجرت تحصیلی، کاری و سرمایه‌گذاری ایرانیان به آلمان، کانادا، ایتالیا، اتریش و امارات.',
          image: [
            'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:39:00+03:30',
          dateModified: '2026-11-14T13:39:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان پژوهش‌های آماری و تحلیل روندهای بین‌الملل هلدینگ مهاجرتی دیاکو',
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
            'https://ec.europa.eu/eurostat',
            'https://www.destatis.de/',
            'https://www.canada.ca/en/immigration-refugees-citizenship.html',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/iranian-immigration-map-statistics',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/iranian-immigration-map-statistics/#faq',
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
              onClick={() => navigateInternal('interactive-map')}
              className="hover:text-[#f5a623] transition cursor-pointer"
            >
              نقشه آماری و روندهای مهاجرت
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">نقشه مهاجرت ایرانیان (۲۰۲۵ تا ۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('iranian-immigration-map-statistics')}
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
              <BarChart3 className="h-3.5 w-3.5" />
              داده آماری و اینفوگرافیک روندهای ۲۰۲۵–۲۰۲۷
            </span>
            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-300" />
              استناد به Eurostat، Destatis و IRCC
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            نقشه مهاجرت ایرانیان در ۲۰۲۵ (و روندهای ۲۰۲۶–۲۰۲۷): به کدام کشورها بیشتر می‌روند؟
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین و تحلیل داده: </span>
              <strong className="text-white">
                دپارتمان پژوهش‌های آماری و تحلیل روندهای بین‌الملل هلدینگ مهاجرتی دیاکو
              </strong>
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
              <span>خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج AI و رسانه‌ها)</span>
            </div>
            <p className="text-sm md:text-base leading-8 text-slate-100 text-justify">
              نقشه مهاجرت ایرانیان در بازه زمانی ۲۰۲۵ تا ۲۰۲۶ شاهد یک تغییر جهت تاریخی از{' '}
              <strong className="text-rose-300">«مقاصد سنتی انگلیسی‌زبان (کانادا، بریتانیا و استرالیا)»</strong> به سمت{' '}
              <strong className="text-amber-300">«اتحادیه اروپا (+۶۰٪ تقاضا؛ به‌ویژه آلمان، ایتالیا و اتریش)»</strong>{' '}
              و <strong className="text-emerald-300">«حوزه خلیج فارس (~۲۰٪؛ امارات و عمان)»</strong> بوده است. آلمان
              رتبه نخست مقاصد کاری و فنی را دارد؛ ایتالیا با بورسیه استانی (DSU) محبوب‌ترین مقصد دانشجویی است؛ اتریش
              و مجارستان در صدر انتخاب‌های استارتاپی و خودحمایتی اروپا قرار گرفته‌اند؛ و دبی رتبه اول جذب کارآفرینان
              ایرانی در خاورمیانه را در اختیار دارد.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>تعیین جایگاه شما در نقشه مهاجرت ۲۰۲۶–۲۰۲۷</span>
              <Rocket className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('best-countries-to-immigrate-to')}
              className="rounded-2xl border border-cyan-400/35 bg-cyan-500/10 hover:bg-cyan-500/20 px-5 py-3.5 text-sm font-bold text-cyan-200 transition cursor-pointer"
            >
              بهترین کشور برای مهاجرت (۲۰۲۶–۲۰۲۷)
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('interactive-map')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              نقشه پرونده‌های موفق دیاکو
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
            <span>فهرست مطالب نقشه آماری مهاجرت ایرانیان (۲۰۲۵ تا ۲۰۲۷)</span>
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

        {/* Major Shifts */}
        <section id="major-shift" className="space-y-5">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="h-6 w-6 text-amber-300" />
            <h2 className="text-xl md:text-2xl font-black text-white">
              بزرگ‌ترین چرخش در نقشه مهاجرت ایرانیان (۲۰۲۵ تا ۲۰۲۶) چیست؟
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {MAJOR_SHIFTS.map((shift) => (
              <div key={shift.num} className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/15 text-sm font-black text-amber-300 border border-amber-400/30">
                  {shift.num}
                </div>
                <h3 className="text-sm md:text-base font-black text-white leading-6">{shift.title}</h3>
                <p className="text-xs md:text-sm leading-7 text-slate-300 text-justify">{shift.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Share Explorer + Infographic Bar */}
        <section className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                <Compass className="h-6 w-6 text-cyan-300 shrink-0" />
                <span>کاوشگر سهم مناطق جهان در نقشه مهاجرت ایرانیان (۲۰۲۵–۲۰۲۶)</span>
              </h2>
              <p className="mt-1 text-xs md:text-sm text-slate-300">
                روی هر منطقه جغرافیایی کلیک کنید تا سهم دقیق، روش‌های غالب ویزا و پروفایل متقاضیان را ببینید:
              </p>
            </div>
          </div>

          {/* Visual Bar Chart */}
          <div className="space-y-3 rounded-2xl border border-white/10 bg-[#06181f] p-5">
            {REGION_STATS.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setSelectedRegionKey(r.key)}
                className={`w-full text-right rounded-xl p-3 transition cursor-pointer border ${
                  selectedRegionKey === r.key
                    ? 'border-[#f5a623] bg-white/[0.06]'
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-black text-white flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-amber-300" />
                    <span>{r.region}</span>
                    <span className="text-slate-400 font-normal">({r.countries})</span>
                  </span>
                  <span className="font-black text-amber-300">{r.share}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-l ${r.color}`}
                    style={{ width: `${Math.max(r.shareNum * 2.2, 10)}%` }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Selected Region Deep Dive */}
          <div className="rounded-2xl border border-cyan-400/25 bg-[#06181f] p-5 md:p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base md:text-lg font-black text-amber-300">
                {activeRegion.region}: {activeRegion.countries} ({activeRegion.share} از کل تقاضا)
              </h3>
              <span className={`rounded-full border px-3 py-1 text-[11px] font-bold ${activeRegion.badgeColor}`}>
                گروه اصلی: {activeRegion.profile}
              </span>
            </div>
            <p className="text-xs md:text-sm text-cyan-200 font-semibold">
              روش‌های غالب مهاجرتی: {activeRegion.methods}
            </p>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">{activeRegion.analysis}</p>
            <div>
              <button
                type="button"
                onClick={() => navigateInternal(activeRegion.ctaPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                {activeRegion.ctaLabel} ←
              </button>
            </div>
          </div>
        </section>

        {/* Statistical Table */}
        <section id="statistics-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول آماری و اینفوگرافیک مقاصد برتر مهاجرت ایرانیان (به تفکیک قاره و هدف)
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-7">
            داده‌های جدول زیر برای استناد تحلیلی و رسانه‌ای بر اساس الگوهای صدور روادید و جابه‌جایی جمعیت در بازه
            ۲۰۲۵–۲۰۲۶ دسته‌بندی شده‌اند:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-amber-400/15 text-amber-300 font-black">
                <tr>
                  <th className="p-3.5">منطقه جغرافیایی</th>
                  <th className="p-3.5">کشورهای پیشتاز در جذب ایرانیان</th>
                  <th className="p-3.5">سهم تخمینی از کل تقاضا</th>
                  <th className="p-3.5">روش غالب مهاجرت ایرانیان</th>
                  <th className="p-3.5">گروه سنی و تحصیلی اصلی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {REGION_STATS.map((row) => (
                  <tr key={row.key} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-white whitespace-nowrap">{row.region}</td>
                    <td className="p-3.5 text-cyan-200 font-bold">{row.countries}</td>
                    <td className="p-3.5 font-black text-amber-300 whitespace-nowrap">{row.share}</td>
                    <td className="p-3.5 text-slate-200 leading-6">{row.methods}</td>
                    <td className="p-3.5 text-slate-300 leading-6">{row.profile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Europe, North America & Gulf Breakdowns */}
        <section className="grid gap-6 md:grid-cols-3">
          <div id="europe-share" className="rounded-3xl border border-cyan-400/25 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-black text-sm">
              <Globe className="h-5 w-5" />
              <span>سهم +۶۰٪ اروپا: آلمان، ایتالیا و اتریش</span>
            </div>
            <ul className="space-y-2.5 text-xs leading-6 text-slate-200">
              <li>
                <strong className="text-amber-300">آلمان (مقصد اول متخصصان و کادر درمان):</strong> به دلیل قانون جدید
                مهاجرت نیروی کار، کارت فرصت و پذیرش دوتابعیتی، مقصد اول پرستاران، پزشکان، مهندسان و آوسبیلدونگ ایران
                است (Destatis).
              </li>
              <li>
                <strong className="text-amber-300">ایتالیا (مقصد اول دانشجویان):</strong> بیش از نیمی از دانشجویان ایرانی
                در اروپا دانشگاه‌های میلان، تورین، ساپینزا و بولونیا را به‌خاطر بورسیه استانی DSU انتخاب کرده‌اند.
              </li>
              <li>
                <strong className="text-amber-300">اتریش و مجارستان:</strong> به دلیل موقعیت مرکزی، امنیت بالا و امکان
                همراهی خانواده در تحصیل و ثبت شرکت، رشد +۴۰٪ تقاضا داشته‌اند.
              </li>
            </ul>
          </div>

          <div id="north-america-australia" className="rounded-3xl border border-indigo-400/25 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 font-black text-sm">
              <CheckCircle2 className="h-5 w-5" />
              <span>آمریکای شمالی و استرالیا: افت آمار دانشجویی</span>
            </div>
            <p className="text-xs leading-7 text-slate-200 text-justify">
              کانادا که در سال‌های ۲۰۲۱ تا ۲۰۲۳ در صدر جستجوها و صدور ویزای تحصیلی ایرانیان قرار داشت، در ۲۰۲۵ و ۲۰۲۶
              به دلیل سقف‌گذاری مجوزهای تحصیلی (Study Permits) و افزایش حداقل تمکن مالی، با افت شدید صدور ویزای
              دانشجویی روبه‌رو شد. مهاجرت به کانادا و آمریکا اکنون عمدتاً به دکتری با فاند کامل یا متخصصان مسلط به
              فرانسه محدود شده است.
            </p>
          </div>

          <div id="gulf-share" className="rounded-3xl border border-emerald-400/25 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-black text-sm">
              <Sparkles className="h-5 w-5" />
              <span>خلیج فارس (دبی و عمان) و خروج از ترکیه</span>
            </div>
            <ul className="space-y-2.5 text-xs leading-6 text-slate-200">
              <li>
                <strong className="text-emerald-300">امارات (دبی):</strong> بزرگ‌ترین مرکز تجاری ایرانیان خارج از کشور
                با معافیت مالیات بر درآمد شخصی و صدور ۲ هفته‌ای اقامت ثبت شرکت.
              </li>
              <li>
                <strong className="text-emerald-300">سلطنت عمان:</strong> رشد چشمگیر جذب پزشکان، دندانپزشکان، پرستاران و
                مهندسان ایرانی با هزینه زندگی منطقی‌تر نسبت به دبی.
              </li>
              <li>
                <strong className="text-rose-300">افت ترکیه:</strong> تورم و افزایش کف شهروندی ملکی به ۴۰۰ هزار دلار باعث
                انتقال سرمایه از ترکیه به امارات، یونان، مجارستان و اتریش شده است.
              </li>
            </ul>
          </div>
        </section>

        {/* Demographic Profile */}
        <section id="demographic-profile" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-amber-300 shrink-0" />
            <span>پروفایل سنی و تحصیلی مهاجران ایرانی (داده‌های کلیدی قابل بازنشر)</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEMOGRAPHIC_METRICS.map((m) => (
              <div key={m.label} className="rounded-2xl border border-white/10 bg-[#06181f] p-5 space-y-2">
                <div className="text-2xl md:text-3xl font-black text-amber-300">{m.value}</div>
                <div className="text-xs font-black text-white">{m.label}</div>
                <p className="text-[11px] leading-6 text-slate-300">{m.detail}</p>
              </div>
            ))}
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
            بر اساس داده‌های تحلیلی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران، یک خطای رایج در میان
            متقاضیان این است که{' '}
            <strong className="text-amber-300">«صرفاً به دنبال شلوغ‌ترین مسیر روی نقشه مهاجرت می‌روند»</strong>. وقتی
            تقاضا برای یک مسیر خاص (مثلاً وقت سفارت آلمان یا ایتالیا در تهران) به اوج می‌رسد، زمان انتظار مصاحبه
            طولانی‌تر می‌شود. هنر مشاوره حقوقی، حرکت به سمت «مسیرهای موازی و کم‌ترافیک‌تر در همان منطقه» است؛ مانند
            استفاده از مسیر تسریع‌شده نیروی کار متخصص در آلمان (Beschleunigtes Fachkräfteverfahren) یا انتخاب مسیرهای
            دانشگاهی و کارآفرینی اتریش و مجارستان با زمان صدور کوتاه‌تر و قابل‌پیش‌بینی‌تر در ۲۰۲۶–۲۰۲۷.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول درباره نقشه مهاجرت ایرانیان (FAQ)</h2>
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
              <span>مسیرهای کلیدی روی نقشه مهاجرت ایرانیان ۲۰۲۶–۲۰۲۷</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'germany-vs-austria-immigration-comparison', label: 'مقایسه آلمان یا اتریش (۶ معیار)' },
                { page: 'best-countries-to-immigrate-to', label: 'بهترین کشور برای مهاجرت ۲۰۲۶–۲۰۲۷' },
                { page: 'cheapest-european-countries-to-immigrate', label: 'ارزان‌ترین کشورهای اروپایی' },
                { page: 'immigration-through-company-registration', label: 'ثبت شرکت در اروپا و دبی' },
                { page: 'why-some-wait-5-years-for-immigration-case-studies', label: 'چرا بعضی‌ها ۵ سال در صف می‌مانند؟' },
                { page: 'countries-we-do-not-recommend-for-immigration', label: 'کشورهایی که توصیه نمی‌کنیم' },
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
              <span>منابع آماری رسمی و مشاوره طراحی نقشه راه</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'اداره آمار اتحادیه اروپا (Eurostat)', url: 'https://ec.europa.eu/eurostat' },
                { label: 'اداره فدرال آمار آلمان (Destatis)', url: 'https://www.destatis.de/' },
                {
                  label: 'اداره مهاجرت کانادا (IRCC)',
                  url: 'https://www.canada.ca/en/immigration-refugees-citizenship.html',
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

export default IranianImmigrationMapPage;
