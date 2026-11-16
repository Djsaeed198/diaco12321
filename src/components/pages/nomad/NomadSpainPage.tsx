import React, { useState } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Copy, Sparkles, ArrowLeft,
  AlertTriangle, CalendarDays, Menu, X, Star, Quote, MapPin, Clock,
  Users, Home, Info, Globe, Plane, Briefcase, GraduationCap, Award,
  Search, Calculator, TrendingUp, ExternalLink, ShieldCheck, BookOpen,
  FileCheck2, ThumbsUp, ThumbsDown, FileWarning, Languages, Euro,
  Wallet, Laptop, Heart, Scale, Building2,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ---------- داده‌های ساختاریافته ۲۰۲۶ ---------- */
const incomeRows = [
  { label: 'متقاضی اصلی', value: '€۲,۸۴۹ / ماه', note: '۲۰۰٪ SMI (بر پایه ۱۴ پرداخت)', icon: Wallet },
  { label: 'همسر / شریک', value: '+ €۱,۰۶۸ / ماه', note: '۷۵٪ SMI', icon: Users },
  { label: 'هر فرزند', value: '+ €۳۵۶ / ماه', note: '۲۵٪ SMI', icon: Heart },
];

const processSteps = [
  { step: '۱', title: 'ورود قانونی به اسپانیا (مسیر UGE)', detail: 'با ویزای توریستی معتبر یا هر ویزای قانونی دیگر وارد شوید. حضور قانونی کافی است.', time: '۱ روز' },
  { step: '۲', title: 'آماده‌سازی مدارک', detail: 'پاسپورت، مدرک یا سابقه کار ۳ ساله، قرارداد/فاکتور ۳ ماه، بیمه بدون copay، گواهی عدم سوءپیشینه، مسکن.', time: '۲–۴ ماه' },
  { step: '۳', title: 'ثبت درخواست در UGE-CE', detail: 'فرم MI-T را تکمیل و مدارک را در سامانه UGE بارگذاری کنید. هزینه Tasa 790-038: €۷۳.۲۶.', time: '۱ روز' },
  { step: '۴', title: 'دریافت تصمیم (۲۰ روز کاری)', detail: 'در صورت عدم پاسخ در ۲۰ روز کاری، درخواست به‌صورت خودکار تأیید شده تلقی می‌شود (Silencio Positivo).', time: '۲۰ روز' },
  { step: '۵', title: 'دریافت کارت TIE', detail: 'ظرف ۳۰ روز پس از تأیید، برای انگشت‌نگاری و دریافت کارت اقدام کنید. هزینه: €۱۶.۰۸.', time: '۳۰ روز' },
];

const pros = [
  { title: 'اقامت ۳ ساله از داخل اسپانیا', desc: 'بدون نیاز به ویزای اولیه؛ با ویزای توریستی قابل تبدیل است' },
  { title: 'رژیم مالیاتی بکهام ۲۴٪', desc: 'نرخ ثابت تا سقف €۶۰۰,۰۰۰ به مدت ۶ سال' },
  { title: 'حق کار کامل همسر', desc: 'همسر از روز اول اجازه کار در اسپانیا دارد' },
  { title: 'مسیر روشن به اقامت دائم', desc: 'پس از ۵ سال اقامت مستمر' },
  { title: 'بدون نیاز به سرمایه‌گذاری', desc: 'برخلاف گلدن ویزا که لغو شده است' },
  { title: 'زندگی در آب‌وهوای مدیترانه‌ای', desc: 'کیفیت زندگی بالا و اینترنت فیبر پرسرعت' },
  { title: 'امکان الحاق خانواده', desc: 'همسر، فرزندان و والدین وابسته' },
  { title: 'تصمیم سریع ۲۰ روزه', desc: 'با سکوت مثبت (Positive Silence)' },
];

const cons = [
  { title: 'رقابت و بررسی دقیق مدارک', desc: 'UGE در ۲۰۲۶ سخت‌گیری بیشتری روی فریلنسرها اعمال می‌کند' },
  { title: 'الزام ۸۰٪ درآمد از خارج', desc: 'حداکثر ۲۰٪ می‌تواند از مشتریان اسپانیایی باشد' },
  { title: 'مهلت ۶ ماهه Modelo 149', desc: 'تأخیر یعنی از دست دادن دائمی رژیم بکهام' },
  { title: 'هزینه زندگی در مادرید/بارسلونا', desc: 'اجاره و هزینه‌ها بالاست' },
  { title: 'بوروکراسی و وقت TIE', desc: 'صف انگشت‌نگاری در مادرید/بارسلونا حدود ۶ هفته است' },
  { title: 'مالیات ۴۷٪ بالای €۶۰۰k', desc: 'برای درآمدهای بالا، نرخ افزایش می‌یابد' },
  { title: 'عدم امکان کار برای کارفرمای اسپانیایی', desc: 'کارمندان فقط برای شرکت خارجی' },
];

const sampleVisas = [
  {
    id: 'ES-2026-0412',
    name: 'A.R.',
    city: 'بارسلونا',
    date: 'آوریل ۲۰۲۶',
    scheme: 'UGE → ۳ ساله',
    salary: 'درآمد: €۳,۲۰۰ / ماه',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه اقامت دیجیتال نوماد اسپانیا — بارسلونا',
  },
  {
    id: 'ES-2026-0528',
    name: 'S.N.',
    city: 'مادرید',
    date: 'مه ۲۰۲۶',
    scheme: 'UGE → ۳ ساله',
    salary: 'درآمد: €۳,۶۰۰ / ماه',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه اقامت دیجیتال نوماد اسپانیا — مادرید',
  },
  {
    id: 'ES-2026-0703',
    name: 'M.K.',
    city: 'والنسیا',
    date: 'ژوئیه ۲۰۲۶',
    scheme: 'کنسولگری → ۱ ساله',
    salary: 'درآمد: €۲,۹۵۰ / ماه',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای دیجیتال نوماد اسپانیا — والنسیا',
  },
];

const detailedTestimonials = [
  {
    name: 'آرش رضایی',
    role: 'مهندس نرم‌افزار',
    company: 'شرکت آلمانی (دورکاری)',
    city: 'بارسلونا',
    date: 'آوریل ۲۰۲۶',
    scheme: 'UGE → اقامت ۳ ساله',
    rating: 5,
    text: 'من با ویزای توریستی وارد بارسلونا شدم و تصمیم گرفتم از داخل اسپانیا اقدام کنم. دیاکو ابتدا مدارک را بررسی کرد: مدرک مهندسی، قرارداد ۲ ساله با شرکت آلمانی و درآمد €۳,۲۰۰. نکته مهم این بود که UGE در ۲۰۲۶ برای فریلنسرها مدارک رسمی بیشتری می‌خواهد، اما من کارمند بودم و کار ساده‌تر بود. درخواست در ۲۰ روز کاری تأیید شد (سکوت مثبت). سپس برای TIE اقدام کردم و کارت را در ۳ هفته گرفتم. همسرم هم از روز اول اجازه کار گرفت و در یک شرکت طراحی مشغول شد. مهم‌ترین کمک دیاکو، برنامه‌ریزی برای Modelo 149 بود که ظرف ۶ ماه ثبت کردیم و نرخ ۲۴٪ را گرفتیم.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'نگار موسوی',
    role: 'مشاور بازاریابی دیجیتال',
    company: 'فریلنسر — مشتریان خارجی',
    city: 'مادرید',
    date: 'مه ۲۰۲۶',
    scheme: 'کنسولگری → ۱ ساله → UGE',
    rating: 5,
    text: 'من از ایران از طریق کنسولگری اقدام کردم. دیاکو هشدار داد که برای فریلنسرها، UGE مدارک رسمی فعالیت حرفه‌ای (ثبت مالیاتی، بیمه، مجوز فعالیت) می‌خواهد و فقط فاکتور کافی نیست. من این مدارک را از ایران آماده کردم و ترجمه رسمی کردم. ویزای ۱ ساله در ۶ هفته صادر شد. پس از ورود به مادرید، دیاکو کمک کرد تا ظرف ۳۰ روز TIE بگیرم و سپس برای تمدید ۳ ساله از داخل اسپانیا (UGE) اقدام کنم. نکته کلیدی: مهلت ۶ ماهه Modelo 149 را از دست ندادم. حالا درآمد من €۳,۶۰۰ است و ۹۰٪ از مشتریانم خارج از اسپانیا هستند.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

const faqs = [
  { q: 'حداقل درآمد برای ویزای دیجیتال نوماد اسپانیا در ۲۰۲۶ چقدر است؟', a: 'بر اساس شاخص رسمی SMI سال ۲۰۲۶ (€۱,۲۲۱ در ۱۴ پرداخت معادل €۱۷,۰۹۴ سالانه)، آستانه ۲۰۰٪ برابر با €۲,۸۴۹ ناخالص در ماه است (منبع: inclusion.gob.es). برای همسر +€۱,۰۶۸ (۷۵٪ SMI) و برای هر فرزند +€۳۵۶ (۲۵٪ SMI) اضافه می‌شود.' },
  { q: 'آیا ویزای نوماد اسپانیا به‌طور خودکار رژیم بکهام را فعال می‌کند؟', a: 'خیر. این دو فرآیند جداگانه هستند. باید فرم Modelo 149 را ظرف ۶ ماه از ثبت‌نام در تأمین اجتماعی (Seguridad Social) به اداره مالیات (AEAT) ارائه دهید. در غیر این صورت مشمول نرخ تصاعدی IRPF (تا ۴۷٪) خواهید شد.' },
  { q: 'نرخ مالیات بکهام چقدر است؟', a: '۲۴٪ ثابت برای درآمدهای تا سقف €۶۰۰,۰۰۰ در سال. درآمدهای بالاتر از این سقف مشمول ۴۷٪ می‌شوند. این رژیم تا ۶ سال (سال ورود + ۵ سال بعد) قابل استفاده است.' },
  { q: 'آیا می‌توانم مشتری اسپانیایی داشته باشم؟', a: 'برای فریلنسرها بله، اما حداکثر ۲۰٪ از کل فعالیت حرفه‌ای. برای کارمندان، کار برای کارفرمای اسپانیایی مجاز نیست. ۸۰٪ درآمد باید از خارج اسپانیا باشد.' },
  { q: 'تفاوت مسیر UGE و کنسولگری چیست؟', a: 'UGE (از داخل اسپانیا): اقامت اولیه ۳ ساله، تصمیم در ۲۰ روز کاری. کنسولگری (از خارج): ویزای ۱ ساله که باید قبل از انقضا در UGE تبدیل به اقامت شود.' },
  { q: 'آیا خانواده می‌توانند همراه باشند؟', a: 'بله. همسر/شریک ثبت‌شده، فرزندان زیر ۱۸ سال و والدین وابسته می‌توانند الحاق شوند. همسر حق کار کامل دارد. برای هر عضو، مبلغ اضافی به تمکن مالی اضافه می‌شود.' },
  { q: 'پس از ۳ سال چه می‌شود؟', a: 'اقامت اولیه ۳ ساله قابل تمدید برای ۲ سال دیگر است. پس از ۵ سال اقامت قانونی مستمر، می‌توانید برای اقامت دائم (Residencia de Larga Duración) درخواست دهید. تابعیت اسپانیا معمولاً پس از ۱۰ سال (برای کشورهای آمریکای لاتین ۲ سال) امکان‌پذیر است.' },
  { q: 'آیا مدرک تحصیلی الزامی است؟', a: 'بله، یا مدرک دانشگاهی/فنی مرتبط، یا حداقل ۳ سال سابقه کار حرفه‌ای در حوزه شغلی. برای فریلنسرها، قرارداد با حداقل یک مشتری خارجی به مدت ۳ ماه و سابقه فعالیت ۱ ساله شرکت مشتری الزامی است.' },
  { q: 'UGE در ۲۰۲۶ چه تغییراتی داشته است؟', a: 'سخت‌گیری روی مدارک رسمی فریلنسرها (ثبت مالیاتی، بیمه، مجوز فعالیت)، الزام صورت‌حساب‌های بانکی مهرشده یا امضاشده، و بررسی دقیق‌تر تداوم فعالیت شرکت خارجی.' },
];

const relatedArticles = [
  { title: 'ویزای جستجوی کار اتریش ۲۰۲۷', href: '/jobseeker-austria', desc: '۷۰ امتیاز + قانون ماندن تا صدور RWR Card' },
  { title: 'کارت شانس آلمان ۲۰۲۷', href: '/jobseeker-germany', desc: '۶ امتیاز + ۲۰ ساعت کار + مسیر بلوکارت' },
  { title: 'ویزای جستجوی کار دانمارک', href: '/jobseeker-denmark', desc: 'Pay Limit ۵۵۲,۰۰۰ کرون + لیست‌های مثبت' },
];

export const NomadSpainPage: React.FC<Props> = ({ onBackToHome, onOpenAssessment }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'ویزای دیجیتال نوماد اسپانیا ۲۰۲۶ | درآمد €۲,۸۴۹ + مالیات بکهام ۲۴٪',
    description:
      'راهنمای کامل ویزای دیجیتال نوماد اسپانیا ۲۰۲۶: حداقل درآمد €۲,۸۴۹ در ماه (۲۰۰٪ SMI)، همسر +€۱,۰۶۸ و فرزند +€۳۵۶، رژیم مالیاتی بکهام ۲۴٪ تا €۶۰۰k، اقامت ۳ ساله از داخل اسپانیا (UGE) و مسیر ۵ ساله تا اقامت دائم. مشاوره دیاکو.',
    canonical: '/nomad-spain',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای دیجیتال نوماد اسپانیا ۲۰۲۶', 'Spain Digital Nomad Visa',
      'حداقل درآمد نوماد اسپانیا ۲۸۴۹ یورو', 'قانون بکهام ۲۴ درصد',
      'اقامت ۳ ساله UGE مادرید', 'Ley de Startups اسپانیا',
      'رژیم بکهام نوماد دیجیتال', 'تمدید اقامت نوماد اسپانیا',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/nomad-spain#article',
          headline: 'راهنمای جامع ویزای دیجیتال نوماد اسپانیا ۲۰۲۶: درآمد €۲,۸۴۹، بکهام ۲۴٪ و اقامت ۳ ساله',
          description: 'تحلیل کامل Ley 28/2022 و Ley 14/2013: آستانه درآمد ۲۰۰٪ SMI (€۲,۸۴۹)، بکهام ۲۴٪ تا €۶۰۰k، مسیر UGE ۳ ساله، تغییرات ۲۰۲۶ برای فریلنسرها و مسیر اقامت دائم ۵ ساله.',
          image: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' } },
          datePublished: '2026-01-01', dateModified: '2026-10-29', inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Spain Digital Nomad Visa' },
            { '@type': 'Thing', name: 'Beckham Law' },
            { '@type': 'Thing', name: 'UGE Spain' },
          ],
        },
        {
          '@type': 'HowTo',
          name: 'مراحل دریافت ویزای دیجیتال نوماد اسپانیا',
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
            { '@type': 'ListItem', position: 3, name: 'دیجیتال نوماد اسپانیا', item: 'https://www.dia-co.ir/nomad-spain' },
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
              <Laptop className="h-7 w-7 text-teal-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
              <a href="#article" className="hover:text-teal-300 transition">مقاله</a>
              <a href="#income" className="hover:text-teal-300 transition">درآمد</a>
              <a href="#beckham" className="hover:text-teal-300 transition">بکهام</a>
              <a href="#uge" className="hover:text-teal-300 transition">UGE</a>
              <a href="#pros-cons" className="hover:text-teal-300 transition">مزایا و معایب</a>
              <a href="#samples" className="hover:text-teal-300 transition">نمونه ویزا</a>
              <a href="#reviews" className="hover:text-teal-300 transition">نظرات</a>
              <a href="#faq" className="hover:text-teal-300 transition">سوالات</a>
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
              <a href="#article" className="block hover:text-teal-300">مقاله</a>
              <a href="#income" className="block hover:text-teal-300">درآمد</a>
              <a href="#beckham" className="block hover:text-teal-300">بکهام</a>
              <a href="#uge" className="block hover:text-teal-300">UGE</a>
              <a href="#pros-cons" className="block hover:text-teal-300">مزایا و معایب</a>
              <a href="#samples" className="block hover:text-teal-300">نمونه ویزا</a>
              <a href="#reviews" className="block hover:text-teal-300">نظرات</a>
              <a href="#faq" className="block hover:text-teal-300">سوالات</a>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Breadcrumb ---------- */}
      <div className="container mx-auto px-4 md:px-8 pt-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button type="button" onClick={onBackToHome} className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-teal-400 hover:text-teal-300 transition">
            <ArrowLeft className="h-4 w-4" /> بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span><span>/</span>
            <span>دیجیتال نوماد</span><span>/</span>
            <span className="text-teal-300 font-bold">اسپانیا</span>
          </div>
        </div>
      </div>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-bold text-teal-300 mb-4">
              <Sparkles className="h-4 w-4" /> Ley 28/2022 — اقامت کار از راه دور اسپانیا ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              ویزای دیجیتال نوماد اسپانیا ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-teal-400">
                (Spain Digital Nomad)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              اسپانیا با آب‌وهوای مدیترانه‌ای، اینترنت فیبر پرسرعت و کیفیت بالای زندگی، محبوب‌ترین مقصد
              دیجیتال نومادها در جهان است. طبق قانون ۲۸/۲۰۲۲، کارمندان دورکار و فریلنسرهایی که برای
              شرکت‌های خارج از اسپانیا کار می‌کنند، می‌توانند مستقیماً کارت اقامت{' '}
              <strong className="text-amber-300">۳ ساله شینگن</strong> دریافت کرده و از رژیم مالیاتی
              ویژه <strong className="text-amber-300">بکهام با نرخ ثابت ۲۴٪</strong> بهره‌مند شوند.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: Wallet, label: '€۲,۸۴۹', sub: 'حداقل درآمد ماهانه' },
                { icon: Scale, label: '۲۴٪', sub: 'مالیات بکهام' },
                { icon: CalendarDays, label: '۳ سال', sub: 'اقامت اولیه UGE' },
                { icon: Globe, label: '۵ سال', sub: 'تا اقامت دائم' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                    <Icon className="h-5 w-5 text-teal-400 mx-auto mb-1" />
                    <div className="text-sm font-black text-amber-300">{item.label}</div>
                    <div className="text-[10px] text-slate-300 mt-1">{item.sub}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition">
                ارزیابی رایگان شرایط نوماد اسپانیا
              </button>
              <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                دفتر مرکزی وین: +۴۳ ۶۸۸ ۹۷۶ ۳۲۵۶
                {copiedPhone && <span className="text-emerald-400 text-[10px] font-bold">کپی شد!</span>}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                alt="دیجیتال نوماد اسپانیا — کار از راه دور در بارسلونا" width={1000} height={750}
                loading="eager" decoding="async" fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-300"><MapPin className="h-4 w-4" /> مادرید — UGE-CE</div>
                <p className="text-[11px] text-slate-300 mt-1">بررسی ۲۰ روزه، صدور اقامت ۳ ساله و پیگیری TIE.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- خلاصه سریع (TL;DR) ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-10">
        <div className="max-w-4xl mx-auto rounded-2xl border border-teal-400/30 bg-teal-500/5 p-5">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-teal-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-sm font-black text-teal-300 mb-2">خلاصه سریع (TL;DR) — ۲۰۲۶</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-300">
                <li>• حداقل درآمد: <strong className="text-white">€۲,۸۴۹ / ماه</strong> (۲۰۰٪ SMI)</li>
                <li>• همسر: <strong className="text-white">+€۱,۰۶۸</strong> | فرزند: <strong className="text-white">+€۳۵۶</strong></li>
                <li>• مالیات بکهام: <strong className="text-white">۲۴٪ تا €۶۰۰k</strong></li>
                <li>• اقامت UGE: <strong className="text-white">۳ ساله</strong> (تمدید ۲ ساله)</li>
                <li>• تصمیم UGE: <strong className="text-white">۲۰ روز کاری</strong></li>
                <li>• اقامت دائم: <strong className="text-emerald-300">پس از ۵ سال</strong></li>
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
            <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 mb-2"><BookOpen className="h-4 w-4" /> مقاله تخصصی ۲۰۲۶</span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">ویزای دیجیتال نوماد اسپانیا چیست و برای چه کسانی مناسب است؟</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              ویزای دیجیتال نوماد اسپانیا (Spain Digital Nomad Visa) که رسماً با عنوان
              <strong className="text-white"> «اقامت بین‌المللی دورکاری» (International Telework Residence)</strong>
              شناخته می‌شود، در چارچوب <strong>Ley 28/2022 (قانون استارت‌آپ‌ها)</strong> و اصلاح
              <strong>Ley 14/2013</strong> ایجاد شده است. این ویزا برای اتباع غیر اتحادیه اروپا طراحی شده که
              می‌توانند از راه دور برای شرکت‌ها یا مشتریان خارج از اسپانیا کار کنند.
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              سه ویژگی کلیدی این ویزا:
            </p>
            <ul className="space-y-2 text-sm text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">اقامت ۳ ساله از داخل اسپانیا</strong> — با ویزای توریستی قابل تبدیل است.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">رژیم مالیاتی بکهام ۲۴٪</strong> — تا سقف €۶۰۰,۰۰۰ به مدت ۶ سال.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">مسیر روشن به اقامت دائم</strong> — پس از ۵ سال اقامت مستمر.</span></li>
            </ul>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify">
              برخلاف گلدن ویزا که در آوریل ۲۰۲۵ لغو شد، این ویزا هیچ الزام سرمایه‌گذاری ندارد و تنها
              اثبات درآمد پایدار از خارج اسپانیا، مدارک حرفه‌ای و بیمه درمانی کافی است.
            </p>
          </div>

          {/* --- درآمد --- */}
          <div id="income" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-teal-400" /> آستانه درآمد ۲۰۲۶ — دقیقاً چقدر لازم است؟
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              آستانه درآمد بر پایه <strong className="text-white">۲۰۰٪ حداقل دستمزد سالانه (SMI)</strong> تعیین می‌شود.
              برای سال ۲۰۲۶، SMI برابر <strong>€۱,۲۲۱ در ۱۴ پرداخت</strong> (معادل €۱۷,۰۹۴ سالانه) است.
              محاسبه ۲۰۰٪ بر پایه ماهانه میانگین (€۱۷,۰۹۴ ÷ ۱۲ = €۱,۴۲۴.۵۰) به رقم
              <strong className="text-amber-300"> €۲,۸۴۹ ناخالص در ماه</strong> می‌رسد.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-4">
              <table className="w-full text-xs md:text-sm text-right">
                <thead className="bg-white/5 text-teal-300 font-bold">
                  <tr>
                    <th className="p-3">عضو خانواده</th>
                    <th className="p-3">مبلغ اضافی ماهانه</th>
                    <th className="p-3">درصد SMI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="p-3 text-slate-200">متقاضی اصلی</td><td className="p-3 font-black text-amber-300">€۲,۸۴۹</td><td className="p-3 text-slate-400">۲۰۰٪</td></tr>
                  <tr><td className="p-3 text-slate-200">همسر / شریک</td><td className="p-3 font-black text-amber-300">+€۱,۰۶۸</td><td className="p-3 text-slate-400">۷۵٪</td></tr>
                  <tr><td className="p-3 text-slate-200">هر فرزند</td><td className="p-3 font-black text-amber-300">+€۳۵۶</td><td className="p-3 text-slate-400">۲۵٪</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20 mb-4">
              <p className="text-[11px] text-amber-200 leading-relaxed">
                <strong>نکته مهم:</strong> مبنای رسمی کنونی UGE بر اساس تعدیل SMI سال ۲۰۲۶، دقیقاً <strong>€۲,۸۴۹ ناخالص در ماه</strong> (معادل ۲۰۰٪ حداقل دستمزد بر مبنای ۱۴ پرداخت سالانه) طبق پورتال رسمی inclusion.gob.es است. پیش از ثبت درخواست، گواهی درآمد و کسر بیمه را منطبق با همین سقف تنظیم کنید.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {incomeRows.map((row, i) => {
                const Icon = row.icon;
                return (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Icon className="h-5 w-5 text-teal-400 mx-auto mb-1" />
                    <div className="text-xs text-slate-300 mb-1">{row.label}</div>
                    <div className="text-base font-black text-amber-300">{row.value}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{row.note}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- قانون ۸۰/۲۰ --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-emerald-400" /> قانون ۸۰/۲۰ — منبع درآمد شما کجاست؟
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              حداقل <strong className="text-white">۸۰٪ از کل درآمد یا فعالیت حرفه‌ای</strong> شما باید از
              خارج از اسپانیا تأمین شود. حداکثر <strong>۲۰٪</strong> می‌تواند از مشتریان یا کارفرمایان
              داخل اسپانیا باشد. این محدودیت برای فریلنسرها به‌صورت سهم فعالیت (نه سهم درآمد) اعمال می‌شود.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span><strong className="text-white">کارمندان:</strong> فقط مجاز به کار برای شرکت خارج از اسپانیا هستند؛ کار برای کارفرمای اسپانیایی مجاز نیست.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span><strong className="text-white">فریلنسرها:</strong> می‌توانند تا ۲۰٪ از فعالیت خود را به مشتریان اسپانیایی اختصاص دهند.</span></li>
            </ul>
          </div>

          {/* --- بکهام --- */}
          <div id="beckham" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Scale className="h-6 w-6 text-indigo-400" /> قانون بکهام (Beckham Law) — مالیات ۲۴٪
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              یکی از بزرگ‌ترین جذابیت‌های این ویزا، دسترسی به رژیم مالیاتی ویژه
              <strong className="text-white"> «رژیم مالیاتی واردین» (Special Tax Regime for Impatriates)</strong>
              است که به نام فوتبالیست انگلیسی، دیوید بکهام، شناخته می‌شود. طبق این رژیم:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-200">درآمد تا €۶۰۰,۰۰۰</span>
                  <span className="text-lg font-black text-white">۲۴٪</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[24%] bg-emerald-400 rounded-full" />
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-400/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-rose-200">درآمد بالای €۶۰۰,۰۰۰</span>
                  <span className="text-lg font-black text-white">۴۷٪</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[47%] bg-rose-400 rounded-full" />
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>مدت اعتبار: <strong className="text-white">۶ سال</strong> (سال ورود + ۵ سال بعد).</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>درآمدهای خارجی (سود سهام، اجاره املاک خارجی، سود سرمایه) مشمول مالیات اسپانیا نمی‌شوند.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>معافیت از مالیات بر ثروت (Wealth Tax) برای دارایی‌های خارج از اسپانیا.</span></li>
            </ul>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/20">
              <p className="text-[11px] text-red-200 leading-relaxed">
                <strong>مهلت حیاتی:</strong> فرم <strong>Modelo 149</strong> را باید ظرف
                <strong> ۶ ماه</strong> از ثبت‌نام در تأمین اجتماعی (Seguridad Social) به اداره مالیات
                (AEAT) ارائه دهید. تأخیر حتی یک روزه به معنای از دست دادن دائمی این رژیم است.
              </p>
            </div>
          </div>

          {/* --- UGE --- */}
          <div id="uge" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <FileCheck2 className="h-6 w-6 text-teal-400" /> دو مسیر درخواست: UGE و کنسولگری
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-400/20">
                <h3 className="text-sm font-black text-teal-300 mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> از داخل اسپانیا (UGE-CE)
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-400 mt-0.5 shrink-0" /><span>اقامت اولیه <strong>۳ ساله</strong> (تمدید ۲ ساله).</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-400 mt-0.5 shrink-0" /><span>تصمیم در <strong>۲۰ روز کاری</strong> (سکوت مثبت).</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-400 mt-0.5 shrink-0" /><span>نیاز به ورود قانونی قبلی (توریستی کافی است).</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-400 mt-0.5 shrink-0" /><span>هزینه Tasa 790-038: <strong>€۷۳.۲۶</strong>.</span></li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                <h3 className="text-sm font-black text-amber-300 mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4" /> از کنسولگری (خارج)
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" /><span>ویزای اولیه <strong>۱ ساله</strong> (غیرقابل تمدید).</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" /><span>تصمیم در حدود <strong>۱۰ روز کاری</strong>.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" /><span>باید قبل از انقضا در UGE درخواست اقامت دهید.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" /><span>نیاز به NIE و مدارک ترجمه رسمی.</span></li>
                </ul>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              توصیه دیاکو: اگر در اسپانیا حضور دارید، مسیر UGE با اقامت ۳ ساله اولیه انتخاب بهتری است.
            </p>
          </div>

          {/* --- تغییرات UGE 2026 --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-amber-400" /> تغییرات مهم UGE در ۲۰۲۶
            </h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2"><FileWarning className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span><strong className="text-white">مدارک رسمی فریلنسرها:</strong> UGE اکنون مدارک رسمی ثبت فعالیت حرفه‌ای (ثبت مالیاتی، بیمه، مجوز فعالیت) را می‌خواهد، نه فقط فاکتور و قرارداد.</span></li>
              <li className="flex items-start gap-2"><FileWarning className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span><strong className="text-white">صورت‌حساب بانکی:</strong> صورت‌حساب‌ها باید مهر یا امضای بانک داشته باشند؛ فایل PDF ساده ممکن است رد شود.</span></li>
              <li className="flex items-start gap-2"><FileWarning className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" /><span><strong className="text-white">تداوم فعالیت شرکت خارجی:</strong> باید ثابت کنید شرکت یا گروه خارجی حداقل ۱ سال فعالیت واقعی و مستمر داشته است.</span></li>
            </ul>
          </div>

          {/* --- فرآیند --- */}
          <div id="process" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-amber-400" /> فرآیند درخواست — گام‌به‌گام
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
              <Users className="h-6 w-6 text-emerald-400" /> الحاق خانواده
            </h2>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">همسر/شریک ثبت‌شده:</strong> حق کار کامل در اسپانیا از روز اول.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">فرزندان زیر ۱۸ سال:</strong> دسترسی به سیستم آموزشی رایگان.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">والدین وابسته:</strong> با اثبات وابستگی مالی.</span></li>
            </ul>
          </div>

          {/* --- اقامت دائم --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-indigo-400" /> مسیر اقامت دائم و تابعیت
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-400/20">
                <h3 className="text-xs font-bold text-teal-200 mb-2">مرحله ۱</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">اقامت ۳ ساله UGE، قابل تمدید ۲ ساله</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                <h3 className="text-xs font-bold text-emerald-200 mb-2">مرحله ۲</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">پس از ۵ سال اقامت مستمر: اقامت دائم</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                <h3 className="text-xs font-bold text-amber-200 mb-2">مرحله ۳</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">پس از ۱۰ سال (۲ سال برای آمریکای لاتین): تابعیت</p>
              </div>
            </div>
          </div>

          {/* --- نتیجه‌گیری --- */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-teal-400" /> نتیجه‌گیری
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              ویزای دیجیتال نوماد اسپانیا با درآمد <strong className="text-white">€۲,۸۴۹ در ماه</strong>،
              رژیم مالیاتی <strong className="text-white">بکهام ۲۴٪</strong>، اقامت
              <strong className="text-white">۳ ساله از داخل اسپانیا</strong> و مسیر روشن به
              <strong className="text-white">اقامت دائم ۵ ساله</strong>، یکی از جذاب‌ترین گزینه‌های
              دیجیتال نوماد در اروپا است. کلید موفقیت، <strong className="text-teal-300">آماده‌سازی دقیق مدارک</strong>،
              به‌ویژه برای فریلنسرها، و <strong className="text-teal-300">ثبت به‌موقع Modelo 149</strong> است.
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
            <h2 className="text-2xl md:text-3xl font-black mb-2">مزایا و معایب ویزای دیجیتال نوماد اسپانیا</h2>
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
              <strong>جمع‌بندی:</strong> اسپانیا برای دیجیتال نومادهایی که درآمد پایدار از خارج دارند،
              یکی از بهترین گزینه‌های اروپایی است. اما اگر فریلنسر هستید، آماده‌سازی مدارک رسمی
              (ثبت مالیاتی، بیمه، مجوز فعالیت) ضروری است.
            </p>
          </div>
        </div>
      </section>

      {/* =====================  نمونه ویزاها  ===================== */}
      <section id="samples" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <Award className="h-4 w-4" /> سابقه موفق
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">نمونه ویزاهای صادرشده هلدینگ دیاکو — ۲۰۲۶</h2>
            <p className="text-sm text-slate-400">نمونه‌ای از پرونده‌های موفق (با حفظ حریم خصوصی متقاضیان)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleVisas.map((v, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-teal-400/40 transition group">
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
                        <MapPin className="h-3 w-3 text-teal-400" />{v.city}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 mb-0.5">تاریخ</div>
                      <div className="font-bold text-white">{v.date}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 mb-0.5">درآمد</div>
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
            <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 mb-2">
              <Star className="h-4 w-4" /> تجربه واقعی
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">نظر دو متقاضی موفق دیاکو — ۲۰۲۶</h2>
            <p className="text-sm text-slate-400">داستان کامل همکاری با هلدینگ مهاجرتی دیاکو در دریافت ویزای نوماد اسپانیا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailedTestimonials.map((t, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-teal-400/30 transition">
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
                <Quote className="h-6 w-6 text-teal-400/40 mb-2" />
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
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">پرسش‌های متداول ۲۰۲۶</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button type="button" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-teal-300 transition"
                aria-expanded={openFaq === idx}>
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-teal-400' : ''}`} />
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
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-teal-400/40 transition">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-bold text-white group-hover:text-teal-300 transition">{r.title}</h3>
                <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-teal-400 shrink-0 mt-0.5 transition" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- CTA نهایی ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-teal-400/30 bg-gradient-to-l from-teal-500/10 via-teal-400/5 to-transparent p-6 md:p-10 text-center">
          <Sparkles className="h-8 w-8 text-teal-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-black mb-2">مسیر شما به اسپانیا از اینجا شروع می‌شود</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            تیم حقوقی دیاکو با همکاری وکلای همکار در اسپانیا پرونده شما را از ابتدا تا دریافت کارت اقامت همراهی می‌کند: ارزیابی رایگان،
            بررسی مدارک، برنامه‌ریزی مالیاتی بکهام و پیگیری TIE.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110">
              شروع ارزیابی رایگان
            </button>
            <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold hover:bg-white/10 inline-flex items-center gap-2">
              <Copy className="h-4 w-4 text-teal-400" />
              {copiedPhone ? 'شماره کپی شد!' : 'دفتر مرکزی وین: +۴۳ ۶۸۸ ۹۷۶ ۳۲۵۶'}
            </button>
          </div>
        </div>
      </section>

      {/* ---------- فوتر ---------- */}
      <footer className="border-t border-white/10 bg-[#041418]">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3"><Laptop className="h-6 w-6 text-teal-400" /><span className="font-black">دیاکو</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">هلدینگ مهاجرتی دیاکو — خدمات تخصصی دیجیتال نوماد و اقامت کاری در اسپانیا.</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4" /><span>مشاوره تخصصی و شفاف</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#article" className="hover:text-teal-300">مقاله</a></li>
                <li><a href="#income" className="hover:text-teal-300">درآمد</a></li>
                <li><a href="#beckham" className="hover:text-teal-300">بکهام</a></li>
                <li><a href="#uge" className="hover:text-teal-300">UGE</a></li>
                <li><a href="#pros-cons" className="hover:text-teal-300">مزایا و معایب</a></li>
                <li><a href="#faq" className="hover:text-teal-300">سوالات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">تماس با ما</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>دفتر مرکزی وین: +۴۳ ۶۸۸ ۹۷۶ ۳۲۵۶</li>
                <li>دفتر تهران: ۰۲۱-۹۱۶۹۳۹۵۵</li>
                <li>واتساپ: ۰۹۱۹۷۳۴۰۸۲۹</li>
                <li>ایمیل: info@dia-co.ir</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">شبکه‌های اجتماعی</h4>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <a href="https://instagram.com/diacoholding" className="hover:text-teal-300" aria-label="اینستاگرام">اینستاگرام</a>
                <a href="https://wa.me/436889763256" className="hover:text-teal-300" aria-label="واتساپ">واتساپ</a>
                <a href="https://t.me/diacoholding" className="hover:text-teal-300" aria-label="تلگرام">تلگرام</a>
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

export default NomadSpainPage;