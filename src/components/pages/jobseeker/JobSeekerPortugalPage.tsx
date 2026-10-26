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

export const JobSeekerPortugalPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای جستجوی کار پرتغال ۲۰۲۶ | ویزای کاریابی ۱۲۰ روزه (Portugal Job Seeker Visa)',
    description:
      'راهنمای کامل ویزای جستجوی کار پرتغال ۲۰۲۶ (Visto de procura de trabalho)؛ اعتبار ۱۲۰ روزه با تمدید ۶۰ روزه، ثبت‌نام در سامانه اشتغال پرتغال (IEFP)، تمکن مالی ۳ ماهه و تبدیل به اقامت کاری با دیاکو.',
    canonical: '/guides/jobseeker-portugal',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای جستجوی کار پرتغال ۲۰۲۶',
      'Portugal Job Seeker Visa',
      'ثبت نام در سامانه IEFP پرتغال',
      'ویزای کاریابی ۱۲۰ روزه پرتغال',
      'تمکن مالی ویزای کار پرتغال',
      'تبدیل ویزای کاریابی به اقامت AIMA',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/jobseeker-portugal#article',
          headline: 'راهنمای جامع ویزای کاریابی پرتغال ۲۰۲۶: فرآیند IEFP و اخذ اقامت شینگن',
          description:
            'بررسی قانون جدید مهاجرت پرتغال برای ویزای جستجوی کار ۱۲۰ روزه، تمکن مالی معادل ۳ برابر حداقل حقوق پرتغال (حدود ۲,۵۰۰ یورو) و اخذ اقامت ۲ ساله کاری در آژانس AIMA لیسبون.',
          image: [
            'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80',
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
            <span className="text-amber-300 font-bold">ویزای جستجوی کار پرتغال</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300 mb-4">
              <Search className="h-4 w-4 text-emerald-400" />
              IEFP & AIMA — ویزای جستجوی کار پرتغال ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              ویزای جستجوی کار پرتغال ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-emerald-400">
                (Portugal Job Seeker)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              پرتغال یکی از امن‌ترین و خوش‌آب‌وهواترین کشورهای اروپا است که با راه‌اندازی ویزای ویژه جستجوی کار، درب‌های
              خود را به روی متقاضیان بین‌المللی گشوده است. این ویزا به افراد اجازه می‌دهد ۱۲۰ روز (با امکان تمدید ۶۰
              روزه) در لیسبون، پورتو و سراسر پرتغال به دنبال کار بگردند و بلافاصله پس از بستن قرارداد کاری، کارت اقامت
              ۲ ساله شینگن دریافت کنند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۱۲۰ + ۶۰ روز</div>
                <div className="text-[11px] text-slate-300 mt-1">مدت زمان جستجوی کار قانونی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-300">تمکن ۲,۵۰۰ €</div>
                <div className="text-[11px] text-slate-300 mt-1">حداقل تمکن بانکی ۳ ماهه</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-blue-400">اقامت ۲ ساله</div>
                <div className="text-[11px] text-slate-300 mt-1">پس از امضای قرارداد کاری</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی شانس ویزای کاریابی پرتغال
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
                src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=80"
                alt="پرتغال لیسبون کاریابی"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <Building2 className="h-4 w-4" />
                  سامانه رسمی اشتغال پرتغال (IEFP)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  ثبت رزومه و تکمیل فرم ابراز تمایل به کار در پورتال IEFP قبل از درخواست ویزا در سفارت و ثبت وقت اداری در AIMA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول کاریابی پرتغال
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'چه مدارکی برای اخذ ویزای کاریابی پرتغال لازم است؟',
              a: 'گواهی ثبت‌نام در سامانه IEFP پرتغال، اثبات تمکن مالی معادل ۳ ماه حداقل حقوق پرتغال، بلیت رفت و برگشت (یا تمکن بلیت)، بیمه مسافرتی معتبر و گواهی عدم سوءپیشینه.',
            },
            {
              q: 'آیا برای این ویزا مدرک زبان پرتغالی اجباری است؟',
              a: 'خیر. داشتن مدرک زبان پرتغالی اجباری نیست، اما تسلط به زبان انگلیسی و آشنایی مقدماتی با پرتغالی شانس یافتن شغل سریع‌تر را بسیار بالا می‌برد.',
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

export default JobSeekerPortugalPage;
