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

const CANONICAL_URL = 'https://www.dia-co.ir/startup-france';

const KEY_SPECS = [
  { label: 'نوع کارت اقامت', value: 'Passeport Talent — Projet économique innovant (۴ ساله)' },
  { label: 'نهاد تاییدکننده نوآوری', value: 'انکوباتورهای منتخب French Tech + تایید وزارت اقتصاد (DREETS / DGE)' },
  { label: 'الزام تمکن مالی (SMIC سالانه)', value: 'معادل حداقل ۱۲ ماه SMIC ناخالص فرانسه (~€۲۱,۸۰۰ در سال ۲۰۲۶)' },
  { label: 'مدرک زبان اولیه', value: 'بدون الزام مدرک زبان فرانسوی برای ویزای استارت‌آپ (پیگیری با انگلیسی)' },
  { label: 'اقامت همراه و کار همسر', value: 'همسر با کارت Passeport Talent (famille) دارای اجازه کار تمام‌وقت و آزاد' },
  { label: 'مسیر اقامت دائم و شهروندی', value: 'اقامت دائم ۱۰ ساله یا تقاضای تابعیت پس از ۵ سال اقامت قانونی پیوسته' },
];

const STEPS = [
  {
    title: '۱. پذیرش در انکوباتور رسمی و شتاب‌دهنده مورد تایید French Tech',
    desc: 'ارسال پیچ‌دک و طرح نوآورانه برای مجموعه‌های معتبر پاریس، لیون یا تولوز و اخذ نامه پذیرش رسمی.',
  },
  {
    title: '۲. ثبت درخواست تاییدیه نوآوری در پورتال DGE / DREETS',
    desc: 'بررسی اصالت فنی و اقتصادی پروژه توسط نهاد دولتی وزارت اقتصاد فرانسه جهت صدور مجوز پروژه نوآور.',
  },
  {
    title: '۳. تشکیل پرونده ویزای Passeport Talent در سفارت (VLS-TS)',
    desc: 'ارائه نامه تایید دولتی، گواهی تمکن مالی معادل حداقل حقوق سالانه SMIC و مدارک هویتی برای اخذ ویزای ملی فرانسه.',
  },
  {
    title: '۴. ورود به فرانسه، ثبت شرکت SAS و دریافت کارت ۴ ساله Prefecture',
    desc: 'ولیدیت ویزا در پورتال ANEF و دریافت کارت اقامت چندساله برای بنیان‌گذار و اعضای درجه یک خانواده.',
  },
];

const FAQS = [
  {
    q: 'تفاوت مسیر French Tech Founders با ویزای ثبت شرکت عادی فرانسه چیست؟',
    a: 'در ویزای French Tech به‌دلیل تایید شدن نوآوری پروژه توسط انکوباتور و وزارت اقتصاد، به‌جای اقامت یک‌ساله عادی از همان ابتدا کارت ۴ ساله Passeport Talent صادر شده و همسر نیز حق کار آزاد بدون محدودیت دریافت می‌کند.',
  },
  {
    q: 'آیا مبلغ تمکن مالی SMIC باید به عنوان هزینه پرداخت شود؟',
    a: 'خیر؛ مبلغ معادل حداقل حقوق سالانه قانونی فرانسه (SMIC) برای اثبات توان پوشش هزینه‌های زندگی شخصی متقاضی در حساب بانکی نشان داده می‌شود و مصرف اجباری دولتی ندارد.',
  },
  {
    q: 'آیا تنها انکوباتورهای پاریس مانند Station F مجاز به حمایت هستند؟',
    a: 'خیر؛ بیش از ۱۰۰ انکوباتور و شتاب‌دهنده در سراسر شهرهای فناوری فرانسه (لیون، تولوز، بوردو، گرنوبل و نیس) در شبکه La French Tech مجاز به پذیرش طرح‌های بین‌المللی هستند.',
  },
  {
    q: 'شرایط تمدید کارت Passeport Talent پس از ۴ سال چگونه است؟',
    a: 'در سال چهارم، ادامه فعالیت شرکت ثبت‌شده در فرانسه، ارائه صورت‌های مالی و تحقق معیارهای اقتصادی یا اشتغال‌زایی پیش‌بینی‌شده جهت تمدید ۴ ساله یا درخواست کارت اقامت ۱۰ ساله بررسی می‌شود.',
  },
];

export const StartupFrancePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای استارت‌آپ فرانسه ۲۰۲۶ | French Tech Visa و کارت ۴ ساله | دیاکو',
    description:
      'راهنمای کامل ویزای استارت‌آپ فرانسه ۲۰۲۶ (French Tech Visa): پذیرش انکوباتور، تایید DGE/DREETS، تمکن معادل SMIC و کارت ۴ ساله Passeport Talent با دیاکو.',
    canonical: '/startup-france',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'استارت آپ فرانسه ۲۰۲۶',
      'French Tech Visa',
      'کارت ۴ ساله Passeport Talent',
      'انکوباتور پاریس Station F',
      'اقامت نوآوری فرانسه',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای جامع French Tech Visa فرانسه ۲۰۲۶: کارت اقامت ۴ ساله و انکوباتورها',
          description:
            'بررسی مسیر ویزای فناوری فرانسه برای بنیان‌گذاران استارت‌آپ، پذیرش انکوباتورهای منتخب، تایید DGE و دریافت کارت ۴ ساله Passeport Talent.',
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
          name: 'مراحل دریافت French Tech Visa برای بنیان‌گذاران',
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
            { '@type': 'ListItem', position: 3, name: 'ویزای استارت‌آپ فرانسه', item: CANONICAL_URL },
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
              دپارتمان تخصصی فرانسه دیاکو · ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="h-4 w-4" />
                <span>French Tech Visa for Founders | کارت اقامت ۴ ساله</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ویزای استارت‌آپ فرانسه؛ کارت ۴ ساله Passeport Talent برای بنیان‌گذاران
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                برنامه French Tech Visa یکی از جذاب‌ترین گزینه‌های اقامتی اروپا برای استارت‌آپ‌هاست که به محض تأیید پروژه توسط یک انکوباتور رسمی و نهاد وزارت اقتصاد فرانسه، کارت اقامت ۴ ساله قابل تمدید برای متقاضی و همراهان (همراه با اجازه کار تمام‌وقت همسر) صادر می‌کند.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Rocket className="h-4 w-4" />
                  بررسی ایده برای French Tech
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
                  alt="پاریس فرانسه میزبان مراکز فناوری و برنامه French Tech"
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
            معیارهای قانونی French Tech Visa فرانسه در سال ۲۰۲۶
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
              فرآیند اخذ تاییدیه انکوباتور و کارت Passeport Talent
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
                نکات حقوقی و ممیزی پرونده فرانسه
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>تمامی انکوباتورها ظرفیت محدود پذیرش فصلی دارند؛ انتخاب انکوباتور هم‌راستا با حوزه فنی (FinTech, AI, BioTech) شانس تایید را دوچندان می‌کند.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>در مرحله اخذ ویزای ملی از سفارت فرانسه، شفافیت منبع تمکن بانکی معادل SMIC سالانه اهمیت بالایی دارد.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                مراجع رسمی دولت فرانسه
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://lafrenchtech.gouv.fr/en/french-tech-visa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>پورتال رسمی La French Tech Visa</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://www.service-public.fr/particuliers/vosdroits/F16922"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>سرویس دولتی Service-Public.fr (Passeport Talent)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('business-france')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    ثبت شرکت SAS/SARL فرانسه
                  </button>
                  <span className="text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('talent-france')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    ویزای تالنت فرانسه
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#082029]">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول ویزای استارت‌آپ فرانسه</h2>
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

export default StartupFrancePage;
