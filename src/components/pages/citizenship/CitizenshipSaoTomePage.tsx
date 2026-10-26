import OptimizedImage from '../../OptimizedImage';
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
  Globe2,
  BadgeDollarSign,
  Users,
  Home,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Briefcase,
  Plane,
  Landmark,
  Lock,
  Fingerprint,
  Scale,
  Timer,
  FileCheck,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

// ✅ ساختار هزینه رسمی ۲۰۲۶ — منبع: cip.gov.st
const COST_2026 = {
  singleDonation: 90_000,
  family2to4Donation: 95_000,
  extraDependent: 5_000,
  submissionFee: 5_000,
  documentFeePerPerson: 750,
  sponsorDueDiligence: 5_000,
} as const;

// ✅ داده‌های پاسپورت ۲۰۲۶
const PASSPORT_2026 = {
  passportGradeRank: 60,
  visaFree: 24,
  evisaOrVoa: 72,
  totalMobility: 96,
  visaRequired: 100,
  schengenVisaFree: false,
  ukVisaFree: false,
  usVisaFree: false,
  passportValidityYears: 7,
} as const;

// ✅ زمان‌بندی واقعی ۲۰۲۶
const TIMELINE_2026 = {
  approvalMonths: '۲–۳ ماه',
  postApprovalDocWeeks: 'حداقل ۱۲ هفته',
  realisticTotalMonths: 'حداقل ۶ ماه',
  fastestApprovalDays: 26,
} as const;

export const CitizenshipSaoTomePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  // ==================== SEO + AIO ====================
  useSeo({
    title: 'شهروندی سائوتومه ۲۰۲۶ | ۹۰,۰۰۰ $، ۹۶ مقصد و محدودیت‌ها',
    description:
      'راهنمای رسمی CBI سائوتومه ۲۰۲۶؛ دونیت ۹۰,۰۰۰ $، دسترسی ۹۶ مقصد (۲۴ بدون ویزا + ۷۲ eVisa/VoA)، تأیید ۲–۳ ماهه اما پاسپورت ۶ ماهه، محدودیت سه‌تابعیتی و توقف پاسپورت همراهان بزرگسال. ارزیابی فوری.',
    canonical: '/guides/citizenship-sao-tome',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'شهروندی سائوتومه ۲۰۲۶',
      'پاسپورت سائوتومه و پرینسیپ',
      'CBI سائوتومه ۹۰ هزار دلار',
      'تابعیت اقتصادی ارزان‌ترین جهان',
      'سائوتومه بدون ویزا شینگن',
      'محدودیت سه تابعیتی سائوتومه',
      'پاسپورت ۷ ساله سائوتومه',
      'سائوتومه دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/citizenship-sao-tome#article',
          headline:
            'راهنمای جامع شهروندی سائوتومه و پرینسیپ ۲۰۲۶: ۹۰,۰۰۰ دلار، ۹۶ مقصد و محدودیت‌های جدید',
          description:
            'تحلیل کامل CBI سائوتومه شامل ساختار هزینه، زمان‌بندی واقعی (۶ ماه)، دامنه الحاق خانواده، محدودیت سه‌تابعیتی از آوریل ۲۰۲۶، توقف پاسپورت همراهان بزرگسال و مزایای مالیاتی.',
          image: [
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
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
            { '@type': 'Thing', name: 'São Tomé and Príncipe CBI' },
            { '@type': 'Thing', name: 'National Transformation Fund' },
            { '@type': 'Thing', name: 'Second Passport' },
          ],
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: [
              'h1',
              '.speakable-summary',
              '.speakable-cost',
              '.speakable-warning',
              '.speakable-answer',
            ],
          },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/citizenship-sao-tome#howto',
          name: 'مراحل دریافت شهروندی سائوتومه و پرینسیپ در ۲۰۲۶',
          description:
            'فرآیند گام‌به‌گام از انتخاب نماینده مجاز تا دریافت پاسپورت ۷ ساله بدون نیاز به سفر.',
          totalTime: 'P6M',
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: '90000',
          },
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'انتخاب نماینده مجاز (Licensed Marketing Agent)',
              text: 'درخواست باید از طریق یک نماینده بازاریابی مجاز رسمی ثبت شود؛ CIU فهرست نمایندگان معتبر را منتشر می‌کند.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'آماده‌سازی مدارک و پرداخت هزینه ۵,۰۰۰ دلاری ثبت',
              text: 'مدارک هویتی، گواهی عدم سوءپیشینه، اثبات منبع وجوه و اسناد خانوادگی. هزینه ثبت ۵,۰۰۰ دلار بدون توجه به اندازه خانواده است.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'طی فرآیند Due Diligence و دریافت تأییدیه اولیه',
              text: 'بررسی امنیتی چندلایه معمولاً ۲ تا ۳ ماه طول می‌کشد. سریع‌ترین پرونده ثبت‌شده ۲۶ روز بوده است.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'پرداخت دونیت به National Transformation Fund',
              text: 'پس از تأیید اولیه، ۹۰,۰۰۰ دلار (مجرد) یا ۹۵,۰۰۰ دلار (خانواده ۲–۴ نفره) به صندوق ملی پرداخت می‌شود.',
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'دریافت گواهی تابعیت و پاسپورت ۷ ساله',
              text: 'صدور اسناد شهروندی پس از تأیید حداقل ۱۲ هفته طول می‌کشد. پاسپورت بیومتریک ۷ ساله بدون نیاز به سفر صادر می‌شود.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/citizenship-sao-tome#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حداقل سرمایه‌گذاری برای شهروندی سائوتومه در ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای متقاضی مجرد، دونیت ۹۰,۰۰۰ دلار به National Transformation Fund به‌علاوه ۵,۰۰۰ دلار هزینه ثبت است. برای خانواده ۲ تا ۴ نفره، کل دونیت ۹۵,۰۰۰ دلار است و هر عضو اضافی ۵,۰۰۰ دلار اضافه می‌کند. هزینه صدور اسناد شهروندی ۷۵۰ دلار برای هر نفر است.',
              },
            },
            {
              '@type': 'Question',
              name: 'پاسپورت سائوتومه به کدام کشورها بدون ویزا سفر می‌کند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بر اساس داده‌های ۲۰۲۶، پاسپورت سائوتومه به ۲۴ کشور بدون ویزا دسترسی دارد و برای ۷۲ مقصد دیگر می‌توان eVisa یا ویزای فرودگاهی دریافت کرد (مجموع ۹۶ مقصد). این شامل آفریقای جنوبی، سیشل، باهاما، باربادوس، سینگاپور و مالزی است. سفر به منطقه شینگن، بریتانیا، آمریکا و کانادا نیازمند ویزا است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا دریافت شهروندی سائوتومه واقعاً ۶ هفته طول می‌کشد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. بر اساس یادداشت رسمی ژوئن ۲۰۲۶، تأییدیه اولیه حدود ۲ تا ۳ ماه طول می‌کشد (سریع‌ترین پرونده ۲۶ روز بوده)، اما صدور اسناد شهروندی پس از تأیید حداقل ۱۲ هفته زمان می‌برد. بنابراین از زمان ثبت تا دریافت پاسپورت باید حداقل ۶ ماه زمان‌بندی کرد. وعده‌های ۶ هفته‌ای با واقعیت عملیاتی ۲۰۲۶ همخوانی ندارد.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا محدودیتی برای متقاضیانی که تابعیت‌های متعدد دارند وجود دارد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. در آوریل ۲۰۲۶، CIU سائوتومه پذیرش درخواست‌های جدید از افرادی که سه یا بیشتر تابعیت خارجی دارند را به حالت تعلیق درآورد. این محدودیت بر اساس قانون تابعیت شماره ۰۷/۲۰۲۲ اعمال شده و تا زمان اصلاح پارلمانی ادامه دارد. متقاضیان با دو تابعیت یا کمتر می‌توانند اقدام کنند.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا پاسپورت فرزندان بزرگسال در ۲۰۲۶ صادر می‌شود؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'در حال حاضر خیر. CIU در آوریل ۲۰۲۶ صدور پاسپورت برای همراهان بزرگسال (فرزندان بالای ۱۸ سال) را تا زمان نهایی‌سازی چارچوب جدید وابستگی متوقف کرده است. این توقف موقت است، اما متقاضیانی که فرزند بالای ۱۸ سال دارند باید این ریسک زمانی را در برنامه‌ریزی خود لحاظ کنند.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا شهروندی سائوتومه معافیت مالیاتی ایجاد می‌کند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خود شهروندی به‌تنهایی اقامت مالیاتی ایجاد نمی‌کند. اما سائوتومه کشوری با مالیات بر درآمد شخصی ۰ تا ۲۵٪، مالیات شرکتی ۲۵٪، و بدون مالیات بر عایدی سرمایه، ارث یا ثروت است. همچنین سائوتومه به‌طور کامل به چارچوب CRS نپیوسته و می‌توان حساب بانکی از راه دور افتتاح کرد. برای استفاده از این مزایا معمولاً باید اقامت مالیاتی سائوتومه را احراز کنید.',
              },
            },
            {
              '@type': 'Question',
              name: 'تفاوت سائوتومه با دومینیکا یا سنت کیتس چیست؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'سائوتومه ارزان‌ترین برنامه فعال جهان است (۹۰,۰۰۰ $ در مقابل ۲۰۰,۰۰۰ $ دومینیکا و ۲۵۰,۰۰۰ $ سنت کیتس). اما قدرت پاسپورت آن محدودتر است: سائوتومه به شینگن دسترسی بدون ویزا ندارد، در حالی که دومینیکا و سنت کیتس دارند. سائوتومه برای کسانی مناسب است که اولویت اولشان هزینه پایین و سرعت نسبی است، نه دسترسی گسترده به اروپا. همچنین سائوتومه محدودیت سه‌تابعیتی دارد که در کارائیب وجود ندارد.',
              },
            },
          ],
        },
      ],
    },
  });

  // ==================== STATE ====================
  const [applicantType, setApplicantType] = useState<
    'single' | 'family2to4' | 'family5plus'
  >('single');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ==================== COST CALCULATOR ====================
  const estimateCost = useMemo(() => {
    let donation = 0;
    let extraDependents = 0;

    if (applicantType === 'single') donation = COST_2026.singleDonation;
    else if (applicantType === 'family2to4')
      donation = COST_2026.family2to4Donation;
    else {
      donation = COST_2026.family2to4Donation;
      extraDependents = 1;
    }

    const extraDependentFees = extraDependents * COST_2026.extraDependent;
    const submission = COST_2026.submissionFee;
    const documentFees =
      COST_2026.documentFeePerPerson *
      (applicantType === 'single' ? 1 : applicantType === 'family2to4' ? 4 : 5);

    const totalApprox =
      donation + extraDependentFees + submission + documentFees;

    return {
      donation,
      extraDependentFees,
      submission,
      documentFees,
      totalApprox,
    };
  }, [applicantType]);

  // ==================== DOCUMENTS ====================
  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'گذرنامه معتبر همه اعضای درخواست',
      desc: 'گذرنامه باید حداقل ۶ ماه اعتبار داشته باشد. برای هر عضو خانواده نسخه اسکن واضح تمام صفحات لازم است.',
    },
    {
      id: 'doc-2',
      title: 'گواهی عدم سوءپیشینه کیفری (Police Clearance Certificate)',
      desc: 'برای هر عضو ۱۸ سال به بالا از کشور مبدأ و کشورهای محل اقامت در ۱۰ سال گذشته. گواهی باید حداکثر ۶ ماه اعتبار داشته باشد.',
    },
    {
      id: 'doc-3',
      title: 'اثبات منبع وجوه (Source of Funds)',
      desc: 'اسناد نشان‌دهنده منشأ قانونی سرمایه: قرارداد فروش ملک، سود سهام، ارث، فروش کسب‌وکار یا درآمد شغلی. این بخش قلب Due Diligence است.',
    },
    {
      id: 'doc-4',
      title: 'مدارک اثبات رابطه خانوادگی',
      desc: 'شناسنامه ازدواج، گواهی تولد و در صورت وجود، اسناد سرپرستی. ترجمه رسمی به انگلیسی یا پرتغالی با تأییدیه کنسولی یا Apostille.',
    },
    {
      id: 'doc-5',
      title: 'نامه معرفی بانکی و اثبات آدرس',
      desc: 'نامه بانکی با سابقه حداقل ۶ ماهه و مدارک اثبات آدرس (قبض خدمات یا گواهی اقامت) برای همه اعضای ۱۸ سال به بالا.',
    },
    {
      id: 'doc-6',
      title: 'فرم درخواست تکمیل‌شده و توافق‌نامه نماینده مجاز',
      desc: 'درخواست باید از طریق یک Licensed Marketing Agent ثبت شود. فرم‌های رسمی CIU و قرارداد نمایندگی بخشی از این مرحله است.',
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
      q: 'حداقل سرمایه‌گذاری برای شهروندی سائوتومه در ۲۰۲۶ چقدر است؟',
      a: 'برای متقاضی مجرد، دونیت ۹۰,۰۰۰ دلار به National Transformation Fund به‌علاوه ۵,۰۰۰ دلار هزینه ثبت است. برای خانواده ۲ تا ۴ نفره، کل دونیت ۹۵,۰۰۰ دلار است و هر عضو اضافی ۵,۰۰۰ دلار اضافه می‌کند. هزینه صدور اسناد شهروندی ۷۵۰ دلار برای هر نفر است. اگر درخواست از طریق یک حامی (sponsor) ارائه شود، ۵,۰۰۰ دلار هزینه Due Diligence اضافی برای حامی اعمال می‌شود.',
    },
    {
      q: 'پاسپورت سائوتومه به کدام کشورها بدون ویزا سفر می‌کند؟',
      a: 'بر اساس داده‌های ۲۰۲۶، پاسپورت سائوتومه به ۲۴ کشور بدون ویزا دسترسی دارد و برای ۷۲ مقصد دیگر می‌توان eVisa یا ویزای فرودگاهی دریافت کرد (مجموع ۹۶ مقصد). مقاصد بدون ویزا شامل آفریقای جنوبی، سیشل، باهاما، باربادوس، سینگاپور و مالزی است. سفر به منطقه شینگن، بریتانیا، آمریکا و کانادا نیازمند ویزا است. رتبه پاسپورت در شاخص‌های مختلف بین ۶۰ تا ۱۳۰ گزارش می‌شود که تفاوت آن ناشی از روش‌شناسی شمارش مقاصد است.',
    },
    {
      q: 'آیا دریافت شهروندی سائوتومه واقعاً ۶ هفته طول می‌کشد؟',
      a: 'خیر. بر اساس یادداشت رسمی ژوئن ۲۰۲۶، تأییدیه اولیه حدود ۲ تا ۳ ماه طول می‌کشد (سریع‌ترین پرونده ۲۶ روز بوده)، اما صدور اسناد شهروندی پس از تأیید حداقل ۱۲ هفته زمان می‌برد. بنابراین از زمان ثبت تا دریافت پاسپورت باید حداقل ۶ ماه زمان‌بندی کرد. وعده‌های ۶ هفته‌ای با واقعیت عملیاتی ۲۰۲۶ همخوانی ندارد.',
    },
    {
      q: 'آیا محدودیتی برای متقاضیانی که تابعیت‌های متعدد دارند وجود دارد؟',
      a: 'بله. در آوریل ۲۰۲۶، CIU سائوتومه پذیرش درخواست‌های جدید از افرادی که سه یا بیشتر تابعیت خارجی دارند را به حالت تعلیق درآورد. این محدودیت بر اساس قانون تابعیت شماره ۰۷/۲۰۲۲ اعمال شده و تا زمان اصلاح پارلمانی ادامه دارد. متقاضیان با دو تابعیت یا کمتر می‌توانند اقدام کنند.',
    },
    {
      q: 'آیا پاسپورت فرزندان بزرگسال در ۲۰۲۶ صادر می‌شود؟',
      a: 'در حال حاضر خیر. CIU در آوریل ۲۰۲۶ صدور پاسپورت برای همراهان بزرگسال (فرزندان بالای ۱۸ سال) را تا زمان نهایی‌سازی چارچوب جدید وابستگی متوقف کرده است. این توقف موقت است، اما متقاضیانی که فرزند بالای ۱۸ سال دارند باید این ریسک زمانی را در برنامه‌ریزی خود لحاظ کنند. الحاق همراهان بزرگسال همچنان در درخواست پذیرفته می‌شود، اما صدور پاسپورت آن‌ها به تعویق افتاده است.',
    },
    {
      q: 'آیا شهروندی سائوتومه معافیت مالیاتی ایجاد می‌کند؟',
      a: 'خود شهروندی به‌تنهایی اقامت مالیاتی ایجاد نمی‌کند. اما سائوتومه کشوری با مالیات بر درآمد شخصی ۰ تا ۲۵٪، مالیات شرکتی ۲۵٪، و بدون مالیات بر عایدی سرمایه، ارث یا ثروت است. همچنین سائوتومه به‌طور کامل به چارچوب CRS نپیوسته و می‌توان حساب بانکی از راه دور افتتاح کرد. برای استفاده از این مزایا معمولاً باید اقامت مالیاتی سائوتومه را احراز کنید؛ صرف داشتن پاسپورت کافی نیست.',
    },
    {
      q: 'تفاوت سائوتومه با دومینیکا یا سنت کیتس چیست؟',
      a: 'سائوتومه ارزان‌ترین برنامه فعال جهان است (۹۰,۰۰۰ $ در مقابل ۲۰۰,۰۰۰ $ دومینیکا و ۲۵۰,۰۰۰ $ سنت کیتس). اما قدرت پاسپورت آن محدودتر است: سائوتومه به شینگن دسترسی بدون ویزا ندارد، در حالی که دومینیکا و سنت کیتس دارند. سائوتومه برای کسانی مناسب است که اولویت اولشان هزینه پایین و سرعت نسبی است، نه دسترسی گسترده به اروپا. همچنین سائوتومه محدودیت سه‌تابعیتی دارد که در کارائیب وجود ندارد.',
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
            <span className="font-semibold text-white">سائوتومه ۲۰۲۶</span>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-300">
            🇸🇹 برنامه تابعیت اقتصادی سائوتومه
          </span>
        </div>
      </div>

      {/* هشدار محدودیت‌های ۲۰۲۶ */}
      <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2.5">
        <div className="container mx-auto flex max-w-5xl items-start gap-2 text-[11px] leading-5 text-amber-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>هشدار عملیاتی ۲۰۲۶:</strong> پذیرش درخواست از دارندگان سه
            تابعیت یا بیشتر متوقف شده؛ صدور پاسپورت همراهان بالای ۱۸ سال نیز تا
            اطلاع ثانوی به تعویق افتاده است. جزئیات در ادامه.
          </span>
        </div>
      </div>

      {/* هیرو */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#082833] via-[#061a21] to-[#041217] pt-10 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-black text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                ارزان‌ترین CBI فعال جهان — ۹۰,۰۰۰ دلار
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                شهروندی سائوتومه و پرینسیپ ۲۰۲۶
                <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-l from-emerald-300 via-teal-300 to-amber-300">
                  ۹۰,۰۰۰ دلار، ۹۶ مقصد و واقعیت‌های عملیاتی
                </span>
              </h1>

              <div
                data-ai-answer
                className="speakable-summary mt-4 rounded-2xl border border-emerald-500/30 bg-[#0e2a35] p-4 text-xs leading-7 text-slate-200 shadow-lg sm:text-sm"
              >
                <div className="mb-1 flex items-center gap-1.5 font-bold text-emerald-300">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  خلاصه وضعیت ۲۰۲۶:
                </div>
                سائوتومه با دونیت{' '}
                <strong className="text-amber-300">۹۰,۰۰۰ دلار</strong> (مجرد)
                یا <strong className="text-amber-300">۹۵,۰۰۰ دلار</strong>{' '}
                (خانواده ۲–۴ نفره) ارزان‌ترین برنامه CBI فعال جهان است. پاسپورت
                ۷ ساله به{' '}
                <strong className="text-amber-300">۹۶ مقصد</strong> (۲۴ بدون
                ویزا + ۷۲ eVisa/VoA) دسترسی دارد، اما شینگن، بریتانیا و آمریکا
                ویزا می‌خواهند. تأییدیه اولیه ۲–۳ ماه است، اما صدور پاسپورت
                حداقل ۱۲ هفته پس از تأیید طول می‌کشد؛{' '}
                <strong className="text-rose-300">
                  برنامه‌ریزی برای ۶ ماه واقع‌بینانه است
                </strong>
                . محدودیت سه‌تابعیتی و توقف پاسپورت همراهان بزرگسال از آوریل
                ۲۰۲۶ اعمال شده است.
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <Globe2 className="h-4 w-4" />
                  ارزیابی اهلیت و محدودیت‌ها
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
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="سواحل استوایی جزایر سائوتومه و پرینسیپ در خلیج گینه — مقصد CBI ۲۰۲۶"
                  loading="eager"
                  fetchPriority="high"
                  width={1000}
                  height={563}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent opacity-80" />
                <figcaption className="absolute bottom-3 right-3 left-3 rounded-xl border border-white/10 bg-[#061a21]/85 p-2.5 text-[11px] text-slate-300 backdrop-blur-md">
                  سائوتومه؛ جزیره‌ای در خلیج گینه با ارزان‌ترین برنامه CBI جهان
                </figcaption>
              </figure>
            </div>
          </div>

          {/* کارت‌های آمار کلیدی */}
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-amber-300">
                دونیت پایه (مجرد)
              </span>
              <div className="speakable-cost mt-1 text-xl font-black text-white">
                ۹۰,۰۰۰ $
              </div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                خانواده ۲–۴ نفره: ۹۵,۰۰۰ $
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-emerald-300">
                دسترسی پاسپورت (۲۰۲۶)
              </span>
              <div className="mt-1 text-xl font-black text-white">۹۶ مقصد</div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                ۲۴ بدون ویزا + ۷۲ eVisa/VoA
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-sky-300">
                تأییدیه اولیه
              </span>
              <div className="mt-1 text-xl font-black text-white">۲–۳ ماه</div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                سریع‌ترین: ۲۶ روز
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-rose-300">
                تا دریافت پاسپورت
              </span>
              <div className="mt-1 text-xl font-black text-white">≥ ۶ ماه</div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                + حداقل ۱۲ هفته پس از تأیید
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
              برآورد شفاف هزینه شهروندی سائوتومه ۲۰۲۶
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              شامل دونیت دولتی + هزینه ثبت + هزینه اسناد شهروندی
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-300">
                    ترکیب خانواده:
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'single', label: 'متقاضی مجرد' },
                      { id: 'family2to4', label: 'خانواده ۲ تا ۴ نفره' },
                      { id: 'family5plus', label: 'خانواده ۵+ نفره' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setApplicantType(item.id as any)}
                        className={`w-full cursor-pointer rounded-xl border p-2.5 text-right text-xs transition ${
                          applicantType === item.id
                            ? 'border-amber-400 bg-amber-400/10 font-bold text-white'
                            : 'border-white/10 bg-black/20 text-slate-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/30 p-5">
                <div>
                  <div className="mb-3 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>دونیت به صندوق ملی:</span>
                      <span className="font-mono text-white">
                        ${estimateCost.donation.toLocaleString()}
                      </span>
                    </div>
                    {estimateCost.extraDependentFees > 0 && (
                      <div className="flex justify-between text-slate-400">
                        <span>عضو اضافی:</span>
                        <span className="font-mono text-white">
                          + $
                          {estimateCost.extraDependentFees.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-400">
                      <span>هزینه ثبت:</span>
                      <span className="font-mono text-white">
                        + ${estimateCost.submission.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>اسناد شهروندی:</span>
                      <span className="font-mono text-white">
                        + ${estimateCost.documentFees.toLocaleString()}
                      </span>
                    </div>
                    <div className="my-2 border-t border-white/10" />
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-200">
                        مجموع تقریبی:
                      </span>
                      <span className="font-mono text-lg font-black text-amber-300">
                        ${estimateCost.totalApprox.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] leading-5 text-slate-400">
                    هزینه ثبت ۵,۰۰۰ دلار برای هر درخواست (مستقل از اندازه
                    خانواده) و اسناد شهروندی ۷۵۰ دلار برای هر نفر است. اگر
                    درخواست از طریق حامی ارائه شود، ۵,۰۰۰ دلار Due Diligence
                    اضافی برای حامی اعمال می‌شود.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="mt-4 w-full cursor-pointer rounded-xl bg-amber-400 py-2.5 text-xs font-black text-slate-900 transition hover:bg-amber-300"
                >
                  استعلام ظرفیت و استارت پرونده
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
            هر آنچه باید درباره شهروندی سائوتومه در ۲۰۲۶ بدانید
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-xs text-slate-400">
            تحلیل دونیت، زمان‌بندی واقعی، محدودیت‌های جدید، دامنه خانواده،
            مالیات و مقایسه با کارائیب.
          </p>

          <div className="space-y-10">
            {/* بخش ۱ — ارزان‌ترین CBI */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۱. چرا سائوتومه ارزان‌ترین CBI فعال جهان است؟
                </h3>
              </div>
              <p className="speakable-answer text-justify text-xs leading-7 text-slate-300">
                سائوتومه در سپتامبر ۲۰۲۵ برنامه CBI خود را با دونیت{' '}
                <strong className="text-amber-300">۹۰,۰۰۰ دلار</strong> راه‌اندازی
                کرد و برای اولین بار در سه دهه گذشته، یک برنامه CBI کاملاً باز
                با قیمت زیر ۱۰۰,۰۰۰ دلار در دسترس قرار گرفت. این برنامه تحت
                قانون تابعیت شماره ۰۷/۲۰۲۲ و فرمان-قانون ۰۷/۲۰۲۵ فعالیت
                می‌کند و توسط یک مشارکت دولتی-خصوصی مستقر در دبی اداره
                می‌شود. برخلاف دومینیکا (۲۰۰,۰۰۰ $) یا سنت کیتس (۲۵۰,۰۰۰ $)،
                سائوتومه نقطه ورود بسیار پایین‌تری دارد. با این حال، ارزانی
                نسبی بهای خود را دارد: قدرت پاسپورت محدودتر است و برنامه
                هنوز در حال تثبیت چارچوب قانونی و عملیاتی خود است.
              </p>
              <div className="mt-5 grid gap-3 text-center text-[11px] sm:grid-cols-3">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <div className="font-black text-emerald-300">سپتامبر ۲۰۲۵</div>
                  <div className="mt-0.5 text-slate-400">آغاز برنامه</div>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                  <div className="font-black text-amber-300">۹۰,۰۰۰ $</div>
                  <div className="mt-0.5 text-slate-400">
                    ارزان‌ترین ورودی جهان
                  </div>
                </div>
                <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3">
                  <div className="font-black text-sky-300">+۲۰۰ درخواست</div>
                  <div className="mt-0.5 text-slate-400">
                    در ماه‌های نخست
                  </div>
                </div>
              </div>
            </article>

            {/* تصویر ویژه — جزیره */}
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
                srcSet="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 800px"
                alt="جزیره گرمسیری سائوتومه — مقصد شهروندی اقتصادی و پاسپورت دوم ۲۰۲۶"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-52 w-full object-cover sm:h-64"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                سائوتومه؛ جزیره‌ای ناشناخته اما با یکی از سریع‌ترین چارچوب‌های
                CBI در حال توسعه (منبع: Unsplash)
              </figcaption>
            </figure>

            {/* بخش ۲ — زمان‌بندی واقعی */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Timer className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  ۲. زمان‌بندی واقعی ۲۰۲۶: تأیید سریع، اما پاسپورت دیرتر
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                سائوتومه خود را با شعار “تأیید در چند هفته” معرفی کرد، اما
                واقعیت عملیاتی ۲۰۲۶ تصویر دقیق‌تری ارائه می‌دهد. بر اساس
                یادداشت رسمی ژوئن ۲۰۲۶،{' '}
                <strong>تأییدیه اولیه (approval-in-principle)</strong> معمولاً{' '}
                <strong className="text-sky-300">۲ تا ۳ ماه</strong> طول
                می‌کشد؛ سریع‌ترین پرونده ثبت‌شده ۲۶ روز بوده است. اما مرحله
                دوم —{' '}
                <strong className="text-rose-300">
                  صدور اسناد شهروندی پس از تأیید
                </strong>{' '}
                — حداقل <strong>۱۲ هفته</strong> زمان می‌برد. بنابراین از
                زمان ثبت درخواست تا دریافت پاسپورت، باید حداقل{' '}
                <strong className="text-amber-300">۶ ماه</strong> زمان‌بندی
                کرد. وعده‌های ۶ هفته‌ای با واقعیت همخوانی ندارد و اتکا به آن‌ها
                می‌تواند برنامه سفر یا سرمایه‌گذاری را مختل کند.
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
                      <td className="p-2 text-right">بررسی و تأییدیه اولیه</td>
                      <td className="p-2 font-mono">۲–۳ ماه</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">
                        صدور اسناد پس از تأیید
                      </td>
                      <td className="p-2 font-mono">≥ ۱۲ هفته</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-bold text-amber-300">
                        مجموع واقع‌بینانه
                      </td>
                      <td className="p-2 font-mono font-black text-amber-300">
                        ≥ ۶ ماه
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* بخش ۳ — محدودیت‌های آوریل ۲۰۲۶ */}
            <article className="rounded-3xl border border-amber-500/30 bg-amber-500/[0.06] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-amber-200">
                  ۳. دو محدودیت حیاتی که از آوریل ۲۰۲۶ اعمال شده‌اند
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-amber-100/85">
                در ۱۰ آوریل ۲۰۲۶، مدیر CIU سائوتومه یادداشتی منتشر کرد که دو
                تغییر عملیاتی مهم را اعلام می‌کرد. اول،{' '}
                <strong>
                  پذیرش درخواست‌های جدید از افرادی که سه یا بیشتر تابعیت
                  خارجی دارند به حالت تعلیق درآمد
                </strong>
                . این محدودیت بر اساس قانون تابعیت شماره ۰۷/۲۰۲۲ اعمال شده که
                اعطای تابعیت سائوتومه به دارندگان سه تابعیت یا بیشتر را ممنوع
                می‌کند؛ اصلاح پارلمانی این قانون هنوز نهایی نشده است. دوم،{' '}
                <strong>
                  صدور پاسپورت برای همراهان بزرگسال (فرزندان بالای ۱۸ سال) تا
                  زمان نهایی‌سازی چارچوب جدید وابستگی متوقف شد
                </strong>
                . الحاق این همراهان در درخواست همچنان پذیرفته می‌شود، اما
                دریافت پاسپورت آن‌ها به تعویق افتاده است. این دو محدودیت نشان
                می‌دهد که برنامه سائوتومه هنوز در حال تثبیت چارچوب قانونی خود
                است و متقاضیان باید با آگاهی از این ریسک‌ها تصمیم بگیرند.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  '⛔ سه تابعیت یا بیشتر: تعلیق',
                  '⏸️ پاسپورت همراهان ۱۸+: توقف موقت',
                  '✅ دو تابعیت یا کمتر: مجاز',
                  '✅ الحاق همراهان بزرگسال در درخواست: مجاز',
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

            {/* تصویر ویژه — گذرنامه و سفر */}
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
                srcSet="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 800px"
                alt="سفر با پاسپورت دوم — دسترسی به ۹۶ مقصد با پاسپورت سائوتومه ۲۰۲۶"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover sm:h-56"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                پاسپورت سائوتومه؛ ۹۶ مقصد با ترکیب بدون ویزا و eVisa/VoA، اما
                شینگن و بریتانیا نیازمند ویزا (منبع: Unsplash)
              </figcaption>
            </figure>

            {/* بخش ۴ — پاسپورت و محدودیت‌ها */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Plane className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۴. قدرت پاسپورت ۲۰۲۶: ۹۶ مقصد، بدون شینگن و بریتانیا
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                پاسپورت سائوتومه در سال ۲۰۲۶ به{' '}
                <strong className="text-amber-300">۹۶ مقصد</strong> دسترسی
                فراهم می‌کند: ۲۴ کشور بدون ویزا و ۷۲ مقصد با eVisa یا ویزای
                فرودگاهی. مقاصد شاخص بدون ویزا شامل{' '}
                <strong>آفریقای جنوبی، سیشل، باهاما، باربادوس، سینگاپور و
                مالزی</strong> است. با این حال، دو محدودیت مهم وجود دارد که
                باید شفاف بیان شوند:{' '}
                <strong className="text-rose-300">
                  سفر به منطقه شینگن نیازمند ویزا است
                </strong>{' '}
                و{' '}
                <strong className="text-rose-300">
                  بریتانیا، آمریکا و کانادا نیز ویزا می‌خواهند
                </strong>
                . این پاسپورت برای کسانی مناسب است که اولویت‌شان دسترسی به
                آفریقا، آسیای جنوب شرقی و کارائیب است، نه اروپا. پاسپورت
                سائوتومه{' '}
                <strong className="text-amber-300">۷ سال اعتبار</strong> دارد و
                پس از انقضا باید تمدید شود. همچنین سائوتومه عضو CPLP (جامعه
                کشورهای پرتغالی‌زبان) است که کانال‌های تحرک ترجیحی با پرتغال و
                برزیل را باز می‌کند.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  '✅ ۹۶ مقصد (۲۴ + ۷۲)',
                  '✅ آفریقای جنوبی، سیشل، سینگاپور',
                  '❌ شینگن (ویزا)',
                  '❌ بریتانیا / آمریکا / کانادا (ویزا)',
                  '✅ CPLP (پرتغال و برزیل)',
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

            {/* بخش ۵ — خانواده و مالیات */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-black text-white">
                  ۵. دامنه خانواده و مزایای مالیاتی
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                سائوتومه دامنه الحاق خانواده گسترده‌ای دارد: همسر یا شریک
                قانونی، فرزندان مجرد تا{' '}
                <strong className="text-purple-300">۳۰ سال</strong> که وابسته
                مالی هستند، و والدین/اجداد از{' '}
                <strong className="text-purple-300">۵۵ سال</strong> به بالا.
                یک درخواست واحد می‌تواند چندین نفر را پوشش دهد و هر عضو اضافی
                ۵,۰۰۰ دلار هزینه دارد. از نظر مالیاتی، سائوتومه مالیات بر
                درآمد شخصی ۰ تا ۲۵٪، مالیات شرکتی ۲۵٪، و{' '}
                <strong>بدون مالیات بر عایدی سرمایه، ارث یا ثروت</strong> دارد.
                همچنین سائوتومه به‌طور کامل به چارچوب CRS نپیوسته و می‌توان
                حساب بانکی از راه دور افتتاح کرد. نکته مهم: صرف داشتن
                پاسپورت، اقامت مالیاتی ایجاد نمی‌کند؛ برای بهره‌مندی از این
                مزایا باید اقامت مالیاتی سائوتومه را احراز کنید.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'همسر / شریک قانونی',
                  'فرزندان تا ۳۰ سال (وابسته)',
                  'والدین ۵۵+ (وابسته)',
                  'بدون مالیات بر ارث و سرمایه',
                  'خارج از CRS',
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

            {/* بخش ۶ — مقایسه */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  ۶. سائوتومه در مقابل دومینیکا و سنت کیتس
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                انتخاب بین سائوتومه و برنامه‌های کارائیب به اولویت‌ها بستگی
                دارد. سائوتومه با ۹۰,۰۰۰ دلار ارزان‌ترین است، اما به شینگن
                دسترسی بدون ویزا ندارد. دومینیکا با ۲۰۰,۰۰۰ دلار و سنت کیتس
                با ۲۵۰,۰۰۰ دلار گران‌تر هستند، اما پاسپورت آن‌ها به شینگن
                دسترسی دارد. همچنین سائوتومه محدودیت سه‌تابعیتی دارد که در
                کارائیب وجود ندارد. اگر هدف اصلی دسترسی گسترده به اروپا باشد،
                کارائیب انتخاب بهتری است. اگر هدف دومین پاسپورت با حداقل
                هزینه، دسترسی به آفریقا/آسیا و مزایای مالیاتی باشد، سائوتومه
                گزینه منطقی‌تری است.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-center text-[11px]">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="p-2 text-right font-bold">معیار</th>
                      <th className="p-2 font-bold text-amber-300">سائوتومه</th>
                      <th className="p-2 font-bold text-emerald-300">
                        دومینیکا
                      </th>
                      <th className="p-2 font-bold text-sky-300">
                        سنت کیتس
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">حداقل دونیت</td>
                      <td className="p-2 font-mono">۹۰,۰۰۰ $</td>
                      <td className="p-2 font-mono">۲۰۰,۰۰۰ $</td>
                      <td className="p-2 font-mono">۲۵۰,۰۰۰ $</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">شینگن بدون ویزا</td>
                      <td className="p-2 text-rose-300">❌</td>
                      <td className="p-2 text-emerald-300">✅</td>
                      <td className="p-2 text-emerald-300">✅</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right">محدودیت تابعیت</td>
                      <td className="p-2 text-amber-300">حداکثر ۲</td>
                      <td className="p-2">ندارد</td>
                      <td className="p-2">ندارد</td>
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
                چک‌لیست مدارک شهروندی سائوتومه ۲۰۲۶
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                آماده‌سازی دقیق، کلید عبور سریع از Due Diligence است
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
                    ? 'border-amber-500/40 bg-amber-950/20 text-white'
                    : 'border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/20'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-white/20 bg-black/40">
                  {checkedDocs[doc.id] && (
                    <Check className="h-3.5 w-3.5 text-amber-400" />
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
              پرسش‌های متداول شهروندی سائوتومه ۲۰۲۶
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
                    className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-right text-sm font-bold text-white transition hover:text-amber-300"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
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
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 to-emerald-950/40 p-8">
            <Sparkles className="mx-auto mb-3 h-8 w-8 text-amber-400" />
            <h3 className="mb-2 text-xl font-black text-white sm:text-2xl">
              پرونده سائوتومه را با آگاهی از محدودیت‌های ۲۰۲۶ شروع کنید
            </h3>
            <p className="mx-auto mb-6 max-w-xl text-xs leading-6 text-slate-300 sm:text-sm">
              تیم دیاکو با تسلط بر ساختار هزینه، زمان‌بندی واقعی ۶ ماهه،
              محدودیت سه‌تابعیتی و توقف پاسپورت همراهان بزرگسال، شما را از
              ارزیابی اولیه تا دریافت پاسپورت همراهی می‌کند.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="cursor-pointer rounded-xl bg-amber-400 px-6 py-3 text-sm font-black text-slate-900 shadow-lg transition hover:bg-amber-300"
              >
                ارزیابی رایگان پرونده سائوتومه
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

export default CitizenshipSaoTomePage;