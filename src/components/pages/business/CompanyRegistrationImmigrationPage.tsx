import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Building2,
  ShieldCheck,
  Briefcase,
  Landmark,
  BookOpen,
  ExternalLink,
  AlertTriangle,
  List,
  Award,
  Calendar,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const COMPANY_DESTINATIONS = [
  {
    key: 'austria',
    label: 'اتریش (GmbH / FlexKapG) 🇦🇹',
    capital: '۱۰,۰۰۰ تا ۵۰,۰۰۰ یورو (بسته به نوع ویزا)',
    timeline: '۳ تا ۶ ماه',
    tax: '۲۳٪ مالیات بر درآمد شرکتی',
    highlights: [
      'دو مسیر قدرتمند: ویزای استارتاپ (Start-up Founders با ۵۰ هزار یورو و تاییدیه AWS) و خوداشتغالی کلیدی (Selbständige Schlüsselkraft).',
      'معرفی ساختار شرکتی منعطف FlexKapG در سال ۲۰۲۶ ثبت شرکت در وین را ساده‌تر و سریع‌تر از گذشته کرده است.',
      'بالاترین اعتبار تجاری در قلب اروپا با دسترسی به سیستم بانکی شنگن و تحصیل رایگان فرزندان.',
    ],
    ctaLabel: 'مشاهده صفحه ثبت شرکت در اتریش (GmbH)',
    ctaPage: 'business-austria',
  },
  {
    key: 'germany',
    label: 'آلمان (GmbH / UG) 🇩🇪',
    capital: '۲۵,۰۰۰ یورو (نیمی هنگام ثبت)',
    timeline: '۳ تا ۶ ماه',
    tax: 'حدود ۳۰٪ (با مالیات محلی)',
    highlights: [
      'مبتنی بر ماده ۲۱ قانون اقامت آلمان (§ 21 AufenthG) با شرط پاسخگویی به یک نیاز اقتصادی منطقه‌ای.',
      'دسترسی مستقیم به بزرگ‌ترین بازار مصرف و صنعتی اتحادیه اروپا با امنیت حقوقی بسیار بالا.',
      'امکان تبدیل به اقامت دائم آلمان پس از ۳ سال موفقیت تجاری و تحقق بیزنس‌پلن.',
    ],
    ctaLabel: 'بررسی ویزای کارآفرینی و استارت‌آپ آلمان',
    ctaPage: 'startup-germany',
  },
  {
    key: 'hungary',
    label: 'مجارستان (Kft) 🇭🇺',
    capital: 'حدود ۸,۰۰۰ یورو (۳ میلیون فورینت)',
    timeline: '۲ تا ۴ ماه',
    tax: '۹٪ (پایین‌ترین در اتحادیه اروپا)',
    highlights: [
      'کمترین نرخ مالیات بر سود شرکتی در کل اتحادیه اروپا (فقط ۹٪) در شهر بوداپست.',
      'هزینه‌های اداری، حسابداری و نگهداری سالانه بسیار منطقی برای شرکت‌های بازرگانی، صادرات و IT.',
      'صدور کد مالیاتی اروپایی (EU VAT) و حساب تجاری برای تبادلات بانکی بین‌المللی.',
    ],
    ctaLabel: 'مشاهده ثبت شرکت و اقامت مجارستان',
    ctaPage: 'business-hungary',
  },
  {
    key: 'spain',
    label: 'اسپانیا (SL) 🇪🇸',
    capital: '۳,۰۰۰ یورو (همراه با تمکن مالی)',
    timeline: '۲ تا ۴ ماه',
    tax: '۲۵٪ (۱۵٪ برای استارتاپ‌ها)',
    highlights: [
      'با قانون استارتاپ‌ها (Ley de Startups) برای طرح‌های نوآورانه اقامت ۳ ساله اولیه اعطا می‌شود.',
      'هزینه‌های اولیه ثبت شرکت (Sociedad Limitada) نسبت به اروپای مرکزی بسیار پایین‌تر است.',
      'مسیر هموار برای توسعه کسب‌وکارهای دیجیتال، فناوری و خدمات بین‌المللی.',
    ],
    ctaLabel: 'بررسی ویزای دیجیتال نومد و کارآفرینی اسپانیا',
    ctaPage: 'nomad-spain',
  },
  {
    key: 'uae',
    label: 'امارات / دبی (Free Zone) 🇦🇪',
    capital: 'بدون نیاز به مسدودی سرمایه',
    timeline: '۲ تا ۴ هفته',
    tax: '۰٪ شخصی | ۰٪ تا ۹٪ شرکتی',
    highlights: [
      'ثبت شرکت در مناطق آزاد دبی با مالکیت ۱۰۰ درصدی و بدون نیاز به کفیل اماراتی.',
      'صدور کارت اقامت ۲ ساله امارات (Emirates ID) در کمتر از ۲۰ روز کاری همراه با افتتاح حساب بانکی بین‌المللی.',
      'معافیت مالیاتی شرکتی تا سقف ۳۷۵ هزار درهم سود و صفر درصد مالیات بر درآمد شخصی.',
    ],
    ctaLabel: 'مشاهده جزئیات ثبت شرکت و اقامت دبی',
    ctaPage: 'business-dubai',
  },
];

const COMPARISON_TABLE = [
  ['اتریش 🇦🇹', 'GmbH / FlexKapG', '۱۰,۰۰۰ تا ۵۰,۰۰۰ یورو', '۳ تا ۶ ماه', '۲۳٪', 'بالاترین اعتبار تجاری اروپا؛ مناسب استارتاپ‌ها و مدیران با بیزنس پلن قوی'],
  ['آلمان 🇩🇪', 'GmbH / UG', '۲۵,۰۰۰ یورو (نیمی هنگام ثبت)', '۳ تا ۶ ماه', 'حدود ۳۰٪ (با محلی)', 'بزرگ‌ترین بازار مصرف اروپا؛ نیازمند اثبات نیاز منطقه‌ای (§ 21 AufenthG)'],
  ['مجارستان 🇭🇺', 'Kft (مسئولیت محدود)', 'حدود ۸,۰۰۰ یورو (۳M HUF)', '۲ تا ۴ ماه', '۹٪ (پایین‌ترین در اروپا)', 'کمترین نرخ مالیات شرکتی اتحادیه اروپا و هزینه نگهداری پایین در بوداپست'],
  ['اسپانیا 🇪🇸', 'SL (Sociedad Limitada)', '۳,۰۰۰ یورو (+ تمکن مالی)', '۲ تا ۴ ماه', '۲۵٪ (۱۵٪ استارتاپ)', 'قوانین منعطف برای استارتاپ‌ها (Ley de Startups) و کسب‌وکارهای فناوری'],
  ['امارات (دبی) 🇦🇪', 'Free Zone / Mainland', 'بدون مسدودی سرمایه', '۲ تا ۴ هفته', '۰٪ تا ۹٪ (معاف تا ۳۷۵k AED)', 'سریع‌ترین صدور اقامت جهان، ۰٪ مالیات شخصی و نزدیکی جغرافیایی به ایران'],
];

const REGISTRATION_STEPS = [
  {
    step: 'گام اول',
    title: 'انتخاب ساختار حقوقی و تدوین بیزنس پلن',
    detail: 'نگارش طرح توجیهی اقتصادی، پیش‌بینی مالی ۳ ساله و تحلیل بازار هدف به زبان کشور مقصد یا انگلیسی.',
  },
  {
    step: 'گام دوم',
    title: 'تایید نام شرکت و تنظیم اساسنامه در دفتر اسناد رسمی (Notar)',
    detail: 'انتخاب نام تجاری، تعیین موضوع فعالیت و امضای اساسنامه شرکت (به صورت حضوری یا با وکالتنامه رسمی).',
  },
  {
    step: 'گام سوم',
    title: 'افتتاح حساب بانکی شرکتی و واریز سرمایه',
    detail: 'ارائه اسناد شفاف منشأ پول (Source of Funds) به بانک، افتتاح حساب و واریز سرمایه ثبتی شرکت.',
  },
  {
    step: 'گام چهارم',
    title: 'ثبت نهایی در اداره ثبت شرکت‌ها (Commercial Register)',
    detail: 'دریافت شماره ثبت شرکت (Firmenbuch)، کد مالیاتی (VAT / UID) و مجوز کسب‌وکار (Gewerbeschein).',
  },
  {
    step: 'گام پنجم',
    title: 'ثبت درخواست ویزا و دریافت کارت اقامت خانواده',
    detail: 'ارسال مدارک شرکت، بیزنس پلن و مدارک هویتی خانواده به سفارت یا اداره مهاجرت و دریافت کارت اقامت.',
  },
];

const faqs = [
  {
    q: 'آیا با ثبت شرکت در اروپا می‌توان بلافاصله اقامت دائم گرفت؟',
    a: 'خیر؛ در هیچ‌یک از کشورهای اروپایی ثبت شرکت منجر به اقامت دائم فوری نمی‌شود. ابتدا یک کارت اقامت موقت (معمولاً ۱ تا ۳ ساله) صادر می‌شود و پس از ۳ تا ۵ سال فعالیت واقعی شرکت و پرداخت مالیات و بیمه، واجد شرایط اقامت دائم خواهید شد.',
  },
  {
    q: 'آیا برای تمدید اقامت ثبت شرکت باید در آن کشور حضور داشته باشیم؟',
    a: 'در اکثر کشورهای اروپایی (مانند اتریش و آلمان)، مدیرعامل شرکت برای تمدید کارت اقامت خود باید حداقل ۱۸۳ روز در سال (بیش از ۶ ماه) در خاک اروپا حضور داشته باشد؛ اما در امارات متحده عربی تنها ورود هر ۶ ماه یک‌بار برای حفظ اقامت کافی است.',
  },
  {
    q: 'ارزان‌ترین کشور اروپایی برای ثبت شرکت و اخذ اقامت در سال ۲۰۲۷ کدام است؟',
    a: 'از نظر حداقل سرمایه ثبتی و نرخ مالیات شرکتی (۹ درصد)، مجارستان و از نظر هزینه‌های اولیه راه‌اندازی برای استارتاپ‌ها، اسپانیا جزو کم‌هزینه‌ترین گزینه‌های اتحادیه اروپا محسوب می‌شوند.',
  },
  {
    q: 'آیا سرمایه اولیه شرکت (مثلاً ۲۵ یا ۵۰ هزار یورو) بلوکه می‌ماند؟',
    a: 'خیر؛ سرمایه ثبتی شرکت پس از ثبت نهایی در اداره ثبت شرکت‌ها آزاد می‌شود و شما می‌توانید از آن برای هزینه‌های واقعی کسب‌وکار، اجاره دفتر، خرید تجهیزات، بازاریابی و پرداخت حقوق خود استفاده کنید.',
  },
];

const tocItems = [
  { id: 'how-it-works', label: 'سازوکار و مزایای ثبت شرکت (۲۰۲۶-۲۰۲۷)' },
  { id: 'comparison-table', label: 'جدول مقایسه ۵ کشور برتر ثبت شرکت' },
  { id: 'europe-destinations', label: 'تحلیل اتریش، آلمان، مجارستان و اسپانیا' },
  { id: 'uae-company', label: 'ثبت شرکت در دبی (سریع‌ترین مسیر)' },
  { id: 'step-by-step', label: 'مراحل گام‌به‌گام اخذ اقامت شرکتی' },
  { id: 'expert-insights', label: 'چالش حساب بانکی و نگهداری شرکت' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const CompanyRegistrationImmigrationPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedDestKey, setSelectedDestKey] = useState<string>('austria');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedDest =
    COMPANY_DESTINATIONS.find((d) => d.key === selectedDestKey) || COMPANY_DESTINATIONS[0];

  useSeo({
    title: 'مهاجرت از طریق ثبت شرکت ۲۰۲۶-۲۰۲۷ | انتخاب بهترین کشور و هزینه‌ها | دیاکو',
    description:
      'راهنمای جامع مهاجرت از طریق ثبت شرکت در سال‌های ۲۰۲۶ و ۲۰۲۷. مقایسه شرایط، حداقل سرمایه، مالیات و سرعت اخذ اقامت در اتریش، آلمان، مجارستان، اسپانیا و امارات.',
    canonical: 'https://www.dia-co.ir/immigration-through-company-registration',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'مهاجرت از طریق ثبت شرکت ۲۰۲۶',
      'بهترین کشور برای ثبت شرکت و اقامت ۲۰۲۷',
      'ثبت شرکت GmbH اتریش و آلمان',
      'ثبت شرکت مجارستان Kft',
      'ثبت شرکت دبی و اقامت ۲ ساله',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/immigration-through-company-registration/#article',
          headline: 'مهاجرت از طریق ثبت شرکت ۲۰۲۶-۲۰۲۷ | انتخاب بهترین کشور و هزینه‌ها',
          description:
            'راهنمای جامع مهاجرت از طریق ثبت شرکت در سال‌های ۲۰۲۶ و ۲۰۲۷. مقایسه شرایط، حداقل سرمایه، مالیات و سرعت اخذ اقامت در اتریش، آلمان، مجارستان، اسپانیا و امارات.',
          image: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:19:00+03:30',
          dateModified: '2026-11-14T13:19:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و توسعه کسب‌وکار بین‌الملل هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          reviewedBy: {
            '@type': 'Organization',
            name: 'دفتر اجرایی هلدینگ دیاکو در وین',
            url: 'https://www.dia-co.ir/',
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
          citation: [
            'https://www.migration.gv.at/',
            'https://www.make-it-in-germany.com/',
            'https://u.ae/en/information-and-services/visa-and-emirates-id',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/immigration-through-company-registration',
          },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/immigration-through-company-registration/#howto',
          name: 'مراحل گام‌به‌گام ثبت شرکت و اخذ کارت اقامت اروپا و امارات',
          step: REGISTRATION_STEPS.map((s, idx) => ({
            '@type': 'HowToStep',
            position: idx + 1,
            name: s.title,
            text: s.detail,
          })),
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/immigration-through-company-registration/#faq',
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
              onClick={() => navigateInternal('services')}
              className="hover:text-[#f5a623] transition cursor-pointer"
            >
              ثبت شرکت و توسعه کسب‌وکار بین‌الملل
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">مهاجرت از طریق ثبت شرکت ۲۰۲۶-۲۰۲۷</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('immigration-through-company-registration')}
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
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-[#f5a623]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-wrap items-center gap-2.5 text-xs mb-4">
            <span className="rounded-full bg-amber-400/15 border border-amber-400/40 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              راهنمای کارآفرینان و مدیران ۲۰۲۶–۲۰۲۷
            </span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 font-bold text-emerald-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-cyan-300" />
              تایید حقوقی دفتر اجرایی وین و بوداپست دیاکو
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            مهاجرت از طریق ثبت شرکت (۲۰۲۶–۲۰۲۷): راهنمای جامع انتخاب مناسب‌ترین کشور
          </h1>

          {/* Author & Reviewer E-E-A-T Bar */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان حقوقی و توسعه کسب‌وکار بین‌الملل هلدینگ دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">بازبینی حقوقی: </span>
              <strong className="text-amber-300">دفاتر رسمی وین، بوداپست، آتن و تهران</strong>
            </div>
          </div>

          {/* BLUF Box */}
          <div className="mt-6 rounded-3xl border border-amber-400/40 bg-gradient-to-l from-[#0e323f] via-[#092731] to-[#081f27] p-6 md:p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-black text-amber-300 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه تصمیم‌گیری مدیران و استخراج AI)</span>
            </div>
            <p className="text-sm md:text-base leading-8 text-slate-100 text-justify">
              مهاجرت از طریق ثبت شرکت در سال‌های ۲۰۲۶ و ۲۰۲۷ یکی از مطمئن‌ترین مسیرها برای کارآفرینان و مدیران جهت
              اخذ اقامت اروپا یا خاورمیانه بدون نیاز به مدرک زبان سنگین یا جاب‌آفر است. انتخاب مناسب‌ترین کشور کاملاً به
              هدف و بودجه شما بستگی دارد: <strong className="text-amber-300">امارات (دبی)</strong> با صدور اقامت ۲ ساله
              در کمتر از ۳ هفته و مالیات بسیار پایین سریع‌ترین گزینه است؛{' '}
              <strong className="text-emerald-300">مجارستان و اسپانیا</strong> کم‌هزینه‌ترین مسیرها برای ورود به منطقه
              شینگن هستند؛ و <strong className="text-cyan-300">اتریش و آلمان</strong> با وجود نیاز به بیزنس پلن قوی و
              سرمایه ثبتی مشخص (مانند ۲۵ تا ۵۰ هزار یورو)، بالاترین ثبات اقتصادی و اعتبار تجاری را در قلب اروپا ارائه می‌دهند.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>ارزیابی تخصصی پرونده ثبت شرکت</span>
              <TrendingUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('business-austria')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              ثبت شرکت اتریش (GmbH)
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('business-dubai')}
              className="rounded-2xl border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 px-5 py-3.5 text-sm font-bold text-amber-300 transition cursor-pointer"
            >
              ثبت شرکت دبی
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
            <span>فهرست مطالب و دسترسی سریع به بخش‌ها</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs">
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

        {/* How It Works */}
        <section id="how-it-works" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white">
            مهاجرت از طریق ثبت شرکت چگونه کار می‌کند و چه مزایایی دارد؟
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            در قوانین مهاجرتی اکثر کشورها، صرفِ ثبت کاغذی یک شرکت منجر به صدور ویزا نمی‌شود؛ بلکه متقاضی باید ثابت
            کند که از طریق تاسیس یک شخصیت حقوقی (مانند GmbH در اتریش و آلمان یا Kft در مجارستان)، یک فعالیت اقتصادی
            واقعی، سودآور یا نوآورانه را در کشور مقصد مدیریت می‌کند.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'عدم نیاز به مدرک زبان بین‌المللی',
                desc: 'در اکثر کشورهای اروپایی و امارات، برای ثبت شرکت و دریافت اقامت اولیه نیازی به ارائه مدرک آیلتس یا زبان بومی نیست.',
              },
              {
                title: 'پوشش همزمان خانواده',
                desc: 'همسر و فرزندان مجرد زیر ۱۸ سال به صورت همزمان اقامت دریافت کرده و از حق تحصیل رایگان و بیمه درمانی برخوردار می‌شوند.',
              },
              {
                title: 'استقلال مالی و تجاری بین‌المللی',
                desc: 'مالکیت ۱۰۰ درصدی شرکت، امکان افتتاح حساب بانکی بین‌المللی (IBAN اروپایی)، صدور فاکتور جهانی و بهره‌مندی از معاهدات تجاری اتحادیه اروپا.',
              },
              {
                title: 'مسیر روشن به اقامت دائم',
                desc: 'پس از ۳ تا ۵ سال فعالیت قانونی شرکت، پرداخت مالیات و بیمه، اقامت موقت به اقامت دائم و سپس پاسپورت تبدیل می‌شود.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs leading-6 text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول مقایسه بهترین کشورها برای ثبت شرکت و اقامت (۲۰۲۶–۲۰۲۷)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-amber-400/15 text-amber-300 font-black">
                <tr>
                  <th className="p-3.5">کشور مقصد</th>
                  <th className="p-3.5">ساختار رایج شرکت</th>
                  <th className="p-3.5">حداقل سرمایه ثبتی / مالی</th>
                  <th className="p-3.5">زمان صدور اقامت</th>
                  <th className="p-3.5">مالیات شرکتی</th>
                  <th className="p-3.5">ویژگی کلیدی و گروه هدف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {COMPARISON_TABLE.map((row) => (
                  <tr key={row[0]} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-white whitespace-nowrap">{row[0]}</td>
                    <td className="p-3.5 text-cyan-200 font-semibold">{row[1]}</td>
                    <td className="p-3.5 text-amber-200 font-bold">{row[2]}</td>
                    <td className="p-3.5 text-emerald-300 font-bold whitespace-nowrap">{row[3]}</td>
                    <td className="p-3.5 text-slate-200 font-semibold">{row[4]}</td>
                    <td className="p-3.5 text-slate-300 leading-6">{row[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Country Selector & European Analysis */}
        <section id="europe-destinations" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              تحلیل تخصصی مقاصد برتر اروپا و دبی برای ثبت شرکت در ۲۰۲۶–۲۰۲۷
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-300">
              کشور مورد نظر خود را انتخاب کنید تا جزئیات ساختار شرکتی، مالیات و صفحه تخصصی آن را ببینید:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {COMPANY_DESTINATIONS.map((dest) => (
              <button
                key={dest.key}
                type="button"
                onClick={() => setSelectedDestKey(dest.key)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer border ${
                  selectedDestKey === dest.key
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                {dest.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-cyan-400/25 bg-[#06181f] p-5 md:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-black text-amber-300">{selectedDest.label}</h3>
                <p className="text-xs text-slate-300 mt-1">
                  سرمایه مورد نیاز: <strong className="text-white">{selectedDest.capital}</strong> | مالیات:{' '}
                  <strong className="text-emerald-300">{selectedDest.tax}</strong>
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300">
                زمان پردازش: {selectedDest.timeline}
              </span>
            </div>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-200">
              {selectedDest.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 leading-7">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigateInternal(selectedDest.ctaPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                {selectedDest.ctaLabel} ←
              </button>
              {selectedDest.key === 'austria' && (
                <button
                  type="button"
                  onClick={() => navigateInternal('austria-startup-visa')}
                  className="rounded-xl bg-amber-400/15 border border-amber-400/40 px-4 py-2 text-xs font-black text-amber-200 hover:bg-amber-400/25 transition cursor-pointer"
                >
                  ویزای استارتاپ ۵۰ هزار یورویی اتریش ←
                </button>
              )}
            </div>
          </div>
        </section>

        {/* UAE Dubai Section */}
        <section id="uae-company" className="rounded-3xl border border-amber-400/25 bg-[#08222b] p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-amber-300">
            <Globe className="h-5 w-5" />
            <h2 className="text-xl md:text-2xl font-black text-white">
              ثبت شرکت در امارات (دبی) به عنوان سریع‌ترین دروازه تجاری ۲۰۲۶–۲۰۲۷
            </h2>
          </div>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            اگر در سال‌های ۲۰۲۶ و ۲۰۲۷ به دنبال سرعت بالا در خروج، دور زدن محدودیت‌های بانکی و عدم پرداخت مالیات
            سنگین هستید، امارات متحده عربی بی‌رقیب است: ثبت شرکت در مناطق آزاد دبی (Free Zone) بدون نیاز به کفیل
            اماراتی و با مالکیت ۱۰۰ درصدی انجام می‌شود و کارت اقامت ۲ ساله امارات (Emirates ID) ظرف کمتر از ۲۰ روز
            کاری همراه با امکان افتتاح حساب بانکی شرکتی و شخصی صادر می‌گردد.
          </p>
        </section>

        {/* Step by Step HowTo */}
        <section id="step-by-step" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white">
            مراحل گام‌به‌گام ثبت شرکت و دریافت کارت اقامت برای خانواده
          </h2>
          <div className="grid gap-4 md:grid-cols-5">
            {REGISTRATION_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/10 bg-[#06181f] p-4 space-y-2 flex flex-col"
              >
                <span className="inline-block w-fit rounded-lg bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 text-[11px] font-black text-amber-300">
                  {item.step}
                </span>
                <h3 className="text-xs font-black text-white leading-5">{item.title}</h3>
                <p className="text-[11px] leading-6 text-slate-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Information Gain */}
        <section
          id="expert-insights"
          className="rounded-3xl border border-rose-400/35 bg-gradient-to-l from-rose-950/35 via-[#0a232d] to-[#081f27] p-6 md:p-8 space-y-4"
        >
          <div className="flex items-center gap-2 text-rose-300 font-black text-sm">
            <AlertTriangle className="h-5 w-5" />
            <span>نکته تجربی از پرونده‌های واقعی (Information Gain — هلدینگ مهاجرتی دیاکو)</span>
          </div>
          <p className="text-sm leading-8 text-slate-100 text-justify">
            بر اساس تجربه مستقیم تیم حقوقی و بازرگانی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران،
            بزرگ‌ترین اشتباه متقاضیان ثبت شرکت این است که «هزینه ثبت اولیه شرکت را با هزینه واقعی نگهداری و تمدید اقامت
            اشتباه می‌گیرند». ثبت یک شرکت در اروپا ممکن است با چند هزار یورو انجام شود، اما برای تمدید کارت اقامت در
            سال‌های بعد، اداره مهاجرت و اداره مالیات از شما «فعالیت واقعی، صدور فاکتور، پرداخت حقوق مدیرعامل و حق بیمه
            ماهانه» را مطالبه می‌کنند.
          </p>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            چالش مهم دوم، سخت‌گیری بانک‌های اروپایی در افتتاح حساب شرکتی برای اتباع ایرانی است. تیم اجرایی دیاکو
            پیش از شروع فرآیند، ساختار مالی و منشأ سرمایه (Source of Funds) شما را بررسی کرده و با همراهی وکلای رسمی
            و مشاوران مالیاتی محلی در اتریش، مجارستان و یونان، هم حساب بانکی شرکتی را افتتاح می‌کند و هم مسیر تمدید
            قطعی اقامت تا دریافت اقامت دائم را تضمین می‌نماید.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول ثبت شرکت و اقامت (FAQ)</h2>
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

        {/* Internal & Official Links Footer Card */}
        <section className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>مسیرهای تخصصی مرتبط در پورتال دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'business-austria', label: 'ثبت شرکت در اتریش (GmbH)' },
                { page: 'austria-startup-visa', label: 'ویزای استارتاپ اتریش ۲۰۲۶' },
                { page: 'business-hungary', label: 'ثبت شرکت در مجارستان (۹٪ مالیات)' },
                { page: 'business-dubai', label: 'ثبت شرکت و اقامت دبی' },
                { page: 'startup-germany', label: 'کارآفرینی و استارت‌آپ آلمان' },
                { page: 'easiest-countries-to-immigrate-2027', label: 'راحت‌ترین کشورها ۲۰۲۷' },
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
              <span>منابع رسمی دولتی (Official Citations) و مشاوره</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'پورتال رسمی مهاجرت اتریش (migration.gv.at)', url: 'https://www.migration.gv.at/' },
                { label: 'پورتال رسمی دولت آلمان (Make it in Germany)', url: 'https://www.make-it-in-germany.com/' },
                { label: 'پورتال رسمی ویزا و اقامت امارات (u.ae)', url: 'https://u.ae/en/information-and-services/visa-and-emirates-id' },
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

export default CompanyRegistrationImmigrationPage;
