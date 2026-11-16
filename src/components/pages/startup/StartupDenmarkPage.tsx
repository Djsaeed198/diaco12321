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
  Building2,
  ExternalLink,
  AlertTriangle,
  Users,
  Scale,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

const CANONICAL_URL = 'https://www.dia-co.ir/startup-denmark';

const KEY_SPECS = [
  { label: 'مرجع ارزیابی طرح', value: 'پنل تخصصی Danish Business Authority (DBA)' },
  { label: 'حداکثر تعداد بنیان‌گذار در تیم', value: 'حداکثر ۳ بنیان‌گذار (حداقل ۱ نفر غیراروپایی)' },
  { label: 'مدت اعتبار اقامت اولیه و تمدید', value: '۲ سال اولیه + امکان تمدید تا ۳ سال' },
  { label: 'شرط زبان بین‌المللی', value: 'بدون الزام مدرک زبان رسمی برای اپلای (ارائه و دفاع انگلیسی)' },
  { label: 'تمکن مالی الزامی ۲۰۲۶ (SIRI)', value: 'پوشش ۱ سال معیشت فردی/خانوادگی مطابق نرخ رسمی روز SIRI' },
  { label: 'الزام ثبت شرکت در دانمارک', value: 'راه‌اندازی شرکت (معمولاً ApS یا Enkeltmandsvirksomhed) و حضور فعال در مدیریت' },
];

const STEPS = [
  {
    title: '۱. ثبت درخواست و ارائه بیزینس پلن در سامانه Startup Denmark',
    desc: 'ارسال طرح نوآورانه و مقیاس‌پذیر به زبان انگلیسی به پنل مستقل کارشناسان تحت نظارت Danish Business Authority.',
  },
  {
    title: '۲. دریافت تأییدیه رسمی پنل داوری (Panel Approval)',
    desc: 'ارزیابی ایده از نظر نوآوری، پتانسیل رشد بین‌المللی، ارزش افزوده برای اقتصاد دانمارک و صلاحیت تیم بنیان‌گذار.',
  },
  {
    title: '۳. ثبت پرونده اقامت در اداره مهاجرت SIRI و ارائه تمکن مالی',
    desc: 'تشکیل پرونده مجوز کار و اقامت خوداشتغالی در آژانس بین‌المللی استخدام و ادغام دانمارک (nyidanmark.dk) به همراه گواهی تمکن بانکی.',
  },
  {
    title: '۴. دریافت کارت اقامت ۲ ساله، شماره CPR و افتتاح حساب تجاری',
    desc: 'ورود به کپنهاگ یا سایر شهرهای دانمارک، ثبت آدرس (CPR)، دریافت کارت سلامت زرد و راه‌اندازی عملیات شرکت.',
  },
];

const FAQS = [
  {
    q: 'آیا برای اخذ ویزای استارت‌آپ دانمارک نیاز به جذب سرمایه اولیه (VC) وجود دارد؟',
    a: 'خیر، تاییدیه پنل Startup Denmark بر اساس کیفیت و نوآوری بیزینس پلن و توان اجرایی تیم صادر می‌شود؛ بااین‌حال، برای اخذ کارت اقامت از اداره SIRI باید تمکن مالی شخصی برای پوشش هزینه‌های زندگی یک سال خود و همراهان را در حساب بانکی اثبات کنید.',
  },
  {
    q: 'شرایط تمدید اقامت پس از ۲ سال اول در دانمارک چگونه است؟',
    a: 'در زمان تمدید، اداره SIRI با همکاری نهاد ارزیاب بررسی می‌کند که شرکت در دانمارک ثبت شده، فعالیت اقتصادی واقعی دارد و متقاضی نقش فعال مدیریتی ایفا می‌کند. بدون پیشرفت واقعی، تمدید با ریسک رد مواجه خواهد شد.',
  },
  {
    q: 'وضعیت همراهی خانواده و اجازه کار همسر در ویزای استارت‌آپ دانمارک چیست؟',
    a: 'همسر و فرزندان زیر ۱۸ سال می‌توانند به‌صورت همزمان درخواست اقامت همراه بدهند. همسر متقاضی اجازه کار تمام‌وقت در دانمارک دارد و فرزندان از خدمات آموزشی و درمانی سیستم رفاهی دانمارک بهره‌مند می‌شوند.',
  },
  {
    q: 'حداقل سرمایه ثبت شرکت با مسئولیت محدود (ApS) در دانمارک چقدر است؟',
    a: 'در ساختار شرکت با مسئولیت محدود (Anpartsselskab - ApS) حداقل سرمایه ثبتی طبق قانون شرکت‌های دانمارک از ۲۰۲۵ به ۲۰,۰۰۰ کرون دانمارک کاهش یافته است که پس از تایید و در فرآیند راه‌اندازی شرکت در کپنهاگ لحاظ می‌شود.',
  },
];

export const StartupDenmarkPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای استارت‌آپ دانمارک ۲۰۲۶ | برنامه Startup Denmark | دیاکو',
    description:
      'راهنمای کامل ویزای استارت‌آپ دانمارک ۲۰۲۶: تایید پنل تخصصی Danish Business Authority، اقامت ۲ ساله قابل تمدید، شرایط SIRI و تمکن مالی با نظارت وکلای دیاکو.',
    canonical: '/startup-denmark',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'استارت آپ دانمارک ۲۰۲۶',
      'Startup Denmark',
      'اقامت کارآفرینی دانمارک',
      'اداره مهاجرت SIRI دانمارک',
      'ثبت شرکت ApS دانمارک',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای جامع برنامه Startup Denmark دانمارک ۲۰۲۶: پنل داوری و اقامت ۲ ساله',
          description:
            'بررسی دقیق مسیر ویزای استارت‌آپ دانمارک، معیارهای نوآوری پنل DBA، شرایط تمکن مالی SIRI و نکات حقوقی تمدید اقامت در کپنهاگ.',
          image: [
            'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
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
          name: 'مراحل اخذ ویزای استارت‌آپ دانمارک (Startup Denmark)',
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
            { '@type': 'ListItem', position: 3, name: 'ویزای استارت‌آپ دانمارک', item: CANONICAL_URL },
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
              دپارتمان تخصصی اسکاندیناوی دیاکو · دانمارک ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="h-4 w-4" />
                <span>برنامه رسمی Startup Denmark | نظارت وین و تهران</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ویزای استارت‌آپ دانمارک؛ اقامت کارآفرینی با تایید پنل رسمی DBA
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                برنامه دولتی Startup Denmark مسیر قانونی کارآفرینان غیراتحادیه اروپا برای راه‌اندازی کسب‌وکارهای نوآورانه و مقیاس‌پذیر در دانمارک است. در این مسیر، طرح تجاری شما توسط پنل کارشناسان مستقل زیر نظر اداره امور کسب‌وکار دانمارک (Danish Business Authority) ارزیابی شده و در صورت تأیید، اقامت ۲ ساله کاری-کارآفرینی از طریق اداره SIRI صادر می‌شود.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Rocket className="h-4 w-4" />
                  ارزیابی طرح در Startup Denmark
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
                  src="https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="نمای بندر نیهاون و اکوسیستم کسب‌وکار کپنهاگ دانمارک"
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

      {/* مشخصات کلیدی ۲۰۲۶ */}
      <section className="py-12 bg-[#082029]">
        <div className="container mx-auto max-w-5xl px-4 md:px-8">
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <Scale className="h-5 w-5 text-amber-400" />
            مشخصات حقوقی و مالی برنامه Startup Denmark در سال ۲۰۲۶
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

      {/* مراحل اجرا و ریسک‌ها */}
      <section className="py-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              نقشه راه ۴ مرحله‌ای دریافت اقامت استارت‌آپ دانمارک
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
                نکات و ریسک‌های مهم حقوقی
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>طرح‌های سنتی (مانند رستوران، خرده‌فروشی یا مشاوره معمولی) توسط پنل DBA رد می‌شوند؛ تمرکز روی نوآوری، فناوری و مقیاس‌پذیری ضروری است.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>اجازه کار این ویزا محدود به شرکت استارت‌آپ خودتان است و اشتغال همزمان در شرکت‌های دیگر بدون مجوز جداگانه مجاز نیست.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>برای بررسی و پیگیری پرونده هیچ دفتر اختصاصی دیاکو در کپنهاگ نیاز نیست؛ مکاتبات حقوقی مستقیماً با وکیل همکار اروپایی و تیم مرکزی وین انجام می‌شود.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                مراجع رسمی دولتی دانمارک
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://startupdenmark.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>پورتال رسمی Startup Denmark (DBA)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://www.nyidanmark.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>اداره مهاجرت و استخدام دانمارک (SIRI / Ny i Danmark)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('startup-finland')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    استارت‌آپ فنلاند
                  </button>
                  <span className="text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('startup-austria')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    استارت‌آپ اتریش
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* سوالات متداول */}
      <section className="py-12 bg-[#082029]">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول ویزای استارت‌آپ دانمارک</h2>
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

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <Users className="h-6 w-6 text-amber-400 mx-auto mb-2" />
            <h3 className="text-base font-black text-white">ارزیابی انطباق ایده با معیارهای پنل دانمارک</h3>
            <p className="mt-1 text-xs text-slate-300">
              هلدینگ مهاجرتی دیاکو (تأسیس ۱۳۹۴ / ۲۰۱۵ · ۲,۱۵۰+ پرونده اقامتی موفق · مستقر در وین، آتن و تهران) پیش از ارسال طرح، نقاط قوت و ضعف بیزینس پلن را ممیزی می‌کند.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-xl bg-[#f5a623] px-5 py-2.5 text-xs font-black text-[#082833] hover:bg-amber-300 cursor-pointer"
              >
                ثبت فرم ارزیابی استارت‌آپ
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-2.5 text-xs font-bold text-emerald-300"
              >
                واتساپ مشاوره: ۰۹۱۹۷۳۴۰۸۲۹
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartupDenmarkPage;
