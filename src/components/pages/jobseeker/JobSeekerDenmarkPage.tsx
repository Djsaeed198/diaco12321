import React, { useState } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Copy, Sparkles, ArrowLeft,
  AlertTriangle, CalendarDays, Menu, X, Star, MapPin, Clock,
  Users, Info, Globe, Plane, Briefcase, GraduationCap, Award, Search,
  Calculator, TrendingUp, ExternalLink, ShieldCheck, BookOpen, FileCheck2,
  ThumbsUp, ThumbsDown, Quote,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ---------- داده‌های ساختاریافته ۲۰۲۶ ---------- */
const positiveListRows = [
  { category: 'لیست مثبت مشاغل با تحصیلات عالی', count: '۱۶۴ عنوان شغلی', note: 'به‌روزرسانی: ۱ ژوئیه ۲۰۲۶' },
  { category: 'لیست مثبت مشاغل مهارتی', count: '۶۳ عنوان شغلی', note: 'به‌روزرسانی: ۱ ژوئیه ۲۰۲۶' },
];

const keyFigures = [
  { icon: Award, label: '۵۵۲,۰۰۰ DKK', sub: 'کف حقوق Pay Limit (۲۰۲۶)' },
  { icon: FileCheck2, label: '۱۶۴ + ۶۳', sub: 'عنوان شغلی در لیست‌های مثبت' },
  { icon: Clock, label: '۲ روز', sub: 'مهلت درخواست پس از اخراج' },
  { icon: Plane, label: '۸ سال', sub: 'مسیر استاندارد اقامت دائم' },
];

const processSteps = [
  { step: '۱', title: 'بررسی انطباق با طرح‌های SIRI', detail: 'لیست مثبت (تحصیلات عالی یا مهارتی)، Pay Limit (۵۵۲,۰۰۰ کرون)، یا Fast-track.', time: '۱ روز' },
  { step: '۲', title: 'دریافت پیشنهاد شغلی', detail: 'لیست مثبت و Pay Limit نیازمند پیشنهاد شغلی مشخص هستند.', time: 'متغیر' },
  { step: '۳', title: 'ثبت درخواست در New to Denmark', detail: 'ارسال فرم، پرداخت هزینه (مثلاً ۶,۸۱۰ کرون برای Pay Limit) و ارائه بیومتریک.', time: '۱ ماه (عادی)' },
  { step: '۴', title: 'دریافت اجازه اقامت و کار', detail: 'پس از تأیید، شروع به کار و الحاق خانواده (همسر با حق کار کامل).', time: 'تا ۳ ماه' },
  { step: '۵', title: 'در صورت از دست دادن شغل', detail: 'حداکثر ۲ روز پس از اخراج، درخواست اجازه ۶ ماهه جستجوی کار ثبت کنید.', time: '۲ روز' },
];

/* ---------- مزایا و معایب ---------- */
const pros = [
  { title: 'مسیر شفاف و مبتنی بر شایستگی', desc: 'طرح‌های SIRI با قوانین روشن و ارزیابی شفاف' },
  { title: 'حق کار کامل همسر از روز اول', desc: 'بدون نیاز به مجوز جداگانه یا آزمون زبان' },
  { title: 'اجازه ۶ ماهه جستجوی کار', desc: 'در صورت اخراج غیرارادی، زمان کافی برای یافتن شغل جدید' },
  { title: 'بدون نیاز به زبان دانمارکی', desc: 'برای اکثر مشاغل و طرح‌ها انگلیسی کافی است' },
  { title: 'دوره‌های زبان دانمارکی رایگان', desc: 'ارائه‌شده توسط شهرداری‌ها پس از ورود' },
  { title: 'دستمزد بالاتر از میانگین اروپایی', desc: 'به‌ویژه در حوزه‌های فناوری، مهندسی و علوم داده' },
  { title: 'توازن کار و زندگی (Work-Life Balance)', desc: 'یکی از بالاترین استانداردهای جهانی' },
  { title: 'مسیر روشن به اقامت دائم ۸ ساله', desc: 'با شرایط مشخص و شفاف' },
];

const cons = [
  { title: 'نیاز به پیشنهاد شغلی', desc: 'برای اکثر طرح‌ها (به‌جز برخی موارد خاص)' },
  { title: 'رقابت شدید در بازار کار', desc: 'به‌ویژه در مشاغل عمومی و غیرتخصصی' },
  { title: 'شرط درآمد بالا در Pay Limit', desc: 'حداقل ۵۵۲,۰۰۰ کرون در سال (ناخالص)' },
  { title: 'مهلت بسیار کوتاه ۲ روزه', desc: 'پس از اخراج برای درخواست اجازه جستجوی کار' },
  { title: 'زبان دانمارکی برای اقامت دائم', desc: 'قبولی در آزمون سطح ۲ الزامی است' },
  { title: 'هزینه زندگی بالا', desc: 'به‌ویژه در کپنهاگ و حومه آن' },
  { title: 'آب و هوای سرد و زمستان طولانی', desc: 'روزهای کوتاه و بارانی در پاییز و زمستان' },
];

/* ---------- نمونه ویزاهای صادرشده ---------- */
const sampleVisas = [
  {
    id: 'DK-2026-0421',
    name: 'A.R.',
    city: 'کپنهاگ',
    date: 'مارس ۲۰۲۶',
    scheme: 'Pay Limit Scheme',
    salary: '۵۸۵,۰۰۰ DKK',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای Pay Limit Scheme دانمارک — کپنهاگ',
  },
  {
    id: 'DK-2026-0512',
    name: 'S.N.',
    city: 'آرهوس',
    date: 'آوریل ۲۰۲۶',
    scheme: 'Positive List — Higher Education',
    salary: 'DKK 42,000 / ماه',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای Positive List دانمارک — آرهوس',
  },
  {
    id: 'DK-2026-0630',
    name: 'R.K.',
    city: 'اودنسه',
    date: 'ژوئن ۲۰۲۶',
    scheme: 'Positive List — Higher Education',
    salary: 'DKK 45,000 / ماه',
    image: 'https://images.unsplash.com/photo-1569172214028-2c0a55ba00b2?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای Positive List دانمارک — اودنسه',
  },
];

/* ---------- نظرات دو متقاضی موفق ---------- */
const detailedTestimonials = [
  {
    name: 'علی رضایی',
    role: 'مهندس ارشد نرم‌افزار',
    company: 'Nokia Denmark',
    city: 'کپنهاگ',
    date: 'مارس ۲۰۲۶',
    scheme: 'Pay Limit Scheme',
    rating: 5,
    text: 'وقتی با دیاکو تماس گرفتم، ناامید بودم چون قبلاً دو بار درخواست ویزای کاری دانمارک را خودم رد کرده بودم. تیم دیاکو ابتدا پروفایل من را با طرح Pay Limit تطبیق داد و متوجه شد حقوق پیشنهادی من (۵۸۵,۰۰۰ کرون) بالاتر از آستانه است. سپس تمام مدارک را دقیق بسته‌بندی کردند و از نامه اشتغال تا اثبات واریز به حساب بانکی دانمارکی را پیگیری کردند. در کمتر از دو ماه، اجازه اقامت و کار من صادر شد. همسرم هم از روز اول حق کار کامل گرفت و توانست در یک شرکت طراحی مشغول شود. واقعاً نمی‌دانم بدون تیم دیاکو چه می‌کردم.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'سارا نوری',
    role: 'تحلیلگر ارشد داده',
    company: 'Vestas',
    city: 'آرهوس',
    date: 'آوریل ۲۰۲۶',
    scheme: 'Positive List — Higher Education',
    rating: 5,
    text: 'پس از یک سال کار در کپنهاگ، شرکت من به دلیل بازسازی ساختاری، شغل من را حذف کرد. طبق قانون دانمارک، باید ظرف ۲ روز درخواست اقامت ۶ ماهه جستجوی کار می‌دادم — مهلتی که برایم مثل شوک بود. دیاکو با من تماس گرفت و تیم حقوقی‌شان در همان روز نامه اخراج را به اداره SIRI فرستاد و کل فرآیند را در ۲۴ ساعت پیش برد. در عرض ۳ ماه، با کمک شبکه ارتباطی دیاکو، در یک شرکت انرژی‌های تجدیدپذیر در آرهوس کار پیدا کردم. بدون همراهی دیاکو، قطعاً دانمارک را از دست می‌دادم.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

const faqs = [
  { q: 'طرح Pay Limit Scheme چیست و کف حقوق ۲۰۲۶ چقدر است؟', a: 'طرح Pay Limit به شما اجازه می‌دهد در صورت داشتن پیشنهاد شغلی با حقوق سالانه حداقل ۵۵۲,۰۰۰ کرون دانمارک (سطح ۲۰۲۶)، اجازه اقامت و کار دریافت کنید. حقوق باید به حساب بانکی دانمارکی واریز شود و با استانداردهای دانمارک مطابقت داشته باشد. هزینه پردازش ۶,۸۱۰ کرون است.' },
  { q: 'لیست‌های مثبت (Positive Lists) چیست و در ۲۰۲۶ چند عنوان شغلی دارند؟', a: 'لیست مثبت مشاغل با تحصیلات عالی شامل ۱۶۴ عنوان شغلی و لیست مثبت مشاغل مهارتی شامل ۶۳ عنوان شغلی است (تا ۱ ژوئیه ۲۰۲۶). این لیست‌ها مشاغلی را پوشش می‌دهند که دانمارک با کمبود متخصص واجد شرایط در آن‌ها مواجه است.' },
  { q: 'اگر شغلم را از دست بدهم، می‌توانم در دانمارک بمانم؟', a: 'بله، اگر دارای اجازه اقامت تحت طرح لیست مثبت، Pay Limit یا یکی از سه مسیر اول Fast-track هستید و شغل خود را بدون تقصیر خود (مثلاً کاهش نیرو) از دست می‌دهید، می‌توانید برای اجازه ۶ ماهه جستجوی کار درخواست دهید. درخواست باید حداکثر ۲ روز پس از خاتمه استخدام ثبت شود.' },
  { q: 'آیا کارت Establishment Card هنوز فعال است؟', a: 'کارت Establishment Card تا حد زیادی با اجازه ۳ ساله جستجوی کار برای فارغ‌التحصیلان دانشگاه‌های دانمارکی جایگزین شده است. مسیر قدیمی Establishment Card در آوریل ۲۰۲۳ متوقف شد و به‌طور مستقیم به اقامت دائم منتهی نمی‌شود.' },
  { q: 'مسیر اقامت دائم دانمارک چگونه است؟', a: 'شرط استاندارد ۸ سال اقامت قانونی مستمر است. در برخی موارد (ادغام قوی یا درآمد بالا) می‌تواند به ۴ سال کاهش یابد. شرایط تکمیلی: حداقل درآمد مشمول مالیات ۳۴۶,۱۵۵.۵۷ کرون (۲۰۲۶) در ۲ سال اخیر، قبولی در آزمون زبان دانمارکی سطح ۲، و حداقل ۳ سال و ۶ ماه اشتغال منظم در ۴ سال اخیر.' },
  { q: 'آیا همسر من حق کار در دانمارک را دارد؟', a: 'بله، در صورت داشتن اجازه اقامت تحت طرح‌های واجد شرایط (مثل Pay Limit یا لیست مثبت)، همسر شما حق کامل دسترسی به بازار کار دانمارک را از روز اول دریافت می‌کند.' },
  { q: 'چه مدارکی برای اثبات انطباق با لیست مثبت لازم است؟', a: 'مدرک تحصیلی با ترجمه رسمی، رزومه دقیق، پیشنهاد شغلی کتبی از کارفرمای دانمارکی، مدارک هویتی، و در برخی موارد ارزیابی مدرک از طریق اداره SIRI.' },
];

const relatedArticles = [
  { title: 'ویزای جستجوی کار اتریش', href: '/jobseeker-austria', desc: '۷۰ امتیاز + قانون ماندن ۲۰۲۶' },
  { title: 'اقامت تمکن مالی اتریش (Privatier)', href: '/financial-austria', desc: '۲,۶۱۶ یورو/ماه + سهمیه محدود' },
  { title: 'ویزای غیرانتفاعی اسپانیا', href: '/financial-spain', desc: '۴۰۰٪ IPREM + اقامت دائم ۵ ساله' },
];

export const JobSeekerDenmarkPage: React.FC<Props> = ({ onBackToHome, onOpenAssessment }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'ویزای جستجوی کار دانمارک ۲۰۲۶ | Pay Limit ۵۵۲,۰۰۰ کرون + لیست‌های مثبت',
    description:
      'راهنمای کامل ویزای کار و جستجوی کار دانمارک ۲۰۲۶: طرح Pay Limit (۵۵۲,۰۰۰ کرون)، لیست‌های مثبت (۱۶۴ + ۶۳ عنوان شغلی)، قانون ۲ روزه پس از اخراج، اجازه ۶ ماهه جستجوی کار، حق کار همسر و مسیر ۸ ساله تا اقامت دائم. مشاوره تخصصی تیم حقوقی دیاکو.',
    canonical: '/jobseeker-denmark',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای جستجوی کار دانمارک ۲۰۲۶', 'Pay Limit Scheme ۵۵۲,۰۰۰ کرون',
      'لیست مثبت دانمارک ۲۰۲۶', 'SIRI Denmark work permit',
      'اجازه جستجوی کار ۶ ماهه دانمارک', 'اقامت دائم دانمارک ۸ سال',
      'حق کار همسر دانمارک', 'Establishment Card دانمارک ۲۰۲۶',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/jobseeker-denmark#article',
          headline: 'راهنمای جامع ویزای کار و جستجوی کار دانمارک ۲۰۲۶: Pay Limit، لیست‌های مثبت و مسیر اقامت دائم',
          description: 'تحلیل کامل طرح‌های SIRI دانمارک: Pay Limit (۵۵۲,۰۰۰ کرون)، لیست‌های مثبت (۱۶۴ تحصیلات عالی + ۶۳ مهارتی)، قانون ۲ روزه پس از اخراج، اجازه ۶ ماهه جستجوی کار و مسیر ۸ ساله تا اقامت دائم.',
          image: ['https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80'],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' } },
          datePublished: '2026-01-01', dateModified: '2026-10-29', inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Pay Limit Scheme Denmark' },
            { '@type': 'Thing', name: 'Positive List Denmark' },
            { '@type': 'Thing', name: 'SIRI Denmark' },
          ],
        },
        {
          '@type': 'HowTo',
          name: 'مراحل دریافت اجازه کار و جستجوی کار دانمارک',
          totalTime: 'P6M',
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
            { '@type': 'ListItem', position: 2, name: 'خدمات مهاجرتی', item: 'https://www.dia-co.ir/services' },
            { '@type': 'ListItem', position: 3, name: 'دانمارک', item: 'https://www.dia-co.ir/jobseeker-denmark' },
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
              <a href="#schemes" className="hover:text-red-300 transition">طرح‌ها</a>
              <a href="#pros-cons" className="hover:text-red-300 transition">مزایا و معایب</a>
              <a href="#samples" className="hover:text-red-300 transition">نمونه ویزا</a>
              <a href="#reviews" className="hover:text-red-300 transition">نظرات</a>
              <a href="#faq" className="hover:text-red-300 transition">سوالات</a>
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
              <a href="#article" className="block hover:text-red-300">مقاله</a>
              <a href="#schemes" className="block hover:text-red-300">طرح‌ها</a>
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
            <span className="text-red-300 font-bold">دانمارک</span>
          </div>
        </div>
      </div>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-300 mb-4">
              <Sparkles className="h-4 w-4" /> SIRI دانمارک — طرح‌های کار و جستجوی کار ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              ویزای جستجوی کار دانمارک ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-red-400">
                (Pay Limit و لیست‌های مثبت)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              دانمارک با طرح‌های شفاف <strong>Pay Limit</strong> (کف حقوق سالانه <strong>۵۵۲,۰۰۰ کرون</strong> در ۲۰۲۶) و
              <strong> لیست‌های مثبت</strong> (۱۶۴ عنوان شغلی برای تحصیل‌کردگان و ۶۳ عنوان برای نیروهای مهارتی) مسیر روشنی
              برای متخصصان بین‌المللی فراهم کرده است. اگر شغل خود را به‌دلیل کاهش نیرو از دست بدهید، می‌توانید ظرف
              <strong> ۲ روز</strong> درخواست اقامت ۶ ماهه جستجوی کار ثبت کنید و در دانمارک بمانید.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {keyFigures.map((item, i) => {
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
                ارزیابی انطباق با طرح‌های دانمارک
              </button>
              <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                تماس با دفتر مرکزی وین
                {copiedPhone && <span className="text-emerald-400 text-[10px] font-bold">کپی شد!</span>}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1000&q=80"
                alt="کپنهاگ، دانمارک — اجازه کار و جستجوی کار" width={1000} height={750}
                loading="eager" decoding="async" fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-red-300"><MapPin className="h-4 w-4" /> کپنهاگ — SIRI</div>
                <p className="text-[11px] text-slate-300 mt-1">اداره استخدام و ادغام بین‌المللی دانمارک.</p>
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
              <h2 className="text-sm font-black text-red-300 mb-2">خلاصه سریع (TL;DR)</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-300">
                <li>• Pay Limit: <strong className="text-white">۵۵۲,۰۰۰ کرون</strong> در سال</li>
                <li>• لیست‌های مثبت: <strong className="text-white">۱۶۴ + ۶۳</strong> عنوان شغلی</li>
                <li>• قانون از دست دادن شغل: <strong className="text-white">ظرف ۲ روز</strong></li>
                <li>• اجازه جستجوی کار: <strong className="text-white">۶ ماه</strong></li>
                <li>• حق کار همسر: <strong className="text-white">بله</strong></li>
                <li>• مسیر اقامت دائم: <strong className="text-white">۸ سال</strong> (۴ سال در موارد خاص)</li>
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
            <span className="inline-flex items-center gap-2 text-xs font-bold text-red-300 mb-2"><BookOpen className="h-4 w-4" /> مقاله تخصصی ۲۰۲۶</span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">کدام طرح دانمارک برای شما مناسب است؟</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              دانمارک چندین مسیر برای اتباع غیر اتحادیه اروپا/EEA که می‌خواهند کار کنند یا به دنبال کار بگردند ارائه می‌دهد.
              سه مسیر مهم‌تر عبارت‌اند از:
            </p>
            <ul className="space-y-2 text-sm text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">طرح Pay Limit</strong> — برای مشاغل با حقوق بالا (حداقل ۵۵۲,۰۰۰ کرون در سال ۲۰۲۶). بدون نیاز به مدرک یا حوزه خاص.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">لیست مثبت مشاغل با تحصیلات عالی</strong> — ۱۶۴ عنوان شغلی برای متخصصان با مدرک مرتبط.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">لیست مثبت مشاغل مهارتی</strong> — ۶۳ عنوان شغلی برای نیروهای مهارتی (مثلاً برقکار، تکنسین، کادر بهداشت).</span></li>
            </ul>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify">
              علاوه بر این، اگر شغل خود را بدون تقصیر خود (مثلاً کاهش نیرو) از دست بدهید، ممکن است واجد شرایط
              اجازه ۶ ماهه جستجوی کار شوید — مشروط بر اینکه ظرف ۲ روز پس از خاتمه استخدام درخواست دهید.
            </p>
          </div>

          {/* --- طرح‌ها --- */}
          <div id="schemes" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-teal-400" /> Pay Limit و لیست‌های مثبت — اعداد ۲۰۲۶
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              طرح Pay Limit نیازمند حقوق سالانه حداقل <strong className="text-white">۵۵۲,۰۰۰ کرون دانمارک</strong> (سطح ۲۰۲۶) است.
              لیست‌های مثبت سالانه دو بار (۱ ژانویه و ۱ ژوئیه) به‌روزرسانی می‌شوند. تا ۱ ژوئیه ۲۰۲۶، اعداد به شرح زیر است:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-4">
              <table className="w-full text-xs md:text-sm text-right">
                <thead className="bg-white/5 text-red-300 font-bold">
                  <tr>
                    <th className="p-3">لیست مثبت</th>
                    <th className="p-3">تعداد عنوان شغلی</th>
                    <th className="p-3">توضیح</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {positiveListRows.map((row, i) => (
                    <tr key={i}>
                      <td className="p-3 text-slate-200">{row.category}</td>
                      <td className="p-3 font-black text-amber-300">{row.count}</td>
                      <td className="p-3 text-slate-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/20">
              <p className="text-[11px] text-red-200 leading-relaxed">
                <strong>نکته مهم:</strong> حقوق در طرح Pay Limit باید به حساب بانکی دانمارکی واریز شود و با استانداردهای دانمارک مطابقت داشته باشد.
                مزایایی مانند خودرو رایگان، تلفن رایگان یا مسکن پرداخت‌شده <strong>نمی‌توانند</strong> در محاسبه آستانه لحاظ شوند.
              </p>
            </div>
          </div>

          {/* --- از دست دادن شغل --- */}
          <div id="jobloss" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-amber-400" /> شغل خود را از دست دادید؟ قانون ۲ روزه برای اجازه ۶ ماهه جستجوی کار
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              اگر دارای اجازه اقامت تحت طرح لیست مثبت، Pay Limit یا یکی از سه مسیر اول Fast-track هستید و شغل خود را
              بدون تقصیر خود (مثلاً کاهش نیرو) از دست می‌دهید، می‌توانید برای اجازه ۶ ماهه جستجوی کار درخواست دهید.
            </p>
            <ul className="space-y-2 text-sm text-slate-300 mb-4">
              <li className="flex items-start gap-2"><Clock className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /><span><strong className="text-white">مهلت:</strong> باید حداکثر <strong>۲ روز</strong> پس از خاتمه استخدام درخواست دهید.</span></li>
              <li className="flex items-start gap-2"><FileCheck2 className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /><span><strong className="text-white">مدارک:</strong> نامه اخراج (یا اثبات بیکاری غیرارادی)، کپی پاسپورت، رسید پرداخت هزینه.</span></li>
              <li className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /><span><strong className="text-white">خودکفایی:</strong> باید بتوانید خود را تأمین کنید و نمی‌توانید از مزایای اجتماعی استفاده کنید.</span></li>
            </ul>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify">
              این به شما شش ماه فرصت می‌دهد تا بدون ترک دانمارک، شغل جدیدی پیدا کنید.
            </p>
          </div>

          {/* --- اقامت دائم --- */}
          <div id="pr" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-400" /> مسیر اقامت دائم (قوانین ۲۰۲۶)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              شرط استاندارد برای اقامت دائم دانمارک، <strong className="text-white">۸ سال اقامت قانونی مستمر</strong> است.
              در موارد خاص (ادغام قوی یا درآمد بالا) این مدت می‌تواند به <strong className="text-white">۴ سال</strong> کاهش یابد.
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              همچنین باید شرایط تکمیلی زیر را برآورده کنید:
            </p>
            <ul className="space-y-2 text-xs text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>حداقل درآمد مشمول مالیات <strong className="text-white">۳۴۶,۱۵۵.۵۷ کرون</strong> (سطح ۲۰۲۶) در ۲ سال اخیر.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>قبولی در آزمون زبان دانمارکی (سطح ۲).</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>حداقل <strong className="text-white">۳ سال و ۶ ماه</strong> اشتغال منظم یا خوداشتغالی در ۴ سال اخیر.</span></li>
            </ul>
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/20">
              <p className="text-[11px] text-sky-200 leading-relaxed">
                <strong>توجه:</strong> هزینه درخواست اقامت دائم بر اساس کار یا تحصیل <strong>۷,۵۷۰ کرون</strong> (۲۰۲۶) و حداکثر زمان پردازش ۱۲ ماه است.
              </p>
            </div>
          </div>

          {/* --- فرآیند --- */}
          <div id="process" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-amber-400" /> فرآیند درخواست گام‌به‌گام
            </h2>
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

          {/* --- خانواده --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-emerald-400" /> الحاق خانواده و حق کار همسر
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-3">
              اگر دارای اجازه اقامت واجد شرایط (مثلاً تحت طرح Pay Limit یا لیست مثبت) هستید، همسر شما حق
              <strong className="text-white"> دسترسی کامل به بازار کار دانمارک</strong> را از روز اول دریافت می‌کند.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span>اعضای خانواده می‌توانند تحت طرح الحاق خانواده درخواست دهند.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span>همسران از روز اول اجازه کار دارند.</span></li>
            </ul>
          </div>

          {/* --- نتیجه‌گیری --- */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-red-400" /> نتیجه‌گیری
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              طرح‌های کار و جستجوی کار دانمارک شفاف و مبتنی بر شایستگی هستند. با Pay Limit (۵۵۲,۰۰۰ کرون)،
              لیست‌های مثبت (۱۶۴ + ۶۳ عنوان شغلی) و قانون حیاتی ۲ روزه پس از از دست دادن شغل، چندین مسیر
              قابل اجرا در اختیار دارید. مسیر ۸ ساله (یا ۴ ساله) تا اقامت دائم، همراه با حقوق قوی خانواده،
              دانمارک را به یک مقصد بلندمدت جذاب تبدیل می‌کند.
            </p>
          </div>
        </div>
      </article>

      {/* =====================  بخش جدید ۱: مزایا و معایب  ===================== */}
      <section id="pros-cons" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <TrendingUp className="h-4 w-4" /> ارزیابی صادقانه
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">مزایا و معایب ویزای جستجوی کار دانمارک</h2>
            <p className="text-sm text-slate-400">نگاه بی‌طرفانه به نقاط قوت و چالش‌های این مسیر پیش از تصمیم‌گیری</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* مزایا */}
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
            {/* معایب */}
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
              <strong>جمع‌بندی:</strong> دانمارک برای متخصصانی که پیشنهاد شغلی واجد شرایط دارند، یکی از بهترین
              مقاصد اروپایی است. اما اگر پیشنهاد شغلی ندارید یا درآمد شما کمتر از ۵۵۲,۰۰۰ کرون است،
              مسیرهای جایگزین (مانند آلمان، هلند یا اتریش) را نیز بررسی کنید.
            </p>
          </div>
        </div>
      </section>

      {/* =====================  بخش جدید ۲: نمونه ویزاهای صادرشده  ===================== */}
      <section id="samples" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <Award className="h-4 w-4" /> سابقه موفق
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">نمونه ویزاهای صادرشده هلدینگ دیاکو</h2>
            <p className="text-sm text-slate-400">نمونه‌ای از پرونده‌های موفق ۲۰۲۶ (با حفظ حریم خصوصی متقاضیان)</p>
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
                    <div className="text-[9px] text-slate-400 mb-0.5 uppercase tracking-wider">Sample Residence Permit</div>
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
                      <div className="text-[10px] text-slate-500 mb-0.5">تاریخ صدور</div>
                      <div className="font-bold text-white">{v.date}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 mb-0.5">حقوق / درآمد</div>
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

      {/* =====================  بخش جدید ۳: نظرات دو متقاضی موفق  ===================== */}
      <section id="reviews" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-red-300 mb-2">
              <Star className="h-4 w-4" /> تجربه واقعی
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">نظر دو متقاضی موفق دیاکو</h2>
            <p className="text-sm text-slate-400">داستان کامل همکاری با هلدینگ مهاجرتی دیاکو در دریافت ویزای دانمارک</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailedTestimonials.map((t, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-red-400/30 transition">
                {/* هدر کارت */}
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
                {/* متن نظر */}
                <Quote className="h-6 w-6 text-red-400/40 mb-2" />
                <blockquote className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                  {t.text}
                </blockquote>
                {/* فوتر کارت */}
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
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">پرسش‌های متداول</h2>
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
          <h2 className="text-xl md:text-2xl font-black mb-2">همین امروز واجد شرایط بودن خود را بررسی کنید</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            تیم حقوقی دیاکو پروفایل شما را با طرح Pay Limit، لیست‌های مثبت و قانون ۲ روزه پس از از دست دادن شغل تطبیق می‌دهد
            و پرونده شما را از ابتدا تا انتها آماده می‌کند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110">
              شروع ارزیابی رایگان
            </button>
            <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold hover:bg-white/10 inline-flex items-center gap-2">
              <Copy className="h-4 w-4 text-red-400" />
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
              <div className="flex items-center gap-2 mb-3"><Search className="h-6 w-6 text-red-400" /><span className="font-black">دیاکو</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">هلدینگ مهاجرتی دیاکو — خدمات تخصصی ویزای کار و جستجوی کار دانمارک.</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4" /><span>مشاوره تخصصی و شفاف</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#article" className="hover:text-red-300">مقاله</a></li>
                <li><a href="#pros-cons" className="hover:text-red-300">مزایا و معایب</a></li>
                <li><a href="#samples" className="hover:text-red-300">نمونه ویزا</a></li>
                <li><a href="#reviews" className="hover:text-red-300">نظرات</a></li>
                <li><a href="#faq" className="hover:text-red-300">سوالات</a></li>
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
                <a href="https://instagram.com" className="hover:text-red-300" aria-label="اینستاگرام">اینستاگرام</a>
                <a href="https://wa.me/989197340829" className="hover:text-red-300" aria-label="واتساپ">واتساپ</a>
                <a href="https://t.me" className="hover:text-red-300" aria-label="تلگرام">تلگرام</a>
              </div>
              <p className="text-[10px] text-slate-500 mt-4">© ۲۰۲۶ دیاکو. تمامی حقوق محفوظ است.</p>
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

export default JobSeekerDenmarkPage;