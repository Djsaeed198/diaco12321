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

export const FinancialSpainPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'اقامت تمکن مالی اسپانیا ۲۰۲۶ | ویزای غیرانتفاعی (Residencia No Lucrativa)',
    description:
      'راهنمای کامل تمکن مالی اسپانیا ۲۰۲۶ (Non-Lucrative Visa)؛ حداقل درآمد ماهانه ۴۰۰٪ شاخص IPREM (۲,۴۰۰ یورو برای سرپرست)، بدون الزام به کار یا سرمایه‌گذاری پرریسک، بدون مدرک زبان اسپانیایی با پشتیبانی دیاکو.',
    canonical: '/guides/financial-spain',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تمکن مالی اسپانیا ۲۰۲۶',
      'اقامت خودحمایتی اسپانیا',
      'Residencia No Lucrativa',
      'شاخص IPREM اسپانیا ۲۰۲۶',
      'شرایط تمکن مالی اسپانیا',
      'اقامت بدون مدرک زبان اسپانیا',
      'ویزای اقامت غیرانتفاعی مادرید',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/financial-spain#article',
          headline: 'راهنمای جامع اقامت تمکن مالی و غیرانتفاعی اسپانیا ۲۰۲۶ (Residencia No Lucrativa)',
          description:
            'بررسی آیین‌نامه مهاجرت اسپانیا، محاسبه شاخص ۴۰۰٪ IPREM، میزان مانده‌حساب سالانه حدود ۲۹,۰۰۰ یورو برای فرد متقاضی و ۷,۲۰۰ یورو برای همراه، مدارک عدم سوءپیشینه و بیمه سینسترو.',
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
            <span>تمکن مالی (خودحمایتی)</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">تمکن مالی اسپانیا</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold text-orange-300 mb-4">
              <Landmark className="h-4 w-4 text-orange-400" />
              Non-Lucrative Visa — اقامت غیرانتفاعی و تمکن مالی اسپانیا ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              اقامت تمکن مالی اسپانیا ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-orange-400">
                (Residencia No Lucrativa)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              اسپانیا یکی از محبوب‌ترین مقاصد جهان برای زندگی با آرامش، تغذیه مدیترانه‌ای سالم و هزینه‌های زندگی
              متعادل است. برنامه اقامت غیرانتفاعی (No Lucrativa) ویژه افرادی است که مایلند بدون اشتغال در اسپانیا، با
              اتکا به دارایی‌ها و درآمدهای مستقل خود، اقامت شینگن برای خود و تمام اعضای خانواده دریافت کنند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۲,۴۰۰ €</div>
                <div className="text-[11px] text-slate-300 mt-1">حداقل درآمد ماهانه ۴۰۰٪ IPREM</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-orange-300">بدون آزمون زبان</div>
                <div className="text-[11px] text-slate-300 mt-1">بدون نیاز به مدرک اسپانیایی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">اقامت دائم ۵ ساله</div>
                <div className="text-[11px] text-slate-300 mt-1">مسیر شهروندی و پاسپورت</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                محاسبه تمکن مالی مورد نیاز برای اسپانیا
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره مستقیم با وکلای اسپانیای دیاکو
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <OptimizedImage loading="eager" fetchPriority="high"
                src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1000&q=80"
                alt="اسپانیا بارسلونا تمکن مالی"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-300">
                  <Building2 className="h-4 w-4" />
                  صدور کارت TIE در اداره پلیس خارجی‌ها
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  کارت اقامت اولیه ۱ ساله، سپس تمدیدهای ۲ ساله و دریافت اقامت دائم (Residencia de larga duración) پس از ۵ سال
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول تمکن مالی اسپانیا
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'چه منابع درآمدی برای سفارت اسپانیا قابل قبول است؟',
              a: 'اجاره‌نامه رسمی املاک و مستغلات در ایران، سود سپرده‌های بلندمدت بانکی، سود سهام و بورس، حقوق بازنشستگی و سود مشارکت در شرکت‌ها به همراه گردش ۶ ماهه حساب بانکی معتبر.',
            },
            {
              q: 'آیا تحصیل فرزندان در اسپانیا در این نوع اقامت رایگان است؟',
              a: 'بله. فرزندان دارندگان اقامت غیرانتفاعی می‌توانند در مدارس دولتی و دوزبانه اسپانیا به صورت کاملاً رایگان تحصیل نمایند.',
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

export default FinancialSpainPage;
