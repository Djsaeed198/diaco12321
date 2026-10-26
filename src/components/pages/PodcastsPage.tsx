import React from 'react';
import {
  Headphones,
  Radio,
  Sparkles,
  Calendar,
  Clock,
  Mic,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';
import PodcastsSection from '../PodcastsSection';
import type { PageType } from '../Header';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

export const PodcastsPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
}) => {
  useSeo({
    title: 'رادیو مهاجرت دیاکو | پادکست‌های حقوقی و تجربیات زیسته در اروپا ۲۰۲۶',
    description:
      'دانشنامه صوتی حقوق اقامت و مهاجرت اروپا؛ تحلیل‌های صوتی وکلای مقیم وین و مونیخ، ناگفته‌های تمکن مالی، بازار کار آلمان، هزینه‌های زندگی و تجربیات واقعی مهاجران ایرانی.',
    keywords: [
      'پادکست رادیو مهاجرت دیاکو',
      'پادکست مهاجرت به اتریش',
      'صوت قوانین بلوکارت آلمان',
      'تجربه زندگی در وین',
      'پادکست حقوقی مهاجرت شنگن',
      'هلدینگ دیاکو پادکست',
    ],
    canonical: '/podcasts',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'PodcastSeries',
      name: 'رادیو مهاجرت هلدینگ بین‌المللی دیاکو',
      description: 'سلسله پادکست‌های تخصصی تحلیل قوانین مهاجرت و اقامت در اروپا.',
      url: 'https://www.dia-co.ir/podcasts',
      author: {
        '@type': 'Organization',
        name: 'هلدینگ مهاجرتی دیاکو',
      },
    },
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#071f26] text-slate-100 font-sans">
      {/* هدر بخش و معرفی */}
      <section className="relative overflow-hidden pt-28 pb-12 bg-gradient-to-b from-[#092e39] via-[#071f26] to-[#071f26] border-b border-white/10">
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
            <span className="text-amber-400 font-bold">رادیو مهاجرت دیاکو</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4 backdrop-blur-sm">
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>پایگاه صوتی و تحلیلی پرونده‌های اقامت اروپا — بیش از ۳۳ اپیزود کارشناسی</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              رادیو مهاجرت؛ شنیدن حقیقت قوانین اقامت اروپا
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
              گفتگوهای بی‌پرده با وکلای پایه یک دادگستری وین و مونیخ، بررسی چالش‌های روانی و فرهنگی مهاجرت، تحلیل صوتی بخشنامه‌ها و تجربیات واقعی خانواده‌های مستقر در اتریش و آلمان.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-emerald-400" />
                <span>پخش مستقیم و باکیفیت بدون نیاز به فیلترشکن</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-amber-400" />
                <span>همراه با متن کامل و هایلایت‌های حقوقی هر اپیزود</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پلیر پادکست اصلی */}
      <div className="py-6 border-b border-white/10">
        <PodcastsSection />
      </div>

      {/* مقاله پرمحتوا درباره رادیو مهاجرت */}
      <section className="container mx-auto px-4 md:px-8 py-14">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full">
              روایت‌های مستند صوتی
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white mt-3 mb-3">
              چرا شنیدن تجربیات و پادکست‌های حقوقی قبل از اقدام مهاجرت ضروری است؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              بسیاری از ظرایف و ریزه‌کاری‌های قوانین اروپایی در بروشورها ذکر نمی‌شوند، اما در گفتگوهای تجربی وکیل و موکل روشن می‌گردند.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Headphones className="w-5 h-5 text-amber-400" />
                <span>آمادگی ذهنی و روانی برای سال اول مهاجرت</span>
              </h3>
              <p>
                در اپیزودهای رادیو مهاجرت، به تفصیل چالش‌های زبان، تطبیق با فرهنگ اداری سخت‌گیرانه اتریش و آلمان، فرآیند ثبت‌نام فرزندان در مدارس دولتی و نحوه دوست‌یابی و ارتباط با جوامع محلی شرح داده شده است تا شوک فرهنگی اولیه به حداقل ممکن برسد.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-emerald-400" />
                <span>تحلیل حقوقی مواد قانون به زبان ساده</span>
              </h3>
              <p>
                وکلای دیاکو در هر اپیزود مواد پیچیده قانونی نظیر NAG §44 یا AufenthG §18b را به زبان قابل فهم برای عموم مردم کالبدشکافی کرده و راه‌حل‌های قانونی پرهیز از ریجکتی را بازگو می‌کنند.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodcastsPage;
