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
  Rocket,
  ShieldCheck,
  Building2,
  Landmark,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const StartupGermanyPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  useSeo({
    title: 'ویزای استارت‌آپ آلمان ۲۰۲۶ | اقامت کارآفرینی ماده ۲۱',
    description:
      'راهنمای ویزای استارت‌آپ و خوداشتغالی آلمان ۲۰۲۶؛ تاییدیه اتاق بازرگانی IHK، هاب‌های فناوری برلین و مونیخ، اقامت دائم ۳ ساله با دیاکو.',
    canonical: '/guides/startup-germany',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'استارت آپ آلمان ۲۰۲۶',
      'Germany Startup Visa',
      'اقامت ماده ۲۱ قانون اقامت آلمان',
      'بیزینس پلن IHK آلمان',
      'هاب فناوری برلین',
      'ویزای کارآفرینی آلمان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/startup-germany#article',
          headline: 'راهنمای جامع ویزای استارت‌آپ آلمان ۲۰۲۶: شرایط ماده ۲۱ AufenthG و IHK',
          description:
            'بررسی مسیر اقامت کارآفرینی و استارت‌آپ برلین و مونیخ آلمان، نحوه دریافت تاییدیه منافع اقتصادی و تبدیل به اقامت دائم Niederlassungserlaubnis.',
          image: [
            'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
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
          dateModified: '2026-10-23',
          inLanguage: 'fa-IR',
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/startup-germany#howto',
          name: 'مراحل ثبت استارت‌آپ و دریافت ویزای کارآفرینی آلمان',
          description: 'از تنظیم بیزینس پلن استاندارد آلمانی تا ویزای ملی تایپ D',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'نگارش طرح کسب‌وکار بر مبنای معیارهای Wirtschaftsplan',
              text: 'اثبات منافع اقتصادی منطقه‌ای و اثرات مثبت بر بازار کار ایالت مورد نظر در آلمان.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'دریافت تاییدیه از اتاق صنایع و بازرگانی (IHK)',
              text: 'ارزیابی مدل مالی و فنی توسط مراجع تخصصی تجاری ایالتی.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'تامین سرمایه و افتتاح حساب بانکی شرکتی',
              text: 'انتقال سرمایه اولیه شرکت و اثبات تمکن زندگی متقاضی.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'اخذ کارت اقامت ۳ ساله و تبدیل به اقامت دائم در سال سوم',
              text: 'تبدیل سریع به اقامت دائم آلمان در صورت موفقیت تجاری طرح.',
            },
          ],
        },
      ],
    },
  });

  const [cityHub, setCityHub] = useState<'berlin' | 'munich' | 'frankfurt'>('berlin');

  return (
    <div className="min-h-screen bg-[#061a21] text-slate-100" dir="rtl">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#082833] via-[#061a21] to-[#041217] pt-10 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به خدمات دیاکو
            </button>
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-bold text-amber-300">
              🇩🇪 دپارتمان تجاری آلمان دیاکو
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-black text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                آلمان | برترین اقتصاد قاره اروپا
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl text-white">
                ویزای استارت‌آپ آلمان؛ اقامت کارآفرینی ماده ۲۱ در برلین و مونیخ
              </h1>

              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-300 sm:text-base text-justify">
                آلمان به عنوان پایتخت استارت‌آپی اروپا، از بنیان‌گذاران نوآور در صنایع هوش مصنوعی، انرژی‌های تجدیدپذیر، مهندسی و نرم‌افزار با اعطای اقامت کارآفرینی ذیل ماده ۲۱ قانون اقامت (AufenthG §21) استقبال می‌کند. این برنامه پس از گذشت ۳ سال فعالیت تجاری سودآور، مستقیما به اقامت دائم آلمان ختم می‌شود.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Rocket className="h-4 w-4" />
                  ارزیابی بیزینس پلن آلمان
                </button>
                <a
                  href="tel:+982191693955"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4 text-amber-400" />
                  مشاوره تهران: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[16/9] w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="برلین آلمان مرکز استارت‌آپ‌های پیشرو فناوری در اتحادیه اروپا"
                  loading="eager"
                  fetchPriority="high"
                  width={1000}
                  height={563}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* بخش تعاملی انتخاب هاب */}
      <section className="py-14 bg-[#082029]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <h2 className="text-xl font-black text-white">مقایسه هاب‌های استارت‌آپی پیشرو آلمان</h2>
            <div className="mt-4 flex gap-2">
              {[
                { id: 'berlin', label: 'برلین (Berlin Tech Ecosystem)' },
                { id: 'munich', label: 'مونیخ (Bavaria DeepTech)' },
                { id: 'frankfurt', label: 'فرانکفورت (FinTech & Data)' },
              ].map((hub) => (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => setCityHub(hub.id as any)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    cityHub === hub.id ? 'bg-amber-400 text-slate-900' : 'bg-white/5 text-slate-300'
                  }`}
                >
                  {hub.label}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
              {cityHub === 'berlin' && (
                <div>
                  <h3 className="font-bold text-amber-300 text-sm">اکوسیستم بین‌المللی برلین</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    بیش از ۵۰۰ استارت‌آپ جدید هر سال در برلین متولد می‌شوند. بیش از ۸۰ درصد جلسات کاری و فعالیت‌های روزمره به زبان انگلیسی انجام می‌شود و هزینه‌های زندگی نسبت به لندن و پاریس معقول‌تر است.
                  </p>
                </div>
              )}
              {cityHub === 'munich' && (
                <div>
                  <h3 className="font-bold text-amber-300 text-sm">هاب فناوری‌های بنیادین و صنعتی بایرن (مونیخ)</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    مجاورت با غول‌های صنعتی همچون زیمنس، بی‌ام‌و و دانشگاه‌های تراز اول TUM بستر فوق‌العاده‌ای برای استارت‌آپ‌های اینترنت اشیاء، هوش مصنوعی و رباتیک فراهم آورده است.
                  </p>
                </div>
              )}
              {cityHub === 'frankfurt' && (
                <div>
                  <h3 className="font-bold text-amber-300 text-sm">مرکز مالی اروپا و فین‌تک (فرانکفورت)</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    استقرار بانک مرکزی اروپا (ECB) و بیش از ۲۰۰ بانک تجاری جهانی، فرانکفورت را به بهشت نوآوران حوزه بلاکچین، بیمه و پرداخت‌های ارزی بدل کرده است.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* اقدام دیاکو */}
      <section className="py-14">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <div className="rounded-3xl border border-amber-400/40 bg-gradient-to-l from-amber-500/20 to-white/5 p-8">
            <h3 className="text-xl font-black text-white">آماده ورود به بزرگترین بازار اقتصادی اروپا هستید؟</h3>
            <p className="mt-2 text-xs text-slate-300 max-w-lg mx-auto">
              بیزینس پلن شما توسط فارغ‌التحصیلان MBA آلمان و مورد تایید IHK نوشته شده و جلسات سفارت شبیه‌سازی می‌گردد.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs font-black text-[#082833] hover:bg-amber-300 cursor-pointer shadow-lg"
              >
                ارزیابی طرح استارت‌آپ آلمان
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartupGermanyPage;
