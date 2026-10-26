import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  ChevronDown,
  HelpCircle,
  PhoneCall,
  Check,
  Copy,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Users,
  Compass,
  Building,
  Scale,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: 'germany' | 'spain' | 'italy' | 'austria' | 'hungary') => void;
}

// حداقل حقوق قانونی ۲۰۲۶ اسپانیا بر اساس شاخص SMI و مصوبه وزارت کار اسپانیا
const SALARY_THRESHOLDS_SPAIN_2026 = {
  regularAnnual: 34500, // مشاغل تخصصی عمومی (~۲،۸۷۵ یورو ماهانه)
  shortageAnnual: 31200, // مشاغل کمبود نیرو مهندسی و IT
  monthlyRegular: 2875,
  monthlyShortage: 2600,
};

export const SpainBlueCardPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToCountry,
}) => {
  // سئو استاندارد: تایتل ۵۴ کاراکتر، دیسکریپشن ۱۵۸ کاراکتر، تک H1، اسکیماهای ترکیبی گوگل
  useSeo({
    title: 'بلوکارت اسپانیا ۲۰۲۶ | راهنمای اقامت کاری و حقوق دیاکو',
    description:
      'راهنمای جامع اخذ بلوکارت اسپانیا ۲۰۲۶؛ حداقل حقوق، معافیت زبان، کار در مادرید و بارسلونا، اقامت دائم و الحاق همسر زیر نظر وکلای هلدینگ دیاکو. ارزیابی فوری پرونده.',
    canonical: '/guides/blue-card-spain',
    ogType: 'article',
    ogImage: 'https://www.dia-co.ir/og-services-work.jpg',
    keywords: [
      'بلوکارت اسپانیا',
      'Tarjeta Azul España 2026',
      'اقامت کاری اسپانیا',
      'قانون بکهام اسپانیا',
      'کار در بارسلونا',
      'وکیل مهاجرت اسپانیا',
      'حداقل حقوق بلوکارت اسپانیا',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: 'راهنمای جامع اخذ بلوکارت اسپانیا ۲۰۲۶ (Tarjeta Azul UE España)',
          description:
            'بررسی دقیق کف حقوق ناخالص سالانه، قانون مالیاتی بکهام، مراحل صدور کارت اقامت TIE و الحاق خانواده برای متخصصان در اسپانیا.',
          author: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
          },
          publisher: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.dia-co.ir/logo.png',
            },
          },
          datePublished: '2026-01-01',
          dateModified: '2026-10-23',
        },
        {
          '@type': 'HowTo',
          name: 'مراحل گام‌به‌گام دریافت بلوکارت اسپانیا',
          step: [
            {
              '@type': 'HowToStep',
              name: 'معادل‌سازی مدارک و Homologación',
              text: 'تایید مدرک دانشگاهی در وزارت علوم اسپانیا یا ترجمه رسمی مدارک فنی.',
            },
            {
              '@type': 'HowToStep',
              name: 'عقد قرارداد و تاییدیه UGE-CE',
              text: 'ثبت پرونده در اداره کل مهاجرت مادرید (Unidad de Grandes Empresas).',
            },
            {
              '@type': 'HowToStep',
              name: 'اخذ ویزای ملی تایپ D و کارت فیزیکی TIE',
              text: 'مصاحبه کنسولی و انگشت‌نگاری در پلیس ملی اسپانیا برای دریافت کارت TIE.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حداقل حقوق لازم برای بلوکارت اسپانیا در سال ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حداقل حقوق سالانه ناخالص در اسپانیا حدود ۳۴،۵۰۰ یورو برای مشاغل عمومی و حدود ۳۱،۲۰۰ یورو برای مشاغل کمبود نیرو در حوزه فناوری و مهندسی است.',
              },
            },
            {
              '@type': 'Question',
              name: 'قانون بکهام در اسپانیا چیست و چه مزیتی برای دارنده بلوکارت دارد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'قانون بکهام (Ley Beckham) نرخ مالیات بر درآمد دارندگان قرارداد کاری واجد شرایط را تا ۵ سال نخست به جای درصدهای پلکانی تا ۴۷٪، روی نرخ ثابت ۲۴٪ قفل می‌کند که باعث ذخیره ارزی قابل‌توجهی می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا برای بلوکارت اسپانیا مدرک زبان اسپانیایی اجباری است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر، ارائه مدرک زبان DELE الزامی نیست و در صورت انگلیسی‌زبان بودن موقعیت شغلی، تسلط به انگلیسی کفایت می‌کند.',
              },
            },
          ],
        },
      ],
    },
  });

  // وضعیت چک‌لیست مدارک
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // محاسبه‌گر شرایط بلوکارت اسپانیا
  const [calcSalary, setCalcSalary] = useState<number>(38000);
  const [calcField, setCalcField] = useState<'it' | 'engineering' | 'finance' | 'other'>('it');
  const [calcSpanishLevel, setCalcSpanishLevel] = useState<'none' | 'a2' | 'b1' | 'b2_plus'>('none');

  const evaluationResult = useMemo(() => {
    const isShortage = calcField === 'it' || calcField === 'engineering';
    const requiredSalary = isShortage
      ? SALARY_THRESHOLDS_SPAIN_2026.shortageAnnual
      : SALARY_THRESHOLDS_SPAIN_2026.regularAnnual;

    const meetsSalary = calcSalary >= requiredSalary;
    const diff = calcSalary - requiredSalary;

    let prob = 70;
    if (meetsSalary) prob += 20;
    if (calcSpanishLevel !== 'none') prob += 8;
    if (prob > 97) prob = 97;

    return {
      requiredSalary,
      meetsSalary,
      diff,
      prob,
      beckhamSavingsPerYear: Math.round(calcSalary * 0.12),
    };
  }, [calcSalary, calcField, calcSpanishLevel]);

  const DOCUMENTS_SPAIN = [
    {
      id: 'es-doc-1',
      title: 'پیش‌قرارداد استخدام رسمی در اسپانیا (Oferta de Empleo / Pre-contrato)',
      desc: 'قرارداد امضا شده با ذکر عنوان، ساعات کاری تمام‌وقت و حقوق ناخالص سالانه حداقل ۳۴,۵۰۰ یورو.',
      required: true,
    },
    {
      id: 'es-doc-2',
      title: 'تاییدیه صلاحیت کارفرما از اداره UGE-CE مادرید',
      desc: 'موافقت‌نامه رسمی واحد شرکت‌های بزرگ وزارت شمول و تامین اجتماعی اسپانیا.',
      required: true,
    },
    {
      id: 'es-doc-3',
      title: 'ترجمه رسمی مدرک دانشگاهی به زبان اسپانیایی همراه با آپوستیل / تایید دادگستری',
      desc: 'ترجمه رسمی سوگندخورده (Traducción Jurada) مدارک لیسانس یا فوق لیسانس.',
      required: true,
    },
    {
      id: 'es-doc-4',
      title: 'گواهی عدم سوءپیشینه بین‌المللی با ترجمه رسمی اسپانیایی',
      desc: 'اعتبار حداکثر ۹۰ روزه از مراجع قضایی کشور محل اقامت.',
      required: true,
    },
    {
      id: 'es-doc-5',
      title: 'بیمه درمانی مسافرتی ورودی معتبر در کل حوزه شینگن',
      desc: 'پوشش حداقل ۳۰,۰۰۰ یورو تا زمان تحت پوشش قرار گرفتن در سیستم تامین اجتماعی اسپانیا (Seguridad Social).',
      required: true,
    },
  ];

  const handleCopy = () => {
    const text = DOCUMENTS_SPAIN.map((d, i) => `${i + 1}. ${d.title}\n   توضیحات: ${d.desc}`).join(
      '\n\n'
    );
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  const FAQS = [
    {
      q: 'حداقل حقوق لازم برای بلوکارت اسپانیا در سال ۲۰۲۶ چقدر است؟',
      a: 'طبق آمار مصوب، برای مشاغل عمومی سالانه حداقل ۳۴،۵۰۰ یورو و برای موقعیت‌های شغلی کمبود نیرو در حوزه فناوری و مهندسی حداقل ۳۱،۲۰۰ یورو است که توسط کارفرمای اسپانیایی پرداخت می‌شود.',
    },
    {
      q: 'قانون مالیاتی بکهام (Ley Beckham) چه مزیتی برای متقاضی دارد؟',
      a: 'این قانون ویژه به متخصصان خارجی اجازه می‌دهد تا ۵ سال نخست ورود به اسپانیا، مالیات بر درآمد خود را با نرخ مقطوع ۲۴٪ (به جای نرخ تصاعدی تا ۴۷٪) بپردازند که باعث افزایش چشمگیر حقوق خالص دریافتی در مادرید و بارسلونا می‌شود.',
    },
    {
      q: 'پروسه صدور تاییدیه UGE در اسپانیا چقدر طول می‌کشد؟',
      a: 'یکی از بزرگ‌ترین مزیت‌های بلوکارت اسپانیا رسیدگی سریع در واحد UGE مادرید است؛ تاییدیه اولیه معمولاً ظرف ۲۰ روز کاری صادر می‌شود که در مقایسه با سایر کشورهای اروپایی بسیار پرسرعت است.',
    },
    {
      q: 'وضعیت کار همسر و تحصیل فرزندان در اسپانیا چگونه است؟',
      a: 'همسر متقاضی همراه با ویزای پیوست اجازه کار نامحدود در تمام مشاغل اسپانیا را دریافت می‌کند و فرزندان از سیستم آموزشی دولتی رایگان یا مدارس دوزبانه بین‌المللی بهره‌مند می‌شوند.',
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#081e26] text-slate-100 font-sans pb-20">
      {/* نوار مسیریابی بالا / Breadcrumbs & سوییچ بین کشورها */}
      <div className="bg-[#05171e] border-b border-white/10 py-3 px-4 md:px-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <button
              type="button"
              onClick={onBackToHome}
              className="text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <span>صفحه اصلی دیاکو</span>
            </button>
            <span>/</span>
            <span>بلو کارت اتحادیه اروپا</span>
            <span>/</span>
            <span className="text-white font-semibold">بلوکارت اسپانیا ۲۰۲۶</span>
          </div>

          {/* سوییچ سریع به سایر کشورهای بلوکارت */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400">سایر کشورها:</span>
            {[
              { key: 'germany', label: '🇩🇪 آلمان' },
              { key: 'spain', label: '🇪🇸 اسپانیا (صفحه فعلی)', active: true },
              { key: 'italy', label: '🇮🇹 ایتالیا' },
              { key: 'austria', label: '🇦🇹 اتریش' },
              { key: 'hungary', label: '🇭🇺 مجارستان' },
            ].map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => onNavigateToCountry?.(c.key as any)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                  c.active
                    ? 'bg-amber-400 text-[#082833] font-black'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* بخش هیرو با تصویر LCP و CLS صفر (aspect-[16/9]) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b2933] via-[#08222b] to-[#081e26] pt-10 pb-16 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            {/* متن هیرو */}
            <div className="lg:col-span-7 text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-300">
                <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                <span>دپارتمان اسپانیا و اروپای غربی — هلدینگ دیاکو</span>
                <span className="text-white/40">|</span>
                <span className="text-amber-300">قوانین ۲۰۲۶</span>
              </div>

              {/* تک H1 صفحه مطابق استانداردهای سخت‌گیرانه سئو */}
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                بلوکارت اسپانیا ۲۰۲۶
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-amber-300 via-yellow-400 to-amber-500">
                  Tarjeta Azul UE España
                </span>
              </h1>

              <p className="mt-4 text-xs sm:text-sm leading-7 text-slate-300 font-medium text-justify">
                مسیر طلایی اقامت کاری در مادرید، بارسلونا و والنسیا؛ با بهره‌مندی از نرخ مالیات مقطوع
                ۲۴ درصدی قانون بکهام (*Ley Beckham*)، حداقل حقوق مقرون‌به‌صرفه نسبت به سایر کشورهای
                اروپایی و مجوز کار نامحدود همسر از روز نخست ورود.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#calculator"
                  className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-5 py-2.5 text-xs font-black text-[#082833] shadow-glow hover:scale-105 transition cursor-pointer"
                >
                  محاسبه‌گر حقوق و تطبیق شرایط اسپانیا
                </a>
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                >
                  ارزیابی آنلاین شانس ویزا
                </button>
                <a
                  href="tel:02191693955"
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-300 px-4 py-2.5 text-xs font-bold"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>تماس: 02191693955</span>
                </a>
              </div>
            </div>

            {/* تصویر بهینه‌شده LCP با فچ بااولویت بالا و نسبت ابعاد صریح (CLS: 0) */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl aspect-[16/9] w-full">
                <img
                  src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80"
                  srcSet="https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=900&q=80 900w, https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80 1200w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="مهاجرت کاری به اسپانیا و اخذ کارت آبی اتحادیه اروپا در مادرید و بارسلونا"
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081e26] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 right-3 left-3 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300">مادرید و بارسلونا هاب استارتاپی</span>
                  <span className="text-[10px] text-slate-300">تاییدیه ۲۰ روزه UGE</span>
                </div>
              </div>
            </div>
          </div>

          {/* ۴ شاخص کلیدی اسپانیا */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-amber-300 font-bold">کف حقوق ۲۰۲۶</span>
              <div className="text-xl font-black text-white mt-1">۳۴,۵۰۰ €</div>
              <p className="text-[10px] text-slate-400 mt-0.5">ناخالص سالانه (~۲،۸۷۵ € ماهانه)</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-emerald-300 font-bold">قانون مالیاتی بکهام</span>
              <div className="text-xl font-black text-white mt-1">۲۴٪ ثابت</div>
              <p className="text-[10px] text-slate-400 mt-0.5">تا ۵ سال معاف از پلکان مالیاتی</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-sky-300 font-bold">رسیدگی سریع</span>
              <div className="text-xl font-black text-white mt-1">۲۰ روز کاری</div>
              <p className="text-[10px] text-slate-400 mt-0.5">در اداره مهاجرت مرکزی مادرید</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right">
              <span className="text-[10px] text-purple-300 font-bold">پیوست همسر</span>
              <div className="text-xl font-black text-white mt-1">بدون مدرک زبان</div>
              <p className="text-[10px] text-slate-400 mt-0.5">اجازه کار تمام‌وقت برای همسر</p>
            </div>
          </div>
        </div>
      </section>

      {/* محاسبه‌گر شرایط بلوکارت اسپانیا */}
      <section id="calculator" className="py-14 container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              سنجش انطباق با وزارت کار اسپانیا
            </span>
            <h2 className="text-2xl font-black text-white mt-2">
              محاسبه‌گر هوشمند حقوق و معافیت مالیاتی بلوکارت اسپانیا
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">رشته و زمینه شغلی:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'it', label: 'برنامه‌نویسی و IT', note: 'کمبود نیرو' },
                    { id: 'engineering', label: 'مهندسی فنی', note: 'کمبود نیرو' },
                    { id: 'finance', label: 'مالی و حسابداری', note: 'عمومی' },
                    { id: 'other', label: 'سایر تخصص‌ها', note: 'عمومی' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setCalcField(f.id as any)}
                      className={`p-2.5 rounded-xl text-right transition border cursor-pointer ${
                        calcField === f.id
                          ? 'bg-amber-400 text-[#082833] font-black border-amber-400'
                          : 'bg-black/30 text-slate-300 border-white/10'
                      }`}
                    >
                      <div className="font-bold">{f.label}</div>
                      <div className="text-[10px] opacity-75">{f.note}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-200">پیشنهاد حقوق سالانه ناخالص:</span>
                  <span className="font-mono text-amber-300 font-black">
                    {calcSalary.toLocaleString()} یورو / سال
                  </span>
                </div>
                <input
                  type="range"
                  min="28000"
                  max="90000"
                  step="1000"
                  value={calcSalary}
                  onChange={(e) => setCalcSalary(Number(e.target.value))}
                  className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>۲۸,۰۰۰ €</span>
                  <span className="text-amber-400 font-bold">کف ۳۴,۵۰۰ €</span>
                  <span>۹۰,۰۰۰ €</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">تسلط به زبان اسپانیایی:</label>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {[
                    { id: 'none', label: 'فقط انگلیسی' },
                    { id: 'a2', label: 'A2 اسپانیایی' },
                    { id: 'b1', label: 'B1' },
                    { id: 'b2_plus', label: 'B2 / C1' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setCalcSpanishLevel(l.id as any)}
                      className={`py-2 px-1 rounded-xl font-bold transition border cursor-pointer ${
                        calcSpanishLevel === l.id
                          ? 'bg-[#00a8cc] text-white border-[#00a8cc]'
                          : 'bg-black/30 text-slate-300 border-white/10'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c3847] to-[#08222b] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-amber-300">نتیجه سنجش اسپانیا</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    evaluationResult.meetsSalary
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {evaluationResult.meetsSalary ? 'واجد شرایط کف حقوق' : 'کمتر از کف قانونی'}
                </span>
              </div>

              <div className="text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>کف حقوق مورد نیاز:</span>
                  <span className="font-bold text-white">
                    {evaluationResult.requiredSalary.toLocaleString()} یورو
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>صرفه‌جویی سالانه قانون بکهام:</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    ~{evaluationResult.beckhamSavingsPerYear.toLocaleString()} یورو
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>شانس قبولی در کنسولگری:</span>
                  <span className="font-bold text-amber-300">{evaluationResult.prob}٪</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenAssessment}
                className="w-full rounded-xl bg-gradient-to-l from-amber-400 to-amber-500 py-3 text-xs font-black text-[#082833] shadow-glow hover:scale-[1.02] transition cursor-pointer"
              >
                رزرو وقت بررسی مدارک اسپانیا با وکیل
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* چک‌لیست مدارک رسمی اسپانیا */}
      <section className="py-14 bg-[#05171e] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black text-white">چک‌لیست مدارک سفارت اسپانیا برای بلوکارت</h2>
              <p className="text-xs text-slate-400 mt-1">مدارک خود را تیک بزنید تا وضعیت آماده‌سازی را بررسی فرمایید.</p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-xs text-white transition cursor-pointer"
            >
              {copiedChecklist ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copiedChecklist ? 'کپی شد!' : 'کپی مدارک'}</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {DOCUMENTS_SPAIN.map((doc) => {
              const isChecked = !!checkedDocs[doc.id];
              return (
                <div
                  key={doc.id}
                  onClick={() => setCheckedDocs((p) => ({ ...p, [doc.id]: !p[doc.id] }))}
                  className={`flex items-start gap-3 rounded-2xl border p-3.5 transition cursor-pointer ${
                    isChecked
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  <div
                    className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border ${
                      isChecked ? 'border-emerald-500 bg-emerald-500 text-black' : 'border-slate-500'
                    }`}
                  >
                    {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className={`text-xs font-bold ${isChecked ? 'text-emerald-300 line-through' : 'text-white'}`}>
                      {doc.title}
                    </span>
                    <p className="text-[11px] text-slate-300 mt-0.5">{doc.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* سوالات متداول اسپانیا */}
      <section className="py-14 container mx-auto px-4 md:px-8 max-w-3xl">
        <h2 className="text-xl font-black text-white text-center mb-6">پرسش‌های متداول بلوکارت اسپانیا</h2>
        <div className="space-y-2.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-3.5 text-right text-xs font-bold text-white hover:text-amber-300 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-3.5 pt-0 text-xs text-slate-300 border-t border-white/5 bg-black/20 text-justify">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SpainBlueCardPage;
