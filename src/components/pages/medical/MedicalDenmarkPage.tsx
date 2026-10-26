import OptimizedImage from '../../OptimizedImage';
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
  Stethoscope,
  Award,
  ShieldCheck,
  Building,
  AlertTriangle,
  Users,
  Home,
  TrendingUp,
  BookOpen,
  Timer,
  Briefcase,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

// ✅ داده‌های ۲۰۲۶:配额限制 + Positive List 路径
const QUOTA_STATUS = {
  doctorsNursesZero: true,
  quotaStart: '2025-12-15',
  quotaEnd: '2026-12-31',
} as const;

// ✅ حقوق ۲۰۲۶ (DKK/ماه) — منبع: YourSalaryTax / laeger.dk
const SALARY_DKK_2026 = {
  kbuNetMonthly: 24_742, // پایه (KBU year 1) خالص
  specialistNetMonthly: 36_063, // متخصص خالص
  specialistGrossAnnual: 700_000,
  nurseGrossAnnual: 554_000, // میانگین پرستار
  nurseNetMonthlyApprox: 29_000,
} as const;

export const MedicalDenmarkPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  // ==================== SEO + AIO ====================
  useSeo({
    title: 'مهاجرت کادر درمان به دانمارک ۲۰۲۶ | Positive List و配额 محدودیت',
    description:
      'راهنمای ۲۰۲۶ مهاجرت پزشکان و پرستاران به دانمارک؛ هشدار配额 صفر授权 (تا ۳۱ دسامبر ۲۰۲۶)، مسیر جایگزین Positive List، آزمون Prøve i Dansk 3 (نمره ۱۰ شفاهی)، حقوق KBU ۲۴,۷۴۲ DKK خالص و مسیر اقامت دائم. ارزیابی فوری.',
    canonical: '/guides/medical-denmark-authorization',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'مهاجرت پزشکان به دانمارک ۲۰۲۶',
      'Positive List دانمارک کادر درمان',
      '配额授权 دانمارک صفر ۲۰۲۶',
      'Prøve i Dansk 3 نمره شفاهی ۱۰',
      'حقوق پزشک KBU دانمارک ۲۰۲۶',
      'Styrelsen for Patientsikkerhed kvote',
      'کار پرستار در کپنهاگ ۲۰۲۶',
      'Evalueringsansættelse ۱۲ ماه',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/medical-denmark-authorization#article',
          headline:
            'راهنمای ۲۰۲۶ مهاجرت کادر درمان به دانمارک:配额 صفر授权 و مسیر جایگزین Positive List',
          description:
            'تحلیل کامل تغییرات ۲۰۲۶ شامل配额 صفر برای授权 پزشکان و پرستاران، مسیرهای جایگزین SIRI، آزمون زبان Prøve i Dansk 3 با نمره شفاهی ۱۰، و حقوق واقعی KBU و متخصص.',
          image: [
            'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
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
            { '@type': 'Thing', name: 'Denmark Healthcare Immigration' },
            { '@type': 'Thing', name: 'Positive List' },
            { '@type': 'Thing', name: 'Styrelsen for Patientsikkerhed' },
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
          '@id': 'https://www.dia-co.ir/guides/medical-denmark-authorization#howto',
          name: 'مسیر جایگزین ۲۰۲۶: دریافت اقامت کاری کادر درمان دانمارک از طریق Positive List',
          description:
            'با配额 صفر授权، مسیر عملی ۲۰۲۶ دریافت پیشنهاد شغلی از کارفرمای دانمارکی و اقدام از طریق Positive List است.',
          totalTime: 'P6M',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'دریافت پیشنهاد شغلی از بیمارستان یا کلینیک دانمارکی',
              text: 'کارفرما باید پیشنهاد شغلی معتبر در یکی از مشاغل موجود در Positive List (مانند پرستار یا پزشک متخصص) ارائه دهد.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'درخواست اقامت و کار از طریق SIRI (Positive List)',
              text: 'با پیشنهاد شغلی، درخواست اقامت و کار تحت طرح Positive List ثبت می‌شود. حقوق باید مطابق استانداردهای دانمارک باشد.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'ورود به دانمارک و شروع فرآیند授权 از داخل کشور',
              text: 'پس از دریافت اقامت، فرآیند Evalueringsansættelse (۱۲ ماه برای پزشکان، ۶ ماه برای پرستاران) و آزمون زبان Prøve i Dansk 3 آغاز می‌شود.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'دریافت授权 دائم و اقامت بلندمدت',
              text: 'پس از تکمیل ارزیابی بالینی و قبولی در آزمون زبان با نمرات تعیین‌شده،授权 دائم صادر و مسیر اقامت دائم هموار می‌شود.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/medical-denmark-authorization#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا در سال ۲۰۲۶ می‌توان بدون پیشنهاد شغلی برای授权 پزشکی یا پرستاری دانمارک اقدام کرد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. از ۱۵ دسامبر ۲۰۲۵ تا ۳۱ دسامبر ۲۰۲۶،配额 درخواست授权 برای پزشکان و پرستاران توسط Styrelsen for Patientsikkerhed صفر تعیین شده است. بنابراین امکان دریافت اقامت صرفاً با هدف کسب授权 وجود ندارد. مسیر عملی، دریافت پیشنهاد شغلی و اقدام از طریق Positive List یا سایر طرح‌های کاری SIRI است.',
              },
            },
            {
              '@type': 'Question',
              name: 'مسیر جایگزین برای کادر درمان دانمارک در ۲۰۲۶ چیست؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'چهار مسیر اصلی SIRI برای کادر درمان در ۲۰۲۶ عبارتند از: Positive List (برای مشاغل کمبود نیرو مانند پرستاری و پزشکی)، Pay Limit Scheme (حقوق بالا)، Fast-track Scheme (کارفرمای دارای گواهی SIRI) و قوانین آزادی حرکت اتحادیه اروپا. Positive List رایج‌ترین مسیر برای کادر درمان غیراروپایی است و نیازمند پیشنهاد شغلی معتبر است.',
              },
            },
            {
              '@type': 'Question',
              name: 'نمرات مورد نیاز آزمون Prøve i Dansk 3 برای کادر درمان چیست؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای شروع Evalueringsansættelse، قبولی در آزمون Prøve i Dansk 3 با حداقل نمره ۱۰ در ارتباط شفاهی، ۷ در درک مطلب و ۷ در نگارش الزامی است. آزمون سالانه دو بار در ماه‌های می/ژوئن و نوامبر/دسامبر برگزار می‌شود و نمرات می‌توانند در نوبت‌های مختلف کسب شوند.',
              },
            },
            {
              '@type': 'Question',
              name: 'حقوق پزشک KBU و متخصص در دانمارک ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حقوق خالص ماهانه پزشک KBU (سال اول) حدود ۲۴,۷۴۲ کرون دانمارک و برای پزشک متخصص (Speciallæge) حدود ۳۶,۰۶۳ کرون است. حقوق ناخالص سالانه متخصص حدود ۷۰۰,۰۰۰ کرون است. پرستاران نیز به‌طور میانگین حدود ۵۵۴,۰۰۰ کرون ناخالص سالانه دریافت می‌کنند.',
              },
            },
            {
              '@type': 'Question',
              name: 'مدت Evalueringsansættelse برای پزشکان و پرستاران چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای پزشکان و دندانپزشکان، Evalueringsansættelse حداقل ۱۲ ماه است. برای پرستاران و سایر گروه‌های حرفه‌ای، این دوره ۶ ماه است. این دوره حقوق‌دار است و تحت قرارداد رسمی با بیمارستان دانمارکی انجام می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا همسر و خانواده کادر درمان در ۲۰۲۶ می‌توانند همراهی کنند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، اما با محدودیت. افرادی که تحت طرح配额授权 قرار می‌گیرند، اعضای خانواده همراه آن‌ها نیز نمی‌توانند بر همان اساس اقامت بگیرند. با این حال، اگر اقامت از طریق Positive List یا سایر طرح‌های کاری SIRI دریافت شود، الحاق خانواده معمولاً امکان‌پذیر است و همسر حق کار دارد.',
              },
            },
          ],
        },
      ],
    },
  });

  // ==================== STATE ====================
  const [roleType, setRoleType] = useState<'doctor_kbu' | 'doctor_specialist' | 'nurse'>(
    'doctor_kbu'
  );
  const [experienceDk, setExperienceDk] = useState<number>(5);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ==================== CALCULATOR ====================
  const calc = useMemo(() => {
    let baseNetMonthly: number;
    let grossAnnual: number;

    if (roleType === 'doctor_kbu') {
      baseNetMonthly = SALARY_DKK_2026.kbuNetMonthly;
      grossAnnual = 460_000;
    } else if (roleType === 'doctor_specialist') {
      baseNetMonthly = SALARY_DKK_2026.specialistNetMonthly;
      grossAnnual = SALARY_DKK_2026.specialistGrossAnnual;
    } else {
      baseNetMonthly = SALARY_DKK_2026.nurseNetMonthlyApprox;
      grossAnnual = SALARY_DKK_2026.nurseGrossAnnual;
    }

    const experienceBonus = Math.min(experienceDk * 350, 3_500);
    const netMonthly = Math.round(baseNetMonthly + experienceBonus);
    const grossMonthly = Math.round(grossAnnual / 12);
    const eurNet = Math.round(netMonthly / 7.46);
    const eurGross = Math.round(grossMonthly / 7.46);

    return { netMonthly, grossMonthly, grossAnnual, eurNet, eurGross };
  }, [roleType, experienceDk]);

  // ==================== DOCUMENTS ====================
  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'پیشنهاد شغلی معتبر از کارفرمای دانمارکی (برای مسیر Positive List)',
      desc: 'پیشنهاد شغلی باید در یکی از مشاغل موجود در Positive List SIRI باشد و حقوق مطابق استانداردهای دانمارکی داشته باشد. این پیش‌شرط اصلی مسیر جایگزین ۲۰۲۶ است.',
    },
    {
      id: 'doc-2',
      title: 'مدرک تحصیلی و ریزنمرات (ترجمه رسمی به انگلیسی)',
      desc: 'برای ارزیابی انطباق با استانداردهای آموزشی دانمارک. مدارک باید شامل ساعات تئوری و بالینی باشد.',
    },
    {
      id: 'doc-3',
      title: 'گواهی Good Standing از نظام پزشکی/پرستاری کشور مبدأ',
      desc: 'دارای اعتبار حداکثر ۳ ماه از زمان صدور؛ نشان‌دهنده عدم سوءپیشینه حرفه‌ای.',
    },
    {
      id: 'doc-4',
      title: 'مدرک زبان دانمارکی Prøve i Dansk 3 (برای مرحله Evalueringsansættelse)',
      desc: 'حداقل نمره ۱۰ در ارتباط شفاهی، ۷ در درک مطلب و ۷ در نگارش. آزمون در می/ژوئن و نوامبر/دسامبر برگزار می‌شود.',
    },
    {
      id: 'doc-5',
      title: 'گذرنامه معتبر و گواهی عدم سوءپیشینه کیفری',
      desc: 'گذرنامه باید در تمام مدت اقامت اعتبار داشته باشد.',
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
      q: 'آیا در ۲۰۲۶ می‌توان بدون پیشنهاد شغلی برای授权 پزشکی یا پرستاری دانمارک اقدام کرد؟',
      a: 'خیر. از ۱۵ دسامبر ۲۰۲۵ تا ۳۱ دسامبر ۲۰۲۶، Styrelsen for Patientsikkerhed配额 درخواست授权 برای پزشکان و پرستاران را صفر کرده است. در این دوره، امکان دریافت اقامت با هدف صرف کسب授权 وجود ندارد و درخواست‌ها رد می‌شوند. مسیر عملی، دریافت پیشنهاد شغلی و اقدام از طریق Positive List یا سایر طرح‌های کاری SIRI است.',
    },
    {
      q: 'مسیرهای جایگزین SIRI برای کادر درمان در ۲۰۲۶ کدامند؟',
      a: 'چهار مسیر اصلی وجود دارد: (۱) Positive List برای مشاغل کمبود نیرو (رایج‌ترین مسیر برای پرستاران و پزشکان)؛ (۲) Pay Limit Scheme برای حقوق بالا؛ (۳) Fast-track Scheme برای کارفرمایان دارای گواهی SIRI؛ (۴) قوانین آزادی حرکت اتحادیه اروپا. Positive List نیازمند پیشنهاد شغلی معتبر است و حقوق باید مطابق استانداردهای دانمارکی باشد.',
    },
    {
      q: 'نمرات مورد نیاز Prøve i Dansk 3 برای کادر درمان چیست؟',
      a: 'برای شروع Evalueringsansættelse، قبولی در آزمون با حداقل نمره ۱۰ در ارتباط شفاهی، ۷ در درک مطلب و ۷ در نگارش الزامی است. آزمون سالانه دو بار (می/ژوئن و نوامبر/دسامبر) برگزار می‌شود و نمرات می‌توانند در نوبت‌های مختلف کسب شوند. این الزام از ۱ ژوئیه ۲۰۲۵ برای پرستاران کشورهای خارج از EU/EEA دوباره برقرار شده است.',
    },
    {
      q: 'حقوق KBU و متخصص در دانمارک ۲۰۲۶ چقدر است؟',
      a: 'حقوق خالص ماهانه KBU (سال اول) حدود ۲۴,۷۴۲ DKK و برای متخصص حدود ۳۶,۰۶۳ DKK است. حقوق ناخالص سالانه متخصص حدود ۷۰۰,۰۰۰ DKK است. پرستاران میانگین حدود ۵۵۴,۰۰۰ DKK ناخالص سالانه دریافت می‌کنند. نرخ مؤثر مالیات برای KBU حدود ۳۵.۵٪ و برای متخصص حدود ۳۸.۲٪ است.',
    },
    {
      q: 'مدت Evalueringsansættelse چقدر است و آیا حقوق دارد؟',
      a: 'برای پزشکان و دندانپزشکان حداقل ۱۲ ماه و برای پرستاران ۶ ماه است. این دوره حقوق‌دار است و تحت قرارداد رسمی با بیمارستان دانمارکی انجام می‌شود. برای پزشکان غیرمتخصص، این دوره معادل دوره KBU دانمارکی است.',
    },
    {
      q: 'آیا خانواده کادر درمان در ۲۰۲۶ می‌توانند همراهی کنند؟',
      a: 'اگر اقامت از طریق طرح配额授权 باشد، اعضای خانواده نیز نمی‌توانند بر همان اساس اقامت بگیرند. اما اگر اقامت از طریق Positive List یا سایر طرح‌های کاری SIRI دریافت شود، الحاق خانواده معمولاً امکان‌پذیر است و همسر حق کار دارد. بنابراین انتخاب مسیر Positive List نه‌تنها از نظر شغلی، بلکه از نظر خانوادگی نیز مزیت دارد.',
    },
  ];

  // ==================== RENDER ====================
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#081e26] text-slate-100 font-sans pb-20"
    >
      {/* مسیریابی بالای صفحه */}
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
            <span>مهاجرت کادر درمان</span>
            <span>/</span>
            <span className="text-white font-semibold">کادر درمان به دانمارک ۲۰۲۶</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر مقاصد درمانی:</span>
            {[
              { key: 'medical-germany', label: '🇩🇪 پزشکان آلمان' },
              { key: 'medical-austria-nursing', label: '🇦🇹 پرستاران اتریش' },
              { key: 'medical-finland', label: '🇫🇮 پزشکان فنلاند' },
            ].map((dest) => (
              <button
                key={dest.key}
                type="button"
                onClick={() => onNavigateToCountry?.(dest.key)}
                className="rounded-lg px-2.5 py-1 text-[11px] font-medium transition cursor-pointer bg-white/5 hover:bg-white/15 text-slate-300"
              >
                {dest.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========== هشدار配额 — AIO/Banner ========== */}
      <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2.5">
        <div className="container mx-auto max-w-5xl flex items-start gap-2 text-[11px] text-amber-200">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>هشدار ۲۰۲۶:</strong>配额授权 پزشکان و پرستاران از ۱۵ دسامبر
            ۲۰۲۵ تا ۳۱ دسامبر ۲۰۲۶ صفر است. مسیر عملی، دریافت پیشنهاد شغلی از
            طریق Positive List است. جزئیات در ادامه.
          </span>
        </div>
      </div>

      {/* ========== هیرو ========== */}
      <section className="relative overflow-hidden pt-8 pb-14 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  مسیر جایگزین Positive List — ۲۰۲۶
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                 配额授权: صفر تا ۳۱ دسامبر ۲۰۲۶
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                مهاجرت کادر درمان به دانمارک ۲۰۲۶
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-rose-300 via-red-300 to-amber-300">
                  Positive List، زبان B2 و حقوق واقعی
                </span>
              </h1>

              <div
                data-ai-answer
                className="speakable-summary rounded-2xl bg-[#0e2a35] border border-rose-500/30 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg"
              >
                <div className="font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  خلاصه وضعیت ۲۰۲۶:
                </div>
                برخلاف سال‌های گذشته،{' '}
                <strong className="text-amber-300">
                  مسیر بدون پیشنهاد شغلی برای授权 پزشک یا پرستار در ۲۰۲۶ بسته
                  است
                </strong>{' '}
                (配额 صفر تا ۳۱ دسامبر). مسیر عملی، دریافت پیشنهاد شغلی از
                بیمارستان یا کلینیک دانمارکی و اقدام از طریق{' '}
                <strong>Positive List</strong> است. حقوق خالص KBU حدود{' '}
                <strong className="text-emerald-300">۲۴,۷۴۲ DKK</strong> و
                متخصص <strong className="text-emerald-300">۳۶,۰۶۳ DKK</strong>{' '}
                در ماه است. آزمون زبان{' '}
                <strong className="text-amber-300">Prøve i Dansk 3</strong> با
                نمره شفاهی حداقل ۱۰ الزامی است.
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  ارزیابی مسیر Positive List
                </button>
                <a
                  href="tel:+982191693955"
                  className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-rose-400" />
                  ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="کپنهاگ دانمارک — مقصد مهاجرت کادر درمان و مسیر Positive List ۲۰۲۶"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-60" />
                <figcaption className="absolute bottom-3 right-3 left-3 bg-[#081e26]/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>بیمارستان‌های کپنهاگ، آرهوس و اودنسه</span>
                  <span className="text-rose-400 font-bold">
                    Positive List ۲۰۲۶
                  </span>
                </figcaption>
              </figure>
              <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                پیشنهاد شغلی پیش‌شرط مسیر جایگزین ۲۰۲۶ است
              </p>
            </div>
          </div>

          {/* کارت‌های آمار کلیدی */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-amber-300 font-bold">
                حقوق خالص KBU (ماهانه)
              </span>
              <div className="speakable-warning text-xl font-black text-white mt-1">
                ۲۴,۷۴۲ DKK
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                ≈ ۳,۳۱۷ یورو — سال اول
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-emerald-300 font-bold">
                حقوق خالص متخصص
              </span>
              <div className="text-xl font-black text-white mt-1">
                ۳۶,۰۶۳ DKK
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                ≈ ۴,۸۳۴ یورو در ماه
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-rose-300 font-bold">
               配额授权 (تا ۳۱ دسامبر)
              </span>
              <div className="text-xl font-black text-white mt-1">صفر</div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                مسیر جایگزین: Positive List
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-sky-300 font-bold">
                نمره شفاهی Prøve i Dansk 3
              </span>
              <div className="text-xl font-black text-white mt-1">۱۰</div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                خواندن و نوشتن: ۷
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== محاسبه‌گر حقوق ========== */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
                محاسبه‌گر حقوق واقعی ۲۰۲۶
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                برآورد حقوق KBU، متخصص و پرستار (DKK و یورو)
              </h2>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-300 mb-2">
                نقش شغلی:
              </label>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {[
                  { id: 'doctor_kbu', label: 'پزشک KBU' },
                  { id: 'doctor_specialist', label: 'پزشک متخصص' },
                  { id: 'nurse', label: 'پرستار' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRoleType(r.id as any)}
                    className={`py-2.5 px-2 rounded-xl font-bold transition border cursor-pointer ${
                      roleType === r.id
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-black/30 text-slate-300 border-white/10'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                سابقه کار: ({experienceDk} سال)
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={experienceDk}
                onChange={(e) => setExperienceDk(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer mt-2"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4 bg-black/30 rounded-2xl p-5 border border-white/10">
              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">
                  ناخالص ماهانه (تخمینی)
                </span>
                <span className="text-xl sm:text-2xl font-black text-rose-400 block mt-1">
                  {calc.grossMonthly.toLocaleString('fa-IR')} DKK
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  ≈ {calc.eurGross.toLocaleString('fa-IR')} €
                </span>
              </div>

              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">
                  خالص ماهانه (پس از مالیات)
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-300 block mt-1">
                  {calc.netMonthly.toLocaleString('fa-IR')} DKK
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  ≈ {calc.eurNet.toLocaleString('fa-IR')} €
                </span>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 block">
                  ناخالص سالانه
                </span>
                <span className="text-xl sm:text-2xl font-black text-white block mt-1">
                  {calc.grossAnnual.toLocaleString('fa-IR')} DKK
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  ≈ ۹۳,۰۰۰ €
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== مقاله غنی ========== */}
      <section className="py-14 bg-[#05171e] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-2xl font-black text-white text-center mb-2">
            هر آنچه باید درباره کادر درمان دانمارک در ۲۰۲۶ بدانید
          </h2>
          <p className="text-center text-xs text-slate-400 mb-10 max-w-2xl mx-auto">
            تحلیل配额 صفر授权، مسیرهای جایگزین SIRI، آزمون زبان، حقوق واقعی و
            مسیر اقامت دائم.
          </p>

          <div className="space-y-10">
            {/* بخش ۱ — هشدار配额 */}
            <article className="rounded-3xl border border-amber-500/30 bg-amber-500/[0.06] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-amber-200">
                  ۱. تغییر حیاتی ۲۰۲۶:配额授权 صفر شد
                </h3>
              </div>
              <p className="speakable-answer text-xs leading-7 text-amber-100/85 text-justify">
                مهم‌ترین تغییر سال ۲۰۲۶ در مهاجرت کادر درمان دانمارک،{' '}
                <strong>
                  تعیین配额 صفر برای درخواست‌های授权 پزشکان و پرستاران
                </strong>{' '}
                توسط Styrelsen for Patientsikkerhed است. این配额 از{' '}
                <strong>۱۵ دسامبر ۲۰۲۵</strong> آغاز شده و تا{' '}
                <strong>۳۱ دسامبر ۲۰۲۶</strong> ادامه دارد. در این بازه،
                امکان دریافت اقامت با هدف صرف کسب授权 وجود ندارد و
                درخواست‌های جدید رد می‌شوند. حتی درخواست‌های در جریان نیز
                ممکن است تحت تأثیر قرار گیرند. این تغییر، مسیر سنتی “سفر به
                دانمارک برای یادگیری زبان و سپس دریافت授权” را برای
                ۲۰۲۶ عملاً بسته است.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  '配额: صفر (۰)',
                  'بازه: ۱۵ دسامبر ۲۰۲۵ – ۳۱ دسامبر ۲۰۲۶',
                  'درخواست‌های در جریان نیز رد می‌شوند',
                  'اعضای خانواده همراه نیز محدود می‌شوند',
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

            {/* تصویر ویژه — بیمارستان کپنهاگ */}
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
                srcSet="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 800px"
                alt="بیمارستان مدرن در دانمارک — محیط کار کادر درمان بین‌المللی ۲۰۲۶"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-52 w-full object-cover sm:h-64"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                بیمارستان‌های دانمارک؛ مقصد کادر درمان، اما مسیر ورود در ۲۰۲۶
                تغییر کرده است (منبع: Unsplash)
              </figcaption>
            </figure>

            {/* بخش ۲ — مسیرهای جایگزین SIRI */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  ۲. مسیرهای جایگزین SIRI در ۲۰۲۶: Positive List و سه طرح دیگر
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                با بسته شدن مسیر授权 بدون پیشنهاد شغلی، کادر درمان باید از
                طریق طرح‌های کاری SIRI اقدام کنند. چهار مسیر اصلی وجود دارد:{' '}
                <strong>Positive List</strong> (برای مشاغل کمبود نیرو مانند
                پرستاری و پزشکی)، <strong>Pay Limit Scheme</strong> (حقوق
                بالا)، <strong>Fast-track Scheme</strong> (کارفرمای دارای
                گواهی SIRI) و قوانین آزادی حرکت اتحادیه اروپا. برای کادر
                درمان غیراروپایی، Positive List رایج‌ترین مسیر است و{' '}
                <strong className="text-sky-300">
                  نیازمند پیشنهاد شغلی معتبر
                </strong>{' '}
                است. مزیت این مسیر آن است که علاوه بر امکان اقامت، الحاق
                خانواده نیز معمولاً امکان‌پذیرتر است.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-center text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="p-2 text-right font-bold">طرح</th>
                      <th className="p-2 font-bold text-sky-300">پیش‌شرط</th>
                      <th className="p-2 font-bold text-emerald-300">
                        مناسب برای
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right font-bold text-white">
                        Positive List
                      </td>
                      <td className="p-2">پیشنهاد شغلی در لیست کمبود</td>
                      <td className="p-2">پرستار، پزشک، متخصص</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right font-bold text-white">
                        Pay Limit Scheme
                      </td>
                      <td className="p-2">حقوق بالای آستانه</td>
                      <td className="p-2">مشاغل با حقوق بالا</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right font-bold text-white">
                        Fast-track
                      </td>
                      <td className="p-2">کارفرمای دارای گواهی SIRI</td>
                      <td className="p-2">استخدام سریع</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-bold text-white">
                        EU Free Movement
                      </td>
                      <td className="p-2">تابعیت EU/EEA</td>
                      <td className="p-2">بدون نیاز به مجوز کار</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* بخش ۳ — آزمون زبان */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-black text-white">
                  ۳. Prøve i Dansk 3: نمره شفاهی ۱۰، خواندن و نوشتن ۷
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                برای شروع دوره ارزیابی بالینی (Evalueringsansættelse)، قبولی
                در آزمون <strong>Prøve i Dansk 3</strong> با نمرات مشخص
                الزامی است. حداقل نمره{' '}
                <strong className="text-purple-300">ارتباط شفاهی ۱۰</strong>،{' '}
                <strong className="text-purple-300">درک مطلب ۷</strong> و{' '}
                <strong className="text-purple-300">نگارش ۷</strong> است.
                این الزام از ۱ ژوئیه ۲۰۲۵ برای پرستاران کشورهای خارج از
                EU/EEA دوباره برقرار شده است. آزمون سالانه دو بار در
                ماه‌های می/ژوئن و نوامبر/دسامبر برگزار می‌شود و نمرات
                می‌توانند در نوبت‌های مختلف کسب شوند. شهرداری‌ها دوره‌های
                زبان دانمارکی را با یارانه دولتی ارائه می‌دهند و مدارس
                تخصصی مانند “Sundhedsdansk” نیز دوره‌های زبان پزشکی برای
                کادر درمان برگزار می‌کنند.
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3 text-center text-[11px]">
                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3">
                  <div className="font-black text-purple-300">۱۰</div>
                  <div className="text-slate-400 mt-0.5">ارتباط شفاهی</div>
                </div>
                <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3">
                  <div className="font-black text-sky-300">۷</div>
                  <div className="text-slate-400 mt-0.5">درک مطلب</div>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <div className="font-black text-emerald-300">۷</div>
                  <div className="text-slate-400 mt-0.5">نگارش</div>
                </div>
              </div>
            </article>

            {/* بخش ۴ — حقوق و Evalueringsansættelse */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-white">
                  ۴. حقوق واقعی ۲۰۲۶ و دوره Evalueringsansættelse
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                برخلاف تصور رایج، حقوق KBU (سال اول) چندان بالا نیست: خالص
                ماهانه حدود <strong className="text-amber-300">۲۴,۷۴۲ DKK</strong>{' '}
                (≈۳,۳۱۷ €). متخصصان خالص حدود{' '}
                <strong className="text-amber-300">۳۶,۰۶۳ DKK</strong>{' '}
                (≈۴,۸۳۴ €) دریافت می‌کنند. دوره{' '}
                <strong>Evalueringsansættelse</strong> برای پزشکان{' '}
                <strong>۱۲ ماه</strong> و برای پرستاران{' '}
                <strong>۶ ماه</strong> است و حقوق‌دار محسوب می‌شود. برای
                پزشکان غیرمتخصص، این دوره معادل KBU دانمارکی است. پرستاران
                نیز میانگین حدود ۵۵۴,۰۰۰ DKK ناخالص سالانه دریافت می‌کنند.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-center text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="p-2 text-right font-bold">نقش</th>
                      <th className="p-2 font-bold text-amber-300">
                        خالص ماهانه (DKK)
                      </th>
                      <th className="p-2 font-bold text-emerald-300">
                        ناخالص سالانه (DKK)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right font-bold text-white">
                        KBU (سال اول)
                      </td>
                      <td className="p-2 font-mono">۲۴,۷۴۲</td>
                      <td className="p-2 font-mono">۴۶۰,۰۰۰</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right font-bold text-white">
                        متخصص (Speciallæge)
                      </td>
                      <td className="p-2 font-mono">۳۶,۰۶۳</td>
                      <td className="p-2 font-mono">۷۰۰,۰۰۰</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-bold text-white">
                        پرستار (میانگین)
                      </td>
                      <td className="p-2 font-mono">≈ ۲۹,۰۰۰</td>
                      <td className="p-2 font-mono">۵۵۴,۰۰۰</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* بخش ۵ — هزینه زندگی */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-rose-400" />
                <h3 className="text-lg font-black text-white">
                  ۵. هزینه زندگی در کپنهاگ (۲۰۲۶)
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                کپنهاگ یکی از گران‌ترین شهرهای اسکاندیناوی است. اجاره یک
                آپارتمان یک‌خوابه در مرکز شهر حدود{' '}
                <strong className="text-amber-300">۱,۶۷۰ €</strong> در ماه
                است و هزینه ماهانه یک فرد مجرد (شامل اجاره) حدود{' '}
                <strong>۲,۸۵۰ €</strong> برآورد می‌شود. با حقوق خالص KBU
                (≈۳,۳۱۷ €)، زندگی در کپنهاگ ممکن است فشرده باشد، اما
                متخصصان و پرستاران با تجربه وضعیت بهتری دارند. شهرهای
                آرهوس و اودنسه هزینه‌های کمی پایین‌تری دارند.
              </p>
            </article>

            {/* بخش ۶ — خانواده */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۶. الحاق خانواده: چرا Positive List مزیت دارد
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                یکی از مهم‌ترین تفاوت‌های مسیرها در ۲۰۲۶ این است که افرادی
                که تحت طرح配额授权 قرار می‌گیرند،{' '}
                <strong className="text-rose-300">
                  اعضای خانواده همراه آن‌ها نیز نمی‌توانند بر همان اساس اقامت
                  بگیرند
                </strong>
                . اما اگر اقامت از طریق Positive List یا سایر طرح‌های کاری
                SIRI دریافت شود، الحاق خانواده معمولاً امکان‌پذیر است و همسر
                حق کار دارد. بنابراین انتخاب مسیر درست، نه‌تنها بر آینده
                شغلی، بلکه بر زندگی خانوادگی نیز تأثیر مستقیم دارد.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ========== چک‌لیست مدارک ========== */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                مدارک مسیر Positive List در ۲۰۲۶
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                پیشنهاد شغلی، کلید ورود در سال ۲۰۲۶ است
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedChecklist ? (
                <Check className="w-4 h-4 text-rose-400" />
              ) : (
                <Copy className="w-4 h-4" />
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
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  checkedDocs[doc.id]
                    ? 'bg-rose-950/20 border-rose-500/40 text-white'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 text-slate-200'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-black/40 shrink-0">
                  {checkedDocs[doc.id] && (
                    <Check className="w-3.5 h-3.5 text-rose-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{doc.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== سوالات متداول ========== */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              پرسش‌های متداول کادر درمان درباره دانمارک ۲۰۲۶
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-right font-bold text-sm text-white hover:text-rose-300 transition cursor-pointer gap-3"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-rose-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-7 border-t border-white/5 text-justify">
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
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-r from-rose-950/40 to-red-950/40 border border-rose-500/30 p-8">
            <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              مسیر جایگزین ۲۰۲۶ را با دیاکو برنامه‌ریزی کنید
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-6">
              با بسته شدن مسیر授权 بدون پیشنهاد شغلی، دریافت پیشنهاد شغلی از
              طریق Positive List اولویت اول است. تیم دیاکو پرونده شما را از
              جاب‌آفر تا Evalueringsansættelse و آزمون زبان همراهی می‌کند.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black px-6 py-3 text-sm transition cursor-pointer shadow-lg"
              >
                ارزیابی مسیر Positive List
              </button>
              <button
                type="button"
                onClick={onBackToHome}
                className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-3 text-sm font-bold text-white transition cursor-pointer"
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

export default MedicalDenmarkPage;