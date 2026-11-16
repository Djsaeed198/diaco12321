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

const CANONICAL_URL = 'https://www.dia-co.ir/business-poland';

const KEY_SPECS = [
  { label: 'ساختار حقوقی رایج', value: 'Sp. z o.o. (Spółka z ograniczoną odpowiedzialnością)' },
  { label: 'حداقل سرمایه ثبتی قانونی', value: '۵,۰۰۰ زلوتی لهستان (تقریباً €۱,۱۵۰ تا €۱,۲۰۰)' },
  { label: 'نرخ مالیات شرکتی (CIT) ۲۰۲۶', value: '۹٪ برای شرکت‌های کوچک با درآمد ناخالص سالانه زیر €۲ میلیون · ۱۹٪ استاندارد' },
  { label: 'بازه ثبت در سامانه KRS / S24', value: '۵ تا ۱۰ روز کاری پس از صدور شناسه PESEL و امضای الکترونیک ePUAP' },
  { label: 'شرط کلیدی کارت اقامت (Karta Pobytu)', value: 'احراز درآمد سالانه کافی شرکت یا استخدام حداقل ۲ نیروی تمام‌وقت دارای مجوز کار در لهستان' },
  { label: 'تمدید و اقامت دائم اتحادیه اروپا', value: 'کارت اقامت موقت ۱ تا ۳ ساله · امکان درخواست اقامت دائم بلندمدت EU پس از ۵ سال اقامت قانونی و زبان B1' },
];

const STEPS = [
  {
    title: '۱. اخذ شماره شناسایی PESEL و پروفایل امضای دیجیتال (ePUAP)',
    desc: 'برای استفاده از پورتال ثبت آنلاین S24 یا امضای گزارش‌های مالی الکترونیکی eKRS، مدیرعامل باید دارای شماره PESEL و امضای معتبر باشد.',
  },
  {
    title: '۲. ثبت اساسنامه در سیستم S24 یا دفتر اسناد رسمی در سامانه KRS',
    desc: 'دریافت شماره‌های KRS (ثبت تجاری)، REGON (آمار) و NIP (شناسه مالیاتی) به همراه ثبت اجباری در رجیستری ذینفعان واقعی (CRBR) ظرف ۱۴ روز.',
  },
  {
    title: '۳. فعال‌سازی VAT / VAT-UE و افتتاح حساب شرکتی',
    desc: 'اجاره آدرس دفتر واقعی (مورد تایید اداره مالیات Urząd Skarbowy برای فعال‌سازی کد VAT) و افتتاح حساب بانکی شرکتی به زلوتی و یورو.',
  },
  {
    title: '۴. ارسال پرونده اقامت تجاری به استانداری (Urząd Wojewódzki)',
    desc: 'تنظیم بیزنس پلن اجرایی، مدارک مالی و قراردادهای تجاری جهت دریافت مجوز کار مدیرعامل و کارت اقامت موقت Karta Pobytu.',
  },
];

const FAQS = [
  {
    q: 'آیا با ثبت یک شرکت ۵,۰۰۰ زلوتی در لهستان بلافاصله کارت اقامت صادر می‌شود؟',
    a: 'خیر. ثبت شرکت صرفاً شخصیت حقوقی را ایجاد می‌کند. برای اخذ و تمدید کارت اقامت موقت از طریق هیئت‌مدیره/سهامدار (Article 142 قانون اتباع خارجی لهستان)، شرکت باید در سال مالی قبل سود خالص معادل حداقل ۱۲ برابر میانگین حقوق ناخالص استان کسب کرده باشد، یا حداقل ۲ شهروند لهستانی/اروپایی را تمام‌وقت به مدت حداقل ۱ سال استخدام کرده باشد، یا در سال اول منابع و طرح قانع‌کننده برای رسیدن به این آستانه ارائه دهد.',
  },
  {
    q: 'تفاوت ثبت در سامانه S24 با ثبت محضری در دفتر اسناد رسمی چیست؟',
    a: 'در سامانه S24 اساسنامه به صورت فرم استاندارد است و فقط با سرمایه نقدی قابل ثبت است؛ اما هر گونه تغییر خاص در اختیارات سهامداران، مشارکت غیرنقدی یا حضور شرکت‌های خارجی نیازمند تنظیم اساسنامه نزد سردفتر (Notariusz) و ثبت از طریق پورتال PRS است.',
  },
  {
    q: 'آیا مدیرعامل شرکت Sp. z o.o. مشمول پرداخت بیمه ZUS می‌شود؟',
    a: 'اگر شرکت بیش از یک سهامدار داشته باشد و مدیرعامل صرفاً از طریق انتصاب هیئت‌مدیره (Powołanie) پاداش بگیرد، مشمول نرخ متفاوت بیمه درمانی (۹٪ بدون حق بازنشستگی کامل) است؛ اما در شرکت تک‌سهامداره (Jeden wspólnik)، مالک از نظر بیمه ZUS همانند خویش‌فرما تلقی شده و مکلف به پرداخت کامل بیمه ماهانه است.',
  },
  {
    q: 'آیا برای افتتاح حساب شرکتی در لهستان حضور فیزیکی لازم است؟',
    a: 'بله؛ تقریباً تمامی بانک‌های لهستان برای احراز هویت مدیران غیراتحادیه اروپا و انطباق ضدپولشویی (AML)، حضور فیزیکی مدیرعامل در شعبه بانک در ورشو یا سایر شهرها را الزامی می‌دانند.',
  },
];

export const BusinessPolandPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ثبت شرکت در لهستان Sp. z o.o. ۲۰۲۶ | مالیات ۹٪ و کارت اقامت | دیاکو',
    description:
      'راهنمای جامع ثبت شرکت Sp. z o.o. در لهستان ۲۰۲۶: حداقل سرمایه ۵,۰۰۰ زلوتی، مالیات ۹٪ CIT، سامانه S24/KRS و ضوابط واقعی اخذ کارت اقامت Karta Pobytu با دیاکو.',
    canonical: '/business-poland',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ثبت شرکت لهستان ۲۰۲۶',
      'شرکت Sp z o o لهستان',
      'کارت اقامت لهستان Karta Pobytu',
      'مالیات ۹ درصدی لهستان',
      'سامانه S24 و KRS لهستان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای ثبت شرکت Sp. z o.o. در لهستان ۲۰۲۶ و الزامات کارت اقامت Karta Pobytu',
          description:
            'بررسی ساختار ثبتی شرکت Sp. z o.o.، حداقل سرمایه ۵,۰۰۰ زلوتی، مالیات ۹٪ شرکت‌های کوچک، ثبت رجیستری CRBR و شروط اقتصادی اقامت در استانداری.',
          image: [
            'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1200&q=80',
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
          name: 'مراحل ثبت شرکت Sp. z o.o. در لهستان',
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
            { '@type': 'ListItem', position: 3, name: 'ثبت شرکت در لهستان', item: CANONICAL_URL },
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
              دپارتمان اقتصادی اروپای مرکزی دیاکو · لهستان ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Percent className="h-4 w-4" />
                <span>مالیات ۹٪ شرکت‌های کوچک (تا سقف €۲ میلیون فروش)</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ثبت شرکت در لهستان (Sp. z o.o.) ۲۰۲۶؛ قوانین KRS و اقامت تجاری
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                لهستان بزرگ‌ترین اقتصاد اروپای مرکزی با دسترسی مستقیم به زنجیره تأمین اتحادیه اروپا است. ثبت شرکت با مسئولیت محدود (Sp. z o.o.) با سرمایه قانونی ۵,۰۰۰ زلوتی و مالیات ۹ درصدی بر سود شرکت‌های کوچک، گزینه‌ای مقرون‌به‌صرفه برای فعالیت واقعی است؛ بااین‌حال اخذ کارت اقامت نیازمند تحقق دقیق شروط اشتغال یا سودآوری در قانون اتباع خارجی لهستان است.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  برآورد ثبت شرکت Sp. z o.o. لهستان
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
                  src="https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="منطقه تجاری و آسمان‌خراش‌های شهر ورشو پایتخت لهستان"
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
            مشخصات ثبتی، مالیاتی و اقامتی شرکت Sp. z o.o. در لهستان ۲۰۲۶
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
              گام‌های تأسیس شرکت تا پرونده Karta Pobytu
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
                نکات حساس در تمدید اقامت و بیمه لهستان
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>اداره مهاجرت استانی زمان بررسی طولانی (گاه ۶ تا ۱۲ ماه) دارد و برای تمدید، تحقق شاخص سودآوری یا استخدام ۲ نیروی تمام‌وقت را دقیقاً ممیزی می‌کند.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>تنظیم شرکت با دو سهامدار (نه تک‌سهامداره ۱۰۰٪) معمولاً از شمول اجباری بیمه خویش‌فرمای سنگین ZUS جلوگیری می‌کند.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                درگاه‌های رسمی دولت لهستان
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://www.biznes.gov.pl/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>پورتال رسمی کسب‌وکار لهستان (Biznes.gov.pl)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://www.gov.pl/web/udsc-en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>اداره امور اتباع خارجی لهستان (UDSC)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('business-hungary')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    مقایسه با ثبت شرکت مجارستان
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
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول ثبت شرکت در لهستان</h2>
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

export default BusinessPolandPage;

