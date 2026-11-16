import React from 'react';

const BASE = 'https://www.dia-co.ir';

/**
 * JSON-LD اسکیما اختصاصی سازمان، دفاتر بین‌المللی، شبکه‌های اجتماعی و سوالات متداول (FAQ Schema)
 * بهینه‌سازی شده برای دامنه www.dia-co.ir و نام رسمی «هلدینگ مهاجرتی دیاکو»
 * منطبق بر استانداردهای ۲۰۲۶ موتورهای جستجو (Google Rich Snippets / FAQ Snippets / Review Snippets)
 */
export const OrganizationSchema: React.FC = () => {
  const orgSchema = {
    '@type': ['Organization', 'LegalService', 'ProfessionalService'],
    '@id': `${BASE}/#organization`,
    name: 'هلدینگ مهاجرتی دیاکو',
    alternateName: ['Diaco Immigration Holding', 'هلدینگ بین‌المللی دیاکو', 'دیاکو'],
    url: `${BASE}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${BASE}/#logo`,
      url: `${BASE}/logo.png`,
      width: 512,
      height: 512,
      caption: 'لوگوی رسمی هلدینگ مهاجرتی دیاکو',
    },
    image: [
      `${BASE}/og-cover.jpg`,
      `${BASE}/og-services-financial.jpg`,
      `${BASE}/og-services-work.jpg`,
      `${BASE}/og-services-investment.jpg`,
    ],
    description:
      'سامانه رسمی هلدینگ مهاجرتی دیاکو؛ بیش از ۱۱ سال سابقه رسمی (تأسیس ۱۳۹۴)، ۳۵ وکیل و مشاور حقوقی همکار و ۲,۱۵۰+ پرونده موفق در اقامت تمکن مالی اتریش، کارت شانس آلمان، گلدن ویزای یونان و مهاجرت تحصیلی.',
    foundingDate: '2015',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 35,
    },
    slogan: 'مسیر مطمئن مهاجرت به اروپا با تحلیل داده و وکلای مقیم',
    priceRange: '€€',
    telephone: '+98-21-91693955',
    email: 'info@dia-co.ir',
    knowsAbout: [
      'اقامت تمکن مالی اتریش (NAG §44)',
      'کارت قرمز-سفید-قرمز اتریش (Rot-Weiß-Rot)',
      'کارت شانس کاریابی آلمان (Chancenkarte)',
      'کارت آبی اتحادیه اروپا (EU Blue Card)',
      'گلدن ویزای یونان و اسپانیا (Golden Visa)',
      'مهاجرت تحصیلی و پذیرش دانشگاه‌های ممتاز اروپا',
      'ویزای دیجیتال نومد و خوداشتغالی اروپا',
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
      {
        '@type': 'ContactPoint',
        telephone: '+43-688-9763256',
        contactType: 'legal service',
        areaServed: 'AT',
        availableLanguage: ['German', 'English', 'Persian'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+98-919-7340829',
        contactType: 'emergency support',
        areaServed: ['IR', 'EU'],
        availableLanguage: ['Persian', 'English'],
      },
    ],
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Ausstellungsstraße 50/2.OG',
        addressLocality: 'Vienna',
        postalCode: '1020',
        addressRegion: 'Wien',
        addressCountry: 'AT',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Grigoriou Lampraki 58, Glyfada',
        addressLocality: 'Athens',
        postalCode: '166 75',
        addressRegion: 'Attica',
        addressCountry: 'GR',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴',
        addressLocality: 'Tehran',
        postalCode: '19858',
        addressRegion: 'Tehran',
        addressCountry: 'IR',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/diaco-holding',
      'https://www.instagram.com/diaco.holding',
      'https://t.me/diaco_holding',
      'https://www.youtube.com/@diaco_holding',
    ],
  };

  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `${BASE}/#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'سهمیه تمکن مالی اتریش در سال ۲۰۲۶ چگونه تخصیص می‌یابد؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'سهمیه تمکن مالی اتریش (Quotenkontingent) هر ساله بر اساس جمعیت ایالت‌ها تعیین می‌شود و در اولین روز کاری سال میلادی با ثبت رسمی در سفارت یا اداره MA35 تخصیص می‌یابد. آماده‌سازی مدارک باید پیش از این تاریخ انجام شده باشد.',
        },
      },
      {
        '@type': 'Question',
        name: 'شرایط کارت شانس کاریابی آلمان (Chancenkarte) چیست؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'کارت شانس آلمان با کسب حداقل ۶ امتیاز از معیارهای سن، مدرک تحصیلی معادل، مدرک زبان آلمانی یا انگلیسی و سابقه کار اعطا می‌شود و به متقاضی اجازه ۱ سال حضور برای یافتن کار می‌دهد.',
        },
      },
      {
        '@type': 'Question',
        name: 'حداقل مبلغ تمکن مالی اتریش برای سال ۲۰۲۶ چقدر است؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'مبلغ دقیق تمکن مالی اتریش سالانه توسط وزارت امور خارجه اتریش به‌روزرسانی می‌شود و بر اساس نرخ معیشت سالانه (Referenzbudget) محاسبه می‌گردد. برای متقاضی مجرد معمولاً مبلغی در حدود ۲۶ هزار یورو و برای هر عضو خانواده مبالغ افزوده در نظر گرفته می‌شود.',
        },
      },
      {
        '@type': 'Question',
        name: 'برای گلدن ویزای یونان چه میزان سرمایه‌گذاری لازم است؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'حداقل مبلغ سرمایه‌گذاری گلدن ویزای یونان بسته به منطقه جغرافیایی و نوع ملک متفاوت است و از ۲۵۰,۰۰۰ یورو در مناطق خاص تا ۸۰۰,۰۰۰ یورو در مناطق پرتقاضا مانند آتن و تسالونیکی متغیر است.',
        },
      },
      {
        '@type': 'Question',
        name: 'مشاوره با هلدینگ مهاجرتی دیاکو چگونه انجام می‌شود؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'شما می‌توانید با تکمیل فرم ارزیابی آنلاین در سایت www.dia-co.ir، پرونده خود را ثبت کنید. کارشناسان حقوقی دیاکو از طریق شماره ۰۲۱۹۱۶۹۳۹۵۵ یا پیام‌رسان واتس‌اپ پس از بررسی اولیه، جلسه مشاوره تخصصی با وکیل مقیم وین یا آتن را هماهنگ می‌کنند.',
        },
      },
    ],
  };

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [orgSchema, faqSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
    />
  );
};

export default OrganizationSchema;
