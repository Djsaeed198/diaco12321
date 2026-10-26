import OptimizedImage from '../../OptimizedImage';
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
  Briefcase,
  Award,
  Globe2,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const LanguageSpainPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  useSeo({
    title: 'دوره زبان در اسپانیا ۲۰۲۶ | ویزای تحصیلی و اجازه کار',
    description:
      'راهنمای ثبت‌نام کالج زبان اسپانیایی در بارسلونا و مادرید ۲۰۲۶؛ ویزای دانشجویی شینگن، ۳۰ ساعت اجازه کار در هفته، شهریه مناسب و اقامت اروپا با دیاکو.',
    canonical: '/guides/language-course-spain',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'دوره زبان در اسپانیا ۲۰۲۶',
      'ویزای تحصیلی زبان اسپانیا',
      'کالج زبان اسپانیایی در بارسلونا',
      'کالج سروانتس مادرید Instituto Cervantes',
      'اجازه کار ۳۰ ساعت دانشجویی اسپانیا',
      'تبدیل ویزای تحصیلی به کاری در اسپانیا',
      'تمکن مالی ویزای دانشجویی اسپانیا IPREM',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/language-course-spain#article',
          headline: 'راهنمای ثبت‌نام دوره‌های زبان اسپانیایی در اسپانیا و ویزای شینگن ۲۰۲۶',
          description:
            'بررسی قوانین مهاجرتی اسپانیا، اجازه کار قانونی ۳۰ ساعت در هفته، کالج‌های معتبر Instituto Cervantes در مادرید و بارسلونا و هزینه زندگی.',
          image: [
            'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
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
          '@id': 'https://www.dia-co.ir/guides/language-course-spain#howto',
          name: 'مراحل ثبت‌نام کالج زبان و دریافت ویزای تحصیلی اسپانیا',
          description: 'مراحل پذیرش از مراکز معتبر سروانتس تا دریافت کارت اقامت دانشجویی TIE',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'انتخاب کالج مورد تأیید Instituto Cervantes',
              text: 'ثبت‌نام در دوره حداقل ۲۰ ساعت در هفته برای مدت ۱ سال تحصیلی.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'تهیه نامه تمکن مالی بر اساس شاخص ۱۰۰٪ IPREM اسپانیا',
              text: 'ارائه پرینت حساب بانکی معادل حدود ۷,۲۰۰ یورو برای ۱ سال اقامت.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'ارائه درخواست به سفارت اسپانیا در تهران',
              text: 'انگشت‌نگاری و مصاحبه جهت صدور ویزای تحصیلی تایپ D شینگن.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'ورود به اسپانیا و دریافت کارت اقامت TIE با اجازه ۳۰ ساعت کار',
              text: 'ثبت انگشت‌نگاری در پلیس مهاجرت و صدور کارت فیزیکی اقامت دانشجو.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/language-course-spain#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا برای اخذ ویزای کالج زبان اسپانیا نیاز به مدرک زبان از قبل است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر! هدف از این ویزا یادگیری زبان اسپانیایی از سطح صفر تا پیشرفته در خود کشور اسپانیا است و نیازی به مدرک قبلی DELE یا SIELE نیست.',
              },
            },
            {
              '@type': 'Question',
              name: 'دانشجو در اسپانیا چقدر اجازه کار دارد و درآمد آن چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'طبق اصلاحیه قانون مهاجرت اسپانیا، دانشجویان اجازه ۳۰ ساعت کار قانونی در هفته دارند که با حداقل دستمزد اسپانیا (SMI) ماهانه حدود ۱,۱۰۰ تا ۱,۳۵۰ یورو درآمدزایی دارد و هزینه‌های زندگی را کاملاً پوشش می‌دهد.',
              },
            },
          ],
        },
      ],
    },
  });

  const [city, setCity] = useState<'madrid' | 'barcelona' | 'valencia'>('valencia');
  const [workHours, setWorkHours] = useState<number>(20);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const calc = useMemo(() => {
    let tuitionEur = 4600;
    let livingCostMonthly = 850;
    if (city === 'madrid') {
      tuitionEur = 5100;
      livingCostMonthly = 1050;
    } else if (city === 'barcelona') {
      tuitionEur = 5300;
      livingCostMonthly = 1100;
    }

    const hourlyWage = 9.8; // حداقل دستمزد قانونی ساعتی اسپانیا
    const monthlyIncome = Math.round(workHours * 4.3 * hourlyWage);
    const netBalance = monthlyIncome - livingCostMonthly;

    return { tuitionEur, livingCostMonthly, monthlyIncome, netBalance };
  }, [city, workHours]);

  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'پذیرش قطعی (Matrícula) از کالج زبان معتبر دارای نشان Instituto Cervantes',
      desc: 'دوره حداقل ۲۰ ساعت در هفته و طول مدت حداقل ۹ ماه تا ۱ سال.',
    },
    {
      id: 'doc-2',
      title: 'تمکن مالی بانکی بر اساس شاخص IPREM اسپانیا (حداقل ۷,۲۰۰ تا ۸,۰۰۰ یورو)',
      desc: 'پرینت حساب بانکی ۶ ماهه به لاتین با گردش مالی مناسب.',
    },
    {
      id: 'doc-3',
      title: 'بیمه درمانی بین‌المللی بدون فرانشیز (Seguro Médico Sin Copago)',
      desc: 'از شرکت‌های بیمه معتبر اسپانیایی نظیر Sanitas یا Adeslas.',
    },
    {
      id: 'doc-4',
      title: 'گواهی عدم سوءپیشینه کیفری با آپوستیل و ترجمه رسمی اسپانیایی',
      desc: 'صادره از پلیس بین‌الملل با اعتبار حداکثر ۳ ماه.',
    },
    {
      id: 'doc-5',
      title: 'گواهی سلامت پزشکی بین‌المللی طبق مقررات بهداشتی ۲۰۰۵',
      desc: 'تایید عدم ابتلا به بیماری‌های واگیردار خطرناک.',
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
      q: 'چگونه می‌توان پس از دوره زبان، اقامت کاری اسپانیا گرفت؟',
      a: 'طبق اصلاحیه جدید قانون Ley de Extranjería، دانشجویان پس of اتمام دوره در صورت دریافت پیشنهاد شغلی رسمی می‌توانند ویزای تحصیلی خود را مستقیماً در خاک اسپانیا (بدون خروج از کشور) به اقامت کاری و سپس بلوکارت تبدیل نمایند.',
    },
    {
      q: 'آیا برای همراهی خانواده در ویزای زبان اسپانیا امکانی وجود دارد؟',
      a: 'بله، برای دوره‌های بیش از ۶ ماه امکان درخواست ویزای همراه برای همسر و فرزندان زیر ۱۸ سال با اثبات تمکن مالی اضافه (۷۵٪ شاخص IPREM برای همراه اول) وجود دارد.',
    },
    {
      q: 'طول مدت زمان بررسی ویزای اسپانیا در سفارت چقدر است؟',
      a: 'پرونده‌های ویزای تحصیلی اسپانیا معمولاً ظرف ۳ تا ۶ هفته توسط کنسولگری اسپانیا در تهران بررسی و پاسخ نهایی صادر می‌شود.',
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
            <span className="text-white font-semibold">دوره زبان اسپانیایی در اسپانیا ۲۰۲۶</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر دوره‌ها:</span>
            {[
              { key: 'ausbildung-germany', label: '🇩🇪 آوسبیلدونگ آلمان' },
              { key: 'language-france', label: '🇫🇷 زبان فرانسه' },
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
                <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5" />
                  کالج‌های زبان معتبر اسپانیا
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                  ۳۰ ساعت اجازه کار قانونی در هفته
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                دوره زبان در اسپانیا؛ اخذ ویزای شینگن با ۳۰ ساعت اجازه کار دانشجویی
              </h1>

              <div
                data-ai-answer
                className="speakable-summary rounded-2xl bg-[#0e2a35] border border-amber-500/30 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg"
              >
                <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  چرا کالج زبان در اسپانیا بهترین سکوی ورود به اروپاست؟
                </div>
                متقاضیان بدون نیاز به داشتن مدرک زبان اولیه، می‌توانند در کالج‌های زبان معتبر مادرید، بارسلونا یا والنسیا ثبت‌نام نموده و ویزای تحصیلی شینگن دریافت کنند. طبق قانون جدید، دانشجویان ۳۰ ساعت در هفته حق کار رسمی دارند که تمام هزینه‌های زندگی و مسکن را پوشش می‌دهد و پس از ۱ سال امکان تبدیل ویزا به اقامت کاری وجود دارد.
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 px-5 py-3 text-sm font-bold text-[#082833] shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  بررسی رایگان شرایط پذیرش کالج زبان اسپانیا
                </button>
                <a
                  href="tel:+982191693955"
                  className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  مشاوره با دپارتمان اسپانیا: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="دوره زبان اسپانیایی در بارسلونا و مادرید - هلدینگ دیاکو"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 right-3 left-3 bg-[#081e26]/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>کالج‌های مادرید، بارسلونا و والنسیا</span>
                  <span className="text-amber-400 font-bold">بدون نیاز به مدرک زبان</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                اخذ پذیرش تضمینی از مراکز رسمی مورد تایید Instituto Cervantes
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                محاسبه‌گر هزینه و درآمد دانشجویی اسپانیا ۲۰۲۶
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                برآورد شهریه، مخارج زندگی و درآمد کار دانشجویی
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">انتخاب شهر مقصد:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'valencia', label: 'والنسیا (مقرون‌به‌صرفه)' },
                    { id: 'madrid', label: 'مادرید (پایتخت)' },
                    { id: 'barcelona', label: 'بارسلونا (ساحلی)' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCity(c.id as any)}
                      className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        city === c.id
                          ? 'bg-amber-400 text-slate-950 border-amber-300'
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
                  ساعت کار در هفته: ({workHours} ساعت از ۳۰ ساعت مجاز)
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={workHours}
                  onChange={(e) => setWorkHours(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer mt-2"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 bg-black/30 rounded-2xl p-5 border border-white/10">
              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">شهریه ۱ سال کالج زبان</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 block mt-1">
                  {calc.tuitionEur.toLocaleString('fa-IR')} یورو
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">شامل ۲۰ ساعت آموزش هفتگی</span>
              </div>

              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">درآمد ماهانه کار دانشجویی</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block mt-1">
                  + {calc.monthlyIncome.toLocaleString('fa-IR')} یورو/ماه
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">با دستمزد ساعتی ۹.۸ یورو</span>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 block">تراز مالی ماهانه (درآمد منهای هزینه)</span>
                <span
                  className={`text-xl sm:text-2xl font-black block mt-1 ${
                    calc.netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {calc.netBalance >= 0 ? '+' : ''}
                  {calc.netBalance.toLocaleString('fa-IR')} یورو/ماه
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {calc.netBalance >= 0 ? 'پوشش کامل کلیه مخارج زندگی' : 'کسری جزیی از پس‌انداز'}
                </span>
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
                مدارک مورد نیاز برای ویزای زبان اسپانیا
              </h2>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedChecklist ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
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
                    ? 'bg-amber-950/20 border-amber-500/40 text-white'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 text-slate-200'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-black/40">
                  {checkedDocs[doc.id] && <Check className="w-3.5 h-3.5 text-amber-400" />}
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
              سوالات پرتکرار دوره‌های زبان اسپانیا
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
                    className="w-full flex items-center justify-between p-4 text-right font-bold text-sm text-white hover:text-amber-300 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
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
          <div className="rounded-3xl bg-gradient-to-r from-amber-950/40 to-yellow-950/40 border border-amber-500/30 p-8">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              ثبت‌نام در بهترین کالج‌های زبان اسپانیا با نظارت دیاکو
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
              جهت استعلام ظرفیت کالج‌های مادرید و بارسلونا و بررسی مدارک تمکن مالی فرم ارزیابی را پر کنید.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3 text-sm transition cursor-pointer shadow-lg"
              >
                تکمیل فرم ارزیابی دوره زبان اسپانیا
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

export default LanguageSpainPage;
