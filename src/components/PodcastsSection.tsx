import React, { useState, useMemo, useEffect, useRef, useCallback, useId } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Headphones, Clock,
  Calendar, User, ChevronRight, Search, Sparkles,
  Radio, ExternalLink, ListMusic, Filter, CheckCircle2,
} from 'lucide-react';

/* ============================================================
   1. Types
   ============================================================ */
interface PodcastEpisode {
  id: number;
  episodeNumber: string;
  title: string;
  subtitle: string;
  speaker: string;
  speakerCredentials: string;
  duration: string;
  date: string;
  isoDate: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  highlights: string[];
  cover: { src: string; alt: string; width: number; height: number };
}

const AUTOPLAY_INTERVAL = 8000;

/* ============================================================
   2. Categories
   ============================================================ */
const CATEGORIES = [
  { id: 'all', label: 'همه' },
  { id: 'austria', label: 'اتریش' },
  { id: 'germany', label: 'آلمان' },
  { id: 'netherlands', label: 'هلند' },
  { id: 'spain', label: 'اسپانیا' },
  { id: 'greece', label: 'یونان' },
  { id: 'france', label: 'فرانسه' },
  { id: 'uk', label: 'انگلستان' },
  { id: 'hungary', label: 'مجارستان' },
  { id: 'dominica', label: 'دومینیکا' },
];

/* ============================================================
   3. Episodes (۳۳ اپیزود)
   ============================================================ */
const IMG = {
  austria: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
  germany: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
  netherlands: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
  spain: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
  greece: 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80',
  france: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  uk: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
  hungary: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=80',
  dominica: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80',
  general: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
};

const PODCAST_EPISODES: PodcastEpisode[] = [
  { id: 1, episodeNumber: 'اپیزود ۱', title: 'راهنمای جامع اقامت تمکن مالی اتریش و سهمیه‌های سالانه', subtitle: 'مبالغ مسدودی، شرایط بدون اجازه کار، نحوه اخذ وقت در اولین روز سال و تمدید اقامت', speaker: 'تیم حقوقی دیاکو', speakerCredentials: 'وکلای مقیم وین', duration: '۱۸ دقیقه', date: '۲۰ دی ۱۴۰۳', isoDate: '2025-01-10', category: 'austria', categoryLabel: 'اتریش', tags: ['Quotenkontingent', 'NAG §44', 'MA35'], highlights: ['حداقل مبلغ مسدودی ۲۰۲۶: €۲,۶۱۶.۷۸ (مجرد)', 'مهلت تخصیص سهمیه هر ایالت چقدر است؟', 'چرا تأخیر یک روزه می‌تواند کل پرونده را از بین ببرد؟'], cover: { src: IMG.austria, alt: 'اقامت تمکن مالی اتریش — وین', width: 1200, height: 675 } },
  { id: 2, episodeNumber: 'اپیزود ۲', title: 'کارت قرمز-سفید-قرمز اتریش و کارت آبی آلمان', subtitle: 'جدول امتیازبندی، تفاوت جاب آفر و جاب سیکر، کف حقوق مصوب ۲۰۲۶', speaker: 'دکتر کاوه صبوری', speakerCredentials: 'مشاور ارشد مهاجرت کاری', duration: '۲۲ دقیقه', date: '۲۵ بهمن ۱۴۰۳', isoDate: '2025-02-14', category: 'germany', categoryLabel: 'آلمان', tags: ['Blue Card', 'RWR Card', 'Chancenkarte'], highlights: ['تفاوت €۴۸,۳۰۰ و €۴۳,۷۵۹.۸۰ در بلوکارت', 'چرا ۶ امتیاز کافی نیست؟', 'مسیر IT بدون مدرک در آلمان'], cover: { src: IMG.germany, alt: 'کارت قرمز-سفید-قرمز اتریش و بلوکارت آلمان', width: 1200, height: 675 } },
  { id: 3, episodeNumber: 'اپیزود ۳', title: 'نکات طلایی مصاحبه سفارت، تأیید مدارک و پیشگیری از ریجکتی', subtitle: 'الزامات دادگستری، لگالایز کنسولی، معادل‌سازی ZAB و فنون پاسخگویی', speaker: 'دکتر آریا بهرامی', speakerCredentials: 'وکیل پایه یک اتریش', duration: '۱۵ دقیقه', date: '۱۵ اسفند ۱۴۰۳', isoDate: '2025-03-01', category: 'austria', categoryLabel: 'اتریش', tags: ['Visa Interview', 'ZAB', 'Legalisation'], highlights: ['۵ دلیل پنهان رد ویزا', 'چطور پاسخ‌های مصاحبه را آماده کنیم؟', 'ترتیب صحیح تأییدات'], cover: { src: IMG.general, alt: 'مصاحبه سفارت و پیشگیری از ریجکتی', width: 1200, height: 675 } },
  { id: 4, episodeNumber: 'اپیزود ۴', title: 'تحصیل و فاندیشن در هلند: مسیر ۲۰ روزه UGE', subtitle: 'هزینه‌های واقعی، تمکن IND €۱,۱۳۰.۷۷، کار دانشجویی ۱۶ ساعت و Zoekjaar', speaker: 'مهندس سارا رادمنش', speakerCredentials: 'سرپرست پذیرش تحصیلی اروپا', duration: '۲۰ دقیقه', date: '۲۰ فروردین ۱۴۰۴', isoDate: '2025-04-09', category: 'netherlands', categoryLabel: 'هلند', tags: ['Studiefinanciering', 'Zoekjaar', 'IND'], highlights: ['تفاوت €۱۲,۰۰۰ و €۱۳,۵۶۹ در تمکن', 'چرا «پرواز به هلند و اقدام» ممکن نیست؟', 'مسیر فارغ‌التحصیلان تا HSM'], cover: { src: IMG.netherlands, alt: 'تحصیل و فاندیشن هلند — آمستردام', width: 1200, height: 675 } },
  { id: 5, episodeNumber: 'اپیزود ۵', title: 'کارت شانس آلمان: تله‌های پنهان ۶ امتیاز', subtitle: 'ZAB، Sperrkonto €۱۳,۰۹۲ و مدرک زبان — چرا حتی ۷ امتیازی‌ها رد می‌شوند', speaker: 'دکتر کاوه صبوری', speakerCredentials: 'کارشناس ZAB', duration: '۱۹ دقیقه', date: '۵ اردیبهشت ۱۴۰۴', isoDate: '2025-04-25', category: 'germany', categoryLabel: 'آلمان', tags: ['Chancenkarte', 'ZAB', 'Sperrkonto'], highlights: ['چرا مدرک بدون ZAB = ۰ امتیاز', 'چگونه Sperrkonto را پوشش دهیم؟', 'تفاوت Chancenkarte با Jobseeker'], cover: { src: IMG.germany, alt: 'کارت شانس آلمان Chancenkarte', width: 1200, height: 675 } },
  { id: 6, episodeNumber: 'اپیزود ۶', title: 'دیجیتال نوماد اسپانیا: مالیات بکهام ۲۴٪ نه ۱۵٪', subtitle: 'درآمد €۲,۸۴۹/ماه، مهلت Modelo 149 و چرا مشاوران قدیمی اطلاعات غلط می‌دهند', speaker: 'دکتر آریا بهرامی', speakerCredentials: 'وکیل پایه یک اسپانیا', duration: '۲۱ دقیقه', date: '۲۵ اردیبهشت ۱۴۰۴', isoDate: '2025-05-15', category: 'spain', categoryLabel: 'اسپانیا', tags: ['Digital Nomad', 'Beckham Law', 'Modelo 149'], highlights: ['تفاوت €۲,۷۶۳ و €۲,۸۴۹', 'چرا ۲۴٪ نه ۱۵٪', 'پردازش ۲۰ روزه UGE'], cover: { src: IMG.spain, alt: 'دیجیتال نوماد اسپانیا — بارسلونا', width: 1200, height: 675 } },
  { id: 7, episodeNumber: 'اپیزود ۷', title: 'گلدن ویزای یونان ۲۰۲۶: سه سطح و تله €۲۵۰,۰۰۰', subtitle: 'چرا €۲۵۰k در آتن کار نمی‌کند، چطور از €۴۰۰k استفاده کنیم و شرایط تبدیل تجاری', speaker: 'النا کاستاس', speakerCredentials: 'وکیل دادگستری آتن', duration: '۱۷ دقیقه', date: '۱۰ خرداد ۱۴۰۴', isoDate: '2025-05-31', category: 'greece', categoryLabel: 'یونان', tags: ['Golden Visa', 'Law 5100/2024', 'Ktimatologio'], highlights: ['€۸۰۰k آتن — €۴۰۰k سایر مناطق', 'شرایط سخت تبدیل تجاری', 'چطور ملک را تأیید کنیم؟'], cover: { src: IMG.greece, alt: 'گلدن ویزای یونان — آتن', width: 1200, height: 675 } },
  { id: 8, episodeNumber: 'اپیزود ۸', title: 'Passeport Talent فرانسه: تله ۵۰۷ ساعت در تمدید', subtitle: 'داستان واقعی Gangbé Brass Band و درس‌هایی برای هنرمندان؛ SMIC ۲۰۲۶ و زیرشاخه‌ها', speaker: 'دکتر آریا بهرامی', speakerCredentials: 'وکیل پایه یک فرانسه', duration: '۲۳ دقیقه', date: '۵ تیر ۱۴۰۴', isoDate: '2025-06-26', category: 'france', categoryLabel: 'فرانسه', tags: ['Passeport Talent', '507 heures', 'CESEDA'], highlights: ['اخراج ۶ نوازنده بنینی در ۲۰۲۶', 'چطور از OQTF جلوگیری کنیم؟', 'تفاوت ۵ زیرشاخه اصلی'], cover: { src: IMG.france, alt: 'Passeport Talent فرانسه — پاریس', width: 1200, height: 675 } },
  { id: 9, episodeNumber: 'اپیزود ۹', title: 'آوسبیلدونگ آلمان: چرا €۷۲۴ کافی نیست و به €۱,۰۴۸ نیاز دارید', subtitle: 'تفاوت حداقل قانونی و آستانه Sperrkonto؛ اعداد دقیق ۲۰۲۶ برای پرستاری، IT و هتلداری', speaker: 'دکتر کاوه صبوری', speakerCredentials: 'کارشناس Ausbildung', duration: '۱۶ دقیقه', date: '۲۵ تیر ۱۴۰۴', isoDate: '2025-07-16', category: 'germany', categoryLabel: 'آلمان', tags: ['Ausbildung', 'BBiG §17', 'Sperrkonto'], highlights: ['€۳۲۴ اختلاف ماهانه = €۳,۸۸۸ سالانه', 'پرستاری: تنها رشته معاف', 'چطور مابه‌التفاوت را جبران کنیم؟'], cover: { src: IMG.germany, alt: 'آوسبیلدونگ آلمان — Ausbildung', width: 1200, height: 675 } },
  { id: 10, episodeNumber: 'اپیزود ۱۰', title: 'بلوکارت اتریش برای IT: بدون مدرک دانشگاهی هم می‌شود', subtitle: 'شرایط جدید ۲۰۲۶ برای متخصصان IT با ۳ سال تجربه و حقوق سالانه €۴۳,۴۳۲', speaker: 'دکتر آریا بهرامی', speakerCredentials: 'وکیل پایه یک اتریش', duration: '۱۴ دقیقه', date: '۱۵ مرداد ۱۴۰۴', isoDate: '2025-08-06', category: 'austria', categoryLabel: 'اتریش', tags: ['Blue Card', 'IT Austria', 'AuslBG'], highlights: ['اتریش از آلمان الگو گرفته', 'مستندسازی سابقه شغلی', 'پس از ۲ سال → اقامت دائم'], cover: { src: IMG.austria, alt: 'بلوکارت اتریش برای IT', width: 1200, height: 675 } },
  { id: 11, episodeNumber: 'اپیزود ۱۱', title: 'Skilled Worker انگلستان ۲۰۲۶: B2 انگلیسی و ۱۸ ماه Graduate Route', subtitle: 'تغییرات بنیادین ۲۰۲۶، کاهش Graduate Route از ۲۴ به ۱۸ ماه و ILR ۱۰ ساله', speaker: 'کارگروه انگلستان دیاکو', speakerCredentials: 'OISC Registered Adviser', duration: '۲۰ دقیقه', date: '۵ شهریور ۱۴۰۴', isoDate: '2025-08-27', category: 'uk', categoryLabel: 'انگلستان', tags: ['Skilled Worker', 'Graduate Route', 'ILR'], highlights: ['B1 → B2: چه کسانی تحت تأثیر', 'Graduate Route ۱۸ ماه', 'آیا ILR به ۱۰ سال می‌رسد؟'], cover: { src: IMG.uk, alt: 'Skilled Worker انگلستان — لندن', width: 1200, height: 675 } },
  { id: 12, episodeNumber: 'اپیزود ۱۲', title: 'Guest Investor مجارستان: €۲۵۰k برای اقامت ۱۰ ساله', subtitle: 'آخرین گلدن ویزای فعال اروپا — با ریسک سیاسی بالا؛ چطور در ۲۰۲۶ تصمیم بگیریم؟', speaker: 'کارگروه مجارستان دیاکو', speakerCredentials: 'OIF Registered Consultant', duration: '۱۸ دقیقه', date: '۲۵ شهریور ۱۴۰۴', isoDate: '2025-09-16', category: 'hungary', categoryLabel: 'مجارستان', tags: ['Guest Investor', 'Hungary 2026', 'Golden Visa'], highlights: ['چرا خرید مستقیم ملک حذف شده', 'ریسک انتخابات ۲۰۲۶', 'چطور Plan B طراحی کنیم'], cover: { src: IMG.hungary, alt: 'Guest Investor مجارستان — بوداپست', width: 1200, height: 675 } },
  { id: 13, episodeNumber: 'اپیزود ۱۳', title: 'CBI دومینیکا: پاسپورت دوم برای ایرانی‌ها — ریسک‌ها و واقعیت', subtitle: 'هزینه واقعی €۳۰۰,۰۰۰، Enhanced Due Diligence و «پاسپورت تضمینی» که وجود ندارد', speaker: 'Sarah Mitchell', speakerCredentials: 'Licensed CBI Agent', duration: '۲۲ دقیقه', date: '۱۵ مهر ۱۴۰۴', isoDate: '2025-10-07', category: 'dominica', categoryLabel: 'دومینیکا', tags: ['CBI', 'Dominica', 'EDD'], highlights: ['هزینه واقعی vs تبلیغاتی', 'چرا بانک‌های سوئیس محدودیت دارند', 'مشکل اصلی: منبع وجوه'], cover: { src: IMG.dominica, alt: 'CBI دومینیکا — پاسپورت دوم', width: 1200, height: 675 } },
  { id: 14, episodeNumber: 'اپیزود ۱۴', title: 'قانون جدید اتریش ۲۰۲۶: ماندن در کشور تا صدور RWR', subtitle: 'از ۲۰ می ۲۰۲۶، متقاضیان Jobseeker می‌توانند بدون خروج از اتریش تا صدور RWR بمانند', speaker: 'دکتر آریا بهرامی', speakerCredentials: 'وکیل پایه یک اتریش', duration: '۱۴ دقیقه', date: '۳۰ اردیبهشت ۱۴۰۵', isoDate: '2026-05-20', category: 'austria', categoryLabel: 'اتریش', tags: ['Jobseeker', 'RWR Card', 'MA35'], highlights: ['پنجره طلایی جدید', 'شرط: ثبت درخواست قبل از انقضا', 'تا صدور کارت، کار ممنوع'], cover: { src: IMG.austria, alt: 'قانون جدید Jobseeker اتریش ۲۰۲۶', width: 1200, height: 675 } },
  { id: 15, episodeNumber: 'اپیزود ۱۵', title: 'RWR Plus برای خانواده در اتریش: تغییر مهم ۲۰۲۶', subtitle: 'از اوت ۲۰۲۶، اعضای خانواده RWR Plus می‌گیرند — حق کار نامحدود از روز اول', speaker: 'دکتر آریا بهرامی', speakerCredentials: 'وکیل پایه یک اتریش', duration: '۱۳ دقیقه', date: '۲۵ اردیبهشت ۱۴۰۵', isoDate: '2026-05-15', category: 'austria', categoryLabel: 'اتریش', tags: ['RWR Plus', 'Familienangehöriger', 'MA35'], highlights: ['RWR Plus vs RWR', 'حق کار نامحدود همسر', 'مسیر ۵ ساله به Daueraufenthalt-EU'], cover: { src: IMG.austria, alt: 'RWR Plus خانواده اتریش ۲۰۲۶', width: 1200, height: 675 } },
  { id: 16, episodeNumber: 'اپیزود ۱۶', title: 'هدف ۱۵,۰۰۰ کارت RWR اتریش در ۲۰۲۷', subtitle: 'دولت اتریش برای جذب متخصص خارجی، تسهیلات گسترده اعلام کرده — فرصت طلایی', speaker: 'تیم حقوقی دیاکو', speakerCredentials: 'وکلای مقیم وین', duration: '۱۵ دقیقه', date: '۲۰ اردیبهشت ۱۴۰۵', isoDate: '2026-05-10', category: 'austria', categoryLabel: 'اتریش', tags: ['RWR Card', 'Mangelberufe', 'اتریش ۲۰۲۷'], highlights: ['پذیرش انگلیسی برای IT', 'کاهش زمان AMS به ۴ هفته', 'تسهیل معادل‌سازی مدارک'], cover: { src: IMG.austria, alt: 'هدف ۱۵ هزار RWR اتریش ۲۰۲۷', width: 1200, height: 675 } },
  { id: 17, episodeNumber: 'اپیزود ۱۷', title: 'دو عدد تمکن مالی اتریش: €۱,۳۰۸ یا €۲,۶۱۶؟', subtitle: 'چرا رسانه‌ها دو عدد متناقض می‌گویند — کدام برای پرونده شما اعمال می‌شود؟', speaker: 'دکتر آریا بهرامی', speakerCredentials: 'وکیل پایه یک اتریش', duration: '۱۲ دقیقه', date: '۱۵ اردیبهشت ۱۴۰۵', isoDate: '2026-05-05', category: 'austria', categoryLabel: 'اتریش', tags: ['NAG §44', 'Richtsatz 2026', 'Quotenkontingent'], highlights: ['§44 = €۲,۶۱۶ | §11 = €۱,۳۰۸', 'چرا مشاوران اشتباه می‌گویند', 'راهکار: انتخاب مسیر کاری'], cover: { src: IMG.austria, alt: 'دو عدد تمکن مالی اتریش ۲۰۲۶', width: 1200, height: 675 } },
  { id: 18, episodeNumber: 'اپیزود ۱۸', title: 'کارت شانس آلمان: ۳ فیلتر پنهان که باید بدانید', subtitle: 'ZAB، Sperrkonto €۱۳,۰۹۲ و مدرک زبان — چرا حتی ۷ امتیازی‌ها رد می‌شوند', speaker: 'دکتر کاوه صبوری', speakerCredentials: 'کارشناس ZAB و Chancenkarte', duration: '۱۷ دقیقه', date: '۲۸ اردیبهشت ۱۴۰۵', isoDate: '2026-05-18', category: 'germany', categoryLabel: 'آلمان', tags: ['Chancenkarte', 'ZAB', 'Sperrkonto'], highlights: ['مدرک بدون ZAB = ۰ امتیاز', 'ZAB: ۲-۳ ماه و €۲۰۰', 'قرارداد کار پاره‌وقت جایگزین Sperrkonto'], cover: { src: IMG.germany, alt: 'فیلترهای پنهان کارت شانس آلمان', width: 1200, height: 675 } },
  { id: 19, episodeNumber: 'اپیزود ۱۹', title: 'بلوکارت آلمان ۲۰۲۶: €۴۸,۳۰۰ یا €۴۳,۷۵۹.۸۰؟', subtitle: 'تفاوت حیاتی دو آستانه که می‌تواند پرونده شما را از رد به قبولی ببرد', speaker: 'دکتر کاوه صبوری', speakerCredentials: 'کارشناس BAMF', duration: '۱۵ دقیقه', date: '۲۵ اردیبهشت ۱۴۰۵', isoDate: '2026-05-15', category: 'germany', categoryLabel: 'آلمان', tags: ['Blue Card', 'BAMF', 'Mangelberufe'], highlights: ['آستانه عمومی vs کمبود', 'آستانه €۳۵,۰۰۰ برای فارغ‌التحصیلان', 'چطور STEM را اثبات کنیم'], cover: { src: IMG.germany, alt: 'بلوکارت آلمان دو آستانه ۲۰۲۶', width: 1200, height: 675 } },
  { id: 20, episodeNumber: 'اپیزود ۲۰', title: 'مسیر IT بدون مدرک در آلمان: ۳ سال تجربه = Blue Card', subtitle: 'برنامه‌نویسان خودآموخته می‌توانند بدون مدرک دانشگاهی مستقیم Blue Card بگیرند', speaker: 'دکتر کاوه صبوری', speakerCredentials: 'کارشناس BAMF', duration: '۱۶ دقیقه', date: '۱۸ اردیبهشت ۱۴۰۵', isoDate: '2026-05-08', category: 'germany', categoryLabel: 'آلمان', tags: ['Blue Card', 'IT', 'Fachkräfteeinwanderungsgesetz'], highlights: ['۳ سال سابقه در ۷ سال گذشته', 'انگلیسی B2 کافی است', 'مستندسازی GitHub و توصیه‌نامه'], cover: { src: IMG.germany, alt: 'مسیر IT بدون مدرک آلمان ۲۰۲۶', width: 1200, height: 675 } },
  { id: 21, episodeNumber: 'اپیزود ۲۱', title: 'Chancenkarte یا Jobseeker آلمان؟ کدام برای شما؟', subtitle: 'مقایسه دقیق دو مسیر که اغلب اشتباه گرفته می‌شوند — با معیارهای عملی', speaker: 'دکتر کاوه صبوری', speakerCredentials: 'کارشناس ZAB', duration: '۱۴ دقیقه', date: '۱۵ اردیبهشت ۱۴۰۵', isoDate: '2026-05-05', category: 'germany', categoryLabel: 'آلمان', tags: ['Chancenkarte', 'Jobseeker', 'مقایسه'], highlights: ['Chancenkarte: انعطاف‌پذیرتر', 'Jobseeker: برای Berufsanerkennung', 'زمان‌بندی هر دو مسیر'], cover: { src: IMG.germany, alt: 'Chancenkarte vs Jobseeker آلمان ۲۰۲۶', width: 1200, height: 675 } },
  { id: 22, episodeNumber: 'اپیزود ۲۲', title: 'Zoekjaar هلند: حقوق €۳,۱۲۲ نه €۴,۳۵۷', subtitle: 'چرا فارغ‌التحصیلان هلندی ۲۸٪ کاهش حقوق دارند — بزرگ‌ترین مزیت پنهان', speaker: 'دکتر کاوه صبوری', speakerCredentials: 'کارشناس IND', duration: '۱۳ دقیقه', date: '۲۰ اردیبهشت ۱۴۰۵', isoDate: '2026-05-10', category: 'netherlands', categoryLabel: 'هلند', tags: ['Zoekjaar', 'HSM', 'IND'], highlights: ['تفاوت €۱,۲۳۵ ماهانه', 'مهلت: ۳ سال از فارغ‌التحصیلی', 'کار بدون محدودیت ساعت'], cover: { src: IMG.netherlands, alt: 'Zoekjaar هلند ۲۰۲۶', width: 1200, height: 675 } },
  { id: 23, episodeNumber: 'اپیزود ۲۳', title: 'ویزای تحصیلی هلند: €۱,۱۳۰.۷۷ نه €۱,۰۰۰', subtitle: 'چرا منابع قدیمی می‌گویند €۱۲,۰۰۰ اما IND نرخ ۲۰۲۶ را به €۱۳,۵۶۹ افزایش داده', speaker: 'مهندس سارا رادمنش', speakerCredentials: 'سرپرست پذیرش تحصیلی', duration: '۱۵ دقیقه', date: '۱۵ اردیبهشت ۱۴۰۵', isoDate: '2026-05-05', category: 'netherlands', categoryLabel: 'هلند', tags: ['Student Visa', 'IND', 'MVV'], highlights: ['تمکن دقیق ۲۰۲۶', 'پردازش ۲-۴ هفته', 'پس از فارغ‌التحصیلی: Zoekjaar'], cover: { src: IMG.netherlands, alt: 'ویزای تحصیلی هلند ۲۰۲۶', width: 1200, height: 675 } },
  { id: 24, episodeNumber: 'اپیزود ۲۴', title: 'پایان گلدن ویزای اسپانیا: از آوریل ۲۰۲۵ لغو شد', subtitle: 'Organic Law 1/2025 و هیچ درخواست جدیدی پذیرفته نمی‌شود — جایگزین‌ها چیست؟', speaker: 'دکتر آریا بهرامی', speakerCredentials: 'وکیل پایه یک اسپانیا', duration: '۱۸ دقیقه', date: '۲۸ اردیبهشت ۱۴۰۵', isoDate: '2026-05-18', category: 'spain', categoryLabel: 'اسپانیا', tags: ['Golden Visa', 'Organic Law 1/2025', 'NLV'], highlights: ['تاریخ قطعی ۳ آوریل ۲۰۲۵', 'دارندگان فعلی: تمدید طبق قوانین قبلی', 'جایگزین: NLV و DNV'], cover: { src: IMG.spain, alt: 'پایان گلدن ویزای اسپانیا ۲۰۲۶', width: 1200, height: 675 } },
  { id: 25, episodeNumber: 'اپیزود ۲۵', title: 'DNV یا NLV اسپانیا؟ ۶ تفاوت حیاتی', subtitle: 'حق کار، پردازش، مدت اقامت، مالیات — مقایسه کامل دو مسیر پس از لغو گلدن ویزا', speaker: 'دکتر آریا بهرامی', speakerCredentials: 'وکیل پایه یک اسپانیا', duration: '۱۶ دقیقه', date: '۱۵ اردیبهشت ۱۴۰۵', isoDate: '2026-05-05', category: 'spain', categoryLabel: 'اسپانیا', tags: ['DNV', 'NLV', 'مقایسه'], highlights: ['DNV ۲۰ روزه، NLV ۳-۶ ماه', 'مالیات ۲۴٪ vs ۴۷٪', 'درآمد: €۲,۸۴۹ vs €۲,۴۰۰'], cover: { src: IMG.spain, alt: 'DNV vs NLV اسپانیا ۲۰۲۶', width: 1200, height: 675 } },
  { id: 26, episodeNumber: 'اپیزود ۲۶', title: 'گلدن ویزای یونان ۲۰۲۶: €۸۰۰k یا €۴۰۰k؟', subtitle: 'راهنمای کامل سه سطح + شرایط تبدیل تجاری به مسکونی + استعلام Ktimatologio', speaker: 'النا کاستاس', speakerCredentials: 'وکیل دادگستری آتن', duration: '۱۷ دقیقه', date: '۲۰ اردیبهشت ۱۴۰۵', isoDate: '2026-05-10', category: 'greece', categoryLabel: 'یونان', tags: ['Golden Visa', 'Law 5100/2024', 'آتن'], highlights: ['€۸۰۰k آتن، €۴۰۰k سایر', '€۲۵۰k فقط تبدیل تجاری', 'اجاره کوتاه‌مدت محدود شده'], cover: { src: IMG.greece, alt: 'گلدن ویزای یونان سه سطح ۲۰۲۶', width: 1200, height: 675 } },
  { id: 27, episodeNumber: 'اپیزود ۲۷', title: 'Digital Nomad یونان: چرا «پرواز به آتن» ممکن نیست', subtitle: 'Law 5275/2026: درخواست DNV فقط از سفارت کشور محل اقامت — پایان تبلیغات دروغین', speaker: 'النا کاستاس', speakerCredentials: 'وکیل دادگستری آتن', duration: '۱۴ دقیقه', date: '۲۵ اردیبهشت ۱۴۰۵', isoDate: '2026-05-15', category: 'greece', categoryLabel: 'یونان', tags: ['DNV Greece', 'Law 5275/2026', 'سفارت'], highlights: ['ممنوعیت درخواست از داخل', 'تمامی درخواست‌ها از سفارت', 'ریسک اخراج'], cover: { src: IMG.greece, alt: 'قانون جدید DNV یونان ۲۰۲۶', width: 1200, height: 675 } },
  { id: 28, episodeNumber: 'اپیزود ۲۸', title: 'DNV یونان: مالیات ۵۰٪ معاف برای ۷ سال', subtitle: 'چطور درخواست بدهید، چه کسانی واجد شرایط‌اند و مقایسه با Beckham اسپانیا', speaker: 'النا کاستاس', speakerCredentials: 'وکیل دادگستری آتن', duration: '۱۵ دقیقه', date: '۲۰ اردیبهشت ۱۴۰۵', isoDate: '2026-05-10', category: 'greece', categoryLabel: 'یونان', tags: ['DNV Greece', 'Tax Exemption', 'AADE'], highlights: ['درخواست جداگانه ظرف ۶ ماه', 'تعهد ۲ ساله اقامت', 'نرخ مؤثر ~۲۲٪'], cover: { src: IMG.greece, alt: 'مالیات ۵۰٪ معاف یونان ۲۰۲۶', width: 1200, height: 675 } },
  { id: 29, episodeNumber: 'اپیزود ۲۹', title: 'بلوکارت ۳ ساله یونان: بلیت ارزان ورود به اروپا', subtitle: 'Law 5275/2026: جایگزین اقتصادی گلدن ویزا برای متخصصان با Job Offer یونانی', speaker: 'النا کاستاس', speakerCredentials: 'وکیل دادگستری آتن', duration: '۱۳ دقیقه', date: '۱۵ اردیبهشت ۱۴۰۵', isoDate: '2026-05-05', category: 'greece', categoryLabel: 'یونان', tags: ['Blue Card Greece', 'Law 5275/2026', 'EU Blue Card'], highlights: ['هزینه €۸۰۰k vs Job Offer', 'پس از ۱۲ ماه: تحرک EU', 'پس از ۲ سال: اقامت دائم'], cover: { src: IMG.greece, alt: 'بلوکارت ۳ ساله یونان ۲۰۲۶', width: 1200, height: 675 } },
  { id: 30, episodeNumber: 'اپیزود ۳۰', title: 'Passeport Talent فرانسه: اصلاحیه ۵ دسته', subtitle: 'کاهش پیچیدگی از ۱۰+ زیرشاخه به ۵ دسته شفاف — چه چیزی تغییر می‌کند؟', speaker: 'دکتر آریا بهرامی', speakerCredentials: 'وکیل پایه یک فرانسه', duration: '۱۶ دقیقه', date: '۲۰ اردیبهشت ۱۴۰۵', isoDate: '2026-05-10', category: 'france', categoryLabel: 'فرانسه', tags: ['Passeport Talent', 'CESEDA', 'اصلاحیه'], highlights: ['۵ دسته جدید', 'کاهش رد پرونده', 'دوره انتقالی ۲۰۲۶-۲۰۲۷'], cover: { src: IMG.france, alt: 'اصلاحیه Passeport Talent فرانسه ۲۰۲۶', width: 1200, height: 675 } },
  { id: 31, episodeNumber: 'اپیزود ۳۱', title: 'Passeport Talent هنری: بدون کارفرمای فرانسوی', subtitle: 'چطور با درآمد €۱,۳۰۶.۹۱ و ۵۱٪ از هنر، کارت ۴ ساله با خانواده بگیرید', speaker: 'دکتر آریا بهرامی', speakerCredentials: 'وکیل پایه یک فرانسه', duration: '۱۴ دقیقه', date: '۱۵ اردیبهشت ۱۴۰۵', isoDate: '2026-05-05', category: 'france', categoryLabel: 'فرانسه', tags: ['Artist France', 'Passeport Talent', 'هنرمندان'], highlights: ['بدون نیاز به کارفرما', 'خانواده خودکار', 'مستندسازی درآمد هنری'], cover: { src: IMG.france, alt: 'Passeport Talent هنری فرانسه ۲۰۲۶', width: 1200, height: 675 } },
  { id: 32, episodeNumber: 'اپیزود ۳۲', title: 'Skilled Worker انگلستان: B1 → B2 چه معنایی دارد؟', subtitle: 'افزایش سطح زبان از ژانویه ۲۰۲۶ و تأثیر آن بر پرونده‌های در جریان', speaker: 'کارگروه انگلستان دیاکو', speakerCredentials: 'OISC Registered Adviser', duration: '۱۳ دقیقه', date: '۲۵ اردیبهشت ۱۴۰۵', isoDate: '2026-05-15', category: 'uk', categoryLabel: 'انگلستان', tags: ['Skilled Worker', 'B2 English', 'UK Visa'], highlights: ['تفاوت B1 و B2', 'معافیت‌ها: مدرک انگلیسی‌زبان', 'آمادگی ۳-۶ ماه'], cover: { src: IMG.uk, alt: 'Skilled Worker B2 انگلستان ۲۰۲۶', width: 1200, height: 675 } },
  { id: 33, episodeNumber: 'اپیزود ۳۳', title: 'تله مالیاتی Digital Nomad: ۱۸۳ روز سرنوشت‌ساز', subtitle: 'چرا DNV شما ممکن است مالیات مضاعف ایجاد کند — راهنمای جلوگیری', speaker: 'کارگروه مالیاتی دیاکو', speakerCredentials: 'Tax Advisers (EU)', duration: '۱۷ دقیقه', date: '۱۰ اردیبهشت ۱۴۰۵', isoDate: '2026-04-30', category: 'spain', categoryLabel: 'اسپانیا', tags: ['Digital Nomad Tax', '183 Days', 'Beckham Law'], highlights: ['قاعده ۱۸۳ روز', 'خطر DTT بین ایران و EU', 'Exit Tax'], cover: { src: IMG.spain, alt: 'تله مالیاتی Digital Nomad ۲۰۲۶', width: 1200, height: 675 } },
];

/* ============================================================
   4. Schema
   ============================================================ */
const generateSchema = (episodes: PodcastEpisode[]) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.dia-co.ir/#organization',
      name: 'هلدینگ مهاجرتی دیاکو',
      url: 'https://www.dia-co.ir',
    },
    {
      '@type': 'PodcastSeries',
      '@id': 'https://www.dia-co.ir/podcast#series',
      name: 'رادیو مهاجرت دیاکو',
      description: 'پادکست تحلیلی قوانین اقامت و مهاجرت اروپا — توسط وکلای مقیم وین، آتن و برلین.',
      url: 'https://www.dia-co.ir/podcast',
      inLanguage: 'fa-IR',
      numberOfEpisodes: episodes.length,
      publisher: { '@id': 'https://www.dia-co.ir/#organization' },
    },
    ...episodes.map((ep) => ({
      '@type': 'PodcastEpisode',
      '@id': `https://www.dia-co.ir/podcast/${ep.id}#episode`,
      name: ep.title,
      description: ep.subtitle,
      episodeNumber: ep.id,
      partOfSeries: { '@id': 'https://www.dia-co.ir/podcast#series' },
      datePublished: ep.isoDate,
      image: { '@type': 'ImageObject', url: ep.cover.src, caption: ep.cover.alt },
      author: { '@type': 'Person', name: ep.speaker, jobTitle: ep.speakerCredentials },
    })),
  ],
});

/* ============================================================
   5. Card Sub-component
   ============================================================ */
interface PodcastCardProps {
  ep: PodcastEpisode;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ ep, isPlaying, onTogglePlay }) => {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onTogglePlay}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTogglePlay();
        }
      }}
      aria-label={`${isPlaying ? 'توقف' : 'پخش'} ${ep.title}`}
      aria-pressed={isPlaying}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white text-right transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
        isPlaying
          ? 'border-amber-400 shadow-xl shadow-amber-500/20 ring-2 ring-amber-400/40'
          : 'border-white/10 shadow-md hover:border-amber-300/60 hover:shadow-xl'
      }`}
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <img
          src={ep.cover.src}
          alt={ep.cover.alt}
          width={ep.cover.width}
          height={ep.cover.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Episode badge */}
        <div className="absolute top-2 right-2 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-black text-white backdrop-blur-sm">
          {ep.episodeNumber}
        </div>

        {/* Category badge */}
        <div className="absolute top-2 left-2 rounded-full bg-amber-400/95 px-2 py-0.5 text-[10px] font-black text-amber-950">
          {ep.categoryLabel}
        </div>

        {/* Play / Pause overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <div className="grid h-14 w-14 place-items-center rounded-full bg-amber-400/95 text-[#0b2933] shadow-2xl backdrop-blur-sm">
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="mr-0.5 h-6 w-6" />}
          </div>
        </div>

        {/* Playing equalizer indicator */}
        {isPlaying && (
          <div className="absolute bottom-2 right-2 flex items-end gap-0.5 rounded-lg bg-black/70 px-2 py-1.5 backdrop-blur-sm">
            {[60, 80, 40, 100, 70, 90, 50].map((h, i) => (
              <span
                key={i}
                className="w-[3px] animate-pulse rounded-full bg-amber-400"
                style={{
                  height: `${Math.round((h * 14) / 100)}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 text-xs font-black leading-snug text-[#0b2933]">
          {ep.title}
        </h3>

        <p className="mt-1.5 flex items-center gap-1 truncate text-[10px] font-bold text-slate-500">
          <User className="h-3 w-3 shrink-0 text-amber-600" />
          <span className="truncate">{ep.speaker}</span>
        </p>

        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] font-bold text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3 text-amber-600" />
            {ep.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3 text-amber-600" />
            {ep.date}
          </span>
        </div>
      </div>
    </article>
  );
};

/* ============================================================
   6. Main Component
   ============================================================ */
export const PodcastsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cardsPerView, setCardsPerView] = useState(4);
  const listRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sectionId = useId();

  /* ---------- Responsive Cards Per View ---------- */
  useEffect(() => {
    const updateCardsPerView = () => {
      const w = window.innerWidth;
      if (w >= 1024) setCardsPerView(4);
      else if (w >= 640) setCardsPerView(2);
      else setCardsPerView(1);
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  /* ---------- Filtered Episodes ---------- */
  const filteredEpisodes = useMemo(() => {
    return PODCAST_EPISODES.filter((ep) => {
      const matchesCategory = activeCategory === 'all' || ep.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        ep.title.toLowerCase().includes(q) ||
        ep.subtitle.toLowerCase().includes(q) ||
        ep.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  /* ---------- Total Pages ---------- */
  const totalPages = Math.max(1, Math.ceil(filteredEpisodes.length / cardsPerView));

  /* ---------- Visible Episodes ---------- */
  const visibleEpisodes = useMemo(() => {
    const start = currentPage * cardsPerView;
    return filteredEpisodes.slice(start, start + cardsPerView);
  }, [currentPage, cardsPerView, filteredEpisodes]);

  /* ---------- Reset on Filter Change ---------- */
  useEffect(() => {
    setCurrentPage(0);
    setPlayingId(null);
  }, [activeCategory, searchQuery]);

  /* ---------- Clamp on View Change ---------- */
  useEffect(() => {
    setCurrentPage((p) => Math.min(p, Math.max(0, totalPages - 1)));
  }, [cardsPerView, totalPages]);

  /* ---------- Autoplay ---------- */
  useEffect(() => {
    if (!isAutoplayActive || isPaused || totalPages <= 1) return;
    const timer = setInterval(() => {
      setCurrentPage((p) => (p + 1) % totalPages);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isAutoplayActive, isPaused, totalPages, currentPage]);

  /* ---------- Navigation ---------- */
  const goPrev = useCallback(() => {
    if (totalPages <= 1) return;
    setCurrentPage((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goNext = useCallback(() => {
    if (totalPages <= 1) return;
    setCurrentPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  /* ---------- Touch Swipe ---------- */
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) goNext();
    else if (distance < -50) goPrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  /* ---------- Handlers ---------- */
  const handleTogglePlay = (id: number) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  const handleSelectFromList = (ep: PodcastEpisode) => {
    const idx = filteredEpisodes.findIndex((e) => e.id === ep.id);
    if (idx >= 0) {
      const page = Math.floor(idx / cardsPerView);
      setCurrentPage(page);
      setPlayingId(ep.id);
    }
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ---------- Schema ---------- */
  const jsonLd = useMemo(() => generateSchema(PODCAST_EPISODES), []);

  /* ---------- Currently Playing ---------- */
  const playingEpisode = playingId
    ? PODCAST_EPISODES.find((e) => e.id === playingId) || null
    : null;

  return (
    <section
      id="podcasts"
      dir="rtl"
      aria-labelledby={`${sectionId}-title`}
      className="relative overflow-hidden bg-gradient-to-b from-[#07252e] via-[#0a1f28] to-[#07252e] py-20 text-white"
    >
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Background glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5a623]/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-20 right-0 -z-10 h-96 w-96 rounded-full bg-[#0e7490]/15 blur-[120px]" />

      <div className="container mx-auto px-4 md:px-8">
        {/* ===== Header ===== */}
        <header className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300 shadow-inner">
            <Radio className="h-3.5 w-3.5" />
            رادیو مهاجرت دیاکو | {PODCAST_EPISODES.length} اپیزود اختصاصی
          </div>
          <h2
            id={`${sectionId}-title`}
            className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl"
          >
            شنیدنی‌های تخصصی قوانین اقامت اروپا ۲۰۲۶
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs font-medium leading-relaxed text-slate-300 sm:text-sm">
            <strong className="text-amber-200">خلاصه:</strong> {PODCAST_EPISODES.length} پادکست تحلیلی درباره اتریش، آلمان، هلند، اسپانیا، یونان، فرانسه، انگلستان، مجارستان و دومینیکا — توسط وکلای مقیم وین، آتن و برلین.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#fed871] to-[#f5a623]" />
        </header>

        {/* ===== Filters ===== */}
        <div className="mt-10 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? PODCAST_EPISODES.length
                  : PODCAST_EPISODES.filter((e) => e.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-[11px] font-bold transition-all cursor-pointer ${
                    active
                      ? 'border-[#f5a623]/60 bg-gradient-to-l from-[#f5a623]/25 to-transparent text-amber-200 shadow-md'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {cat.label}
                  <span className="mr-1.5 opacity-60">{count.toLocaleString('fa-IR')}</span>
                </button>
              );
            })}
          </div>

          <div className="mx-auto w-full max-w-md relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در عنوان، توضیحات یا تگ‌ها..."
              className="w-full rounded-2xl border border-white/15 bg-white/5 py-2.5 pr-10 pl-4 text-xs font-semibold text-white placeholder-slate-400 focus:border-[#f5a623] focus:bg-white/10 focus:outline-none"
              aria-label="جستجو در پادکست‌ها"
            />
            <Search className="absolute right-3.5 top-2.5 h-4 w-4 text-slate-500" />
          </div>
        </div>

        {/* ===== Currently Playing Bar ===== */}
        {playingEpisode && (
          <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-amber-400/40 bg-gradient-to-l from-amber-400/15 via-amber-400/5 to-transparent p-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={playingEpisode.cover.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-300">
                  <Headphones className="h-3 w-3" />
                  در حال پخش
                </div>
                <p className="truncate text-xs font-bold text-white">
                  {playingEpisode.title}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden items-end gap-0.5 sm:flex">
                  {[40, 70, 30, 90, 50, 80, 45].map((h, i) => (
                    <span
                      key={i}
                      className="w-0.5 animate-pulse rounded-full bg-amber-400"
                      style={{ height: `${h * 0.2}px`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setPlayingId(null)}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-amber-400 text-[#0b2933] shadow-md transition hover:scale-105"
                  aria-label="توقف پخش"
                >
                  <Pause className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== Carousel ===== */}
        {filteredEpisodes.length > 0 ? (
          <div
            className="relative mx-auto mt-8 max-w-6xl select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Autoplay progress */}
            {isAutoplayActive && !isPaused && totalPages > 1 && (
              <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  key={`${currentPage}-${activeCategory}`}
                  className="h-full bg-gradient-to-l from-[#fed871] to-[#f5a623]"
                  style={{ animation: `progressBar ${AUTOPLAY_INTERVAL}ms linear` }}
                />
              </div>
            )}

            {/* Prev Button */}
            <button
              type="button"
              onClick={goPrev}
              disabled={totalPages <= 1}
              aria-label="صفحه قبلی"
              className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 translate-x-1/2 place-items-center rounded-2xl border border-white/20 bg-[#0b2933]/90 text-white shadow-xl backdrop-blur-md transition-all hover:bg-[#f5a623] hover:text-[#0b2933] disabled:cursor-not-allowed disabled:opacity-30 sm:-right-6 sm:grid lg:-right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={goNext}
              disabled={totalPages <= 1}
              aria-label="صفحه بعدی"
              className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/20 bg-[#0b2933]/90 text-white shadow-xl backdrop-blur-md transition-all hover:bg-[#f5a623] hover:text-[#0b2933] disabled:cursor-not-allowed disabled:opacity-30 sm:-left-6 sm:grid lg:-left-8"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>

            {/* Cards Grid */}
            <div
              key={`${currentPage}-${cardsPerView}-${activeCategory}`}
              className="grid animate-[fadeIn_0.4s_ease-out] gap-4"
              style={{
                gridTemplateColumns: `repeat(${cardsPerView}, minmax(0, 1fr))`,
              }}
            >
              {visibleEpisodes.map((ep) => (
                <PodcastCard
                  key={ep.id}
                  ep={ep}
                  isPlaying={playingId === ep.id}
                  onTogglePlay={() => handleTogglePlay(ep.id)}
                />
              ))}
            </div>

            {/* Mobile nav */}
            <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
              <button
                type="button"
                onClick={goPrev}
                disabled={totalPages <= 1}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10 text-white disabled:opacity-30"
                aria-label="قبلی"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <span className="text-[11px] font-bold text-slate-400">
                {`${(currentPage + 1).toLocaleString('fa-IR')} از ${totalPages.toLocaleString('fa-IR')}`}
              </span>
              <button
                type="button"
                onClick={goNext}
                disabled={totalPages <= 1}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10 text-white disabled:opacity-30"
                aria-label="بعدی"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
              </button>
            </div>

            {/* Page Dots / Indicator */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
              {totalPages <= 15 ? (
                Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentPage(idx)}
                    aria-label={`رفتن به صفحه ${idx + 1}`}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      currentPage === idx
                        ? 'h-2.5 w-6 bg-[#f5a623] shadow-md shadow-amber-500/50'
                        : 'h-2 w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400">
                    صفحه {currentPage + 1} از {totalPages}
                  </span>
                  <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full bg-gradient-to-l from-[#fed871] to-[#f5a623] transition-all duration-300"
                      style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Autoplay Toggle */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsAutoplayActive(!isAutoplayActive)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold transition ${
                  isAutoplayActive
                    ? 'border-amber-400/40 bg-amber-400/15 text-amber-300'
                    : 'border-white/15 bg-white/5 text-slate-400'
                }`}
              >
                {isAutoplayActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                {isAutoplayActive ? 'اسلاید خودکار فعال' : 'اسلاید خودکار خاموش'}
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-md rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-sm font-bold text-slate-300">
              اپیزودی با این فیلتر یا جستجو یافت نشد.
            </p>
          </div>
        )}

        {/* ===== Footer CTA ===== */}
        <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-amber-400/30 bg-gradient-to-l from-[#f5a623]/10 via-transparent to-transparent p-6 text-center md:p-8">
          <Headphones className="mx-auto mb-3 h-8 w-8 text-amber-400" />
          <h3 className="mb-2 text-lg font-black text-white sm:text-xl">
            می‌خواهید پرونده خود را با وکلای مقیم تحلیل کنید؟
          </h3>
          <p className="mx-auto mb-5 max-w-xl text-xs leading-6 text-slate-300">
            پادکست‌ها برای اطلاع‌رسانی عمومی هستند. برای تحلیل اختصاصی پرونده، مشاوره با وکلای مقیم دیاکو را رزرو کنید.
          </p>
          <a
            href="#assessment"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3 text-xs font-black text-[#082833] shadow-lg transition hover:scale-105"
          >
            رزرو مشاوره اختصاصی
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default PodcastsSection;