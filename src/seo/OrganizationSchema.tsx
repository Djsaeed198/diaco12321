import React from 'react';

const BASE = 'https://www.dia-co.ir';

/**
 * JSON-LD اسکیما اختصاصی سازمان، دفاتر بین‌المللی و شبکه‌های اجتماعی
 * بهینه‌سازی شده برای دامنه www.dia-co.ir و نام رسمی «هلدینگ مهاجرتی دیاکو»
 */
export const OrganizationSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LegalService'],
    '@id': `${BASE}/#organization`,
    name: 'هلدینگ مهاجرتی دیاکو',
    alternateName: ['Diaco Immigration Holding', 'هلدینگ بین‌المللی دیاکو', 'دیاکو'],
    url: `${BASE}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE}/logo.png`,
      width: 512,
      height: 512,
      caption: 'هلدینگ مهاجرتی دیاکو',
    },
    image: `${BASE}/og-cover.jpg`,
    description:
      'سامانه رسمی هلدینگ مهاجرتی دیاکو؛ ارزیابی هوشمند شانس ویزا، اقامت تمکن مالی اتریش، کارت شانس آلمان، گلدن ویزای یونان و مهاجرت تحصیلی با نظارت وکلای پایه یک اتریش.',
    foundingDate: '2015',
    slogan: 'مسیر مطمئن مهاجرت به اروپا با تحلیل داده و وکلای مقیم',
    knowsAbout: [
      'اقامت تمکن مالی اتریش',
      'کارت قرمز-سفید-قرمز اتریش (RWR)',
      'کارت شانس کاریابی آلمان (Chancenkarte)',
      'کارت آبی اتحادیه اروپا (Blue Card)',
      'گلدن ویزای یونان و اسپانیا',
      'مهاجرت تحصیلی و بورسیه دانشگاه‌های اروپا',
      'ویزای دیجیتال نومد اروپا',
    ],
    areaServed: [
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Greece' },
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'Portugal' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Italy' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+98-21-91693955',
        contactType: 'customer service',
        areaServed: ['IR', 'AT', 'DE', 'GR', 'EU'],
        availableLanguage: ['Persian', 'English', 'German'],
        contactOption: 'TollFree',
      },
    ],
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Ausstellungsstraße 50',
        addressLocality: 'Vienna',
        postalCode: '1020',
        addressCountry: 'AT',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Grigoriou Lampraki 58, Glyfada',
        addressLocality: 'Athens',
        addressCountry: 'GR',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴',
        addressLocality: 'Tehran',
        postalCode: '19858',
        addressCountry: 'IR',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/diaco-holding',
      'https://www.instagram.com/diaco.holding',
      'https://t.me/diaco_holding',
      'https://www.youtube.com/@diaco_holding',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1847',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default OrganizationSchema;
