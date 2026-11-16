import React, { useMemo, useState, useId, useEffect, useCallback } from 'react';
import {
  ShieldCheck, CheckCircle2, Scale, Lock, UserCheck, ExternalLink,
  Landmark, ZoomIn, ChevronRight, ChevronLeft, Pause, Play,
} from 'lucide-react';
import { VISA_SUCCESS_CASES, type VisaSuccessCase } from '../constants/content';

/* ============================================================
   1. توسعه نوع پرونده
   ============================================================ */
export interface EnhancedVisaCase extends VisaSuccessCase {
  method: string;
  issuanceAuthority: string;
  caseReference: string;
  processingTime: string;
  legalReviewer: string;
  isEU: boolean;
  image?: string;
  visaCaption?: string;
  imageAspect?: 'square' | 'landscape';
  tags: string[];
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
  'مجارستان': { flag: '🇭🇺', image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?auto=format&fit=crop&w=800&q=80', officialOrg: 'OIF Hungary (Idegenrendészet)', officialUrl: 'https://oif.gov.hu', region: 'EU' },
  'دومینیکا': { flag: '🇩🇲', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80', officialOrg: 'CBI Unit Dominica', officialUrl: 'https://cbiu.gov.dm', region: 'Caribbean' },
};

/* ترتیب نمایش Tab — کشور اول به‌عنوان پیش‌فرض انتخاب می‌شود */
const PRIORITY_COUNTRIES = [
  'اتریش', 'آلمان', 'اسپانیا', 'یونان', 'هلند',
  'فرانسه', 'مجارستان', 'اسلواکی', 'دومینیکا',
];

/* ============================================================
   3. 法律审核员
   ============================================================ */
const REVIEWER_EU = 'Dr. Alexander Weber (وکیل پایه یک اتریش)';
const REVIEWER_DM = 'Sarah Mitchell (وکیل CBI دومینیکا)';

/* ============================================================
   4. Case 构建工具
   ============================================================ */
const buildCaseTags = (
  country: string,
  method: string,
  type: string,
  city: string,
  year: string,
  authority: string,
  hasImage: boolean,
): string[] => {
  const docLabel = country === 'دومینیکا' ? `پاسپورت ${country}` : `ویزای ${country}`;
  const raw = [
    docLabel,
    `نمونه ویزای ${country}`,
    method,
    type.split('—')[0].split('(')[0].trim(),
    city.split('/')[0].trim(),
    `سال ${year}`,
    authority.split('/')[0].trim(),
    hasImage ? 'تصویر سند واقعی' : 'پرونده تاییدشده',
    'هلدینگ مهاجرتی دیاکو',
  ];
  return Array.from(new Set(raw.filter(Boolean)));
};

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
  image?: string,
  visaCaption?: string,
  imageAspect?: 'square' | 'landscape',
  customTags?: string[],
): EnhancedVisaCase => {
  const yearStr = String(year);
  return {
    id: `${country}-${method}-${i}`.replace(/\s+/g, '-').toLowerCase(),
    country,
    flag,
    method,
    title,
    type,
    city,
    year: yearStr,
    isEU,
    issuanceAuthority: authority,
    caseReference: `DIA-${isEU ? 'EU' : 'CBI'}-${yearStr.replace(/[^0-9۰-۹]/g, '').slice(-4) || '2026'}-${String(i).padStart(3, '0')}`,
    processingTime,
    legalReviewer: isEU ? REVIEWER_EU : REVIEWER_DM,
    image,
    visaCaption,
    imageAspect,
    tags: customTags?.length
      ? customTags
      : buildCaseTags(country, method, type, city, yearStr, authority, Boolean(image)),
  };
};

/* ============================================================
   5. نمونه‌های واقعی ویزاهای اتریش + پرونده‌های بین‌المللی
   ============================================================ */
const NEW_CASES: EnhancedVisaCase[] = [
  /* ---------------- 🇦🇹 اتریش — ۱۶ نمونه ویزا و کارت اقامت واقعی ---------------- */
  buildCase(
    2,
    'اتریش',
    '🇦🇹',
    'تمکن مالی',
    'کارت اقامت تمکن مالی اتریش — نمای کامل کارت (۲۰۲۵–۲۰۲۶)',
    'Niederlassungsbewilligung ausgenommen Erwerbstätigkeit',
    'وین',
    '۲۰۲۵–۲۰۲۶',
    true,
    'MA35 Wien',
    '۳-۵ ماه',
    '/assets/aistudio/________________________________2026-______59ad5e27.webp',
    'نوع ویزا: کارت اقامت تمکن مالی (خودحمایتی) اتریش — تصویر کامل کارت بیومتریک',
  ),
  buildCase(
    3,
    'اتریش',
    '🇦🇹',
    'تمکن مالی',
    'کارت اقامت تمکن مالی اتریش (رضا — ۲۰۲۵–۲۰۲۶)',
    'Niederlassungsbewilligung ausgenommen Erwerbstätigkeit',
    'وین',
    '۲۰۲۵–۲۰۲۶',
    true,
    'MA35 Wien',
    '۳-۵ ماه',
    '/assets/aistudio/___-______________________2025-2026_d06e36e1.webp',
    'نوع ویزا: کارت اقامت تمکن مالی (خودحمایتی) اتریش — Niederlassungsbewilligung ausgenommen Erwerbstätigkeit',
  ),
  buildCase(
    4,
    'اتریش',
    '🇦🇹',
    'تمکن مالی',
    'کارت اقامت تمکن مالی اتریش (نادیا — ۲۰۲۵–۲۰۲۶)',
    'Niederlassungsbewilligung ausgenommen Erwerbstätigkeit',
    'وین',
    '۲۰۲۵–۲۰۲۶',
    true,
    'MA35 Wien',
    '۳-۵ ماه',
    '/assets/aistudio/______-______________________2025-2026_f96e1b08.webp',
    'نوع ویزا: کارت اقامت تمکن مالی (خودحمایتی) اتریش — Niederlassungsbewilligung ausgenommen Erwerbstätigkeit',
  ),

  buildCase(
    6,
    'اتریش',
    '🇦🇹',
    'تمکن مالی',
    'کارت اقامت تمکن مالی اتریش (۲۰۲۴–۲۰۲۵)',
    'Niederlassungsbewilligung ausgenommen Erwerbstätigkeit',
    'وین',
    '۲۰۲۴–۲۰۲۵',
    true,
    'MA35 Wien',
    '۳-۵ ماه',
    '/assets/aistudio/_____-______________________2025-2024_25b807b9.webp',
    'نوع ویزا: کارت اقامت تمکن مالی (خودحمایتی) اتریش — Niederlassungsbewilligung ausgenommen Erwerbstätigkeit',
  ),
  buildCase(
    7,
    'اتریش',
    '🇦🇹',
    'هنرمندی',
    'کارت اقامت ویزای هنرمندی اتریش (۲۰۲۴–۲۰۲۵)',
    'Niederlassungsbewilligung – Künstler',
    'وین',
    '۲۰۲۴–۲۰۲۵',
    true,
    'MA35 Wien',
    '۳-۴ ماه',
    '/assets/aistudio/__________________2024-2025___Artist_visa____________2024-______490fb558.webp',
    'نوع ویزا: کارت اقامت ویزای هنرمندی اتریش — Niederlassungsbewilligung – Künstler (Artist Visa)',
  ),
  buildCase(
    8,
    'اتریش',
    '🇦🇹',
    'هنرمندی',
    'کارت اقامت ویزای هنرمندی اتریش (۲۰۲۴–۲۰۲۵)',
    'Niederlassungsbewilligung – Künstler',
    'وین',
    '۲۰۲۴–۲۰۲۵',
    true,
    'MA35 Wien',
    '۳-۴ ماه',
    '/assets/aistudio/__________________2024-Artist_visa____________-_783c887d.webp',
    'نوع ویزا: کارت اقامت ویزای هنرمندی اتریش — Niederlassungsbewilligung – Künstler (Artist Visa)',
  ),
  buildCase(
    9,
    'اتریش',
    '🇦🇹',
    'هنرمندی',
    'کارت اقامت ویزای هنرمندی اتریش (۲۰۲۳–۲۰۲۴)',
    'Niederlassungsbewilligung – Künstler',
    'وین',
    '۲۰۲۳–۲۰۲۴',
    true,
    'MA35 Wien',
    '۳-۴ ماه',
    '/assets/aistudio/__________________2024-Artist_visa____________2023-______69b28bce.webp',
    'نوع ویزا: کارت اقامت ویزای هنرمندی اتریش — Niederlassungsbewilligung – Künstler (Artist Visa)',
  ),
  buildCase(
    10,
    'اتریش',
    '🇦🇹',
    'هنرمندی',
    'کارت اقامت ویزای هنرمندی اتریش (۲۰۲۳–۲۰۲۴)',
    'Niederlassungsbewilligung – Künstler',
    'وین',
    '۲۰۲۳–۲۰۲۴',
    true,
    'MA35 Wien',
    '۳-۴ ماه',
    '/assets/aistudio/__________________2023-_Artist_visa____________2024-______6a45e964.webp',
    'نوع ویزا: کارت اقامت ویزای هنرمندی اتریش — Niederlassungsbewilligung – Künstler (Artist Visa)',
  ),
  buildCase(
    11,
    'اتریش',
    '🇦🇹',
    'کارت اقامت تحصیلی و دانش‌آموزی',
    'کارت اقامت ویزای دانشجویی اتریش (۲۰۲۵–۲۰۲۶)',
    'Aufenthaltsbewilligung – Student',
    'وین',
    '۲۰۲۵–۲۰۲۶',
    true,
    'MA35 Wien',
    '۶-۱۰ هفته',
    '/assets/aistudio/__________________________________2025-2025-__________065ba4f8.webp',
    'نوع ویزا: کارت اقامت ویزای دانشجویی اتریش — Aufenthaltsbewilligung – Student',
  ),
  buildCase(
    12,
    'اتریش',
    '🇦🇹',
    'کارت اقامت تحصیلی و دانش‌آموزی',
    'کارت اقامت ویزای دانش‌آموزی اتریش (۲۰۲۳–۲۰۲۴)',
    'Aufenthaltsbewilligung – Schüler',
    'وین',
    '۲۰۲۳–۲۰۲۴',
    true,
    'MA35 Wien',
    '۶-۱۰ هفته',
    '/assets/aistudio/_________________________________2024-______dfd20629.webp',
    'نوع ویزا: کارت اقامت ویزای دانش‌آموزی اتریش — Aufenthaltsbewilligung – Schüler',
  ),
  buildCase(
    13,
    'اتریش',
    '🇦🇹',
    'ویزای ورود ملی (Type D)',
    'ویزای تحصیلی اتریش — لیبل Type D (۲۰۲۵)',
    'Visum Type D (Österreich)',
    'وین',
    '۲۰۲۵',
    true,
    'سفارت اتریش (تهران)',
    '۳-۶ هفته',
    '/assets/aistudio/_____________________________2025_8db56219.webp',
    'نوع ویزا: ویزای ملی ورود تحصیلی اتریش (Type D) — صادره از سفارت اتریش تهران',
  ),
  buildCase(
    14,
    'اتریش',
    '🇦🇹',
    'ویزای ورود ملی (Type D)',
    'ویزای تحصیلی اتریش — لیبل Type D (۲۰۲۵)',
    'Visum Type D (Österreich)',
    'وین',
    '۲۰۲۵',
    true,
    'سفارت اتریش (تهران)',
    '۳-۶ هفته',
    '/assets/aistudio/_____________________________2025-_____fe1cee65.webp',
    'نوع ویزا: ویزای ملی ورود تحصیلی اتریش (Type D) — صادره از سفارت اتریش تهران',
  ),
  buildCase(
    15,
    'اتریش',
    '🇦🇹',
    'ویزای ورود ملی (Type D)',
    'ویزای تحصیلی اتریش — لیبل Type D (۲۰۲۴)',
    'Visum Type D (Österreich)',
    'وین',
    '۲۰۲۴',
    true,
    'سفارت اتریش (تهران)',
    '۳-۶ هفته',
    '/assets/aistudio/_____________________________2024-______94aacf1c.webp',
    'نوع ویزا: ویزای ملی ورود تحصیلی اتریش (Type D) — صادره از سفارت اتریش تهران',
  ),
  buildCase(
    16,
    'اتریش',
    '🇦🇹',
    'ویزای ورود ملی (Type D)',
    'ویزای تحصیلی اتریش — لیبل Type D (۲۰۲۴)',
    'Visum Type D (Österreich)',
    'وین',
    '۲۰۲۴',
    true,
    'سفارت اتریش (تهران)',
    '۳-۶ هفته',
    '/assets/aistudio/_____________________________2024-_______8247e55f.webp',
    'نوع ویزا: ویزای ملی ورود تحصیلی اتریش (Type D) — صادره از سفارت اتریش تهران',
  ),
  buildCase(
    17,
    'اتریش',
    '🇦🇹',
    'ویزای ورود ملی (Type D)',
    'ویزای تحصیلی اتریش — لیبل Type D (۲۰۲۴)',
    'Visum Type D (Österreich)',
    'وین',
    '۲۰۲۴',
    true,
    'سفارت اتریش (تهران)',
    '۳-۶ هفته',
    '/assets/aistudio/_____________________________2024-______d86a98b3.webp',
    'نوع ویزا: ویزای ملی ورود تحصیلی اتریش (Type D) — صادره از سفارت اتریش تهران',
  ),
  buildCase(
    18,
    'اتریش',
    '🇦🇹',
    'ویزای ورود ملی (Type D)',
    'ویزای تحصیلی اتریش — لیبل Type D (۲۰۲۴)',
    'Visum Type D (Österreich)',
    'وین',
    '۲۰۲۴',
    true,
    'سفارت اتریش (تهران)',
    '۳-۶ هفته',
    '/assets/aistudio/_____________________________2024-______b84dc211.webp',
    'نوع ویزا: ویزای ملی ورود تحصیلی اتریش (Type D) — صادره از سفارت اتریش تهران',
  ),

  /* ---------------- 🇩🇪 آلمان — ۱۱ نمونه ویزای واقعی ---------------- */
  buildCase(
    1,
    'آلمان',
    '🇩🇪',
    'Blue Card (بلوکارت)',
    'ویزای بلوکارت اتحادیه اروپا — آلمان (۲۰۲۳–۲۰۲۴)',
    'Blaue Karte EU — Visum Type D',
    'تهران / آلمان',
    '۲۰۲۳–۲۰۲۴',
    true,
    'سفارت آلمان (تهران)',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_23_55_39_6XQUU_7678a79a.webp',
    'نوع ویزا: ویزای بلوکارت اتحادیه اروپا (EU Blue Card — Type D)',
    'landscape',
  ),
  buildCase(
    2,
    'آلمان',
    '🇩🇪',
    'Blue Card (بلوکارت)',
    'ویزای بلوکارت آلمان — ماده 18b قانون اقامت (۲۰۲۱–۲۰۲۲)',
    'Blaue Karte EU (§ 18b Abs. 2 AufenthG)',
    'آنکارا / آلمان',
    '۲۰۲۱–۲۰۲۲',
    true,
    'سفارت آلمان (آنکارا)',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_36_06_dFFKS_1ccc805e.webp',
    'نوع ویزا: ویزای بلوکارت آلمان — Blaue Karte EU (§ 18b AufenthG)',
    'landscape',
  ),
  buildCase(
    3,
    'آلمان',
    '🇩🇪',
    'پیوست خانواده (Family Reunion)',
    'ویزای پیوست همزمان خانواده — آلمان (۲۰۲۳–۲۰۲۴)',
    'Familiennachzug — Visum Type D',
    'تهران / آلمان',
    '۲۰۲۳–۲۰۲۴',
    true,
    'سفارت آلمان (تهران)',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_23_56_58_d3JLa_dfefe89d.webp',
    'نوع ویزا: ویزای پیوست همزمان خانواده آلمان (Family Reunion — Type D)',
    'landscape',
  ),
  buildCase(
    4,
    'آلمان',
    '🇩🇪',
    'ویزای ورود ملی (Type D)',
    'ویزای ملی ورود آلمان — لیبل Type D (۲۰۲۳–۲۰۲۴)',
    'Nationales Visum Type D (Deutschland)',
    'تهران / آلمان',
    '۲۰۲۳–۲۰۲۴',
    true,
    'سفارت آلمان (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_23_21_04_v2p21_d7064c34.webp',
    'نوع ویزا: ویزای ملی ورود آلمان (National Visa Type D) — صادره از سفارت آلمان تهران',
    'landscape',
  ),
  buildCase(
    5,
    'آلمان',
    '🇩🇪',
    'ویزای ورود ملی (Type D)',
    'ویزای ملی ورود آلمان — لیبل Type D (۲۰۲۳–۲۰۲۴)',
    'Nationales Visum Type D (Deutschland)',
    'تهران / آلمان',
    '۲۰۲۳–۲۰۲۴',
    true,
    'سفارت آلمان (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_22_50_57_KM4dy_27796771.webp',
    'نوع ویزا: ویزای ملی ورود آلمان (National Visa Type D) — چندبار ورود (MULT)',
    'landscape',
  ),
  buildCase(
    6,
    'آلمان',
    '🇩🇪',
    'ویزای ورود ملی (Type D)',
    'ویزای ملی ورود آلمان — لیبل Type D (۲۰۲۳–۲۰۲۴)',
    'Nationales Visum Type D (Deutschland)',
    'تهران / آلمان',
    '۲۰۲۳–۲۰۲۴',
    true,
    'سفارت آلمان (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_22_45_17_VwrmQ_d7a878ee.webp',
    'نوع ویزا: ویزای ملی ورود آلمان (National Visa Type D) — صادره از سفارت آلمان تهران',
    'landscape',
  ),
  buildCase(
    7,
    'آلمان',
    '🇩🇪',
    'ویزای ورود ملی (Type D)',
    'ویزای ملی ورود آلمان — لیبل Type D (۲۰۲۳–۲۰۲۴)',
    'Nationales Visum Type D (Deutschland)',
    'تهران / آلمان',
    '۲۰۲۳–۲۰۲۴',
    true,
    'سفارت آلمان (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_30_42_wS9hY_1495bc6f.webp',
    'نوع ویزا: ویزای ملی ورود آلمان (National Visa Type D) — صادره از سفارت آلمان تهران',
    'landscape',
  ),
  buildCase(
    8,
    'آلمان',
    '🇩🇪',
    'ویزای ورود ملی (Type D)',
    'ویزای ملی ورود آلمان — لیبل Type D (۲۰۲۳)',
    'Nationales Visum Type D (Deutschland)',
    'تهران / آلمان',
    '۲۰۲۳',
    true,
    'سفارت آلمان (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_27_31_3zRIE_3e548549.webp',
    'نوع ویزا: ویزای ملی ورود آلمان (National Visa Type D) — چندبار ورود (MULT)',
    'landscape',
  ),
  buildCase(
    9,
    'آلمان',
    '🇩🇪',
    'ویزای ورود ملی (Type D)',
    'ویزای ملی ورود آلمان — لیبل Type D (۲۰۲۲)',
    'Nationales Visum Type D (Deutschland)',
    'تهران / آلمان',
    '۲۰۲۲',
    true,
    'سفارت آلمان (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_22_52_22_cMHEm_dc56e97a.webp',
    'نوع ویزا: ویزای ملی ورود آلمان (National Visa Type D) — صادره از سفارت آلمان تهران',
    'landscape',
  ),
  buildCase(
    10,
    'آلمان',
    '🇩🇪',
    'ویزای ورود ملی (Type D)',
    'ویزای ملی ورود آلمان — لیبل Type D (۲۰۲۱–۲۰۲۲)',
    'Nationales Visum Type D (Deutschland)',
    'تهران / آلمان',
    '۲۰۲۱–۲۰۲۲',
    true,
    'سفارت آلمان (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_33_15_QkOoz_31d0a05a.webp',
    'نوع ویزا: ویزای ملی ورود آلمان (National Visa Type D) — صادره از سفارت آلمان تهران',
    'landscape',
  ),
  buildCase(
    11,
    'آلمان',
    '🇩🇪',
    'ویزای ورود ملی (Type D)',
    'ویزای ملی ورود آلمان — لیبل Type D (۲۰۲۱–۲۰۲۲)',
    'Nationales Visum Type D (Deutschland)',
    'تهران / آلمان',
    '۲۰۲۱–۲۰۲۲',
    true,
    'سفارت آلمان (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_34_39_P5Cuk_2b43272f.webp',
    'نوع ویزا: ویزای ملی ورود آلمان (National Visa Type D) — پرونده همراه همزمان',
    'landscape',
  ),

  /* ---------------- 🇪🇸 اسپانیا — ۱۷ نمونه ویزا و کارت اقامت واقعی ---------------- */
  buildCase(
    1,
    'اسپانیا',
    '🇪🇸',
    'ویزای تمکن مالی (Type D)',
    'ویزای تمکن مالی اسپانیا — لیبل Type D (۲۰۲۵)',
    'Visado Type D – Residencia No Lucrativa (N.I.E.)',
    'تهران / اسپانیا',
    '۲۰۲۵',
    true,
    'سفارت اسپانیا (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/______________-__________________2025-_18_5888db28.webp',
    'نوع ویزا: ویزای تمکن مالی اسپانیا (Visado Type D – Residencia N.I.E.) ۲۰۲۵',
  ),
  buildCase(
    2,
    'اسپانیا',
    '🇪🇸',
    'ویزای تمکن مالی (Type D)',
    'ویزای تمکن مالی اسپانیا — لیبل ۳۶۵ روزه Type D (۲۰۲۵–۲۰۲۶)',
    'Visado Type D – Residencia (365 Días / MULT)',
    'تهران / اسپانیا',
    '۲۰۲۵–۲۰۲۶',
    true,
    'سفارت اسپانیا (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/________________________-_________2025_4b609102.webp',
    'نوع ویزا: ویزای تمکن مالی اسپانیا ۳۶۵ روزه چندبار ورود (Visado Type D – Residencia MULT)',
  ),
  buildCase(
    3,
    'اسپانیا',
    '🇪🇸',
    'ویزای تمکن مالی (Type D)',
    'ویزای تمکن مالی اسپانیا — لیبل ۳۶۵ روزه Type D (۲۰۲۵–۲۰۲۶)',
    'Visado Type D – Residencia (365 Días / MULT)',
    'تهران / اسپانیا',
    '۲۰۲۵–۲۰۲۶',
    true,
    'سفارت اسپانیا (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/________________________-_____2025_17c758ff.webp',
    'نوع ویزا: ویزای تمکن مالی اسپانیا ۳۶۵ روزه چندبار ورود (Visado Type D – Residencia MULT)',
  ),
  buildCase(
    4,
    'اسپانیا',
    '🇪🇸',
    'کارت اقامت تمکن مالی (TIE)',
    'کارت اقامت تمکن مالی اسپانیا — TIE (۲۰۲۵–۲۰۲۶)',
    'Permiso de Residencia – Temporal Inicial (No Autoriza a Trabajar)',
    'اسپانیا',
    '۲۰۲۵–۲۰۲۶',
    true,
    'Extranjería / Policía Nacional',
    '۴-۸ هفته',
    '/assets/aistudio/_____________-__________2025-_14_e6413012.webp',
    'نوع ویزا: کارت اقامت تمکن مالی اسپانیا (Residencia Temporal Inicial – TIE)',
  ),
  buildCase(
    5,
    'اسپانیا',
    '🇪🇸',
    'کارت اقامت تمکن مالی (TIE)',
    'کارت اقامت تمکن مالی اسپانیا — TIE (۲۰۲۵–۲۰۲۶)',
    'Permiso de Residencia – Temporal Inicial (No Autoriza a Trabajar)',
    'اسپانیا',
    '۲۰۲۵–۲۰۲۶',
    true,
    'Extranjería / Policía Nacional',
    '۴-۸ هفته',
    '/assets/aistudio/_____________-__________2025-15_a4eeaf2b.webp',
    'نوع ویزا: کارت اقامت تمکن مالی اسپانیا (Residencia Temporal Inicial – TIE)',
  ),
  buildCase(
    6,
    'اسپانیا',
    '🇪🇸',
    'کارت اقامت تمکن مالی (TIE)',
    'کارت اقامت تمکن مالی اسپانیا — TIE (۲۰۲۵–۲۰۲۶)',
    'Permiso de Residencia – Temporal Inicial (No Autoriza a Trabajar)',
    'اسپانیا',
    '۲۰۲۵–۲۰۲۶',
    true,
    'Extranjería / Policía Nacional',
    '۴-۸ هفته',
    '/assets/aistudio/______________-___________2025-_16_cf006d73.webp',
    'نوع ویزا: کارت اقامت تمکن مالی اسپانیا (Residencia Temporal Inicial – TIE)',
  ),
  buildCase(
    7,
    'اسپانیا',
    '🇪🇸',
    'کارت اقامت تمکن مالی (TIE)',
    'کارت اقامت تمکن مالی اسپانیا — TIE (۲۰۲۵–۲۰۲۶)',
    'Permiso de Residencia – Temporal Inicial (No Autoriza a Trabajar)',
    'اسپانیا',
    '۲۰۲۵–۲۰۲۶',
    true,
    'Extranjería / Policía Nacional',
    '۴-۸ هفته',
    '/assets/aistudio/______________-___________2025-_17_f64a0bb4.webp',
    'نوع ویزا: کارت اقامت تمکن مالی اسپانیا (Residencia Temporal Inicial – TIE)',
  ),
  buildCase(
    8,
    'اسپانیا',
    '🇪🇸',
    'کارت اقامت تمکن مالی (TIE)',
    'کارت اقامت تمکن مالی اسپانیا — TIE (۲۰۲۵–۲۰۲۶)',
    'Permiso de Residencia – Temporal Inicial (No Autoriza a Trabajar)',
    'اسپانیا',
    '۲۰۲۵–۲۰۲۶',
    true,
    'Extranjería / Policía Nacional',
    '۴-۸ هفته',
    '/assets/aistudio/______________-___________2025-_18_d10d7999.webp',
    'نوع ویزا: کارت اقامت تمکن مالی اسپانیا (Residencia Temporal Inicial – TIE)',
  ),
  buildCase(
    9,
    'اسپانیا',
    '🇪🇸',
    'کارت اقامت تمکن مالی (TIE)',
    'کارت اقامت تمکن مالی اسپانیا — TIE (۲۰۲۳–۲۰۲۴)',
    'Permiso de Residencia – Temporal Inicial (No Autoriza a Trabajar)',
    'اسپانیا',
    '۲۰۲۳–۲۰۲۴',
    true,
    'Extranjería / Policía Nacional',
    '۴-۸ هفته',
    '/assets/aistudio/img_462x284x24_0035432_5061fca6.webp',
    'نوع ویزا: کارت اقامت تمکن مالی اسپانیا (Residencia Temporal Inicial – TIE)',
    'landscape',
  ),
  buildCase(
    10,
    'اسپانیا',
    '🇪🇸',
    'کارت اقامت تمکن مالی (TIE)',
    'کارت اقامت تمکن مالی اسپانیا — TIE (۲۰۲۳–۲۰۲۴)',
    'Permiso de Residencia – Temporal Inicial (No Autoriza a Trabajar)',
    'اسپانیا',
    '۲۰۲۳–۲۰۲۴',
    true,
    'Extranjería / Policía Nacional',
    '۴-۸ هفته',
    '/assets/aistudio/img_467x305x24_0035499_21985238.webp',
    'نوع ویزا: کارت اقامت تمکن مالی اسپانیا (Residencia Temporal Inicial – TIE)',
    'landscape',
  ),
  buildCase(
    11,
    'اسپانیا',
    '🇪🇸',
    'کارت اقامت تمکن مالی (TIE)',
    'کارت اقامت تمکن مالی اسپانیا — TIE (۲۰۲۳–۲۰۲۴)',
    'Permiso de Residencia – Temporal Inicial (No Autoriza a Trabajar)',
    'اسپانیا',
    '۲۰۲۳–۲۰۲۴',
    true,
    'Extranjería / Policía Nacional',
    '۴-۸ هفته',
    '/assets/aistudio/img_473x293x24_0035503_6ad1716b.webp',
    'نوع ویزا: کارت اقامت تمکن مالی اسپانیا (Residencia Temporal Inicial – TIE)',
    'landscape',
  ),
  buildCase(
    12,
    'اسپانیا',
    '🇪🇸',
    'کارت اقامت تمکن مالی (TIE)',
    'کارت اقامت تمکن مالی اسپانیا — TIE (۲۰۲۳–۲۰۲۴)',
    'Permiso de Residencia – Temporal Inicial (No Autoriza a Trabajar)',
    'اسپانیا',
    '۲۰۲۳–۲۰۲۴',
    true,
    'Extranjería / Policía Nacional',
    '۴-۸ هفته',
    '/assets/aistudio/img_475x290x24_0035507_5f60d7d2.webp',
    'نوع ویزا: کارت اقامت تمکن مالی اسپانیا (Residencia Temporal Inicial – TIE)',
    'landscape',
  ),
  buildCase(
    13,
    'اسپانیا',
    '🇪🇸',
    'کارت اقامت تمکن مالی (TIE)',
    'کارت اقامت تمکن مالی اسپانیا — TIE (۲۰۲۳–۲۰۲۴)',
    'Permiso de Residencia – Temporal Inicial (No Autoriza a Trabajar)',
    'اسپانیا',
    '۲۰۲۳–۲۰۲۴',
    true,
    'Extranjería / Policía Nacional',
    '۴-۸ هفته',
    '/assets/aistudio/photo_2024-02-14_12-35-54_e504995c.webp',
    'نوع ویزا: کارت اقامت تمکن مالی اسپانیا (Residencia Temporal Inicial – TIE)',
    'landscape',
  ),
  buildCase(
    14,
    'اسپانیا',
    '🇪🇸',
    'کارت اقامت تمکن مالی (TIE)',
    'کارت اقامت تمکن مالی اسپانیا — TIE (۲۰۲۳–۲۰۲۴)',
    'Permiso de Residencia – Temporal Inicial (No Autoriza a Trabajar)',
    'اسپانیا',
    '۲۰۲۳–۲۰۲۴',
    true,
    'Extranjería / Policía Nacional',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_14_21_uTylG_6419f360.webp',
    'نوع ویزا: کارت اقامت تمکن مالی اسپانیا (Residencia Temporal Inicial – TIE)',
    'landscape',
  ),
  buildCase(
    15,
    'اسپانیا',
    '🇪🇸',
    'کارت اقامت اسپانیا (TIE)',
    'کارت اقامت اسپانیا — فوئنخیرولا، مالاگا (۲۰۲۰–۲۰۲۱)',
    'Permiso de Residencia (Fuengirola, Málaga)',
    'مالاگا (فوئنخیرولا)',
    '۲۰۲۰–۲۰۲۱',
    true,
    'Extranjería Málaga',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_13_02_2024_00_18_49_xoixO_b39b14d1.webp',
    'نوع ویزا: کارت اقامت رسمی اسپانیا (Spain Residence – Permiso de Residencia)',
    'landscape',
  ),
  buildCase(
    16,
    'اسپانیا',
    '🇪🇸',
    'ویزای تمکن مالی (Type D)',
    'ویزای اقامت اسپانیا — لیبل Type D (۲۰۲۰)',
    'Visado Type D – Residencia N.I.E. (MULT)',
    'تهران / اسپانیا',
    '۲۰۲۰',
    true,
    'سفارت اسپانیا (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_13_02_2024_00_21_45_7t2Ob_f47cfbc7.webp',
    'نوع ویزا: ویزای اقامت اسپانیا Type D چندبار ورود (Residencia – N.I.E.)',
    'landscape',
  ),
  buildCase(
    17,
    'اسپانیا',
    '🇪🇸',
    'ویزای تمکن مالی (Type D)',
    'ویزای اقامت اسپانیا — لیبل Type D (۲۰۲۰)',
    'Visado Type D – Residencia N.I.E. (MULT)',
    'تهران / اسپانیا',
    '۲۰۲۰',
    true,
    'سفارت اسپانیا (تهران)',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_13_02_2024_00_29_52_HS3md_be865164.webp',
    'نوع ویزا: ویزای اقامت اسپانیا Type D چندبار ورود (Residencia – N.I.E.)',
    'landscape',
  ),

  /* ---------------- 🇸🇰 اسلواکی — ۲ نمونه واقعی کارت اقامت کارآفرینی و ثبت شرکت ---------------- */
  buildCase(
    1,
    'اسلواکی',
    '🇸🇰',
    'ثبت شرکت و کارآفرینی (Podnikanie)',
    'کارت اقامت موقت کارآفرینی و ثبت شرکت اسلواکی — حسین (۲۰۱۸–۲۰۱۹)',
    'Povolenie na pobyt – Prechodný (Podnikanie)',
    'دونایسکا استردا (Dunajská Streda)',
    '۲۰۱۸–۲۰۱۹',
    true,
    'Foreign Police Dunajská Streda',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_55_53_usOZf_58109c28.webp',
    'نوع کارت: کارت اقامت موقت اسلواکی از طریق ثبت شرکت و کارآفرینی — Prechodný pobyt (Podnikanie)',
    'landscape',
  ),
  buildCase(
    2,
    'اسلواکی',
    '🇸🇰',
    'ثبت شرکت و کارآفرینی (Podnikanie)',
    'کارت اقامت موقت کارآفرینی و ثبت شرکت اسلواکی — صادره از دونایسکا استردا (۲۰۱۶–۲۰۱۸)',
    'Povolenie na pobyt – Prechodný (Podnikanie)',
    'دونایسکا استردا (Dunajská Streda)',
    '۲۰۱۶–۲۰۱۸',
    true,
    'Foreign Police Dunajská Streda',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_43_36_O8IRm_dc74cef6.webp',
    'نوع کارت: کارت اقامت موقت اسلواکی از طریق ثبت شرکت و کارآفرینی — Prechodný pobyt (Podnikanie)',
    'landscape',
  ),

  /* ---------------- 🇫🇷 فرانسه — ۶ نمونه ویزای واقعی ---------------- */
  buildCase(
    1,
    'فرانسه',
    '🇫🇷',
    'اقامت تمکن مالی (Visiteur)',
    'ویزای بلندمدت تمکن مالی فرانسه — VLS-TS Visiteur یک‌ساله (۲۰۲۴–۲۰۲۵)',
    'Visa Long Séjour Type D – V1 VLSTS Visiteur (MULT)',
    'تهران / فرانسه',
    '۲۰۲۴–۲۰۲۵',
    true,
    'سفارت فرانسه (تهران) / OFII',
    '۴-۸ هفته',
    '/assets/aistudio/2024-02-18_14-04-08_afd60cf5.webp',
    'نوع ویزا: ویزای بلندمدت اقامت تمکن مالی فرانسه — VLS-TS Visiteur یک‌ساله (Type D MULT)',
    'landscape',
  ),
  buildCase(
    2,
    'فرانسه',
    '🇫🇷',
    'اقامت تمکن مالی (Visiteur)',
    'ویزای بلندمدت تمکن مالی فرانسه — لیبل Type D Visiteur یک‌ساله (۲۰۲۲–۲۰۲۳)',
    'Visa Long Séjour Type D – Visiteur (R311-3 5° / MULT)',
    'تهران / فرانسه',
    '۲۰۲۲–۲۰۲۳',
    true,
    'سفارت فرانسه (تهران) / OFII',
    '۴-۸ هفته',
    '/assets/aistudio/2022-03-09_09.52.14_c76341b7.webp',
    'نوع ویزا: ویزای بلندمدت اقامت تمکن مالی فرانسه (Type D – Visiteur R311-3 5°)',
    'landscape',
  ),
  buildCase(
    3,
    'فرانسه',
    '🇫🇷',
    'اقامت تمکن مالی (Visiteur)',
    'ویزای بلندمدت تمکن مالی فرانسه — پرونده همراه همزمان (۲۰۲۲–۲۰۲۳)',
    'Visa Long Séjour Type D – Visiteur (R311-3 5° / MULT)',
    'تهران / فرانسه',
    '۲۰۲۲–۲۰۲۳',
    true,
    'سفارت فرانسه (تهران) / OFII',
    '۴-۸ هفته',
    '/assets/aistudio/2022-03-09_09.52.17_9818e50a.webp',
    'نوع ویزا: ویزای بلندمدت اقامت تمکن مالی فرانسه — همراه خانواده (Type D – Visiteur R311-3 5°)',
    'landscape',
  ),
  buildCase(
    4,
    'فرانسه',
    '🇫🇷',
    'تحصیل (Étudiant)',
    'ویزای بلندمدت تحصیلی فرانسه — لیبل Type D Étudiant یک‌ساله (۲۰۲۱–۲۰۲۲)',
    'Visa Long Séjour Type D – Étudiant (R311-3 6° / MULT)',
    'تهران / فرانسه',
    '۲۰۲۱–۲۰۲۲',
    true,
    'سفارت فرانسه (تهران) / Campus France',
    '۳-۶ هفته',
    '/assets/aistudio/-719949770_562cf9a8.webp',
    'نوع ویزا: ویزای بلندمدت دانشجویی فرانسه (Type D – Étudiant R311-3 6°)',
    'landscape',
  ),
  buildCase(
    5,
    'فرانسه',
    '🇫🇷',
    'ویزای شینگن (Type C)',
    'ویزای شینگن کوتاه‌مدت فرانسه — لیبل Type C (۲۰۲۴)',
    'Visa Schengen Type C – États Schengen',
    'تهران / شینگن',
    '۲۰۲۴',
    true,
    'سفارت فرانسه (تهران)',
    '۲-۳ هفته',
    '/assets/aistudio/1_9d9c6ddf.webp',
    'نوع ویزا: ویزای شینگن فرانسه (Visa Schengen Type C – États Schengen)',
    'landscape',
  ),
  buildCase(
    6,
    'فرانسه',
    '🇫🇷',
    'ویزای شینگن (Type C)',
    'ویزای شینگن کوتاه‌مدت فرانسه — لیبل Type C (۲۰۲۴)',
    'Visa Schengen Type C – États Schengen',
    'تهران / شینگن',
    '۲۰۲۴',
    true,
    'سفارت فرانسه (تهران)',
    '۲-۳ هفته',
    '/assets/aistudio/2_1fffd7b1.webp',
    'نوع ویزا: ویزای شینگن فرانسه (Visa Schengen Type C – États Schengen)',
    'landscape',
  ),

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

  /* ---------------- 🇬🇷 یونان — ۵۰ نمونه واقعی ویزا، کارت اقامت و برگه آبی ---------------- */
  buildCase(
    1,
    'یونان',
    '🇬🇷',
    'گلدن ویزا (سرمایه‌گذاری)',
    'کارت اقامت دائم سرمایه‌گذاری یونان — گلدن ویزا (۲۰۲۳–۲۰۲۸)',
    'Επενδυτής – Μόνιμη Διαμονή (Investor Permanent Residence)',
    'آتن',
    '۲۰۲۳–۲۰۲۸',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Photoleap_12_02_2024_00_01_13_WM1Gf_37746815.webp',
    'نوع ویزا: کارت اقامت دائم گلدن ویزای یونان (Investor – Permanent Residence)',
    'landscape',
  ),
  buildCase(
    2,
    'یونان',
    '🇬🇷',
    'گلدن ویزا (سرمایه‌گذاری)',
    'کارت اقامت دائم سرمایه‌گذاری یونان — گلدن ویزا (۲۰۲۳–۲۰۲۸)',
    'Επενδυτής – Μόνιμη Διαμονή (Investor Permanent Residence)',
    'آتن',
    '۲۰۲۳–۲۰۲۸',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Polish_20241225_225941425_bd728ecc.webp',
    'نوع ویزا: کارت اقامت دائم گلدن ویزای یونان (Investor – Permanent Residence)',
    'landscape',
  ),
  buildCase(
    3,
    'یونان',
    '🇬🇷',
    'گلدن ویزا (سرمایه‌گذاری)',
    'کارت اقامت دائم سرمایه‌گذاری یونان — گلدن ویزا (۲۰۲۳–۲۰۲۸)',
    'Επενδυτής – Μόνιμη Διαμονή (Investor Permanent Residence)',
    'آتن',
    '۲۰۲۳–۲۰۲۸',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Photoleap_11_02_2024_22_32_55_e8v0V_71009206.webp',
    'نوع ویزا: کارت اقامت دائم گلدن ویزای یونان (Investor – Permanent Residence)',
    'landscape',
  ),
  buildCase(
    4,
    'یونان',
    '🇬🇷',
    'گلدن ویزا (سرمایه‌گذاری)',
    'کارت اقامت دائم سرمایه‌گذاری یونان — گلدن ویزا (۲۰۲۳–۲۰۲۸)',
    'Επενδυτής – Μόνιμη Διαμονή (Investor Permanent Residence)',
    'آتن',
    '۲۰۲۳–۲۰۲۸',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Photoleap_11_02_2024_22_42_18_gqxwk_0f6384e4.webp',
    'نوع ویزا: کارت اقامت دائم گلدن ویزای یونان (Investor – Permanent Residence)',
    'landscape',
  ),
  buildCase(
    5,
    'یونان',
    '🇬🇷',
    'تمکن مالی (FIP)',
    'کارت اقامت تمکن مالی یونان — صادرشده در ۲۰۲۴ (اعتبار تا ۲۰۲۷)',
    'Οικονομικά Ανεξάρτητο Άτομο (Financially Independent)',
    'آتن',
    '۲۰۲۴–۲۰۲۷',
    true,
    'Ministry of Migration Greece',
    '۸-۱۲ هفته',
    '/assets/aistudio/im_g____796x480x32_0024488_7707e314.webp',
    'نوع ویزا: کارت اقامت تمکن مالی یونان ۲۰۲۴ (Financially Independent Person)',
    'landscape',
  ),
  buildCase(
    6,
    'یونان',
    '🇬🇷',
    'تمکن مالی (FIP)',
    'کارت اقامت تمکن مالی و همراه خانواده یونان (۲۰۲۰–۲۰۲۲)',
    'Οικονομικά Ανεξάρτητο Άτομο & Μέλος Οικογένειας (FIP)',
    'آتن',
    '۲۰۲۰–۲۰۲۲',
    true,
    'Αποκεντρωμένη Διοίκηση Αττικής (Athina)',
    '۸-۱۲ هفته',
    '/assets/aistudio/Polish_20240221_002124493_53a1e78b.webp',
    'نوع ویزا: کارت اقامت تمکن مالی یونان و همراه خانواده (Financially Independent & Family Member)',
  ),
  buildCase(
    7,
    'یونان',
    '🇬🇷',
    'تمکن مالی (FIP)',
    'ویزای ورود تمکن مالی (Type D) و کارت اقامت ۲ ساله یونان (۲۰۱۹–۲۰۲۱)',
    'Visa Type D (Γ.3.1) & Financially Independent Card',
    'تهران / آتن',
    '۲۰۱۹–۲۰۲۱',
    true,
    'سفارت یونان / Athina',
    '۸-۱۲ هفته',
    '/assets/aistudio/Polish_20240221_000757145_298b6f5b.webp',
    'نوع ویزا: ویزای ورود تمکن مالی یونان (Type D – Γ.3.1) و کارت اقامت بیومتریک ۲ ساله',
  ),
  buildCase(
    8,
    'یونان',
    '🇬🇷',
    'تمکن مالی (FIP)',
    'کارت اقامت تمکن مالی یونان — آتن (۲۰۱۸–۲۰۲۰)',
    'Οικονομικά Ανεξάρτητο Άτομο (Financially Independent)',
    'آتن',
    '۲۰۱۸–۲۰۲۰',
    true,
    'Αποκεντρωμένη Διοίκηση Αττικής (Athina)',
    '۸-۱۲ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_54_01_oAJWF_4e709f71.webp',
    'نوع ویزا: کارت اقامت ۲ ساله تمکن مالی یونان (Financially Independent – No Market Access)',
    'landscape',
  ),
  buildCase(
    9,
    'یونان',
    '🇬🇷',
    'تمکن مالی (FIP)',
    'کارت اقامت تمکن مالی یونان — پیرئوس (۲۰۱۸–۲۰۲۰)',
    'Οικονομικά Ανεξάρτητο Άτομο (Financially Independent)',
    'پیرئوس',
    '۲۰۱۸–۲۰۲۰',
    true,
    'Διοίκηση Πειραιώς (Piraeus)',
    '۸-۱۲ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_42_37_pry3q_bc1f0fd1.webp',
    'نوع ویزا: کارت اقامت ۲ ساله تمکن مالی یونان — پیرئوس (Financially Independent)',
    'landscape',
  ),
  buildCase(
    10,
    'یونان',
    '🇬🇷',
    'تمکن مالی (FIP)',
    'کارت اقامت تمکن مالی یونان — آتن (۲۰۱۸–۲۰۲۰)',
    'Οικονομικά Ανεξάρτητο Άτομο (Financially Independent)',
    'آتن',
    '۲۰۱۸–۲۰۲۰',
    true,
    'Αποκεντρωμένη Διοίκηση Αττικής (Athina)',
    '۸-۱۲ هفته',
    '/assets/aistudio/Photoleap_13_02_2024_00_38_36_Y9Zsy_ee795ec5.webp',
    'نوع ویزا: کارت اقامت ۲ ساله تمکن مالی یونان (Financially Independent Person)',
    'landscape',
  ),
  buildCase(
    11,
    'یونان',
    '🇬🇷',
    'تمکن مالی (FIP)',
    'کارت اقامت تمکن مالی یونان — آتن (۲۰۱۷–۲۰۲۰)',
    'Οικονομικά Ανεξάρτητο Άτομο (Financially Independent)',
    'آتن',
    '۲۰۱۷–۲۰۲۰',
    true,
    'Αποκεντρωμένη Διοίκηση Αττικής (Athina)',
    '۸-۱۲ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_47_49_IxcgV_5eb66bde.webp',
    'نوع ویزا: کارت اقامت ۳ ساله تمکن مالی یونان (Financially Independent Person)',
    'landscape',
  ),
  buildCase(
    12,
    'یونان',
    '🇬🇷',
    'ویزای ورود ملی (Type D)',
    'ویزای تمکن مالی یونان — لیبل Type D چندبار ورود (۲۰۲۰)',
    'Θεώρηση / Visa Type D – Γ.3.1 (Οικονομικά Ανεξάρτητα Άτομα)',
    'تهران / آتن',
    '۲۰۲۰',
    true,
    'سفارت یونان (تهران)',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_13_02_2024_00_20_23_NOX0m_5f416100.webp',
    'نوع ویزا: ویزای ملی تمکن مالی یونان (Type D – Γ.3.1 Financially Independent)',
    'landscape',
  ),
  buildCase(
    13,
    'یونان',
    '🇬🇷',
    'ویزای ورود ملی (Type D)',
    'ویزای پیوست خانواده یونان — لیبل Type D چندبار ورود (۲۰۲۰)',
    'Θεώρηση / Visa Type D – ΣΤ.1 (Μέλη Οικογένειας)',
    'تهران / آتن',
    '۲۰۲۰',
    true,
    'سفارت یونان (تهران)',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_13_02_2024_00_23_45_NulRM_a9d657dd.webp',
    'نوع ویزا: ویزای ملی پیوست خانواده یونان (Type D – ΣΤ.1 Family Member)',
    'landscape',
  ),
  buildCase(
    14,
    'یونان',
    '🇬🇷',
    'ویزای ورود ملی (Type D)',
    'ویزای تمکن مالی یونان — لیبل Type D چندبار ورود (۲۰۱۹)',
    'Θεώρηση / Visa Type D – Γ.3.1 (Οικονομικά Ανεξάρτητα Άτομα)',
    'تهران / آتن',
    '۲۰۱۹',
    true,
    'سفارت یونان (تهران)',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_50_52_yjnne_27908ba0.webp',
    'نوع ویزا: ویزای ملی تمکن مالی یونان (Type D – Γ.3.1 Financially Independent)',
    'landscape',
  ),
  buildCase(
    15,
    'یونان',
    '🇬🇷',
    'ویزای ورود ملی (Type D)',
    'ویزای ۶ ماهه تمکن مالی یونان — لیبل Type D چندبار ورود (۲۰۱۹)',
    'Θεώρηση / Visa Type D – Γ.3.1 (Οικονομικά Ανεξάρτητα Άτομα)',
    'تهران / آتن',
    '۲۰۱۹',
    true,
    'سفارت یونان (تهران)',
    '۴-۸ هفته',
    '/assets/aistudio/Polish_20240221_001058662_bc8244bf.webp',
    'نوع ویزا: ویزای ملی ۶ ماهه تمکن مالی یونان (Type D – Γ.3.1 MULT)',
    'landscape',
  ),
  buildCase(
    16,
    'یونان',
    '🇬🇷',
    'ویزای ورود ملی (Type D)',
    'ویزای تمکن مالی یونان — لیبل Type D سرپرست خانواده (۲۰۱۹)',
    'Θεώρηση / Visa Type D – Γ.3.1 (Οικονομικά Ανεξάρτητα Άτομα)',
    'تهران / آتن',
    '۲۰۱۹',
    true,
    'سفارت یونان (تهران)',
    '۴-۸ هفته',
    '/assets/aistudio/Polish_20240221_000712692_a4f01366.webp',
    'نوع ویزا: ویزای ملی تمکن مالی یونان (Type D – Γ.3.1 Financially Independent)',
  ),
  buildCase(
    17,
    'یونان',
    '🇬🇷',
    'ویزای ورود ملی (Type D)',
    'ویزای پیوست خانواده یونان — لیبل Type D همسر (۲۰۱۹)',
    'Θεώρηση / Visa Type D – ΣΤ.1 (Μέλη Οικογένειας)',
    'تهران / آتن',
    '۲۰۱۹',
    true,
    'سفارت یونان (تهران)',
    '۴-۸ هفته',
    '/assets/aistudio/Polish_20240221_001837200_b0741db1.webp',
    'نوع ویزا: ویزای ملی پیوست خانواده یونان (Type D – ΣΤ.1 Family Member)',
  ),
  buildCase(
    18,
    'یونان',
    '🇬🇷',
    'ویزای ورود ملی (Type D)',
    'ویزای پیوست خانواده یونان — لیبل Type D فرزند (۲۰۱۹)',
    'Θεώρηση / Visa Type D – ΣΤ.1 (Μέλη Οικογένειας)',
    'تهران / آتن',
    '۲۰۱۹',
    true,
    'سفارت یونان (تهران)',
    '۴-۸ هفته',
    '/assets/aistudio/Polish_20240221_001600278_7d8c07b5.webp',
    'نوع ویزا: ویزای ملی پیوست خانواده یونان برای فرزند (Type D – ΣΤ.1 Family Member)',
  ),
  buildCase(
    19,
    'یونان',
    '🇬🇷',
    'ویزای ورود ملی (Type D)',
    'ویزای پیوست خانواده یونان — لیبل Type D فرزند (۲۰۱۹)',
    'Θεώρηση / Visa Type D – ΣΤ.1 (Μέλη Οικογένειας)',
    'تهران / آتن',
    '۲۰۱۹',
    true,
    'سفارت یونان (تهران)',
    '۴-۸ هفته',
    '/assets/aistudio/Polish_20240221_000940890_bc00e413.webp',
    'نوع ویزا: ویزای ملی پیوست خانواده یونان برای فرزند (Type D – ΣΤ.1 Family Member)',
  ),
  buildCase(
    20,
    'یونان',
    '🇬🇷',
    'ویزای ورود ملی (Type D)',
    'ویزای پیوست خانواده یونان — لیبل Type D چندبار ورود (۲۰۱۸)',
    'Θεώρηση / Visa Type D – ΣΤ.1 (Μέλη Οικογένειας)',
    'تهران / آتن',
    '۲۰۱۸',
    true,
    'سفارت یونان (تهران)',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_01_08_03_hMO54_5272b725.webp',
    'نوع ویزا: ویزای ملی پیوست خانواده یونان (Type D – ΣΤ.1 Family Member)',
    'landscape',
  ),
  buildCase(
    21,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت ۵ ساله همراه خانواده گلدن ویزای یونان (۲۰۲۳–۲۰۲۸)',
    'Μέλος Οικογένειας (Family Member – Hellenic Residence Permit)',
    'آتن',
    '۲۰۲۳–۲۰۲۸',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Polish_20241225_230219152_6f46e16d.webp',
    'نوع ویزا: کارت اقامت ۵ ساله همراه خانواده گلدن ویزای یونان (Family Member)',
    'landscape',
  ),
  buildCase(
    22,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت ۵ ساله فرزند — همراه گلدن ویزای یونان (۲۰۲۳–۲۰۲۸)',
    'Μέλος Οικογένειας (Family Member – Hellenic Residence Permit)',
    'آتن',
    '۲۰۲۳–۲۰۲۸',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Polish_20241225_225617010_92e0469f.webp',
    'نوع ویزا: کارت اقامت ۵ ساله همراه خانواده (فرزند) گلدن ویزای یونان (Family Member)',
    'landscape',
  ),
  buildCase(
    23,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت ۵ ساله همراه خانواده سرمایه‌گذاری یونان (۲۰۲۳–۲۰۲۸)',
    'Μέλος Οικογένειας (Family Member – Hellenic Residence Permit)',
    'آتن',
    '۲۰۲۳–۲۰۲۸',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Photoleap_11_02_2024_22_39_03_o4AL4_fbf98fa9.webp',
    'نوع ویزا: کارت اقامت ۵ ساله همراه خانواده یونان (Family Member – No Market Access)',
    'landscape',
  ),
  buildCase(
    24,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت ۵ ساله همراه خانواده یونان (۲۰۲۳–۲۰۲۸)',
    'Μέλος Οικογένειας (Family Member – Hellenic Residence Permit)',
    'آتن',
    '۲۰۲۳–۲۰۲۸',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Photoleap_11_02_2024_22_40_04_PcGNM_3eb95963.webp',
    'نوع ویزا: کارت اقامت ۵ ساله همراه خانواده یونان (Family Member – No Market Access)',
    'landscape',
  ),
  buildCase(
    25,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت ۵ ساله همراه خانواده یونان (۲۰۲۳–۲۰۲۸)',
    'Μέλος Οικογένειας (Family Member – Hellenic Residence Permit)',
    'آتن',
    '۲۰۲۳–۲۰۲۸',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Photoleap_11_02_2024_22_42_44_ybnQL_0117f842.webp',
    'نوع ویزا: کارت اقامت ۵ ساله همراه خانواده یونان (Family Member – No Market Access)',
    'landscape',
  ),
  buildCase(
    26,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت ۵ ساله همراه خانواده یونان (۲۰۲۳–۲۰۲۸)',
    'Μέλος Οικογένειας (Family Member – Hellenic Residence Permit)',
    'آتن',
    '۲۰۲۳–۲۰۲۸',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Photoleap_11_02_2024_22_41_41_mL2Uv_d89c1bb4.webp',
    'نوع ویزا: کارت اقامت ۵ ساله همراه خانواده یونان (Family Member – No Market Access)',
    'landscape',
  ),
  buildCase(
    27,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت ۵ ساله همراه خانواده یونان (۲۰۲۳–۲۰۲۸)',
    'Μέλος Οικογένειας (Family Member – Hellenic Residence Permit)',
    'آتن',
    '۲۰۲۳–۲۰۲۸',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Photoleap_11_02_2024_22_37_31_88TRS_4d94d59f.webp',
    'نوع ویزا: کارت اقامت ۵ ساله همراه خانواده یونان (Family Member – No Market Access)',
    'landscape',
  ),
  buildCase(
    28,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت ۵ ساله همراه خانواده یونان (۲۰۲۳–۲۰۲۸)',
    'Μέλος Οικογένειας (Family Member – Hellenic Residence Permit)',
    'آتن',
    '۲۰۲۳–۲۰۲۸',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Photoleap_11_02_2024_22_35_00_RuKos_ee7096bf.webp',
    'نوع ویزا: کارت اقامت ۵ ساله همراه خانواده یونان (Family Member – No Market Access)',
    'landscape',
  ),
  buildCase(
    29,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت همراه خانواده فرزند — یونان (۲۰۲۲–۲۰۲۷)',
    'Μέλος Οικογένειας (Family Member – Hellenic Residence Permit)',
    'آتن',
    '۲۰۲۲–۲۰۲۷',
    true,
    'Ministry of Migration Greece',
    '۳-۵ ماه',
    '/assets/aistudio/Photoleap_11_02_2024_22_33_51_87oWT_6cf3b363.webp',
    'نوع ویزا: کارت اقامت همراه خانواده فرزند در یونان (Family Member)',
    'landscape',
  ),
  buildCase(
    30,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت همراه خانواده — یونان (۲۰۲۲–۲۰۲۴)',
    'Μέλος Οικογένειας (Family Member – Hellenic Residence Permit)',
    'آتن',
    '۲۰۲۲–۲۰۲۴',
    true,
    'Ministry of Migration Greece',
    '۸-۱۲ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_23_52_19_QSY1q_28be6ec1.webp',
    'نوع ویزا: کارت اقامت همراه خانواده یونان (Family Member – No Market Access)',
    'landscape',
  ),
  buildCase(
    31,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت همراه خانواده فرزند — یونان (۲۰۲۲–۲۰۲۴)',
    'Μέλος Οικογένειας (Family Member – Hellenic Residence Permit)',
    'آتن',
    '۲۰۲۲–۲۰۲۴',
    true,
    'Ministry of Migration Greece',
    '۸-۱۲ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_06_52_5XW3K_b54d9c81.webp',
    'نوع ویزا: کارت اقامت همراه خانواده فرزند در یونان (Family Member)',
    'landscape',
  ),
  buildCase(
    32,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت ۲ ساله همراه خانواده یونان — آتن (۲۰۱۸–۲۰۲۰)',
    'Μέλος Οικογένειας (Family Member – Residence Permit)',
    'آتن',
    '۲۰۱۸–۲۰۲۰',
    true,
    'Αποκεντρωμένη Διοίκηση Αττικής (Athina)',
    '۸-۱۲ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_01_06_54_T0LOg_dc5c4256.webp',
    'نوع ویزا: کارت اقامت ۲ ساله همراه خانواده یونان (Family Member)',
    'landscape',
  ),
  buildCase(
    33,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت همراه خانواده یونان — آتن (۲۰۱۸–۲۰۱۹)',
    'Μέλος Οικογένειας (Family Member – Residence Permit)',
    'آتن',
    '۲۰۱۸–۲۰۱۹',
    true,
    'Αποκεντρωμένη Διοίκηση Αττικής (Athina)',
    '۸-۱۲ هفته',
    '/assets/aistudio/Photoleap_13_02_2024_00_34_26_FJtBF_569d5b3b.webp',
    'نوع ویزا: کارت اقامت همراه خانواده یونان (Family Member – No Market Access)',
    'landscape',
  ),
  buildCase(
    34,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت اقامت اولیه همراه خانواده یونان — آتن (۲۰۱۸)',
    'Μέλος Οικογένειας (Family Member – Residence Permit)',
    'آتن',
    '۲۰۱۸',
    true,
    'Αποκεντρωμένη Διοίκηση Αττικής (Athina)',
    '۶-۸ هفته',
    '/assets/aistudio/Photoleap_13_02_2024_00_35_28_6YcdC_32e17cfc.webp',
    'نوع ویزا: کارت اقامت همراه خانواده یونان (Family Member)',
    'landscape',
  ),
  buildCase(
    35,
    'یونان',
    '🇬🇷',
    'کارت اقامت همراه خانواده',
    'کارت‌های اقامت همراه خانواده یونان — دو عضو خانواده (۲۰۱۷–۲۰۲۰)',
    'Μέλος Οικογένειας (Family Member – Residence Permit)',
    'آتن',
    '۲۰۱۷–۲۰۲۰',
    true,
    'Αποκεντρωμένη Διοίκηση Αττικής (Athina)',
    '۸-۱۲ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_46_35_eLyfJ_59b06b2b.webp',
    'نوع ویزا: کارت‌های اقامت همراه خانواده یونان (Family Member – دو متقاضی همزمان)',
  ),
  buildCase(
    36,
    'یونان',
    '🇬🇷',
    'اقامت کاری و حق اقامت مستقل',
    'کارت اقامت ۳ ساله کاری / حق اقامت مستقل یونان (۲۰۱۸–۲۰۲۱)',
    'Αυτοτελές Δικαίωμα Διαμονής – Εξαρτημένη Εργασία (Employment)',
    'آتن',
    '۲۰۱۸–۲۰۲۱',
    true,
    'Αποκεντρωμένη Διοίκηση Αττικής (Athina)',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_13_02_2024_00_43_13_jEE6t_beb823b9.webp',
    'نوع ویزا: کارت اقامت کاری و حق اقامت مستقل یونان (Autonomous Right of Residence – Employment)',
    'landscape',
  ),
  buildCase(
    37,
    'یونان',
    '🇬🇷',
    'برگه آبی اقامت (Blue Paper)',
    'برگه آبی اقامت خانواده شهروند یونانی با دسترسی کامل بازار کار — خالکیدیا (۲۰۲۲–۲۰۲۳)',
    'Βεβαίωση Κατάθεσης Αίτησης – Μέλος Οικογένειας Έλληνα (Άρθρο 82)',
    'خالکیدیا',
    '۲۰۲۲–۲۰۲۳',
    true,
    'Α.Δ. Θεσσαλίας – Στερεάς Ελλάδας',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_41_08_3XFcm_19517ad2.webp',
    'نوع ویزا: برگه آبی اقامت خانواده شهروند یونانی با حق کار کامل (Πλήρης Πρόσβαση – ماده ۸۲)',
  ),
  buildCase(
    38,
    'یونان',
    '🇬🇷',
    'برگه آبی اقامت (Blue Paper)',
    'برگه آبی اقامت خانواده شهروند یونانی با دسترسی کامل بازار کار — خالکیدیا (۲۰۲۲–۲۰۲۳)',
    'Βεβαίωση Κατάθεσης Αίτησης – Μέλος Οικογένειας Έλληνα (Άρθρο 82)',
    'خالکیدیا',
    '۲۰۲۲–۲۰۲۳',
    true,
    'Α.Δ. Θεσσαλίας – Στερεάς Ελλάδας',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_39_02_QawYp_52409c5f.webp',
    'نوع ویزا: برگه آبی اقامت خانواده شهروند یونانی با حق کار کامل (Πλήρης Πρόσβαση – ماده ۸۲)',
  ),
  buildCase(
    39,
    'یونان',
    '🇬🇷',
    'برگه آبی اقامت (Blue Paper)',
    'برگه آبی اقامت خانواده شهروند یونانی با دسترسی کامل بازار کار — آتن (۲۰۲۲–۲۰۲۳)',
    'Βεβαίωση Κατάθεσης Αίτησης – Μέλος Οικογένειας Έλληνα (Άρθρο 82)',
    'آتن',
    '۲۰۲۲–۲۰۲۳',
    true,
    'ΔΑΜ Κεντρικού Τομέα & Δυτικής Αττικής',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_39_39_UFK8W_0d05f085.webp',
    'نوع ویزا: برگه آبی اقامت خانواده شهروند یونانی با حق کار کامل (Πλήρης Πρόσβαση – ماده ۸۲)',
  ),
  buildCase(
    40,
    'یونان',
    '🇬🇷',
    'برگه آبی اقامت (Blue Paper)',
    'برگه آبی اقامت خانواده شهروند یونانی با دسترسی کامل بازار کار — آتن (۲۰۲۲–۲۰۲۳)',
    'Βεβαίωση Κατάθεσης Αίτησης – Μέλος Οικογένειας Έλληνα (Άρθρο 82)',
    'آتن',
    '۲۰۲۲–۲۰۲۳',
    true,
    'ΔΑΜ Κεντρικού Τομέα & Δυτικής Αττικής',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_40_31_BXkWs_02afe9e8.webp',
    'نوع ویزا: برگه آبی اقامت خانواده شهروند یونانی با حق کار کامل (Πλήρης Πρόσβαση – ماده ۸۲)',
  ),
  buildCase(
    41,
    'یونان',
    '🇬🇷',
    'برگه آبی اقامت (Blue Paper)',
    'برگه آبی اقامت خانواده شهروند یونانی با دسترسی کامل بازار کار — آتن (۲۰۲۱–۲۰۲۲)',
    'Βεβαίωση Κατάθεσης Αίτησης – Μέλος Οικογένειας Έλληνα (Άρθρο 82)',
    'آتن',
    '۲۰۲۱–۲۰۲۲',
    true,
    'ΔΑΜ Κεντρικού Τομέα & Δυτικής Αττικής',
    '۴-۸ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_39_21_1NRgA_6e23d1cd.webp',
    'نوع ویزا: برگه آبی اقامت خانواده شهروند یونانی با حق کار کامل (Πλήρης Πρόσβαση – ماده ۸۲)',
  ),
  buildCase(
    42,
    'یونان',
    '🇬🇷',
    'برگه آبی اقامت (Blue Paper)',
    'برگه آبی اقامت همراه خانواده یونان — آتن (۲۰۱۹–۲۰۲۰)',
    'Βεβαίωση Κατάθεσης Αίτησης – Μέλος Οικογένειας (Άρθρο 20Α)',
    'آتن',
    '۲۰۱۹–۲۰۲۰',
    true,
    'ΔΑΜ Αθηνών Α׳',
    '۴-۶ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_59_11_iPKn0_1ce19e2a.webp',
    'نوع ویزا: برگه آبی رسمی اقامت همراه خانواده یونان (ماده 20A قانون ۴۲۵۱/۲۰۱۴)',
  ),
  buildCase(
    43,
    'یونان',
    '🇬🇷',
    'برگه آبی اقامت (Blue Paper)',
    'برگه آبی اقامت همراه خانواده یونان — آتن (۲۰۱۹–۲۰۲۰)',
    'Βεβαίωση Κατάθεσης Αίτησης – Μέλος Οικογένειας (Άρθρο 20Α)',
    'آتن',
    '۲۰۱۹–۲۰۲۰',
    true,
    'ΔΑΜ Αθηνών Α׳',
    '۴-۶ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_58_08_bM2s3_3b00afec.webp',
    'نوع ویزا: برگه آبی رسمی اقامت همراه خانواده یونان (ماده 20A قانون ۴۲۵۱/۲۰۱۴)',
  ),
  buildCase(
    44,
    'یونان',
    '🇬🇷',
    'برگه آبی اقامت (Blue Paper)',
    'برگه آبی اقامت همراه خانواده یونان — آتن (۲۰۱۹–۲۰۲۰)',
    'Βεβαίωση Κατάθεσης Αίτησης – Μέλος Οικογένειας (Άρθρο 20Α)',
    'آتن',
    '۲۰۱۹–۲۰۲۰',
    true,
    'ΔΑΜ Αθηνών Α׳',
    '۴-۶ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_57_07_TLFib_4d549017.webp',
    'نوع ویزا: برگه آبی رسمی اقامت همراه خانواده یونان (ماده 20A قانون ۴۲۵۱/۲۰۱۴)',
  ),
  buildCase(
    45,
    'یونان',
    '🇬🇷',
    'برگه آبی اقامت (Blue Paper)',
    'برگه آبی تمدید حق اقامت مستقل (کاری) یونان — آتن (۲۰۱۸–۲۰۱۹)',
    'Βεβαίωση – Αυτοτελές Δικαίωμα Διαμονής (Εξαρτημένη Εργασία, Άρθρο 76)',
    'آتن',
    '۲۰۱۸–۲۰۱۹',
    true,
    'ΔΑΜ Αθηνών Α׳',
    '۳-۶ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_01_04_53_s8ZKC_a835f008.webp',
    'نوع ویزا: برگه آبی تمدید اقامت کاری / حق اقامت مستقل یونان (ماده ۷۶ قانون ۴۲۵۱/۲۰۱۴)',
  ),
  buildCase(
    46,
    'یونان',
    '🇬🇷',
    'ویزای شینگن (Type C)',
    'ویزای شینگن ۲ ساله مولتی یونان — ۹۰ روز اقامت (۲۰۱۹–۲۰۲۱)',
    'Schengen Visa Type C – MULT (90 Days / ΤΟΥΡΙΣΜΟΣ)',
    'تهران / شینگن',
    '۲۰۱۹–۲۰۲۱',
    true,
    'سفارت یونان (تهران)',
    '۲-۳ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_44_34_mC6Nq_5218ddb3.webp',
    'نوع ویزا: ویزای شینگن ۲ ساله چندبار ورود یونان (Type C – MULT 90 Days)',
    'landscape',
  ),
  buildCase(
    47,
    'یونان',
    '🇬🇷',
    'ویزای شینگن (Type C)',
    'ویزای شینگن توریستی یونان — لیبل Type C (۲۰۱۹)',
    'Schengen Visa Type C – ΤΟΥΡΙΣΜΟΣ',
    'تهران / شینگن',
    '۲۰۱۹',
    true,
    'سفارت یونان (تهران)',
    '۲-۳ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_51_51_zLMLz_4207c992.webp',
    'نوع ویزا: ویزای شینگن توریستی یونان (Schengen Visa Type C – ΤΟΥΡΙΣΜΟΣ)',
    'landscape',
  ),
  buildCase(
    48,
    'یونان',
    '🇬🇷',
    'ویزای شینگن (Type C)',
    'ویزای شینگن توریستی یونان — لیبل Type C (۲۰۱۹)',
    'Schengen Visa Type C – ΤΟΥΡΙΣΜΟΣ',
    'تهران / شینگن',
    '۲۰۱۹',
    true,
    'سفارت یونان (تهران)',
    '۲-۳ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_50_03_apQhP_c8edce12.webp',
    'نوع ویزا: ویزای شینگن توریستی یونان (Schengen Visa Type C – ΤΟΥΡΙΣΜΟΣ)',
    'landscape',
  ),
  buildCase(
    49,
    'یونان',
    '🇬🇷',
    'ویزای شینگن (Type C)',
    'ویزای شینگن توریستی یونان — لیبل Type C (۲۰۱۹)',
    'Schengen Visa Type C – ΤΟΥΡΙΣΜΟΣ',
    'تهران / شینگن',
    '۲۰۱۹',
    true,
    'سفارت یونان (تهران)',
    '۲-۳ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_49_11_mv5Ap_e1d15fa8.webp',
    'نوع ویزا: ویزای شینگن توریستی یونان (Schengen Visa Type C – ΤΟΥΡΙΣΜΟΣ)',
    'landscape',
  ),
  buildCase(
    50,
    'یونان',
    '🇬🇷',
    'ویزای شینگن (Type C)',
    'ویزای شینگن توریستی یونان — لیبل Type C (۲۰۱۹)',
    'Schengen Visa Type C – ΤΟΥΡΙΣΜΟΣ',
    'تهران / شینگن',
    '۲۰۱۹',
    true,
    'سفارت یونان (تهران)',
    '۲-۳ هفته',
    '/assets/aistudio/Photoleap_12_02_2024_00_52_45_RWSZC_618aa2ff.webp',
    'نوع ویزا: ویزای شینگن توریستی یونان (Schengen Visa Type C – ΤΟΥΡΙΣΜΟΣ)',
    'landscape',
  ),

  /* ---------------- 🇭🇺 مجارستان — ۱۲ نمونه واقعی ویزای ملی D و کارت اقامت ---------------- */
  buildCase(
    1,
    'مجارستان',
    '🇭🇺',
    'تحصیلی و کالج زبان',
    'ویزای ملی تایپ D دوره زبان (کالج) مجارستان — آیدا اکبری (۲۰۲۳–۲۰۲۴)',
    'Vízum / Type D – Tanulmányi (Studies)',
    'بوداپست',
    '۲۰۲۳–۲۰۲۴',
    true,
    'سفارت مجارستان تهران / OIF',
    '۴-۸ هفته',
    '/assets/aistudio/______________________________2024_7acc5b11.webp',
    'نوع ویزا: ویزای ملی تایپ D تحصیلی / دوره زبان (کالج) مجارستان — Tanulmányi',
    'landscape',
  ),
  buildCase(
    2,
    'مجارستان',
    '🇭🇺',
    'تحصیلی و کالج زبان',
    'ویزای ملی تایپ D دوره زبان (کالج) مجارستان — مرضیه (۲۰۲۳–۲۰۲۴)',
    'Vízum / Type D – Tanulmányi (Studies)',
    'بوداپست',
    '۲۰۲۳–۲۰۲۴',
    true,
    'سفارت مجارستان تهران / OIF',
    '۴-۸ هفته',
    '/assets/aistudio/______________________________2023_fd9f7b5d.webp',
    'نوع ویزا: ویزای ملی تایپ D تحصیلی / دوره زبان (کالج) مجارستان — Tanulmányi',
    'landscape',
  ),
  buildCase(
    3,
    'مجارستان',
    '🇭🇺',
    'تحصیلی و کالج زبان',
    'ویزای ملی تایپ D تحصیلی مجارستان — دریا کریمی سقزی (۲۰۲۳–۲۰۲۴)',
    'Vízum / Type D – Tanulmányi (Studies)',
    'بوداپست',
    '۲۰۲۳–۲۰۲۴',
    true,
    'سفارت مجارستان تهران / OIF',
    '۴-۸ هفته',
    '/assets/aistudio/Polish_20240221_003421863_b130f758.webp',
    'نوع ویزا: ویزای ملی تایپ D تحصیلی مجارستان — صادره در تهران (Tanulmányi)',
    'landscape',
  ),
  buildCase(
    4,
    'مجارستان',
    '🇭🇺',
    'ویزای کاری',
    'ویزای ملی تایپ D کاری مجارستان — اشتغال به کار (۲۰۲۳–۲۰۲۴)',
    'Vízum / Type D – Munkavállalás (Employment)',
    'بوداپست',
    '۲۰۲۳–۲۰۲۴',
    true,
    'سفارت مجارستان تهران / OIF',
    '۶-۱۰ هفته',
    '/assets/aistudio/2023-11-05_23.03.29_45501df8.webp',
    'نوع ویزا: ویزای ملی تایپ D کاری مجارستان — اشتغال به کار (Munkavállalás)',
    'landscape',
  ),
  buildCase(
    5,
    'مجارستان',
    '🇭🇺',
    'الحاق خانواده',
    'ویزای ملی تایپ D الحاق خانواده مجارستان — متقاضی خانم (۲۰۲۲–۲۰۲۳)',
    'Vízum / Type D – Családi együttélés / egyesítés',
    'بوداپست',
    '۲۰۲۲–۲۰۲۳',
    true,
    'سفارت مجارستان تهران / OIF',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_23_31_25_SFlvb_8bb0da85.webp',
    'نوع ویزا: ویزای ملی تایپ D مجارستان — صادره در تهران (Családi együttélés)',
    'landscape',
  ),
  buildCase(
    6,
    'مجارستان',
    '🇭🇺',
    'الحاق خانواده',
    'ویزای ملی تایپ D اقامت مجارستان — متقاضی آقا (۲۰۲۲–۲۰۲۳)',
    'Vízum / Type D – Tartózkodási vízum',
    'بوداپست',
    '۲۰۲۲–۲۰۲۳',
    true,
    'سفارت مجارستان تهران / OIF',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_23_32_53_yyseX_1982fe34.webp',
    'نوع ویزا: ویزای ملی تایپ D مجارستان — صادره در تهران با اعتبار ورود برای دریافت کارت اقامت',
    'landscape',
  ),
  buildCase(
    7,
    'مجارستان',
    '🇭🇺',
    'تحصیلی و کالج زبان',
    'ویزای ملی تایپ D تحصیلی مجارستان — سعید (۲۰۱۸–۲۰۱۹)',
    'Vízum / Type D – Tanulmányi / Studies',
    'بوداپست',
    '۲۰۱۸–۲۰۱۹',
    true,
    'سفارت مجارستان تهران / OIF',
    '۴-۸ هفته',
    '/assets/aistudio/Polish_20240221_003222921_58eb8e94.webp',
    'نوع ویزا: ویزای ملی تایپ D تحصیلی مجارستان — Tanulmányi / Studies',
    'landscape',
  ),
  buildCase(
    8,
    'مجارستان',
    '🇭🇺',
    'تحصیلی و کالج زبان',
    'کارت اقامت بیومتریک دانشجویی مجارستان — صادره از بوداپست (۲۰۱۹–۲۰۲۰)',
    'Tartózkodási Engedély – Tanulmányi / Studies',
    'بوداپست',
    '۲۰۱۹–۲۰۲۰',
    true,
    'OIF Budapest',
    '۴-۶ هفته',
    '/assets/aistudio/Polish_20240221_003306620_9636b9ae.webp',
    'نوع کارت: کارت اقامت بیومتریک دانشجویی مجارستان — Tartózkodási engedély (Tanulmányi)',
    'landscape',
  ),
  buildCase(
    9,
    'مجارستان',
    '🇭🇺',
    'الحاق خانواده',
    'کارت اقامت بیومتریک الحاق خانواده مجارستان — فرزند متولد ۲۰۲۰ (تا ۲۰۲۴)',
    'Tartózkodási Engedély – Családi együttélés',
    'بوداپست',
    '۲۰۲۴',
    true,
    'OIF Hungary',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_22_45_46_A7OdN_22b0c329.webp',
    'نوع کارت: کارت اقامت بیومتریک الحاق خانواده مجارستان — Családi együttélés (Family Reunification)',
    'landscape',
  ),
  buildCase(
    10,
    'مجارستان',
    '🇭🇺',
    'الحاق خانواده',
    'کارت اقامت بیومتریک الحاق خانواده مجارستان — فرزند متولد ۲۰۱۴ (تا ۲۰۲۶)',
    'Tartózkodási Engedély – Családi együttélés',
    'بوداپست',
    '۲۰۲۶',
    true,
    'OIF Hungary',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_22_46_32_MfDxM_53759c89.webp',
    'نوع کارت: کارت اقامت بیومتریک الحاق خانواده مجارستان — Családi együttélés (اعتبار تا ۲۰۲۶)',
    'landscape',
  ),
  buildCase(
    11,
    'مجارستان',
    '🇭🇺',
    'الحاق خانواده',
    'کارت اقامت بیومتریک الحاق خانواده مجارستان — والدین متولد ۱۹۴۲ (تا ۲۰۲۶)',
    'Tartózkodási Engedély – Családi együttélés',
    'بوداپست',
    '۲۰۲۶',
    true,
    'OIF Hungary',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_22_56_13_qwum9_4ea12a06.webp',
    'نوع کارت: کارت اقامت بیومتریک الحاق خانواده مجارستان — Családi együttélés (اعتبار تا ۲۰۲۶)',
    'landscape',
  ),
  buildCase(
    12,
    'مجارستان',
    '🇭🇺',
    'الحاق خانواده',
    'کارت اقامت بیومتریک الحاق خانواده مجارستان — والدین متولد ۱۹۵۲ (تا ۲۰۲۶)',
    'Tartózkodási Engedély – Családi együttélés',
    'بوداپست',
    '۲۰۲۶',
    true,
    'OIF Hungary',
    '۶-۱۰ هفته',
    '/assets/aistudio/Photoleap_11_02_2024_22_57_15_QhjsS_c0be4b72.webp',
    'نوع کارت: کارت اقامت بیومتریک الحاق خانواده مجارستان — Családi együttélés (اعتبار تا ۲۰۲۶)',
    'landscape',
  ),

  /* ---------------- 🇩🇲 دومینیکا — ۸ نمونه واقعی پاسپورت و گواهی شهروندی ---------------- */
  buildCase(
    1,
    'دومینیکا',
    '🇩🇲',
    'شهروندی با سرمایه‌گذاری (CBI)',
    'پاسپورت بیومتریک شهروندی دومینیکا — متقاضی متولد ایران (۲۰۲۳–۲۰۳۳)',
    'Commonwealth of Dominica Passport (Type P – DMA)',
    'روسو (Roseau)',
    '۲۰۲۳–۲۰۳۳',
    false,
    'CBI Unit Dominica',
    '۴-۶ ماه',
    '/assets/aistudio/dominica02_e599f9c7.webp',
    'نوع مدرک: پاسپورت ۱۰ ساله شهروندی دومینیکا — صادره از روسو (Commonwealth of Dominica Passport)',
    'landscape',
  ),
  buildCase(
    2,
    'دومینیکا',
    '🇩🇲',
    'شهروندی با سرمایه‌گذاری (CBI)',
    'پاسپورت بیومتریک شهروندی دومینیکا — متقاضی متولد ایران (۲۰۲۲–۲۰۳۲)',
    'Commonwealth of Dominica Passport (Type P – DMA)',
    'روسو (Roseau)',
    '۲۰۲۲–۲۰۳۲',
    false,
    'CBI Unit Dominica',
    '۴-۶ ماه',
    '/assets/aistudio/2023-12-27_01-30-59_7b6ccd39.webp',
    'نوع مدرک: پاسپورت ۱۰ ساله شهروندی دومینیکا — صادره از روسو (Commonwealth of Dominica Passport)',
    'landscape',
  ),
  buildCase(
    3,
    'دومینیکا',
    '🇩🇲',
    'شهروندی با سرمایه‌گذاری (CBI)',
    'پاسپورت بیومتریک شهروندی دومینیکا — متولد ۱۹۷۳ ایران (۲۰۲۲–۲۰۳۲)',
    'Commonwealth of Dominica Passport (Type P – DMA)',
    'روسو (Roseau)',
    '۲۰۲۲–۲۰۳۲',
    false,
    'CBI Unit Dominica',
    '۴-۶ ماه',
    '/assets/aistudio/___________________________6__716a8216.webp',
    'نوع مدرک: پاسپورت ۱۰ ساله شهروندی دومینیکا — صادره از روسو (Commonwealth of Dominica Passport)',
  ),
  buildCase(
    4,
    'دومینیکا',
    '🇩🇲',
    'شهروندی با سرمایه‌گذاری (CBI)',
    'پاسپورت بیومتریک شهروندی دومینیکا — متقاضی متولد افغانستان (۲۰۲۲–۲۰۳۲)',
    'Commonwealth of Dominica Passport (Type P – DMA)',
    'روسو (Roseau)',
    '۲۰۲۲–۲۰۳۲',
    false,
    'CBI Unit Dominica',
    '۴-۶ ماه',
    '/assets/aistudio/dominica08_97549e6b.webp',
    'نوع مدرک: پاسپورت ۱۰ ساله شهروندی دومینیکا — صادره از روسو (Commonwealth of Dominica Passport)',
    'landscape',
  ),
  buildCase(
    5,
    'دومینیکا',
    '🇩🇲',
    'شهروندی با سرمایه‌گذاری (CBI)',
    'پاسپورت بیومتریک شهروندی دومینیکا — متقاضی متولد ایران (۲۰۲۱–۲۰۳۱)',
    'Commonwealth of Dominica Passport (Type P – DMA)',
    'روسو (Roseau)',
    '۲۰۲۱–۲۰۳۱',
    false,
    'CBI Unit Dominica',
    '۴-۶ ماه',
    '/assets/aistudio/dominica10_c43686f6.webp',
    'نوع مدرک: پاسپورت ۱۰ ساله شهروندی دومینیکا — صادره از روسو (Commonwealth of Dominica Passport)',
    'landscape',
  ),
  buildCase(
    6,
    'دومینیکا',
    '🇩🇲',
    'شهروندی با سرمایه‌گذاری (CBI)',
    'پاسپورت شهروندی دومینیکا — متقاضی متولد ۱۹۸۴ عراق (۲۰۲۰–۲۰۳۰)',
    'Commonwealth of Dominica Passport (Type P – DMA)',
    'روسو (Roseau)',
    '۲۰۲۰–۲۰۳۰',
    false,
    'CBI Unit Dominica',
    '۴-۶ ماه',
    '/assets/aistudio/___________________________5__1651db4b.webp',
    'نوع مدرک: پاسپورت ۱۰ ساله شهروندی دومینیکا — صادره از روسو (Commonwealth of Dominica Passport)',
  ),
  buildCase(
    7,
    'دومینیکا',
    '🇩🇲',
    'پکیج و گواهی شهروندی',
    'پکیج کامل شهروندی خانواده — ۳ پاسپورت و گواهی تابعیت دومینیکا (۲۰۲۱)',
    'Citizenship Package & Certificates of Naturalisation',
    'روسو (Roseau)',
    '۲۰۲۱',
    false,
    'CBI Unit Dominica',
    '۴-۶ ماه',
    '/assets/aistudio/___________________________8__32c818a3.webp',
    'نوع مدرک: پکیج شهروندی دومینیکا شامل ۳ جلد پاسپورت و گواهی اعطای تابعیت (Naturalisation)',
  ),
  buildCase(
    8,
    'دومینیکا',
    '🇩🇲',
    'پکیج و گواهی شهروندی',
    'گواهی رسمی اعطای تابعیت (Naturalisation) و پاسپورت دومینیکا (۲۰۲۰)',
    'Certificate of Naturalisation & Dominica Passport',
    'روسو (Roseau)',
    '۲۰۲۰',
    false,
    'Ministry of Finance – CBI Unit',
    '۴-۶ ماه',
    '/assets/aistudio/___________________________7__dc921e11.webp',
    'نوع مدرک: گواهی رسمی اعطای تابعیت (Certificate of Naturalisation) و پاسپورت دومینیکا',
  ),
];

/* ============================================================
   6. Schema.org
   ============================================================ */
const generateStructuredData = (cases: EnhancedVisaCase[]) => {
  const byCountry = cases.reduce<Record<string, EnhancedVisaCase[]>>((acc, c) => {
    (acc[c.country] ||= []).push(c);
    return acc;
  }, {});
  const visualCases = cases.filter((c) => Boolean(c.image));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.dia-co.ir/#organization',
        name: 'هلدینگ مهاجرتی دیاکو',
        url: 'https://www.dia-co.ir',
        knowsAbout: ['Immigration Law', 'RWR Card', 'EU Blue Card', 'Golden Visa', 'Citizenship by Investment'],
        areaServed: ['AT', 'DE', 'ES', 'SK', 'FR', 'NL', 'GR', 'HU', 'DM'],
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
        '@type': 'ImageGallery',
        name: 'آرشیو تصاویر ویزاها، کارت‌های اقامت و پاسپورت‌های صادره دیاکو',
        numberOfItems: visualCases.length,
        associatedMedia: visualCases.map((c) => ({
          '@type': 'ImageObject',
          name: c.title,
          caption: c.visaCaption || `${c.country} — ${c.method} (${c.type})`,
          contentUrl: c.image,
          encodingFormat: 'image/webp',
          keywords: c.tags.join(', '),
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
   7. کامپوننت اصلی (اسلایدر اتوماتیک بهینه برای صفحه اصلی)
   ============================================================ */
export const VisaSuccessSection: React.FC = () => {
  /* ---------- ادغام پرونده‌های تصویری و پرونده‌های آرشیو ---------- */
  const allCases = useMemo<EnhancedVisaCase[]>(() => {
    const legacy: EnhancedVisaCase[] = VISA_SUCCESS_CASES
      .filter((c) => COUNTRY_META[c.country])
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
    return [...NEW_CASES, ...legacy];
  }, []);

  const countries = useMemo(
    () => PRIORITY_COUNTRIES.filter((c) => COUNTRY_META[c]),
    [],
  );

  const [activeCountry, setActiveCountry] = useState<string>(countries[0]);
  const [activeMethod, setActiveMethod] = useState<string>('همه');
  const [selectedCase, setSelectedCase] = useState<EnhancedVisaCase | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [isSliderManuallyPaused, setIsSliderManuallyPaused] = useState<boolean>(false);
  const [isSliderHovered, setIsSliderHovered] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(() => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 640) return 2;
    return 1;
  });

  const sectionId = useId();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onMqChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onMqChange);

    const updatePerPage = () => {
      const next = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1;
      setPerPage(next);
    };
    updatePerPage();
    window.addEventListener('resize', updatePerPage);

    return () => {
      mq.removeEventListener('change', onMqChange);
      window.removeEventListener('resize', updatePerPage);
    };
  }, []);

  const methodsForCountry = useMemo(() => {
    const set = new Set<string>();
    allCases
      .filter((c) => c.country === activeCountry)
      .forEach((c) => set.add(c.method));
    return ['همه', ...Array.from(set)];
  }, [activeCountry, allCases]);

  const filtered = useMemo(() => {
    let result = allCases.filter((c) => c.country === activeCountry);
    if (activeMethod !== 'همه') result = result.filter((c) => c.method === activeMethod);
    return result;
  }, [activeCountry, activeMethod, allCases]);

  const totalSlides = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / perPage)),
    [filtered.length, perPage],
  );

  useEffect(() => {
    setSlideIndex(0);
  }, [activeCountry, activeMethod]);

  useEffect(() => {
    setSlideIndex((prev) => (prev >= totalSlides ? Math.max(0, totalSlides - 1) : prev));
  }, [totalSlides]);

  const isAutoPlaying =
    !isSliderManuallyPaused &&
    !isSliderHovered &&
    !prefersReducedMotion &&
    selectedCase === null &&
    totalSlides > 1;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, totalSlides]);

  const visibleCases = useMemo(() => {
    const start = slideIndex * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, slideIndex, perPage]);

  const handleNextSlide = useCallback(() => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrevSlide = useCallback(() => {
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const selectedIndexInFiltered = useMemo(() => {
    if (!selectedCase) return -1;
    return filtered.findIndex((c) => c.id === selectedCase.id);
  }, [filtered, selectedCase]);

  const jsonLd = useMemo(() => generateStructuredData(allCases), [allCases]);

  const handleCountryChange = (country: string) => {
    setActiveCountry(country);
    setActiveMethod('همه');
  };

  const getCountryCount = (key: string) =>
    allCases.filter((c) => c.country === key).length.toLocaleString('fa-IR');

  return (
    <section
      id="success"
      dir="rtl"
      className="relative overflow-hidden bg-[#07242e] py-10 sm:py-14 border-t border-white/10"
      aria-labelledby={`${sectionId}-title`}
    >
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Background glows */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-[#f5a623]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-[#0e7490]/10 blur-[130px]" />

      <div className="relative container mx-auto px-4 md:px-8">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-2xl md:p-8 backdrop-blur-xl">

          {/* ===== Header ===== */}
          <div className="flex flex-col items-center text-center">
            <p className="text-[11px] font-bold tracking-wide text-amber-300">
              {allCases.length.toLocaleString('fa-IR')} پرونده موفق در {countries.length.toLocaleString('fa-IR')} کشور · تمامی تصاویر بهینه با فرمت WebP
            </p>
            <h2 id={`${sectionId}-title`} className="mt-2 text-xl font-black leading-tight text-white sm:text-3xl">
              نمونه ویزاها و کارت‌های اقامت موفق دیاکو در {countries.length.toLocaleString('fa-IR')} کشور
            </h2>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-300 sm:text-sm">
              کشور و مسیر مهاجرتی مورد نظر را انتخاب کنید؛ اسلایدر هوشمند به‌صورت خودکار نمونه‌های تاییدشده را نمایش می‌دهد.
            </p>
          </div>

          {/* ===== Country Tabs ===== */}
          <div className="mt-5" role="tablist" aria-label="فیلتر کشور">
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3.5">
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
                    className={`group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'border-[#f5a623] bg-[#f5a623] text-[#082833] font-black ring-1 ring-[#f5a623]/30'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-base leading-none">{meta.flag}</span>
                    <span>{key}</span>
                    <span
                      className={`text-[10px] font-semibold tabular-nums ${
                        active ? 'text-[#082833]/80' : 'text-slate-400'
                      }`}
                    >
                      ({getCountryCount(key)})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== Method Sub-Filter + Country Official Authority Row ===== */}
          <div className="mt-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            {methodsForCountry.length > 1 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 ml-1 whitespace-nowrap">
                  مسیر مهاجرتی در {activeCountry}:
                </span>
                {methodsForCountry.map((m) => {
                  const active = m === activeMethod;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setActiveMethod(m)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#0e7490] text-white'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {m === 'همه' ? 'همه مسیرها' : m}
                    </button>
                  );
                })}
              </div>
            )}

            {COUNTRY_META[activeCountry] && (
              <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 shrink-0 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Landmark className="h-3.5 w-3.5 text-[#0e7490]" />
                  <span>مرجع صدور:</span>
                  <span className="font-bold text-white">{COUNTRY_META[activeCountry].officialOrg}</span>
                </div>
                <a
                  href={COUNTRY_META[activeCountry].officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-300 hover:text-amber-300 transition whitespace-nowrap"
                >
                  وب‌سایت رسمی
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* ===== Automatic Slider Showcase ===== */}
          <div
            className="mt-5"
            role="region"
            aria-roledescription="اسلایدر اتوماتیک نمونه ویزاها"
            aria-label={`اسلایدر نمونه ویزاهای ${activeCountry}`}
            onMouseEnter={() => setIsSliderHovered(true)}
            onMouseLeave={() => setIsSliderHovered(false)}
            onFocusCapture={() => setIsSliderHovered(true)}
            onBlurCapture={() => setIsSliderHovered(false)}
          >
            {/* Slider Toolbar */}
            <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="font-bold text-white">{activeCountry}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums text-amber-300 font-semibold">
                  اسلاید {(slideIndex + 1).toLocaleString('fa-IR')} از {totalSlides.toLocaleString('fa-IR')}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums text-slate-400">
                  {filtered.length.toLocaleString('fa-IR')} نمونه
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {totalSlides > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsSliderManuallyPaused((p) => !p)}
                      aria-label={isSliderManuallyPaused ? 'شروع حرکت خودکار اسلایدر' : 'توقف حرکت خودکار اسلایدر'}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/35 bg-amber-400/10 px-3 py-1.5 text-[11px] font-bold text-amber-200 transition hover:bg-amber-400 hover:text-[#082833] cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {isSliderManuallyPaused ? (
                        <>
                          <Play className="h-3.5 w-3.5" />
                          <span>پخش خودکار</span>
                        </>
                      ) : (
                        <>
                          <Pause className="h-3.5 w-3.5" />
                          <span>توقف اسلایدر</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      aria-label="اسلاید قبلی"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:border-[#f5a623] hover:bg-[#f5a623] hover:text-[#082833] cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextSlide}
                      aria-label="اسلاید بعدی"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:border-[#f5a623] hover:bg-[#f5a623] hover:text-[#082833] cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Active Slide Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {visibleCases.map((item) => {
                const isImgFailed = Boolean(failedImages[item.id]);
                return (
                  <article
                    key={item.id}
                    itemScope
                    itemType="https://schema.org/ImageObject"
                    onClick={() => setSelectedCase(item)}
                    className="group relative cursor-pointer"
                  >
                    <meta itemProp="name" content={item.title} />
                    <meta itemProp="caption" content={item.visaCaption || `${item.country} — ${item.method}`} />
                    <meta itemProp="encodingFormat" content="image/webp" />
                    <meta itemProp="keywords" content={item.tags.join(', ')} />

                    <div className="pointer-events-none absolute -inset-px rounded-[22px] bg-gradient-to-br from-[#f5a623]/70 via-[#f5a623]/10 to-[#0e7490]/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#08222b] transition-transform duration-300 group-hover:-translate-y-1 shadow-lg">
                      {item.image && !isImgFailed ? (
                        <figure className="flex flex-1 flex-col">
                          <div className="relative aspect-[4/3] overflow-hidden bg-[#06181f]">
                            <img
                              itemProp="contentUrl"
                              src={item.image}
                              alt={`${item.visaCaption || item.title} — ${item.tags.slice(0, 3).join('، ')}`}
                              title={`${item.title} | ${item.tags.join(' · ')}`}
                              width={960}
                              height={item.imageAspect === 'landscape' ? 640 : 960}
                              data-tags={item.tags.join(', ')}
                              loading="lazy"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              onError={() => setFailedImages((prev) => ({ ...prev, [item.id]: true }))}
                              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                            <div className="pointer-events-none absolute top-2 left-2 flex items-center gap-1 rounded-lg bg-black/75 px-2 py-1 text-[10px] font-bold text-amber-300 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                              <ZoomIn className="h-3 w-3" />
                              <span>بزرگ‌نمایی</span>
                            </div>
                          </div>

                          <figcaption className="flex flex-1 flex-col justify-between border-t border-white/10 bg-[#08222b] p-3">
                            <div>
                              <div className="mb-1.5 flex items-center justify-between gap-2 text-[10px]">
                                <span className="font-bold text-amber-300 truncate">
                                  {item.method}
                                </span>
                                <span className="shrink-0 font-semibold text-slate-400 tabular-nums">
                                  {item.year}
                                </span>
                              </div>
                              <p className="text-xs font-bold leading-5 text-white group-hover:text-amber-300 line-clamp-2">
                                {item.visaCaption || item.title}
                              </p>
                              <p className="mt-1 text-[10px] font-medium text-cyan-300/90 truncate" dir="ltr">
                                {item.type}
                              </p>
                              <p className="mt-1.5 text-[10px] text-slate-400 line-clamp-1">
                                {item.tags.slice(0, 3).join(' · ')}
                              </p>
                            </div>

                            <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 text-[10px]">
                              <span className="truncate text-slate-400">
                                {item.flag} {item.issuanceAuthority}
                              </span>
                              <span className="flex shrink-0 items-center gap-0.5 font-bold text-[#f5a623] group-hover:underline">
                                مشاهده سند <ExternalLink className="h-2.5 w-2.5" />
                              </span>
                            </div>
                          </figcaption>
                        </figure>
                      ) : (
                        <>
                          <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                            {COUNTRY_META[item.country]?.image && !isImgFailed ? (
                              <img
                                itemProp="contentUrl"
                                src={COUNTRY_META[item.country].image}
                                alt={`نمونه ویزای ${item.country} - ${item.title} (${item.type})`}
                                title={`${item.title} | ${item.tags.join(' · ')}`}
                                width={600}
                                height={450}
                                data-tags={item.tags.join(', ')}
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                                onError={() => setFailedImages((prev) => ({ ...prev, [item.id]: true }))}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0a2f3d] via-[#07212b] to-[#0c3949] p-4 text-center">
                                <span className="text-2xl">{item.flag}</span>
                                <span className="mt-1.5 text-xs font-black text-amber-300">{item.country}</span>
                                <span className="mt-1 text-[10px] text-slate-300 line-clamp-2">{item.method}</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                            <div className="absolute bottom-2.5 right-3 left-3 flex items-end justify-between text-[10px]">
                              <span className="font-mono font-bold text-amber-300" dir="ltr">
                                {item.caseReference}
                              </span>
                              <span className="font-bold text-white tabular-nums">{item.year}</span>
                            </div>
                          </div>

                          <div className="flex flex-1 flex-col justify-between border-t border-white/10 bg-[#08222b] p-3">
                            <div>
                              <div className="mb-1 flex items-center justify-between gap-2 text-[10px]">
                                <span className="font-bold text-amber-300 truncate">{item.method}</span>
                                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold shrink-0">
                                  <CheckCircle2 className="h-3 w-3" />
                                  تأییدشده
                                </span>
                              </div>
                              <h3 className="truncate text-xs font-bold text-white group-hover:text-amber-300">
                                {item.title}
                              </h3>
                              <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                                <UserCheck className="h-3 w-3 text-emerald-400 shrink-0" />
                                <span className="truncate">
                                  {item.legalReviewer.split(' ')[0]} {item.legalReviewer.split(' ')[1]}
                                </span>
                              </p>
                              <p className="mt-1.5 text-[10px] text-slate-400 line-clamp-1">
                                {item.tags.slice(0, 3).join(' · ')}
                              </p>
                            </div>
                            <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 text-[10px]">
                              <span className="truncate text-slate-400">{item.issuanceAuthority}</span>
                              <span className="flex shrink-0 items-center gap-0.5 font-bold text-[#f5a623] group-hover:underline">
                                جزئیات <ExternalLink className="h-2.5 w-2.5" />
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Slide Pagination Indicators */}
            {totalSlides > 1 && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5" role="tablist" aria-label="صفحات اسلایدر">
                {Array.from({ length: totalSlides }).map((_, idx) => {
                  const isCurrent = idx === slideIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      aria-label={`اسلاید ${(idx + 1).toLocaleString('fa-IR')}`}
                      onClick={() => setSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        isCurrent
                          ? 'w-7 bg-[#f5a623]'
                          : 'w-2.5 bg-white/20 hover:bg-white/45'
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* ===== Country Stats ===== */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 text-center shadow-2xs">
              <p className="text-base sm:text-lg font-black text-amber-400 tabular-nums">
                {filtered.length.toLocaleString('fa-IR')}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">پرونده در {activeCountry}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 text-center shadow-2xs">
              <p className="text-base sm:text-lg font-black text-emerald-400 tabular-nums">
                {(methodsForCountry.length - 1).toLocaleString('fa-IR')}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">مسیر مهاجرتی</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 text-center shadow-2xs">
              <p className="text-base sm:text-lg font-black text-cyan-400 tabular-nums">
                {new Set(filtered.map((c) => c.year)).size.toLocaleString('fa-IR')}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">بازه سال صدور</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 text-center">
              <p className="text-base sm:text-lg font-black text-white tabular-nums">۹۸.۴٪</p>
              <p className="text-[10px] text-slate-400 mt-0.5">نرخ موفقیت</p>
            </div>
          </div>

          {/* ===== YMYL Disclaimer ===== */}
          <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-500/5 p-3.5">
            <div className="flex items-start gap-3">
              <Scale className="h-4 w-4 text-amber-400 shrink-0 mt-1" />
              <div className="text-[11px] text-amber-200/90 leading-6">
                <p className="font-bold text-amber-300">
                  سلب مسئولیت حقوقی (YMYL Compliance) —{' '}
                  <span className="font-normal text-amber-200/90">
                    اطلاعات این بخش جهت نمایش سوابق پرونده‌هاست و جایگزین مشاوره حقوقی رسمی نیست؛ تصمیم نهایی بر عهده مراجع ذیصلاح (MA35، BAMF، IND، Préfecture، Ministry of Migration یونان، OIF مجارستان، CBI Unit دومینیکا) است. بازبینان حقوقی: {REVIEWER_EU} و {REVIEWER_DM} · آخرین بازبینی: ۲۰۲۶-۱۰-۲۵
                  </span>
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
                className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-white hover:bg-white/20 cursor-pointer shrink-0"
                aria-label="بستن"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-3 text-xs leading-6 text-slate-300">
              {selectedCase.image && (
                <figure className="overflow-hidden rounded-2xl border border-white/15 bg-[#06181f]">
                  <img
                    src={selectedCase.image}
                    alt={selectedCase.visaCaption || selectedCase.title}
                    title={`${selectedCase.title} | ${selectedCase.tags.join(' · ')}`}
                    data-tags={selectedCase.tags.join(', ')}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="mx-auto max-h-[52vh] w-full object-contain"
                  />
                  <figcaption className="border-t border-white/10 bg-white/[0.04] px-4 py-2.5 text-center text-xs font-bold text-amber-300">
                    {selectedCase.visaCaption || `${selectedCase.method} — ${selectedCase.type}`}
                  </figcaption>
                </figure>
              )}

              <p className="text-[11px] text-slate-400">
                <span className="font-semibold text-amber-300/90">تگ‌های تخصصی تصویر: </span>
                {selectedCase.tags.join(' · ')}
              </p>

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

            <div className="mt-6 flex items-center justify-between gap-2">
              {filtered.length > 1 && selectedIndexInFiltered >= 0 ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const prevIdx = (selectedIndexInFiltered - 1 + filtered.length) % filtered.length;
                      setSelectedCase(filtered[prevIdx]);
                    }}
                    className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-bold text-white hover:border-[#f5a623] hover:text-amber-300 cursor-pointer whitespace-nowrap"
                  >
                    → قبلی
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const nextIdx = (selectedIndexInFiltered + 1) % filtered.length;
                      setSelectedCase(filtered[nextIdx]);
                    }}
                    className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-bold text-white hover:border-[#f5a623] hover:text-amber-300 cursor-pointer whitespace-nowrap"
                  >
                    بعدی ←
                  </button>
                </div>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="rounded-xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-5 py-2.5 text-xs font-black text-[#082833] cursor-pointer whitespace-nowrap"
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