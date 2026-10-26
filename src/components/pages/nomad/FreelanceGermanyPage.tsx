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
  Laptop,
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

export const FreelanceGermanyPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای فریلنسری آلمان ۲۰۲۶ | اقامت آزادکاری و مشاغل مستقل (Freiberufler)',
    description:
      'راهنمای جامع ویزای فریلنسری آلمان ۲۰۲۶ طبق بند ۵ ماده ۲۱ قانون اقامت آلمان (AufenthG §21 Abs. 5)؛ تفاوت Freiberufler و Gewerbe، تهیه بیزینس پلن، نامه‌های قصد همکاری و معافیت از مالیات تجاری با دیاکو.',
    canonical: '/guides/freelance-germany',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'فریلنسری آلمان',
      'ویزای فریلنسری آلمان ۲۰۲۶',
      'Freiberufler Visa Germany',
      'بند ۲۱ تبصره ۵ قانون اقامت آلمان',
      'ثبت مالیاتی فریلنسر آلمان Finanzamt',
      'اقامت ۳ ساله آزادکاری آلمان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/freelance-germany#article',
          headline: 'راهنمای جامع ویزای فریلنسری و اقامت خوداشتغالی آلمان ۲۰۲۶',
          description:
            'تحلیل تخصصی ماده ۲۱ قانون اقامت آلمان برای مشاغل آزاد (پزشکان، مهندسان، مترجمان، برنامه‌نویسان و هنرمندان)، تمکن مالی، نامه‌های همکاری و مسیر اقامت دائم ۳ ساله.',
          image: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
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
            <span>دیجیتال نوماد و فریلنسر</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">فریلنسری آلمان (Freiberufler)</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300 mb-4">
              <Laptop className="h-4 w-4 text-emerald-400" />
              AufenthG §21 (5) — اقامت مشاغل آزاد و تخصصی آلمان ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              ویزای فریلنسری آلمان ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-emerald-400">
                (Freiberufler Visa)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              آلمان بزرگ‌ترین قدرت اقتصادی اروپا است و بازار کار این کشور اشتیاق بالایی به همکاری با متخصصان فریلنسر
              دارد. در قانون اقامت آلمان، مشاغل آزاد تخصصی (Freie Berufe) شامل متخصصان IT، مهندسان مشاور، مترجمان،
              معماران و تدریس‌کنندگان مستقل از پرداخت مالیات اصناف معاف هستند و می‌توانند با ارائه برنامه‌ریزی مالی و
              نامه‌های قرارداد از کارفرمایان، اقامت ۳ ساله شینگن و سپس اقامت دائم آلمان دریافت کنند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۳ سال دائم</div>
                <div className="text-[11px] text-slate-300 mt-1">کوتاه‌ترین مسیر Niederlassung</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-300">معاف از اصناف</div>
                <div className="text-[11px] text-slate-300 mt-1">بدون Gewerbesteuer</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-blue-400">بازار بزرگ آلمان</div>
                <div className="text-[11px] text-slate-300 mt-1">امکان عقد قرارداد مستقیم یورویی</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی رزومه فریلنسری آلمان
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
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
                alt="فرانکفورت آلمان فریلنسری"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <Building2 className="h-4 w-4" />
                  اداره دارایی آلمان (Finanzamt)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  اخذ کد مالیاتی فریلنسری، ثبت پرسشنامه مالیاتی (Fragebogen zur steuerlichen Erfassung) و افتتاح حساب بانکی تجاری
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول فریلنسری آلمان
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'تفاوت Freiberufler با Gewerbe در آلمان چیست؟',
              a: 'فریلنسرها (Freiberufler) شامل مشاغل علمی، آموزشی، پزشکی، مهندسی و هنری هستند که نیازی به ثبت صنف ندارند و از مالیات تجاری معافند؛ اما مشاغل تجاری و بازرگانی (Gewerbe) باید در صنف ثبت شده و مالیات اصناف بپردازند.',
            },
            {
              q: 'آیا برای ویزای فریلنسری نیاز به مدرک زبان آلمانی است؟',
              a: 'برای رشته‌های حوزه IT و فناوری و پروژه‌های بین‌المللی مدرک انگلیسی کفایت می‌کند، اما برای مشاغلی که نیازمند تعامل با مشتریان بومی آلمانی هستند داشتن حداقل مدرک B1 آلمانی الزامی است.',
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

export default FreelanceGermanyPage;
