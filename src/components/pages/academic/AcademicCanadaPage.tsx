import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2, Clock, ArrowRight, ChevronDown, PhoneCall,
  Sparkles, GraduationCap, Building2, Euro, FileCheck2,
  Users, Calculator, TrendingUp, Globe, AlertTriangle, BookOpen,
  MapPin, Briefcase, Languages, Plane, Home, HeartPulse, FileText,
  Landmark, Timer, Coffee, Wrench, ShieldCheck, Banknote,
  CalendarDays, Scale, Quote, Info, ExternalLink, Award,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ============================================================
   1. ثابت‌ها
   ============================================================ */
const BRAND = {
  name: 'هلدینگ مهاجرتی دیاکو',
  origin: 'https://www.dia-co.ir',
  phone: '+43 688 976 3256',
  phoneDisplay: '+۴۳ ۶۸۸ ۹۷۶ ۳۲۵۶',
} as const;

const CANONICAL_URL = `${BRAND.origin}/guides/academic-canada`;

/* ============================================================
   2. داده‌های رسمی 2026
   ============================================================ */
const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1517935703635-27c94645a452?auto=format&fit=crop&w=1600&q=80',
  srcSet:
    'https://images.unsplash.com/photo-1517935703635-27c94645a452?auto=format&fit=crop&w=800&q=75 800w, ' +
    'https://images.unsplash.com/photo-1517935703635-27c94645a452?auto=format&fit=crop&w=1200&q=75 1200w, ' +
    'https://images.unsplash.com/photo-1517935703635-27c94645a452?auto=format&fit=crop&w=1600&q=80 1600w',
  alt: 'تحصیل در کانادا ۲۰۲۶ — دانشگاه تورنتو و ونکوور، استادی پرمیت',
  width: 1600,
  height: 900,
};

const KEY_FACTS = [
  { value: '۴۰۸,۰۰۰', label: 'سقف کل学签 ۲۰۲۶', color: 'text-amber-300' },
  { value: '۱۸۰,۰۰۰', label: '学签 با PAL (本科/学院)', color: 'text-red-300' },
  { value: 'CAD ۲۳,۴۴۸', label: 'تمکن مالی سالانه (مجرد)', color: 'text-emerald-400' },
  { value: '۲۴ ساعت', label: 'کار دانشجویی/هفته', color: 'text-sky-300' },
];

const PAL_CATEGORIES = [
  { category: '硕士 / 博士 (公立DLI)', pal: '❌ 不需要', cap: '不占配额', note: '2026.1.1起豁免；预计发放49,000份' },
  { category: '本科 / 学院 (College)', pal: '✅ 需要', cap: '占配额', note: '预计发放180,000份（处理上限309,670份）' },
  { category: '中小学 (K-12)', pal: '❌ 不需要', cap: '不占配额', note: '预计发放115,000份' },
  { category: '同一DLI续签', pal: '❌ 不需要', cap: '不占配额', note: '同级别续签豁免' },
];

const FUNDS_BREAKDOWN = [
  { label: '生活费 (单身)', value: 'CAD ۲۳,۴۴۸ / سال', note: '2026.9.1起；此前为22,895' },
  { label: '生活费 (配偶陪同)', value: 'CAD ۲۹,۱۹۲ / سال', note: '每位家庭成员递增' },
  { label: '学费', value: '因大学/专业而异', note: '需在生活费之外单独证明' },
  { label: '往返机票', value: '需单独证明', note: '生活费+学费之外' },
  { label: 'GIC最低金额', value: 'CAD ۲۳,۴۴۸', note: '参与银行出具的投资凭证' },
];

const PGWP_RULES = [
  { program: '8个月–不足2年', pgwp: '与课程等长', language: '大学 CLB 7 / 学院 CLB 5' },
  { program: '2年及以上', pgwp: '最长3年', language: '大学 CLB 7 / 学院 CLB 5' },
  { program: '硕士 (8个月+)', pgwp: '最长3年', language: 'CLB 7' },
  { program: '博士 (8个月+)', pgwp: '最长3年', language: 'CLB 7' },
];

const FingerprintIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
  </svg>
);

const VISA_REQUIREMENTS = [
  { label: '学签处理费', value: 'CAD ۱۵۰', icon: FileCheck2, color: 'text-amber-300' },
  { label: '生物识别费', value: 'CAD ۸۵', icon: FingerprintIcon, color: 'text-amber-300' },
  { label: 'GIC / 资金证明', value: 'CAD ۲۳,۴۴۸+', icon: Banknote, color: 'text-emerald-300' },
  { label: 'PAL (如适用)', value: '由省份签发', icon: FileText, color: 'text-sky-300' },
  { label: '语言考试', value: 'IELTS / CELPIP / TEF', icon: Languages, color: 'text-sky-300' },
  { label: '体检 (如适用)', value: '指定诊所', icon: HeartPulse, color: 'text-rose-300' },
];

const TIMELINE = [
  { step: '۱', title: 'دریافت پذیرش (LOA)', detail: 'از DLI معتبر — حداقل ۸ ماه', time: '۲–۴ ماه' },
  { step: '۲', title: 'دریافت PAL (如需要)', detail: '本科/学院需要；硕博免PAL', time: '۲–۸ هفته' },
  { step: '۳', title: 'آماده‌سازی GIC و مدارک مالی', detail: 'CAD ۲۳,۴۴۸+ +学费+机票', time: '۲–۴ هفته' },
  { step: '۴', title: 'ثبت درخواست Study Permit', detail: 'آنلاین از طریق IRCC', time: '۱ روز' },
  { step: '۵', title: 'دریافت تصمیم', detail: '۸۰٪ در ۲۸ روز یا کمتر', time: '۲۸ روز' },
  { step: '۶', title: 'ورود به کانادا و ثبت‌نام', detail: 'فعال‌سازی study permit در مرز', time: '—' },
];

const INTERNAL_LINKS = [
  { href: '/academic-austria', title: 'تحصیل در اتریش', desc: 'شهریه €۷۵۲ و VWU' },
  { href: '/academic-austria-medical', title: 'پزشکی اتریش (MedAT)', desc: 'سهمیه ۵٪ و آزمون ورودی' },
  { href: '/startup-canada', title: 'استارت‌آپ کانادا', desc: 'مسیر کارآفرینی' },
  { href: '/assessment', title: 'ارزیابی رایگان', desc: 'سنجش شانس پذیرش' },
  { href: '/contact', title: 'مشاوره با وکلای دیاکو', desc: 'تماس مستقیم' },
  { href: '/guides/immigration-timeline', title: 'جدول زمانی مهاجرت', desc: 'برنامه‌ریزی گام‌به‌گام' },
];

const TESTIMONIALS = [
  { name: 'آرش رضایی', role: 'دانشجوی Master در UBC', quote: 'با اینکه مقاطع ارشد و دکتری از PAL معاف شده بودند، تیم دیاکو مدارک GIC و SOP را طوری تنظیم کرد که ویزا در کمتر از ۳ هفته صادر شد.', rating: 5 },
  { name: 'نگین موسوی', role: 'دانشجوی College در تورنتو', quote: 'دریافت PAL از استان انتاریو پیچیده بود، اما دیاکو مستقیماً با کالج هماهنگ کرد و همه چیز در ۶ هفته آماده شد.', rating: 5 },
  { name: 'سامان کریمی', role: 'PGWP و Express Entry', quote: 'بعد از PGWP، با مشاوره دیاکو CRS من به ۵۲۰ رسید و در اولین دراو CEC دعوتنامه PR گرفتم.', rating: 5 },
];

const FAQS = [
  { q: 'آیا دانشجویان کارشناسی ارشد و دکتری در ۲۰۲۶ نیاز به PAL دارند؟', a: 'خیر. از ۱ ژانویه ۲۰۲۶، دانشجویان کارشناسی ارشد و دکتری در DLI دولتی از ارائه PAL معاف هستند و سقف ویزا شامل آن‌ها نمی‌شود.' },
  { q: 'تمکن مالی لازم برای Study Permit ۲۰۲۶ چقدر است؟', a: 'برای درخواست‌های پس از ۱ سپتامبر ۲۰۲۶: CAD 23,448/سال برای مجرد (خارج از کبک). شهریه دانشگاه، GIC و بلیط باید جداگانه اثبات شوند.' },
  { q: 'PGWP در ۲۰۲۶ چقدر اعتبار دارد؟', a: 'دوره ۸ ماه تا ۲ سال: معادل طول دوره; ۲ سال و بالاتر: تا ۳ سال; کارشناسی ارشد و دکتری ۸ ماه به بالا: تا ۳ سال. زبان: CLB 7 برای دانشگاه، CLB 5 برای کالج.' },
  { q: 'دانشجو چند ساعت در هفته می‌تواند کار کند؟', a: '۲۴ ساعت در هفته در طول ترم (از نوامبر ۲۰۲۴ به‌طور دائم); در تعطیلات رسمی می‌تواند تمام‌وقت کار کند (حداکثر ۱۸۰ روز در سال).' },
  { q: 'زمان پردازش Study Permit چقدر است؟', a: 'طبق اعلام IRCC (فوریه ۲۰۲۶): ۸۰٪ درخواست‌های جدید در ۲۸ روز یا کمتر پردازش شده‌اند. تمدیدها ۹۰ روز.' },
  { q: 'مسیر PR از طریق تحصیل در کانادا چگونه است؟', a: 'پس از PGWP و ۱ سال کار ماهر (TEER 0–3)، واجد شرایط CEC در Express Entry می‌شوید. امتیاز CRS فعلی CEC حدود ۵۰۷–۵۱۴ است. PNP نیز ۶۰۰ امتیاز تضمینی اضافه می‌کند.' },
];

/* ============================================================
   3. Schema.org JSON-LD
   ============================================================ */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${CANONICAL_URL}#article`,
      headline: 'راهنمای جامع تحصیل در کانادا ۲۰۲۶: Study Permit، PAL، PGWP و مسیر PR',
      description: 'بررسی قوانین جدید IRCC ۲۰۲۶: سقف ۴۰۸,۰۰۰ ویزای تحصیلی، معافیت ارشد و دکتری از PAL، تمکن مالی CAD ۲۳,۴۴۸، کار دانشجویی ۲۴ ساعت و PGWP تا ۳ سال.',
      image: { '@type': 'ImageObject', url: HERO_IMAGE.src, width: HERO_IMAGE.width, height: HERO_IMAGE.height, caption: HERO_IMAGE.alt },
      author: { '@type': 'Organization', name: BRAND.name, url: BRAND.origin },
      publisher: { '@type': 'Organization', name: BRAND.name, logo: { '@type': 'ImageObject', url: `${BRAND.origin}/logo.png` } },
      datePublished: '2026-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      mainEntityOfPage: CANONICAL_URL,
      inLanguage: 'fa-IR',
      about: [
        { '@type': 'Thing', name: 'Study Permit Canada' },
        { '@type': 'Thing', name: 'PAL 2026' },
        { '@type': 'Thing', name: 'PGWP' },
      ],
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.speakable-summary'] },
    },
    {
      '@type': 'HowTo',
      '@id': `${CANONICAL_URL}#howto`,
      name: 'مراحل دریافت Study Permit کانادا ۲۰۲۶',
      description: 'از پذیرش تا ورود به کانادا',
      totalTime: 'P6M',
      step: TIMELINE.map((t, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: t.title,
        text: t.detail,
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
        { '@type': 'ListItem', position: 1, name: 'خانه', item: BRAND.origin },
        { '@type': 'ListItem', position: 2, name: 'تحصیل در کانادا', item: CANONICAL_URL },
      ],
    },
  ],
};

/* ============================================================
   4. Component
   ============================================================ */
export const AcademicCanadaPage: React.FC<Props> = ({ onBackToHome, onOpenAssessment }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useSeo({
    title: 'تحصیل در کانادا ۲۰۲۶ | Study Permit + PAL + PGWP',
    description: 'راهنمای کامل کانادا ۲۰۲۶: سقف ۴۰۸,۰۰۰学签، PAL豁免硕博، تمکن مالی CAD ۲۳,۴۴۸، کار ۲۴ ساعت، PGWP تا ۳ سال و مسیر PR با دیاکو.',
    canonical: '/guides/academic-canada',
    ogType: 'article',
    ogImage: HERO_IMAGE.src,
    keywords: ['تحصیل در کانادا ۲۰۲۶', 'Study Permit Canada', 'PAL کانادا', 'PGWP ۲۰۲۶', 'تمکن مالی کانادا ۲۳۴۴۸', 'Express Entry CEC', 'IRCC Study Permit'],
    jsonLd: SCHEMA,
  });

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

  return (
    <div className="min-h-screen bg-[#061a21] text-white pt-24 pb-16 font-sans" dir="rtl">
      {/* Reading Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/20">
        <div className="h-full bg-gradient-to-l from-amber-400 to-red-500 transition-[width] duration-150" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* ============================================================
          BREADCRUMB
         ============================================================ */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button type="button" onClick={onBackToHome} className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 transition cursor-pointer">
            <ArrowRight className="h-4 w-4" /> بازگشت به صفحه اصلی
          </button>
          <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-xs text-slate-300">
            <a href="/" className="hover:text-amber-300">خانه</a>
            <span>/</span>
            <a href="/academic" className="hover:text-amber-300">تحصیل در دانشگاه</a>
            <span>/</span>
            <span className="text-amber-300 font-bold">کانادا</span>
          </nav>
        </div>
      </div>

      <article ref={articleRef}>
        {/* ============================================================
            SECTION 1: HERO — H1 + Above the Fold
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-300 mb-4">
                <GraduationCap className="h-4 w-4 text-red-400" />
                IRCC Study Permit & PAL — تحصیل در کانادا ۲۰۲۶
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6" itemProp="headline">
                تحصیل در دانشگاه‌های کانادا ۲۰۲۶{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-red-400">
                  (Study Permit + PGWP)
                </span>
              </h1>

              <p className="speakable-summary text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify" itemProp="description">
                <strong className="text-amber-300">خلاصه:</strong> کانادا در ۲۰۲۶ سقف <strong className="text-white">۴۰۸,۰۰۰学签</strong> دارد. از ۱ ژانویه ۲۰۲۶، <strong className="text-emerald-300">硕士 و博士 در DLI دولتی از PAL معاف‌اند</strong> —本科 و学院 همچنان به PAL نیاز دارند (۱۸۰,۰۰۰份). تمکن مالی: <strong className="text-amber-300">CAD ۲۳,۴۴۸/سال</strong> (مجرد، از ۲۰۲۶.۹.۱). کار دانشجویی: <strong className="text-sky-300">۲۴ ساعت/هفته</strong>. PGWP: تا <strong className="text-white">۳ سال</strong>. مسیر PR: CEC با CRS <strong className="text-white">۵۰۷–۵۱۴</strong>.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {KEY_FACTS.map((f) => (
                  <div key={f.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                    <div className={`text-base font-black ${f.color}`}>{f.value}</div>
                    <div className="text-[10px] text-slate-300 mt-1">{f.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer">
                  ارزیابی شانس Study Permit کانادا
                </button>
                <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-emerald-400" /> دفتر دیاکو: {BRAND.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
                <img
                  src={HERO_IMAGE.src}
                  srcSet={HERO_IMAGE.srcSet}
                  sizes="(max-width: 1024px) 100vw, 500px"
                  alt={HERO_IMAGE.alt}
                  width={HERO_IMAGE.width}
                  height={HERO_IMAGE.height}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-80 sm:h-96 object-cover"
                  itemProp="image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                    <Building2 className="h-4 w-4" /> IRCC — اداره مهاجرت، پناهندگی و شهروندی کانادا
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    SOP آکادمیک قوی، GIC CAD ۲۳,۴۴۸ و انتخاب DLI با تضمین PGWP
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: PAL & CAP 2026
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-red-500/5 border border-red-400/20 rounded-3xl p-6 md:p-10">
            <div className="flex items-start gap-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white mb-2">
                  تغییر بزرگ ۲۰۲۶:硕博免PAL، سقف ۴۰۸,۰۰۰学签
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  این مهم‌ترین تغییر برای متقاضیان ایرانی است. اگر硕士 یا دکتری می‌خوانید، مسیر شما ساده‌تر شده.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-right text-xs md:text-sm">
                <caption className="sr-only">دسته‌بندی PAL و سقف学签 ۲۰۲۶</caption>
                <thead>
                  <tr className="border-b border-white/15 text-slate-300">
                    <th scope="col" className="py-3 px-3">دسته</th>
                    <th scope="col" className="py-3 px-3">PAL</th>
                    <th scope="col" className="py-3 px-3">سقف</th>
                    <th scope="col" className="py-3 px-3">توضیح</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-200">
                  {PAL_CATEGORIES.map((c) => (
                    <tr key={c.category}>
                      <th scope="row" className="py-3 px-3 font-bold text-white">{c.category}</th>
                      <td className="py-3 px-3 text-center">{c.pal}</td>
                      <td className="py-3 px-3 text-center">{c.cap}</td>
                      <td className="py-3 px-3 text-[11px] text-slate-400">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { value: '۴۰۸,۰۰۰', label: 'سقف کل学签 ۲۰۲۶', note: '155K جدید + 253K تمدید' },
                { value: '۳۰۹,۶۷۰', label: 'حداکثر پردازش PAL通道', note: 'پیش‌بینی 180K صدور' },
                { value: '۱۸۰,۰۰۰', label: '学签 با PAL (本科/学院)', note: 'توزیع استانی بر اساس جمعیت' },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-lg font-black text-amber-300">{s.value}</div>
                  <div className="text-[11px] text-white mt-1">{s.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{s.note}</div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-4">
              منبع: IRCC — 2026 Provincial/Territorial Allocations (25 Nov 2025)[reference:9]
            </p>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: PROOF OF FUNDS
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mb-3">
                  <Banknote className="h-4 w-4" /> تمکن مالی ۲۰۲۶
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                  چقدر پول لازم است؟ (CAD ۲۳,۴۴۸)
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                  از ۱ سپتامبر ۲۰۲۶، IRCC حداقل生活费 را به <strong className="text-amber-300">CAD ۲۳,۴۴۸/سال</strong> افزایش داده (قبلاً ۲۲,۸۹۵). این مبلغ <strong className="text-white">جدا از学费 و بلیط</strong> است.
                </p>

                <div className="space-y-2.5">
                  {FUNDS_BREAKDOWN.map((f) => (
                    <div key={f.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-xs text-white">{f.label}</span>
                      <span className="text-xs font-black text-amber-300">{f.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
                  <p className="text-[11px] text-amber-200 leading-relaxed">
                    <strong>نکته:</strong> GIC از بانک‌های مشارکت‌کننده کانادایی (مثل Scotiabank، CIBC، BMO) باید <strong className="text-white">حداقل CAD ۲۳,۴۴۸</strong> باشد. برای کبک، شرایط متفاوت است.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <figure className="rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=75"
                    alt="تمکن مالی Study Permit کانادا ۲۰۲۶ — GIC CAD ۲۳,۴۴۸"
                    width={800} height={533} loading="lazy" decoding="async"
                    className="w-full h-auto object-cover"
                  />
                  <figcaption className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                    GIC حداقل CAD ۲۳,۴۴۸ +学费 + بلیط — از ۲۰۲۶.۹.۱
                  </figcaption>
                </figure>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">مقایسه با ۲۰۲۵</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    <li className="flex justify-between"><span>۲۰۲۶ (از سپتامبر)</span><span className="font-bold text-amber-300">CAD ۲۳,۴۴۸</span></li>
                    <li className="flex justify-between"><span>۲۰۲۵ (تا آگوست)</span><span className="font-bold">CAD ۲۲,۸۹۵</span></li>
                    <li className="flex justify-between border-t border-white/10 pt-1 mt-1"><span className="text-white">افزایش</span><span className="text-emerald-400 font-black">+CAD ۵۵۳</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4: PGWP
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-gradient-to-br from-sky-950/40 via-slate-900/60 to-[#061a21] border border-sky-400/20 rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=75"
                  alt="PGWP کانادا ۲۰۲۶ — اجازه کار پس از فارغ‌التحصیلی"
                  width={800} height={533} loading="lazy" decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                  PGWP: 2年+ = 3 سال |硕士 8个月+ = 3 سال
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 mb-3">
                  <Briefcase className="h-4 w-4" /> PGWP ۲۰۲۶
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                  اجازه کار پس از فارغ‌التحصیلی: تا ۳ سال
                </h2>

                <div className="space-y-2.5">
                  {PGWP_RULES.map((r) => (
                    <div key={r.program} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{r.program}</span>
                        <span className="text-sm font-black text-amber-300">{r.pgwp}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">زبان: {r.language}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-sky-500/10 border border-sky-400/20">
                  <p className="text-[11px] text-sky-200 leading-relaxed">
                    <strong>نکته:</strong> برای PGWP، باید حداقل <strong className="text-white">۸ ماه</strong>全日制 در DLI معتبر تحصیل کرده باشید. لیست رشته‌های واجد شرایط PGWP در ۲۰۲۶ ثابت (فریز) شده است.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: WORK WHILE STUDYING
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-3">
                  <Coffee className="h-4 w-4" /> کار دانشجویی
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                  ۲۴ ساعت در هفته (نه ۲۰!)
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                  از ۸ نوامبر ۲۰۲۴، سقف کار دانشجویی <strong className="text-amber-300">به‌طور دائم از ۲۰ به ۲۴ ساعت</strong> افزایش یافته. در تعطیلات رسمی (تابستان، زمستان، بهار) می‌توانید <strong className="text-white">تمام‌وقت</strong> کار کنید.
                </p>

                <div className="space-y-2">
                  {[
                    '۲۴ ساعت/هفته در طول ترم — قانون دائمی',
                    'تمام‌وقت در تعطیلات (حداکثر ۱۸۰ روز در سال)',
                    'تعطیلات باید حداقل ۷ روز متوالی باشد',
                    'قبل از شروع مطالعه، اجازه کار ندارید',
                    'شروع کار فقط پس از آغاز برنامه تحصیلی',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                  * درآمد ۲۴ ساعت: حدود CAD ۱,۰۰۰–۱,۴۰۰/ماه — کمک قابل‌توجهی به هزینه زندگی.
                </p>
              </div>

              <figure className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=75"
                  alt="کار دانشجویی کانادا — ۲۴ ساعت در هفته"
                  width={800} height={533} loading="lazy" decoding="async"
                  className="w-full h-auto object-cover"
                />
                <figcaption className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                  ۲۴ ساعت/هفته در طول ترم — تعطیلات: تمام‌وقت
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: TIMELINE
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-amber-400" />
              جدول زمانی ۲۰۲۶
            </h2>

            <div className="space-y-3">
              {TIMELINE.map((t) => (
                <div key={t.step} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-400 text-[#082833] grid place-items-center text-xs font-black">
                    {t.step}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{t.title}</span>
                      <span className="text-[10px] text-slate-400">{t.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-center">
              <p className="text-[11px] text-emerald-200">
                <strong>پردازش سریع:</strong> ۸۰٪ درخواست‌های جدید در <strong className="text-white">۲۸ روز</strong> یا کمتر (IRCC، فوریه ۲۰۲۶)[reference:10]
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 7: ARTICLE — مقاله کامل
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <article className="prose prose-invert prose-slate max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              راهنمای کامل تحصیل در کانادا ۲۰۲۶: از PAL تا PR
            </h2>

            <div className="space-y-4 text-sm leading-8 text-slate-300 text-justify">
              <p>
                کانادا در ۲۰۲۶ با تغییرات بنیادینی در سیستم学签 مواجه است. سقف کل学签 به <strong className="text-amber-300">۴۰۸,۰۰۰份</strong> کاهش یافته (۷٪ کمتر از ۲۰۲۵)[reference:11]. اما یک خبر خوب برای متقاضیان تحصیلات تکمیلی: از ۱ ژانویه ۲۰۲۶، دانشجویان硕士 و دکتری در DLI دولتی <strong className="text-emerald-300">از ارائه PAL معاف‌اند</strong> و سقف学签 شامل آن‌ها نمی‌شود[reference:12]. این تصمیم برای جذب استعدادهای برتر گرفته شده است.
              </p>

              <h3 className="text-lg font-black text-white mt-6 mb-3">
                PAL چیست و چه کسانی به آن نیاز دارند؟
              </h3>
              <p>
                PAL (Provincial Attestation Letter) یک نامه تاییدیه استانی است که ثابت می‌کند سهمیه学签 آن استان برای شما رزرو شده. برای ۲۰۲۶:
              </p>
              <ul className="space-y-1.5 pr-5 list-disc marker:text-amber-500">
                <li><strong className="text-white">硕士 و博士 (DLI دولتی):</strong> نیازی به PAL ندارند — ۴۹,۰۰۰份 پیش‌بینی شده[reference:13].</li>
                <li><strong className="text-white">本科 و学院 (College):</strong> نیاز به PAL دارند — ۱۸۰,۰۰۰份 پیش‌بینی شده، با توزیع استانی (انتاریو ۷۰,۰۷۴، بریتیش کلمبیا ۲۴,۷۸۶، کبک ۳۹,۴۷۴)[reference:14].</li>
                <li><strong className="text-white">K-12 و续签同校:</strong> معاف از PAL — ۱۱۵,۰۰۰ + ۶۴,۰۰۰份[reference:15].</li>
              </ul>

              <h3 className="text-lg font-black text-white mt-6 mb-3">
                تمکن مالی: CAD ۲۳,۴۴۸ (افزایش یافته)
              </h3>
              <p>
                از ۱ سپتامبر ۲۰۲۶، حداقل生活费 برای Study Permit به <strong className="text-amber-300">CAD ۲۳,۴۴۸ در سال</strong> افزایش یافته (قبلاً ۲۲,۸۹۵)[reference:16]. این مبلغ <strong className="text-white">جدا از学费 و بلیط</strong> است. برای متقاضی متأهل، این مبلغ به CAD ۲۹,۱۹۲ افزایش می‌یابد[reference:17]. GIC (Guaranteed Investment Certificate) از بانک‌های کانادایی باید حداقل این مبلغ را پوشش دهد.
              </p>

              <h3 className="text-lg font-black text-white mt-6 mb-3">
                PGWP: کلید مسیر اقامت دائم
              </h3>
              <p>
                پس از فارغ‌التحصیلی از یک برنامه حداقل ۸ ماهه در DLI واجد شرایط، می‌توانید PGWP دریافت کنید:
              </p>
              <ul className="space-y-1.5 pr-5 list-disc marker:text-amber-500">
                <li><strong className="text-white">۸ ماه تا کمتر از ۲ سال:</strong> PGWP با طول برابر برنامه[reference:18].</li>
                <li><strong className="text-white">۲ سال یا بیشتر:</strong> PGWP تا <strong className="text-amber-300">۳ سال</strong>[reference:19].</li>
                <li><strong className="text-white">硕士 یا دکتری (۸ ماه+):</strong> PGWP تا ۳ سال، بدون توجه به طول برنامه[reference:20].</li>
              </ul>
              <p>
                از نظر زبان: برای大学 CLB 7 و برای学院 CLB 5 لازم است[reference:21]. لیست رشته‌های واجد شرایط PGWP در ۲۰۲۶ ثابت شده است[reference:22].
              </p>

              <h3 className="text-lg font-black text-white mt-6 mb-3">
                از PGWP تا PR: CEC با CRS ۵۰۷–۵۱۴
              </h3>
              <p>
                پس از حداقل ۱ سال کار ماهر (TEER 0–3) با PGWP، واجد شرایط <strong className="text-white">Canadian Experience Class (CEC)</strong> در Express Entry می‌شوید. CRS فعلی برای CEC حدود <strong className="text-amber-300">۵۰۷–۵۱۴</strong> است[reference:23]. گزینه‌های تقویت CRS:
              </p>
              <ul className="space-y-1.5 pr-5 list-disc marker:text-amber-500">
                <li><strong className="text-white">تحصیل کانادایی:</strong> 15–30 امتیاز اضافه[reference:24].</li>
                <li><strong className="text-white">PNP استانی:</strong> +600 امتیاز — عملاً PR را تضمین می‌کند[reference:25].</li>
                <li><strong className="text-white">زبان فرانسه:</strong> تا 50 امتیاز اضافه؛ دراوهای فرانسه با CRS ۳۷۹–۴۲۸[reference:26].</li>
              </ul>

              <h3 className="text-lg font-black text-white mt-6 mb-3">
                کار دانشجویی: ۲۴ ساعت (نه ۲۰)
              </h3>
              <p>
                از نوامبر ۲۰۲۴، سقف کار دانشجویی در طول ترم <strong className="text-amber-300">به‌طور دائم به ۲۴ ساعت در هفته</strong> افزایش یافت. در تعطیلات رسمی (حداقل ۷ روز متوالی)، می‌توانید تمام‌وقت کار کنید — حداکثر ۱۸۰ روز در سال. کار قبل از شروع برنامه تحصیلی ممنوع است.
              </p>

              <h3 className="text-lg font-black text-white mt-6 mb-3">
                نقش دفتر دیاکو
              </h3>
              <p>
                هلدینگ مهاجرتی دیاکو با وکلای مقیم و همکاران در تورنتو و ونکوور، پرونده Study Permit شما را از انتخاب DLI و رشته واجد شرایط PGWP تا تنظیم SOP، GIC و درخواست ویزا همراهی می‌کند. برای ارزیابی رایگان، فرم آنلاین را تکمیل کنید.
              </p>
            </div>
          </article>
        </section>

        {/* ============================================================
            SECTION 8: FAQ
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <BookOpen className="h-4 w-4" /> پرسش‌های متداول
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              سوالات پرتکرار تحصیل در کانادا ۲۰۲۶
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  <h3 className="m-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold text-white hover:text-amber-300 transition cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} aria-hidden="true" />
                    </button>
                  </h3>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            SECTION 9: INTERNAL LINKS
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
            راهنماهای مرتبط
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {INTERNAL_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-amber-400/40 hover:bg-white/[0.05]">
                <ArrowRight className="h-4 w-4 text-amber-400 shrink-0 mt-0.5 group-hover:-translate-x-1 transition" />
                <div>
                  <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition">{link.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{link.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ============================================================
            SECTION 10: FINAL CTA
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-gradient-to-l from-[#0b2933] to-[#082833] border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              مسیر شما به کانادا از اینجا شروع می‌شود
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
              تیم دیاکو با تسلط بر قوانین ۲۰۲۶ (PAL، GIC CAD ۲۳,۴۴۸، PGWP) پرونده Study Permit شما را از انتخاب DLI تا ورود به کانادا همراهی می‌کند.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-8 py-4 text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer">
                شروع ارزیابی رایگان
              </button>
              <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-400" /> گفتگو با مشاور
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================
            FOOTER DISCLAIMER
           ============================================================ */}
        <section className="container mx-auto px-4 md:px-8">
          <div className="rounded-2xl bg-amber-500/5 border border-amber-400/20 p-4 flex items-start gap-3 text-[11px] text-amber-200 leading-relaxed">
            <Scale className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              <strong>سلب مسئولیت (YMYL):</strong> اطلاعات این صفحه صرفاً آموزشی است و جایگزین مشاوره حقوقی رسمی نیست. تصمیم نهایی بر عهده IRCC و مقامات کانادا است. قوانین و مبالغ ممکن است تغییر کنند؛ پیش از اقدام، از canada.ca تأیید بگیرید.
            </span>
          </div>
        </section>
      </article>
    </div>
  );
};

export default AcademicCanadaPage;