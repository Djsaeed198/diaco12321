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

const CANONICAL_URL = 'https://www.dia-co.ir/business-slovakia';

const KEY_SPECS = [
  { label: 'ساختار حقوقی رایج', value: 's.r.o. (Spoločnosť s ručením obmedzeným — مسئولیت محدود)' },
  { label: 'حداقل سرمایه ثبتی قانونی', value: '€۵,۰۰۰ (حداقل سهم هر شریک: €۷۵۰)' },
  { label: 'مالیات بر درآمد شرکتی (CIT) ۲۰۲۶', value: '۱۰٪ تا سقف درآمد €۱۰۰,۰۰۰ · ۲۱٪ از €۱۰۰,۰۰۰ تا €۵ میلیون · ۲۴٪ بالای €۵ میلیون' },
  { label: 'حداقل مالیات سالانه شرکت (Daňová licencia)', value: 'از €۳۴۰ تا €۳,۸۴۰ در سال بسته به میزان گردش مالی شرکت' },
  { label: 'اقامت کسب‌وکار (Prechodný pobyt - Podnikanie)', value: 'ارزیابی بیزنس پلن توسط وزارت اقتصاد اسلوواکی + ارائه درخواست در سفارت و پلیس اتباع خارجی' },
  { label: 'شرط کلیدی تمدید کارت اقامت مدیرعامل s.r.o.', value: 'اثبات سود خالص پس از کسر مالیات معادل ۶۰ برابر حداقل معیشت قانونی (در سال ۲۰۲۶ حدود €۱۷,۰۰۰+)' },
];

const STEPS = [
  {
    title: '۱. تهیه مدارک، عدم سوءپیشینه آپوستیل/تاییدشده و آدرس ثبتی براتیسلاوا',
    desc: 'اخذ گواهی عدم سوءپیشینه با تاییدات سفارت و تنظیم قرارداد آدرس حقوقی و مجوز فعالیت تجاری (Živnosť).',
  },
  {
    title: '۲. ثبت شرکت s.r.o. در دادگاه ثبت تجاری اسلوواکی (ORSR)',
    desc: 'تنظیم سند تأسیس، دریافت شماره ثبت شرکت (IČO)، شماره مالیاتی (DIČ) و امکان ثبت برای مالیات ارزش افزوده.',
  },
  {
    title: '۳. تایید بیزنس پلن در وزارت اقتصاد و ثبت درخواست ویزا در سفارت',
    desc: 'مطابق مقررات به‌روزشده اسلوواکی، درخواست اولیه اقامت تجاری نیازمند ارائه طرح تجاری مستدل، حساب مالی شخصی و تاییدیه سفارت است.',
  },
  {
    title: '۴. دریافت کارت اقامت موقت از پلیس اتباع خارجی (Cudzinecká polícia)',
    desc: 'انجام آزمایش پزشکی بدو ورود، ثبت آدرس اقامت و دریافت کارت اقامت موقت تجاری در براتیسلاوا یا سایر شهرهای اسلوواکی.',
  },
];

const FAQS = [
  {
    q: 'آیا ثبت شرکت در اسلوواکی هنوز ارزان‌ترین راه اقامت شینگن است؟',
    a: 'از نظر حداقل سرمایه ثبتی شرکت (€۵,۰۰۰) و نرخ مالیات شرکت‌های کوچک (۱۰٪ تا درآمد ۱۰۰ هزار یورو)، اسلوواکی همچنان جزو اقتصادی‌ترین گزینه‌های اروپای مرکزی است؛ اما طبق اصلاحات سال‌های اخیر قانون اقامت، هزینه نگهداری واقعی (بیمه درمانی سالانه، حسابداری، مالیات حداقل شرکتی و الزام سودآوری برای تمدید) باید دقیق محاسبه شود.',
  },
  {
    q: 'آیا با ویزای توریستی شینگن می‌توان داخل اسلوواکی درخواست اقامت ثبت شرکت داد؟',
    a: 'خیر. طبق اصلاحات قانونی اسلوواکی، اتباع کشورهای ثالث برای دریافت اقامت اولیه به قصد کسب‌وکار (Podnikanie) باید پرونده خود را از طریق سفارت اسلوواکی در کشور مبدا یا محل اقامت قانونی (و همراه با تاییدیه طرح اقتصادی) پیگیری کنند و تبدیل مستقیم از ویزای توریستی C در داخل خاک اسلوواکی مجاز نیست.',
  },
  {
    q: 'شرط تمدید کارت اقامت مدیرعامل شرکت s.r.o. پس از سال اول چیست؟',
    a: 'برای تمدید اقامت موقت به عنوان مدیرعامل (Konateľ) یک شرکت s.r.o.، شرکت باید در سال مالی قبل سود خالص پس از کسر مالیات حداقل معادل ۶۰ برابر شاخص حداقل معیشت قانونی اسلوواکی (Štandard životného minima) کسب کرده و تمامی مالیات‌ها و بیمه‌های آن تسویه شده باشد.',
  },
  {
    q: 'نزدیکی براتیسلاوا به وین چه مزیت عملی برای صاحبان شرکت دارد؟',
    a: 'براتیسلاوا تنها حدود ۶۰ کیلومتر (کمتر از ۱ ساعت با قطار یا خودرو) با وین اتریش فاصله دارد و دسترسی هوایی از فرودگاه بین‌المللی وین (VIE) را بسیار آسان می‌کند، در حالی که ثبت شرکت در هر کشور تابع قوانین مالیاتی و اقامتی همان کشور است.',
  },
];

export const BusinessSlovakiaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ثبت شرکت در اسلوواکی s.r.o. ۲۰۲۶ | مالیات ۱۰٪ و ضوابط اقامت | دیاکو',
    description:
      'راهنمای کامل ثبت شرکت s.r.o. در اسلوواکی ۲۰۲۶: سرمایه ۵ هزار یورو، مالیات ۱۰٪ CIT تا ۱۰۰ هزار یورو، قوانین جدید سفارت و پلیس اتباع خارجی و شرط سود تمدید اقامت با دیاکو.',
    canonical: '/business-slovakia',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ثبت شرکت اسلوواکی ۲۰۲۶',
      'شرکت sro اسلوواکی',
      'اقامت تجاری براتیسلاوا',
      'مالیات ۱۰ درصد اسلوواکی',
      'قوانین جدید اقامت اسلوواکی',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای ثبت شرکت s.r.o. در اسلوواکی ۲۰۲۶: مالیات، سرمایه و شرایط اقامت',
          description:
            'بررسی ثبت شرکت در براتیسلاوا اسلوواکی، حداقل سرمایه ۵,۰۰۰ یورو، نرخ ۱۰٪ مالیات شرکت‌های کوچک، حداقل مالیات سالانه و ضوابط تمدید اقامت کارآفرینی.',
          image: [
            'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80',
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
          name: 'مراحل ثبت شرکت s.r.o. در اسلوواکی و اخذ اقامت تجاری',
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
            { '@type': 'ListItem', position: 3, name: 'ثبت شرکت در اسلوواکی', item: CANONICAL_URL },
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
              دپارتمان اقتصادی اروپای مرکزی دیاکو · اسلوواکی ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Landmark className="h-4 w-4" />
                <span>فاصله ۶۰ کیلومتری با وین و مالیات ۱۰٪ شرکت‌های کوچک</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ثبت شرکت در اسلوواکی (s.r.o.) ۲۰۲۶؛ هزینه، مالیات و قوانین جدید اقامت
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                اسلوواکی با پایتختی براتیسلاوا در همسایگی اتریش، یکی از گزینه‌های مطرح اروپای مرکزی برای ثبت شرکت s.r.o. است. در این راهنمای به‌روز، علاوه بر ساختار مالیاتی ۱۰ درصدی تا درآمد ۱۰۰ هزار یورو، مقررات جدید وزارت اقتصاد و پلیس اتباع خارجی اسلوواکی برای تایید بیزنس پلن و شرط سودآوری در تمدید کارت اقامت بررسی شده است.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  بررسی شرایط ثبت شرکت اسلوواکی
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
                  src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="براتیسلاوا پایتخت اسلوواکی مشرف بر رود دانوب"
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
            مشخصات ثبتی، مالیاتی و اقامتی شرکت s.r.o. در اسلوواکی ۲۰۲۶
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
              مراحل ثبت شرکت s.r.o. تا کارت اقامت پلیس اتباع خارجی
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
                الزامات قانونی اصلاحیه اقامت اسلوواکی
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>درخواست اولیه اقامت تجاری باید از سفارت اسلوواکی و همراه با بیزنس پلن مورد ارزیابی وزارت اقتصاد ثبت شود.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>شرکت‌های ثبت‌شده مکلف به پرداخت حداقل مالیات سالانه (Daňová licencia)، بیمه مدیرعامل و ثبت سود سالانه کافی برای تمدید کارت اقامت هستند.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                درگاه‌های رسمی دولت اسلوواکی
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://www.minv.sk/?residence-in-slovakia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>وزارت کشور و پلیس اتباع خارجی اسلوواکی</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://www.orsr.sk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>ثبت تجاری اسلوواکی (ORSR)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('business-austria')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    ثبت شرکت در اتریش (وین)
                  </button>
                  <span className="text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('realestate-slovakia')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    اقامت و ملک اسلوواکی
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#082029]">
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول ثبت شرکت در اسلوواکی</h2>
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

export default BusinessSlovakiaPage;

