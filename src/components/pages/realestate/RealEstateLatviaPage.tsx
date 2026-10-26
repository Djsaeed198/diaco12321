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

export const RealEstateLatviaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'خرید ملک در لتونی ۲۰۲۶ | گلدن ویزای ۲۵۰,۰۰۰ یورویی حوزه بالتیک و شینگن',
    description:
      'راهنمای کامل خرید ملک و اقامت لتونی ۲۰۲۶ طبق قانون مهاجرت لتونی (Immigration Law)؛ خرید ملک مسکونی ۲۵۰,۰۰۰ یورو در ریگا یا یورمالا، ۵٪ عوارض دولتی، اقامت ۵ ساله شینگن برای خانواده با دیاکو.',
    canonical: '/guides/realestate-latvia',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1548705085-101173833344?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'خرید ملک در لتونی ۲۰۲۶',
      'گلدن ویزای لتونی',
      'Latvia Real Estate Golden Visa',
      'خرید آپارتمان در ریگا',
      'اقامت ۵ ساله شینگن لتونی',
      'سرمایه گذاری ملکی ۲۵۰ هزار یورویی',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/realestate-latvia#article',
          headline: 'راهنمای جامع خرید ملک و اخذ اقامت شینگن در لتونی ۲۰۲۶',
          description:
            'تحلیل قانون سرمایه‌گذاری ملکی لتونی (Section 23 of Immigration Law)، شروط ارزش کاداستر، هزینه ۵٪ عوارض خزانه دولت لتونی، و همراهی همسر و فرزندان زیر ۱۸ سال.',
          image: [
            'https://images.unsplash.com/photo-1548705085-101173833344?auto=format&fit=crop&w=1200&q=80',
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
            <span className="text-amber-300 font-bold">خرید ملک در لتونی</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-xs font-bold text-teal-300 mb-4">
              <Home className="h-4 w-4 text-teal-400" />
              Latvia Immigration Law — اقامت ۵ ساله سرمایه‌گذاری حوزه بالتیک ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              خرید ملک در لتونی ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-teal-400">
                (ریگا و یورمالا)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              لتونی یکی از آرام‌ترین و سرسبزترین کشورهای اتحادیه اروپا در حوزه بالتیک است. پایتخت تاریخی ریگا و سواحل
              معروف یورمالا گزینه‌هایی ایده‌آل برای خریداران بین‌المللی هستند. بر اساس ماده ۲۳ قانون مهاجرت لتونی، با
              خرید ملک مسکونی به ارزش حداقل ۲۵۰,۰۰۰ یورو و پرداخت عوارض دولتی ۵ درصدی، متقاضی و اعضای خانواده وی کارت
              اقامت ۵ ساله شینگن با حق تمدید دریافت می‌نمایند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۲۵۰,۰۰۰ €</div>
                <div className="text-[11px] text-slate-300 mt-1">حداقل بهای ملک خریداری‌شده</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-teal-300">کارت ۵ ساله</div>
                <div className="text-[11px] text-slate-300 mt-1">اقامت رسمی در اتحادیه اروپا</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">بدون شرط اقامت دائم</div>
                <div className="text-[11px] text-slate-300 mt-1">تردد آزادانه در کل شینگن</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                بررسی پرونده ملکی لتونی
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
              <OptimizedImage loading="eager" fetchPriority="high"
                src="https://images.unsplash.com/photo-1548705085-101173833344?auto=format&fit=crop&w=1000&q=80"
                alt="لتونی ریگا خرید ملک"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
                  <Building2 className="h-4 w-4" />
                  اداره امور شهروندی و مهاجرت لتونی (PMLP)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  ثبت ملک در کتاب زمین (Land Register)، پرداخت عوارض دولتی و صدور کارت اقامت بیومتریک شینگن
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول خرید ملک در لتونی
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'آیا ملک خریداری‌شده در لتونی باید دارای حداقل ارزش ارزیابی کاداستر باشد؟',
              a: 'بله. علاوه بر قیمت واقعی خرید ۲۵۰,۰۰۰ یورو، ارزش کاداستر (Cadastral Value) ملک در ریگا باید دست‌کم ۸۰,۰۰۰ یورو باشد؛ در صورتی که کمتر باشد، ارزیابی کارشناس مستقل معتبر ملاک عمل خواهد بود.',
            },
            {
              q: 'تمدید سالانه کارت ۵ ساله لتونی چگونه انجام می‌شود؟',
              a: 'کارت اقامت برای دوره ۵ ساله صادر می‌شود ولی هر سال باید با اثبات حفظ مالکیت ملک و تمدید بیمه سلامت، برچسب تاییدیه سالانه آن در اداره PMLP تمدید گردد.',
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

export default RealEstateLatviaPage;
