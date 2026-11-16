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

const CANONICAL_URL = 'https://www.dia-co.ir/business-netherlands';

const KEY_SPECS = [
  { label: 'ساختار حقوقی اصلی', value: 'BV (Besloten Vennootschap — شرکت با مسئولیت محدود)' },
  { label: 'حداقل سرمایه اسمی ثبت', value: '€0.01 (در عمل سرمایه در گردش متناسب با طرح تجاری الزامی است)' },
  { label: 'نرخ مالیات شرکتی (Vpb) ۲۰۲۶', value: '۱۹٪ تا سقف سود €۲۰۰,۰۰۰ · ۲۵.۸٪ برای مازاد €۲۰۰,۰۰۰' },
  { label: 'مسیر اقامت برای ایرانیان', value: 'مجوز خوداشتغالی IND (ارزیابی امتیازی RVO) یا ویزای استارتاپ با Facilitator' },
  { label: 'مرجع ثبت تجاری و مالیاتی', value: 'دفتر اسناد رسمی هلند (Notaris) + اتاق بازرگانی KVK + اداره مالیات Belastingdienst' },
  { label: 'بازه زمانی ثبت و دریافت شناسه KVK', value: '۲ تا ۴ هفته کاری (پس از تایید هویت و تنظیم سند محضری)' },
];

const STEPS = [
  {
    title: '۱. انتخاب ساختار BV و تنظیم اساسنامه در دفترخانه (Notaris)',
    desc: 'در حقوق هلند، تأسیس شرکت BV منحصراً با تنظیم سند رسمی (Akte van Oprichting) نزد سردفتر رسمی هلند انجام می‌شود.',
  },
  {
    title: '۲. ثبت در اتاق بازرگانی هلند (KVK) و ثبت مالک ذینفع (UBO)',
    desc: 'دریافت شماره ثبت KVK، شماره مالیات بر ارزش افزوده (BTW) از Belastingdienst و ثبت سهامداران بالای ۲۵٪ در رجیستری UBO.',
  },
  {
    title: '۳. افتتاح حساب بانکی تجاری (IBAN اروپایی)',
    desc: 'تکمیل فرآیند سخت‌گیرانه انطباق بانکی (CDD/KYC) و احراز فعالیت اقتصادی واقعی (Substance) در هلند.',
  },
  {
    title: '۴. درخواست اقامت خوداشتغالی IND یا اسپانسرشیپ کاری',
    desc: 'ارائه بیزنس پلن و مدارک حرفه‌ای جهت ارزیابی امتیازی سازمان RVO (حداقل ۳۰ امتیاز در هر یک از ۳ معیار) برای اخذ اقامت ۲ ساله.',
  },
];

const FAQS = [
  {
    q: 'آیا ثبت شرکت BV در هلند به تنهایی برای ایرانیان کارت اقامت صادر می‌کند؟',
    a: 'خیر. سهامدار یا مدیر یک شرکت BV به صرف ثبت شرکت حق اقامت دریافت نمی‌کند. شهروندان غیراتحادیه اروپا برای اقامت کاری از طریق شرکت خود یا باید امتیاز لازم در مسیر Self-Employed Residence Permit را در ارزیابی RVO/IND کسب کنند، یا از مسیر Startup Visa و یا استخدام تحت عنوان Highly Skilled Migrant (توسط شرکت دارای تاییدیه Recognised Sponsor) اقدام نمایند.',
  },
  {
    q: 'آیا معاهده دوستی هلند (DAFT) شامل متقاضیان ایرانی می‌شود؟',
    a: 'خیر؛ معاهده DAFT یا معاهده‌های تجاری مشابه صرفاً برای شهروندان آمریکا و ژاپن اعمال می‌شود. متقاضیان ایرانی برای اقامت از طریق کسب‌وکار در هلند باید از سیستم امتیازی استاندارد IND (تجربه، بیزنس پلن و ارزش افزوده برای اقتصاد هلند) یا ویزای استارتاپ استفاده کنند.',
  },
  {
    q: 'چند درصد مالیات بر سود شرکت‌های BV در هلند اعمال می‌شود؟',
    a: 'در سال ۲۰۲۶ نرخ مالیات بر درآمد شرکتی (Vennootschapsbelasting) برای سود مشمول مالیات تا ۲۰۰,۰۰۰ یورو برابر با ۱۹٪ و برای سود بالاتر از ۲۰۰,۰۰۰ یورو برابر با ۲۵.۸٪ است.',
  },
  {
    q: 'برای تایید طرح در سیستم امتیازی IND/RVO چه مدارکی کلیدی است؟',
    a: 'طرح تجاری دقیق همراه با پیش‌بینی مالی ۳ ساله، مدارک تحصیلی و سوابق حرفه‌ای مرتبط، و مستندات ارزش افزوده واقعی برای اقتصاد هلند (مانند قرارداد با مشتریان اروپایی، اشتغال‌زایی یا نوآوری فنی).',
  },
];

export const BusinessNetherlandsPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ثبت شرکت در هلند BV ۲۰۲۶ | مالیات ۱۹٪، KVK و قوانین اقامت IND | دیاکو',
    description:
      'راهنمای جامع ثبت شرکت BV در هلند ۲۰۲۶: قوانین سردفتر و اتاق بازرگانی KVK، مالیات ۱۹٪ تا ۲۰۰ هزار یورو، شرایط اقامت خوداشتغالی IND/RVO و مسیر استارتاپ با دیاکو.',
    canonical: '/business-netherlands',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ثبت شرکت هلند ۲۰۲۶',
      'شرکت BV هلند',
      'اتاق بازرگانی KVK هلند',
      'اقامت خوداشتغالی هلند IND',
      'مالیات شرکتی هلند ۱۹ درصد',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${CANONICAL_URL}#article`,
          headline: 'راهنمای ثبت شرکت با مسئولیت محدود (BV) در هلند ۲۰۲۶ و ضوابط اقامت IND',
          description:
            'بررسی ساختار ثبتی شرکت هلندی BV نزد سردفتر و KVK، مالیات ۱۹٪/۲۵.۸٪، رجیستری UBO و تفاوت‌های ثبت شرکت با اقامت خوداشتغالی RVO.',
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
          name: 'مراحل ثبت شرکت BV در هلند',
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
            { '@type': 'ListItem', position: 3, name: 'ثبت شرکت در هلند', item: CANONICAL_URL },
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
              دپارتمان ثبت شرکت اروپای غربی دیاکو · هلند ۲۰۲۶
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-amber-300">
                <Landmark className="h-4 w-4" />
                <span>ساختار هلدینگی و بازرگانی BV در دروازه لجستیک اروپا</span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                ثبت شرکت در هلند (BV) ۲۰۲۶؛ ضوابط KVK، مالیات و مسیر اقامت IND
              </h1>

              <p className="mt-4 text-justify text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                شرکت با مسئولیت محدود هلند (Besloten Vennootschap — BV) یکی از معتبرترین ساختارهای حقوقی اتحادیه اروپا برای تجارت بین‌المللی، لجستیک بندر روتردام و هلدینگ‌های فناوری است. در این راهنمای تخصصی، علاوه بر مراحل ثبت محضری در KVK و نرخ مالیات ۱۹ درصدی، الزامات دقیق اداره مهاجرت IND و سازمان RVO برای دریافت اقامت از طریق کسب‌وکار در هلند تشریح شده است.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  بررسی شرایط ثبت شرکت و اقامت هلند
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
                  alt="مرکز تجاری آمستردام و بندر مدرن هلند"
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
            مشخصات ثبتی، مالیاتی و اقامتی شرکت BV در هلند ۲۰۲۶
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
              فرآیند تأسیس شرکت BV تا درخواست اقامت کاری
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
                نکات حقوقی و انطباق بانکی هلند
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>ثبت شرکت با اقامت خوداشتغالی IND متفاوت است؛ طرح شما باید از آزمون امتیازی سازمان RVO (حداقل ۳۰ امتیاز از ۱۰۰ در بخش ارزش افزوده اقتصادی) عبور کند.</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>بانک‌های بزرگ هلند پیش از افتتاح حساب شرکتی برای سهامداران مقیم خارج از اتحادیه اروپا، مدارک کامل منشأ سرمایه و حضور واقعی مدیریت در هلند را بررسی می‌کنند.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                درگاه‌های رسمی دولت هلند
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://www.kvk.nl/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>اتاق بازرگانی هلند (KVK)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://ind.nl/en/residence-permits/work/residence-permit-self-employed-person"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>اداره مهاجرت هلند (IND - Self-Employed)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
                <a
                  href="https://www.belastingdienst.nl/wps/wcm/connect/en/business/business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3.5 py-2.5 text-slate-200 hover:border-amber-400/40"
                >
                  <span>سازمان امور مالیاتی هلند (Belastingdienst)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>
              {onNavigateToCountry && (
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToCountry('startup-netherlands')}
                    className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer"
                  >
                    ویزای استارتاپ هلند
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
          <h2 className="text-xl font-black text-white mb-6">سوالات متداول ثبت شرکت در هلند</h2>
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

export default BusinessNetherlandsPage;

