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

export const NomadCroatiaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'دیجیتال نوماد کرواسی ۲۰۲۶ | اقامت کار از راه دور ساحلی و معاف از مالیات',
    description:
      'راهنمای کامل مجوز اقامت موقت دیجیتال نوماد کرواسی ۲۰۲۶ (Digital Nomad Temporary Stay)؛ درآمد ماهانه ۲,۸۷۰ یورو، معافیت ۱۰۰٪ از مالیات بر درآمد محلی، عضویت کامل شینگن و منطقه یورو با دیاکو.',
    canonical: '/guides/nomad-croatia',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1555990538-154a4066c0d6?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'دیجیتال نوماد کرواسی',
      'ویزای نوماد کرواسی ۲۰۲۶',
      'اقامت موقت کار از راه دور کرواسی',
      'معافیت مالیاتی دیجیتال نوماد کرواسی',
      'حداقل درآمد نوماد کرواسی',
      'اقامت شینگن زاگرب و دوبروونیک',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/nomad-croatia#article',
          headline: 'راهنمای جامع اقامت دیجیتال نوماد کرواسی ۲۰۲۶: سواحل آدریاتیک و معافیت مالیاتی',
          description:
            'بررسی قانون بیگانگان کرواسی (Aliens Act) برای دورکاران، حداقل درآمد ۲,۸۷۰ یورو، مزیت عضویت رسمی کرواسی در شینگن و نحوه درخواست آنلاین در پلیس کرواسی (MUP).',
          image: [
            'https://images.unsplash.com/photo-1555990538-154a4066c0d6?auto=format&fit=crop&w=1200&q=80',
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
            <span className="text-amber-300 font-bold">دیجیتال نوماد کرواسی</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-300 mb-4">
              <Laptop className="h-4 w-4 text-cyan-400" />
              Schengen Area — اقامت ۱ ساله شینگن کرواسی ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              دیجیتال نوماد کرواسی ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-cyan-400">
                (Croatia Digital Nomad)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              با پیوستن رسمی کرواسی به حوزه شینگن و پیمان یورو، اقامت دیجیتال نوماد این کشور جذابیت دوچندانی پیدا کرده
              است. کرواسی درآمد حاصل از کار از راه دور خارجی را ۱۰۰٪ از مالیات بر درآمد محلی معاف کرده است. فریلنسرها
              و کارمندان ریموت می‌توانند از سواحل بی‌نظیر آدریاتیک، زاگرب و دوبروونیک زندگی کرده و کارت اقامت شینگن
              داشته باشند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۲,۸۷۰ €</div>
                <div className="text-[11px] text-slate-300 mt-1">حداقل درآمد ماهانه ناخالص</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-cyan-300">۰٪ مالیات</div>
                <div className="text-[11px] text-slate-300 mt-1">معافیت کامل از مالیات بر درآمد</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">الحاق خانواده</div>
                <div className="text-[11px] text-slate-300 mt-1">امکان همراهی همسر و فرزندان</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                بررسی فوری شرایط نوماد کرواسی
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
                src="https://images.unsplash.com/photo-1555990538-154a4066c0d6?auto=format&fit=crop&w=1000&q=80"
                alt="کرواسی سواحل آدریاتیک دیجیتال نوماد"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <Building2 className="h-4 w-4" />
                  اداره پلیس کرواسی (MUP)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  امکان ثبت تقاضای آنلاین در سامانه رسمی MUP، بررسی بدون نیاز به حضور اولیه و دریافت بیومتریک و کارت پس از ورود
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-white mb-6 text-center">
          پرسش‌های متداول نوماد کرواسی
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'آیا اقامت نوماد کرواسی بلافاصله قابل تمدید است؟',
              a: 'این اقامت برای ۱۲ ماه صادر می‌شود. طبق قانون کرواسی، برای درخواست مجدد نوماد باید ۶ ماه بین دو دوره فاصله باشد، مگر اینکه نوع اقامت به کارآفرینی یا تمکن مالی تغییر کند.',
            },
            {
              q: 'آیا داشتن سابقه کیفری پاک (عدم سوءپیشینه) الزامی است؟',
              a: 'بله. ارائه گواهی عدم سوءپیشینه با ترجمه رسمی و تاییدیه دادگستری و وزارت امور خارجه برای متقاضی و همراهان بالای ۱۶ سال الزامی است.',
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

export default NomadCroatiaPage;
