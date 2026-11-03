import React, { useEffect, useRef, useState, useId, useMemo } from 'react';
import {
  Building2, ShieldCheck, Users, Award, TrendingUp, Scale,
  FileCheck2, Home, Lock, Clock, Phone, Globe, MapPin,
  CheckCircle2, Sparkles, ChevronDown, ExternalLink,
  Briefcase, Landmark, BookOpen, ArrowLeft, Quote, Info,
} from 'lucide-react';
import DiacoLogo from './DiacoLogo';

/* ============================================================
   1. Types
   ============================================================ */
interface Props {
  onOpenAssessment?: () => void;
}

interface OfficeItem {
  flag: string;
  country: string;
  city: string;
  address: string;
  image: string;
  imageAlt: string;
  highlight?: boolean;
}

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  note: string;
}

interface TrustItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface FAQEntry {
  q: string;
  a: string;
}

/* ============================================================
   2. Data
   ============================================================ */
const BRAND = {
  name: 'هلدینگ مهاجرتی دیاکو',
  nameEn: 'Diaco Immigration Holding',
  origin: 'https://www.dia-co.ir',
  phone: '+98-21-91693955',
  phoneDisplay: '۰۲۱۹۱۶۹۳۹۵۵',
  logo: 'https://www.dia-co.ir/logo.png',
} as const;

const OFFICES: OfficeItem[] = [
  {
    flag: '🇦🇹',
    country: 'اتریش',
    city: 'وین (دفتر مرکزی)',
    address: 'Ausstellungsstraße 50, 1020 Wien',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'دفتر مرکزی هلدینگ مهاجرتی دیاکو در وین اتریش — Ausstellungsstraße 50',
    highlight: true,
  },
  {
    flag: '🇬🇷',
    country: 'یونان',
    city: 'آتن (گلیفادا)',
    address: 'Grigoriou Lampraki 58, Glyfada, 166 75',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'دفتر هلدینگ مهاجرتی دیاکو در آتن یونان — گلیفادا',
  },
  {
    flag: '🇮🇷',
    country: 'ایران',
    city: 'تهران (ولنجک)',
    address: 'ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'دفتر هلدینگ مهاجرتی دیاکو در تهران ایران — ولنجک',
  },
];

const STATS: StatItem[] = [
  {
    icon: Award,
    label: 'سابقه فعالیت',
    value: '۱۰+ سال',
    note: 'از سال ۱۳۹۴ تاکنون',
  },
  {
    icon: FileCheck2,
    label: 'پرونده موفق',
    value: '۲,۰۰۰+',
    note: 'تأییدشده توسط وکلای اتریش',
  },
  {
    icon: Users,
    label: 'وکلای بین‌المللی',
    value: '۳۵ وکیل',
    note: 'مقیم در ۱۱ کشور اروپایی',
  },
  {
    icon: Globe,
    label: 'کشورهای فعال',
    value: '۱۱ کشور',
    note: 'در حوزه شنگن و اروپا',
  },
];

const TRUST_POINTS: TrustItem[] = [
  {
    icon: Scale,
    title: 'وکلای رسمی در اروپا',
    description:
      'پرونده شما مستقیماً توسط وکلای پایه یک (Rechtsanwalt، Avocat، Abogado) در کشور مقصد پیگیری می‌شود، نه واسطه‌های محلی.',
  },
  {
    icon: FileCheck2,
    title: 'شفافیت کامل قرارداد',
    description:
      'قرارداد رسمی از گام نخست، با تعهدنامه کتبی، تعرفه شفاف و بدون هزینه‌های پنهان — مطابق آیین‌نامه کانون وکلای اتریش.',
  },
  {
    icon: Home,
    title: 'خدمات پس از ورود',
    description:
      'اجاره مسکن رسمی، ثبت اقامت (Meldezettel)، افتتاح حساب بانکی و دریافت کد مالیاتی تا استقرار کامل در کشور مقصد.',
  },
  {
    icon: Lock,
    title: 'حفظ محرمانگی (GDPR)',
    description:
      'تمام اسناد و اطلاعات پرونده با استانداردهای GDPR اتحادیه اروپا محافظت می‌شود. دسترسی به پرونده شما محدود به وکیل مسئول است.',
  },
];

/* جدول مقایسه — مناسب AI Overviews و Featured Snippets */
const COMPARISON_ROWS = [
  { feature: 'پیگیری پرونده', diaco: 'وکیل رسمی مقیم اروپا', typical: 'واسطه / دفتر محلی' },
  { feature: 'قرارداد', diaco: 'رسمی از روز اول + تعهدنامه کتبی', typical: 'شفاهی یا ساده' },
  { feature: 'دسترسی به پرونده', diaco: 'مستقیم + گزارش هفتگی', typical: 'بدون گزارش دوره‌ای' },
  { feature: 'خدمات پس از ورود', diaco: 'کامل (مسکن، حساب، ثبت)', typical: 'محدود یا جداگانه' },
  { feature: 'پشتیبانی چندزبانه', diaco: 'فارسی، انگلیسی، آلمانی، یونانی', typical: 'معمولاً یک زبان' },
  { feature: 'حفاظت داده', diaco: 'GDPR اتحادیه اروپا', typical: 'نامشخص' },
];

const FAQS: FAQEntry[] = [
  {
    q: 'هلدینگ مهاجرتی دیاکو چند سال سابقه فعالیت دارد؟',
    a: 'دیاکو از سال ۱۳۹۴ (۲۰۱۵ میلادی) فعالیت خود را آغاز کرده و تا سال ۲۰۲۶ بیش از ۱۰ سال سابقه مستمر در حوزه مهاجرت، اقامت و سرمایه‌گذاری در اروپا دارد. در این مدت بیش از ۲,۰۰۰ پرونده موفق توسط تیم حقوقی ما مدیریت شده است.',
  },
  {
    q: 'دفاتر دیاکو در کدام کشورها فعال است؟',
    a: 'دیاکو سه دفتر رسمی دارد: (۱) دفتر مرکزی در وین، اتریش — Ausstellungsstraße 50, 1020 Wien؛ (۲) دفتر آتن، یونان — Grigoriou Lampraki 58, Glyfada؛ (۳) دفتر تهران، ایران — ولنجک، بلوار دانشجو. علاوه بر این، تیم دیاکو با ۳۵ وکیل همکار در ۱۱ کشور اروپایی همکاری می‌کند.',
  },
  {
    q: 'تفاوت دیاکو با سایر مؤسسات مهاجرتی چیست؟',
    a: 'سه تفاوت اصلی: (۱) وکلای رسمی مقیم اروپا پرونده شما را پیگیری می‌کنند، نه واسطه‌ها؛ (۲) قرارداد رسمی و شفاف از روز اول، با تعهدنامه کتبی و تعرفه مشخص؛ (۳) خدمات پس از ورود شامل اجاره مسکن، ثبت اقامت، افتتاح حساب بانکی و دریافت کد مالیاتی.',
  },
  {
    q: 'آیا اطلاعات پرونده من محرمانه باقی می‌ماند؟',
    a: 'بله. تمام اسناد و اطلاعات پرونده شما مطابق استانداردهای GDPR (مقررات عمومی حفاظت از داده اتحادیه اروپا) محافظت می‌شود. دسترسی به پرونده محدود به وکیل مسئول پرونده و تیم حقوقی مرتبط است. اطلاعات شما هرگز به اشخاص ثالث فروخته یا منتقل نمی‌شود.',
  },
  {
    q: 'دیاکو در چه حوزه‌هایی خدمت ارائه می‌دهد؟',
    a: 'خدمات دیاکو در سال ۲۰۲۶ شامل: (۱) اقامت کاری (کارت RWR، بلوکارت اروپا)؛ (۲) تمکن مالی و اقامت خودحمایتی؛ (۳) تحصیل و بورسیه؛ (۴) استارت‌آپ و کارآفرینی؛ (۵) گلدن ویزا و خرید ملک؛ (۶) الحاق خانواده؛ (۷) دیجیتال نوماد و فریلنسر؛ (۸) هنرمندان و نخبگان — در ۱۱ کشور اروپایی.',
  },
  {
    q: 'برای شروع مشاوره چه باید کرد؟',
    a: 'کافی است فرم ارزیابی آنلاین در www.dia-co.ir را تکمیل کنید یا با شماره ۰۲۱۹۱۶۹۳۹۵۵ تماس بگیرید. کارشناسان دیاکو پس از بررسی اولیه، جلسه مشاوره تخصصی با وکیل مقیم کشور مقصد را هماهنگ می‌کنند. ارزیابی اولیه رایگان است.',
  },
];

/* ============================================================
   3. Schema.org JSON-LD — AboutPage + Organization + FAQPage
   ============================================================ */
const generateSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LegalService', 'ProfessionalService'],
      '@id': `${BRAND.origin}/#organization`,
      name: BRAND.name,
      alternateName: BRAND.nameEn,
      url: BRAND.origin,
      logo: { '@type': 'ImageObject', url: BRAND.logo, width: 512, height: 512 },
      description:
        'هلدینگ مهاجرتی دیاکو؛ مجری تخصصی پرونده‌های اقامت، ویزا و سرمایه‌گذاری در ۱۱ کشور اروپایی با ۱۰+ سال سابقه و ۳۵ وکیل بین‌المللی.',
      foundingDate: '2015',
      telephone: BRAND.phone,
      email: 'info@dia-co.ir',
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 35 },
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'Ausstellungsstraße 50',
          addressLocality: 'Wien',
          postalCode: '1020',
          addressCountry: 'AT',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'Grigoriou Lampraki 58, Glyfada',
          addressLocality: 'Athens',
          postalCode: '166 75',
          addressCountry: 'GR',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'ولنجک، بلوار دانشجو، میدان یاسمن',
          addressLocality: 'تهران',
          postalCode: '19858',
          addressCountry: 'IR',
        },
      ],
      areaServed: ['AT', 'DE', 'NL', 'GR', 'ES', 'FR', 'IT', 'PT', 'HU', 'SK', 'CA'],
      sameAs: [
        'https://www.linkedin.com/company/diaco-holding',
        'https://www.instagram.com/diaco.holding',
        'https://t.me/diaco_holding',
        'https://www.youtube.com/@diaco_holding',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1847',
        bestRating: '5',
      },
    },
    {
      '@type': 'AboutPage',
      '@id': `${BRAND.origin}/#about`,
      url: `${BRAND.origin}/#about`,
      name: 'درباره هلدینگ مهاجرتی دیاکو',
      description:
        'معرفی هلدینگ مهاجرتی دیاکو — ۱۰+ سال سابقه، ۲,۰۰۰+ پرونده موفق، ۳۵ وکیل بین‌المللی در ۱۱ کشور اروپایی.',
      isPartOf: { '@id': `${BRAND.origin}/#website` },
      about: { '@id': `${BRAND.origin}/#organization` },
      inLanguage: 'fa-IR',
      datePublished: '2025-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#about-heading', '.answer-first', '.speakable-summary'],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${BRAND.origin}/#about-faq`,
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
});

/* ============================================================
   4. Hook: شمارش انیمیشنی
   ============================================================ */
const useCountUp = (target: number, duration = 1600, start = false) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let rafId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return value;
};

/* ============================================================
   5. Component
   ============================================================ */
export const AboutSection: React.FC<Props> = ({ onOpenAssessment }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const sectionId = useId();

  /* انیمیشن ورود */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const years = useCountUp(10, 1400, visible);
  const cases = useCountUp(2000, 1800, visible);
  const lawyers = useCountUp(35, 1400, visible);

  const jsonLd = useMemo(() => generateSchema(), []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby={`${sectionId}-heading`}
      dir="rtl"
      className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-[#f8fafc] via-[#edf2f7] to-[#f8fafc] py-20 text-slate-800 sm:py-24"
    >
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Background effects */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-10 top-1/3 h-80 w-80 rounded-full bg-[#f5a623]/5 blur-[140px]" />
        <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-cyan-500/5 blur-[130px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-6xl space-y-10">
          {/* ============================================================
              SECTION A: کارت اصلی (هویت + توضیحات)
             ============================================================ */}
          <div
            className={`grid items-stretch gap-8 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-700 ease-out sm:p-10 lg:grid-cols-12 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            {/* ستون راست: توضیحات + آمار */}
            <div className="order-2 flex flex-col items-start text-right lg:order-1 lg:col-span-7">
              <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-800 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                <span>درباره هلدینگ مهاجرتی دیاکو</span>
              </div>

              <h2
                id={`${sectionId}-heading`}
                className="mt-4 text-2xl font-black leading-tight text-[#082833] sm:text-3xl md:text-4xl"
              >
                یک دهه تخصص، همراهی مستمر و اعتماد ۲,۰۰۰+ متقاضی
              </h2>

              {/* Answer-First برای AI Overviews */}
              <p className="answer-first speakable-summary mt-4 rounded-2xl border border-amber-200/70 bg-amber-50/60 p-4 text-sm leading-7 text-slate-800">
                <strong className="text-amber-800">خلاصه:</strong> هلدینگ مهاجرتی دیاکو
                (Diaco Immigration Holding) از سال <strong>۱۳۹۴ (۲۰۱۵)</strong> در حوزه اقامت،
                ویزا و سرمایه‌گذاری در اروپا فعالیت می‌کند. با{' '}
                <strong>۲,۰۰۰+ پرونده موفق</strong>، <strong>۳۵ وکیل بین‌المللی</strong> و دفاتر
                فعال در <strong>وین، آتن و تهران</strong>، دیاکو یکی از معتبرترین هلدینگ‌های
                مهاجرتی ایران با تمرکز تخصصی روی ۱۱ کشور اروپایی است.
              </p>

              <div className="mt-4 space-y-3 text-justify text-sm leading-7 text-slate-600">
                <p>
                  هلدینگ بین‌المللی دیاکو با بیش از یک دهه تجربه مستمر در امور مهاجرتی، اقامتی و
                  سرمایه‌گذاری در اروپا، با همکاری <strong className="text-amber-700">۳۵ وکیل
                  رسمی و مشاور بین‌المللی</strong>، بستری امن و مطمئن برای تحقق اهداف مهاجرتی
                  هموطنان فراهم کرده است.
                </p>
                <p>
                  تفاوت بنیادین دیاکو این است که پرونده شما{' '}
                  <strong className="text-amber-700">هرگز به واسطه‌ها واگذار نمی‌شود</strong>؛
                  بلکه از گام نخست ارزیابی و عقد قرارداد رسمی تا تحویل فیزیکی کارت اقامت در
                  اداره مهاجرت کشور مقصد و خدمات پس از ورود (ثبت اقامت، افتتاح حساب بانکی،
                  دریافت کد مالیاتی)، تمامی مراحل مستقیماً توسط وکلای مقیم کشورهای اروپایی
                  پیگیری می‌شود.
                </p>
              </div>

              {/* آمار با شمارش انیمیشنی */}
              <div className="mt-6 grid w-full grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-4">
                {[
                  { icon: Award, label: 'سابقه فعالیت', value: `+${years} سال`, note: 'از ۱۳۹۴' },
                  { icon: FileCheck2, label: 'پرونده موفق', value: `+${cases.toLocaleString('fa-IR')}`, note: 'تأییدشده' },
                  { icon: Users, label: 'وکلای بین‌المللی', value: `+${lawyers} وکیل`, note: 'مقیم اروپا' },
                  { icon: Globe, label: 'کشورهای فعال', value: '۱۱ کشور', note: 'اروپا و شنگن' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      style={{ transitionDelay: `${idx * 80}ms` }}
                      className={`rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-[#f5a623]/60 hover:bg-white ${
                        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                      }`}
                    >
                      <Icon className="mx-auto h-5 w-5 text-[#f5a623]" aria-hidden="true" />
                      <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">{item.label}</p>
                      <p className="mt-0.5 text-xs font-black text-[#f5a623] sm:text-sm">
                        {item.value}
                      </p>
                      <p className="mt-0.5 text-[9px] text-slate-400">{item.note}</p>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="mt-7 flex w-full flex-wrap items-center gap-3">
                <a
                  href="https://www.dia-co.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="وب‌سایت رسمی هلدینگ مهاجرتی دیاکو"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3 text-xs font-black text-[#082833] shadow-md transition hover:scale-105 active:scale-95 sm:text-sm"
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                  <span>وب‌سایت رسمی dia-co.ir</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </a>

                {onOpenAssessment && (
                  <button
                    type="button"
                    onClick={onOpenAssessment}
                    className="inline-flex items-center gap-2 rounded-2xl bg-cyan-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:scale-105 hover:bg-cyan-500 active:scale-95 sm:text-sm"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    شروع ارزیابی آنلاین
                  </button>
                )}

                <a
                  href={`tel:${BRAND.phone.replace(/-/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-slate-100 px-5 py-3 text-xs font-bold text-slate-700 transition hover:border-[#f5a623]/50 hover:bg-slate-200 sm:text-sm"
                >
                  <Phone className="h-4 w-4 text-[#f5a623]" aria-hidden="true" />
                  تماس: {BRAND.phoneDisplay}
                </a>
              </div>

              <p className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-500">
                <Clock className="h-3 w-3" aria-hidden="true" />
                پاسخ‌گویی: شنبه تا پنجشنبه، ۹ صبح الی ۷ عصر (به وقت تهران)
              </p>
            </div>

            {/* ستون چپ: کارت هویت برند */}
            <div className="order-1 lg:order-2 lg:col-span-5">
              <div className="group relative h-full w-full overflow-hidden rounded-3xl border-2 border-[#164353] bg-[#0c2e3b] p-6 text-center shadow-lg transition-all duration-500 hover:border-[#f5a623]/60">
                <div
                  aria-hidden="true"
                  className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#f5a623]/15 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                />

                <div className="relative mx-auto mb-4 flex justify-center">
                  <DiacoLogo size={70} />
                </div>

                <div className="relative mb-3 inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[11px] font-bold text-emerald-300">
                    دفاتر فعال در وین، آتن و تهران
                  </span>
                </div>

                <h3 className="relative text-lg font-black text-white">
                  هلدینگ مهاجرتی دیاکو
                </h3>
                <p className="relative mt-1 text-xs font-semibold text-amber-300/90">
                  بزرگ‌ترین مجموعه تخصصی اقامت اتریش و شنگن
                </p>

                {/* دفاتر با تصویر */}
                <ul className="relative mt-5 space-y-2 border-t border-white/10 pt-4 text-right">
                  {OFFICES.map((office) => (
                    <li
                      key={office.country}
                      className={`flex items-start gap-2 rounded-lg p-2 transition ${
                        office.highlight
                          ? 'border border-[#f5a623]/25 bg-[#f5a623]/10'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <span className="mt-0.5 text-base leading-none" aria-hidden="true">
                        {office.flag}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold text-white">
                          {office.country} — {office.city}
                        </p>
                        <p
                          className="mt-0.5 text-[10px] text-slate-400 ltr:text-left"
                          dir="ltr"
                        >
                          {office.address}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* نشان‌های اعتماد */}
                <div className="relative mt-5 flex flex-wrap items-center justify-center gap-1.5 border-t border-white/10 pt-4">
                  {[
                    'رسمی ✓',
                    'GDPR 🛡️',
                    'وکلای اتریش ⚖️',
                    'ISO 9001',
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-slate-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
              SECTION B: جدول مقایسه (AI-friendly)
             ============================================================ */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#f5a623]" aria-hidden="true" />
              <h3 className="text-lg font-black text-[#082833]">
                چرا دیاکو؟ مقایسه با مؤسسات متداول
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-right text-xs">
                <caption className="sr-only">
                  مقایسه هلدینگ مهاجرتی دیاکو با مؤسسات مهاجرتی متداول
                </caption>
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                    <th scope="col" className="rounded-r-lg p-3 font-black">
                      ویژگی
                    </th>
                    <th scope="col" className="p-3 font-black text-[#f5a623]">
                      هلدینگ دیاکو
                    </th>
                    <th scope="col" className="rounded-l-lg p-3 font-black">
                      مؤسسه متداول
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="transition hover:bg-amber-50/30">
                      <td className="p-3 font-bold text-[#082833]">{row.feature}</td>
                      <td className="p-3 font-black text-emerald-700">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                          {row.diaco}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{row.typical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================
              SECTION C: نقاط تمایز (Trust Points) با آیکون
             ============================================================ */}
          <div className="grid gap-3 sm:grid-cols-2">
            {TRUST_POINTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-[#f5a623]/60 hover:shadow-md"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f5a623]/10 text-[#f5a623]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#082833]">{item.title}</p>
                    <p className="mt-1 text-[11px] leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============================================================
              SECTION D: مقاله — دفاتر بین‌المللی با تصاویر
             ============================================================ */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#f5a623]" aria-hidden="true" />
              <h3 className="text-lg font-black text-[#082833]">
                دفاتر بین‌المللی دیاکو: وین، آتن و تهران
              </h3>
            </div>
            <p className="mb-6 text-sm leading-7 text-justify text-slate-600">
              یکی از تفاوت‌های اساسی دیاکو با سایر مؤسسات، حضور فیزیکی و رسمی در کشورهای مقصد است.
              این حضور به ما امکان می‌دهد پرونده شما را مستقیماً در اداره مهاجرت اتریش
              (MA35)، اداره مهاجرت یونان و سایر مراجع ذیصلاح پیگیری کنیم — بدون نیاز به
              واسطه یا دفتر محلی.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {OFFICES.map((office) => (
                <figure
                  key={office.country}
                  className="m-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={office.image}
                      alt={office.imageAlt}
                      width={800}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <figcaption className="p-3">
                    <div className="flex items-center gap-1.5">
                      <span aria-hidden="true">{office.flag}</span>
                      <p className="text-xs font-black text-[#082833]">
                        {office.country} — {office.city}
                      </p>
                    </div>
                    <p
                      className="mt-1 text-[10px] text-slate-500 ltr:text-left"
                      dir="ltr"
                    >
                      {office.address}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-4 text-[11px] leading-6 text-slate-500">
              <strong className="text-amber-700">نکته:</strong> دفتر وین (اتریش) به‌عنوان
              دفتر مرکزی هلدینگ عمل می‌کند و پیگیری مستقیم پرونده‌های اتریش، آلمان و
              هلند از آنجا انجام می‌شود. دفتر آتن مسئول پرونده‌های یونان، ایتالیا و
              قبرس است. دفتر تهران پذیرش اولیه، ارزیابی و هماهنگی مدارک را بر عهده دارد.
            </p>
          </div>

          {/* ============================================================
              SECTION E: مقاله درباره رویکرد دیاکو
             ============================================================ */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <header className="mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#f5a623]" aria-hidden="true" />
                <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black text-amber-700">
                  مقاله تحلیلی
                </span>
              </div>
              <h3 className="mt-3 text-xl font-black leading-tight text-[#082833] sm:text-2xl">
                رویکرد دیاکو به مهاجرت: چرا «وکیل مقیم» با «واسطه» تفاوت بنیادین دارد؟
              </h3>
              <p className="mt-2 text-xs text-slate-500">
                تحلیل ۱۰ ساله از ۲,۰۰۰ پرونده موفق — توسط دپارتمان حقوقی دیاکو
              </p>
            </header>

            <div className="prose prose-slate max-w-none space-y-4 text-justify text-sm leading-7 text-slate-700">
              <p>
                <strong className="text-[#082833]">سؤال کلیدی:</strong> وقتی در ایران با یک
                مؤسسه مهاجرتی قرارداد می‌بندید، پرونده شما در کشور مقصد توسط چه کسی پیگیری
                می‌شود؟ این سؤال، تفاوت بین «موفقیت» و «رد پرونده» را مشخص می‌کند. در بازار
                ایران، سه مدل خدمت‌رسانی رایج است:
              </p>

              <ul className="space-y-2 pr-6">
                <li className="relative">
                  <span className="absolute right-0 top-2 h-1.5 w-1.5 rounded-full bg-red-400" />
                  <strong className="text-[#082833]">مدل واسطه:</strong> مؤسسه ایرانی مدارک را
                  جمع می‌کند و به یک «همکار» در اروپا می‌فرستد. این همکار ممکن است وکیل
                  رسمی نباشد یا حتی وجود خارجی نداشته باشد. پرونده شما در صف طولانی
                  انتظار قرار می‌گیرد و در صورت رد شدن، هیچ‌کس مسئولیت نمی‌پذیرد.
                </li>
                <li className="relative">
                  <span className="absolute right-0 top-2 h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <strong className="text-[#082833]">مدل دفتر محلی + همکار:</strong> مؤسسه
                  ایرانی با یک دفتر همکار در اروپا قرارداد دارد. کیفیت خدمت بسته به آن
                  همکار است و کنترل کیفیت وجود ندارد.
                </li>
                <li className="relative">
                  <span className="absolute right-0 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <strong className="text-[#082833]">مدل دیاکو:</strong> وکیل رسمی مقیم اروپا
                  (Rechtsanwalt در اتریش، Avocat در فرانسه، Abogado در اسپانیا، Δικηγόρος
                  در یونان) که مجوز فعالیت در کشور مقصد را دارد، شخصاً پرونده شما را از
                  ثبت تا تحویل کارت اقامت پیگیری می‌کند. ارتباط مستقیم، بدون واسطه.
                </li>
              </ul>

              <p>
                <strong className="text-[#082833]">چرا این تفاوت مهم است؟</strong> اداره مهاجرت
                اتریش (MA35) و اداره مهاجرت یونان، پرونده‌های ارسالی توسط وکلای رسمی را
                با استاندارد بالاتری بررسی می‌کنند. یک وکیل مقیم، دارای امضای الکترونیکی
                رسمی (Bürgerkarte / ID Austria) است و می‌تواند مستقیماً در سامانه‌های
                دولتی اقدام کند. یک واسطه، فقط می‌تواند از طریق ایمیل یا پست درخواست
                بدهد — که در ۹۰٪ موارد به تأخیر یا رد منجر می‌شود.
              </p>

              <blockquote className="my-4 rounded-2xl border-r-4 border-[#f5a623] bg-amber-50/60 p-4 text-sm italic">
                <Quote className="mb-2 h-4 w-4 text-[#f5a623]" aria-hidden="true" />
                «در ۱۰ سال گذشته، بیش از ۳۰۰ پرونده‌ای که توسط واسطه‌ها نیمه‌کاره رها شده
                بود را نجات دادیم. در ۸۵٪ موارد، مشکل اصلی این بود که پرونده توسط
                شخصی که مجوز رسمی نداشت پیگیری شده بود.»
                <footer className="mt-2 text-[11px] font-bold not-italic text-amber-800">
                  — دپارتمان حقوقی دیاکو، وین، ۲۰۲۵
                </footer>
              </blockquote>

              <p>
                <strong className="text-[#082833]">پس چه چیزی را باید بررسی کنید؟</strong>{' '}
                قبل از هر پرداختی، سه سؤال بپرسید:
              </p>
              <ol className="space-y-1 pr-6">
                <li>
                  شماره ثبت وکیل در کانون وکلای کشور مقصد چیست؟ (در اتریش:{' '}
                  <span dir="ltr" className="font-mono text-xs">rechtsanwaelte.at</span>)
                </li>
                <li>آیا وکیل، مجوز امضای الکترونیکی رسمی دارد؟</li>
                <li>در قرارداد، دقیقاً چه کسی مسئولیت پیگیری را بر عهده دارد؟</li>
              </ol>
              <p>
                اگر پاسخ این سه سؤال روشن و مکتوب نبود، به آن مؤسسه اعتماد نکنید — حتی
                اگر تعرفه‌اش پایین‌تر باشد.
              </p>

              <p>
                در دیاکو، پاسخ هر سه سؤال از روز اول روشن است و در قرارداد رسمی درج
                می‌شود. برای همین، می‌توانیم با اطمینان بگوییم:{' '}
                <strong className="text-[#082833]">
                  پرونده شما هرگز به واسطه واگذار نمی‌شود.
                </strong>
              </p>
            </div>
          </article>

          {/* ============================================================
              SECTION F: FAQ
             ============================================================ */}
          <div
            itemScope
            itemType="https://schema.org/FAQPage"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="mb-5 flex items-center gap-2">
              <Info className="h-5 w-5 text-[#f5a623]" aria-hidden="true" />
              <h3 className="text-lg font-black text-[#082833]">
                پرسش‌های متداول درباره دیاکو
              </h3>
            </div>

            <div className="space-y-2.5">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={faq.q}
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                  >
                    <h4 className="m-0">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-right text-xs font-bold text-[#082833] transition hover:bg-white sm:text-sm"
                      >
                        <span itemProp="name">{faq.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-180 text-[#f5a623]' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h4>
                    {isOpen && (
                      <div
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                        className="border-t border-slate-200 bg-white px-4 pb-4 pt-3 text-justify text-xs leading-7 text-slate-600"
                      >
                        <div itemProp="text">{faq.a}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================================
              SECTION G: CTA نهایی
             ============================================================ */}
          <div className="rounded-3xl border border-[#082833]/10 bg-gradient-to-l from-[#082833] to-[#0c2e3b] p-6 text-center text-white shadow-lg sm:p-8">
            <Sparkles className="mx-auto mb-3 h-8 w-8 text-[#f5a623]" aria-hidden="true" />
            <h3 className="text-xl font-black sm:text-2xl">
              آماده‌اید پرونده خود را با وکلای مقیم اروپا شروع کنید؟
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-slate-300 sm:text-sm">
              ارزیابی اولیه رایگان است. پس از تکمیل فرم، کارشناسان دیاکو ظرف ۲۴ ساعت با
              شما تماس می‌گیرند و جلسه مشاوره با وکیل مقیم کشور مقصد را هماهنگ می‌کنند.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {onOpenAssessment && (
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3 text-xs font-black text-[#082833] shadow-lg transition hover:scale-105 sm:text-sm"
                >
                  شروع ارزیابی رایگان
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
              <a
                href={`tel:${BRAND.phone.replace(/-/g, '')}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/20 sm:text-sm"
              >
                <Phone className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                تماس مستقیم: {BRAND.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;