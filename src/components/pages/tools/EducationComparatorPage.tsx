import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Euro,
  Globe,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const EducationComparatorPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useSeo({
    title: 'مقایسه‌گر تحصیل در اروپا ۲۰۲۶ | اتریش، آلمان، ایتالیا یا اسپانیا؟',
    description:
      'مقایسه جامع شرایط تحصیل در دانشگاه‌های برتر اروپا؛ شهریه دانشگاه‌ها، بورسیه استانی ایتالیا DSU، تحصیل به زبان انگلیسی، کار دانشجویی و اقامت کاری پس از فارغ‌التحصیلی با نظارت دیاکو.',
    canonical: '/guides/education-comparator',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'مقایسه تحصیل در اتریش و آلمان ۲۰۲۶',
      'بورسیه DSU ایتالیا',
      'تحصیل رایگان در اروپا',
      'شهریه دانشگاه های وین و مونیخ',
      'کار بعد از فارغ التحصیلی در اروپا',
      'مقایسه گر تحصیل دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/education-comparator#article',
          headline: 'تحلیل مقایسه‌ای تحصیل در برترین مقاصد دانشگاهی اروپا در سال ۲۰۲۶',
          description:
            'بررسی فرصت‌های تحصیلی، بورسیه‌های تحصیلی فول‌فاند، شرایط پذیرش مقاطع کارشناسی و ارشد و آینده اقامتی نخبگان توسط دپارتمان آکادمیک هلدینگ دیاکو.',
          image: [
            'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
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
        },
      ],
    },
  });

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+43 688 976 3256');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const COUNTRIES = [
    {
      country: 'اتریش (وین)',
      flag: '🇦🇹',
      badge: 'پایگاه مستقیم وکلای دیاکو',
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
      tuition: 'تقریباً رایگان (حدود ۷۵۰ یورو در هر ترم)',
      langReq: 'آلمانی (امکان شرکت در دوره زبان دانشگاهی در وین)',
      livingCost: 'حدود ۹۰۰ الی ۱۱۰۰ یورو در ماه',
      studentWork: '۲۰ ساعت در هفته قانونی',
      postGradStay: '۱۲ ماه مهلت جستجوی کار + تبدیل به RWR Card',
      topUnis: 'دانشگاه وین (Uni Wien)، دانشگاه فنی وین (TU Wien)، دانشگاه پزشکی وین (MedUni)',
    },
    {
      country: 'آلمان',
      flag: '🇩🇪',
      badge: 'بزرگ‌ترین بازار کار صنعتی',
      badgeColor: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30',
      tuition: 'رایگان در اکثر ایالت‌ها (فقط هزینه ترم ۲۵۰-۳۵۰ یورو)',
      langReq: 'آلمانی B2 یا انگلیسی آیلتس ۶.۵ برای مقطع ارشد',
      livingCost: 'حدود ۹۵۰ الی ۱۱۵۰ یورو در ماه (حساب بلاک‌شده ۱۱,۹۰۴€)',
      studentWork: '۱۴۰ روز کامل یا ۲۸۰ نیم‌روز در سال',
      postGradStay: '۱۸ ماه مهلت کاریابی + تبدیل مستقیم به بلوکارت',
      topUnis: 'دانشگاه فنی مونیخ (TUM)، لودویگ ماکسیمیلیان، هایدلبرگ',
    },
    {
      country: 'ایتالیا',
      flag: '🇮🇹',
      badge: 'بالاترین شانس بورسیه استانی DSU',
      badgeColor: 'bg-sky-400/20 text-sky-300 border-sky-400/30',
      tuition: 'رایگان با بورسیه DSU + دریافت کمک‌هزینه تا ۸۰۰۰€',
      langReq: 'انگلیسی (آیلتس ۶.۰) یا ایتالیایی B2',
      livingCost: 'حدود ۷۰۰ الی ۹۵۰ یورو در ماه (پوشش کامل با بورسیه)',
      studentWork: '۲۰ ساعت در هفته پاره‌وقت',
      postGradStay: '۱۲ ماه مهلت ثبت قرارداد کاری',
      topUnis: 'پلی‌تکنیک میلان، دانشگاه ساپینزا رم، دانشگاه بولونیا',
    },
    {
      country: 'اسپانیا',
      flag: '🇪🇸',
      badge: 'کمترین هزینه و آب‌وهوای مدیترانه‌ای',
      badgeColor: 'bg-purple-400/20 text-purple-300 border-purple-400/30',
      tuition: 'بسیار مناسب (۱۰۰۰ الی ۳۰۰۰ یورو در سال)',
      langReq: 'اسپانیایی یا انگلیسی در رشته‌های بین‌المللی',
      livingCost: 'حدود ۷۵۰ الی ۹۵۰ یورو در ماه',
      studentWork: 'تا ۳۰ ساعت در هفته با قانون جدید دانشجویی',
      postGradStay: 'امکان تمدید اقامت و تبدیل به اقامت کاری و خودحمایتی',
      topUnis: 'دانشگاه بارسلونا (UB)، دانشگاه خودگردان مادرید (UAM)',
    },
    {
      country: 'هلند',
      flag: '🇳🇱',
      badge: 'برترین مقاصد تماماً انگلیسی‌زبان',
      badgeColor: 'bg-rose-400/20 text-rose-300 border-rose-400/30',
      tuition: 'حدود ۸۰۰۰ الی ۱۵۰۰۰ یورو در سال (دانشجویان غیر EU)',
      langReq: 'تسلط کامل به انگلیسی (آیلتس ۶.۵ به بالا)',
      livingCost: 'حدود ۱۲۰۰ الی ۱۵۰۰ یورو در ماه',
      studentWork: '۱۶ ساعت در هفته با مجوز کارفرما',
      postGradStay: 'ویزای جستجوی کار ۱ ساله (Orientation Year / Zoekjaar)',
      topUnis: 'دانشگاه آمستردام (UvA)، دانشگاه دلفت (TU Delft)',
    },
  ];

  const FAQS = [
    {
      q: 'آیا بدون مدرک زبان می‌توان پذیرش تحصیلی دانشگاه‌های اتریش را دریافت کرد؟',
      a: 'بله! یکی از بزرگ‌ترین مزیت‌های اتریش این است که پس از اخذ پذیرش مشروط از دانشگاه‌های وین، شما ویزای تحصیلی دریافت کرده و دوره‌های آمادگی زبان آلمانی را در خود کالج‌های دانشگاهی وین سپری می‌کنید.',
    },
    {
      q: 'بورسیه استانی DSU ایتالیا به چه کسانی تعلق می‌گیرد؟',
      a: 'بورسیه DSU بر اساس وضعیت درآمد خانواده در کشور مبدا (سنجش فرم عدد ایزه ISEE Parificato) به اکثر دانشجویان ایرانی تعلق می‌گیرد و شامل معافیت ۱۰۰٪ از شهریه، خوابگاه رایگان، غذای سلف و پرداخت نقدی سالانه تا ۸۰۰۰ یورو است.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#061a21] text-white pt-24 pb-16 font-sans" dir="rtl">
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
            <span>سامانه‌های هوشمند دیاکو</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">مقایسه‌گر تحصیل و دانشگاه‌های اروپا ۲۰۲۶</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-xs font-bold text-teal-300 mb-4">
            <GraduationCap className="h-4 w-4 text-teal-400" />
            سامانه تخصصی مقایسه دانشگاه‌ها، شهریه‌ها و بورسیه‌های تحصیلی اروپا
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            مقایسه‌گر هوشمند <span className="text-[#f5a623]">تحصیل در دانشگاه‌های اروپا</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-8">
            بررسی شهریه دانشگاه‌های دولتی، شانس دریافت بورسیه فول‌فاند DSU، امکان گذراندن دوره زبان در اتریش و فرصت‌های اقامت کاری پس از تحصیل.
          </p>
        </div>
      </section>

      {/* گرید مقایسه کشورها */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {COUNTRIES.map((c, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/15 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{c.flag}</span>
                    <h3 className="text-xl font-black text-white">{c.country}</h3>
                  </div>
                  <span className={`rounded-full border px-3 py-0.5 text-[10px] font-black ${c.badgeColor}`}>
                    {c.badge}
                  </span>
                </div>

                <div className="space-y-3 text-xs border-t border-white/10 pt-4">
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">میزان شهریه دانشگاه:</span>
                    <span className="font-bold text-emerald-400 text-right max-w-[60%]">{c.tuition}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">شرایط و مدرک زبان:</span>
                    <span className="font-bold text-white text-right max-w-[60%]">{c.langReq}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">میانگین هزینه زندگی ماهیانه:</span>
                    <span className="font-bold text-amber-300 text-right max-w-[60%]">{c.livingCost}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">حق کار دانشجویی:</span>
                    <span className="font-bold text-slate-200 text-right max-w-[60%]">{c.studentWork}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">اقامت کاری پس از تحصیل:</span>
                    <span className="font-bold text-sky-300 text-right max-w-[60%]">{c.postGradStay}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">دانشگاه‌های شاخص:</span>
                    <span className="font-bold text-slate-300 text-right max-w-[60%] leading-5">{c.topUnis}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="w-full rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] py-3 text-xs font-black text-[#082833] shadow-glow hover:scale-105 transition cursor-pointer"
                >
                  ارزیابی شانس اخذ پذیرش و ویزای تحصیلی {c.country}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              سوالات پرتکرار تحصیل در اروپا
            </h2>
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
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-amber-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
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

      {/* بنر پایانی */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl bg-gradient-to-l from-[#082833] via-[#0b3342] to-[#07242e] border border-teal-400/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            آماده شروع تحصیل در دانشگاه‌های برتر اروپا هستید؟
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-7 mb-8">
            دپارتمان تخصصی پذیرش تحصیلی دیاکو در وین، رم و تهران از مرحله انگیزه‌نامه و ترجمه مدارک تا اخذ ویزا و ثبت‌نام همراه شما خواهد بود.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-8 py-4 text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              شروع ارزیابی رایگان تحصیلی
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-6 py-4 text-xs font-bold text-white transition cursor-pointer"
            >
              بازگشت به پرتال اصلی دیاکو
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducationComparatorPage;
