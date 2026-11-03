import React from 'react';
import { HERO_STATS, HERO_FEATURE_CARDS } from '../constants/content';
import DiacoLogo from './DiacoLogo';
import type { PageType } from './Header';

interface Props {
  onOpenAssessment: () => void;
  onSelectFeature?: (featureId: string) => void;
  onNavigateToPage?: (page: PageType) => void;
}

export const HeroSection: React.FC<Props> = ({ onOpenAssessment, onSelectFeature, onNavigateToPage }) => {
  const handleCardClick = (cardId: string) => {
    if (cardId === 'smart-assessment') {
      onOpenAssessment();
    } else if (cardId === 'interactive-map') {
      const el = document.getElementById('interactive-map');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (onSelectFeature) {
        onSelectFeature('interactive-map');
      }
    } else if (cardId === 'cost-viz') {
      if (onNavigateToPage) onNavigateToPage('cost-calculator');
      else window.location.hash = '#cost-calculator';
    } else if (cardId === 'doc-check') {
      if (onNavigateToPage) onNavigateToPage('document-checker');
      else window.location.hash = '#document-checker';
    } else if (cardId === 'timeline') {
      if (onNavigateToPage) onNavigateToPage('immigration-timeline');
      else window.location.hash = '#immigration-timeline';
    } else if (cardId === 'method-comp') {
      if (onNavigateToPage) onNavigateToPage('method-comparator');
      else window.location.hash = '#method-comparator';
    } else if (cardId === 'visa-comp') {
      if (onNavigateToPage) onNavigateToPage('visa-comparator');
      else window.location.hash = '#visa-comparator';
    } else if (cardId === 'edu-comp') {
      if (onNavigateToPage) onNavigateToPage('education-comparator');
      else window.location.hash = '#education-comparator';
    } else if (cardId === 'job-search') {
      if (onNavigateToPage) onNavigateToPage('job-search');
      else window.location.hash = '#job-search';
    } else if (cardId === 'country-guide') {
      if (onNavigateToPage) onNavigateToPage('country-guide');
      else window.location.hash = '#country-guide';
    } else if (cardId === 'visa-news') {
      if (onNavigateToPage) onNavigateToPage('visa-news');
      else window.location.hash = '#visa-news';
    } else if (cardId === 'online-consult') {
      if (onNavigateToPage) onNavigateToPage('online-consult');
      else window.location.hash = '#online-consult';
    } else if (onSelectFeature) {
      onSelectFeature(cardId);
    }
  };

  const renderCardIcon = (id: string) => {
    switch (id) {
      case 'smart-assessment':
        return (
          <svg className="w-7 h-7 stroke-current text-[#165566]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
        );
      case 'cost-viz':
        return (
          <svg className="w-7 h-7 stroke-current text-[#165566]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
            <rect x="4" y="2" width="16" height="20" rx="3" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="8" y1="6" x2="16" y2="6" strokeLinecap="round" />
            <line x1="8" y1="10" x2="10" y2="10" strokeLinecap="round" />
            <line x1="14" y1="10" x2="16" y2="10" strokeLinecap="round" />
            <line x1="8" y1="14" x2="10" y2="14" strokeLinecap="round" />
            <line x1="14" y1="14" x2="16" y2="14" strokeLinecap="round" />
            <line x1="8" y1="18" x2="16" y2="18" strokeLinecap="round" />
          </svg>
        );
      case 'interactive-map':
        return (
          <svg className="w-7 h-7 stroke-current text-[#165566]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503-14.498l4.475 2.37a1.125 1.125 0 01.522.993v11.73a1.125 1.125 0 01-1.625.992L15 16.5l-6 3-4.875-2.584A1.125 1.125 0 013.5 15.923V4.194a1.125 1.125 0 011.625-.992L9 4.5l6-3z" />
          </svg>
        );
      case 'doc-check':
        return (
          <svg className="w-7 h-7 stroke-current text-[#165566]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
            <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        );
      case 'timeline':
        return (
          <svg className="w-7 h-7 stroke-current text-[#165566]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
            <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          </svg>
        );
      case 'method-comp':
        return (
          <svg className="w-7 h-7 stroke-current text-[#165566]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        );
      case 'visa-comp':
        return (
          <svg className="w-7 h-7 stroke-current text-[#165566]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        );
      case 'edu-comp':
        return (
          <svg className="w-7 h-7 stroke-current text-[#165566]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147L12 6.75l7.74 3.397a.75.75 0 010 1.366L12 14.91l-7.74-3.397a.75.75 0 010-1.366z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12.75v4.5a6 6 0 0012 0v-4.5" />
          </svg>
        );
      case 'job-search':
        return (
          <svg className="w-7 h-7 stroke-current text-[#165566]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
            <rect x="3" y="6" width="18" height="15" rx="3" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            <line x1="3" y1="11" x2="21" y2="11" strokeLinecap="round" />
          </svg>
        );
      case 'country-guide':
        return (
          <svg className="w-7 h-7 stroke-current text-[#165566]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        );
      case 'visa-news':
        return (
          <svg className="w-7 h-7 stroke-current text-[#165566]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
          </svg>
        );
      case 'online-consult':
        return (
          <svg className="w-7 h-7 stroke-current text-[#165566]" fill="none" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.974-.974 5.972 5.972 0 011.057-3.035C4.545 15.688 3 13.96 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        );
      default:
        return <span>⭐</span>;
    }
  };

  return (
    <section className="relative overflow-hidden bg-transparent pt-4 pb-12 md:pt-6 md:pb-16">
      <div className="relative container mx-auto px-4 md:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-12">
          {/* ستون راست (متن‌ها و آمار) */}
          <div className="lg:col-span-6 flex flex-col items-start text-right">
            {/* نشان برتر */}
            <div className="mb-4 flex items-center gap-3">
              <DiacoLogo size={52} />
              <span className="inline-flex items-center gap-2 rounded-full border border-[#164353] bg-[#0c2e3b] px-4 py-1.5 text-xs font-bold text-white shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5a623] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f5a623]" />
                </span>
                هلدینگ مهاجرتی دیاکو
              </span>
            </div>

            {/* تیتر اصلی */}
            <h1 className="text-3xl font-black leading-[1.35] text-[#082833] sm:text-5xl lg:text-5xl">
              دروازه امن و تخصصی{' '}
              <span className="text-[#f5a623] drop-shadow-xs">مهاجرت به اروپا و جهان</span>
            </h1>

            {/* توضیحات */}
            <p className="mt-4 text-xs sm:text-sm font-bold text-slate-700 leading-7 text-justify">
              ارزیابی هوشمند شانس ویزا! اخذ اقامت تمکن مالی (خودحمایتی)، کارت‌های اقامت کاری و بلوکارت، ویزای تحصیلی و خرید ملک با پشتیبانی حقوقی مستقیم در سراسر اروپا.
            </p>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-600">
              با همراهی وکلای مجرب اروپایی و کارشناسان ارشد، با بیش از ۲۰ سال سابقه درخشان و ۹۰۰۰ پرونده موفق.
            </p>

            {/* دکمه‌های اکشن */}
            <div className="mt-7 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => (onNavigateToPage ? onNavigateToPage('cost-calculator') : onSelectFeature ? onSelectFeature('cost-viz') : onOpenAssessment())}
                className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#6b21a8] to-[#7c3aed] hover:from-[#581c87] hover:to-[#6b21a8] px-4.5 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/20 text-sm">📊</div>
                <div className="text-right">
                  <span className="block text-xs font-black">محاسبه‌گر آنلاین هزینه‌ها</span>
                  <span className="block text-[10px] text-white/80 font-normal">تخمین، مستقیم وکالت و حرفه‌ای</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => (onNavigateToPage ? onNavigateToPage('online-consult') : onSelectFeature ? onSelectFeature('online-consult') : undefined)}
                className="flex items-center gap-2.5 rounded-2xl bg-[#059669] hover:bg-[#047857] px-4.5 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/20 text-sm">💬</div>
                <div className="text-right">
                  <span className="block text-xs font-black">مشاوره حضوری و آنلاین</span>
                  <span className="block text-[10px] text-white/80 font-normal">تهران، وین، آتن</span>
                </div>
              </button>

              <button
                type="button"
                onClick={onOpenAssessment}
                className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] hover:from-[#fce08b] hover:to-[#f5a623] px-4.5 py-3 text-xs sm:text-sm font-black text-[#082833] shadow-md transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#082833]/15 text-sm">⚡</div>
                <div className="text-right">
                  <span className="block text-xs font-black">شروع ارزیابی هوشمند</span>
                  <span className="block text-[10px] text-[#082833]/85 font-normal">تحلیل شانس نیاز</span>
                </div>
              </button>
            </div>

            {/* آمار افتخارات مطابق تصویر */}
            <div className="mt-8 grid w-full grid-cols-2 gap-2.5 sm:grid-cols-4">
              {HERO_STATS.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#164353] bg-[#0c2e3b] p-3.5 text-center shadow-sm transition hover:border-[#f5a623]/60"
                >
                  <p className="text-2xl sm:text-3xl font-black text-[#f5a623]">{stat.value}</p>
                  <p className="mt-1 text-xs font-bold text-white">{stat.label}</p>
                  {stat.note && <p className="mt-0.5 text-[10px] text-slate-300">{stat.note}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================
              ستون چپ: گرید ۱۲ عددی اختصاصی فیچرهای هوشمند دیاکو
              روی کارت‌های سفید لوکس با حاشیه ظریف بر بستر سنگ مرمر
             ======================================================== */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
              {HERO_FEATURE_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleCardClick(card.id)}
                  className="group flex flex-col items-center justify-between rounded-2xl sm:rounded-3xl border border-white/80 bg-white/95 hover:bg-white p-3.5 sm:p-4.5 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal-500/40 cursor-pointer min-h-[120px] sm:min-h-[135px]"
                >
                  {/* آیکون در بالا وسط با پس‌زمینه لطیف */}
                  <div className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-2xl bg-[#edf4f7] text-[#0d4554] transition-transform duration-300 group-hover:scale-110 shadow-2xs">
                    {renderCardIcon(card.id)}
                  </div>

                  {/* عنوان و توضیحات کاملاً منطبق با تصویر */}
                  <div className="mt-2 w-full">
                    <h4 className="text-xs sm:text-sm font-black text-[#082933] transition-colors group-hover:text-teal-900">
                      {card.title}
                    </h4>
                    <p className="mt-1 text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-4 sm:leading-4.5 line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
