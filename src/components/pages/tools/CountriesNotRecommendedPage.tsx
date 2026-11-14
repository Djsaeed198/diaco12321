import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Ban,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  List,
  PhoneCall,
  Scale,
  ShieldAlert,
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

const NOT_RECOMMENDED_TABLE = [
  [
    'جزایر کارائیب (دومینیکا، گرنادا و...)',
    'پاسپورت دوم در ۶ ماه بدون نیاز به حضور و زبان',
    'هزینه بالای ۲۰۰ هزار دلار، عدم امکان زندگی واقعی در جزیره، سخت‌گیری شدید بانک‌های جهانی و تعلیق برخی معافیت‌های اروپا',
    'ثبت شرکت یا گلدن ویزای اروپا (مجارستان، یونان یا اتریش) با حق زندگی واقعی در شینگن',
  ],
  [
    'کشورهای غیرشینگن شرق اروپا (صربستان، گرجستان و...)',
    'ثبت شرکت ارزان در اروپا و دریافت اقامت در ۱ ماه',
    'عدم عضویت در شینگن، بی‌اعتباری کارت اقامت در اروپای غربی، بستن حساب‌های بانکی ایرانیان و نرخ بالای ریجکتی شینگن',
    'مجارستان یا پرتغال (عضو واقعی شینگن و اتحادیه اروپا با مسیر شفاف اقامت دائم)',
  ],
  [
    'بریتانیا / انگلستان (کار عمومی و ارشد)',
    'مهاجرت کاری سریع یا ویزای تحصیلی با همراه',
    'ممنوعیت ویزای همراه برای دانشجویان ارشد غیرپژوهشی و افزایش کف حقوق ویزای کار به بالای ۳۸,۷۰۰ پوند',
    'آلمان یا اتریش (تحصیل ارزان یا رایگان با امکان واقعی پیوست خانواده و اجازه کار همسر)',
  ],
  [
    'استرالیا (متخصصان بالای ۳۵ سال)',
    'مهاجرت کاری بدون جاب‌آفر با امتیازدهی',
    'حذف ویزای کار پس از تحصیل برای افراد بالای ۳۵ سال و رقابت غیرواقعی امتیازات در SkillSelect',
    'آلمان (کارت فرصت) یا اتریش (کارت RWR) بدون محدودیت سنی ۳۵ سال',
  ],
  [
    'آمریکا (کارشناسی و ارشد بدون فاند)',
    'دریافت پذیرش آسان از کالج‌ها و دانشگاه‌های آمریکا',
    'نرخ ریجکتی بسیار بالای ویزای F-1 (بند 214(b)) برای ایرانیان و هزینه سالانه ۴۰ تا ۶۰ هزار دلاری',
    'دانشگاه‌های دولتی اتریش، آلمان یا ایتالیا (شهریه صفر تا ۷۵۰ یورو و نرخ ویزای بسیار بالا)',
  ],
];

const RISK_CARDS = [
  {
    key: 'caribbean',
    anchor: '1-caribbean',
    tab: '۱. کارائیب (دومینیکا و...)',
    title: '۱. جزایر کارائیب (دومینیکا، آنتیگوا، سنت‌کیتس...): سرابِ پاسپورت دوم بدون حق زندگی',
    riskLevel: 'ریسک بانکی و مالی بسیار بالا',
    summary:
      'با فشار مستقیم اتحادیه اروپا و بریتانیا در سال‌های ۲۰۲۶ و ۲۰۲۷، حداقل سرمایه‌گذاری به بیش از ۲۰۰,۰۰۰ دلار افزایش یافته، مصاحبه‌های امنیتی سخت‌گیرانه اضافه شده و مهم‌تر از همه، محدودیت‌های شدیدی برای پذیرش پاسپورت‌های صادرشده برای ایرانیان در سیستم بانکی بین‌المللی ایجاد شده است.',
    verdict: 'پرداخت ۲۰۰ هزار دلار برای مدرکی که نه حق زندگی در اروپا می‌دهد و نه مشکل حساب بانکی را حل می‌کند، خطای استراتژیک است.',
    altLabel: 'گلدن ویزا و ثبت شرکت شینگن (یونان / مجارستان)',
    altPage: 'realestate-greece',
  },
  {
    key: 'non-schengen',
    anchor: '2-non-schengen-east',
    tab: '۲. بالکان و قفقاز غیرشینگن',
    title: '۲. کشورهای بالکان و قفقاز خارج از شینگن (صربستان، گرجستان و ارمنستان): تله «ارزان و بدون ویزا»',
    riskLevel: 'بن‌بست شینگن + انسداد بانکی',
    summary:
      'تبلیغات «اقامت اروپا با ۲ هزار یورو» فریبنده است زیرا این کشورها عضو شینگن و اتحادیه اروپا نیستند. کارت اقامت آن‌ها هیچ حق تردد آزادانه‌ای به آلمان، اتریش یا فرانسه ایجاد نمی‌کند، حساب‌های بانکی ایرانیان بارها بدون اخطار مسدود شده‌اند و سکوی پرتابی برای اروپای غربی محسوب نمی‌شوند.',
    verdict: 'برای اقامت واقعی اروپا سراغ کشورهای عضو واقعی شینگن و اتحادیه اروپا بروید.',
    altLabel: 'ثبت شرکت در مجارستان (عضو واقعی شینگن با مالیات ۹٪)',
    altPage: 'business-hungary',
  },
  {
    key: 'uk-aus',
    anchor: '3-australia-uk',
    tab: '۳. استرالیا و بریتانیا (بالای ۳۵)',
    title: '۳. استرالیا و بریتانیا در سال ۲۰۲۶: قفل شدن درها به روی متقاضیان بالای ۳۵ سال',
    riskLevel: 'قوانین محدودکننده ۲۰۲۵–۲۰۲۶',
    summary:
      'در استرالیا، کاهش سن مجاز ویزای کار پس از تحصیل (Temporary Graduate Visa) از ۵۰ سال به ۳۵ سال عملاً مسیر «تحصیل به قصد اقامت» را مسدود کرده است. در بریتانیا نیز افزایش شدید مالیات سلامت (IHS)، افزایش کف حقوق ویزای کار به بالای ۳۸,۷۰۰ پوند و حذف ویزای همراه دانشجویان ارشد غیرپژوهشی باعث خروج اجباری بسیاری از مهاجران پس از تحصیل شده است.',
    verdict: 'در سنین بالای ۳۵ سال یا با خانواده، آلمان و اتریش جایگزین‌های پایدارتر و اقتصادی‌تری هستند.',
    altLabel: 'مقایسه مستقیم آلمان و اتریش (۲۰۲۶–۲۰۲۷)',
    altPage: 'germany-vs-austria-immigration-comparison',
  },
  {
    key: 'usa',
    anchor: '4-usa-study',
    tab: '۴. آمریکا (تحصیل بدون فاند)',
    title: '۴. آمریکا برای مقاطع کارشناسی و ارشد بدون بورسیه: ریسک سنگین ریجکتی و هزینه',
    riskLevel: 'ریجکتی بالای F-1 (بند 214(b))',
    summary:
      'برای متقاضیانی که فاند کامل (Full Fund) در دکتری یا ارشد پژوهشی ندارند، پرداخت هزینه‌های اپلیکیشن، SEVIS و سفر به امارات/ترکیه/ارمنستان برای مصاحبه سفارت، در کنار نرخ بالای ریجکتی بند 214(b) و شهریه ۴۰ تا ۶۰ هزار دلاری سالانه، یک ریسک مالی غیرمنطقی است.',
    verdict: 'دانشگاه‌های دولتی اتریش، آلمان و ایتالیا (با بورسیه DSU) بدون این ریسک کنسولی و با هزینه نزدیک به صفر در دسترس‌اند.',
    altLabel: 'ارزان‌ترین کشورهای اروپایی برای مهاجرت و تحصیل',
    altPage: 'cheapest-european-countries-to-immigrate',
  },
  {
    key: 'gulf-free-visa',
    anchor: '5-gulf-free-visa',
    tab: '۵. فری‌ویزای خلیج فارس',
    title: '۵. مهاجرت کاری به حاشیه خلیج فارس با «ویزای آزاد» (Free Visa) بدون قرارداد واقعی',
    riskLevel: 'تله اتلاف سرمایه ۳ ماهه',
    summary:
      'دبی و مسقط مقاصد عالی برای ثبت شرکت قانونی یا جاب‌آفر تخصصی پیش از سفر هستند؛ اما خرید ویزای آزاد به امید پیدا کردن کار در محل در سال ۲۰۲۶ یکی از پرضررترین روش‌هاست زیرا بازار کار اشباع است و هزینه‌های زندگی به درهم و ریال عمان سرمایه شما را طی ۳ ماه بدون نتیجه از بین می‌برد.',
    verdict: 'تنها با جاب‌آفر کتبی از کارفرمای معتبر یا سرمایه قانونی ثبت شرکت وارد بازار امارات یا عمان شوید.',
    altLabel: 'شرایط قانونی ثبت شرکت و اقامت دبی',
    altPage: 'business-dubai',
  },
];

const faqs = [
  {
    q: 'پس با توجه به این محدودیت‌ها، مطمئن‌ترین کشورها برای مهاجرت ایرانیان در ۲۰۲۶–۲۰۲۷ کدام‌اند؟',
    a: 'در حال حاضر، کشورهای عضو اتحادیه اروپا و شینگن که دارای قوانین شفاف و کمبود نیروی کار یا برنامه‌های سرمایه‌گذاری قانونی هستند—به‌ویژه آلمان (برای کار و آوسبیلدونگ)، اتریش (برای استارتاپ، تحصیل و متخصصان)، مجارستان و یونان (برای ثبت شرکت و گلدن ویزا) و پرتغال (برای ویزای تمکن مالی D7)—مطمئن‌ترین و پایدارترین مسیرها را دارند.',
  },
  {
    q: 'آیا مهاجرت به ترکیه برای زندگی و دریافت پاسپورت در سال ۲۰۲۶ هنوز منطقی است؟',
    a: 'به دلیل تورم بسیار بالا در ترکیه، افزایش حداقل مبلغ خرید ملک برای اخذ شهروندی به ۴۰۰,۰۰۰ دلار و سخت‌گیری شدید اداره مهاجرت ترکیه در تمدید اقامت‌های توریستی و ملکی زیر ۲۰۰ هزار دلار در محله‌های ممنوعه، ترکیه دیگر یک مقصد اقتصادی یا مطمئن برای مهاجرت بلندمدت محسوب نمی‌شود.',
  },
  {
    q: 'چرا اقامت کشورهای غیرشینگن مثل صربستان یا گرجستان برای ورود به اروپا فایده‌ای ندارد؟',
    a: 'زیرا این کشورها عضو پیمان شینگن نیستند؛ بنابراین داشتن کارت اقامت آن‌ها هیچ حق اقامت، کار یا تحصیل در آلمان، اتریش، فرانسه یا ایتالیا به شما نمی‌دهد و برای سفر به این کشورها همچنان باید از صفر درخواست ویزای شینگن بدهید.',
  },
  {
    q: 'چگونه می‌توانیم مطمئن شویم کشوری که انتخاب کرده‌ایم یک بن‌بست اقامتی نیست؟',
    a: 'بهترین معیار، بررسی «مسیر تبدیل اقامت موقت به اقامت دائم و پاسپورت» در قانون رسمی آن کشور است. کشوری را انتخاب کنید که در قانون آن صراحتاً قید شده باشد پس از ۳ تا ۵ سال کار، تحصیل یا پرداخت مالیات، کارت اقامت دائم اتحادیه اروپا صادر می‌شود.',
  },
];

const tocItems = [
  { id: 'why-say-no', label: 'چرا یک مشاور مهاجرت باید گاهی بگوید «نروید»؟' },
  { id: 'not-recommended-table', label: 'جدول مقاصد پرریسک و جایگزین‌های قانونی (۲۰۲۶–۲۰۲۷)' },
  { id: '1-caribbean', label: 'تحلیل ۵ دسته مقصد نامناسب (کارائیب تا فری‌ویزای خلیج فارس)' },
  { id: 'expert-insights', label: 'تجربه پرونده‌های زیان‌دیده در هلدینگ دیاکو' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const CountriesNotRecommendedPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedRisk, setSelectedRisk] = useState<string>('caribbean');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeRisk = RISK_CARDS.find((r) => r.key === selectedRisk) || RISK_CARDS[0];

  useSeo({
    title: 'کشورهایی که مهاجرت به آن‌ها را اصلاً توصیه نمی‌کنیم (و چرا؟) — راهنمای ۲۰۲۶-۲۰۲۷ | دیاکو',
    description:
      'نقد صادقانه و بدون تعارف مقاصد مهاجرتی پرریسک در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی دلایل حقوقی و مالی عدم توصیه جزایر کارائیب، کشورهای غیرشینگن شرق اروپا، استرالیا و بریتانیا.',
    canonical: 'https://www.dia-co.ir/countries-we-do-not-recommend-for-immigration',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'کشورهایی که مهاجرت به آنها توصیه نمیشود ۲۰۲۶',
      'معایب پاسپورت دومینیکا و کارائیب برای ایرانیان',
      'تله اقامت صربستان و گرجستان غیرشینگن',
      'محدودیت سنی ۳۵ سال استرالیا و قوانین جدید انگلیس ۲۰۲۶',
      'ریجکتی ویزای تحصیلی آمریکا بند 214b',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/countries-we-do-not-recommend-for-immigration/#article',
          headline: 'کشورهایی که مهاجرت به آن‌ها را اصلاً توصیه نمی‌کنیم (و چرا؟) — راهنمای ۲۰۲۶-۲۰۲۷',
          description:
            'نقد صادقانه و بدون تعارف مقاصد مهاجرتی پرریسک در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی دلایل حقوقی و مالی عدم توصیه جزایر کارائیب، کشورهای غیرشینگن شرق اروپا، استرالیا و بریتانیا.',
          image: [
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:36:00+03:30',
          dateModified: '2026-11-14T13:36:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و ارزیابی ریسک بین‌الملل هلدینگ مهاجرتی دیاکو',
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
            'https://home-affairs.ec.europa.eu/',
            'https://www.migration.gv.at/',
            'https://www.make-it-in-germany.com/',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/countries-we-do-not-recommend-for-immigration',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/countries-we-do-not-recommend-for-immigration/#faq',
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
              تحلیل مقاصد مهاجرتی
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-rose-300 font-bold">کشورهایی که توصیه نمی‌کنیم (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('countries-we-do-not-recommend-for-immigration')}
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
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-wrap items-center gap-2.5 text-xs mb-4">
            <span className="rounded-full bg-rose-500/15 border border-rose-400/40 px-3 py-1 font-bold text-rose-300 flex items-center gap-1.5">
              <Ban className="h-3.5 w-3.5" />
              ارزیابی ریسک بین‌الملل ۲۰۲۶–۲۰۲۷
            </span>
            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-cyan-300" />
              تایید دپارتمان ارزیابی ریسک هلدینگ دیاکو
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            کشورهایی که مهاجرت به آن‌ها را اصلاً توصیه نمی‌کنیم (و چرا؟) — راهنمای ۲۰۲۶–۲۰۲۷
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان حقوقی و ارزیابی ریسک بین‌الملل هلدینگ دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">بازبینی اجرایی: </span>
              <strong className="text-amber-300">دفاتر وین، بوداپست، آتن و تهران</strong>
            </div>
          </div>

          {/* BLUF Box */}
          <div className="mt-6 rounded-3xl border border-rose-400/40 bg-gradient-to-l from-[#36111c] via-[#0d222c] to-[#081f27] p-6 md:p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-black text-rose-300 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج AI)</span>
            </div>
            <p className="text-sm md:text-base leading-8 text-slate-100 text-justify">
              دپارتمان ارزیابی ریسک هلدینگ مهاجرتی دیاکو در سال‌های ۲۰۲۶ و ۲۰۲۷ به‌طور صریح مهاجرت به ۵ دسته از مقاصد
              را برای اکثر متقاضیان ایرانی توصیه نمی‌کند: ۱){' '}
              <strong className="text-amber-300">جزایر کارائیب</strong> (دومینیکا، سنت‌کیتس و...) به‌دلیل هزینه بالای
              ۲۰۰ هزار دلار، عدم امکان زندگی واقعی و ریسک انسداد حساب بانکی، ۲){' '}
              <strong className="text-rose-300">کشورهای غیرشینگن شرق اروپا</strong> (صربستان، گرجستان و ارمنستان)
              به‌دلیل بی‌اعتباری در اروپای غربی، ۳){' '}
              <strong className="text-cyan-300">استرالیا و بریتانیا</strong> برای متقاضیان بالای ۳۵ سال با بودجه
              متوسط به‌دلیل قوانین سخت‌گیرانه سنی و کف حقوق، ۴){' '}
              <strong className="text-white">تحصیل کارشناسی/ارشد آمریکا بدون فاند کامل</strong> (ریجکتی بالای F-1)،
              و ۵) <strong className="text-amber-200">فری‌ویزای حاشیه خلیج فارس</strong> بدون قرارداد کاری واقعی.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>ارزیابی صادقانه و رایگان پیش از انتخاب مقصد</span>
              <Scale className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('best-countries-to-immigrate-to')}
              className="rounded-2xl border border-emerald-400/35 bg-emerald-500/10 hover:bg-emerald-500/20 px-5 py-3.5 text-sm font-bold text-emerald-200 transition cursor-pointer"
            >
              مقاصد مطمئن شینگن و برتر ۲۰۲۶
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('why-my-visa-was-rejected-10-real-reasons')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              ۱۰ دلیل واقعی ریجکتی ویزا
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
            <span>فهرست مطالب مقاصد پرریسک و نامناسب مهاجرت (۲۰۲۶–۲۰۲۷)</span>
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

        {/* Why Say No */}
        <section id="why-say-no" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-rose-300 shrink-0" />
            <span>چرا یک مشاور مهاجرت باید گاهی بگوید «نروید»؟</span>
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            ساده‌ترین کار در بازار مهاجرت این است که موسسه‌ها با شنیدن نام هر کشوری بگویند «صددرصد شدنی است»؛ اما
            مهاجرت جابه‌جایی کل سرمایه، عمر و آینده یک خانواده است. در سال‌های ۲۰۲۶ و ۲۰۲۷، تغییرات ژئوپلیتیکی،
            قوانین سخت‌گیرانه بانکی اروپا (AML) و اصلاحات ویزایی باعث شده برخی مقاصد عملاً به بن‌بست مالی و اقامتی
            تبدیل شوند.
          </p>
        </section>

        {/* Comparison Table */}
        <section id="not-recommended-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول مقاصد پرریسک و نامناسب برای مهاجرت در ۲۰۲۶–۲۰۲۷ (و جایگزین‌های منطقی)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-rose-500/15 text-rose-200 font-black">
                <tr>
                  <th className="p-3.5">مقصد یا مسیر پرریسک</th>
                  <th className="p-3.5">وعده تبلیغاتی رایج</th>
                  <th className="p-3.5">واقعیت تلخ در سال ۲۰۲۶–۲۰۲۷</th>
                  <th className="p-3.5">جایگزین منطقی و قانونی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {NOT_RECOMMENDED_TABLE.map((row) => (
                  <tr key={row[0]} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-amber-300 whitespace-nowrap">{row[0]}</td>
                    <td className="p-3.5 text-slate-300">{row[1]}</td>
                    <td className="p-3.5 text-rose-200 leading-6">{row[2]}</td>
                    <td className="p-3.5 text-emerald-300 font-semibold leading-6">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Risk Explorer */}
        <section id="1-caribbean" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              کالبدشکافی ۵ دسته مقصد پرریسک در سال‌های ۲۰۲۶–۲۰۲۷
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-300">
              هر دسته را انتخاب کنید تا واقعیت حقوقی، ریسک بانکی/کنسولی و جایگزین قانونی آن را بررسی کنید:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {RISK_CARDS.map((card) => (
              <button
                key={card.key}
                type="button"
                onClick={() => setSelectedRisk(card.key)}
                className={`rounded-xl px-3.5 py-2.5 text-xs font-bold transition cursor-pointer border ${
                  selectedRisk === card.key
                    ? 'bg-rose-500 text-white border-rose-400'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-rose-400/40'
                }`}
              >
                {card.tab}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-rose-400/30 bg-[#06181f] p-5 md:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <h3 className="text-base md:text-lg font-black text-amber-300">{activeRisk.title}</h3>
              <span className="rounded-full bg-rose-500/15 border border-rose-400/35 px-3 py-1 text-xs font-black text-rose-300">
                {activeRisk.riskLevel}
              </span>
            </div>
            <p className="text-xs md:text-sm leading-8 text-slate-200 text-justify">{activeRisk.summary}</p>
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3.5 text-xs md:text-sm text-emerald-200 flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>جمع‌بندی حقوقی دیاکو: </strong>
                {activeRisk.verdict}
              </span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => navigateInternal(activeRisk.altPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                مشاهده جایگزین مطمئن: {activeRisk.altLabel} ←
              </button>
            </div>
          </div>
        </section>

        {/* Anchored Quick Overview Cards for Remaining 4 Categories */}
        <section className="grid gap-5 md:grid-cols-2">
          <div id="2-non-schengen-east" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-2">
            <h3 className="text-sm md:text-base font-black text-rose-300">
              تله صربستان، گرجستان و کشورهای غیرشینگن شرق اروپا
            </h3>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              اقامت در کشورهای خارج از اتحادیه اروپا نه اجازه ورود بدون ویزا به شینگن می‌دهد و نه ثبات بانکی برای
              شهروندان ایرانی دارد؛ مجارستان و پرتغال مسیر واقعی و قانونی درون شینگن هستند.
            </p>
          </div>
          <div id="3-australia-uk" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-2">
            <h3 className="text-sm md:text-base font-black text-amber-300">
              قفل شدن ویزای کار استرالیا و بریتانیا (بالای ۳۵ سال و هزینه ارشد)
            </h3>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              کاهش سن ویزای کار پس از تحصیل استرالیا به ۳۵ سال و ممنوعیت ویزای همراه ارشد عادی در انگلیس به‌همراه
              کف حقوق ۳۸,۷۰۰ پوند، آلمان و اتریش را بسیار منطقی‌تر کرده است.
            </p>
          </div>
          <div id="4-usa-study" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-2">
            <h3 className="text-sm md:text-base font-black text-cyan-300">
              تحصیل بدون فاند در آمریکا (ریجکتی F-1 و هزینه ۴۰–۶۰ هزار دلاری)
            </h3>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              بدون Full Fund در دکتری یا ارشد پژوهشی، ریسک ریجکتی بند 214(b) و هزینه‌های دلاری در سفارت‌های منطقه
              بسیار بالاست؛ دانشگاه‌های دولتی اتریش، آلمان و ایتالیا جایگزین بی‌خطرتری هستند.
            </p>
          </div>
          <div id="5-gulf-free-visa" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-2">
            <h3 className="text-sm md:text-base font-black text-emerald-300">
              فری‌ویزای حاشیه خلیج فارس بدون قرارداد واقعی
            </h3>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              ورود با ویزای آزاد به دبی یا عمان بدون قرارداد کارفرما یا سرمایه ثبت شرکت، در بازار اشباع‌شده ۲۰۲۶ تنها
              سرمایه نقدی شما را طی ۳ ماه فرسوده می‌کند.
            </p>
          </div>
        </section>

        {/* Information Gain */}
        <section
          id="expert-insights"
          className="rounded-3xl border border-amber-400/35 bg-gradient-to-l from-amber-950/35 via-[#0a232d] to-[#081f27] p-6 md:p-8 space-y-4"
        >
          <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
            <AlertTriangle className="h-5 w-5" />
            <span>نکته تجربی از پرونده‌های واقعی (Information Gain — هلدینگ مهاجرتی دیاکو)</span>
          </div>
          <p className="text-sm leading-8 text-slate-100 text-justify">
            بر اساس تجربه مستقیم دپارتمان حقوقی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران، بیش از{' '}
            <strong className="text-rose-300">۳۰ درصد مراجعه‌کنندگان ما</strong> پیش از آشنایی با دیاکو سرمایه و
            زمان خود را در یکی از همین مقاصد پرریسک (خرید ویزای صوری یا کشورهای خارج از شینگن) از دست داده‌اند. فلسفه
            ما در دیاکو بر «حفظ سرمایه و اعتبار کنسولی موکل» است؛ اگر مسیری با سن، بودجه یا هدف خانوادگی شما همخوانی
            نداشت، صریحاً می‌گوییم «نروید» و مسیر قانون‌مند اتحادیه اروپا (اتریش، آلمان، مجارستان یا یونان) را جایگزین
            می‌کنیم.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول درباره مقاصد پرریسک (FAQ)</h2>
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
              <ShieldCheck className="h-4 w-4" />
              <span>مسیرهای امن، قانونی و پایدار پیشنهادی در دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'best-countries-to-immigrate-to', label: 'بهترین کشور برای مهاجرت (۲۰۲۶–۲۰۲۷)' },
                { page: 'germany-vs-austria-immigration-comparison', label: 'مقایسه صریح آلمان و اتریش' },
                { page: 'cheapest-european-countries-to-immigrate', label: 'ارزان‌ترین کشورهای اروپایی' },
                { page: 'business-hungary', label: 'ثبت شرکت در مجارستان (عضو شینگن)' },
                { page: 'realestate-greece', label: 'گلدن ویزای قانونی یونان' },
                { page: 'why-my-visa-was-rejected-10-real-reasons', label: '۱۰ دلیل واقعی ریجکتی ویزا' },
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
              <Scale className="h-4 w-4" />
              <span>منابع رسمی اتحادیه اروپا و مشاوره صادقانه</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'کمیسیون اروپا — امور داخلی و مهاجرت (Home Affairs)', url: 'https://home-affairs.ec.europa.eu/' },
                { label: 'پورتال رسمی دولت اتریش (Migration.gv.at)', url: 'https://www.migration.gv.at/' },
                { label: 'پورتال رسمی مهاجرت تخصصی آلمان (Make it in Germany)', url: 'https://www.make-it-in-germany.com/' },
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

export default CountriesNotRecommendedPage;
