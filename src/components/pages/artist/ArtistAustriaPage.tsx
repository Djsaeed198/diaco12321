import React, { useState } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Copy, Sparkles, Palette,
  ShieldCheck, Landmark, FileCheck2, AlertTriangle, Building2, Scale,
  Euro, Users, Languages, Briefcase, FileText, Banknote, HeartPulse,
  Home, CalendarDays, BookOpen, Menu, X, Star, Quote, MapPin, Globe,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ---------- داده‌های ساختاریافته ---------- */
const incomeRows = [
  { label: 'مجرد (Alleinstehend)', value: '€۱,۳۰۸.۳۹ / ماه', icon: Banknote },
  { label: 'زوج (Ehepaar)', value: '€۲,۰۶۴.۱۲ / ماه', icon: Users },
  { label: 'هر فرزند', value: '+ €۲۰۱.۸۸ / ماه', icon: HeartPulse },
  { label: 'هزینه ثابت قابل کسر (اجاره)', value: 'تا €۳۸۶.۴۳ / ماه', icon: Home },
];

const processSteps = [
  { step: '۱', title: 'آماده‌سازی پورتفولیو و مدارک', detail: 'پاسپورت، عکس، گواهی عدم سوءپیشینه (≤۳ ماه)، بیمه، مسکن، مدارک هنری', time: '۲–۴ ماه' },
  { step: '۲', title: 'اثبات درآمد یا Haftungserklärung', detail: '€۱,۳۰۸.۳۹/ماه خالص یا تعهد ضامن مقیم اتریش', time: '۱–۲ ماه' },
  { step: '۳', title: 'مدرک A1 (یا豁免)', detail: 'گواهی ÖIF/ÖSD/TELC/Goethe — حداکثر ۱ سال اعتبار', time: '۱–۳ ماه' },
  { step: '۴', title: 'ثبت درخواست و پرداخت €۲۱۸', detail: 'سفارت اتریش یا MA35 (در صورت حضور قانونی در اتریش)', time: '۱ روز' },
  { step: '۵', title: 'دریافت تصمیم', detail: 'حداکثر ۹۰ روز طبق §19a NAG (از ۷ اوت ۲۰۲۶)', time: 'تا ۹۰ روز' },
  { step: '۶', title: 'دریافت کارت اقامت', detail: 'حداکثر ۱۲ ماه اعتبار — قابل تمدید', time: '—' },
];

const faqs = [
  {
    q: 'آیا برای اقامت هنرمندی اتریش مدرک زبان آلمانی الزامی است؟',
    a: 'بله، A1 معمولاً الزامی است (گواهی ÖIF/ÖSD/TELC/Goethe، حداکثر ۱ سال اعتبار). دو استثنا: (۱) مدرک دانشگاهی (studienberechtigender Abschluss)؛ (۲) فعالیت در حوزه‌های KFG §2(1) Z 1–3 (ادبیات، هنرهای نمایشی، موسیقی، هنرهای تجسمی، عکاسی، فیلم/ویدیو و فرم‌های تجربی).',
  },
  {
    q: 'حداقل درآمد ماهانه برای اقامت هنرمندی اتریش در ۲۰۲۶ چقدر است؟',
    a: 'طبق استاندارد ASVG ۲۰۲۶: مجرد €۱,۳۰۸.۳۹، زوج €۲,۰۶۴.۱۲ و هر فرزند +€۲۰۱.۸۸. درآمد باید خالص و از فعالیت هنری باشد. Haftungserklärung نیز به‌عنوان جایگزین پذیرفته می‌شود.',
  },
  {
    q: 'تفاوت خوداشتغال (selbständig) و استخدامی (unselbständig) چیست؟',
    a: 'خوداشتغال: نیاز به قرارداد با گالری/تئاتر/سالن کنسرت برای بیش از ۶ ماه. استخدامی: نیاز به Arbeitgebererklärung و قرارداد کاری مشخص. هر دو تحت NAG §43a امکان‌پذیر است.',
  },
  {
    q: 'مدت زمان پردازش و هزینه اقامت هنرمندی چقدر است؟',
    a: 'هزینه €۲۱۸ (از ۱ ژانویه ۲۰۲۶). زمان پردازش طبق §19a NAG حداکثر ۹۰ روز است (از ۷ اوت ۲۰۲۶). کارت اولیه حداکثر ۱۲ ماه اعتبار دارد.',
  },
  {
    q: 'آیا خانواده هنرمند می‌توانند همراه باشند؟',
    a: 'بله، همسر/شریک ثبت‌شده (۲۱ سال+) و فرزندان مجرد زیر ۱۸ سال. هر عضو باید مستقلاً شرایط عمومی (درآمد، مسکن، بیمه، A1) را برآورده کند و پذیرش تابع سهمیه سالانه است.',
  },
  {
    q: 'مسیر اقامت دائم و تابعیت اتریش چگونه است؟',
    a: 'پس از ۵ سال اقامت مستمر + B1 آلمانی (Module 2) → Daueraufenthalt-EU (۵ ساله، حق اقامت نامحدود). تابعیت معمولاً پس از ۶–۱۰ سال و با شرایط اضافی (درآمد، عدم سوءپیشینه، آزمون شهروندی).',
  },
];

const testimonials = [
  {
    name: 'آرمان رضایی',
    role: 'هنرمند تجسمی — وین',
    text: 'با مشاوره دیاکو توانستم قرارداد گالری و Haftungserklärung را هماهنگ کنم و اقامت هنرمندی را در کمتر از ۳ ماه دریافت کنم.',
  },
  {
    name: 'سارا موسوی',
    role: 'موسیقی‌دان — گراتس',
    text: 'تیم دیاکو در豁免 زبان A1 (به‌خاطر مدرک دانشگاهی) و آماده‌سازی پورتفولیو بسیار کمک کرد. فرآیند MA35 بدون مشکل پیش رفت.',
  },
];

export const ArtistAustriaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'اقامت هنرمندی اتریش ۲۰۲۶ | NAG §43a + درآمد €۱,۳۰۸ + زبان A1',
    description:
      'راهنمای کامل اقامت هنرمندان اتریش ۲۰۲۶ طبق NAG §43a: حداقل درآمد €۱,۳۰۸.۳۹/ماه، زبان A1 با豁免 برای دانشگاه‌دیدگان و هنرهای خاص، هزینه €۲۱۸، پردازش تا ۹۰ روز و مسیر ۵ ساله تا Daueraufenthalt-EU. مشاوره دفتر وین دیاکو.',
    canonical: '/guides/artist-austria',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'اقامت هنرمندی اتریش ۲۰۲۶',
      'Niederlassungsbewilligung Künstler',
      'NAG §43a اتریش',
      'حداقل درآمد اقامت هنرمندان €۱۳۰۸',
      'زبان A1 اقامت هنرمندی豁免',
      'هزینه ۲۱۸ یورو اقامت هنرمند',
      'پردازش ۹۰ روز MA35',
      'هنرمند خوداشتغال اتریش قرارداد گالری',
      'اقامت دائم اتریش هنرمندان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/artist-austria#article',
          headline: 'راهنمای جامع اقامت هنرمندان اتریش ۲۰۲۶ (NAG §43a): درآمد €۱,۳۰۸ و شرایط زبان',
          description:
            'بررسی کامل Niederlassungsbewilligung – Künstler طبق NAG §43a: حداقل درآمد €۱,۳۰۸.۳۹/ماه (۲۰۲۶)، زبان A1 با豁免، هزینه €۲۱۸، پردازش تا ۹۰ روز، تفاوت خوداشتغال و استخدامی، و مسیر ۵ ساله تا Daueraufenthalt-EU.',
          image: [
            'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
          ],
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
            { '@type': 'Thing', name: 'Niederlassungsbewilligung Künstler' },
            { '@type': 'Thing', name: 'NAG §43a' },
          ],
        },
        {
          '@type': 'HowTo',
          name: 'مراحل دریافت اقامت هنرمندی اتریش (NAG §43a)',
          totalTime: 'P6M',
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
            { '@type': 'ListItem', position: 2, name: 'هنرمندان و نخبگان', item: 'https://www.dia-co.ir/artists' },
            { '@type': 'ListItem', position: 3, name: 'اتریش', item: 'https://www.dia-co.ir/guides/artist-austria' },
          ],
        },
      ],
    },
  });

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+43 688 976 3256');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#061a21] text-white font-sans" dir="rtl">
      {/* ---------- هدر ---------- */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061a21]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Palette className="h-7 w-7 text-pink-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
              <a href="#legal" className="hover:text-pink-300 transition">قانون</a>
              <a href="#income" className="hover:text-pink-300 transition">درآمد</a>
              <a href="#language" className="hover:text-pink-300 transition">زبان</a>
              <a href="#process" className="hover:text-pink-300 transition">فرآیند</a>
              <a href="#faq" className="hover:text-pink-300 transition">سوالات</a>
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
              <a href="#legal" className="block hover:text-pink-300">قانون</a>
              <a href="#income" className="block hover:text-pink-300">درآمد</a>
              <a href="#language" className="block hover:text-pink-300">زبان</a>
              <a href="#process" className="block hover:text-pink-300">فرآیند</a>
              <a href="#faq" className="block hover:text-pink-300">سوالات</a>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-4 py-1.5 text-xs font-bold text-pink-300 mb-4">
              <Sparkles className="h-4 w-4" />
              NAG §43a — اقامت تخصصی هنرمندان اتریش ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              اقامت هنرمندی اتریش ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-pink-400">
                (Niederlassungsbewilligung – Künstler)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              وین پایتخت هنری اروپا، میزبان نقاشان، موسیقی‌دانان، بازیگران و طراحان بین‌المللی است.
              طبق <strong>NAG §43a</strong>، هنرمندان غیر اتحادیه اروپا می‌توانند با اثبات فعالیت هنری
              حرفه‌ای و درآمد حداقل <strong>€۱,۳۰۸.۳۹ در ماه</strong> (۲۰۲۶)، اقامت رسمی بگیرند.
              زبان A1 معمولاً الزامی است، اما برای دانشگاه‌دیدگان و هنرهای خاص豁免 وجود دارد.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: Banknote, label: '€۱,۳۰۸.۳۹', sub: 'حداقل درآمد ماهانه' },
                { icon: CalendarDays, label: 'تا ۹۰ روز', sub: 'زمان پردازش قانونی' },
                { icon: Euro, label: '€۲۱۸', sub: 'هزینه درخواست' },
                { icon: ShieldCheck, label: '۱۲ ماه', sub: 'اعتبار کارت اولیه' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                  <item.icon className="h-5 w-5 text-pink-400 mx-auto mb-1" />
                  <div className="text-sm font-black text-amber-300">{item.label}</div>
                  <div className="text-[10px] text-slate-300 mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-gradient-to-l from-[#fed871] to-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition"
              >
                ارزیابی آنلاین پرونده هنری
              </button>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                دفتر وین: +۴۳۶۸۸۹۷۶۳۲۵۶
                {copiedPhone && <span className="text-emerald-400 text-[10px] font-bold">کپی شد!</span>}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80"
                alt="اقامت هنرمندی اتریش NAG §43a — وین پایتخت هنر اروپا"
                width={1000}
                height={750}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <MapPin className="h-4 w-4" />
                  وین، اتریش — MA35
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  تنظیم قرارداد هنری، Haftungserklärung و حضور وکیل در فرآیند
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- چارچوب قانونی ---------- */}
      <section id="legal" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-pink-300 mb-3">
            <Scale className="h-4 w-4" /> چارچوب قانونی
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-4">NAG §43a — دو مسیر مجزا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/20">
              <h3 className="text-sm font-black text-amber-300 mb-2 flex items-center gap-2">
                <Palette className="h-4 w-4" /> خوداشتغال (Selbständig)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>فعالیت عمدتاً مبتنی بر آفرینش هنری باشد.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>قرارداد با گالری/تئاتر/سالن کنسرت برای <strong>بیش از ۶ ماه</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>درآمد از قراردادهای هنری قابل اثبات است.</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-400/20">
              <h3 className="text-sm font-black text-sky-300 mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" /> استخدامی (Unselbständig)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
                  <span>قرارداد کاری با کارفرمای اتریشی.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
                  <span><strong>Arbeitgebererklärung</strong> (اظهارنامه کارفرما).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 mt-0.5 shrink-0" />
                  <span>تأیید AMS در فرآیند جداگانه.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-400/20">
            <p className="text-[11px] text-red-200">
              <strong>تصحیح مهم:</strong> مرجع قانونی هنرمندان <strong>§43a</strong> است، نه §61 (§61 به پژوهشگران مربوط است).
            </p>
          </div>
        </div>
      </section>

      {/* ---------- درآمد ---------- */}
      <section id="income" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
            <Banknote className="h-6 w-6 text-emerald-400" /> حداقل درآمد ۲۰۲۶
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {incomeRows.map((row, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2">
                  <row.icon className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-white">{row.label}</span>
                </div>
                <span className="text-xs font-black text-amber-300">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
            <p className="text-[11px] text-emerald-200">
              <strong>Haftungserklärung:</strong> در صورت عدم تأمین کامل، تعهد ضامن مقیم اتریش پذیرفته می‌شود.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- زبان ---------- */}
      <section id="language" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-br from-sky-950/40 via-slate-900/60 to-[#061a21] border border-sky-400/20 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
            <Languages className="h-6 w-6 text-sky-300" /> زبان A1 — با豁免
          </h2>
          <p className="text-sm text-slate-300 mb-4 text-justify">
            A1 از ÖIF/ÖSD/TELC/Goethe (حداکثر ۱ سال اعتبار) معمولاً الزامی است. دو استثنا:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
              <strong className="text-xs text-white">۱. مدرک دانشگاهی</strong>
              <p className="text-[11px] text-slate-300 mt-1">studienberechtigender Abschluss</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
              <strong className="text-xs text-white">۲. هنرهای خاص (KFG §2(1) Z 1–3)</strong>
              <p className="text-[11px] text-slate-300 mt-1">ادبیات، نمایش، موسیقی، تجسمی، عکاسی، فیلم/ویدیو، فرم‌های تجربی</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- فرآیند ---------- */}
      <section id="process" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-amber-400" /> فرآیند درخواست
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
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.detail}</p>
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
              <Quote className="h-8 w-8 text-pink-400/50 mb-3" />
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
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-pink-300 transition"
                aria-expanded={openFaq === idx}
              >
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-pink-400' : ''}`} />
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
            وکلای مقیم اتریش، پورتفولیو و شرایط شما را بررسی کرده و دقیق‌ترین مسیر حقوقی را طراحی می‌کنند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110"
            >
              ارزیابی شانس اقامت هنری
            </button>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold hover:bg-white/10 inline-flex items-center gap-2"
            >
              <Copy className="h-4 w-4 text-amber-400" />
              {copiedPhone ? 'شماره کپی شد!' : 'دفتر وین: +43 688 976 3256'}
            </button>
          </div>
        </div>
      </section>

      {/* ---------- فوتر ---------- */}
      <footer className="border-t border-white/10 bg-[#041418]">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette className="h-6 w-6 text-pink-400" />
                <span className="font-black">دیاکو</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                هلدینگ مهاجرتی دیاکو — خدمات تخصصی اقامت هنرمندان در اتریش و اروپا.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#legal" className="hover:text-pink-300">قانون</a></li>
                <li><a href="#income" className="hover:text-pink-300">درآمد</a></li>
                <li><a href="#language" className="hover:text-pink-300">زبان</a></li>
                <li><a href="#process" className="hover:text-pink-300">فرآیند</a></li>
                <li><a href="#faq" className="hover:text-pink-300">سوالات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">تماس با ما</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>دفتر وین: +۴۳ ۶۸۸ ۹۷۶ ۳۲۵۶</li>
                <li>واتساپ: ۰۹۱۹۷۳۴۰۸۲۹</li>
                <li>ایمیل: info@dia-co.ir</li>
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

export default ArtistAustriaPage;