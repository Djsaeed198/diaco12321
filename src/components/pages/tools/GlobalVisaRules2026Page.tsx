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

const REGION_UPDATES = [
  {
    key: 'eu',
    label: 'شینگن و اتحادیه اروپا (EES / ETIAS)',
    icon: Globe,
    points: [
      'دیجیتالی شدن کامل مرزهای شینگن (EES و ETIAS): ثبت ورود و خروج بیومتریک به‌جای مهر پاسپورت و کنترل هوشمند قانون ۹۰/۱۸۰ روز.',
      'اصلاحیه EU Blue Card: کاهش کف حقوق پایه در اکثر کشورها، شمول فارغ‌التحصیلان تازه‌کار و متخصصان IT با ۳ سال سابقه حتی بدون مدرک دانشگاهی.',
      'افزایش ۸ تا ۱۵ درصدی حداقل مبلغ تمکن مالی دانشجویی و خودحمایتی در منطقه یورو به علت تورم.',
    ],
  },
  {
    key: 'dach',
    label: 'آلمان و اتریش (قلب جذب نیروی کار)',
    icon: Briefcase,
    points: [
      'آلمان — کارت فرصت (Chancenkarte): ۱ سال فرصت جستجوی کار با ۶ امتیاز و اجازه ۲۰ ساعت کار پاره‌وقت هفتگی.',
      'آلمان — تابعیت سریع ۳ تا ۵ ساله: پذیرش رسمی دوتابعیتی برای ایرانیان بدون نیاز به ترک تابعیت قبلی.',
      'اتریش — کارت RWR و FlexKapG: همترازی امتیاز زبان انگلیسی با آلمانی، به‌روزرسانی حقوق پایه ژانویه ۲۰۲۶ و ساختار شرکت منعطف FlexKapG.',
    ],
  },
  {
    key: 'golden',
    label: 'گلدن ویزاها (یونان، اسپانیا، مجارستان)',
    icon: Landmark,
    points: [
      'یونان: آستانه ۸۰۰,۰۰۰ یورو در مناطق پرتقاضا (آتن و تسالونیکی)؛ حفظ ۲۵۰,۰۰۰ یورو برای تغییر کاربری املاک تجاری به مسکونی یا بازسازی بناهای تاریخی.',
      'اسپانیا: توقف گلدن ویزای خرید ملک مسکونی و تمرکز بر ویزای استارتاپ و دیجیتال نومد.',
      'مجارستان (Guest Investor Program): اقامت ۱۰ ساله قابل تمدید شنگن با ۲۵۰,۰۰۰ یورو سرمایه‌گذاری در صندوق‌های املاک ثبت‌شده.',
    ],
  },
  {
    key: 'anglo',
    label: 'کانادا، استرالیا و بریتانیا',
    icon: ShieldCheck,
    points: [
      'کانادا: محدودیت سقف پذیرش دانشجو، اجازه کار همسر فقط برای مقاطع ارشد و دکتری، و تمرکز اکسپرس انتری بر دسته‌های درمان، فنی و فرانسوی.',
      'استرالیا: جایگزینی ویزای موقت کاری با Skills in Demand و محدودیت سنی زیر ۳۵ سال برای ویزای کار پس از تحصیل.',
      'بریتانیا: افزایش حداقل حقوق پایه Skilled Worker و محدودیت همراهی خانواده در برخی مقاطع تحصیلی.',
    ],
  },
];

const COMPARISON_ROWS = [
  ['آلمان 🇩🇪', 'اجرای کامل کارت فرصت و قانون تابعیت ۳ تا ۵ ساله', 'بسیار باز و تسهیل‌شده (کاهش سقف حقوق بلوکارت)', 'آزاد؛ نیاز به حساب بلوکه‌شده با سقف جدید ۲۰۲۶'],
  ['اتریش 🇦🇹', 'همترازی امتیاز انگلیسی با آلمانی در کارت RWR', 'بسیار مطلوب برای متخصصان و استارتاپ‌ها', 'آزاد؛ امکان همراهی خانواده در مقاطع ارشد و دکتری'],
  ['یونان و مجارستان 🇬🇷🇭🇺', 'آستانه جدید گلدن ویزا (۲۵۰ تا ۸۰۰ هزار یورو)', 'محدود به مشاغل تخصصی و گردشگری', 'مناسب برای کالج‌های زبان و دانشگاه‌های انگلیسی‌زبان'],
  ['کانادا 🇨🇦', 'کنترل سقف پذیرش دانشجو و اولویت مشاغل خاص', 'گزینشی (اولویت با درمان، فنی و زبان فرانسه)', 'محدودیت ویزای همراه برای مقاطع پایین‌تر از ارشد'],
  ['استرالیا 🇦🇺', 'اجرای ویزای Skills in Demand و محدودیت سنی ۳۵ سال', 'متمرکز بر مشاغل با کمبود شدید و حقوق بالا', 'افزایش حداقل نمره زبان و تمکن مالی'],
];

const faqs = [
  {
    q: 'آیا قانون جدید سیستم مرزی اروپا (EES) تاثیری بر ویزای توریستی ایرانیان دارد؟',
    a: 'بله؛ با اجرای کامل سیستم EES در مرزهای شینگن، اثر انگشت و تصویر چهره مسافران در اولین ورود ثبت دیجیتال می‌شود و هرگونه اقامت بیش از مهلت قانونی ویزا (Overstay) به صورت خودکار در کل منطقه شینگن ثبت و منجر به جریمه یا ممنوعیت ورود می‌گردد.',
  },
  {
    q: 'در سال ۲۰۲۶ برای مهاجرت کاری بدون مدرک دانشگاهی کدام کشور بهترین قوانین را دارد؟',
    a: 'آلمان از طریق کارت فرصت (Chancenkarte)، دوره‌های آوسبیلدونگ (Ausbildung) و همچنین بلوکارت ویژه متخصصان IT (که با ۳ سال سابقه کار بدون مدرک دانشگاهی صادر می‌شود)، منعطف‌ترین قوانین را دارد.',
  },
  {
    q: 'آیا محدودیت‌های جدید کانادا و استرالیا به نفع مهاجرت به اروپا تمام شده است؟',
    a: 'بله؛ سخت‌گیری‌های مالی و سنی در کانادا و استرالیا باعث شده بخش بزرگی از متخصصان و دانشجویان ایرانی به سمت کشورهای اروپایی مانند آلمان، اتریش، هلند و مجارستان حرکت کنند که هم هزینه تحصیل پایین‌تری دارند و هم قوانین اقامت کاری آن‌ها در سال ۲۰۲۶ تسهیل شده است.',
  },
  {
    q: 'حداقل سرمایه برای دریافت گلدن ویزای اروپا در سال ۲۰۲۶ چقدر است؟',
    a: 'در سال ۲۰۲۶، پایین‌ترین آستانه رسمی و قانونی برای اخذ اقامت سرمایه‌گذاری اتحادیه اروپا مربوط به مجارستان (۲۵۰ هزار یورو سرمایه‌گذاری در صندوق املاک) و یونان (۲۵۰ هزار یورو خرید ملک تجاری تغییر کاربری داده‌شده به مسکونی) است.',
  },
];

const tocItems = [
  { id: 'eu-schengen-rules', label: 'تغییرات قوانین شینگن و اروپا (EES/Blue Card)' },
  { id: 'germany-austria-rules', label: 'قوانین جدید آلمان و اتریش' },
  { id: 'golden-visa-rules', label: 'گلدن ویزاهای یونان، اسپانیا و مجارستان' },
  { id: 'canada-australia-uk', label: 'محدودیت‌های جدید کانادا، استرالیا و بریتانیا' },
  { id: 'comparison-table', label: 'جدول مقایسه‌ای تغییرات جهانی ۲۰۲۶–۲۰۲۷' },
  { id: 'expert-insights', label: 'چالش‌های واقعی و تله قوانین قدیمی' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const GlobalVisaRules2026Page: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [activeRegion, setActiveRegion] = useState<string>('eu');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'قوانین جدید ویزاهای کشورهای مختلف ۲۰۲۶-۲۰۲۷ | تغییرات اروپا، کانادا و استرالیا | دیاکو',
    description:
      'بررسی جدیدترین قوانین ویزا و مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷. تحلیل تغییرات ویزای شینگن، کارت فرصت آلمان، کارت قرمز-سفید-قرمز اتریش، کانادا و گلدن ویزاها.',
    canonical: 'https://www.dia-co.ir/global-visa-rules-changes',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'قوانین جدید ویزا ۲۰۲۶-۲۰۲۷',
      'سیستم EES شینگن',
      'کارت فرصت آلمان ۲۰۲۶',
      'تغییرات گلدن ویزا یونان',
      'قوانین جدید کانادا و استرالیا ۲۰۲۶',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/global-visa-rules-changes/#article',
          headline: 'قوانین جدید ویزاهای کشورهای مختلف ۲۰۲۶-۲۰۲۷ | تغییرات اروپا، کانادا و استرالیا',
          description:
            'بررسی جدیدترین قوانین ویزا و مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷. تحلیل تغییرات ویزای شینگن، کارت فرصت آلمان، کارت قرمز-سفید-قرمز اتریش، کانادا و گلدن ویزاها.',
          image: [
            'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:00:00+03:30',
          dateModified: '2026-11-14T13:16:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و رصد قوانین بین‌الملل هلدینگ مهاجرتی دیاکو',
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
            logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' },
          },
          citation: [
            'https://home-affairs.ec.europa.eu/',
            'https://www.migration.gv.at/',
            'https://www.make-it-in-germany.com/',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/global-visa-rules-changes',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/global-visa-rules-changes/#faq',
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
            { '@type': 'ListItem', position: 2, name: 'اتاق خبر و مقالات', item: 'https://www.dia-co.ir/visa-news' },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'قوانین جدید ویزا ۲۰۲۶–۲۰۲۷',
              item: 'https://www.dia-co.ir/global-visa-rules-changes',
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
              <Globe className="h-4 w-4 text-sky-400" />
              قوانین جدید ویزاها (۲۰۲۶–۲۰۲۷)
            </span>
          </div>
          <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-200">
            <a href="#eu-schengen-rules" className="hover:text-amber-300">شینگن</a>
            <a href="#germany-austria-rules" className="hover:text-amber-300">آلمان و اتریش</a>
            <a href="#golden-visa-rules" className="hover:text-amber-300">گلدن ویزا</a>
            <a href="#comparison-table" className="hover:text-amber-300">جدول مقایسه</a>
            <a href="#faq" className="hover:text-amber-300">سوالات متداول</a>
          </nav>
          <button
            type="button"
            onClick={onOpenAssessment}
            className="rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
          >
            ارزیابی با قوانین ۲۰۲۶
          </button>
        </div>
      </header>

      <section className="container mx-auto px-4 md:px-8 pt-10 pb-12 max-w-5xl space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold text-sky-300">
          <Sparkles className="h-4 w-4" />
          رصد قوانین بین‌الملل ۲۰۲۶–۲۰۲۷ | شینگن (EES)، آلمان، اتریش، کانادا و استرالیا
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
          قوانین جدید ویزاهای کشورهای مختلف (۲۰۲۶–۲۰۲۷):{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-sky-400">
            مهم‌ترین تغییرات مهاجرتی جهان
          </span>
        </h1>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <Award className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-[11px]">نویسنده:</span>
              <strong className="text-white">دپارتمان رصد قوانین دیاکو</strong>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-[11px]">بازبینی:</span>
              <strong className="text-emerald-300">دفتر اجرایی دیاکو در وین</strong>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="h-4 w-4 text-sky-400 shrink-0" />
            <span>به‌روزرسانی: <strong>نوامبر ۲۰۲۶</strong></span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-slate-300">
            <ExternalLink className="h-4 w-4 text-amber-400 shrink-0" />
            <a href="https://home-affairs.ec.europa.eu/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline font-bold">
              ec.europa.eu
            </a>
            <span>•</span>
            <a href="https://www.make-it-in-germany.com/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline font-bold">
              make-it-in-germany
            </a>
          </div>
        </div>

        {/* BLUF */}
        <div className="rounded-2xl border-r-4 border-[#f5a623] bg-[#0a2a35] p-5 shadow-lg">
          <div className="text-xs font-black text-amber-300 mb-2">
            خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج هوشمند):
          </div>
          <p className="text-sm text-slate-100 leading-8 text-justify">
            قوانین ویزاهای کشورهای مختلف در سال‌های ۲۰۲۶ و ۲۰۲۷ بر دو محور استوار است: <strong>«تسهیل جذب نیروی کار متخصص و فناور»</strong> و{' '}
            <strong>«سخت‌گیری بیشتر بر مهاجرت‌های غیرهدفمند، تمکن مالی و امنیت مرزی»</strong>. در اتحادیه اروپا، سیستم کنترل مرزی دیجیتال (<strong>EES</strong>) و مجوز سفر (<strong>ETIAS</strong>) عملیاتی شده، شرایط <strong>EU Blue Card</strong> و{' '}
            <strong>Chancenkarte</strong> منعطف‌تر شده و در مقابل، سقف پذیرش دانشجویان و محدودیت‌های سنی و شغلی در کشورهایی مانند <strong>کانادا و استرالیا</strong> تشدید گردیده است.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onOpenAssessment}
            className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
          >
            بررسی وضعیت پرونده طبق بخشنامه‌های ۲۰۲۶
          </button>
          <a
            href="/blog/global-visa-rules-changes"
            onClick={handleLinkNav('blog-post', 'global-visa-rules-changes')}
            className="rounded-2xl border border-amber-400/40 bg-amber-500/10 px-5 py-3.5 text-xs sm:text-sm font-bold text-amber-200 hover:bg-amber-500/20 transition inline-flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4 text-amber-300" />
            نسخه کامل مقاله در بخش مقالات دیاکو
          </a>
        </div>

        {/* TOC */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2 text-xs font-black text-amber-300 mb-3">
            <List className="h-4 w-4" />
            <span>فهرست مطالب تغییرات قوانین ۲۰۲۶–۲۰۲۷</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
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
      </section>

      <section className="container mx-auto px-4 md:px-8 max-w-5xl space-y-12 pb-20">
        {/* Interactive Region Filter */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
          <div className="text-sm font-black text-amber-300">مرور سریع تغییرات بر اساس منطقه:</div>
          <div className="flex flex-wrap gap-2">
            {REGION_UPDATES.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setActiveRegion(r.key)}
                className={`rounded-xl px-4 py-2 text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer ${
                  activeRegion === r.key
                    ? 'bg-[#f5a623] text-[#082833]'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10'
                }`}
              >
                <r.icon className="h-4 w-4" />
                <span>{r.label}</span>
              </button>
            ))}
          </div>
          {REGION_UPDATES.filter((r) => r.key === activeRegion).map((r) => (
            <ul key={r.key} className="space-y-2.5 text-xs sm:text-sm text-slate-200 leading-7 bg-white/[0.02] p-4 rounded-2xl border border-white/10">
              {r.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* All 4 Semantic Sections for Full Crawler Visibility */}
        <div id="eu-schengen-rules" className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
          <h2 className="text-xl md:text-2xl font-black">مهم‌ترین تغییرات قوانین ویزای شینگن و اتحادیه اروپا (۲۰۲۶–۲۰۲۷)</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-7">
            اجرای ثبت ورود و خروج بیومتریک <strong>EES</strong> به‌جای مهر سنتی، گسترش <strong>EU Blue Card</strong> برای متخصصان IT بدون مدرک و تازه فارغ‌التحصیلان، و افزایش ۸ تا ۱۵ درصدی حداقل مبلغ تمکن مالی ویزاهای دانشجویی و خودحمایتی در منطقه یورو.
          </p>
        </div>

        <div id="germany-austria-rules" className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
          <h2 className="text-xl md:text-2xl font-black">قوانین جدید ویزای آلمان و اتریش (قلب جذب نیروی کار اروپا)</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-7">
            تثبیت کارت فرصت آلمان (کسب ۶ امتیاز و ۱ سال فرصت جستجوی کار با ۲۰ ساعت کار پاره‌وقت)، قانون تابعیت ۵ ساله (یا ۳ ساله با زبان C1 و پذیرش دوتابعیتی)، همترازی امتیاز زبان انگلیسی با آلمانی در کارت RWR اتریش و راه‌اندازی شرکت منعطف <strong>FlexKapG</strong>.
          </p>
        </div>

        <div id="golden-visa-rules" className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
          <h2 className="text-xl md:text-2xl font-black">تغییرات قوانین ویزای سرمایه‌گذاری و گلدن ویزاها (یونان، اسپانیا، مجارستان)</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-7">
            یونان سقف مناطق پرتقاضا را به ۸۰۰,۰۰۰ یورو رسانده اما مسیر ۲۵۰,۰۰۰ یورویی را برای تغییر کاربری املاک تجاری به مسکونی حفظ کرده است؛ اسپانیا گلدن ویزای ملک مسکونی را متوقف کرده و مجارستان با ۲۵۰,۰۰۰ یورو صندوق املاک اقامت ۱۰ ساله Guest Investor صادر می‌کند.
          </p>
        </div>

        <div id="canada-australia-uk" className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
          <h2 className="text-xl md:text-2xl font-black">قوانین جدید مهاجرتی کانادا، استرالیا و بریتانیا در سال ۲۰۲۶</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-7">
            کاهش سقف پذیرش دانشجو و محدود شدن اجازه کار همسر به ارشد و دکتری در کانادا، ویزای جدید <strong>Skills in Demand</strong> و سقف سنی زیر ۳۵ سال در استرالیا، و افزایش حقوق پایه <strong>Skilled Worker</strong> در بریتانیا.
          </p>
        </div>

        {/* Comparison Table */}
        <div id="comparison-table" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl font-black">جدول مقایسه‌ای تغییرات کلیدی ویزاهای جهان در ۲۰۲۶–۲۰۲۷</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-xs md:text-sm text-right">
              <thead className="bg-white/5 text-amber-300 font-bold">
                <tr>
                  <th className="p-4">کشور / منطقه</th>
                  <th className="p-4">مهم‌ترین تغییر قانونی در ۲۰۲۶–۲۰۲۷</th>
                  <th className="p-4">وضعیت ویزای کاری</th>
                  <th className="p-4">وضعیت ویزای تحصیلی و همراه</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-white/[0.02]">
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.03] transition">
                    <td className="p-4 font-bold text-white">{row[0]}</td>
                    <td className="p-4 text-amber-300 font-bold">{row[1]}</td>
                    <td className="p-4 text-slate-200">{row[2]}</td>
                    <td className="p-4 text-slate-300">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Information Gain */}
        <div id="expert-insights" className="scroll-mt-24 rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-[#0a2934] to-[#0a2934] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-7 w-7 text-amber-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-amber-300 mb-3">
                چالش‌های واقعی پرونده‌ها و نکات کلیدی هلدینگ دیاکو (Information Gain)
              </h2>
              <p className="text-sm text-slate-200 leading-8 text-justify">
                بزرگ‌ترین اشتباه متقاضیان در سال ۲۰۲۶، <strong>«استناد به قوانین سال‌های ۲۰۲۳ یا ۲۰۲۴ در شبکه‌های اجتماعی»</strong> است؛ مانند خرید ملک عادی در یونان به تصور آستانه ۲۵۰ هزار یورو (بدون شرط تغییر کاربری تجاری به مسکونی) یا تفاوت چند صد یورویی در قرارداد کاری آلمان و اتریش نسبت به جدول حقوق پایه ژانویه ۲۰۲۶. تیم حقوقی دیاکو پیش از هر پرداخت، پرونده شما را بر اساس آخرین بخشنامه‌های اجرایی همان ماه ممیزی می‌کند.
              </p>
            </div>
          </div>
        </div>

        {/* Internal links */}
        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <a
            href="/easiest-countries-to-immigrate-2027"
            onClick={handleLinkNav('easiest-countries-to-immigrate-2027')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">راحت‌ترین کشور برای مهاجرت ۲۰۲۷ ↗</div>
            <p className="text-slate-400">سریع‌ترین مسیرهای اروپا و دبی با توجه به قوانین جدید.</p>
          </a>
          <a
            href="/visa-news"
            onClick={handleLinkNav('visa-news')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">اتاق خبر و بخشنامه‌های کنسولی ↗</div>
            <p className="text-slate-400">رصد لحظه‌ای تغییرات شنگن، سهمیه اتریش و سفارت‌ها.</p>
          </a>
          <a
            href="/realestate-greece"
            onClick={handleLinkNav('realestate-greece')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">گلدن ویزای یونان (طرح ۲۵۰k جدید) ↗</div>
            <p className="text-slate-400">بررسی املاک تجاری تغییر کاربری داده‌شده توسط دفتر آتن دیاکو.</p>
          </a>
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
        <div className="rounded-3xl bg-gradient-to-l from-sky-900/50 to-[#0a2a33] border border-sky-400/20 p-8 text-center">
          <h2 className="text-2xl font-black mb-3">پرونده مهاجرتی خود را بر اساس آخرین قوانین ۲۰۲۶ ارزیابی کنید</h2>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            متخصصان هلدینگ مهاجرتی دیاکو در تهران و دفاتر وین، آتن و بوداپست آماده ممیزی شرایط شما طبق آخرین بخشنامه‌های روز هستند.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-8 py-3.5 text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
            >
              درخواست ممیزی رایگان پرونده
            </button>
            <a
              href="https://wa.me/436889763256"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              تهران ۰۲۱-۹۱۶۹۳۹۵۵ | واتساپ وین +43 688 976 3256
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalVisaRules2026Page;
