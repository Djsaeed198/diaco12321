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
  Landmark,
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

export const FinancialFrancePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'اقامت تمکن مالی فرانسه ۲۰۲۶ | ویزای ویزیتور و خودحمایتی (Carte de Séjour Visiteur)',
    description:
      'راهنمای کامل اقامت تمکن مالی فرانسه ۲۰۲۶ (ویزای Visiteur)؛ اثبات درآمد سالانه معادل حداقل دستمزد SMIC (حدود ۱۸,۰۰۰ تا ۲۵,۰۰۰ یورو سالانه)، تعهد عدم کار در فرانسه، اقامت در پاریس، نیس یا لیون با دیاکو.',
    canonical: '/guides/financial-france',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تمکن مالی فرانسه ۲۰۲۶',
      'ویزای ویزیتور فرانسه Visiteur',
      'اقامت خودحمایتی فرانسه',
      'حداقل درآمد تمکن مالی فرانسه SMIC',
      'اقامت بدون نیاز به کار در فرانسه',
      'مهاجرت خانوادگی به فرانسه با تمکن',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/financial-france#article',
          headline: 'راهنمای جامع اقامت تمکن مالی فرانسه ۲۰۲۶ (ویزای Visiteur)',
          description:
            'بررسی قوانین کد مهاجرت فرانسه (CESEDA)، شروط تمکن مالی بانکی، مسکن معتبر در فرانسه، بیمه درمانی خصوصی و تمدید سالانه تا اخذ اقامت ۱۰ ساله Carte de résident.',
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
            <span>تمکن مالی (خودحمایتی)</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">تمکن مالی فرانسه</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 mb-4">
              <Landmark className="h-4 w-4 text-indigo-400" />
              Carte de Séjour Visiteur — اقامت بازدیدکننده و تمکن مالی فرانسه ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              اقامت تمکن مالی فرانسه ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-indigo-400">
                (ویزای Visiteur فرانسه)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              فرانسه مهد هنر، فرهنگ، دانشگاه‌ها و زندگی باشکوه اروپایی است. طبق قانون اقامت فرانسه (CESEDA)، اقامت
              ویزیتور (Visiteur) به متقاضیانی اعطا می‌شود که با اثبات منابع مالی مستقل و کافی در خارج از فرانسه، قصد
              دارند بدون اشتغال در بازار کار محلی، در پاریس، شهرهای ساحلی کوت دازور یا سایر مناطق زیبای فرانسه زندگی کنند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۱,۸۰۰ €</div>
                <div className="text-[11px] text-slate-300 mt-1">حداقل درآمد ماهانه (SMIC)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-indigo-300">بدون آزمون زبان</div>
                <div className="text-[11px] text-slate-300 mt-1">معاف از مدرک فرانسه اولیه</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">پوشش خانواده</div>
                <div className="text-[11px] text-slate-300 mt-1">تحصیل فرزندان در مدارس فرانسه</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی شانس ویزای ویزیتور فرانسه
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
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80"
                alt="پاریس فرانسه اقامت ویزیتور تمکن مالی"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                  <Building2 className="h-4 w-4" />
                  اداره استان (Préfecture) در فرانسه
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  صدور ویزای ورود بلندمدت VLS-TS، تاییدیه آنلاین اداره مهاجرت OFII و تمدیدهای سالانه در استان محل سکونت
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول تمکن مالی فرانسه
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'آیا برای ویزای ویزیتور فرانسه ارائه اجاره‌نامه یا سند مسکن در فرانسه الزامی است؟',
              a: 'بله. متقاضی در زمان مراجعه به سفارت فرانسه باید مدرک اقامتگاه مسکونی قانونی (قرارداد اجاره رسمی حداقل ۱ ساله، سند مالکیت یا برگه دعوت‌نامه رسمی تعهد سکونت) ارائه دهد.',
            },
            {
              q: 'چه زمانی می‌توان به اقامت ۱۰ ساله فرانسه (Carte de résident) دست یافت؟',
              a: 'پس از ۵ سال اقامت متوالی و تمدید قانونی با پرداخت مالیات و داشتن تسلط مقدماتی به زبان فرانسوی، متقاضی می‌تواند درخواست کارت اقامت دائم ۱۰ ساله یا شهروندی فرانسه را ثبت نماید.',
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

export default FinancialFrancePage;
