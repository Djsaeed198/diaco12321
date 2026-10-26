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
  Search,
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

export const JobSeekerDenmarkPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای جستجوی کار دانمارک ۲۰۲۶ | لیست مشاغل مورد نیاز و کارت تاسیس (SIRI Denmark)',
    description:
      'راهنمای کامل ویزای کاریابی و فرصت‌های شغلی دانمارک ۲۰۲۶؛ لیست مشاغل مهارتی مثبت (Positive List)، کارت تاسیس (Establishment Card)، فرآیند اداره SIRI دانمارک با دیاکو.',
    canonical: '/guides/jobseeker-denmark',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای جستجوی کار دانمارک',
      'کاریابی در دانمارک ۲۰۲۶',
      'Denmark Positive List',
      'اداره مهاجرت دانمارک SIRI',
      'Establishment Card دانمارک',
      'مهاجرت کاری به کپنهاگ',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/jobseeker-denmark#article',
          headline: 'راهنمای جامع ویزای جستجوی کار و لیست مشاغل مورد نیاز دانمارک ۲۰۲۶',
          description:
            'بررسی مسیرهای کاریابی دانمارک توسط اداره SIRI، لیست مشاغل برای افراد تحصیل‌کرده و نیروهای فنی، حداقل حقوق Pay Limit Scheme و تبدیل به اقامت دائم.',
          image: [
            'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
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
            <span>ویزای جستجوی کار</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">ویزای جستجوی کار دانمارک</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-300 mb-4">
              <Search className="h-4 w-4 text-red-400" />
              SIRI Denmark — برنامه‌های ورود و کاریابی دانمارک ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              ویزای جستجوی کار دانمارک ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-red-400">
                (Establishment & Positive List)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              دانمارک پیشرفته‌ترین اقتصاد حوزه نوردیک را با بالاترین استانداردهای توازن کار و زندگی (Work-Life Balance)
              دارد. دولت دانمارک از طریق «لیست مثبت» (Positive List) برای مشاغل با تحصیلات عالی و کارهای مهارتی،
              تسهیلات ویژه‌ای را جهت ورود و استخدام متخصصان مهندسی، فناوری اطلاعات، علوم پایه و بهداشت فراهم آورده است.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">لیست مثبت</div>
                <div className="text-[11px] text-slate-300 mt-1">مشاغل اولویت‌دار دانمارک</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-red-300">طرح Pay Limit</div>
                <div className="text-[11px] text-slate-300 mt-1">مسیر مستقیم با کف حقوق مشخص</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">اقامت خانواده</div>
                <div className="text-[11px] text-slate-300 mt-1">حق کار کامل برای همسر</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                بررسی انطباق رشته با لیست مثبت دانمارک
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
                src="https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1000&q=80"
                alt="دانمارک کپنهاگ کاریابی"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                  <Building2 className="h-4 w-4" />
                  آژانس استخدام بین‌المللی دانمارک (SIRI)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  ارزیابی سریع پرونده‌های استخدامی در سامانه آنلاین New to Denmark و صدور اجازه اقامت و کار
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول کاریابی دانمارک
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'طرح حداقل حقوق (Pay Limit Scheme) دانمارک چیست؟',
              a: 'در این طرح اگر متقاضی قراردادی با حقوق سالانه بالاتر از حدنصاب مصوب دولت دانمارک (حدود ۳۷۵,۰۰۰ تا ۵۰۰,۰۰۰ کرون در سال) منعقد کند، بدون نیاز به تطابق با لیست مثبت ویزای کاری دریافت می‌نماید.',
            },
            {
              q: 'آیا برای کار در دانمارک یادگیری زبان دانمارکی الزامی است؟',
              a: 'در شرکت‌های بین‌المللی و حوزه‌های فناوری و مهندسی زبان انگلیسی زبان کاری غالب است؛ با این وجود شهرداری‌های دانمارک دوره‌های زبان دانمارکی را به صورت رایگان به متقاضیان ارائه می‌دهند.',
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

export default JobSeekerDenmarkPage;
