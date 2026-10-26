import OptimizedImage from '../../OptimizedImage';
import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  PhoneCall,
  Check,
  Copy,
  Sparkles,
  ShieldCheck,
  Building2,
  Landmark,
  Users,
  Home,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Briefcase,
  Plane,
  Scale,
  Globe2,
  FileWarning,
  Percent,
  MapPin,
  GraduationCap,
  HeartPulse,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

// ✅ واقعیت حقوقی ۲۰۲۶: هیچ CBI قانونی وجود ندارد
const LEGAL_REALITY_2026 = {
  hasCBI: false,
  article19: true,
  residenceToCitizenship: '6 سال (3 سال اقامت موقت + 3 سال اقامت دائم)',
  renunciationRequiredNaturalization: true,
  renunciationArticle19: false,
} as const;

// ✅ پاسپورت ۲۰۲۶
const PASSPORT_2026 = {
  henleyRank: 30,
  visaFreeTotal: 135,
  schengenVisaFree: true,
  chinaVisaFree: true,
  russiaVisaFree: true,
  ukVisaFree: false,
  usVisaFree: false,
} as const;

// ✅ اقامت و هزینه‌ها
const RESIDENCY_2026 = {
  processingDaysMin: 15,
  processingDaysMax: 60,
  temporaryPermitMaxYears: 3,
  companyFormationAnnualCostEur: 3_900,
  propertyMinBelgradeEur: 80_000,
  propertyMinOutsideEur: 50_000,
} as const;

// ✅ هزینه زندگی ۲۰۲۶ (Wise)
const COST_OF_LIVING_2026 = {
  belgradeSingleMonthlyUsd: 1_753,
  belgradeRent1BedCenterUsd: 908,
  belgradeRent1BedOutsideUsd: 609,
  belgradeNetSalaryUsd: 1_268,
} as const;

export const CitizenshipSerbiaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  // ==================== SEO + AIO ====================
  useSeo({
    title: 'اقامت و تابعیت صربستان ۲۰۲۶ | واقعیت CBI و مسیر ۶ ساله',
    description:
      'راهنمای صادقانه ۲۰۲۶: صربستان CBI ندارد. مسیر واقعی = اقامت با ملک (از ۸۰,۰۰۰ €) یا شرکت (از ۳,۹۰۰ €/سال)، اقامت دائم پس از ۳ سال، تابعیت پس از ۶ سال. پاسپورت رتبه ۳۰، ۱۳۵ کشور، شینگن+چین+روسیه. ارزیابی فوری.',
    canonical: '/guides/citizenship-serbia',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1545648057-55734fa0b3fd?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تابعیت صربستان ۲۰۲۶',
      'اقامت صربستان با خرید ملک',
      'پاسپورت صربستان ۱۳۵ کشور',
      'ماده ۱۹ تابعیت صربستان',
      'صربستان CBI ندارد',
      'اقامت دائم صربستان ۳ سال',
      'ثبت شرکت در صربستان ۲۰۲۶',
      'هزینه زندگی بلگراد ۲۰۲۶',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/citizenship-serbia#article',
          headline:
            'راهنمای واقعی اقامت و تابعیت صربستان ۲۰۲۶: چرا CBI وجود ندارد و مسیر قانونی چیست؟',
          description:
            'تحلیل حقوقی کامل: صربستان هیچ برنامه سرمایه‌گذاری تابعیت ندارد. مسیرهای واقعی شامل اقامت با ملک یا شرکت، اقامت دائم پس از ۳ سال، تابعیت پس از ۶ سال (با شرط عدم تابعیت مضاعف) و مسیر استثنایی ماده ۱۹ است.',
          image: [
            'https://images.unsplash.com/photo-1545648057-55734fa0b3fd?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=1200&q=80',
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
            { '@type': 'Thing', name: 'Serbia Residence Permit' },
            { '@type': 'Thing', name: 'Serbian Citizenship Law' },
            { '@type': 'Thing', name: 'Article 19 Citizenship' },
          ],
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: [
              'h1',
              '.speakable-summary',
              '.speakable-warning',
              '.speakable-answer',
            ],
          },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/citizenship-serbia#howto',
          name: 'مسیر قانونی ۶ ساله از اقامت تا تابعیت صربستان در ۲۰۲۶',
          description:
            'فرآیند گام‌به‌گام از خرید ملک یا ثبت شرکت تا دریافت پاسپورت صربستان از طریق ماده ۱۴ (طبیعی‌سازی).',
          totalTime: 'P6Y',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'دریافت اقامت موقت با خرید ملک یا ثبت شرکت',
              text: 'خرید ملک (از ۸۰,۰۰۰ یورو در بلگراد) یا ثبت شرکت (هزینه سالانه از ۳,۹۰۰ یورو) مبنای درخواست اقامت موقت تا ۳ سال است. زمان بررسی ۱۵ تا ۶۰ روز.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'تمدید اقامت موقت و رسیدن به ۳ سال',
              text: 'اقامت موقت قابل تمدید است. پس از ۳ سال اقامت پیوسته، امکان درخواست اقامت دائم (Permanent Residence) فراهم می‌شود.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'دریافت اقامت دائم و سپری کردن ۳ سال دیگر',
              text: 'اقامت دائم معمولاً پس از ۳ سال اقامت موقت صادر می‌شود. برای واجد شرایط شدن طبیعی‌سازی، باید ۳ سال با اقامت دائم در صربستان ثبت‌شده باشید.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'درخواست تابعیت از طریق ماده ۱۴ و ارائه گواهی عدم سوءپیشینه',
              text: 'پس از ۶ سال مجموع (۳ سال موقت + ۳ سال دائم)، درخواست طبیعی‌سازی ارائه می‌شود. نیاز به اثبات عدم سوءپیشینه، بیانیه وفاداری و در حالت استاندارد،放棄 تابعیت قبلی (با استثنائات).',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/citizenship-serbia#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا صربستان برنامه سرمایه‌گذاری برای تابعیت (CBI) دارد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. صربستان هیچ برنامه قانونی سرمایه‌گذاری برای تابعیت ندارد. قانون تابعیت صربستان هیچ مبلغ واجد شرایط، کمک دولتی یا گزینه املاک برای دریافت مستقیم تابعیت پیش‌بینی نکرده است. هر کسی که قیمت مشخصی برای پاسپورت صربستان اعلام کند، در واقع هزینه خدمات خود را می‌گوید، نه یک الزام دولتی.',
              },
            },
            {
              '@type': 'Question',
              name: 'مسیر واقعی رسیدن به پاسپورت صربستان چقدر طول می‌کشد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'مسیر استاندارد طبیعی‌سازی حدود ۶ سال طول می‌کشد: ۳ سال اقامت موقت (بر اساس ملک یا شرکت) و سپس ۳ سال اقامت دائم. پس از آن، درخواست تابعیت از طریق ماده ۱۴ ارائه می‌شود. مسیر استثنایی ماده ۱۹ می‌تواند بدون دوره اقامت باشد، اما کاملاً در اختیار دولت است و هیچ تضمینی برای تأیید وجود ندارد.',
              },
            },
            {
              '@type': 'Question',
              name: 'ماده ۱۹ قانون تابعیت صربستان چیست؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'ماده ۱۹ به دولت صربستان اجازه می‌دهد در صورت تشخیص منافع ملی، به یک خارجی تابعیت اعطا کند، بدون الزامات اقامت، زبان یا放棄 تابعیت قبلی. این مسیر «تابعیت استثنایی» نامیده می‌شود و کاملاً اختیاری است. سرمایه‌گذاری تنها یکی از عوامل در ارزیابی کلی مشخصات متقاضی است و صرف داشتن پول کافی نیست. زمان واقعی پردازش معمولاً ۶ تا ۱۲ ماه از تکمیل پرونده است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا صربستان تابعیت مضاعف را مجاز می‌داند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، صربستان در بسیاری از موارد تابعیت مضاعف را مجاز می‌داند، به‌ویژه از طریق تبار، ازدواج یا ماده ۱۹. با این حال، در مسیر طبیعی‌سازی عادی (ماده ۱۴)، قانون رسماً نیاز به放棄 تابعیت قبلی دارد، هرچند در عمل این الزام به‌طور یکسان اعمال نمی‌شود. همچنین قوانین کشور مبدأ شما تعیین‌کننده است؛ آلمان، اتریش، چین و ژاپن محدودیت‌های سخت‌گیرانه‌ای دارند.',
              },
            },
            {
              '@type': 'Question',
              name: 'پاسپورت صربستان به کدام کشورها بدون ویزا سفر می‌کند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بر اساس هنلی ۲۰۲۶، پاسپورت صربستان رتبه ۳۰ جهانی و دسترسی بدون ویزا به ۱۳۵ کشور و منطقه دارد. این شامل کل منطقه شینگن (۲۷ کشور)، چین، روسیه، ژاپن و اسرائیل است. صربستان یکی از معدود کشورهایی است که همزمان به شینگن، چین و روسیه دسترسی بدون ویزا دارد. سفر به بریتانیا و آمریکا نیازمند ویزا است.',
              },
            },
            {
              '@type': 'Question',
              name: 'حداقل سرمایه لازم برای اقامت صربستان چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'صربستان «گلدن ویزا» با حداقل سرمایه‌گذاری مشخص ندارد. برای اقامت از طریق خرید ملک، قیمت‌ها معمولاً از ۵۰,۰۰۰ یورو در شهرهای کوچک یا ۸۰,۰۰۰ یورو در بلگراد شروع می‌شود. مسیر ثبت شرکت نیز هزینه سالانه حدود ۳,۹۰۰ یورو (شامل اجاره دفتر، حسابداری، مالیات و اظهارنامه) دارد. هیچ‌کدام از این مسیرها به‌طور مستقیم تابعیت نمی‌دهند.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا خرید ملک در صربستان مستقیماً تابعیت می‌دهد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. خرید ملک فقط می‌تواند مبنای درخواست اقامت موقت باشد. اقامت موقت به اقامت دائم و سپس در صورت احراز شرایط (معمولاً پس از ۶ سال و با شرط عدم تابعیت مضاعف در مسیر عادی) به تابعیت منجر می‌شود. هیچ مسیر یک‌مرحله‌ای از ملک به پاسپورت وجود ندارد.',
              },
            },
          ],
        },
      ],
    },
  });

  // ==================== STATE ====================
  const [pathType, setPathType] = useState<'property' | 'company'>('property');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ==================== ESTIMATOR ====================
  const estimatePath = useMemo(() => {
    if (pathType === 'property') {
      return {
        label: 'خرید ملک',
        upfront: 'از ۸۰,۰۰۰ € (بلگراد) / ۵۰,۰۰۰ € (شهرهای دیگر)',
        recurring: 'مالیات سالانه ملک + هزینه‌های نگهداری',
        timeToTemp: '۱۵–۶۰ روز',
      };
    }
    return {
      label: 'ثبت شرکت (D.O.O.)',
      upfront: 'هزینه ثبت + سرمایه اولیه',
      recurring: 'از ۳,۹۰۰ € در سال (دفتر، حسابداری، مالیات)',
      timeToTemp: '۱۵–۶۰ روز',
    };
  }, [pathType]);

  // ==================== DOCUMENTS ====================
  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'گذرنامه معتبر و عکس بیومتریک',
      desc: 'گذرنامه باید حداقل ۶ ماه اعتبار داشته باشد. برای درخواست اقامت، نسخه اسکن تمام صفحات لازم است.',
    },
    {
      id: 'doc-2',
      title: 'مدرک مالکیت ملک یا اسناد ثبت شرکت',
      desc: 'قرارداد خرید رسمی و تأیید ثبت در کاداستر برای مسیر ملک؛ یا اساسنامه و گواهی ثبت در BRA برای مسیر شرکت.',
    },
    {
      id: 'doc-3',
      title: 'گواهی عدم سوءپیشینه کیفری با تأییدیه Apostille',
      desc: 'از کشور مبدأ و کشورهای محل اقامت در ۵ سال گذشته. ترجمه رسمی به صربی الزامی است.',
    },
    {
      id: 'doc-4',
      title: 'اثبات تمکن مالی یا بیمه درمانی',
      desc: 'برای اقامت موقت، اثبات توانایی پوشش هزینه‌های زندگی یا بیمه درمانی معتبر لازم است.',
    },
    {
      id: 'doc-5',
      title: 'مدارک خانوادگی (برای الحاق همسر و فرزندان)',
      desc: 'گواهی ازدواج و تولد با ترجمه رسمی و Apostille. همسر و فرزندان زیر ۱۸ سال قابل الحاق هستند.',
    },
  ];

  const handleCopy = () => {
    const text = DOCUMENTS.map(
      (d, i) => `${i + 1}. ${d.title}\n   ${d.desc}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  // ==================== FAQS ====================
  const FAQS = [
    {
      q: 'آیا صربستان برنامه سرمایه‌گذاری برای تابعیت (CBI) دارد؟',
      a: 'خیر. صربستان هیچ برنامه قانونی سرمایه‌گذاری برای تابعیت ندارد. قانون تابعیت هیچ مبلغ واجد شرایط، کمک دولتی یا گزینه املاک برای دریافت مستقیم تابعیت پیش‌بینی نکرده است. هر کسی که قیمت مشخصی برای پاسپورت صربستان اعلام کند، در واقع هزینه خدمات خود را می‌گوید، نه یک الزام دولتی. تنها مسیرهای واقعی، طبیعی‌سازی از طریق اقامت (ماده ۱۴) و تابعیت استثنایی در منافع ملی (ماده ۱۹) هستند.',
    },
    {
      q: 'مسیر واقعی رسیدن به پاسپورت صربستان چقدر طول می‌کشد؟',
      a: 'مسیر استاندارد طبیعی‌سازی حدود ۶ سال طول می‌کشد: ۳ سال اقامت موقت (بر اساس ملک یا شرکت) و سپس ۳ سال اقامت دائم. پس از آن، درخواست تابعیت از طریق ماده ۱۴ ارائه می‌شود. مسیر استثنایی ماده ۱۹ می‌تواند بدون دوره اقامت باشد، اما کاملاً در اختیار دولت است و هیچ تضمینی برای تأیید وجود ندارد. زمان پردازش ماده ۱۹ معمولاً ۶ تا ۱۲ ماه از تکمیل پرونده است.',
    },
    {
      q: 'ماده ۱۹ قانون تابعیت صربستان چیست؟',
      a: 'ماده ۱۹ به دولت صربستان اجازه می‌دهد در صورت تشخیص منافع ملی، به یک خارجی تابعیت اعطا کند، بدون الزامات اقامت، زبان یا放棄 تابعیت قبلی. این مسیر «تابعیت استثنایی» نامیده می‌شود و کاملاً اختیاری است. سرمایه‌گذاری تنها یکی از عوامل در ارزیابی کلی مشخصات متقاضی است و صرف داشتن پول کافی نیست. نمونه‌های شناخته‌شده شامل استیو وزنیاک و استیون سیگال هستند.',
    },
    {
      q: 'آیا صربستان تابعیت مضاعف را مجاز می‌داند؟',
      a: 'بله، صربستان در بسیاری از موارد تابعیت مضاعف را مجاز می‌داند، به‌ویژه از طریق تبار، ازدواج یا ماده ۱۹. با این حال، در مسیر طبیعی‌سازی عادی (ماده ۱۴)، قانون رسماً نیاز به放棄 تابعیت قبلی دارد، هرچند در عمل این الزام به‌طور یکسان اعمال نمی‌شود. همچنین قوانین کشور مبدأ شما تعیین‌کننده است؛ آلمان، اتریش، چین و ژاپن محدودیت‌های سخت‌گیرانه‌ای دارند و ممکن است تابعیت مضاعف را به‌طور کامل ممنوع کنند.',
    },
    {
      q: 'پاسپورت صربستان به کدام کشورها بدون ویزا سفر می‌کند؟',
      a: 'بر اساس هنلی ۲۰۲۶، پاسپورت صربستان رتبه ۳۰ جهانی و دسترسی بدون ویزا به ۱۳۵ کشور و منطقه دارد. این شامل کل منطقه شینگن (۲۷ کشور)، چین، روسیه، ژاپن و اسرائیل است. صربستان یکی از معدود کشورهایی است که همزمان به شینگن، چین و روسیه دسترسی بدون ویزا دارد. سفر به بریتانیا و آمریکا نیازمند ویزا است. پاسپورت ۱۰ ساله صادر می‌شود.',
    },
    {
      q: 'حداقل سرمایه لازم برای اقامت صربستان چقدر است؟',
      a: 'صربستان «گلدن ویزا» با حداقل سرمایه‌گذاری مشخص ندارد. برای اقامت از طریق خرید ملک، قیمت‌ها معمولاً از ۵۰,۰۰۰ یورو در شهرهای کوچک یا ۸۰,۰۰۰ یورو در بلگراد شروع می‌شود. مسیر ثبت شرکت نیز هزینه سالانه حدود ۳,۹۰۰ یورو (شامل اجاره دفتر، حسابداری، مالیات و اظهارنامه) دارد. هیچ‌کدام از این مسیرها به‌طور مستقیم تابعیت نمی‌دهند.',
    },
    {
      q: 'آیا خرید ملک در صربستان مستقیماً تابعیت می‌دهد؟',
      a: 'خیر. خرید ملک فقط می‌تواند مبنای درخواست اقامت موقت باشد. اقامت موقت به اقامت دائم و سپس در صورت احراز شرایط (معمولاً پس از ۶ سال و با شرط عدم تابعیت مضاعف در مسیر عادی) به تابعیت منجر می‌شود. هیچ مسیر یک‌مرحله‌ای از ملک به پاسپورت وجود ندارد.',
    },
  ];

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-[#061a21] text-slate-100" dir="rtl">
      {/* مسیریابی */}
      <div className="border-b border-white/10 bg-[#041217] px-4 py-3 md:px-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <button
              type="button"
              onClick={onBackToHome}
              className="flex cursor-pointer items-center gap-1 font-bold text-amber-400 transition hover:text-amber-300"
            >
              <ArrowRight className="h-4 w-4" />
              <span>صفحه اصلی دیاکو</span>
            </button>
            <span>/</span>
            <span>اقامت و تابعیت</span>
            <span>/</span>
            <span className="font-semibold text-white">صربستان ۲۰۲۶</span>
          </div>
          <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-[11px] font-bold text-blue-300">
            🇷🇸 دپارتمان بالکان دیاکو
          </span>
        </div>
      </div>

      {/* هشدار واقعیت حقوقی */}
      <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2.5">
        <div className="container mx-auto flex max-w-5xl items-start gap-2 text-[11px] leading-5 text-amber-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>واقعیت حقوقی ۲۰۲۶:</strong> صربستان برنامه
            سرمایه‌گذاری برای تابعیت (CBI) <strong>ندارد</strong>. هیچ مبلغ
            رسمی، هیچ صندوق دولتی و هیچ مسیر یک‌مرحله‌ای وجود ندارد. مسیرهای
            واقعی: اقامت → اقامت دائم → تابعیت (≈۶ سال) یا ماده ۱۹ (کاملاً
            اختیاری). جزئیات در ادامه.
          </span>
        </div>
      </div>

      {/* هیرو */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#082833] via-[#061a21] to-[#041217] pt-10 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3.5 py-1 text-xs font-black text-blue-300">
                <Globe2 className="h-3.5 w-3.5" />
                رتبه ۳۰ هنلی — ۱۳۵ کشور، شینگن + چین + روسیه
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                اقامت و تابعیت صربستان ۲۰۲۶
                <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-l from-blue-300 via-sky-300 to-amber-300">
                  بدون CBI، اما با مسیر قانونی ۶ ساله
                </span>
              </h1>

              <div
                data-ai-answer
                className="speakable-summary mt-4 rounded-2xl border border-blue-500/30 bg-[#0e2a35] p-4 text-xs leading-7 text-slate-200 shadow-lg sm:text-sm"
              >
                <div className="mb-1 flex items-center gap-1.5 font-bold text-blue-300">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  خلاصه صادقانه ۲۰۲۶:
                </div>
                صربستان{' '}
                <strong className="text-rose-300">
                  هیچ برنامه سرمایه‌گذاری برای تابعیت ندارد
                </strong>
                . مسیر استاندارد حدود{' '}
                <strong className="text-amber-300">۶ سال</strong> است: اقامت
                موقت با ملک (از ۸۰,۰۰۰ €) یا شرکت (از ۳,۹۰۰ €/سال)، سپس اقامت
                دائم پس از ۳ سال، و تابعیت پس از ۳ سال دیگر. مسیر استثنایی{' '}
                <strong className="text-amber-300">ماده ۱۹</strong> بدون اقامت
                ممکن است، اما کاملاً اختیاری و بدون تضمین است. پاسپورت صربستان{' '}
                <strong>رتبه ۳۰</strong> با دسترسی به{' '}
                <strong>۱۳۵ کشور</strong> شامل شینگن، چین و روسیه.
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <Landmark className="h-4 w-4" />
                  ارزیابی مسیر اقامت و تابعیت
                </button>
                <a
                  href="tel:+982191693955"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4 text-amber-400" />
                  مشاوره تهران: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="relative mx-auto aspect-[16/9] w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1545648057-55734fa0b3fd?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1545648057-55734fa0b3fd?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1545648057-55734fa0b3fd?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="بلگراد صربستان در تلاقی رودهای ساوا و دانوب — مقصد اقامت و سرمایه‌گذاری ۲۰۲۶"
                  loading="eager"
                  fetchPriority="high"
                  width={1000}
                  height={563}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent opacity-80" />
                <figcaption className="absolute bottom-3 right-3 left-3 rounded-xl border border-white/10 bg-[#061a21]/85 p-2.5 text-[11px] text-slate-300 backdrop-blur-md">
                  بلگراد؛ دروازه بالکان، اما نه دروازه یک‌شبه به پاسپورت
                </figcaption>
              </figure>
            </div>
          </div>

          {/* کارت‌های آمار کلیدی */}
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-rose-300">
                CBI قانونی
              </span>
              <div className="mt-1 text-xl font-black text-white">ندارد</div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                هیچ مبلغ یا صندوق رسمی
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-amber-300">
                مسیر استاندارد تا تابعیت
              </span>
              <div className="mt-1 text-xl font-black text-white">≈ ۶ سال</div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                ۳ سال موقت + ۳ سال دائم
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-sky-300">
                رتبه پاسپورت (هنلی ۲۰۲۶)
              </span>
              <div className="mt-1 text-xl font-black text-white">۳۰</div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                ۱۳۵ کشور — شینگن+چین+روسیه
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-emerald-300">
                زمان بررسی اقامت
              </span>
              <div className="mt-1 text-xl font-black text-white">۱۵–۶۰ روز</div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                بسته به کامل بودن پرونده
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== محاسبه‌گر مسیر اقامت ========== */}
      <section className="bg-[#082029] py-14">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <h2 className="text-xl font-black text-white">
              دو مسیر واقعی اقامت صربستان ۲۰۲۶
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              هیچ‌کدام مستقیماً تابعیت نمی‌دهد؛ هر دو نقطه شروع مسیر ۶ ساله
              هستند
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPathType('property')}
                  className={`w-full cursor-pointer rounded-xl border p-4 text-right transition ${
                    pathType === 'property'
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-white/10 bg-black/20'
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Home className="h-4 w-4 text-amber-400" />
                    خرید ملک
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    از ۸۰,۰۰۰ € در بلگراد / ۵۰,۰۰۰ € در شهرهای دیگر
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPathType('company')}
                  className={`w-full cursor-pointer rounded-xl border p-4 text-right transition ${
                    pathType === 'company'
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-white/10 bg-black/20'
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Building2 className="h-4 w-4 text-sky-400" />
                    ثبت شرکت (D.O.O.)
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    هزینه سالانه از ۳,۹۰۰ € (دفتر، حسابداری، مالیات)
                  </p>
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <h3 className="text-sm font-black text-amber-300">
                  {estimatePath.label}
                </h3>
                <div className="mt-3 space-y-2 text-[11px]">
                  <div className="flex justify-between gap-2 text-slate-300">
                    <span>هزینه اولیه:</span>
                    <span className="font-mono text-white">
                      {estimatePath.upfront}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2 text-slate-300">
                    <span>هزینه‌های تکرارشونده:</span>
                    <span className="font-mono text-white">
                      {estimatePath.recurring}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2 text-slate-300">
                    <span>زمان تا اقامت موقت:</span>
                    <span className="font-mono text-emerald-300">
                      {estimatePath.timeToTemp}
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-2.5 text-[10px] leading-5 text-amber-200">
                  ⚠️ این مسیر فقط اقامت موقت می‌دهد. تابعیت پس از ۶ سال و با
                  شرط عدم تابعیت مضاعف (در مسیر عادی) قابل درخواست است.
                </div>

                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="mt-4 w-full cursor-pointer rounded-xl bg-amber-400 py-2.5 text-xs font-black text-slate-900 transition hover:bg-amber-300"
                >
                  بررسی پرونده اقامت
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== مقاله غنی ========== */}
      <section className="border-y border-white/10 bg-[#05171e] py-14">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="mb-2 text-center text-2xl font-black text-white">
            هر آنچه باید درباره اقامت و تابعیت صربستان در ۲۰۲۶ بدانید
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-xs text-slate-400">
            تحلیل حقوقی CBI، مسیر ۶ ساله، ماده ۱۹، پاسپورت، هزینه زندگی و
            مزایای تجاری.
          </p>

          <div className="space-y-10">
            {/* بخش ۱ — CBI وجود ندارد */}
            <article className="rounded-3xl border border-amber-500/30 bg-amber-500/[0.06] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <FileWarning className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-amber-200">
                  ۱. صربستان CBI ندارد: چرا این ادعا در بازار رایج است؟
                </h3>
              </div>
              <p className="speakable-answer text-justify text-xs leading-7 text-amber-100/85">
                قانون تابعیت صربستان{' '}
                <strong>هیچ ماده‌ای</strong> برای اعطای تابعیت در ازای
                سرمایه‌گذاری مشخص، کمک به صندوق دولتی یا خرید ملک ندارد[reference:3].
                عبارت “€600,000 برای پاسپورت صربستان” که در برخی تبلیغات دیده
                می‌شود، هیچ مبنای قانونی ندارد. آنچه وجود دارد،{' '}
                <strong>ماده ۱۹</strong> است: دولتی که می‌تواند در صورت
                تشخیص منافع ملی، به یک خارجی تابعیت اعطا کند — بدون اقامت،
                بدون زبان و بدون قیمت منتشرشده[reference:4]. این یک تصمیم
                اختیاری است، نه یک معامله. سرمایه‌گذاری تنها یکی از عوامل در
                ارزیابی کلی مشخصات متقاضی است و صرف داشتن پول، پرونده را
                قوی نمی‌کند[reference:5]. هر مشاوری که “قیمت پاسپورت” اعلام
                می‌کند، در واقع هزینه خدمات خود را می‌گوید، نه یک الزام
                دولتی.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  '⛔ هیچ CBI قانونی',
                  '⛔ هیچ صندوق دولتی',
                  '⛔ هیچ قیمت رسمی',
                  '✅ ماده ۱۹ (اختیاری)',
                  '✅ مسیر اقامت ۶ ساله',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-[10px] font-bold text-amber-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {/* تصویر ویژه — بلگراد */}
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=1200&q=80"
                srcSet="https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 800px"
                alt="معماری تاریخی بلگراد صربستان — مقصد اقامت و سرمایه‌گذاری در بالکان ۲۰۲۶"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-52 w-full object-cover sm:h-64"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                بلگراد؛ شهری با هزینه زندگی نسبتاً پایین، اما نه یک مقصد
                “پاسپورت فوری” (منبع: Unsplash)
              </figcaption>
            </figure>

            {/* بخش ۲ — مسیر ۶ ساله */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  ۲. مسیر استاندارد ۶ ساله: از اقامت موقت تا پاسپورت
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                مسیر قانونی و قابل پیش‌بینی برای اکثر متقاضیان،{' '}
                <strong>طبیعی‌سازی از طریق اقامت (ماده ۱۴)</strong> است. این
                مسیر سه مرحله دارد: ابتدا{' '}
                <strong>اقامت موقت</strong> با خرید ملک یا ثبت شرکت (اعتبار
                تا ۳ سال، تصمیم ۱۵–۶۰ روز)[reference:6]؛ سپس{' '}
                <strong>اقامت دائم</strong> پس از ۳ سال اقامت پیوسته؛ و
                در نهایت{' '}
                <strong>تابعیت</strong> پس از ۳ سال دیگر با اقامت دائم
                ثبت‌شده. مجموعاً حدود{' '}
                <strong className="text-amber-300">۶ سال</strong>. شرط
                مهم: در مسیر عادی، قانون رسماً نیاز به{' '}
                <strong className="text-rose-300">
                 放棄 تابعیت قبلی
                </strong>{' '}
                دارد، هرچند در عمل این الزام به‌طور یکسان اعمال نمی‌شود[reference:7].
                همچنین باید بیانیه وفاداری به صربستان ارائه شود و سن بالای
                ۱۸ سال و عدم سوءپیشینه اثبات گردد.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-center text-[11px]">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="p-2 text-right font-bold">مرحله</th>
                      <th className="p-2 font-bold text-sky-300">
                        مدت / زمان
                      </th>
                      <th className="p-2 font-bold text-amber-300">
                        وضعیت حقوقی
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">اقامت موقت</td>
                      <td className="p-2 font-mono">۳ سال</td>
                      <td className="p-2">ملک یا شرکت</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">اقامت دائم</td>
                      <td className="p-2 font-mono">۳ سال</td>
                      <td className="p-2">پس از ۳ سال موقت</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-bold text-amber-300">
                        تابعیت (ماده ۱۴)
                      </td>
                      <td className="p-2 font-mono font-black text-amber-300">
                        مجموع ≈ ۶ سال
                      </td>
                      <td className="p-2">با شرط عدم تابعیت مضاعف</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* بخش ۳ — ماده ۱۹ */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-black text-white">
                  ۳. ماده ۱۹: تنها مسیر “سرمایه‌گذاری” که واقعاً وجود دارد
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                ماده ۱۹ به دولت اجازه می‌دهد در صورت تشخیص منافع ملی، تابعیت
                اعطا کند. این مسیر{' '}
                <strong>هیچ الزام اقامتی، زبانی یا放棄 تابعیت</strong> ندارد
                و توسط دولت (پس از بررسی نهادی) تصمیم‌گیری می‌شود[reference:8].
                سرمایه‌گذاری می‌تواند یکی از عوامل باشد، اما{' '}
                <strong className="text-purple-300">
                  “ظرفیت مالی به‌تنهایی کافی نیست”
                </strong>
                [reference:9]. آنچه پرونده را می‌سازد، مشارکت واقعی است: چه
                چیزی می‌سازید، چه اشتغالی ایجاد می‌کنید، چه فناوری یا
                سرمایه‌ای می‌آورید که صربستان ندارد. زمان واقعی پردازش
                معمولاً{' '}
                <strong>۶ تا ۱۲ ماه از تکمیل پرونده</strong> است و هیچ
                تضمینی برای تأیید وجود ندارد[reference:10]. این مسیر برای
                کارآفرینان با سابقه اثبات‌شده مناسب است، نه برای کسانی که به
                دنبال یک معامله قطعی هستند.
              </p>
            </article>

            {/* بخش ۴ — پاسپورت */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Plane className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۴. پاسپورت صربستان ۲۰۲۶: رتبه ۳۰، ۱۳۵ کشور، شینگن+چین+روسیه
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                پاسپورت صربستان در سال ۲۰۲۶ توسط هنلی در{' '}
                <strong className="text-amber-300">رتبه ۳۰</strong> جهانی با
                دسترسی به{' '}
                <strong className="text-amber-300">۱۳۵ مقصد</strong> قرار
                گرفت. مزیت منحصربه‌فرد آن این است که همزمان به{' '}
                <strong>منطقه شینگن (۲۷ کشور)</strong>،{' '}
                <strong>چین</strong> و <strong>روسیه</strong> دسترسی بدون
                ویزا دارد. این ترکیب در میان پاسپورت‌های اروپایی
                نادر است و صربستان را برای تجار و مسافران مکرر به شرق و غرب
                جذاب می‌کند. با این حال، سفر به{' '}
                <strong className="text-rose-300">
                  بریتانیا و آمریکا نیازمند ویزا
                </strong>{' '}
                است. پاسپورت ۱۰ ساله صادر می‌شود و پس از انقضا قابل تمدید
                است.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  '✅ شینگن (۲۷ کشور)',
                  '✅ چین (۳۰ روز)',
                  '✅ روسیه (۳۰ روز)',
                  '✅ ژاپن و اسرائیل',
                  '❌ بریتانیا / آمریکا',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {/* تصویر ویژه — هزینه زندگی */}
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
                srcSet="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 800px"
                alt="تحلیل هزینه زندگی و اجاره مسکن در بلگراد صربستان ۲۰۲۶"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover sm:h-56"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                بلگراد؛ اجاره یک‌خوابه مرکز شهر ≈ ۹۰۸ $، اما حقوق خالص
                میانگین ≈ ۱,۲۶۸ $ (منبع: Wise ۲۰۲۶)
              </figcaption>
            </figure>

            {/* بخش ۵ — هزینه زندگی */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-white">
                  ۵. هزینه زندگی در بلگراد ۲۰۲۶: مقرون‌به‌صرفه، اما نه ارزان
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                بر اساس داده‌های Wise ۲۰۲۶، هزینه ماهانه یک فرد مجرد در
                بلگراد (شامل اجاره) حدود{' '}
                <strong className="text-amber-300">۱,۷۵۳ دلار</strong> است[reference:13].
                اجاره یک آپارتمان یک‌خوابه در مرکز شهر به‌طور میانگین{' '}
                <strong>۹۰۸ دلار</strong> و در خارج از مرکز{' '}
                <strong>۶۰۹ دلار</strong> است[reference:14]. این در حالی است
                که میانگین حقوق خالص ماهانه در بلگراد حدود{' '}
                <strong>۱,۲۶۸ دلار</strong> است[reference:15]. یعنی یک فرد
                مجرد با حقوق متوسط، بخش قابل‌توجهی از درآمد خود را صرف اجاره
                می‌کند. با این حال، در مقایسه با پایتخت‌های اروپای غربی،
                بلگراد همچنان مقرون‌به‌صرفه‌تر است. شهرهای نووی ساد و نیس
                هزینه‌های کمتری دارند (به‌ترتیب ≈۱,۳۸۴ و ≈۱,۰۴۹ دلار در
                ماه)[reference:16].
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-center text-[11px]">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="p-2 text-right font-bold">شاخص</th>
                      <th className="p-2 font-bold text-amber-300">بلگراد</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">هزینه ماهانه فرد مجرد</td>
                      <td className="p-2 font-mono">≈ ۱,۷۵۳ $</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">اجاره ۱ خوابه مرکز</td>
                      <td className="p-2 font-mono">≈ ۹۰۸ $</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right">حقوق خالص میانگین</td>
                      <td className="p-2 font-mono">≈ ۱,۲۶۸ $</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* بخش ۶ — تجارت و مالیات */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Percent className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۶. مزایای تجاری: مالیات ۱۵٪ و معافیت ۱۰ ساله برای
                  سرمایه‌گذاری‌های بزرگ
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                صربستان یکی از جذاب‌ترین محیط‌های مالیاتی در اروپا را دارد.{' '}
                <strong>مالیات بر درآمد شرکت‌ها ۱۵٪</strong> است و
                سرمایه‌گذاری‌های قابل‌توجه می‌توانند از{' '}
                <strong>معافیت مالیاتی ۱۰ ساله</strong> و کمک‌های دولتی
                بهره‌مند شوند[reference:17]. همچنین اعتبار مالیاتی تا{' '}
                <strong>۲۰٪</strong> هزینه سرمایه‌گذاری در دارایی‌های ثابت
                وجود دارد[reference:18]. برای شرکت‌های فناوری و نوآور، تا{' '}
                <strong>۸۰٪</strong> درآمد واجد شرایط از دارایی‌های فکری
                می‌تواند از پایه مالیاتی خارج شود که نرخ مؤثر مالیات را به
                حدود <strong>۳٪</strong> کاهش می‌دهد[reference:19]. ثبت شرکت
                (D.O.O.) بدون حضور فیزیکی و ظرف ۳ تا ۵ روز کاری انجام
                می‌شود[reference:20]. این مشوق‌ها صربستان را برای ثبت هلدینگ،
                مرکز منطقه‌ای یا واحد تولیدی جذاب می‌کند — اما باید توجه داشت
                که این مزایا به تابعیت منجر نمی‌شوند، مگر از مسیر طولانی
                اقامت.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'مالیات شرکت: ۱۵٪',
                  'معافیت ۱۰ ساله (سرمایه‌گذاری بزرگ)',
                  'اعتبار مالیاتی ۲۰٪',
                  'نرخ مؤثر ۳٪ برای IP',
                  'ثبت شرکت: ۳–۵ روز',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {/* بخش ۷ — آموزش و سلامت */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  ۷. آموزش و سلامت: زیرساخت مناسب، اما نه رایگان برای همه
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                صربستان سیستم آموزش عالی و سلامت عمومی نسبتاً توسعه‌یافته‌ای
                دارد. شهروندان و دارندگان اقامت دائم معمولاً به بیمه سلامت
                دولتی (RFZO) دسترسی دارند، اما دارندگان اقامت موقت باید بیمه
                درمانی خصوصی یا بین‌المللی ارائه دهند. برای آموزش، دانشگاه
                بلگراد و نووی ساد گزینه‌های معتبری هستند، اما شهریه برای
                اتباع خارجی به‌طور قابل‌توجهی بالاتر از شهروندان است (مثلاً
                دانشکده پزشکی بلگراد حدود ۲,۹۰۰ یورو در سال برای خارجی‌ها در
                مقایسه با ۲۲۰,۰۰۰ دینار برای داخلی‌ها)[reference:21].
                مدارس دولتی به زبان صربی رایگان هستند، اما مدارس بین‌المللی
                انگلیسی‌زبان شهریه بالایی دارند. برای خانواده‌هایی که قصد
                اقامت طولانی دارند، این هزینه‌ها باید در برنامه‌ریزی مالی
                لحاظ شود.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ========== چک‌لیست مدارک ========== */}
      <section className="border-b border-white/10 py-12">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-white sm:text-2xl">
                چک‌لیست مدارک اقامت صربستان ۲۰۲۶
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                برای مسیر ملک یا شرکت — مدارک مشترک هستند
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
            >
              {copiedChecklist ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copiedChecklist ? 'کپی شد!' : 'کپی کل مدارک'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                onClick={() =>
                  setCheckedDocs((prev) => ({
                    ...prev,
                    [doc.id]: !prev[doc.id],
                  }))
                }
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                  checkedDocs[doc.id]
                    ? 'border-blue-500/40 bg-blue-950/20 text-white'
                    : 'border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/20'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-white/20 bg-black/40">
                  {checkedDocs[doc.id] && (
                    <Check className="h-3.5 w-3.5 text-blue-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{doc.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    {doc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== سوالات متداول ========== */}
      <section className="border-b border-white/10 py-12">
        <div className="container mx-auto max-w-3xl px-4 md:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-black text-white sm:text-2xl">
              پرسش‌های متداول اقامت و تابعیت صربستان ۲۰۲۶
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-right text-sm font-bold text-white transition hover:text-blue-300"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blue-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/5 px-4 pb-4 pt-1 text-justify text-xs leading-7 text-slate-300">
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
      <section className="pt-12 text-center">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 to-amber-950/40 p-8">
            <Sparkles className="mx-auto mb-3 h-8 w-8 text-amber-400" />
            <h3 className="mb-2 text-xl font-black text-white sm:text-2xl">
              مسیر واقعی صربستان را با شفافیت شروع کنید
            </h3>
            <p className="mx-auto mb-6 max-w-xl text-xs leading-6 text-slate-300 sm:text-sm">
              تیم دیاکو با تسلط بر قانون تابعیت صربستان، مسیر اقامت ۶ ساله،
              شرایط ماده ۱۹ و محدودیت‌های تابعیت مضاعف، پرونده شما را از
              انتخاب مسیر تا دریافت پاسپورت همراهی می‌کند. هیچ وعده غیرقانونی
              نمی‌دهیم.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="cursor-pointer rounded-xl bg-amber-400 px-6 py-3 text-sm font-black text-slate-900 shadow-lg transition hover:bg-amber-300"
              >
                ارزیابی رایگان مسیر صربستان
              </button>
              <button
                type="button"
                onClick={onBackToHome}
                className="cursor-pointer rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                بازگشت به صفحه اصلی
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CitizenshipSerbiaPage;