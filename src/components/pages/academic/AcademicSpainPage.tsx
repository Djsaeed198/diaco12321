import React, { useState } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Sparkles, GraduationCap,
  ShieldCheck, Building2, Euro, MapPin, Users, BookOpen, Globe,
  Menu, X, Star, Quote, Briefcase, Calendar, Wallet, FileCheck2,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ---------- داده‌های ساختاریافته ---------- */
const universities = [
  {
    name: 'Universitat de Barcelona',
    short: 'UB',
    city: 'بارسلونا',
    qs: 60,
    focus: 'پزشکی، علوم زیستی، هنر و علوم انسانی',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه بارسلونا (UB)، ساختمان تاریخی در مرکز شهر',
  },
  {
    name: 'Universitat Autònoma de Barcelona',
    short: 'UAB',
    city: 'بارسلونا (بلاترا)',
    qs: 68,
    focus: 'مهندسی، علوم اجتماعی، دامپزشکی',
    image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه خودمختار بارسلونا (UAB)، محوطه دانشگاه',
  },
  {
    name: 'Universidad Autónoma de Madrid',
    short: 'UAM',
    city: 'مادرید',
    qs: 71,
    focus: 'حقوق، اقتصاد، علوم پایه',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه خودمختار مادرید (UAM)، دانشکده حقوق',
  },
  {
    name: 'Universidad Complutense de Madrid',
    short: 'UCM',
    city: 'مادرید',
    qs: 78,
    focus: 'پزشکی، دندانپزشکی، ارتباطات',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه کمپلوتنسه مادرید (UCM)، نمای اصلی',
  },
  {
    name: 'Universitat Pompeu Fabra',
    short: 'UPF',
    city: 'بارسلونا',
    qs: 99,
    focus: 'اقتصاد، علوم سیاسی، ارتباطات',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه پومپئو فابرا (UPF)، ساختمان دانشکده اقتصاد',
  },
];

const tuitionRows = [
  ['کاتالونیا (UB, UAB, UPF)', 'کارشناسی', '€17.69 / واحد درسی', '~€1,061 / سال (۶۰ واحد)'],
  ['مادرید (UAM, UCM)', 'کارشناسی', '€800 – €2,000 / سال', 'بسته به رشته'],
  ['مادرید', 'کارشناسی ارشد', '€1,500 – €3,500 / سال', 'بسته به رشته'],
  ['اندلس / گالیسیا', 'کارشناسی', '€700 – €1,600 / سال', 'ارزان‌ترین مناطق'],
  ['طیف کلی غیر EU', 'کارشناسی', '€3,000 – €12,000 / سال', 'بسته به منطقه و دانشگاه'],
  ['طیف کلی غیر EU', 'کارشناسی ارشد', '€1,000 – €4,000 / سال', 'بسته به برنامه'],
];

const pceTimeline = [
  { step: 'ثبت‌نام UNEDasiss', date: '۴ فوریه – ۱ دسامبر ۲۰۲۶', note: 'حداقل ۶ هفته قبل از مهلت دانشگاه' },
  { step: 'ثبت‌نام PCE (دوره مه/ژوئن)', date: '۱۶ مارس – ۲۸ آوریل ۲۰۲۶', note: 'آزمون: ۲۵–۲۹ مه ۲۰۲۶' },
  { step: 'ثبت‌نام PCE (دوره سپتامبر)', date: '۱ – ۲۲ ژوئیه ۲۰۲۶', note: 'آزمون: ۲–۸ سپتامبر ۲۰۲۶' },
  { step: 'مهلت پذیرش دانشگاه‌های دولتی', date: '۷ ژوئیه ۲۰۲۶', note: 'برای سال تحصیلی ۲۰۲۶/۲۷' },
];

const faqs = [
  {
    q: 'آیا شهریه €1,000 تا €3,000 برای همه رشته‌های اسپانیا معتبر است؟',
    a: 'خیر. این بازه برای برخی مناطق و رشته‌های علوم انسانی/اجتماعی صادق است، اما رشته‌های پزشکی، دندانپزشکی و برخی مهندسی‌ها در دانشگاه‌های برتر (UB، UCM) می‌توانند تا €5,000–€7,000 در سال برسند. شهریه توسط هر منطقه خودمختار تعیین می‌شود.',
  },
  {
    q: 'آزمون PCE چیست و چه زمانی برگزار می‌شود؟',
    a: 'PCE (آزمون‌های شایستگی اختصاصی) آزمون ورودی دانشگاه‌های دولتی اسپانیا برای دانشجویان بین‌المللی است. ثبت‌نام دوره مه/ژوئن از ۱۶ مارس تا ۲۸ آوریل ۲۰۲۶ و آزمون‌ها ۲۵ تا ۲۹ مه ۲۰۲۶ برگزار می‌شود. دوره سپتامبر نیز ۲ تا ۸ سپتامبر ۲۰۲۶ است.',
  },
  {
    q: 'آیا با ویزای دانشجویی می‌توانم در اسپانیا کار کنم؟',
    a: 'بله. بر اساس Real Decreto 1155/2024، دانشجویان آموزش عالی به‌طور خودکار مجاز به کار تا ۳۰ ساعت در هفته در طول ترم هستند و نیازی به مجوز جداگانه ندارند. در تعطیلات نیز امکان کار تمام‌وقت وجود دارد.',
  },
  {
    q: 'پس از فارغ‌التحصیلی چقدر وقت برای پیدا کردن کار دارم؟',
    a: 'بر اساس مقررات جدید ۲۰۲۶، مجوز اقامت جستجوی کار (Autorización de Búsqueda de Empleo) تا ۲۴ ماه (غیرقابل تمدید) صادر می‌شود. با یافتن شغل، کارفرما اقامت کاری را بدون آزمون بازار کار صادر می‌کند.',
  },
  {
    q: 'هزینه زندگی دانشجویی در بارسلونا و مادرید چقدر است؟',
    a: 'بر اساس گزارش OCU (سپتامبر ۲۰۲۶)، میانگین اجاره اتاق در بارسلونا €735 و در مادرید €689 در ماه است. هزینه کل ماهانه (شامل غذا، حمل‌ونقل و قبوض) برای بارسلونا €1,100–€1,500 و برای مادرید €1,000–€1,400 تخمین زده می‌شود.',
  },
];

const testimonials = [
  {
    name: 'مریم احمدی',
    university: 'دانشجوی ارشد Universitat de Barcelona',
    text: 'با مشاوره دیاکو توانستم برای رشته علوم داده در UB پذیرش بگیرم. روند UNEDasiss و PCE با راهنمایی تیم بسیار روان پیش رفت.',
  },
  {
    name: 'علی نوری',
    university: 'فارغ‌التحصیل UCM — شاغل در مادرید',
    text: 'حق کار ۳۰ ساعت در هفته واقعاً کمک بزرگی بود. بعد از فارغ‌التحصیلی هم توانستم با مجوز جستجوی کار، در عرض ۵ ماه شغل پیدا کنم.',
  },
];

export const AcademicSpainPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'تحصیل در اسپانیا ۲۰۲۶ | دانشگاه بارسلونا (رتبه ۶۰) و کمپلوتنسه مادرید + آزمون PCE',
    description:
      'راهنمای کامل تحصیل در اسپانیا ۲۰۲۶: رتبه‌بندی QS دانشگاه‌های UB، UAB، UAM، UCM و UPF، شهریه دولتی، آزمون UNEDasiss PCE، حق کار ۳۰ ساعت در هفته و اقامت جستجوی کار ۲۴ ماهه. مشاوره دیاکو.',
    canonical: '/guides/academic-spain',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تحصیل در اسپانیا ۲۰۲۶',
      'دانشگاه بارسلونا UB',
      'دانشگاه کمپلوتنسه مادرید',
      'آزمون PCE اسپانیا',
      'UNEDasiss 2026',
      'کار دانشجویی ۳۰ ساعت اسپانیا',
      'اقامت جستجوی کار اسپانیا',
      'هزینه زندگی دانشجویی بارسلونا',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/academic-spain#article',
          headline: 'راهنمای جامع تحصیل در دانشگاه‌های اسپانیا ۲۰۲۶ — UB، UAB، UAM، UCM و UPF',
          description:
            'بررسی رتبه‌بندی QS 2026، شهریه مناطق مختلف، آزمون PCE و UNEDasiss، حق کار ۳۰ ساعت و مجوز اقامت جستجوی کار ۲۴ ماهه.',
          image: ['https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80'],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' },
          },
          datePublished: '2026-01-01',
          dateModified: '2026-10-29',
          inLanguage: 'fa-IR',
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://www.dia-co.ir/' },
            { '@type': 'ListItem', position: 2, name: 'تحصیل در دانشگاه', item: 'https://www.dia-co.ir/academic' },
            { '@type': 'ListItem', position: 3, name: 'اسپانیا', item: 'https://www.dia-co.ir/guides/academic-spain' },
          ],
        },
        {
          '@type': 'ItemList',
          name: 'دانشگاه‌های برتر اسپانیا ۲۰۲۶',
          itemListElement: universities.map((u, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'CollegeOrUniversity',
              name: u.name,
              address: { '@type': 'PostalAddress', addressLocality: u.city, addressCountry: 'ES' },
            },
          })),
        },
      ],
    },
  });

  return (
    <div className="min-h-screen bg-[#061a21] text-white font-sans" dir="rtl">
      {/* ---------- هدر ---------- */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061a21]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-7 w-7 text-amber-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
              <a href="#universities" className="hover:text-amber-300 transition">دانشگاه‌ها</a>
              <a href="#tuition" className="hover:text-amber-300 transition">شهریه</a>
              <a href="#pce" className="hover:text-amber-300 transition">آزمون PCE</a>
              <a href="#work" className="hover:text-amber-300 transition">کار و اقامت</a>
              <a href="#faq" className="hover:text-amber-300 transition">سوالات متداول</a>
            </nav>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="hidden sm:inline-flex rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition"
              >
                ارزیابی رایگان
              </button>
              <button type="button" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="منو">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 space-y-3 text-sm font-bold">
              <a href="#universities" className="block hover:text-amber-300">دانشگاه‌ها</a>
              <a href="#tuition" className="block hover:text-amber-300">شهریه</a>
              <a href="#pce" className="block hover:text-amber-300">آزمون PCE</a>
              <a href="#work" className="block hover:text-amber-300">کار و اقامت</a>
              <a href="#faq" className="block hover:text-amber-300">سوالات متداول</a>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <Sparkles className="h-4 w-4" />
              QS 2026: UB رتبه ۶۰ | UAB ۶۸ | UAM ۷۱ | UCM ۷۸ — به‌روزرسانی اکتبر ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              تحصیل در اسپانیا ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-orange-400">
                (بارسلونا و مادرید)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              اسپانیا با <strong>پنج دانشگاه در جمع ۱۰۰ برتر جهان (QS 2026)</strong>، شهریه‌های دولتی
              مقرون‌به‌صرفه و <strong>حق قانونی کار ۳۰ ساعت در هفته</strong> حین تحصیل، یکی از بهترین
              مقاصد تحصیلی اروپا است. پس از فارغ‌التحصیلی نیز می‌توانید تا <strong>۲۴ ماه</strong> اقامت
              جستجوی کار دریافت کنید.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {[
                { icon: Globe, label: '۵ دانشگاه در Top 100', sub: 'رتبه‌بندی QS 2026' },
                { icon: Briefcase, label: '۳۰ ساعت کار', sub: 'خودکار با اقامت دانشجویی' },
                { icon: Calendar, label: '۲۴ ماه جستجوی کار', sub: 'پس از فارغ‌التحصیلی' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                  <item.icon className="h-5 w-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-sm font-black text-amber-300">{item.label}</div>
                  <div className="text-[11px] text-slate-300 mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition"
              >
                ارزیابی شانس پذیرش اسپانیا
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره با کارشناسان اسپانیا
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1000&q=80"
                alt="دانشگاه بارسلونا (UB)، نمای ساختمان تاریخی در اسپانیا"
                className="w-full h-80 sm:h-96 object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <MapPin className="h-4 w-4" />
                  بارسلونا، اسپانیا — Universitat de Barcelona (QS #60)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  آزمون PCE از طریق UNEDasiss — ثبت‌نام ۱۶ مارس تا ۲۸ آوریل ۲۰۲۶
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- دانشگاه‌ها ---------- */}
      <section id="universities" className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">دانشگاه‌های برتر اسپانیا در ۲۰۲۶</h2>
        <p className="text-sm text-slate-400 text-center mb-10">رتبه QS و تمرکز تخصصی</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni, idx) => (
            <article key={idx} className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-amber-400/30 transition group">
              <div className="relative h-44 overflow-hidden">
                <img src={uni.image} alt={uni.alt} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                <span className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-amber-300 backdrop-blur-sm">
                  QS #{uni.qs}
                </span>
                <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-slate-200 backdrop-blur-sm">
                  {uni.city}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-black text-lg mb-1">{uni.short}</h3>
                <p className="text-[11px] text-slate-400 mb-3">{uni.focus}</p>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <Users className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>{uni.name}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- شهریه ---------- */}
      <section id="tuition" className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">شهریه دانشگاه‌های دولتی (غیر EU/EEA) — ۲۰۲۶/۲۷</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-xs md:text-sm text-right">
            <thead className="bg-white/5 text-amber-300 font-bold">
              <tr>
                <th className="p-4">منطقه / دانشگاه</th>
                <th className="p-4">مقطع</th>
                <th className="p-4">شهریه</th>
                <th className="p-4">توضیح</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tuitionRows.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition">
                  {row.map((cell, j) => (
                    <td key={j} className="p-4 text-slate-200">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-400 mt-3 text-center">
          * شهریه توسط هر منطقه خودمختار تعیین می‌شود. برای رشته‌های پزشکی و برخی مهندسی‌ها در دانشگاه‌های برتر، هزینه می‌تواند تا €5,000–€7,000 در سال برسد.
        </p>
      </section>

      {/* ---------- آزمون PCE ---------- */}
      <section id="pce" className="container mx-auto px-4 md:px-8 mb-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
            <FileCheck2 className="h-6 w-6 text-amber-400" />
            آزمون UNEDasiss و PCE ۲۰۲۶
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pceTimeline.map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs font-bold text-amber-300 mb-1">{item.step}</div>
                <div className="text-sm font-black text-white">{item.date}</div>
                <div className="text-[10px] text-slate-400 mt-1">{item.note}</div>
              </div>
            ))}
          </div>
          <ul className="mt-4 space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <span>حداکثر ۶ درس در PCE — ۴ نمره برتر بالای ۵ محاسبه می‌شود (هر درس تا ۲ امتیاز اضافه از ۱۴).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <span>از ۲۰۲۶، ۲۵٪ سوالات بر اساس مدل شایستگی‌محور (evaluación por competencias) طراحی می‌شود.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- کار و اقامت ---------- */}
      <section id="work" className="container mx-auto px-4 md:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-emerald-400" />
              حق کار دانشجویی: ۳۰ ساعت در هفته
            </h2>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span>بر اساس <strong>Real Decreto 1155/2024</strong>، حق کار ۳۰ ساعت در هفته به‌طور خودکار به اقامت دانشجویی (TIE) متصل است.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span>نیازی به مجوز کار جداگانه نیست؛ کارفرما فقط باید شما را در تأمین اجتماعی ثبت کند.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span>در تعطیلات، امکان کار تمام‌وقت وجود دارد. تجاوز از ۳۰ ساعت می‌تواند منجر به لغو اقامت شود.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-amber-400" />
              اقامت جستجوی کار پس از فارغ‌التحصیلی
            </h2>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                <span><strong>مدت:</strong> تا <strong>۲۴ ماه</strong> (غیرقابل تمدید) — مجوز جدید ۲۰۲۶.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                <span><strong>زمان درخواست:</strong> از ۶۰ روز قبل تا ۹۰ روز بعد از انقضای اقامت دانشجویی.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                <span><strong>الزام مالی:</strong> حدود <strong>€14,400</strong> برای ۲۴ ماه (یا €7,200 با اثبات پیش‌پرداخت اقامت).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                <span><strong>تبدیل به کار:</strong> با یافتن شغل، کارفرما اقامت کاری را بدون آزمون بازار کار (Labour Market Test) صادر می‌کند.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- هزینه زندگی ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">هزینه زندگی دانشجویی (۲۰۲۶)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            { city: 'بارسلونا', rent: '€735 / ماه', total: '€1,100 – €1,500', icon: Building2 },
            { city: 'مادرید', rent: '€689 / ماه', total: '€1,000 – €1,400', icon: Wallet },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <item.icon className="h-6 w-6 text-amber-400 mx-auto mb-2" />
              <div className="font-black text-sm text-white mb-2">{item.city}</div>
              <div className="text-xs text-slate-300">اجاره اتاق: {item.rent}</div>
              <div className="text-[11px] text-emerald-300 mt-1 font-bold">کل ماهانه: {item.total}</div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-3 text-center">منبع: گزارش OCU، سپتامبر ۲۰۲۶ — میانگین اجاره اتاق دانشجویی.</p>
      </section>

      {/* ---------- نظرات ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">تجربه دانشجویان دیاکو در اسپانیا</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <Quote className="h-8 w-8 text-amber-400/50 mb-3" />
              <p className="text-sm text-slate-200 leading-relaxed mb-4">«{t.text}»</p>
              <footer className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-black text-emerald-300">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-slate-400">{t.university}</div>
                </div>
                <div className="mr-auto flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">پرسش‌های متداول تحصیل در اسپانیا</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-amber-300 transition"
                aria-expanded={openFaq === idx}
              >
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-amber-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA نهایی ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <div className="rounded-3xl bg-gradient-to-l from-amber-900/60 to-[#0a2a33] border border-amber-400/20 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">آماده شروع مسیر تحصیل در اسپانیا هستید؟</h2>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            کارشناسان دیاکو با ارزیابی رایگان رزومه، بهترین دانشگاه و مسیر پذیرش (UNEDasiss، PCE و ویزا) را برای شما پیشنهاد می‌دهند.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-8 py-3.5 text-sm font-black text-[#082833] hover:brightness-110 transition"
            >
              ارزیابی رایگان شانس پذیرش
            </button>
            <a
              href="https://wa.me/989197340829"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              گفتگو در واتساپ
            </a>
          </div>
        </div>
      </section>

      {/* ---------- فوتر ---------- */}
      <footer className="border-t border-white/10 bg-[#041418]">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-6 w-6 text-amber-400" />
                <span className="font-black">دیاکو</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                هلدینگ مهاجرتی دیاکو، ارائه‌دهنده خدمات تخصصی تحصیل در اسپانیا و اروپا.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#universities" className="hover:text-amber-300">دانشگاه‌ها</a></li>
                <li><a href="#tuition" className="hover:text-amber-300">شهریه</a></li>
                <li><a href="#pce" className="hover:text-amber-300">آزمون PCE</a></li>
                <li><a href="#work" className="hover:text-amber-300">کار و اقامت</a></li>
                <li><a href="#faq" className="hover:text-amber-300">سوالات متداول</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">تماس با ما</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>واتساپ: ۰۹۱۹۷۳۴۰۸۲۹</li>
                <li>ایمیل: info@dia-co.ir</li>
                <li>وب‌سایت: www.dia-co.ir</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">اعتماد شما</h4>
              <div className="flex items-center gap-2 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                <span>مشاوره تخصصی و شفاف</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">© ۲۰۲۶ دیاکو. تمامی حقوق محفوظ است.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AcademicSpainPage;