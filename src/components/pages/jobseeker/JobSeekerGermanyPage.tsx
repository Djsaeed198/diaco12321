import React, { useState } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Copy, Sparkles, ArrowLeft,
  AlertTriangle, CalendarDays, Menu, X, Star, Quote, MapPin, Clock,
  Users, Home, Info, Globe, Plane, Briefcase, GraduationCap, Award,
  Search, Calculator, TrendingUp, ExternalLink, ShieldCheck, BookOpen,
  FileCheck2, ThumbsUp, ThumbsDown, FileWarning, Languages, Euro,
  Wallet, Building2,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ---------- داده‌های ساختاریافته ۲۰۲۷ ---------- */
const scoringRows = [
  { label: 'مدرک تحصیلی معادل‌سازی‌شده', max: 2, icon: GraduationCap, color: 'text-amber-300', detail: 'مدرک دانشگاهی یا فنی‌حرفه‌ای معادل در آلمان=۲ | تشخیص جزئی=۱' },
  { label: 'مشاغل کمبود (Engpassberufe)', max: 1, icon: Award, color: 'text-teal-300', detail: 'IT، مهندسی، بهداشت، آموزش — ۱ امتیاز اضافه' },
  { label: 'سابقه کار', max: 3, icon: Briefcase, color: 'text-emerald-300', detail: 'هر سال سابقه مرتبط=۱ | حداکثر ۳ امتیاز' },
  { label: 'زبان (آلمانی/انگلیسی)', max: 4, icon: Languages, color: 'text-indigo-300', detail: 'A1 آلمانی=۱ | A2=۲ | B1=۳ | B2=۴ | انگلیسی B2=۱' },
  { label: 'سن', max: 2, icon: Clock, color: 'text-rose-300', detail: '≤۳۵=۲ | ≤۴۰=۱ | >۴۰=۰' },
  { label: 'سابقه اقامت در آلمان (≥۶ ماه)', max: 1, icon: Plane, color: 'text-sky-300', detail: 'تحصیل یا کار قبلی در آلمان=۱' },
  { label: 'همسر واجد شرایط', max: 1, icon: Users, color: 'text-orange-300', detail: 'همسر نیز شرایط Chancenkarte را دارد=۱' },
];

const processSteps = [
  { step: '۱', title: 'معادل‌سازی مدرک با Anabin/ZAB', detail: 'مدرک تحصیلی یا فنی‌حرفه‌ای باید در آلمان به رسمیت شناخته شود. ZAB گواهی Zeugnisbewertung صادر می‌کند.', time: '۲–۴ ماه' },
  { step: '۲', title: 'محاسبه امتیاز و کسب حداقل ۶ امتیاز', detail: 'از طریق جدول رسمی Chancenkarte. اکثر متقاضیان با مدرک + زبان + سن به ۶ می‌رسند.', time: '۱ روز' },
  { step: '۳', title: 'افتتاح حساب مسدود (Sperrkonto)', detail: 'ودیعه حدود €۱,۰۲۷ ماهانه برای ۲۰۲۷ (مبلغ دقیق سالانه اعلام می‌شود).', time: '۲–۴ هفته' },
  { step: '۴', title: 'ثبت درخواست ویزا در سفارت آلمان', detail: 'پرداخت هزینه €۷۵ + مدارک: پاسپورت، مدرک، زبان، CV، انگیزه‌نامه، بیمه.', time: '۴–۸ هفته' },
  { step: '۵', title: 'ورود به آلمان و جستجوی کار', detail: 'تا ۲۰ ساعت در هفته کار پاره‌وقت + ۲ هفته کار آزمایشی در تخصص.', time: 'تا ۱۲ ماه' },
  { step: '۶', title: 'تبدیل به بلوکارت یا اقامت کاری', detail: 'با دریافت جاب‌آفر منطبق، بدون خروج از آلمان اجازه اقامت کاری دریافت می‌کنید.', time: '۴–۸ هفته' },
];

const pros = [
  { title: 'بدون نیاز به جاب‌آفر اولیه', desc: 'می‌توانید قبل از پیدا کردن کار وارد آلمان شوید' },
  { title: 'اجازه کار پاره‌وقت ۲۰ ساعت', desc: 'در طول جستجو می‌توانید درآمد داشته باشید' },
  { title: '۲ هفته کار آزمایشی', desc: 'در حوزه تخصصی خود بدون تعهد بلندمدت' },
  { title: 'تبدیل آسان به بلوکارت', desc: 'بدون خروج از آلمان و با شرایط ساده' },
  { title: 'مسیر سریع به اقامت دائم', desc: '۲۱ ماه با B1 آلمانی پس از بلوکارت' },
  { title: 'همسر می‌تواند همراه بیاید', desc: 'با اثبات تمکن مالی و بیمه' },
  { title: 'زبان انگلیسی B2 کافی است', desc: 'برای برخی رشته‌ها نیازی به آلمانی نیست' },
  { title: 'بزرگ‌ترین اقتصاد اروپا', desc: 'فرصت‌های شغلی متنوع در همه حوزه‌ها' },
];

const cons = [
  { title: 'رقابت برای حداقل ۶ امتیاز', desc: 'بدون مدرک معادل یا زبان، رسیدن به ۶ سخت است' },
  { title: 'اثبات تمکن مالی بالا', desc: 'حساب مسدود حدود €۱۲,۳۲۴ برای ۲۰۲۷' },
  { title: 'مدت اعتبار محدود (۱ سال)', desc: 'در صورت عدم یافتن کار، تمدید دشوار است' },
  { title: 'آلمانی برای بلوکارت و PR', desc: 'B1 برای اقامت دائم و بسیاری از مشاغل' },
  { title: 'بوروکراسی آلمان', desc: 'فرآیندهای اداری می‌تواند طولانی باشد' },
  { title: 'هزینه زندگی در شهرهای بزرگ', desc: 'برلین، مونیخ و فرانکفورت گران‌ترند' },
  { title: 'بازار کار رقابتی در برخی حوزه‌ها', desc: 'به‌ویژه برای مشاغل غیرتخصصی' },
];

const sampleVisas = [
  {
    id: 'DE-2027-0205',
    name: 'A.H.',
    city: 'برلین',
    date: 'فوریه ۲۰۲۷',
    scheme: 'Chancenkarte → Blue Card',
    salary: 'Blue Card: €۴,۳۰۰ / ماه',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای کارت شانس آلمان — برلین',
  },
  {
    id: 'DE-2027-0318',
    name: 'S.R.',
    city: 'مونیخ',
    date: 'مارس ۲۰۲۷',
    scheme: 'Chancenkarte → Blue Card',
    salary: 'Blue Card: €۴,۸۵۰ / ماه',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای کارت شانس آلمان — مونیخ',
  },
  {
    id: 'DE-2027-0402',
    name: 'M.K.',
    city: 'هامبورگ',
    date: 'آوریل ۲۰۲۷',
    scheme: 'Chancenkarte → Work Permit',
    salary: 'Work Permit: €۳,۹۰۰ / ماه',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای کارت شانس آلمان — هامبورگ',
  },
];

const detailedTestimonials = [
  {
    name: 'امیر حسینی',
    role: 'مهندس نرم‌افزار',
    company: 'SAP',
    city: 'والدورف',
    date: 'مارس ۲۰۲۷',
    scheme: 'Chancenkarte → Blue Card',
    rating: 5,
    text: 'من مدرک کارشناسی ارشد مهندسی کامپیوتر از دانشگاه تهران داشتم. دیاکو ابتدا معادل‌سازی مدرک را از طریق ZAB انجام داد (۳ ماه طول کشید). سپس با محاسبه امتیاز (مدرک=۲، زبان انگلیسی B2=۱، سن=۲، سابقه کار ۲ سال=۲) به ۷ امتیاز رسیدم. حساب مسدود در Deutsche Bank باز کردم و ویزا در کمتر از ۶ هفته صادر شد. در ماه پنجم قرارداد با SAP بستم و بلوکارت را بدون خروج از آلمان گرفتم. همسرم هم از روز اول اجازه کار گرفت.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'نگار رحیمی',
    role: 'متخصص داده',
    company: 'Siemens',
    city: 'مونیخ',
    date: 'آوریل ۲۰۲۷',
    scheme: 'Chancenkarte → Blue Card',
    rating: 5,
    text: 'من ۳۲ ساله بودم و مدرک کارشناسی آمار داشتم. امتیازم: مدرک=۲، سن زیر ۳۵=۲، زبان انگلیسی B2=۱، سابقه ۱ سال=۱ — دقیقاً ۶ امتیاز. دیاکو هشدار داد که اگر مدرک زبان آلمانی A1 هم داشته باشم، یک امتیاز اضافه می‌گیرم و امن‌تر می‌شوم. کلاس A1 را در ۲ ماه گذراندم. پس از ورود، کار پاره‌وقت در یک استارتاپ داده گرفتم و در ماه هشتم بلوکارت را دریافت کردم. نکته کلیدی: دیاکو در تمام مراحل اداری (Anmeldung، بیمه، مالیات) کنارم بود.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

const faqs = [
  { q: 'حداقل امتیاز برای کارت شانس آلمان چقدر است؟', a: 'حداقل ۶ امتیاز از جدول رسمی Chancenkarte. مهم‌ترین دسته‌ها: مدرک تحصیلی (۲)، زبان (تا ۴)، سابقه کار (تا ۳)، سن (تا ۲).' },
  { q: 'آیا برای Chancenkarte به مدرک زبان آلمانی نیاز دارم؟', a: 'حداقل باید یکی از این دو را داشته باشید: آلمانی A1 یا انگلیسی B2. آلمانی A1 یک امتیاز، A2 دو، B1 سه و B2 چهار امتیاز می‌دهد. انگلیسی B2 فقط یک امتیاز.' },
  { q: 'حساب مسدود (Sperrkonto) برای ۲۰۲۷ چقدر است؟', a: 'برای ۲۰۲۶ حدود €۱۳,۰۹۲ در سال (معادل €۱,۰۹۱ ماهانه) بود. برای ۲۰۲۷ معمولاً با شاخص‌بندی سالانه افزایش می‌یابد؛ مبلغ دقیق باید در زمان درخواست از سفارت یا سایت رسمی بررسی شود. تقریباً €۱۲,۳۲۴ تا €۱۳,۲۰۰ سالانه تخمین زده می‌شود.' },
  { q: 'چقدر می‌توانم در طول کارت شانس کار کنم؟', a: '۲۰ ساعت در هفته کار پاره‌وقت + ۲ هفته کار آزمایشی (Probearbeiten) در حوزه تخصصی. کار آزمایشی به شما امکان می‌دهد کارفرما را بشناسید.' },
  { q: 'آیا می‌توانم بدون خروج از آلمان بلوکارت بگیرم؟', a: 'بله. با دریافت جاب‌آفر منطبق با تخصص و شرایط بلوکارت ۲۰۲۶ (حقوق حداقلی €۵۰,۷۰۰ عمومی یا €۴۵,۹۳۴.۲۰ در مشاغل کمبود نیرو و فارغ‌التحصیلان اخیر)، می‌توانید مستقیماً در Ausländerbehörde درخواست دهید.' },
  { q: 'آیا همسر و فرزندان می‌توانند همراه باشند؟', a: 'بله، همسر و فرزندان زیر ۱۸ سال می‌توانند ویزای همراه بگیرند. نیاز به اثبات تمکن مالی اضافه و بیمه درمانی دارند. همسر پس از ورود اجازه کار دارد.' },
  { q: 'مدت زمان پردازش ویزای Chancenkarte چقدر است؟', a: 'معمولاً ۴ تا ۸ هفته از زمان تکمیل مدارک. زمان سفارت + بررسی ZAB می‌تواند کل فرآیند را به ۴ تا ۶ ماه برساند.' },
  { q: 'آیا کارت شانس قابل تمدید است؟', a: 'در صورت نیاز به زمان بیشتر برای یافتن کار، در برخی موارد تمدید تا ۲ سال امکان‌پذیر است. اما معمولاً ۱ سال اول کافی است اگر فعالانه جستجو کنید.' },
];

const relatedArticles = [
  { title: 'ویزای جستجوی کار اتریش ۲۰۲۶', href: '/jobseeker-austria', desc: '۷۰ امتیاز + قانون ماندن تا صدور RWR Card' },
  { title: 'ویزای جستجوی کار دانمارک', href: '/jobseeker-denmark', desc: 'Pay Limit ۵۵۲,۰۰۰ کرون + لیست‌های مثبت' },
  { title: 'اقامت تمکن مالی اتریش', href: '/financial-austria', desc: '۲,۶۱۶ یورو/ماه + سهمیه محدود' },
];

export const JobSeekerGermanyPage: React.FC<Props> = ({ onBackToHome, onOpenAssessment }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'کارت شانس آلمان ۲۰۲۷ (Chancenkarte) | ۶ امتیاز + ۲۰ ساعت کار + مسیر بلوکارت',
    description:
      'راهنمای کامل کارت شانس آلمان ۲۰۲۷: حداقل ۶ امتیاز از جدول Chancenkarte، زبان آلمانی A1 یا انگلیسی B2، حساب مسدود، اجازه ۲۰ ساعت کار پاره‌وقت + ۲ هفته کار آزمایشی و تبدیل به بلوکارت بدون خروج از آلمان. مشاوره دیاکو.',
    canonical: '/jobseeker-germany',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'کارت شانس آلمان ۲۰۲۷', 'Chancenkarte 2027',
      'ویزای جستجوی کار آلمان', 'جدول امتیازات کارت شانس',
      'کار پاره وقت در کارت شانس', 'حساب بلوکه آلمان ۲۰۲۷',
      'تبدیل کارت شانس به بلوکارت', 'Blue Card Germany 2027',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/jobseeker-germany#article',
          headline: 'راهنمای جامع کارت شانس آلمان ۲۰۲۷: ۶ امتیاز، ۲۰ ساعت کار و مسیر بلوکارت',
          description: 'تحلیل کامل Chancenkarte ۲۰۲۷: جدول ۶ امتیازی، شرایط زبان A1/B2، حساب مسدود، کار پاره‌وقت ۲۰ ساعته، ۲ هفته کار آزمایشی و تبدیل به بلوکارت بدون خروج از آلمان.',
          image: ['https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80'],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' } },
          datePublished: '2027-01-01', dateModified: '2027-10-29', inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Chancenkarte Germany 2027' },
            { '@type': 'Thing', name: 'Blue Card Germany' },
            { '@type': 'Thing', name: 'Sperrkonto' },
          ],
        },
        {
          '@type': 'HowTo',
          name: 'مراحل دریافت کارت شانس آلمان ۲۰۲۷',
          totalTime: 'P12M',
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
            { '@type': 'ListItem', position: 2, name: 'خدمات مهاجرتی دیاکو', item: 'https://www.dia-co.ir/services' },
            { '@type': 'ListItem', position: 3, name: 'کارت شانس آلمان', item: 'https://www.dia-co.ir/jobseeker-germany' },
          ],
        },
      ],
    },
  });

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+436889763256');
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
              <Search className="h-7 w-7 text-emerald-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
              <a href="#article" className="hover:text-emerald-300 transition">مقاله</a>
              <a href="#scoring" className="hover:text-emerald-300 transition">امتیازدهی</a>
              <a href="#finance" className="hover:text-emerald-300 transition">تمکن مالی</a>
              <a href="#pros-cons" className="hover:text-emerald-300 transition">مزایا و معایب</a>
              <a href="#samples" className="hover:text-emerald-300 transition">نمونه ویزا</a>
              <a href="#reviews" className="hover:text-emerald-300 transition">نظرات</a>
              <a href="#faq" className="hover:text-emerald-300 transition">سوالات</a>
            </nav>
            <div className="flex items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="hidden sm:inline-flex rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition">
                ارزیابی رایگان
              </button>
              <button type="button" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="منو">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 space-y-3 text-sm font-bold">
              <a href="#article" className="block hover:text-emerald-300">مقاله</a>
              <a href="#scoring" className="block hover:text-emerald-300">امتیازدهی</a>
              <a href="#finance" className="block hover:text-emerald-300">تمکن مالی</a>
              <a href="#pros-cons" className="block hover:text-emerald-300">مزایا و معایب</a>
              <a href="#samples" className="block hover:text-emerald-300">نمونه ویزا</a>
              <a href="#reviews" className="block hover:text-emerald-300">نظرات</a>
              <a href="#faq" className="block hover:text-emerald-300">سوالات</a>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Breadcrumb ---------- */}
      <div className="container mx-auto px-4 md:px-8 pt-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button type="button" onClick={onBackToHome} className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition">
            <ArrowLeft className="h-4 w-4" /> بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span><span>/</span>
            <span>ویزای جستجوی کار</span><span>/</span>
            <span className="text-emerald-300 font-bold">آلمان ۲۰۲۷</span>
          </div>
        </div>
      </div>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300 mb-4">
              <Sparkles className="h-4 w-4" /> قانون مهاجرت نیروی متخصص — Chancenkarte Germany 2027
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              کارت شانس آلمان ۲۰۲۷{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-emerald-400">
                (Chancenkarte)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              کارت شانس (Chancenkarte) انقلابی‌ترین ویزای ورود به بازار کار آلمان است. این سیستم بر پایه امتیازات سن،
              مدرک تحصیلی، سابقه کاری و تسلط به زبان طراحی شده و به متخصصان امکان می‌دهد <strong>۱ سال بدون نیاز به جاب‌آفر</strong>
              وارد آلمان شوند، تا <strong>۲۰ ساعت در هفته کار پاره‌وقت</strong> انجام دهند و پس از عقد قرارداد کاری به
              <strong> بلوکارت (Blue Card)</strong> یا اقامت کاری متخصصان دست یابند.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: Award, label: '۶ / ۱۲', sub: 'حداقل امتیاز جدول' },
                { icon: Clock, label: '۲۰ ساعت', sub: 'کار پاره‌وقت در هفته' },
                { icon: CalendarDays, label: '۱ سال', sub: 'اعتبار قابل تمدید' },
                { icon: Wallet, label: '~€۱۳,۰۹۲', sub: 'حساب مسدود سالانه' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                    <Icon className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                    <div className="text-sm font-black text-amber-300">{item.label}</div>
                    <div className="text-[10px] text-slate-300 mt-1">{item.sub}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition">
                محاسبه امتیاز Chancenkarte ۲۰۲۷
              </button>
              <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                دفتر وین (اتحادیه اروپا): ۴۳۶۸۸۹۷۶۳۲۵۶+
                {copiedPhone && <span className="text-emerald-400 text-[10px] font-bold">کپی شد!</span>}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1000&q=80"
                alt="برلین، آلمان — کارت شانس و فرصت‌های شغلی" width={1000} height={750}
                loading="eager" decoding="async" fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300"><MapPin className="h-4 w-4" /> برلین — Ausländerbehörde</div>
                <p className="text-[11px] text-slate-300 mt-1">معادل‌سازی مدرک در ZAB، افتتاح حساب مسدود و پیگیری پرونده در آلمان.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- خلاصه سریع (TL;DR) ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-10">
        <div className="max-w-4xl mx-auto rounded-2xl border border-emerald-400/30 bg-emerald-500/5 p-5">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-sm font-black text-emerald-300 mb-2">خلاصه سریع (TL;DR) — ۲۰۲۷</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-300">
                <li>• حداقل امتیاز: <strong className="text-white">۶ از ۱۲</strong></li>
                <li>• اعتبار ویزا: <strong className="text-white">۱ سال</strong> (قابل تمدید)</li>
                <li>• کار پاره‌وقت: <strong className="text-white">۲۰ ساعت / هفته</strong></li>
                <li>• کار آزمایشی: <strong className="text-white">۲ هفته</strong></li>
                <li>• حساب مسدود: <strong className="text-white">~€۱۳,۰۹۲ / سال</strong></li>
                <li>• تبدیل به بلوکارت: <strong className="text-emerald-300">بدون خروج از آلمان</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================  مقاله پرمحتوا  ===================== */}
      <article id="article" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-10">

          {/* --- مقدمه --- */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mb-2"><BookOpen className="h-4 w-4" /> مقاله تخصصی ۲۰۲۷</span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">کارت شانس آلمان (Chancenkarte) چیست و برای چه کسانی مناسب است؟</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              آلمان در چارچوب <strong className="text-white">قانون مهاجرت نیروی متخصص (Fachkräfteeinwanderungsgesetz)</strong> و
              با هدف جذب سالانه ۴۰۰,۰۰۰ نیروی ماهر، کارت شانس را معرفی کرد. این ویزا برای اولین بار به متخصصان غیر اتحادیه اروپا
              اجازه می‌دهد <strong>بدون داشتن پیشنهاد شغلی</strong> وارد آلمان شوند و به مدت یک سال به دنبال کار بگردند.
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              سه ویژگی کلیدی Chancenkarte:
            </p>
            <ul className="space-y-2 text-sm text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">سیستم امتیازدهی ۱۲ امتیازی</strong> — حداقل ۶ امتیاز لازم است.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">اجازه کار پاره‌وقت ۲۰ ساعته</strong> — در طول جستجوی کار می‌توانید درآمد داشته باشید.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">۲ هفته کار آزمایشی</strong> — در حوزه تخصصی، بدون تعهد بلندمدت.</span></li>
            </ul>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify">
              این ویزا مخصوص متخصصانی است که <strong>مدرک دانشگاهی یا فنی‌حرفه‌ای</strong> (حداقل ۲ سال) دارند،
              حداقل <strong>آلمانی A1 یا انگلیسی B2</strong> مسلط هستند و می‌توانند حداقل <strong>۶ امتیاز</strong>
              در جدول Chancenkarte کسب کنند. پس از یافتن شغل منطبق، می‌توانند بدون خروج از آلمان به بلوکارت تبدیل کنند.
            </p>
          </div>

          {/* --- جدول امتیازدهی --- */}
          <div id="scoring" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-teal-400" /> جدول امتیازدهی رسمی ۲۰۲۷ — چگونه ۶ امتیاز کسب کنیم؟
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              سیستم امتیازدهی Chancenkarte <strong className="text-white">۷ دسته</strong> دارد و مجموع سقف‌ها <strong>۱۲</strong> است.
              شما باید حداقل <strong className="text-amber-300">۶ امتیاز</strong> کسب کنید. مهم‌ترین دسته، «زبان» با سقف ۴ امتیاز است.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {scoringRows.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${item.color} shrink-0`} />
                        <span className="text-xs font-bold text-white">{item.label}</span>
                      </div>
                      <span className={`text-xs font-black ${item.color}`}>{item.max}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">{item.detail}</p>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/20">
              <p className="text-[11px] text-red-200 leading-relaxed">
                <strong>نکته حیاتی:</strong> اگر مدرک شما در ZAB به‌طور کامل معادل‌سازی نشود (تشخیص جزئی)، ۱ امتیاز از دست می‌دهید.
                زبان انگلیسی B2 فقط ۱ امتیاز می‌دهد، اما آلمانی B2 می‌تواند ۴ امتیاز بدهد — بنابراین یادگیری آلمانی برای رسیدن به ۶ امتیاز حیاتی است.
              </p>
            </div>
          </div>

          {/* --- تمکن مالی --- */}
          <div id="finance" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Wallet className="h-6 w-6 text-amber-400" /> تمکن مالی و حساب مسدود (Sperrkonto)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              برای دریافت ویزای Chancenkarte باید اثبات کنید که می‌توانید در طول اقامت خود در آلمان هزینه‌های زندگی را تأمین کنید.
              روش استاندارد، افتتاح <strong className="text-white">حساب مسدود (Sperrkonto)</strong> است که در آن مبلغ مشخصی
              واریز می‌شود و به‌صورت ماهانه آزاد می‌گردد.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-4">
              <table className="w-full text-xs md:text-sm text-right">
                <thead className="bg-white/5 text-emerald-300 font-bold">
                  <tr>
                    <th className="p-3">مورد</th>
                    <th className="p-3">مبلغ تقریبی ۲۰۲۷</th>
                    <th className="p-3">توضیح</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3 text-slate-200">مبلغ کل حساب مسدود</td>
                    <td className="p-3 font-black text-amber-300">~€۱۳,۰۹۲ / سال</td>
                    <td className="p-3 text-slate-400">معادل €۱,۰۹۱ ماهانه (نرخ ۲۰۲۶؛ سالانه افزایش می‌یابد)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-200">هزینه ویزا</td>
                    <td className="p-3 font-black text-amber-300">€۷۵</td>
                    <td className="p-3 text-slate-400">هزینه پردازش سفارت</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-200">معادل‌سازی مدرک ZAB</td>
                    <td className="p-3 font-black text-amber-300">~€۲۰۰</td>
                    <td className="p-3 text-slate-400">Zeugnisbewertung — گواهی معادل‌سازی</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/20">
              <p className="text-[11px] text-sky-200 leading-relaxed">
                <strong>جایگزین‌ها:</strong> اگر توان مالی کامل ندارید، می‌توانید از <strong>همسر/شریک</strong> که در آلمان کار می‌کند
                یا از <strong>نامه تعهد (Verpflichtungserklärung)</strong> یک ضامن مقیم آلمان استفاده کنید.
              </p>
            </div>
          </div>

          {/* --- مسیر بلوکارت --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-400" /> مسیر تبدیل به بلوکارت و اقامت دائم
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              پس از یافتن شغل منطبق با تخصص، می‌توانید <strong>بدون خروج از آلمان</strong> در Ausländerbehörde درخواست
              تغییر ویزا به <strong className="text-white">بلوکارت (Blue Card)</strong> یا اقامت کاری متخصصان دهید.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                <h3 className="text-xs font-bold text-emerald-200 mb-2">مرحله ۱</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">بلوکارت اتحادیه اروپا (EU Blue Card) با حقوق حداقلی مشخص</p>
              </div>
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/20">
                <h3 className="text-xs font-bold text-sky-200 mb-2">مرحله ۲</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">پس از ۲۱ ماه با آلمانی B1 (یا ۳۳ ماه با A1): اقامت دائم</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                <h3 className="text-xs font-bold text-amber-200 mb-2">مرحله ۳</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">پس از ۵–۶ سال اقامت: تابعیت آلمان (در صورت شرایط)</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
              <p className="text-[11px] text-amber-200 leading-relaxed">
                <strong>آستانه حقوق بلوکارت ۲۰۲۶ (make-it-in-germany.com):</strong> برای مشاغل عادی €۵۰,۷۰۰ در سال و برای مشاغل کمبود نیرو (Mangelberufe/STEM)
                و فارغ‌التحصیلان جدید €۴۵,۹۳۴.۲۰ در سال. این مبالغ سالانه به‌روزرسانی می‌شوند.
              </p>
            </div>
          </div>

          {/* --- فرآیند --- */}
          <div id="process" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-amber-400" /> فرآیند درخواست — گام‌به‌گام
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              کل فرآیند از معادل‌سازی مدرک تا دریافت ویزا معمولاً بین <strong>۴ تا ۸ ماه</strong> طول می‌کشد.
            </p>
            <div className="space-y-3">
              {processSteps.map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-emerald-400 text-[#082833] grid place-items-center text-xs font-black">{item.step}</span>
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

          {/* --- پیامد عدم یافتن کار --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <FileWarning className="h-6 w-6 text-red-400" /> اگر در یک سال کار پیدا نکنید چه می‌شود؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <Plane className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <h3 className="text-xs font-bold text-white mb-1">خروج از آلمان</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">در صورت عدم تمدید، باید آلمان را ترک کنید.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <Clock className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                <h3 className="text-xs font-bold text-white mb-1">تمدید محدود</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">در برخی موارد تمدید تا ۲ سال امکان‌پذیر است.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <Home className="h-6 w-6 text-slate-400 mx-auto mb-2" />
                <h3 className="text-xs font-bold text-white mb-1">خانواده</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">در صورت عدم تمدید، خانواده نیز باید خارج شوند.</p>
              </div>
            </div>
          </div>

          {/* --- خانواده --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-emerald-400" /> الحاق خانواده
            </h2>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span>همسر و فرزندان زیر ۱۸ سال می‌توانند ویزای همراه بگیرند.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span>همسر پس از ورود اجازه کار کامل دارد.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span>نیاز به اثبات تمکن مالی اضافه و بیمه درمانی برای هر عضو.</span></li>
            </ul>
          </div>

          {/* --- نتیجه‌گیری --- */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-emerald-400" /> نتیجه‌گیری
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              Chancenkarte با حداقل <strong className="text-white">۶ امتیاز</strong>، اجازه <strong className="text-white">۲۰ ساعت کار پاره‌وقت</strong>،
              <strong className="text-white"> ۲ هفته کار آزمایشی</strong> و مسیر روشن به <strong className="text-white">بلوکارت و اقامت دائم</strong>
              یکی از جذاب‌ترین مسیرهای کاریابی در اروپا است. کلید موفقیت، <strong className="text-emerald-300">معادل‌سازی زودهنگام مدرک</strong>،
              تقویت زبان (به‌ویژه آلمانی A2 یا B1) و آمادگی مالی برای حساب مسدود است.
            </p>
          </div>
        </div>
      </article>

      {/* =====================  مزایا و معایب  ===================== */}
      <section id="pros-cons" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <TrendingUp className="h-4 w-4" /> ارزیابی صادقانه
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">مزایا و معایب کارت شانس آلمان ۲۰۲۷</h2>
            <p className="text-sm text-slate-400">نگاه بی‌طرفانه به نقاط قوت و چالش‌ها پیش از تصمیم‌گیری</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-emerald-400/30 bg-emerald-500/5 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <ThumbsUp className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-emerald-300">مزایا</h3>
                  <p className="text-[10px] text-emerald-200/70">{pros.length} نقطه قوت کلیدی</p>
                </div>
              </div>
              <ul className="space-y-3">
                {pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">{p.title}</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{p.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-red-400/30 bg-red-500/5 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <ThumbsDown className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-red-300">معایب</h3>
                  <p className="text-[10px] text-red-200/70">{cons.length} چالش که باید بشناسید</p>
                </div>
              </div>
              <ul className="space-y-3">
                {cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">{c.title}</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{c.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-500/5 p-4 text-center">
            <p className="text-xs text-amber-200 leading-relaxed">
              <strong>جمع‌بندی:</strong> Chancenkarte برای متخصصان با مدرک معادل و زبان خوب، یکی از بهترین
              گزینه‌های اروپایی است. اما اگر مدرک شما در ZAB به رسمیت شناخته نشود یا توان مالی نداشته باشید،
              مسیرهای جایگزین مانند اتریش (Jobseeker) یا دانمارک (Pay Limit) را بررسی کنید.
            </p>
          </div>
        </div>
      </section>

      {/* =====================  نمونه ویزاهای صادرشده  ===================== */}
      <section id="samples" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <Award className="h-4 w-4" /> سابقه موفق
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">نمونه ویزاهای صادرشده هلدینگ دیاکو — ۲۰۲۷</h2>
            <p className="text-sm text-slate-400">نمونه‌ای از پرونده‌های موفق (با حفظ حریم خصوصی متقاضیان)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleVisas.map((v, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-emerald-400/40 transition group">
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                  <img
                    src={v.image}
                    alt={v.alt}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition blur-[1.5px]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-[#061a21]/70 to-transparent" />
                  <div className="absolute top-3 right-3 rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-black text-white backdrop-blur-sm flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    صادر شد
                  </div>
                  <div className="absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-mono text-slate-300 backdrop-blur-sm">
                    {v.id}
                  </div>
                  <div className="absolute bottom-3 right-3 left-3">
                    <div className="text-[9px] text-slate-400 mb-0.5 uppercase tracking-wider">Sample Visa / Blue Card</div>
                    <div className="text-sm font-black text-white leading-tight">{v.scheme}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500 mb-0.5">متقاضی</div>
                      <div className="font-bold text-white">{v.name}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 mb-0.5">شهر</div>
                      <div className="font-bold text-white flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-emerald-400" />{v.city}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 mb-0.5">تاریخ</div>
                      <div className="font-bold text-white">{v.date}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 mb-0.5">حقوق نهایی</div>
                      <div className="font-bold text-amber-300">{v.salary}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 text-center mt-4">
            * تصاویر و اطلاعات نمایش‌داده‌شده نمونه هستند و برای حفظ حریم خصوصی متقاضیان، اصلاح شده‌اند.
          </p>
        </div>
      </section>

      {/* =====================  نظرات تفصیلی  ===================== */}
      <section id="reviews" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mb-2">
              <Star className="h-4 w-4" /> تجربه واقعی
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">نظر دو متقاضی موفق دیاکو — ۲۰۲۷</h2>
            <p className="text-sm text-slate-400">داستان کامل همکاری با هلدینگ مهاجرتی دیاکو در دریافت کارت شانس آلمان</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailedTestimonials.map((t, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-emerald-400/30 transition">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/50 shrink-0">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h3 className="text-sm font-black text-white">{t.name}</h3>
                      <span className="text-[9px] rounded-full bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="h-2.5 w-2.5" /> تأیید شده
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{t.role} — {t.company}</div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{t.city}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{t.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star key={s} className={`h-3 w-3 ${s < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                    ))}
                  </div>
                </div>
                <Quote className="h-6 w-6 text-emerald-400/40 mb-2" />
                <blockquote className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                  {t.text}
                </blockquote>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px]">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-slate-400">طرح دریافت‌شده:</span>
                    <span className="font-bold text-amber-300">{t.scheme}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">پرسش‌های متداول ۲۰۲۷</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button type="button" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-emerald-300 transition"
                aria-expanded={openFaq === idx}>
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- مقالات مرتبط ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-center mb-6">مقالات مرتبط</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {relatedArticles.map((r, i) => (
            <a key={i} href={r.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-emerald-400/40 transition">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition">{r.title}</h3>
                <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 shrink-0 mt-0.5 transition" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- CTA نهایی ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-emerald-400/30 bg-gradient-to-l from-emerald-500/10 via-emerald-400/5 to-transparent p-6 md:p-10 text-center">
          <Sparkles className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-black mb-2">امتیاز خود را برای ۲۰۲۷ همین حالا محاسبه کنید</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            کارشناسان دیاکو امتیاز شما را بر اساس جدول رسمی Chancenkarte محاسبه می‌کنند و مسیر رسیدن به ۶ امتیاز را طراحی می‌کنند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110">
              شروع ارزیابی رایگان
            </button>
            <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold hover:bg-white/10 inline-flex items-center gap-2">
              <Copy className="h-4 w-4 text-emerald-400" />
              {copiedPhone ? 'شماره کپی شد!' : 'دفتر مرکزی وین: +43 688 976 3256'}
            </button>
          </div>
        </div>
      </section>

      {/* ---------- فوتر ---------- */}
      <footer className="border-t border-white/10 bg-[#041418]">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3"><Search className="h-6 w-6 text-emerald-400" /><span className="font-black">دیاکو</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">هلدینگ مهاجرتی دیاکو — خدمات تخصصی کارت شانس و اقامت کاری در آلمان.</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4" /><span>مشاوره تخصصی و شفاف</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#article" className="hover:text-emerald-300">مقاله</a></li>
                <li><a href="#scoring" className="hover:text-emerald-300">امتیازدهی</a></li>
                <li><a href="#finance" className="hover:text-emerald-300">تمکن مالی</a></li>
                <li><a href="#pros-cons" className="hover:text-emerald-300">مزایا و معایب</a></li>
                <li><a href="#samples" className="hover:text-emerald-300">نمونه ویزا</a></li>
                <li><a href="#faq" className="hover:text-emerald-300">سوالات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">تماس با ما</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li dir="ltr" className="text-right">دفتر وین: +43 688 976 3256</li>
                <li dir="ltr" className="text-right">دفتر تهران: 021 9169 3955</li>
                <li>واتساپ: ۰۹۱۹۷۳۴۰۸۲۹</li>
                <li>ایمیل: info@dia-co.ir</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">شبکه‌های اجتماعی</h4>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <a href="https://instagram.com" className="hover:text-emerald-300" aria-label="اینستاگرام">اینستاگرام</a>
                <a href="https://wa.me/989197340829" className="hover:text-emerald-300" aria-label="واتساپ">واتساپ</a>
                <a href="https://t.me" className="hover:text-emerald-300" aria-label="تلگرام">تلگرام</a>
              </div>
              <p className="text-[10px] text-slate-500 mt-4">© ۲۰۲۷ دیاکو. تمامی حقوق محفوظ است.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ---------- نوار CTA شناور موبایل ---------- */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#061a21]/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-2">
        <button type="button" onClick={onOpenAssessment} className="flex-1 rounded-xl bg-[#f5a623] py-2.5 text-xs font-black text-[#082833]">
          ارزیابی رایگان
        </button>
        <button type="button" onClick={handleCopyPhone} className="rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-xs font-bold inline-flex items-center gap-1.5">
          <PhoneCall className="h-4 w-4 text-emerald-400" />
          تماس
        </button>
      </div>
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default JobSeekerGermanyPage;