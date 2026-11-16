import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Building2,
  ExternalLink,
  AlertTriangle,
  Globe2,
  Scale,
  BadgeDollarSign,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

const FAQS = [
  {
    q: 'آیا ثبت شرکت در دبی واقعاً صفر درصد مالیات دارد؟',
    a: 'در امارات متحده عربی مالیات بر درآمد شخصی (Personal Income Tax) همچنان ۰٪ است، اما از سال مالی ۲۰۲۳ مالیات فدرال بر سود شرکت‌ها (Corporate Tax) به نرخ ۹٪ برای سود خالص سالانه بالای ۳۷۵٬۰۰۰ درهم وضع شده است. شرکت‌های مناطق آزاد (Freezone) تنها در صورتی که شرایط Qualifying Free Zone Person (QFZP) را احراز کنند می‌توانند از نرخ ۰٪ روی درآمدهای واجد شرایط بهره‌مند شوند.',
  },
  {
    q: 'تفاوت شرکت Freezone و Mainland دبی برای باز کردن حساب بانکی چیست؟',
    a: 'مناطق آزاد معتبر مثل IFZA، DMCC و Meydan هزینه راه‌اندازی مشخص‌تری دارند و برای تجارت بین‌الملل یا خدمات دیجیتال مناسب‌اند. شرکت‌های Mainland (زیر نظر DED / DET دبی) امکان فروش مستقیم در بازار داخلی امارات و شرکت در مناقصات دولتی را دارند و در صورت داشتن دفتر فیزیکی (Ejari)، فرآیند ارزیابی KYC بانک‌های اماراتی برای آن‌ها روان‌تر است.',
  },
  {
    q: 'آیا ایرانیان می‌توانند در دبی شرکت ثبت کنند و حساب بانکی شرکتی بگیرند؟',
    a: 'بله؛ ثبت شرکت در بسیاری از مناطق آزاد و Mainland دبی با مالکیت ۱۰۰٪ برای اتباع ایرانی امکان‌پذیر است، اما افتتاح حساب بانکی شرکتی در امارات تابع قوانین سخت‌گیرانه تطبیق و ضدپول‌شویی (Compliance / KYC) بانک‌های محلی است و نیازمند ارائه سابقه کسب‌وکار شفاف، قراردادهای تجاری، آدرس دفتر واقعی (Ejari) و مدارک اثبات منشأ سرمایه (SOF) است.',
  },
  {
    q: 'با ثبت شرکت در دبی اقامت چند ساله صادر می‌شود؟',
    a: 'اقامت سرمایه‌گذاری / شریک تجاری (Partner / Investor Visa) معمولاً ۲ ساله است و تا زمانی که لایسنس شرکت تمدید شود و شرکت فعال باشد قابل تمدید خواهد بود. دریافت گلدن ویزای ۱۰ ساله امارات از مسیر کارآفرینی یا سرمایه‌گذاری نیازمند احراز سقف‌های قانونی مجزا (مانند پروژه تاییدشده به ارزش حداقل ۵۰۰٬۰۰۰ درهم یا سپرده/ملک ۲ میلیون درهمی) است.',
  },
];

export const BusinessDubaiPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [companyType, setCompanyType] = useState<'freezone' | 'mainland'>('freezone');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ثبت شرکت و اقامت دبی ۲۰۲۶ | قوانین مالیاتی و لایسنس امارات',
    description:
      'راهنمای تخصصی ثبت شرکت در دبی ۲۰۲۶؛ مقایسه Freezone و Mainland، قوانین ۹٪ مالیات شرکتی و ۰٪ درآمد شخصی، افتتاح حساب بانکی و اقامت ۲ ساله امارات.',
    canonical: '/business-dubai',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ثبت شرکت دبی ۲۰۲۶',
      'اقامت امارات با ثبت شرکت',
      'گلدن ویزای دبی',
      'مالیات شرکتی ۹ درصد امارات',
      'شرکت منطقه آزاد فری زون دبی',
      'ثبت شرکت مین لند دبی',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.dia-co.ir/business-dubai#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: 'https://www.dia-co.ir/' },
            { '@type': 'ListItem', position: 2, name: 'ثبت شرکت در دبی', item: 'https://www.dia-co.ir/business-dubai' },
          ],
        },
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/business-dubai#article',
          headline: 'راهنمای جامع ثبت شرکت و اخذ اقامت دبی امارات ۲۰۲۶: لایسنس تجاری و قوانین مالیاتی',
          description:
            'بررسی ساختار شرکت‌های Freezone و Mainland در دبی، قانون مالیات شرکتی ۹٪ بالای ۳۷۵ هزار درهم، افتتاح حساب بانکی و صدور Emirates ID.',
          image: [
            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
          ],
          author: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          publisher: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' },
          },
          datePublished: '2026-01-01',
          dateModified: '2026-11-16',
          inLanguage: 'fa-IR',
          mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.dia-co.ir/business-dubai' },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/business-dubai#howto',
          name: 'مراحل ثبت شرکت و اخذ اقامت ۲ ساله امارات در دبی',
          description: 'گام‌های قانونی صدور لایسنس تجاری تا دریافت Emirates ID',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'انتخاب حوزه فعالیت، نوع لایسنس و رزرو نام تجاری',
              text: 'تعیین فعالیت مجاز در DET (Mainland) یا اداره منطقه آزاد (مانند IFZA، Meydan، DMCC) و اخذ پیش‌تاییدیه.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'امضای اساسنامه (MOA) و صدور لایسنس تجاری',
              text: 'نهایی‌سازی مدارک ثبتی، تنظیم قرارداد اجاره دفتر یا Flexi-Desk و دریافت مجوز فعالیت رسمی.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'کارت استبلیشمنت، مجوز ورود و آزمایش پزشکی در دبی',
              text: 'صدور Establishment Card، دریافت Entry Permit، انجام تست پزشکی و انگشت‌نگاری بیومتریک.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'دریافت Emirates ID، ثبت مالیاتی FTA و پرونده بانکی',
              text: 'صدور کارت اقامت امارات، ثبت شماره مالیاتی در Federal Tax Authority و آماده‌سازی پکیج KYC بانک.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/business-dubai#faq',
          mainEntity: FAQS.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        },
      ],
    },
  });

  return (
    <div className="min-h-screen bg-[#061a21] text-slate-100" dir="rtl">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#082833] via-[#061a21] to-[#041217] pt-10 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به خدمات دیاکو
            </button>
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-bold text-amber-300">
              🇦🇪 دپارتمان ثبت شرکت خاورمیانه و امارات
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-black text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                مالکیت ۱۰۰٪ خارجی | ۰٪ مالیات درآمد شخصی
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl text-white">
                ثبت شرکت و اقامت دبی امارات؛ ساختار Freezone و Mainland
              </h1>

              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-300 sm:text-base text-justify">
                دبی به‌عنوان قطب تجارت و لجستیک خاورمیانه، امکان مالکیت ۱۰۰٪ شرکت‌ها را بدون نیاز به کفیل اماراتی (برای اغلب فعالیت‌ها) فراهم کرده است. در نظام مالیاتی به‌روز امارات، درآمد شخصی همچنان با نرخ ۰٪ معاف است و شرکت‌ها تا سود سالانه ۳۷۵٬۰۰۰ درهم مشمول ۰٪ مالیات شرکتی (و بالاتر از آن ۹٪) هستند. اخذ اقامت ۲ ساله سرمایه‌گذاری (قابل تمدید) و صدور کارت Emirates ID تحت هدایت حقوقی تیم دیاکو و هماهنگی دفاتر تهران، وین و آتن انجام می‌شود.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  برآورد هزینه لایسنس و اقامت دبی
                </button>
                <a
                  href="tel:+982191693955"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4 text-amber-400" />
                  مشاوره تهران: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[16/9] w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="برج خلیفه و آسمان‌خراش‌های منطقه تجاری دبی امارات"
                  loading="eager"
                  fetchPriority="high"
                  width={1000}
                  height={563}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Specs */}
      <section className="py-12 border-b border-white/10 bg-[#05151b]">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'مالیات بر درآمد شخصی', value: '۰٪ (بدون مالیات حقوق و سود سهام)', icon: BadgeDollarSign },
              { label: 'مالیات شرکتی (Corporate Tax)', value: '۰٪ تا ۳۷۵k درهم / ۹٪ مازاد آن', icon: Scale },
              { label: 'اقامت سرمایه‌گذار (Partner)', value: '۲ ساله قابل تمدید (Emirates ID)', icon: ShieldCheck },
              { label: 'زمان صدور لایسنس', value: 'حدود ۵ تا ۱۴ روز کاری', icon: Globe2 },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <item.icon className="h-5 w-5 text-amber-400 mb-3" />
                <div className="text-xs text-slate-400">{item.label}</div>
                <div className="mt-1 text-sm font-black text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Freezone vs Mainland */}
      <section className="py-14 bg-[#082029]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <h2 className="text-xl font-black text-white">مقایسه ساختار شرکت در امارات (Freezone vs Mainland)</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCompanyType('freezone')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  companyType === 'freezone' ? 'bg-amber-400 text-slate-900 font-black' : 'bg-white/5 text-slate-300'
                }`}
              >
                شرکت‌های منطقه آزاد (Freezone)
              </button>
              <button
                type="button"
                onClick={() => setCompanyType('mainland')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  companyType === 'mainland' ? 'bg-amber-400 text-slate-900 font-black' : 'bg-white/5 text-slate-300'
                }`}
              >
                شرکت‌های سرزمین اصلی (Mainland - DET)
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
              {companyType === 'freezone' ? (
                <div>
                  <h3 className="font-bold text-amber-300 text-sm">شرکت‌های فری‌زون دبی (IFZA, Meydan, DMCC, RAKEZ)</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    مناسب برای تجارت بین‌الملل، مشاوره و خدمات نرم‌افزاری بدون نیاز اولیه به اجاره دفتر بزرگ. مالکیت ۱۰۰٪ خارجی، انعطاف در بسته‌های ویزا (۱ تا ۶ ویزا) و امکان بهره‌مندی از نرخ ۰٪ روی درآمدهای واجد شرایط Qualifying Free Zone Person در معاملات B2B بین‌المللی یا داخل مناطق آزاد.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-amber-300 text-sm">شرکت‌های مین‌لند دبی (Department of Economy & Tourism)</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    امکان فعالیت مستقیم تجاری در سراسر خاک امارات، اجاره دفتر یا فروشگاه تجاری در هر نقطه از دبی (قرارداد Ejari) و عقد قرارداد با نهادهای دولتی و خصوصی امارات. برای فعالیت‌های نیازمند اعتبار بانکی بالا و معاملات داخلی دبی انتخاب اول محسوب می‌شود.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Caveats & Risk Box */}
      <section className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-6">
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6">
            <h2 className="flex items-center gap-2 text-base font-black text-amber-300">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              نکات حقوقی و بانکی مهم پیش از اقدام
            </h2>
            <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>ثبت شرکت به معنای تضمین خودکار افتتاح حساب بانکی نیست؛ بانک‌های اماراتی پس از صدور Emirates ID و بررسی تاریخچه شغلی، فاکتورها و منشأ سرمایه (KYC) درباره افتتاح حساب تصمیم‌گیری می‌کنند.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>تمامی شرکت‌های ثبت‌شده در امارات (حتی با درآمد زیر ۳۷۵ هزار درهم یا Freezone) موظف به ثبت‌نام در سامانه مالیاتی FTA (Federal Tax Authority) و تسلیم اظهارنامه سالانه در مهلت قانونی هستند تا مشمول جریمه ۱۰٬۰۰۰ درهمی نشوند.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>برای حفظ اقامت ۲ ساله دبی، دارنده ویزا نباید بیش از ۱۸۰ روز متوالی خارج از امارات بماند و در کنار هزینه‌های تمدید سالانه لایسنس، بیمه درمانی معتبر الزامی است.</span>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-base font-black text-white">منابع رسمی دولت امارات و دبی</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 text-xs">
              <a
                href="https://u.ae/en/information-and-services/business"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-slate-200 hover:border-amber-400/40 hover:text-amber-300 transition"
              >
                <span>پورتال رسمی دولت امارات (U.AE)</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
              <a
                href="https://www.investindubai.gov.ae/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-slate-200 hover:border-amber-400/40 hover:text-amber-300 transition"
              >
                <span>سرمایه‌گذاری دبی (Invest in Dubai)</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
              <a
                href="https://tax.gov.ae/en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-slate-200 hover:border-amber-400/40 hover:text-amber-300 transition"
              >
                <span>اداره مالیات فدرال (FTA)</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-black text-white mb-4">پرسش‌های متداول ثبت شرکت در دبی</h2>
            <div className="space-y-3">
              {FAQS.map((item, idx) => (
                <div key={item.q} className="rounded-2xl border border-white/10 bg-black/25 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-4 text-right text-xs sm:text-sm font-bold text-white cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-amber-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-xs leading-relaxed text-slate-300 border-t border-white/5 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cross Links & NAP */}
          {onNavigateToCountry && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-sm font-black text-white mb-3">مقایسه با سایر مقاصد ثبت شرکت و تجاری</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'business-austria', label: 'ثبت شرکت اتریش (کارت قرمز-سفید-قرمز)' },
                  { key: 'business-turkey', label: 'ثبت شرکت ترکیه' },
                  { key: 'business-greece', label: 'ثبت شرکت و گلدن ویزا یونان' },
                ].map((link) => (
                  <button
                    key={link.key}
                    type="button"
                    onClick={() => onNavigateToCountry(link.key)}
                    className="rounded-xl border border-white/15 bg-black/30 px-3.5 py-2 text-xs font-bold text-slate-200 hover:border-amber-400/50 hover:text-amber-300 transition cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/15 to-white/5 p-6 text-center">
            <h3 className="text-base font-black text-white">تماس مستقیم با دفاتر حقوقی هلدینگ دیاکو (تاسیس ۱۳۹۴)</h3>
            <p className="mt-2 text-xs text-slate-300">
              تهران (ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴): ۰۲۱۹۱۶۹۳۹۵۵ | وین: +43 688 976 3256 | آتن: Glyfada
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-xl bg-[#f5a623] px-5 py-2.5 text-xs font-black text-[#082833] hover:bg-amber-300 cursor-pointer"
              >
                درخواست مشاوره تخصصی دبی
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessDubaiPage;
