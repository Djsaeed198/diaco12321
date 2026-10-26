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

export const StartupFrancePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  useSeo({
    title: 'ویزای استارت‌آپ فرانسه ۲۰۲۶ | French Tech Visa پاریس',
    description:
      'راهنمای کامل ویزای استارت‌آپ فرانسه (French Tech Visa)؛ پذیرش در انکوباتورهای Station F، اقامت ۴ ساله Passeport Talent و همراهی خانواده با دیاکو.',
    canonical: '/guides/startup-france',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'استارت آپ فرانسه ۲۰۲۶',
      'French Tech Visa',
      'ویزای تالنت فرانسه',
      'انکوباتور Station F پاریس',
      'اقامت ۴ ساله فرانسه',
      'مهاجرت نوآوری فرانسه',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/startup-france#article',
          headline: 'راهنمای جامع French Tech Visa فرانسه ۲۰۲۶: کارت اقامت ۴ ساله و انکوباتورهای پاریس',
          description:
            'بررسی مسیر ویزای فناوری فرانسه برای بنیان‌گذاران استارت‌آپ، پذیرش در انکوباتورهای منتخب و دریافت کارت Passeport Talent - Fondateur de Jeune Entreprise Innovante.',
          image: [
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
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
            <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-[11px] font-bold text-blue-300">
              🇫🇷 دپارتمان تخصصی فرانسه دیاکو
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-black text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                French Tech Visa | پاریس پایتخت نوآوری اروپا
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl text-white">
                ویزای استارت‌آپ فرانسه؛ ۴ سال اقامت معتبر در پاریس با French Tech
              </h1>

              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-300 sm:text-base text-justify">
                فرانسه با بزرگترین پردیس استارت‌آپی جهان (Station F در پاریس) و شبکه قدرتمند French Tech، سریع‌ترین رویه صدور ویزای نوآوری را ارائه می‌دهد. این ویزا کارت اقامت چندساله (Passeport Talent) به مدت ۴ سال صادر می‌کند و همسر شما نیز اجازه کار آزاد در سراسر خاک فرانسه را دریافت خواهد کرد.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Rocket className="h-4 w-4" />
                  بررسی ایده برای French Tech
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
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="پاریس فرانسه، میزبان بزرگترین مرکز استارت‌آپ‌های دنیا Station F"
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

      {/* مزایای French Tech */}
      <section className="py-14 bg-[#082029]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <h2 className="text-xl font-black text-white">ویژگی‌های برجسته ویزای استارت‌آپ فرانسه</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <h3 className="text-amber-300 font-bold text-xs">کارت ۴ ساله معتبر</h3>
                <p className="text-[11px] text-slate-300 mt-1">بدون نیاز به تمدید سالیانه، از همان ابتدا اقامت ۴ ساله تالنت دریافت می‌کنید.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <h3 className="text-emerald-400 font-bold text-xs">اجازه کار همسر</h3>
                <p className="text-[11px] text-slate-300 mt-1">همسر متقاضی بدون نیاز به مجوز کار جداگانه حق اشتغال آزاد در فرانسه دارد.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <h3 className="text-cyan-400 font-bold text-xs">عدم نیاز به زبان فرانسه</h3>
                <p className="text-[11px] text-slate-300 mt-1">امکان اقدام و دفاع از بیزینس پلن ۱۰۰٪ به زبان انگلیسی در انکوباتورها.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartupFrancePage;
