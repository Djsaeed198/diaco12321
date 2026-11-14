import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Globe,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Landmark,
  BookOpen,
  ExternalLink,
  AlertTriangle,
  List,
  Award,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
  onNavigateToPage?: (page: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

const TOP_COUNTRIES = [
  {
    rank: '۱',
    name: 'سوئیس 🇨🇭',
    score: '۶۰.۸ از ۱۰۰',
    advantage: 'بالاترین پتانسیل درآمدی در جهان، امنیت فوق‌العاده و زیرساخت بی‌نظیر',
    target: 'متخصصان ارشد و مدیران بین‌المللی',
    page: 'country-guide',
  },
  {
    rank: '۲',
    name: 'کانادا 🇨🇦',
    score: '۹.۴ از ۱۰ (شاخص کار)',
    advantage: 'سیستم شفاف اکسپرس انتری، سرعت بالای پردازش اقامت دائم و جامعه چندفرهنگی',
    target: 'نیروی کار ماهر و خانواده‌ها',
    page: 'academic-canada',
  },
  {
    rank: '۳',
    name: 'آلمان 🇩🇪',
    score: '۵۸.۷ از ۱۰۰',
    advantage: 'بزرگ‌ترین اقتصاد اروپا، کارت فرصت (Opportunity Card) و بلوکارت تسهیل‌شده',
    target: 'مهندسان، پزشکان و متخصصان IT',
    page: 'german-blue-card',
  },
  {
    rank: '۴',
    name: 'استرالیا 🇦🇺',
    score: '۵۹.۰ از ۱۰۰',
    advantage: 'دستمزدهای بسیار بالا، اقلیم مناسب، کیفیت عالی بهداشت و محیط زیست',
    target: 'پزشکان، پرستاران و کادر درمان',
    page: 'country-guide',
  },
  {
    rank: '۵',
    name: 'امارات (دبی) 🇦🇪',
    score: '۸.۷ از ۱۰',
    advantage: 'صفر درصد مالیات بر درآمد شخصی، ویزای طلایی ۱۰ ساله و رشد پرشتاب کسب‌وکارها',
    target: 'کارآفرینان، سرمایه‌گذاران و فریلنسرها',
    page: 'business-dubai',
  },
];

const faqs = [
  {
    q: 'آسان‌ترین کشور برای مهاجرت در سال ۲۰۲۶ کدام است؟',
    a: 'کشورهایی که برنامه‌های سرمایه‌گذاری (مثل ویزاهای طلایی یونان، پرتغال یا مجارستان) یا ویزاهای جستجوی کار انعطاف‌پذیر (مثل کارت فرصت آلمان) دارند، به دلیل شفافیت قوانین، فرآیند نسبتاً آسانتری نسبت به اقامت‌های دائم سنتی دارند.',
  },
  {
    q: 'آیا برای مهاجرت به کانادا حتماً مدرک زبان لازم است؟',
    a: 'بله؛ سیستم مهاجرتی کانادا (Express Entry) کاملاً مبتنی بر امتیازدهی است و تسلط به زبان انگلیسی یا فرانسوی نقش کلیدی در کسب امتیاز قبولی دارد.',
  },
  {
    q: 'بهترین کشور اروپایی برای دریافت اقامت دائم سریع کدام است؟',
    a: 'برخی کشورهای اروپایی از طریق برنامه‌های سرمایه‌گذاری یا خرید ملک مسیرهای میانبری ارائه می‌دهند، اما در روش‌های کاری، کشورهایی مانند آلمان پس از ۳ تا ۵ سال کار و پرداخت مالیات (و با بلوکارت حتی ۲۱ تا ۳۳ ماه)، اقامت دائم اعطا می‌کنند.',
  },
];

const tocItems = [
  { id: 'criteria', label: 'معیارهای انتخاب بهترین کشور (۲۰۲۶)' },
  { id: 'top-5-countries', label: 'رتبه‌بندی ۵ کشور برتر جهان (۲۰۲۶–۲۰۲۷)' },
  { id: 'best-by-goal', label: 'بهترین کشور بر اساس هدف (کار، تحصیل، سرمایه)' },
  { id: 'expert-insights', label: 'نکته تجربی دیاکو (Information Gain)' },
  { id: 'faq', label: 'سوالات متداول (FAQ)' },
];

export const BestCountries2026Page: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
  onNavigateToBlogPost,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedGoal, setSelectedGoal] = useState<'work' | 'invest' | 'study'>('work');

  useSeo({
    title: 'بهترین کشور برای مهاجرت ۲۰۲۶-۲۰۲۷ | رتبه‌بندی مقاصد برتر کاری و زندگی | دیاکو',
    description:
      'راهنمای جامع انتخاب بهترین کشور برای مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی سوئیس، کانادا، آلمان، استرالیا و امارات از نظر درآمد، رفاه و ویزا.',
    canonical: 'https://www.dia-co.ir/best-countries-to-immigrate-to',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&h=600&q=80',
    keywords: [
      'بهترین کشور برای مهاجرت ۲۰۲۶',
      'رتبه‌بندی مقاصد مهاجرتی ۲۰۲۷',
      'مهاجرت کاری آلمان و کانادا',
      'سرمایه‌گذاری دبی و پرتغال',
      'تحصیل در هلند و اتریش',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/best-countries-to-immigrate-to/#article',
          headline: 'بهترین کشور برای مهاجرت ۲۰۲۶-۲۰۲۷ | رتبه‌بندی مقاصد برتر کاری و زندگی',
          description:
            'راهنمای جامع انتخاب بهترین کشور برای مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷. بررسی سوئیس، کانادا، آلمان، استرالیا و امارات از نظر درآمد، رفاه و ویزا.',
          image: [
            'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&h=600&q=80',
          ],
          datePublished: '2026-11-14T10:00:00+03:30',
          dateModified: '2026-11-14T12:30:00+03:30',
          inLanguage: 'fa-IR',
          author: {
            '@type': 'Organization',
            name: 'دپارتمان تحقیقات بازار هلدینگ مهاجرتی دیاکو',
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
          citation: [
            'https://www.talenteverywhere.org/Mobility-News/Article/the-worlds-top-immigration-destinations-in-2026',
            'https://www.visasupdate.com/post/top-10-best-countries-for-immigration-2026-easiest-visas-highest-salaries',
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://www.dia-co.ir/best-countries-to-immigrate-to',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/best-countries-to-immigrate-to/#faq',
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
              name: 'بهترین کشور برای مهاجرت ۲۰۲۶-۲۰۲۷',
              item: 'https://www.dia-co.ir/best-countries-to-immigrate-to',
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
              <TrendingUp className="h-4 w-4 text-amber-400" />
              رتبه‌بندی مقاصد مهاجرت ۲۰۲۶–۲۰۲۷
            </span>
          </div>
          <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-200">
            <a href="#criteria" className="hover:text-amber-300">معیارها</a>
            <a href="#top-5-countries" className="hover:text-amber-300">۵ کشور برتر</a>
            <a href="#best-by-goal" className="hover:text-amber-300">انتخاب بر اساس هدف</a>
            <a href="#expert-insights" className="hover:text-amber-300">تحلیل دیاکو</a>
            <a href="#faq" className="hover:text-amber-300">سوالات متداول</a>
          </nav>
          <button
            type="button"
            onClick={onOpenAssessment}
            className="rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
          >
            انتخاب بهترین مقصد برای شما
          </button>
        </div>
      </header>

      <section className="container mx-auto px-4 md:px-8 pt-10 pb-12 max-w-5xl space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300">
          <Sparkles className="h-4 w-4" />
          شاخص جهانی مهاجرت (۲۰۲۶–۲۰۲۷) | سوئیس، کانادا، آلمان، استرالیا و امارات
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
          بهترین کشور برای مهاجرت در سال ۲۰۲۶–۲۰۲۷:{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-emerald-400">
            راهنمای جامع انتخاب مقصد
          </span>
        </h1>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <Award className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-[11px]">نویسنده:</span>
              <strong className="text-white">دپارتمان تحقیقات بازار دیاکو</strong>
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
            <a
              href="https://www.talenteverywhere.org/Mobility-News/Article/the-worlds-top-immigration-destinations-in-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:underline font-bold"
            >
              Mobility Index 2026
            </a>
          </div>
        </div>

        {/* BLUF */}
        <div className="rounded-2xl border-r-4 border-[#f5a623] bg-[#0a2a35] p-5 shadow-lg">
          <div className="text-xs font-black text-amber-300 mb-2">
            خلاصه اجرایی و پاسخ سریع (BLUF Box — ویژه استخراج هوشمند):
          </div>
          <p className="text-sm text-slate-100 leading-8 text-justify">
            انتخاب <strong>بهترین کشور برای مهاجرت در سال‌های ۲۰۲۶ و ۲۰۲۷</strong> به شدت به هدف شما (کار، تحصیل، سرمایه‌گذاری یا کیفیت زندگی) بستگی دارد. بر اساس جدیدترین رتبه‌بندی‌های جهانی، <strong>سوئیس، کانادا، آلمان، استرالیا و امارات (دبی)</strong> به عنوان برترین مقاصد مهاجرتی شناخته می‌شوند. کانادا و آلمان همچنان بهترین زیرساخت را برای جذب نیروی کار ماهر (سیستم‌های امتیازی، بلوکارت و کارت شانس / Opportunity Card) دارند، در حالی که امارات و پرتغال جذاب‌ترین مسیرها را برای سرمایه‌گذاران فراهم کرده‌اند.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onOpenAssessment}
            className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
          >
            دریافت نقشه راه متناسب با پروفایل شما
          </button>
          <a
            href="/blog/best-countries-to-immigrate-to"
            onClick={handleLinkNav('blog-post', 'best-countries-to-immigrate-to')}
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
            <span>فهرست مطالب</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
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
        {/* 1. Criteria */}
        <div id="criteria" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl font-black">معیارهای انتخاب بهترین کشور برای مهاجرت در سال ۲۰۲۶</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {[
              { title: 'پتانسیل درآمدی و سطح دستمزد', text: 'میزان درآمد خالص در مقایسه با هزینه‌های واقعی زندگی (قدرت خرید).' },
              { title: 'ثبات اقتصادی و کمبود نیروی کار', text: 'کشورهای درگیر با پیری جمعیت که نیازمند متخصصان بین‌المللی هستند.' },
              { title: 'پایداری سیستم اجتماعی و سلامت', text: 'کیفیت خدمات درمانی، بیمه‌ها، آموزش و امنیت اجتماعی خانواده.' },
              { title: 'سرعت قوانین اقامت و شهروندی', text: 'شفافیت قوانین و زمان رسیدن به اقامت دائم و پاسپورت.' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="font-bold text-amber-300 mb-1.5">{c.title}</h3>
                <p className="text-slate-300 leading-6">{c.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Top 5 Table */}
        <div id="top-5-countries" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl font-black">رتبه‌بندی ۵ کشور برتر جهان برای مهاجرت (۲۰۲۶–۲۰۲۷)</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-xs md:text-sm text-right">
              <thead className="bg-white/5 text-amber-300 font-bold">
                <tr>
                  <th className="p-4">رتبه</th>
                  <th className="p-4">کشور مقصد</th>
                  <th className="p-4">امتیاز شاخص کیفیت مهاجرت</th>
                  <th className="p-4">مزیت اصلی و ویژگی برجسته</th>
                  <th className="p-4">بهترین گروه هدف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-white/[0.02]">
                {TOP_COUNTRIES.map((row) => (
                  <tr key={row.rank} className="hover:bg-white/[0.03] transition">
                    <td className="p-4 font-black text-amber-400">{row.rank}</td>
                    <td className="p-4 font-bold text-white">{row.name}</td>
                    <td className="p-4 text-emerald-300 font-bold">{row.score}</td>
                    <td className="p-4 text-slate-300">{row.advantage}</td>
                    <td className="p-4 text-slate-200">{row.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Best by Goal Selector */}
        <div id="best-by-goal" className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-5">
          <h2 className="text-2xl font-black">بهترین کشورها بر اساس هدف مهاجرت (کار، تحصیل، سرمایه)</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'work', label: 'مهاجرت کاری (تخصص و مهندسی)', icon: Briefcase },
              { id: 'invest', label: 'سرمایه‌گذاری و ثبت شرکت', icon: Landmark },
              { id: 'study', label: 'تحصیل و ورود به بازار کار', icon: GraduationCap },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedGoal(tab.id as any)}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer ${
                  selectedGoal === tab.id
                    ? 'bg-[#f5a623] text-[#082833]'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {selectedGoal === 'work' && (
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 space-y-3 text-sm text-slate-200 leading-7">
              <strong className="text-amber-300 text-base block">آلمان و کانادا (صدرنشین جذب نیروی متخصص):</strong>
              <p>
                آلمان با کمبود شدید نیروی کار فنی و مهندسی (مجهز به کارت فرصت و بلوکارت) و کانادا با سیستم جذب هدفمند از طریق پلتفرم Express Entry در صدر جدول قرار دارند.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-xs">
                <a href="/german-blue-card" onClick={handleLinkNav('german-blue-card')} className="text-amber-300 hover:underline font-bold">
                  بلوکارت آلمان ۲۰۲۶ ↗
                </a>
                <span>•</span>
                <a href="/jobseeker-germany" onClick={handleLinkNav('jobseeker-germany')} className="text-amber-300 hover:underline font-bold">
                  کارت شانس آلمان ↗
                </a>
                <span>•</span>
                <a href="/austria-rwr" onClick={handleLinkNav('austria-rwr')} className="text-amber-300 hover:underline font-bold">
                  کارت قرمز-سفید-قرمز اتریش ↗
                </a>
              </div>
            </div>
          )}

          {selectedGoal === 'invest' && (
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 space-y-3 text-sm text-slate-200 leading-7">
              <strong className="text-amber-300 text-base block">امارات متحده عربی (دبی) و پرتغال / یونان:</strong>
              <p>
                امارات متحده عربی (دبی) به دلیل صفر درصد مالیات بر درآمد شخصی و رشد پرشتاب کسب‌وکارها و پرتغال و یونان به دلیل مسیرهای جذاب اقامتی (مانند ویزای D7، گلدن ویزا و سرمایه‌گذاری منعطف) بهترین گزینه‌ها هستند.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-xs">
                <a href="/business-dubai" onClick={handleLinkNav('business-dubai')} className="text-amber-300 hover:underline font-bold">
                  ثبت شرکت و اقامت دبی ↗
                </a>
                <span>•</span>
                <a href="/business-portugal" onClick={handleLinkNav('business-portugal')} className="text-amber-300 hover:underline font-bold">
                  اقامت و کسب‌وکار پرتغال ↗
                </a>
                <span>•</span>
                <a href="/realestate-greece" onClick={handleLinkNav('realestate-greece')} className="text-amber-300 hover:underline font-bold">
                  گلدن ویزای یونان ↗
                </a>
              </div>
            </div>
          )}

          {selectedGoal === 'study' && (
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 space-y-3 text-sm text-slate-200 leading-7">
              <strong className="text-amber-300 text-base block">هلند و اتریش (بهشت دانشجویان بین‌المللی در اروپا):</strong>
              <p>
                وجود بیش از ۲,۱۰۰ رشته انگلیسی‌زبان و ویزای یک‌ساله جستجوی کار پس از تحصیل (Zoekjaar) در هلند و شهریه‌های اقتصادی دانشگاه‌های دولتی اتریش در کنار استانداردهای بالای زندگی، این دو کشور را در صدر مقاصد تحصیلی قرار داده‌اند.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-xs">
                <a href="/netherlands-study-visa" onClick={handleLinkNav('academic-netherlands')} className="text-amber-300 hover:underline font-bold">
                  مهاجرت تحصیلی به هلند ۲۰۲۶ ↗
                </a>
                <span>•</span>
                <a href="/academic-austria" onClick={handleLinkNav('academic-austria')} className="text-amber-300 hover:underline font-bold">
                  تحصیل در دانشگاه‌های اتریش ↗
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Information Gain */}
        <div id="expert-insights" className="scroll-mt-24 rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-[#0a2934] to-[#0a2934] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-7 w-7 text-amber-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-amber-300 mb-3">
                چالش‌های واقعی پرونده‌ها و نکات کلیدی هلدینگ دیاکو (Information Gain)
              </h2>
              <p className="text-sm text-slate-200 leading-8 text-justify">
                بزرگ‌ترین خطای متقاضیان این است که صرفاً بر اساس «رتبه اول یک کشور در لیست‌های اینترنتی» تصمیم می‌گیرند؛ در حالی که شرایط فردی، سن، میزان سرمایه، مدرک زبان و سابقه شغلی تعیین‌کننده اصلی مسیر موفقیت است. برای مثال، کشوری مانند سوئیس بالاترین درآمد را دارد اما دریافت جاب‌آفر مستقیم و ویزای کار آن برای اتباع خارج از اتحادیه اروپا فوق‌العاده سخت و رقابتی است؛ در مقابل کشورهایی مثل آلمان و اتریش با پکیج‌های قانونی مشخص (مانند کارت فرصت یا ویزای استارتاپ) مسیرهای عینی‌تری پیش روی متخصصان قرار می‌دهند.
              </p>
            </div>
          </div>
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
        <div className="rounded-3xl bg-gradient-to-l from-amber-900/50 to-[#0a2a33] border border-amber-400/20 p-8 text-center">
          <h2 className="text-2xl font-black mb-3">مقصد نهایی خود را با مشاوره تخصصی انتخاب کنید</h2>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            تیم مشاوران و وکلای هلدینگ مهاجرتی دیاکو با تسلط کامل بر آخرین قوانین مهاجرتی اروپا، کانادا و امارات، آماده است تا امن‌ترین مسیر را بر اساس شرایط اختصاصی شما ترسیم کند.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-8 py-3.5 text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
            >
              شروع ارزیابی هوشمند مقصد
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

export default BestCountries2026Page;
