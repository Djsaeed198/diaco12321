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

export const RealEstateHungaryPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'گلدن ویزای مجارستان ۲۰۲۶ | اقامت ۱۰ ساله سرمایه‌گذاری ملکی (Guest Investor)',
    description:
      'راهنمای رسمی برنامه جدید گلدن ویزای مجارستان ۲۰۲۶ (Guest Investor Program)؛ خرید ملک مسکونی ۵۰۰,۰۰۰ یورو یا صندوق املاک ۲۵۰,۰۰۰ یورو، اخذ کارت اقامت ۱۰ ساله شینگن برای خانواده با دیاکو.',
    canonical: '/guides/realestate-hungary',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'گلدن ویزای مجارستان ۲۰۲۶',
      'Hungary Golden Visa',
      'Guest Investor مجارستان',
      'خرید ملک ۵۰۰ هزار یورویی بوداپست',
      'صندوق املاک ۲۵۰ هزار یورویی مجارستان',
      'اقامت ۱۰ ساله شینگن',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/realestate-hungary#article',
          headline: 'راهنمای جامع برنامه جدید گلدن ویزای مجارستان ۲۰۲۶ (Guest Investor Program)',
          description:
            'بررسی قانون مهاجرت جدید مجارستان، کارت اقامت ۱۰ ساله قابل تمدید برای ۱۰ سال دیگر، گزینه‌های سرمایه‌گذاری صندوق املاک ۲۵۰,۰۰۰ یورو و ملک مسکونی ۵۰۰,۰۰۰ یورو در بوداپست.',
          image: [
            'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
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
            <span className="text-amber-300 font-bold">خرید ملک و گلدن ویزای مجارستان</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <Home className="h-4 w-4 text-amber-400" />
              قانون جدید گلدن ویزای اروپا ۲۰۲۶ — Guest Investor Hungary
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              گلدن ویزای مجارستان ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-yellow-500">
                (اقامت ۱۰ ساله شینگن)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              مجارستان جذاب‌ترین و طولانی‌ترین برنامه ویزای طلایی اتحادیه اروپا را تحت عنوان «سرمایه‌گذار مهمان» (Guest
              Investor Program) راه‌اندازی کرده است. در این برنامه متقاضیان می‌توانند با خرید ملک مسکونی به ارزش ۵۰۰,۰۰۰
              یورو یا خرید اوراق صندوق سرمایه‌گذاری املاک تاییدشده دولتی به ارزش ۲۵۰,۰۰۰ یورو، مستقیماً کارت اقامت
              ۱۰ ساله با حق تردد آزاد در شینگن برای خود و خانواده دریافت نمایند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۱۰ سال اقامت</div>
                <div className="text-[11px] text-slate-300 mt-1">طولانی‌ترین کارت اقامت اروپا</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-yellow-400">۲۵۰ یا ۵۰۰ هزار €</div>
                <div className="text-[11px] text-slate-300 mt-1">گزینه صندوق یا ملک مسکونی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">بدون شرط حضور</div>
                <div className="text-[11px] text-slate-300 mt-1">آزادی کامل تردد در شینگن</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                بررسی پلن‌های گلدن ویزای مجارستان
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
                src="https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1000&q=80"
                alt="مجارستان بوداپست گلدن ویزا"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Building2 className="h-4 w-4" />
                  اداره کل مهاجرت مجارستان (OIF)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  صدور اولیه ویزای سرمایه‌گذار ۲ ساله جهت ورود و ثبت سرمایه‌گذاری، و سپس صدور کارت اقامت ۱۰ ساله شینگن
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول گلدن ویزای مجارستان
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'مزیت کارت ۱۰ ساله مجارستان نسبت به گلدن ویزای سایر کشورها چیست؟',
              a: 'در حالی که گلدن ویزای اسپانیا لغو شده و یونان حداقل‌ها را تا ۸۰۰ هزار یورو افزایش داده، مجارستان کارت ۱۰ ساله قابل تمدید با مبالغ مناسب و بدون هیچ‌گونه الزام به اقامت فیزیکی سالانه ارائه می‌دهد.',
            },
            {
              q: 'آیا اعضای خانواده نیز کارت اقامت ۱۰ ساله دریافت می‌کنند؟',
              a: 'بله. همسر قانونی متقاضی و فرزندان زیر ۱۸ سال (و فرزندان وابسته مجرد) مشمول کارت اقامت ۱۰ ساله با کلیه حقوق اقامتی و تردد در شینگن می‌شوند.',
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

export default RealEstateHungaryPage;
