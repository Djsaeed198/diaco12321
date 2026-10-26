import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  lazy,
  Suspense,
  Component,
  type ErrorInfo,
  type ReactNode,
} from 'react';

/* ============================================================
   کامپوننت‌های موجود (بدون تغییر در importها)
   ============================================================ */
import Header from './components/Header';
import BannerSection from './components/BannerSection';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import FormCategoriesSection from './components/FormCategoriesSection';
import SuccessMetricsSection from './components/SuccessMetricsSection';
import InteractiveCaseMap from './components/InteractiveCaseMap';
import VisaSuccessSection from './components/VisaSuccessSection';
import PodcastsSection from './components/PodcastsSection';
import StoriesSection from './components/StoriesSection';
import AboutSection from './components/AboutSection';
import FloatingActionBar from './components/FloatingActionBar';
import ContactFooter from './components/ContactFooter';
import SupportButton from './components/SupportButton';
import AssessmentWizard from './components/AssessmentWizard';
import ResultPanel from './components/ResultPanel';
import LoadingSpinner from './components/LoadingSpinner';
import BackToTop from './components/BackToTop';
import FeatureDetailModal from './components/FeatureDetailModal';
import ImmigrationBlogSection from './components/ImmigrationBlogSection';
import OrganizationSchema from './seo/OrganizationSchema';

import { calculateAssessment } from './utils/scoring';
import { INITIAL_PROFILE, type UserProfile, type ImmigrationPlan } from './types';
import type { PageType } from './components/Header';

/* ============================================================
   Lazy Loaded Pages
   ============================================================ */
const GermanBlueCardPage = lazy(() => import('./components/pages/GermanBlueCardPage'));
const SpainBlueCardPage = lazy(() => import('./components/pages/SpainBlueCardPage'));
const ItalyBlueCardPage = lazy(() => import('./components/pages/ItalyBlueCardPage'));
const AustriaBlueCardPage = lazy(() => import('./components/pages/AustriaBlueCardPage'));
const HungaryBlueCardPage = lazy(() => import('./components/pages/HungaryBlueCardPage'));

const MedicalGermanyPage = lazy(() => import('./components/pages/medical/MedicalGermanyPage'));
const MedicalAustriaNursingPage = lazy(() => import('./components/pages/medical/MedicalAustriaNursingPage'));
const MedicalFinlandPage = lazy(() => import('./components/pages/medical/MedicalFinlandPage'));
const MedicalDenmarkPage = lazy(() => import('./components/pages/medical/MedicalDenmarkPage'));

const AusbildungGermanyPage = lazy(() => import('./components/pages/education/AusbildungGermanyPage'));
const LanguageSpainPage = lazy(() => import('./components/pages/education/LanguageSpainPage'));
const LanguageFrancePage = lazy(() => import('./components/pages/education/LanguageFrancePage'));
const LanguageNetherlandsPage = lazy(() => import('./components/pages/education/LanguageNetherlandsPage'));
const LanguageHungaryPage = lazy(() => import('./components/pages/education/LanguageHungaryPage'));
const CollegesHungaryPage = lazy(() => import('./components/pages/education/CollegesHungaryPage'));
const LanguageDenmarkPage = lazy(() => import('./components/pages/education/LanguageDenmarkPage'));

const StartupCanadaPage = lazy(() => import('./components/pages/startup/StartupCanadaPage'));
const StartupAustriaPage = lazy(() => import('./components/pages/startup/StartupAustriaPage'));
const StartupGermanyPage = lazy(() => import('./components/pages/startup/StartupGermanyPage'));
const StartupFrancePage = lazy(() => import('./components/pages/startup/StartupFrancePage'));
const StartupNetherlandsPage = lazy(() => import('./components/pages/startup/StartupNetherlandsPage'));
const StartupFinlandPage = lazy(() => import('./components/pages/startup/StartupFinlandPage'));
const StartupDenmarkPage = lazy(() => import('./components/pages/startup/StartupDenmarkPage'));

const CitizenshipTurkeyPage = lazy(() => import('./components/pages/citizenship/CitizenshipTurkeyPage'));
const CitizenshipDominicaPage = lazy(() => import('./components/pages/citizenship/CitizenshipDominicaPage'));
const CitizenshipSerbiaPage = lazy(() => import('./components/pages/citizenship/CitizenshipSerbiaPage'));
const CitizenshipSaoTomePage = lazy(() => import('./components/pages/citizenship/CitizenshipSaoTomePage'));

const BusinessDubaiPage = lazy(() => import('./components/pages/business/BusinessDubaiPage'));
const BusinessAustriaPage = lazy(() => import('./components/pages/business/BusinessAustriaPage'));
const BusinessNetherlandsPage = lazy(() => import('./components/pages/business/BusinessNetherlandsPage'));
const BusinessFrancePage = lazy(() => import('./components/pages/business/BusinessFrancePage'));
const BusinessTurkeyPage = lazy(() => import('./components/pages/business/BusinessTurkeyPage'));
const BusinessGreecePage = lazy(() => import('./components/pages/business/BusinessGreecePage'));
const BusinessPolandPage = lazy(() => import('./components/pages/business/BusinessPolandPage'));
const BusinessPortugalPage = lazy(() => import('./components/pages/business/BusinessPortugalPage'));
const BusinessSlovakiaPage = lazy(() => import('./components/pages/business/BusinessSlovakiaPage'));
const BusinessHungaryPage = lazy(() => import('./components/pages/business/BusinessHungaryPage'));
const BusinessLatviaPage = lazy(() => import('./components/pages/business/BusinessLatviaPage'));

const ArtistAustriaPage = lazy(() => import('./components/pages/artist/ArtistAustriaPage'));
const ArtistGermanyPage = lazy(() => import('./components/pages/artist/ArtistGermanyPage'));
const TalentFrancePage = lazy(() => import('./components/pages/artist/TalentFrancePage'));
const ArtistBelgiumPage = lazy(() => import('./components/pages/artist/ArtistBelgiumPage'));
const ArtistSpainPage = lazy(() => import('./components/pages/artist/ArtistSpainPage'));

const NomadSpainPage = lazy(() => import('./components/pages/nomad/NomadSpainPage'));
const NomadHungaryPage = lazy(() => import('./components/pages/nomad/NomadHungaryPage'));
const NomadCroatiaPage = lazy(() => import('./components/pages/nomad/NomadCroatiaPage'));
const NomadDubaiPage = lazy(() => import('./components/pages/nomad/NomadDubaiPage'));
const FreelanceGermanyPage = lazy(() => import('./components/pages/nomad/FreelanceGermanyPage'));
const SelfEmployedFinlandPage = lazy(() => import('./components/pages/nomad/SelfEmployedFinlandPage'));

const FinancialAustriaPage = lazy(() => import('./components/pages/financial/FinancialAustriaPage'));
const FinancialSpainPage = lazy(() => import('./components/pages/financial/FinancialSpainPage'));
const FinancialFrancePage = lazy(() => import('./components/pages/financial/FinancialFrancePage'));

const JobSeekerGermanyPage = lazy(() => import('./components/pages/jobseeker/JobSeekerGermanyPage'));
const JobSeekerNorwayPage = lazy(() => import('./components/pages/jobseeker/JobSeekerNorwayPage'));
const JobSeekerDenmarkPage = lazy(() => import('./components/pages/jobseeker/JobSeekerDenmarkPage'));
const JobSeekerAustriaPage = lazy(() => import('./components/pages/jobseeker/JobSeekerAustriaPage'));
const AustriaRwrCardPage = lazy(() => import('./components/pages/rwr/AustriaRwrCardPage'));
const JobSeekerPortugalPage = lazy(() => import('./components/pages/jobseeker/JobSeekerPortugalPage'));

const RealEstateAustriaPage = lazy(() => import('./components/pages/realestate/RealEstateAustriaPage'));
const RealEstateTurkeyPage = lazy(() => import('./components/pages/realestate/RealEstateTurkeyPage'));
const RealEstateFrancePage = lazy(() => import('./components/pages/realestate/RealEstateFrancePage'));
const RealEstateHungaryPage = lazy(() => import('./components/pages/realestate/RealEstateHungaryPage'));
const RealEstateGreecePage = lazy(() => import('./components/pages/realestate/RealEstateGreecePage'));
const RealEstateLatviaPage = lazy(() => import('./components/pages/realestate/RealEstateLatviaPage'));
const RealEstateSlovakiaPage = lazy(() => import('./components/pages/realestate/RealEstateSlovakiaPage'));

const AcademicSpainPage = lazy(() => import('./components/pages/academic/AcademicSpainPage'));
const AcademicUKPage = lazy(() => import('./components/pages/academic/AcademicUKPage'));
const AcademicAustriaPage = lazy(() => import('./components/pages/academic/AcademicAustriaPage'));
const AcademicAustriaMedicalPage = lazy(() => import('./components/pages/academic/AcademicAustriaMedicalPage'));
const AcademicNetherlandsPage = lazy(() => import('./components/pages/academic/AcademicNetherlandsPage'));
const AcademicHungaryPage = lazy(() => import('./components/pages/academic/AcademicHungaryPage'));
const AcademicCanadaPage = lazy(() => import('./components/pages/academic/AcademicCanadaPage'));

const CostCalculatorPage = lazy(() => import('./components/pages/tools/CostCalculatorPage'));
const DocumentCheckerPage = lazy(() => import('./components/pages/tools/DocumentCheckerPage'));
const MethodComparatorPage = lazy(() => import('./components/pages/tools/MethodComparatorPage'));
const ImmigrationTimelinePage = lazy(() => import('./components/pages/tools/ImmigrationTimelinePage'));
const VisaComparatorPage = lazy(() => import('./components/pages/tools/VisaComparatorPage'));
const EducationComparatorPage = lazy(() => import('./components/pages/tools/EducationComparatorPage'));
const JobSearchPage = lazy(() => import('./components/pages/tools/JobSearchPage'));
const CountryGuidePage = lazy(() => import('./components/pages/tools/CountryGuidePage'));
const VisaNewsPage = lazy(() => import('./components/pages/tools/VisaNewsPage'));
const OnlineConsultPage = lazy(() => import('./components/pages/tools/OnlineConsultPage'));
const AfterArrivalPage = lazy(() => import('./components/pages/AfterArrivalPage'));
const BlogPostPage = lazy(() => import('./components/pages/BlogPostPage'));
const BlogIndexPage = lazy(() => import('./components/pages/BlogIndexPage'));

const ServicesDirectoryPage = lazy(() => import('./components/pages/ServicesDirectoryPage'));
const InteractiveMapPage = lazy(() => import('./components/pages/InteractiveMapPage'));
const SuccessCasesPage = lazy(() => import('./components/pages/SuccessCasesPage'));
const AboutUsPage = lazy(() => import('./components/pages/AboutUsPage'));
const PodcastsPage = lazy(() => import('./components/pages/PodcastsPage'));
const ContactUsPage = lazy(() => import('./components/pages/ContactUsPage'));

/* ============================================================
   Error Boundary (inline)
   ============================================================ */
interface EBProps { children: ReactNode; }
interface EBState { hasError: boolean; }

class ErrorBoundary extends Component<EBProps, EBState> {
  state: EBState = { hasError: false };

  static getDerivedStateFromError(): EBState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('[Diaco] Render error:', error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div dir="rtl" className="min-h-[60vh] flex items-center justify-center bg-[#061a21] text-white p-8">
          <div className="max-w-md text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-black mb-3">خطایی رخ داد</h2>
            <p className="text-slate-300 text-sm mb-6 leading-7">
              متأسفانه در بارگذاری این بخش خطایی پیش آمد.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl bg-[#f5a623] px-6 py-3 text-sm font-black text-[#082833] hover:scale-105 transition cursor-pointer"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ============================================================
   Loading Skeleton (inline)
   ============================================================ */
const PageSkeleton: React.FC = () => (
  <div className="min-h-[70vh] bg-[#061a21] p-8" aria-busy="true" aria-label="در حال بارگذاری">
    <div className="container mx-auto max-w-4xl animate-pulse space-y-6">
      <div className="h-8 w-2/3 rounded-lg bg-white/10" />
      <div className="h-4 w-1/2 rounded-lg bg-white/5" />
      <div className="aspect-[16/9] w-full rounded-3xl bg-white/5" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-5/6 rounded bg-white/5" />
      </div>
    </div>
  </div>
);

/* ============================================================
   Not Found Page (inline)
   ============================================================ */
interface NFProps { onBackToHome: () => void; }
const NotFoundPage: React.FC<NFProps> = ({ onBackToHome }) => (
  <div dir="rtl" className="min-h-[70vh] flex items-center justify-center bg-[#061a21] text-white p-8">
    <div className="max-w-md text-center">
      <div className="text-7xl font-black text-amber-400 mb-4">۴۰۴</div>
      <h1 className="text-2xl font-black mb-3">صفحه مورد نظر یافت نشد</h1>
      <p className="text-slate-300 text-sm mb-6 leading-7">
        ممکن است آدرس تغییر کرده یا حذف شده باشد.
      </p>
      <button
        type="button"
        onClick={onBackToHome}
        className="rounded-xl bg-[#f5a623] px-6 py-3 text-sm font-black text-[#082833] hover:scale-105 transition cursor-pointer"
      >
        بازگشت به صفحه اصلی
      </button>
    </div>
  </div>
);

/* ============================================================
   ROUTE MAP — همه ۷۰+ صفحه
   ============================================================ */
const ROUTE_MAP: Record<string, PageType> = {
  '': 'home',
  'german-blue-card': 'german-blue-card',
  'spain-blue-card': 'spain-blue-card',
  'italy-blue-card': 'italy-blue-card',
  'austria-blue-card': 'austria-blue-card',
  'hungary-blue-card': 'hungary-blue-card',
  'medical-germany': 'medical-germany',
  'medical-austria-nursing': 'medical-austria-nursing',
  'medical-finland': 'medical-finland',
  'medical-denmark': 'medical-denmark',
  'ausbildung-germany': 'ausbildung-germany',
  'language-spain': 'language-spain',
  'language-france': 'language-france',
  'language-netherlands': 'language-netherlands',
  'language-hungary': 'language-hungary',
  'colleges-hungary': 'colleges-hungary',
  'language-denmark': 'language-denmark',
  'startup-canada': 'startup-canada',
  'startup-austria': 'startup-austria',
  'startup-germany': 'startup-germany',
  'startup-france': 'startup-france',
  'startup-netherlands': 'startup-netherlands',
  'startup-finland': 'startup-finland',
  'startup-denmark': 'startup-denmark',
  'citizenship-turkey': 'citizenship-turkey',
  'citizenship-dominica': 'citizenship-dominica',
  'citizenship-serbia': 'citizenship-serbia',
  'citizenship-sao-tome': 'citizenship-sao-tome',
  'business-dubai': 'business-dubai',
  'business-austria': 'business-austria',
  'business-netherlands': 'business-netherlands',
  'business-france': 'business-france',
  'business-turkey': 'business-turkey',
  'business-greece': 'business-greece',
  'business-poland': 'business-poland',
  'business-portugal': 'business-portugal',
  'business-slovakia': 'business-slovakia',
  'business-hungary': 'business-hungary',
  'business-latvia': 'business-latvia',
  'artist-austria': 'artist-austria',
  'artist-germany': 'artist-germany',
  'talent-france': 'talent-france',
  'artist-belgium': 'artist-belgium',
  'artist-spain': 'artist-spain',
  'nomad-spain': 'nomad-spain',
  'nomad-hungary': 'nomad-hungary',
  'nomad-croatia': 'nomad-croatia',
  'nomad-dubai': 'nomad-dubai',
  'freelance-germany': 'freelance-germany',
  'selfemployed-finland': 'selfemployed-finland',
  'financial-austria': 'financial-austria',
  'financial-spain': 'financial-spain',
  'financial-france': 'financial-france',
  'jobseeker-germany': 'jobseeker-germany',
  'jobseeker-norway': 'jobseeker-norway',
  'jobseeker-denmark': 'jobseeker-denmark',
  'jobseeker-austria': 'jobseeker-austria',
  'austria-rwr': 'austria-rwr',
  'jobseeker-portugal': 'jobseeker-portugal',
  'realestate-austria': 'realestate-austria',
  'realestate-turkey': 'realestate-turkey',
  'realestate-france': 'realestate-france',
  'realestate-hungary': 'realestate-hungary',
  'realestate-greece': 'realestate-greece',
  'realestate-latvia': 'realestate-latvia',
  'realestate-slovakia': 'realestate-slovakia',
  'academic-spain': 'academic-spain',
  'academic-uk': 'academic-uk',
  'academic-austria': 'academic-austria',
  'academic-austria-medical': 'academic-austria-medical',
  'academic-netherlands': 'academic-netherlands',
  'academic-hungary': 'academic-hungary',
  'academic-canada': 'academic-canada',
  'cost-calculator': 'cost-calculator',
  'document-checker': 'document-checker',
  'method-comparator': 'method-comparator',
  'immigration-timeline': 'immigration-timeline',
  'visa-comparator': 'visa-comparator',
  'education-comparator': 'education-comparator',
  'job-search': 'job-search',
  'country-guide': 'country-guide',
  'visa-news': 'visa-news',
  'online-consult': 'online-consult',
  'after-arrival': 'after-arrival',
  'after-arrival-services-europe': 'after-arrival',
  'blog': 'blog',
  'services': 'services',
  'services-directory': 'services',
  'interactive-map': 'interactive-map',
  'success-cases': 'success-cases',
  'success': 'success-cases',
  'about-us': 'about-us',
  'about': 'about-us',
  'podcasts': 'podcasts',
  'contact-us': 'contact-us',
  'contact': 'contact-us',
};

/* Page → Path */
const PAGE_TO_PATH: Record<string, string> = {};
Object.keys(ROUTE_MAP).forEach((path) => {
  const page = ROUTE_MAP[path];
  PAGE_TO_PATH[page] = path;
});

/* ============================================================
   SEO Meta — با fallback برای صفحات بدون متادیتای اختصاصی
   ============================================================ */
const FALLBACK_META = {
  title: 'هلدینگ مهاجرتی دیاکو | راهنمای تخصصی مهاجرت به اروپا',
  description:
    'راهنمای حقوقی و تخصصی مسیرهای مهاجرت، اقامت و تحصیل در اروپا با نظارت وکلای مقیم دیاکو.',
};

const PAGE_META: Record<string, { title: string; description: string }> = {
  home: {
    title: 'هلدینگ مهاجرتی دیاکو | سنجش هوشمند شانس ویزا و اقامت اروپا ۲۰۲۶',
    description:
      'سامانه رسمی هلدینگ مهاجرتی دیاکو؛ ارزیابی آنلاین شانس ویزا، تمکن مالی اتریش، کارت شانس آلمان و گلدن ویزای یونان با نظارت وکلای پایه یک.',
  },
  'job-search': {
    title: 'بانک مشاغل مورد نیاز و کاریابی اروپا ۲۰۲۶ | هلدینگ دیاکو',
    description:
      'بانک مشاغل پرتقاضای اروپا، حداقل حقوق بلوکارت (€۴۸,۳۰۰)، لیست مشاغل کسری نیرو (Mangelberufe) و استراتژی کاریابی با نظارت وکلای دیاکو.',
  },
  'country-guide': {
    title: 'راهنمای جامع کشورها و شرایط زندگی در اروپا ۲۰۲۶ | هلدینگ دیاکو',
    description:
      'مقایسه شرایط زندگی، درآمد خالص، مالیات، مسکن و اقامت دائم در اتریش، آلمان، هلند، اسپانیا، ایتالیا و یونان با وکلای دفتر وین.',
  },
  'visa-news': {
    title: 'اتاق خبر و مانیتورینگ تغییرات ویزا و شنگن ۲۰۲۶ | هلدینگ دیاکو',
    description:
      'اطلاع‌رسانی فوری و مستند آخرین بخشنامه‌های ویزای کاری، سهمیه‌های تمکن مالی و هشدارهای کنسولی سفارتخانه‌ها.',
  },
  'online-consult': {
    title: 'رزرو وقت مشاوره حقوقی مهاجرت به اروپا | هلدینگ دیاکو',
    description:
      'نوبت‌دهی جلسات مشاوره تصویری و تلفنی اختصاصی با وکلای پایه یک دادگستری اتریش و آلمان مقیم وین و مونیخ.',
  },
  'blog': {
    title: 'بانک مقالات و تحلیل‌های حقوقی مهاجرت به اروپا ۲۰۲۶ | هلدینگ دیاکو',
    description:
      'آرشیو جامع تحلیل‌های حقوقی، آخرین قوانین اقامت اتریش، بخشنامه‌های ۲۰۲۶ بلوکارت آلمان، تمکن مالی و گلدن ویزا به قلم وکلای رسمی دفتر وین هلدینگ دیاکو.',
  },
  'german-blue-card': {
    title: 'بلوکارت آلمان ۲۰۲۶ | شرایط، حقوق و مسیر اقامت دائم | دیاکو',
    description:
      'راهنمای کامل بلوکارت آلمان ۲۰۲۶: حداقل حقوق €۴۸,۳۰۰، شرایط مدرک و زبان، و مسیر اقامت دائم.',
  },
  'spain-blue-card': {
    title: 'بلوکارت اسپانیا ۲۰۲۶ | شرایط، حقوق و مدارک | دیاکو',
    description: 'راهنمای کامل بلوکارت اسپانیا ۲۰۲۶: حداقل حقوق، مدارک و مراحل اخذ اقامت کاری.',
  },
  'austria-rwr': {
    title: 'کارت قرمز-سفید-قرمز اتریش ۲۰۲۶ | راهنمای کامل RWR | دیاکو',
    description:
      'راهنمای جامع کارت RWR اتریش ۲۰۲۶: ۵۵ امتیاز، حقوق €۳,۴۶۵، مسیر ۵ ساله تا اقامت دائم.',
  },
  'after-arrival': {
    title: 'خدمات پس از ورود و استقرار در اروپا ۲۰۲۶ | هلدینگ دیاکو',
    description:
      'راهنمای جامع خدمات پس از ورود (After-Arrival) در اتریش، آلمان و اروپا: اجاره مسکن رسمی، ثبت ملدزتل (Meldezettel)، افتتاح حساب بانکی، بیمه درمانی و تحویل کارت اقامت با وکلای دفتر وین دیاکو.',
  },
  'blog-post': {
    title: 'مقالات و اخبار مهاجرتی اروپا ۲۰۲۶ | هلدینگ دیاکو',
    description: 'تحلیل‌های حقوقی و قوانین اقامت اتریش، آلمان و اتحادیه اروپا توسط وکلای مقیم دفتر وین دیاکو.',
  },
  services: {
    title: 'فهرست خدمات جامع مهاجرت، اقامت و سرمایه‌گذاری اروپا ۲۰۲۶ | هلدینگ دیاکو',
    description:
      'کاتالوگ کامل و تخصصی بیش از ۷۰ روش مهاجرتی به اتریش، آلمان، اسپانیا، ایتالیا و یونان با نظارت وکلای مقیم وین.',
  },
  'interactive-map': {
    title: 'نقشه تعاملی پرونده‌های موفق مهاجرت به اروپا | هلدینگ بین‌المللی دیاکو',
    description:
      'مشاهده پراکندگی جغرافیایی بیش از ۲۰۰۰ پرونده موفق اقامت اتریش، آلمان، یونان، اسپانیا و هلند؛ تایم‌لاین واقعی صدور ویزا و آمار قبولی سفارتخانه‌ها.',
  },
  'success-cases': {
    title: 'گالری پرونده‌های موفق و ویزاهای صادره اروپا | هلدینگ بین‌المللی دیاکو',
    description:
      'مشاهده اسناد و تاییدیه‌های رسمی صدور ویزا و کارت‌های اقامت اتریش (NAG)، بلوکارت آلمان، گلدن ویزای یونان و اقامت تمکن مالی.',
  },
  'about-us': {
    title: 'درباره هلدینگ بین‌المللی دیاکو | بیش از ۲۰ سال پیشتازی در مهاجرت اروپا',
    description:
      'آشنایی با تاریخچه، مجوزهای رسمی، دفاتر وین، آتن و تهران، تیم وکلای پایه یک و منشور اخلاقی هلدینگ مهاجرتی دیاکو.',
  },
  podcasts: {
    title: 'رادیو مهاجرت دیاکو | پادکست‌های تخصصی حقوق مهاجرت و اقامت اروپا',
    description:
      'شنیدن تحلیل‌های صوتی دست‌اول، قوانین جدید مهاجرت ۲۰۲۶، مصاحبه با وکلای اتریش و آلمان و تجربیات واقعی موکلان دیاکو.',
  },
  'contact-us': {
    title: 'تماس با دفاتر هلدینگ بین‌المللی دیاکو در وین، آتن و تهران',
    description:
      'اطلاعات تماس، آدرس دفاتر وین (اتریش)، آتن (یونان) و تهران (ایران)، ساعات کاری، رزرو وقت مشاوره حضوری و پشتیبانی واتساپ ۲۴/۷.',
  },
};

function getPageMeta(page: PageType): { title: string; description: string } {
  return PAGE_META[page] ?? FALLBACK_META;
}

/* ============================================================
   Router helpers
   ============================================================ */
function getPageFromPath(pathname: string): PageType {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (clean === 'blog') {
    return 'blog';
  }
  if (clean.startsWith('blog/')) {
    return 'blog-post';
  }
  return ROUTE_MAP[clean] ?? 'home';
}

function isKnownPath(pathname: string): boolean {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (clean.startsWith('blog/')) {
    return true;
  }
  return clean === '' || clean in ROUTE_MAP;
}

function getPathForPage(page: PageType): string {
  return PAGE_TO_PATH[page] ?? '';
}

/* ============================================================
   localStorage — پروفایل ارزیابی
   ============================================================ */
const STORAGE_KEY = 'diaco_assessment_profile_v2';

function loadProfileFromStorage(): UserProfile {
  if (typeof window === 'undefined') return INITIAL_PROFILE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROFILE;
    return { ...INITIAL_PROFILE, ...JSON.parse(raw) };
  } catch {
    return INITIAL_PROFILE;
  }
}

/* ============================================================
   Main App
   ============================================================ */
export const App: React.FC = () => {
  /* ---------- Router State ---------- */
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const pathname = window.location.pathname;
    if (pathname.startsWith('/blog/')) {
      return pathname.replace(/^\/blog\//, '').replace(/\/$/, '');
    }
    return '';
  });

  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    if (typeof window === 'undefined') return 'home';
    return getPageFromPath(window.location.pathname);
  });

  const [notFound, setNotFound] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !isKnownPath(window.location.pathname);
  });

  const [profile, setProfile] = useState<UserProfile>(loadProfileFromStorage);
  const [plan, setPlan] = useState<ImmigrationPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [activeFeatureModal, setActiveFeatureModal] = useState<string | null>(null);

  const assessmentRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  /* ---------- ذخیره پروفایل ---------- */
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      /* ignore */
    }
  }, [profile]);

  /* ---------- ناوبری ---------- */
  const navigate = useCallback((page: PageType) => {
    const path = getPathForPage(page);
    const url = path ? `/${path}` : '/';

    try {
      window.history.pushState({ page }, '', url);
    } catch {
      /* fallback */
    }

    setCurrentPage(page);
    setNotFound(false);

    if (typeof window !== 'undefined' && (window as any).DiacoSEO) {
      const meta = getPageMeta(page);
      (window as any).DiacoSEO.set({
        title: meta.title,
        description: meta.description,
        url,
        type: page === 'home' ? 'website' : 'article',
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToBlogPost = useCallback((slug: string) => {
    setCurrentBlogSlug(slug);
    const url = `/blog/${slug}`;
    try {
      window.history.pushState({ page: 'blog-post', slug }, '', url);
    } catch {
      /* fallback */
    }
    setCurrentPage('blog-post');
    setNotFound(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /* ---------- Back/Forward Browser ---------- */
  useEffect(() => {
    const handlePop = () => {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace(/^\/blog\//, '').replace(/\/$/, '');
        setCurrentBlogSlug(slug);
        setCurrentPage('blog-post');
        setNotFound(false);
      } else if (isKnownPath(pathname)) {
        setCurrentPage(getPageFromPath(pathname));
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    };

    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  /* ---------- ناوبری ساده ---------- */
  const navigateToHome = useCallback(() => navigate('home'), [navigate]);

  const navigateToPage = useCallback((page: PageType) => navigate(page), [navigate]);

  const navigateToCountry = useCallback(
    (countryKey: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary' = 'germany') => {
      const map: Record<string, PageType> = {
        germany: 'german-blue-card',
        spain: 'spain-blue-card',
        italy: 'italy-blue-card',
        austria: 'austria-blue-card',
        hungary: 'hungary-blue-card',
      };
      navigate(map[countryKey] ?? 'german-blue-card');
    },
    [navigate]
  );

  /* ---------- ارزیابی ---------- */
  const handleProfileChange = useCallback(
    <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
      setProfile((prev) => ({ ...prev, [field]: value }));
      setError(null);
    },
    []
  );

  const openAssessment = useCallback(() => {
    setShowAssessmentModal(true);
    setPlan(null);
    setTimeout(() => {
      assessmentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }, []);

  const handleSelectFeature = useCallback(
    (featureId: string) => {
      if (featureId === 'smart-eval') {
        openAssessment();
      } else if (featureId === 'map') {
        const mapEl = document.getElementById('interactive-map');
        if (mapEl) {
          mapEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          setActiveFeatureModal(featureId);
        }
      } else {
        setActiveFeatureModal(featureId);
      }
    },
    [openAssessment]
  );

  const handleGeneratePlan = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const calculated = calculateAssessment(profile);
      setPlan(calculated);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      setError(err?.message || 'خطا در ارزیابی پرونده، لطفاً دوباره تلاش فرمایید.');
    } finally {
      setIsLoading(false);
    }
  }, [profile]);

  const handleRestart = useCallback(() => {
    setProfile(INITIAL_PROFILE);
    setPlan(null);
    setError(null);
    setShowAssessmentModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /* ---------- 404 Render ---------- */
  if (notFound) {
    return (
      <div dir="rtl" className="flex min-h-screen flex-col bg-[#0b2933] font-sans">
        <Header
          onOpenAssessment={openAssessment}
          currentPage={currentPage}
          onNavigateHome={navigateToHome}
          onNavigateToCountry={navigateToCountry}
          onNavigateToBlueCard={navigateToCountry}
          onNavigateToPage={navigateToPage}
        />
        <main className="flex-grow pt-16 lg:pt-24">
          <NotFoundPage onBackToHome={navigateToHome} />
        </main>
        <ContactFooter />
      </div>
    );
  }

  /* ---------- Main Render ---------- */
  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-[#0b2933] text-slate-800 font-sans">
      <OrganizationSchema />

      <Header
        onOpenAssessment={openAssessment}
        currentPage={currentPage}
        onNavigateHome={navigateToHome}
        onNavigateToCountry={navigateToCountry}
        onNavigateToBlueCard={navigateToCountry}
        onNavigateToPage={navigateToPage}
      />

      <main id="main-content" className="flex-grow pt-16 lg:pt-24">
        <ErrorBoundary>
          <Suspense fallback={<PageSkeleton />}>
            {/* Blue Cards */}
            {currentPage === 'german-blue-card' && (
              <GermanBlueCardPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={navigateToCountry} />
            )}
            {currentPage === 'spain-blue-card' && (
              <SpainBlueCardPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={navigateToCountry} />
            )}
            {currentPage === 'italy-blue-card' && (
              <ItalyBlueCardPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={navigateToCountry} />
            )}
            {currentPage === 'austria-blue-card' && (
              <AustriaBlueCardPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={navigateToCountry} />
            )}
            {currentPage === 'hungary-blue-card' && (
              <HungaryBlueCardPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={navigateToCountry} />
            )}

            {/* Medical */}
            {currentPage === 'medical-germany' && (
              <MedicalGermanyPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'medical-austria-nursing' && (
              <MedicalAustriaNursingPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'medical-finland' && (
              <MedicalFinlandPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'medical-denmark' && (
              <MedicalDenmarkPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}

            {/* Education */}
            {currentPage === 'ausbildung-germany' && (
              <AusbildungGermanyPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'language-spain' && (
              <LanguageSpainPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'language-france' && (
              <LanguageFrancePage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'language-netherlands' && (
              <LanguageNetherlandsPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'language-hungary' && (
              <LanguageHungaryPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'colleges-hungary' && (
              <CollegesHungaryPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'language-denmark' && (
              <LanguageDenmarkPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}

            {/* Startups */}
            {currentPage === 'startup-canada' && (
              <StartupCanadaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'startup-austria' && (
              <StartupAustriaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'startup-germany' && (
              <StartupGermanyPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'startup-france' && (
              <StartupFrancePage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'startup-netherlands' && (
              <StartupNetherlandsPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'startup-finland' && (
              <StartupFinlandPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'startup-denmark' && (
              <StartupDenmarkPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}

            {/* Citizenship */}
            {currentPage === 'citizenship-turkey' && (
              <CitizenshipTurkeyPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'citizenship-dominica' && (
              <CitizenshipDominicaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'citizenship-serbia' && (
              <CitizenshipSerbiaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'citizenship-sao-tome' && (
              <CitizenshipSaoTomePage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}

            {/* Business */}
            {currentPage === 'business-dubai' && (
              <BusinessDubaiPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'business-austria' && (
              <BusinessAustriaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'business-netherlands' && (
              <BusinessNetherlandsPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'business-france' && (
              <BusinessFrancePage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'business-turkey' && (
              <BusinessTurkeyPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'business-greece' && (
              <BusinessGreecePage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'business-poland' && (
              <BusinessPolandPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'business-portugal' && (
              <BusinessPortugalPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'business-slovakia' && (
              <BusinessSlovakiaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'business-hungary' && (
              <BusinessHungaryPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'business-latvia' && (
              <BusinessLatviaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}

            {/* Artists */}
            {currentPage === 'artist-austria' && (
              <ArtistAustriaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'artist-germany' && (
              <ArtistGermanyPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'talent-france' && (
              <TalentFrancePage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'artist-belgium' && (
              <ArtistBelgiumPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'artist-spain' && (
              <ArtistSpainPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}

            {/* Nomads */}
            {currentPage === 'nomad-spain' && (
              <NomadSpainPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'nomad-hungary' && (
              <NomadHungaryPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'nomad-croatia' && (
              <NomadCroatiaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'nomad-dubai' && (
              <NomadDubaiPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'freelance-germany' && (
              <FreelanceGermanyPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'selfemployed-finland' && (
              <SelfEmployedFinlandPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}

            {/* Financial */}
            {currentPage === 'financial-austria' && (
              <FinancialAustriaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'financial-spain' && (
              <FinancialSpainPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'financial-france' && (
              <FinancialFrancePage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}

            {/* Jobseeker */}
            {currentPage === 'jobseeker-germany' && (
              <JobSeekerGermanyPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'jobseeker-norway' && (
              <JobSeekerNorwayPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'jobseeker-denmark' && (
              <JobSeekerDenmarkPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'jobseeker-austria' && (
              <JobSeekerAustriaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'austria-rwr' && (
              <AustriaRwrCardPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'jobseeker-portugal' && (
              <JobSeekerPortugalPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}

            {/* Real Estate */}
            {currentPage === 'realestate-austria' && (
              <RealEstateAustriaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'realestate-turkey' && (
              <RealEstateTurkeyPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'realestate-france' && (
              <RealEstateFrancePage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'realestate-hungary' && (
              <RealEstateHungaryPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'realestate-greece' && (
              <RealEstateGreecePage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'realestate-latvia' && (
              <RealEstateLatviaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'realestate-slovakia' && (
              <RealEstateSlovakiaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}

            {/* Academic */}
            {currentPage === 'academic-spain' && (
              <AcademicSpainPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'academic-uk' && (
              <AcademicUKPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'academic-austria' && (
              <AcademicAustriaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'academic-austria-medical' && (
              <AcademicAustriaMedicalPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'academic-netherlands' && (
              <AcademicNetherlandsPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'academic-hungary' && (
              <AcademicHungaryPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'academic-canada' && (
              <AcademicCanadaPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}

            {/* Tools */}
            {currentPage === 'cost-calculator' && (
              <CostCalculatorPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'document-checker' && (
              <DocumentCheckerPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'method-comparator' && (
              <MethodComparatorPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'immigration-timeline' && (
              <ImmigrationTimelinePage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'visa-comparator' && (
              <VisaComparatorPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'education-comparator' && (
              <EducationComparatorPage onBackToHome={navigateToHome} onOpenAssessment={openAssessment} onNavigateToCountry={(k) => navigateToPage(k as PageType)} />
            )}
            {currentPage === 'job-search' && (
              <JobSearchPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToPage={navigateToPage}
              />
            )}
            {currentPage === 'country-guide' && (
              <CountryGuidePage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToPage={navigateToPage}
              />
            )}
            {currentPage === 'visa-news' && (
              <VisaNewsPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToPage={navigateToPage}
              />
            )}
            {currentPage === 'online-consult' && (
              <OnlineConsultPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToPage={navigateToPage}
              />
            )}
            {currentPage === 'after-arrival' && (
              <AfterArrivalPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToPage={navigateToPage}
              />
            )}
            {currentPage === 'blog' && (
              <BlogIndexPage
                onBackToHome={navigateToHome}
                onNavigateToPost={navigateToBlogPost}
                onOpenAssessment={openAssessment}
                onNavigateToPage={navigateToPage}
              />
            )}
            {currentPage === 'blog-post' && (
              <BlogPostPage
                slug={currentBlogSlug}
                onBackToHome={navigateToHome}
                onBackToBlog={() => navigateToPage('blog')}
                onOpenAssessment={openAssessment}
                onNavigateToPost={navigateToBlogPost}
                onNavigateToPage={navigateToPage}
              />
            )}

            {/* Dedicated Main Navigation Pages */}
            {currentPage === 'services' && (
              <ServicesDirectoryPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToPage={navigateToPage}
              />
            )}
            {currentPage === 'interactive-map' && (
              <InteractiveMapPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToPage={navigateToPage}
              />
            )}
            {currentPage === 'success-cases' && (
              <SuccessCasesPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToPage={navigateToPage}
              />
            )}
            {currentPage === 'about-us' && (
              <AboutUsPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToPage={navigateToPage}
              />
            )}
            {currentPage === 'podcasts' && (
              <PodcastsPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToPage={navigateToPage}
              />
            )}
            {currentPage === 'contact-us' && (
              <ContactUsPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToPage={navigateToPage}
              />
            )}

            {/* Home */}
            {currentPage === 'home' && (
              <>
                <BannerSection onOpenAssessment={openAssessment} />
                <HeroSection
                  onOpenAssessment={openAssessment}
                  onSelectFeature={handleSelectFeature}
                  onNavigateToPage={navigateToPage}
                />

                {showAssessmentModal && (
                  <section
                    ref={assessmentRef}
                    id="assessment-wizard-section"
                    className="scroll-mt-24 bg-white py-16"
                  >
                    <div className="container mx-auto px-4 md:px-8">
                      <div className="mx-auto max-w-4xl">
                        <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-4">
                          <div>
                            <h2 className="text-xl sm:text-2xl font-black text-[#0b2933]">
                              سامانه بررسی و ارزیابی شانس ویزا و اقامت
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                              پاسخ به سوالات جهت تخمین امتیاز، شانس قبولی در سفارت و برآورد دقیق مدارک و هزینه‌ها
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowAssessmentModal(false)}
                            className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
                          >
                            بستن فرم ✕
                          </button>
                        </div>

                        {!plan && (
                          <AssessmentWizard
                            profile={profile}
                            onProfileChange={handleProfileChange}
                            onSubmit={handleGeneratePlan}
                            isLoading={isLoading}
                          />
                        )}

                        {isLoading && (
                          <div className="py-12">
                            <LoadingSpinner />
                          </div>
                        )}

                        {error && (
                          <div className="mt-6 rounded-2xl bg-red-50 p-4 text-xs font-bold text-red-700 border border-red-200">
                            {error}
                          </div>
                        )}

                        {plan && !isLoading && (
                          <div ref={resultRef} className="scroll-mt-28 mt-8">
                            <ResultPanel plan={plan} profile={profile} onRestart={handleRestart} />
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                <ServicesSection
                  onSelectService={() => handleSelectFeature('method-comp')}
                  onNavigateToBlueCard={navigateToCountry}
                  onNavigateToPage={navigateToPage}
                />

                <FormCategoriesSection onOpenAssessment={openAssessment} />
                <SuccessMetricsSection />
                <InteractiveCaseMap onOpenAssessment={openAssessment} onNavigateToPage={navigateToPage} />
                <VisaSuccessSection />
                <PodcastsSection />
                <StoriesSection />
                <ImmigrationBlogSection
                  onOpenAssessment={openAssessment}
                  onNavigateToPost={navigateToBlogPost}
                  onNavigateToBlog={() => navigateToPage('blog')}
                />
                <AboutSection onOpenAssessment={openAssessment} />
                <FloatingActionBar onOpenAssessment={openAssessment} />
              </>
            )}
          </Suspense>
        </ErrorBoundary>
      </main>

      <ContactFooter />
      <SupportButton />
      <BackToTop />

      {activeFeatureModal && (
        <FeatureDetailModal
          initialFeatureId={activeFeatureModal}
          onClose={() => setActiveFeatureModal(null)}
          onOpenAssessment={openAssessment}
        />
      )}
    </div>
  );
};

export default App;