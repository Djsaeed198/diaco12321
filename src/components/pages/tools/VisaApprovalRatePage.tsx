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
  ExternalLink,
  List,
  PhoneCall,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const SCHENGEN_C_RATES = [
  {
    country: 'ایتالیا',
    rate: '~۷۲٪ تا ۷۶٪',
    barPercent: 74,
    strictness: 'متوسط',
    tone: 'text-emerald-300',
    bestFor: 'متقاضیان با سابقه سفر شینگن قبلی، گردش حساب شفاف و برنامه سفر دقیق',
  },
  {
    country: 'اسپانیا',
    rate: '~۷۰٪ تا ۷۵٪',
    barPercent: 72,
    strictness: 'متوسط',
    tone: 'text-emerald-300',
    bestFor: 'مسافران دارای تاریخچه سفر معتبر (Travel History) و مدارک شغلی قوی',
  },
  {
    country: 'یونان',
    rate: '~۶۸٪ تا ۷۴٪',
    barPercent: 71,
    strictness: 'متوسط',
    tone: 'text-emerald-300',
    bestFor: 'سفرهای توریستی خانوادگی یا تجاری با واچر قطعی هتل و پرواز',
  },
  {
    country: 'فرانسه',
    rate: '~۶۵٪ تا ۷۰٪',
    barPercent: 68,
    strictness: 'متوسط رو به بالا',
    tone: 'text-cyan-300',
    bestFor: 'متقاضیان با دعوت‌نامه معتبر یا سابقه ویزای شینگن متعدد',
  },
  {
    country: 'آلمان',
    rate: '~۶۲٪ تا ۶۸٪',
    barPercent: 65,
    strictness: 'بالا (برای توریستی)',
    tone: 'text-amber-300',
    bestFor: 'سفرهای تجاری، نمایشگاهی و دعوت‌نامه رسمی خانواده درجه یک (توریستی انفرادی سخت‌تر است)',
  },
  {
    country: 'اتریش',
    rate: '~۶۰٪ تا ۶۶٪',
    barPercent: 63,
    strictness: 'بالا (برای توریستی)',
    tone: 'text-amber-300',
    bestFor: 'سفرهای تجاری، همایش‌های علمی و دعوت‌نامه‌های رسمی ثبت‌شده در اداره پلیس اتریش (EVE)',
  },
  {
    country: 'هلند',
    rate: '~۵۵٪ تا ۶۲٪',
    barPercent: 58,
    strictness: 'بالا',
    tone: 'text-amber-300',
    bestFor: 'سفرهای کاری شرکتی و دیدار خانواده درجه یک با مدارک مالی مستند',
  },
  {
    country: 'بلژیک و سوئد',
    rate: '~۳۵٪ تا ۴۵٪',
    barPercent: 40,
    strictness: 'بسیار بالا',
    tone: 'text-rose-300',
    bestFor: 'دارای بالاترین نرخ ریجکتی شینگن به‌دلیل سخت‌گیری شدید در بند عدم بازگشت',
  },
];

const LONG_TERM_D_RATES = [
  {
    category: 'امارات (دبی) — ثبت شرکت و ویزای کاری',
    rate: '~۹۵٪ تا ۹۸٪',
    barPercent: 96,
    factor: 'عدم سوءپیشینه و تکمیل مدارک ثبت شرکت در مناطق آزاد یا قرارداد کاری رسمی',
    duration: '۲ تا ۴ هفته',
    tone: 'text-emerald-300',
  },
  {
    category: 'آلمان — ویزای کار تخصصی (بلوکارت / § 18a/b)',
    rate: '~۹۲٪ تا ۹۵٪',
    barPercent: 93,
    factor: 'داشتن جاب‌آفر منطبق با حقوق پایه ۲۰۲۶ + تاییدیه معادل‌سازی مدرک (ZAB / Anerkennung)',
    duration: '۴ تا ۱۰ هفته (در مسیر تسریع‌شده)',
    tone: 'text-emerald-300',
  },
  {
    category: 'اتریش — کارت قرمز-سفید-قرمز و استارتاپ',
    rate: '~۸۸٪ تا ۹۳٪',
    barPercent: 90,
    factor: 'کسب حداقل امتیاز قانونی (۵۰ تا ۵۵ امتیاز) + تاییدیه اداره کار (AMS) یا سازمان AWS',
    duration: '۸ تا ۱۴ هفته',
    tone: 'text-emerald-300',
  },
  {
    category: 'مجارستان و یونان — گلدن ویزا و ثبت شرکت',
    rate: '~۸۵٪ تا ۹۰٪',
    barPercent: 87,
    factor: 'اثبات شفاف منشأ قانونی سرمایه (Source of Funds) و تکمیل سرمایه‌گذاری',
    duration: '۸ تا ۱۶ هفته',
    tone: 'text-cyan-300',
  },
  {
    category: 'اتریش — ویزای تحصیلی (دانشگاه‌های دولتی)',
    rate: '~۸۲٪ تا ۸۷٪',
    barPercent: 84,
    factor: 'پذیرش رسمی دانشگاه + اثبات تمکن مالی معتبر و عدم وجود گپ تحصیلی غیرمنطقی',
    duration: '۶ تا ۱۲ هفته',
    tone: 'text-cyan-300',
  },
  {
    category: 'آلمان — ویزای تحصیلی و آوسبیلدونگ',
    rate: '~۸۰٪ تا ۸۶٪',
    barPercent: 83,
    factor: 'حساب بلوکه‌شده (برای تحصیل) یا قرارداد معتبر آوسبیلدونگ + مدرک زبان B1/B2',
    duration: '۶ تا ۱۲ هفته',
    tone: 'text-cyan-300',
  },
  {
    category: 'ایتالیا — ویزای تحصیلی (با بورسیه یا تمکن)',
    rate: '~۷۸٪ تا ۸۴٪',
    barPercent: 81,
    factor: 'پذیرش دانشگاهی + گردش حساب ۳ تا ۶ ماهه شفاف بدون واریزی ناگهانی',
    duration: '۶ تا ۱۰ هفته',
    tone: 'text-cyan-300',
  },
  {
    category: 'کانادا — ویزای تحصیلی و کاری (۲۰۲۶)',
    rate: '~۴۲٪ تا ۵۲٪',
    barPercent: 47,
    factor: 'محدود به مقاطع ارشد پژوهشی/دکتری، زبان فرانسه یا جاب‌آفر تاییدشده (LMIA)',
    duration: '۱۲ تا ۲۴ هفته',
    tone: 'text-amber-300',
  },
  {
    category: 'آمریکا — ویزای تحصیلی (F-1)',
    rate: '~۳۵٪ تا ۴۵٪',
    barPercent: 40,
    factor: 'داشتن فاند کامل در مقاطع دکتری و رشته‌های غیرحساس (عدم برخورد با چک امنیتی طولانی)',
    duration: 'متغیر (بررسی اداری ۴ تا ۱۲ ماه)',
    tone: 'text-rose-300',
  },
];

const BOOST_PRINCIPLES = [
  {
    num: '۱',
    title: 'اخذ پیش‌تاییدیه‌های داخلی (Vorabzustimmung / Pre-Approval)',
    text: 'در کشورهایی مثل آلمان و اتریش، دریافت تاییدیه اداره کار یا اداره مهاجرت پیش از وقت سفارت، ریسک ریجکتی در سفارت را به نزدیک صفر می‌رساند.',
  },
  {
    num: '۲',
    title: 'پاک‌سازی گردش حساب بانکی از ۳ تا ۶ ماه قبل',
    text: 'حذف کامل واریزی‌های ناگهانی و بی‌منبع در حساب بانکی تا افسر کنسولی هیچ شکی درباره واقعی بودن تمکن مالی نداشته باشد.',
  },
  {
    num: '۳',
    title: 'تطابق دقیق گپ تحصیلی و شغلی با بیمه تامین اجتماعی',
    text: 'ارائه سوابق بیمه تامین اجتماعی و رزومه پیوسته به همراه یک انگیزه‌نامه (SOP) حقوقی و شخصی‌سازی‌شده متناسب با رشته یا قرارداد کاری.',
  },
  {
    num: '۴',
    title: 'اجتناب از «ویزا شاپینگ» (Visa Shopping)',
    text: 'اقدام برای سفارتی که واقعاً مقصد اصلی سفر یا تحصیل شماست، نه کشوری که صرفاً وقت سفارت زودتری دارد.',
  },
];

const faqs = [
  {
    q: 'در سال ۲۰۲۶ کدام کشور شینگن برای اولین سفر توریستی ایرانیان نرخ قبولی بالاتری دارد؟',
    a: 'کشورهای ایتالیا، اسپانیا و یونان در صورتی که برنامه سفر منطقی، واچر قطعی هتل و گردش حساب ۳ تا ۶ ماهه شفاف داشته باشید، بالاترین نرخ صدور ویزای توریستی شینگن را برای ایرانیان دارند.',
  },
  {
    q: 'چرا نرخ موفقیت ویزای کاری آلمان و اتریش از ویزای تحصیلی بالاتر است؟',
    a: 'زیرا در ویزای کاری، یک کارفرمای اروپایی و اداره کار کشور مقصد پیشاپیش نیاز خود به تخصص شما را تایید کرده‌اند و درآمد ماهانه شما تضمین شده است؛ بنابراین افسر سفارت دغدغه‌ای بابت تامین هزینه‌های زندگی شما در اروپا ندارد.',
  },
  {
    q: 'آیا بالا بودن موجودی حساب بانکی به تنهایی نرخ قبولی ویزا را تضمین می‌کند؟',
    a: 'خیر؛ در سال‌های ۲۰۲۶ و ۲۰۲۷، «گردش حساب و منشأ پول» بسیار مهم‌تر از عدد نهایی موجودی است. حسابی با موجودی ۲ میلیارد تومان که ۱۰ روز قبل پر شده باشد، نرخ ریجکتی بسیار بالاتری نسبت به حسابی با موجودی ۸۰۰ میلیون تومان و واریزی‌های منظم حقوقی در ۶ ماه گذشته دارد.',
  },
  {
    q: 'اگر یک بار ریجکت شده باشیم، نرخ موفقیت ما در اقدام بعدی چقدر کاهش می‌یابد؟',
    a: 'اگر دلایل ریجکتی قبلی را به صورت ریشه‌ای اصلاح کنید و در نامه پوششی (Cover Letter) تغییرات جدید را توضیح دهید، سابقه ریجکتی قبلی مانع قبولی شما نخواهد شد و نرخ موفقیت شما مجدداً به سطح استاندارد بازمی‌گردد.',
  },
];

const tocItems = [
  { id: 'visa-types-distinction', label: 'تفاوت حیاتی آمار ویزای C (توریستی) و D (مهاجرتی)' },
  { id: 'schengen-c-table', label: 'جدول نرخ موفقیت ویزای شینگن نوع C (۲۰۲۶–۲۰۲۷)' },
  { id: 'long-term-d-table', label: 'جدول نرخ موفقیت ویزاهای بلندمدت نوع D' },
  { id: 'highest-lowest-embassies', label: 'سفارت‌های با بالاترین تایید و بیشترین ریجکتی' },
  { id: 'how-to-boost-rate', label: '۴ اصل رساندن شانس قبولی به بالای ۹۰٪' },
  { id: 'expert-insights', label: 'نکته دیاکو: تله آمار کلی و ممیزی پیش از سفارت' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const VisaApprovalRatePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [activeTab, setActiveTab] = useState<'type-d' | 'type-c'>('type-d');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'نرخ موفقیت ویزا به تفکیک کشور برای ایرانیان (جدول کامل ۲۰۲۶-۲۰۲۷) | دیاکو',
    description:
      'بررسی دقیق نرخ موفقیت ویزای شینگن (توریستی C)، کاری آلمان و اتریش (+۹۰٪)، تحصیلی ایتالیا و اتریش، ثبت شرکت دبی (+۹۵٪)، کانادا و آمریکا برای ایرانیان در ۲۰۲۶–۲۰۲۷.',
    canonical: 'https://www.dia-co.ir/visa-approval-rate-for-iranians-by-country',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'نرخ موفقیت ویزا برای ایرانیان ۲۰۲۶',
      'شانس قبولی ویزای شینگن ایرانیان',
      'آمار قبولی ویزای کار آلمان و اتریش',
      'درصد قبولی ویزای تحصیلی کانادا و آمریکا',
      'بهترین سفارت برای ویزای شینگن ایرانیان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/visa-approval-rate-for-iranians-by-country/#article',
          headline: 'نرخ موفقیت ویزا به تفکیک کشور برای ایرانیان (جدول کامل ۲۰۲۶-۲۰۲۷)',
          description:
            'بررسی دقیق نرخ موفقیت ویزای شینگن، تحصیلی، کاری و سرمایه‌گذاری برای ایرانیان در سال‌های ۲۰۲۶ و ۲۰۲۷ به تفکیک کشور در آلمان، اتریش، ایتالیا، فرانسه و کانادا.',
          image: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:41:00+03:30',
          dateModified: '2026-11-14T13:41:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان پژوهش‌های آماری و امور کنسولی هلدینگ مهاجرتی دیاکو',
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
            'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en',
            'https://www.canada.ca/en/immigration-refugees-citizenship.html',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/visa-approval-rate-for-iranians-by-country',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/visa-approval-rate-for-iranians-by-country/#faq',
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
              onClick={() => navigateInternal('why-my-visa-was-rejected-10-real-reasons')}
              className="hover:text-[#f5a623] transition cursor-pointer"
            >
              تحلیل آمار کنسولی و رفع ریجکتی
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">نرخ موفقیت ویزا به تفکیک کشور (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('visa-approval-rate-for-iranians-by-country')}
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
              آمار تفکیکی ویزاهای Type C و Type D (۲۰۲۶–۲۰۲۷)
            </span>
            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-300" />
              تایید دپارتمان امور کنسولی وین و تهران
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            نرخ موفقیت ویزا به تفکیک کشور برای ایرانیان (جدول کامل ۲۰۲۶–۲۰۲۷)
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان پژوهش‌های آماری و امور کنسولی هلدینگ مهاجرتی دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">ممیزی پرونده‌ها: </span>
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
              نرخ موفقیت ویزا برای ایرانیان در سال‌های ۲۰۲۶ و ۲۰۲۷ بر اساس نوع ویزا تفاوت چشمگیری دارد. در بخش
              ویزاهای کوتاه‌مدت شینگن (نوع C)، میانگین قبولی ایرانیان حدود <strong className="text-amber-300">۶۲ تا
              ۶۸ درصد</strong> است (ایتالیا، اسپانیا، یونان و سفرهای تجاری آلمان بالاترین تایید؛ بلژیک، سوئد و مالت
              بیشترین ریجکتی). در بخش ویزاهای بلندمدت (نوع D)، ویزای کار تخصصی آلمان و اتریش دارای نرخ موفقیت{' '}
              <strong className="text-emerald-300">بالای ۹۰٪</strong>، ثبت شرکت دبی{' '}
              <strong className="text-emerald-300">۹۵ تا ۹۸٪</strong>، تحصیلی ایتالیا و اتریش{' '}
              <strong className="text-cyan-300">۸۰ تا ۸۵٪</strong>، و ویزای تحصیلی آمریکا و کانادا (بدون فاند کامل
              دکتری) پایین‌ترین نرخ (<strong className="text-rose-300">۳۵ تا ۵۰٪</strong>) را دارند.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>سنجش دقیق شانس قبولی ویزای شما (بالای ۹۰٪)</span>
              <Rocket className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('why-my-visa-was-rejected-10-real-reasons')}
              className="rounded-2xl border border-cyan-400/35 bg-cyan-500/10 hover:bg-cyan-500/20 px-5 py-3.5 text-sm font-bold text-cyan-200 transition cursor-pointer"
            >
              ۱۰ دلیل واقعی ریجکتی ویزا
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('iranian-immigration-map-statistics')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              نقشه مهاجرت ایرانیان (۲۰۲۵–۲۰۲۷)
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
            <span>فهرست مطالب نرخ موفقیت ویزا برای ایرانیان (۲۰۲۶–۲۰۲۷)</span>
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

        {/* Visa Type Distinction */}
        <section id="visa-types-distinction" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white">
            چرا تفکیک «ویزای کوتاه‌مدت (توریستی)» از «ویزای بلندمدت (مهاجرتی)» در آمارها حیاتی است؟
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-amber-400/25 bg-[#06181f] p-5 space-y-2">
              <h3 className="text-sm md:text-base font-black text-amber-300">
                ۱) ویزای کوتاه‌مدت شینگن (Type C — تا ۹۰ روز)
              </h3>
              <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">
                تمرکز افسر کنسولی بر «تضمین بازگشت به ایران» (سابقه سفر، سند ملک، شغل رسمی و پیوند خانوادگی) است؛ به
                همین دلیل نرخ ریجکتی در این بخش بالاتر است و گردش حساب غیرشفاف یا رزرو صوری بلافاصله پرونده را رد
                می‌کند.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/25 bg-[#06181f] p-5 space-y-2">
              <h3 className="text-sm md:text-base font-black text-emerald-300">
                ۲) ویزای بلندمدت مهاجرتی (Type D — کاری، تحصیلی، ثبت شرکت)
              </h3>
              <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">
                متقاضی اصلاً قرار نیست ظرف ۹۰ روز بازگردد؛ بلکه هدف او اقامت قانونی است. بنابراین در این ویزاها،
                «تطابق مدارک با قانون کشور مقصد» (جاب‌آفر استاندارد، تاییدیه اداره کار AMS/BA یا پذیرش دانشگاهی) ملاک
                است و نرخ قبولی بسیار بالاتر از ویزای توریستی است.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Rate Comparator */}
        <section className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-cyan-300 shrink-0" />
                <span>نمودار تعاملی نرخ قبولی ویزاهای ایرانیان (۲۰۲۶–۲۰۲۷)</span>
              </h2>
              <p className="mt-1 text-xs md:text-sm text-slate-300">
                بین آمار ویزاهای بلندمدت اقامتی (Type D) و کوتاه‌مدت شینگن (Type C) جابه‌جا شوید:
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('type-d')}
                className={`rounded-xl px-4 py-2 text-xs font-black transition cursor-pointer border ${
                  activeTab === 'type-d'
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                ویزاهای اقامتی (Type D)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('type-c')}
                className={`rounded-xl px-4 py-2 text-xs font-black transition cursor-pointer border ${
                  activeTab === 'type-c'
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                ویزای توریستی شینگن (Type C)
              </button>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-white/10 bg-[#06181f] p-5">
            {activeTab === 'type-d'
              ? LONG_TERM_D_RATES.map((item) => (
                  <div key={item.category} className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-white">{item.category}</span>
                      <span className={`font-black ${item.tone}`}>{item.rate}</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-emerald-400 to-cyan-500"
                        style={{ width: `${item.barPercent}%` }}
                      />
                    </div>
                  </div>
                ))
              : SCHENGEN_C_RATES.map((item) => (
                  <div key={item.country} className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-white">
                        {item.country} <span className="text-slate-400 font-normal">(سخت‌گیری: {item.strictness})</span>
                      </span>
                      <span className={`font-black ${item.tone}`}>{item.rate}</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-amber-400 to-cyan-400"
                        style={{ width: `${item.barPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Table 1: Schengen Type C */}
        <section id="schengen-c-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول کامل نرخ موفقیت ویزای شینگن (توریستی و تجاری — نوع C) به تفکیک کشور (۲۰۲۶–۲۰۲۷)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-amber-400/15 text-amber-300 font-black">
                <tr>
                  <th className="p-3.5">کشور مقصد</th>
                  <th className="p-3.5">نرخ تقریبی موفقیت (نوع C)</th>
                  <th className="p-3.5">سطح سخت‌گیری سفارت</th>
                  <th className="p-3.5">بیشترین شانس قبولی برای چه کسانی است؟</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {SCHENGEN_C_RATES.map((row) => (
                  <tr key={row.country} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-white whitespace-nowrap">{row.country}</td>
                    <td className={`p-3.5 font-black whitespace-nowrap ${row.tone}`}>{row.rate}</td>
                    <td className="p-3.5 text-cyan-200 font-semibold whitespace-nowrap">{row.strictness}</td>
                    <td className="p-3.5 text-slate-200 leading-6">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Table 2: Long-Term Type D */}
        <section id="long-term-d-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول نرخ موفقیت ویزاهای مهاجرتی بلندمدت (کاری، تحصیلی و سرمایه‌گذاری — نوع D)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-emerald-500/15 text-emerald-300 font-black">
                <tr>
                  <th className="p-3.5">کشور و نوع ویزای بلندمدت</th>
                  <th className="p-3.5">نرخ موفقیت واقعی (پرونده استاندارد)</th>
                  <th className="p-3.5">عامل تعیین‌کننده در تایید ویزا</th>
                  <th className="p-3.5">میانگین زمان بررسی پرونده</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {LONG_TERM_D_RATES.map((row) => (
                  <tr key={row.category} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-white">{row.category}</td>
                    <td className={`p-3.5 font-black whitespace-nowrap ${row.tone}`}>{row.rate}</td>
                    <td className="p-3.5 text-slate-200 leading-6">{row.factor}</td>
                    <td className="p-3.5 text-cyan-200 font-semibold whitespace-nowrap">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Highest vs Lowest Embassies */}
        <section id="highest-lowest-embassies" className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-400/30 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-black text-base">
              <CheckCircle2 className="h-5 w-5" />
              <h3>سفارت‌های با بالاترین نرخ تایید (بالای ۹۰٪)</h3>
            </div>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">
              بالاترین نرخ قبولی متعلق به ویزاهای کاری و کارآفرینی اروپای مرکزی (آلمان و اتریش) و ویزاهای اقامتی
              امارات است. علت این است که پیش از رسیدن پرونده به سفارت، یک نهاد دولتی در کشور مقصد (اداره کار آلمان BA
              یا اداره مهاجرت اتریش MA35) صلاحیت شغلی یا طرح تجاری متقاضی را تایید کرده و نقش سفارت در تهران بیشتر
              احراز هویت و الصاق ویزا است.
            </p>
          </div>
          <div className="rounded-3xl border border-rose-400/30 bg-[#08222b] p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-300 font-black text-base">
              <ShieldAlert className="h-5 w-5" />
              <h3>مسیرهای با بالاترین نرخ ریجکتی (زیر ۴۵٪)</h3>
            </div>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">
              بالاترین نرخ ریجکتی متعلق به ویزاهای توریستی انفرادی بدون دعوت‌نامه (به‌ویژه در بلژیک، سوئد و مالت) و
              ویزاهای تحصیلی مقاطع پایین (کالج‌های خصوصی) در کشورهایی با سیاست‌های انقباضی ۲۰۲۶ مانند کانادا،
              بریتانیا و استرالیا و همچنین ویزای F-1 آمریکا بدون فاند دکتری است.
            </p>
          </div>
        </section>

        {/* 4 Principles to Reach 90%+ */}
        <section id="how-to-boost-rate" className="space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white">
            چگونه شانس قبولی ویزای خود را از میانگین آماری به بالای ۹۰ درصد برسانیم؟
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BOOST_PRINCIPLES.map((p) => (
              <div key={p.num} className="rounded-3xl border border-white/10 bg-[#08222b] p-5 space-y-2.5">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/15 text-sm font-black text-amber-300 border border-amber-400/30">
                  {p.num}
                </div>
                <h3 className="text-sm font-black text-white leading-6">{p.title}</h3>
                <p className="text-xs leading-6 text-slate-300 text-justify">{p.text}</p>
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
            بر اساس آمار ثبت‌شده در پرونده‌های اجرایی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران، اعداد
            عمومی اینترنت می‌تواند گمراه‌کننده باشد. برای مثال، نرخ کلی قبولی ویزای توریستی اتریش حدود ۶۳٪ است؛ اما
            برای متقاضی دارای{' '}
            <strong className="text-amber-300">دعوت‌نامه الکترونیکی ثبت‌شده در اداره پلیس اتریش (EVE)</strong> و گردش
            حساب ۶ ماهه شفاف، نرخ قبولی عملاً بالای ۹۰٪ است؛ در حالی که با پاسپورت سفید و رزرو صوری هتل، شانس قبولی
            زیر ۱۵٪ است! در دیاکو تمام مدارک پیش از وقت سفارت توسط کارشناسان مقیم اروپا ممیزی می‌شود.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول درباره نرخ موفقیت ویزا (FAQ)</h2>
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
              <span>مسیرهای بالای ۹۰٪ قبولی و راهنماهای مرتبط در دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'why-my-visa-was-rejected-10-real-reasons', label: '۱۰ دلیل واقعی ریجکتی و لایحه اعتراض' },
                { page: 'german-blue-card', label: 'ویزای کار تخصصی آلمان (+۹۲٪ قبولی)' },
                { page: 'austria-rwr', label: 'کارت قرمز-سفید-قرمز اتریش (+۸۸٪ قبولی)' },
                { page: 'business-dubai', label: 'ثبت شرکت و اقامت دبی (+۹۵٪ قبولی)' },
                { page: 'iranian-immigration-map-statistics', label: 'نقشه آماری مهاجرت ایرانیان (۲۰۲۵–۲۰۲۷)' },
                { page: 'countries-we-do-not-recommend-for-immigration', label: 'مقاصدی که توصیه نمی‌کنیم' },
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
              <span>منابع رسمی آمار شینگن و ممیزی تخصصی پرونده</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                {
                  label: 'سیاست ویزای کمیسیون اروپا (EU Home Affairs)',
                  url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en',
                },
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

export default VisaApprovalRatePage;
