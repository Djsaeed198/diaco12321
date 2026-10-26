import OptimizedImage from '../../OptimizedImage';
import React, { useState } from 'react';
import {
  Globe2,
  MapPin,
  Building2,
  Euro,
  HeartPulse,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Scale,
  Sun,
  Award,
  Share2,
  Check,
  TrendingUp,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';
import type { PageType } from '../../Header';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

interface CountryInfo {
  id: string;
  name: string;
  flag: string;
  capital: string;
  population: string;
  currency: string;
  monthlyCostSingle: number;
  monthlyCostFamily: number;
  averageSalaryNet: number;
  incomeTaxRate: string;
  healthcareRank: string;
  safetyScore: string;
  prTimeline: string;
  passportRank: string;
  climate: string;
  heroImage: string;
  summary: string;
  topPrograms: { title: string; desc: string }[];
  pros: string[];
  cons: string[];
}

const COUNTRIES_DATA: CountryInfo[] = [
  {
    id: 'austria',
    name: 'اتریش (Austria)',
    flag: '🇦🇹',
    capital: 'وین (Wien)',
    population: '۹.۱ میلیون نفر',
    currency: 'یورو (€)',
    monthlyCostSingle: 1450,
    monthlyCostFamily: 3200,
    averageSalaryNet: 2850,
    incomeTaxRate: 'پلکانی ۲۰٪ تا ۵۰٪',
    healthcareRank: 'رتبه ۲ جهانی (بیمه همگانی ÖGK)',
    safetyScore: 'رتبه ۴ امن‌ترین کشورهای دنیا',
    prTimeline: '۵ سال (کارت اقامت دائم اتحادیه اروپا)',
    passportRank: 'رتبه ۴ قدرتمندترین گذرنامه جهان',
    climate: 'معتدل قاره‌ای آلپی، زمستان‌های برفی و تابستان‌های مطبوع',
    heroImage: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    summary:
      'وین برای ده سال متوالی عنوان برترین شهر جهان از نظر کیفیت زندگی (Mercer Index) را کسب کرده است. اتریش با فقدان مالیات بر ارث و ثروت، سیستم آموزشی رایگان و زیرساخت‌های کم‌نظیر، ایده‌آل‌ترین مقصد برای تمکن مالی و متخصصان است.',
    topPrograms: [
      { title: 'اقامت تمکن مالی (NAG §44)', desc: 'بدون نیاز به سرمایه‌گذاری پرریسک و بدون اجازه کار در اتریش با درآمد ثابت خارج از کشور' },
      { title: 'کارت قرمز-سفید-قرمز (Rot-Weiß-Rot)', desc: 'اقامت کاری امتیازبندی‌شده برای فارغ‌التحصیلان و نیروهای متخصص کلیدی' },
      { title: 'پذیرش دانشگاهی رایگان', desc: 'تحصیل در دانشگاه وین و دانشگاه صنعتی TU Wien با شهریه حدود ۷۵۰ یورو در ترم' },
    ],
    pros: ['بالاترین استاندارد رفاه و آب شرب پاک', 'تحصیل و درمان رایگان فرزندان', 'موقعیت مرکزی در قلب شنگن و اروپای مرکزی', 'امنیت اجتماعی فوق‌العاده بالا'],
    cons: ['نیاز به یادگیری زبان آلمانی برای ادغام کامل', 'محدودیت سهمیه سالانه تمکن مالی ایالتی'],
  },
  {
    id: 'germany',
    name: 'آلمان (Germany)',
    flag: '🇩🇪',
    capital: 'برلین (Berlin)',
    population: '۸۴ میلیون نفر',
    currency: 'یورو (€)',
    monthlyCostSingle: 1550,
    monthlyCostFamily: 3400,
    averageSalaryNet: 3100,
    incomeTaxRate: 'پلکانی ۱۴٪ تا ۴۵٪',
    healthcareRank: 'رتبه برتر پزشکی جهان',
    safetyScore: 'بسیار امن و قانون‌مدار',
    prTimeline: '۲۱ ماه با بلوکارت (زبان B1) یا ۲۷ ماه (A1)',
    passportRank: 'رتبه ۲ جهان',
    climate: 'معتدل معتدل با بارندگی منظم',
    heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    summary:
      'نخستین قدرت اقتصادی اروپا و چهارمین اقتصاد جهان. بازار کار فوق‌العاده پویا برای مهندسان، متخصصان کامپیوتر و کادر درمان، همراه با سریع‌ترین مسیر اخذ اقامت دائم در قاره اروپا از طریق بلوکارت.',
    topPrograms: [
      { title: 'بلوکارت آلمان (EU Blue Card)', desc: 'حداقل حقوق سالانه ۴۸,۳۰۰ یورو و تبدیل به اقامت دائم ظرف ۲۱ ماه' },
      { title: 'کارت شانس کاریابی (Chancenkarte)', desc: 'ویزای امتیازبندی‌شده یک‌ساله جهت جستجوی کار با اجازه کار پاره‌وقت ۲۰ ساعت' },
      { title: 'دوره‌های آوسبیلدونگ (Ausbildung)', desc: 'دوره‌های مهارتی با حقوق ماهیانه و تضمین استخدام قطعی' },
    ],
    pros: ['بزرگ‌ترین بازار کار تخصصی اروپا', 'سریع‌ترین مسیر دریافت اقامت دائم (۲۱ ماه)', 'دانشگاه‌های کاملاً رایگان دولتی', 'قانون جدید اعطای شهروندی پس از ۵ سال'],
    cons: ['نرخ مالیات بر درآمد نسبتاً بالا', 'بوروکراسی اداری و زمان‌بر بودن وقت سفارت'],
  },
  {
    id: 'spain',
    name: 'اسپانیا (Spain)',
    flag: '🇪🇸',
    capital: 'مادرید (Madrid)',
    population: '۴۸ میلیون نفر',
    currency: 'یورو (€)',
    monthlyCostSingle: 1100,
    monthlyCostFamily: 2400,
    averageSalaryNet: 2100,
    incomeTaxRate: '۱۹٪ تا ۴۷٪ (قانون بکهام ۲۴٪)',
    healthcareRank: 'رتبه ۱ امید به زندگی اروپا',
    safetyScore: 'بسیار امن و گرم و اجتماعی',
    prTimeline: '۵ سال اقامت موقت',
    passportRank: 'رتبه ۱ جهان مشترک با چند کشور',
    climate: 'مدیترانه‌ای با ۳۰۰ روز آفتابی در سال',
    heroImage: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    summary:
      'بهشت آب و هوایی اروپا با هزینه‌های زندگی حدود ۳۰٪ پایین‌تر از اروپای مرکزی. اسپانیا با ویزای دیجیتال نوماد و تمکن مالی (Non-Lucrative)، جذاب‌ترین مقصد برای فریلنسرها و خانواده‌های علاقه‌مند به آرامش است.',
    topPrograms: [
      { title: 'ویزای دیجیتال نوماد (DNV)', desc: 'ویژه افراد دورکار با درآمد ماهیانه حداقل ۲,۶۵۰ یورو و معافیت‌های مالیاتی قانون بکهام' },
      { title: 'اقامت تمکن مالی غیرانتفاعی (NLV)', desc: 'اثبات درآمد سالانه ۲۸,۸۰۰ یورو بدون الزام به سرمایه‌گذاری' },
      { title: 'ویزای تحصیلی با اجازه کار ۳۰ ساعت', desc: 'تحصیل به زبان انگلیسی و اسپانیایی در بارسلون و مادرید' },
    ],
    pros: ['آب و هوای درخشان مدیترانه‌ای', 'هزینه بسیار مناسب زندگی و خوراک', 'فرهنگ بسیار گرم و نزدیک به ایرانیان', 'مالیات ترجیحی قانون بکهام'],
    cons: ['نرخ بیکاری جوانان بالاتر از آلمان', 'حقوق‌های پایه کمتر از شمال اروپا'],
  },
  {
    id: 'netherlands',
    name: 'هلند (Netherlands)',
    flag: '🇳🇱',
    capital: 'آمستردام (Amsterdam)',
    population: '۱۸ میلیون نفر',
    currency: 'یورو (€)',
    monthlyCostSingle: 1750,
    monthlyCostFamily: 3800,
    averageSalaryNet: 3400,
    incomeTaxRate: 'معافیت ۳۰٪ برای متخصصان مهاجر',
    healthcareRank: 'رتبه برتر اروپای غربی',
    safetyScore: 'فوق‌العاده امن با زیرساخت دوچرخه‌سواری',
    prTimeline: '۵ سال اقامت قانونی',
    passportRank: 'رتبه ۳ جهان',
    climate: 'اقیانوسی معتدل با باد و بارندگی',
    heroImage: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
    summary:
      'بین‌المللی‌ترین کشور اروپا که بیش از ۹۳٪ مردم آن به زبان انگلیسی مسلط هستند. هلند با قانون جذاب معافیت مالیاتی ۳۰ درصدی (30% Ruling) و مرکزیت دفاتر اروپایی غول‌های فناوری، بهترین گزینه برای متخصصان IT است.',
    topPrograms: [
      { title: 'ویزای مهاجر با مهارت بالا (Kennismigrant)', desc: 'استخدام در شرکت‌های نوآور هلند با پشتیبانی کامل اسپانسرینگ شرکتی' },
      { title: 'ویزای استارت‌آپ هلند', desc: 'راه‌اندازی بیزینس نوآورانه با همراهی منتورهای بین‌المللی تاییدشده RVO' },
      { title: 'ویزای سال جستجو (Orientation Year)', desc: 'فرصت کاریابی یک‌ساله برای فارغ‌التحصیلان ۲۰۰ دانشگاه برتر جهان' },
    ],
    pros: ['تسلط عمومی سراسری به زبان انگلیسی', 'معافیت مالیاتی ۳۰٪ رولینگ', 'سیستم حمل و نقل و شهری بی‌نقص', 'مرکزیت فناوری و استارت‌آپ‌های اروپایی'],
    cons: ['کمبود مسکن در آمستردام و اوترخت', 'هزینه بالای اجاره آپارتمان'],
  },
  {
    id: 'italy',
    name: 'ایتالیا (Italy)',
    flag: '🇮🇹',
    capital: 'رم (Roma)',
    population: '۵۹ میلیون نفر',
    currency: 'یورو (€)',
    monthlyCostSingle: 1150,
    monthlyCostFamily: 2600,
    averageSalaryNet: 2200,
    incomeTaxRate: 'پلکانی ۲۳٪ تا ۴۳٪ (تخفیف ویژه مهاجران)',
    healthcareRank: 'رتبه برتر سازمان بهداشت جهانی',
    safetyScore: 'امن با غنای فرهنگی و باستانی',
    prTimeline: '۵ سال اقامت شنگن',
    passportRank: 'رتبه ۲ جهان',
    climate: 'مدیترانه‌ای ملایم با تابستان‌های آفتابی',
    heroImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    summary:
      'قطب هنر، مد، معماری و پزشکی جنوب اروپا. ایتالیا به لطف بورسیه‌های استانی DSU (تا ۸۰۰۰ یورو در سال همراه با خوابگاه رایگان) و آزمون سراسری انگلیسی پزشکی (IMAT)، محبوب‌ترین مقصد دانشجویان ایرانی است.',
    topPrograms: [
      { title: 'بورسیه استانی DSU و تحصیل رایگان', desc: 'پوشش کامل شهریه دانشگاه، کمک‌هزینه زندگی و اسکان برای دانشجویان ایرانی' },
      { title: 'پزشکی و دندانپزشکی به زبان انگلیسی', desc: 'پذیرش از طریق آزمون رسمی بین‌المللی IMAT در دانشگاه‌های برتر میلان، بولونیا و رم' },
      { title: 'بلوکارت و اقامت خودحمایتی (Residenza Elettiva)', desc: 'اثبات درآمد ۳۲,۰۰۰ یورو در سال برای اقامت بدون کار در ایتالیا' },
    ],
    pros: ['بورسیه‌های سخاوتمندانه استانی DSU', 'امکان تحصیل پزشکی به زبان انگلیسی', 'هزینه‌های زندگی مقرون‌به‌صرفه در شهرهای دانشجویی', 'فرهنگ غنی و تنوع غذایی بی‌نظیر'],
    cons: ['فرآیند طولانی اداری در کوئستورا (Questura)', 'فرصت‌های کاریابی محدودتر در جنوب ایتالیا'],
  },
  {
    id: 'greece',
    name: 'یونان (Greece)',
    flag: '🇬🇷',
    capital: 'آتن (Athens)',
    population: '۱۰.۵ میلیون نفر',
    currency: 'یورو (€)',
    monthlyCostSingle: 950,
    monthlyCostFamily: 2100,
    averageSalaryNet: 1600,
    incomeTaxRate: 'قوانین ویژه سرمایه‌گذاران خارجی',
    healthcareRank: 'استاندارد اروپایی',
    safetyScore: 'بسیار امن با جامعه مهمان‌نواز',
    prTimeline: 'اقامت دائم فوری از روز نخست خرید ملک',
    passportRank: 'رتبه ۵ جهان',
    climate: 'مدیترانه‌ای با سواحل نیلگون و جزایر شگفت‌انگیز',
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    summary:
      'سریع‌ترین، مطمئن‌ترین و اقتصادی‌ترین دروازه ورود به اقامت دائم اتحادیه اروپا. با خرید ملک به ارزش حداقل ۲۵۰,۰۰۰ یورو در مناطق تعیین‌شده، متقاضی، همسر، فرزندان تا ۲۱ سال و والدین هر دو طرف کارت اقامت شنگن دریافت می‌کنند.',
    topPrograms: [
      { title: 'گلدن ویزای یونان (Golden Visa)', desc: 'خرید ملک مسکونی ۲۵۰ هزار یورویی با اقامت دائم ۵ ساله قابل تمدید بدون شرط حضور' },
      { title: 'اقامت سه نسل خانواده', desc: 'شمول خودبه‌خودی والدین متقاضی و همسر بدون نیاز به پرونده جداگانه' },
      { title: 'درآمد ارزی از اجاره ملک', desc: 'امکان اجاره‌دادن ملک به صورت بلندمدت یا توریستی با بازدهی سالانه ۵ الی ۸ درصد یورو' },
    ],
    pros: ['عدم نیاز به شرط حضور در خاک یونان', 'ارزان‌ترین برنامه گلدن ویزای فعال در اروپا', 'اقامت همزمان ۳ نسل (متقاضی، فرزندان، والدین)', 'امکان تردد آزادانه در کل ۲۷ کشور حوزه شنگن'],
    cons: ['افزایش سقف سرمایه‌گذاری در مناطق مرکزی آتن به ۸۰۰ هزار یورو', 'حق کار کارمندی مستقیم در یونان ندارد'],
  },
  {
    id: 'hungary',
    name: 'مجارستان (Hungary)',
    flag: '🇭🇺',
    capital: 'بوداپست (Budapest)',
    population: '۹.۶ میلیون نفر',
    currency: 'فورینت (HUF) و یورو',
    monthlyCostSingle: 900,
    monthlyCostFamily: 1950,
    averageSalaryNet: 1450,
    incomeTaxRate: 'مالیات بر شرکت تک‌نرخی ۹٪ (پایین‌ترین در کل اتحادیه اروپا)',
    healthcareRank: 'استاندارد با آموزش پزشکی زبانزد',
    safetyScore: 'بسیار امن و اروپایی مدرن',
    prTimeline: '۳ سال اقامت کاری یا تحصیلی',
    passportRank: 'رتبه ۶ جهان',
    climate: 'قاره‌ای با ۴ فصل متمایز',
    heroImage: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
    summary:
      'نگین دانوب و دروازه طلایی ورود به جامعه پزشکی اروپا. دانشگاه‌های سملوایس (Semmelweis)، سگد و پچ برترین قطب‌های آموزش پزشکی، دندانپزشکی و داروسازی به زبان انگلیسی هستند. همچنین پایین‌ترین نرخ مالیات شرکت‌ها (۹٪) مجارستان را به بهشت ثبت بیزینس تبدیل کرده است.',
    topPrograms: [
      { title: 'کالج‌های پیش‌پزشکی و دانشگاه Semmelweis', desc: 'آمادگی ورود به رشته‌های علوم پزشکی با مدرک مورد تایید وزارت بهداشت ایران و کل اروپا' },
      { title: 'ویزای سرمایه‌گذار مهمان (Guest Investor)', desc: 'اقامت ۱۰ ساله شنگن از طریق خرید صندوق‌های املاک یا املاک مسکونی' },
      { title: 'ثبت شرکت با مالیات ۹ درصدی', desc: 'اخذ اقامت تجاری با کمترین هزینه راه‌اندازی و نگهداری در شنگن' },
    ],
    pros: ['پایین‌ترین مالیات شرکتی در اروپا (۹٪)', 'کالج‌های معتبر آمادگی پزشکی به زبان انگلیسی', 'هزینه تحصیل و مسکن بسیار اقتصادی', 'بوداپست، زیباترین و پویاترین شهر اروپای شرقی'],
    cons: ['زبان مجاری جزو سخت‌ترین زبان‌های دنیاست', 'واحد پولی مستقل (فورینت) در کنار یورو'],
  },
];

export const CountryGuidePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('austria');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeCountry = COUNTRIES_DATA.find((c) => c.id === selectedCountryId) || COUNTRIES_DATA[0];

  // SEO & AIO
  useSeo({
    title: 'راهنمای جامع کشورها و مقایسه مقاصد مهاجرت اروپا ۲۰۲۶ | هلدینگ دیاکو',
    description:
      'بررسی و مقایسه همه‌جانبه اتریش، آلمان، اسپانیا، هلند، ایتالیا، یونان و مجارستان؛ هزینه‌های زندگی، نرخ مالیات، حقوق خالص، سیستم مدارس و سریع‌ترین مسیر اقامت دائم با نظارت وکلای دیاکو.',
    keywords: [
      'مقایسه کشورهای اروپایی برای مهاجرت',
      'زندگی در اتریش بهتر است یا آلمان',
      'هزینه زندگی در وین ۲۰۲۶',
      'گلدن ویزای یونان و اسپانیا',
      'تحصیل پزشکی در ایتالیا و مجارستان',
      'قوانین اقامت هلند و 30% Ruling',
      'هلدینگ دیاکو وین',
    ],
    canonical: '/country-guide',
    ogType: 'article',
    ogImage: activeCountry.heroImage,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'راهنمای تحلیلی شرایط زندگی، درآمد و اقامت در کشورهای شاخص اروپا ۲۰۲۶',
      description:
        'بانک اطلاعاتی جامع درباره هزینه‌های خانوار، کیفیت بهداشت و درمان، سیستم مالیاتی و روش‌های اخذ اقامت در اتحادیه اروپا.',
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

  const handleShare = async () => {
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
            <span className="text-amber-400 font-bold">راهنمای جامع کشورهای اروپایی</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>پایگاه داده مقایسه‌ای ۸ مقصد مهاجرتی برتر قاره سبز ۲۰۲۶</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              راهنمای تخصصی شرایط زندگی، هزینه‌ها و اقامت اروپا
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
              تحلیل واقعی هزینه‌های مسکن، نرخ مالیات بر درآمد، کیفیت سیستم بهداشت و درمان، امنیت اجتماعی و مسیرهای اقامت دائم در اتریش، آلمان، هلند، اسپانیا، ایتالیا، یونان و مجارستان به قلم وکلای مقیم دفتر وین دیاکو.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-emerald-400" />
                <span>بررسی ۸ کشور پیشرو اتحادیه اروپا</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Euro className="w-4 h-4 text-amber-400" />
                <span>محاسبه دقیق دخل‌وخرج و مالیات خانوار</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>بررسی حقوقی قوانین مهاجرتی ۲۰۲۶</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          تب‌های انتخاب کشور
         ============================================================ */}
      <section className="sticky top-16 z-30 bg-[#06191f]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {COUNTRIES_DATA.map((country) => {
              const isSelected = selectedCountryId === country.id;
              return (
                <button
                  key={country.id}
                  type="button"
                  onClick={() => setSelectedCountryId(country.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-[#071f26] shadow-md font-black'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <span className="text-base">{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          داشبورد جامع اطلاعات کشور انتخاب‌شده
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 py-10">
        <div className="rounded-3xl bg-[#0a2731] border border-white/15 overflow-hidden shadow-2xl">
          {/* هدر کارت با تصویر بنر */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <OptimizedImage
              src={activeCountry.heroImage}
              loading="eager"
              fetchPriority="high"
              alt={activeCountry.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2731] via-[#0a2731]/60 to-transparent" />

            <div className="absolute bottom-6 right-6 left-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-4xl">{activeCountry.flag}</span>
                  <span className="text-xs font-bold text-amber-300 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                    پایتخت: {activeCountry.capital} | جمعیت: {activeCountry.population}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white">{activeCountry.name}</h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleShare}
                  className="rounded-xl bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 p-2.5 text-xs text-white transition cursor-pointer"
                  title="اشتراک‌گذاری"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071f26] px-5 py-2.5 text-xs font-black shadow-lg transition hover:scale-105 cursor-pointer"
                >
                  ارزیابی شانس اقامت در این کشور ←
                </button>
              </div>
            </div>
          </div>

          {/* محتوا و متریک‌های کلیدی */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* پاراگراف خلاصه E-E-A-T */}
            <div className="rounded-2xl bg-[#071f26] border border-white/10 p-5 leading-relaxed text-xs sm:text-sm text-slate-200">
              {activeCountry.summary}
            </div>

            {/* گرید ۸ تایی متریک‌های کلیدی زندگی */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="rounded-2xl bg-[#071f26] border border-white/10 p-4 text-center">
                <div className="text-slate-400 text-xs mb-1">هزینه ماهانه فرد مجرد</div>
                <div className="text-lg sm:text-xl font-black text-white flex items-center justify-center gap-0.5">
                  <Euro className="w-4 h-4 text-emerald-400" />
                  <span>{activeCountry.monthlyCostSingle.toLocaleString()}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">شامل اجاره و قبوض</div>
              </div>

              <div className="rounded-2xl bg-[#071f26] border border-white/10 p-4 text-center">
                <div className="text-slate-400 text-xs mb-1">هزینه ماهانه خانواده (۴ نفره)</div>
                <div className="text-lg sm:text-xl font-black text-white flex items-center justify-center gap-0.5">
                  <Euro className="w-4 h-4 text-emerald-400" />
                  <span>{activeCountry.monthlyCostFamily.toLocaleString()}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">سبد مصرفی استاندارد</div>
              </div>

              <div className="rounded-2xl bg-[#071f26] border border-white/10 p-4 text-center">
                <div className="text-slate-400 text-xs mb-1">میانگین حقوق خالص ماهانه</div>
                <div className="text-lg sm:text-xl font-black text-emerald-400 flex items-center justify-center gap-0.5">
                  <Euro className="w-4 h-4 text-emerald-400" />
                  <span>{activeCountry.averageSalaryNet.toLocaleString()}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">پس از کسر مالیات و بیمه</div>
              </div>

              <div className="rounded-2xl bg-[#071f26] border border-white/10 p-4 text-center">
                <div className="text-slate-400 text-xs mb-1">زمان اخذ اقامت دائم (PR)</div>
                <div className="text-lg sm:text-xl font-black text-amber-400">
                  {activeCountry.prTimeline.split(' ')[0]} {activeCountry.prTimeline.split(' ')[1]}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{activeCountry.prTimeline}</div>
              </div>

              <div className="rounded-2xl bg-[#071f26] border border-white/10 p-4 text-center">
                <div className="text-slate-400 text-xs mb-1">سیستم بهداشت و درمان</div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {activeCountry.healthcareRank}
                </div>
              </div>

              <div className="rounded-2xl bg-[#071f26] border border-white/10 p-4 text-center">
                <div className="text-slate-400 text-xs mb-1">نرخ مالیات بر درآمد</div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {activeCountry.incomeTaxRate}
                </div>
              </div>

              <div className="rounded-2xl bg-[#071f26] border border-white/10 p-4 text-center">
                <div className="text-slate-400 text-xs mb-1">شاخص امنیت و رفاه</div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {activeCountry.safetyScore}
                </div>
              </div>

              <div className="rounded-2xl bg-[#071f26] border border-white/10 p-4 text-center">
                <div className="text-slate-400 text-xs mb-1">رتبه پاسپورت و شنگن</div>
                <div className="text-xs sm:text-sm font-bold text-amber-400 mt-1">
                  {activeCountry.passportRank}
                </div>
              </div>
            </div>

            {/* برترین برنامه‌های اقامتی این کشور */}
            <div>
              <h3 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>محبوب‌ترین و موفق‌ترین مسیرهای مهاجرت به {activeCountry.name}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeCountry.topPrograms.map((prog, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-[#071f26] border border-white/10 p-5 space-y-2 hover:border-amber-400/40 transition"
                  >
                    <div className="text-xs font-black text-amber-400">{prog.title}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{prog.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* نقاط قوت و چالش‌ها (مزایا و معایب) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/30 p-5 space-y-3">
                <div className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>مزایای اصلی زندگی و اقامت در {activeCountry.name}:</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {activeCountry.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-amber-950/20 border border-amber-500/30 p-5 space-y-3">
                <div className="text-xs sm:text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  <span>نکات و چالش‌هایی که باید مدنظر داشته باشید:</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {activeCountry.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          مقاله تخصصی مقایسه‌ای (وین در برابر برلین و پاریس)
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 py-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full">
              تحلیل موشکافانه سال ۲۰۲۶
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white mt-3 mb-3">
              کدام کشور اروپایی برای سبک زندگی و شرایط شما مناسب‌تر است؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              تفاوت‌های بنیادین مهاجرت کاری، سرمایه‌گذاری ملکی و تمکن مالی از دیدگاه امنیت سرمایه و آینده فرزندان.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🇦🇹</span>
                <span>اتریش: نگین آرامش و ثروت خانوادگی</span>
              </h3>
              <p>
                اتریش به‌ویژه برای افرادی که تمایل دارند دارایی‌های خود را از نوسانات تورمی محافظت کرده و از آرامش، پاکیزگی هوا و مدارس دولتی طراز اول جهان بهره‌مند شوند، انتخاب بی‌رقیب است. برنامه تمکن مالی اتریش (Quotenkontingent) به دلیل عدم الزام به راه‌اندازی شرکت یا سرمایه‌گذاری‌های پرریسک، محبوب‌ترین روش در میان خانواده‌های متمول ایرانی است.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🇩🇪</span>
                <span>آلمان: سکوی پرتاب شغلی و سرعت اقامت دائم</span>
              </h3>
              <p>
                اگر مهندس، پزشک یا برنامه‌نویس هستید و هدف اصلی شما توسعه شتابان شغلی و دستیابی سریع به اقامت دائم و پاسپورت قدرتمند اروپاست، آلمان به لطف بلوکارت ۲۱ ماهه و کاهش ساعات اداری بهترین اکوسیستم کاری قاره اروپا را برای شما فراهم می‌آورد.
              </p>
            </div>
          </div>

          {/* پرسش‌های متداول انتخاب کشور */}
          <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 sm:p-8">
            <h3 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>پرسش‌های متداول در انتخاب کشور مقصد</span>
            </h3>

            <div className="space-y-3">
              {[
                {
                  q: 'آیا با اقامت یک کشور اروپایی می‌توان در سایر کشورهای شنگن آزادانه سفر کرد؟',
                  a: 'بله، کارت اقامت شنگن صادره از هر یک از کشورهای اتریش، آلمان، اسپانیا و غیره، به شما اجازه می‌دهد تا سقف ۹۰ روز در هر بازه ۱۸۰ روزه بدون نیاز به ویزا به تمام ۲۷ کشور حوزه شنگن سفر کنید.',
                },
                {
                  q: 'آیا فرزندان در مدارس دولتی کشورهای اروپایی به زبان انگلیسی درس می‌خوانند؟',
                  a: 'در مدارس دولتی زبان تدریس زبان رسمی کشور (مثلاً آلمانی در اتریش یا اسپانیایی در مادرید) است و دولت دوره‌های زبان جبرانی رایگان برگزار می‌کند. برای تحصیل ۱۰۰٪ انگلیسی، مدارس بین‌المللی (International Schools) در دسترس هستند.',
                },
                {
                  q: 'کدام کشور کمترین مالیات بر درآمد را در اروپا دارد؟',
                  a: 'در حوزه شرکت‌ها، مجارستان با ۹٪ مالیات پایین‌ترین در اتحادیه اروپاست. برای متخصصان خارجی نیز هلند با قانون ۳۰٪ معافیت و اسپانیا با قانون بکهام (۲۴٪ ثابت) تخفیف‌های بسیار جذابی ارائه می‌دهند.',
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
            نمی‌دانید کدام کشور برای شرایط خانوادگی و مالی شما ایده‌آل است؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            با تکمیل ارزیابی هوشمند دیاکو، هوش حقوقی ما بر اساس سن، بودجه، زبان و تمایلات شما بهترین مقصد مهاجرتی اروپا را پیشنهاد می‌دهد.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071f26] px-6 py-3 text-xs sm:text-sm font-black shadow-lg transition hover:scale-105 cursor-pointer"
            >
              شروع ارزیابی هوشمند و مقایسه اختصاصی ←
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

export default CountryGuidePage;
