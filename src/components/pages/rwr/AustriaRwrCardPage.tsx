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
  ShieldCheck,
  Building2,
  Scale,
  Award,
  Euro,
  FileCheck2,
  Briefcase,
  GraduationCap,
  Users,
  Compass,
  FileSpreadsheet,
  CheckCheck,
  AlertTriangle,
  MapPin,
  Calendar,
  TrendingUp,
  BookOpen,
  Languages,
  Banknote,
  FileWarning,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const AustriaRwrCardPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTab, setActiveTab] = useState<'points' | 'categories' | 'process' | 'comparison'>('points');

  useSeo({
    title: 'کارت قرمز-سفید-قرمز اتریش ۲۰۲۶ | ۵۵ امتیاز + حقوق ۳,۴۶۵€',
    description:
      'راهنمای کامل RWR Card اتریش ۲۰۲۶: حداقل ۵۵ امتیاز از ۹۰ برای مشاغل短缺، حقوق پایه ۳,۴۶۵ یورو، ۵ دسته متقاضیان، لیست مشاغل مورد نیاز و مسیر ۵ ساله تا اقامت دائم با دفتر وین دیاکو.',
    canonical: '/guides/austria-rwr',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'کارت قرمز سفید قرمز اتریش ۲۰۲۶',
      'Rot-Weiß-Rot-Karte',
      'اقامت کاری اتریش',
      'حداقل حقوق RWR ۳۴۶۵ یورو',
      'جدول امتیازات RWR ۵۵',
      'مشاغل دارای کمبود نیرو اتریش ۲۰۲۶',
      'تبدیل RWR به RWR Plus',
      'اداره MA35 وین',
      'مهاجرت کاری به اتریش',
      'Daueraufenthalt-EU اتریش',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/austria-rwr#article',
          headline: 'راهنمای جامع کارت قرمز-سفید-قرمز اتریش ۲۰۲۶: ۵۵ امتیاز، حقوق ۳,۴۶۵€ و مسیر ۵ ساله',
          description:
            'بررسی کامل RWR Card اتریش تحت NAG §41: دو مسیر اصلی (مشاغل短缺 ۵۵/۹۰ و نخبگان ۷۰/۱۰۰)، حداقل حقوق ۳,۴۶۵ یورو، لیست Mangelberufe ۲۰۲۶، فرآیند MA35 و مسیر تبدیل به RWR Plus و اقامت دائم.',
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
            { '@type': 'Thing', name: 'Rot-Weiß-Rot-Karte' },
            { '@type': 'Thing', name: 'Mangelberufe Österreich' },
            { '@type': 'Thing', name: 'NAG §41' },
          ],
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/austria-rwr#howto',
          name: 'مراحل دریافت کارت قرمز-سفید-قرمز اتریش',
          description: 'فرآیند ۶ مرحله‌ای اخذ RWR Card با هماهنگی دفتر وین دیاکو',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'ارزیابی امتیازات و مسیر',
              text: 'محاسبه امتیاز بر اساس جدول AMS (۵۵/۹۰ برای مشاغل短缺، ۷۰/۱۰۰ برای نخبگان). بررسی تطابق شغل با لیست Mangelberufe ۲۰۲۶.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'دریافت جاب‌آفر با حقوق حداقل ۳,۴۶۵€',
              text: 'کارفرمای اتریشی باید حقوق پایه ۳,۴۶۵ یورو (۲۰۲۶) به‌علاوه پرداخت‌های ویژه را تضمین کند.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'ثبت درخواست در MA35 یا سفارت',
              text: 'کارفرما می‌تواند در MA35 وین ثبت کند، یا متقاضی در سفارت. دفتر وین دیاکو پیگیری مستقیم انجام می‌دهد.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'تأیید AMS (آزمون بازار کار در صورت لزوم)',
              text: 'برای مشاغل短缺، آزمون بازار کار حذف می‌شود. برای سایر مشاغل، AMS بررسی می‌کند که نیروی اتریشی/EEA موجود نباشد.',
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'صدور ویزا D و ورود به اتریش',
              text: 'پس از تأیید، ویزای D صادر می‌شود. ثبت Meldezettel ظرف ۳ روز پس از ورود الزامی است.',
            },
            {
              '@type': 'HowToStep',
              position: 6,
              name: 'دریافت RWR Card و الحاق خانواده',
              text: 'کارت ۲۴ ماهه صادر می‌شود. همسر و فرزندان RWR Plus با اجازه کار نامحدود دریافت می‌کنند.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/austria-rwr#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حداقل حقوق برای کارت RWR اتریش در ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای مسیر «سایر نیروهای کلیدی» (Sonstige Schlüsselkräfte) حداقل حقوق ناخالص ماهانه ۳,۴۶۵ یورو به‌علاوه پرداخت‌های ویژه (Sonderzahlungen) است. برای مشاغل短缺 (Mangelberufe) حقوق طبق قرارداد جمعی (Kollektivvertrag) تعیین می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'تفاوت مسیر ۵۵ امتیاز با ۷۰ امتیاز چیست؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'مسیر ۵۵/۹۰ برای مشاغل短缺 و سایر نیروهای کلیدی است و نیاز به جاب‌آفر دارد. مسیر ۷۰/۱۰۰ برای «متخصصان بسیار عالی‌رتبه» است و امکان ورود ۶ ماهه بدون جاب‌آفر برای جستجوی کار را می‌دهد (Jobseeker Visa).',
              },
            },
            {
              '@type': 'Question',
              name: 'پس از ۲ سال چه اتفاقی می‌افتد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'RWR Card اولیه ۲۴ ماه اعتبار دارد. پس از آن می‌توانید RWR Plus (۳ سال) دریافت کنید که اجازه تغییر کارفرما را می‌دهد. پس از مجموع ۵ سال اقامت قانونی، می‌توانید برای Daueraufenthalt-EU (اقامت دائم اتحادیه اروپا) درخواست دهید.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا همسر اجازه کار دارد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. همسر و فرزندان زیر ۱۸ سال همزمان RWR Plus دریافت می‌کنند که اجازه کار نامحدود در تمام اتریش را بدون نیاز به تأیید AMS می‌دهد.',
              },
            },
            {
              '@type': 'Question',
              name: 'MA35 چقدر طول می‌کشد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'طبق گزارش رسمی MA35، میانگین زمان پردازش در سال ۲۰۲۴ حدود ۳۲۴ روز بوده است. اما با پیگیری مستقیم وکیل مقیم (مانند دفتر وین دیاکو)، این زمان به طور قابل توجهی کاهش می‌یابد. ویزای D معمولاً ۴-۵ هفته پس از تأیید AMS صادر می‌شود.',
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
      q: 'کارت قرمز-سفید-قرمز (RWR) اتریش دقیقاً چیست؟',
      a: 'RWR Card اصلی‌ترین مجوز اقامت و کار برای متقاضیان غیر اتحادیه اروپا در اتریش است که تحت NAG §41 صادر می‌شود. این کارت ۲۴ ماهه است و پس از آن به RWR Plus (۳ ساله) تبدیل می‌شود. مسیرهای اصلی: مشاغل短缺 (۵۵/۹۰)، متخصصان بسیار عالی‌رتبه (۷۰/۱۰۰)، سایر نیروهای کلیدی (۵۵/۹۰ + حقوق ۳,۴۶۵€) و فارغ‌التحصیلان دانشگاه‌های اتریش (بدون نیاز به امتیاز).',
    },
    {
      q: 'حداقل امتیاز قبولی در هر مسیر چقدر است؟',
      a: 'مشاغل短缺 (Mangelberufe): ۵۵ از ۹۰. متخصصان بسیار عالی‌رتبه (Besonders Hochqualifizierte): ۷۰ از ۱۰۰ (امکان ورود ۶ ماهه بدون جاب‌آفر). سایر نیروهای کلیدی (Sonstige Schlüsselkräfte): ۵۵ از ۹۰ + حقوق حداقل ۳,۴۶۵€. فارغ‌التحصیلان دانشگاه‌های اتریش: بدون نیاز به سیستم امتیاز، فقط جاب‌آفر متناسب.',
    },
    {
      q: 'آیا شغل من باید در لیست مشاغل短缺 باشد؟',
      a: 'اگر مسیر «مشاغل短缺» را انتخاب می‌کنید، بله. لیست Mangelberufe ۲۰۲۶ شامل مشاغل IT (برنامه‌نویس، مهندس نرم‌افزار، Data Scientist)، مهندسی مکانیک، برق، مکاترونیک، تکنسین تأسیسات، پرستار، و حسابدار حقوق و دستمزد است. اگر شغل شما در لیست نیست، می‌توانید از مسیر «سایر نیروهای کلیدی» با حقوق ۳,۴۶۵€ و آزمون بازار کار استفاده کنید.',
    },
    {
      q: 'آیا همسر و فرزندان اجازه کار دارند؟',
      a: 'بله. همسر و فرزندان زیر ۱۸ سال همزمان با متقاضی اصلی، RWR Plus دریافت می‌کنند. این کارت اجازه کار نامحدود در تمام اتریش را بدون نیاز به تأیید AMS می‌دهد. فرزندان از تحصیل رایگان در مدارس دولتی بهره‌مند می‌شوند.',
    },
    {
      q: 'مسیر رسیدن به اقامت دائم و تابعیت چگونه است؟',
      a: '۲ سال RWR Card → RWR Plus (۳ سال) → مجموع ۵ سال اقامت قانونی → Daueraufenthalt-EU (اقامت دائم اتحادیه اروپا). برای تابعیت اتریش معمولاً ۶-۱۰ سال اقامت مستمر و سایر شرایط (زبان B1، درآمد کافی) لازم است. برای Daueraufenthalt-EU مدرک زبان B1 (Modul 2) الزامی است.',
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
            بازگشت به صفحه اصلی هلدینگ دیاکو
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span>
            <span>/</span>
            <span>نقشه تعاملی پرونده‌های اروپا</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">کارت قرمز-سفید-قرمز اتریش (RWR)</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION 1: HERO
          Image: Vienna / professional
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <Sparkles className="h-4 w-4 text-amber-400" />
              NAG §41 — قانون اقامت کاری اتریش ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              کارت قرمز-سفید-قرمز اتریش{' '}
              <span className="text-[#f5a623]">(Rot-Weiß-Rot – Karte)</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-8 mb-8 text-justify">
              برنامه رسمی اقامت کاری اتریش برای مهندسان، متخصصان IT، کادر درمان، تکنسین‌ها و
              فارغ‌التحصیلان برتر. با <strong className="text-amber-300">حداقل ۵۵ امتیاز از ۹۰</strong> در
              مسیر مشاغل短缺 و <strong className="text-amber-300">حقوق پایه ۳,۴۶۵ یورو</strong> در مسیر
              سایر نیروهای کلیدی، مسیر مستقیم ورود به قلب اقتصاد مرکزی اروپا را با امنیت حقوقی کامل طی کنید.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                <span className="text-xs text-slate-400 block">حداقل امتیاز (مشاغل短缺):</span>
                <span className="text-base sm:text-lg font-black text-amber-300 mt-1 block">۵۵ / ۹۰</span>
                <span className="text-[10px] text-slate-400">بدون آزمون بازار کار</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                <span className="text-xs text-slate-400 block">حداقل حقوق (سایر مشاغل):</span>
                <span className="text-base sm:text-lg font-black text-emerald-400 mt-1 block">€۳,۴۶۵ / ماه</span>
                <span className="text-[10px] text-slate-400">به‌علاوه Sonderzahlungen</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                <span className="text-xs text-slate-400 block">مسیر تا اقامت دائم:</span>
                <span className="text-base sm:text-lg font-black text-white mt-1 block">۵ سال</span>
                <span className="text-[10px] text-slate-400">۲ سال RWR + ۳ سال RWR Plus</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>ارزیابی امتیازات RWR</span>
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 px-5 py-3.5 text-xs font-bold text-white transition cursor-pointer flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                <span>دفتر وین: ۴۳۶۸۸۹۷۶۳۲۵۶+</span>
                {copiedPhone && <span className="text-emerald-400 text-[10px] font-bold">کپی شد!</span>}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#0b2f3d] to-[#07242e] shadow-2xl p-6">
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-6">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=80"
                  alt="وین اتریش - کارت قرمز-سفید-قرمز و فرصت‌های شغلی"
                  width={1000}
                  height={750}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 right-3 left-3 bg-[#082833]/90 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">دفتر رسمی وین هلدینگ دیاکو</span>
                    <span className="text-[11px] text-amber-300">Ausstellungsstraße 50, 1020 Wien</span>
                  </div>
                  <span className="text-2xl">🇦🇹</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs">
                  <span className="text-slate-300">حداقل حقوق مسیر «سایر نیروهای کلیدی»:</span>
                  <span className="font-black text-amber-300 text-sm">€۳,۴۶۵ / ماه</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs">
                  <span className="text-slate-300">مشاغل短缺 در لیست ۲۰۲۶:</span>
                  <span className="font-black text-emerald-400 text-sm">IT، مهندسی، برق، مکاترونیک</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs">
                  <span className="text-slate-300">میانگین پردازش MA35 (۲۰۲۴):</span>
                  <span className="font-black text-white text-sm">~۳۲۴ روز</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-300">مدت اعتبار RWR Card اولیه:</span>
                  <span className="font-bold text-amber-200">۲۴ ماه</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: CRITICAL — TWO PATHS, TWO THRESHOLDS
          Image: Comparison / crossroads
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-amber-500/5 border border-amber-400/20 rounded-3xl p-6 md:p-10">
          <div className="flex items-start gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white mb-2">
                دو مسیر، دو آستانه: ۵۵ امتیاز یا ۷۰ امتیاز؟
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                بسیاری از منابع این دو مسیر را با هم اشتباه می‌گیرند. انتخاب اشتباه می‌تواند به رد پرونده منجر شود.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
              <h3 className="text-sm font-black text-emerald-300 mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                مسیر ۵۵ امتیاز (مشاغل短缺 / سایر)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">۵۵ از ۹۰ امتیاز</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>نیاز به <strong className="text-white">جاب‌آفر</strong> از کارفرمای اتریشی</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>مشاغل短缺: بدون آزمون بازار کار</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>سایر مشاغل: حقوق €۳,۴۶۵ + آزمون AMS</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/20">
              <h3 className="text-sm font-black text-amber-300 mb-3 flex items-center gap-2">
                <Award className="h-4 w-4" />
                مسیر ۷۰ امتیاز (نخبگان)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">۷۰ از ۱۰۰ امتیاز</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>امکان ورود <strong className="text-white">۶ ماهه بدون جاب‌آفر</strong> (Jobseeker)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>پس از یافتن کار: RWR بدون آزمون بازار کار</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>مناسب برای دکتری، MINT، مدیران ارشد، پژوهشگران</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 text-center">
            منبع: migration.gv.at — ماشین‌حساب رسمی امتیاز  و WKO [citation:10]
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: POINTS TABLE (TAB)
          Image: Documents / scoring
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
          {[
            { id: 'points', label: '📊 جدول امتیازات', icon: FileSpreadsheet },
            { id: 'categories', label: '👥 ۵ دسته متقاضیان', icon: Users },
            { id: 'process', label: '⚡ مراحل و دفتر وین', icon: Compass },
            { id: 'comparison', label: '⚖️ مقایسه با بلوکارت', icon: Scale },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs md:text-sm font-black transition cursor-pointer ${
                  isActive
                    ? 'bg-[#f5a623] text-[#082833] shadow-glow'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'points' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-xl md:text-2xl font-black text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400">●</span>
              جدول رسمی امتیازات (مشاغل短缺 / سایر نیروهای کلیدی — ۵۵ از ۹۰)
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-7 mb-6 text-justify">
              سیستم امتیازدهی برای مسیر ۵۵ امتیازی از ۹۰ امتیاز ساخته شده است. حداقل ۵۵ امتیاز برای
              مشاغل短缺 و سایر نیروهای کلیدی الزامی است. برای مسیر نخبگان (۷۰/۱۰۰)، جدول متفاوتی وجود دارد.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-white">۱. تحصیلات</span>
                  <span className="rounded-lg bg-amber-400/20 text-amber-300 px-2.5 py-0.5 text-xs font-black">حداکثر ۳۰</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>تحصیلات عالی ۳ ساله: ۳۰ امتیاز</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>دیپلم دانشگاه: ۲۵ امتیاز</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>آموزش حرفه‌ای/مهارت ویژه: ۲۰ امتیاز</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-white">۲. سابقه کار</span>
                  <span className="rounded-lg bg-amber-400/20 text-amber-300 px-2.5 py-0.5 text-xs font-black">حداکثر ۲۰</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>هر ۶ ماه: ۱ امتیاز</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>هر ۶ ماه در اتریش: ۲ امتیاز</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>حداکثر ۱۰ سال قابل محاسبه</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-white">۳. زبان</span>
                  <span className="rounded-lg bg-amber-400/20 text-amber-300 px-2.5 py-0.5 text-xs font-black">حداکثر ۱۵</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>آلمانی A1: ۵ | A2: ۱۰ | B1: ۱۵</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>انگلیسی A2: ۵ | B1: ۱۰</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>فرانسوی/اسپانیایی/BSK B1: ۵</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-white">۴. سن</span>
                  <span className="rounded-lg bg-amber-400/20 text-amber-300 px-2.5 py-0.5 text-xs font-black">حداکثر ۱۵</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>زیر ۳۰ سال: ۱۵ امتیاز</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>زیر ۴۰ سال: ۱۰ امتیاز</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>بالای ۴۰ سال: ۰ امتیاز</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-xs md:text-sm text-amber-200">
              <span className="font-bold text-amber-300">💡 نکته دیاکو:</span> اگر مدرک تحصیلی شما
              کمتر از ۳ سال است یا امتیاز کافی ندارید، مسیر «سایر نیروهای کلیدی» با حقوق €۳,۴۶۵
              می‌تواند گزینه باشد. دفتر وین دیاکو امتیاز شما را به‌صورت دقیق محاسبه می‌کند.
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-xl md:text-2xl font-black text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400">●</span>
              دسته‌بندی‌های پنج‌گانه متقاضیان RWR
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-amber-400" />
                  <h3 className="font-bold text-base text-white">۱. بسیار عالی‌رتبه</h3>
                </div>
                <p className="text-xs text-slate-300 leading-6 text-justify">
                  محققان، دانشمندان، دکتری، MINT. حداقل ۷۰ از ۱۰۰. امکان Jobseeker Visa ۶ ماهه
                  بدون جاب‌آفر.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-5 w-5 text-emerald-400" />
                  <h3 className="font-bold text-base text-white">۲. مشاغل短缺 (Mangelberufe)</h3>
                </div>
                <p className="text-xs text-slate-300 leading-6 text-justify">
                  محبوب‌ترین مسیر. IT، مهندسی، برق، مکاترونیک، تکنسین، پرستار. حداقل ۵۵ از ۹۰.
                  بدون آزمون بازار کار.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-sky-400" />
                  <h3 className="font-bold text-base text-white">۳. سایر نیروهای کلیدی</h3>
                </div>
                <p className="text-xs text-slate-300 leading-6 text-justify">
                  مشاغل غیر短缺 با مهارت ویژه. حداقل ۵۵ از ۹۰ + حقوق €۳,۴۶۵. نیاز به آزمون
                  بازار کار AMS.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-5 w-5 text-purple-400" />
                  <h3 className="font-bold text-base text-white">۴. فارغ‌التحصیلان اتریش</h3>
                </div>
                <p className="text-xs text-slate-300 leading-6 text-justify">
                  فارغ‌التحصیلان دانشگاه‌های اتریش. بدون نیاز به امتیاز. فقط جاب‌آفر متناسب.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-amber-300" />
                  <h3 className="font-bold text-base text-white">۵. استارت‌آپ (Start-up Gründer)</h3>
                </div>
                <p className="text-xs text-slate-300 leading-6 text-justify">
                  بنیان‌گذاران استارت‌آپ با بیزینس‌پلن مصوب و حداقل €۳۰,۰۰۰ سرمایه. کارت ۲ ساله
                  با امکان تمدید.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-xl md:text-2xl font-black text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400">●</span>
              مراحل اقدام با دفتر وین دیاکو
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 relative">
                  <span className="absolute top-4 left-4 h-8 w-8 rounded-full bg-amber-400 text-[#082833] font-black text-sm grid place-items-center">۱</span>
                  <h3 className="font-bold text-sm text-white mb-2">ارزیابی امتیاز و مسیر</h3>
                  <p className="text-xs text-slate-300 leading-6 text-justify">
                    محاسبه دقیق امتیاز بر اساس جدول AMS. بررسی تطابق شغل با Mangelberufe ۲۰۲۶.
                    تعیین مسیر: ۵۵ یا ۷۰.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 relative">
                  <span className="absolute top-4 left-4 h-8 w-8 rounded-full bg-amber-400 text-[#082833] font-black text-sm grid place-items-center">۲</span>
                  <h3 className="font-bold text-sm text-white mb-2">تأمین جاب‌آفر و حقوق</h3>
                  <p className="text-xs text-slate-300 leading-6 text-justify">
                    برای مسیر ۵۵: کارفرما باید حقوق €۳,۴۶۵ (سایر) یا طبق Kollektivvertrag
                    (مشاغل短缺) پرداخت کند. برای ۷۰: Jobseeker بدون جاب‌آفر.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 relative">
                  <span className="absolute top-4 left-4 h-8 w-8 rounded-full bg-amber-400 text-[#082833] font-black text-sm grid place-items-center">۳</span>
                  <h3 className="font-bold text-sm text-white mb-2">ثبت در MA35 / سفارت</h3>
                  <p className="text-xs text-slate-300 leading-6 text-justify">
                    کارفرما می‌تواند در MA35 وین ثبت کند (سریع‌تر). یا متقاضی در سفارت.
                    دفتر وین دیاکو پیگیری مستقیم انجام می‌دهد.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 relative">
                  <span className="absolute top-4 left-4 h-8 w-8 rounded-full bg-amber-400 text-[#082833] font-black text-sm grid place-items-center">۴</span>
                  <h3 className="font-bold text-sm text-white mb-2">تأیید AMS و صدور ویزا</h3>
                  <p className="text-xs text-slate-300 leading-6 text-justify">
                    مشاغل短缺: بدون آزمون. سایر: آزمون بازار کار. پس از تأیید، ویزای D صادر
                    می‌شود (۴-۵ هفته).
                  </p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                  alt="فرآیند درخواست RWR Card اتریش - مدارک و فرم‌های MA35"
                  width={800}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                  مدارک کلیدی: پاسپورت، عکس، بیمه، مدارک تحصیلی/کاری، Arbeitgebererklärung
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-[#0b2f3d] to-[#07242e] border border-white/15 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-base font-black text-white mb-1">دفتر وکالت دیاکو در وین</h4>
                <p className="text-xs text-slate-300">Ausstellungsstraße 50, 1020 Wien | +۴۳۶۸۸۹۷۶۳۲۵۶</p>
              </div>
              <button
                type="button"
                onClick={onOpenAssessment}
                className="shrink-0 rounded-2xl bg-[#f5a623] px-6 py-3 text-xs font-black text-[#082833] shadow-glow hover:scale-105 transition cursor-pointer"
              >
                رزرو مشاوره با وکیل وین
              </button>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">
            <h2 className="text-xl md:text-2xl font-black text-white mb-4 flex items-center gap-2">
              <span className="text-amber-400">●</span>
              مقایسه RWR با EU Blue Card
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-white/15 text-slate-300">
                    <th className="py-3 px-4">ویژگی</th>
                    <th className="py-3 px-4 text-amber-300">RWR Card</th>
                    <th className="py-3 px-4 text-sky-400">EU Blue Card</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-200">
                  <tr>
                    <td className="py-3 px-4 font-bold">پوشش مشاغل</td>
                    <td className="py-3 px-4 text-emerald-300">گسترده (فنی، مهندسی، درمانی، تکنسین)</td>
                    <td className="py-3 px-4">مشاغل آکادمیک و مدیران ارشد</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">سیستم گزینش</td>
                    <td className="py-3 px-4 text-emerald-300">امتیازدهی (۵۵/۹۰ یا ۷۰/۱۰۰)</td>
                    <td className="py-3 px-4">بدون امتیاز، بر پایه مدرک و حقوق</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">حداقل حقوق</td>
                    <td className="py-3 px-4 text-emerald-300">€۳,۴۶۵ (سایر) / Kollektivvertrag (短缺)</td>
                    <td className="py-3 px-4">بالاتر (~€۴۵-۵۰ هزار/سال)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">اجازه کار همسر</td>
                    <td className="py-3 px-4 text-emerald-300">فوری (RWR Plus)</td>
                    <td className="py-3 px-4">اجازه کار تمام وقت</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">مسیر اقامت دائم</td>
                    <td className="py-3 px-4 text-emerald-300">۲ سال RWR → RWR Plus → ۵ سال</td>
                    <td className="py-3 px-4">۲۱-۳۳ ماه با B1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================
          SECTION 4: SHORTAGE OCCUPATIONS 2026
          Image: IT / engineering / healthcare
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 mb-3">
                <TrendingUp className="h-4 w-4" />
                لیست ۲۰۲۶
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                مشاغل دارای کمبود نیرو (Mangelberufe)
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                لیست Mangelberufe هر ساله توسط وزارت کار اتریش به‌روزرسانی می‌شود. اگر شغل شما در
                این لیست باشد، مسیر ۵۵ امتیازی بدون آزمون بازار کار باز می‌شود. مهم‌ترین گروه‌های
                ۲۰۲۶:
              </p>

              <div className="space-y-2">
                {[
                  { category: 'IT و نرم‌افزار', jobs: 'برنامه‌نویس، مهندس نرم‌افزار، Data Scientist، Network Engineer، SAP Consultant' },
                  { category: 'مهندسی مکانیک', jobs: 'مهندس مکانیک، تکنسین CAD، مکاترونیک، تکنیسین تأسیسات' },
                  { category: 'برق و الکترونیک', jobs: 'الکترومکانیک، تکنسین برق، مهندس اتوماسیون' },
                  { category: 'ساختمان', jobs: 'مهندس عمران، تکنسین ساختمان، BIM Technician' },
                  { category: 'مالی و اداری', jobs: 'حسابدار حقوق و دستمزد (Lohnverrechner)' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs font-bold text-amber-300">{item.category}:</span>
                    <span className="text-[11px] text-slate-300 mr-2">{item.jobs}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                منبع: migration.gv.at — لیست کامل Bundesweite Mangelberufe ۲۰۲۶ [citation:3][citation:6]
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
                alt="مشاغل دارای کمبود نیرو اتریش ۲۰۲۶ - IT و مهندسی"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                مشاغل IT و مهندسی بزرگ‌ترین گروه‌های短缺 در اتریش هستند.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: FAQ
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-bold text-amber-300">
              پاسخ به پرتکرارترین پرسش‌ها
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              سوالات متداول کارت RWR اتریش ۲۰۲۶
            </h2>
            <p className="mt-2 text-xs text-slate-300">
              بر اساس آخرین تغییرات MA35 و وزارت کار اتریش.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-amber-300 transition cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-amber-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-7 border-t border-white/5 pt-3 text-justify">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: FINAL CTA
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl bg-gradient-to-l from-[#082833] via-[#0b3342] to-[#07242e] border border-amber-400/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            آماده اخذ کارت RWR اتریش در ۲۰۲۶ هستید؟
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-7 mb-8">
            فرم ارزیابی هوشمند دیاکو را تکمیل کنید. دفتر وین دیاکو امتیاز شما را محاسبه و
            مسیر بهینه را طراحی می‌کند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-8 py-4 text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              شروع ارزیابی رایگان RWR
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-6 py-4 text-xs font-bold text-white transition cursor-pointer"
            >
              مشاهده سایر خدمات
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AustriaRwrCardPage;