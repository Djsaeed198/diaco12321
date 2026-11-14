import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  ChevronDown,
  DollarSign,
  ExternalLink,
  Globe,
  Laptop,
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

const NOMAD_COUNTRIES = [
  {
    key: 'spain',
    tab: 'اسپانیا (قانون بکهام ۲۴٪)',
    country: 'اسپانیا',
    minIncome: 'حدود ۲,۸۵۰ یورو در ماه (۲۰۰٪ حداقل دستمزد)',
    validity: '۱ سال (قابل تمدید تا ۵ سال)',
    taxStatus: 'اعمال قانون بکهام (مالیات تخت ۲۴٪ تا سقف ۶۰۰,۰۰۰ یورو)',
    prEligibility: 'بله (پس از ۵ سال)',
    tone: 'text-emerald-300',
    details:
      'محبوب‌ترین پکیج اقامت و مالیات در اروپا: به جای مالیات تصاعدی سنگین تا ۴۷٪، کارمندان شرکت‌های خارجی از نرخ ثابت ۲۴٪ قانون بکهام بهره‌مند می‌شوند و سال‌های اقامت برای اقامت دائم محسوب می‌شود.',
    ctaLabel: 'جزئیات ویزای دیجیتال نوماد اسپانیا',
    ctaPage: 'nomad-spain',
  },
  {
    key: 'portugal',
    tab: 'پرتغال (ویزای D8)',
    country: 'پرتغال',
    minIncome: 'حدود ۳,۶۸۰ یورو در ماه (۴ برابر حداقل دستمزد)',
    validity: '۱ تا ۲ سال (از طریق اقامت D8)',
    taxStatus: 'مالیات تصاعدی عمومی (پس از انتقال اقامت)',
    prEligibility: 'بله (مسیر رسمی به اقامت دائم و پاسپورت ۵ ساله)',
    tone: 'text-emerald-300',
    details:
      'علاوه بر تمکن مالی D7، پرتغال با ویزای اختصاصی D8 از دورکاران و فریلنسرها در لیسبون و پورتو استقبال می‌کند و یکی از شفاف‌ترین مسیرهای اروپا به اقامت دائم و پاسپورت ۵ ساله را دارد.',
    ctaLabel: 'مسیرهای پرتغال (D8 و استقرار)',
    ctaPage: 'jobseeker-portugal',
  },
  {
    key: 'greece',
    tab: 'یونان (تخفیف ۵۰٪ مالیاتی)',
    country: 'یونان',
    minIncome: '۳,۵۰۰ یورو در ماه خالص (+۲۰٪ برای همسر)',
    validity: '۱ سال (قابل تبدیل به پروانه ۲ ساله)',
    taxStatus: '۵۰٪ تخفیف مالیاتی برای واجدین شرایط (تا ۷ سال)',
    prEligibility: 'بله (تحت شرایط خاص)',
    tone: 'text-cyan-300',
    details:
      'با انتقال مرکز منافع مالی به یونان، متقاضیان می‌توانند تا ۷ سال از کسر ۵۰ درصدی مالیات بر درآمد بهره‌مند شوند و در آتن یا جزایر مدیترانه زندگی کنند.',
    ctaLabel: 'خدمات اقامت و سرمایه‌گذاری یونان',
    ctaPage: 'business-greece',
  },
  {
    key: 'italy',
    tab: 'ایتالیا (~۲,۳۰۰ تا ۲,۷۰۰ €)',
    country: 'ایتالیا',
    minIncome: 'حدود ۲,۳۰۰ تا ۲,۷۰۰ یورو در ماه',
    validity: '۱ سال (قابل تمدید)',
    taxStatus: 'مالیات استاندارد یا رژیم‌های حمایتی فریلنسری',
    prEligibility: 'بله',
    tone: 'text-cyan-300',
    details:
      'کمترین آستانه درآمد ماهانه در اروپای غربی برای متخصصان دورکار با مهارت بالا و امکان تمدید سالانه همراه با خانواده.',
    ctaLabel: 'مقایسه مسیرهای کاری ایتالیا',
    ctaPage: 'italy-blue-card',
  },
  {
    key: 'dubai',
    tab: 'امارات / دبی (۰٪ مالیات)',
    country: 'امارات (دبی)',
    minIncome: 'حدود ۳,۵۰۰ تا ۵,۰۰۰ دلار در ماه',
    validity: '۱ تا ۲ سال (Virtual Working Program)',
    taxStatus: 'صفر درصد (۰٪) بر درآمد شخصی دورکاری',
    prEligibility: 'خیر (اقامت موقت قابل تمدید)',
    tone: 'text-amber-300',
    details:
      'بهشت معافیت مالیاتی دورکاران پردرآمد: با اثبات درآمد دلاری و بیمه درمانی، اقامت دبی صادر می‌شود، کل درآمد ارزی بدون مالیات حفظ می‌گردد و دسترسی پروازی به ایران سریع است.',
    ctaLabel: 'جزئیات ویزای نومد و ریموت دبی',
    ctaPage: 'nomad-dubai',
  },
  {
    key: 'croatia',
    tab: 'کرواسی (معاف از مالیات)',
    country: 'کرواسی',
    minIncome: 'حدود ۳,۶۲۳ یورو در ماه',
    validity: 'تا ۱۸ ماه (غیرقابل تمدید پشت‌سرهم)',
    taxStatus: 'معافیت کامل مالیاتی بر درآمد خارجی دورکاری',
    prEligibility: 'خیر (بدون مسیر اقامت دائم)',
    tone: 'text-amber-300',
    details:
      'مناسب برای اقامت موقت ۱۸ ماهه در کرواسی با معافیت کامل مالیات بر درآمد خارجی؛ اما برای کسانی که قصد گرفتن اقامت دائم اروپا را دارند مناسب نیست.',
    ctaLabel: 'راهنمای ویزای نومد کرواسی',
    ctaPage: 'nomad-croatia',
  },
];

const faqs = [
  {
    q: 'آیا با داشتن ویزای نومد دیجیتال می‌توانیم خانواده خود را همراه ببریم؟',
    a: 'بله؛ تقریباً تمام برنامه‌های معتبر نومد دیجیتال در اروپا و امارات به شما اجازه می‌دهند همسر و فرزندان زیر ۱۸ سال خود را به‌عنوان همراه (Dependents) وارد کشور مقصد کنید (البته باید ضریب افزایش تمکن مالی خانواده را در درآمد خود لحاظ کنید).',
  },
  {
    q: 'آیا برای ویزای نومد دیجیتال به مدرک زبان محلی (مثل اسپانیایی یا پرتغالی) نیاز داریم؟',
    a: 'خیر؛ از آنجا که فعالیت شما به‌صورت آنلاین و با مشتریان خارجی انجام می‌شود، برای دریافت ویزای نومد هیچ نیازی به ارائه مدرک زبان بومی کشور مقصد ندارید؛ داشتن تسلط کافی به زبان انگلیسی برای ارتباطات اداری کافی است.',
  },
  {
    q: 'آیا درآمد حاصل از رمزارزها یا ترید به‌عنوان درآمد قابل قبول برای ویزای نومد پذیرفته می‌شود؟',
    a: 'خیر؛ ادارات مهاجرت کشورهای اروپایی درآمد حاصل از ترید کریپتو، بورس یا سرمایه‌گذاری‌های پرخطر را به‌عنوان «درآمد پایدار ماهانه مشاغل دورکار» قبول نمی‌کنند. منبع درآمد شما باید حقوق ماهانه استخدامی یا درآمد فریلنسری خدمات دیجیتال باشد.',
  },
  {
    q: 'تفاوت اصلی ویزای نومد دیجیتال (Digital Nomad) با ویزای تمکن مالی (FIP / D7) چیست؟',
    a: 'در ویزای تمکن مالی (FIP)، شما نباید شاغل باشید و درآمد شما باید از سود سپرده، اجاره ملک یا سود سهام تامین شود؛ اما در ویزای نومد دیجیتال (Digital Nomad)، شما باید فعال و شاغل باشید و از طریق ارائه خدمات فنی، مهندسی، طراحی، نویسندگی یا مدیریت آنلاین درآمد کسب کنید.',
  },
];

const tocItems = [
  { id: 'what-is-digital-nomad', label: 'تفاوت ویزای نومد دیجیتال با توریستی' },
  { id: 'comparison-table', label: 'جدول مقایسه درآمد، اقامت و مالیات ۲۰۲۶–۲۰۲۷' },
  { id: 'top-europe-nomad', label: 'بررسی اسپانیا، پرتغال (D8) و یونان' },
  { id: 'dubai-nomad', label: 'امارات (دبی): بهشت معافیت مالیاتی ۰٪' },
  { id: 'tax-trap-183-days', label: 'تله پنهان مالیاتی و قانون ۱۸۳ روز' },
  { id: 'expert-insights', label: 'نکته دیاکو: اثبات قراردادهای فریلنسری B2B' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const BestDigitalNomadVisasPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('spain');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeNomad = NOMAD_COUNTRIES.find((c) => c.key === selectedCountry) || NOMAD_COUNTRIES[0];

  useSeo({
    title: 'ویزای نومد دیجیتال ۲۰۲۶-۲۰۲۷ | جدول مقایسه درآمد و مالیات بهترین کشورها | دیاکو',
    description:
      'راهنمای جامع ویزای نومد دیجیتال در سال‌های ۲۰۲۶ و ۲۰۲۷. مقایسه تخصصی حداقل درآمد ماهانه، قانون بکهام اسپانیا (۲۴٪)، پرتغال D8، یونان، ایتالیا و معافیت ۰٪ دبی.',
    canonical: 'https://www.dia-co.ir/best-digital-nomad-visas-income-tax-comparison',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'ویزای نومد دیجیتال ۲۰۲۶ و ۲۰۲۷',
      'ویزای دیجیتال نومد اسپانیا قانون بکهام',
      'ویزای D8 پرتغال و نومد یونان',
      'اقامت فریلنسری و دورکاری دبی',
      'قانون ۱۸۳ روز مالیات نومد دیجیتال',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/best-digital-nomad-visas-income-tax-comparison/#article',
          headline: 'ویزای نومد دیجیتال ۲۰۲۶-۲۰۲۷ | جدول مقایسه درآمد و مالیات بهترین کشورها',
          description:
            'راهنمای جامع ویزای نومد دیجیتال در سال‌های ۲۰۲۶ و ۲۰۲۷. مقایسه تخصصی حداقل درآمد ماهانه، شرایط مالیاتی و اقامت در اسپانیا، پرتغال، یونان، ایتالیا و امارات.',
          image: [
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:48:00+03:30',
          dateModified: '2026-11-14T13:48:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و توسعه اقامت‌های نوین بین‌الملل هلدینگ مهاجرتی دیاکو',
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
          citation: ['https://www.exteriores.gob.es/', 'https://aima.gov.pt/', 'https://mfa.gr/'],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/best-digital-nomad-visas-income-tax-comparison',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/best-digital-nomad-visas-income-tax-comparison/#faq',
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
              onClick={() => navigateInternal('nomad-spain')}
              className="hover:text-[#f5a623] transition cursor-pointer"
            >
              اقامت‌های دیجیتال نومد و دورکاری
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">مقایسه ویزای نومد دیجیتال (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('best-digital-nomad-visas-income-tax-comparison')}
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
              <Laptop className="h-3.5 w-3.5" />
              مقایسه مالیاتی و درآمدی دورکاران (۲۰۲۶–۲۰۲۷)
            </span>
            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-300" />
              تایید دپارتمان اقامت‌های نوین بین‌الملل
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            ویزای نومد دیجیتال (۲۰۲۶–۲۰۲۷): کدام کشورها بهترین شرایط درآمدی و مالیاتی را دارند؟
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان حقوقی و توسعه اقامت‌های نوین بین‌الملل دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">بازبینی مالیاتی و حقوقی: </span>
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
              ویزای نومد دیجیتال در سال‌های ۲۰۲۶ و ۲۰۲۷ بهترین مسیر برای فریلنسرها، متخصصان دورکار و صاحبان
              کسب‌وکارهای آنلاین با درآمد ارزی پایدار است. بر اساس جدول مقایسه‌ای ۲۰۲۶:{' '}
              <strong className="text-amber-300">اسپانیا</strong> (قانون بکهام با مالیات تخت ۲۴٪ و اقامت دائم ۵
              ساله)، <strong className="text-cyan-300">پرتغال</strong> (ویزای D8 با مسیر شفاف پاسپورت ۵ ساله)،{' '}
              <strong className="text-emerald-300">یونان</strong> (تخفیف ۵۰٪ مالیاتی تا ۷ سال) و{' '}
              <strong className="text-emerald-300">امارات (دبی)</strong> (۰٪ مالیات بر درآمد شخصی) معتبرترین مقاصد
              جهان برای ایرانیان دارای درآمد ارزی هستند.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>ارزیابی قراردادهای B2B و انتخاب کشور نومد</span>
              <Rocket className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('nomad-spain')}
              className="rounded-2xl border border-cyan-400/35 bg-cyan-500/10 hover:bg-cyan-500/20 px-5 py-3.5 text-sm font-bold text-cyan-200 transition cursor-pointer"
            >
              ویزای نومد اسپانیا (مالیات ۲۴٪)
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('nomad-dubai')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              نومد دبی (۰٪ مالیات)
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
            <span>فهرست مطالب ویزای نومد دیجیتال (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            {tocItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#08222b] px-3 py-2.5 text-slate-200 hover:border-[#f5a623] hover:text-amber-300 transition"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-400/15 text-[10px] font-black text-amber-300">
                  {idx + 1}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* What Is Digital Nomad */}
        <section id="what-is-digital-nomad" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <Globe className="h-6 w-6 text-amber-300 shrink-0" />
            <span>ویزای نومد دیجیتال چیست و چه تفاوتی با ویزای توریستی دارد؟</span>
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            کار کردن با لپ‌تاپ در اروپا با ویزای توریستی در منطقه خاکستری قانون قرار داشت؛ اما با ویزای اختصاصی
            نومد دیجیتال، اقامت قانونی ۱ تا ۳ ساله (قابل تمدید) دریافت می‌کنید، اجازه افتتاح حساب بانکی محلی دارید،
            خانواده‌تان می‌توانند همراه شما زندگی کنند و در کشورهایی مانند اسپانیا، پرتغال و یونان این سال‌ها جزو
            سابقه دریافت اقامت دائم و پاسپورت محاسبه می‌شود.
          </p>
        </section>

        {/* Interactive Explorer */}
        <section className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              کاوشگر ۶ کشور برتر نومد دیجیتال از نظر درآمد و مالیات (۲۰۲۶–۲۰۲۷)
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-300">
              هر کشور را انتخاب کنید تا آستانه درآمد، وضعیت مالیاتی (بکهام، تخفیف ۵۰٪ یا ۰٪) و مسیر اقامت دائم آن را
              ببینید:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {NOMAD_COUNTRIES.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedCountry(c.key)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer border ${
                  selectedCountry === c.key
                    ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                    : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                }`}
              >
                {c.tab}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-cyan-400/25 bg-[#06181f] p-5 md:p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base md:text-lg font-black text-amber-300">
                {activeNomad.country}: {activeNomad.minIncome}
              </h3>
              <span className={`text-xs font-black ${activeNomad.tone}`}>
                اقامت دائم: {activeNomad.prEligibility}
              </span>
            </div>
            <p className="text-xs md:text-sm text-cyan-200 font-semibold">
              مالیات و مدت اعتبار: {activeNomad.taxStatus} | {activeNomad.validity}
            </p>
            <p className="text-xs md:text-sm leading-7 text-slate-200 text-justify">{activeNomad.details}</p>
            <div>
              <button
                type="button"
                onClick={() => navigateInternal(activeNomad.ctaPage)}
                className="rounded-xl bg-cyan-500/15 border border-cyan-400/40 px-4 py-2 text-xs font-black text-cyan-200 hover:bg-cyan-500/25 transition cursor-pointer"
              >
                {activeNomad.ctaLabel} ←
              </button>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول مقایسه جامع درآمد، مدت اقامت و شرایط مالیاتی بهترین کشورهای نومد (۲۰۲۶–۲۰۲۷)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-amber-400/15 text-amber-300 font-black">
                <tr>
                  <th className="p-3.5">کشور مقصد</th>
                  <th className="p-3.5">حداقل درآمد ماهانه مورد نیاز (۲۰۲۶)</th>
                  <th className="p-3.5">مدت اعتبار اولیه و قابل تمدید</th>
                  <th className="p-3.5">وضعیت مالیات بر درآمد خارجی</th>
                  <th className="p-3.5">تبدیل به اقامت دائم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {NOMAD_COUNTRIES.map((row) => (
                  <tr key={row.key} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-white whitespace-nowrap">{row.country}</td>
                    <td className="p-3.5 text-cyan-200 font-bold">{row.minIncome}</td>
                    <td className="p-3.5 text-slate-200">{row.validity}</td>
                    <td className="p-3.5 text-slate-200 leading-6">{row.taxStatus}</td>
                    <td className={`p-3.5 font-black ${row.tone}`}>{row.prEligibility}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Europe vs Dubai + 183 Day Trap */}
        <section className="grid gap-6 md:grid-cols-3">
          <div id="top-europe-nomad" className="rounded-3xl border border-cyan-400/25 bg-[#08222b] p-6 space-y-2.5">
            <h3 className="text-base font-black text-cyan-300">اروپا: اسپانیا، پرتغال D8 و یونان</h3>
            <p className="text-xs leading-7 text-slate-200 text-justify">
              اسپانیا با قانون بکهام (۲۴٪ تا ۶۰۰ هزار یورو)، پرتغال با ویزای D8 و مسیر شفاف پاسپورت ۵ ساله، و یونان با
              تخفیف ۵۰٪ مالیات درآمد تا ۷ سال، بهترین پکیج اقامت دائم + بهینه‌سازی مالیاتی در اروپا را ارائه می‌دهند.
            </p>
          </div>
          <div id="dubai-nomad" className="rounded-3xl border border-emerald-400/25 bg-[#08222b] p-6 space-y-2.5">
            <h3 className="text-base font-black text-emerald-300 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>دبی: بهشت ۰٪ مالیات دورکاران</span>
            </h3>
            <p className="text-xs leading-7 text-slate-200 text-justify">
              با برنامه اقامت مجازی دبی (Virtual Working Program) و اثبات درآمد ۳,۵۰۰ تا ۵,۰۰۰ دلاری و بیمه، تمام
              درآمد ارزی خود را بدون ۱٪ مالیات شخصی حفظ می‌کنید و با پروازهای کوتاه به ایران در ارتباط می‌مانید.
            </p>
          </div>
          <div id="tax-trap-183-days" className="rounded-3xl border border-rose-400/25 bg-[#08222b] p-6 space-y-2.5">
            <h3 className="text-base font-black text-rose-300">تله پنهان قانون ۱۸۳ روز مالیاتی</h3>
            <p className="text-xs leading-7 text-slate-200 text-justify">
              اگر بیش از ۱۸۳ روز در سال در یک کشور زندگی کنید، مقیم مالیاتی (Tax Resident) آن کشور می‌شوید. برخلاف
              کرواسی، در اسپانیا و پرتغال پس از ۱۸۳ روز باید مالیات محلی (با رژیم بکهام یا عمومی) بپردازید؛ حتماً
              پیش از اقدام ساختار مالیاتی خود را چک کنید.
            </p>
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
            بر اساس تجربه مستقیم دپارتمان حقوقی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران، چالش اصلی
            نومدهای دیجیتال ایرانی نه گرفتن ویزا، بلکه{' '}
            <strong className="text-amber-300">«اثبات قانونی قراردادهای فریلنسری یا استخدامی به سفارت است»</strong>.
            اگر با چندین کارفرمای مختلف کار می‌کنید، ارائه فاکتورهای نامنظم بانکی برای افسر قانع‌کننده نیست. تیم حقوقی
            دیاکو با تدوین <strong className="text-cyan-300">قراردادهای B2B استاندارد</strong>، مستندسازی واریزهای
            منظم ماهانه و گواهی‌های اشتغال معتبر، ریسک رد شدن پرونده در سفارت اسپانیا، یونان یا پرتغال را به صفر
            می‌رساند.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول ویزای نومد دیجیتال (FAQ)</h2>
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
              <span>مسیرهای تخصصی نومد دیجیتال و مالیات در دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'nomad-spain', label: 'ویزای دیجیتال نوماد اسپانیا (قانون بکهام)' },
                { page: 'nomad-hungary', label: 'وایت کارت نومد دیجیتال مجارستان' },
                { page: 'nomad-croatia', label: 'اقامت ۱۸ ماهه نومد کرواسی' },
                { page: 'nomad-dubai', label: 'ویزای ریموت و فریلنسری دبی (۰٪)' },
                { page: 'immigration-through-company-registration', label: 'ثبت شرکت در اروپا و دبی' },
                { page: 'single-vs-married-immigration-which-is-easier', label: 'مهاجرت مجردها در مقابل متأهل‌ها' },
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
              <span>منابع رسمی دولت‌های اسپانیا، پرتغال و یونان</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: 'وزارت خارجه اسپانیا (Exteriores)', url: 'https://www.exteriores.gob.es/' },
                { label: 'آژانس مهاجرت پرتغال (AIMA)', url: 'https://aima.gov.pt/' },
                { label: 'وزارت خارجه یونان (MFA Greece)', url: 'https://mfa.gr/' },
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

export default BestDigitalNomadVisasPage;
