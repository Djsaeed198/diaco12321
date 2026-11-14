import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileWarning,
  List,
  PhoneCall,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

type ReasonCategory = 'all' | 'financial' | 'academic' | 'ties' | 'legal';

interface RejectionReasonItem {
  num: string;
  category: Exclude<ReasonCategory, 'all'>;
  title: string;
  casePattern: string;
  officerView: string;
  fixTip: string;
}

const TEN_REAL_REASONS: RejectionReasonItem[] = [
  {
    num: '۱',
    category: 'financial',
    title: 'پدیده «پارک پول» در حساب بانکی (Money Parking)',
    casePattern:
      'متقاضی با معدل حساب پایین، دقیقاً ۱۰ روز پیش از وقت سفارت مبلغ ۱.۵ میلیارد تومان به حساب خود واریز کرده و گواهی تمکن مالی گرفته است.',
    officerView:
      'افسر گردش حساب ۳ تا ۶ ماهه را بررسی می‌کند. واریز ناگهانی بدون ارائه سند فروش ملک، خودرو یا سود سهام، به عنوان پول قرضی تلقی شده و منجر به رد فوری ویزا می‌شود.',
    fixTip: 'حفظ معدل واقعی حساب طی ۳ تا ۶ ماه یا پیوست کردن مبایعه‌نامه رسمی/سود سهام برای مبالغ کلان.',
  },
  {
    num: '۲',
    category: 'academic',
    title: 'انگیزه‌نامه (SOP) کپی‌شده یا نوشته‌شده با هوش مصنوعی بدون شخصی‌سازی',
    casePattern:
      'متقاضی انگیزه‌نامه‌ای پر از عبارات ادبی کلیشه‌ای ارائه داده که هیچ اشاره‌ای به سابقه واقعی کار، دلیل منطقی انتخاب آن دانشگاه خاص و برنامه بازگشت او ندارد.',
    officerView:
      'افسرهای کنسولی در سال ۲۰۲۶ به راحتی ساختارهای تکراری را تشخیص می‌دهند و چنین پرونده‌ای را فاقد «اراده واقعی برای تحصیل یا کار» تشخیص می‌دهند.',
    fixTip: 'تدوین انگیزه‌نامه حقوقی-تخصصی مبتنی بر ریزنمرات، شرح شغلی بیمه و تطابق سیلابس دانشگاه مقصد.',
  },
  {
    num: '۳',
    category: 'academic',
    title: 'گپ تحصیلی توجیه‌نشده و تغییر رشته غیرمنطقی',
    casePattern:
      'فردی ۳۴ ساله با مدرک کارشناسی مهندسی عمران و ۸ سال سابقه کار در حوزه ساخت‌وساز، برای یک دوره کارشناسی مدیریت گردشگری در اروپا اقدام کرده است.',
    officerView:
      'افسر این تغییر مسیر را نه یک ارتقای آکادمیک، بلکه بهانه‌ای برای ورود به اروپا و ماندگاری غیرقانونی ارزیابی می‌کند.',
    fixTip: 'ایجاد پیوند منطقی بین سوابق شغلی، دوره‌های مهارتی گذرانده‌شده و رشته انتخابی هم‌راستا.',
  },
  {
    num: '۴',
    category: 'ties',
    title: 'ضعف در اثبات وابستگی‌های عاطفی، مالی و شغلی در ایران (Home Ties)',
    casePattern:
      'متقاضی مجرد، بدون سابقه بیمه معتبر یا مالکیت ملکی، درخواست ویزای توریستی یا دوره کوتاه‌مدت می‌دهد.',
    officerView:
      'در ویزاهای کوتاه‌مدت (نوع C) و تحصیلی، افسر باید مطمئن شود که شما دلیلی برای بازگشت به کشور خود دارید. نبود وابستگی شغلی یا مالی ریسک پناهندگی یا اقامت غیرمجاز را بالا می‌برد.',
    fixTip: 'ارائه لیست بیمه تامین اجتماعی، سند ملکی/اجاره‌نامه رسمی، گواهی اشتغال با تاریخ بازگشت و مدارک خانوادگی.',
  },
  {
    num: '۵',
    category: 'ties',
    title: 'باطل شدن رزرو هتل و بلیت پرواز در حین بررسی پرونده (Dummy Bookings)',
    casePattern:
      'آژانس مسافرتی یک رزرو ۴۸ ساعته هتل صادر کرده و زمانی که افسر سفارت ۱۰ روز بعد کد رزرو را استعلام می‌گیرد، رزرو کنسل شده است.',
    officerView:
      'ارائه رزرو منقضی‌شده در بند «عدم ارائه مدارک معتبر اقامت» قرار می‌گیرد و اعتبار کل پرونده را زیر سوال می‌برد.',
    fixTip: 'استفاده از رزروهای معتبر قابل استعلام (PNR فعال تا زمان صدور ویزا یا واچر غیرقابل کنسلی کوتاه‌مدت).',
  },
  {
    num: '۶',
    category: 'financial',
    title: 'تناقض میان مدارک شغلی و گردش حساب بانکی',
    casePattern:
      'در گواهی اشتغال به کار، حقوق ماهانه متقاضی ۲۵ میلیون تومان ذکر شده، اما در گردش حساب او واریزی‌های منظم ۲۰۰ میلیون تومانی بدون منبع مشخص دیده می‌شود (یا برعکس، هیچ واریز حقوقی به حساب او انجام نشده است).',
    officerView:
      'عدم انطباق درآمد اعلام‌شده با جریان نقدینگی حساب، نشانه صوری بودن گواهی شغلی است.',
    fixTip: 'تطبیق صددرصدی فیش حقوقی، لیست بیمه و واریزی‌های ماهانه در گردش حساب رسمی.',
  },
  {
    num: '۷',
    category: 'academic',
    title: 'عدم تناسب سطح زبان با دوره تحصیلی یا شغل پیشنهادی',
    casePattern:
      'متقاضی برای یک رشته دانشگاهی انگلیسی‌زبان پذیرش مشروط گرفته اما در مصاحبه کوتاه سفارت قادر به پاسخگویی به ساده‌ترین سوالات به زبان انگلیسی یا آلمانی نیست.',
    officerView:
      'افسر تشخیص می‌دهد که متقاضی توانایی دنبال کردن دروس دانشگاهی یا انجام وظایف شغلی را نخواهد داشت.',
    fixTip: 'آمادگی مصاحبه کنسولی و ارائه مدرک زبان معتبر متناسب با سطح دوره پیش از وقت سفارت.',
  },
  {
    num: '۸',
    category: 'ties',
    title: 'نداشتن سابقه سفر (Travel History) متناسب با مقصد',
    casePattern:
      'متقاضی با پاسپورت کاملاً سفید (بدون حتی یک سفر خارجی قبلی)، مستقیماً درخواست ویزای توریستی انفرادی ۱۵ روزه برای یکی از سخت‌گیرترین کشورهای شینگن (مثل اتریش یا آلمان) ثبت کرده است.',
    officerView:
      'برای ویزاهای توریستی انفرادی، نداشتن سابقه سفر قبلی شانس تایید را به شدت کاهش می‌دهد.',
    fixTip: 'تقویت تاریخچه سفر با مقاصد ویزادار غیرشینگن پیش از اقدام انفرادی برای سخت‌گیرترین سفارت‌های اروپا.',
  },
  {
    num: '۹',
    category: 'legal',
    title: 'پایین‌تر بودن حقوق قرارداد کاری از حداقل تعرفه قانونی سال ۲۰۲۶',
    casePattern:
      'متقاضی ویزای کاری آلمان یا اتریش، قراردادی امضا کرده که حقوق سالانه آن تنها ۱,۵۰۰ یورو کمتر از جدول حقوق پایه جدید ژانویه ۲۰۲۶ است.',
    officerView:
      'اداره کار کشور مقصد قرارداد را رد می‌کند زیرا حقوق کمتر از استاندارد قانونی است.',
    fixTip: 'انطباق قرارداد کار با آستانه حقوقی مصوب ۲۰۲۶ (بلوکارت آلمان €۴۸,۳۰۰ / RWR اتریش €۳,۴۶۵ ماهانه) قبل از ثبت وقت.',
  },
  {
    num: '۱۰',
    category: 'legal',
    title: 'عدم شفافیت منشأ پول (Source of Funds) در ویزاهای سرمایه‌گذاری و استارتاپ',
    casePattern:
      'متقاضی ۵۰ هزار یورو پول نقد به حساب شرکتی در اروپا منتقل کرده اما نتوانسته اسناد مالیاتی، مبایعه‌نامه فروش ملک یا سود شرکت در ایران را برای اثبات مسیر قانونی این پول ارائه دهد.',
    officerView:
      'به دلیل قوانین سخت‌گیرانه مبارزه با پولشویی در اروپا (AML)، پرونده بدون تایید منشأ سرمایه رد می‌شود.',
    fixTip: 'تنظیم پکیج مستندات AML و زنجیره قانونی انتقال پول با تایید حسابدار رسمی و وکیل اروپایی.',
  },
];

const SCHENGEN_REJECTION_TABLE = [
  [
    'بند ۲',
    'Justification for the purpose and conditions of the intended stay was not provided',
    'برنامه سفر مبهم، انگیزه‌نامه ضعیف یا تناقض در هدف سفر',
    'تدوین برنامه سفر روزبه‌روز (Itinerary) دقیق، ارائه دعوت‌نامه رسمی یا انگیزه‌نامه حقوقی مستدل',
  ],
  [
    'بند ۳',
    'You have not provided proof of sufficient means of subsistence',
    'ناکافی بودن تمکن مالی یا واریزهای ناگهانی مشکوک در حساب',
    'ارائه گردش حساب ۳ تا ۶ ماهه شفاف به همراه اسناد رسمی منشأ واریزی‌های کلان',
  ],
  [
    'بند ۸',
    'The information submitted regarding the justification for the purpose and conditions of the intended stay was not reliable',
    'کنسل شدن رزرو هتل/پرواز یا تناقض در مدارک شغلی و بیمه',
    'ارائه واچر قطعی هتل و پرواز معتبر و تطبیق کامل گواهی اشتغال با لیست بیمه تامین اجتماعی',
  ],
  [
    'بند ۱۰',
    'There are reasonable doubts as to your intention to leave the territory of the Member States',
    'عدم اثبات وابستگی‌های قوی در ایران و ترس افسر از ماندگاری غیرمجاز',
    'ارائه اسناد مالکیت، گواهی اشتغال معتبر، سوابق بیمه طولانی و وابستگی‌های خانوادگی و مالی',
  ],
];

const faqs = [
  {
    q: 'اگر ویزای شینگن من رد شود، تا چند وقت نمی‌توانم دوباره اقدام کنم؟',
    a: 'در قانون شینگن هیچ محدودیت زمانی یا جریمه‌ای برای اقدام مجدد وجود ندارد و از نظر تئوری حتی فردای روز ریجکتی می‌توانید درخواست جدید بدهید؛ اما در عمل تا زمانی که دلایل ریجکتی قبلی را به صورت ریشه‌ای اصلاح نکنید، پرونده جدید شما نیز رد خواهد شد.',
  },
  {
    q: 'آیا ریجکت شدن ویزای یک کشور اروپایی باعث می‌شود سایر کشورهای شینگن هم من را رد کنند؟',
    a: 'به صورت خودکار خیر؛ اما تمام سفارت‌های حوزه شینگن از طریق سامانه VIS به سابقه ریجکتی و علت آن دسترسی دارند. اگر بدون رفع نقص قبلی به سراغ سفارت کشور دیگری بروید (Visa Shopping)، احتمال رد شدن شما بسیار بالاست.',
  },
  {
    q: 'رسیدگی به نامه اعتراض به ریجکتی (Remonstration) چقدر زمان می‌برد؟',
    a: 'بسته به کشور و حجم پرونده‌های کنسولگری، بررسی لایحه اعتراض حقوقی معمولاً بین ۴ هفته تا ۳ ماه زمان می‌برد و در صورت پذیرش اعتراض، سفارت برای الصاق ویزا در پاسپورت با شما تماس می‌گیرد.',
  },
  {
    q: 'آیا تعویض پاسپورت سابقه ریجکتی ویزا را پاک می‌کند؟',
    a: 'خیر؛ سوابق ویزا و ریجکتی بر اساس اطلاعات هویتی، نام و نام خانوادگی، تاریخ تولد و اطلاعات بیومتریک (اثر انگشت) در سیستم‌های بین‌المللی ثبت می‌شود و تعویض جلد پاسپورت هیچ تاثیری در پنهان کردن سابقه ریجکتی ندارد.',
  },
];

const tocItems = [
  { id: 'rejection-letter-logic', label: 'نامه ریجکتی سفارت چگونه کار می‌کند؟' },
  { id: '10-real-reasons', label: '۱۰ دلیل واقعی ریجکتی (الگوهای ۲۰۲۶)' },
  { id: 'schengen-rejection-table', label: 'جدول تحلیل بندهای ریجکتی شینگن' },
  { id: 'what-to-do-after-rejection', label: 'اعتراض حقوقی یا اقدام مجدد؟' },
  { id: 'expert-insights', label: 'چالش‌های واقعی و نکات هلدینگ دیاکو' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const VisaRejectionReasonsPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ReasonCategory>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const visibleReasons =
    selectedCategory === 'all'
      ? TEN_REAL_REASONS
      : TEN_REAL_REASONS.filter((item) => item.category === selectedCategory);

  useSeo({
    title: 'چرا ویزای من رد شد؟ | ۱۰ دلیل واقعی ریجکتی ویزا و راه‌های رفع آن (۲۰۲۶) | دیاکو',
    description:
      'بررسی ۱۰ دلیل واقعی ریجکت شدن ویزاهای شینگن، تحصیلی، کاری و سرمایه‌گذاری در سال‌های ۲۰۲۶ و ۲۰۲۷ بر اساس پرونده‌های واقعی و راهنمای رفع ریجکتی.',
    canonical: 'https://www.dia-co.ir/why-my-visa-was-rejected-10-real-reasons',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'چرا ویزای من رد شد',
      'دلایل ریجکت شدن ویزای شینگن ۲۰۲۶',
      'رفع ریجکتی ویزا و اعتراض حقوقی Remonstration',
      'پدیده پارک پول Money Parking سفارت',
      'تحلیل بند ۲ و ۳ و ۸ و ۱۰ ریجکتی شینگن',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/why-my-visa-was-rejected-10-real-reasons/#article',
          headline: 'چرا ویزای من رد شد؟ | ۱۰ دلیل واقعی ریجکتی ویزا و راه‌های رفع آن (۲۰۲۶)',
          description:
            'بررسی ۱۰ دلیل واقعی ریجکت شدن ویزاهای شینگن، تحصیلی، کاری و سرمایه‌گذاری در سال‌های ۲۰۲۶ و ۲۰۲۷ بر اساس پرونده‌های واقعی و راهنمای رفع ریجکتی.',
          image: [
            'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:28:00+03:30',
          dateModified: '2026-11-14T13:28:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و امور کنسولی هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          reviewedBy: {
            '@type': 'Organization',
            name: 'دفتر اجرایی هلدینگ دیاکو در وین',
            url: 'https://dia-co.eu/',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://www.dia-co.ir/#organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.dia-co.ir/favicon.svg',
            },
          },
          citation: [
            'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en',
            'https://www.auswaertiges-amt.de/',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/why-my-visa-was-rejected-10-real-reasons',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/why-my-visa-was-rejected-10-real-reasons/#faq',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        },
      ],
    },
  });

  const navigateInternal = (page: string) => {
    if (onNavigateToPage) onNavigateToPage(page);
    else window.location.pathname = `/${page}`;
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#06181f] text-white">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-white/10 bg-[#08222b]/90 backdrop-blur-md">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 md:px-8 text-xs">
          <div className="flex items-center gap-2 text-slate-300 flex-wrap">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-[#f5a623] transition font-semibold cursor-pointer"
            >
              صفحه اصلی دیاکو
            </button>
            <span className="text-slate-500">‹</span>
            <button
              type="button"
              onClick={() => navigateInternal('document-checker')}
              className="hover:text-[#f5a623] transition cursor-pointer"
            >
              بررسی تخصصی مدارک و پرونده
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-rose-300 font-bold">چرا ویزای من رد شد؟ (۱۰ دلیل واقعی ۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('why-my-visa-was-rejected-10-real-reasons')}
                className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 font-bold text-cyan-200 hover:bg-cyan-500/20 transition cursor-pointer"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>نسخه مقاله در وبلاگ</span>
              </button>
            )}
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition cursor-pointer font-semibold"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>بازگشت</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero + BLUF Box */}
      <section className="relative overflow-hidden py-12 md:py-16 border-b border-white/10">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-wrap items-center gap-2.5 text-xs mb-4">
            <span className="rounded-full bg-rose-500/15 border border-rose-400/40 px-3 py-1 font-bold text-rose-300 flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5" />
              تحلیل پرونده‌های ریجکت‌شده ۲۰۲۶–۲۰۲۷
            </span>
            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-cyan-300" />
              تایید دپارتمان حقوقی و امور کنسولی دیاکو
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            چرا ویزای من رد شد؟ ۱۰ دلیل واقعی از پرونده‌های ریجکت‌شده (۲۰۲۶–۲۰۲۷)
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین تخصصی: </span>
              <strong className="text-white">دپارتمان حقوقی و امور کنسولی هلدینگ مهاجرتی دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">بازبینی اجرایی: </span>
              <strong className="text-amber-300">دفاتر وین، بوداپست، آتن و تهران</strong>
            </div>
          </div>

          {/* BLUF Box */}
          <div className="mt-6 rounded-3xl border border-rose-400/40 bg-gradient-to-l from-[#36111c] via-[#0d222c] to-[#081f27] p-6 md:p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-black text-rose-300 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج AI)</span>
            </div>
            <p className="text-sm md:text-base leading-8 text-slate-100 text-justify">
              دلیل اصلی ریجکت شدن ویزا در سال‌های ۲۰۲۶ و ۲۰۲۷ در بیش از{' '}
              <strong className="text-amber-300">۸۰ درصد پرونده‌ها</strong>، نه یک نقص ساده در فرم درخواست، بلکه
              «تردید افسر کنسولی در واقعی بودن هدف سفر یا عدم اثبات بازگشت به کشور مبدأ (Ties to Home Country)» است.
              مهم‌ترین الگوهای تکرارشونده شامل: واریزهای ناگهانی در گردش حساب (
              <strong className="text-rose-300">Money Parking</strong>)، عدم تناسب سن و گپ تحصیلی با رشته انتخابی،
              انگیزه‌نامه کلیشه‌ای، رزروهای صوری هتل/پرواز و عدم شفافیت منشأ سرمایه است. برای رفع ریجکتی می‌توانید ظرف{' '}
              <strong className="text-cyan-300">۱۴ تا ۳۰ روز</strong> نامه اعتراض حقوقی (Remonstration) ثبت کنید یا پس
              از اصلاح ریشه‌ای مدارک مجدداً اقدام نمایید.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>کالبدشکافی و بررسی شانس رفع ریجکتی</span>
              <Scale className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('online-consult')}
              className="rounded-2xl border border-rose-400/35 bg-rose-500/10 hover:bg-rose-500/20 px-5 py-3.5 text-sm font-bold text-rose-200 transition cursor-pointer"
            >
              ارسال نامه ریجکتی برای مشاوره حقوقی
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('document-checker')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              چک‌لیست مدارک استاندارد سفارت
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:px-8 max-w-6xl space-y-12">
        {/* Table of Contents */}
        <nav aria-label="فهرست مطالب" className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-2 text-sm font-black text-amber-300 mb-4">
            <List className="h-4 w-4" />
            <span>فهرست مطالب تحلیل دلایل ریجکتی ویزا (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs">
            {tocItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#08222b] px-3 py-2.5 text-slate-200 hover:border-[#f5a623] hover:text-amber-300 transition"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-400/15 text-[10px] font-black text-amber-300">
                  {idx + 1}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Rejection Letter Logic */}
        <section id="rejection-letter-logic" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <FileWarning className="h-6 w-6 text-amber-300 shrink-0" />
            <span>نامه ریجکتی سفارت چگونه کار می‌کند و بندهای استاندارد آن چیست؟</span>
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            وقتی افسر کنسولی درخواست ویزای شما را رد می‌کند، یک برگه استاندارد (مثلاً فرم ۱۱ بندی شینگن یا نامه رسمی
            IRCC کانادا) صادر می‌شود. بسیاری از متقاضیان با دیدن تیک خوردن عباراتی مثل «هدف و شرایط اقامت موجه نبود»
            دچار سردرگمی می‌شوند. این جملات سرفصل‌های کلی قانون هستند؛ اما در پشت صحنه، افسر پرونده بر اساس الگوهای
            رفتاری و مالی مشخصی به این نتیجه رسیده است.
          </p>
        </section>

        {/* 10 Real Reasons with Category Filter */}
        <section id="10-real-reasons" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white">
                ۱۰ دلیل واقعی ریجکت شدن ویزا (بر اساس الگوهای پرونده‌های سال ۲۰۲۶)
              </h2>
              <p className="mt-1 text-xs md:text-sm text-slate-300">
                الگوهای پرتکرار بررسی پرونده‌ها در سفارتخانه‌های اروپا و کانادا را بر اساس موضوع فیلتر کنید:
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { key: 'all' as const, label: 'همه ۱۰ دلیل' },
                { key: 'financial' as const, label: 'مالی و گردش حساب' },
                { key: 'academic' as const, label: 'تحصیلی، زبان و SOP' },
                { key: 'ties' as const, label: 'وابستگی و رزروها' },
                { key: 'legal' as const, label: 'قرارداد کاری و AML' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`rounded-xl px-3.5 py-2 font-bold transition cursor-pointer border ${
                    selectedCategory === tab.key
                      ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                      : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {visibleReasons.map((reason) => (
              <div
                key={reason.num}
                className="rounded-2xl border border-white/10 bg-[#06181f] p-5 space-y-3 hover:border-rose-400/40 transition"
              >
                <div className="flex items-start gap-2.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-rose-500/15 border border-rose-400/30 text-xs font-black text-rose-300">
                    {reason.num}
                  </span>
                  <h3 className="text-sm md:text-base font-black text-amber-300 leading-6">{reason.title}</h3>
                </div>
                <div className="space-y-2 text-xs leading-6 text-slate-200">
                  <p>
                    <strong className="text-cyan-300">الگوی واقعی پرونده: </strong>
                    {reason.casePattern}
                  </p>
                  <p>
                    <strong className="text-rose-300">نگاه افسر سفارت: </strong>
                    {reason.officerView}
                  </p>
                  <p className="rounded-xl bg-emerald-500/10 border border-emerald-400/25 px-3 py-2 text-emerald-200">
                    <strong>راهکار دیاکو: </strong>
                    {reason.fixTip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Schengen Rejection Table */}
        <section id="schengen-rejection-table" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول تحلیل کدهای ریجکتی ویزای شینگن و راهکار حقوقی هر بند
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-rose-500/15 text-rose-200 font-black">
                <tr>
                  <th className="p-3.5">بند ریجکتی شینگن</th>
                  <th className="p-3.5">متن استاندارد نامه سفارت</th>
                  <th className="p-3.5">دلیل واقعی در پشت صحنه</th>
                  <th className="p-3.5">راهکار تخصصی اصلاح پرونده</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {SCHENGEN_REJECTION_TABLE.map((row) => (
                  <tr key={row[0]} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-amber-300 whitespace-nowrap">{row[0]}</td>
                    <td className="p-3.5 text-slate-300 font-mono text-[11px] md:text-xs" dir="ltr">
                      {row[1]}
                    </td>
                    <td className="p-3.5 text-rose-200 font-semibold leading-6">{row[2]}</td>
                    <td className="p-3.5 text-emerald-300 leading-6">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* What to do after rejection */}
        <section id="what-to-do-after-rejection" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white">
            پس از ریجکت شدن ویزا چه کنیم؟ (اعتراض حقوقی یا اقدام مجدد)
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            هنگامی که نامه ریجکتی دریافت می‌کنید، بدترین واکنش اقدام عجولانه و ثبت مجدد همان مدارک در سفارت یک کشور
            دیگر است؛ زیرا اطلاعات ریجکتی شما در سیستم مشترک اطلاعات ویزای شینگن (<strong className="text-amber-300">VIS</strong>)
            ثبت شده و تمام سفارت‌ها آن را می‌بینند. شما دو راهکار قانونی دارید:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-cyan-400/30 bg-[#06181f] p-5 space-y-2">
              <div className="flex items-center gap-2 font-black text-cyan-300 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>۱. ثبت اعتراض رسمی (Remonstration / Appeal)</span>
              </div>
              <p className="text-xs md:text-sm leading-7 text-slate-300 text-justify">
                اگر مطمئن هستید که تمام مدارک شما کامل و قانونی بوده و افسر کنسولی دچار اشتباه در ارزیابی شده است،
                معمولاً ظرف ۱۴ تا ۳۰ روز فرصت دارید یک لایحه دفاعیه حقوقی (به زبان کشور مقصد، مثلاً آلمانی یا انگلیسی)
                به همراه مدارک تکمیلی برای سفارت ارسال کنید.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-400/30 bg-[#06181f] p-5 space-y-2">
              <div className="flex items-center gap-2 font-black text-amber-300 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>۲. اصلاح ریشه‌ای پرونده و اقدام مجدد (Re-application)</span>
              </div>
              <p className="text-xs md:text-sm leading-7 text-slate-300 text-justify">
                اگر واقعاً نقصی در گردش حساب، گپ تحصیلی یا مدارک شغلی وجود داشته است، اعتراض نتیجه نمی‌دهد؛ بلکه باید
                ابتدا نواقص را طی ۲ تا ۳ ماه برطرف کرده و سپس پرونده جدیدی ثبت کنید.
              </p>
            </div>
          </div>
        </section>

        {/* Information Gain */}
        <section
          id="expert-insights"
          className="rounded-3xl border border-rose-400/35 bg-gradient-to-l from-rose-950/35 via-[#0a232d] to-[#081f27] p-6 md:p-8 space-y-4"
        >
          <div className="flex items-center gap-2 text-rose-300 font-black text-sm">
            <AlertTriangle className="h-5 w-5" />
            <span>نکته تجربی از پرونده‌های واقعی (Information Gain — هلدینگ مهاجرتی دیاکو)</span>
          </div>
          <p className="text-sm leading-8 text-slate-100 text-justify">
            بر اساس تجربه مستقیم دپارتمان حقوقی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران، بیش از{' '}
            <strong className="text-amber-300">۶۰ درصد پرونده‌هایی</strong> که برای رفع ریجکتی به ما ارجاع داده می‌شوند،
            قربانی «چیدمان نادرست مدارک و ترجمه‌های ناقص» بوده‌اند؛ یعنی متقاضی واقعاً واجد شرایط بوده، اما مدارک او به
            زبان اداری و حقوقی مورد انتظار افسر اروپایی ارائه نشده است. نکته مهم دیگر در سال ۲۰۲۶ این است که با
            عملیاتی شدن کامل سیستم بیومتریک مرزهای اروپا (<strong className="text-cyan-300">EES</strong>)، سوابق ریجکتی
            و ورود و خروج با دقت صددرصدی در کل اتحادیه اروپا ثبت می‌شود.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول درباره ریجکتی ویزا (FAQ)</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-[#06181f] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-right text-sm font-bold text-white hover:bg-white/[0.03] transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-amber-300 shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="border-t border-white/10 px-4 py-3 text-xs md:text-sm leading-7 text-slate-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Internal & Official Links */}
        <section className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <span>مسیرها و راهنماهای پیشگیری از ریجکتی در دیاکو</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'document-checker', label: 'چک‌لیست هوشمند مدارک سفارت' },
                { page: 'global-visa-rules-changes', label: 'قوانین جدید ویزاهای جهان (EES/ETIAS)' },
                { page: 'degree-recognition-for-immigration', label: 'معادل‌سازی مدرک تحصیلی (ZAB / Anabin)' },
                { page: 'real-cost-of-immigration-hidden-fees', label: 'هزینه‌های پنهان و تمکن واقعی (۲۰۲۶)' },
                { page: 'online-consult', label: 'رزرو بررسی پرونده ریجکت‌شده با وکیل' },
                { page: 'easiest-countries-to-immigrate-2027', label: 'کم‌چالش‌ترین مقاصد مهاجرتی ۲۰۲۷' },
              ].map((link) => (
                <button
                  key={link.page}
                  type="button"
                  onClick={() => navigateInternal(link.page)}
                  className="text-right rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-slate-200 hover:border-amber-400/50 hover:text-amber-300 transition cursor-pointer"
                >
                  ← {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-black text-cyan-300 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>منابع رسمی حقوقی اروپا و تماس با دپارتمان کنسولی</span>
            </h3>
            <div className="space-y-2 text-xs">
              {[
                {
                  label: 'کمیسیون اروپا — سیاست ویزای شینگن و کدهای ریجکتی',
                  url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en',
                },
                {
                  label: 'وزارت امور خارجه آلمان (Auswärtiges Amt) — اعتراض Remonstration',
                  url: 'https://www.auswaertiges-amt.de/',
                },
              ].map((src) => (
                <a
                  key={src.url}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-slate-200 hover:text-cyan-300 transition"
                >
                  <span>{src.label}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="tel:02191693955"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-[#082833] hover:bg-amber-300 transition"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>تهران: 021-91693955</span>
              </a>
              <span className="text-[11px] text-slate-300" dir="ltr">
                Wien: +43 688 976 3256
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VisaRejectionReasonsPage;
