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

export const RealEstateAustriaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useSeo({
    title: 'خرید ملک در اتریش ۲۰۲۶ | سرمایه‌گذاری ملکی در وین و زالتسبورگ با وکلای محلی',
    description:
      'راهنمای حقوقی خرید ملک در اتریش ۲۰۲۶؛ تاییدیه کمیسیون اراضی شهرداری (Grundverkehrsbehörde)، استعلام دفتر ثبت اسناد (Grundbuch)، هزینه‌های جانبی و مالیات انتقال سند با نظارت دفتر وین دیاکو.',
    canonical: '/guides/realestate-austria',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'خرید ملک در اتریش ۲۰۲۶',
      'سرمایه گذاری ملکی وین',
      'کمیسیون اراضی Grundverkehr اتریش',
      'سند ملک اتریش Grundbuch',
      'دفتر وکالت وین هلدینگ دیاکو',
      'خرید آپارتمان در سالزبورگ',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/realestate-austria#article',
          headline: 'راهنمای جامع خرید ملک و سرمایه‌گذاری املاک در اتریش ۲۰۲۶',
          description:
            'بررسی شرایط تملک املاک برای اتباع غیراروپایی در اتریش، نحوه اخذ مجوز کمیسیون استانی، ساختار مالیاتی (Grunderwerbsteuer ۳.۵٪) و همراهی وکیل در دفتر اسناد رسمی (Notar) وین.',
          image: [
            'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
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

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+43 688 976 3256');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

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
            <span className="text-amber-300 font-bold">خرید ملک در اتریش</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <Home className="h-4 w-4 text-amber-400" />
              Grundbuch Austria — سرمایه‌گذاری امن املاک در اتریش ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              خرید ملک در اتریش ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-yellow-500">
                (وین و زالتسبورگ)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              بازار املاک اتریش به عنوان یکی از پایدارترین و کم‌ریسک‌ترین بازارهای دارایی در جهان شناخته می‌شود. به دلیل
              حساسیت‌های قانونی اتریش برای خریداران غیراروپایی (Drittstaatsangehörige)، خرید آپارتمان یا ویلا نیازمند
              اخذ مجوز رسمی کمیسیون معاملات اراضی شهرداری (Grundverkehrsbehörde) است. وکلای رسمی دفتر وین هلدینگ
              دیاکو کلیه مراحل از انتخاب ملک، استعلام پاک بودن سند (Grundbuchauszug) تا انتقال قطعی را با تضمین حقوقی مدیریت می‌کنند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">دفتر وین دیاکو</div>
                <div className="text-[11px] text-slate-300 mt-1">مشاوره حضوری در قلب وین</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-yellow-400">سند تک‌برگ قطعی</div>
                <div className="text-[11px] text-slate-300 mt-1">ثبت در سامانه رسمی Grundbuch</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">بازدهی پایدار</div>
                <div className="text-[11px] text-slate-300 mt-1">رشد ارزش یورویی سرمایه</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                مشاوره سرمایه‌گذاری ملکی در اتریش
              </button>
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                تماس با وکیل ملکی وین دیاکو
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=80"
                alt="وین اتریش سرمایه‌گذاری ملک"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Building2 className="h-4 w-4" />
                  حساب امانی وکیل اتریشی (Treuhandkonto)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  وجه معامله تا زمان تایید نهایی شهرداری و ثبت رسمی سند در حساب امانی امین وکیل مسدود باقی می‌ماند تا امنیت ۱۰۰٪ سرمایه شما حفظ گردد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول خرید ملک در اتریش
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'آیا با خرید صرف ملک در اتریش می‌توان اقامت این کشور را گرفت؟',
              a: 'خرید ملک در اتریش به تنهایی ویزای طلایی خودکار ندارد؛ اما داشتن سند ملکی یکی از قوی‌ترین اهرم‌ها جهت تسهیل پرونده‌های تمکن مالی، ثبت شرکت یا اخذ ویزای مولتی‌پل شینگن است.',
            },
            {
              q: 'هزینه‌های جانبی خرید ملک در اتریش چقدر است؟',
              a: 'مالیات انتقال ملک (Grunderwerbsteuer) ۳.۵٪، هزینه ثبت در دفتر اسناد رسمی (Grundbuch) ۱.۱٪، دستمزد محضر و دفتر اسناد رسمی حدود ۱.۵ تا ۲٪ و کمیسیون آژانس املاک معتبر ۳٪ است.',
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

export default RealEstateAustriaPage;
