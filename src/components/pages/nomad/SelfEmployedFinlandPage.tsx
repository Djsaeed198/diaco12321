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

export const SelfEmployedFinlandPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'اقامت خوداشتغالی فنلاند ۲۰۲۶ | ویزای کارآفرینان و فریلنسرها (Entrepreneur RP)',
    description:
      'راهنمای کامل اقامت خوداشتغالی فنلاند ۲۰۲۶؛ تاییدیه دو مرحله‌ای مرکز ELY-keskus و اداره مهاجرت فنلاند (Migri)، زندگی در شادترین کشور جهان، آموزش رایگان فرزندان و اقامت دائم ۴ ساله با دیاکو.',
    canonical: '/guides/selfemployed-finland',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'اقامت خوداشتغالی فنلاند',
      'ویزای کارآفرینی فنلاند ۲۰۲۶',
      'Finland Entrepreneur Residence Permit',
      'تاییدیه ELY فنلاند',
      'اداره مهاجرت Migri فنلاند',
      'اقامت فریلنسری هلسینکی',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/selfemployed-finland#article',
          headline: 'راهنمای جامع اقامت خوداشتغالی و کارآفرینی فنلاند ۲۰۲۶',
          description:
            'بررسی فرآیند ارزیابی اقتصادی کسب‌وکار توسط مرکز ELY، شرایط سودآوری بیزینس، اخذ اقامت دائم فنلاند پس از ۴ سال و پاسپورت معتبر فنلاند پس از ۵ سال.',
          image: [
            'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200&q=80',
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
            <span className="text-amber-300 font-bold">اقامت خوداشتغالی فنلاند</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-300 mb-4">
              <Laptop className="h-4 w-4 text-blue-400" />
              Migri & ELY — اقامت کارآفرین و خوداشتغالی فنلاند ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              اقامت خوداشتغالی فنلاند ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-blue-400">
                (Finnish Entrepreneur RP)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              فنلاند برای هفت سال متوالی به‌عنوان شادترین کشور جهان شناخته شده و از پیشرفته‌ترین سیستم آموزشی و رفاهی
              برخوردار است. فریلنسرها، دارندگان تخصص‌های فنی و صاحبان مشاغل انفرادی (Toiminimi) می‌توانند از طریق طرح
              اقامت کارآفرین و خوداشتغالی، اقامت رسمی شینگن فنلاند را برای خود و تمامی اعضای خانواده دریافت کنند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۴ سال دائم</div>
                <div className="text-[11px] text-slate-300 mt-1">مسیر سریع اقامت دائم اسکاندیناوی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-blue-300">آموزش رایگان</div>
                <div className="text-[11px] text-slate-300 mt-1">مدارس استاندارد جهانی برای فرزندان</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">بدون زبان اولیه</div>
                <div className="text-[11px] text-slate-300 mt-1">امکان اقدام با زبان انگلیسی</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی طرح خوداشتغالی فنلاند
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
                src="https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1000&q=80"
                alt="هلسینکی فنلاند خوداشتغالی"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                  <Building2 className="h-4 w-4" />
                  فرآیند ۲ مرحله‌ای ELY و Migri
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  ارزیابی توجیه اقتصادی و سودآوری بیزینس توسط مرکز ELY و سپس صدور کارت اقامت شینگن نوع A توسط اداره مهاجرت فنلاند (Migri)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول خوداشتغالی فنلاند
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'کسب‌وکار خوداشتغالی در فنلاند باید چه میزان سودآوری نشان دهد؟',
              a: 'درآمد خالص ماهانه متقاضی از محل فعالیت باید حداقل هزینه‌های زندگی معادل حدود ۱,۳۰۰ تا ۱,۵۰۰ یورو در ماه را پوشش دهد تا تاییدیه ELY صادر شود.',
            },
            {
              q: 'آیا همسر متقاضی حق اشتغال نامحدود در فنلاند خواهد داشت؟',
              a: 'بله. همسر متقاضی کارت اقامت با حق کار کامل و نامحدود در هر شغل یا شرکتی در سراسر فنلاند دریافت می‌کند.',
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

export default SelfEmployedFinlandPage;
