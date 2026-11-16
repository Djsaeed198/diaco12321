import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  Rocket,
  ShieldCheck,
  Building2,
  ExternalLink,
  AlertTriangle,
  Scale,
  Clock,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

const FAQS = [
  {
    q: 'تفاوت اقامت ماده ۲۱ خوداشتغالی (Selbstständige Tätigkeit §21 AufenthG) با ثبت GmbH عادی چیست؟',
    a: 'ثبت شرکت GmbH در آلمان به‌تنهایی حق اقامت نمی‌دهد. برای گرفتن ویزای استارت‌آپ و کارآفرینی تحت ماده ۲۱ بند ۱ قانون اقامت آلمان، باید نشان دهید طرح شما منافع اقتصادی منطقه‌ای (Übergeordnetes wirtschaftliches Interesse) دارد، تامین مالی مطمئنی پشت آن است و به ارزیابی مثبت اتاق بازرگانی و صنایع (IHK) ایالت هدف دست یافته است.',
  },
  {
    q: 'حداقل سرمایه مورد نیاز برای استارت‌آپ آلمان در سال ۲۰۲۶ چقدر است؟',
    a: 'قانون آلمان یک کف ثابت واحد برای همه استارت‌آپ‌ها تعیین نکرده و کفایت سرمایه بر اساس هزینه‌های ۲ سال اول طرح سنجیده می‌شود. در عمل برای ثبت GmbH حداقل سرمایه اسمی ۲۵٬۰۰۰ یورو (با پرداخت اولیه حداقل ۱۲٬۵۰۰ یورو) یا ساختار UG (حداقل نمادین ۱ یورو ولی نیازمند سرمایه عملیاتی واقعی برای قانع کردن IHK و سفارت) به علاوه اثبات تمکن زندگی شخصی مطرح است.',
  },
  {
    q: 'آیا پس از ۳ سال واقعاً اقامت دائم آلمان صادر می‌شود؟',
    a: 'بر خلاف بسیاری از ویزاهای کاری و اقامتی که مسیر ۵ ساله دارند، دارنده اقامت کارآفرینی تحت §21 Abs. 4 AufenthG در صورتی که کسب‌وکار خود را با موفقیت اجرا کرده باشد و درآمدش هزینه زندگی خود و خانواده را به‌طور پایدار تامین کند، می‌تواند پس از ۳ سال برای اقامت دائم (Niederlassungserlaubnis) درخواست دهد.',
  },
  {
    q: 'مدرک زبان آلمانی برای ویزای استارت‌آپ آلمان الزامی است؟',
    a: 'در زمان اقدام اولیه از سفارت، قانون شرط مدرک زبان آلمانی اجباری تعیین نکرده است (به‌ویژه در هاب‌هایی مثل برلین که فعالیت بین‌المللی به انگلیسی انجام می‌شود)، اما برای متقاضیان بالای ۴۵ سال اثبات برنامه بازنشستگی مناسب (Altersvorsorge) الزامی است و برای اقامت دائم داشتن دانش پایه آلمانی و شناخت جامعه مورد توجه قرار می‌گیرد.',
  },
];

export const StartupGermanyPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  const [cityHub, setCityHub] = useState<'berlin' | 'munich' | 'frankfurt'>('berlin');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای استارت‌آپ آلمان ۲۰۲۶ | اقامت کارآفرینی ماده ۲۱ (§21 AufenthG)',
    description:
      'راهنمای ویزای استارت‌آپ و خوداشتغالی آلمان ۲۰۲۶؛ تاییدیه اتاق بازرگانی IHK، ساختار GmbH و UG، هاب‌های فناوری برلین و مونیخ و مسیر اقامت دائم ۳ ساله.',
    canonical: '/startup-germany',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'استارت آپ آلمان ۲۰۲۶',
      'Germany Startup Visa',
      'اقامت ماده ۲۱ قانون اقامت آلمان',
      'بیزینس پلن IHK آلمان',
      'هاب فناوری برلین',
      'ویزای کارآفرینی آلمان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.dia-co.ir/startup-germany#breadcrumb',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: 'https://www.dia-co.ir/' },
            { '@type': 'ListItem', position: 2, name: 'ویزای استارت‌آپ آلمان', item: 'https://www.dia-co.ir/startup-germany' },
          ],
        },
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/startup-germany#article',
          headline: 'راهنمای جامع ویزای استارت‌آپ آلمان ۲۰۲۶: شرایط ماده ۲۱ AufenthG و ارزیابی IHK',
          description:
            'بررسی مسیر اقامت کارآفرینی و استارت‌آپ آلمان، معیارهای تاییدیه اتاق بازرگانی IHK، تفاوت GmbH و UG و تبدیل به اقامت دائم ۳ ساله (§21 Abs. 4).',
          image: [
            'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
          ],
          author: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          publisher: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' },
          },
          datePublished: '2026-01-01',
          dateModified: '2026-11-16',
          inLanguage: 'fa-IR',
          mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.dia-co.ir/startup-germany' },
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/startup-germany#howto',
          name: 'مراحل ثبت استارت‌آپ و دریافت ویزای کارآفرینی آلمان',
          description: 'از تنظیم بیزینس پلن استاندارد آلمانی تا ویزای ملی تایپ D و اقامت ماده ۲۱',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'نگارش بیزینس پلن و برنامه مالی ۳ ساله (Finanzplan)',
              text: 'اثبات منافع اقتصادی منطقه‌ای، نوآوری و توان رقابتی طرح در بازار ایالت هدف.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'ارزیابی تخصصی توسط اتاق صنایع و بازرگانی (IHK)',
              text: 'بررسی مدل مالی و فنی طرح توسط کارشناسان IHK و صدور نظر کارشناسی برای سفارت و اداره اتباع خارجی (Ausländerbehörde).',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'تاسیس ساختار حقوقی (GmbH / UG) و تمکن شخصی',
              text: 'آماده‌سازی اساسنامه محضری (Notar)، برنامه تامین سرمایه شرکت و ارائه مستندات تمکن مالی متقاضی (و مستمری بازنشستگی برای بالای ۴۵ سال).',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'ویزای ملی تایپ D و کارت اقامت تا ۳ سال',
              text: 'ثبت درخواست در سفارت آلمان در تهران، ورود به آلمان، ثبت Handelsregister و تبدیل به اقامت دائم در پایان سال سوم در صورت موفقیت تجاری.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/startup-germany#faq',
          mainEntity: FAQS.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
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
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-bold text-amber-300">
              🇩🇪 دپارتمان استارت‌آپ و تجاری آلمان
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-black text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                اقامت کارآفرینی ماده ۲۱ قانون اقامت (§21 AufenthG)
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl text-white">
                ویزای استارت‌آپ آلمان؛ اقامت کارآفرینی و مسیر ۳ ساله اقامت دائم
              </h1>

              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-300 sm:text-base text-justify">
                آلمان به‌عنوان بزرگ‌ترین اقتصاد اتحادیه اروپا، از بنیان‌گذاران طرح‌های فناورانه، صنعتی و خدماتی با پشتوانه مالی شفاف ذیل ماده ۲۱ قانون اقامت (§21 AufenthG) استقبال می‌کند. مزیت قانونی منحصربه‌فرد این مسیر، امکان درخواست اقامت دائم آلمان (Niederlassungserlaubnis) پس از ۳ سال فعالیت سودآور و پایدار است.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Rocket className="h-4 w-4" />
                  ارزیابی بیزینس پلن آلمان
                </button>
                <a
                  href="tel:+982191693955"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4 text-amber-400" />
                  مشاوره تهران: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[16/9] w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="برلین آلمان مرکز استارت‌آپ‌های پیشرو فناوری در اتحادیه اروپا"
                  loading="eager"
                  fetchPriority="high"
                  width={1000}
                  height={563}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-12 border-b border-white/10 bg-[#05151b]">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'مبنای قانونی', value: '§21 Abs. 1 AufenthG', icon: Scale },
              { label: 'سرمایه ثبتی GmbH', value: '۲۵٬۰۰۰ یورو (۱۲٬۵۰۰ پرداخت اولیه)', icon: Building2 },
              { label: 'مسیر اقامت دائم', value: '۳ سال (در صورت موفقیت طرح)', icon: ShieldCheck },
              { label: 'زمان بررسی پرونده', value: 'حدود ۴ تا ۸ ماه (شامل نظر IHK)', icon: Clock },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <item.icon className="h-5 w-5 text-amber-400 mb-3" />
                <div className="text-xs text-slate-400">{item.label}</div>
                <div className="mt-1 text-sm font-black text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Hub Selector */}
      <section className="py-14 bg-[#082029]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <h2 className="text-xl font-black text-white">مقایسه هاب‌های استارت‌آپی پیشرو آلمان</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { id: 'berlin', label: 'برلین (Berlin Tech Ecosystem)' },
                { id: 'munich', label: 'مونیخ (Bavaria DeepTech)' },
                { id: 'frankfurt', label: 'فرانکفورت (FinTech & Data)' },
              ].map((hub) => (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => setCityHub(hub.id as 'berlin' | 'munich' | 'frankfurt')}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                    cityHub === hub.id ? 'bg-amber-400 text-slate-900 font-black' : 'bg-white/5 text-slate-300'
                  }`}
                >
                  {hub.label}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
              {cityHub === 'berlin' && (
                <div>
                  <h3 className="font-bold text-amber-300 text-sm">اکوسیستم بین‌المللی برلین</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    برلین قطب استارت‌آپ‌های نرم‌افزاری، تجارت الکترونیک و SaaS در اروپا است. زبان کاری غالب در تیم‌های استارت‌آپی انگلیسی است و دسترسی به شتاب‌دهنده‌ها، سرمایه‌گذاران فرشته و نیروی متخصص بین‌المللی بسیار گسترده است.
                  </p>
                </div>
              )}
              {cityHub === 'munich' && (
                <div>
                  <h3 className="font-bold text-amber-300 text-sm">هاب فناوری‌های بنیادین و صنعتی بایرن (مونیخ)</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    همجواری با صنایع خودرو، انرژی، مهندسی پزشکی و دانشگاه فنی مونیخ (TUM)، باواریا را به مقصد اول استارت‌آپ‌های هوش مصنوعی، رباتیک، سخت‌افزار و صنایع B2B تبدیل کرده است.
                  </p>
                </div>
              )}
              {cityHub === 'frankfurt' && (
                <div>
                  <h3 className="font-bold text-amber-300 text-sm">مرکز مالی اروپا و فین‌تک (فرانکفورت / راین-ماین)</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    استقرار بانک مرکزی اروپا (ECB) و شبکه‌های مالی بین‌المللی، فرانکفورت را به مرکز فناوری‌های مالی، بیمه (InsurTech)، امنیت سایبری و خدمات B2B سازمانی در آلمان بدل کرده است.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Caveats, Official Portals, FAQ, NAP */}
      <section className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-6">
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6">
            <h2 className="flex items-center gap-2 text-base font-black text-amber-300">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              الزامات حساس و ریسک‌های حقوقی پرونده ماده ۲۱ آلمان
            </h2>
            <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>ثبت شرکت از راه دور به‌خودی‌خود حق اقامت ایجاد نمی‌کند؛ اداره اتباع خارجی و سفارت نظر اتاق بازرگانی (IHK) را درباره سودآوری، نیاز منطقه‌ای و شفافیت منابع مالی شما بررسی می‌کنند.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>متقاضیان بالای ۴۵ سال در آلمان برای دریافت ویزای خوداشتغالی (§21 Abs. 3) موظف به اثبات طرح تامین بازنشستگی کافی (بیمه عمر یا دارایی معادل مستمری پایه آلمان) هستند.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>در نظر گرفتن مالیات‌های آلمان (مالیات شرکتی ۱۵٪ Körperschaftsteuer به علاوه همبستگی ۵.۵٪ و مالیات تجاری شهرداری Gewerbesteuer، مجموعاً حدود ۳۰٪) در جدول جریان نقدینگی بیزینس پلن ضروری است.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-base font-black text-white">منابع رسمی دولت فدرال آلمان و اتاق‌های بازرگانی</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 text-xs">
              <a
                href="https://www.make-it-in-germany.com/en/visa-residence/types/self-employment"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-slate-200 hover:border-amber-400/40 hover:text-amber-300 transition"
              >
                <span>Make it in Germany (ویزای کارآفرینی)</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
              <a
                href="https://www.ihk.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-slate-200 hover:border-amber-400/40 hover:text-amber-300 transition"
              >
                <span>شبکه اتاق‌های بازرگانی آلمان (IHK)</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
              <a
                href="https://teheran.diplo.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-slate-200 hover:border-amber-400/40 hover:text-amber-300 transition"
              >
                <span>سفارت آلمان در تهران (Diplo.de)</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-black text-white mb-4">پرسش‌های متداول استارت‌آپ آلمان</h2>
            <div className="space-y-3">
              {FAQS.map((item, idx) => (
                <div key={item.q} className="rounded-2xl border border-white/10 bg-black/25 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-4 text-right text-xs sm:text-sm font-bold text-white cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-amber-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-xs leading-relaxed text-slate-300 border-t border-white/5 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {onNavigateToCountry && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-sm font-black text-white mb-3">مقایسه با سایر برنامه‌های استارت‌آپی و تجاری</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'startup-netherlands', label: 'استارت‌آپ هلند' },
                  { key: 'startup-france', label: 'French Tech فرانسه' },
                  { key: 'business-austria', label: 'ثبت شرکت و کارآفرینی اتریش' },
                ].map((link) => (
                  <button
                    key={link.key}
                    type="button"
                    onClick={() => onNavigateToCountry(link.key)}
                    className="rounded-xl border border-white/15 bg-black/30 px-3.5 py-2 text-xs font-bold text-slate-200 hover:border-amber-400/50 hover:text-amber-300 transition cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-amber-400/40 bg-gradient-to-l from-amber-500/20 to-white/5 p-7 text-center">
            <h3 className="text-lg font-black text-white">تنظیم بیزینس پلن استاندارد آلمانی و پیگیری حقوقی اروپا</h3>
            <p className="mt-2 text-xs text-slate-300 max-w-2xl mx-auto">
              دفتر تهران: ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴ (۰۲۱۹۱۶۹۳۹۵۵) | دفتر وین: Ausstellungsstraße 50/2.OG (اتریش: +43 688 976 3256) | تاسیس ۱۳۹۴
            </p>
            <div className="mt-5 flex justify-center gap-4">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs font-black text-[#082833] hover:bg-amber-300 cursor-pointer shadow-lg"
              >
                ارزیابی طرح استارت‌آپ آلمان
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartupGermanyPage;
