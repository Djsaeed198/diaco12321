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
  GraduationCap,
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

export const AcademicNetherlandsPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'تحصیل در هلند ۲۰۲۶ | پذیرش دانشگاه‌های انگلیسی‌زبان آمستردام و دلفت (TU Delft)',
    description:
      'راهنمای کامل تحصیل در دانشگاه‌های هلند ۲۰۲۶؛ بیش از ۲,۱۰۰ رشته ۱۰۰٪ انگلیسی‌زبان، رتبه‌بندی زیر ۱۰۰ جهانی، ویزای ۱ ساله کاریابی فارغ‌التحصیلان (Zoekjaar / Orientation Year) با دیاکو.',
    canonical: '/guides/academic-netherlands',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تحصیل در هلند ۲۰۲۶',
      'دانشگاه های انگلیسی زبان هلند',
      'پذیرش دانشگاه دلفت TU Delft',
      'دانشگاه آمستردام هلند',
      'ویزای جستجوی کار Zoekjaar هلند',
      'ویزای تحصیلی هلند IND',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/academic-netherlands#article',
          headline: 'راهنمای جامع تحصیل در مقاطع کارشناسی و ارشد در دانشگاه‌های هلند ۲۰۲۶',
          description:
            'بررسی سیستم آموزش عالی هلند، فرآیند اپلای در سامانه Studielink، ویزای تحصیلی اداره مهاجرت هلند (IND) و اقامت کاری Orientation Year برای متخصصان برتر.',
          image: [
            'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
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
            <span>تحصیل در دانشگاه (Academic)</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">مهاجرت تحصیلی به هلند</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold text-orange-300 mb-4">
              <GraduationCap className="h-4 w-4 text-orange-400" />
              Studielink & IND — آموزش عالی بین‌المللی هلند ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              تحصیل در دانشگاه‌های هلند ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-orange-400">
                (آمستردام و دلفت)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              هلند به عنوان انگلیسی‌زبان‌ترین کشور غیرانگلیسی دنیا، بالاترین تنوع دوره‌های دانشگاهی بین‌المللی در قاره
              اروپا را دارد. دانشگاه‌های نامداری چون TU Delft، دانشگاه آمستردام (UvA) و اراسموس روتردام، به دلیل
              ارتباط تنگاتنگ با غول‌های فناوری اروپایی، فرصت‌های شغلی کم‌نظیری ایجاد کرده‌اند. هلند پس از فارغ‌التحصیلی
              ویزای ۱ ساله جستجوی کار (Zoekjaar) بدون نیاز به اسپانسر اعطا می‌کند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۱۰۰٪ انگلیسی</div>
                <div className="text-[11px] text-slate-300 mt-1">بیش از ۲,۰۰۰ دوره بین‌المللی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-orange-400">ویزای Zoekjaar</div>
                <div className="text-[11px] text-slate-300 mt-1">۱ سال اجازه کار آزاد پس از فارغ‌التحصیلی</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">رنکینگ برتر</div>
                <div className="text-[11px] text-slate-300 mt-1">حضور در جمع ۱۰۰ دانشگاه برتر دنیا</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی رزومه جهت پذیرش دانشگاه‌های هلند
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
                src="https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1000&q=80"
                alt="هلند آمستردام دانشگاه دلفت"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-300">
                  <Building2 className="h-4 w-4" />
                  اداره مهاجرت و تابعیت هلند (IND)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  صدور سریع ویزای ورود MVV و کارت اقامت دانشجویی VVR توسط خود دانشگاه و افتتاح حساب بانکی هلندی
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول تحصیل در هلند
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'نمره زبان مورد نیاز برای دانشگاه‌های هلند چقدر است؟',
              a: 'معمولاً برای مقطع کارشناسی نمره آیلتس ۶.۰ و برای مقطع کارشناسی ارشد نمره آیلتس ۶.۵ تا ۷.۰ (یا تافل معادل) مورد نیاز است.',
            },
            {
              q: 'شرایط تبدیل ویزای جستجوی کار Zoekjaar به اقامت مهاجرتی چگونه است؟',
              a: 'در طول یک سال ویزای جهت‌یابی (Orientation Year)، متقاضی می‌تواند با هر کارفرمایی قرارداد ببندد و با حداقل حقوق کاهش‌یافته ویژه فارغ‌التحصیلان، اقامت نیروی کار ماهر (Highly Skilled Migrant) را اخذ کند.',
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

export default AcademicNetherlandsPage;
