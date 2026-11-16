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
  Home,
  List,
  Globe,
  PhoneCall,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const HEAD_TO_HEAD_TABLE = [
  [
    '۱. وسعت بازار کار و حقوق',
    'بزرگترین اقتصاد اروپا؛ تنوع شغلی بسیار بالا در ده‌ها شهر صنعتی',
    'اقتصاد باثبات اما کوچکتر؛ تمرکز شدید مشاغل در وین، گراتس و لینتس',
    'آلمان 🇩🇪',
  ],
  [
    '۲. هزینه مسکن و کیفیت زندگی',
    'بحران شدید مسکن و اجاره‌های بسیار بالا در مونیخ، برلین و فرانکفورت',
    'کنترل دولتی اجاره‌ها (Gemeindebau) و رتبه‌بندی جهانی کیفیت زندگی در وین',
    'اتریش 🇦🇹',
  ],
  [
    '۳. قوانین ویزای کاری',
    'کارت فرصت (Chancenkarte) بدون جاب‌آفر + آوسبیلدونگ رایگان',
    'کارت قرمز-سفید-قرمز (Rot-Weiß-Rot) با همترازی امتیاز زبان انگلیسی',
    'آلمان (برای تنوع)',
  ],
  [
    '۴. تحصیل و تمکن مالی اولیه',
    'نیاز به حساب بلوکه‌شده حدود ۱۲,۰۰۰ یورو در بانک آلمانی',
    'عدم نیاز به بلوکه کردن پول + شهریه دولتی ثابت حدود ۷۵۰ یورو در ترم',
    'اتریش 🇦🇹',
  ],
  [
    '۵. ثبت شرکت و استارتاپ',
    'بوروکراسی سنگین‌تر در اثبات نیاز منطقه‌ای (§ 21)',
    'ساختار منعطف FlexKapG، ویزای استارتاپ و ویزای خودحمایتی فعال',
    'اتریش 🇦🇹',
  ],
  [
    '۶. اقامت دائم و پاسپورت',
    'اقامت دائم پس از ۳ تا ۵ سال + پاسپورت در ۳ تا ۵ سال (با دوتابعیتی)',
    'اقامت دائم پس از ۵ سال + پاسپورت پس از ۶ تا ۱۰ سال (محدودیت دوتابعیتی)',
    'آلمان 🇩🇪',
  ],
];

const CRITERIA_TABS = [
  {
    key: 'c1',
    anchor: 'criterion-1-salary-tax',
    label: '۱. بازار کار و حقوق',
    winner: 'برنده: آلمان 🇩🇪',
    title: 'معیار اول: بازار کار، میزان حقوق و مالیات بر درآمد',
    points: [
      'اگر هدف شما کار تخصصی در حوزه‌های مهندسی، فناوری اطلاعات (IT)، پزشکی و صنعت است، آلمان به دلیل داشتن ده‌ها قطب صنعتی (مونیخ، اشتوتگارت، فرانکفورت، هامبورگ، برلین) فرصت‌های شغلی به‌مراتب بیشتری دارد.',
      'حقوق و مزایا: میانگین حقوق ناخالص در دو کشور نزدیک است، اما در اتریش طبق قانون کار، کارمندان ۱۴ حقوق در سال دریافت می‌کنند (۱۲ حقوق ماهانه + ۲ حقوق اضافه تعطیلات تابستانی و کریسمس با مالیات ناچیز).',
      'مالیات: نرخ مالیات بر درآمد در هر دو کشور تصاعدی و بین ۳۰ تا ۴۵ درصد است، اما قدرت خرید واقعی در شهرهای اتریش به دلیل هزینه‌های منطقی‌تر مسکن و حمل‌ونقل بسیار متعادل‌تر است.',
    ],
    ctaLabel: 'بررسی بلوکارت آلمان (۲۰۲۶)',
    ctaPage: 'german-blue-card',
  },
  {
    key: 'c2',
    anchor: 'criterion-2-housing-lifestyle',
    label: '۲. مسکن و کیفیت زندگی',
    winner: 'برنده: اتریش 🇦🇹',
    title: 'معیار دوم: هزینه واقعی مسکن و کیفیت زندگی روزمره',
    points: [
      'در سال‌های ۲۰۲۶ و ۲۰۲۷، بزرگترین چالش مهاجران در آلمان یافتن خانه و قیمت سرسام‌آور اجاره در مونیخ، برلین و فرانکفورت است که گاهی نیمی از حقوق خالص را می‌بلعد.',
      'در اتریش (به‌ویژه وین) به لطف سیستم مسکن اجتماعی (Gemeindebau) و قوانین سخت‌گیرانه کنترل اجاره (Mietrechtsgesetz)، ثبات قیمتی بسیار بهتری حاکم است.',
      'بلیت سالانه ۳۶۵ یورویی حمل‌ونقل عمومی وین، امنیت خیابان‌ها و دسترسی سریع به آلپ، اتریش را برنده مطلق کیفیت زندگی کرده است.',
    ],
    ctaLabel: 'راهنمای کامل کشور اتریش و وین',
    ctaPage: 'country-guide',
  },
  {
    key: 'c3',
    anchor: 'criterion-3-work-visa',
    label: '۳. ویزای کاری و جستجو',
    winner: 'برنده: آلمان (برای تنوع) 🇩🇪',
    title: 'معیار سوم: قوانین ویزای کاری و جستجوی کار (Chancenkarte در برابر RWR)',
    points: [
      'آلمان با کارت فرصت (Chancenkarte) اجازه می‌دهد بدون قرارداد کاری، صرفاً با کسب ۶ امتیاز (مدرک تحصیلی، سابقه کار و آلمانی A1 یا انگلیسی B2) وارد آلمان شوید و تا ۱ سال دنبال کار بگردید؛ ضمن اینکه آوسبیلدونگ نیز بی‌رقیب است.',
      'اتریش با کارت قرمز-سفید-قرمز (Rot-Weiß-Rot – Karte) در سال ۲۰۲۶ با همترازی امتیاز زبان انگلیسی با آلمانی بسیار منعطف‌تر شده است، اما در اغلب زیرشاخه‌ها به جاب‌آفر از کارفرمای اتریشی نیاز دارد.',
    ],
    ctaLabel: 'مقایسه کارت فرصت آلمان و RWR اتریش',
    ctaPage: 'austria-rwr',
  },
  {
    key: 'c4',
    anchor: 'criterion-4-study-family',
    label: '۴. تحصیل و ویزای همراه',
    winner: 'برنده: اتریش 🇦🇹',
    title: 'معیار چهارم: مهاجرت تحصیلی و قوانین ویزای همراه خانواده',
    points: [
      'در آلمان برای ویزای دانشجویی باید حدود ۱۲,۰۰۰ یورو را در یک حساب بانکی آلمانی مسدود (Blocked) کنید.',
      'در اتریش نیازی به مسدود کردن پول در بانک اروپایی نیست، تمکن از حساب بانکی ایران اثبات می‌شود و هزینه ثبت‌نام در دانشگاه‌های دولتی €۷۲۶.۷۲ شهریه بعلاوه €۲۶.۲۰ حق عضویت ÖH (مجموع €۷۵۲.۹۲ در هر ترم) است.',
      'در اتریش دانشجویان کارشناسی ارشد و دکتری می‌توانند بلافاصله برای همسر و فرزندان زیر ۱۸ سال ویزای پیوست بگیرند و همسر از روز اول اجازه کار تمام‌وقت دارد.',
    ],
    ctaLabel: 'شرایط تحصیل در دانشگاه‌های اتریش',
    ctaPage: 'academic-austria',
  },
  {
    key: 'c5',
    anchor: 'criterion-5-business',
    label: '۵. ثبت شرکت و استارتاپ',
    winner: 'برنده: اتریش 🇦🇹',
    title: 'معیار پنجم: ثبت شرکت، استارتاپ و اقامت سرمایه‌گذاری',
    points: [
      'ویزای استارتاپ اتریش: با کسب ۵۰ امتیاز، سرمایه شرکتی ۵۰ هزار یورو و تاییدیه سازمان AWS، اقامت ۲ ساله قابل تمدید صادر می‌شود.',
      'اقامت خودحمایتی اتریش (بدون اجازه کار): برای خانواده‌های دارای تمکن و درآمد غیرفعال در ایران با سهمیه سالانه فعال است؛ در حالی که آلمان اساساً چنین ویزایی ندارد.',
      'در آلمان ثبت شرکت (§ 21 AufenthG) نیازمند تایید اتاق بازرگانی منطقه مبنی بر «نیاز اقتصادی و منطقه‌ای» و فرآیند اداری سنگین‌تر است.',
    ],
    ctaLabel: 'جزئیات ویزای استارتاپ اتریش',
    ctaPage: 'startup-austria',
  },
  {
    key: 'c6',
    anchor: 'criterion-6-passport',
    label: '۶. اقامت دائم و پاسپورت',
    winner: 'برنده: آلمان 🇩🇪',
    title: 'معیار ششم: مسیر رسیدن به اقامت دائم و پاسپورت (قانون دوتابعیتی)',
    points: [
      'آلمان: با قانون جدید تابعیت، پس از ۵ سال (و در صورت ادغام فوق‌العاده و زبان C1 پس از ۳ سال) پاسپورت صادر می‌شود و دوتابعیتی رسماً پذیرفته شده است (بدون نیاز به ترک تابعیت ایرانی).',
      'اتریش: اقامت دائم (Daueraufenthalt – EU) پس از ۵ سال صادر می‌شود، اما پاسپورت معمولاً پس از ۱۰ سال (یا ۶ سال با B2 آلمانی و ادغام ویژه) و با سخت‌گیری شدید در حفظ تابعیت قبلی اعطا می‌گردد.',
    ],
    ctaLabel: 'مقایسه جدول ویزاها و اقامت دائم',
    ctaPage: 'visa-comparator',
  },
];

const faqs = [
  {
    q: 'آیا زبان آلمانی در اتریش با آلمانی در آلمان فرق دارد؟',
    a: 'زبان رسمی، اداری و دانشگاهی در هر دو کشور آلمانی استاندارد (Hochdeutsch) است و مدارک زبان گوته، ÖSD و Telc در هر دو کشور کاملاً معتبر هستند؛ تنها لهجه محاوره‌ای مردم در اتریش کمی نرم‌تر است.',
  },
  {
    q: 'هزینه زندگی یک خانواده ۳ نفره در وین ارزان‌تر است یا مونیخ؟',
    a: 'در سال‌های ۲۰۲۶ و ۲۰۲۷، هزینه اجاره مسکن و مخارج جاری یک خانواده ۳ نفره در وین به‌طور میانگین ۱۵ تا ۲۵ درصد ارزان‌تر از مونیخ و فرانکفورت است، در حالی که کیفیت خدمات درمانی و آموزشی در همان سطح قرار دارد.',
  },
  {
    q: 'اگر مدرک زبان آلمانی نداشته باشم، کدام کشور برای کار مناسب‌تر است؟',
    a: 'در مشاغل حوزه IT، مهندسی و استارتاپ‌ها، در شهرهایی مانند برلین و وین شرکت‌های بین‌المللی زیادی به زبان انگلیسی کار می‌کنند؛ اما در کل آلمان به دلیل وسعت بیشتر شرکت‌های چندملیتی، فرصت‌های شغلی انگلیسی‌زبان بیشتری دارد.',
  },
  {
    q: 'آیا با کارت اقامت اتریش می‌توان در آلمان کار کرد؟',
    a: 'خیر؛ کارت اقامت موقت هر کشور تنها اجازه کار در همان کشور را می‌دهد و برای سفر به سایر کشورهای شینگن (حداکثر ۹۰ روز در هر ۱۸۰ روز) معتبر است. تنها پس از دریافت اقامت دائم اتحادیه اروپا (پس از ۵ سال) حق جابه‌جایی شغلی بین کشورهای عضو با شرایط تسهیل‌شده فراهم می‌شود.',
  },
];

const tocItems = [
  { id: 'comparison-table', label: 'جدول مقایسه رو در رو در یک نگاه' },
  { id: 'criterion-1-salary-tax', label: 'معیار ۱ تا ۳: کار، مسکن و ویزاهای کاری' },
  { id: 'criterion-4-study-family', label: 'معیار ۴ تا ۶: تحصیل، بیزینس و پاسپورت' },
  { id: 'final-verdict', label: 'حکم نهایی: آلمان یا اتریش؟' },
  { id: 'expert-insights', label: 'استراتژی تکمیلی وین-آلمان هلدینگ دیاکو' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const GermanyVsAustriaComparisonPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [activeCriterion, setActiveCriterion] = useState<string>('c1');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedCriterion =
    CRITERIA_TABS.find((c) => c.key === activeCriterion) || CRITERIA_TABS[0];

  useSeo({
    title: 'آلمان یا اتریش برای مهاجرت در ۲۰۲۶-۲۰۲۷؟ | مقایسه صریح بر اساس ۶ معیار واقعی | دیاکو',
    description:
      'مقایسه صادقانه و بی‌پرده مهاجرت به آلمان یا اتریش در سال‌های ۲۰۲۶ و ۲۰۲۷ بر اساس ۶ معیار واقعی: حقوق، مالیات، هزینه مسکن، سرعت اخذ پاسپورت و ویزای همراه.',
    canonical: 'https://www.dia-co.ir/germany-vs-austria-immigration-comparison',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'آلمان یا اتریش برای مهاجرت ۲۰۲۶',
      'مقایسه مهاجرت به آلمان و اتریش ۲۰۲۷',
      'تفاوت کارت فرصت آلمان و کارت RWR اتریش',
      'قانون دوتابعیتی آلمان در برابر اتریش',
      'مقایسه هزینه زندگی وین و مونیخ',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/germany-vs-austria-immigration-comparison/#article',
          headline: 'آلمان یا اتریش برای مهاجرت در ۲۰۲۶-۲۰۲۷؟ | مقایسه صریح بر اساس ۶ معیار واقعی',
          description:
            'مقایسه صادقانه و بی‌پرده مهاجرت به آلمان یا اتریش در سال‌های ۲۰۲۶ و ۲۰۲۷ بر اساس ۶ معیار واقعی: حقوق، مالیات، هزینه مسکن، سرعت اخذ پاسپورت و ویزای همراه.',
          image: [
            'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:29:00+03:30',
          dateModified: '2026-11-14T13:29:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و ارزیابی مهاجرت اروپا هلدینگ مهاجرتی دیاکو',
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
            '@id': 'https://www.dia-co.ir/germany-vs-austria-immigration-comparison',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/germany-vs-austria-immigration-comparison/#faq',
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
              مقایسه مقاصد مهاجرتی
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">آلمان یا اتریش (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('germany-vs-austria-immigration-comparison')}
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
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-wrap items-center gap-2.5 text-xs mb-4">
            <span className="rounded-full bg-amber-400/15 border border-amber-400/40 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5" />
              مقایسه تخصصی آلمان 🇩🇪 در برابر اتریش 🇦🇹
            </span>
            <span className="rounded-full bg-cyan-500/10 border border-cyan-400/30 px-3 py-1 font-bold text-cyan-200 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-300" />
              بازبینی دفتر مرکزی وین و کارگروه آلمان دیاکو
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            آلمان یا اتریش برای مهاجرت در ۲۰۲۶–۲۰۲۷؟ پاسخ صریح بر اساس ۶ معیار واقعی
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان حقوقی و ارزیابی مهاجرت اروپا هلدینگ دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">بازبینی اجرایی: </span>
              <strong className="text-amber-300">دفتر اجرایی هلدینگ دیاکو در وین</strong>
            </div>
          </div>

          {/* BLUF Box */}
          <div className="mt-6 rounded-3xl border border-amber-400/40 bg-gradient-to-l from-[#122e39] via-[#0b2732] to-[#081f27] p-6 md:p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-black text-amber-300 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج AI)</span>
            </div>
            <p className="text-sm md:text-base leading-8 text-slate-100 text-justify">
              انتخاب میان آلمان یا اتریش در سال‌های ۲۰۲۶ و ۲۰۲۷ به هدف اصلی شما بستگی دارد:{' '}
              <strong className="text-amber-300">آلمان</strong> برای کسانی که به دنبال بازار کار بزرگ‌تر، تنوع بالای
              فرصت‌های شغلی، حقوق خالص بالاتر در مشاغل تخصصی و دریافت سریع‌تر پاسپورت (۳ تا ۵ سال با پذیرش رسمی
              دوتابعیتی) هستند، انتخاب برتر است. در مقابل، <strong className="text-cyan-300">اتریش</strong> برای کسانی
              که به دنبال کیفیت بالاتر زندگی روزمره، کنترل بهتر اجاره مسکن (به‌ویژه در وین)، تحصیل بدون نیاز به حساب
              بلوکه‌شده و قوانین شفاف‌تر برای کارآفرینی، استارتاپ و ویزای خودحمایتی هستند، گزینه مناسب‌تری محسوب
              می‌شود.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>ارزیابی رایگان: آلمان برای شما بهتر است یا اتریش؟</span>
              <Scale className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('austria-rwr')}
              className="rounded-2xl border border-cyan-400/35 bg-cyan-500/10 hover:bg-cyan-500/20 px-5 py-3.5 text-sm font-bold text-cyan-200 transition cursor-pointer"
            >
              کارت قرمز-سفید-قرمز اتریش (RWR)
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('german-blue-card')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              بلوکارت آلمان (۲۰۲۶)
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
            <span>فهرست مطالب مقایسه آلمان و اتریش (۲۰۲۶–۲۰۲۷)</span>
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

        {/* Comparison Table */}
        <section id="comparison-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول مقایسه رو در روی آلمان و اتریش در یک نگاه (۲۰۲۶–۲۰۲۷)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-amber-400/15 text-amber-300 font-black">
                <tr>
                  <th className="p-3.5">معیار مقایسه</th>
                  <th className="p-3.5">🇩🇪 آلمان (Germany)</th>
                  <th className="p-3.5">🇦🇹 اتریش (Austria)</th>
                  <th className="p-3.5">برنده این معیار</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {HEAD_TO_HEAD_TABLE.map((row) => (
                  <tr key={row[0]} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-white whitespace-nowrap">{row[0]}</td>
                    <td className="p-3.5 text-slate-200 leading-6">{row[1]}</td>
                    <td className="p-3.5 text-cyan-200 leading-6">{row[2]}</td>
                    <td className="p-3.5 font-black text-emerald-300 whitespace-nowrap">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Explorer */}
        <section className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              بررسی تعاملی ۶ معیار تصمیم‌ساز بین آلمان و اتریش
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-300">
              هر معیار را انتخاب کنید تا جزئیات اجرایی، اعداد حقوق و مالیات ۲۰۲۶ و برنده واقعی آن را ببینید:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CRITERIA_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCriterion(tab.key)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer border ${
                  activeCriterion === tab.key
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-amber-400/25 bg-[#06181f] p-5 md:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <h3 className="text-base md:text-lg font-black text-amber-300">{selectedCriterion.title}</h3>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/35 px-3 py-1 text-xs font-black text-emerald-300">
                {selectedCriterion.winner}
              </span>
            </div>
            <ul className="space-y-2.5 text-xs md:text-sm leading-7 text-slate-200">
              {selectedCriterion.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => navigateInternal(selectedCriterion.ctaPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                {selectedCriterion.ctaLabel} ←
              </button>
            </div>
          </div>
        </section>

        {/* Full 6 Criteria Detailed Cards (ToC Anchors) */}
        <section id="criterion-1-salary-tax" className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
              <Briefcase className="h-4 w-4" />
              <span>۱. بازار کار، حقوق (۱۴ فیش اتریش) و مالیات</span>
            </div>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              آلمان در مهندسی، IT و پزشکی ده‌ها شهر صنعتی دارد. میانگین حقوق نزدیک است اما در اتریش کارمندان ۱۴
              حقوق در سال می‌گیرند (۱۲ ماهه + ۲ پاداش تابستان و کریسمس با مالیات ناچیز).
            </p>
          </div>
          <div id="criterion-2-housing-lifestyle" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-black text-sm">
              <Home className="h-4 w-4" />
              <span>۲. مسکن کنترل‌شده و کیفیت زندگی وین</span>
            </div>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              در مونیخ و برلین رقابت شدید اجاره وجود دارد؛ اما وین با مسکن اجتماعی (Gemeindebau)، قانون کنترل اجاره و
              بلیت سالانه ۳۶۵ یورویی، ۱۵ تا ۲۵ درصد مقرون‌به‌صرفه‌تر برای خانواده‌هاست.
            </p>
          </div>
          <div id="criterion-3-work-visa" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-black text-sm">
              <ShieldCheck className="h-4 w-4" />
              <span>۳. کارت فرصت آلمان در برابر RWR اتریش</span>
            </div>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              کارت فرصت آلمان (۶ امتیاز بدون جاب‌آفر) و آوسبیلدونگ زیر ۳۵ سال بی‌رقیب‌اند؛ اتریش در ۲۰۲۶ زبان
              انگلیسی را در امتیاز RWR همتراز آلمانی کرده اما عمدتاً نیازمند پیشنهاد شغلی است.
            </p>
          </div>
        </section>

        <section id="criterion-4-study-family" className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
              <GraduationCap className="h-4 w-4" />
              <span>۴. تحصیل و پیوست خانواده</span>
            </div>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              آلمان حدود ۱۲,۰۰۰ یورو حساب بلوکه‌شده می‌خواهد؛ اتریش با شهریه ~۷۵۰ یورویی و بدون اجبار حساب بلوکه، به
              همسر دانشجوی ارشد و دکتری از روز اول اجازه کار تمام‌وقت می‌دهد.
            </p>
          </div>
          <div id="criterion-5-business" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-black text-sm">
              <Building2 className="h-4 w-4" />
              <span>۵. ثبت شرکت، استارتاپ و تمکن مالی</span>
            </div>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              اتریش با ویزای استارتاپ ۵۰ امتیازی (۵۰ هزار یورو)، ساختار شرکتی FlexKapG و سهمیه خودحمایتی فعال است؛
              آلمان در § 21 نیازمند اثبات نیاز اقتصادی منطقه‌ای و بوروکراسی سنگین‌تر است.
            </p>
          </div>
          <div id="criterion-6-passport" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-black text-sm">
              <Globe className="h-4 w-4" />
              <span>۶. پاسپورت و قانون دوتابعیتی</span>
            </div>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              آلمان با پذیرش رسمی دوتابعیتی در ۳ تا ۵ سال پاسپورت می‌دهد؛ اتریش اقامت دائم EU را در ۵ سال صادر می‌کند
              اما برای پاسپورت معمولاً ۶ تا ۱۰ سال اقامت و ترک تابعیت قبلی می‌خواهد.
            </p>
          </div>
        </section>

        {/* Final Verdict */}
        <section id="final-verdict" className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-amber-400/35 bg-[#08222b] p-6 space-y-3">
            <h2 className="text-lg font-black text-amber-300">🇩🇪 آلمان را انتخاب کنید اگر:</h2>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">
              به دنبال پیدا کردن سریع شغل تخصصی در یک بازار کار عظیم هستید، می‌خواهید از طریق آوسبیلدونگ یا کارت
              فرصت (Chancenkarte) بدون جاب‌آفر وارد اروپا شوید، یا دریافت سریع پاسپورت دوم (۳ تا ۵ ساله) با حفظ
              تابعیت ایرانی اولویت اول شماست.
            </p>
          </div>
          <div className="rounded-3xl border border-cyan-400/35 bg-[#08222b] p-6 space-y-3">
            <h2 className="text-lg font-black text-cyan-300">🇦🇹 اتریش را انتخاب کنید اگر:</h2>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">
              آرامش، امنیت، کیفیت بالای زندگی در شهری مثل وین، کنترل اجاره مسکن و هزینه‌های تحصیل دانشگاهی بدون نیاز
              به بلوکه کردن پول برای شما مهم‌تر است؛ یا قصد دارید از طریق ویزای استارتاپ، ثبت شرکت یا اقامت خودحمایتی به
              همراه خانواده مهاجرت کنید.
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
            بر اساس تجربه مستقیم تیم حقوقی و اجرایی هلدینگ مهاجرتی دیاکو با دفتر مرکزی فعال در وین اتریش و پرونده‌های
            متعدد کاری و تحصیلی در آلمان، بسیاری از متقاضیان این دو کشور را رقیب هم می‌دانند، در حالی که در عمل{' '}
            <strong className="text-amber-300">«مکمل یکدیگر»</strong> هستند. برای مثال، بسیاری از متقاضیان به دلیل
            سادگی نسبی ویزای دانشجویی یا استارتاپ اتریش، ابتدا در وین مستقر می‌شوند، زبان آلمانی را در محیط بومی یاد
            می‌گیرند و پس از اخذ اقامت دائم اتحادیه اروپا (Daueraufenthalt – EU) پس از ۵ سال، در صورت تمایل آزادانه در
            بازار کار آلمان فعالیت می‌کنند.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول مقایسه آلمان و اتریش (FAQ)</h2>
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
              <Scale className="h-4 w-4" />
              <span>مسیرهای تخصصی آلمان و اتریش در دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'austria-rwr', label: 'کارت قرمز-سفید-قرمز اتریش (RWR)' },
                { page: 'german-blue-card', label: 'بلوکارت آلمان و حداقل حقوق ۲۰۲۶' },
                { page: 'jobseeker-germany', label: 'کارت فرصت آلمان (Chancenkarte)' },
                { page: 'startup-austria', label: 'ویزای استارتاپ اتریش (۵۰ امتیاز)' },
                { page: 'academic-austria', label: 'تحصیل بدون بلوکه در دانشگاه اتریش' },
                { page: 'financial-austria', label: 'اقامت خودحمایتی اتریش (۲۰۲۶)' },
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
              <span>منابع رسمی دولت اتریش و آلمان + مشاوره وین و تهران</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'پورتال رسمی مهاجرت دولت اتریش (Migration.gv.at)', url: 'https://www.migration.gv.at/' },
                { label: 'پورتال رسمی کار و مهاجرت آلمان (Make it in Germany)', url: 'https://www.make-it-in-germany.com/' },
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

export default GermanyVsAustriaComparisonPage;
