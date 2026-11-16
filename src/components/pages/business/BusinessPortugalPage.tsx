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
  Briefcase,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

const CANONICAL_URL = 'https://www.dia-co.ir/business-portugal';

const KEY_SPECS = [
  { label: 'ساختار حقوقی رایج', value: 'Lda (Sociedade por Quotas) یا Unipessoal Lda (تک‌مالکی)' },
  { label: 'حداقل سرمایه اسمی ثبت', value: '€۱ (در عمل واریز سرمایه در گردش و تمکن شخصی مطابق طرح D2 الزامی است)' },
  { label: 'مالیات بر درآمد شرکت (IRC) ۲۰۲۶', value: '۱۵٪ برای شرکت‌های SME تا €۵۰,۰۰۰ سود اول · ۲۰٪ نرخ استاندارد کشوری (+ Derrama محلی تا ۱.۵٪)' },
  { label: 'نوع ویزا و مرجع صدور کارت اقامت', value: 'ویزای کارآفرینی D2 از سفارت پرتغال → کارت اقامت ۲+۳ ساله از سازمان AIMA' },
  { label: 'شماره مالیاتی و ثبت آنلاین', value: 'دریافت شماره NIF، ثبت شرکت (Empresa na Hora) و حساب بانکی پرتغال' },
  { label: 'شرط حضور و شهروندی', value: 'در مسیر D2 عدم غیبت طولانی غیرموجه الزامی است · درخواست شهروندی پس از احراز اقامت قانونی و زبان پرتغالی A2' },
];

const STEPS = [
  {
    title: '۱. اخذ شماره مالیاتی پرتغال (NIF) و تعیین نماینده مالی',
    desc: 'دریافت کد NIF به عنوان پیش‌نیاز افتتاح حساب بانکی، ثبت شرکت و عقد اجاره‌نامه یا آدرس تجاری در لیسبون یا پورتو.',
  },
  {
    title: '۲. ثبت شرکت Lda و افتتاح حساب بانکی پرتغالی',
    desc: 'ثبت شرکت در مرکز ثبت تجاری (IRN / Empresa na Hora)، ثبت در اداره تأمین اجتماعی (Segurança Social) و واریز سرمایه عملیاتی.',
  },
  {
    title: '۳. تدوین بیزنس پلن D2 و درخواست ویزای اقامتی در سفارت',
    desc: 'ارائه طرح تجاری دارای توجیه اقتصادی برای پرتغال، تمکن مالی شخصی و قراردادهای تجاری یا خدماتی جهت صدور ویزای ۴ ماهه ورود.',
  },
  {
    title: '۴. مراجعه به سازمان AIMA و دریافت کارت اقامت ۲ ساله',
    desc: 'تکمیل بیومتریک در سازمان AIMA پرتغال، دریافت کارت اقامت قابل تمدید (۲ ساله و سپس ۳ ساله) و الحاق اعضای خانواده.',
  },
];

const FAQS = [
  {
    q: 'تفاوت ویزای D2 پرتغال با D7 و گلدن ویزا چیست؟',
    a: 'ویزای D7 برای افراد دارای درآمد غیرفعال ثابت (اجاره، حقوق بازنشستگی یا سود سهام) است و اجازه کارفرمایی محوری نمی‌خواهد؛ گلدن ویزا (پس از حذف بخش خرید ملک مسکونی) به صندوق‌های سرمایه‌گذاری €۵۰۰,۰۰۰ محدود شده؛ اما ویزای D2 مخصوص کارآفرینان، صاحبان شرکت (Lda) و فریلنسرهایی است که کسب‌وکار واقعی در پرتغال ایجاد می‌کنند.',
  },
  {
    q: 'آیا ثبت شرکت در پرتغال بدون وجود فعالیت واقعی برای تمدید اقامت D2 کافی است؟',
    a: 'خیر. در زمان تمدید کارت اقامت نزد AIMA پس از ۲ سال، ارائه اظهارنامه‌های مالیاتی فصلی، صورت‌های مالی امضاشده توسط حسابدار رسمی پرتغالی (TOC) و پرداخت بیمه تأمین اجتماعی برای تایید واقعی بودن فعالیت تجاری الزامی است.',
  },
  {
    q: 'وضعیت مالیات ویژه NHR در سال ۲۰۲۶ چگونه است؟',
    a: 'رژیم قدیمی NHR برای متقاضیان جدید متوقف شده و جای خود را به برنامه جدید IFICI (مالیات ۲۰ درصدی برای مشاغل علمی، تحقیقاتی، فناوری و مدیریت شرکت‌های صادرات‌محور واجد شرایط) داده است.',
  },
  {
    q: 'حداقل تمکن مالی شخصی علاوه بر سرمایه شرکت چقدر است؟',
    a: 'جدا از سرمایه عملیاتی شرکت در بیزنس پلن، متقاضی باید معادل حداقل ۱۲ ماه حداقل دستمزد قانونی پرتغال (در سال ۲۰۲۶ حدود €۹۲۰×۱۲ یعنی حدود €۱۱,۰۴۰ برای نفر اصلی، +۵۰٪ برای همسر و +۳۰٪ برای هر فرزند) به عنوان تمکن معیشتی نشان دهد.',
  },
];

export const BusinessPortugalPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ثبت شرکت در پرتغال Lda و ویزای کارآفرینی D2 ۲۰۲۶ | راهنمای AIMA | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت Lda در پرتغال و ویزای D2 کارآفرینی ۲۰۲۶؛ دریافت NIF، نرخ مالیات ۱۵٪ SME، نکات تمدید اقامت نزد AIMA و شرایط تمکن مالی با دیاکو.',
    canonical: '/business-portugal',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ثبت شرکت پرتغال ۲۰۲۶',
      'ویزای D2 پرتغال',
      'شرکت Lda پرتغال',
      'اداره مهاجرت AIMA پرتغال',
      'اخذ شماره NIF پرتغال',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای ثبت شرکت Lda در پرتغال و اخذ ویزای کارآفرینی D2 در سال ۲۰۲۶',
          description:
            'بررسی جامع ثبت شرکت در لیسبون و پورتو، دریافت NIF، مالیات IRC، الزامات بیزنس پلن ویزای D2 و تمدید اقامت در سازمان AIMA.',
          image: [
            'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80',
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
          name: 'مراحل ثبت شرکت در پرتغال و دریافت ویزای D2',
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
            { '@type': 'ListItem', position: 3, name: 'ثبت شرکت در پرتغال', item: CANONICAL_URL },
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
              دپارتمان اقامت کارآفرینی اروپای غربی دیاکو · پرتغال ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Briefcase className="h-4 w-4" />
                <span>ویزای تجاری D2 و تاسیس شرکت Lda در لیسبون و پورتو</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ثبت شرکت در پرتغال (Lda) و ویزای کارآفرینی D2 در سال ۲۰۲۶
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                پرتغال برای کارآفرینان و مدیران کسب‌وکارهایی که مایل به راه‌اندازی شرکت تجاری یا فعالیت حرفه‌ای در اتحادیه اروپا هستند، ویزای تخصصی D2 را بدون نیاز به خرید ملک ۵۰۰ هزار یورویی ارائه می‌دهد. ثبت شرکت Lda، دریافت کد مالیاتی NIF، افتتاح حساب و پیگیری پرونده در سازمان AIMA از جمله خدمات تخصصی تیم حقوقی دیاکو است.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  بررسی شرایط ویزای D2 پرتغال
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
                  src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="مناظر شهری و تجاری لیسبون پایتخت پرتغال"
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
            مشخصات ثبت شرکت Lda و ویزای کارآفرینی D2 پرتغال ۲۰۲۶
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
              مراحل ثبت شرکت تا دریافت کارت اقامت AIMA
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
                هشدارهای عملی و حقوقی پرتغال ۲۰۲۶
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>صف‌های وقت‌دهی سازمان AIMA پرتغال نیازمند پیگیری مداوم حقوقی پس از ورود با ویزای D2 هستند.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>داشتن حسابدار قانونی (Contabilista Certificado) و تسلیم گزارش‌های ماهانه و سالانه برای تمدید کارت اقامت پس از ۲ سال الزامی است.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                درگاه‌های رسمی پرتغال
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://aima.gov.pt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>سازمان مهاجرت پرتغال (AIMA)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://vistos.mne.gov.pt/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>پورتال ویزای وزارت امور خارجه پرتغال</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://justica.gov.pt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>پورتال ثبت تجاری و عدالت پرتغال (Justiça)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('jobseeker-portugal')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    جستجوی کار پرتغال
                  </button>
                  <span className="text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('business-greece')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    ثبت شرکت یونان
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#082029]">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول ثبت شرکت در پرتغال</h2>
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

export default BusinessPortugalPage;

