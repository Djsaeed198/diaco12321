import React, { useState } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Copy, Sparkles, Landmark,
  ShieldCheck, Euro, AlertTriangle, CalendarDays, Menu, X, Star, Quote,
  MapPin, Clock, Users, Home, HeartPulse, Languages, FileCheck2, Wallet,
  ArrowLeft, Scale, BookOpen, Info, TrendingUp, Globe, Briefcase,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ---------- داده‌های ساختاریافته ۲۰۲۶ ---------- */
const incomeRows = [
  { label: 'مجرد (Alleinstehend)', value: '€۲,۶۱۶.۷۸ / ماه', icon: Wallet },
  { label: 'زوج (Ehepaar)', value: '€۴,۱۲۸.۲۴ / ماه', icon: Users },
  { label: 'هر فرزند', value: '+ €۴۰۳.۷۶ / ماه', icon: HeartPulse },
];

const generalRequirements = [
  { icon: Home, title: 'مسکن مناسب', desc: 'اجاره‌نامه یا سند مالکیت متناسب با اندازه خانواده' },
  { icon: ShieldCheck, title: 'بیمه درمانی جامع', desc: 'پوشش تمام خطرات در اتریش — بیمه مسافرتی کافی نیست' },
  { icon: Languages, title: 'زبان آلمانی A1', desc: 'قبل از ورود (مگر موارد استثنا)' },
  { icon: FileCheck2, title: 'عدم سوءپیشینه', desc: 'گواهی حداکثر ۳ ماه اعتبار' },
];

const processSteps = [
  { step: '۱', title: 'آماده‌سازی مدارک', detail: 'پاسپورت، اثبات درآمد، اجاره‌نامه، بیمه، A1، عدم سوءپیشینه', time: '۲–۴ ماه' },
  { step: '۲', title: 'رزرو وقت', detail: 'سفارت اتریش یا MA35 (در صورت حضور قانونی)', time: '۱ روز' },
  { step: '۳', title: 'ثبت در پنجره سهمیه', detail: 'اولین روزهای کاری ژانویه — رقابت شدید', time: 'بسیار محدود' },
  { step: '۴', title: 'پرداخت هزینه‌ها', detail: 'هزینه دولتی €۱۰۰–€۲۰۰ + جانبی', time: '—' },
  { step: '۵', title: 'دریافت تصمیم', detail: 'زمان پردازش ۳–۱۲ ماه', time: '۳–۱۲ ماه' },
];

const renewalTimeline = [
  { stage: 'اولین مجوز', duration: '۱۲ ماه', condition: 'سهمیه + شرایط اولیه', color: 'text-amber-300' },
  { stage: 'تمدید اول', duration: '۱۲ ماه', condition: '—', color: 'text-sky-300' },
  { stage: 'تمدیدهای بعدی', duration: '۳ سال', condition: 'Module 1 (A2) + ۲ سال اقامت', color: 'text-emerald-300' },
  { stage: 'Daueraufenthalt-EU', duration: '۵ سال (قابل تمدید)', condition: '۵ سال اقامت + Module 2 (B1)', color: 'text-indigo-300' },
];

const faqs = [
  { q: 'آیا با اقامت تمکن مالی می‌توانم در اتریش کار کنم؟', a: 'خیر. این مجوز «ausgenommen Erwerbstätigkeit» (بدون اشتغال) است و انجام هرگونه کار استخدامی یا خوداشتغالی در اتریش ممنوع است. با این حال، می‌توانید سهامدار شرکت‌ها باشید و از سود سرمایه‌گذاری بهره‌مند شوید.' },
  { q: 'حداقل درآمد ماهانه در ۲۰۲۶ چقدر است؟', a: 'دو برابر نرخ ASVG §293: برای مجرد €۲,۶۱۶.۷۸، برای زوج €۴,۱۲۸.۲۴ و برای هر فرزند +€۴۰۳.۷۶. درآمد باید ثابت، منظم و از منابع خارج از اتریش باشد.' },
  { q: 'چرا سهمیه (Quota) این‌قدر حیاتی است؟', a: 'سهمیه Privatier در ۲۰۲۶ تنها حدود ۲۸۵ تا ۳۸۵ نفر بوده و پنجره ثبت‌نام بسیار کوتاه (چند روز) است. بدون سهمیه، پرونده حتی با درآمد کافی رد می‌شود. تمدید نیازی به سهمیه ندارد.' },
  { q: 'آیا مدرک زبان آلمانی لازم است؟', a: 'بله، A1 برای اولین درخواست الزامی است (مگر استثنا). برای تمدید، A2 (Module 1) و برای اقامت دائم، B1 (Module 2) لازم است.' },
  { q: 'آیا سرمایه‌گذاری یا خرید ملک اجباری است؟', a: 'خیر. هیچ الزام سرمایه‌گذاری وجود ندارد. این یک «گلدن ویزا» نیست و تنها اثبات درآمد غیرفعال و مسکن مناسب کافی است.' },
  { q: 'مسیر اقامت دائم و تابعیت چگونه است؟', a: 'پس از ۵ سال اقامت مستمر + B1 آلمانی → Daueraufenthalt-EU. تابعیت اتریش معمولاً پس از ۱۰ سال (در موارد محدود ۶ سال) و با شرایط اضافی امکان‌پذیر است.' },
];

const testimonials = [
  { name: 'بهرام کاظمی', role: 'بازنشسته — وین', text: 'دیاکو از ماه‌ها قبل پرونده را بست و در همان روز اول پنجره سهمیه اقدام کرد. توانستم اقامت خودحمایتی را دریافت کنم.' },
  { name: 'شیرین دهقان', role: 'سرمایه‌گذار — سالزبورگ', text: 'تیم دیاکو در اثبات درآمد غیرفعال و هماهنگی با MA35 بسیار دقیق بود. فرآیند بدون استرس پیش رفت.' },
];

export const FinancialAustriaPage: React.FC<Props> = ({ onBackToHome, onOpenAssessment }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'اقامت تمکن مالی اتریش ۲۰۲۶ | NAG §44 + درآمد €۲,۶۱۶ + سهمیه محدود',
    description:
      'راهنمای کامل اقامت خودحمایتی اتریش ۲۰۲۶ طبق NAG §44: حداقل درآمد €۲,۶۱۶.۷۸/ماه (مجرد)، €۴,۱۲۸.۲۴ (زوج) + €۴۰۳.۷۶ هر فرزند، سهمیه ۲۸۵–۳۸۵ نفری، زبان A1، بیمه و مسیر ۵ ساله تا اقامت دائم. مشاوره دفتر وین دیاکو.',
    canonical: '/financial-austria',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تمکن مالی اتریش ۲۰۲۶', 'اقامت خودحمایتی اتریش',
      'Niederlassungsbewilligung ausgenommen Erwerbstätigkeit',
      'NAG §44 اتریش', 'حداقل درآمد تمکن مالی اتریش ۲۶۱۶ یورو',
      'سهمیه Privatier اتریش ۲۰۲۶', 'اقامت بدون کار اتریش', 'MA35 وین تمکن مالی',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/financial-austria#article',
          headline: 'راهنمای جامع اقامت تمکن مالی اتریش ۲۰۲۶: NAG §44، درآمد دو برابر ASVG و سهمیه محدود',
          description: 'بررسی NAG §44، حداقل درآمد €۲,۶۱۶.۷۸ (مجرد) و €۴,۱۲۸.۲۴ (زوج) + €۴۰۳.۷۶ هر فرزند، سهمیه ۲۸۵–۳۸۵ نفری Privatier، زبان A1، بیمه جامع و مسیر ۵ ساله تا Daueraufenthalt-EU.',
          image: ['https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80'],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' } },
          datePublished: '2026-01-01', dateModified: '2026-10-29', inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Niederlassungsbewilligung ausgenommen Erwerbstätigkeit' },
            { '@type': 'Thing', name: 'NAG §44' },
            { '@type': 'Thing', name: 'Privatier Austria' },
          ],
        },
        {
          '@type': 'HowTo',
          name: 'مراحل دریافت اقامت تمکن مالی اتریش (NAG §44)',
          totalTime: 'P1Y',
          step: processSteps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.detail })),
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://www.dia-co.ir/' },
            { '@type': 'ListItem', position: 2, name: 'خدمات مهاجرتی و تمکن مالی', item: 'https://www.dia-co.ir/services' },
            { '@type': 'ListItem', position: 3, name: 'اتریش', item: 'https://www.dia-co.ir/financial-austria' },
          ],
        },
        {
          '@type': ['Service', 'LegalService'],
          '@id': 'https://www.dia-co.ir/financial-austria#service',
          name: 'خدمات اخذ اقامت تمکن مالی اتریش (NAG §44)',
          serviceType: 'اقامت خودحمایتی و تمکن مالی بدون اشتغال اتریش',
          description: 'پرونده‌سازی تخصصی، ثبت در اولین ثانیه‌های سهمیه سالانه Privatier اتریش و نظارت وکلای مقیم وین.',
          provider: {
            '@type': 'LegalService',
            name: 'هلدینگ مهاجرتی دیاکو — دفتر وکالت وین',
            url: 'https://www.dia-co.ir/',
            telephone: '+43-688-9763256',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Ausstellungsstraße 50',
              addressLocality: 'Vienna',
              postalCode: '1020',
              addressCountry: 'AT',
            },
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.95',
            reviewCount: '340',
            bestRating: '5',
            worstRating: '1',
          },
          review: [
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'بهرام کاظمی' },
              datePublished: '2025-11-12',
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
              reviewBody: 'دیاکو از ماه‌ها قبل پرونده را بست و در همان روز اول پنجره سهمیه اقدام کرد. توانستم اقامت خودحمایتی را دریافت کنم.',
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'شیرین دهقان' },
              datePublished: '2025-10-05',
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
              reviewBody: 'تیم دیاکو در اثبات منشاء درآمد غیرفعال و هماهنگی با MA35 بسیار دقیق بود. فرآیند بدون استرس پیش رفت.',
            },
          ],
        },
      ],
    },
  });

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+43 688 976 3256');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#061a21] text-white font-sans" dir="rtl">
      {/* ---------- هدر ---------- */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061a21]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Landmark className="h-7 w-7 text-amber-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
              <a href="#article" className="hover:text-amber-300 transition">مقاله</a>
              <a href="#income" className="hover:text-amber-300 transition">درآمد</a>
              <a href="#quota" className="hover:text-amber-300 transition">سهمیه</a>
              <a href="#process" className="hover:text-amber-300 transition">فرآیند</a>
              <a href="#faq" className="hover:text-amber-300 transition">سوالات</a>
            </nav>
            <div className="flex items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="hidden sm:inline-flex rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition">ارزیابی رایگان</button>
              <button type="button" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="منو">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 space-y-3 text-sm font-bold">
              <a href="#article" className="block hover:text-amber-300">مقاله</a>
              <a href="#income" className="block hover:text-amber-300">درآمد</a>
              <a href="#quota" className="block hover:text-amber-300">سهمیه</a>
              <a href="#process" className="block hover:text-amber-300">فرآیند</a>
              <a href="#faq" className="block hover:text-amber-300">سوالات</a>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Breadcrumb ---------- */}
      <div className="container mx-auto px-4 md:px-8 pt-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button type="button" onClick={onBackToHome} className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 transition">
            <ArrowLeft className="h-4 w-4" /> بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span><span>/</span>
            <span>تمکن مالی</span><span>/</span>
            <span className="text-amber-300 font-bold">اتریش</span>
          </div>
        </div>
      </div>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <Sparkles className="h-4 w-4" /> NAG §44 — اقامت خودحمایتی اتریش ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              اقامت تمکن مالی اتریش ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-amber-500">
                (Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              اقامت خودحمایتی اتریش برای افراد مالیاً مستقل که از درآمد غیرفعال برخوردارند. شرط اصلی: درآمد ماهانه
              <strong> دو برابر ASVG</strong> — یعنی <strong>€۲,۶۱۶.۷۸</strong> برای مجرد و <strong>€۴,۱۲۸.۲۴</strong> برای زوج (۲۰۲۶).
              مانع اصلی: <strong>سهمیه ۲۸۵–۳۸۵ نفری</strong> و پنجره ثبت‌نام چندروزه.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: Wallet, label: '€۲,۶۱۶.۷۸', sub: 'حداقل مجرد' },
                { icon: Users, label: '€۴,۱۲۸.۲۴', sub: 'حداقل زوج' },
                { icon: CalendarDays, label: '۲۸۵–۳۸۵', sub: 'سهمیه Privatier' },
                { icon: Clock, label: '۱۲ ماه', sub: 'اعتبار اولیه' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                  <item.icon className="h-5 w-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-sm font-black text-amber-300">{item.label}</div>
                  <div className="text-[10px] text-slate-300 mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition">
                بررسی پرونده و رزرو سهمیه
              </button>
              <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                دفتر وین: +۴۳ ۶۸۸ ۹۷۶ ۳۲۵۶
                {copiedPhone && <span className="text-emerald-400 text-[10px] font-bold">کپی شد!</span>}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=80"
                alt="وین، اتریش — اقامت تمکن مالی و خودحمایتی" width={1000} height={750}
                loading="eager" decoding="async" fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300"><MapPin className="h-4 w-4" /> وین — MA35</div>
                <p className="text-[11px] text-slate-300 mt-1">دفتر دیاکو در وین، پرونده‌ها را از داخل اتریش ثبت و پیگیری می‌کند.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================  مقاله پرمحتوا (Rich Article)  ===================== */}
      <article id="article" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-10">

          {/* --- مقدمه --- */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><BookOpen className="h-4 w-4" /> مقاله تخصصی ۲۰۲۶</span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">اقامت تمکن مالی اتریش چیست و برای چه کسانی مناسب است؟</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              اقامت تمکن مالی اتریش — با نام رسمی <strong className="text-white">Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit</strong> —
              یکی از معتبرترین مسیرهای اقامت اروپایی برای افرادی است که دارای درآمد ماهانه مستقل و غیرفعال
              (مانند سود سپرده بانکی، اجاره املاک، حقوق بازنشستگی یا سود سهام) هستند و می‌خواهند بدون اشتغال در خاک اتریش،
              در بالاترین سطح رفاه شهری در وین، سالزبورگ یا اینسبروک زندگی کنند. این اقامت تحت
              <strong className="text-white"> بند ۴۴ قانون اقامت اتریش (NAG §44)</strong> صادر می‌شود و برخلاف بسیاری از
              تصورات رایج، یک «گلدن ویزا» یا برنامه سرمایه‌گذاری اجباری نیست. هیچ الزامی به خرید ملک، سرمایه‌گذاری در صندوق یا
              پرداخت کمک مالی وجود ندارد. تنها لازم است متقاضی ثابت کند که:
            </p>
            <ul className="space-y-2 text-sm text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>درآمد ماهانه ثابت و منظمی از خارج اتریش دارد؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>مسکن مناسب و بیمه درمانی جامع برای خود و خانواده‌اش فراهم می‌کند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>و یک سهمیه از ظرفیت محدود سالانه را به دست می‌آورد.</span></li>
            </ul>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify">
              همین «سهمیه محدود» است که این برنامه را از یک مسیر ساده به یکی از رقابتی‌ترین انواع اقامت اروپا تبدیل می‌کند.
              در ادامه مقاله، چارچوب حقوقی، آستانه درآمد، سهمیه، مدارک، فرآیند و مسیر تبدیل به اقامت دائم را قدم‌به‌قدم بررسی می‌کنیم.
            </p>
          </div>

          {/* --- NAG §44 --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Scale className="h-6 w-6 text-amber-400" /> چارچوب حقوقی: NAG §44 دقیقاً چه می‌گوید؟
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              طبق <strong className="text-white">NAG §44(1)</strong>، یک اتباع کشور ثالث می‌تواند مجوز اقامت بدون اشتغال دریافت کند اگر سه شرط را برآورده کند:
            </p>
            <div className="space-y-3 mb-4">
              {[
                { n: '۱', t: 'شرایط عمومی (Part 1 NAG)', d: 'پاسپورت معتبر، بیمه درمانی، مسکن مناسب، عدم سوءپیشینه، مدرک زبان A1.' },
                { n: '۲', t: 'وجود سهمیه (Quotenplatz)', d: 'ظرفیت سالانه محدود که از سوی دولت اتریش تعیین می‌شود.' },
                { n: '۳', t: 'درآمد دو برابر ASVG §293', d: 'درآمد ماهانه ثابت از منابع خارج از اتریش (مستمری، سود سرمایه‌گذاری، اجاره).' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-400 text-[#082833] grid place-items-center text-xs font-black">{item.n}</span>
                  <div>
                    <div className="text-xs font-bold text-white mb-1">{item.t}</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/20">
              <p className="text-[11px] text-red-200 leading-relaxed">
                <strong>هشدار حقوقی:</strong> انجام هرگونه کار (استخدامی یا خوداشتغالی) در اتریش با این مجوز
                <strong> ممنوع</strong> است. این محدودیت حتی شامل کار پاره‌وقت یا ریموت برای کارفرمای اتریشی هم می‌شود.
                تنها استثنا: فعالیت به‌عنوان سهامدار شرکت‌ها (بدون نقش مدیریتی روزانه) و دریافت سود سهام.
              </p>
            </div>
          </div>

          {/* --- درآمد --- */}
          <div id="income" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Euro className="h-6 w-6 text-amber-400" /> آستانه درآمد ۲۰۲۶ — دقیقاً چقدر لازم است؟
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              درآمد مورد نیاز <strong className="text-white">دو برابر</strong> نرخ پایه ASVG است که سالانه توسط دولت اتریش به‌روزرسانی می‌شود.
              برای سال ۲۰۲۶، مبالغ زیر اعمال می‌شود:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-4">
              <table className="w-full text-xs md:text-sm text-right">
                <thead className="bg-white/5 text-amber-300 font-bold">
                  <tr>
                    <th className="p-3">وضعیت</th>
                    <th className="p-3">درآمد ماهانه (ناخالص)</th>
                    <th className="p-3">درآمد سالانه معادل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="p-3 text-slate-200">مجرد</td><td className="p-3 font-black text-white">€۲,۶۱۶.۷۸</td><td className="p-3 text-slate-300">€۳۱,۴۰۱.۳۶</td></tr>
                  <tr><td className="p-3 text-slate-200">زوج</td><td className="p-3 font-black text-white">€۴,۱۲۸.۲۴</td><td className="p-3 text-slate-300">€۴۹,۵۳۸.۸۸</td></tr>
                  <tr><td className="p-3 text-slate-200">هر فرزند</td><td className="p-3 font-black text-amber-300">+ €۴۰۳.۷۶</td><td className="p-3 text-slate-300">+ €۴,۸۴۵.۱۲</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-3">
              <strong className="text-white">نکات کلیدی:</strong>
            </p>
            <ul className="space-y-2 text-xs text-slate-300 mb-4">
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span>مبلغ زوج <strong>جایگزین</strong> مبلغ مجرد می‌شود (جمع نمی‌شوند).</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span>درآمد باید <strong>ثابت و منظم</strong> باشد؛ سپرده یک‌باره بانکی به‌تنهایی کافی نیست اما می‌تواند بخشی از پرونده باشد.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span><strong>کمک‌های اجتماعی (Sozialhilfe)</strong> پذیرفته نمی‌شود.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span>درآمد باید از <strong>خارج اتریش</strong> تأمین شود؛ درآمد از منابع اتریشی معمولاً نیازمند مجوز کار است.</span></li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {incomeRows.map((row, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <row.icon className="h-5 w-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-300 mb-1">{row.label}</div>
                  <div className="text-lg font-black text-amber-300">{row.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* --- سهمیه --- */}
          <div id="quota" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-amber-400" /> سهمیه (Quota) — مانع اصلی و حیاتی پرونده
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              اتریش برای این نوع اقامت، <strong className="text-white">سهمیه سالانه</strong> تعیین می‌کند.
              طبق <strong>Niederlassungsverordnung (NLV) ۲۰۲۶</strong>، از مجموع حدود <strong>۵,۶۱۶ سهمیه</strong>
              در تمام دسته‌های نیازمند سهمیه، تنها حدود <strong className="text-amber-300">۲۸۵ تا ۳۸۵ سهمیه</strong>
              به متقاضیان «Privatier» (افراد مالیاً مستقل) اختصاص می‌یابد.
            </p>
            <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 flex items-start gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
              <div className="text-xs text-amber-100 leading-relaxed">
                <strong className="text-amber-300">پنجره ثبت‌نام:</strong> در سال گذشته، پنجره رزرو برای سهمیه ۲۰۲۶
                تنها <strong>از ۱ تا ۸ دسامبر ۲۰۲۵</strong> باز بود و سهمیه معمولاً در همان روزهای اول تکمیل شد.
                هرچه زودتر اقدام کنید، شانس بیشتری دارید.
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>هر عضو خانواده یک سهمیه جداگانه مصرف می‌کند.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>تمدید نیازی به سهمیه ندارد؛ سهمیه فقط برای اولین صدور لازم است.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>بدون سهمیه، پرونده حتی با درآمد کافی رد می‌شود — این مهم‌ترین نکته‌ای است که اکثر متقاضیان از آن غافل‌اند.</span></li>
            </ul>
          </div>

          {/* --- شرایط عمومی --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-amber-400" /> سایر شرایط لازم (General Requirements)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              علاوه بر درآمد و سهمیه، متقاضی باید چهار شرط عمومی را نیز برآورده کند:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {generalRequirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <req.icon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white mb-1">{req.title}</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">{req.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- فرآیند --- */}
          <div id="process" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-amber-400" /> فرآیند درخواست — گام‌به‌گام
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              کل فرآیند از آماده‌سازی مدارک تا دریافت کارت اقامت، معمولاً بین <strong>۶ تا ۱۸ ماه</strong> طول می‌کشد
              که بخش زیادی از آن به انتظار برای پنجره سهمیه و زمان پردازش MA35 بستگی دارد.
            </p>
            <div className="space-y-3">
              {processSteps.map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-400 text-[#082833] grid place-items-center text-xs font-black">{item.step}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{item.title}</span>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- تمدید --- */}
          <div id="renewal" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6 text-sky-400" /> تمدید و مسیر اقامت دائم
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              اولین مجوز برای <strong>۱۲ ماه</strong> صادر می‌شود و با گذشت زمان، تمدیدها طولانی‌تر می‌شوند.
              پس از ۵ سال اقامت قانونی مستمر و کسب مدرک B1 آلمانی، امکان درخواست <strong>Daueraufenthalt-EU</strong>
              (اقامت دائم اتحادیه اروپا) فراهم می‌شود.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {renewalTimeline.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className={`text-xs font-black ${item.color} mb-1`}>{item.stage}</div>
                  <div className="text-sm font-bold text-white">{item.duration}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{item.condition}</div>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/20">
              <p className="text-[11px] text-sky-200 leading-relaxed">
                <strong>حضور فیزیکی:</strong> برای حفظ اقامت، باید سالانه حداقل <strong>۱۸۳ روز</strong> در اتریش
                حضور فیزیکی داشته باشید. غیبت‌های طولانی می‌تواند به لغو اقامت منجر شود.
              </p>
            </div>
          </div>

          {/* --- الحاق خانواده --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-emerald-400" /> الحاق خانواده
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-3">
              یکی از مزایای این اقامت، امکان همراهی خانواده است:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong>همسر/شریک ثبت‌شده</strong> می‌تواند درخواست دهد.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong>فرزندان مجرد زیر ۱۸ سال</strong> واجد شرایط هستند.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>هر یک از اعضا نیاز به <strong>سهمیه جداگانه</strong> دارد (از همان تخصیص سالانه).</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>هر عضو باید <strong>مستقلاً</strong> شرایط عمومی (بیمه، مسکن، زبان A1) را برآورده کند.</span></li>
            </ul>
          </div>

          {/* --- نتیجه‌گیری --- */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-amber-400" /> نتیجه‌گیری
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              اقامت تمکن مالی اتریش با درآمد ماهانه <strong className="text-white">€۲,۶۱۶.۷۸</strong> (مجرد)،
              سهمیه محدود <strong className="text-white">۲۸۵–۳۸۵ نفری</strong> و مسیر روشن به اقامت دائم،
              گزینه‌ای ممتاز برای افراد مالیاً مستقل است. کلید موفقیت در این مسیر، <strong className="text-amber-300">آماده‌سازی زودهنگام پرونده</strong>
              و <strong className="text-amber-300">اقدام سریع در پنجره سهمیه</strong> است. اگر شرایط مالی شما با آستانه‌های ۲۰۲۶
              همخوانی دارد، توصیه می‌کنیم از همین حالا پرونده خود را با کارشناسان دیاکو آماده کنید تا در پنجره سهمیه سال آینده،
              در ثانیه‌های نخست اقدام شود.
            </p>
          </div>
        </div>
      </article>

      {/* ---------- نظرات ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">تجربه متقاضیان دیاکو</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <Quote className="h-8 w-8 text-amber-400/50 mb-3" />
              <p className="text-sm text-slate-200 leading-relaxed mb-4">«{t.text}»</p>
              <footer className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-black text-emerald-300">{t.name.charAt(0)}</div>
                <div>
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-slate-400">{t.role}</div>
                </div>
                <div className="mr-auto flex gap-0.5">
                  {[...Array(5)].map((_, s) => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">پرسش‌های متداول</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button type="button" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-amber-300 transition"
                aria-expanded={openFaq === idx}>
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-amber-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA نهایی ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-amber-400/5 to-transparent p-6 md:p-10 text-center">
          <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-black mb-2">پرونده خود را برای سهمیه سال آینده آماده کنید</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            کارشناسان دیاکو درآمد غیرفعال شما را ارزیابی می‌کنند، مدارک را از ماه‌ها قبل بسته‌بندی می‌کنند و در پنجره سهمیه اقدام می‌کنند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110">
              ارزیابی شانس تمکن مالی اتریش
            </button>
            <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold hover:bg-white/10 inline-flex items-center gap-2">
              <Copy className="h-4 w-4 text-amber-400" />
              {copiedPhone ? 'شماره کپی شد!' : 'دفتر وین: +43 688 976 3256'}
            </button>
          </div>
        </div>
      </section>

      {/* ---------- فوتر ---------- */}
      <footer className="border-t border-white/10 bg-[#041418]">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3"><Landmark className="h-6 w-6 text-amber-400" /><span className="font-black">دیاکو</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">هلدینگ مهاجرتی دیاکو — خدمات تخصصی اقامت تمکن مالی در اتریش و اروپا.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#article" className="hover:text-amber-300">مقاله</a></li>
                <li><a href="#income" className="hover:text-amber-300">درآمد</a></li>
                <li><a href="#quota" className="hover:text-amber-300">سهمیه</a></li>
                <li><a href="#process" className="hover:text-amber-300">فرآیند</a></li>
                <li><a href="#faq" className="hover:text-amber-300">سوالات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">تماس با ما</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>دفتر وین: +۴۳ ۶۸۸ ۹۷۶ ۳۲۵۶</li>
                <li>واتساپ: ۰۹۱۹۷۳۴۰۸۲۹</li>
                <li>ایمیل: info@dia-co.ir</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">اعتماد شما</h4>
              <div className="flex items-center gap-2 text-xs text-emerald-300"><ShieldCheck className="h-4 w-4" /><span>مشاوره تخصصی و شفاف</span></div>
              <p className="text-[10px] text-slate-500 mt-2">© ۲۰۲۶ دیاکو. تمامی حقوق محفوظ است.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FinancialAustriaPage;