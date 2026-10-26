import React, { useState } from 'react';

export interface ComparisonPath {
  id: string;
  category: 'work' | 'education' | 'financial' | 'investment' | 'nomad';
  title: string;
  subtitle: string;
  flag: string;
  targetCountries: string[];
  badge: string;
  categoryLabel: string;
  iconSvg: 'work' | 'education' | 'financial' | 'investment' | 'nomad';
  requirements: {
    language: string;
    education: string;
    workExperience: string;
    ageLimit: string;
    jobOffer: string;
  };
  timelines: {
    processingTime: string;
    timeToPR: string;
    timeToPassport: string;
  };
  costs: {
    blockedFunds: string;
    governmentFees: string;
    tuitionOrIncome: string;
    monthlyLiving: string;
  };
  rights: {
    applicantWork: string;
    spouseWork: string;
    familyReunification: string;
  };
  pros: string[];
  cons: string[];
  verdict: string;
}

export const COMPARISON_PATHS: ComparisonPath[] = [
  {
    id: 'work_rwr',
    category: 'work',
    title: 'اقامت کاری / کارت قرمز-سفید-قرمز (RWR)',
    subtitle: 'اشتغال رسمی متخصصان، مهندسان و نیروهای کلیدی در اتریش',
    flag: '🇦🇹',
    targetCountries: ['اتریش', 'آلمان (بلوکارت)'],
    badge: 'پرتقاضاترین مسیر درآمدزایی یورویی',
    categoryLabel: 'شغلی و بازار کار (Work)',
    iconSvg: 'work',
    requirements: {
      language: 'B1 آلمانی یا IELTS 5.5 انگلیسی (معافیت برای مهندسان IT و مشاغل خاص)',
      education: 'حداقل کارشناسی یا مدارک فنی و حرفه‌ای بین‌المللی مستند',
      workExperience: 'حداقل ۲ تا ۳ سال سابقه کار تخصصی مرتبط با بیمه',
      ageLimit: 'بهترین امتیاز سن تا ۴۰ سال (حداکثر سقف مجاز تا ۵۰ سال)',
      jobOffer: 'الزامی (قرارداد کاری معتبر با حداقل حقوق قانونی مصوب اتریش)',
    },
    timelines: {
      processingTime: '۳ الی ۵ ماه کاری از زمان ثبت در سفارت یا اداره MA35',
      timeToPR: '۲۱ الی ۲۴ ماه (تبدیل مستقیم به کارت RWR Plus و اقامت دائم)',
      timeToPassport: '۶ الی ۱۰ سال سکونت قانونی و مستمر',
    },
    costs: {
      blockedFunds: 'بدون نیاز به تمکن مسدودی بالا (تنها حدود ۴،۰۰۰ یورو تنخواه اولیه)',
      governmentFees: '۲۸۰ الی ۳۵۰ یورو عوارض دولتی و صدور کارت فیزیکی',
      tuitionOrIncome: 'درآمد خالص ماهانه ۲،۵۰۰ تا ۵،۰۰۰ یورو (دارای حقوق و پاداش سالانه ۱۴ ماهه)',
      monthlyLiving: 'پوشش کامل توسط حقوق دریافتی بدون نیاز به خرج از سرمایه شخصی',
    },
    rights: {
      applicantWork: 'اجازه کار تمام‌وقت رسمی با کلیه مزایای قانون کار اروپا و بیمه درمانی',
      spouseWork: 'همسر بلافاصله اجازه کار نامحدود و آزاد در هر شرکتی دریافت می‌کند',
      familyReunification: 'الحاق همزمان همسر و فرزندان زیر ۱۸ سال در همان پرونده اولیه',
    },
    pros: [
      'درآمد خالص یورویی از روز اول ورود',
      'الحاق همزمان و اجازه کار نامحدود همسر',
      'تبدیل سریع به اقامت دائم ظرف کمتر از ۲ سال',
    ],
    cons: [
      'وابسته به اخذ پیشنهاد شغلی و کارفرمای رسمی',
      'نیاز به مدرک زبان آلمانی یا انگلیسی معتبر',
    ],
    verdict: 'بهترین و مطمئن‌ترین انتخاب برای نیروهای متخصص و فارغ‌التحصیلانی که سابقه کار دارند و مایلند بدون اتلاف سرمایه، درآمد ارزی داشته باشند.',
  },
  {
    id: 'academic_study',
    category: 'education',
    title: 'مهاجرت تحصیلی و پذیرش دانشگاهی',
    subtitle: 'تحصیل در دانشگاه‌های برتر اتریش (وین، گراتس) و آلمان',
    flag: '🎓',
    targetCountries: ['اتریش', 'آلمان', 'ایتالیا (بورسیه)'],
    badge: 'اقتصادی‌ترین و مطمئن‌ترین مسیر ورود',
    categoryLabel: 'تحصیلی و دانشگاهی (Academic)',
    iconSvg: 'education',
    requirements: {
      language: 'پذیرش مشروط با A2 آلمانی در اتریش؛ یا B2/IELTS 6.5 برای آلمان',
      education: 'دیپلم ۱۲ ساله معتبر برای کارشناسی؛ یا مدرک لیسانس برای ارشد',
      workExperience: 'بدون نیاز به سابقه کار قبلی',
      ageLimit: 'بهترین سن تا ۳۰ سال برای کارشناسی و تا ۳۵ سال برای ارشد و دکتری',
      jobOffer: 'بدون نیاز به جاب آفر یا کارفرما',
    },
    timelines: {
      processingTime: '۴ الی ۶ ماه (فرآیند اخذ پذیرش + وقت سفارت و ویزای D)',
      timeToPR: '۵ سال (با محاسبه ۵۰٪ دوران تحصیل + تبدیل به ویزای کاری پس از فارغ‌التحصیلی)',
      timeToPassport: '۶ الی ۱۰ سال پس از شروع کار رسمی و اقامت پس از تحصیل',
    },
    costs: {
      blockedFunds: '۱۲،۰۰۰ الی ۱۴،۵۰۰ یورو تمکن مسدودی سالانه در حساب شخصی',
      governmentFees: '۱۶۰ الی ۲۲۰ یورو عوارض دولتی',
      tuitionOrIncome: 'شهریه بسیار ارزان: حدود ۷۵۰ یورو در هر ترم در اتریش؛ رایگان در آلمان',
      monthlyLiving: '۸۵۰ الی ۱،۱۵۰ یورو ماهانه (خوابگاه، بیمه و هزینه‌های جاری)',
    },
    rights: {
      applicantWork: 'اجازه کار قانونی پاره‌وقت (۲۰ ساعت در هفته در دوران تحصیل)',
      spouseWork: 'در مقاطع ارشد و دکتری همسر امکان همراهی و کار دارد',
      familyReunification: 'امکان‌پذیر است؛ در مقطع کارشناسی توصیه می‌شود بعد از ترم اول ثبت شود',
    },
    pros: [
      'پذیرش با حداقل مدرک زبان و امکان گذراندن دوره در اتریش',
      'شهریه دولتی تقریباً رایگان در دانشگاه‌های رنک برتر دنیا',
      'ویزای کاریابی ۱۲ الی ۱۸ ماهه پس از فارغ‌التحصیلی',
    ],
    cons: [
      'نیاز به تمکن مسدودی سالانه در حساب بانکی شخصی',
      'محدودیت ساعت کار در حین تحصیل (۲۰ ساعت در هفته)',
    ],
    verdict: 'بهترین مسیر با نرخ قبولی فوق‌العاده بالا برای جوانان، دانشجویان و فارغ‌التحصیلانی که خواهان مدرک معتبر اروپایی و ورود بدون ریسک به شینگن هستند.',
  },
  {
    id: 'financial_independence',
    category: 'financial',
    title: 'اقامت تمکن مالی (خودحمایتی اتریش)',
    subtitle: 'اقامت بدون نیاز به کار، بدون سرمایه‌گذاری ملکی و بدون مدرک تحصیلی اجباری',
    flag: '🏰',
    targetCountries: ['اتریش (Quotenkontingent)', 'اسپانیا', 'فرانسه'],
    badge: 'لوکس‌ترین و بدون‌ریسک‌ترین روش اقامتی',
    categoryLabel: 'تمکن مالی (Financial)',
    iconSvg: 'financial',
    requirements: {
      language: 'مدرک A1 آلمانی یا دارا بودن مدرک لیسانس دانشگاهی (معافیت از زبان)',
      education: 'بدون شرط مدرک تحصیلی تخصصی',
      workExperience: 'بدون نیاز به سابقه کار یا بیمه',
      ageLimit: 'بدون هیچ‌گونه محدودیت سنی (مناسب برای تمام سنین)',
      jobOffer: 'بدون نیاز؛ اشتغال محلی ممنوع است و درآمد باید از خارج اروپا تامین شود',
    },
    timelines: {
      processingTime: '۳ الی ۵ ماه کاری (پرونده‌سازی از آبان، ثبت در نخستین روز کاری ژانویه)',
      timeToPR: '۵ سال اقامت مستمر با تمدید ۱ ساله، ۲ ساله و سپس دائم',
      timeToPassport: '۶ الی ۱۰ سال سکونت قانونی در اتریش',
    },
    costs: {
      blockedFunds: '۲۶،۰۰۰ تا ۳۰،۰۰۰ یورو تمکن مسدودی به ازای هر بزرگسال در حساب بانکی',
      governmentFees: '۳۵۰ الی ۴۵۰ یورو عوارض کنسولی به ازای هر عضو خانواده',
      tuitionOrIncome: 'درآمد غیرفعال ماهانه مستند (سود سپرده، اجاره ملک، حقوق بازنشستگی)',
      monthlyLiving: '۱،۵۰۰ الی ۲،۵۰۰ یورو در ماه متناسب با استاندارد زندگی خانواده',
    },
    rights: {
      applicantWork: 'بدون اجازه کار استخدامی در اتریش؛ تجارت بین‌الملل و درآمد غیرفعال مجاز است',
      spouseWork: 'بدون اجازه کار استخدامی محلی',
      familyReunification: 'کل اعضای خانواده (همسر و فرزندان زیر ۱۸ سال) همزمان کارت اقامت می‌گیرند',
    },
    pros: [
      'بدون نیاز به سرمایه‌گذاری یا واگذاری دارایی',
      'پوشش همزمان کل اعضای خانواده در کارت‌های اقامت ۱ ساله',
      'تردد کاملاً آزادانه در تمام ۲۹ کشور حوزه شینگن بدون نیاز به ویزا',
    ],
    cons: [
      'سهمیه محدود سالانه ایالتی و ضرورت پرونده‌سازی زودهنگام با وکیل رسمی',
      'عدم امکان استخدام شدن در شرکت‌های محلی اتریش',
    ],
    verdict: 'ایده‌آل‌ترین گزینه برای خانواده‌ها و افراد دارای سرمایه یا درآمد مستقل ریالی/ارزی که می‌خواهند بدون درگیر شدن در آزمون‌های زبانی سخت و قرارداد کاری، اقامت شینگن بگیرند.',
  },
  {
    id: 'golden_visa_property',
    category: 'investment',
    title: 'گلدن ویزای سرمایه‌گذاری و خرید ملک',
    subtitle: 'اقامت سریع اروپا از طریق تملک قطعی املاک مسکونی یا تجاری',
    flag: '🏡',
    targetCountries: ['یونان (۲۵۰ هزار یورو)', 'اسپانیا (۵۰۰ هزار یورو)', 'مجارستان'],
    badge: 'سریع‌ترین گلدن ویزا بدون شرط حضور',
    categoryLabel: 'سرمایه‌گذاری و املاک (Investment)',
    iconSvg: 'investment',
    requirements: {
      language: 'بدون نیاز به هیچ‌گونه مدرک زبان خارجی',
      education: 'بدون نیاز به مدرک تحصیلی',
      workExperience: 'بدون نیاز به سابقه کار',
      ageLimit: 'بدون محدودیت سنی برای متقاضی و همسر',
      jobOffer: 'بدون نیاز به هیچ‌گونه پیشنهاد شغلی',
    },
    timelines: {
      processingTime: '۶۰ الی ۹۰ روز کاری از امضای سند قطعی در دفتر اسناد رسمی آتن',
      timeToPR: 'اقامت ۵ ساله مستقیم و قابل تمدید مادام‌العمر تا زمان حفظ ملک',
      timeToPassport: '۷ سال اقامت در یونان یا ۱۰ سال در اسپانیا',
    },
    costs: {
      blockedFunds: 'خرید قطعی ملک از ۲۵۰،۰۰۰ یورو در آتن/گلیفادا با سند تک‌برگ بنام متقاضی',
      governmentFees: 'حدود ۲،۰۰۰ یورو عوارض دولتی ویزای طلایی',
      tuitionOrIncome: 'امکان اجاره‌داری یورویی ملک با بازدهی سالانه ۵ الی ۸ درصد',
      monthlyLiving: 'بدون شرط حضور؛ نیازی به هزینه‌کرد ماهانه در خاک اروپا نیست',
    },
    rights: {
      applicantWork: 'امکان ثبت شرکت و راه‌اندازی کسب‌وکار تجاری شخصی در اروپا',
      spouseWork: 'امکان ثبت بیزینس و سهامداری',
      familyReunification: 'شامل متقاضی، همسر، فرزندان تا ۲۱ سال و حتی والدین متقاضی و همسر (۳ نسل)',
    },
    pros: [
      'بدون حتی یک روز شرط حضور فیزیکی در سال در کشور مقصد',
      'پوشش ۳ نسل خانواده (فرزندان و والدین طرفین)',
      'سرمایه‌گذاری امن بر روی ملک با رشد ارزش یورویی و درآمد اجاره',
    ],
    cons: [
      'نیاز به نقدینگی اولیه بالاتر (حداقل ۲۵۰ هزار یورو)',
    ],
    verdict: 'بهترین استراتژی برای تجار، پزشکان و مدیرانی که در ایران بیزینس فعال دارند و مایلند بدون ترک شغل فعلی خود در ایران، پلن B مطمئن و پاسپورت شینگن داشته باشند.',
  },
  {
    id: 'chancenkarte_germany',
    category: 'work',
    title: 'کارت شانس کاریابی آلمان (Chancenkarte)',
    subtitle: 'ویزای ۱۲ ماهه جستجوی کار با سیستم امتیاز‌بندی مدرن آلمان ۲۰۲۶',
    flag: '🇩🇪',
    targetCountries: ['آلمان'],
    badge: 'جدیدترین قانون مهاجرت مهارتی آلمان',
    categoryLabel: 'شغلی و کاریابی (Jobseeker)',
    iconSvg: 'work',
    requirements: {
      language: 'حداقل A1 آلمانی یا B2 انگلیسی (کسب امتیاز از زبان)',
      education: 'مدرک دانشگاهی ۲ ساله یا مدرک فنی حرفه‌ای با معادل‌سازی ZAB',
      workExperience: 'حداقل ۲ سال سابقه کار تخصصی مستند',
      ageLimit: 'امتیاز بالاتر برای افراد زیر ۳۵ سال و ۳۵ تا ۴۰ سال',
      jobOffer: 'بدون نیاز به پیشنهاد شغلی اولیه (جاب آفر در خاک آلمان اخذ می‌شود)',
    },
    timelines: {
      processingTime: '۲ الی ۴ ماه کاری در کنسولگری آلمان',
      timeToPR: '۲۱ تا ۲۷ ماه پس از تبدیل به بلوکارت در آلمان',
      timeToPassport: '۵ سال (در قوانین جدید آلمان تا ۳ سال با زبان C1)',
    },
    costs: {
      blockedFunds: 'حدود ۱۲،۳۰۰ یورو حساب مسدودی (Sperrkonto) جهت مخارج ۱ سال زندگی',
      governmentFees: '۷۵ یورو هزینه ویزای ملی تایپ D',
      tuitionOrIncome: 'پس از استخدام: ۴۵،۰۰۰ تا ۶۰،۰۰۰ یورو حداقل حقوق بلوکارت',
      monthlyLiving: '۹۵۰ الی ۱،۱۰۰ یورو در ماه در شهرهای آلمان',
    },
    rights: {
      applicantWork: 'حق کار آزمایشی تا ۲۰ ساعت در هفته در دوره ۱ ساله جستجوی کار',
      spouseWork: 'پس از تبدیل به ویزای کاری تمام‌وقت، همسر اجازه کار آزاد دارد',
      familyReunification: 'پس از استخدام رسمی و تبدیل کارت به بلوکارت کاریابی انجام می‌شود',
    },
    pros: [
      'امکان ورود مستقیم به خاک آلمان بدون نیاز به کارفرما از قبل',
      'اجازه کار پاره‌وقت در طول دوره جستجوی شغل',
      'سیستم امتیاز‌بندی شفاف بر مبنای سن، زبان و رشته تحصیلی',
    ],
    cons: [
      'نیاز به تمکن مسدودی یک‌ساله در بانک آلمانی',
      'مدت زمان ۱۲ ماهه برای یافتن قرارداد کاری رسمی',
    ],
    verdict: 'راه‌حل فوق‌العاده برای مهندسان و متخصصانی که در مصاحبه‌های از راه دور شانس کمتری دارند و می‌خواهند در خاک آلمان با کارفرمایان مصاحبه حضوری کنند.',
  },
  {
    id: 'digital_nomad',
    category: 'nomad',
    title: 'ویزای دیجیتال نوماد و فریلنسری',
    subtitle: 'اقامت کاری آزاد با تکیه بر درآمدهای دورکاری از خارج اروپا',
    flag: '💻',
    targetCountries: ['اسپانیا', 'یونان', 'پرتغال (D8)'],
    badge: 'انعطاف‌پذیرترین مسیر اقامتی فریلنسرها',
    categoryLabel: 'دیجیتال نوماد (Nomad)',
    iconSvg: 'nomad',
    requirements: {
      language: 'بدون شرط نمره زبان رسمی (تسلط کاری به انگلیسی کافیست)',
      education: 'مدرک دانشگاهی مرتبط یا حداقل ۳ سال سابقه فریلنسری مستند',
      workExperience: 'قرارداد معتبر دورکاری با شرکت‌های خارجی خارج از کشور مقصد',
      ageLimit: 'بدون محدودیت سنی سخت‌گیرانه',
      jobOffer: 'قرارداد دورکاری فعال که بیش از ۳ ماه قدمت داشته باشد',
    },
    timelines: {
      processingTime: '۲ الی ۴ ماه کاری',
      timeToPR: '۵ سال اقامت قانونی مستمر',
      timeToPassport: '۵ تا ۱۰ سال بسته به قوانین کشور مقصد',
    },
    costs: {
      blockedFunds: 'حداقل اثبات درآمد ماهانه ۲،۵۰۰ تا ۳،۵۰۰ یورو از قراردادهای ریموت',
      governmentFees: '۱۵۰ الی ۲۵۰ یورو',
      tuitionOrIncome: 'درآمد ارزی از کارفرمایان بین‌المللی',
      monthlyLiving: '۱،۲۰۰ الی ۱،۸۰۰ یورو در ماه',
    },
    rights: {
      applicantWork: 'فعالیت ریموت و پروژه‌ای با کارفرمایان سراسر جهان',
      spouseWork: 'همسر اجازه اقامت دارد و می‌تواند کار ریموت یا محلی کند',
      familyReunification: 'امکان اضافه شدن همسر و فرزندان با اثبات تمکن اضافه',
    },
    pros: [
      'مالیات‌های تعدیل‌شده در سال‌های اولیه (مانند قانون بکهام در اسپانیا)',
      'زندگی در مقاصد آفتابی و زیبای ساحلی اروپا',
      'آزادی کامل در ساعات و مکان کار',
    ],
    cons: [
      'نیاز به اثبات استمرار و قراردادهای معتبر بین‌المللی',
      'عدم امکان استخدام در بازار سنتی داخلی کشور مقصد',
    ],
    verdict: 'انتخاب رویایی برای برنامه‌نویسان، طراحان، معامله‌گران و کارآفرینان اینترنتی که درآمد دلاری یا یورویی مستقل دارند.',
  },
];

interface Props {
  onOpenAssessment: () => void;
}

export const SideBySideComparisonSection: React.FC<Props> = ({ onOpenAssessment }) => {
  const [path1Id, setPath1Id] = useState<string>('work_rwr');
  const [path2Id, setPath2Id] = useState<string>('academic_study');

  const path1 = COMPARISON_PATHS.find((p) => p.id === path1Id) || COMPARISON_PATHS[0];
  const path2 = COMPARISON_PATHS.find((p) => p.id === path2Id) || COMPARISON_PATHS[1];

  const renderIcon = (type: ComparisonPath['iconSvg']) => {
    switch (type) {
      case 'work':
        return (
          <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.25v4.5a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-4.5m16.5 0a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25m16.5 0v3.75a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V14.25m3-8.25h6m-6 0a2.25 2.25 0 00-2.25 2.25v2.25h10.5V8.25A2.25 2.25 0 0015 6m-6 0V4.5A1.5 1.5 0 0110.5 3h3A1.5 1.5 0 0115 4.5V6" />
          </svg>
        );
      case 'education':
        return (
          <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        );
      case 'financial':
        return (
          <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6H2.25m0 0v8.25m0-8.25h19.5m0 0v8.25m0-8.25A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75M12 11.25a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
          </svg>
        );
      case 'investment':
        return (
          <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1.091m-16.5-3.272l12-4.364M3.75 21V9.818M9.75 6.75h.008v.008H9.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.008v.008H9.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        );
      case 'nomad':
        return (
          <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
          </svg>
        );
    }
  };

  return (
    <section id="compare-paths" className="scroll-mt-24 bg-[#07242e] py-16 md:py-24 text-white relative overflow-hidden" dir="rtl">
      {/* پترن پس‌زمینه هندسی ملایم */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#f5a623]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-[#0096b1]/15 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* سربرگ بخش */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300">
            ⚖️ ابزار مقایسه‌گر هوشمند دوراهی‌های مهاجرت
          </span>
          <h2 className="mt-4 text-2xl sm:text-4xl font-black text-white">
            مقایسه رو در روی دو مسیر اقامتی به اروپا
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            کدام مسیر برای پرونده شما سریع‌تر، کم‌هزینه‌تر و مطمئن‌تر است؟ دو روش اقامتی را انتخاب نموده تا تفاوت‌های ماهوی شرایط مدرک زبان، هزینه‌ها، اجازه کار و پاسپورت را در یک جدول موشکافانه مشاهده نمایید.
          </p>

          {/* پیش‌تنظیم‌های مقایسه محبوب */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-bold text-slate-400">مقایسه‌های پرطرفدار:</span>
            {[
              { label: 'کاری (RWR) ⚔️ تحصیلی', p1: 'work_rwr', p2: 'academic_study' },
              { label: 'تمکن مالی ⚔️ خرید ملک', p1: 'financial_independence', p2: 'golden_visa_property' },
              { label: 'کارت قرمز-سفید-قرمز ⚔️ کارت شانس آلمان', p1: 'work_rwr', p2: 'chancenkarte_germany' },
              { label: 'دیجیتال نوماد ⚔️ تمکن مالی', p1: 'digital_nomad', p2: 'financial_independence' },
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPath1Id(preset.p1);
                  setPath2Id(preset.p2);
                }}
                className="rounded-xl border border-white/10 bg-white/5 hover:bg-[#f5a623]/20 hover:border-[#f5a623]/50 px-3 py-1.5 text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* جعبه‌های انتخابگر دو مسیره */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* انتخابگر مسیر اول */}
          <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-[#0c313d] to-[#08222b] p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-blue-500/20 border border-blue-400/40 px-3 py-1 text-xs font-bold text-blue-300">
                مسیر اول برای مقایسه
              </span>
              <span className="text-3xl">{path1.flag}</span>
            </div>
            <label className="mt-3 block text-xs font-bold text-slate-300">انتخاب روش اقامتی:</label>
            <select
              value={path1Id}
              onChange={(e) => setPath1Id(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-white/20 bg-[#05171e] p-3 text-xs sm:text-sm font-bold text-white focus:border-[#f5a623] focus:outline-none"
            >
              {COMPARISON_PATHS.map((item) => (
                <option key={item.id} value={item.id} disabled={item.id === path2Id}>
                  {item.title} ({item.categoryLabel})
                </option>
              ))}
            </select>
            <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10">
                {renderIcon(path1.iconSvg)}
              </div>
              <div>
                <h4 className="text-sm font-black text-white">{path1.title}</h4>
                <p className="text-[11px] text-slate-300">{path1.subtitle}</p>
              </div>
            </div>
          </div>

          {/* انتخابگر مسیر دوم */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#0c313d] to-[#08222b] p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-amber-500/20 border border-amber-400/40 px-3 py-1 text-xs font-bold text-amber-300">
                مسیر دوم برای مقایسه
              </span>
              <span className="text-3xl">{path2.flag}</span>
            </div>
            <label className="mt-3 block text-xs font-bold text-slate-300">انتخاب روش اقامتی:</label>
            <select
              value={path2Id}
              onChange={(e) => setPath2Id(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-white/20 bg-[#05171e] p-3 text-xs sm:text-sm font-bold text-white focus:border-[#f5a623] focus:outline-none"
            >
              {COMPARISON_PATHS.map((item) => (
                <option key={item.id} value={item.id} disabled={item.id === path1Id}>
                  {item.title} ({item.categoryLabel})
                </option>
              ))}
            </select>
            <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10">
                {renderIcon(path2.iconSvg)}
              </div>
              <div>
                <h4 className="text-sm font-black text-white">{path2.title}</h4>
                <p className="text-[11px] text-slate-300">{path2.subtitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* جدول مقایسه دقیق سطر به سطر */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-md shadow-2xl">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#05181f] text-slate-200 border-b border-white/10">
              <tr>
                <th className="w-1/4 p-4 font-black text-xs sm:text-sm text-amber-300">شاخص مقایسه‌ای</th>
                <th className="w-[37.5%] p-4 font-black text-xs sm:text-sm text-blue-300 border-r border-white/10">
                  {path1.title}
                </th>
                <th className="w-[37.5%] p-4 font-black text-xs sm:text-sm text-amber-300 border-r border-white/10">
                  {path2.title}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-slate-200">
              {/* بخش ۱: الزامات مدارک */}
              <tr className="bg-white/[0.06]">
                <td colSpan={3} className="p-3 text-xs font-black text-[#f5a623] tracking-wide">
                  📋 ۱. الزامات، شرایط سنی و زبان
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">مدرک زبان خارجی</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.requirements.language}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.requirements.language}</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="p-4 font-bold text-slate-400">مدرک تحصیلی موردنیاز</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.requirements.education}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.requirements.education}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">سابقه کار و بیمه</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.requirements.workExperience}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.requirements.workExperience}</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="p-4 font-bold text-slate-400">سن بهینه</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.requirements.ageLimit}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.requirements.ageLimit}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">پیشنهاد کار (Job Offer)</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.requirements.jobOffer}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.requirements.jobOffer}</td>
              </tr>

              {/* بخش ۲: زمان‌بندی و اقامت */}
              <tr className="bg-white/[0.06]">
                <td colSpan={3} className="p-3 text-xs font-black text-[#f5a623] tracking-wide">
                  ⏱️ ۲. زمان‌بندی مراحل و تبدیل به پاسپورت
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">مدت زمان صدور ویزا</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.timelines.processingTime}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.timelines.processingTime}</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="p-4 font-bold text-slate-400">زمان اخذ اقامت دائم (PR)</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.timelines.timeToPR}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.timelines.timeToPR}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">پاسپورت و شهروندی شینگن</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.timelines.timeToPassport}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.timelines.timeToPassport}</td>
              </tr>

              {/* بخش ۳: هزینه‌ها و بودجه مالی */}
              <tr className="bg-white/[0.06]">
                <td colSpan={3} className="p-3 text-xs font-black text-[#f5a623] tracking-wide">
                  💰 ۳. بودجه مالی، تمکن مسدودی و هزینه‌ها
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">تمکن مسدودی / سرمایه اولیه</td>
                <td className="p-4 border-r border-white/10 text-white font-medium text-emerald-300 font-bold">
                  {path1.costs.blockedFunds}
                </td>
                <td className="p-4 border-r border-white/10 text-white font-medium text-amber-300 font-bold">
                  {path2.costs.blockedFunds}
                </td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="p-4 font-bold text-slate-400">شهریه یا درآمد ماهانه</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.costs.tuitionOrIncome}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.costs.tuitionOrIncome}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">عوارض دولتی و ثبت</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.costs.governmentFees}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.costs.governmentFees}</td>
              </tr>

              {/* بخش ۴: اجازه کار و خانواده */}
              <tr className="bg-white/[0.06]">
                <td colSpan={3} className="p-3 text-xs font-black text-[#f5a623] tracking-wide">
                  👨‍👩‍👧‍👦 ۴. حقوق کار و الحاق خانواده
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">حق کار متقاضی اصلی</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.rights.applicantWork}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.rights.applicantWork}</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="p-4 font-bold text-slate-400">حق کار همسر</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.rights.spouseWork}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.rights.spouseWork}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-400">الحاق همزمان خانواده</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path1.rights.familyReunification}</td>
                <td className="p-4 border-r border-white/10 text-white font-medium">{path2.rights.familyReunification}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* باکس تحلیل و جمع‌بندی کارشناسی دیاکو */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* کارت جمع‌بندی مسیر ۱ */}
          <div className="rounded-3xl border border-blue-500/30 bg-[#092b37] p-6 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-black text-blue-300">
                  دیدگاه حقوقی وکلای دیاکو درباره {path1.title}:
                </h4>
                <span className="text-2xl">{path1.flag}</span>
              </div>
              <p className="mt-3 text-xs leading-6 text-slate-200 text-justify font-medium">
                {path1.verdict}
              </p>
              <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
                <p className="text-[11px] font-bold text-emerald-400">مزایای کلیدی:</p>
                {path1.pros.map((pro, idx) => (
                  <p key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span> {pro}
                  </p>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenAssessment}
              className="mt-6 w-full rounded-2xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white shadow-md transition hover:scale-[1.02] cursor-pointer"
            >
              ارزیابی شانس من برای {path1.title} ←
            </button>
          </div>

          {/* کارت جمع‌بندی مسیر ۲ */}
          <div className="rounded-3xl border border-amber-500/30 bg-[#092b37] p-6 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-black text-amber-300">
                  دیدگاه حقوقی وکلای دیاکو درباره {path2.title}:
                </h4>
                <span className="text-2xl">{path2.flag}</span>
              </div>
              <p className="mt-3 text-xs leading-6 text-slate-200 text-justify font-medium">
                {path2.verdict}
              </p>
              <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
                <p className="text-[11px] font-bold text-amber-400">مزایای کلیدی:</p>
                {path2.pros.map((pro, idx) => (
                  <p key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <span className="text-amber-400">✓</span> {pro}
                  </p>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenAssessment}
              className="mt-6 w-full rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] py-3 text-xs font-black text-[#082833] shadow-glow transition hover:scale-[1.02] cursor-pointer"
            >
              ارزیابی شانس من برای {path2.title} ←
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBySideComparisonSection;
