export const HERO_STATS = [
  { value: '+۱۰ سال', label: 'سابقه درخشان در اروپا', note: 'تخصص متمرکز بر اتریش و آلمان' },
  { value: '+۲۰۰۰', label: 'پرونده اقامتی موفق', note: 'درصد قبولی حداکثری و شفاف' },
  { value: '+۳۵', label: 'وکیل و مشاور بین‌المللی', note: 'دفاتر مستقیم در وین، آتن و تهران' },
  { value: '+۱۰۰۰', label: 'ساعت مشاوره سالانه', note: 'پاسخ به بیش از ۸۵۰۰ متقاضی' },
];

export interface HeroFeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const HERO_FEATURE_CARDS: HeroFeatureCard[] = [
  {
    id: 'smart-assessment',
    title: 'ارزیابی هوشمند',
    description: 'تحلیل شرایط شما و پیشنهاد بهترین مسیر مهاجرت',
    icon: '🧠',
  },
  {
    id: 'cost-viz',
    title: 'محاسبه‌گر هزینه‌های مهاجرت',
    description: 'تخمین دقیق هزینه‌های مهاجرت به کشورهای مختلف',
    icon: '🧮',
  },
  {
    id: 'interactive-map',
    title: 'نقشه تعاملی',
    description: 'اطلاعات مهاجرتی کشورها به‌صورت گرافیکی',
    icon: '🗺️',
  },
  {
    id: 'doc-check',
    title: 'بررسی هوشمند مدارک',
    description: 'ارزیابی مدارک مورد نیاز برای مهاجرت',
    icon: '🎯',
  },
  {
    id: 'timeline',
    title: 'تایم‌لاین و برنامه‌ریز',
    description: 'برنامه‌ریزی زمانی مراحل مهاجرت',
    icon: '⏱️',
  },
  {
    id: 'method-comp',
    title: 'مقایسه‌گر روش‌های مهاجرتی',
    description: 'مقایسه شرایط و مزایای روش‌های مهاجرت',
    icon: '🔀',
  },
  {
    id: 'visa-comp',
    title: 'مقایسه‌گر ویزا',
    description: 'مقایسه انواع ویزاها و شرایط آن‌ها',
    icon: '📄',
  },
  {
    id: 'edu-comp',
    title: 'مقایسه‌گر تحصیل',
    description: 'مقایسه شرایط تحصیلی در کشورهای مختلف',
    icon: '🎓',
  },
  {
    id: 'job-search',
    title: 'جستجوی شغل',
    description: 'جستجوی مشاغل موردنیاز در کشورهای مختلف',
    icon: '💼',
  },
  {
    id: 'country-guide',
    title: 'راهنمای کشورها',
    description: 'اطلاعات کامل درباره شرایط زندگی و کار',
    icon: '📍',
  },
  {
    id: 'visa-news',
    title: 'اخبار ویزا و مهاجرت',
    description: 'آخرین تغییرات قوانین ویزا و مهاجرت',
    icon: '📰',
  },
  {
    id: 'online-consult',
    title: 'مشاوره آنلاین',
    description: 'مشاوره تخصصی با کارشناسان مجرب',
    icon: '💬',
  },
];

export interface AssessmentFormItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const ASSESSMENT_FORMS: AssessmentFormItem[] = [
  {
    id: 'financial-visa',
    title: 'اقامت تمکن مالی (خودحمایتی)',
    description: 'ویژه افراد دارای دارایی و درآمد در ایران بدون الزام به کار و سرمایه‌گذاری پرریسک در اروپا',
    icon: '🏛️',
  },
  {
    id: 'skilled-visa',
    title: 'کارت قرمز-سفید-قرمز و کارت آبی',
    description: 'ارزیابی امتیازات سنی، سابقه کار، مدرک تحصیلی و زبان برای اقامت کاری دائمی',
    icon: '💼',
  },
  {
    id: 'study-visa',
    title: 'پذیرش و اقامت تحصیلی',
    description: 'تحصیل در دانشگاه‌های رنکینگ برتر اتریش (دانشگاه وین، TU Wien) و آلمان با بورسیه',
    icon: '🎓',
  },
  {
    id: 'golden-visa',
    title: 'سرمایه‌گذاری و گلدن ویزا',
    description: 'اخذ پاسپورت و کارت اقامت شینگن با تملک دارایی ملکی در یونان، اسپانیا و پرتغال',
    icon: '👑',
  },
  {
    id: 'startup-visa',
    title: 'استارت‌آپ و کارآفرینی',
    description: 'بررسی بیزینس پلن و ثبت شرکت با جذب حمایت انکوباتورهای دولتی و خصوصی اتریش',
    icon: '🚀',
  },
  {
    id: 'artists-visa',
    title: 'ویزای اقامت هنرمندان',
    description: 'مختص صاحبان جوایز، آثار هنری، موسیقی‌دانان و نویسندگان دارای کارنامه حرفه‌ای',
    icon: '🎨',
  },
];

export interface VisaSuccessCase {
  id: string;
  flag: string;
  title: string;
  city: string;
  country: string;
  year: string;
  type: string;
}

export const VISA_SUCCESS_CASES: VisaSuccessCase[] = [
  { id: 'at-1', flag: '🇦🇹', title: 'اقامت تمکن مالی وین', city: 'وین (Wien)', country: 'اتریش', year: '۲۰۲۵', type: 'Niederlassungsbewilligung' },
  { id: 'at-2', flag: '🇦🇹', title: 'کارت قرمز-سفید-قرمز مهندسی IT', city: 'وین (Wien)', country: 'اتریش', year: '۲۰۲۵', type: 'Rot-Weiß-Rot – Karte' },
  { id: 'at-3', flag: '🇦🇹', title: 'اقامت تحصیلی دانشگاه دولتی وین', city: 'وین (Wien)', country: 'اتریش', year: '۲۰۲۴', type: 'Aufenthaltsbewilligung Student' },
  { id: 'at-4', flag: '🇦🇹', title: 'اقامت تمکن مالی خانوادگی سالزبورگ', city: 'سالزبورگ (Salzburg)', country: 'اتریش', year: '۲۰۲۴', type: 'Niederlassungsbewilligung' },
  { id: 'de-1', flag: '🇩🇪', title: 'کارت آبی (Blue Card) برلین', city: 'برلین (Berlin)', country: 'آلمان', year: '۲۰۲۵', type: 'Blaue Karte EU' },
  { id: 'de-2', flag: '🇩🇪', title: 'کارت شانس کاریابی مونیخ', city: 'مونیخ (München)', country: 'آلمان', year: '۲۰۲۵', type: 'Chancenkarte' },
  { id: 'de-3', flag: '🇩🇪', title: 'ویزای پزشکان و کادر درمان (Approbation)', city: 'هامبورگ (Hamburg)', country: 'آلمان', year: '۲۰۲۴', type: 'Fachkräfteverfahren' },
  { id: 'es-1', flag: '🇪🇸', title: 'اقامت غیرانتفاعی مادرید', city: 'مادرید (Madrid)', country: 'اسپانیا', year: '۲۰۲۵', type: 'Residencia No Lucrativa' },
  { id: 'es-2', flag: '🇪🇸', title: 'گلدن ویزای ملکی بارسلونا', city: 'بارسلونا (Barcelona)', country: 'اسپانیا', year: '۲۰۲۴', type: 'Golden Visa Inversor' },
  { id: 'gr-1', flag: '🇬🇷', title: 'گلدن ویزای سرمایه‌گذاری آتن', city: 'آتن (Athens)', country: 'یونان', year: '۲۰۲۵', type: 'Permanent Residence Investor' },
  { id: 'gr-2', flag: '🇬🇷', title: 'اقامت تمکن مالی مستقل (FIP)', city: 'گلیفادا (Glyfada)', country: 'یونان', year: '۲۰۲۴', type: 'Financially Independent Person' },
  { id: 'fr-1', flag: '🇫🇷', title: 'پاسپورت تلنت پاریس', city: 'پاریس (Paris)', country: 'فرانسه', year: '۲۰۲۴', type: 'Passeport Talent' },
];

export interface StoryCase {
  id: string;
  name: string;
  country: string;
  flag: string;
  tag: string;
  category: string;
  year: string;
  duration: string;
  story: string;
  advice: string;
}

export const SUCCESS_STORIES: StoryCase[] = [
  {
    id: 'story-1',
    name: 'مهندس آرش طاهری',
    country: 'اتریش',
    flag: '🇦🇹',
    tag: 'کارت قرمز-سفید-قرمز (مهندس صنایع)',
    category: 'work',
    year: '۱۴۰۳',
    duration: '۵ ماه',
    story: 'با سابقه کاری و مدرک ارشد دانشگاه تهران در رشته صنایع اقدام کردم. ارزیابی دقیق امتیازات و ترجمه مدارک با تاییدیه ZAB و تاییدیه دادگستری وین توسط تیم دیاکو باعث شد جاب آفر رسمی را در کمتر از ۴ ماه از یک شرکت اتریشی در لینز دریافت کنم.',
    advice: 'پیشنهاد می‌کنم حتما مدارکتان قبل از هر اقدامی طبق استاندارد دقیق اتریش معادل‌سازی (Apostille) شود و رزومه مطابق فرمت رسمی یوروپَس تنظیم گردد.',
  },
  {
    id: 'story-2',
    name: 'دکتر علیرضا و سمیرا ناصری',
    country: 'اتریش',
    flag: '🇦🇹',
    tag: 'اقامت تمکن مالی خانوادگی (وین)',
    category: 'financial',
    year: '۱۴۰۳',
    duration: '۴ ماه',
    story: 'سهمیه تمکن مالی اتریش بسیار محدود است و ثبت پرونده در روز اول کاری سال میلادی نیاز به دقت ثانیه‌ای دارد. وکلای اتریشی هلدینگ دیاکو در وین از پیش پرونده ما را بستند و در اولین ساعت ظرفیت را ثبت کردند و کارت اقامت یک‌ساله برای خودم، همسرم و دو فرزندم صادر شد.',
    advice: 'اثبات منشاء درآمد ماهانه غیروابسته به کار و گردش ۶ ماهه حساب بانکی شفاف، مهم‌ترین برگ برنده شما در پرونده تمکن مالی است.',
  },
  {
    id: 'story-3',
    name: 'مهندس نوید سلیمانی',
    country: 'آلمان',
    flag: '🇩🇪',
    tag: 'بلوکارت توسعه‌دهنده نرم‌افزار (برلین)',
    category: 'work',
    year: '۱۴۰۳',
    duration: '۳ ماه',
    story: 'با کاهش حداقل کف حقوق بلوکارت آلمان، دیاکو به من کمک کرد قرارداد کاری با یک شرکت تکنولوژی در برلین منعقد کنم و در کمترین زمان ویزای کار و اقامت اروپا را اخذ کنم.',
    advice: 'آشنایی حتی در سطح مقدماتی به زبان آلمانی (A2 یا B1) در کنار زبان انگلیسی شانس شما را در مصاحبه‌ها چندین برابر می‌کند.',
  },
  {
    id: 'story-4',
    name: 'سرکار خانم دکتر کریمی',
    country: 'یونان',
    flag: '🇬🇷',
    tag: 'گلدن ویزای ملکی (آتن)',
    category: 'golden-visa',
    year: '۱۴۰۲',
    duration: '۲.۵ ماه',
    story: 'با خرید آپارتمانی شیک در منطقه ساحلی گلیفادا با نظارت دفتر دیاکو در آتن، کارت اقامت ۵ ساله قابل تمدید برای خانواده‌ام صادر شد بدون اینکه نیاز باشد اقامت دائم در خاک یونان داشته باشیم.',
    advice: 'از نظارت وکیل مستقل محلی بر پاک بودن سند ملک و فرایند انتقال ارز از صرافی معتبر اطمینان حاصل کنید.',
  },
  {
    id: 'story-5',
    name: 'مریم حسینی',
    country: 'اتریش',
    flag: '🇦🇹',
    tag: 'پذیرش تحصیلی دانشگاه وین (Universität Wien)',
    category: 'study',
    year: '۱۴۰۳',
    duration: '۴.۵ ماه',
    story: 'با راهنمایی دپارتمان پذیرش تحصیلی دیاکو، پذیرش قطعی در مقطع کارشناسی ارشد بیوتکنولوژی از دانشگاه وین اخذ شد و ویزای دانشجویی تایپ D بدون هیچ‌گونه نقص مدرک در سفارت اتریش صادر گردید.',
    advice: 'ارائه انگیزه‌نامه (SOP) علمی منسجم و رزومه استاندارد تحصیلی، کلید اصلی جلب نظر کمیته پذیرش دانشگاه‌های اتریش است.',
  },
  {
    id: 'story-6',
    name: 'سامان شریفی',
    country: 'اسپانیا',
    flag: '🇪🇸',
    tag: 'اقامت خودحمایتی و دیجیتال نومد',
    category: 'financial',
    year: '۱۴۰۲',
    duration: '۳.۵ ماه',
    story: 'با تجمیع درآمدهای ارزی مستقل و اثبات تمکن بانکی در اسپانیا، توانستم به همراه همسرم کارت اقامت رسمی بارسلونا را با نظارت تیم دیاکو دریافت کنم و فرزندم اکنون در مدرسه بین‌المللی تحصیل می‌کند.',
    advice: 'ترجمه رسمی کلیه مدارک شغلی و بانکی به زبان اسپانیایی همراه با تاییدیه‌های کامل وزارت دادگستری ضامن صدور سریع ویزا است.',
  },
];

export const STORY_TABS = [
  { id: 'all', label: 'همه داستان‌ها' },
  { id: 'work', label: 'مهاجرت کاری و کارت آبی' },
  { id: 'financial', label: 'تمکن مالی (خودحمایتی)' },
  { id: 'golden-visa', label: 'سرمایه‌گذاری و خرید ملک' },
  { id: 'study', label: 'پذیرش و اقامت تحصیلی' },
];

export const CONTACT_DATA = {
  phones: [
    { label: 'مرکز تماس مرکزی تهران', number: '021 9169 3955', tel: '+982191693955' },
    { label: 'پشتیبانی فوری واتس‌اپ', number: '+98 919 734 0829', tel: '+989197340829' },
    { label: 'دفتر اتریش (وین)', number: '+43 688 976 3256', tel: '+436889763256' },
  ],
  offices: [
    {
      country: 'ایران',
      city: 'تهران',
      address: 'ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴',
    },
    {
      country: 'اتریش',
      city: 'وین',
      address: 'Ausstellungsstraße 50/2.OG, 1020 Wien, Austria',
    },
    {
      country: 'یونان',
      city: 'آتن',
      address: 'Grigoriou Lampraki 58, Glyfada, 166 75, Greece',
    },
  ],
  websites: [
    { name: 'www.dia-co.ir', url: 'https://www.dia-co.ir' },
    { name: 'Otrish-Iran.ir', url: 'https://otrish-iran.ir' },
    { name: 'Alman-Iran.ir', url: 'https://alman-iran.ir' },
    { name: 'Spain-Iran.ir', url: 'https://spain-iran.ir' },
    { name: 'UKIran.ir', url: 'https://ukiran.ir' },
    { name: 'HU-IR.ir', url: 'https://hu-ir.ir' },
    { name: 'Greece-Iran.ir', url: 'https://greece-iran.ir' },
    { name: 'Iran-Portugal.ir', url: 'https://iran-portugal.ir' },
  ],
  socials: [
    { name: 'اینستاگرام رسمی', url: 'https://instagram.com/diaco.holding', icon: 'instagram' },
    { name: 'کانال تلگرام دیاکو', url: 'https://t.me/diaco_holding', icon: 'telegram' },
    { name: 'مشاوره واتس‌اپ ایران', url: 'https://wa.me/989197340829', icon: 'whatsapp' },
    { name: 'دفتر وکالت وین واتس‌اپ', url: 'https://wa.me/436889763256', icon: 'whatsapp' },
  ],
};

/* ============================================================
   خدمات مهاجرتی دیاکو (۱۲ دسته اصلی بر اساس استانداردهای رسمی دیاکو)
   عنوان اصلی: «خدمات مهاجرتی دیاکو»
   شعار: «دیاکو؛ همراه شما در تمام مراحل اخذ ویزا، پذیرش و اقامت»
   ============================================================ */

export interface DiacoServiceCategory {
  id: string;
  categoryKey: 'bluecard' | 'medical' | 'courses' | 'startup' | 'business' | 'citizenship' | 'artist' | 'nomad' | 'personal' | 'work' | 'realestate' | 'education';
  title: string;
  categoryName: string;
  description: string;
  countries: string[];
  subServices: { title: string; link?: string; tag?: string }[];
  icon: string;
  badge: string;
  accentColor: string;
}

export const DIACO_SERVICES: DiacoServiceCategory[] = [
  {
    id: 'srv-bluecard',
    categoryKey: 'bluecard',
    title: 'بلو کارت اتحادیه اروپا (Blue Card)',
    categoryName: 'bluecard',
    badge: 'مجوز کار تخصصی با حقوق بالا',
    icon: '🇪🇺',
    accentColor: '#38bdf8',
    description: 'مجوز کار و اقامت برای متخصصان با حقوق بالا در کشورهای برتر اروپایی.',
    countries: ['آلمان', 'اسپانیا', 'ایتالیا', 'اتریش', 'مجارستان'],
    subServices: [
      { title: 'بلوکارت آلمان', tag: 'کف حقوق تسهیل‌شده ۲۰۲۴-۲۰۲۶' },
      { title: 'بلوکارت اسپانیا', tag: 'قوانین تسریع‌شده' },
      { title: 'بلوکارت ایتالیا', tag: 'پوشش مشاغل مهندسی و مالی' },
      { title: 'بلوکارت اتریش ۲۰۲۴', tag: 'مسیر مستقیم RWR Plus' },
      { title: 'بلوکارت مجارستان', tag: 'اقتصاد صنعتی رو به رشد' },
    ],
  },
  {
    id: 'srv-medical',
    categoryKey: 'medical',
    title: 'مهاجرت کادر درمان',
    categoryName: 'medical',
    badge: 'ویژه پزشکان، دندانپزشکان و پرستاران',
    icon: '🩺',
    accentColor: '#10b981',
    description: 'فرصت‌های کار و زندگی برای پزشکان، پرستاران و متخصصان کادر درمان در کشورهای پیشرفته اروپایی.',
    countries: ['آلمان', 'اتریش', 'فنلاند', 'دانمارک'],
    subServices: [
      { title: 'مهاجرت کادر درمان به آلمان', tag: 'اخذ Approbation' },
      { title: 'مهاجرت پرستاران به اتریش', tag: 'معادل‌سازی Nostrifizierung' },
      { title: 'مهاجرت پزشکان به فنلاند', tag: 'سیستم سلامت مدرن اسکاندیناوی' },
      { title: 'فرصت‌های ویزا و مهاجرت دانمارک', tag: 'برنامه ویژه کادر پزشکی' },
    ],
  },
  {
    id: 'srv-courses',
    categoryKey: 'courses',
    title: 'آوسبیلدونگ و دوره‌های زبان',
    categoryName: 'courses',
    badge: 'کارآموزی حقوق‌بگیر و کالج‌های زبان',
    icon: '🗣️',
    accentColor: '#f5a623',
    description: 'ورود به بازار کار از طریق آموزش فنی و حرفه‌ای (آلمان) یا کالج‌های زبان.',
    countries: ['آلمان', 'اسپانیا', 'فرانسه', 'هلند', 'مجارستان', 'دانمارک'],
    subServices: [
      { title: 'آوسبیلدونگ آلمان (شرایط و مدارک)', tag: 'حقوق ماهانه حین تحصیل' },
      { title: 'دوره زبان اسپانیایی در اسپانیا', tag: 'اقامت تحصیلی زبان' },
      { title: 'دوره زبان در فرانسه ۲۰۲۵', tag: 'کالج‌های معتبر پاریس و لیون' },
      { title: 'دوره‌های زبان انگلیسی در هلند', tag: 'محیط ۱۰۰٪ بین‌المللی' },
      { title: 'کالج زبان در مجارستان ۲۰۲۴', tag: 'شهریه مقرون‌به‌صرفه' },
      { title: 'کالج‌های مجارستان', tag: 'دوره‌های پیش‌پزشکی و مهندسی' },
      { title: 'مهاجرت به دانمارک از طریق زبان', tag: 'آمادگی برای ورود به اسکاندیناوی' },
    ],
  },
  {
    id: 'srv-startup',
    categoryKey: 'startup',
    title: 'ویزای استارت‌آپ (Startup Visa)',
    categoryName: 'startup',
    badge: 'نوآوری جهانی و کارآفرینی تیمی',
    icon: '🚀',
    accentColor: '#8b5cf6',
    description: 'اجرای ایده‌های نوآورانه در مقیاس جهانی و اخذ اقامت برای کارآفرینان و تیم‌های استارت‌آپی.',
    countries: ['کانادا', 'اتریش', 'آلمان', 'فرانسه', 'هلند', 'فنلاند', 'دانمارک'],
    subServices: [
      { title: 'استارت‌آپ کانادا', tag: 'اقامت دائم مستقیم (PR)' },
      { title: 'استارت‌آپ اتریش', tag: 'حمایت انکوباتورهای رسمی وین' },
      { title: 'استارت‌آپ آلمان', tag: 'اکوسیستم هاب فناوری برلین' },
      { title: 'ویزای استارت‌آپ فرانسه', tag: 'French Tech Visa' },
      { title: 'استارت‌آپ هلند', tag: 'ویزای ۱ ساله تسهیل‌کننده' },
      { title: 'ویزای استارت‌آپ فنلاند', tag: 'Business Finland' },
      { title: 'ویزای استارت‌آپ دانمارک', tag: 'برنامه Startup Denmark' },
    ],
  },
  {
    id: 'srv-business',
    categoryKey: 'business',
    title: 'ثبت شرکت و خوداشتغالی',
    categoryName: 'business',
    badge: 'توسعه تجارت بین‌الملل و سرمایه‌گذاری فعال',
    icon: '🏢',
    accentColor: '#0ea5e9',
    description: 'توسعه بیزنس بین‌المللی با ثبت شرکت رسمی و اخذ اقامت از طریق کارآفرینی و سرمایه‌گذاری فعال.',
    countries: ['امارات', 'اتریش', 'هلند', 'فرانسه', 'ترکیه', 'یونان', 'لهستان', 'پرتغال', 'اسلوواکی', 'مجارستان', 'لتونی'],
    subServices: [
      { title: 'ثبت شرکت و اقامت امارات (دبی)', tag: 'ویزای طلایی و تجاری دبی' },
      { title: 'اقامت اتریش از طریق سرمایه‌گذاری', tag: 'شرکت با مسئولیت محدود GmbH' },
      { title: 'ثبت شرکت در هلند', tag: 'موقعیت لجستیکی برتر اروپا' },
      { title: 'ثبت شرکت در فرانسه', tag: 'اقامت تجاری و بازرگانی' },
      { title: 'ثبت شرکت در ترکیه', tag: 'افتتاح حساب بانکی بین‌المللی' },
      { title: 'ثبت شرکت در یونان', tag: 'پل ارتباطی تجارت حوزه مدیترانه' },
      { title: 'ثبت شرکت در لهستان', tag: 'مالیات بهینه و دسترسی به بازار شرق اروپا' },
      { title: 'ثبت شرکت در پرتغال', tag: 'استفاده از مزایای D2' },
      { title: 'اقامت اسلوواکی با ثبت شرکت', tag: 'کم‌هزینه‌ترین ثبت شرکت حوزه شینگن' },
      { title: 'ثبت شرکت در مجارستان', tag: 'نرخ مالیات بر درآمد ۹ درصدی' },
      { title: 'مهاجرت به لتونی با ثبت شرکت', tag: 'کارت اقامت اقتصادی حوزه بالتیک' },
    ],
  },
  {
    id: 'srv-citizenship',
    categoryKey: 'citizenship',
    title: 'شهروندی و پاسپورت دوم',
    categoryName: 'citizenship',
    badge: 'تابعیت قانونی و آزادی سفر بدون ویزا',
    icon: '🛂',
    accentColor: '#e11d48',
    description: 'کسب تابعیت و دریافت پاسپورت قدرتمند از طریق سرمایه‌گذاری یا اقامت طولانی‌مدت.',
    countries: ['ترکیه', 'دومینیکا', 'صربستان', 'سائوتومه و پرینسیپ'],
    subServices: [
      { title: 'اخذ شهروندی و پاسپورت ترکیه', tag: 'خرید ملک ۴۰۰ هزار دلاری' },
      { title: 'راهنمای جامع شهروندی دومینیکا', tag: 'سفر به ۱۴۰+ کشور بدون ویزا' },
      { title: 'شهروندی و پاسپورت صربستان', tag: 'فرصت سرمایه‌گذاری در قلب بالکان' },
      { title: 'شهروندی سائوتومه و پرینسیپ', tag: 'برنامه تابعیت اقتصادی ویژه' },
    ],
  },
  {
    id: 'srv-artist',
    categoryKey: 'artist',
    title: 'ویزای هنرمندی و ویزای تالنت',
    categoryName: 'artist',
    badge: 'ویژه هنرمندان، ورزشکاران و نخبگان',
    icon: '🎨',
    accentColor: '#ec4899',
    description: 'مسیری ویژه برای هنرمندان، ورزشکاران و نخبگان با سوابق درخشان حرفه‌ای.',
    countries: ['اتریش', 'آلمان', 'فرانسه', 'بلژیک', 'اسپانیا'],
    subServices: [
      { title: 'اقامت هنرمندی اتریش ۲۰۲۶', tag: 'Künstleraufenthalt وین' },
      { title: 'فریلنسری هنرمندان برلین', tag: 'ویزای فریلنسر فرهنگی' },
      { title: 'ویزای تالنت فرانسه', tag: 'Passeport Talent نخبگان' },
      { title: 'کارت هنرمندی بلژیک', tag: 'مجوز اقامت خلاقانه' },
      { title: 'هنرمندان و اجراکنندگان اسپانیا', tag: 'مجوز اقامت تخصصی فرهنگی' },
    ],
  },
  {
    id: 'srv-nomad',
    categoryKey: 'nomad',
    title: 'ویزای دیجیتال نوماد و فریلنسر',
    categoryName: 'nomad',
    badge: 'کار از راه دور برای متخصصان IT و فریلنسرها',
    icon: '💻',
    accentColor: '#14b8a6',
    description: 'کار از راه دور در کشورهای مختلف؛ مناسب متخصصان IT، طراحان و فریلنسرها.',
    countries: ['اسپانیا', 'مجارستان', 'کرواسی', 'امارات', 'آلمان', 'فنلاند'],
    subServices: [
      { title: 'دیجیتال نوماد اسپانیا', tag: 'معافیت‌های مالیاتی جذاب بکهام' },
      { title: 'دیجیتال نوماد مجارستان', tag: 'White Card بوداپست' },
      { title: 'دیجیتال نوماد کرواسی', tag: 'اقامت ۱ ساله ساحلی اروپا' },
      { title: 'دیجیتال نوماد امارات', tag: 'ویزای کار از راه دور دبی' },
      { title: 'فریلنسری آلمان', tag: 'Freiberufler آلمان' },
      { title: 'اقامت خوداشتغالی فنلاند', tag: 'زندگی در نوآورترین کشور اسکاندیناوی' },
    ],
  },
  {
    id: 'srv-personal',
    categoryKey: 'personal',
    title: 'تمکن مالی (خودحمایتی)',
    categoryName: 'personal',
    badge: 'اقامت بدون نیاز به کار با اثبات درآمد و دارایی',
    icon: '🏰',
    accentColor: '#d97706',
    description: 'اقامت اروپا بدون نیاز به کار، تنها با اثبات دارایی و درآمد.',
    countries: ['اتریش', 'اسپانیا', 'فرانسه', 'یونان', 'ایتالیا'],
    subServices: [
      { title: 'تمکن مالی اتریش', tag: 'سهمیه اختصاصی اول سال وین' },
      { title: 'تمکن مالی اسپانیا ۲۰۲۵', tag: 'شاخص IPREM و اثبات درآمد' },
      { title: 'تمکن مالی فرانسه', tag: 'اقامت بازدیدکننده با اثبات تمکن' },
    ],
  },
  {
    id: 'srv-work',
    categoryKey: 'work',
    title: 'ویزای جستجوی کار (Job Seeker)',
    categoryName: 'work',
    badge: 'ورود مستقیم به اروپا جهت استخدام رسمی',
    icon: '🔍',
    accentColor: '#059669',
    description: 'ورود به اروپا برای یافتن شغل متناسب با تخصص و تجربه کاری.',
    countries: ['آلمان', 'نروژ', 'دانمارک', 'اتریش', 'پرتغال'],
    subServices: [
      { title: 'ویزای جستجوی کار آلمان (شانس کارت)', tag: 'Chancenkarte بر مبنای امتیاز' },
      { title: 'ویزای جستجوی کار نروژ', tag: 'اقامت ۶ ماهه کاریابی اسکاندیناوی' },
      { title: 'ویزای جستجوی کار دانمارک', tag: 'Establishment Card' },
      { title: 'ویزای جستجوی کار اتریش', tag: 'ویزای ۶ ماهه متقاضیان با صلاحیت بسیار بالا' },
      { title: 'ویزای جستجوی کار پرتغال', tag: 'ورود ۱۲۰ روزه قابل تمدید کاریابی' },
    ],
  },
  {
    id: 'srv-realestate',
    categoryKey: 'realestate',
    title: 'خرید ملک و ویزای طلایی',
    categoryName: 'realestate',
    badge: 'سرمایه‌گذاری ملکی و اخذ اقامت دائم Golden Visa',
    icon: '🏡',
    accentColor: '#ea580c',
    description: 'سرمایه‌گذاری با خرید ملک و اخذ اقامت دائم (Golden Visa) در کشورهای شینگن و ترکیه.',
    countries: ['اتریش', 'ترکیه', 'فرانسه', 'مجارستان', 'یونان', 'لتونی', 'اسلوواکی'],
    subServices: [
      { title: 'خرید ملک در اتریش', tag: 'مشاوره خرید املاک وین و گراتس' },
      { title: 'خرید ملک در ترکیه', tag: 'شهروندی مستقیم با ۴۰۰،۰۰۰ دلار' },
      { title: 'خرید ملک در فرانسه', tag: 'سرمایه‌گذاری در املاک پاریس و نیس' },
      { title: 'خرید ملک در مجارستان', tag: 'گلدن ویزای جدید مجارستان (Guest Investor)' },
      { title: 'اقامت یونان با خرید ملک ۲۰۲۵', tag: 'گلدن ویزای ۲۵۰ تا ۸۰۰ هزار یورویی' },
      { title: 'خرید ملک در لتونی', tag: 'اقامت ۵ ساله شینگن' },
      { title: 'خرید ملک در اسلوواکی', tag: 'مالکیت قطعی با بازدهی پایدار' },
    ],
  },
  {
    id: 'srv-education',
    categoryKey: 'education',
    title: 'تحصیل در دانشگاه (Academic)',
    categoryName: 'education',
    badge: 'پذیرش رسمی از مقطع کارشناسی تا دکتری',
    icon: '🎓',
    accentColor: '#2563eb',
    description: 'اخذ پذیرش و ویزای تحصیلی در تمامی مقاطع از دانشگاه‌های جهان.',
    countries: ['کانادا', 'اسپانیا', 'بریتانیا', 'اتریش', 'هلند', 'مجارستان'],
    subServices: [
      { title: 'تحصیل در اسپانیا (راهنمای کامل)', tag: 'پذیرش دانشگاه‌های دولتی' },
      { title: 'ویزای تحصیلی بریتانیا (UK Student)', tag: 'CAS و بورسیه‌های انگلستان' },
      { title: 'مهاجرت تحصیلی به اتریش ۲۰۲۴', tag: 'شهریه اقتصادی ترمی ۷۴۰ یورو' },
      { title: 'ویزای تحصیلی اتریش (راهنمای جامع)', tag: 'دانشگاه وین، TU و علوم پزشکی' },
      { title: 'مهاجرت تحصیلی به هلند', tag: 'تحصیل به زبان انگلیسی در اروپا' },
      { title: 'تحصیل در مجارستان', tag: 'دوره‌های پزشکی سملوایز و مهندسی BME' },
      { title: 'تحصیل در کانادا ۲۰۲۴', tag: 'استادی پرمیت و دانشگاه‌های برتر' },
    ],
  },
];

