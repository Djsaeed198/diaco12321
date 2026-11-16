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
  Landmark,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

const CANONICAL_URL = 'https://www.dia-co.ir/business-turkey';

const KEY_SPECS = [
  { label: 'ساختار متداول شرکت', value: 'Limited Şirket (Ltd. Şti.) یا Anonim Şirket (A.Ş.)' },
  { label: 'حداقل سرمایه ثبتی (مقررات جدید)', value: '۵۰,۰۰۰ لیر ترکیه برای Ltd. Şti. (افزایش‌یافته از ۱۰ هزار لیر) · ۲۵۰,۰۰۰ لیر برای A.Ş.' },
  { label: 'مالیات بر درآمد شرکتی (Kurumlar Vergisi)', value: '۲۵٪ روی سود خالص شرکت (پیشنهاد شفافیت مالیاتی در اتاق بازرگانی İTO)' },
  { label: 'شرط کلیدی مجوز کار شریک خارجی (Çalışma İzni)', value: 'سرمایه پرداخت‌شده معادل حداقل ۵۰۰,۰۰۰ لیر (حداقل ۲۰٪ سهم) + استخدام ۵ پرسنل شهروند ترک از ماه هفتم' },
  { label: 'ثبت تجاری و شماره مالیاتی', value: 'سامانه MERSİS، اتاق بازرگانی استانبول (İTO)، شماره مالیاتی Vergi Numarası و حسابدار رسمی SMMM' },
  { label: 'تفاوت با اقامت ملکی و شهروندی', value: 'ثبت شرکت اقامت خودکار نمی‌آورد · اقامت ملکی مستلزم خرید ملک از $۲۰۰,۰۰۰ به بالا و شهروندی از $۴۰۰,۰۰۰ است' },
];

const STEPS = [
  {
    title: '۱. اخذ شماره مالیاتی (Potansiyel Vergi Numarası) و تعیین حسابدار رسمی (SMMM)',
    desc: 'در ترکیه داشتن حسابدار رسمی دارای مجوز (Mali Müşavir) از روز اول ثبت و اجاره آدرس فیزیکی یا هوم‌آفیس برای تایید بازرس مالیاتی الزامی است.',
  },
  {
    title: '۲. ثبت اساسنامه در سامانه MERSİS و اتاق بازرگانی (İTO)',
    desc: 'ثبت در دفتر ثبت تجارت، چاپ آگهی در روزنامه رسمی Ticaret Sicil Gazetesi و صدور دفترچه قانونی دفاتر مالیاتی.',
  },
  {
    title: '۳. بازدید بازرس اداره مالیات (Yoklama) و پیگیری حساب بانکی شرکتی',
    desc: 'تأیید حضور فیزیکی در آدرس شرکت توسط مأمور مالیات و ارائه مدارک تجاری برای افتتاح حساب لیر و ارزی نزد بانک‌های ترکیه.',
  },
  {
    title: '۴. درخواست مجوز کار سهامدار خارجی در وزارت کار (ÇSGB)',
    desc: 'در صورت دارا بودن شرایط سرمایه پرداخت‌شده (۵۰۰ هزار لیر و سهم حداقل ۲۰٪) و برنامه استخدام ۵ پرسنل ترک، اخذ کارت Çalısma İzni صادر می‌شود.',
  },
];

const FAQS = [
  {
    q: 'آیا با ثبت یک شرکت ۵۰ هزار لیری در ترکیه می‌توان اقامت (کیملیک) دریافت کرد؟',
    a: 'خیر. صرف ثبت شرکت Limited با حداقل سرمایه ۵۰,۰۰۰ لیر هیچ اقامت یا مجوز کاری به شما نمی‌دهد. برای دریافت مجوز کار مدیرعامل/سهامدار خارجی (Çalışma İzni)، بر اساس دستورالعمل‌های جدید وزارت کار ترکیه (ÇSGB)، شرکت باید دارای سرمایه پرداخت‌شده کافی (دست‌کم ۵۰۰,۰۰۰ لیر یا معادل حدود ۱۰ تا ۱۵ هزار دلار با حداقل ۲۰٪ مالکیت متقاضی) باشد و از ۶ ماه دوم فعالیت، ۵ کارمند شهروند ترکیه برای هر متقاضی خارجی بیمه کند.',
  },
  {
    q: 'آیا افتتاح حساب بانکی شرکتی برای سهامداران ایرانی در ترکیه آسان است؟',
    a: 'در سال ۲۰۲۶ بانک‌های دولتی و خصوصی ترکیه (از جمله زراعت بانک، ایش‌بانک و واکیف‌بانک) برای ایرانیان بررسی‌های انطباقی سخت‌گیرانه‌تری انجام می‌دهند؛ بسیاری از شعب، داشتن کارت اقامت معتبر (İkamet) یا مجوز کار (Çalışma İzni) و اجاره‌نامه واقعی و سپرده تجاری را شرط افتتاح حساب شرکتی می‌دانند.',
  },
  {
    q: 'هزینه‌های ثابت نگهداری ماهانه یک شرکت فعال در استانبول چقدر است؟',
    a: 'علاوه بر مالیات ۲۵٪ روی سود، شرکت حتی در صورت عدم فعالیت موظف به تسلیم اظهارنامه‌های ماهانه و فصلی مالیات ارزش افزوده (KDV)، حق تمبر و دستمزد ماهانه حسابدار رسمی (SMMM) و اجاره دفتر است.',
  },
  {
    q: 'اگر هدف من فقط اقامت ترکیه بدون اشتغال یا تجارت پیچیده است، چه گزینه‌هایی وجود دارد؟',
    a: 'اقامت توریستی کوتاه‌مدت برای اتباع خارجی جدید بسیار محدود و در محله‌های بسته استانبول متوقف شده است. مسیرهای پایدارتر شامل خرید ملک مسکونی با ارزش کارشناسی حداقل ۲۰۰,۰۰۰ دلار در مناطق باز، ویزای تحصیلی یا استخدام در شرکت‌های دارای سهمیه قانونی است.',
  },
];

export const BusinessTurkeyPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ثبت شرکت در ترکیه ۲۰۲۶ | سرمایه ۵۰ هزار لیر، مالیات و مجوز کار | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت در ترکیه استانبول ۲۰۲۶: حداقل سرمایه جدید ۵۰,۰۰۰ لیر، مالیات ۲۵٪، ضوابط مجوز کار ÇSGB با ۵ پرسنل ترک و چالش‌های واقعی حساب بانکی با دیاکو.',
    canonical: '/business-turkey',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ثبت شرکت ترکیه ۲۰۲۶',
      'حداقل سرمایه شرکت لیمیتد ترکیه ۵۰ هزار لیر',
      'مجوز کار ترکیه چالیشما ایزنی',
      'مالیات شرکتی ترکیه ۲۵ درصد',
      'ثبت شرکت استانبول MERSIS',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای ثبت شرکت لیمیتد در ترکیه ۲۰۲۶: حداقل سرمایه ۵۰ هزار لیر و شروط مجوز کار',
          description:
            'بررسی اصلاحیه سرمایه شرکت‌های Limited Şirket در ترکیه، سامانه MERSİS، مالیات ۲۵٪ شرکتی، الزامات ۵ کارمند ترک برای Çalışma İzni و افتتاح حساب بانکی.',
          image: [
            'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
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
          name: 'مراحل ثبت شرکت در استانبول ترکیه و اخذ مجوز کار',
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
            { '@type': 'ListItem', position: 3, name: 'ثبت شرکت در ترکیه', item: CANONICAL_URL },
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
              دپارتمان ثبت شرکت منطقه‌ای دیاکو · ترکیه ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Landmark className="h-4 w-4" />
                <span>ثبت شرکت تجاری در استانبول تحت قوانین جدید تجارت ترکیه</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ثبت شرکت در ترکیه (Limited Şirket) ۲۰۲۶؛ سرمایه، مالیات و مجوز کار
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                ثبت شرکت در استانبول برای فعالیت‌های بازرگانی، ترانزیت منطقه‌ای و خدمات بین‌المللی همواره مورد توجه کارآفرینان ایرانی بوده است. در این راهنما با استناد به مقررات جدید قانون تجارت ترکیه (حداقل سرمایه ۵۰,۰۰۰ لیر برای Ltd. Şti.) و دستورالعمل‌های جدید وزارت کار (ÇSGB)، تفاوت میان ثبت صرف شرکت، افتتاح حساب بانکی و اخذ واقعی مجوز کار (Çalışma İzni) تشریح شده است.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  برآورد هزینه ثبت شرکت استانبول
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
                  src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="منطقه تجاری و مالی شهر استانبول ترکیه"
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
            مشخصات ثبت شرکت در ترکیه و ضوابط اقامت کاری ۲۰۲۶
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
              مراحل ثبت رسمی شرکت در اتاق بازرگانی استانبول
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
                واقعیت‌های بانکی و مجوز کار ترکیه ۲۰۲۶
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>ثبت شرکت بدون شرط سرمایه پرداخت‌شده ۵۰۰ هزار لیر و برنامه استخدام ۵ پرسنل ترک، مجوز کار (Çalışma İzni) صادر نمی‌کند.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>افتتاح حساب بانکی شرکتی به نام اتباع ایرانی مستلزم طی ممیزی بانکی، داشتن اقامت/آدرس تاییدشده و حضور مدیرعامل در شعبه است.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                درگاه‌های رسمی جمهوری ترکیه
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://www.ticaret.gov.tr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>وزارت تجارت ترکیه (Ticaret Bakanlığı / MERSİS)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://www.csgb.gov.tr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>وزارت کار و تأمین اجتماعی ترکیه (ÇSGB)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://en.goc.gov.tr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>اداره کل مهاجرت ترکیه (Göç İdaresi)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('citizenship-turkey')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    شهروندی ترکیه ($۴۰۰k)
                  </button>
                  <span className="text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('business-dubai')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    مقایسه با ثبت شرکت دبی
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#082029]">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول ثبت شرکت در ترکیه</h2>
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

export default BusinessTurkeyPage;

