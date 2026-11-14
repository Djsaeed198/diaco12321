import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Hourglass,
  List,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const CASE_STUDIES = [
  {
    key: 'case1',
    anchor: 'case-1-canada',
    tab: 'پرونده ۱: مهندس IT در صف کانادا',
    title: 'پرونده اول: مهندس نرم‌افزار ۳۶ ساله در تله امتیازهای دست‌نیافتنی کانادا',
    profile: 'کارشناسی مهندسی کامپیوتر، ۱۰ سال سابقه کار، آیلتس ۷.۵، متاهل با یک فرزند',
    delayReason:
      'ورود به اکسپرس انتری کانادا از سال ۲۰۲۱؛ با گذشت هر سال به‌دلیل افزایش سن امتیاز کم شد و کف امتیاز قرعه‌کشی عمومی بالا رفت. ۴ سال انتظار بدون برنامه یادگیری فرانسه یا تغییر مقصد.',
    lesson:
      'در سال ۲۰۲۶ اکسپرس انتری بدون تسلط به فرانسه یا جاب‌آفر عملاً قفل است. همین متقاضی با تغییر مسیر به بلوکارت آلمان یا کارت RWR اتریش، صرفاً با زبان انگلیسی و قرارداد کاری IT ظرف ۵ ماه ویزای کار و اقامت خانواده دریافت کرد.',
    ctaLabel: 'بررسی بلوکارت آلمان (مسیر ۵ ماهه IT)',
    ctaPage: 'german-blue-card',
  },
  {
    key: 'case2',
    anchor: 'case-2-doctor',
    tab: 'پرونده ۲: پزشک عمومی (اجرای خطی)',
    title: 'پرونده دوم: پزشک عمومی درگیر در بوروکراسی خطی زبان و معادل‌سازی',
    profile: 'پزشک عمومی ۳۲ ساله با انگیزه بالا برای مهاجرت به آلمان',
    delayReason:
      'یادگیری آهسته زبان آلمانی تا B2 (۲.۵ سال) و تازه بعد از آن شروع ترجمه مدارک و ارسال پرونده معادل‌سازی Approbation (۱ سال)، و سپس انتظار طولانی وقت سفارت و آزمون FSP؛ مجموعاً نزدیک به ۵ سال و فرسودگی روحی.',
    lesson:
      'مهاجرت یک پروژه موازی (Parallel) است، نه خطی! از روزی که سطح زبان به A2 می‌رسد باید همزمان ترجمه مدارک، انتخاب ایالت مقصد و تشکیل پرونده معادل‌سازی آغاز شود تا همزمان با مدرک B2، تاییدیه و نوبت سفارت آماده باشد.',
    ctaLabel: 'مهاجرت پزشکان و کادر درمان به آلمان',
    ctaPage: 'medical-germany',
  },
  {
    key: 'case3',
    anchor: 'case-3-entrepreneur',
    tab: 'پرونده ۳: کارآفرین در غیرشینگن',
    title: 'پرونده سوم: کارآفرین ایرانی در بن‌بست کشورهای غیرشینگن',
    profile: 'مدیر شرکت بازرگانی ۴۲ ساله با سرمایه حدود ۴ میلیارد تومان',
    delayReason:
      'ثبت شرکت در یک کشور غیرشینگن (منطقه بالکان) در سال ۲۰۲۲ با هدف انتقال شعبه یا اخذ شینگن؛ ۳ سال پرداخت اجاره، حسابدار و مالیات، در نهایت انسداد حساب بانکی اروپایی و ۲ بار ریجکتی شینگن و سوخت ۴ سال زمان و بخش بزرگی از سرمایه.',
    lesson:
      'هرگز از کشورهای غیرشینگن به‌عنوان پل ورود به اتحادیه اروپا استفاده نکنید. با سرمایه ثبت شرکت، از روز اول در عضو واقعی شینگن مثل مجارستان (مالیات ۹٪) یا اتریش (FlexKapG و استارتاپ) اقدام کنید.',
    ctaLabel: 'مقایسه ثبت شرکت قانونی در شینگن',
    ctaPage: 'immigration-through-company-registration',
  },
  {
    key: 'case4',
    anchor: 'case-4-students',
    tab: 'پرونده ۴: زوج با استراتژی مبهم',
    title: 'پرونده چهارم: زوج دانشجو با استراتژی «اول بریم بعد ببینیم چی میشه»',
    profile: 'زوج ۲۸ ساله با مدرک کارشناسی و بودجه حدود ۱.۵ میلیارد تومان',
    delayReason:
      'ورود با ویزای دوره کوتاه‌مدت زبان به کشوری که اجازه کار به دانشجویان کالج زبان نمی‌داد و تبدیل ویزای زبان به کاری در خاک آن کشور ممنوع بود؛ پس از ۱ سال با اتمام پس‌انداز مجبور به بازگشت به ایران و ۴ سال عقب‌افتادگی شدند.',
    lesson:
      'قبل از خرید بلیت باید نقشه سال دوم و سوم اقامت را بدانید. کشوری را انتخاب کنید که قانون آن تبدیل مستقیم ویزای تحصیلی یا جستجوی کار به اقامت کاری را در داخل خاک اجازه دهد (مانند آلمان و اتریش).',
    ctaLabel: 'نقشه راه صحیح کالج زبان (۲۰۲۶–۲۰۲۷)',
    ctaPage: 'language-college-visa',
  },
];

const STRATEGY_COMPARISON_TABLE = [
  [
    'انتخاب مقصد',
    'پیروی از موج‌های قدیمی شبکه‌های اجتماعی بدون بررسی قوانین روز',
    'انتخاب مقصد بر اساس آخرین بخشنامه‌های مهاجرتی ۲۰۲۶–۲۰۲۷ و کمبود نیروی کار',
  ],
  [
    'مدیریت زمان',
    'اجرای خطی مراحل (اول زبان، بعد ترجمه، بعد استعلام دانشگاه)',
    'اجرای موازی آماده‌سازی مدارک و معادل‌سازی همزمان با یادگیری زبان',
  ],
  [
    'نگاه به اقامت',
    'تمرکز صرف بر «خروج از ایران» بدون برنامه برای تمدید سال دوم',
    'طراحی پرونده بر اساس شرایط واقعی تمدید اقامت و تبدیل به اقامت دائم',
  ],
  [
    'ریسک مالی',
    'پرداخت هزینه‌های پراکنده در کشورهای واسط یا قراردادهای غیرشفاف',
    'تدوین ترازنامه مالی دقیق از روز اول شامل تمام هزینه‌های پنهان و استقرار',
  ],
];

const faqs = [
  {
    q: 'سریع‌ترین مسیرهای مهاجرت به اروپا در سال‌های ۲۰۲۶ و ۲۰۲۷ چقدر زمان می‌برند؟',
    a: 'در حال حاضر، سریع‌ترین مسیرها شامل ویزای کار تخصصی (بلوکارت آلمان و کارت RWR اتریش با مسیر تسریع‌شده) و ثبت شرکت در مجارستان یا امارات هستند که کل پروسه آن‌ها از زمان تکمیل مدارک تا صدور ویزا بین ۲ تا ۵ ماه زمان می‌برد.',
  },
  {
    q: 'اگر چند سال در صف انتظار کشوری مثل کانادا مانده‌ایم، آیا تغییر مسیر به اروپا دیر است؟',
    a: 'خیر؛ به هیچ وجه. در سیستم‌های مهاجرتی اروپا (مانند کارت فرصت آلمان یا کارت قرمز-سفید-قرمز اتریش)، سابقه انتظار شما در کانادا هیچ امتیاز منفی ایجاد نمی‌کند و بسیاری از متقاضیان با استفاده از همان مدرک زبان انگلیسی و سابقه کار خود، در کمتر از ۶ ماه وارد بازار کار اروپا می‌شوند.',
  },
  {
    q: 'چطور بفهمیم پرونده فعلی ما در مسیر درستی است یا در حال فرسایشی شدن است؟',
    a: 'اگر بیش از ۹ ماه است که پرونده شما در یک مرحله متوقف مانده و وکیل یا موسسه شما هیچ کد رهگیری رسمی از اداره مهاجرت، سازمان ارزیابی مدرک یا سفارت کشور مقصد به شما ارائه نداده است، پرونده شما دچار رکود شده و نیازمند بازبینی فوری است.',
  },
  {
    q: 'آیا شروع همزمان دو پرونده در دو کشور مختلف کار درستی است؟',
    a: 'در برخی موارد خاص (مثلاً اقدام همزمان برای پذیرش تحصیلی در اتریش و ایتالیا) بله؛ اما ثبت همزمان دو درخواست ویزای شینگن در دو سفارت مختلف ممنوع است و باعث تداخل در سامانه مشترک شینگن (VIS) می‌شود.',
  },
];

const tocItems = [
  { id: 'why-5-years', label: 'چرا پروسه ۶ ماهه به ۵ سال تبدیل می‌شود؟' },
  { id: 'case-1-canada', label: 'کالبدشکافی ۴ پرونده واقعی (کانادا، پزشک، غیرشینگن، کالج)' },
  { id: 'comparison-table', label: 'جدول مقایسه استراتژی فرسایشی vs نقشه راه سریع دیاکو' },
  { id: 'expert-insights', label: 'نکته دیاکو: زمان‌بندی حقوقی و Gantt Chart' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const WhySomeWait5YearsPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedCase, setSelectedCase] = useState<string>('case1');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeCase = CASE_STUDIES.find((c) => c.key === selectedCase) || CASE_STUDIES[0];

  useSeo({
    title: 'چرا بعضی‌ها ۵ سال در صف مهاجرت می‌مانند؟ | تحلیل ۴ پرونده واقعی (۲۰۲۶) | دیاکو',
    description:
      'بررسی دلایل واقعی فرسایشی شدن پروسه مهاجرت و تحلیل ۴ پرونده واقعی که ۵ سال در انتظار ماندند. چگونه زمان مهاجرت به اروپا را در سال ۲۰۲۶-۲۰۲۷ به زیر ۶ ماه برسانیم؟',
    canonical: 'https://www.dia-co.ir/why-some-wait-5-years-for-immigration-case-studies',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'چرا مهاجرت ۵ سال طول میکشد',
      'تحلیل پرونده های واقعی مهاجرت ۲۰۲۶',
      'قفل شدن اکسپرس انتری کانادا و جایگزین اروپا',
      'اجرای موازی زبان و معادلسازی مدرک آلمان',
      'سریعترین مسیر مهاجرت به اروپا ۲۰۲۶-۲۰۲۷',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/why-some-wait-5-years-for-immigration-case-studies/#article',
          headline: 'چرا بعضی‌ها ۵ سال در صف مهاجرت می‌مانند؟ | تحلیل ۴ پرونده واقعی (۲۰۲۶)',
          description:
            'بررسی دلایل واقعی فرسایشی شدن پروسه مهاجرت و تحلیل ۴ پرونده واقعی که ۵ سال در انتظار ماندند. چگونه زمان مهاجرت به اروپا را در سال ۲۰۲۶-۲۰۲۷ به زیر ۶ ماه برسانیم؟',
          image: [
            'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:37:00+03:30',
          dateModified: '2026-11-14T13:37:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و مدیریت پرونده‌های بین‌الملل هلدینگ مهاجرتی دیاکو',
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
          citation: ['https://www.make-it-in-germany.com/', 'https://www.migration.gv.at/'],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/why-some-wait-5-years-for-immigration-case-studies',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/why-some-wait-5-years-for-immigration-case-studies/#faq',
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
              onClick={() => navigateInternal('immigration-timeline')}
              className="hover:text-[#f5a623] transition cursor-pointer"
            >
              زمان‌بندی و مدیریت پرونده
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">چرا بعضی‌ها ۵ سال در صف می‌مانند؟</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('why-some-wait-5-years-for-immigration-case-studies')}
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
              <Hourglass className="h-3.5 w-3.5" />
              تحلیل ۴ پرونده واقعی و زمان‌بندی حقوقی ۲۰۲۶–۲۰۲۷
            </span>
            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-300" />
              تایید دپارتمان مدیریت پرونده بین‌الملل دیاکو
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            چرا بعضی‌ها ۵ سال در صف مهاجرت می‌مانند؟ تحلیل ۴ پرونده واقعی (۲۰۲۶–۲۰۲۷)
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان حقوقی و مدیریت پرونده‌های بین‌الملل هلدینگ دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">بازبینی اجرایی: </span>
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
              دلیل اصلی طولانی شدن مهاجرت تا ۵ سال در سال‌های ۲۰۲۶ و ۲۰۲۷، نه دشواری ذاتی قوانین مهاجرتی، بلکه{' '}
              <strong className="text-amber-300">«انتخاب استراتژی اشتباه در نقطه شروع و نداشتن همزمانی در اجرای
              مراحل پرونده»</strong> است. متقاضیانی که سال‌ها در صف می‌مانند معمولاً در یکی از این ۴ تله گرفتار
              شده‌اند: ۱) انتظار فرسایشی در استخرهای امتیازی اشباع‌شده (مانند اکسپرس انتری کانادا بدون فرانسه یا
              جاب‌آفر)، ۲) اقدام از طریق کشورهای واسط غیرشینگن، ۳) یادگیری زبان و مدارک به‌صورت خطی به‌جای موازی، و
              ۴) بی‌توجهی به قوانین معادل‌سازی. با برنامه‌ریزی هدفمند در اتحادیه اروپا (آلمان، اتریش یا مجارستان) و
              اجرای موازی مراحل، این زمان به <strong className="text-emerald-300">۴ تا ۸ ماه</strong> کاهش می‌یابد.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>طراحی جدول زمان‌بندی معکوس پرونده شما (۴ تا ۸ ماه)</span>
              <Rocket className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('immigration-timeline')}
              className="rounded-2xl border border-cyan-400/35 bg-cyan-500/10 hover:bg-cyan-500/20 px-5 py-3.5 text-sm font-bold text-cyan-200 transition cursor-pointer"
            >
              تایم‌لاین واقعی مراحل مهاجرت
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('easiest-countries-to-immigrate-2027')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              سریع‌ترین مسیرهای ۲۰۲۷
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
            <span>فهرست مطالب تحلیل ۴ پرونده واقعی صف انتظار ۵ ساله</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs">
            {tocItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#08222b] px-3 py-2.5 text-slate-200 hover:border-[#f5a623] hover:text-amber-300 transition"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-400/15 text-[10px] font-black text-amber-300">
                  {idx + 1}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Why 5 Years */}
        <section id="why-5-years" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <Clock className="h-6 w-6 text-amber-300 shrink-0" />
            <span>چرا یک پروسه ۶ ماهه برای برخی افراد به ۵ سال تبدیل می‌شود؟</span>
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            در جلسات مشاوره بارها با افرادی روبه‌رو می‌شویم که از سال ۲۰۲۱ در حال اقدام برای مهاجرت هستند، کلی هزینه
            کرده‌اند اما هنوز در ایران مانده‌اند. وقتی پرونده آن‌ها را بررسی می‌کنیم، می‌بینیم که نه فاقد مهارت بوده‌اند
            و نه فاقد سرمایه؛ بلکه روی مسیرهای منقضی‌شده سرمایه‌گذاری کرده یا مراحل را به ترتیب غلط (خطی) چیده‌اند.
          </p>
        </section>

        {/* Interactive Case Studies Explorer */}
        <section id="case-1-canada" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              کالبدشکافی ۴ پرونده واقعی (۲۰۲۱ تا ۲۰۲۶) و درس‌های اجرایی هر پرونده
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-300">
              هر پرونده را انتخاب کنید تا شرایط اولیه، دلیل ۵ سال تاخیر و راه‌حل تغییر مسیر به اروپا را ببینید:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CASE_STUDIES.map((cs) => (
              <button
                key={cs.key}
                type="button"
                onClick={() => setSelectedCase(cs.key)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer border ${
                  selectedCase === cs.key
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                {cs.tab}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-cyan-400/25 bg-[#06181f] p-5 md:p-6 space-y-4">
            <h3 className="text-base md:text-lg font-black text-amber-300">{activeCase.title}</h3>
            <div className="space-y-3 text-xs md:text-sm leading-7 text-slate-200">
              <p>
                <strong className="text-cyan-300">شرایط اولیه: </strong>
                {activeCase.profile}
              </p>
              <p>
                <strong className="text-rose-300">چه اتفاقی افتاد (تله ۵ ساله): </strong>
                {activeCase.delayReason}
              </p>
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3.5 text-emerald-200 flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                <span>
                  <strong>درس پرونده برای ۲۰۲۶–۲۰۲۷: </strong>
                  {activeCase.lesson}
                </span>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => navigateInternal(activeCase.ctaPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                {activeCase.ctaLabel} ←
              </button>
            </div>
          </div>
        </section>

        {/* Anchored Cards for Cases 2, 3 & 4 */}
        <section className="grid gap-5 md:grid-cols-3">
          <div id="case-2-doctor" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-2">
            <h3 className="text-sm font-black text-amber-300">پرونده ۲: پزشک عمومی و اجرای خطی</h3>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              شروع ترجمه و Approbation همزمان با سطح زبان A2 به‌جای انتظار ۲.۵ ساله برای B2، پروسه پزشکی آلمان را از
              ۵ سال به حدود ۱۲ تا ۱۵ ماه کاهش می‌دهد.
            </p>
          </div>
          <div id="case-3-entrepreneur" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-2">
            <h3 className="text-sm font-black text-rose-300">پرونده ۳: بن‌بست شرکت غیرشینگن</h3>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              ثبت شرکت در بالکان غیرشینگن نه تنها منجر به اقامت اروپای غربی نشد بلکه با انسداد بانکی و ۲ ریجکتی
              شینگن همراه بود؛ مجارستان (۹٪ مالیات) و اتریش جایگزین قانونی روز اول هستند.
            </p>
          </div>
          <div id="case-4-students" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 space-y-2">
            <h3 className="text-sm font-black text-cyan-300">پرونده ۴: خروج بدون نقشه تمدید</h3>
            <p className="text-xs leading-7 text-slate-300 text-justify">
              کالج زبان بدون اجازه کار و تبدیل اقامت در داخل خاک، زوج ۲۸ ساله را پس از اتمام بودجه به نقطه صفر
              بازگرداند. نقشه سال دوم و سوم اقامت باید پیش از پرواز قطعی شود.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول مقایسه استراتژی فرسایشی در برابر نقشه راه سریع (۲۰۲۶–۲۰۲۷)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-emerald-500/15 text-emerald-300 font-black">
                <tr>
                  <th className="p-3.5">شاخص کلیدی</th>
                  <th className="p-3.5">استراتژی فرسایشی (صف انتظار ۵ ساله)</th>
                  <th className="p-3.5">نقشه راه مهندسی‌شده دیاکو (۴ تا ۸ ماه)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {STRATEGY_COMPARISON_TABLE.map((row) => (
                  <tr key={row[0]} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-amber-300 whitespace-nowrap">{row[0]}</td>
                    <td className="p-3.5 text-rose-200 leading-6">{row[1]}</td>
                    <td className="p-3.5 text-emerald-300 font-semibold leading-6">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            بر اساس تجربه مستقیم تیم مدیریتی و حقوقی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران، تفاوت
            یک پرونده موفق ۶ ماهه با یک پرونده فرسایشی ۵ ساله در یک عبارت خلاصه می‌شود:{' '}
            <strong className="text-amber-300">«زمان‌بندی حقوقی (Legal Timing)»</strong>. ظرفیت ویزای خودحمایتی
            اتریش در ابتدای سال میلادی ظرف چند روز پر می‌شود و ددلاین‌های بورسیه ایتالیا و دانشگاه‌های وین بسیار دقیق
            هستند. تیم اجرایی دیاکو برای هر موکل یک جدول زمان‌بندی معکوس (Gantt Chart) تعریف می‌کند تا ترجمه،
            معادل‌سازی، پذیرش و سفارت به‌صورت موازی و بدون حتی یک ماه اتلاف وقت پیش بروند.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول درباره زمان‌بندی مهاجرت (FAQ)</h2>
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
              <span>ابزارها و مسیرهای سریع ۴ تا ۸ ماهه در دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'immigration-timeline', label: 'تایم‌لاین واقعی مراحل مهاجرت' },
                { page: 'degree-recognition-for-immigration', label: 'اجرای موازی معادل‌سازی مدرک (ZAB/WES)' },
                { page: 'german-blue-card', label: 'بلوکارت آلمان (مسیر تسریع‌شده کاری)' },
                { page: 'austria-rwr', label: 'کارت قرمز-سفید-قرمز اتریش (RWR)' },
                { page: 'countries-we-do-not-recommend-for-immigration', label: 'کشورهایی که توصیه نمی‌کنیم (۲۰۲۶)' },
                { page: 'why-my-visa-was-rejected-10-real-reasons', label: '۱۰ دلیل واقعی ریجکتی ویزا' },
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
              <span>منابع رسمی آلمان و اتریش و بازبینی فوری پرونده</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'پورتال رسمی دولت آلمان (Make it in Germany)', url: 'https://www.make-it-in-germany.com/' },
                { label: 'پورتال رسمی دولت اتریش (Migration.gv.at)', url: 'https://www.migration.gv.at/' },
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

export default WhySomeWait5YearsPage;
