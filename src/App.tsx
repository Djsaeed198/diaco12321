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
import VisaGlobeSection from './components/VisaGlobeSection';
import ServicesSection from './components/ServicesSection';
import FormCategoriesSection from './components/FormCategoriesSection';
import SuccessMetricsSection from './components/SuccessMetricsSection';
import InteractiveCaseMap from './components/InteractiveCaseMap';
import VisaSuccessSection from './components/VisaSuccessSection';
import PodcastsSection from './components/PodcastsSection';
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
import { getStoredLanguage, setStoredLanguage, type Language } from './utils/i18n';

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
const LanguageCollegeVisaPage = lazy(() => import('./components/pages/education/LanguageCollegeVisaPage'));
const NoLanguageImmigrationPage = lazy(() => import('./components/pages/tools/NoLanguageImmigrationPage'));
const DegreeRecognitionPage = lazy(() => import('./components/pages/tools/DegreeRecognitionPage'));
const BestCountries2026Page = lazy(() => import('./components/pages/tools/BestCountries2026Page'));
const GlobalVisaRules2026Page = lazy(() => import('./components/pages/tools/GlobalVisaRules2026Page'));
const EasiestCountries2027Page = lazy(() => import('./components/pages/tools/EasiestCountries2027Page'));
const CompanyRegistrationImmigrationPage = lazy(() => import('./components/pages/business/CompanyRegistrationImmigrationPage'));
const GermanyNursingAssistantVisaPage = lazy(() => import('./components/pages/medical/GermanyNursingAssistantVisaPage'));
const MigrateWith1BillionTomanPage = lazy(() => import('./components/pages/tools/MigrateWith1BillionTomanPage'));
const RealCostHiddenFeesPage = lazy(() => import('./components/pages/tools/RealCostHiddenFeesPage'));
const CheapestEuropeanCountriesPage = lazy(() => import('./components/pages/tools/CheapestEuropeanCountriesPage'));
const VisaRejectionReasonsPage = lazy(() => import('./components/pages/tools/VisaRejectionReasonsPage'));
const GermanyVsAustriaComparisonPage = lazy(() => import('./components/pages/tools/GermanyVsAustriaComparisonPage'));
const ImmigrationWithDiplomaPage = lazy(() => import('./components/pages/tools/ImmigrationWithDiplomaPage'));
const CountriesNotRecommendedPage = lazy(() => import('./components/pages/tools/CountriesNotRecommendedPage'));
const WhySomeWait5YearsPage = lazy(() => import('./components/pages/tools/WhySomeWait5YearsPage'));
const IranianImmigrationMapPage = lazy(() => import('./components/pages/tools/IranianImmigrationMapPage'));
const VisaApprovalRatePage = lazy(() => import('./components/pages/tools/VisaApprovalRatePage'));
const SingleVsMarriedImmigrationPage = lazy(() => import('./components/pages/tools/SingleVsMarriedImmigrationPage'));
const ArtistsAndMusiciansImmigrationPage = lazy(() => import('./components/pages/artist/ArtistsAndMusiciansImmigrationPage'));
const BestDigitalNomadVisasPage = lazy(() => import('./components/pages/nomad/BestDigitalNomadVisasPage'));
const ImmigrationDocumentChecklistPage = lazy(() => import('./components/pages/tools/ImmigrationDocumentChecklistPage'));
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
  'austria-startup-visa': 'startup-austria',
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
  'netherlands-study-visa': 'academic-netherlands',
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
  'language-college-visa': 'language-college-visa',
  'immigration-without-language-certificate': 'immigration-without-language-certificate',
  'degree-recognition-for-immigration': 'degree-recognition-for-immigration',
  'best-countries-to-immigrate-to': 'best-countries-to-immigrate-to',
  'global-visa-rules-changes': 'global-visa-rules-changes',
  'easiest-countries-to-immigrate-2027': 'easiest-countries-to-immigrate-2027',
  'immigration-through-company-registration': 'immigration-through-company-registration',
  'germany-nursing-assistant-visa': 'germany-nursing-assistant-visa',
  'migrate-with-1-billion-toman': 'migrate-with-1-billion-toman',
  'real-cost-of-immigration-hidden-fees': 'real-cost-of-immigration-hidden-fees',
  'cheapest-european-countries-to-immigrate': 'cheapest-european-countries-to-immigrate',
  'why-my-visa-was-rejected-10-real-reasons': 'why-my-visa-was-rejected-10-real-reasons',
  'germany-vs-austria-immigration-comparison': 'germany-vs-austria-immigration-comparison',
  'immigration-with-high-school-diploma': 'immigration-with-high-school-diploma',
  'countries-we-do-not-recommend-for-immigration': 'countries-we-do-not-recommend-for-immigration',
  'why-some-wait-5-years-for-immigration-case-studies': 'why-some-wait-5-years-for-immigration-case-studies',
  'iranian-immigration-map-statistics': 'iranian-immigration-map-statistics',
  'visa-approval-rate-for-iranians-by-country': 'visa-approval-rate-for-iranians-by-country',
  'single-vs-married-immigration-which-is-easier': 'single-vs-married-immigration-which-is-easier',
  'immigration-for-artists-and-musicians': 'immigration-for-artists-and-musicians',
  'best-digital-nomad-visas-income-tax-comparison': 'best-digital-nomad-visas-income-tax-comparison',
  'complete-immigration-document-checklist': 'complete-immigration-document-checklist',
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
      'نوبت‌دهی جلسات مشاوره تصویری و تلفنی اختصاصی با وکلای رسمی و کارشناسان حقوقی دفاتر وین، آتن و تهران هلدینگ دیاکو.',
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
  'startup-austria': {
    title: 'ویزای استارتاپ اتریش ۲۰۲۶ | شرایط، هزینه و راهنمای کامل دیاکو',
    description:
      'راهنمای جامع ویزای استارتاپ اتریش (Rot-Weiß-Rot – Karte) در سال ۲۰۲۶. بررسی شرایط امتیازدهی، سرمایه اولیه ۵۰ هزار یورو، مراحل ثبت شرکت و مشاوره تخصصی هلدینگ دیاکو.',
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
      'مشاهده پراکندگی جغرافیایی ۲,۱۵۰+ پرونده موفق اقامت اتریش، آلمان، یونان، اسپانیا و هلند؛ تایم‌لاین واقعی صدور ویزا و آمار قبولی سفارتخانه‌ها.',
  },
  'success-cases': {
    title: 'گالری پرونده‌های موفق و ویزاهای صادره اروپا | هلدینگ بین‌المللی دیاکو',
    description:
      'مشاهده اسناد و تاییدیه‌های رسمی صدور ویزا و کارت‌های اقامت اتریش (NAG)، بلوکارت آلمان، گلدن ویزای یونان و اقامت تمکن مالی.',
  },
  'about-us': {
    title: 'درباره هلدینگ بین‌المللی دیاکو | بیش از ۱۱ سال سابقه رسمی (تأسیس ۱۳۹۴)',
    description:
      'آشنایی با تاریخچه (تأسیس ۱۳۹۴ / ۲۰۱۵)، بیش از ۱۱ سال سابقه رسمی، ۳۵ وکیل و مشاور حقوقی همکار، دفاتر وین، آتن و تهران و ۲,۱۵۰+ پرونده موفق اقامتی هلدینگ مهاجرتی دیاکو.',
  },
  podcasts: {
    title: 'رادیو مهاجرت دیاکو | پادکست‌های تخصصی حقوق مهاجرت و اقامت اروپا',
    description:
      'شنیدن تحلیل‌های صوتی دست‌اول، قوانین جدید مهاجرت ۲۰۲۶، مصاحبه با وکلای اتریش و آلمان و تجربیات واقعی موکلان دیاکو.',
  },
  'academic-netherlands': {
    title: 'مهاجرت تحصیلی به هلند ۲۰۲۶ | شرایط پذیرش، هزینه و ویزا | دیاکو',
    description:
      'راهنمای جامع مهاجرت تحصیلی به هلند در سال ۲۰۲۶. بررسی شرایط اخذ پذیرش دانشگاه‌های هلند، تمکن مالی IND (€۱,۱۳۰.۷۷ ماهانه)، هزینه‌های تحصیل و زندگی، ویزای همراه و ویزای کار جستجوی کار Zoekjaar.',
  },
  'language-college-visa': {
    title: 'مهاجرت از طریق کالج زبان ۲۰۲۶-۲۰۲۷ | شرایط، هزینه و ویزا | دیاکو',
    description:
      'راهنمای جامع مهاجرت از طریق کالج زبان در سال‌های ۲۰۲۶ و ۲۰۲۷ در آلمان، اتریش، مجارستان و اسپانیا بدون نیاز به مدرک زبان اولیه.',
  },
  'immigration-without-language-certificate': {
    title: 'مهاجرت بدون مدرک زبان ۲۰۲۶-۲۰۲۷ | روش‌های تحصیلی، کاری و سرمایه‌گذاری | دیاکو',
    description:
      'راهنمای جامع مهاجرت بدون مدرک زبان بین‌المللی در سال‌های ۲۰۲۶ و ۲۰۲۷ از طریق پذیرش مشروط، تمکن مالی، ثبت شرکت و کالج زبان.',
  },
  'degree-recognition-for-immigration': {
    title: 'معادل‌سازی مدرک تحصیلی برای مهاجرت ۲۰۲۶-۲۰۲۷ | ZAB، Anabin، WES و هزینه | دیاکو',
    description:
      'راهنمای جامع معادل‌سازی و ارزیابی مدرک تحصیلی برای مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷ در آلمان، اتریش و کانادا.',
  },
  'best-countries-to-immigrate-to': {
    title: 'بهترین کشور برای مهاجرت در سال ۲۰۲۶-۲۰۲۷ | مقایسه ۵ کشور برتر | دیاکو',
    description:
      'بررسی بهترین کشور برای مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷ بر اساس معیارهای کاری، تحصیلی، سرمایه‌گذاری و رفاه اجتماعی (سوئیس، کانادا، آلمان، استرالیا، امارات).',
  },
  'global-visa-rules-changes': {
    title: 'قوانین جدید ویزاهای کشورهای مختلف ۲۰۲۶-۲۰۲۷ | تغییرات اروپا، کانادا و استرالیا | دیاکو',
    description:
      'تحلیل قوانین جدید ویزا در ۲۰۲۶ و ۲۰۲۷ شامل EES و ETIAS شینگن، بلوکارت و کارت فرصت آلمان، کارت RWR اتریش، گلدن ویزاها، کانادا و استرالیا.',
  },
  'easiest-countries-to-immigrate-2027': {
    title: 'راحت‌ترین کشور برای مهاجرت در ۲۰۲۷ کجاست؟ | مقایسه ارزان‌ترین و سریع‌ترین مسیرها | دیاکو',
    description:
      'بررسی راحت‌ترین کشور برای مهاجرت در سال ۲۰۲۷ از نظر هزینه، مدرک زبان، سرعت صدور ویزا و شرایط اقامت در پرتغال، اسپانیا، آلمان، اتریش، مجارستان، یونان و امارات.',
  },
  'immigration-through-company-registration': {
    title: 'مهاجرت از طریق ثبت شرکت ۲۰۲۶-۲۰۲۷ | انتخاب بهترین کشور و هزینه‌ها | دیاکو',
    description:
      'راهنمای جامع مهاجرت از طریق ثبت شرکت در سال‌های ۲۰۲۶ و ۲۰۲۷. مقایسه شرایط، حداقل سرمایه، مالیات و سرعت اخذ اقامت در اتریش، آلمان، مجارستان، اسپانیا و امارات.',
  },
  'germany-nursing-assistant-visa': {
    title: 'نحوه اخذ ویزای کار کمک پرستاری آلمان ۲۰۲۶-۲۰۲۷ | شرایط، مدرک زبان و حقوق | دیاکو',
    description:
      'راهنمای جامع نحوه اخذ ویزای کار کمک پرستاری آلمان (Pflegehelfer) در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی معادلسازی مدرک، زبان B1/B2، آوسبیلدونگ و حقوق ماهانه.',
  },
  'migrate-with-1-billion-toman': {
    title: 'با ۱ میلیارد تومان کجا می‌توانم مهاجرت کنم؟ | جدول کامل ۲۰۲۶-۲۰۲۷ | دیاکو',
    description:
      'راهنمای واقعی و شفاف مهاجرت با ۱ میلیارد تومان در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی مسیرهای تحصیلی، کاری و آوسبیلدونگ در آلمان، ایتالیا، اتریش و عمان.',
  },
  'real-cost-of-immigration-hidden-fees': {
    title: 'هزینه واقعی مهاجرت ۲۰۲۶-۲۰۲۷ | هزینه‌های پنهانی که هیچ آژانسی نمی‌گوید | دیاکو',
    description:
      'بررسی صادقانه و شفاف هزینه واقعی مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷. افشای هزینه‌های پنهان ترجمه، معادلسازی مدرک، ودیعه مسکن اروپا (Kaution) و مخارج زندگی تا اولین حقوق.',
  },
  'cheapest-european-countries-to-immigrate': {
    title: 'ارزان‌ترین کشورهای اروپایی برای مهاجرت در ۲۰۲۶-۲۰۲۷ (با رتبه‌بندی واقعی) | دیاکو',
    description:
      'رتبه‌بندی واقعی ارزان‌ترین کشورهای اروپایی برای مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی هزینه تحصیل، زندگی و ویزا در ایتالیا، آلمان، اتریش، مجارستان و پرتغال.',
  },
  'why-my-visa-was-rejected-10-real-reasons': {
    title: 'چرا ویزای من رد شد؟ | ۱۰ دلیل واقعی ریجکتی ویزا و راه‌های رفع آن (۲۰۲۶) | دیاکو',
    description:
      'بررسی ۱۰ دلیل واقعی ریجکت شدن ویزاهای شینگن، تحصیلی، کاری و سرمایه‌گذاری در سال‌های ۲۰۲۶ و ۲۰۲۷ بر اساس پرونده‌های واقعی و راهنمای رفع ریجکتی.',
  },
  'germany-vs-austria-immigration-comparison': {
    title: 'آلمان یا اتریش برای مهاجرت در ۲۰۲۶-۲۰۲۷؟ | مقایسه صریح بر اساس ۶ معیار واقعی | دیاکو',
    description:
      'مقایسه صادقانه و بی‌پرده مهاجرت به آلمان یا اتریش در سال‌های ۲۰۲۶ و ۲۰۲۷ بر اساس ۶ معیار واقعی: حقوق، مالیات، هزینه مسکن، سرعت اخذ پاسپورت و ویزای همراه.',
  },
  'immigration-with-high-school-diploma': {
    title: 'مهاجرت با مدرک دیپلم ۲۰۲۶-۲۰۲۷ | کدام کشورها واقعاً راه می‌دهند؟ | دیاکو',
    description:
      'راهنمای واقعی مهاجرت با مدرک دیپلم و بدون مدرک دانشگاهی در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی آوسبیلدونگ آلمان، کار فنی در اتریش، کالج زبان و ثبت شرکت.',
  },
  'countries-we-do-not-recommend-for-immigration': {
    title: 'کشورهایی که مهاجرت به آن‌ها را اصلاً توصیه نمی‌کنیم (و چرا؟) — راهنمای ۲۰۲۶-۲۰۲۷ | دیاکو',
    description:
      'نقد صادقانه و بدون تعارف مقاصد مهاجرتی پرریسک در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی دلایل حقوقی و مالی عدم توصیه جزایر کارائیب، کشورهای غیرشینگن شرق اروپا، استرالیا و بریتانیا.',
  },
  'why-some-wait-5-years-for-immigration-case-studies': {
    title: 'چرا بعضی‌ها ۵ سال در صف مهاجرت می‌مانند؟ | تحلیل ۴ پرونده واقعی (۲۰۲۶) | دیاکو',
    description:
      'بررسی دلایل واقعی فرسایشی شدن پروسه مهاجرت و تحلیل ۴ پرونده واقعی که ۵ سال در انتظار ماندند. چگونه زمان مهاجرت به اروپا را در سال ۲۰۲۶-۲۰۲۷ به زیر ۶ ماه برسانیم؟',
  },
  'iranian-immigration-map-statistics': {
    title: 'نقشه مهاجرت ایرانیان در ۲۰۲۵ (و روندهای ۲۰۲۶-۲۰۲۷): به کدام کشورها بیشتر می‌روند؟ | دیاکو',
    description:
      'بررسی داده‌محور نقشه مهاجرت ایرانیان در سال ۲۰۲۵ و روندهای ۲۰۲۶–۲۰۲۷. آمار سهم اروپا (+۶۰٪)، آلمان، ایتالیا، اتریش، دبی، عمان و افت ویزای دانشجویی کانادا.',
  },
  'visa-approval-rate-for-iranians-by-country': {
    title: 'نرخ موفقیت ویزا به تفکیک کشور برای ایرانیان (جدول کامل ۲۰۲۶-۲۰۲۷) | دیاکو',
    description:
      'بررسی دقیق نرخ موفقیت ویزای شینگن (توریستی C)، کاری آلمان و اتریش (+۹۰٪)، تحصیلی ایتالیا و اتریش، ثبت شرکت دبی (+۹۵٪)، کانادا و آمریکا برای ایرانیان در ۲۰۲۶–۲۰۲۷.',
  },
  'single-vs-married-immigration-which-is-easier': {
    title: 'مهاجرت مجردها در مقابل متأهل‌ها (۲۰۲۶-۲۰۲۷) | کدام مسیر آسان‌تر است؟ | دیاکو',
    description:
      'مقایسه صادقانه و تخصصی مهاجرت مجردها و متأهل‌ها در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی هزینه تمکن مالی، قوانین ویزای همراه اروپا و کانادا، اجازه کار همسر و اقدام همزمان یا الحاق.',
  },
  'immigration-for-artists-and-musicians': {
    title: 'مهاجرت برای هنرمندان و اهالی موسیقی (۲۰۲۶-۲۰۲۷) | کشورهایی که واقعاً حمایت می‌کنند | دیاکو',
    description:
      'راهنمای جامع مهاجرت هنرمندان، نوازندگان و اهالی موسیقی در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی ویزای هنرمندان آلمان (صندوق بیمه KSK)، وین اتریش، Talent Passport فرانسه و هلند.',
  },
  'best-digital-nomad-visas-income-tax-comparison': {
    title: 'ویزای نومد دیجیتال ۲۰۲۶-۲۰۲۷ | جدول مقایسه درآمد و مالیات بهترین کشورها | دیاکو',
    description:
      'راهنمای جامع ویزای نومد دیجیتال در سال‌های ۲۰۲۶ و ۲۰۲۷. مقایسه تخصصی حداقل درآمد ماهانه، قانون بکهام اسپانیا (۲۴٪)، پرتغال D8، یونان، ایتالیا و معافیت ۰٪ دبی.',
  },
  'complete-immigration-document-checklist': {
    title: 'چک‌لیست کامل مدارک مهاجرت: ۳۰ سند کلیدی که باید همین امروز آماده کنید (۲۰۲۶-۲۰۲۷) | دیاکو',
    description:
      'چک‌لیست کامل و گام‌به‌گام مدارک مهاجرت به اروپا و کانادا در سال‌های ۲۰۲۶ و ۲۰۲۷ شامل ۳۰ سند ضروری هویتی، تحصیلی (ZAB/ENIC)، شغلی، بیمه، مالی و زبان.',
  },
  'startup-canada': {
    title: 'ویزای استارت‌آپ کانادا ۲۰۲۶ | اخذ مستقیم اقامت دائم PR | دیاکو',
    description:
      'راهنمای کامل استارت‌آپ ویزای کانادا (SUV)؛ اخذ نامه حمایتی LOS از انکوباتورهای تاییدشده، اقامت دائم مستقیم برای کل خانواده و بدون شرط سنی با دیاکو.',
  },
  'startup-germany': {
    title: 'ویزای استارت‌آپ آلمان ۲۰۲۶ | اقامت کارآفرینی ماده ۲۱ | دیاکو',
    description:
      'راهنمای ویزای استارت‌آپ و خوداشتغالی آلمان ۲۰۲۶؛ تاییدیه اتاق بازرگانی IHK، هاب‌های فناوری برلین و مونیخ و مسیر اقامت دائم ۳ ساله با دیاکو.',
  },
  'startup-france': {
    title: 'ویزای استارت‌آپ فرانسه ۲۰۲۶ | French Tech Visa و Passeport Talent | دیاکو',
    description:
      'راهنمای کامل ویزای استارت‌آپ فرانسه (French Tech Visa) ۲۰۲۶: تاییدیه DREETS و انکوباتورهای تاییدشده، اقامت ۴ ساله Passeport Talent و شرط تمکن SMIC با دیاکو.',
  },
  'startup-netherlands': {
    title: 'ویزای استارت‌آپ هلند ۲۰۲۶ | شرایط Facilitator تایید RVO و اقامت IND | دیاکو',
    description:
      'راهنمای جامع ویزای استارت‌آپ هلند ۲۰۲۶: انتخاب تسهیل‌گر (Facilitator) مورد تایید RVO، اقامت ۱ ساله و تبدیل به مجوز کارآفرینی خوداشتغالی در آمستردام با دیاکو.',
  },
  'startup-finland': {
    title: 'ویزای استارت‌آپ فنلاند ۲۰۲۶ | تاییدیه Business Finland و اقامت Migri | دیاکو',
    description:
      'راهنمای کامل ویزای استارت‌آپ فنلاند ۲۰۲۶: اخذ تاییدیه Business Finland، تمکن مالی ۱,۲۱۰ یورو/ماه، مالکیت ۶۰٪ تیم بنیان‌گذار و اقامت نوع A از Migri با دیاکو.',
  },
  'startup-denmark': {
    title: 'ویزای استارت‌آپ دانمارک ۲۰۲۶ | تاییدیه DBA، شرایط SIRI و تمکن مالی | دیاکو',
    description:
      'راهنمای جامع ویزای استارت‌آپ دانمارک (Start-up Denmark) در سال ۲۰۲۶: ارزیابی طرح نوآورانه توسط هیئت کارشناسی DBA و شرایط اقامت ۲ ساله SIRI با دیاکو.',
  },
  'business-dubai': {
    title: 'ثبت شرکت و اقامت دبی ۲۰۲۶ | مناطق آزاد Freezone و Mainland | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت در دبی ۲۰۲۶؛ مالکیت ۱۰۰٪ خارجی در مناطق آزاد Freezone و Mainland، افتتاح حساب شرکتی امارات و اقامت خانوادگی با دیاکو.',
  },
  'business-austria': {
    title: 'ثبت شرکت در اتریش ۲۰۲۶ | GmbH و FlexCo + اقامت سرمایه‌گذاری | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت در اتریش ۲۰۲۶: حداقل سرمایه €۱۰,۰۰۰، مراحل ثبت GmbH و FlexCo، مالیات ۲۳٪ و مسیرهای اخذ اقامت از طریق سرمایه‌گذاری با دفتر وین دیاکو.',
  },
  'business-netherlands': {
    title: 'ثبت شرکت در هلند BV ۲۰۲۶ | مالیات ۱۹٪، KVK و قوانین اقامت IND | دیاکو',
    description:
      'راهنمای جامع ثبت شرکت BV در هلند ۲۰۲۶: قوانین سردفتر و اتاق بازرگانی KVK، مالیات ۱۹٪ تا ۲۰۰ هزار یورو و شرایط اقامت خوداشتغالی IND/RVO با دیاکو.',
  },
  'business-france': {
    title: 'ثبت شرکت در فرانسه SAS/SARL ۲۰۲۶ | مالیات IS و Passeport Talent | دیاکو',
    description:
      'راهنمای جامع ثبت شرکت SAS، SASU و SARL در فرانسه ۲۰۲۶: نرخ مالیات ۱۵٪/۲۵٪، پورتال INPI، کارت Kbis و ضوابط اقامت ۳۰ هزار یورویی کارآفرینی با دیاکو.',
  },
  'business-greece': {
    title: 'ثبت شرکت در یونان IKE ۲۰۲۶ | مالیات ۲۲٪، GEMI و اقامت کارآفرینی | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت IKE در یونان ۲۰۲۶: سرمایه اسمی ۱ یورویی، مالیات ۲۲٪ شرکتی و ۵٪ سود سهام، شماره مالیاتی AFM و مسیر اقامت آتن با دیاکو.',
  },
  'business-hungary': {
    title: 'ثبت شرکت در مجارستان Kft ۲۰۲۶ | مالیات ۹٪ و قوانین اقامت | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت Kft در مجارستان ۲۰۲۶: حداقل سرمایه ۳ میلیون فورینت، مالیات ۹٪ TAO و HIPA، نکات حیاتی قانون Act XC of 2023 و Enter Hungary با دیاکو.',
  },
  'business-poland': {
    title: 'ثبت شرکت در لهستان Sp. z o.o. ۲۰۲۶ | مالیات ۹٪ و کارت اقامت | دیاکو',
    description:
      'راهنمای جامع ثبت شرکت Sp. z o.o. در لهستان ۲۰۲۶: حداقل سرمایه ۵,۰۰۰ زلوتی، مالیات ۹٪ CIT، سامانه S24/KRS و ضوابط واقعی اخذ کارت اقامت Karta Pobytu با دیاکو.',
  },
  'business-portugal': {
    title: 'ثبت شرکت در پرتغال Lda و ویزای کارآفرینی D2 ۲۰۲۶ | راهنمای AIMA | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت Lda در پرتغال و ویزای D2 کارآفرینی ۲۰۲۶؛ دریافت NIF، نرخ مالیات ۱۵٪ SME و نکات تمدید اقامت نزد AIMA با دیاکو.',
  },
  'business-slovakia': {
    title: 'ثبت شرکت در اسلوواکی s.r.o. ۲۰۲۶ | مالیات ۱۰٪ و ضوابط اقامت | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت s.r.o. در اسلوواکی ۲۰۲۶: سرمایه ۵ هزار یورو، مالیات ۱۰٪ CIT تا ۱۰۰ هزار یورو و قوانین جدید سفارت و پلیس اتباع خارجی با دیاکو.',
  },
  'business-latvia': {
    title: 'ثبت شرکت در لتونی SIA ۲۰۲۶ | مالیات ۰٪ سود انباشته و اقامت PMLP | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت SIA در لتونی ۲۰۲۶: مالیات ۰٪ بر سود توزیع‌نشده، آستانه‌های ۵۰ و ۱۰۰ هزار یورویی ماده ۲۳ اقامت تجاری PMLP و ثبت ریگا با دیاکو.',
  },
  'business-turkey': {
    title: 'ثبت شرکت در ترکیه ۲۰۲۶ | سرمایه ۵۰ هزار لیر، مالیات و مجوز کار | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت در ترکیه استانبول ۲۰۲۶: حداقل سرمایه جدید ۵۰,۰۰۰ لیر، مالیات ۲۵٪، ضوابط مجوز کار ÇSGB با ۵ پرسنل ترک و چالش‌های بانکی با دیاکو.',
  },
  'contact-us': {
    title: 'تماس با دفاتر هلدینگ بین‌المللی دیاکو در وین، آتن و تهران',
    description:
      'اطلاعات تماس، آدرس دفاتر وین (اتریش)، آتن (یونان) و تهران (ایران)، ساعات کاری، رزرو وقت مشاوره حضوری و پشتیبانی واتساپ.',
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
  const [lang, setLang] = useState<Language>(() => getStoredLanguage());

  const handleToggleLang = useCallback((newLang?: Language) => {
    setLang((prev) => {
      const next = newLang ?? (prev === 'fa' ? 'en' : 'fa');
      setStoredLanguage(next);
      return next;
    });
  }, []);

  useEffect(() => {
    setStoredLanguage(lang);
  }, [lang]);

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
      <div dir={lang === 'fa' ? 'rtl' : 'ltr'} className="flex min-h-screen flex-col bg-[#f3f6f9] font-sans">
        <Header
          onOpenAssessment={openAssessment}
          currentPage={currentPage}
          onNavigateHome={navigateToHome}
          onNavigateToCountry={navigateToCountry}
          onNavigateToBlueCard={navigateToCountry}
          onNavigateToPage={navigateToPage}
          onNavigateToBlogPost={navigateToBlogPost}
          lang={lang}
          onToggleLanguage={handleToggleLang}
        />
        <main id="main-content" className="flex-grow pt-16 lg:pt-24">
          <NotFoundPage onBackToHome={navigateToHome} />
        </main>
        <ContactFooter />
      </div>
    );
  }

  /* ---------- Main Render ---------- */
  return (
    <div dir={lang === 'fa' ? 'rtl' : 'ltr'} className="flex min-h-screen flex-col bg-[#f3f6f9] text-slate-800 font-sans">
      <OrganizationSchema />

      <Header
        onOpenAssessment={openAssessment}
        currentPage={currentPage}
        onNavigateHome={navigateToHome}
        onNavigateToCountry={navigateToCountry}
        onNavigateToBlueCard={navigateToCountry}
        onNavigateToPage={navigateToPage}
        onNavigateToBlogPost={navigateToBlogPost}
        lang={lang}
        onToggleLanguage={handleToggleLang}
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
              <StartupAustriaPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
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
              <AcademicNetherlandsPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
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
            {currentPage === 'language-college-visa' && (
              <LanguageCollegeVisaPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'immigration-without-language-certificate' && (
              <NoLanguageImmigrationPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'degree-recognition-for-immigration' && (
              <DegreeRecognitionPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'best-countries-to-immigrate-to' && (
              <BestCountries2026Page
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'global-visa-rules-changes' && (
              <GlobalVisaRules2026Page
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'easiest-countries-to-immigrate-2027' && (
              <EasiestCountries2027Page
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'immigration-through-company-registration' && (
              <CompanyRegistrationImmigrationPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'germany-nursing-assistant-visa' && (
              <GermanyNursingAssistantVisaPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'migrate-with-1-billion-toman' && (
              <MigrateWith1BillionTomanPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'real-cost-of-immigration-hidden-fees' && (
              <RealCostHiddenFeesPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'cheapest-european-countries-to-immigrate' && (
              <CheapestEuropeanCountriesPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'why-my-visa-was-rejected-10-real-reasons' && (
              <VisaRejectionReasonsPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'germany-vs-austria-immigration-comparison' && (
              <GermanyVsAustriaComparisonPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'immigration-with-high-school-diploma' && (
              <ImmigrationWithDiplomaPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'countries-we-do-not-recommend-for-immigration' && (
              <CountriesNotRecommendedPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'why-some-wait-5-years-for-immigration-case-studies' && (
              <WhySomeWait5YearsPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'iranian-immigration-map-statistics' && (
              <IranianImmigrationMapPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'visa-approval-rate-for-iranians-by-country' && (
              <VisaApprovalRatePage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'single-vs-married-immigration-which-is-easier' && (
              <SingleVsMarriedImmigrationPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'immigration-for-artists-and-musicians' && (
              <ArtistsAndMusiciansImmigrationPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'best-digital-nomad-visas-income-tax-comparison' && (
              <BestDigitalNomadVisasPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
              />
            )}
            {currentPage === 'complete-immigration-document-checklist' && (
              <ImmigrationDocumentChecklistPage
                onBackToHome={navigateToHome}
                onOpenAssessment={openAssessment}
                onNavigateToCountry={(k) => navigateToPage(k as PageType)}
                onNavigateToPage={(p) => navigateToPage(p as PageType)}
                onNavigateToBlogPost={navigateToBlogPost}
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
                {/* بخش مشترک پس‌زمینه مرمر لوکس ابری مطابق با تصویر ارسالی کاربر */}
                <div className="relative diaco-marble-canvas overflow-hidden border-b border-slate-200/60">
                  {/* بافت رگه‌های طبیعی سنگ مرمر کارارا و مه ابری با فیلتر SVG فاکتورال نویز */}
                  <div className="diaco-marble-veins-overlay">
                    <svg className="w-full h-full min-h-[900px]" xmlns="http://www.w3.org/2000/svg">
                      <filter id="diaco-marble-pattern">
                        <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.002" numOctaves="5" seed="18" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                        <feColorMatrix type="matrix" values="
                          0.33 0.33 0.33 0 0
                          0.33 0.33 0.33 0 0
                          0.33 0.33 0.33 0 0
                          0    0    0    1 0" />
                        <feComponentTransfer>
                          <feFuncR type="linear" slope="0.65" intercept="0.35" />
                          <feFuncG type="linear" slope="0.65" intercept="0.35" />
                          <feFuncB type="linear" slope="0.70" intercept="0.33" />
                        </feComponentTransfer>
                      </filter>
                      <rect width="100%" height="100%" filter="url(#diaco-marble-pattern)" fill="#cbd5e1" />
                    </svg>
                  </div>

                  {/* الگوهای ابری و درخشش ارگانیک ملایم روی مرمر */}
                  <div className="absolute top-1/4 -right-20 h-96 w-96 rounded-full bg-white/70 blur-[100px] pointer-events-none" />
                  <div className="absolute top-1/3 -left-20 h-96 w-96 rounded-full bg-slate-300/30 blur-[120px] pointer-events-none" />
                  <div className="absolute bottom-10 right-1/3 h-80 w-80 rounded-full bg-white/80 blur-[90px] pointer-events-none" />

                  <div className="relative z-10">
                    <BannerSection onOpenAssessment={openAssessment} />
                    <HeroSection
                      onOpenAssessment={openAssessment}
                      onSelectFeature={handleSelectFeature}
                      onNavigateToPage={navigateToPage}
                    />
                  </div>
                </div>

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

                <VisaGlobeSection />

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

      <ContactFooter onNavigateToPage={navigateToPage} onNavigateToBlogPost={navigateToBlogPost} />
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