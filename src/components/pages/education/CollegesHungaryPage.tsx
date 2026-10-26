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
  GraduationCap,
  Award,
  Microscope,
  Stethoscope,
  Building,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

const HUNGARY_COLLEGES = [
  {
    id: 'mcdaniel',
    name: 'کالج بین‌المللی مک‌دانیل بوداپست (McDaniel College)',
    tracks: 'پیش‌پزشکی (Pre-Med)، پیش‌دامپزشکی و پیش‌بیزینس',
    tuition: 7450,
    targetUni: 'دانشگاه سملوایز (Semmelweis)، دانشگاه سگد و دانشگاه پچ',
  },
  {
    id: 'duna',
    name: 'کالج بین‌المللی دونا بوداپست (Duna College)',
    tracks: 'پیش‌پزشکی، پیش‌مهندسی و دوره‌های آمادگی زبان',
    tuition: 6200,
    targetUni: 'دانشگاه‌های مهندسی BME و علوم پزشکی مجارستان و اسلواکی',
  },
  {
    id: 'avicenna',
    name: 'کالج بین‌المللی ابن‌سینا (Avicenna International College)',
    tracks: 'دوره Foundation پزشکی و بیوتکنولوژی',
    tuition: 7900,
    targetUni: 'دانشگاه سملوایز، کارولینسکا و دانشگاه‌های اروپای مرکزی',
  },
] as const;

export const CollegesHungaryPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  useSeo({
    title: 'کالج‌های مجارستان ۲۰۲۶ | دوره‌های پیش‌پزشکی و مهندسی',
    description:
      'راهنمای کامل دوره‌های Pre-Med و Foundation در کالج‌های معتبر مجارستان (مک‌دانیل، دونا و اویچینا) ۲۰۲۶؛ آمادگی آزمون ورودی پزشکی سملوایز و دیاکو.',
    canonical: '/guides/colleges-hungary-foundation',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'کالج‌های مجارستان ۲۰۲۶',
      'کالج مک دانیل بوداپست McDaniel College',
      'کالج دونا مجارستان Duna College',
      'دوره پیش پزشکی در مجارستان Pre-Med',
      'قبولی در آزمون پزشکی دانشگاه سملوایز Semmelweis',
      'شهریه کالج‌های مجارستان ۲۰۲۶',
      'ویزای تحصیلی کالج پیش‌پزشکی مجارستان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/colleges-hungary-foundation#article',
          headline: 'راهنمای جامع کالج‌های مجارستان و دوره‌های پیش‌پزشکی (Pre-Med) ۲۰۲۶',
          description:
            'بررسی شهریه‌ها، سیستم آموزشی، سرفصل‌های شیمی و زیست‌شناسی، و نرخ قبولی بالای ۹۰٪ در آزمون‌های ورودی سملوایز و سگد در هلدینگ دیاکو.',
          image: [
            'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
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
          '@id': 'https://www.dia-co.ir/guides/colleges-hungary-foundation#howto',
          name: 'مراحل قبولی در پزشکی اروپا از طریق کالج‌های مجارستان',
          description: 'مراحل ثبت‌نام در دوره Pre-Med تا قبولی قطعی در دانشگاه علوم پزشکی سملوایز',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'اخذ پذیرش از کالج بین‌المللی مک‌دانیل یا دونا',
              text: 'ثبت‌نام در دوره ۱ ساله فاندیشن پزشکی (آموزش دروس زیست، شیمی، فیزیک پزشکی و زبان تخصصی).',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'دریافت ویزای شینگن تحصیلی از سفارت مجارستان',
              text: 'پرونده ویزا با ارائه تأییدیه پرداخت شهریه کالج و تمکن مالی والدین.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'گذراندن دوره فاندیشن ۲ ترمه در بوداپست',
              text: 'آموزش فشرده و شبیه‌سازی هفتگی آزمون‌های کتبی و شفاهی دانشگاه‌های علوم پزشکی.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'شرکت در آزمون ورودی سملوایز، سگد یا پچ و ورود به سال ۱ پزشکی',
              text: 'قبولی قطعی در رشته‌های پزشکی عمومی، دندانپزشکی یا داروسازی با مدرک معتبر جهانی.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/colleges-hungary-foundation#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا مدرک پزشکی دانشگاه‌های مجارستان در ایران و اروپا تایید است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، دانشگاه‌های سملوایز (Semmelweis University)، سگد و دبرسن در لیست دانشگاه‌های مورد تأیید وزارت بهداشت و درمان ایران، اتحادیه اروپا و بورد پزشکی آمریکا (USMLE) قرار دارند.',
              },
            },
            {
              '@type': 'Question',
              name: 'نرخ قبولی دانشجویان کالج مک‌دانیل در آزمون پزشکی چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بیش از ۹۰ درصد دانشجویانی که دوره پیش‌پزشکی کالج مک‌دانیل را با موفقیت سپری می‌کنند، در آزمون‌های ورودی دانشگاه‌های پزشکی مجارستان یا سایر دانشگاه‌های اروپا پذیرفته می‌شوند.',
              },
            },
          ],
        },
      ],
    },
  });

  const [selectedCollege, setSelectedCollege] = useState<string>('mcdaniel');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const collegeData = useMemo(() => {
    return HUNGARY_COLLEGES.find((c) => c.id === selectedCollege) || HUNGARY_COLLEGES[0];
  }, [selectedCollege]);

  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'ترجمه رسمی دیپلم تجربی یا ریاضی و ریزنمرات ۳ ساله دبیرستان',
      desc: 'همراه با تأییدات دادگستری و وزارت امور خارجه و تاییدیه سفارت.',
    },
    {
      id: 'doc-2',
      title: 'نامه پذیرش قطعی کالج با تأییدیه واریز شهریه دوره Pre-Medical',
      desc: 'صادره از دبیرخانه مرکزی کالج مک‌دانیل یا دونا در بوداپست.',
    },
    {
      id: 'doc-3',
      title: 'گواهی تمکن مالی والدین (ساپورتر مالی) به مبلغ حداقل ۱۲,۰۰۰ تا ۱۵,۰۰۰ یورو',
      desc: 'پرینت حساب بانکی ۶ ماهه به همراه فیش حقوقی یا سند ملکی.',
    },
    {
      id: 'doc-4',
      title: 'تأییدیه رزرو خوابگاه دانشجویی کالج در منطقه مرکزی بوداپست',
      desc: 'جهت ارائه مدارک محل اقامت قطعی دانشجو به سفارت.',
    },
    {
      id: 'doc-5',
      title: 'گواهی سلامت عمومی و آزمایشات سرولوژی معتبر',
      desc: 'تایید عدم ابتلا به هپاتیت B، هپاتیت C و ایدز جهت رشته‌های علوم پزشکی.',
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
      q: 'آزمون ورودی دانشگاه پزشکی سملوایز شامل چه موادی است؟',
      a: 'این آزمون در دو بخش برگزار می‌شود: ۱) آزمون کتبی تستی شامل ۲۰ سوال زیست‌شناسی، ۲۰ سوال شیمی، ۲۰ سوال اصطلاحات تخصصی انگلیسی، و ۲) آزمون شفاهی مصاحبه فردی با اساتید دانشکده پزشکی در مورد مباحث زیست و شیمی.',
    },
    {
      q: 'آیا برای ورود به کالج مک‌دانیل شرط معدل وجود دارد؟',
      a: 'حداقل معدل دیپلم برای پذیرش در کالج مک‌دانیل معمولاً ۱۴ است، اما متقاضیان با معدل‌های بالاتر از شانس فوق‌العاده‌ای در صدور سریع ویزا از سفارت برخوردار خواهند بود.',
    },
    {
      q: 'شهریه رشته‌های پزشکی پس از قبولی در دانشگاه چقدر است؟',
      a: 'شهریه سالانه پزشکی عمومی در دانشگاه سملوایز حدود ۱۸,۲۰۰ دلار و در دانشگاه‌های سگد و پچ حدود ۱۵,۰۰۰ تا ۱۶,۵۰۰ دلار در سال است.',
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
            <span>دوره‌های تخصصی و کالج‌ها</span>
            <span>/</span>
            <span className="text-white font-semibold">کالج‌های مجارستان (Pre-Med) ۲۰۲۶</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر دوره‌ها:</span>
            {[
              { key: 'language-hungary', label: '🇭🇺 کالج زبان مجارستان' },
              { key: 'ausbildung-germany', label: '🇩🇪 آوسبیلدونگ آلمان' },
              { key: 'language-spain', label: '🇪🇸 زبان اسپانیا' },
              { key: 'language-netherlands', label: '🇳🇱 زبان هلند' },
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
                <span className="rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  دوره‌های پیش‌پزشکی و مهندسی اروپا
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                  نرخ قبولی بالای ۹۰٪ در دانشگاه سملوایز
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                کالج‌های مجارستان؛ دروازه طلایی ورود به رشته‌های پزشکی و دندانپزشکی اروپا
              </h1>

              <div
                data-ai-answer
                className="speakable-summary rounded-2xl bg-[#0e2a35] border border-violet-500/30 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg"
              >
                <div className="font-bold text-violet-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  چرا کالج مک‌دانیل و دونا بوداپست؟
                </div>
                کالج‌های معتبر بوداپست با تدریس دروس پایه زیست‌شناسی، شیمی و زبان تخصصی، داوطلبان را مستقیماً برای آزمون‌های ورودی دانشگاه‌های برتر پزشکی Semmelweis، Szeged و Pecs آماده می‌سازند. مدارک فارغ‌التحصیلی پزشکی این دانشگاه‌ها مورد تایید مستقیم وزارت بهداشت ایران، اتحادیه اروپا و آمریکاست.
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  رزرو صندلی در دوره Pre-Med کالج مک‌دانیل
                </button>
                <a
                  href="tel:+982191693955"
                  className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-violet-400" />
                  مشاوره تخصصی پزشکی با دیاکو: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="کالج های مجارستان دوره پیش پزشکی - هلدینگ مهاجرتی دیاکو"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 right-3 left-3 bg-[#081e26]/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>کالج‌های مک‌دانیل، دونا و ابن‌سینا بوداپست</span>
                  <span className="text-violet-400 font-bold">بیش از ۹۰٪ قبولی در سملوایز</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                برگزاری آزمون‌های شبیه‌ساز ورودی دانشگاه‌های پزشکی در خاک مجارستان
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
                مقایسه‌گر کالج‌های معتبر بوداپست ۲۰۲۶
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                بررسی شهریه‌ها، رشته‌ها و دانشگاه‌های هدف
              </h2>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-300 mb-2">انتخاب کالج:</label>
              <div className="grid md:grid-cols-3 gap-3">
                {HUNGARY_COLLEGES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCollege(c.id)}
                    className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer text-right ${
                      selectedCollege === c.id
                        ? 'bg-violet-500/20 border-violet-400 text-white'
                        : 'bg-black/30 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    {c.name.split(' (')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 bg-black/30 rounded-2xl p-5 border border-white/10">
              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">شهریه سالانه دوره Pre-Med</span>
                <span className="text-xl sm:text-2xl font-black text-violet-400 block mt-1">
                  {collegeData.tuition.toLocaleString('fa-IR')} یورو
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">شامل ۲ ترم فشرده زیست و شیمی</span>
              </div>

              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">گرایش‌های تحت پوشش</span>
                <span className="text-xs font-black text-white block mt-1 leading-snug">
                  {collegeData.tracks}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">آموزش ۱۰۰٪ به زبان انگلیسی</span>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 block">دانشگاه‌های هدف فارغ‌التحصیلان</span>
                <span className="text-xs font-black text-emerald-400 block mt-1 leading-snug">
                  {collegeData.targetUni}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">مورد تایید وزارت بهداشت ایران</span>
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
                مدارک مورد نیاز پذیرش دوره Pre-Med مجارستان
              </h2>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedChecklist ? <Check className="w-4 h-4 text-violet-400" /> : <Copy className="w-4 h-4" />}
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
                    ? 'bg-violet-950/20 border-violet-500/40 text-white'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 text-slate-200'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-black/40">
                  {checkedDocs[doc.id] && <Check className="w-3.5 h-3.5 text-violet-400" />}
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
              سوالات متداول متقاضیان کالج‌های پزشکی مجارستان
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
                    className="w-full flex items-center justify-between p-4 text-right font-bold text-sm text-white hover:text-violet-300 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-violet-400' : ''
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
          <div className="rounded-3xl bg-gradient-to-r from-violet-950/40 to-purple-950/40 border border-violet-500/30 p-8">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              اخذ پذیرش قطعی در کالج مک‌دانیل و دونا بوداپست با دیاکو
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
              جهت ارزیابی دیپلم و ثبت‌نام در دوره پیش‌پزشکی فرم بررسی شرایط را تکمیل نمایید.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-black px-6 py-3 text-sm transition cursor-pointer shadow-lg"
              >
                تکمیل فرم ارزیابی دوره پیش‌پزشکی مجارستان
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

export default CollegesHungaryPage;
