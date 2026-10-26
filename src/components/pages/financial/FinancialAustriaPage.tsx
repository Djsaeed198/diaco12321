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

export const FinancialAustriaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useSeo({
    title: 'اقامت تمکن مالی اتریش ۲۰۲۶ | خودحمایتی وین (Niederlassungsbewilligung)',
    description:
      'راهنمای کامل اقامت تمکن مالی (خودحمایتی) اتریش ۲۰۲۶ طبق بند ۴۴ قانون اقامت NAG؛ شرایط درآمد ثابت ماهانه (سود سهام، اجاره، بازنشستگی)، سپرده بانکی، سهمیه روز اول سال کاری در اداره MA35 وین با نظارت مستقیم دفتر وین دیاکو.',
    canonical: '/guides/financial-austria',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تمکن مالی اتریش ۲۰۲۶',
      'اقامت خودحمایتی اتریش',
      'Niederlassungsbewilligung ausgenommen Erwerbstätigkeit',
      'سهمیه تمکن مالی اتریش وین',
      'حداقل درآمد تمکن مالی اتریش',
      'دفتر وین هلدینگ دیاکو',
      'مهاجرت بدون کار به اتریش',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/financial-austria#article',
          headline: 'راهنمای جامع اقامت تمکن مالی و خودحمایتی اتریش ۲۰۲۶: شرایط، سهمیه روز اول سال و فرآیند وین',
          description:
            'بررسی قانون NAG §44 اتریش، اثبات درآمد غیرفعال ماهانه، شرط مسکن رسمی در اتریش، مدرک آلمانی A1 و رزرو سهمیه دقیق در ساعات اولیه اولین روز کاری ژانویه توسط وکلای اتریشی دیاکو.',
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
            <span>تمکن مالی (خودحمایتی)</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">تمکن مالی اتریش</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <Landmark className="h-4 w-4 text-amber-400" />
              NAG §44 — اقامت خودحمایتی و تمکن مالی اتریش ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              اقامت تمکن مالی اتریش ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-amber-500">
                (خودحمایتی وین)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              اقامت تمکن مالی اتریش (Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit) یکی از معتبرترین و
              لوکس‌ترین اقامت‌های اروپایی برای متقاضیانی است که دارای درآمد ماهانه مستقل و غیرفعال (مانند سود سپرده بانکی،
              اجاره املاک، حقوق بازنشستگی یا سود سهام) هستند و بدون نیاز به اشتغال در خاک اتریش، قصد دارند در بالاترین
              سطح رفاه شهری در وین، سالزبورگ یا اینسبروک زندگی کنند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">سهمیه اول سال</div>
                <div className="text-[11px] text-slate-300 mt-1">ثبت دقیق ظرفیت توسط دفتر وین</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-400">۲,۳۰۰ €</div>
                <div className="text-[11px] text-slate-300 mt-1">حداقل درآمد غیرفعال مجرد</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">تمام اعضای خانواده</div>
                <div className="text-[11px] text-slate-300 mt-1">کارت اقامت همزمان همسر و فرزندان</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                بررسی پرونده و رزرو سهمیه اتریش
              </button>
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                ارتباط با دفتر وکالت وین دیاکو
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=80"
                alt="وین اتریش تمکن مالی خودحمایتی"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Building2 className="h-4 w-4" />
                  حضور فیزیکی وکلای دیاکو در اداره MA35 وین
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  دفتر رسمی دیاکو در منطقه ۲ وین (Ausstellungsstraße) مستقیماً پرونده‌های تمکن مالی را از داخل خاک اتریش ثبت و تا تحویل کارت پیگیری می‌کند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول تمکن مالی اتریش
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'چرا سهمیه تمکن مالی اتریش نیازمند اقدام فوری در روز اول کاری سال است؟',
              a: 'دولت اتریش سالانه ظرفیت مشخص و محدودی (حدود چندصد پرونده برای کل کشور) جهت اقامت تمکن مالی تعیین می‌کند که در ساعات اولیه اولین روز کاری ماه ژانویه تکمیل می‌شود. وکلای وین دیاکو از ماه‌ها قبل پرونده را بسته‌بندی و در ثانیه‌های نخست اقدام می‌کنند.',
            },
            {
              q: 'آیا دارندگان این اقامت اجازه کار در اتریش را دارند؟',
              a: 'خیر. این اقامت بدون اجازه کار محلی (ausgenommen Erwerbstätigkeit) صادر می‌شود؛ اما متقاضی می‌تواند به عنوان سهامدار در شرکت‌ها سرمایه‌گذاری کند و از سود تجاری خود بهره‌مند شود.',
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

export default FinancialAustriaPage;
