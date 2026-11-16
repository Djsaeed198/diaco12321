import React, { useState } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Sparkles, GraduationCap,
  ShieldCheck, Building2, Euro, MapPin, Users, BookOpen, Globe,
  Menu, X, Star, Quote, Briefcase, Calendar, Wallet, FileCheck2,
  AlertTriangle, Clock, ExternalLink,
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
    name: 'Imperial College London',
    short: 'Imperial',
    city: 'لندن',
    qs: 2,
    group: 'Russell Group / G5',
    focus: 'مهندسی، پزشکی، علوم پایه، مدیریت',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    alt: 'امپریال کالج لندن، ساختمان اصلی در کنار هاید پارک',
  },
  {
    name: 'University of Oxford',
    short: 'Oxford',
    city: 'آکسفورد',
    qs: 4,
    group: 'Russell Group / G5',
    focus: 'علوم انسانی، حقوق، پزشکی، ریاضی',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه آکسفورد، نمای تاریخی Radcliffe Camera',
  },
  {
    name: 'University of Cambridge',
    short: 'Cambridge',
    city: 'کمبریج',
    qs: 6,
    group: 'Russell Group / G5',
    focus: 'مهندسی، علوم طبیعی، اقتصاد',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه کمبریج، ساختمان King’s College',
  },
  {
    name: 'University College London',
    short: 'UCL',
    city: 'لندن',
    qs: 9,
    group: 'Russell Group / G5',
    focus: 'معماری، پزشکی، علوم اعصاب، آموزش',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه UCL لندن، ساختمان اصلی در Bloomsbury',
  },
  {
    name: "King's College London",
    short: 'KCL',
    city: 'لندن',
    qs: 31,
    group: 'Russell Group',
    focus: 'حقوق، پزشکی، علوم اجتماعی، دندانپزشکی',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80',
    alt: 'کینگز کالج لندن، نمای ساختمان در Strand',
  },
];

const tuitionRows = [
  ['G5 (آکسفورد، کمبریج، امپریال، UCL، LSE)', 'علوم انسانی / اجتماعی (ارشد)', '£25,000 – £32,000'],
  ['G5', 'مهندسی و کامپیوتر (ارشد)', '£33,000 – £43,800'],
  ['G5', 'مدیریت و مالی (ارشد)', 'تا £42,000'],
  ['Russell Group (غیر G5)', 'علوم انسانی (ارشد)', '£18,000 – £24,000'],
  ['Russell Group (غیر G5)', 'مهندسی و کامپیوتر (ارشد)', '£25,000 – £35,000'],
  ['Russell Group (غیر G5)', 'مدیریت (ارشد)', '£24,000 – £32,000'],
  ['غیر Russell Group', 'علوم انسانی (ارشد)', '£14,000 – £20,000'],
  ['غیر Russell Group', 'مهندسی (ارشد)', '£18,000 – £26,000'],
];

const financialRows = [
  { region: 'لندن (قبل از ۳۰ نوامبر ۲۰۲۶)', monthly: '£1,529', max9: '£13,761' },
  { region: 'لندن (از ۳۰ نوامبر ۲۰۲۶)', monthly: '£1,570', max9: '£14,130' },
  { region: 'خارج از لندن (قبل از ۳۰ نوامبر ۲۰۲۶)', monthly: '£1,171', max9: '£10,539' },
  { region: 'خارج از لندن (از ۳۰ نوامبر ۲۰۲۶)', monthly: '£1,203', max9: '£10,827' },
];

const visaCosts = [
  { item: 'هزینه درخواست ویزا (Application Fee)', cost: '£558', note: 'از ۸ آوریل ۲۰۲۶' },
  { item: 'بیمه درمانی (IHS)', cost: '£776 / سال', note: 'برای کل مدت ویزا' },
  { item: 'گواهی ATAS', cost: 'رایگان', note: 'برای برخی رشته‌های علوم/مهندسی' },
];

const faqs = [
  {
    q: 'میزان تمکن مالی مورد نیاز برای ویزای تحصیلی بریتانیا در ۲۰۲۶ چقدر است؟',
    a: 'برای درخواست‌های ثبت‌شده از ۳۰ نوامبر ۲۰۲۶ به بعد: برای لندن £1,570 در ماه (حداکثر ۹ ماه = £14,130) و برای خارج از لندن £1,203 در ماه (حداکثر £10,827). این مبلغ باید شهریه سال اول (منهای پیش‌پرداخت‌های ثبت‌شده در CAS) را نیز پوشش دهد و حداقل ۲۸ روز متوالی در حساب بانکی نگهداری شود.',
  },
  {
    q: 'مدت ویزای Graduate Route در ۲۰۲۶ و ۲۰۲۷ چقدر است؟',
    a: 'برای درخواست‌های تا ۳۱ دسامبر ۲۰۲۶: ۲ سال برای کارشناسی/ارشد و ۳ سال برای دکتری. برای درخواست‌های از ۱ ژانویه ۲۰۲۷: ۱۸ ماه برای کارشناسی/ارشد (دکتری همچنان ۳ سال). استثنای مهم: بر اساس بودجه ۲۰۲۶، فارغ‌التحصیلان دانشگاه‌های high-compliance با نتایج قوی بازار کار می‌توانند حتی پس از ۲۰۲۷ نیز ۲ سال دریافت کنند.',
  },
  {
    q: 'آیا با ویزای دانشجویی می‌توانم در بریتانیا کار کنم؟',
    a: 'بله، در مقطع کارشناسی یا بالاتر تا ۲۰ ساعت در هفته در طول ترم و تمام‌وقت در تعطیلات. برای دوره‌های زیر کارشناسی محدودیت ۱۰ ساعت در هفته است. کار به‌عنوان ورزشکار حرفه‌ای یا خوداشتغالی مجاز نیست.',
  },
  {
    q: 'آیا Graduate Route به اقامت دائم منجر می‌شود؟',
    a: 'Graduate Route خودش مسیر اقامت دائم نیست و قابل تمدید هم نیست. اما در طول آن می‌توانید شغل اسپانسردار (Skilled Worker) پیدا کنید. با ۵ سال اقامت کاری در Skilled Worker، می‌توانید برای ILR (اقامت دائم) اقدام کنید.',
  },
  {
    q: 'آیا برای ویزای دانشجویی بریتانیا به گواهی ATAS نیاز دارم؟',
    a: 'برخی رشته‌های کارشناسی ارشد علوم و مهندسی حساس نیاز به گواهی ATAS دارند که باید قبل از صدور CAS دریافت شود. این گواهی رایگان است اما ۳ تا ۶ هفته زمان می‌برد و متقاضی باید شخصاً از وب‌سایت GOV.UK اقدام کند.',
  },
];

const testimonials = [
  {
    name: 'پویا محمدی',
    university: 'دانشجوی ارشد Imperial College London',
    text: 'با مشاوره دیاکو توانستم برای رشته مهندسی کامپیوتر امپریال پذیرش و CAS بگیرم. تیم دیاکو در آماده‌سازی مدارک مالی و پرونده ویزا بسیار دقیق بود.',
  },
  {
    name: 'نگار حسینی',
    university: 'فارغ‌التحصیل UCL — شاغل در لندن',
    text: 'Graduate Route فرصت عالی بود. توانستم در ۳ ماه کار پیدا کنم و اکنون در مسیر Skilled Worker هستم. مشاوره دیاکو در انتخاب دانشگاه high-compliance بسیار کمک کرد.',
  },
];

export const AcademicUKPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'ویزای تحصیلی بریتانیا ۲۰۲۶ | UK Student Route، تمکن مالی جدید £1,570 و Graduate Route',
    description:
      'راهنمای کامل ویزای تحصیلی انگلستان ۲۰۲۶: الزامات مالی از ۳۰ نوامبر ۲۰۲۶ (لندن £1,570/ماه)، هزینه ویزا £558، IHS £776، حق کار ۲۰ ساعت، Graduate Route ۲ ساله و مسیر Skilled Worker. مشاوره دیاکو.',
    canonical: '/academic-uk',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای تحصیلی انگلستان ۲۰۲۶',
      'UK Student visa 2026',
      'تمکن مالی ویزای انگلستان ۲۰۲۶',
      'Graduate Route 2026',
      'نامه CAS انگلستان',
      'هزینه IHS 2026',
      'کار دانشجویی ۲۰ ساعت انگلستان',
      'تحصیل ارشد یک ساله انگلستان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/academic-uk#article',
          headline: 'راهنمای جامع ویزای تحصیلی بریتانیا ۲۰۲۶ — UK Student Route، الزامات مالی و Graduate Route',
          description:
            'بررسی الزامات مالی جدید از ۳۰ نوامبر ۲۰۲۶، هزینه‌های ویزا و IHS، حق کار ۲۰ ساعت، تغییرات Graduate Route و مسیر Skilled Worker.',
          image: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80'],
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
            { '@type': 'ListItem', position: 2, name: 'خدمات مهاجرتی و تحصیلی', item: 'https://www.dia-co.ir/services' },
            { '@type': 'ListItem', position: 3, name: 'بریتانیا', item: 'https://www.dia-co.ir/academic-uk' },
          ],
        },
        {
          '@type': 'ItemList',
          name: 'دانشگاه‌های برتر بریتانیا ۲۰۲۶',
          itemListElement: universities.map((u, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'CollegeOrUniversity',
              name: u.name,
              address: { '@type': 'PostalAddress', addressLocality: u.city, addressCountry: 'GB' },
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
              <GraduationCap className="h-7 w-7 text-indigo-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
              <a href="#universities" className="hover:text-indigo-300 transition">دانشگاه‌ها</a>
              <a href="#tuition" className="hover:text-indigo-300 transition">شهریه</a>
              <a href="#finance" className="hover:text-indigo-300 transition">تمکن مالی</a>
              <a href="#graduate" className="hover:text-indigo-300 transition">Graduate Route</a>
              <a href="#faq" className="hover:text-indigo-300 transition">سوالات متداول</a>
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
              <a href="#universities" className="block hover:text-indigo-300">دانشگاه‌ها</a>
              <a href="#tuition" className="block hover:text-indigo-300">شهریه</a>
              <a href="#finance" className="block hover:text-indigo-300">تمکن مالی</a>
              <a href="#graduate" className="block hover:text-indigo-300">Graduate Route</a>
              <a href="#faq" className="block hover:text-indigo-300">سوالات متداول</a>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 mb-4">
              <Sparkles className="h-4 w-4" />
              QS 2026: Imperial #2 | Oxford #4 | Cambridge #6 — به‌روزرسانی اکتبر ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              ویزای تحصیلی بریتانیا ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-indigo-400">
                (UK Student Route)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              بریتانیا با <strong>۱۷ دانشگاه در جمع ۱۰۰ برتر جهان (QS 2026)</strong>، ارشدهای
              <strong>یک‌ساله</strong> و <strong>Graduate Route</strong> (۲ سال تا پایان ۲۰۲۶) همچنان
              مقصد نخست دانشجویان بین‌المللی است. از <strong>۳۰ نوامبر ۲۰۲۶</strong>، الزامات مالی
              ویزا افزایش یافته و آگاهی از این تغییرات برای اخذ موفق ویزا حیاتی است.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {[
                { icon: Globe, label: '۱۷ دانشگاه در Top 100', sub: 'رتبه‌بندی QS 2026' },
                { icon: Briefcase, label: 'Graduate Route', sub: '۲ سال کار بدون اسپانسر' },
                { icon: Clock, label: 'ارشد ۱ ساله', sub: 'صرفه‌جویی زمان و هزینه' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                  <item.icon className="h-5 w-5 text-indigo-400 mx-auto mb-1" />
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
                ارزیابی شانس پذیرش و CAS
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره با کارشناسان UK
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80"
                alt="لندن، بریتانیا — نماد شهر و دانشگاه‌های برتر مانند Imperial College و UCL"
                className="w-full h-80 sm:h-96 object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                  <MapPin className="h-4 w-4" />
                  لندن — Imperial College (QS #2) و UCL (QS #9)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  الزامات مالی جدید از ۳۰ نوامبر ۲۰۲۶: لندن £1,570/ماه | خارج از لندن £1,203/ماه
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- هشدار تغییرات مالی ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-12">
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-5 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
          <div className="text-xs md:text-sm text-amber-100">
            <strong className="text-amber-300">هشدار مهم (به‌روزرسانی اکتبر ۲۰۲۶):</strong>{' '}
            الزامات مالی ویزای دانشجویی برای درخواست‌های ثبت‌شده از <strong>۳۰ نوامبر ۲۰۲۶</strong> افزایش یافته است:
            لندن از £1,529 به <strong>£1,570</strong> در ماه و خارج از لندن از £1,171 به <strong>£1,203</strong> در ماه.
            حداکثر ۹ ماه محاسبه می‌شود (لندن £14,130 | خارج از لندن £10,827).
          </div>
        </div>
      </section>

      {/* ---------- دانشگاه‌ها ---------- */}
      <section id="universities" className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">دانشگاه‌های برتر بریتانیا در ۲۰۲۶</h2>
        <p className="text-sm text-slate-400 text-center mb-10">رتبه QS و گروه دانشگاهی</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni, idx) => (
            <article key={idx} className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-indigo-400/30 transition group">
              <div className="relative h-44 overflow-hidden">
                <img src={uni.image} alt={uni.alt} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                <span className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-indigo-300 backdrop-blur-sm">
                  QS #{uni.qs}
                </span>
                <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-slate-200 backdrop-blur-sm">
                  {uni.city}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-black text-lg mb-1">{uni.name}</h3>
                <p className="text-[11px] text-slate-400 mb-3">{uni.focus}</p>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <Users className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>{uni.group}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- شهریه ---------- */}
      <section id="tuition" className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">شهریه ۲۰۲۶/۲۷ (دانشجویان بین‌المللی)</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-xs md:text-sm text-right">
            <thead className="bg-white/5 text-indigo-300 font-bold">
              <tr>
                <th className="p-4">گروه دانشگاه</th>
                <th className="p-4">رشته / مقطع</th>
                <th className="p-4">شهریه سالانه (پوند)</th>
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
          * شهریه‌ها سالانه نمایه‌سازی می‌شوند. منبع: داده‌های ۲۰۲۶/۲۷ دانشگاه‌های Russell Group و غیر Russell Group.
        </p>
      </section>

      {/* ---------- تمکن مالی و هزینه‌های ویزا ---------- */}
      <section id="finance" className="container mx-auto px-4 md:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
              <Wallet className="h-6 w-6 text-amber-400" />
              الزامات مالی (Maintenance Funds)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right">
                <thead className="text-amber-300 font-bold border-b border-white/10">
                  <tr>
                    <th className="p-2">منطقه / تاریخ</th>
                    <th className="p-2">ماهانه</th>
                    <th className="p-2">حداکثر ۹ ماه</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {financialRows.map((row, i) => (
                    <tr key={i}>
                      <td className="p-2 text-slate-200">{row.region}</td>
                      <td className="p-2 text-white font-bold">{row.monthly}</td>
                      <td className="p-2 text-emerald-300 font-bold">{row.max9}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              + شهریه سال اول (منهای پیش‌پرداخت‌های ثبت‌شده در CAS). مبلغ باید ۲۸ روز متوالی در حساب باشد.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
              <Euro className="h-6 w-6 text-emerald-400" />
              هزینه‌های ویزا و IHS
            </h2>
            <div className="space-y-4 text-sm">
              {visaCosts.map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div>
                    <div className="text-slate-200 font-bold">{item.item}</div>
                    <div className="text-[10px] text-slate-500">{item.note}</div>
                  </div>
                  <span className="font-black text-amber-300">{item.cost}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-3">
              ATAS برای برخی رشته‌های علوم/مهندسی: رایگان اما ۳–۶ هفته زمان‌بر — قبل از CAS اقدام کنید.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Graduate Route ---------- */}
      <section id="graduate" className="container mx-auto px-4 md:px-8 mb-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-indigo-400" />
            ویزای فارغ‌التحصیلی (Graduate Route) — تغییرات کلیدی
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <div className="text-xs text-slate-400 mb-1">تا ۳۱ دسامبر ۲۰۲۶</div>
              <div className="text-2xl font-black text-emerald-300">۲ سال</div>
              <div className="text-[10px] text-slate-500 mt-1">کارشناسی / ارشد</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <div className="text-xs text-slate-400 mb-1">از ۱ ژانویه ۲۰۲۷</div>
              <div className="text-2xl font-black text-amber-300">۱۸ ماه</div>
              <div className="text-[10px] text-slate-500 mt-1">کارشناسی / ارشد</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <div className="text-xs text-slate-400 mb-1">دکتری (همه تاریخ‌ها)</div>
              <div className="text-2xl font-black text-indigo-300">۳ سال</div>
              <div className="text-[10px] text-slate-500 mt-1">PhD / Doctoral</div>
            </div>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <span><strong>استثنای high-compliance:</strong> بر اساس بودجه ۲۰۲۶، فارغ‌التحصیلان دانشگاه‌های با انطباق بالا و نتایج قوی بازار کار، حتی پس از ۲۰۲۷ نیز ۲ سال دریافت می‌کنند.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <span><strong>بدون نیاز به اسپانسر یا جاب‌آفر</strong> برای درخواست — آزادی کامل در تغییر شغل و کار تمام‌وقت/پاره‌وقت.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <span><strong>مسیر اقامت دائم:</strong> با یافتن شغل اسپانسردار (Skilled Worker) و ۵ سال اقامت کاری، می‌توان برای ILR اقدام کرد.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- حق کار دانشجویی ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center justify-center gap-2">
            <Clock className="h-6 w-6 text-amber-400" />
            حق کار دانشجویی: ۲۰ ساعت در هفته
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-2">
            دانشجویان مقطع کارشناسی و بالاتر می‌توانند در طول ترم تا <strong>۲۰ ساعت در هفته</strong> و در تعطیلات
            به‌صورت <strong>تمام‌وقت</strong> کار کنند. برای دوره‌های زیر کارشناسی، محدودیت <strong>۱۰ ساعت</strong> است.
          </p>
          <p className="text-[11px] text-amber-300">
            توجه: کار به‌عنوان ورزشکار حرفه‌ای، مربی یا خوداشتغالی مجاز نیست. نقض شرایط ویزا می‌تواند بر درخواست‌های آینده تأثیر بگذارد.
          </p>
        </div>
      </section>

      {/* ---------- نظرات ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">تجربه دانشجویان دیاکو در بریتانیا</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <Quote className="h-8 w-8 text-indigo-400/50 mb-3" />
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
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">پرسش‌های متداول ویزای تحصیلی بریتانیا</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-indigo-300 transition"
                aria-expanded={openFaq === idx}
              >
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-indigo-400' : ''}`} />
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
        <div className="rounded-3xl bg-gradient-to-l from-indigo-900/60 to-[#0a2a33] border border-indigo-400/20 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">آماده شروع مسیر تحصیل در بریتانیا هستید؟</h2>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            کارشناسان دیاکو با ارزیابی رایگان رزومه، بهترین دانشگاه و مسیر پذیرش (CAS، تمکن مالی و ویزا) را برای شما پیشنهاد می‌دهند.
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
                <GraduationCap className="h-6 w-6 text-indigo-400" />
                <span className="font-black">دیاکو</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                هلدینگ مهاجرتی دیاکو، ارائه‌دهنده خدمات تخصصی تحصیل در بریتانیا و اروپا.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#universities" className="hover:text-indigo-300">دانشگاه‌ها</a></li>
                <li><a href="#tuition" className="hover:text-indigo-300">شهریه</a></li>
                <li><a href="#finance" className="hover:text-indigo-300">تمکن مالی</a></li>
                <li><a href="#graduate" className="hover:text-indigo-300">Graduate Route</a></li>
                <li><a href="#faq" className="hover:text-indigo-300">سوالات متداول</a></li>
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

export default AcademicUKPage;