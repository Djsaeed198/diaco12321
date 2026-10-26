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
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  AlertTriangle,
  Users,
  Home,
  TrendingUp,
  Plane,
  Scale,
  Percent,
  MapPin,
  Timer,
  Wallet,
  Building2,
  Euro,
  ShieldCheck,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

// ✅ حداقل دستمزد قانونی Ausbildung ۲۰۲۶ (BBiG §17)
const MIN_TRAINING_2026 = {
  year1: 724,
  year2: 854,
  year3: 977,
  year4: 1014,
} as const;

// ✅ آستانه معافیت از Sperrkonto (Make it in Germany 2026)
const VISA_THRESHOLD_2026 = {
  minimumNetPerMonth: 959, // حداقل مبلغ نت مورد نیاز برای پوشش زندگی
  trainingGrossExemption: 1_048, // اگر حقوق ناخالص ≥ این مقدار، معاف از Sperrkonto
  trainingNetEquivalent: 822, // معادل نت ۱,۰۴۸ یورو
  blockedAccountPerMonth: 1_091, // اگر نیاز به Sperrkonto باشد، مبلغ ماهانه
} as const;

// ✅ داده‌های حقوق واقعی ۲۰۲۶ بر اساس رشته و سال (MS in Germany / GoGermany)
const AUSBILDUNG_FIELDS = [
  {
    id: 'nursing',
    label: 'پرستاری (Pflegefachkraft)',
    y1: [1190, 1490],
    y2: [1250, 1550],
    y3: [1350, 1650],
    postTraining: [3200, 4200],
  },
  {
    id: 'it',
    label: 'فناوری اطلاعات (Fachinformatiker)',
    y1: [1000, 1250],
    y2: [1060, 1300],
    y3: [1130, 1400],
    postTraining: [2800, 3900],
  },
  {
    id: 'mechatronics',
    label: 'مکاترونیک (Mechatroniker)',
    y1: [950, 1250],
    y2: [1020, 1300],
    y3: [1100, 1350],
    postTraining: [2800, 3500],
  },
  {
    id: 'electronics',
    label: 'برق صنعتی (Elektroniker)',
    y1: [900, 1100],
    y2: [970, 1180],
    y3: [1060, 1280],
    postTraining: [2700, 3400],
  },
  {
    id: 'automotive',
    label: 'مکانیک خودرو (KFZ-Mechatroniker)',
    y1: [850, 1100],
    y2: [920, 1180],
    y3: [1000, 1270],
    postTraining: [2600, 3200],
  },
  {
    id: 'hospitality',
    label: 'هتلداری (Hotelfachmann)',
    y1: [800, 1000],
    y2: [880, 1080],
    y3: [960, 1170],
    postTraining: [2200, 2800],
  },
] as const;

export const AusbildungGermanyPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  // ==================== SEO + AIO ====================
  useSeo({
    title: 'آوسبیلدونگ آلمان ۲۰۲۶ | حقوق ۱,۰۴۸ € و معافیت سپرکونتو',
    description:
      'راهنمای رسمی ۲۰۲۶: حداقل حقوق Ausbildung از ۷۲۴ € (سال اول)، اما برای معافیت از Sperrkonto به ۱,۰۴۸ € ناخالص (۸۲۲ € نت) نیاز است. پرستاری تا ۱,۴۹۰ €، IT تا ۱,۲۵۰ €. اقامت دائم پس از ۲ سال کار. ارزیابی فوری.',
    canonical: '/guides/ausbildung-germany',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'آوسبیلدونگ آلمان ۲۰۲۶',
      'حقوق آوسبیلدونگ ۲۰۲۶',
      'معافیت سپرکونتو آوسبیلدونگ',
      'حداقل حقوق قانونی Ausbildung ۷۲۴ یورو',
      'آوسبیلدونگ پرستاری آلمان',
      'آوسبیلدونگ IT آلمان',
      'ویزای ۱۶a آلمان',
      'اقامت دائم آلمان پس از ۲ سال',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/ausbildung-germany#article',
          headline:
            'راهنمای جامع آوسبیلدونگ آلمان ۲۰۲۶: حداقل حقوق ۷۲۴ €، آستانه معافیت ۱,۰۴۸ € و اقامت دائم ۲ ساله',
          description:
            'تحلیل کامل سیستم آموزش دوگانه آلمان شامل حداقل دستمزد قانونی ۲۰۲۶، آستانه ۱,۰۴۸ € برای معافیت از Sperrkonto، حقوق واقعی رشته‌ها، کسورات و مسیر اقامت دائم پس از ۲ سال.',
          image: [
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
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
            { '@type': 'Thing', name: 'Ausbildung in Germany' },
            { '@type': 'Thing', name: 'Mindestausbildungsvergütung 2026' },
            { '@type': 'Thing', name: 'Section 16a AufenthG' },
          ],
          speakable: {
            '@type': 'Specification',
            cssSelector: [
              'h1',
              '.speakable-summary',
              '.speakable-salary',
              '.speakable-answer',
            ],
          },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/ausbildung-germany#howto',
          name: 'مراحل اخذ پذیرش و ویزای آوسبیلدونگ آلمان ۲۰۲۶',
          description:
            'مسیر رسمی از مدرک زبان B1/B2 تا دریافت قرارداد و ویزای ۱۶a.',
          totalTime: 'P12M',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'ارتقای زبان آلمانی به سطح B1 (حداقل) یا B2',
              text: 'سفارت آلمان معمولاً حداقل B1 را می‌پذیرد، اما B2 شانس پذیرش و ویزا را به‌طور قابل‌توجهی افزایش می‌دهد.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'معادل‌سازی مدرک دیپلم (Zeugnisanerkennung)',
              text: 'تأیید مدارک ۱۲ ساله در ادارات آموزش ایالتی آلمان برای اطمینان از انطباق با سیستم آموزش دوگانه.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'اخذ قرارداد رسمی کارآموزی (Ausbildungsvertrag)',
              text: 'مصاحبه با کارفرما و صدور قرارداد با حقوق مشخص. حقوق ناخالص باید حداقل ۱,۰۴۸ € باشد تا از Sperrkonto معاف شوید.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'دریافت ویزای ۱۶a و ورود به آلمان',
              text: 'آغاز همزمان کار عملی در شرکت و کلاس‌های تئوری در Berufsschule. پس از ۲ سال کار به‌عنوان Fachkraft، اقامت دائم قابل درخواست است.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/ausbildung-germany#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حداقل حقوق آوسبیلدونگ در سال ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حداقل دستمزد قانونی Ausbildung برای قراردادهایی که در ۲۰۲۶ شروع می‌شوند: سال اول ۷۲۴ یورو، سال دوم ۸۵۴ یورو، سال سوم ۹۷۷ یورو و سال چهارم ۱,۰۱۴ یورو در ماه (ناخالص). این مبالغ برای قراردادهای بدون تعهد جمعی (tarifgebunden) اعمال می‌شود؛ اکثر کارفرمایان بزرگ بالاتر پرداخت می‌کنند.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا برای ویزای آوسبیلدونگ نیاز به Sperrkonto (حساب مسدود) دارم؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'اگر حقوق ناخالص ماهانه در قرارداد آوسبیلدونگ حداقل ۱,۰۴۸ یورو (معادل ۸۲۲ یورو نت) باشد، سفارت آلمان زندگی شما را تأمین‌شده تلقی می‌کند و از ارائه Sperrkonto معاف می‌شوید. اگر حقوق کمتر از این مقدار باشد، باید تفاوت را با Sperrkonto (۱,۰۹۱ یورو در ماه) یا تعهدنامه پوشش دهید. برای Ausbildung های مدرسه‌ای (schulische) که حقوق ندارند، حداقل ۹۵۹ یورو نت در ماه از طریق Sperrkonto یا بورس نیاز است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا پس از آوسبیلدونگ می‌توان به‌سرعت اقامت دائم گرفت؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. بر اساس قانون مهاجرت نیروی متخصص (Fachkräfteeinwanderungsgesetz)، افرادی که دوره آوسبیلدونگ را در آلمان با موفقیت گذرانده‌اند، پس از تنها ۲ سال کار به‌عنوان نیروی متخصص (Fachkraft) با پرداخت بیمه بازنشستگی، واجد شرایط دریافت اقامت دائم (Niederlassungserlaubnis) می‌شوند. این یکی از سریع‌ترین مسیرهای اقامت دائم در آلمان است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا کارآموز آوسبیلدونگ می‌تواند کار پاره‌وقت اضافه داشته باشد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. کارآموزان آوسبیلدونگ می‌توانند تا ۲۰ ساعت در هفته شغل دوم (Nebenjob) داشته باشند. با این حال، باید مطمئن شوند که این کار با برنامه Ausbildung تداخل ندارد. درآمد اضافی می‌تواند به پوشش هزینه‌های زندگی کمک کند، به‌ویژه در شهرهای گران مانند مونیخ.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا محدودیت سنی برای آوسبیلدونگ وجود دارد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'قانوناً هیچ سقف سنی در قوانین آلمان وجود ندارد. با این حال، برای متقاضیان ۱۸ تا ۳۰ سال شانس اخذ ویزا در سفارت بسیار بالاتر است. در رشته پرستاری، افراد تا ۳۵ سال نیز با شانس بالا پذیرش و ویزا می‌گیرند. کارفرمایان آلمانی معمولاً متقاضیان جوان‌تر را ترجیح می‌دهند، اما تجربه کاری مرتبط می‌تواند این مزیت را جبران کند.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا حقوق آوسبیلدونگ برای زندگی در آلمان کافی است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'در بیشتر شهرهای آلمان، حقوق آوسبیلدونگ (به‌ویژه در رشته‌هایی مانند پرستاری و IT) برای یک زندگی ساده کافی است، اما در شهرهای گران مانند مونیخ ممکن است تنگ باشد. بسیاری از کارآموزان در آپارتمان مشترک (WG) یا خوابگاه شرکت زندگی می‌کنند و از Deutschlandticket استفاده می‌کنند. درآمد نت سال اول معمولاً ۸۰ تا ۸۵ درصد حقوق ناخالص است. برای شهرهای گران، درآمد اضافی از کار پاره‌وقت یا کمک‌هزینه‌هایی مانند Berufsausbildungsbeihilfe (BAB) می‌تواند کمک‌کننده باشد.',
              },
            },
          ],
        },
      ],
    },
  });

  // ==================== STATE ====================
  const [selectedField, setSelectedField] = useState<string>('nursing');
  const [trainingYear, setTrainingYear] = useState<1 | 2 | 3>(1);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ==================== CALCULATOR ====================
  const currentFieldData = useMemo(() => {
    return (
      AUSBILDUNG_FIELDS.find((f) => f.id === selectedField) ||
      AUSBILDUNG_FIELDS[0]
    );
  }, [selectedField]);

  const salaryRange = useMemo(() => {
    const yearKey = `y${trainingYear}` as 'y1' | 'y2' | 'y3';
    return currentFieldData[yearKey];
  }, [currentFieldData, trainingYear]);

  const salaryMid = Math.round((salaryRange[0] + salaryRange[1]) / 2);
  const isExemptFromBlockedAccount = salaryMid >= VISA_THRESHOLD_2026.trainingGrossExemption;
  const netEstimate = Math.round(salaryMid * 0.85); // تخمین محافظه‌کارانه نت

  const postTrainingRange = currentFieldData.postTraining;
  const postTrainingMid = Math.round(
    (postTrainingRange[0] + postTrainingRange[1]) / 2
  );

  // ==================== DOCUMENTS ====================
  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'ترجمه رسمی مدرک دیپلم و ریزنمرات به زبان آلمانی',
      desc: 'همراه با تأییدیه دادگستری و امور خارجه. در صورت نیاز، ارزیابی ZAB برای تأیید انطباق با سیستم آموزش آلمان.',
    },
    {
      id: 'doc-2',
      title: 'مدرک زبان آلمانی B1 (حداقل) یا B2 (توصیه‌شده)',
      desc: 'سفارت آلمان معمولاً حداقل B1 را می‌پذیرد، اما B2 شانس پذیرش کارفرما و ویزا را به‌طور قابل‌توجهی افزایش می‌دهد. مدارک Goethe، telc یا ÖSD پذیرفته می‌شود.',
    },
    {
      id: 'doc-3',
      title: 'قرارداد رسمی کارآموزی (Ausbildungsvertrag)',
      desc: 'ممهور به تأیید اتاق بازرگانی (IHK) یا اتاق اصناف (HWK). حقوق ناخالص باید حداقل ۱,۰۴۸ € باشد تا از Sperrkonto معاف شوید.',
    },
    {
      id: 'doc-4',
      title: 'رزومه آلمانی استاندارد (Europass Lebenslauf)',
      desc: 'با عکس حرفه‌ای و شرح تجربیات علمی و فنی. برای کارفرمایان آلمانی، ساختار و کامل بودن رزومه بسیار مهم است.',
    },
    {
      id: 'doc-5',
      title: 'انگیزه‌نامه تخصصی به زبان آلمانی (Motivationsschreiben)',
      desc: 'شرح اشتیاق، اهداف شغلی و دلیل انتخاب این رشته خاص در آلمان. باید نشان دهد که متقاضی با سیستم Ausbildung آشناست.',
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
      q: 'حداقل حقوق آوسبیلدونگ در سال ۲۰۲۶ چقدر است؟',
      a: 'حداقل دستمزد قانونی Ausbildung برای قراردادهایی که در ۲۰۲۶ شروع می‌شوند: سال اول ۷۲۴ یورو، سال دوم ۸۵۴ یورو، سال سوم ۹۷۷ یورو و سال چهارم ۱,۰۱۴ یورو در ماه (ناخالص). این مبالغ برای قراردادهای بدون تعهد جمعی اعمال می‌شود؛ اکثر کارفرمایان بزرگ (به‌ویژه در پرستاری، IT و صنعت) بالاتر پرداخت می‌کنند. توجه: این حداقل قانونی با آستانه ۱,۰۴۸ یورو برای معافیت از Sperrkonto یکی نیست.',
    },
    {
      q: 'آیا برای ویزای آوسبیلدونگ نیاز به Sperrkonto دارم؟',
      a: 'اگر حقوق ناخالص ماهانه در قرارداد آوسبیلدونگ حداقل ۱,۰۴۸ یورو (معادل ۸۲۲ یورو نت) باشد، سفارت آلمان زندگی شما را تأمین‌شده تلقی می‌کند و از Sperrkonto معاف می‌شوید. اگر حقوق کمتر باشد، باید تفاوت را با Sperrkonto (۱,۰۹۱ یورو در ماه) یا تعهدنامه پوشش دهید. برای Ausbildung های مدرسه‌ای که حقوق ندارند، حداقل ۹۵۹ یورو نت در ماه از طریق Sperrkonto یا بورس نیاز است.',
    },
    {
      q: 'آیا پس از آوسبیلدونگ می‌توان به‌سرعت اقامت دائم گرفت؟',
      a: 'بله. بر اساس قانون مهاجرت نیروی متخصص، افرادی که دوره آوسبیلدونگ را در آلمان با موفقیت گذرانده‌اند، پس از تنها ۲ سال کار به‌عنوان Fachkraft با پرداخت بیمه بازنشستگی، واجد شرایط دریافت اقامت دائم (Niederlassungserlaubnis) می‌شوند. این یکی از سریع‌ترین مسیرهای اقامت دائم در آلمان است و Ausbildung را به یک مسیر جذاب برای مهاجرت بلندمدت تبدیل می‌کند.',
    },
    {
      q: 'آیا کارآموز آوسبیلدونگ می‌تواند کار پاره‌وقت اضافه داشته باشد؟',
      a: 'بله. کارآموزان آوسبیلدونگ می‌توانند تا ۲۰ ساعت در هفته شغل دوم داشته باشند. با این حال، باید مطمئن شوند که این کار با برنامه Ausbildung تداخل ندارد. درآمد اضافی می‌تواند به پوشش هزینه‌های زندگی کمک کند، به‌ویژه در شهرهای گران. برخی کارفرمایان نیز پاداش‌های اضافی مانند Weihnachtsgeld یا کمک‌هزینه مسکن ارائه می‌دهند.',
    },
    {
      q: 'آیا محدودیت سنی برای آوسبیلدونگ وجود دارد؟',
      a: 'قانوناً هیچ سقف سنی وجود ندارد. با این حال، برای متقاضیان ۱۸ تا ۳۰ سال شانس اخذ ویزا بسیار بالاتر است. در رشته پرستاری، افراد تا ۳۵ سال نیز با شانس بالا پذیرش می‌گیرند. کارفرمایان آلمانی معمولاً متقاضیان جوان‌تر را ترجیح می‌دهند، اما تجربه کاری مرتبط می‌تواند این مزیت را جبران کند.',
    },
    {
      q: 'آیا حقوق آوسبیلدونگ برای زندگی در آلمان کافی است؟',
      a: 'در بیشتر شهرهای آلمان، حقوق آوسبیلدونگ (به‌ویژه در پرستاری و IT) برای یک زندگی ساده کافی است، اما در شهرهای گران مانند مونیخ ممکن است تنگ باشد. درآمد نت سال اول معمولاً ۸۰ تا ۸۵ درصد حقوق ناخالص است. بسیاری از کارآموزان در آپارتمان مشترک (WG) یا خوابگاه شرکت زندگی می‌کنند. برای شهرهای گران، کار پاره‌وقت یا کمک‌هزینه‌هایی مانند Berufsausbildungsbeihilfe (BAB) می‌تواند کمک‌کننده باشد.',
    },
  ];

  // ==================== RENDER ====================
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#081e26] text-slate-100 font-sans pb-20"
    >
      {/* مسیریابی */}
      <div className="bg-[#05171e] border-b border-white/10 py-3 px-4 md:px-8">
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
            <span>دوره‌های تخصصی</span>
            <span>/</span>
            <span className="text-white font-semibold">
              آوسبیلدونگ آلمان ۲۰۲۶
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر دوره‌ها:</span>
            {[
              { key: 'language-spain', label: '🇪🇸 زبان اسپانیا' },
              { key: 'language-france', label: '🇫🇷 زبان فرانسه' },
              { key: 'language-netherlands', label: '🇳🇱 زبان هلند' },
              { key: 'colleges-hungary', label: '🇭🇺 کالج مجارستان' },
            ].map((dest) => (
              <button
                key={dest.key}
                type="button"
                onClick={() => onNavigateToCountry?.(dest.key)}
                className="rounded-lg px-2.5 py-1 text-[11px] font-medium transition cursor-pointer bg-white/5 hover:bg-white/15 text-slate-300"
              >
                {dest.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* هشدار تفاوت حداقل قانونی و آستانه ویزا */}
      <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2.5">
        <div className="container mx-auto max-w-5xl flex items-start gap-2 text-[11px] text-amber-200">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>نکته حیاتی ۲۰۲۶:</strong> حداقل حقوق قانونی Ausbildung ۷۲۴ €
            است، اما برای <strong>معافیت از Sperrkonto</strong> به حداقل{' '}
            <strong>۱,۰۴۸ € ناخالص</strong> (۸۲۲ € نت) نیاز دارید. این دو عدد
            متفاوتند.
          </span>
        </div>
      </div>

      {/* هیرو */}
      <section className="relative overflow-hidden pt-8 pb-14 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  آموزش دوگانه ۲۰۲۶ — حداقل ۷۲۴ €
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                  معافیت Sperrkonto از ۱,۰۴۸ €
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                آوسبیلدونگ آلمان ۲۰۲۶
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-amber-300 via-yellow-300 to-emerald-300">
                  حقوق، معافیت سپرکونتو و اقامت دائم ۲ ساله
                </span>
              </h1>

              <div
                data-ai-answer
                className="speakable-summary rounded-2xl bg-[#0e2a35] border border-amber-500/30 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg"
              >
                <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  خلاصه شفاف ۲۰۲۶:
                </div>
                حداقل حقوق قانونی Ausbildung در سال اول{' '}
                <strong className="text-amber-300">۷۲۴ €</strong> است، اما
                برای معافیت از Sperrkonto باید حداقل{' '}
                <strong className="text-amber-300">
                  ۱,۰۴۸ € ناخالص (۸۲۲ € نت)
                </strong>{' '}
                دریافت کنید. پرستاری تا{' '}
                <strong className="text-emerald-300">۱,۴۹۰ €</strong> و IT تا{' '}
                <strong>۱,۲۵۰ €</strong> در سال اول پرداخت می‌شود. پس از
                فارغ‌التحصیلی، با ۲ سال کار به‌عنوان Fachkraft، اقامت دائم
                آلمان قابل درخواست است.
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 px-5 py-3 text-sm font-bold text-[#082833] shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  ارزیابی رایگان رشته و شانس ویزا
                </button>
                <a
                  href="tel:+982191693955"
                  className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="کارآموز Ausbildung در محیط کار صنعتی آلمان — آموزش دوگانه ۲۰۲۶"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-60" />
                <figcaption className="absolute bottom-3 right-3 left-3 bg-[#081e26]/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>بیش از ۳۳۰ رشته با قرارداد رسمی</span>
                  <span className="text-amber-400 font-bold">
                    معافیت از ۱,۰۴۸ €
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* کارت‌های آمار کلیدی */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-amber-300 font-bold">
                حداقل قانونی (سال ۱)
              </span>
              <div className="speakable-salary text-xl font-black text-white mt-1">
                ۷۲۴ €
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                سال ۲: ۸۵۴ € | سال ۳: ۹۷۷ €
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-emerald-300 font-bold">
                آستانه معافیت Sperrkonto
              </span>
              <div className="text-xl font-black text-white mt-1">
                ۱,۰۴۸ €
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                معادل ۸۲۲ € نت در ماه
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-sky-300 font-bold">
                اقامت دائم پس از Ausbildung
              </span>
              <div className="text-xl font-black text-white mt-1">۲ سال</div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                کار به‌عنوان Fachkraft
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-purple-300 font-bold">
                حقوق پس از فارغ‌التحصیلی
              </span>
              <div className="text-xl font-black text-white mt-1">
                ۲,۸۰۰–۴,۲۰۰ €
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                بسته به رشته
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== محاسبه‌گر حقوق ========== */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                محاسبه‌گر حقوق ۲۰۲۶
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                برآورد حقوق بر اساس رشته و سال Ausbildung
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  انتخاب رشته:
                </label>
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                >
                  {AUSBILDUNG_FIELDS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  سال دوره:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTrainingYear(yr as any)}
                      className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        trainingYear === yr
                          ? 'bg-amber-400 text-slate-950 border-amber-300'
                          : 'bg-black/30 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      سال {yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 bg-black/30 rounded-2xl p-5 border border-white/10">
              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">
                  حقوق ناخالص ماهانه (محدوده ۲۰۲۶)
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 block mt-1">
                  {salaryRange[0].toLocaleString('fa-IR')} –{' '}
                  {salaryRange[1].toLocaleString('fa-IR')} €
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  تخمین نت: ≈ {netEstimate.toLocaleString('fa-IR')} €
                </span>
              </div>

              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">
                  وضعیت Sperrkonto
                </span>
                <span
                  className={`text-sm font-black block mt-1 ${
                    isExemptFromBlockedAccount
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  {isExemptFromBlockedAccount
                    ? '✓ معاف (≥ ۱,۰۴۸ €)'
                    : '✗ نیاز به Sperrkonto'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {isExemptFromBlockedAccount
                    ? 'صرفه‌جویی تا ۱۲,۰۰۰ €'
                    : 'حداقل ۹۵۹ € نت ماهانه'}
                </span>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 block">
                  حقوق پس از فارغ‌التحصیلی
                </span>
                <span className="text-xl sm:text-2xl font-black text-white block mt-1">
                  {postTrainingRange[0].toLocaleString('fa-IR')} –{' '}
                  {postTrainingRange[1].toLocaleString('fa-IR')} €
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  استخدام در همان کارفرما
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== مقاله غنی ========== */}
      <section className="py-14 bg-[#05171e] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-2xl font-black text-white text-center mb-2">
            هر آنچه باید درباره آوسبیلدونگ ۲۰۲۶ بدانید
          </h2>
          <p className="text-center text-xs text-slate-400 mb-10 max-w-2xl mx-auto">
            تحلیل حداقل حقوق، آستانه معافیت، حقوق واقعی رشته‌ها، کسورات،
            هزینه زندگی و مسیر اقامت دائم.
          </p>

          <div className="space-y-10">
            {/* بخش ۱ — حداقل حقوق و آستانه ویزا */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Euro className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-white">
                  ۱. دو عدد حیاتی ۲۰۲۶: ۷۲۴ € حداقل قانونی، ۱,۰۴۸ € آستانه ویزا
                </h3>
              </div>
              <p className="speakable-answer text-xs leading-7 text-slate-300 text-justify">
                بسیاری از متقاضیان این دو عدد را با هم اشتباه می‌گیرند. بر
                اساس قانون آموزش حرفه‌ای (BBiG §17)، حداقل دستمزد قانونی
                Ausbildung برای قراردادهایی که در ۲۰۲۶ شروع می‌شوند{' '}
                <strong className="text-amber-300">۷۲۴ €</strong> در سال اول،{' '}
                <strong>۸۵۴ €</strong> در سال دوم و{' '}
                <strong>۹۷۷ €</strong> در سال سوم است. اما برای اینکه سفارت
                آلمان شما را از ارائه Sperrkonto (حساب مسدود) معاف کند، حقوق
                ناخالص ماهانه باید حداقل{' '}
                <strong className="text-emerald-300">۱,۰۴۸ €</strong> (معادل
                ۸۲۲ € نت) باشد. اگر حقوق شما بین ۷۲۴ € و ۱,۰۴۸ € باشد،
                Ausbildung قانونی است اما باید تفاوت را با Sperrkonto یا
                تعهدنامه پوشش دهید. این تفاوت برای برنامه‌ریزی مالی حیاتی است.
              </p>
              <div className="mt-5 grid sm:grid-cols-3 gap-3 text-center text-[11px]">
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                  <div className="font-black text-amber-300">۷۲۴ €</div>
                  <div className="text-slate-400 mt-0.5">
                    حداقل قانونی سال ۱
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <div className="font-black text-emerald-300">۱,۰۴۸ €</div>
                  <div className="text-slate-400 mt-0.5">
                    آستانه معافیت Sperrkonto
                  </div>
                </div>
                <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3">
                  <div className="font-black text-sky-300">۹۵۹ € نت</div>
                  <div className="text-slate-400 mt-0.5">
                    حداقل زندگی (بدون حقوق)
                  </div>
                </div>
              </div>
            </article>

            {/* تصویر ویژه — اسناد و برنامه‌ریزی مالی */}
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
                srcSet="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 800px"
                alt="برنامه‌ریزی مالی و اسناد ویزای Ausbildung آلمان — Sperrkonto و حقوق ۲۰۲۶"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-52 w-full object-cover sm:h-64"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                تفاوت ۷۲۴ € و ۱,۰۴۸ € می‌تواند سرنوشت پرونده ویزا را تغییر
                دهد (منبع: Unsplash)
              </figcaption>
            </figure>

            {/* بخش ۲ — حقوق واقعی رشته‌ها */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-white">
                  ۲. حقوق واقعی ۲۰۲۶: پرستاری تا ۱,۴۹۰ €، IT تا ۱,۲۵۰ €
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                حداقل قانونی ۷۲۴ € فقط یک کف است؛ اکثر کارفرمایان بزرگ،
                به‌ویژه در بخش‌های تحت تعهد جمعی (Tarifvertrag)، بسیار
                بالاتر پرداخت می‌کنند. در سال ۲۰۲۶، پرستاری
                (Pflegefachkraft) بالاترین حقوق سال اول را در میان
                Ausbildung های کلاسیک دارد:{' '}
                <strong className="text-amber-300">۱,۱۹۰ € تا ۱,۴۹۰ €</strong>
                . IT (Fachinformatiker) حدود{' '}
                <strong>۱,۰۰۰ € تا ۱,۲۵۰ €</strong>، مکاترونیک{' '}
                <strong>۹۵۰ € تا ۱,۲۵۰ €</strong> و هتلداری{' '}
                <strong>۸۰۰ € تا ۱,۰۰۰ €</strong> است. حقوق هر سال
                Ausbildung معمولاً ۵–۱۰٪ افزایش می‌یابد. پس از
                فارغ‌التحصیلی، جهش قابل‌توجهی رخ می‌دهد: پرستاری تا{' '}
                <strong className="text-emerald-300">۴,۲۰۰ €</strong> و IT تا{' '}
                <strong>۳,۹۰۰ €</strong> در ماه.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-center text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="p-2 text-right font-bold">رشته</th>
                      <th className="p-2 font-bold text-amber-300">
                        سال ۱ (€)
                      </th>
                      <th className="p-2 font-bold text-emerald-300">
                        پس از فارغ‌التحصیلی (€)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right font-bold text-white">
                        پرستاری
                      </td>
                      <td className="p-2 font-mono">۱,۱۹۰–۱,۴۹۰</td>
                      <td className="p-2 font-mono">۳,۲۰۰–۴,۲۰۰</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 text-right font-bold text-white">
                        IT
                      </td>
                      <td className="p-2 font-mono">۱,۰۰۰–۱,۲۵۰</td>
                      <td className="p-2 font-mono">۲,۸۰۰–۳,۹۰۰</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-right font-bold text-white">
                        مکاترونیک
                      </td>
                      <td className="p-2 font-mono">۹۵۰–۱,۲۵۰</td>
                      <td className="p-2 font-mono">۲,۸۰۰–۳,۵۰۰</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* بخش ۳ — نت و کسورات */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Percent className="h-5 w-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  ۳. از ناخالص تا نت: چرا ۸۰–۸۵٪ باقی می‌ماند
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                حقوق ناخالص Ausbildung با کسورات قانونی همراه است. خوشبختانه،
                به دلیل درآمد پایین، بیشتر کارآموزان سال اول زیر آستانه
                معافیت مالیاتی (حدود{' '}
                <strong>۱۲,۳۴۸ €</strong> در سال ۲۰۲۶) قرار می‌گیرند و
                مالیات بر درآمد (Lohnsteuer) صفر است. اما بیمه‌های اجتماعی
                (سلامت، بازنشستگی، بیکاری و مراقبت) حدود{' '}
                <strong className="text-sky-300">۲۰٪</strong> از حقوق
                ناخالص را می‌گیرند. در نتیجه، درآمد نت سال اول معمولاً{' '}
                <strong>۸۰ تا ۸۵ درصد</strong> ناخالص است. برای مثال،
                حقوق ناخالص ۱,۱۰۰ € حدود{' '}
                <strong className="text-emerald-300">۸۷۰ تا ۹۲۰ €</strong> نت
                می‌دهد. این مبلغ برای زندگی در شهرهای متوسط آلمان کافی است،
                اما در مونیخ یا فرانکفورت ممکن است نیاز به کار پاره‌وقت یا
                کمک‌هزینه باشد.
              </p>
            </article>

            {/* تصویر ویژه — زندگی در آلمان */}
            <figure className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=1200&q=80"
                srcSet="https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 800px"
                alt="زندگی دانشجویی و کارآموزی در آلمان — هزینه مسکن و حمل و نقل ۲۰۲۶"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover sm:h-56"
              />
              <figcaption className="bg-black/60 px-3 py-2 text-[10px] text-slate-300 backdrop-blur-sm">
                ۱,۰۰۰ € در کمنیتس با ۱,۲۰۰ € در مونیخ یکسان نیست؛ هزینه مسکن
                را در برنامه‌ریزی لحاظ کنید (منبع: Unsplash)
              </figcaption>
            </figure>

            {/* بخش ۴ — هزینه زندگی */}
            <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-black text-white">
                  ۴. هزینه زندگی: چرا شهر محل Ausbildung مهم است
                </h3>
              </div>
              <p className="text-xs leading-7 text-slate-300 text-justify">
                حقوق یکسان در شهرهای مختلف آلمان ارزش متفاوتی دارد. اجاره یک
                اتاق در آپارتمان مشترک (WG) در مونیخ می‌تواند{' '}
                <strong>۶۰۰–۸۰۰ €</strong> باشد، در حالی که در لایپزیگ یا
                کمنیتس <strong>۳۰۰–۴۵۰ €</strong> است. به همین دلیل، یک
                پیشنهاد ۱,۰۰۰ € در کمنیتس می‌تواند بهتر از ۱,۲۰۰ € در مونیخ
                باشد. بسیاری از کارآموزان از خوابگاه شرکت یا کمک‌هزینه مسکن
                استفاده می‌کنند. Deutschlandticket نیز هزینه حمل‌ونقل را به
                حدود ۵۸ € در ماه کاهش می‌دهد. اگر حقوق و اجاره با هم
                همخوانی نداشته باشند، می‌توان برای{' '}
                <strong>Berufsausbildungsbeihilfe (BAB)</strong> درخواست داد
                که یک کمک‌هزینه دولتی برای کارآموزانی است که دور از خانه
                زندگی می‌کنند.
              </p>
            </article>

            {/* بخش ۵ — اقامت دائم */}
            <article className="rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.06] p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-black text-emerald-200">
                  ۵. مسیر سریع اقامت دائم: ۲ سال پس از Ausbildung
                </h3>
              </div>
              <p className="text-xs leading-7 text-emerald-100/85 text-justify">
                یکی از قوی‌ترین مزایای Ausbildung که اغلب نادیده گرفته
                می‌شود، مسیر اقامت دائم است. بر اساس قانون مهاجرت نیروی
                متخصص (Fachkräfteeinwanderungsgesetz)، افرادی که دوره
                Ausbildung را در آلمان با موفقیت گذرانده‌اند، پس از تنها{' '}
                <strong>۲ سال کار به‌عنوان نیروی متخصص (Fachkraft)</strong> با
                پرداخت بیمه بازنشستگی، واجد شرایط دریافت{' '}
                <strong>Niederlassungserlaubnis</strong> (اقامت دائم) می‌شوند.
                این در حالی است که مسیر عادی برای سایر نیروهای متخصص معمولاً
                ۳ تا ۴ سال است. Ausbildung نه‌تنها یک مسیر ورود با حقوق است،
                بلکه یکی از سریع‌ترین مسیرهای اقامت دائم در آلمان محسوب
                می‌شود.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ========== چک‌لیست مدارک ========== */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                چک‌لیست مدارک آوسبیلدونگ ۲۰۲۶
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                قرارداد با حقوق ≥ ۱,۰۴۸ € کلید معافیت از Sperrkonto است
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedChecklist ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
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
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  checkedDocs[doc.id]
                    ? 'bg-amber-950/20 border-amber-500/40 text-white'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 text-slate-200'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-black/40 shrink-0">
                  {checkedDocs[doc.id] && (
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{doc.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== سوالات متداول ========== */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              پرسش‌های متداول آوسبیلدونگ ۲۰۲۶
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-right font-bold text-sm text-white hover:text-amber-300 transition cursor-pointer gap-3"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-7 border-t border-white/5 text-justify">
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
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-r from-amber-950/40 to-yellow-950/40 border border-amber-500/30 p-8">
            <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              مسیر Ausbildung را با اعداد واقعی ۲۰۲۶ شروع کنید
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-6">
              تیم دیاکو با تسلط بر حداقل حقوق ۷۲۴ €، آستانه ۱,۰۴۸ € برای
              Sperrkonto، حقوق واقعی رشته‌ها و مسیر اقامت دائم ۲ ساله، پرونده
              شما را از انتخاب رشته تا دریافت ویزا همراهی می‌کند.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3 text-sm transition cursor-pointer shadow-lg"
              >
                ارزیابی رایگان پرونده Ausbildung
              </button>
              <button
                type="button"
                onClick={onBackToHome}
                className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-3 text-sm font-bold text-white transition cursor-pointer"
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

export default AusbildungGermanyPage;