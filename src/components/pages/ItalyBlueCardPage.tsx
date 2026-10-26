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
  GraduationCap,
  Timer,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (
    countryKey: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary'
  ) => void;
}

// ✅ کف حقوق رسمی ۲۰۲۶ (ISTAT) — منبع: Mazzeschi / Ministero dell'Interno
const SALARY_THRESHOLDS_ITALY_2026 = {
  standardAnnual: 36_300,
  standardMonthly: 3_025,
  shortageAnnual: 29_000, // ICT، سلامت و مهندسی
  shortageMonthly: 2_417,
} as const;

export const ItalyBlueCardPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  // ==================== SEO + AIO ====================
  useSeo({
    title: 'بلوکارت ایتالیا ۲۰۲۶ | حقوق ۳۶,۳۰۰ € و اقامت ۳۰ روزه',
    description:
      'راهنمای رسمی بلوکارت ایتالیا ۲۰۲۶ (Carta Blu UE)؛ کف حقوق ۳۶,۳۰۰ € (مشاغل کمبود نیرو ۲۹,۰۰۰ €)، تأیید Nulla Osta در ۳۰ روز، معافیت کامل از Decreto Flussi، CIMEA و اقامت بلندمدت ۵ ساله. ارزیابی فوری.',
    canonical: '/guides/blue-card-italy',
    ogType: 'article',
    ogImage: 'https://www.dia-co.ir/og-services-work.jpg',
    keywords: [
      'بلوکارت ایتالیا ۲۰۲۶',
      'Carta Blu UE Italia 2026',
      'حداقل حقوق بلوکارت ایتالیا',
      'Nulla Osta 30 روز',
      'معافیت Decreto Flussi',
      'CIMEA vs DOV',
      'اقامت بلندمدت ایتالیا با بلوکارت',
      'مشاغل کمبود نیرو ایتالیا',
      'وکیل مهاجرت میلان و رم',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/blue-card-italy#article',
          headline:
            'راهنمای جامع بلوکارت ایتالیا ۲۰۲۶: حقوق ۳۶,۳۰۰ €، Nulla Osta ۳۰ روزه و مسیر اقامت بلندمدت',
          description:
            'بررسی کامل قوانین ۲۰۲۶ Carta Blu UE شامل کف حقوق استاندارد و کمبود نیرو، فرآیند دیجیتال Nulla Osta، CIMEA به‌جای DOV، حقوق خانواده و اقامت بلندمدت ۵ ساله.',
          image: [
            'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80',
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
            { '@type': 'Thing', name: 'Italy Immigration' },
            { '@type': 'Thing', name: 'Carta Blu UE' },
          ],
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: [
              'h1',
              '.speakable-summary',
              '.speakable-salary',
              '.speakable-answer',
            ],
          },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/blue-card-italy#howto',
          name: 'مراحل دریافت بلوکارت ایتالیا در ۲۰۲۶',
          description:
            'راهنمای گام‌به‌گام Carta Blu UE از Nulla Osta تا Permesso di Soggiorno.',
          totalTime: 'P45D',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'دریافت ارزشیابی تحصیلی CIMEA یا DOV',
              text: 'CIMEA به‌صورت دیجیتال و سریع‌تر از DOV کنسولی عمل می‌کند. برای مهندسان و متخصصان IT، ۳ سال تجربه مرتبط در ۷ سال گذشته نیز کافی است.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'درخواست Nulla Osta توسط کارفرما در Sportello Unico',
              text: 'کارفرمای ایتالیایی از طریق پورتال وزارت کشور درخواست را ثبت می‌کند. مهلت قانونی تصمیم‌گیری ۳۰ روز از تاریخ ثبت است.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'دریافت ویزای D از کنسولگری ایتالیا',
              text: 'پس از تأیید Nulla Osta، متقاضی ویزای نوع D (اقامت طولانی) را از سفارت یا کنسولگری ایتالیا در کشور مبدأ دریافت می‌کند.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'ثبت قرارداد اقامت و درخواست Permesso di Soggiorno در Questura',
              text: 'ورود به ایتالیا و ظرف ۸ روز کاری، امضای قرارداد اقامت (contratto di soggiorno) و ثبت درخواست کارت اقامت Carta Blu UE.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/blue-card-italy#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حداقل حقوق بلوکارت ایتالیا در سال ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای مسیر استاندارد، حداقل حقوق ناخالص سالانه ۳۶,۳۰۰ یورو (حدود ۳,۰۲۵ یورو در ماه) است که بر اساس میانگین حقوق ISTAT و ضریب ۱.۵ برابر تعیین می‌شود. برای مشاغل کمبود نیرو مانند ICT و سلامت، این مبلغ به حدود ۲۹,۰۰۰ یورو در سال (≈۲,۴۱۷ یورو در ماه) کاهش می‌یابد. همچنین حقوق پیشنهادی نباید کمتر از حداقل تعیین‌شده در قرارداد جمعی ملی (CCNL) مربوطه باشد.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا بلوکارت ایتالیا مشمول سهمیه Decreto Flussi است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. بلوکارت ایتالیا (Carta Blu UE) به‌طور کامل خارج از سهمیه‌بندی سالانه Decreto Flussi قرار دارد. نه Click Day وجود دارد و نه سقف ظرفیت؛ کارفرما می‌تواند در هر روز از سال درخواست Nulla Osta را ثبت کند.',
              },
            },
            {
              '@type': 'Question',
              name: 'مدت زمان صدور Nulla Osta در ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بر اساس اصلاحات قانون ۱۸۲/۲۰۲۵، Sportello Unico per l’Immigrazione موظف است ظرف ۳۰ روز از تاریخ ثبت درخواست، تصمیم خود را درباره Nulla Osta اعلام کند. این مدت قبلاً ۹۰ روز بود و در ۲۰۲۶ به ۳۰ روز کاهش یافته است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا همسر دارنده بلوکارت ایتالیا حق کار دارد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. بر اساس قوانین الحاق خانواده ایتالیا، همسر و فرزندان تحت تکفل دارنده بلوکارت می‌توانند همراهی کنند و همسر مجوز اقامت با حق کار کامل در تمام زمینه‌ها را دریافت می‌کند. این حق از زمان صدور مجوز اقامت خانوادگی فعال است.',
              },
            },
            {
              '@type': 'Question',
              name: 'با بلوکارت ایتالیا چند ساله می‌توان اقامت بلندمدت گرفت؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'دارندگان بلوکارت از مسیر تسهیل‌شده‌ای برای اقامت بلندمدت اتحادیه اروپا (Permesso di Soggiorno UE per soggiornanti di lungo periodo) بهره‌مند می‌شوند. شرط اصلی، ۵ سال اقامت قانونی در اتحادیه اروپا است که حداقل ۲ سال از آن باید در ایتالیا سپری شده باشد. این مجوز ۱۰ ساله و قابل تمدید است.',
              },
            },
            {
              '@type': 'Question',
              name: 'تفاوت CIMEA و DOV برای بلوکارت ایتالیا چیست؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'DOV (Dichiarazione di Valore) توسط کنسولگری ایتالیا در کشور مبدأ صادر می‌شود و فرآیندی سنتی و گاه زمان‌بر دارد. CIMEA یک مرکز دیجیتال است که گواهی comparability و verification صادر می‌کند و به‌عنوان جایگزین سریع‌تر DOV در رویه‌های اداری ایتالیا، از جمله بلوکارت، پذیرفته می‌شود.',
              },
            },
          ],
        },
      ],
    },
  });

  // ==================== STATE ====================
  const [calcSalary, setCalcSalary] = useState<number>(38000);
  const [calcCimeaStatus, setCalcCimeaStatus] = useState<
    'yes' | 'in_progress' | 'no'
  >('yes');
  const [calcSector, setCalcSector] = useState<'standard' | 'shortage'>(
    'standard'
  );
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ==================== CALCULATOR ====================
  const evaluationResult = useMemo(() => {
    const threshold =
      calcSector === 'shortage'
        ? SALARY_THRESHOLDS_ITALY_2026.shortageAnnual
        : SALARY_THRESHOLDS_ITALY_2026.standardAnnual;

    const meetsSalary = calcSalary >= threshold;
    const diff = calcSalary - threshold;
    const monthly = Math.round(calcSalary / 12);

    let prob = 40;
    if (meetsSalary) prob += 40;
    if (calcCimeaStatus === 'yes') prob += 15;
    else if (calcCimeaStatus === 'in_progress') prob += 8;
    if (prob > 98) prob = 98;

    return {
      threshold,
      meetsSalary,
      diff,
      monthly,
      prob,
      shortfall: !meetsSalary ? threshold - calcSalary : 0,
    };
  }, [calcSalary, calcCimeaStatus, calcSector]);

  // ==================== DOCUMENTS ====================
  const DOCUMENTS_ITALY = [
    {
      id: 'it-doc-1',
      title:
        'پیش‌قرارداد یا پیشنهاد شغلی الزام‌آور با حداقل ۶ ماه مدت (Proposta di Contratto)',
      desc: 'امضاشده توسط متقاضی و نماینده قانونی کارفرما با امضای دیجیتال معتبر؛ حقوق ناخالص سالانه ≥ ۳۶,۳۰۰ € (یا ≥ ۲۹,۰۰۰ € برای بخش‌های کمبود نیرو) و مطابق با CCNL مربوطه.',
      required: true,
    },
    {
      id: 'it-doc-2',
      title: 'Nulla Osta al Lavoro صادره از Sportello Unico per l’Immigrazione',
      desc: 'درخواست توسط کارفرما از طریق پورتال وزارت کشور ثبت می‌شود؛ مهلت تصمیم‌گیری ۳۰ روز از تاریخ ثبت.',
      required: true,
    },
    {
      id: 'it-doc-3',
      title: 'گواهی ارزشیابی تحصیلی CIMEA (Statement of Comparability) یا DOV',
      desc: 'CIMEA گزینه دیجیتال و سریع‌تر است. برای متخصصان با تجربه، ۵ سال تجربه حرفه‌ای یا ۳ سال تجربه ICT در ۷ سال گذشته می‌تواند جایگزین مدرک دانشگاهی شود.',
      required: true,
    },
    {
      id: 'it-doc-4',
      title: 'مدارک اسکان و گواهی مناسب بودن محل اقامت (Idoneità Alloggiativa)',
      desc: 'برای ثبت قرارداد اقامت در Questura و امضای contratto di soggiorno الزامی است. اطلاعات کامل ملک (از جمله مشخصات کاداستر) باید در سامانه درج شود.',
      required: true,
    },
    {
      id: 'it-doc-5',
      title: 'گواهی عدم سوءپیشینه کیفری با تأییدیه کنسولی یا Apostille',
      desc: 'برای اکثر ملیت‌ها الزامی است و باید طبق قوانین بین‌المللی قانونی‌سازی شود.',
      required: true,
    },
  ];

  const handleCopy = () => {
    const text = DOCUMENTS_ITALY.map(
      (d, i) => `${i + 1}. ${d.title}\n   ${d.desc}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  // ==================== FAQS ====================
  const FAQS = [
    {
      q: 'حداقل حقوق بلوکارت ایتالیا در سال ۲۰۲۶ چقدر است؟',
      a: 'برای مسیر استاندارد، حداقل حقوق ناخالص سالانه ۳۶,۳۰۰ یورو (حدود ۳,۰۲۵ یورو در ماه) است. برای مشاغل کمبود نیرو مانند ICT و سلامت، این مبلغ به حدود ۲۹,۰۰۰ یورو در سال (≈۲,۴۱۷ یورو در ماه) کاهش می‌یابد. حقوق پیشنهادی همچنین نباید کمتر از حداقل تعیین‌شده در قرارداد جمعی ملی (CCNL) مربوطه باشد و بالاترین رقم اعمال می‌شود.',
    },
    {
      q: 'آیا بلوکارت ایتالیا مشمول سهمیه Decreto Flussi است؟',
      a: 'خیر. Carta Blu UE کاملاً خارج از سهمیه‌بندی سالانه Decreto Flussi قرار دارد. نه Click Day وجود دارد و نه سقف ظرفیت؛ کارفرما می‌تواند در هر روز از سال درخواست Nulla Osta را ثبت کند. این مهم‌ترین مزیت بلوکارت نسبت به ویزای کاری معمولی است.',
    },
    {
      q: 'مدت زمان صدور Nulla Osta در ۲۰۲۶ چقدر است؟',
      a: 'بر اساس اصلاحات قانون ۱۸۲/۲۰۲۵، Sportello Unico per l’Immigrazione موظف است ظرف ۳۰ روز از تاریخ ثبت درخواست، تصمیم خود را درباره Nulla Osta اعلام کند. این مدت قبلاً ۹۰ روز بود و کاهش آن به ۳۰ روز، برنامه‌ریزی استخدام را برای کارفرمایان ایتالیایی بسیار واقعی‌تر کرده است.',
    },
    {
      q: 'آیا همسر دارنده بلوکارت ایتالیا حق کار دارد؟',
      a: 'بله. همسر و فرزندان تحت تکفل دارنده بلوکارت می‌توانند از طریق الحاق خانواده همراهی کنند. همسر مجوز اقامت با حق کار کامل در تمام زمینه‌ها را دریافت می‌کند و این حق از زمان صدور مجوز اقامت خانوادگی فعال است. اعضای خانواده نیز پس از ۵ سال اقامت قانونی در اتحادیه اروپا (شامل ۲ سال در ایتالیا) می‌توانند برای اقامت بلندمدت اقدام کنند.',
    },
    {
      q: 'با بلوکارت ایتالیا چند ساله می‌توان اقامت بلندمدت گرفت؟',
      a: 'دارندگان بلوکارت از مسیر تسهیل‌شده‌ای برای اقامت بلندمدت اتحادیه اروپا بهره‌مند می‌شوند. شرط اصلی، ۵ سال اقامت قانونی در اتحادیه اروپا است که حداقل ۲ سال از آن باید در ایتالیا سپری شده باشد. این مجوز ۱۰ ساله و قابل تمدید است و دارندگان بلوکارت از شرایط مساعدتری نسبت به سایر اتباع کشورهای ثالث برخوردارند.',
    },
    {
      q: 'تفاوت CIMEA و DOV برای بلوکارت ایتالیا چیست؟',
      a: 'DOV (Dichiarazione di Valore) توسط کنسولگری ایتالیا در کشور مبدأ صادر می‌شود و فرآیندی سنتی و گاه زمان‌بر دارد. CIMEA یک مرکز دیجیتال است که گواهی comparability و verification صادر می‌کند و به‌عنوان جایگزین سریع‌تر DOV در رویه‌های اداری ایتالیا، از جمله بلوکارت، پذیرفته می‌شود. برای متقاضیانی که زمان محدودی دارند، CIMEA معمولاً انتخاب بهتری است.',
    },
    {
      q: 'آیا داشتن مدرک زبان ایتالیایی برای بلوکارت الزامی است؟',
      a: 'خیر. برای دریافت اولیه بلوکارت ایتالیا، ارائه مدرک زبان ایتالیایی الزامی نیست و قرارداد کاری به زبان انگلیسی نیز پذیرفته می‌شود. بسیاری از شرکت‌های بین‌المللی در میلان، رم و تورین محیط کاری انگلیسی‌زبان دارند.',
    },
  ];

  // ==================== RENDER ====================
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#081e26] text-slate-100 font-sans pb-20"
    >
      {/* نوار بالایی */}
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
            <span className="text-white font-semibold">بلوکارت ایتالیا ۲۰۲۶</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر کشورها:</span>
            {[
              { key: 'germany', label: '🇩🇪 آلمان' },
              { key: 'spain', label: '🇪🇸 اسپانیا' },
              { key: 'italy', label: '🇮🇹 ایتالیا (صفحه فعلی)', active: true },
              { key: 'austria', label: '🇦🇹 اتریش' },
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
      </div>

      {/* هیرو */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b2933] via-[#08222b] to-[#081e26] pt-10 pb-16 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-7 text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>دپارتمان ایتالیا و جنوب اروپا — هلدینگ دیاکو</span>
                <span className="text-white/40">|</span>
                <span className="text-amber-300">Nulla Osta در ۳۰ روز</span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                بلوکارت ایتالیا ۲۰۲۶
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-emerald-300 via-teal-300 to-amber-300">
                  Carta Blu UE Italia
                </span>
              </h1>

              <p className="speakable-summary mt-4 text-xs sm:text-sm leading-7 text-slate-300 font-medium text-justify">
                ورود بدون سهمیه به سومین اقتصاد بزرگ اتحادیه اروپا با{' '}
                <strong className="text-amber-300">
                  حداقل حقوق ۳۶,۳۰۰ € در سال
                </strong>{' '}
                (یا{' '}
                <strong className="text-amber-300">۲۹,۰۰۰ €</strong> برای مشاغل
                کمبود نیرو)،{' '}
                <strong className="text-amber-300">
                  تأیید Nulla Osta در ۳۰ روز
                </strong>
                ، معافیت کامل از Decreto Flussi و مسیر تسهیل‌شده به اقامت
                بلندمدت پس از ۵ سال (شامل ۲ سال در ایتالیا).
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-5 py-2.5 text-xs font-black text-[#082833] shadow-glow hover:scale-105 transition cursor-pointer"
                >
                  محاسبه‌گر حقوق و شانس Nulla Osta ۲۰۲۶
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
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-amber-400/30 bg-amber-500/15 text-amber-300 px-4 py-2.5 text-xs font-bold"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>تماس با وکیل: 02191693955</span>
                </a>
              </div>
            </div>

            {/* تصویر هیرو — میلان */}
            <div className="lg:col-span-5">
              <figure className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl aspect-[16/9] w-full">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="نمای میلان ایتالیا — مقصد بلوکارت اتحادیه اروپا Carta Blu UE و مهاجرت کاری متخصصان ۲۰۲۶"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-80" />
                <figcaption className="absolute bottom-3 right-3 left-3 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-300">
                    میلان؛ قطب مالی و فناوری ایتالیا
                  </span>
                  <span className="text-[10px] text-slate-300">
                    بدون Click Day
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* کارت‌های آمار */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-amber-300 font-bold">
                کف حقوق استاندارد ۲۰۲۶
              </span>
              <div className="speakable-salary text-xl font-black text-white mt-1">
                ۳۶,۳۰۰ €
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                سالانه ناخالص (≈۳,۰۲۵ €/ماه)
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-emerald-300 font-bold">
                کف حقوق کمبود نیرو
              </span>
              <div className="text-xl font-black text-white mt-1">۲۹,۰۰۰ €</div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                ICT، سلامت و مهندسی (≈۲,۴۱۷ €/ماه)
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-sky-300 font-bold">
                مهلت Nulla Osta
              </span>
              <div className="text-xl font-black text-white mt-1">۳۰ روز</div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                قانون ۱۸۲/۲۰۲۵ (کاهش از ۹۰ روز)
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-purple-300 font-bold">
                مسیر اقامت بلندمدت
              </span>
              <div className="text-xl font-black text-white mt-1">۵ سال</div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                شامل ۲ سال در ایتالیا (مجوز ۱۰ ساله)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* محاسبه‌گر */}
      <section id="calculator" className="py-14 container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              تطبیق با آستانه ISTAT ۲۰۲۶ و قانون ۱۸۲/۲۰۲۵
            </span>
            <h2 className="text-2xl font-black text-white mt-2">
              محاسبه‌گر حقوق و شانس صدور Nulla Osta ایتالیا
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-200">
                    پیشنهاد حقوق سالانه ناخالص:
                  </span>
                  <span className="font-mono text-emerald-300 font-black">
                    {calcSalary.toLocaleString('fa-IR')} یورو / سال
                  </span>
                </div>
                <input
                  type="range"
                  min={24000}
                  max={90000}
                  step={1000}
                  value={calcSalary}
                  onChange={(e) => setCalcSalary(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>۲۴,۰۰۰ €</span>
                  <span className="text-emerald-400 font-bold">
                    کف ۳۶,۳۰۰ €
                  </span>
                  <span>۹۰,۰۰۰ €</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">
                  دسته شغلی:
                </label>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <button
                    type="button"
                    onClick={() => setCalcSector('standard')}
                    className={`py-2.5 px-2 rounded-xl font-bold transition border cursor-pointer ${
                      calcSector === 'standard'
                        ? 'bg-emerald-500 text-black border-emerald-500'
                        : 'bg-black/30 text-slate-300 border-white/10'
                    }`}
                  >
                    استاندارد (۳۶,۳۰۰ €)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcSector('shortage')}
                    className={`py-2.5 px-2 rounded-xl font-bold transition border cursor-pointer ${
                      calcSector === 'shortage'
                        ? 'bg-amber-500 text-black border-amber-500'
                        : 'bg-black/30 text-slate-300 border-white/10'
                    }`}
                  >
                    کمبود نیرو (۲۹,۰۰۰ €)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">
                  وضعیت ارزشیابی تحصیلی (CIMEA / DOV):
                </label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {[
                    { id: 'yes', label: 'تأییدیه دارم' },
                    { id: 'in_progress', label: 'در حال اخذ' },
                    { id: 'no', label: 'نیاز به ارزشیابی' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCalcCimeaStatus(s.id as any)}
                      className={`py-2 px-1 rounded-xl font-bold transition border cursor-pointer ${
                        calcCimeaStatus === s.id
                          ? 'bg-emerald-500 text-black border-emerald-500'
                          : 'bg-black/30 text-slate-300 border-white/10'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c3847] to-[#08222b] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-emerald-300">
                  تحلیل ۲۰۲۶
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    evaluationResult.meetsSalary
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {evaluationResult.meetsSalary
                    ? 'واجد شرایط Nulla Osta'
                    : 'کمتر از کف قانونی'}
                </span>
              </div>

              <div className="text-xs space-y-2.5">
                <div className="flex justify-between text-slate-300">
                  <span>آستانه اعمال‌شده:</span>
                  <span className="font-bold text-white font-mono">
                    {evaluationResult.threshold.toLocaleString('fa-IR')} €
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>حقوق ماهانه ناخالص تقریبی:</span>
                  <span className="font-bold text-white font-mono">
                    ~{evaluationResult.monthly.toLocaleString('fa-IR')} €
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>تخمین شانس Nulla Osta:</span>
                  <span className="font-bold text-emerald-400">
                    {evaluationResult.prob}٪
                  </span>
                </div>
              </div>

              {!evaluationResult.meetsSalary && (
                <div className="flex items-start gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-[10px] text-amber-200">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>
                    حقوق پیشنهادی {evaluationResult.shortfall.toLocaleString('fa-IR')} €
                    کمتر از آستانه {calcSector === 'shortage' ? 'کمبود نیرو' : 'استاندارد'} است.
                    جاب‌آفر در بخش‌های ICT یا سلامت را بررسی کنید.
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={onOpenAssessment}
                className="w-full rounded-xl bg-gradient-to-l from-emerald-400 to-teal-500 py-3 text-xs font-black text-[#082833] shadow-glow hover:scale-[1.02] transition cursor-pointer"
              >
                ارزیابی فوری پرونده بلوکارت ایتالیا
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* مقاله غنی */}
      <section className="py-14 bg-[#05171e] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-2xl font-black text-white text-center mb-2">
            هر آنچه باید درباره بلوکارت ایتالیا ۲۰۲۶ بدانید
          </h2>
          <p className="text-center text-xs text-slate-400 mb-10 max-w-2xl mx-auto">
            تحلیل قوانین جدید، فرآیند دیجیتال، مسیر اقامت بلندمدت، حقوق خانواده
            و مقایسه هزینه زندگی در میلان و رم.
          </p>

          <div className="space-y-10">
            {/* بخش ۱ — تغییرات کلیدی ۲۰۲۶ */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-white">
                  ۱. سه تغییر کلیدی بلوکارت ایتالیا در ۲۰۲۶
                </h3>
              </div>
              <p className="speakable-answer text-xs leading-7 text-slate-300 text-justify">
                در سال ۲۰۲۶، رویه بلوکارت ایتالیا دستخوش سه تغییر مهم شده است
                که آن را سریع‌تر و شفاف‌تر از گذشته می‌کند: کاهش مهلت قانونی
                صدور Nulla Osta از ۹۰ روز به{' '}
                <strong className="text-emerald-300">۳۰ روز</strong>، دیجیتالی
                شدن کامل قرارداد اقامت از ژوئن ۲۰۲۶، و پذیرش گسترده{' '}
                <strong>CIMEA</strong> به‌عنوان جایگزین دیجیتال DOV کنسولی.
                این تغییرات به‌ویژه برای متخصصان ICT و مهندسانی که زمان
                محدودی برای جاب‌آفر دارند، مسیر را کوتاه‌تر و قابل‌پیش‌بینی‌تر
                کرده است.
              </p>
              <div className="mt-5 grid sm:grid-cols-3 gap-3 text-center text-[11px]">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <Timer className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                  <div className="font-black text-emerald-300">۳۰ روز</div>
                  <div className="text-slate-400 mt-0.5">
                    مهلت Nulla Osta (قبلاً ۹۰ روز)
                  </div>
                </div>
                <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3">
                  <Building className="h-4 w-4 text-sky-400 mx-auto mb-1" />
                  <div className="font-black text-sky-300">دیجیتال</div>
                  <div className="text-slate-400 mt-0.5">
                    قرارداد اقامت از ژوئن ۲۰۲۶
                  </div>
                </div>
                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3">
                  <GraduationCap className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                  <div className="font-black text-purple-300">CIMEA</div>
                  <div className="text-slate-400 mt-0.5">
                    جایگزین سریع‌تر DOV
                  </div>
                </div>
              </div>
            </article>

            {/* بخش ۲ — مسیر اقامت بلندمدت */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۲. مسیر تسهیل‌شده اقامت بلندمدت با بلوکارت
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                دارندگان بلوکارت ایتالیا از مزیت ویژه‌ای در مسیر اقامت بلندمدت
                اتحادیه اروپا برخوردارند. بر اساس ماده ۹-ter قانون تلفیقی
                مهاجرت، شرط اصلی{' '}
                <strong className="text-emerald-300">
                  ۵ سال اقامت قانونی در اتحادیه اروپا
                </strong>{' '}
                است که{' '}
                <strong className="text-amber-300">
                  حداقل ۲ سال از آن باید در ایتالیا
                </strong>{' '}
                سپری شده باشد. این در حالی است که سایر اتباع کشورهای ثالث
                معمولاً باید ۵ سال اقامت پیوسته را exclusively در ایتالیا
                اثبات کنند. مجوز اقامت بلندمدت صادرشده{' '}
                <strong>۱۰ ساله و قابل تمدید</strong> است و مسیر دریافت
                تابعیت ایتالیا معمولاً پس از ۱۰ سال اقامت قانونی هموار
                می‌شود.
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3 text-center text-[11px]">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <div className="font-black text-emerald-300">۲ سال</div>
                  <div className="text-slate-400 mt-0.5">در ایتالیا</div>
                </div>
                <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3">
                  <div className="font-black text-sky-300">۵ سال</div>
                  <div className="text-slate-400 mt-0.5">
                    کل اتحادیه اروپا
                  </div>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                  <div className="font-black text-amber-300">۱۰ سال</div>
                  <div className="text-slate-400 mt-0.5">
                    اعتبار مجوز بلندمدت
                  </div>
                </div>
              </div>
            </article>

            {/* بخش ۳ — خانواده */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-black text-white">
                  ۳. الحاق خانواده و حق کار همسر
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                بلوکارت ایتالیا شرایط مساعدی برای الحاق خانواده فراهم می‌کند.
                همسر و فرزندان تحت تکفل می‌توانند همراهی کنند و{' '}
                <strong className="text-purple-300">
                  همسر حق کار کامل در تمام زمینه‌ها
                </strong>{' '}
                را از زمان صدور مجوز اقامت خانوادگی دریافت می‌کند. اعضای
                خانواده نیز پس از احراز شرایط زمانی (۵ سال اقامت قانونی در
                اتحادیه اروپا شامل ۲ سال در ایتالیا) می‌توانند برای اقامت
                بلندمدت مشابه درخواست دهند. والدین تحت تکفل نیز در صورت اثبات
                وابستگی مالی واجد شرایط الحاق هستند.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'همسر: حق کار فوری',
                  'فرزندان: تحصیل رایگان',
                  'والدین تحت تکفل: واجد شرایط',
                  'اقامت خانوادگی: مرتبط با بلوکارت اصلی',
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

            {/* بخش ۴ — مشاغل پرتقاضا */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  ۴. مشاغل کمبود نیرو و پرتقاضا در ۲۰۲۶
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                دو بخش اصلی که آستانه حقوق کاهش‌یافته{' '}
                <strong>۲۹,۰۰۰ €</strong> را دریافت می‌کنند،{' '}
                <strong>ICT و سلامت</strong> هستند. علاوه بر این، مهندسان در
                رشته‌های مکانیک، برق و صنایع نیز از تقاضای بالایی برخوردارند.
                برای متخصصان ICT،{' '}
                <strong>۳ سال تجربه مرتبط در ۷ سال گذشته</strong> می‌تواند
                جایگزین مدرک دانشگاهی شود؛ این انعطاف‌پذیری مسیر بلوکارت را
                برای توسعه‌دهندگان خودآموخته نیز باز کرده است.
              </p>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {[
                  {
                    title: 'ICT و فناوری',
                    roles:
                      'توسعه‌دهنده نرم‌افزار، مهندس DevOps، متخصص Cloud، تحلیلگر داده',
                  },
                  {
                    title: 'سلامت و درمان',
                    roles:
                      'پزشکان متخصص، پرستاران، تکنسین‌های سلامت (نیازمند تشخیص صلاحیت)',
                  },
                  {
                    title: 'مهندسی',
                    roles: 'مکانیک، برق، صنایع، خودرو',
                  },
                  {
                    title: 'مدیریت و مالی',
                    roles:
                      'مدیران ارشد، متخصصان مالی در مراکز SSC میلان و رم',
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
            </article>

            {/* بخش ۵ — هزینه زندگی */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-white">
                  ۵. هزینه زندگی در میلان و رم (۲۰۲۶)
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                میلان گران‌ترین شهر ایتالیا برای مهاجران کاری است، اما در
                مقایسه با لندن، پاریس یا زوریخ همچنان مقرون‌به‌صرفه محسوب
                می‌شود. اجاره یک آپارتمان یک‌خوابه در مرکز میلان حدود{' '}
                <strong className="text-amber-300">۱,۲۰۰ €</strong> در ماه
                است، در حالی که همین شاخص در رم حدود{' '}
                <strong>۱,۰۰۰ €</strong> گزارش می‌شود. هزینه ماهانه یک فرد
                مجرد (شامل اجاره) در میلان حدود{' '}
                <strong>۲,۱۰۰ €</strong> و در رم حدود{' '}
                <strong>۱,۸۵۰ €</strong> برآورد می‌شود.
              </p>

              <figure className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 800px"
                  alt="نمای کانال بزرگ ونیز ایتالیا — مقایسه هزینه زندگی و مقاصد مهاجرت کاری ۲۰۲۶"
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-full object-cover sm:h-56"
                />
                <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                  ایتالیا؛ میلان گران‌ترین اما رم و جنوب مقرون‌به‌صرفه‌تر
                  (منبع: Numbeo / WhereToEmigrate ۲۰۲۶)
                </figcaption>
              </figure>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-center text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="p-2 text-right font-bold">شاخص</th>
                      <th className="p-2 font-bold text-amber-300">میلان</th>
                      <th className="p-2 font-bold text-slate-300">رم</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">اجاره ۱ خوابه مرکز</td>
                      <td className="p-2 font-mono font-bold text-white">
                        ≈ ۱,۲۰۰ €
                      </td>
                      <td className="p-2 font-mono">≈ ۱,۰۰۰ €</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">هزینه ماهانه فرد مجرد</td>
                      <td className="p-2 font-mono font-bold text-white">
                        ≈ ۲,۱۰۰ €
                      </td>
                      <td className="p-2 font-mono">≈ ۱,۸۵۰ €</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right">شاخص هزینه زندگی</td>
                      <td className="p-2 font-mono font-bold text-white">۷۳.۱</td>
                      <td className="p-2 font-mono">۶۳.۴</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* بخش ۶ — هشدار */}
            <article className="rounded-3xl border border-amber-500/25 bg-amber-500/[0.06] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-black text-amber-200">
                  نکته حیاتی: حقوق باید در تمام مدت اعتبار بلوکارت حفظ شود
                </h3>
              </div>
              <p className="text-xs leading-7 text-amber-100/85 text-justify">
                برخلاف برخی تصورات، کف حقوق بلوکارت ایتالیا تنها یک شرط
                لحظه‌ای برای صدور مجوز نیست. اداره مهاجرت ایتالیا (Questura)
                در زمان تمدید نیز حقوق پرداختی را بررسی می‌کند و در صورت
                کاهش حقوق به زیر آستانه قانونی، ممکن است تمدید بلوکارت با
                مشکل مواجه شود. بنابراین در قرارداد کاری، نه‌تنها آستانه
                ۳۶,۳۰۰ € (یا ۲۹,۰۰۰ € برای کمبود نیرو) باید رعایت شود، بلکه
                ساختار حقوقی باید به‌گونه‌ای باشد که در طول دوره اقامت نیز
                قابل حفظ باشد.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* چک‌لیست مدارک */}
      <section className="py-14 container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-black text-white">
              چک‌لیست مدارک بلوکارت ایتالیا ۲۰۲۶
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
          {DOCUMENTS_ITALY.map((doc) => {
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

      {/* سوالات متداول */}
      <section className="py-14 bg-[#05171e] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="text-xl font-black text-white text-center mb-6">
            پرسش‌های متداول بلوکارت ایتالیا ۲۰۲۶
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
                    className="w-full flex items-center justify-between p-3.5 text-right text-xs font-bold text-white hover:text-emerald-300 transition cursor-pointer gap-3"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-emerald-400' : ''
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

      {/* CTA پایانی */}
      <section className="py-14 container mx-auto px-4 md:px-8 max-w-3xl text-center">
        <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-3" />
        <h2 className="text-xl font-black text-white">
          آماده شروع مسیر بلوکارت ایتالیا هستید؟
        </h2>
        <p className="mt-2 text-xs text-slate-400 max-w-xl mx-auto leading-6">
          تیم دپارتمان ایتالیا هلدینگ دیاکو با تسلط بر قوانین ۲۰۲۶ — از
          آستانه‌های ISTAT تا مهلت ۳۰ روزه Nulla Osta و مسیر CIMEA — پرونده
          شما را از جاب‌آفر تا Permesso di Soggiorno همراهی می‌کند.
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

export default ItalyBlueCardPage;