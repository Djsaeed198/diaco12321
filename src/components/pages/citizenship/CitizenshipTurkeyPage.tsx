import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  PhoneCall,
  Check,
  Copy,
  Sparkles,
  ShieldCheck,
  Building2,
  Landmark,
  BadgeDollarSign,
  FileCheck2,
  AlertTriangle,
  Users,
  Home,
  TrendingUp,
  BookOpen,
  Plane,
  Scale,
  FileWarning,
  Globe2,
  Percent,
  MapPin,
  Timer,
  Fingerprint,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

// ✅ آستانه رسمی ۲۰۲۶: ۴۰۰,۰۰۰ دلار (یا معادل ارزی)
const INVESTMENT_2026 = {
  propertyMinUSD: 400_000,
  noSaleYears: 3,
  bankDepositMinUSD: 500_000,
  fixedCapitalMinUSD: 500_000,
  employmentMinJobs: 50,
} as const;

// ✅ هزینه‌های واقعی جانبی ۲۰۲۶ — منبع: Turchina / 21 CBI
const FEES_2026 = {
  tapuTransferRate: 0.04, // ۴٪، معمولاً بین خریدار و فروشنده تقسیم می‌شود
  valuationReportMinUSD: 300,
  valuationReportMaxUSD: 500,
  legalFeeMinUSD: 3_000,
  legalFeeMaxUSD: 10_000,
  notaryTranslationMinUSD: 500,
  notaryTranslationMaxUSD: 1_500,
  residencePermitPerPersonUSD: 200,
  passportPerPersonUSD: 150,
} as const;

// ✅ پاسپورت ۲۰۲۶
const PASSPORT_2026 = {
  henleyRank: 45,
  visaFreeDestinations: 113,
  schengenVisaFree: false,
  ukVisaFree: false,
  usVisaFree: false,
  canadaVisaFree: false,
  passportValidityYears: 10,
} as const;

// ✅ زمان‌بندی واقعی ۲۰۲۶
const TIMELINE_2026 = {
  approvalAfterSubmissionMonths: '۳–۶ ماه',
  totalProcessMonths: '۶–۱۲ ماه',
  residencePermitWeeks: '۲–۴ هفته',
} as const;

export const CitizenshipTurkeyPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  // ==================== SEO + AIO ====================
  useSeo({
    title: 'شهروندی ترکیه ۲۰۲۶ | ملک ۴۰۰,۰۰۰ $، پاسپورت ۳–۶ ماهه و ۱۱۳ کشور',
    description:
      'راهنمای حقوقی ۲۰۲۶: ملک ۴۰۰,۰۰۰ $ با قید ۳ سال عدم فروش، مالیات تاپو ۴٪، گزارش ارزیابی SPK، پاسپورت برای همسر و فرزندان زیر ۱۸ سال، رتبه ۴۵ هنلی (۱۱۳ مقصد) و معافیت سربازی مردان ۲۲+. ارزیابی فوری.',
    canonical: '/guides/citizenship-turkey',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'شهروندی ترکیه ۲۰۲۶',
      'پاسپورت ترکیه با خرید ملک ۴۰۰ هزار دلار',
      'قانون شهروندی ترکیه ۲۰۲۶',
      'سند تاپو و قید ۳ ساله',
      'گزارش ارزیابی SPK ترکیه',
      'پاسپورت ترکیه برای خانواده',
      'معافیت سربازی شهروندی ترکیه',
      'هزینه واقعی شهروندی ترکیه',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/citizenship-turkey#article',
          headline:
            'راهنمای جامع شهروندی و پاسپورت ترکیه ۲۰۲۶: ملک ۴۰۰,۰۰۰ دلار، هزینه‌های واقعی و محدودیت‌ها',
          description:
            'تحلیل کامل برنامه CBI ترکیه شامل الزام ۴۰۰,۰۰۰ دلار و قید ۳ ساله، هزینه‌های واقعی (مالیات تاپو ۴٪، ارزیابی SPK، حق‌الوکاله)، پاسپورت برای خانواده هسته‌ای، معافیت سربازی و محدودیت‌های پاسپورت.',
          image: [
            'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
          ],
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
          dateModified: '2026-10-23',
          inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Turkish Citizenship by Investment' },
            { '@type': 'Thing', name: 'Tapu Title Deed' },
            { '@type': 'Thing', name: 'Turkish Passport' },
          ],
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: [
              'h1',
              '.speakable-summary',
              '.speakable-cost',
              '.speakable-answer',
            ],
          },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/citizenship-turkey#howto',
          name: 'مراحل دریافت شهروندی ترکیه از طریق خرید ملک در ۲۰۲۶',
          description:
            'فرآیند گام‌به‌گام از انتخاب ملک تا دریافت پاسپورت، شامل ارزیابی SPK، گواهی DAB و قید ۳ ساله تاپو.',
          totalTime: 'P9M',
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: '400000',
          },
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'انتخاب ملک و اخذ گزارش ارزیابی رسمی SPK',
              text: 'ملک باید ارزش ارزیابی‌شده حداقل ۴۰۰,۰۰۰ دلار داشته باشد. گزارش از مؤسسه مجاز SPK (هزینه ۳۰۰–۵۰۰ دلار) الزامی است.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'تبدیل ارز و دریافت گواهی DAB',
              text: 'ارز باید از طریق بانک ترکی به لیر تبدیل شده و گواهی Döviz Alım Belgesi (DAB) صادر شود.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'انتقال سند تاپو با قید عدم فروش ۳ ساله',
              text: 'سند در اداره ثبت اسناد با annotation سه ساله ثبت می‌شود. مالیات انتقال ۴٪ (معمولاً تقسیم بین خریدار و فروشنده) اعمال می‌گردد.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'دریافت گواهی انطباق و اقامت سرمایه‌گذاری',
              text: 'وزارت مربوطه گواهی انطباق (Certificate of Conformity) صادر می‌کند. سپس اقامت کوتاه‌مدت برای انگشت‌نگاری دریافت می‌شود.',
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'ثبت درخواست شهروندی و دریافت پاسپورت',
              text: 'درخواست به NVİ ارسال و پس از بررسی امنیتی و تصمیم ریاست‌جمهوری (۳–۶ ماه)، پاسپورت ۱۰ ساله صادر می‌شود. کل فرآیند ۶–۱۲ ماه.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/citizenship-turkey#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حداقل سرمایه‌گذاری برای شهروندی ترکیه در ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای مسیر ملکی، حداقل ارزش ارزیابی‌شده ۴۰۰,۰۰۰ دلار (یا معادل ارزی) است که باید با قید عدم فروش ۳ ساله در سند تاپو ثبت شود. مسیرهای سپرده بانکی، سرمایه ثابت و اوراق قرضه حداقل ۵۰۰,۰۰۰ دلار نیاز دارند. خرید چند ملک نیز مجاز است به شرطی که مجموع ارزش ارزیابی آن‌ها به ۴۰۰,۰۰۰ دلار برسد.',
              },
            },
            {
              '@type': 'Question',
              name: 'هزینه‌های واقعی فراتر از ۴۰۰,۰۰۰ دلار چیست؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'علاوه بر اصل سرمایه، هزینه‌های دولتی و حرفه‌ای قابل توجهی وجود دارد: مالیات انتقال تاپو ۴٪ (نزدیک به ۱۶,۰۰۰ دلار برای ملک ۴۰۰,۰۰۰ دلاری، معمولاً تقسیم بین خریدار و فروشنده)، گزارش ارزیابی SPK ۳۰۰–۵۰۰ دلار، حق‌الوکاله وکیل ۳,۰۰۰–۱۰,۰۰۰ دلار، هزینه‌های دفتر اسناد رسمی و ترجمه ۵۰۰–۱,۵۰۰ دلار، و هزینه اقامت و پاسپورت به ازای هر نفر. مجموع هزینه‌های جانبی معمولاً ۵٪ تا ۸٪ بیشتر از قیمت ملک است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا پاسپورت ترکیه بدون ویزا به شینگن، بریتانیا و آمریکا سفر می‌کند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. بر اساس شاخص هنلی ۲۰۲۶، پاسپورت ترکیه رتبه ۴۵ جهانی و دسترسی به ۱۱۳ مقصد بدون ویزا یا با ویزای فرودگاهی دارد. با این حال، سفر به منطقه شینگن، بریتانیا، آمریکا و کانادا نیازمند ویزا است. مزیت اصلی پاسپورت ترکیه در دسترسی به ژاپن، کره جنوبی، سنگاپور، مالزی، برزیل و قطر است، نه اروپا یا آمریکای شمالی.',
              },
            },
            {
              '@type': 'Question',
              name: 'چه اعضای خانواده‌ای می‌توانند شهروندی ترکیه را همراهی کنند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'همسر قانونی و فرزندان زیر ۱۸ سال می‌توانند همراه با متقاضی اصلی شهروندی دریافت کنند. برخلاف برخی برنامه‌های کارائیب، ترکیه والدین، اجداد یا فرزندان بالای ۱۸ سال را به‌عنوان همراه نمی‌پذیرد. فرزندان بالای ۱۸ سال باید مسیر جداگانه‌ای را طی کنند.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا مردان مشمول خدمت سربازی اجباری در ترکیه می‌شوند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خدمت سربازی یک وظیفه قانونی برای شهروندان مرد ترکیه است. با این حال، بر اساس قانون شماره ۷۱۷۹، افرادی که در سال دریافت شهروندی ۲۲ سال یا بیشتر دارند، مشمول خدمت اجباری نمی‌شوند. از آنجا که اکثر متقاضیان سرمایه‌گذاری بالای ۲۲ سال هستند، این معافیت عملاً اکثر آن‌ها را پوشش می‌دهد. با این حال، جزئیات باید با وکیل بررسی شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا پس از ۳ سال می‌توان ملک را فروخت و شهروندی باقی می‌ماند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. پس از پایان دوره ۳ ساله قید عدم فروش، می‌توانید ملک را بفروشید یا اجاره دهید بدون اینکه شهروندی شما باطل شود. با این حال، در نظر داشته باشید که اگر ملک را به خریدار خارجی بفروشید و او قصد شهروندی داشته باشد، ممکن است محدودیت‌های جدیدی اعمال شود. همچنین از دسامبر ۲۰۲۶، سیستم پرداخت امن (Güvenli Ödeme Sistemi) برای تمام معاملات ملکی اجباری می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا محدودیت منطقه‌ای برای خرید ملک جهت شهروندی وجود دارد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. برخی مناطق ترکیه به دلایل امنیتی یا نظامی برای خرید خارجی‌ها ممنوع هستند. علاوه بر این، از سال ۲۰۲۶، بیش از ۱,۱۶۹ محله (از جمله مناطقی در استانبول مانند فاتح، بخش‌هایی از اسنیورت، شیشلی و بی‌اوغلو) برای درخواست‌های جدید اقامت مسکونی بسته شده‌اند. قبل از خرید، باید وضعیت منطقه از نظر مجاز بودن برای شهروندی و اقامت بررسی شود.',
              },
            },
          ],
        },
      ],
    },
  });

  // ==================== STATE ====================
  const [propertyPriceUSD, setPropertyPriceUSD] = useState(450_000);
  const [familyMembers, setFamilyMembers] = useState(3);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ==================== COST CALCULATOR ====================
  const calculateFees = useMemo(() => {
    const tapuTax = propertyPriceUSD * FEES_2026.tapuTransferRate;
    const valuation = 400; // میانگین ۳۰۰–۵۰۰
    const legal = 6_500; // میانگین ۳,۰۰۰–۱۰,۰۰۰
    const notaryTranslation = 1_000;
    const residencyAndPassport =
      familyMembers *
      (FEES_2026.residencePermitPerPersonUSD +
        FEES_2026.passportPerPersonUSD);

    const sideCosts =
      tapuTax + valuation + legal + notaryTranslation + residencyAndPassport;
    const total = propertyPriceUSD + sideCosts;
    const sideCostPercentage = ((sideCosts / propertyPriceUSD) * 100).toFixed(
      1
    );

    return {
      tapuTax: Math.round(tapuTax),
      valuation,
      legal,
      notaryTranslation,
      residencyAndPassport,
      sideCosts: Math.round(sideCosts),
      total: Math.round(total),
      sideCostPercentage,
    };
  }, [propertyPriceUSD, familyMembers]);

  // ==================== DOCUMENTS ====================
  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'گزارش ارزیابی رسمی از مؤسسه مجاز SPK (Ekspertiz Raporu)',
      desc: 'الزامی است و ارزش ملک باید حداقل ۴۰۰,۰۰۰ دلار باشد. گزارش در سامانه GABİM بارگذاری می‌شود. هزینه ۳۰۰–۵۰۰ دلار و زمان ۳–۵ روز کاری.',
    },
    {
      id: 'doc-2',
      title: 'گواهی خرید ارز (DAB - Döviz Alım Belgesi)',
      desc: 'ارز باید از طریق بانک ترکی به لیر تبدیل شود و گواهی DAB صادر گردد. بدون این گواهی، پرونده شهروندی رد می‌شود.',
    },
    {
      id: 'doc-3',
      title: 'سند تاپو با قید عدم فروش ۳ ساله (Şerh)',
      desc: 'سند رسمی باید annotation سه ساله عدم واگذاری را داشته باشد. مالیات انتقال ۴٪ در این مرحله پرداخت می‌شود.',
    },
    {
      id: 'doc-4',
      title: 'گواهی انطباق (Certificate of Conformity / Uygunluk Belgesi)',
      desc: 'توسط وزارت محیط زیست و شهرسازی یا وزارت صنعت صادر می‌شود و تأیید می‌کند سرمایه‌گذاری شرایط قانونی را دارد.',
    },
    {
      id: 'doc-5',
      title: 'مدارک هویتی، گواهی عدم سوءپیشینه و مدارک خانوادگی',
      desc: 'گذرنامه، عکس بیومتریک، گواهی عدم سوءپیشینه با Apostille، شناسنامه ازدواج و تولد برای همه اعضای خانواده.',
    },
  ];

  const handleCopy = () => {
    const text = DOCUMENTS.map(
      (d, i) => `${i + 1}. ${d.title}\n   ${d.desc}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  // ==================== FAQS ====================
  const FAQS = [
    {
      q: 'حداقل سرمایه‌گذاری برای شهروندی ترکیه در ۲۰۲۶ چقدر است؟',
      a: 'برای مسیر ملکی، حداقل ارزش ارزیابی‌شده ۴۰۰,۰۰۰ دلار (یا معادل ارزی) است که باید با قید عدم فروش ۳ ساله در سند تاپو ثبت شود. مسیرهای سپرده بانکی، سرمایه ثابت و اوراق قرضه حداقل ۵۰۰,۰۰۰ دلار نیاز دارند. خرید چند ملک نیز مجاز است به شرطی که مجموع ارزش ارزیابی آن‌ها به ۴۰۰,۰۰۰ دلار برسد.',
    },
    {
      q: 'هزینه‌های واقعی فراتر از ۴۰۰,۰۰۰ دلار چیست؟',
      a: 'علاوه بر اصل سرمایه، هزینه‌های دولتی و حرفه‌ای قابل توجهی وجود دارد: مالیات انتقال تاپو ۴٪ (نزدیک به ۱۶,۰۰۰ دلار برای ملک ۴۰۰,۰۰۰ دلاری، معمولاً تقسیم بین خریدار و فروشنده)، گزارش ارزیابی SPK ۳۰۰–۵۰۰ دلار، حق‌الوکاله وکیل ۳,۰۰۰–۱۰,۰۰۰ دلار، هزینه‌های دفتر اسناد رسمی و ترجمه ۵۰۰–۱,۵۰۰ دلار، و هزینه اقامت و پاسپورت به ازای هر نفر. مجموع هزینه‌های جانبی معمولاً ۵٪ تا ۸٪ بیشتر از قیمت ملک است. برای یک ملک ۴۵۰,۰۰۰ دلاری، بودجه واقعی می‌تواند به ۴۸۰,۰۰۰ دلار یا بیشتر برسد.',
    },
    {
      q: 'آیا پاسپورت ترکیه بدون ویزا به شینگن، بریتانیا و آمریکا سفر می‌کند؟',
      a: 'خیر. بر اساس شاخص هنلی ۲۰۲۶، پاسپورت ترکیه رتبه ۴۵ جهانی و دسترسی به ۱۱۳ مقصد بدون ویزا یا با ویزای فرودگاهی دارد. با این حال، سفر به منطقه شینگن، بریتانیا، آمریکا و کانادا نیازمند ویزا است. مزیت اصلی پاسپورت ترکیه در دسترسی به ژاپن، کره جنوبی، سنگاپور، مالزی، برزیل و قطر است، نه اروپا یا آمریکای شمالی. اگر هدف اصلی دسترسی بدون ویزا به شینگن است، پاسپورت ترکیه این نیاز را برآورده نمی‌کند.',
    },
    {
      q: 'چه اعضای خانواده‌ای می‌توانند شهروندی ترکیه را همراهی کنند؟',
      a: 'همسر قانونی و فرزندان زیر ۱۸ سال می‌توانند همراه با متقاضی اصلی شهروندی دریافت کنند. برخلاف برخی برنامه‌های کارائیب، ترکیه والدین، اجداد یا فرزندان بالای ۱۸ سال را به‌عنوان همراه نمی‌پذیرد. فرزندان بالای ۱۸ سال باید مسیر جداگانه‌ای را طی کنند. این یک محدودیت مهم برای خانواده‌هایی است که فرزند بزرگسال دارند.',
    },
    {
      q: 'آیا مردان مشمول خدمت سربازی اجباری در ترکیه می‌شوند؟',
      a: 'خدمت سربازی یک وظیفه قانونی برای شهروندان مرد ترکیه است. با این حال، بر اساس قانون شماره ۷۱۷۹، افرادی که در سال دریافت شهروندی ۲۲ سال یا بیشتر دارند، مشمول خدمت اجباری نمی‌شوند. از آنجا که اکثر متقاضیان سرمایه‌گذاری بالای ۲۲ سال هستند، این معافیت عملاً اکثر آن‌ها را پوشش می‌دهد. با این حال، جزئیات باید با وکیل بررسی شود، زیرا وضعیت هر فرد متفاوت است.',
    },
    {
      q: 'آیا پس از ۳ سال می‌توان ملک را فروخت و شهروندی باقی می‌ماند؟',
      a: 'بله. پس از پایان دوره ۳ ساله قید عدم فروش، می‌توانید ملک را بفروشید یا اجاره دهید بدون اینکه شهروندی شما باطل شود. با این حال، در نظر داشته باشید که از دسامبر ۲۰۲۶، سیستم پرداخت امن (Güvenli Ödeme Sistemi) برای تمام معاملات ملکی اجباری می‌شود و پول خریدار تا تکمیل انتقال سند در بانک نگهداری می‌شود. این تغییر شفافیت را افزایش می‌دهد اما زمان‌بندی فروش را کمی طولانی‌تر می‌کند.',
    },
    {
      q: 'آیا محدودیت منطقه‌ای برای خرید ملک جهت شهروندی وجود دارد؟',
      a: 'بله. برخی مناطق ترکیه به دلایل امنیتی یا نظامی برای خرید خارجی‌ها ممنوع هستند. علاوه بر این، از سال ۲۰۲۶، بیش از ۱,۱۶۹ محله (از جمله مناطقی در استانبول مانند فاتح، بخش‌هایی از اسنیورت، شیشلی و بی‌اوغلو) برای درخواست‌های جدید اقامت مسکونی بسته شده‌اند. این محدودیت‌ها می‌توانند بر انتخاب ملک و مسیر شهروندی تأثیر بگذارند. قبل از خرید، باید وضعیت منطقه از نظر مجاز بودن برای شهروندی و اقامت بررسی شود.',
    },
  ];

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-[#061a21] text-slate-100" dir="rtl">
      {/* مسیریابی */}
      <div className="border-b border-white/10 bg-[#041217] px-4 py-3 md:px-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <button
              type="button"
              onClick={onBackToHome}
              className="flex cursor-pointer items-center gap-1 font-bold text-amber-400 transition hover:text-amber-300"
            >
              <ArrowRight className="h-4 w-4" />
              <span>صفحه اصلی دیاکو</span>
            </button>
            <span>/</span>
            <span>شهروندی اقتصادی</span>
            <span>/</span>
            <span className="font-semibold text-white">ترکیه ۲۰۲۶</span>
          </div>
          <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-bold text-red-300">
            🇹🇷 دپارتمان ترکیه دیاکو
          </span>
        </div>
      </div>

      {/* هشدار واقعیت */}
      <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2.5">
        <div className="container mx-auto flex max-w-5xl items-start gap-2 text-[11px] leading-5 text-amber-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>نکته حقوقی ۲۰۲۶:</strong> ارزش ملک بر اساس{' '}
            <strong>گزارش ارزیابی SPK</strong> سنجیده می‌شود، نه قیمت قرارداد.
            اگر ارزیابی کمتر از ۴۰۰,۰۰۰ دلار باشد، پرونده رد می‌شود. هزینه‌های
            جانبی واقعی ۵٪–۸٪ بیشتر از قیمت ملک است.
          </span>
        </div>
      </div>

      {/* هیرو */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#082833] via-[#061a21] to-[#041217] pt-10 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-3.5 py-1 text-xs font-black text-red-300">
                <Globe2 className="h-3.5 w-3.5" />
                رتبه ۴۵ هنلی — ۱۱۳ مقصد، اما شینگن و آمریکا ویزا
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                شهروندی و پاسپورت ترکیه ۲۰۲۶
                <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-l from-red-300 via-amber-300 to-yellow-300">
                  ملک ۴۰۰,۰۰۰ $، هزینه‌های واقعی و محدودیت‌ها
                </span>
              </h1>

              <div
                data-ai-answer
                className="speakable-summary mt-4 rounded-2xl border border-red-500/30 bg-[#0e2a35] p-4 text-xs leading-7 text-slate-200 shadow-lg sm:text-sm"
              >
                <div className="mb-1 flex items-center gap-1.5 font-bold text-red-300">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  خلاصه شفاف ۲۰۲۶:
                </div>
                ترکیه پاسپورت دوم را از طریق خرید ملک با ارزش ارزیابی‌شده{' '}
                <strong className="text-amber-300">۴۰۰,۰۰۰ دلار</strong> و قید
                عدم فروش ۳ ساله می‌دهد. پاسپورت برای{' '}
                <strong>همسر و فرزندان زیر ۱۸ سال</strong> صادر می‌شود (نه
                والدین یا فرزندان بزرگسال). هزینه‌های جانبی واقعی{' '}
                <strong className="text-rose-300">
                  ۵٪–۸٪ بیشتر از قیمت ملک
                </strong>{' '}
                است (مالیات تاپو ۴٪، ارزیابی SPK، حق‌الوکاله). پاسپورت رتبه ۴۵
                هنلی با ۱۱۳ مقصد، اما{' '}
                <strong className="text-rose-300">
                  شینگن، بریتانیا و آمریکا ویزا می‌خواهند
                </strong>
                . زمان کل فرآیند ۶–۱۲ ماه.
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <Building2 className="h-4 w-4" />
                  ارزیابی مسیر ملکی و شهروندی
                </button>
                <a
                  href="tel:+982191693955"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4 text-amber-400" />
                  مشاوره تهران: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="relative mx-auto aspect-[16/9] w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="استانبول ترکیه در کنار تنگه بسفر — مقصد شهروندی اقتصادی و پاسپورت دوم ۲۰۲۶"
                  loading="eager"
                  fetchPriority="high"
                  width={1000}
                  height={563}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent opacity-80" />
                <figcaption className="absolute bottom-3 right-3 left-3 rounded-xl border border-white/10 bg-[#061a21]/85 p-2.5 text-[11px] text-slate-300 backdrop-blur-md">
                  استانبول؛ مرکز اقتصادی، اما نه دروازه بدون ویزا به اروپا
                </figcaption>
              </figure>
            </div>
          </div>

          {/* کارت‌های آمار کلیدی */}
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-amber-300">
                حداقل ارزش ملک (ارزیابی SPK)
              </span>
              <div className="speakable-cost mt-1 text-xl font-black text-white">
                ۴۰۰,۰۰۰ $
              </div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                با قید ۳ سال عدم فروش
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-emerald-300">
                رتبه پاسپورت (هنلی ۲۰۲۶)
              </span>
              <div className="mt-1 text-xl font-black text-white">۴۵</div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                ۱۱۳ مقصد — شینگن ویزا
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-sky-300">
                تصمیم پس از ثبت
              </span>
              <div className="mt-1 text-xl font-black text-white">۳–۶ ماه</div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                کل فرآیند: ۶–۱۲ ماه
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-purple-300">
                هزینه‌های جانبی
              </span>
              <div className="mt-1 text-xl font-black text-white">۵٪–۸٪</div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                تاپو، ارزیابی، وکالت
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== محاسبه‌گر هزینه ========== */}
      <section className="bg-[#082029] py-14">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <h2 className="text-xl font-black text-white">
              برآورد شفاف هزینه واقعی شهروندی ترکیه ۲۰۲۶
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              شامل اصل سرمایه + مالیات تاپو + ارزیابی SPK + حق‌الوکاله + هزینه
              اقامت و پاسپورت
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="space-y-5">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-300">
                    ارزش ملک خریداری‌شده: ${' '}
                    {propertyPriceUSD.toLocaleString('fa-IR')}
                  </label>
                  <input
                    type="range"
                    min={400_000}
                    max={1_500_000}
                    step={25_000}
                    value={propertyPriceUSD}
                    onChange={(e) =>
                      setPropertyPriceUSD(Number(e.target.value))
                    }
                    className="w-full cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>۴۰۰,۰۰۰ $</span>
                    <span className="font-bold text-amber-400">
                      حداقل قانونی: ۴۰۰,۰۰۰ $
                    </span>
                    <span>۱,۵۰۰,۰۰۰ $</span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-300">
                    تعداد اعضای خانواده (متقاضی + همراهان):
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setFamilyMembers(n)}
                        className={`flex-1 cursor-pointer rounded-xl py-2 text-xs font-bold transition ${
                          familyMembers === n
                            ? 'bg-amber-400 font-black text-slate-900'
                            : 'bg-white/5 text-slate-300'
                        }`}
                      >
                        {n} نفر
                      </button>
                    ))}
                  </div>
                  <p className="mt-1 text-[10px] text-slate-500">
                    فقط همسر و فرزندان زیر ۱۸ سال قابل الحاق هستند
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>اصل سرمایه (ملک):</span>
                    <span className="font-mono text-white">
                      ${propertyPriceUSD.toLocaleString('fa-IR')}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>مالیات انتقال تاپو (۴٪، سهم خریدار):</span>
                    <span className="font-mono text-white">
                      + ${calculateFees.tapuTax.toLocaleString('fa-IR')}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>گزارش ارزیابی SPK (میانگین):</span>
                    <span className="font-mono text-white">
                      + ${calculateFees.valuation.toLocaleString('fa-IR')}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>حق‌الوکاله وکیل (میانگین):</span>
                    <span className="font-mono text-white">
                      + ${calculateFees.legal.toLocaleString('fa-IR')}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>دفتر اسناد رسمی و ترجمه:</span>
                    <span className="font-mono text-white">
                      + ${calculateFees.notaryTranslation.toLocaleString('fa-IR')}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>اقامت و پاسپورت ({familyMembers} نفر):</span>
                    <span className="font-mono text-white">
                      + $
                      {calculateFees.residencyAndPassport.toLocaleString(
                        'fa-IR'
                      )}
                    </span>
                  </div>
                  <div className="my-2 border-t border-white/10" />
                  <div className="flex justify-between font-bold text-amber-300">
                    <span>مجموع تقریبی واقعی:</span>
                    <span className="font-mono text-lg font-black">
                      ${calculateFees.total.toLocaleString('fa-IR')}
                    </span>
                  </div>
                  <p className="text-[10px] leading-5 text-slate-500">
                    هزینه‌های جانبی ≈ {calculateFees.sideCostPercentage}٪ از
                    قیمت ملک. مالیات تاپو معمولاً بین خریدار و فروشنده تقسیم
                    می‌شود؛ رقم بالا سهم کامل خریدار را نشان می‌دهد.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="mt-4 w-full cursor-pointer rounded-xl bg-amber-400 py-2.5 text-xs font-black text-slate-900 transition hover:bg-amber-300"
                >
                  بررسی پرونده و استعلام ظرفیت
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== مقاله غنی ========== */}
      <section className="border-y border-white/10 bg-[#05171e] py-14">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="mb-2 text-center text-2xl font-black text-white">
            هر آنچه باید درباره شهروندی ترکیه در ۲۰۲۶ بدانید
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-xs text-slate-400">
            تحلیل الزام ۴۰۰,۰۰۰ دلار، هزینه‌های واقعی، پاسپورت، خانواده،
            سربازی و محدودیت‌های منطقه‌ای.
          </p>

          <div className="space-y-10">
            {/* بخش ۱ — الزام ۴۰۰ هزار دلار */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-white">
                  ۱. الزام ۴۰۰,۰۰۰ دلار: چرا “قیمت قرارداد” کافی نیست
                </h3>
              </div>
              <p className="speakable-answer text-justify text-xs leading-7 text-slate-300">
                بسیاری تصور می‌کنند خرید ملکی با قیمت ۴۰۰,۰۰۰ دلار برای
                شهروندی کافی است. اما قانون ترکیه صریح است: ارزش ملک بر اساس{' '}
                <strong className="text-amber-300">
                  گزارش ارزیابی مؤسسه مجاز SPK
                </strong>{' '}
                سنجیده می‌شود، نه قیمتی که در قرارداد نوشته شده است. اگر
                ارزیابی رسمی کمتر از ۴۰۰,۰۰۰ دلار باشد، پرونده شهروندی{' '}
                <strong className="text-rose-300">بلافاصله رد می‌شود</strong>{' '}
                حتی اگر خریدار ۴۵۰,۰۰۰ دلار پرداخت کرده باشد. به همین دلیل،
                توصیه می‌شود بین قیمت خرید و آستانه ۴۰۰,۰۰۰ دلار حاشیه امن
                (حداقل ۵٪–۱۰٪) در نظر گرفته شود. خرید چند ملک نیز مجاز است
                به شرطی که مجموع ارزش ارزیابی آن‌ها به آستانه برسد. ملک
                می‌تواند در مرحله پیش‌فروش با قرارداد رسمی باشد، اما باید
                شرایط ارزیابی را برآورده کند.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  '✅ ارزیابی SPK ملاک است، نه قیمت قرارداد',
                  '✅ خرید چند ملک مجاز',
                  '✅ پیش‌فروش با قرارداد رسمی مجاز',
                  '❌ ارزیابی زیر ۴۰۰ هزار = رد فوری',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-[10px] font-bold text-amber-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {/* تصویر ویژه — تاپو و ارزیابی */}
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
                srcSet="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 800px"
                alt="اسناد ملکی و ارزیابی رسمی برای شهروندی ترکیه — گزارش SPK و سند تاپو ۲۰۲۶"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-52 w-full object-cover sm:h-64"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                گزارش ارزیابی SPK و سند تاپو؛ دو مدرک حیاتی که سرنوشت پرونده
                شهروندی را تعیین می‌کنند (منبع: Unsplash)
              </figcaption>
            </figure>

            {/* بخش ۲ — هزینه‌های واقعی */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <BadgeDollarSign className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۲. هزینه‌های واقعی: چرا ۴۰۰,۰۰۰ دلار فقط شروع است
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                تبلیغات اغلب فقط عدد ۴۰۰,۰۰۰ دلار را نشان می‌دهند. اما
                بودجه واقعی شامل سه بخش است: اصل سرمایه، هزینه‌های دولتی و
                مالیات، و هزینه‌های حرفه‌ای. مالیات انتقال تاپو{' '}
                <strong className="text-amber-300">۴٪</strong> است (برای ملک
                ۴۰۰,۰۰۰ دلاری معادل ۱۶,۰۰۰ دلار، معمولاً تقسیم بین خریدار و
                فروشنده). گزارش ارزیابی SPK{' '}
                <strong>۳۰۰–۵۰۰ دلار</strong>، حق‌الوکاله وکیل{' '}
                <strong>۳,۰۰۰–۱۰,۰۰۰ دلار</strong>، و هزینه‌های دفتر اسناد
                رسمی و ترجمه{' '}
                <strong>۵۰۰–۱,۵۰۰ دلار</strong> است. هزینه اقامت و پاسپورت
                نیز به ازای هر نفر محاسبه می‌شود. در مجموع، هزینه‌های جانبی
                معمولاً{' '}
                <strong className="text-rose-300">۵٪ تا ۸٪</strong> بیشتر از
                قیمت ملک است. برای یک ملک ۴۵۰,۰۰۰ دلاری، بودجه واقعی می‌تواند
                به ۴۸۰,۰۰۰ دلار یا بیشتر برسد.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-center text-[11px]">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="p-2 text-right font-bold">آیتم</th>
                      <th className="p-2 font-bold text-amber-300">
                        هزینه تقریبی
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">مالیات تاپو (۴٪)</td>
                      <td className="p-2 font-mono">۱۶,۰۰۰ $</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">گزارش ارزیابی SPK</td>
                      <td className="p-2 font-mono">۳۰۰–۵۰۰ $</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">حق‌الوکاله وکیل</td>
                      <td className="p-2 font-mono">۳,۰۰۰–۱۰,۰۰۰ $</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-bold text-amber-300">
                        مجموع جانبی
                      </td>
                      <td className="p-2 font-mono font-black text-amber-300">
                        ۵٪–۸٪
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* بخش ۳ — پاسپورت */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Plane className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  ۳. پاسپورت ترکیه ۲۰۲۶: رتبه ۴۵، ۱۱۳ مقصد، بدون شینگن
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                بر اساس شاخص هنلی ۲۰۲۶، پاسپورت ترکیه در{' '}
                <strong className="text-amber-300">رتبه ۴۵</strong> جهانی با
                دسترسی به <strong className="text-amber-300">۱۱۳ مقصد</strong>{' '}
                بدون ویزا یا با ویزای فرودگاهی قرار دارد. مزیت اصلی آن
                دسترسی به ژاپن، کره جنوبی، سنگاپور، مالزی، برزیل و قطر است.
                با این حال، یک محدودیت مهم وجود دارد که باید شفاف بیان شود:{' '}
                <strong className="text-rose-300">
                  سفر به منطقه شینگن، بریتانیا، آمریکا و کانادا نیازمند ویزا
                </strong>{' '}
                است. پاسپورت ترکیه یک ابزار قوی برای تحرک در آسیا، خاورمیانه
                و آمریکای لاتین است، اما برای اروپا یا آمریکای شمالی
                جایگزین ویزا نمی‌شود. پاسپورت ۱۰ ساله صادر می‌شود و پس از
                انقضا قابل تمدید است.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  '✅ ژاپن، کره جنوبی، سنگاپور',
                  '✅ مالزی، برزیل، قطر',
                  '❌ شینگن (ویزا)',
                  '❌ بریتانیا / آمریکا / کانادا (ویزا)',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {/* بخش ۴ — خانواده */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-black text-white">
                  ۴. دامنه خانواده: فقط همسر و فرزندان زیر ۱۸ سال
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                یکی از محدودیت‌های مهم برنامه ترکیه، دامنه باریک الحاق خانواده
                است. فقط <strong>همسر قانونی</strong> و{' '}
                <strong>فرزندان زیر ۱۸ سال</strong> می‌توانند در درخواست
                متقاضی اصلی گنجانده شوند. برخلاف برنامه‌هایی مانند دومینیکا
                یا گرنادا، ترکیه{' '}
                <strong className="text-rose-300">
                  والدین، اجداد یا فرزندان بالای ۱۸ سال را نمی‌پذیرد
                </strong>
                . فرزندان بزرگسال باید مسیر جداگانه‌ای را طی کنند که
                می‌تواند شامل سرمایه‌گذاری مستقل یا سایر مسیرهای اقامتی باشد.
                این محدودیت برای خانواده‌هایی که فرزند بالای ۱۸ سال دارند،
                یک عامل مهم در تصمیم‌گیری است.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  '✅ همسر قانونی',
                  '✅ فرزندان زیر ۱۸ سال',
                  '❌ والدین و اجداد',
                  '❌ فرزندان بالای ۱۸ سال',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-[10px] font-bold text-purple-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {/* بخش ۵ — سربازی */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۵. خدمت سربازی: معافیت عملی برای مردان بالای ۲۲ سال
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                خدمت سربازی یک وظیفه قانونی برای شهروندان مرد ترکیه است و در
                تبلیغات اغلب نادیده گرفته می‌شود. با این حال، بر اساس قانون
                شماره ۷۱۷۹، افرادی که در سال دریافت شهروندی{' '}
                <strong className="text-emerald-300">۲۲ سال یا بیشتر</strong>{' '}
                دارند، مشمول خدمت اجباری نمی‌شوند. از آنجا که اکثر متقاضیان
                سرمایه‌گذاری بالای ۲۲ سال هستند، این معافیت عملاً اکثر آن‌ها
                را پوشش می‌دهد. با این حال، این یک قاعده کلی است و وضعیت
                هر فرد باید با وکیل بررسی شود. برای مردان زیر ۲۲ سال،
                برنامه‌ریزی برای خدمت یا بررسی معافیت‌های احتمالی ضروری است.
              </p>
            </article>

            {/* بخش ۶ — محدودیت منطقه‌ای */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-white">
                  ۶. محدودیت‌های منطقه‌ای ۲۰۲۶: کدام محله‌ها مجاز نیستند؟
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                همه مناطق ترکیه برای خرید خارجی و شهروندی مجاز نیستند. برخی
                مناطق به دلایل امنیتی یا نظامی ممنوع هستند. علاوه بر این، از
                سال ۲۰۲۶، بیش از{' '}
                <strong className="text-rose-300">۱,۱۶۹ محله</strong> (از جمله
                مناطقی در استانبول مانند فاتح، بخش‌هایی از اسنیورت، شیشلی و
                بی‌اوغلو) برای درخواست‌های جدید اقامت مسکونی بسته شده‌اند.
                این محدودیت‌ها می‌توانند بر انتخاب ملک و مسیر شهروندی تأثیر
                بگذارند. مناطقی مانند باشاک‌شهیر و اسنیورت همچنان برای
                سرمایه‌گذاری شهروندی محبوب هستند، اما باید وضعیت مجاز بودن
                آن‌ها در زمان خرید بررسی شود. از دسامبر ۲۰۲۶ نیز سیستم
                پرداخت امن (Güvenli Ödeme Sistemi) برای تمام معاملات ملکی
                اجباری می‌شود که شفافیت را افزایش می‌دهد.
              </p>
            </article>

            {/* بخش ۷ — زمان‌بندی */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Timer className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  ۷. زمان‌بندی واقعی ۲۰۲۶: تصمیم ۳–۶ ماه، کل فرآیند ۶–۱۲ ماه
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                بر اساس گزارش‌های مشاوران در سال ۲۰۲۶، پس از تکمیل مدارک،
                تصمیم‌گیری درباره درخواست شهروندی معمولاً{' '}
                <strong className="text-sky-300">۳ تا ۶ ماه</strong> طول
                می‌کشد. کل فرآیند از انتخاب ملک تا دریافت پاسپورت{' '}
                <strong className="text-amber-300">۶ تا ۱۲ ماه</strong> است.
                مقامات ترکیه زمان رسمی پردازش را منتشر نمی‌کنند و هیچ
                تضمینی برای زمان‌بندی وجود ندارد. مرحله اقامت (برای
                انگشت‌نگاری) معمولاً ۲–۴ هفته طول می‌کشد. برنامه‌ریزی برای
                یک سال از زمان شروع، واقع‌بینانه‌تر از انتظار ۳ ماه است.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-center text-[11px]">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="p-2 text-right font-bold">مرحله</th>
                      <th className="p-2 font-bold text-sky-300">
                        زمان تقریبی
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">تصمیم پس از ثبت</td>
                      <td className="p-2 font-mono">۳–۶ ماه</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">اقامت و انگشت‌نگاری</td>
                      <td className="p-2 font-mono">۲–۴ هفته</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-bold text-amber-300">
                        کل فرآیند
                      </td>
                      <td className="p-2 font-mono font-black text-amber-300">
                        ۶–۱۲ ماه
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========== چک‌لیست مدارک ========== */}
      <section className="border-b border-white/10 py-12">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-white sm:text-2xl">
                چک‌لیست مدارک شهروندی ترکیه ۲۰۲۶
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                ارزیابی SPK و گواهی DAB دو مدرک غیرقابل جایگزین هستند
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
            >
              {copiedChecklist ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copiedChecklist ? 'کپی شد!' : 'کپی کل مدارک'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                onClick={() =>
                  setCheckedDocs((prev) => ({
                    ...prev,
                    [doc.id]: !prev[doc.id],
                  }))
                }
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                  checkedDocs[doc.id]
                    ? 'border-red-500/40 bg-red-950/20 text-white'
                    : 'border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/20'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-white/20 bg-black/40">
                  {checkedDocs[doc.id] && (
                    <Check className="h-3.5 w-3.5 text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{doc.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    {doc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== سوالات متداول ========== */}
      <section className="border-b border-white/10 py-12">
        <div className="container mx-auto max-w-3xl px-4 md:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-black text-white sm:text-2xl">
              پرسش‌های متداول شهروندی ترکیه ۲۰۲۶
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-right text-sm font-bold text-white transition hover:text-red-300"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-red-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/5 px-4 pb-4 pt-1 text-justify text-xs leading-7 text-slate-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CTA پایانی ========== */}
      <section className="pt-12 text-center">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950/40 to-amber-950/40 p-8">
            <Sparkles className="mx-auto mb-3 h-8 w-8 text-amber-400" />
            <h3 className="mb-2 text-xl font-black text-white sm:text-2xl">
              پرونده ترکیه را با آگاهی از هزینه‌ها و محدودیت‌ها شروع کنید
            </h3>
            <p className="mx-auto mb-6 max-w-xl text-xs leading-6 text-slate-300 sm:text-sm">
              تیم دیاکو با تسلط بر الزام ارزیابی SPK، گواهی DAB، قید ۳ ساله
              تاپو، هزینه‌های واقعی و محدودیت‌های منطقه‌ای ۲۰۲۶، شما را از
              انتخاب ملک تا دریافت پاسپورت همراهی می‌کند. هیچ هزینه پنهانی
              وجود ندارد.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="cursor-pointer rounded-xl bg-amber-400 px-6 py-3 text-sm font-black text-slate-900 shadow-lg transition hover:bg-amber-300"
              >
                ارزیابی رایگان پرونده ترکیه
              </button>
              <button
                type="button"
                onClick={onBackToHome}
                className="cursor-pointer rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                بازگشت به صفحه اصلی
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CitizenshipTurkeyPage;