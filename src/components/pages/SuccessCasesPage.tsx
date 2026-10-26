import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  UserCheck,
  Building2,
  FileCheck2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';
import VisaSuccessSection from '../VisaSuccessSection';
import type { PageType } from '../Header';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

export const SuccessCasesPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useSeo({
    title: 'گالری پرونده‌های موفق و ویزاهای صادره اروپا | هلدینگ بین‌المللی دیاکو',
    description:
      'مشاهده اسناد و تاییدیه‌های رسمی صدور ویزا و کارت‌های اقامت اتریش (NAG)، بلوکارت آلمان، گلدن ویزای یونان و اقامت تمکن مالی با نظارت وکلای پایه یک دیاکو در وین.',
    keywords: [
      'پرونده های موفق ویزای شنگن',
      'نمونه کارت اقامت اتریش MA35',
      'کارت بلوکارت آلمان صادر شده',
      'کارنامه قبولی ویزای دیاکو',
      'گلدن ویزای یونان نمونه پرونده',
      'وکیل مهاجرت وین دیاکو',
    ],
    canonical: '/success-cases',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'گالری پرونده‌های موفق و ویزاهای صادره هلدینگ مهاجرتی دیاکو',
      description: 'آرشیو مستند و تصویری پرونده‌های موفق اخذ اقامت در اتحادیه اروپا.',
      url: 'https://www.dia-co.ir/success-cases',
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
            <span className="text-amber-400 font-bold">پرونده‌های موفق و کارت‌های اقامت صادره</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4 backdrop-blur-sm">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>کارنامه درخشان و مستند بیش از ۲۰ سال فعالیت تخصصی در قلب اروپا</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              پرونده‌های موفق و روادیدهای صادره شنگن
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
              اسناد رسمی کارت‌های اقامت بیومتریک صادره از ادارات مهاجرت اتریش (MA35)، آلمان (BAMF)، یونان و اسپانیا؛ نمونه‌های زنده از اعتماد متقاضیان و پیگیری متعهدانه وکلای دیاکو.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>تمام تاییدیه‌ها مستقیماً توسط دادگستری‌های اروپایی صادر شده‌اند</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>حفظ کامل حریم خصوصی و محرمانگی مشخصات متقاضیان</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* بخش نمایش پرونده‌ها (VisaSuccessSection) */}
      <div className="bg-white py-12 text-slate-800">
        <VisaSuccessSection />
      </div>

      {/* مقاله تخصصی E-E-A-T و راز قبولی پرونده‌ها */}
      <section className="container mx-auto px-4 md:px-8 py-14">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <span className="text-xs font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full">
              تحلیل و درس‌آموخته‌های حقوقی
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white mt-3 mb-3">
              کالبدشکافی ۲،۰۰۰ پرونده موفق: چه عواملی منجر به قبولی قطعی ویزا می‌شود؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              بررسی تفاوت‌های یک پرونده بدون نقص با پرونده‌های پرریسک از دیدگاه آفیسر سفارت و قاضی اداره اقامت اروپا.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300">
            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-5 space-y-2">
              <div className="text-amber-400 font-bold text-base flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4" />
                <span>۱. اصالت و شفافیت اسناد مالی</span>
              </div>
              <p className="leading-relaxed">
                آفیسرهای کنسولگری اتریش و آلمان کوچک‌ترین تناقض در فیش‌های حقوقی یا گردش حساب را بررسی می‌کنند. در دیاکو، کلیه اسناد پیش از تحویل توسط حسابرس و وکیل ممیزی می‌شوند.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-5 space-y-2">
              <div className="text-emerald-400 font-bold text-base flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span>۲. مسکن رسمی و استاندارد شهرداری</span>
              </div>
              <p className="leading-relaxed">
                در برنامه‌هایی نظیر تمکن مالی اتریش (NAG §44)، متراژ اجاره‌نامه باید کاملاً با متراژ مجاز MA35 همخوانی داشته باشد و از ارائه پیش‌قراردادهای صوری اکیداً پرهیز شود.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-5 space-y-2">
              <div className="text-sky-400 font-bold text-base flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>۳. لایحه دفاعیه حقوقی وکیل (Begleitschreiben)</span>
              </div>
              <p className="leading-relaxed">
                یک نامه حقوقی رسمی به زبان آلمانی از سوی وکیل پایه یک عضو کانون وکلای وین که پرونده را تشریح کند، بیش از ۵۰٪ از ابهامات آفیسر را در همان روز اول برطرف می‌نماید.
              </p>
            </div>
          </div>

          {/* پرسش‌های متداول پرونده‌های موفق */}
          <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 sm:p-8">
            <h3 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>پرسش‌های متداول درباره اعتبار ویزاها و سوابق پرونده‌ها</span>
            </h3>

            <div className="space-y-3">
              {[
                {
                  q: 'آیا کارت اقامت صادرشده در اتریش یا آلمان در تمام اروپا معتبر است؟',
                  a: 'بله، کارت اقامت شنگن (Aufenthaltstitel) به شما و خانواده اجازه تردد آزادانه، بدون نیاز به ویزا در تمام ۲۷ کشور حوزه شنگن را می‌دهد.',
                },
                {
                  q: 'در صورت داشتن ریجکتی قبلی، آیا امکان اخذ ویزای مجدد وجود دارد؟',
                  a: 'بله، بیش از ۲۰۰ پرونده موفق دیاکو متعلق به متقاضیانی بوده است که پیش از مراجعه به ما از سفارتخانه‌ها ریجکت شده بودند و با تنظیم لایحه اعتراضی (Remonstration) و رفع نواقص موفق به دریافت ویزا شدند.',
                },
              ].map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-[#071f26]">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-right p-4 font-bold text-xs sm:text-sm text-white flex items-center justify-between cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <p className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-2">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessCasesPage;
