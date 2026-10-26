import { imageUrl } from '../../../utils/images';
import React, { useState, useMemo } from 'react';
import {
  Clock,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  PhoneCall,
  Sparkles,
  MapPin,
  Plane,
  Building2,
  FileCheck2,
  Award,
  Globe2,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  UserCheck,
  Briefcase,
  GraduationCap,
  Coins,
  FileText,
  Check,
  ExternalLink,
  Share2,
  Copy,
  Info,
  Scale,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';
import {
  TIMELINE_COUNTRIES_2026,
  type CountryTimeline,
  type PathwayTimeline,
  type TimelineMilestone,
} from '../../../constants/timelineData2026';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const ImmigrationTimelinePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  // State for active country and active pathway
  const [selectedCountryId, setSelectedCountryId] = useState<string>('austria');
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('financial');
  
  // Interactive checklist of completed steps per pathway
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTabSection, setActiveTabSection] = useState<'timeline' | 'comparison' | 'guide'>('timeline');

  // Find active country and pathway
  const currentCountry: CountryTimeline = useMemo(() => {
    return (
      TIMELINE_COUNTRIES_2026.find((c) => c.id === selectedCountryId) ||
      TIMELINE_COUNTRIES_2026[0]
    );
  }, [selectedCountryId]);

  const currentPathway: PathwayTimeline = useMemo(() => {
    const found = currentCountry.pathways.find((p) => p.id === selectedPathwayId);
    return found || currentCountry.pathways[0];
  }, [currentCountry, selectedPathwayId]);

  // Handler for country switch (defaults to first pathway of selected country)
  const handleSelectCountry = (countryId: string) => {
    setSelectedCountryId(countryId);
    const country = TIMELINE_COUNTRIES_2026.find((c) => c.id === countryId);
    if (country && country.pathways.length > 0) {
      setSelectedPathwayId(country.pathways[0].id);
    }
  };

  const toggleTask = (taskKey: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskKey]: !prev[taskKey],
    }));
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+43 688 976 3256');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // High-fidelity country banner images
  const countryHeroImages: Record<string, string> = {
    austria:
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=85', // Vienna
    germany:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=85', // Germany
    greece:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=85', // Greece
    spain:
      'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1600&q=85', // Spain Madrid
    france:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85', // Paris
    italy:
      'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1600&q=85', // Rome
    portugal:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85', // Lisbon
    hungary:
      'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1600&q=85', // Budapest
  };

  // Build JSON-LD structured data dynamically for SEO & AIO
  const jsonLdGraph = useMemo(() => {
    const howToSteps = currentPathway.milestones.map((m) => ({
      '@type': 'HowToStep',
      name: `${m.phaseTitle} - ${m.actionTitle}`,
      text: m.applicantTasks.concat(m.diacoTasks).join('. '),
      url: `https://www.dia-co.ir/guides/immigration-timeline#${selectedCountryId}-${currentPathway.id}-step-${m.stepNumber}`,
    }));

    const faqEntities = currentPathway.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    }));

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `https://www.dia-co.ir/guides/immigration-timeline#${selectedCountryId}-${currentPathway.id}`,
          headline: `تایم‌لاین گام‌به‌گام و زمان‌بندی دقیق ${currentPathway.title} در ${currentCountry.name} (نسخه ۲۰۲۶)`,
          description: `بررسی تحلیلی مراحل اداری، مدارک لازم، مدت زمان صدور ویزا در سفارت، زمان دریافت کارت اقامت دائم و پاسپورت در روش ${currentPathway.title} توسط هلدینگ بین‌المللی دیاکو.`,
          image: [countryHeroImages[selectedCountryId] || 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80'],
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
        {
          '@type': 'HowTo',
          '@id': `https://www.dia-co.ir/guides/immigration-timeline#howto-${selectedCountryId}-${currentPathway.id}`,
          name: `مراحل و زمان‌بندی اخذ اقامت ${currentCountry.name} از طریق ${currentPathway.title}`,
          description: currentPathway.shortDesc,
          totalTime: currentPathway.totalDuration,
          step: howToSteps,
        },
        {
          '@type': 'FAQPage',
          '@id': `https://www.dia-co.ir/guides/immigration-timeline#faq-${selectedCountryId}-${currentPathway.id}`,
          mainEntity: faqEntities,
        },
      ],
    };
  }, [currentCountry, currentPathway, selectedCountryId]);

  useSeo({
    title: `تایم‌لاین زمان‌بندی ${currentPathway.title} ${currentCountry.name} ۲۰۲۶ | هلدینگ دیاکو`,
    description: `جدول کامل مراحل زمانی ${currentPathway.title} در ${currentCountry.name}؛ از ترجمه و لگالایز تا مصاحبه سفارت، تایید ${currentPathway.responsibleAuthority}، صدور کارت اقامت دائم و پاسپورت با نظارت مستقیم وکلای دیاکو.`,
    canonical: `/guides/immigration-timeline?country=${selectedCountryId}&pathway=${currentPathway.id}`,
    ogType: 'article',
    ogImage: countryHeroImages[selectedCountryId] || 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      `تایم لاین مهاجرت به ${currentCountry.name}`,
      `مدت زمان صدور ویزای ${currentPathway.title}`,
      `مراحل اخذ اقامت ${currentCountry.name} ۲۰۲۶`,
      `زمان اقامت دائم تا پاسپورت در ${currentCountry.name}`,
      `${currentPathway.responsibleAuthority}`,
      'وکیل مهاجرت دیاکو اتریش آلمان اروپا',
    ],
    jsonLd: jsonLdGraph,
  });

  return (
    <div className="min-h-screen bg-[#061a21] text-white pt-24 pb-20 font-sans" dir="rtl">
      {/* هدر ناوبری و Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 transition cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به پرتال اصلی هلدینگ دیاکو
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300 overflow-x-auto py-1">
            <span className="hover:text-white cursor-pointer" onClick={onBackToHome}>صفحه اصلی</span>
            <span>/</span>
            <span>سامانه‌های تخصصی حقوقی</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">تایم‌لاین اختصاصی کشورها و روش‌های مهاجرت ۲۰۲۶</span>
          </div>
        </div>
      </div>

      {/* سربرگ عنوان اصلی */}
      <section className="container mx-auto px-4 md:px-8 mb-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4 shadow-sm backdrop-blur-md">
            <Clock className="h-4 w-4 text-amber-400 animate-pulse" />
            سیستم هوشمند شبیه‌سازی و نقشه راه زمانی کلیه مقاصد اروپایی (نسخه آپدیت ۲۰۲۶)
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
            تایم‌لاین دقیق و گام‌به‌گام <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">تمامی کشورها و روش‌های مهاجرتی</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-8 max-w-3xl mx-auto">
            محاسبه بازه‌های زمانی واقعی، تفکیک گام‌های متقاضی در ایران از پیگیری‌های وکیل رسمی دیاکو در خاک اروپا، ددلاین‌های سفارت، زمان اخذ اقامت دائم (PR) و دریافت پاسپورت برای تک‌تک مسیرها.
          </p>

          {/* تب‌های بالای صفحه */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              type="button"
              onClick={() => setActiveTabSection('timeline')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTabSection === 'timeline'
                  ? 'bg-amber-400 text-[#082833] shadow-glow font-black'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Calendar className="h-4 w-4" />
              تایم‌لاین گام‌به‌گام روش انتخابی
            </button>
            <button
              type="button"
              onClick={() => setActiveTabSection('comparison')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTabSection === 'comparison'
                  ? 'bg-amber-400 text-[#082833] shadow-glow font-black'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Scale className="h-4 w-4" />
              جدول مقایسه‌ای سرعت و زمان کل کشورها
            </button>
            <button
              type="button"
              onClick={() => setActiveTabSection('guide')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTabSection === 'guide'
                  ? 'bg-amber-400 text-[#082833] shadow-glow font-black'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <FileText className="h-4 w-4" />
              تحلیل و مقاله جامع حقوقی ۲۰۲۶
            </button>
          </div>
        </div>
      </section>

      {/* ۱. نوار انتخاب کشور (Country Tabs Selector) */}
      <section className="container mx-auto px-4 md:px-8 mb-8">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-amber-400" />
              <h2 className="text-sm sm:text-base font-black text-white">
                ۱. انتخاب کشور مقصد اروپایی:
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">
              ۸ کشور با پرونده‌های فعال در هلدینگ دیاکو
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {TIMELINE_COUNTRIES_2026.map((country) => {
              const isSelected = country.id === selectedCountryId;
              return (
                <button
                  key={country.id}
                  type="button"
                  onClick={() => handleSelectCountry(country.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'border-amber-400 bg-gradient-to-b from-amber-400/20 via-white/10 to-amber-400/5 text-white shadow-glow ring-2 ring-amber-400/30'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                    {country.flag}
                  </span>
                  <span className="text-xs font-black">{country.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {country.englishName}
                  </span>
                  {country.diacoOffice && (
                    <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" title="دفتر مستقیم وکلای دیاکو" />
                  )}
                </button>
              );
            })}
          </div>

          {currentCountry.diacoOffice && (
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 px-4 py-2 rounded-xl">
              <Building2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{currentCountry.diacoOffice}</span>
            </div>
          )}
        </div>
      </section>

      {/* ۲. نوار انتخاب روش مهاجرتی این کشور (Pathways Selector) */}
      <section className="container mx-auto px-4 md:px-8 mb-8">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-amber-400" />
              <h2 className="text-sm sm:text-base font-black text-white">
                ۲. انتخاب روش مهاجرتی در {currentCountry.name}:
              </h2>
            </div>
            <span className="text-xs text-amber-300/80 font-bold">
              {currentCountry.pathways.length} برنامه فعال
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentCountry.pathways.map((pathway) => {
              const isSelected = pathway.id === currentPathway.id;
              return (
                <button
                  key={pathway.id}
                  type="button"
                  onClick={() => setSelectedPathwayId(pathway.id)}
                  className={`text-right p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-400 bg-gradient-to-br from-amber-400/20 via-slate-800 to-amber-950/20 shadow-glow ring-2 ring-amber-400/30'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300">
                        {pathway.badge}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        موفقیت: {pathway.successRate}%
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-white mb-1.5">
                      {pathway.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-6">
                      {pathway.shortDesc}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-slate-200">
                      <Clock className="h-3.5 w-3.5 text-amber-400" />
                      زمان صدور: {pathway.totalDuration}
                    </span>
                    <span className="text-amber-400 font-bold flex items-center gap-0.5">
                      {isSelected ? 'مشاهده تایم‌لاین ▾' : 'انتخاب ←'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* نمایش بر اساس تب فعال */}
      {activeTabSection === 'timeline' && (
        <>
          {/* کارت خلاصه مشخصات روش و شناسنامه زمانی (Scorecard) */}
          <section className="container mx-auto px-4 md:px-8 mb-12">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-[#0a232c] to-slate-900/90 p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              {/* پس‌زمینه هدر روش */}
              <div
                className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url(${imageUrl(countryHeroImages[selectedCountryId], 1200)})` }}
              />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{currentCountry.flag}</span>
                      <span className="text-xs font-bold text-slate-400">
                        {currentCountry.name} ({currentCountry.englishName}) - پایتخت: {currentCountry.capital}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                      {currentPathway.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-7">
                      {currentPathway.shortDesc}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={onOpenAssessment}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] text-[#082833] font-black text-xs sm:text-sm shadow-glow hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                      ارزیابی شرایط من برای این روش
                    </button>
                    {onNavigateToCountry && (
                      <button
                        type="button"
                        onClick={() => onNavigateToCountry(selectedCountryId)}
                        className="px-4 py-3 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition cursor-pointer"
                      >
                        صفحه اختصاصی {currentCountry.name}
                      </button>
                    )}
                  </div>
                </div>

                {/* ماتریس شاخص‌های کلیدی زمان‌بندی (Key Metrics Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
                      <Clock className="h-4 w-4" />
                      مدت زمان کل تا صدور ویزا
                    </div>
                    <div className="text-base sm:text-lg font-black text-white">
                      {currentPathway.totalDuration}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">از شروع پرونده تا دریافت فیزیکی کارت</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2">
                      <ShieldCheck className="h-4 w-4" />
                      دستیابی به اقامت دائم (PR)
                    </div>
                    <div className="text-base sm:text-lg font-black text-white">
                      {currentPathway.prTimeline}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">کارت دائم و مادام‌العمر اروپا</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-sky-400 text-xs font-bold mb-2">
                      <Globe2 className="h-4 w-4" />
                      دریافت پاسپورت و تابعیت
                    </div>
                    <div className="text-base sm:text-lg font-black text-white">
                      {currentPathway.passportTimeline}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">حق رای و سفر بدون ویزا</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-bold mb-2">
                      <MapPin className="h-4 w-4" />
                      شرط حضور فیزیکی سالانه
                    </div>
                    <div className="text-base sm:text-lg font-black text-white">
                      {currentPathway.presenceReq}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">الزام حفظ کارت اقامت</div>
                  </div>
                </div>

                {/* نهادهای تصمیم‌گیرنده و نقش دیاکو */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-800/50 border border-white/10">
                    <span className="text-[11px] font-bold text-amber-300 block mb-1">
                      🏛️ مرجع قانونی صادرکننده و ناظر:
                    </span>
                    <p className="text-xs text-slate-200 leading-6">
                      {currentPathway.responsibleAuthority}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/50 border border-white/10">
                    <span className="text-[11px] font-bold text-emerald-300 block mb-1">
                      ⚖️ نقش انحصاری وکیل دیاکو در کشور مقصد:
                    </span>
                    <p className="text-xs text-slate-200 leading-6">
                      {currentPathway.diacoRole}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ۳. خط زمان تعاملی و مراحل تفکیک‌شده (Gantt & Step Milestones) */}
          <section className="container mx-auto px-4 md:px-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-amber-400" />
                    مراحل زمانی گام‌به‌گام ({currentPathway.milestones.length} مرحله تا اقامت)
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    چک‌لیست تعاملی اقدامات: می‌توانید هر گام را علامت بزنید تا میزان پیشرفت خود را بسنجید.
                  </p>
                </div>
                <div className="text-left">
                  <span className="text-xs text-slate-400 block">نرخ تایید ویزا:</span>
                  <span className="text-base font-black text-emerald-400">
                    {currentPathway.successRate}٪ در دیاکو
                  </span>
                </div>
              </div>

              {/* لیست گام‌ها */}
              <div className="space-y-8 relative before:absolute before:inset-0 before:right-6 sm:before:right-8 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-emerald-400 before:to-sky-400 before:z-0">
                {currentPathway.milestones.map((milestone, idx) => {
                  return (
                    <div
                      key={milestone.stepNumber}
                      id={`${selectedCountryId}-${currentPathway.id}-step-${milestone.stepNumber}`}
                      className="relative z-10 flex items-start gap-4 sm:gap-6"
                    >
                      {/* شماره گام گرد شیشه‌ای */}
                      <div className="shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-[#fed871] via-[#f5a623] to-[#e58e0b] text-[#082833] font-black text-lg sm:text-2xl grid place-items-center shadow-glow border-2 border-white/20">
                        {milestone.stepNumber}
                      </div>

                      {/* بدنه کارت مرحله */}
                      <div className="flex-1 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-5 sm:p-7 shadow-xl hover:border-amber-400/40 transition">
                        {/* عنوان و بازه زمانی */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 text-amber-300 px-3 py-1 text-xs font-black">
                            ⏱️ {milestone.timeframe}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            {milestone.phaseTitle}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-black text-white mb-4 leading-7">
                          {milestone.actionTitle}
                        </h4>

                        {/* دو ستون تفکیک وظایف: متقاضی vs وکیل دیاکو */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {/* وظایف متقاضی */}
                          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-3">
                              <UserCheck className="h-4 w-4 text-amber-400" />
                              اقدامات متقاضی در ایران:
                            </div>
                            <ul className="space-y-2.5">
                              {milestone.applicantTasks.map((task, tIdx) => {
                                const taskKey = `${selectedCountryId}-${currentPathway.id}-${milestone.stepNumber}-${tIdx}`;
                                const isChecked = !!completedTasks[taskKey];
                                return (
                                  <li
                                    key={tIdx}
                                    onClick={() => toggleTask(taskKey)}
                                    className="flex items-start gap-2.5 text-xs text-slate-200 leading-6 cursor-pointer select-none group"
                                  >
                                    <div
                                      className={`mt-1 shrink-0 h-4 w-4 rounded-md border flex items-center justify-center transition ${
                                        isChecked
                                          ? 'border-emerald-400 bg-emerald-500 text-slate-900'
                                          : 'border-white/30 bg-white/5 group-hover:border-amber-400'
                                      }`}
                                    >
                                      {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                                    </div>
                                    <span className={isChecked ? 'line-through text-slate-400' : ''}>
                                      {task}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>

                          {/* وظایف وکیل دیاکو */}
                          <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-3">
                              <Scale className="h-4 w-4 text-emerald-400" />
                              اقدامات وکیل رسمی دیاکو در مقصد:
                            </div>
                            <ul className="space-y-2">
                              {milestone.diacoTasks.map((task, dIdx) => (
                                <li
                                  key={dIdx}
                                  className="flex items-start gap-2 text-xs text-slate-200 leading-6"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* خروجی‌ها و اسناد دریافتی */}
                        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                            <FileCheck2 className="h-3.5 w-3.5 text-sky-400" />
                            خروجی‌های رسمی این فاز:
                          </span>
                          {milestone.deliverables.map((deliv, dIdx) => (
                            <span
                              key={dIdx}
                              className="text-[11px] font-bold bg-sky-500/10 text-sky-300 border border-sky-500/20 px-2.5 py-0.5 rounded-lg"
                            >
                              ✓ {deliv}
                            </span>
                          ))}
                        </div>

                        {/* هشدار بحرانی زمان‌بندی (Critical Alert) */}
                        {milestone.criticalAlert && (
                          <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 text-xs text-amber-200 leading-6">
                            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-amber-300">نکته حیاتی زمان‌بندی: </strong>
                              {milestone.criticalAlert}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ۴. سوالات متداول اختصاصی این روش */}
          <section className="container mx-auto px-4 md:px-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-xs font-bold text-amber-400 block mb-1">
                  پاسخ‌های شفاف وکلای مقیم اروپا
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  پرسش‌های متداول {currentPathway.title} در {currentCountry.name}
                </h3>
              </div>

              <div className="space-y-3">
                {currentPathway.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md overflow-hidden transition"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-amber-300 transition cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-amber-400 font-mono text-xs">Q{idx + 1}.</span>
                          <span>{faq.q}</span>
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 text-amber-400 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-7 border-t border-white/5 pt-3 text-justify">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* تب مقایسه اجمالی سرعت کل ۸ کشور */}
      {activeTabSection === 'comparison' && (
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="max-w-5xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-amber-400 block mb-1">
                دید ۳۶۰ درجه برای بهترین انتخاب مهاجرتی
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                جدول مقایسه‌ای سرعت صدور، شرط حضور و پاسپورت در ۸ کشور اروپایی ۲۰۲۶
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-amber-300">
                    <th className="p-3 sm:p-4 font-black">کشور</th>
                    <th className="p-3 sm:p-4 font-black">روش شاخص</th>
                    <th className="p-3 sm:p-4 font-black">زمان صدور ویزا</th>
                    <th className="p-3 sm:p-4 font-black">شرط حضور سالانه</th>
                    <th className="p-3 sm:p-4 font-black">زمان اقامت دائم (PR)</th>
                    <th className="p-3 sm:p-4 font-black">زمان پاسپورت</th>
                    <th className="p-3 sm:p-4 font-black">اقدام</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {TIMELINE_COUNTRIES_2026.map((c) => {
                    const topPathway = c.pathways[0];
                    return (
                      <tr key={c.id} className="hover:bg-white/5 transition">
                        <td className="p-3 sm:p-4 font-bold flex items-center gap-2">
                          <span className="text-lg">{c.flag}</span>
                          <span>{c.name}</span>
                        </td>
                        <td className="p-3 sm:p-4 text-slate-300">
                          {topPathway.title}
                        </td>
                        <td className="p-3 sm:p-4 text-amber-300 font-mono font-bold">
                          {topPathway.totalDuration}
                        </td>
                        <td className="p-3 sm:p-4 text-slate-300">
                          {topPathway.presenceReq}
                        </td>
                        <td className="p-3 sm:p-4 text-emerald-300 font-bold">
                          {topPathway.prTimeline}
                        </td>
                        <td className="p-3 sm:p-4 text-sky-300 font-bold">
                          {topPathway.passportTimeline}
                        </td>
                        <td className="p-3 sm:p-4">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCountryId(c.id);
                              setSelectedPathwayId(topPathway.id);
                              setActiveTabSection('timeline');
                            }}
                            className="text-xs text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                          >
                            مشاهده تایم‌لاین ←
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* تب مقاله تحلیلی جامع حقوقی برای سئو و هوش مصنوعی (AIO & SEO Rich Article) */}
      {activeTabSection === 'guide' && (
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <article className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl leading-8 text-slate-300 text-sm sm:text-base space-y-8 text-justify">
            <header className="border-b border-white/10 pb-6 text-right">
              <span className="text-xs font-bold text-amber-400 block mb-2">
                دپارتمان تحقیقات حقوقی و کنسولی هلدینگ دیاکو
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                تحلیل جامع زمان‌بندی و راهکارهای کاهش مدت انتظار پرونده‌های اقامتی اروپا در سال ۲۰۲۶
              </h2>
              <p className="text-xs text-slate-400">
                تاریخ تدوین: ژانویه ۲۰۲۶ | آخرین ویرایش و انطباق با بخشنامه‌های MA35 وین، BAMF آلمان و AIMA
              </p>
            </header>

            <div>
              <h3 className="text-xl font-black text-white mb-3">
                ۱. گلوگاه‌های زمانی در پرونده‌های مهاجرتی اروپا کجاست؟
              </h3>
              <p>
                در سال ۲۰۲۶، بسیاری از متقاضیان ایرانی با چالش تاخیر در وقت‌های مصاحبه سفارتخانه‌ها و همچنین بررسی طولانی در ادارات اقامت داخلی کشورهای اروپایی روبرو هستند. بر اساس آمار پرونده‌های ثبت‌شده دیاکو، ۹۰ درصد تاخیرها ناشی از سه عامل اصلی است:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4 mt-3 text-slate-200">
                <li>
                  <strong>نقص در مدارک تمکن و گردش مالی:</strong> واریز مبالغ ناگهانی و بدون مستندات مالیاتی در ماه‌های پایانی که توسط مراجع کنسولی و اداراتی نظیر MA35 اتریش نیازمند استعلام‌های مجدد می‌شود.
                </li>
                <li>
                  <strong>عدم تایید اصالت قرارداد مسکن (Mietvertrag):</strong> ارائه قراردادهای صوری یا آپارتمان‌هایی که متراژ استاندارد شهرداری را برای کل اعضای خانواده تامین نمی‌کنند.
                </li>
                <li>
                  <strong>نبود پیگیری حضوری وکیل در کشور مقصد:</strong> بدون حضور فیزیکی وکیل، پرونده در صف‌های طولانی مکاتبات پستی قرار گرفته و ماه‌ها معطل می‌ماند.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-black text-white mb-3">
                ۲. تفاوت راهبردی اقدام از طریق وکلای مقیم دیاکو در وین و اروپا
              </h3>
              <p>
                هلدینگ بین‌المللی دیاکو با استقرار دفاتر رسمی در وین (Ausstellungsstraße 50, 1020 Wien) و وکلای ثبت‌شده در کانون وکلای دادگستری اتریش و آلمان، به عنوان نماینده قانونی شما (Rechtsanwalt) دسترسی مستقیم به باجه‌های اختصاصی ادارات مهاجرت دارد. این مزیت حقوقی به دیاکو امکان می‌دهد:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-amber-300 text-sm mb-1">تسریع صدور موافقت‌نامه اولیه</h4>
                  <p className="text-xs leading-6 text-slate-300">
                    دریافت Vorabzustimmung قبل از وقت سفارت در تهران، که زمان مصاحبه تا ویزا را به کمتر از ۱۰ روز کاری کاهش می‌دهد.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-emerald-300 text-sm mb-1">رزرو سهمیه ثانیه‌ای در ۲ ژانویه</h4>
                  <p className="text-xs leading-6 text-slate-300">
                    در روش تمکن مالی وین، وکلای دیاکو از اولین ثانیه‌های بازگشایی پورتال، سهمیه سالانه متقاضیان را قطعی ثبت می‌کنند.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black text-white mb-3">
                ۳. نقشه راه واقعی از کارت موقت تا پاسپورت قرمز اتحادیه اروپا
              </h3>
              <p>
                کسب پاسپورت اروپایی یک فرآیند منسجم و قانونی است که نیازمند برنامه‌ریزی از روز نخست است:
              </p>
              <p className="mt-2">
                در اتریش، آلمان و فرانسه پس از ۵ سال اقامت قانونی و رعایت شرط حضور سالانه، کارت اقامت دائم اتحادیه اروپا (Daueraufenthalt-EU) صادر می‌شود. این کارت مادام‌العمر است و دیگر به تمدید سالانه نیازی ندارد. با گذراندن آزمون دانش مدنی و اثبات زبان آلمانی یا فرانسوی، در سال ششم الی هشتم می‌توانید پاسپورت بیومتریک دریافت کرده و به ۱۸۹ کشور جهان بدون ویزا سفر کنید.
              </p>
            </div>
          </article>
        </section>
      )}

      {/* بنر CTA پایانی با هماهنگی وکیل دیاکو */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl bg-gradient-to-l from-[#082833] via-[#0b3342] to-[#07242e] border border-amber-400/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-4">
              <Sparkles className="h-4 w-4" />
              تضمین شفافیت زمانی در قرارداد رسمی دیاکو
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-snug">
              می‌خواهید تایم‌لاین پرونده خود را با وکیل مقیم وین بررسی کنید؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-7 mb-8">
              کارشناسان ارشد دیاکو شرایط تحصیلی، شغلی، سرمایه نقدی و مدارک خانواده شما را ارزیابی کرده و تاریخ‌های تقریبی اخذ وقت سفارت و کارت اقامت را مکتوب ارائه می‌دهند.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-8 py-4 text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                شروع ارزیابی آنلاین و زمان‌بندی پرونده
              </button>

              <button
                type="button"
                onClick={handleCopyPhone}
                className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-6 py-4 text-xs font-bold text-white transition flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="h-4 w-4 text-amber-400" />
                <span>{copiedPhone ? 'شماره دفتر وین کپی شد!' : 'تماس مستقیم با دفتر وین: ۴۳۶۸۸۹۷۶۳۲۵۶+'}</span>
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="rounded-2xl border border-white/10 hover:border-white/20 px-6 py-4 text-xs font-bold text-slate-300 transition cursor-pointer"
              >
                بازگشت به پرتال اصلی
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImmigrationTimelinePage;
