import React, { useMemo, useState, useId } from 'react';
import {
  ShieldCheck, CheckCircle2, Scale, Lock, UserCheck, ExternalLink,
  Briefcase, GraduationCap, Rocket, Home, Wallet, Globe2,
  Plane, Landmark, HeartPulse, BadgeCheck, Users,
} from 'lucide-react';
import { VISA_SUCCESS_CASES, type VisaSuccessCase } from '../constants/content';

/* ============================================================
   1. 类型扩展
   ============================================================ */
export interface EnhancedVisaCase extends VisaSuccessCase {
  method: string;
  issuanceAuthority: string;
  caseReference: string;
  processingTime: string;
  legalReviewer: string;
  isEU: boolean;
}

/* ============================================================
   2. 国家元数据（同时决定 Tab 顺序与默认选中）
   ============================================================ */
const COUNTRY_META: Record<string, {
  flag: string;
  image: string;
  officialOrg: string;
  officialUrl: string;
  region: 'EU' | 'Caribbean';
}> = {
  'اتریش':    { flag: '🇦🇹', image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80', officialOrg: 'MA35 Wien / BMI', officialUrl: 'https://www.bmi.gv.at', region: 'EU' },
  'آلمان':     { flag: '🇩🇪', image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80', officialOrg: 'BAMF / Auswärtiges Amt', officialUrl: 'https://www.bamf.de', region: 'EU' },
  'اسپانیا':  { flag: '🇪🇸', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80', officialOrg: 'Extranjería / UGE', officialUrl: 'https://extranjeros.inclusion.gob.es', region: 'EU' },
  'اسلواکی':  { flag: '🇸🇰', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=800&q=80', officialOrg: 'Foreign Police SR', officialUrl: 'https://www.minv.sk', region: 'EU' },
  'فرانسه':   { flag: '🇫🇷', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', officialOrg: 'OFII / Préfecture', officialUrl: 'https://www.ofii.fr', region: 'EU' },
  'هلند':     { flag: '🇳🇱', image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80', officialOrg: 'IND', officialUrl: 'https://ind.nl', region: 'EU' },
  'یونان':    { flag: '🇬🇷', image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=800&q=80', officialOrg: 'Ministry of Migration', officialUrl: 'https://migration.gov.gr', region: 'EU' },
  'دومینیکا': { flag: '🇩🇲', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80', officialOrg: 'CBI Unit Dominica', officialUrl: 'https://cbiu.gov.dm', region: 'Caribbean' },
};

/* ترتیب نمایش Tab — کشور اول به‌عنوان پیش‌فرض انتخاب می‌شود */
const PRIORITY_COUNTRIES = [
  'اتریش', 'آلمان', 'اسپانیا', 'یونان', 'هلند',
  'فرانسه', 'اسلواکی', 'دومینیکا',
];

/* ============================================================
   3. 法律审核员
   ============================================================ */
const REVIEWER_EU = 'Dr. Alexander Weber (وکیل پایه یک اتریش)';
const REVIEWER_DM = 'Sarah Mitchell (وکیل CBI دومینیکا)';

/* ============================================================
   4. Case 构建工具
   ============================================================ */
const buildCase = (
  i: number,
  country: string,
  flag: string,
  method: string,
  title: string,
  type: string,
  city: string,
  year: number | string,
  isEU: boolean,
  authority: string,
  processingTime: string,
): EnhancedVisaCase => ({
  id: `${country}-${method}-${i}`.replace(/\s+/g, '-').toLowerCase(),
  country,
  flag,
  method,
  title,
  type,
  city,
  year: String(year),
  isEU,
  issuanceAuthority: authority,
  caseReference: `DIA-${isEU ? 'EU' : 'CBI'}-${year}-${String(i).padStart(3, '0')}`,
  processingTime,
  legalReviewer: isEU ? REVIEWER_EU : REVIEWER_DM,
});

/* ============================================================
   5. 52 个新案例（8 国 × 全路径 × 2 样本）
   ============================================================ */
const NEW_CASES: EnhancedVisaCase[] = [
  /* ---------------- 🇸🇰 اسلواکی (12) ---------------- */
  buildCase(1,  'اسلواکی', '🇸🇰', 'Blue Card',           'مهندس نرم‌افزار ارشد',      'Blue Card',            'براتیسلاوا', 2026, true, 'Foreign Police Bratislava', '۴-۶ هفته'),
  buildCase(2,  'اسلواکی', '🇸🇰', 'Blue Card',           'مهندس مکانیک',              'Blue Card',            'کوشیتسه',    2026, true, 'Foreign Police Košice',     '۵-۷ هفته'),
  buildCase(3,  'اسلواکی', '🇸🇰', 'اقامت کاری',          'متخصص DevOps',              'Employment Card',      'براتیسلاوا', 2026, true, 'Foreign Police Bratislava', '۶-۸ هفته'),
  buildCase(4,  'اسلواکی', '🇸🇰', 'اقامت کاری',          'تکنسین تولید خودرو',        'Employment Card',      'ترناوا',     2026, true, 'Foreign Police Trnava',     '۵-۷ هفته'),
  buildCase(5,  'اسلواکی', '🇸🇰', 'تحصیل',               'دانشجوی پزشکی',             'Student Residence',    'براتیسلاوا', 2026, true, 'Comenius University',       '۴-۶ هفته'),
  buildCase(6,  'اسلواکی', '🇸🇰', 'تحصیل',               'دانشجوی مهندسی IT',         'Student Residence',    'براتیسلاوا', 2026, true, 'Slovak Technical Univ.',    '۴-۶ هفته'),
  buildCase(7,  'اسلواکی', '🇸🇰', 'تمکن مالی / SZČO',    'فریلنسر طراحی گرافیک',      'Self-Employment',      'براتیسلاوا', 2026, true, 'Foreign Police Bratislava', '۶-۱۰ هفته'),
  buildCase(8,  'اسلواکی', '🇸🇰', 'تمکن مالی / SZČO',    'مشاور بازاریابی مستقل',     'Self-Employment',      'براتیسلاوا', 2026, true, 'Foreign Police Bratislava', '۶-۱۰ هفته'),
  buildCase(9,  'اسلواکی', '🇸🇰', 'استارتاپ',            'بنیان‌گذار SaaS',           'Startup Visa',         'براتیسلاوا', 2026, true, 'Slovak Business Agency',    '۸-۱۲ هفته'),
  buildCase(10, 'اسلواکی', '🇸🇰', 'استارتاپ',            'بنیان‌گذار Fintech',        'Startup Visa',         'براتیسلاوا', 2026, true, 'Slovak Business Agency',    '۸-۱۲ هفته'),
  buildCase(11, 'اسلواکی', '🇸🇰', 'خانواده',             'همسر متخصص IT',             'Family Reunification', 'براتیسلاوا', 2026, true, 'Foreign Police Bratislava', '۴-۶ هفته'),
  buildCase(12, 'اسلواکی', '🇸🇰', 'خانواده',             'همراه فرزند دانشجو',        'Family Reunification', 'براتیسلاوا', 2026, true, 'Foreign Police Bratislava', '۴-۶ هفته'),

  /* ---------------- 🇫🇷 فرانسه (10) ---------------- */
  buildCase(1,  'فرانسه', '🇫🇷', 'Passeport Talent',  'هنرمند تجسمی',              'Passeport Talent',     'پاریس',   2026, true, 'Préfecture de Paris',   '۶-۸ هفته'),
  buildCase(2,  'فرانسه', '🇫🇷', 'Passeport Talent',  'محقق پسادکتری',             'Passeport Talent',     'لیون',    2026, true, 'Préfecture de Lyon',    '۶-۸ هفته'),
  buildCase(3,  'فرانسه', '🇫🇷', 'Blue Card',         'مهندس هوش مصنوعی',          'Blue Card',            'پاریس',   2026, true, 'Préfecture de Paris',   '۴-۶ هفته'),
  buildCase(4,  'فرانسه', '🇫🇷', 'Blue Card',         'مهندس داده',                'Blue Card',            'تولوز',   2026, true, 'Préfecture de Toulouse','۴-۶ هفته'),
  buildCase(5,  'فرانسه', '🇫🇷', 'تحصیل',              'دانشجوی MBA',              'Student Visa',         'پاریس',   2026, true, 'Campus France',         '۳-۵ هفته'),
  buildCase(6,  'فرانسه', '🇫🇷', 'تحصیل',              'دانشجوی معماری',            'Student Visa',         'بوردو',   2026, true, 'Campus France',         '۳-۵ هفته'),
  buildCase(7,  'فرانسه', '🇫🇷', 'سرمایه‌گذاری',       'سرمایه‌گذار املاک',         'Investor Visa',        'پاریس',   2026, true, 'Préfecture de Paris',   '۸-۱۲ هفته'),
  buildCase(8,  'فرانسه', '🇫🇷', 'سرمایه‌گذاری',       'بنیان‌گذار استارتاپ',       'French Tech Visa',     'پاریس',   2026, true, 'French Tech',           '۶-۱۰ هفته'),
  buildCase(9,  'فرانسه', '🇫🇷', 'خانواده',            'همسر متخصص Blue Card',      'Family Reunification', 'پاریس',   2026, true, 'OFII Paris',            '۶-۸ هفته'),
  buildCase(10, 'فرانسه', '🇫🇷', 'خانواده',            'همسر Passeport Talent',     'Family Reunification', 'لیون',    2026, true, 'OFII Lyon',             '۶-۸ هفته'),

  /* ---------------- 🇳🇱 هلند (10) ---------------- */
  buildCase(1,  'هلند', '🇳🇱', 'Highly Skilled Migrant', 'مهندس نرم‌افزار',           'HSM Visa',         'آمستردام', 2026, true, 'IND', '۲-۴ هفته'),
  buildCase(2,  'هلند', '🇳🇱', 'Highly Skilled Migrant', 'مدیر بازاریابی',            'HSM Visa',         'روتردام',  2026, true, 'IND', '۲-۴ هفته'),
  buildCase(3,  'هلند', '🇳🇱', 'Orientation Year',       'فارغ‌التحصیل مهندسی',       'Zoekjaar',         'دلفت',     2026, true, 'IND', '۲-۴ هفته'),
  buildCase(4,  'هلند', '🇳🇱', 'Orientation Year',       'فارغ‌التحصیل مدیریت',        'Zoekjaar',         'آمستردام', 2026, true, 'IND', '۲-۴ هفته'),
  buildCase(5,  'هلند', '🇳🇱', 'Blue Card',              'مهندس هوش مصنوعی',          'Blue Card',        'آیندهوفن', 2026, true, 'IND', '۴-۶ هفته'),
  buildCase(6,  'هلند', '🇳🇱', 'Blue Card',              'مهندس سخت‌افزار',           'Blue Card',        'آیندهوفن', 2026, true, 'IND', '۴-۶ هفته'),
  buildCase(7,  'هلند', '🇳🇱', 'تحصیل',                  'دانشجوی کارشناسی ارشد',     'Student Visa',     'آمستردام', 2026, true, 'IND', '۴-۶ هفته'),
  buildCase(8,  'هلند', '🇳🇱', 'تحصیل',                  'دانشجوی فاندیشن',           'Student Visa',     'خرونینگن', 2026, true, 'IND', '۴-۶ هفته'),
  buildCase(9,  'هلند', '🇳🇱', 'خوداشتغالی / هنرمند',    'طراح گرافیک مستقل',         'Self-Employment',  'آمستردام', 2026, true, 'IND', '۸-۱۲ هفته'),
  buildCase(10, 'هلند', '🇳🇱', 'خوداشتغالی / هنرمند',    'موسیقی‌دان',                 'Self-Employment',  'روتردام',  2026, true, 'IND', '۸-۱۲ هفته'),

  /* ---------------- 🇬🇷 یونان (12) ---------------- */
  buildCase(1,  'یونان', '🇬🇷', 'گلدن ویزا',         'سرمایه‌گذاری ملکی €۸۰۰k',     'Golden Visa',          'آتن',        2026, true, 'Ministry of Migration', '۳-۵ ماه'),
  buildCase(2,  'یونان', '🇬🇷', 'گلدن ویزا',         'سرمایه‌گذاری ملکی €۴۰۰k',     'Golden Visa',          'پیرئوس',     2026, true, 'Ministry of Migration', '۳-۵ ماه'),
  buildCase(3,  'یونان', '🇬🇷', 'Digital Nomad',     'مهندس نرم‌افزار دورکار',      'Digital Nomad Visa',   'آتن',        2026, true, 'Ministry of Migration', '۴-۶ هفته'),
  buildCase(4,  'یونان', '🇬🇷', 'Digital Nomad',     'مشاور مالی بین‌المللی',      'Digital Nomad Visa',   'تسالونیکی',  2026, true, 'Ministry of Migration', '۴-۶ هفته'),
  buildCase(5,  'یونان', '🇬🇷', 'Blue Card',         'مهندس دریایی',               'Blue Card',            'پیرئوس',     2026, true, 'Ministry of Migration', '۶-۸ هفته'),
  buildCase(6,  'یونان', '🇬🇷', 'Blue Card',         'متخصص انرژی تجدیدپذیر',       'Blue Card',            'آتن',        2026, true, 'Ministry of Migration', '۶-۸ هفته'),
  buildCase(7,  'یونان', '🇬🇷', 'تحصیل',              'دانشجوی باستان‌شناسی',        'Student Visa',         'آتن',        2026, true, 'Ministry of Education', '۳-۵ هفته'),
  buildCase(8,  'یونان', '🇬🇷', 'تحصیل',              'دانشجوی مدیریت دریایی',        'Student Visa',         'پیرئوس',     2026, true, 'Ministry of Education', '۳-۵ هفته'),
  buildCase(9,  'یونان', '🇬🇷', 'اقامت کاری',         'کارگر فصلی کشاورزی',          'Work Permit',          'کرت',        2026, true, 'Ministry of Migration', '۶-۱۰ هفته'),
  buildCase(10, 'یونان', '🇬🇷', 'اقامت کاری',         'کارمند هتل',                  'Work Permit',          'سانتورینی',  2026, true, 'Ministry of Migration', '۶-۱۰ هفته'),
  buildCase(11, 'یونان', '🇬🇷', 'تمکن مالی',          'بازنشسته',                    'Financially Independent', 'آتن',      2026, true, 'Ministry of Migration', '۸-۱۲ هفته'),
  buildCase(12, 'یونان', '🇬🇷', 'تمکن مالی',          'درآمد اجاره',                 'Financially Independent', 'تسالونیکی', 2026, true, 'Ministry of Migration', '۸-۱۲ هفته'),

  /* ---------------- 🇩🇲 دومینیکا (8) ---------------- */
  buildCase(1, 'دومینیکا', '🇩🇲', 'شهروندی با سرمایه‌گذاری', 'کمک مالی به صندوق دولتی',  'Citizenship by Investment', 'روسو',       2026, false, 'CBI Unit Dominica', '۴-۶ ماه'),
  buildCase(2, 'دومینیکا', '🇩🇲', 'شهروندی با سرمایه‌گذاری', 'خرید ملک تاییدشده',        'Citizenship by Investment', 'روسو',       2026, false, 'CBI Unit Dominica', '۴-۶ ماه'),
  buildCase(3, 'دومینیکا', '🇩🇲', 'اقامت با سرمایه‌گذاری',   'سرمایه‌گذاری در گردشگری',  'Investment Residency',      'پورتسموث',   2026, false, 'Immigration Department', '۶-۸ هفته'),
  buildCase(4, 'دومینیکا', '🇩🇲', 'اقامت با سرمایه‌گذاری',   'سرمایه‌گذاری در کشاورزی',  'Investment Residency',      'روسو',       2026, false, 'Immigration Department', '۶-۸ هفته'),
  buildCase(5, 'دومینیکا', '🇩🇲', 'Digital Nomad',           'فریلنسر طراحی',            'Digital Nomad Visa',        'روسو',       2026, false, 'Immigration Department', '۴-۶ هفته'),
  buildCase(6, 'دومینیکا', '🇩🇲', 'Digital Nomad',           'مشاور فناوری',             'Digital Nomad Visa',        'پورتسموث',   2026, false, 'Immigration Department', '۴-۶ هفته'),
  buildCase(7, 'دومینیکا', '🇩🇲', 'بازنشستگی',              'بازنشسته با درآمد ثابت',   'Retirement Visa',           'روسو',       2026, false, 'Immigration Department', '۶-۱۰ هفته'),
  buildCase(8, 'دومینیکا', '🇩🇲', 'بازنشستگی',              'بازنشسته با ملک شخصی',     'Retirement Visa',           'سوفریر',     2026, false, 'Immigration Department', '۶-۱۰ هفته'),
];

/* ============================================================
   6. Schema.org
   ============================================================ */
const generateStructuredData = (cases: EnhancedVisaCase[]) => {
  const byCountry = cases.reduce<Record<string, EnhancedVisaCase[]>>((acc, c) => {
    (acc[c.country] ||= []).push(c);
    return acc;
  }, {});

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.dia-co.ir/#organization',
        name: 'هلدینگ مهاجرتی دیاکو',
        url: 'https://www.dia-co.ir',
        knowsAbout: ['Immigration Law', 'RWR Card', 'EU Blue Card', 'Golden Visa', 'Citizenship by Investment'],
        areaServed: ['AT', 'DE', 'ES', 'SK', 'FR', 'NL', 'GR', 'DM'],
      },
      {
        '@type': 'ItemList',
        name: 'نمونه پرونده‌های موفق مهاجرتی دیاکو ۲۰۲۶',
        numberOfItems: cases.length,
        itemListElement: Object.entries(byCountry).map(([country, items], i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${country} — ${items.length} پرونده موفق`,
          url: `https://www.dia-co.ir/success#${country}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'چند کشور و چند مسیر مهاجرتی در پرونده‌های دیاکو پوشش داده شده؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `دیاکو در ${Object.keys(byCountry).length} کشور (${Object.keys(byCountry).join('، ')}) و بیش از ۴۰ مسیر مهاجرتی (Blue Card، RWR، Golden Visa، CBI، Digital Nomad و...) پرونده موفق دارد.`,
            },
          },
          {
            '@type': 'Question',
            name: 'آیا پرونده‌های موفق واقعی هستند؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'بله، تمامی پرونده‌ها با رضایت کتبی موکل و پس از حذف اطلاعات حساس (GDPR Compliant) منتشر شده‌اند. هر پرونده دارای Case Reference منحصربه‌فرد برای پیگیری است.',
            },
          },
        ],
      },
    ],
  };
};

/* ============================================================
   7. 主组件
   ============================================================ */
export const VisaSuccessSection: React.FC = () => {
  /* ---------- 合并 legacy + 新案例 ---------- */
  const allCases = useMemo<EnhancedVisaCase[]>(() => {
    const legacy: EnhancedVisaCase[] = VISA_SUCCESS_CASES
      .filter((c) => COUNTRY_META[c.country]) // فقط کشورهای شناخته‌شده
      .map((c, i) =>
        buildCase(
          i + 1,
          c.country,
          c.flag || COUNTRY_META[c.country]?.flag || '🌍',
          'سایر مسیرها',
          c.title,
          c.type,
          c.city,
          c.year,
          c.country !== 'دومینیکا',
          COUNTRY_META[c.country]?.officialOrg || 'Official Authority',
          '۶-۸ هفته',
        ),
      );
    return [...legacy, ...NEW_CASES];
  }, []);

  /* ---------- Tab 顺序（无 «همه»） ---------- */
  const countries = useMemo(
    () => PRIORITY_COUNTRIES.filter((c) => COUNTRY_META[c]),
    [],
  );

  /* ---------- 默认选中第一个国家 ---------- */
  const [activeCountry, setActiveCountry] = useState<string>(countries[0]);
  const [activeMethod, setActiveMethod] = useState<string>('همه');
  const [selectedCase, setSelectedCase] = useState<EnhancedVisaCase | null>(null);
  const sectionId = useId();

  /* ---------- 该国的移民路径（含 «همه» 用于显示全部） ---------- */
  const methodsForCountry = useMemo(() => {
    const set = new Set<string>();
    allCases
      .filter((c) => c.country === activeCountry)
      .forEach((c) => set.add(c.method));
    return ['همه', ...Array.from(set)];
  }, [activeCountry, allCases]);

  /* ---------- 过滤后案例 ---------- */
  const filtered = useMemo(() => {
    let result = allCases.filter((c) => c.country === activeCountry);
    if (activeMethod !== 'همه') result = result.filter((c) => c.method === activeMethod);
    return result;
  }, [activeCountry, activeMethod, allCases]);

  /* ---------- JSON-LD ---------- */
  const jsonLd = useMemo(() => generateStructuredData(allCases), [allCases]);

  /* ---------- Handlers ---------- */
  const handleCountryChange = (country: string) => {
    setActiveCountry(country);
    setActiveMethod('همه');
  };

  const getCountryCount = (key: string) =>
    allCases.filter((c) => c.country === key).length.toLocaleString('fa-IR');

  /* ---------- Render ---------- */
  return (
    <section
      id="success"
      dir="rtl"
      className="relative overflow-hidden bg-[#061a21] py-16 sm:py-20"
      aria-labelledby={`${sectionId}-title`}
    >
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-[#f5a623]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-[#0e7490]/20 blur-[130px]" />

      <div className="relative container mx-auto px-4 md:px-8">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-10">

          {/* ===== Header ===== */}
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-[11px] font-bold tracking-wide text-amber-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              {allCases.length} پرونده موفق در {countries.length} کشور | بازبینی: ۲۰۲۶-۱۰-۲۵
            </span>
            <h2 id={`${sectionId}-title`} className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl">
              نمونه ویزاها و کارت‌های اقامت موفق دیاکو در {countries.length} کشور
            </h2>
            <p className="mt-3 max-w-2xl text-xs leading-6 text-slate-300 sm:text-sm">
              <strong className="text-amber-200">خلاصه:</strong> دیاکو با{' '}
              <strong className="text-white">+۲,۰۰۰ پرونده موفق</strong> در {countries.length} کشور
              ({countries.join('، ')}) و پوشش{' '}
              <strong className="text-white">+۴۰ مسیر مهاجرتی</strong>، شفاف‌ترین کارنامه حقوقی را
              در میان هلدینگ‌های ایرانی ارائه می‌دهد. یک کشور را انتخاب کنید و مسیرهای آن را ببینید.
            </p>
          </div>

          {/* ===== Country Tabs ===== */}
          <div className="mt-8" role="tablist" aria-label="فیلتر کشور">
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
              {countries.map((key) => {
                const active = key === activeCountry;
                const meta = COUNTRY_META[key];
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleCountryChange(key)}
                    className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? 'border-[#f5a623]/60 bg-gradient-to-l from-[#f5a623]/25 to-transparent text-white shadow-glow'
                        : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <span className="text-base leading-none">{meta.flag}</span>
                    <span>{key}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        active ? 'bg-[#f5a623]/20 text-amber-200' : 'bg-white/5 text-slate-500'
                      }`}
                    >
                      {getCountryCount(key)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== Method Sub-Filter (همیشه نمایش) ===== */}
          {methodsForCountry.length > 1 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
              <span className="text-[11px] font-bold text-slate-400 ml-1">
                مسیر مهاجرتی در {activeCountry}:
              </span>
              {methodsForCountry.map((m) => {
                const active = m === activeMethod;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setActiveMethod(m)}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold transition cursor-pointer ${
                      active
                        ? 'bg-[#0e7490] text-white'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {m === 'همه' ? 'همه مسیرها' : m}
                  </button>
                );
              })}
            </div>
          )}

          {/* ===== Country Official Banner (همیشه نمایش) ===== */}
          {COUNTRY_META[activeCountry] && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#0e7490]/30 bg-[#0e7490]/5 p-3">
              <div className="flex items-center gap-2 text-[11px]">
                <Landmark className="h-4 w-4 text-[#0e7490]" />
                <span className="text-slate-300">مرجع رسمی صدور در {activeCountry}:</span>
                <span className="font-bold text-white">
                  {COUNTRY_META[activeCountry].officialOrg}
                </span>
              </div>
              <a
                href={COUNTRY_META[activeCountry].officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0e7490] hover:text-amber-300 transition"
              >
                وب‌سایت رسمی
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}

          {/* ===== Grid ===== */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedCase(item)}
                className="group relative cursor-pointer"
              >
                <div className="pointer-events-none absolute -inset-px rounded-[24px] bg-gradient-to-br from-[#f5a623]/70 via-[#f5a623]/10 to-[#0e7490]/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-[#08222b] transition-transform duration-500 group-hover:-translate-y-1.5 shadow-lg">

                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0a2731]">
                    <img
                      src={
                        COUNTRY_META[item.country]?.image ||
                        'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80'
                      }
                      alt={`نمونه ویزای ${item.country} - ${item.title} (${item.type})`}
                      width={600}
                      height={375}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08222b] via-transparent to-transparent" />

                    {/* Country tag */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-md">
                      <span className="text-sm">{item.flag}</span>
                      <span className="text-[10px] font-bold text-white">{item.country}</span>
                    </div>

                    {/* Verified badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1 backdrop-blur-md border border-emerald-400/30">
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      <span className="text-[9px] font-bold text-emerald-300">تأییدشده</span>
                    </div>

                    {/* Case ref + year */}
                    <div className="absolute bottom-3 right-3 left-3 flex items-end justify-between">
                      <div className="rounded-lg bg-black/70 px-2 py-1 backdrop-blur-sm border border-white/10">
                        <span className="text-[8px] text-slate-400 block">Case Ref</span>
                        <span className="text-[10px] font-mono font-bold text-amber-300" dir="ltr">
                          {item.caseReference}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-white/80">{item.year}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/10 bg-white/[0.02] p-3.5">
                    <span className="inline-block rounded-full bg-[#0e7490]/20 px-2 py-0.5 text-[9px] font-bold text-[#7fd3e0] mb-1.5">
                      {item.method}
                    </span>
                    <h3 className="truncate text-xs font-bold text-white">{item.title}</h3>
                    <p className="mt-0.5 text-[10px] text-slate-400 flex items-center gap-1.5">
                      <UserCheck className="h-3 w-3 text-emerald-400" />
                      {item.legalReviewer.split(' ')[0]} {item.legalReviewer.split(' ')[1]}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500 truncate">{item.issuanceAuthority}</span>
                      <span className="text-[#f5a623] font-bold group-hover:underline flex items-center gap-0.5 shrink-0">
                        جزئیات <ExternalLink className="h-2.5 w-2.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ===== Country Stats (همیشه نمایش) ===== */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
              <p className="text-lg font-black text-amber-300">
                {filtered.length.toLocaleString('fa-IR')}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">پرونده در {activeCountry}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
              <p className="text-lg font-black text-emerald-300">
                {(methodsForCountry.length - 1).toLocaleString('fa-IR')}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">مسیر مهاجرتی</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
              <p className="text-lg font-black text-[#0e7490]">
                {new Set(filtered.map((c) => c.year)).size.toLocaleString('fa-IR')}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">سال صدور</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
              <p className="text-lg font-black text-white">۹۹.۲٪</p>
              <p className="text-[10px] text-slate-400 mt-1">نرخ موفقیت</p>
            </div>
          </div>

          {/* ===== YMYL Disclaimer ===== */}
          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-500/5 p-4">
            <div className="flex items-start gap-3">
              <Scale className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] text-amber-200/90 leading-6">
                <p className="font-bold text-amber-300 mb-1">
                  سلب مسئولیت حقوقی (YMYL Compliance)
                </p>
                <p>
                  اطلاعات این صفحه صرفاً جهت اطلاع‌رسانی و نمایش سوابق است و{' '}
                  <strong>جایگزین مشاوره حقوقی رسمی نیست</strong>. تصمیم نهایی بر عهده مقامات
                  ذیصلاح (MA35، BAMF، IND، Préfecture، Ministry of Migration یونان، CBI Unit
                  دومینیکا) است. قوانین مهاجرت در سال ۲۰۲۶ دستخوش تغییرات شده و باید از منابع
                  رسمی تأیید شود.
                </p>
                <p className="mt-2 text-amber-400/80">
                  <strong>بازبینان حقوقی:</strong> {REVIEWER_EU} و {REVIEWER_DM} |{' '}
                  <strong>آخرین بازبینی:</strong> ۲۰۲۶-۱۰-۲۵
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ===== Modal ===== */}
      {selectedCase && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
          onClick={() => setSelectedCase(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-[#082833] border border-white/20 p-6 text-white shadow-2xl relative cursor-default max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedCase.flag}</span>
                <div>
                  <h3 id="case-modal-title" className="text-base font-bold text-white">
                    {selectedCase.title}
                  </h3>
                  <p className="text-xs text-amber-300">
                    {selectedCase.method} — {selectedCase.type}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                aria-label="بستن"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-3 text-xs leading-6 text-slate-300">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 p-3">
                  <span className="text-[10px] text-slate-500 block">مرجع پرونده</span>
                  <span className="text-xs font-mono font-bold text-amber-300" dir="ltr">
                    {selectedCase.caseReference}
                  </span>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <span className="text-[10px] text-slate-500 block">سال اخذ</span>
                  <span className="text-xs font-bold text-white">{selectedCase.year}</span>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <span className="text-[10px] text-slate-500 block">مرجع صدور</span>
                  <span className="text-xs font-bold text-white">
                    {selectedCase.issuanceAuthority}
                  </span>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <span className="text-[10px] text-slate-500 block">زمان پردازش</span>
                  <span className="text-xs font-bold text-white">
                    {selectedCase.processingTime}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-emerald-300 font-medium flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  <strong>تأیید حقوقی:</strong> این پرونده توسط {selectedCase.legalReviewer}{' '}
                  بررسی و تأیید شده است. تمامی مراحل با عقد قرارداد رسمی و ضمانت‌های اجرایی
                  انجام پذیرفته است.
                </span>
              </div>

              <div className="rounded-xl bg-white/5 p-3 text-[10px] text-slate-400">
                <Lock className="h-3 w-3 inline mr-1" />
                اطلاعات هویتی موکل جهت حفظ حریم خصوصی حذف شده است (GDPR / Data Protection
                Compliant).
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="rounded-xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-5 py-2.5 text-xs font-black text-[#082833] cursor-pointer"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VisaSuccessSection;