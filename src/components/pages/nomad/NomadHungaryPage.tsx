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

export const NomadHungaryPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'دیجیتال نوماد مجارستان ۲۰۲۶ | ویزای وایت کارت بوداپست (White Card)',
    description:
      'راهنمای کامل کارت سفید مجارستان ۲۰۲۶ (White Card) برای کارمندان دورکار و فریلنسرها؛ درآمد حداقل ۳,۰۰۰ یورو در ماه، زندگی اقتصادی در قلب اروپا و سفر بدون ویزا در حوزه شینگن با دیاکو.',
    canonical: '/guides/nomad-hungary',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'دیجیتال نوماد مجارستان',
      'White Card مجارستان ۲۰۲۶',
      'ویزای وایت کارت بوداپست',
      'حداقل درآمد وایت کارت مجارستان',
      'کار از راه دور در مجارستان',
      'اقامت ۱ ساله شینگن مجارستان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/nomad-hungary#article',
          headline: 'راهنمای جامع دیجیتال نوماد و وایت کارت مجارستان ۲۰۲۶',
          description:
            'بررسی قانون مهاجرت جدید مجارستان برای دارندگان وایت کارت، شرط درآمد ۳,۰۰۰ یورویی، مالیات بر درآمد و اعتبار ۱+۱ ساله با تردد در کل اتحادیه اروپا.',
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
            <span>دیجیتال نوماد و فریلنسر</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">دیجیتال نوماد مجارستان</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold text-sky-300 mb-4">
              <Laptop className="h-4 w-4 text-sky-400" />
              White Card — کارت سفید دورکاری مجارستان ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              دیجیتال نوماد مجارستان ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-sky-400">
                (Hungary White Card)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              بوداپست با معماری باشکوه، هزینه‌های زندگی بسیار اقتصادی‌تر نسبت به اروپای غربی و سرعت اینترنت فوق‌العاده،
              یکی از بهترین کانون‌های نومادها در قاره سبز است. کارت سفید مجارستان (White Card) به متخصصان کار از راه
              دور اجازه می‌دهد اقامت یک‌ساله شینگن (قابل تمدید برای یک سال دیگر) دریافت کرده و آزادانه در ۲۹ کشور عضو
              شینگن رفت‌وآمد کنند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۳,۰۰۰ €</div>
                <div className="text-[11px] text-slate-300 mt-1">حداقل درآمد ماهانه اثبات‌شده</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-sky-300">هزینه زندگی کم</div>
                <div className="text-[11px] text-slate-300 mt-1">۴۰٪ ارزان‌تر از اروپای غربی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">تردد شینگن</div>
                <div className="text-[11px] text-slate-300 mt-1">سفر آزادانه بدون مرز</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی شانس اخذ وایت کارت
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره با دپارتمان مجارستان دیاکو
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1000&q=80"
                alt="مجارستان بوداپست وایت کارت"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
                  <Building2 className="h-4 w-4" />
                  اداره مهاجرت ملی مجارستان (OIF)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  قرارداد کار از راه دور، اثبات گردش ۶ ماهه بانکی و اجاره مسکن رسمی در بوداپست
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول وایت کارت مجارستان
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'آیا دارندگان وایت کارت مجارستان می‌توانند خانواده خود را همراه بیاورند؟',
              a: 'خیر. طبق قانون مجارستان، وایت کارت ماهیت فردی دارد و امکان الحاق خانواده برای دارنده این نوع کارت وجود ندارد؛ مگر اینکه همراهان خود دارای ویزای مستقل باشند یا نوع اقامت متقاضی تغییر یابد.',
            },
            {
              q: 'آیا وایت کارت منجر به اقامت دائم مجارستان می‌شود؟',
              a: 'مدت وایت کارت حداکثر ۲ سال (۱ سال + ۱ سال تمدید) است و مستقیماً به اقامت دائم تبدیل نمی‌شود، اما در طول این مدت متقاضی می‌تواند نوع اقامت خود را به ثبت شرکت یا بلوکارت تغییر دهد.',
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

export default NomadHungaryPage;
