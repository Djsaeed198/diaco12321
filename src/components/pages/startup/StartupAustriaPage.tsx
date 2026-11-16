import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  PhoneCall,
  Copy,
  Sparkles,
  ArrowLeft,
  AlertTriangle,
  CalendarDays,
  Menu,
  X,
  Star,
  Quote,
  MapPin,
  Clock,
  Users,
  Info,
  Globe,
  Plane,
  Briefcase,
  Award,
  Calculator,
  TrendingUp,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  FileCheck2,
  ThumbsUp,
  ThumbsDown,
  Languages,
  Euro,
  Rocket,
  Lightbulb,
  Handshake,
  BarChart3,
  Scale,
  AlertCircle,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';
import type { PageType } from '../../Header';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: PageType) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

/* ---------- داده‌های ساختاریافته ۲۰۲۶ مطابق مرجع رسمی migration.gv.at و AWS ---------- */
const keyFigures = [
  { icon: Euro, label: '€۵۰,۰۰۰', sub: 'حداقل سرمایه ثبتی شرکت' },
  { icon: Award, label: '۵۰ / ۸۵', sub: 'حداقل امتیاز قبولی' },
  { icon: Clock, label: '۲ سال', sub: 'اعتبار کارت RWR اولیه' },
  { icon: Plane, label: '۵ سال', sub: 'اقامت دائم اتحادیه اروپا' },
];

const requirements = [
  {
    icon: Lightbulb,
    title: '۱. ارائه محصول یا خدمت نوآورانه (Innovation)',
    desc: 'ایده باید دارای فناوری جدید، مدل کسب‌وکار خلاقانه یا ارزش افزوده مشخص برای اقتصاد اتریش باشد (رستوران، فروشگاه سنتی یا بازرگانی ساده مشمول این ویزا نمی‌شود).',
  },
  {
    icon: Euro,
    title: '۲. سرمایه اولیه حداقل ۵۰,۰۰۰ یورو',
    desc: 'شرکت ثبت‌شده در اتریش (GmbH یا ساختار جدید FlexKapG) باید حداقل ۵۰,۰۰۰ یورو سرمایه داشته باشد که دست‌کم ۵۰ درصد آن توسط بنیان‌گذار تامین شده باشد.',
  },
  {
    icon: Briefcase,
    title: '۳. نقش مدیریتی مؤثر (Controlling Influence)',
    desc: 'متقاضی باید حداقل ۵۰ درصد سهام شرکت را در اختیار داشته باشد و به عنوان مدیرعامل (Geschäftsführer) نقش کلیدی در تصمیم‌گیری‌ها ایفا کند.',
  },
  {
    icon: Award,
    title: '۴. کسب حداقل ۵۰ امتیاز از ۸۵ امتیاز',
    desc: 'بر اساس تحصیلات (به‌ویژه STEM)، سابقه کار مرتبط، مهارت زبان آلمانی یا انگلیسی، سن و سرمایه/شتاب‌دهنده حداقل ۵۰ امتیاز کسب شود.',
  },
  {
    icon: FileCheck2,
    title: 'تاییدیه آژانس خدمات کسب‌وکار اتریش (AWS)',
    desc: 'طرح توجیهی (Business Plan) شامل تحلیل بازار اروپا و پیش‌بینی مالی ۳ تا ۵ ساله باید به تایید فنی سازمان AWS برسد.',
  },
  {
    icon: Languages,
    title: 'مدرک زبان انگلیسی یا آلمانی',
    desc: 'ارائه مدرک زبان آلمانی اجباری نیست؛ اما سطح A1 تا B1 انگلیسی یا آلمانی ۵ تا ۱۵ امتیاز حیاتی ایجاد می‌کند.',
  },
];

const scoringTableRows = [
  {
    criterion: '۱. صلاحیت‌های علمی و تحصیلی',
    details: [
      'فارغ‌التحصیل مقطع کارشناسی یا بالاتر (حداقل ۳ سال تحصیل دانشگاهی): ۲۰ امتیاز',
      'رشته تحصیلی در حوزه‌های STEM (علوم، فناوری، مهندسی، ریاضی): ۳۰ امتیاز',
    ],
    maxPoints: '۳۰ امتیاز',
  },
  {
    criterion: '۲. سابقه کار مرتبط',
    details: [
      'به ازای هر سال سابقه کار تخصصی مرتبط با ایده استارتاپ (۲ امتیاز به ازای هر سال، حداکثر تا ۵ سال)',
    ],
    maxPoints: '۱۰ امتیاز',
  },
  {
    criterion: '۳. مهارت‌های زبانی',
    details: [
      'سطح A1 زبان آلمانی یا انگلیسی: ۵ امتیاز',
      'سطح A2 زبان آلمانی یا انگلیسی: ۱۰ امتیاز',
      'سطح B1 زبان آلمانی یا انگلیسی: ۱۵ امتیاز (فقط یک زبان محاسبه می‌شود)',
    ],
    maxPoints: '۱۵ امتیاز',
  },
  {
    criterion: '۴. شرایط سنی',
    details: [
      'سن تا ۳۵ سال تمام: ۱۵ امتیاز',
      'سن بین ۳۵ تا ۴۰ سال تمام: ۱۰ امتیاز',
      'سن بین ۴۰ تا ۴۵ سال تمام: ۵ امتیاز (بالای ۴۵ سال: ۰ امتیاز)',
    ],
    maxPoints: '۱۵ امتیاز',
  },
  {
    criterion: '۵. امتیازات ویژه (سرمایه و شتاب‌دهنده)',
    details: [
      'جذب سرمایه بیشتر از ۵۰ هزار یورو (مثلاً ۱۰۰ هزار یورو به بالا): ۱۰ امتیاز',
      'پذیرش در یک شتاب‌دهنده معتبر یا دریافت حمایت مالی از نهادهای نوآوری اتریش: ۵ امتیاز',
    ],
    maxPoints: '۱۵ امتیاز',
  },
];

const processSteps = [
  {
    step: '۱',
    title: 'گام اول — تدوین بیزنس پلن و مدل مالی استاندارد',
    detail:
      'نگارش طرح توجیهی جامع به زبان انگلیسی یا آلمانی شامل تحلیل بازار اروپا، مدل درآمدی، پیش‌بینی مالی ۳ تا ۵ ساله و تشریح وجه تمایز فناورانه محصول.',
    time: '۳ تا ۵ هفته',
  },
  {
    step: '۲',
    title: 'گام دوم — ثبت شرکت در اتریش (GmbH یا FlexKapG)',
    detail:
      'تنظیم اساسنامه در دفتر اسناد رسمی اتریش (Notar)، افتتاح حساب بانکی شرکتی، واریز سرمایه اولیه و ثبت نهایی در دفتر ثبت شرکت‌ها (Firmenbuch).',
    time: '۴ تا ۶ هفته',
  },
  {
    step: '۳',
    title: 'گام سوم — ثبت درخواست اقامت و ارسال پرونده به AWS',
    detail:
      'ارائه مدارک هویتی، بیزنس پلن و مستندات شرکت به سفارت اتریش در تهران (یا اداره مهاجرت اتریش در صورت اقامت قانونی) و ارجاع پرونده به آژانس خدمات کسب‌وکار اتریش (AWS - Austria Wirtschaftsservice).',
    time: '۲ تا ۴ هفته',
  },
  {
    step: '۴',
    title: 'گام چهارم — ارزیابی فنی توسط AWS',
    detail:
      'کارشناسان AWS نوآورانه بودن طرح، واقع‌بینانه بودن پیش‌بینی‌های مالی، هزینه‌های جذب مشتری (CAC) و صلاحیت تیم بنیان‌گذار را بررسی کرده و تاییدیه رسمی را صادر می‌کنند.',
    time: '۴ تا ۸ هفته',
  },
  {
    step: '۵',
    title: 'گام پنجم — دریافت ویزای D و صدور کارت اقامت در وین',
    detail:
      'پس از تایید اداره مهاجرت، سفارت اتریش ویزای ورود (ویزای D) را صادر می‌کند. پس از ورود به اتریش، ثبت آدرس محل سکونت (Meldezettel) و انگشت‌نگاری، کارت اقامت Rot-Weiß-Rot – Karte صادر می‌شود.',
    time: '۴ تا ۶ هفته',
  },
];

const pros = [
  { title: 'مسیر سریع به اقامت دائم', desc: 'اقامت ۲ ساله اولیه، تبدیل به RWR Plus پس از ۲ سال و درخواست اقامت دائم EU پس از ۵ سال' },
  { title: 'همراهی همزمان خانواده و حق کار کامل', desc: 'همسر و فرزندان زیر ۱۸ سال همزمان کارت پلاس با اجازه کار تمام‌وقت و تحصیل رایگان می‌گیرند' },
  { title: 'دسترسی به بازار واحد اروپا و گرنت‌های دولتی', desc: 'استقرار در وین و دسترسی به شتاب‌دهنده‌ها، گرنت‌های AWS و بودجه Horizon Europe' },
  { title: 'عدم نیاز به مدرک زبان آلمانی پیشرفته', desc: 'امکان ارائه طرح و مکاتبات اداری به زبان انگلیسی (انگلیسی یا آلمانی B1 امتیاز کامل ۱۵ دارد)' },
  { title: 'حداکثر تا ۵ بنیان‌گذار همزمان', desc: 'امکان اقدام همزمان تا ۵ شریک روی یک استارتاپ در صورت کسب ۵۰ امتیاز برای هر نفر' },
  { title: 'معافیت‌های مالیاتی NeuFöG', desc: 'کاهش هزینه‌های دولتی تاسیس شرکت جدید تحت قانون حمایت از استارتاپ‌های اتریش' },
];

const cons = [
  { title: 'سرمایه ثبتی €۵۰,۰۰۰', desc: 'شرکت (GmbH یا FlexKapG) باید ۵۰,۰۰۰ یورو سرمایه داشته باشد و ۵۰٪ سهم بنیان‌گذار تامین شود' },
  { title: 'حساسیت بالای AWS روی نوآوری و CAC', desc: 'طرح‌های کلیشه‌ای یا فاقد تحلیل واقعی بازار اروپا و هزینه‌های جذب مشتری رد می‌شوند' },
  { title: 'قوانین سختگیرانه بانکی (Compliance)', desc: 'افتتاح حساب شرکتی اتریشی نیازمند مستندسازی دقیق منشأ پول (Source of Funds) است' },
  { title: 'ارزیابی زمان‌بر در MA35 و سفارت', desc: 'میانگین زمان کل فرآیند ۴ تا ۶ ماه است و نیاز به پیگیری حقوقی مستمر دارد' },
  { title: 'تمکن مالی شخصی مجزا از سرمایه شرکت', desc: 'علاوه بر سرمایه شرکت، تمکن معیشت شخصی (حداقل €۱,۲۷۴/ماه مجرد) لازم است' },
  { title: 'تداوم فعالیت شرکت پس از ۲ سال', desc: 'برای تمدید، گزارش پیشرفت واقعی پروژه، گردش مالی و پرداخت بیمه/مالیات ضروری است' },
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
    text: 'با یک ایده SaaS برای تحلیل داده‌های B2B وارد فرآیند شدم. چالش اصلی من ارزیابی AWS و افتتاح حساب شرکتی بود. بیزینس پلن اولم رد شد چون تحلیل رقبای اروپایی و CAC دقیق نداشت. دفتر وین دیاکو مدل مالی ۳ ساله را بازنویسی کرد و ۶۵ امتیاز از ۸۵ گرفتیم. کل فرآیند حدود ۵ ماه طول کشید و همسرم RWR Plus با اجازه کار تمام‌وقت دریافت کرد.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'نگار موسوی',
    role: 'بنیان‌گذار HealthTech',
    company: 'MediScan AI FlexKapG',
    city: 'گراتس',
    date: 'مارس ۲۰۲۶',
    scheme: 'Startup Founders RWR → RWR Plus',
    rating: 5,
    text: 'با مدرک دکتری STEM (۳۰ امتیاز)، ۵ سال سابقه کار (۱۰ امتیاز)، انگلیسی B1 (۱۵ امتیاز) و سن ۳۳ سال (۱۵ امتیاز)، مجموعاً ۷۰ امتیاز کسب کردم. تیم دیاکو پرونده Source of Funds بانکی را کاملاً طبق استاندارد انطباق مالی اتریش چید و شرکت FlexKapG در کوتاه‌ترین زمان در Firmenbuch ثبت شد.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

const faqs = [
  {
    q: '۱. آیا چند شریک می‌توانند همزمان روی یک استارتاپ در اتریش ویزا بگیرند؟',
    a: 'بله؛ حداکثر تا ۵ بنیان‌گذار می‌توانند به صورت همزمان برای یک استارتاپ درخواست ویزا دهند، به شرطی که هر یک از متقاضیان به تنهایی حداقل ۵۰ امتیاز را کسب کنند و نقش مدیریتی مؤثر (حداقل ۵۰ درصد سهام در مجموع یا مدیریت اجرایی مشخص) در شرکت داشته باشند.',
  },
  {
    q: '۲. اگر استارتاپ در دو سال اول به سوددهی نرسد، آیا اقامت تمدید می‌شود؟',
    a: 'بله؛ سازمان AWS و اداره مهاجرت درک می‌کنند که استارتاپ‌ها در سال‌های اول در مرحله تحقیق، توسعه و جذب بازار هستند. برای تمدید اقامت پس از ۲ سال، ارائه گزارش پیشرفت واقعی پروژه، گردش مالی منطقی، پرداخت بیمه و مالیات‌های قانونی و تداوم فعالیت شرکت کفایت می‌کند.',
  },
  {
    q: '۳. آیا برای ویزای استارتاپ اتریش نیاز به مدرک زبان آلمانی داریم؟',
    a: 'خیر؛ ارائه مدرک زبان آلمانی برای اخذ ویزای استارتاپ اتریش اجباری نیست. با این حال، داشتن مدرک زبان انگلیسی (مانند آیلتس یا تافل) یا آلمانی در سطوح A1 تا B1 بین ۵ تا ۱۵ امتیاز حیاتی در جدول امتیازدهی برای شما ایجاد می‌کند.',
  },
  {
    q: '۴. فرق ویزای استارتاپ اتریش با ویزای جستجوی کار (Job Seeker) چیست؟',
    a: 'ویزای جستجوی کار اتریش یک ویزای ۶ ماهه برای متخصصانی است که قصد دارند به عنوان کارمند در یک شرکت اتریشی استخدام شوند (نیازمند حداقل ۷۰ امتیاز از ۱۰۰ امتیاز). اما ویزای استارتاپ مخصوص کارآفرینانی است که شرکت خود را تاسیس می‌کنند و با ۵۰ امتیاز از همان ابتدا کارت اقامت ۲ ساله دریافت می‌کنند.',
  },
];

const relatedLinks: { title: string; href: string; page?: PageType; blogSlug?: string; desc: string }[] = [
  {
    title: 'مقاله جامع ویزای استارتاپ اتریش در وبلاگ دیاکو',
    href: '/blog/austria-startup-visa',
    blogSlug: 'austria-startup-visa',
    desc: 'نسخه تحلیلی کامل با لینک‌های مرجع دولتی migration.gv.at و AWS',
  },
  {
    title: 'کارت قرمز-سفید-قرمز اتریش (متخصصان RWR)',
    href: '/austria-rwr',
    page: 'austria-rwr',
    desc: 'مقایسه مسیر کارآفرینی با اقامت کاری متخصصان و لیست مشاغل کسری نیرو',
  },
  {
    title: 'ویزای جستجوی کار اتریش (Job Seeker)',
    href: '/jobseeker-austria',
    page: 'jobseeker-austria',
    desc: '۷۰ امتیاز از ۱۰۰ امتیاز + مهلت ۶ ماهه حضور قانونی در وین',
  },
  {
    title: 'ثبت شرکت و بیزینس در اتریش',
    href: '/business-austria',
    page: 'business-austria',
    desc: 'ساختارهای GmbH و FlexKapG، حساب بانکی شرکتی و مالیات شرکت‌ها',
  },
  {
    title: 'اقامت تمکن مالی اتریش (NAG §44)',
    href: '/financial-austria',
    page: 'financial-austria',
    desc: 'اقامت بدون نیاز به کار و ثبت شرکت بر پایه درآمد غیرفعال و سهمیه ژانویه',
  },
];

export const StartupAustriaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ماشین‌حساب دقیق ۸۵ امتیازی سال ۲۰۲۶
  const [educationType, setEducationType] = useState<'stem' | 'bachelor' | 'none'>('stem');
  const [workExperienceYears, setWorkExperienceYears] = useState<number>(4);
  const [languageLevel, setLanguageLevel] = useState<'b1' | 'a2' | 'a1' | 'none'>('b1');
  const [ageGroup, setAgeGroup] = useState<'u35' | '35_40' | '40_45' | 'over45'>('u35');
  const [extraCapitalOver50k, setExtraCapitalOver50k] = useState<boolean>(false);
  const [acceleratorSupport, setAcceleratorSupport] = useState<boolean>(false);

  const scoreBreakdown = useMemo(() => {
    const eduPts = educationType === 'stem' ? 30 : educationType === 'bachelor' ? 20 : 0;
    const expPts = Math.min(5, Math.max(0, workExperienceYears)) * 2;
    const langPts = languageLevel === 'b1' ? 15 : languageLevel === 'a2' ? 10 : languageLevel === 'a1' ? 5 : 0;
    const agePts = ageGroup === 'u35' ? 15 : ageGroup === '35_40' ? 10 : ageGroup === '40_45' ? 5 : 0;
    const specialPts = (extraCapitalOver50k ? 10 : 0) + (acceleratorSupport ? 5 : 0);
    return {
      eduPts,
      expPts,
      langPts,
      agePts,
      specialPts,
      total: eduPts + expPts + langPts + agePts + specialPts,
    };
  }, [educationType, workExperienceYears, languageLevel, ageGroup, extraCapitalOver50k, acceleratorSupport]);

  useSeo({
    title: 'ویزای استارتاپ اتریش ۲۰۲۶ | شرایط، هزینه و راهنمای کامل دیاکو',
    description:
      'راهنمای جامع ویزای استارتاپ اتریش (Rot-Weiß-Rot – Karte) در سال ۲۰۲۶. بررسی شرایط امتیازدهی، سرمایه اولیه ۵۰ هزار یورو، مراحل ثبت شرکت و مشاوره تخصصی هلدینگ دیاکو.',
    canonical: 'https://www.dia-co.ir/startup-austria',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'ویزای استارتاپ اتریش ۲۰۲۶',
      'Austria Startup Visa',
      'Rot-Weiß-Rot Karte',
      'تاییدیه AWS اتریش',
      'ثبت شرکت GmbH و FlexKapG',
      'امتیازبندی ویزای استارتاپ اتریش',
      'دفتر وین دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/startup-austria/#article',
          headline: 'ویزای استارتاپ اتریش ۲۰۲۶ | شرایط، امتیازات، هزینه و راهنمای کامل',
          description:
            'راهنمای جامع ویزای استارتاپ اتریش (Rot-Weiß-Rot – Karte) در سال ۲۰۲۶. بررسی شرایط امتیازدهی، سرمایه اولیه ۵۰ هزار یورو، مراحل ثبت شرکت و مشاوره تخصصی هلدینگ دیاکو.',
          image: [
            'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T10:00:00+03:30',
          dateModified: '2026-11-14T12:30:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و توسعه کسب‌وکار هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          reviewedBy: {
            '@type': 'Organization',
            name: 'دفتر اجرایی هلدینگ دیاکو در وین',
            url: 'https://www.dia-co.ir/',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://www.dia-co.ir/#organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.dia-co.ir/logo.png',
            },
          },
          citation: [
            'https://www.migration.gv.at/en/types-of-immigration/permanent-immigration/start-up-founders/',
            'https://www.aws.at/',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/startup-austria',
          },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/startup-austria/#howto',
          name: 'مراحل گام‌به‌گام ثبت استارتاپ و دریافت ویزای استارتاپ اتریش (۲۰۲۶)',
          totalTime: 'P5M',
          step: processSteps.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.title,
            text: s.detail,
          })),
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/startup-austria/#faq',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: 'https://www.dia-co.ir/' },
            { '@type': 'ListItem', position: 2, name: 'خدمات مهاجرتی دیاکو', item: 'https://www.dia-co.ir/services' },
            { '@type': 'ListItem', position: 3, name: 'ویزای استارتاپ اتریش', item: 'https://www.dia-co.ir/startup-austria' },
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
      {/* ---------- هدر داخلی صفحه ---------- */}
      <header className="sticky top-16 z-40 border-b border-white/10 bg-[#061a21]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <Rocket className="h-5 w-5 text-amber-400" />
              <span className="font-black text-sm">ویزای استارتاپ اتریش ۲۰۲۶</span>
            </div>
            <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-200">
              <a href="#what-is-austria-startup-visa" className="hover:text-amber-300 transition">مزایا و معرفی</a>
              <a href="#requirements-2026" className="hover:text-amber-300 transition">شرایط ۲۰۲۶</a>
              <a href="#points-table" className="hover:text-amber-300 transition">جدول ۸۵ امتیاز</a>
              <a href="#calculator" className="hover:text-amber-300 transition">امتیازسنج آنلاین</a>
              <a href="#step-by-step-process" className="hover:text-amber-300 transition">مراحل اجرا</a>
              <a href="#costs-financials" className="hover:text-amber-300 transition">هزینه‌ها</a>
              <a href="#expert-insights" className="hover:text-amber-300 transition">نکات دفتر وین</a>
              <a href="#faq" className="hover:text-amber-300 transition">سوالات متداول</a>
            </nav>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="hidden sm:inline-flex rounded-xl bg-[#f5a623] px-3.5 py-1.5 text-xs font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی رایگان
              </button>
              <button
                type="button"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="فهرست بخش‌های صفحه"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden py-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-bold">
              <a href="#what-is-austria-startup-visa" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">مزایا و معرفی</a>
              <a href="#requirements-2026" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">شرایط ۲۰۲۶</a>
              <a href="#points-table" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">جدول ۸۵ امتیاز</a>
              <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">امتیازسنج آنلاین</a>
              <a href="#step-by-step-process" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">مراحل اجرا</a>
              <a href="#costs-financials" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">هزینه‌ها</a>
              <a href="#expert-insights" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">نکات دفتر وین</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-amber-300">سوالات متداول</a>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Breadcrumb ---------- */}
      <div className="container mx-auto px-4 md:px-8 pt-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <a
              href="/services"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && onNavigateToPage) {
                  e.preventDefault();
                  onNavigateToPage('services');
                }
              }}
              className="hover:text-amber-300 transition"
            >
              خدمات مهاجرتی دیاکو
            </a>
            <span>/</span>
            <span>استارتاپ و کارآفرینی</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">ویزای استارتاپ اتریش</span>
          </div>
        </div>
      </div>

      {/* ---------- Hero + متادیتای اعتبارسنجی E-E-A-T ---------- */}
      <section className="container mx-auto px-4 md:px-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <Sparkles className="h-4 w-4" /> 🇦🇹 Rot-Weiß-Rot – Karte برای بنیان‌گذاران استارتاپ (۲۰۲۶)
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5">
              راهنمای جامع ویزای استارتاپ اتریش در سال ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-yellow-500">
                (شرایط، امتیازات و هزینه)
              </span>
            </h1>

            {/* متادیتای اعتبارسنجی E-E-A-T */}
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 mb-6 space-y-2 text-xs">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span className="text-slate-300">
                  <strong className="text-amber-300">نویسنده و تدوین:</strong> دپارتمان حقوقی و توسعه کسب‌وکار هلدینگ مهاجرتی دیاکو
                </span>
                <span className="text-slate-300">
                  <strong className="text-emerald-300">بازبینی تخصصی:</strong> دفتر اجرایی دیاکو در وین (<span className="font-mono text-[11px]" dir="ltr">Ausstellungsstraße 50, 1020 Wien</span>)
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
                <span>آخرین به‌روزرسانی: <strong className="text-white">نوامبر ۲۰۲۶</strong></span>
                <span className="flex flex-wrap items-center gap-2">
                  <span>منبع مرجع رسمی:</span>
                  <a
                    href="https://www.migration.gv.at/en/types-of-immigration/permanent-immigration/start-up-founders/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-bold"
                  >
                    <span>migration.gv.at</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.aws.at/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-bold"
                  >
                    <span>aws.at (AWS)</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
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
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی ایده استارتاپی و امتیاز
              </button>
              <a
                href="/blog/austria-startup-visa"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && onNavigateToBlogPost) {
                    e.preventDefault();
                    onNavigateToBlogPost('austria-startup-visa');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="rounded-2xl border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 px-5 py-3.5 text-xs sm:text-sm font-bold text-amber-300 transition inline-flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>نسخه مقاله در وبلاگ دیاکو</span>
              </a>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3.5 text-xs font-bold hover:bg-white/10 transition inline-flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                دفتر وین: +۴۳ ۶۸۸ ۹۷۶ ۳۲۵۶
                {copiedPhone && <span className="text-emerald-400 text-[10px] font-bold">کپی شد!</span>}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&h=600&q=80"
                alt="مهاجرت به اتریش از طریق ویزای استارتاپ و دریافت کارت قرمز سفید قرمز در سال ۲۰۲۶ با هلدینگ دیاکو"
                width={1200}
                height={600}
                loading="eager"
                decoding="async"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/75 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <MapPin className="h-4 w-4" /> دفتر رسمی وین — Ausstellungsstraße 50/2.OG, 1020 Wien
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  شبیه‌سازی ارزیابی AWS، ثبت شرکت GmbH/FlexKapG و بررسی انطباق بانکی Source of Funds
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- خلاصه اجرایی و پاسخ سریع (BLUF Box - ویژه استخراج AI) ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-10">
        <div className="max-w-4xl mx-auto rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-500/15 via-[#07242e] to-black/60 p-6 md:p-8 shadow-xl">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-sm sm:text-base font-black text-amber-300 mb-2">
                خلاصه اجرایی و پاسخ سریع (BLUF — ویژه موتورهای جستجو و هوش مصنوعی)
              </h2>
              <p className="text-xs sm:text-sm text-slate-100 leading-7 text-justify">
                <strong>ویزای استارتاپ اتریش</strong> یکی از زیرمجموعه‌های <strong>کارت قرمز-سفید-قرمز (Rot-Weiß-Rot – Karte)</strong> برای بنیان‌گذاران ایده‌های نوآورانه است. برای دریافت این اقامت در سال ۲۰۲۶، باید حداقل <strong>۵۰ امتیاز از ۸۵ امتیاز</strong> جدول ارزیابی را کسب کنید، حداقل <strong>۵۰,۰۰۰ یورو</strong> سرمایه شرکتی (با سهم حداقل ۵۰٪ از سهام و مدیریت مؤثر) ارائه دهید و طرح توجیهی (Business Plan) خود را به تایید <strong>آژانس خدمات کسب‌وکار اتریش (AWS)</strong> برسانید. این کارت ابتدا با اعتبار ۲ ساله صادر می‌شود و پس از ۲ سال قابل تبدیل به کارت قرمز-سفید-قرمز پلاس با اجازه کار آزاد است.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- فهرست مطالب (Table of Contents) با لینک‌های پرشی استاندارد ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-12">
        <nav
          aria-label="فهرست مطالب راهنمای ویزای استارتاپ اتریش"
          className="max-w-4xl mx-auto rounded-2xl border border-white/15 bg-white/[0.03] p-5 sm:p-6 space-y-3"
        >
          <div className="flex items-center gap-2 text-sm font-black text-amber-300">
            <BookOpen className="h-4 w-4 text-amber-400" />
            <span>فهرست مطالب</span>
          </div>
          <ol className="grid sm:grid-cols-2 gap-2.5 text-xs text-slate-200 list-decimal list-inside">
            <li>
              <a href="#what-is-austria-startup-visa" className="hover:text-amber-300 hover:underline transition">
                ویزای استارتاپ اتریش چیست و چه مزایایی دارد؟
              </a>
            </li>
            <li>
              <a href="#requirements-2026" className="hover:text-amber-300 hover:underline transition">
                شرایط اصلی و الزامات قانونی ویزای استارتاپ اتریش در سال ۲۰۲۶
              </a>
            </li>
            <li>
              <a href="#points-table" className="hover:text-amber-300 hover:underline transition">
                جدول امتیازدهی ویزای استارتاپ اتریش (حداقل ۵۰ امتیاز)
              </a>
            </li>
            <li>
              <a href="#step-by-step-process" className="hover:text-amber-300 hover:underline transition">
                مراحل گام‌به‌گام ثبت استارتاپ و دریافت ویزا از ایران و اتریش
              </a>
            </li>
            <li>
              <a href="#costs-financials" className="hover:text-amber-300 hover:underline transition">
                هزینه‌های ثبت شرکت، تمکن مالی و زندگی در اتریش (۲۰۲۶)
              </a>
            </li>
            <li>
              <a href="#expert-insights" className="hover:text-amber-300 hover:underline transition">
                چالش‌های واقعی پرونده‌ها و نکات کلیدی دفتر وین دیاکو
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-amber-300 hover:underline transition">
                سوالات متداول (FAQ)
              </a>
            </li>
          </ol>
        </nav>
      </section>

      {/* ===================== مقاله جامع و ستون مادر (Pillar Content) ===================== */}
      <article id="article" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-10 space-y-12">
          {/* --- بخش ۱: چیست و مزایا --- */}
          <section id="what-is-austria-startup-visa" className="scroll-mt-32 space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Rocket className="h-5 w-5 text-amber-400 shrink-0" />
              <span>ویزای استارتاپ اتریش چیست و چه مزایایی دارد؟</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-8 text-justify">
              <strong>ویزای استارتاپ اتریش</strong> (Startup Founders Visa) مجوز اقامت و کار مخصوص کارآفرینانی است که قصد راه‌اندازی یک کسب‌وکار نوآورانه در خاک این کشور را دارند. برخلاف روش ثبت شرکت سنتی یا خوداشتغالی (<span dir="ltr">Selbständige Schlüsselkraft</span>)، در این مسیر نیازی به اثبات سودآوری کلان از روز اول ندارید؛ بلکه نوآوری محصول، مقیاس‌پذیری و تاییدیه نهادهای اقتصادی اتریش ملاک عمل قرار می‌گیرد.
            </p>
            <p className="text-xs sm:text-sm text-amber-300 font-bold">مهم‌ترین مزایای این مسیر مهاجرتی عبارت‌اند از:</p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2.5 bg-white/[0.03] rounded-xl p-3.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <span>
                  <strong className="text-white">مسیر سریع به اقامت دائم:</strong> دریافت کارت اقامت ۲ ساله اولیه، تبدیل به کارت قرمز-سفید-قرمز پلاس (<strong>Rot-Weiß-Rot – Karte plus</strong>) پس از ۲ سال و امکان درخواست اقامت دائم اتحادیه اروپا (<strong>Daueraufenthalt – EU</strong>) پس از ۵ سال.
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-white/[0.03] rounded-xl p-3.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <span>
                  <strong className="text-white">همراهی همزمان خانواده:</strong> همسر و فرزندان مجرد زیر ۱۸ سال شما می‌توانند همزمان پرونده خود را ثبت کرده و با دریافت کارت پلاس، از همان ابتدا اجازه کار تمام‌وقت و تحصیل رایگان در اتریش داشته باشند.
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-white/[0.03] rounded-xl p-3.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <span>
                  <strong className="text-white">دسترسی به بازار واحد اروپا و حمایت‌های دولتی:</strong> استقرار در قلب اروپا (وین) و امکان بهره‌مندی از گرنت‌ها و شتاب‌دهنده‌های معتبر اتریشی.
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-white/[0.03] rounded-xl p-3.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <span>
                  <strong className="text-white">عدم نیاز به مدرک زبان آلمانی در سطح بالا:</strong> امکان ارائه طرح و مکاتبات اداری به زبان انگلیسی (هرچند داشتن مدرک زبان آلمانی یا انگلیسی امتیاز مثبت دارد).
                </span>
              </li>
            </ul>
          </section>

          {/* --- بخش ۲: شرایط اصلی ۲۰۲۶ --- */}
          <section id="requirements-2026" className="scroll-mt-32 space-y-5">
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Scale className="h-5 w-5 text-amber-400 shrink-0" />
              <span>شرایط اصلی و الزامات قانونی ویزای استارتاپ اتریش در سال ۲۰۲۶</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-7 text-justify">
              برای اینکه پرونده شما توسط اداره مهاجرت اتریش (<strong>MA 35</strong> در وین یا فرمانداری‌های سایر ایالت‌ها) و وزارت کار پذیرفته شود، باید چهار شرط کلیدی زیر را همزمان برآورده کنید:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {requirements.map((req, i) => {
                const Icon = req.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <Icon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-black text-white mb-1">{req.title}</div>
                      <div className="text-[11px] sm:text-xs text-slate-300 leading-6 text-justify">{req.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* --- بخش ۳: جدول ۸۵ امتیازی --- */}
          <section id="points-table" className="scroll-mt-32 space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Award className="h-5 w-5 text-amber-400 shrink-0" />
              <span>جدول امتیازدهی ویزای استارتاپ اتریش (حداقل ۵۰ امتیاز)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-7 text-justify">
              سیستم مهاجرتی اتریش بر پایه امتیازدهی شفاف عمل می‌کند. در جدول زیر، نحوه محاسبه <strong>۸۵ امتیاز کل</strong> و حداقل امتیازات لازم در سال ۲۰۲۶ آورده شده است:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/15 bg-black/40">
              <table className="w-full text-right text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-amber-400/15 text-amber-300 border-b border-white/15">
                    <th className="p-3.5 font-black whitespace-nowrap">معیار ارزیابی</th>
                    <th className="p-3.5 font-black">جزئیات و شرایط احراز</th>
                    <th className="p-3.5 font-black whitespace-nowrap">حداکثر امتیاز</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {scoringTableRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.03]">
                      <td className="p-3.5 font-bold text-white align-top whitespace-nowrap">{row.criterion}</td>
                      <td className="p-3.5 text-slate-200 leading-6 space-y-1">
                        {row.details.map((d, dIdx) => (
                          <div key={dIdx}>• {d}</div>
                        ))}
                      </td>
                      <td className="p-3.5 font-black text-amber-300 align-top whitespace-nowrap">{row.maxPoints}</td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-500/15 text-emerald-200 font-black">
                    <td className="p-3.5">مجموع امتیازات</td>
                    <td className="p-3.5">حداقل امتیاز قبولی: ۵۰ امتیاز از ۸۵ امتیاز</td>
                    <td className="p-3.5 text-amber-300 whitespace-nowrap">۸۵ امتیاز</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* --- بخش ۴: مراحل گام‌به‌گام --- */}
          <section id="step-by-step-process" className="scroll-mt-32 space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <CalendarDays className="h-5 w-5 text-amber-400 shrink-0" />
              <span>مراحل گام‌به‌گام ثبت استارتاپ و دریافت ویزا از ایران و اتریش</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-7 text-justify">
              فرآیند دریافت ویزای استارتاپ اتریش به طور میانگین بین <strong>۴ تا ۶ ماه</strong> زمان می‌برد و شامل مراحل اجرایی زیر است:
            </p>
            <div className="space-y-3">
              {processSteps.map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="shrink-0 w-8 h-8 rounded-xl bg-amber-400 text-[#082833] grid place-items-center text-xs font-black">
                    {item.step}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xs sm:text-sm font-black text-white">{item.title}</h3>
                      <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-6 text-justify">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- بخش ۵: هزینه‌ها و تمکن ۲۰۲۶ --- */}
          <section id="costs-financials" className="scroll-mt-32 space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <BarChart3 className="h-5 w-5 text-indigo-400 shrink-0" />
              <span>هزینه‌های ثبت شرکت، تمکن مالی و زندگی در اتریش (۲۰۲۶)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-7 text-justify">
              برنامه‌ریزی مالی دقیق یکی از مهم‌ترین فاکتورها در تایید بیزنس پلن شماست. هزینه‌های کلیدی در سال ۲۰۲۶ به شرح زیر است:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2.5 bg-white/[0.03] rounded-xl p-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <span>
                  <strong className="text-white">سرمایه ثبتی شرکت:</strong> حداقل <strong>۵۰,۰۰۰ یورو</strong> (که حداقل ۲۵,۰۰۰ یورو یا کل ۵۰,۰۰۰ یورو بسته به ساختار حقوقی باید در حساب شرکتی مسدود و تایید شود).
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-white/[0.03] rounded-xl p-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <span>
                  <strong className="text-white">هزینه‌های اداری ثبت شرکت و دفتر اسناد رسمی (Notar):</strong> حدود <strong>۲,۵۰۰ تا ۴,۵۰۰ یورو</strong> (با استفاده از قانون حمایت از استارتاپ‌ها یا <em>NeuFöG</em> بخشی از مالیات‌های ثبت شرکت بخشیده می‌شود).
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-white/[0.03] rounded-xl p-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <span>
                  <strong className="text-white">هزینه دولتی بررسی پرونده ویزا و صدور کارت:</strong> حدود <strong>۱۶۰ یورو</strong> برای هر نفر بزرگسال.
                </span>
              </li>
              <li className="flex items-start gap-2.5 bg-white/[0.03] rounded-xl p-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                <span>
                  <strong className="text-white">تمکن مالی برای هزینه‌های شخصی زندگی (علاوه بر سرمایه شرکت):</strong> برای سال ۲۰۲۶، حداقل درآمد ماهانه خالص مورد انتظار برای یک فرد مجرد حدود <strong>۱,۲۷۴ یورو</strong>، برای زوجین حدود <strong>۲,۰۰۹ یورو</strong> و به ازای هر فرزند حدود <strong>۱۹۶ یورو</strong> در ماه محاسبه می‌شود.
                </span>
              </li>
            </ul>
          </section>

          {/* --- بخش ۶: چالش‌های واقعی و نکات دفتر وین دیاکو --- */}
          <section id="expert-insights" className="scroll-mt-32 space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <AlertCircle className="h-5 w-5 text-amber-400 shrink-0" />
              <span>چالش‌های واقعی پرونده‌ها و نکات کلیدی دفتر وین دیاکو</span>
            </h2>
            <div className="rounded-2xl border border-amber-400/50 bg-amber-400/10 p-5 md:p-6 space-y-3">
              <div className="text-xs sm:text-sm font-black text-amber-300">
                نکته تجربی از پرونده‌های واقعی (Information Gain — دفتر اجرایی وین):
              </div>
              <p className="text-xs sm:text-sm text-amber-50 leading-7 text-justify">
                بر اساس تجربه مستقیم تیم حقوقی و اجرایی <strong>هلدینگ مهاجرتی دیاکو</strong> در شهر وین، بیشترین دلیل ریجکتی پرونده‌های استارتاپ ایرانی نه به خاطر کمبود امتیاز، بلکه به دلیل <strong>«کلیشه‌ای بودن بیزنس پلن»</strong> و <strong>«عدم تطابق طرح با بازار واقعی اتریش»</strong> است. کارشناسان سازمان AWS به شدت روی اعداد و ارقام بازاریابی، هزینه‌های جذب مشتری (CAC) و رقبا در اتحادیه اروپا حساس هستند.
              </p>
              <p className="text-xs sm:text-sm text-amber-50 leading-7 text-justify">
                علاوه بر این، <strong>افتتاح حساب بانکی شرکتی در بانک‌های اتریش</strong> برای اتباع ایرانی به دلیل قوانین سختگیرانه انطباق مالی (Compliance) نیازمند شفافیت کامل منشأ پول (Source of Funds) و ارائه اسناد مالیاتی و بانکی ترجمه‌شده و تاییدشده است. دفتر دیاکو در وین با همراهی وکلای رسمی و مشاوران مالیاتی اتریشی، پیش از ثبت پرونده، شبیه‌سازی ارزیابی AWS و بررسی اسناد مالی را انجام می‌دهد تا ریسک ریجکتی به حداقل برسد.
              </p>
            </div>
          </section>
        </div>
      </article>

      {/* ===================== ماشین‌حساب دقیق ۸۵ امتیازی ۲۰۲۶ ===================== */}
      <section id="calculator" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-32">
        <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
            <div>
              <span className="text-[11px] font-black text-amber-300">سیستم امتیازدهی رسمی اتریش (۸۵ امتیاز کل)</span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-amber-400" />
                <span>محاسبه‌گر آنلاین امتیاز ویزای استارتاپ اتریش</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                برای قبولی در جدول رسمی و ارسال به AWS حداقل ۵۰ امتیاز از ۸۵ امتیاز الزامی است
              </p>
            </div>
            <div
              className={`rounded-2xl border px-4 py-2 shrink-0 ${
                scoreBreakdown.total >= 50
                  ? 'border-emerald-400/40 bg-emerald-400/10'
                  : 'border-amber-400/40 bg-amber-400/10'
              }`}
            >
              <span className="text-xs font-bold text-slate-300">امتیاز شما: </span>
              <span
                className={`text-2xl font-black ${
                  scoreBreakdown.total >= 50 ? 'text-emerald-400' : 'text-amber-300'
                }`}
              >
                {scoreBreakdown.total} / ۸۵
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  ۱. صلاحیت‌های علمی و تحصیلی ({scoreBreakdown.eduPts} از ۳۰):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'stem', label: 'رشته STEM (۳۰)' },
                    { id: 'bachelor', label: 'کارشناسی+ (۲۰)' },
                    { id: 'none', label: 'سایر (۰)' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setEducationType(m.id as 'stem' | 'bachelor' | 'none')}
                      className={`rounded-xl py-2 px-2 text-[11px] font-bold transition cursor-pointer ${
                        educationType === m.id
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  ۲. سابقه کار مرتبط با استارتاپ: {workExperienceYears} سال ({scoreBreakdown.expPts} از ۱۰ امتیاز)
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={workExperienceYears}
                  onChange={(e) => setWorkExperienceYears(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  ۳. مهارت زبان آلمانی یا انگلیسی — یک زبان ({scoreBreakdown.langPts} از ۱۵):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'b1', label: 'B1 (۱۵)' },
                    { id: 'a2', label: 'A2 (۱۰)' },
                    { id: 'a1', label: 'A1 (۵)' },
                    { id: 'none', label: 'ندارم (۰)' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setLanguageLevel(l.id as 'b1' | 'a2' | 'a1' | 'none')}
                      className={`rounded-xl py-2 text-[11px] font-bold transition cursor-pointer ${
                        languageLevel === l.id
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  ۴. شرایط سنی متقاضی ({scoreBreakdown.agePts} از ۱۵):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'u35', label: 'تا ۳۵ سال (۱۵)' },
                    { id: '35_40', label: '۳۵-۴۰ (۱۰)' },
                    { id: '40_45', label: '۴۰-۴۵ (۵)' },
                    { id: 'over45', label: '+۴۵ (۰)' },
                  ].map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setAgeGroup(a.id as 'u35' | '35_40' | '40_45' | 'over45')}
                      className={`rounded-xl py-2 text-[11px] font-bold transition cursor-pointer ${
                        ageGroup === a.id
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-slate-300">
                  ۵. امتیازات ویژه سرمایه و شتاب‌دهنده ({scoreBreakdown.specialPts} از ۱۵):
                </label>
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition">
                  <input
                    type="checkbox"
                    checked={extraCapitalOver50k}
                    onChange={(e) => setExtraCapitalOver50k(e.target.checked)}
                    className="rounded text-amber-400 focus:ring-amber-400"
                  />
                  <span className="text-xs text-slate-200">
                    جذب سرمایه بیشتر از ۵۰ هزار یورو (مثلاً ۱۰۰ هزار یورو به بالا) — ۱۰ امتیاز
                  </span>
                </label>
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition">
                  <input
                    type="checkbox"
                    checked={acceleratorSupport}
                    onChange={(e) => setAcceleratorSupport(e.target.checked)}
                    className="rounded text-amber-400 focus:ring-amber-400"
                  />
                  <span className="text-xs text-slate-200">
                    پذیرش در شتاب‌دهنده معتبر یا حمایت مالی نهادهای نوآوری اتریش — ۵ امتیاز
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div
            className={`mt-6 p-3.5 rounded-xl text-center text-xs font-bold ${
              scoreBreakdown.total >= 50
                ? 'bg-emerald-500/10 border border-emerald-400/30 text-emerald-300'
                : 'bg-amber-500/10 border border-amber-400/30 text-amber-300'
            }`}
          >
            {scoreBreakdown.total >= 50
              ? '✅ تبریک! حداقل ۵۰ امتیاز را کسب کردید و می‌توانید وارد مرحله تدوین بیزنس پلن و تاییدیه AWS شوید.'
              : '⚠️ امتیاز شما کمتر از ۵۰ است — با ارائه مدرک زبان B1 یا پذیرش شتاب‌دهنده می‌توانید حد نصاب را تکمیل کنید.'}
          </div>
        </div>
      </section>

      {/* ===================== مزایا و معایب ===================== */}
      <section id="pros-cons" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <TrendingUp className="h-4 w-4" /> ارزیابی شفاف
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">مزایا و چالش‌های ویزای استارتاپ اتریش</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-emerald-400/30 bg-emerald-500/5 p-6">
              <div className="flex items-center gap-2 mb-5">
                <ThumbsUp className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-emerald-300">مزایا ({pros.length})</h3>
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
                <h3 className="text-lg font-black text-red-300">چالش‌ها ({cons.length})</h3>
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

      {/* ===================== نمونه ویزاها ===================== */}
      <section id="samples" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <Award className="h-4 w-4" /> سابقه موفق
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">نمونه کارت‌های استارتاپ صادرشده هلدینگ دیاکو</h2>
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
        </div>
      </section>

      {/* ===================== نظرات تفصیلی ===================== */}
      <section id="reviews" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <Star className="h-4 w-4" /> تجربه واقعی
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">تجربه بنیان‌گذاران موفق دیاکو در اتریش</h2>
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
                      <span className="text-[9px] rounded-full bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="h-2.5 w-2.5" /> تأیید شده
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{t.role} — {t.company}</div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{t.city}</span><span>·</span>
                      <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{t.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star key={s} className={`h-3 w-3 ${s < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                    ))}
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

      {/* ===================== FAQ ===================== */}
      <section id="faq" className="container mx-auto px-4 md:px-8 mb-16 scroll-mt-32">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">سوالات متداول (FAQ)</h2>
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
                <div className="p-4 pt-3 text-xs md:text-sm text-slate-300 leading-7 border-t border-white/5 text-justify">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===================== لینک‌های داخلی مرتبط و مقاله وبلاگ ===================== */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-center mb-6">مقالات و راهنماهای مرتبط دیاکو</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {relatedLinks.map((r, i) => (
            <a
              key={i}
              href={r.href}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  if (r.blogSlug && onNavigateToBlogPost) {
                    e.preventDefault();
                    onNavigateToBlogPost(r.blogSlug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (r.page && onNavigateToPage) {
                    e.preventDefault();
                    onNavigateToPage(r.page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              }}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-amber-400/40 transition flex flex-col justify-between gap-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">{r.title}</h3>
                <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-amber-400 shrink-0 mt-0.5" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ===================== CTA نهایی و اطلاعات تماس رسمی دیاکو ===================== */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-amber-400/5 to-transparent p-6 md:p-10 text-center space-y-5">
          <Sparkles className="h-8 w-8 text-amber-400 mx-auto" />
          <h2 className="text-xl md:text-2xl font-black">
            نیاز به ارزیابی دقیق ایده استارتاپی و شرایط امتیازی خود دارید؟
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-7">
            تیم متخصصان حقوقی و توسعه کسب‌وکار <strong>هلدینگ مهاجرتی دیاکو</strong> با دفاتر فعال در <strong>تهران و وین</strong>، آماده بررسی ایده استارتاپی، محاسبه دقیق امتیازات و تدوین بیزنس پلن استاندارد مورد تایید سازمان AWS اتریش برای شماست.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <span>☎️ تهران: <a href="tel:02191693955" dir="ltr" className="text-amber-300 font-bold hover:underline">021-91693955</a> | <a href="tel:09197340829" dir="ltr" className="text-amber-300 font-bold hover:underline">09197340829</a></span>
            <span>•</span>
            <span>📍 دفتر وین: <span dir="ltr" className="font-mono">Ausstellungsstraße 50/2.OG, 1020 Wien</span></span>
            <span>•</span>
            <span>✉️ <a href="mailto:Admin@dia-co.ir" className="text-cyan-300 hover:underline">Admin@dia-co.ir</a></span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110 cursor-pointer"
            >
              شروع ارزیابی ایده استارتاپ
            </button>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold hover:bg-white/10 inline-flex items-center gap-2 cursor-pointer"
            >
              <Copy className="h-4 w-4 text-amber-400" />
              {copiedPhone ? 'شماره کپی شد!' : 'دفتر وین: +43 688 976 3256'}
            </button>
          </div>
        </div>
      </section>

      {/* ---------- نوار CTA شناور موبایل ---------- */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#061a21]/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-2">
        <button
          type="button"
          onClick={onOpenAssessment}
          className="flex-1 rounded-xl bg-[#f5a623] py-2.5 text-xs font-black text-[#082833]"
        >
          ارزیابی رایگان استارتاپ
        </button>
        <button
          type="button"
          onClick={handleCopyPhone}
          className="rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-xs font-bold inline-flex items-center gap-1.5"
        >
          <PhoneCall className="h-4 w-4 text-emerald-400" /> تماس
        </button>
      </div>
    </div>
  );
};

export default StartupAustriaPage;