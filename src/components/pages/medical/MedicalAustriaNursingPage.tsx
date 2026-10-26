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
  HeartPulse,
  GraduationCap,
  Award,
  ShieldCheck,
  Building2,
  BadgeCheck,
  Users,
  Home,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  MapPin,
  Calendar,
  Briefcase,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

// ✅ SWÖ-KV 2026: پایه حقوق DGKP + Pflegebonus
const SALARY_2026 = {
  baseMin: 3_210.96,
  baseWithBonusMin: 3_346.46,
  baseWithBonusMax: 3_586.39,
  shiftAllowanceApprox: 300,
  annualPayments: 14,
} as const;

export const MedicalAustriaNursingPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  // ==================== SEO + AIO ====================
  useSeo({
    title: 'مهاجرت پرستاران به اتریش ۲۰۲۶ | حقوق ۳,۳۴۶ € و RWR کارت',
    description:
      'راهنمای جامع مهاجرت پرستاران به اتریش ۲۰۲۶؛ حقوق ۳,۳۴۶–۳,۵۸۶ € (۱۴ نوبت)، دریافت RWR کارت پیش از پایان Nostrifizierung، دوره ۹ ماهه FH Campus Wien، زبان B2 و مسیر اقامت دائم ۲۱ ماهه. ارزیابی فوری.',
    canonical: '/guides/nursing-austria-nostrifizierung',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'مهاجرت پرستاران به اتریش ۲۰۲۶',
      'حقوق پرستار در اتریش ۲۰۲۶',
      'نوستریفیکاسیون پرستاری اتریش Nostrifizierung',
      'کارت قرمز سفید قرمز پرستاران',
      'FH Campus Wien دوره پرستاری',
      'قانون GuKG اتریش',
      'Rot-Weiß-Rot Karte Pflege 2026',
      'زبان آلمانی B2 پرستاری اتریش',
      'دفتر دیاکو در وین',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/nursing-austria-nostrifizierung#article',
          headline:
            'راهنمای جامع مهاجرت پرستاران به اتریش ۲۰۲۶: حقوق، Nostrifizierung و RWR کارت',
          description:
            'تحلیل کامل قوانین ۲۰۲۶ شامل حقوق SWÖ-KV، دوره ۹ ماهه FH Campus Wien، امکان دریافت RWR کارت پیش از Nostrifizierung، زبان B2 و مسیر اقامت دائم پس از ۲۱ ماه.',
          image: [
            'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
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
            { '@type': 'Thing', name: 'Nursing in Austria' },
            { '@type': 'Thing', name: 'Nostrifizierung' },
            { '@type': 'Thing', name: 'Rot-Weiß-Rot Karte' },
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
          '@id': 'https://www.dia-co.ir/guides/nursing-austria-nostrifizierung#howto',
          name: 'مراحل مهاجرت پرستار به اتریش در ۲۰۲۶',
          description:
            'فرآیند گام‌به‌گام از ارزیابی مدرک تا دریافت RWR کارت و اقامت دائم.',
          totalTime: 'P9M',
          estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: '0' },
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'ارزیابی مدرک در FH Campus Wien',
              text: 'ارسال مدارک تحصیلی و ریزنمرات به FH Campus Wien برای بررسی انطباق با استاندارد DGKP اتریش.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'دریافت Bescheid و تعیین دوره تکمیلی',
              text: 'اداره آموزش عالی اتریش نامه نقص مدرک (Bescheid) صادر می‌کند که معمولاً شامل دوره ۹ ماهه زبان و تطبیق بالینی است.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'درخواست RWR کارت پیش از تکمیل Nostrifizierung',
              text: 'طبق تسهیلات ۲۰۲۶، می‌توان RWR کارت را قبل از پایان Nostrifizierung دریافت کرد؛ ورود به اتریش برای شرکت در دوره FH Campus Wien.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'ثبت در Gesundheitsberuferegister و شروع کار رسمی',
              text: 'پس از تکمیل دوره و اثبات B2، ثبت در رجیستر سلامت و عقد قرارداد رسمی پرستار (DGKP) با حقوق کامل.',
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'درخواست RWR Plus پس از ۲۱ ماه',
              text: 'پس از ۲۱ ماه کار qualifiziert در ۲۴ ماه گذشته، RWR Plus با دسترسی آزاد به بازار کار دریافت می‌شود.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/nursing-austria-nostrifizierung#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حقوق پرستار در اتریش در سال ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بر اساس SWÖ-KV 2026، حقوق پایه پرستار دیپلمه (DGKP) از ۳,۲۱۰.۹۶ یورو در ماه (بدون پاداش) آغاز می‌شود. با احتساب Pflegebonus ۲۰۲۶، حداقل حقوق ماهانه ۳,۳۴۶.۴۶ یورو و حداکثر ۳,۵۸۶.۳۹ یورو است. حقوق سالانه ۱۴ نوبت پرداخت می‌شود (۱۲ ماه + پاداش تابستان + پاداش کریسمس).',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا می‌توان قبل از اتمام Nostrifizierung RWR کارت گرفت؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. از سال ۲۰۲۶، اداره مهاجرت اتریش اجازه می‌دهد RWR کارت پیش از تکمیل کامل فرآیند Nostrifizierung صادر شود. این تسهیل به‌ویژه برای پرستارانی طراحی شده که در دوره ۹ ماهه FH Campus Wien شرکت می‌کنند و می‌توانند پیش از دریافت تأییدیه نهایی، وارد اتریش شوند.',
              },
            },
            {
              '@type': 'Question',
              name: 'سطح زبان آلمانی مورد نیاز برای پرستاری در اتریش چیست؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای ثبت در Gesundheitsberuferegister و کار به‌عنوان DGKP، مدرک B2 زبان آلمانی از مؤسسات معتبر مانند ÖSD، Goethe، telc یا دانشگاه وین الزامی است. برای دوره ۹ ماهه FH Campus Wien، ممکن است با سطح B1 نیز پذیرش اولیه بگیرید، اما برای ثبت نهایی B2 ضروری است.',
              },
            },
            {
              '@type': 'Question',
              name: 'مسیر اقامت دائم اتریش برای پرستاران چقدر طول می‌کشد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'پس از ۲۱ ماه کار qualifiziert با RWR کارت در ۲۴ ماه گذشته، می‌توان RWR Plus را دریافت کرد که دسترسی آزاد به بازار کار و اقامت ۱۲ ماهه قابل تمدید می‌دهد. اقامت دائم بلندمدت (Daueraufenthalt-EU) معمولاً پس از ۵ سال اقامت قانونی قابل درخواست است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا پرستاران در اتریش می‌توانند خانواده خود را بیاورند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. دارندگان RWR کارت می‌توانند برای همسر و فرزندان تحت تکفل درخواست الحاق خانواده (Familienzusammenführung) دهند. همسر حق کار فوری در اتریش را دریافت می‌کند و فرزندان به مدرسه و آموزش رایگان دسترسی دارند.',
              },
            },
            {
              '@type': 'Question',
              name: 'چرا پرستاران در اتریش از سال ۲۰۲۶ به عنوان Schwerarbeiter شناخته می‌شوند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'از ۱ ژانویه ۲۰۲۶، پرستاران در اتریش رسماً به عنوان کارگران سنگین (Schwerarbeiter) شناخته می‌شوند. این وضعیت امکان بازنشستگی زودتر (حدود ۶۰ سال) را فراهم می‌کند و جذابیت شغلی پرستاری را افزایش می‌دهد.',
              },
            },
          ],
        },
      ],
    },
  });

  // ==================== STATE ====================
  const [experience, setExperience] = useState<number>(4);
  const [shiftBonus, setShiftBonus] = useState<boolean>(true);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ==================== CALCULATOR ====================
  const calc = useMemo(() => {
    const baseWithBonus = Math.min(
      SALARY_2026.baseWithBonusMin + Math.max(0, experience - 1) * 85,
      SALARY_2026.baseWithBonusMax
    );
    const shiftExtra = shiftBonus ? SALARY_2026.shiftAllowanceApprox : 0;
    const totalGross = Math.round(baseWithBonus + shiftExtra);
    const annualGross = totalGross * SALARY_2026.annualPayments;
    const monthlyNet = Math.round(totalGross * 0.70);

    return {
      baseWithBonus: Math.round(baseWithBonus),
      totalGross,
      annualGross,
      monthlyNet,
    };
  }, [experience, shiftBonus]);

  // ==================== DOCUMENTS ====================
  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'دانشنامه لیسانس پرستاری و ریزنمرات جامع (حداقل ۳ سال تحصیل)',
      desc: 'ترجمه رسمی به آلمانی با تأیید دادگستری، امور خارجه و سفارت اتریش (Beglaubigung). مدارک باید حداقل ۴,۶۰۰ ساعت تئوری و عملی را نشان دهند.',
    },
    {
      id: 'doc-2',
      title: 'گواهی شرح وظایف و ساعات بالینی با مهر دانشگاه و بیمارستان',
      desc: 'شامل جزئیات بخش‌های بالینی، ساعات کارآموزی و مهارت‌های کسب‌شده؛ برای ارزیابی انطباق با کوریکولوم DGKP اتریش ضروری است.',
    },
    {
      id: 'doc-3',
      title: 'مدرک رسمی زبان آلمانی B2 (ÖSD / Goethe / telc / دانشگاه وین)',
      desc: 'برای ثبت در Gesundheitsberuferegister و دریافت مجوز کار مستقل الزامی است. برای دوره FH Campus Wien ممکن است B1 کافی باشد.',
    },
    {
      id: 'doc-4',
      title: 'گواهی Good Standing از نظام پرستاری کشور مبدأ',
      desc: 'نشان‌دهنده عدم سوءپیشینه حرفه‌ای و مجاز بودن به فعالیت مراقبتی در کشور مبدأ.',
    },
    {
      id: 'doc-5',
      title: 'قرارداد یا پیش‌پذیرش بیمارستان / خانه سالمندان اتریشی (Einstellungszusage)',
      desc: 'برای درخواست RWR کارت ضروری است. دفتر وین دیاکو در تنظیم و تطبیق قرارداد با SWÖ-KV کمک می‌کند.',
    },
    {
      id: 'doc-6',
      title: 'گواهی عدم سوءپیشینه کیفری با تأییدیه کنسولی یا Apostille',
      desc: 'برای اکثر ملیت‌ها الزامی است و باید طبق قوانین بین‌المللی قانونی‌سازی شود.',
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
      q: 'حقوق پرستار در اتریش در سال ۲۰۲۶ چقدر است؟',
      a: 'بر اساس SWÖ-KV 2026، حقوق پایه پرستار دیپلمه (DGKP) از ۳,۲۱۰.۹۶ یورو در ماه (بدون پاداش) آغاز می‌شود. با احتساب Pflegebonus ۲۰۲۶، حداقل حقوق ماهانه ۳,۳۴۶.۴۶ یورو و حداکثر ۳,۵۸۶.۳۹ یورو است. حقوق سالانه ۱۴ نوبت پرداخت می‌شود (۱۲ ماه + پاداش تابستان + پاداش کریسمس با مالیات ۶٪). حق شیفت شب و اضافه کار بیمارستانی معمولاً ۳۰۰ یورو در ماه به این مبلغ اضافه می‌کند.',
    },
    {
      q: 'آیا می‌توان قبل از اتمام Nostrifizierung RWR کارت گرفت؟',
      a: 'بله. از سال ۲۰۲۶، اداره مهاجرت اتریش اجازه می‌دهد RWR کارت پیش از تکمیل کامل فرآیند Nostrifizierung صادر شود. این تسهیل به‌ویژه برای پرستارانی طراحی شده که در دوره ۹ ماهه FH Campus Wien شرکت می‌کنند و می‌توانند پیش از دریافت تأییدیه نهایی، وارد اتریش شوند و در دوره زبان و تطبیق بالینی شرکت کنند.',
    },
    {
      q: 'سطح زبان آلمانی مورد نیاز برای پرستاری در اتریش چیست؟',
      a: 'برای ثبت در Gesundheitsberuferegister و کار به‌عنوان DGKP، مدرک B2 زبان آلمانی از مؤسسات معتبر مانند ÖSD، Goethe، telc یا دانشگاه وین الزامی است. برای دوره ۹ ماهه FH Campus Wien، ممکن است با سطح B1 نیز پذیرش اولیه بگیرید، اما برای ثبت نهایی و کار مستقل، B2 ضروری است.',
    },
    {
      q: 'مسیر اقامت دائم اتریش برای پرستاران چقدر طول می‌کشد؟',
      a: 'پس از ۲۱ ماه کار qualifiziert با RWR کارت در ۲۴ ماه گذشته، می‌توان RWR Plus را دریافت کرد که دسترسی آزاد به بازار کار و اقامت ۱۲ ماهه قابل تمدید می‌دهد. اقامت دائم بلندمدت (Daueraufenthalt-EU) معمولاً پس از ۵ سال اقامت قانونی قابل درخواست است. پرستاران از سال ۲۰۲۶ به عنوان Schwerarbeiter شناخته می‌شوند و می‌توانند زودتر (حدود ۶۰ سال) بازنشسته شوند.',
    },
    {
      q: 'آیا پرستاران در اتریش می‌توانند خانواده خود را بیاورند؟',
      a: 'بله. دارندگان RWR کارت می‌توانند برای همسر و فرزندان تحت تکفل درخواست الحاق خانواده (Familienzusammenführung) دهند. همسر حق کار فوری در اتریش را دریافت می‌کند و فرزندان به مدرسه و آموزش رایگان دسترسی دارند. والدین تحت تکفل نیز در صورت اثبات وابستگی مالی واجد شرایط هستند.',
    },
    {
      q: 'چرا پرستاران در اتریش از سال ۲۰۲۶ به عنوان Schwerarbeiter شناخته می‌شوند؟',
      a: 'از ۱ ژانویه ۲۰۲۶، پرستاران در اتریش رسماً به عنوان کارگران سنگین (Schwerarbeiter) شناخته می‌شوند. این وضعیت امکان بازنشستگی زودتر (حدود ۶۰ سال) را فراهم می‌کند و جذابیت شغلی پرستاری را برای نیروی کار داخلی و خارجی افزایش می‌دهد. همچنین نشان‌دهنده به‌رسمیت شناختن فشار جسمی و روانی بالای حرفه پرستاری در سیستم سلامت اتریش است.',
    },
    {
      q: 'آیا مردان بدون کارت پایان خدمت می‌توانند برای پرستاری اتریش اقدام کنند؟',
      a: 'خیر. ارائه کارت پایان خدمت یا معافیت دائم برای آقایان جهت ترجمه مدارک و صدور گذرنامه برای اتریش الزامی است. این یک پیش‌شرط اداری برای اخذ پاسپورت معتبر و شروع فرآیند ویزا است.',
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
            <span className="text-white font-semibold">پرستاران به اتریش ۲۰۲۶</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر مقاصد درمانی:</span>
            {[
              { key: 'medical-germany', label: '🇩🇪 پزشکان آلمان' },
              { key: 'medical-finland', label: '🇫🇮 پزشکان فنلاند' },
              { key: 'medical-denmark', label: '🇩🇰 کادر درمان دانمارک' },
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

      {/* ========== هیرو ========== */}
      <section className="relative overflow-hidden pt-8 pb-14 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-full bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5" />
                  برنامه اختصاصی دفتر وین دیاکو
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                  RWR کارت پیش از Nostrifizierung — تسهیل ۲۰۲۶
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                مهاجرت پرستاران به اتریش ۲۰۲۶
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-red-300 via-rose-300 to-amber-300">
                  حقوق ۱۴ نوبته، RWR کارت و مسیر اقامت دائم
                </span>
              </h1>

              <div
                data-ai-answer
                className="speakable-summary rounded-2xl bg-[#0e2a35] border border-red-500/30 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg"
              >
                <div className="font-bold text-red-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  خلاصه فرآیند ۲۰۲۶:
                </div>
                اتریش تا ۲۰۳۰ به حدود{' '}
                <strong className="text-amber-300">
                  ۴۰,۰۰۰ پرستار دیپلمه
                </strong>{' '}
                نیاز دارد. مسیر ۲۰۲۶ شامل ارزیابی مدرک در{' '}
                <strong>FH Campus Wien</strong>، دوره ۹ ماهه زبان و تطبیق بالینی،
                و امکان دریافت{' '}
                <strong className="text-emerald-300">
                  RWR کارت پیش از پایان Nostrifizierung
                </strong>{' '}
                است. حقوق پایه DGKP با Pflegebonus از{' '}
                <strong className="text-amber-300">۳,۳۴۶ €</strong> در ماه آغاز
                می‌شود و سالانه ۱۴ نوبت پرداخت می‌گردد.
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  ارزیابی سوابق پرستاری با دفتر وین دیاکو
                </button>
                <a
                  href="https://wa.me/436889763256"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-red-400" />
                  واتس‌اپ دفتر اتریش: ۴۳۶۸۸۹۷۶۳۲۵۶+
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="پرستار در بیمارستان مدرن اتریش — مهاجرت کادر درمان و نوستریفیکاسیون پرستاری ۲۰۲۶"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-60" />
                <figcaption className="absolute bottom-3 right-3 left-3 bg-[#081e26]/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>بیمارستان‌های وین، گراتس، زالتسبورگ و اینسبروک</span>
                  <span className="text-red-400 font-bold">
                    ۱۴ نوبت حقوق در سال
                  </span>
                </figcaption>
              </figure>
              <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                پوشش کامل امور اداری و ثبت اقامت توسط وکلای دفتر وین دیاکو
              </p>
            </div>
          </div>

          {/* کارت‌های آمار کلیدی ۲۰۲۶ */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-amber-300 font-bold">
                حقوق پایه DGKP + Pflegebonus
              </span>
              <div className="speakable-salary text-xl font-black text-white mt-1">
                ۳,۳۴۶–۳,۵۸۶ €
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                SWÖ-KV 2026 (۱۴ نوبت در سال)
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-emerald-300 font-bold">
                RWR کارت پیش از Nostrifizierung
              </span>
              <div className="text-xl font-black text-white mt-1">بله</div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                تسهیل جدید از ۲۰۲۶
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-sky-300 font-bold">
                دوره FH Campus Wien
              </span>
              <div className="text-xl font-black text-white mt-1">۹ ماه</div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                زبان + تطبیق بالینی
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-purple-300 font-bold">
                RWR Plus (اقامت دائم)
              </span>
              <div className="text-xl font-black text-white mt-1">۲۱ ماه</div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                دسترسی آزاد به بازار کار
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
              <span className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
                محاسبه‌گر SWÖ-KV 2026
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                برآورد درآمد پرستار DGKP با احتساب ۱۴ نوبت حقوق
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  سابقه کار بالینی: ({experience} سال)
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={experience}
                  onChange={(e) => setExperience(Number(e.target.value))}
                  className="w-full accent-red-400 cursor-pointer mt-2"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>۱ سال</span>
                  <span className="text-red-400 font-bold">
                    پایه ۲۰۲۶: ۳,۳۴۶ €
                  </span>
                  <span>۱۲ سال</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="shift"
                  checked={shiftBonus}
                  onChange={(e) => setShiftBonus(e.target.checked)}
                  className="h-4 w-4 rounded accent-red-500 cursor-pointer"
                />
                <label
                  htmlFor="shift"
                  className="text-xs font-bold text-slate-200 cursor-pointer"
                >
                  شامل حق شیفت شب و اضافه کار (≈۳۰۰ €/ماه)
                </label>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 bg-black/30 rounded-2xl p-5 border border-white/10">
              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">
                  حقوق ماهانه ناخالص
                </span>
                <span className="text-xl sm:text-2xl font-black text-red-400 block mt-1">
                  {calc.totalGross.toLocaleString('fa-IR')} €
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  شامل Pflegebonus
                </span>
              </div>

              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">
                  درآمد سالانه (۱۴ نوبت)
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-300 block mt-1">
                  {calc.annualGross.toLocaleString('fa-IR')} €
                </span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">
                  + پاداش تابستان و کریسمس
                </span>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 block">
                  حقوق خالص ماهانه (تخمینی)
                </span>
                <span className="text-xl sm:text-2xl font-black text-white block mt-1">
                  ≈ {calc.monthlyNet.toLocaleString('fa-IR')} €
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  بیمه سلامت خانواده
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
            هر آنچه باید درباره پرستاری در اتریش ۲۰۲۶ بدانید
          </h2>
          <p className="text-center text-xs text-slate-400 mb-10 max-w-2xl mx-auto">
            تحلیل قوانین GuKG، تسهیلات RWR کارت، دوره FH Campus Wien، زبان B2
            و مسیر اقامت دائم برای پرستاران.
          </p>

          <div className="space-y-10">
            {/* بخش ۱ — چرا اتریش */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۱. چرا اتریش مقصد اول پرستاران در ۲۰۲۶ است؟
                </h3>
              </div>
              <p className="speakable-answer text-xs leading-7 text-slate-300 text-justify">
                اتریش با بحران ساختاری کمبود پرستار مواجه است و بر اساس
                پیش‌بینی‌های رسمی، تا سال ۲۰۳۰ به حدود{' '}
                <strong className="text-amber-300">
                  ۴۰,۰۰۰ پرستار دیپلمه (DGKP)
                </strong>{' '}
                نیاز خواهد داشت[reference:2]. این کمبود، پرستاران را در فهرست
                سراسری مشاغل کمبود نیرو (Mangelberufsliste 2026) قرار داده و
                مسیر دریافت RWR کارت را هموار کرده است[reference:3]. برخلاف
                آلمان که فرآیند معادل‌سازی گاه چند سال طول می‌کشد، اتریش با
                دوره ۹ ماهه FH Campus Wien و امکان دریافت RWR کارت پیش از
                تکمیل Nostrifizierung، مسیر را به‌طور قابل‌توجهی کوتاه کرده
                است. حقوق ۱۴ نوبته و بیمه سلامت رایگان خانواده، اتریش را به
                یکی از جذاب‌ترین مقاصد پرستاری در اروپای مرکزی تبدیل کرده
                است.
              </p>
              <div className="mt-5 grid sm:grid-cols-3 gap-3 text-center text-[11px]">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <div className="font-black text-emerald-300">۴۰,۰۰۰</div>
                  <div className="text-slate-400 mt-0.5">
                    نیاز پرستار تا ۲۰۳۰
                  </div>
                </div>
                <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3">
                  <div className="font-black text-sky-300">۱۴ نوبت</div>
                  <div className="text-slate-400 mt-0.5">
                    حقوق سالانه
                  </div>
                </div>
                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3">
                  <div className="font-black text-purple-300">Schwerarbeiter</div>
                  <div className="text-slate-400 mt-0.5">
                    بازنشستگی زودتر از ۲۰۲۶
                  </div>
                </div>
              </div>
            </article>

            {/* تصویر ویژه — محیط بیمارستان */}
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
                srcSet="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 800px"
                alt="تیم پزشکی و پرستاری در بیمارستان اتریش — محیط کار پرستاران بین‌المللی ۲۰۲۶"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-52 w-full object-cover sm:h-64"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                بیمارستان‌های اتریش؛ محیط کاری چندفرهنگی با استانداردهای بالای
                ایمنی بیمار (منبع: Unsplash)
              </figcaption>
            </figure>

            {/* بخش ۲ — حقوق و مزایا */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-white">
                  ۲. ساختار حقوق ۲۰۲۶: ۱۴ نوبت، Pflegebonus و حق شیفت
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                حقوق پرستاران در اتریش بر اساس قرارداد جمعی SWÖ-KV تعیین
                می‌شود و سالانه{' '}
                <strong className="text-amber-300">۱۴ نوبت</strong> پرداخت
                می‌گردد: ۱۲ ماه حقوق عادی به‌علاوه پاداش تابستان (Urlaubsgeld)
                و پاداش کریسمس (Weihnachtsgeld) که مشمول مالیات ترجیحی ۶٪
                هستند. در سال ۲۰۲۶، حقوق پایه DGKP بدون پاداش از{' '}
                <strong>۳,۲۱۰.۹۶ €</strong> و با Pflegebonus از{' '}
                <strong>۳,۳۴۶.۴۶ €</strong> آغاز می‌شود و برای پرستاران
                باتجربه تا <strong>۳,۵۸۶.۳۹ €</strong> در ماه می‌رسد[reference:4].
                حق شیفت شب، اضافه کار و کار در روزهای تعطیل معمولاً حدود ۳۰۰
                € در ماه به این مبلغ اضافه می‌کند.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-center text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="p-2 text-right font-bold">جزء حقوق</th>
                      <th className="p-2 font-bold text-amber-300">
                        مبلغ (€/ماه)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">حقوق پایه DGKP (SWÖ-KV)</td>
                      <td className="p-2 font-mono font-bold text-white">
                        ۳,۲۱۰.۹۶
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">Pflegebonus ۲۰۲۶</td>
                      <td className="p-2 font-mono">+ ۱۳۵.۵۰</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">حق شیفت / اضافه کار (تقریبی)</td>
                      <td className="p-2 font-mono">+ ۳۰۰.۰۰</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-bold text-amber-300">
                        مجموع ناخالص ماهانه (با شیفت)
                      </td>
                      <td className="p-2 font-mono font-black text-amber-300">
                        ≈ ۳,۶۴۶ €
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* بخش ۳ — Nostrifizierung و RWR کارت */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  ۳. Nostrifizierung در ۲۰۲۶: FH Campus Wien و RWR کارت زودهنگام
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                برای پرستاران دارای مدرک غیراتریشی، فرآیند{' '}
                <strong>Nostrifizierung</strong> (معادل‌سازی) در{' '}
                <strong>FH Campus Wien</strong> انجام می‌شود. بر اساس
                مقررات جدید از ترم زمستان ۲۰۲۳/۲۰۲۴، یک{' '}
                <strong className="text-emerald-300">
                  دوره ۹ ماهه شامل زبان آلمانی تا سطح B1، ماژول‌های علوم
                  پرستاری، سیستم سلامت اتریش و جهت‌گیری اجتماعی
                </strong>{' '}
                برای پرستاران دیپلمه از کشورهای ثالث ارائه می‌شود[reference:5].
                مهم‌ترین تسهیل ۲۰۲۶ این است که{' '}
                <strong className="text-amber-300">
                  RWR کارت می‌تواند پیش از تکمیل کامل Nostrifizierung صادر شود
                </strong>
                ，به پرستاران اجازه می‌دهد پیش از دریافت تأییدیه نهایی، وارد
                اتریش شوند و در دوره شرکت کنند[reference:6]. این تغییر
                برنامه‌ریزی مهاجرت را به‌طور قابل‌توجهی قابل‌پیش‌بینی‌تر
                کرده است.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'FH Campus Wien متولی',
                  'دوره ۹ ماهه (زبان + بالینی)',
                  'RWR کارت پیش از تکمیل',
                  'ثبت نهایی در Gesundheitsberuferegister',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-[10px] font-bold text-sky-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {/* تصویر ویژه — FH Campus Wien / آموزش */}
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
                srcSet="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 800px"
                alt="آموزش پرستاری و تجهیزات پزشکی — دوره تطبیق بالینی FH Campus Wien اتریش"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover sm:h-56"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                دوره ۹ ماهه FH Campus Wien؛ زبان آلمانی، علوم پرستاری و تطبیق
                بالینی (منبع: Unsplash)
              </figcaption>
            </figure>

            {/* بخش ۴ — زبان B2 */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-black text-white">
                  ۴. زبان آلمانی B2: شرط قطعی ثبت در رجیستر سلامت
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                برای ثبت در{' '}
                <strong>Gesundheitsberuferegister</strong> و کار مستقل به‌عنوان
                DGKP، مدرک <strong className="text-purple-300">B2</strong>{' '}
                زبان آلمانی از مؤسسات معتبر مانند ÖSD، Goethe، telc یا
                دانشگاه وین الزامی است[reference:7]. مدارک زبان باید توسط
                مترجم رسمی به آلمانی ترجمه شوند و صرفاً گواهی حضور در دوره
                کافی نیست. برای پرستاران دستیار (Pflegeassistenz)، سطح B1
                نیز پذیرفته می‌شود، اما برای DGKP که هدف اصلی این صفحه است،
                B2 حداقل قانونی است. توصیه می‌شود متقاضیان قبل از شروع
                فرآیند Nostrifizierung، سطح زبان خود را به B1 برسانند و سپس
                در دوره ۹ ماهه FH Campus Wien به B2 دست یابند.
              </p>
            </article>

            {/* بخش ۵ — خانواده */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-rose-400" />
                <h3 className="text-lg font-black text-white">
                  ۵. الحاق خانواده و حق کار همسر
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                دارندگان RWR کارت می‌توانند برای همسر و فرزندان تحت تکفل
                درخواست <strong>Familienzusammenführung</strong> (الحاق
                خانواده) دهند. همسر{' '}
                <strong className="text-rose-300">
                  حق کار فوری در اتریش
                </strong>{' '}
                را دریافت می‌کند و می‌تواند در هر شغلی مشغول شود. فرزندان به
                مدرسه و آموزش رایگان دسترسی دارند و والدین تحت تکفل نیز در
                صورت اثبات وابستگی مالی واجد شرایط هستند. بیمه سلامت اتریش
                (ÖGK) خانواده را به‌طور رایگان تحت پوشش قرار می‌دهد.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'همسر: حق کار فوری',
                  'فرزندان: تحصیل رایگان',
                  'بیمه سلامت خانواده: رایگان',
                  'والدین تحت تکفل: واجد شرایط',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text-[10px] font-bold text-rose-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {/* بخش ۶ — Schwerarbeiter */}
            <article className="rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.06] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-black text-emerald-200">
                  مزیت جدید ۲۰۲۶: پرستاران به‌عنوان Schwerarbeiter
                </h3>
              </div>
              <p className="text-xs leading-7 text-emerald-100/85 text-justify">
                از ۱ ژانویه ۲۰۲۶، پرستاران در اتریش رسماً به‌عنوان{' '}
                <strong>کارگران سنگین (Schwerarbeiter)</strong> شناخته
                می‌شوند[reference:8]. این وضعیت امکان بازنشستگی زودتر (حدود
                ۶۰ سال) را فراهم می‌کند و نشان‌دهنده به‌رسمیت شناختن فشار
                جسمی و روانی بالای حرفه پرستاری است. برای پرستاران
                بین‌المللی، این مزیت جذابیت بلندمدت اتریش را در مقایسه با
                برخی مقاصد دیگر اروپایی افزایش می‌دهد.
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
                مدارک مورد نیاز برای Nostrifizierung پرستاری ۲۰۲۶
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                کلیه مدارک در دفتر وین دیاکو پیش از تسلیم به مراجع دولتی
                بازبینی نهایی می‌شوند
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedChecklist ? (
                <Check className="w-4 h-4 text-emerald-400" />
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
                    ? 'bg-red-950/20 border-red-500/40 text-white'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 text-slate-200'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-black/40 shrink-0">
                  {checkedDocs[doc.id] && (
                    <Check className="w-3.5 h-3.5 text-red-400" />
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
              پرسش‌های متداول پرستاران درباره اتریش ۲۰۲۶
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
                    className="w-full flex items-center justify-between p-4 text-right font-bold text-sm text-white hover:text-red-300 transition cursor-pointer gap-3"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-red-400' : ''
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
          <div className="rounded-3xl bg-gradient-to-r from-red-950/40 to-rose-950/40 border border-red-500/30 p-8">
            <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              شروع مسیر پرستاری در اتریش با نظارت دفتر وین دیاکو
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-6">
              تیم دپارتمان درمان دیاکو با تسلط بر قوانین ۲۰۲۶ — از SWÖ-KV و
              FH Campus Wien تا RWR کارت و Gesundheitsberuferegister — پرونده
              شما را از ارزیابی مدرک تا اقامت دائم همراهی می‌کند.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-xl bg-red-500 hover:bg-red-400 text-white font-black px-6 py-3 text-sm transition cursor-pointer shadow-lg"
              >
                تکمیل فرم ارزیابی مهاجرت به اتریش
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

export default MedicalAustriaNursingPage;