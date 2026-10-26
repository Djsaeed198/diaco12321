import OptimizedImage from '../OptimizedImage';
import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  ChevronDown,
  HelpCircle,
  PhoneCall,
  Check,
  Copy,
  Sparkles,
  Briefcase,
  Users,
  Compass,
  Building,
  ShieldCheck,
  Plane,
  Home,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (
    countryKey: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary'
  ) => void;
}

// ✅ حداقل حقوق رسمی OIF برای ۲۰۲۶ (منبع: OIF / Réti Várszegi)
const SALARY_THRESHOLDS_HUNGARY_2026 = {
  regularMonthlyHuf: 1_001_048,
  regularMonthlyEur: 2_565,
  regularAnnualEur: 30_780, // 2,565 × 12
  shortageMonthlyHuf: 800_838,
  shortageMonthlyEur: 2_050,
  shortageAnnualEur: 24_600,
  minWageMonthlyHuf: 322_800, // حداقل دستمزد عمومی ۲۰۲۶
  minWageMonthlyEur: 840,
  skilledMinWageMonthlyHuf: 373_200, // حداقل دستمزد مشاغل تخصصی
} as const;

// ✅ مالیات بر درآمد شخصی مجارستان در ۲۰۲۶: ۱۵٪ (نه ۹٪)
const HUNGARY_PIT_RATE_2026 = 15;
const HUNGARY_CORPORATE_TAX_RATE = 9;
const HUNGARY_VAT_RATE = 27;

export const HungaryBlueCardPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  // ==================== SEO + AIO ====================
  // تایتل ۵۳ کاراکتر / دیسکریپشن ۱۵۸ کاراکتر / تک H1 / اسکیما ترکیبی
  useSeo({
    title: 'بلوکارت مجارستان ۲۰۲۶ | حقوق ۱,۰۰۱,۰۴۸ فورینت و اقامت ۳ ساله',
    description:
      'راهنمای جامع بلوکارت مجارستان ۲۰۲۶ (EU Kék Kártya)؛ حداقل حقوق ماهانه ۱,۰۰۱,۰۴۸ فورینت (≈۲,۵۶۵ یورو)، مالیات بر درآمد ۱۵٪، مسیر اقامت دائم ۳ ساله، خانواده و مشاغل پرتقاضا. ارزیابی فوری.',
    canonical: '/guides/blue-card-hungary',
    ogType: 'article',
    ogImage: 'https://www.dia-co.ir/og-services-work.jpg',
    keywords: [
      'بلوکارت مجارستان ۲۰۲۶',
      'EU Kék Kártya Magyarország',
      'حداقل حقوق بلوکارت مجارستان ۲۰۲۶',
      'مالیات ۱۵ درصد مجارستان',
      'اقامت دائم مجارستان با بلوکارت',
      'هزینه زندگی بوداپست ۲۰۲۶',
      'مشاغل پرتقاضا مجارستان',
      'OIF بلوکارت',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/blue-card-hungary#article',
          headline:
            'راهنمای جامع بلوکارت مجارستان ۲۰۲۶: حداقل حقوق، مالیات ۱۵٪ و مسیر اقامت دائم',
          description:
            'بررسی کامل قوانین ۲۰۲۶ بلوکارت مجارستان شامل کف حقوق OIF (۱,۰۰۱,۰۴۸ فورینت)، مالیات بر درآمد ۱۵٪، مسیر ۳ ساله اقامت دائم، قوانین خانواده و مشاغل واجد شرایط.',
          image: [
            'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
          ],
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
          dateModified: '2026-10-23',
          inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'EU Blue Card' },
            { '@type': 'Thing', name: 'Hungary Immigration' },
          ],
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', '.speakable-summary', '.speakable-fact'],
          },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/blue-card-hungary#howto',
          name: 'مراحل دریافت بلوکارت مجارستان در ۲۰۲۶',
          description:
            'راهنمای گام‌به‌گام اخذ EU Kék Kártya از طریق OIF و سفارت مجارستان.',
          totalTime: 'P70D',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'عقد قرارداد شغلی واجد شرایط در مجارستان',
              text: 'قرارداد رسمی با کارفرمای مجارستانی با حداقل ۶ ماه مدت و حقوق ماهانه حداقل ۱,۰۰۱,۰۴۸ فورینت (یا ۸۰۰,۸۳۸ فورینت برای مشاغل کمبود نیرو).',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'ثبت درخواست در سامانه Enter Hungary یا OIF',
              text: 'بارگذاری مدارک از جمله پاسپورت، مدرک تحصیلی، قرارداد کار و بیمه درمانی در پلتفرم رسمی OIF.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'طی مراحل اداری و کارشناسی',
              text: 'اداره مهاجرت (OIF) ظرف ۲۱ روز نظر کارشناسی و حداکثر ۷۰ روز تصمیم نهایی را اعلام می‌کند.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'دریافت ویزای D و کارت اقامت EU Kék Kártya',
              text: 'پس از تأیید، ویزای D صادر شده و کارت فیزیکی بلوکارت با اعتبار اولیه تا ۳ سال (قابل تمدید) دریافت می‌شود.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/blue-card-hungary#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حداقل حقوق بلوکارت مجارستان در سال ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای مشاغل تخصصی عمومی، حداقل حقوق ماهانه ناخالص ۱,۰۰۱,۰۴۸ فورینت (حدود ۲,۵۶۵ یورو) است. برای مشاغل کمبود نیرو (عمدتاً حوزه سلامت)، این مبلغ به ۸۰۰,۸۳۸ فورینت (حدود ۲,۰۵۰ یورو) کاهش می‌یابد.',
              },
            },
            {
              '@type': 'Question',
              name: 'نرخ مالیات بر درآمد در مجارستان ۹٪ است یا ۱۵٪؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'مالیات بر درآمد شخصی (PIT) در مجارستان ۱۵٪ ثابت است. نرخ ۹٪ مربوط به مالیات شرکتی (Corporate Tax) است که پایین‌ترین در اتحادیه اروپا محسوب می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'با بلوکارت مجارستان چند ساله می‌توان اقامت دائم گرفت؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'پس از ۳ سال اقامت قانونی و مستمر با بلوکارت، امکان درخواست اقامت دائم ملی (Letelepedési engedély) وجود دارد. برای اقامت بلندمدت اتحادیه اروپا (EU Long-Term Residence) معمولاً ۵ سال اقامت لازم است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا همسر دارنده بلوکارت مجارستان حق کار دارد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، بر اساس دستورالعمل 2021/1883/EU، همسر دارنده بلوکارت مجارستان در زمان صدور مجوز اقامت، به‌طور همزمان حق دسترسی به بازار کار را دریافت می‌کند و می‌تواند در هر شغلی مشغول شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'هزینه زندگی در بوداپست در مقایسه با وین یا برلین چگونه است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'اجاره یک آپارتمان یک‌خوابه در مرکز بوداپست به‌طور میانگین حدود ۷۸۰ یورو در ماه است، در حالی که همین شاخص در وین حدود ۱,۱۳۵ یورو و در برلین به‌مراتب بالاتر است. هزینه کلی زندگی در بوداپست تقریباً ۳۰ تا ۵۰ درصد کمتر از پایتخت‌های اروپای غربی برآورد می‌شود.',
              },
            },
          ],
        },
      ],
    },
  });

  // ==================== STATE ====================
  const [calcSalaryEur, setCalcSalaryEur] = useState<number>(32000);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ==================== CALCULATOR ====================
  const evaluationResult = useMemo(() => {
    const annualThreshold =
      calcSalaryEur >= SALARY_THRESHOLDS_HUNGARY_2026.regularAnnualEur
        ? SALARY_THRESHOLDS_HUNGARY_2026.regularAnnualEur
        : SALARY_THRESHOLDS_HUNGARY_2026.shortageAnnualEur;

    const meetsRegular =
      calcSalaryEur >= SALARY_THRESHOLDS_HUNGARY_2026.regularAnnualEur;
    const meetsShortage =
      calcSalaryEur >= SALARY_THRESHOLDS_HUNGARY_2026.shortageAnnualEur;
    const meetsAny = meetsRegular || meetsShortage;

    const monthlyEur = Math.round(calcSalaryEur / 12);
    const monthlyHuf = Math.round((calcSalaryEur * 400) / 12); // نرخ تقریبی ۴۰۰ HUF/EUR
    const netMonthlyEur = Math.round(
      monthlyEur * (1 - HUNGARY_PIT_RATE_2026 / 100)
    );

    let prob = 45;
    if (meetsRegular) prob = 92;
    else if (meetsShortage) prob = 78;
    else prob = 35;

    return {
      meetsRegular,
      meetsShortage,
      meetsAny,
      monthlyEur,
      monthlyHuf,
      netMonthlyEur,
      prob,
      annualThreshold,
    };
  }, [calcSalaryEur]);

  // ==================== DOCUMENTS ====================
  const DOCUMENTS_HUNGARY = [
    {
      id: 'hu-doc-1',
      title:
        'قرارداد کاری معتبر با حداقل ۶ ماه مدت و حقوق ماهانه ≥ ۱,۰۰۱,۰۴۸ فورینت',
      desc: 'مشاغل کمبود نیرو (عمدتاً سلامت) با حداقل ۸۰۰,۸۳۸ فورینت نیز واجد شرایط هستند. حقوق باید در کل دوره اعتبار کارت حفظ شود.',
      required: true,
    },
    {
      id: 'hu-doc-2',
      title:
        'مدرک تحصیلی高等教育 (لیسانس یا بالاتر) یا حداقل ۵ سال تجربه حرفه‌ای سطح بالا',
      desc: 'ترجمه رسمی به انگلیسی یا مجاری از طریق دارالترجمه رسمی یا اداره OFFI بوداپست.',
      required: true,
    },
    {
      id: 'hu-doc-3',
      title:
        'تأییدیه اسکان و قرارداد اجاره مسکن در مجارستان (Szálláshely bejelentő lap)',
      desc: 'ثبت آدرس در سامانه ثبت اقامت OIF الزامی است.',
      required: true,
    },
    {
      id: 'hu-doc-4',
      title:
        'بیمه درمانی معتبر تا زمان ثبت در بیمه سلامت دولتی مجارستان (TAJ)',
      desc: 'پوشش درمانی باید در کل دوره بررسی پرونده و تا فعال‌سازی TAJ معتبر باشد.',
      required: true,
    },
    {
      id: 'hu-doc-5',
      title: 'گواهی عدم سوءپیشینه کیفری از کشور مبدأ (با Apostille یا تأییدیه سفارت)',
      desc: 'برای اکثر ملیت‌ها الزامی است و باید طبق قوانین بین‌المللی قانونی‌سازی شود.',
      required: true,
    },
  ];

  const handleCopy = () => {
    const text = DOCUMENTS_HUNGARY.map(
      (d, i) => `${i + 1}. ${d.title}\n   ${d.desc}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  // ==================== FAQS ====================
  const FAQS = [
    {
      q: 'حداقل حقوق بلوکارت مجارستان در سال ۲۰۲۶ چقدر است؟',
      a: 'برای مشاغل تخصصی عمومی، حداقل حقوق ماهانه ناخالص ۱,۰۰۱,۰۴۸ فورینت (حدود ۲,۵۶۵ یورو) است. برای مشاغل کمبود نیرو (عمدتاً حوزه سلامت)، این مبلغ ۸۰۰,۸۳۸ فورینت (حدود ۲,۰۵۰ یورو) است. این الزام برای تمام درخواست‌های صدور و تمدید که در سال ۲۰۲۶ تصمیم‌گیری می‌شوند، حتی اگر در ۲۰۲۵ ثبت شده باشند، اعمال می‌شود.',
    },
    {
      q: 'نرخ مالیات بر درآمد در مجارستان ۹٪ است یا ۱۵٪؟',
      a: 'مالیات بر درآمد شخصی (PIT) در مجارستان ۱۵٪ ثابت است و هیچ پله تصاعدی ندارد. نرخ ۹٪ مربوط به مالیات شرکتی (Corporate Tax) است که پایین‌ترین در اتحادیه اروپا محسوب می‌شود. مالیات بر ارزش افزوده (VAT) نیز ۲۷٪ است که بالاترین نرخ در اتحادیه اروپا به شمار می‌رود.',
    },
    {
      q: 'با بلوکارت مجارستان چند ساله می‌توان اقامت دائم گرفت؟',
      a: 'پس از ۳ سال اقامت قانونی و مستمر با بلوکارت، امکان درخواست اقامت دائم ملی (Letelepedési engedély) وجود دارد. برای اقامت بلندمدت اتحادیه اروپا (EU Long-Term Residence) معمولاً ۵ سال اقامت لازم است. کارت اقامت دائم معمولاً با اعتبار ۱۰ ساله صادر می‌شود.',
    },
    {
      q: 'آیا همسر و فرزندان دارنده بلوکارت مجارستان می‌توانند همراهی کنند؟',
      a: 'بله، خانواده درجه اول شامل همسر قانونی، فرزندان تحت تکفل و والدین تحت تکفل واجد شرایط هستند. بر اساس دستورالعمل 2021/1883/EU، همسر دارنده بلوکارت در زمان صدور مجوز اقامت، حق دسترسی فوری به بازار کار را دریافت می‌کند و می‌تواند در هر شغلی مشغول شود.',
    },
    {
      q: 'هزینه زندگی در بوداپست در مقایسه با وین یا برلین چگونه است؟',
      a: 'اجاره یک آپارتمان یک‌خوابه در مرکز بوداپست به‌طور میانگین حدود ۷۸۰ یورو در ماه است، در حالی که همین شاخص در وین حدود ۱,۱۳۵ یورو و در برلین به‌مراتب بالاتر است. هزینه کلی زندگی در بوداپست تقریباً ۳۰ تا ۵۰ درصد کمتر از پایتخت‌های اروپای غربی برآورد می‌شود. با حقوق خالص حدود ۲,۰۰۰ تا ۲,۵۰۰ یورو می‌توان در بوداپست زندگی راحتی داشت.',
    },
    {
      q: 'مشاغل پرتقاضا برای بلوکارت مجارستان در ۲۰۲۶ کدامند؟',
      a: 'بخش‌های IT و فناوری (توسعه‌دهندگان، متخصصان داده)، مهندسی (مکانیک، برق، صنایع)، خودروسازی و تولید، باتری و خودروهای برقی، و مراکز خدمات مشترک (SSC) با نقش‌های چندزبانه، از جمله حوزه‌هایی هستند که بیشترین تقاضا را برای نیروی کار ماهر خارجی دارند و اغلب با بلوکارت و به زبان انگلیسی قابل دسترسی هستند.',
    },
    {
      q: 'مدت زمان بررسی درخواست بلوکارت مجارستان چقدر است؟',
      a: 'اداره مهاجرت مجارستان (OIF) معمولاً ظرف ۲۱ روز نظر کارشناسی و حداکثر ۷۰ روز تصمیم نهایی را اعلام می‌کند. برای متقاضیانی که قبلاً بلوکارت کشور دیگری از اتحادیه اروپا را دارند، این مدت به ۳۰ روز کاهش می‌یابد.',
    },
  ];

  // ==================== RENDER ====================
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#081e26] text-slate-100 font-sans pb-20"
    >
      {/* ========== نوار بالایی مسیریابی و کشورها ========== */}
      <div className="bg-[#05171e] border-b border-white/10 py-3 px-4 md:px-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <button
              type="button"
              onClick={onBackToHome}
              className="text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <span>صفحه اصلی دیاکو</span>
            </button>
            <span>/</span>
            <span>بلو کارت اتحادیه اروپا</span>
            <span>/</span>
            <span className="text-white font-semibold">بلوکارت مجارستان ۲۰۲۶</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر کشورها:</span>
            {[
              { key: 'germany', label: '🇩🇪 آلمان' },
              { key: 'spain', label: '🇪🇸 اسپانیا' },
              { key: 'italy', label: '🇮🇹 ایتالیا' },
              { key: 'austria', label: '🇦🇹 اتریش' },
              { key: 'hungary', label: '🇭🇺 مجارستان (صفحه فعلی)', active: true },
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
      </div>

      {/* ========== هیرو ========== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b2933] via-[#08222b] to-[#081e26] pt-10 pb-16 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-7 text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold text-sky-300">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                <span>دپارتمان مجارستان و اروپای مرکزی — هلدینگ دیاکو</span>
                <span className="text-white/40">|</span>
                <span className="text-amber-300">حقوق ۱,۰۰۱,۰۴۸ فورینت</span>
              </div>

              {/* تک H1 */}
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                بلوکارت مجارستان ۲۰۲۶
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-sky-300 via-amber-300 to-yellow-400">
                  EU Kék Kártya Magyarország
                </span>
              </h1>

              <p className="speakable-summary mt-4 text-xs sm:text-sm leading-7 text-slate-300 font-medium text-justify">
                مقرون‌به‌صرفه‌ترین مسیر ورود به حوزه شینگن برای متخصصان؛ با
                حداقل حقوق ماهانه{' '}
                <strong className="text-amber-300">۱,۰۰۱,۰۴۸ فورینت</strong>{' '}
                (حدود ۲,۵۶۵ یورو)، مالیات بر درآمد شخصی{' '}
                <strong className="text-amber-300">۱۵٪</strong>، امکان دریافت
                اقامت دائم پس از{' '}
                <strong className="text-amber-300">۳ سال</strong>، و آزادی سفر
                به ۲۹ کشور عضو شینگن.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-5 py-2.5 text-xs font-black text-[#082833] shadow-glow hover:scale-105 transition cursor-pointer"
                >
                  محاسبه‌گر حقوق فورینت و یورو ۲۰۲۶
                </a>
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                >
                  ارزیابی آنلاین شانس ویزا
                </button>
                <a
                  href="tel:02191693955"
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-sky-400/30 bg-sky-500/15 text-sky-300 px-4 py-2.5 text-xs font-bold"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>تماس: 02191693955</span>
                </a>
              </div>
            </div>

            {/* تصویر ویژه هیرو — بوداپست */}
            <div className="lg:col-span-5">
              <figure className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl aspect-[16/9] w-full">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="نمای بوداپست مجارستان در غروب — مقصد بلوکارت اتحادیه اروپا و مهاجرت کاری ۲۰۲۶"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-80" />
                <figcaption className="absolute bottom-3 right-3 left-3 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-sky-300">
                    بوداپست؛ قطب فناوری و خدمات مشترک اروپای مرکزی
                  </span>
                  <span className="text-[10px] text-slate-300">
                    هزینه زندگی ۳۰–۵۰٪ کمتر از اروپای غربی
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* کارت‌های آمار کلیدی */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-amber-300 font-bold">
                حداقل حقوق ۲۰۲۶
              </span>
              <div className="text-xl font-black text-white mt-1">
                ۱,۰۰۱,۰۴۸ HUF
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                ≈ ۲,۵۶۵ یورو در ماه (ناخالص)
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-emerald-300 font-bold">
                مالیات بر درآمد شخصی
              </span>
              <div className="text-xl font-black text-white mt-1">۱۵٪</div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                نرخ ثابت (مالیات شرکتی: ۹٪)
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-sky-300 font-bold">
                مسیر اقامت دائم
              </span>
              <div className="text-xl font-black text-white mt-1">۳ سال</div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                اقامت ملی (EU Long-Term: ۵ سال)
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-purple-300 font-bold">
                منطقه شینگن
              </span>
              <div className="text-xl font-black text-white mt-1">۲۹ کشور</div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                سفر آزاد بدون نیاز به ویزا
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== محاسبه‌گر ========== */}
      <section id="calculator" className="py-14 container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-sky-300 bg-sky-400/10 px-3 py-1 rounded-full border border-sky-400/20">
              شاخص‌های اداره مهاجرت بوداپست (OIF) — ۲۰۲۶
            </span>
            <h2 className="text-2xl font-black text-white mt-2">
              محاسبه‌گر حقوق یورویی و فورینتی بلوکارت مجارستان
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-200">
                    پیشنهاد حقوق سالانه ناخالص:
                  </span>
                  <span className="font-mono text-sky-300 font-black">
                    {calcSalaryEur.toLocaleString('fa-IR')} یورو / سال
                  </span>
                </div>
                <input
                  type="range"
                  min={24000}
                  max={80000}
                  step={1000}
                  value={calcSalaryEur}
                  onChange={(e) => setCalcSalaryEur(Number(e.target.value))}
                  className="w-full accent-sky-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>۲۴,۰۰۰ €</span>
                  <span className="text-amber-400 font-bold">
                    کف ۳۰,۷۸۰ € (۱,۰۰۱,۰۴۸ HUF/ماه)
                  </span>
                  <span>۸۰,۰۰۰ €</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c3847] to-[#08222b] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-sky-300">
                  تحلیل حقوق ۲۰۲۶
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    evaluationResult.meetsRegular
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : evaluationResult.meetsShortage
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {evaluationResult.meetsRegular
                    ? 'واجد شرایط استاندارد OIF'
                    : evaluationResult.meetsShortage
                    ? 'واجد شرایط مشاغل کمبود نیرو'
                    : 'کمتر از کف قانونی'}
                </span>
              </div>

              <div className="text-xs space-y-2.5">
                <div className="flex justify-between text-slate-300">
                  <span>حقوق ماهانه ناخالص:</span>
                  <span className="font-bold text-white font-mono">
                    ~{evaluationResult.monthlyEur.toLocaleString('fa-IR')} € (
                    {evaluationResult.monthlyHuf.toLocaleString('fa-IR')} HUF)
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>تخمین حقوق خالص ماهانه (پس از ۱۵٪):</span>
                  <span className="font-bold text-emerald-300 font-mono">
                    ~{evaluationResult.netMonthlyEur.toLocaleString('fa-IR')} €
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>تخمین شانس قبولی پرونده:</span>
                  <span className="font-bold text-sky-400">
                    {evaluationResult.prob}٪
                  </span>
                </div>
              </div>

              {!evaluationResult.meetsAny && (
                <div className="flex items-start gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-[10px] text-amber-200">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>
                    حقوق پیشنهادی کمتر از کف ۲۰۲۶ است. گزینه‌هایی مانند مجوز
                    Hungary Card یا جاب‌آفر در مشاغل کمبود نیرو را بررسی کنید.
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={onOpenAssessment}
                className="w-full rounded-xl bg-gradient-to-l from-sky-400 to-teal-500 py-3 text-xs font-black text-[#082833] shadow-glow hover:scale-[1.02] transition cursor-pointer"
              >
                بررسی جاب‌آفر مجارستان توسط وکیل دیاکو
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== مقاله غنی: مسیر اقامت، خانواده، مشاغل، هزینه زندگی ========== */}
      <section className="py-14 bg-[#05171e] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-2xl font-black text-white text-center mb-2">
            هر آنچه باید درباره بلوکارت مجارستان ۲۰۲۶ بدانید
          </h2>
          <p className="text-center text-xs text-slate-400 mb-10 max-w-2xl mx-auto">
            تحلیل عمیق قوانین OIF، مسیر اقامت دائم، همراهی خانواده، مشاغل
            پرتقاضا و مقایسه هزینه زندگی با پایتخت‌های اروپای غربی.
          </p>

          <div className="space-y-10">
            {/* بخش ۱ — مسیر اقامت دائم */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۱. از بلوکارت تا اقامت دائم: مسیر ۳ ساله و ۵ ساله
                </h3>
              </div>
              <p className="speakable-fact text-xs leading-7 text-slate-300 text-justify">
                بر اساس قوانین مهاجرت مجارستان در ۲۰۲۶، دارندگان بلوکارت
                اتحادیه اروپا (EU Kék Kártya) می‌توانند پس از{' '}
                <strong className="text-amber-300">
                  ۳ سال اقامت قانونی و مستمر
                </strong>{' '}
                درخواست اقامت دائم ملی (Letelepedési engedély) ارائه دهند.
                این در حالی است که مسیر استاندارد برای سایر مجوزهای اقامتی
                معمولاً ۸ سال است. برای دریافت وضعیت{' '}
                <strong>اقامت بلندمدت اتحادیه اروپا (EU Long-Term Residence)</strong>{' '}
                معمولاً ۵ سال اقامت نیاز است. کارت اقامت دائم ملی با اعتبار
                ۱۰ ساله صادر می‌شود و نیاز به تمدید مکرر را از بین می‌برد.
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3 text-center text-[11px]">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <div className="font-black text-emerald-300">۳ سال</div>
                  <div className="text-slate-400 mt-0.5">
                    اقامت دائم ملی
                  </div>
                </div>
                <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3">
                  <div className="font-black text-sky-300">۵ سال</div>
                  <div className="text-slate-400 mt-0.5">
                    اقامت بلندمدت اتحادیه اروپا
                  </div>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                  <div className="font-black text-amber-300">۸ سال</div>
                  <div className="text-slate-400 mt-0.5">
                    مسیر استاندارد سایر مجوزها
                  </div>
                </div>
              </div>
            </article>

            {/* بخش ۲ — خانواده */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-black text-white">
                  ۲. همراهی خانواده و حق کار فوری همسر
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                یکی از مهم‌ترین مزایای بلوکارت مجارستان برای متقاضیان ایرانی و
                سایر اتباع کشورهای ثالث، قوانین مساعد خانواده است. بر اساس
                دستورالعمل <strong>2021/1883/EU</strong> و قانون مهاجرت
                مجارستان (Immigration Act 2023)، همسر دارنده بلوکارت{' '}
                <strong className="text-emerald-300">
                  در زمان صدور مجوز اقامت، به‌طور همزمان حق دسترسی به بازار
                  کار را دریافت می‌کند
                </strong>{' '}
                و می‌تواند در هر شغلی و در هر صنعتی مشغول به کار شود. فرزندان
                تحت تکفل نیز می‌توانند همراهی کرده و در مدارس مجارستان ثبت‌نام
                کنند. والدین تحت تکفل نیز در صورت اثبات وابستگی مالی، واجد
                شرایط الحاق خانواده هستند.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'همسر: حق کار فوری',
                  'فرزندان: تحصیل رایگان',
                  'والدین تحت تکفل: واجد شرایط',
                  'اقامت تا ۴ سال (متناسب با بلوکارت)',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-[10px] font-bold text-purple-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {/* بخش ۳ — مشاغل پرتقاضا */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  ۳. مشاغل پرتقاضا و واجد شرایط بلوکارت در ۲۰۲۶
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                بازار کار مجارستان در سال ۲۰۲۶ به‌ویژه در بخش‌های فناوری،
                مهندسی و تولید خودروهای الکتریکی رشد چشمگیری داشته است.
                بسیاری از این موقعیت‌ها به زبان انگلیسی قابل دسترسی هستند و
                مسیر بلوکارت برای آن‌ها هموار است.
              </p>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {[
                  {
                    title: 'IT و فناوری',
                    roles: 'توسعه‌دهنده نرم‌افزار، مهندس داده، متخصص DevOps',
                  },
                  {
                    title: 'مهندسی',
                    roles: 'مکانیک، برق، صنایع، خودرو',
                  },
                  {
                    title: 'باتری و خودروهای برقی',
                    roles: 'مهندس باتری، متخصص تولید، کنترل کیفیت',
                  },
                  {
                    title: 'مراکز خدمات مشترک (SSC)',
                    roles: 'متخصصان چندزبانه مالی، پشتیبانی، منابع انسانی',
                  },
                ].map((sector) => (
                  <div
                    key={sector.title}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <div className="text-[11px] font-black text-sky-300">
                      {sector.title}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-5">
                      {sector.roles}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] text-amber-200/80 leading-6">
                💡 برای مشاغلی که به کف حقوق استاندارد نمی‌رسند اما همچنان
                تخصصی هستند، مسیر جایگزین{' '}
                <strong>Hungary Card (مجوز واحد اشتغال و اقامت)</strong> قابل
                بررسی است.
              </p>
            </article>

            {/* بخش ۴ — هزینه زندگی */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-white">
                  ۴. هزینه زندگی در بوداپست در مقایسه با وین و برلین (۲۰۲۶)
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                بوداپست همچنان یکی از مقرون‌به‌صرفه‌ترین پایتخت‌های اتحادیه
                اروپا برای مهاجران کاری است. بر اساس داده‌های ۲۰۲۶، اجاره
                یک آپارتمان یک‌خوابه در مرکز بوداپست به‌طور میانگین حدود{' '}
                <strong className="text-amber-300">۷۸۰ یورو</strong> در ماه
                است، در حالی که همین شاخص در وین حدود{' '}
                <strong>۱,۱۳۵ یورو</strong> و در برلین به‌مراتب بالاتر گزارش
                می‌شود. اجاره یک آپارتمان سه‌خوابه در مرکز بوداپست حدود{' '}
                <strong>۱,۳۰۰ دلار</strong> است، در حالی که برلین و مونیخ
                ارقامی تا ۲,۷۰۰ و ۳,۴۰۰ دلار را تجربه می‌کنند.
              </p>

              {/* تصویر ویژه مقایسه هزینه زندگی */}
              <figure className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 800px"
                  alt="مقایسه هزینه زندگی و اجاره مسکن در بوداپست مجارستان با وین و برلین در سال ۲۰۲۶"
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-full object-cover sm:h-56"
                />
                <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                  بوداپست؛ اجاره یک‌خوابه مرکز شهر ≈ ۷۸۰ € در مقابل وین ≈
                  ۱,۱۳۵ € (منبع: Wise / Numbeo ۲۰۲۶)
                </figcaption>
              </figure>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                  <div className="font-black text-amber-300">بوداپست</div>
                  <div className="text-slate-400 mt-0.5">≈ ۷۸۰ € / ماه</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="font-black text-slate-200">وین</div>
                  <div className="text-slate-400 mt-0.5">≈ ۱,۱۳۵ € / ماه</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="font-black text-slate-200">برلین</div>
                  <div className="text-slate-400 mt-0.5">بالاتر از ۱,۵۰۰ €</div>
                </div>
              </div>
            </article>

            {/* بخش ۵ — هشدار حقوق ۲۰۲۶ */}
            <article className="rounded-3xl border border-amber-500/25 bg-amber-500/[0.06] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-black text-amber-200">
                  نکته حیاتی: افزایش حقوق ۲۰۲۶ و تمدیدهای در جریان
                </h3>
              </div>
              <p className="text-xs leading-7 text-amber-100/85 text-justify">
                کف حقوق بلوکارت مجارستان در سال ۲۰۲۶ نسبت به سال قبل رشد
                قابل‌توجهی داشته و به{' '}
                <strong>۱,۰۰۱,۰۴۸ فورینت در ماه</strong> رسیده است. نکته
                بسیار مهم برای متقاضیانی که پرونده آن‌ها در ۲۰۲۵ ثبت شده اما
                تصمیم‌گیری آن به ۲۰۲۶ موکول شده این است که{' '}
                <strong>
                  الزامات حقوقی جدید بر تمام پرونده‌های صدور و تمدید که در
                  ۲۰۲۶ رأی می‌گیرند اعمال می‌شود
                </strong>
                ، حتی اگر درخواست در سال قبل ارائه شده باشد. بنابراین پیش از
                هر اقدام، وضعیت حقوق پیشنهادی خود را با وکیل مهاجرتی دیاکو
                بررسی کنید.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ========== چک‌لیست مدارک ========== */}
      <section className="py-14 container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-black text-white">
              چک‌لیست مدارک بلوکارت مجارستان ۲۰۲۶
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              تیک بزنید تا وضعیت آماده‌سازی بررسی گردد.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-xs text-white transition cursor-pointer"
          >
            {copiedChecklist ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span>{copiedChecklist ? 'کپی شد!' : 'کپی مدارک'}</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {DOCUMENTS_HUNGARY.map((doc) => {
            const isChecked = !!checkedDocs[doc.id];
            return (
              <div
                key={doc.id}
                onClick={() =>
                  setCheckedDocs((p) => ({ ...p, [doc.id]: !p[doc.id] }))
                }
                className={`flex items-start gap-3 rounded-2xl border p-3.5 transition cursor-pointer ${
                  isChecked
                    ? 'border-emerald-500/50 bg-emerald-500/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
              >
                <div
                  className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-500 text-black'
                      : 'border-slate-500'
                  }`}
                >
                  {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <div>
                  <span
                    className={`text-xs font-bold ${
                      isChecked
                        ? 'text-emerald-300 line-through'
                        : 'text-white'
                    }`}
                  >
                    {doc.title}
                  </span>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {doc.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========== سوالات متداول ========== */}
      <section className="py-14 bg-[#05171e] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="text-xl font-black text-white text-center mb-6">
            پرسش‌های متداول بلوکارت مجارستان ۲۰۲۶
          </h2>
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
                    className="w-full flex items-center justify-between p-3.5 text-right text-xs font-bold text-white hover:text-sky-300 transition cursor-pointer gap-3"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-sky-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-3.5 pt-0 text-xs text-slate-300 border-t border-white/5 bg-black/20 text-justify leading-7">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CTA پایانی ========== */}
      <section className="py-14 container mx-auto px-4 md:px-8 max-w-3xl text-center">
        <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-3" />
        <h2 className="text-xl font-black text-white">
          آماده شروع مسیر بلوکارت مجارستان هستید؟
        </h2>
        <p className="mt-2 text-xs text-slate-400 max-w-xl mx-auto leading-6">
          تیم دپارتمان مجارستان هلدینگ دیاکو با تسلط بر قوانین OIF ۲۰۲۶،
          پرونده شما را از مرحله جاب‌آفر تا دریافت کارت فیزیکی همراهی می‌کند.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onOpenAssessment}
            className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3 text-xs font-black text-[#082833] shadow-glow hover:scale-105 transition cursor-pointer"
          >
            ارزیابی رایگان شانس بلوکارت
          </button>
          <a
            href="tel:02191693955"
            className="inline-flex items-center gap-1.5 rounded-2xl border border-sky-400/30 bg-sky-500/15 text-sky-300 px-5 py-3 text-xs font-bold"
          >
            <PhoneCall className="h-4 w-4" />
            <span>۰۲۱-۹۱۶۹۳۹۵۵</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HungaryBlueCardPage;