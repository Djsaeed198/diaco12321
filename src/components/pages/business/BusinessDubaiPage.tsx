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
  Rocket,
  ShieldCheck,
  Building2,
  Landmark,
  BadgeDollarSign,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const BusinessDubaiPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  useSeo({
    title: 'ثبت شرکت و اقامت دبی ۲۰۲۶ | ویزای طلایی امارات',
    description:
      'راهنمای کامل ثبت شرکت در دبی ۲۰۲۶؛ مالکیت ۱۰۰٪ خارجی در مناطق آزاد Freezone و Mainland، افتتاح حساب شرکتی امارات و اقامت خانوادگی با دیاکو.',
    canonical: '/guides/company-dubai',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ثبت شرکت دبی ۲۰۲۶',
      'اقامت امارات با ثبت شرکت',
      'ویزای طلایی دبی',
      'افتتاح حساب شرکتی بنک دبی',
      'شرکت منطقه آزاد فری زون دبی',
      'ثبت شرکت مین لند دبی',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/company-dubai#article',
          headline: 'راهنمای جامع ثبت شرکت و اخذ اقامت دبی امارات ۲۰۲۶: لایسنس تجاری و افتتاح حساب',
          description:
            'بررسی انواع لایسنس‌های تجاری دبی (تجاری، خدماتی، صنعتی)، مقایسه مناطق آزاد Freezone با Mainland و مراحل اخذ کارت اقامت امارات آی‌دی (Emirates ID).',
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
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.dia-co.ir/logo.png',
            },
          },
          datePublished: '2026-01-01',
          dateModified: '2026-10-23',
          inLanguage: 'fa-IR',
        },
      ],
    },
  });

  const [companyType, setCompanyType] = useState<'freezone' | 'mainland'>('freezone');

  return (
    <div className="min-h-screen bg-[#061a21] text-slate-100" dir="rtl">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#082833] via-[#061a21] to-[#041217] pt-10 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
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
                مالکیت ۱۰۰٪ بدون نیاز به کفیل بومی
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl text-white">
                ثبت شرکت و اقامت امارات (دبی)؛ تجارت بین‌الملل با صفر درصد مالیات
              </h1>

              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-300 sm:text-base text-justify">
                دبی به عنوان پایتخت تجارت خاورمیانه، با ارائه معافیت‌های مالیاتی استثنایی، عدم نیاز به مالیات بر درآمد فردی و صدور اقامت ۲ تا ۱۰ ساله (Golden Visa)، مقصدی بی‌رقیب برای کارآفرینان و بازرگانان ایرانی است. کلیه امور اداری از صدور لایسنس تجاری تا تست پزشکی و صدور کارت Emirates ID با همراهی حضوری کارشناسان دیاکو در دبی انجام می‌پذیرد.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  محاسبه آنلاین هزینه لایسنس دبی
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
                <OptimizedImage
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

      {/* مقایسه مناطق ثبت شرکت */}
      <section className="py-14 bg-[#082029]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <h2 className="text-xl font-black text-white">انتخاب ساختار شرکت در امارات متحده عربی</h2>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setCompanyType('freezone')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  companyType === 'freezone' ? 'bg-amber-400 text-slate-900 font-black' : 'bg-white/5 text-slate-300'
                }`}
              >
                شرکت‌های منطقه آزاد (Freezone)
              </button>
              <button
                type="button"
                onClick={() => setCompanyType('mainland')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  companyType === 'mainland' ? 'bg-amber-400 text-slate-900 font-black' : 'bg-white/5 text-slate-300'
                }`}
              >
                شرکت‌های سرزمین اصلی (Mainland)
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
              {companyType === 'freezone' ? (
                <div>
                  <h3 className="font-bold text-amber-300 text-sm">مزایای شرکت‌های فری‌زون دبی (IFZA, Meydan, DED)</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    مالکیت ۱۰۰٪ صددرصد بدون نیاز به اسپانسر اماراتی، معافیت کامل از مالیات بر درآمد و عوارض گمرکی صادرات، صدور ویزای اقامت ۲ ساله قابل تمدید و فرایند ثبت سریع در کمتر از ۵ روز کاری.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-amber-300 text-sm">مزایای شرکت‌های مین‌لند دبی (Mainland)</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    امکان تجارت مستقیم در سراسر خاک امارات و اخذ قراردادهای دولتی، اجازه افتتاح دفتر کار فیزیکی در هر خیابان و محله دبی و امکان فعالیت در حوزه‌های بازرگانی محلی بدون واسطه.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessDubaiPage;
