import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowLeft,
  DollarSign,
  ChevronDown,
  HelpCircle,
  Check,
  Copy,
  Sparkles,
  Users,
  Building,
  MapPin,
  ShieldCheck,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary') => void;
}

// ✅ 2026 年奥地利蓝卡官方薪资阈值（migration.gv.at / AMS）
const SALARY_THRESHOLDS_AUSTRIA_2026 = {
  regularAnnual: 55678, // 全职雇员平均毛年薪，含 13/14 薪
  monthly14th: 3977, // €55,678 ÷ 14
};

// ============================================================
// 🖼️ Unsplash 图片资源（维也纳主题，免费商用）
// ============================================================
const AUSTRIA_IMAGES = {
  hero: {
    src: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    srcSet:
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=600&q=75 600w, ' +
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=900&q=80 900w, ' +
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80 1200w',
    alt: 'نمای شهر وین اتریش در غروب — مقصد اصلی دارندگان بلوکارت اتریش',
    width: 1200,
    height: 675,
  },
  salary: {
    src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80',
    alt: 'محیط اداری مدرن در وین اتریش — محل کار متخصصان دارای بلوکارت',
    width: 900,
    height: 506,
  },
  documents: {
    src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
    alt: 'مدارک و پاسپورت روی میز — چک‌لیست مدارک بلوکارت اتریش',
    width: 900,
    height: 506,
  },
};

// ============================================================
// 🔍 AIO / SEO 结构化数据
// ============================================================
function buildAustriaStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'بلوکارت اتریش ۲۰۲۶ | شرایط، حقوق ۱۴ ماهه و تبدیل به RWR Plus',
        description:
          'راهنمای کامل بلوکارت اتریش ۲۰۲۶: حداقل حقوق €55,678 در ۱۴ پرداخت، بدون سیستم امتیاز، تبدیل به RWR Plus پس از ۲ سال و ۲۱ ماه اشتغال، و خدمات دفتر وین دیاکو.',
        inLanguage: 'fa',
        about: {
          '@type': 'Thing',
          name: 'EU Blue Card Austria',
          alternateName: 'Blaue Karte EU Österreich',
        },
        author: {
          '@type': 'Organization',
          name: 'هلدینگ مهاجرتی دیاکو',
          url: 'https://www.dia-co.ir/',
        },
        publisher: {
          '@type': 'Organization',
          name: 'هلدینگ مهاجرتی دیاکو',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.dia-co.ir/logo.png',
          },
        },
        datePublished: '2026-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.speakable-answer', '#faq-heading'],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'حداقل حقوق بلوکارت اتریش در سال ۲۰۲۶ چقدر است؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'حداقل حقوق ناخالص سالانه بلوکارت اتریش در ۲۰۲۶ برابر €۵۵,۶۷۸ است که در ۱۴ پرداخت (۱۲ حقوق ماهانه + عیدی تابستان + پاداش کریسمس) پرداخت می‌شود. این مبلغ معادل تقریباً €۳,۹۷۷ به ازای هر پرداخت است.',
            },
          },
          {
            '@type': 'Question',
            name: 'چه زمانی بلوکارت اتریش به RWR Plus تبدیل می‌شود؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'تبدیل بلوکارت اتریش به Rot-Weiß-Rot – Karte plus نیازمند دو شرط همزمان است: دارا بودن بلوکارت به مدت ۲ سال و اشتغال در ۲۱ ماه از ۲۴ ماه اخیر تحت شرایط مجوز. RWR Plus اجازه کار و اقامت آزاد در سراسر اتریش را می‌دهد.',
            },
          },
          {
            '@type': 'Question',
            name: 'آیا بلوکارت اتریش به سیستم امتیازبندی نیاز دارد؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'خیر. برخلاف کارت قرمز-سفید-قرمز (RWR Card) که بر پایه جدول امتیاز AMS است، بلوکارت اتریش هیچ سیستم امتیازبندی ندارد و صرفاً با جاب‌آفر تخصصی که کف حقوق €۵۵,۶۷۸ را پوشش دهد صادر می‌شود.',
            },
          },
          {
            '@type': 'Question',
            name: 'نظام پرداخت ۱۴ ماهه حقوق در اتریش چگونه است؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'در اتریش کارکنان سالانه ۱۴ بار حقوق دریافت می‌کنند: ۱۲ حقوق ماهانه عادی، یک حقوق اضافی در تابستان (Urlaubsgeld) و یک حقوق کامل در کریسمس (Weihnachtsgeld). دو پرداخت اضافی با نرخ مالیات تخفیف‌یافته ۶٪ مشمول مالیات می‌شوند.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'مراحل دریافت بلوکارت اتریش با نظارت دفتر وین دیاکو',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'بررسی قرارداد کار و انطباق با کف حقوق AMS',
            text: 'وکیل وین حقوق ناخالص سالانه قرارداد را با آستانه €۵۵,۶۷۸ مصوب ۲۰۲۶ تطبیق می‌دهد و فرم Arbeitgebererklärung را برای اداره کار آماده می‌کند.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'ثبت پرونده در MA 35 وین یا سفارت اتریش',
            text: 'تحویل مدارک هویتی، مدرک دانشگاهی با تاییدیه Nostrifizierung، قرارداد اجاره مسکن و بیمه درمانی به مرجع صالح.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'دریافت بلوکارت و شروع اشتغال',
            text: 'پس از تایید AMS و صدور کارت، دارنده بلوکارت می‌تواند در شغل پیشنهادی مشغول به کار شود.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'تبدیل به RWR Plus پس از ۲ سال',
            text: 'پس از دارا بودن بلوکارت به مدت ۲ سال و اشتغال در ۲۱ ماه از ۲۴ ماه اخیر، درخواست Rot-Weiß-Rot – Karte plus برای کار آزاد نامحدود در سراسر اتریش ثبت می‌شود.',
          },
        ],
        totalTime: 'P2Y',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'صفحه اصلی دیاکو',
            item: 'https://www.dia-co.ir/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'بلو کارت اتحادیه اروپا',
            item: 'https://www.dia-co.ir/guides/eu-blue-card/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'بلوکارت اتریش ۲۰۲۶',
            item: 'https://www.dia-co.ir/guides/blue-card-austria/',
          },
        ],
      },
    ],
  };
}

// ============================================================
// 🧩 组件主体
// ============================================================
export const AustriaBlueCardPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  useSeo({
    title: 'بلوکارت اتریش ۲۰۲۶ | حقوق ۵۵,۶۷۸ € و RWR Plus | دیاکو',
    description:
      'راهنمای بلوکارت اتریش ۲۰۲۶: حداقل حقوق €۵۵,۶۷۸ در ۱۴ پرداخت، بدون سیستم امتیاز، تبدیل به RWR Plus پس از ۲ سال و ۲۱ ماه اشتغال. محاسبه‌گر حقوق و چک‌لیست مدارک با دفتر وین دیاکو.',
    canonical: '/guides/blue-card-austria',
    ogType: 'article',
    ogImage: AUSTRIA_IMAGES.hero.src,
    keywords: [
      'بلوکارت اتریش ۲۰۲۶',
      'Blaue Karte EU Österreich',
      'حداقل حقوق بلوکارت اتریش ۲۰۲۶',
      'کارت قرمز سفید قرمز پلاس',
      'RWR Plus اتریش',
      'دفتر وین دیاکو',
      'اقامت کاری اتریش',
      'حقوق ۱۴ ماهه اتریش',
    ],
    jsonLd: buildAustriaStructuredData(),
  });

  const [calcSalary, setCalcSalary] = useState<number>(58000);
  const [calcGermanLevel, setCalcGermanLevel] = useState<'none' | 'a2' | 'b1'>('a2');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const evaluationResult = useMemo(() => {
    const meetsSalary = calcSalary >= SALARY_THRESHOLDS_AUSTRIA_2026.regularAnnual;
    const diff = calcSalary - SALARY_THRESHOLDS_AUSTRIA_2026.regularAnnual;
    const monthly14th = Math.round(calcSalary / 14);

    // RWR Plus: ۲ سال دارایی بلوکارت + ۲۱ ماه اشتغال در ۲۴ ماه اخیر
    // زبان آلمانی در RWR Plus شرط تبدیل نیست، اما در ارزیابی شانس سفارت مؤثر است
    const prMonths = 24; // حداقل ۲ سال (۲۴ ماه)
    let langNote = 'بدون نیاز به مدرک زبان برای تبدیل RWR Plus';
    if (calcGermanLevel === 'b1') {
      langNote = 'مدرک B1 در ارزیابی اولیه و ادغام شغلی امتیاز مثبت دارد';
    } else if (calcGermanLevel === 'a2') {
      langNote = 'مدرک A2 حداقل سطح توصیه‌شده برای بازار کار اتریش است';
    }

    let prob = 75;
    if (meetsSalary) prob += 18;
    if (calcGermanLevel !== 'none') prob += 5;
    if (prob > 98) prob = 98;

    return { meetsSalary, diff, monthly14th, prMonths, langNote, prob };
  }, [calcSalary, calcGermanLevel]);

  const DOCUMENTS_AUSTRIA = [
    {
      id: 'at-doc-1',
      title: 'قرارداد استخدامی معتبر با کارفرمای اتریشی (Arbeitsvertrag)',
      desc: 'حداقل مدت ۱۲ ماهه با درج صریح حقوق سالانه منطبق با حداقل €۵۵,۶۷۸ و پرداخت ۱۴ ماهه.',
      required: true,
    },
    {
      id: 'at-doc-2',
      title: 'فرم تاییدیه کارفرما برای اداره کار (Arbeitgebererklärung)',
      desc: 'تکمیل فرم استاندارد وزارت کار اتریش جهت استعلام پرونده در AMS و انجام آزمون بازار کار.',
      required: true,
    },
    {
      id: 'at-doc-3',
      title: 'ترجمه رسمی مدرک دانشگاهی با تاییدیه Nostrifizierung',
      desc: 'ترجمه آلمانی سوگندخورده با تاییدیه وزارت دادگستری وین و ارزشیابی مدرک (Nostrifizierung).',
      required: true,
    },
    {
      id: 'at-doc-4',
      title: 'گواهی اسکان و اجاره مسکن قانونی در اتریش (Mietvertrag)',
      desc: 'قرارداد اجاره رسمی تایید شده در شهرداری وین (Meldezettel) یا ایالت مربوطه.',
      required: true,
    },
    {
      id: 'at-doc-5',
      title: 'بیمه درمانی معتبر (Krankenversicherung)',
      desc: 'اثبات پوشش بیمه درمانی اجباری یا بیمه معادل تا زمان فعال‌سازی بیمه تأمین اجتماعی اتریش.',
      required: true,
    },
    {
      id: 'at-doc-6',
      title: 'شناسنامه و مدارک هویتی مترجم',
      desc: 'پاسپورت معتبر با حداقل ۱۲ ماه اعتبار، شناسنامه و مدارک وضعیت تأهل (در صورت وجود).',
      required: true,
    },
  ];

  const handleCopy = () => {
    const text = DOCUMENTS_AUSTRIA.map(
      (d, i) => `${i + 1}. ${d.title} (${d.required ? 'الزامی' : 'اختیاری'})\n   توضیحات: ${d.desc}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  const FAQS = [
    {
      q: 'حداقل حقوق بلوکارت اتریش در سال ۲۰۲۶ چقدر است؟',
      a: 'حداقل حقوق ناخالص سالانه بلوکارت اتریش در ۲۰۲۶ برابر €۵۵,۶۷۸ است که در ۱۴ پرداخت (۱۲ حقوق ماهانه + عیدی تابستان + پاداش کریسمس) پرداخت می‌شود. این مبلغ معادل تقریباً €۳,۹۷۷ به ازای هر پرداخت است. اگر قرارداد جمعی (Kollektivvertrag) شغل مربوطه کف بالاتری تعیین کند، آن مبلغ ملاک خواهد بود.',
    },
    {
      q: 'تفاوت بلوکارت اتریش با کارت قرمز-سفید-قرمز (RWR Karte) چیست؟',
      a: 'بلوکارت اتریش هیچ سیستم امتیازبندی ندارد و صرفاً با جاب‌آفر تخصصی که کف حقوق €۵۵,۶۷۸ را پوشش دهد صادر می‌شود. اما کارت قرمز-سفید-قرمز بر پایه جدول امتیاز AMS (سن، سابقه، زبان، تحصیلات) است و برای مشاغل کمبود نیرو یا فارغ‌التحصیلان دانشگاه‌های اتریش کاربرد دارد. مسیر بلوکارت برای متخصصان دارای مدرک دانشگاهی و جاب‌آفر با حقوق بالا ساده‌تر و مستقیم‌تر است.',
    },
    {
      q: 'چه زمانی بلوکارت اتریش به RWR Plus تبدیل می‌شود؟',
      a: 'تبدیل به Rot-Weiß-Rot – Karte plus نیازمند دو شرط همزمان است: دارا بودن بلوکارت به مدت ۲ سال و اشتغال در ۲۱ ماه از ۲۴ ماه اخیر تحت شرایط مجوز. RWR Plus اجازه کار و اقامت آزاد در سراسر اتریش را بدون وابستگی به کارفرمای اولیه می‌دهد.',
    },
    {
      q: 'نظام پرداخت ۱۴ ماهه حقوق در اتریش چگونه کار می‌کند؟',
      a: 'کارکنان در اتریش سالانه ۱۴ بار حقوق دریافت می‌کنند: ۱۲ حقوق ماهانه عادی، یک حقوق اضافی در تابستان (Urlaubsgeld) و یک حقوق کامل در کریسمس (Weihnachtsgeld). دو پرداخت اضافی با نرخ مالیات تخفیف‌یافته ۶٪ مشمول مالیات می‌شوند، در حالی که حقوق‌های ماهانه عادی مشمول نرخ تصاعدی بالاتری هستند.',
    },
    {
      q: 'آیا برای بلوکارت اتریش مدرک زبان آلمانی لازم است؟',
      a: 'برای دریافت اولیه بلوکارت، مدرک زبان آلمانی الزامی نیست. اما برای تبدیل به RWR Plus نیز شرط رسمی زبان وجود ندارد. با این حال، داشتن حداقل A2 یا B1 برای ادغام در بازار کار اتریش و ارزیابی مثبت‌تر پرونده در سفارت توصیه می‌شود.',
    },
    {
      q: 'دفتر وین دیاکو چه خدماتی برای متقاضیان بلوکارت ارائه می‌دهد؟',
      a: 'دفتر وین دیاکو قراردادهای کاری را از نظر انطباق با کف حقوق AMS بازبینی حقوقی می‌کند، فرم Arbeitgebererklärung را با کارفرما هماهنگ می‌سازد، پرونده را در MA 35 وین یا سفارت اتریش نمایندگی می‌کند و پس از ورود، امور اجاره مسکن قانونی (Mietvertrag)، ثبت Meldezettel و دریافت کارت فیزیکی را به پایان می‌رساند.',
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#081e26] text-slate-100 font-sans pb-20">
      {/* ============================================================
          🧭 Breadcrumb / 国家切换导航
          ============================================================ */}
      <nav
        aria-label="مسیریابی و کشورها"
        className="bg-[#05171e] border-b border-white/10 py-3 px-4 md:px-8"
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <ol className="flex items-center gap-2 text-slate-400 flex-wrap">
            <li>
              <button
                type="button"
                onClick={onBackToHome}
                className="text-amber-400 hover:text-amber-300 font-bold transition cursor-pointer"
              >
                صفحه اصلی دیاکو
              </button>
            </li>
            <li aria-hidden="true">/</li>
            <li>بلو کارت اتحادیه اروپا</li>
            <li aria-hidden="true">/</li>
            <li className="text-white font-semibold">بلوکارت اتریش ۲۰۲۶</li>
          </ol>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر کشورها:</span>
            {[
              { key: 'germany', label: '🇩🇪 آلمان' },
              { key: 'spain', label: '🇪🇸 اسپانیا' },
              { key: 'italy', label: '🇮🇹 ایتالیا' },
              { key: 'austria', label: '🇦🇹 اتریش', active: true },
              { key: 'hungary', label: '🇭🇺 مجارستان' },
            ].map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => onNavigateToCountry?.(c.key as any)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                  c.active
                    ? 'bg-amber-400 text-[#082833] font-black'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ============================================================
          🖼️ 英雄区 — Answer-First + LCP 优化图片
          ============================================================ */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#0b2933] via-[#08222b] to-[#081e26] pt-10 pb-16 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-7 text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span>دفتر وین — هلدینگ دیاکو</span>
                <span className="text-white/40">|</span>
                <span className="text-white">AuslBG § 12c</span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                بلوکارت اتریش ۲۰۲۶
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b]">
                  Blaue Karte EU Österreich
                </span>
              </h1>

              {/* Answer-First 段落：直接给出可被 AI 引用的核心答案 */}
              <p className="speakable-answer mt-4 text-xs sm:text-sm leading-7 text-slate-300 font-medium text-justify">
                <strong className="text-white">حداقل حقوق بلوکارت اتریش در ۲۰۲۶ برابر €۵۵,۶۷۸</strong> ناخالص سالانه است که در ۱۴ پرداخت (۱۲ حقوق ماهانه + عیدی تابستان + پاداش کریسمس) پرداخت می‌شود. بلوکارت اتریش <strong className="text-white">بدون سیستم امتیازبندی</strong> صادر می‌شود و پس از <strong className="text-white">۲ سال دارایی بلوکارت و ۲۱ ماه اشتغال در ۲۴ ماه اخیر</strong>، به Rot-Weiß-Rot – Karte plus با اجازه کار آزاد در سراسر اتریش تبدیل می‌گردد.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-5 py-2.5 text-xs font-black text-[#082833] shadow-glow hover:scale-105 transition cursor-pointer"
                >
                  محاسبه حقوق ۱۴ ماهه و شرایط اتریش
                </a>
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                >
                  ارزیابی پرونده اتریش
                </button>
                <a
                  href="https://wa.me/436889763256"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-300 px-4 py-2.5 text-xs font-bold"
                >
                  <span>واتساپ دفتر وین: +436889763256</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl aspect-[16/9] w-full">
                <img
                  src={AUSTRIA_IMAGES.hero.src}
                  srcSet={AUSTRIA_IMAGES.hero.srcSet}
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt={AUSTRIA_IMAGES.hero.alt}
                  width={AUSTRIA_IMAGES.hero.width}
                  height={AUSTRIA_IMAGES.hero.height}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-80" />
                <figcaption className="absolute bottom-3 right-3 left-3 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300">دفتر وین: منطقه ۲ Ausstellungsstraße</span>
                  <span className="text-[10px] text-slate-300">نظارت مستقیم وکلای اتریشی</span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* 4 个关键指标 */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-amber-300 font-bold">کف حقوق AMS ۲۰۲۶</span>
              <div className="text-xl font-black text-white mt-1">€۵۵,۶۷۸</div>
              <p className="text-[10px] text-slate-400 mt-0.5">ناخالص سالانه (۱۴ پرداخت)</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-emerald-300 font-bold">تبدیل به RWR Plus</span>
              <div className="text-xl font-black text-white mt-1">۲ سال</div>
              <p className="text-[10px] text-slate-400 mt-0.5">+ ۲۱ ماه اشتغال در ۲۴ ماه اخیر</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-sky-300 font-bold">پرداخت سالانه</span>
              <div className="text-xl font-black text-white mt-1">۱۴ حقوق</div>
              <p className="text-[10px] text-slate-400 mt-0.5">۲ پرداخت اضافی با مالیات ۶٪</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-purple-300 font-bold">سیستم امتیاز</span>
              <div className="text-xl font-black text-white mt-1">ندارد</div>
              <p className="text-[10px] text-slate-400 mt-0.5">بدون جدول AMS برای بلوکارت</p>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
          🧮 计算器 — 问句式标题 + Answer-First
          ============================================================ */}
      <section
        id="calculator"
        aria-labelledby="calculator-heading"
        className="py-14 container mx-auto px-4 md:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              شاخص‌های اداره کار اتریش (AMS)
            </span>
            <h2
              id="calculator-heading"
              className="text-2xl font-black text-white mt-2"
            >
              آیا حقوق پیشنهادی شما کف €۵۵,۶۷۸ بلوکارت اتریش ۲۰۲۶ را پوشش می‌دهد؟
            </h2>
            <p className="speakable-answer text-xs text-slate-300 mt-2 max-w-xl mx-auto">
              حقوق ناخالص سالانه خود را وارد کنید تا انطباق آن با آستانه قانونی €۵۵,۶۷۸ و معادل هر یک از ۱۴ پرداخت محاسبه شود.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-200">پیشنهاد حقوق ناخالص سالانه (۱۴ پرداخت):</span>
                  <span className="font-mono text-amber-400 font-black">
                    €{calcSalary.toLocaleString('de-DE')} / سال
                  </span>
                </div>
                <input
                  type="range"
                  min="40000"
                  max="120000"
                  step="1000"
                  value={calcSalary}
                  onChange={(e) => setCalcSalary(Number(e.target.value))}
                  className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  aria-label="حقوق ناخالص سالانه به یورو"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>€۴۰,۰۰۰</span>
                  <span className="text-amber-400 font-bold">کف €۵۵,۶۷۸</span>
                  <span>€۱۲۰,۰۰۰</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">
                  مدرک زبان آلمانی (برای ارزیابی شانس سفارت):
                </label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {[
                    { id: 'none', label: 'بدون مدرک' },
                    { id: 'a2', label: 'A2 آلمانی' },
                    { id: 'b1', label: 'B1' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setCalcGermanLevel(l.id as any)}
                      className={`py-2 px-1 rounded-xl font-bold transition border cursor-pointer ${
                        calcGermanLevel === l.id
                          ? 'bg-amber-400 text-[#082833] font-black border-amber-400'
                          : 'bg-black/30 text-slate-300 border-white/10'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c3847] to-[#08222b] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-amber-300">تحلیل حقوق اتریش</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    evaluationResult.meetsSalary
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {evaluationResult.meetsSalary ? 'واجد شرایط AMS' : 'کمتر از کف مصوب'}
                </span>
              </div>

              <div className="text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>حقوق هر یک از ۱۴ پرداخت:</span>
                  <span className="font-bold text-white font-mono">
                    ~€{evaluationResult.monthly14th.toLocaleString('de-DE')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>اختلاف با کف قانونی:</span>
                  <span
                    className={`font-bold font-mono ${
                      evaluationResult.diff >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {evaluationResult.diff >= 0 ? '+' : ''}
                    €{evaluationResult.diff.toLocaleString('de-DE')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>زمان تبدیل به RWR Plus:</span>
                  <span className="font-bold text-amber-300 font-mono">۲ سال (۲۴ ماه)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>شرط اشتغال RWR Plus:</span>
                  <span className="font-bold text-white">۲۱ ماه از ۲۴ ماه اخیر</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>تخمین شانس پرونده در وین:</span>
                  <span className="font-bold text-emerald-400">{evaluationResult.prob}٪</span>
                </div>
              </div>

              <p className="text-[10px] leading-5 text-slate-400 bg-black/20 rounded-xl p-2.5 border border-white/5">
                {evaluationResult.langNote}
              </p>

              <button
                type="button"
                onClick={onOpenAssessment}
                className="w-full rounded-xl bg-gradient-to-l from-amber-400 to-amber-500 py-3 text-xs font-black text-[#082833] shadow-glow hover:scale-[1.02] transition cursor-pointer"
              >
                بررسی جاب‌آفر اتریش توسط وکیل وین
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          📊 薪资对比表 — 真实 HTML 表格（AI Overviews 高复现率）
          ============================================================ */}
      <section
        aria-labelledby="salary-table-heading"
        className="py-14 bg-[#05171e] border-y border-white/10"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-sky-400">AuslBG § 12c</span>
            <h2
              id="salary-table-heading"
              className="text-xl sm:text-2xl font-black text-white mt-1"
            >
              مقایسه مسیرهای اقامت کاری اتریش در ۲۰۲۶
            </h2>
            <p className="speakable-answer text-xs text-slate-400 mt-1 max-w-xl mx-auto">
              بلوکارت اتریش بدون امتیازبندی و با کف حقوق €۵۵,۶۷۸ صادر می‌شود؛ RWR Card برای مشاغل کمبود نیرو و فارغ‌التحصیلان اتریش کاربرد دارد و RWR Plus مقصد نهایی با کار آزاد است.
            </p>
          </div>

          <figure className="mb-6 rounded-2xl overflow-hidden border border-white/10">
            <img
              src={AUSTRIA_IMAGES.salary.src}
              alt={AUSTRIA_IMAGES.salary.alt}
              width={AUSTRIA_IMAGES.salary.width}
              height={AUSTRIA_IMAGES.salary.height}
              loading="lazy"
              decoding="async"
              className="w-full h-48 sm:h-56 object-cover"
            />
            <figcaption className="bg-black/50 text-[10px] text-slate-400 px-3 py-1.5 text-left">
              محیط کار مدرن در وین — محل کار متخصصان دارای بلوکارت اتریش. عکس: Unsplash
            </figcaption>
          </figure>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs">
              <caption className="sr-only">
                مقایسه بلوکارت اتریش، RWR Card و RWR Plus در سال ۲۰۲۶
              </caption>
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.05] text-slate-300 font-bold">
                  <th scope="col" className="p-3.5">مسیر</th>
                  <th scope="col" className="p-3.5">حداقل حقوق سالانه</th>
                  <th scope="col" className="p-3.5">سیستم امتیاز</th>
                  <th scope="col" className="p-3.5">اجازه کار</th>
                  <th scope="col" className="p-3.5">مسیر تبدیل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/[0.03]">
                  <th scope="row" className="p-3.5 font-bold text-amber-300 text-right">
                    بلوکارت اتریش (EU Blue Card)
                  </th>
                  <td className="p-3.5 font-mono text-white font-bold">€۵۵,۶۷۸</td>
                  <td className="p-3.5 text-slate-400">ندارد</td>
                  <td className="p-3.5 text-slate-300">وابسته به کارفرمای اولیه</td>
                  <td className="p-3.5 text-emerald-400 font-bold">→ RWR Plus پس از ۲ سال</td>
                </tr>
                <tr className="hover:bg-white/[0.03]">
                  <th scope="row" className="p-3.5 font-bold text-sky-300 text-right">
                    RWR Card (مشاغل کمبود نیرو)
                  </th>
                  <td className="p-3.5 font-mono text-white font-bold">€۳,۴۶۵ / ماه</td>
                  <td className="p-3.5 text-amber-300 font-bold">جدول AMS</td>
                  <td className="p-3.5 text-slate-300">وابسته به کارفرما</td>
                  <td className="p-3.5 text-slate-400">→ RWR Plus پس از ۲ سال</td>
                </tr>
                <tr className="hover:bg-white/[0.03]">
                  <th scope="row" className="p-3.5 font-bold text-purple-300 text-right">
                    RWR Plus (مقصد نهایی)
                  </th>
                  <td className="p-3.5 font-mono text-white font-bold">—</td>
                  <td className="p-3.5 text-slate-400">—</td>
                  <td className="p-3.5 text-emerald-400 font-bold">آزاد در سراسر اتریش</td>
                  <td className="p-3.5 text-slate-400">تثبیت وضعیت</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================
          📋 文档清单 — 问句式 H2 + 图片
          ============================================================ */}
      <section
        aria-labelledby="documents-heading"
        className="py-14 container mx-auto px-4 md:px-8 max-w-4xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2
              id="documents-heading"
              className="text-xl sm:text-2xl font-black text-white"
            >
              برای بلوکارت اتریش چه مدارکی لازم است؟
            </h2>
            <p className="speakable-answer text-xs text-slate-400 mt-1">
              شش دسته مدرک الزامی است: قرارداد کار منطبق با کف حقوق، فرم Arbeitgebererklärung، مدرک دانشگاهی با Nostrifizierung، اجاره مسکن، بیمه درمانی و مدارک هویتی مترجم. موارد آماده‌شده را تیک بزنید.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-xs text-white transition cursor-pointer self-start"
          >
            {copiedChecklist ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copiedChecklist ? 'کپی شد!' : 'کپی مدارک'}</span>
          </button>
        </div>

        <figure className="mb-6 rounded-2xl overflow-hidden border border-white/10">
          <img
            src={AUSTRIA_IMAGES.documents.src}
            alt={AUSTRIA_IMAGES.documents.alt}
            width={AUSTRIA_IMAGES.documents.width}
            height={AUSTRIA_IMAGES.documents.height}
            loading="lazy"
            decoding="async"
            className="w-full h-48 sm:h-56 object-cover"
          />
          <figcaption className="bg-black/50 text-[10px] text-slate-400 px-3 py-1.5 text-left">
            مدارک و پاسپورت — آماده‌سازی چک‌لیست بلوکارت اتریش. عکس: Unsplash
          </figcaption>
        </figure>

        <div className="space-y-2.5">
          {DOCUMENTS_AUSTRIA.map((doc) => {
            const isChecked = !!checkedDocs[doc.id];
            return (
              <div
                key={doc.id}
                onClick={() => setCheckedDocs((p) => ({ ...p, [doc.id]: !p[doc.id] }))}
                className={`flex items-start gap-3 rounded-2xl border p-3.5 transition cursor-pointer ${
                  isChecked
                    ? 'border-emerald-500/50 bg-emerald-500/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
              >
                <div
                  className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border ${
                    isChecked ? 'border-emerald-500 bg-emerald-500 text-black' : 'border-slate-500'
                  }`}
                >
                  {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-bold ${
                        isChecked ? 'text-emerald-300 line-through' : 'text-white'
                      }`}
                    >
                      {doc.title}
                    </span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                        doc.required
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-slate-500/20 text-slate-300'
                      }`}
                    >
                      {doc.required ? 'الزامی' : 'اختیاری'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">{doc.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          ❓ FAQ — 问句式 H2 + Answer-First 折叠面板
          ============================================================ */}
      <section
        aria-labelledby="faq-heading"
        className="py-14 bg-[#05171e] border-t border-white/10"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2
            id="faq-heading"
            className="text-xl sm:text-2xl font-black text-white text-center mb-2"
          >
            سوالات متداول بلوکارت اتریش ۲۰۲۶
          </h2>
          <p className="speakable-answer text-xs text-slate-400 text-center mb-6 max-w-lg mx-auto">
            پاسخ‌های زیر بر اساس قوانین AuslBG و NAG و آستانه‌های اعلامی AMS برای سال ۲۰۲۶ تهیه شده‌اند.
          </p>

          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-3.5 text-right text-xs font-bold text-white hover:text-amber-300 transition cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-amber-400 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-3.5 pt-0 text-xs text-slate-300 border-t border-white/5 bg-black/20 text-justify leading-6">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          📄 页脚 — 图片版权 + 数据来源
          ============================================================ */}
      <footer className="border-t border-white/10 py-6 px-4 md:px-8">
        <div className="container mx-auto text-center text-[10px] text-slate-500 leading-5 max-w-3xl">
          <p>
            منابع رسمی: migration.gv.at (EU Blue Card 2026)، oesterreich.gv.at (RWR Plus)، AMS Austria.
            تصاویر از Unsplash تحت Unsplash License (قابل استفاده تجاری).
          </p>
          <p className="mt-1">
            © ۲۰۲۶ هلدینگ مهاجرتی دیاکو — دفتر وین: Ausstellungsstraße 50/2.OG, 1020 Wien
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AustriaBlueCardPage;