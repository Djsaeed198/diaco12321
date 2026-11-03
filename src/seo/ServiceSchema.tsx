import React from 'react';

export interface ServiceReviewItem {
  author: string;
  role?: string;
  datePublished: string;
  ratingValue: number;
  reviewBody: string;
  headline?: string;
}

export interface ServiceSchemaProps {
  name: string;
  serviceType: string;
  description: string;
  url: string;
  image?: string;
  areaServed?: Array<{ code: string; name: string }>;
  ratingValue?: string | number;
  reviewCount?: string | number;
  reviews?: ServiceReviewItem[];
}

const DEFAULT_REVIEWS: ServiceReviewItem[] = [
  {
    author: 'دکتر علیرضا ناصری',
    role: 'پزشک متخصص و متقاضی اقامت خودحمایتی',
    datePublished: '2025-11-14',
    ratingValue: 5,
    headline: 'اخذ سهمیه تمکن مالی اتریش در ثانیه‌های نخست',
    reviewBody:
      'با نظارت مستقیم وکلای مقیم وین هلدینگ دیاکو، پرونده تمکن مالی خانوادگی ما بدون هیچ نقصی در پنجره سهمیه سالانه ثبت شد و در کمتر از ۴ ماه کارت اقامت اتریش را دریافت کردیم.',
  },
  {
    author: 'مهندس نوید سلیمانی',
    role: 'توسعه‌دهنده ارشد نرم‌افزار',
    datePublished: '2025-12-05',
    ratingValue: 5,
    headline: 'تسهیل اخذ بلوکارت آلمان و قرارداد کاری',
    reviewBody:
      'تطبیق قرارداد استخدامی با اداره کار آلمان و ترجمه رسمی مورد تایید ZAB توسط دیاکو انجام شد و ویزای بلوکارت برلین را بدون نیاز به مصاحبه مجدد دریافت کردم.',
  },
  {
    author: 'خانم دکتر کریمی',
    role: 'سرمایه‌گذار حوزه املاک',
    datePublished: '2025-10-22',
    ratingValue: 5,
    headline: 'گلدن ویزای یونان و خرید ملک در گلیفادا',
    reviewBody:
      'همراهی کارشناسان دفتر آتن دیاکو از زمان ارزیابی ثبتی ملک تا انتقال سند و صدور کارت‌های اقامت ۵ ساله شینگن فوق‌العاده شفاف و متعهدانه بود.',
  },
  {
    author: 'مهندس آرش طاهری',
    role: 'مهندس صنایع و دارنده کارت RWR اتریش',
    datePublished: '2025-09-18',
    ratingValue: 5,
    headline: 'کارت قرمز-سفید-قرمز اتریش با امتیاز کامل',
    reviewBody:
      'محاسبه دقیق امتیازات در اداره کار اتریش (AMS) و پیگیری منظم وکلای دفتر وین دیاکو باعث شد جاب آفر رسمی به کارت اقامت کاری تبدیل شود.',
  },
];

export const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  name,
  serviceType,
  description,
  url,
  image = 'https://www.dia-co.ir/og-cover.jpg',
  areaServed = [
    { code: 'AT', name: 'Austria' },
    { code: 'DE', name: 'Germany' },
    { code: 'GR', name: 'Greece' },
    { code: 'ES', name: 'Spain' },
  ],
  ratingValue = '4.9',
  reviewCount = '485',
  reviews = DEFAULT_REVIEWS,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Service', 'LegalService'],
    '@id': `${url}#service`,
    name,
    serviceType,
    description,
    url,
    image,
    provider: {
      '@type': ['LegalService', 'Organization'],
      '@id': 'https://www.dia-co.ir/#organization',
      name: 'هلدینگ مهاجرتی دیاکو',
      alternateName: 'Diaco Immigration Holding',
      url: 'https://www.dia-co.ir/',
      telephone: '+98-21-91693955',
      logo: 'https://www.dia-co.ir/logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴',
        addressLocality: 'Tehran',
        postalCode: '19858',
        addressCountry: 'IR',
      },
    },
    areaServed: areaServed.map((a) => ({
      '@type': 'Country',
      name: a.name,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `پکیج‌های حقوقی ${name}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `ارزیابی اولیه و پرونده‌سازی تخصصی ${name}`,
          },
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(ratingValue),
      reviewCount: String(reviewCount),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author,
      },
      datePublished: r.datePublished,
      headline: r.headline || `تجربه موفق ${name}`,
      reviewBody: r.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.ratingValue),
        bestRating: '5',
        worstRating: '1',
      },
      itemReviewed: {
        '@type': 'LegalService',
        name: `هلدینگ مهاجرتی دیاکو — ${name}`,
        url,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ServiceSchema;
