import React, { useState, useMemo } from 'react';
import {
  CheckCircle2, Clock, ArrowRight, ArrowLeft, ChevronDown, PhoneCall,
  Copy, Sparkles, BookOpen, Briefcase, Award, Globe2, Laptop, Scale,
  Users, Home, Info, Euro, Wallet, Heart, GraduationCap, FileWarning,
  ThumbsUp, ThumbsDown, AlertTriangle, ExternalLink, ShieldCheck,
  Languages, Calculator, TrendingUp, MapPin, CalendarDays, FileCheck2,
  Search, Menu, X, Star, Quote, Plane,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ==================================================================
   داده‌های ساختاریافته ۲۰۲۶
   ================================================================== */

// ۱) مقایسه دو مسیر ویزای دانشجویی (زبان در برابر آموزش عالی)
const visaTrackComparison = [
  { feature: 'حق کار قانونی', language: 'خیر (نیاز به مجوز جداگانه)', higherEd: 'بله (۳۰ ساعت/هفته خودکار)', highlight: true },
  { feature: 'مدت اعتبار ویزا', language: 'معمولاً ۱ سال', higherEd: 'کل مدت تحصیل (۳–۴ سال)' },
  { feature: 'حداکثر اقامت', language: '۲ سال (۱ بار تمدید)', higherEd: 'نامحدود تا زمانی که ثبت‌نام باشید' },
  { feature: 'تمدید', language: 'فقط ۱ بار + مدرک DELE/SIELE', higherEd: 'نامحدود' },
  { feature: 'تبدیل به اقامت کاری', language: 'دشوار (نیاز به تغییر وضعیت)', higherEd: 'آسان (پس از فارغ‌التحصیلی)' },
  { feature: 'مسیر اقامت دائم', language: 'ضعیف', higherEd: 'قوی (ویزای جستجوی کار → کاری → دائم)' },
];

// ۲) آستانه درآمد و تمکن مالی (IPREM 2026)
const financialRows = [
  { member: 'متقاضی اصلی', amount: '€۶۰۰ / ماه', yearly: '€۷,۲۰۰ / سال', note: '۱۰۰٪ IPREM', icon: Wallet },
  { member: 'همسر / شریک', amount: '+€۴۵۰ / ماه', yearly: '+€۵,۴۰۰ / سال', note: '۷۵٪ IPREM', icon: Users },
  { member: 'هر فرزند', amount: '+€۳۰۰ / ماه', yearly: '+€۳,۶۰۰ / سال', note: '۵۰٪ IPREM', icon: Heart },
];

// ۳) فرآیند درخواست (گام‌به‌گام)
const processSteps = [
  { step: '۱', title: 'انتخاب کالج معتبر دارای مجوز Instituto Cervantes', detail: 'حداقل ۲۰ ساعت آموزش در هفته. کالج‌های معتبر در مادرید، بارسلونا و والنسیا.', time: '۱–۲ هفته' },
  { step: '۲', title: 'آماده‌سازی مدارک و تمکن مالی', detail: 'پاسپورت، پذیرش کالج، پرینت بانکی ۶ ماهه (حداقل €۷,۲۰۰)، بیمه بدون copago، گواهی عدم سوءپیشینه، گواهی سلامت.', time: '۳–۵ هفته' },
  { step: '۳', title: 'ثبت درخواست در کنسولگری اسپانیا (BLS)', detail: 'رزرو وقت، ارائه مدارک، انگشت‌نگاری. هزینه ویزا: €۸۰–€۱۰۰.', time: '۱–۳ هفته (نوبت‌دهی)' },
  { step: '۴', title: 'دریافت ویزای Type D شینگن', detail: 'زمان پردازش کنسولگری: ۴–۶ هفته (به‌طور رسمی حداکثر ۱ ماه).', time: '۴–۶ هفته' },
  { step: '۵', title: 'ورود به اسپانیا و دریافت کارت TIE', detail: 'ظرف ۳۰ روز پس از ورود، برای انگشت‌نگاری و دریافت کارت اقامت (TIE) اقدام کنید. هزینه: €۱۶.۰۸.', time: '۳۰ روز' },
];

// ۴) مزایا و معایب
const pros = [
  { title: 'بدون نیاز به مدرک زبان اولیه', desc: 'می‌توانید از سطح صفر شروع کنید' },
  { title: 'ورود آسان به منطقه شینگن', desc: 'ویزای تحصیلی اسپانیا دروازه‌ای به ۲۷ کشور اروپایی است' },
  { title: 'هزینه مقرون‌به‌صرفه', desc: 'شهریه سالانه €۴,۵۰۰–€۵,۵۰۰ + زندگی €۷۰۰–€۱,۱۰۰/ماه' },
  { title: 'فرصت یادگیری زبان در محیط بومی', desc: 'بهترین روش برای تسلط سریع به اسپانیایی' },
  { title: 'مسیر تبدیل به اقامت کاری', desc: 'پس از یافتن شغل، در خاک اسپانیا قابل تغییر است' },
  { title: 'امکان الحاق خانواده', desc: 'همسر و فرزندان با اثبات تمکن مالی اضافه' },
  { title: 'تنوع کالج‌ها', desc: '۲۸ مدرسه در مادرید، ۲۳ در والنسیا، ۲۲ در بارسلونا' },
  { title: 'آب‌وهوای مدیترانه‌ای', desc: 'کیفیت زندگی بالا در یکی از محبوب‌ترین کشورهای اروپا' },
];

const cons = [
  { title: 'بدون حق کار خودکار', desc: 'برخلاف تصور رایج، زبان‌آموزان باید جداگانه مجوز کار بگیرند' },
  { title: 'حداکثر اقامت ۲ ساله', desc: 'فقط یک بار تمدید، سپس باید وضعیت را تغییر دهید' },
  { title: 'نیاز به مدرک DELE/SIELE برای تمدید', desc: 'باید سطح زبان خود را اثبات کنید' },
  { title: 'اجازه کار محدود', desc: 'در صورت اخذ مجوز، حداکثر ۲۰–۳۰ ساعت/هفته (بسته به نوع دوره)' },
  { title: 'رقابت برای مشاغل', desc: 'بازار کار اسپانیا برای غیر اروپایی‌ها رقابتی است' },
  { title: 'پیچیدگی تبدیل وضعیت', desc: 'تبدیل ویزای زبان به کاری نیازمند تغییر رسمی وضعیت است' },
  { title: 'هزینه زندگی در شهرهای بزرگ', desc: 'مادرید و بارسلونا گران‌تر از والنسیا هستند' },
];

// ۵) نمونه ویزاهای صادرشده
const sampleVisas = [
  {
    id: 'ES-LANG-2026-0312',
    name: 'A.R.',
    city: 'والنسیا',
    date: 'مارس ۲۰۲۶',
    course: 'دوره ۹ ماهه فشرده (۲۰ ساعت/هفته)',
    school: 'Hispania, Valencia',
    duration: 'ویزای ۱ ساله Type D',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای دانشجویی زبان اسپانیا — والنسیا',
  },
  {
    id: 'ES-LANG-2026-0428',
    name: 'S.N.',
    city: 'مادرید',
    date: 'آوریل ۲۰۲۶',
    course: 'دوره ۱۲ ماهه (۲۰ ساعت/هفته)',
    school: 'don Quijote, Madrid',
    duration: 'ویزای ۱ ساله Type D',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای دانشجویی زبان اسپانیا — مادرید',
  },
  {
    id: 'ES-LANG-2026-0603',
    name: 'M.K.',
    city: 'بارسلونا',
    date: 'ژوئن ۲۰۲۶',
    course: 'دوره ۱۰ ماهه (۲۰ ساعت/هفته)',
    school: 'Enforex, Barcelona',
    duration: 'ویزای ۱ ساله Type D',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای دانشجویی زبان اسپانیا — بارسلونا',
  },
];

// ۶) نظرات تفصیلی متقاضیان
const detailedTestimonials = [
  {
    name: 'آرش رضایی',
    role: 'دانشجوی دوره زبان',
    company: 'Hispania, Valencia',
    city: 'والنسیا',
    date: 'مارس ۲۰۲۶',
    scheme: 'ویزای زبان → تبدیل به اقامت کاری',
    rating: 5,
    text: 'من با هدف یادگیری زبان و سپس یافتن کار به اسپانیا آمدم. دیاکو از ابتدا هشدار داد که ویزای زبان حق کار خودکار ندارد و باید پس از ورود برای مجوز کار جداگانه اقدام کنم. این شفافیت باعث شد انتظارات واقع‌بینانه داشته باشم. در طول دوره ۹ ماهه، با کمک دیاکو یک مجوز کار پاره‌وقت گرفتم و در یک کافه گردشگری مشغول شدم. پس از پایان دوره، با پیشنهاد شغلی از یک شرکت فناوری، وضعیت خود را به اقامت کاری تغییر دادم. کل فرآیند بدون خروج از اسپانیا انجام شد. تیم دیاکو در تمام مراحل (از انتخاب کالج تا تبدیل وضعیت) کنارم بود.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'نگار موسوی',
    role: 'دانشجوی دوره زبان و فریلنسر',
    company: 'don Quijote, Madrid',
    city: 'مادرید',
    date: 'مه ۲۰۲۶',
    scheme: 'ویزای زبان + دیجیتال نوماد',
    rating: 5,
    text: 'من از ایران با ویزای زبان اسپانیا اقدام کردم. چون فریلنسر بودم، دیاکو پیشنهاد داد که به‌جای اتکا به حق کار ویزای زبان (که وجود ندارد)، همزمان ویزای دیجیتال نوماد را نیز بررسی کنیم. در نهایت با ویزای دیجیتال نوماد وارد شدم و در کنار آن در یک کالج زبان ثبت‌نام کردم — این ترکیب کاملاً قانونی است و محدودیت ۳۰ ساعت کار هم ندارد. اگر فقط ویزای زبان می‌گرفتم، اجازه کار نداشتم و باید برای مجوز جداگانه اقدام می‌کردم که زمان‌بر بود. مشاوره دیاکو باعث شد مسیر بهتری انتخاب کنم. دوره زبان در مادرید عالی بود و توانستم اسپانیایی خود را به سطح B2 برسانم.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

// ۷) پرسش‌های متداول
const faqs = [
  { q: 'آیا ویزای زبان اسپانیا به‌طور خودکار حق کار می‌دهد؟', a: 'خیر. این یک باور غلط رایج است. طبق Royal Decree 1155/2024 (لازم‌الاجرا از ۲۰ مه ۲۰۲۵)، حق کار خودکار ۳۰ ساعت در هفته فقط برای دانشجویان آموزش عالی (دانشگاه، کارشناسی ارشد، FP) است. دانشجویان کالج زبان حق کار خودکار ندارند و باید جداگانه درخواست مجوز کار دهند. حتی در صورت اخذ مجوز، ساعات کار ممکن است محدودتر باشد.' },
  { q: 'آیا می‌توانم با ویزای زبان در اسپانیا کار کنم؟', a: 'بله، اما نه به‌طور خودکار. باید از اداره مهاجرت (Extranjería) مجوز کار جداگانه بگیرید. این فرآیند نیازمند قرارداد کار، توضیح اینکه کار با تحصیل تداخل ندارد، و طی مراحل اداری است. برخی منابع اشاره می‌کنند که در عمل اخذ این مجوز برای زبان‌آموزان دشوار است و توصیه می‌شود قبل از اقدام با وکیل مشورت کنید.' },
  { q: 'حداقل تمکن مالی برای ویزای زبان اسپانیا چقدر است؟', a: 'بر اساس IPREM ۲۰۲۶ (€۶۰۰ در ماه)، متقاضی اصلی باید ۱۰۰٪ آن یعنی €۶۰۰ در ماه (€۷,۲۰۰ در سال) را اثبات کند. برای همسر +۷۵٪ (€۴۵۰/ماه) و برای هر فرزند +۵۰٪ (€۳۰۰/ماه) اضافه می‌شود. این مبلغ باید از طریق پرینت حساب بانکی ۶ ماهه قابل اثبات باشد.' },
  { q: 'آیا برای ثبت‌نام در کالج زبان به مدرک زبان نیاز دارم؟', a: 'خیر. هدف این ویزا یادگیری زبان از سطح صفر است و نیازی به مدرک DELE یا SIELE از قبل نیست. اما برای تمدید ویزا، ممکن است نیاز به اثبات پیشرفت تحصیلی و مدرک سطح زبان داشته باشید.' },
  { q: 'پس از پایان دوره زبان، چگونه می‌توانم در اسپانیا بمانم و کار کنم؟', a: 'پس از پایان دوره، چند مسیر دارید: (۱) تبدیل وضعیت به اقامت کاری در صورت داشتن پیشنهاد شغلی (طبق ماده ۱۹۰ RD 1155/2024، دیگر نیازی به ۳ سال اقامت قبلی نیست و از زمان پذیرش درخواست می‌توانید全职 کار کنید). (۲) درخواست ویزای جستجوی کار (۱ سال). (۳) تغییر به ویزای دیجیتال نوماد در صورت داشتن درآمد دورکاری از خارج. (۴) ادامه تحصیل در مقطع بالاتر (دانشگاه یا FP) که حق کار ۳۰ ساعته می‌دهد.' },
  { q: 'آیا زبان‌آموزان می‌توانند خانواده خود را بیاورند؟', a: 'بله، برای دوره‌های بیش از ۶ ماه، همسر و فرزندان زیر ۱۸ سال می‌توانند ویزای همراه بگیرند. نیاز به اثبات تمکن مالی اضافه (۷۵٪ IPREM برای همسر و ۵۰٪ برای هر فرزند) و بیمه درمانی دارند. توجه: همراهان حق کار مستقل ندارند.' },
  { q: 'مدت زمان پردازش ویزای زبان اسپانیا چقدر است؟', a: 'طبق تجربه، کل فرآیند از جمع‌آوری مدارک تا دریافت ویزا حدود ۲ تا ۳ ماه طول می‌کشد. زمان پردازش کنسولگری به‌طور رسمی حداکثر ۱ ماه است، اما در عمل ۴ تا ۶ هفته. زمان نوبت‌دهی BLS نیز ۱ تا ۳ هفته است.' },
  { q: 'آیا کالج زبان باید حتماً دارای مجوز Instituto Cervantes باشد؟', a: 'بله، برای ویزای دانشجویی، کالج باید معتبر و دارای مجوز رسمی باشد. Instituto Cervantes معتبرترین نهاد اعتباربخشی برای مدارس زبان اسپانیایی است. تا اکتبر ۲۰۲۶، حدود ۲۰۰ مدرسه معتبر در اسپانیا وجود دارد، از جمله ۲۸ مدرسه در مادرید، ۲۳ در والنسیا و ۲۲ در بارسلونا.' },
];

// ۸) مقالات مرتبط
const relatedArticles = [
  { title: 'ویزای دیجیتال نوماد اسپانیا', href: '/guides/nomad-spain', desc: 'درآمد €۲,۸۴۹ + مالیات بکهام ۲۴٪' },
  { title: 'ویزای غیرانتفاعی اسپانیا', href: '/guides/financial-spain', desc: '۴۰۰٪ IPREM + اقامت دائم ۵ ساله' },
  { title: 'تحصیل در اسپانیا (دانشگاه)', href: '/guides/academic-spain', desc: 'آزمون PCE + شهریه دولتی' },
];

/* ==================================================================
   کامپوننت اصلی
   ================================================================== */

export const LanguageSpainPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // وضعیت‌های ماشین‌حساب
  const [city, setCity] = useState<'madrid' | 'barcelona' | 'valencia'>('valencia');
  const [workHours, setWorkHours] = useState<number>(20);

  // ماشین‌حساب هزینه و درآمد
  const calc = useMemo(() => {
    let tuition = 4800;
    let livingCost = 800;

    if (city === 'madrid') {
      tuition = 5200;
      livingCost = 1050;
    } else if (city === 'barcelona') {
      tuition = 5400;
      livingCost = 1100;
    }

    // حداقل دستمزد ساعتی اسپانیا ۲۰۲۶ (SMI): حدود €۹.۸
    const hourlyWage = 9.8;
    const monthlyIncome = Math.round(workHours * 4.3 * hourlyWage);
    const netBalance = monthlyIncome - livingCost;

    return { tuition, livingCost, monthlyIncome, netBalance };
  }, [city, workHours]);

  useSeo({
    title: 'دوره زبان در اسپانیا ۲۰۲۶ | ویزای دانشجویی + راهنمای کامل حق کار',
    description:
      'راهنمای جامع ثبت‌نام کالج زبان اسپانیا ۲۰۲۶: ویزای شینگن Type D، حداقل تمکن مالی €۶۰۰/ماه (IPREM)، حق کار قانونی برای زبان‌آموزان (نیاز به مجوز جداگانه)، کالج‌های معتبر Instituto Cervantes در مادرید، بارسلونا و والنسیا، و مسیر تبدیل به اقامت کاری. مشاوره دیاکو.',
    canonical: '/guides/language-course-spain',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'دوره زبان در اسپانیا ۲۰۲۶', 'ویزای دانشجویی زبان اسپانیا',
      'حق کار ویزای زبان اسپانیا', 'کالج زبان اسپانیایی در بارسلونا',
      'کالج سروانتس مادرید Instituto Cervantes', 'تمکن مالی ویزای دانشجویی اسپانیا IPREM',
      'تبدیل ویزای تحصیلی به کاری در اسپانیا', 'هزینه زندگی دانشجویی اسپانیا ۲۰۲۶',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/language-course-spain#article',
          headline: 'راهنمای جامع دوره زبان و ویزای دانشجویی اسپانیا ۲۰۲۶: حق کار، تمکن مالی و کالج‌های معتبر',
          description: 'تحلیل کامل Royal Decree 1155/2024: تفاوت حق کار زبان‌آموزان و دانشجویان آموزش عالی، آستانه IPREM €۶۰۰/ماه، فرآیند دریافت ویزای Type D، مسیر تبدیل به اقامت کاری و کالج‌های معتبر Instituto Cervantes.',
          image: ['https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80'],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' } },
          datePublished: '2026-01-01', dateModified: '2026-10-30', inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Spain Language Course Student Visa' },
            { '@type': 'Thing', name: 'Instituto Cervantes' },
            { '@type': 'Thing', name: 'IPREM 2026' },
          ],
        },
        {
          '@type': 'HowTo',
          name: 'مراحل دریافت ویزای زبان اسپانیا ۲۰۲۶',
          totalTime: 'P3M',
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
            { '@type': 'ListItem', position: 2, name: 'دوره‌های زبان', item: 'https://www.dia-co.ir/language' },
            { '@type': 'ListItem', position: 3, name: 'اسپانیا', item: 'https://www.dia-co.ir/guides/language-course-spain' },
          ],
        },
      ],
    },
  });

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+34 600 000 000');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#061a21] text-white font-sans" dir="rtl">
      {/* ============================================================
          هدر
         ============================================================ */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061a21]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Languages className="h-7 w-7 text-amber-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
              <a href="#article" className="hover:text-amber-300 transition">مقاله</a>
              <a href="#work-rights" className="hover:text-amber-300 transition">حق کار</a>
              <a href="#finance" className="hover:text-amber-300 transition">تمکن مالی</a>
              <a href="#calculator" className="hover:text-amber-300 transition">ماشین‌حساب</a>
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
              <a href="#work-rights" className="block hover:text-amber-300">حق کار</a>
              <a href="#finance" className="block hover:text-amber-300">تمکن مالی</a>
              <a href="#calculator" className="block hover:text-amber-300">ماشین‌حساب</a>
              <a href="#pros-cons" className="block hover:text-amber-300">مزایا و معایب</a>
              <a href="#samples" className="block hover:text-amber-300">نمونه ویزا</a>
              <a href="#reviews" className="block hover:text-amber-300">نظرات</a>
              <a href="#faq" className="block hover:text-amber-300">سوالات</a>
            </div>
          )}
        </div>
      </header>

      {/* ============================================================
          Breadcrumb
         ============================================================ */}
      <div className="container mx-auto px-4 md:px-8 pt-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button type="button" onClick={onBackToHome} className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 transition">
            <ArrowLeft className="h-4 w-4" /> بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span><span>/</span>
            <span>دوره‌های زبان</span><span>/</span>
            <span className="text-amber-300 font-bold">اسپانیا</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          Hero
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <Sparkles className="h-4 w-4" /> ویزای دانشجویی Type D — دوره زبان اسپانیا ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              دوره زبان در اسپانیا ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-yellow-500">
                (ویزای شینگن + راهنمای حق کار)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              اسپانیا با کالج‌های زبان معتبر، هزینه‌های مقرون‌به‌صرفه و ویزای دانشجویی شینگن، یکی از
              محبوب‌ترین مقاصد برای یادگیری زبان اسپانیایی است. اما یک نکته حیاتی وجود دارد که بسیاری از
              متقاضیان از آن غافل می‌شوند: <strong className="text-amber-300">ویزای زبان به‌طور خودکار حق کار
              نمی‌دهد</strong>. برخلاف دانشجویان آموزش عالی (دانشگاه و FP) که حق کار ۳۰ ساعت در هفته را
              دارند، زبان‌آموزان باید برای اخذ مجوز کار جداگانه اقدام کنند. در این راهنما، تمام جنبه‌های
              ویزای زبان، از تمکن مالی €۶۰۰ در ماه تا مسیر تبدیل به اقامت کاری، به‌صورت شفاف بررسی می‌شود.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: Euro, label: '€۶۰۰ / ماه', sub: 'حداقل تمکن مالی (IPREM)' },
                { icon: Clock, label: '۲ سال', sub: 'حداکثر اقامت با ویزای زبان' },
                { icon: FileCheck2, label: '۴–۶ هفته', sub: 'پردازش ویزا در کنسولگری' },
                { icon: GraduationCap, label: '~۲۰۰', sub: 'کالج معتبر Instituto Cervantes' },
              ].map((item, i) => {
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
                ارزیابی رایگان شرایط ویزای زبان اسپانیا
              </button>
              <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                دپارتمان اسپانیا: ۰۲۱۹۱۶۹۳۹۵۵
                {copiedPhone && <span className="text-emerald-400 text-[10px] font-bold">کپی شد!</span>}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1000&q=80"
                alt="دوره زبان اسپانیایی در بارسلونا و مادرید — ویزای دانشجویی شینگن" width={1000} height={750}
                loading="eager" decoding="async" fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300"><MapPin className="h-4 w-4" /> مادرید، بارسلونا، والنسیا</div>
                <p className="text-[11px] text-slate-300 mt-1">کالج‌های معتبر Instituto Cervantes و مسیر تبدیل به اقامت کاری.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          خلاصه سریع (TL;DR)
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-10">
        <div className="max-w-4xl mx-auto rounded-2xl border border-amber-400/30 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-sm font-black text-amber-300 mb-2">خلاصه سریع (TL;DR) — ۲۰۲۶</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-300">
                <li>• <strong className="text-white">حق کار خودکار:</strong> <span className="text-rose-300">ندارد</span> (نیاز به مجوز جداگانه)</li>
                <li>• <strong className="text-white">تمکن مالی:</strong> €۶۰۰/ماه (€۷,۲۰۰/سال)</li>
                <li>• <strong className="text-white">حداکثر اقامت:</strong> ۲ سال (۱ تمدید)</li>
                <li>• <strong className="text-white">پردازش ویزا:</strong> ۴–۶ هفته</li>
                <li>• <strong className="text-white">مسیر کاری:</strong> تبدیل به اقامت کاری پس از یافتن شغل</li>
                <li>• <strong className="text-white">کالج‌های معتبر:</strong> ~۲۰۰ مدرسه Instituto Cervantes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          مقاله پرمحتوا
         ============================================================ */}
      <article id="article" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-10">

          {/* --- مقدمه --- */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><BookOpen className="h-4 w-4" /> مقاله تخصصی ۲۰۲۶</span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">ویزای زبان اسپانیا چیست و برای چه کسانی مناسب است؟</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              ویزای دانشجویی اسپانیا (Visado de Estudios / Estancia por Estudios) برای اتباع غیر اتحادیه اروپا
              طراحی شده که قصد دارند در یک مؤسسه آموزشی معتبر اسپانیایی ثبت‌نام کنند. این ویزا انواع مختلفی دارد:
              دانشگاه، کارشناسی ارشد، دکتری، آموزش حرفه‌ای (FP) و <strong className="text-white">دوره زبان</strong>.
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              ویزای زبان اسپانیا برای افرادی مناسب است که:
            </p>
            <ul className="space-y-2 text-sm text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>می‌خواهند زبان اسپانیایی را از سطح صفر در محیط بومی یاد بگیرند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>به‌دنبال ورود آسان به منطقه شینگن هستند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>برنامه دارند پس از یادگیری زبان، وارد دانشگاه یا بازار کار شوند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>از درآمد یا پس‌انداز کافی برای پوشش هزینه‌ها برخوردارند (بدون نیاز به کار فوری).</span></li>
            </ul>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/20">
              <p className="text-[11px] text-red-200 leading-relaxed">
                <strong>هشدار مهم:</strong> برخلاف باور رایج، ویزای زبان اسپانیا <strong>حق کار خودکار</strong> ندارد.
                طبق Royal Decree 1155/2024، حق کار ۳۰ ساعت در هفته فقط برای دانشجویان آموزش عالی (دانشگاه،
                کارشناسی ارشد، FP) است. زبان‌آموزان باید برای اخذ مجوز کار جداگانه اقدام کنند. این تفاوت
                در بخش «حق کار» به‌طور کامل توضیح داده شده است.
              </p>
            </div>
          </div>

          {/* --- حق کار (بخش کلیدی) --- */}
          <div id="work-rights" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Scale className="h-6 w-6 text-rose-400" /> حق کار در ویزای زبان — تفکیک واقعیت از افسانه
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              یکی از مهم‌ترین و در عین حال گمراه‌کننده‌ترین جنبه‌های ویزای زبان اسپانیا، موضوع حق کار است.
              بسیاری از منابع (حتی برخی وب‌سایت‌های مهاجرتی) به‌اشتباه ادعا می‌کنند که همه دانشجویان
              می‌توانند ۳۰ ساعت در هفته کار کنند. این ادعا برای دانشجویان آموزش عالی درست است، اما
              <strong className="text-rose-300"> برای زبان‌آموزان نادرست است</strong>.
            </p>

            {/* جدول مقایسه دو مسیر */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-6">
              <table className="w-full text-xs md:text-sm text-right">
                <thead className="bg-white/5">
                  <tr>
                    <th className="p-3 text-slate-300 font-bold">ویژگی</th>
                    <th className="p-3 text-rose-300 font-bold">ویزای زبان</th>
                    <th className="p-3 text-emerald-300 font-bold">ویزای آموزش عالی (دانشگاه/FP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {visaTrackComparison.map((row, i) => (
                    <tr key={i} className={row.highlight ? 'bg-rose-500/5' : ''}>
                      <td className="p-3 text-slate-200 font-medium">{row.feature}</td>
                      <td className={`p-3 ${row.highlight ? 'text-rose-300 font-bold' : 'text-slate-400'}`}>{row.language}</td>
                      <td className={`p-3 ${row.highlight ? 'text-emerald-300 font-bold' : 'text-slate-400'}`}>{row.higherEd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              <strong className="text-white">چرا این تفاوت وجود دارد؟</strong> قانونگذار اسپانیا در
              Royal Decree 1155/2024 (لازم‌الاجرا از ۲۰ مه ۲۰۲۵) حق کار خودکار ۳۰ ساعت در هفته را
              به دانشجویان برنامه‌های رسمی آموزش عالی که توسط وزارت آموزش اداره می‌شوند اعطا کرده است.
              کالج‌های زبان، حتی با مجوز Instituto Cervantes، در این طبقه‌بندی قرار نمی‌گیرند.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-400/20">
                <h3 className="text-xs font-bold text-rose-300 mb-2">اگر بدون مجوز کار کنید:</h3>
                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  <li className="flex items-start gap-2"><FileWarning className="h-3.5 w-3.5 text-rose-400 mt-0.5 shrink-0" /><span>رد تمدید کارت TIE</span></li>
                  <li className="flex items-start gap-2"><FileWarning className="h-3.5 w-3.5 text-rose-400 mt-0.5 shrink-0" /><span>ثبت سابقه تخلف که بر درخواست‌های آینده تأثیر می‌گذارد</span></li>
                  <li className="flex items-start gap-2"><FileWarning className="h-3.5 w-3.5 text-rose-400 mt-0.5 shrink-0" /><span>در موارد جدی: اخراج و ممنوعیت ورود</span></li>
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                <h3 className="text-xs font-bold text-emerald-300 mb-2">گزینه‌های جایگزین برای درآمد:</h3>
                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>ثبت‌نام در برنامه FP (آموزش حرفه‌ای) که حق کار ۳۰ ساعته می‌دهد</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>ویزای دیجیتال نوماد (بدون محدودیت ساعت کار)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>درخواست مجوز کار جداگانه (زمان‌بر و نیازمند قرارداد)</span></li>
                </ul>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              * برخی منابع اشاره می‌کنند که حتی در صورت اخذ مجوز کار برای زبان‌آموزان، ساعات کار ممکن است
              به ۲۰ ساعت در هفته محدود شود. قبل از هر اقدامی با وکیل مهاجرت مشورت کنید.
            </p>
          </div>

          {/* --- تمکن مالی --- */}
          <div id="finance" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Wallet className="h-6 w-6 text-teal-400" /> تمکن مالی ۲۰۲۶ — چقدر پول لازم است؟
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              آستانه تمکن مالی بر پایه <strong className="text-white">IPREM (شاخص درآمد چندمنظوره عمومی)</strong>
              تعیین می‌شود. برای سال ۲۰۲۶، IPREM ماهانه <strong>€۶۰۰</strong> (سالانه €۷,۲۰۰) است.
              متقاضی اصلی باید ۱۰۰٪ آن را اثبات کند.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-4">
              <table className="w-full text-xs md:text-sm text-right">
                <thead className="bg-white/5 text-teal-300 font-bold">
                  <tr>
                    <th className="p-3">عضو خانواده</th>
                    <th className="p-3">مبلغ ماهانه</th>
                    <th className="p-3">مبلغ سالانه</th>
                    <th className="p-3">درصد IPREM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {financialRows.map((row, i) => (
                    <tr key={i}>
                      <td className="p-3 text-slate-200 flex items-center gap-2">
                        <row.icon className="h-4 w-4 text-teal-400" />{row.member}
                      </td>
                      <td className="p-3 font-black text-amber-300">{row.amount}</td>
                      <td className="p-3 text-slate-300">{row.yearly}</td>
                      <td className="p-3 text-slate-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-400/20">
              <p className="text-[11px] text-teal-200 leading-relaxed">
                <strong>نکته:</strong> این مبلغ علاوه بر شهریه است و باید از طریق پرینت حساب بانکی ۶ ماهه
                (با گردش مالی مناسب) یا اسناد رسمی دیگر (مانند تعهد مالی والدین) قابل اثبات باشد.
              </p>
            </div>
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

          {/* --- مسیر آینده --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-emerald-400" /> پس از پایان دوره زبان چه می‌شود؟
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              ویزای زبان حداکثر ۲ سال (با یک بار تمدید) اعتبار دارد. پس از آن، چند مسیر پیش روی شماست:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                <h3 className="text-xs font-bold text-emerald-200 mb-2">۱) تبدیل به اقامت کاری</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  طبق ماده ۱۹۰ RD 1155/2024، با داشتن پیشنهاد شغلی، می‌توانید وضعیت خود را به اقامت کاری
                  تغییر دهید. دیگر نیازی به ۳ سال اقامت قبلی نیست و از زمان پذیرش درخواست می‌توانید
                  全职 کار کنید.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/20">
                <h3 className="text-xs font-bold text-sky-200 mb-2">۲) ادامه تحصیل در آموزش عالی</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  با ثبت‌نام در دانشگاه یا FP، ویزای جدید با حق کار خودکار ۳۰ ساعته دریافت می‌کنید.
                  این مسیر برای کسانی مناسب است که می‌خواهند مدرک رسمی بگیرند.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-400/20">
                <h3 className="text-xs font-bold text-indigo-200 mb-2">۳) ویزای دیجیتال نوماد</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  اگر دورکار هستید و از خارج اسپانیا درآمد دارید، می‌توانید به ویزای دیجیتال نوماد
                  تغییر وضعیت دهید (بدون محدودیت ۳۰ ساعت و با مالیات بکهام).
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                <h3 className="text-xs font-bold text-amber-200 mb-2">۴) بازگشت یا کشور سوم</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  اگر هدف فقط یادگیری زبان بوده، می‌توانید به کشور خود بازگردید یا از تجربه شینگن
                  برای مهاجرت به کشور دیگری استفاده کنید.
                </p>
              </div>
            </div>
          </div>

          {/* --- نتیجه‌گیری --- */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Globe2 className="h-6 w-6 text-amber-400" /> نتیجه‌گیری
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              ویزای زبان اسپانیا با تمکن مالی <strong className="text-white">€۶۰۰ در ماه</strong>،
              کالج‌های معتبر <strong className="text-white">Instituto Cervantes</strong> و مسیر روشن به
              اقامت کاری، گزینه‌ای عالی برای یادگیری زبان و ورود به اروپاست. اما کلید موفقیت،
              <strong className="text-amber-300">درک صحیح محدودیت‌های حق کار</strong> و برنامه‌ریزی
              واقع‌بینانه مالی است. اگر هدف شما کار در حین تحصیل است، مسیرهای جایگزین (FP یا دیجیتال نوماد)
              را جدی بگیرید. تیم دیاکو می‌تواند در انتخاب مسیر مناسب و آماده‌سازی پرونده کنار شما باشد.
            </p>
          </div>
        </div>
      </article>

      {/* ============================================================
          ماشین‌حساب هزینه و درآمد
         ============================================================ */}
      <section id="calculator" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <Calculator className="h-4 w-4" /> ماشین‌حساب ۲۰۲۶
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">برآورد شهریه، هزینه زندگی و درآمد</h2>
            <p className="text-xs text-slate-400 mt-1">توجه: این محاسبه بر اساس سناریوی خوش‌بینانه (دریافت مجوز کار) است.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">انتخاب شهر:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'valencia', label: 'والنسیا' },
                  { id: 'madrid', label: 'مادرید' },
                  { id: 'barcelona', label: 'بارسلونا' },
                ].map((c) => (
                  <button key={c.id} type="button" onClick={() => setCity(c.id as any)}
                    className={`p-2 rounded-xl text-xs font-bold transition border ${
                      city === c.id ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-black/30 border-white/10 text-slate-300 hover:border-white/20'
                    }`}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                ساعت کار در هفته (در صورت اخذ مجوز): {workHours} ساعت
              </label>
              <input type="range" min="0" max="30" value={workHours}
                onChange={(e) => setWorkHours(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer mt-2" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 bg-black/30 rounded-2xl p-5 border border-white/10">
            <div className="text-center sm:border-l border-white/10 sm:pl-3">
              <span className="text-[11px] text-slate-400 block">شهریه ۱ سال کالج</span>
              <span className="text-xl font-black text-amber-400 block mt-1">{calc.tuition.toLocaleString('fa-IR')} یورو</span>
            </div>
            <div className="text-center sm:border-l border-white/10 sm:pl-3">
              <span className="text-[11px] text-slate-400 block">درآمد ماهانه (در صورت مجوز)</span>
              <span className="text-xl font-black text-emerald-400 block mt-1">+{calc.monthlyIncome.toLocaleString('fa-IR')} یورو</span>
            </div>
            <div className="text-center">
              <span className="text-[11px] text-slate-400 block">تراز ماهانه</span>
              <span className={`text-xl font-black block mt-1 ${calc.netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {calc.netBalance >= 0 ? '+' : ''}{calc.netBalance.toLocaleString('fa-IR')} یورو
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          مزایا و معایب
         ============================================================ */}
      <section id="pros-cons" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><TrendingUp className="h-4 w-4" /> ارزیابی صادقانه</span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">مزایا و معایب ویزای زبان اسپانیا</h2>
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
                <h3 className="text-lg font-black text-red-300">معایب ({cons.length})</h3>
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

      {/* ============================================================
          نمونه ویزاهای صادرشده
         ============================================================ */}
      <section id="samples" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><Award className="h-4 w-4" /> سابقه موفق</span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">نمونه ویزاهای صادرشده هلدینگ دیاکو — ۲۰۲۶</h2>
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
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider">Sample Student Visa</div>
                    <div className="text-sm font-black text-white">{v.course}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><div className="text-[10px] text-slate-500">متقاضی</div><div className="font-bold text-white">{v.name}</div></div>
                    <div><div className="text-[10px] text-slate-500">شهر</div><div className="font-bold text-white flex items-center gap-1"><MapPin className="h-3 w-3 text-amber-400" />{v.city}</div></div>
                    <div><div className="text-[10px] text-slate-500">کالج</div><div className="font-bold text-white text-[10px]">{v.school}</div></div>
                    <div><div className="text-[10px] text-slate-500">نوع ویزا</div><div className="font-bold text-amber-300 text-[10px]">{v.duration}</div></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 text-center mt-4">* اطلاعات برای حفظ حریم خصوصی متقاضیان اصلاح شده است.</p>
        </div>
      </section>

      {/* ============================================================
          نظرات تفصیلی
         ============================================================ */}
      <section id="reviews" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><Star className="h-4 w-4" /> تجربه واقعی</span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">نظر دو متقاضی موفق دیاکو</h2>
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

      {/* ============================================================
          FAQ
         ============================================================ */}
      <section id="faq" className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">پرسش‌های متداول ۲۰۲۶</h2>
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

      {/* ============================================================
          مقالات مرتبط
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-center mb-6">مقالات مرتبط</h2>
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

      {/* ============================================================
          CTA نهایی
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-amber-400/5 to-transparent p-6 md:p-10 text-center">
          <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-black mb-2">ثبت‌نام در کالج‌های زبان اسپانیا با نظارت دیاکو</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            کارشناسان دیاکو شرایط شما را ارزیابی می‌کنند، بهترین کالج را انتخاب می‌کنند و پرونده ویزا را
            از ابتدا تا دریافت کارت TIE همراهی می‌کنند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110">
              شروع ارزیابی رایگان
            </button>
            <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold hover:bg-white/10 inline-flex items-center gap-2">
              <Copy className="h-4 w-4 text-amber-400" />
              {copiedPhone ? 'شماره کپی شد!' : 'دپارتمان اسپانیا: ۰۲۱۹۱۶۹۳۹۵۵'}
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          فوتر
         ============================================================ */}
      <footer className="border-t border-white/10 bg-[#041418]">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3"><Languages className="h-6 w-6 text-amber-400" /><span className="font-black">دیاکو</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">هلدینگ مهاجرتی دیاکو — خدمات تخصصی دوره‌های زبان و ویزای دانشجویی اسپانیا.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#article" className="hover:text-amber-300">مقاله</a></li>
                <li><a href="#work-rights" className="hover:text-amber-300">حق کار</a></li>
                <li><a href="#finance" className="hover:text-amber-300">تمکن مالی</a></li>
                <li><a href="#calculator" className="hover:text-amber-300">ماشین‌حساب</a></li>
                <li><a href="#faq" className="hover:text-amber-300">سوالات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">تماس با ما</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>دپارتمان اسپانیا: ۰۲۱۹۱۶۹۳۹۵۵</li>
                <li>واتساپ: ۰۹۱۹۷۳۴۰۸۲۹</li>
                <li>ایمیل: info@dia-co.ir</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">شبکه‌های اجتماعی</h4>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <a href="https://instagram.com" className="hover:text-amber-300">اینستاگرام</a>
                <a href="https://wa.me/989197340829" className="hover:text-amber-300">واتساپ</a>
                <a href="https://t.me" className="hover:text-amber-300">تلگرام</a>
              </div>
              <p className="text-[10px] text-slate-500 mt-4">© ۲۰۲۶ دیاکو. تمامی حقوق محفوظ است.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================
          نوار CTA شناور موبایل
         ============================================================ */}
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

export default LanguageSpainPage;