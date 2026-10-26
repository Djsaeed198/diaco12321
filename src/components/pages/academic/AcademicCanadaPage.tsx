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

export const AcademicCanadaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'تحصیل در کانادا ۲۰۲۶ | استادی پرمیت، نامه استانی PAL و اجازه کار PGWP',
    description:
      'راهنمای کامل ویزای تحصیلی کانادا ۲۰۲۶ (Canada Study Permit)؛ نامه تاییدیه استانی (PAL)، سقف پذیرش‌های جدید IRCC، ویزای کار پس از فارغ‌التحصیلی تا ۳ سال (PGWP) و مسیر اقامت دائم اکسپرس انتری با دیاکو.',
    canonical: '/guides/academic-canada',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1517935703635-27c94645a452?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تحصیل در کانادا ۲۰۲۶',
      'ویزای تحصیلی کانادا Study Permit',
      'نامه استانی PAL کانادا',
      'اجازه کار فارغ التحصیلی PGWP',
      'دانشگاه های تورنتو و ونکوور',
      'تبدیل ویزای تحصیلی به اقامت دائم PR کانادا',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/academic-canada#article',
          headline: 'راهنمای جامع پذیرش دانشگاهی و استادی پرمیت کانادا ۲۰۲۶',
          description:
            'بررسی قوانین جدید اداره مهاجرت کانادا (IRCC)، سهمیه‌بندی استانی و دریافت نامه PAL، حداقل تمکن مالی ۲۰,۶۳۵ دلاری و شرایط کار دانشجویی ۲۰ ساعت در هفته.',
          image: [
            'https://images.unsplash.com/photo-1517935703635-27c94645a452?auto=format&fit=crop&w=1200&q=80',
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
            <span className="text-amber-300 font-bold">تحصیل در کانادا</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-300 mb-4">
              <GraduationCap className="h-4 w-4 text-red-400" />
              IRCC Study Permit & PAL — تحصیل در کانادا ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              تحصیل در دانشگاه‌های کانادا ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-red-400">
                (استادی پرمیت و PGWP)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              کانادا با استاندارد بالای آموزشی، جامعه چندفرهنگی و سیستم شفاف مهاجرت، همواره مقصد شماره یک دانشجویان
              بین‌المللی بوده است. طبق آخرین دستورالعمل‌های اداره مهاجرت کانادا (IRCC)، اخذ پذیرش مشروط به دریافت نامه
              تاییدیه استانی (Provincial Attestation Letter - PAL) است. پس از اتمام دوره در موسسات DLI معتبر، فارغ‌التحصیلان
              ویزای کار باز تا سقف ۳ سال (PGWP) دریافت نموده و به سادگی از طریق Express Entry به اقامت دائم (PR) دست می‌یابند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">تا ۳ سال PGWP</div>
                <div className="text-[11px] text-slate-300 mt-1">اجازه کار باز پس از فارغ‌التحصیلی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-red-400">نامه رسمی PAL</div>
                <div className="text-[11px] text-slate-300 mt-1">تاییدیه سهمیه استانی برای ویزا</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">مسیر PR مستقیم</div>
                <div className="text-[11px] text-slate-300 mt-1">امتیاز بالا در اکسپرس انتری</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی شانس ویزای تحصیلی کانادا
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
                src="https://images.unsplash.com/photo-1517935703635-27c94645a452?auto=format&fit=crop&w=1000&q=80"
                alt="کانادا تورنتو دانشگاه تحصیلی"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                  <Building2 className="h-4 w-4" />
                  اداره مهاجرت، پناهندگی و شهروندی کانادا (IRCC)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  تنظیم استیتمنت انگیزه (SOP) آکادمیک قوی، اثبات تمکن مالی ۲۰,۶۳۵ دلاری و انتخاب موسسات معتبر با تضمین PGWP
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول تحصیل در کانادا
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'نامه استانی (PAL) چیست و چگونه دریافت می‌شود؟',
              a: 'طبق قوانین جدید کانادا، هر متقاضی مقطع کارشناسی و دیپلم کالج برای ارسال پرونده ویزا به سفارت باید علاوه بر نامه پذیرش (LOA)، نامه تاییدیه‌ای از استان محل دانشگاه (PAL) دریافت نماید که سهمیه آن توسط دانشگاه اختصاص می‌یابد.',
            },
            {
              q: 'دانشجویان در طول دوره تحصیل چند ساعت در هفته حق کار دارند؟',
              a: 'دانشجویان در حین تحصیل به مدت ۲۰ ساعت در هفته در طول ترم و به صورت تمام‌وقت (۴۰ ساعت) در تعطیلات بین ترم‌ها و تابستان مجاز به کار قانونی در خاک کانادا هستند.',
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

export default AcademicCanadaPage;
