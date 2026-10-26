import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Award,
  Euro,
  Clock,
  Building2,
  Users,
  Compass,
  Check,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const MethodComparatorPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'financial' | 'work' | 'fast' | 'family'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useSeo({
    title: 'مقایسه‌گر جامع روش‌های مهاجرت به اروپا ۲۰۲۶ | بلوکارت، تمکن مالی یا تحصیلی؟',
    description:
      'مقایسه دقیق مزایا، معایب، هزینه‌ها و شرط حضور روش‌های مهاجرتی اروپا در سال ۲۰۲۶؛ جدول ماتریسی مقایسه تمکن مالی، بلوکارت، کارت قرمز-سفید-قرمز، ویزای طلایی و ثبت شرکت با تحلیل وکلای دیاکو.',
    canonical: '/guides/method-comparator',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'مقایسه روش های مهاجرت به اروپا ۲۰۲۶',
      'بلوکارت یا تمکن مالی',
      'بهترین روش مهاجرت به اتریش',
      'مقایسه ویزای کار و ثبت شرکت',
      'سریع ترین راه اقامت شینگن',
      'مقایسه گر روش های مهاجرتی دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/method-comparator#article',
          headline: 'تحلیل ماتریسی و مقایسه جامع برترین مسیرهای اقامت اروپا در سال ۲۰۲۶',
          description:
            'بررسی ابعاد مالی، حقوقی و زمانی مسیرهای تمکن مالی، اقامت کاری نخبگان، تحصیل رایگان و گلدن ویزا به قلم کارشناسان ارشد هلدینگ مهاجرتی دیاکو.',
          image: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
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
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/method-comparator#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'بین تمکن مالی و بلوکارت کاری کدام روش مناسب‌تر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'اگر دارایی نقدی یا درآمد ماهیانه مستقل از کار در ایران دارید و قصد کار کردن اجباری برای کارفرمای اروپایی ندارید، تمکن مالی ایده‌آل است. اگر تخصص مهندسی یا IT با مدرک دانشگاهی دارید، بلوکارت به دلیل پوشش حقوق ماهانه و بیمه کارفرما کم‌هزینه‌ترین گزینه است.',
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

  const METHODS = [
    {
      id: 'financial',
      title: 'تمکن مالی (خودحمایتی)',
      badge: 'محبوب‌ترین برای خانواده‌ها',
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
      minBudget: '۲۵ الی ۳۰ هزار یورو در حساب شخصی',
      duration: '۳ الی ۶ ماه',
      workPermit: 'بدون اجازه کار استخدامی محلی (درآمد مستقل مجاز است)',
      spouseWork: 'بدون حق کار تا زمان اقامت دائم',
      physicalPresence: 'حداقل ۶ ماه در سال در خاک کشور مقصد',
      prTime: '۵ سال اقامت قانونی',
      countries: ['اتریش (وین)', 'اسپانیا', 'فرانسه', 'یونان'],
      suitableFor: 'پزشکان، مدیران، بازنشستگان و دارندگان املاک و سود سهام',
      tag: 'financial',
    },
    {
      id: 'bluecard',
      title: 'بلو کارت اتحادیه اروپا (EU Blue Card)',
      badge: 'کم‌هزینه‌ترین مسیر کاری',
      badgeColor: 'bg-sky-400/20 text-sky-300 border-sky-400/30',
      minBudget: '۳ الی ۵ هزار یورو (هزینه‌های اولیه ورود)',
      duration: '۲ الی ۴ ماه',
      workPermit: 'کامل با قرارداد کاری رسمی و حقوق مصوب',
      spouseWork: 'اجازه کار فوری و نامحدود در تمام مشاغل',
      physicalPresence: 'زندگی و اشتغال تمام‌وقت در کشور مقصد',
      prTime: '۲۱ تا ۳۳ ماه (با مدرک زبان آلمانی/محلی)',
      countries: ['آلمان', 'اتریش', 'اسپانیا', 'ایتالیا'],
      suitableFor: 'مهندسان، برنامه‌نویسان، کادر درمان و متخصصان دانشگاهی',
      tag: 'work',
    },
    {
      id: 'rwr',
      title: 'کارت قرمز-سفید-قرمز اتریش (RWR)',
      badge: 'برنامه رسمی اشتغال اتریش',
      badgeColor: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30',
      minBudget: '۵ الی ۸ هزار یورو',
      duration: '۳ الی ۵ ماه',
      workPermit: '۲ سال کار برای کارفرما، سپس تبدیل به RWR Plus آزاد',
      spouseWork: 'کارت RWR Plus با اجازه کار نامحدود',
      physicalPresence: 'حضور و فعالیت تمام‌وقت در اتریش',
      prTime: '۵ سال (تبدیل به Daueraufenthalt-EU)',
      countries: ['اتریش (دفتر وین دیاکو)'],
      suitableFor: 'مشاغل دارای کمبود (Mangelberufe) با حداقل ۵۵ امتیاز AMS',
      tag: 'work',
    },
    {
      id: 'golden',
      title: 'خرید ملک و گلدن ویزا',
      badge: 'بدون هیچ‌گونه شرط حضور فیزیکی',
      badgeColor: 'bg-purple-400/20 text-purple-300 border-purple-400/30',
      minBudget: '۲۵۰ الی ۵۰۰ هزار یورو ارزش سند رسمی ملک',
      duration: '۲ الی ۳ ماه (سریع‌ترین)',
      workPermit: 'حق افتتاح حساب و ثبت بیزینس',
      spouseWork: 'کارت اقامت کامل خانوادگی',
      physicalPresence: 'صفر روز! (بدون نیاز به یک روز ماندن در سال)',
      prTime: 'اقامت دائم ۵ ساله فوری',
      countries: ['یونان (دفتر آتن دیاکو)', 'مجارستان (۱۰ ساله)', 'اسپانیا'],
      suitableFor: 'سرمایه‌گذاران و افرادی که تعهدات شغلی در ایران دارند',
      tag: 'fast',
    },
    {
      id: 'study',
      title: 'پذیرش و اقامت تحصیلی',
      badge: 'بهترین مسیر ارزان نخبگان',
      badgeColor: 'bg-teal-400/20 text-teal-300 border-teal-400/30',
      minBudget: '۱۰ الی ۱۵ هزار یورو تمکن سالانه دانشجویی',
      duration: '۳ الی ۶ ماه',
      workPermit: '۲۰ ساعت در هفته کار دانشجویی پاره‌وقت',
      spouseWork: 'وابسته به قوانین کشور مقصد',
      physicalPresence: 'حضور در طول ترم‌های دانشگاهی',
      prTime: 'تبدیل به اقامت کاری پس از فراغت از تحصیل',
      countries: ['دانشگاه دولتی وین', 'دانشگاه‌های آلمان', 'ایتالیا (DSU)', 'اسپانیا'],
      suitableFor: 'جوانان و فارغ‌التحصیلان متقاضی مدارک معتبر بین‌المللی',
      tag: 'family',
    },
  ];

  const filteredMethods = METHODS.filter((m) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'financial') return m.tag === 'financial';
    if (selectedFilter === 'work') return m.tag === 'work';
    if (selectedFilter === 'fast') return m.tag === 'fast';
    if (selectedFilter === 'family') return m.tag === 'family' || m.tag === 'financial';
    return true;
  });

  const FAQS = [
    {
      q: 'کدام روش برای افرادی که نمی‌توانند ایران را برای مدت طولانی ترک کنند مناسب است؟',
      a: 'تنها روشی که هیچ‌گونه شرط حضور فیزیکی سالانه ندارد، «گلدن ویزای سرمایه‌گذاری ملکی» (به‌ویژه در یونان و مجارستان) است. در تمام روش‌های دیگر نظیر تمکن مالی یا اقامت کاری، متقاضی ملزم است حداقل ۶ ماه از سال در خاک کشور مقصد سکونت داشته باشد.',
    },
    {
      q: 'آیا امکان تغییر نوع اقامت از تحصیلی به کاری یا ثبت شرکت وجود دارد؟',
      a: 'بله، قوانین اتریش، آلمان و اسپانیا به فارغ‌التحصیلان مهلت ۱۲ تا ۱۸ ماهه برای جستجوی کار اعطا می‌کنند و متقاضی پس از انعقاد اولین قرارداد کاری مستقیماً اقامت تحصیلی خود را به کارت قرمز-سفید-قرمز یا بلوکارت تبدیل می‌کند.',
    },
    {
      q: 'وضعیت حقوقی همسر در کدام روش‌ها بهتر است؟',
      a: 'در ویزای بلوکارت اتحادیه اروپا و کارت قرمز-سفید-قرمز اتریش (RWR)، همسر متقاضی بدون نیاز به مدرک زبان آلمانی یا تاییدیه اداره کار، بلافاصله اجازه کار نامحدود و تمام‌وقت دریافت می‌کند.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#061a21] text-white pt-24 pb-16 font-sans" dir="rtl">
      {/* بردکرامب */}
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
            <span className="text-amber-300 font-bold">مقایسه‌گر روش‌های مهاجرتی اروپا ۲۰۲۶</span>
          </div>
        </div>
      </div>

      {/* هیرو */}
      <section className="container mx-auto px-4 md:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold text-sky-300 mb-4">
            <Scale className="h-4 w-4 text-sky-400" />
            سامانه ماتریسی مقایسه روش‌های مهاجرتی حوزه شینگن
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            مقایسه‌گر جامع <span className="text-[#f5a623]">روش‌های اقامتی اروپا</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-8">
            بررسی هوشمند فاکتورهای کلیدی: حداقل بودجه، اجازه کار همسر، شرط حضور فیزیکی سالانه و سرعت صدور ویزا در برترین کشورهای اروپایی.
          </p>
        </div>
      </section>

      {/* فیلترهای موضوعی مقایسه */}
      <section className="container mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'نمایش تمام روش‌ها' },
            { id: 'financial', label: 'روش‌های مبتنی بر سرمایه و تمکن' },
            { id: 'work', label: 'روش‌های مهارتی و اشتغال (بلوکارت / RWR)' },
            { id: 'fast', label: 'سریع‌ترین و بدون شرط حضور (گلدن ویزا)' },
            { id: 'family', label: 'بهترین‌ها برای فرزندان و خانواده' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFilter(f.id as any)}
              className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-[#f5a623] text-[#082833] shadow-glow'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* کارت‌های مقایسه تفصیلی */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMethods.map((m) => (
            <div
              key={m.id}
              className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 via-white/5 to-[#082833] p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between"
            >
              <div>
                <span className={`inline-block rounded-full border px-3 py-0.5 text-[10px] font-black mb-3 ${m.badgeColor}`}>
                  {m.badge}
                </span>
                <h3 className="text-xl font-black text-white mb-2">{m.title}</h3>
                <p className="text-xs text-amber-300/90 font-bold mb-4">
                  مناسب برای: {m.suitableFor}
                </p>

                <div className="space-y-2.5 text-xs border-t border-white/10 pt-4 mb-6">
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">حداقل نقدینگی/بودجه:</span>
                    <span className="font-bold text-white text-right max-w-[55%]">{m.minBudget}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">میانگین زمان صدور:</span>
                    <span className="font-bold text-emerald-400">{m.duration}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">اجازه کار متقاضی:</span>
                    <span className="font-bold text-slate-200 text-right max-w-[55%]">{m.workPermit}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">اجازه کار همسر:</span>
                    <span className="font-bold text-amber-300 text-right max-w-[55%]">{m.spouseWork}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">شرط حضور سالانه:</span>
                    <span className="font-bold text-white text-right max-w-[55%]">{m.physicalPresence}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">مسیر اقامت دائم:</span>
                    <span className="font-bold text-emerald-300">{m.prTime}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="border-t border-white/10 pt-4 mb-4">
                  <span className="text-[11px] text-slate-400 block mb-1">کشورهای برتر تحت پوشش دیاکو:</span>
                  <div className="flex flex-wrap gap-1">
                    {m.countries.map((c, i) => (
                      <span key={i} className="rounded-lg bg-white/10 px-2 py-0.5 text-[10px] text-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="w-full rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-4 py-3 text-xs font-black text-[#082833] shadow-glow hover:scale-105 transition cursor-pointer"
                >
                  ارزیابی شانس در روش {m.title}
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
            <span className="rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-bold text-amber-300">
              مشاوره مقایسه‌ای
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              سوالات پرتکرار انتخاب روش مهاجرتی
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
        <div className="rounded-3xl bg-gradient-to-l from-[#082833] via-[#0b3342] to-[#07242e] border border-sky-400/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            هنوز مردد هستید کدام روش برای شرایط شما بهترین است؟
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-7 mb-8">
            الگوریتم هوشمند سنجش امتیاز دیاکو، شرایط سنی، مالی، تحصیلی و خانوادگی شما را تحلیل کرده و بالاترین درصد قبولی را پیشنهاد می‌دهد.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-8 py-4 text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              شروع ارزیابی و انتخاب روش مناسب
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-6 py-4 text-xs font-bold text-white transition cursor-pointer"
            >
              بازگشت به پرتال اصلی
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MethodComparatorPage;
