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

export const AcademicHungaryPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'تحصیل در مجارستان ۲۰۲۶ | پذیرش پزشکی سملوایز (Semmelweis) و مهندسی BME بوداپست',
    description:
      'راهنمای کامل تحصیل در مجارستان ۲۰۲۶ به زبان انگلیسی؛ پزشکی، دندانپزشکی و داروسازی سملوایز، دبرسن و پچ، دانشگاه مهندسی BME بوداپست، مدارک مورد تایید وزارت بهداشت و علوم ایران با دیاکو.',
    canonical: '/guides/academic-hungary',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تحصیل در مجارستان ۲۰۲۶',
      'پزشکی دانشگاه سملوایز مجارستان',
      'دانشگاه دبرسن مجارستان',
      'دانشگاه مهندسی BME بوداپست',
      'تحصیل پزشکی به زبان انگلیسی در اروپا',
      'تاییدیه وزارت بهداشت مجارستان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/academic-hungary#article',
          headline: 'راهنمای جامع تحصیل پزشکی، دندانپزشکی و مهندسی در مجارستان ۲۰۲۶',
          description:
            'بررسی آزمون‌های ورودی زیست و شیمی دانشگاه‌های پزشکی سملوایز، سگد و دبرسن، دوره‌های کالج پیش‌پزشکی (Pre-Med)، شهریه‌های مقرون‌به‌صرفه و اعتبار مدرک در کل اتحادیه اروپا و آمریکا.',
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
            <span>تحصیل در دانشگاه (Academic)</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">تحصیل در مجارستان</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300 mb-4">
              <GraduationCap className="h-4 w-4 text-emerald-400" />
              Semmelweis & BME — آموزش عالی و علوم پزشکی مجارستان ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              تحصیل در دانشگاه‌های مجارستان ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-emerald-400">
                (پزشکی سملوایز و مهندسی)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              مجارستان قطب سنتی و پرطرفدار آموزش پزشکی و دندانپزشکی به زبان انگلیسی در قلب اروپا است. دانشگاه سملوایز
              بوداپست (Semmelweis University) با بیش از ۲۵۰ سال سابقه درخشان، در زمره معتبرترین دانشکده‌های پزشکی جهان
              است. مدارک دانشگاه‌های مجارستان مورد تایید قطعی وزارت بهداشت و علوم ایران، کل اتحادیه اروپا و بورد پزشکی
              آمریکا (USMLE) و کانادا می‌باشد.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۱۰۰٪ انگلیسی</div>
                <div className="text-[11px] text-slate-300 mt-1">پزشکی و دندانپزشکی زبان انگلیسی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-300">تایید وزارت بهداشت</div>
                <div className="text-[11px] text-slate-300 mt-1">اعتبار بین‌المللی در ایران و جهان</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-blue-400">کالج‌های Pre-Med</div>
                <div className="text-[11px] text-slate-300 mt-1">آمادگی تضمینی آزمون ورودی</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی شانس قبولی پزشکی سملوایز
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره مستقیم با کارشناسان مجارستان
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <OptimizedImage loading="eager" fetchPriority="high"
                src="https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1000&q=80"
                alt="مجارستان بوداپست دانشگاه سملوایز"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <Building2 className="h-4 w-4" />
                  برگزاری آزمون‌های ورودی در بوداپست و آنلاین
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  آزمون کتبی زیست‌شناسی و شیمی، مصاحبه شفاهی با اساتید دانشگاه و پشتیبانی کامل خوابگاه و ویزای شینگن
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول تحصیل در مجارستان
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'آیا برای ورود به پزشکی سملوایز شرکت در دوره کالج پیش‌پزشکی الزامی است؟',
              a: 'خیر الزامی نیست، اما با توجه به رقابتی بودن آزمون کتبی و شفاهی زیست و شیمی، گذراندن دوره ۱ ساله کالج پیش‌پزشکی شانس قبولی متقاضیان را به بیش از ۹۰ درصد می‌رساند.',
            },
            {
              q: 'شهریه سالانه رشته‌های پزشکی و دندانپزشکی در مجارستان چقدر است؟',
              a: 'شهریه سالانه پزشکی عمومی حدود ۱۶,۰۰۰ تا ۱۸,۰۰۰ دلار و دندانپزشکی حدود ۱۷,۰۰۰ تا ۱۹,۰۰۰ دلار در سال است که به صورت دو ترم پرداخت می‌شود.',
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

export default AcademicHungaryPage;
