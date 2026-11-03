import React, { useState } from 'react';
import {
  CheckCircle2, Clock, ArrowRight, ChevronDown, PhoneCall,
  Sparkles, GraduationCap, ShieldCheck, Building2, Euro,
  FileCheck2, MapPin, Users, BookOpen, Globe, Menu, X, Star, Quote,
  Briefcase, Home, Wallet, Calendar, ExternalLink,
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
    name: 'TU Delft',
    fullName: 'Delft University of Technology',
    city: 'دلفت',
    qs: 47,
    focus: 'مهندسی، فناوری، معماری',
    tuition: '~€19,906 / سال (BSc & MSc)',
    acceptance: '~۲۵٪',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه فنی دلفت (TU Delft)، نمای ساختمان اصلی Aula',
  },
  {
    name: 'University of Amsterdam',
    fullName: 'UvA',
    city: 'آمستردام',
    qs: 53,
    focus: 'علوم اجتماعی، رسانه، حقوق، AI',
    tuition: '€19,100 – €26,000 / سال',
    acceptance: 'رقابتی (برخی رشته‌ها ~۴–۱۵٪)',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه آمستردام (UvA)، ساختمان دانشکده در مرکز شهر',
  },
  {
    name: 'Erasmus University Rotterdam',
    fullName: 'RSM / EUR',
    city: 'روتردام',
    qs: 140,
    focus: 'مدیریت (RSM)، اقتصاد، پزشکی',
    tuition: '€13,500 – €28,000 / سال',
    acceptance: '~۴۰–۵۳٪',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه اراسموس روتردام، دانشکده مدیریت RSM',
  },
];

const tuitionRows = [
  ['TU Delft', 'کارشناسی (BSc)', '~€19,906', 'شامل هزینه‌های جانبی'],
  ['TU Delft', 'کارشناسی ارشد (MSc)', '~€19,906', 'برخی رشته‌ها بالاتر'],
  ['UvA', 'کارشناسی ارشد', '€19,100 – €26,000', 'بسته به رشته'],
  ['Erasmus Rotterdam (RSM)', 'مدیریت (MSc)', '~€25,800', 'CEMS / MBA بالاتر'],
  ['Erasmus Rotterdam', 'اقتصاد (MSc)', '€13,500 – €28,000', 'بسته به برنامه'],
];

const deadlines = [
  { uni: 'UvA (برخی برنامه‌ها)', date: '۱ فوریه ۲۰۲۶', note: 'ثبت‌نام Studielink', color: 'text-amber-300' },
  { uni: 'ماستریخت (اکثر برنامه‌ها)', date: '۱ آوریل ۲۰۲۶', note: 'تکمیل کل فرآیند', color: 'text-blue-300' },
  { uni: 'توصیه کلی (غیر EU)', date: '۱ مه ۲۰۲۶', note: 'حداقل ۳ ماه قبل اقدام', color: 'text-emerald-300' },
  { uni: 'Saxion / برخی مؤسسات', date: '۱ ژوئن ۲۰۲۶', note: 'مهلت نهایی برخی برنامه‌ها', color: 'text-slate-300' },
];

const faqs = [
  {
    q: 'آیا برای ویزای جستجوی کار (Zoekjaar) حتماً باید در هلند تحصیل کرده باشم؟',
    a: 'خیر. فارغ‌التحصیلان مقاطع کارشناسی ارشد یا دکتری از ۲۰۰ دانشگاه برتر جهان (بر اساس رتبه‌بندی تایمز یا شانگهای) نیز واجد شرایط هستند، مشروط بر اینکه حداکثر یک سال از فارغ‌التحصیلی‌شان گذشته باشد.',
  },
  {
    q: 'حداقل نمره زبان برای پذیرش در دانشگاه‌های هلند چقدر است؟',
    a: 'برای اکثر برنامه‌های کارشناسی ارشد IELTS 6.5 (هیچ مهارتی زیر ۶.۰) و برای رشته‌های رقابتی مانند UvA، IELTS 7.0 مورد نیاز است. تافل معادل نیز پذیرفته می‌شود.',
  },
  {
    q: 'حداقل حقوق برای تبدیل ویزای Zoekjaar به اقامت کاری چقدر است؟',
    a: 'برای سال ۲۰۲۶، معیار حقوق کاهش‌یافته (Reduced Salary Criterion) برای فارغ‌التحصیلان و دارندگان Orientation Year، مبلغ €3,122 در ماه (ناخالص، بدون حق تعطیلات) است. این مبلغ بسیار کمتر از معیار عادی €4,357 (زیر ۳۰ سال) یا €5,942 (بالای ۳۰ سال) است.',
  },
  {
    q: 'هزینه زندگی دانشجویی در آمستردام چقدر است؟',
    a: 'اجاره ماهانه اتاق در آمستردام معمولاً بین €700 تا €1,000+ است. هزینه کل ماهانه (شامل غذا، حمل‌ونقل و بیمه) حدود €1,200 تا €1,500 تخمین زده می‌شود. در اوترخت و روتردام این مبلغ ۲۰–۳۰٪ کمتر است.',
  },
  {
    q: 'آیا مدرک هلند در ایران معتبر است؟',
    a: 'بله، دانشگاه‌های هلند مورد تأیید وزارت علوم، تحقیقات و فناوری ایران هستند. مدارک TU Delft و UvA در سطح بین‌المللی بسیار معتبر شناخته می‌شوند.',
  },
];

const testimonials = [
  {
    name: 'نیلوفر کریمی',
    university: 'دانشجوی ارشد TU Delft',
    text: 'با مشاوره دیاکو توانستم برای رشته مهندسی عمران TU Delft پذیرش بگیرم. روند Studielink و ویزا بسیار روان پیش رفت.',
  },
  {
    name: 'رضا صادقی',
    university: 'فارغ‌التحصیل UvA — شاغل در آمستردام',
    text: 'ویزای Zoekjaar واقعاً فرصت عالی بود. توانستم در عرض ۴ ماه کار پیدا کنم و اقامت کاری بگیرم.',
  },
];

export const AcademicNetherlandsPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'تحصیل در هلند ۲۰۲۶ | TU Delft (رتبه ۴۷) و دانشگاه آمستردام (رتبه ۵۳) + ویزای Zoekjaar',
    description:
      'راهنمای کامل تحصیل در هلند ۲۰۲۶: شهریه TU Delft و UvA، مهلت Studielink، ویزای جستجوی کار Zoekjaar، حداقل حقوق €3,122 برای اقامت کاری و هزینه زندگی. مشاوره تخصصی دیاکو.',
    canonical: '/guides/academic-netherlands',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تحصیل در هلند ۲۰۲۶',
      'TU Delft شهریه',
      'دانشگاه آمستردام UvA',
      'ویزای Zoekjaar هلند',
      'Orientation Year Netherlands',
      'Studielink deadline 2026',
      'اقامت کاری هلند حداقل حقوق',
      'هزینه زندگی دانشجویی هلند',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/academic-netherlands#article',
          headline: 'راهنمای جامع تحصیل در دانشگاه‌های هلند ۲۰۲۶ — TU Delft، آمستردام و روتردام',
          description:
            'بررسی رتبه‌بندی QS 2026، شهریه غیر EU، مهلت‌های Studielink، ویزای Orientation Year و مسیر اقامت کاری Highly Skilled Migrant.',
          image: ['https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80'],
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
            { '@type': 'ListItem', position: 3, name: 'هلند', item: 'https://www.dia-co.ir/guides/academic-netherlands' },
          ],
        },
        {
          '@type': 'ItemList',
          name: 'دانشگاه‌های برتر هلند ۲۰۲۶',
          itemListElement: universities.map((u, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'CollegeOrUniversity',
              name: u.fullName,
              address: { '@type': 'PostalAddress', addressLocality: u.city, addressCountry: 'NL' },
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
              <GraduationCap className="h-7 w-7 text-orange-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
              <a href="#universities" className="hover:text-orange-300 transition">دانشگاه‌ها</a>
              <a href="#tuition" className="hover:text-orange-300 transition">شهریه</a>
              <a href="#visa" className="hover:text-orange-300 transition">ویزا و اقامت</a>
              <a href="#faq" className="hover:text-orange-300 transition">سوالات متداول</a>
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
              <a href="#universities" className="block hover:text-orange-300">دانشگاه‌ها</a>
              <a href="#tuition" className="block hover:text-orange-300">شهریه</a>
              <a href="#visa" className="block hover:text-orange-300">ویزا و اقامت</a>
              <a href="#faq" className="block hover:text-orange-300">سوالات متداول</a>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold text-orange-300 mb-4">
              <Sparkles className="h-4 w-4" />
              QS 2026: TU Delft رتبه ۴۷ | UvA رتبه ۵۳ — به‌روزرسانی اکتبر ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              تحصیل در هلند ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-orange-400">
                (TU Delft و دانشگاه آمستردام)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              هلند با بیش از <strong>۲,۱۰۰ برنامه ۱۰۰٪ انگلیسی‌زبان</strong>، دو دانشگاه در جمع ۱۰۰ برتر جهان
              (TU Delft رتبه ۴۷ و UvA رتبه ۵۳) و <strong>ویزای یک‌ساله جستجوی کار (Zoekjaar)</strong> بدون نیاز
              به اسپانسر، بهترین مقصد اروپایی برای تحصیل و اشتغال است. حداقل حقوق برای تبدیل به اقامت کاری در ۲۰۲۶
              تنها <strong>€3,122 در ماه</strong> است.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {[
                { icon: Globe, label: '۲,۱۰۰+ برنامه', sub: '۱۰۰٪ انگلیسی‌زبان' },
                { icon: Briefcase, label: 'Zoekjaar', sub: '۱ سال کار آزاد پس از تحصیل' },
                { icon: Euro, label: '€3,122 / ماه', sub: 'حداقل حقوق اقامت کاری' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                  <item.icon className="h-5 w-5 text-orange-400 mx-auto mb-1" />
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
                ارزیابی رزومه جهت پذیرش هلند
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره با کارشناسان هلند
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1000&q=80"
                alt="دانشگاه دلفت هلند (TU Delft)، ساختمان Aula و محوطه دانشگاه"
                className="w-full h-80 sm:h-96 object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-300">
                  <MapPin className="h-4 w-4" />
                  دلفت، هلند — TU Delft (QS 2026: #47)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  اداره مهاجرت هلند (IND) — صدور MVV و VVR از طریق دانشگاه
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- دانشگاه‌ها ---------- */}
      <section id="universities" className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">دانشگاه‌های برتر هلند در ۲۰۲۶</h2>
        <p className="text-sm text-slate-400 text-center mb-10">رتبه QS، شهریه غیر EU و تمرکز تخصصی</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {universities.map((uni, idx) => (
            <article key={idx} className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-orange-400/30 transition group">
              <div className="relative h-44 overflow-hidden">
                <img src={uni.image} alt={uni.alt} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                <span className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-orange-300 backdrop-blur-sm">
                  QS #{uni.qs}
                </span>
                <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-slate-200 backdrop-blur-sm">
                  {uni.city}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-black text-lg mb-1">{uni.fullName}</h3>
                <p className="text-[11px] text-slate-400 mb-3">{uni.focus}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Euro className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="font-bold">{uni.tuition}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <Users className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>پذیرش: {uni.acceptance}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- شهریه ---------- */}
      <section id="tuition" className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">شهریه ۲۰۲۶/۲۷ (غیر EU/EEA)</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-xs md:text-sm text-right">
            <thead className="bg-white/5 text-orange-300 font-bold">
              <tr>
                <th className="p-4">دانشگاه</th>
                <th className="p-4">مقطع / رشته</th>
                <th className="p-4">شهریه سالانه</th>
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
        <p className="text-[11px] text-slate-400 mt-3 text-center">* شهریه‌ها سالانه نمایه‌سازی می‌شوند. منبع: سایت‌های رسمی TU Delft، UvA و EUR (اکتبر ۲۰۲۶).</p>
      </section>

      {/* ---------- مهلت‌ها و ویزا ---------- */}
      <section id="visa" className="container mx-auto px-4 md:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-amber-400" />
              مهلت‌های کلیدی Studielink (غیر EU)
            </h2>
            <div className="space-y-4 text-sm">
              {deadlines.map((d, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div>
                    <div className="text-slate-200 font-bold">{d.uni}</div>
                    <div className="text-[10px] text-slate-500">{d.note}</div>
                  </div>
                  <span className={`font-black ${d.color}`}>{d.date}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-emerald-400" />
              ویزای Zoekjaar و اقامت کاری
            </h2>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>مدت:</strong> ۱۲ ماه اقامت برای جستجوی کار — بدون نیاز به اسپانسر.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>تبدیل به اقامت کاری:</strong> با شغلی که حداقل <strong>€3,122/ماه</strong> (ناخالص) پرداخت کند.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>الزام مالی ویزای تحصیلی:</strong> اثبات <strong>€13,600</strong> برای سال ۲۰۲۶ (بدون شهریه).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>فارغ‌التحصیلان خارج:</strong> ۲۰۰ دانشگاه برتر جهان نیز واجد شرایط Zoekjaar هستند (حداکثر ۱ سال پس از فارغ‌التحصیلی).</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- هزینه زندگی ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">هزینه زندگی دانشجویی (۲۰۲۶)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { city: 'آمستردام', rent: '€700 – €1,000+', total: '€1,200 – €1,500', icon: Building2 },
            { city: 'اوترخت / روتردام', rent: '€500 – €800', total: '€1,000 – €1,300', icon: Home },
            { city: 'دلفت', rent: '€550 – €900', total: '€1,000 – €1,200', icon: Wallet },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <item.icon className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="font-black text-sm text-white mb-2">{item.city}</div>
              <div className="text-xs text-slate-300">اجاره: {item.rent}</div>
              <div className="text-[11px] text-emerald-300 mt-1 font-bold">کل ماهانه: {item.total}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- نظرات ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">تجربه دانشجویان دیاکو در هلند</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <Quote className="h-8 w-8 text-orange-400/50 mb-3" />
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
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">پرسش‌های متداول تحصیل در هلند</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-orange-300 transition"
                aria-expanded={openFaq === idx}
              >
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-orange-400' : ''}`} />
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
        <div className="rounded-3xl bg-gradient-to-l from-orange-900/60 to-[#0a2a33] border border-orange-400/20 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">آماده شروع مسیر تحصیل در هلند هستید؟</h2>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            کارشناسان دیاکو با ارزیابی رایگان رزومه، بهترین دانشگاه و مسیر پذیرش (Studielink، ویزا و Zoekjaar) را برای شما پیشنهاد می‌دهند.
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
                <GraduationCap className="h-6 w-6 text-orange-400" />
                <span className="font-black">دیاکو</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                هلدینگ مهاجرتی دیاکو، ارائه‌دهنده خدمات تخصصی تحصیل در هلند و اروپا.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#universities" className="hover:text-orange-300">دانشگاه‌ها</a></li>
                <li><a href="#tuition" className="hover:text-orange-300">شهریه</a></li>
                <li><a href="#visa" className="hover:text-orange-300">ویزا و اقامت</a></li>
                <li><a href="#faq" className="hover:text-orange-300">سوالات متداول</a></li>
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

export default AcademicNetherlandsPage;