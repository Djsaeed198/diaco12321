/**
 * بانک اطلاعات جامع و رسمی چک‌لیست مدارک مهاجرتی ۲۰۲۶
 * نسخه ۲.۱ — بازبینی‌شده بر اساس آخرین بخشنامه‌های رسمی ۲۰۲۶
 *
 * مراجع:
 *  - اتریش: BMI, MA35, OeAD, AMS
 *  - آلمان: BAMF, ZAB, Make it in Germany, Auswärtiges Amt
 *  - اسپانیا: Extranjería, UGE-CE, BOE
 *  - یونان: ΥΠΟΥΡΓΕΙΟ ΜΕΤΑΝΑΣΤΕΥΣΗΣ (Ministry of Migration)
 *  - شینگن: EU Visa Code, eu-LISA
 */

/* ============================================================
   Types — نسخه ارتقایافته با فیلدهای عملیاتی
   ============================================================ */

export type DocumentCategory =
  | 'identity'
  | 'financial'
  | 'academic_job'
  | 'accommodation_insurance'
  | 'language'
  | 'legalization'
  | 'health';

export type FamilyScope = 'single' | 'married' | 'with_children' | 'all';

export interface DocumentItem2026 {
  id: string;
  title: string;
  category: DocumentCategory;
  isMandatory: boolean;

  /** مرجع صادرکننده */
  issuingAuthority: string;

  /** مدت اعتبار */
  validity: string;

  /** یادداشت رسمی ۲۰۲۶ — مستند به بخشنامه */
  officialNote2026: string;

  /** برای چه گروه خانوادگی لازم است */
  familyRelevant?: FamilyScope;

  /** آیا ترجمه رسمی لازم است */
  translationRequired: boolean;

  /** آیا آپوستیل یا لگالیزاسیون لازم است */
  apostilleRequired: boolean;

  /** زبان‌های ترجمه مورد قبول */
  acceptedTranslationLanguages?: Array<'de' | 'en' | 'es' | 'el' | 'fr' | 'it' | 'nl' | 'pt'>;

  /** برآورد زمان پردازش (روز کاری) */
  estimatedProcessingDays?: number;

  /** آیا با وکالت در کشور مقصد قابل اخذ است */
  canBeObtainedViaAttorney?: boolean;

  /** هشدار خاص */
  warningFlag?: string;

  /** لینک منبع رسمی */
  officialSourceUrl?: string;
}

export interface PathChecklist2026 {
  pathId: string;
  pathName: string;
  country: string;
  flag: string;
  officialSource2026: string;
  officialUrl: string;
  summary: string;
  documents: DocumentItem2026[];
  /** حداقل زمان لازم برای تکمیل پرونده */
  minimumPrepDays: number;
  /** برآورد هزینه کل پرونده (یورو) */
  estimatedTotalCostEur: { min: number; max: number };
  /** آیا سهمیه سالانه دارد */
  hasAnnualQuota: boolean;
}

/* ============================================================
   Countries
   ============================================================ */

export const CHECKLIST_COUNTRIES_2026 = [
  { id: 'austria',     name: 'اتریش',     flag: '🇦🇹', officialOrg: 'اداره مهاجرت MA35 و وزارت کشور (BMI)',           officialUrl: 'https://www.bmi.gv.at' },
  { id: 'germany',     name: 'آلمان',     flag: '🇩🇪', officialOrg: 'BAMF، پورتال ZAB و سفارت آلمان',                   officialUrl: 'https://www.make-it-in-germany.com' },
  { id: 'spain',       name: 'اسپانیا',   flag: '🇪🇸', officialOrg: 'اداره مهاجرت (Extranjería) و UGE',                 officialUrl: 'https://extranjeros.inclusion.gob.es' },
  { id: 'greece',      name: 'یونان',     flag: '🇬🇷', officialOrg: 'وزارت مهاجرت و پناهندگی (Αθήνα / Γλυφάδα)',        officialUrl: 'https://migration.gov.gr' },
  { id: 'italy',       name: 'ایتالیا',   flag: '🇮🇹', officialOrg: 'کنسولگری ایتالیا و پرتال Universitaly',             officialUrl: 'https://www.universitaly.it' },
  { id: 'france',      name: 'فرانسه',    flag: '🇫🇷', officialOrg: 'OFII و Prefecture',                                 officialUrl: 'https://www.ofii.fr' },
  { id: 'netherlands', name: 'هلند',      flag: '🇳🇱', officialOrg: 'IND (Immigratie- en Naturalisatiedienst)',         officialUrl: 'https://ind.nl' },
  { id: 'portugal',    name: 'پرتغال',    flag: '🇵🇹', officialOrg: 'AIMA (Agência para a Integração, Migrações)',      officialUrl: 'https://aima.gov.pt' },
  { id: 'canada',      name: 'کانادا',    flag: '🇨🇦', officialOrg: 'IRCC',                                              officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship.html' },
  { id: 'denmark',     name: 'دانمارک',   flag: '🇩🇰', officialOrg: 'SIRI (Styrelsen for International Rekruttering)',  officialUrl: 'https://www.nyidanmark.dk' },
] as const;

export type CountryId = (typeof CHECKLIST_COUNTRIES_2026)[number]['id'];

/* ============================================================
   Paths
   ============================================================ */

export const CHECKLIST_PATHS_2026 = [
  { id: 'personal',     name: 'تمکن مالی (خودحمایتی)',                   icon: '🏰' },
  { id: 'rwr_shortage', name: 'RWR اتریش — مشاغل کمبود',                  icon: '🇦🇹' },
  { id: 'rwr_other',    name: 'RWR اتریش — سایر کارگران کلیدی',            icon: '🇦🇹' },
  { id: 'bluecard',     name: 'کارت آبی اتحادیه اروپا',                    icon: '🇪🇺' },
  { id: 'jobseeker',    name: 'ویزای جستجوی کار',                          icon: '🔍' },
  { id: 'medical',      name: 'مهاجرت پزشکان و کادر درمان',                icon: '🩺' },
  { id: 'education',    name: 'اقامت تحصیلی دانشگاهی',                     icon: '🎓' },
  { id: 'courses',      name: 'آوسبیلدونگ و دوره زبان',                    icon: '🗣️' },
  { id: 'startup',      name: 'استارت‌آپ و کارآفرینی',                     icon: '🚀' },
  { id: 'business',     name: 'ثبت شرکت و بیزینس',                          icon: '🏢' },
  { id: 'realestate',   name: 'خرید ملک و گلدن ویزا',                      icon: '🏡' },
  { id: 'nomad',        name: 'دیجیتال نوماد و فریلنسری',                  icon: '💻' },
  { id: 'artist',       name: 'هنرمندی و نخبگان',                           icon: '🎨' },
  { id: 'researcher',   name: 'محقق و پژوهشگر',                            icon: '🔬' },
  { id: 'citizenship',  name: 'شهروندی و پاسپورت دوم',                      icon: '🛂' },
] as const;

export type PathId = (typeof CHECKLIST_PATHS_2026)[number]['id'];

/* ============================================================
   Common Identity Documents
   ============================================================ */

const COMMON_IDENTITY_DOCS: DocumentItem2026[] = [
  {
    id: 'passport',
    title: 'گذرنامه بین‌المللی',
    category: 'identity',
    isMandatory: true,
    issuingAuthority: 'اداره گذرنامه و مهاجرت',
    validity: 'حداقل ۱۸ ماه اعتبار + ۲ صفحه خالی',
    officialNote2026:
      'سفارتخانه‌های شینگن از ۲۰۲۶ اسکن تمام صفحات دارای مهر و روادید قبلی را درخواست می‌کنند.',
    familyRelevant: 'all',
    translationRequired: false,
    apostilleRequired: false,
    estimatedProcessingDays: 0,
  },
  {
    id: 'birth_cert',
    title: 'شناسنامه متقاضی اصلی',
    category: 'identity',
    isMandatory: true,
    issuingAuthority: 'سازمان ثبت احوال',
    validity: 'ترجمه حداکثر ۶ ماه',
    officialNote2026:
      'ترجمه رسمی + تایید دادگستری + وزارت امور خارجه + سفارت (۳ مرحله). از ۲۰۲۶ آپوستیل نیز پذیرفته می‌شود.',
    familyRelevant: 'all',
    translationRequired: true,
    apostilleRequired: true,
    acceptedTranslationLanguages: ['de', 'en', 'es', 'el', 'fr', 'it', 'nl', 'pt'],
    estimatedProcessingDays: 10,
    officialSourceUrl: 'https://www.sabt.ir',
  },
  {
    id: 'police_clearance',
    title: 'گواهی عدم سوءپیشینه کیفری',
    category: 'identity',
    isMandatory: true,
    issuingAuthority: 'پلیس +۱۰ / قوه قضائیه',
    validity: 'حداکثر ۳ ماه از صدور',
    officialNote2026:
      'در اتریش و آلمان، آپوستیل یا Legalisierung اجباری است. برای کانادا RCMP Check نیز لازم است.',
    familyRelevant: 'all',
    translationRequired: true,
    apostilleRequired: true,
    estimatedProcessingDays: 14,
  },
  {
    id: 'biometric_photos',
    title: 'عکس بیومتریک ICAO',
    category: 'identity',
    isMandatory: true,
    issuingAuthority: 'استودیوهای دارای تجهیزات بیومتریک',
    validity: 'گرفته‌شده در ۳ ماه اخیر',
    officialNote2026:
      'ابعاد ۳۵×۴۵ میلی‌متر، پس‌زمینه سفید، بدون عینک آفتابی، بدون لبخند.',
    familyRelevant: 'all',
    translationRequired: false,
    apostilleRequired: false,
    estimatedProcessingDays: 1,
  },
  {
    id: 'marriage_cert',
    title: 'سند ازدواج',
    category: 'identity',
    isMandatory: false,
    issuingAuthority: 'دفاتر رسمی ازدواج',
    validity: 'ترجمه با تاییدات ۳ ماهه',
    officialNote2026:
      'برای الحاق همسر الزامی است. در آلمان از ۲۰۲۶ ترجمه باید توسط مترجم سوگندخورده (beeidigter Übersetzer) باشد.',
    familyRelevant: 'married',
    translationRequired: true,
    apostilleRequired: true,
    estimatedProcessingDays: 10,
  },
  {
    id: 'children_birth_certs',
    title: 'شناسنامه فرزندان زیر ۱۸ سال',
    category: 'identity',
    isMandatory: false,
    issuingAuthority: 'سازمان ثبت احوال',
    validity: 'ترجمه با تاییدات رسمی',
    officialNote2026:
      'همراه با اجازه خروج محضری اگر یکی از والدین سفر نمی‌کند. از ۲۰۲۵ برای سفر به شینگن، اجازه خروج والد غایب اجباری شده است.',
    familyRelevant: 'with_children',
    translationRequired: true,
    apostilleRequired: true,
    estimatedProcessingDays: 10,
  },
];

/* ============================================================
   Main checklist builder
   ============================================================ */

export function getDetailedChecklist2026(
  pathKey: string,
  countryKey: string,
): PathChecklist2026 {
  const countryObj =
    CHECKLIST_COUNTRIES_2026.find((c) => c.id === countryKey) ?? CHECKLIST_COUNTRIES_2026[0];
  const pathObj =
    CHECKLIST_PATHS_2026.find((p) => p.id === pathKey) ?? CHECKLIST_PATHS_2026[0];

  let specificDocs: DocumentItem2026[] = [];
  let minimumPrepDays = 60;
  let estimatedTotalCostEur = { min: 500, max: 2000 };
  let hasAnnualQuota = false;

  switch (pathKey) {
    /* ----------------------------------------------------------
       1) تمکن مالی (Quotenkontingent اتریش / Non-Lucrative اسپانیا)
       ---------------------------------------------------------- */
    case 'personal':
      specificDocs = [
        {
          id: 'bank_statement',
          title: 'گواهی موجودی و گردش ۶ ماهه حساب ارزی',
          category: 'financial',
          isMandatory: true,
          issuingAuthority: 'بانک‌های دارای شعبه ارزی',
          validity: 'حداکثر ۱۴ روز قبل از مصاحبه',
          // ✅ اصلاح‌شده: عدد دقیق ۲۰۲۶
          officialNote2026:
            'معیار رسمی ۲۰۲۶ اتریش: درآمد خالص ماهانه حداقل €۱,۳۰۸.۳۹ (پس از کسر اجاره تا سقف €۳۸۶.۴۳) + هزینه مسکن. برای زوج €۲,۰۶۴.۱۲ و هر فرزند €۲۰۱.۸۸. اسپانیا: IPREM ۴۰۰٪ = €۲,۴۰۰/ماه.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 7,
          officialSourceUrl: 'https://www.bmi.gv.at',
        },
        {
          id: 'passive_income',
          title: 'مدارک اثبات درآمد غیرفعال (اجاره، حقوق بازنشستگی، سود سهام)',
          category: 'financial',
          isMandatory: true,
          issuingAuthority: 'دفاتر اسناد رسمی / کانون بازنشستگی / سازمان بورس',
          validity: 'حداقل ۱۲ ماه گذشته مستمر',
          officialNote2026:
            'باید نشان دهد درآمد بدون اشتغال در اروپا مستمر است. برای اتریش: هر منبع باید با قرارداد یا سند رسمی مستند شود.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 7,
        },
        {
          id: 'property_deeds',
          title: 'اسناد مالکیت ملکی (سند تک‌برگ)',
          category: 'financial',
          isMandatory: false,
          issuingAuthority: 'اداره ثبت اسناد و املاک',
          validity: 'استعلام ثبتی معتبر',
          officialNote2026: 'امتیاز مثبت در اثبات تمکن کلان. ترجمه رسمی + آپوستیل الزامی.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 14,
        },
        {
          id: 'rental_agreement_europe',
          title: 'پیش‌قرارداد اجاره در مقصد (Mietvertrag / Contrato de Arrendamiento)',
          category: 'accommodation_insurance',
          isMandatory: true,
          issuingAuthority: 'آژانس‌های املاک رسمی در وین / مادرید / آتن',
          validity: 'قرارداد حداقل ۱ ساله',
          officialNote2026:
            'MA35 متراژ را چک می‌کند (حداقل ۳۰ متر برای مجرد، ۵۰ متر برای زوج + ۱۰ متر هر فرزند). دفتر وین دیاکو قرارداد رسمی تامین می‌کند.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 30,
          canBeObtainedViaAttorney: true,
        },
        {
          id: 'health_insurance_full',
          title: 'بیمه درمانی جامع شینگن بدون فرانشیز',
          category: 'accommodation_insurance',
          isMandatory: true,
          issuingAuthority: 'Care Concept / Feelsafe / بیمه‌های معتبر اتریش',
          validity: 'حداقل ۱ سال، پوشش ≥ €۳۰,۰۰۰',
          officialNote2026:
            'بیمه‌های مسافرتی ارزان رد می‌شوند. باید پوشش بستری + دارو + بازگشت به وطن داشته باشد.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 2,
        },
        {
          id: 'german_a1',
          title: 'مدرک زبان A1 (اتریش/آلمان) یا زبان رسمی مقصد',
          category: 'language',
          isMandatory: countryKey === 'austria' || countryKey === 'germany',
          issuingAuthority: 'Goethe / ÖSD / Telc',
          validity: 'حداکثر ۱ سال',
          officialNote2026:
            'اتریش: A1 برای تمکن الزامی است مگر مدرک دانشگاهی یا هنرهای خاص (Kunstförderungsgesetz). آلمان: A1 برای برخی ویزاها؛ در بلوکارت B1.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 45,
          warningFlag: 'بدون A1، پرونده تمکن اتریش رد می‌شود.',
        },
      ];
      minimumPrepDays = 90;
      estimatedTotalCostEur = { min: 2500, max: 6000 };
      hasAnnualQuota = countryKey === 'austria';
      break;

    /* ----------------------------------------------------------
       2) RWR اتریش (Shortage + Other)
       ---------------------------------------------------------- */
    case 'rwr_shortage':
    case 'rwr_other':
      specificDocs = [
        {
          id: 'job_offer_contract',
          title: 'قرارداد کاری یا پیشنهاد استخدام (Arbeitsvertrag / Job Offer)',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'کارفرمای رسمی در اتریش',
          validity: 'حداقل ۶ تا ۱۲ ماه',
          officialNote2026:
            pathKey === 'rwr_other'
              ? '✅ اصلاح‌شده: حداقل حقوق ناخالص ماهانه €۳,۴۶۵ (۲۰۲۶) + Sonderzahlungen. هر ماه تأخیر در قرارداد، ریسک رد را بالا می‌برد.'
              : 'برای مشاغل کمبود: حداقل ۵۵ از ۹۰ امتیاز + حقوق طبق Kollektivvertrag رشته.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 0,
        },
        {
          id: 'degree_evaluation',
          title: 'ارزیابی مدارک تحصیلی (Nostrifizierung / ZAB / Anabin)',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'وزارت علوم اتریش / ZAB آلمان',
          validity: 'دائمی',
          officialNote2026:
            'مدرک باید در Anabin ثبت یا از ZAB تأییدیه داشته باشد. از ۲۰۲۶ برای برخی رشته‌های پزشکی، Defizitbescheid نیز الزامی است.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 60,
          officialSourceUrl: 'https://www.anabin.kmk.org',
        },
        {
          id: 'work_history_insurance',
          title: 'سوابق بیمه تأمین اجتماعی + گواهی اشتغال با سربرگ شرکتی',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'سازمان تأمین اجتماعی',
          validity: 'دارای کد اصالت',
          officialNote2026:
            'شرح وظایف باید با ISCO-08 منطبق باشد. برای مشاغل فنی، Skill-Level باید اثبات شود.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 14,
        },
        {
          id: 'europass_cv',
          title: 'رزومه Europass به آلمانی یا انگلیسی',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'Europass (کمیسیون اروپا)',
          validity: 'به‌روز',
          officialNote2026:
            'بدون وقفه زمانی غیرموجه. برای AMS، تجربه مرتبط باید ۵۰٪ از رزومه را پوشش دهد.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 3,
          officialSourceUrl: 'https://europa.eu/europass',
        },
        {
          id: 'language_cert',
          title: 'مدرک زبان آلمانی B1/B2 یا انگلیسی IELTS 6.5+',
          category: 'language',
          isMandatory: true,
          issuingAuthority: 'Goethe / ÖSD / Telc / British Council',
          validity: 'حداکثر ۲ سال',
          officialNote2026:
            'در ماتریس RWR: A1=۵، A2=۱۰، B1=۱۵ امتیاز. هر سطح زبان تا ۱۵ امتیاز از ۹۰ امتیاز کل را می‌سازد.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 60,
        },
        {
          id: 'rwr_point_sheet',
          title: 'فرم امتیازبندی AMS (RWR Point Calculator)',
          category: 'legalization',
          isMandatory: countryKey === 'austria',
          issuingAuthority: 'تنظیم توسط دفتر وین دیاکو',
          validity: '۲۰۲۶',
          officialNote2026:
            '✅ نکته جدید: از ۲۰۲۶ صاحبان Jobseeker Visa که درخواست RWR داده‌اند، می‌توانند در اتریش تا پایان بررسی بمانند.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 1,
          canBeObtainedViaAttorney: true,
          officialSourceUrl: 'https://www.migration.gv.at',
        },
      ];
      minimumPrepDays = 120;
      estimatedTotalCostEur = { min: 3000, max: 8000 };
      hasAnnualQuota = pathKey === 'rwr_shortage';
      break;

    /* ----------------------------------------------------------
       3) Jobseeker (اتریش / آلمان Chancenkarte)
       ---------------------------------------------------------- */
    case 'jobseeker':
      specificDocs = [
        {
          id: 'jobseeker_funds',
          title: 'حساب مسدود (Sperrkonto) یا تمکن مالی',
          category: 'financial',
          isMandatory: true,
          issuingAuthority: 'Coracle / Expatrio / Erste Bank',
          validity: 'قبل از مصاحبه',
          // ✅ اصلاح‌شده
          officialNote2026:
            '✅ آلمان ۲۰۲۶: €۱,۰۹۱ × ۱۲ = €۱۳,۰۹۲/سال (Sperrkonto). اتریش: مطابق مدت اقامت + Richtsatz €۱,۳۰۸.۳۹/ماه. نسخه قبلی €۱۲,۳۲۴ درست نبود.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 14,
          warningFlag: 'کمبود €۷۶۸ در محاسبه اشتباه قبلی ممکن است موجب رد ویزا شود.',
        },
        {
          id: 'qualification_recognition',
          title: 'تأییدیه ارزیابی مدارک برای جستجوی کار',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'AST اتریش / ZAB آلمان',
          validity: 'معتبر',
          officialNote2026:
            'مدرک باید نشان دهد متقاضی در دسته‌های دارای امتیاز قرار می‌گیرد. برای Chancenkarte، ۶ امتیاز حداقل لازم است.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 60,
        },
        {
          id: 'jobseeker_cv',
          title: 'رزومه + انگیزه‌نامه هدفمند',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'تهیه توسط دیاکو',
          validity: 'به‌روز',
          officialNote2026:
            'برای Chancenkarte، باید نشان دهد ۶ امتیاز از معیارهای: مدرک، زبان، سابقه، سن را دارد.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 7,
        },
      ];
      minimumPrepDays = 90;
      estimatedTotalCostEur = { min: 800, max: 3000 };
      break;

    /* ----------------------------------------------------------
       4) Blue Card
       ---------------------------------------------------------- */
    case 'bluecard':
      specificDocs = [
        {
          id: 'job_offer_contract',
          title: 'قرارداد کاری با حقوق حداقل قانونی',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'کارفرمای رسمی',
          validity: 'حداقل ۶ تا ۱۲ ماه',
          // ⚠️ هشدار: اعداد نیاز به تایید با BAMF
          officialNote2026:
            '⚠️ آلمان ۲۰۲۵: €۴۸,۳۰۰ عمومی / €۴۳,۷۵۹.۸۰ مشاغل کمبود. اعداد ۲۰۲۶ باید از BAMF تأیید شود (شماره‌های €۵۰,۷۰۰ در نسخه قبلی ممکن است مربوط به ۲۰۲۶ باشد — تأیید کنید). اتریش: €۵۵,۶۷۸ سالانه (۲۰۲۶).',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 0,
          officialSourceUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/blue-card',
        },
        {
          id: 'degree_evaluation',
          title: 'تأییدیه معادل‌سازی مدرک',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'ZAB / Anabin',
          validity: 'دائمی',
          officialNote2026: 'مدرک باید با مدرک آلمانی/اتریشی معادل شناخته شود.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 60,
        },
        {
          id: 'work_history_insurance',
          title: 'سوابق بیمه و گواهی اشتغال',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'تأمین اجتماعی',
          validity: 'کد اصالت',
          officialNote2026: 'شرح وظایف باید با ISCO-08 منطبق باشد.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 14,
        },
        {
          id: 'language_cert',
          title: 'مدرک زبان (B1 آلمانی برای اکثر موارد / IELTS 6.5 برای برخی)',
          category: 'language',
          isMandatory: true,
          issuingAuthority: 'Goethe / British Council',
          validity: '≤ ۲ سال',
          officialNote2026: 'بسته به رشته، A1 کافی است یا B1. برای برخی مشاغل، انگلیسی کافی است.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 45,
        },
      ];
      minimumPrepDays = 90;
      estimatedTotalCostEur = { min: 1500, max: 5000 };
      break;

    /* ----------------------------------------------------------
       5) Medical
       ---------------------------------------------------------- */
    case 'medical':
      specificDocs = [
        {
          id: 'medical_license',
          title: 'پروانه مطب و شماره نظام',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'نظام پزشکی / پرستاری',
          validity: 'معتبر',
          officialNote2026:
            'همراه با Good Standing Certificate < ۳ ماه. برای اتریش: تاییدیه Ärztekammer.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 14,
        },
        {
          id: 'course_syllabus',
          title: 'ریزنمرات + Syllabus دوره بالینی',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'وزارت بهداشت',
          validity: 'مهر برجسته',
          officialNote2026:
            'برای Defizitbescheid در نظام پزشکی اتریش، Syllabus ساعات جراحی/داخلی/اطفال الزامی است.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 30,
        },
        {
          id: 'german_b2_c1',
          title: 'آلمانی B2 + آمادگی Fachsprachprüfung (C1 پزشکی)',
          category: 'language',
          isMandatory: true,
          issuingAuthority: 'Goethe / Telc Deutsch Medizin',
          validity: '≤ ۱ سال',
          officialNote2026:
            'شرط ورود به Berufserlaubnis. از ۲۰۲۶ آزمون FSP در برخی ایالت‌ها سخت‌گیرانه‌تر شده است.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 180,
          warningFlag: 'بدون C1 پزشکی، مجوز طبابت موقت صادر نمی‌شود.',
        },
        {
          id: 'hospital_hospitation',
          title: 'پذیرش Hospitation در بیمارستان ایالتی',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'بیمارستان‌های همکار دیاکو در وین/لینتس/مونیخ',
          validity: 'دعوت‌نامه ۲۰۲۶',
          officialNote2026: 'هماهنگی از طریق دپارتمان پزشکی دیاکو.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 60,
          canBeObtainedViaAttorney: true,
        },
      ];
      minimumPrepDays = 240;
      estimatedTotalCostEur = { min: 5000, max: 15000 };
      break;

    /* ----------------------------------------------------------
       6) Education
       ---------------------------------------------------------- */
    case 'education':
      specificDocs = [
        {
          id: 'admission_letter',
          title: 'نامه پذیرش قطعی/مشروط (Zulassungsbescheid)',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'Universität Wien / TU Wien / دانشگاه‌های آلمان',
          validity: 'ترم ۲۰۲۶/۲۷',
          officialNote2026:
            'شامل کد پذیرش بین‌المللی. برای اتریش: مهلت Universität Wien ۳ آگوست ۲۰۲۶ (غیر EU).',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 0,
        },
        {
          id: 'special_university_entrance',
          title: 'گواهی اشتغال به تحصیل یا قبولی کنکور (§65g)',
          category: 'academic_job',
          isMandatory: countryKey === 'austria',
          issuingAuthority: 'سازمان سنجش / دانشگاه دولتی',
          validity: 'همیشگی',
          officialNote2026:
            'برای متقاضیان ایرانی: کنکور سراسری + مدرک پیش‌دانشگاهی لازم است. تأیید وزارت علوم + سفارت.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 14,
        },
        {
          id: 'blocked_account',
          title: 'حساب مسدود دانشجویی (Sperrkonto)',
          category: 'financial',
          isMandatory: true,
          issuingAuthority: 'Coracle / Expatrio / Erste Bank',
          validity: 'سال تحصیلی ۲۰۲۶',
          // ✅ اصلاح‌شده
          officialNote2026:
            '✅ اتریش ۲۰۲۶: €۷۱۵.۴۷/ماه (زیر ۲۴ سال) / €۱,۲۹۵.۹۶/ماه (بالای ۲۴ سال). آلمان: €۱,۰۹۱/ماه × ۱۲ = €۱۳,۰۹۲/سال. نسخه قبلی €۷۰۰/€۱,۲۰۰ تقریب بود.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 14,
          warningFlag: 'اختلاف €۲۰۰/ماه × ۱۲ = €۲,۴۰۰ در نسخه قبلی — می‌توانست موجب رد ویزا شود.',
        },
        {
          id: 'dorm_contract',
          title: 'قرارداد خوابگاه (OEAD / STUWO / Studierendenwerk)',
          category: 'accommodation_insurance',
          isMandatory: true,
          issuingAuthority: 'مؤسسات خوابگاهی معتبر',
          validity: '۶ ماه تا ۱ سال',
          officialNote2026:
            'بدون رزرو قطعی، سفارت پرونده را نمی‌پذیرد. در آلمان Studierendenwerk تا ۶ ماه قبل باید رزرو شود.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 90,
        },
      ];
      minimumPrepDays = 120;
      estimatedTotalCostEur = { min: 15000, max: 22000 };
      break;

    /* ----------------------------------------------------------
       7) Real Estate / Golden Visa
       ---------------------------------------------------------- */
    case 'realestate':
      specificDocs = [
        {
          id: 'property_sales_contract',
          title: 'قرارداد خرید ملک + سند مالکیت',
          category: 'financial',
          isMandatory: true,
          issuingAuthority: 'دفاتر اسناد رسمی در آتن / مادرید / وین',
          validity: 'ثبت‌شده در کاداستر',
          officialNote2026:
            '✅ یونان ۲۰۲۶: آتن/تسالونیکی/میکونوس/سانتورینی = €۸۰۰,۰۰۰. سایر مناطق = €۴۰۰,۰۰۰. €۲۵۰,۰۰۰ فقط برای تبدیل تجاری به مسکونی و بازسازی بناهای تاریخی.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 60,
          officialSourceUrl: 'https://www.migration.gov.gr',
        },
        {
          id: 'tax_number_afm',
          title: 'کد مالیاتی (AFM یونان / NIE اسپانیا)',
          category: 'financial',
          isMandatory: true,
          issuingAuthority: 'اداره مالیات مقصد',
          validity: 'دائمی',
          officialNote2026:
            'با وکالت‌نامه رسمی توسط وکلای دیاکو بدون نیاز به حضور اولیه اخذ می‌شود.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 14,
          canBeObtainedViaAttorney: true,
        },
        {
          id: 'funds_transfer_proof',
          title: 'مدارک منشأ پول + گواهی انتقال ارز',
          category: 'financial',
          isMandatory: true,
          issuingAuthority: 'بانک‌های شینگن',
          validity: 'مستند',
          officialNote2026:
            'رعایت AML Directive. منبع پول باید شفاف و مستند باشد (فروش ملک، ارث، سود سهام).',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 30,
        },
      ];
      minimumPrepDays = 120;
      estimatedTotalCostEur = { min: 250000, max: 800000 };
      hasAnnualQuota = true;
      break;

    /* ----------------------------------------------------------
       8) Startup / Business
       ---------------------------------------------------------- */
    case 'startup':
    case 'business':
      specificDocs = [
        {
          id: 'business_plan_certified',
          title: 'بیزینس‌پلن تأییدشده (Certified Business Plan)',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'AWS اتریش / WKO / IHK',
          validity: '۲۰۲۶',
          officialNote2026:
            'باید شاخص نوآوری + استخدام نیروی بومی + گردش مالی پیش‌بینی‌شده را اثبات کند. برای استارت‌آپ اتریش: حداقل €۳۰,۰۰۰ سرمایه.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 60,
        },
        {
          id: 'company_articles',
          title: 'اساسنامه + آگهی روزنامه رسمی + ثبت Firmenbuch',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'دادگاه تجاری وین',
          validity: 'به‌روز',
          officialNote2026: 'شماره FN و نمونه امضا. برای GmbH: حداقل سرمایه €۱۰,۰۰۰ (از ۲۰۲۴ کاهش یافته).',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: false,
          estimatedProcessingDays: 30,
        },
        {
          id: 'capital_deposit_slip',
          title: 'فیش واریز سرمایه اولیه',
          category: 'financial',
          isMandatory: true,
          issuingAuthority: 'بانک‌های تجاری اتریش',
          validity: 'گواهی مسدودی',
          officialNote2026: 'همراه با گواهی مدیرعاملی.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 14,
        },
      ];
      minimumPrepDays = 120;
      estimatedTotalCostEur = { min: 30000, max: 100000 };
      break;

    /* ----------------------------------------------------------
       9) Nomad
       ---------------------------------------------------------- */
    case 'nomad':
      specificDocs = [
        {
          id: 'remote_contracts',
          title: 'قرارداد دورکاری با کارفرمایان/مشتریان خارج از کشور مقصد',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'شرکت‌های بین‌المللی',
          validity: 'حداقل ۳–۶ ماه سابقه',
          // ✅ اصلاح‌شده
          officialNote2026:
            '✅ اسپانیا ۲۰۲۶: €۲,۷۶۲/ماه (۲۰۰٪ SMI ۱۴ پیمانه). ⚠️ رقم €۲,۸۴۹ در نسخه قبلی نادرست بود. یونان: €۳,۵۰۰/ماه. پرتغال: ۴ برابر حداقل دستمزد (≈€۳,۴۸۰/ماه ۲۰۲۶).',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 14,
        },
        {
          id: 'remote_invoices',
          title: 'فاکتورها و رسیدهای واریزی حقوق ارزی',
          category: 'financial',
          isMandatory: true,
          issuingAuthority: 'Wise / Payoneer / حساب‌های بین‌المللی',
          validity: 'گردش ۶ ماه',
          officialNote2026:
            'اثبات امکان ۱۰۰٪ کار از راه دور. اسپانیا: حداکثر ۲۰٪ درآمد از مشتریان اسپانیایی.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 14,
        },
      ];
      minimumPrepDays = 60;
      estimatedTotalCostEur = { min: 800, max: 3000 };
      break;

    /* ----------------------------------------------------------
       10) Artist
       ---------------------------------------------------------- */
    case 'artist':
      specificDocs = [
        {
          id: 'portfolio_art',
          title: 'پورتفولیو + کاتالوگ نمایشگاه‌ها و جوایز',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'موزه‌ها / فستیوال‌ها / کانون‌های فرهنگی',
          validity: '۵ سال اخیر',
          officialNote2026:
            'ارزیابی توسط Künstlerbeirat (کمیسیون هنر وین). حداقل ۳ نمایشگاه بین‌المللی یا جایزه معتبر.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 30,
        },
        {
          id: 'art_income_proof',
          title: 'قرارداد فروش آثار / حق‌التالیف / همکاری با گالری',
          category: 'financial',
          isMandatory: true,
          issuingAuthority: 'گالری‌های معتبر',
          validity: 'مستند',
          officialNote2026:
            '✅ اتریش ۲۰۲۶: حداقل €۱,۳۰۸.۳۹/ماه خالص یا Haftungserklärung. نباید نیاز به بازار کار عمومی باشد. زبان A1 معمولاً الزامی است (مگر هنرهای خاص).',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 14,
        },
      ];
      minimumPrepDays = 90;
      estimatedTotalCostEur = { min: 1500, max: 5000 };
      break;

    /* ----------------------------------------------------------
       11) Researcher
       ---------------------------------------------------------- */
    case 'researcher':
      specificDocs = [
        {
          id: 'research_contract',
          title: 'قرارداد/پذیرش پژوهشگر',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'دانشگاه / مرکز تحقیقاتی',
          validity: '۲۰۲۶',
          officialNote2026:
            'طبق EU Researchers Directive 2016/801. برای اتریش: Researcher Card (NAG §55).',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 0,
        },
        {
          id: 'research_qualification',
          title: 'رزومه علمی + Publications + Research Proposal',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'متقاضی + مرکز پذیرنده',
          validity: 'به‌روز',
          officialNote2026:
            'باید نشان دهد متقاضی در حوزه خود از مهارت بالایی برخوردار است. در کانادا: مسیر Express Entry برای محققان.',
          familyRelevant: 'all',
          translationRequired: false,
          apostilleRequired: false,
          estimatedProcessingDays: 30,
        },
      ];
      minimumPrepDays = 90;
      estimatedTotalCostEur = { min: 1000, max: 3000 };
      break;

    /* ----------------------------------------------------------
       Default / Fallback
       ---------------------------------------------------------- */
    default:
      specificDocs = [
        {
          id: 'general_purpose_proof',
          title: 'انگیزه‌نامه (Statement of Purpose)',
          category: 'academic_job',
          isMandatory: true,
          issuingAuthority: 'تهیه توسط دپارتمان دیاکو',
          validity: '۲۰۲۶',
          officialNote2026:
            'شرح مستدل برنامه زندگی، انتخاب کشور و عدم تمایل به پناهندگی.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: false,
          estimatedProcessingDays: 7,
        },
        {
          id: 'bank_general_funds',
          title: 'گواهی تمکن بانکی',
          category: 'financial',
          isMandatory: true,
          issuingAuthority: 'بانک ارزی',
          validity: '≤ ۱ ماه',
          officialNote2026: 'طبق بخشنامه ۲۰۲۶.',
          familyRelevant: 'all',
          translationRequired: true,
          apostilleRequired: true,
          estimatedProcessingDays: 7,
        },
      ];
      break;
  }

  const allDocs = [...COMMON_IDENTITY_DOCS, ...specificDocs];

  return {
    pathId: pathKey,
    pathName: pathObj.name,
    country: countryObj.name,
    flag: countryObj.flag,
    officialSource2026: countryObj.officialOrg,
    officialUrl: countryObj.officialUrl,
    summary: `چک‌لیست رسمی ۲۰۲۶ برای روش «${pathObj.name}» در «${countryObj.name}». مدارک باید طبق دستورالعمل‌های ترجمه، آپوستیل و تاییدات سفارت ارائه شوند.`,
    documents: allDocs,
    minimumPrepDays,
    estimatedTotalCostEur,
    hasAnnualQuota,
  };
}

/* ============================================================
   Family checklist — فقط مدارک مرتبط با وضعیت خانوادگی
   ============================================================ */

export function getFamilyChecklist(
  checklist: PathChecklist2026,
  familyScope: FamilyScope,
): DocumentItem2026[] {
  return checklist.documents.filter(
    (doc) =>
      !doc.familyRelevant ||
      doc.familyRelevant === 'all' ||
      doc.familyRelevant === familyScope,
  );
}

/* ============================================================
   Document validation — هشدار برای موارد ناقص
   ============================================================ */

export interface ValidationResult {
  missing: DocumentItem2026[];
  warning: DocumentItem2026[];
  ready: boolean;
  completionPercent: number;
}

export function validateDocuments(
  checklist: PathChecklist2026,
  completedIds: string[],
): ValidationResult {
  const required = checklist.documents.filter((d) => d.isMandatory);
  const missing = required.filter((d) => !completedIds.includes(d.id));
  const warning = checklist.documents.filter((d) => d.warningFlag && !completedIds.includes(d.id));
  const completionPercent = required.length
    ? Math.round(((required.length - missing.length) / required.length) * 100)
    : 100;

  return {
    missing,
    warning,
    ready: missing.length === 0,
    completionPercent,
  };
}

/* ============================================================
   Export types
   ============================================================ */

export type { CountryId as CountryKey, PathId as PathKey };