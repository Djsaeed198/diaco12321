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
  GraduationCap,
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

export const AcademicUKPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای تحصیلی بریتانیا ۲۰۲۶ | استادی ویزای انگلستان (UK Student Route) و CAS',
    description:
      'راهنمای کامل پذیرش و ویزای تحصیلی انگلستان ۲۰۲۶ (Student visa)؛ اخذ نامه پذیرش CAS، شروط تمکن مالی لندن و شهرستان‌ها، اجازه کار دانشجویی ۲۰ ساعت در هفته و ویزای کار فارغ‌التحصیلی ۲ ساله (Graduate Route) با دیاکو.',
    canonical: '/guides/academic-uk',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای تحصیلی انگلستان ۲۰۲۶',
      'UK Student visa',
      'نامه پذیرش CAS انگلستان',
      'تمکن مالی ویزای تحصیلی بریتانیا',
      'ویزای Graduate Route انگلستان',
      'تحصیل کارشناسی ارشد در لندن',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/academic-uk#article',
          headline: 'راهنمای جامع ویزای دانشجویی بریتانیا و تحصیل در دانشگاه‌های انگلستان ۲۰۲۶',
          description:
            'بررسی سیستم امتیازدهی Points-Based ویزای تحصیلی انگلستان، اخذ نامه CAS از دانشگاه‌های Russell Group، هزینه بیمه درمانی سلامت NHS و اقامت کاری پس از تحصیل.',
          image: [
            'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
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
            <span>تحصیل در دانشگاه (Academic)</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">ویزای تحصیلی بریتانیا (UK Student)</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 mb-4">
              <GraduationCap className="h-4 w-4 text-indigo-400" />
              UK Visas and Immigration (UKVI) — ویزای تحصیلی انگلستان ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              ویزای تحصیلی بریتانیا ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-indigo-400">
                (UK Student Route)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              بریتانیا با دانشگاه‌های پیشرو در سطح جهانی همچون آکسفورد، کمبریج، UCL، امپریال و کینگز کالج لندن، قطب
              اصلی آموزش عالی به زبان انگلیسی است. دوره‌های کارشناسی ارشد در انگلستان معمولاً تنها ۱ سال به طول
              می‌انجامند که این امر هزینه‌های شهریه و زندگی را به شدت کاهش می‌دهد و پس از پایان تحصیل، ویزای کاری ۲ ساله
              فارغ‌التحصیلی (Graduate Route) امکان ورود مستقیم به بازار کار انگلستان را فراهم می‌سازد.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">ارشد ۱ ساله</div>
                <div className="text-[11px] text-slate-300 mt-1">صرفه‌جویی در زمان و هزینه</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-indigo-300">Graduate Route</div>
                <div className="text-[11px] text-slate-300 mt-1">۲ سال اجازه کار پس از فراغت</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">۲۰ ساعت کار</div>
                <div className="text-[11px] text-slate-300 mt-1">کار پاره‌وقت در طول ترم</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی شانس اخذ پذیرش و CAS انگلستان
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
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80"
                alt="لندن انگلستان ویزای تحصیلی"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                  <Building2 className="h-4 w-4" />
                  صدور تاییدیه رسمی پذیرش (CAS)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  Confirmation of Acceptance for Studies و استعلام ۲۸ روزه تمکن مالی حساب بانکی قبل از ثبت پرونده در VFS انگلستان
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول تحصیل در انگلستان
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'میزان تمکن مالی مورد نیاز برای ویزای تحصیلی انگلستان چقدر است؟',
              a: 'متقاضی باید شهریه سال اول دانشگاه به علاوه هزینه ۹ ماه زندگی (معادل حدود ۱,۳۳۴ پوند در ماه برای لندن یا ۱,۰۲۳ پوند در ماه برای خارج از لندن) را به مدت ۲۸ روز متوالی در حساب بانکی معتبر نگه دارد.',
            },
            {
              q: 'آیا ویزای کاری Graduate Route قابل تبدیل به اقامت دائم است؟',
              a: 'بله. در طول ۲ سال ویزای Graduate Route، به محض پیدا کردن کارفرما که اسپانسر شما شود، ویزا به Skilled Worker تبدیل شده و پس از ۵ سال اقامت دائم ILR اعطا می‌شود.',
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

export default AcademicUKPage;
