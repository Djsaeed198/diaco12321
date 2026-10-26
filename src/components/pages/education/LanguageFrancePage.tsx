import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  ChevronDown,
  HelpCircle,
  PhoneCall,
  Check,
  Copy,
  Sparkles,
  BookOpen,
  Building,
  Award,
  Home,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const LanguageFrancePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  useSeo({
    title: 'دوره زبان فرانسه در فرانسه ۲۰۲۶ | کالج‌های FLE و اقامت',
    description:
      'راهنمای دوره‌های زبان فرانسوی در پاریس و لیون ۲۰۲۶؛ ثبت‌نام کالج‌های معتبر FLE، فرایند کامپوس فرانس، کمک‌هزینه مسکن CAF و ۶۰٪ اجازه کار دانشجویی با دیاکو.',
    canonical: '/guides/language-course-france',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'دوره زبان در فرانسه ۲۰۲۶',
      'کالج زبان فرانسه FLE پاریس',
      'ویزای دانشجویی VLS-TS فرانسه',
      'کمک هزینه مسکن دانشجویی فرانسه CAF',
      'کار دانشجویی در فرانسه ۹۶۴ ساعت',
      'پرونده کامپوس فرانس ایران Campus France',
      'تحصیل رایگان در دانشگاه‌های فرانسه با B2',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/language-course-france#article',
          headline: 'راهنمای جامع دوره‌های زبان فرانسوی در فرانسه و دریافت ویزای VLS-TS ۲۰۲۶',
          description:
            'بررسی مراحل ثبت‌نام در کالج‌های مورد تایید Qualité FLE، وقت سفارت و کامپوس فرانس، استفاده از کمک‌هزینه مسکن دولتی CAF و ورود به دانشگاه‌های فرانسه.',
          image: [
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
          ],
          author: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          publisher: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.dia-co.ir/logo.png',
            },
          },
          datePublished: '2026-01-01',
          dateModified: '2026-10-23',
          inLanguage: 'fa-IR',
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/language-course-france#howto',
          name: 'مراحل اخذ پذیرش کالج زبان و ویزای تحصیلی فرانسه',
          description: 'مراحل گام‌به‌گام از انتخاب کالج تا دریافت ویزا و فعال‌سازی CAF در فرانسه',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'اخذ پذیرش رسمی از کالج زبان دارای نشان Qualité FLE',
              text: 'ثبت‌نام در دوره حداقل ۲۰ ساعت در هفته برای مدت ۸ تا ۱۲ ماه.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'تشکیل پرونده در سامانه Études en France (کامپوس فرانس تهران)',
              text: 'انجام مصاحبه حضوری انگیزشی در مرکز فرهنگی سفارت فرانسه در تهران.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'ارائه مدارک تمکن مالی به سفارت فرانسه (VFS Global)',
              text: 'اثبات حداقل ۷,۳۸۰ یورو در حساب بانکی (۶۱۵ یورو در ماه برای ۱ سال).',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'ورود به فرانسه و درخواست کمک‌هزینه مسکن CAF',
              text: 'دریافت ماهانه ۱۵۰ تا ۳۰۰ یورو کمک‌هزینه اجاره از دولت فرانسه.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/language-course-france#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'کمک‌هزینه مسکن CAF فرانسه به چه کسانی تعلق می‌گیرد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'سازمان CAF فرانسه (Caisse d\'Allocations Familiales) به تمامی دانشجویان بین‌المللی دارای ویزای بلندمدت تحصیلی، فارغ از ملیت، ماهانه بین ۱۲۰ تا ۲۸۰ یورو کمک‌هزینه بلاعوض اجاره مسکن پرداخت می‌کند.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا پس از دوره زبان می‌توان به دانشگاه‌های دولتی فرانسه رفت؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، پس از رساندن سطح زبان به B2 و قبولی در آزمون DELF B2 یا TCF، دانشجو می‌تواند در دانشگاه‌های دولتی فرانسه با شهریه بسیار ناچیز (سالانه ۱۷۰ تا ۲۴۰ یورو) ادامه تحصیل دهد.',
              },
            },
          ],
        },
      ],
    },
  });

  const [city, setCity] = useState<'paris' | 'lyon' | 'montpellier'>('lyon');
  const [rentAmount, setRentAmount] = useState<number>(650);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const calc = useMemo(() => {
    let cafSubsidy = Math.min(Math.round(rentAmount * 0.35), 230);
    if (city === 'paris') cafSubsidy = Math.min(Math.round(rentAmount * 0.32), 260);

    const netRent = rentAmount - cafSubsidy;
    const livingCostTotal = netRent + 400; // غذا، حمل و نقل و هزینه‌های روزمره

    return { cafSubsidy, netRent, livingCostTotal };
  }, [city, rentAmount]);

  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'گواهی ثبت‌نام اولیه (Attestation d\'inscription) از مرکز دارای Qualité FLE',
      desc: 'دوره فشرده زبان با حداقل ۲۰ ساعت آموزش در هفته و شهریه پرداخت شده.',
    },
    {
      id: 'doc-2',
      title: 'تأییدیه پرونده کامپوس فرانس ایران (Accord préalable Campus France)',
      desc: 'نتیجه مصاحبه علمی و تایید انگیزه متقاضی.',
    },
    {
      id: 'doc-3',
      title: 'نامه تمکن مالی بانکی با حداقل مانده معادل ۷,۵۰۰ تا ۸,۵۰۰ یورو',
      desc: 'به همراه گردش حساب ۳ ماه اخیر به زبان انگلیسی.',
    },
    {
      id: 'doc-4',
      title: 'گواهی اسکان در فرانسه (Attestation d\'hébergement یا رزرو خوابگاه CROUS)',
      desc: 'پوشش حداقل ۳ ماه اول اقامت در شهر مقصد.',
    },
    {
      id: 'doc-5',
      title: 'ترجمه رسمی آخرین مدارک تحصیلی و ریزنمرات به زبان فرانسوی',
      desc: 'با تأییدات دادگستری و وزارت امور خارجه.',
    },
  ];

  const handleCopy = () => {
    const text = DOCUMENTS.map((d, i) => `${i + 1}. ${d.title}\n   ${d.desc}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  const FAQS = [
    {
      q: 'آیا برای شرکت در دوره زبان فرانسه نیاز به مدرک زبان از قبل است؟',
      a: 'برای اکثر کالج‌های خصوصی فرانسه ارائه مدرک قبلی الزامی نیست، اما توصیه می‌شود برای موفقیت در مصاحبه کامپوس فرانس، متقاضی آشنایی اولیه‌ای در حد سطح A2 داشته باشد تا مصاحبه‌گر از هدفمند بودن برنامه مطمئن شود.',
    },
    {
      q: 'میزان اجازه کار دانشجویی در فرانسه چقدر است؟',
      a: 'دانشجویان در فرانسه قانوناً اجازه دارند معادل ۶۰٪ ساعت کاری سالانه یک کارگر تمام‌وقت یعنی ۹۶۴ ساعت در سال کار کنند. با حداقل دستمزد فرانسه (SMIC) درآمد هر ساعت کار حدود ۹.۵ یورو خالص است.',
    },
    {
      q: 'ویزای VLS-TS چه امکاناتی به دانشجو می‌دهد؟',
      a: 'ویزای بلندمدت دانشجویی معادل کارت اقامت (VLS-TS) به شما اجازه تردد آزادانه در کل کشورهای حوزه شینگن، افتتاح حساب بانکی، بیمه درمانی رایگان دولتی (Sécurité Sociale) و دریافت کمک‌هزینه مسکن CAF را اعطا می‌کند.',
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#081e26] text-slate-100 font-sans pb-20">
      <div className="bg-[#05171e] border-b border-white/10 py-3 px-4 md:px-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <button
              type="button"
              onClick={onBackToHome}
              className="text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <span>صفحه اصلی دیاکو</span>
            </button>
            <span>/</span>
            <span>دوره‌های تخصصی و زبان</span>
            <span>/</span>
            <span className="text-white font-semibold">دوره زبان فرانسه در فرانسه ۲۰۲۶</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر دوره‌ها:</span>
            {[
              { key: 'ausbildung-germany', label: '🇩🇪 آوسبیلدونگ آلمان' },
              { key: 'language-spain', label: '🇪🇸 زبان اسپانیا' },
              { key: 'language-netherlands', label: '🇳🇱 زبان هلند' },
              { key: 'colleges-hungary', label: '🇭🇺 کالج‌های مجارستان' },
            ].map((dest) => (
              <button
                key={dest.key}
                type="button"
                onClick={() => onNavigateToCountry?.(dest.key)}
                className="rounded-lg px-2.5 py-1 text-[11px] font-medium transition cursor-pointer bg-white/5 hover:bg-white/15 text-slate-300"
              >
                {dest.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden pt-8 pb-14 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  کالج‌های دارای نشان رسمی Qualité FLE
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                  شامل کمک‌هزینه مسکن دولتی CAF فرانسه
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                دوره زبان فرانسه در فرانسه؛ ویزای شینگن و مسیر ورود به دانشگاه‌های دولتی
              </h1>

              <div
                data-ai-answer
                className="speakable-summary rounded-2xl bg-[#0e2a35] border border-blue-500/30 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg"
              >
                <div className="font-bold text-blue-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  مزایای استثنایی دوره زبان فرانسه:
                </div>
                کشور فرانسه با پرداخت کمک‌هزینه مسکن دانشجویی CAF (تا ۲۶۰ یورو در ماه به ازای هر دانشجو) و اعطای ۹۶۴ ساعت اجازه کار قانونی در سال، از دانشجویان کالج زبان حمایت می‌کند. پس از اخذ سطح B2، امکان ثبت‌نام در تمام دانشگاه‌های دولتی فرانسه با شهریه رایگان یا سالانه کمتر از ۳۰۰ یورو فراهم می‌گردد.
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  ارزیابی و اخذ پذیرش کالج زبان فرانسه
                </button>
                <a
                  href="tel:+982191693955"
                  className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-blue-400" />
                  مشاوره تخصصی با دیاکو: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="دوره زبان فرانسوی در پاریس و لیون - هلدینگ دیاکو"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 right-3 left-3 bg-[#081e26]/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>کالج‌های معتبر در پاریس، لیون و مون‌پلیه</span>
                  <span className="text-blue-400 font-bold">کمک‌هزینه مسکن CAF</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                همراهی در کلیه مراحل مصاحبه کامپوس فرانس و پرونده VFS سفارت
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                محاسبه‌گر هزینه زندگی و یارانه مسکن CAF فرانسه ۲۰۲۶
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                برآورد خالص هزینه اجاره مسکن پس از دریافت کمک‌هزینه CAF
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">شهر محل سکونت در فرانسه:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'montpellier', label: 'مون‌پلیه (دانشجویی)' },
                    { id: 'lyon', label: 'لیون (مرکزی)' },
                    { id: 'paris', label: 'پاریس (پایتخت)' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCity(c.id as any)}
                      className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        city === c.id
                          ? 'bg-blue-500 text-white border-blue-400'
                          : 'bg-black/30 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  مبلغ اجاره ماهانه مسکن: ({rentAmount} یورو)
                </label>
                <input
                  type="range"
                  min="400"
                  max="1200"
                  step="50"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(Number(e.target.value))}
                  className="w-full accent-blue-400 cursor-pointer mt-2"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 bg-black/30 rounded-2xl p-5 border border-white/10">
              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">کمک‌هزینه نقدی دولتی CAF</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block mt-1">
                  - {calc.cafSubsidy} یورو/ماه
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">واریز مستقیم دولت به حساب بانکی</span>
              </div>

              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">سهم پرداختی واقعی شما از اجاره</span>
                <span className="text-xl sm:text-2xl font-black text-blue-300 block mt-1">
                  {calc.netRent} یورو/ماه
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">صرفه‌جویی تا ۳۵٪ از هزینه مسکن</span>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 block">کل مخارج ماهانه زندگی</span>
                <span className="text-xl sm:text-2xl font-black text-white block mt-1">
                  ≈ {calc.livingCostTotal} یورو/ماه
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">قابل تأمین با پارت‌تایم دانشجویی</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                مدارک مورد نیاز جهت پرونده کالج زبان و ویزای فرانسه
              </h2>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedChecklist ? <Check className="w-4 h-4 text-blue-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedChecklist ? 'چک‌لیست کپی شد!' : 'کپی کل مدارک'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setCheckedDocs((prev) => ({ ...prev, [doc.id]: !prev[doc.id] }))}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  checkedDocs[doc.id]
                    ? 'bg-blue-950/20 border-blue-500/40 text-white'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 text-slate-200'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-black/40">
                  {checkedDocs[doc.id] && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{doc.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              سوالات متداول دوره‌های زبان فرانسه
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-right font-bold text-sm text-white hover:text-blue-300 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blue-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pt-12 text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-500/30 p-8">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              اخذ پذیرش تضمینی کالج‌های معتبر زبان فرانسه با نظارت دیاکو
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
              جهت آماده‌سازی رزومه، شبیه‌سازی مصاحبه کامپوس فرانس و اقدام برای ویزای فرانسه فرم ارزیابی را پر کنید.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-black px-6 py-3 text-sm transition cursor-pointer shadow-lg"
              >
                تکمیل فرم ارزیابی کالج زبان فرانسه
              </button>
              <button
                type="button"
                onClick={onBackToHome}
                className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-3 text-sm font-bold text-white transition cursor-pointer"
              >
                بازگشت به صفحه اصلی
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LanguageFrancePage;
