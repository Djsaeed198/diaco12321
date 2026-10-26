import OptimizedImage from '../../OptimizedImage';
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
  CalendarDays,
  Banknote,
  HeartPulse,
  FileText,
  Landmark,
  Timer,
  Coffee,
  Wrench,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const AcademicAustriaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useSeo({
    title: 'تحصیل در اتریش ۲۰۲۶ | دانشگاه وین + شهریه €۷۵۲ و VWU',
    description:
      'راهنمای کامل تحصیل در دانشگاه‌های دولتی اتریش ۲۰۲۶: شهریه غیر اتحادیه اروپا €۷۵۲.۹۲ در ترم، کالج زبان VWU (€۱,۸۹۰)، ویزای تحصیلی با تمکن مالی €۱,۳۰۸ در ماه، کار ۲۰ ساعته و مهلت‌های Universität Wien و TU Wien با دیاکو.',
    canonical: '/guides/academic-austria',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تحصیل در اتریش ۲۰۲۶',
      'شهریه دانشگاه اتریش غیر اتحادیه اروپا',
      'پذیرش دانشگاه وین Universität Wien',
      'کالج زبان VWU وین',
      'ویزای تحصیلی اتریش تمکن مالی',
      'کار دانشجویی اتریش ۲۰ ساعت',
      'مهلت申请 TU Wien ۲۰۲۶',
      'تحصیل بدون مدرک زبان در اتریش',
      'دفتر وین هلدینگ دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/academic-austria#article',
          headline: 'راهنمای جامع تحصیل در دانشگاه‌های اتریش ۲۰۲۶: شهریه €۷۵۲، VWU و ویزای تحصیلی',
          description:
            'بررسی کامل پذیرش Universität Wien و TU Wien برای دانشجویان غیر اتحادیه اروپا: شهریه €۷۵۲.۹۲/ترم، کالج زبان VWU (€۱,۸۹۰/ترم)، تمکن مالی €۱,۳۰۸.۳۹/ماه، بیمه €۷۸.۸۴/ماه، کار ۲۰ ساعته و مهلت‌های دقیق ۲۰۲۶.',
          image: [
            'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
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
            { '@type': 'Thing', name: 'تحصیل در اتریش' },
            { '@type': 'Thing', name: 'Universität Wien' },
            { '@type': 'Thing', name: 'VWU' },
          ],
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/academic-austria#howto',
          name: 'مراحل پذیرش و ویزای تحصیلی اتریش',
          description: 'فرآیند گام‌به‌گام از اپلای تا ورود به دانشگاه اتریش',
          totalTime: 'P9M',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'آماده‌سازی مدارک و ترجمه رسمی',
              text: 'دیپلم ۱۲ ساله با ریزنمرات، ترجمه سوگندخورده و تأییدیه (Legalisation). برای ایران، مدرک پیش‌دانشگاهی یا کنکور نیز لازم است.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'ثبت درخواست آنلاین (u:space / TU Wien)',
              text: 'ویانا: ۲۲ ژوئن – ۳ آگوست ۲۰۲۶ (غیر EU). TU Wien: تا ۱۵ جولای ۲۰۲۶.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'دریافت پذیرش مشروط و ثبت در VWU',
              text: 'با پذیرش دانشگاه، در کالج زبان VWU ثبت‌نام کنید. هزینه €۱,۸۹۰/ترم. حداکثر ۴ ترم فرصت دارید.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'درخواست ویزای تحصیلی (Aufenthaltsbewilligung Student)',
              text: 'مدارک: پذیرش، تمکن مالی €۱,۳۰۸.۳۹/ماه، بیمه €۳۰,۰۰۰+، مسکن. هزینه €۲۱۸. زمان پردازش تا ۶ ماه.',
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'ورود به اتریش و ثبت‌نام نهایی',
              text: 'ثبت Meldezettel ظرف ۳ روز. فعال‌سازی بیمه دانشجویی (€۷۸.۸۴/ماه). شرکت در آزمون تعیین سطح VWU و شروع کلاس‌ها.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/academic-austria#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'شهریه تحصیل در دانشگاه‌های اتریش برای دانشجویان ایرانی چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای دانشجویان غیر اتحادیه اروپا، شهریه هر ترم €726.72 به‌علاوه €26.20 هزینه ÖH است. مجموعاً €752.92 در هر ترم. برای مقایسه، دانشجویان اتحادیه اروپا فقط €363.36 + €26.20 پرداخت می‌کنند.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا بدون مدرک زبان آلمانی می‌توانم از اتریش پذیرش بگیرم؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. برای پذیرش مشروط، حداقل سطح A2 آلمانی کافی است. پس از ورود، در کالج زبان VWU سطح خود را تا C1 ارتقا می‌دهید و در آزمون EPD شرکت می‌کنید. حداکثر ۴ ترم (۲ سال) فرصت دارید.',
              },
            },
            {
              '@type': 'Question',
              name: 'هزینه کالج زبان VWU چقدر است و چقدر طول می‌کشد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'هزینه VWU در دانشگاه وین €1,890 در هر ترم است (شامل مواد آموزشی). در مؤسسات همکار، هزینه بین €612 تا €1,850 متغیر است. مدت زمان بسته به سطح اولیه، بین ۱ تا ۴ ترم است. آزمون EPD در پایان هر ترم برگزار می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'تمکن مالی لازم برای ویزای تحصیلی اتریش در ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'طبق استاندارد ۲۰۲۶: برای مجرد €1,308.39 در ماه، برای متأهل €2,064.12 و برای هر فرزند €201.88 اضافه می‌شود. این مبلغ باید به‌صورت خالص (Netto) در دسترس باشد. علاوه بر آن، بیمه درمانی با پوشش حداقل €30,000 الزامی است (بیمه دانشجویی ÖGK: €78.84/ماه).',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا دانشجویان اتریش اجازه کار دارند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. دانشجویان غیر اتحادیه اروپا با ویزای Student می‌توانند تا ۲۰ ساعت در هفته کار کنند. کارفرما باید از AMS (اداره کار) مجوز Beschäftigungsbewilligung بگیرد، اما آزمون بازار کار (Arbeitsmarktprüfung) برای این ۲۰ ساعت حذف شده است.',
              },
            },
            {
              '@type': 'Question',
              name: 'مهلت申请 دانشگاه وین و TU Wien برای سال ۲۰۲۶ چه زمانی است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'دانشگاه وین (Universität Wien): برای غیر اتحادیه اروپا، مهلت申请 ۲۲ ژوئن تا ۳ آگوست ۲۰۲۶ است. TU Wien: مهلت ارسال درخواست کتبی تا ۱۵ جولای ۲۰۲۶، و مرحله VoR (آزمون آمادگی) از ۱ آوریل تا ۵ سپتامبر ۲۰۲۶. توصیه می‌شود حداقل ۳ ماه قبل از مهلت، مدارک آماده باشد.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا مدرک دیپلم ایران برای پذیرش در اتریش کافی است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'دیپلم ۱۲ ساله ایران به‌همراه ریزنمرات و ترجمه سوگندخورده پذیرفته می‌شود. اما برای برخی رشته‌ها، اثبات صلاحیت تحصیلی (مانند قبولی در کنکور یا مدرک پیش‌دانشگاهی) نیز لازم است. دانشگاه وین برای ایران، مدرک کنکور را به‌عنوان بخشی از مدارک الزامی درخواست می‌کند.',
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
      q: 'شهریه تحصیل در دانشگاه‌های اتریش برای دانشجویان ایرانی چقدر است؟',
      a: 'برای دانشجویان غیر اتحادیه اروپا (شامل ایران)، شهریه هر ترم €726.72 به‌علاوه €26.20 هزینه ÖH (بیمه دانشجویی) است. مجموعاً €752.92 در هر ترم. برای مقایسه، دانشجویان اتحادیه اروپا فقط €363.36 + €26.20 پرداخت می‌کنند. این شهریه برای همه دانشگاه‌های دولتی اتریش (Universität Wien، TU Wien، Uni Graz و...) یکسان است.',
    },
    {
      q: 'آیا بدون مدرک زبان آلمانی می‌توانم از اتریش پذیرش بگیرم؟',
      a: 'بله. برای دریافت پذیرش مشروط (bedingte Zulassung)، حداقل سطح A2 آلمانی کافی است. پس از ورود به اتریش، در کالج زبان VWU (Vorstudienlehrgang der Wiener Universitäten) ثبت‌نام می‌کنید و سطح خود را تا C1 ارتقا می‌دهید. در پایان، آزمون EPD (Ergänzungsprüfung Deutsch) را می‌دهید. حداکثر ۴ ترم (۲ سال) برای تکمیل این مرحله فرصت دارید.',
    },
    {
      q: 'هزینه کالج زبان VWU چقدر است و چقدر طول می‌کشد؟',
      a: 'هزینه VWU در دانشگاه وین (Sprachenzentrum) €1,890 در هر ترم است که شامل مواد آموزشی می‌شود. در مؤسسات همکار VWU، هزینه بین €612 تا €1,850 متغیر است. مدت زمان بسته به سطح اولیه شما، بین ۱ تا ۴ ترم طول می‌کشد. آزمون EPD در پایان هر ترم (ژانویه/فوریه و ژوئن) برگزار می‌شود.',
    },
    {
      q: 'تمکن مالی لازم برای ویزای تحصیلی اتریش در ۲۰۲۶ چقدر است؟',
      a: 'طبق استانداردهای ۲۰۲۶: برای فرد مجرد €1,308.39 در ماه، برای متأهل €2,064.12 و برای هر فرزند وابسته €201.88 اضافه می‌شود. این مبلغ باید به‌صورت خالص (Netto) در دسترس باشد و معمولاً باید برای یک سال اثبات شود. علاوه بر آن، بیمه درمانی با پوشش حداقل €30,000 الزامی است. بیمه دانشجویی ÖGK حدود €78.84 در ماه هزینه دارد.',
    },
    {
      q: 'آیا دانشجویان اتریش اجازه کار دارند؟',
      a: 'بله. دانشجویان غیر اتحادیه اروپا با ویزای Student می‌توانند تا ۲۰ ساعت در هفته کار کنند. کارفرما باید از AMS (اداره کار) مجوز Beschäftigungsbewilligung بگیرد، اما برای این ۲۰ ساعت، آزمون بازار کار (Arbeitsmarktprüfung) حذف شده است. کار بیش از ۲۰ ساعت نیاز به مجوز جداگانه دارد و معمولاً فقط در شرایط خاص امکان‌پذیر است.',
    },
    {
      q: 'مهلت申请 دانشگاه وین و TU Wien برای سال ۲۰۲۶ چه زمانی است؟',
      a: 'دانشگاه وین (Universität Wien): برای متقاضیان غیر اتحادیه اروپا، مهلت申请 ۲۲ ژوئن تا ۳ آگوست ۲۰۲۶ است (دوره پذیرش: ۱۳ جولای تا ۳۱ اکتبر). TU Wien: مهلت ارسال درخواست کتبی تا ۱۵ جولای ۲۰۲۶، و مرحله VoR (آزمون آمادگی برای رشته‌های خاص) از ۱ آوریل تا ۵ سپتامبر ۲۰۲۶. توصیه می‌شود مدارک را حداقل ۳ ماه قبل آماده کنید.',
    },
    {
      q: 'آیا مدرک دیپلم ایران برای پذیرش در اتریش کافی است؟',
      a: 'دیپلم ۱۲ ساله ایران به‌همراه ریزنمرات و ترجمه سوگندخورده (beglaubigte Übersetzung) پذیرفته می‌شود. اما برای برخی رشته‌ها یا دانشگاه‌ها، اثبات صلاحیت تحصیلی (مانند قبولی در کنکور سراسری یا مدرک پیش‌دانشگاهی) نیز لازم است. دانشگاه وین برای متقاضیان ایرانی، مدرک کنکور را به‌عنوان بخشی از مدارک الزامی درخواست می‌کند. همچنین مدارک باید دارای تأییدیه (Legalisation/Apostille) باشند.',
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
            <span className="text-amber-300 font-bold">مهاجرت تحصیلی به اتریش</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION 1: HERO
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-300 mb-4">
              <GraduationCap className="h-4 w-4 text-red-400" />
              Universität Wien & TU Wien — آموزش عالی دولتی اتریش ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              تحصیل در دانشگاه‌های اتریش ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-red-400">
                (شهریه €۷۵۲ در ترم)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              دانشگاه‌های دولتی اتریش مانند دانشگاه وین (با قدمت بیش از ۶۵۰ سال) و دانشگاه صنعتی
              وین (TU Wien) از برترین دانشگاه‌های جهان هستند. شهریه برای دانشجویان غیر اتحادیه
              اروپا{' '}
              <strong className="text-amber-300">€۷۵۲.۹۲ در هر ترم</strong> است و امکان دریافت
              پذیرش مشروط بدون مدرک زبان آلمانی از ایران وجود دارد. متقاضی پس از ورود، دوره
              زبان را در کالج رسمی VWU طی می‌کند. کار دانشجویی{' '}
              <strong className="text-emerald-400">۲۰ ساعت در هفته</strong> مجاز است.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-amber-300">€۷۵۲.۹۲</div>
                <div className="text-[10px] text-slate-300 mt-1">شهریه هر ترم (غیر EU)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-red-300">VWU</div>
                <div className="text-[10px] text-slate-300 mt-1">کالج زبان — €۱,۸۹۰/ترم</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-emerald-400">۲۰ ساعت</div>
                <div className="text-[10px] text-slate-300 mt-1">کار دانشجویی در هفته</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-sky-300">A2 کافی است</div>
                <div className="text-[10px] text-slate-300 mt-1">برای پذیرش مشروط</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی شانس پذیرش دانشگاه وین
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
              <OptimizedImage
                src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=80"
                alt="دانشگاه وین Universität Wien - تحصیل در اتریش ۲۰۲۶"
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
                  تحویل مستقیم پرونده به دانشگاه در وین
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  دفتر وین دیاکو مدارک را مستقیماً به دبیرخانه Universität Wien و TU Wien
                  تحویل داده و از تأخیرهای اداری پستی جلوگیری می‌کند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: TUITION & COSTS
          Image: Euro / finances / calculator
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mb-3">
                <Banknote className="h-4 w-4" />
                شهریه و هزینه‌ها
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                شهریه تحصیل در اتریش چقدر است؟
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 text-justify">
                برخلاف تصور رایج، تحصیل در اتریش برای دانشجویان غیر اتحادیه اروپا رایگان
                نیست — اما در مقایسه با انگلستان یا آمریکا بسیار مقرون‌به‌صرفه است. شهریه
                برای همه دانشگاه‌های دولتی یکسان است.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-300">شهریه پایه (غیر EU)</span>
                    <span className="text-lg font-black text-white">€۷۲۶.۷۲</span>
                  </div>
                  <p className="text-[10px] text-emerald-200/80">در هر ترم — بدون توجه به رشته</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">هزینه ÖH (بیمه دانشجویی)</span>
                    <span className="text-lg font-black text-amber-300">€۲۶.۲۰</span>
                  </div>
                  <p className="text-[10px] text-slate-400">در هر ترم — اجباری برای همه دانشجویان</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-300">مجموع هر ترم</span>
                    <span className="text-xl font-black text-white">€۷۵۲.۹۲</span>
                  </div>
                  <p className="text-[10px] text-amber-200/80">۱۲ ترم = حدود €۹,۰۳۵ برای کل دوره کارشناسی</p>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-xs text-slate-300">
                  برای مقایسه: دانشجویان <strong className="text-white">اتحادیه اروپا</strong> فقط{' '}
                  <strong className="text-emerald-300">€۳۶۳.۳۶ + €۲۶.۲۰ = €۳۸۹.۵۶</strong> در هر ترم پرداخت می‌کنند.
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                  alt="شهریه تحصیل در اتریش برای دانشجویان غیر اتحادیه اروپا €۷۵۲ در ترم"
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

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">هزینه زندگی ماهانه (تخمینی)</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  <li className="flex justify-between"><span>خوابگاه دانشجویی</span><span className="font-bold">€۳۰۰ – €۵۰۰</span></li>
                  <li className="flex justify-between"><span>خورد و خوراک</span><span className="font-bold">€۲۵۰ – €۴۰۰</span></li>
                  <li className="flex justify-between"><span>حمل‌ونقل</span><span className="font-bold">€۳۰ – €۷۵</span></li>
                  <li className="flex justify-between"><span>بیمه درمانی (ÖGK)</span><span className="font-bold">€۷۸.۸۴</span></li>
                  <li className="flex justify-between border-t border-white/10 pt-1 mt-1"><span className="text-white font-bold">مجموع</span><span className="text-amber-300 font-black">€۹۰۰ – €۱,۲۰۰</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: VWU LANGUAGE PROGRAMME
          Image: Classroom / language learning
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-br from-sky-950/40 via-slate-900/60 to-[#061a21] border border-sky-400/20 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="کالج زبان VWU وین - دوره آمادگی آلمانی برای دانشگاه اتریش"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                VWU — کالج رسمی زبان دانشگاه‌های وین، حداکثر ۴ ترم فرصت
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 mb-3">
                <Languages className="h-4 w-4" />
                کالج زبان VWU
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                پذیرش مشروط + کالج زبان VWU
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                اگر سطح زبان آلمانی شما کمتر از C1 است، می‌توانید با{' '}
                <strong className="text-sky-300">سطح A2</strong> پذیرش مشروط بگیرید و در
                کالج رسمی VWU (Vorstudienlehrgang der Wiener Universitäten) ثبت‌نام کنید.
                در پایان، با قبولی در آزمون <strong className="text-sky-300">EPD</strong>{' '}
                (Ergänzungsprüfung Deutsch) وارد دروس اصلی می‌شوید.
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">هزینه (دانشگاه وین)</span>
                    <span className="text-sm font-black text-amber-300">€۱,۸۹۰ / ترم</span>
                  </div>
                  <p className="text-[10px] text-slate-400">شامل مواد آموزشی + کتاب (حدود €۱۰۰ اضافه)</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">مدت مجاز</span>
                    <span className="text-sm font-black text-sky-300">حداکثر ۴ ترم (۲ سال)</span>
                  </div>
                  <p className="text-[10px] text-slate-400">بسته به سطح اولیه، ۱ تا ۴ ترم</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">آزمون پایانی</span>
                    <span className="text-sm font-black text-emerald-300">EPD (C1)</span>
                  </div>
                  <p className="text-[10px] text-slate-400">در پایان هر ترم برگزار می‌شود (ژانویه/فوریه و ژوئن)</p>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-sky-500/10 border border-sky-400/20">
                <p className="text-[11px] text-sky-200 leading-relaxed">
                  <strong>نکته:</strong> برای ثبت‌نام در VWU، ابتدا باید پذیرش مشروط از
                  دانشگاه بگیرید. ثبت‌نام در VWU به‌منزله ثبت‌نام در دانشگاه نیست — دو
                  فرآیند جداگانه هستند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: APPLICATION TIMELINE
          Image: Calendar / planning
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-3">
                <CalendarDays className="h-4 w-4" />
                تقویم ۲۰۲۶
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                مهلت‌های申请 Universität Wien و TU Wien
              </h2>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Landmark className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">Universität Wien (غیر EU)</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    <li className="flex justify-between"><span>شروع申请</span><span className="font-bold">۲۲ ژوئن ۲۰۲۶</span></li>
                    <li className="flex justify-between"><span>پایان申请</span><span className="font-bold text-red-300">۳ آگوست ۲۰۲۶</span></li>
                    <li className="flex justify-between"><span>دوره پذیرش</span><span className="font-bold">۱۳ جولای – ۳۱ اکتبر</span></li>
                    <li className="flex justify-between"><span>شروع ترم</span><span className="font-bold">۱ اکتبر ۲۰۲۶</span></li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-4 w-4 text-sky-400" />
                    <span className="text-xs font-bold text-sky-300">TU Wien (غیر EU)</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    <li className="flex justify-between"><span>مهلت درخواست کتبی</span><span className="font-bold text-red-300">۱۵ جولای ۲۰۲۶</span></li>
                    <li className="flex justify-between"><span>مرحله VoR</span><span className="font-bold">۱ آوریل – ۵ سپتامبر</span></li>
                    <li className="flex justify-between"><span>دوره پذیرش</span><span className="font-bold">۶ جولای – ۳۱ اکتبر</span></li>
                    <li className="flex justify-between"><span>شروع ترم</span><span className="font-bold">۱ اکتبر ۲۰۲۶</span></li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400">
                    برای ترم تابستان ۲۰۲۷: Universität Wien — ۱۶ نوامبر ۲۰۲۶ تا ۷ ژانویه ۲۰۲۷
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                * توصیه: مدارک ترجمه‌شده و تأییدشده را حداقل ۳ ماه قبل از مهلت آماده کنید.
                تأخیر در تأییدیه (Legalisation) می‌تواند کل برنامه را به خطر بیندازد.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                  alt="تقویم申请 دانشگاه وین و TU Wien ۲۰۲۶ - مهلت‌ها و مدارک"
                  width={800}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                  Universität Wien: تا ۳ آگوست | TU Wien: تا ۱۵ جولای (غیر EU)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-400/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-red-200 leading-relaxed">
                    <strong>هشدار:</strong> برای ایران، مدارک کنکور یا پیش‌دانشگاهی نیز
                    ممکن است لازم باشد. Universität Wien صراحتاً اعلام کرده که برای برخی
                    کشورها از جمله ایران، اثبات صلاحیت تحصیلی (Studienberechtigung) الزامی است.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: VISA & FINANCIAL REQUIREMENTS
          Image: Passport / insurance / documents
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
                alt="ویزای تحصیلی اتریش - تمکن مالی و بیمه درمانی ۲۰۲۶"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                تمکن مالی ۲۰۲۶: €۱,۳۰۸.۳۹/ماه (مجرد) | بیمه: €۷۸.۸۴/ماه
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mb-3">
                <ShieldCheck className="h-4 w-4" />
                ویزای تحصیلی
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                مدارک و شرایط ویزای Student
              </h2>

              <div className="space-y-2.5">
                {[
                  { label: 'تمکن مالی (مجرد)', value: '€۱,۳۰۸.۳۹ / ماه', icon: Banknote, color: 'text-amber-300' },
                  { label: 'تمکن مالی (متأهل)', value: '€۲,۰۶۴.۱۲ / ماه', icon: Users, color: 'text-amber-300' },
                  { label: 'هر فرزند وابسته', value: '+ €۲۰۱.۸۸ / ماه', icon: HeartPulse, color: 'text-amber-300' },
                  { label: 'بیمه درمانی', value: 'پوشش ≥ €۳۰,۰۰۰', icon: ShieldCheck, color: 'text-emerald-300' },
                  { label: 'بیمه دانشجویی ÖGK', value: '€۷۸.۸۴ / ماه', icon: HeartPulse, color: 'text-emerald-300' },
                  { label: 'هزینه ویزا (Konsulargebühr)', value: '€۲۱۸', icon: FileCheck2, color: 'text-sky-300' },
                  { label: 'زمان پردازش', value: 'تا ۶ ماه', icon: Clock, color: 'text-sky-300' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${item.color}`} />
                        <span className="text-xs text-white">{item.label}</span>
                      </div>
                      <span className={`text-xs font-black ${item.color}`}>{item.value}</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                * مبالغ بر اساس استانداردهای ۲۰۲۶. تمکن مالی باید به‌صورت خالص (Netto) و
                معمولاً برای یک سال اثبات شود. بیمه مسافرتی اولیه با پوشش €۳۰,۰۰۰+ برای
                ورود لازم است، سپس بیمه دانشجویی ÖGK فعال می‌شود.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: WORK PERMIT FOR STUDENTS
          Image: Student working / café / part-time
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-3">
                <Briefcase className="h-4 w-4" />
                کار دانشجویی
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                ۲۰ ساعت کار در هفته — بدون آزمون بازار کار
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                دانشجویان غیر اتحادیه اروپا با ویزای Student می‌توانند تا{' '}
                <strong className="text-amber-300">۲۰ ساعت در هفته</strong> کار کنند.
                برای این سقف، <strong className="text-white">آزمون بازار کار (Arbeitsmarktprüfung) حذف شده است</strong> —
                یعنی کارفرما فقط باید مجوز اشتغال (Beschäftigungsbewilligung) از AMS بگیرد،
                بدون اینکه اثبات کند نیروی اتریشی/EEA برای آن شغل وجود ندارد.
              </p>

              <div className="space-y-2">
                {[
                  'کار تا ۲۰ ساعت/هفته: بدون آزمون بازار کار',
                  'بیش از ۲۰ ساعت: نیاز به مجوز جداگانه و آزمون بازار کار',
                  'کارفرما باید مجوز AMS را بگیرد (حتی برای کار جزئی)',
                  'کار دانشجویی نباید هدف اصلی اقامت را تحت‌الشعاع قرار دهد',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                * درآمد ۲۰ ساعت کار در اتریش معمولاً بین €۸۰۰ تا €۱,۲۰۰ در ماه است که
                بخش قابل‌توجهی از هزینه زندگی را پوشش می‌دهد. اما برای تمدید ویزا، باید
                تمکن مالی مستقل را نیز حفظ کنید.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80"
                alt="کار دانشجویی در اتریش - ۲۰ ساعت در هفته برای دانشجویان غیر اتحادیه اروپا"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                کار دانشجویی تا ۲۰ ساعت/هفته — مجوز AMS لازم است اما بدون آزمون بازار کار
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
            سوالات پرتکرار تحصیل در اتریش
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
            مسیر شما به دانشگاه‌های اتریش از اینجا شروع می‌شود
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
            دفتر وین دیاکو پرونده شما را مستقیماً به Universität Wien و TU Wien تحویل
            می‌دهد، ثبت‌نام VWU را هماهنگ می‌کند و در تمام مراحل ویزا همراه شماست.
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

export default AcademicAustriaPage;