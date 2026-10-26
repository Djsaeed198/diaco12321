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

export const JobSeekerGermanyPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'کارت شانس آلمان ۲۰۲۶ (Chancenkarte) | ویزای جدید جستجوی کار آلمان',
    description:
      'راهنمای کامل کارت شانس آلمان ۲۰۲۶ بر مبنای سیستم امتیازبندی (Chancenkarte)؛ کسب حداقل ۶ امتیاز، زبان A1 آلمانی یا B2 انگلیسی، اجازه کار پاره‌وقت ۲۰ ساعت در هفته و تبدیل به بلوکارت با دیاکو.',
    canonical: '/guides/jobseeker-germany',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'کارت شانس آلمان ۲۰۲۶',
      'Chancenkarte آلمان',
      'ویزای جستجوی کار آلمان',
      'جدول امتیازات کارت شانس',
      'کار پاره وقت در کارت شانس',
      'حساب بلوکه آلمان ۲۰۲۶',
      'تبدیل کارت شانس به بلوکارت',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/jobseeker-germany#article',
          headline: 'راهنمای جامع کارت شانس کاریابی آلمان ۲۰۲۶ (Chancenkarte): شرایط و جدول امتیازات',
          description:
            'بررسی قانون جدید مهاجرت ماهر آلمان (Fachkräfteeinwanderungsgesetz)، جدول امتیازدهی کارت شانس، تمکن مالی ماهانه حدود ۱,۰۲۷ یورو در حساب مسدود و شرایط اشتغال آزمایشی.',
          image: [
            'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
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
            <span className="text-amber-300 font-bold">کارت شانس آلمان (Chancenkarte)</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300 mb-4">
              <Search className="h-4 w-4 text-emerald-400" />
              قانون مهاجرت نیروی متخصص ۲۰۲۶ — Chancenkarte Germany
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              کارت شانس آلمان ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-emerald-400">
                (Chancenkarte)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              کارت شانس (Chancenkarte) انقلابی‌ترین ویزای ورود به بازار کار آلمان است. این سیستم بر پایه امتیازات سن،
              مدرک تحصیلی، سابقه کاری و تسلط به زبان طراحی شده و به متخصصان امکان می‌دهد ۱ سال بدون نیاز به داشتن
              جاب‌آفر اولیه وارد آلمان شوند، تا ۲۰ ساعت در هفته کار پاره‌وقت انجام دهند و پس از عقد قرارداد کاری به کارت آبی
              (Blue Card) یا اقامت کاری متخصصان دست یابند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">حداقل ۶ امتیاز</div>
                <div className="text-[11px] text-slate-300 mt-1">از جدول رسمی امتیازدهی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-300">۲۰ ساعت کار</div>
                <div className="text-[11px] text-slate-300 mt-1">اجازه کار پاره‌وقت در طول جستجو</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-blue-400">اعتبار ۱ ساله</div>
                <div className="text-[11px] text-slate-300 mt-1">قابل تمدید تا ۲ سال در صورت نیاز</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                محاسبه آنلاین امتیاز کارت شانس شما
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
                src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1000&q=80"
                alt="آلمان برلین کاریابی کارت شانس"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <Building2 className="h-4 w-4" />
                  معادل‌سازی مدارک در ZAB و Anabin
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  تایید رسمی مدرک تحصیلی حداقل ۲ ساله دانشگاهی یا فنی‌حرفه‌ای در پلتفرم آلمانی و افتتاح حساب مسدود Sperrkonto
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول کارت شانس آلمان
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'چه شروط اولیه‌ای برای ورود به سیستم امتیازبندی کارت شانس لازم است؟',
              a: 'متقاضی باید مدرک تحصیلی یا فنی‌حرفه‌ای حداقل ۲ ساله معتبر در کشور مبدا به همراه تسلط به زبان آلمانی در سطح حداقل A1 یا زبان انگلیسی در سطح B2 داشته باشد.',
            },
            {
              q: 'آیا با پیدا کردن کار می‌توان مستقیماً بدون بازگشت به ایران اقامت را تمدید کرد؟',
              a: 'بله. به محض امضای قرارداد کاری منطبق با تخصص، نوع ویزا در اداره اتباع خارجی آلمان (Ausländerbehörde) بدون خروج از خاک آلمان به اقامت کاری یا بلوکارت تبدیل خواهد شد.',
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

export default JobSeekerGermanyPage;
