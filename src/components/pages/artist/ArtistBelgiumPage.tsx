import OptimizedImage from '../../OptimizedImage';
import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Palette,
  Building2,
  Scale,
  Award,
  Euro,
  Users,
  FileText,
  Banknote,
  Languages,
  Briefcase,
  CalendarDays,
  BookOpen,
  AlertTriangle,
  Info,
  ShieldCheck,
  MapPin,
  Landmark,
  FileCheck2,
  Sparkles,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const ArtistBelgiumPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'کارت هنرمندی بلژیک ۲۰۲۶ | Kunstwerkattest + Professional Card',
    description:
      'راهنمای کامل هنرمندان بلژیک ۲۰۲۶: تفاوت Kunstwerkattest و Professional Card، درآمد €۱۳,۵۴۶ در ۵ سال یا €۵,۴۱۸ در ۲ سال، پردازش ۳ ماهه، حقوق €۳,۰۸۶ برای表演 artists و مسیر ۵ ساله تا اقامت دائم با دیاکو.',
    canonical: '/guides/artist-belgium',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'کارت هنرمندی بلژیک ۲۰۲۶',
      'Kunstwerkattest بلژیک',
      'Attestation du travail des arts',
      'Professional Card Belgium artist',
      'حداقل درآمد هنرمندان بلژیک ۱۳۵۴۶ یورو',
      'حقوق表演 artists بلژیک ۳۰۸۶ یورو',
      'Working in the Arts Belgium',
      'اقامت هنرمندان بلژیک',
      'ویزای هنری بروکسل',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/artist-belgium#article',
          headline:
            'راهنمای جامع هنرمندان بلژیک ۲۰۲۶: Kunstwerkattest، Professional Card و درآمد €۱۳,۵۴۶',
          description:
            'بررسی دو لایه مجوز هنرمندان بلژیک: Kunstwerkattest (تأیید حرفه‌ای بودن) و Professional Card (مجوز اقامت/کار). شرایط درآمد ۵ ساله €۱۳,۵۴۶ یا ۲ ساله €۵,۴۱۸، حقوق €۳,۰۸۶ برای表演 artists، پردازش ۳ ماهه و مسیر ۵ ساله تا اقامت دائم.',
          image: [
            'https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&w=1200&q=80',
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
            { '@type': 'Thing', name: 'Kunstwerkattest' },
            { '@type': 'Thing', name: 'Professional Card Belgium' },
            { '@type': 'Thing', name: 'Working in the Arts' },
          ],
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/artist-belgium#howto',
          name: 'مراحل دریافت Kunstwerkattest و Professional Card بلژیک',
          description: 'فرآیند دو مرحله‌ای از تأیید حرفه‌ای تا مجوز اقامت',
          totalTime: 'P6M',
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'EUR',
            value: '218',
          },
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'آماده‌سازی مدارک هنری و درآمدی',
              text: 'پورتفولیو، قراردادها، فاکتورها، اظهارنامه مالیاتی و اثبات درآمد ۲ تا ۵ سال گذشته.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'ثبت درخواست Kunstwerkattest',
              text: 'از طریق پلتفرم Working in the Arts. انتخاب نوع: Plus، Ordinary یا Starter بر اساس سابقه.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'بررسی کمیسیون (حداکثر ۳ ماه)',
              text: 'کمیسیون هنر مدارک را بررسی می‌کند. جولای و آگوست در محاسبه زمان لحاظ نمی‌شود.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'درخواست Professional Card',
              text: 'پس از دریافت Kunstwerkattest، درخواست کارت حرفه‌ای (Beroepskaart) از منطقه مربوطه.',
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'دریافت ویزای D و اقامت',
              text: 'پس از تأیید Professional Card، ویزای D دریافت و پس از ورود، کارت اقامت (A یا B) صادر می‌شود.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/artist-belgium#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا Kunstwerkattest به تنهایی اجازه اقامت در بلژیک را می‌دهد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. Kunstwerkattest فقط تأیید می‌کند که فعالیت شما از نظر کمیسیون هنر «حرفه‌ای» است و برای بهره‌مندی از حقوق اجتماعی و مالیاتی کاربرد دارد. برای اقامت و کار قانونی، به‌عنوان غیر اروپایی، باید Professional Card (کارت حرفه‌ای) یا ویزای هنرمند (Visum Kunstenaar) نیز دریافت کنید.',
              },
            },
            {
              '@type': 'Question',
              name: 'حداقل درآمد لازم برای Kunstwerkattest چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای نوع «Plus» در اولین درخواست: €۱۳,۵۴۶ درآمد ناخالص در ۵ سال قبل، یا €۵,۴۱۸ در ۲ سال قبل. برای درخواست‌های بعدی: €۴,۵۱۵ در ۵ سال یا €۲,۷۰۹ در ۳ سال. نوع «Ordinary» شرایط کمتری دارد و نوع «Starter» برای تازه‌کارها با شرایط خاص (مدرک هنری یا طرح شغلی) است.',
              },
            },
            {
              '@type': 'Question',
              name: 'حداقل حقوق برای表演 artists (هنرمندان نمایشی) در ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای هنرمندان表演 که با قرارداد کار می‌کنند، منطقه بروکسل از ۱ ژانویه ۲۰۲۶ حداقل حقوق ماهانه €۳,۰۸۶.۲۰ را الزامی کرده است. این مبلغ جدا از شرایط Kunstwerkattest است و برای اخذ مجوز کار (Single Permit) باید رعایت شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'مدت زمان پردازش Kunstwerkattest و هزینه آن چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'کمیسیون حداکثر ۳ ماه پس از کامل شدن پرونده تصمیم می‌گیرد. این مهلت در جولای و آگوست متوقف می‌شود. هزینه صدور Kunstwerkattest معمولاً رایگان است، اما هزینه Professional Card و ویزا جداگانه (حدود €۲۱۸ و بیشتر) اعمال می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا خانواده هنرمند می‌توانند به بلژیک بیایند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، پس از دریافت اقامت (Professional Card)، همسر/شریک ثبت‌شده و فرزندان زیر ۱۸ سال می‌توانند برای الحاق خانواده (Regroupement familial) درخواست دهند. از آگوست ۲۰۲۵ قوانین سخت‌گیرانه‌تر شده و اثبات درآمد پایدار و مسکن مناسب الزامی است.',
              },
            },
            {
              '@type': 'Question',
              name: 'مسیر اقامت دائم بلژیک برای هنرمندان چگونه است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'پس از ۵ سال اقامت قانونی مستمر با Professional Card، می‌توانید برای اقامت دائم (Verblijf van onbeperkte duur / Séjour illimité) درخواست دهید. برای تابعیت بلژیک معمولاً ۵ سال اقامت قانونی و شرایط زبان (هلندی/فرانسوی/آلمانی) لازم است.',
              },
            },
          ],
        },
      ],
    },
  });

  const FAQS = [
    {
      q: 'آیا Kunstwerkattest به تنهایی اجازه اقامت در بلژیک را می‌دهد؟',
      a: 'خیر. Kunstwerkattest یک «گواهی حرفه‌ای» است که تأیید می‌کند فعالیت هنری شما از نظر کمیسیون هنر بلژیک در سطح حرفه‌ای قرار دارد. این گواهی برای دسترسی به حقوق اجتماعی (بیمه، بازنشستگی) و مزایای مالیاتی ضروری است. اما برای اقامت قانونی به‌عنوان غیر اروپایی، باید علاوه بر آن، Professional Card (کارت حرفه‌ای) از منطقه مربوطه (بروکسل، فلاندرز یا والونیا) یا ویزای هنرمند (Visum Kunstenaar) برای اقامت‌های کوتاه‌مدت دریافت کنید.',
    },
    {
      q: 'حداقل درآمد لازم برای Kunstwerkattest چقدر است؟',
      a: 'برای نوع «Plus» (بالاترین سطح) در اولین درخواست: €۱۳,۵۴۶ درآمد ناخالص در ۵ سال قبل، یا €۵,۴۱۸ در ۲ سال قبل. برای درخواست‌های بعدی: €۴,۵۱۵ در ۵ سال یا €۲,۷۰۹ در ۳ سال. نوع «Ordinary» شرایط کمتری دارد و نوع «Starter» برای تازه‌کارها با مدرک هنری یا طرح شغلی طراحی شده است. کمیسیون درآمد را به‌صورت ناخالص (Bruto) بررسی می‌کند، نه خالص.',
    },
    {
      q: 'حداقل حقوق برای表演 artists (هنرمندان نمایشی) در ۲۰۲۶ چقدر است؟',
      a: 'اگر به‌صورت受雇 (با قرارداد کار) در بلژیک فعالیت می‌کنید، منطقه بروکسل از ۱ ژانویه ۲۰۲۶ حداقل حقوق ماهانه €۳,۰۸۶.۲۰ را الزامی کرده است. این مبلغ برای اخذ Single Permit (مجوز ترکیبی کار و اقامت) باید توسط کارفرما تضمین شود و جدا از شرایط Kunstwerkattest است.',
    },
    {
      q: 'مدت زمان پردازش Kunstwerkattest و هزینه آن چقدر است؟',
      a: 'کمیسیون هنر حداکثر ۳ ماه پس از اعلام کامل بودن پرونده تصمیم می‌گیرد. این مهلت در ماه‌های جولای و آگوست متوقف می‌شود. صدور خود Kunstwerkattest معمولاً هزینه مستقیمی ندارد، اما هزینه‌های جداگانه برای Professional Card و ویزا (حدود €۲۱۸ برای برخی انواع اقامت) اعمال می‌شود.',
    },
    {
      q: 'آیا خانواده هنرمند می‌توانند به بلژیک بیایند؟',
      a: 'بله، پس از دریافت اقامت (Professional Card)، همسر/شریک ثبت‌شده و فرزندان زیر ۱۸ سال می‌توانند برای الحاق خانواده درخواست دهند. توجه: از آگوست ۲۰۲۵ قوانین الحاق خانواده سخت‌گیرانه‌تر شده و اثبات درآمد پایدار و مسکن مناسب الزامی است.',
    },
    {
      q: 'مسیر اقامت دائم بلژیک برای هنرمندان چگونه است؟',
      a: 'پس از ۵ سال اقامت قانونی مستمر با Professional Card، می‌توانید برای اقامت دائم (Verblijf van onbeperkte duur) درخواست دهید. برای تابعیت بلژیک معمولاً ۵ سال اقامت قانونی و مهارت زبانی (هلندی، فرانسوی یا آلمانی) لازم است.',
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
            <span className="text-amber-300 font-bold">کارت هنرمندی بلژیک</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION 1: HERO
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-300 mb-4">
              <Palette className="h-4 w-4 text-rose-400" />
              Working in the Arts — دو لایه مجوز هنرمندان بلژیک ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              هنرمندان بلژیک ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-rose-400">
                (Kunstwerkattest + Professional Card)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              بلژیک با اصلاحات «Working in the Arts» یکی از پیشرفته‌ترین سیستم‌های حمایت از
              هنرمندان را ایجاد کرده است. اما این سیستم <strong className="text-rose-300">دو لایه</strong> دارد:
              ابتدا <strong className="text-amber-300">Kunstwerkattest</strong> (تأیید حرفه‌ای بودن) و سپس{' '}
              <strong className="text-amber-300">Professional Card</strong> (مجوز اقامت و کار). برای
              Kunstwerkattest نوع Plus، باید <strong className="text-rose-300">€۱۳,۵۴۶ در ۵ سال</strong> یا{' '}
              <strong className="text-rose-300">€۵,۴۱۸ در ۲ سال</strong> درآمد هنری اثبات کنید. پردازش
              حداکثر <strong className="text-emerald-400">۳ ماه</strong> است (جولای و آگوست متوقف).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-amber-300">€۱۳,۵۴۶</div>
                <div className="text-[10px] text-slate-300 mt-1">Plus — ۵ سال اخیر</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-rose-300">€۵,۴۱۸</div>
                <div className="text-[10px] text-slate-300 mt-1">Plus — ۲ سال اخیر</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-emerald-400">۳ ماه</div>
                <div className="text-[10px] text-slate-300 mt-1">پردازش کمیسیون</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-sky-300">€۳,۰۸۶</div>
                <div className="text-[10px] text-slate-300 mt-1">حداقل حقوق表演 artists</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی سوابق هنری برای بلژیک
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره با کارشناسان دیاکو
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&w=1000&q=80"
                alt="هنرمندان بلژیک Kunstwerkattest و Professional Card - بروکسل"
                width={1000}
                height={750}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                  <Building2 className="h-4 w-4" />
                  کمیسیون هنر بلژیک (Working in the Arts)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  ارزیابی درآمد ۲ تا ۵ سال گذشته، تأیید حرفه‌ای بودن و سپس درخواست Professional Card
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: TWO-LAYER SYSTEM — CRITICAL CLARIFICATION
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-amber-500/5 border border-amber-400/20 rounded-3xl p-6 md:p-10">
          <div className="flex items-start gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white mb-2">
                هشدار: Kunstwerkattest با Professional Card یکی نیست
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                بسیاری از منابع این دو را اشتباه می‌گیرند. تفاوت بنیادین است و انتخاب اشتباه
                می‌تواند پرونده را به بن‌بست بکشاند.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-400/20">
              <h3 className="text-sm font-black text-rose-300 mb-3 flex items-center gap-2">
                <FileCheck2 className="h-4 w-4" />
                Kunstwerkattest (گواهی حرفه‌ای)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-rose-400 mt-0.5 shrink-0" />
                  <span>صادرشده توسط <strong className="text-white">کمیسیون هنر</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-rose-400 mt-0.5 shrink-0" />
                  <span>تأیید می‌کند فعالیت شما <strong className="text-white">حرفه‌ای</strong> است</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-rose-400 mt-0.5 shrink-0" />
                  <span>مبنای دسترسی به <strong className="text-white">حقوق اجتماعی و مالیاتی</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-rose-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">به‌تنهایی</strong> اجازه اقامت نمی‌دهد</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-400/20">
              <h3 className="text-sm font-black text-sky-300 mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Professional Card (کارت حرفه‌ای)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
                  <span>صادرشده توسط <strong className="text-white">منطقه</strong> (بروکسل/فلاندرز/والونیا)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">مجوز اقامت و کار</strong> برای غیر اروپایی‌ها</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
                  <span>نیاز به اثبات <strong className="text-white">ارزش افزوده هنری/فرهنگی</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
                  <span>مبنای <strong className="text-white">ویزای D و اقامت بلندمدت</strong></span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 text-center">
            منبع: workinginthearts.be (Kunstwerkattest) | economie.fgov.be (Professional Card)
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: INCOME THRESHOLDS — HISTORICAL, NOT FUTURE
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-3">
                <Banknote className="h-4 w-4" />
                آستانه درآمد
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                درآمد «گذشته» مهم است، نه درآمد «آینده»
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 text-justify">
                برخلاف اتریش که درآمد ماهانه آینده را بررسی می‌کند، کمیسیون هنر بلژیک
                <strong className="text-amber-300"> درآمدهای واقعی گذشته</strong> شما را در بازه ۲ تا ۵ سال
                بررسی می‌کند. این درآمد باید از فعالیت هنری اصلی (Kernactiviteiten) باشد.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-300">Plus — اولین درخواست</span>
                    <span className="text-sm font-black text-white">€۱۳,۵۴۶ / ۵ سال</span>
                  </div>
                  <p className="text-[10px] text-amber-200/80">یا €۵,۴۱۸ در ۲ سال قبل از درخواست</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Plus — درخواست‌های بعدی</span>
                    <span className="text-sm font-black text-sky-300">€۴,۵۱۵ / ۵ سال</span>
                  </div>
                  <p className="text-[10px] text-slate-400">یا €۲,۷۰۹ در ۳ سال قبل</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Starter (تازه‌کار)</span>
                    <span className="text-sm font-black text-emerald-300">شرایط خاص</span>
                  </div>
                  <p className="text-[10px] text-slate-400">مدرک هنری یا طرح شغلی + شرایط درآمدی پایین‌تر</p>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-400/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-red-200 leading-relaxed">
                    <strong>حداقل مطلق:</strong> اگر در ۲ سال قبل کمتر از €۱,۰۰۰ درآمد هنری داشته باشید،
                    درخواست شما به‌عنوان «فقدان فعالیت حرفه‌ای» رد می‌شود.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                alt="آستانه درآمد Kunstwerkattest بلژیک €۱۳,۵۴۶ در ۵ سال"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                کمیسیون درآمد ناخالص (Bruto) را بررسی می‌کند، نه خالص.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: PERFORMING ARTISTS — SALARY THRESHOLD
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-br from-sky-950/40 via-slate-900/60 to-[#061a21] border border-sky-400/20 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80"
                alt="هنرمندان表演 بلژیک - حداقل حقوق €۳,۰۸۶ در ماه ۲۰۲۶"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                بروکسل: حداقل €۳,۰۸۶.۲۰/ماه برای表演 artists (۲۰۲۶)
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 mb-3">
                <Briefcase className="h-4 w-4" />
                مسیر受雇 (با قرارداد کار)
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                اگر با قرارداد کار می‌آیید: €۳,۰۸۶ در ماه
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                اگر به‌عنوان هنرمند表演 (بازیگر، نوازنده، رقصنده) با یک کارفرمای بلژیکی قرارداد
                کار امضا می‌کنید، مسیر شما متفاوت است. برای اخذ <strong className="text-sky-300">Single Permit</strong>{' '}
                (مجوز ترکیبی کار و اقامت)، کارفرما باید حداقل حقوق قانونی را تضمین کند.
              </p>

              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-sky-300">بروکسل — از ۱ ژانویه ۲۰۲۶</span>
                  <span className="text-lg font-black text-white">€۳,۰۸۶.۲۰ / ماه</span>
                </div>
                <p className="text-[10px] text-sky-200/80">
                  این مبلغ برای Region Bruxelles-Capitale اعمال می‌شود. فلاندرز و والونیا
                  آستانه‌های متفاوتی دارند.
                </p>
              </div>

              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                * حتی اگر از طریق مسیر受雇 وارد شوید، برای دریافت Kunstwerkattest و بهره‌مندی
                از حقوق اجتماعی هنرمندان، باید به‌طور جداگانه درخواست دهید.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: PROCESS & TIMELINE
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-amber-400" />
            فرآیند دو مرحله‌ای و زمان‌بندی
          </h2>

          <div className="space-y-3">
            {[
              { step: '۱', title: 'آماده‌سازی مدارک هنری و درآمدی', detail: 'پورتفولیو، قراردادها، فاکتورها، اظهارنامه مالیاتی ۲–۵ سال', time: '۲–۴ ماه' },
              { step: '۲', title: 'ثبت Kunstwerkattest در Working in the Arts', detail: 'انتخاب Plus / Ordinary / Starter بر اساس سابقه', time: '۱ روز' },
              { step: '۳', title: 'بررسی کمیسیون', detail: 'حداکثر ۳ ماه — جولای و آگوست متوقف', time: '۳ ماه' },
              { step: '۴', title: 'دریافت Kunstwerkattest (اعتبار ۵ سال)', detail: 'مبنای حقوق اجتماعی و مالیاتی', time: '—' },
              { step: '۵', title: 'درخواست Professional Card', detail: 'از منطقه مربوطه + اثبات ارزش افزوده هنری', time: '۲–۴ ماه' },
              { step: '۶', title: 'ویزای D و ورود به بلژیک', detail: 'ثبت در شهرداری و دریافت کارت اقامت', time: '۱–۲ ماه' },
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
              <strong>نکته:</strong> Kunstwerkattest و Professional Card دو فرآیند جداگانه هستند.
              ممکن است Kunstwerkattest را دریافت کنید اما Professional Card به دلیل عدم اثبات
              «ارزش افزوده هنری» رد شود.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: FAQ
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
            <BookOpen className="h-4 w-4" />
            پرسش‌های متداول
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white">
            سوالات پرتکرار هنرمندان بلژیک
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
          SECTION 7: FINAL CTA
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-amber-400/5 to-transparent p-6 md:p-10 text-center">
          <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-black text-white mb-2">
            پرونده هنری خود را برای بلژیک ارزیابی کنید
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            کارشناسان دیاکو درآمد گذشته شما را تحلیل می‌کنند، نوع Kunstwerkattest مناسب را
            تعیین می‌کنند و مسیر Professional Card را طراحی می‌کنند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110 cursor-pointer"
            >
              ارزیابی شانس هنرمندی بلژیک
            </button>
            <a
              href="https://wa.me/989197340829"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold text-white hover:bg-white/10 cursor-pointer inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              گفتگو با کارشناس
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistBelgiumPage;