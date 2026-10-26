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
  Stethoscope,
  Award,
  ShieldCheck,
  Building,
  GraduationCap,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const MedicalFinlandPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  useSeo({
    title: 'مهاجرت پزشکان به فنلاند ۲۰۲۶ | مجوز والویرا و کار اسکاندیناوی',
    description:
      'راهنمای مهاجرت پزشکان و کادر درمان به فنلاند ۲۰۲۶؛ مراحل تأییدیه سازمان Valvira، آزمون زبان فنلاندی یا سوئدی، کارورزی بالینی و حقوق عالی در هلدینگ دیاکو.',
    canonical: '/guides/medical-finland-valvira',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'مهاجرت پزشکان به فنلاند',
      'مجوز پزشکی Valvira فنلاند',
      'آزمون پزشکی دانشگاه تامپره Tampere',
      'کار پزشک در هلسینکی فنلاند',
      'حقوق پزشکان در اسکاندیناوی ۲۰۲۶',
      'آزمون زبان YKI فنلاند',
      'اقامت دائم فنلاند برای کادر درمان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/medical-finland-valvira#article',
          headline: 'راهنمای مهاجرت پزشکان به فنلاند و مراحل مجوز سازمان Valvira ۲۰۲۶',
          description:
            'بررسی مسیر تأیید مدارک پزشکی خارج از اتحادیه اروپا توسط Valvira، آزمون ۳ مرحله‌ای دانشگاه تامپره، یادگیری زبان فنلاندی/سوئدی و درآمد پزشکان در فنلاند.',
          image: [
            'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
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
          '@id': 'https://www.dia-co.ir/guides/medical-finland-valvira#howto',
          name: 'مراحل دریافت پروانه طبابت در فنلاند (Valvira)',
          description: 'مراحل رسمی ورود پزشکان غیر اروپایی به سیستم بهداشت و درمان فنلاند',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'ارزیابی مدارک پایه توسط سازمان Valvira',
              text: 'ارسال مدارک تحصیلی و ریزنمرات به سازمان ملی نظارت بر بهداشت و رفاه فنلاند (Valvira).',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'اخذ مدرک زبان فنلاندی یا سوئدی سطح YKI 3-4',
              text: 'اثبات تسلط بر زبان رسمی کشور معادل سطح B1/B2 اروپایی.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'گذراندن آزمون سه مرحله‌ای دانشگاه تامپره (Tampereen yliopisto)',
              text: 'شامل آزمون بالینی تئوری، آزمون قوانین نظام سلامت فنلاند و آزمون عملی بیمارستانی OSCE.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'دوره کارورزی بالینی ۶ ماهه تحت نظارت (Harjoittelu)',
              text: 'اشتغال در بیمارستان‌های مرکزی فنلاند با دریافت حقوق کامل و صدور پروانه دائم طبابت.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/medical-finland-valvira#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا یادگیری زبان سوئدی به جای زبان فنلاندی برای والویرا پذیرفته است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، کشور فنلاند دارای دو زبان رسمی (فنلاندی و سوئدی) است. سازمان Valvira مدرک آزمون YKI به زبان سوئدی را نیز دقیقاً با همان اعتبار مدرک فنلاندی می‌پذیرد و بسیاری از پزشکان به دلیل تشابهات گرامری آسان‌تر، زبان سوئدی را برمی‌گزینند.',
              },
            },
            {
              '@type': 'Question',
              name: 'میانگین حقوق پزشکان در فنلاند چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حقوق ناخالص ماهانه پزشک عمومی در فنلاند بین ۶,۵۰۰ تا ۸,۲۰۰ یورو است. در مناطق شمالی و مرکزی به دلیل پرداخت پاداش‌های منطقه‌ای ویژه کمبود نیرو، این حقوق تا بیش از ۱۰,۵۰۰ یورو در ماه نیز می‌رسد.',
              },
            },
          ],
        },
      ],
    },
  });

  const [role, setRole] = useState<'resident' | 'specialist' | 'remote_area'>('specialist');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const calc = useMemo(() => {
    let monthlyGross = 7200;
    let label = 'پزشک عمومی در شهرهای هلسینکی و تامپره';
    if (role === 'resident') {
      monthlyGross = 5400;
      label = 'پزشک کارورز بالینی در دوره معادل‌سازی Valvira';
    } else if (role === 'remote_area') {
      monthlyGross = 9600;
      label = 'پزشک در مناطق مرکزی و شمالی (با فوق‌العاده ویژه منطقه‌ای)';
    }

    const annualGross = monthlyGross * 12.5; // شامل پاداش تابستان فنلاندی Lomaraha
    const monthlyNet = Math.round(monthlyGross * 0.65); // مالیات تصاعدی فنلاند حدود ۳۵٪

    return { monthlyGross, annualGross, monthlyNet, label };
  }, [role]);

  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'دانشنامه عمومی و تخصص پزشکی با ترجمه رسمی به انگلیسی، فنلاندی یا سوئدی',
      desc: 'با تأییدات دادگستری، وزارت امور خارجه و آپوستیل/تأیید کنسولی.',
    },
    {
      id: 'doc-2',
      title: 'ریزنمرات جامع ساعات آموزشی و بالینی دوره‌های کارآموزی',
      desc: 'ممهور به مهر دانشگاه مبدأ و بیمارستان‌های آموزشی.',
    },
    {
      id: 'doc-3',
      title: 'گواهی Good Standing از سازمان نظام پزشکی (با تاریخ حداکثر ۳ ماه)',
      desc: 'اثبات فعالیت مجاز و فقدان هرگونه پرونده انتظامی پزشکی.',
    },
    {
      id: 'doc-4',
      title: 'مدرک رسمی آزمون زبان YKI حداقل رتبه ۳ (معادل B1/B2) به فنلاندی یا سوئدی',
      desc: 'شرط ورود به آزمون‌های سه گانه دانشگاه تامپره.',
    },
    {
      id: 'doc-5',
      title: 'گواهی سلامت جسمانی و روانی و عدم سوءپیشینه کیفری بین‌المللی',
      desc: 'مدارک استاندارد امنیتی و بهداشتی جهت دریافت ویزای اقامت کاری فنلاند.',
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
      q: 'آزمون دانشگاه تامپره شامل چه مراحلی است؟',
      a: 'این آزمون ۳ مرحله‌ای است: ۱) آزمون کتبی دانش بالینی تئوری، ۲) آزمون قوانین اداری، بهداشتی و دارویی فنلاند (Terveydenhuollon hallinto)، و ۳) آزمون شبیه‌سازی بالینی عملی بیمارستانی (OSCE) با بیماران شبیه‌سازی‌شده.',
    },
    {
      q: 'آیا در طول دوره کارورزی فنلاند حقوق پرداخت می‌شود؟',
      a: 'بله، پزشک در دوره ۶ ماهه کارورزی نظارت‌شده (Practical training) با قرارداد رسمی بیمارستانی حداقل ماهانه ۵,۰۰۰ تا ۵,۸۰۰ یورو حقوق دریافت می‌کند.',
    },
    {
      q: 'وضعیت رفاه و زندگی خانواده پزشک در فنلاند چگونه است؟',
      a: 'فنلاند برترین رتبه رفاه و شادترین کشور جهان را داراست. آموزش کودکان از مهدکودک تا دانشگاه ۱۰۰٪ رایگان است، ساعات کاری استاندارد ۳۸ ساعت در هفته بوده و پزشکان از ۵ تا ۶ هفته مرخصی سالانه با حقوق بهره‌مند هستند.',
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
            <span>مهاجرت کادر درمان</span>
            <span>/</span>
            <span className="text-white font-semibold">پزشکان به فنلاند ۲۰۲۶</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر مقاصد درمانی:</span>
            {[
              { key: 'medical-germany', label: '🇩🇪 پزشکان آلمان' },
              { key: 'medical-austria-nursing', label: '🇦🇹 پرستاران اتریش' },
              { key: 'medical-denmark', label: '🇩🇰 کادر درمان دانمارک' },
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
                <span className="rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  برنامه پزشکی اسکاندیناوی
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                  سازمان ملی نظارت بر سلامت فنلاند (Valvira) ۲۰۲۶
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                مهاجرت پزشکان به فنلاند؛ اخذ پروانه Valvira و اشتغال در شادترین کشور جهان
              </h1>

              <div
                data-ai-answer
                className="speakable-summary rounded-2xl bg-[#0e2a35] border border-cyan-500/30 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg"
              >
                <div className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  خلاصه فرآیند پزشکی در فنلاند:
                </div>
                فنلاند با برخورداری از پیشرفته‌ترین شبکه بهداشت و رفاه اجتماعی اروپا، پزشکان غیراتحادیه اروپا را از طریق ارزیابی مدارک توسط Valvira، آزمون زبان (فنلاندی یا سوئدی سطح YKI 3) و آزمون عملی دانشگاه تامپره جذب می‌کند. حقوق سالانه از ۷۰,۰۰۰ تا ۱۲۰,۰۰۰ یورو، توازن استثنایی کار و زندگی و اقامت دائم ۴ ساله از مزایای اصلی این مسیر است.
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  بررسی رایگان شرایط پزشکان برای فنلاند
                </button>
                <a
                  href="tel:+982191693955"
                  className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-cyan-400" />
                  مشاوره تخصصی با دیاکو: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="مهاجرت پزشکان به فنلاند سازمان والویرا - هلدینگ دیاکو"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 right-3 left-3 bg-[#081e26]/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>بیمارستان‌های هلسینکی، تامپره، اولو و تورکو</span>
                  <span className="text-cyan-400 font-bold">بیمه و رفاه رتبه ۱ جهانی</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                امکان انتخاب زبان سوئدی به جای فنلاندی جهت تسریع در فرآیند یادگیری
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                محاسبه‌گر حقوق پزشکی در فنلاند ۲۰۲۶
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                تخمین حقوق و پاداش‌های فصلی پزشکان در فنلاند
              </h2>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-300 mb-2">موقعیت و سطح فعالیت:</label>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { key: 'resident', label: 'دستیار در دوره کارورزی Valvira' },
                  { key: 'specialist', label: 'پزشک در شهرهای مرکزی (هلسینکی/تامپره)' },
                  { key: 'remote_area', label: 'پزشک در مناطق پرتقاضا (شمالی/مرکزی)' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setRole(item.key as any)}
                    className={`p-3 rounded-xl border text-xs font-bold transition text-right cursor-pointer ${
                      role === item.key
                        ? 'bg-cyan-500/20 border-cyan-400 text-white'
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
                <span className="text-[11px] text-slate-400 block">حقوق ماهانه ناخالص (Brutto)</span>
                <span className="text-xl sm:text-2xl font-black text-cyan-400 block mt-1">
                  {calc.monthlyGross.toLocaleString('fa-IR')} یورو
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">۳۸ ساعت کار در هفته</span>
              </div>

              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">درآمد سالانه با پاداش مرخصی</span>
                <span className="text-xl sm:text-2xl font-black text-amber-300 block mt-1">
                  {Math.round(calc.annualGross).toLocaleString('fa-IR')} یورو
                </span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">شامل Lomaraha تابستانی</span>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 block">خالص دریافتی ماهانه</span>
                <span className="text-xl sm:text-2xl font-black text-white block mt-1">
                  ≈ {calc.monthlyNet.toLocaleString('fa-IR')} یورو
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">خدمات درمانی و تحصیلی رایگان</span>
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
                مدارک مورد نیاز پرونده Valvira فنلاند
              </h2>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedChecklist ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
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
                    ? 'bg-cyan-950/20 border-cyan-500/40 text-white'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 text-slate-200'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-black/40">
                  {checkedDocs[doc.id] && <Check className="w-3.5 h-3.5 text-cyan-400" />}
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
              سوالات پرتکرار پزشکان درباره فنلاند
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
                    className="w-full flex items-center justify-between p-4 text-right font-bold text-sm text-white hover:text-cyan-300 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
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
          <div className="rounded-3xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 p-8">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              برنامه‌ریزی ورود به سیستم درمان اسکاندیناوی با دیاکو
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
              جهت ارزیابی اولیه شانس قبولی در سازمان Valvira فنلاند، فرم بررسی تخصصی را پر کنید.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-3 text-sm transition cursor-pointer shadow-lg"
              >
                تکمیل فرم ارزیابی مهاجرت به فنلاند
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

export default MedicalFinlandPage;
