import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Building2,
  ShieldCheck,
  ExternalLink,
  AlertTriangle,
  Scale,
  Percent,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

const CANONICAL_URL = 'https://www.dia-co.ir/business-hungary';

const KEY_SPECS = [
  { label: 'ساختار متداول شرکت', value: 'Kft (Korlátolt Felelősségű Társaság — مسئولیت محدود)' },
  { label: 'حداقل سرمایه ثبتی Kft', value: '۳,۰۰۰,۰۰۰ فورینت مجارستان (تقریباً €۷,۵۰۰ تا €۷,۸۰۰)' },
  { label: 'مالیات بر درآمد شرکتی (TAO)', value: '۹٪ ثابت (پایین‌ترین نرخ رسمی در اتحادیه اروپا)' },
  { label: 'مالیات محلی کسب‌وکار (HIPA)', value: 'تا ۲٪ روی درآمد ناخالص منهای هزینه کالا/مواد (در بوداپست ۲٪)' },
  { label: 'قانون اقامت کارآفرینی ۲۰۲۶', value: 'Guest Self-Employment تحت قانون Act XC of 2023 (تا ۱+۲ سال، غیرقابل تبدیل مستقیم به اقامت دائم)' },
  { label: 'ثبت شرکت و کد EU VAT', value: '۴ تا ۶ روز کاری از طریق وکیل مجاری در دادگاه ثبت شرکت‌ها' },
];

const STEPS = [
  {
    title: '۱. تنظیم اساسنامه (Létesítő okirat) و تأیید وکیل دادگستری مجارستان',
    desc: 'در مجارستان ثبت شرکت Kft اجباراً از طریق وکیل مجاری (Ügyvéd) در سامانه الکترونیکی دادگاه ثبت شرکت‌ها (Cégbíróság) انجام می‌شود.',
  },
  {
    title: '۲. ثبت نام، آدرس ثبتی بوداپست و صدور فوری شماره EU VAT',
    desc: 'دریافت شماره ثبت شرکت (Cégjegyzékszám)، شماره مالیاتی داخلی و شماره مالیات بر ارزش افزوده اتحادیه اروپا.',
  },
  {
    title: '۳. افتتاح حساب بانکی شرکتی به فورینت و یورو',
    desc: 'افتتاح حساب و واریز سرمایه ثبتی Kft مطابق قوانین بانک مرکزی و ممیزی منشأ سرمایه.',
  },
  {
    title: '۴. درخواست مجوز اقامت Guest Self-Employment در Enter Hungary',
    desc: 'ارائه بیزینس پلن، مدارک تمکن مالی و قراردادهای تجاری جهت اخذ مجوز اقامت خوداشتغالی یا کارفرمایی.',
  },
];

const FAQS = [
  {
    q: 'آیا با ثبت شرکت Kft مجارستان تحت قانون Act XC of 2023 می‌توان اقامت دائم گرفت؟',
    a: 'نکته بسیار مهم در قانون جدید مهاجرت مجارستان (Act XC of 2023) این است که اقامت «Guest Self-Employment» (۱ سال + قابل تمدید ۲ سال) به تنهایی منجر به کارت اقامت دائم (National Residence Card) نمی‌شود، مگر اینکه متقاضی به مسیرهای واجد شرایط مثل Hungarian Card یا سرمایه‌گذاری Guest Investor (€۲۵۰,۰۰۰+) تغییر وضعیت دهد.',
  },
  {
    q: 'آیا مالیات کل در مجارستان فقط ۹٪ است؟',
    a: 'نرخ مالیات بر سود خالص شرکت (TAO) دقیقاً ۹٪ است؛ اما باید مالیات محلی کسب‌وکار (HIPA با سقف ۲٪ در بوداپست)، مالیات توزیع سود سهام برای اشخاص حقیقی (۱۵٪ SZJA) و هزینه حسابداری ماهانه را هم در محاسبات تجاری لحاظ کنید.',
  },
  {
    q: 'چگونه مشکل مسدودی یا سخت‌گیری افتتاح حساب بانکی در مجارستان را حل کنیم؟',
    a: 'بانک‌های مجارستان در سال ۲۰۲۶ برای سهامداران غیراتحادیه اروپا حضور فیزیکی مدیرعامل در شعبه بوداپست و ارائه مدارک واضح قراردادها و پیش‌فاکتورها (Business Substance) را مطالبه می‌کنند.',
  },
  {
    q: 'حداقل سرمایه ۳ میلیون فورینت تا چه زمانی باید در حساب شرکت بماند؟',
    a: 'سرمایه ۳ میلیون فورینت بلوکه دائمی نیست و پس از ثبت و افتتاح حساب شرکتی، به عنوان سرمایه در گردش برای هزینه‌های قانونی کسب‌وکار (اجاره دفتر، خرید تجهیزات، حقوق و بازاریابی) قابل استفاده است.',
  },
];

export const BusinessHungaryPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ثبت شرکت در مجارستان Kft ۲۰۲۶ | مالیات ۹٪ و قوانین اقامت | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت Kft در مجارستان ۲۰۲۶: حداقل سرمایه ۳ میلیون فورینت، مالیات ۹٪ TAO و HIPA، نکات حیاتی قانون Act XC of 2023 و Enter Hungary با دیاکو.',
    canonical: '/business-hungary',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ثبت شرکت مجارستان ۲۰۲۶',
      'شرکت Kft مجارستان',
      'مالیات ۹ درصد مجارستان',
      'اقامت خوداشتغالی مجارستان Act XC',
      'سامانه Enter Hungary',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای ثبت شرکت Kft در مجارستان ۲۰۲۶: مالیات ۹٪ و ضوابط قانون جدید اقامت',
          description:
            'بررسی ثبت شرکت Kft در بوداپست مجارستان، حداقل سرمایه ۳ میلیون فورینت، نرخ ۹٪ مالیات شرکتی و نکات قانونی اقامت خوداشتغالی در Enter Hungary.',
          image: [
            'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=80',
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
          name: 'مراحل ثبت شرکت Kft در بوداپست مجارستان',
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
            { '@type': 'ListItem', position: 3, name: 'ثبت شرکت در مجارستان', item: CANONICAL_URL },
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
              دپارتمان اقتصادی اروپای مرکزی دیاکو · مجارستان ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Percent className="h-4 w-4" />
                <span>مالیات بر سود شرکتی ۹٪ (کمترین در اتحادیه اروپا)</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ثبت شرکت در مجارستان (Kft)؛ ساختار ۹٪ مالیاتی و قوانین اقامت ۲۰۲۶
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                مجارستان با نرخ مالیات بر سود شرکتی ۹٪ و صدور سریع شماره EU VAT، یکی از محبوب‌ترین حوزه‌های ثبت شرکت تجاری در اروپای مرکزی است. در ادامه، علاوه‌بر مزایای مالیاتی ثبت Kft در بوداپست، تفاوت‌های مهم قانون جدید مهاجرت مجارستان (Act XC of 2023) درباره مسیر اقامت دائم را با شفافیت کامل بررسی کرده‌ایم.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  برآورد ثبت شرکت Kft مجارستان
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
                  src="https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="پل زنجیری و پارلمان بوداپست مجارستان"
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
            جزئیات قانونی، سرمایه و مالیات شرکت Kft در مجارستان ۲۰۲۶
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
              فرآیند تأسیس شرکت Kft و اقدام اقامتی
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
                هشدار حقوقی درباره قانون Act XC of 2023
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>اقامت «خوداشتغالی مهمان» حداکثر تا ۳ سال (۱+۲) صادر می‌شود و مستقیم به اقامت دائم نمی‌رسد؛ برای اقامت دائم یا باید Hungarian Card (کار تخصصی) داشت یا از مسیرهای سرمایه‌گذاری/کشور جایگزین مثل اتریش استفاده کرد.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>ثبت و افتتاح حساب شرکتی نیازمند داشتن حسابدار ماهانه و گزارش‌دهی فصلی مالیات ارزش افزوده است.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                درگاه‌های رسمی مجارستان
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://enterhungary.gov.hu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>پورتال اقامت مجارستان (Enter Hungary / OIF)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://nav.gov.hu/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>اداره ملی مالیات و گمرک مجارستان (NAV)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('hungary-blue-card')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    بلوکارت مجارستان
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
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول ثبت شرکت در مجارستان</h2>
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

export default BusinessHungaryPage;
