import React, { useState, useMemo } from 'react';
import { DIACO_SERVICES, type DiacoServiceCategory } from '../constants/content';

const FILTER_GROUPS = [
  { id: 'all', label: 'همه ۱۲ خدمات تخصصی' },
  { id: 'work_group', label: 'کاری، بلوکارت و کادر درمان', keys: ['bluecard', 'medical', 'work', 'nomad'] },
  { id: 'study_group', label: 'تحصیلی و دوره‌های زبان', keys: ['education', 'courses'] },
  { id: 'business_group', label: 'ثبت شرکت و استارت‌آپ', keys: ['business', 'startup'] },
  { id: 'wealth_group', label: 'تمکن مالی، ملک و شهروندی', keys: ['personal', 'realestate', 'citizenship'] },
  { id: 'artist_group', label: 'هنرمندان و نخبگان', keys: ['artist'] },
];

const AFTER_ARRIVAL_SERVICES = [
  { icon: '🏠', title: 'اجاره مسکن رسمی', desc: 'عقد قرارداد اجاره با متراژ قانونی برای تاییدیه اقامت' },
  { icon: '📋', title: 'ثبت آدرس و اقامت', desc: 'انجام ثبت‌نام قانونی در شهرداری یا سازمان مربوطه کشور مقصد' },
  { icon: '🏦', title: 'افتتاح حساب بانکی', desc: 'همراهی حضوری در بانک‌های معتبر جهت افتتاح حساب یورو' },
  { icon: '🏥', title: 'بیمه درمانی', desc: 'ثبت بیمه درمانی دولتی یا خصوصی معتبر در کشور مقصد و دریافت کارت خدمات درمانی' },
  { icon: '🪪', title: 'دریافت کارت اقامت', desc: 'حضور وکیل در جلسه تحویل کارت فیزیکی اقامت در اداره مهاجرت کشور مقصد' },
  { icon: '👨‍👩‍👧', title: 'پیوست خانواده', desc: 'اقدام فوری جهت الحاق قانونی همسر و فرزندان زیر ۱۸ سال' },
  { icon: '🏫', title: 'ثبت‌نام مدارس فرزندان', desc: 'مشاوره و ثبت‌نام در بهترین مدارس دولتی و بین‌المللی' },
  { icon: '🗣️', title: 'کلاس‌های زبان رسمی', desc: 'ثبت‌نام در موسسات معتبر زبان رسمی کشور مقصد (آلمانی، انگلیسی، فرانسه و...)' },
];

import type { PageType } from './Header';

interface Props {
  onSelectService?: (serviceTitle: string) => void;
  onNavigateToBlueCard?: (countryKey?: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary') => void;
  onNavigateToPage?: (page: PageType) => void;
}

export const ServicesSection: React.FC<Props> = ({
  onSelectService,
  onNavigateToBlueCard,
  onNavigateToPage,
}) => {
  const [activeGroup, setActiveGroup] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubService, setSelectedSubService] = useState<{
    serviceTitle: string;
    subTitle: string;
    tag?: string;
    countries: string[];
  } | null>(null);

  const filteredServices = useMemo(() => {
    return DIACO_SERVICES.filter((service) => {
      // فیلتر بر اساس دسته
      let matchesGroup = true;
      if (activeGroup !== 'all') {
        const groupObj = FILTER_GROUPS.find((g) => g.id === activeGroup);
        if (groupObj && groupObj.keys) {
          matchesGroup = groupObj.keys.includes(service.categoryKey);
        }
      }

      // فیلتر بر اساس جستجو (عنوان، کشور، یا زیرخدمات)
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesTitle = service.title.toLowerCase().includes(q);
        const matchesDesc = service.description.toLowerCase().includes(q);
        const matchesCountry = service.countries.some((c) => c.toLowerCase().includes(q));
        const matchesSub = service.subServices.some(
          (s) => s.title.toLowerCase().includes(q) || (s.tag && s.tag.toLowerCase().includes(q))
        );
        matchesSearch = matchesTitle || matchesDesc || matchesCountry || matchesSub;
      }

      return matchesGroup && matchesSearch;
    });
  }, [activeGroup, searchQuery]);

  return (
    <section id="services" className="relative overflow-hidden bg-[#061a21] py-20 sm:py-24" dir="rtl">
      {/* جلوه‌های نوری محیطی */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-[#f5a623]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-[#0e7490]/20 blur-[130px]" />

      <div className="relative container mx-auto px-4 md:px-8">
        {/* سربرگ بخش با عنوان رسمی و شعار درخواستی دیاکو */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold tracking-wide text-amber-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#f5a623]" />
            ۱۲ دپارتمان تخصصی حقوقی و بین‌المللی
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
            خدمات مهاجرتی دیاکو
          </h2>
          <p className="mt-3 text-sm sm:text-base font-bold text-amber-300/90 leading-relaxed">
            «دیاکو؛ همراه شما در تمام مراحل اخذ ویزا، پذیرش و اقامت»
          </p>
          <p className="mt-1 text-xs text-slate-300 max-w-xl mx-auto">
            پوشش یکپارچه روش‌های مهاجرت کاری، تمکن مالی، تحصیلی، ثبت شرکت و گلدن ویزا با حضور وکلای بومی اروپایی
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-l from-[#fed871] to-[#f5a623]" />
        </div>

        {/* فیلترها و نوار جستجوی سریع */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          {/* تب‌های دسته‌بندی */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {FILTER_GROUPS.map((group) => {
              const isActive = activeGroup === group.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveGroup(group.id)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#f5a623] text-[#082833] shadow-glow font-black'
                      : 'bg-white/[0.05] text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>

          {/* فیلد جستجوی کشور یا خدمت */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی کشور یا خدمت (مثال: آلمان، بلوکارت)..."
              className="w-full rounded-xl border border-white/15 bg-black/40 pr-9 pl-3 py-2 text-xs text-white placeholder-slate-400 focus:border-[#f5a623] focus:outline-none"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              🔍
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* گرید ۱۲ خدمت تخصصی دیاکو */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#f5a623]/40 hover:shadow-[0_20px_60px_-20px_rgba(245,166,35,0.25)]"
            >
              {/* افکت هاور */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${service.accentColor}25, transparent 60%)`,
                }}
              />

              <div className="relative">
                {/* سربرگ کارت: آیکون و نشان */}
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-13 w-13 place-items-center rounded-2xl bg-white/[0.08] text-2xl shadow-inner border border-white/10 group-hover:scale-110 transition-transform"
                  >
                    {service.icon}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold"
                    style={{
                      backgroundColor: `${service.accentColor}20`,
                      color: service.accentColor,
                      border: `1px solid ${service.accentColor}40`,
                    }}
                  >
                    {service.badge}
                  </span>
                </div>

                {/* عنوان و توضیحات اصلی */}
                <h3 className="mt-4 text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-300 text-justify font-medium">
                  {service.description}
                </p>

                {/* کشورهای تحت پوشش */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-[10px] font-bold text-slate-400 mb-1.5">کشورهای مقصد:</p>
                  <div className="flex flex-wrap gap-1">
                    {service.countries.map((c) => (
                      <span
                        key={c}
                        className="rounded-lg bg-white/[0.06] border border-white/10 px-2 py-0.5 text-[10px] text-slate-200 font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* فهرست زیرخدمات و راهنماهای مرتبط */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-[10px] font-bold text-amber-300 mb-2 flex items-center justify-between">
                    <span>زیرخدمات و مسیرهای اختصاصی:</span>
                    <span className="text-[9px] text-slate-400 font-normal">کلیک برای جزئیات</span>
                  </p>
                  <ul className="space-y-1.5">
                    {service.subServices.map((sub, sIdx) => {
                      let dedicatedPage: PageType | null = null;
                      let dedicatedCountryKey: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary' | null = null;

                      if (service.id === 'srv-bluecard') {
                        if (sub.title.includes('آلمان')) {
                          dedicatedPage = 'german-blue-card';
                          dedicatedCountryKey = 'germany';
                        } else if (sub.title.includes('اسپانیا')) {
                          dedicatedPage = 'spain-blue-card';
                          dedicatedCountryKey = 'spain';
                        } else if (sub.title.includes('ایتالیا')) {
                          dedicatedPage = 'italy-blue-card';
                          dedicatedCountryKey = 'italy';
                        } else if (sub.title.includes('اتریش')) {
                          dedicatedPage = 'austria-blue-card';
                          dedicatedCountryKey = 'austria';
                        } else if (sub.title.includes('مجارستان')) {
                          dedicatedPage = 'hungary-blue-card';
                          dedicatedCountryKey = 'hungary';
                        }
                      } else if (service.id === 'srv-medical') {
                        if (sub.title.includes('آلمان')) {
                          dedicatedPage = 'medical-germany';
                        } else if (sub.title.includes('اتریش')) {
                          dedicatedPage = 'medical-austria-nursing';
                        } else if (sub.title.includes('فنلاند')) {
                          dedicatedPage = 'medical-finland';
                        } else if (sub.title.includes('دانمارک')) {
                          dedicatedPage = 'medical-denmark';
                        }
                      } else if (service.id === 'srv-courses') {
                        if (sub.title.includes('آوسبیلدونگ')) {
                          dedicatedPage = 'ausbildung-germany';
                        } else if (sub.title.includes('اسپانیا')) {
                          dedicatedPage = 'language-spain';
                        } else if (sub.title.includes('فرانسه')) {
                          dedicatedPage = 'language-france';
                        } else if (sub.title.includes('هلند')) {
                          dedicatedPage = 'language-netherlands';
                        } else if (sub.title.includes('کالج زبان در مجارستان')) {
                          dedicatedPage = 'language-hungary';
                        } else if (sub.title.includes('کالج‌های مجارستان')) {
                          dedicatedPage = 'colleges-hungary';
                        } else if (sub.title.includes('دانمارک')) {
                          dedicatedPage = 'language-denmark';
                        }
                      } else if (service.id === 'srv-startup') {
                        if (sub.title.includes('کانادا')) {
                          dedicatedPage = 'startup-canada';
                        } else if (sub.title.includes('اتریش')) {
                          dedicatedPage = 'startup-austria';
                        } else if (sub.title.includes('آلمان')) {
                          dedicatedPage = 'startup-germany';
                        } else if (sub.title.includes('فرانسه')) {
                          dedicatedPage = 'startup-france';
                        } else if (sub.title.includes('هلند')) {
                          dedicatedPage = 'startup-netherlands';
                        } else if (sub.title.includes('فنلاند')) {
                          dedicatedPage = 'startup-finland';
                        } else if (sub.title.includes('دانمارک')) {
                          dedicatedPage = 'startup-denmark';
                        }
                      } else if (service.id === 'srv-citizenship') {
                        if (sub.title.includes('ترکیه')) {
                          dedicatedPage = 'citizenship-turkey';
                        } else if (sub.title.includes('دومینیکا')) {
                          dedicatedPage = 'citizenship-dominica';
                        } else if (sub.title.includes('صربستان')) {
                          dedicatedPage = 'citizenship-serbia';
                        } else if (sub.title.includes('سائوتومه')) {
                          dedicatedPage = 'citizenship-sao-tome';
                        }
                      } else if (service.id === 'srv-business') {
                        if (sub.title.includes('امارات') || sub.title.includes('دبی')) {
                          dedicatedPage = 'business-dubai';
                        } else if (sub.title.includes('اتریش')) {
                          dedicatedPage = 'business-austria';
                        } else if (sub.title.includes('هلند')) {
                          dedicatedPage = 'business-netherlands';
                        } else if (sub.title.includes('فرانسه')) {
                          dedicatedPage = 'business-france';
                        } else if (sub.title.includes('ترکیه')) {
                          dedicatedPage = 'business-turkey';
                        } else if (sub.title.includes('یونان')) {
                          dedicatedPage = 'business-greece';
                        } else if (sub.title.includes('لهستان')) {
                          dedicatedPage = 'business-poland';
                        } else if (sub.title.includes('پرتغال')) {
                          dedicatedPage = 'business-portugal';
                        } else if (sub.title.includes('اسلوواکی')) {
                          dedicatedPage = 'business-slovakia';
                        } else if (sub.title.includes('مجارستان')) {
                          dedicatedPage = 'business-hungary';
                        } else if (sub.title.includes('لتونی')) {
                          dedicatedPage = 'business-latvia';
                        }
                      } else if (service.id === 'srv-artist') {
                        if (sub.title.includes('اتریش')) {
                          dedicatedPage = 'artist-austria';
                        } else if (sub.title.includes('برلین')) {
                          dedicatedPage = 'artist-germany';
                        } else if (sub.title.includes('فرانسه')) {
                          dedicatedPage = 'talent-france';
                        } else if (sub.title.includes('بلژیک')) {
                          dedicatedPage = 'artist-belgium';
                        } else if (sub.title.includes('اسپانیا')) {
                          dedicatedPage = 'artist-spain';
                        }
                      } else if (service.id === 'srv-nomad') {
                        if (sub.title.includes('اسپانیا')) {
                          dedicatedPage = 'nomad-spain';
                        } else if (sub.title.includes('مجارستان')) {
                          dedicatedPage = 'nomad-hungary';
                        } else if (sub.title.includes('کرواسی')) {
                          dedicatedPage = 'nomad-croatia';
                        } else if (sub.title.includes('امارات')) {
                          dedicatedPage = 'nomad-dubai';
                        } else if (sub.title.includes('آلمان')) {
                          dedicatedPage = 'freelance-germany';
                        } else if (sub.title.includes('فنلاند')) {
                          dedicatedPage = 'selfemployed-finland';
                        }
                      } else if (service.id === 'srv-personal') {
                        if (sub.title.includes('اتریش')) {
                          dedicatedPage = 'financial-austria';
                        } else if (sub.title.includes('اسپانیا')) {
                          dedicatedPage = 'financial-spain';
                        } else if (sub.title.includes('فرانسه')) {
                          dedicatedPage = 'financial-france';
                        }
                      } else if (service.id === 'srv-work') {
                        if (sub.title.includes('آلمان') || sub.title.includes('شانس')) {
                          dedicatedPage = 'jobseeker-germany';
                        } else if (sub.title.includes('نروژ')) {
                          dedicatedPage = 'jobseeker-norway';
                        } else if (sub.title.includes('دانمارک')) {
                          dedicatedPage = 'jobseeker-denmark';
                        } else if (sub.title.includes('اتریش')) {
                          dedicatedPage = 'jobseeker-austria';
                        } else if (sub.title.includes('پرتغال')) {
                          dedicatedPage = 'jobseeker-portugal';
                        }
                      } else if (service.id === 'srv-realestate') {
                        if (sub.title.includes('اتریش')) {
                          dedicatedPage = 'realestate-austria';
                        } else if (sub.title.includes('ترکیه')) {
                          dedicatedPage = 'realestate-turkey';
                        } else if (sub.title.includes('فرانسه')) {
                          dedicatedPage = 'realestate-france';
                        } else if (sub.title.includes('مجارستان')) {
                          dedicatedPage = 'realestate-hungary';
                        } else if (sub.title.includes('یونان')) {
                          dedicatedPage = 'realestate-greece';
                        } else if (sub.title.includes('لتونی')) {
                          dedicatedPage = 'realestate-latvia';
                        } else if (sub.title.includes('اسلوواکی')) {
                          dedicatedPage = 'realestate-slovakia';
                        }
                      } else if (service.id === 'srv-education') {
                        if (sub.title.includes('اسپانیا')) {
                          dedicatedPage = 'academic-spain';
                        } else if (sub.title.includes('بریتانیا') || sub.title.includes('انگلستان')) {
                          dedicatedPage = 'academic-uk';
                        } else if (sub.title.includes('مهاجرت تحصیلی به اتریش')) {
                          dedicatedPage = 'academic-austria';
                        } else if (sub.title.includes('ویزای تحصیلی اتریش')) {
                          dedicatedPage = 'academic-austria-medical';
                        } else if (sub.title.includes('هلند')) {
                          dedicatedPage = 'academic-netherlands';
                        } else if (sub.title.includes('مجارستان')) {
                          dedicatedPage = 'academic-hungary';
                        } else if (sub.title.includes('کانادا')) {
                          dedicatedPage = 'academic-canada';
                        }
                      }

                      const hasDedicatedPage = Boolean(dedicatedPage);

                      return (
                        <li key={sIdx}>
                          <button
                            type="button"
                            onClick={() => {
                              if (dedicatedPage) {
                                if (onNavigateToPage) {
                                  onNavigateToPage(dedicatedPage);
                                } else if (dedicatedCountryKey && onNavigateToBlueCard) {
                                  onNavigateToBlueCard(dedicatedCountryKey);
                                } else {
                                  window.location.hash = `#${dedicatedPage}`;
                                }
                              } else {
                                setSelectedSubService({
                                  serviceTitle: service.title,
                                  subTitle: sub.title,
                                  tag: sub.tag,
                                  countries: service.countries,
                                });
                              }
                            }}
                            className={`w-full flex items-center justify-between rounded-xl px-2.5 py-1.5 text-[11px] transition text-right group/sub cursor-pointer ${
                              hasDedicatedPage
                                ? 'bg-gradient-to-l from-amber-500/15 to-amber-400/5 hover:from-amber-500/25 hover:to-amber-400/15 text-white border border-amber-400/40 shadow-[0_0_12px_rgba(245,166,35,0.15)] ring-1 ring-amber-400/20'
                                : 'bg-black/25 hover:bg-white/10 text-slate-200 hover:text-white border border-transparent hover:border-white/10'
                            }`}
                          >
                            <span className="font-semibold flex items-center gap-1.5">
                              <span className="text-[#f5a623] text-xs">▸</span>
                              <span>{sub.title}</span>
                              {hasDedicatedPage && (
                                <span className="mr-1 rounded bg-[#f5a623] text-[#082833] px-1 py-0.2 text-[8px] font-black">
                                  صفحه اختصاصی
                                </span>
                              )}
                            </span>
                            {sub.tag && (
                              <span className="text-[9px] text-amber-300/80 font-normal bg-white/5 px-1.5 py-0.5 rounded">
                                {sub.tag}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* دکمه اکشن کارت */}
              <div className="relative mt-6 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onSelectService?.(service.title)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] py-2.5 text-xs font-bold text-white transition-all duration-300 hover:border-[#f5a623] hover:bg-[#f5a623] hover:text-[#082833] cursor-pointer"
                >
                  <span>درخواست ارزیابی {service.title}</span>
                  <span>←</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* خدمات پس از ورود */}
        <div className="mt-20 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
<h3 className="text-lg font-black text-white sm:text-xl">
  خدمات پس از ورود (After-Arrival Services) در اروپا
</h3>
              <p className="mt-1 text-[11px] text-slate-300 sm:text-xs">
                همراهی در تمام مراحل استقرار قانونی و اداری جهت راحتی و آرامش خاطر متقاضیان و خانواده‌ها
              </p>
            </div>
<span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold text-emerald-300">
  پشتیبانی در سراسر اروپا
</span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AFTER_ARRIVAL_SERVICES.map((item) => (
              <div
                key={item.title}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (onNavigateToPage) {
                    onNavigateToPage('after-arrival');
                  } else {
                    window.location.hash = '#after-arrival';
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('after-arrival');
                  }
                }}
                className="group flex flex-col justify-between rounded-2xl border border-white/[0.09] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4.5 transition-all duration-300 hover:border-amber-400/60 hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(245,166,35,0.25)] cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.08] text-xl border border-white/10 group-hover:scale-110 group-hover:bg-amber-400/20 transition-all duration-300">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-300">{item.desc}</p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-bold text-amber-300/80 group-hover:text-amber-300">
                  <span>راهنمای استقرار ۲۰۲۶</span>
                  <span className="transition-transform duration-200 group-hover:-translate-x-1">صفحه اختصاصی ←</span>
                </div>
              </div>
            ))}
          </div>

          {/* آمار پایینی */}
          <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-6">
              {[
                { value: '۱۰۰٪', label: 'تضمین حقوقی قرارداد' },
                { value: '+۲،۰۰۰', label: 'پرونده اقامتی موفق' },
                { value: '۱۰+ سال', label: 'سابقه مداوم در اروپا' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-base font-black text-[#f5a623] sm:text-lg">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                if (onNavigateToPage) {
                  onNavigateToPage('after-arrival');
                } else {
                  onSelectService?.('خدمات پس از ورود');
                }
              }}
              className="group inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-gradient-to-l from-amber-500/20 to-amber-400/10 px-5 py-2.5 text-xs font-black text-amber-300 transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-slate-950 shadow-glow cursor-pointer"
            >
              <span>مشاهده صفحه و راهنمای کامل خدمات پس از ورود ۲۰۲۶</span>
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            </button>
          </div>
        </div>
      </div>

      {/* مدال جزئیات زیرخدمت انتخابی */}
      {selectedSubService && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedSubService(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-[#082833] border border-white/20 p-6 text-white shadow-2xl relative cursor-default"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-300">
                  {selectedSubService.serviceTitle}
                </span>
                <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                  {selectedSubService.subTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubService(null)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-3 text-xs leading-6 text-slate-300">
              {selectedSubService.tag && (
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-amber-200 font-medium">
                  <strong>ویژگی کلیدی:</strong> {selectedSubService.tag}
                </div>
              )}
              <p>
                <strong>کشورهای مرتبط:</strong> {selectedSubService.countries.join('، ')}
              </p>
              <p className="text-slate-300">
                هلدینگ بین‌المللی دیاکو فرآیند این پرونده را از ارزیابی اولیه، معادل‌سازی، ثبت نوبت کنسولی، تایید مدارک و پیگیری مستقیم وکلای مقیم در مقصد تحت پوشش قرار می‌دهد.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              {(() => {
                let countryKey: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary' | null = null;
                if (selectedSubService.subTitle.includes('آلمان')) countryKey = 'germany';
                else if (selectedSubService.subTitle.includes('اسپانیا')) countryKey = 'spain';
                else if (selectedSubService.subTitle.includes('ایتالیا')) countryKey = 'italy';
                else if (selectedSubService.subTitle.includes('اتریش')) countryKey = 'austria';
                else if (selectedSubService.subTitle.includes('مجارستان')) countryKey = 'hungary';

                if (countryKey && onNavigateToBlueCard) {
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubService(null);
                        onNavigateToBlueCard(countryKey!);
                      }}
                      className="w-full rounded-xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-4 py-2.5 text-xs font-black text-[#082833] shadow-glow cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>ورود به صفحه اختصاصی {selectedSubService.subTitle} ۲۰۲۶</span>
                      <span>←</span>
                    </button>
                  );
                }
                return null;
              })()}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubService(null);
                    onSelectService?.(selectedSubService.subTitle);
                  }}
                  className="flex-1 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-bold text-white border border-white/20 cursor-pointer"
                >
                  ارزیابی شرایط برای {selectedSubService.subTitle}
                </button>
                <a
                  href="tel:+982191693955"
                  className="rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-bold text-white text-center"
                >
                  تماس با وکیل
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
