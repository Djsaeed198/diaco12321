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

export const RealEstateGreecePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'گلدن ویزای یونان ۲۰۲۶ | اقامت ۵ ساله اروپا با خرید ملک ۲۵۰ تا ۸۰۰ هزار یورو',
    description:
      'راهنمای کامل خرید ملک و گلدن ویزای یونان ۲۰۲۶؛ قوانین جدید منطقه‌بندی (۲۵۰ هزار یورو در مناطق تبدیل تجاری به مسکونی، ۴۰۰ و ۸۰۰ هزار یورو در آتن و سالونیک)، اقامت دائم ۳ نسل خانواده با دفتر آتن دیاکو.',
    canonical: '/guides/realestate-greece',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'گلدن ویزای یونان ۲۰۲۶',
      'Greece Golden Visa',
      'خرید ملک ۲۵۰ هزار یورویی یونان',
      'خرید ملک ۸۰۰ هزار یورویی آتن',
      'دفتر آتن هلدینگ دیاکو',
      'اقامت ۳ نسل با خرید ملک یونان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/realestate-greece#article',
          headline: 'راهنمای جامع خرید ملک و گلدن ویزای یونان ۲۰۲۶: مبالغ جدید و فرصت‌های ۲۵۰ هزار یورویی',
          description:
            'بررسی قانون اصلاحات گلدن ویزای یونان، فرصت‌های ۲۵۰,۰۰۰ یورویی تبدیل صنعتی به مسکونی (Commercial Conversion)، مناطق ۴۰۰ هزار و ۸۰۰ هزار یورویی آتن و جزایر، اقامت ۵ ساله قابل تمدید با حضور دفتر گلیفادا دیاکو.',
          image: [
            'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
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
            <span className="text-amber-300 font-bold">اقامت یونان با خرید ملک</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-300 mb-4">
              <Home className="h-4 w-4 text-blue-400" />
              قوانین جدید گلدن ویزای یونان ۲۰۲۶ — دفتر رسمی آتن دیاکو
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              اقامت یونان با خرید ملک ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-blue-400">
                (Golden Visa Greece)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              یونان به عنوان بهشت مدیترانه، محبوب‌ترین مقصد گلدن ویزا برای خانواده‌های ایرانی است زیرا اقامت ۳ نسل
              (متقاضی، همسر، فرزندان تا ۲۱ سال و والدین متقاضی و همسر) را به صورت همزمان تامین می‌کند. با وجود اعمال
              سقف‌های جدید ۸۰۰ و ۴۰۰ هزار یورویی در مناطق مرکزی آتن و جزایر، هلدینگ دیاکو از طریق دفتر مستقیم خود در
              گلیفادای آتن، پروژه‌های انحصاری بازسازی تجاری به مسکونی با سقف ۲۵۰,۰۰۰ یورو را با بازدهی اجاره ارزی ارائه می‌دهد.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">اقامت ۳ نسل</div>
                <div className="text-[11px] text-slate-300 mt-1">شامل والدین متقاضی و همسر</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-blue-400">گزینه ۲۵۰,۰۰۰ €</div>
                <div className="text-[11px] text-slate-300 mt-1">پروژه‌های تبدیل تجاری به مسکونی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">کارت ۵ ساله</div>
                <div className="text-[11px] text-slate-300 mt-1">تمدید مادام‌العمر بدون شرط حضور</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                مشاهده پروژه‌های ۲۵۰ هزار یورویی آتن
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره مستقیم با دفتر آتن دیاکو
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80"
                alt="یونان آتن گلدن ویزا خرید ملک"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                  <Building2 className="h-4 w-4" />
                  دفتر حقوقی دیاکو در گلیفادای آتن (Glyfada)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  اخذ کد مالیاتی یونان (AFM)، افتتاح حساب بانکی، استعلام پاک بودن سند در اداره کاداستر و حضور وکیل در روز تحویل کارت اقامت
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول گلدن ویزای یونان
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'پروژه‌های ۲۵۰ هزار یورویی جدید یونان دقیقاً چه شرایطی دارند؟',
              a: 'طبق اصلاحات قانونی، املاکی که کاربری تجاری/صنعتی داشته و به کاربری مسکونی تغییر داده شده‌اند، در سراسر یونان (حتی در آتن مرکزی) با حداقل قیمت ۲۵۰,۰۰۰ یورو مشمول دریافت گلدن ویزا خواهند بود.',
            },
            {
              q: 'آیا برای حفظ کارت اقامت ۵ ساله نیازی به سکونت در یونان است؟',
              a: 'خیر. گلدن ویزای یونان هیچ‌گونه شرط حضور فیزیکی ندارد؛ شما می‌توانید ملک را اجاره داده و درآمد یورویی کسب کنید و هر زمان که مایل بودید بدون ویزا در شینگن تردد نمایید.',
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

export default RealEstateGreecePage;
