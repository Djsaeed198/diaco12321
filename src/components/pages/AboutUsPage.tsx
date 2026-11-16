import React from 'react';
import {
  Building2,
  ShieldCheck,
  Scale,
  Award,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen,
  HeartHandshake,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';
import DiacoLogo from '../DiacoLogo';
import AboutSection from '../AboutSection';
import type { PageType } from '../Header';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

export const AboutUsPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
}) => {
  useSeo({
    title: 'درباره هلدینگ بین‌المللی دیاکو | بیش از ۱۱ سال سابقه (تأسیس ۱۳۹۴) و دفاتر وین و آتن',
    description:
      'آشنایی با هلدینگ مهاجرتی دیاکو؛ تأسیس ۲۰۱۵ (۱۳۹۴)، دفاتر رسمی در وین (Ausstellungsstraße 50/2.OG)، آتن (Glyfada) و تهران، معرفی تیم حقوقی همکار در اروپا و منشور اخلاقی.',
    keywords: [
      'درباره هلدینگ مهاجرتی دیاکو',
      'دفتر دیاکو در وین اتریش',
      'وکلای رسمی دیاکو اروپا',
      'مجوز رسمی مهاجرت اتریش',
      'تاریخچه دیاکو',
      'وکیل پایه یک دادگستری وین',
    ],
    canonical: '/about-us',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'درباره هلدینگ بین‌المللی مهاجرتی دیاکو',
      description: 'خدمات حقوقی، اقامت و مهاجرت به اتحادیه اروپا با بیش از ۱۱ سال سابقه رسمی (تأسیس ۲۰۱۵ / ۱۳۹۴)، ۳۵ وکیل همکار و ۲,۱۵۰+ پرونده موفق.',
      url: 'https://www.dia-co.ir/about-us',
    },
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#071f26] text-slate-100 font-sans">
      {/* هدر بخش و معرفی هلدینگ */}
      <section className="relative overflow-hidden pt-28 pb-14 bg-gradient-to-b from-[#092e39] via-[#071f26] to-[#071f26] border-b border-white/10">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f5a623_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-amber-300 transition cursor-pointer"
            >
              صفحه اصلی
            </button>
            <span>/</span>
            <span className="text-amber-400 font-bold">درباره هلدینگ بین‌المللی دیاکو</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <DiacoLogo size={52} />
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>تأسیس ۱۳۹۴ (۲۰۱۵) — بیش از ۱۱ سال سابقه رسمی در حقوق مهاجرت و اقامت شنگن</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              دروازه امن، علمی و قانونی مهاجرت به اروپا
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
              هلدینگ بین‌المللی دیاکو با بیش از ۱۱ سال سابقه رسمی (از سال ۱۳۹۴ / ۲۰۱۵) و تکیه بر دفاتر وین، آتن و تهران به همراه ۳۵ وکیل و مشاور حقوقی همکار در ۱۱ کشور اروپایی، پیگیری مستقیم و قانونی پرونده‌های اقامتی را در مراجع اتحادیه اروپا بر عهده دارد. رویکرد ما بر پایه شفافیت قرارداد، استناد به منابع رسمی و پرهیز از وعده‌های غیرواقعی است.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>همکاری مستقیم با وکلای عضو کانون‌های وکلای اتریش و آلمان</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                <span>بیش از ۲,۱۵۰ پرونده اقامتی موفق ثبت‌شده</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* بخش اختصاصی درباره دیاکو */}
      <div className="py-6 border-b border-white/10">
        <AboutSection onOpenAssessment={onOpenAssessment} />
      </div>

      {/* مقاله تفصیلی تاریخچه و استانداردهای اخلاقی دیاکو */}
      <section className="container mx-auto px-4 md:px-8 py-14">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <span className="text-xs font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full">
              اصول بنیادین و منشور اخلاقی
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white mt-3 mb-3">
              منشور اخلاقی و استانداردهای حرفه‌ای هلدینگ دیاکو
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              تعهدات اجرایی و حقوقی شفاف که زیربنای اعتماد ۲,۱۵۰+ متقاضی در طول بیش از ۱۱ سال فعالیت رسمی دیاکو بوده است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-400" />
                <span>۱. پیگیری مستقیم بدون واسطه (Direct Representation)</span>
              </h3>
              <p>
                در هلدینگ دیاکو، پرونده شما به هیچ شرکت واسطه، دلال یا کارگزار سومی سپرده نمی‌شود. مکاتبات اداری مستقیماً توسط وکلای رسمی ما با سربرگ کانون وکلای اتریش یا آلمان با مراجع رسمی نظیر MA35، BAMF و کنسولگری‌ها صورت می‌پذیرد.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>۲. شفافیت کامل مالی و قراردادهای قانونی</span>
              </h3>
              <p>
                کلیه هزینه‌های دولتی، مالیات‌های قانونی، عوارض شهرداری و دستمزد وکلا در پیش‌قرارداد شفاف ذکر شده و هیچ هزینه پنهان یا غیرمنتظره‌ای در طول پروسه از متقاضی دریافت نمی‌گردد.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-sky-400" />
                <span>۳. تعهد کامل به استقرار متقاضی (After-Arrival Care)</span>
              </h3>
              <p>
                ما مهاجرت را تنها تا مرحله صدور ویزا تعریف نمی‌کنیم. دپارتمان استقرار دیاکو در وین از ساعت فرود هواپیما در کنار شماست تا اجاره خانه، ثبت شهرداری، کارت سلامت بیومتریک و افتتاح حساب بانکی بدون کوچک‌ترین چالش به سرانجام برسد.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>۴. پذیرش مشروط به داشتن شانس واقعی</span>
              </h3>
              <p>
                دیاکو به عنوان یک برند معتبر حقوقی، حاضر به پذیرش پرونده‌های فاقد شانس قبولی نیست. در صورتی که کارشناسان ما پس از ارزیابی اولیه شانس موفقیت را پایین تشخیص دهند، صراحتاً متقاضی را از اقدام پرریسک منصرف خواهند کرد.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
