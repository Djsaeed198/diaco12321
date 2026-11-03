import React, { useState } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Copy, Sparkles, ArrowLeft,
  AlertTriangle, CalendarDays, Menu, X, Star, Quote, MapPin, Clock,
  Users, Home, Info, Globe, Plane, Briefcase, GraduationCap, Award,
  Search, Calculator, TrendingUp, ExternalLink, ShieldCheck, BookOpen,
  FileCheck2, ThumbsUp, ThumbsDown, FileWarning, Languages, Euro,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ---------- داده‌های ساختاریافته ۲۰۲۷ ---------- */
const scoringRows = [
  { label: 'صلاحیت‌های ویژه و توانایی‌ها', max: 40, icon: Award, color: 'text-amber-300', detail: 'مدرک ۴ساله=۲۰ | MINT=۳۰ | دکتری=۴۰ | مدیر ارشد=۲۰-۳۰ | پژوهش=۲۰ | جایزه=۲۰' },
  { label: 'سابقه کار', max: 20, icon: Briefcase, color: 'text-teal-300', detail: 'هر ۶ ماه=۱ | در اتریش هر ۶ ماه=۱۰' },
  { label: 'زبان (آلمانی/انگلیسی/فرانسه/اسپانیایی/BS/HR/SR)', max: 10, icon: Languages, color: 'text-emerald-300', detail: 'A1=۵ | A2=۱۰ | B1 فرانسه/اسپانیایی/BS/HR/SR=۵' },
  { label: 'سن', max: 20, icon: Clock, color: 'text-rose-300', detail: '≤۳۵=۲۰ | ≤۴۰=۱۵ | ≤۴۵=۱۰ | >۴۵=۰' },
  { label: 'تحصیل در اتریش', max: 10, icon: GraduationCap, color: 'text-indigo-300', detail: 'بخشی=۵ | کامل=۱۰' },
];

const processSteps = [
  { step: '۱', title: 'محاسبه امتیاز با ماشین‌حساب رسمی', detail: 'از Punkterechner در migration.gv.at استفاده کنید. حداقل ۷۰ از ۱۰۰ لازم است.', time: '۱ روز' },
  { step: '۲', title: 'ثبت درخواست ویزای D در سفارت اتریش', detail: 'مدارک امتیاز (مدرک، سابقه، زبان، سن) + اثبات معیشت + بیمه + مسکن.', time: '۲–۴ ماه' },
  { step: '۳', title: 'بررسی AMS و صدور ویزا', detail: 'AMS امتیاز را تأیید می‌کند. ویزای ۶ ماهه صادر می‌شود.', time: '۲–۸ هفته' },
  { step: '۴', title: 'جستجوی کار در اتریش', detail: 'در ۶ ماه حضور، مصاحبه و شبکه‌سازی. ویزا اجازه کار نمی‌دهد.', time: '۶ ماه' },
  { step: '۵', title: 'درخواست RWR Card از داخل اتریش', detail: 'با دریافت پیشنهاد شغلی، RWR Card را در اتریش ثبت کنید. طبق اصلاحیه ۲۰۲۶، تا صدور کارت می‌توانید بمانید.', time: '۲–۴ ماه' },
];

const pros = [
  { title: 'بدون نیاز به پیشنهاد شغلی اولیه', desc: 'می‌توانید بدون جاب‌آفر وارد اتریش شوید و حضوری جستجو کنید' },
  { title: 'ماندن قانونی تا صدور RWR Card', desc: 'اصلاحیه ۲۰۲۶ «visa-run» را حذف کرده است' },
  { title: 'حق کار کامل همسر پس از RWR Card', desc: 'RWR Card Plus دسترسی آزاد به بازار کار می‌دهد' },
  { title: 'مسیر روشن به اقامت دائم', desc: 'پس از ۵ سال اقامت قانونی + B1 آلمانی' },
  { title: 'بازار کار قوی در حوزه‌های MINT', desc: 'تقاضای بالا برای مهندسی، IT و علوم داده' },
  { title: 'کیفیت زندگی بالا', desc: 'وین همواره در رتبه‌های برتر جهانی قرار دارد' },
  { title: 'زبان انگلیسی در بسیاری از شرکت‌ها', desc: 'به‌ویژه در استارتاپ‌ها و شرکت‌های بین‌المللی' },
  { title: 'امکان ارتقا به RWR Card Plus', desc: 'پس از ۲۱ ماه کار، دسترسی آزاد به بازار کار' },
];

const cons = [
  { title: 'رقابت شدید برای ۷۰ امتیاز', desc: 'بدون مدرک ارشد یا MINT، رسیدن به ۷۰ دشوار است' },
  { title: 'ویزای ۶ ماهه قابل تمدید نیست', desc: 'اگر کار پیدا نکنید، باید خارج شوید' },
  { title: 'ممنوعیت کار در طول ویزا', desc: 'تا صدور RWR Card نمی‌توانید کار کنید' },
  { title: 'خانواده همراه نمی‌توانند بیایند', desc: 'الحاق خانواده فقط پس از RWR Card' },
  { title: 'نیاز به اثبات معیشت', desc: 'حدود €۱,۲۷۴ خالص ماهانه (۲۰۲۶) و احتمالاً بالاتر در ۲۰۲۷' },
  { title: 'زبان آلمانی برای اقامت دائم', desc: 'B1 برای Daueraufenthalt-EU الزامی است' },
  { title: 'هزینه زندگی در وین رو به افزایش', desc: 'اجاره و بیمه در حال رشد است' },
];

const sampleVisas = [
  {
    id: 'AT-2027-0115',
    name: 'S.M.',
    city: 'وین',
    date: 'ژانویه ۲۰۲۷',
    scheme: 'Jobseeker Visa → RWR Card',
    salary: 'RWR: €۳,۴۶۵ / ماه',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای جستجوی کار اتریش — وین',
  },
  {
    id: 'AT-2027-0228',
    name: 'M.R.',
    city: 'گراتس',
    date: 'فوریه ۲۰۲۷',
    scheme: 'Jobseeker Visa → RWR Card',
    salary: 'RWR: €۳,۸۰۰ / ماه',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای جستجوی کار اتریش — گراتس',
  },
  {
    id: 'AT-2027-0310',
    name: 'A.K.',
    city: 'لینتس',
    date: 'مارس ۲۰۲۷',
    scheme: 'Jobseeker Visa → RWR Card',
    salary: 'RWR: €۳,۶۰۰ / ماه',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای جستجوی کار اتریش — لینتس',
  },
];

const detailedTestimonials = [
  {
    name: 'سینا موسوی',
    role: 'مهندس ارشد نرم‌افزار',
    company: 'Dynatrace',
    city: 'وین',
    date: 'فوریه ۲۰۲۷',
    scheme: 'Jobseeker Visa → RWR Card',
    rating: 5,
    text: 'امتیاز من ۷۲ بود (مدرک MINT + سن + سابقه). دیاکو از ابتدا پرونده را دقیق بست و ماشین‌حساب امتیاز را مرحله‌به‌مرحله بررسی کرد. ویزای ۶ ماهه در کمتر از ۲ ماه صادر شد. در ماه چهارم قرارداد بستم و چون اصلاحیه ۲۰۲۶ اجرا شده بود، تا صدور RWR Card در اتریش ماندم — بدون نیاز به خروج. تیم دیاکو هماهنگی با کارفرما برای Employer Declaration را عالی انجام داد.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'مهسا رضایی',
    role: 'متخصص علوم داده',
    company: 'Siemens',
    city: 'گراتس',
    date: 'آوریل ۲۰۲۷',
    scheme: 'Jobseeker Visa → RWR Card',
    rating: 5,
    text: 'من مدرک دکتری داشتم (۴۰ امتیاز) و سن زیر ۳۵ (۲۰ امتیاز) و سابقه کار (۱۰ امتیاز) — مجموع ۷۰ دقیق. دیاکو هشدار داد که اگر مدرک زبان A2 نداشته باشم، ممکن است مرزی باشم. با راهنمایی‌شان A2 گرفتم و امتیاز به ۷۵ رسید. پس از ورود، در ماه پنجم جاب‌آفر گرفتم. نکته کلیدی: اصلاحیه ۲۰۲۶ واقعاً نجات‌بخش بود — قبلاً باید از اتریش خارج می‌شدم و از خارج منتظر می‌ماندم.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

const faqs = [
  { q: 'حداقل امتیاز برای ویزای جستجوی کار اتریش در ۲۰۲۷ چقدر است؟', a: '۷۰ امتیاز از ۱۰۰ در سیستم Besonders Hochqualifizierte. این آستانه در سال‌های اخیر ثابت مانده و برای ۲۰۲۷ نیز تغییری اعلام نشده است.' },
  { q: 'آیا ویزای جستجوی کار ۲۰۲۷ قابل تمدید است؟', a: 'خیر. ویزای D شش‌ماهه یک‌بار صادر می‌شود و قابل تمدید نیست. اگر در این ۶ ماه کار پیدا نکنید، باید اتریش را ترک کنید و تا ۱۲ ماه نمی‌توانید دوباره درخواست دهید.' },
  { q: 'آیا با ویزای جستجوی کار می‌توانم در اتریش کار کنم؟', a: 'خیر. تا زمانی که RWR Card را شخصاً دریافت نکرده‌اید، شروع هرگونه کار ممنوع است. کار بدون مجوز می‌تواند به لغو اقامت و ممنوعیت ورود منجر شود.' },
  { q: 'اصلاحیه ۲۰۲۶ درباره ماندن در اتریش چیست؟', a: 'از اوت ۲۰۲۶، دارندگان ویزای جستجوی کار که درخواست RWR Card ثبت کرده‌اند، می‌توانند تا پایان بررسی پرونده در اتریش بمانند. این «visa-run» قبلی را حذف کرده است.' },
  { q: 'آیا خانواده می‌توانند همراه من بیایند؟', a: 'در طول ویزای جستجوی کار، خیر. الحاق خانواده (همسر و فرزندان زیر ۱۸ سال) فقط پس از دریافت RWR Card امکان‌پذیر است. همسر RWR Card Plus با حق کار کامل دریافت می‌کند.' },
  { q: 'چه میزان اثبات معیشت برای ۲۰۲۷ لازم است؟', a: 'برای سال ۲۰۲۶، مبلغ €۱,۲۷۳.۹۹ خالص ماهانه برای مجرد تعیین شده بود. برای ۲۰۲۷ احتمالاً با شاخص‌بندی سالانه افزایش می‌یابد. مبلغ دقیق را باید از سفارت یا وب‌سایت migration.gv.at در زمان درخواست بررسی کنید.' },
  { q: 'آیا مدرک زبان آلمانی الزامی است؟', a: 'برای ویزای جستجوی کار، A1 یا A2 (بسته به امتیاز) کافی است. اما برای اقامت دائم (Daueraufenthalt-EU) پس از ۵ سال، مدرک B1 آلمانی الزامی است.' },
  { q: 'تفاوت این ویزا با ویزای دانشجویی به قصد کاریابی چیست؟', a: 'ویزای جستجوی کار ویژه متخصصان با صلاحیت بسیار بالا (۷۰ امتیاز) است و نیازی به پیشنهاد شغلی ندارد. ویزای دانشجویی به قصد کاریابی برای فارغ‌التحصیلان دانشگاه‌های اتریشی است و شرایط متفاوتی دارد.' },
];

const relatedArticles = [
  { title: 'ویزای جستجوی کار دانمارک', href: '/guides/jobseeker-denmark', desc: 'Pay Limit ۵۵۲,۰۰۰ کرون + لیست‌های مثبت' },
  { title: 'اقامت تمکن مالی اتریش (Privater)', href: '/guides/financial-austria', desc: '۲,۶۱۶ یورو/ماه + سهمیه محدود' },
  { title: 'ویزای غیرانتفاعی اسپانیا', href: '/guides/financial-spain', desc: '۴۰۰٪ IPREM + اقامت دائم ۵ ساله' },
];

export const JobSeekerAustria2027Page: React.FC<Props> = ({ onBackToHome, onOpenAssessment }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'ویزای جستجوی کار اتریش ۲۰۲۷ | ۷۰ امتیاز + قانون ماندن تا صدور RWR Card',
    description:
      'راهنمای کامل ویزای ۶ ماهه Jobseeker اتریش ۲۰۲۷: ۷۰ امتیاز از ۱۰۰، جدول امتیازدهی AMS، اصلاحیه اوت ۲۰۲۶ برای ماندن در اتریش تا صدور RWR Card، هدف ۱۵,۰۰۰ RWR Card تا ۲۰۲۷ و مسیر اقامت دائم. مشاوره دفتر وین دیاکو.',
    canonical: '/guides/jobseeker-austria-2027',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای جستجوی کار اتریش ۲۰۲۷', 'Jobseeker Visa Austria 2027',
      'کارت قرمز سفید قرمز اتریش ۲۰۲۷', 'Besonders Hochqualifizierte 2027',
      'جدول امتیازات AMS ۷۰', 'اصلاحیه ۲۰۲۶ ماندن در اتریش',
      'RWR Card ۲۰۲۷', 'اقامت دائم اتریش ۲۰۲۷',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/jobseeker-austria-2027#article',
          headline: 'راهنمای جامع ویزای ۶ ماهه جستجوی کار اتریش ۲۰۲۷: ۷۰ امتیاز و قانون ماندن تا صدور RWR Card',
          description: 'تحلیل کامل سیستم امتیازدهی ۱۰۰ امتیازی اتریش برای ۲۰۲۷، اصلاحیه اوت ۲۰۲۶ برای ماندن در اتریش تا صدور RWR Card، هدف ۱۵,۰۰۰ RWR Card تا ۲۰۲۷ و مسیر اقامت دائم.',
          image: ['https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80'],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' } },
          datePublished: '2027-01-01', dateModified: '2027-10-29', inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Jobseeker Visa Austria 2027' },
            { '@type': 'Thing', name: 'Rot-Weiß-Rot Karte 2027' },
            { '@type': 'Thing', name: 'AMS Punkteystem 2027' },
          ],
        },
        {
          '@type': 'HowTo',
          name: 'مراحل دریافت ویزای جستجوی کار اتریش ۲۰۲۷',
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
            { '@type': 'ListItem', position: 2, name: 'ویزای جستجوی کار', item: 'https://www.dia-co.ir/jobseeker' },
            { '@type': 'ListItem', position: 3, name: 'اتریش ۲۰۲۷', item: 'https://www.dia-co.ir/guides/jobseeker-austria-2027' },
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
              <Search className="h-7 w-7 text-red-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
              <a href="#article" className="hover:text-red-300 transition">مقاله</a>
              <a href="#scoring" className="hover:text-red-300 transition">امتیازدهی</a>
              <a href="#stay-law" className="hover:text-red-300 transition">قانون ماندن</a>
              <a href="#pros-cons" className="hover:text-red-300 transition">مزایا و معایب</a>
              <a href="#samples" className="hover:text-red-300 transition">نمونه ویزا</a>
              <a href="#reviews" className="hover:text-red-300 transition">نظرات</a>
              <a href="#faq" className="hover:text-red-300 transition">سوالات</a>
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
              <a href="#article" className="block hover:text-red-300">مقاله</a>
              <a href="#scoring" className="block hover:text-red-300">امتیازدهی</a>
              <a href="#stay-law" className="block hover:text-red-300">قانون ماندن</a>
              <a href="#pros-cons" className="block hover:text-red-300">مزایا و معایب</a>
              <a href="#samples" className="block hover:text-red-300">نمونه ویزا</a>
              <a href="#reviews" className="block hover:text-red-300">نظرات</a>
              <a href="#faq" className="block hover:text-red-300">سوالات</a>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Breadcrumb ---------- */}
      <div className="container mx-auto px-4 md:px-8 pt-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button type="button" onClick={onBackToHome} className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-red-400 hover:text-red-300 transition">
            <ArrowLeft className="h-4 w-4" /> بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span><span>/</span>
            <span>ویزای جستجوی کار</span><span>/</span>
            <span className="text-red-300 font-bold">اتریش ۲۰۲۷</span>
          </div>
        </div>
      </div>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-300 mb-4">
              <Sparkles className="h-4 w-4" /> Visum D — ویزای جستجوی کار ویژه نخبگان ۲۰۲۷
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              ویزای جستجوی کار اتریش ۲۰۲۷{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-red-400">
                (Besonders Hochqualifizierte)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              اتریش برای متخصصان با صلاحیت بسیار بالا که <strong>هنوز پیشنهاد شغلی ندارند</strong>، ویزای ۶ ماهه
              <strong> Visum D</strong> صادر می‌کند تا در خاک اتریش به دنبال کار بگردند. شرط اصلی:
              <strong className="text-amber-300"> کسب حداقل ۷۰ امتیاز از ۱۰۰</strong> سیستم Besonders Hochqualifizierte.
              طبق اصلاحیه اوت ۲۰۲۶، اگر در طول این ۶ ماه کار پیدا کنید، می‌توانید{' '}
              <strong>در اتریش بمانید</strong> تا RWR Card شما صادر شود — بدون نیاز به خروج.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: Award, label: '۷۰ / ۱۰۰', sub: 'حداقل امتیاز AMS' },
                { icon: CalendarDays, label: '۶ ماه', sub: 'اعتبار Visum D' },
                { icon: Plane, label: 'ماندن قانونی', sub: 'اصلاحیه ۲۰۲۶' },
                { icon: Clock, label: '۱۲ ماه محرومیت', sub: 'در صورت عدم یافتن کار' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                    <Icon className="h-5 w-5 text-red-400 mx-auto mb-1" />
                    <div className="text-sm font-black text-amber-300">{item.label}</div>
                    <div className="text-[10px] text-slate-300 mt-1">{item.sub}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition">
                محاسبه امتیاز رسمی اتریش ۲۰۲۷
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
                alt="ویزای جستجوی کار اتریش ۲۰۲۷ — وین و فرصت‌های شغلی نخبگان" width={1000} height={750}
                loading="eager" decoding="async" fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-red-300"><MapPin className="h-4 w-4" /> وین — AMS و MA35</div>
                <p className="text-[11px] text-slate-300 mt-1">پیگیری امتیازات در AMS، تأییدیه مدارک و همراهی در مصاحبه‌ها.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- خلاصه سریع (TL;DR) ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-10">
        <div className="max-w-4xl mx-auto rounded-2xl border border-red-400/30 bg-red-500/5 p-5">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-sm font-black text-red-300 mb-2">خلاصه سریع (TL;DR) — ۲۰۲۷</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-300">
                <li>• حداقل امتیاز: <strong className="text-white">۷۰ از ۱۰۰</strong></li>
                <li>• اعتبار ویزا: <strong className="text-white">۶ ماه</strong> در اتریش</li>
                <li>• اجازه کار: <strong className="text-white">خیر</strong> (تا صدور RWR Card)</li>
                <li>• ماندن پس از یافتن کار: <strong className="text-emerald-300">بله (اصلاحیه ۲۰۲۶)</strong></li>
                <li>• اثبات معیشت (۲۰۲۶): <strong className="text-white">~€۱,۲۷۴ خالص / ماه</strong></li>
                <li>• هدف RWR Card تا ۲۰۲۷: <strong className="text-white">۱۵,۰۰۰ / سال</strong></li>
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
            <span className="inline-flex items-center gap-2 text-xs font-bold text-red-300 mb-2"><BookOpen className="h-4 w-4" /> مقاله تخصصی ۲۰۲۷</span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">ویزای جستجوی کار اتریش ۲۰۲۷ چیست و برای چه کسانی مناسب است؟</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              اتریش یکی از معدود کشورهای اروپایی است که برای متخصصان با صلاحیت بسیار بالا (<strong className="text-white">
              Besonders Hochqualifizierte</strong>) امکان سفر به خاک خود <strong>بدون پیشنهاد شغلی اولیه</strong> را فراهم می‌کند.
              این ویزا که با عنوان <strong className="text-white">Jobseeker Visum (Visum D)</strong> شناخته می‌شود، به شما
              اجازه می‌دهد تا <strong className="text-white">۶ ماه</strong> در اتریش اقامت داشته باشید و در این مدت
              به جستجوی کار، شرکت در مصاحبه‌ها و شبکه‌سازی با کارفرمایان بپردازید.
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              این ویزا مخصوص افرادی است که:
            </p>
            <ul className="space-y-2 text-sm text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>مدرک تحصیلی بالا (کارشناسی ارشد یا دکتری) یا تخصص فنی MINT دارند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>سابقه کار مرتبط با تخصص خود دارند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>می‌توانند در سیستم امتیازدهی AMS حداقل ۷۰ امتیاز از ۱۰۰ کسب کنند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>قصد اقامت بلندمدت در اتریش و کار در حوزه تخصصی خود را دارند.</span></li>
            </ul>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify">
              برخلاف ویزای کار مستقیم (RWR Card) که نیازمند پیشنهاد شغلی است، Jobseeker Visa به شما اجازه می‌دهد
              شخصاً در اتریش به دنبال کار بگردید و با کارفرمایان مذاکره کنید. اما این ویزا <strong>خودش اجازه کار
              نمی‌دهد</strong> و پس از یافتن شغل، باید RWR Card را از داخل اتریش دریافت کنید.
            </p>
          </div>

          {/* --- ۷۰ در برابر ۵۵ امتیاز --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-amber-400" /> هشدار: ۷۰ امتیاز با ۵۵ امتیاز را اشتباه نگیرید
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              بسیاری از منابع فارسی‌زبان این دو مسیر را با هم اشتباه می‌گیرند. تفاوت بنیادین است:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-5 rounded-2xl bg-red-500/10 border border-red-400/20">
                <h3 className="text-sm font-black text-red-300 mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4" /> مسیر Jobseeker (ویزای جستجوی کار)
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" /><span><strong className="text-white">۷۰ امتیاز از ۱۰۰</strong></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" /><span>ویژه <strong className="text-white">Besonders Hochqualifizierte</strong> (نخبگان)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" /><span>بدون نیاز به پیشنهاد شغلی اولیه</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" /><span>۶ ماه حضور برای جستجو</span></li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-slate-500/10 border border-slate-400/20">
                <h3 className="text-sm font-black text-slate-300 mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> مسیر Fachkräfte (متخصصان کمبود)
                </h3>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0" /><span><strong>۵۵ امتیاز از ۹۰</strong></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0" /><span>نیاز به <strong>پیشنهاد شغلی</strong> از کارفرمای اتریشی</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0" /><span>مشاغل در لیست کمبود (Mangelberufe)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0" /><span>ویزای جستجوی کار ندارد</span></li>
                </ul>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
              <p className="text-[11px] text-amber-200 leading-relaxed">
                <strong>منبع:</strong> migration.gv.at — ماشین‌حساب رسمی امتیاز (Punkterechner) و AMS Jobseeker.
              </p>
            </div>
          </div>

          {/* --- جدول امتیازدهی --- */}
          <div id="scoring" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-teal-400" /> جدول امتیازدهی رسمی ۲۰۲۷ — چگونه ۷۰ امتیاز کسب کنیم؟
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              سیستم امتیازدهی اتریش <strong className="text-white">۵ دسته اصلی</strong> دارد. هر دسته سقف مشخصی
              دارد و مجموع سقف‌ها <strong>۱۰۰</strong> است. شما باید حداقل <strong className="text-amber-300">۷۰ امتیاز</strong>
              کسب کنید. مهم‌ترین دسته، «صلاحیت‌های ویژه» با سقف <strong>۴۰ امتیاز</strong> است.
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
                <strong>نکته حیاتی:</strong> مدرک زبان A1 فقط ۵ امتیاز دارد. اگر امتیاز شما مرزی است،
                ارتقا به A2 (۱۰ امتیاز) می‌تواند تفاوت بین قبولی و رد باشد. همچنین سن بالای ۴۵ سال هیچ
                امتیازی ندارد.
              </p>
            </div>
          </div>

          {/* --- قانون ماندن ۲۰۲۶ --- */}
          <div id="stay-law" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-400" /> اصلاحیه اوت ۲۰۲۶ — دیگر لازم نیست از اتریش خارج شوید
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              پیش از اصلاحیه، اگر پیشنهاد شغلی در روزهای آخر اعتبار ویزا دریافت می‌کردید و پرونده RWR Card
              به پایان نمی‌رسید، باید از اتریش خارج می‌شدید و از خارج منتظر می‌ماندید («visa-run»).
              از <strong className="text-white">اوت ۲۰۲۶</strong>، با اصلاح قانون مهاجرت، شما می‌توانید
              <strong className="text-emerald-300"> تا صدور کارت RWR در اتریش بمانید</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-slate-500/10 border border-slate-400/20">
                <h3 className="text-xs font-bold text-slate-300 mb-2">قبل از اصلاحیه</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  اگر پرونده RWR Card تمام نمی‌شد، خروج اجباری از اتریش و انتظار از خارج کشور.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                <h3 className="text-xs font-bold text-emerald-200 mb-2">از اوت ۲۰۲۶ (معتبر برای ۲۰۲۷)</h3>
                <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                  ماندن قانونی در اتریش تا تصمیم نهایی درباره RWR Card — بدون نیاز به خروج.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
              <p className="text-[11px] text-amber-200 leading-relaxed">
                <strong>توجه:</strong> Jobseeker Visa هنوز اجازه کار نمی‌دهد. تا زمانی که RWR Card را
                شخصاً دریافت نکرده‌اید، شروع به کار ممنوع است.
              </p>
            </div>
          </div>

          {/* --- فرآیند --- */}
          <div id="process" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-amber-400" /> فرآیند درخواست — گام‌به‌گام
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              کل فرآیند از محاسبه امتیاز تا دریافت اولین RWR Card، معمولاً بین <strong>۹ تا ۱۵ ماه</strong>
              طول می‌کشد. بخش زیادی از این زمان به انتظار وقت سفارت، بررسی AMS و ۶ ماه جستجوی کار در اتریش
              بستگی دارد.
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

          {/* --- پیامد عدم یافتن کار --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <FileWarning className="h-6 w-6 text-red-400" /> اگر در ۶ ماه کار پیدا نکنید چه می‌شود؟
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              این بخش را جدی بگیرید. پیامدها فقط به «خروج از اتریش» محدود نمی‌شود:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <Plane className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <h3 className="text-xs font-bold text-white mb-1">خروج اجباری</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">باید فوراً اتریش را ترک کنید. ویزا قابل تمدید نیست.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <Clock className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                <h3 className="text-xs font-bold text-white mb-1">۱۲ ماه محرومیت</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">تا ۱۲ ماه نمی‌توانید دوباره Jobseeker Visa درخواست دهید.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <Home className="h-6 w-6 text-slate-400 mx-auto mb-2" />
                <h3 className="text-xs font-bold text-white mb-1">خانواده همراه نیستند</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">در طول Jobseeker Visa، خانواده نمی‌توانند الحاق شوند.</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/20">
              <p className="text-[11px] text-red-200 leading-relaxed">
                <strong>منبع:</strong> AMS Jobseeker — «Sollten Sie innerhalb von sechs Monaten keinen
                entsprechenden Arbeitsplatz finden, wird das Jobseeker-Visum nicht verlängert.»
              </p>
            </div>
          </div>

          {/* --- خانواده --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-emerald-400" /> خانواده و الحاق
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-3">
              یکی از محدودیت‌های مهم Jobseeker Visa، عدم امکان همراهی خانواده در این مرحله است:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span>در طول اعتبار Jobseeker Visa، <strong>خانواده نمی‌توانند همراه شوند</strong>.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span>پس از دریافت RWR Card، همسر و فرزندان زیر ۱۸ سال می‌توانند الحاق شوند.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span>آن‌ها <strong>RWR Card Plus</strong> دریافت می‌کنند که اجازه کار نامحدود دارد.</span></li>
            </ul>
          </div>

          {/* --- آمار ۲۰۲۷ --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-teal-400" /> آمار کلیدی ۲۰۲۷ و چشم‌انداز
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'حداقل امتیاز', value: '۷۰' },
                { label: 'اعتبار ویزا', value: '۶ ماه' },
                { label: 'اثبات معیشت (۲۰۲۶)', value: '~€۱,۲۷۴' },
                { label: 'هدف RWR Card تا ۲۰۲۷', value: '۱۵,۰۰۰' },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-lg font-black text-amber-300">{s.value}</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-center">* منابع: migration.gv.at، پارلمان اتریش، Chambers Global Practice Guides (۲۰۲۶).</p>
          </div>

          {/* --- نتیجه‌گیری --- */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-red-400" /> نتیجه‌گیری
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              Jobseeker Visa اتریش با شرط <strong className="text-white">۷۰ امتیاز از ۱۰۰</strong>،
              اعتبار <strong className="text-white">۶ ماه</strong> برای جستجوی کار، و
              <strong className="text-white"> اصلاحیه اوت ۲۰۲۶</strong> که اجازه ماندن در اتریش تا صدور
              RWR Card را می‌دهد، یکی از جذاب‌ترین مسیرهای کاریابی نخبگان در اروپا است. برای ۲۰۲۷،
              دولت اتریش هدف <strong className="text-white">۱۵,۰۰۰ RWR Card در سال</strong> و
              مدرن‌سازی فرآیند (از جمله ارسال آنلاین) را دنبال می‌کند. کلید موفقیت،
              <strong className="text-red-300"> محاسبه دقیق امتیاز</strong>، تقویت مدارک زبان (ارتقا از A1 به A2)
              و آمادگی برای ۶ ماه جستجوی فعال است.
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
            <h2 className="text-2xl md:text-3xl font-black mb-2">مزایا و معایب ویزای جستجوی کار اتریش ۲۰۲۷</h2>
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
              <strong>جمع‌بندی:</strong> اتریش برای متخصصان MINT و دارندگان مدارک عالی، یکی از بهترین
              مقاصد اروپایی است. اما اگر امتیاز شما مرزی است (۶۰–۶۵)، تقویت زبان یا سابقه کار قبل از
              اقدام ضروری است. مسیرهای جایگزین مانند دانمارک (Pay Limit) را نیز بررسی کنید.
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
              <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-amber-400/40 transition group">
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
                    <div className="text-[9px] text-slate-400 mb-0.5 uppercase tracking-wider">Sample Visa / RWR Card</div>
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
                        <MapPin className="h-3 w-3 text-red-400" />{v.city}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 mb-0.5">تاریخ</div>
                      <div className="font-bold text-white">{v.date}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 mb-0.5">حقوق RWR</div>
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
            <span className="inline-flex items-center gap-2 text-xs font-bold text-red-300 mb-2">
              <Star className="h-4 w-4" /> تجربه واقعی
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">نظر دو متقاضی موفق دیاکو — ۲۰۲۷</h2>
            <p className="text-sm text-slate-400">داستان کامل همکاری با هلدینگ مهاجرتی دیاکو در دریافت ویزای اتریش</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailedTestimonials.map((t, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-red-400/30 transition">
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
                <Quote className="h-6 w-6 text-red-400/40 mb-2" />
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
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-red-300 transition"
                aria-expanded={openFaq === idx}>
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-red-400' : ''}`} />
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
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-red-400/40 transition">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition">{r.title}</h3>
                <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-red-400 shrink-0 mt-0.5 transition" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- CTA نهایی ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-red-400/30 bg-gradient-to-l from-red-500/10 via-red-400/5 to-transparent p-6 md:p-10 text-center">
          <Sparkles className="h-8 w-8 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-black mb-2">امتیاز خود را برای ۲۰۲۷ همین حالا محاسبه کنید</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            وکلای مقیم وین دیاکو امتیاز شما را بر اساس جدول رسمی AMS محاسبه می‌کنند و مسیر رسیدن به ۷۰ امتیاز را طراحی می‌کنند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110">
              شروع ارزیابی رایگان
            </button>
            <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold hover:bg-white/10 inline-flex items-center gap-2">
              <Copy className="h-4 w-4 text-red-400" />
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
              <div className="flex items-center gap-2 mb-3"><Search className="h-6 w-6 text-red-400" /><span className="font-black">دیاکو</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">هلدینگ مهاجرتی دیاکو — خدمات تخصصی ویزای جستجوی کار و اقامت کاری در اتریش.</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4" /><span>مشاوره تخصصی و شفاف</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#article" className="hover:text-red-300">مقاله</a></li>
                <li><a href="#scoring" className="hover:text-red-300">امتیازدهی</a></li>
                <li><a href="#stay-law" className="hover:text-red-300">قانون ماندن</a></li>
                <li><a href="#pros-cons" className="hover:text-red-300">مزایا و معایب</a></li>
                <li><a href="#samples" className="hover:text-red-300">نمونه ویزا</a></li>
                <li><a href="#faq" className="hover:text-red-300">سوالات</a></li>
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
              <h4 className="font-bold mb-3">شبکه‌های اجتماعی</h4>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <a href="https://instagram.com" className="hover:text-red-300" aria-label="اینستاگرام">اینستاگرام</a>
                <a href="https://wa.me/436889763256" className="hover:text-red-300" aria-label="واتساپ">واتساپ</a>
                <a href="https://t.me" className="hover:text-red-300" aria-label="تلگرام">تلگرام</a>
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

export default JobSeekerAustria2027Page;