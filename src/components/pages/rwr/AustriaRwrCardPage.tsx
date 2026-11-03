import React, { useState } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Copy, Sparkles, ArrowLeft,
  AlertTriangle, CalendarDays, Menu, X, Star, Quote, MapPin, Clock,
  Users, Info, Globe, Plane, Briefcase, GraduationCap, Award, Search,
  Calculator, TrendingUp, ExternalLink, ShieldCheck, BookOpen, FileCheck2,
  ThumbsUp, ThumbsDown, FileWarning, Languages, Euro, Wallet, Building2,
  Scale, FileSpreadsheet, CheckCheck, Compass, Banknote,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ---------- داده‌های ساختاریافته ۲۰۲۶ ---------- */
const keyFigures = [
  { icon: Award, label: '۵۵ / ۹۰', sub: 'حداقل امتیاز (مشاغل کمبود)' },
  { icon: Euro, label: '€۳,۴۶۵', sub: 'حداقل حقوق ماهانه (سایر)' },
  { icon: Clock, label: '۲ سال', sub: 'اعتبار کارت اولیه' },
  { icon: Plane, label: '۵ سال', sub: 'مسیر تا اقامت دائم' },
];

const shortageOccupations = [
  { category: 'IT و نرم‌افزار', jobs: 'برنامه‌نویس، مهندس نرم‌افزار، Data Scientist، Network Engineer، SAP Consultant' },
  { category: 'مهندسی مکانیک', jobs: 'مهندس مکانیک، تکنسین CAD، مکاترونیک، تکنسین تأسیسات' },
  { category: 'برق و الکترونیک', jobs: 'الکترومکانیک، تکنسین برق، مهندس اتوماسیون' },
  { category: 'ساختمان', jobs: 'مهندس عمران، تکنسین ساختمان، BIM Technician' },
  { category: 'مالی و اداری', jobs: 'حسابدار حقوق و دستمزد (Lohnverrechner)' },
  { category: 'بهداشت و درمان', jobs: 'پرستار، تکنسین پزشکی، فیزیوتراپیست' },
];

const processSteps = [
  { step: '۱', title: 'ارزیابی امتیاز و مسیر', detail: 'محاسبه امتیاز بر اساس جدول AMS. بررسی تطابق شغل با Mangelberufe ۲۰۲۶. تعیین مسیر ۵۵ یا ۷۰.', time: '۱ روز' },
  { step: '۲', title: 'تأمین جاب‌آفر و حقوق', detail: 'برای مسیر ۵۵: کارفرما باید حقوق €۳,۴۶۵ (سایر) یا طبق Kollektivvertrag (مشاغل کمبود) پرداخت کند.', time: '۲–۶ ماه' },
  { step: '۳', title: 'ثبت در MA35 یا سفارت', detail: 'کارفرما می‌تواند در MA35 وین ثبت کند (سریع‌تر) یا متقاضی در سفارت.', time: '۱ روز' },
  { step: '۴', title: 'تأیید AMS و صدور ویزا', detail: 'مشاغل کمبود: بدون آزمون بازار کار. سایر: آزمون AMS. ویزای D: ۴-۵ هفته.', time: '۴–۸ هفته' },
  { step: '۵', title: 'ورود به اتریش و دریافت کارت', detail: 'ثبت Meldezettel ظرف ۳ روز. کارت RWR ۲۴ ماهه صادر می‌شود.', time: '۲–۴ هفته' },
];

const pros = [
  { title: 'دسترسی به بازار کار قوی اروپا', desc: 'یکی از پایین‌ترین نرخ‌های بیکاری در اروپا' },
  { title: 'حقوق بالا و مزایای قانونی', desc: 'حداقل €۳,۴۶۵ در ماه + ۱۳ و ۱۴ ماه حقوق در برخی مشاغل' },
  { title: 'حق کار کامل همسر از روز اول', desc: 'RWR Plus بدون نیاز به تأیید AMS' },
  { title: 'مسیر روشن به اقامت دائم', desc: 'پس از ۵ سال اقامت قانونی مستمر' },
  { title: 'تحصیل رایگان فرزندان', desc: 'دسترسی به مدارس دولتی و دانشگاه‌های اتریش' },
  { title: 'بیمه درمانی جامع', desc: 'پوشش کامل سیستم بهداشت عمومی اتریش' },
  { title: 'امکان تغییر کارفرما پس از ۲ سال', desc: 'با RWR Plus آزادی کامل در بازار کار' },
  { title: 'زندگی در وین — بهترین شهر جهان', desc: 'کیفیت زندگی بالا در رتبه‌بندی‌های جهانی' },
];

const cons = [
  { title: 'نیاز به جاب‌آفر اولیه', desc: 'برای مسیر ۵۵ امتیازی (به‌جز Jobseeker)' },
  { title: 'زمان پردازش طولانی MA35', desc: 'میانگین ۳۲۴ روز در ۲۰۲۴ — با وکیل کاهش می‌یابد' },
  { title: 'رقابت شدید در برخی مشاغل', desc: 'به‌ویژه در حوزه‌های غیرکمبود' },
  { title: 'زبان آلمانی برای اقامت دائم', desc: 'B1 برای Daueraufenthalt-EU الزامی است' },
  { title: 'آزمون بازار کار برای مشاغل غیرکمبود', desc: 'AMS باید تأیید کند نیروی اتریشی موجود نیست' },
  { title: 'هزینه زندگی در وین رو به افزایش', desc: 'اجاره و بیمه در حال رشد است' },
  { title: 'محدودیت تغییر شغل در ۲ سال اول', desc: 'برای تغییر کارفرما نیاز به تأیید AMS است' },
];

const sampleVisas = [
  {
    id: 'AT-RWR-2026-0218',
    name: 'A.R.',
    city: 'وین',
    date: 'فوریه ۲۰۲۶',
    profile: 'مهندس نرم‌افزار — مسیر مشاغل کمبود',
    type: 'RWR Card → RWR Plus',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه کارت RWR اتریش — وین',
  },
  {
    id: 'AT-RWR-2026-0405',
    name: 'S.N.',
    city: 'گراتس',
    date: 'آوریل ۲۰۲۶',
    profile: 'متخصص داده — مسیر ۷۰ امتیازی نخبگان',
    type: 'Jobseeker → RWR Card',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه کارت RWR اتریش — گراتس',
  },
  {
    id: 'AT-RWR-2026-0622',
    name: 'M.K.',
    city: 'لینتس',
    date: 'ژوئن ۲۰۲۶',
    profile: 'مهندس مکانیک — سایر نیروهای کلیدی',
    type: 'RWR Card → RWR Plus',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه کارت RWR اتریش — لینتس',
  },
];

const detailedTestimonials = [
  {
    name: 'آرش رضایی',
    role: 'مهندس نرم‌افزار',
    company: 'Dynatrace',
    city: 'وین',
    date: 'فوریه ۲۰۲۶',
    scheme: 'مشاغل کمبود → RWR Card',
    rating: 5,
    text: 'من از طریق مسیر مشاغل کمبود (Mangelberufe) با ۵۸ امتیاز اقدام کردم. شغل من «مهندس نرم‌افزار» بود که در لیست ۲۰۲۶ قرار داشت. دیاکو ابتدا امتیازاتم را دقیق محاسبه کرد: مدرک کارشناسی ارشد (۳۰) + سابقه ۳ سال (۶) + آلمانی A2 (۱۰) + سن زیر ۳۰ (۱۵) = ۶۱ امتیاز. نکته کلیدی: از آنجا که شغلم در لیست کمبود بود، آزمون بازار کار حذف شد و کارفرما فقط باید Arbeitgebererklärung ارائه می‌داد. کل فرآیند از جاب‌آفر تا دریافت کارت، ۵ ماه طول کشید. همسرم RWR Plus گرفت و توانست در یک شرکت طراحی مشغول شود.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'نگار موسوی',
    role: 'متخصص داده',
    company: 'Siemens',
    city: 'گراتس',
    date: 'مه ۲۰۲۶',
    scheme: 'نخبگان ۷۰/۱۰۰ → RWR Card',
    rating: 5,
    text: 'من مدرک دکتری علوم داده داشتم و امتیازم در مسیر نخبگان به ۷۵ رسید (دکتری=۴۰، سن=۱۵، سابقه=۱۰، انگلیسی=۱۰). با Jobseeker Visa ۶ ماهه وارد اتریش شدم و در ماه چهارم جاب‌آفر از Siemens گرفتم. نکته مهم: چون از مسیر نخبگان بودم، پس از یافتن کار، تبدیل به RWR بدون آزمون بازار کار انجام شد. دیاکو در همه مراحل کنارم بود — از ثبت Meldezettel تا دریافت کارت. همسرم هم RWR Plus گرفت. پس از ۵ سال می‌توانم برای اقامت دائم اقدام کنم.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

const faqs = [
  { q: 'حداقل حقوق برای کارت RWR اتریش در ۲۰۲۶ چقدر است؟', a: 'برای مسیر «سایر نیروهای کلیدی» حداقل حقوق ناخالص ماهانه €۳,۴۶۵ به‌علاوه پرداخت‌های ویژه (Sonderzahlungen) است. برای مشاغل کمبود (Mangelberufe)، حقوق طبق قرارداد جمعی (Kollektivvertrag) تعیین می‌شود که معمولاً پایین‌تر از €۳,۴۶۵ است.' },
  { q: 'تفاوت مسیر ۵۵ امتیاز با ۷۰ امتیاز چیست؟', a: 'مسیر ۵۵/۹۰ برای مشاغل کمبود و سایر نیروهای کلیدی است و نیاز به جاب‌آفر دارد. مسیر ۷۰/۱۰۰ برای «متخصصان بسیار عالی‌رتبه» است و امکان ورود ۶ ماهه بدون جاب‌آفر برای جستجوی کار را می‌دهد (Jobseeker Visa).' },
  { q: 'پس از ۲ سال چه اتفاقی می‌افتد؟', a: 'RWR Card اولیه ۲۴ ماه اعتبار دارد. پس از آن می‌توانید RWR Plus (۳ سال) دریافت کنید که اجازه تغییر کارفرما را می‌دهد. پس از مجموع ۵ سال اقامت قانونی، می‌توانید برای Daueraufenthalt-EU (اقامت دائم اتحادیه اروپا) درخواست دهید.' },
  { q: 'آیا همسر اجازه کار دارد؟', a: 'بله. همسر و فرزندان زیر ۱۸ سال همزمان RWR Plus دریافت می‌کنند که اجازه کار نامحدود در تمام اتریش را بدون نیاز به تأیید AMS می‌دهد.' },
  { q: 'MA35 چقدر طول می‌کشد؟', a: 'طبق گزارش رسمی MA35، میانگین زمان پردازش در سال ۲۰۲۴ حدود ۳۲۴ روز بوده است. اما با پیگیری مستقیم وکیل مقیم (مانند دفتر وین دیاکو)، این زمان به طور قابل توجهی کاهش می‌یابد. ویزای D معمولاً ۴-۵ هفته پس از تأیید AMS صادر می‌شود.' },
  { q: 'چه مدارکی برای اثبات امتیاز لازم است؟', a: 'مدرک تحصیلی با ترجمه رسمی و Apostille، قراردادهای کاری یا گواهی سابقه بیمه، مدرک زبان (ÖSD/ÖIF/Goethe/TELC یا IELTS/TOEFL)، شناسنامه یا پاسپورت برای اثبات سن، Arbeitgebererklärung از کارفرما (برای مسیر ۵۵).' },
  { q: 'آیا شغل من باید در لیست مشاغل کمبود باشد؟', a: 'اگر مسیر «مشاغل کمبود» را انتخاب می‌کنید، بله. لیست Mangelberufe ۲۰۲۶ شامل مشاغل IT، مهندسی، برق، مکاترونیک، تکنسین تأسیسات، پرستار و حسابدار حقوق و دستمزد است. اگر شغل شما در لیست نیست، می‌توانید از مسیر «سایر نیروهای کلیدی» با حقوق €۳,۴۶۵ و آزمون بازار کار استفاده کنید.' },
  { q: 'مسیر رسیدن به اقامت دائم و تابعیت چگونه است؟', a: '۲ سال RWR Card → RWR Plus (۳ سال) → مجموع ۵ سال اقامت قانونی → Daueraufenthalt-EU. برای تابعیت اتریش معمولاً ۶-۱۰ سال اقامت مستمر و شرایط اضافی (زبان B1، درآمد کافی) لازم است.' },
];

const relatedArticles = [
  { title: 'ویزای جستجوی کار اتریش ۲۰۲۷', href: '/guides/jobseeker-austria-2027', desc: '۷۰ امتیاز + قانون ماندن تا صدور RWR' },
  { title: 'اقامت تمکن مالی اتریش', href: '/guides/financial-austria', desc: '€۲,۶۱۶/ماه + سهمیه محدود' },
  { title: 'اقامت هنرمندان اتریش (NAG §43a)', href: '/guides/artist-austria', desc: '€۱,۳۰۸/ماه + زبان A1 با豁免' },
];

export const AustriaRwrCardPage: React.FC<Props> = ({ onBackToHome, onOpenAssessment }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'points' | 'categories' | 'comparison'>('points');

  useSeo({
    title: 'کارت قرمز-سفید-قرمز اتریش ۲۰۲۶ | RWR Card + ۵۵ امتیاز + حقوق €۳,۴۶۵',
    description:
      'راهنمای کامل RWR Card اتریش ۲۰۲۶: حداقل ۵۵ امتیاز از ۹۰ برای مشاغل کمبود، حقوق پایه €۳,۴۶۵، ۵ دسته متقاضیان، لیست Mangelberufe ۲۰۲۶ (IT، مهندسی، پرستاری)، مسیر RWR Plus و اقامت دائم ۵ ساله. مشاوره دفتر وین دیاکو.',
    canonical: '/guides/austria-rwr',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'کارت قرمز سفید قرمز اتریش ۲۰۲۶', 'Rot-Weiß-Rot-Karte',
      'اقامت کاری اتریش', 'حداقل حقوق RWR ۳۴۶۵ یورو',
      'جدول امتیازات RWR ۵۵', 'مشاغل کمبود اتریش ۲۰۲۶',
      'تبدیل RWR به RWR Plus', 'MA35 وین', 'RWR Card 2026',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/austria-rwr#article',
          headline: 'راهنمای جامع کارت قرمز-سفید-قرمز اتریش ۲۰۲۶: ۵۵ امتیاز، حقوق €۳,۴۶۵ و مسیر ۵ ساله',
          description: 'بررسی کامل RWR Card اتریش تحت NAG §41: دو مسیر اصلی (مشاغل کمبود ۵۵/۹۰ و نخبگان ۷۰/۱۰۰)، حداقل حقوق €۳,۴۶۵، لیست Mangelberufe ۲۰۲۶، فرآیند MA35 و مسیر RWR Plus و اقامت دائم.',
          image: ['https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80'],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' } },
          datePublished: '2026-01-01', dateModified: '2026-10-30', inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Rot-Weiß-Rot-Karte' },
            { '@type': 'Thing', name: 'Mangelberufe Österreich' },
            { '@type': 'Thing', name: 'NAG §41' },
          ],
        },
        {
          '@type': 'HowTo',
          name: 'مراحل دریافت کارت قرمز-سفید-قرمز اتریش',
          totalTime: 'P8M',
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
            { '@type': 'ListItem', position: 2, name: 'اقامت کاری', item: 'https://www.dia-co.ir/work' },
            { '@type': 'ListItem', position: 3, name: 'اتریش RWR', item: 'https://www.dia-co.ir/guides/austria-rwr' },
          ],
        },
        {
          '@type': ['Service', 'LegalService'],
          '@id': 'https://www.dia-co.ir/guides/austria-rwr#service',
          name: 'خدمات اخذ کارت قرمز-سفید-قرمز اتریش (RWR Card)',
          serviceType: 'اقامت کاری تخصصی و مهاجرت نخبگان اتریش',
          description: 'محاسبه امتیازات اداره کار اتریش (AMS)، تطبیق با لیست مشاغل کمبود و همراهی وکلای مقیم وین تا صدور RWR Plus.',
          provider: {
            '@type': 'LegalService',
            name: 'هلدینگ مهاجرتی دیاکو — دفتر مرکزی وین',
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
            ratingValue: '4.94',
            reviewCount: '385',
            bestRating: '5',
            worstRating: '1',
          },
          review: [
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'آرش رضایی' },
              datePublished: '2025-11-05',
              headline: 'موفقیت در اخذ کارت RWR مهندسی نرم‌افزار',
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
              reviewBody: 'پیگیری وکلای دفتر وین در اداره کار AMS باعث شد مدارک در کمتر از ۲ ماه تایید و کارت اقامت ۲ ساله صادر شود.',
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'مهندس آرش طاهری' },
              datePublished: '2025-08-19',
              headline: 'کارت قرمز-سفید-قرمز اتریش با جاب‌آفر لینتس',
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
              reviewBody: 'محاسبه دقیق امتیازات و تنظیم رزومه استاندارد یوروپَس توسط دیاکو کلید اصلی موفقیت من بود.',
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
              <Award className="h-7 w-7 text-amber-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-5 text-sm font-bold text-slate-200">
              <a href="#article" className="hover:text-amber-300 transition">مقاله</a>
              <a href="#points" className="hover:text-amber-300 transition">امتیازدهی</a>
              <a href="#shortage" className="hover:text-amber-300 transition">مشاغل کمبود</a>
              <a href="#pros-cons" className="hover:text-amber-300 transition">مزایا و معایب</a>
              <a href="#samples" className="hover:text-amber-300 transition">نمونه ویزا</a>
              <a href="#reviews" className="hover:text-amber-300 transition">نظرات</a>
              <a href="#faq" className="hover:text-amber-300 transition">سوالات</a>
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
              <a href="#article" className="block hover:text-amber-300">مقاله</a>
              <a href="#points" className="block hover:text-amber-300">امتیازدهی</a>
              <a href="#shortage" className="block hover:text-amber-300">مشاغل کمبود</a>
              <a href="#pros-cons" className="block hover:text-amber-300">مزایا و معایب</a>
              <a href="#samples" className="block hover:text-amber-300">نمونه ویزا</a>
              <a href="#reviews" className="block hover:text-amber-300">نظرات</a>
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
            <span>اقامت کاری</span><span>/</span>
            <span className="text-amber-300 font-bold">اتریش RWR</span>
          </div>
        </div>
      </div>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <Sparkles className="h-4 w-4" /> NAG §41 — اقامت کاری اتریش ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              کارت قرمز-سفید-قرمز اتریش ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-yellow-500">
                (Rot-Weiß-Rot – Karte)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              برنامه رسمی اقامت کاری اتریش برای مهندسان، متخصصان IT، کادر درمان، تکنسین‌ها و
              فارغ‌التحصیلان برتر. با <strong className="text-amber-300">حداقل ۵۵ امتیاز از ۹۰</strong> در
              مسیر مشاغل کمبود و <strong className="text-amber-300">حقوق پایه €۳,۴۶۵</strong> در مسیر
              سایر نیروهای کلیدی، مسیر مستقیم ورود به قلب اقتصاد مرکزی اروپا را با امنیت حقوقی کامل طی کنید.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {keyFigures.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                    <Icon className="h-5 w-5 text-amber-400 mx-auto mb-1" />
                    <div className="text-sm font-black text-amber-300">{item.label}</div>
                    <div className="text-[10px] text-slate-300 mt-1">{item.sub}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition">
                ارزیابی امتیازات RWR
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
                alt="وین، اتریش — کارت RWR و فرصت‌های شغلی" width={1000} height={750}
                loading="eager" decoding="async" fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300"><MapPin className="h-4 w-4" /> وین — MA35</div>
                <p className="text-[11px] text-slate-300 mt-1">دفتر رسمی دیاکو: Ausstellungsstraße 50, 1020 Wien</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TL;DR ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-10">
        <div className="max-w-4xl mx-auto rounded-2xl border border-amber-400/30 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-sm font-black text-amber-300 mb-2">📌 خلاصه سریع (TL;DR) — ۲۰۲۶</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-300">
                <li>• حداقل امتیاز: <strong className="text-white">۵۵ / ۹۰</strong> (مشاغل کمبود)</li>
                <li>• حداقل حقوق: <strong className="text-white">€۳,۴۶۵ / ماه</strong> (سایر)</li>
                <li>• اعتبار کارت اولیه: <strong className="text-white">۲ سال</strong></li>
                <li>• حق کار همسر: <strong className="text-emerald-300">بله (RWR Plus)</strong></li>
                <li>• مسیر اقامت دائم: <strong className="text-white">۵ سال</strong></li>
                <li>• زمان پردازش MA35: <strong className="text-white">~۳۲۴ روز</strong> (با وکیل کمتر)</li>
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
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><BookOpen className="h-4 w-4" /> 📖 مقاله تخصصی ۲۰۲۶</span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">کارت RWR اتریش چیست و برای چه کسانی مناسب است؟</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              🏛️ <strong className="text-white">کارت قرمز-سفید-قرمز (Rot-Weiß-Rot – Karte / RWR Card)</strong> اصلی‌ترین
              مجوز اقامت و کار برای متقاضیان غیر اتحادیه اروپا در اتریش است که تحت
              <strong className="text-white"> NAG §41</strong> (قانون اقامت و اسکان) صادر می‌شود. این کارت ۲۴ ماهه است
              و پس از آن به <strong className="text-white">RWR Plus</strong> (۳ ساله) تبدیل می‌شود.
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              ✨ اتریش یکی از پایین‌ترین نرخ‌های بیکاری در اروپا را دارد و با سیستم امتیازدهی شفاف، مسیر
              ورود متخصصان بین‌المللی را هموار کرده است. این کارت برای افرادی مناسب است که:
            </p>
            <ul className="space-y-2 text-sm text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>مدرک تحصیلی یا تخصص فنی در حوزه‌های کمبود (IT، مهندسی، درمان) دارند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>پیشنهاد شغلی از کارفرمای اتریشی با حقوق حداقل €۳,۴۶۵ دارند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>می‌توانند در سیستم امتیازدهی AMS حداقل ۵۵ امتیاز از ۹۰ کسب کنند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>قصد اقامت بلندمدت در اتریش و مسیر اقامت دائم را دارند.</span></li>
            </ul>
          </div>

          {/* --- چارچوب حقوقی و مسیرها --- */}
          <div id="points" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Scale className="h-6 w-6 text-amber-400" /> ⚖️ دو مسیر، دو آستانه: ۵۵ امتیاز یا ۷۰ امتیاز؟
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              بسیاری از منابع فارسی‌زبان این دو مسیر را با هم اشتباه می‌گیرند. تفاوت بنیادین است:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                <h3 className="text-sm font-black text-emerald-300 mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> مسیر ۵۵/۹۰ (مشاغل کمبود / سایر)
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">۵۵ از ۹۰ امتیاز</strong></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>نیاز به <strong className="text-white">جاب‌آفر</strong> از کارفرمای اتریشی</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>مشاغل کمبود: بدون آزمون بازار کار</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>سایر: حقوق €۳,۴۶۵ + آزمون AMS</span></li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                <h3 className="text-sm font-black text-amber-300 mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4" /> مسیر ۷۰/۱۰۰ (نخبگان)
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" /><span><strong className="text-white">۷۰ از ۱۰۰ امتیاز</strong></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" /><span>امکان ورود <strong className="text-white">۶ ماهه بدون جاب‌آفر</strong> (Jobseeker)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" /><span>پس از یافتن کار: RWR بدون آزمون بازار کار</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" /><span>مناسب برای دکتری، MINT، مدیران، پژوهشگران</span></li>
                </ul>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
              <p className="text-[11px] text-amber-200 leading-relaxed">
                <strong>منبع:</strong>{" "}
                <a href="https://www.migration.gv.at/en/types-of-immigration/permanent-immigration/red-white-red-card/" target="_blank" rel="noopener noreferrer" className="text-amber-300 underline hover:text-amber-200">
                  migration.gv.at — Rot-Weiß-Rot – Karte
                  <ExternalLink className="inline h-3 w-3 mr-0.5" />
                </a>
              </p>
            </div>
          </div>

          {/* --- جدول امتیازدهی --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-teal-400" /> 📊 جدول رسمی امتیازات (۵۵/۹۰)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              سیستم امتیازدهی برای مسیر ۵۵ امتیازی از ۹۰ امتیاز ساخته شده است. حداقل ۵۵ امتیاز برای
              مشاغل کمبود و سایر نیروهای کلیدی الزامی است. چهار دسته اصلی:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                { title: '۱. تحصیلات (حداکثر ۳۰)', items: ['تحصیلات عالی ۳ ساله: ۳۰ امتیاز', 'دیپلم دانشگاه: ۲۵ امتیاز', 'آموزش حرفه‌ای/مهارت ویژه: ۲۰ امتیاز'] },
                { title: '۲. سابقه کار (حداکثر ۲۰)', items: ['هر ۶ ماه: ۱ امتیاز', 'هر ۶ ماه در اتریش: ۲ امتیاز', 'حداکثر ۱۰ سال قابل محاسبه'] },
                { title: '۳. زبان (حداکثر ۱۵)', items: ['آلمانی A1: ۵ | A2: ۱۰ | B1: ۱۵', 'انگلیسی A2: ۵ | B1: ۱۰', 'فرانسوی/اسپانیایی/BSK B1: ۵'] },
                { title: '۴. سن (حداکثر ۱۵)', items: ['زیر ۳۰ سال: ۱۵ امتیاز', 'زیر ۴۰ سال: ۱۰ امتیاز', 'بالای ۴۰ سال: ۰ امتیاز'] },
              ].map((cat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-white mb-2">{cat.title}</div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-1.5">
                        <CheckCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/20">
              <p className="text-[11px] text-red-200 leading-relaxed">
                <strong>نکته حیاتی:</strong> اگر مدرک تحصیلی شما کمتر از ۳ سال است یا امتیاز کافی ندارید، مسیر
                «سایر نیروهای کلیدی» با حقوق €۳,۴۶۵ می‌تواند گزینه باشد. دفتر وین دیاکو امتیاز شما را دقیق محاسبه می‌کند.
              </p>
            </div>
          </div>

          {/* --- مشاغل کمبود --- */}
          <div id="shortage" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-teal-400" /> 💼 مشاغل دارای کمبود نیرو (Mangelberufe) ۲۰۲۶
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              لیست Mangelberufe هر ساله توسط وزارت کار اتریش به‌روزرسانی می‌شود. اگر شغل شما در این لیست باشد،
              مسیر ۵۵ امتیازی بدون آزمون بازار کار باز می‌شود. مهم‌ترین گروه‌های ۲۰۲۶:
            </p>
            <div className="space-y-2 mb-4">
              {shortageOccupations.map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs font-bold text-amber-300">{item.category}:</span>
                  <span className="text-[11px] text-slate-300 mr-2">{item.jobs}</span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
              <p className="text-[11px] text-amber-200 leading-relaxed">
                <strong>منبع:</strong>{" "}
                <a href="https://www.migration.gv.at/en/types-of-immigration/permanent-immigration/shortage-occupations/" target="_blank" rel="noopener noreferrer" className="text-amber-300 underline hover:text-amber-200">
                  لیست کامل Bundesweite Mangelberufe ۲۰۲۶
                  <ExternalLink className="inline h-3 w-3 mr-0.5" />
                </a>
              </p>
            </div>
          </div>

          {/* --- فرآیند --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-amber-400" /> 🚶 فرآیند درخواست گام‌به‌گام
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

          {/* --- مسیر اقامت دائم --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6 text-sky-400" /> 🔄 تمدید و مسیر اقامت دائم
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              RWR Card اولیه <strong>۲۴ ماه</strong> اعتبار دارد. پس از آن می‌توانید RWR Plus (۳ سال) دریافت کنید.
              پس از مجموع <strong>۵ سال</strong> اقامت قانونی، امکان درخواست Daueraufenthalt-EU فراهم می‌شود.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                <h3 className="text-xs font-bold text-emerald-200 mb-2">مرحله ۱: RWR Card</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">۲۴ ماه، وابسته به کارفرما، تغییر شغل نیاز به تأیید AMS</p>
              </div>
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/20">
                <h3 className="text-xs font-bold text-sky-200 mb-2">مرحله ۲: RWR Plus</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">۳ سال، آزادی تغییر کارفرما، دسترسی کامل به بازار کار</p>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-400/20">
                <h3 className="text-xs font-bold text-indigo-200 mb-2">مرحله ۳: Daueraufenthalt-EU</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">پس از ۵ سال + B1 آلمانی: اقامت دائم اتحادیه اروپا</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/20">
              <p className="text-[11px] text-sky-200 leading-relaxed">
                <strong>حضور فیزیکی:</strong> برای حفظ اقامت باید سالانه حداقل ۱۸۳ روز در اتریش حضور داشته باشید.
              </p>
            </div>
          </div>

          {/* --- نتیجه‌گیری --- */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-amber-400" /> 🎯 نتیجه‌گیری
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              کارت RWR اتریش با حداقل <strong className="text-white">۵۵ امتیاز از ۹۰</strong>، حقوق پایه
              <strong className="text-white"> €۳,۴۶۵</strong>، دسترسی به <strong>لیست مشاغل کمبود ۲۰۲۶</strong>
              و مسیر روشن به <strong>اقامت دائم ۵ ساله</strong>، یکی از جذاب‌ترین مسیرهای اقامت کاری در اروپاست.
              کلید موفقیت: <strong className="text-amber-300">محاسبه دقیق امتیاز</strong>، انتخاب مسیر مناسب و
              آماده‌سازی کامل مدارک. اگر مدرک یا سابقه شما با این آستانه‌ها همخوانی دارد، توصیه می‌کنیم
              از همین حالا پرونده خود را با کارشناسان دفتر وین دیاکو آماده کنید.
            </p>
          </div>
        </div>
      </article>

      {/* =====================  مزایا و معایب  ===================== */}
      <section id="pros-cons" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><TrendingUp className="h-4 w-4" /> ارزیابی صادقانه</span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">⚖️ مزایا و معایب کارت RWR اتریش</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-emerald-400/30 bg-emerald-500/5 p-6">
              <div className="flex items-center gap-2 mb-5">
                <ThumbsUp className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-emerald-300">✅ مزایا ({pros.length})</h3>
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
                <ThumbsDown className="h-5 w-5 text-red-400" />
                <h3 className="text-lg font-black text-red-300">❌ معایب ({cons.length})</h3>
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
        </div>
      </section>

      {/* =====================  نمونه ویزاها  ===================== */}
      <section id="samples" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><Award className="h-4 w-4" /> سابقه موفق</span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">🏆 نمونه کارت‌های RWR صادرشده هلدینگ دیاکو</h2>
            <p className="text-sm text-slate-400">نمونه‌ای از پرونده‌های موفق ۲۰۲۶ (با حفظ حریم خصوصی متقاضیان)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleVisas.map((v, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-amber-400/40 transition group">
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                  <img src={v.image} alt={v.alt} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition blur-[1.5px]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-[#061a21]/70 to-transparent" />
                  <div className="absolute top-3 right-3 rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-black text-white flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> صادر شد
                  </div>
                  <div className="absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-mono text-slate-300">{v.id}</div>
                  <div className="absolute bottom-3 right-3 left-3">
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider">Sample RWR Card</div>
                    <div className="text-sm font-black text-white">{v.type}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><div className="text-[10px] text-slate-500">متقاضی</div><div className="font-bold text-white">{v.name}</div></div>
                    <div><div className="text-[10px] text-slate-500">شهر</div><div className="font-bold text-white flex items-center gap-1"><MapPin className="h-3 w-3 text-amber-400" />{v.city}</div></div>
                    <div><div className="text-[10px] text-slate-500">تخصص</div><div className="font-bold text-white text-[10px]">{v.profile}</div></div>
                    <div><div className="text-[10px] text-slate-500">تاریخ</div><div className="font-bold text-amber-300 text-[10px]">{v.date}</div></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 text-center mt-4">* اطلاعات برای حفظ حریم خصوصی متقاضیان اصلاح شده است.</p>
        </div>
      </section>

      {/* =====================  نظرات تفصیلی  ===================== */}
      <section id="reviews" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><Star className="h-4 w-4" /> تجربه واقعی</span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">⭐ نظر دو متقاضی موفق دیاکو</h2>
            <p className="text-sm text-slate-400">داستان کامل همکاری با هلدینگ مهاجرتی دیاکو در دریافت کارت RWR</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailedTestimonials.map((t, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-amber-400/30 transition">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/50 shrink-0">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-black text-white">{t.name}</h3>
                      <span className="text-[9px] rounded-full bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-300 flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5" /> تأیید شده</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{t.role} — {t.company}</div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{t.city}</span><span>·</span>
                      <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{t.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {[0,1,2,3,4].map((s) => <Star key={s} className={`h-3 w-3 ${s < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />)}
                  </div>
                </div>
                <Quote className="h-6 w-6 text-amber-400/40 mb-2" />
                <blockquote className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4 text-justify">{t.text}</blockquote>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2 text-[11px]">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-slate-400">مسیر:</span>
                    <span className="font-bold text-amber-300">{t.scheme}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================  FAQ  ===================== */}
      <section id="faq" className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">❓ پرسش‌های متداول ۲۰۲۶</h2>
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

      {/* =====================  مقالات مرتبط  ===================== */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-center mb-6">📚 مقالات مرتبط</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {relatedArticles.map((r, i) => (
            <a key={i} href={r.href} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-amber-400/40 transition">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">{r.title}</h3>
                <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-amber-400 shrink-0 mt-0.5" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* =====================  CTA نهایی  ===================== */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-amber-400/5 to-transparent p-6 md:p-10 text-center">
          <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-black mb-2">🚀 آماده اخذ کارت RWR اتریش در ۲۰۲۶ هستید؟</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            فرم ارزیابی هوشمند دیاکو را تکمیل کنید. دفتر وین دیاکو امتیاز شما را محاسبه و مسیر بهینه را طراحی می‌کند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110">
              شروع ارزیابی رایگان RWR
            </button>
            <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold hover:bg-white/10 inline-flex items-center gap-2">
              <Copy className="h-4 w-4 text-amber-400" />
              {copiedPhone ? 'شماره کپی شد!' : 'دفتر وین: +43 688 976 3256'}
            </button>
          </div>
        </div>
      </section>

      {/* =====================  فوتر  ===================== */}
      <footer className="border-t border-white/10 bg-[#041418]">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3"><Award className="h-6 w-6 text-amber-400" /><span className="font-black">دیاکو</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">هلدینگ مهاجرتی دیاکو — خدمات تخصصی اقامت کاری در اتریش و اروپا.</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4" /><span>مشاوره تخصصی و شفاف</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#article" className="hover:text-amber-300">مقاله</a></li>
                <li><a href="#points" className="hover:text-amber-300">امتیازدهی</a></li>
                <li><a href="#shortage" className="hover:text-amber-300">مشاغل کمبود</a></li>
                <li><a href="#pros-cons" className="hover:text-amber-300">مزایا و معایب</a></li>
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
              <h4 className="font-bold mb-3">شبکه‌های اجتماعی</h4>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <a href="https://instagram.com" className="hover:text-amber-300" aria-label="اینستاگرام">اینستاگرام</a>
                <a href="https://wa.me/436889763256" className="hover:text-amber-300" aria-label="واتساپ">واتساپ</a>
                <a href="https://t.me" className="hover:text-amber-300" aria-label="تلگرام">تلگرام</a>
              </div>
              <p className="text-[10px] text-slate-500 mt-4">© ۲۰۲۶ دیاکو. تمامی حقوق محفوظ است.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ---------- نوار CTA شناور موبایل ---------- */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#061a21]/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-2">
        <button type="button" onClick={onOpenAssessment} className="flex-1 rounded-xl bg-[#f5a623] py-2.5 text-xs font-black text-[#082833]">ارزیابی رایگان</button>
        <button type="button" onClick={handleCopyPhone} className="rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-xs font-bold inline-flex items-center gap-1.5">
          <PhoneCall className="h-4 w-4 text-emerald-400" /> تماس
        </button>
      </div>
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default AustriaRwrCardPage;