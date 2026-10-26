import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  GraduationCap,
  Home,
  Building2,
  Palette,
  Laptop,
  HeartPulse,
  Compass,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Euro,
  Scale,
  Search,
  Filter,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Award,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';
import type { PageType } from '../Header';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

interface ServiceCard {
  id: string;
  page?: PageType;
  title: string;
  category: 'work' | 'financial' | 'investment' | 'academic' | 'business' | 'special';
  categoryLabel: string;
  countries: string[];
  description: string;
  keyFeature: string;
  timeline: string;
  minCapital?: string;
  badge?: string;
  image: string;
}

const ALL_SERVICES: ServiceCard[] = [
  {
    id: 'austria-financial',
    page: 'financial-austria',
    title: 'اقامت تمکن مالی اتریش (NAG §44)',
    category: 'financial',
    categoryLabel: 'تمکن مالی و خودحمایتی',
    countries: ['🇦🇹 اتریش'],
    description:
      'اقامت بدون اجازه کار در اتریش با اثبات درآمد پایدار خارج از کشور (اجاره‌ملک، سود سهام، حقوق بازنشستگی). زندگی با استانداردهای کیفیت جهانی در وین بدون نیاز به سرمایه‌گذاری پرریسک.',
    keyFeature: 'درآمد ماهانه €۲,۶۱۶ مجرد / €۴,۱۲۸ زوجین',
    timeline: '۳ الی ۵ ماه',
    minCapital: 'بدون قفل سرمایه در اروپا',
    badge: 'پرتقاضاترین برنامه خانواده‌ها',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'german-blue-card',
    page: 'german-blue-card',
    title: 'بلوکارت و اقامت کاری آلمان (EU Blue Card)',
    category: 'work',
    categoryLabel: 'اقامت کاری و تخصصی',
    countries: ['🇩🇪 آلمان'],
    description:
      'مسیر طلایی اقامت دائم آلمان برای متخصصان IT، مهندسان و کادر درمان با حداقل حقوق سالانه مصوب ۲۰۲۶ (€۴۸,۳۰۰) و امکان دریافت اقامت دائم ظرف ۲۱ ماه.',
    keyFeature: 'اقامت دائم ظرف ۲۱ ماه با زبان B1',
    timeline: '۲ الی ۴ ماه کاری',
    badge: 'سریع‌ترین اقامت دائم اروپا',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'austria-rwr',
    page: 'austria-rwr',
    title: 'کارت قرمز-سفید-قرمز اتریش (Rot-Weiß-Rot)',
    category: 'work',
    categoryLabel: 'اقامت کاری و تخصصی',
    countries: ['🇦🇹 اتریش'],
    description:
      'ویزای کار امتیازبندی‌شده اتریش بر اساس سن، تحصیلات، زبان و سابقه کاری ویژه نیروهای کلیدی و مشاغل کمبود نیرو (Mangelberufe).',
    keyFeature: 'کسب حداقل ۵۵ امتیاز از جدول رسمی AMS',
    timeline: '۶ الی ۱۰ هفته کاری',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'greece-golden-visa',
    page: 'realestate-greece',
    title: 'گلدن ویزا و خرید ملک یونان (Law 5100/2024)',
    category: 'investment',
    categoryLabel: 'سرمایه‌گذاری و املاک',
    countries: ['🇬🇷 یونان'],
    description:
      'اخذ کارت اقامت دائم ۵ ساله شنگن برای ۳ نسل (متقاضی، فرزندان تا ۲۱ سال، والدین) از طریق خرید ملک مسکونی ۲۵۰ هزار یورویی بدون شرط حضور فیزیکی.',
    keyFeature: 'شامل ۳ نسل خانواده بدون شرط حضور در خاک',
    timeline: '۶۰ الی ۹۰ روز',
    minCapital: 'از ۲۵۰,۰۰۰ یورو',
    badge: 'اقتصادی‌ترین گلدن ویزای اروپا',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'spain-nomad',
    page: 'nomad-spain',
    title: 'ویزای دیجیتال نوماد و دورکاری اسپانیا',
    category: 'work',
    categoryLabel: 'فریلنسری و کوچ‌نشینی دیجیتال',
    countries: ['🇪🇸 اسپانیا'],
    description:
      'اقامت ۳ ساله قابل تمدید برای فریلنسرها، برنامه‌نویسان و کارکنان ریموت با بهره‌مندی از نرخ ترجیحی مالیات بر درآمد قانون بکهام (۲۴٪ ثابت).',
    keyFeature: 'حداقل درآمد ماهانه ۲,۶۵۰ یورو',
    timeline: '۴۵ الی ۶۰ روز کاری',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'academic-austria',
    page: 'academic-austria',
    title: 'تحصیل در دانشگاه‌های ممتاز اتریش',
    category: 'academic',
    categoryLabel: 'تحصیل و دانشگاه',
    countries: ['🇦🇹 اتریش'],
    description:
      'پذیرش تحصیلی در دانشگاه وین، دانشگاه صنعتی وین (TU Wien) و دانشگاه علوم اقتصادی (WU) با شهریه اقتصادی (~۷۵۰ یورو در هر ترم) و اجازه کار پاره‌وقت.',
    keyFeature: 'تحصیل به زبان انگلیسی و آلمانی',
    timeline: '۳ الی ۶ ماه',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'medical-austria',
    page: 'medical-austria-nursing',
    title: 'مهاجرت و معادل‌سازی کادر درمان و پرستاران اتریش',
    category: 'work',
    categoryLabel: 'پزشکی و کادر درمان',
    countries: ['🇦🇹 اتریش'],
    description:
      'استخدام مستقیم در بیمارستان‌های دولتی وین و سالزبورگ با فرآیند Nostrifizierung، قرارداد رسمی کار با درآمد عالی و بیمه درمانی کامل.',
    keyFeature: 'حمایت کامل در دوره‌های تکمیلی زبان تخصصی',
    timeline: '۴ الی ۸ ماه',
    badge: 'تضمین قرارداد کاری بیمارستانی',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'business-austria',
    page: 'business-austria',
    title: 'ثبت شرکت و بیزینس در اتریش (GmbH / FlexCo)',
    category: 'business',
    categoryLabel: 'ثبت شرکت و کارآفرینی',
    countries: ['🇦🇹 اتریش'],
    description:
      'تاسیس شرکت با ساختار نوین FlexCo (سرمایه اولیه ۱۰,۰۰۰ یورو)، افتتاح حساب بانکی شرکتی و اخذ کارت اقامت مدیرعاملی برای خود و خانواده.',
    keyFeature: 'افتتاح حساب بانکی یورو در Erste Bank',
    timeline: '۲ الی ۴ ماه',
    minCapital: 'سرمایه ثبتی از ۱۰,۰۰۰ یورو',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'after-arrival',
    page: 'after-arrival',
    title: 'خدمات پس از ورود و استقرار در اروپا (After-Arrival)',
    category: 'special',
    categoryLabel: 'خدمات تکمیلی و استقرار',
    countries: ['🇦🇹 اتریش', '🇩🇪 آلمان', '🇬🇷 یونان'],
    description:
      'اجاره مسکن رسمی با تاییدیه شهرداری (Mietvertrag)، ثبت ملدزتل ظرف ۳ روز کاری، افتتاح حساب بانکی، بیمه درمانی ÖGK و همراهی در اداره اقامت.',
    keyFeature: 'همراهی حضوری وکلای دفتر وین دیاکو',
    timeline: 'از روز اول ورود به اروپا',
    badge: 'پشتیبانی ۱۰۰٪ حضوری در وین',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'artist-austria',
    page: 'artist-austria',
    title: 'اقامت هنرمندان و نخبگان فرهنگی اتریش (Künstler)',
    category: 'special',
    categoryLabel: 'هنرمندان و نخبگان',
    countries: ['🇦🇹 اتریش'],
    description:
      'اخذ اقامت بر اساس رزومه هنری، نمایشگاه‌ها، کتاب‌ها و آثار فرهنگی مشمول قانون Kunstförderungsgesetz بدون نیاز به مدرک زبان آلمانی اولیه.',
    keyFeature: 'معاف از سهمیه سالانه و مدرک زبان اولیه',
    timeline: '۳ الی ۶ ماه',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hungary-business',
    page: 'business-hungary',
    title: 'ثبت شرکت در مجارستان با ۹٪ مالیات شرکتی',
    category: 'business',
    categoryLabel: 'ثبت شرکت و کارآفرینی',
    countries: ['🇭🇺 مجارستان'],
    description:
      'کمترین نرخ مالیات بر درآمد شرکت‌ها در کل اتحادیه اروپا (۹٪ تک‌نرخی)، افتتاح حساب بانکی اروپایی و اخذ کارت اقامت تجاری ۳ ساله شنگن.',
    keyFeature: 'پایین‌ترین مالیات شرکتی در کل اتحادیه اروپا',
    timeline: '۴۵ الی ۶۰ روز کاری',
    image: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'spain-financial',
    page: 'financial-spain',
    title: 'اقامت خودحمایتی و تمکن مالی اسپانیا (Non-Lucrative)',
    category: 'financial',
    categoryLabel: 'تمکن مالی و خودحمایتی',
    countries: ['🇪🇸 اسپانیا'],
    description:
      'زندگی در شهرهای ساحلی بارسلون، والنسیا یا مادرید با اثبات موجودی و درآمد سالانه ۲۸,۸۰۰ یورو بدون نیاز به انتقال یا سرمایه‌گذاری سنگین.',
    keyFeature: 'آب و هوای مدیترانه‌ای با ۳۰۰ روز آفتابی',
    timeline: '۲ الی ۴ ماه',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
  },
];

export const ServicesDirectoryPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useSeo({
    title: 'خدمات حقوقی و برنامه‌های اقامتی اروپا ۲۰۲۶ | هلدینگ بین‌المللی دیاکو',
    description:
      'سبد جامع خدمات مهاجرتی هلدینگ دیاکو؛ اقامت تمکن مالی اتریش، بلوکارت آلمان، گلدن ویزای یونان، ثبت شرکت، پذیرش دانشگاهی و خدمات پس از ورود با نظارت وکلای مقیم وین.',
    keywords: [
      'خدمات مهاجرت به اروپا',
      'تمکن مالی اتریش NAG 44',
      'بلوکارت آلمان ۲۰۲۶',
      'گلدن ویزای یونان و اسپانیا',
      'ثبت شرکت در اتریش',
      'تحصیل رایگان در وین',
      'وکیل مهاجرت اروپا دیاکو',
    ],
    canonical: '/services',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'فهرست خدمات تخصصی مهاجرت و اقامت اروپا | هلدینگ دیاکو',
      description: 'بانک جامع خدمات حقوقی، ویزا و استقرار در اروپا توسط وکلای رسمی دادگستری.',
      url: 'https://www.dia-co.ir/services',
    },
  });

  const filteredServices = useMemo(() => {
    return ALL_SERVICES.filter((item) => {
      if (activeTab !== 'all' && item.category !== activeTab) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCountry = item.countries.some((c) => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesCountry) return false;
      }
      return true;
    });
  }, [activeTab, searchQuery]);

  return (
    <div dir="rtl" className="min-h-screen bg-[#071f26] text-slate-100 font-sans">
      {/* هدر بخش و معرفی خدمات */}
      <section className="relative overflow-hidden pt-28 pb-16 bg-gradient-to-b from-[#092e39] via-[#071f26] to-[#071f26] border-b border-white/10">
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
            <span className="text-amber-400 font-bold">خدمات تخصصی دیاکو</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>پوشش جامع بیش از ۷۰ مسیر مهاجرتی در ۱۱ کشور اروپایی و بین‌المللی</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              خدمات تخصصی حقوقی، اقامت و مهاجرت به اروپا
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
              مجموعه‌ای کامل از راه‌حل‌های قانونی مهاجرت متناسب با دارایی، تخصص شغلی یا شرایط تحصیلی شما؛ با عقد قرارداد رسمی دادگستری و پشتیبانی مستقیم وکلای مقیم در وین، مونیخ و آتن.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>وکالت مستقیم بدون واسطه در دادگاه‌ها و ادارات مهاجرت اروپا</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>بالاترین نرخ موفقیت ویزا در ۱۰ سال متوالی</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* جستجو و فیلتر دسته‌بندی خدمات */}
      <section className="sticky top-16 z-30 bg-[#06191f]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
              {[
                { key: 'all', label: 'همه خدمات' },
                { key: 'financial', label: 'تمکن مالی (خودحمایتی)' },
                { key: 'work', label: 'کاری و بلوکارت' },
                { key: 'investment', label: 'سرمایه‌گذاری و ملک' },
                { key: 'academic', label: 'تحصیلی و دانشگاه' },
                { key: 'business', label: 'ثبت شرکت و استارت‌آپ' },
                { key: 'special', label: 'پس از ورود و نخبگان' },
              ].map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-[#071f26] shadow-md font-black'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در خدمات..."
                className="w-full bg-[#071f26] text-white placeholder-slate-400 rounded-xl pr-10 pl-3 py-1.5 text-xs border border-white/15 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* گرید کارت‌های خدمات */}
      <section className="container mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group rounded-3xl bg-[#0a2731] border border-white/10 hover:border-amber-400/50 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-800">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2731] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {service.countries.map((c, i) => (
                      <span key={i} className="rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white border border-white/15">
                        {c}
                      </span>
                    ))}
                  </div>

                  {service.badge && (
                    <div className="absolute bottom-3 right-3">
                      <span className="rounded-lg bg-amber-400 px-2.5 py-1 text-[11px] font-black text-[#071f26]">
                        {service.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="text-[11px] font-bold text-amber-400 mb-1">
                    {service.categoryLabel}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors leading-snug mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 border-t border-white/10 pt-3 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">ویژگی برجسته:</span>
                      <strong className="text-emerald-400 font-bold">{service.keyFeature}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">زمان تخمینی پرونده:</span>
                      <span>{service.timeline}</span>
                    </div>
                    {service.minCapital && (
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">حداقل سرمایه:</span>
                        <span className="text-amber-300 font-mono font-bold">{service.minCapital}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-2">
                {service.page && onNavigateToPage ? (
                  <button
                    type="button"
                    onClick={() => onNavigateToPage(service.page!)}
                    className="flex-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071f26] py-2.5 text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>مشاهده صفحه اختصاصی</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenAssessment}
                    className="flex-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071f26] py-2.5 text-xs font-black transition cursor-pointer"
                  >
                    سنجش شانس پرونده
                  </button>
                )}
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-white/10 hover:bg-white/15 text-white px-3 py-2.5 text-xs font-bold border border-white/15 transition cursor-pointer"
                  title="ارزیابی آنلاین"
                >
                  ارزیابی
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* مقاله حقوقی تشریح استانداردهای خدمات دیاکو */}
      <section className="container mx-auto px-4 md:px-8 py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full">
              تعهدات و استانداردهای دیاکو
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white mt-3 mb-3">
              چرا هلدینگ بین‌المللی دیاکو انتخاب اول متقاضیان مهاجرت اروپاست؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              تفاوت‌های بنیادین یک هلدینگ حقوقی رسمی با بیش از ۲۰ سال سابقه و دفاتر ثبت‌شده در وین در برابر واسطه‌های غیرمجاز.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300">
            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-5 space-y-2.5">
              <div className="text-amber-400 font-bold text-base flex items-center gap-2">
                <Scale className="w-5 h-5" />
                <span>وکالت مستقیم در کانون وکلای اتریش</span>
              </div>
              <p className="leading-relaxed">
                تمام پرونده‌های مهاجرتی دیاکو توسط وکلای پایه یک عضو کانون وکلای وین (RDB) و مونیخ مدیریت می‌شوند و قرارداد رسمی دوطرفه با تعرفه‌های شفاف و مصوب تنظیم می‌گردد.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-5 space-y-2.5">
              <div className="text-emerald-400 font-bold text-base flex items-center gap-2">
                <Home className="w-5 h-5" />
                <span>پشتیبانی کامل پس از ورود (After-Arrival)</span>
              </div>
              <p className="leading-relaxed">
                برخلاف موسسات سنتی، خدمات دیاکو با اخذ ویزا به پایان نمی‌رسد؛ از روز ورود به وین یا مونیخ، اجاره مسکن رسمی، ثبت شهرداری (Meldezettel)، حساب بانکی و مدارس فرزندان توسط تیم ما انجام می‌شود.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-5 space-y-2.5">
              <div className="text-sky-400 font-bold text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>سنجش هوشمند شانس پرونده</span>
              </div>
              <p className="leading-relaxed">
                دیاکو تنها پرونده‌هایی را می‌پذیرد که پس از تحلیل دقیق شرایط متقاضی دارای شانس موفقیت بالای ۹۰٪ باشند، تا از اتلاف سرمایه و زمان ارزشمند خانواده‌ها جلوگیری شود.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesDirectoryPage;
