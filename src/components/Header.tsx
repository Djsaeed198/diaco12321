import React, { useState, useEffect, useRef, useMemo } from 'react';
import DiacoLogo from './DiacoLogo';
import { TRANSLATIONS, type Language, getStoredLanguage, setStoredLanguage } from '../utils/i18n';
import { searchPortal, type SearchItem } from '../utils/searchIndex';

export type PageType =
  | 'home'
  | 'german-blue-card'
  | 'spain-blue-card'
  | 'italy-blue-card'
  | 'austria-blue-card'
  | 'hungary-blue-card'
  // مهاجرت کادر درمان
  | 'medical-germany'
  | 'medical-austria-nursing'
  | 'medical-finland'
  | 'medical-denmark'
  // آوسبیلدونگ و دوره‌های زبان
  | 'ausbildung-germany'
  | 'language-spain'
  | 'language-france'
  | 'language-netherlands'
  | 'language-hungary'
  | 'colleges-hungary'
  | 'language-denmark'
  // ویزای استارت‌آپ
  | 'startup-canada'
  | 'startup-austria'
  | 'startup-germany'
  | 'startup-france'
  | 'startup-netherlands'
  | 'startup-finland'
  | 'startup-denmark'
  // شهروندی و پاسپورت دوم
  | 'citizenship-turkey'
  | 'citizenship-dominica'
  | 'citizenship-serbia'
  | 'citizenship-sao-tome'
  // ثبت شرکت و بیزینس
  | 'business-dubai'
  | 'business-austria'
  | 'business-netherlands'
  | 'business-france'
  | 'business-turkey'
  | 'business-greece'
  | 'business-poland'
  | 'business-portugal'
  | 'business-slovakia'
  | 'business-hungary'
  | 'business-latvia'
  // هنرمندان و نخبگان
  | 'artist-austria'
  | 'artist-germany'
  | 'talent-france'
  | 'artist-belgium'
  | 'artist-spain'
  // دیجیتال نوماد و فریلنسر
  | 'nomad-spain'
  | 'nomad-hungary'
  | 'nomad-croatia'
  | 'nomad-dubai'
  | 'freelance-germany'
  | 'selfemployed-finland'
  // تمکن مالی (خودحمایتی)
  | 'financial-austria'
  | 'financial-spain'
  | 'financial-france'
  // ویزای جستجوی کار
  | 'jobseeker-germany'
  | 'jobseeker-norway'
  | 'jobseeker-denmark'
  | 'jobseeker-austria'
  | 'austria-rwr'
  | 'jobseeker-portugal'
  // خرید ملک و ویزای طلایی
  | 'realestate-austria'
  | 'realestate-turkey'
  | 'realestate-france'
  | 'realestate-hungary'
  | 'realestate-greece'
  | 'realestate-latvia'
  | 'realestate-slovakia'
  // تحصیل در دانشگاه
  | 'academic-spain'
  | 'academic-uk'
  | 'academic-austria'
  | 'academic-austria-medical'
  | 'academic-netherlands'
  | 'academic-hungary'
  | 'academic-canada'
  // سامانه‌ها و ابزارهای هوشمند دیاکو
  | 'cost-calculator'
  | 'document-checker'
  | 'method-comparator'
  | 'immigration-timeline'
  | 'visa-comparator'
  | 'education-comparator'
  | 'after-arrival'
  | 'job-search'
  | 'country-guide'
  | 'visa-news'
  | 'online-consult'
  | 'blog'
  | 'blog-post'
  // صفحات اختصاصی کلیدی هلدینگ دیاکو
  | 'services'
  | 'interactive-map'
  | 'success-cases'
  | 'about-us'
  | 'podcasts'
  | 'contact-us';

interface Props {
  onOpenAssessment: () => void;
  currentPage?: PageType;
  onNavigateHome?: () => void;
  onNavigateToCountry?: (countryKey: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary') => void;
  onNavigateToBlueCard?: (countryKey?: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary') => void;
  onNavigateToPage?: (page: PageType) => void;
  onNavigateToBlogPost?: (slug: string) => void;
  lang?: Language;
  onToggleLanguage?: (lang: Language) => void;
}

const NAV_LINKS: { href: string; labelFa: string; labelEn: string; page?: PageType }[] = [
  { href: '/services', labelFa: 'خدمات ما', labelEn: 'Services', page: 'services' },
  { href: '/interactive-map', labelFa: 'نقشه پرونده‌ها', labelEn: 'Case Map', page: 'interactive-map' },
  { href: '/success-cases', labelFa: 'پرونده‌های موفق', labelEn: 'Success Stories', page: 'success-cases' },
  { href: '/blog', labelFa: 'وبلاگ و تحلیل‌ها', labelEn: 'Blog & Insights', page: 'blog' },
  { href: '/about-us', labelFa: 'درباره دیاکو', labelEn: 'About Diaco', page: 'about-us' },
  { href: '/podcasts', labelFa: 'رادیو مهاجرت', labelEn: 'Migration Radio', page: 'podcasts' },
  { href: '/contact-us', labelFa: 'تماس با ما', labelEn: 'Contact Us', page: 'contact-us' },
];

// تمامی ۱۱ روش قانونی اقامت و مهاجرت به اتریش (دفتر مرکزی وین)
export const AUSTRIA_METHODS: {
  page: PageType;
  title: string;
  tag: string;
  desc: string;
  icon: string;
}[] = [
  {
    page: 'financial-austria',
    title: 'اقامت تمکن مالی (خودحمایتی)',
    tag: 'NAG §44 | سهمیه سالانه',
    desc: 'اقامت بدون نیاز به کار بر پایه تمکن مالی و سپرده ارزی با بالاترین نرخ قبولی در دفتر وین',
    icon: '🏦',
  },
  {
    page: 'austria-rwr',
    title: 'کارت قرمز-سفید-قرمز (RWR Card)',
    tag: 'امتیازبندی ۵۵ تا ۷۰ امتیاز',
    desc: 'اقامت کاری مستقیم اتریش برای متخصصان، نخبگان و فارغ‌التحصیلان با قرارداد رسمی',
    icon: '🔴⚪🔴',
  },
  {
    page: 'austria-blue-card',
    title: 'بلوکارت اتحادیه اروپا اتریش',
    tag: 'حداقل حقوق قانونی ۲۰۲۶',
    desc: 'اقامت ویژه نخبگان دانشگاهی و متخصصان IT با اقامت دائم ۲۱ ماهه و الحاق همزمان خانواده',
    icon: '🇪🇺',
  },
  {
    page: 'business-austria',
    title: 'ثبت شرکت GmbH و بیزینس',
    tag: 'نهاد تجاری رسمی در وین',
    desc: 'ثبت شرکت با مسئولیت محدود، اقامت مدیرعامل، افتتاح حساب بانکی شرکتی اتریش',
    icon: '🏢',
  },
  {
    page: 'jobseeker-austria',
    title: 'ویزای جستجوی کار (Job Seeker)',
    tag: 'ویزای ۶ ماهه کاریابی',
    desc: 'فرصت ۶ ماهه حضور قانونی در اتریش جهت مصاحبه کاری و دریافت مستقیم کارت RWR',
    icon: '🔍',
  },
  {
    page: 'medical-austria-nursing',
    title: 'مهاجرت کادر درمان و پرستاران',
    tag: 'معادل‌سازی Nostrifizierung',
    desc: 'تاییدیه مدارک پزشکی و پیراپزشکی، دوره‌های تطبیقی و استخدام رسمی در مراکز درمانی اتریش',
    icon: '🩺',
  },
  {
    page: 'academic-austria',
    title: 'تحصیل در دانشگاه‌های دولتی اتریش',
    tag: 'شهریه دولتی €۷۶۰ ترمیک',
    desc: 'پذیرش مستقیم از دانشگاه وین (Uni Wien)، دانشگاه فنی (TU Wien) و گراتس با اجازه کار',
    icon: '🎓',
  },
  {
    page: 'academic-austria-medical',
    title: 'تحصیل پزشکی و دندانپزشکی (MedAT)',
    tag: 'آزمون ورودی سراسری اتریش',
    desc: 'دوره آمادگی آزمون مدات، ورود به دانشگاه علوم پزشکی وین (MedUni Wien) و اینسبروک',
    icon: '⚕️',
  },
  {
    page: 'startup-austria',
    title: 'ویزای استارت‌آپ اتریش',
    tag: 'حمایت سازمان AWS اتریش',
    desc: 'اقامت ۲ ساله موسسان شرکت‌های نوآور با طرح کسب‌وکار تاییدشده توسط سازمان ارتقای اقتصادی',
    icon: '🚀',
  },
  {
    page: 'artist-austria',
    title: 'اقامت هنرمندان و نخبگان اتریش',
    tag: 'بدون سهمیه و بدون مدرک زبان',
    desc: 'اقامت ویژه فعالان هنرهای تجسمی، موسیقی، طراحی، معماری و سینما با اثبات رزومه هنری',
    icon: '🎨',
  },
  {
    page: 'realestate-austria',
    title: 'خرید ملک و سرمایه‌گذاری ملکی',
    tag: 'وین و شهرهای درجه یک',
    desc: 'مشاوره خرید املاک لوکس و تجاری با اخذ مجوز ویژه استانداری وین (Grundverkehrsbehörde)',
    icon: '🏡',
  },
];

export const DIACO_COUNTRIES: {
  id: string;
  name: string;
  flag: string;
  badge?: string;
  desc: string;
  page: PageType;
}[] = [
  {
    id: 'austria',
    name: 'اتریش',
    flag: '🇦🇹',
    badge: 'دفتر مرکزی وین',
    desc: 'مقر اصلی وکلای دیاکو در Kärntner Ring 5-7 وین — ۱۱ روش مهاجرتی فعال',
    page: 'financial-austria',
  },
  {
    id: 'germany',
    name: 'آلمان',
    flag: '🇩🇪',
    badge: 'فرانکفورت / برلین',
    desc: 'بلوکارت، کارت شانس کاریابی، آوسبیلدونگ، کادر درمان و استارت‌آپ',
    page: 'german-blue-card',
  },
  {
    id: 'greece',
    name: 'یونان',
    flag: '🇬🇷',
    badge: 'دفتر رسمی آتن',
    desc: 'گلدن ویزای ۲۵۰k و ۸۰۰k یورو، خرید ملک، اقامت سه نسل و ثبت شرکت',
    page: 'realestate-greece',
  },
  {
    id: 'spain',
    name: 'اسپانیا',
    flag: '🇪🇸',
    badge: 'مادرید / بارسلونا',
    desc: 'بلوکارت، تمکن مالی (Non-Lucrative)، دوره‌های زبان، دیجیتال نوماد',
    page: 'spain-blue-card',
  },
  {
    id: 'italy',
    name: 'ایتالیا',
    flag: '🇮🇹',
    badge: 'میلان / رم',
    desc: 'بلوکارت ایتالیا، بورسیه استانی DSU و پذیرش دانشگاه‌های دولتی',
    page: 'italy-blue-card',
  },
  {
    id: 'netherlands',
    name: 'هلند',
    flag: '🇳🇱',
    badge: 'آمستردام',
    desc: 'ثبت شرکت BV هلند، استارت‌آپ ویزا، دوره‌های زبان و پذیرش تحصیلی',
    page: 'business-netherlands',
  },
  {
    id: 'france',
    name: 'فرانسه',
    flag: '🇫🇷',
    badge: 'پاریس',
    desc: 'ثبت شرکت SAS، ویزای تلنت پاسپورت، تمکن مالی و دوره‌های زبان',
    page: 'talent-france',
  },
  {
    id: 'hungary',
    name: 'مجارستان',
    flag: '🇭🇺',
    badge: 'بوداپست',
    desc: 'بلوکارت، ثبت شرکت Kft با مالیات ۹٪، دوره‌های کالج زبان و گلدن ویزا',
    page: 'hungary-blue-card',
  },
  {
    id: 'denmark',
    name: 'دانمارک',
    flag: '🇩🇰',
    badge: 'کپنهاگ',
    desc: 'کادر درمان، استارت‌آپ، دوره‌های زبان تخصصی و ویزای جستجوی کار',
    page: 'medical-denmark',
  },
  {
    id: 'finland',
    name: 'فنلاند',
    flag: '🇫🇮',
    badge: 'هلسینکی',
    desc: 'کادر درمان و پرستاران، اقامت خوداشتغالی و استارت‌آپ نوردیک',
    page: 'medical-finland',
  },
  {
    id: 'norway',
    name: 'نروژ',
    flag: '🇳🇴',
    badge: 'اسلو',
    desc: 'ویزای جستجوی کار برای متخصصین ماهر و حقوق پایه اسکاندیناوی',
    page: 'jobseeker-norway',
  },
  {
    id: 'portugal',
    name: 'پرتغال',
    flag: '🇵🇹',
    badge: 'لیسبون / پورتو',
    desc: 'ثبت شرکت تجاری و ویزای جستجوی کار پرتغال',
    page: 'business-portugal',
  },
  {
    id: 'poland',
    name: 'لهستان',
    flag: '🇵🇱',
    badge: 'ورشو',
    desc: 'ثبت شرکت تجاری (Sp. z o.o.) و اقامت کاری اروپا',
    page: 'business-poland',
  },
  {
    id: 'slovakia',
    name: 'اسلواکی',
    flag: '🇸🇰',
    badge: 'براتیسلاوا',
    desc: 'ثبت شرکت تجاری S.R.O. و خرید املاک با دسترسی به شنگن',
    page: 'business-slovakia',
  },
  {
    id: 'latvia',
    name: 'لتونی',
    flag: '🇱🇻',
    badge: 'ریگا',
    desc: 'ثبت شرکت تجاری SIA و خرید ملک جهت اقامت شنگن',
    page: 'business-latvia',
  },
  {
    id: 'belgium',
    name: 'بلژیک',
    flag: '🇧🇪',
    badge: 'بروکسل',
    desc: 'اقامت هنرمندان و حرفه‌های خلاق در قلب اتحادیه اروپا',
    page: 'artist-belgium',
  },
  {
    id: 'croatia',
    name: 'کرواسی',
    flag: '🇭🇷',
    badge: 'زاگرب',
    desc: 'ویزای اقامت دیجیتال نوماد شنگن با حداقل درآمد ماهانه',
    page: 'nomad-croatia',
  },
  {
    id: 'uk',
    name: 'انگلستان',
    flag: '🇬🇧',
    badge: 'لندن',
    desc: 'پذیرش تحصیلی دانشگاه‌های برتر بریتانیا و دوره‌های زبان فشرده',
    page: 'academic-uk',
  },
  {
    id: 'canada',
    name: 'کانادا',
    flag: '🇨🇦',
    badge: 'تورنتو / ونکوور',
    desc: 'استارت‌آپ ویزای فدرال کانادا با اقامت دائم (PR) و ویزای تحصیلی',
    page: 'startup-canada',
  },
  {
    id: 'dubai',
    name: 'امارات (دبی)',
    flag: '🇦🇪',
    badge: 'بیزینس بی دبی',
    desc: 'ثبت شرکت مناطق آزاد و سرزمین اصلی، اقامت طلایی ۱۰ ساله، دیجیتال نوماد',
    page: 'business-dubai',
  },
  {
    id: 'turkey',
    name: 'ترکیه',
    flag: '🇹🇷',
    badge: 'استانبول',
    desc: 'پاسپورت و شهروندی از طریق خرید ملک (۴۰۰k$) و ثبت شرکت',
    page: 'citizenship-turkey',
  },
  {
    id: 'dominica',
    name: 'دومینیکا',
    flag: '🇩🇲',
    badge: 'پاسپورت دوم',
    desc: 'اخذ تابعیت اقتصادی و پاسپورت قدرتمند کارائیب در کمتر از ۶ ماه',
    page: 'citizenship-dominica',
  },
  {
    id: 'serbia',
    name: 'صربستان',
    flag: '🇷🇸',
    badge: 'بلگراد',
    desc: 'اقامت از طریق ثبت شرکت و مسیرهای شهروندی بالکان',
    page: 'citizenship-serbia',
  },
  {
    id: 'sao-tome',
    name: 'سائوتومه',
    flag: '🇸🇹',
    badge: 'پاسپورت سریع',
    desc: 'برنامه سرمایه‌گذاری رسمی و اخذ شهروندی بدون شرط حضور',
    page: 'citizenship-sao-tome',
  },
];

export interface CountryMethod {
  page: PageType;
  title: string;
  tag: string;
  desc: string;
  icon: string;
}

export interface CountryDetail {
  id: string;
  name: string;
  flag: string;
  badge?: string;
  portalUrl?: string;
  portalLabel?: string;
  headline: string;
  subheadline: string;
  lawyerBadge?: string;
  methods: CountryMethod[];
}

export const COUNTRY_DETAILS: Record<string, CountryDetail> = {
  austria: {
    id: 'austria',
    name: 'اتریش',
    flag: '🇦🇹',
    badge: 'دفتر مرکزی وین',
    portalUrl: 'https://otrish-iran.ir',
    portalLabel: 'پرتال تخصصی Otrish-Iran.ir',
    headline: 'دفتر مرکزی اروپایی دیاکو در وین: Kärntner Ring 5-7, 1010 Wien',
    subheadline: 'جامع‌ترین خدمات اقامت، ویزا، خرید ملک و شرکت در اتریش با بیش از ۲۰ سال سابقه درخشان',
    lawyerBadge: '✓ وکیل رسمی کانون وکلای اتریش',
    methods: AUSTRIA_METHODS,
  },
  germany: {
    id: 'germany',
    name: 'آلمان',
    flag: '🇩🇪',
    badge: 'فرانکفورت / برلین',
    portalUrl: 'https://alman-iran.ir',
    portalLabel: 'پرتال تخصصی Alman-Iran.ir',
    headline: 'دپارتمان تخصصی مهاجرت کاری، بلوکارت و کادر درمان آلمان',
    subheadline: 'همکاری مستقیم با کانون وکلای فرانکفورت و مونیخ، بررسی تاییدیه ZAB و کاریابی ۲۰۲۶',
    lawyerBadge: '✓ همکاری با کانون وکلای آلمان',
    methods: [
      {
        page: 'german-blue-card',
        title: 'بلوکارت آلمان ۲۰۲۶ (EU Blue Card)',
        tag: 'حداقل حقوق €۴۸,۳۰۰',
        desc: 'اقامت کاری نخبگان و متخصصان دانشگاهی با اقامت دائم ۲۱ ماهه و الحاق همزمان همسر و فرزندان',
        icon: '🇩🇪',
      },
      {
        page: 'jobseeker-germany',
        title: 'کارت شانس کاریابی (Chancenkarte)',
        tag: 'سیستم امتیازبندی ۶ امتیاز',
        desc: 'ویزای ۱ ساله جستجوی کار قانونی در آلمان با امکان ۲۰ ساعت کار پاره‌وقت در هفته',
        icon: '🔍',
      },
      {
        page: 'ausbildung-germany',
        title: 'کارآموزی تخصصی (Ausbildung)',
        tag: 'حقوق ماهیانه حین آموزش',
        desc: 'دوره‌های ۳ ساله فنی و درمانی همراه با دریافت حقوق ماهیانه و استخدام قطعی پس از اتمام دوره',
        icon: '🎓',
      },
      {
        page: 'medical-germany',
        title: 'کادر درمان و پزشکان آلمان',
        tag: 'تاییدیه Approbation',
        desc: 'معادل‌سازی مدارک پزشکی و پرستاری و استخدام مستقیم در شبکه بیمارستانی و کلینیک‌های آلمان',
        icon: '🩺',
      },
      {
        page: 'startup-germany',
        title: 'استارت‌آپ و کارآفرینی آلمان',
        tag: 'تاییدیه اتاق بازرگانی IHK',
        desc: 'اقامت ۳ ساله موسسان کسب‌وکارهای نوآورانه بر پایه طرح توجیهی اقتصادی معتبر',
        icon: '🚀',
      },
      {
        page: 'freelance-germany',
        title: 'اقامت فریلنسری (Freiberufler)',
        tag: 'ویزای خوداشتغالی نخبگان',
        desc: 'اقامت قانونی برای فریلنسرها، مترجمان، مهندسان نرم‌افزار و هنرمندان مستقل',
        icon: '💻',
      },
      {
        page: 'artist-germany',
        title: 'اقامت هنرمندان آلمان (Künstlervisum)',
        tag: 'اقامت آزاد برلین',
        desc: 'اقامت ویژه هنرمندان تجسمی، موسیقی‌دانان، بازیگران و طراحان در پایتخت هنری اروپا',
        icon: '🎨',
      },
    ],
  },
  greece: {
    id: 'greece',
    name: 'یونان',
    flag: '🇬🇷',
    badge: 'دفتر رسمی آتن',
    portalUrl: 'https://greece-iran.ir',
    portalLabel: 'پرتال تخصصی Greece-Iran.ir',
    headline: 'دفتر رسمی دیاکو در آتن (Kolonaki) — مجری گلدن ویزای یونان',
    subheadline: 'اخذ اقامت دائم اروپا از طریق سرمایه‌گذاری ملکی و ثبت شرکت با حضور وکلای مقیم آتن',
    lawyerBadge: '✓ عضو کانون وکلای آتن',
    methods: [
      {
        page: 'realestate-greece',
        title: 'گلدن ویزای یونان (خرید ملک)',
        tag: 'سقف ۲۵۰k تا ۸۰۰k یورو',
        desc: 'اقامت دائم ۵ ساله شنگن برای ۳ نسل (متقاضی، فرزندان و والدین) بدون نیاز به حضور در یونان',
        icon: '🏛️',
      },
      {
        page: 'business-greece',
        title: 'ثبت شرکت تجاری در یونان',
        tag: 'نهاد تجاری رسمی اتحادیه اروپا',
        desc: 'تاسیس شرکت با مسئولیت محدود، اقامت مدیران، افتتاح حساب بانکی شرکتی و دسترسی به بازار اروپا',
        icon: '🏢',
      },
    ],
  },
  spain: {
    id: 'spain',
    name: 'اسپانیا',
    flag: '🇪🇸',
    badge: 'مادرید / بارسلونا',
    portalUrl: 'https://spain-iran.ir',
    portalLabel: 'پرتال تخصصی Spain-Iran.ir',
    headline: 'دپارتمان تخصصی اقامت تمکن مالی، بلوکارت و دوره‌های زبان اسپانیا',
    subheadline: 'اقامت در بارسلونا و مادرید با همراهی وکلای رسمی مهاجرتی اسپانیا',
    lawyerBadge: '✓ همکاری با وکلای مادرید',
    methods: [
      {
        page: 'spain-blue-card',
        title: 'بلوکارت اسپانیا ۲۰۲۶',
        tag: 'قرارداد کاری رسمی',
        desc: 'اقامت کاری نخبگان، مهندسان و متخصصان IT با امکان اخذ اقامت دائم اروپا',
        icon: '🇪🇸',
      },
      {
        page: 'financial-spain',
        title: 'تمکن مالی (Non-Lucrative)',
        tag: 'بدون نیاز به سرمایه‌گذاری',
        desc: 'اقامت خودحمایتی اسپانیا بر پایه اثبات موجودی بانکی و درآمد ماهانه ثابت در ایران',
        icon: '🏦',
      },
      {
        page: 'language-spain',
        title: 'دوره‌های کالج زبان اسپانیا',
        tag: 'ویزای تحصیلی ۱ ساله',
        desc: 'یادگیری زبان اسپانیایی در مادرید، بارسلونا و والنسیا با امکان تبدیل به اقامت کاری',
        icon: '🎓',
      },
      {
        page: 'nomad-spain',
        title: 'ویزای دیجیتال نوماد اسپانیا',
        tag: 'قانون مالیاتی بکهام',
        desc: 'اقامت ۳ ساله برای دورکاران، برنامه‌نویسان و فریلنسرهای شرکت‌های بین‌المللی',
        icon: '💻',
      },
      {
        page: 'academic-spain',
        title: 'تحصیل در دانشگاه‌های اسپانیا',
        tag: 'شهریه مناسب دولتی',
        desc: 'پذیرش در دانشگاه‌های معتبر بارسلونا و مادرید با اجازه کار پاره‌وقت دانشجویی',
        icon: '📚',
      },
      {
        page: 'artist-spain',
        title: 'اقامت هنرمندان اسپانیا',
        tag: 'اثبات فعالیت هنری',
        desc: 'اقامت ویژه هنرمندان، طراحان و فعالان فرهنگی با ارائه نمونه‌کارها و سوابق بین‌المللی',
        icon: '🎨',
      },
    ],
  },
  italy: {
    id: 'italy',
    name: 'ایتالیا',
    flag: '🇮🇹',
    badge: 'میلان / رم',
    headline: 'دپارتمان حقوقی بلوکارت و پذیرش دانشگاهی ایتالیا',
    subheadline: 'اقامت کاری نخبگان و تحصیل دانشگاهی با پوشش بورسیه کامل استانی DSU',
    lawyerBadge: '✓ وکلای مهاجرت میلان',
    methods: [
      {
        page: 'italy-blue-card',
        title: 'بلوکارت اتحادیه اروپا ایتالیا',
        tag: 'Carta Blu UE',
        desc: 'اقامت کاری ۲ ساله قابل تمدید با قرارداد کاری رسمی، حداقل حقوق قانونی و الحاق همزمان خانواده',
        icon: '🇮🇹',
      },
    ],
  },
  netherlands: {
    id: 'netherlands',
    name: 'هلند',
    flag: '🇳🇱',
    badge: 'آمستردام',
    headline: 'دپارتمان ثبت شرکت BV و مهاجرت کارآفرینی به هلند',
    subheadline: 'اقامت کاری در یکی از پایدارترین اقتصادهای اروپا با سیستم حقوقی پیشرفته',
    lawyerBadge: '✓ وکلای تجاری آمستردام',
    methods: [
      {
        page: 'business-netherlands',
        title: 'ثبت شرکت BV هلند',
        tag: 'نهاد تجاری معتبر بین‌المللی',
        desc: 'تاسیس شرکت تجاری در آمستردام یا روتردام، اقامت کارآفرینی و افتتاح حساب بانکی شرکتی',
        icon: '🇳🇱',
      },
      {
        page: 'startup-netherlands',
        title: 'استارت‌آپ ویزای هلند',
        tag: 'تاییدیه Facilitator هلندی',
        desc: 'اقامت ۱ ساله برای بنیان‌گذاران نوآور در اکوسیستم فناوری هلند با قابلیت تمدید به اقامت خوداشتغالی',
        icon: '🚀',
      },
      {
        page: 'language-netherlands',
        title: 'دوره‌های زبان و پیش‌دانشگاهی هلند',
        tag: 'آمادگی دانشگاه‌های برتر',
        desc: 'دوره‌های فشرده زبان انگلیسی و پیش‌نیازهای ورود به دانشگاه‌های رنکینگ بالای هلند',
        icon: '🎓',
      },
      {
        page: 'academic-netherlands',
        title: 'تحصیل در دانشگاه‌های هلند',
        tag: 'رشته‌های انگلیسی‌زبان',
        desc: 'پذیرش از دانشگاه‌های آمستردام، دلفت و لایدن با فرصت جستجوی کار پس از تحصیل (Zoekjaar)',
        icon: '📚',
      },
    ],
  },
  france: {
    id: 'france',
    name: 'فرانسه',
    flag: '🇫🇷',
    badge: 'پاریس',
    headline: 'دپارتمان ثبت شرکت SAS، تلنت پاسپورت و تمکن مالی فرانسه',
    subheadline: 'اقامت در فرانسه زیر نظر وکلای رسمی مستقر در پاریس',
    lawyerBadge: '✓ وکلای رسمی پاریس',
    methods: [
      {
        page: 'business-france',
        title: 'ثبت شرکت SAS فرانسه',
        tag: 'اقامت تجاری در پاریس',
        desc: 'تاسیس شرکت تجاری با سرمایه اولیه منعطف، اقامت مدیرعامل و افتتاح حساب بانکی شرکتی فرانسه',
        icon: '🇫🇷',
      },
      {
        page: 'talent-france',
        title: 'ویزای تلنت پاسپورت (Passeport Talent)',
        tag: 'اقامت ۴ ساله نخبگان',
        desc: 'اقامت چندساله ویژه کارآفرینان، متخصصان برجسته، مدیران شرکت‌ها و پژوهشگران',
        icon: '⭐',
      },
      {
        page: 'financial-france',
        title: 'اقامت تمکن مالی فرانسه (Visiteur)',
        tag: 'اقامت بدون نیاز به کار',
        desc: 'اقامت فرانسه بر پایه درآمد ماهانه و سپرده ارزی بدون نیاز به سرمایه‌گذاری ملکی یا شرکتی',
        icon: '🏦',
      },
      {
        page: 'language-france',
        title: 'دوره‌های زبان فرانسه در پاریس',
        tag: 'ویزای دانشجویی زبان',
        desc: 'ثبت‌نام در موسسات معتبر زبان فرانسه در پاریس، نیس و لیون با امکان تمدید سالانه',
        icon: '🎓',
      },
      {
        page: 'realestate-france',
        title: 'خرید ملک در فرانسه',
        tag: 'سرمایه‌گذاری املاک',
        desc: 'مشاوره خرید آپارتمان در پاریس و سواحل جنوب فرانسه با انجام استعلامات رسمی دفاتر اسناد فرانسه',
        icon: '🏡',
      },
    ],
  },
  hungary: {
    id: 'hungary',
    name: 'مجارستان',
    flag: '🇭🇺',
    badge: 'بوداپست',
    portalUrl: 'https://hu-ir.ir',
    portalLabel: 'پرتال تخصصی HU-IR.ir',
    headline: 'دپارتمان بلوکارت، ثبت شرکت ۹٪ مالیات و کالج‌های بوداپست',
    subheadline: 'پایین‌ترین نرخ مالیات شرکتی در اتحادیه اروپا و کالج‌های زبان و پیش‌پزشکی معتبر',
    lawyerBadge: '✓ وکلای همکار بوداپست',
    methods: [
      {
        page: 'hungary-blue-card',
        title: 'بلوکارت مجارستان ۲۰۲۶',
        tag: 'اقامت کاری شنگن',
        desc: 'اقامت کاری نخبگان و مهندسان با پروسه صدور سریع‌تر و شرایط حقوقی مناسب',
        icon: '🇭🇺',
      },
      {
        page: 'business-hungary',
        title: 'ثبت شرکت Kft با ۹٪ مالیات',
        tag: 'کمترین مالیات اروپا',
        desc: 'تاسیس نهاد تجاری در بوداپست با نرخ مالیات شرکتی ۹ درصد و اخذ اقامت شنگن برای مدیر',
        icon: '🏢',
      },
      {
        page: 'colleges-hungary',
        title: 'کالج‌های پیش‌پزشکی و زبان بوداپست',
        tag: 'پری‌مدیکال و زبان',
        desc: 'دوره‌های کالج مک‌دنیل، اویسینا و دونا جهت ورود به دانشگاه‌های علوم پزشکی سملوایز و سگد',
        icon: '🎓',
      },
      {
        page: 'language-hungary',
        title: 'دوره‌های زبان انگلیسی و مجاری',
        tag: 'ویزای تحصیلی شنگن',
        desc: 'دوره زبان ۱ ساله با هزینه زندگی بسیار پایین و امکان سفر آزادانه به کل ۲۹ کشور شنگن',
        icon: '📚',
      },
      {
        page: 'nomad-hungary',
        title: 'دیجیتال نوماد (White Card)',
        tag: 'کارت سفید مجارستان',
        desc: 'اقامت ویژه متخصصان دورکار و فریلنسرها با حداقل درآمد ثابت ماهانه ۲۰۰۰ یورو',
        icon: '💻',
      },
      {
        page: 'realestate-hungary',
        title: 'گلدن ویزا و خرید ملک بوداپست',
        tag: 'سرمایه‌گذاری املاک شنگن',
        desc: 'خرید آپارتمان‌های نوساز در پایتخت مجارستان و دریافت اقامت اقامتی اتحادیه اروپا',
        icon: '🏡',
      },
    ],
  },
  denmark: {
    id: 'denmark',
    name: 'دانمارک',
    flag: '🇩🇰',
    badge: 'کپنهاگ',
    headline: 'دپارتمان کادر درمان، استارت‌آپ و کاریابی دانمارک',
    subheadline: 'بالاترین کیفیت زندگی و رفاه اجتماعی اروپا با جذب تخصصی نیروهای ماهر',
    lawyerBadge: '✓ مشاوران رسمی دانمارک',
    methods: [
      {
        page: 'medical-denmark',
        title: 'کادر درمان و پزشکان (Positive List)',
        tag: 'مجوز اداره بهداشت دانمارک',
        desc: 'معادل‌سازی تخصص پزشکی و پرستاری، دوره‌های زبان دانمارکی رایگان و استخدام با بالاترین حقوق اروپا',
        icon: '🇩🇰',
      },
      {
        page: 'jobseeker-denmark',
        title: 'ویزای جستجوی کار دانمارک',
        tag: 'فهرست مشاغل پرتقاضا',
        desc: 'فرصت کاریابی در کپنهاگ برای فارغ‌التحصیلان و مهندسان بر پایه سیستم جذب نیروی ماهر',
        icon: '🔍',
      },
      {
        page: 'startup-denmark',
        title: 'استارت‌آپ دانمارک (Startup Denmark)',
        tag: 'تاییدیه هیئت نوآوری',
        desc: 'اقامت ۲ ساله کارآفرینان و تیم‌های استارت‌آپی با تایید طرح تجاری توسط وزارت بازرگانی دانمارک',
        icon: '🚀',
      },
      {
        page: 'language-denmark',
        title: 'دوره‌های زبان و کالج‌های دانمارک',
        tag: 'یادگیری دانمارکی و انگلیسی',
        desc: 'دوره‌های آمادگی زبان در کپنهاگ با امکان تبدیل به اقامت تحصیلی یا کاری',
        icon: '🎓',
      },
    ],
  },
  finland: {
    id: 'finland',
    name: 'فنلاند',
    flag: '🇫🇮',
    badge: 'هلسینکی',
    headline: 'دپارتمان کادر درمان، خوداشتغالی و استارت‌آپ فنلاند',
    subheadline: 'امن‌ترین و شادترین کشور جهان با شرایط بی‌نظیر رفاهی و آموزشی برای فرزندان',
    methods: [
      {
        page: 'medical-finland',
        title: 'مهاجرت کادر درمان و پرستاران',
        tag: 'معادل‌سازی Valvira',
        desc: 'جذب مستقیم پرستاران و پزشکان در مراکز درمانی هلسینکی با دوره‌های آموزش زبان فنلاندی',
        icon: '🇫🇮',
      },
      {
        page: 'selfemployed-finland',
        title: 'اقامت خوداشتغالی فنلاند',
        tag: 'کسب‌وکار فردی و تخصصی',
        desc: 'اقامت برای متخصصان، مشاوران و مهندسان با ثبت فعالیت تجاری مستقل در فنلاند',
        icon: '💼',
      },
      {
        page: 'startup-finland',
        title: 'استارت‌آپ ویزای فنلاند',
        tag: 'حمایت Business Finland',
        desc: 'اقامت ۲ ساله موسسان استارت‌آپ در پیشرفته‌ترین هاب فناوری شمال اروپا',
        icon: '🚀',
      },
    ],
  },
  norway: {
    id: 'norway',
    name: 'نروژ',
    flag: '🇳🇴',
    badge: 'اسلو',
    headline: 'ویزای جستجوی کار متخصصان ماهر نروژ',
    subheadline: 'بالاترین حقوق پایه در اسکاندیناوی و فرصت استقرار شغلی در اسلو و برگن',
    methods: [
      {
        page: 'jobseeker-norway',
        title: 'ویزای کاریابی نروژ',
        tag: 'فرصت ۶ ماهه کاریابی',
        desc: 'اقامت قانونی جهت مصاحبه کاری و انعقاد قرارداد با شرکت‌های صنعتی و مهندسی نروژ',
        icon: '🇳🇴',
      },
    ],
  },
  portugal: {
    id: 'portugal',
    name: 'پرتغال',
    flag: '🇵🇹',
    badge: 'لیسبون / پورتو',
    portalUrl: 'https://iran-portugal.ir',
    portalLabel: 'پرتال تخصصی Iran-Portugal.ir',
    headline: 'ثبت شرکت تجاری و ویزای جستجوی کار پرتغال',
    subheadline: 'مسیر ۵ ساله تا دریافت پاسپورت قدرتمند اتحادیه اروپا',
    methods: [
      {
        page: 'business-portugal',
        title: 'ثبت شرکت تجاری در پرتغال',
        tag: 'شرکت تجاری Lda',
        desc: 'تاسیس شرکت، اقامت کارآفرینی، افتتاح حساب بانکی و مدیریت بیزینس در لیسبون و پورتو',
        icon: '🇵🇹',
      },
      {
        page: 'jobseeker-portugal',
        title: 'ویزای جستجوی کار پرتغال',
        tag: 'ویزای کاریابی ۱۲۰ روزه',
        desc: 'ویزای رسمی کاریابی در پرتغال با امکان تمدید ۶۰ روزه و تبدیل به اقامت کاری موقت',
        icon: '🔍',
      },
    ],
  },
  poland: {
    id: 'poland',
    name: 'لهستان',
    flag: '🇵🇱',
    badge: 'ورشو',
    headline: 'ثبت شرکت تجاری و بیزینس در لهستان',
    subheadline: 'بزرگ‌ترین بازار تولیدی و لجستیک اروپای مرکزی با هزینه‌های ثبت اقتصادی',
    methods: [
      {
        page: 'business-poland',
        title: 'ثبت شرکت Sp. z o.o. لهستان',
        tag: 'اقامت تجاری شنگن',
        desc: 'ثبت رسمی شرکت تجاری، اخذ کارت اقامت (Karta Pobytu) برای مدیر و افتتاح حساب تجاری',
        icon: '🇵🇱',
      },
    ],
  },
  slovakia: {
    id: 'slovakia',
    name: 'اسلوواکی',
    flag: '🇸🇰',
    badge: 'براتیسلاوا',
    headline: 'ثبت شرکت و خرید ملک تجاری در اسلوواکی',
    subheadline: 'فاصله ۵۰ کیلومتری تا وین اتریش با هزینه‌های مقرون‌به‌صرفه حفظ اقامت اروپا',
    methods: [
      {
        page: 'business-slovakia',
        title: 'ثبت شرکت S.R.O. اسلوواکی',
        tag: 'اقامت تجاری اقتصادی',
        desc: 'تاسیس شرکت تجاری در براتیسلاوا با امکان تردد روزانه به وین و اخذ اقامت شنگن',
        icon: '🇸🇰',
      },
      {
        page: 'realestate-slovakia',
        title: 'خرید املاک تجاری اسلوواکی',
        tag: 'سرمایه‌گذاری ملکی',
        desc: 'خرید املاک مسکونی و تجاری در براتیسلاوا با دسترسی سریع به پایتخت اتریش',
        icon: '🏡',
      },
    ],
  },
  latvia: {
    id: 'latvia',
    name: 'لتونی',
    flag: '🇱🇻',
    badge: 'ریگا',
    headline: 'ثبت شرکت تجاری و خرید ملک در حوزه بالتیک',
    subheadline: 'سریع‌ترین و کم‌هزینه‌ترین مسیرهای اخذ اقامت و تردد آزاد در ۲۹ کشور شنگن',
    methods: [
      {
        page: 'business-latvia',
        title: 'ثبت شرکت تجاری SIA لتونی',
        tag: 'اقامت تجاری بالتیک',
        desc: 'ثبت شرکت تجاری در ریگا، افتتاح حساب بانکی اروپایی و اخذ کارت اقامت شنگن',
        icon: '🇱🇻',
      },
      {
        page: 'realestate-latvia',
        title: 'اقامت با خرید ملک در لتونی',
        tag: 'سرمایه‌گذاری املاک ریگا',
        desc: 'خرید املاک معتبر با استعلام ثبتی و دریافت اقامت قابل تمدید ۵ ساله شنگن',
        icon: '🏡',
      },
    ],
  },
  belgium: {
    id: 'belgium',
    name: 'بلژیک',
    flag: '🇧🇪',
    badge: 'بروکسل',
    headline: 'اقامت هنرمندان و نخبگان فرهنگی در بلژیک',
    subheadline: 'اقامت در پایتخت سیاسی اتحادیه اروپا برای هنرمندان و متخصصان خلاق',
    methods: [
      {
        page: 'artist-belgium',
        title: 'اقامت هنرمندان بلژیک',
        tag: 'پایتخت اتحادیه اروپا',
        desc: 'اقامت ویژه فعالان هنرهای تجسمی، موسیقی، طراحی و فیلم‌سازی با ارائه رزومه هنری',
        icon: '🇧🇪',
      },
    ],
  },
  croatia: {
    id: 'croatia',
    name: 'کرواسی',
    flag: '🇭🇷',
    badge: 'زاگرب',
    headline: 'ویزای اقامت دیجیتال نوماد شنگن در کرواسی',
    subheadline: 'اقامت قانونی در حوزه شنگن با هزینه‌های زندگی مناسب و طبیعت زیبای آدریاتیک',
    methods: [
      {
        page: 'nomad-croatia',
        title: 'اقامت دیجیتال نوماد کرواسی',
        tag: 'اقامت ۱ ساله معاف از مالیات',
        desc: 'اقامت رسمی شنگن برای دورکاران شرکت‌های بین‌المللی با اثبات درآمد ماهانه مستقل',
        icon: '🇭🇷',
      },
    ],
  },
  uk: {
    id: 'uk',
    name: 'انگلستان',
    flag: '🇬🇧',
    badge: 'لندن',
    portalUrl: 'https://ukiran.ir',
    portalLabel: 'پرتال تخصصی UKIran.ir',
    headline: 'پذیرش دانشگاه‌های برتر بریتانیا و دوره‌های زبان فشرده',
    subheadline: 'همراهی در اخذ ویزای تحصیلی Student Visa و مجوز کار فارغ‌التحصیلی ۲ ساله (Graduate Route)',
    methods: [
      {
        page: 'academic-uk',
        title: 'تحصیل در دانشگاه‌های انگلستان',
        tag: 'مقطع کارشناسی و ارشد',
        desc: 'پذیرش از دانشگاه‌های گروه راسل لندن، منچستر و بیرمنگام با امکان ۲ سال کار پس از فارغ‌التحصیلی',
        icon: '🇬🇧',
      },
    ],
  },
  canada: {
    id: 'canada',
    name: 'کانادا',
    flag: '🇨🇦',
    badge: 'تورنتو / ونکوور',
    headline: 'استارت‌آپ ویزای فدرال کانادا (SUV) و پذیرش تحصیلی',
    subheadline: 'مسیر مستقیم دریافت اقامت دائم (PR) برای متقاضی و اعضای خانواده در سریع‌ترین زمان',
    methods: [
      {
        page: 'startup-canada',
        title: 'استارت‌آپ ویزای کانادا (SUV)',
        tag: 'اقامت دائم مستقیم (PR)',
        desc: 'اخذ نامه حمایتی انکوباتور/انجل اینوستور معتمد دولت فدرال کانادا و دریافت PR همزمان خانواده',
        icon: '🇨🇦',
      },
      {
        page: 'academic-canada',
        title: 'تحصیل در کالج‌ها و دانشگاه‌های کانادا',
        tag: 'اجازه کار پس از تحصیل (PGWP)',
        desc: 'پذیرش از کالج‌ها و دانشگاه‌های انتاریو و بریتیش کلمبیا با مجوز کار پس از اتمام دوره',
        icon: '🎓',
      },
    ],
  },
  dubai: {
    id: 'dubai',
    name: 'امارات (دبی)',
    flag: '🇦🇪',
    badge: 'بیزینس بی دبی',
    headline: 'ثبت شرکت تجاری، اقامت طلایی و دیجیتال نوماد دبی',
    subheadline: 'معافیت کامل از مالیات بر درآمد، افتتاح حساب بانکی امارات و ثبت سریع شرکت',
    methods: [
      {
        page: 'business-dubai',
        title: 'ثبت شرکت در دبی (Mainland & Freezone)',
        tag: 'اقامت ۲ ساله قابل تمدید',
        desc: 'تاسیس شرکت بازرگانی، خدماتی یا IT در دبی، اخذ کارت اقامت امارات و حساب بانکی شرکتی',
        icon: '🇦🇪',
      },
      {
        page: 'nomad-dubai',
        title: 'ویزای دیجیتال نوماد دبی',
        tag: 'اقامت ۱ ساله دورکاری',
        desc: 'اقامت در دبی بدون نیاز به اسپانسر محلی برای کارمندان و فریلنسرهای شرکت‌های بین‌المللی',
        icon: '💻',
      },
    ],
  },
  turkey: {
    id: 'turkey',
    name: 'ترکیه',
    flag: '🇹🇷',
    badge: 'استانبول',
    headline: 'اخذ پاسپورت و شهروندی ترکیه، خرید ملک و ثبت شرکت',
    subheadline: 'دریافت شناسنامه و پاسپورت رسمی ترکیه در کمتر از ۴ ماه برای تمام اعضای خانواده',
    methods: [
      {
        page: 'citizenship-turkey',
        title: 'شهروندی و پاسپورت با خرید ملک',
        tag: 'سرمایه‌گذاری $۴۰۰,۰۰۰',
        desc: 'خرید آپارتمان سنددار در استانبول و ازمیر و اخذ تابعیت دائم و قطعی برای کل خانواده',
        icon: '🇹🇷',
      },
      {
        page: 'business-turkey',
        title: 'ثبت شرکت تجاری در ترکیه',
        tag: 'شرکت مسئولیت محدود (Limited)',
        desc: 'ثبت شرکت، اقامت کاری و افتتاح حساب‌های بانکی شرکتی لیر، دلار و یورو',
        icon: '🏢',
      },
      {
        page: 'realestate-turkey',
        title: 'خرید ملک مسکونی در ترکیه',
        tag: 'سرمایه‌گذاری املاک',
        desc: 'مشاوره خرید املاک نوساز در بهترین محله‌های استانبول با کارشناسی رسمی نوتیفای‌شده',
        icon: '🏡',
      },
    ],
  },
  dominica: {
    id: 'dominica',
    name: 'دومینیکا',
    flag: '🇩🇲',
    badge: 'پاسپورت دوم',
    headline: 'پاسپورت دوم و تابعیت اقتصادی مادام‌العمر دومینیکا',
    subheadline: 'سفر بدون ویزا به بیش از ۱۴۰ کشور جهان بدون نیاز به سفر، مصاحبه یا شرط حضور',
    methods: [
      {
        page: 'citizenship-dominica',
        title: 'پاسپورت بیومتریک دومینیکا',
        tag: 'اخذ تابعیت در ۴ تا ۶ ماه',
        desc: 'تابعیت دائم و موروثی از طریق کمک به صندوق توسعه اقتصادی (EDF) یا سرمایه‌گذاری ملکی',
        icon: '🇩🇲',
      },
    ],
  },
  serbia: {
    id: 'serbia',
    name: 'صربستان',
    flag: '🇷🇸',
    badge: 'بلگراد',
    headline: 'اقامت اروپا از طریق ثبت شرکت و بیزینس در صربستان',
    subheadline: 'دروازه ورودی به منطقه بالکان با پروسه اداری آسان و افتتاح حساب بانکی تجاری',
    methods: [
      {
        page: 'citizenship-serbia',
        title: 'ثبت شرکت تجاری و اقامت صربستان',
        tag: 'اقامت تجاری در بلگراد',
        desc: 'تاسیس شرکت، اقامت سالانه قابل تمدید و حساب بانکی برای مبادلات مالی بین‌المللی',
        icon: '🇷🇸',
      },
    ],
  },
  'sao-tome': {
    id: 'sao-tome',
    name: 'سائوتومه',
    flag: '🇸🇹',
    badge: 'پاسپورت سریع',
    headline: 'برنامه رسمی سرمایه‌گذاری و اخذ شهروندی اقتصادی سائوتومه',
    subheadline: 'پاسپورت دوم بین‌المللی با سرعت پردازش بالا و حداقل مبالغ سرمایه‌گذاری',
    methods: [
      {
        page: 'citizenship-sao-tome',
        title: 'پاسپورت سرمایه‌گذاری سائوتومه',
        tag: 'شهروندی سریع',
        desc: 'اخذ تابعیت دوم برای تسهیل فعالیت‌های تجاری، بانکی و سفرهای بین‌المللی',
        icon: '🇸🇹',
      },
    ],
  },
};

export const Header: React.FC<Props> = ({
  onOpenAssessment,
  currentPage = 'home',
  onNavigateHome,
  onNavigateToCountry,
  onNavigateToBlueCard,
  onNavigateToPage,
  onNavigateToBlogPost,
  lang: controlledLang,
  onToggleLanguage,
}) => {
  const [internalLang, setInternalLang] = useState<Language>(() => getStoredLanguage());
  const currentLang = controlledLang ?? internalLang;
  const t = TRANSLATIONS[currentLang];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [countriesMenuOpen, setCountriesMenuOpen] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('austria');
  const [mobileCountriesOpen, setMobileCountriesOpen] = useState(false);
  const [mobileAustriaOpen, setMobileAustriaOpen] = useState(true);
  const countriesDropdownRef = useRef<HTMLDivElement>(null);

  // Search Bar States
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState<'all' | 'service' | 'country' | 'article' | 'tool'>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const rawSearchResults = useMemo(() => {
    return searchPortal(searchQuery, currentLang);
  }, [searchQuery, currentLang]);

  const filteredResults = useMemo(() => {
    if (searchFilter === 'all') return rawSearchResults;
    return rawSearchResults.filter((item) => item.type === searchFilter);
  }, [rawSearchResults, searchFilter]);

  const handleLanguageToggle = (targetLang?: Language) => {
    const next = targetLang ?? (currentLang === 'fa' ? 'en' : 'fa');
    setStoredLanguage(next);
    setInternalLang(next);
    if (onToggleLanguage) {
      onToggleLanguage(next);
    }
  };

  const handleSelectSearchResult = (item: SearchItem) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (item.blogSlug) {
      if (onNavigateToBlogPost) {
        onNavigateToBlogPost(item.blogSlug);
      } else {
        window.location.pathname = `/blog/${item.blogSlug}`;
      }
    } else if (item.page) {
      handleSelectPage(item.page);
    }
  };

  // Keyboard shortcut Ctrl+K / Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  const isAustriaPage = AUSTRIA_METHODS.some((m) => m.page === currentPage);
  const isAnyCountryPage = isAustriaPage || DIACO_COUNTRIES.some((c) => c.page === currentPage);

  const handleSelectPage = (page: PageType) => {
    setCountriesMenuOpen(false);
    setMenuOpen(false);
    if (onNavigateToPage) {
      onNavigateToPage(page);
    } else {
      window.location.pathname = `/${page}`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countriesDropdownRef.current && !countriesDropdownRef.current.contains(e.target as Node)) {
        setCountriesMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08222b]/95 shadow-soft backdrop-blur-xl border-b border-white/10'
          : 'bg-[#0b2933]/95 backdrop-blur-md border-b border-white/10'
      }`}
      dir={currentLang === 'fa' ? 'rtl' : 'ltr'}
    >
      {/* نوار بالایی اعلامیه‌ها و افتخارات (برگرفته از بنر رسمی دیاکو) */}
      <div className="hidden lg:block bg-[#05181f] border-b border-white/10 py-1.5 px-4 text-[11px] text-slate-300">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-300 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5a623] animate-pulse" />
              {currentLang === 'fa'
                ? 'هلدینگ مهاجرتی دیاکو — با بیش از ۲۰ سال تجربه موفق در امور مهاجرت'
                : 'Diaco Migration Holding — Over 20 Years of Proven European Legal Experience'}
            </span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">
              {currentLang === 'fa' ? 'دفاتر رسمی در وین، آتن و تهران' : 'Official Offices in Vienna, Athens & Tehran'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center flex-wrap gap-1 text-slate-400 text-[10px]">
              <span className="text-emerald-400">✓</span>
              <span>{currentLang === 'fa' ? 'پرتال‌های تخصصی:' : 'Specialized Hubs:'}</span>
              <a href="https://otrish-iran.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">Otrish-Iran</a>
              <span>•</span>
              <a href="https://alman-iran.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">Alman-Iran</a>
              <span>•</span>
              <a href="https://spain-iran.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">Spain-Iran</a>
              <span>•</span>
              <a href="https://ukiran.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">UKIran</a>
              <span>•</span>
              <a href="https://hu-ir.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">HU-IR</a>
              <span>•</span>
              <a href="https://greece-iran.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">Greece-Iran</a>
              <span>•</span>
              <a href="https://iran-portugal.ir" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition underline decoration-slate-600">Iran-Portugal</a>
            </div>
            <a
              href="https://wa.me/989197340829"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
            >
              <span>{t.whatsappSupport}</span>
              <span>💬</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 py-2.5 md:px-8">
        {/* برند و لوگو */}
        <a
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
              else window.location.pathname = '/';
            }
          }}
          className={`flex items-center gap-3 group cursor-pointer ${currentLang === 'fa' ? 'text-right' : 'text-left'}`}
        >
          <DiacoLogo size={42} />
          <div className="leading-tight">
            <span className="block text-[15px] sm:text-[17px] font-black text-white">
              {currentLang === 'fa' ? 'هلدینگ بین‌المللی دیاکو' : 'Diaco International Holding'}
            </span>
          </div>
        </a>

        {/* منوی دسکتاپ */}
        <nav className="hidden xl:flex xl:items-center xl:gap-1" aria-label="منوی اصلی">
          <a
            href="/"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                if (onNavigateHome) onNavigateHome();
                else window.location.pathname = '/';
              }
            }}
            className={`rounded-xl px-2.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              currentPage === 'home'
                ? 'bg-white/10 text-amber-300'
                : 'text-slate-200 hover:bg-white/10 hover:text-white'
            }`}
          >
            {t.home}
          </a>

          {/* بخش ویژه منوی کشورها (تمامی ۲۴ کشور و زیرمنوی تمام ۱۱ روش اتریش) */}
          <div
            ref={countriesDropdownRef}
            className="relative"
            onMouseEnter={() => setCountriesMenuOpen(true)}
            onMouseLeave={() => setCountriesMenuOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCountriesMenuOpen(!countriesMenuOpen)}
              className={`rounded-xl px-2.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                countriesMenuOpen || isAnyCountryPage
                  ? 'bg-[#f5a623] text-[#082833] font-black shadow-glow'
                  : 'text-amber-300 border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20'
              }`}
              aria-expanded={countriesMenuOpen}
              aria-haspopup="true"
            >
              <span>🌍</span>
              <span>کشورها</span>
              <span className="hidden sm:inline-block rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.2 font-bold border border-emerald-400/30">
                ۲۴ کشور
              </span>
              <span className={`text-[10px] transition-transform duration-200 ${countriesMenuOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {/* مگامنوی پیشرفته کشورها */}
            {countriesMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-[920px] max-w-[94vw] rounded-3xl bg-[#061a22]/98 border border-amber-400/30 p-5 shadow-2xl backdrop-blur-2xl z-50 text-right animate-fadeIn"
                dir="rtl"
              >
                {/* نوار انتخاب مستقیم کشورها (جایگزین عنوان و تب‌های قبلی) */}
                <div className="pb-3 mb-3.5 border-b border-white/10">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-400/40 scrollbar-track-transparent">
                    {DIACO_COUNTRIES.map((c) => {
                      const isSelected = selectedCountryId === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelectedCountryId(c.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-amber-400 to-[#f5a623] text-[#071f26] font-black shadow-glow ring-2 ring-amber-300/40 scale-[1.02]'
                              : 'text-slate-300 bg-[#04151b] hover:bg-[#0c2f3c] hover:text-white border border-white/10'
                          }`}
                        >
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* محتوای اختصاصی کشور انتخاب‌شده (همانند بخش اتریش) */}
                {(() => {
                  const country = COUNTRY_DETAILS[selectedCountryId] || COUNTRY_DETAILS.austria;
                  return (
                    <div>
                      {/* بنر سربرگ کشور انتخاب‌شده */}
                      <div className="bg-gradient-to-r from-[#0d3444] via-[#082833] to-[#0d3444] border border-amber-400/30 rounded-2xl p-3.5 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{country.flag}</span>
                          <div>
                            <div className="text-xs sm:text-sm font-black text-amber-300 flex items-center flex-wrap gap-2">
                              <span>{country.headline}</span>
                              {country.lawyerBadge && (
                                <span className="text-[10px] text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-md border border-emerald-500/30 font-bold">
                                  {country.lawyerBadge}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-300 mt-0.5">
                              {country.subheadline}
                            </div>
                          </div>
                        </div>
                        {country.portalUrl && country.portalLabel && (
                          <a
                            href={country.portalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border border-amber-400/30 transition shadow-sm"
                          >
                            <span>{country.portalLabel}</span>
                            <span>↗</span>
                          </a>
                        )}
                      </div>

                      {/* شبکه کارت‌های روش‌های مهاجرتی کشور مورد نظر - دقیقاً همانند استایل اتریش */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
                        {country.methods.map((method) => {
                          const isSelected = currentPage === method.page;
                          return (
                            <a
                              key={method.page}
                              href={`/${method.page}`}
                              onClick={(e) => {
                                if (!e.ctrlKey && !e.metaKey) {
                                  e.preventDefault();
                                  handleSelectPage(method.page);
                                }
                              }}
                              className={`p-3.5 rounded-2xl border text-right transition group cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-amber-400/20 border-amber-400 text-white shadow-glow'
                                  : 'bg-[#092631]/80 hover:bg-[#0d3444] border-white/10 hover:border-amber-400/50'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-xl">{method.icon}</span>
                                  <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                                    {method.tag}
                                  </span>
                                </div>
                                <h4 className="text-xs font-black text-white group-hover:text-amber-300 transition mb-1 leading-snug">
                                  {method.title}
                                </h4>
                                <p className="text-[10px] text-slate-300 line-clamp-2 leading-relaxed">
                                  {method.desc}
                                </p>
                              </div>
                              <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-amber-400">
                                <span>مشاهده شرایط قانونی و پرونده</span>
                                <span className="group-hover:translate-x-[-3px] transition-transform">←</span>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* فوتر مگامنو */}
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-300 font-bold">دفتر مرکزی وین:</span>
                    <a href="tel:+436889763256" dir="ltr" className="font-mono text-emerald-400 hover:underline">
                      +43 688 9763256
                    </a>
                    <span className="text-white/20">|</span>
                    <span className="text-slate-400">دفتر تهران: 02191693955</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCountriesMenuOpen(false);
                        onOpenAssessment();
                      }}
                      className="rounded-xl bg-[#f5a623] hover:bg-[#e09312] text-[#071f26] px-4 py-1.5 text-xs font-black shadow-md transition cursor-pointer"
                    >
                      سنجش شانس ویزای پرونده من ←
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => {
            const isActive = link.page ? currentPage === link.page : false;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.page) {
                    e.preventDefault();
                    if (onNavigateToPage) {
                      onNavigateToPage(link.page);
                    } else {
                      window.location.pathname = `/${link.page}`;
                    }
                    return;
                  }
                  if (currentPage !== 'home' && onNavigateHome) {
                    e.preventDefault();
                    onNavigateHome();
                    setTimeout(() => {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className={`rounded-xl px-2.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#f5a623] text-[#082833] font-black shadow-md'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {currentLang === 'fa' ? link.labelFa : link.labelEn}
              </a>
            );
          })}
        </nav>

        {/* دکمه‌های جستجو، تغییر زبان، تماس و ارزیابی */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* دکمه جستجوی پرتال (دسکتاپ) */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white px-2.5 sm:px-3 py-2 text-xs font-semibold border border-white/10 hover:border-amber-400/40 transition cursor-pointer"
            title={currentLang === 'fa' ? 'جستجوی پرتال (Ctrl + K)' : 'Portal Search (Ctrl + K)'}
            aria-label={t.quickSearch}
          >
            <span className="text-amber-400 text-sm">🔍</span>
            <span className="hidden lg:inline text-slate-300">
              {currentLang === 'fa' ? 'جستجو...' : 'Search...'}
            </span>
            <kbd className="hidden 2xl:inline-block rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-slate-400 font-mono border border-white/10">
              ⌘K
            </kbd>
          </button>



          {/* دکمه سبز واتساپ */}
          <a
            href="https://wa.me/989197340829"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white px-3 py-2 text-xs font-bold shadow-md transition hover:scale-105"
          >
            <span>{t.whatsappSupport}</span>
            <span>💬</span>
          </a>

          {/* دکمه ارزیابی آنلاین شانس ویزا */}
          <button
            type="button"
            onClick={onOpenAssessment}
            className="rounded-xl bg-[#00a8cc] hover:bg-[#0092b3] px-3 sm:px-4 py-2 text-xs sm:text-sm font-black text-white shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            {t.onlineAssessment}
          </button>

          {/* دکمه منوی موبایل */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="منو"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 text-white xl:hidden cursor-pointer"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* منوی بازشونده موبایل */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#07242e] px-4 py-4 xl:hidden animate-fadeIn">
          <ul className="space-y-1.5">
            <li>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  if (onNavigateHome) onNavigateHome();
                  else window.location.hash = '';
                }}
                className={`w-full text-right rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                  currentPage === 'home'
                    ? 'bg-amber-400 text-[#082833] font-black'
                    : 'text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                صفحه اصلی
              </button>
            </li>
            {/* بخش ویژه کشورها و روش‌های مهاجرتی اتریش در منوی موبایل */}
            <li className="pt-1 border-t border-white/10">
              <button
                type="button"
                onClick={() => setMobileCountriesOpen(!mobileCountriesOpen)}
                className="w-full text-right rounded-xl px-4 py-2.5 text-xs font-bold transition flex items-center justify-between cursor-pointer bg-white/5 hover:bg-white/10 text-amber-300"
              >
                <div className="flex items-center gap-2">
                  <span>🌍</span>
                  <span>کشورها و روش‌های مهاجرتی دیاکو</span>
                  <span className="text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 border border-emerald-400/30">۲۴ کشور</span>
                </div>
                <span className={`text-[12px] transition-transform duration-200 ${mobileCountriesOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {mobileCountriesOpen && (
                <div className="p-2 space-y-2.5 bg-[#061e26] rounded-2xl border border-white/10 mt-1.5 animate-fadeIn">
                  {/* نوار انتخاب کشور در موبایل */}
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold mb-1.5">انتخاب کشور:</div>
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-400/40">
                      {DIACO_COUNTRIES.map((c) => {
                        const isSelected = selectedCountryId === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedCountryId(c.id)}
                            className={`px-3 py-1 rounded-xl text-[11px] font-bold transition shrink-0 cursor-pointer ${
                              isSelected
                                ? 'bg-[#f5a623] text-[#071f26] font-black shadow-glow'
                                : 'text-slate-300 bg-[#082833] border border-white/10'
                            }`}
                          >
                            {c.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* زیربخش اختصاصی کشور انتخاب‌شده در موبایل */}
                  {(() => {
                    const country = COUNTRY_DETAILS[selectedCountryId] || COUNTRY_DETAILS.austria;
                    return (
                      <div className="rounded-xl bg-[#082833] border border-amber-400/30 p-2.5">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 gap-2">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-xl">{country.flag}</span>
                            <span className="text-xs font-black text-amber-300 truncate">{country.name} — {country.methods.length} روش</span>
                          </div>
                          {country.lawyerBadge && (
                            <span className="text-[9px] text-emerald-400 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold shrink-0">
                              {country.lawyerBadge}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-1.5 max-h-64 overflow-y-auto pr-1">
                          {country.methods.map((m) => (
                            <a
                              key={m.page}
                              href={`/${m.page}`}
                              onClick={(e) => {
                                if (!e.ctrlKey && !e.metaKey) {
                                  e.preventDefault();
                                  handleSelectPage(m.page);
                                }
                              }}
                              className={`w-full text-right p-2 rounded-xl text-[11px] font-bold transition flex items-center justify-between cursor-pointer ${
                                currentPage === m.page
                                  ? 'bg-amber-400 text-[#071f26] font-black'
                                  : 'text-slate-200 bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              <span className="flex items-center gap-1.5 truncate">
                                <span>{m.icon}</span>
                                <span className="truncate">{m.title}</span>
                              </span>
                              <span className="text-[9px] text-amber-300 shrink-0 mr-1">{m.tag}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </li>
            {NAV_LINKS.map((link) => {
              const isActive = link.page ? currentPage === link.page : false;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      setMenuOpen(false);
                      if (link.page) {
                        e.preventDefault();
                        if (onNavigateToPage) {
                          onNavigateToPage(link.page);
                        } else {
                          window.location.pathname = `/${link.page}`;
                        }
                        return;
                      }
                      if (currentPage !== 'home' && onNavigateHome) {
                        e.preventDefault();
                        onNavigateHome();
                        setTimeout(() => {
                          const el = document.querySelector(link.href);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className={`block rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-[#082833] font-black'
                        : 'text-slate-200 hover:bg-white/10 hover:text-[#f5a623]'
                    }`}
                  >
                    {currentLang === 'fa' ? link.labelFa : link.labelEn}
                  </a>
                </li>
              );
            })}
            <li className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-400/20 transition cursor-pointer"
              >
                <span>🔍</span>
                <span>{t.quickSearch}</span>
              </button>
              <a
                href="tel:02191693955"
                dir="ltr"
                className="block rounded-xl px-4 py-2.5 text-center text-xs font-black text-[#082833] bg-[#f5a623]"
              >
                {t.phoneConsultation}: 02191693955 📞
              </a>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl px-4 py-2.5 text-center text-xs font-black text-white bg-[#25d366]"
              >
                {t.whatsappSupport} 💬
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* ============================================================
          پاپ‌آپ مودال جستجوی پرتال (Search Modal)
         ============================================================ */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 pt-16 md:pt-24 animate-fadeIn"
          dir={currentLang === 'fa' ? 'rtl' : 'ltr'}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={t.quickSearch}
        >
          <div className="w-full max-w-2xl rounded-3xl bg-[#07242e] border border-amber-400/40 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* نوار ورودی جستجو */}
            <div className="p-3.5 sm:p-4 border-b border-white/10 bg-[#051c24] flex items-center gap-3">
              <span className="text-xl text-amber-400">🔍</span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="flex-1 bg-transparent text-white text-xs sm:text-sm md:text-base outline-none placeholder:text-slate-400"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 text-xs transition cursor-pointer"
                  title="پاک کردن"
                >
                  ✕
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 text-xs font-bold transition cursor-pointer shrink-0"
              >
                {t.close} (Esc)
              </button>
            </div>

            {/* دسته‌بندی و فیلترهای سریع */}
            <div className="px-4 py-2 bg-black/20 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto scrollbar-thin text-xs">
              {[
                { id: 'all', label: currentLang === 'fa' ? 'همه موارد' : 'All Items' },
                { id: 'service', label: t.servicesAndVisas },
                { id: 'country', label: t.countries },
                { id: 'article', label: t.articlesAndInsights },
                { id: 'tool', label: t.smartTools },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSearchFilter(f.id as any)}
                  className={`px-3 py-1 rounded-xl font-bold transition shrink-0 cursor-pointer ${
                    searchFilter === f.id
                      ? 'bg-[#f5a623] text-[#082833]'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* بدنه و نتایج جستجو */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1 scrollbar-thin scrollbar-thumb-amber-400/30">
              {!searchQuery ? (
                <div className="space-y-4 py-3">
                  <p className="text-xs text-slate-400">{t.searchPrompt}</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: currentLang === 'fa' ? '🏛️ تمکن مالی اتریش (NAG §44)' : '🏛️ Austria Financial Self-Sufficiency', q: currentLang === 'fa' ? 'تمکن مالی اتریش' : 'financial austria' },
                      { label: currentLang === 'fa' ? '🇩🇪 بلوکارت آلمان' : '🇩🇪 Germany Blue Card', q: currentLang === 'fa' ? 'بلوکارت آلمان' : 'blue card germany' },
                      { label: currentLang === 'fa' ? '🇬🇷 گلدن ویزای یونان' : '🇬🇷 Greece Golden Visa', q: currentLang === 'fa' ? 'گلدن ویزا یونان' : 'greece golden visa' },
                      { label: currentLang === 'fa' ? '🔍 کارت شانس آلمان' : '🔍 Germany Chancenkarte', q: currentLang === 'fa' ? 'کارت شانس' : 'chancenkarte' },
                      { label: currentLang === 'fa' ? '🩺 معادل‌سازی پرستاری اتریش' : '🩺 Austria Nursing Nostrifizierung', q: currentLang === 'fa' ? 'پرستاری' : 'nursing' },
                      { label: currentLang === 'fa' ? '🇸🇰 ثبت شرکت اسلواکی' : '🇸🇰 Slovakia Company Setup', q: currentLang === 'fa' ? 'اسلواکی' : 'slovakia' },
                      { label: currentLang === 'fa' ? '🧮 محاسبه‌گر هزینه مهاجرت' : '🧮 Cost Calculator', q: currentLang === 'fa' ? 'محاسبه هزینه' : 'cost calculator' },
                      { label: currentLang === 'fa' ? '⏱️ تایم‌لاین پرونده‌ها' : '⏱️ Case Timeline', q: currentLang === 'fa' ? 'تایم لاین' : 'timeline' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSearchQuery(item.q)}
                        className="rounded-xl border border-white/10 bg-white/5 hover:bg-amber-400/20 hover:border-amber-400/40 text-slate-200 hover:text-amber-300 px-3 py-1.5 text-xs font-medium transition cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="py-10 text-center space-y-3">
                  <span className="text-4xl block">🔍</span>
                  <p className="text-sm font-bold text-white">{t.noResultsFound}</p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    {currentLang === 'fa'
                      ? 'برای ارزیابی و انتخاب مناسب‌ترین کشور متناسب با سرمایه یا سوابق خود، از سیستم هوشمند سنجش شانس ویزا استفاده کنید.'
                      : 'To evaluate the best country for your qualifications and capital, use our Smart Visa Assessment tool.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      onOpenAssessment();
                    }}
                    className="rounded-xl bg-[#f5a623] text-[#082833] font-black px-4 py-2 text-xs transition hover:scale-105 cursor-pointer"
                  >
                    {t.onlineAssessment}
                  </button>
                </div>
              ) : (
                filteredResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectSearchResult(item)}
                    className="group p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-amber-400/40 transition cursor-pointer flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-white/5 shrink-0 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition">
                            {currentLang === 'fa' ? item.titleFa : item.titleEn}
                          </h4>
                          {item.badge && (
                            <span className="text-[10px] rounded-full bg-amber-400/10 text-amber-300 px-2 py-0.5 border border-amber-400/20 font-bold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-1">
                          {currentLang === 'fa' ? item.descFa : item.descEn}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-400 group-hover:translate-x-[-3px] transition-transform shrink-0 mt-2">
                      {currentLang === 'fa' ? '←' : '→'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
