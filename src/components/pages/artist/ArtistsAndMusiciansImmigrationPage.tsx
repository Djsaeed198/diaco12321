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
  FileText,
  List,
  Music,
  Palette,
  PhoneCall,
  Rocket,
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

const ARTIST_COUNTRIES = [
  {
    key: 'germany',
    tab: 'آلمان (بهشت KSK)',
    country: 'آلمان',
    visaType: 'ویزای خوداشتغالی هنری (§ 21 AufenthG)',
    capitalNeed: 'خیر (فقط اثبات تمکن هزینه‌های اولیه)',
    stateSupport: 'بله (عضویت در صندوق حمایتی KSK و پوشش ۵۰٪ بیمه)',
    prPath: 'پس از ۵ سال (و با زبان C1 پس از ۳ سال)',
    highlight:
      'صندوق KSK (Künstlersozialkasse) در آلمان ۵۰٪ حق بیمه درمانی و بازنشستگی هنرمندان مستقل را پرداخت می‌کند؛ امتیازی که برای هیچ فریلنسر دیگری وجود ندارد.',
    requirements:
      'نیازی به کارفرما نیست؛ ارائه نمونه کار (Portfolio)، نامه‌های تمایل به همکاری (Letters of Intent) از گالری‌ها، استودیوها یا آموزشگاه‌های موسیقی در برلین/کلن/هامبورگ و طرح توجیهی اقتصادی.',
    ctaLabel: 'جزئیات ویزای هنرمندان آلمان',
    ctaPage: 'artist-germany',
  },
  {
    key: 'austria',
    tab: 'اتریش (پایتخت موسیقی وین)',
    country: 'اتریش',
    visaType: 'ویزای خوداشتغالی مستقل (Selbständige)',
    capitalNeed: 'متوسط (اثبات پس‌انداز و قراردادهای هنری)',
    stateSupport: 'حمایت‌های شهرداری وین (Kultur Wien) و صندوق‌های فرهنگی محلی',
    prPath: 'پس از ۵ سال اقامت قانونی و مستمر',
    highlight:
      'وین به‌عنوان پایتخت موسیقی جهان، بستر استثنایی برای نوازندگان کلاسیک، آهنگسازان، خوانندگان اپرا و هنرمندان تجسمی فراهم کرده و وام و گرنت‌های Kultur Wien به پروژه‌ها اختصاص می‌یابد.',
    requirements:
      'اثبات استاندارد حرفه‌ای از طریق رزومه اجرایی در سالن‌های معتبر، جوایز هنری، مدارک آکادمیک هنر/موسیقی و اثبات درآمد مستقل یا پس‌انداز ماه‌های اول.',
    ctaLabel: 'اقامت هنرمندان و نخبگان اتریش (NAG §43a)',
    ctaPage: 'artist-austria',
  },
  {
    key: 'france',
    tab: 'فرانسه (Talent Passport)',
    country: 'فرانسه',
    visaType: 'ویزای استعدادیابی هنری (Talent Passport)',
    capitalNeed: 'خیر',
    stateSupport: 'دسترسی به گرنت‌های هنری وزارت فرهنگ فرانسه',
    prPath: 'اقامت دائم پس از ۵ سال',
    highlight:
      'پاسپورت تلنت بخش Artistic and Literary Creation به نویسندگان، نوازندگان و هنرمندان تجسمی دارای پروژه خلاقانه اقامت چندساله قابل تمدید و همراهی خانواده اعطا می‌کند.',
    requirements:
      'پورتفوی قوی، پروژه خلاقانه یا اثر هنری برجسته با تعهد مالی متناسب با طول دوره و پیوند با نهادها یا جشنواره‌های فرهنگی.',
    ctaLabel: 'ویزای استعداد و هنرمندان فرانسه',
    ctaPage: 'talent-france',
  },
  {
    key: 'netherlands',
    tab: 'هلند (ارزش فرهنگی افزوده)',
    country: 'هلند',
    visaType: 'ویزای مهاجرت فرهنگی (Cultuur & Wetenschap)',
    capitalNeed: 'خیر',
    stateSupport: 'وام‌ها و حمایت‌های فریلنسری فرهنگی هلند',
    prPath: 'اقامت دائم پس از ۵ سال',
    highlight:
      'هلند به هنرمندان مستقل و موزیسین‌هایی که ثابت کنند فعالیت آن‌ها ارزش فرهنگی افزوده برای جامعه هلند دارد، ویزای کار مستقل اعطا می‌کند.',
    requirements:
      'پورتفوی هنری بین‌المللی، طرح توجیهی فرهنگی و قراردادهای بالقوه در آمستردام، روتردام یا لاهه.',
    ctaLabel: 'صفحه هنرمندان و فریلنس اروپا',
    ctaPage: 'artist-belgium',
  },
];

const KEY_DOCUMENTS = [
  {
    title: '۱. پورتفوی هنری حرفه‌ای (Portfolio & Showreel)',
    text: 'فایل‌های صوتی باکیفیت، ویدیوهای اجراهای زنده، مستندات نمایشگاه‌ها یا لینک پلتفرم‌های رسمی (Spotify، Apple Music، YouTube یا وب‌سایت شخصی).',
  },
  {
    title: '۲. نامه‌های تمایل به همکاری (Letter of Intent)',
    text: 'نامه‌هایی از مدیران سالن‌های کنسرت، ناشران موسیقی، گالری‌ها یا اساتید در کشور مقصد که تمایل خود را برای همکاری یا اجرای مشترک اعلام کرده‌اند.',
  },
  {
    title: '۳. طرح توجیهی فعالیت هنری (Artistic Business Plan)',
    text: 'توضیح دقیق اینکه چگونه هنر خود را در کشور مقصد عرضه می‌کنید، مخاطبان شما چه کسانی هستند و پیش‌بینی درآمد ماهانه و سالانه شما چقدر است.',
  },
  {
    title: '۴. تمکن مالی اولیه زندگی',
    text: 'اثبات اینکه پس‌انداز کافی برای پوشش اجاره خانه، بیمه و هزینه‌های زندگی چند ماه اول تا زمان راه‌اندازی چرخه درآمدی هنری در اروپا را دارید.',
  },
];

const faqs = [
  {
    q: 'آیا برای ویزای هنرمندان اروپا حتماً باید مدرک دانشگاهی هنر داشته باشیم؟',
    a: 'خیر؛ در قوانین ویزای خوداشتغالی هنری اروپا، «سابقه کار حرفه‌ای، آثار منتشرشده، جوایز و پورتفوی هنری» بسیار مهم‌تر از مدرک آکادمیک است. بسیاری از نوازندگان و هنرمندان موفق بدون داشتن مدرک دانشگاهی هنر و تنها با اتکا به رزومه اجرایی قوی موفق به اخذ ویزا شده‌اند.',
  },
  {
    q: 'آیا اهالی موسیقی (آهنگسازان، نوازندگان، خوانندگان) می‌توانند از طریق این ویزا خانواده خود را ببرند؟',
    a: 'بله؛ با دریافت کارت اقامت خوداشتغالی هنری در آلمان یا اتریش، همسر و فرزندان زیر ۱۸ سال می‌توانند به‌صورت همزمان ویزای پیوست خانواده دریافت کنند و همسر نیز حق کار تمام‌وقت خواهد داشت.',
  },
  {
    q: 'درآمد حاصل از کنسرت‌ها یا فروش آثار در اروپا چگونه مشمول مالیات می‌شود؟',
    a: 'هنرمندان فریلنسر در اروپا موظف به دریافت کد مالیاتی (Steuernummer) هستند و مالیات بر درآمد آن‌ها بر اساس سود خالص سالانه محاسبه می‌شود؛ کما اینکه در آلمان عضویت در سیستم KSK هزینه‌های بیمه درمانی آن‌ها را به شدت کاهش می‌دهد.',
  },
  {
    q: 'آیا برای ویزای هنری آلمان مدرک زبان آلمانی الزامی است؟',
    a: 'برای ثبت اولیه درخواست در سفارت، ارائه مدرک زبان پایه (معمولاً A2 یا B1 آلمانی یا تسلط خوب به انگلیسی بسته به شهر مقصد و نوع پروژه‌ها) بسیار راهگشا و امتیازآور است، زیرا ارتباط شما با بازار هنری مقصد را اثبات می‌کند.',
  },
];

const tocItems = [
  { id: 'why-artists-differ', label: 'چرا مسیر مهاجرت هنرمندان با سایر مشاغل تفاوت دارد؟' },
  { id: 'comparison-table', label: 'جدول مقایسه آلمان، اتریش، فرانسه و هلند' },
  { id: 'germany-artists', label: 'آلمان و مزایای شگفت‌انگیز صندوق KSK' },
  { id: 'austria-artists', label: 'اتریش: ویزای خوداشتغالی هنری در وین' },
  { id: 'france-netherlands-artists', label: 'فرانسه (Talent Passport) و هلند' },
  { id: 'key-documents', label: '۴ مدرک کلیدی ویزای هنرمندان اروپا' },
  { id: 'expert-insights', label: 'نکته دیاکو: هنر به عنوان حرفه اقتصادی' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const ArtistsAndMusiciansImmigrationPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('germany');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeCountry = ARTIST_COUNTRIES.find((c) => c.key === selectedCountry) || ARTIST_COUNTRIES[0];

  useSeo({
    title: 'مهاجرت برای هنرمندان و اهالی موسیقی (۲۰۲۶-۲۰۲۷) | کشورهایی که واقعاً حمایت می‌کنند | دیاکو',
    description:
      'راهنمای جامع مهاجرت هنرمندان، نوازندگان و اهالی موسیقی در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی ویزای هنرمندان آلمان (صندوق بیمه KSK)، وین اتریش، Talent Passport فرانسه و هلند.',
    canonical: 'https://www.dia-co.ir/immigration-for-artists-and-musicians',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'مهاجرت هنرمندان و اهالی موسیقی ۲۰۲۶',
      'ویزای هنرمندان آلمان KSK',
      'اقامت هنرمندان وین اتریش',
      'ویزای talent passport فرانسه',
      'پورتفوی هنری و بیزنس پلن مهاجرت',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/immigration-for-artists-and-musicians/#article',
          headline: 'مهاجرت برای هنرمندان و اهالی موسیقی: کشورهایی که واقعاً حمایت می‌کنند (۲۰۲۶-۲۰۲۷)',
          description:
            'راهنمای جامع مهاجرت هنرمندان، نوازندگان و اهالی موسیقی در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی ویزای هنرمندان آلمان (KSK)، اتریش، فرانسه و هلند.',
          image: [
            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:45:00+03:30',
          dateModified: '2026-11-14T13:45:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و ویزاهای تخصصی هنری هلدینگ مهاجرتی دیاکو',
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
          citation: ['https://www.kuenstlersozialkasse.de/', 'https://www.migration.gv.at/'],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/immigration-for-artists-and-musicians',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/immigration-for-artists-and-musicians/#faq',
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
              onClick={() => navigateInternal('artist-germany')}
              className="hover:text-[#f5a623] transition cursor-pointer"
            >
              دپارتمان اقامت هنرمندان اروپا
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">مهاجرت هنرمندان و اهالی موسیقی (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('immigration-for-artists-and-musicians')}
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
              <Music className="h-3.5 w-3.5" />
              ویزای خوداشتغالی هنری و صندوق حمایتی KSK (۲۰۲۶–۲۰۲۷)
            </span>
            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-300" />
              تایید دپارتمان ویزاهای تخصصی هنری دیاکو
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            مهاجرت برای هنرمندان و اهالی موسیقی (۲۰۲۶–۲۰۲۷): کدام کشورها واقعاً حمایت می‌کنند؟
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان حقوقی و ویزاهای تخصصی هنری هلدینگ دیاکو</strong>
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
              مهاجرت هنرمندان و اهالی موسیقی در سال‌های ۲۰۲۶ و ۲۰۲۷ از طریق قوانین ویژه{' '}
              <strong className="text-amber-300">خوداشتغالی هنری (Freiberufler / Artist Visa)</strong> در آلمان،
              اتریش، فرانسه و هلند بدون نیاز به ثروت کلان یا کارفرما امکان‌پذیر است. کلید موفقیت، ارائه{' '}
              <strong className="text-cyan-300">پورتفوی قوی، نامه‌های تمایل به همکاری (LOI) و بیزنس پلن فرهنگی</strong>{' '}
              است. آلمان به لطف صندوق حمایتی <strong className="text-emerald-300">KSK</strong> (پرداخت ۵۰٪ بیمه
              درمانی و بازنشستگی هنرمند مستقل)، بهشت اول هنرمندان و موزیسین‌های جهان محسوب می‌شود.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>ارزیابی پورتفوی هنری شما و تنظیم بیزنس پلن</span>
              <Rocket className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('artist-germany')}
              className="rounded-2xl border border-cyan-400/35 bg-cyan-500/10 hover:bg-cyan-500/20 px-5 py-3.5 text-sm font-bold text-cyan-200 transition cursor-pointer"
            >
              ویزای هنرمندان آلمان (§21)
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('artist-austria')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              اقامت هنرمندان وین اتریش
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
            <span>فهرست مطالب مهاجرت هنرمندان و اهالی موسیقی (۲۰۲۶–۲۰۲۷)</span>
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

        {/* Why Artists Differ */}
        <section id="why-artists-differ" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <Palette className="h-6 w-6 text-amber-300 shrink-0" />
            <span>چرا مسیر مهاجرت هنرمندان با سایر مشاغل تفاوت دارد؟</span>
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            در سیستم‌های مهاجرتی سنتی، فرد باید یا جاب‌آفر داشته باشد یا سرمایه کلان وارد کند. اما هنرمندان،
            نوازندگان، آهنگسازان، خوانندگان، نقاشان و طراحان به‌عنوان{' '}
            <strong className="text-amber-300">«مشاغل آزاد فرهنگی یا Freiberufler»</strong> شناخته می‌شوند. دولت‌های
            اروپایی (به‌ویژه آلمان و اتریش) هنر را جزو صنایع حیاتی می‌دانند و به هنرمندان مستقل اجازه می‌دهند بدون
            کارفرما و صرفاً با اثبات توان درآمدزایی از هنر و ارزش فرهنگی، کارت اقامت دریافت کنند.
          </p>
        </section>

        {/* Interactive Explorer */}
        <section className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              کاوشگر ۴ کشور حامی هنرمندان و اهالی موسیقی در اروپا (۲۰۲۶–۲۰۲۷)
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-300">
              هر کشور را انتخاب کنید تا جزئیات نهادهای حمایتی، گرنت‌ها و مدارک اختصاصی آن را ببینید:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {ARTIST_COUNTRIES.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedCountry(c.key)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer border ${
                  selectedCountry === c.key
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                {c.tab}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-cyan-400/25 bg-[#06181f] p-5 md:p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base md:text-lg font-black text-amber-300">
                {activeCountry.country}: {activeCountry.visaType}
              </h3>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/35 px-3 py-1 text-[11px] font-bold text-emerald-300">
                اقامت دائم: {activeCountry.prPath}
              </span>
            </div>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">
              <strong className="text-cyan-300">مزیت و حمایت دولتی: </strong>
              {activeCountry.highlight}
            </p>
            <p className="text-xs md:text-sm leading-7 text-slate-300 text-justify">
              <strong className="text-amber-300">پیش‌نیازهای کلیدی پرونده: </strong>
              {activeCountry.requirements}
            </p>
            <div>
              <button
                type="button"
                onClick={() => navigateInternal(activeCountry.ctaPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                {activeCountry.ctaLabel} ←
              </button>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول مقایسه بهترین کشورها برای ویزای هنرمندان و اهالی موسیقی (۲۰۲۶–۲۰۲۷)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-amber-400/15 text-amber-300 font-black">
                <tr>
                  <th className="p-3.5">کشور مقصد</th>
                  <th className="p-3.5">نوع ویزای هنری</th>
                  <th className="p-3.5">نیاز به سرمایه ثبتی</th>
                  <th className="p-3.5">امکان برخورداری از حمایت دولتی</th>
                  <th className="p-3.5">مسیر رسیدن به اقامت دائم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {ARTIST_COUNTRIES.map((row) => (
                  <tr key={row.key} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-white whitespace-nowrap">{row.country}</td>
                    <td className="p-3.5 text-cyan-200 font-bold">{row.visaType}</td>
                    <td className="p-3.5 text-slate-200">{row.capitalNeed}</td>
                    <td className="p-3.5 text-emerald-300 leading-6">{row.stateSupport}</td>
                    <td className="p-3.5 text-amber-200 font-semibold">{row.prPath}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Dive Cards */}
        <section className="grid gap-6 md:grid-cols-3">
          <div id="germany-artists" className="rounded-3xl border border-amber-400/25 bg-[#08222b] p-6 space-y-3">
            <h3 className="text-base font-black text-amber-300">آلمان: پایتخت فرهنگی و سیستم KSK</h3>
            <p className="text-xs leading-7 text-slate-200 text-justify">
              برلین، کلن و هامبورگ مأمن موزیسین‌ها و هنرمندان مستقل است. بدون نیاز به کارفرما و با نامه‌های تمایل به
              همکاری (LOI) می‌توانید اقامت بگیرید و با عضویت در KSK تنها ۵۰٪ حق بیمه درمان و بازنشستگی بپردازید.
            </p>
          </div>
          <div id="austria-artists" className="rounded-3xl border border-cyan-400/25 bg-[#08222b] p-6 space-y-3">
            <h3 className="text-base font-black text-cyan-300">اتریش: ویزای Künstlerin در قلب کلاسیک</h3>
            <p className="text-xs leading-7 text-slate-200 text-justify">
              وین به‌عنوان پایتخت موسیقی جهان برای نوازندگان کلاسیک، آهنگسازان و خوانندگان اپرا ایده‌آل است؛ شهرداری
              وین (Kultur Wien) گرنت‌ها و وام‌های حمایتی ویژه‌ای به هنرمندان مستقل اختصاص می‌دهد.
            </p>
          </div>
          <div
            id="france-netherlands-artists"
            className="rounded-3xl border border-emerald-400/25 bg-[#08222b] p-6 space-y-3"
          >
            <h3 className="text-base font-black text-emerald-300">فرانسه و هلند: پناهگاه‌های خلاق</h3>
            <p className="text-xs leading-7 text-slate-200 text-justify">
              فرانسه با ویزای Passport Talent (شاخه آفرینش هنری و ادبی) و هلند با Cultural Vocation به هنرمندانی که
              ارزش فرهنگی افزوده ایجاد کنند اقامت چندساله قابل تمدید اعطا می‌کنند.
            </p>
          </div>
        </section>

        {/* Key Documents */}
        <section id="key-documents" className="space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-cyan-300 shrink-0" />
            <span>۴ مدرک کلیدی که یک هنرمند برای ویزای اروپا نیاز دارد</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KEY_DOCUMENTS.map((doc) => (
              <div key={doc.title} className="rounded-3xl border border-white/10 bg-[#08222b] p-5 space-y-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <h3 className="text-sm font-black text-white">{doc.title}</h3>
                <p className="text-xs leading-6 text-slate-300 text-justify">{doc.text}</p>
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
            بر اساس تجربه مستقیم دپارتمان حقوقی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران، بزرگ‌ترین
            اشتباه هنرمندان در مواجهه با اداره اقامت اروپا این است که{' '}
            <strong className="text-amber-300">«هنر را صرفاً یک سرگرمی یا احساس شخصی جلوه می‌دهند، نه یک حرفه اقتصادی»</strong>
            . افسران اداره مهاجرت آلمان یا اتریش شاعرانه برخورد نمی‌کنند؛ آن‌ها می‌خواهند با اعداد و ارقام ببینند که
            آیا شما از راه هنر خود اجاره خانه و بیمه را پرداخت می‌کنید یا خیر. تیم حقوقی دیاکو با تنظیم یک{' '}
            <strong className="text-cyan-300">بیزنس پلن فرهنگی و اقتصادی دقیق</strong> و پیوند آثار شما به بازار هنری
            اروپا، پرونده را به یک پروپوزال قانونی غیرقابل رد تبدیل می‌کند.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول ویزای هنرمندان (FAQ)</h2>
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
              <span>دپارتمان‌های تخصصی اقامت هنرمندان در دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'artist-germany', label: 'اقامت هنرمندان آلمان (§21 + KSK)' },
                { page: 'artist-austria', label: 'اقامت هنرمندان و نخبگان اتریش (§43a)' },
                { page: 'talent-france', label: 'ویزای Passport Talent فرانسه' },
                { page: 'freelance-germany', label: 'اقامت فریلنسری آلمان (Freiberufler)' },
                { page: 'artist-spain', label: 'اقامت هنرمندان اسپانیا' },
                { page: 'visa-approval-rate-for-iranians-by-country', label: 'نرخ موفقیت ویزا به تفکیک کشور' },
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
              <span>نهادهای رسمی حمایتی هنرمندان و مشاوره تخصصی</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'صندوق تامین اجتماعی هنرمندان آلمان (KSK)', url: 'https://www.kuenstlersozialkasse.de/' },
                { label: 'پورتال رسمی مهاجرت اتریش (Migration.gv.at)', url: 'https://www.migration.gv.at/' },
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

export default ArtistsAndMusiciansImmigrationPage;
