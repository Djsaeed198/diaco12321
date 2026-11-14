import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  ExternalLink,
  FileText,
  GraduationCap,
  Landmark,
  Languages,
  List,
  PhoneCall,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

interface DocItem {
  num: number;
  title: string;
  desc: string;
  legalNote: string;
}

interface DocCategory {
  id: string;
  key: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  rangeLabel: string;
  translationRule: string;
  validityRule: string;
  items: DocItem[];
}

const STORAGE_KEY = 'diaco_30_doc_checklist_v1';

const CATEGORIES: DocCategory[] = [
  {
    id: 'category-1',
    key: 'identity',
    title: 'دسته اول: مدارک هویتی و اسناد شناسایی (اسناد ۱ تا ۶)',
    shortTitle: 'هویتی و شناسایی (۱–۶)',
    subtitle: 'پایه‌ای‌ترین بخش هر پرونده که باید فاقد هرگونه خط‌خوردگی یا مغایرت حروف لاتین نام و نام خانوادگی باشد.',
    rangeLabel: 'اسناد ۱ تا ۶',
    translationRule: 'ترجمه رسمی + تایید دادگستری و وزارت خارجه (برخی سفارت‌ها: لگالایز)',
    validityRule: 'پاسپورت: حداقل ۶ ماه بیش از پایان ویزا | سوءپیشینه و عکس: کمتر از ۳ تا ۶ ماه',
    items: [
      {
        num: 1,
        title: 'پاسپورت معتبر',
        desc: 'با حداقل اعتبار باقیمانده (معمولاً حداقل ۶ ماه بیشتر از مدت ویزا) و داشتن صفحات سفید کافی.',
        legalNote: 'تطابق کامل اسپل انگلیسی نام و نام خانوادگی با تمامی ترجمه‌ها الزامی است.',
      },
      {
        num: 2,
        title: 'شناسنامه تمام‌صفحه',
        desc: 'ترجمه رسمی تمام صفحات شناسنامه (حتی صفحات سفید بدون توضیحات).',
        legalNote: 'در صورت داشتن توضیحات ازدواج، طلاق یا تغییر نام، درج دقیق در ترجمه ضروری است.',
      },
      {
        num: 3,
        title: 'سند ازدواج یا طلاق',
        desc: '(در صورت تأهل یا تغییر وضعیت تأهل) به همراه ترجمه رسمی و تاییدات کامل.',
        legalNote: 'برای پرونده‌های ویزای همراه (همسر و فرزندان) ارائه عقدنامه رسمی و لگالایزشده اجباری است.',
      },
      {
        num: 4,
        title: 'کارت ملی هوشمند',
        desc: 'کپی و ترجمه رسمی کارت ملی (در صورت درخواست سفارت یا مراجع ثبتی).',
        legalNote: 'در نبود کارت هوشمند فیزیکی، رسید ثبت‌نام معتبر به همراه شناسنامه ارائه می‌شود.',
      },
      {
        num: 5,
        title: 'گواهی عدم سوءپیشینه',
        desc: 'سند رسمی ترجمه‌شده با اعتبار زمانی مشخص (معمولاً صادرشده در ۳ ماه اخیر).',
        legalNote: 'باید پیش از انقضای ۹۰ روزه، تاییدیه دادگستری، وزارت خارجه و لگالایز بگیرد.',
      },
      {
        num: 6,
        title: 'عکس پرسنلی بیومتریک',
        desc: 'عکس‌های جدید (کمتر از ۶ ماه) با زمینه سفید و استانداردهای مشخص سفارت (ICAO).',
        legalNote: 'ابعاد استاندارد شینگن ۳.۵ × ۴.۵ سانتی‌متر با چهره خنثی و بدون روتوش سنگین.',
      },
    ],
  },
  {
    id: 'category-2',
    key: 'academic',
    title: 'دسته دوم: مدارک تحصیلی و ارزیابی‌های آکادمیک (اسناد ۷ تا ۱۲)',
    shortTitle: 'تحصیلی و ارزشیابی (۷–۱۲)',
    subtitle: 'برای ویزاهای تحصیلی، کاری و برخی ویزاهای اقامتی، سوابق تحصیلی شما باید به‌صورت رسمی ترجمه و ارزشیابی شود.',
    rangeLabel: 'اسناد ۷ تا ۱۲',
    translationRule: 'ترجمه رسمی + تایید دادگستری و امور خارجه + لگالایز سفارت (آلمان/اتریش)',
    validityRule: 'گزارش ZAB / Anerkennung دائمی است؛ گواهی اشتغال به تحصیل مختص همان ترم است',
    items: [
      {
        num: 7,
        title: 'دانشنامه نهایی (مدرک تحصیلی)',
        desc: 'دیپلم، کارشناسی، کارشناسی ارشد یا دکتری (بسته به نوع پرونده و شرط مقطع ویزا).',
        legalNote: 'دانشجویان دانشگاه آزاد باید تاییدیه سازمان مرکزی را پیش از ترجمه اخذ کنند.',
      },
      {
        num: 8,
        title: 'ریزنمرات رسمی تمام مقاطع',
        desc: 'شامل تمام ترم‌های گذرانده‌شده با مهر و امضای دانشگاه یا آموزش‌وپرورش.',
        legalNote: 'برای دانشجویان مهندسی و پزشکی جهت معادلسازی واحدهای درسی حیاتی است.',
      },
      {
        num: 9,
        title: 'تاییدیه معادلسازی مدرک خارجی (ZAB یا Anerkennung)',
        desc: 'برگه ارزیابی رسمی مدرک برای کشورهای آلمان (Anabin/ZAB) یا اتریش (ENIC NARIC / Nostrifizierung).',
        legalNote: 'برای بلوکارت و بسیاری از ویزاهای کاری، نبود معادلسازی منجر به توقف پرونده می‌شود.',
      },
      {
        num: 10,
        title: 'گواهی اشتغال به تحصیل یا کارت دانشجویی',
        desc: '(در صورتی که هنوز در حال تحصیل هستید و مدرک نهایی صادر نشده است).',
        legalNote: 'باید تاریخ تقریبی فارغ‌التحصیلی و تعداد واحدهای گذرانده‌شده در آن قید شود.',
      },
      {
        num: 11,
        title: 'رزومه استاندارد تحصیلی و کاری (CV)',
        desc: 'به فرمت استاندارد اروپایی (Europass) به زبان انگلیسی یا آلمانی.',
        legalNote: 'گپ‌های زمانی بین مقاطع تحصیلی یا شغلی نباید بدون توضیح رها شوند.',
      },
      {
        num: 12,
        title: 'گواهی دوره‌های آموزشی تخصصی',
        desc: 'گواهینامه‌های معتبر مهارت‌آموزی (فنی‌وحرفه‌ای، زبان‌های برنامه‌نویسی و...) مرتبط با هدف مهاجرت.',
        legalNote: 'داشتن کد رجیستری و تاییدیه سازمان فنی‌وحرفه‌ای امتیاز بالایی برای مسیرهای مهارتی دارد.',
      },
    ],
  },
  {
    id: 'category-3',
    key: 'employment',
    title: 'دسته سوم: مدارک شغلی و سوابق بیمه تامین اجتماعی (اسناد ۱۳ تا ۱۹)',
    shortTitle: 'شغلی و بیمه (۱۳–۱۹)',
    subtitle: 'این دسته برای ویزاهای کاری، جستجوی کار، خوداشتغالی و اثبات پیوند بازگشت (Home Ties) حیاتی‌ترین بخش پرونده است.',
    rangeLabel: 'اسناد ۱۳ تا ۱۹',
    translationRule: 'ترجمه رسمی سربرگ شرکت + سابقه بیمه تامین اجتماعی با تاریخ‌های دقیق',
    validityRule: 'تطابق ۱۰۰٪ تاریخ‌های گواهی کار، فیش حقوقی و پرینت تامین اجتماعی الزامی است',
    items: [
      {
        num: 13,
        title: 'گواهی اشتغال به کار رسمی',
        desc: 'سربرگ شرکت، سمت شغلی، تاریخ شروع به کار، حقوق دریافتی و تاییدیه مرخصی یا استعفا (به انگلیسی یا آلمانی).',
        legalNote: 'شرح وظایف (Job Description) باید هم‌راستا با رشته شغلی مورد تقاضا باشد.',
      },
      {
        num: 14,
        title: 'سابقه بیمه تامین اجتماعی (یا سابقه بیمه سلامت)',
        desc: 'پرینت رسمی سوابق بیمه با جزئیات کارفرمایان (مهم‌ترین سند اثبات سابقه کار در سفارت).',
        legalNote: 'سفارت‌های اروپا تاریخ گواهی کار را مستقیماً با کد کارگاهی تامین اجتماعی راستی‌آزمایی می‌کنند.',
      },
      {
        num: 15,
        title: 'فیش‌های حقوقی ماه‌های اخیر',
        desc: '۳ تا ۶ فیش حقوقی آخر ممهور به مهر شرکت و امضای امور مالی.',
        legalNote: 'مبلغ خالص فیش حقوقی باید دقیقاً با مبالغ واریزی در گردش حساب بانکی مطابقت داشته باشد.',
      },
      {
        num: 16,
        title: 'قراردادهای کاری رسمی (سابقه)',
        desc: 'کپی قراردادهای کاری سال‌های گذشته در ایران یا قراردادهای پیمانکاری B2B.',
        legalNote: 'برای فریلنسرها و نیروهای پروژه‌ای جایگزین یا مکمل سابقه بیمه است.',
      },
      {
        num: 17,
        title: 'جواز کسب یا ثبت شرکت',
        desc: '(مختص مدیران، صاحبان شرکت یا مشاغل آزاد) به همراه آگهی تاسیس و تغییرات روزنامه رسمی.',
        legalNote: 'به همراه آخرین برگه‌های پرداخت مالیات عملکرد برای اثبات فعال بودن کسب‌وکار.',
      },
      {
        num: 18,
        title: 'نمونه کارها یا پورتفوی تخصصی (Portfolio)',
        desc: '(مختص مهندسان، طراحان، هنرمندان، نوازندگان و برنامه‌نویسان).',
        legalNote: 'برای ویزای هنرمندان و فریلنسری، ارائه لینک زنده و اسناد مالکیت آثار بسیار تعیین‌کننده است.',
      },
      {
        num: 19,
        title: 'نامه تمایل به همکاری از کارفرما (Job Offer یا Letter of Intent)',
        desc: '(در صورت دریافت پیشنهاد شغلی رسمی یا دعوت‌نامه کاری در کشور مقصد).',
        legalNote: 'در آلمان (فرم Erklärung zum Beschäftigungsverhältnis) و در اتریش (Arbeitgebererklärung) لازم است.',
      },
    ],
  },
  {
    id: 'category-4',
    key: 'financial',
    title: 'دسته چهارم: اسناد مالی، تمکن و گردش حساب بانکی (اسناد ۲۰ تا ۲۵)',
    shortTitle: 'مالی و تمکن (۲۰–۲۵)',
    subtitle: 'شفافیت مالی سنگ بنای تایید ویزا در سفارتخانه‌هاست و نبود پول‌پارکینگ حیاتی است.',
    rangeLabel: 'اسناد ۲۰ تا ۲۵',
    translationRule: 'نسخه انگلیسی رسمی بانک (ممهور به مهر برجسته شعبه) + ترجمه رسمی اسناد ملکی',
    validityRule: 'تمکن مالی باید حداکثر ۷ تا ۱۴ روز پیش از روز مصاحبه سفارت صادر شود',
    items: [
      {
        num: 20,
        title: 'گواهی تمکن مالی بانک (Bank Balance Certificate)',
        desc: 'نامه رسمی بانک با ذکر موجودی به یورو یا دلار و مهر برجسته شعبه.',
        legalNote: 'نرخ تبدیل ارز رسمی مورد استناد بانک باید شفاف باشد و موجودی کف قانون را پوشش دهد.',
      },
      {
        num: 21,
        title: 'گردش حساب بانکی ۳ تا ۶ ماهه',
        desc: 'پرینت گردش حساب رسمی که نشان‌دهنده واریزهای منظم و شفاف باشد (بدون پول‌پارکینگ).',
        legalNote: 'واریز ناگهانی و سنگین چند روز قبل از مصاحبه یکی از اصلی‌ترین علل ریجکتی است.',
      },
      {
        num: 22,
        title: 'اسناد مالکیت ملکی (سند خانه، زمین یا تجاری)',
        desc: 'ترجمه رسمی سند ملک در ایران به‌عنوان پشتوانه مالی و وابستگی عاطفی (Home Ties).',
        legalNote: 'دارایی غیرمنقول قدرت بازگشت به کشور مبدأ را در پرونده‌های کوتاه‌مدت و تحصیلی ثابت می‌کند.',
      },
      {
        num: 23,
        title: 'اسناد مالکیت خودرو یا سهام بورسی',
        desc: '(در صورت وجود) برای تقویت بنیه مالی پرونده.',
        legalNote: 'به‌عنوان سند مکمل در کنار تمکن مالی نقدی ارزش اثباتی دارد (جایگزین پول نقد نیست).',
      },
      {
        num: 24,
        title: 'اجاره‌نامه رسمی ملکی',
        desc: '(در صورت داشتن ملک اجاره‌ای در ایران و دریافت درآمد اجاره — به‌ویژه در ویزای تمکن مالی اروپا).',
        legalNote: 'ثبت کد رهگیری و انطباق مبلغ اجاره با واریزی‌های ماهانه بانکی ضروری است.',
      },
      {
        num: 25,
        title: 'فیش حقوقی یا اسناد سود سپرده (Source of Funds)',
        desc: 'مدارکی که منشأ قانونی واریزی‌های حساب بانکی شما را اثبات کنند.',
        legalNote: 'در پرونده‌های فروش ملک یا خودرو، مبایعه‌نامه رسمی برای توضیح ورود پول الزامی است.',
      },
    ],
  },
  {
    id: 'category-5',
    key: 'language',
    title: 'دسته پنجم: مدرک زبان، انگیزه‌نامه و سایر تاییدات کنسولی (اسناد ۲۶ تا ۳۰)',
    shortTitle: 'زبان و کنسولی (۲۶–۳۰)',
    subtitle: 'اسناد نهایی که کلید طلایی ورود شما به پروسه مصاحبه و متقاعدسازی افسر کنسولی هستند.',
    rangeLabel: 'اسناد ۲۶ تا ۳۰',
    translationRule: 'نسخه اصلی کارنامه بین‌المللی زبان + نگارش تخصصی SOP به زبان انگلیسی یا آلمانی',
    validityRule: 'آیلتس/تافل: ۲ سال | گوته/ÖSD/Telc: ترجیحاً زیر ۱ تا ۲ سال | بیمه: کل دوره سفر',
    items: [
      {
        num: 26,
        title: 'مدرک بین‌المللی زبان',
        desc: 'گواهی معتبر زبان آلمانی (Goethe، ÖSD، Telc در سطوح B1/B2 یا A1 همراه) یا زبان انگلیسی (IELTS، TOEFL).',
        legalNote: 'برخی مسیرها نظیر ویزای استارتاپ، بلوکارت آلمان یا تمکن مالی بدون مدرک زبان نیز قابل انجامند.',
      },
      {
        num: 27,
        title: 'انگیزه‌نامه شخصی (SOP / Motivation Letter)',
        desc: 'نامه حقوقی و مستدل که اهداف تحصیلی، شغلی و برنامه آینده شما را به شکل منطقی توضیح می‌دهد.',
        legalNote: 'استفاده از متن‌های کپی یا تولیدشده بدون پیوند منطقی با سوابق فردی باعث شک افسر می‌شود.',
      },
      {
        num: 28,
        title: 'توصیه‌نامه‌های تحصیلی یا شغلی (Recommendation Letters)',
        desc: 'حداقل ۲ توصیه‌نامه از اساتید دانشگاه یا مدیران قبلی با سربرگ رسمی و امضا و اطلاعات تماس معتبر.',
        legalNote: 'ایمیل سازمانی یا دانشگاهی معرفی‌کننده اعتبار نامه را به‌شدت افزایش می‌دهد.',
      },
      {
        num: 29,
        title: 'واچر قطعی هتل و رزرو پرواز',
        desc: '(مختص ویزاهای توریستی یا بازدید کوتاه‌مدت — در ویزاهای اقامتی معمولاً پس از پیش‌تاییدیه ارائه می‌شود).',
        legalNote: 'رزروهای باطل‌شده یا غیرقابل استعلام در روز بررسی سفارت یکی از علل ریجکتی بند ۸ شینگن است.',
      },
      {
        num: 30,
        title: 'بیمه‌نامه مسافرتی معتبر شینگن',
        desc: 'بیمه‌نامه با پوشش حداقل ۳۰,۰۰۰ یورو (فوریت‌های پزشکی و بازگشت) برای کل مدت سفر.',
        legalNote: 'در ویزاهای ملی Type D پس از تایید اولیه برای صدور برچسب ویزا ارائه می‌گردد.',
      },
    ],
  },
];

const faqs = [
  {
    q: 'اعتبار ترجمه رسمی مدارک برای سفارت‌های اروپا چقدر است؟',
    a: 'به‌طور کلی، ترجمه‌های رسمی دادگستری و وزارت امور خارجه تا زمانی که مهر و امضای آن‌ها معتبر باشد قابل استفاده‌اند، اما اکثر سفارت‌های اروپایی ترجیح می‌دهند تاریخ ترجمه مدارک حساس (به‌ویژه گواهی عدم سوءپیشینه و تمکن مالی) کمتر از ۳ تا ۶ ماه از تاریخ ارائه به سفارت گذشته باشد.',
  },
  {
    q: 'آیا برای مدارک تحصیلی ایران نیاز به تاییدیه دادگستری و وزارت خارجه است؟',
    a: 'بله؛ تمام مدارک دانشگاهی و ریزنمرات پس از ترجمه رسمی، نیازمند اخذ تاییدیه از دادگستری و وزارت امور خارجه جمهوری اسلامی ایران هستند و برای برخی کشورها (مثل آلمان و اتریش) باید مهر تایید سفارت (لگالایز) نیز روی آن‌ها درج شود.',
  },
  {
    q: 'اگر گواهی بیمه تامین اجتماعی نداشته باشیم (مثلاً به‌صورت فریلنسر کار کرده باشیم)، چه کنیم؟',
    a: 'در این صورت باید به جای سابقه بیمه، قراردادهای کاری رسمی با کارفرمایان (قراردادهای B2B)، فاکتورهای رسمی مالیاتی، رسیدهای بانکی واریز حق‌الزحمه و تاییدیه مالیات بر درآمد را به‌عنوان جایگزین سوابق شغلی ارائه دهید.',
  },
  {
    q: 'آیا می‌توانیم این چک‌لیست ۳۰ بندی را ذخیره و برای دوستانمان ارسال کنیم؟',
    a: 'بله؛ این چک‌لیست به‌عنوان یک مرجع استاندارد طراحی شده است و می‌توانید وضعیت آماده‌سازی هر ۳۰ مدرک را در همین صفحه تیک بزنید (ذخیره خودکار در مرورگر شما) یا لینک صفحه را برای هر کسی که قصد مهاجرت دارد ارسال کنید تا از خطاهای رایج جلوگیری شود.',
  },
];

const tocItems = [
  { id: 'why-checklist', label: 'چرا چک‌لیست پیش از اقدام؟' },
  { id: 'category-1', label: 'دسته ۱: مدارک هویتی (۱ تا ۶)' },
  { id: 'category-2', label: 'دسته ۲: مدارک تحصیلی (۷ تا ۱۲)' },
  { id: 'category-3', label: 'دسته ۳: شغلی و بیمه (۱۳ تا ۱۹)' },
  { id: 'category-4', label: 'دسته ۴: مالی و تمکن (۲۰ تا ۲۵)' },
  { id: 'category-5', label: 'دسته ۵: زبان و کنسولی (۲۶ تا ۳۰)' },
  { id: 'expert-insights', label: 'نکته دیاکو: دام تاریخ بیمه' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const ImmigrationDocumentChecklistPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [checkedIds, setCheckedIds] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      /* ignore */
    }
    return [];
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    } catch {
      /* ignore */
    }
  }, [checkedIds]);

  const toggleDoc = (num: number) => {
    setCheckedIds((prev) => (prev.includes(num) ? prev.filter((id) => id !== num) : [...prev, num]));
  };

  const resetChecklist = () => {
    setCheckedIds([]);
  };

  const readinessPercent = Math.round((checkedIds.length / 30) * 100);

  useSeo({
    title: 'چک‌لیست کامل مدارک مهاجرت: ۳۰ سند کلیدی که باید همین امروز آماده کنید (۲۰۲۶-۲۰۲۷) | دیاکو',
    description:
      'چک‌لیست کامل و گام‌به‌گام مدارک مهاجرت به اروپا و کانادا در سال‌های ۲۰۲۶ و ۲۰۲۷ شامل ۳۰ سند ضروری هویتی، تحصیلی (ZAB/ENIC)، شغلی، بیمه، مالی و زبان.',
    canonical: 'https://www.dia-co.ir/complete-immigration-document-checklist',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'چک لیست مدارک مهاجرت ۲۰۲۶-۲۰۲۷',
      'مدارک لازم برای مهاجرت به اروپا',
      'سابقه بیمه تامین اجتماعی برای سفارت',
      'تاییدیه مدرک ZAB و Anerkennung',
      'تمکن مالی و گردش حساب بدون پول پارکینگ',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/complete-immigration-document-checklist/#article',
          headline: 'چک‌لیست کامل مدارک مهاجرت: ۳۰ سند کلیدی که باید همین امروز آماده کنید (۲۰۲۶–۲۰۲۷)',
          description:
            'چک‌لیست کامل و گام‌به‌گام مدارک مهاجرت به اروپا و کانادا در سال‌های ۲۰۲۶ و ۲۰۲۷ شامل ۳۰ سند ضروری هویتی، تحصیلی، شغلی و مالی.',
          image: [
            'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T13:50:00+03:30',
          dateModified: '2026-11-14T13:50:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی و مدیریت پرونده‌های مهاجرتی هلدینگ مهاجرتی دیاکو',
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
          citation: ['https://www.make-it-in-germany.com/', 'https://www.migration.gv.at/'],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/complete-immigration-document-checklist',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/complete-immigration-document-checklist/#faq',
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

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'identity':
        return <UserCheck className="h-5 w-5 text-amber-300 shrink-0" />;
      case 'academic':
        return <GraduationCap className="h-5 w-5 text-cyan-300 shrink-0" />;
      case 'employment':
        return <Briefcase className="h-5 w-5 text-emerald-300 shrink-0" />;
      case 'financial':
        return <Landmark className="h-5 w-5 text-amber-300 shrink-0" />;
      default:
        return <Languages className="h-5 w-5 text-cyan-300 shrink-0" />;
    }
  };

  const visibleCategories =
    activeFilter === 'all' ? CATEGORIES : CATEGORIES.filter((cat) => cat.key === activeFilter);

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
              ابزارهای آماده سازی مدارک سفارت
            </button>
            <span className="text-slate-500">‹</span>
            <span className="text-amber-300 font-bold">چک‌لیست ۳۰ سند کلیدی مهاجرت (۲۰۲۶–۲۰۲۷)</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigateToBlogPost && (
              <button
                type="button"
                onClick={() => onNavigateToBlogPost('complete-immigration-document-checklist')}
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
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-wrap items-center gap-2.5 text-xs mb-4">
            <span className="rounded-full bg-amber-400/15 border border-amber-400/40 px-3 py-1 font-bold text-amber-300 flex items-center gap-1.5">
              <ClipboardCheck className="h-3.5 w-3.5" />
              چک‌لیست حقوقی ۳۰ سند مهاجرت (۲۰۲۶–۲۰۲۷)
            </span>
            <span className="rounded-full bg-cyan-500/10 border border-cyan-400/30 px-3 py-1 font-bold text-cyan-200 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              به‌روزرسانی: نوامبر ۲۰۲۶
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-slate-300 font-semibold flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-300" />
              ممیزی دپارتمان مدیریت پرونده‌های دیاکو
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            چک‌لیست کامل مدارک مهاجرت: ۳۰ سند کلیدی که باید همین امروز آماده کنید (۲۰۲۶–۲۰۲۷)
          </h1>

          {/* Author & Reviewer */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div>
              <span className="text-slate-400">تدوین حقوقی: </span>
              <strong className="text-white">دپارتمان حقوقی و مدیریت پرونده‌های مهاجرتی هلدینگ مهاجرتی دیاکو</strong>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div>
              <span className="text-slate-400">بازبینی اجرایی: </span>
              <strong className="text-amber-300">دفتر اجرایی هلدینگ دیاکو در وین، بوداپست، آتن و تهران</strong>
            </div>
          </div>

          {/* BLUF Box */}
          <div className="mt-6 rounded-3xl border border-cyan-400/40 bg-gradient-to-l from-[#0e3240] via-[#092731] to-[#081f27] p-6 md:p-7 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-black text-cyan-300 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج AI)</span>
            </div>
            <p className="text-sm md:text-base leading-8 text-slate-100 text-justify">
              برای شروع هر پرونده مهاجرتی موفق به اروپا یا کانادا در سال‌های ۲۰۲۶ و ۲۰۲۷، پیش از رزرو وقت سفارت
              یا ثبت‌نام در دانشگاه‌ها، نیازمند گردآوری <strong className="text-amber-300">۳۰ سند استاندارد</strong>{' '}
              هستید که در ۵ دسته کلیدی تقسیم می‌شوند: ۱) مدارک هویتی و پاسپورت، ۲) مدارک تحصیلی و ریزنمرات (به
              همراه ارزشیابی <strong className="text-cyan-300">ZAB یا ENIC</strong>)، ۳) سوابق شغلی و بیمه تامین
              اجتماعی، ۴) مدارک مالی و گردش حساب بانکی (بدون خطای Money Parking)، و ۵) گواهی‌های زبان بین‌المللی و
              انگیزه‌نامه (SOP). داشتن این اسناد به‌صورت دسته‌بندی‌شده،{' '}
              <strong className="text-emerald-300">زمان اجرای پرونده شما را تا ۵۰ درصد کاهش می‌دهد.</strong>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-sm font-black text-[#082833] shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center gap-2"
            >
              <span>درخواست ممیزی رایگان مدارک پیش از ارسال به سفارت</span>
              <ShieldCheck className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('document-checker')}
              className="rounded-2xl border border-cyan-400/35 bg-cyan-500/10 hover:bg-cyan-500/20 px-5 py-3.5 text-sm font-bold text-cyan-200 transition cursor-pointer"
            >
              سامانه هوشمند بررسی مدارک کشورها
            </button>
            <button
              type="button"
              onClick={() => navigateInternal('degree-recognition-for-immigration')}
              className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition cursor-pointer"
            >
              راهنمای معادلسازی مدرک (ZAB / Anabin)
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
            <span>فهرست مطالب چک‌لیست کامل مدارک مهاجرت (۳۰ سند کلیدی)</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            {tocItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#08222b] px-3 py-2.5 text-slate-200 hover:border-[#f5a623] hover:text-amber-300 transition"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-400/15 text-[10px] font-black text-amber-300">
                  {idx + 1}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Why Checklist */}
        <section id="why-checklist" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-amber-300 shrink-0" />
            <span>چرا داشتن «چک‌لیست پیش از اقدام» جلوی ریجکتی ویزا را می‌گیرد؟</span>
          </h2>
          <p className="text-sm leading-8 text-slate-200 text-justify">
            یکی از شایع‌ترین دلایل نقص پرونده در سفارتخانه‌های اروپایی در سال ۲۰۲۶،{' '}
            <strong className="text-amber-300">«کمبود یا نقص در زنجیره اسناد پشتیبان»</strong> است. وقتی متقاضی بدون
            داشتن یک نقشه راه مکتوب اقدام به جمع‌آوری مدارک می‌کند، معمولاً تاییدات دادگستری، مهر وزارت امور خارجه یا
            لگالایز سفارت فراموش می‌شود و در روز مصاحبه با بن‌بست مواجه می‌گردد. این چک‌لیست ۳۰ بندی دقیقاً همان
            ابزاری است که وکلای مهاجرتی دیاکو برای کنترل نهایی پرونده‌ها استفاده می‌کنند.
          </p>
        </section>

        {/* Interactive Progress Dashboard */}
        <section className="rounded-3xl border border-amber-400/35 bg-gradient-to-l from-[#0e2e3a] via-[#09242d] to-[#081d25] p-6 md:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-2xl font-black text-white">
                ردیاب تعاملی آماده‌سازی ۳۰ سند مهاجرتی شما
              </h2>
              <p className="mt-1 text-xs md:text-sm text-slate-300">
                مدارکی را که تا امروز آماده کرده‌اید تیک بزنید؛ وضعیت پیشرفت شما به‌صورت خودکار در مرورگر ذخیره می‌شود:
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-amber-400/40 bg-black/25 px-4 py-2 text-center">
                <div className="text-xl md:text-2xl font-black text-amber-300">{checkedIds.length} / ۳۰</div>
                <div className="text-[11px] text-slate-300">{readinessPercent}٪ آمادگی پرونده</div>
              </div>
              {checkedIds.length > 0 && (
                <button
                  type="button"
                  onClick={resetChecklist}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>پاک کردن تیک‌ها</span>
                </button>
              )}
            </div>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-l from-amber-400 to-emerald-400 transition-all duration-300"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`rounded-xl px-4 py-2 text-xs font-bold border transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                  : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
              }`}
            >
              نمایش همه دسته‌ها (۳۰ سند)
            </button>
            {CATEGORIES.map((cat) => {
              const catChecked = cat.items.filter((i) => checkedIds.includes(i.num)).length;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveFilter(cat.key)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold border transition cursor-pointer ${
                    activeFilter === cat.key
                      ? 'bg-[#f5a623] text-[#082833] border-[#f5a623]'
                      : 'bg-white/5 text-slate-200 border-white/10 hover:border-amber-400/40'
                  }`}
                >
                  {cat.shortTitle} ({catChecked}/{cat.items.length})
                </button>
              );
            })}
          </div>
        </section>

        {/* Summary Matrix Table */}
        <section className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">
            جدول خلاصه استاندارد ترجمه، تاییدات و اعتبار ۵ دسته مدارک سفارت (۲۰۲۶–۲۰۲۷)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-amber-400/15 text-amber-300 font-black">
                <tr>
                  <th className="p-3.5">دسته اسناد</th>
                  <th className="p-3.5">شماره اسناد</th>
                  <th className="p-3.5">استاندارد ترجمه و لگالایز</th>
                  <th className="p-3.5">مهلت اعتبار قانونی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-black/20">
                {CATEGORIES.map((cat) => (
                  <tr key={cat.id} className="hover:bg-white/[0.04] transition">
                    <td className="p-3.5 font-black text-white">{cat.shortTitle}</td>
                    <td className="p-3.5 text-amber-300 font-bold whitespace-nowrap">{cat.rangeLabel}</td>
                    <td className="p-3.5 text-slate-200 leading-6">{cat.translationRule}</td>
                    <td className="p-3.5 text-cyan-200 leading-6">{cat.validityRule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* All 5 Categories (30 Documents) */}
        <div className="space-y-8">
          {visibleCategories.map((cat) => {
            const catCompleted = cat.items.filter((item) => checkedIds.includes(item.num)).length;
            return (
              <section
                key={cat.id}
                id={cat.id}
                className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="space-y-1.5">
                    <h2 className="text-lg md:text-2xl font-black text-white flex items-center gap-2">
                      {getCategoryIcon(cat.key)}
                      <span>{cat.title}</span>
                    </h2>
                    <p className="text-xs md:text-sm text-slate-300">{cat.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-white/5 border border-white/15 px-3 py-1 text-xs font-black text-amber-300 whitespace-nowrap">
                    تکمیل‌شده: {catCompleted} از {cat.items.length}
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {cat.items.map((item) => {
                    const isChecked = checkedIds.includes(item.num);
                    return (
                      <button
                        key={item.num}
                        type="button"
                        onClick={() => toggleDoc(item.num)}
                        className={`text-right rounded-2xl border p-4 transition cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'border-emerald-400/50 bg-emerald-950/25'
                            : 'border-white/10 bg-[#06181f] hover:border-amber-400/40'
                        }`}
                      >
                        <div
                          className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border text-xs font-black transition ${
                            isChecked
                              ? 'border-emerald-400 bg-emerald-400 text-[#06181f]'
                              : 'border-white/25 bg-white/5 text-slate-300'
                          }`}
                        >
                          {isChecked ? <CheckCircle2 className="h-4 w-4" /> : item.num}
                        </div>
                        <div className="space-y-1.5">
                          <div className="text-sm font-black text-white">
                            {item.num}. {item.title}
                          </div>
                          <p className="text-xs leading-6 text-slate-200">{item.desc}</p>
                          <p className="text-[11px] leading-5 text-cyan-200/90">
                            <span className="font-bold text-amber-300">نکته ممیزی: </span>
                            {item.legalNote}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Information Gain */}
        <section
          id="expert-insights"
          className="rounded-3xl border border-emerald-400/35 bg-gradient-to-l from-emerald-950/35 via-[#0a232d] to-[#081f27] p-6 md:p-8 space-y-4"
        >
          <div className="flex items-center gap-2 text-emerald-300 font-black text-sm">
            <AlertTriangle className="h-5 w-5" />
            <span>نکته تجربی از پرونده‌های واقعی (Information Gain — هلدینگ مهاجرتی دیاکو)</span>
          </div>
          <p className="text-sm leading-8 text-slate-100 text-justify">
            بر اساس تجربه مستقیم تیم حقوقی هلدینگ مهاجرتی دیاکو در دفاتر وین، بوداپست، آتن و تهران، بزرگ‌ترین خطایی
            که افراد در جمع‌آوری این ۳۰ سند مرتکب می‌شوند،{' '}
            <strong className="text-amber-300">
              «عدم تطابق تاریخ‌های مندرج در مدارک شغلی با سوابق بیمه تامین اجتماعی»
            </strong>{' '}
            است. برای مثال، اگر در گواهی اشتغال به کار ذکر شده باشد که شما از سال ۱۴۰۰ در فلان شرکت کار می‌کنید، اما
            سابقه بیمه شما ۳ سال را نشان دهد، افسر کنسولی بلافاصله پرونده را به دلیل تناقض رد می‌کند. تیم دیاکو پیش از
            ارسال مدارک به سفارت، زنجیره مدارک شغلی، تحصیلی و مالی شما را با یک چک‌لیست حقوقی دقیق ممیزی می‌کند تا
            هیچ‌گونه نقطه خاکستری در پرونده باقی نماند.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-white">سوالات متداول چک‌لیست مدارک مهاجرت (FAQ)</h2>
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

        {/* Internal & Official Links + CTA */}
        <section className="rounded-3xl border border-white/10 bg-[#08222b] p-6 md:p-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4" />
              <span>ابزارها و راهنماهای مکمل آماده سازی پرونده</span>
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { page: 'document-checker', label: 'ابزار هوشمند بررسی مدارک کشورها' },
                { page: 'degree-recognition-for-immigration', label: 'راهنمای معادلسازی مدرک (ZAB / Anabin)' },
                { page: 'why-my-visa-was-rejected-10-real-reasons', label: '۱۰ دلیل واقعی ریجکتی ویزا و رفع آن' },
                { page: 'real-cost-of-immigration-hidden-fees', label: 'هزینه واقعی و هزینه‌های پنهان ترجمه' },
                { page: 'visa-approval-rate-for-iranians-by-country', label: 'نرخ موفقیت ویزا به تفکیک کشور' },
                { page: 'online-consult', label: 'ممیزی مدارک با وکیل رسمی دیاکو' },
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
              <span>ممیزی تخصصی و منابع رسمی مهاجرتی</span>
            </h3>
            <p className="text-xs leading-6 text-slate-300">
              دفتر وین: Ausstellungsstraße 50/2.OG, 1020 Wien, Austria | اینستاگرام: @diaco.consulting
            </p>
            <div className="space-y-2 text-xs">
              {[
                { label: 'پورتال رسمی نیروی کار ماهر آلمان (Make it in Germany)', url: 'https://www.make-it-in-germany.com/' },
                { label: 'پورتال رسمی مهاجرت اتریش (Migration.gv.at)', url: 'https://www.migration.gv.at/' },
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
                <span>تهران: 021-91693955 | 021-88073287</span>
              </a>
              <span className="text-[11px] text-slate-300" dir="ltr">
                Wien WA: +43 688 976 3256 | IR: 09306229790
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImmigrationDocumentChecklistPage;
