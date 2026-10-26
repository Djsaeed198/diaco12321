import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2, Clock, ArrowRight, ArrowLeft, ChevronDown,
  PhoneCall, Check, Copy, Sparkles, Rocket, ShieldCheck,
  Building2, Landmark, FileText, Scale, Banknote, Users,
  TrendingUp, AlertTriangle, BookOpen, MapPin, ExternalLink,
  Calculator, Briefcase, Percent, Globe, Info, Quote,
  Calendar, Euro, Landmark as LandmarkIcon
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ============================================================
   1. 常量与数据
   ============================================================ */
const BRAND = {
  name: 'هلدینگ مهاجرتی دیاکو',
  nameEn: 'Diaco Immigration Holding',
  origin: 'https://www.dia-co.ir',
  logo: 'https://www.dia-co.ir/logo.png',
  phone: '+43 688 976 3256',
  email: 'office@dia-co.ir',
} as const;

const CANONICAL_URL = `${BRAND.origin}/guides/company-austria-gmbh`;

/* ---------- 公司形式对比 ---------- */
const COMPANY_TYPES = [
  {
    id: 'gmbh',
    name: 'GmbH (Gesellschaft mit beschränkter Haftung)',
    shortName: 'GmbH',
    minCapital: '€10,000',
    minPaidIn: '€5,000',
    liability: 'محدود به سرمایه شرکت',
    description: 'رایج‌ترین شکل شرکت در اتریش برای کسب‌وکارهای کوچک و متوسط. ساختار حقوقی شناخته‌شده و قابل اعتماد برای شرکای تجاری بین‌المللی.',
    icon: Building2,
    highlights: [
      'حداقل سرمایه قانونی: €10,000',
      'حداقل ۵۰٪ (€۵,۰۰۰) باید در زمان ثبت واریز شود',
      'مسئولیت محدود سهامداران',
      'نیاز به سند رسمی محضری (Notariatsakt)',
    ],
  },
  {
    id: 'flexco',
    name: 'FlexCo (Flexible Kapitalgesellschaft)',
    shortName: 'FlexCo',
    minCapital: '€10,000',
    minPaidIn: '€5,000',
    liability: 'محدود به سرمایه شرکت',
    description: 'شکل جدید شرکت (از ۲۰۲۴) که برای استارتاپ‌ها و کسب‌وکارهای نوآور طراحی شده. انعطاف‌پذیری بیشتر در ساختار سهام و مشارکت کارکنان.',
    icon: Rocket,
    highlights: [
      'حداقل سرمایه: €10,000 (مانند GmbH)',
      'حداقل سهم هر شریک: فقط €۱ (در GmbH: €۷۰)',
      'امکان مشارکت کارکنان از طریق "Unternehmenswert-Anteile"',
      'تصمیم‌گیری از طریق رأی‌گیری کتبی (Umlaufbeschlüsse)',
    ],
  },
];

/* ---------- 税务数据 ---------- */
const TAX_FACTS = [
  { label: 'مالیات بر درآمد شرکت (Körperschaftsteuer)', value: '23%', icon: Percent, note: 'نرخ ثابت برای همه سطوح درآمد' },
  { label: 'حداقل مالیات سالانه', value: '€500', icon: Banknote, note: 'معادل €۱۲۵ در هر فصل (حتی با زیان)' },
  { label: 'مالیات بر توزیع سود (Kapitalertragsteuer)', value: '27.5%', icon: TrendingUp, note: 'برای سهامداران حقیقی' },
  { label: 'بار مالیاتی ترکیبی (سود + توزیع)', value: '≈44.2%', icon: Calculator, note: '23% + 27.5% روی مبلغ توزیع‌شده' },
];

/* ---------- 流程步骤 ---------- */
const STEPS = [
  { step: '۱', title: 'مشاوره و انتخاب شکل حقوقی', desc: 'تعیین GmbH یا FlexCo بر اساس اهداف تجاری، ساختار سهام و برنامه رشد.', icon: Scale },
  { step: '۲', title: 'آماده‌سازی اساسنامه (Gesellschaftsvertrag)', desc: 'تنظیم اساسنامه با جزئیات سهام، مدیریت و اهداف شرکت.', icon: FileText },
  { step: '۳', title: 'تنظیم سند محضری (Notariatsakt)', desc: 'حضور در دفتر اسناد رسمی برای تأیید اساسنامه و امضای سهامداران.', icon: Landmark },
  { step: '۴', title: 'افتتاح حساب بانکی و واریز سرمایه', desc: 'واریز حداقل ۵۰٪ سرمایه (€۵,۰۰۰) و دریافت گواهی بانکی.', icon: Banknote },
  { step: '۵', title: 'ثبت در دادگاه تجاری (Firmenbuch)', desc: 'ثبت شرکت در اداره ثبت شرکت‌های تجاری وین.', icon: Building2 },
  { step: '۶', title: 'عضویت در اتاق بازرگانی (WKO)', desc: 'ثبت‌نام اجباری در Wirtschaftskammer Österreich.', icon: Users },
  { step: '۷', title: 'اخذ مجوزهای تجاری (Gewerbeberechtigung)', desc: 'در صورت نیاز، دریافت مجوز برای فعالیت خاص.', icon: ShieldCheck },
  { step: '۸', title: 'ثبت‌نام مالیاتی (Finanzamt)', desc: 'دریافت شماره مالیاتی (Steuernummer) و ثبت برای مالیات بر ارزش افزوده (USt).', icon: Calculator },
];

/* ---------- 成本明细 ---------- */
const COSTS = [
  { item: 'سرمایه شرکت (Stammkapital)', amount: '€10,000', note: 'حداقل ۵۰٪ (€۵,۰۰۰) نقدی' },
  { item: 'هزینه اسناد رسمی (Notar)', amount: '€1,000 – €2,500', note: 'بسته به پیچیدگی اساسنامه' },
  { item: 'ثبت در دادگاه تجاری', amount: '€150 – €400', note: 'هزینه رسمی ثبت' },
  { item: 'مشاوره حقوقی و مالی', amount: '€1,500 – €3,000', note: 'برای راه‌اندازی استاندارد' },
  { item: 'ترجمه و تأیید مدارک', amount: '€200 – €500', note: 'برای مدارک غیر آلمانی' },
  { item: 'هزینه‌های جانبی', amount: '€300 – €800', note: 'تمبر، نامه‌نگاری، تأییدات' },
];

/* ---------- FAQ ---------- */
const FAQS = [
  {
    q: 'آیا برای ثبت شرکت در اتریش باید حتماً حضوری اقدام کنم؟',
    a: 'برای امضای سند محضری (Notariatsakt)، حضور فیزیکی یا وکالت رسمی به شخصی در اتریش الزامی است. با وکالت‌نامه رسمی (Vollmacht)، وکیل مقیم می‌تواند به نمایندگی از شما در دفتر اسناد رسمی حضور یابد. دفتر وین دیاکو این فرآیند را به‌طور کامل مدیریت می‌کند.',
  },
  {
    q: 'حداقل سرمایه برای ثبت GmbH یا FlexCo چقدر است؟',
    a: 'برای هر دو شکل، حداقل سرمایه قانونی €10,000 است. در زمان ثبت، حداقل ۵۰٪ (€۵,۰۰۰) باید به حساب بانکی شرکت واریز شود. برای FlexCo، حداقل سهم هر شریک تنها €۱ است (در GmbH: €۷۰).',
  },
  {
    q: 'چگونه می‌توانم از طریق ثبت شرکت، اقامت اتریش بگیرم؟',
    a: 'دو مسیر اصلی وجود دارد: ۱) RWR Card برای "کارگران کلیدی خوداشتغال" (Selbständige Schlüsselkräfte) با حداقل €100,000 سرمایه‌گذاری یا ایجاد شغل. ۲) RWR Card برای "بنیان‌گذاران استارتاپ" (Start-up-Gründer) با حداقل €30,000 سرمایه و ۵۰٪ سهام. هر دو مسیر نیازمند بیزینس‌پلن قوی و تأییدیه AMS هستند.',
  },
  {
    q: 'مالیات شرکت در اتریش چقدر است؟',
    a: 'مالیات بر درآمد شرکت (Körperschaftsteuer) ۲۳٪ است. حداقل مالیات سالانه €۵۰۰ (€۱۲۵ در هر فصل) است، حتی اگر شرکت زیان‌ده باشد. هنگام توزیع سود به سهامداران حقیقی، ۲۷.۵٪ مالیات بر توزیع سود (Kapitalertragsteuer) نیز اعمال می‌شود.',
  },
  {
    q: 'آیا می‌توانم شرکتی با یک نفر (Ein-Personen-GmbH) ثبت کنم؟',
    a: 'بله، ثبت شرکت با یک سهامدار (Ein-Personen-GmbH) مجاز است. در این حالت، حداقل سرمایه €10,000 و حداقل واریز نقدی €5,000 است. برای FlexCo نیز همین شرایط وجود دارد.',
  },
  {
    q: 'چقدر طول می‌کشد تا شرکت در اتریش ثبت شود؟',
    a: 'با آماده‌سازی کامل مدارک و هماهنگی وکیل مقیم، فرآیند ثبت معمولاً بین ۲ تا ۴ هفته طول می‌کشد. این زمان شامل تنظیم سند محضری، واریز سرمایه و ثبت در دادگاه تجاری است.',
  },
];

/* ---------- 内部链接 ---------- */
const INTERNAL_LINKS = [
  { href: '/guides/austria-rwr-card-2026-reforms', title: 'کارت RWR اتریش', desc: 'راهنمای کامل اقامت کاری', icon: Briefcase },
  { href: '/guides/austria-quotenkontingent-2026', title: 'تمکن مالی اتریش', desc: 'اقامت بدون کار', icon: LandmarkIcon },
  { href: '/guides/austria-jobseeker-70-points-2026', title: 'ویزای جستجوی کار', desc: '۷۰ امتیاز نخبگان', icon: Rocket },
  { href: '/guides/eu-blue-card-reform-2026', title: 'بلوکارت اروپا', desc: 'تحرک بین ۲۷ کشور', icon: Globe },
];

/* ============================================================
   2. 结构化数据 (Schema.org)
   ============================================================ */
const generateSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.dia-co.ir/#organization',
      name: 'هلدینگ مهاجرتی دیاکو',
      url: 'https://www.dia-co.ir',
      logo: 'https://www.dia-co.ir/logo.png',
      sameAs: ['https://www.linkedin.com/company/diaco-holding'],
    },
    {
      '@type': 'Article',
      '@id': `${CANONICAL_URL}#article`,
      headline: 'ثبت شرکت در اتریش ۲۰۲۶ | راهنمای کامل GmbH و FlexCo + اقامت سرمایه‌گذاری',
      description: 'راهنمای جامع ثبت شرکت در اتریش ۲۰۲۶: حداقل سرمایه €۱۰,۰۰۰، مراحل ثبت GmbH و FlexCo، مالیات ۲۳٪، و مسیرهای اخذ اقامت از طریق سرمایه‌گذاری (€۱۰۰,۰۰۰) یا استارتاپ (€۳۰,۰۰۰).',
      image: {
        '@type': 'ImageObject',
        url: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 675,
        caption: 'ثبت شرکت در اتریش — وین',
      },
      author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
      publisher: { '@id': 'https://www.dia-co.ir/#organization' },
      datePublished: '2026-01-01',
      dateModified: '2026-10-25',
      mainEntityOfPage: CANONICAL_URL,
      inLanguage: 'fa-IR',
      about: [
        { '@type': 'Thing', name: 'ثبت شرکت در اتریش' },
        { '@type': 'Thing', name: 'GmbH' },
        { '@type': 'Thing', name: 'FlexCo' },
        { '@type': 'Thing', name: 'RWR Card' },
        { '@type': 'Thing', name: 'اقامت سرمایه‌گذاری' },
      ],
      keywords: 'ثبت شرکت اتریش, GmbH, FlexCo, RWR Card, اقامت سرمایه‌گذاری, وین',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.speakable-summary', '.speakable-fact'],
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${CANONICAL_URL}#howto`,
      name: 'مراحل ثبت شرکت در اتریش (GmbH / FlexCo)',
      description: 'فرآیند گام‌به‌گام ثبت شرکت در اتریش از انتخاب شکل حقوقی تا ثبت مالیاتی.',
      totalTime: 'P4W',
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: '10000' },
      step: STEPS.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.title,
        text: s.desc,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${CANONICAL_URL}#faq`,
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${CANONICAL_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://www.dia-co.ir' },
        { '@type': 'ListItem', position: 2, name: 'خدمات', item: 'https://www.dia-co.ir/services' },
        { '@type': 'ListItem', position: 3, name: 'ثبت شرکت اتریش', item: CANONICAL_URL },
      ],
    },
  ],
});

/* ============================================================
   3. 主组件
   ============================================================ */
export const BusinessAustriaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'gmbh' | 'flexco'>('gmbh');
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useSeo({
    title: 'ثبت شرکت در اتریش ۲۰۲۶ | GmbH و FlexCo + اقامت سرمایه‌گذاری',
    description: 'راهنمای کامل ثبت شرکت در اتریش ۲۰۲۶: حداقل سرمایه €۱۰,۰۰۰، مراحل ثبت GmbH و FlexCo، مالیات ۲۳٪، و مسیرهای اخذ اقامت از طریق سرمایه‌گذاری (€۱۰۰,۰۰۰) یا استارتاپ (€۳۰,۰۰۰).',
    canonical: '/guides/company-austria-gmbh',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    keywords: ['ثبت شرکت اتریش ۲۰۲۶', 'GmbH اتریش', 'FlexCo اتریش', 'اقامت سرمایه‌گذاری وین', 'RWR Card سرمایه‌گذاری', 'مالیات شرکت اتریش ۲۳٪'],
    jsonLd: generateSchema(),
  });

  /* ---------- 阅读进度条 ---------- */
  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setReadingProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyPhone = () => {
    navigator.clipboard.writeText(BRAND.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCompany = COMPANY_TYPES.find((c) => c.id === activeTab) || COMPANY_TYPES[0];

  return (
    <div dir="rtl" className="min-h-screen bg-[#061a21] text-slate-100 font-sans">
      {/* 阅读进度条 */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/20">
        <div
          className="h-full bg-gradient-to-l from-orange-400 to-amber-500 transition-[width] duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* ===== 面包屑 ===== */}
      <div className="container mx-auto px-4 md:px-8 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 transition"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به خدمات دیاکو
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>خدمات</span>
            <span>/</span>
            <span>ثبت شرکت</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">اتریش</span>
          </div>
        </div>
      </div>

      <article ref={articleRef}>
        {/* ============================================================
            SECTION 1: HERO
           ============================================================ */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#082833] via-[#061a21] to-[#041217] pt-8 pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-black text-amber-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  ثبت شرکت معتبر اروپایی با نظارت وکلای وین
                </span>

                <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  ثبت شرکت در اتریش ۲۰۲۶{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-orange-400">
                    (GmbH / FlexCo)
                  </span>
                </h1>

                <div className="speakable-summary mt-4 rounded-2xl bg-[#0e2a35] border border-amber-500/30 p-4 text-sm leading-7 text-slate-200">
                  <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                    <Info className="h-4 w-4" />
                    خلاصه شفاف ۲۰۲۶:
                  </div>
                  حداقل سرمایه ثبت شرکت در اتریش برای هر دو شکل GmbH و FlexCo{' '}
                  <strong className="text-amber-300">€۱۰,۰۰۰</strong> است که{' '}
                  <strong className="text-amber-300">€۵,۰۰۰</strong> آن باید در زمان ثبت واریز شود. مالیات شرکت{' '}
                  <strong className="text-amber-300">۲۳٪</strong> با حداقل پرداخت سالانه{' '}
                  <strong className="text-amber-300">€۵۰۰</strong> است. برای اخذ اقامت از طریق سرمایه‌گذاری، حداقل{' '}
                  <strong className="text-amber-300">€۱۰۰,۰۰۰</strong> سرمایه در مسیر «کارگر کلیدی خوداشتغال» یا{' '}
                  <strong className="text-amber-300">€۳۰,۰۰۰</strong> در مسیر «بنیان‌گذار استارتاپ» نیاز است.
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={onOpenAssessment}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg shadow-amber-500/20 transition hover:scale-[1.02] cursor-pointer"
                  >
                    <Building2 className="h-4 w-4" />
                    محاسبه هزینه‌های ثبت شرکت
                  </button>
                  <button
                    type="button"
                    onClick={copyPhone}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 cursor-pointer"
                  >
                    <PhoneCall className="h-4 w-4 text-amber-400" />
                    دفتر وین: {BRAND.phone}
                    {copied && <span className="text-emerald-400 text-xs">✓</span>}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <figure className="relative mx-auto aspect-[16/9] w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=80"
                    srcSet="https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=80 1000w"
                    sizes="(max-width: 768px) 100vw, 500px"
                    alt="منطقه تجاری و مالی شهر وین اتریش — ثبت شرکت GmbH"
                    loading="eager"
                    fetchPriority="high"
                    width={1000}
                    height={563}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    itemProp="image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent opacity-80" />
                  <figcaption className="absolute bottom-3 right-3 left-3 rounded-xl bg-black/60 px-3 py-2 text-[11px] text-slate-300 backdrop-blur-sm">
                    دفتر وین دیاکو — همراهی از ثبت شرکت تا اخذ اقامت
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* 关键数据卡片 */}
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { value: '€۱۰,۰۰۰', label: 'حداقل سرمایه', icon: Banknote },
                { value: '€۵,۰۰۰', label: 'حداقل واریز نقدی', icon: Calculator },
                { value: '۲۳٪', label: 'مالیات شرکت', icon: Percent },
                { value: '€۱۰۰k', label: 'آستانه اقامت سرمایه‌گذاری', icon: LandmarkIcon },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                  <item.icon className="mx-auto h-5 w-5 text-amber-400" />
                  <div className="mt-2 text-lg font-black text-white">{item.value}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: 公司形式对比
           ============================================================ */}
        <section className="py-14 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <Scale className="h-6 w-6 text-amber-400" />
              کدام شکل حقوقی برای شما مناسب است؟
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              GmbH یا FlexCo — تفاوت‌ها را بشناسید و انتخاب درست داشته باشید.
            </p>

            {/* Tabs */}
            <div className="flex gap-2 mb-6" role="tablist">
              {COMPANY_TYPES.map((type) => (
                <button
                  key={type.id}
                  role="tab"
                  aria-selected={activeTab === type.id}
                  onClick={() => setActiveTab(type.id as 'gmbh' | 'flexco')}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                    activeTab === type.id
                      ? 'bg-amber-400 text-[#082833] shadow-md'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <type.icon className="h-4 w-4" />
                  {type.shortName}
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="flex items-start gap-3 mb-4">
                <activeCompany.icon className="h-6 w-6 text-amber-400 shrink-0" />
                <div>
                  <h3 className="text-lg font-black text-white">{activeCompany.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">{activeCompany.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-[10px] text-slate-400">حداقل سرمایه</div>
                  <div className="text-lg font-black text-amber-300 mt-0.5">{activeCompany.minCapital}</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-[10px] text-slate-400">حداقل واریز نقدی</div>
                  <div className="text-lg font-black text-emerald-300 mt-0.5">{activeCompany.minPaidIn}</div>
                </div>
              </div>

              <ul className="space-y-2">
                {activeCompany.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-6 text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: 税务概览
           ============================================================ */}
        <section className="py-14 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <Percent className="h-6 w-6 text-amber-400" />
              مالیات شرکت در اتریش: چه چیزی باید بدانید؟
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              نرخ مالیات و بار مالیاتی مؤثر برای یک شرکت با مسئولیت محدود.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {TAX_FACTS.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3">
                  <fact.icon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{fact.label}</span>
                      <span className="text-lg font-black text-white speakable-fact">{fact.value}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{fact.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/5 p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-200/90 leading-6">
                <strong className="text-amber-300">نکته کلیدی:</strong> حداقل مالیات سالانه €۵۰۰ حتی در صورت زیان‌دهی شرکت نیز اعمال می‌شود، اما این مبلغ قابل انتقال به سال‌های آینده و کسر از مالیات‌های بعدی است. برای سهامداران حقیقی، مالیات ۲۷.۵٪ بر توزیع سود نیز اضافه می‌شود که بار مالیاتی ترکیبی را به حدود ۴۴.۲٪ می‌رساند.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4: 注册步骤
           ============================================================ */}
        <section className="py-14 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <FileText className="h-6 w-6 text-amber-400" />
              مراحل ثبت شرکت در اتریش (۸ گام)
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              از انتخاب شکل حقوقی تا ثبت مالیاتی — با راهنمایی دفتر وین دیاکو.
            </p>

            <div className="space-y-3">
              {STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-amber-400 text-[#082833] grid place-items-center font-black text-sm">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <step.icon className="h-4 w-4 text-amber-400" />
                      <h3 className="text-sm font-black text-white">{step.title}</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-6">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: 成本明细
           ============================================================ */}
        <section className="py-14 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-amber-400" />
              هزینه‌های ثبت شرکت در اتریش (۲۰۲۶)
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              برآورد شفاف از هزینه‌های ثبت GmbH یا FlexCo.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-right text-xs">
                <caption className="sr-only">هزینه‌های ثبت شرکت در اتریش ۲۰۲۶</caption>
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-slate-300">
                    <th className="p-3 font-bold">آیتم</th>
                    <th className="p-3 font-bold">مبلغ</th>
                    <th className="p-3 font-bold">توضیحات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {COSTS.map((c) => (
                    <tr key={c.item} className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-white">{c.item}</td>
                      <td className="p-3 font-black text-amber-300">{c.amount}</td>
                      <td className="p-3 text-slate-400">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              * هزینه‌های فوق تقریبی هستند و بسته به پیچیدگی پرونده و خدمات درخواستی متفاوت‌اند. هزینه‌های دولتی (ثبت، مجوز) معمولاً بین €۵۰۰ تا €۱,۰۰۰ است.
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: 通过公司获取居留
           ============================================================ */}
        <section className="py-14 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-amber-400" />
              از ثبت شرکت تا اقامت اتریش
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              دو مسیر اصلی برای تبدیل شرکت به اقامت قانونی.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Path 1 */}
              <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <LandmarkIcon className="h-5 w-5 text-amber-400" />
                  <h3 className="text-sm font-black text-white">RWR Card برای کارگران کلیدی خوداشتغال</h3>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>حداقل <strong className="text-white">€۱۰۰,۰۰۰</strong> سرمایه‌گذاری پایدار در اتریش</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>یا ایجاد شغل (حداقل ۵ موقعیت شغلی) / انتقال دانش فنی</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>بدون سیستم امتیازبندی — ارزیابی توسط AMS</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>پس از ۵ سال: اقامت دائم EU</span>
                  </li>
                </ul>
              </div>

              {/* Path 2 */}
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-sm font-black text-white">RWR Card برای بنیان‌گذاران استارتاپ</h3>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>حداقل <strong className="text-white">€۳۰,۰۰۰</strong> سرمایه (طبق sources) / ۵۰٪ سهام</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>حداقل ۵۰ امتیاز از سیستم امتیازبندی</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>بیزینس‌پلن نوآورانه با تأییدیه AWS</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-1 shrink-0" />
                    <span>پس از ۲ سال: RWR Plus (۳ ساله)</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4">
              * آستانه سرمایه برای مسیر استارتاپ در منابع مختلف بین €۳۰,۰۰۰ تا €۵۰,۰۰۰ ذکر شده است. برای اطلاعات دقیق ۲۰۲۶ با دفتر وین دیاکو تماس بگیرید.
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 7: 内部链接
           ============================================================ */}
        <section className="py-14 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-amber-400" />
              راهنماهای مرتبط
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {INTERNAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-amber-400/40 hover:bg-white/[0.05]"
                >
                  <link.icon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition">{link.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{link.desc}</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-slate-500 group-hover:text-amber-400 shrink-0 mt-1 ml-auto transition" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 8: FAQ
           ============================================================ */}
        <section className="py-14 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-2xl font-black text-white mb-6 text-center flex items-center justify-center gap-2">
              <Info className="h-6 w-6 text-amber-400" />
              پرسش‌های متداول ثبت شرکت در اتریش
            </h2>

            <div className="space-y-2.5">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between p-4 text-right text-xs sm:text-sm font-bold text-white hover:text-amber-300 transition cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs leading-7 text-slate-300 border-t border-white/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 9: YMYL Disclaimer
           ============================================================ */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/5 p-4 flex items-start gap-3">
              <Scale className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] text-amber-200/90 leading-6">
                <p className="font-bold text-amber-300 mb-1">سلب مسئولیت حقوقی (YMYL)</p>
                <p>
                  اطلاعات این صفحه صرفاً جهت اطلاع‌رسانی است و <strong>جایگزین مشاوره حقوقی یا مالیاتی رسمی نیست</strong>. تصمیم نهایی در مورد ثبت شرکت و اخذ اقامت بر عهده مقامات ذیصلاح اتریش (Firmenbuch، MA35، AMS، Finanzamt) است. قوانین و رویه‌ها در سال ۲۰۲۶ ممکن است تغییر کرده باشند؛ پیش از هر اقدام، اطلاعات را از منابع رسمی تأیید کنید.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 10: FINAL CTA
           ============================================================ */}
        <section className="pb-16">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-transparent to-transparent p-8 text-center">
              <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-3" />
              <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                آماده ثبت شرکت در اتریش هستید؟
              </h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-6">
                دفتر وین دیاکو از انتخاب شکل حقوقی تا اخذ اقامت، در تمام مراحل کنار شماست. ارزیابی رایگان پرونده خود را همین حالا شروع کنید.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3 text-sm font-black text-[#082833] shadow-lg transition hover:scale-105 cursor-pointer"
                >
                  ارزیابی رایگان پرونده
                </button>
                <a
                  href={`tel:${BRAND.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4 text-emerald-400" />
                  تماس با دفتر وین
                </a>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default BusinessAustriaPage;