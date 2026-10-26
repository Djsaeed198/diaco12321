import { EUROPEAN_COUNTRIES, IMMIGRATION_PATHS } from '../constants/immigration';
import type { UserProfile, ImmigrationPlan, RecommendedOption } from '../types';

export function calculateAssessment(profile: UserProfile): ImmigrationPlan {
  let score = 50;

  // سن
  if (profile.age) {
    if (profile.age >= 21 && profile.age <= 35) score += 20;
    else if (profile.age >= 36 && profile.age <= 45) score += 14;
    else if (profile.age >= 46 && profile.age <= 55) score += 8;
    else score += 5;
  } else {
    score += 10;
  }

  // تحصیلات
  if (profile.education === 'phd') score += 18;
  else if (profile.education === 'master') score += 15;
  else if (profile.education === 'bachelor') score += 12;
  else if (profile.education === 'diploma') score += 6;

  // زبان
  if (profile.language === 'C1' || profile.language === 'C2') score += 18;
  else if (profile.language === 'B2') score += 14;
  else if (profile.language === 'B1') score += 10;
  else if (profile.language === 'A2') score += 6;
  else if (profile.language === 'A1') score += 3;

  // تمکن مالی
  if (profile.financialRange === 'premium') score += 16;
  else if (profile.financialRange === 'high') score += 13;
  else if (profile.financialRange === 'mid') score += 9;
  else score += 5;

  // جاب آفر
  if (profile.hasJobOffer) score += 15;

  const totalScore = Math.min(Math.max(score, 42), 98);

  let level: ImmigrationPlan['level'] = 'medium';
  let levelLabel = 'متوسط (نیازمند تقویت مدارک)';

  if (totalScore >= 80) {
    level = 'excellent';
    levelLabel = 'بسیار بالا و ممتاز (آماده اقدام فوری)';
  } else if (totalScore >= 68) {
    level = 'high';
    levelLabel = 'بالا و مناسب (دارای شانس موفقیت بالا)';
  } else if (totalScore < 55) {
    level = 'low';
    levelLabel = 'نیازمند ارتقاء سطح زبان یا تمکن مالی';
  }

  const targetCountryCodes = profile.targetCountries?.length ? profile.targetCountries : ['AT', 'DE', 'GR'];
  const matchedCountries = EUROPEAN_COUNTRIES.filter((c) => targetCountryCodes.includes(c.code));
  const primaryCountry = matchedCountries[0] || EUROPEAN_COUNTRIES[0];
  const selectedPath = IMMIGRATION_PATHS.find((p) => p.id === profile.immigrationPath) || IMMIGRATION_PATHS[0];

  const recommendedOptions: RecommendedOption[] = [
    {
      country: primaryCountry.name,
      flag: primaryCountry.flag,
      pathName: selectedPath.label,
      matchScore: totalScore,
      reason: `انطباق مناسب مشخصات سنی و بودجه مالی شما با الزامات قانونی ${primaryCountry.name}`,
    },
    {
      country: 'اتریش (Austria)',
      flag: '🇦🇹',
      pathName: profile.hasJobOffer ? 'کارت قرمز-سفید-قرمز' : 'تمکن مالی (خودحمایتی)',
      matchScore: Math.min(totalScore + 2, 96),
      reason: 'وجود وکلای رسمی مقیم وین دیاکو و امکان پیگیری بدون واسطه در اداره اقامت اتریش (MA35)',
    },
    {
      country: 'آلمان (Germany)',
      flag: '🇩🇪',
      pathName: profile.hasJobOffer ? 'کارت آبی اروپا' : 'کارت شانس کاریابی (Chancenkarte)',
      matchScore: Math.min(totalScore - 2, 93),
      reason: 'فرصت ورود به بازار کار اروپا و امکان اخذ اقامت دائم در ۲۱ تا ۲۷ ماه پس از شروع به کار',
    },
  ];

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (profile.age && profile.age <= 38) {
    strengths.push('امتیاز سن در بازه طلایی و ایده‌آل اداره مهاجرت قرار دارد.');
  } else {
    improvements.push('به دلیل رده سنی، افزایش موجودی تمکن مالی یا مهارت زبانی توصیه می‌شود.');
  }

  if (profile.education === 'master' || profile.education === 'phd') {
    strengths.push('مدرک تحصیلی تکمیلی (کارشناسی ارشد یا دکتری) امتیاز حداکثری دارد.');
  } else if (profile.education === 'bachelor') {
    strengths.push('مدرک کارشناسی شما قابل معادل‌سازی رسمی در پایگاه Anabin و ZAB است.');
  } else {
    improvements.push('ارتقای مدارک مهارتی فنی یا دوره‌های آوسبیلدونگ توصیه می‌گردد.');
  }

  if (profile.language === 'B2' || profile.language === 'C1' || profile.language === 'C2') {
    strengths.push('سطح زبان فعلی شما کاملا پاسخگوی مصاحبه‌های سفارت و کارفرمایان اروپایی است.');
  } else {
    improvements.push('رساندن مدرک زبان به سطح B1/B2 آلمانی یا آیلتس ۶.۵ ضریب موفقیت را دوچندان می‌کند.');
  }

  if (profile.hasJobOffer) {
    strengths.push('داشتن پیشنهاد شغلی (Job Offer) مسیر دریافت مستقیم کارت اقامت کاری را هموار می‌کند.');
  }

  if (profile.financialRange === 'high' || profile.financialRange === 'premium') {
    strengths.push('توانمندی مالی عالی امکان اقدام برای اقامت خودحمایتی و گلدن ویزا را فراهم می‌سازد.');
  } else {
    improvements.push('حفظ گردش حساب منظم ۶ ماهه به همراه سپرده‌گذاری بانکی شفاف پیشنهاد می‌شود.');
  }

  return {
    totalScore,
    level,
    levelLabel,
    planOverview: `بر اساس آخرین داده‌های سال ۲۰۲۶ و الزامات کنسولی، پرونده شما برای کشور ${primaryCountry.name} و مسیر ${selectedPath.label} دارای رتبه انطباق ${totalScore} از ۱۰۰ است. هلدینگ بین‌المللی دیاکو با دفاتر رسمی در وین، آتن و تهران، صفر تا صد مراحل آماده‌سازی اسناد، معادل‌سازی رسمی، ثبت نوبت سفارت و پیگیری در مراجع اداری مقصد را پشتیبانی می‌کند.`,
    strengths,
    improvements,
    recommendedOptions,
    estimatedMonths: primaryCountry.avgProcessingMonths,
    estimatedBudget: `${selectedPath.minBudget.toLocaleString('fa-IR')} الی ${(selectedPath.minBudget * 1.6).toLocaleString('fa-IR')} یورو`,
    timeline: [
      {
        phase: 'فاز اول: آماده‌سازی، ترجمه و معادل‌سازی رسمی مدارک (ماه اول)',
        tasks: [
          'ترجمه رسمی مدارک هویتی، تحصیلی و شغلی به زبان آلمانی یا انگلیسی',
          'اخذ تاییدات دادگستری و وزارت امور خارجه ایران',
          'ارزیابی و تاییدیه معادل‌سازی در پایگاه‌های ZAB یا دانشگاه‌های مقصد',
        ],
      },
      {
        phase: 'فاز دوم: رزرو نوبت سفارت و تنظیم بیزینس‌پلن یا انگیزش‌نامه (ماه دوم)',
        tasks: [
          'رزرو وقت مصاحبه کنسولی یا دفاتر رسمی VFS/VisaMetric',
          'نگارش تخصصی رزومه استاندارد اروپایی (Europass CV) و انگیزه‌نامه (SOP)',
          'استعلام موجودی حساب و تاییدیه منشاء دارایی و تمکن بانکی',
        ],
      },
      {
        phase: 'فاز سوم: تحویل مدارک، بیومتریک و پیگیری اداری پرونده (ماه ۳ الی ۵)',
        tasks: [
          'شرکت در جلسه انگشت‌نگاری و مصاحبه با هدایت مشاوران دیاکو',
          'ارسال پرونده به اداره مرکزی اقامت در اتریش (MA35) یا آلمان',
          'پیگیری مستمر توسط وکیل اتریشی دیاکو تا صدور موافقت‌نامه اولیه',
        ],
      },
      {
        phase: 'فاز چهارم: صدور ویزای D، ورود به اروپا و دریافت کارت اقامت (ماه ۵ به بعد)',
        tasks: [
          'اخذ ویزای تایپ D و پرواز به مقصد',
          'عقد قرارداد اجاره مسکن رسمی و ثبت آدرس (Meldezettel) در وین یا آلمان',
          'حضور در اداره اقامت با وکیل محلی دیاکو و تحویل فیزیکی کارت اقامت',
        ],
      },
    ],
    documentChecklist: [
      { document: 'گذرنامه معتبر', details: 'حداقل ۲ سال اعتبار با حداقل ۴ صفحه سفید' },
      { document: 'شناسنامه و کارت ملی', details: 'ترجمه رسمی با تایید دادگستری و وزارت خارجه' },
      { document: 'گواهی عدم سوءپیشینه کیفری', details: 'دارای حداکثر ۳ ماه اعتبار با تاییدات کنسولی' },
      { document: 'مدارک تمکن و پرینت حساب بانکی', details: 'گردش ۶ ماهه به زبان انگلیسی با مهر رسمی بانک' },
      { document: 'رزومه و سوابق کاری (CV)', details: 'تنظیم استاندارد به فرمت Europass با گواهی سابقه بیمه' },
      { document: 'مدرک زبان (در صورت نیاز)', details: 'مدرک ÖSD، گوته یا آیلتس با تاریخ معتبر' },
    ],
    estimatedCosts: [
      { item: 'هزینه دولتی سفارت و بررسی پرونده', cost: '۸۰ الی ۱۶۰ یورو' },
      { item: 'ترجمه رسمی و تاییدات وزارتین', cost: 'تقریبا ۱۰ الی ۲۰ میلیون تومان' },
      { item: 'معادل‌سازی مدرک تحصیلی (ZAB / اداره اتریش)', cost: '۲۰۰ الی ۳۵۰ یورو' },
      { item: 'بیمه درمانی معتبر مسافرتی شینگن', cost: '۵۰ الی ۱۲۰ یورو' },
      { item: 'حداقل مبلغ مسدودی/تمکن در حساب شخصی', cost: `${selectedPath.minBudget.toLocaleString('fa-IR')} یورو` },
    ],
    stepByStepProcess: [
      { step: 'مشاوره و ارزیابی اولیه', description: 'بررسی دقیق مدارک و انتخاب کم‌ریسک‌ترین مسیر با کارشناس ارشد دیاکو.' },
      { step: 'عقد قرارداد و آماده‌سازی اسناد', description: 'ترجمه، لگالایز و نگارش تخصصی اسناد مهاجرتی تحت نظارت وکلای دیاکو.' },
      { step: 'سابمیت پرونده و انگشت‌نگاری', description: 'ارائه پرونده به سفارت یا اداره اقامت کشور مقصد.' },
      { step: 'اخذ کارت اقامت و خدمات ورود', description: 'ورود به اتریش یا اروپا، اجاره مسکن، بیمه و تحویل کارت فیزیکی اقامت.' },
    ],
    risksAndConsiderations: [
      'سهمیه پرونده‌های تمکن مالی اتریش محدود است؛ ثبت به موقع در روزهای ابتدایی سال بسیار حیاتی است.',
      'تمام اسناد مالی و شغلی باید دارای مهر و استعلام قابل دفاع باشند تا از هرگونه ریجکتی جلوگیری شود.',
      'داشتن آدرس مسکونی ثبت‌شده و قانونی در کشور مقصد پیش‌شرط صدور نهایی کارت اقامت است.',
    ],
  };
}
