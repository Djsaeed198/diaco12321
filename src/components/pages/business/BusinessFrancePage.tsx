import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Building2,
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

const CANONICAL_URL = 'https://www.dia-co.ir/business-france';

const KEY_SPECS = [
  { label: 'ساختارهای رایج شرکت', value: 'SAS / SASU (انعطاف بالا) و SARL / EURL (مسئولیت محدود سنتی)' },
  { label: 'حداقل سرمایه ثبتی قانونی', value: '€۱ (اما برای افتتاح حساب و اخذ اقامت سرمایه عملی کافی توصیه می‌شود)' },
  { label: 'نرخ مالیات بر سود شرکت (IS)', value: '۱۵٪ برای ۴۲,۵۰۰ یورو سود اول (شرایط SME) و ۲۵٪ نرخ استاندارد' },
  { label: 'مرجع یکپارچه ثبت شرکت', value: 'پورتال ملی Guichet Unique (INPI) و ثبت نهایی در Greffe / Kbis' },
  { label: 'مسیرهای اقامت تجاری متداول', value: 'Entrepreneur / Profession Libérale (۱ ساله قابل تمدید) یا Passeport Talent Créateur (€۳۰,۰۰۰ سرمایه)' },
  { label: 'زمان تقریبی ثبت حقوقی', value: '۷ تا ۱۵ روز کاری پس از صدور گواهی واریز سرمایه (Attestation de dépôt)' },
];

const STEPS = [
  {
    title: '۱. انتخاب ساختار حقوقی (SAS یا SARL) و تنظیم پیش‌نویس اساسنامه',
    desc: 'تعیین سهامداران، اختیارات مدیرعامل (Président در SAS یا Gérant در SARL) و آدرس قانونی (Domiciliation).',
  },
  {
    title: '۲. واریز سرمایه اولیه و دریافت گواهی بلوکه بانکی یا دفترخانه',
    desc: 'واریز سرمایه به حساب موقت نزد بانک فرانسوی یا دفتر اسناد رسمی (Notaire) و دریافت Attestation de dépôt des fonds.',
  },
  {
    title: '۳. انتشار آگهی قانونی و ثبت در Guichet Unique (INPI)',
    desc: 'انتشار آگهی در روزنامه رسمی JAL و ثبت الکترونیکی مدارک جهت دریافت شماره SIREN و برگه ثبتی Kbis.',
  },
  {
    title: '۴. تشکیل پرونده اقامت بازرگانی یا ویزای Créateur d’entreprise',
    desc: 'ارائه بیزینس پلن، برگه Kbis و اثبات توجیه اقتصادی در سفارت فرانسه جهت دریافت ویزای ملی اقامتی.',
  },
];

const FAQS = [
  {
    q: 'تفاوت اصلی شرکت SAS و SARL در فرانسه چیست؟',
    a: 'در شرکت SAS مدیرعامل (Président) تحت نظام تأمین اجتماعی کارمندان (Assimilé-salarié) قرار می‌گیرد و تنظیم اساسنامه بسیار انعطاف‌پذیر است؛ در حالی که در SARL ساختار توسط قانون تجارت سفت‌وسخت‌تر تعریف شده و برای کسب‌وکارهای خانوادگی رایج‌تر است.',
  },
  {
    q: 'آیا با ثبت شرکت ۱ یورویی می‌توان اقامت فرانسه گرفت؟',
    a: 'خیر؛ اگرچه قانون تجارت ثبت شرکت با ۱ یورو را مجاز می‌داند، اما برای دریافت اقامت Entrepreneur/Profession Libérale افسر مهاجرت باید قانع شود که کسب‌وکار توان درآمدزایی معادل حداقل دستمزد قانونی فرانسه (SMIC) را دارد. همچنین برای کارت ۴ ساله Passeport Talent Créateur سرمایه‌گذاری حداقل ۳۰,۰۰۰ یورویی الزامی است.',
  },
  {
    q: 'آیا برای ثبت شرکت در فرانسه باید اقامت قبلی داشت؟',
    a: 'خیر؛ شهروندان غیراروپایی می‌توانند مالک و حتی مدیر شرکت فرانسوی باشند، اما برای فعالیت فیزیکی و اقامت در فرانسه اخذ ویزای بلندمدت VLS-TS مربوط به کارآفرینی الزامی است.',
  },
  {
    q: 'هزینه نگهداری سالانه شرکت در فرانسه چقدر است؟',
    a: 'هزینه‌های ثابت شامل اجاره آدرس ثبتی (Domiciliation حدود ۴۰ تا ۱۰۰ یورو در ماه)، حق‌الزحمه حسابدار رسمی (Expert-Comptable حدود ۱,۵۰۰ تا ۳,۰۰۰ یورو در سال) و مالیات محلی CFE است.',
  },
];

export const BusinessFrancePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ثبت شرکت در فرانسه ۲۰۲۶ | شرکت SAS و SARL پاریس | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت در فرانسه ۲۰۲۶: مقایسه SAS و SARL، ثبت در Guichet Unique (INPI)، مالیات ۱۵ تا ۲۵٪، گواهی Kbis و اقامت تجاری با دیاکو.',
    canonical: '/business-france',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ثبت شرکت فرانسه ۲۰۲۶',
      'شرکت SAS فرانسه',
      'شرکت SARL فرانسه',
      'کارت Kbis فرانسه',
      'اقامت تجاری Entrepreneur فرانسه',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای ثبت شرکت‌های تجاری SAS و SARL در فرانسه و اخذ اقامت ۲۰۲۶',
          description:
            'بررسی ساختار قانونی شرکت‌های SAS و SARL در فرانسه، فرآیند Guichet Unique INPI، نرخ مالیات و مسیرهای اخذ ویزای تجاری و Passeport Talent.',
          image: [
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
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
          name: 'مراحل ثبت شرکت در فرانسه و اخذ سند Kbis',
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
            { '@type': 'ListItem', position: 3, name: 'ثبت شرکت در فرانسه', item: CANONICAL_URL },
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
              دپارتمان حقوق شرکت‌های فرانسه دیاکو · ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="h-4 w-4" />
                <span>ثبت شرکت تجاری SAS / SARL در پاریس و سراسر فرانسه</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ثبت شرکت در فرانسه (SAS / SARL)؛ ساختار حقوقی، مالیات و اقامت
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                ثبت شرکت در فرانسه به شما امکان دسترسی مستقیم به دومین اقتصاد بزرگ اتحادیه اروپا، اعتبار تجاری پاریس و کد ارزش‌افزوده اروپایی را می‌دهد. فرآیند ثبت از طریق درگاه یکپارچه INPI تا صدور شماره SIREN و سند Kbis با پشتیبانی تیم حقوقی وین و وکلای همکار در فرانسه انجام می‌شود.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  بررسی نوع شرکت مناسب فرانسه
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
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="منطقه تجاری و خیابان‌های پاریس فرانسه"
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
            مشخصات ثبتی، مالیاتی و اقامتی شرکت در فرانسه ۲۰۲۶
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
              مراحل ثبت شرکت در فرانسه تا دریافت Kbis
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
                چالش‌های واقعی بانکی و اقامتی
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>افتتاح حساب بانکی شرکتی برای سهامداران ایرانی در بانک‌های سنتی فرانسه نیازمند تطبیق دقیق منشأ پول (KYC) و اغلب استفاده از دفاتر اسناد رسمی یا فین‌تک‌های مجاز فرانسوی است.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>صرف ثبت شرکت بدون طرح تجاری سودآور و پیش‌بینی قرارداد با مشتریان اروپایی، منجر به صدور ویزای اقامت در سفارت نمی‌شود.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                درگاه‌های رسمی ثبت شرکت فرانسه
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://procedures.inpi.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>درگاه رسمی ثبت شرکت INPI (Guichet Unique)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://www.infogreffe.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>اداره ثبت دادگاه‌های تجارت فرانسه (Infogreffe)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('startup-france')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    استارت‌آپ فرانسه
                  </button>
                  <span className="text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('business-austria')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    ثبت شرکت اتریش
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#082029]">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول ثبت شرکت در فرانسه</h2>
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

export default BusinessFrancePage;
