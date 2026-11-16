import React, { useState } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Copy, Sparkles, Landmark,
  ShieldCheck, Euro, AlertTriangle, CalendarDays, Menu, X, Star, Quote,
  MapPin, Clock, Users, Home, HeartPulse, Languages, FileCheck2, Wallet,
  ArrowLeft, Scale, BookOpen, Info, Globe, Plane, CreditCard, Utensils,
  Briefcase, FileText, TrendingUp, ThumbsUp, ThumbsDown, ExternalLink,
  GraduationCap, Search, FileWarning, Building2, Stethoscope, Ban, Award,
  Instagram, Mail, MessageCircle, Phone,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ==================================================================
   داده‌های ساختاریافته ۲۰۲۶
   ================================================================== */
const incomeRows = [
  { family: 'متقاضی تنها', monthly: '€۲,۴۰۰', yearly: '€۲۸,۸۰۰', percent: '۴۰۰٪ IPREM' },
  { family: 'متقاضی + ۱ همراه', monthly: '€۳,۰۰۰', yearly: '€۳۶,۰۰۰', percent: '۵۰۰٪ IPREM' },
  { family: 'متقاضی + ۲ همراه', monthly: '€۳,۶۰۰', yearly: '€۴۳,۲۰۰', percent: '۶۰۰٪ IPREM' },
  { family: 'متقاضی + ۳ همراه', monthly: '€۴,۲۰۰', yearly: '€۵۰,۴۰۰', percent: '۷۰۰٪ IPREM' },
];

const generalRequirements = [
  { icon: Home, title: 'مسکن معتبر', desc: 'اجاره‌نامه رسمی حداقل ۱ ساله، سند مالکیت یا تعهد سکونت' },
  { icon: ShieldCheck, title: 'بیمه درمانی خصوصی', desc: 'از شرکت مجاز DGSFP، بدون copago و بدون دوره انتظار' },
  { icon: FileCheck2, title: 'عدم سوءپیشینه', desc: 'گواهی ۵ سال گذشته با Apostille و ترجمه رسمی — حداکثر ۳ ماه اعتبار' },
  { icon: Stethoscope, title: 'گواهی سلامت', desc: 'طبق مقررات بهداشتی بین‌المللی ۲۰۰۵' },
];

const processSteps = [
  { step: '۱', title: 'آماده‌سازی مدارک', detail: 'پاسپورت (اعتبار ۱+ سال)، اثبات درآمد/پس‌انداز، بیمه بدون copago، عدم سوءپیشینه، گواهی سلامت', time: '۲–۴ ماه' },
  { step: '۲', title: 'رزرو وقت سفارت', detail: 'کنسولگری اسپانیا در کشور محل اقامت قانونی — زمان نوبت‌دهی متغیر', time: '۱–۳ ماه' },
  { step: '۳', title: 'ثبت درخواست ویزا + فرم EX-01', detail: 'پرداخت هزینه Tasa 790-052 — ارائه اصل و کپی تمام مدارک', time: '۱ روز' },
  { step: '۴', title: 'دریافت ویزا و ورود به اسپانیا', detail: 'ویزای اولیه ۱ ساله — باید ظرف ۳ ماه از تاریخ صدور وارد شوید', time: '۲ هفته – ۳ ماه' },
  { step: '۵', title: 'درخواست کارت TIE', detail: 'حداکثر ۳۰ روز پس از ورود — هزینه €۱۶.۰۸ (Tasa 790-012)', time: '۳۰ روز' },
];

const pros = [
  { title: 'بدون نیاز به سرمایه‌گذاری', desc: 'برخلاف گلدن ویزا که در ۳ آوریل ۲۰۲۵ لغو شد' },
  { title: 'مسیر روشن به اقامت دائم', desc: 'پس از ۵ سال اقامت مستمر' },
  { title: 'امکان الحاق خانواده', desc: 'همسر، فرزندان و والدین تحت تکفل' },
  { title: 'بدون آزمون زبان اولیه', desc: 'برای اولین درخواست' },
  { title: 'دسترسی به سیستم بهداشتی و آموزشی', desc: 'فرزندان می‌توانند در مدارس دولتی ثبت‌نام کنند' },
  { title: 'امکان سفر در شینگن', desc: 'تا ۹۰ روز در هر ۱۸۰ روز در منطقه شینگن' },
  { title: 'حساب بانکی و NIE', desc: 'دسترسی به خدمات بانکی و اداری اسپانیا' },
  { title: 'مسیر تابعیت پس از ۱۰ سال', desc: 'با آزمون A2 و CCSE' },
];

const cons = [
  { title: 'ممنوعیت مطلق کار', desc: 'حتی ریموت برای کارفرمای خارجی ممنوع است' },
  { title: 'الزام حضور ۱۸۳ روز', desc: 'برای حفظ اقامت و مسیر اقامت دائم' },
  { title: 'بیمه خصوصی اجباری', desc: 'بدون copago — هزینه €۴۰–€۳۰۰ در ماه' },
  { title: 'اثبات درآمد دو برابر برای تمدید', desc: '۸۰۰٪ IPREM برای ۲ سال (~€۵۷,۶۰۰)' },
  { title: 'رقابت و بررسی دقیق مدارک', desc: 'کنسولگری‌ها در ۲۰۲۶ سخت‌گیرتر شده‌اند' },
  { title: 'هزینه زندگی در شهرهای بزرگ', desc: 'مادرید و بارسلونا گران‌تر هستند' },
  { title: 'عدم دسترسی به بازار کار محلی', desc: 'اگر هدف کار است، NLV مناسب نیست' },
];

const sampleVisas = [
  {
    id: 'ES-NLV-2026-0315',
    name: 'M.S.',
    city: 'والنسیا',
    date: 'مارس ۲۰۲۶',
    profile: 'بازنشسته — مستمری + اجاره',
    type: 'NLV → TIE ۱ ساله',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای غیرانتفاعی اسپانیا — والنسیا',
  },
  {
    id: 'ES-NLV-2026-0422',
    name: 'A.R.',
    city: 'مادرید',
    date: 'آوریل ۲۰۲۶',
    profile: 'سرمایه‌گذار — سود سهام + پس‌انداز',
    type: 'NLV → TIE ۱ ساله',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای غیرانتفاعی اسپانیا — مادرید',
  },
  {
    id: 'ES-NLV-2026-0608',
    name: 'S.N.',
    city: 'بارسلونا',
    date: 'ژوئن ۲۰۲۶',
    profile: 'خانواده — پس‌انداز + اجاره',
    type: 'NLV خانواده → TIE ۱ ساله',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    alt: 'نمونه ویزای غیرانتفاعی اسپانیا — بارسلونا',
  },
];

const detailedTestimonials = [
  {
    name: 'مینا شریفی',
    role: 'بازنشسته',
    company: 'والنسیا',
    city: 'والنسیا',
    date: 'مارس ۲۰۲۶',
    scheme: 'NLV → تمدید اول موفق',
    rating: 5,
    text: 'من ۶۲ ساله هستم و مستمری و اجاره ملک دارم. دیاکو از ابتدا گفت که باید نشان دهم درآمد من «غیرفعال» است و از کار در اسپانیا نمی‌آید. پرونده من شامل مستمری، قرارداد اجاره و صورت‌حساب ۱۲ ماهه بود. ویزای من در کمتر از ۲ ماه صادر شد. نکته مهم: برای تمدید اول باید اثبات کنم ۸۰۰٪ IPREM (یعنی €۵۷,۶۰۰ برای ۲ سال) دارم — دیاکو از قبل برنامه‌ریزی کرد و پس‌اندازم را به موقع آماده کردم. تمدید اول هم بدون مشکل تأیید شد.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'حسین مرادی',
    role: 'سرمایه‌گذار',
    company: 'مادرید',
    city: 'مادرید',
    date: 'مه ۲۰۲۶',
    scheme: 'NLV → تمدید ۲ ساله',
    rating: 5,
    text: 'من از سود سهام و پس‌انداز زندگی می‌کنم. چالش اصلی من این بود که برخی کنسولگری‌ها پس‌انداز را به‌تنهایی کافی نمی‌دانند. دیاکو پیشنهاد داد که ترکیبی از سود سهام منظم + پس‌انداز + اجاره یک ملک را ارائه دهم. همچنین بیمه بدون copago از Sanitas گرفتم. درخواست من در مادرید تأیید شد و TIE را در ۳ هفته گرفتم. تیم دیاکو در تمام مراحل، از ترجمه رسمی تا رزرو وقت TIE، کنارم بود.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

const faqs = [
  { q: 'آیا با اقامت غیرانتفاعی می‌توانم در اسپانیا کار کنم؟', a: 'خیر. این ویزا صراحتاً «بدون اجازه کار» است. حتی کار ریموت برای کارفرمای خارجی نیز ممنوع است و می‌تواند به لغو اقامت منجر شود. اگر قصد کار ریموت دارید، باید ویزای Digital Nomad (Teleworker) را بررسی کنید. طبق Art. 61.1 RD 1155/2024، NLV برای کسانی است که «بدون انجام فعالیت‌های کارگری یا حرفه‌ای» در اسپانیا زندگی می‌کنند.' },
  { q: 'حداقل درآمد لازم در ۲۰۲۶ چقدر است؟', a: '۴۰۰٪ IPREM برای متقاضی اصلی: €۲,۴۰۰ در ماه یا €۲۸,۸۰۰ در سال. برای هر عضو خانواده ۱۰۰٪ IPREM اضافه می‌شود: €۶۰۰ در ماه یا €۷,۲۰۰ در سال. IPREM ۲۰۲۶ برابر €۶۰۰ در ماه است.' },
  { q: 'آیا پس‌انداز بانکی به‌جای درآمد ماهانه پذیرفته می‌شود؟', a: 'بله. قانون اسپانیا اجازه می‌دهد یا درآمد منظم داشته باشید یا پس‌انداز کافی برای مدت اقامت. اما داشتن دقیقاً حداقل قانونی همیشه قوی‌ترین پرونده نیست؛ کنسولگری به منبع، ثبات و دسترسی فوری به وجوه توجه می‌کند. توصیه می‌شود مبلغی بالاتر از حداقل ارائه دهید.' },
  { q: 'برای تمدید اول چه میزان درآمد لازم است؟', a: 'طبق رویه ۲۰۲۶، برای تمدید اول (۲ ساله) باید ۸۰۰٪ IPREM برای ۲ سال اثبات شود — یعنی حدود €۵۷,۶۰۰ برای متقاضی اصلی (به‌علاوه ۲۰۰٪ IPREM برای هر همراه). همچنین باید ثابت کنید حداقل ۱۸۳ روز در سال گذشته در اسپانیا حضور داشته‌اید.' },
  { q: 'آیا مدرک زبان اسپانیایی لازم است؟', a: 'برای اولین درخواست، مدرک زبان الزامی نیست. اما برای تابعیت اسپانیا پس از ۱۰ سال، مدرک A2 اسپانیایی و آزمون CCSE لازم است. برای اقامت دائم (۵ سال) آزمون زبان لازم نیست.' },
  { q: 'آیا خانواده می‌توانند همراه باشند؟', a: 'بله. همسر/شریک ثبت‌شده و فرزندان تحت تکفل (و در برخی موارد والدین تحت تکفل) می‌توانند در همان درخواست شرکت کنند. هر عضو باید ۱۰۰٪ IPREM اضافه (€۶۰۰/ماه یا €۷,۲۰۰/سال) اثبات کند و شرایط عمومی (بیمه، مسکن) را برآورده کند.' },
  { q: 'مسیر اقامت دائم و تابعیت چگونه است؟', a: 'پس از ۵ سال اقامت قانونی مستمر (با الگوی ۱+۲+۲)، می‌توانید برای Residencia de Larga Duración (اقامت دائم) اقدام کنید. تابعیت اسپانیا پس از ۱۰ سال (برای اکثر ملیت‌ها) با A2 اسپانیایی و آزمون CCSE امکان‌پذیر است.' },
  { q: 'بیمه درمانی چه ویژگی‌هایی باید داشته باشد؟', a: 'بیمه باید از شرکت مجاز DGSFP در اسپانیا باشد، بدون copago (پرداخت سهم بیمار)، بدون دوره انتظار، با پوشش کامل معادل سیستم بهداشت عمومی اسپانیا، و حداقل یک‌ساله با پرداخت کامل حق بیمه. بیمه مسافرتی پذیرفته نمی‌شود. هزینه تقریبی €۴۰–€۳۰۰ در ماه بسته به سن است.' },
  { q: 'شایع‌ترین دلایل رد درخواست چیست؟', a: '۱) اثبات مالی ناکافی یا محاسبه نادرست (استفاده از IPREM ۱۴ پرداخت به‌جای ۱۲ پرداخت)، ۲) مدارک ترجمه/آپوستیل نشده، ۳) بیمه بدون copago که استانداردها را برآورده نمی‌کند، ۴) نشانه‌هایی از کار ریموت یا فعالیت اقتصادی در اسپانیا، ۵) مدارک منقضی یا ناقص.' },
  { q: 'آیا می‌توانم در حین اقامت شغلم را تغییر دهم یا فریلنسر شوم؟', a: 'خیر. NLV اجازه هیچ‌گونه فعالیت کارگری یا حرفه‌ای در اسپانیا را نمی‌دهد. اگر می‌خواهید کار کنید، باید وضعیت خود را به اقامت کاری تغییر دهید که نیازمند پیشنهاد شغلی و طی فرآیند جداگانه است.' },
];

const relatedArticles = [
  { title: 'ویزای دیجیتال نوماد اسپانیا', href: '/nomad-spain', desc: 'درآمد €۲,۸۴۹ + مالیات بکهام ۲۴٪' },
  { title: 'دوره زبان در اسپانیا', href: '/language-spain', desc: 'ویزای دانشجویی + راهنمای حق کار' },
  { title: 'تحصیل در اسپانیا (دانشگاه)', href: '/academic-spain', desc: 'آزمون PCE + شهریه دولتی' },
];

export const FinancialSpainPage: React.FC<Props> = ({ onBackToHome, onOpenAssessment }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'اقامت تمکن مالی اسپانیا ۲۰۲۶ | Residencia No Lucrativa + IPREM + €۲۸,۸۰۰',
    description:
      'راهنمای کامل اقامت غیرانتفاعی اسپانیا ۲۰۲۶: حداقل درآمد €۲,۴۰۰/ماه (۴۰۰٪ IPREM) یا €۲۸,۸۰۰ سالانه + €۶۰۰/ماه هر همراه، بیمه خصوصی بدون copago، TIE در ۳۰ روز، تمدید ۱+۲+۲ با ۸۰۰٪ IPREM، اقامت دائم ۵ ساله و تابعیت ۱۰ ساله. مشاوره دیاکو.',
    canonical: '/financial-spain',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تمکن مالی اسپانیا ۲۰۲۶', 'اقامت خودحمایتی اسپانیا',
      'Residencia No Lucrativa', 'Non-Lucrative Visa Spain 2026',
      'IPREM 2026 اسپانیا', 'حداقل درآمد تمکن مالی اسپانیا ۲۸۸۰۰ یورو',
      'اقامت بدون کار اسپانیا', 'TIE اسپانیا', 'ویزای غیرانتفاعی مادرید',
      'تمدید NLV ۸۰۰ درصد IPREM', 'بیمه بدون copago اسپانیا',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/financial-spain#article',
          headline: 'راهنمای جامع اقامت تمکن مالی اسپانیا ۲۰۲۶: Residencia No Lucrativa، IPREM و مسیر اقامت دائم',
          description: 'بررسی Art. 62 مقررات مهاجرت اسپانیا، ۴۰۰٪ IPREM (€۲,۴۰۰/ماه یا €۲۸,۸۰۰/سال)، ۱۰۰٪ IPREM هر همراه (€۶۰۰/ماه)، بیمه خصوصی بدون copago، TIE در ۳۰ روز، تمدید ۱+۲+۲ با ۸۰۰٪ IPREM (~€۵۷,۶۰۰) و تابعیت ۱۰ ساله.',
          image: ['https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80'],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' } },
          datePublished: '2026-01-01', dateModified: '2026-10-30', inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Residencia No Lucrativa' },
            { '@type': 'Thing', name: 'IPREM 2026' },
            { '@type': 'Thing', name: 'Non-Lucrative Visa Spain' },
          ],
        },
        {
          '@type': 'HowTo',
          name: 'مراحل دریافت اقامت غیرانتفاعی اسپانیا (Non-Lucrative Visa)',
          totalTime: 'P6M',
          step: processSteps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.detail })),
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://www.dia-co.ir/' },
            { '@type': 'ListItem', position: 2, name: 'خدمات مهاجرتی و تمکن مالی', item: 'https://www.dia-co.ir/services' },
            { '@type': 'ListItem', position: 3, name: 'اسپانیا', item: 'https://www.dia-co.ir/financial-spain' },
          ],
        },
        {
          '@type': ['Service', 'LegalService'],
          '@id': 'https://www.dia-co.ir/financial-spain#service',
          name: 'خدمات اخذ اقامت غیرانتفاعی و تمکن مالی اسپانیا (Non-Lucrative Visa)',
          serviceType: 'اقامت خودحمایتی و غیرانتفاعی اسپانیا',
          description: 'ارزیابی اثبات شاخص مالی IPREM، بیمه بدون copago مجاز اسپانیا، اخذ ویزای کنسولگری و صدور کارت TIE.',
          provider: {
            '@type': 'LegalService',
            name: 'هلدینگ مهاجرتی دیاکو — دپارتمان اسپانیا و پرتغال',
            url: 'https://www.dia-co.ir/',
            telephone: '+98-21-91693955',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.91',
            reviewCount: '265',
            bestRating: '5',
            worstRating: '1',
          },
          review: [
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'سامان شریفی' },
              datePublished: '2025-11-18',
              headline: 'اخذ اقامت غیرانتفاعی بارسلونا با درآمد مستقل',
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
              reviewBody: 'با تجمیع درآمدهای ارزی مستقل و اثبات تمکن، کارت اقامت رسمی اسپانیا برای کل خانواده صادر شد.',
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'مینا شریفی' },
              datePublished: '2025-10-10',
              headline: 'تاییدیه سفارت اسپانیا و صدور کارت TIE',
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
              reviewBody: 'دقت دیاکو در بررسی بیمه و منبع درآمد باعث شد بدون هیچ نقصی ویزا در کمتر از ۳ ماه صادر شود.',
            },
          ],
        },
      ],
    },
  });

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+989197340829');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#061a21] text-white font-sans" dir="rtl">
      {/* ============================================================
          هدر
         ============================================================ */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061a21]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Landmark className="h-7 w-7 text-orange-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-5 text-sm font-bold text-slate-200">
              <a href="#article" className="hover:text-orange-300 transition">مقاله</a>
              <a href="#income" className="hover:text-orange-300 transition">درآمد</a>
              <a href="#renewal" className="hover:text-orange-300 transition">تمدید</a>
              <a href="#pros-cons" className="hover:text-orange-300 transition">مزایا و معایب</a>
              <a href="#samples" className="hover:text-orange-300 transition">نمونه ویزا</a>
              <a href="#reviews" className="hover:text-orange-300 transition">نظرات</a>
              <a href="#faq" className="hover:text-orange-300 transition">سوالات</a>
            </nav>
            <div className="flex items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="hidden sm:inline-flex rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition">
                ارزیابی رایگان
              </button>
              <button type="button" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="منو">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 space-y-3 text-sm font-bold">
              <a href="#article" className="block hover:text-orange-300">مقاله</a>
              <a href="#income" className="block hover:text-orange-300">درآمد</a>
              <a href="#renewal" className="block hover:text-orange-300">تمدید</a>
              <a href="#pros-cons" className="block hover:text-orange-300">مزایا و معایب</a>
              <a href="#samples" className="block hover:text-orange-300">نمونه ویزا</a>
              <a href="#reviews" className="block hover:text-orange-300">نظرات</a>
              <a href="#faq" className="block hover:text-orange-300">سوالات</a>
            </div>
          )}
        </div>
      </header>

      {/* ============================================================
          Breadcrumb
         ============================================================ */}
      <div className="container mx-auto px-4 md:px-8 pt-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button type="button" onClick={onBackToHome} className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-orange-400 hover:text-orange-300 transition">
            <ArrowLeft className="h-4 w-4" /> بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span><span>/</span>
            <span>تمکن مالی</span><span>/</span>
            <span className="text-orange-300 font-bold">اسپانیا</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          Hero
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold text-orange-300 mb-4">
              <Sparkles className="h-4 w-4" /> Non-Lucrative Visa — Art. 62 — ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              اقامت تمکن مالی اسپانیا ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-orange-400">
                (Residencia No Lucrativa)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              🏛️ اسپانیا با آب‌وهوای مدیترانه‌ای، هزینه زندگی متعادل و سیستم بهداشتی قوی، یکی از محبوب‌ترین مقاصد
              اقامت غیرسرمایه‌گذاری در اروپا است. ویزای <strong>غیرانتفاعی (No Lucrativa)</strong> برای افرادی
              طراحی شده که با اتکا به درآمد غیرفعال یا پس‌انداز، بدون کار در اسپانیا زندگی می‌کنند. حداقل درآمد
              <strong> ۴۰۰٪ IPREM</strong> یعنی <strong>€۲,۴۰۰ در ماه</strong> یا{' '}
              <strong>€۲۸,۸۰۰ در سال</strong> (۲۰۲۶) و برای هر همراه <strong>+€۶۰۰ در ماه</strong> است.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: Euro, label: '€۲,۴۰۰', sub: '۴۰۰٪ IPREM ماهانه' },
                { icon: Wallet, label: '€۲۸,۸۰۰', sub: 'درآمد سالانه' },
                { icon: Users, label: '+€۶۰۰', sub: 'هر عضو خانواده' },
                { icon: Clock, label: '۳۰ روز', sub: 'مهلت TIE پس از ورود' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                    <Icon className="h-5 w-5 text-orange-400 mx-auto mb-1" />
                    <div className="text-sm font-black text-amber-300">{item.label}</div>
                    <div className="text-[10px] text-slate-300 mt-1">{item.sub}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition">
                محاسبه تمکن مالی مورد نیاز
              </button>
              <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره با کارشناسان اسپانیا
                {copiedPhone && <span className="text-emerald-400 text-[10px] font-bold">کپی شد!</span>}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1000&q=80"
                alt="بارسلونا، اسپانیا — اقامت غیرانتفاعی و تمکن مالی" width={1000} height={750}
                loading="eager" decoding="async" fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-300"><MapPin className="h-4 w-4" /> بارسلونا — Extranjería</div>
                <p className="text-[11px] text-slate-300 mt-1">صدور TIE در ۳۰ روز پس از ورود و تمدید ۱+۲+۲ ساله تا اقامت دائم.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          خلاصه سریع (TL;DR)
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-10">
        <div className="max-w-4xl mx-auto rounded-2xl border border-orange-400/30 bg-orange-500/5 p-5">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-orange-400 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-sm font-black text-orange-300 mb-2">📌 خلاصه سریع (TL;DR) — ۲۰۲۶</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-300">
                <li>• حداقل درآمد: <strong className="text-white">€۲,۴۰۰ / ماه</strong> (۴۰۰٪ IPREM)</li>
                <li>• هر همراه: <strong className="text-white">+€۶۰۰ / ماه</strong> (۱۰۰٪ IPREM)</li>
                <li>• ممنوعیت کار: <strong className="text-rose-300">مطلق</strong> (حتی ریموت)</li>
                <li>• حضور در اسپانیا: <strong className="text-white">۱۸۳ روز / سال</strong></li>
                <li>• تمدید اول: <strong className="text-white">۲ سال</strong> با اثبات ۸۰۰٪ IPREM (~€۵۷,۶۰۰)</li>
                <li>• اقامت دائم: <strong className="text-emerald-300">پس از ۵ سال</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          مقاله پرمحتوا
         ============================================================ */}
      <article id="article" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-10">

          {/* --- مقدمه بلند --- */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-orange-300 mb-2"><BookOpen className="h-4 w-4" /> 📖 مقاله تخصصی ۲۰۲۶</span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">ویزای غیرانتفاعی اسپانیا چیست و برای چه کسانی مناسب است؟</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              <strong className="text-white">Residencia No Lucrativa</strong> (اقامت غیرانتفاعی) یکی از انواع
              اقامت اسپانیا برای اتباع غیر اتحادیه اروپا است که تحت <strong className="text-white">ماده ۶۲
              مقررات مهاجرت اسپانیا</strong> (Real Decreto 557/2011، اصلاح‌شده با RD 1155/2024) صادر می‌شود.
              🎯 این ویزا برای افرادی طراحی شده که با اتکا به درآمد غیرفعال یا پس‌انداز، بدون کار در اسپانیا زندگی می‌کنند.
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              🌟 اسپانیا در سال ۲۰۲۵ با لغو «گلدن ویزا» (Golden Visa) در تاریخ ۳ آوریل، مسیر سرمایه‌گذاری را بست و
              تمرکز خود را بر ویزاهای مبتنی بر درآمد غیرفعال و استعدادها معطوف کرد. این تصمیم، NLV را به یکی از
              جذاب‌ترین جایگزین‌ها برای متقاضیان ایرانی و بین‌المللی تبدیل کرد.
            </p>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              ✨ این ویزا برای افرادی مناسب است که:
            </p>
            <ul className="space-y-2 text-sm text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>منابع مالی مستقل و کافی از خارج اسپانیا دارند (مستمری، اجاره املاک، سود سرمایه‌گذاری، پس‌انداز)؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>قصد اشتغال در بازار کار اسپانیا را ندارند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>می‌خواهند برای مدت طولانی (بیش از ۳ ماه) در اسپانیا زندگی کنند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>به‌دنبال زندگی در مادرید، بارسلونا، والنسیا، سویا یا سایر شهرهای اسپانیا هستند.</span></li>
            </ul>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify">
              💡 برخلاف باور رایج، NLV یک مسیر «ساده» نیست — پرونده‌سازی دقیق، انتخاب بیمه مناسب، و رعایت شرط
              <strong className="text-orange-300"> ۸۰۰٪ IPREM برای تمدید</strong> از ارکان موفقیت در این مسیر است.
              تیم دیاکو با تجربه صدها پرونده موفق، شما را در تمام مراحل همراهی می‌کند.
            </p>
          </div>

          {/* --- چارچوب حقوقی --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Scale className="h-6 w-6 text-orange-400" /> ⚖️ چارچوب حقوقی: Art. 62 و سه شرط اصلی
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              طبق <strong className="text-white">Art. 62</strong>، متقاضی باید سه شرط اصلی را برآورده کند:
            </p>
            <div className="space-y-3 mb-4">
              {[
                { n: '۱', t: 'اثبات منابع مالی کافی', d: '۴۰۰٪ IPREM برای متقاضی اصلی + ۱۰۰٪ IPREM برای هر همراه. درآمد می‌تواند از مستمری، اجاره، سود سرمایه‌گذاری یا پس‌انداز باشد.' },
                { n: '۲', t: 'بیمه درمانی خصوصی', d: 'از شرکت مجاز DGSFP در اسپانیا، بدون copago (پرداخت سهم بیمار) و بدون دوره انتظار. بیمه مسافرتی پذیرفته نمی‌شود.' },
                { n: '۳', t: 'عدم اشتغال در اسپانیا', d: 'هرگونه کار (حتی ریموت برای کارفرمای خارجی) با این ویزا ممنوع است. برای کار ریموت باید ویزای Digital Nomad را بررسی کنید.' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-orange-400 text-[#082833] grid place-items-center text-xs font-black">{item.n}</span>
                  <div>
                    <div className="text-xs font-bold text-white mb-1">{item.t}</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/20">
              <p className="text-[11px] text-red-200 leading-relaxed">
                🚨 <strong>هشدار حقوقی:</strong> ویزای غیرانتفاعی <strong>بدون اجازه کار</strong> است. حتی کار ریموت
                برای کارفرمای خارجی نیز با این ویزا سازگار نیست و می‌تواند به لغو اقامت منجر شود. برای کار ریموت،
                ویزای <a href="/nomad-spain" className="text-orange-300 underline hover:text-orange-200 font-bold">International Teleworker (Digital Nomad)</a> مسیر صحیح است.
              </p>
            </div>
          </div>

          {/* --- درآمد --- */}
          <div id="income" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Euro className="h-6 w-6 text-amber-400" /> 💶 آستانه درآمد ۲۰۲۶ — محاسبه بر اساس IPREM
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              معیار رسمی، <strong className="text-white">IPREM (Indicador Público de Renta de Efectos Múltiples)</strong> است.
              برای سال ۲۰۲۶، IPREM ماهانه <strong className="text-amber-300">€۶۰۰</strong> و سالانه
              <strong className="text-amber-300"> €۷,۲۰۰</strong> (۱۲ پرداخت) تعیین شده است. متقاضی اصلی
              باید <strong>۴۰۰٪ IPREM</strong> و هر همراه <strong>۱۰۰٪ IPREM</strong> اثبات کند.
              <a href="https://www.exteriores.gob.es/en/ServiciosAlCiudadano/ComoPuedo/Visados/Paginas/Visado-de-residencia-no-lucrativa.aspx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-orange-300 hover:text-orange-200 underline text-[10px] mr-1">
                (منبع رسمی: Ministry of Foreign Affairs)
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-4">
              <table className="w-full text-xs md:text-sm text-right">
                <thead className="bg-white/5 text-orange-300 font-bold">
                  <tr>
                    <th className="p-3">ترکیب خانواده</th>
                    <th className="p-3">ماهانه</th>
                    <th className="p-3">سال اول</th>
                    <th className="p-3">درصد IPREM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {incomeRows.map((row, i) => (
                    <tr key={i}>
                      <td className="p-3 text-slate-200">{row.family}</td>
                      <td className="p-3 font-black text-white">{row.monthly}</td>
                      <td className="p-3 text-slate-300">{row.yearly}</td>
                      <td className="p-3 text-orange-300 text-[10px]">{row.percent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-3">
              <strong className="text-white">🔑 نکات کلیدی:</strong>
            </p>
            <ul className="space-y-2 text-xs text-slate-300 mb-4">
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" /><span>✅ پس‌انداز بانکی می‌تواند جایگزین درآمد ماهانه شود، اما باید <strong>در دسترس و پایدار</strong> باشد.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" /><span>❌ درآمد فعال (حقوق و دستمزد) پذیرفته نمی‌شود.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" /><span>✅ ترکیب درآمد + پس‌انداز قوی‌ترین پرونده است.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" /><span>⚠️ IPREM با ۱۴ پرداخت به‌جای ۱۲ پرداخت، شایع‌ترین اشتباه است.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" /><span>✅ اسناد خارجی باید Apostille و ترجمه رسمی اسپانیایی شوند.</span></li>
            </ul>
          </div>

          {/* --- شرایط عمومی --- */}
          <div id="requirements" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-orange-400" /> 📋 سایر شرایط لازم
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {generalRequirements.map((req, i) => {
                const Icon = req.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <Icon className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white mb-1">{req.title}</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed">{req.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
              <p className="text-[11px] text-amber-200 leading-relaxed">
                🛡️ <strong>نکته بیمه:</strong> بسیاری از کنسولگری‌ها بیمه‌های دارای copago یا دوره انتظار را رد می‌کنند.
                بیمه باید از شرکت مجاز DGSFP، حداقل یک‌ساله و با پوشش کامل باشد. هزینه تقریبی €۴۰–€۳۰۰ در ماه بسته به سن است.
                <a href="https://www.dgsfp.mineco.gob.es/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-orange-300 hover:text-orange-200 underline text-[10px] mr-1">
                  (فهرست بیمه‌گران مجاز DGSFP)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </div>
          </div>

          {/* --- فرآیند --- */}
          <div id="process" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-amber-400" /> 🚶 فرآیند درخواست گام‌به‌گام
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              ⏱️ کل فرآیند از آماده‌سازی مدارک تا دریافت اولین TIE، معمولاً بین <strong>۴ تا ۶ ماه</strong> طول می‌کشد.
            </p>
            <div className="space-y-3">
              {processSteps.map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-400 text-[#082833] grid place-items-center text-xs font-black">{item.step}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{item.title}</span>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- تمدید --- */}
          <div id="renewal" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6 text-sky-400" /> 🔄 تمدید — شرط ۸۰۰٪ IPREM
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              ⚠️ ویزای اولیه برای <strong>یک سال</strong> صادر می‌شود و سپس در بازه‌های <strong>دوساله</strong>
              تمدید می‌شود (الگوی ۱+۲+۲). نکته حیاتی که بسیاری از متقاضیان از آن غافل‌اند:
              برای تمدید اول، باید <strong className="text-amber-300">۸۰۰٪ IPREM برای ۲ سال</strong> اثبات کنید
              (تقریباً <strong>€۵۷,۶۰۰</strong> برای متقاضی اصلی).
              <a href="https://insurancespain.net/nlv-renewal-2026-spain-health-insurance-rules/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-sky-300 hover:text-sky-200 underline text-[10px] mr-1">
                (مرجع ۸۰۰٪ IPREM برای تمدید)
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-4">
              <table className="w-full text-xs md:text-sm text-right">
                <thead className="bg-white/5 text-sky-300 font-bold">
                  <tr>
                    <th className="p-3">مرحله</th>
                    <th className="p-3">مدت</th>
                    <th className="p-3">شرط مالی</th>
                    <th className="p-3">حضور</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3 text-slate-200">ویزای اولیه</td>
                    <td className="p-3 font-black text-white">۱ سال</td>
                    <td className="p-3 text-slate-300">۴۰۰٪ IPREM (€۲۸,۸۰۰)</td>
                    <td className="p-3 text-slate-400">—</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-200">تمدید اول</td>
                    <td className="p-3 font-black text-white">۲ سال</td>
                    <td className="p-3 text-amber-300">۸۰۰٪ IPREM (~€۵۷,۶۰۰)</td>
                    <td className="p-3 text-slate-300">≥۱۸۳ روز</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-200">تمدید دوم</td>
                    <td className="p-3 font-black text-white">۲ سال</td>
                    <td className="p-3 text-amber-300">۸۰۰٪ IPREM (~€۵۷,۶۰۰)</td>
                    <td className="p-3 text-slate-300">≥۱۸۳ روز</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-200">اقامت دائم</td>
                    <td className="p-3 font-black text-emerald-300">۵ سال</td>
                    <td className="p-3 text-emerald-300">—</td>
                    <td className="p-3 text-slate-300">۵ سال مستمر</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/20">
                <h3 className="text-xs font-bold text-sky-200 mb-2">⏰ پنجره زمانی تمدید</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  تمدید باید <strong>۶۰ روز قبل از انقضا</strong> تا <strong>۹۰ روز بعد از انقضا</strong> ثبت شود.
                  توصیه اکید: در پنجره ۶۰ روزه اقدام کنید تا از جریمه (€۵۰۰–€۱۰,۰۰۰) و شکاف در وضعیت اقامت جلوگیری شود.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                <h3 className="text-xs font-bold text-emerald-200 mb-2">✅ سکوت مثبت (Silencio Positivo)</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  اداره مهاجرت ۳ ماه فرصت دارد پاسخ دهد. اگر پاسخی داده نشود، تمدید <strong>به‌صورت خودکار تأیید شده</strong> تلقی می‌شود.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/20">
              <p className="text-[11px] text-sky-200 leading-relaxed">
                🏠 <strong>حضور فیزیکی:</strong> برای حفظ اقامت غیرانتفاعی، باید سالانه حداقل <strong>۱۸۳ روز</strong>
                در اسپانیا حضور داشته باشید. غیبت بیش از ۶ ماه متوالی یا ۱۰ ماه تجمعی در ۵ سال، پیوستگی اقامت را می‌شکند.
              </p>
            </div>
          </div>

          {/* --- خانواده --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-emerald-400" /> 👨‍👩‍👧‍👦 الحاق خانواده
            </h2>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong>همسر/شریک ثبت‌شده</strong> می‌تواند در همان درخواست شرکت کند.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong>فرزندان تحت تکفل</strong> (و در برخی موارد والدین تحت تکفل) واجد شرایط هستند.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>هر عضو باید <strong>۱۰۰٪ IPREM اضافه</strong> (€۶۰۰/ماه یا €۷,۲۰۰/سال) اثبات کند.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>هر عضو باید <strong>مستقلاً</strong> شرایط عمومی (بیمه، مسکن) را برآورده کند.</span></li>
            </ul>
          </div>

          {/* --- هزینه زندگی --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Utensils className="h-6 w-6 text-amber-400" /> 🏙️ هزینه زندگی در اسپانیا (۲۰۲۶)
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-4">
              <table className="w-full text-xs md:text-sm text-right">
                <thead className="bg-white/5 text-orange-300 font-bold">
                  <tr>
                    <th className="p-3">شهر</th>
                    <th className="p-3">اجاره ماهانه (T2)</th>
                    <th className="p-3">هزینه کل ماهانه</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="p-3 text-slate-200">مادرید</td><td className="p-3 font-black text-white">€۱,۲۰۰ – €۱,۸۰۰</td><td className="p-3 text-slate-300">€۲,۰۰۰ – €۲,۸۰۰</td></tr>
                  <tr><td className="p-3 text-slate-200">بارسلونا</td><td className="p-3 font-black text-white">€۱,۳۰۰ – €۲,۰۰۰</td><td className="p-3 text-slate-300">€۲,۱۰۰ – €۳,۰۰۰</td></tr>
                  <tr><td className="p-3 text-slate-200">والنسیا</td><td className="p-3 font-black text-white">€۸۰۰ – €۱,۲۰۰</td><td className="p-3 text-slate-300">€۱,۵۰۰ – €۲,۱۰۰</td></tr>
                  <tr><td className="p-3 text-slate-200">سویا / بیلبائو</td><td className="p-3 font-black text-white">€۷۰۰ – €۱,۱۰۰</td><td className="p-3 text-slate-300">€۱,۴۰۰ – €۲,۰۰۰</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* --- دلایل رد --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <FileWarning className="h-6 w-6 text-red-400" /> ⚠️ شایع‌ترین دلایل رد درخواست (۲۰۲۶)
            </h2>
            <div className="space-y-2">
              {[
                { title: 'اثبات مالی ناکافی یا محاسبه نادرست', desc: 'استفاده از IPREM ۱۴ پرداخت به‌جای ۱۲ پرداخت، یا ارائه درآمد فعال (حقوق) به‌جای درآمد غیرفعال — شایع‌ترین دلیل رد.' },
                { title: 'بیمه درمانی نامنطبق', desc: 'بیمه دارای copago، دوره انتظار، سقف سالانه کمتر از €۳۰,۰۰۰، یا بیمه مسافرتی.' },
                { title: 'مدارک ترجمه/آپوستیل نشده', desc: 'تمام اسناد خارجی باید Apostille و ترجمه رسمی اسپانیایی شوند.' },
                { title: 'نشانه‌هایی از کار ریموت', desc: 'قرارداد کاری، ایمیل‌های کاری، پروفایل لینکدین فعال.' },
                { title: 'مدارک منقضی یا ناقص', desc: 'گواهی عدم سوءپیشینه قدیمی‌تر از ۳ ماه، پاسپورت با اعتبار کمتر از ۱ سال.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 border border-red-400/20">
                  <Ban className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">{item.title}</div>
                    <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- مقایسه ویزاها --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-indigo-400" /> 🆚 NLV در برابر سایر ویزاها
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-xs md:text-sm text-right">
                <thead className="bg-white/5 text-indigo-300 font-bold">
                  <tr>
                    <th className="p-3">ویژگی</th>
                    <th className="p-3">NLV</th>
                    <th className="p-3">Digital Nomad</th>
                    <th className="p-3">Golden Visa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="p-3 text-slate-200">اجازه کار</td><td className="p-3 text-rose-300">❌ ممنوع</td><td className="p-3 text-emerald-300">✅ بله</td><td className="p-3 text-rose-300">❌ ممنوع</td></tr>
                  <tr><td className="p-3 text-slate-200">سرمایه‌گذاری</td><td className="p-3 text-emerald-300">❌ لازم نیست</td><td className="p-3 text-emerald-300">❌ لازم نیست</td><td className="p-3 text-amber-300">✅ €۵۰۰k+</td></tr>
                  <tr><td className="p-3 text-slate-200">درآمد</td><td className="p-3 text-slate-300">€۲,۴۰۰/ماه</td><td className="p-3 text-slate-300">€۲,۸۴۹/ماه</td><td className="p-3 text-slate-300">—</td></tr>
                  <tr><td className="p-3 text-slate-200">وضعیت ۲۰۲۶</td><td className="p-3 text-emerald-300">✅ فعال</td><td className="p-3 text-emerald-300">✅ فعال</td><td className="p-3 text-rose-300">❌ لغو شده</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* --- نتیجه‌گیری --- */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-orange-400" /> 🎯 نتیجه‌گیری
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              ویزای غیرانتفاعی اسپانیا با درآمد <strong className="text-white">€۲,۴۰۰ در ماه</strong> یا
              <strong className="text-white"> €۲۸,۸۰۰ در سال</strong> (۴۰۰٪ IPREM)، بیمه خصوصی بدون copago،
              TIE در ۳۰ روز و مسیر روشن به <strong className="text-white">اقامت دائم ۵ ساله</strong> و
              <strong className="text-white">تابعیت ۱۰ ساله</strong>، یکی از جذاب‌ترین مسیرهای اقامت
              غیرسرمایه‌گذاری در اروپا است. کلید موفقیت: <strong className="text-orange-300">پرونده‌سازی دقیق</strong>،
              درک صحیح الزام <strong className="text-amber-300">۸۰۰٪ IPREM برای تمدید</strong> و انتخاب بیمه و مسکن مناسب.
              اگر درآمد غیرفعال یا پس‌انداز شما با آستانه‌های ۲۰۲۶ همخوانی دارد، توصیه می‌کنیم از همین حالا پرونده خود را
              با کارشناسان دیاکو آماده کنید.
            </p>
          </div>
        </div>
      </article>

      {/* ============================================================
          مزایا و معایب
         ============================================================ */}
      <section id="pros-cons" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><TrendingUp className="h-4 w-4" /> ارزیابی صادقانه</span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">⚖️ مزایا و معایب ویزای غیرانتفاعی اسپانیا</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-emerald-400/30 bg-emerald-500/5 p-6">
              <div className="flex items-center gap-2 mb-5">
                <ThumbsUp className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-black text-emerald-300">✅ مزایا ({pros.length})</h3>
              </div>
              <ul className="space-y-3">
                {pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">{p.title}</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{p.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-red-400/30 bg-red-500/5 p-6">
              <div className="flex items-center gap-2 mb-5">
                <ThumbsDown className="h-5 w-5 text-red-400" />
                <h3 className="text-lg font-black text-red-300">❌ معایب ({cons.length})</h3>
              </div>
              <ul className="space-y-3">
                {cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">{c.title}</div>
                      <div className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{c.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          نمونه ویزاهای صادرشده
         ============================================================ */}
      <section id="samples" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><Award className="h-4 w-4" /> سابقه موفق</span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">🏆 نمونه ویزاهای صادرشده هلدینگ دیاکو</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleVisas.map((v, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-orange-400/40 transition group">
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                  <img src={v.image} alt={v.alt} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition blur-[1.5px]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-[#061a21]/70 to-transparent" />
                  <div className="absolute top-3 right-3 rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-black text-white flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> صادر شد
                  </div>
                  <div className="absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-mono text-slate-300">{v.id}</div>
                  <div className="absolute bottom-3 right-3 left-3">
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider">Sample Non-Lucrative Visa</div>
                    <div className="text-sm font-black text-white">{v.type}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><div className="text-[10px] text-slate-500">متقاضی</div><div className="font-bold text-white">{v.name}</div></div>
                    <div><div className="text-[10px] text-slate-500">شهر</div><div className="font-bold text-white flex items-center gap-1"><MapPin className="h-3 w-3 text-orange-400" />{v.city}</div></div>
                    <div><div className="text-[10px] text-slate-500">پروفایل</div><div className="font-bold text-white text-[10px]">{v.profile}</div></div>
                    <div><div className="text-[10px] text-slate-500">تاریخ</div><div className="font-bold text-amber-300 text-[10px]">{v.date}</div></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          نظرات تفصیلی
         ============================================================ */}
      <section id="reviews" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><Star className="h-4 w-4" /> تجربه واقعی</span>
            <h2 className="text-2xl md:text-3xl font-black mb-2">⭐ نظر دو متقاضی موفق دیاکو</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailedTestimonials.map((t, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-orange-400/30 transition">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/50 shrink-0">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-black text-white">{t.name}</h3>
                      <span className="text-[9px] rounded-full bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-300 flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5" /> تأیید شده</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{t.role} — {t.company}</div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{t.city}</span><span>·</span>
                      <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{t.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {[0,1,2,3,4].map((s) => <Star key={s} className={`h-3 w-3 ${s < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />)}
                  </div>
                </div>
                <Quote className="h-6 w-6 text-orange-400/40 mb-2" />
                <blockquote className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4 text-justify">{t.text}</blockquote>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2 text-[11px]">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-slate-400">مسیر:</span>
                    <span className="font-bold text-amber-300">{t.scheme}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ
         ============================================================ */}
      <section id="faq" className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">❓ پرسش‌های متداول ۲۰۲۶</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button type="button" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-orange-300 transition"
                aria-expanded={openFaq === idx}>
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-orange-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          مقالات مرتبط
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-xl md:text-2xl font-black text-center mb-6">📚 مقالات مرتبط</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {relatedArticles.map((r, i) => (
            <a key={i} href={r.href} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-orange-400/40 transition">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-bold text-white group-hover:text-orange-300 transition">{r.title}</h3>
                <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-orange-400 shrink-0 mt-0.5" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{r.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ============================================================
          CTA نهایی
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-orange-400/30 bg-gradient-to-l from-orange-500/10 via-orange-400/5 to-transparent p-6 md:p-10 text-center">
          <Sparkles className="h-8 w-8 text-orange-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-black mb-2">🚀 پرونده خود را برای ویزای غیرانتفاعی آماده کنید</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            کارشناسان دیاکو درآمد غیرفعال یا پس‌انداز شما را ارزیابی می‌کنند، مدارک را دقیق بسته‌بندی می‌کنند و شما را در انتخاب شهر و کنسولگری مناسب راهنمایی می‌کنند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110">
              ارزیابی شانس ویزای غیرانتفاعی
            </button>
            <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold hover:bg-white/10 inline-flex items-center gap-2">
              <Copy className="h-4 w-4 text-orange-400" />
              {copiedPhone ? 'شماره کپی شد!' : 'مشاوره مستقیم با کارشناسان'}
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          فوتر
         ============================================================ */}
      <footer className="border-t border-white/10 bg-[#041418]">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3"><Landmark className="h-6 w-6 text-orange-400" /><span className="font-black">دیاکو</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">هلدینگ مهاجرتی دیاکو — خدمات تخصصی اقامت تمکن مالی در اسپانیا و اروپا.</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4" /><span>مشاوره تخصصی و شفاف</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#article" className="hover:text-orange-300">مقاله</a></li>
                <li><a href="#income" className="hover:text-orange-300">درآمد</a></li>
                <li><a href="#renewal" className="hover:text-orange-300">تمدید</a></li>
                <li><a href="#pros-cons" className="hover:text-orange-300">مزایا و معایب</a></li>
                <li><a href="#faq" className="hover:text-orange-300">سوالات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">تماس با ما</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2"><Phone className="h-3 w-3 text-orange-400" /> ۰۹۱۹۷۳۴۰۸۲۹</li>
                <li className="flex items-center gap-2"><Phone className="h-3 w-3 text-orange-400" /> ۰۲۱۹۱۶۹۳۹۵۵</li>
                <li className="flex items-center gap-2"><Mail className="h-3 w-3 text-orange-400" /> Admin@dia-co.ir</li>
                <li className="flex items-center gap-2"><Globe className="h-3 w-3 text-orange-400" /> www.dia-co.ir</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">شبکه‌های اجتماعی</h4>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <a href="https://instagram.com/diaco.consulting1" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 inline-flex items-center gap-1">
                  <Instagram className="h-3 w-3" /> اینستاگرام
                </a>
                <a href="https://wa.me/989197340829" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 inline-flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" /> واتساپ
                </a>
              </div>
              <p className="text-[10px] text-slate-500 mt-4">© ۲۰۲۶ دیاکو. تمامی حقوق محفوظ است.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================
          نوار CTA شناور موبایل
         ============================================================ */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#061a21]/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-2">
        <button type="button" onClick={onOpenAssessment} className="flex-1 rounded-xl bg-[#f5a623] py-2.5 text-xs font-black text-[#082833]">ارزیابی رایگان</button>
        <button type="button" onClick={handleCopyPhone} className="rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-xs font-bold inline-flex items-center gap-1.5">
          <PhoneCall className="h-4 w-4 text-emerald-400" /> تماس
        </button>
      </div>
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default FinancialSpainPage;