import React, { useState } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Palette, Building2, AlertTriangle,
  FileCheck2, Briefcase, Banknote, CalendarDays, BookOpen, ShieldCheck,
  Sparkles, Menu, X, Star, Quote, MapPin, Clock, Euro, Users, FileText,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ---------- داده‌های ساختاریافته ---------- */
const incomePlus = [
  { label: 'اولین درخواست — ۵ سال', value: '€۱۳,۵۴۶' },
  { label: 'اولین درخواست — ۲ سال', value: '€۵,۴۱۸' },
  { label: 'درخواست بعدی — ۵ سال', value: '€۴,۵۱۵' },
  { label: 'درخواست بعدی — ۳ سال', value: '€۲,۷۰۹' },
];

const processSteps = [
  { step: '۱', title: 'آماده‌سازی مدارک هنری و درآمدی', detail: 'پورتفولیو، قراردادها، فاکتورها، اظهارنامه مالیاتی ۲–۵ سال', time: '۲–۴ ماه' },
  { step: '۲', title: 'ثبت Kunstwerkattest در Working in the Arts', detail: 'انتخاب Plus / Ordinary / Starter بر اساس سابقه', time: '۱ روز' },
  { step: '۳', title: 'بررسی کمیسیون', detail: 'هدف: ۳ ماه از تکمیل پرونده — واقعی: ۴–۵ ماه (۲۰۲۶)', time: '۳–۵ ماه' },
  { step: '۴', title: 'دریافت Kunstwerkattest (اعتبار ۵ سال)', detail: 'مبنای حقوق اجتماعی و مالیاتی', time: '—' },
  { step: '۵', title: 'درخواست Professional Card', detail: 'از منطقه مربوطه + طرح مالی + ارزش افزوده هنری', time: '۴ ماه (بروکسل) / ۱۲۰ روز (فلاندرز)' },
  { step: '۶', title: 'ویزای D و ورود به بلژیک', detail: 'ثبت در شهرداری و دریافت کارت اقامت', time: '۱–۲ ماه' },
];

const faqs = [
  {
    q: 'آیا Kunstwerkattest به تنهایی اجازه اقامت در بلژیک را می‌دهد؟',
    a: 'خیر. Kunstwerkattest فقط تأیید می‌کند که فعالیت شما از نظر کمیسیون هنر «حرفه‌ای» است و برای حقوق اجتماعی و مالیاتی کاربرد دارد. برای اقامت قانونی به‌عنوان غیر اروپایی، باید Professional Card (کارت حرفه‌ای) یا ویزای هنرمند نیز دریافت کنید.',
  },
  {
    q: 'حداقل درآمد لازم برای Kunstwerkattest چقدر است؟',
    a: 'برای نوع Plus (اولین درخواست): €۱۳,۵۴۶ در ۵ سال قبل یا €۵,۴۱۸ در ۲ سال قبل. برای درخواست‌های بعدی: €۴,۵۱۵ در ۵ سال یا €۲,۷۰۹ در ۳ سال. نوع Ordinary حداقل €۱,۰۰۰ در ۲ سال می‌خواهد. کمیسیون درآمد ناخالص (Bruto) را بررسی می‌کند.',
  },
  {
    q: 'حداقل حقوق برای هنرمندان نمایشی در ۲۰۲۶ چقدر است؟',
    a: 'در منطقه بروکسل از ۱ ژانویه ۲۰۲۶: €۳,۰۸۶.۲۰ در ماه (ناخالص). این مبلغ برای اخذ Single Permit توسط کارفرما باید تضمین شود. فلاندرز و والونیا آستانه‌های متفاوتی دارند.',
  },
  {
    q: 'مدت زمان پردازش Kunstwerkattest چقدر است؟',
    a: 'هدف کمیسیون ۳ ماه از زمان کامل شدن پرونده است، اما پردازش واقعی در سال ۲۰۲۶ حدود ۴ تا ۵ ماه گزارش شده است. جولای و آگوست ممکن است بر زمان‌بندی تأثیر بگذارد.',
  },
  {
    q: 'آیا خانواده هنرمند می‌توانند به بلژیک بیایند؟',
    a: 'بله، پس از دریافت Professional Card، همسر/شریک ثبت‌شده و فرزندان زیر ۱۸ سال می‌توانند برای الحاق خانواده درخواست دهند. از آگوست ۲۰۲۵ قوانین سخت‌گیرانه‌تر شده و اثبات درآمد پایدار و مسکن مناسب الزامی است.',
  },
  {
    q: 'مسیر اقامت دائم بلژیک برای هنرمندان چگونه است؟',
    a: 'پس از ۵ سال اقامت قانونی مستمر با Professional Card، می‌توانید برای اقامت دائم (Verblijf van onbeperkte duur) درخواست دهید. برای تابعیت بلژیک معمولاً ۵ سال اقامت و مهارت زبانی لازم است.',
  },
];

const testimonials = [
  {
    name: 'لیلا احمدی',
    role: 'هنرمند تجسمی — بروکسل',
    text: 'دیاکو کمک کرد درآمدهای گذشته‌ام را دقیق مستند کنم و نوع Plus را دریافت کنم. سپس Professional Card را در ۴ ماه گرفتم.',
  },
  {
    name: 'کامران رستمی',
    role: 'موسیقی‌دان — آنتورپ',
    text: 'مسیر Single Permit با حقوق €۳,۰۸۶ واقعاً کارساز بود. تیم دیاکو هماهنگی با کارفرما را عالی انجام داد.',
  },
];

export const ArtistBelgiumPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'کارت هنرمندی بلژیک ۲۰۲۶ | Kunstwerkattest + Professional Card + درآمد €۱۳,۵۴۶',
    description:
      'راهنمای کامل هنرمندان بلژیک ۲۰۲۶: تفاوت Kunstwerkattest و Professional Card، درآمد €۱۳,۵۴۶ در ۵ سال یا €۵,۴۱۸ در ۲ سال، حقوق €۳,۰۸۶ برای هنرمندان نمایشی، پردازش ۴–۵ ماه و مسیر ۵ ساله تا اقامت دائم. مشاوره دیاکو.',
    canonical: '/artist-belgium',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'کارت هنرمندی بلژیک ۲۰۲۶',
      'Kunstwerkattest بلژیک',
      'Attestation du travail des arts',
      'Professional Card Belgium artist',
      'حداقل درآمد هنرمندان بلژیک ۱۳۵۴۶ یورو',
      'حقوق هنرمندان نمایشی بلژیک ۳۰۸۶ یورو',
      'Working in the Arts Belgium',
      'اقامت هنرمندان بلژیک',
      'ویزای هنری بروکسل',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/artist-belgium#article',
          headline: 'راهنمای جامع هنرمندان بلژیک ۲۰۲۶: Kunstwerkattest، Professional Card و درآمد €۱۳,۵۴۶',
          description:
            'بررسی دو لایه مجوز هنرمندان بلژیک: Kunstwerkattest (تأیید حرفه‌ای بودن) و Professional Card (مجوز اقامت/کار). شرایط درآمد ۵ ساله €۱۳,۵۴۶ یا ۲ ساله €۵,۴۱۸، حقوق €۳,۰۸۶ برای هنرمندان نمایشی، پردازش ۴–۵ ماه و مسیر ۵ ساله تا اقامت دائم.',
          image: ['https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&w=1200&q=80'],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' },
          },
          datePublished: '2026-01-01',
          dateModified: '2026-10-29',
          inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Kunstwerkattest' },
            { '@type': 'Thing', name: 'Professional Card Belgium' },
            { '@type': 'Thing', name: 'Working in the Arts' },
          ],
        },
        {
          '@type': 'HowTo',
          name: 'مراحل دریافت Kunstwerkattest و Professional Card بلژیک',
          totalTime: 'P8M',
          estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: '218' },
          step: processSteps.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.title,
            text: s.detail,
          })),
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://www.dia-co.ir/' },
            { '@type': 'ListItem', position: 2, name: 'خدمات مهاجرتی و هنرمندان', item: 'https://www.dia-co.ir/services' },
            { '@type': 'ListItem', position: 3, name: 'بلژیک', item: 'https://www.dia-co.ir/artist-belgium' },
          ],
        },
      ],
    },
  });

  return (
    <div className="min-h-screen bg-[#061a21] text-white font-sans" dir="rtl">
      {/* ---------- هدر ---------- */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061a21]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Palette className="h-7 w-7 text-rose-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
              <a href="#two-layers" className="hover:text-rose-300 transition">دو لایه</a>
              <a href="#income" className="hover:text-rose-300 transition">درآمد</a>
              <a href="#salary" className="hover:text-rose-300 transition">حقوق نمایشی</a>
              <a href="#process" className="hover:text-rose-300 transition">فرآیند</a>
              <a href="#faq" className="hover:text-rose-300 transition">سوالات</a>
            </nav>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="hidden sm:inline-flex rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition"
              >
                ارزیابی رایگان
              </button>
              <button type="button" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="منو">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 space-y-3 text-sm font-bold">
              <a href="#two-layers" className="block hover:text-rose-300">دو لایه</a>
              <a href="#income" className="block hover:text-rose-300">درآمد</a>
              <a href="#salary" className="block hover:text-rose-300">حقوق نمایشی</a>
              <a href="#process" className="block hover:text-rose-300">فرآیند</a>
              <a href="#faq" className="block hover:text-rose-300">سوالات</a>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-1.5 text-xs font-bold text-rose-300 mb-4">
              <Sparkles className="h-4 w-4" />
              Working in the Arts — سیستم دو لایه ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              هنرمندان بلژیک ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-rose-400">
                (Kunstwerkattest + Professional Card)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              بلژیک با سیستم <strong>دو لایه</strong> یکی از ساختارمندترین مسیرهای اقامت هنری را ارائه می‌دهد:
              ابتدا <strong>Kunstwerkattest</strong> (تأیید حرفه‌ای بودن) و سپس <strong>Professional Card</strong>
              (مجوز اقامت). برای نوع Plus، درآمد <strong>€۱۳,۵۴۶ در ۵ سال</strong> یا{' '}
              <strong>€۵,۴۱۸ در ۲ سال</strong> الزامی است. هنرمندان نمایشی با قرارداد کار نیز باید حداقل
              <strong>€۳,۰۸۶.۲۰ در ماه</strong> (بروکسل، ۲۰۲۶) دریافت کنند.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: Banknote, label: '€۱۳,۵۴۶', sub: 'Plus — ۵ سال' },
                { icon: Euro, label: '€۵,۴۱۸', sub: 'Plus — ۲ سال' },
                { icon: Clock, label: '۴–۵ ماه', sub: 'پردازش واقعی' },
                { icon: Briefcase, label: '€۳,۰۸۶.۲۰', sub: 'حقوق نمایشی' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                  <item.icon className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                  <div className="text-sm font-black text-amber-300">{item.label}</div>
                  <div className="text-[10px] text-slate-300 mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition"
              >
                ارزیابی سوابق هنری برای بلژیک
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره با کارشناسان بلژیک
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559113202-c916b8e44373?auto=format&fit=crop&w=1000&q=80"
                alt="هنرمندان بلژیک Kunstwerkattest و Professional Card — بروکسل"
                width={1000}
                height={750}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                  <MapPin className="h-4 w-4" />
                  بروکسل — کمیسیون هنر (Working in the Arts)
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  ارزیابی درآمد گذشته، تأیید حرفه‌ای بودن و سپس Professional Card
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- هشدار دو لایه ---------- */}
      <section id="two-layers" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-amber-500/5 border border-amber-400/20 rounded-3xl p-6 md:p-10">
          <div className="flex items-start gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl md:text-2xl font-black mb-2">
                Kunstwerkattest ≠ Professional Card
              </h2>
              <p className="text-sm text-slate-300">
                این دو را اشتباه نگیرید. Kunstwerkattest به‌تنهایی اجازه اقامت نمی‌دهد.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-400/20">
              <h3 className="text-sm font-black text-rose-300 mb-2 flex items-center gap-2">
                <FileCheck2 className="h-4 w-4" /> Kunstwerkattest
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• صادرشده توسط کمیسیون هنر</li>
                <li>• تأیید «حرفه‌ای بودن» فعالیت</li>
                <li>• مبنای حقوق اجتماعی و مالیاتی</li>
                <li>• <strong>به‌تنهایی</strong> اقامت نمی‌دهد</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-400/20">
              <h3 className="text-sm font-black text-sky-300 mb-2 flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> Professional Card
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• صادرشده توسط منطقه (بروکسل/فلاندرز/والونیا)</li>
                <li>• <strong>مجوز اقامت و کار</strong> برای غیر اروپایی</li>
                <li>• نیاز به طرح مالی و ارزش افزوده هنری</li>
                <li>• مبنای ویزای D و اقامت بلندمدت</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- درآمد ---------- */}
      <section id="income" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
            <Banknote className="h-6 w-6 text-amber-400" /> آستانه درآمد Kunstwerkattest (Plus)
          </h2>
          <p className="text-sm text-slate-300 mb-4">
            کمیسیون <strong>درآمد ناخالص گذشته</strong> را بررسی می‌کند، نه درآمد آینده.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {incomePlus.map((row, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-200">{row.label}</span>
                <span className="text-xs font-black text-amber-300">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-400/20">
            <p className="text-[11px] text-red-200">
              <strong>حداقل مطلق:</strong> برای نوع عادی، حداقل €۱,۰۰۰ درآمد هنری در ۲ سال قبل لازم است. کمتر از این = رد پرونده.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- حقوق نمایشی ---------- */}
      <section id="salary" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-br from-sky-950/40 via-slate-900/60 to-[#061a21] border border-sky-400/20 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-sky-300" /> حقوق هنرمندان نمایشی (۲۰۲۶)
          </h2>
          <p className="text-sm text-slate-300 mb-4">
            اگر با قرارداد کار (Single Permit) وارد می‌شوید، کارفرما باید حداقل حقوق قانونی را تضمین کند.
          </p>
          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-center">
            <div className="text-xs text-sky-300 mb-1">بروکسل — از ۱ ژانویه ۲۰۲۶</div>
            <div className="text-3xl font-black text-white">€۳,۰۸۶.۲۰ / ماه</div>
            <div className="text-[10px] text-slate-400 mt-1">ناخالص — ۶۵٪ میانگین حقوق منطقه</div>
          </div>
        </div>
      </section>

      {/* ---------- فرآیند ---------- */}
      <section id="process" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-amber-400" /> فرآیند دو مرحله‌ای
          </h2>
          <div className="space-y-3">
            {processSteps.map((item) => (
              <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-400 text-[#082833] grid place-items-center text-xs font-black">
                  {item.step}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.title}</span>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- نظرات ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">تجربه هنرمندان دیاکو</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <Quote className="h-8 w-8 text-rose-400/50 mb-3" />
              <p className="text-sm text-slate-200 leading-relaxed mb-4">«{t.text}»</p>
              <footer className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-black text-emerald-300">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-slate-400">{t.role}</div>
                </div>
                <div className="mr-auto flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">پرسش‌های متداول</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-rose-300 transition"
                aria-expanded={openFaq === idx}
              >
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-rose-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA نهایی ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-l from-amber-500/10 via-amber-400/5 to-transparent p-6 md:p-10 text-center">
          <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-black mb-2">پرونده هنری خود را ارزیابی کنید</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            کارشناسان دیاکو درآمد گذشته شما را تحلیل می‌کنند، نوع Kunstwerkattest مناسب را تعیین می‌کنند و مسیر Professional Card را طراحی می‌کنند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110"
            >
              ارزیابی شانس هنرمندی بلژیک
            </button>
            <a
              href="https://wa.me/989197340829"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold hover:bg-white/10 inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              گفتگو با کارشناس
            </a>
          </div>
        </div>
      </section>

      {/* ---------- فوتر ---------- */}
      <footer className="border-t border-white/10 bg-[#041418]">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette className="h-6 w-6 text-rose-400" />
                <span className="font-black">دیاکو</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                هلدینگ مهاجرتی دیاکو — خدمات تخصصی اقامت هنرمندان در بلژیک و اروپا.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#two-layers" className="hover:text-rose-300">دو لایه</a></li>
                <li><a href="#income" className="hover:text-rose-300">درآمد</a></li>
                <li><a href="#salary" className="hover:text-rose-300">حقوق نمایشی</a></li>
                <li><a href="#process" className="hover:text-rose-300">فرآیند</a></li>
                <li><a href="#faq" className="hover:text-rose-300">سوالات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">تماس با ما</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>واتساپ: ۰۹۱۹۷۳۴۰۸۲۹</li>
                <li>ایمیل: info@dia-co.ir</li>
                <li>وب‌سایت: www.dia-co.ir</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">اعتماد شما</h4>
              <div className="flex items-center gap-2 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                <span>مشاوره تخصصی و شفاف</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">© ۲۰۲۶ دیاکو. تمامی حقوق محفوظ است.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArtistBelgiumPage;