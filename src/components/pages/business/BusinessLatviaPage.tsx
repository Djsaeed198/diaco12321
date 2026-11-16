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

const CANONICAL_URL = 'https://www.dia-co.ir/business-latvia';

const KEY_SPECS = [
  { label: 'ساختار حقوقی متداول', value: 'SIA استاندارد (Sabiedrība ar ierobežotu atbildību)' },
  { label: 'حداقل سرمایه ثبتی SIA', value: '€۲,۸۰۰ (مگر ثبت شرکت خرد Micro-SIA بدون شرایط اقامت)' },
  { label: 'مالیات بر سود شرکتی (CIT)', value: '۰٪ روی سود توزیع‌نشده و سرمایه‌گذاری مجدد؛ ۲۰٪ هنگام توزیع سود (۲۰/۸۰)' },
  { label: 'اقامت سرمایه‌گذاری شرکتی (PMLP §23)', value: 'حداقل €۵۰,۰۰۰ سرمایه‌گذاری شرکتی (<۵۰ کارمند / <€10M گردش) + €۴۰,۰۰۰ مالیات سالانه، یا €۱۰۰,۰۰۰ در شرکت بزرگتر + عوارض €۱۰,۰۰۰' },
  { label: 'مدت کارت اقامت و تمدید', value: 'مجوز اقامت موقت (TRP) تا ۵ سال با پایش سالیانه پرداخت مالیات' },
  { label: 'مرجع صدور اقامت و ثبت', value: 'اداره شهروندی و مهاجرت لتونی (PMLP) و اداره ثبت شرکت‌ها (UR)' },
];

const STEPS = [
  {
    title: '۱. انتخاب ساختار SIA و تهیه اساسنامه نزد دفترخانه لتونی',
    desc: 'ثبت شرکت در Register of Enterprises (UR) با تعیین مدیرعامل، سهام سرمایه و افتتاح حساب موقت.',
  },
  {
    title: '۲. اجرای سرمایه‌گذاری واجد شرایط ماده ۲۳ قانون مهاجرت لتونی',
    desc: 'افزایش یا واریز سرمایه شرکت طبق نصاب €۵۰,۰۰۰ یا €۱۰۰,۰۰۰ و پرداخت عوارض دولتی مربوطه در PMLP.',
  },
  {
    title: '۳. ارسال مدارک به PMLP و دریافت کارت اقامت شینگن (TRP)',
    desc: 'ارائه بیزینس پلن، مدارک تمکن معیشت شخصی و عدم سوءپیشینه جهت صدور کارت اقامت برای متقاضی و خانواده.',
  },
  {
    title: '۴. رعایت تعهد مالیاتی سالانه برای تمدید سال‌های دوم تا پنجم',
    desc: 'پایش عملکرد مالیاتی شرکت در اداره مالیات لتونی (VID) جهت تداوم اعتبار کارت اقامت ۵ ساله.',
  },
];

const FAQS = [
  {
    q: 'آیا با ثبت یک شرکت ۲,۸۰۰ یورویی در لتونی می‌توان اقامت این کشور را گرفت؟',
    a: 'خیر؛ سرمایه ۲,۸۰۰ یورو صرفاً برای تأسیس شرکت عادی SIA کافی است. برای اقامت سرمایه‌گذاری از طریق سهام شرکت (ماده ۲۳ قانون مهاجرت)، حداقل ۵۰,۰۰۰ یورو سرمایه‌گذاری (با شرط پرداخت دست‌کم ۴۰,۰۰۰ یورو مالیات سالانه) یا ۱۰۰,۰۰۰ یورو در شرکت‌های بزرگتر به علاوه عوارض دولتی ۱۰,۰۰۰ یورویی لازم است.',
  },
  {
    q: 'مدل مالیات صفر درصد لتونی دقیقاً چگونه کار می‌کند؟',
    a: 'تا زمانی که سود شرکت در داخل کسب‌وکار باقی بماند یا سرمایه‌گذاری مجدد شود، مالیات شرکتی ۰٪ است؛ اما هنگام برداشت و توزیع سود سهام (Dividends)، نرخ موثر ۲۰٪ (فرمول ۲۰/۸۰) محاسبه و کسر می‌گردد.',
  },
  {
    q: 'آیا برای دریافت اقامت دائم لتونی بعد از ۵ سال نیاز به زبان لتونیایی است؟',
    a: 'بله؛ برای دریافت کارت اقامت دائم لتونی (Permanent Residence) در پایان سال پنجم، قبولی در آزمون زبان لتونیایی در سطح A2 و رعایت شرط حضور فیزیکی قانونی الزامی است.',
  },
];

export const BusinessLatviaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ثبت شرکت در لتونی ۲۰۲۶ | شرکت SIA، مالیات ۰٪ و شرایط PMLP | دیاکو',
    description:
      'راهنمای شفاف ثبت شرکت SIA در لتونی ۲۰۲۶: تفاوت سرمایه عادی €۲,۸۰۰ با شرایط اقامت ماده ۲۳ PMLP (€۵۰,۰۰۰ سرمایه + تعهد مالیاتی)، مالیات ۰٪ سود غیرتوزیعی با دیاکو.',
    canonical: '/business-latvia',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ثبت شرکت لتونی ۲۰۲۶',
      'شرکت SIA لتونی',
      'اقامت لتونی ماده ۲۳ PMLP',
      'مالیات صفر درصد لتونی',
      'ثبت شرکت ریگا',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای ثبت شرکت SIA در لتونی و ضوابط اقامت PMLP در سال ۲۰۲۶',
          description:
            'بررسی ساختار شرکت SIA در ریگا لتونی، مدل مالیاتی ۰٪ بر سود غیرتوزیعی و الزامات قانونی ماده ۲۳ قانون مهاجرت برای اخذ کارت TRP ۵ ساله.',
          image: [
            'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
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
          name: 'مراحل ثبت شرکت SIA و اقامت در لتونی',
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
            { '@type': 'ListItem', position: 3, name: 'ثبت شرکت در لتونی', item: CANONICAL_URL },
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
              دپارتمان ثبت شرکت حوزه بالتیک دیاکو · لتونی ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="h-4 w-4" />
                <span>مالیات ۰٪ سود سرمایه‌گذاری مجدد | منطقه یورو و شینگن</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ثبت شرکت در لتونی (SIA)؛ نظام مالیاتی ۰٪ و شرایط واقعی اقامت PMLP
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                لتونی یکی از اقتصادهای دیجیتال حوزه بالتیک است که مالیات بر سود سرمایه‌گذاری مجدد شرکت‌ها را صفر درصد تعیین کرده است. بااین‌حال، اخذ مجوز اقامت سرمایه‌گذاری در ریگا مشمول نصاب‌های سرمایه و تعهد مالیاتی ماده ۲۳ قانون مهاجرت (PMLP) است که تمامی جزئیات واقعی آن را در ادامه می‌خوانید.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  بررسی اقامت ثبت شرکت لتونی
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
                  src="https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="بافت تاریخی و مراکز تجاری شهر ریگا پایتخت لتونی"
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
            مشخصات ثبتی، مالیاتی و اقامت سرمایه‌گذاری لتونی ۲۰۲۶
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
              مراحل ثبت SIA و اخذ کارت اقامت ۵ ساله
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
                نکات حساس تمدید در PMLP
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>اداره PMLP برای متقاضیان اتباع کشورهای مشمول بررسی امنیتی، ممیزی مضاعف (Additional Verification) انجام می‌دهد که زمان بررسی پرونده را طولانی‌تر می‌کند.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>عدم تحقق تعهد مالیات سالانه €۴۰,۰۰۰ در مسیر سرمایه‌گذاری ۵۰ هزار یورویی باعث ابطال تمدید کارت در سال دوم می‌شود.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                منابع رسمی لتونی
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://www.pmlp.gov.lv/en/residence-permit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>اداره مهاجرت لتونی (PMLP — اقامت سرمایه‌گذاری)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://www.ur.gov.lv/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>اداره ثبت شرکت‌های لتونی (Register of Enterprises)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('realestate-latvia')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    اقامت ملکی لتونی
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#082029]">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول ثبت شرکت در لتونی</h2>
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

export default BusinessLatviaPage;
