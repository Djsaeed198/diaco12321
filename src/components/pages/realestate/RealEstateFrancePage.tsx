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
  Home,
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

export const RealEstateFrancePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'خرید ملک در فرانسه ۲۰۲۶ | سرمایه‌گذاری املاک در پاریس و نیس با وکلای دیاکو',
    description:
      'راهنمای حقوقی خرید ملک در فرانسه ۲۰۲۶؛ فرآیند رسمی از طریق نوتار (Notaire)، مالیات اسناد رسمی، استعلامات شهری (Diagnostics) و اخذ اقامت بلندمدت شینگن با دیاکو.',
    canonical: '/guides/realestate-france',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'خرید ملک در فرانسه ۲۰۲۶',
      'سرمایه گذاری ملکی در پاریس',
      'خرید آپارتمان در نیس فرانسه',
      'دفتر اسناد رسمی Notaire فرانسه',
      'مالیات خرید ملک فرانسه',
      'اقامت فرانسه با خرید ملک',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/realestate-france#article',
          headline: 'راهنمای جامع خرید ملک و سرمایه‌گذاری املاک در فرانسه ۲۰۲۶',
          description:
            'بررسی مراحل قانونی خرید ملک در فرانسه شامل قرارداد مقدماتی (Compromis de Vente)، دوره انصراف ۱۰ روزه قانونی، انتقال وجه از طریق حساب معتمد نوتار و دریافت سند قطعی (Acte de Vente).',
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
            <span>خرید ملک و ویزای طلایی</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">خرید ملک در فرانسه</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-300 mb-4">
              <Home className="h-4 w-4 text-blue-400" />
              Notaire France — سرمایه‌گذاری معتبر املاک در فرانسه ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              خرید ملک در فرانسه ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-blue-400">
                (پاریس و ریویرا)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              فرانسه یکی از پرتقاضاترین بازارهای املاک لوکس در جهان است. پایتخت پاریس و شهرهای رویایی کوت دازور مانند
              نیس و کن، بازدهی ارزی مطمئن و ثبات سرمایه بی‌نظیری به همراه دارند. در فرانسه هیچ‌گونه محدودیتی برای تملک
              ۱۰۰٪ ملک توسط خریداران خارجی وجود ندارد و معامله تحت نظارت عالیه نوتار رسمی دادگستری (Notaire) با ایمنی کامل انجام می‌پذیرد.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">مالکیت ۱۰۰٪</div>
                <div className="text-[11px] text-slate-300 mt-1">بدون محدودیت برای اتباع خارجی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-blue-300">امنیت نوتار</div>
                <div className="text-[11px] text-slate-300 mt-1">تضمین حقوقی ثبت در فرانسه</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">تسهیل اقامت</div>
                <div className="text-[11px] text-slate-300 mt-1">پایه محکم ویزای ویزیتور و شینگن</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                مشاوره خرید املاک در فرانسه
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
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80"
                alt="فرانسه پاریس خرید آپارتمان"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                  <Building2 className="h-4 w-4" />
                  اتاق نوتارهای فرانسه (Chambre des Notaires)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  حساب امانی رسمی جهت نگهداری بیعانه و تسویه نهایی، کارشناسی انرژی و ساختمانی (DDT) و انتقال سند قانونی
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول خرید ملک در فرانسه
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'هزینه‌های جانبی نوتار و ثبت ملک در فرانسه چقدر است؟',
              a: 'هزینه‌های نوتاری و مالیات ثبت سند (Frais de notaire) برای املاک قدیمی حدود ۷ تا ۸ درصد و برای املاک نوساز کلید نخورده حدود ۲ تا ۳ درصد از بهای ملک است.',
            },
            {
              q: 'آیا خرید ملک به تنهایی منجر به اخذ کارت اقامت دائم فرانسه می‌شود؟',
              a: 'خرید ملک در فرانسه مستقیماً ویزای طلایی صادر نمی‌کند، اما به عنوان اثبات قطعی محل سکونت (Justificatif de domicile)، پرونده اقامت تمکن مالی (Visiteur) یا ویزای مولتی‌پل شینگن را تضمین می‌کند.',
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

export default RealEstateFrancePage;
