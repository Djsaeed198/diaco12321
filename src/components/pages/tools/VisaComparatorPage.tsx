import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Globe2,
  Calendar,
  Layers,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const VisaComparatorPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useSeo({
    title: 'مقایسه‌گر انواع ویزا و کارت‌های اقامت شینگن ۲۰۲۶ | ویزای D یا C؟',
    description:
      'مقایسه حقوقی انواع ویزای شینگن و اقامت‌های اروپایی؛ تفاوت ویزای تایپ D ملی با ویزای تایپ C توریستی، کارت‌های اقامت موقت Aufenthaltsbewilligung و اقامت دائم با تحلیل وکلای دیاکو.',
    canonical: '/guides/visa-comparator',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'مقایسه ویزای تایپ D و C شینگن',
      'تفاوت ویزا با کارت اقامت',
      'انواع ویزای شینگن ۲۰۲۶',
      'اقامت موقت و دائم اتریش آلمان',
      'مقایسه گر ویزا دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/visa-comparator#article',
          headline: 'راهنمای جامع مقایسه انواع ویزاها و مجوزهای اقامتی اروپا در سال ۲۰۲۶',
          description:
            'بررسی ابعاد قانونی ویزای ملی تایپ D، ویزای توریستی تایپ C، کارت‌های اقامت هوشمند و شرایط تبدیل آنها به شهروندی دائم.',
          image: [
            'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
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

  const VISA_TYPES = [
    {
      title: 'ویزای تایپ D ملی (National Visum D)',
      badge: 'دروازه ورود به اقامت بلندمدت',
      badgeColor: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30',
      validity: '۳ الی ۶ ماه (قابل تمدید به کارت اقامت)',
      scope: 'اقامت در کشور صادرکننده + تردد آزاد ۹۰ روزه در سایر ۲۸ کشور شینگن',
      workRight: 'بسته به هدف ویزا (کاری، تحصیلی، تمکن مالی)',
      familyAcc: 'امکان صدور همزمان برای همسر و فرزندان',
      conversion: 'تبدیل مستقیم به کارت اقامت هوشمند (Residence Permit)',
    },
    {
      title: 'کارت اقامت هوشمند (Aufenthaltstitel / TIE)',
      badge: 'اصلی‌ترین مدرک شناسایی اقامتی',
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
      validity: '۱ الی ۲ سال در هر نوبت تمدید',
      scope: 'زندگی دائم در کشور مقصد و تردد نامحدود در کل شینگن',
      workRight: 'کامل (یا بدون کار در خودحمایتی)',
      familyAcc: 'الحاق کامل خانواده با کارت‌های هم‌سطح',
      conversion: 'مسیر ۵ ساله تا اقامت دائم مادام‌العمر',
    },
    {
      title: 'ویزای تایپ C شینگن (Uniform Schengen Visa)',
      badge: 'کوتاه‌مدت گردشگری و بیزینس',
      badgeColor: 'bg-sky-400/20 text-sky-300 border-sky-400/30',
      validity: 'حداکثر ۹۰ روز در هر بازه ۱۸۰ روزه',
      scope: 'گردشگری، بازدید تجاری، درمان پزشکی یا جلسات در حوزه شینگن',
      workRight: 'ممنوع! هرگونه کار استخدامی تخلف است',
      familyAcc: 'نیازمند پرونده‌های توریستی مجزا برای هر نفر',
      conversion: 'غیرقابل تبدیل به اقامت در داخل خاک اروپا',
    },
    {
      title: 'اقامت دائم اتحادیه اروپا (Daueraufenthalt-EU)',
      badge: 'عالی‌ترین سطح اقامت پیش از پاسپورت',
      badgeColor: 'bg-purple-400/20 text-purple-300 border-purple-400/30',
      validity: '۵ ساله با تمدید خودکار اداری',
      scope: 'حق سکونت و کار آزاد در سراسر کشورهای عضو اتحادیه اروپا',
      workRight: 'کاملاً نامحدود و مشابه شهروندان اروپایی',
      familyAcc: 'اقامت مستقل و دائمی برای تمام اعضای خانواده',
      conversion: 'درخواست تابعیت و پاسپورت رسمی کشور مقصد',
    },
  ];

  const FAQS = [
    {
      q: 'آیا با ویزای توریستی تایپ C می‌توان در خاک اروپا اقامت کاری گرفت؟',
      a: 'خیر، بر اساس قوانین شینگن، تبدیل ویزای توریستی C به اقامت کاری در خاک اروپا مجاز نیست و متقاضی باید به کشور مبدا بازگشته و از طریق ویزای تایپ D و تاییدیه اداره کار وارد شود (به جز استثنائات استارت‌آپ اسپانیا).',
    },
    {
      q: 'تفاوت ویزای تایپ D با کارت اقامت چیست؟',
      a: 'ویزای تایپ D یک برچسب چسبانده‌شده در پاسپورت است که تنها به منظور ورود اولیه شما صادر می‌شود. پس از ورود به کشور مقصد و ثبت آدرس شهرداری، کارت هوشمند پلاستیکی بیومتریک اقامت صادر می‌گردد.',
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
            <span className="text-amber-300 font-bold">مقایسه‌گر انواع ویزا و اقامت اروپا</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
            <Layers className="h-4 w-4 text-amber-400" />
            مرجع حقوقی تفاوت انواع ویزاها و عناوین اقامتی شینگن
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            مقایسه‌گر انواع <span className="text-[#f5a623]">ویزا و کارت‌های اقامت</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-8">
            درک تفاوت‌های ویزای ملی D، ویزای کوتاه‌مدت C و کارت‌های اقامت موقت و دائم برای انتخابی مطمئن و قانونی.
          </p>
        </div>
      </section>

      {/* شبکه کارت‌های مقایسه ویزا */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VISA_TYPES.map((v, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/15 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between"
            >
              <div>
                <span className={`inline-block rounded-full border px-3 py-0.5 text-[10px] font-black mb-3 ${v.badgeColor}`}>
                  {v.badge}
                </span>
                <h3 className="text-xl font-black text-white mb-4">{v.title}</h3>

                <div className="space-y-3 text-xs border-t border-white/10 pt-4">
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">مدت اعتبار:</span>
                    <span className="font-bold text-white text-right max-w-[60%]">{v.validity}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">حوزه تردد جغرافیایی:</span>
                    <span className="font-bold text-slate-200 text-right max-w-[60%]">{v.scope}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">حق کار و اشتغال:</span>
                    <span className="font-bold text-amber-300 text-right max-w-[60%]">{v.workRight}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">پیوست اعضای خانواده:</span>
                    <span className="font-bold text-emerald-300 text-right max-w-[60%]">{v.familyAcc}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-slate-400">قابلیت تبدیل:</span>
                    <span className="font-bold text-white text-right max-w-[60%]">{v.conversion}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="w-full rounded-2xl bg-white/10 hover:bg-[#f5a623] hover:text-[#082833] py-3 text-xs font-black text-white transition cursor-pointer"
                >
                  ارزیابی شرایط برای این نوع ویزا ↗
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
              پرسش‌های متداول انواع ویزا
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
        <div className="rounded-3xl bg-gradient-to-l from-[#082833] via-[#0b3342] to-[#07242e] border border-amber-400/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            بهترین نوع ویزا متناسب با هدف شما چیست؟
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-7 mb-8">
            وکلای رسمی دیاکو در اتریش، یونان و آلمان مناسب‌ترین مسیر اقامتی بدون ریسک را برای شما ترسیم می‌نمایند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-8 py-4 text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              شروع ارزیابی هوشمند ویزا
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

export default VisaComparatorPage;
