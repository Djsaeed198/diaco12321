import OptimizedImage from '../OptimizedImage';
import React, { useState, useMemo } from 'react';
import {
  Home,
  FileCheck2,
  CreditCard,
  HeartPulse,
  CreditCard as IdCard,
  Users2,
  GraduationCap,
  Languages,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Building2,
  MapPin,
  Calendar,
  AlertTriangle,
  PhoneCall,
  Sparkles,
  ExternalLink,
  Calculator,
  ListTodo,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';
import type { PageType } from '../Header';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

// ============================================================
// 🖼️ تصاویر بهینه‌شده و اختصاصی خدمات پس از ورود اروپا
// ============================================================
const AFTER_ARRIVAL_IMAGES = {
  hero: {
    src: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    alt: 'نمای شهر وین اتریش و استقرار متقاضیان در پایتخت کیفیت زندگی جهان',
    width: 1200,
    height: 675,
  },
  housing: {
    src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    alt: 'آپارتمان مسکونی لوکس و استاندارد در اروپا — قرارداد اجاره رسمی Mietvertrag',
    width: 800,
    height: 533,
  },
  registration: {
    src: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    alt: 'اسناد و ثبت آدرس رسمی در شهرداری Meldezettel اتریش و آلمان',
    width: 800,
    height: 533,
  },
  banking: {
    src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    alt: 'افتتاح حساب بانکی ارزی یورو و کارت مسترکارت در بانک‌های معتبر اروپا',
    width: 800,
    height: 533,
  },
  healthcare: {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    alt: 'خدمات بیمه درمانی دولتی و کارت سلامت e-Card اتریش',
    width: 800,
    height: 533,
  },
  school: {
    src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    alt: 'محیط آموزشی مدرن و ثبت‌نام کودکان در مدارس اروپایی و بین‌المللی',
    width: 800,
    height: 533,
  },
};

// ============================================================
// 🔍 داده‌های ساختاریافته AIO و SEO (Schema.org)
// ============================================================
function buildStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'خدمات پس از ورود و استقرار در اروپا ۲۰۲۶ | هلدینگ بین‌المللی دیاکو',
        description:
          'راهنمای جامع خدمات پس از ورود (After-Arrival Services) در اتریش، آلمان و اروپا: اجاره مسکن رسمی، ثبت ملدزتل (Meldezettel)، افتتاح حساب بانکی، بیمه درمانی، دریافت کارت اقامت و ثبت‌نام مدارس.',
        inLanguage: 'fa',
        image: AFTER_ARRIVAL_IMAGES.hero.src,
        author: {
          '@type': 'Organization',
          name: 'هلدینگ مهاجرتی دیاکو',
          url: 'https://www.dia-co.ir/',
        },
        publisher: {
          '@type': 'Organization',
          name: 'هلدینگ مهاجرتی دیاکو',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.dia-co.ir/logo.png',
          },
        },
        datePublished: '2026-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.speakable-summary', '#after-arrival-faq'],
        },
      },
      {
        '@type': 'Service',
        name: 'خدمات پس از ورود و استقرار مهاجرتی در اروپا',
        serviceType: 'Immigration Relocation and After-Arrival Concierge',
        provider: {
          '@type': 'Organization',
          name: 'هلدینگ مهاجرتی دیاکو',
          telephone: '+98-21-91693955',
          email: 'info@dia-co.ir',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'AT',
            addressLocality: 'Vienna',
          },
        },
        areaServed: ['Austria', 'Germany', 'Spain', 'Italy', 'France', 'Netherlands'],
        description:
          'پشتیبانی جامع حقوقی، ملکی و اداری در اتریش و آلمان شامل اجاره مسکن قانونی، ثبت شهرداری، حساب بانکی، بیمه، دریافت کارت اقامت و پیوست خانواده.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'ثبت ملدزتل (Meldezettel) در اتریش چقدر مهلت دارد و چه مدارکی نیاز است؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'طبق قانون ثبت احوال اتریش (Meldegesetz)، هر متقاضی موظف است ظرف ۳ روز کاری پس از استقرار در مسکن، به نزدیک‌ترین اداره ثبت شهرداری (Meldeamt) مراجعه و برگه Meldezettel را با امضای مالک (Unterkunftgeber) ثبت نماید.',
            },
          },
          {
            '@type': 'Question',
            name: 'آیا برای افتتاح حساب بانکی در اتریش داشتن اقامت الزامی است؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'برای حساب‌های جاری رسمی (Girokonto)، پاسپورت معتبر، ویزای نوع D یا کارت اقامت، برگه ثبت آدرس (Meldezettel) و اثبات منشأ وجوه قانونی لازم است. وکلای دیاکو در بانک‌های Erste Bank و Raiffeisen همراه حضوری متقاضیان هستند.',
            },
          },
          {
            '@type': 'Question',
            name: 'مدت زمان دریافت کارت فیزیکی اقامت (eAT / RWR) در اداره مهاجرت چقدر است؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'پس از حضور در اداره مهاجرت (نظیر MA35 در وین یا Ausländerbehörde در آلمان) و ثبت اثر انگشت و امضا، کارت فیزیکی بیومتریک معمولاً ظرف ۲ الی ۳ هفته صادر و به متقاضی تحویل داده می‌شود.',
            },
          },
          {
            '@type': 'Question',
            name: 'آیا فرزندان بدون تسلط به زبان آلمانی می‌توانند در مدارس دولتی اتریش ثبت‌نام شوند؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'بله، طبق نظام آموزشی اتریش، دانش‌آموزان بین‌المللی ابتدا به عنوان دانش‌آموز فوق‌العاده (Außerordentliche Schüler) در کلاس‌های ویژه تقویت زبان آلمانی (Deutschförderklasse) شرکت می‌کنند و پس از تسلط به مقطع عادی منتقل می‌شوند.',
            },
          },
        ],
      },
    ],
  };
}

// ============================================================
// 📋 ارکان هشت‌گانه خدمات پس از ورود دیاکو
// ============================================================
const AFTER_ARRIVAL_PILLARS = [
  {
    id: 'housing',
    title: 'اجاره مسکن رسمی و استاندارد',
    germanTitle: 'Wohnungssuche & Mietvertrag',
    icon: Home,
    tag: 'پیش‌نیاز کارت اقامت',
    highlight: 'متراژ قانونی متناسب با تعداد افراد',
    summary:
      'اخذ قرارداد اجاره قانونی (Hauptmietvertrag) با تاییدیه مالک برای دریافت تاییدیه اقامت از اداره مهاجرت اتریش و آلمان.',
    details: [
      'بررسی و تطابق متراژ مسکن بر اساس مقررات اداره مهاجرت (حداقل ۳۵ متر برای مجرد، ۱۰ متر اضافی برای هر عضو خانواده)',
      'تنظیم قرارداد اجاره رسمی با ذکر کلیه هزینه‌های پایه (Hauptmietzins) و شارژ ماهانه (Betriebskosten)',
      'اخذ امضای فرم تاییدیه محل سکونت توسط مالک (Bestätigung des Unterkunftgebers)',
      'همراهی در جلسه تحویل کلید و تنظیم صورت‌جلسه رسمی وضعیت آپارتمان (Wohnungsübergabeprotokoll)',
    ],
    tips: 'هشدار: اجاره‌های موقت غیررسمی بدون اجازه ثبت آدرس از سوی اداره مهاجرت رد می‌شوند.',
  },
  {
    id: 'meldezettel',
    title: 'ثبت آدرس و شهرداری',
    germanTitle: 'Meldezettel / Anmeldung',
    icon: FileCheck2,
    tag: 'مهلت ۳ روز کاری',
    highlight: 'اخذ برگه رسمی احراز هویت شهری',
    summary:
      'انجام ثبت قانونی محل سکونت در شهرداری وین یا شهرهای آلمان ظرف مهلت مقرر قانونی جهت فعال‌سازی تمام حقوق مدنی.',
    details: [
      'تکمیل دقیق فرم‌های رسمی اداره ثبت احوال شهر (Meldezettel در اتریش / Wohnungsgeberbestätigung در آلمان)',
      'رزرو نوبت فوری در منطقه مربوطه (Magistratisches Bezirksamt)',
      'دریافت گواهی رسمی ثبت اقامت معتبر جهت ارائه به بانک، اداره کار و مدارس',
      'ثبت تغییر آدرس در صورت جابجایی آتی و دریافت برگه ابطال سکونت قبلی (Abmeldung)',
    ],
    tips: 'برگه Meldezettel اولین و ضروری‌ترین سندی است که بانک‌ها و ادارات دولتی از شما مطالبه می‌کنند.',
  },
  {
    id: 'banking',
    title: 'افتتاح حساب بانکی یورو',
    germanTitle: 'Bankkonto Eröffnung (IBAN)',
    icon: CreditCard,
    tag: 'حساب جاری + مسترکارت',
    highlight: 'انتقال امن سرمایه و دریافت حقوق',
    summary:
      'افتتاح حساب شخصی و شرکتی در معتبرترین بانک‌های اتریش و آلمان به همراه اینترنت‌بانک و کارت‌های بین‌المللی.',
    details: [
      'همراهی حضوری کارشناس و وکیل دیاکو در شعب بانک‌های معتبر نظیر Erste Bank، Bank Austria و Raiffeisen',
      'تنظیم مستندات اثبات منشأ قانونی پول (Source of Funds) طبق قوانین ضد پولشویی اتحادیه اروپا (AML)',
      'دریافت شماره بین‌المللی شبا (IBAN اتریشی با پیشوند AT یا آلمانی DE) در همان جلسه',
      'فعال‌سازی اپلیکیشن‌های بانکداری مدرن و سفارش کارت‌های نقدی و اعتباری مسترکارت/ویزا',
    ],
    tips: 'به دلیل قوانین سخت‌گیرانه تطبیق اروپایی، حضور وکیل در بانک روند افتتاح را به زیر ۱ ساعت می‌رساند.',
  },
  {
    id: 'insurance',
    title: 'بیمه درمانی و سلامت اروپا',
    germanTitle: 'Krankenversicherung & e-Card',
    icon: HeartPulse,
    tag: 'پوشش ۱۰۰٪ خدمات درمانی',
    highlight: 'صدور کارت سلامت بیومتریک',
    summary:
      'ثبت‌نام در سازمان بیمه تامین اجتماعی دولتی (ÖGK اتریش / TK آلمان) یا اخذ بیمه‌های بین‌المللی با پوشش کامل.',
    details: [
      'انتخاب نوع بیمه مناسب (بیمه اجباری کارمندی، خودحمایتی تمکن مالی یا بیمه دانشجویی)',
      'ثبت‌نام مستقیم در سازمان سلامت اتریش (Österreichische Gesundheitskasse) و دریافت شماره بیمه (Sozialversicherungsnummer)',
      'سفارش کارت الکترونیکی سلامت با عکس بیومتریک (e-Card)',
      'معرفی پزشکان عمومی خانواده (Hausarzt) مسلط به زبان انگلیسی و فارسی در منطقه سکونت',
    ],
    tips: 'کارت e-Card اتریش علاوه بر درمان در خاک اتریش، کارت سلامت اروپایی (EHIC) در کل ۲۷ کشور شنگن محسوب می‌شود.',
  },
  {
    id: 'card',
    title: 'دریافت فیزیکی کارت اقامت',
    germanTitle: 'Aufenthaltstitel & eAT Übergabe',
    icon: IdCard,
    tag: 'حضور وکیل در اداره مهاجرت',
    highlight: 'مراجعه به MA35 یا اداره اتباع خارجی',
    summary:
      'حضور وکیل پایه یک اتریش دیاکو در روز نوبت نهایی اداره مهاجرت، احراز هویت بیومتریک و دریافت کارت اقامت شنگن.',
    details: [
      'پیگیری لحظه‌ای وضعیت پرونده از سامانه مرکزی اداره اقامت و تابعیت اتریش',
      'حضور فیزیکی وکیل جهت رفع هرگونه ابهام یا نقص مدرک احتمالی در جلسه نهایی',
      'انجام ثبت بیومتریک اثر انگشت و ثبت امضای دیجیتال متقاضی و همراهان',
      'تحویل فیزیکی کارت کارت اقامت اقامت تمکن مالی، بلوکارت، RWR Card یا ویزای طلایی',
    ],
    tips: 'حضور وکیل در جلسه مانع از تاخیرهای اداری طولانی و سوالات غیرمنتظره افسران پرونده می‌شود.',
  },
  {
    id: 'family',
    title: 'الحاق و پیوست قانونی خانواده',
    germanTitle: 'Familienzusammenführung',
    icon: Users2,
    tag: 'همسر و فرزندان زیر ۱۸ سال',
    highlight: 'کارت اقامت همزمان برای اعضای خانواده',
    summary:
      'اقدام همزمان یا فوری برای صدور ویزای الحاق خانواده، اخذ وقت سفارت و هماهنگی مجوزهای سکونت مستقل برای فرزندان.',
    details: [
      'تنظیم پوشه حقوقی اثبات تمکن سرپرست و تامین مسکن مناسب برای کل اعضای خانواده',
      'ترجمه رسمی، تاییدیه دادگستری و وزارت امور خارجه و لگالایز مدارک هویتی (سند ازدواج و شناسنامه‌ها)',
      'مشاوره مدرک زبان آلمانی A1 همسر در موارد مشمول قانون توافق همگرایی (Integrationsvereinbarung)',
      'پیگیری سریع نوبت مصاحبه کنسولی و تحویل کارت‌های اقامت اعضای خانواده',
    ],
    tips: 'دارندگان بلوکارت و تمکن مالی می‌توانند از همان روزهای اول ورود درخواست الحاق خانواده را ثبت نمایند.',
  },
  {
    id: 'school',
    title: 'ثبت‌نام مدارس و مهدکودک فرزندان',
    germanTitle: 'Schule & Kindergarten Anmeldung',
    icon: GraduationCap,
    tag: 'آموزش رایگان دولتی و بین‌المللی',
    highlight: 'آموزشگاه‌های دوزبانه انگلیسی و آلمانی',
    summary:
      'مشاوره تحصیلی، معادل‌سازی مدارک دانش‌آموزی، ثبت‌نام در بهترین مدارس اتریش و آلمان و کلاس‌های تقویت زبان.',
    details: [
      'بررسی محدوده سکونت (Sprengel) و مکاتبه رسمی با اداره آموزش و پرورش وین (Bildungsdirektion für Wien)',
      'همراهی در مصاحبه ورودی مدرسه و ارزیابی سطح زبان کودک',
      'ثبت‌نام در دوره‌های ویژه آموزش فشرده زبان آلمانی برای دانش‌آموزان خارجی (Deutschförderklasse)',
      'معرفی مدارس بین‌المللی دوزبانه انگلیسی/آلمانی نظیر Vienna International School و مدارس دولتی ممتاز',
    ],
    tips: 'تحصیل در تمام مدارس دولتی اتریش رایگان است و دولت اتریش بسته‌های کمک‌آموزشی ویژه به دانش‌آموزان اهدا می‌کند.',
  },
  {
    id: 'language',
    title: 'دوره‌های رسمی همگرایی و زبان',
    germanTitle: 'Integrationskurse (ÖIF / BAMF)',
    icon: Languages,
    tag: 'کوپن تخفیف ۵۰٪ دولتی',
    highlight: 'آمادگی سطوح A2، B1 و حقوق شهروندی',
    summary:
      'ثبت‌نام در موسسات استاندارد صندوق همگرایی اتریش (ÖIF) با یارانه دولتی جهت تمدید اقامت و آمادگی اقامت دائم.',
    details: [
      'آزمون تعیین سطح رایگان در موسسات همکار معتبر با تاییدیه دولتی',
      'فعال‌سازی بن تخفیف شهریه موسوم به آبی کلاوسول (Blauer Bundesgutschein) برای پرداخت ۵۰٪ هزینه توسط دولت',
      'کلاس‌های سطوح A2 و B1 همراه با آموزش مباحث آشنایی با ارزش‌ها و قوانین اتریش (Werte- und Orientierungskurs)',
      'اخذ مدرک رسمی ÖIF مورد نیاز برای تمدید ۲ ساله اقامت و درخواست پاسپورت اروپایی',
    ],
    tips: 'گواهی B1 زبان و ارزش‌های مدنی برای تبدیل اقامت موقت به اقامت دائم اروپا الزامی است.',
  },
];

// ============================================================
// 📅 جدول نقشه راه ۳۰ روز طلایی ورود به اروپا
// ============================================================
const TIMELINE_STEPS = [
  {
    days: 'روز ۱ تا ۳',
    title: 'ورود به اتریش، تحویل مسکن و ملدزتل',
    desc: 'استقرار در آپارتمان اجاره‌شده رسمی، تحویل کلید و صورت‌جلسه، و مراجعه مستقیم به شهرداری جهت ثبت برگه Meldezettel.',
    icon: '📍',
    important: true,
  },
  {
    days: 'روز ۴ تا ۷',
    title: 'افتتاح حساب بانکی یورو و خط موبایل',
    desc: 'حضور در شعبه بانک همراه وکیل دیاکو، دریافت شماره IBAN، سفارش مسترکارت، و تهیه سیم‌کارت رسمی با اینترنت ۵G اروپا.',
    icon: '💳',
    important: false,
  },
  {
    days: 'هفته دوم (روز ۸ تا ۱۴)',
    title: 'بیمه سلامت و ثبت‌نام کودکان در مدرسه',
    desc: 'فعال‌سازی بیمه ÖGK و دریافت شماره تامین اجتماعی، مکاتبه با اداره آموزش و ثبت‌نام فرزندان در نزدیک‌ترین مدرسه ممتاز.',
    icon: '🏥',
    important: true,
  },
  {
    days: 'هفته سوم (روز ۱۵ تا ۲۱)',
    title: 'حضور در اداره مهاجرت (MA35) و بیومتریک',
    desc: 'حضور وکیل در وقت مصاحبه نهایی، ارائه برگه ملدزتل و بیمه، اسکن اثر انگشت و امضا جهت صدور کارت فیزیکی اقامت.',
    icon: '🪪',
    important: true,
  },
  {
    days: 'پایان ماه اول (روز ۲۲ تا ۳۰)',
    title: 'تحویل کارت اقامت و شروع کلاس‌های زبان ÖIF',
    desc: 'دریافت فیزیکی کارت اقامت شنگن، فعال‌سازی بن تخفیف ۵۰٪ دولتی دوره‌های زبان و استقرار کامل و بی‌دغدغه در اروپا.',
    icon: '🎉',
    important: false,
  },
];

export const AfterArrivalPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
}) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('housing');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // ماشین‌حساب تخمین هزینه‌های استقرار
  const [calcCountry, setCalcCountry] = useState<'austria' | 'germany' | 'spain' | 'italy'>('austria');
  const [calcFamilyMembers, setCalcFamilyMembers] = useState<number>(2);
  const [calcRentRange, setCalcRentRange] = useState<number>(1200);

  // چک‌لیست تعاملی
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'c-passport': true,
    'c-visa': true,
    'c-rent': false,
    'c-meldezettel': false,
    'c-bank': false,
    'c-insurance': false,
    'c-card': false,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const progressPercent = useMemo(() => {
    const total = Object.keys(checkedItems).length;
    const completed = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  }, [checkedItems]);

  // محاسبه تخمینی هزینه‌ها
  const estimatedCosts = useMemo(() => {
    const kaution = calcRentRange * 3; // ودیعه مسکن در اتریش و آلمان ۳ ماه اجاره سرد است
    const firstMonthRent = calcRentRange;
    const insuranceEst = calcFamilyMembers * (calcCountry === 'austria' ? 140 : 160);
    const registrationFees = calcFamilyMembers * 35;
    const misc = 450; // اینترنت، خطوط موبایل، حمل و نقل ماهانه
    const total = kaution + firstMonthRent + insuranceEst + registrationFees + misc;

    return {
      kaution,
      firstMonthRent,
      insuranceEst,
      registrationFees,
      misc,
      total,
    };
  }, [calcCountry, calcFamilyMembers, calcRentRange]);

  // سئو و AIO پیشرفته
  useSeo({
    title: 'خدمات پس از ورود و استقرار در اروپا ۲۰۲۶ | هلدینگ بین‌المللی دیاکو',
    description:
      'راهنمای کامل After-Arrival Services اروپا: اجاره مسکن رسمی، ثبت ملدزتل (Meldezettel)، افتتاح حساب بانکی یورو، بیمه درمانی ÖGK، کارت اقامت و ثبت‌نام مدارس توسط وکلای دفتر وین دیاکو.',
    keywords: [
      'خدمات پس از ورود اروپا',
      'استقرار در اتریش',
      'اجاره خانه در وین',
      'ثبت ملدزتل اتریش',
      'Meldezettel چیست',
      'افتتاح حساب بانکی اتریش',
      'بیمه درمانی OGK',
      'دریافت کارت اقامت اتریش',
      'پیوست خانواده اتریش',
      'مدارس ایرانی در وین',
      'هلدینگ دیاکو وین',
    ],
    canonical: 'https://www.dia-co.ir/after-arrival-services-europe',
    ogImage: AFTER_ARRIVAL_IMAGES.hero.src,
    ogType: 'article',
    jsonLd: buildStructuredData(),
  });

  const selectedPillar = useMemo(() => {
    return AFTER_ARRIVAL_PILLARS.find((p) => p.id === selectedPillarId) || AFTER_ARRIVAL_PILLARS[0];
  }, [selectedPillarId]);

  return (
    <div className="bg-[#061a21] text-slate-100 min-h-screen selection:bg-amber-400 selection:text-slate-900" dir="rtl">
      {/* ============================================================
          هدر صفحه و بازگشت به خانه
         ============================================================ */}
      <div className="border-b border-white/10 bg-[#07242e]/90 backdrop-blur-md sticky top-16 z-30">
        <div className="container mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
            >
              <span>←</span>
              <span>بازگشت به پرتال اصلی</span>
            </button>
            <span className="hidden sm:inline text-xs text-slate-400">/</span>
            <span className="hidden sm:inline text-xs font-bold text-amber-300">
              خدمات پس از ورود و استقرار اروپا (After-Arrival)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-xl bg-gradient-to-l from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 px-4 py-1.5 text-xs font-black shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              سنجش آنلاین شرایط اقامت ←
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          بخش Hero با هویت بصری لوکس دیاکو و تصاویر اروپا
         ============================================================ */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
        {/* پس‌زمینه‌های نوری */}
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-[130px]" />
        <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* متن اصلی */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-black text-amber-300 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <span>پشتیبانی حقوقی و حضوری دیاکو در اتریش، آلمان و اتحادیه اروپا ۲۰۲۶</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                خدمات پس از ورود و استقرار در اروپا
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-amber-300 via-amber-400 to-amber-500">
                  (After-Arrival Services)
                </span>
              </h1>

              {/* کادر Speakable AIO برای هوش مصنوعی و جستجوی گوگل */}
              <div className="speakable-summary rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-black/40 to-transparent p-5 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>پاسخ صریح و خلاصه ارزیابی هوش مصنوعی (AIO Core Summary)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  <strong>خدمات پس از ورود (After-Arrival)</strong> به مجموعه اقدامات حقوقی، ملکی و اداری گفته می‌شود که متقاضی بلافاصله پس از فرود در اروپا به آن نیاز دارد. در اتریش، قانون متقاضی را ملزم می‌کند ظرف <strong>۳ روز کاری</strong> نسبت به ثبت آدرس در شهرداری (Meldezettel) اقدام کند که مستلزم داشتن اجاره‌نامه رسمی (Mietvertrag) با متراژ مجاز است. هلدینگ دیاکو با تیم مستقر در <strong>وین، آتن و تهران</strong>، تمامی ۸ مرحله شامل اجاره مسکن، ثبت شهرداری، حساب بانکی، بیمه ÖGK، تحویل کارت فیزیکی اقامت (eAT)، الحاق خانواده و مدارس کودکان را با حضور وکلای مقیم مدیریت می‌کند.
                </p>
              </div>

              {/* برچسب‌های آمار اعتماد */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { value: '۱۰۰٪', label: 'تضمین حقوقی قرارداد مسکن' },
                  { value: '۳ روز', label: 'مهلت قانونی ثبت Meldezettel' },
                  { value: '۲،۰۰۰+', label: 'خانواده مستقر شده در اتریش' },
                  { value: '۲۴/۷', label: 'همراهی وکیل در وین' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
                    <div className="text-lg sm:text-xl font-black text-amber-400">{s.value}</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-300 mt-1 font-semibold">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#pillars-detail"
                  className="rounded-2xl bg-gradient-to-l from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-6 py-3.5 text-xs sm:text-sm shadow-glow transition hover:scale-105 active:scale-95"
                >
                  بررسی جزئیات ۸ مرحله استقرار ←
                </a>
                <a
                  href="#cost-calculator"
                  className="rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold px-5 py-3.5 text-xs sm:text-sm transition hover:scale-105"
                >
                  ماشین‌حساب هزینه‌های اولیه 💶
                </a>
              </div>
            </div>

            {/* تصویر شاخص و ویترین خدمات */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
                <OptimizedImage
                  src={AFTER_ARRIVAL_IMAGES.hero.src}
                  alt={AFTER_ARRIVAL_IMAGES.hero.alt}
                  width={AFTER_ARRIVAL_IMAGES.hero.width}
                  height={AFTER_ARRIVAL_IMAGES.hero.height}
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-[#061a21]/40 to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-amber-300">دفتر مرکزی وین (Vienna HQ)</p>
                      <p className="text-[11px] text-slate-300 mt-0.5">همراهی گام‌به‌گام از لحظه ورود به فرودگاه شوخات وین</p>
                    </div>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400 text-slate-900 text-xl font-black">
                      🇦🇹
                    </span>
                  </div>
                </div>
              </div>

              {/* کارت معلق اطمینان */}
              <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-black/80 backdrop-blur-xl p-3.5 shadow-xl">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400 text-xl">
                  ✓
                </span>
                <div>
                  <p className="text-xs font-bold text-white">بدون اتلاف وقت و دغدغه زبان</p>
                  <p className="text-[10px] text-emerald-300">حضور وکلای رسمی دادگستری اتریش در کنار شما</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ارکان هشت‌گانه خدمات پس از ورود (Interactive Tabs & Deep Dive)
         ============================================================ */}
      <section id="pillars-detail" className="py-20 bg-[#07242e]/60 border-t border-white/10 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300">
              <Building2 className="h-4 w-4" />
              <span>پوشش ۳۶۰ درجه‌ای نیازهای خانواده در خاک اروپا</span>
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-black text-white">
              ارکان هشت‌گانه استقرار و آرامش در اروپا
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              هر یک از این بخش‌ها توسط وکلای رسمی و کارشناسان استقرار دیاکو در کشور مقصد پیگیری و تضمین می‌شود.
            </p>
          </div>

          {/* تب‌های انتخاب خدمت */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-10">
            {AFTER_ARRIVAL_PILLARS.map((p) => {
              const IconComp = p.icon;
              const isSelected = p.id === selectedPillarId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPillarId(p.id)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-2xl p-3.5 text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border border-amber-400 bg-amber-400/20 text-white shadow-glow scale-[1.03]'
                      : 'border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  <IconComp className={`h-6 w-6 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span className="text-[11px] font-bold leading-tight">{p.title}</span>
                </button>
              );
            })}
          </div>

          {/* محتوای عمیق رکن انتخاب‌شده */}
          <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-white/[0.06] to-black/60 p-6 md:p-10 backdrop-blur-xl shadow-2xl">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 space-y-4 text-right">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-3 py-1 text-xs font-black text-amber-300">
                    {selectedPillar.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-400" dir="ltr">
                    [{selectedPillar.germanTitle}]
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {selectedPillar.title}
                </h3>

                <p className="text-sm font-bold text-amber-300">
                  ویژگی کلیدی: {selectedPillar.highlight}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedPillar.summary}
                </p>

                {/* فهرست وظایف دیاکو */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-black text-white">خدمات و پروتکل‌های اجرایی هلدینگ دیاکو در این بخش:</p>
                  <ul className="space-y-2">
                    {selectedPillar.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* نکته کلیدی حقوقی */}
                <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-xs text-amber-200 leading-6 flex items-start gap-2.5">
                  <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                  <span><strong>نکته حقوقی وکلای دیاکو:</strong> {selectedPillar.tips}</span>
                </div>
              </div>

              {/* تصویر مرتبط با رکن */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden border border-white/20 shadow-xl relative group">
                  <OptimizedImage
                    src={
                      selectedPillar.id === 'housing'
                        ? AFTER_ARRIVAL_IMAGES.housing.src
                        : selectedPillar.id === 'meldezettel'
                        ? AFTER_ARRIVAL_IMAGES.registration.src
                        : selectedPillar.id === 'banking'
                        ? AFTER_ARRIVAL_IMAGES.banking.src
                        : selectedPillar.id === 'insurance'
                        ? AFTER_ARRIVAL_IMAGES.healthcare.src
                        : selectedPillar.id === 'school'
                        ? AFTER_ARRIVAL_IMAGES.school.src
                        : AFTER_ARRIVAL_IMAGES.hero.src
                    }
                    alt={selectedPillar.title}
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4">
                    <p className="text-xs font-black text-white">{selectedPillar.title}</p>
                    <p className="text-[10px] text-amber-300 font-medium">نظارت مستقیم تیم اجرایی دفتر وین و تهران دیاکو</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          جدول زمانی نقشه راه ۳۰ روز طلایی ورود (Golden 30 Days)
         ============================================================ */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-bold text-cyan-300">
              <Calendar className="h-4 w-4" />
              <span>جدول زمانی استقرار بدون استرس</span>
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-black text-white">
              نقشه راه ۳۰ روز طلایی پس از ورود به اروپا
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              این برنامه زمان‌بندی دقیق از سردرگمی، جریمه‌های اداری و تاخیر در دریافت کارت اقامت جلوگیری می‌نماید.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {TIMELINE_STEPS.map((step, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border p-5 backdrop-blur-xl transition-all ${
                  step.important
                    ? 'border-amber-400/40 bg-gradient-to-l from-amber-500/10 to-transparent'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-2xl shadow-inner border border-white/10">
                    {step.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-amber-400 text-slate-900 px-2.5 py-0.5 text-[10px] font-black">
                        {step.days}
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-white">{step.title}</h4>
                    </div>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-2xl">{step.desc}</p>
                  </div>
                </div>

                <span className="shrink-0 text-[11px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-1">
                  همراهی تیم دیاکو ✓
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          ماشین‌حساب برآورد هزینه‌های استقرار اولیه در اروپا (Calculator)
         ============================================================ */}
      <section id="cost-calculator" className="py-20 bg-[#07242e]/70 border-t border-white/10 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300">
              <Calculator className="h-4 w-4" />
              <span>شفافیت مالی و برآورد هوشمند</span>
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-black text-white">
              ماشین‌حساب تخمین هزینه‌های ماه اول استقرار در اروپا ۲۰۲۶
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              محاسبه تقریبی هزینه‌های مسکن، ودیعه قانونی (Kaution)، بیمه، ثبت شهرداری و هزینه‌های جاری بدو ورود.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-12 bg-black/40 rounded-3xl border border-white/15 p-6 md:p-8 backdrop-blur-xl">
            {/* تنظیمات ورودی */}
            <div className="lg:col-span-6 space-y-5 text-right">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">کشور مقصد:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'austria', label: '🇦🇹 اتریش (وین)' },
                    { id: 'germany', label: '🇩🇪 آلمان (برلین/مونیخ)' },
                    { id: 'spain', label: '🇪🇸 اسپانیا (مادرید)' },
                    { id: 'italy', label: '🇮🇹 ایتالیا (میلان/رم)' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCalcCountry(c.id as any)}
                      className={`rounded-xl p-2.5 text-xs font-bold transition cursor-pointer ${
                        calcCountry === c.id
                          ? 'bg-amber-400 text-slate-900 font-black shadow-glow'
                          : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  تعداد اعضای خانواده: <span className="text-amber-400 font-mono font-bold">{calcFamilyMembers} نفر</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={calcFamilyMembers}
                  onChange={(e) => setCalcFamilyMembers(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  بودجه تخمینی اجاره ماهانه مسکن: <span className="text-amber-400 font-mono font-bold">€{calcRentRange.toLocaleString('fa-IR')}</span>
                </label>
                <input
                  type="range"
                  min={800}
                  max={3000}
                  step={50}
                  value={calcRentRange}
                  onChange={(e) => setCalcRentRange(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono" dir="ltr">
                  <span>€800 (استودیو)</span>
                  <span>€3,000 (آپارتمان خانوادگی ۳ خوابه)</span>
                </div>
              </div>
            </div>

            {/* نتیجه محاسبه */}
            <div className="lg:col-span-6 rounded-2xl bg-white/[0.04] border border-amber-400/30 p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-300">ریز برآورد هزینه‌های استقرار ماه اول:</span>
                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between pb-2 border-b border-white/10">
                    <span className="text-slate-300">ودیعه مسکن (Kaution - معمولاً ۳ ماه):</span>
                    <span className="font-mono font-bold text-white">€{estimatedCosts.kaution.toLocaleString('fa-IR')}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/10">
                    <span className="text-slate-300">اجاره ماه اول:</span>
                    <span className="font-mono font-bold text-white">€{estimatedCosts.firstMonthRent.toLocaleString('fa-IR')}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/10">
                    <span className="text-slate-300">بیمه درمانی ماه اول ({calcFamilyMembers} نفر):</span>
                    <span className="font-mono font-bold text-white">€{estimatedCosts.insuranceEst.toLocaleString('fa-IR')}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/10">
                    <span className="text-slate-300">عوارض اداری و ثبت شهرداری:</span>
                    <span className="font-mono font-bold text-white">€{estimatedCosts.registrationFees.toLocaleString('fa-IR')}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/10">
                    <span className="text-slate-300">سیم‌کارت، اینترنت و حمل‌ونقل شهری:</span>
                    <span className="font-mono font-bold text-white">€{estimatedCosts.misc.toLocaleString('fa-IR')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-400/40 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-white">مجموع بودجه پیشنهادی ماه اول:</span>
                  <span className="text-xl font-black text-amber-400 font-mono">
                    €{estimatedCosts.total.toLocaleString('fa-IR')}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-slate-400 leading-4">
                  * ودیعه مسکن (Kaution) پس از پایان دوره قرارداد به حساب شما بازگردانده می‌شود و هزینه قطعی محسوب نمی‌شود.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          چک‌لیست تعاملی مدارک و اقدامات بدو ورود
         ============================================================ */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto rounded-3xl border border-white/15 bg-black/40 p-6 md:p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <ListTodo className="h-6 w-6 text-amber-400" />
                <h3 className="text-lg sm:text-xl font-black text-white">
                  چک‌لیست تعاملی اقدامات بدو ورود متقاضی
                </h3>
              </div>
              <span className="text-xs font-black text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
                پیشرفت: {progressPercent}٪
              </span>
            </div>

            {/* نوار پیشرفت */}
            <div className="w-full bg-white/10 rounded-full h-2 mb-6 overflow-hidden">
              <div
                className="bg-gradient-to-l from-amber-400 to-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="space-y-3">
              {[
                { id: 'c-passport', text: 'پاسپورت معتبر با حداقل ۶ ماه اعتبار پس از اتمام ویزا' },
                { id: 'c-visa', text: 'ویزای تایپ D معتبر یا ابلاغیه رسمی موافقت اداره اقامت' },
                { id: 'c-rent', text: 'قرارداد اجاره رسمی مسکن (Mietvertrag) با متراژ قانونی' },
                { id: 'c-meldezettel', text: 'ثبت آدرس در شهرداری (Meldezettel) ظرف ۳ روز اول ورود' },
                { id: 'c-bank', text: 'افتتاح حساب جاری یورو و دریافت کارت بانکی در شعبه وین' },
                { id: 'c-insurance', text: 'ثبت‌نام بیمه تامین اجتماعی ÖGK و دریافت شماره بیمه' },
                { id: 'c-card', text: 'حضور در اداره مهاجرت MA35 جهت اسکن بیومتریک و دریافت کارت اقامت' },
              ].map((item) => {
                const isDone = Boolean(checkedItems[item.id]);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleCheck(item.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-right transition cursor-pointer ${
                      isDone
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-white'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-semibold">{item.text}</span>
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-lg text-xs font-black ${
                        isDone ? 'bg-emerald-400 text-slate-900' : 'bg-white/10 text-slate-500'
                      }`}
                    >
                      {isDone ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          بخش سوالات متداول سئو و AIO (FAQ)
         ============================================================ */}
      <section id="after-arrival-faq" className="py-20 bg-[#07242e]/60 border-t border-white/10 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300">
              <HelpCircle className="h-4 w-4" />
              <span>پرسش‌های پرتکرار متقاضیان و تحلیل موتورهای هوش مصنوعی</span>
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-black text-white">
              سوالات متداول خدمات پس از ورود و استقرار در اروپا
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: 'آیا بدون ثبت آدرس در شهرداری (Meldezettel) می‌توان حساب بانکی باز کرد؟',
                a: 'خیر، بر اساس بخشنامه‌های بانک مرکزی اروپا و سازمان مبارزه با پولشویی (AML)، هیچ بانک رسمی اروپایی بدون ارائه برگه معتبر ثبت سکونت در همان حوزه قضایی، اجازه افتتاح حساب جاری (Girokonto) نخواهد داد. به همین دلیل اولین اقدام تیم دیاکو، ثبت شهرداری در روز اول ورود است.',
              },
              {
                q: 'اگر متراژ خانه کمتر از حد استاندارد اداره مهاجرت باشد چه اتفاقی می‌افتد؟',
                a: 'اداره اقامت اتریش (NAG Behörde) پرونده صدور کارت اقامت را به دلیل عدم انطباق مسکن (Unzureichende Wohnverhältnisse) متوقف یا رد خواهد کرد. کارشناسان املاک دیاکو تنها خانه‌هایی را تایید و اجاره می‌کنند که استانداردهای دقیق متراژ قانونی اداره مهاجرت را دارا باشند.',
              },
              {
                q: 'چگونه می‌توان پس از ورود همسر و فرزندان را به اتریش یا آلمان ملحق کرد؟',
                a: 'فرآیند الحاق خانواده (Familienzusammenführung) نیازمند اثبات حقوق کافی سرپرست، ارائه اجاره‌نامه با متراژ مناسب برای کل اعضا و در اتریش مدرک زبان A1 آلمانی برای همسر است. تیم دیاکو پرونده الحاق را از همان ماه‌های ابتدایی هماهنگ می‌کند.',
              },
              {
                q: 'آیا کودکان بلافاصله پس از ورود امکان ورود به مدارس دولتی را دارند؟',
                a: 'بله، آموزش در اتریش تا سن ۱۵ سالگی اجباری و در مدارس دولتی کاملاً رایگان است. پس از اخذ برگه Meldezettel، تیم دیاکو با اداره آموزش منطقه مکاتبه کرده و ثبت‌نام کودک حتی بدون دانش قبلی زبان آلمانی انجام می‌گیرد.',
              },
              {
                q: 'دفتر وین هلدینگ دیاکو چه خدماتی را به صورت حضوری ارائه می‌دهد؟',
                a: 'دفتر مرکزی وین به همراه وکلای پایه یک اتریش، استقبال در فرودگاه، همراهی در جلسات تحویل خانه، ثبت شهرداری در مناطق وین، مراجعه مشترک به بانک، هماهنگی بیمه، و حضور فیزیکی وکیل در اداره MA35 را مستقیماً مدیریت می‌نمایند.',
              },
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-right font-bold text-white hover:text-amber-300 transition cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-6 border-t border-white/5 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          بخش فراخوان اقدام (CTA) و مشاوره مستقیم با دفتر وین
         ============================================================ */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative rounded-3xl border border-amber-400/40 bg-gradient-to-r from-amber-500/20 via-[#07242e] to-black/80 p-8 md:p-12 text-center backdrop-blur-2xl shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-400/40 px-4 py-1.5 text-xs font-bold text-amber-300">
                <ShieldCheck className="h-4 w-4" />
                <span>شروع استقرار بدون ریسک در خاک اروپا</span>
              </span>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-snug">
                آرامش خاطر شما و خانواده‌تان در بدو ورود به اروپا
              </h3>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                وکلای پایه یک و کارشناسان هلدینگ دیاکو در وین و تهران، از اولین دقیقه ورود تا دریافت کارت اقامت و استقرار فرزندان در مدارس در کنار شما هستند.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-7 py-3.5 text-xs sm:text-sm font-black text-slate-950 shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  درخواست رزرو پکیج استقرار و خدمات پس از ورود ←
                </button>
                <a
                  href="tel:02191693955"
                  dir="ltr"
                  className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 text-xs sm:text-sm transition flex items-center gap-2"
                >
                  <PhoneCall className="h-4 w-4 text-amber-400" />
                  <span>021-91693955</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AfterArrivalPage;
