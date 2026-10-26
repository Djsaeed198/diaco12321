import React, { useState } from 'react';
import {
  CheckCircle2, Clock, ArrowRight, ChevronDown, PhoneCall,
  Palette, Building2, Euro, Users, FileText, Banknote,
  Briefcase, CalendarDays, BookOpen, AlertTriangle,
  ShieldCheck, Landmark, FileCheck2, Sparkles, Quote,
  MapPin, HeartPulse, Receipt, Home, Coffee, TrainFront,
  Flame, ShieldAlert, BadgeCheck, Wallet, Route, Globe,
  Fingerprint, Scale, FileWarning, PartyPopper, Ticket,
  Clapperboard, Music, Mic2, Camera, PenTool, Theater,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const ArtistSpainPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای هنرمندان اسپانیا ۲۰۲۶ | UGE ۲۰ روزه یا Autónomo؟ تفاوت حیاتی',
    description:
      'اسپانیا یک ویزای هنری ندارد، دو مسیر دارد: UGE سریع (۲۰ روز، از داخل اسپانیا) برای پروژه‌های فرهنگی و Autónomo (۱-۳ ماه، فقط از کنسولگری) برای خوداشتغالی. راهنمای واقعی ۲۰۲۶ با دیاکو.',
    canonical: '/guides/artist-spain',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای هنرمندان اسپانیا ۲۰۲۶',
      'UGE audiovisual España',
      'Autónomo artista España',
      'Ley 14/2013 artistas',
      'IPREM 2026 600 یورو',
      'اقامت هنرمندان اسپانیا ۲۰ روز',
      'تفاوت UGE و Autónomo',
      'ویزای فرهنگی اسپانیا',
      'مهاجرت بازیگران به اسپانیا',
      'مجوز اقامت هنری بارسلونا',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/artist-spain#article',
          headline:
            'ویزای هنرمندان اسپانیا ۲۰۲۶: چرا «یک ویزا» وجود ندارد و انتخاب اشتباه می‌تواند پرونده شما را نابود کند',
          description:
            'بررسی دو مسیر متفاوت برای هنرمندان اسپانیا: UGE (Ley 14/2013) با ۲۰ روز پردازش و Autónomo (Cuenta Propia) با ۱-۳ ماه. تفاوت در محل درخواست، مدارک و آستانه درآمد (IPREM ۱۵۰٪ در مقابل ۴۰۰٪).',
          image: [
            'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
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
          dateModified: '2026-10-25',
          inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'UGE audiovisual' },
            { '@type': 'Thing', name: 'Autónomo artista' },
            { '@type': 'Thing', name: 'Ley 14/2013' },
          ],
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/artist-spain#howto',
          name: 'انتخاب مسیر صحیح برای هنرمندان اسپانیا',
          description: 'راهنمای گام‌به‌گام تصمیم‌گیری بین UGE و Autónomo',
          totalTime: 'P6M',
          step: [
            {
              '@type': 'HowToStep', position: 1,
              name: 'تعیین نوع فعالیت هنری',
              text: 'آیا با شرکت/پروژه اسپانیایی قرارداد دارید (UGE) یا به‌صورت مستقل برای مشتریان خود کار می‌کنید (Autónomo)؟',
            },
            {
              '@type': 'HowToStep', position: 2,
              name: 'بررسی محل درخواست',
              text: 'UGE: می‌توان از داخل اسپانیا (حتی با ویزای توریستی) درخواست داد. Autónomo: فقط از کنسولگری در کشور محل اقامت.',
            },
            {
              '@type': 'HowToStep', position: 3,
              name: 'آماده‌سازی مدارک مالی',
              text: 'UGE: قرارداد + پروژه + بیمه. Autónomo: بیزینس پلن + تمکن مالی (IPREM ۴۰۰٪ ≈ €۲,۴۰۰/ماه).',
            },
            {
              '@type': 'HowToStep', position: 4,
              name: 'ثبت درخواست',
              text: 'UGE: توسط شرکت اسپانیایی از طریق پلتفرم الکترونیکی. Autónomo: حضوری در کنسولگری.',
            },
            {
              '@type': 'HowToStep', position: 5,
              name: 'دریافت اقامت و ثبت‌نام',
              text: 'پس از تأیید: ثبت در Seguridad Social (RETA برای Autónomo)، Empadronamiento و دریافت TIE.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/artist-spain#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا ویزای هنرمندان اسپانیا ۲۰ روزه صادر می‌شود؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'فقط در مسیر UGE (Ley 14/2013) برای پروژه‌های فرهنگی/صوتی-تصویری. این مسیر نیازمند قرارداد با شرکت اسپانیایی است و می‌توان از داخل اسپانیا درخواست داد. مسیر Autónomo (خوداشتغالی هنری) ۱ تا ۳ ماه طول می‌کشد و فقط از کنسولگری امکان‌پذیر است.',
              },
            },
            {
              '@type': 'Question',
              name: 'حداقل درآمد برای هنرمند در اسپانیا چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بستگی به مسیر دارد. UGE (پروژه‌ای): عدد ثابتی ندارد، اما IPREM ۱۵۰٪ (€۹۰۰/ماه) به‌عنوان مرجع امن توصیه می‌شود. Autónomo (خوداشتغالی): IPREM ۴۰۰٪ (€۲,۴۰۰/ماه) یا €۲۸,۸۰۰/سال به‌عنوان مرجع اصلی. IPREM ۲۰۲۶: €۶۰۰/ماه.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا می‌توان با ویزای توریستی در اسپانیا درخواست اقامت هنری داد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'فقط در مسیر UGE. اگر با ویزای شینگن قانونی در اسپانیا هستید و قرارداد پروژه فرهنگی دارید، شرکت اسپانیایی می‌تواند از داخل کشور برای شما درخواست UGE ثبت کند. مسیر Autónomo این امکان را ندارد و باید از کنسولگری اقدام کنید.',
              },
            },
            {
              '@type': 'Question',
              name: 'Estatuto del Artista چه تأثیری بر ویزا دارد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Estatuto del Artista عمدتاً چارچوب حمایت اجتماعی و مالیاتی هنرمندان را تنظیم می‌کند، نه مسیر ویزا. مسیر ویزا را Ley 14/2013 (UGE) یا قانون خوداشتغالی تعیین می‌کند. برخی تسهیلات Estatuto (مانند تعریف حرفه‌ای بودن با ۲۵ روز کار هنری در سال) می‌تواند در ارزیابی پرونده کمک‌کننده باشد.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا خانواده می‌توانند همراه هنرمند باشند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، در هر دو مسیر. در UGE، همسر/شریک ثبت‌شده، فرزندان زیر ۱۸ سال (یا بالغ وابسته) و والدین وابسته می‌توانند همزمان درخواست دهند و حق کار دارند. در Autónomo نیز الحاق خانواده پس از دریافت اقامت اصلی امکان‌پذیر است.',
              },
            },
            {
              '@type': 'Question',
              name: 'مسیر اقامت دائم اسپانیا برای هنرمندان چگونه است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'پس از ۵ سال اقامت قانونی مستمر (تحت هر نوع مجوز معتبر)، می‌توانید برای اقامت دائم (Residencia de Larga Duración) درخواست دهید. هیچ آزمون زبان یا شهروندی برای اقامت دائم لازم نیست. تابعیت اسپانیا پس از ۱۰ سال (برای ایرانیان) امکان‌پذیر است.',
              },
            },
          ],
        },
      ],
    },
  });

  const FAQS = [
    {
      q: 'آیا ویزای هنرمندان اسپانیا ۲۰ روزه صادر می‌شود؟',
      a: 'فقط در مسیر UGE (Ley 14/2013) برای پروژه‌های فرهنگی/صوتی-تصویری. این مسیر نیازمند قرارداد با شرکت اسپانیایی است و می‌توان از داخل اسپانیا درخواست داد. اداره UGE حداکثر ۲۰ روز کاری فرصت دارد و در صورت عدم پاسخ، درخواست به‌صورت خودکار تأیید شده تلقی می‌شود (Silencio Administrativo Positivo). مسیر Autónomo (خوداشتغالی هنری) ۱ تا ۳ ماه طول می‌کشد و فقط از کنسولگری امکان‌پذیر است.',
    },
    {
      q: 'حداقل درآمد برای هنرمند در اسپانیا چقدر است؟',
      a: 'بستگی به مسیر دارد. UGE (پروژه‌ای): عدد ثابتی در قانون ندارد، اما IPREM ۱۵۰٪ (€۹۰۰/ماه) به‌عنوان مرجع امن توصیه می‌شود. Autónomo (خوداشتغالی): IPREM ۴۰۰٪ (€۲,۴۰۰/ماه) یا €۲۸,۸۰۰/سال به‌عنوان مرجع اصلی کنسولگری. IPREM ۲۰۲۶: €۶۰۰/ماه (€۷,۲۰۰/سال).',
    },
    {
      q: 'آیا می‌توان با ویزای توریستی در اسپانیا درخواست اقامت هنری داد؟',
      a: 'فقط در مسیر UGE. اگر با ویزای شینگن قانونی در اسپانیا هستید و قرارداد پروژه فرهنگی دارید، شرکت اسپانیایی می‌تواند از داخل کشور برای شما درخواست UGE ثبت کند. مسیر Autónomo این امکان را ندارد و باید از کنسولگری در کشور محل اقامت اقدام کنید.',
    },
    {
      q: 'Estatuto del Artista چه تأثیری بر ویزا دارد؟',
      a: 'Estatuto del Artista عمدتاً چارچوب حمایت اجتماعی و مالیاتی هنرمندان را تنظیم می‌کند، نه مسیر ویزا. مسیر ویزا را Ley 14/2013 (UGE) یا قانون خوداشتغالی تعیین می‌کند. برخی تسهیلات Estatuto (مانند تعریف حرفه‌ای بودن با ۲۵ روز کار هنری در سال) می‌تواند در ارزیابی پرونده کمک‌کننده باشد، اما جایگزین مسیر قانونی ویزا نمی‌شود.',
    },
    {
      q: 'آیا خانواده می‌توانند همراه هنرمند باشند؟',
      a: 'بله، در هر دو مسیر. در UGE، همسر/شریک ثبت‌شده، فرزندان زیر ۱۸ سال (یا بالغ وابسته) و والدین وابسته می‌توانند همزمان درخواست دهند و حق کار دارند. در Autónomo نیز الحاق خانواده پس از دریافت اقامت اصلی امکان‌پذیر است.',
    },
    {
      q: 'مسیر اقامت دائم اسپانیا برای هنرمندان چگونه است؟',
      a: 'پس از ۵ سال اقامت قانونی مستمر (تحت هر نوع مجوز معتبر)، می‌توانید برای اقامت دائم (Residencia de Larga Duración) درخواست دهید. هیچ آزمون زبان یا شهروندی برای اقامت دائم لازم نیست. تابعیت اسپانیا پس از ۱۰ سال (برای ایرانیان) امکان‌پذیر است.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#061a21] text-white pt-24 pb-16 font-sans" dir="rtl">
      {/* BREADCRUMB */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button type="button" onClick={onBackToHome} className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 transition cursor-pointer">
            <ArrowRight className="h-4 w-4" /> بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span><span>/</span><span>هنرمندان و نخبگان</span><span>/</span>
            <span className="text-amber-300 font-bold">هنرمندان اسپانیا</span>
          </div>
        </div>
      </div>

      {/* HERO — MYTH-BUSTING */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4">
              <Route className="h-4 w-4 text-amber-400" />
              اسپانیا یک ویزای هنری ندارد — دو مسیر کاملاً متفاوت دارد
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              ویزای هنرمندان اسپانیا{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-orange-400">
                (UGE یا Autónomo؟)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              بسیاری فکر می‌کنند اسپانیا یک «ویزای هنری» با پردازش ۲۰ روزه دارد.
              این باور <strong className="text-rose-300">نیمی درست و نیمی خطرناک</strong> است.
              مسیر <strong className="text-emerald-300">UGE (Ley 14/2013)</strong> واقعاً ۲۰ روزه است،
              اما فقط اگر با یک <strong className="text-white">شرکت یا پروژه اسپانیایی قرارداد</strong> داشته باشید.
              اگر به‌عنوان <strong className="text-white">هنرمند مستقل (Autónomo)</strong> می‌آیید،
              هیچ میانبری وجود ندارد: <strong className="text-rose-300">۱ تا ۳ ماه</strong> انتظار در کنسولگری،
              بدون امکان درخواست از داخل اسپانیا.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-emerald-300">۲۰ روز</div>
                <div className="text-[10px] text-slate-300 mt-1">UGE — فقط با قرارداد</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-rose-300">۱–۳ ماه</div>
                <div className="text-[10px] text-slate-300 mt-1">Autónomo — از کنسولگری</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-amber-300">€۹۰۰</div>
                <div className="text-[10px] text-slate-300 mt-1">UGE — IPREM ۱۵۰٪</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-rose-300">€۲,۴۰۰</div>
                <div className="text-[10px] text-slate-300 mt-1">Autónomo — IPREM ۴۰۰٪</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer">
                مسیر مناسب خود را پیدا کنید
              </button>
              <a href="https://wa.me/989197340829" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-400" /> مشاوره با دپارتمان اسپانیا
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1000&q=80" alt="ویزای هنرمندان اسپانیا ۲۰۲۶ - تفاوت UGE و Autónomo" width={1000} height={750} loading="eager" decoding="async" fetchPriority="high" className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-300">
                  <ShieldAlert className="h-4 w-4" /> انتخاب مسیر اشتباه = تأخیر یا رد پرونده
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  UGE برای پروژه‌های فرهنگی با شرکت اسپانیایی | Autónomo برای فعالیت مستقل هنری
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MYTH VS REALITY */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-amber-500/5 border border-amber-400/20 rounded-3xl p-6 md:p-10">
          <div className="flex items-start gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white mb-2">دو افسانه که پرونده شما را به بن‌بست می‌کشاند</h2>
              <p className="text-sm text-slate-300 leading-relaxed">اگر با این دو باور غلط وارد فرآیند شوید، احتمال تأخیر طولانی یا رد پرونده بسیار بالاست.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-400/20">
              <h3 className="text-sm font-black text-rose-300 mb-3 flex items-center gap-2"><Flame className="h-4 w-4" /> افسانه ۱: «هر هنرمندی ۲۰ روزه اقامت می‌گیرد»</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">این فقط برای مسیر <strong className="text-white">UGE</strong> صادق است، آن هم وقتی یک <strong className="text-white">شرکت اسپانیایی</strong> قرارداد پروژه فرهنگی/صوتی-تصویری با شما دارد و درخواست را ثبت می‌کند.</p>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-400/20">
                <p className="text-[11px] text-rose-200 leading-relaxed"><strong>واقعیت:</strong> اگر هنرمند مستقل (Autónomo) هستید، ۲۰ روز ندارید. باید از کنسولگری اقدام کنید و ۱–۳ ماه منتظر بمانید.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-400/20">
              <h3 className="text-sm font-black text-rose-300 mb-3 flex items-center gap-2"><Clock className="h-4 w-4" /> افسانه ۲: «با ویزای توریستی می‌توانم Autónomo بگیرم»</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">بسیاری تصور می‌کنند می‌توانند با ویزای شینگن وارد اسپانیا شوند و از داخل کشور برای اقامت خوداشتغالی هنری درخواست دهند.</p>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-400/20">
                <p className="text-[11px] text-rose-200 leading-relaxed"><strong>واقعیت:</strong> مسیر Autónomo <strong className="text-white">فقط از کنسولگری</strong> در کشور محل اقامت شما امکان‌پذیر است. تبدیل ویزای توریستی به Autónomo در داخل اسپانیا مجاز نیست.</p>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-4 text-center">منابع: Ley 14/2013 (UGE) | Reglamento de Extranjería (Autónomo) | exteriores.gob.es</p>
        </div>
      </section>

      {/* TWO PATHS COMPARISON */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-2">
            <Scale className="h-6 w-6 text-amber-400" /> مقایسه دقیق دو مسیر
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-right text-xs md:text-sm">
              <caption className="sr-only">مقایسه UGE و Autónomo برای هنرمندان اسپانیا</caption>
              <thead>
                <tr className="border-b border-white/15 text-slate-400">
                  <th className="py-3 px-3 font-bold">ویژگی</th>
                  <th className="py-3 px-3 font-bold text-emerald-300">UGE (Ley 14/2013)</th>
                  <th className="py-3 px-3 font-bold text-rose-300">Autónomo (Cuenta Propia)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-200">
                <tr><td className="py-3 px-3 font-bold text-white">نوع فعالیت</td><td className="py-3 px-3 text-emerald-300">پروژه‌ای / قراردادی با شرکت اسپانیایی</td><td className="py-3 px-3 text-rose-300">خوداشتغالی مستقل برای مشتریان خود</td></tr>
                <tr><td className="py-3 px-3 font-bold text-white">محل درخواست</td><td className="py-3 px-3 text-emerald-300">از داخل اسپانیا (حتی با ویزای توریستی) یا کنسولگری</td><td className="py-3 px-3 text-rose-300">فقط کنسولگری در کشور محل اقامت</td></tr>
                <tr><td className="py-3 px-3 font-bold text-white">مدت پردازش</td><td className="py-3 px-3 text-emerald-300">حداکثر ۲۰ روز کاری (Positive Silence)</td><td className="py-3 px-3 text-rose-300">۱ تا ۳ ماه</td></tr>
                <tr><td className="py-3 px-3 font-bold text-white">آستانه مالی</td><td className="py-3 px-3 text-emerald-300">بدون عدد ثابت؛ IPREM ۱۵۰٪ (≈€۹۰۰/ماه) مرجع امن</td><td className="py-3 px-3 text-rose-300">IPREM ۴۰۰٪ (€۲,۴۰۰/ماه یا €۲۸,۸۰۰/سال)</td></tr>
                <tr><td className="py-3 px-3 font-bold text-white">مدارک کلیدی</td><td className="py-3 px-3 text-emerald-300">قرارداد + توصیف پروژه + بیمه</td><td className="py-3 px-3 text-rose-300">بیزینس پلن + تمکن مالی + بیمه</td></tr>
                <tr><td className="py-3 px-3 font-bold text-white">مجوز کار</td><td className="py-3 px-3 text-emerald-300">بله — یکپارچه با اقامت</td><td className="py-3 px-3 text-rose-300">بله — ثبت در RETA</td></tr>
                <tr><td className="py-3 px-3 font-bold text-white">خانواده</td><td className="py-3 px-3 text-emerald-300">همزمان، با حق کار</td><td className="py-3 px-3 text-rose-300">پس از دریافت اقامت اصلی</td></tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/20">
            <p className="text-[11px] text-amber-200 leading-relaxed">
              <strong>نکته حیاتی:</strong> اگر هنرمند تجسمی، نویسنده یا طراح مستقل هستید و برای مشتریان بین‌المللی کار می‌کنید، احتمالاً مسیر شما Autónomo است، نه UGE. اگر بازیگر، نوازنده یا تکنسین با قرارداد پروژه اسپانیایی هستید، UGE مسیر سریع‌تر است.
            </p>
          </div>
        </div>
      </section>

      {/* REAL NUMBERS */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-3"><Wallet className="h-4 w-4" /> اعداد واقعی ۲۰۲۶</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">چقدر پول لازم دارید؟</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 text-justify">IPREM ۲۰۲۶: <strong className="text-amber-300">€۶۰۰/ماه</strong> (€۷,۲۰۰/سال). آستانه‌ها بر این پایه محاسبه می‌شوند.</p>

              <div className="space-y-2.5">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                  <div className="flex items-center justify-between mb-1"><span className="text-xs font-bold text-emerald-300">UGE — IPREM ۱۵۰٪</span><span className="text-sm font-black text-white">€۹۰۰ / ماه</span></div>
                  <p className="text-[10px] text-emerald-200/80">مرجع امن؛ عدد قانونی ثابت نیست</p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-400/20">
                  <div className="flex items-center justify-between mb-1"><span className="text-xs font-bold text-rose-300">Autónomo — IPREM ۴۰۰٪</span><span className="text-sm font-black text-white">€۲,۴۰۰ / ماه</span></div>
                  <p className="text-[10px] text-rose-200/80">یا €۲۸,۸۰۰/سال — مرجع اصلی کنسولگری</p>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"><span className="text-xs text-white">هر عضو خانواده اضافه (Autónomo)</span><span className="text-xs font-black text-amber-300">+ €۶۰۰ / ماه</span></div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"><span className="text-xs text-white">هزینه زندگی ماهانه (مادرید/بارسلونا)</span><span className="text-xs font-black text-white">€۱,۲۰۰ – €۱,۸۰۰</span></div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-400/20">
                <div className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /><p className="text-[11px] text-red-200 leading-relaxed"><strong>نکته:</strong> Autónomo نیازمند بیزینس پلن دقیق و پیش‌بینی درآمد ۲ ساله است. «چند فاکتور» کافی نیست.</p></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="آستانه مالی ویزای هنرمندان اسپانیا ۲۰۲۶ - IPREM ۶۰۰ یورو" width={800} height={533} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">IPREM ۲۰۲۶: €۶۰۰/ماه | UGE: ۱۵۰٪ | Autónomo: ۴۰۰٪</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2"><Receipt className="h-4 w-4 text-amber-400" /><span className="text-xs font-bold text-white">هزینه‌های پنهان</span></div>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" /><span>ترجمه رسمی + Apostille: €۳۰۰–۶۰۰</span></li>
                  <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" /><span>بیزینس پلن (Autónomo): €۵۰۰–۲,۰۰۰</span></li>
                  <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" /><span>ودیعه مسکن: ۲–۳ ماه اجاره</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIRAL STORY */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-br from-orange-950/40 via-slate-900/60 to-[#061a21] border border-orange-400/20 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
              <img src="https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80" alt="داستان واقعی هنرمند ایرانی در اسپانیا - انتخاب مسیر اشتباه ویزا" width={800} height={533} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">تجربه واقعی: انتخاب مسیر اشتباه، ۶ ماه تأخیر</div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-orange-300 mb-3"><Quote className="h-4 w-4" /> داستان واقعی</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">«فکر می‌کردم ۲۰ روزه اقامت می‌گیرم. ۶ ماه بعد هنوز در ایران بودم.»</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">آرش، ۳۴ ساله، طراح گرافیک فریلنسر، با یک آژانس برندینگ در مادرید همکاری می‌کرد. او فکر می‌کرد چون «قرارداد» دارد، می‌تواند از مسیر UGE استفاده کند و ۲۰ روزه اقامت بگیرد.</p>
              <div className="space-y-3 mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[11px] text-slate-300 leading-relaxed"><strong className="text-white">اشتباه اول:</strong> آژانس اسپانیایی حاضر نشد او را به‌عنوان کارمند پروژه استخدام کند. آنها فقط مشتری بودند، نه کارفرما. UGE بدون «کارفرمای اسپانیایی» معنا ندارد.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[11px] text-slate-300 leading-relaxed"><strong className="text-white">اشتباه دوم:</strong> وقتی به سراغ Autónomo رفت، متوجه شد باید بیزینس پلن ۲ ساله و تمکن مالی €۲۸,۸۰۰ ارائه دهد — چیزی که برایش آماده نبود.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
                <p className="text-xs text-emerald-200 leading-relaxed"><strong>نتیجه نهایی:</strong> با کمک وکیل، مسیر Autónomo را انتخاب کرد، بیزینس پلن نوشت و پس از ۴ ماه اقامت گرفت. «اگر از اول می‌دانستم دو مسیر جدا وجود دارد، ۶ ماه از عمرم را از دست نمی‌دادم.»</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESTATUTO DEL ARTISTA */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 mb-3"><Scale className="h-4 w-4" /> Estatuto del Artista</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Estatuto چه می‌کند و چه نمی‌کند</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify"><strong className="text-white">Estatuto del Artista</strong> یک چارچوب حمایتی برای هنرمندان است، نه یک مسیر ویزا. این قانون تعریف «هنرمند حرفه‌ای» (حداقل ۲۵ روز کار هنری remunerated در سال)، حمایت‌های اجتماعی و مالیاتی را تنظیم می‌کند.</p>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><div><span className="text-xs font-bold text-white">چه می‌کند</span><p className="text-[10px] text-slate-300 mt-0.5">تعریف حرفه‌ای بودن، دسترسی به بیمه بیکاری هنرمندان، تسهیلات مالیاتی</p></div></div>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-400/20"><AlertTriangle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" /><div><span className="text-xs font-bold text-white">چه نمی‌کند</span><p className="text-[10px] text-slate-300 mt-0.5">ویزا صادر نمی‌کند، جایگزین Ley 14/2013 یا Autónomo نمی‌شود</p></div></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">* برخی تسهیلات Estatuto (مانند تعریف ۲۵ روزه) می‌تواند در ارزیابی پرونده UGE یا Autónomo کمک‌کننده باشد، اما مسیر قانونی را تغییر نمی‌دهد.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80" alt="Estatuto del Artista اسپانیا ۲۰۲۶ - چارچوب حمایتی نه ویزا" width={800} height={533} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">Estatuto = حمایت اجتماعی | Ley 14/2013 و Autónomo = مسیر ویزا</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><BookOpen className="h-4 w-4" /> پرسش‌های متداول</span>
          <h2 className="text-2xl md:text-3xl font-black text-white">سوالات پرتکرار هنرمندان اسپانیا</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button type="button" onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold text-white hover:text-amber-300 transition cursor-pointer" aria-expanded={openFaq === idx}>
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-amber-400' : ''}`} aria-hidden="true" />
              </button>
              {openFaq === idx && <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-amber-400/5 to-transparent p-6 md:p-10 text-center">
          <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-black text-white mb-2">مسیر خود را قبل از ارسال درخواست مشخص کنید</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">کارشناسان دیاکو وضعیت قراردادها، درآمد و سابقه هنری شما را بررسی می‌کنند و دقیقاً می‌گویند کدام مسیر (UGE یا Autónomo) برای شما مناسب است — قبل از اینکه وقت و هزینه هدر برود.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110 cursor-pointer">ارزیابی رایگان مسیر هنری</button>
            <a href="https://wa.me/989197340829" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold text-white hover:bg-white/10 cursor-pointer inline-flex items-center gap-2"><PhoneCall className="h-4 w-4 text-emerald-400" /> گفتگو با کارشناس اسپانیا</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistSpainPage;