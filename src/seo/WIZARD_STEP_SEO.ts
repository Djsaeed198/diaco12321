import type { SeoConfig } from '../hooks/useSeo';

/* ============================================================
   1. ثابت‌های مرکزی
   ============================================================ */
const BASE_URL = 'https://www.dia-co.ir';

/**
 * تاریخ امروز — برای `dateModified` در Schema
 * با هر بیلد به‌روز می‌شود (سیگنال تازگی برای Google)
 */
const TODAY = new Date().toISOString().split('T')[0];

/**
 * تنظیمات مشترک همه مراحل ویزارد
 * - robots: noindex, follow (ویزارد نباید ایندکس شود)
 * - canonical: با BASE_URL ترکیب می‌شود
 */
const WIZARD_COMMON = {
  robots: 'noindex, follow' as const,
  ogType: 'website' as const,
};

/* ============================================================
   2. آرایه اصلی — ۵ مرحله ویزارد
   ============================================================ */
export const WIZARD_STEP_SEO: SeoConfig[] = [
  /* ------------------------------------------------------------
     مرحله ۱: انتخاب کشور
     ------------------------------------------------------------ */
  {
    ...WIZARD_COMMON,
    title:
      'ارزیابی آنلاین مهاجرت | گام ۱: انتخاب کشور هدف | هلدینگ مهاجرتی دیاکو',
    description:
      'در گام نخست ارزیابی هوشمند مهاجرت، کشور هدف خود را از میان ۱۱ کشور اروپایی (اتریش، آلمان، هلند، یونان، اسپانیا و...) انتخاب کنید. تحلیل رایگان و آنی توسط موتور هوش مصنوعی دیاکو.',
    keywords: [
      'ارزیابی مهاجرت آنلاین',
      'انتخاب کشور مهاجرت',
      'مهاجرت به اتریش',
      'مهاجرت به آلمان',
      'مهاجرت به هلند',
      'ارزیابی رایگان مهاجرت',
      'هلدینگ مهاجرتی دیاکو',
    ],
    canonical: '/assessment/country',
    ogImage: `${BASE_URL}/og/step-country.jpg`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'سامانه ارزیابی هوشمند مهاجرت دیاکو',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: `${BASE_URL}/assessment/country`,
      description:
        'ارزیابی آنلاین و رایگان مسیرهای مهاجرت به اروپا با هوش مصنوعی و وکلای رسمی اتریش.',
      datePublished: '2026-01-01',
      dateModified: TODAY,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
      },
      publisher: {
        '@type': 'Organization',
        name: 'هلدینگ مهاجرتی دیاکو',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/logo.png`,
        },
      },
      inLanguage: 'fa-IR',
    },
  },

  /* ------------------------------------------------------------
     مرحله ۲: انتخاب مسیر
     ------------------------------------------------------------ */
  {
    ...WIZARD_COMMON,
    title:
      'ارزیابی آنلاین مهاجرت | گام ۲: انتخاب روش مهاجرت | هلدینگ مهاجرتی دیاکو',
    description:
      'روش مهاجرتی خود را انتخاب کنید: کارت قرمز-سفید-قرمز (RWR)، بلوکارت، تمکن مالی، تحصیلی، استارت‌آپ، گلدن ویزا یا الحاق خانواده. تحلیل شانس موفقیت به‌صورت آنی.',
    keywords: [
      'کارت قرمز سفید قرمز اتریش',
      'بلوکارت آلمان',
      'تمکن مالی مهاجرت',
      'ویزای تحصیلی اروپا',
      'گلدن ویزا یونان',
      'الحاق خانواده',
      'هلدینگ مهاجرتی دیاکو',
    ],
    canonical: '/assessment/path',
    ogImage: `${BASE_URL}/og/step-path.jpg`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'روش‌های مهاجرت به اروپا ۲۰۲۶',
      description:
        'فهرست کامل مسیرهای رسمی مهاجرت به اروپا که توسط سامانه ارزیابی دیاکو تحلیل می‌شود.',
      dateModified: TODAY,
      numberOfItems: 7,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'کارت قرمز-سفید-قرمز اتریش (RWR)',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'کارت آبی اروپا (Blue Card)',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'تمکن مالی (خودحمایتی)',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'ویزای تحصیلی',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'استارت‌آپ و کارآفرینی',
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'گلدن ویزا / سرمایه‌گذاری',
        },
        {
          '@type': 'ListItem',
          position: 7,
          name: 'الحاق خانواده',
        },
      ],
    },
  },

  /* ------------------------------------------------------------
     مرحله ۳: وضعیت خانواده
     ------------------------------------------------------------ */
  {
    ...WIZARD_COMMON,
    title:
      'ارزیابی آنلاین مهاجرت | گام ۳: وضعیت همراهان | هلدینگ مهاجرتی دیاکو',
    description:
      'وضعیت خانوادگی خود (مجرد، متاهل، دارای فرزند) را وارد کنید تا بودجه، مدارک و زمان‌بندی پرونده دقیق محاسبه شود.',
    keywords: [
      'الحاق خانواده',
      'مهاجرت خانوادگی',
      'پیوست همسر',
      'مهاجرت با فرزند',
      'هلدینگ مهاجرتی دیاکو',
    ],
    canonical: '/assessment/family',
    ogImage: `${BASE_URL}/og/step-family.jpg`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'ارزیابی وضعیت خانوادگی برای مهاجرت',
      url: `${BASE_URL}/assessment/family`,
      description:
        'تحلیل تأثیر وضعیت خانوادگی بر بودجه، مدارک و زمان‌بندی پرونده مهاجرتی.',
      datePublished: '2026-01-01',
      dateModified: TODAY,
      inLanguage: 'fa-IR',
      isPartOf: {
        '@type': 'WebApplication',
        name: 'سامانه ارزیابی هوشمند مهاجرت دیاکو',
        url: `${BASE_URL}/assessment`,
      },
    },
  },

  /* ------------------------------------------------------------
     مرحله ۴: تمکن مالی
     ------------------------------------------------------------ */
  {
    ...WIZARD_COMMON,
    title:
      'ارزیابی آنلاین مهاجرت | گام ۴: برآورد تمکن مالی | هلدینگ مهاجرتی دیاکو',
    description:
      'با وارد کردن بازه بودجه و دارایی خود، مسیرهای متناسب (تمکن مالی، گلدن ویزا، تحصیلی، کاری) به‌صورت هوشمند پیشنهاد می‌شود.',
    keywords: [
      'تمکن مالی اتریش',
      'گلدن ویزا یونان',
      'بودجه مهاجرت',
      'سرمایه‌گذاری اروپا',
      'هلدینگ مهاجرتی دیاکو',
    ],
    canonical: '/assessment/finance',
    ogImage: `${BASE_URL}/og/step-finance.jpg`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'برآورد تمکن مالی برای مهاجرت',
      url: `${BASE_URL}/assessment/finance`,
      description:
        'محاسبه هوشمند بودجه و پیشنهاد مسیرهای مهاجرتی متناسب با تمکن مالی متقاضی.',
      datePublished: '2026-01-01',
      dateModified: TODAY,
      inLanguage: 'fa-IR',
      isPartOf: {
        '@type': 'WebApplication',
        name: 'سامانه ارزیابی هوشمند مهاجرت دیاکو',
        url: `${BASE_URL}/assessment`,
      },
    },
  },

  /* ------------------------------------------------------------
     مرحله ۵: مشخصات فردی (حساس — همیشه noindex)
     ------------------------------------------------------------ */
  {
    ...WIZARD_COMMON,
    title:
      'ارزیابی آنلاین مهاجرت | گام ۵: مشخصات فردی | هلدینگ مهاجرتی دیاکو',
    description:
      'اطلاعات شخصی، سن، تحصیلات و سطح زبان خود را وارد کنید تا گزارش نهایی شانس مهاجرت شما با امتیاز دقیق تولید شود.',
    keywords: [
      'ارزیابی شانس مهاجرت',
      'امتیاز زبان',
      'تحصیلات معادل‌سازی',
      'هلدینگ مهاجرتی دیاکو',
    ],
    canonical: '/assessment/personal',
    ogImage: `${BASE_URL}/og/step-personal.jpg`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'چگونه شانس مهاجرت خود به اروپا را ارزیابی کنیم؟',
      description:
        'پنج گام ساده برای دریافت گزارش دقیق شانس مهاجرت به اروپا با سامانه دیاکو.',
      datePublished: '2026-01-01',
      dateModified: TODAY,
      inLanguage: 'fa-IR',
      totalTime: 'PT5M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        value: '0',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'انتخاب کشورهای هدف',
          text: 'از میان ۱۱ کشور اروپایی، مقاصد مورد نظر خود را انتخاب کنید.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'انتخاب روش مهاجرت',
          text: 'مسیر مناسب (RWR، Blue Card، تمکن مالی، تحصیلی و...) را مشخص کنید.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'ورود وضعیت خانوادگی',
          text: 'وضعیت تأهل و تعداد فرزندان را وارد کنید.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'برآورد تمکن مالی',
          text: 'بازه بودجه و دارایی خود را مشخص کنید.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'تکمیل مشخصات فردی',
          text: 'سن، تحصیلات و سطح زبان را وارد کنید تا گزارش نهایی تولید شود.',
        },
      ],
    },
  },
];

/* ============================================================
   3. Helper — دریافت SEO یک مرحله با fallback ایمن
   ============================================================ */
export function getWizardStepSeo(step: number): SeoConfig {
  const index = Math.max(0, Math.min(step, WIZARD_STEP_SEO.length - 1));
  return WIZARD_STEP_SEO[index];
}

/* ============================================================
   4. Helper — دریافت URL کامل canonical
   ============================================================ */
export function getWizardStepUrl(step: number): string {
  const seo = getWizardStepSeo(step);
  return `${BASE_URL}${seo.canonical ?? '/assessment'}`;
}