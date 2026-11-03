import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import {
  MapPin,
  Award,
  TrendingUp,
  ShieldCheck,
  Building2,
  Clock,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
  ChevronRight,
  Globe,
  PieChart as PieIcon,
  BarChart3,
} from 'lucide-react';
import { toPersianDigits } from '../utils/persian';
import type { PageType } from './Header';

export interface ClusterData {
  id: string;
  nameFa: string;
  nameEn: string;
  regionFa: string;
  flag: string;
  primaryCountries: string[];
  casesCount: number;
  approvalRate: number;
  avgMonths: number;
  office?: string;
  coords: { x: number; y: number }; // SVG Map coordinates
  accentColor: string;
  breakdown: Array<{ name: string; value: number; color: string }>;
  yearlyTrend: Array<{ year: string; cases: number }>;
  topCities: string[];
  description: string;
  sampleCases: Array<{ id: string; title: string; year: string; program: string }>;
  targetPage: PageType;
}

export const CLUSTERS: ClusterData[] = [
  {
    id: 'central-austria',
    nameFa: 'کلاستر اتریش و اروپای مرکزی',
    nameEn: 'Austria & Central Europe Hub',
    regionFa: 'اتریش، مجارستان، اسلواکی و چک',
    flag: '🇦🇹',
    primaryCountries: ['اتریش', 'مجارستان', 'اسلواکی'],
    casesCount: 940,
    approvalRate: 99.4,
    avgMonths: 3.8,
    office: 'دفتر مستقیم وکالت دیاکو: Ausstellungsstraße 50, 1020 Wien',
    coords: { x: 550, y: 360 },
    accentColor: '#f5a623',
    breakdown: [
      { name: 'تمکن مالی (NAG §44)', value: 420, color: '#f5a623' },
      { name: 'کارت قرمز-سفید-قرمز (RWR)', value: 270, color: '#38bdf8' },
      { name: 'تحصیلی دانشگاه وین', value: 160, color: '#10b981' },
      { name: 'بلوکارت و سرمایه‌گذاری', value: 90, color: '#a855f7' },
    ],
    yearlyTrend: [
      { year: '۲۰۲۱', cases: 85 },
      { year: '۲۰۲۲', cases: 160 },
      { year: '۲۰۲۳', cases: 290 },
      { year: '۲۰۲۴', cases: 540 },
      { year: '۲۰۲۵', cases: 790 },
      { year: '۲۰۲۶', cases: 940 },
    ],
    topCities: ['وین (Wien)', 'گراتس (Graz)', 'سالزبورگ (Salzburg)', 'لینتس (Linz)'],
    description:
      'بزرگ‌ترین کلاستر پرونده‌های موفق هلدینگ دیاکو با پیگیری بدون واسطه در اداره اقامت وین (MA35) و کسب بالاترین ظرفیت سهمیه تمکن مالی در ایران.',
    sampleCases: [
      { id: 'AT-841', title: 'اقامت تمکن مالی خانوادگی وین', year: '۲۰۲۶', program: 'NAG §44' },
      { id: 'AT-812', title: 'کارت RWR مهندسی نرم‌افزار', year: '۲۰۲۵', program: 'RWR Card' },
      { id: 'AT-790', title: 'پذیرش کارشناسی ارشد دانشگاه وین', year: '۲۰۲۵', program: 'Student' },
    ],
    targetPage: 'financial-austria',
  },
  {
    id: 'germany-dach',
    nameFa: 'کلاستر آلمان و اروپای غربی',
    nameEn: 'Germany & DACH Hub',
    regionFa: 'آلمان، سوئیس و هلند',
    flag: '🇩🇪',
    primaryCountries: ['آلمان', 'هلند'],
    casesCount: 540,
    approvalRate: 98.2,
    avgMonths: 4.6,
    office: 'دپارتمان وکلای مقیم برلین، مونیخ و فرانکفورت',
    coords: { x: 475, y: 275 },
    accentColor: '#38bdf8',
    breakdown: [
      { name: 'بلوکارت آلمان (Blue Card)', value: 290, color: '#38bdf8' },
      { name: 'کارت شانس کاریابی (Chancenkarte)', value: 130, color: '#f5a623' },
      { name: 'معادل‌سازی پزشکان (Approbation)', value: 80, color: '#10b981' },
      { name: 'استارت‌آپ و نیروی ماهر هلند', value: 40, color: '#a855f7' },
    ],
    yearlyTrend: [
      { year: '۲۰۲۱', cases: 45 },
      { year: '۲۰۲۲', cases: 110 },
      { year: '۲۰۲۳', cases: 210 },
      { year: '۲۰۲۴', cases: 350 },
      { year: '۲۰۲۵', cases: 460 },
      { year: '۲۰۲۶', cases: 540 },
    ],
    topCities: ['برلین (Berlin)', 'مونیخ (München)', 'فرانکفورت (Frankfurt)', 'هامبورگ (Hamburg)'],
    description:
      'قطب استخدام تخصصی و صنعتی قاره اروپا؛ صدور قراردادهای معتبر کاری، تاییدیه ارزشیابی ZAB و تسریع مصاحبه‌های کنسولی سفارت آلمان.',
    sampleCases: [
      { id: 'DE-492', title: 'بلوکارت مهندس هوش مصنوعی برلین', year: '۲۰۲۶', program: 'Blaue Karte' },
      { id: 'DE-458', title: 'کارت شانس امتیاز کامل مونیخ', year: '۲۰۲۵', program: 'Chancenkarte' },
      { id: 'DE-420', title: 'پروانه طبابت و اشتغال پزشک در هامبورگ', year: '۲۰۲۵', program: 'Approbation' },
    ],
    targetPage: 'german-blue-card',
  },
  {
    id: 'mediterranean-greece',
    nameFa: 'کلاستر مدیترانه و یونان',
    nameEn: 'Greece Mediterranean Hub',
    regionFa: 'یونان و جزایر دریای اژه',
    flag: '🇬🇷',
    primaryCountries: ['یونان'],
    casesCount: 310,
    approvalRate: 100,
    avgMonths: 2.5,
    office: 'دفتر رسمی هلدینگ دیاکو در آتن: Grigoriou Lampraki 58, Glyfada',
    coords: { x: 705, y: 535 },
    accentColor: '#10b981',
    breakdown: [
      { name: 'گلدن ویزای سرمایه‌گذاری ملکی', value: 210, color: '#10b981' },
      { name: 'تمکن مالی مستقل (FIP)', value: 70, color: '#f5a623' },
      { name: 'دیجیتال نومد و خوداشتغالی', value: 30, color: '#38bdf8' },
    ],
    yearlyTrend: [
      { year: '۲۰۲۱', cases: 20 },
      { year: '۲۰۲۲', cases: 65 },
      { year: '۲۰۲۳', cases: 130 },
      { year: '۲۰۲۴', cases: 205 },
      { year: '۲۰۲۵', cases: 270 },
      { year: '۲۰۲۶', cases: 310 },
    ],
    topCities: ['آتن (Athens)', 'گلیفادا (Glyfada)', 'پیرائوس (Piraeus)', 'تسالونیکی (Thessaloniki)'],
    description:
      'سریع‌ترین مسیر دریافت اقامت دائم ۵ ساله شینگن بدون شرط حضور با همراهی مستقیم تیم مقیم دیاکو در آتن و تضمین استعلامات ثبتی ملک.',
    sampleCases: [
      { id: 'GR-298', title: 'گلدن ویزای آپارتمان ساحلی گلیفادا', year: '۲۰۲۶', program: 'Golden Visa' },
      { id: 'GR-275', title: 'اقامت FIP تمکن مالی مستقل آتن', year: '۲۰۲۵', program: 'FIP Visa' },
      { id: 'GR-240', title: 'خرید ملک تجاری تبدیل‌شده ۲۵۰k', year: '۲۰۲۵', program: 'Conversion' },
    ],
    targetPage: 'realestate-greece',
  },
  {
    id: 'iberian-peninsula',
    nameFa: 'کلاستر شبه‌جزیره ایبری (اسپانیا و پرتغال)',
    nameEn: 'Iberian Peninsula Hub',
    regionFa: 'اسپانیا و پرتغال',
    flag: '🇪🇸',
    primaryCountries: ['اسپانیا', 'پرتغال'],
    casesCount: 400,
    approvalRate: 97.8,
    avgMonths: 4.8,
    office: 'دپارتمان حقوقی مادرید، بارسلونا و لیسبون',
    coords: { x: 235, y: 485 },
    accentColor: '#f97316',
    breakdown: [
      { name: 'اقامت غیرانتفاعی (Non-Lucrative)', value: 200, color: '#f97316' },
      { name: 'ویزای تمکن مالی D7 پرتغال', value: 100, color: '#f5a623' },
      { name: 'دیجیتال نومد اسپانیا و پرتغال', value: 60, color: '#38bdf8' },
      { name: 'گلدن ویزای سرمایه‌گذاری', value: 40, color: '#10b981' },
    ],
    yearlyTrend: [
      { year: '۲۰۲۱', cases: 30 },
      { year: '۲۰۲۲', cases: 85 },
      { year: '۲۰۲۳', cases: 170 },
      { year: '۲۰۲۴', cases: 270 },
      { year: '۲۰۲۵', cases: 350 },
      { year: '۲۰۲۶', cases: 400 },
    ],
    topCities: ['مادرید (Madrid)', 'بارسلونا (Barcelona)', 'لیسبون (Lisbon)', 'پورتو (Porto)'],
    description:
      'مقصد محبوب خانواده‌ها و علاقه‌مندان سبک زندگی معتدل؛ اثبات بهینه درآمدهای غیرفعال و دستیابی به پاسپورت معتبر اروپایی.',
    sampleCases: [
      { id: 'ES-388', title: 'اقامت غیرانتفاعی مادرید برای خانواده ۴ نفره', year: '۲۰۲۶', program: 'Non-Lucrative' },
      { id: 'PT-134', title: 'ویزای خودحمایتی D7 لیسبون', year: '۲۰۲۵', program: 'D7 Passive' },
      { id: 'ES-340', title: 'دیجیتال نومد بارسلونا با درآمد فریلنسری', year: '۲۰۲۵', program: 'Digital Nomad' },
    ],
    targetPage: 'financial-spain',
  },
  {
    id: 'pan-european-growth',
    nameFa: 'کلاستر شمال، فرانسه و بالتیک',
    nameEn: 'Northern, France & Benelux Hub',
    regionFa: 'فرانسه، ایتالیا، دانمارک و لتونی',
    flag: '🇫🇷',
    primaryCountries: ['فرانسه', 'ایتالیا', 'دانمارک'],
    casesCount: 280,
    approvalRate: 97.4,
    avgMonths: 4.2,
    office: 'شبکه وکلای همکار در پاریس، میلان و کپنهاگ',
    coords: { x: 360, y: 350 },
    accentColor: '#a855f7',
    breakdown: [
      { name: 'پاسپورت تلنت فرانسه (Talent)', value: 110, color: '#a855f7' },
      { name: 'بورسیه استانی DSU ایتالیا', value: 90, color: '#10b981' },
      { name: 'معادل‌سازی کادر درمان دانمارک', value: 50, color: '#38bdf8' },
      { name: 'ثبت شرکت و اقامت لتونی', value: 30, color: '#f5a623' },
    ],
    yearlyTrend: [
      { year: '۲۰۲۱', cases: 25 },
      { year: '۲۰۲۲', cases: 60 },
      { year: '۲۰۲۳', cases: 120 },
      { year: '۲۰۲۴', cases: 185 },
      { year: '۲۰۲5', cases: 240 },
      { year: '۲۰۲۶', cases: 280 },
    ],
    topCities: ['پاریس (Paris)', 'میلان (Milan)', 'رم (Rome)', 'کپنهاگ (Copenhagen)'],
    description:
      'مسیرهای تخصصی نخبگان علمی، هنری، پژوهشگران و پزشکان در برترین پایتخت‌های فرهنگی و درمانی اروپای غربی و شمالی.',
    sampleCases: [
      { id: 'FR-160', title: 'پاسپورت تلنت پژوهشگر هوش مصنوعی پاریس', year: '۲۰۲۶', program: 'Passeport Talent' },
      { id: 'IT-185', title: 'بورسیه کامل DSU و تحصیل رایگان دانشگاه میلان', year: '۲۰۲۵', program: 'DSU Scholar' },
      { id: 'DK-058', title: 'ویزای معادل‌سازی پزشک عمومی کپنهاگ', year: '۲۰۲۵', program: 'Medical Board' },
    ],
    targetPage: 'services',
  },
];

interface CaseSuccessMapProps {
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

export const CaseSuccessMap: React.FC<CaseSuccessMapProps> = ({
  onOpenAssessment,
  onNavigateToPage,
}) => {
  const [selectedClusterId, setSelectedClusterId] = useState<string>('central-austria');
  const [activeTab, setActiveTab] = useState<'map' | 'analytics' | 'growth'>('map');

  const selectedCluster = useMemo(() => {
    return CLUSTERS.find((c) => c.id === selectedClusterId) || CLUSTERS[0];
  }, [selectedClusterId]);

  const totalCasesAllClusters = useMemo(() => {
    return CLUSTERS.reduce((sum, c) => sum + c.casesCount, 0);
  }, []);

  const overallAvgApproval = useMemo(() => {
    const total = CLUSTERS.reduce((sum, c) => sum + c.approvalRate * c.casesCount, 0);
    return (total / totalCasesAllClusters).toFixed(1);
  }, [totalCasesAllClusters]);

  // Aggregate breakdown across all clusters for the analytics tab
  const aggregateProgramStats = useMemo(() => {
    const map = new Map<string, number>();
    CLUSTERS.forEach((c) => {
      c.breakdown.forEach((b) => {
        const cat = b.name.includes('تمکن')
          ? 'تمکن مالی (خودحمایتی)'
          : b.name.includes('بلوکارت') || b.name.includes('کار') || b.name.includes('RWR')
          ? 'کاری و بلوکارت نخبگان'
          : b.name.includes('گلدن') || b.name.includes('ملک') || b.name.includes('سرمایه‌گذاری')
          ? 'سرمایه‌گذاری ملکی و گلدن ویزا'
          : 'پذیرش تحصیلی، تلنت و کادر درمان';
        map.set(cat, (map.get(cat) || 0) + b.value);
      });
    });
    return [
      { name: 'تمکن مالی (خودحمایتی)', value: map.get('تمکن مالی (خودحمایتی)') || 760, color: '#f5a623' },
      { name: 'کاری و بلوکارت نخبگان', value: map.get('کاری و بلوکارت نخبگان') || 740, color: '#38bdf8' },
      { name: 'سرمایه‌گذاری ملکی و گلدن ویزا', value: map.get('سرمایه‌گذاری ملکی و گلدن ویزا') || 560, color: '#10b981' },
      { name: 'پذیرش تحصیلی، تلنت و درمان', value: map.get('پذیرش تحصیلی، تلنت و درمان') || 410, color: '#a855f7' },
    ];
  }, []);

  const barChartData = useMemo(() => {
    return CLUSTERS.map((c) => ({
      name: c.nameFa.split(' ')[1] || c.nameFa,
      fullName: c.nameFa,
      cases: c.casesCount,
      rate: c.approvalRate,
      color: c.accentColor,
    }));
  }, []);

  return (
    <section
      id="case-success-map"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#061a22] via-[#092632] to-[#061820] py-16 text-white md:py-24 border-t border-white/10"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 -right-24 h-[500px] w-[500px] rounded-full bg-[#f5a623]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 -left-24 h-[500px] w-[500px] rounded-full bg-[#38bdf8]/10 blur-[150px] pointer-events-none" />

      <div className="container relative mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 shadow-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-[#f5a623]" />
            <span>سامانه پایش جغرافیایی پرونده‌های موفق دیاکو</span>
          </div>
          <h2 className="mt-4 text-2xl font-black sm:text-4xl lg:text-5xl text-white tracking-tight">
            نقشه کلاسترهای پرونده‌های موفق <span className="text-[#f5a623]">هلدینگ مهاجرتی دیاکو</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-7 max-w-2xl mx-auto">
            تحلیل ژئوپلیتیک بیش از {toPersianDigits(totalCasesAllClusters)} پرونده اقامتی صادر شده با نظارت مستقیم وکلای پایه یک در پایتخت‌های پیشرو اروپا، نرخ قبولی رسمی و سرعت پیگیری پرونده‌ها.
          </p>

          {/* Quick Stats Grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
              <span className="text-[11px] text-slate-400 font-medium">کل پرونده‌های موفق</span>
              <p className="mt-1 text-2xl sm:text-3xl font-black text-[#f5a623]">
                +{toPersianDigits(totalCasesAllClusters)}
              </p>
              <span className="text-[10px] text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                <CheckCircle2 className="h-3 w-3 inline" /> ۱۰۰٪ قانونی و معتبر
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
              <span className="text-[11px] text-slate-400 font-medium">نرخ میانگین قبولی</span>
              <p className="mt-1 text-2xl sm:text-3xl font-black text-emerald-400">
                {toPersianDigits(overallAvgApproval)}٪
              </p>
              <span className="text-[10px] text-slate-300 mt-0.5 block">در ادارات مهاجرت شینگن</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
              <span className="text-[11px] text-slate-400 font-medium">دفاتر مقیم اروپا</span>
              <p className="mt-1 text-2xl sm:text-3xl font-black text-sky-400">
                وین و آتن
              </p>
              <span className="text-[10px] text-slate-300 mt-0.5 block">+ مرکز ارتباط تهران</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
              <span className="text-[11px] text-slate-400 font-medium">کلاسترهای فعال</span>
              <p className="mt-1 text-2xl sm:text-3xl font-black text-purple-400">
                {toPersianDigits(CLUSTERS.length)} هاب
              </p>
              <span className="text-[10px] text-slate-300 mt-0.5 block">پوشش حوزه شینگن</span>
            </div>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-2xl border border-white/15 bg-white/5 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-[#f5a623] text-[#082833] shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span>نقشه تعاملی کلاسترها</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#f5a623] text-[#082833] shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>تحلیل آماری کلاسترها (Recharts)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('growth')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'growth'
                  ? 'bg-[#f5a623] text-[#082833] shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>روند رشد سالانه (۲۰۲۰-۲۰۲۶)</span>
            </button>
          </div>
        </div>

        {/* Cluster Filter Buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
          {CLUSTERS.map((cluster) => {
            const isSelected = cluster.id === selectedClusterId;
            return (
              <button
                key={cluster.id}
                type="button"
                onClick={() => setSelectedClusterId(cluster.id)}
                className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                  isSelected
                    ? 'border-[#f5a623] bg-amber-500/20 text-[#f5a623] shadow-lg scale-105'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-base">{cluster.flag}</span>
                <span>{cluster.nameFa.replace('کلاستر ', '')}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                    isSelected ? 'bg-[#f5a623] text-[#082833]' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  +{toPersianDigits(cluster.casesCount)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage */}
        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Map or Charts */}
          <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-gradient-to-br from-[#07212b] via-[#0a2c3a] to-[#071f28] p-5 sm:p-6 shadow-2xl relative overflow-hidden min-h-[480px]">
            {/* Header info of the card */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 text-xs">
              <span className="flex items-center gap-2 font-bold text-amber-300">
                <span className="h-2 w-2 rounded-full bg-[#f5a623] animate-ping" />
                <span>
                  {activeTab === 'map'
                    ? 'موقعیت جغرافیایی کلاسترهای موفق در اروپا'
                    : activeTab === 'analytics'
                    ? 'مقایسه حجم و نرخ قبولی کلاسترها'
                    : 'نمودار تراکمی صدور ویزاها در گذر زمان'}
                </span>
              </span>
              <span className="rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-[11px] text-slate-300">
                هاب انتخابی: <strong className="text-[#f5a623]">{selectedCluster.flag} {selectedCluster.nameFa}</strong>
              </span>
            </div>

            {/* TAB 1: SVG Europe Cluster Map */}
            {activeTab === 'map' && (
              <div className="relative aspect-[16/11] w-full select-none overflow-hidden rounded-2xl bg-[#05171f] border border-white/10 shadow-inner">
                <svg
                  viewBox="0 0 1000 680"
                  className="h-full w-full object-contain filter drop-shadow-md"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="mapBgGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#05161e" />
                      <stop offset="100%" stopColor="#08232c" />
                    </linearGradient>
                    <radialGradient id="viennaMapGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f5a623" stopOpacity="0.45" />
                      <stop offset="60%" stopColor="#f5a623" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#05161e" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Ocean Base */}
                  <rect width="1000" height="680" fill="url(#mapBgGrad)" />

                  {/* Lat/Long Grid */}
                  <g opacity="0.06" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4,8">
                    <line x1="0" y1="170" x2="1000" y2="170" />
                    <line x1="0" y1="340" x2="1000" y2="340" />
                    <line x1="0" y1="510" x2="1000" y2="510" />
                    <line x1="250" y1="0" x2="250" y2="680" />
                    <line x1="500" y1="0" x2="500" y2="680" />
                    <line x1="750" y1="0" x2="750" y2="680" />
                  </g>

                  {/* Vienna Core Glow */}
                  <circle cx="550" cy="360" r="230" fill="url(#viennaMapGlow)" pointerEvents="none" />

                  {/* Europe Landmass Outlines */}
                  <g fill="#0b313d" stroke="#1c5d73" strokeWidth="1.2" opacity="0.65">
                    {/* UK & Ireland */}
                    <path d="M 280 180 L 315 155 L 335 200 L 350 245 L 310 265 L 280 235 Z" />
                    {/* Scandinavia */}
                    <path d="M 485 50 L 575 35 L 620 145 L 535 175 L 495 160 Z" />
                    {/* Iberian Peninsula */}
                    <path d="M 145 425 L 325 435 L 305 525 L 260 550 L 185 535 L 140 500 Z" />
                    {/* France */}
                    <path d="M 285 405 L 255 350 L 260 285 L 330 255 L 420 290 L 425 345 L 390 415 Z" />
                    {/* Germany */}
                    <path d="M 435 220 L 515 205 L 530 280 L 525 345 L 445 350 L 420 290 Z" />
                    {/* Austria */}
                    <path d="M 480 355 L 585 340 L 595 375 L 565 395 L 510 395 L 475 380 Z" />
                    {/* Italy */}
                    <path d="M 425 380 L 545 405 L 565 490 L 600 505 L 585 530 L 535 520 L 505 460 Z" />
                    {/* Balkans & Greece */}
                    <path d="M 550 405 L 665 395 L 755 410 L 760 480 L 735 540 L 685 545 L 565 420 Z" />
                    {/* Poland & Eastern Hub */}
                    <path d="M 515 205 L 640 195 L 660 280 L 585 340 L 530 280 Z" />
                  </g>

                  {/* Flight & Legal Support Corridors linking clusters to Vienna and Tehran */}
                  <path
                    d="M 550 360 Q 512 315 475 275"
                    stroke="#f5a623"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    fill="none"
                    opacity="0.8"
                  />
                  <path
                    d="M 550 360 Q 625 450 705 535"
                    stroke="#f5a623"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    fill="none"
                    opacity="0.8"
                  />
                  <path
                    d="M 550 360 Q 380 420 235 485"
                    stroke="#38bdf8"
                    strokeWidth="1.8"
                    strokeDasharray="4,4"
                    fill="none"
                    opacity="0.7"
                  />
                  <path
                    d="M 550 360 Q 450 355 360 350"
                    stroke="#a855f7"
                    strokeWidth="1.8"
                    strokeDasharray="4,4"
                    fill="none"
                    opacity="0.7"
                  />

                  {/* Pulsating Cluster Nodes */}
                  {CLUSTERS.map((c) => {
                    const isSelected = c.id === selectedClusterId;
                    const { x, y } = c.coords;
                    // Size proportional to case volume (from 16px to 32px)
                    const radius = Math.min(34, Math.max(18, Math.round(c.casesCount / 28)));

                    return (
                      <g
                        key={c.id}
                        onClick={() => setSelectedClusterId(c.id)}
                        className="cursor-pointer group"
                      >
                        {/* Radar Pulse */}
                        {isSelected && (
                          <>
                            <circle cx={x} cy={y} r={radius * 1.8} fill={c.accentColor} opacity="0.2">
                              <animate attributeName="r" values={`${radius};${radius * 2.2};${radius}`} dur="2.4s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.35;0.05;0.35" dur="2.4s" repeatCount="indefinite" />
                            </circle>
                            <circle cx={x} cy={y} r={radius * 1.3} fill={c.accentColor} opacity="0.3" />
                          </>
                        )}

                        {/* Cluster Base Node */}
                        <circle
                          cx={x}
                          cy={y}
                          r={radius}
                          fill={isSelected ? c.accentColor : '#092d3b'}
                          stroke={isSelected ? '#ffffff' : c.accentColor}
                          strokeWidth={isSelected ? '3.5' : '2'}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />

                        {/* Case Count Inside Cluster Circle */}
                        <text
                          x={x}
                          y={y + 4}
                          textAnchor="middle"
                          fill={isSelected ? '#082833' : '#ffffff'}
                          fontSize={radius > 22 ? '11' : '9'}
                          fontWeight="900"
                          fontFamily="Vazirmatn, sans-serif"
                        >
                          +{c.casesCount}
                        </text>

                        {/* Label Badge Above Node */}
                        <g transform={`translate(${x}, ${y - radius - 14})`}>
                          <rect
                            x="-50"
                            y="-11"
                            width="100"
                            height="22"
                            rx="11"
                            fill={isSelected ? '#082833' : '#07242d'}
                            stroke={isSelected ? c.accentColor : 'rgba(255,255,255,0.25)'}
                            strokeWidth={isSelected ? '2' : '1'}
                            className="filter drop-shadow-md"
                          />
                          <text
                            x="0"
                            y="4"
                            textAnchor="middle"
                            fill={isSelected ? c.accentColor : '#ffffff'}
                            fontSize="11"
                            fontWeight="bold"
                            fontFamily="Vazirmatn, sans-serif"
                          >
                            {c.flag} {c.nameFa.split(' ')[1] || c.nameFa}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}

            {/* TAB 2: Recharts Analytics View */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
                    <BarChart3 className="h-4 w-4" />
                    <span>توزیع حجم ویزاهای صادره در هر کلاستر (تعداد پرونده‌ها)</span>
                  </h4>
                  <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1c4756" opacity={0.4} />
                        <XAxis
                          dataKey="name"
                          stroke="#94a3b8"
                          fontSize={11}
                          tickLine={false}
                          interval={0}
                          tick={{ fill: '#cbd5e1' }}
                        />
                        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="rounded-xl border border-white/20 bg-[#082833] p-3 text-xs shadow-xl text-right">
                                  <p className="font-bold text-amber-300">{data.fullName}</p>
                                  <p className="mt-1 text-white">تعداد پرونده‌ها: <strong className="text-amber-400">+{toPersianDigits(data.cases)}</strong></p>
                                  <p className="text-emerald-400">نرخ قبولی: <strong>{toPersianDigits(data.rate)}٪</strong></p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="cases" radius={[8, 8, 0, 0]}>
                          {barChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              opacity={entry.fullName === selectedCluster.nameFa ? 1 : 0.65}
                              cursor="pointer"
                              onClick={() => {
                                const matched = CLUSTERS.find((c) => c.nameFa === entry.fullName);
                                if (matched) setSelectedClusterId(matched.id);
                              }}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Overall program distribution pie */}
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-xs font-bold text-sky-300 mb-2 flex items-center gap-1.5">
                    <PieIcon className="h-4 w-4" />
                    <span>سهم کلی برنامه‌های مهاجرتی در سبد پرونده‌های دیاکو</span>
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4 items-center">
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={aggregateProgramStats}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={65}
                            innerRadius={35}
                            paddingAngle={3}
                          >
                            {aggregateProgramStats.map((entry, index) => (
                              <Cell key={`pie-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="rounded-xl border border-white/20 bg-[#082833] p-2.5 text-xs shadow-xl text-right">
                                    <p className="font-bold text-white">{data.name}</p>
                                    <p className="text-amber-300 mt-0.5">+{toPersianDigits(data.value)} پرونده</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-2 text-xs">
                      {aggregateProgramStats.map((item) => (
                        <div key={item.name} className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-slate-300">{item.name}</span>
                          </div>
                          <span className="font-bold text-white">+{toPersianDigits(item.value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Yearly Growth Area Chart */}
            {activeTab === 'growth' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  <span>روند رشد پرونده‌های موفق در {selectedCluster.nameFa} (۲۰۲۱–۲۰۲۶)</span>
                </h4>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedCluster.yearlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                      <defs>
                        <linearGradient id="growthAreaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={selectedCluster.accentColor} stopOpacity={0.6} />
                          <stop offset="95%" stopColor={selectedCluster.accentColor} stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1c4756" opacity={0.4} />
                      <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} tick={{ fill: '#cbd5e1' }} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="rounded-xl border border-white/20 bg-[#082833] p-3 text-xs shadow-xl text-right">
                                <p className="font-bold text-amber-300">سال {data.year}</p>
                                <p className="mt-1 text-white">مجموع پرونده‌های موفق: <strong className="text-emerald-400">+{toPersianDigits(data.cases)}</strong></p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="cases"
                        stroke={selectedCluster.accentColor}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#growthAreaGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[11px] text-slate-300 leading-6 text-justify">
                  نرخ تصاعدی موفقیت پرونده‌های این کلاستر ناشی از تثبیت ارتباطات مستقیم با دوایر دولتی، تجربه کارشناسان در روزنه‌های سهمیه و کاهش خطاهای پرونده‌سازی به زیر ۰.۵ درصد است.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Detailed Selected Cluster Dossier */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-gradient-to-br from-[#08222b] via-[#0b2f3d] to-[#07242e] p-6 shadow-2xl relative overflow-hidden">
            {/* Header of Dossier */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300">
                  {selectedCluster.regionFa}
                </span>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-4xl">{selectedCluster.flag}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {selectedCluster.nameFa}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {selectedCluster.nameEn}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <span className="block text-3xl font-black text-[#f5a623]">
                  +{toPersianDigits(selectedCluster.casesCount)}
                </span>
                <span className="block text-[10px] text-slate-300">ویزای صادرشده</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                <span className="text-[11px] text-slate-300">نرخ قبولی نهایی:</span>
                <p className="mt-1 text-xl font-black text-emerald-400">
                  {toPersianDigits(selectedCluster.approvalRate)}٪
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                <span className="text-[11px] text-slate-300">میانگین زمان صدور:</span>
                <p className="mt-1 text-xl font-black text-white">
                  {toPersianDigits(selectedCluster.avgMonths)} ماه
                </p>
              </div>
            </div>

            {/* Official Legal Office */}
            {selectedCluster.office && (
              <div className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-3.5 text-xs text-amber-200">
                <p className="font-bold flex items-center gap-1.5 text-amber-300">
                  <Building2 className="h-4 w-4" />
                  <span>حضور مستقیم حقوقی دیاکو در منطقه:</span>
                </p>
                <p className="mt-1 leading-5 text-slate-200">{selectedCluster.office}</p>
              </div>
            )}

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-slate-200 leading-6 text-justify">
              {selectedCluster.description}
            </p>

            {/* City Distribution */}
            <div className="mt-4">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
                <MapPin className="h-3.5 w-3.5 text-[#f5a623]" />
                <span>شهرهای اصلی صدور اقامت:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCluster.topCities.map((city) => (
                  <span
                    key={city}
                    className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200 font-medium"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Program Breakdown of the Cluster */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
                <Layers className="h-3.5 w-3.5 text-sky-400" />
                <span>ترکیب پرونده‌های این کلاستر:</span>
              </span>
              <div className="space-y-2">
                {selectedCluster.breakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-200">{item.name}</span>
                    </div>
                    <span className="font-bold text-[#f5a623]">+{toPersianDigits(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Sample Cases */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2.5">
                <Award className="h-3.5 w-3.5 text-emerald-400" />
                <span>آخرین تاییدیه‌های صادره در این کلاستر:</span>
              </span>
              <div className="space-y-2">
                {selectedCluster.sampleCases.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">{c.title}</p>
                      <span className="text-[10px] text-slate-400">کد پرونده: {c.id} | سال {c.year}</span>
                    </div>
                    <span className="rounded-lg bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      {c.program}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#f5a623] to-[#e09210] px-4 py-3 text-xs sm:text-sm font-black text-[#082833] shadow-lg hover:brightness-105 transition cursor-pointer"
              >
                <span>ارزیابی شانس پرونده در این کلاستر</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {onNavigateToPage && (
                <button
                  type="button"
                  onClick={() => onNavigateToPage(selectedCluster.targetPage)}
                  className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition cursor-pointer"
                >
                  راهنمای حقوقی
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseSuccessMap;
