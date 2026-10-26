import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Palette,
  Building2,
  Euro,
  Users,
  FileText,
  Banknote,
  Languages,
  Briefcase,
  CalendarDays,
  BookOpen,
  AlertTriangle,
  ShieldCheck,
  Landmark,
  FileCheck2,
  Sparkles,
  TrendingDown,
  Quote,
  MapPin,
  Clock,
  HeartPulse,
  Receipt,
  Home,
  Coffee,
  TrainFront,
  Flame,
  ShieldAlert,
  BadgeCheck,
  Wallet,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const ArtistGermanyPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای هنرمندان برلین ۲۰۲۶ | حقیقت پنهان Freiberufler + اقامت ۵ ساله',
    description:
      'برلین دیگر بهشت آسان هنرمندان نیست. راهنمای واقعی ویزای Freiberufler ۲۰۲۶: قانون §21 Abs.5، درآمد حداقلی €۱,۱۰۰–۱,۵۰۰، پسانداز €۹,۰۰۰–۱۵,۰۰۰، KSK ۴.۹٪، تمدید سختگیرانه و اقامت دائم ۵ ساله (نه ۳ سال) با دیاکو.',
    canonical: '/guides/artist-germany',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای هنرمندان برلین ۲۰۲۶',
      'Freiberufler Visa Berlin',
      'AufenthG §21 Abs 5',
      'حداقل درآمد ویزای هنری برلین',
      'پسانداز ۹۰۰۰ یورو ویزای فریلنسر',
      'KSK ۲۰۲۶ ۴.۹ درصد',
      'اقامت دائم آلمان هنرمندان ۵ سال',
      'سختگیری ویزای هنری برلین ۲۰۲۶',
      'LEA Berlin artist visa',
      'بیمه هنرمندان آلمان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/artist-germany#article',
          headline:
            'حقیقت ویزای هنرمندان برلین ۲۰۲۶: چرا «۳ سال تا اقامت دائم» یک افسانه است و واقعیت چیست',
          description:
            'بررسی عمیق ویزای Freiberufler برلین طبق §21 Abs.5 AufenthG: قانون، آستانه درآمد (€۱,۱۰۰–۱,۵۰۰/ماه)، پسانداز (€۹,۰۰۰–۱۵,۰۰۰)، KSK (۴.۹٪، سقف ۵۰٪)، تمدید سختگیرانه ۲۰۲۶، و اقامت دائم پس از ۵ سال (نه ۳ سال).',
          image: [
            'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
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
            { '@type': 'Thing', name: 'Freiberufler Visa Berlin' },
            { '@type': 'Thing', name: 'AufenthG §21 Abs.5' },
            { '@type': 'Thing', name: 'Künstlersozialkasse' },
          ],
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/artist-germany#howto',
          name: 'مراحل واقعی دریافت ویزای هنرمندان برلین',
          description: 'فرآیند گام‌به‌گام با در نظر گرفتن سختگیری‌های ۲۰۲۶',
          totalTime: 'P6M',
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'EUR',
            value: '100',
          },
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'آماده‌سازی مدارک هنری و مالی',
              text: 'پورتفولیو، رزومه، حداقل ۲ نامه قصد همکاری (Letter of Intent)، برنامه مالی (Finanzierungsplan) و پیش‌بینی درآمد.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'اثبات خودکفایی مالی',
              text: 'درآمد ماهانه €۱,۱۰۰–۱,۵۰۰ + پسانداز €۹,۰۰۰–۱۵,۰۰۰. قاعده برلین: درآمد > اجاره + بیمه + €۵۶۳.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'دریافت وقت LEA (۸–۱۶ هفته انتظار)',
              text: 'رزرو آنلاین از طریق پورتال LEA. بررسی روزهای چهارشنبه صبح یا ساعت ۷–۸ صبح برای لغوهای آزادشده.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'حضور در LEA و دریافت اقامت ۳ ساله',
              text: 'مدارک کامل، بیمه درمانی، قرارداد اجاره و Anmeldung. اقامت اولیه معمولاً ۳ سال است.',
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'تمدید و مسیر اقامت دائم (۵ سال)',
              text: 'پس از ۳ سال، تمدید با بررسی سختگیرانه‌تر. اقامت دائم (Niederlassungserlaubnis) زودتر از ۵ سال ممکن نیست.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/artist-germany#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا پس از ۳ سال می‌توان اقامت دائم آلمان گرفت؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. برای آزادکاران (Freiberufler) از جمله هنرمندان، اقامت دائم (Niederlassungserlaubnis) زودتر از ۵ سال صادر نمی‌شود. اقامت اولیه معمولاً ۳ ساله است و پس از آن تمدید می‌شود، اما «دائم» فقط پس از ۵ سال.',
              },
            },
            {
              '@type': 'Question',
              name: 'حداقل درآمد و پسانداز برای ویزای هنرمندان برلین چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'عدد رسمی ثابتی وجود ندارد، اما قاعده غیررسمی برلین: درآمد ناخالص ماهانه باید از اجاره + بیمه درمانی + €۵۶۳ (حداقل معیشت ۲۰۲۶) بیشتر باشد. در عمل هدف €۱,۱۰۰–۱,۵۰۰ در ماه و پسانداز €۹,۰۰۰–۱۵,۰۰۰ توصیه می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا برلین هنوز برای هنرمندان «آسان» است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'نه. از ۲۰۲۶، LEA برلین رویه سختگیرانه‌تری اتخاذ کرده است. معافیت از «ارزیابی امکان‌سنجی اقتصادی» که قبلاً برای هنرمندان اعمال می‌شد، کمتر و کمتر اعمال می‌شود. اکنون برنامه مالی دقیق، پیش‌بینی درآمد و اثبات خودکفایی پایدار بدون کمک دولتی الزامی است.',
              },
            },
            {
              '@type': 'Question',
              name: 'KSK چیست و چه کمکی می‌کند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'KSK (Künstlersozialkasse) صندوق بیمه اجتماعی هنرمندان آلمان است. این صندوق حدود ۵۰٪ حق بیمه درمانی و بازنشستگی شما را می‌پردازد (مانند سهم کارفرما). شرط عضویت: فعالیت هنری مستقل و مستمر با حداقل درآمد €۳,۹۰۰/سال (€۳۲۵/ماه). برای ۳ سال اول، این حداقل برای تازه‌کارها اعمال نمی‌شود. نرخ KSK در ۲۰۲۶: ۴.۹٪.',
              },
            },
            {
              '@type': 'Question',
              name: 'چقدر طول می‌کشد تا وقت سفارت/LEA بگیرم؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'در ۲۰۲۶، انتظار برای وقت LEA برلین بین ۸ تا ۱۶ هفته گزارش شده است. توصیه می‌شود درخواست را ۸ هفته قبل از انقضای اقامت فعلی ارسال کنید و روزهای چهارشنبه صبح یا ساعت ۷–۸ صبح پورتال را برای لغوهای آزادشده بررسی کنید.',
              },
            },
          ],
        },
      ],
    },
  });

  const FAQS = [
    {
      q: 'آیا پس از ۳ سال می‌توان اقامت دائم آلمان گرفت؟',
      a: 'خیر. این یکی از رایج‌ترین اشتباهات در منابع فارسی است. برای آزادکاران (Freiberufler) — از جمله هنرمندان — اقامت دائم (Niederlassungserlaubnis) زودتر از ۵ سال صادر نمی‌شود. اقامت اولیه معمولاً ۳ ساله است و پس از آن تمدید می‌شود، اما «دائم» فقط پس از ۵ سال اقامت قانونی و خودکفایی مالی امکان‌پذیر است. هزینه درخواست اقامت دائم €۱۲۴ است.',
    },
    {
      q: 'حداقل درآمد و پس‌انداز برای ویزای هنرمندان برلین چقدر است؟',
      a: 'عدد رسمی ثابتی در قانون وجود ندارد. اما قاعده غیررسمی LEA برلین: درآمد ناخالص ماهانه باید از اجاره + بیمه درمانی + €۵۶۳ (حداقل معیشت ۲۰۲۶) بیشتر باشد. در عمل، هدف €۱,۱۰۰–۱,۵۰۰ در ماه و پس‌انداز €۹,۰۰۰–۱۵,۰۰۰ توصیه می‌شود. برای متقاضیان بالای ۴۵ سال، اثبات بیمه بازنشستگی یا دارایی نیز الزامی است.',
    },
    {
      q: 'آیا برلین هنوز برای هنرمندان «آسان» است؟',
      a: 'نه. از ۲۰۲۶، LEA برلین رویه سختگیرانه‌تری اتخاذ کرده است. معافیت از «ارزیابی امکان‌سنجی اقتصادی» که قبلاً برای هنرمندان اعمال می‌شد، کمتر و کمتر اعمال می‌شود. اکنون برنامه مالی دقیق (Finanzierungsplan)، پیش‌بینی درآمد (Ertragsvorschau) و اثبات خودکفایی پایدار بدون کمک دولتی الزامی است. «چند نامه دوستانه» دیگر کافی نیست.',
    },
    {
      q: 'KSK چیست و چه کمکی می‌کند؟',
      a: 'KSK (Künstlersozialkasse) صندوق بیمه اجتماعی هنرمندان آلمان است. این صندوق حدود ۵۰٪ حق بیمه درمانی و بازنشستگی شما را می‌پردازد (مانند سهم کارفرما در یک شغل معمولی). شرط عضویت: فعالیت هنری مستقل و مستمر با حداقل درآمد €۳,۹۰۰/سال (€۳۲۵/ماه). برای ۳ سال اول، این حداقل برای تازه‌کارها اعمال نمی‌شود. نرخ KSK در ۲۰۲۶: ۴.۹٪.',
    },
    {
      q: 'چقدر طول می‌کشد تا وقت LEA بگیرم؟',
      a: 'در ۲۰۲۶، انتظار برای وقت LEA برلین بین ۸ تا ۱۶ هفته گزارش شده است. توصیه می‌شود درخواست را ۸ هفته قبل از انقضای اقامت فعلی ارسال کنید. پورتال LEA معمولاً «وقت آزاد» نشان نمی‌دهد؛ روزهای چهارشنبه صبح یا ساعت ۷–۸ صبح را برای لغوهای آزادشده بررسی کنید.',
    },
    {
      q: 'آیا برای ویزای هنری برلین باید شرکت ثبت کنم؟',
      a: 'خیر. هنرمندان تحت عنوان Freiberufler (حرفه آزاد) فعالیت می‌کنند و از ثبت شرکت تجاری و پرداخت Gewerbesteuer معاف هستند. اما باید کد مالیاتی (Steuernummer) از Finanzamt بگیرید و اظهارنامه مالیاتی سالانه ارائه دهید.',
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
            <span>هنرمندان و نخبگان</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">فریلنسری هنرمندان برلین</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION 1: HERO — MYTH-BUSTING HEADLINE
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold text-purple-300 mb-4">
              <Palette className="h-4 w-4 text-purple-400" />
              AufenthG §21 (5) — حقیقت پنهان ویزای هنری برلین ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              ویزای هنرمندان برلین{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-purple-400">
                دیگر «آسان» نیست
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              سال‌هاست که برلین به‌عنوان «بهشت هنرمندان» شناخته می‌شود. اما در ۲۰۲۶،
              اداره مهاجرت برلین (LEA) رویه خود را<span className="text-amber-300"> به‌طور سیستماتیک سخت‌تر کرده است</span>.
              «چند نامه دوستانه» دیگر کافی نیست. اکنون باید یک{' '}
              <strong className="text-white">برنامه مالی واقعی</strong>،{' '}
              <strong className="text-white">پیش‌بینی درآمد دقیق</strong> و{' '}
              <strong className="text-white">اثبات خودکفایی پایدار</strong> ارائه دهید.
              و برخلاف افسانه رایج، اقامت دائم{' '}
              <span className="text-rose-300 font-bold">۵ سال</span> طول می‌کشد، نه ۳ سال.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-amber-300">€۱,۱۰۰–۱,۵۰۰</div>
                <div className="text-[10px] text-slate-300 mt-1">درآمد ماهانه هدف</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-emerald-400">€۹,۰۰۰–۱۵,۰۰۰</div>
                <div className="text-[10px] text-slate-300 mt-1">پس‌انداز توصیه‌شده</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-rose-300">۵ سال</div>
                <div className="text-[10px] text-slate-300 mt-1">تا اقامت دائم (نه ۳ سال)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-sky-300">۴.۹٪</div>
                <div className="text-[10px] text-slate-300 mt-1">نرخ KSK در ۲۰۲۶</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی واقع‌بینانه پرونده هنری شما
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره با دپارتمان آلمان دیاکو
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1000&q=80"
                alt="ویزای هنرمندان برلین ۲۰۲۶ - حقیقت سخت‌گیری LEA و مسیر واقعی"
                width={1000}
                height={750}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                  <ShieldAlert className="h-4 w-4" />
                  LEA Berlin — رویه سخت‌گیرانه ۲۰۲۶
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  ارزیابی امکان‌سنجی اقتصادی، برنامه مالی دقیق و اثبات خودکفایی پایدار
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: THE MYTH VS REALITY — VIRAL HOOK
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-amber-500/5 border border-amber-400/20 rounded-3xl p-6 md:p-10">
          <div className="flex items-start gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white mb-2">
                دو افسانه‌ای که می‌تواند پرونده شما را نابود کند
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                اگر با این دو باور غلط وارد فرآیند شوید، احتمال رد یا تمدید نشدن پرونده
                بسیار بالاست.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-400/20">
              <h3 className="text-sm font-black text-rose-300 mb-3 flex items-center gap-2">
                <Flame className="h-4 w-4" />
                افسانه ۱: «برلین آسان است»
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                تا همین اواخر، رویه غیررسمی برلین این بود که چند قرارداد همکاری محلی یا
                نامه قصد همکاری برای دریافت اقامت کافی است. این رویه{' '}
                <strong className="text-white">در حال حذف شدن است</strong>.
              </p>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-400/20">
                <p className="text-[11px] text-rose-200 leading-relaxed">
                  <strong>واقعیت ۲۰۲۶:</strong> LEA اکنون برنامه مالی جامع، پیش‌بینی درآمد
                  و اثبات خودکفایی پایدار بدون کمک دولتی می‌خواهد.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-400/20">
              <h3 className="text-sm font-black text-rose-300 mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                افسانه ۲: «۳ سال تا اقامت دائم»
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                بسیاری از منابع فارسی، «۳ سال» را به‌عنوان مسیر اقامت دائم هنرمندان
                آلمان معرفی می‌کنند. این برای آزادکاران{' '}
                <strong className="text-white">نادرست است</strong>.
              </p>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-400/20">
                <p className="text-[11px] text-rose-200 leading-relaxed">
                  <strong>واقعیت ۲۰۲۶:</strong> اقامت دائم برای Freiberufler زودتر از{' '}
                  <strong className="text-white">۵ سال</strong> صادر نمی‌شود. اقامت اولیه
                  ۳ ساله است، اما «دائم» پس از ۵ سال.
                </p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 text-center">
            منابع: service.berlin.de (اقامت دائم آزادکاران — ۵ سال) | visaguard.berlin (سخت‌گیری ۲۰۲۶ LEA)
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: THE REAL NUMBERS — FINANCIAL REALITY
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-3">
                <Wallet className="h-4 w-4" />
                اعداد واقعی
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                چقدر پول لازم دارید؟ (بدون تعارف)
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 text-justify">
                قانون آلمان عدد ثابتی تعیین نکرده، اما LEA برلین یک قاعده غیررسمی دارد
                که در عمل اعمال می‌شود:
              </p>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20 mb-4">
                <p className="text-xs text-amber-200 leading-relaxed text-center font-bold">
                  درآمد ماهانه &gt; اجاره + بیمه درمانی + €۵۶۳
                </p>
                <p className="text-[10px] text-amber-200/70 text-center mt-1">
                  €۵۶۳ = حداقل معیشت ماهانه ۲۰۲۶
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white">هدف درآمد ماهانه</span>
                  <span className="text-xs font-black text-amber-300">€۱,۱۰۰ – €۱,۵۰۰</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white">پس‌انداز توصیه‌شده</span>
                  <span className="text-xs font-black text-emerald-300">€۹,۰۰۰ – €۱۵,۰۰۰</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white">اجاره ۱ خوابه (Neukölln)</span>
                  <span className="text-xs font-black text-slate-300">€۱,۱۰۰ – €۱,۴۰۰</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white">بیمه درمانی خصوصی</span>
                  <span className="text-xs font-black text-sky-300">€۲۰۰ – €۴۰۰</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white">هزینه زندگی ماهانه (کل)</span>
                  <span className="text-xs font-black text-white">€۱,۹۰۰ – €۲,۴۰۰</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-400/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-red-200 leading-relaxed">
                    <strong>نکته حیاتی:</strong> اگر درآمد شما فقط کف را پوشش می‌دهد،
                    تمدید ۳ سال بعد می‌تواند به مشکل بخورد. LEA در تمدید، عملکرد مالی
                    واقعی شما را بررسی می‌کند، نه وعده‌های اولیه را.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                  alt="هزینه واقعی ویزای هنرمندان برلین - درآمد €۱,۱۰۰ و پس‌انداز €۹,۰۰۰"
                  width={800}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                  قاعده برلین: درآمد &gt; اجاره + بیمه + €۵۶۳ | پس‌انداز €۹,۰۰۰–۱۵,۰۰۰
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Receipt className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">هزینه‌های پنهان که فراموش می‌کنید</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                    <span>هزینه وکیل/مشاور: €۵۰۰ – €۲,۰۰۰</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                    <span>ترجمه رسمی مدارک: €۲۰۰ – €۵۰۰</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                    <span>ودیعه مسکن (۳ ماه): €۳,۳۰۰ – €۴,۲۰۰</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                    <span>هزینه اقامت دائم (۵ سال بعد): €۱۲۴</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: VIRAL STORY — NEW YORK TO BERLIN
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-[#061a21] border border-purple-400/20 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80"
                alt="داستان واقعی هنرمند آمریکایی در برلین - از نیویورک تا Neukölln"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                سارا، ۳۱ ساله، گرافیک دیزاینر — از بروکلین تا Neukölln
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-purple-300 mb-3">
                <Quote className="h-4 w-4" />
                داستان واقعی
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                «در نیویورک در حالت بقا بودم. برلین زندگی‌ام را پس داد.»
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                سارا، ۳۱ ساله، گرافیک دیزاینر فریلنسر در بروکلین بود: اجاره{' '}
                <strong className="text-rose-300">$۳,۲۰۰</strong> برای یک خوابه، بیمه{' '}
                <strong className="text-rose-300">$۴۵۰</strong> در ماه، و ۶۰ ساعت کار در هفته.
                دوستش در برلین گفت اجاره دو خوابه نزدیک Mitte{' '}
                <strong className="text-emerald-300">€۹۰۰</strong> است.
              </p>

              <div className="space-y-3 mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    <strong className="text-white">شوک اول:</strong> «سه ماه طول کشید تا
                    شماره مالیاتی (Steueridentifikationsnummer) بگیرم. اداره مهاجرت
                    شش هفته وقت آزاد نداشت. وقتی رفتم، گفتند یک نامه دیگر از یک
                    کارفرمای آلمانی می‌خواهند که هیچ‌کس از قبل نگفته بود.»
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    <strong className="text-white">شوک دوم:</strong> «صاحب‌خانه از
                    امضای Wohnungsgeberbestätigung امتناع کرد چون فکر می‌کرد با اداره
                    مشکل پیدا می‌کند. نزدیک بود آپارتمان را از دست بدهم. یک وکیل
                    توضیح داد که این تکلیف قانونی اوست.»
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                <p className="text-xs text-emerald-200 leading-relaxed">
                  <strong>نتیجه بعد از ۵ سال:</strong> بیمه درمانی{' '}
                  <strong className="text-white">€۲۲۰</strong> در ماه (بدون
                  co-pay)، استودیو در Neukölln با{' '}
                  <strong className="text-white">€۱,۱۰۰</strong>، و درآمد یورویی
                  قابل‌مقایسه با نیویورک اما با هزینه‌های بسیار کمتر. «آرام‌تر،
                  سالم‌تر و خلاق‌تر از نیویورک هستم.»
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: KSK — WHAT IT ACTUALLY DOES
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mb-3">
                <ShieldCheck className="h-4 w-4" />
                KSK — نه «یارانه»، بلکه سهم کارفرما
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                صندوق هنرمندان آلمان دقیقاً چه می‌کند؟
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                KSK یک «یارانه دولتی» نیست. این صندوق حدود{' '}
                <strong className="text-emerald-300">۵۰٪ حق بیمه درمانی و بازنشستگی</strong> شما را
                می‌پردازد — همان نقشی که کارفرما برای یک کارمند دارد. شما نیم دیگر را
                می‌پردازید.
              </p>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white">نرخ KSK در ۲۰۲۶</span>
                  <span className="text-xs font-black text-emerald-300">۴.۹٪</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white">حداقل درآمد سالانه</span>
                  <span className="text-xs font-black text-amber-300">€۳,۹۰۰</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white">حداقل درآمد ماهانه</span>
                  <span className="text-xs font-black text-amber-300">€۳۲۵</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white">معافیت سال‌های اول</span>
                  <span className="text-xs font-black text-sky-300">۳ سال اول (تازه‌کار)</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                * KSK اختیاری نیست؛ اگر شرایط را داشته باشید، عضویت اجباری است. اما
                مزایای آن (پرداخت نیمی از بیمه) بسیار قابل‌توجه است.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                alt="KSK آلمان ۲۰۲۶ - نرخ ۴.۹ درصد و پوشش ۵۰ درصد بیمه هنرمندان"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                KSK حدود ۵۰٪ حق بیمه درمانی و بازنشستگی را می‌پردازد — نرخ ۴.۹٪ در ۲۰۲۶
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: PROCESS & TIMELINE
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-amber-400" />
            فرآیند واقعی و زمان‌بندی ۲۰۲۶
          </h2>

          <div className="space-y-3">
            {[
              {
                step: '۱',
                title: 'آماده‌سازی مدارک هنری',
                detail: 'پورتفولیو، رزومه، حداقل ۲ Letter of Intent با شرح نوع و دامنه همکاری',
                time: '۲–۴ ماه',
              },
              {
                step: '۲',
                title: 'برنامه مالی و پیش‌بینی درآمد',
                detail: 'Finanzierungsplan + Ertragsvorschau — این بخش در ۲۰۲۶ بسیار سختگیرانه‌تر بررسی می‌شود',
                time: '۱–۲ ماه',
              },
              {
                step: '۳',
                title: 'اثبات خودکفایی و پس‌انداز',
                detail: 'درآمد €۱,۱۰۰–۱,۵۰۰/ماه + پس‌انداز €۹,۰۰۰–۱۵,۰۰۰ + بیمه درمانی',
                time: 'همزمان',
              },
              {
                step: '۴',
                title: 'دریافت وقت LEA (۸–۱۶ هفته)',
                detail: 'رزرو آنلاین — بررسی لغوها چهارشنبه صبح یا ۷–۸ صبح',
                time: '۸–۱۶ هفته',
              },
              {
                step: '۵',
                title: 'حضور و دریافت اقامت ۳ ساله',
                detail: 'مدارک کامل، Anmeldung، قرارداد اجاره، بیمه — اقامت اولیه معمولاً ۳ سال',
                time: '۱ روز',
              },
              {
                step: '۶',
                title: 'تمدید و مسیر ۵ ساله تا اقامت دائم',
                detail: 'تمدید سختگیرانه‌تر بر اساس عملکرد واقعی — اقامت دائم زودتر از ۵ سال ممکن نیست',
                time: '۵ سال',
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-400 text-[#082833] grid place-items-center text-xs font-black">
                  {item.step}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.title}</span>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-400/20 text-center">
            <p className="text-[11px] text-amber-200">
              <strong>واقعیت تلخ:</strong> بسیاری از متقاضیان در مرحله تمدید (۳ سال بعد)
              شکست می‌خورند، نه در مرحله اول. LEA عملکرد مالی واقعی شما را بررسی می‌کند،
              نه وعده‌های اولیه را.
            </p>
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
            سوالات پرتکرار ویزای هنری برلین
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
      <section className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-amber-400/5 to-transparent p-6 md:p-10 text-center">
          <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-black text-white mb-2">
            پرونده خود را قبل از سخت‌تر شدن قوانین ارزیابی کنید
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            کارشناسان دیاکو درآمد، پس‌انداز و مدارک شما را با استانداردهای واقعی LEA
            برلین ۲۰۲۶ مقایسه می‌کنند و نقاط ضعف پرونده را قبل از ارسال شناسایی می‌کنند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110 cursor-pointer"
            >
              ارزیابی رایگان پرونده برلین
            </button>
            <a
              href="https://wa.me/989197340829"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold text-white hover:bg-white/10 cursor-pointer inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              گفتگو با کارشناس آلمان
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistGermanyPage;