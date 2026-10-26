import React from 'react';
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
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const BusinessPolandPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  useSeo({
    title: 'ثبت شرکت در لهستان Sp. z o.o. ۲۰۲۶ | اقامت ورشو',
    description:
      'راهنمای کامل ثبت شرکت در لهستان ۲۰۲۶؛ شرکت Sp. z o.o.، مالیات ۹ درصدی برای شرکت‌های نوپا، ثبت سریع آنلاین S24 و اقامت کاری اروپا با دیاکو.',
    canonical: '/guides/company-poland',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ثبت شرکت لهستان ۲۰۲۶',
      'شرکت Sp z o o لهستان',
      'سیستم ثبت آنلاین S24 لهستان',
      'مالیات ۹ درصدی لهستان',
      'اقامت تجاری ورشو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/company-poland#article',
          headline: 'راهنمای ثبت شرکت Sp. z o.o. در لهستان و اخذ کارت اقامت Karta Pobytu ۲۰۲۶',
          description:
            'بررسی ثبت شرکت با سیستم دولتی S24 در ورشو و کراکوف، حداقل سرمایه ۵,۰۰۰ زلوتی و اخذ کارت اقامت تجاری موقت لهستان.',
          image: [
            'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1200&q=80',
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
      ],
    },
  });

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
            <span className="rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-[11px] font-bold text-red-300">
              🇵🇱 دپارتمان ثبت شرکت لهستان دیاکو
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-black text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                اقتصاد رو به رشد با ثبت آنلاین S24 در ۳ روز
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl text-white">
                ثبت شرکت در لهستان (Sp. z o.o.)؛ دسترسی به بازار شرق و مرکز اروپا
              </h1>

              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-300 sm:text-base text-justify">
                لهستان یکی از پرسرعت‌ترین اقتصادهای رو به توسعه در اروپا است. با سرمایه اولیه اندک (تنها حدود ۱,۲۰۰ یورو یا ۵,۰۰۰ زلوتی) و امکان ثبت برخط از طریق پورتال قضایی S24، می‌توانید در ورشو، وروتسواف یا کراکوف شرکت تاسیس نموده و کارت اقامت (Karta Pobytu) دریافت نمایید.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  بررسی هزینه ثبت شرکت لهستان
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
                  src="https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="آسمان‌خراش‌ها و بافت تجاری شهر ورشو پایتخت لهستان"
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
    </div>
  );
};

export default BusinessPolandPage;
