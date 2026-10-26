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
  Home,
  ShieldCheck,
  Building2,
  Scale,
  Award,
  Euro,
  FileCheck2,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const RealEstateSlovakiaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'خرید ملک در اسلوواکی ۲۰۲۶ | سرمایه‌گذاری ملکی در براتیسلاوا و اقامت اروپا',
    description:
      'راهنمای حقوقی خرید ملک در اسلوواکی ۲۰۲۶؛ تملک ۱۰۰٪ مسکونی و تجاری در براتیسلاوا (در فاصله ۵۰ کیلومتری وین)، بازدهی اجاره‌ای پایدار، ثبت کاداستر (Kataster) و اخذ اقامت تجاری با دیاکو.',
    canonical: '/guides/realestate-slovakia',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'خرید ملک در اسلوواکی ۲۰۲۶',
      'سرمایه گذاری ملکی براتیسلاوا',
      'خرید آپارتمان در اسلواکی',
      'ثبت کاداستر Kataster اسلواکی',
      'اقامت اسلوواکی با سرمایه گذاری',
      'بازدهی اجاره ملک در اروپا',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/realestate-slovakia#article',
          headline: 'راهنمای جامع خرید ملک و سرمایه‌گذاری املاک در اسلوواکی ۲۰۲۶',
          description:
            'بررسی بازار پویای املاک براتیسلاوا در همسایگی وین، قوانین تملک قطعی برای خریداران بین‌المللی، فرآیند محضر اسناد رسمی و ثبت در دفتر کاداستر اسلوواکی (Kataster nehnuteľností).',
          image: [
            'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=80',
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
            بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span>
            <span>/</span>
            <span>خرید ملک و ویزای طلایی</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">خرید ملک در اسلوواکی</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold text-sky-300 mb-4">
              <Home className="h-4 w-4 text-sky-400" />
              Kataster Portal — سرمایه‌گذاری ملکی استراتژیک در اسلوواکی ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              خرید ملک در اسلوواکی ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-sky-400">
                (براتیسلاوا و حومه وین)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              براتیسلاوا پایتخت اسلوواکی تنها ۵۵ کیلومتر با وین اتریش فاصله دارد و به عنوان نزدیک‌ترین دو پایتخت در
              اروپا، دارای یک اکوسیستم اقتصادی درهم‌تنیده است. با توجه به قیمت بسیار مناسب‌تر املاک در براتیسلاوا نسبت به
              وین و بازدهی اجاره‌ای بالای ۵ تا ۷ درصد، سرمایه‌گذاری ملکی در این کشور فرصتی بی‌نظیر برای حفظ ارزش دارایی
              یورویی و تثبیت پرونده‌های اقامت تجاری است.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۵۰ ک‌م تا وین</div>
                <div className="text-[11px] text-slate-300 mt-1">موقعیت استراتژیک اروپای مرکزی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-sky-300">بازدهی ۵ تا ۷٪</div>
                <div className="text-[11px] text-slate-300 mt-1">نرخ بازگشت اجاره بالا در سال</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">مالکیت ۱۰۰٪</div>
                <div className="text-[11px] text-slate-300 mt-1">بدون محدودیت برای خریدار ایرانی</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                بررسی پروژه‌های ملکی براتیسلاوا
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره مستقیم با وکلای دیاکو
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1000&q=80"
                alt="اسلوواکی براتیسلاوا خرید ملک"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
                  <Building2 className="h-4 w-4" />
                  سامانه کاداستر اسلوواکی (Kataster Nehnuteľností)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  صدور برگه رسمی مالکیت (List Vlastníctva)، عقد قرارداد در حضور نوتار و تسویه در حساب بانکی معتمد
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول خرید ملک در اسلوواکی
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'آیا خرید ملک در اسلوواکی برای شهروندان ایرانی قانونی است؟',
              a: 'بله. خریداران خارجی بدون نیاز به اقامت یا ثبت شرکت می‌توانند املاک مسکونی یا تجاری را در اسلوواکی به نام شخصی خود خریداری و در اداره کاداستر ثبت رسمی نمایند.',
            },
            {
              q: 'آیا خرید ملک به اخذ اقامت اسلوواکی کمک می‌کند؟',
              a: 'خرید ملک مسکونی به همراه ثبت شرکت تجاری (S.R.O) در اسلوواکی، یکی از معتبرترین و کم‌هزینه‌ترین مسیرهای اخذ کارت اقامت شینگن با مالیات پایین در اروپای مرکزی است.',
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold text-white hover:text-amber-300 transition cursor-pointer"
              >
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 ${openFaq === idx ? 'rotate-180 text-amber-400' : ''}`} />
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
    </div>
  );
};

export default RealEstateSlovakiaPage;
