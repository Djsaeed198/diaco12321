import OptimizedImage from '../OptimizedImage';
import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Building2,
  GraduationCap,
  Briefcase,
  Users,
  ShieldCheck,
  FileText,
  DollarSign,
  ChevronDown,
  HelpCircle,
  ExternalLink,
  PhoneCall,
  MessageCircle,
  Compass,
  Star,
  Check,
  Copy,
  Sparkles,
} from 'lucide-react';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey?: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary') => void;
}

// ✅ 2026 年德国蓝卡官方薪资阈值（根据 make-it-in-germany.com 与 AufenthG §18g 更新）
const SALARY_THRESHOLDS_2026 = {
  regularAnnual: 50700, // 常规职业：€50,700 / 年
  shortageAnnual: 45934.2, // 短缺职业（IT/STEM/医疗等）：€45,934.20 / 年
  itWithoutDegreeAnnual: 45934.2, // IT 无学位（3 年经验）：同短缺职业阈值
};

// ============================================================
// 🔍 AIO / SEO 结构化数据构建函数
// ============================================================
function buildStructuredData() {
  const faqs = [
    {
      q: 'آیا برای دریافت بلوکارت آلمان داشتن مدرک زبان آلمانی اجباری است؟',
      a: 'خیر. داشتن مدرک زبان آلمانی برای دریافت اولیه ویزای بلوکارت آلمان اجباری نیست، به شرطی که زبان محیط کار انگلیسی یا آلمانی باشد. اما مدرک B1 زمان تبدیل به اقامت دائم را از ۲۷ ماه به ۲۱ ماه کاهش می‌دهد.',
    },
    {
      q: 'کف حقوق مورد نیاز بلوکارت آلمان در سال ۲۰۲۶ چقدر است؟',
      a: 'طبق آیین‌نامه رسمی ۲۰۲۶، برای مشاغل کمبود نیرو (MINT شامل مهندسی، IT، ریاضیات و کادر درمان) حداقل حقوق ۴۵,۹۳۴.۲۰ یورو در سال است. برای سایر مشاغل عمومی، حداقل حقوق ۵۰,۷۰۰ یورو در سال تعیین شده است.',
    },
    {
      q: 'آیا متخصصان IT بدون مدرک دانشگاهی می‌توانند بلوکارت آلمان بگیرند؟',
      a: 'بله. طبق قانون مهاجرت ماهر آلمان، متخصصان IT بدون مدرک دانشگاهی با حداقل ۳ سال سابقه کار مستند و جاب‌آفری که کف حقوق مشاغل کمبود نیرو (۴۵,۹۳۴.۲۰ یورو در سال) را پوشش دهد، واجد شرایط دریافت بلوکارت هستند.',
    },
    {
      q: 'وضعیت پیوست همسر و فرزندان در بلوکارت آلمان چگونه است؟',
      a: 'همسر و فرزندان زیر ۱۸ سال دارنده بلوکارت می‌توانند ویزای پیوست خانواده دریافت کنند. همسر دارنده بلوکارت از آزمون زبان آلمانی معاف است و از روز نخست حق کار نامحدود در آلمان دارد.',
    },
    {
      q: 'چه زمانی می‌توان بلوکارت آلمان را به اقامت دائم تبدیل کرد؟',
      a: 'با مدرک زبان آلمانی B1، پس از ۲۱ ماه پرداخت بیمه و اشتغال موفق می‌توان اقامت دائم دریافت کرد. با مدرک A1، این مدت ۲۷ ماه است.',
    },
  ];

  const steps = [
    {
      name: 'ارزیابی دانشگاه و تاییدیه ZAB / Anabin',
      text: 'بررسی وضعیت دانشگاه مبدا در دیتابیس آنابین آلمان (احراز وضعیت H+) و در صورت لزوم، دریافت گواهی تطبیق مقایسه‌ای از دفتر ارزشیابی مدارک خارجی بن (ZAB).',
    },
    {
      name: 'بررسی جاب‌آفر و انطباق با استاندارد Bundesagentur für Arbeit',
      text: 'تطبیق قرارداد استخدامی با ماده ۱۸g قانون اقامت آلمان، تنظیم فرم Erklärung zum Beschäftigungsverhältnis و اخذ پیش‌موافقت اداره کار فدرال آلمان.',
    },
    {
      name: 'نگارش رزومه استاندارد Lebenslauf و انگیزه‌نامه شغلی',
      text: 'تنظیم دقیق رزومه بر مبنای استاندارد یوروپَس و آیین‌نامه استخدامی آلمان توسط کارشناسان حقوقی مسلط به آلمانی.',
    },
    {
      name: 'رزرو نوبت ویزای ملی تایپ D و مصاحبه کنسولی',
      text: 'آماده‌سازی پرونده بدون نقص مدرک، هماهنگی وقت سفارت آلمان در تهران و انجام شبیه‌سازی مصاحبه با متقاضی.',
    },
    {
      name: 'ورود به آلمان، ثبت آدرس (Anmeldung) و صدور کارت فیزیکی',
      text: 'همراهی در شهرداری Bürgeramt، افتتاح حساب بانکی، فعال‌سازی بیمه درمانی دولتی و تحویل کارت فیزیکی بلوکارت.',
    },
    {
      name: 'پیوست همسر و فرزندان و شروع کار بدون محدودیت',
      text: 'اقدام فوری جهت صدور ویزای همراه برای اعضای خانواده بدون شرط آزمون زبان و دریافت اجازه کار نامحدود برای همسر.',
    },
    {
      name: 'تبدیل به اقامت دائم نامحدود آلمان (Niederlassungserlaubnis)',
      text: 'تشکیل پرونده اقامت دائم پس از ۲۱ ماه (با مدرک B1) یا ۲۷ ماه (با مدرک A1) و تثبیت وضعیت بدون وابستگی به کارفرما.',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline:
          'راهنمای جامع اخذ بلوکارت آلمان ۲۰۲۶ — شرایط، حقوق و مراحل',
        description:
          'راهنمای کامل بلوکارت آلمان ۲۰۲۶: حداقل حقوق ۴۵,۹۳۴.۲۰ یورو برای مشاغل کمبود نیرو، ۵۰,۷۰۰ یورو برای سایر مشاغل، معافیت زبان همسر، اقامت دائم ۲۱ ماهه با B1 و چک‌لیست مدارک سفارت.',
        inLanguage: 'fa',
        about: {
          '@type': 'Thing',
          name: 'EU Blue Card Germany',
          alternateName: 'Blaue Karte EU Deutschland',
        },
        author: {
          '@type': 'Organization',
          name: 'هلدینگ مهاجرتی دیاکو',
        },
        datePublished: '2026-01-01',
        dateModified: new Date().toISOString().split('T')[0],
      },
      {
        '@type': 'FAQPage',
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
        '@type': 'HowTo',
        name: 'نقشه راه گام‌به‌گام اخذ بلوکارت آلمان',
        description:
          'مراحل حقوقی اخذ بلوکارت آلمان از ارزیابی مدارک تا دریافت اقامت دائم، تحت نظارت وکلای بین‌المللی دیاکو.',
        step: steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
        totalTime: 'P6M',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'صفحه اصلی دیاکو',
            item: 'https://diako.example.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'خدمات مهاجرتی',
            item: 'https://diako.example.com/services/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'بلوکارت اتحادیه اروپا',
            item: 'https://diako.example.com/services/eu-blue-card/',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'بلوکارت آلمان (EU Blue Card)',
            item: 'https://diako.example.com/services/eu-blue-card/germany/',
          },
        ],
      },
    ],
  };
}

// ============================================================
// 🖼️ 图片资源配置（Unsplash 免费商用图片）
// ============================================================
const IMAGES = {
  hero: {
    src: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&q=80&auto=format&fit=crop',
    alt: 'نمای شهر برلین آلمان در غروب آفتاب — مقصد اصلی دارندگان بلوکارت آلمان',
    width: 1200,
    height: 630,
  },
  salary: {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
    alt: 'محیط اداری مدرن در آلمان — محل کار متخصصان دارای بلوکارت',
    width: 800,
    height: 533,
  },
  documents: {
    src: 'https://images.unsplash.com/photo-1544177817-6c2b8c7b0b8e?w=800&q=80&auto=format&fit=crop',
    alt: 'پاسپورت و مدارک سفر — چک‌لیست مدارک سفارت آلمان برای بلوکارت',
    width: 800,
    height: 533,
  },
};

// ============================================================
// 🧩 组件主体
// ============================================================
export const GermanBlueCardPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  // تب‌های بخش مدارک
  const [activeDocTab, setActiveDocTab] = useState<
    'all' | 'work' | 'education' | 'personal'
  >('all');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);

  // وضعیت محاسبه‌گر شانس و شرایط بلوکارت
  const [calcEducation, setCalcEducation] = useState<
    'bachelor' | 'master' | 'phd' | 'it_nodegree'
  >('bachelor');
  const [calcField, setCalcField] = useState<
    'it' | 'engineering' | 'medicine' | 'business' | 'other'
  >('it');
  const [calcSalary, setCalcSalary] = useState<number>(50000);
  const [calcGermanLevel, setCalcGermanLevel] = useState<
    'none' | 'a1' | 'a2' | 'b1' | 'b2_plus'
  >('none');
  const [calcJobOfferStatus, setCalcJobOfferStatus] = useState<
    'has_offer' | 'interviewing' | 'seeking'
  >('has_offer');
  const [calcAnabinStatus, setCalcAnabinStatus] = useState<
    'h_plus' | 'zab_done' | 'not_checked'
  >('h_plus');

  // فرم مشاوره اختصاصی
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formField, setFormField] = useState('مهندسی نرم‌افزار و IT');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // آکاردئون سوالات متداول
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // محاسبه هوشمند شرایط بلوکارت
  const evaluationResult = useMemo(() => {
    const isShortageField =
      calcField === 'it' ||
      calcField === 'engineering' ||
      calcField === 'medicine';
    const isItNoDegree = calcEducation === 'it_nodegree';

    // حداقل حقوق مورد نیاز این پرونده بر اساس شاخص ۲۰۲۶
    const requiredSalary =
      isShortageField || isItNoDegree
        ? SALARY_THRESHOLDS_2026.shortageAnnual
        : SALARY_THRESHOLDS_2026.regularAnnual;

    const meetsSalary = calcSalary >= requiredSalary;
    const salaryDifference = calcSalary - requiredSalary;

    // زمان تا اقامت دائم آلمان (Niederlassungserlaubnis)
    let prMonths = 27; // پیش‌فرض با آلمانی مقدماتی A1
    let prNote =
      '۲۷ ماه اشتغال و بیمه (با مدرک زبان A1 آلمانی)';

    if (calcGermanLevel === 'b1' || calcGermanLevel === 'b2_plus') {
      prMonths = 21;
      prNote =
        'تنها ۲۱ ماه اشتغال و بیمه (سریع‌ترین حالت قانونی با مدرک B1)';
    } else if (calcGermanLevel === 'none') {
      prMonths = 27;
      prNote =
        '۲۷ ماه (نیاز به کسب مدرک زبان A1 حین حضور در آلمان)';
    }

    // درصد شانس تاییدیه ویزا
    let probability = 65;
    if (meetsSalary) probability += 20;
    if (calcJobOfferStatus === 'has_offer') probability += 10;
    if (
      calcAnabinStatus === 'h_plus' ||
      calcAnabinStatus === 'zab_done'
    )
      probability += 5;
    if (calcGermanLevel !== 'none') probability += 5;
    if (probability > 98) probability = 98;

    return {
      isShortageField,
      requiredSalary,
      meetsSalary,
      salaryDifference,
      prMonths,
      prNote,
      probability,
    };
  }, [
    calcEducation,
    calcField,
    calcSalary,
    calcGermanLevel,
    calcJobOfferStatus,
    calcAnabinStatus,
  ]);

  // مدارک سفارت آلمان
  const DOCUMENTS_LIST = [
    {
      id: 'doc-1',
      category: 'work',
      title:
        'قرارداد کاری معتبر یا پیش‌قرارداد استخدام (Arbeitsvertrag)',
      desc: 'حداقل مدت قرارداد ۶ ماه با ذکر دقیق حقوق ناخالص سالانه، ساعت کاری هفتگی و شرح وظایف شغلی.',
      required: true,
    },
    {
      id: 'doc-2',
      category: 'work',
      title:
        'فرم تکمیل‌شده اظهارنامه رابطه استخدامی (Erklärung zum Beschäftigungsverhältnis)',
      desc: 'تکمیل و امضا شده توسط کارفرمای آلمانی جهت بررسی و تایید اداره کار فدرال آلمان (Bundesagentur für Arbeit).',
      required: true,
    },
    {
      id: 'doc-3',
      category: 'education',
      title: 'دانشنامه و ریزنمرات دانشگاهی ترجمه شده رسمی',
      desc: 'ترجمه رسمی به زبان آلمانی با تاییدات دادگستری و وزارت امور خارجه ایران.',
      required: true,
    },
    {
      id: 'doc-4',
      category: 'education',
      title:
        'تاییدیه انطباق مدرک تحصیلی از پایگاه آنابین (Anabin) یا ارزشیابی ZAB',
      desc: 'پرینت وضعیت دانشگاه (H+) و وضعیت مدرک (Gleichwertig) یا تاییدیه انطباق مقایسه‌ای ZAB Statement of Comparability.',
      required: true,
    },
    {
      id: 'doc-5',
      category: 'work',
      title:
        'رزومه کامل کاری به فرمت استاندارد آلمانی (Europass Lebenslauf)',
      desc: 'رزومه استاندارد بدون وقفه زمانی، شامل شرح دقیق پروژه‌ها و مهارت‌های فنی به زبان آلمانی یا انگلیسی.',
      required: true,
    },
    {
      id: 'doc-6',
      category: 'work',
      title: 'گواهی‌های سابقه کار و بیمه تامین اجتماعی',
      desc: 'سابقه رسمی با ذکر شرح موقعیت و تاریخ شروع و پایان به ویژه برای احراز تجربه کاری.',
      required: true,
    },
    {
      id: 'doc-7',
      category: 'personal',
      title: 'گذرنامه معتبر با حداقل ۱۲ ماه اعتبار و صفحات خالی',
      desc: 'اصل و دو سری کپی خوانا از صفحه مشخصات پاسپورت.',
      required: true,
    },
    {
      id: 'doc-8',
      category: 'personal',
      title:
        'بیمه درمانی معتبر مسافرتی ورودی (Incoming Krankenversicherung)',
      desc: 'پوشش حداقل ۳۰,۰۰۰ یورو تا زمان شروع بیمه درمانی دولتی قانونی در خاک آلمان (GKV).',
      required: true,
    },
    {
      id: 'doc-9',
      category: 'personal',
      title:
        'انگیزه‌نامه شغلی و هدف اقامت در آلمان (Motivationsschreiben)',
      desc: 'شرح اهداف اقامتی، نقش پروژه شغلی و هماهنگی تخصص با بازار کار آلمان.',
      required: false,
    },
  ];

  const filteredDocs = useMemo(() => {
    if (activeDocTab === 'all') return DOCUMENTS_LIST;
    return DOCUMENTS_LIST.filter((d) => d.category === activeDocTab);
  }, [activeDocTab]);

  const toggleCheckDoc = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyChecklist = () => {
    const text = DOCUMENTS_LIST.map(
      (d, i) =>
        `${i + 1}. ${d.title} (${
          d.required ? 'الزامی' : 'اختیاری'
        })\n   توضیح: ${d.desc}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    setFormSubmitted(true);
  };

  const FAQS = [
    {
      q: 'آیا برای دریافت بلوکارت آلمان داشتن مدرک زبان آلمانی اجباری است؟',
      a: 'خیر! یکی از بزرگ‌ترین مزیت‌های بلوکارت آلمان این است که داشتن مدرک زبان برای دریافت اولیه ویزا و ورود به آلمان اجباری نیست (به شرطی که زبان محیط کاری شرکت انگلیسی یا آلمانی تایید شده باشد). با این حال، داشتن مدرک زبان آلمانی زمان دریافت اقامت دائم را از ۲۷ ماه به ۲۱ ماه کاهش می‌دهد.',
    },
    {
      q: 'کف حقوق مورد نیاز بلوکارت آلمان در سال ۲۰۲۶ چقدر است؟',
      a: 'طبق آیین‌نامه رسمی ۲۰۲۶، برای مشاغل کمبود نیرو (MINT شامل مهندسی، IT، ریاضیات و کادر درمان) و همچنین فارغ‌التحصیلان جدید حداقل حقوق ۴۵,۹۳۴.۲۰ یورو در سال است. برای سایر مشاغل، حداقل حقوق ۵۰,۷۰۰ یورو در سال تعیین شده است.',
    },
    {
      q: 'آیا متخصصان IT بدون داشتن مدرک دانشگاهی می‌توانند بلوکارت آلمان بگیرند؟',
      a: 'بله، طبق اصلاحات جدید قانون مهاجرت ماهر آلمان (Fachkräfteeinwanderungsgesetz)، متخصصان حوزه فناوری اطلاعات و برنامه‌نویسان حتی بدون مدرک دانشگاهی، چنانچه حداقل ۳ سال سابقه کار حرفه‌ای مستند در زمینه IT داشته باشند و جاب‌آفر آن‌ها حداقل کف حقوق مشاغل کمبود نیرو (۴۵,۹۳۴.۲۰ یورو در سال) را پوشش دهد، واجد شرایط دریافت بلوکارت هستند.',
    },
    {
      q: 'وضعیت پیوست همسر و فرزندان در بلوکارت آلمان به چه صورت است؟',
      a: 'همسر و فرزندان زیر ۱۸ سال دارنده بلوکارت می‌توانند به صورت همزمان یا با فاصله کوتاه ویزای پیوست به خانواده (Familienzusammenführung) دریافت کنند. همسر دارنده بلوکارت از آزمون و مدرک زبان آلمانی معاف است و از روز نخست ورود، حق کار نامحدود و تمام‌وقت در بازار کار آلمان دارد.',
    },
    {
      q: 'چه زمانی می‌توان بلوکارت آلمان را به اقامت دائم (Niederlassungserlaubnis) تبدیل کرد؟',
      a: 'اگر مدرک زبان آلمانی سطح B1 داشته باشید، تنها پس از ۲۱ ماه پرداخت حق بیمه و اشتغال موفق می‌توانید اقامت دائم بدون قید و شرط آلمان را دریافت نمایید. در صورت تسلط به زبان در سطح A1، این مدت ۲۷ ماه خواهد بود که سریع‌ترین نرخ تبدیل اقامت موقت به دائم در سراسر اتحادیه اروپاست.',
    },
    {
      q: 'هلدینگ مهاجرتی دیاکو چه خدماتی برای پرونده‌های بلوکارت ارائه می‌دهد؟',
      a: 'دیاکو با وکلای مستقر در وین و ارتباط مستقیم با مراجع رسمی آلمان، فرآیند را از صفر تا صد پوشش می‌دهد: ارزیابی مدارک دانشگاهی و ZAB، نگارش رزومه و انگیزه‌نامه استاندارد، مکاتبه با اداره کار آلمان (Vorabzustimmung) جهت تسریع ویزا، تشکیل پرونده کنسولی، همراهی پس از ورود در آلمان شامل ثبت آدرس شهرداری (Anmeldung)، بیمه درمانی و افتتاح حساب بانکی.',
    },
  ];

  // ساخت JSON-LD 一次（组件渲染时注入）
  const structuredData = useMemo(() => buildStructuredData(), []);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#081e26] text-slate-100 font-sans pb-20"
    >
      {/* ============================================================
          🔍 SEO / AIO: 注入 JSON-LD 结构化数据
          ============================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(
            /</g,
            '\\u003c'
          ),
        }}
      />

      {/* نوار مسیریابی بالا / Breadcrumbs */}
      <nav className="bg-[#05171e] border-b border-white/10 py-3 px-4 md:px-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <button
              type="button"
              onClick={onBackToHome}
              className="text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <span>صفحه اصلی دیاکو</span>
            </button>
            <span>/</span>
            <span>خدمات مهاجرتی</span>
            <span>/</span>
            <span>بلو کارت اتحادیه اروپا</span>
            <span>/</span>
            <span className="text-white font-semibold">
              بلوکارت آلمان (EU Blue Card)
            </span>
          </div>

          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1 text-[11px] font-bold text-amber-300 transition cursor-pointer"
          >
            <span>بازگشت به پرتال اصلی</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>

      {/* ============================================================
          🖼️ 英雄区（Hero）— 含 LCP 优化图片
          ============================================================ */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#0b2933] via-[#08222b] to-[#081e26] pt-12 pb-20 border-b border-white/10">
        {/* 背景光效 */}
        <div className="pointer-events-none absolute -top-40 right-10 h-96 w-96 rounded-full bg-[#f5a623]/15 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 rounded-full bg-[#00a8cc]/15 blur-[130px]" />

        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="mx-auto max-w-4xl text-center">
            {/* 徽章 */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold text-sky-300 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
              <span>
                دپارتمان تخصصی آلمان و اتحادیه اروپا — هلدینگ دیاکو
              </span>
              <span className="text-white/40">|</span>
              <span className="text-amber-300">آیین‌نامه رسمی ۲۰۲۶</span>
            </div>

            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              راهنمای جامع اخذ بلوکارت آلمان
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b]">
                Blaue Karte EU Deutschland ۲۰۲۶
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base leading-7 text-slate-300 max-w-2xl mx-auto font-medium">
              سریع‌ترین، معتبرترین و امن‌ترین مسیر اخذ اقامت دائم در قلب
              صنعت اروپا؛ بررسی کف حقوق مصوب ۲۰۲۶، تسهیلات ویژه
              متخصصان IT و مهندسان، معافیت زبان همسر و دریافت اقامت
              دائم ظرف ۲۱ ماه.
            </p>

            {/* 行动按钮 */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <span>محاسبه‌گر آنلاین شرایط بلوکارت</span>
                <Sparkles className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={onOpenAssessment}
                className="inline-flex items-center gap-2 rounded-2xl border border-sky-400/30 bg-sky-500/15 hover:bg-sky-500/25 px-5 py-3 text-xs sm:text-sm font-bold text-sky-200 transition cursor-pointer"
              >
                <span>ارزیابی شانس ویزا در سفارت</span>
                <ArrowLeft className="h-4 w-4" />
              </button>

              <a
                href="tel:02191693955"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3 text-xs sm:text-sm font-bold text-white transition"
              >
                <PhoneCall className="h-4 w-4 text-amber-400" />
                <span>مشاوره تلفنی با کارشناس</span>
              </a>
            </div>

            {/* 🖼️ 英雄区图片 — LCP 图片，使用 eager + high priority */}
            <figure className="mt-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <OptimizedImage
                src={IMAGES.hero.src}
                alt={IMAGES.hero.alt}
                width={IMAGES.hero.width}
                height={IMAGES.hero.height}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <figcaption className="bg-black/50 text-[10px] text-slate-400 px-3 py-1.5 text-left">
                برلین، آلمان — مقصد اصلی متخصصان بین‌المللی دارای بلوکارت
                اتحادیه اروپا. عکس: Unsplash
              </figcaption>
            </figure>

            {/* 4 个关键指标 */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-right">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <div className="flex items-center justify-between text-amber-300 mb-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-[10px] bg-amber-400/20 px-2 py-0.5 rounded-full text-amber-300 font-bold">
                    ۲۰۲۶
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  ۴۵,۹۳۴ €
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  حداقل حقوق سالانه IT و مهندسی (کمبود نیرو)
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <div className="flex items-center justify-between text-emerald-300 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-[10px] bg-emerald-400/20 px-2 py-0.5 rounded-full text-emerald-300 font-bold">
                    تسریع شده
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  ۲۱ ماه
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  تا دریافت اقامت دائم با مدرک B1
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <div className="flex items-center justify-between text-sky-300 mb-2">
                  <Users className="h-5 w-5" />
                  <span className="text-[10px] bg-sky-400/20 px-2 py-0.5 rounded-full text-sky-300 font-bold">
                    خانواده
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  بدون مدرک
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  معافیت کامل همسر از مدرک زبان
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                <div className="flex items-center justify-between text-purple-300 mb-2">
                  <Briefcase className="h-5 w-5" />
                  <span className="text-[10px] bg-purple-400/20 px-2 py-0.5 rounded-full text-purple-300 font-bold">
                    IT ویژه
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  ۳ سال سابقه
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  امکان اقدام IT بدون مدرک دانشگاهی
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
          🧮 计算器（Calculator）
          ============================================================ */}
      <section
        id="calculator"
        className="py-16 sm:py-20 relative"
        aria-labelledby="calculator-heading"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                سیستم سنجش صلاحیت و تخمین زمان اقامت دائم
              </span>
              <h2
                id="calculator-heading"
                className="text-2xl sm:text-3xl font-black text-white mt-3"
              >
                محاسبه‌گر هوشمند تطبیق حقوق و شانس ویزای بلوکارت آلمان
                ۲۰۲۶
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                پارامترهای شغلی، تحصیلی و حقوق خود را وارد کنید تا انطباق
                دقیق با ماده ۱۸g قانون اقامت آلمان محاسبه گردد.
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start">
              {/* 输入表单 */}
              <div className="md:col-span-7 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl space-y-5">
                {/* 专业领域 */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-2">
                    حوزه تخصصی و رشته شغلی شما:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'it',
                        label: 'مهندسی IT و نرم‌افزار',
                        badge: 'کمبود نیرو',
                      },
                      {
                        id: 'engineering',
                        label: 'رشته‌های مهندسی برق/مکانیک/صنایع',
                        badge: 'کمبود نیرو',
                      },
                      {
                        id: 'medicine',
                        label: 'پزشکی و بهداشت',
                        badge: 'کمبود نیرو',
                      },
                      {
                        id: 'business',
                        label: 'مدیریت و مالی',
                        badge: 'عادی',
                      },
                      {
                        id: 'other',
                        label: 'سایر تخصص‌ها',
                        badge: 'عادی',
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCalcField(item.id as any)}
                        className={`p-2.5 rounded-xl text-right text-xs transition border cursor-pointer ${
                          calcField === item.id
                            ? 'bg-[#f5a623] text-[#082833] font-black border-[#f5a623] shadow-glow'
                            : 'bg-black/30 text-slate-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="font-bold">{item.label}</div>
                        <div className="text-[10px] opacity-80 mt-0.5">
                          {item.badge}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 学历 */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-2">
                    بالاترین مدرک تحصیلی:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        id: 'bachelor',
                        label: 'کارشناسی (Bachelor)',
                      },
                      {
                        id: 'master',
                        label: 'کارشناسی ارشد (Master)',
                      },
                      { id: 'phd', label: 'دکتری (PhD)' },
                      {
                        id: 'it_nodegree',
                        label:
                          'متخصص IT با ۳+ سال سابقه (بدون مدرک)',
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setCalcEducation(item.id as any)
                        }
                        className={`p-2.5 rounded-xl text-right text-xs transition border cursor-pointer ${
                          calcEducation === item.id
                            ? 'bg-[#00a8cc] text-white font-bold border-[#00a8cc]'
                            : 'bg-black/30 text-slate-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 年薪滑块 — 已更新为 2026 阈值 */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-200">
                      پیشنهاد حقوق سالانه ناخالص (Gross Annual):
                    </span>
                    <span className="font-mono text-base font-black text-amber-400">
                      {calcSalary.toLocaleString()} یورو در سال
                      <span className="text-[11px] text-slate-400 font-sans mr-2">
                        (~
                        {Math.round(
                          calcSalary / 12
                        ).toLocaleString()}{' '}
                        یورو ماهانه)
                      </span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40000"
                    max="110000"
                    step="1000"
                    value={calcSalary}
                    onChange={(e) =>
                      setCalcSalary(Number(e.target.value))
                    }
                    className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>۴۰,۰۰۰ €</span>
                    <span className="text-emerald-400 font-bold">
                      کف ۴۵,۹۳۴ € (کمبود نیرو)
                    </span>
                    <span className="text-amber-400 font-bold">
                      کف ۵۰,۷۰۰ € (مشاغل عمومی)
                    </span>
                    <span>۱۱۰,۰۰۰ €</span>
                  </div>
                </div>

                {/* 德语水平 */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-2">
                    سطح تسلط یا مدرک زبان آلمانی شما:
                  </label>
                  <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                    {[
                      { id: 'none', label: 'بدون مدرک' },
                      { id: 'a1', label: 'A1' },
                      { id: 'a2', label: 'A2' },
                      { id: 'b1', label: 'B1 (طلایی)' },
                      { id: 'b2_plus', label: 'B2 / C1' },
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        type="button"
                        onClick={() =>
                          setCalcGermanLevel(lang.id as any)
                        }
                        className={`py-2 px-1 rounded-xl font-bold transition border cursor-pointer ${
                          calcGermanLevel === lang.id
                            ? 'bg-amber-400 text-[#082833] border-amber-400'
                            : 'bg-black/30 text-slate-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Job Offer + Anabin */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      وضعیت پیشنهاد شغلی (Job Offer):
                    </label>
                    <select
                      value={calcJobOfferStatus}
                      onChange={(e) =>
                        setCalcJobOfferStatus(e.target.value as any)
                      }
                      className="w-full rounded-xl border border-white/15 bg-black/40 p-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="has_offer">
                        قرارداد رسمی کار در آلمان دارم
                      </option>
                      <option value="interviewing">
                        در مرحله مصاحبه با کارفرمای آلمانی
                      </option>
                      <option value="seeking">
                        نیاز به کاریابی و دریافت جاب‌آفر دارم
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      وضعیت دانشگاه در پایگاه Anabin:
                    </label>
                    <select
                      value={calcAnabinStatus}
                      onChange={(e) =>
                        setCalcAnabinStatus(e.target.value as any)
                      }
                      className="w-full rounded-xl border border-white/15 bg-black/40 p-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="h_plus">
                        دانشگاه من H+ است (معتبر)
                      </option>
                      <option value="zab_done">
                        تاییدیه ارزشیابی ZAB دارم
                      </option>
                      <option value="not_checked">
                        هنوز بررسی نکرده‌ام
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 实时结果面板 */}
              <div className="md:col-span-5 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c3847] to-[#08222b] p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] text-amber-300 font-bold block">
                      تحلیل وضعیت پرونده
                    </span>
                    <h3 className="text-base font-black text-white">
                      نتیجه بررسی صلاحیت بلوکارت ۲۰۲۶
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-black px-2.5 py-1 rounded-full ${
                      evaluationResult.meetsSalary
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {evaluationResult.meetsSalary
                      ? 'واجد شرایط حقوقی'
                      : 'حقوق ناکافی'}
                  </span>
                </div>

                <div className="rounded-2xl bg-black/30 p-4 border border-white/10 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">
                      کف حقوق قانونی تعیین شده:
                    </span>
                    <span className="font-bold text-white">
                      {evaluationResult.requiredSalary.toLocaleString()}{' '}
                      یورو / سال
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">حقوق شما:</span>
                    <span className="font-bold text-amber-300">
                      {calcSalary.toLocaleString()} یورو / سال
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-300">
                      اختلاف با کف قانونی:
                    </span>
                    <span
                      className={`font-black ${
                        evaluationResult.salaryDifference >= 0
                          ? 'text-emerald-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {evaluationResult.salaryDifference >= 0
                        ? '+'
                        : ''}
                      {evaluationResult.salaryDifference.toLocaleString()}{' '}
                      یورو
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-400/10 border border-amber-400/20 p-4">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold mb-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      مدت زمان تبدیل به اقامت دائم
                      (Niederlassungserlaubnis):
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white mt-1">
                    {evaluationResult.prMonths} ماه
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-5">
                    {evaluationResult.prNote}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-200 font-bold">
                      تخمین درصد موفقیت پرونده در سفارت:
                    </span>
                    <span className="font-black text-amber-300">
                      {evaluationResult.probability}٪
                    </span>
                  </div>
                  <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="h-full bg-gradient-to-l from-emerald-400 to-[#f5a623] rounded-full transition-all duration-500"
                      style={{
                        width: `${evaluationResult.probability}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenAssessment}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] py-3 text-xs font-black text-[#082833] shadow-glow hover:scale-[1.02] active:scale-95 transition cursor-pointer"
                  >
                    <span>
                      رزرو نوبت بررسی تخصصی پرونده با وکیل
                    </span>
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          📊 2026 薪资阈值对比表（含图片）
          ============================================================ */}
      <section
        className="py-14 bg-[#05171e] border-y border-white/10"
        aria-labelledby="salary-table-heading"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-sky-400">
                Aufenthaltsgesetz § 18g
              </span>
              <h2
                id="salary-table-heading"
                className="text-xl sm:text-2xl font-black text-white mt-1"
              >
                جدول رسمی کف حقوق ناخالص بلوکارت آلمان (سال ۲۰۲۶)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                بر مبنای سقف ارزیابی حق بیمه تامین اجتماعی فدرال آلمان
                (Beitragsbemessungsgrenze)
              </p>
            </div>

            {/* 🖼️ 薪资对比区配图 */}
            <figure className="mb-6 rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src={IMAGES.salary.src}
                alt={IMAGES.salary.alt}
                width={IMAGES.salary.width}
                height={IMAGES.salary.height}
                loading="lazy"
                decoding="async"
                className="w-full h-48 sm:h-64 object-cover"
              />
              <figcaption className="bg-black/50 text-[10px] text-slate-400 px-3 py-1.5 text-left">
                محیط کار مدرن در آلمان — حقوق سالانه ۲۰۲۶ برای دارندگان
                بلوکارت. عکس: Unsplash
              </figcaption>
            </figure>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.05] text-slate-300 font-bold">
                    <th className="p-3.5">
                      دسته شغلی و تخصص
                    </th>
                    <th className="p-3.5">
                      حداقل حقوق سالانه (Gross)
                    </th>
                    <th className="p-3.5">
                      حداقل حقوق ماهانه تقریبی
                    </th>
                    <th className="p-3.5">
                      اقامت دائم (B1 / A1)
                    </th>
                    <th className="p-3.5">
                      نیاز به موافقت اداره کار
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/[0.03]">
                    <td className="p-3.5 font-bold text-amber-300 flex items-center gap-2">
                      <span>💻</span>
                      <span>
                        مشاغل کمبود نیرو (MINT) و کادر درمان
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-white font-bold">
                      ۴۵,۹۳۴.۲۰ یورو
                    </td>
                    <td className="p-3.5 font-mono text-slate-300">
                      ~۳,۸۲۷.۸۵ یورو
                    </td>
                    <td className="p-3.5 text-emerald-400 font-bold">
                      ۲۱ / ۲۷ ماه
                    </td>
                    <td className="p-3.5 text-slate-400">
                      تسریع‌شده
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.03]">
                    <td className="p-3.5 font-bold text-sky-300 flex items-center gap-2">
                      <span>🎓</span>
                      <span>
                        فارغ‌التحصیلان دانشگاه در ۳ سال اخیر
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-white font-bold">
                      ۴۵,۹۳۴.۲۰ یورو
                    </td>
                    <td className="p-3.5 font-mono text-slate-300">
                      ~۳,۸۲۷.۸۵ یورو
                    </td>
                    <td className="p-3.5 text-emerald-400 font-bold">
                      ۲۱ / ۲۷ ماه
                    </td>
                    <td className="p-3.5 text-slate-400">
                      معافیت تسهیل‌شده
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.03]">
                    <td className="p-3.5 font-bold text-purple-300 flex items-center gap-2">
                      <span>⚡</span>
                      <span>
                        متخصصان IT بدون مدرک دانشگاهی (۳ سال سابقه)
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-white font-bold">
                      ۴۵,۹۳۴.۲۰ یورو
                    </td>
                    <td className="p-3.5 font-mono text-slate-300">
                      ~۳,۸۲۷.۸۵ یورو
                    </td>
                    <td className="p-3.5 text-emerald-400 font-bold">
                      ۲۱ / ۲۷ ماه
                    </td>
                    <td className="p-3.5 text-slate-400">
                      بررسی سوابق
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.03]">
                    <td className="p-3.5 font-bold text-slate-200 flex items-center gap-2">
                      <span>🏢</span>
                      <span>سایر مشاغل عمومی و تخصصی</span>
                    </td>
                    <td className="p-3.5 font-mono text-white font-bold">
                      ۵۰,۷۰۰ یورو
                    </td>
                    <td className="p-3.5 font-mono text-slate-300">
                      ~۴,۲۲۵ یورو
                    </td>
                    <td className="p-3.5 text-emerald-400 font-bold">
                      ۲۱ / ۲۷ ماه
                    </td>
                    <td className="p-3.5 text-slate-400">
                      بدون نیاز به آزمون بازار کار
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ⭐ 蓝卡优势
          ============================================================ */}
      <section
        className="py-16 sm:py-20 container mx-auto px-4 md:px-8"
        aria-labelledby="benefits-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-emerald-400">
              چرا بلوکارت آلمان محبوب‌ترین روش مهاجرت اروپاست؟
            </span>
            <h2
              id="benefits-heading"
              className="text-2xl sm:text-3xl font-black text-white mt-2"
            >
              امتیازات انحصاری دارندگان کارت آبی اتحادیه اروپا در آلمان
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: '⚡',
                title: 'سریع‌ترین اقامت دائم در کل اروپا',
                desc: 'تبدیل به اقامت دائم تنها ظرف ۲۱ ماه (با مدرک B1) یا ۲۷ ماه (با مدرک A1)، بدون شرط حفظ بیزنس یا سرمایه‌گذاری پرریسک.',
              },
              {
                icon: '👨‍👩‍👧',
                title: 'پیوست فوری و معافیت زبان همسر',
                desc: 'همسر متقاضی بدون الزام به ارائه مدرک زبان آلمانی در سفارت، ویزا دریافت کرده و اجازه کار ۱۰۰٪ آزاد در تمام مشاغل دارد.',
              },
              {
                icon: '🇪🇺',
                title:
                  'جابجایی و اقامت در سایر کشورهای اروپایی',
                desc: 'پس از گذشت ۱۲ ماه از دریافت بلوکارت در آلمان، می‌توانید بدون ابطال سوابق اقامتی، به کشور دیگری از اتحادیه اروپا منتقل شوید.',
              },
              {
                icon: '✈️',
                title:
                  'امکان خروج ۱۲ ماهه متوالی از خاک آلمان',
                desc: 'برخلاف ویزاهای معمولی که حداکثر ۶ ماه اجازه خروج می‌دهند، دارندگان بلوکارت می‌توانند تا ۱۲ ماه پیوسته خارج از اتحادیه اروپا بمانند.',
              },
              {
                icon: '🇩🇪',
                title:
                  'مسیر تسهیل‌شده تابعیت و پاسپورت آلمان',
                desc: 'با قانون جدید تابعیت آلمان، پس از ۵ سال (و در صورت پیشرفت برجسته و زبان پس از ۳ سال) می‌توانید پاسپورت آلمان را دریافت کنید.',
              },
              {
                icon: '🛡️',
                title:
                  'پوشش کامل سیستم رفاهی و بیمه سلامت فدرال',
                desc: 'دسترسی برابر با شهروندان آلمانی به پیشرفته‌ترین سیستم بیمه خدمات درمانی، بازنشستگی، حقوق بیکاری و آموزش رایگان فرزندان.',
              },
            ].map((benefit, bIdx) => (
              <div
                key={bIdx}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md hover:border-amber-400/40 hover:bg-white/[0.05] transition-all group"
              >
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-300 text-justify">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          🗺️ 分步路线图（HowTo 对应的视觉版本）
          ============================================================ */}
      <section
        className="py-16 bg-[#05171e] border-y border-white/10"
        aria-labelledby="roadmap-heading"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-amber-400">
                صفر تا صد فرآیند حقوقی
              </span>
              <h2
                id="roadmap-heading"
                className="text-2xl sm:text-3xl font-black text-white mt-1"
              >
                نقشه راه اجرایی اخذ بلوکارت آلمان با دیاکو
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                مراحلی که تحت نظارت وکلای بین‌المللی دیاکو در آلمان و
                وین برای متقاضیان طی می‌شود
              </p>
            </div>

            <div className="relative border-r-2 border-amber-400/30 mr-4 sm:mr-8 space-y-8 pr-6 sm:pr-8">
              {[
                {
                  step: '۱',
                  title:
                    'ارزیابی دانشگاه و تاییدیه ZAB / Anabin',
                  desc: 'بررسی وضعیت دانشگاه مبدا در دیتابیس آنابین آلمان (احراز وضعیت H+) و در صورت لزوم، دریافت گواهی تطبیق مقایسه‌ای از دفتر ارزشیابی مدارک خارجی بن (ZAB).',
                  time: '۱ تا ۴ هفته',
                },
                {
                  step: '۲',
                  title:
                    'بررسی جاب‌آفر و انطباق با استاندارد Bundesagentur für Arbeit',
                  desc: 'تطبیق قرارداد استخدامی با ماده ۱۸g قانون اقامت آلمان، تنظیم فرم Erklärung zum Beschäftigungsverhältnis و اخذ پیش‌موافقت اداره کار فدرال آلمان.',
                  time: '۲ تا ۳ هفته',
                },
                {
                  step: '۳',
                  title:
                    'نگارش رزومه استاندارد Lebenslauf و انگیزه‌نامه شغلی',
                  desc: 'تنظیم دقیق رزومه بر مبنای استاندارد یوروپَس و آیین‌نامه استخدامی آلمان توسط کارشناسان حقوقی مسلط به آلمانی جهت پیشگیری از هرگونه ریجکتی در سفارت.',
                  time: '۱ هفته',
                },
                {
                  step: '۴',
                  title:
                    'رزرو نوبت ویزای ملی تایپ D و مصاحبه کنسولی',
                  desc: 'آماده‌سازی پرونده بدون نقص مدرک، هماهنگی وقت سفارت آلمان در تهران (یا کشور ثالث) و انجام شبیه‌سازی مصاحبه با متقاضی.',
                  time: 'طبق تقویم سفارت',
                },
                {
                  step: '۵',
                  title:
                    'ورود به آلمان، ثبت آدرس (Anmeldung) و صدور کارت فیزیکی',
                  desc: 'همراهی تیم دیاکو در شهرداری Bürgeramt، افتتاح حساب بانکی، فعال‌سازی بیمه درمانی دولتی و تحویل کارت فیزیکی اقامت بلوکارت در اداره اتباع خارجی (Ausländerbehörde).',
                  time: '۲ تا ۴ هفته پس از ورود',
                },
                {
                  step: '۶',
                  title:
                    'پیوست همسر و فرزندان و شروع کار بدون محدودیت',
                  desc: 'اقدام فوری جهت صدور ویزای همراه برای اعضای خانواده بدون شرط آزمون زبان و دریافت اجازه کار نامحدود برای همسر.',
                  time: 'همزمان یا ۱ تا ۲ ماه پس از ورود',
                },
                {
                  step: '۷',
                  title:
                    'تبدیل به اقامت دائم نامحدود آلمان (Niederlassungserlaubnis)',
                  desc: 'تشکیل پرونده اقامت دائم پس از ۲۱ ماه (با مدرک B1) یا ۲۷ ماه (با مدرک A1) و تثبیت وضعیت بدون وابستگی به کارفرما.',
                  time: 'پس از ۲۱ یا ۲۷ ماه',
                },
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -right-[35px] sm:-right-[43px] top-0 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-[#08222b] border-2 border-[#f5a623] text-xs font-black text-amber-300 shadow-glow">
                    {item.step}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-amber-400/30 transition">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-black text-white">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                        {item.time}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-slate-300 text-justify">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          📋 交互式文档清单（含图片）
          ============================================================ */}
      <section
        className="py-16 sm:py-20 container mx-auto px-4 md:px-8"
        aria-labelledby="documents-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-sky-400">
                بررسی گام‌به‌گام پرونده
              </span>
              <h2
                id="documents-heading"
                className="text-2xl sm:text-3xl font-black text-white mt-1"
              >
                چک‌لیست تعاملی مدارک سفارت آلمان برای بلوکارت
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                می‌توانید مدارک آماده‌شده خود را تیک بزنید تا پیشرفت
                آماده‌سازی را بررسی نمایید.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyChecklist}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-bold text-white transition self-start cursor-pointer"
            >
              {copiedChecklist ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>
                {copiedChecklist
                  ? 'چک‌لیست کپی شد!'
                  : 'کپی کل فهرست مدارک'}
              </span>
            </button>
          </div>

          {/* 🖼️ 文档区配图 */}
          <figure className="mb-8 rounded-2xl overflow-hidden border border-white/10">
            <OptimizedImage
              src={IMAGES.documents.src}
              alt={IMAGES.documents.alt}
              width={IMAGES.documents.width}
              height={IMAGES.documents.height}
              loading="lazy"
              decoding="async"
              className="w-full h-48 sm:h-64 object-cover"
            />
            <figcaption className="bg-black/50 text-[10px] text-slate-400 px-3 py-1.5 text-left">
              پاسپورت و مدارک سفر — آماده‌سازی چک‌لیست مدارک سفارت آلمان
              برای بلوکارت. عکس: Unsplash
            </figcaption>
          </figure>

          {/* 文档分类标签页 */}
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 overflow-x-auto">
            {[
              { id: 'all', label: 'همه مدارک' },
              { id: 'work', label: 'مدارک شغلی و کارفرما' },
              { id: 'education', label: 'مدارک تحصیلی و ارزشیابی' },
              { id: 'personal', label: 'مدارک هویتی و بیمه' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDocTab(tab.id as any)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeDocTab === tab.id
                    ? 'bg-amber-400 text-[#082833] font-black'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 文档列表 */}
          <div className="space-y-3">
            {filteredDocs.map((doc) => {
              const isChecked = !!checkedDocs[doc.id];
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleCheckDoc(doc.id)}
                  className={`flex items-start gap-3 rounded-2xl border p-4 transition cursor-pointer select-none ${
                    isChecked
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  <div
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-lg border transition ${
                      isChecked
                        ? 'border-emerald-500 bg-emerald-500 text-black'
                        : 'border-slate-500 bg-black/30'
                    }`}
                  >
                    {isChecked && (
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs font-bold ${
                          isChecked
                            ? 'text-emerald-300 line-through'
                            : 'text-white'
                        }`}
                      >
                        {doc.title}
                      </span>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                          doc.required
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-slate-500/20 text-slate-300'
                        }`}
                      >
                        {doc.required
                          ? 'الزامی'
                          : 'اختیاری / تکمیلی'}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-5 text-slate-300">
                      {doc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          ⚖️ 对比：蓝卡 vs 机会卡 vs 奥地利 RWR
          ============================================================ */}
      <section
        className="py-16 bg-[#05171e] border-y border-white/10"
        aria-labelledby="comparison-heading"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-amber-300">
                مقایسه تخصصی روش‌های کاری اروپا
              </span>
              <h2
                id="comparison-heading"
                className="text-xl sm:text-2xl font-black text-white mt-1"
              >
                تفاوت بلوکارت آلمان با کارت شانس (Chancenkarte) و اقامت
                اتریش (RWR Card)
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-xs">
              {/* 蓝卡 */}
              <div className="rounded-3xl border-2 border-amber-400/50 bg-[#08222b] p-5 shadow-glow relative">
                <span className="absolute -top-3 right-4 bg-amber-400 text-[#082833] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  پیشنهاد دیاکو
                </span>
                <h3 className="text-base font-black text-white mt-1">
                  بلوکارت آلمان (Blue Card)
                </h3>
                <p className="text-slate-300 text-[11px] mt-1">
                  اقامت استخدامی فوری با حقوق مشخص
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 space-y-2.5 text-slate-300">
                  <div className="flex justify-between">
                    <span>پیش‌نیاز جاب‌آفر:</span>
                    <span className="font-bold text-white">
                      الزامی با کف حقوق
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>مدرک زبان اولیه:</span>
                    <span className="font-bold text-emerald-400">
                      معاف
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>زمان تا اقامت دائم:</span>
                    <span className="font-bold text-amber-300">
                      ۲۱ یا ۲۷ ماه
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>پیوست خانواده:</span>
                    <span className="font-bold text-white">
                      همزمان + کار همسر
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>حقوق هفتگی:</span>
                    <span className="font-bold text-white">
                      تمام‌وقت کامل
                    </span>
                  </div>
                </div>
              </div>

              {/* 机会卡 */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-base font-black text-white">
                  کارت شانس آلمان (Chancenkarte)
                </h3>
                <p className="text-slate-400 text-[11px] mt-1">
                  ویزای جستجوی کار ۱ ساله بر پایه امتیاز
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 space-y-2.5 text-slate-300">
                  <div className="flex justify-between">
                    <span>پیش‌نیاز جاب‌آفر:</span>
                    <span className="font-bold text-white">
                      ندارد (کاریابی در آلمان)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>مدرک زبان اولیه:</span>
                    <span className="font-bold text-amber-300">
                      A2 آلمانی یا B2 انگلیسی
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>تمکن مالی مورد نیاز:</span>
                    <span className="font-bold text-white">
                      حساب بلاک ۱۲،۳۲۴ یورو
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>پیوست خانواده:</span>
                    <span className="font-bold text-slate-400">
                      پس از استخدام رسمی
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>اجازه کار حین ویزا:</span>
                    <span className="font-bold text-white">
                      حداکثر ۲۰ ساعت در هفته
                    </span>
                  </div>
                </div>
              </div>

              {/* 奥地利 RWR */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-base font-black text-white">
                  کارت قرمز-سفید-قرمز اتریش
                </h3>
                <p className="text-slate-400 text-[11px] mt-1">
                  اقامت تخصصی RWR Card با حقوق استاندارد وین
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 space-y-2.5 text-slate-300">
                  <div className="flex justify-between">
                    <span>پیش‌نیاز جاب‌آفر:</span>
                    <span className="font-bold text-white">
                      الزامی + امتیاز جدول AMS
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>مدرک زبان اولیه:</span>
                    <span className="font-bold text-white">
                      امتیازآور در جدول AMS
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>زمان تا اقامت دائم:</span>
                    <span className="font-bold text-amber-300">
                      ۲۴ ماه (RWR Plus)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>پیوست خانواده:</span>
                    <span className="font-bold text-white">
                      همزمان با کارفرما
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>دفتر مستقیم دیاکو:</span>
                    <span className="font-bold text-emerald-400">
                      دفتر وین اتریش
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          📝 咨询表单
          ============================================================ */}
      <section
        className="py-16 sm:py-20 container mx-auto px-4 md:px-8"
        aria-labelledby="consultation-heading"
      >
        <div className="max-w-2xl mx-auto rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#0b2f3b] to-[#082029] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-amber-400/15 blur-3xl" />

          <div className="text-center mb-6">
            <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              بررسی رایگان توسط دپارتمان آلمان
            </span>
            <h2
              id="consultation-heading"
              className="text-xl sm:text-2xl font-black text-white mt-2"
            >
              ثبت درخواست ارزیابی رزومه و استعلام جاب‌آفر بلوکارت
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              کارشناسان حقوقی دیاکو حداکثر ظرف ۴۸ ساعت کاری با شما تماس
              خواهند گرفت.
            </p>
          </div>

          {formSubmitted ? (
            <div className="rounded-2xl bg-emerald-500/20 border border-emerald-500/40 p-6 text-center animate-fadeIn">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-white">
                درخواست ارزیابی شما با موفقیت ثبت گردید
              </h3>
              <p className="text-xs text-slate-200 mt-2 leading-6">
                شماره پیگیری پرونده شما:{' '}
                <strong className="font-mono text-amber-300">
                  DE-BC-2026-9418
                </strong>
                <br />
                کارشناس دپارتمان آلمان هلدینگ دیاکو جهت بررسی مدارک و
                جاب‌آفر با شماره تماس شما ارتباط برقرار خواهد نمود.
              </p>
              <button
                type="button"
                onClick={() => setFormSubmitted(false)}
                className="mt-4 rounded-xl border border-emerald-400/40 px-4 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 cursor-pointer"
              >
                ارسال درخواست دیگر
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 text-xs"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-200 mb-1">
                    نام و نام خانوادگی:
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="مثال: علیرضا محمدی"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-200 mb-1">
                    شماره تماس (همراه یا واتساپ):
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+98 912 000 0000"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-200 mb-1">
                  رشته تخصصی و عنوان شغلی:
                </label>
                <select
                  value={formField}
                  onChange={(e) => setFormField(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="مهندسی نرم‌افزار و IT">
                    برنامه‌نویسی و مهندسی نرم‌افزار (IT / Developer)
                  </option>
                  <option value="هوش مصنوعی و داده">
                    متخصص هوش مصنوعی و تحلیل داده (AI / Data Science)
                  </option>
                  <option value="مهندسی برق و الکترونیک">
                    مهندسی برق، الکترونیک و اتوماسیون
                  </option>
                  <option value="مهندسی مکانیک و خودرو">
                    مهندسی مکانیک، مکاترونیک و صنایع
                  </option>
                  <option value="پزشکی و دندانپزشکی">
                    پزشک عمومی / متخصص یا دندانپزشک
                  </option>
                  <option value="پرستاری و مامایی">
                    پرستار یا کادر درمان
                  </option>
                  <option value="سایر رشته‌ها">
                    سایر حوزه‌های تخصصی مهندسی و مالی
                  </option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] py-3 text-xs font-black text-[#082833] shadow-glow hover:scale-[1.01] active:scale-95 transition cursor-pointer"
                >
                  ارسال مشخصات جهت ارزیابی حقوقی و تماس وکیل
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  حفظ محرمانگی اطلاعات
                </span>
                <span>•</span>
                <span>پاسخگویی مستقیم از وین و تهران</span>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ============================================================
          ❓ 常见问题（FAQ）
          ============================================================ */}
      <section
        className="py-16 bg-[#05171e] border-t border-white/10"
        aria-labelledby="faq-heading"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-amber-300">
                پاسخ شفاف به دغدغه‌های متقاضیان
              </span>
              <h2
                id="faq-heading"
                className="text-xl sm:text-2xl font-black text-white mt-1"
              >
                پرسش‌های متداول درباره ویزا و اقامت بلوکارت آلمان
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, fIdx) => {
                const isOpen = openFaq === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? null : fIdx)
                      }
                      className="w-full flex items-center justify-between p-4 text-right text-xs font-bold text-white hover:text-amber-300 transition cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-amber-400 shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform ${
                          isOpen
                            ? 'rotate-180 text-amber-400'
                            : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs leading-6 text-slate-300 border-t border-white/5 bg-black/20 text-justify animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          🚀 底部最终 CTA
          ============================================================ */}
      <section className="py-12 container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-r from-[#0e3846] via-[#0b2933] to-[#08222b] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              آماده ورود به بازار کار آلمان و اخذ بلوکارت هستید؟
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              تیم تخصصی دیاکو در وین، آتن و تهران با تکیه بر وکلای
              مقیم و مسلط به قوانین AufenthG، پرونده مهاجرتی شما را از
              مرحله ارزیابی اولیه تا دریافت کارت فیزیکی اقامت همراهی
              می‌کند.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-xl bg-[#f5a623] hover:bg-[#e09312] px-5 py-2.5 text-xs font-black text-[#082833] shadow-glow transition cursor-pointer"
            >
              سنجش جامع شانس ویزا ←
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-bold text-white transition cursor-pointer"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          📄 页脚图片版权说明（Unsplash 合规）
          ============================================================ */}
      <footer className="border-t border-white/10 py-6 px-4 md:px-8">
        <div className="container mx-auto text-center text-[10px] text-slate-500 leading-5">
          تصاویر استفاده‌شده در این صفحه از Unsplash تحت
          Unsplash License (قابل استفاده تجاری و غیرتجاری
          بدون نیاز به اجازه) بارگذاری شده‌اند. عکاسان: Marcus Lenk،
          Getty Images و سایر مشارکت‌کنندگان Unsplash.
          <br />
          © ۲۰۲۶ هلدینگ مهاجرتی دیاکو — تمامی حقوق محفوظ است.
        </div>
      </footer>
    </div>
  );
};

export default GermanBlueCardPage;