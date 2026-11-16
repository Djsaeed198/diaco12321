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

const CANONICAL_URL = 'https://www.dia-co.ir/startup-netherlands';

const KEY_SPECS = [
  { label: 'مرجع صدور اقامت و ارزیابی', value: 'اداره مهاجرت IND با ارزیابی آژانس کسب‌وکار RVO' },
  { label: 'پیش‌نیاز کلیدی ورود', value: 'قرارداد رسمی مربی‌گری با Facilitator مورد تأیید RVO' },
  { label: 'مدت اعتبار اقامت استارت‌آپ', value: '۱ سال غیرقابل تمدید (تبدیل به اقامت خوداشتغالی در پایان سال)' },
  { label: 'تمکن مالی معیشت ۲۰۲۶ (IND)', value: 'حداقل ۵۰٪ نرخ ماهانه پایه زوجین در هلند (~€۱,۳۰۰+/ماه برای ۱ سال)' },
  { label: 'شرط مالکیت سهام و ثبت', value: 'ثبت شرکت در KVK هلند و مالکیت/کنترل فعال بنیان‌گذار' },
  { label: 'وضعیت همراهی خانواده', value: 'امکان همراهی همسر با اجازه کار آزاد (بدون نیاز به مجوز TWV)' },
];

const STEPS = [
  {
    title: '۱. تدوین Step-by-Step Plan و جذب تاییدیه Facilitator رسمی',
    desc: 'آماده‌سازی نقشه راه محصول، مدل درآمدی و عقد قرارداد همکاری با یکی از شتاب‌دهنده‌ها یا تسهیل‌کننده‌های مجاز در فهرست RVO.',
  },
  {
    title: '۲. ثبت پرونده ویزای MVV و اقامت استارت‌آپ در IND',
    desc: 'ارسال قرارداد تسهیل‌کننده، طرح گام‌به‌گام و گواهی تمکن بانکی جهت بررسی همزمان IND و کارشناسان نوآوری RVO.',
  },
  {
    title: '۳. ورود به هلند، ثبت شهرداری BSN و عضویت KVK',
    desc: 'دریافت کارت اقامت یک‌ساله، ثبت شرکت در اتاق بازرگانی هلند (KVK) و آغاز استقرار زیر نظر Facilitator.',
  },
  {
    title: '۴. تبدیل به اقامت خوداشتغالی (Self-Employed) پیش از انقضا',
    desc: 'ارائه گزارش پیشرفت از تسهیل‌کننده و مدارک مالی شرکت به IND برای دریافت اقامت بلندمدت خوداشتغالی.',
  },
];

const FAQS = [
  {
    q: 'تسهیل‌کننده (Facilitator) در ویزای استارت‌آپ هلند چه نقشی دارد؟',
    a: 'فسیلیتیتور یک شتاب‌دهنده یا سرمایه‌گذار معتبر است که نام آن در فهرست رسمی RVO ثبت شده است. این نهاد نباید بالای ۲۵٪ از سهام شرکت شما را تملک کند و موظف است در سال اول در زمینه مدیریت، مالی و شبکه‌سازی راهنمایی ارائه دهد.',
  },
  {
    q: 'آیا ویزای استارت‌آپ هلند قابل تمدید است؟',
    a: 'خیر؛ این ویزا دقیقاً برای ۱ سال صادر می‌شود و قبل از پایان سال اول باید با ارائه بیانیه تایید تسهیل‌کننده و عملکرد واقعی کسب‌وکار، درخواست تبدیل به اقامت «خوداشتغالی» (Zelfstandig ondernemer) را به IND ارسال کنید.',
  },
  {
    q: 'آیا برای دریافت ویزای استارت‌آپ هلند نیاز به مدرک آیلتس هست؟',
    a: 'قانون IND مدرک زبان آیلتس یا هلندی را برای این مسیر اجباری نکرده است؛ اما تسلط عملی به زبان انگلیسی برای مصاحبه و دفاع از طرح نزد Facilitator الزامی است.',
  },
  {
    q: 'همسر متقاضی استارت‌آپ هلند چه حقوقی دارد؟',
    a: 'همسر و فرزندان زیر ۱۸ سال می‌توانند همزمان با متقاضی اقامت دریافت کنند و روی کارت اقامت همسر عبارت اجازه کار آزاد بدون محدودیت (Arbeid vrij toegestaan) درج می‌شود.',
  },
];

export const StartupNetherlandsPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای استارت‌آپ هلند ۲۰۲۶ | تسهیل‌کننده RVO و اقامت IND | دیاکو',
    description:
      'راهنمای جامع ویزای استارت‌آپ هلند ۲۰۲۶: قرارداد با Facilitator مورد تایید RVO، اقامت ۱ ساله IND، شرایط تمکن و تبدیل به اقامت خوداشتغالی با دیاکو.',
    canonical: '/startup-netherlands',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'استارت آپ هلند ۲۰۲۶',
      'Netherlands Startup Visa',
      'تسهیل کننده RVO هلند',
      'اقامت IND هلند',
      'تبدیل استارت آپ به خوداشتغالی هلند',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای جامع ویزای استارت‌آپ هلند ۲۰۲۶: توافقنامه Facilitator و RVO',
          description:
            'بررسی فرآیند ویزای استارت‌آپ یک‌ساله هلند، شرایط همکاری با تسهیل‌کننده‌های مورد تایید RVO و تبدیل به اقامت خوداشتغالی در IND.',
          image: [
            'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
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
          name: 'مراحل اخذ ویزای استارت‌آپ هلند',
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
            { '@type': 'ListItem', position: 3, name: 'ویزای استارت‌آپ هلند', item: CANONICAL_URL },
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
              دپارتمان تخصصی بنلوکس دیاکو · هلند ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="h-4 w-4" />
                <span>ویزای استارت‌آپ هلند | اکوسیستم آمستردام و آیندهوون</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ویزای استارت‌آپ هلند؛ ورود با تسهیل‌کننده RVO و تبدیل به اقامت خوداشتغالی
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                هلند دروازه تجاری اروپا با محیط انگلیسی‌زبان و زیرساخت‌های دیجیتال پیشرفته است. برنامه اقامت استارت‌آپ به بنیان‌گذاران نوآور اجازه می‌دهد با قرارداد مربی‌گری یک Facilitator رسمی مورد تایید آژانس RVO، ویزای یک‌ساله دریافت کرده و سپس آن را به اقامت خوداشتغالی IND تبدیل نمایند.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Rocket className="h-4 w-4" />
                  بررسی انطباق با شتاب‌دهنده‌های هلند
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
                  src="https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="کانال‌ها و منطقه تجاری مدرن آمستردام هلند"
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
            مشخصات حقوقی و شرایط ویزای استارت‌آپ هلند ۲۰۲۶
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
              مراحل اجرایی از جذب تسهیل‌کننده تا اقامت خوداشتغالی
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
                توصیه‌های کلیدی برای تبدیل موفق به اقامت خوداشتغالی
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>با توجه به مهلت دقیق ۱ ساله، ثبت شرکت در KVK و افتتاح حساب بانکی تجاری هلندی باید بلافاصله در فصل اول پس از ورود پیگیری شود.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>در صورت اخذ تاییدیه مثبت Facilitator در پایان سال، فرآیند تبدیل به اقامت خوداشتغالی بدون نیاز به سیستم امتیازدهی سخت‌گیرانه معمول تسهیل می‌شود.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                منابع رسمی هلند
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://ind.nl/en/residence-permits/work/residence-permit-start-up"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>اداره مهاجرت هلند (IND — Startup Permit)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://www.rvo.nl/onderwerpen/start-up-regeling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>آژانس کسب‌وکار هلند (RVO — فهرست Facilitator)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('business-netherlands')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    ثبت شرکت BV هلند
                  </button>
                  <span className="text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('academic-netherlands')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    تحصیل در هلند
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#082029]">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول ویزای استارت‌آپ هلند</h2>
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

export default StartupNetherlandsPage;
