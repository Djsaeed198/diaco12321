import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Building2,
  Euro,
  MapPin,
  Users,
  BookOpen,
  Globe,
  Menu,
  X,
  Star,
  Quote,
  Briefcase,
  Home,
  Wallet,
  Calendar,
  ExternalLink,
  AlertTriangle,
  List,
  Award,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const universities = [
  {
    name: 'TU Delft',
    fullName: 'Delft University of Technology',
    city: 'دلفت',
    qs: 47,
    focus: 'مهندسی، فناوری، معماری',
    tuition: '~€19,906 / سال (BSc & MSc)',
    acceptance: '~۲۵٪',
    image:
      'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80',
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
    image:
      'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80',
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
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
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
  {
    uni: 'UvA (برخی برنامه‌ها)',
    date: '۱ فوریه ۲۰۲۶',
    note: 'ثبت‌نام Studielink',
    color: 'text-amber-300',
  },
  {
    uni: 'ماستریخت (اکثر برنامه‌ها)',
    date: '۱ آوریل ۲۰۲۶',
    note: 'تکمیل کل فرآیند',
    color: 'text-blue-300',
  },
  {
    uni: 'توصیه کلی (غیر EU)',
    date: '۱ مه ۲۰۲۶',
    note: 'حداقل ۳ ماه قبل اقدام',
    color: 'text-emerald-300',
  },
  {
    uni: 'Saxion / برخی مؤسسات',
    date: '۱ ژوئن ۲۰۲۶',
    note: 'مهلت نهایی برخی برنامه‌ها',
    color: 'text-slate-300',
  },
];

const faqs = [
  {
    q: 'آیا برای تحصیل در هلند مدرک زبان هلندی لازم است؟',
    a: 'خیر؛ برای دوره‌های بین‌المللی که تعداد آن‌ها بیش از ۲,۱۰۰ رشته است، تدریس به زبان انگلیسی انجام می‌شود و نیازی به دانستن زبان هلندی در مرحله پذیرش نیست (هرچند یادگیری آن برای زندگی روزمره پیشنهاد می‌شود).',
  },
  {
    q: 'آیا پس از تحصیل در هلند می‌توان اقامت دائم گرفت؟',
    a: 'بله؛ پس از فارغ‌التحصیلی، با استفاده از ویزای Orientation Year (Zoekjaar) و تبدیل آن به ویزای کار متخصصان (Kennismigrant / Knowledge Migrant) با حداقل حقوق کاهش‌یافته €۳,۱۲۲ ناخالص در ماه، پس از ۵ سال اقامت قانونی و کاری مداوم می‌توانید برای اقامت دائم یا پاسپورت هلند اقدام کنید.',
  },
  {
    q: 'آیا امکان کار پاره‌وقت حین تحصیل وجود دارد؟',
    a: 'بله؛ دانشجویان بین‌المللی مجاز به ۱۶ ساعت کار پاره‌وقت در هفته در طول ترم تحصیلی و کار تمام‌وقت در ماه‌های ژوئن، جولای و آگوست (تابستان) هستند (کارفرما مجوز TWV رایگان صادر می‌کند).',
  },
  {
    q: 'تفاوت پذیرش در دانشگاه‌های پژوهش‌محور با علوم کاربردی چیست؟',
    a: 'دانشگاه‌های پژوهش‌محور (Research Universities) روی مباحث تئوری و آکادمیک تمرکز دارند (کارشناسی ۳ ساله)، در حالی که دانشگاه‌های علوم کاربردی (HBO) بر مهارت‌های عملی، پروژه‌های صنعتی و کارآموزی اجباری متمرکز هستند (کارشناسی ۴ ساله).',
  },
  {
    q: 'میزان تمکن مالی ویزای تحصیلی هلند (IND) در سال ۲۰۲۶ چقدر است؟',
    a: 'برای سال ۲۰۲۶، برآورد کل هزینه‌های زندگی دانشجویی بین ۱۲,۰۰۰ تا ۱۵,۰۰۰ یورو در سال است و حداقل معیار رسمی اعلام‌شده توسط اداره مهاجرت هلند (IND) معادل ۱,۱۳۰.۷۷ یورو در ماه (۱۳,۵۶۹.۲۴ یورو در سال) علاوه بر شهریه سال اول است.',
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

const tocItems = [
  { id: 'why-netherlands', label: 'چرا تحصیل در هلند؟ مزایای کلیدی ۲۰۲۶' },
  { id: 'education-system', label: 'سیستم آموزش عالی (WO در برابر HBO)' },
  { id: 'universities', label: 'دانشگاه‌های برتر (TU Delft، UvA و EUR)' },
  { id: 'admission-requirements', label: 'شرایط و مدارک اخذ پذیرش تحصیلی' },
  { id: 'tuition-and-costs', label: 'شهریه، تمکن مالی IND و هزینه زندگی' },
  { id: 'post-graduation', label: 'کار دانشجویی، همراه و ویزای Zoekjaar' },
  { id: 'expert-insights', label: 'چالش‌های واقعی (بحران مسکن) و نکات دیاکو' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const AcademicNetherlandsPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'مهاجرت تحصیلی به هلند ۲۰۲۶ | شرایط پذیرش، هزینه و ویزا | دیاکو',
    description:
      'راهنمای جامع مهاجرت تحصیلی به هلند در سال ۲۰۲۶. بررسی شرایط اخذ پذیرش دانشگاه‌های هلند، هزینه‌های تحصیل و زندگی، ویزای همراه و مشاوره تخصصی هلدینگ دیاکو.',
    canonical: 'https://www.dia-co.ir/netherlands-study-visa',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'مهاجرت تحصیلی به هلند ۲۰۲۶',
      'تحصیل در هلند ۲۰۲۶',
      'TU Delft شهریه',
      'دانشگاه آمستردام UvA',
      'ویزای Zoekjaar هلند',
      'Orientation Year Netherlands',
      'Studielink deadline 2026',
      'تمکن مالی IND هلند ۲۰۲۶',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/netherlands-study-visa/#article',
          headline: 'مهاجرت تحصیلی به هلند ۲۰۲۶ | شرایط پذیرش، هزینه و ویزا',
          description:
            'راهنمای جامع مهاجرت تحصیلی به هلند در سال ۲۰۲۶. بررسی شرایط اخذ پذیرش دانشگاه‌های هلند، هزینه‌های تحصیل و زندگی، ویزای همراه و مشاوره تخصصی هلدینگ دیاکو.',
          image: [
            'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T10:00:00+03:30',
          dateModified: '2026-11-14T12:30:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و تحصیلی هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          reviewedBy: {
            '@type': 'Organization',
            name: 'دفتر اجرایی دیاکو در اروپا (Budapest / Vienna)',
            url: 'https://www.dia-co.ir/',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://www.dia-co.ir/#organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
            logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' },
          },
          citation: ['https://www.studyinholland.nl/', 'https://ind.nl/en'],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/netherlands-study-visa',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/netherlands-study-visa/#faq',
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
              name: 'مهاجرت تحصیلی به هلند',
              item: 'https://www.dia-co.ir/netherlands-study-visa',
            },
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
                <GraduationCap className="h-5 w-5 text-orange-400" />
                <span className="font-black text-sm text-amber-300">تحصیل در هلند ۲۰۲۶</span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-200">
              <a href="#why-netherlands" className="hover:text-orange-300 transition">مزایا</a>
              <a href="#education-system" className="hover:text-orange-300 transition">نظام آموزشی</a>
              <a href="#universities" className="hover:text-orange-300 transition">دانشگاه‌ها</a>
              <a href="#tuition-and-costs" className="hover:text-orange-300 transition">شهریه و تمکن</a>
              <a href="#post-graduation" className="hover:text-orange-300 transition">ویزای Zoekjaar</a>
              <a href="#faq" className="hover:text-orange-300 transition">سوالات متداول</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="hidden sm:inline-flex rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی رایگان پذیرش
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
                  className="block py-1 hover:text-orange-300"
                >
                  • {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ---------- Hero & E-E-A-T Metadata ---------- */}
      <section className="container mx-auto px-4 md:px-8 pt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold text-orange-300">
              <Sparkles className="h-4 w-4" />
              راهنمای مرجع ۲۰۲۶ | ۲,۱۰۰+ رشته انگلیسی‌زبان & ویزای Zoekjaar
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              راهنمای جامع مهاجرت تحصیلی به هلند در سال ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-orange-400">
                (شرایط، هزینه‌ها و ویزا)
              </span>
            </h1>

            {/* E-E-A-T Trust Strip */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 grid sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Award className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">نویسنده و تدوین:</span>
                  <strong className="text-white">دپارتمان حقوقی و تحصیلی هلدینگ مهاجرتی دیاکو</strong>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">بازبینی تخصصی:</span>
                  <strong className="text-emerald-300">دفتر اجرایی دیاکو در اروپا (Budapest / Vienna)</strong>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="h-4 w-4 text-sky-400 shrink-0" />
                <span>آخرین به‌روزرسانی: <strong>نوامبر ۲۰۲۶</strong></span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-slate-300">
                <ExternalLink className="h-4 w-4 text-orange-400 shrink-0" />
                <span>منابع رسمی:</span>
                <a
                  href="https://www.studyinholland.nl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:underline font-bold"
                >
                  studyinholland.nl
                </a>
                <span>•</span>
                <a
                  href="https://ind.nl/en/residence-permits/study"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:underline font-bold"
                >
                  ind.nl
                </a>
              </div>
            </div>

            {/* BLUF Box */}
            <div className="rounded-2xl border-r-4 border-[#f5a623] bg-[#0a2a35] p-5 shadow-lg">
              <div className="text-xs font-black text-amber-300 mb-2">
                خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج هوشمند):
              </div>
              <p className="text-sm text-slate-100 leading-7 text-justify">
                <strong>مهاجرت تحصیلی به هلند</strong> یکی از پرمخاطب‌ترین مسیرهای ورود به اروپا است. نظام آموزشی این کشور با بیش از{' '}
                <strong>۲,۱۰۰ رشته تحصیلی انگلیسی‌زبان</strong>، استانداردهای جهانی بالایی دارد. برای تحصیل در هلند در سال ۲۰۲۶، به اخذ پذیرش از یک دانشگاه معتبر، اثبات تمکن مالی برای پوشش هزینه‌های زندگی (حدود{' '}
                <strong>۱۲,۰۰۰ تا ۱۵,۰۰۰ یورو در سال</strong>؛ حداقل معیار IND معادل €۱,۱۳۰.۷۷ ماهانه) و مدرک زبان معتبر (<strong>آیلتس حداقل ۶.۵</strong>) نیاز دارید. همچنین فارغ‌التحصیلان می‌توانند از ویزای جستجوی کار یک‌ساله (<strong>Orientation Year / Zoekjaar</strong>) برای ورود به بازار کار استفاده کنند.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی رزومه جهت پذیرش هلند
              </button>
              <a
                href="/blog/netherlands-study-visa"
                onClick={handleLinkNav('blog-post', 'netherlands-study-visa')}
                className="rounded-2xl border border-amber-400/40 bg-amber-500/10 px-5 py-3.5 text-xs sm:text-sm font-bold text-amber-200 hover:bg-amber-500/20 transition inline-flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4 text-amber-300" />
                مطالعه نسخه تحلیلی در بانک مقالات دیاکو
              </a>
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
                src="https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&h=600&q=80"
                alt="مهاجرت تحصیلی به هلند و تحصیل در دانشگاه‌های برتر این کشور در سال ۲۰۲۶ با هلدینگ دیاکو"
                className="w-full h-80 sm:h-96 object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/75 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-300">
                  <MapPin className="h-4 w-4" />
                  هلند — بیش از ۲,۱۰۰ برنامه انگلیسی‌زبان & اقامت ۱ ساله Zoekjaar
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  تبدیل به ویزای کار متخصصان (Kennismigrant) با حقوق €۳,۱۲۲ ناخالص در ماه
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2 text-xs font-black text-amber-300 mb-3">
            <List className="h-4 w-4" />
            <span>فهرست مطالب راهنمای مهاجرت تحصیلی به هلند ۲۰۲۶</span>
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

      {/* ---------- ۱. چرا تحصیل در هلند؟ ---------- */}
      <section id="why-netherlands" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black mb-4">چرا تحصیل در هلند؟ مزایای کلیدی (۲۰۲۶)</h2>
        <p className="text-sm text-slate-300 leading-8 mb-6 max-w-4xl">
          هلند به لطف کیفیت بالای زندگی، جامعه انگلیسی‌زبان (بیش از ۹۰٪ مردم به انگلیسی مسلط هستند) و حضور دانشگاه‌های تراز اول جهانی در نظام رتبه‌بندی QS، به یکی از قطب‌های اصلی جذب دانشجویان بین‌المللی تبدیل شده است.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Globe,
              title: 'تنوع دوره‌های انگلیسی‌زبان',
              desc: 'بیش از ۲,۱۰۰ رشته دانشگاهی در مقاطع کارشناسی، ارشد و دکتری به صورت ۱۰۰٪ انگلیسی تدریس می‌شوند.',
            },
            {
              icon: GraduationCap,
              title: 'دانشگاه‌های معتبر جهانی',
              desc: 'حضور دانشگاه‌های TU Delft (رتبه ۴۷)، آمستردام UvA (رتبه ۵۳)، اوترخت و لیدن در میان برترین‌های جهان.',
            },
            {
              icon: Briefcase,
              title: 'فرصت اقامت Orientation Year',
              desc: 'دریافت ویزای ۱ ساله جستجوی کار پس از فراغت از تحصیل برای ورود به بازار کار تخصصی هلند.',
            },
            {
              icon: ShieldCheck,
              title: 'محیط امن و بین‌المللی',
              desc: 'جامعه‌ای پویا، چندفرهنگی و با بالاترین استانداردهای رفاهی، فناوری و عدالت اجتماعی در اروپا.',
            },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <item.icon className="h-6 w-6 text-orange-400 mb-3" />
              <h3 className="font-black text-sm text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- ۲. سیستم آموزش عالی (WO vs HBO) ---------- */}
      <section id="education-system" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black mb-4">سیستم آموزش عالی و مقاطع تحصیلی در هلند</h2>
        <p className="text-sm text-slate-300 leading-8 mb-6">
          سیستم دانشگاهی هلند به دو دسته اصلی تقسیم می‌شود که انتخاب درست آن نقش مستقیمی در طول دوره تحصیل، شهریه و آینده شغلی شما دارد:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-xs md:text-sm text-right">
            <thead className="bg-white/5 text-amber-300 font-bold">
              <tr>
                <th className="p-4">نوع دانشگاه</th>
                <th className="p-4">تمرکز علمی / مهارتی</th>
                <th className="p-4">مدت مقاطع</th>
                <th className="p-4">مسیر شغلی و آکادمیک</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-white/[0.02]">
              <tr>
                <td className="p-4 font-bold text-white">۱. دانشگاه‌های پژوهش‌محور (Research Universities / WO)</td>
                <td className="p-4 text-slate-300">متمرکز بر مباحث علمی، نظری، تئوریک و پژوهش دانشگاهی</td>
                <td className="p-4 text-emerald-300 font-bold">کارشناسی ۳ ساله | ارشد ۱ یا ۲ ساله</td>
                <td className="p-4 text-slate-300">مناسب ادامه تحصیل در ارشد پژوهشی، دکتری (PhD) و مشاغل تخصصی R&D</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-white">۲. دانشگاه‌های علوم کاربردی (Applied Sciences / HBO)</td>
                <td className="p-4 text-slate-300">متمرکز بر آموزش‌های عملی، پروژه‌های صنعتی و مهارت بازار کار</td>
                <td className="p-4 text-orange-300 font-bold">کارشناسی ۴ ساله (شامل کارآموزی اجباری)</td>
                <td className="p-4 text-slate-300">مناسب ورود مستقیم به بازار کار با دوره Internship اجباری در شرکت‌های هلندی</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------- ۳. دانشگاه‌های برتر ---------- */}
      <section id="universities" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">دانشگاه‌های برتر هلند در سال ۲۰۲۶</h2>
        <p className="text-sm text-slate-400 text-center mb-10">رتبه QS، شهریه غیر EU و تمرکز تخصصی</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {universities.map((uni, idx) => (
            <article
              key={idx}
              className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-orange-400/30 transition group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={uni.image}
                  alt={uni.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
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

      {/* ---------- ۴. شرایط و مدارک پذیرش ---------- */}
      <section id="admission-requirements" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black mb-4">شرایط اصلی و مدارک لازم برای اخذ پذیرش تحصیلی</h2>
          <p className="text-sm text-slate-300 leading-7 mb-6">
            برای دریافت پذیرش از دانشگاه‌های هلند در سال ۲۰۲۶ (از طریق سامانه رسمی Studielink)، آماده‌سازی دقیق مدارک زیر ضروری است:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {[
              {
                title: 'مدرک تحصیلی قبلی با ترجمه رسمی',
                text: 'برای لیسانس (دیپلم ۱۲ ساله + پیش‌دانشگاهی یا سال اول دانشگاه بسته به نظام دانشگاه) و برای ارشد (مدرک کارشناسی معتبر + ریزنمرات رسمی).',
              },
              {
                title: 'مدرک زبان انگلیسی معتبر',
                text: 'حداقل نمره آیلتس ۶.۵ (یا تافل iBT معادل) برای اکثر رشته‌ها؛ دانشگاه‌های تراز اول در برخی رشته‌ها آیلتس ۷.۰ درخواست می‌کنند.',
              },
              {
                title: 'انگیزه‌نامه (Motivation Letter)',
                text: 'نامه‌ای تخصصی و هدفمند که دلایل انتخاب رشته، دانشگاه و برنامه آینده شغلی شما را به طور مستند تشریح می‌کند.',
              },
              {
                title: 'توصیه‌نامه‌ها (Recommendation Letters) و رزومه Europass',
                text: 'حداقل ۲ توصیه‌نامه تحصیلی یا شغلی برای مقطع ارشد و دکتری به همراه CV ساختاریافته بر اساس استانداردهای اروپایی.',
              },
            ].map((req, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white mb-1">{req.title}</h3>
                  <p className="text-xs text-slate-300 leading-6">{req.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ۵. هزینه‌ها، شهریه و تمکن مالی IND ---------- */}
      <section id="tuition-and-costs" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-3">هزینه‌های تحصیل و تمکن مالی مورد نیاز در هلند (۲۰۲۶)</h2>
        <p className="text-xs sm:text-sm text-slate-400 text-center mb-8 max-w-3xl mx-auto">
          برنامه‌ریزی مالی دقیق یکی از شروط اصلی اخذ ویزای تحصیلی (MVV / VVR) از اداره مهاجرت هلند (IND) است: شهریه کارشناسی ۸,۰۰۰ تا ۱۵,۰۰۰ یورو، ارشد ۱۱,۰۰۰ تا ۲۲,۰۰۰ یورو، و تمکن مالی زندگی حدود ۱۲,۰۰۰ تا ۱۵,۰۰۰ یورو در سال (معیار ماهانه IND در ۲۰۲۶: €۱,۱۳۰.۷۷ در ماه).
        </p>

        <div className="overflow-x-auto rounded-2xl border border-white/10 mb-8">
          <table className="w-full text-xs md:text-sm text-right">
            <thead className="bg-white/5 text-orange-300 font-bold">
              <tr>
                <th className="p-4">دانشگاه</th>
                <th className="p-4">مقطع / رشته</th>
                <th className="p-4">شهریه سالانه (Non-EU)</th>
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { city: 'آمستردام', rent: '€700 – €1,000+', total: '€1,200 – €1,500 / ماه', icon: Building2 },
            { city: 'اوترخت / روتردام', rent: '€500 – €800', total: '€1,000 – €1,300 / ماه', icon: Home },
            { city: 'دلفت', rent: '€550 – €900', total: '€1,000 – €1,200 / ماه', icon: Wallet },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <item.icon className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="font-black text-sm text-white mb-1">{item.city}</div>
              <div className="text-xs text-slate-300">اجاره: {item.rent}</div>
              <div className="text-[11px] text-emerald-300 mt-1 font-bold">کل ماهانه: {item.total}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- ۶. ددلاین‌ها، کار دانشجویی، همراه و Zoekjaar ---------- */}
      <section id="post-graduation" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
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
              کار دانشجویی، ویزای همراه و Orientation Year (Zoekjaar)
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200 leading-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>کار دانشجویی:</strong> تا ۱۶ ساعت در هفته در طول ترم و کار تمام‌وقت در تعطیلات تابستانی.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>ویزای همراه:</strong> دانشجویان ارشد و دکتری می‌توانند برای همسر و فرزندان زیر ۱۸ سال درخواست الحاق خانواده (Family Reunification) دهند.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>اقامت Zoekjaar (تا ۳ سال پس از فراغت از تحصیل):</strong> ۱۲ ماه اقامت جستجوی کار و تبدیل به اقامت کار متخصصان (Kennismigrant) با حقوق <strong>€۳,۱۲۲/ماه</strong> ناخالص.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>الزام تمکن مالی IND ۲۰۲۶:</strong> اثبات ۱۲,۰۰۰ تا ۱۵,۰۰۰ یورو برای هزینه‌های زندگی (حداقل رسمی IND معادل €۱۳,۵۶۹.۲۴/سال).</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- ۷. چالش‌های واقعی پرونده‌ها (Information Gain) ---------- */}
      <section id="expert-insights" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-[#0a2934] to-[#0a2934] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-7 w-7 text-amber-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-amber-300 mb-3">
                چالش‌های واقعی پرونده‌ها و نکات کلیدی هلدینگ دیاکو (Information Gain)
              </h2>
              <p className="text-sm text-slate-200 leading-8 text-justify mb-4">
                بر اساس تجربه مستقیم تیم اجرایی <strong>هلدینگ مهاجرتی دیاکو</strong>، بزرگ‌ترین چالش متقاضیان تحصیل در هلند نه اخذ پذیرش دانشگاه، بلکه{' '}
                <strong>«بحران مسکن در شهرهای بزرگ هلند (آمستردام، روتردام، اوترخت و لاهه)»</strong> است. دانشگاه‌های هلند برای همه دانشجویان خوابگاه تضمین‌شده ندارند و پیدا کردن خانه شخصی در بازار اجاره بسیار رقابتی است.
              </p>
              <p className="text-sm text-slate-200 leading-8 text-justify">
                نکته دوم، فرآیند سخت‌گیرانه <strong>نوسانات ارزی و تطابق مدارک تمکن مالی</strong> توسط اداره مهاجرت IND است. تیم حقوقی دیاکو پیش از ارسال مدارک به سفارت و دانشگاه، استراتژی مالی پرونده و اقامتگاه موقت دانشجو را بررسی می‌کند تا از هرگونه ریجکتی به دلیل نقص مدارک مالی یا مسکن جلوگیری شود.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- لینک‌های داخلی خوشه‌ای ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-lg font-black text-amber-300 mb-4">مسیرهای مرتبط پیشنهادی برای متقاضیان تحصیل و اقامت هلند</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <a
            href="/blog/netherlands-study-visa"
            onClick={handleLinkNav('blog-post', 'netherlands-study-visa')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">مقاله تخصصی تحصیل در هلند ۲۰۲۶ ↗</div>
            <p className="text-slate-400 leading-5">نسخه تحلیلی کامل در بانک مقالات دیاکو همراه با جدول مقایسه نظام آموزشی و اسکیما.</p>
          </a>
          <a
            href="/language-college-visa"
            onClick={handleLinkNav('language-college-visa')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">راهنمای مهاجرت از طریق کالج زبان ↗</div>
            <p className="text-slate-400 leading-5">مقایسه کالج‌های زبان اروپا (آلمان، اتریش، مجارستان و هلند) و شروط ویزا.</p>
          </a>
          <a
            href="/language-netherlands"
            onClick={handleLinkNav('language-netherlands')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">دوره زبان و فاندیشن در هلند ↗</div>
            <p className="text-slate-400 leading-5">آمادگی ورود به دانشگاه‌های هلند برای داوطلبان بدون مدرک زبان نهایی.</p>
          </a>
        </div>
      </section>

      {/* ---------- نظرات ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
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
      <section id="faq" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">سوالات متداول تحصیل در هلند (FAQ)</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-orange-300 transition cursor-pointer"
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
      <section className="container mx-auto px-4 md:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-to-l from-orange-900/60 to-[#0a2a33] border border-orange-400/20 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">آماده آغاز مسیر تحصیل در هلند هستید؟</h2>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            تیم متخصصان تحصیلی و حقوقی هلدینگ مهاجرتی دیاکو با دفاتر فعال در تهران و اروپا، از انتخاب رشته و نگارش انگیزه‌نامه تا اخذ پذیرش قطعی و ویزای MVV/VVR کنار شماست.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-8 py-3.5 text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
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
              ۰۲۱-۹۱۶۹۳۹۵۵ | واتساپ ۰۹۱۹۷۳۴۰۸۲۹
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicNetherlandsPage;