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

export const NomadDubaiPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای کار از راه دور دبی ۲۰۲۶ | اقامت دیجیتال نوماد امارات (Virtual Working Visa)',
    description:
      'راهنمای کامل ویزای دورکاری دبی ۲۰۲۶ (Dubai Virtual Working Programme)؛ حداقل درآمد ۳,۵۰۰ دلار در ماه، مالیات بر درآمد صفر درصد، دریافت آی‌دی کارت امارات (Emirates ID) و افتتاح حساب بانکی بین‌المللی با دیاکو.',
    canonical: '/guides/nomad-dubai',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای دیجیتال نوماد دبی',
      'کار از راه دور امارات ۲۰۲۶',
      'Dubai Virtual Working Visa',
      'حداقل حقوق ویزای دورکاری دبی',
      'مالیات صفر درصد دبی',
      'Emirates ID برای دورکاران',
      'افتتاح حساب بانکی در دبی',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/nomad-dubai#article',
          headline: 'راهنمای جامع ویزای کار از راه دور و دیجیتال نوماد دبی ۲۰۲۶',
          description:
            'بررسی برنامه دورکاری دبی، شرایط درآمد ماهانه ۳,۵۰۰ دلاری، فیش حقوقی و قرارداد کارفرمایی خارجی، مزایای افتتاح حساب در بانک‌های اماراتی و صدور Emirates ID یک‌ساله قابل تمدید.',
          image: [
            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
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
            <span className="text-amber-300 font-bold">دیجیتال نوماد امارات (دبی)</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <Laptop className="h-4 w-4 text-amber-400" />
              Dubai Virtual Working — اقامت کار از راه دور امارات ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              ویزای دیجیتال نوماد دبی ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-yellow-500">
                (Dubai Virtual Working Visa)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              دبی یکی از پیشرفته‌ترین شهرهای هوشمند جهان با زیرساخت‌های مخابراتی ۵G فوق‌سریع و کیفیت زندگی لوکس است.
              برنامه «ویزای کار مجازی دبی» به مدیران، فریلنسرها و متخصصانی که درآمد دلاری یا یورویی از خارج از امارات
              دارند این امکان را می‌دهد که بدون نیاز به کفیل یا شریک محلی، کارت اقامت امارات (Emirates ID) دریافت کرده و
              از معافیت ۱۰۰٪ مالیات بر درآمد بهره‌مند شوند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۳,۵۰۰ $</div>
                <div className="text-[11px] text-slate-300 mt-1">حداقل درآمد ماهانه اثبات‌شده</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-yellow-400">۰٪ مالیات</div>
                <div className="text-[11px] text-slate-300 mt-1">بدون مالیات بر درآمد شخصی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">Emirates ID</div>
                <div className="text-[11px] text-slate-300 mt-1">افتتاح حساب بانکی بین‌المللی</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی فوری شرایط نوماد دبی
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
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80"
                alt="امارات دبی برج خلیفه دیجیتال نوماد"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Building2 className="h-4 w-4" />
                  اداره اقامت و امور بیگانگان دبی (GDRFA)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  صدور سریع ویزا ظرف ۵ تا ۷ روز کاری، انجام تست مدیکال در دبی، صدور کارت بیومتریک و همراهی در افتتاح حساب بانکی اماراتی
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول ویزای دورکاری دبی
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'آیا دارندگان ویزای دورکاری دبی می‌توانند حساب بانکی در امارات باز کنند؟',
              a: 'بله. با صدور Emirates ID رسمی، متقاضی می‌تواند در معتبرترین بانک‌های امارات (مانند ENBD، FAB، Mashreq) حساب بانکی ارزی با کارت مسترکارت یا ویزا افتتاح نماید.',
            },
            {
              q: 'آیا برای این ویزا اجاره سالانه مسکن در دبی الزامی است؟',
              a: 'خیر. متقاضیان در ابتدای ورود می‌توانند با رزرو هتل یا قراردادهای اقامت موقت درخواست خود را ثبت نمایند و پس از صدور کارت اقامت در صورت تمایل قرارداد اجاره مسکن Ejari منعقد کنند.',
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

export default NomadDubaiPage;
