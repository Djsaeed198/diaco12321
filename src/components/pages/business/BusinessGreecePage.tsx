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
  MapPin,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

const CANONICAL_URL = 'https://www.dia-co.ir/business-greece';

const KEY_SPECS = [
  { label: 'محبوب‌ترین ساختار شرکت', value: 'IKE (شرکت سرمایه خصوصی — Idiotiki Kefalaiouchiki Etaireia)' },
  { label: 'حداقل سرمایه ثبتی IKE', value: '€۱ اسمی (با مشارکت سرمایه‌ای، غیرنقدی یا تضمینی)' },
  { label: 'نرخ مالیات بر سود شرکتی (CIT)', value: '۲۲٪ نرخ استاندارد + ۵٪ مالیات تقسیم سود (مجموع معادل ~۲۵.۹٪)' },
  { label: 'سامانه ثبت و شناسه مالیاتی', value: 'One-Stop-Shop (YMS) و سامانه GEMI + شماره مالیاتی AFM' },
  { label: 'مسیر اقامت سرمایه‌گذاری/تجاری', value: 'قانون مهاجرت ۵۰۳۸/۲۰۲۳ (مدیران اجرایی، استارت‌آپ یا سرمایه‌گذاری ملکی گلدن ویزا)' },
  { label: 'پشتیبانی مستقیم دفتر آتن', value: 'Grigoriou Lampraki 58, Glyfada, 166 75 Athens, Greece' },
];

const STEPS = [
  {
    title: '۱. اخذ شماره مالیاتی یونان (AFM) و کلیدهای الکترونیکی Taxisnet',
    desc: 'صدور کد مالیاتی شخصی مدیر و سهامداران با وکالت‌نامه رسمی نزد دفتر دیاکو در گلیفادای آتن.',
  },
  {
    title: '۲. ثبت نام شرکت در سامانه YMS / GEMI و دریافت اساسنامه',
    desc: 'تأیید نام تجاری و موضوع فعالیت (KAD)، صدور گواهی تأسیس از مرکز ثبت عمومی شرکت‌های یونان (GEMI).',
  },
  {
    title: '۳. ثبت‌نام در بیمه کارفرمایان EFKA و افتتاح حساب بانکی شرکتی',
    desc: 'انجام تشریفات بیمه اجباری مدیرعامل (EFKA) و ارائه مدارک KYC جهت افتتاح حساب بانکی در بانک‌های یونان.',
  },
  {
    title: '۴. تشکیل پرونده اقامت قانونی مطابق قانون ۵۰۳۸/۲۰۲۳ یا گلدن ویزا',
    desc: 'تعیین مناسب‌ترین کد اقامتی (مدیر شرکت خارجی با سرمایه/گردش مشخص یا ترکیب با خرید ملک قانون ۵۱۰۰/۲۰۲۴).',
  },
];

const FAQS = [
  {
    q: 'آیا با ثبت یک شرکت IKE با سرمایه ۱ یورو به صورت خودکار اقامت یونان صادر می‌شود؟',
    a: 'خیر؛ ثبت شرکت IKE برای راه‌اندازی فعالیت تجاری تنها ۱ یورو سرمایه اسمی لازم دارد، اما اخذ مجوز اقامت یونان تحت قانون ۵۰۳۸/۲۰۲۳ مستلزم رعایت شرایط مجزا (نظیر سرمایه‌گذاری معتبر، شعبه شرکت بین‌المللی، مدیران کلیدی با حقوق مشخص یا مسیر مستقل تمکن مالی/گلدن ویزا) است.',
  },
  {
    q: 'مالیات تقسیم سود و شرکتی در یونان در سال ۲۰۲۶ چقدر است؟',
    a: 'نرخ استاندارد مالیات بر سود شرکت‌های یونانی ۲۲٪ و نرخ مالیات تکلیفی توزیع سود (Dividends) تنها ۵٪ است که یکی از پایین‌ترین نرخ‌های سود سهام در اروپای غربی و جنوبی محسوب می‌شود.',
  },
  {
    q: 'آیا دفتر آتن هلدینگ دیاکو امور حسابداری و ثبت مالیاتی را انجام می‌دهد؟',
    a: 'بله؛ تیم حقوقی و حسابداری مستقر در دفتر گلیفادای آتن (Grigoriou Lampraki 58) کلیه مراحل ثبت در GEMI، صدور AFM و پیگیری‌های مالیاتی و بانکی را بدون واسطه انجام می‌دهد.',
  },
  {
    q: 'تفاوت ثبت شرکت IKE با گلدن ویزای یونان چیست؟',
    a: 'در ثبت شرکت، تمرکز بر عملیات بازرگانی، خدمات، گردشگری یا تجارت مدیترانه‌ای و پرداخت مالیات عملکرد است؛ در حالی که گلدن ویزای یونان (با سه آستانه جدید €۲۵۰,۰۰۰، €۴۰۰,۰۰۰ و €۸۰۰,۰۰۰ قانون ۵۱۰۰/۲۰۲۴) اقامت سرمایه‌گذاری ملکی بدون شرط حضور است.',
  },
];

export const BusinessGreecePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ثبت شرکت در یونان ۲۰۲۶ | شرکت IKE در آتن و دفتر گلیفادا | دیاکو',
    description:
      'راهنمای جامع ثبت شرکت IKE در یونان ۲۰۲۶: ثبت در GEMI، نرخ مالیات ۲۲٪ و ۵٪ تقسیم سود، شرایط اقامت قانون ۵۰۳۸/۲۰۲۳ و خدمات مستقیم دفتر آتن گلیفادا.',
    canonical: '/business-greece',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ثبت شرکت یونان ۲۰۲۶',
      'شرکت IKE یونان',
      'ثبت GEMI آتن',
      'مالیات ۵ درصد سود سهام یونان',
      'دفتر آتن دیاکو گلیفادا',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای ثبت شرکت خصوصی IKE در یونان و اقامت تجاری آتن ۲۰۲۶',
          description:
            'بررسی ساختار ثبت شرکت IKE در سامانه GEMI آتن، مالیات ۵٪ تقسیم سود و مسیرهای قانونی اقامت قانون ۵۰۳۸/۲۰۲۳ با دفتر آتن دیاکو.',
          image: [
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
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
          name: 'مراحل ثبت شرکت IKE در یونان',
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
            { '@type': 'ListItem', position: 3, name: 'ثبت شرکت در یونان', item: CANONICAL_URL },
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
              دفتر رسمی دیاکو در آتن (Glyfada) · ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="h-4 w-4" />
                <span>ثبت شرکت IKE در آتن | مالیات تقسیم سود ۵٪</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ثبت شرکت در یونان (IKE)؛ تجارت مدیترانه با دفتر رسمی گلیفادا آتن
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                ساختار شرکت سرمایه خصوصی IKE در یونان با حداقل سرمایه اسمی ۱ یورو و مالیات تنها ۵٪ بر توزیع سود، بستری کارآمد برای تجارت اروپایی، گردشگری و حمل‌ونقل دریایی است. تمامی امور ثبتی، شماره مالیاتی AFM و تطبیق اقامتی توسط دفتر مستقر هلدینگ دیاکو در آتن پیگیری می‌شود.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  بررسی ثبت شرکت در آتن
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
                  Athens / Europe: +43 688 976 3256
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[16/9] w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="نمای شهر آتن و سواحل تجاری گلیفادا یونان"
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
            ساختار قانونی و مالیاتی شرکت IKE در یونان ۲۰۲۶
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
              فرآیند تأسیس شرکت و پرونده حقوقی در آتن
            </h2>
            {STEPS.map((s) => (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-bold text-amber-300 text-sm">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                آدرس رسمی دفتر دیاکو در آتن
              </h3>
              <p className="mt-2 text-xs text-slate-200 leading-relaxed" dir="ltr">
                Grigoriou Lampraki 58, Glyfada, 166 75 Athens, Greece
              </p>
              <p className="mt-2 text-xs text-slate-400">
                کلیه خدمات ثبت شرکت، اخذ AFM و ممیزی اسناد با وکلای مقیم آتن انجام می‌شود.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-400/25 bg-amber-500/5 p-5">
              <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                تفکیک ثبت شرکت از اقامت قانونی
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                در صورت هدف‌گذاری برای اقامت بدون نیاز به مدیریت فعالیت تجاری، مسیر خرید ملک قانون ۵۱۰۰/۲۰۲۴ (گلدن ویزا) گزینه مستقیم‌تری است؛ ثبت شرکت IKE برای متقاضیانی است که تجارت فعال و صورتحساب واقعی اروپایی دارند.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                پورتال‌های رسمی یونان
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://www.businessportal.gr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>سازمان ثبت شرکت‌های یونان (GEMI / Business Portal)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://migration.gov.gr/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>وزارت مهاجرت و پناهندگی یونان</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('realestate-greece')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    گلدن ویزای یونان ۲۰۲۶
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#082029]">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول ثبت شرکت در یونان</h2>
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

export default BusinessGreecePage;
