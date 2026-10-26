import React, { useState, useEffect } from 'react';
import DiacoLogo from './DiacoLogo';

export type PageType =
  | 'home'
  | 'german-blue-card'
  | 'spain-blue-card'
  | 'italy-blue-card'
  | 'austria-blue-card'
  | 'hungary-blue-card'
  // مهاجرت کادر درمان
  | 'medical-germany'
  | 'medical-austria-nursing'
  | 'medical-finland'
  | 'medical-denmark'
  // آوسبیلدونگ و دوره‌های زبان
  | 'ausbildung-germany'
  | 'language-spain'
  | 'language-france'
  | 'language-netherlands'
  | 'language-hungary'
  | 'colleges-hungary'
  | 'language-denmark'
  // ویزای استارت‌آپ
  | 'startup-canada'
  | 'startup-austria'
  | 'startup-germany'
  | 'startup-france'
  | 'startup-netherlands'
  | 'startup-finland'
  | 'startup-denmark'
  // شهروندی و پاسپورت دوم
  | 'citizenship-turkey'
  | 'citizenship-dominica'
  | 'citizenship-serbia'
  | 'citizenship-sao-tome'
  // ثبت شرکت و بیزینس
  | 'business-dubai'
  | 'business-austria'
  | 'business-netherlands'
  | 'business-france'
  | 'business-turkey'
  | 'business-greece'
  | 'business-poland'
  | 'business-portugal'
  | 'business-slovakia'
  | 'business-hungary'
  | 'business-latvia'
  // هنرمندان و نخبگان
  | 'artist-austria'
  | 'artist-germany'
  | 'talent-france'
  | 'artist-belgium'
  | 'artist-spain'
  // دیجیتال نوماد و فریلنسر
  | 'nomad-spain'
  | 'nomad-hungary'
  | 'nomad-croatia'
  | 'nomad-dubai'
  | 'freelance-germany'
  | 'selfemployed-finland'
  // تمکن مالی (خودحمایتی)
  | 'financial-austria'
  | 'financial-spain'
  | 'financial-france'
  // ویزای جستجوی کار
  | 'jobseeker-germany'
  | 'jobseeker-norway'
  | 'jobseeker-denmark'
  | 'jobseeker-austria'
  | 'austria-rwr'
  | 'jobseeker-portugal'
  // خرید ملک و ویزای طلایی
  | 'realestate-austria'
  | 'realestate-turkey'
  | 'realestate-france'
  | 'realestate-hungary'
  | 'realestate-greece'
  | 'realestate-latvia'
  | 'realestate-slovakia'
  // تحصیل در دانشگاه
  | 'academic-spain'
  | 'academic-uk'
  | 'academic-austria'
  | 'academic-austria-medical'
  | 'academic-netherlands'
  | 'academic-hungary'
  | 'academic-canada'
  // سامانه‌ها و ابزارهای هوشمند دیاکو
  | 'cost-calculator'
  | 'document-checker'
  | 'method-comparator'
  | 'immigration-timeline'
  | 'visa-comparator'
  | 'education-comparator'
  | 'after-arrival'
  | 'job-search'
  | 'country-guide'
  | 'visa-news'
  | 'online-consult'
  | 'blog'
  | 'blog-post'
  // صفحات اختصاصی کلیدی هلدینگ دیاکو
  | 'services'
  | 'interactive-map'
  | 'success-cases'
  | 'about-us'
  | 'podcasts'
  | 'contact-us';

interface Props {
  onOpenAssessment: () => void;
  currentPage?: PageType;
  onNavigateHome?: () => void;
  onNavigateToCountry?: (countryKey: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary') => void;
  onNavigateToBlueCard?: (countryKey?: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary') => void;
  onNavigateToPage?: (page: PageType) => void;
}

const NAV_LINKS: { href: string; label: string; page?: PageType }[] = [
  { href: '/services', label: 'خدمات ما', page: 'services' },
  { href: '/interactive-map', label: 'نقشه پرونده‌ها', page: 'interactive-map' },
  { href: '/success-cases', label: 'پرونده‌های موفق', page: 'success-cases' },
  { href: '/blog', label: 'وبلاگ و تحلیل‌ها', page: 'blog' },
  { href: '/about-us', label: 'درباره دیاکو', page: 'about-us' },
  { href: '/podcasts', label: 'رادیو مهاجرت', page: 'podcasts' },
  { href: '#stories', label: 'داستان‌های موفقیت' },
  { href: '/contact-us', label: 'تماس با ما', page: 'contact-us' },
];

export const Header: React.FC<Props> = ({
  onOpenAssessment,
  currentPage = 'home',
  onNavigateHome,
  onNavigateToCountry,
  onNavigateToBlueCard,
  onNavigateToPage,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08222b]/95 shadow-soft backdrop-blur-xl border-b border-white/10'
          : 'bg-[#0b2933]/95 backdrop-blur-md border-b border-white/10'
      }`}
      dir="rtl"
    >
      {/* نوار بالایی اعلامیه‌ها و افتخارات (برگرفته از بنر رسمی دیاکو) */}
      <div className="hidden lg:block bg-[#05181f] border-b border-white/10 py-1.5 px-4 text-[11px] text-slate-300">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-300 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5a623] animate-pulse" />
              هلدینگ مهاجرتی دیاکو — با بیش از ۲۰ سال تجربه موفق در امور مهاجرت
            </span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">
              دفاتر رسمی در وین، آتن و تهران
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center flex-wrap gap-1 text-slate-400 text-[10px]">
              <span className="text-emerald-400">✓</span>
              <span>پرتال‌های تخصصی:</span>
              <a href="https://otrish-iran.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">Otrish-Iran</a>
              <span>•</span>
              <a href="https://alman-iran.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">Alman-Iran</a>
              <span>•</span>
              <a href="https://spain-iran.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">Spain-Iran</a>
              <span>•</span>
              <a href="https://ukiran.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">UKIran</a>
              <span>•</span>
              <a href="https://hu-ir.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">HU-IR</a>
              <span>•</span>
              <a href="https://greece-iran.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">Greece-Iran</a>
              <span>•</span>
              <a href="https://iran-portugal.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">Iran-Portugal</a>
            </div>
            <a
              href="https://wa.me/989197340829"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
            >
              <span>واتساپ ۲۴/۷</span>
              <span>💬</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 py-2.5 md:px-8">
        {/* برند و لوگو */}
        <button
          type="button"
          onClick={() => {
            if (onNavigateHome) onNavigateHome();
            else window.location.hash = '';
          }}
          className="flex items-center gap-3 group text-right cursor-pointer"
        >
          <DiacoLogo size={42} />
          <div className="leading-tight">
            <span className="block text-[11px] font-bold text-[#f5a623] tracking-wide">
              با بیش از ۲۰ سال تجربه موفق
            </span>
            <span className="block text-[15px] sm:text-[17px] font-black text-white">
              هلدینگ بین‌المللی دیاکو
            </span>
          </div>
        </button>

        {/* منوی دسکتاپ */}
        <nav className="hidden xl:flex xl:items-center xl:gap-1" aria-label="منوی اصلی">
          <button
            type="button"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              else window.location.hash = '';
            }}
            className={`rounded-xl px-2.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              currentPage === 'home'
                ? 'bg-white/10 text-amber-300'
                : 'text-slate-200 hover:bg-white/10 hover:text-white'
            }`}
          >
            صفحه اصلی
          </button>

          {/* پیوند ویژه به صفحات اختصاصی بلوکارت کشورهای اروپایی */}
          <div className="relative group">
            <button
              type="button"
              className={`rounded-xl px-2.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                currentPage !== 'home'
                  ? 'bg-[#f5a623] text-[#082833] font-black shadow-glow'
                  : 'text-amber-300 border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20'
              }`}
            >
              <span>🇪🇺</span>
              <span>
                {currentPage === 'german-blue-card'
                  ? '🇩🇪 بلوکارت آلمان'
                  : currentPage === 'spain-blue-card'
                  ? '🇪🇸 بلوکارت اسپانیا'
                  : currentPage === 'italy-blue-card'
                  ? '🇮🇹 بلوکارت ایتالیا'
                  : currentPage === 'austria-blue-card'
                  ? '🇦🇹 بلوکارت اتریش'
                  : currentPage === 'hungary-blue-card'
                  ? '🇭🇺 بلوکارت مجارستان'
                  : currentPage === 'medical-germany'
                  ? '🩺 کادر درمان آلمان'
                  : currentPage === 'medical-austria-nursing'
                  ? '🩺 پرستاران اتریش'
                  : currentPage === 'medical-finland'
                  ? '🩺 پزشکان فنلاند'
                  : currentPage === 'medical-denmark'
                  ? '🩺 کادر درمان دانمارک'
                  : currentPage === 'ausbildung-germany'
                  ? '🎓 آوسبیلدونگ آلمان'
                  : currentPage === 'language-spain'
                  ? '🎓 زبان اسپانیا'
                  : currentPage === 'language-france'
                  ? '🎓 زبان فرانسه'
                  : currentPage === 'language-netherlands'
                  ? '🎓 زبان هلند'
                  : currentPage === 'language-hungary'
                  ? '🎓 کالج زبان مجارستان'
                  : currentPage === 'colleges-hungary'
                  ? '🎓 کالج‌های مجارستان'
                  : currentPage === 'language-denmark'
                  ? '🎓 زبان دانمارک'
                  : currentPage === 'startup-canada'
                  ? '🚀 استارت‌آپ کانادا'
                  : currentPage === 'startup-austria'
                  ? '🚀 استارت‌آپ اتریش'
                  : currentPage === 'startup-germany'
                  ? '🚀 استارت‌آپ آلمان'
                  : currentPage === 'startup-france'
                  ? '🚀 استارت‌آپ فرانسه'
                  : currentPage === 'startup-netherlands'
                  ? '🚀 استارت‌آپ هلند'
                  : currentPage === 'startup-finland'
                  ? '🚀 استارت‌آپ فنلاند'
                  : currentPage === 'startup-denmark'
                  ? '🚀 استارت‌آپ دانمارک'
                  : currentPage === 'citizenship-turkey'
                  ? '🇹🇷 شهروندی ترکیه'
                  : currentPage === 'citizenship-dominica'
                  ? '🇩🇲 پاسپورت دومینیکا'
                  : currentPage === 'citizenship-serbia'
                  ? '🇷🇸 پاسپورت صربستان'
                  : currentPage === 'citizenship-sao-tome'
                  ? '🇸🇹 شهروندی سائوتومه'
                  : currentPage === 'business-dubai'
                  ? '🏢 شرکت دبی'
                  : currentPage === 'business-austria'
                  ? '🏢 شرکت GmbH اتریش'
                  : currentPage === 'business-netherlands'
                  ? '🏢 شرکت BV هلند'
                  : currentPage === 'business-france'
                  ? '🏢 شرکت SAS فرانسه'
                  : currentPage === 'business-turkey'
                  ? '🏢 شرکت ترکیه'
                  : currentPage === 'business-greece'
                  ? '🏢 شرکت یونان'
                  : currentPage === 'business-poland'
                  ? '🏢 شرکت لهستان'
                  : currentPage === 'business-portugal'
                  ? '🏢 شرکت پرتغال'
                  : currentPage === 'business-slovakia'
                  ? '🏢 شرکت اسلوواکی'
                  : currentPage === 'business-hungary'
                  ? '🏢 شرکت Kft مجارستان'
                  : currentPage === 'business-latvia'
                  ? '🏢 شرکت لتونی'
                  : 'بلوکارت و خدمات تخصصی'}
              </span>
              <span className="text-[10px]">▾</span>
            </button>

            {/* دراپ‌داون ۵ کشور بلوکارت */}
            <div className="absolute right-0 top-full mt-1.5 hidden w-56 rounded-2xl bg-[#08222b] border border-white/15 p-2 shadow-2xl group-hover:block animate-fadeIn z-50">
              <div className="px-2.5 py-1 text-[10px] font-bold text-amber-300 border-b border-white/10 mb-1">
                صفحات اختصاصی بلوکارت اروپا ۲۰۲۶:
              </div>
              {[
                { key: 'germany', page: 'german-blue-card', label: '🇩🇪 بلوکارت آلمان' },
                { key: 'spain', page: 'spain-blue-card', label: '🇪🇸 بلوکارت اسپانیا' },
                { key: 'italy', page: 'italy-blue-card', label: '🇮🇹 بلوکارت ایتالیا' },
                { key: 'austria', page: 'austria-blue-card', label: '🇦🇹 بلوکارت اتریش' },
                { key: 'hungary', page: 'hungary-blue-card', label: '🇭🇺 بلوکارت مجارستان' },
              ].map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => {
                    if (onNavigateToCountry) onNavigateToCountry(c.key as any);
                    else if (onNavigateToBlueCard) onNavigateToBlueCard(c.key as any);
                    else window.location.hash = `#blue-card-${c.key}`;
                  }}
                  className={`w-full text-right flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    currentPage === c.page
                      ? 'bg-amber-400 text-[#082833] font-black'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{c.label}</span>
                  {currentPage === c.page && <span className="text-[10px]">✓ فعال</span>}
                </button>
              ))}
            </div>
          </div>

          {NAV_LINKS.map((link) => {
            const isActive = link.page ? currentPage === link.page : false;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.page) {
                    e.preventDefault();
                    if (onNavigateToPage) {
                      onNavigateToPage(link.page);
                    } else {
                      window.location.pathname = `/${link.page}`;
                    }
                    return;
                  }
                  if (currentPage !== 'home' && onNavigateHome) {
                    e.preventDefault();
                    onNavigateHome();
                    setTimeout(() => {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className={`rounded-xl px-2.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#f5a623] text-[#082833] font-black shadow-md'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* دکمه‌های تماس و شروع ارزیابی */}
        <div className="flex items-center gap-2">
          {/* دکمه طلایی تلفن */}
          <a
            href="tel:02191693955"
            dir="ltr"
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-[#f5a623] hover:bg-[#e09312] text-[#082833] px-3 py-2 text-xs font-black shadow-md transition hover:scale-105 active:scale-95"
          >
            <span>02191693955</span>
            <span>📞</span>
          </a>

          {/* دکمه سبز واتساپ */}
          <a
            href="https://wa.me/989197340829"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white px-3 py-2 text-xs font-bold shadow-md transition hover:scale-105"
          >
            <span>واتساپ ۲۴/۷</span>
            <span>💬</span>
          </a>

          {/* دکمه ارزیابی آنلاین شانس ویزا */}
          <button
            type="button"
            onClick={onOpenAssessment}
            className="rounded-xl bg-[#00a8cc] hover:bg-[#0092b3] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-black text-white shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            ارزیابی آنلاین ←
          </button>

          {/* دکمه منوی موبایل */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="منو"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 text-white xl:hidden cursor-pointer"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* منوی بازشونده موبایل */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#07242e] px-4 py-4 xl:hidden animate-fadeIn">
          <ul className="space-y-1.5">
            <li>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  if (onNavigateHome) onNavigateHome();
                  else window.location.hash = '';
                }}
                className={`w-full text-right rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                  currentPage === 'home'
                    ? 'bg-amber-400 text-[#082833] font-black'
                    : 'text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                صفحه اصلی
              </button>
            </li>
            <li className="pt-1 border-t border-white/10">
              <span className="block px-4 py-1 text-[10px] font-bold text-amber-300">
                صفحات اختصاصی بلوکارت اروپا ۲۰۲۶:
              </span>
              <div className="grid grid-cols-1 gap-1 px-2 pt-1">
                {[
                  { key: 'germany', page: 'german-blue-card', label: '🇩🇪 بلوکارت آلمان ۲۰۲۶' },
                  { key: 'spain', page: 'spain-blue-card', label: '🇪🇸 بلوکارت اسپانیا ۲۰۲۶' },
                  { key: 'italy', page: 'italy-blue-card', label: '🇮🇹 بلوکارت ایتالیا ۲۰۲۶' },
                  { key: 'austria', page: 'austria-blue-card', label: '🇦🇹 بلوکارت اتریش ۲۰۲۶' },
                  { key: 'hungary', page: 'hungary-blue-card', label: '🇭🇺 بلوکارت مجارستان ۲۰۲۶' },
                ].map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      if (onNavigateToCountry) onNavigateToCountry(c.key as any);
                      else if (onNavigateToBlueCard) onNavigateToBlueCard(c.key as any);
                      else window.location.hash = `#blue-card-${c.key}`;
                    }}
                    className={`w-full text-right rounded-xl px-3 py-2 text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      currentPage === c.page
                        ? 'bg-amber-400 text-[#082833] font-black shadow-glow'
                        : 'text-slate-200 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="text-[10px]">{currentPage === c.page ? '✓ فعال' : '←'}</span>
                  </button>
                ))}
              </div>
            </li>
            {NAV_LINKS.map((link) => {
              const isActive = link.page ? currentPage === link.page : false;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      setMenuOpen(false);
                      if (link.page) {
                        e.preventDefault();
                        if (onNavigateToPage) {
                          onNavigateToPage(link.page);
                        } else {
                          window.location.pathname = `/${link.page}`;
                        }
                        return;
                      }
                      if (currentPage !== 'home' && onNavigateHome) {
                        e.preventDefault();
                        onNavigateHome();
                        setTimeout(() => {
                          const el = document.querySelector(link.href);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className={`block rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-[#082833] font-black'
                        : 'text-slate-200 hover:bg-white/10 hover:text-[#f5a623]'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href="tel:02191693955"
                dir="ltr"
                className="block rounded-xl px-4 py-2.5 text-center text-xs font-black text-[#082833] bg-[#f5a623]"
              >
                تماس تلفنی: 02191693955 📞
              </a>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl px-4 py-2.5 text-center text-xs font-black text-white bg-[#25d366]"
              >
                واتساپ ۲۴/۷ 💬
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
