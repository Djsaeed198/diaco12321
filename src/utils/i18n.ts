export type Language = 'fa' | 'en';

export interface TranslationDictionary {
  // Navigation & Core
  home: string;
  services: string;
  interactiveMap: string;
  successCases: string;
  blog: string;
  aboutUs: string;
  podcasts: string;
  contactUs: string;
  onlineAssessment: string;
  countriesAndMethods: string;
  austriaMethods: string;
  viennaHeadquarters: string;
  tehranOffice: string;
  athensOffice: string;
  allCountries: string;
  searchPlaceholder: string;
  searchResults: string;
  noResultsFound: string;
  quickSearch: string;
  searchPrompt: string;
  servicesAndVisas: string;
  countries: string;
  articlesAndInsights: string;
  smartTools: string;
  close: string;
  viewDetails: string;
  phoneConsultation: string;
  whatsappSupport: string;
  assessMyCase: string;
  activeMethodsCount: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  fa: {
    home: 'صفحه اصلی',
    services: 'خدمات ما',
    interactiveMap: 'نقشه پرونده‌ها',
    successCases: 'پرونده‌های موفق',
    blog: 'وبلاگ و تحلیل‌ها',
    aboutUs: 'درباره دیاکو',
    podcasts: 'رادیو مهاجرت',
    contactUs: 'تماس با ما',
    onlineAssessment: 'ارزیابی آنلاین ←',
    countriesAndMethods: 'کشورها و روش‌های مهاجرتی دیاکو',
    austriaMethods: 'روش‌های قانونی اقامت اتریش',
    viennaHeadquarters: 'دفتر مرکزی وین',
    tehranOffice: 'دفتر تهران: 02191693955',
    athensOffice: 'دفتر آتن',
    allCountries: 'همه ۲۴ کشور',
    searchPlaceholder: 'جستجوی خدمات، کشورها، مقالات و ابزارها (مثلاً: تمکن مالی، بلوکارت، آلمان)...',
    searchResults: 'نتایج جستجو',
    noResultsFound: 'نتیجه‌ای برای جستجوی شما یافت نشد.',
    quickSearch: 'جستجوی سریع در پرتال دیاکو',
    searchPrompt: 'عبارت مورد نظر خود را تایپ کنید یا از پیشنهادات زیر انتخاب نمایید:',
    servicesAndVisas: 'روش‌ها و خدمات اقامتی',
    countries: 'کشورهای تحت پوشش',
    articlesAndInsights: 'مقالات حقوقی و اخبار',
    smartTools: 'سامانه‌ها و ابزارهای هوشمند',
    close: 'بستن',
    viewDetails: 'مشاهده شرایط قانونی',
    phoneConsultation: 'مشاوره تلفنی',
    whatsappSupport: 'واتساپ ۲۴/۷',
    assessMyCase: 'سنجش شانس ویزای پرونده من ←',
    activeMethodsCount: '۷۰+ روش فعال',
  },
  en: {
    home: 'Home',
    services: 'Services',
    interactiveMap: 'Case Map',
    successCases: 'Success Stories',
    blog: 'Blog & Insights',
    aboutUs: 'About Diaco',
    podcasts: 'Migration Radio',
    contactUs: 'Contact Us',
    onlineAssessment: 'Online Assessment →',
    countriesAndMethods: 'Diaco Countries & Visa Programs',
    austriaMethods: 'Austrian Legal Residency Programs',
    viennaHeadquarters: 'Vienna HQ',
    tehranOffice: 'Tehran Office: +98 21 91693955',
    athensOffice: 'Athens Office',
    allCountries: 'All 24 Countries',
    searchPlaceholder: 'Search services, countries, articles & tools (e.g., Financial Austria, Blue Card, Germany)...',
    searchResults: 'Search Results',
    noResultsFound: 'No matching results found for your query.',
    quickSearch: 'Quick Search in Diaco Portal',
    searchPrompt: 'Type your search term or select from popular topics below:',
    servicesAndVisas: 'Residency Programs & Services',
    countries: 'Covered Countries',
    articlesAndInsights: 'Legal Articles & News',
    smartTools: 'Smart Immigration Tools',
    close: 'Close',
    viewDetails: 'View Legal Details',
    phoneConsultation: 'Phone Support',
    whatsappSupport: 'WhatsApp 24/7',
    assessMyCase: 'Assess My Visa Chances →',
    activeMethodsCount: '70+ Active Programs',
  },
};

const LANG_STORAGE_KEY = 'diaco_selected_language';

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'fa';
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'en' || saved === 'fa') return saved;
  } catch {
    /* ignore */
  }
  return 'fa';
}

export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  } catch {
    /* ignore */
  }
}
