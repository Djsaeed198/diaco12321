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
  Award,
  Globe,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const LanguageHungaryPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  useSeo({
    title: 'کالج زبان در مجارستان ۲۰۲۶ | شهریه اقتصادی و ویزا شینگن',
    description:
      'راهنمای ثبت‌نام دوره‌های زبان انگلیسی در مجارستان ۲۰۲۶؛ شهریه ارزان، نرخ قبولی بالای ویزای شینگن سفارت، هزینه زندگی پایین در بوداپست و اعزام با دیاکو.',
    canonical: '/guides/language-course-hungary',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'کالج زبان در مجارستان ۲۰۲۶',
      'دوره زبان انگلیسی در بوداپست',
      'ویزای تحصیلی شینگن مجارستان',
      'شهریه ارزان کالج زبان در اروپا',
      'کالج زبان دونا و مک‌دانیل بوداپست',
      'هزینه زندگی دانشجویی در مجارستان',
      'پذیرش بدون مدرک زبان در مجارستان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/language-course-hungary#article',
          headline: 'راهنمای ثبت‌نام دوره‌های زبان انگلیسی در مجارستان و اخذ ویزای شینگن ۲۰۲۶',
          description:
            'بررسی شهریه‌های اقتصادی ۲,۸۰۰ تا ۴,۵۰۰ یورویی، پروسه اخذ ویزای تایپ D در سفارت مجارستان تهران و هزینه‌های زندگی در بوداپست.',
          image: [
            'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
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
          '@id': 'https://www.dia-co.ir/guides/language-course-hungary#howto',
          name: 'مراحل ثبت‌نام در کالج زبان مجارستان و دریافت ویزا',
          description: 'مسیر گام‌به‌گام از رزرو دوره تا صدور کارت اقامت دانشجویی در بوداپست',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'ارسال مدارک تحصیلی و رزرو دوره زبان',
              text: 'انتخاب دوره ۱ ساله زبان عمومی یا آکادمیک در بوداپست.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'صدور پذیرش قطعی و پرداخت شهریه',
              text: 'دریافت برگه تأییدیه رسمی پذیرش و پیش‌پرداخت خوابگاه دانشجویی.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'مصاحبه ویزای تایپ D در سفارت مجارستان در تهران',
              text: 'انجام مصاحبه به همراه وکیل و کارشناسان هلدینگ دیاکو.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'ورود به مجارستان و دریافت کارت اقامت شینگن',
              text: 'تحویل کارت فیزیکی اقامت در اداره مهاجرت بوداپست (OIF).',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/language-course-hungary#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'چرا کالج زبان مجارستان برای ایرانیان محبوب است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'سفارت مجارستان در تهران یکی از بالاترین نرخ‌های قبولی ویزای تحصیلی را دارد، شهریه‌ها نسبت به کشورهای اروپای غربی نصف بوده و هزینه زندگی در بوداپست با ماهانه حدود ۵۰۰ تا ۶۵۰ یورو قابل مدیریت است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا با کارت اقامت مجارستان می‌توان به سایر کشورهای شینگن سفر کرد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، کارت اقامت صادره از اداره مهاجرت مجارستان (OIF) یک مجوز معتبر اقامت در کل ۲۹ کشور حوزه شینگن است و فرد می‌تواند در طول تعطیلات آزادانه به آلمان، فرانسه، اتریش، ایتالیا و... سفر کند.',
              },
            },
          ],
        },
      ],
    },
  });

  const [courseType, setCourseType] = useState<'general' | 'intensive' | 'exam_prep'>('general');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const calc = useMemo(() => {
    let tuitionEur = 3200;
    let label = 'دوره ۱ ساله زبان انگلیسی عمومی (بوداپست)';
    if (courseType === 'intensive') {
      tuitionEur = 4200;
      label = 'دوره فشرده زبان آکادمیک (۲۵ ساعت در هفته)';
    } else if (courseType === 'exam_prep') {
      tuitionEur = 3800;
      label = 'دوره آمادگی آزمون‌های بین‌المللی IELTS / TOEFL';
    }

    const livingCostYearly = 6500; // هزینه خوابگاه و خوراک ۱ سال بوداپست
    const totalBudget = tuitionEur + livingCostYearly;

    return { tuitionEur, livingCostYearly, totalBudget, label };
  }, [courseType]);

  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'نامه پذیرش قطعی از کالج زبان بین‌المللی معتبر در بوداپست',
      desc: 'حاوی تأییدیه پرداخت شهریه و مشخصات کامل دوره.',
    },
    {
      id: 'doc-2',
      title: 'نامه تمکن مالی بانکی متقاضی یا ساپورتر (والدین) با مانده حدود ۸,۰۰۰ تا ۱۰,۰۰۰ یورو',
      desc: 'گردش حساب ۳ ماهه با مهر رسمی شعبه بین‌الملل بانک.',
    },
    {
      id: 'doc-3',
      title: 'تأییدیه رزرو محل اقامت یا خوابگاه دانشجویی در بوداپست',
      desc: 'جهت ارائه آدرس معتبر به کنسولگری مجارستان.',
    },
    {
      id: 'doc-4',
      title: 'ترجمه رسمی آخرین مدرک تحصیلی (دیپلم یا کارشناسی)',
      desc: 'همراه با تاییدیه وزارت دادگستری و امور خارجه.',
    },
    {
      id: 'doc-5',
      title: 'بیمه مسافرتی شینگن معتبر با پوشش حداقل ۳۰,۰۰۰ یورو',
      desc: 'برای ورود اولیه تا زمان صدور بیمه سلامت در مجارستان.',
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
      q: 'آیا برای شرکت در کالج زبان مجارستان نیاز به ارائه مدرک آیلتس است؟',
      a: 'خیر! ثبت‌نام در این دوره‌ها نیازی به ارائه هیچ مدرک زبانی از پیش ندارد و تعیین سطح اولیه توسط آزمون آنلاین خود کالج انجام می‌شود.',
    },
    {
      q: 'چقدر طول می‌کشد تا سفارت مجارستان ویزا را صادر کند؟',
      a: 'پس از روز مصاحبه و انگشت‌نگاری در سفارت مجارستان، پاسخ ویزا معمولاً ظرف ۳ الی ۵ هفته صادر می‌شود.',
    },
    {
      q: 'آیا پس از دوره زبان می‌توان در مجارستان کار کرد یا رشته دانشگاهی خواند؟',
      a: 'بله، متقاضیان پس از گذراندن دوره زبان می‌توانند بدون بازگشت به ایران در دانشگاه‌های سراسر مجارستان ثبت‌نام کرده و یا با دریافت پیشنهاد کاری، اقامت خود را تبدیل کنند.',
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
            <span className="text-white font-semibold">کالج زبان در مجارستان ۲۰۲۶</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر دوره‌ها:</span>
            {[
              { key: 'colleges-hungary', label: '🇭🇺 کالج‌های تخصصی مجارستان' },
              { key: 'ausbildung-germany', label: '🇩🇪 آوسبیلدونگ آلمان' },
              { key: 'language-spain', label: '🇪🇸 زبان اسپانیا' },
              { key: 'language-france', label: '🇫🇷 زبان فرانسه' },
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
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  کالج‌های زبان بین‌المللی بوداپست
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                  شهریه اقتصادی و درصد قبولی حداکثری ویزا
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                کالج زبان در مجارستان؛ سریع‌ترین و اقتصادی‌ترین مسیر ورود به حوزه شینگن
              </h1>

              <div
                data-ai-answer
                className="speakable-summary rounded-2xl bg-[#0e2a35] border border-emerald-500/30 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg"
              >
                <div className="font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  چرا کالج زبان مجارستان بهترین گزینه برای شروع است؟
                </div>
                مجارستان با شهریه سالانه تنها حدود ۲,۸۰۰ تا ۴,۲۰۰ یورو، پایین‌ترین هزینه‌های زندگی در مرکز اروپا (بوداپست) و نرخ صدور ویزای بسیار بالا در سفارت تهران، سریع‌ترین و مطمئن‌ترین سکوی پرتاب ایرانیان به خاک اتحادیه اروپا به شمار می‌آید.
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  استعلام ظرفیت و پذیرش فوری کالج مجارستان
                </button>
                <a
                  href="tel:+982191693955"
                  className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  مشاوره فوری با دیاکو: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="کالج زبان در مجارستان بوداپست - هلدینگ دیاکو"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 right-3 left-3 bg-[#081e26]/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>کالج‌های معتبر در قلب بوداپست</span>
                  <span className="text-emerald-400 font-bold">ویزای شینگن با تضمین پذیرش</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                امکان افتتاح حساب بانکی و ترنسفر امن ارز
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                محاسبه‌گر بودجه تحصیل در کالج زبان مجارستان ۲۰۲۶
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                برآورد کل بودجه سالانه شامل شهریه، اقامت و هزینه‌های زندگی
              </h2>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-300 mb-2">نوع برنامه زبان انتخابی:</label>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { id: 'general', label: 'زبان عمومی (۱ ساله استاندارد)' },
                  { id: 'intensive', label: 'دوره فشرده آکادمیک (۲۵ ساعت)' },
                  { id: 'exam_prep', label: 'آمادگی آیلتس و تافل تخصصی' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCourseType(item.id as any)}
                    className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer text-right ${
                      courseType === item.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-white'
                        : 'bg-black/30 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 bg-black/30 rounded-2xl p-5 border border-white/10">
              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">شهریه ۱ سال دوره</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block mt-1">
                  {calc.tuitionEur.toLocaleString('fa-IR')} یورو
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">۵۰٪ ارزان‌تر از کشورهای غربی</span>
              </div>

              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">هزینه مسکن و زندگی ۱ سال بوداپست</span>
                <span className="text-xl sm:text-2xl font-black text-amber-300 block mt-1">
                  ≈ {calc.livingCostYearly.toLocaleString('fa-IR')} یورو
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">ماهانه حدود ۵۴۰ یورو</span>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 block">مجموع کل بودجه ۱ سال</span>
                <span className="text-xl sm:text-2xl font-black text-white block mt-1">
                  ≈ {calc.totalBudget.toLocaleString('fa-IR')} یورو
                </span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">شامل شهریه، خوابگاه و زندگی</span>
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
                مدارک لازم برای ویزای تحصیلی کالج زبان مجارستان
              </h2>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedChecklist ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedChecklist ? 'چک‌لیست کپی شد!' : 'کپی مدارک'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setCheckedDocs((prev) => ({ ...prev, [doc.id]: !prev[doc.id] }))}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  checkedDocs[doc.id]
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-white'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 text-slate-200'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-black/40">
                  {checkedDocs[doc.id] && <Check className="w-3.5 h-3.5 text-emerald-400" />}
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
              سوالات پرتکرار کالج زبان مجارستان
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
                    className="w-full flex items-center justify-between p-4 text-right font-bold text-sm text-white hover:text-emerald-300 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-emerald-400' : ''
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
          <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 p-8">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              اقدام فوری برای کالج زبان در بوداپست با دیاکو
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
              جهت رزرو صندلی در ترم آینده کالج‌های بوداپست و تنظیم پرونده ویزای شینگن فرم ارزیابی را پر کنید.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 text-sm transition cursor-pointer shadow-lg"
              >
                تکمیل فرم ارزیابی کالج زبان مجارستان
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

export default LanguageHungaryPage;
