import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  PhoneCall,
  Check,
  Copy,
  Sparkles,
  Rocket,
  ShieldCheck,
  Building2,
  Landmark,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const StartupAustriaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  useSeo({
    title: 'ویزای استارت‌آپ اتریش ۲۰۲۶ | کارت قرمز-سفید-قرمز وین',
    description:
      'راهنمای استارت‌آپ ویزای اتریش ۲۰۲۶؛ تاییدیه FFG، سرمایه اولیه ۳۰ هزار یورو، کارت قرمز-سفید-قرمز موسسان با نظارت دفتر وین دیاکو.',
    canonical: '/guides/startup-austria',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'استارت آپ اتریش ۲۰۲۶',
      'Austria Startup Visa',
      'کارت قرمز سفید قرمز استارت آپ',
      'تاییدیه FFG اتریش',
      'انکوباتورهای وین',
      'سرمایه گذاری استارت آپ اتریش',
      'دفتر وین هلدینگ دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/startup-austria#article',
          headline: 'راهنمای جامع ویزای استارت‌آپ اتریش ۲۰۲۶: کارت RWR موسسان و شرایط FFG',
          description:
            'بررسی قوانین کارت قرمز-سفید-قرمز برای موسسان استارت‌آپ اتریش (Red-White-Red Card for Start-up Founders)، جدول امتیازات و ارزیابی آژانس ارتقای تحقیقات اتریش (FFG).',
          image: [
            'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
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
          '@id': 'https://www.dia-co.ir/guides/startup-austria#howto',
          name: 'مراحل دریافت کارت قرمز-سفید-قرمز استارت‌آپ اتریش',
          description: 'مراحل ارزیابی ایده در اتریش تا اخذ اقامت رسمی شینگن در اداره MA35 وین',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'آماده‌سازی بیزینس پلن نوآورانه و تامین سرمایه ۳۰,۰۰۰ یورویی',
              text: 'طرح تجاری متمرکز بر نوآوری صنعتی یا فناوری با اثبات حداقل ۳۰ هزار یورو سرمایه در گردش.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'ارزیابی صلاحیت توسط آژانس تحقیقات اتریش (FFG)',
              text: 'کسب حداقل ۵۰ امتیاز از جدول رسمی امتیازدهی سیستم کارگری اتریش (AMS/FFG).',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'پذیرش در مراکز شتاب‌دهنده وین یا گراتس',
              text: 'جلب حمایت انکوباتورهای دانشگاهی مانند INiTS یا شبکه‌های سرمایه‌گذاری اتریش.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'صدور ویزای D و تحویل کارت RWR Plus در اداره مهاجرت وین',
              text: 'اقامت ۲ ساله موسس همراه با حق کار آزادانه و الحاق همزمان خانواده.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/startup-austria#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حداقل سرمایه برای استارت‌آپ اتریش چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حداقل سرمایه اولیه قانونی ۳۰,۰۰۰ یورو است که دست‌کم نیمی از آن باید سرمایه نقدی باشد.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا برای استارت‌آپ اتریش مدرک زبان آلمانی اجباری است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر، مدرک زبان آلمانی اجباری نیست و داشتن مدرک زبان انگلیسی (IELTS 6 به بالا) برای کسب امتیاز لازم در سیستم AMS کافی است.',
              },
            },
          ],
        },
      ],
    },
  });

  const [educationLevel, setEducationLevel] = useState<'masters' | 'bachelor' | 'diploma'>('masters');
  const [workExperience, setWorkExperience] = useState(5);
  const [languageEnglish, setLanguageEnglish] = useState(true);
  const [languageGerman, setLanguageGerman] = useState(false);
  const [capitalAvailable, setCapitalAvailable] = useState(true);

  const pointsScore = useMemo(() => {
    let p = 0;
    if (educationLevel === 'masters') p += 30;
    else if (educationLevel === 'bachelor') p += 20;
    else p += 10;

    if (workExperience >= 5) p += 20;
    else if (workExperience >= 2) p += 10;

    if (languageEnglish) p += 10;
    if (languageGerman) p += 10;
    if (capitalAvailable) p += 15;

    return p;
  }, [educationLevel, workExperience, languageEnglish, languageGerman, capitalAvailable]);

  const CHECKLIST_AUSTRIA = [
    'بیزینس پلن استاندارد تایید شده توسط اتاق بازرگانی اتریش (WKO)',
    'گواهی تمکن و موجودی ۳۰,۰۰۰ یورویی در حساب بانکی معتبر',
    'رزومه یوروپَس و مدارک تحصیلی تایید شده با آپوستیل و ترجمه رسمی آلمانی',
    'گواهی آزمون زبان انگلیسی (IELTS/TOEFL) یا آلمانی (Goethe/ÖSD)',
    'قرارداد یا پیش‌قرارداد پذیرش انکوباتور اتریشی یا شتاب‌دهنده وین',
    'بیمه‌نامه معتبر بین‌المللی سفر با پوشش حداقل ۳۰ هزار یورو',
  ];

  return (
    <div className="min-h-screen bg-[#061a21] text-slate-100" dir="rtl">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#082833] via-[#061a21] to-[#041217] pt-10 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به خدمات دیاکو
            </button>
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-bold text-red-300">
              🇦🇹 دفتر رسمی دیاکو در وین اتریش
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-black text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                اتریش | قلب نوآوری اروپای مرکزی
              </span>

              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl text-white">
                ویزای استارت‌آپ اتریش؛ اخذ کارت قرمز-سفید-قرمز موسسان در وین
              </h1>

              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-300 sm:text-base text-justify">
                برنامه موسسان استارت‌آپ اتریش (Start-up Founders RWR Card) فرصتی بی‌نظیر برای پیاده‌سازی محصولات و خدمات نوآورانه در یکی از باکیفیت‌ترین پایتخت‌های جهان است. وکلای مقیم وین هلدینگ دیاکو، از نگارش بیزینس پلن و دفاع در FFG تا تحویل کارت اقامت ۲ ساله همراه با الحاق همسر و فرزندان در کنار شما هستند.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs font-black text-[#082833] shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Rocket className="h-4 w-4" />
                  بررسی امتیاز استارت‌آپ اتریش
                </button>
                <a
                  href="tel:+436889763256"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  <PhoneCall className="h-4 w-4 text-amber-400" />
                  دفتر وین: 436889763256+
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[16/9] w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=80"
                  srcSet="https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=600&q=75 600w, https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=80 1000w"
                  sizes="(max-width: 768px) 100vw, 500px"
                  alt="شهر وین اتریش، هاب اکوسیستم استارت‌آپ‌های پیشرفته اروپا"
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
                    پشتیبانی مستقیم دفتر دیاکو در منطقه ۲ وین (Ausstellungsstraße)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* محاسبه‌گر امتیازات AMS / FFG اتریش */}
      <section className="py-14 bg-[#082029]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-[11px] font-black text-amber-300">سیستم امتیازدهی اتریش</span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  محاسبه‌گر امتیاز کارت موسسان استارت‌آپ اتریش
                </h2>
                <p className="text-xs text-slate-300 mt-1">حداقل ۵۰ امتیاز از مجموع ۸۵ امتیاز جهت تایید FFG الزامی است</p>
              </div>
              <div className={`rounded-2xl border px-4 py-2 ${pointsScore >= 50 ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-amber-400/40 bg-amber-400/10'}`}>
                <span className="text-xs font-bold text-slate-300">امتیاز کسب‌شده: </span>
                <span className={`text-2xl font-black ${pointsScore >= 50 ? 'text-emerald-400' : 'text-amber-300'}`}>{pointsScore} / ۵۰</span>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">مدرک تحصیلی:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'masters', label: 'ارشد / دکتری (۳۰)' },
                      { id: 'bachelor', label: 'کارشناسی (۲۰)' },
                      { id: 'diploma', label: 'فنی/دیپلم (۱۰)' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setEducationLevel(m.id as any)}
                        className={`rounded-xl py-2 text-[11px] font-bold transition ${
                          educationLevel === m.id ? 'bg-amber-400 text-slate-900' : 'bg-white/5 text-slate-300'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    سابقه کاری مرتبط: {workExperience} سال
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={workExperience}
                    onChange={(e) => setWorkExperience(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                  <input
                    type="checkbox"
                    checked={languageEnglish}
                    onChange={(e) => setLanguageEnglish(e.target.checked)}
                    className="rounded text-amber-400 focus:ring-amber-400"
                  />
                  <span className="text-xs text-slate-200">تسلط به زبان انگلیسی (IELTS حداقل ۶ یا TOEFL)</span>
                </label>
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                  <input
                    type="checkbox"
                    checked={languageGerman}
                    onChange={(e) => setLanguageGerman(e.target.checked)}
                    className="rounded text-amber-400 focus:ring-amber-400"
                  />
                  <span className="text-xs text-slate-200">آشنایی با زبان آلمانی (A2 یا B1 به بالا)</span>
                </label>
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                  <input
                    type="checkbox"
                    checked={capitalAvailable}
                    onChange={(e) => setCapitalAvailable(e.target.checked)}
                    className="rounded text-amber-400 focus:ring-amber-400"
                  />
                  <span className="text-xs text-slate-200">تامین حداقل سرمایه اولیه ۳۰,۰۰۰ یورو در گردش</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* مدارک و چک‌لیست */}
      <section className="py-14">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-base font-bold text-white mb-4">مدارک و الزامات پرونده استارت‌آپ اتریش</h3>
            <ul className="space-y-2.5">
              {CHECKLIST_AUSTRIA.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-amber-400/40 bg-gradient-to-l from-amber-500/20 to-white/5 p-8 text-center">
            <h3 className="text-xl font-black text-white">مشاوره حضوری و آنلاین با وکلای دفتر وین</h3>
            <p className="mt-2 text-xs text-slate-300 max-w-lg mx-auto">
              دفتر اتریش دیاکو در وین، کلیه فرایندهای دفاع تجاری در FFG و ثبت شرکت را به زبان آلمانی و تحت قانون فدرال مدیریت می‌کند.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs font-black text-[#082833] hover:bg-amber-300 cursor-pointer shadow-lg"
              >
                شروع بررسی ایده در وین
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartupAustriaPage;
