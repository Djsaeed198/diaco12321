export interface Country {
  code: string;
  name: string;
  flag: string;
  tier: 'premium' | 'standard' | 'emerging';
  avgProcessingMonths: [number, number];
  popularPaths: string[];
  note: string;
}

export const EUROPEAN_COUNTRIES: Country[] = [
  {
    code: 'AT',
    name: 'اتریش (Austria)',
    flag: '🇦🇹',
    tier: 'premium',
    avgProcessingMonths: [3, 8],
    popularPaths: ['ویزای جستجوکار', 'کارت قرمز-سفید-قرمز (RWR)', 'تمکن مالی (خودحمایتی)', 'تحصیلی', 'کارت آبی اروپا', 'ویزای محقق'],
    note: 'پایتخت کیفیت زندگی جهان، ویزای ۶ ماهه جستجوکار اتریش برای نیروهای متخصص، سهمیه سالانه تمکن مالی و فرآیند اقامت شفاف با دفتر رسمی دیاکو در وین. حداقل حقوق کارت RWR در ۲۰۲۶: ۳,۴۶۵ یورو ناخالص ماهانه برای کارگران کلیدی و ۳,۹۷۷ یورو برای سایر کارگران ماهر (به‌همراه پرداخت‌های ویژه)',
  },
  {
    code: 'DE',
    name: 'آلمان (Germany)',
    flag: '🇩🇪',
    tier: 'premium',
    avgProcessingMonths: [4, 10],
    popularPaths: ['ویزای جستجوکار (کارت شانس Chancenkarte)', 'کارت آبی اروپا (Blue Card)', 'آوسبیلدونگ', 'تحصیلی', 'ویزای محقق'],
    note: 'بزرگ‌ترین اقتصاد اروپا، قوانین تسهیل‌شده مهاجرت کاری ۲۰۲۴-۲۰۲۶، ویزای جستجوکار کارت شانس و کمبود شدید نیروی متخصص. آستانه حقوق بلوکارت ۲۰۲۶: ۵۰,۷۰۰ یورو سالانه برای همه مشاغل و ۴۵,۹۳۴.۲۰ یورو برای مشاغل کمبود (STEM، IT، مهندسی، بهداشت)',
  },
  {
    code: 'GR',
    name: 'یونان (Greece)',
    flag: '🇬🇷',
    tier: 'emerging',
    avgProcessingMonths: [3, 6],
    popularPaths: ['گلدن ویزا (سرمایه‌گذاری)', 'تمکن مالی (FIP)', 'ویزای دیجیتال نومد', 'ویزای استارت‌آپ'],
    note: 'سریع‌ترین ویزای شینگن بدون نیاز به حضور دائم و هزینه زندگی اقتصادی در حوزه مدیترانه با دفتر دیاکو در آتن. گلدن ویزا ۲۰۲۶: مناطق پرتقاضا (آتن، تسالونیکی، میکونوس، سانتورینی) ۸۰۰,۰۰۰ یورو، سایر مناطق ۴۰۰,۰۰۰ یورو، و ۲۵۰,۰۰۰ یورو برای استارت‌آپ‌های ثبت‌شده در Elevate Greece',
  },
  {
    code: 'ES',
    name: 'اسپانیا (Spain)',
    flag: '🇪🇸',
    tier: 'standard',
    avgProcessingMonths: [4, 9],
    popularPaths: ['اقامت غیرانتفاعی (Non-Lucrative)', 'ویزای دیجیتال نومد', 'تحصیلی', 'ویزای مهارت‌های بالا'],
    note: 'آب‌وهوای دلپذیر، سیستم خدمات درمانی عالی و امکان دریافت اقامت دائم پس از ۵ سال. آستانه درآمد ۲۰۲۶: NLV حداقل ۲,۴۰۰ یورو در ماه (۴۰۰٪ IPREM)، دیجیتال نومد حداقل ۲,۸۴۹ یورو در ماه (۲۰۰٪ SMI)',
  },
  {
    code: 'PT',
    name: 'پرتغال (Portugal)',
    flag: '🇵🇹',
    tier: 'standard',
    avgProcessingMonths: [6, 14],
    popularPaths: ['ویزای جستجوکار', 'ویزای D7 تمکن مالی', 'ویزای D8 نومد دیجیتال', 'ویزای D2 کارآفرینی', 'صندوق‌های سرمایه‌گذاری (گلدن ویزا)'],
    note: 'قوانین منعطف پاسپورت، مالیات جذاب و شرایط زندگی آرام در غرب اروپا. آستانه درآمد ۲۰۲۶: D7 حداقل ۹۲۰ یورو در ماه، D8 حداقل ۳,۶۸۰ یورو در ماه (۴ برابر حداقل دستمزد). گلدن ویزا: مسیر ملکی حذف شده و سرمایه‌گذاری از ۵۰۰,۰۰۰ یورو در صندوق‌ها. زمان‌بندی شهروندی به ۱۰ سال افزایش یافته است',
  },
  {
    code: 'FR',
    name: 'فرانسه (France)',
    flag: '🇫🇷',
    tier: 'premium',
    avgProcessingMonths: [5, 12],
    popularPaths: ['پاسپورت تلنت (Passeport Talent)', 'ویزای تمکن مالی بازدیدکننده', 'تحصیلی کامپوس فرانس', 'ویزای کارآفرینی'],
    note: 'قطب علمی و فرهنگی اروپا با امکان تحصیل رایگان و ویزای نخبگان و کارآفرینان. آستانه حقوق ۲۰۲۶: «کارمند واجد شرایط» ۳۹,۵۸۲ یورو، «مدیر شرکت» ۶۵,۶۲۹.۲۰ یورو (۳ برابر SMIC)',
  },
  {
    code: 'IT',
    name: 'ایتالیا (Italy)',
    flag: '🇮🇹',
    tier: 'standard',
    avgProcessingMonths: [4, 10],
    popularPaths: ['بورسیه استانی DSU', 'ویزای کار دکرتو فلووسی', 'الکتیو رزیدنس', 'ویزای سرمایه‌گذاری'],
    note: 'فرصت تحصیل با بورسیه‌های استانی و هزینه‌های تحصیلی پوشش‌داده‌شده در دانشگاه‌های با رنکینگ برتر. الکتیو رزیدنس: درآمد غیرفعال حداقل ۳۱,۰۰۰ یورو سالانه. ویزای سرمایه‌گذاری: ۲,۰۰۰,۰۰۰ یورو اوراق قرضه دولتی، ۵۰۰,۰۰۰ یورو سهام شرکتی، یا ۲۵۰,۰۰۰ یورو استارت‌آپ نوآورانه',
  },
  {
    code: 'NL',
    name: 'هلند (Netherlands)',
    flag: '🇳🇱',
    tier: 'premium',
    avgProcessingMonths: [3, 7],
    popularPaths: ['نیروی کار با مهارت بالا (KM)', 'ویزای جستجوی کار فارغ‌التحصیلان', 'استارت‌آپ', 'ویزای محقق'],
    note: 'تسلط سراسری به زبان انگلیسی، اکوسیستم فناوری پیشرفته و استانداردهای رفاهی فوق‌العاده. آستانه حقوق ۲۰۲۶: بالای ۳۰ سال ۵,۹۴۲ یورو، زیر ۳۰ سال ۴,۳۵۷ یورو، و فارغ‌التحصیلان ۳,۱۲۲ یورو در ماه (ناخالص، بدون احتساب حق تعطیلات)',
  },
];

export type PathCategory = 'work' | 'study' | 'financial' | 'family' | 'special';

export interface ImmigrationPath {
  id: string;
  label: string;
  category: PathCategory;
  icon: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  minBudget: number;
  requiresJobOffer: boolean;
  requiresLanguage: boolean;
  description: string;
}

export const IMMIGRATION_PATHS: ImmigrationPath[] = [
  {
    id: 'financial-self',
    label: 'اقامت تمکن مالی (خودحمایتی)',
    category: 'financial',
    icon: '🏰',
    difficulty: 2,
    minBudget: 30000,
    requiresJobOffer: false,
    requiresLanguage: false,
    description: 'بدون نیاز به کار در کشور مقصد؛ اثبات گردش و موجودی حساب بانکی. آستانه درآمد ماهانه ۲۰۲۶: اسپانیا ۲,۴۰۰ یورو (NLV)، پرتغال ۹۲۰ یورو (D7)، اتریش ۲,۵۰۰-۳,۵۰۰ یورو درآمد غیرفعال',
  },
  {
    id: 'golden-visa',
    label: 'ویزای طلایی (سرمایه‌گذاری / گلدن ویزا)',
    category: 'financial',
    icon: '👑',
    difficulty: 1,
    minBudget: 250000,
    requiresJobOffer: false,
    requiresLanguage: false,
    description: 'اخذ اقامت اروپا از طریق سرمایه‌گذاری. یونان: ۸۰۰,۰۰۰ یورو مناطق پرتقاضا / ۴۰۰,۰۰۰ یورو سایر مناطق / ۲۵۰,۰۰۰ یورو استارت‌آپ. ایتالیا: ۲ میلیون یورو اوراق قرضه / ۵۰۰,۰۰۰ یورو سهام / ۲۵۰,۰۰۰ یورو استارت‌آپ. پرتغال: از ۵۰۰,۰۰۰ یورو در صندوق‌ها (مسیر ملکی حذف شده)',
  },
  {
    id: 'skilled-worker',
    label: 'کارت قرمز-سفید-قرمز و کارت آبی اروپا',
    category: 'work',
    icon: '💼',
    difficulty: 3,
    minBudget: 8000,
    requiresJobOffer: true,
    requiresLanguage: true,
    description: 'اقامت کاری مستقیم برای متخصصان دانشگاهی و فنی. اتریش RWR: حداقل ۵۵ امتیاز از ۹۰ برای مشاغل کمبود، حقوق ۳,۴۶۵ یورو ناخالص ماهانه. آلمان Blue Card: ۵۰,۷۰۰ یورو سالانه (عادی) یا ۴۵,۹۳۴.۲۰ یورو (مشاغل کمبود). فرانسه: پاسپورت تلنت با ۳۹,۵۸۲ یورو سالانه',
  },
  {
    id: 'job-seeker',
    label: 'ویزای جستجوی کار (Job Seeker / Chancenkarte)',
    category: 'work',
    icon: '🔍',
    difficulty: 3,
    minBudget: 13000,
    requiresJobOffer: false,
    requiresLanguage: true,
    description: 'ورود ۶ تا ۱۲ ماهه به خاک اتریش یا آلمان با سیستم امتیازبندی جهت یافتن کارفرمای رسمی. آلمان Chancenkarte: حداقل ۶ امتیاز از سیستم امتیازبندی، حدود ۱۲,۳۲۴ یورو تمکن مالی. اتریش: ویزای جستجوی کار با تمکن مالی متناسب',
  },
  {
    id: 'study',
    label: 'مهاجرت تحصیلی (کارشناسی، ارشد و دکتری)',
    category: 'study',
    icon: '🎓',
    difficulty: 2,
    minBudget: 14000,
    requiresJobOffer: false,
    requiresLanguage: true,
    description: 'پذیرش از دانشگاه‌های دولتی معتبر اتریش، آلمان و ایتالیا با شهریه بسیار پایین یا بورسیه. اتریش: حساب مسدودی حدود ۷۰۰ یورو در ماه (زیر ۲۴ سال) یا ۱,۲۰۰ یورو (بالای ۲۴ سال). آلمان: حدود ۱,۰۹۱ یورو در ماه',
  },
  {
    id: 'startup-visa',
    label: 'ویزای استارت‌آپ و کارآفرینی',
    category: 'financial',
    icon: '🚀',
    difficulty: 4,
    minBudget: 50000,
    requiresJobOffer: false,
    requiresLanguage: true,
    description: 'ارائه طرح تجاری نوآورانه تایید شده توسط انکوباتورهای رسمی اروپا. هلند: نیاز به تسهیل‌کننده (Facilitator) معتبر و تمکن مالی ۱۶,۰۰۰-۲۰,۰۰۰ یورو. یونان: مسیر جدید ۲۵۰,۰۰۰ یورو در استارت‌آپ‌های Elevate Greece. فرانسه: پاسپورت تلنت کارآفرینی با حداقل SMIC (۲۱,۸۷۶ یورو سالانه)',
  },
  {
    id: 'ausbildung',
    label: 'دوره‌های آوسبیلدونگ (کارآموزی حقوق‌بگیر)',
    category: 'work',
    icon: '⚙️',
    difficulty: 3,
    minBudget: 10000,
    requiresJobOffer: true,
    requiresLanguage: true,
    description: 'آموزش فنی توام با دریافت حقوق ماهیانه در آلمان و اتریش در رشته‌های پرستاری، فنی و هتلداری. حداقل مدرک زبان B1 آلمانی و قرارداد کارآموزی رسمی مورد نیاز است',
  },
  {
    id: 'family-reunion',
    label: 'الحاق خانواده و پیوست همسر',
    category: 'family',
    icon: '👨‍👩‍👧',
    difficulty: 2,
    minBudget: 5000,
    requiresJobOffer: false,
    requiresLanguage: false,
    description: 'پیوست همسر و فرزندان زیر ۱۸ سال به دارنده اقامت معتبر. در پرتغال و اسپانیا، همراهان به‌ترتیب ۵۰٪ و ۷۵٪ به آستانه درآمد اضافه می‌شوند. نیاز به اثبات رابطه خانوادگی و تمکن مالی',
  },
  {
    id: 'researcher',
    label: 'ویزای محقق و پژوهشگر',
    category: 'work',
    icon: '🔬',
    difficulty: 2,
    minBudget: 8000,
    requiresJobOffer: true,
    requiresLanguage: true,
    description: 'بر اساس دستورالعمل محققان اتحادیه اروپا (EU Researchers Directive). نیاز به قرارداد یا پذیرش از مرکز تحقیقاتی معتبر در اتریش، آلمان، هلند یا کانادا. کانادا مسیر جدید Express Entry برای محققان با سابقه کار کانادایی معرفی کرده است',
  },
];

export type FamilyStatus = 'single' | 'with-spouse' | 'with-family';

export interface FamilyStatusOption {
  id: FamilyStatus;
  label: string;
  icon: string;
  multiplier: number;
}

export const FAMILY_STATUSES: FamilyStatusOption[] = [
  { id: 'single', label: 'متقاضی مجرد (انفرادی)', icon: '👤', multiplier: 1.0 },
  { id: 'with-spouse', label: 'متاهل (به همراه همسر)', icon: '👫', multiplier: 1.5 },
  { id: 'with-family', label: 'متاهل همراه با فرزندان', icon: '👨‍👩‍👧‍👦', multiplier: 2.0 },
];

export type FinancialRangeId = 'low' | 'mid' | 'high' | 'premium';

export interface FinancialRange {
  id: FinancialRangeId;
  label: string;
  min: number;
  max: number;
  score: number;
}

export const FINANCIAL_RANGES: FinancialRange[] = [
  { id: 'low', label: 'تا ۳۰,۰۰۰ یورو (بودجه متناسب با تحصیلی، آوسبیلدونگ و کاری)', min: 0, max: 30000, score: 10 },
  { id: 'mid', label: '۳۰,۰۰۰ تا ۷۰,۰۰۰ یورو (مناسب تمکن مالی انفرادی و استارت‌آپ)', min: 30000, max: 70000, score: 18 },
  { id: 'high', label: '۷۰,۰۰۰ تا ۲۰۰,۰۰۰ یورو (مناسب تمکن مالی خانوادگی اتریش)', min: 70000, max: 200000, score: 25 },
  { id: 'premium', label: 'بیش از ۲۰۰,۰۰۰ یورو (گلدن ویزا، خرید ملک و سرمایه‌گذاری)', min: 200000, max: Infinity, score: 30 },
];

export type LanguageLevel = 'none' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export const LANGUAGE_LEVELS: { id: LanguageLevel; label: string; score: number }[] = [
  { id: 'none', label: 'بدون مدرک زبان در حال حاضر', score: 2 },
  { id: 'A1', label: 'A1 (آشنایی مقدماتی)', score: 6 },
  { id: 'A2', label: 'A2 (مکالمات ساده روزمره)', score: 10 },
  { id: 'B1', label: 'B1 (سطح متوسط آلمانی یا انگلیسی)', score: 16 },
  { id: 'B2', label: 'B2 (سطح پیشرفته کاری/دانشگاهی)', score: 22 },
  { id: 'C1', label: 'C1 یا C2 (تسلط کامل و حرفه‌ای)', score: 28 },
];