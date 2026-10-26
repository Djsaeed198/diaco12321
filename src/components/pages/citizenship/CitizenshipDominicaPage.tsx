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
  Calendar,
  Fingerprint,
  Scale,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

// ✅ ساختار هزینه رسمی ۲۰۲۶ — منبع: CBIU (cbiu.gov.dm)
const COST_2026 = {
  edfSingle: 200_000,
  edfFamilyFour: 250_000,
  edfExtraUnder18: 25_000,
  edfExtraOver18: 40_000,
  realEstateMin: 200_000,
  dueDiligenceMain: 7_500,
  dueDiligenceDependent16Plus: 4_000,
  processingFee: 1_000,
  naturalisationCert: 500,
  interviewFee: 1_000,
} as const;

const PASSPORT_2026 = {
  henleyRank: 29,
  henleyDestinations: 145,
  caricomDestinations: 136,
  schengenVisaFree: true,
  ukVisaFree: false,
  usVisaFree: false,
  canadaVisaFree: false,
} as const;

export const CitizenshipDominicaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  // ==================== SEO + AIO ====================
  useSeo({
    title: 'پاسپورت دومینیکا ۲۰۲۶ | هزینه ۲۰۰,۰۰۰ $ و ۱۴۵ کشور',
    description:
      'راهنمای رسمی شهروندی دومینیکا ۲۰۲۶؛ EDF از ۲۰۰,۰۰۰ $ (خانواده ۴ نفره ۲۵۰,۰۰۰ $)، سفر بدون ویزا به شینگن (رتبه ۲۹ هنلی)، Due Diligence ۷,۵۰۰ $ و پاسپورت ۱۰ ساله بدون نیاز به اقامت. ارزیابی فوری.',
    canonical: '/guides/citizenship-dominica',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'پاسپورت دومینیکا ۲۰۲۶',
      'شهروندی دومینیکا با سرمایه‌گذاری',
      'هزینه پاسپورت دومینیکا EDF ۲۰۰ هزار دلار',
      'سفر بدون ویزا شینگن با پاسپورت دومینیکا',
      'Due Diligence دومینیکا ۷۵۰۰ دلار',
      'پاسپورت دومینیکا خانواده ۴ نفره ۲۵۰ هزار',
      'دومینیکا یا سنت کیتس مقایسه ۲۰۲۶',
      'پاسپورت دومینیکا دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/citizenship-dominica#article',
          headline:
            'راهنمای جامع شهروندی و پاسپورت دومینیکا ۲۰۲۶: هزینه ۲۰۰,۰۰۰ دلار، شینگن و ۱۴۵ مقصد',
          description:
            'تحلیل کامل برنامه CBI دومینیکا شامل EDF و املاک، ساختار دقیق هزینه‌ها (Due Diligence ۷,۵۰۰ $)، دامنه الحاق خانواده، رتبه ۲۹ پاسپورت در هنلی ۲۰۲۶ و محدودیت‌های جدید شینگن.',
          image: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=1200&q=80',
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
            { '@type': 'Thing', name: 'Dominica Citizenship by Investment' },
            { '@type': 'Thing', name: 'Economic Diversification Fund' },
            { '@type': 'Thing', name: 'Second Passport' },
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
          '@id': 'https://www.dia-co.ir/guides/citizenship-dominica#howto',
          name: 'مراحل دریافت شهروندی دومینیکا در ۲۰۲۶',
          description:
            'فرآیند گام‌به‌گام از انتخاب مسیر سرمایه‌گذاری تا دریافت پاسپورت بیومتریک.',
          totalTime: 'P9M',
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: '200000',
          },
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'انتخاب مسیر سرمایه‌گذاری (EDF یا املاک تأییدشده)',
              text: 'کمک بلاعوض به EDF از ۲۰۰,۰۰۰ دلار برای متقاضی مجرد یا سرمایه‌گذاری حداقل ۲۰۰,۰۰۰ دلاری در پروژه املاک تأییدشده دولتی.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'آماده‌سازی مدارک و ارسال از طریق Authorised Agent',
              text: 'درخواست باید از طریق یک نماینده مجاز رسمی ثبت شود؛ مدارک هویتی، اثبات منبع وجوه و گواهی عدم سوءپیشینه.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'طی فرآیند Due Diligence و مصاحبه اجباری',
              text: 'بررسی امنیتی چندلایه (هزینه ۷,۵۰۰ دلار برای متقاضی اصلی و ۴,۰۰۰ دلار برای هر همراه ۱۶ سال به بالا) و مصاحبه اجباری (۱,۰۰۰ دلار برای ۱۶ سال به بالا).',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'دریافت گواهی تابعیت و پاسپورت بیومتریک ۱۰ ساله',
              text: 'پس از تأیید، گواهی تابعیت (۵۰۰ دلار) صادر و پاسپورت بیومتریک ۱۰ ساله قابل تمدید تحویل داده می‌شود. نیازی به سفر به دومینیکا نیست.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/citizenship-dominica#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حداقل سرمایه‌گذاری برای پاسپورت دومینیکا در ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حداقل کمک بلاعوض به EDF برای متقاضی مجرد ۲۰۰,۰۰۰ دلار و برای خانواده چهار نفره ۲۵۰,۰۰۰ دلار است. مسیر املاک نیز حداقل ۲۰۰,۰۰۰ دلار سرمایه‌گذاری در پروژه تأییدشده دولتی را می‌طلبد. هزینه‌های دولتی جداگانه شامل Due Diligence، پردازش و مصاحبه نیز اضافه می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'پاسپورت دومینیکا به کدام کشورها بدون ویزا سفر می‌کند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بر اساس Henley Passport Index ژانویه ۲۰۲۶، پاسپورت دومینیکا رتبه ۲۹ جهانی و دسترسی به ۱۴۵ مقصد را دارد. این شامل کل منطقه شینگن (۲۷ کشور) برای اقامت ۹۰ روزه است. با این حال، از ژوئیه ۲۰۲۳ سفر به بریتانیا نیازمند ویزا شده و سفر به آمریکا، کانادا و استرالیا نیز ویزا می‌خواهد.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا برای پاسپورت دومینیکا باید در کشور اقامت کرد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. برنامه CBI دومینیکا هیچ الزام اقامتی ندارد. متقاضی و خانواده می‌توانند بدون سفر به دومینیکا و بدون زندگی در آن، شهروندی و پاسپورت دریافت کنند. پاسپورت از طریق نماینده مجاز یا سفارت تحویل داده می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'چه اعضای خانواده‌ای می‌توانند در درخواست دومینیکا گنجانده شوند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'همسر قانونی؛ فرزندان زیر ۱۸ سال؛ فرزندان ۱۸ تا ۳۰ سال که در دانشگاه ثبت‌نام کرده و وابسته مالی هستند؛ فرزندان بالای ۱۸ سال دارای معلولیت جسمی یا ذهنی؛ و والدین/اجداد بالای ۶۵ سال که وابسته مالی متقاضی یا همسر او هستند. خواهر و برادر مجرد زیر ۲۵ سال نیز در برخی شرایط قابل الحاق هستند.',
              },
            },
            {
              '@type': 'Question',
              name: 'فرآیند دریافت پاسپورت دومینیکا چقدر طول می‌کشد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بر اساس داده‌های Q4 2025، میانگین زمان پردازش ۹.۳ ماه با بازه ۴ تا ۱۸ ماه است. این بازه گسترده نشان می‌دهد که برنامه‌ریزی برای یک سال از زمان ثبت درخواست واقع‌بینانه‌تر از انتظار ۳ تا ۶ ماه است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا پاسپورت دومینیکا امکان سفر بدون ویزا به آمریکا یا کانادا را می‌دهد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. دارندگان پاسپورت دومینیکا برای سفر به آمریکا و کانادا به ویزا نیاز دارند. همچنین از ژوئیه ۲۰۲۳، بریتانیا ویزای اتباع دومینیکا را بازگردانده و سفر بدون ویزا به بریتانیا دیگر ممکن نیست. مزیت اصلی پاسپورت دومینیکا دسترسی به شینگن، هنگ‌کنگ و سنگاپور است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا شینگن ممکن است معافیت ویزای دومینیکا را لغو کند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'در دسامبر ۲۰۲۵، گزارش سالانه مکانیسم تعلیق ویزای اتحادیه اروپا، دومینیکا و چند کشور کارائیب دیگر را به دلیل نرخ پایین رد درخواست‌های CBI و حجم بالای پاسپورت‌های صادرشده زیر ذره‌بین قرار داد. این به معنای لغو فوری نیست، اما ریسک سیاسی برای آینده معافیت شینگن وجود دارد و متقاضیان باید از آن آگاه باشند.',
              },
            },
          ],
        },
      ],
    },
  });

  // ==================== STATE ====================
  const [investmentType, setInvestmentType] = useState<'edf' | 'realestate'>(
    'edf'
  );
  const [applicantType, setApplicantType] = useState<
    'single' | 'couple' | 'family4' | 'family5plus'
  >('single');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ==================== COST CALCULATOR ====================
  const estimateCost = useMemo(() => {
    let edfContribution = 0;
    let realEstateInvestment = 0;

    if (investmentType === 'edf') {
      if (applicantType === 'single') edfContribution = COST_2026.edfSingle;
      else if (applicantType === 'couple') edfContribution = COST_2026.edfFamilyFour;
      else if (applicantType === 'family4')
        edfContribution = COST_2026.edfFamilyFour;
      else if (applicantType === 'family5plus')
        edfContribution = COST_2026.edfFamilyFour + COST_2026.edfExtraUnder18;
    } else {
      realEstateInvestment = COST_2026.realEstateMin;
    }

    // هزینه‌های دولتی تقریبی
    const dependents16Plus =
      applicantType === 'single'
        ? 0
        : applicantType === 'couple'
        ? 1
        : applicantType === 'family4'
        ? 2
        : 3;

    const dueDiligence =
      COST_2026.dueDiligenceMain +
      dependents16Plus * COST_2026.dueDiligenceDependent16Plus;
    const processing = COST_2026.processingFee;
    const interview =
      COST_2026.interviewFee * (1 + dependents16Plus);
    const naturalisation =
      COST_2026.naturalisationCert * (1 + (applicantType === 'single' ? 0 : applicantType === 'couple' ? 1 : applicantType === 'family4' ? 3 : 4));

    const governmentFeesApprox =
      dueDiligence + processing + interview + naturalisation;

    const totalApprox =
      (investmentType === 'edf' ? edfContribution : realEstateInvestment) +
      governmentFeesApprox;

    return {
      edfContribution,
      realEstateInvestment,
      governmentFeesApprox,
      totalApprox,
    };
  }, [investmentType, applicantType]);

  // ==================== DOCUMENTS ====================
  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'گذرنامه معتبر و عکس بیومتریک همه اعضای درخواست',
      desc: 'گذرنامه باید حداقل ۶ ماه اعتبار داشته باشد. برای هر عضو خانواده یک نسخه عکس بیومتریک مطابق استانداردهای ICAO لازم است.',
    },
    {
      id: 'doc-2',
      title: 'گواهی عدم سوءپیشینه کیفری (Police Clearance Certificate)',
      desc: 'برای هر عضو ۱۶ سال به بالا از کشور مبدأ و کشورهای محل اقامت در ۱۰ سال گذشته. گواهی باید حداکثر ۶ ماه اعتبار داشته باشد.',
    },
    {
      id: 'doc-3',
      title: 'اثبات منبع وجوه (Source of Funds) و اظهارنامه بانکی',
      desc: 'اسناد نشان‌دهنده منشأ قانونی سرمایه: قرارداد فروش ملک، سود سهام، ارث، فروش کسب‌وکار یا درآمد شغلی. این بخش قلب Due Diligence است.',
    },
    {
      id: 'doc-4',
      title: 'مدارک اثبات رابطه خانوادگی (ازدواج، تولد، سرپرستی)',
      desc: 'ترجمه رسمی به انگلیسی با تأییدیه کنسولی یا Apostille. برای فرزندان ۱۸ تا ۳۰ سال، اثبات ثبت‌نام دانشگاه و وابستگی مالی نیز لازم است.',
    },
    {
      id: 'doc-5',
      title: 'گواهی پزشکی و آزمون HIV (برای برخی گروه‌های سنی)',
      desc: 'مطابق الزامات CBIU، گواهی سلامت عمومی و در برخی موارد آزمون HIV برای متقاضیان بالای ۱۲ سال درخواست می‌شود.',
    },
    {
      id: 'doc-6',
      title: 'نامه معرفی بانکی و اثبات آدرس',
      desc: 'نامه بانکی با سابقه حداقل ۶ ماهه و مدارک اثبات آدرس (قبض خدمات یا گواهی اقامت) برای همه اعضای ۱۸ سال به بالا.',
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
      q: 'حداقل سرمایه‌گذاری برای پاسپورت دومینیکا در ۲۰۲۶ چقدر است؟',
      a: 'حداقل کمک بلاعوض به EDF برای متقاضی مجرد ۲۰۰,۰۰۰ دلار است. برای خانواده چهار نفره (متقاضی + همسر + دو فرزند) این مبلغ به ۲۵۰,۰۰۰ دلار افزایش می‌یابد. برای هر فرزند اضافی زیر ۱۸ سال ۲۵,۰۰۰ دلار و برای هر همراه اضافی بالای ۱۸ سال ۴۰,۰۰۰ دلار به این مبلغ اضافه می‌شود. مسیر املاک نیز حداقل ۲۰۰,۰۰۰ دلار سرمایه‌گذاری در یک پروژه تأییدشده دولتی را می‌طلبد که باید حداقل سه سال نگهداری شود.',
    },
    {
      q: 'پاسپورت دومینیکا به کدام کشورها بدون ویزا سفر می‌کند؟',
      a: 'بر اساس Henley Passport Index ژانویه ۲۰۲۶، پاسپورت دومینیکا رتبه ۲۹ جهانی و دسترسی به ۱۴۵ مقصد دارد. این شامل کل منطقه شینگن (۲۷ کشور) برای اقامت ۹۰ روزه در هر ۱۸۰ روز است. هنگ‌کنگ و سنگاپور نیز بدون ویزا هستند. با این حال، از ژوئیه ۲۰۲۳ سفر به بریتانیا نیازمند ویزا شده است و سفر به آمریکا، کانادا و استرالیا نیز ویزا می‌خواهد. یک ارزیابی دیگر (CARICOM) دسترسی ۱۳۶ مقصد را گزارش می‌کند؛ تفاوت ناشی از روش‌شناسی متفاوت شمارش مقاصد است.',
    },
    {
      q: 'آیا برای پاسپورت دومینیکا باید در کشور اقامت کرد یا به آن سفر کرد؟',
      a: 'خیر. برنامه CBI دومینیکا هیچ الزام اقامتی یا حضور فیزیکی ندارد. متقاضی و خانواده می‌توانند بدون سفر به دومینیکا و بدون زندگی در آن، شهروندی و پاسپورت دریافت کنند. پاسپورت از طریق نماینده مجاز رسمی یا سفارت تحویل داده می‌شود. این یکی از متمایزترین ویژگی‌های دومینیکا در مقایسه با برنامه‌های اقامتی است.',
    },
    {
      q: 'چه اعضای خانواده‌ای می‌توانند در درخواست دومینیکا گنجانده شوند؟',
      a: 'همسر قانونی؛ فرزندان زیر ۱۸ سال؛ فرزندان ۱۸ تا ۳۰ سال که در دانشگاه ثبت‌نام کرده و کاملاً وابسته مالی هستند؛ فرزندان بالای ۱۸ سال دارای معلولیت جسمی یا ذهنی؛ و والدین/اجداد بالای ۶۵ سال که وابسته مالی متقاضی یا همسر او هستند. خواهر و برادر مجرد زیر ۲۵ سال که با متقاضی زندگی می‌کنند نیز در برخی شرایط قابل الحاق هستند. یک درخواست می‌تواند در مواردی تا ۸ تا ۱۲ نفر را پوشش دهد.',
    },
    {
      q: 'فرآیند دریافت پاسپورت دومینیکا چقدر طول می‌کشد؟',
      a: 'بر اساس داده‌های Q4 2025، میانگین زمان پردازش ۹.۳ ماه با بازه ۴ تا ۱۸ ماه است. این بازه گسترده نشان می‌دهد که برنامه‌ریزی برای یک سال از زمان ثبت درخواست واقع‌بینانه‌تر از انتظار ۳ تا ۶ ماه است. عواملی مانند کامل بودن مدارک، پیچیدگی Due Diligence و حجم درخواست‌ها بر زمان تأثیر می‌گذارند.',
    },
    {
      q: 'آیا شینگن ممکن است معافیت ویزای دومینیکا را لغو کند؟',
      a: 'در دسامبر ۲۰۲۵، گزارش سالانه مکانیسم تعلیق ویزای اتحادیه اروپا، دومینیکا و چند کشور کارائیب دیگر را به دلیل نرخ پایین رد درخواست‌های CBI و حجم بالای پاسپورت‌های صادرشده زیر ذره‌بین قرار داد. این به معنای لغو فوری نیست، اما یک ریسک سیاسی واقعی است. متقاضیان باید بدانند که مزیت شینگن ممکن است در آینده تحت فشار قرار گیرد و صرفاً بر آن به‌عنوان تنها دلیل اقدام تکیه نکنند.',
    },
    {
      q: 'تفاوت اصلی دومینیکا با سنت کیتس و نوییس در ۲۰۲۶ چیست؟',
      a: 'دومینیکا ارزان‌ترین نقطه ورود در کارائیب است (۲۰۰,۰۰۰ دلار در مقابل ۲۵۰,۰۰۰ دلار سنت کیتس). هزینه Due Diligence دومینیکا نیز پایین‌تر است (۷,۵۰۰ دلار در مقابل ۱۰,۰۰۰ دلار). با این حال، سنت کیتس معمولاً زمان پردازش سریع‌تر و اعتبار دیپلماتیک قوی‌تری دارد. انتخاب بین این دو به اولویت‌های متقاضی بستگی دارد: هزینه کمتر یا سرعت و پرستیژ بیشتر.',
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
              className="flex items-center gap-1 font-bold text-amber-400 transition hover:text-amber-300 cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" />
              <span>صفحه اصلی دیاکو</span>
            </button>
            <span>/</span>
            <span>شهروندی اقتصادی</span>
            <span>/</span>
            <span className="font-semibold text-white">دومینیکا ۲۰۲۶</span>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-300">
            🇩🇲 پاسپورت بین‌المللی دومینیکا
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
                رتبه ۲۹ هنلی ۲۰۲۶ — ۱۴۵ مقصد بدون ویزا
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                شهروندی و پاسپورت دومینیکا ۲۰۲۶
                <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-l from-emerald-300 via-teal-300 to-amber-300">
                  از ۲۰۰,۰۰۰ دلار تا شینگن و ۱۴۵ مقصد
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
                دومینیکا از سال ۱۹۹۳ قدیمی‌ترین برنامه شهروندی اقتصادی جهان
                را دارد. حداقل سرمایه‌گذاری{' '}
                <strong className="text-amber-300">۲۰۰,۰۰۰ دلار</strong> برای
                متقاضی مجرد (EDF) و{' '}
                <strong className="text-amber-300">۲۵۰,۰۰۰ دلار</strong> برای
                خانواده چهار نفره است. پاسپورت بیومتریک ۱۰ ساله با دسترسی
                بدون ویزا به کل شینگن و ۱۴۵ مقصد (هنلی ۲۰۲۶)، بدون هیچ الزام
                اقامت یا سفر. میانگین پردازش{' '}
                <strong className="text-amber-300">۹.۳ ماه</strong> است.
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <Globe2 className="h-4 w-4" />
                  ارزیابی اهلیت امنیتی (Due Diligence)
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
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="سواحل فیروزه‌ای و طبیعت گرمسیری دومینیکا — مقصد برنامه شهروندی اقتصادی ۲۰۲۶"
                  loading="eager"
                  fetchPriority="high"
                  width={1000}
                  height={563}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent opacity-80" />
                <figcaption className="absolute bottom-3 right-3 left-3 rounded-xl border border-white/10 bg-[#061a21]/85 p-2.5 text-[11px] text-slate-300 backdrop-blur-md">
                  دومینیکا؛ کارائیب، شهروندی مادام‌العمر و پاسپورت ۱۰ ساله
                </figcaption>
              </figure>
            </div>
          </div>

          {/* کارت‌های آمار کلیدی */}
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-amber-300">
                حداقل EDF (مجرد)
              </span>
              <div className="speakable-cost mt-1 text-xl font-black text-white">
                ۲۰۰,۰۰۰ $
              </div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                خانواده ۴ نفره: ۲۵۰,۰۰۰ $
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-emerald-300">
                رتبه پاسپورت (هنلی ۲۰۲۶)
              </span>
              <div className="mt-1 text-xl font-black text-white">
                ۲۹ جهانی
              </div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                ۱۴۵ مقصد بدون ویزا
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-sky-300">
                میانگین پردازش
              </span>
              <div className="mt-1 text-xl font-black text-white">۹.۳ ماه</div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                بازه ۴ تا ۱۸ ماه
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] font-bold text-purple-300">
                Due Diligence (اصلی)
              </span>
              <div className="mt-1 text-xl font-black text-white">۷,۵۰۰ $</div>
              <p className="mt-0.5 text-[10px] text-slate-400">
                هر همراه ۱۶+ سال: ۴,۰۰۰ $
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
              برآورد شفاف هزینه پاسپورت دومینیکا ۲۰۲۶
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              شامل کمک دولتی + هزینه‌های Due Diligence، پردازش، مصاحبه و گواهی
              تابعیت
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-300">
                    روش سرمایه‌گذاری:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setInvestmentType('edf')}
                      className={`cursor-pointer rounded-xl py-2.5 text-xs font-bold transition ${
                        investmentType === 'edf'
                          ? 'bg-amber-400 font-black text-slate-900'
                          : 'bg-white/5 text-slate-300'
                      }`}
                    >
                      کمک بلاعوض EDF
                    </button>
                    <button
                      type="button"
                      onClick={() => setInvestmentType('realestate')}
                      className={`cursor-pointer rounded-xl py-2.5 text-xs font-bold transition ${
                        investmentType === 'realestate'
                          ? 'bg-amber-400 font-black text-slate-900'
                          : 'bg-white/5 text-slate-300'
                      }`}
                    >
                      املاک تأییدشده (۲۰۰k$)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-300">
                    ترکیب خانواده:
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'single', label: 'متقاضی مجرد' },
                      { id: 'couple', label: 'متقاضی + همسر' },
                      { id: 'family4', label: 'خانواده ۴ نفره' },
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
                      <span>سرمایه‌گذاری اصلی:</span>
                      <span className="font-mono text-white">
                        $
                        {(
                          investmentType === 'edf'
                            ? estimateCost.edfContribution
                            : estimateCost.realEstateInvestment
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>هزینه‌های دولتی (تقریبی):</span>
                      <span className="font-mono text-amber-300">
                        + ${estimateCost.governmentFeesApprox.toLocaleString()}
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
                    هزینه‌های دولتی شامل Due Diligence (۷,۵۰۰ $ اصلی + ۴,۰۰۰ $
                    هر همراه ۱۶+)، پردازش (۱,۰۰۰ $)، مصاحبه (۱,۰۰۰ $) و گواهی
                    تابعیت (۵۰۰ $) است. مبالغ ممکن است بر اساس پیچیدگی پرونده
                    متفاوت باشد.
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
            هر آنچه باید درباره شهروندی دومینیکا در ۲۰۲۶ بدانید
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-xs text-slate-400">
            تحلیل مسیرهای سرمایه‌گذاری، هزینه‌های واقعی، محدودیت‌های پاسپورت،
            ریسک شینگن و مقایسه با سنت کیتس.
          </p>

          <div className="space-y-10">
            {/* بخش ۱ — چرا دومینیکا */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۱. چرا دومینیکا قدیمی‌ترین و مقرون‌به‌صرفه‌ترین CBI جهان است؟
                </h3>
              </div>
              <p className="speakable-answer text-justify text-xs leading-7 text-slate-300">
                برنامه شهروندی اقتصادی دومینیکا از سال{' '}
                <strong className="text-amber-300">۱۹۹۳</strong> فعالیت می‌کند
                و قدیمی‌ترین برنامه فعال در جهان است. این سابقه طولانی، همراه
                با چارچوب نظارتی تثبیت‌شده، آن را به گزینه‌ای قابل‌پیش‌بینی
                برای خانواده‌هایی تبدیل کرده که به دنبال پاسپورت دوم با حداقل
                پیچیدگی هستند. برخلاف برخی برنامه‌های اروپایی که الزام اقامت
                یا سرمایه‌گذاری سنگین دارند، دومینیکا از{' '}
                <strong className="text-amber-300">۲۰۰,۰۰۰ دلار</strong> شروع
                می‌شود، هیچ الزام اقامتی ندارد و شهروندی را برای نسل‌های آینده
                قابل انتقال می‌کند. در سال ۲۰۲۶، با وجود افزایش نظارت اتحادیه
                اروپا و اصلاحات نظارتی، دومینیکا همچنان ارزان‌ترین نقطه ورود
                در میان پنج برنامه اصلی CBI کارائیب است.
              </p>
              <div className="mt-5 grid gap-3 text-center text-[11px] sm:grid-cols-3">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <div className="font-black text-emerald-300">۱۹۹۳</div>
                  <div className="mt-0.5 text-slate-400">
                    قدیمی‌ترین CBI جهان
                  </div>
                </div>
                <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3">
                  <div className="font-black text-sky-300">۲۰۰,۰۰۰ $</div>
                  <div className="mt-0.5 text-slate-400">
                    ارزان‌ترین ورودی کارائیب
                  </div>
                </div>
                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3">
                  <div className="font-black text-purple-300">۰ روز</div>
                  <div className="mt-0.5 text-slate-400">
                    الزام اقامت
                  </div>
                </div>
              </div>
            </article>

            {/* تصویر ویژه — کارائیب */}
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                srcSet="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 800px"
                alt="ساحل گرمسیری کارائیب — دومینیکا مقصد شهروندی اقتصادی و پاسپورت دوم ۲۰۲۶"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-52 w-full object-cover sm:h-64"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                کارائیب؛ دومینیکا با ۳۶۵ رودخانه و طبیعت دست‌نخورده، اما
                مزیت اصلی آن پاسپورت است، نه اقامت (منبع: Unsplash)
              </figcaption>
            </figure>

            {/* بخش ۲ — دو مسیر سرمایه‌گذاری */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  ۲. دو مسیر رسمی ۲۰۲۶: EDF در مقابل املاک تأییدشده
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                برنامه دومینیکا دو مسیر اصلی دارد. مسیر{' '}
                <strong>EDF (Economic Diversification Fund)</strong> یک کمک
                بلاعوض غیرقابل‌بازگشت است که از ۲۰۰,۰۰۰ دلار برای متقاضی مجرد
                آغاز می‌شود و برای خانواده چهار نفره به ۲۵۰,۰۰۰ دلار می‌رسد.
                این پول صرف زیرساخت، آموزش، سلامت و پروژه‌های تاب‌آوری اقلیمی
                می‌شود. مسیر <strong>املاک تأییدشده</strong> نیز حداقل
                ۲۰۰,۰۰۰ دلار سرمایه‌گذاری در یک پروژه دولتی (هتل، استراحتگاه
                یا پروژه گردشگری) را می‌طلبد. تفاوت کلیدی: در EDF پول
                بازنمی‌گردد، اما در املاک، دارایی فیزیکی حفظ می‌شود. با این
                حال، املاک باید حداقل{' '}
                <strong className="text-amber-300">سه سال</strong> نگهداری شود
                و در صورت فروش به متقاضی دیگر CBI، حداقل پنج سال از زمان
                دریافت شهروندی اولیه گذشته باشد. تأیید دولتی پروژه به معنای
                تضمین بازده مالی یا اجاره نیست و متقاضی باید مشاوره مستقل
                بگیرد.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-center text-[11px]">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="p-2 text-right font-bold">معیار</th>
                      <th className="p-2 font-bold text-amber-300">EDF</th>
                      <th className="p-2 font-bold text-sky-300">املاک</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">حداقل سرمایه</td>
                      <td className="p-2 font-mono">۲۰۰,۰۰۰ $</td>
                      <td className="p-2 font-mono">۲۰۰,۰۰۰ $</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">خانواده ۴ نفره</td>
                      <td className="p-2 font-mono">۲۵۰,۰۰۰ $</td>
                      <td className="p-2 font-mono">۲۰۰,۰۰۰ $ + هزینه‌ها</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right">بازگشت سرمایه</td>
                      <td className="p-2">خیر (بلاعوض)</td>
                      <td className="p-2">دارایی فیزیکی</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right">دوره نگهداری</td>
                      <td className="p-2">—</td>
                      <td className="p-2">حداقل ۳ سال</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* بخش ۳ — پاسپورت و محدودیت‌ها */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Plane className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۳. قدرت پاسپورت ۲۰۲۶: شینگن بله، بریتانیا و آمریکا خیر
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                پاسپورت دومینیکا در ژانویه ۲۰۲۶ توسط Henley Passport Index در
                رتبه <strong className="text-amber-300">۲۹ جهانی</strong> با
                دسترسی به <strong className="text-amber-300">۱۴۵ مقصد</strong>{' '}
                قرار گرفت. این دسترسی شامل کل منطقه شینگن (۲۷ کشور) برای اقامت
                ۹۰ روزه در هر ۱۸۰ روز، هنگ‌کنگ و سنگاپور است. با این حال، دو
                محدودیت مهم وجود دارد که در تبلیغات اغلب نادیده گرفته می‌شود:{' '}
                <strong className="text-rose-300">
                  بریتانیا از ژوئیه ۲۰۲۳ ویزای اتباع دومینیکا را بازگردانده
                </strong>{' '}
                و سفر بدون ویزا به بریتانیا دیگر ممکن نیست. سفر به آمریکا و
                کانادا نیز ویزا می‌خواهد. علاوه بر این، یک ارزیابی دیگر
                (CARICOM/Passport Reports) دسترسی ۱۳۶ مقصد را گزارش می‌کند که
                تفاوت آن ناشی از روش شمارش متفاوت است. متقاضیان باید بر اساس
                نیاز واقعی سفر خود تصمیم بگیرند، نه فقط عدد کلی.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  '✅ شینگن (۲۷ کشور)',
                  '✅ هنگ‌کنگ و سنگاپور',
                  '❌ بریتانیا (ویزا از ۲۰۲۳)',
                  '❌ آمریکا و کانادا',
                  '⚠️ ریسک سیاسی شینگن (۲۰۲۵)',
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

            {/* تصویر ویژه — پاسپورت و سفر */}
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=1200&q=80"
                srcSet="https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 800px"
                alt="فرودگاه بین‌المللی و سفر با پاسپورت دومینیکا — دسترسی به شینگن و ۱۴۵ مقصد ۲۰۲۶"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover sm:h-56"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                پاسپورت دومینیکا؛ شینگن بدون ویزا، اما بریتانیا و آمریکا
                نیازمند ویزا (منبع: Unsplash)
              </figcaption>
            </figure>

            {/* بخش ۴ — Due Diligence */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Fingerprint className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-black text-white">
                  ۴. Due Diligence: قلب برنامه و دلیل هزینه ۷,۵۰۰ دلاری
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                دومینیکا یکی از سخت‌گیرانه‌ترین فرآیندهای Due Diligence در
                کارائیب را دارد و همین سخت‌گیری است که اعتبار پاسپورت را حفظ
                می‌کند. هزینه Due Diligence برای متقاضی اصلی{' '}
                <strong className="text-purple-300">۷,۵۰۰ دلار</strong> و برای
                هر همراه ۱۶ سال به بالا{' '}
                <strong className="text-purple-300">۴,۰۰۰ دلار</strong> است.
                این بررسی شامل تطبیق هویت، سابقه کیفری در کشورهای محل اقامت،
                بررسی تحریم‌ها، منبع وجوه و در برخی موارد بررسی رسانه‌ها و
                پرونده‌های حقوقی است. از ۲۰۲۴،{' '}
                <strong className="text-amber-300">مصاحبه اجباری</strong> نیز
                برای متقاضیان ۱۶ سال به بالا (هزینه ۱,۰۰۰ دلار) اضافه شده
                است. هرگونه اطلاعات نادرست یا پنهان‌کاری می‌تواند به رد دائم
                درخواست منجر شود. به همین دلیل، انتخاب یک Authorised Agent
                معتبر و آماده‌سازی دقیق مدارک، حیاتی است.
              </p>
            </article>

            {/* بخش ۵ — خانواده */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-rose-400" />
                <h3 className="text-lg font-black text-white">
                  ۵. دامنه الحاق خانواده: از فرزند ۳۰ ساله تا والدین ۶۵+
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-slate-300">
                یکی از گسترده‌ترین دامنه‌های الحاق خانواده در میان برنامه‌های
                CBI متعلق به دومینیکا است. علاوه بر همسر و فرزندان زیر ۱۸ سال،
                فرزندان <strong className="text-rose-300">۱۸ تا ۳۰ سال</strong>{' '}
                که در دانشگاه ثبت‌نام کرده و کاملاً وابسته مالی هستند، فرزندان
                بالای ۱۸ سال دارای معلولیت، و{' '}
                <strong className="text-rose-300">
                  والدین/اجداد بالای ۶۵ سال
                </strong>{' '}
                که وابسته مالی متقاضی یا همسر او هستند، قابل الحاق هستند.
                خواهر و برادر مجرد زیر ۲۵ سال نیز در برخی شرایط پذیرفته
                می‌شوند. یک درخواست واحد می‌تواند در مواردی{' '}
                <strong>۸ تا ۱۲ نفر</strong> را پوشش دهد. این انعطاف‌پذیری
                دومینیکا را برای خانواده‌های چندنسلی جذاب می‌کند، اما باید
                توجه داشت که هر همراه ۱۶+ سال هزینه Due Diligence جداگانه
                دارد.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'همسر قانونی',
                  'فرزندان زیر ۱۸',
                  'فرزندان ۱۸–۳۰ (دانشجو)',
                  'والدین ۶۵+ وابسته',
                  'خواهر/برادر مجرد زیر ۲۵',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text-[10px] font-bold text-rose-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {/* بخش ۶ — ریسک شینگن */}
            <article className="rounded-3xl border border-amber-500/25 bg-amber-500/[0.06] p-6 md:p-8">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-black text-amber-200">
                  ریسک ۲۰۲۵–۲۰۲۶: معافیت شینگن زیر ذره‌بین اتحادیه اروپا
                </h3>
              </div>
              <p className="text-justify text-xs leading-7 text-amber-100/85">
                در دسامبر ۲۰۲۵، گزارش سالانه مکانیسم تعلیق ویزای اتحادیه
                اروپا، دومینیکا و چند کشور کارائیب دیگر را به دلیل نرخ پایین
                رد درخواست‌های CBI و حجم بالای پاسپورت‌های صادرشده به‌طور
                خاص مورد اشاره قرار داد. این گزارش به معنای لغو فوری معافیت
                شینگن نیست، اما یک{' '}
                <strong>ریسک سیاسی واقعی</strong> برای آینده است. متقاضیانی
                که پاسپورت دومینیکا را صرفاً برای دسترسی بدون ویزا به شینگن
                می‌خواهند، باید این ریسک را در تصمیم خود لحاظ کنند. دومینیکا
                در حال رایزنی با اتحادیه اروپا است و همزمان برای بازگرداندن
                معافیت ویزای بریتانیا تلاش می‌کند، اما هیچ تضمینی برای نتیجه
                وجود ندارد. تنوع بخشیدن به گزینه‌های سفر و عدم اتکای کامل به
                یک پاسپورت، رویکرد عاقلانه‌تری است.
              </p>
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
                چک‌لیست مدارک شهروندی دومینیکا ۲۰۲۶
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                آماده‌سازی دقیق، کلید عبور از Due Diligence است
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
              پرسش‌های متداول شهروندی دومینیکا ۲۰۲۶
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
              پرونده دومینیکا را با شفافیت کامل شروع کنید
            </h3>
            <p className="mx-auto mb-6 max-w-xl text-xs leading-6 text-slate-300 sm:text-sm">
              تیم دیاکو با تسلط بر ساختار هزینه ۲۰۲۶، الزامات Due Diligence و
              ریسک‌های شینگن، شما را از انتخاب مسیر تا دریافت پاسپورت همراهی
              می‌کند. هیچ هزینه پنهانی وجود ندارد.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="cursor-pointer rounded-xl bg-amber-400 px-6 py-3 text-sm font-black text-slate-900 shadow-lg transition hover:bg-amber-300"
              >
                ارزیابی رایگان پرونده دومینیکا
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

export default CitizenshipDominicaPage;