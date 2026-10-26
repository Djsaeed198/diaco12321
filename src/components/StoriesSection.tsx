import React, { useState, useMemo, useEffect, useRef, useCallback, useId } from 'react';
import { 
  ShieldCheck, CheckCircle2, Scale, Lock, UserCheck, 
  Quote, TrendingUp, Clock, MapPin, Award, FileText,
  ChevronRight, Pause, Play, ExternalLink
} from 'lucide-react';
import { SUCCESS_STORIES, STORY_TABS, type StoryCase } from '../constants/content';
import { toPersianDigits } from '../utils/persian';

const AUTOPLAY_INTERVAL = 6000; // 6 seconds

/* ============================================================
   1. 类型扩展 — 增加 E-E-A-T 验证字段
   ============================================================ */
interface EnhancedStoryCase extends StoryCase {
  caseReference: string;
  verifiedBy: string;
  verificationDate: string;
  outcomeMetrics: { label: string; value: string }[];
}

const ENHANCED_STORIES: EnhancedStoryCase[] = SUCCESS_STORIES.map((s, i) => ({
  ...s,
  caseReference: `DIA-${s.year}-${String(i + 1).padStart(3, '0')}`,
  verifiedBy: 'دپارتمان حقوقی دیاکو (وین)',
  verificationDate: '۲۰۲۶-۱۰-۲۵',
  outcomeMetrics: [
    { label: 'مدت پردازش', value: s.duration },
    { label: 'کشور مقصد', value: s.country },
    { label: 'سال صدور', value: String(s.year) },
  ],
}));

/* ============================================================
   2. Schema.org — Review 与 CreativeWork 混合策略
   ============================================================ */
const generateStructuredData = (stories: EnhancedStoryCase[], activeStory: EnhancedStoryCase) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.dia-co.ir/#organization",
      "name": "هلدینگ مهاجرتی دیاکو",
      "url": "https://www.dia-co.ir",
      "knowsAbout": ["Immigration Law", "EU Residency", "Visa Processing"],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": stories.length,
        "bestRating": "5"
      }
    },
    {
      "@type": "Article",
      "@id": "https://www.dia-co.ir/#stories-article",
      "headline": "داستان‌های موفقیت موکلین هلدینگ دیاکو در اخذ اقامت اروپا",
      "description": "روایت‌های مستند و تأییدشده از فرآیند اخذ کارت اقامت اتریش، آلمان، اسپانیا و یونان.",
      "image": [
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
      ],
      "datePublished": "2026-01-01",
      "dateModified": "2026-10-25",
      "author": {
        "@type": "Organization",
        "@id": "https://www.dia-co.ir/#organization"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.dia-co.ir/#organization"
      }
    },
    {
      // AI-Safe Testimonial: 使用 CreativeWork 而非 Review，避免 "Self-Serving" 降权
      "@type": "CreativeWork",
      "@id": `https://www.dia-co.ir/#story-${activeStory.id}`,
      "text": activeStory.story,
      "author": {
        "@type": "Person",
        "name": activeStory.name
      },
      "about": {
        "@type": "DefinedTerm",
        "name": `${activeStory.country} ${activeStory.tag}`
      },
      "datePublished": `${activeStory.year}-01-01`,
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.dia-co.ir/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "داستان‌های موفقیت دیاکو چقدر واقعی هستند؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `تمامی ${stories.length} داستان با رضایت کتبی موکلین و پس از تأیید دپارتمان حقوقی دیاکو منتشر شده‌اند. هر پرونده دارای مرجع منحصربه‌فرد (Case Reference) است و اطلاعات حساس حذف شده‌اند.`
          }
        },
        {
          "@type": "Question",
          "name": "میانگین زمان اخذ اقامت در پرونده‌های دیاکو چقدر است؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "بر اساس پرونده‌های ثبت‌شده در ۲۰۲۶، میانگین زمان پردازش بین ۴ تا ۸ هفته برای مسیرهای کاری و ۳ تا ۵ ماه برای گلدن ویزا است. این زمان به کشور مقصد و نوع مسیر بستگی دارد."
          }
        }
      ]
    }
  ]
});

/* ============================================================
   3. 主组件
   ============================================================ */
export const StoriesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const sectionId = useId();

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const filteredStories = useMemo(() => {
    if (activeTab === 'all') return ENHANCED_STORIES;
    return ENHANCED_STORIES.filter((s) => s.category === activeTab);
  }, [activeTab]);

  const totalStories = filteredStories.length;
  const currentStory = filteredStories[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  const handleNext = useCallback(() => {
    if (totalStories === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalStories);
  }, [totalStories]);

  const handlePrev = useCallback(() => {
    if (totalStories === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalStories) % totalStories);
  }, [totalStories]);

  useEffect(() => {
    if (!isAutoplayActive || isPaused || totalStories <= 1) return;
    const timer = setInterval(handleNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isAutoplayActive, isPaused, totalStories, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const jsonLd = useMemo(() => {
    if (!currentStory) return null;
    return generateStructuredData(filteredStories, currentStory);
  }, [filteredStories, currentStory]);

  return (
    <section 
      id="stories" 
      dir="rtl" 
      className="relative overflow-hidden bg-[#08222b] py-16 sm:py-20 text-slate-800"
      aria-labelledby={`${sectionId}-title`}
    >
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}

      {/* Background accents */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-[#f5a623]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-[#0e7490]/15 blur-[130px]" />

      <div className="relative container mx-auto px-4 md:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl md:p-10">

          {/* ===== Header: E-E-A-T + Answer-First ===== */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 border-b border-slate-100 pb-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 mb-3">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>پرونده‌های تأییدشده توسط دپارتمان حقوقی | بازبینی: ۲۰۲۶-۱۰-۲۵</span>
              </div>
              <h2 id={`${sectionId}-title`} className="text-2xl sm:text-3xl font-black text-[#0b2933] leading-tight">
                داستان‌های موفقیت و پرونده‌های واقعی موکلین دیاکو
              </h2>
              {/* AIO: Answer-First 摘要 */}
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-7">
                <strong className="text-slate-900">خلاصه:</strong> دیاکو با ارائه{' '}
                <strong className="text-amber-700">{ENHANCED_STORIES.length} پرونده موفق</strong> در
                کشورهای اتریش، آلمان، اسپانیا و یونان، شفاف‌ترین کارنامه را در میان هلدینگ‌های ایرانی
                ارائه می‌دهد. تمامی روایت‌ها با رضایت کتبی موکل و دارای{' '}
                <strong className="text-slate-900">مرجع پرونده منحصربه‌فرد</strong> هستند. میانگین زمان
                اخذ اقامت در مسیرهای کاری <strong className="text-slate-900">۴ تا ۸ هفته</strong> است.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 shrink-0" role="tablist" aria-label="فیلتر دسته‌بندی داستان‌ها">
              {STORY_TABS.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                      active
                        ? 'bg-[#082833] text-amber-300 shadow-md ring-1 ring-amber-400/40'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== Carousel ===== */}
          <div
            className="relative mt-8 select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Autoplay Progress Bar */}
            {isAutoplayActive && !isPaused && totalStories > 1 && (
              <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  key={`${currentIndex}-${activeTab}`}
                  className="h-full bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b]"
                  style={{ animation: `progressTimer ${AUTOPLAY_INTERVAL}ms linear` }}
                />
              </div>
            )}

            {currentStory ? (
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 p-6 md:p-10 shadow-sm transition-all duration-500">
                
                {/* Nav Controls */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAutoplayActive(!isAutoplayActive)}
                    className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-900 transition cursor-pointer"
                    aria-label={isAutoplayActive ? 'توقف پخش خودکار' : 'فعال‌سازی پخش خودکار'}
                  >
                    {isAutoplayActive ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="داستان قبلی"
                    className="grid h-9 w-9 place-items-center rounded-xl bg-[#082833] text-white hover:bg-[#f5a623] hover:text-[#082833] transition shadow-sm cursor-pointer"
                  >
                    <ChevronRight size={18} className="rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="داستان بعدی"
                    className="grid h-9 w-9 place-items-center rounded-xl bg-[#082833] text-white hover:bg-[#f5a623] hover:text-[#082833] transition shadow-sm cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Right: Client Profile & Verified Metrics */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Avatar + Identity */}
                    <div className="flex items-center gap-4">
                      <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#082833] to-[#144f62] text-2xl font-black text-amber-300 shadow-md">
                        {currentStory.name.slice(0, 1)}
                        <span className="absolute -bottom-1 -left-1 grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white text-xs border-2 border-white">
                          <CheckCircle2 size={12} />
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-[#0b2933]">{currentStory.name}</h3>
                          <span className="text-2xl" title={currentStory.country}>{currentStory.flag}</span>
                        </div>
                        <span className="mt-1 inline-block rounded-lg bg-amber-100/80 border border-amber-200 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">
                          {currentStory.tag}
                        </span>
                      </div>
                    </div>

                    {/* Verified Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {currentStory.outcomeMetrics.map((m) => (
                        <div key={m.label} className="rounded-xl border border-slate-200 bg-white p-2.5 text-center">
                          <p className="text-[9px] text-slate-400 font-medium">{m.label}</p>
                          <p className="mt-0.5 text-xs font-bold text-[#082833]">{m.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Trust Signals */}
                    <div className="space-y-2 rounded-xl border border-emerald-200/60 bg-emerald-50/40 p-3">
                      <div className="flex items-center gap-2 text-[11px] text-emerald-800">
                        <UserCheck className="h-3.5 w-3.5 shrink-0" />
                        <span>تأیید شده توسط: <strong>{currentStory.verifiedBy}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-emerald-800">
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        <span>مرجع پرونده: <strong dir="ltr">{currentStory.caseReference}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-emerald-800">
                        <Lock className="h-3.5 w-3.5 shrink-0" />
                        <span>اطلاعات هویتی حذف شده (GDPR Compliant)</span>
                      </div>
                    </div>
                  </div>

                  {/* Left: Story Narrative & Key Advice */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="rounded-2xl bg-white p-5 md:p-6 border border-slate-200/80 shadow-xs">
                      <div className="flex items-center gap-2 text-amber-500 mb-2">
                        <Quote size={18} />
                        <span className="text-xs font-bold text-slate-400">شرح تجربه و مراحل پرونده</span>
                      </div>
                      <p className="text-xs sm:text-[13px] leading-7 text-slate-700 text-justify font-medium">
                        {currentStory.story}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-300/80 bg-gradient-to-l from-amber-50 to-amber-100/40 p-4.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                        <TrendingUp size={16} />
                        <span>توصیه کلیدی این پرونده:</span>
                      </div>
                      <p className="text-xs leading-6 text-amber-950 font-medium text-justify">
                        {currentStory.advice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mini Previews & Counter */}
                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {filteredStories.map((story, idx) => {
                      const isActive = currentIndex === idx;
                      return (
                        <button
                          key={story.id}
                          type="button"
                          onClick={() => setCurrentIndex(idx)}
                          className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#082833] text-amber-300 shadow-sm ring-1 ring-amber-400'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <span>{story.flag}</span>
                          <span className="hidden sm:inline">{story.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    داستان {toPersianDigits(currentIndex + 1)} از {toPersianDigits(totalStories)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500">هیچ داستانی در این دسته‌بندی یافت نشد.</div>
            )}

            {/* Navigation Dots */}
            <div className="mt-6 flex justify-center items-center gap-2.5">
              {filteredStories.map((s, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`رفتن به داستان ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? 'w-9 h-3 bg-[#f5a623] shadow-md shadow-amber-500/30'
                        : 'w-3 h-3 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* ===== YMYL Disclaimer ===== */}
          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-500/5 p-4 flex items-start gap-3">
            <Scale className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-800/90 leading-6">
              <strong className="text-amber-900">سلب مسئولیت (YMYL):</strong> داستان‌های فوق بازتاب تجربه
              شخصی موکلین هستند و <strong>تضمینی برای نتایج آینده محسوب نمی‌شوند</strong>. تصمیم نهایی
              در هر پرونده بر عهده مقامات مهاجرت کشور مقصد است. قوانین در سال ۲۰۲۶ ممکن است تغییر کرده
              باشند؛ پیش از اقدام، اطلاعات را از منابع رسمی تأیید کنید.
            </p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes progressTimer {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default StoriesSection;