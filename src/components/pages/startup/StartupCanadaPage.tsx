import OptimizedImage from '../../OptimizedImage';
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
  Rocket,
  ShieldCheck,
  Users,
  Building2,
  Award,
  Globe2,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

const SUPPORT_TYPES = [
  { id: 'incubator', name: 'انکوباتور کسب‌وکار (Business Incubator)', minInvest: '۰ دلار (تنها پذیرش انکوباتور)', equity: 'بدون واگذاری سهام اجباری', leadTime: '۴ تا ۶ ماه' },
  { id: 'angel', name: 'گروه سرمایه‌گذاران فرشته (Angel Investor)', minInvest: 'حداقل ۷۵,۰۰۰ دلار کانادا', equity: 'مشارکت طبق توافق', leadTime: '۵ تا ۸ ماه' },
  { id: 'vc', name: 'صندوق سرمایه‌گذاری خطرپذیر (Venture Capital)', minInvest: 'حداقل ۲۰۰,۰۰۰ دلار کانادا', equity: 'مشارکت سهامدار', leadTime: '۶ تا ۹ ماه' },
];

export const StartupCanadaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  useSeo({
    title: 'ویزای استارت‌آپ کانادا ۲۰۲۶ | اخذ مستقیم اقامت دائم PR',
    description:
      'راهنمای کامل استارت‌آپ ویزای کانادا (SUV)؛ اخذ نامه حمایتی LOS از انکوباتورهای تاییدشده، اقامت دائم مستقیم برای کل خانواده و بدون شرط سنی با دیاکو.',
    canonical: '/guides/startup-canada',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'استارت آپ کانادا ۲۰۲۶',
      'Canada Startup Visa',
      'نامه حمایتی LOS کانادا',
      'انکوباتورهای مجاز کانادا',
      'اقامت دائم مستقیم کانادا PR',
      'ویزای کارآفرینی کانادا SUV',
      'مهاجرت نوآوری کانادا دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/startup-canada#article',
          headline: 'راهنمای جامع ویزای استارت‌آپ کانادا ۲۰۲۶: شرایط قبولی و اقامت دائم',
          description:
            'بررسی فرآیند برنامه ویزای استارت‌آپ فدرال کانادا (Start-up Visa Program)، نحوه اخذ Letter of Support و اخذ کارت اقامت دائم مستقیم برای متقاضی اصلی و اعضای تیم.',
          image: [
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
          ],
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
          inLanguage: 'fa-IR',
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/startup-canada#howto',
          name: 'مراحل اقدام برای ویزای استارت‌آپ کانادا (SUV)',
          description: 'فرایند قانونی گام‌به‌گام از آماده‌سازی پیچ‌دک تا صدور کارت PR کانادا',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'طراحی بیزینس پلن و مدل کسب‌وکار نوآورانه (Pitch Deck)',
              text: 'نگارش طرح کسب‌وکار مطابق معیارهای اداره مهاجرت کانادا (IRCC) و سازمان‌های تعیین‌شده.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'ارائه دفاعیه و اخذ نامه حمایتی رسمی (Letter of Support)',
              text: 'دفاع آنلاین در برابر انکوباتور یا صندوق‌های سرمایه‌گذاری تاییدشده توسط دولت کانادا.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'ارائه مدرک زبان انگلیسی CLB 5 و تمکن مالی اولیه',
              text: 'آیلتس عمومی حداقل ۵ یا مدرک فرانسوی معادل به همراه اثبات موجودی بانکی خانوادگی.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'ارسال پرونده به IRCC و اخذ ویزای کار باز و کارت PR',
              text: 'دریافت ورک پرمیت برای شروع بیزینس در کانادا در حین صدور اقامت دائم فدرال.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/startup-canada#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا در صورت شکست ایده استارت‌آپ، اقامت دائم کانادا باطل می‌شود؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. طبق قوانین رسمی اداره مهاجرت کانادا (IRCC)، اقامت دائم صادر شده از طریق برنامه SUV بدون قید و شرط است و در صورت عدم موفقیت تجاری طرح پس از ورود، اقامت شما و خانواده محفوظ است.',
              },
            },
            {
              '@type': 'Question',
              name: 'چند نفر می‌توانند در یک پرونده استارت‌آپ کانادا شریک باشند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حداکثر تا ۵ نفر موسس و هم‌بنیان‌گذار می‌توانند در قالب یک تیم استارت‌آپی برای دریافت اقامت دائم کانادا اقدام نمایند، مشروط بر اینکه هر عضو حداقل ۱۰ درصد سهام شرکت را دارا باشد.',
              },
            },
            {
              '@type': 'Question',
              name: 'حداقل سطح زبان مورد نیاز برای ویزای استارت‌آپ کانادا چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حداقل نمره لازم CLB 5 در زبان انگلیسی (IELTS General: Listening 5, Reading 4, Writing 5, Speaking 5) یا فرانسوی معادل (TEF/TCF) می‌باشد.',
              },
            },
          ],
        },
      ],
    },
  });

  // تعاملی: شبیه‌ساز امتیاز تیم و سرمایه
  const [teamMembers, setTeamMembers] = useState(2);
  const [selectedSupport, setSelectedSupport] = useState('incubator');
  const [hasLanguageProof, setHasLanguageProof] = useState(true);
  const [hasTechMvp, setHasTechMvp] = useState(true);

  const [copiedDoc, setCopiedDoc] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const calculateReadinessScore = useMemo(() => {
    let score = 40;
    if (selectedSupport === 'incubator') score += 25;
    if (selectedSupport === 'angel') score += 20;
    if (selectedSupport === 'vc') score += 30;
    if (hasLanguageProof) score += 20;
    if (hasTechMvp) score += 15;
    if (teamMembers >= 2 && teamMembers <= 4) score += 5;
    return Math.min(score, 100);
  }, [teamMembers, selectedSupport, hasLanguageProof, hasTechMvp]);

  const CHECKLIST_ITEMS = [
    'گواهی نامه رسمی حمایتی (Letter of Support - LOS) از نهاد مورد تایید IRCC',
    'کارنامه رسمی آزمون زبان انگلیسی (IELTS General) با حداقل CLB 5 یا فرانسه TEF',
    'پاسپورت معتبر کلیه اعضای تیم و افراد تحت تکفل با اعتبار حداقل ۲ سال',
    'بیزینس پلن اجرایی کامل همراه با پیش‌بینی مالی ۵ ساله و مدل درآمدی',
    'اثبات تمکن مالی و گردش حساب ۶ ماهه طبق جدول LICO کانادا',
    'گواهی عدم سوء‌پیشینه و آزمایشات پزشکی (Medical Exam) مورد تایید سفارت',
  ];

  const handleCopyChecklist = () => {
    navigator.clipboard.writeText(CHECKLIST_ITEMS.join('\n'));
    setCopiedDoc('all');
    setTimeout(() => setCopiedDoc(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#061a21] text-slate-100" dir="rtl">
      {/* هیرو سکشن بهینه‌شده LCP و AIO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#082833] via-[#061a21] to-[#041217] pt-10 pb-16">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-violet-500/15 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]" />

        <div className="container mx-auto px-4 md:px-8">
          {/* ناوبری برگشت به خانه */}
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به صفحه اصلی خدمات دیاکو
            </button>
            <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-[11px] font-bold text-violet-300">
              🇨🇦 دپارتمان استارت‌آپ بین‌الملل دیاکو
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-black text-amber-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                ویزای استارت‌آپ کانادا (Canada Startup Visa 2026)
              </span>

              {/* H1 واحد و کلیدواژه‌دار */}
              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl text-white">
                ویزای استارت‌آپ کانادا؛ اخذ مستقیم اقامت دائم (PR) برای کل خانواده
              </h1>

              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-300 sm:text-base text-justify">
                برنامه فدرال استارت‌آپ ویزای کانادا (SUV) یکی از سریع‌ترین و پایدارترین مسیرهای مهاجرت تجاری در جهان است. متقاضیان واجد شرایط با ایده‌های نوآورانه فناوری، سلامت، فین‌تک یا انرژی پاک، بدون نیاز به مدرک تحصیلی خاص یا شرط سنی، می‌توانند از طریق انکوباتورهای رسمی تحت نظارت دیاکو، کارت اقامت دائم فدرال کانادا را برای خود، همسر و فرزندان اخذ نمایند.
              </p>

              {/* نکات کلیدی و مزایا */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                  <span className="text-[10px] text-slate-400 font-bold block">نوع اقامت اعطایی</span>
                  <span className="text-sm font-black text-amber-300 mt-1 block">اقامت دائم مستقیم (PR)</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                  <span className="text-[10px] text-slate-400 font-bold block">تعداد اعضای تیم</span>
                  <span className="text-sm font-black text-emerald-400 mt-1 block">تا ۵ خانواده در یک پرونده</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
                  <span className="text-[10px] text-slate-400 font-bold block">تضمین عدم باطل شدن</span>
                  <span className="text-sm font-black text-violet-300 mt-1 block">حفظ PR حتی با شکست ایده</span>
                </div>
              </div>

              {/* دکمه‌های اکشن */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Rocket className="h-4 w-4" />
                  بررسی رایگان ایده در دپارتمان استارت‌آپ
                </button>
                <a
                  href="tel:+982191693955"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4 text-amber-400" />
                  مشاوره تلفنی: ۰۲۱۹۱۶۹۳۹۵۵
                </a>
              </div>
            </div>

            {/* تصویر LCP با مشخصات دقیق بدون CLS */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[16/9] w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80 1000w, https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=85 1400w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="جلسه استارت‌آپ و دفاع در برابر انکوباتورهای رسمی کانادا برای اخذ اقامت دائم"
                  loading="eager"
                  fetchPriority="high"
                  width={1000}
                  height={563}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 right-4 left-4 rounded-xl border border-white/15 bg-black/60 p-3 backdrop-blur-md">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    پوشش مستقیم Designated Organizations مورد تایید IRCC
                  </p>
                  <p className="text-[10px] text-slate-300 mt-0.5">
                    همکاری رسمی با مراکز نوآوری تورنتو، ونکوور و مونترال
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ابزار تعاملی: شبیه‌ساز امتیاز شانس پذیرش استارت‌آپ */}
      <section className="py-14 bg-[#082029]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-[11px] font-black text-amber-300">ابزار آنلاین هوشمند</span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  شبیه‌ساز هوشمند شانس قبولی استارت‌آپ کانادا
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  با تنظیم اعضای تیم، مدرک زبان و ساختار حمایتی، شانس دریافت LOS را تخمین بزنید
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-amber-400/10 border border-amber-400/30 px-4 py-2">
                <span className="text-xs font-bold text-slate-300">امتیاز تخمینی آمادگی:</span>
                <span className="text-2xl font-black text-amber-300">{calculateReadinessScore}٪</span>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  تعداد هم‌بنیان‌گذاران تیم استارت‌آپ:
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTeamMembers(num)}
                      className={`flex-1 rounded-xl py-2 text-xs font-bold transition cursor-pointer ${
                        teamMembers === num
                          ? 'bg-amber-400 text-slate-900 font-black'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {num} نفر
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  حداکثر ۵ بنیان‌گذار می‌توانند در یک پرونده ویزای اقامت دائم کانادا اقدام نمایند.
                </p>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    نهاد حامی مالی و انکوباتور انتخابی:
                  </label>
                  <div className="space-y-2">
                    {SUPPORT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedSupport(type.id)}
                        className={`w-full flex items-center justify-between rounded-xl p-3 text-right text-xs transition border cursor-pointer ${
                          selectedSupport === type.id
                            ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                            : 'border-white/10 bg-black/20 text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-white text-xs">{type.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">زمان تخمینی دفاع: {type.leadTime}</p>
                        </div>
                        <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-amber-300">
                          {type.minInvest}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-300">
                    وضعیت فنی و زبانی متقاضیان:
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasLanguageProof}
                      onChange={(e) => setHasLanguageProof(e.target.checked)}
                      className="rounded border-slate-700 text-amber-400 focus:ring-amber-400"
                    />
                    <span className="text-xs text-slate-200">
                      داشتن حداقل آیلتس عمومی ۵ یا فرانسوی CLB 5 برای همه متقاضیان
                    </span>
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasTechMvp}
                      onChange={(e) => setHasTechMvp(e.target.checked)}
                      className="rounded border-slate-700 text-amber-400 focus:ring-amber-400"
                    />
                    <span className="text-xs text-slate-200">
                      وجود نمونه اولیه فنی (MVP) یا ایده مستند و دارای پتانسیل تجاری بین‌المللی
                    </span>
                  </label>
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
                  <p className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    نتیجه ارزیابی تیم وکیل رسمی کانادا (CICC):
                  </p>
                  <p className="text-[11px] text-slate-200 mt-1 leading-relaxed">
                    ایده شما دارای تطابق با اولویت‌های اقتصادی ۲۰۲۶ کانادا است. در دیاکو، کلیه مراحل طراحی Pitch Deck، بیزینس پلن و مصاحبه با انکوباتور با نظارت مستقیم وکلای رجیسترشده کانادا انجام می‌شود.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* مقاله جامع و غنی بر اساس اصول سئو و AIO */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                برنامه ویزای استارت‌آپ فدرال کانادا (Start-up Visa Program) چیست؟
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 text-justify">
                برنامه ویزای استارت‌آپ کانادا با هدف جذب کارآفرینان نوآور خارجی به وجود آمده است که پتانسیل ساخت کسب‌وکارهایی با قابلیت رشد سریع، ایجاد اشتغال برای کانادایی‌ها و رقابت در سطح بین‌المللی را دارند. بر خلاف برنامه‌های کارآفرینی استانی که نیازمند سرمایه‌گذاری شخصی کلان و تعهدات اقامت در استان خاصی هستند، برنامه استارت‌آپ فدرال کانادا به شما این امکان را می‌دهد که از همان ابتدا اقامت دائم (PR) دریافت نموده و در هر نقطه‌ای از کانادا به جز استان کبک آزادانه زندگی کنید.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-black text-amber-300">
                چرا استارت‌آپ کانادا بهترین برنامه مهاجرتی تجاری دنیاست؟
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">اقامت دائم مستقیم بدون شرط تمدید</h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      حتی اگر بیزینس در کانادا با شکست مواجه شود، اقامت دائم شما و همراهانتان لغو نخواهد شد.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">تحصیل رایگان فرزندان و بیمه درمانی</h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      بهره‌مندی کلیه اعضای خانواده از بیمه درمانی دولتی رایگان و مدارس عمومی از بدو ورود.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">مجوز کار باز (Open Work Permit)</h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      امکان ورود سریع به کانادا با مجوز کار قبل از نهایی شدن پرونده اقامت دائم.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">هم‌بنیان‌گذاری تا ۵ خانواده</h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      امکان تشکیل تیم‌های چندرشته‌ای شامل مدیر محصول، توسعه‌دهنده فنی و بازاریاب.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* گام‌های اقدام و مراحل نقشه راه */}
            <div>
              <h3 className="text-xl font-black text-white">
                ۴ مرحله کلیدی اخذ اقامت استارت‌آپ کانادا با هلدینگ دیاکو
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-400 text-xs font-black text-slate-900">
                      ۱
                    </span>
                    <h4 className="text-xs font-bold text-white">ارزیابی ایده و تدوین پیچ‌دک</h4>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2">
                    تیم تکنولوژی دیاکو ایده استارت‌آپ را متناسب با نیازهای صنعتی کانادا بازطراحی و پروپوزال اجرایی را آماده می‌کند.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-400 text-xs font-black text-slate-900">
                      ۲
                    </span>
                    <h4 className="text-xs font-bold text-white">ارائه به انکوباتور و اخذ LOS</h4>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2">
                    دفاع آنلاین در جلسات پیچ و دریافت گواهی رسمی تعهد (Commitment Certificate) و نامه حمایتی رسمی.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-400 text-xs font-black text-slate-900">
                      ۳
                    </span>
                    <h4 className="text-xs font-bold text-white">ثبت پرونده اقامت دائم در IRCC</h4>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2">
                    ارسال پرونده جامع فدرال همراه با مدارک زبانی، تمکن و امنیتی با کد رهگیری اختصاصی پورتال PR.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-400 text-xs font-black text-slate-900">
                      ۴
                    </span>
                    <h4 className="text-xs font-bold text-white">ورود به کانادا و دریافت کارت PR</h4>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2">
                    دریافت ویزای ورود، صدور شماره بیمه اجتماعی (SIN) و تحویل کارت اقامت دائم ۵ ساله فیزیکی کانادا.
                  </p>
                </div>
              </div>
            </div>

            {/* چک‌لیست تعاملی با کپی یک‌کلیکه */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">چک‌لیست رسمی مدارک استارت‌آپ کانادا</h3>
                  <p className="text-xs text-slate-400 mt-0.5">مدارک الزامی برای ارسال به سفارت و انکوباتور</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyChecklist}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-400/20"
                >
                  {copiedDoc === 'all' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  {copiedDoc === 'all' ? 'چک‌لیست کپی شد' : 'کپی کل چک‌لیست'}
                </button>
              </div>
              <ul className="mt-4 space-y-2.5">
                {CHECKLIST_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* سوالات متداول با اسکیما FAQ */}
            <div>
              <h3 className="text-xl font-black text-white mb-4">
                سوالات متداول متقاضیان ویزای استارت‌آپ کانادا
              </h3>
              <div className="space-y-3">
                {[
                  {
                    q: 'آیا در صورت شکست ایده استارت‌آپ، اقامت دائم کانادا باطل می‌شود؟',
                    a: 'خیر. طبق قوانین رسمی اداره مهاجرت کانادا (IRCC)، اقامت دائم صادر شده از طریق برنامه SUV بدون قید و شرط است و در صورت عدم موفقیت تجاری طرح پس از ورود، اقامت شما و خانواده محفوظ است.',
                  },
                  {
                    q: 'چند نفر می‌توانند در یک پرونده استارت‌آپ کانادا شریک باشند؟',
                    a: 'حداکثر تا ۵ نفر موسس و هم‌بنیان‌گذار می‌توانند در قالب یک تیم استارت‌آپی برای دریافت اقامت دائم کانادا اقدام نمایند، مشروط بر اینکه هر عضو حداقل ۱۰ درصد سهام شرکت را دارا باشد.',
                  },
                  {
                    q: 'حداقل سطح زبان مورد نیاز برای ویزای استارت‌آپ کانادا چقدر است؟',
                    a: 'حداقل نمره لازم CLB 5 در زبان انگلیسی (IELTS General: شنیداری ۵، خواندن ۴، نگارش ۵، گفتاری ۵) یا فرانسوی معادل (TEF/TCF) می‌باشد.',
                  },
                  {
                    q: 'میزان تمکن مالی مورد نیاز برای پرونده استارت‌آپ کانادا چقدر است؟',
                    a: 'طبق جدول رسمی LICO کانادا، برای یک خانواده ۳ نفره حدود ۲۱,۰۰۰ دلار کانادا در حساب بانکی کافی است و نیازی به سرمایه‌گذاری میلیاردی شخصی در پروژه نیست.',
                  },
                ].map((faq, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="flex w-full items-center justify-between p-4 text-right text-xs font-bold text-white hover:text-amber-300"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform ${
                          openFaq === idx ? 'rotate-180 text-amber-300' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="border-t border-white/10 p-4 text-xs leading-relaxed text-slate-300">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* بنر تماس و اقدام نهایی */}
            <div className="rounded-3xl border border-amber-400/40 bg-gradient-to-l from-amber-500/20 via-white/5 to-white/5 p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                آماده راه‌اندازی استارت‌آپ خود در کانادا و اخذ اقامت دائم هستید؟
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                ایده نوآورانه شما توسط مشاوران تجاری و وکلای عضو رسمی CICC بررسی شده و مناسب‌ترین انکوباتور رسمی برای تیم شما انتخاب خواهد شد.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs font-black text-[#082833] hover:bg-amber-300 cursor-pointer shadow-lg"
                >
                  تکمیل فرم ارزیابی استارت‌آپ
                </button>
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold text-white hover:bg-white/20 cursor-pointer"
                >
                  بازگشت به خدمات دیاکو
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartupCanadaPage;
