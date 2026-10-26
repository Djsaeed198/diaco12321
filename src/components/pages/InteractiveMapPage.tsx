import React, { useState } from 'react';
import {
  MapPin,
  Globe2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Building2,
  Users,
  Compass,
  Calendar,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';
import InteractiveCaseMap from '../InteractiveCaseMap';
import type { PageType } from '../Header';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

export const InteractiveMapPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
}) => {
  useSeo({
    title: 'نقشه تعاملی پرونده‌های موفق مهاجرت به اروپا | هلدینگ بین‌المللی دیاکو',
    description:
      'مشاهده پراکندگی جغرافیایی بیش از ۲۰۰۰ پرونده موفق اقامت اتریش، آلمان، یونان، اسپانیا و هلند؛ تایم‌لاین واقعی صدور ویزا و آمار قبولی سفارتخانه‌ها با نظارت وکلای دیاکو.',
    keywords: [
      'نقشه ویزاهای موفق اروپا دیاکو',
      'آمار قبولی ویزای اتریش',
      'پرونده‌های موفق بلوکارت آلمان',
      'گلدن ویزای یونان دیاکو',
      'مدت زمان صدور ویزای شنگن',
      'دفتر وین دیاکو',
    ],
    canonical: '/interactive-map',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'نقشه تعاملی و پراکندگی پرونده‌های موفق مهاجرتی دیاکو در اروپا',
      description: 'بانک تعاملی پرونده‌های اخذ اقامت در اتحادیه اروپا بر روی نقشه ماهواره‌ای.',
      url: 'https://www.dia-co.ir/interactive-map',
    },
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#071f26] text-slate-100 font-sans">
      {/* هدر بخش و معرفی */}
      <section className="relative overflow-hidden pt-28 pb-12 bg-gradient-to-b from-[#092e39] via-[#071f26] to-[#071f26] border-b border-white/10">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f5a623_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-amber-300 transition cursor-pointer"
            >
              صفحه اصلی
            </button>
            <span>/</span>
            <span className="text-amber-400 font-bold">نقشه تعاملی پرونده‌های اروپا</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>پایش شفاف و تعاملی بیش از ۲،۰۰۰ خانواده مستقرشده در قاره سبز</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              نقشه جغرافیایی پرونده‌ها و مقاصد موفق دیاکو
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
              با کلیک بر روی هر کشور یا شهر بر روی نقشه تعاملی زیر، آمار دقیق پرونده‌های مختومه، نرخ قبولی کنسولی، میانگین زمان رسیدگی در سفارت و مسیرهای اصلی مهاجرتی را مشاهده فرمایید.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>۹۴۰+ پرونده موفق در اتریش (رتبه ۱ ایران)</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>نرخ قبولی کل ۹۹.۱٪ در سفارتخانه‌های شنگن</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>دفاتر حضوری مستقیم در وین، آتن و تهران</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* کامپوننت نقشه تعاملی اصلی */}
      <div className="bg-[#07242e] py-6 border-b border-white/10">
        <InteractiveCaseMap
          onOpenAssessment={onOpenAssessment}
          onNavigateToPage={onNavigateToPage}
        />
      </div>

      {/* مقاله پرمحتوا و تحلیل آماری */}
      <section className="container mx-auto px-4 md:px-8 py-14">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <span className="text-xs font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full">
              تحلیل کارشناسی آمار مهاجرت
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white mt-3 mb-3">
              چرا وین و مونیخ محبوب‌ترین قطب‌های مهاجرتی ایرانیان هستند؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              بررسی روندهای آماری پرونده‌های موفق از سال ۲۰۱۶ تا ۲۰۲۶ و درس‌آموخته‌های مهم برای متقاضیان جدید.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🇦🇹</span>
                <span>تمرکز بالای اتریش: سهمیه تمکن مالی و مدارس دولتی</span>
              </h3>
              <p>
                بیش از ۴۷٪ از کل پرونده‌های موفق هلدینگ دیاکو در کشور اتریش و به ویژه ایالت‌های وین (Wien) و نیدراسترایش ثبت شده‌اند. دلیل اصلی این تقاضای فزاینده، برنامه استثنایی تمکن مالی (NAG §44) است که بدون الزام به خرید ملک‌های میلیاردی یا راه‌اندازی شرکت پرریسک، کارت اقامت شنگن را با دسترسی رایگان به برترین نظام آموزشی اروپا ارائه می‌دهد.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🇩🇪</span>
                <span>آلمان: شتاب بی‌سابقه بلوکارت و کادر درمان</span>
              </h3>
              <p>
                آلمان با ثبت ۴۸۰ پرونده موفق در دیاکو، جایگاه دوم را دارد. تقاضا در این کشور بیشتر در شهرهای فرانکفورت، مونیخ، برلین و اشتوتگارت برای مهندسان نرم‌افزار، الکترونیک و کادر پرستاری متمرکز بوده است. میانگین زمان رسیدگی به پرونده‌های بلوکارت دیاکو به کمتر از ۳ ماه کاهش یافته است.
              </p>
            </div>
          </div>

          {/* CTA نهایی */}
          <div className="rounded-3xl bg-gradient-to-r from-[#092e39] via-[#0c3c4b] to-[#092e39] border border-amber-400/30 p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-lg font-black text-white mb-2">
              پرونده شما کجای این نقشه قرار خواهد گرفت؟
            </h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              با تکمیل ارزیابی آنلاین، شانس قبولی خود را برای مقصد دلخواهتان در اتریش، آلمان یا سایر کشورهای شنگن بسنجید.
            </p>
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071f26] px-6 py-2.5 text-xs font-black shadow-lg transition hover:scale-105 cursor-pointer"
            >
              ارزیابی آنلاین شانس پرونده من ←
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InteractiveMapPage;
