import OptimizedImage from '../../OptimizedImage';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  CheckCircle2, Clock, ArrowRight, ChevronDown, PhoneCall,
  Check, Copy, Sparkles, BookOpen, Briefcase, Award,
  Euro, Wallet, Users, FileText, AlertTriangle,
  ShieldCheck, Landmark, MapPin, Plane, GraduationCap,
  Timer, TrendingUp, Percent, Receipt, Home, HeartPulse,
  Coffee, TrainFront, Globe, Scale, Info, ArrowUp,
  List, X, Quote, Languages, Sun, Bike, Building,
  Utensils, Wifi, Bus, Music, Palette, Star, Calendar,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ============================================================
   2026 官方数据
   ============================================================ */
const IND_2026 = {
  monthly: 1130.77,
  yearly12m: 13569.24,
  yearly6m: 6784.62,
  permitFee: 254,
  workHoursPerWeek: 16,
  zoekjaarSalary: 3122,
} as const;

const TUITION = {
  '6m': 5400,
  '12m': 9800,
} as const;

const TOC_ITEMS = [
  { id: 'hero', label: 'چرا هلند؟' },
  { id: 'costs', label: 'هزینه‌ها و تمکن ۲۰۲۶' },
  { id: 'cities', label: 'مقایسه ۴ شهر' },
  { id: 'courses', label: 'انواع دوره زبان' },
  { id: 'visa', label: 'ویزا و MVV' },
  { id: 'work', label: 'کار دانشجویی' },
  { id: 'zoekjaar', label: 'Zoekjaar' },
  { id: 'story', label: 'داستان واقعی' },
  { id: 'faq', label: 'پرسش‌های متداول' },
];

/* ============================================================
   城市数据
   ============================================================ */
const CITIES = [
  {
    id: 'amsterdam',
    name: 'آمستردام',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80',
    alt: 'آمستردام هلند - کانال‌ها و دوچرخه، مقصد دوره زبان انگلیسی',
    rent: '€۸۵۰ – €۱,۲۰۰',
    vibe: 'پایتخت بین‌المللی، بازار کار بزرگ، انگلیسی‌زبان‌ترین',
    pros: ['بزرگ‌ترین بازار کار', 'دانشگاه‌های برتر', 'زندگی اجتماعی'],
    cons: ['گران‌ترین شهر', 'رقابت شدید مسکن', 'شلوغ'],
  },
  {
    id: 'rotterdam',
    name: 'روتردام',
    image: 'https://images.unsplash.com/photo-1585218356057-dc0e3184ca64?auto=format&fit=crop&w=800&q=80',
    alt: 'روتردام هلند - معماری مدرن و بندر، تحصیل ارزان‌تر',
    rent: '€۶۵۰ – €۹۵۰',
    vibe: 'شهر مدرن، بندر بزرگ، فرصت‌های لجستیک و تجارت',
    pros: ['ارزان‌تر از آمستردام', 'معماری مدرن', 'فرصت‌های شغلی'],
    cons: ['فضای کمتر کلاسیک', 'آب‌وهوای بادی'],
  },
  {
    id: 'utrecht',
    name: 'اوترخت',
    image: 'https://images.unsplash.com/photo-1596546851792-eb27e26b2033?auto=format&fit=crop&w=800&q=80',
    alt: 'اوترخت هلند - دانشگاه و کانال تاریخی، شهر دانشجویی',
    rent: '€۷۰۰ – €۱,۰۰۰',
    vibe: 'شهر دانشگاهی، مرکز هلند، تعادل بین آرامش و دسترسی',
    pros: ['دانشگاه بزرگ', 'مرکز جغرافیایی', 'فضای دانشجویی'],
    cons: ['بازار کار متوسط'],
  },
  {
    id: 'groningen',
    name: 'خرونینگن',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80',
    alt: 'خرونینگن هلند - شهر دانشجویی شمالی، ارزان‌ترین گزینه',
    rent: '€۵۰۰ – €۷۵۰',
    vibe: 'ارزان‌ترین شهر دانشجویی، فضای صمیمی و امن',
    pros: ['ارزان‌ترین اجاره', 'فضای دانشجویی', 'دوچرخه‌روی'],
    cons: ['دور از مرکز', 'بازار کار کوچک‌تر'],
  },
];

/* ============================================================
   生活成本明细
   ============================================================ */
const LIVING_COSTS = [
  { icon: Home, label: 'اجاره اتاق (WG)', value: '€۵۰۰ – €۹۰۰', color: 'text-orange-400' },
  { icon: Utensils, label: 'خوراک', value: '€۲۰۰ – €۳۰۰', color: 'text-emerald-400' },
  { icon: HeartPulse, label: 'بیمه درمانی', value: '€۵۰ – €۱۲۰', color: 'text-rose-400' },
  { icon: Bike, label: 'دوچرخه / حمل‌ونقل', value: '€۱۵ – €۶۰', color: 'text-sky-400' },
  { icon: Wifi, label: 'اینترنت و موبایل', value: '€۳۰ – €۵۰', color: 'text-purple-400' },
  { icon: Coffee, label: 'تفریح و زندگی', value: '€۱۰۰ – €۲۰۰', color: 'text-amber-400' },
];

export const LanguageNetherlandsPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [programLength, setProgramLength] = useState<'6m' | '12m'>('12m');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [tocOpen, setTocOpen] = useState(false);
  const [activeCity, setActiveCity] = useState('amsterdam');
  const articleRef = useRef<HTMLDivElement>(null);

  /* ============================================================
     SEO + AIO
     ============================================================ */
  useSeo({
    title: 'دوره زبان هلند ۲۰۲۶ | تمکن €۱,۱۳۰ و ویزای MVV',
    description:
      'راهنمای کامل دوره زبان و فاندیشن هلند ۲۰۲۶: تمکن IND €۱,۱۳۰.۷۷/ماه، شهریه €۵,۴۰۰–۹,۸۰۰، کار ۱۶ ساعت، Zoekjaar با حقوق €۳,۱۲۲، مقایسه ۴ شهر و داستان واقعی دانشجو. ارزیابی رایگان با دیاکو.',
    canonical: '/guides/language-course-netherlands',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'دوره زبان هلند ۲۰۲۶', 'تمکن مالی IND €۱۱۳۰', 'ویزای دانشجویی MVV هلند',
      'Zoekjaar حقوق €۳۱۲۲', 'فاندیشن هلند', 'کار دانشجویی ۱۶ ساعت هلند',
      'تحصیل انگلیسی آمستردام', 'هزینه زندگی هلند', 'دانشگاه‌های هلند',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/language-course-netherlands#article',
          headline: 'راهنمای جامع دوره زبان و فاندیشن هلند ۲۰۲۶: تمکن €۱,۱۳۰ و مسیر Zoekjaar',
          description:
            'راهنمای کامل دوره‌های آمادگی زبان انگلیسی در هلند، تمکن مالی IND (€۱,۱۳۰.۷۷/ماه)، اجازه کار ۱۶ ساعت، مسیر Zoekjaar با حقوق €۳,۱۲۲، مقایسه ۴ شهر و داستان واقعی.',
          image: [
            'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1585218356057-dc0e3184ca64?auto=format&fit=crop&w=1200&q=80',
          ],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' },
          },
          datePublished: '2026-01-01',
          dateModified: '2026-10-25',
          inLanguage: 'fa-IR',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', '.speakable-summary', '.speakable-cost'],
          },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/language-course-netherlands#howto',
          name: 'مراحل پذیرش دوره زبان و ویزای هلند ۲۰۲۶',
          description: 'از پذیرش مشروط تا دریافت MVV و کارت اقامت',
          totalTime: 'P6M',
          estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: '5400' },
          step: [
            { '@type': 'HowToStep', position: 1, name: 'اخذ پذیرش مشروط', text: 'پذیرش در دوره Foundation یا Preparatory Year از دانشگاه هلندی.' },
            { '@type': 'HowToStep', position: 2, name: 'اثبات تمکن مالی €۱۳,۵۶۹', text: 'واریز شهریه + هزینه زندگی ۱۲ ماهه به حساب دانشگاه.' },
            { '@type': 'HowToStep', position: 3, name: 'درخواست MVV توسط دانشگاه', text: 'دانشگاه از IND درخواست می‌کند؛ پردازش ۲-۴ هفته.' },
            { '@type': 'HowToStep', position: 4, name: 'دریافت ویزا و ورود', text: 'برچسب MVV در سفارت + دریافت کارت اقامت پس از ورود.' },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/language-course-netherlands#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'تمکن مالی IND هلند در ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای دانشجویان دانشگاه و HBO، IND مبلغ €۱,۱۳۰.۷۷ در ماه (€۱۳,۵۶۹.۲۴ برای ۱۲ ماه) را الزامی کرده است. این مبلغ جدا از شهریه است و باید به حساب دانشگاه واریز شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'دانشجو در هلند چقدر می‌تواند کار کند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '۱۶ ساعت در هفته در طول سال تحصیلی، یا کار تمام‌وقت فقط در ماه‌های ژوئن، جولای و آگوست. کارفرما باید مجوز TWV داشته باشد.',
              },
            },
            {
              '@type': 'Question',
              name: 'Zoekjaar چیست و چه حقوقی دارد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Zoekjaar اقامت ۱ ساله جستجوی کار پس از فارغ‌التحصیلی است. حداقل حقوق برای تبدیل به Highly Skilled Migrant در ۲۰۲۶: €۳,۱۲۲ ناخالص در ماه.',
              },
            },
            {
              '@type': 'Question',
              name: 'آرزان‌ترین شهر دانشجویی هلند کدام است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خرونینگن با اجاره €۵۰۰–۷۵۰ در ماه ارزان‌ترین است. روتردام (€۶۵۰–۹۵۰) و اوترخت (€۷۰۰–۱,۰۰۰) در رتبه‌های بعدی هستند. آمستردام گران‌ترین (€۸۵۰–۱,۲۰۰) است.',
              },
            },
            {
              '@type': 'Question',
              name: 'ویزای همراه برای دوره زبان صادر می‌شود؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای دوره زبان مقدماتی (Foundation) معمولاً ویزای همراه صادر نمی‌شود. پس از ورود به مقطع اصلی (لیسانس یا ارشد)، همسر و فرزندان می‌توانند برای الحاق خانواده درخواست دهند.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا مدرک Nuffic الزامی است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nuffic ارزیابی رسمی مدرک ارائه می‌دهد اما از نظر قانونی الزام‌آور نیست. برخی دانشگاه‌ها آن را درخواست می‌کنند و برخی نه — از دانشگاه مقصد استعلام بگیرید.',
              },
            },
          ],
        },
      ],
    },
  });

  /* ============================================================
     Scroll progress + active section
     ============================================================ */
  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setReadingProgress(total > 0 ? (scrolled / total) * 100 : 0);

      const sections = TOC_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.getBoundingClientRect().top <= 120) {
          setActiveSection(TOC_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ============================================================
     Calculator
     ============================================================ */
  const calc = useMemo(() => {
    const tuition = TUITION[programLength];
    const indLiving = programLength === '12m' ? IND_2026.yearly12m : IND_2026.yearly6m;
    const workIncomeYearly = programLength === '12m'
      ? Math.round(IND_2026.workHoursPerWeek * 4.33 * 12 * 14.71)
      : Math.round(IND_2026.workHoursPerWeek * 4.33 * 6 * 14.71);
    return { tuition, indLiving, workIncomeYearly };
  }, [programLength]);

  const activeCityData = CITIES.find((c) => c.id === activeCity) || CITIES[0];

  const DOCUMENTS = [
    { id: 'doc-1', title: 'نامه پذیرش مشروط از دانشگاه هلند', desc: 'شامل دوره Foundation/Preparatory و برنامه تحصیلی اصلی.' },
    { id: 'doc-2', title: 'مدرک آیلتس (حداقل ۵.۰ برای ۱۲ ماه / ۵.۵+ برای ۶ ماه)', desc: 'برای تعیین سطح و طول دوره.' },
    { id: 'doc-3', title: 'اثبات تمکن مالی €۱۳,۵۶۹ (۱۲ ماه) یا €۶,۷۸۵ (۶ ماه)', desc: 'واریز به حساب دانشگاه طبق دستورالعمل IND.' },
    { id: 'doc-4', title: 'ترجمه رسمی دیپلم و ریزنمرات', desc: 'Nuffic اختیاری است و به دانشگاه بستگی دارد.' },
    { id: 'doc-5', title: 'پاسپورت با حداقل ۲ سال اعتبار', desc: 'برای درج ویزای MVV.' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(DOCUMENTS.map((d, i) => `${i + 1}. ${d.title}\n   ${d.desc}`).join('\n\n'));
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTocOpen(false);
  };

  const FAQS = [
    { q: 'تمکن مالی IND هلند در ۲۰۲۶ چقدر است؟', a: 'برای دانشگاه و HBO: €۱,۱۳۰.۷۷ در ماه (€۱۳,۵۶۹.۲۴ برای ۱۲ ماه). این مبلغ جدا از شهریه است.' },
    { q: 'دانشجو در هلند چقدر می‌تواند کار کند؟', a: '۱۶ ساعت در هفته در طول سال تحصیلی، یا تمام‌وقت در ژوئن-آگوست. کارفرما باید مجوز TWV داشته باشد.' },
    { q: 'Zoekjaar چیست و چه حقوقی دارد؟', a: 'اقامت ۱ ساله جستجوی کار. حداقل حقوق برای تبدیل به Highly Skilled Migrant در ۲۰۲۶: €۳,۱۲۲ ناخالص در ماه.' },
    { q: 'آرزان‌ترین شهر دانشجویی هلند کدام است؟', a: 'خرونینگن (€۵۰۰–۷۵۰)، سپس روتردام (€۶۵۰–۹۵۰)، اوترخت (€۷۰۰–۱,۰۰۰) و آمستردام (€۸۵۰–۱,۲۰۰).' },
    { q: 'ویزای همراه برای دوره زبان صادر می‌شود؟', a: 'برای دوره زبان مقدماتی معمولاً نه؛ پس از ورود به مقطع اصلی (لیسانس/ارشد) بله.' },
    { q: 'آیا Nuffic الزامی است؟', a: 'ارزیابی Nuffic از نظر قانونی الزام‌آور نیست؛ برخی دانشگاه‌ها آن را می‌خواهند و برخی نه.' },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#081e26] text-slate-100 font-sans pb-20">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/20">
        <div className="h-full bg-gradient-to-l from-orange-400 to-amber-500 transition-[width] duration-150" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* Navigation */}
      <div className="bg-[#05171e] border-b border-white/10 py-3 px-4 md:px-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <button type="button" onClick={onBackToHome} className="text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1 cursor-pointer">
              صفحه اصلی دیاکو
            </button>
            <span>/</span><span>دوره‌های زبان</span><span>/</span>
            <span className="text-white font-semibold">دوره زبان هلند ۲۰۲۶</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { key: 'ausbildung-germany', label: '🇩🇪 آوسبیلدونگ' },
              { key: 'language-spain', label: '🇪🇸 اسپانیا' },
              { key: 'language-france', label: '🇫🇷 فرانسه' },
            ].map((d) => (
              <button key={d.key} type="button" onClick={() => onNavigateToCountry?.(d.key)} className="rounded-lg px-2.5 py-1 text-[11px] font-medium transition cursor-pointer bg-white/5 hover:bg-white/15 text-slate-300">
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile TOC */}
      <div className="lg:hidden fixed bottom-20 left-4 z-40">
        <button type="button" onClick={() => setTocOpen(!tocOpen)} className="h-11 w-11 rounded-full bg-orange-500 text-white shadow-lg grid place-items-center cursor-pointer" aria-label="فهرست مطالب">
          {tocOpen ? <X size={20} /> : <List size={20} />}
        </button>
        {tocOpen && (
          <div className="absolute bottom-14 left-0 w-56 rounded-2xl bg-[#0e2a35] border border-white/15 p-2 shadow-2xl">
            {TOC_ITEMS.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollTo(item.id)} className={`block w-full text-right rounded-lg px-3 py-2 text-[11px] font-bold transition ${activeSection === item.id ? 'bg-orange-500 text-white' : 'text-slate-300 hover:bg-white/10'}`}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop TOC */}
      <aside className="hidden lg:block fixed top-28 left-8 w-56 z-30">
        <div className="rounded-2xl border border-white/10 bg-[#0e2a35]/90 backdrop-blur p-3">
          <div className="flex items-center gap-1.5 px-2 pb-2 mb-1 border-b border-white/10 text-[10px] font-bold text-slate-400">
            <List size={12} /> فهرست مطالب
          </div>
          {TOC_ITEMS.map((item) => (
            <button key={item.id} type="button" onClick={() => scrollTo(item.id)} className={`block w-full text-right rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition ${activeSection === item.id ? 'bg-orange-500/20 text-orange-300' : 'text-slate-400 hover:text-white'}`}>
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      <article ref={articleRef} className="lg:pr-64">
        {/* ============================================================
            1. HERO
           ============================================================ */}
        <section id="hero" className="relative overflow-hidden pt-8 pb-14 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> دوره زبان و فاندیشن هلند ۲۰۲۶
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                    تمکن IND: €۱,۱۳۰.۷۷/ماه
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                  دوره زبان انگلیسی و فاندیشن در هلند
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-amber-300 via-yellow-300 to-orange-300">
                    مسیر MVV، کار دانشجویی و Zoekjaar
                  </span>
                </h1>

                <div data-ai-answer className="speakable-summary rounded-2xl bg-[#0e2a35] border border-orange-500/30 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg">
                  <div className="font-bold text-orange-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" /> خلاصه شفاف ۲۰۲۶:
                  </div>
                  تمکن مالی IND برای ۱۲ ماه <strong className="text-amber-300">€۱۳,۵۶۹.۲۴</strong> (€۱,۱۳۰.۷۷/ماه) است — جدا از شهریه. دانشجو می‌تواند <strong className="text-white">۱۶ ساعت در هفته</strong> کار کند (یا تابستان تمام‌وقت). پس از فارغ‌التحصیلی، <strong className="text-emerald-300">Zoekjaar</strong> یک سال اقامت می‌دهد و حقوق لازم برای تبدیل به کارت کاری فقط <strong className="text-emerald-300">€۳,۱۲۲/ماه</strong> است.
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button type="button" onClick={onOpenAssessment} className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition flex items-center gap-2 cursor-pointer">
                    <Award className="w-4 h-4" /> ارزیابی رایگان پذیرش هلند
                  </button>
                  <a href="tel:+982191693955" className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-orange-400" /> ۰۲۱۹۱۶۹۳۹۵۵
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80"
                    srcSet="https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80 1200w"
                    sizes="(max-width: 768px) 100vw, 500px"
                    alt="دوره زبان و فاندیشن هلند ۲۰۲۶ — دانشگاه‌های آمستردام"
                    width={1200} height={675} loading="eager" fetchPriority="high" decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-60" />
                  <figcaption className="absolute bottom-3 right-3 left-3 bg-[#081e26]/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                    <span>محیط ۱۰۰٪ انگلیسی‌زبان</span>
                    <span className="text-orange-400 font-bold">تمکن €۱,۱۳۰/ماه</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. COSTS
           ============================================================ */}
        <section id="costs" className="py-12 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-orange-400" />
              هزینه‌ها و تمکن مالی ۲۰۲۶: اعداد دقیق IND
            </h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              برخلاف بسیاری از منابع قدیمی که از «€۱۲,۰۰۰» صحبت می‌کنند، نرخ رسمی IND برای ۲۰۲۶ افزایش یافته است.
            </p>

            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 mb-6">
              <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-xl bg-black/40 p-1 border border-white/10">
                  <button type="button" onClick={() => setProgramLength('6m')} className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${programLength === '6m' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>دوره ۶ ماهه</button>
                  <button type="button" onClick={() => setProgramLength('12m')} className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${programLength === '12m' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>دوره ۱۲ ماهه</button>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 bg-black/30 rounded-2xl p-5 border border-white/10">
                <div className="text-center sm:border-l border-white/10 sm:pl-3">
                  <span className="text-[11px] text-slate-400 block">شهریه دوره</span>
                  <span className="speakable-cost text-xl sm:text-2xl font-black text-orange-400 block mt-1">€{calc.tuition.toLocaleString('fa-IR')}</span>
                </div>
                <div className="text-center sm:border-l border-white/10 sm:pl-3">
                  <span className="text-[11px] text-slate-400 block">تمکن IND ({programLength === '12m' ? '۱۲' : '۶'} ماه)</span>
                  <span className="speakable-cost text-xl sm:text-2xl font-black text-amber-300 block mt-1">€{calc.indLiving.toLocaleString('fa-IR', { maximumFractionDigits: 0 })}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">€{IND_2026.monthly}/ماه</span>
                </div>
                <div className="text-center">
                  <span className="text-[11px] text-slate-400 block">درآمد بالقوه کار</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 block mt-1">≈ €{calc.workIncomeYearly.toLocaleString('fa-IR')}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">۱۶ ساعت/هفته</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-amber-500/10 border border-amber-400/20 p-4 text-[11px] text-amber-200 leading-relaxed">
              <strong>نکته حیاتی:</strong> تمکن مالی باید <strong className="text-white">جدا از شهریه</strong> باشد. IND این مبلغ را هر ژانویه به‌روزرسانی می‌کند. هزینه درخواست اقامت نیز <strong>€۲۵۴</strong> است.
            </div>
          </div>
        </section>

        {/* ============================================================
            3. CITIES COMPARISON
           ============================================================ */}
        <section id="cities" className="py-12 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2 flex items-center gap-2">
              <Building className="w-5 h-5 text-orange-400" />
              کدام شهر هلند برای شما مناسب است؟
            </h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              ۴ شهر اصلی دانشجویی هلند را از نظر هزینه، فضای زندگی و فرصت‌های شغلی مقایسه کنید.
            </p>

            {/* City selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CITIES.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => setActiveCity(city.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    activeCity === city.id
                      ? 'bg-orange-500 text-white border-orange-400'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>

            {/* City card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <OptimizedImage
                    src={activeCityData.image}
                    alt={activeCityData.alt}
                    width={800} height={600} loading="lazy" decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent" />
                  <div className="absolute bottom-3 right-3 left-3">
                    <span className="text-xs font-bold text-white">{activeCityData.name}</span>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Euro className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-slate-400">اجاره ماهانه:</span>
                    <span className="text-sm font-black text-amber-300">{activeCityData.rent}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{activeCityData.vibe}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[10px] font-bold text-emerald-300 mb-1.5">مزایا</div>
                      <ul className="space-y-1">
                        {activeCityData.pros.map((p) => (
                          <li key={p} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-rose-300 mb-1.5">معایب</div>
                      <ul className="space-y-1">
                        {activeCityData.cons.map((c) => (
                          <li key={c} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                            <AlertTriangle className="w-3 h-3 text-rose-400 mt-0.5 shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Living costs table */}
            <h3 className="text-base font-black text-white mt-8 mb-3 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-orange-400" />
              هزینه زندگی ماهانه (بدون اجاره)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {LIVING_COSTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                      <span className="text-[10px] text-slate-400">{item.label}</span>
                    </div>
                    <div className="text-xs font-black text-white">{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            4. COURSE TYPES
           ============================================================ */}
        <section id="courses" className="py-12 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2 flex items-center gap-2">
              <Languages className="w-5 h-5 text-orange-400" />
              انواع دوره زبان و فاندیشن در هلند
            </h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              دوره‌های آمادگی به شما کمک می‌کنند تا سطح زبان و مهارت‌های آکادمیک لازم برای ورود به دانشگاه را کسب کنید.
            </p>

            <figure className="overflow-hidden rounded-2xl border border-white/10 mb-6">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
                alt="کلاس درس زبان انگلیسی در هلند — دوره فاندیشن و آمادگی آیلتس"
                width={1200} height={675} loading="lazy" decoding="async"
                className="h-56 w-full object-cover"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300">
                کلاس‌های فاندیشن در هلند معمولاً ۱۵ تا ۲۰ دانشجو دارند (منبع: Unsplash)
              </figcaption>
            </figure>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-orange-400/20 bg-orange-500/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="w-4 h-4 text-orange-400" />
                  <h3 className="text-sm font-black text-white">دوره ۶ ماهه (فشرده)</h3>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                  مناسب برای کسانی که آیلتس ۵.۵+ دارند و می‌خواهند سریع وارد دانشگاه شوند.
                </p>
                <div className="text-xs font-bold text-amber-300">شهریه: €۵,۴۰۰</div>
              </div>
              <div className="rounded-2xl border border-sky-400/20 bg-sky-500/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-black text-white">دوره ۱۲ ماهه (Foundation)</h3>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                  برای آیلتس ۵.۰ — شامل زبان، مهارت‌های آکادمیک و آمادگی رشته.
                </p>
                <div className="text-xs font-bold text-amber-300">شهریه: €۹,۸۰۰</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. VISA & MVV
           ============================================================ */}
        <section id="visa" className="py-12 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2 flex items-center gap-2">
              <Plane className="w-5 h-5 text-orange-400" />
              ویزا و MVV: مسیر ورود به هلند
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              خوشبختانه برای دوره‌های زبان، دانشگاه هلندی خودش درخواست MVV را از IND (اداره مهاجرت هلند) ثبت می‌کند.
            </p>

            <figure className="overflow-hidden rounded-2xl border border-white/10 mb-6">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
                alt="ویزای MVV هلند — مدارک و تمکن مالی IND ۲۰۲۶"
                width={1200} height={675} loading="lazy" decoding="async"
                className="h-52 w-full object-cover"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300">
                مدارک تمکن و شهریه به حساب امانی دانشگاه واریز می‌شود (منبع: Unsplash)
              </figcaption>
            </figure>

            <div className="space-y-3">
              {DOCUMENTS.map((doc) => (
                <div key={doc.id} onClick={() => setCheckedDocs((prev) => ({ ...prev, [doc.id]: !prev[doc.id] }))} className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${checkedDocs[doc.id] ? 'bg-orange-950/20 border-orange-500/40' : 'bg-white/[0.04] border-white/10 hover:border-white/20'}`}>
                  <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-black/40 shrink-0">
                    {checkedDocs[doc.id] && <Check className="w-3.5 h-3.5 text-orange-400" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{doc.title}</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" onClick={handleCopy} className="mt-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer">
              {copiedChecklist ? <Check className="w-4 h-4 text-orange-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedChecklist ? 'کپی شد!' : 'کپی لیست مدارک'}</span>
            </button>
          </div>
        </section>

        {/* ============================================================
            6. WORK
           ============================================================ */}
        <section id="work" className="py-12 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-400" />
              کار دانشجویی: ۱۶ ساعت در هفته یا تمام‌وقت در تابستان
            </h2>

            <figure className="overflow-hidden rounded-2xl border border-white/10 mb-6">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80"
                alt="کار دانشجویی در هلند — کافه و فروشگاه، ۱۶ ساعت در هفته"
                width={1200} height={675} loading="lazy" decoding="async"
                className="h-48 w-full object-cover"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300">
                کار در کافه، فروشگاه یا انبار از رایج‌ترین شغل‌های دانشجویی هلند است (منبع: Unsplash)
              </figcaption>
            </figure>

            <p className="text-xs leading-7 text-slate-300 text-justify mb-4">
              دانشجویان غیر اتحادیه اروپا در هلند می‌توانند یکی از دو گزینه را انتخاب کنند: <strong className="text-white">۱۶ ساعت کار در هفته</strong> در طول سال تحصیلی، یا <strong className="text-white">کار تمام‌وقت فقط در ماه‌های ژوئن، جولای و آگوست</strong>. کارفرما باید مجوز کار (TWV) داشته باشد. حداقل دستمزد قانونی در ۲۰۲۶ حدود <strong className="text-emerald-300">€۱۴.۷۱ در ساعت</strong> است.
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-[11px] text-slate-300">
              <strong className="text-orange-300">هشدار:</strong> اگر بیشتر از سقف مجاز کار کنید، ممکن است اقامت شما باطل شود. این محدودیت برای محافظت از بازار کار داخلی است.
            </div>
          </div>
        </section>

        {/* ============================================================
            7. ZOEKJAAR
           ============================================================ */}
        <section id="zoekjaar" className="py-12 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-orange-400" />
              Zoekjaar: مسیر ۱ ساله جستجوی کار با حقوق کاهش‌یافته
            </h2>

            <figure className="overflow-hidden rounded-2xl border border-white/10 mb-6">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80"
                alt="فارغ‌التحصیلان هلند — Zoekjaar و مسیر کاریابی"
                width={1200} height={675} loading="lazy" decoding="async"
                className="h-48 w-full object-cover"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300">
                Zoekjaar به فارغ‌التحصیلان ۱ سال فرصت جستجوی کار می‌دهد (منبع: Unsplash)
              </figcaption>
            </figure>

            <p className="text-xs leading-7 text-slate-300 text-justify mb-4">
              پس از فارغ‌التحصیلی، می‌توانید <strong className="text-white">Zoekjaar (Orientation Year)</strong> بگیرید — اقامت ۱ ساله برای جستجوی کار بدون محدودیت ساعت. اگر در این دوره شغلی پیدا کنید و کارفرما شما را به <strong className="text-white">Highly Skilled Migrant</strong> تبدیل کند، حداقل حقوق لازم <strong className="text-emerald-300">€۳,۱۲۲ ناخالص در ماه</strong> است (۲۰۲۶)، در حالی که استاندارد عادی برای متقاضیان خارج از هلند بسیار بالاتر است.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/20 p-4 text-center">
                <div className="text-[10px] text-emerald-300 mb-1">حداقل حقوق Zoekjaar (۲۰۲۶)</div>
                <div className="text-xl font-black text-white">€۳,۱۲۲</div>
                <div className="text-[10px] text-emerald-200/70 mt-0.5">ناخالص ماهانه</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                <div className="text-[10px] text-slate-400 mb-1">استاندارد عادی HSM (زیر ۳۰)</div>
                <div className="text-xl font-black text-slate-300">€۴,۳۵۷</div>
                <div className="text-[10px] text-slate-500 mt-0.5">ناخالص ماهانه</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            8. REAL STORY
           ============================================================ */}
        <section id="story" className="py-12 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-2">
              <Quote className="w-5 h-5 text-orange-400" />
              داستان واقعی: از تهران تا آمستردام
            </h2>

            <div className="rounded-3xl border border-orange-400/20 bg-orange-500/5 p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-orange-400/30 shrink-0">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                    alt="سارا — دانشجوی ایرانی در هلند، داستان واقعی دوره زبان"
                    width={200} height={200} loading="lazy" decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-black text-white">سارا، ۲۴ ساله</div>
                  <div className="text-[11px] text-slate-400">دانشجوی فاندیشن در آمستردام</div>
                </div>
              </div>

              <p className="text-xs leading-7 text-slate-300 text-justify mb-4">
                «وقتی تصمیم گرفتم برای فاندیشن به هلند بروم، فکر می‌کردم €۱۲,۰۰۰ کافی است. اما وقتی IND اعلام کرد €۱۳,۵۶۹ لازم است، سه ماه عقب افتادم.»
              </p>
              <p className="text-xs leading-7 text-slate-300 text-justify mb-4">
                «بعد از ورود، اجاره اتاقم در آمستردام €۹۰۰ بود. با ۱۶ ساعت کار در یک کافه، ماهانه €۷۶۰ درمی‌آوردم. تفاوت را از پس‌انداز شخصی جبران کردم.»
              </p>
              <p className="text-xs leading-7 text-slate-300 text-justify mb-4">
                «حالا در Zoekjaar هستم و یک شرکت فناوری در روتردام به من پیشنهاد داده. حقوق پیشنهادی €۳,۳۰۰ است — بالاتر از حداقل €۳,۱۲۲. این یعنی می‌توانم مسیر اقامت دائم را شروع کنم.»
              </p>

              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-[11px] text-slate-300 leading-relaxed">
                <strong className="text-amber-300">درس سارا:</strong> برنامه‌ریزی مالی دقیق از روز اول، آشنایی با محدودیت‌های کار دانشجویی و اطلاع از آستانه Zoekjaar — این سه، تفاوت بین موفقیت و شکست را می‌سازند.
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            9. FAQ
           ============================================================ */}
        <section id="faq" className="py-12 border-b border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-6 text-center flex items-center justify-center gap-2">
              <Info className="w-5 h-5 text-orange-400" />
              پرسش‌های متداول دوره زبان هلند ۲۰۲۶
            </h2>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                    <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} className="w-full flex items-center justify-between p-4 text-right font-bold text-sm text-white hover:text-orange-300 transition cursor-pointer" aria-expanded={isOpen}>
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-orange-400' : ''}`} />
                    </button>
                    {isOpen && <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-7 border-t border-white/5 text-justify">{faq.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            10. DISCLAIMER
           ============================================================ */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="rounded-2xl bg-amber-500/5 border border-amber-400/20 p-4 flex items-start gap-3 text-[11px] text-amber-200 leading-relaxed">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span><strong>سلب مسئولیت:</strong> اطلاعات این مقاله صرفاً آموزشی است و نباید به‌عنوان مشاوره حقوقی یا مهاجرتی تلقی شود. تنها منبع معتبر برای قوانین هلند، وب‌سایت رسمی <strong>IND.nl</strong> است. تصمیم نهایی با مقامات رسمی است.</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            11. CTA
           ============================================================ */}
        <section className="pb-12">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="rounded-3xl bg-gradient-to-r from-orange-950/40 to-amber-950/40 border border-orange-500/30 p-8 text-center">
              <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-3" />
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                مسیر هلند را با اعداد واقعی ۲۰۲۶ شروع کنید
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-6">
                تیم دیاکو با تسلط بر تمکن IND (€۱,۱۳۰.۷۷/ماه)، محدودیت کار ۱۶ ساعت و مسیر Zoekjaar (€۳,۱۲۲)، پرونده شما را از انتخاب دوره تا دریافت ویزا همراهی می‌کند.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button type="button" onClick={onOpenAssessment} className="rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-black px-6 py-3 text-sm transition cursor-pointer shadow-lg">
                  ارزیابی رایگان پرونده هلند
                </button>
                <button type="button" onClick={onBackToHome} className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-3 text-sm font-bold text-white transition cursor-pointer">
                  بازگشت به صفحه اصلی
                </button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default LanguageNetherlandsPage;