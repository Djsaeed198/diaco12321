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

export const RealEstateTurkeyPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'خرید ملک در ترکیه ۲۰۲۶ | اخذ شهروندی و پاسپورت با ملک ۴۰۰,۰۰۰ دلاری',
    description:
      'راهنمای کامل خرید ملک در ترکیه ۲۰۲۶؛ شرایط سند تاپو (Tapu)، قید ۳ سال عدم فروش، گزارش رسمی ارزیابی کارشناسی SPK، افتتاح حساب بانکی و صدور پاسپورت ترکیه برای کل خانواده با دیاکو.',
    canonical: '/guides/realestate-turkey',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'خرید ملک در ترکیه ۲۰۲۶',
      'شهروندی ترکیه با ملک ۴۰۰ هزار دلار',
      'سند تاپو ترکیه',
      'گزارش کارشناسی SPK ترکیه',
      'خرید آپارتمان در استانبول',
      'پاسپورت ترکیه برای خانواده',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/realestate-turkey#article',
          headline: 'راهنمای جامع خرید ملک در ترکیه و اخذ شهروندی ۲۰۲۶',
          description:
            'بررسی قانون شهروندی ترکیه، حداقل مبلغ سرمایه‌گذاری ۴۰۰,۰۰۰ دلار، گواهی خرید ارز (DÖVİZ ALIM BELGESİ)، هزینه‌های ثبت تاپو و جدول زمانی ۳ تا ۶ ماهه صدور پاسپورت.',
          image: [
            'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
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
            <span className="text-amber-300 font-bold">خرید ملک در ترکیه</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-300 mb-4">
              <Home className="h-4 w-4 text-red-400" />
              Tapu & Citizenship — شهروندی مستقیم ترکیه ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              خرید ملک در ترکیه ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-red-400">
                (اخذ پاسپورت ترکیه)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              ترکیه با موقعیت استراتژیک در مجاورت ایران، یکی از محبوب‌ترین مقاصد سرمایه‌گذاری برای خانواده‌های ایرانی
              است. طبق قانون سرمایه‌گذاری ترکیه، با خرید یک یا چند ملک مسکونی به ارزش مجموع حداقل ۴۰۰,۰۰۰ دلار آمریکا
              و درج قید عدم فروش ۳ ساله بر روی سند رسمی (تاپو)، متقاضی اصلی، همسر و کلیه فرزندان زیر ۱۸ سال در مدت ۳
              الی ۶ ماه پاسپورت و شناسنامه ترکیه‌ای دریافت می‌کنند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۴۰۰,۰۰۰ $</div>
                <div className="text-[11px] text-slate-300 mt-1">حداقل سرمایه جهت شهروندی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-red-400">۳ سال قید فروش</div>
                <div className="text-[11px] text-slate-300 mt-1">حفظ ملک با امکان اجاره‌دهی دلاری</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">۳ الی ۶ ماه</div>
                <div className="text-[11px] text-slate-300 mt-1">صدور پاسپورت برای کل خانواده</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                مشاوره خرید پروژه‌های معتبر استانبول
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
                src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80"
                alt="ترکیه استانبول خرید ملک"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                  <Building2 className="h-4 w-4" />
                  اداره کل اسناد و املاک ترکیه (Tapu ve Kadastro)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  اخذ گزارش اکسپرتیز رسمی SPK، برگه تبدیل ارزی DAB از بانک مرکزی ترکیه و ثبت سند بدون نیاز به حضور طولانی‌مدت
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول خرید ملک و پاسپورت ترکیه
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'آیا می‌توان ۴۰۰ هزار دلار را با خرید چند واحد ملک تقسیم کرد؟',
              a: 'بله، متقاضی می‌تواند به جای یک ملک، دو یا چند واحد آپارتمان خریداری کند مشروط بر اینکه مجموع ارزش ارزیابی رسمی آن‌ها به حدنصاب ۴۰۰,۰۰۰ دلار برسد و سندها به صورت همزمان ثبت شوند.',
            },
            {
              q: 'پس از پایان دوره ۳ ساله قید فروش چه اتفاقی برای پاسپورت می‌افتد؟',
              a: 'شهروندی و پاسپورت ترکیه دائمی و مادام‌العمر است و پس از اتمام ۳ سال، می‌توانید ملک خود را به ارزش روز به فروش رسانده یا اجاره دهید بدون اینکه هیچ آسیبی به تابعیت شما و خانواده‌تان وارد شود.',
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

export default RealEstateTurkeyPage;
