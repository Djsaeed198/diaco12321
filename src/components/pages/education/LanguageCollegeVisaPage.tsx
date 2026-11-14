import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Euro,
  MapPin,
  BookOpen,
  Globe,
  Menu,
  X,
  Briefcase,
  Calendar,
  ExternalLink,
  AlertTriangle,
  List,
  Award,
  FileCheck2,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const DESTINATION_COMPARISON = [
  {
    key: 'germany',
    country: 'آلمان 🇩🇪',
    lang: 'آلمانی (آمادگی TestDaF یا DSH)',
    duration: '۶ ماه تا ۱ سال',
    tuition: '۳,۰۰۰ تا ۷,۰۰۰ یورو / سال',
    living: '۹۹۲ تا ۱,۱۰۰ یورو / ماه (Sperrkonto)',
    minBaseLang: 'مدرک پایه A1 / A2 گوته یا ÖSD (قویاً توصیه/الزامی سفارت)',
    conversion: 'تبدیل مستقیم به ویزای دانشجویی دانشگاه یا مسیر جستجوی کار در صورت احراز شرایط',
    page: 'ausbildung-germany',
  },
  {
    key: 'austria',
    country: 'اتریش 🇦🇹',
    lang: 'آلمانی (کالج‌های وین و گراتس)',
    duration: '۶ ماه تا ۱.۵ سال',
    tuition: '۳,۰۰۰ تا ۷,۰۰۰ یورو / سال (دوره Vorstudienlehrgang بسیار اقتصادی)',
    living: '۹۰۰ تا ۱,۲۰۰ یورو / ماه',
    minBaseLang: 'حداقل A2 آلمانی جهت پذیرش دانشگاهی و صدور ویزا',
    conversion: 'تبدیل به اقامت تحصیلی دانشگاهی یا اقامت کاری RWR پس از اتمام تحصیل',
    page: 'academic-austria',
  },
  {
    key: 'hungary',
    country: 'مجارستان 🇭🇺',
    lang: 'انگلیسی / مجاری (دوره‌های فاندیشن)',
    duration: '۹ ماه تا ۱ سال',
    tuition: '۴,۰۰۰ تا ۸,۰۰۰ یورو / سال',
    living: '۶۰۰ تا ۹۰۰ یورو / ماه (اقتصادی‌ترین در شنگن)',
    minBaseLang: 'پذیرش انعطاف‌پذیر بدون الزام آیلتس بالا در دوره پایه',
    conversion: 'ورود مستقیم به دانشگاه‌های پزشکی، مهندسی و بیزینس بوداپست و دبرسن',
    page: 'language-hungary',
  },
  {
    key: 'spain-greece',
    country: 'اسپانیا و یونان 🇪🇸 🇬🇷',
    lang: 'اسپانیایی / یونانی یا انگلیسی',
    duration: '۶ ماه تا ۱ سال',
    tuition: '۴,۰۰۰ تا ۷,۵۰۰ یورو / سال',
    living: '۷۰۰ تا ۱,۰۰۰ یورو / ماه',
    minBaseLang: 'سطح پایه زبان یا انگیزه‌نامه منسجم',
    conversion: 'تمدید اقامت تحصیلی و تبدیل به اقامت‌های بلندمدت در صورت انطباق قانونی',
    page: 'language-spain',
  },
];

const faqs = [
  {
    q: 'آیا با ویزای کالج زبان می‌توانیم مستقیماً اقامت دائم بگیریم؟',
    a: 'خیر؛ ویزای کالج زبان یک اقامت موقت تحصیلی است. شما پس از اتمام دوره زبان و قبولی در آزمون نهایی (مانند TestDaF یا DSH)، باید وارد دانشگاه شوید یا ویزای خود را به ویزای کاری تبدیل کنید و پس از ۵ سال کار و اقامت قانونی، برای اقامت دائم اقدام کنید.',
  },
  {
    q: 'آیا داشتن مدرک زبان از ایران برای گرفتن پذیرش کالج زبان الزامی است؟',
    a: 'بسته به کشور و کالج متفاوت است. برخی کالج‌ها از صفر (A1) پذیرش می‌دهند، اما برای اخذ ویزا از سفارت‌های برخی کشورها (مانند آلمان و اتریش) داشتن مدرک پایه زبان (حداقل A1 یا A2) شانس موفقیت ویزا را به شدت بالا می‌برد.',
  },
  {
    q: 'تفاوت کالج زبان با کالج دانشگاهی (Studienkolleg) چیست؟',
    a: 'کالج زبان صرفاً روی آموزش زبان تمرکز دارد، در حالی که Studienkolleg یک دوره آکادمیک برای معادل‌سازی دیپلم ایران با سیستم دانشگاهی کشور مقصد (مثلاً آلمان) است که علاوه بر زبان، دروس تخصصی رشته مورد نظر را نیز تدریس می‌کند.',
  },
  {
    q: 'آیا پس از پایان دوره زبان حتماً باید وارد دانشگاه شد؟',
    a: 'هدف اصلی این ویزا تحصیل است؛ اما اگر شرایط تغییر کند، در برخی کشورها امکان تبدیل ویزای زبان به ویزای کاری (در صورت داشتن تخصص، مدرک تاییدشده و پیشنهاد کار رسمی) وجود دارد، هرچند مسیر اصلی اتصال به دانشگاه است.',
  },
];

const tocItems = [
  { id: 'what-is-language-college', label: 'مهاجرت از طریق کالج زبان چیست؟' },
  { id: 'top-destinations', label: 'مقاصد برتر در سال ۲۰۲۶-۲۰۲۷' },
  { id: 'requirements', label: 'شرایط و مدارک پذیرش و ویزای زبان' },
  { id: 'costs-and-financials', label: 'هزینه‌های دوره و تمکن مالی مورد نیاز' },
  { id: 'work-and-family', label: 'کار پاره‌وقت و ویزای همراه خانواده' },
  { id: 'expert-insights', label: 'چالش‌های واقعی (Motivation Gap) و نکات دیاکو' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const LanguageCollegeVisaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedDestKey, setSelectedDestKey] = useState<string>('germany');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedDest =
    DESTINATION_COMPARISON.find((d) => d.key === selectedDestKey) || DESTINATION_COMPARISON[0];

  useSeo({
    title: 'مهاجرت از طریق کالج زبان ۲۰۲۶-۲۰۲۷ | شرایط، هزینه و ویزا | دیاکو',
    description:
      'راهنمای جامع مهاجرت از طریق کالج زبان در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی شرایط اخذ پذیرش دوره‌های زبان (آلمانی و انگلیسی)، تمکن مالی، ویزای همراه و مشاوره تخصصی هلدینگ دیاکو.',
    canonical: 'https://www.dia-co.ir/language-college-visa',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'مهاجرت از طریق کالج زبان ۲۰۲۶',
      'ویزای کالج زبان آلمان',
      'کالج زبان اتریش و وین',
      'کالج زبان مجارستان',
      'Sprachkurs Visa 2026',
      'Studienkolleg',
      'تمکن مالی ویزای دوره زبان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/language-college-visa/#article',
          headline: 'مهاجرت از طریق کالج زبان ۲۰۲۶-۲۰۲۷ | شرایط، هزینه و ویزا',
          description:
            'راهنمای جامع مهاجرت از طریق کالج زبان در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی شرایط اخذ پذیرش دوره‌های زبان، تمکن مالی، ویزای همراه و مشاوره تخصصی هلدینگ دیاکو.',
          image: [
            'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T10:00:00+03:30',
          dateModified: '2026-11-14T12:30:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و اعزام دانشجو هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          reviewedBy: {
            '@type': 'Organization',
            name: 'دفاتر اجرایی دیاکو در اروپا و تهران',
            url: 'https://www.dia-co.ir/',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://www.dia-co.ir/#organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
            logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' },
          },
          citation: ['https://www.study-in-germany.de/', 'https://www.oead.at/'],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/language-college-visa',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/language-college-visa/#faq',
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
            { '@type': 'ListItem', position: 2, name: 'مقالات تخصصی', item: 'https://www.dia-co.ir/blog' },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'مهاجرت از طریق کالج زبان',
              item: 'https://www.dia-co.ir/language-college-visa',
            },
          ],
        },
      ],
    },
  });

  const handleLinkNav = (page: string, slug?: string) => (e: React.MouseEvent) => {
    if (!e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (slug && onNavigateToBlogPost) onNavigateToBlogPost(slug);
      else if (onNavigateToPage) onNavigateToPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#061a21] text-white font-sans" dir="rtl">
      {/* ---------- هدر داخلی ---------- */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061a21]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
              >
                <ArrowRight className="h-4 w-4 text-amber-400" />
                <span>بازگشت به صفحه اصلی</span>
              </button>
              <span className="text-white/20">|</span>
              <div className="hidden sm:flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-emerald-400" />
                <span className="font-black text-sm text-amber-300">کالج زبان اروپا ۲۰۲۶-۲۰۲۷</span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-200">
              <a href="#what-is-language-college" className="hover:text-amber-300 transition">معرفی مسیر</a>
              <a href="#top-destinations" className="hover:text-amber-300 transition">مقاصد برتر</a>
              <a href="#requirements" className="hover:text-amber-300 transition">شرایط و مدارک</a>
              <a href="#costs-and-financials" className="hover:text-amber-300 transition">هزینه‌ها و تمکن</a>
              <a href="#expert-insights" className="hover:text-amber-300 transition">نکات حقوقی</a>
              <a href="#faq" className="hover:text-amber-300 transition">سوالات متداول</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="hidden sm:inline-flex rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی رایگان کالج زبان
              </button>
              <button
                type="button"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="منو"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/10 space-y-2.5 text-xs font-bold">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-amber-300"
                >
                  • {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ---------- Hero & E-E-A-T ---------- */}
      <section className="container mx-auto px-4 md:px-8 pt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300">
              <Sparkles className="h-4 w-4" />
              راهنمای مرجع سال تحصیلی ۲۰۲۶–۲۰۲۷ | آلمان، اتریش، مجارستان و شنگن
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              راهنمای جامع مهاجرت از طریق کالج زبان (۲۰۲۶–۲۰۲۷):{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-emerald-400">
                شرایط، هزینه‌ها و ویزا
              </span>
            </h1>

            {/* E-E-A-T Metadata */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 grid sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Award className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">نویسنده و تدوین:</span>
                  <strong className="text-white">دپارتمان حقوقی و اعزام دانشجو هلدینگ دیاکو</strong>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">بازبینی تخصصی:</span>
                  <strong className="text-emerald-300">دفاتر اجرایی دیاکو در اروپا و تهران</strong>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="h-4 w-4 text-sky-400 shrink-0" />
                <span>آخرین به‌روزرسانی: <strong>نوامبر ۲۰۲۶</strong></span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-slate-300">
                <ExternalLink className="h-4 w-4 text-amber-400 shrink-0" />
                <span>منابع مرجع:</span>
                <a
                  href="https://www.study-in-germany.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:underline font-bold"
                >
                  study-in-germany.de
                </a>
                <span>•</span>
                <a
                  href="https://www.oead.at/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:underline font-bold"
                >
                  oead.at
                </a>
              </div>
            </div>

            {/* BLUF Box */}
            <div className="rounded-2xl border-r-4 border-[#f5a623] bg-[#0a2a35] p-5 shadow-lg">
              <div className="text-xs font-black text-amber-300 mb-2">
                خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج هوشمند):
              </div>
              <p className="text-sm text-slate-100 leading-7 text-justify">
                <strong>مهاجرت از طریق کالج زبان</strong> یکی از مطمئن‌ترین و هموارترین مسیرهای ورود به کشورهای اروپایی (مانند{' '}
                <strong>آلمان، اتریش، مجارستان و اسپانیا</strong>) برای افرادی است که مدرک زبان اولیه در سطح مطلوب ندارند. در این روش، متقاضی با دریافت پذیرش از یک کالج معتبر زبان، ویزای تحصیلی یا اقامت موقت دریافت می‌کند. برای سال تحصیلی{' '}
                <strong>۲۰۲۶-۲۰۲۷</strong>، ارائه گواهی ثبت‌نام در دوره فشرده (معمولاً حداقل <strong>۱۵ تا ۲۰ ساعت آموزش در هفته</strong>)، اثبات تمکن مالی برای پوشش هزینه‌های زندگی (متناسب با کشور مقصد بین{' '}
                <strong>۱۰ تا ۱۵ هزار یورو در سال</strong>) و بیمه معتبر از الزامات اصلی سفارت است.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی رایگان شرایط کالج زبان
              </button>
              <a
                href="/blog/language-college-visa"
                onClick={handleLinkNav('blog-post', 'language-college-visa')}
                className="rounded-2xl border border-amber-400/40 bg-amber-500/10 px-5 py-3.5 text-xs sm:text-sm font-bold text-amber-200 hover:bg-amber-500/20 transition inline-flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4 text-amber-300" />
                نسخه کامل مقاله در بانک مقالات دیاکو
              </a>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره مستقیم در واتساپ
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&h=600&q=80"
                alt="مهاجرت از طریق کالج زبان و دوره‌های آموزش زبان در خارج از کشور در سال ۲۰۲۶ با هلدینگ دیاکو"
                className="w-full h-80 sm:h-96 object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/75 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <MapPin className="h-4 w-4" />
                  کالج‌های معتبر آلمان، اتریش، مجارستان و اسپانیا (۲۰۲۶–۲۰۲۷)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  حداقل ۱۵–۲۰ ساعت آموزش هفتگی • تمکن ۱۰–۱۵ هزار یورو در سال • امکان تبدیل به اقامت دانشگاهی
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2 text-xs font-black text-amber-300 mb-3">
            <List className="h-4 w-4" />
            <span>فهرست مطالب راهنمای کالج زبان ۲۰۲۶–۲۰۲۷</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            {tocItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 px-3 py-2 text-slate-200 hover:text-amber-300 transition"
              >
                <span className="text-amber-400 font-black">{idx + 1}.</span>
                <span className="truncate">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ۱. معرفی مسیر و مخاطبان ---------- */}
      <section id="what-is-language-college" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-5">
          <h2 className="text-2xl md:text-3xl font-black">مهاجرت از طریق کالج زبان چیست و برای چه کسانی مناسب است؟</h2>
          <p className="text-sm text-slate-200 leading-8 text-justify">
            بسیاری از متقاضیان مهاجرت تحصیلی یا کاری به دلیل عدم تسلط کافی به زبان کشور مقصد (مانند زبان آلمانی برای آلمان و اتریش) نمی‌توانند مستقیماً برای دانشگاه یا ویزای کار اقدام کنند.{' '}
            <strong>دوره‌های آمادگی زبان (Language College / Sprachkurs)</strong> این فرصت را فراهم می‌کنند تا با دریافت ویزای قانونی، وارد کشور مقصد شده، زبان را از سطح صفر یا پایه تا سطح دانشگاهی (مثل B2 یا C1) یاد بگیرید و سپس وارد دانشگاه یا بازار کار شوید.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: GraduationCap,
                title: 'متقاضیان تحصیل رایگان / کم‌هزینه در اروپا',
                text: 'فارغ‌التحصیلانی که می‌خواهند تحصیلات دانشگاهی خود را رایگان یا با کمترین هزینه در آلمان و اتریش ادامه دهند.',
              },
              {
                icon: Globe,
                title: 'یادگیری زبان در محیط بومی',
                text: 'افرادی که می‌خواهند در محیط اصلی زبان‌آموزی و با استانداردهای بین‌المللی در کوتاه‌ترین زمان به سطح آکادمیک برسند.',
              },
              {
                icon: ShieldCheck,
                title: 'ورود قانونی و کم‌ریسک به اروپا',
                text: 'متقاضیانی که به دنبال یک مسیر ساختاریافته و قانونی برای ورود اولیه به خاک اروپا و ادامه مسیر اقامت هستند.',
              },
            ].map((card, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <card.icon className="h-5 w-5 text-amber-400 mb-2" />
                <h3 className="font-bold text-sm text-white mb-1">{card.title}</h3>
                <p className="text-xs text-slate-300 leading-6">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ۲. مقایسه تعاملی + جدول مقاصد برتر ---------- */}
      <section id="top-destinations" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black mb-3">مقاصد برتر برای مهاجرت زبان‌آموزی در سال ۲۰۲۶–۲۰۲۷</h2>
        <p className="text-sm text-slate-400 mb-6">
          روی هر کشور کلیک کنید تا جزئیات شهریه، تمکن مالی و مسیر تبدیل ویزا را ببینید، یا از جدول کامل زیر برای مقایسه هم‌زمان استفاده نمایید.
        </p>

        {/* Interactive Explorer */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6 mb-8">
          <div className="flex flex-wrap gap-2 mb-5">
            {DESTINATION_COMPARISON.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setSelectedDestKey(item.key)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  selectedDestKey === item.key
                    ? 'bg-[#f5a623] text-[#082833]'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10'
                }`}
              >
                {item.country}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="text-slate-400 mb-1">نوع دوره و مدت</div>
              <div className="font-bold text-white leading-6">{selectedDest.lang}</div>
              <div className="text-emerald-300 font-bold mt-1">{selectedDest.duration}</div>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="text-slate-400 mb-1">شهریه و تمکن زندگی</div>
              <div className="font-bold text-amber-300 leading-6">{selectedDest.tuition}</div>
              <div className="text-slate-300 mt-1">تمکن زندگی: {selectedDest.living}</div>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="text-slate-400 mb-1">مدرک زبان پایه</div>
              <div className="font-bold text-white leading-6">{selectedDest.minBaseLang}</div>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 flex flex-col justify-between">
              <div>
                <div className="text-slate-400 mb-1">تبدیل ویزا پس از دوره</div>
                <div className="font-bold text-slate-200 leading-6">{selectedDest.conversion}</div>
              </div>
              <a
                href={`/${selectedDest.page}`}
                onClick={handleLinkNav(selectedDest.page)}
                className="mt-3 text-amber-300 hover:underline font-black inline-flex items-center gap-1"
              >
                مشاهده صفحه تخصصی این مسیر ↗
              </a>
            </div>
          </div>
        </div>

        {/* Full HTML Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-xs md:text-sm text-right">
            <thead className="bg-white/5 text-amber-300 font-bold">
              <tr>
                <th className="p-4">کشور مقصد</th>
                <th className="p-4">نوع زبان اصلی</th>
                <th className="p-4">مدت‌زمان متداول دوره‌ها</th>
                <th className="p-4">امکان تبدیل ویزا پس از پایان دوره</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-white/[0.02]">
              <tr>
                <td className="p-4 font-bold text-white">آلمان</td>
                <td className="p-4 text-slate-300">آلمانی (آمادگی TestDaF یا DSH)</td>
                <td className="p-4 text-emerald-300 font-bold">۶ ماه تا ۱ سال</td>
                <td className="p-4 text-slate-300">تبدیل به ویزای دانشجویی دانشگاه یا جستجوی کار</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">اتریش</td>
                <td className="p-4 text-slate-300">آلمانی (کالج‌های وین و گراتس)</td>
                <td className="p-4 text-emerald-300 font-bold">۶ ماه تا ۱.۵ سال</td>
                <td className="p-4 text-slate-300">تبدیل به اقامت تحصیلی یا جستجوی کار (Job Seeker / RWR)</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">مجارستان</td>
                <td className="p-4 text-slate-300">انگلیسی / مجاری (دوره‌های فاندیشن)</td>
                <td className="p-4 text-emerald-300 font-bold">۹ ماه تا ۱ سال</td>
                <td className="p-4 text-slate-300">ورود مستقیم به دانشگاه‌های پزشکی، مهندسی و بیزینس</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">یونان / اسپانیا</td>
                <td className="p-4 text-slate-300">یونانی / اسپانیایی یا انگلیسی</td>
                <td className="p-4 text-emerald-300 font-bold">۶ ماه تا ۱ سال</td>
                <td className="p-4 text-slate-300">تمدید اقامت تحصیلی و تبدیل به اقامت‌های بلندمدت</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------- ۳. شرایط و مدارک ---------- */}
      <section id="requirements" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black mb-4">شرایط عمومی و مدارک لازم برای اخذ پذیرش و ویزای زبان</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {[
            {
              title: 'پذیرش قطعی از کالج زبان معتبر',
              text: 'ثبت‌نام در یک دوره فشرده (Intensive Course) با حداقل ۱۵ الی ۲۰ ساعت آموزش حضوری در هفته.',
            },
            {
              title: 'مدرک زبان پایه (در صورت نیاز سفارت)',
              text: 'برخی سفارت‌ها برای صدور ویزای زبان آلمانی، داشتن مدرک پایه (حداقل A1 یا A2 گوته یا ÖSD) را از مبدأ الزامی می‌دانند.',
            },
            {
              title: 'انگیزه‌نامه تحصیلی (Motivation Letter)',
              text: 'تشریح شفاف اینکه چرا یادگیری این زبان در کشور مقصد برای آینده شغلی و تحصیلی شما ضروری است.',
            },
            {
              title: 'گواهی تمکن مالی و ترجمه رسمی مدارک',
              text: 'ارائه حساب بلوکه‌شده یا مدارک مالی حمایتی برای پوشش هزینه‌های زندگی + ترجمه رسمی دیپلم، پیش‌دانشگاهی یا مدارک دانشگاهی و ریزنمرات.',
            },
          ].map((req, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3">
              <FileCheck2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white mb-1">{req.title}</h3>
                <p className="text-xs text-slate-300 leading-6">{req.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- ۴. هزینه‌ها و تمکن + کار و همراه ---------- */}
      <section id="costs-and-financials" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
              <Euro className="h-6 w-6 text-amber-400" />
              هزینه‌های دوره‌های زبان و تمکن مالی مورد نیاز (۲۰۲۶–۲۰۲۷)
            </h2>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-200 leading-7">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>شهریه آلمان و اتریش:</strong> در کالج‌های خصوصی معتبر یا دوره‌های آمادگی دانشگاه بین{' '}
                  <strong className="text-amber-300">۳,۰۰۰ تا ۷,۰۰۰ یورو در سال</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>شهریه مجارستان و سایر کشورها:</strong> بین{' '}
                  <strong className="text-amber-300">۴,۰۰۰ تا ۸,۰۰۰ یورو در سال</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>تمکن مالی زندگی (Living Expenses):</strong> برای سال تحصیلی ۲۰۲۶–۲۰۲۷، بین{' '}
                  <strong className="text-emerald-300">۹۰۰ تا ۱,۲۰۰ یورو در ماه</strong> (سالانه حدود ۱۱,۰۰۰ تا ۱۵,۰۰۰ یورو) که پیش از صدور ویزا باید اثبات شود.
                </span>
              </li>
            </ul>
          </div>

          <div id="work-and-family" className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-emerald-400" />
              آیا امکان کار پاره‌وقت و همراهی خانواده وجود دارد؟
            </h2>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-200 leading-7">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>کار پاره‌وقت:</strong> در بسیاری از کشورها (مانند آلمان و اتریش)، دانشجویان دوره‌های صرف زبان‌آموزی در طول دوره محدودیت اشتغال دارند یا فقط در تعطیلات مجازند؛ اما بلافاصله پس از ورود به دانشگاه اصلی، اجازه کار پاره‌وقت (۱۰ تا ۲۰ ساعت در هفته) فعال می‌شود.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>ویزای همراه خانواده:</strong> در اکثر پرونده‌های کالج زبان، اعطای ویزای همراه (همسر و فرزندان) همزمان با دوره زبان امکان‌پذیر نیست و دولت‌ها پس از ورود دانشجو به دانشگاه اصلی اجازه الحاق خانواده را صادر می‌کنند.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- ۵. چالش‌های واقعی پرونده‌ها (Information Gain) ---------- */}
      <section id="expert-insights" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-[#0a2934] to-[#0a2934] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-7 w-7 text-amber-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-amber-300 mb-3">
                چالش‌های واقعی پرونده‌ها و نکات کلیدی هلدینگ دیاکو (Information Gain)
              </h2>
              <p className="text-sm text-slate-200 leading-8 text-justify mb-4">
                بر اساس تجربه مستقیم تیم اجرایی <strong>هلدینگ مهاجرتی دیاکو</strong>، بزرگ‌ترین خطای متقاضیان در ویزای کالج زبان،{' '}
                <strong>«ضعف در توجیه هدف انگیزه‌نامه (Motivation Gap) برای افسر سفارت»</strong> است. اگر افسر سفارت متقاعد نشود که یادگیری این زبان دقیقاً چه کمکی به آینده شغلی یا تحصیلی شما در ایران یا اروپا می‌کند، پرونده با ریجکتی مواجه می‌شود.
              </p>
              <p className="text-sm text-slate-200 leading-8 text-justify">
                نکته دوم، انتخاب کالجی است که تاییدیه رسمی اداره مهاجرت کشور مقصد را داشته باشد تا پروسه تبدیل ویزای زبان به ویزای دانشجویی دانشگاه پس از پایان دوره با چالش قانونی مواجه نشود. تیم حقوقی دیاکو از انتخاب کالج استاندارد تا نگارش تخصصی انگیزه‌نامه و تنظیم مدارک مالی همراه شماست.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- لینک‌های داخلی ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-lg font-black text-amber-300 mb-4">صفحات تخصصی کالج زبان و تحصیل بر اساس کشور</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <a
            href="/blog/language-college-visa"
            onClick={handleLinkNav('blog-post', 'language-college-visa')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">مقاله جامع کالج زبان ۲۰۲۶–۲۰۲۷ ↗</div>
            <p className="text-slate-400 leading-5">نسخه کامل راهنما در بخش مقالات تخصصی دیاکو.</p>
          </a>
          <a
            href="/language-hungary"
            onClick={handleLinkNav('language-hungary')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">کالج زبان مجارستان (بوداپست) ↗</div>
            <p className="text-slate-400 leading-5">دوره زبان انگلیسی و فاندیشن پزشکی با هزینه زندگی اقتصادی.</p>
          </a>
          <a
            href="/academic-austria"
            onClick={handleLinkNav('academic-austria')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">دوره زبان و تحصیل در اتریش ↗</div>
            <p className="text-slate-400 leading-5">آمادگی آلمانی در دانشگاه وین و تبدیل به اقامت دانشجویی.</p>
          </a>
          <a
            href="/netherlands-study-visa"
            onClick={handleLinkNav('academic-netherlands')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">مهاجرت تحصیلی به هلند ۲۰۲۶ ↗</div>
            <p className="text-slate-400 leading-5">تحصیل به زبان انگلیسی در برترین دانشگاه‌های هلند و ویزای Zoekjaar.</p>
          </a>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">سوالات متداول مهاجرت با کالج زبان (FAQ)</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-amber-300 transition cursor-pointer"
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
      <section className="container mx-auto px-4 md:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-to-l from-emerald-900/50 to-[#0a2a33] border border-emerald-400/20 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">آماده آغاز مسیر مهاجرت تحصیلی و کالج زبان هستید؟</h2>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            تیم متخصصان اعزام دانشجو و حقوقی هلدینگ مهاجرتی دیاکو با دفاتر فعال در تهران و اروپا، آماده ارزیابی شرایط تحصیلی، انتخاب بهترین کالج زبان و اخذ ویزای شماست.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-8 py-3.5 text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
            >
              ارزیابی رایگان پرونده کالج زبان
            </button>
            <a
              href="https://wa.me/989197340829"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              ۰۲۱-۹۱۶۹۳۹۵۵ | واتساپ ۰۹۱۹۷۳۴۰۸۲۹
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LanguageCollegeVisaPage;
