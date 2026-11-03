import React, { useState, useMemo } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Copy, Sparkles, ArrowLeft,
  AlertTriangle, CalendarDays, Menu, X, Star, Quote, MapPin, Clock,
  Users, Info, Globe, Plane, Briefcase, GraduationCap, Award, Search,
  Calculator, TrendingUp, ExternalLink, ShieldCheck, BookOpen, FileCheck2,
  ThumbsUp, ThumbsDown, FileWarning, Languages, Euro, Wallet, Building2,
  Rocket, Landmark, Target, Lightbulb, Handshake, BarChart3, Scale,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ---------- داده‌های ساختاریافته ۲۰۲۶ ---------- */
const keyFigures = [
  { icon: Euro, label: '€۳۰,۰۰۰', sub: 'حداقل سرمایه اولیه' },
  { icon: Award, label: '۵۰ / ۸۵', sub: 'حداقل امتیاز FFG' },
  { icon: Clock, label: '۲ سال', sub: 'اعتبار کارت اولیه' },
  { icon: Plane, label: '۵ سال', sub: 'مسیر تا اقامت دائم' },
];

const requirements = [
  { icon: Lightbulb, title: 'ایده نوآورانه', desc: 'محصول یا خدمت با ارزش افزوده بالا — نه کپی از کسب‌وکار موجود' },
  { icon: Euro, title: 'سرمایه €۳۰,۰۰۰', desc: 'حداقل نیمی (€۱۵,۰۰۰) به‌صورت نقدی و قابل اثبات' },
  { icon: FileCheck2, title: 'بیزینس پلن استاندارد WKO', desc: 'مطابق فرمت اتاق بازرگانی اتریش (Wirtschaftskammer Österreich)' },
  { icon: Handshake, title: 'پشتیبانی انکوباتور', desc: 'INiTS، accent، tech2b یا سایر شتاب‌دهنده‌های معتبر اتریشی' },
  { icon: Languages, title: 'زبان انگلیسی یا آلمانی', desc: 'IELTS 6+ یا Goethe/ÖSD A2+ برای کسب امتیاز' },
  { icon: ShieldCheck, title: 'بیمه درمانی', desc: 'پوشش حداقل €۳۰,۰۰۰ در تمام اتریش' },
];

const processSteps = [
  { step: '۱', title: 'ایده و بازارسنجی', detail: 'طراحی محصول/خدمت نوآورانه، تحلیل بازار اتریش/اروپا و مزیت رقابتی.', time: '۱–۲ ماه' },
  { step: '۲', title: 'نگارش بیزینس پلن WKO', detail: 'تدوین طرح تجاری مطابق فرمت رسمی اتاق بازرگانی اتریش با پیش‌بینی مالی ۳ ساله.', time: '۱–۲ ماه' },
  { step: '۳', title: 'ارزیابی FFG', detail: 'ارسال بیزینس پلن به آژانس ارتقای تحقیقات اتریش (FFG) و کسب حداقل ۵۰ از ۸۵ امتیاز.', time: '۴–۸ هفته' },
  { step: '۴', title: 'پذیرش انکوباتور', detail: 'جلب حمایت رسمی یک انکوباتور/شتاب‌دهنده معتبر (INiTS، accent، tech2b یا مشابه).', time: '۲–۴ هفته' },
  { step: '۵', title: 'ثبت درخواست در MA35/سفارت', detail: 'ثبت RWR Card موسسان + پرداخت هزینه + ارائه مدارک کامل.', time: '۱ روز' },
  { step: '۶', title: 'دریافت ویزای D و ورود', detail: 'پس از تأیید، ویزای D صادر می‌شود و ظرف ۳ ماه وارد اتریش شوید.', time: '۴–۸ هفته' },
  { step: '۷', title: 'ثبت شرکت و دریافت کارت', detail: 'ثبت GmbH در Handelsregister، دریافت NIE/Steuernummer و کارت RWR ۲ ساله.', time: '۲–۴ هفته' },
];

const pros = [
  { title: 'اقامت ۲ ساله برای بنیان‌گذار', desc: 'با امکان تمدید به RWR Plus' },
  { title: 'حق کار کامل برای همسر', desc: 'RWR Plus بدون نیاز به تأیید AMS' },
  { title: 'مسیر روشن به اقامت دائم', desc: 'پس از ۵ سال اقامت قانونی + B1 آلمانی' },
  { title: 'دسترسی به بازار ۴۵۰ میلیون نفری اتحادیه اروپا', desc: 'از طریق ثبت شرکت در اتریش' },
  { title: 'اکوسیستم استارت‌آپ قوی در وین', desc: 'INiTS، accent، Tech2b، aws و شبکه سرمایه‌گذاران' },
  { title: 'مالیات شرکتی ۲۵٪', desc: 'یکی از پایین‌ترین نرخ‌های مالیات شرکتی در اروپا' },
  { title: 'دسترسی به بودجه‌های تحقیقاتی EU', desc: 'Horizon Europe، Erasmus+، aws و FFG grants' },
  { title: 'زندگی در وین — بهترین شهر جهان', desc: 'کیفیت زندگی بالا برای ۱۰ سال متوالی' },
];

const cons = [
  { title: 'ارزیابی سختگیرانه FFG', desc: 'حداقل ۵۰ از ۸۵ امتیاز — ایده باید واقعاً نوآورانه باشد' },
  { title: 'سرمایه حداقلی €۳۰,۰۰۰', desc: 'با تأکید بر نیمی نقدی — مانع بزرگ برای برخی متقاضیان' },
  { title: 'نیاز به پشتیبانی انکوباتور', desc: 'بدون تأییدیه انکوباتور معتبر، پرونده معمولاً رد می‌شود' },
  { title: 'زمان پردازش MA35 طولانی', desc: 'میانگین ۳۲۴ روز در ۲۰۲۴ (با وکیل کمتر)' },
  { title: 'تعهد به ایجاد شغل در اتریش', desc: 'پس از ۲ سال باید حداقل ۲ شغل ایجاد کرده باشید' },
  { title: 'محدودیت‌های تجاری', desc: 'برخی مشاغل نیازمند مجوز Gewerbeberechtigung هستند' },
  { title: 'بوروکراسی و زبان آلمانی', desc: 'برای امور اداری و مالیاتی، آلمانی مزیت بزرگی است' },
];

const sampleVisas = [
  {
    id: 'AT-SU-2026-0215',
    name: 'A.R.',
    city: 'وین',
    date: 'فوریه ۲۰۲۶',
    profile: 'استارت‌آپ SaaS — B2B Analytics',
    type: 'Startup Founders RWR',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه کارت استارت‌آپ اتریش — وین',
  },
  {
    id: 'AT-SU-2026-0330',
    name: 'S.N.',
    city: 'گراتس',
    date: 'مارس ۲۰۲۶',
    profile: 'استارت‌آپ HealthTech — AI Diagnostics',
    type: 'Startup Founders RWR',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه کارت استارت‌آپ اتریش — گراتس',
  },
  {
    id: 'AT-SU-2026-0512',
    name: 'M.K.',
    city: 'لینتس',
    date: 'مه ۲۰۲۶',
    profile: 'استارت‌آپ GreenTech — Clean Energy',
    type: 'Startup Founders RWR',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه کارت استارت‌آپ اتریش — لینتس',
  },
];

const detailedTestimonials = [
  {
    name: 'آرش رضایی',
    role: 'بنیان‌گذار SaaS B2B',
    company: 'DataSense GmbH',
    city: 'وین',
    date: 'فوریه ۲۰۲۶',
    scheme: 'Startup Founders RWR → RWR Plus',
    rating: 5,
    text: 'من با یک ایده SaaS برای تحلیل داده‌های B2B وارد فرآیند شدم. چالش اصلی من ارزیابی FFG بود — بیزینس پلن اولم رد شد چون «نوآوری کافی» نداشت. دیاکو با تیم فنی من جلسه گذاشت و بیزینس پلن را بازنویسی کرد: تمرکز بر الگوریتم اختصاصی و پیش‌بینی تقاضا با AI. بیزینس پلن دوم ۶۲ امتیاز از ۸۵ گرفت. سپس دیاکو با INiTS هماهنگ کرد و پذیرش گرفتیم. سرمایه اولیه من €۳۵,۰۰۰ بود (€۲۰,۰۰۰ نقدی + €۱۵,۰۰۰ تجهیزات). کل فرآیند از ایده تا دریافت کارت، ۷ ماه طول کشید. همسرم RWR Plus گرفت و توانست در یک شرکت اتریشی مشغول شود. الان شرکت ما ۳ کارمند تمام‌وقت دارد.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'نگار موسوی',
    role: 'بنیان‌گذار HealthTech',
    company: 'MediScan AI GmbH',
    city: 'گراتس',
    date: 'مارس ۲۰۲۶',
    scheme: 'Startup Founders RWR → RWR Plus',
    rating: 5,
    text: 'من با تخصص AI در تشخیص پزشکی وارد فرآیند شدم. امتیاز FFG من ۷۱ از ۸۵ بود (مدرک دکتری + ۸ سال سابقه + انگلیسی IELTS 7 + سرمایه €۴۰,۰۰۰). دیاکو با انکوباتور accent در گراتس هماهنگ کرد و ما پذیرش گرفتیم. نکته مهم: پس از ۲ سال، باید ثابت کنیم حداقل ۲ شغل ایجاد کرده‌ایم — دیاکو از ابتدا برنامه استخدام را در بیزینس پلن گنجاند. الان شرکت ما ۴ کارمند دارد و در حال جذب سرمایه Series A است. یکی از مزایای بزرگ اتریش این بود که توانستیم از بودجه aws (آژانس ارتقای اقتصاد اتریش) برای تحقیق و توسعه استفاده کنیم.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

const faqs = [
  { q: 'حداقل سرمایه برای استارت‌آپ اتریش چقدر است؟', a: 'حداقل سرمایه اولیه قانونی €۳۰,۰۰۰ است که دست‌کم نیمی از آن (€۱۵,۰۰۰) باید سرمایه نقدی و قابل اثبات باشد. مابقی می‌تواند شامل تجهیزات، ارزش دفتری دارایی‌ها یا سرمایه غیرنقدی باشد. سرمایه باید به یک حساب بانکی اتریشی واریز شود.' },
  { q: 'آیا برای استارت‌آپ اتریش مدرک زبان آلمانی اجباری است؟', a: 'خیر، مدرک آلمانی اجباری نیست. IELTS 6+ یا TOEFL معادل، برای کسب امتیاز کافی است. اما برای امور اداری (ثبت شرکت، مالیات، ارتباط با مشتریان محلی)، آلمانی A2 یا B1 مزیت بزرگی محسوب می‌شود.' },
  { q: 'فرآیند ارزیابی FFG چقدر طول می‌کشد؟', a: 'به‌طور معمول ۴ تا ۸ هفته از زمان تکمیل مدارک. FFG بیزینس پلن را از نظر نوآوری، تیم، بازار و مدل درآمدی ارزیابی می‌کند. حداقل امتیاز قبولی ۵۰ از ۸۵ است.' },
  { q: 'آیا همسر و فرزندان اجازه کار دارند؟', a: 'بله. همسر و فرزندان زیر ۱۸ سال همزمان با متقاضی اصلی، RWR Plus دریافت می‌کنند که اجازه کار نامحدود در تمام اتریش را بدون نیاز به تأیید AMS می‌دهد. فرزندان از تحصیل رایگان در مدارس دولتی بهره‌مند می‌شوند.' },
  { q: 'چه تفاوتی بین RWR Card استارت‌آپ و RWR Card عادی وجود دارد؟', a: 'کارت استارت‌آپ مخصوص بنیان‌گذاران است و از طریق ارزیابی FFG (نه آزمون بازار کار) صادر می‌شود. نیازمند ایده نوآورانه، بیزینس پلن و پشتیبانی انکوباتور است. برخلاف RWR عادی، برای تغییر کارفرما در ۲ سال اول آزادتر است اما نیاز به ایجاد شغل در اتریش دارد.' },
  { q: 'پس از ۲ سال چه اتفاقی می‌افتد؟', a: 'پس از ۲ سال، باید ثابت کنید حداقل ۲ شغل تمام‌وقت ایجاد کرده‌اید و شرکت فعال است. سپس می‌توانید برای RWR Plus (۳ سال) درخواست دهید. پس از مجموع ۵ سال اقامت قانونی، امکان Daueraufenthalt-EU فراهم می‌شود.' },
  { q: 'آیا امکان دریافت بودجه از دولت اتریش وجود دارد؟', a: 'بله. پس از ثبت شرکت در اتریش، می‌توانید از بودجه‌های aws (Austria Wirtschaftsservice)، FFG، Horizon Europe و برنامه‌های استانی (مثل Vienna Business Agency) استفاده کنید. برخی از این بودجه‌ها تا ۵۰٪ هزینه‌های R&D را پوشش می‌دهند.' },
  { q: 'مالیات شرکت در اتریش چقدر است؟', a: 'مالیات شرکتی (Körperschaftsteuer) ۲۵٪ است که یکی از پایین‌ترین نرخ‌های اروپاست. مالیات بر درآمد شخصی تصاعدی از ۰٪ تا ۵۵٪ است. اگر در Forschung & Entwicklung (R&D) فعالیت کنید، مشوق‌های مالیاتی قابل توجهی وجود دارد.' },
  { q: 'چه انکوباتورهایی در اتریش معتبر هستند؟', a: 'INiTS (وین)، accent (گراتس)، tech2b (لینتس)، aws First (سراسری)، Vienna Business Agency (وین) و Impact Hub Vienna. برای پرونده RWR استارت‌آپ، پذیرش رسمی از یکی از این انکوباتورها تقریباً الزامی است.' },
];

const relatedArticles = [
  { title: 'کارت RWR اتریش (متخصصان)', href: '/guides/austria-rwr', desc: '۵۵ امتیاز + حقوق €۳,۴۶۵' },
  { title: 'ویزای جستجوی کار اتریش ۲۰۲۷', href: '/guides/jobseeker-austria-2027', desc: '۷۰ امتیاز + قانون ماندن' },
  { title: 'اقامت تمکن مالی اتریش', href: '/guides/financial-austria', desc: '€۲,۶۱۶/ماه + سهمیه محدود' },
];

export const StartupAustriaPage: React.FC<Props> = ({ onBackToHome, onOpenAssessment }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ماشین‌حساب امتیاز
  const [educationLevel, setEducationLevel] = useState<'masters' | 'bachelor' | 'diploma'>('masters');
  const [workExperience, setWorkExperience] = useState(5);
  const [languageEnglish, setLanguageEnglish] = useState(true);
  const [languageGerman, setLanguageGerman] = useState(false);
  const [capitalAvailable, setCapitalAvailable] = useState(true);

  const pointsScore = useMemo(() => {
    let p = 0;
    if (educationLevel === 'masters') p += 30;
    else if (educationLevel === 'bachelor') p += 20;
    else p += 10;
    if (workExperience >= 5) p += 20;
    else if (workExperience >= 2) p += 10;
    if (languageEnglish) p += 10;
    if (languageGerman) p += 10;
    if (capitalAvailable) p += 15;
    return p;
  }, [educationLevel, workExperience, languageEnglish, languageGerman, capitalAvailable]);

  useSeo({
    title: 'ویزای استارت‌آپ اتریش ۲۰۲۶ | Startup Founders RWR + FFG + €۳۰,۰۰۰',
    description:
      'راهنمای کامل ویزای استارت‌آپ اتریش ۲۰۲۶: سرمایه اولیه €۳۰,۰۰۰، ارزیابی FFG با حداقل ۵۰/۸۵ امتیاز، بیزینس پلن WKO، پذیرش انکوباتور (INiTS، accent، tech2b)، RWR Card ۲ ساله، حق کار همسر و مسیر ۵ ساله تا اقامت دائم. مشاوره دفتر وین دیاکو.',
    canonical: '/guides/startup-austria',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای استارت‌آپ اتریش ۲۰۲۶', 'Austria Startup Visa',
      'کارت قرمز سفید قرمز استارت‌آپ', 'تاییدیه FFG اتریش',
      'انکوباتورهای وین INiTS', 'سرمایه‌گذاری استارت‌آپ اتریش',
      'Startup Founders RWR Card', 'RWR Plus استارت‌آپ', 'دفتر وین دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/startup-austria#article',
          headline: 'راهنمای جامع ویزای استارت‌آپ اتریش ۲۰۲۶: Startup Founders RWR، FFG و مسیر اقامت دائم',
          description: 'بررسی کامل کارت RWR موسسان تحت NAG §41: سرمایه €۳۰,۰۰۰، ارزیابی FFG (۵۰/۸۵)، بیزینس پلن WKO، پذیرش انکوباتور، حق کار همسر و مسیر ۵ ساله تا Daueraufenthalt-EU.',
          image: ['https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80'],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' } },
          datePublished: '2026-01-01', dateModified: '2026-10-30', inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Startup Founders RWR Card Austria' },
            { '@type': 'Thing', name: 'FFG Austria' },
            { '@type': 'Thing', name: 'NAG §41' },
          ],
        },
        {
          '@type': 'HowTo',
          name: 'مراحل دریافت کارت RWR استارت‌آپ اتریش',
          totalTime: 'P9M',
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
            { '@type': 'ListItem', position: 2, name: 'استارت‌آپ و کارآفرینی', item: 'https://www.dia-co.ir/startup' },
            { '@type': 'ListItem', position: 3, name: 'اتریش', item: 'https://www.dia-co.ir/guides/startup-austria' },
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
              <Rocket className="h-7 w-7 text-amber-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-5 text-sm font-bold text-slate-200">
              <a href="#article" className="hover:text-amber-300 transition">مقاله</a>
              <a href="#calculator" className="hover:text-amber-300 transition">امتیازسنج</a>
              <a href="#requirements" className="hover:text-amber-300 transition">شرایط</a>
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
              <a href="#calculator" className="block hover:text-amber-300">امتیازسنج</a>
              <a href="#requirements" className="block hover:text-amber-300">شرایط</a>
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
            <span>استارت‌آپ و کارآفرینی</span><span>/</span>
            <span className="text-amber-300 font-bold">اتریش</span>
          </div>
        </div>
      </div>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <Sparkles className="h-4 w-4" /> NAG §41 — Startup Founders RWR Card ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              ویزای استارت‌آپ اتریش ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-yellow-500">
                (Startup Founders RWR Card)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              🚀 برنامه موسسان استارت‌آپ اتریش فرصتی بی‌نظیر برای پیاده‌سازی محصولات و خدمات نوآورانه در یکی از
              باکیفیت‌ترین پایتخت‌های جهان است. با <strong className="text-amber-300">سرمایه اولیه €۳۰,۰۰۰</strong>،
              <strong className="text-amber-300"> حداقل ۵۰ امتیاز از ۸۵</strong> در ارزیابی FFG و پذیرش یک انکوباتور
              معتبر، کارت اقامت <strong className="text-amber-300">۲ ساله RWR</strong> دریافت می‌کنید.
              وکلای مقیم وین دیاکو از نگارش بیزینس پلن تا تحویل کارت اقامت همراه شما هستند.
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
                ارزیابی ایده و امتیاز FFG
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
                alt="وین، اتریش — اکوسیستم استارت‌آپ و Startup Founders RWR" width={1000} height={750}
                loading="eager" decoding="async" fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300"><MapPin className="h-4 w-4" /> وین — دفتر رسمی دیاکو</div>
                <p className="text-[11px] text-slate-300 mt-1">Ausstellungsstraße 50, 1020 Wien — پشتیبانی مستقیم MA35</p>
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
                <li>• سرمایه اولیه: <strong className="text-white">€۳۰,۰۰۰</strong> (نیمی نقدی)</li>
                <li>• حداقل امتیاز FFG: <strong className="text-white">۵۰ / ۸۵</strong></li>
                <li>• اعتبار کارت اولیه: <strong className="text-white">۲ سال</strong></li>
                <li>• حق کار همسر: <strong className="text-emerald-300">بله (RWR Plus)</strong></li>
                <li>• مسیر اقامت دائم: <strong className="text-white">۵ سال</strong></li>
                <li>• زبان: <strong className="text-white">انگلیسی کافی است</strong></li>
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
            <h2 className="text-2xl md:text-3xl font-black mb-4">ویزای استارت‌آپ اتریش چیست و برای چه کسانی مناسب است؟</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              🚀 <strong className="text-white">کارت RWR موسسان استارت‌آپ (Startup Founders RWR Card)</strong> یکی از
              مسیرهای ویژه اقامت کاری در اتریش است که تحت <strong className="text-white">NAG §41</strong> صادر می‌شود.
              این ویزا به بنیان‌گذاران استارت‌آپ‌های نوآورانه اجازه می‌دهد تا شرکت خود را در اتریش ثبت کنند و
              <strong className="text-white"> اقامت ۲ ساله</strong> با حق کار کامل دریافت کنند.
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              ✨ اتریش به‌ویژه وین، یکی از قوی‌ترین اکوسیستم‌های استارت‌آپ در اروپای مرکزی را دارد:
            </p>
            <ul className="space-y-2 text-sm text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>دسترسی به بازار ۴۵۰ میلیون نفری اتحادیه اروپا؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>مالیات شرکتی ۲۵٪ — یکی از پایین‌ترین نرخ‌های اروپا؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>دسترسی به بودجه‌های aws، FFG و Horizon Europe؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>شبکه انکوباتورهای معتبر: INiTS، accent، tech2b، aws First؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>زندگی در وین — بهترین شهر جهان برای ۱۰ سال متوالی (Mercur.</span></li>
            </ul>
          </div>

          {/* --- چارچوب حقوقی --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Scale className="h-6 w-6 text-amber-400" /> ⚖️ چارچوب حقوقی: NAG §41 و شرایط کلیدی
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              طبق NAG §41، متقاضی کارت RWR موسسان استارت‌آپ باید سه شرط اصلی را برآورده کند:
            </p>
            <div className="space-y-3 mb-4">
              {[
                { n: '۱', t: 'ایده نوآورانه و بیزینس پلن', d: 'محصول یا خدمت با ارزش افزوده بالا — نباید صرفاً کپی از کسب‌وکار موجود باشد. بیزینس پلن باید مطابق فرمت رسمی WKO باشد.' },
                { n: '۲', t: 'سرمایه اولیه €۳۰,۰۰۰', d: 'حداقل نیمی از سرمایه (€۱۵,۰۰۰) باید نقدی و قابل اثبات باشد. مابقی می‌تواند تجهیزات، دارایی یا سرمایه غیرنقدی باشد.' },
                { n: '۳', t: 'ارزیابی FFG (حداقل ۵۰ از ۸۵)', d: 'آژانس ارتقای تحقیقات اتریش (FFG) بیزینس پلن را از نظر نوآوری، تیم، بازار و مدل درآمدی ارزیابی می‌کند.' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-400 text-[#082833] grid place-items-center text-xs font-black">{item.n}</span>
                  <div>
                    <div className="text-xs font-bold text-white mb-1">{item.t}</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/20">
              <p className="text-[11px] text-red-200 leading-relaxed">
                🚨 <strong>هشدار حقوقی:</strong> صرف داشتن سرمایه کافی، تضمین‌کننده تأیید پرونده نیست. FFG ایده را
                از نظر <strong>نوآوری واقعی، پتانسیل رشد و تیم اجرایی</strong> ارزیابی می‌کند. بیزینس پلن‌های «کپی‌برداری» از
                کسب‌وکارهای موجود یا ایده‌های اثبات‌نشده، معمولاً رد می‌شوند.
              </p>
            </div>
          </div>

          {/* --- شرایط لازم --- */}
          <div id="requirements" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <FileCheck2 className="h-6 w-6 text-teal-400" /> 📋 شرایط لازم و مدارک
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {requirements.map((req, i) => {
                const Icon = req.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <Icon className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white mb-1">{req.title}</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed">{req.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- فرآیند --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-amber-400" /> 🚶 فرآیند درخواست گام‌به‌گام
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              ⏱️ کل فرآیند از ایده تا دریافت کارت اقامت معمولاً بین <strong>۶ تا ۹ ماه</strong> طول می‌کشد.
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

          {/* --- مسیر اقامت دائم --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6 text-sky-400" /> 🔄 تمدید و مسیر اقامت دائم
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              RWR Card اولیه <strong>۲۴ ماه</strong> اعتبار دارد. برای تمدید، باید ثابت کنید شرکت فعال است و
              <strong className="text-amber-300"> حداقل ۲ شغل تمام‌وقت</strong> در اتریش ایجاد کرده‌اید. پس از آن
              RWR Plus (۳ سال) و سپس Daueraufenthalt-EU را دریافت می‌کنید.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                <h3 className="text-xs font-bold text-emerald-200 mb-2">مرحله ۱: RWR Card</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">۲ سال، بنیان‌گذار، نیازمند اثبات ایجاد ۲ شغل برای تمدید</p>
              </div>
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/20">
                <h3 className="text-xs font-bold text-sky-200 mb-2">مرحله ۲: RWR Plus</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">۳ سال، آزادی تغییر شغل، دسترسی کامل به بازار کار</p>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-400/20">
                <h3 className="text-xs font-bold text-indigo-200 mb-2">مرحله ۳: Daueraufenthalt-EU</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">پس از ۵ سال + B1 آلمانی: اقامت دائم اتحادیه اروپا</p>
              </div>
            </div>
          </div>

          {/* --- بودجه و مالیات --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-indigo-400" /> 💰 بودجه، مالیات و مزایای دولتی
            </h2>
            <ul className="space-y-2 text-xs text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">مالیات شرکتی (Körperschaftsteuer):</strong> ۲۵٪ — یکی از پایین‌ترین نرخ‌های اروپا.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">بودجه aws (Austria Wirtschaftsservice):</strong> تا ۵۰٪ هزینه‌های R&D قابل بازپرداخت.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">Horizon Europe:</strong> دسترسی به بودجه‌های تحقیقاتی اتحادیه اروپا.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">Forschungsprämie:</strong> ۱۴٪ اعتبار مالیاتی برای هزینه‌های تحقیق و توسعه.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong className="text-white">Vienna Business Agency:</strong> کمک‌هزینه‌های اجاره دفتر و تجهیزات برای استارت‌آپ‌های مستقر در وین.</span></li>
            </ul>
          </div>

          {/* --- نتیجه‌گیری --- */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-amber-400" /> 🎯 نتیجه‌گیری
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              ویزای استارت‌آپ اتریش با <strong className="text-white">سرمایه €۳۰,۰۰۰</strong>،
              <strong className="text-white"> حداقل ۵۰ امتیاز FFG</strong>، دسترسی به
              <strong className="text-white"> اکوسیستم قوی استارت‌آپ وین</strong> و مسیر روشن به
              <strong className="text-white"> اقامت دائم ۵ ساله</strong>، یکی از جذاب‌ترین مسیرهای
              کارآفرینی در اروپاست. کلید موفقیت: <strong className="text-amber-300">ایده واقعاً نوآورانه</strong>،
              <strong className="text-amber-300"> بیزینس پلن قوی</strong> و <strong className="text-amber-300">پشتیبانی
              یک انکوباتور معتبر</strong> است. اگر ایده استارت‌آپی دارید و می‌خواهید آن را در اروپا اجرا کنید،
              توصیه می‌کنیم از همین حالا پرونده خود را با کارشناسان دفتر وین دیاکو آماده کنید.
            </p>
          </div>
        </div>
      </article>

      {/* =====================  ماشین‌حساب امتیاز  ===================== */}
      <section id="calculator" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
            <div>
              <span className="text-[11px] font-black text-amber-300">سیستم امتیازدهی رسمی اتریش</span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">🧮 محاسبه‌گر امتیاز FFG استارت‌آپ</h2>
              <p className="text-xs text-slate-300 mt-1">حداقل ۵۰ امتیاز از ۸۵ امتیاز برای تایید FFG الزامی است</p>
            </div>
            <div className={`rounded-2xl border px-4 py-2 ${pointsScore >= 50 ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-amber-400/40 bg-amber-400/10'}`}>
              <span className="text-xs font-bold text-slate-300">امتیاز شما: </span>
              <span className={`text-2xl font-black ${pointsScore >= 50 ? 'text-emerald-400' : 'text-amber-300'}`}>{pointsScore} / ۸۵</span>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">مدرک تحصیلی:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'masters', label: 'ارشد/دکتری (۳۰)' },
                    { id: 'bachelor', label: 'کارشناسی (۲۰)' },
                    { id: 'diploma', label: 'دیپلم/فنی (۱۰)' },
                  ].map((m) => (
                    <button key={m.id} type="button" onClick={() => setEducationLevel(m.id as any)}
                      className={`rounded-xl py-2 text-[11px] font-bold transition ${educationLevel === m.id ? 'bg-amber-400 text-slate-900' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">سابقه کاری مرتبط: {workExperience} سال</label>
                <input type="range" min="1" max="10" value={workExperience}
                  onChange={(e) => setWorkExperience(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition">
                <input type="checkbox" checked={languageEnglish} onChange={(e) => setLanguageEnglish(e.target.checked)} className="rounded text-amber-400 focus:ring-amber-400" />
                <span className="text-xs text-slate-200">انگلیسی (IELTS 6+ یا TOEFL) — ۱۰ امتیاز</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition">
                <input type="checkbox" checked={languageGerman} onChange={(e) => setLanguageGerman(e.target.checked)} className="rounded text-amber-400 focus:ring-amber-400" />
                <span className="text-xs text-slate-200">آلمانی (A2 یا B1+) — ۱۰ امتیاز</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition">
                <input type="checkbox" checked={capitalAvailable} onChange={(e) => setCapitalAvailable(e.target.checked)} className="rounded text-amber-400 focus:ring-amber-400" />
                <span className="text-xs text-slate-200">سرمایه €۳۰,۰۰۰ — ۱۵ امتیاز</span>
              </label>
            </div>
          </div>
          <div className={`mt-6 p-3 rounded-xl text-center text-xs font-bold ${pointsScore >= 50 ? 'bg-emerald-500/10 border border-emerald-400/30 text-emerald-300' : 'bg-amber-500/10 border border-amber-400/30 text-amber-300'}`}>
            {pointsScore >= 50 ? '✅ شما حداقل امتیاز لازم برای FFG را دارید — می‌توانید وارد مرحله ارزیابی ایده شوید.' : '⚠️ امتیاز شما کمتر از ۵۰ است — با تقویت مدرک، سابقه یا زبان قابل جبران است.'}
          </div>
        </div>
      </section>

      {/* =====================  مزایا و معایب  ===================== */}
      <section id="pros-cons" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><TrendingUp className="h-4 w-4" /> ارزیابی صادقانه</span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">⚖️ مزایا و معایب ویزای استارت‌آپ اتریش</h2>
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
            <h2 className="text-2xl md:text-3xl font-black mb-2">🏆 نمونه کارت‌های استارت‌آپ صادرشده هلدینگ دیاکو</h2>
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
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider">Sample Startup RWR Card</div>
                    <div className="text-sm font-black text-white">{v.type}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><div className="text-[10px] text-slate-500">بنیان‌گذار</div><div className="font-bold text-white">{v.name}</div></div>
                    <div><div className="text-[10px] text-slate-500">شهر</div><div className="font-bold text-white flex items-center gap-1"><MapPin className="h-3 w-3 text-amber-400" />{v.city}</div></div>
                    <div><div className="text-[10px] text-slate-500">حوزه</div><div className="font-bold text-white text-[10px]">{v.profile}</div></div>
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
            <h2 className="text-2xl md:text-3xl font-black mb-2">⭐ نظر دو بنیان‌گذار موفق دیاکو</h2>
            <p className="text-sm text-slate-400">داستان کامل همکاری با هلدینگ مهاجرتی دیاکو در دریافت ویزای استارت‌آپ</p>
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
          <h2 className="text-xl md:text-2xl font-black mb-2">🚀 آماده اجرای ایده استارت‌آپ خود در اتریش هستید؟</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            فرم ارزیابی هوشمند دیاکو را تکمیل کنید. دفتر وین دیاکو ایده شما را از نظر نوآوری و پتانسیل ارزیابی
            می‌کند و مسیر موفقیت در FFG را طراحی می‌کند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110">
              شروع ارزیابی ایده استارت‌آپ
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
              <div className="flex items-center gap-2 mb-3"><Rocket className="h-6 w-6 text-amber-400" /><span className="font-black">دیاکو</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">هلدینگ مهاجرتی دیاکو — خدمات تخصصی استارت‌آپ ویزا و کارآفرینی در اتریش.</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4" /><span>مشاوره تخصصی و شفاف</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#article" className="hover:text-amber-300">مقاله</a></li>
                <li><a href="#calculator" className="hover:text-amber-300">امتیازسنج</a></li>
                <li><a href="#requirements" className="hover:text-amber-300">شرایط</a></li>
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

export default StartupAustriaPage;