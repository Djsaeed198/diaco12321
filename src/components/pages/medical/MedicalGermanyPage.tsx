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
  GraduationCap,
  Award,
  ShieldCheck,
  Building,
  FileCheck,
  HeartPulse,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

const MEDICAL_SALARIES_GERMANY_2026 = {
  assistantDoctorMinEur: 62000,
  assistantDoctorMaxEur: 78000,
  specialistMinEur: 85000,
  specialistMaxEur: 120000,
  seniorDoctorEur: 140000,
  nurseMinEur: 38000,
  nurseMaxEur: 48000,
} as const;

export const MedicalGermanyPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  // SEO + Schema
  useSeo({
    title: 'مهاجرت کادر درمان به آلمان ۲۰۲۶ | اخذ آپروباسیون و کار',
    description:
      'راهنمای جامع مهاجرت پزشکان، دندانپزشکان و پرستاران به آلمان ۲۰۲۶؛ شرایط آزمون FSP زبان تخصصی پزشکی، معادل‌سازی Approbation، ویزای کادر درمان و اقامت با دیاکو.',
    canonical: '/guides/medical-germany-approbation',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'مهاجرت کادر درمان به آلمان',
      'آپروباسیون آلمان ۲۰۲۶',
      'Approbation Deutschland',
      'آزمون FSP زبان پزشکی آلمان',
      'آزمون کنتنیس‌پروفونگ Kenntnisprüfung',
      'کار پزشکان در آلمان',
      'مجوز طبابت موقت Berufserlaubnis',
      'حقوق پزشکان در آلمان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/medical-germany-approbation#article',
          headline: 'راهنمای جامع مهاجرت کادر درمان و اخذ Approbation در آلمان ۲۰۲۶',
          description:
            'بررسی کامل مراحل معادل‌سازی مدرک پزشکی و دندانپزشکی در آلمان، آزمون زبان تخصصی FSP C1، دریافت پروانه طبابت دائم Approbation و حقوق کادر درمان.',
          image: [
            'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
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
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/medical-germany-approbation#howto',
          name: 'مراحل دریافت پروانه طبابت آپروباسیون در آلمان',
          description: 'گام‌های رسمی معادل‌سازی مدرک پزشکی و اشتغال در بیمارستان‌های آلمان',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'یادگیری زبان آلمانی تا سطح B2 عمومی',
              text: 'اخذ مدرک رسمی Goethe یا telc B2 در کشور مبدأ.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'تشکیل پرونده معادل‌سازی در اداره مربوطه ایالتی (Approbationsbehörde)',
              text: 'ارسال مدارک تحصیلی، ریزنمرات و گواهی صلاحیت حرفه‌ای Good Standing به آلمان.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'قبولی در آزمون زبان تخصصی پزشکی (Fachsprachenprüfung - FSP)',
              text: 'آزمون شبیه‌سازی مکالمه با بیمار، شرح حال‌گیری و نگارش گزارش بالینی در سطح C1 پزشکی.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'اخذ مجوز کار موقت Berufserlaubnis یا قبولی در Kenntnisprüfung',
              text: 'شروع طبابت تحت نظارت با دریافت حقوق رسمی تا صدور کامل Approbation دائم.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/medical-germany-approbation#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا بدون مدرک زبان C1 می‌توان برای مهاجرت پزشکی آلمان اقدام کرد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای تشکیل پرونده و ورود با ویزای معادل‌سازی (بند 16d قانون اقامت)، داشتن مدرک عمومی B2 آلمانی کافی است. آزمون زبان تخصصی C1 Medizin (FSP) در خاک آلمان و در نظام پزشکی ایالتی برگزار می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'حقوق پزشکان در آلمان در دوره معادل‌سازی و پس از آن چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'پزشک در دوره دستیاری (Assistenzarzt) با مجوز موقت ماهانه از ۵,۱۰۰ تا ۶,۴۰۰ یورو ناخالص دریافت می‌کند. پس از اخذ تخصص و آپروباسیون دائم این رقم به ۸,۰۰۰ تا بیش از ۱۰,۰۰۰ یورو در ماه افزایش می‌یابد.',
              },
            },
          ],
        },
      ],
    },
  });

  // State
  const [profession, setProfession] = useState<'gp' | 'specialist' | 'dentist' | 'nurse'>('gp');
  const [germanLevel, setGermanLevel] = useState<'A2' | 'B1' | 'B2' | 'C1'>('B1');
  const [experienceYears, setExperienceYears] = useState<number>(3);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculation
  const evaluation = useMemo(() => {
    let baseSalary = 5400;
    let jobTitle = 'پزشک رزیدنت / دستیار (Assistenzarzt)';
    if (profession === 'specialist') {
      baseSalary = 8200;
      jobTitle = 'پزشک متخصص (Facharzt)';
    } else if (profession === 'dentist') {
      baseSalary = 5900;
      jobTitle = 'دندانپزشک معادل‌سازی‌شده (Zahnarzt)';
    } else if (profession === 'nurse') {
      baseSalary = 3450;
      jobTitle = 'پرستار بالینی متخصص (Pflegefachkraft)';
    }

    const expBonus = Math.min(experienceYears * 180, 1500);
    const monthlyGross = baseSalary + expBonus;
    const monthlyNet = Math.round(monthlyGross * 0.62); // میانگین کسر مالیات کلاس ۱ آلمان (حدود ۳۸٪)
    const annualGross = monthlyGross * 12;

    let readinessScore = 50;
    if (germanLevel === 'C1') readinessScore += 45;
    else if (germanLevel === 'B2') readinessScore += 35;
    else if (germanLevel === 'B1') readinessScore += 18;
    else readinessScore += 5;

    return {
      monthlyGross,
      monthlyNet,
      annualGross,
      jobTitle,
      readinessScore: Math.min(readinessScore, 98),
    };
  }, [profession, germanLevel, experienceYears]);

  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'دانشنامه پزشکی/پرستاری و ریزنمرات تاییدشده وزارت بهداشت',
      desc: 'ترجمه رسمی به زبان آلمانی با تأیید دادگستری و وزارت امور خارجه و سفارت آلمان.',
    },
    {
      id: 'doc-2',
      title: 'گواهی عدم سوءپیشینه نظام پزشکی (Good Standing Certificate)',
      desc: 'صادره از سازمان نظام پزشکی با اعتبار حداکثر ۳ ماه، مبنی بر عدم محرومیت از طبابت.',
    },
    {
      id: 'doc-3',
      title: 'مدرک زبان آلمانی رسمی حداقل سطح B2 (Goethe / telc / ÖSD)',
      desc: 'شرط اصلی تشکیل پرونده در نظام پزشکی ایالت‌های آلمان و دریافت ویزای 16d.',
    },
    {
      id: 'doc-4',
      title: 'سرفصل دروس دانشگاهی (کوریکولوم تحصیلی مهر و موم‌شده)',
      desc: 'جهت بررسی تطابق ساعت‌های آموزش بالینی (Defizitbescheid) با دوره‌های پزشکی آلمان.',
    },
    {
      id: 'doc-5',
      title: 'گواهی سلامت جسمی و روانی برای طبابت (Ärztliche Bescheinigung)',
      desc: 'تایید عدم ابتلا به بیماری‌های مانع کار بالینی توسط پزشک معتمد.',
    },
  ];

  const handleCopy = () => {
    const text = DOCUMENTS.map((d, i) => `${i + 1}. ${d.title}\n   ${d.desc}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  const FAQS = [
    {
      q: 'آزمون زبان تخصصی پزشکی (FSP) شامل چه بخش‌هایی است؟',
      a: 'آزمون Fachsprachenprüfung (FSP) در نظام پزشکی هر ایالت برگزار می‌شود و ۶۰ دقیقه طول می‌کشد: ۲۰ دقیقه مصاحبه شبیه‌سازی‌شده پزشک با بیمار (شرح حال‌گیری)، ۲۰ دقیقه مستندسازی و نوشتن گزارش پرونده پزشکی (Arztbrief)، و ۲۰ دقیقه گفت‌وگوی علمی و تخصصی با دو پزشک اگزمینر آلمانی.',
    },
    {
      q: 'تفاوت پروانه موقت Berufserlaubnis با پروانه دائم Approbation چیست؟',
      a: 'پروانه موقت (Berufserlaubnis) به شما اجازه می‌دهد تا حداکثر ۲ سال در بیمارستان‌ها به عنوان پزشک دستیار با دریافت حقوق کامل طبابت کنید تا برای آزمون علمی نهایی (Kenntnisprüfung) آماده شوید. پروانه دائم (Approbation) مجوز مادام‌العمر طبابت نامحدود در سرتاسر جمهوری فدرال آلمان است.',
    },
    {
      q: 'آیا بیمارستان‌های آلمان دوره‌های آموزش زبان و آمادگی FSP را تقبل می‌کنند؟',
      a: 'بسیاری از شبکه‌های بیمارستانی همکار هلدینگ دیاکو در آلمان، کمک‌هزینه ثبت‌نام در دوره‌های زبان تخصصی و حتی خوابگاه اولیه را برای کادر درمانی پذیرفته‌شده تأمین می‌کنند.',
    },
    {
      q: 'مدت زمان دریافت ویزا و شروع کار برای پزشکان در آلمان چقدر است؟',
      a: 'از زمان تکمیل مدرک زبان B2 تا صدور تاییدیه ایالتی (Defizitbescheid) و وقت سفارت آلمان تحت ویزای ۱۶d یا کارت شانس کادر درمان، معمولاً بین ۴ تا ۷ ماه زمان نیاز است.',
    },
    {
      q: 'آیا خانواده پزشک نیز همزمان می‌توانند ویزا بگیرند؟',
      a: 'بله، پس از شروع کار پزشک با مجوز Berufserlaubnis یا Approbation و انعقاد قرارداد کاری، همسر و فرزندان زیر ۱۸ سال با ویزای پیوست خانواده به آلمان می‌آیند و همسر حق کار تمام‌وقت نامحدود دارد.',
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#081e26] text-slate-100 font-sans pb-20">
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
            <span className="text-white font-semibold">پزشکان و کادر درمان به آلمان ۲۰۲۶</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر مقاصد درمانی:</span>
            {[
              { key: 'medical-austria-nursing', label: '🇦🇹 پرستاران اتریش' },
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

      {/* بخش هیرو با رعایت دقیق LCP و CLS */}
      <section className="relative overflow-hidden pt-8 pb-14 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  دپارتمان تخصصی کادر درمان دیاکو
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                  قوانین و مصوبات ۲۰۲۶ BÄO آلمان
                </span>
              </div>

              {/* H1 یکتا و بهینه‌سازی‌شده برای سئو */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                مهاجرت کادر درمان به آلمان؛ اخذ پروانه آپروباسیون و اشتغال رسمی
              </h1>

              {/* باکس پاسخ سریع بهینه‌شده برای موتورهای هوش مصنوعی و گوگل (AIO) */}
              <div
                data-ai-answer
                className="speakable-summary rounded-2xl bg-[#0e2a35] border border-emerald-500/30 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg"
              >
                <div className="font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  خلاصه کلیدی ۲۰۲۶ ویژه کادر پزشکی و پرستاری:
                </div>
                مهاجرت پزشکان، دندانپزشکان و پرستاران به آلمان مستلزم یادگیری زبان تا سطح B2 و سپس قبولی در آزمون زبان تخصصی FSP (C1 Medizin) در نظام پزشکی ایالت مقصد است. پزشکان پس از قبولی در FSP، با دریافت پروانه طبابت موقت (Berufserlaubnis) با حقوق کامل ماهانه حداقل ۵,۱۰۰ تا ۶,۴۰۰ یورو شروع به کار نموده و همزمان برای پروانه دائمی Approbation اقدام می‌کنند.
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  سنجش رایگان شرایط معادل‌سازی مدرک در آلمان
                </button>
                <a
                  href="tel:+982191693955"
                  className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  تماس با مشاور کادر درمان: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            {/* تصویر هیرو با Aspect Ratio صریح و LCP Eager Loading */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="مهاجرت پزشکان و کادر درمان به آلمان - هلدینگ مهاجرتی دیاکو"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 right-3 left-3 bg-[#081e26]/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>بیمارستان‌های ایالت‌های بایرن، نوردراین وستفالن و بادن-وورتمبرگ</span>
                  <span className="text-emerald-400 font-bold">بیش از ۱۵,۰۰۰ کسری پزشک</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                حقوق مندرج بر اساس اشل سراسری سندیکای پزشکان آلمان (Marburger Bund) تنظیم شده است.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* محاسبه‌گر تعاملی حقوق و زمان‌بندی معادل‌سازی در آلمان */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                ابزار تخمین هوشمند دیاکو
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                محاسبه‌گر حقوق بالینی و میزان آمادگی معادل‌سازی در آلمان
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                رشته، سطح فعلی زبان آلمانی و سابقه کار بالینی خود را مشخص کنید
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  رشته و حوزه درمانی:
                </label>
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value as any)}
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
                >
                  <option value="gp">پزشک عمومی (Allgemeinmedizin)</option>
                  <option value="specialist">پزشک متخصص (Facharzt)</option>
                  <option value="dentist">دندانپزشک (Zahnmedizin)</option>
                  <option value="nurse">پرستار لیسانس (Pflegefachmann/frau)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  سطح مدرک زبان آلمانی:
                </label>
                <select
                  value={germanLevel}
                  onChange={(e) => setGermanLevel(e.target.value as any)}
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
                >
                  <option value="A2">سطح مقدماتی (A1/A2)</option>
                  <option value="B1">سطح متوسط (B1)</option>
                  <option value="B2">سطح واجد شرایط ویزا (B2 گوته/تلک)</option>
                  <option value="C1">سطح پیشرفته پزشکی (C1 Medizin)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  سابقه کار بالینی: ({experienceYears} سال)
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer mt-2"
                />
              </div>
            </div>

            {/* نتایج محاسبه */}
            <div className="grid sm:grid-cols-3 gap-4 bg-black/30 rounded-2xl p-5 border border-white/10">
              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">حقوق ناخالص ماهانه (Brutto)</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block mt-1">
                  {evaluation.monthlyGross.toLocaleString('fa-IR')} یورو
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  سالانه: {evaluation.annualGross.toLocaleString('fa-IR')} یورو
                </span>
              </div>

              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">حقوق خالص تقریبی بعد از مالیات و بیمه</span>
                <span className="text-xl sm:text-2xl font-black text-amber-300 block mt-1">
                  ≈ {evaluation.monthlyNet.toLocaleString('fa-IR')} یورو/ماه
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">شامل پوشش کامل بازنشستگی</span>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 block">شاخص آمادگی پرونده در سفارت</span>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <div className="w-24 bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${evaluation.readinessScore}%` }}
                    />
                  </div>
                  <span className="text-base font-black text-white">
                    {evaluation.readinessScore}٪
                  </span>
                </div>
                <span className="text-[10px] text-emerald-300 block mt-0.5">
                  {germanLevel === 'B2' || germanLevel === 'C1'
                    ? 'آماده ورود به پروسه ویزا'
                    : 'نیازمند ارتقای مدرک زبان به B2'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* چک‌لیست مدارک با امکان کپی */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                چک‌لیست رسمی مدارک معادل‌سازی پزشکی و ویزای آلمان ۲۰۲۶
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                تأیید مدارک توسط کارشناسان دارالترجمه رسمی و وکلای مقیم آلمان دیاکو
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedChecklist ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedChecklist ? 'چک‌لیست کپی شد!' : 'کپی کل مدارک'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {DOCUMENTS.map((doc, idx) => (
              <div
                key={doc.id}
                onClick={() => setCheckedDocs((prev) => ({ ...prev, [doc.id]: !prev[doc.id] }))}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  checkedDocs[doc.id]
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-white'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 text-slate-200'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-black/40">
                  {checkedDocs[doc.id] && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{doc.title}</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* بخش پرسش‌های متداول (FAQ) با Accordion */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              سوالات پرتکرار پزشکان و کادر درمان درباره آلمان
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              پاسخ حقوقی مستند به آیین‌نامه BÄO و تجربیات ده‌ها پرونده موفق دیاکو
            </p>
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
                    className="w-full flex items-center justify-between p-4 text-right font-bold text-sm text-white hover:text-emerald-300 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-emerald-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* نوار دعوت به اقدام پایانی */}
      <section className="pt-12">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 p-8">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              آماده شروع مسیر معادل‌سازی و اشتغال در آلمان هستید؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
              کارشناسان دپارتمان درمان دیاکو مدارک تحصیلی شما را جهت تطابق با سرفصل‌های نظام پزشکی ایالت‌های مختلف بررسی می‌کنند.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 text-sm transition cursor-pointer shadow-lg"
              >
                تکمیل فرم ارزیابی تخصصی کادر درمان
              </button>
              <button
                type="button"
                onClick={onBackToHome}
                className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-3 text-sm font-bold text-white transition cursor-pointer"
              >
                بازگشت به خدمات اصلی
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MedicalGermanyPage;
