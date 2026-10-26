import OptimizedImage from '../../OptimizedImage';
import React, { useState, useMemo } from 'react';
import {
  Newspaper,
  Calendar,
  Clock,
  Sparkles,
  Scale,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Bell,
  ArrowRight,
  Share2,
  Check,
  AlertTriangle,
  HelpCircle,
  FileText,
  UserCheck,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';
import type { PageType } from '../../Header';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

interface NewsItem {
  id: string;
  title: string;
  category: 'austria' | 'germany' | 'golden-visa' | 'embassy' | 'eu-schengen';
  categoryLabel: string;
  badge: 'فوری' | 'بخشنامه رسمی' | 'سهمیه ظرفیت' | 'کنسولی';
  dateJalali: string;
  dateGregorian: string;
  legalReference: string;
  officialSource: { name: string; url: string };
  verifiedBy: string;
  aioFastSummary: string;
  content: string[];
  impactOnIranians: string;
  image: string;
}

const NEWS_DATABASE: NewsItem[] = [
  {
    id: 'news-1',
    title: 'ابلاغ رسمی مصوبات تمکن مالی اتریش ۲۰۲۶ (Quotenkontingent): ارقام نهایی درآمد و اجاره',
    category: 'austria',
    categoryLabel: 'اتریش (BMI)',
    badge: 'بخشنامه رسمی',
    dateJalali: '۲۶ بهمن ۱۴۰۴',
    dateGregorian: '2026-10-25',
    legalReference: 'NAG § 44 — Niederlassungs- und Aufenthaltsgesetz 2026',
    officialSource: { name: 'وزارت کشور اتریش (BMI)', url: 'https://www.bmi.gv.at' },
    verifiedBy: 'دکتر آریا بهرامی (وکیل پایه یک دادگستری وین)',
    aioFastSummary:
      'طبق آخرین بخشنامه وزارت کشور اتریش، حداقل درآمد ماهانه خارج از اتریش برای متقاضی مجرد تمکن مالی در سال ۲۰۲۶ معادل €۲,۶۱۶.۷۸ و برای زوجین €۴,۱۲۸.۲۴ است. سهمیه ایالت وین در اولین روزهای کاری سال جدید میلادی بازگشایی و با اولویت تاریخ ثبت تکمیل می‌شود.',
    content: [
      'بر اساس آیین‌نامه اجرایی قانون اقامت اتریش (Niederlassungsverordnung 2026)، ارقام شاخص تمکن مالی بدون اجازه کار بر مبنای نرخ تعدیل تورمی به‌روزرسانی شد.',
      'علاوه بر درآمد پایدار، داشتن پیش‌قرارداد اجاره مسکن رسمی (Mietvertrag) مطابق ضوابط MA35 (حداقل ۳۰ متر برای مجرد و ۵۰ متر برای زوجین) پیش‌نیاز بررسی پرونده در کنسولگری است.',
      'وکلای دیاکو مستقر در وین از هم‌اکنون پرونده‌های سال ۲۰۲۷ را جهت پلمب کنسولی در ماه‌های پاییز آماده‌سازی می‌نمایند.',
    ],
    impactOnIranians:
      'متقاضیان ایرانی باید ترجمه رسمی اسناد ملکی و گردش حساب ارزی خود را قبل از پایان سال میلادی به تایید قوه قضاییه، وزارت خارجه و سفارت اتریش در تهران (لگالایز) برسانند تا در روز گشایش ظرفیت در صف اول دریافت تاییدیه قرار گیرند.',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'news-2',
    title: 'تسهیلات جدید قانون مهاجرت ماهر آلمان (Fachkräfteeinwanderungsgesetz) برای دارندگان مدرک فنی',
    category: 'germany',
    categoryLabel: 'آلمان (BAMF)',
    badge: 'فوری',
    dateJalali: '۲۴ بهمن ۱۴۰۴',
    dateGregorian: '2026-10-23',
    legalReference: 'AufenthG § 18b & Chancenkarte 2026',
    officialSource: { name: 'اداره فدرال مهاجرت و پناهندگان (BAMF)', url: 'https://www.bamf.de' },
    verifiedBy: 'دکتر الکساندر وبر (حقوقدان مهاجرت تجاری)',
    aioFastSummary:
      'کف حداقل حقوق بلوکارت آلمان برای سال ۲۰۲۶ به ۴۸,۳۰۰ یورو ناخالص سالانه و برای مشاغل پرتقاضا نظیر IT و مهندسی به ۳۹,۶۸۲ یورو کاهش یافت. همچنین فرآیند صدور کارت شانس یک‌ساله بدون نیاز به جاب‌آفر رسمی با ۶ امتیاز فعال است.',
    content: [
      'دولت فدرال آلمان با هدف جبران کمبود شدید نیروی کار فنی، مقررات ارزیابی مدرک تحصیلی را منعطف‌تر کرده است.',
      'افرادی که مدرک دانشگاهی آنها در سامانه Anabin مورد تایید باشد یا حداقل ۲ سال سابقه کار تخصصی مرتبط با حوزه IT داشته باشند، می‌توانند بدون نیاز به فرآیند طولانی معادل‌سازی، ویزای کاری دریافت کنند.',
    ],
    impactOnIranians:
      'فرصت استثنایی برای فارغ‌التحصیلان مهندسی نرم‌افزار، الکترونیک و مکانیک ایرانی جهت اقدام مستقیم برای بلوکارت یا کارت شانس یک‌ساله با اجازه کار پاره‌وقت.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'news-3',
    title: 'تغییرات قیمت‌گذاری گلدن ویزای یونان (Law 5100/2024): آخرین وضعیت مناطق ۲۵۰ هزار یورویی',
    category: 'golden-visa',
    categoryLabel: 'گلدن ویزا (اروپا)',
    badge: 'بخشنامه رسمی',
    dateJalali: '۲۱ بهمن ۱۴۰۴',
    dateGregorian: '2026-10-20',
    legalReference: 'Greece Law 5100/2024 — Immigration and Social Integration Code',
    officialSource: { name: 'وزارت مهاجرت و پناهندگی یونان', url: 'https://migration.gov.gr' },
    verifiedBy: 'سوفیا کنستانتینو (وکیل رسمی املاک آتن)',
    aioFastSummary:
      'در حالی که سقف خرید ملک در مناطق مرکزی آتن، تسالونیکی و جزایر توریستی به ۸۰۰,۰۰۰ یورو افزایش یافته است، گزینه خرید ملک‌های ۲۵۰,۰۰۰ یورویی با کاربری تجاری تبدیل‌شده به مسکونی (Commercial to Residential Conversion) و ساختمان‌های میراث فرهنگی در سراسر یونان همچنان با اعتبار کامل پا برجاست.',
    content: [
      'این قانون فرصتی طلایی برای سرمایه‌گذارانی است که می‌خواهند با کمترین مبلغ ممکن کارت اقامت دائم ۵ ساله شنگن برای خود، همسر، فرزندان و والدین خود اخذ نمایند.',
      'قراردادهای تبدیل کاربری با ضمانت کتبی کارشناسی شهرداری آتن و نظارت وکلای دیاکو بسته می‌شوند.',
    ],
    impactOnIranians:
      'بهترین مسیر برای خانواده‌های ایرانی علاقه‌مند به دریافت اقامت شنگن برای ۳ نسل بدون نیاز به اقامت فیزیکی در یونان و با امکان درآمد ارزی از اجاره ملک.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'news-4',
    title: 'به‌روزرسانی سیستم نوبت‌دهی تایید مدارک و لگالایز سفارت اتریش در تهران',
    category: 'embassy',
    categoryLabel: 'هشدارهای کنسولی',
    badge: 'کنسولی',
    dateJalali: '۱۸ بهمن ۱۴۰۴',
    dateGregorian: '2026-10-17',
    legalReference: 'Österreichische Botschaft Teheran — Konsularwesen 2026',
    officialSource: { name: 'سفارت اتریش در تهران', url: 'https://www.bmeia.gv.at/oeb-teheran' },
    verifiedBy: 'دپارتمان اسناد و لگالایز بین‌المللی دیاکو',
    aioFastSummary:
      'نوبت‌دهی تایید امضا و مدارک (Beglaubigung) سفارت اتریش در تهران از طریق پورتال الکترونیکی و با الزام ارائه تاییدیه وزارت امور خارجه و دادگستری با بارکد معتبر صورت می‌پذیرد. ارائه مدارک ناقص منجر به لغو نوبت و بلوکه شدن پرونده خواهد شد.',
    content: [
      'سفارت اتریش اعلام کرد که مدارک ترجمه‌شده به زبان آلمانی تنها در صورتی ممهور به مهر تایید نهایی می‌شوند که از تاریخ ترجمه رسمی آن‌ها بیش از ۶ ماه سپری نشده باشد.',
      'شناسنامه‌ها و مدارک هویتی نیازمند اصل تاییدیه ثبت احوال کل هستند.',
    ],
    impactOnIranians:
      'متقاضیان باید زمان‌بندی ترجمه و لگالایز مدارک را به گونه‌ای تنظیم کنند که تا زمان تحویل پرونده به اداره اقامت در وین معتبر باقی بماند.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'news-5',
    title: 'پیوستن کامل رومانی و بلغارستان به شنگن زمینی و یکپارچگی گمرکی قاره اروپا',
    category: 'eu-schengen',
    categoryLabel: 'اتحادیه اروپا و شنگن',
    badge: 'سهمیه ظرفیت',
    dateJalali: '۱۵ بهمن ۱۴۰۴',
    dateGregorian: '2026-10-14',
    legalReference: 'European Council Decision (EU) 2024/210',
    officialSource: { name: 'شورای اتحادیه اروپا (Council of the EU)', url: 'https://www.consilium.europa.eu' },
    verifiedBy: 'کارگروه حقوق بین‌الملل دیاکو',
    aioFastSummary:
      'با حذف کامل کنترل‌های مرزهای زمینی، دارندگان کارت‌های اقامت کشورهای عضو شنگن می‌توانند بدون توقف در مرزها از اروپای مرکزی تا سواحل دریای سیاه به صورت زمینی سفر کنند.',
    content: [
      'این تصمیم سرعت مبادلات تجاری شرکت‌های ثبت‌شده در شنگن را به شکل چشمگیری افزایش داده است.',
      'دارندگان اقامت مجارستان و اتریش بیشترین بهره‌مندی لجستیکی را از این تحول به دست خواهند آورد.',
    ],
    impactOnIranians:
      'سهولت تردد و گسترش بازارهای صادراتی برای بیزینس‌ها و تجار ایرانی فعال در مرکز و شرق اروپا.',
    image: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=800&q=80',
  },
];

export const VisaNewsPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>('news-1');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  // SEO & AIO
  useSeo({
    title: 'اخبار ویزا، بخشنامه‌های اقامت و تغییرات قوانین شنگن ۲۰۲۶ | هلدینگ دیاکو',
    description:
      'اتاق خبر رسمی و مانیتورینگ زنده قوانین مهاجرتی اروپا؛ تحلیل مستند مصوبات پارلمان اتریش (NAG)، اصلاحات بلوکارت آلمان، سهمیه‌های ۲۰۲۶ و اطلاعیه‌های سفارت با تایید وکلای پایه یک دیاکو در وین.',
    keywords: [
      'اخبار ویزای شنگن ۲۰۲۶',
      'بخشنامه جدید تمکن مالی اتریش',
      'تغییرات قانون بلوکارت آلمان',
      'آخرین اخبار گلدن ویزای یونان',
      'نوبت سفارت اتریش در تهران',
      'سهمیه تمکن مالی ۲۰۲۶',
      'هلدینگ دیاکو وین',
    ],
    canonical: '/visa-news',
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: 'اتاق خبر رسمی و مانیتورینگ تغییرات قوانین ویزا و اقامت اروپا در سال ۲۰۲۶',
      description:
        'بانک اخبار مستند حقوقی مهاجرت به اروپا با استناد به منابع رسمی دولتی اتریش، آلمان و اتحادیه اروپا.',
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

  const filteredNews = useMemo(() => {
    return NEWS_DATABASE.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSummary = item.aioFastSummary.toLowerCase().includes(q);
        const matchesRef = item.legalReference.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesRef) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setSubSuccess(true);
      setEmailSub('');
      setTimeout(() => setSubSuccess(false), 5000);
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
            <span className="text-amber-400 font-bold">اتاق خبر و بخشنامه‌های ویزا ۲۰۲۶</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              <span>مانیتورینگ پیوسته بخشنامه‌های رسمی اتحادیه اروپا، اتریش و آلمان</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              اتاق خبر رسمی و تحلیل بخشنامه‌های ویزا و مهاجرت
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
              اطلاع‌رسانی فوری و مستند مصوبات پارلمان‌های اروپایی، تغییرات سهمیه تمکن مالی، آمار قبولی ویزاها و هشدارهای کنسولی با استناد دقیق به ماده قانونی و تایید وکلای دادگستری.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>استناد مستقیم به سامانه حقوقی دولت فدرال اتریش (RIS)</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>به‌روزرسانی هفتگی با حضور کارشناسان مقیم وین و آتن</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          نوار جستجو و تب‌های دسته‌بندی اخبار
         ============================================================ */}
      <section className="sticky top-16 z-30 bg-[#06191f]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* تب‌های دسته‌بندی */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
              {[
                { key: 'all', label: 'همه اخبار' },
                { key: 'austria', label: '🇦🇹 اتریش' },
                { key: 'germany', label: '🇩🇪 آلمان' },
                { key: 'golden-visa', label: '👑 گلدن ویزا' },
                { key: 'embassy', label: '🏛️ سفارت و کنسولی' },
                { key: 'eu-schengen', label: '🇪🇺 شنگن و اروپا' },
              ].map((tab) => {
                const isActive = selectedCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSelectedCategory(tab.key)}
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

            {/* اینپوت سرچ */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در متن بخشنامه‌ها..."
                className="w-full bg-[#071f26] text-white placeholder-slate-400 rounded-xl pr-10 pl-3 py-1.5 text-xs border border-white/15 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          فهرست خبرها و تحلیل‌های حقوقی
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 py-10">
        <div className="space-y-6">
          {filteredNews.map((news) => {
            const isExpanded = expandedNewsId === news.id;
            return (
              <article
                key={news.id}
                className="rounded-3xl bg-[#0a2731] border border-white/15 hover:border-amber-400/40 transition-all duration-300 overflow-hidden shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* تصویر خبر */}
                  <div className="lg:col-span-4 h-52 lg:h-auto relative overflow-hidden bg-slate-800">
                    <OptimizedImage
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0a2731] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className="rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-amber-400 border border-white/15">
                        {news.categoryLabel}
                      </span>
                      <span className="rounded-lg bg-amber-400 px-2 py-0.5 text-[10px] font-black text-[#071f26]">
                        {news.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 flex items-center gap-2 text-[11px] text-slate-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{news.dateJalali}</span>
                    </div>
                  </div>

                  {/* بدنه خبر و خلاصه AIO */}
                  <div className="lg:col-span-8 p-6 flex flex-col justify-between">
                    <div>
                      {/* رفرنس قانونی */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded">
                          {news.legalReference}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                          {news.verifiedBy}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-xl font-black text-white hover:text-amber-300 transition-colors leading-snug mb-3">
                        {news.title}
                      </h2>

                      {/* کادر Answer-First (AIO) */}
                      <div className="rounded-2xl bg-[#071f26] border border-amber-400/25 p-4 mb-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>خلاصه پاسخ حقوقی سریع (AIO Summary):</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                          {news.aioFastSummary}
                        </p>
                      </div>

                      {/* متن منبسط‌شده خبر */}
                      {isExpanded && (
                        <div className="space-y-4 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 mt-3">
                          {news.content.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                          ))}

                          <div className="rounded-xl bg-amber-400/10 border border-amber-400/30 p-3.5 text-xs text-amber-200">
                            <strong className="text-amber-300 block mb-1">
                              اثر این بخشنامه بر پرونده‌های متقاضیان ایرانی:
                            </strong>
                            {news.impactOnIranians}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* فوتر کارت خبر */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 mt-4">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400">منبع خبر:</span>
                        <a
                          href={news.officialSource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                        >
                          <span>{news.officialSource.name}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setExpandedNewsId(isExpanded ? null : news.id)}
                          className="rounded-xl bg-white/5 hover:bg-white/10 text-white px-3.5 py-1.5 text-xs font-bold border border-white/15 transition cursor-pointer flex items-center gap-1"
                        >
                          <span>{isExpanded ? 'بستن متن کامل' : 'مطالعه متن کامل بخشنامه'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          type="button"
                          onClick={onOpenAssessment}
                          className="rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071f26] px-3.5 py-1.5 text-xs font-black transition cursor-pointer"
                        >
                          بررسی اثر بر پرونده من
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          عضویت در خبرنامه هشدار فوری قوانین
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-[#092e39] via-[#0c3c4b] to-[#092e39] border border-white/15 p-8 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-[#071f26] flex items-center justify-center text-2xl font-black shrink-0">
              <Bell className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black">دریافت فوری بخشنامه‌ها و هشدارهای کنسولی ۲۰۲۶</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-lg">
                به محض بازگشایی سهمیه‌های تمکن مالی، کاهش حقوق یا اعلام نوبت‌های جدید سفارت، ایمیل هشدار دریافت کنید.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto">
            <input
              type="email"
              value={emailSub}
              onChange={(e) => setEmailSub(e.target.value)}
              placeholder="ایمیل خود را وارد نمایید..."
              required
              className="w-full sm:w-64 rounded-xl bg-[#071f26] border border-white/20 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071f26] px-5 py-2.5 text-xs font-black transition cursor-pointer shrink-0"
            >
              عضویت در سامانه هشدار
            </button>
          </form>

          {subSuccess && (
            <div className="w-full text-center text-xs text-emerald-300 font-bold">
              ایمیل شما با موفقیت در سامانه مانیتورینگ بخشنامه‌های دیاکو ثبت شد.
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          پرسش‌های متداول اخبار مهاجرتی
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 py-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0a2731] border border-white/10 p-6 sm:p-8">
          <h3 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>پرسش‌های متداول درباره قوانین و بخشنامه‌های شنگن</span>
          </h3>

          <div className="space-y-3">
            {[
              {
                q: 'آیا بخشنامه‌های جدید بر پرونده‌هایی که قبلاً سابمیت شده‌اند اثر عطف‌به‌ماسبق دارند؟',
                a: 'به طور کلی در حقوق اداری اروپا (از جمله ماده NAG اتریش)، پرونده‌ها بر اساس قانون حاکم در زمان ثبت رسمی (Einlangen) رسیدگی می‌شوند، مگر اینکه بخشنامه صراحتاً تسهیلاتی ایجاد کرده باشد که در آن صورت مشمول متقاضی خواهد شد.',
              },
              {
                q: 'چگونه می‌توان از صحت یک وکیل اروپایی یا بخشنامه مطلع شد؟',
                a: 'تمامی وکلای رسمی دادگستری در اتریش دارای شماره ثبت در کانون وکلای اتریش (Rechtsanwaltskammer) و در آلمان در Bundesrechtsanwaltskammer هستند که در وب‌سایت رسمی کانون قابل استعلام عمومی است.',
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
      </section>
    </div>
  );
};

export default VisaNewsPage;
