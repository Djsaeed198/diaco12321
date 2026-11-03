/**
 * Server-Side Technical SEO & Pre-rendering Engine for Diaco Holding
 * 
 * Provides:
 * 1. Route-specific dynamic <title> and <meta name="description">
 * 2. Canonical tag injection (<link rel="canonical" href="https://www.dia-co.ir/path">)
 * 3. Dynamic OpenGraph & Twitter Cards
 * 4. Rich JSON-LD Structured Data per page
 * 5. Meaningful Semantic HTML snapshot in <div id="root"> (h1, breadcrumbs, answer-first summary, key legal criteria)
 * 
 * Solves the "Empty HTML / Client-Side Rendering Invisible to Crawlers" issue.
 */

export interface PageSeoInfo {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  lead: string;
  highlights: string[];
  legalReference?: string;
  breadcrumbLabel: string;
  category: string;
  ogType?: 'website' | 'article';
}

const BASE_URL = 'https://www.dia-co.ir';

const STATIC_ROUTES: Record<string, PageSeoInfo> = {
  '': {
    title: 'هلدینگ مهاجرتی دیاکو | سنجش هوشمند شانس ویزا و اقامت اروپا',
    description: 'سامانه رسمی هلدینگ مهاجرتی دیاکو؛ ارزیابی آنلاین شانس ویزا، تمکن مالی اتریش، کارت شانس آلمان و گلدن ویزای یونان زیر نظر وکلای پایه یک وین و آتن.',
    canonicalPath: '/',
    h1: 'هلدینگ بین‌المللی دیاکو؛ مرجع تخصصی حقوق مهاجرت، اقامت و سرمایه‌گذاری در اروپا',
    lead: 'ارزیابی هوشمند شانس ویزا، تمکن مالی اتریش، بلوکارت آلمان، کارت شانس و گلدن ویزای شنگن با بیش از ۲۰ سال سابقه درخشان در دفاتر وین، آتن و تهران.',
    highlights: [
      'وکالت مستقیم در کانون‌های وکلای اتریش و آلمان (بدون واسطه)',
      'سنجش هوشمند شانس پرونده با الگوریتم‌های کنسولی به‌روزشده ۲۰۲۶',
      'پوشش سراسری بیش از ۷۰ روش مهاجرتی به همراه پشتیبانی حضوری پس از ورود (After-Arrival)',
      'تضمین شفافیت مالی و انطباق کامل با قوانین اداره اقامت MA35 و کانون وکلا',
    ],
    legalReference: 'Austrian Niederlassungs- und Aufenthaltsgesetz (NAG) & German AufenthG',
    breadcrumbLabel: 'صفحه اصلی',
    category: 'صفحه اصلی',
    ogType: 'website',
  },
  'german-blue-card': {
    title: 'بلوکارت آلمان ۲۰۲۶ | شرایط، حقوق و مسیر اقامت دائم | دیاکو',
    description: 'راهنمای کامل بلوکارت آلمان ۲۰۲۶: حداقل حقوق €۴۸,۳۰۰، شرایط مدرک و زبان، و مسیر اقامت دائم ۲۱ تا ۲۷ ماهه با نظارت وکلای دیاکو.',
    canonicalPath: '/german-blue-card',
    h1: 'بلوکارت آلمان ۲۰۲۶ (EU Blue Card Germany)؛ شرایط، حداقل حقوق و مراحل اخذ اقامت',
    lead: 'اقامت کاری ویژه متخصصان دانشگاهی و نخبگان در آلمان بر اساس بند §18b Abs. 2 قانون اقامت آلمان (AufenthG). اخذ اقامت دائم پس از ۲۱ ماه همراه با الحاق همزمان خانواده.',
    highlights: [
      'حداقل حقوق سالانه ناخالص: €۴۸,۳۰۰ (مشاغل معمولی) و €۴۳,۷۵۰ (مشاغل کسری نیرو STEM)',
      'مدارک تحصیلی: مدرک کارشناسی یا ارشد مورد تایید در سامانه آنابین (Anabin / ZAB)',
      'اقامت دائم سریع: پس از ۲۱ ماه با داشتن مدرک زبان آلمانی B1 یا ۲۷ ماه با مدرک A1',
      'اجازه کار کامل و بدون محدودیت برای همسر بدون الزام به داشتن مدرک زبان در بدو ورود',
    ],
    legalReference: '§ 18b Abs. 2 AufenthG & EU Blue Card Directive 2021/1883',
    breadcrumbLabel: 'بلوکارت آلمان',
    category: 'اقامت کاری و متخصصان',
  },
  'financial-austria': {
    title: 'اقامت تمکن مالی اتریش ۲۰۲۶ | شرایط خودحمایتی، سهمیه و مدارک | دیاکو',
    description: 'راهنمای جامع اقامت تمکن مالی اتریش (NAG §44) در سال ۲۰۲۶: سهمیه سالانه، موجودی حساب بانکی، درآمد غیرفعال و ثبت نام در ۲ ژانویه با وکلای وین دیاکو.',
    canonicalPath: '/financial-austria',
    h1: 'اقامت تمکن مالی اتریش ۲۰۲۶ (خودحمایتی / NAG §44 Privatiere)؛ راهنمای جامع حقوقی',
    lead: 'بهترین مسیر اقامت بدون نیاز به کار، بدون سرمایه‌گذاری سنگین و بدون ریسک مالی در قلب اروپا تحت نظارت مستقیم وکلای رسمی کانون وکلای اتریش در وین.',
    highlights: [
      'مبنای قانونی: بند § 44 قانون اقامت اتریش (Niederlassungsbewilligung – ausgenommen Erwerbstätigkeit)',
      'شرط درآمد: اثبات درآمد ماهانه غیرفعال معادل حداقل €۲,۲۰۰ برای سرپرست و €۳,۵۰۰ برای زوجین',
      'موجودی حساب بانکی: گواهی موجودی یورو یا معادل ریالی معتبر جهت پوشش هزینه‌های یک ساله زندگی',
      'تحصیل رایگان فرزندان در مدارس دولتی و بین‌المللی و بیمه درمانی دولتی جامع (ÖGK)',
    ],
    legalReference: '§ 44 Niederlassungs- und Aufenthaltsgesetz (NAG) Österreich',
    breadcrumbLabel: 'تمکن مالی اتریش',
    category: 'تمکن مالی و خودحمایتی',
  },
  'austria-rwr': {
    title: 'کارت قرمز-سفید-قرمز اتریش ۲۰۲۶ | شرایط امتیاز و جاب‌آفر RWR | دیاکو',
    description: 'راهنمای کامل اخذ کارت قرمز-سفید-قرمز اتریش (Rot-Weiß-Rot-Karte): حداقل ۵۵ تا ۷۰ امتیاز، حقوق و شرایط کاریابی با نظارت وکلای دفتر وین دیاکو.',
    canonicalPath: '/austria-rwr',
    h1: 'کارت قرمز-سفید-قرمز اتریش ۲۰۲۶ (Rot-Weiß-Rot-Karte)؛ سیستم امتیازبندی و کار قانونی',
    lead: 'اقامت کاری معتبر اتریش برای متخصصان ماهر (Fachkräfte in Mangelberufen) و نیروی کار کلیدی با دسترسی به بازار کار اروپا و مسیر ۵ ساله تا پاسپورت اتریش.',
    highlights: [
      'حد نصاب امتیاز: کسب حداقل ۵۵ امتیاز از لیست مشاغل کسری نیرو یا ۷۰ امتیاز برای نیروی کار بسیار ماهر',
      'حداقل دستمزد قانونی: مطابق با توافق‌نامه کارگری اتریش (Kollektivvertrag)',
      'تبدیل به RWR پلاس: پس از ۲ سال کار با کارت RWR، متقاضی حق کار نامحدود در تمام اتریش دریافت می‌کند',
      'الحاق همزمان همسر و فرزندان همراه با اجازه اشتغال آزادانه در بازار کار اتریش',
    ],
    legalReference: 'Ausländerbeschäftigungsgesetz (AuslBG) & § 41 NAG',
    breadcrumbLabel: 'کارت RWR اتریش',
    category: 'اقامت کاری و متخصصان',
  },
  'jobseeker-germany': {
    title: 'کارت شانس آلمان ۲۰۲۶ (Chancenkarte) | سیستم امتیازبندی کاریابی | دیاکو',
    description: 'راهنمای کامل کارت شانس کاریابی آلمان ۲۰۲۶: کسب ۶ امتیاز از فاکتورهای سن، مدرک تحصیلی، زبان و سابقه، اجازه کار پاره‌وقت و اخذ اقامت دائم.',
    canonicalPath: '/jobseeker-germany',
    h1: 'کارت شانس آلمان ۲۰۲۶ (Chancenkarte)؛ راهنمای ویزای امتیازی جستجوی کار قانونی',
    lead: 'مدرن‌ترین سیستم امتیازی کاریابی در اروپا مصوب دولت فدرال آلمان بر اساس بند §20a AufenthG؛ یک سال فرصت قانونی برای جستجوی شغل در آلمان با امکان کار پاره‌وقت.',
    highlights: [
      'کسب ۶ امتیاز از معیارهای تحصیلی، مدرک زبان آلمانی یا انگلیسی، سن و سابقه کار مرتبط',
      'امکان ۲۰ ساعت کار پاره‌وقت در هفته در طول اقامت کارت شانس جهت تامین مخارج',
      'امکان اشتغال آزمایشی (Probebeschäftigung) به مدت ۲ هفته با کارفرمایان آلمانی',
      'تبدیل مستقیم و بدون بازگشت به کشور مبدا به ویزای کاری بلندمدت یا بلوکارت آلمان',
    ],
    legalReference: '§ 20a و § 20b Aufenthaltsgesetz (AufenthG)',
    breadcrumbLabel: 'کارت شانس آلمان',
    category: 'اقامت کاری و جستجوی کار',
  },
  'realestate-greece': {
    title: 'گلدن ویزای یونان ۲۰۲۶ | خرید ملک و اقامت طلایی اروپا | دیاکو',
    description: 'راهنمای خرید ملک و گلدن ویزای یونان ۲۰۲۶: کف سرمایه‌گذاری، اقامت ۵ ساله قابل تمدید برای ۳ نسل خانواده و بدون شرط حضور با وکلای دفتر آتن دیاکو.',
    canonicalPath: '/realestate-greece',
    h1: 'گلدن ویزای یونان ۲۰۲۶ (Greece Golden Visa)؛ خرید ملک و اقامت دائم اروپا',
    lead: 'سریع‌ترین و مطمئن‌ترین برنامه اقامت سرمایه‌گذاری اروپا با تاییدیه اداره مهاجرت یونان؛ صدور کارت اقامت شنگن برای متقاضی، همسر، فرزندان و والدین.',
    highlights: [
      'بدون شرط حضور: متقاضی هیچ اجباری برای اقامت فیزیکی در طول سال در کشور یونان ندارد',
      'پوشش ۳ نسل خانواده: امکان همراهی همسر، فرزندان زیر ۲۱ سال و والدین هر دو طرف',
      'درآمد ارزی سالانه: امکان اجاره بلندمدت یا توریستی ملک با بازدهی ۴ تا ۶ درصدی یورو',
      'پیگیری مستقیم توسط دفتر رسمی دیاکو در آتن با استعلام ثبتی و حقوقی سند ملک',
    ],
    legalReference: 'Greek Immigration and Social Integration Code (Law 5038/2023)',
    breadcrumbLabel: 'گلدن ویزای یونان',
    category: 'سرمایه‌گذاری و ملک',
  },
  'after-arrival': {
    title: 'خدمات پس از ورود و استقرار در اروپا ۲۰۲۶ | هلدینگ دیاکو',
    description: 'راهنمای جامع خدمات پس از ورود (After-Arrival) در اتریش، آلمان و اروپا: اجاره مسکن رسمی، ثبت ملدزتل، افتتاح حساب بانکی و تحویل کارت اقامت.',
    canonicalPath: '/after-arrival',
    h1: 'خدمات پس از ورود و استقرار قانونی در اروپا (After-Arrival Services ۲۰۲۶)',
    lead: 'همراهی گام‌به‌گام و حضوری کارشناسان و وکلای دیاکو از بدو ورود به فرودگاه مقصد تا تحویل کارت فیزیکی اقامت و استقرار کامل متقاضی و خانواده.',
    highlights: [
      'عقد قرارداد رسمی اجاره مسکن (Mietvertrag) منطبق با متراژ و ضوابط اداره اقامت',
      'همراهی در شهرداری یا مراجع ثبتی جهت دریافت برگه اقامت رسمی (Meldezettel / Anmeldung)',
      'افتتاح حساب جاری بانکی یورو در بانک‌های معتبر اروپایی نظیر Erste Bank و Bank Austria',
      'ثبت‌نام بیمه درمانی دولتی و همراهی در جلسات بیومتریک و تحویل کارت فیزیکی اقامت',
    ],
    legalReference: 'Meldegesetz 1991 (Österreich) & Bundesmeldegesetz (BMG Deutschland)',
    breadcrumbLabel: 'خدمات پس از ورود',
    category: 'خدمات استقرار در اروپا',
  },
  'blog': {
    title: 'بانک مقالات و تحلیل‌های حقوقی مهاجرت به اروپا ۲۰۲۶ | هلدینگ دیاکو',
    description: 'آرشیو جامع تحلیل‌های حقوقی، آخرین قوانین اقامت اتریش، بخشنامه‌های ۲۰۲۶ بلوکارت آلمان، تمکن مالی و گلدن ویزا به قلم وکلای رسمی دفتر وین هلدینگ دیاکو.',
    canonicalPath: '/blog',
    h1: 'بانک مقالات تخصصی، بخشنامه‌های کنسولی و تحلیل‌های حقوقی مهاجرت به اروپا ۲۰۲۶',
    lead: 'مجموعه تحلیل‌های دست‌اول و مستند قوانین شنگن، تغییرات سهمیه‌های تمکن مالی، بخشنامه‌های کاریابی و راهنماهای زندگی در اتریش و آلمان با استناد به منابع رسمی.',
    highlights: [
      'بررسی و انتشار فوری آخرین اصلاحیه‌های قوانین اداره مهاجرت اتریش و آلمان',
      'راهنماهای تجربی و مستند رفع ریجکتی و تنظیم لوایح دفاعیه برای سفارتخانه‌ها',
      'مقایسه شاخص‌های کیفیت زندگی، مالیات‌ها، اجاره مسکن و تحصیل رایگان در اروپا',
    ],
    breadcrumbLabel: 'بانک مقالات',
    category: 'اطلاع‌رسانی حقوقی',
  },
  'services': {
    title: 'فهرست خدمات جامع مهاجرت، اقامت و سرمایه‌گذاری اروپا ۲۰۲۶ | هلدینگ دیاکو',
    description: 'کاتالوگ کامل و تخصصی بیش از ۷۰ روش مهاجرتی به اتریش، آلمان، اسپانیا، ایتالیا و یونان با نظارت وکلای مقیم وین.',
    canonicalPath: '/services',
    h1: 'کاتالوگ جامع خدمات حقوقی، اقامتی و ویزای اروپا هلدینگ دیاکو',
    lead: 'پوشش کامل ۱۲ دپارتمان تخصصی شامل کاری، تمکن مالی، سرمایه‌گذاری، ثبت شرکت، آوسبیلدونگ، تحصیلی، نخبگان و خدمات پس از ورود.',
    highlights: [
      'بیش از ۲۰ سال سابقه درخشان در هدایت پرونده‌های موفق مهاجرتی',
      'نظارت مستقیم وکلای پایه یک دادگستری مقیم وین، آتن و مونیخ',
      'ارائه قراردادهای حقوقی رسمی با تعهدات و زمان‌بندی شفاف',
    ],
    breadcrumbLabel: 'فهرست خدمات',
    category: 'کاتالوگ خدمات',
  },
  'interactive-map': {
    title: 'نقشه تعاملی پرونده‌های موفق مهاجرت به اروپا | هلدینگ بین‌المللی دیاکو',
    description: 'مشاهده پراکندگی جغرافیایی بیش از ۲۰۰۰ پرونده موفق اقامت اتریش، آلمان، یونان، اسپانیا و هلند؛ تایم‌لاین واقعی صدور ویزا و آمار قبولی سفارتخانه‌ها.',
    canonicalPath: '/interactive-map',
    h1: 'نقشه تعاملی پراکندگی جغرافیایی پرونده‌های موفق مهاجرتی دیاکو در اروپا',
    lead: 'بررسی بصری آمار قبولی ویزا، شهرهای پرطرفدار موکلان دیاکو و مدت‌زمان صدور کارت اقامت در وین، مونیخ، برلین، آتن، مادرید و آمستردام.',
    highlights: [
      'بیش از ۲،۰۰۰ پرونده موفق ثبت‌شده با اسناد رسمی صدور ویزا',
      'میانگین زمان صدور اقامت: ۹۰ تا ۱۲۰ روز در روش‌های تمکن مالی و بلوکارت',
      'تحلیل مستمر رفتار کنسولگری‌ها و آمار صدور روادید در حوزه شنگن',
    ],
    breadcrumbLabel: 'نقشه پرونده‌های موفق',
    category: 'تحلیل آماری',
  },
  'success-cases': {
    title: 'گالری پرونده‌های موفق و ویزاهای صادره اروپا | هلدینگ بین‌المللی دیاکو',
    description: 'مشاهده اسناد و تاییدیه‌های رسمی صدور ویزا و کارت‌های اقامت اتریش (NAG)، بلوکارت آلمان، گلدن ویزای یونان و اقامت تمکن مالی.',
    canonicalPath: '/success-cases',
    h1: 'گالری اسناد و ویزاهای صادره موکلان هلدینگ دیاکو در اتریش، آلمان و شنگن',
    lead: 'شفافیت، اصالت و اعتبار در عمل؛ مرور نمونه کارت‌های اقامت صادرشده و دستاوردهای حقوقی تیم وکلای دیاکو در دفاع از حقوق متقاضیان.',
    highlights: [
      'ثبت قانونی پرونده‌ها در مراجع رسمی MA35 وین، Ausländerbehörde و کانون‌های وکلا',
      'پوشش انواع ویزاها: کارت RWR، بلوکارت، خودحمایتی، ثبت شرکت و گلدن ویزا',
      'حفظ کامل حریم خصوصی موکلان طبق استانداردهای GDPR اتحادیه اروپا',
    ],
    breadcrumbLabel: 'پرونده‌های موفق',
    category: 'پرونده‌های موفق',
  },
  'about-us': {
    title: 'درباره هلدینگ بین‌المللی دیاکو | بیش از ۲۰ سال پیشتازی در مهاجرت اروپا',
    description: 'آشنایی با تاریخچه، مجوزهای رسمی، دفاتر وین، آتن و تهران، تیم وکلای پایه یک و منشور اخلاقی هلدینگ مهاجرتی دیاکو.',
    canonicalPath: '/about-us',
    h1: 'درباره هلدینگ بین‌المللی دیاکو؛ دو دهه پیشتازی در امور اقامت و حقوق بین‌الملل',
    lead: 'تاسیس شده از سال ۲۰۰۴ با هدف ایجاد بستری امن، علمی و بدون واسطه برای مهاجرت ایرانیان؛ همراه با دفاتر ثبتی در اتریش، یونان و ایران.',
    highlights: [
      'دفتر مرکزی وین: Kärntner Ring 5-7, 1010 Wien, Austria',
      'دفتر تهران: ولنجک، بلوار دانشجو، نبش عدالت، پلاک ۱۴',
      'دفتر آتن: Leoforos Poseidonos, Glyfada, Athens, Greece',
      'تیم متشکل از وکلای پایه یک دادگستری اتریش (RAO) و کارشناسان ارشد شنگن',
    ],
    breadcrumbLabel: 'درباره ما',
    category: 'معرفی هلدینگ',
  },
  'contact-us': {
    title: 'تماس با دفاتر هلدینگ بین‌المللی دیاکو در وین، آتن و تهران',
    description: 'اطلاعات تماس، آدرس دفاتر وین (اتریش)، آتن (یونان) و تهران (ایران)، ساعات کاری، رزرو وقت مشاوره حضوری و پشتیبانی واتساپ ۲۴/۷.',
    canonicalPath: '/contact-us',
    h1: 'ارتباط مستقیم با دفاتر رسمی هلدینگ دیاکو در وین، آتن و تهران',
    lead: 'جهت رزرو جلسه مشاوره تخصصی، بررسی مدارک و آغاز فرآیند پرونده مهاجرتی با دفاتر بین‌المللی دیاکو تماس حاصل فرمایید.',
    highlights: [
      'تلفن دفتر تهران: 02191693955 (پاسخگویی ۹:۰۰ الی ۱۹:۰۰)',
      'تلفن دفتر مرکزی وین: 436889763256+ (دسترسی به تیم حقوقی)',
      'پشتیبانی آنلاین واتساپ: 989197340829+ (مشاوره اولیه ۲۴/۷)',
      'امکان برگزاری جلسات مشاوره حضوری یا تصویری امن در پلتفرم اختصاصی',
    ],
    breadcrumbLabel: 'تماس با ما',
    category: 'تماس و مشاوره',
  },
};

/**
 * Metadata resolver for any route or dynamic blog post
 */
export function getPageSeo(urlPath: string): PageSeoInfo {
  const cleanPath = urlPath.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '');

  // 1. Direct match in static registry
  if (STATIC_ROUTES[cleanPath]) {
    return STATIC_ROUTES[cleanPath];
  }

  // 2. Blog post route: /blog/:slug
  if (cleanPath.startsWith('blog/')) {
    const slug = cleanPath.replace(/^blog\//, '');
    const readableTitle = slug
      .replace(/-/g, ' ')
      .replace(/2026/g, '۲۰۲۶')
      .replace(/guide/g, 'راهنمای')
      .replace(/austria/g, 'اتریش')
      .replace(/germany/g, 'آلمان');

    return {
      title: `${readableTitle} | مقالات تخصصی هلدینگ دیاکو ۲۰۲۶`,
      description: `تحلیل حقوقی و بررسی کامل ${readableTitle} بر اساس جدیدترین بخشنامه‌های کنسولی و قوانین اداره اقامت اروپا ۲۰۲۶.`,
      canonicalPath: `/${cleanPath}`,
      h1: `${readableTitle} (بررسی تخصصی قوانین و شرایط حقوقی ۲۰۲۶)`,
      lead: `تحلیل جامع و مستند ضوابط قانونی، پیش‌نیازهای مدارک، زمان‌بندی و تجربیات پرونده‌های موفق با نظارت مستقیم وکلای مقیم دفتر وین هلدینگ بین‌المللی دیاکو.`,
      highlights: [
        'انطباق با جدیدترین اصلاحیه‌های مصوب ۲۰۲۶ اتحادیه اروپا و ادارات مهاجرت',
        'نکات کلیدی پیرامون ترجمه رسمی مدارک، تاییدات دادگستری و وزارت خارجه',
        'استراتژی تخصصی جهت کاهش ریسک رد پرونده در سفارتخانه‌ها و مراجع استانی',
      ],
      legalReference: 'Official European Immigration Directives 2026',
      breadcrumbLabel: readableTitle,
      category: 'مقالات حقوقی',
      ogType: 'article',
    };
  }

  // 3. Fallback for any other valid route in the portal
  const readableName = cleanPath
    .replace(/-/g, ' ')
    .replace(/austria/g, 'اتریش')
    .replace(/germany/g, 'آلمان')
    .replace(/spain/g, 'اسپانیا')
    .replace(/france/g, 'فرانسه')
    .replace(/italy/g, 'ایتالیا')
    .replace(/financial/g, 'تمکن مالی')
    .replace(/blue card/g, 'بلوکارت')
    .replace(/startup/g, 'استارت‌آپ')
    .replace(/jobseeker/g, 'کاریابی')
    .replace(/realestate/g, 'خرید ملک')
    .replace(/academic/g, 'تحصیل');

  return {
    title: `${readableName} | شرایط و خدمات قانونی ۲۰۲۶ | هلدینگ دیاکو`,
    description: `راهنمای حقوقی و تخصصی ${readableName} در سال ۲۰۲۶ با همراهی وکلای رسمی هلدینگ مهاجرتی دیاکو. بررسی مدارک و ضوابط کنسولی.`,
    canonicalPath: `/${cleanPath}`,
    h1: `${readableName} در سال ۲۰۲۶؛ راهنمای جامع شرایط و مدارک قانونی`,
    lead: `بررسی شرایط، پیش‌نیازها و مراحل اجرایی اخذ اقامت و ویزای ${readableName} تحت نظارت مستقیم تیم حقوقی هلدینگ دیاکو در اروپا.`,
    highlights: [
      'بررسی و اعتبارسنجی اولیه شرایط متقاضی بر اساس قوانین جاری شنگن',
      'تنظیم لایحه رسمی حقوقی متناسب با استانداردهای سفارت مقصد',
      'پشتیبانی کامل در تمامی مراحل از ثبت نوبت تا استقرار نهایی در مقصد',
    ],
    legalReference: 'Schengen Area Regulations & National Immigration Laws',
    breadcrumbLabel: readableName,
    category: 'خدمات مهاجرتی دیاکو',
    ogType: 'website',
  };
}

/**
 * Injects dynamic SEO metadata and semantic initial HTML into index.html
 */
export function injectSeoToHtml(rawHtml: string, urlPath: string): string {
  const seo = getPageSeo(urlPath);
  const canonicalUrl = `${BASE_URL}${seo.canonicalPath === '/' ? '/' : seo.canonicalPath}`;

  let html = rawHtml;

  // 1. Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);

  // 2. Replace meta description
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${seo.description}" />`
    );
  }

  // 3. Replace canonical link
  if (html.includes('rel="canonical"')) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
  }

  // 4. Replace OpenGraph Tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${seo.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${seo.description}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  if (seo.ogType) {
    html = html.replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:type" content="${seo.ogType}" />`
    );
  }

  // 5. Replace Twitter Tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${seo.title}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${seo.description}" />`
  );

  // 6. Inject Route-Specific Breadcrumb Schema
  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'هلدینگ مهاجرتی دیاکو',
        item: `${BASE_URL}/`,
      },
      ...(seo.canonicalPath !== '/'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: seo.category,
              item: `${BASE_URL}/services`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: seo.breadcrumbLabel,
              item: canonicalUrl,
            },
          ]
        : []),
    ],
  });

  const schemaTag = `<script type="application/ld+json" id="route-breadcrumb-schema">${breadcrumbJson}</script>`;
  html = html.replace('</head>', `${schemaTag}\n  </head>`);

  // 7. Inject Semantic Initial HTML snapshot inside <div id="root"></div>
  // Ensures Googlebot, Bingbot, and AI crawlers never see an empty page!
  const initialHtmlSnapshot = `
    <div class="server-seo-shell" style="min-height: 100vh; background-color: #0b2933; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; direction: rtl; padding: 2rem 1.5rem;">
      <div style="max-width: 1020px; margin: 0 auto;">
        <!-- نوار ناوبری و Breadcrumbs برای کراولرها -->
        <nav aria-label="راهنمای مسیر" style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <a href="/" style="color: #cbd5e1; text-decoration: none;">هلدینگ دیاکو</a>
          <span>›</span>
          <a href="/services" style="color: #cbd5e1; text-decoration: none;">${seo.category}</a>
          ${seo.canonicalPath !== '/' ? `<span>›</span><span style="color: #f5a623; font-weight: 700;">${seo.breadcrumbLabel}</span>` : ''}
        </nav>

        <!-- سربرگ اصلی صفحه -->
        <header style="margin-bottom: 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 1.5rem;">
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(245, 166, 35, 0.15); color: #f5a623; border: 1px solid rgba(245, 166, 35, 0.3); border-radius: 9999px; padding: 0.25rem 0.85rem; font-size: 0.75rem; font-weight: 700; margin-bottom: 1rem;">
            <span>⚖️</span>
            <span>هلدینگ بین‌المللی دیاکو | دفاتر رسمی در وین، آتن و تهران</span>
          </div>
          <h1 style="font-size: 1.85rem; font-weight: 900; line-height: 1.35; color: #ffffff; margin: 0 0 1rem 0;">${seo.h1}</h1>
          <p style="font-size: 1.05rem; line-height: 1.85; color: #cbd5e1; margin: 0; text-align: justify;">${seo.lead}</p>
        </header>

        <!-- محتوای متنی اصلی و شرایط پرونده -->
        <main>
          <section style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1.25rem; padding: 1.75rem; margin-bottom: 2rem;">
            <h2 style="font-size: 1.15rem; font-weight: 800; color: #f5a623; margin-top: 0; margin-bottom: 1rem;">نکات کلیدی، پیش‌نیازها و شرایط حقوقی مصوب ۲۰۲۶:</h2>
            <ul style="padding-right: 1.25rem; margin: 0; line-height: 2.1; color: #e2e8f0; font-size: 0.95rem;">
              ${seo.highlights.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </section>

          ${
            seo.legalReference
              ? `<section style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 1rem; padding: 1rem 1.25rem; margin-bottom: 2rem; font-size: 0.875rem; color: #a7f3d0;">
                  <strong>مبنا و استناد قانونی:</strong> ${seo.legalReference}
                </section>`
              : ''
          }

          <!-- راهنمای دسترسی و تماس -->
          <footer style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; font-size: 0.85rem; color: #94a3b8;">
            <div>
              <span>دفتر تهران: </span>
              <a href="tel:02191693955" style="color: #f5a623; text-decoration: none; font-weight: 700;">02191693955</a>
              <span style="margin: 0 0.5rem;">|</span>
              <span>دفتر وین: </span>
              <a href="tel:+436889763256" dir="ltr" style="color: #34d399; text-decoration: none; font-weight: 700;">+43 688 9763256</a>
            </div>
            <div>
              <a href="https://www.dia-co.ir" style="color: #cbd5e1; text-decoration: none;">www.dia-co.ir</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  `;

  // Inject initial HTML inside <div id="root">
  html = html.replace('<div id="root"></div>', `<div id="root">${initialHtmlSnapshot}</div>`);

  return html;
}
