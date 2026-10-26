import OptimizedImage from '../../OptimizedImage';
import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  PhoneCall,
  Copy,
  Sparkles,
  Palette,
  ShieldCheck,
  Landmark,
  FileCheck2,
  AlertTriangle,
  Building2,
  Scale,
  Award,
  Euro,
  Users,
  Languages,
  Briefcase,
  FileText,
  Banknote,
  HeartPulse,
  Home,
  CalendarDays,
  BookOpen,
  Target,
  Info,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const ArtistAustriaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'اقامت هنرمندی اتریش ۲۰۲۶ | NAG §43a + درآمد €۱,۳۰۸',
    description:
      'راهنمای کامل اقامت هنرمندان اتریش ۲۰۲۶ طبق NAG §43a: حداقل درآمد €۱,۳۰۸.۳۹/ماه، زبان A1 با شرایط豁免، هزینه €۲۱۸، پردازش ۱۰ روز کاری، تفاوت受雇/خوداشتغال و مسیر ۵ ساله تا اقامت دائم با دفتر وین دیاکو.',
    canonical: '/guides/artist-austria',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'اقامت هنرمندی اتریش ۲۰۲۶',
      'Niederlassungsbewilligung Künstler',
      'NAG §43a اتریش',
      'حداقل درآمد اقامت هنرمندان €۱۳۰۸',
      'زبان A1 اقامت هنرمندی',
      'هزینه ۲۱۸ یورو اقامت هنرمند',
      'پردازش ۱۰ روز کاری MA35',
      'هنرمند خوداشتغال اتریش قرارداد گالری',
      'اقامت دائم اتریش هنرمندان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/artist-austria#article',
          headline: 'راهنمای جامع اقامت هنرمندان اتریش ۲۰۲۶ (NAG §43a): درآمد €۱,۳۰۸ و شرایط زبان',
          description:
            'بررسی کامل Niederlassungsbewilligung – Künstler طبق NAG §43a: حداقل درآمد €۱,۳۰۸.۳۹/ماه (۲۰۲۶)، زبان A1 با豁免 برای دانشگاه‌دیدگان و هنرهای خاص، هزینه €۲۱۸، پردازش ۱۰/۵ روز کاری، تفاوت受雇 و خوداشتغال، و مسیر ۵ ساله تا Daueraufenthalt-EU.',
          image: [
            'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
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
            { '@type': 'Thing', name: 'Niederlassungsbewilligung Künstler' },
            { '@type': 'Thing', name: 'NAG §43a' },
            { '@type': 'Thing', name: 'اقامت هنرمندی اتریش' },
          ],
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/artist-austria#howto',
          name: 'مراحل دریافت اقامت هنرمندی اتریش (NAG §43a)',
          description: 'فرآیند گام‌به‌گام از آماده‌سازی پورتفولیو تا دریافت کارت اقامت',
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
              name: 'آماده‌سازی پورتفولیو و مدارک هنری',
              text: 'پورتفولیو، رزومه هنری (Europass)، مدارک تحصیلی هنری یا سابقه فعالیت، و ترجمه رسمی با Apostille.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'اثبات درآمد یا Haftungserklärung',
              text: 'حداقل €۱,۳۰۸.۳۹/ماه خالص (۲۰۲۶) از فعالیت هنری، یا Haftungserklärung (تعهد یک ضامن مقیم اتریش).',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'مدرک زبان A1 (یا豁免)',
              text: 'گواهی A1 از ÖIF، ÖSD، TELC یا Goethe (حداکثر ۱ سال اعتبار).豁免 برای دانشگاه‌دیدگان و هنرهای خاص.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'ثبت درخواست و پرداخت €۲۱۸',
              text: 'ثبت در سفارت اتریش یا در صورت حضور قانونی در اتریش، مستقیماً در MA35. هزینه €۲۱۸/نفر.',
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'دریافت تصمیم (۱۰ روز کاری)',
              text: 'حداکثر ۱۰ روز کاری برای初次申请، ۵ روز کاری برای续签. کارت اقامت حداکثر ۱۲ ماه اعتبار دارد.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/artist-austria#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا برای اقامت هنرمندی اتریش مدرک زبان آلمانی الزامی است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، در حالت عادی مدرک A1 آلمانی برای初次申请 الزامی است. اما دو استثنا وجود دارد: (۱) اگر دارای مدرک دانشگاهی (studienberechtigender Abschluss) هستید، (۲) اگر در حوزه‌های هنری مشخص‌شده در Kunstförderungsgesetz (ادبیات، هنرهای نمایشی، موسیقی، هنرهای تجسمی، عکاسی، فیلم و ویدیو) فعالیت می‌کنید، از ارائه A1 معاف هستید.',
              },
            },
            {
              '@type': 'Question',
              name: 'حداقل درآمد ماهانه برای اقامت هنرمندی اتریش در ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'طبق استاندارد ASVG ۲۰۲۶، برای فرد مجرد €۱,۳۰۸.۳۹ در ماه (خالص، پس از کسر هزینه‌های ثابت مانند اجاره تا سقف €۳۸۶.۴۳)، برای زوج €۲,۰۶۴.۱۲ و برای هر فرزند €۲۰۱.۸۸ اضافه می‌شود. این مبلغ باید از فعالیت هنری تأمین شود. در صورت عدم تأمین، Haftungserklärung (تعهد ضامن) نیز پذیرفته می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'تفاوت هنرمند خوداشتغال و受雇 در این اقامت چیست؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خوداشتغال (selbständig): نیاز به قرارداد با گالری، تئاتر، سالن کنسرت یا برگزارکننده رویداد برای فعالیت بیش از ۶ ماه.受雇 (unselbständig): نیاز به Arbeitgebererklärung (اظهارنامه کارفرما) و قرارداد کاری. هر دو مسیر تحت NAG §43a امکان‌پذیر است.',
              },
            },
            {
              '@type': 'Question',
              name: 'مدت زمان پردازش و هزینه اقامت هنرمندی چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حداکثر ۱۰ روز کاری برای初次申请 و ۵ روز کاری برای تمدید. هزینه درخواست €۲۱۸ برای هر نفر (۲۰۲۶). کارت اولیه حداکثر ۱۲ ماه اعتبار دارد. برای تمدید، Module 1 (A2 آلمانی) و ۲ سال اقامت لازم است، سپس تمدید ۳ ساله امکان‌پذیر است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا خانواده هنرمند می‌توانند همراه باشند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، همسر/شریک ثبت‌شده (۲۱ سال+) و فرزندان زیر ۱۸ سال می‌توانند برای الحاق خانواده درخواست دهند. هر یک از اعضا باید مستقلاً شرایط عمومی (درآمد، مسکن، بیمه، A1 آلمانی) را برآورده کنند و تابع سهمیه سالانه هستند.',
              },
            },
            {
              '@type': 'Question',
              name: 'مسیر اقامت دائم و تابعیت اتریش برای هنرمندان چگونه است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'پس از ۵ سال اقامت قانونی مستمر و مدرک B1 آلمانی (Module 2)، می‌توانید برای Daueraufenthalt-EU (اقامت دائم اتحادیه اروپا) درخواست دهید. تابعیت اتریش معمولاً پس از ۶-۱۰ سال و با شرایط اضافی (درآمد کافی، عدم سوءپیشینه) امکان‌پذیر است.',
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
      q: 'آیا برای اقامت هنرمندی اتریش مدرک زبان آلمانی الزامی است؟',
      a: 'بله، در حالت عادی مدرک A1 آلمانی برای初次申请 الزامی است (گواهی از ÖIF، ÖSD، TELC یا Goethe، حداکثر ۱ سال اعتبار). اما دو استثنای مهم وجود دارد: (۱) اگر دارای مدرک دانشگاهی (studienberechtigender Abschluss) هستید؛ (۲) اگر در حوزه‌های هنری مشخص‌شده در Kunstförderungsgesetz — ادبیات، هنرهای نمایشی، موسیقی، هنرهای تجسمی، عکاسی، فیلم و ویدیو، و فرم‌های هنری تجربی — فعالیت می‌کنید، از ارائه A1 معاف هستید[reference:15].',
    },
    {
      q: 'حداقل درآمد ماهانه برای اقامت هنرمندی اتریش در ۲۰۲۶ چقدر است؟',
      a: 'طبق استاندارد ASVG ۲۰۲۶: برای فرد مجرد €۱,۳۰۸.۳۹ در ماه (خالص، پس از کسر هزینه‌های ثابت ماهانه تا سقف €۳۸۶.۴۳)، برای زوج €۲,۰۶۴.۱۲ و برای هر فرزند €۲۰۱.۸۸ اضافه می‌شود[reference:16]. این مبلغ باید از فعالیت هنری تأمین شود. در صورت عدم تأمین کامل، Haftungserklärung (تعهد یک ضامن مقیم اتریش) نیز به‌عنوان جایگزین پذیرفته می‌شود[reference:17].',
    },
    {
      q: 'تفاوت هنرمند خوداشتغال (selbständig) و受雇 (unselbständig) چیست؟',
      a: 'خوداشتغال: نیاز به یک یا چند قرارداد با گالری، تئاتر، سالن کنسرت یا برگزارکننده رویداد در اتریش برای فعالیت بیش از ۶ ماه.受雇: نیاز به Arbeitgebererklärung (اظهارنامه کارفرما) و قرارداد کاری مشخص. هر دو مسیر تحت NAG §43a امکان‌پذیر است و کارت اقامت هر دو گروه اجازه فعالیت هنری اصلی را می‌دهد[reference:18].',
    },
    {
      q: 'مدت زمان پردازش و هزینه اقامت هنرمندی چقدر است؟',
      a: 'حداکثر ۱۰ روز کاری برای初次申请 و ۵ روز کاری برای تمدید[reference:19]. هزینه درخواست €۲۱۸ برای هر نفر (۲۰۲۶)[reference:20]. کارت اولیه حداکثر ۱۲ ماه اعتبار دارد[reference:21]. برای تمدید: ۲ سال اقامت مستمر + Module 1 (A2 آلمانی) → تمدید ۳ ساله. پس از ۵ سال + B1 (Module 2) → Daueraufenthalt-EU[reference:22].',
    },
    {
      q: 'آیا خانواده هنرمند می‌توانند همراه باشند؟',
      a: 'بله، همسر/شریک ثبت‌شده (۲۱ سال+) و فرزندان مجرد زیر ۱۸ سال می‌توانند برای الحاق خانواده درخواست دهند. هر یک از اعضا باید مستقلاً شرایط عمومی (درآمد، مسکن، بیمه درمانی، A1 آلمانی) را برآورده کنند و پذیرش تابع سهمیه سالانه است[reference:23].',
    },
    {
      q: 'مسیر اقامت دائم و تابعیت اتریش برای هنرمندان چگونه است؟',
      a: 'پس از ۵ سال اقامت قانونی مستمر و مدرک B1 آلمانی (Module 2)، می‌توانید برای Daueraufenthalt-EU درخواست دهید. این کارت اقامت دائم اتحادیه اروپا، دسترسی نامحدود به بازار کار و حق اقامت در سراسر اتحادیه را فراهم می‌کند. تابعیت اتریش معمولاً پس از ۶-۱۰ سال و با شرایط اضافی (درآمد کافی، عدم سوءپیشینه، آزمون شهروندی) امکان‌پذیر است[reference:24].',
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
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span>
            <span>/</span>
            <span>هنرمندان و نخبگان</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">اقامت هنرمندی اتریش</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION 1: HERO
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-4 py-1.5 text-xs font-bold text-pink-300 mb-4">
              <Palette className="h-4 w-4 text-pink-400" />
              NAG §43a — اقامت تخصصی هنرمندان اتریش ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              اقامت هنرمندی اتریش ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-pink-400">
                (Niederlassungsbewilligung – Künstler)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              وین پایتخت هنری اروپا، میزبان نقاشان، موسیقی‌دانان، بازیگران و طراحان بین‌المللی
              است. طبق <strong className="text-amber-300">NAG §43a</strong>، هنرمندان غیر
              اتحادیه اروپا می‌توانند با اثبات فعالیت هنری حرفه‌ای و درآمد حداقل{' '}
              <strong className="text-amber-300">€۱,۳۰۸.۳۹ در ماه</strong> (۲۰۲۶)، اقامت
              رسمی بگیرند. برخلاف تصور رایج، زبان A1 معمولاً الزامی است، اما برای
              دانشگاه‌دیدگان و هنرهای خاص豁免 وجود دارد.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-amber-300">€۱,۳۰۸.۳۹</div>
                <div className="text-[10px] text-slate-300 mt-1">حداقل درآمد ماهانه (۲۰۲۶)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-emerald-400">۱۰ روز</div>
                <div className="text-[10px] text-slate-300 mt-1">پردازش初次申请</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-sky-300">€۲۱۸</div>
                <div className="text-[10px] text-slate-300 mt-1">هزینه درخواست</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-pink-300">۱۲ ماه</div>
                <div className="text-[10px] text-slate-300 mt-1">اعتبار اولیه کارت</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی آنلاین پرونده هنری شما
              </button>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                دفتر وین: +۴۳۶۸۸۹۷۶۳۲۵۶
                {copiedPhone && <span className="text-emerald-400 text-[10px] font-bold">کپی شد!</span>}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80"
                alt="اقامت هنرمندی اتریش NAG §43a - وین پایتخت هنر اروپا"
                width={1000}
                height={750}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Building2 className="h-4 w-4" />
                  پیگیری پرونده در MA35 وین
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  تنظیم قراردادهای هنری، ترجمه رسمی، Haftungserklärung و حضور وکیل در مصاحبه
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: LEGAL FRAMEWORK — NAG §43a
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-3">
                <Scale className="h-4 w-4" />
                چارچوب قانونی
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                NAG §43a دقیقاً چه می‌گوید؟
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                برخلاف آنچه در بسیاری از منابع فارسی دیده می‌شود، اقامت هنرمندان اتریش تحت
                <strong className="text-amber-300"> NAG §43a</strong> (قانون اقامت و اسکان)
                صادر می‌شود، نه §61. این قانون دو شرط اصلی دارد:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-black text-amber-300 shrink-0">۱.</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      فعالیت باید <strong className="text-white">عمدتاً مبتنی بر آفرینش هنری</strong> باشد
                      (überwiegend durch Aufgaben der künstlerischen Gestaltung bestimmt).
                      صرف عنوان شغلی کافی نیست؛ ماهیت فعالیت مهم است.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-black text-amber-300 shrink-0">۲.</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      معیشت باید <strong className="text-white">از طریق درآمد همان فعالیت هنری</strong> تأمین
                      شود (sofern ihr Unterhalt durch das Einkommen gedeckt wird, das sie aus ihrer
                      künstlerischen Tätigkeit beziehen).
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  <strong className="text-white">نکته حقوقی مهم:</strong> برای هنرمندان
                  <strong className="text-amber-300"> خوداشتغال (selbständig)</strong>، دادگاه
                  اداری اتریش تأیید کرده که درآمد لزوماً نباید به‌طور دقیق با Richtsatz سنجیده
                  شود؛ بلکه باید «مناسب برای پوشش معیشت» باشد. با این حال، در عمل
                  <strong className="text-white"> €۱,۳۰۸.۳۹/ماه </strong>
                  به‌عنوان معیار امن و استاندارد در نظر گرفته می‌شود.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                  alt="قانون NAG §43a اتریش - شرایط اقامت هنرمندان ۲۰۲۶"
                  width={800}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                  NAG §43a — مبنای قانونی Niederlassungsbewilligung – Künstler
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-400/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-red-200 leading-relaxed">
                    <strong>تصحیح مهم:</strong> اگر در منبعی «NAG §61» دیدید، بدانید که §61
                    به اقامت پژوهشگران و موارد دیگر مربوط است، نه هنرمندان. همیشه
                    <strong className="text-white"> §43a </strong>
                    را به‌عنوان مرجع قانونی ذکر کنید.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: INCOME & FINANCIAL REQUIREMENTS
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                alt="حداقل درآمد اقامت هنرمندی اتریش €۱,۳۰۸ در ماه ۲۰۲۶"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                استاندارد ASVG ۲۰۲۶: €۱,۳۰۸.۳۹/ماه خالص (مجرد) — پس از کسر هزینه‌های ثابت
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mb-3">
                <Banknote className="h-4 w-4" />
                درآمد و تمکن مالی
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                چقدر درآمد لازم است؟ (۲۰۲۶)
              </h2>

              <div className="space-y-2.5">
                {[
                  { label: 'مجرد (Alleinstehend)', value: '€۱,۳۰۸.۳۹ / ماه', icon: Banknote, color: 'text-amber-300' },
                  { label: 'زوج (Ehepaar)', value: '€۲,۰۶۴.۱۲ / ماه', icon: Users, color: 'text-amber-300' },
                  { label: 'هر فرزند', value: '+ €۲۰۱.۸۸ / ماه', icon: HeartPulse, color: 'text-amber-300' },
                  { label: 'هزینه ثابت قابل کسر', value: 'تا €۳۸۶.۴۳ / ماه', icon: Home, color: 'text-slate-300' },
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

              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
                <p className="text-[11px] text-emerald-200 leading-relaxed">
                  <strong>Haftungserklärung:</strong> اگر درآمد شما به این حد نرسد، می‌توانید
                  از یک ضامن مقیم اتریش (با درآمد کافی) استفاده کنید. این تعهدنامه
                  به‌عنوان جایگزین تمکن مالی پذیرفته می‌شود.
                </p>
              </div>

              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                * درآمد باید از فعالیت هنری باشد. کمک‌هزینه‌های دولتی یا درآمد غیرهنری
                به‌عنوان منبع اصلی پذیرفته نمی‌شود.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: GERMAN LANGUAGE — A1 WITH EXEMPTIONS
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-br from-sky-950/40 via-slate-900/60 to-[#061a21] border border-sky-400/20 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 mb-3">
                <Languages className="h-4 w-4" />
                زبان آلمانی
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                A1 لازم است — مگر در شرایط豁免
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                برخلاف تصور رایج، برای اقامت هنرمندی اتریش <strong className="text-sky-300">مدرک A1 آلمانی
                معمولاً الزامی است</strong>. گواهی باید از ÖIF، ÖSD، TELC یا Goethe باشد و
                حداکثر ۱ سال اعتبار داشته باشد. اما دو استثنای مهم وجود دارد:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-white">استثنای ۱: مدرک دانشگاهی</span>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        اگر دارای مدرک تحصیلی دانشگاهی (studienberechtigender Abschluss) هستید، از A1 معافید.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-white">استثنای ۲: هنرهای خاص</span>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        فعالیت در حوزه‌های Kunstförderungsgesetz: ادبیات، هنرهای نمایشی، موسیقی،
                        هنرهای تجسمی، عکاسی، فیلم/ویدیو و فرم‌های تجربی.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                * اگر در حوزه‌ای خارج از این دسته‌ها (مثلاً طراحی مد یا معماری هنری) فعالیت
                می‌کنید، احتمالاً باید A1 ارائه دهید. دفتر وین دیاکو وضعیت شما را دقیق
                بررسی می‌کند.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="مدرک زبان A1 برای اقامت هنرمندی اتریش - شرایط豁免"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                A1 از ÖIF/ÖSD/TELC/Goethe — حداکثر ۱ سال اعتبار |豁免 برای دانشگاه‌دیدگان و هنرهای خاص
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: EMPLOYED vs SELF-EMPLOYED
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-amber-400" />
            دو مسیر: خوداشتغال یا受雇
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/20">
              <h3 className="text-sm font-black text-amber-300 mb-3 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                خوداشتغال (Selbständig)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>قرارداد با گالری، تئاتر، سالن کنسرت یا برگزارکننده رویداد</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>مدت قرارداد: <strong className="text-white">بیش از ۶ ماه</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>درآمد از قراردادهای هنری متعدد قابل اثبات است</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>Haftungserklärung در صورت کمبود درآمد پذیرفته می‌شود</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-400/20">
              <h3 className="text-sm font-black text-sky-300 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
               受雇 (Unselbständig)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
                  <span>قرارداد کاری با کارفرمای اتریشی</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Arbeitgebererklärung</strong> (اظهارنامه کارفرما)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
                  <span>کارفرما شرایط قانونی (حداقل حقوق، بیمه) را تضمین می‌کند</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
                  <span>درآمد ماهانه از حقوق ثابت تأمین می‌شود</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-6 text-center">
            هر دو مسیر تحت NAG §43a امکان‌پذیر است. انتخاب مسیر به وضعیت شغلی و مدارک شما بستگی دارد.
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: PROCESS & TIMELINE
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-amber-400" />
            فرآیند درخواست و زمان‌بندی
          </h2>

          <div className="space-y-3">
            {[
              { step: '۱', title: 'آماده‌سازی پورتفولیو و مدارک', detail: 'پورتفولیو، Europass CV، مدارک هنری، ترجمه رسمی + Apostille، گواهی عدم سوءپیشینه (حداکثر ۳ ماه)', time: '۲–۴ ماه' },
              { step: '۲', title: 'اثبات درآمد یا Haftungserklärung', detail: '€۱,۳۰۸.۳۹/ماه خالص یا تعهد ضامن مقیم اتریش', time: '۱–۲ ماه' },
              { step: '۳', title: 'مدرک A1 (یا豁免)', detail: 'گواهی ÖIF/ÖSD/TELC/Goethe — حداکثر ۱ سال اعتبار', time: '۱–۳ ماه' },
              { step: '۴', title: 'ثبت درخواست و پرداخت €۲۱۸', detail: 'سفارت اتریش (خارج) یا MA35 (در صورت حضور قانونی در اتریش)', time: '۱ روز' },
              { step: '۵', title: 'دریافت تصمیم', detail: 'حداکثر ۱۰ روز کاری (初次) / ۵ روز کاری (续签)', time: '۱۰ روز' },
              { step: '۶', title: 'دریافت کارت اقامت', detail: 'حداکثر ۱۲ ماه اعتبار — قابل تمدید', time: '—' },
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
              <strong>نکته:</strong> برخلاف بسیاری از منابع که از «۳-۶ ماه» صحبت می‌کنند،
              پردازش خودِ اقامت هنرمندی توسط MA35 تنها <strong className="text-white">۱۰ روز کاری</strong> است.
              تأخیر اصلی مربوط به آماده‌سازی مدارک و وقت سفارت است.
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
            سوالات پرتکرار اقامت هنرمندی اتریش
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
            پرونده هنری خود را با وکلای وین دیاکو ارزیابی کنید
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            وکلای رسمی مقیم اتریش، پورتفولیو و شرایط شما را بررسی کرده و دقیق‌ترین مسیر
            حقوقی (خوداشتغال یا受雇) را طراحی می‌کنند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110 cursor-pointer"
            >
              ارزیابی شانس اقامت هنری
            </button>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold text-white hover:bg-white/10 cursor-pointer inline-flex items-center gap-2"
            >
              <Copy className="h-4 w-4 text-amber-400" />
              {copiedPhone ? 'شماره دفتر وین کپی شد!' : 'دفتر وین: +43 688 976 3256'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistAustriaPage;