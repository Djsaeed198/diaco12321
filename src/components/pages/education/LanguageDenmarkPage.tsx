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
  Compass,
  Home,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const LanguageDenmarkPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  useSeo({
    title: 'دوره زبان و فولک‌هایسکول دانمارک ۲۰۲۶ | اسکاندیناوی',
    description:
      'راهنمای تحصیل دوره‌های زبان و مدارس عالی محلی (Folkehøjskole) در دانمارک ۲۰۲۶؛ تجربه زندگی اسکاندیناوی، یادگیری زبان دانمارکی و ویزای اقامت با دیاکو.',
    canonical: '/guides/language-course-denmark',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'دوره زبان در دانمارک ۲۰۲۶',
      'فولک هایسکول دانمارک Folkehøjskole',
      'ویزای اقامت تحصیلی دانمارک SIRI',
      'یادگیری زبان دانمارکی در کپنهاگ',
      'مهاجرت به دانمارک از طریق دوره زبان',
      'اقامت و خوابگاه کالج در دانمارک',
      'شرایط سنی فولک هایسکول دانمارک',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/language-course-denmark#article',
          headline: 'راهنمای تحصیل در دوره‌های زبان و مدارس عالی محلی دانمارک (Folkehøjskole) ۲۰۲۶',
          description:
            'بررسی اقامت موقت در دانمارک، تحصیل در سیستم منحصر‌به‌فرد فولک‌هایسکول به همراه خوابگاه و تغذیه، بدون نیاز به مدرک زبان اولیه.',
          image: [
            'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
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
          '@id': 'https://www.dia-co.ir/guides/language-course-denmark#howto',
          name: 'مراحل ثبت‌نام در مدارس هایسکول دانمارک و اخذ اقامت',
          description: 'مراحل پذیرش از مدارس تایید شده وزارت آموزش دانمارک تا صدور مجوز اقامت SIRI',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'انتخاب مدرسه مورد تأیید در سامانه Højskolerne',
              text: 'انتخاب ترم پاییزه (۴ تا ۵ ماهه) یا ترم بهاره در دانمارک.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'پرداخت پکیج جامع شهریه و اسکان و تغذیه کامل',
              text: 'پوشش کامل خوابگاه، ۳ وعده غذایی روزانه و دوره‌های زبان.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'تشکیل پرونده آنلاین در اداره مهاجرت دانمارک (SIRI) فرم ST1',
              text: 'ثبت اطلاعات متقاضی و تاییدیه رسمی مدرسه هایسکول.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'انگشت‌نگاری در سفارت دانمارک در تهران و دریافت ویزا',
              text: 'صدور کارت اقامت قانونی شینگن دانمارک برای کل دوره.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/language-course-denmark#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'مدارس فولک‌هایسکول (Folkehøjskole) در دانمارک چه نوع مدارسی هستند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'مدارس عالی سنتی دانمارک مراکزی شبانه‌روزی هستند که بدون کنکور یا امتحانات استرس‌زا، بر تقویت زبان دانمارکی/انگلیسی، هنر، ارتباطات اجتماعی، فرهنگ اسکاندیناوی و توسعه مهارت‌های فردی تمرکز دارند و دولت دانمارک برای آن‌ها ویزای اقامت رسمی صادر می‌کند.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا هزینه دوره شامل خوابگاه و غذا نیز می‌شود؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، شهریه اعلام‌شده مدارس هایسکول در دانمارک پکیج کامل همه‌چیز-شامل (All-Inclusive) است که کلاس‌های درس، اتاق اختصاصی در خوابگاه و ۳ وعده غذای سالم و بوفه روزانه را تأمین می‌کند.',
              },
            },
          ],
        },
      ],
    },
  });

  const [termLength, setTermLength] = useState<'short' | 'full'>('full');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const calc = useMemo(() => {
    const weeklyCostDkk = 2100;
    const weeks = termLength === 'full' ? 24 : 16;
    const totalDkk = weeklyCostDkk * weeks;
    const totalEur = Math.round(totalDkk / 7.46);

    return { weeks, totalDkk, totalEur };
  }, [termLength]);

  const DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'نامه پذیرش رسمی و قرارداد ثبت‌نام از مدرسه تایید شده Folkehøjskole',
      desc: 'حاوی تأییدیه دوره حداقل ۱۶ تا ۲۴ هفته‌ای.',
    },
    {
      id: 'doc-2',
      title: 'رسید پرداخت Case Order ID و فی رسیدگی اداره مهاجرت دانمارک (SIRI)',
      desc: 'پرداخت ارزی عوارض دولتی بررسی پرونده اقامت.',
    },
    {
      id: 'doc-3',
      title: 'فیش واریز شهریه و خوابگاه دوره به حساب بانکی مدرسه در دانمارک',
      desc: 'سند تضمینی نشان‌دهنده پوشش کامل هزینه‌های اسکان و غذا.',
    },
    {
      id: 'doc-4',
      title: 'گذرنامه بین‌المللی با اعتبار کافی برای کل دوره اقامت',
      desc: 'همراه با کپی تمامی صفحات مهردار قبلی.',
    },
    {
      id: 'doc-5',
      title: 'ترجمه آخرین مدرک تحصیلی و انگیزه‌نامه فردی به انگلیسی',
      desc: 'شرح علاقه به آشنایی با فرهنگ و سبک زندگی اسکاندیناوی.',
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
      q: 'آیا برای ویزای هایسکول دانمارک نیاز به مدرک زبان آیلتس است؟',
      a: 'خیر، ارائه مدرک بین‌المللی زبان آیلتس یا تافل برای این مدارس الزامی نیست؛ تنها داشتن سطح مکالمه متوسط انگلیسی برای ارتباط در محیط بین‌المللی مدرسه کافی است.',
    },
    {
      q: 'آیا پس از اتمام دوره هایسکول می‌توان در دانمارک ماند؟',
      a: 'بسیاری از متقاضیان از دوره هایسکول به عنوان یک پل سکو استفاده می‌کنند؛ در طول این مدت زبان دانمارکی را آموخته، با کارفرمایان و دانشگاه‌های دانمارکی دیدار حضوری دارند و برای ویزای تحصیلی دانشگاهی یا کاری اقدام می‌کنند.',
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
            <span className="text-white font-semibold">دوره زبان و هایسکول دانمارک ۲۰۲۶</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر دوره‌ها:</span>
            {[
              { key: 'ausbildung-germany', label: '🇩🇪 آوسبیلدونگ آلمان' },
              { key: 'language-spain', label: '🇪🇸 زبان اسپانیا' },
              { key: 'language-france', label: '🇫🇷 زبان فرانسه' },
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
                <span className="rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  مدارس شبانه‌روزی فولک‌هایسکول دانمارک
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-slate-300">
                  اقامت با خوابگاه و غذای کامل در اسکاندیناوی
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                مهاجرت به دانمارک از طریق دوره‌های زبان و فولک‌هایسکول؛ دروازه اسکاندیناوی
              </h1>

              <div
                data-ai-answer
                className="speakable-summary rounded-2xl bg-[#0e2a35] border border-teal-500/30 p-4 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg"
              >
                <div className="font-bold text-teal-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  ویژگی منحصر‌به‌فرد دوره‌های فولک‌هایسکول دانمارک:
                </div>
                متقاضیان بدون نیاز به ارائه مدرک زبان، با ثبت‌نام در مدارس عالی محلی دانمارک ویزای اقامت رسمی شینگن دریافت می‌کنند. شهریه پرداختی شامل آموزش، اتاق اختصاصی در خوابگاه مدرسه و سه وعده غذای بوفه روزانه بوده و اقامت بی‌دغدغه‌ای را در کشور دانمارک رقم می‌زند.
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  بررسی رایگان شرایط دوره هایسکول دانمارک
                </button>
                <a
                  href="tel:+982191693955"
                  className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 text-sm font-bold text-slate-200 transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-teal-400" />
                  مشاوره با کارشناسان دیاکو: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="دوره های زبان و هایسکول دانمارک - هلدینگ مهاجرتی دیاکو"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 right-3 left-3 bg-[#081e26]/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>مدارس عالی سنتی در سراسر دانمارک</span>
                  <span className="text-teal-400 font-bold">پکیج اسکان و غذای کامل</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                فرایند رسمی تشکیل پرونده ST1 در اداره مهاجرت دانمارک (SIRI)
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                محاسبه‌گر پکیج کامل هایسکول دانمارک ۲۰۲۶
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                برآورد هزینه تمام‌شده دوره شامل آموزش، خوابگاه اختصاصی و تغذیه کامل
              </h2>
            </div>

            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-xl bg-black/40 p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setTermLength('short')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    termLength === 'short' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ترم کوتاه (۱۶ هفته / ۴ ماه)
                </button>
                <button
                  type="button"
                  onClick={() => setTermLength('full')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    termLength === 'full' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ترم کامل استاندارد (۲۴ هفته / ۶ ماه)
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 bg-black/30 rounded-2xl p-5 border border-white/10">
              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">طول دوره اقامت</span>
                <span className="text-xl sm:text-2xl font-black text-teal-400 block mt-1">
                  {calc.weeks} هفته
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">در محیط دانشگاهی شبانه‌روزی</span>
              </div>

              <div className="text-center sm:border-l border-white/10 sm:pl-3">
                <span className="text-[11px] text-slate-400 block">هزینه به کرون دانمارک (DKK)</span>
                <span className="text-xl sm:text-2xl font-black text-amber-300 block mt-1">
                  {calc.totalDkk.toLocaleString('fa-IR')} DKK
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">شامل خوابگاه + ۳ وعده غذا</span>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 block">معادل یورویی کل پکیج</span>
                <span className="text-xl sm:text-2xl font-black text-white block mt-1">
                  ≈ {calc.totalEur.toLocaleString('fa-IR')} یورو
                </span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">بدون هیچ هزینه مخفی دیگر</span>
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
                مدارک مورد نیاز ویزای هایسکول دانمارک
              </h2>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedChecklist ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
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
                    ? 'bg-teal-950/20 border-teal-500/40 text-white'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/20 text-slate-200'
                }`}
              >
                <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-md border border-white/20 bg-black/40">
                  {checkedDocs[doc.id] && <Check className="w-3.5 h-3.5 text-teal-400" />}
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
              سوالات پرتکرار دوره‌های هایسکول دانمارک
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
                    className="w-full flex items-center justify-between p-4 text-right font-bold text-sm text-white hover:text-teal-300 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-teal-400' : ''
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
          <div className="rounded-3xl bg-gradient-to-r from-teal-950/40 to-emerald-950/40 border border-teal-500/30 p-8">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              تجربه زندگی در اسکاندیناوی با دوره هایسکول دانمارک
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
              جهت بررسی ظرفیت مدارس دانمارک و آغاز پروسه اخذ اقامت فرم ارزیابی را تکمیل کنید.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black px-6 py-3 text-sm transition cursor-pointer shadow-lg"
              >
                تکمیل فرم ارزیابی هایسکول دانمارک
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

export default LanguageDenmarkPage;
