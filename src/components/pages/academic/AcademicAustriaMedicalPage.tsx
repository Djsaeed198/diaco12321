import React, { useState } from 'react';
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
  GraduationCap,
  ShieldCheck,
  Building2,
  Scale,
  Award,
  Euro,
  FileCheck2,
  Users,
  Calculator,
  TrendingUp,
  Globe,
  AlertTriangle,
  BookOpen,
  MapPin,
  Briefcase,
  Languages,
  Star,
  Plane,
  Home,
  FileWarning,
  Stethoscope,
  HeartPulse,
  Microscope,
  CalendarDays,
  BarChart3,
  Target,
  Timer,
  Banknote,
  Landmark,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const AcademicAustriaMedicalPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useSeo({
    title: 'تحصیل پزشکی در اتریش ۲۰۲۶ | MedAT + سهمیه ۵٪ و شهریه €۷۵۲',
    description:
      'راهنمای کامل پذیرش پزشکی و دندانپزشکی اتریش ۲۰۲۶: آزمون MedAT در ۳ جولای، سهمیه ۵٪ غیر اتحادیه اروپا، شهریه €۷۵۲.۹۲ در ترم، زبان C1، ساختار آزمون BMS/KFF/TV/SEK و دوره آمادگی در وین با دیاکو.',
    canonical: '/guides/academic-austria-medical',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تحصیل پزشکی در اتریش ۲۰۲۶',
      'آزمون MedAT اتریش',
      'MedAT 2026 تاریخ',
      'دانشگاه علوم پزشکی وین MedUni Wien',
      'سهمیه ۵ درصد MedAT',
      'شهریه پزشکی اتریش غیر اتحادیه اروپا',
      'ساختار آزمون MedAT BMS KFF',
      'دوره آمادگی MedAT وین',
      'پزشکی رایگان اتریش',
      'دفتر وین هلدینگ دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/academic-austria-medical#article',
          headline: 'راهنمای جامع آزمون MedAT ۲۰۲۶: سهمیه ۵٪، شهریه €۷۵۲ و ساختار آزمون',
          description:
            'بررسی کامل پذیرش پزشکی و دندانپزشکی در اتریش ۲۰۲۶: ثبت‌نام ۲-۳۱ مارس، آزمون ۳ جولای، سهمیه ۵٪ غیر اتحادیه اروپا (حدود ۹۰ صندلی)، شهریه €۷۵۲.۹۲/ترم، زبان C1، ساختار BMS/KFF/TV/SEK و دوره‌های آمادگی در وین.',
          image: [
            'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
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
          dateModified: '2026-10-25',
          inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'MedAT 2026' },
            { '@type': 'Thing', name: 'MedUni Wien' },
            { '@type': 'Thing', name: 'پزشکی در اتریش' },
          ],
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/academic-austria-medical#howto',
          name: 'مراحل ثبت‌نام و آمادگی آزمون MedAT ۲۰۲۶',
          description: 'فرآیند گام‌به‌گام از آمادگی زبان تا پذیرش در دانشگاه پزشکی اتریش',
          totalTime: 'P12M',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'کسب مدرک زبان آلمانی C1',
              text: 'زبان آلمانی در سطح C1 برای ثبت‌نام و ادامه تحصیل الزامی است. آزمون‌های ÖSD، Goethe یا Telc معتبر هستند.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'آمادگی برای آزمون MedAT',
              text: 'شروع آمادگی ۶ تا ۱۲ ماه قبل از آزمون با منابع رسمی BMS و تمرین KFF، TV و SEK.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'ثبت‌نام آنلاین (۲-۳۱ مارس ۲۰۲۶)',
              text: 'ثبت‌نام در medizinstudieren.at و پرداخت هزینه €110. انتخاب محل تحصیل و سهمیه (غیر اتحادیه اروپا).',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'شرکت در آزمون (۳ جولای ۲۰۲۶)',
              text: 'آزمون یک‌روزه (۸:۰۰–۱۷:۰۰) در وین، اینسبروک، گراتس یا ولز. زبان آزمون آلمانی است.',
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'دریافت نتیجه و پذیرش',
              text: 'نتایج حدود هفته ۳۲ (آگوست) اعلام می‌شود. پذیرش بر اساس رتبه در سهمیه مربوطه انجام می‌شود.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/academic-austria-medical#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آزمون MedAT ۲۰۲۶ چه زمانی برگزار می‌شود؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'آزمون MedAT ۲۰۲۶ در روز جمعه ۳ جولای ۲۰۲۶ (۱۲ تیر ۱۴۰۵) از ساعت ۸:۰۰ تا ۱۷:۰۰ به‌صورت همزمان در وین، اینسبروک، گراتس و ولز برگزار می‌شود. ثبت‌نام آنلاین از ۲ تا ۳۱ مارس ۲۰۲۶ است و هزینه آن €110 می‌باشد.',
              },
            },
            {
              '@type': 'Question',
              name: 'سهمیه دانشجویان غیر اتحادیه اروپا در MedAT چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حداکثر ۵٪ از صندلی‌های پزشکی به متقاضیان غیر اتحادیه اروپا تعلق دارد. در سال ۲۰۲۶ از مجموع ۱۸۰۶ صندلی پزشکی، حدود ۹۰ صندلی (۵٪) برای این گروه است: وین ~۳۵، اینسبروک ~۱۹، گراتس ~۱۹، لینتس ~۱۶. دندانپزشکی (۱۴۴ صندلی) سهمیه‌بندی ندارد و پذیرش صرفاً بر اساس رتبه آزمون است.',
              },
            },
            {
              '@type': 'Question',
              name: 'شهریه تحصیل پزشکی در اتریش برای دانشجویان ایرانی چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای دانشجویان غیر اتحادیه اروپا، شهریه هر ترم €726.72 به‌علاوه €26.20 هزینه ÖH (بیمه دانشجویی) است. مجموعاً €752.92 در هر ترم. تحصیل پزشکی در اتریش ۱۲ ترم (۶ سال) طول می‌کشد.',
              },
            },
            {
              '@type': 'Question',
              name: 'ساختار آزمون MedAT چگونه است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'آزمون MedAT-H از چهار بخش تشکیل شده: BMS (دانش پایه پزشکی: زیست، شیمی، فیزیک، ریاضی) ۴۰٪، KFF (توانایی‌های شناختی: استدلال فضایی، حافظه، دنباله اعداد) ۴۰٪، TV (درک متن) ۱۰٪، SEK (توانایی‌های اجتماعی-عاطفی) ۱۰٪. آزمون کاملاً به زبان آلمانی و به‌صورت حضوری برگزار می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'چه سطحی از زبان آلمانی برای پزشکی در اتریش لازم است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'سطح C1 زبان آلمانی برای ثبت‌نام و ادامه تحصیل در پزشکی اتریش الزامی است. این سطح بالاتر از B2 است و معمولاً ۱۲ تا ۱۸ ماه آمادگی زبان نیاز دارد.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا مدرک پزشکی اتریش در ایران و اروپا معتبر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. مدارک دانشگاه‌های پزشکی وین، گراتس، اینسبروک و لینتس در بالاترین رده وزارت بهداشت ایران قرار دارد و در کل اتحادیه اروپا و سازمان جهانی بهداشت (WHO) به رسمیت شناخته می‌شود.',
              },
            },
          ],
        },
      ],
    },
  });

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+43 688 976 3256');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const FAQS = [
    {
      q: 'آزمون MedAT ۲۰۲۶ چه زمانی برگزار می‌شود و ثبت‌نام چگونه است؟',
      a: 'آزمون MedAT ۲۰۲۶ در روز جمعه ۳ جولای ۲۰۲۶ (۱۲ تیر ۱۴۰۵) از ساعت ۸:۰۰ تا ۱۷:۰۰ به‌صورت همزمان در وین، اینسبروک، گراتس و ولز برگزار می‌شود. ثبت‌نام آنلاین از ۲ تا ۳۱ مارس ۲۰۲۶ در سایت medizinstudieren.at انجام می‌شود و هزینه آن €110 است. پس از ثبت‌نام، یک شماره ۷ رقمی (Bearbeitungsnummer) دریافت می‌کنید که برای ورود به حساب کاربری و پرداخت هزینه لازم است.',
    },
    {
      q: 'سهمیه دانشجویان غیر اتحادیه اروپا در MedAT چقدر است؟',
      a: 'حداکثر ۵٪ از صندلی‌های پزشکی به متقاضیان غیر اتحادیه اروپا تعلق دارد. در سال ۲۰۲۶ از مجموع ۱۸۰۶ صندلی پزشکی، حدود ۹۰ صندلی (۵٪) برای این گروه است: وین ~۳۵ از ۷۰۴، اینسبروک ~۱۹ از ۳۹۰، گراتس ~۱۹ از ۳۸۲، لینتس ~۱۶ از ۳۳۰. دندانپزشکی (۱۴۴ صندلی) سهمیه‌بندی ندارد و پذیرش صرفاً بر اساس رتبه آزمون است. این ۵٪ یک سقف است، نه تعداد تضمینی.',
    },
    {
      q: 'شهریه تحصیل پزشکی در اتریش برای دانشجویان ایرانی چقدر است؟',
      a: 'برای دانشجویان غیر اتحادیه اروپا، شهریه هر ترم €726.72 به‌علاوه €26.20 هزینه ÖH (بیمه دانشجویی) است. مجموعاً €752.92 در هر ترم. تحصیل پزشکی ۱۲ ترم (۶ سال) طول می‌کشد. برای مقایسه، دانشجویان اتحادیه اروپا فقط €363.36 شهریه + €26.20 ÖH پرداخت می‌کنند.',
    },
    {
      q: 'ساختار آزمون MedAT چگونه است و هر بخش چند درصد است؟',
      a: 'آزمون MedAT-H از چهار بخش تشکیل شده: BMS (دانش پایه پزشکی: زیست، شیمی، فیزیک، ریاضی) ۴۰٪، KFF (توانایی‌های شناختی: استدلال فضایی، حافظه، دنباله اعداد، روانی کلامی، استنتاج) ۴۰٪، TV (درک متن) ۱۰٪، SEK (توانایی‌های اجتماعی-عاطفی: شناخت و تنظیم emotions، تصمیم‌گیری اجتماعی) ۱۰٪. آزمون کاملاً به زبان آلمانی و به‌صورت حضوری برگزار می‌شود.',
    },
    {
      q: 'چه سطحی از زبان آلمانی برای پزشکی در اتریش لازم است؟',
      a: 'سطح C1 زبان آلمانی برای ثبت‌نام و ادامه تحصیل در پزشکی اتریش الزامی است. این سطح بالاتر از B2 است و معمولاً ۱۲ تا ۱۸ ماه آمادگی زبان نیاز دارد. متقاضیانی که سطح زبانشان پایین‌تر است، معمولاً یک سال آمادگی زبان در اتریش سپری می‌کنند و سپس در MedAT شرکت می‌کنند.',
    },
    {
      q: 'آیا مدرک پزشکی اتریش در ایران و اروپا معتبر است؟',
      a: 'بله. مدارک دانشگاه‌های پزشکی وین، گراتس، اینسبروک و لینتس در بالاترین رده وزارت بهداشت ایران قرار دارد و در کل اتحادیه اروپا و سازمان جهانی بهداشت (WHO) به رسمیت شناخته می‌شود. پس از فارغ‌التحصیلی، برای اخذ مجوز کار در اتریش باید دوره تخصص (Facharztausbildung) را طی کنید که از آگوست ۲۰۲۶ دوره پایه آن به ۶ ماه کاهش یافته است.',
    },
    {
      q: 'شانس قبولی در MedAT چقدر است؟',
      a: 'در سال ۲۰۲۶، ۱۳,۲۴۸ نفر در آزمون MedAT شرکت کردند و ۱,۹۵۰ نفر پذیرش گرفتند — یعنی نرخ پذیرش کلی حدود ۱۴.۷٪ (۱ از هر ۶.۸ نفر). اما برای سهمیه غیر اتحادیه اروپا رقابت بسیار شدیدتر است: حدود ۹۰ صندلی در برابر متقاضیان بین‌المللی. آمادگی جدی و هدفمند ۶ تا ۱۲ ماهه شانس قبولی را به‌طور قابل‌توجهی افزایش می‌دهد.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#061a21] text-white pt-24 pb-16 font-sans" dir="rtl">
      {/* ============================================================
          BREADCRUMB
         ============================================================ */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 transition cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span>
            <span>/</span>
            <span>تحصیل در دانشگاه (Academic)</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">پزشکی و دندانپزشکی اتریش (MedAT)</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION 1: HERO
          Image: Medical University Vienna campus / medical students
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-300 mb-4">
              <GraduationCap className="h-4 w-4 text-red-400" />
              MedUni Wien & MedAT — تحصیل علوم پزشکی در اتریش ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              پزشکی و دندانپزشکی اتریش ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-red-400">
                (آزمون MedAT)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              دانشگاه علوم پزشکی وین (MedUni Wien) بزرگ‌ترین قطب آموزش پزشکی در اروپای مرکزی است.
              شهریه برای دانشجویان غیر اتحادیه اروپا{' '}
              <strong className="text-amber-300">€۷۵۲.۹۲ در هر ترم</strong> است. ورود به پزشکی
              منوط به قبولی در آزمون سراسری{' '}
              <strong className="text-amber-300">MedAT در ۳ جولای ۲۰۲۶</strong> است. سهمیه متقاضیان
              غیر اتحادیه اروپا تنها <strong className="text-red-300">۵٪</strong> (حدود ۹۰ صندلی از
              ۱۸۰۶) است. دفتر وین دیاکو برنامه‌ریزی ثبت‌نام، دوره آمادگی MedAT و رزرو خوابگاه را
              انجام می‌دهد.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-amber-300">۳ جولای</div>
                <div className="text-[10px] text-slate-300 mt-1">تاریخ آزمون MedAT ۲۰۲۶</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-red-300">۵٪</div>
                <div className="text-[10px] text-slate-300 mt-1">سهمیه غیر اتحادیه اروپا</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-emerald-400">€۷۵۲.۹۲</div>
                <div className="text-[10px] text-slate-300 mt-1">شهریه هر ترم (غیر EU)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-sky-300">C1</div>
                <div className="text-[10px] text-slate-300 mt-1">سطح زبان آلمانی الزامی</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                مشاوره ثبت‌نام و آمادگی MedAT
              </button>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                دفتر وین: ۴۳۶۸۸۹۷۶۳۲۵۶+
                {copiedPhone && <span className="text-emerald-400 text-[10px] font-bold">کپی شد!</span>}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80"
                alt="دانشگاه علوم پزشکی وین MedUni Wien - تحصیل پزشکی در اتریش"
                width={1000}
                height={750}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                  <Building2 className="h-4 w-4" />
                  دانشگاه‌های پزشکی وین، گراتس، اینسبروک و لینتس
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  پوشش منابع BMS (زیست، شیمی، فیزیک، ریاضی)، آزمون KFF، TV و SEK — همراهی در وین
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: QUOTA & COMPETITION
          Image: Data / competition / seats
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-red-500/5 border border-red-400/20 rounded-3xl p-6 md:p-10">
          <div className="flex items-start gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white mb-2">
                واقعیت سهمیه ۵٪: رقابت شدید برای حدود ۹۰ صندلی
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                این مهم‌ترین بخش برای متقاضیان ایرانی است. اعداد را دقیق بشناسید.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs md:text-sm">
                <caption className="sr-only">صندلی‌های پزشکی و سهمیه ۵٪ در اتریش ۲۰۲۶</caption>
                <thead>
                  <tr className="border-b border-white/15 text-slate-300">
                    <th className="py-3 px-3">دانشگاه</th>
                    <th className="py-3 px-3">پزشکی</th>
                    <th className="py-3 px-3">دندانپزشکی</th>
                    <th className="py-3 px-3 text-red-300">۵٪ غیر EU</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-200">
                  <tr>
                    <td className="py-3 px-3 font-bold">وین (MedUni Wien)</td>
                    <td className="py-3 px-3">۷۰۴</td>
                    <td className="py-3 px-3">۸۰</td>
                    <td className="py-3 px-3 text-red-300 font-black">~۳۵</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold">اینسبروک</td>
                    <td className="py-3 px-3">۳۹۰</td>
                    <td className="py-3 px-3">۴۰</td>
                    <td className="py-3 px-3 text-red-300 font-black">~۱۹</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold">گراتس</td>
                    <td className="py-3 px-3">۳۸۲</td>
                    <td className="py-3 px-3">۲۴</td>
                    <td className="py-3 px-3 text-red-300 font-black">~۱۹</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold">لینتس (JKU)</td>
                    <td className="py-3 px-3">۳۳۰</td>
                    <td className="py-3 px-3">—</td>
                    <td className="py-3 px-3 text-red-300 font-black">~۱۶</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="py-3 px-3 font-black text-white">مجموع</td>
                    <td className="py-3 px-3 font-black text-white">۱,۸۰۶</td>
                    <td className="py-3 px-3 font-black text-white">۱۴۴</td>
                    <td className="py-3 px-3 font-black text-red-300">~۹۰</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">آمار کل ۲۰۲۶</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  <li>شرکت‌کنندگان: <strong className="text-white">۱۳,۲۴۸ نفر</strong></li>
                  <li>صندلی کل: <strong className="text-white">۱,۹۵۰</strong></li>
                  <li>نرخ پذیرش کلی: <strong className="text-amber-300">~۱۴.۷٪</strong></li>
                  <li>رقابت سهمیه غیر EU: <strong className="text-red-300">بسیار شدیدتر</strong></li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                <p className="text-[11px] text-amber-200 leading-relaxed">
                  <strong>نکته حیاتی:</strong> ۵٪ یک <strong>سقف</strong> است، نه تعداد تضمینی.
                  اگر متقاضیان واجد شرایط کمتر باشند، ممکن است صندلی‌های خالی به سهمیه EU منتقل
                  شوند. دندانپزشکی <strong>هیچ سهمیه‌ای ندارد</strong> و پذیرش صرفاً بر اساس رتبه
                  آزمون است — رقابت در آن آزادتر اما شدیدتر است.
                </p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            منبع: MedUni Wien، StudyU — محاسبه ۵٪ بر اساس صندلی‌های پزشکی ۲۰۲۶/۲۷
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: EXAM STRUCTURE
          Image: Study materials / books / preparation
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 mb-3">
                <Microscope className="h-4 w-4" />
                ساختار آزمون
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                MedAT از چه بخش‌هایی تشکیل شده؟
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 text-justify">
                آزمون MedAT-H یک آزمون کتبی چندبخشی است که چهار بخش اصلی دارد. مجموع نمره از
                میانگین وزنی این چهار بخش محاسبه می‌شود. KFF و BMS هر کدام ۴۰٪ وزن دارند و
                مهم‌ترین بخش‌ها هستند.
              </p>

              <div className="space-y-3">
                {[
                  { name: 'BMS — دانش پایه پزشکی', weight: '۴۰٪', detail: 'زیست، شیمی، فیزیک، ریاضی — سطح دبیرستان', color: 'text-amber-300', bar: 'bg-amber-400', width: 'w-[40%]' },
                  { name: 'KFF — توانایی‌های شناختی', weight: '۴۰٪', detail: 'استدلال فضایی، حافظه، دنباله اعداد، روانی کلامی، استنتاج', color: 'text-teal-300', bar: 'bg-teal-400', width: 'w-[40%]' },
                  { name: 'TV — درک متن', weight: '۱۰٪', detail: 'فهم و تحلیل متون علمی', color: 'text-sky-300', bar: 'bg-sky-400', width: 'w-[10%]' },
                  { name: 'SEK — توانایی‌های اجتماعی-عاطفی', weight: '۱۰٪', detail: 'شناخت احساسات، تنظیم هیجان، تصمیم‌گیری اجتماعی', color: 'text-rose-300', bar: 'bg-rose-400', width: 'w-[10%]' },
                ].map((item) => (
                  <div key={item.name} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-bold ${item.color}`}>{item.name}</span>
                      <span className={`text-xs font-black ${item.color}`}>{item.weight}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full ${item.bar} ${item.width} rounded-full`} />
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-400/20">
                <p className="text-[11px] text-red-200 leading-relaxed">
                  <strong>هشدار:</strong> آزمون کاملاً به زبان آلمانی است. بدون سطح C1، حتی با
                  دانش علمی قوی، درک سوالات KFF و TV بسیار دشوار خواهد بود.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                  alt="ساختار آزمون MedAT ۲۰۲۶ - منابع BMS KFF TV SEK برای آمادگی"
                  width={800}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                  منابع رسمی آمادگی MedAT در سایت medizinstudieren.at به‌صورت رایگان موجود است.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">زمان‌بندی آزمون</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  <li>تاریخ: <strong className="text-white">۳ جولای ۲۰۲۶ (جمعه)</strong></li>
                  <li>ساعت: <strong className="text-white">۸:۰۰ تا ۱۷:۰۰</strong></li>
                  <li>محل: وین، اینسبروک، گراتس، ولز</li>
                  <li>هزینه ثبت‌نام: <strong className="text-white">€۱۱۰</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: TIMELINE 2026
          Image: Calendar / planning
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-br from-sky-950/40 via-slate-900/60 to-[#061a21] border border-sky-400/20 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
                alt="تقویم ثبت‌نام و آزمون MedAT ۲۰۲۶ - برنامه‌ریزی و مدارک"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                ثبت‌نام: ۲-۳۱ مارس ۲۰۲۶ | آزمون: ۳ جولای ۲۰۲۶ | نتایج: هفته ۳۲
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 mb-3">
                <CalendarDays className="h-4 w-4" />
                تقویم ۲۰۲۶
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                زمان‌بندی دقیق ثبت‌نام و آزمون
              </h2>

              <div className="space-y-3">
                {[
                  { date: '۲ مارس ۲۰۲۶', event: 'شروع ثبت‌نام آنلاین', detail: 'در medizinstudieren.at — انتخاب محل و سهمیه' },
                  { date: '۳۱ مارس ۲۰۲۶', event: 'پایان ثبت‌نام و پرداخت €۱۱۰', detail: 'بدون تمدید — تأخیر به معنای از دست دادن آزمون است' },
                  { date: '۳ جولای ۲۰۲۶', event: 'آزمون MedAT', detail: '۸:۰۰–۱۷:۰۰ — همزمان در چهار شهر' },
                  { date: 'هفته ۳۲ (آگوست)', event: 'اعلام نتایج', detail: 'رتبه‌بندی و دعوت به پذیرش' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="shrink-0 w-20 text-[10px] font-black text-sky-300">{item.date}</span>
                    <div>
                      <div className="text-xs font-bold text-white">{item.event}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                * برای سال ۲۰۲۷، تاریخ‌ها معمولاً در اوایل سال اعلام می‌شوند. الگوی کلی: ثبت‌نام مارس،
                آزمون اوایل جولای، نتایج آگوست.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: TUITION & COSTS
          Image: Euro / finances / Vienna
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mb-3">
                <Banknote className="h-4 w-4" />
                هزینه‌ها
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                شهریه و هزینه‌های تحصیل پزشکی در اتریش
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                برخلاف تصور رایج، تحصیل پزشکی در اتریش برای دانشجویان غیر اتحادیه اروپا
                رایگان نیست — اما در مقایسه با انگلستان یا آمریکا بسیار مقرون‌به‌صرفه است.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-300">شهریه هر ترم (غیر EU)</span>
                    <span className="text-lg font-black text-white">€۷۲۶.۷۲</span>
                  </div>
                  <p className="text-[10px] text-emerald-200/80">+ €۲۶.۲۰ هزینه ÖH (بیمه دانشجویی)</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">مجموع هر ترم</span>
                    <span className="text-lg font-black text-amber-300">€۷۵۲.۹۲</span>
                  </div>
                  <p className="text-[10px] text-slate-400">۱۲ ترم = حدود €۹,۰۳۵ برای کل دوره</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">هزینه ÖH (کل سال)</span>
                    <span className="text-lg font-black text-sky-300">€۵۲.۴۰</span>
                  </div>
                  <p className="text-[10px] text-slate-400">شامل بیمه دانشجویی پایه</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                هزینه زندگی در وین (خوابگاه، غذا، حمل‌ونقل) حدود €۹۰۰ تا €۱,۲۰۰ در ماه است.
                خوابگاه دانشجویی از حدود €۳۰۰ در ماه شروع می‌شود.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                  alt="شهریه تحصیل پزشکی در اتریش برای دانشجویان غیر اتحادیه اروپا - €۷۵۲.۹۲ در ترم"
                  width={800}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                  شهریه غیر EU: €۷۲۶.۷۲ + €۲۶.۲۰ ÖH = €۷۵۲.۹۲ در هر ترم
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/20">
                <p className="text-[11px] text-amber-200 leading-relaxed">
                  <strong>مقایسه:</strong> شهریه پزشکی در انگلستان برای دانشجویان بین‌المللی
                  حدود £۳۰,۰۰۰-۴۰,۰۰۰ در سال است. اتریش با €۱,۵۰۵.۸۴ در سال (برای غیر EU)
                  یکی از مقرون‌به‌صرفه‌ترین گزینه‌های پزشکی با کیفیت جهانی است.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: PREPARATION STRATEGY
          Image: Group study / books / tutoring
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="دوره آمادگی MedAT در وین - گروه مطالعه و منابع آزمون پزشکی اتریش"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                آمادگی هدفمند ۶ تا ۱۲ ماهه، شانس قبولی در سهمیه ۵٪ را به‌طور قابل‌توجهی افزایش می‌دهد.
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-3">
                <Target className="h-4 w-4" />
                استراتژی آمادگی
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                چگونه برای MedAT آماده شویم؟
              </h2>

              <div className="space-y-3">
                {[
                  { step: '۱', title: 'زبان آلمانی را به C1 برسانید', detail: 'بدون C1، حتی با دانش علمی قوی، درک سوالات KFF و TV دشوار است. حداقل ۱۲ ماه آمادگی زبان.' },
                  { step: '۲', title: 'منابع رسمی BMS را تسلط کنید', detail: 'زیست، شیمی، فیزیک و ریاضی در سطح دبیرستان. منابع رایگان در medizinstudieren.at.' },
                  { step: '۳', title: 'KFF را با تمرین روزانه تقویت کنید', detail: 'استدلال فضایی، حافظه، دنباله اعداد — این بخش ۴۰٪ نمره را تشکیل می‌دهد و با تمرین قابل بهبود است.' },
                  { step: '۴', title: 'در آزمون‌های شبیه‌سازی‌شده شرکت کنید', detail: 'دوره‌های آمادگی در وین (BFI، Studentenkurse) آزمون‌های کامل را شبیه‌سازی می‌کنند.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-400 text-[#082833] grid place-items-center text-xs font-black">
                      {item.step}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{item.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
                <p className="text-[11px] text-emerald-200 leading-relaxed">
                  <strong>توصیه دیاکو:</strong> متقاضیانی که از پایه زبان پایین‌تری شروع می‌کنند،
                  معمولاً یک سال آمادگی زبان در وین سپری می‌کنند و سپس در MedAT شرکت می‌کنند.
                  دفتر وین دیاکو دوره‌های زبان و آمادگی را هماهنگ می‌کند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7: FAQ
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
            <BookOpen className="h-4 w-4" />
            پرسش‌های متداول
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white">
            سوالات پرتکرار تحصیل پزشکی در اتریش
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold text-white hover:text-amber-300 transition cursor-pointer"
                aria-expanded={openFaq === idx}
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-amber-400' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          SECTION 8: FINAL CTA
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-l from-[#0b2933] to-[#082833] border border-white/10 rounded-3xl p-8 md:p-12 text-center">
          <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            مسیر شما به پزشکی اتریش از اینجا شروع می‌شود
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
            دفتر وین دیاکو برنامه‌ریزی ثبت‌نام MedAT، دوره آمادگی زبان و آزمون، و رزرو خوابگاه
            را انجام می‌دهد. ارزیابی رایگان شرایط خود را همین حالا شروع کنید.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-8 py-4 text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
            >
              شروع ارزیابی رایگان
            </button>
            <a
              href="https://wa.me/436889763256"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              گفتگو با دفتر وین
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicAustriaMedicalPage;