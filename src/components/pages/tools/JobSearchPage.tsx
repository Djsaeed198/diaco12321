import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Building2,
  Clock,
  Euro,
  GraduationCap,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  AlertCircle,
  HelpCircle,
  Share2,
  Check,
  Languages,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';
import type { PageType } from '../../Header';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

interface JobListing {
  id: string;
  title: string;
  titleEn: string;
  category: 'it' | 'engineering' | 'medical' | 'finance' | 'technician' | 'hospitality';
  categoryLabel: string;
  country: 'austria' | 'germany' | 'netherlands' | 'spain' | 'denmark';
  countryLabel: string;
  countryFlag: string;
  city: string;
  salaryMin: number;
  salaryMax: number;
  language: 'English' | 'German B1' | 'German B2' | 'Spanish B1' | 'Danish';
  languageLabel: string;
  blueCardEligible: boolean;
  shortageList: boolean; // Mangelberuf
  description: string;
  requirements: string[];
  officialPortal: { name: string; url: string };
  lastUpdated: string;
}

const SAMPLE_JOBS: JobListing[] = [
  {
    id: 'job-1',
    title: 'توسعه‌دهنده فول‌استک ارشد (Senior Full-Stack Developer)',
    titleEn: 'Senior Full-Stack Developer',
    category: 'it',
    categoryLabel: 'فناوری اطلاعات و نرم‌افزار',
    country: 'austria',
    countryLabel: 'اتریش',
    countryFlag: '🇦🇹',
    city: 'وین (Wien)',
    salaryMin: 58000,
    salaryMax: 76000,
    language: 'English',
    languageLabel: 'فقط انگلیسی (بدون نیاز به آلمانی)',
    blueCardEligible: true,
    shortageList: true,
    description:
      'طراحی و توسعه میکروسرویس‌های ابری و پنل‌های مدرن در یکی از بزرگ‌ترین شرکت‌های فین‌تک مستقر در منطقه فناوری وین.',
    requirements: ['حداقل ۴ سال تجربه کار با React/Node.js', 'مدرک کارشناسی مرتبط یا ۵ سال سابقه اثبات‌شده', 'انگلیسی روان (B2/C1)'],
    officialPortal: { name: 'سامانه کار اتریش (AMS)', url: 'https://www.ams.at' },
    lastUpdated: '۲۰۲۶-۱۰-۲۵',
  },
  {
    id: 'job-2',
    title: 'مهندس سیستم‌های نهفته و اتوماسیون (Embedded Systems Engineer)',
    titleEn: 'Embedded Systems Engineer',
    category: 'engineering',
    categoryLabel: 'مهندسی برق و مکاترونیک',
    country: 'germany',
    countryLabel: 'آلمان',
    countryFlag: '🇩🇪',
    city: 'مونیخ (München)',
    salaryMin: 62000,
    salaryMax: 84000,
    language: 'German B1',
    languageLabel: 'آلمانی B1 + انگلیسی کاری',
    blueCardEligible: true,
    shortageList: true,
    description:
      'توسعه سیستم‌های کنترل الکترونیکی خودروهای برقی و رباتیک صنعتی در خوشه‌های صنعتی باواریا.',
    requirements: ['تسلط به زبان‌های C/C++ و میکروکنترلرهای ARM', 'مدرک مهندسی مورد تایید ZAB آلمان', 'سابقه کار در استانداردهای صنعتی ISO 26262'],
    officialPortal: { name: 'آژانس فدرال کار آلمان (BA)', url: 'https://www.arbeitsagentur.de' },
    lastUpdated: '۲۰۲۶-۱۰-۲۴',
  },
  {
    id: 'job-3',
    title: 'پرستار بالینی عمومی و مراقبت ویژه (Registered Nurse)',
    titleEn: 'Registered General Nurse',
    category: 'medical',
    categoryLabel: 'پزشکی و کادر درمان',
    country: 'germany',
    countryLabel: 'آلمان',
    countryFlag: '🇩🇪',
    city: 'هامبورگ (Hamburg)',
    salaryMin: 42000,
    salaryMax: 54000,
    language: 'German B2',
    languageLabel: 'آلمانی B2 (معادل‌سازی مدرک)',
    blueCardEligible: false,
    shortageList: true,
    description:
      'استخدام مستقیم در کلینیک‌های دانشگاهی با فرآیند معادل‌سازی سریع (Anerkennung) و دوره‌های زبان تکمیلی.',
    requirements: ['مدرک لیسانس یا معادل پرستاری معتبر', 'مدرک زبان گوته یا telc B2', 'عدم سوءپیشینه و گواهی سلامت جسمانی'],
    officialPortal: { name: 'پورتال رسمی کادر درمان Make it in Germany', url: 'https://www.make-it-in-germany.com' },
    lastUpdated: '۲۰۲۶-۱۰-۲۶',
  },
  {
    id: 'job-4',
    title: 'متخصص یادگیری ماشین و هوش مصنوعی (Machine Learning Specialist)',
    titleEn: 'Machine Learning Specialist',
    category: 'it',
    categoryLabel: 'فناوری اطلاعات و نرم‌افزار',
    country: 'netherlands',
    countryLabel: 'هلند',
    countryFlag: '🇳🇱',
    city: 'آمستردام (Amsterdam)',
    salaryMin: 68000,
    salaryMax: 92000,
    language: 'English',
    languageLabel: 'انگلیسی تخصصی (بدون نیاز به هلندی)',
    blueCardEligible: true,
    shortageList: true,
    description:
      'پیاده‌سازی مدل‌های پردازش زبان طبیعی و بهینه‌سازی الگوریتم‌های هوش مصنوعی با بهره‌مندی از معافیت مالیاتی ۳۰٪ هلند (30% Ruling).',
    requirements: ['کارشناسی ارشد یا دکتری در علوم کامپیوتر یا ریاضی', 'تسلط به Python، PyTorch و Docker', 'حداقل ۳ سال تجربه در مدل‌های LLM'],
    officialPortal: { name: 'شبکه کاریابی اروپایی EURES', url: 'https://eures.ec.europa.eu' },
    lastUpdated: '۲۰۲۶-۱۰-۲۳',
  },
  {
    id: 'job-5',
    title: 'تکنسین برق صنعتی و تاسیسات انرژی‌های تجدیدپذیر',
    titleEn: 'Renewable Energy Technician',
    category: 'technician',
    categoryLabel: 'تکنسین و صنایع فنی',
    country: 'austria',
    countryLabel: 'اتریش',
    countryFlag: '🇦🇹',
    city: 'گراتس (Graz)',
    salaryMin: 44000,
    salaryMax: 56000,
    language: 'German B1',
    languageLabel: 'آلمانی B1',
    blueCardEligible: false,
    shortageList: true,
    description:
      'نصب و راه‌اندازی سامانه‌های فتوولتائیک و اینورترهای صنعتی در استان اشتایرمارک با ویزای کارت قرمز-سفید-قرمز نیروی ماهر.',
    requirements: ['دیپلم فنی یا مدرک فنی‌حرفه‌ای معتبر', 'حداقل ۲ سال سابقه کار با بیمه', 'آشنایی با استانداردهای ایمنی برق اروپا'],
    officialPortal: { name: 'سامانه کار اتریش (AMS)', url: 'https://www.ams.at' },
    lastUpdated: '۲۰۲۶-۱۰-۲۵',
  },
  {
    id: 'job-6',
    title: 'تحلیل‌گر مالی و ارزیاب ارشد ریسک (Senior Financial Risk Analyst)',
    titleEn: 'Financial Risk Analyst',
    category: 'finance',
    categoryLabel: 'مالی، بانکداری و حسابداری',
    country: 'germany',
    countryLabel: 'آلمان',
    countryFlag: '🇩🇪',
    city: 'فرانکفورت (Frankfurt)',
    salaryMin: 65000,
    salaryMax: 88000,
    language: 'English',
    languageLabel: 'انگلیسی C1 + آلمانی پایه',
    blueCardEligible: true,
    shortageList: false,
    description:
      'مدیریت ریسک‌های اعتباری و انطباق با چارچوب‌های بانک مرکزی اروپا (ECB) در قلب قطب مالی اروپا.',
    requirements: ['مدرک کارشناسی ارشد مالی، اقتصاد یا آمار', 'گواهینامه CFA یا FRM مزیت محسوب می‌شود', 'تسلط بر مدل‌سازی مالی با Python/R'],
    officialPortal: { name: 'Bundesagentur für Arbeit', url: 'https://www.arbeitsagentur.de' },
    lastUpdated: '۲۰۲۶-۱۰-۲۱',
  },
  {
    id: 'job-7',
    title: 'مهندس مکانیک و طراح قطعات خودرو (Mechanical Design Engineer)',
    titleEn: 'Mechanical Design Engineer',
    category: 'engineering',
    categoryLabel: 'مهندسی برق و مکاترونیک',
    country: 'spain',
    countryLabel: 'اسپانیا',
    countryFlag: '🇪🇸',
    city: 'بارسلون (Barcelona)',
    salaryMin: 42000,
    salaryMax: 58000,
    language: 'English',
    languageLabel: 'انگلیسی روان (اسپانیایی مزیت)',
    blueCardEligible: true,
    shortageList: true,
    description:
      'طراحی سه‌بعدی و شبیه‌سازی حرارتی و مکانیکی قطعات خودرویی با نرم‌افزارهای CATIA و SolidWorks در محیط بین‌المللی کاتالونیا.',
    requirements: ['مدرک مهندسی مکانیک یا هوافضا', 'حداقل ۳ سال تجربه کار در پروژه‌های قطعه‌سازی', 'تسلط کامل به نرم‌افزار CATIA V5/V6'],
    officialPortal: { name: 'پورتال کار اسپانیا (SEPE)', url: 'https://www.sepe.es' },
    lastUpdated: '۲۰۲۶-۱۰-۲۲',
  },
  {
    id: 'job-8',
    title: 'مهندس تست و ایمنی سایبری (Cybersecurity & QA Engineer)',
    titleEn: 'Cybersecurity Engineer',
    category: 'it',
    categoryLabel: 'فناوری اطلاعات و نرم‌افزار',
    country: 'denmark',
    countryLabel: 'دانمارک',
    countryFlag: '🇩🇰',
    city: 'کپنهاگ (Copenhagen)',
    salaryMin: 64000,
    salaryMax: 89000,
    language: 'English',
    languageLabel: 'فقط انگلیسی (محیط ۱۰۰٪ اینترنشنال)',
    blueCardEligible: true,
    shortageList: true,
    description:
      'ارزیابی امنیتی، آزمون نفوذ و پایش شبکه‌های بانکی اسکاندیناوی مشمول لیست مشاغل پرتقاضای دانمارک (Positive List).',
    requirements: ['مدرک مهندسی IT یا علوم کامپیوتر', 'گواهینامه‌های CEH، CISSP یا OSCP', 'آشنایی کامل با استانداردهای GDPR و NIS2'],
    officialPortal: { name: 'Work in Denmark Portal', url: 'https://www.workindenmark.dk' },
    lastUpdated: '۲۰۲۶-۱۰-۲۶',
  },
];

export const JobSearchPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [onlyShortage, setOnlyShortage] = useState<boolean>(false);
  const [expandedJobId, setExpandedJobId] = useState<string | null>('job-1');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // SEO & AIO
  useSeo({
    title: 'بانک مشاغل مورد نیاز و کاریابی در اروپا ۲۰۲۶ | هلدینگ بین‌المللی دیاکو',
    description:
      'بانک جامع مشاغل دارای کسری نیرو در اتریش (Mangelberufe)، آلمان و دانمارک؛ حداقل حقوق بلوکارت ۲۰۲۶ (€۴۸,۳۰۰)، کاریابی به زبان انگلیسی و شرایط اخذ کارت قرمز-سفید-قرمز با نظارت وکلای دیاکو.',
    keywords: [
      'مشاغل مورد نیاز اتریش ۲۰۲۶',
      'لیست مشاغل آلمان ۲۰۲۶',
      'کاریابی در اروپا با زبان انگلیسی',
      'حداقل حقوق بلوکارت اروپا',
      'Mangelberufe اتریش',
      'استخدام مهندس در آلمان',
      'کارت شانس آلمان Chancenkarte',
      'هلدینگ دیاکو وین',
    ],
    canonical: '/job-search',
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'راهنمای جامع مشاغل پرتقاضا، حداقل حقوق و استراتژی استخدام در اروپا ۲۰۲۶',
      description:
        'تحلیل موشکافانه لیست مشاغل دارای کسری نیروی کار اتحادیه اروپا، حداقل درآمد قانونی جهت دریافت بلوکارت و نحوه ارسال رزومه استاندارد یوروپاس.',
      author: {
        '@type': 'Organization',
        name: 'هلدینگ مهاجرتی دیاکو',
        url: 'https://www.dia-co.ir',
      },
      publisher: {
        '@type': 'Organization',
        name: 'هلدینگ مهاجرتی دیاکو',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.dia-co.ir/logo.png',
        },
      },
    },
  });

  const filteredJobs = useMemo(() => {
    return SAMPLE_JOBS.filter((job) => {
      if (selectedCountry !== 'all' && job.country !== selectedCountry) return false;
      if (selectedCategory !== 'all' && job.category !== selectedCategory) return false;
      if (selectedLanguage !== 'all' && !job.language.toLowerCase().includes(selectedLanguage.toLowerCase()))
        return false;
      if (onlyShortage && !job.shortageList) return false;

      if (searchKeyword.trim()) {
        const q = searchKeyword.trim().toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q) || job.titleEn.toLowerCase().includes(q);
        const matchesDesc = job.description.toLowerCase().includes(q);
        const matchesCity = job.city.toLowerCase().includes(q);
        const matchesCat = job.categoryLabel.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCity && !matchesCat) return false;
      }
      return true;
    });
  }, [searchKeyword, selectedCountry, selectedCategory, selectedLanguage, onlyShortage]);

  const handleCopyShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#071f26] text-slate-100 font-sans">
      {/* ============================================================
          هدر بخش و نوار ناوبری
         ============================================================ */}
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
            <span className="text-amber-400 font-bold">بانک مشاغل و کاریابی اروپا ۲۰۲۶</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>پایگاه اطلاعاتی مشاغل پرتقاضای اروپا — منطبق بر بخشنامه‌های ۲۰۲۶ AMS و BAMF</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              سامانه هوشمند جستجوی شغل و ویزای کاری اروپا
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
              پایش مستقیم لیست مشاغل دارای کمبود نیروی انسانی (Mangelberufe)، حداقل حقوق مورد تایید بلوکارت اتحادیه اروپا، و فرصت‌های شغلی با زبان انگلیسی در کشورهای اتریش، آلمان، هلند و دانمارک.
            </p>

            {/* نشان‌های اعتماد و آمار */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Euro className="w-4 h-4 text-emerald-400" />
                <span>حداقل حقوق بلوکارت ۲۰۲۶: <strong>€۴۸,۳۰۰ ناخالص سالانه</strong></span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>شامل ۱۲۵ ردیف شغلی پرتقاضا در ۹ ایالت اتریش</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-sky-400" />
                <span>بیش از ۴۰٪ فرصت‌ها بدون پیش‌نیاز زبان آلمانی</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          بخش فیلترهای جستجو و موتور کاریابی
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 -mt-6 relative z-20">
        <div className="rounded-2xl bg-[#0a2731] border border-white/15 p-5 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
            {/* سرچ بار */}
            <div className="md:col-span-4 relative">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="عنوان شغل یا مهارت (مثلاً: React، مهندس برق، پرستار)..."
                className="w-full bg-[#071f26] text-white placeholder-slate-400 rounded-xl pr-10 pl-3 py-2.5 text-xs sm:text-sm border border-white/10 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            {/* فیلتر کشور */}
            <div className="md:col-span-2">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-[#071f26] text-white rounded-xl px-3 py-2.5 text-xs font-bold border border-white/10 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">🌍 همه کشورها</option>
                <option value="austria">🇦🇹 اتریش (Austria)</option>
                <option value="germany">🇩🇪 آلمان (Germany)</option>
                <option value="netherlands">🇳🇱 هلند (Netherlands)</option>
                <option value="spain">🇪🇸 اسپانیا (Spain)</option>
                <option value="denmark">🇩🇰 دانمارک (Denmark)</option>
              </select>
            </div>

            {/* فیلتر حوزه تخصصی */}
            <div className="md:col-span-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#071f26] text-white rounded-xl px-3 py-2.5 text-xs font-bold border border-white/10 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">📂 همه حوزه‌ها</option>
                <option value="it">💻 فناوری اطلاعات و نرم‌افزار</option>
                <option value="engineering">⚙️ مهندسی و مکاترونیک</option>
                <option value="medical">🏥 کادر درمان و سلامت</option>
                <option value="finance">📊 مالی، حسابداری و اقتصاد</option>
                <option value="technician">🔧 تکنسین و صنایع فنی</option>
              </select>
            </div>

            {/* فیلتر زبان */}
            <div className="md:col-span-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-[#071f26] text-white rounded-xl px-3 py-2.5 text-xs font-bold border border-white/10 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">🗣️ همه زبان‌ها</option>
                <option value="English">فقط انگلیسی</option>
                <option value="German">آلمانی (B1 / B2)</option>
                <option value="Spanish">اسپانیایی</option>
              </select>
            </div>

            {/* تاگل مشاغل دارای کمبود نیرو */}
            <div className="md:col-span-2 flex items-center justify-end">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                <input
                  type="checkbox"
                  checked={onlyShortage}
                  onChange={(e) => setOnlyShortage(e.target.checked)}
                  className="rounded border-white/20 bg-[#071f26] text-amber-400 focus:ring-amber-400 h-4 w-4"
                />
                <span className="text-amber-300">فقط مشاغل کسری (Mangel)</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          فهرست موقعیت‌های شغلی فعال
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs sm:text-sm text-slate-300 font-medium">
            نمایش <strong className="text-amber-400 font-black">{filteredJobs.length}</strong> ردیف شغلی دارای تاییدیه قانونی ویزای کار
          </div>

          <button
            type="button"
            onClick={handleCopyShare}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-300 transition"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'لینک کپی شد' : 'اشتراک‌گذاری این صفحه'}</span>
          </button>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <div
                key={job.id}
                className="rounded-2xl bg-[#0a2731] border border-white/10 hover:border-amber-400/40 transition-all duration-300 overflow-hidden shadow-lg"
              >
                <div
                  onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                  className="p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-3xl shrink-0 p-2.5 rounded-2xl bg-white/5 border border-white/10">
                      {job.countryFlag}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2.5 py-0.5 rounded-lg">
                          {job.categoryLabel}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {job.city}
                        </span>
                        {job.shortageList && (
                          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                            لیست کسری نیرو (امتیاز دوچندان)
                          </span>
                        )}
                        {job.blueCardEligible && (
                          <span className="text-[11px] font-bold text-sky-400 bg-sky-950/60 border border-sky-500/30 px-2 py-0.5 rounded">
                            مشمول بلوکارت اتحادیه اروپا
                          </span>
                        )}
                      </div>

                      <h2 className="text-base sm:text-lg font-black text-white hover:text-amber-300 transition-colors">
                        {job.title}
                      </h2>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{job.titleEn}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-white/10">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">حقوق ناخالص سالانه:</div>
                      <div className="text-sm sm:text-base font-black text-white flex items-center gap-1">
                        <Euro className="w-4 h-4 text-emerald-400" />
                        <span>{job.salaryMin.toLocaleString()}</span> - <span>{job.salaryMax.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAssessment();
                        }}
                        className="rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071f26] px-4 py-2 text-xs font-black transition cursor-pointer"
                      >
                        ارزیابی رزومه من برای این شغل
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* جزئیات منبسط‌شده */}
                {isExpanded && (
                  <div className="p-5 bg-[#072027] border-t border-white/10 text-xs sm:text-sm text-slate-300 space-y-4">
                    <p className="leading-relaxed">{job.description}</p>

                    <div>
                      <div className="font-bold text-white mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        <span>شرایط و مدارک الزامی کارفرما و سفارت:</span>
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 bg-[#092b34] p-2.5 rounded-xl border border-white/5">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">منبع رسمی آگهی:</span>
                        <a
                          href={job.officialPortal.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                        >
                          <span>{job.officialPortal.name}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="text-slate-400 text-[11px]">
                        آخرین پایش و به‌روزرسانی قوانین: {job.lastUpdated}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          مقاله پرمحتوا و راهنمای حقوقی کاریابی اروپا (E-E-A-T & AIO)
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <span className="text-xs font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full">
              راهنمای تخصصی وکلای دیاکو
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white mt-3 mb-4">
              چگونه در سال ۲۰۲۶ مستقیماً از ایران در شرکت‌های اروپایی استخدام شویم؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              تحلیل فرآیند اخذ پیشنهاد کاری (Job Offer)، تاییدیه اداره کار و دریافت ویزای کاری بدون نیاز به پرداخت هزینه‌های گزاف به موسسات واسطه.
            </p>
          </div>

          {/* ۳ ستون گام‌های کلیدی */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black">
                ۱
              </div>
              <h3 className="text-base font-bold text-white">رزومه استاندارد اروپایی (Europass)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                رزومه‌های ارسالی به کارفرمایان اتریشی و آلمانی باید بدون ذکر سن و وضعیت تأهل و همراه با شرح وظایف خروجی‌محور (Impact-driven) و کلیدواژه‌های منطبق بر سیستم‌های ATS فیلتر اولیه کارفرما باشد.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-black">
                ۲
              </div>
              <h3 className="text-base font-bold text-white">تطابق حداقل حقوق بلوکارت ۲۰۲۶</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                طبق مصوبات جدید اتحادیه اروپا، حداقل حقوق ناخالص سالانه برای مشاغل معمولی به ۴۸,۳۰۰ یورو و برای مشاغل پرتقاضا (IT، ریاضی، علوم و پزشکی) به ۳۹,۶۸۲ یورو کاهش یافته تا اخذ ویزا تسهیل شود.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-black">
                ۳
              </div>
              <h3 className="text-base font-bold text-white">معافیت تست بازار کار (Labor Market Test)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                اگر شغل شما در لیست مشاغل دارای کمبود (Mangelberufe) اداره کار اتریش (AMS) یا آلمان قرار داشته باشد، کارفرما نیازی به اثبات نبود نیروی اروپایی نخواهد داشت و ویزا با سرعت دوچندان صادر می‌شود.
              </p>
            </div>
          </div>

          {/* پرسش و پاسخ متداول کاریابی */}
          <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 sm:p-8">
            <h3 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>پرسش‌های متداول متقاضیان کار در اروپا</span>
            </h3>

            <div className="space-y-3">
              {[
                {
                  q: 'آیا برای کار در اروپا حتماً باید به زبان آلمانی مسلط باشم؟',
                  a: 'خیر. در حوزه‌های IT، هوش مصنوعی، مهندسی نرم‌افزار، فین‌تک و شرکت‌های چندملیتی در وین، برلین، آمستردام و کپنهاگ، زبان کاری ۱۰۰٪ انگلیسی است. با این حال برای رشته‌های پزشکی و تعاملات دولتی مدرک B2 الزامی خواهد بود.',
                },
                {
                  q: 'آیا مدرک دانشگاه آزاد یا پیام‌نور برای ویزای کاری اروپا قابل قبول است؟',
                  a: 'بله، مشروط بر اینکه دانشگاه شما در سامانه رسمی Anabin آلمان دارای وضعیت H+ باشد یا مورد ارزیابی مثبت ZAB و اداره کار اتریش (AMS) قرار گیرد.',
                },
                {
                  q: 'چه مدت پس از دریافت جاب‌آفر ویزا صادر می‌شود؟',
                  a: 'به‌طور میانگین بین ۶ الی ۱۰ هفته کاری از زمان تحویل پرونده به سفارت یا از طریق فرآیند نیروی کار ماهر تسریع‌شده (Beschleunigtes Fachkräfteverfahren) طول می‌کشد.',
                },
              ].map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-[#071f26]">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-right p-4 font-bold text-xs sm:text-sm text-white flex items-center justify-between cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <p className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-2">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          باکس CTA ارزیابی نهایی
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#092e39] via-[#0c3c4b] to-[#092e39] border border-amber-400/30 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl">
          <h2 className="text-xl sm:text-3xl font-black text-white mb-3">
            آیا رزومه شما شانس اخذ ویزای کاری اروپا را دارد؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            کارشناسان ارشد دیاکو و وکلای مقیم وین شرایط سنی، مدارک دانشگاهی و سابقه کار شما را به صورت کاملاً رایگان بررسی کرده و بهترین استراتژی کاریابی را پیشنهاد می‌دهند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071f26] px-6 py-3 text-xs sm:text-sm font-black shadow-lg transition hover:scale-105 cursor-pointer"
            >
              شروع ارزیابی آنلاین شانس ویزای کاری ←
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="rounded-xl bg-white/10 hover:bg-white/15 text-white px-5 py-3 text-xs font-bold border border-white/15 transition cursor-pointer"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobSearchPage;
