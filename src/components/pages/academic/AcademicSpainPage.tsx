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

export const AcademicSpainPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'تحصیل در اسپانیا ۲۰۲۶ | راهنمای کامل پذیرش دانشگاه‌های دولتی مادرید و بارسلونا',
    description:
      'راهنمای جامع تحصیل در دانشگاه‌های اسپانیا ۲۰۲۶؛ آزمون ورودی Selectividad / PCE، شهریه دولتی اقتصادی ۱,۰۰۰ تا ۳,۰۰۰ یورو در سال، مجوز قانونی کار دانشجویی ۳۰ ساعت در هفته و تبدیل به اقامت کاری با دیاکو.',
    canonical: '/guides/academic-spain',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تحصیل در اسپانیا ۲۰۲۶',
      'دانشگاه های دولتی اسپانیا',
      'آزمون ورودی سلکتیویداد PCE',
      'شهریه دانشگاه های مادرید و بارسلونا',
      'کار دانشجویی ۳۰ ساعت در اسپانیا',
      'ویزای تحصیلی شینگن اسپانیا',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/academic-spain#article',
          headline: 'راهنمای جامع تحصیل در مقاطع کارشناسی، ارشد و دکتری در اسپانیا ۲۰۲۶',
          description:
            'بررسی فرآیند همسان‌سازی دیپلم (Homologación)، آزمون PCE توسط سازمان UNEDasiss، بورسیه‌های تحصیلی و مجوز اقامت تحصیلی اسپانیا (Estancia por Estudios).',
          image: [
            'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
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
            <span className="text-amber-300 font-bold">تحصیل در اسپانیا</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <GraduationCap className="h-4 w-4 text-amber-400" />
              UNEDasiss & State Universities — تحصیل آکادمیک در اسپانیا ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              تحصیل در دانشگاه‌های اسپانیا ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-orange-400">
                (مادرید و بارسلونا)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              اسپانیا با رتبه‌بندی‌های دانشگاهی برتر جهانی در مادرید، بارسلونا و والنسیا، یکی از مقرون‌به‌صرفه‌ترین
              کشورهای اروپایی برای تحصیلات عالی است. دانشجویان بین‌المللی با شهریه‌های دولتی سالانه بین ۱,۰۰۰ تا ۳,۰۰۰
              یورو می‌توانند در مقاطع کارشناسی، ارشد و دکتری تحصیل کنند و از حق قانونی کار ۳۰ ساعت در هفته حین تحصیل
              بهره‌مند شوند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۱,۰۰۰–۳,۰۰۰ €</div>
                <div className="text-[11px] text-slate-300 mt-1">شهریه سالانه دانشگاه‌های دولتی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-orange-300">۳۰ ساعت کار</div>
                <div className="text-[11px] text-slate-300 mt-1">مجوز کار قانونی دانشجویی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">تبدیل به کار</div>
                <div className="text-[11px] text-slate-300 mt-1">اقامت ۱ ساله جستجوی کار پس از تحصیل</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی شانس پذیرش دانشگاه‌های اسپانیا
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
                src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1000&q=80"
                alt="اسپانیا دانشگاه مادرید و بارسلونا"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-300">
                  <Building2 className="h-4 w-4" />
                  سازمان سنجش و همسان‌سازی UNEDasiss
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  اخذ تاییدیه همسان‌سازی دیپلم، شرکت در آزمون‌های اختصاصی PCE، ثبت‌نام در دانشگاه‌های Autònoma de Barcelona و Complutense Madrid
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول تحصیل در اسپانیا
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'آیا امکان تحصیل به زبان انگلیسی در دانشگاه‌های اسپانیا وجود دارد؟',
              a: 'بله. اکثر رشته‌های مقطع کارشناسی ارشد و دکتری و تعداد زیادی از دوره‌های کارشناسی به زبان انگلیسی ارائه می‌شوند و ارائه مدرک IELTS یا TOEFL کفایت می‌کند.',
            },
            {
              q: 'آیا پس از فارغ‌التحصیلی می‌توان در اسپانیا اقامت کاری گرفت؟',
              a: 'بله. دانشجویان پس از اتمام دوره می‌توانند برای ویزای ۱ ساله جستجوی کار فارغ‌التحصیلان (Permiso de residencia para búsqueda de empleo) اقدام نموده و با دریافت جاب‌آفر به اقامت کاری دائم دست یابند.',
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

export default AcademicSpainPage;
