import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  FileCheck2,
  ShieldCheck,
  Clock,
  Euro,
  BookOpen,
  ExternalLink,
  AlertTriangle,
  List,
  Award,
  Calendar,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const RECOGNITION_BODIES = [
  {
    country: 'آلمان 🇩🇪',
    body: 'ZAB (Zentralstelle für ausländisches Bildungswesen)',
    purpose: 'ارزیابی مدرک دانشگاهی، بررسی Anabin (وضعیت H+) و صدور گواهی Statement of Comparability',
    cost: '۲۰۰ تا ۶۰۰ یورو',
  },
  {
    country: 'اتریش 🇦🇹',
    body: 'دانشگاه‌های دولتی مقصد (مثل دانشگاه وین) یا مرکز ارزیابی',
    purpose: 'معادلسازی (Nostrifizierung) جهت ادامه تحصیل، پرستاری، پزشکی یا تایید مدرک تخصصی',
    cost: '۱۵۰ تا ۴۰۰ یورو (بسته به رشته)',
  },
  {
    country: 'کانادا 🇨🇦',
    body: 'WES (World Education Services)',
    purpose: 'ارزشیابی مدرک (ECA) برای سیستم اکسپرس انتری و پذیرش دانشگاه‌ها',
    cost: '۲۲۰ تا ۳۰۰ دلار کانادا + پست',
  },
  {
    country: 'سطح اروپا 🇪🇺',
    body: 'شبکه ENIC-NARIC',
    purpose: 'مرکز اروپایی اطلاعات و شناسایی مدارک تحصیلی در کشورهای عضو',
    cost: 'متغیر بر اساس کشور مقصد',
  },
];

const STEPS = [
  {
    step: 'گام اول',
    title: 'بررسی اعتبار دانشگاه در پایگاه داده Anabin (مخصوص آلمان)',
    detail: 'پیش از هر اقدامی بررسی کنید دانشگاه و رشته شما در سایت Anabin دارای وضعیت H+ (مورد تایید) باشد.',
  },
  {
    step: 'گام دوم',
    title: 'ترجمه رسمی مدارک',
    detail: 'ترجمه دانشنامه، ریزنمرات و گواهی‌های تحصیلی به زبان کشور مقصد (یا انگلیسی) توسط دارالترجمه رسمی با مهر دادگستری و وزارت امور خارجه.',
  },
  {
    step: 'گام سوم',
    title: 'ثبت‌نام آنلاین در سایت سازمان مرجع',
    detail: 'ایجاد حساب کاربری در پورتال سازمان مربوطه (مثلاً ZAB آلمان)، تکمیل فرم‌ها و آپلود اسکن مدارک ترجمه‌شده.',
  },
  {
    step: 'گام چهارم',
    title: 'پرداخت هزینه بررسی پرونده',
    detail: 'پرداخت هزینه‌های دولتی سازمان ارزیابی (۲۰۰ تا ۶۰۰ یورو در ZAB یا ۲۲۰ تا ۳۰۰ دلار در WES) از طریق کارت‌های بین‌المللی.',
  },
  {
    step: 'گام پنجم',
    title: 'دریافت نتیجه نهایی (Statement of Comparability)',
    detail: 'پس از بررسی کارشناسان (معمولاً ۲ تا ۶ ماه / میانگین ۱۲–۱۶ هفته)، گواهی رسمی معادلسازی صادر می‌شود.',
  },
];

const faqs = [
  {
    q: 'آیا برای معادلسازی مدرک تحصیلی نیاز به مدرک زبان داریم؟',
    a: 'برای سازمان‌هایی مانند ZAB آلمان در مرحله ارزشیابی مدرک تحصیلی، ارائه مدرک زبان الزامی نیست؛ اما برای کارفرمایان یا ورود به دانشگاه‌ها و برخی مشاغل قانونمند، ارائه مدرک زبان پیش‌نیاز است.',
  },
  {
    q: 'اگر دانشگاه من در سایت Anabin آلمان تایید نشده باشد چه کنیم؟',
    a: 'اگر دانشگاه در وضعیت H- باشد، مدارک آن ارزش‌گذاری نمی‌شوند. اما اگر وضعیت نامشخص (H+/-) داشته باشد، باید درخواست بررسی ویژه (Statement for a specific university degree) به همراه ریزنمرات و سرفصل‌های ترجمه‌شده ارسال شود.',
  },
  {
    q: 'تفاوت معادلسازی مدرک دانشگاهی با ارزشیابی مشاغل (Berufliche Anerkennung) چیست؟',
    a: 'ارزشیابی مدرک تحصیلی (ZAB) صرفاً ارزش آکادمیک مدرک را مشخص می‌کند؛ اما معادلسازی شغلی برای مشاغلی مانند پرستاری، پزشکی یا مهندسی‌های خاص انجام می‌شود که نیازمند تطبیق کامل سرفصل‌های حرفه‌ای با قوانین کشور مقصد است.',
  },
  {
    q: 'آیا ترجمه مدارک در ایران توسط دارالترجمه رسمی برای اروپا کافی است؟',
    a: 'بله؛ ترجمه رسمی دادگستری و وزارت امور خارجه ایران به همراه مهر مترجم رسمی، در تمامی سفارت‌ها و سازمان‌های اروپایی معتبر است.',
  },
];

const tocItems = [
  { id: 'what-is-recognition', label: 'معادلسازی مدرک چیست و چرا حیاتی است؟' },
  { id: 'recognition-bodies', label: 'سازمان‌های مرجع اروپا و جهان (۲۰۲۶)' },
  { id: 'step-by-step-process', label: 'مراحل ۵گانه معادلسازی مدارک' },
  { id: 'required-documents', label: 'چک‌لیست مدارک لازم' },
  { id: 'costs-and-timeline', label: 'هزینه‌ها و زمان‌بندی انتظار' },
  { id: 'expert-insights', label: 'نکات Anabin (H+/-) و تجربه دیاکو' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const DegreeRecognitionPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'معادلسازی مدرک تحصیلی برای مهاجرت ۲۰۲۶-۲۰۲۷ | فرآیند، هزینه و سازمان‌ها | دیاکو',
    description:
      'راهنمای جامع معادلسازی مدارک تحصیلی در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی فرآیند ارزشیابی مدارک برای ZAB آلمان، Anabin، اتریش، WES کانادا و مشاوره دیاکو.',
    canonical: 'https://www.dia-co.ir/degree-recognition-for-immigration',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'معادلسازی مدرک تحصیلی برای مهاجرت',
      'تاییدیه ZAB آلمان ۲۰۲۶',
      'بررسی دانشگاه در Anabin H+',
      'ارزشیابی مدرک WES کانادا',
      'Zeugnisbewertung 2026',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/degree-recognition-for-immigration/#article',
          headline: 'معادلسازی مدرک تحصیلی برای مهاجرت ۲۰۲۶-۲۰۲۷ | فرآیند، هزینه و سازمان‌ها',
          description:
            'راهنمای جامع معادلسازی مدارک تحصیلی در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی فرآیند ارزشیابی مدارک برای آلمان و اروپا، سازمان‌های مرجع و مشاوره دیاکو.',
          image: [
            'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T10:00:00+03:30',
          dateModified: '2026-11-14T12:30:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان حقوقی هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          reviewedBy: {
            '@type': 'Organization',
            name: 'دفتر اجرایی هلدینگ دیاکو در اروپا',
            url: 'https://www.dia-co.ir/',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://www.dia-co.ir/#organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
            logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' },
          },
          citation: ['https://www.kmk.org/zab/', 'https://www.wes.org/'],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/degree-recognition-for-immigration',
          },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/degree-recognition-for-immigration/#howto',
          name: 'مراحل گام‌به‌گام معادلسازی مدرک تحصیلی (ZAB / WES / ENIC)',
          step: STEPS.map((s, idx) => ({
            '@type': 'HowToStep',
            position: idx + 1,
            name: s.title,
            text: s.detail,
          })),
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/degree-recognition-for-immigration/#faq',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://www.dia-co.ir/' },
            { '@type': 'ListItem', position: 2, name: 'مقالات تخصصی', item: 'https://www.dia-co.ir/blog' },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'معادلسازی مدرک تحصیلی',
              item: 'https://www.dia-co.ir/degree-recognition-for-immigration',
            },
          ],
        },
      ],
    },
  });

  const handleLinkNav = (page: string, slug?: string) => (e: React.MouseEvent) => {
    if (!e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (slug && onNavigateToBlogPost) onNavigateToBlogPost(slug);
      else if (onNavigateToPage) onNavigateToPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-[#061a21] text-white font-sans" dir="rtl">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061a21]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
            >
              <ArrowRight className="h-4 w-4 text-amber-400" />
              <span>بازگشت به صفحه اصلی</span>
            </button>
            <span className="text-white/20">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-sm font-black text-amber-300">
              <FileCheck2 className="h-4 w-4 text-emerald-400" />
              معادلسازی مدرک تحصیلی (ZAB / WES)
            </span>
          </div>
          <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-200">
            <a href="#what-is-recognition" className="hover:text-amber-300">اهمیت</a>
            <a href="#recognition-bodies" className="hover:text-amber-300">سازمان‌های مرجع</a>
            <a href="#step-by-step-process" className="hover:text-amber-300">مراحل ۵گانه</a>
            <a href="#costs-and-timeline" className="hover:text-amber-300">هزینه و زمان</a>
            <a href="#faq" className="hover:text-amber-300">سوالات متداول</a>
          </nav>
          <button
            type="button"
            onClick={onOpenAssessment}
            className="rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
          >
            استعلام وضعیت Anabin و ZAB
          </button>
        </div>
      </header>

      <section className="container mx-auto px-4 md:px-8 pt-10 pb-12 max-w-5xl space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300">
          <Sparkles className="h-4 w-4" />
          راهنمای مرجع ۲۰۲۶–۲۰۲۷ | ZAB آلمان، Anabin (H+)، اتریش و WES کانادا
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
          راهنمای جامع معادلسازی مدرک تحصیلی برای مهاجرت (۲۰۲۶–۲۰۲۷):{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-emerald-400">
            فرآیند، مدارک و سازمان‌ها
          </span>
        </h1>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <Award className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-[11px]">نویسنده:</span>
              <strong className="text-white">دپارتمان حقوقی دیاکو</strong>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-[11px]">بازبینی:</span>
              <strong className="text-emerald-300">دفتر اجرایی اروپا (وین)</strong>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="h-4 w-4 text-sky-400 shrink-0" />
            <span>به‌روزرسانی: <strong>نوامبر ۲۰۲۶</strong></span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-slate-300">
            <ExternalLink className="h-4 w-4 text-amber-400 shrink-0" />
            <a href="https://www.kmk.org/zab/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline font-bold">
              kmk.org/zab
            </a>
            <span>•</span>
            <a href="https://www.wes.org/" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline font-bold">
              wes.org
            </a>
          </div>
        </div>

        {/* BLUF */}
        <div className="rounded-2xl border-r-4 border-[#f5a623] bg-[#0a2a35] p-5 shadow-lg">
          <div className="text-xs font-black text-amber-300 mb-2">
            خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج هوشمند):
          </div>
          <p className="text-sm text-slate-100 leading-8 text-justify">
            <strong>معادلسازی مدرک تحصیلی (Degree Recognition / Zeugnisbewertung)</strong> یکی از نخستین و حیاتی‌ترین گام‌ها برای مهاجرت کاری، تخصصی یا تحصیلی به کشورهای توسعه‌یافته در سال‌های ۲۰۲۶ و ۲۰۲۷ است. این فرآیند ثابت می‌کند که مدرک دانشگاهی شما در ایران با چه سطحی در نظام آموزشی مقصد (آلمان، اتریش یا کانادا) تطابق دارد. برای شروع به ترجمه رسمی مدارک (دانشنامه و ریزنمرات)، تاییدیه دادگستری و وزارت امور خارجه و ثبت درخواست در سازمان‌های مرجع مانند{' '}
            <strong>ZAB</strong> در آلمان نیاز دارید.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onOpenAssessment}
            className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
          >
            درخواست بررسی رایگان وضعیت دانشگاه در Anabin
          </button>
          <a
            href="/blog/degree-recognition-for-immigration"
            onClick={handleLinkNav('blog-post', 'degree-recognition-for-immigration')}
            className="rounded-2xl border border-amber-400/40 bg-amber-500/10 px-5 py-3.5 text-xs sm:text-sm font-bold text-amber-200 hover:bg-amber-500/20 transition inline-flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4 text-amber-300" />
            نسخه کامل مقاله در بخش مقالات دیاکو
          </a>
        </div>

        {/* TOC */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2 text-xs font-black text-amber-300 mb-3">
            <List className="h-4 w-4" />
            <span>فهرست مطالب راهنمای معادلسازی مدارک</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            {tocItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 px-3 py-2 text-slate-200 hover:text-amber-300 transition"
              >
                <span className="text-amber-400 font-black">{idx + 1}.</span>
                <span className="truncate">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 max-w-5xl space-y-14 pb-20">
        {/* 1. Importance */}
        <div id="what-is-recognition" className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-black">معادلسازی مدرک تحصیلی چیست و چرا اهمیت دارد؟</h2>
          <p className="text-sm text-slate-200 leading-8 text-justify">
            هنگامی که با ویزای کاری (مانند بلوکارت یا کارت شانس) یا ادامه تحصیل به اروپا مهاجرت می‌کنید، کارفرما، اداره مهاجرت و دانشگاه‌ها باید از تطابق مدرک کارشناسی، ارشد یا دکتری شما با نظام آموزشی خود مطمئن شوند:
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-xs sm:text-sm">
            {[
              { title: '۱. الزام قانونی ویزا', text: 'سفارتخانه‌ها برای صدور ویزای کاری تخصصی، تاییدیه رسمی معادلسازی یا مدرک H+ را مطالبه می‌کنند.' },
              { title: '۲. اجازه کار در مشاغل قانونمند (Regulated)', text: 'مشاغلی مثل پزشکی، پرستاری، مهندسی عمران ارشد، معلمی و حقوق نیازمند تطبیق قطعی سرفصل‌ها هستند.' },
              { title: '۳. اعتبارسنجی در بازار کار', text: 'کارفرمایان اروپایی پیش از استخدام نیازمند سند دولتی رسمی برای تایید ارزش علمی مدرک شما هستند.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <h3 className="font-bold text-amber-300 mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-6">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Bodies Table */}
        <div id="recognition-bodies" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl font-black">سازمان‌های مرجع ارزشیابی مدارک در اروپا و جهان (۲۰۲۶)</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-xs md:text-sm text-right">
              <thead className="bg-white/5 text-amber-300 font-bold">
                <tr>
                  <th className="p-4">کشور مقصد</th>
                  <th className="p-4">سازمان مرجع اصلی</th>
                  <th className="p-4">نوع تاییدیه و کاربرد</th>
                  <th className="p-4">برآورد کارمزد دولتی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-white/[0.02]">
                {RECOGNITION_BODIES.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-4 font-bold text-white">{row.country}</td>
                    <td className="p-4 text-emerald-300 font-bold">{row.body}</td>
                    <td className="p-4 text-slate-300">{row.purpose}</td>
                    <td className="p-4 text-amber-300 font-bold">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Steps */}
        <div id="step-by-step-process" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl font-black">مراحل گام‌به‌گام معادلسازی مدارک دانشگاهی</h2>
          <div className="space-y-3">
            {STEPS.map((s, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-start gap-4">
                <span className="rounded-xl bg-[#f5a623]/15 border border-amber-400/30 px-3 py-1.5 text-xs font-black text-amber-300 shrink-0">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white mb-1">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-6">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 & 5. Docs + Costs */}
        <div className="grid md:grid-cols-2 gap-6">
          <div id="required-documents" className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
            <h2 className="text-xl font-black">مدارک لازم برای شروع فرآیند ارزشیابی</h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 leading-6">
              {[
                'اصل دانشنامه کارشناسی، ارشد یا دکتری به همراه ریزنمرات کامل تمام ترم‌ها',
                'مدرک دیپلم و پیش‌دانشگاهی (در صورت نیاز پرونده)',
                'ترجمه رسمی دقیق دارای مهر دادگستری و وزارت امور خارجه',
                'رزومه تحصیلی و کاری (CV) ساختاریافته + اسکن صفحه اول پاسپورت معتبر',
                'فرم درخواست امضاشده سازمان مرجع در پورتال ثبت‌نام',
              ].map((doc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="costs-and-timeline" className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Euro className="h-5 w-5 text-amber-400" />
              هزینه‌ها و زمان‌بندی دقیق (۲۰۲۶)
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-6">
              <div className="rounded-xl bg-white/[0.02] border border-white/10 p-3.5">
                <strong className="text-amber-300 block">ارزشیابی مدرک در ZAB آلمان:</strong>
                بین ۲۰۰ تا ۶۰۰ یورو (بسته به نوع و تعداد مدارک).
              </div>
              <div className="rounded-xl bg-white/[0.02] border border-white/10 p-3.5">
                <strong className="text-amber-300 block">ارزشیابی در WES کانادا:</strong>
                حدود ۲۲۰ تا ۳۰۰ دلار کانادا به علاوه هزینه‌های پست.
              </div>
              <div className="rounded-xl bg-white/[0.02] border border-white/10 p-3.5 flex items-start gap-2">
                <Clock className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-emerald-300">زمان انتظار و ترجمه:</strong> ترجمه رسمی حدود ۳ تا ۷ میلیون تومان؛ زمان رسیدگی سازمان مرجع معمولاً ۲ تا ۶ ماه (میانگین ۱۲ تا ۱۶ هفته).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Gain */}
        <div id="expert-insights" className="scroll-mt-24 rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-[#0a2934] to-[#0a2934] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-7 w-7 text-amber-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-amber-300 mb-3">
                چالش‌های واقعی پرونده‌ها و نکات کلیدی هلدینگ دیاکو (Information Gain)
              </h2>
              <p className="text-sm text-slate-200 leading-8 text-justify">
                شایع‌ترین دلیل تاخیر در سازمان ZAB آلمان، <strong>«مبهم بودن ترجمه واحدهای درسی یا ثبت بودن دانشگاه با وضعیت H+/- در پایگاه داده Anabin»</strong> است. در این شرایط، پرونده وارد مرحله بررسی تفصیلی سرفصل‌ها می‌شود. تیم حقوقی دیاکو پیش از ارسال مدارک، وضعیت دقیق دانشگاه و رشته شما را در Anabin بررسی کرده و با تهیه Cover Letter تخصصی و نقشه تطبیق دروس، صدور گواهی نهایی را تسریع می‌بخشد.
              </p>
            </div>
          </div>
        </div>

        {/* Internal Links */}
        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <a
            href="/document-checker"
            onClick={handleLinkNav('document-checker')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">چک‌لیست هوشمند مدارک سفارت ↗</div>
            <p className="text-slate-400">ابزار بررسی تاییدات دادگستری، وزارت خارجه و لگالایز مدارک.</p>
          </a>
          <a
            href="/german-blue-card"
            onClick={handleLinkNav('german-blue-card')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">بلوکارت آلمان ۲۰۲۶ ↗</div>
            <p className="text-slate-400">استفاده از تاییدیه ZAB / Anabin برای اقامت کاری سریع نخبگان.</p>
          </a>
          <a
            href="/jobseeker-germany"
            onClick={handleLinkNav('jobseeker-germany')}
            className="rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/40 p-4 transition block"
          >
            <div className="font-black text-white mb-1">کارت شانس آلمان (Chancenkarte) ↗</div>
            <p className="text-slate-400">کسب ۴ امتیاز فوری از طریق معادل‌سازی مدرک دانشگاهی.</p>
          </a>
        </div>

        {/* FAQ */}
        <div id="faq" className="scroll-mt-24">
          <h2 className="text-2xl font-black text-center mb-6">سوالات متداول (FAQ)</h2>
          <div className="space-y-3">
            {faqs.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-amber-300 transition cursor-pointer"
                  aria-expanded={openFaq === idx}
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-l from-emerald-900/50 to-[#0a2a33] border border-emerald-400/20 p-8 text-center">
          <h2 className="text-2xl font-black mb-3">آماده معادلسازی مدارک و شروع مهاجرت هستید؟</h2>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            تیم متخصصان حقوقی هلدینگ دیاکو وضعیت دانشگاه شما را در Anabin بررسی و پرونده ZAB یا WES را از ابتدا تا صدور گواهی نهایی پیگیری می‌کند.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-8 py-3.5 text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
            >
              شروع فرآیند ارزیابی مدرک
            </button>
            <a
              href="https://wa.me/989197340829"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              ۰۲۱-۹۱۶۹۳۹۵۵ | واتساپ ۰۹۱۹۷۳۴۰۸۲۹
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DegreeRecognitionPage;
