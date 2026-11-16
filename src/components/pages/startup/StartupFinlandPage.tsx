import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Rocket,
  ShieldCheck,
  ExternalLink,
  AlertTriangle,
  Scale,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

const CANONICAL_URL = 'https://www.dia-co.ir/startup-finland';

const KEY_SPECS = [
  { label: 'نهاد ارزیاب نوآوری', value: 'Business Finland (صدور Eligibility Statement)' },
  { label: 'مرجع صدور اقامت', value: 'اداره مهاجرت فنلاند (Migri — مجوز Startup Permit)' },
  { label: 'اعتبار تاییدیه بیزینس فنلاند', value: '۲ ماه جهت ثبت درخواست اقامت در سامانه Enter Finland' },
  { label: 'تمکن مالی معیشت ۲۰۲۶ (Migri)', value: 'حداقل حدود €۱,۲۱۰ در ماه برای متقاضی اصلی (~€۲۹,۰۰۰ برای ۲ سال)' },
  { label: 'مدت اعتبار اقامت اولیه', value: 'حداکثر ۲ سال (نوع A — Continuous Residence Permit)' },
  { label: 'تعداد بنیان‌گذاران و سهام', value: 'حداقل ۲ بنیان‌گذار با مالکیت جمعی حداقل ۶۰٪ و حضور تمام‌وقت' },
];

const STEPS = [
  {
    title: '۱. ارسال پیچ‌دک و مدل مالی به Business Finland',
    desc: 'ارزیابی ایده از نظر پتانسیل رشد بین‌المللی، مقیاس‌پذیری و ترکیب تیم کارآفرینی (معمولاً طی ۲ تا ۴ هفته).',
  },
  {
    title: '۲. دریافت Eligibility Statement مثبت',
    desc: 'دریافت نامه تایید رسمی از Business Finland که تنها ۶۰ روز جهت ثبت پرونده در اداره مهاجرت اعتبار دارد.',
  },
  {
    title: '۳. ثبت درخواست در Enter Finland و احراز هویت سفارت',
    desc: 'بارگذاری گواهی تمکن بانکی، پاسپورت و تاییدیه بیزینس فنلاند و مراجعه جهت بیومتریک.',
  },
  {
    title: '۴. دریافت کارت اقامت نوع A و ثبت شرکت Oy در فنلاند',
    desc: 'ثبت شرکت سهامی محدود فنلاندی (Osakeyhtiö - Oy بدون حداقل سرمایه قانونی)، دریافت شماره مالیاتی و کارت Kela.',
  },
];

const FAQS = [
  {
    q: 'آیا برای دریافت استارت‌آپ ویزای فنلاند تک‌نفره هم می‌توان اقدام کرد؟',
    a: 'طبق دستورالعمل رسمی Business Finland، تیم استارت‌آپی باید معمولاً حداقل ۲ بنیان‌گذار تمام‌وقت با مهارت‌های مکمل (فنی و تجاری) باشد که مجموعاً بیش از ۶۰ درصد سهام شرکت را در اختیار دارند.',
  },
  {
    q: 'مزیت کارت اقامت نوع A در استارت‌آپ فنلاند چیست؟',
    a: 'مجوز اقامت استارت‌آپ فنلاند از نوع A (مداوم / Continuous) است؛ یعنی سنوات اقامت از روز اول برای اقامت دائم (P Permit پس از ۴ تا ۶ سال وفق اصلاحیه جدید فنلاند) و ثبت سیستم سلامت و آموزش رایگان Kela محاسبه می‌شود.',
  },
  {
    q: 'میزان تمکن مالی مورد نیاز اداره Migri در سال ۲۰۲۶ چقدر است؟',
    a: 'متقاضی باید نشان دهد برای پوشش هزینه‌های زندگی در فنلاند دسترسی مستمر به منابع مالی دارد (حدود €۱,۲۱۰ در ماه برای متقاضی، به علاوه مبالغ افزوده برای همسر و هر فرزند بر اساس آخرین بخشنامه Migri).',
  },
  {
    q: 'آیا هزینه ثبت شرکت Oy در فنلاند بالاست؟',
    a: 'خیر؛ حداقل سرمایه ثبتی برای شرکت خصوصی با مسئولیت محدود (Oy) در فنلاند طبق قانون جدید به صفر یورو رسیده است و با ثبت آنلاین در PRH هزینه‌های اداری بسیار محدودی دارد.',
  },
];

export const StartupFinlandPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای استارت‌آپ فنلاند ۲۰۲۶ | تاییدیه Business Finland | دیاکو',
    description:
      'راهنمای جامع ویزای استارت‌آپ فنلاند ۲۰۲۶: دریافت Eligibility Statement از Business Finland، شرایط تمکن Migri، کارت نوع A و اقامت هلسینکی با دیاکو.',
    canonical: '/startup-finland',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'استارت آپ فنلاند ۲۰۲۶',
      'Finland Startup Permit',
      'بیزینس فنلاند Business Finland',
      'اقامت نوع A فنلاند',
      'مهاجرت کارآفرینی هلسینکی',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای جامع مجوز استارت‌آپ فنلاند ۲۰۲۶: الزامات Business Finland و Migri',
          description:
            'بررسی مراحل ارزیابی ایده در Business Finland، دریافت Eligibility Statement، حداقل تمکن Migri و اخذ کارت اقامت نوع A فنلاند.',
          image: [
            'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200&q=80',
          ],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' },
          },
          mainEntityOfPage: CANONICAL_URL,
          datePublished: '2026-01-01',
          dateModified: '2026-11-16',
          inLanguage: 'fa-IR',
        },
        {
          '@type': 'HowTo',
          '@id': `${CANONICAL_URL}#howto`,
          name: 'مراحل دریافت مجوز استارت‌آپ فنلاند',
          step: STEPS.map((s, idx) => ({
            '@type': 'HowToStep',
            position: idx + 1,
            name: s.title,
            text: s.desc,
          })),
        },
        {
          '@type': 'FAQPage',
          '@id': `${CANONICAL_URL}#faq`,
          mainEntity: FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${CANONICAL_URL}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://www.dia-co.ir/' },
            { '@type': 'ListItem', position: 2, name: 'خدمات دیاکو', item: 'https://www.dia-co.ir/services' },
            { '@type': 'ListItem', position: 3, name: 'ویزای استارت‌آپ فنلاند', item: CANONICAL_URL },
          ],
        },
      ],
    },
  });

  return (
    <div className="min-h-screen bg-[#061a21] text-slate-100" dir="rtl">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#082833] via-[#061a21] to-[#041217] pt-10 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به خدمات دیاکو
            </button>
            <span className="text-xs font-bold text-slate-300">
              دپارتمان تخصصی اسکاندیناوی دیاکو · فنلاند ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="h-4 w-4" />
                <span>برنامه Finnish Startup Permit | اکوسیستم هلسینکی</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ویزای استارت‌آپ فنلاند؛ اقامت نوع A با تایید Business Finland
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                فنلاند با همکاری سازمان نوآوری دولتی Business Finland و اداره مهاجرت Migri، یکی از شفاف‌ترین و سریع‌ترین مسیرهای کارآفرینی اروپا را ارائه می‌دهد. تیم‌های دارای مدل کسب‌وکار مقیاس‌پذیر بین‌المللی پس از دریافت بیانیه صلاحیت (Eligibility Statement)، کارت اقامت نوع A با پوشش رفاهی خانوادگی دریافت می‌کنند.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Rocket className="h-4 w-4" />
                  ارزیابی طرح در بیزینس فنلاند
                </button>
                <a
                  href="tel:+982191693955"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4 text-amber-400" />
                  تهران: ۰۲۱ ۹۱۶۹ ۳۹۵۵
                </a>
                <a
                  href="tel:+436889763256"
                  dir="ltr"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-xs font-bold text-slate-200 transition hover:bg-white/10"
                >
                  Vienna: +43 688 976 3256
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[16/9] w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="شهر هلسینکی فنلاند، مرکز استارت‌آپ‌ها و فناوری اسکاندیناوی"
                  loading="eager"
                  fetchPriority="high"
                  width={1000}
                  height={563}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#082029]">
        <div className="container mx-auto max-w-5xl px-4 md:px-8">
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <Scale className="h-5 w-5 text-amber-400" />
            الزامات قانونی و مالی استارت‌آپ فنلاند ۲۰۲۶
          </h2>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="w-full text-right text-xs sm:text-sm">
              <tbody className="divide-y divide-white/10">
                {KEY_SPECS.map((row) => (
                  <tr key={row.label} className="hover:bg-white/[0.02]">
                    <th className="w-2/5 px-5 py-3.5 font-bold text-slate-300">{row.label}</th>
                    <td className="px-5 py-3.5 font-semibold text-white tabular-nums">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              فرآیند مرحله‌به‌مرحله تا کارت اقامت نوع A فنلاند
            </h2>
            {STEPS.map((s) => (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-bold text-amber-300 text-sm">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-amber-400/25 bg-amber-500/5 p-5">
              <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                نکات حساس در ممیزی Business Finland و تمدید
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>تمکن مالی باید کاملاً نقدشونده و به نام شخص متقاضی باشد تا افسر Migri اطمینان یابد در ۲ سال نخست نیازی به درآمد شرکت نیست.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>تاییدیه Business Finland تنها ۲ ماه اعتبار دارد؛ بنابراین مدارک ترجمه‌شده، گذرنامه و حساب بانکی باید پیشاپیش آماده باشند.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>تمدید کارت در پایان دوره بر مبنای پیشرفت واقعی محصول، قراردادهای مشتریان یا جذب سرمایه در فنلاند بررسی می‌شود.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                پورتال‌های رسمی دولت فنلاند
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://www.businessfinland.fi/en/do-business-with-us/startup-in-finland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>سازمان Business Finland — بخش استارت‌آپ</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://migri.fi/en/startup-entrepreneur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>اداره مهاجرت فنلاند (Migri — Startup Permit)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('selfemployed-finland')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    خوداشتغالی فنلاند
                  </button>
                  <span className="text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('startup-denmark')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    استارت‌آپ دانمارک
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#082029]">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول استارت‌آپ فنلاند</h2>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between px-5 py-4 text-right text-xs sm:text-sm font-bold text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-amber-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="border-t border-white/10 px-5 py-3.5 text-xs leading-relaxed text-slate-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartupFinlandPage;
