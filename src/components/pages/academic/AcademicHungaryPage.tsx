import React, { useState } from 'react';
import {
  CheckCircle2, Clock, ArrowRight, ArrowLeft, ChevronDown, PhoneCall,
  Sparkles, GraduationCap, ShieldCheck, Building2, Scale, Award, Euro,
  FileCheck2, MapPin, Users, BookOpen, Globe, Menu, X, Star, Quote,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ---------- داده‌های ساختاریافته ---------- */
const universities = [
  {
    name: 'Semmelweis University',
    city: 'بوداپست',
    programs: 'پزشکی (MD)، دندانپزشکی (DMD)، داروسازی',
    tuition: '۱۰,۴۵۰ دلار / ترم',
    exam: 'کتبی (زیست، شیمی، انگلیسی) + مصاحبه',
    deadline: '۳۱ مه ۲۰۲۶',
    ranking: 'QS Medicine 2026: ۲۰۱–۲۵۰',
    image: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه سملوایز بوداپست، نمای ساختمان اصلی',
  },
  {
    name: 'University of Debrecen',
    city: 'دبرسن',
    programs: 'پزشکی (MD)، دندانپزشکی (DMD)، داروسازی',
    tuition: '۱۶,۹۰۰ دلار / سال',
    exam: 'زیست + شیمی/فیزیک (کتبی و شفاهی)',
    deadline: 'پذیرش غلتکی',
    ranking: 'برترین دانشگاه جامع مجارستان',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه دبرسن، محوطه دانشگاه',
  },
  {
    name: 'University of Szeged',
    city: 'سگد',
    programs: 'پزشکی (MD)، دندانپزشکی',
    tuition: '۷,۹۰۰ یورو / ترم',
    exam: 'زیست، شیمی/فیزیک + انگلیسی',
    deadline: '۱۵ ژوئن ۲۰۲۶',
    ranking: 'QS Medicine: ۴۰۱–۴۵۰',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه سگد، ساختمان دانشکده پزشکی',
  },
  {
    name: 'University of Pécs',
    city: 'پچ',
    programs: 'پزشکی عمومی، دندانپزشکی',
    tuition: '۱۶,۷۵۰ دلار / سال',
    exam: 'کتبی + شفاهی (زیست و شیمی)',
    deadline: 'پذیرش غلتکی',
    ranking: 'قدیمی‌ترین دانشگاه مجارستان (۱۳۶۷)',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه پچ، نمای تاریخی',
  },
  {
    name: 'BME Budapest',
    city: 'بوداپست',
    programs: 'مهندسی مکانیک، برق، عمران، شیمی',
    tuition: '۶,۴۰۰–۷,۰۰۰ یورو / سال',
    exam: 'برخی رشته‌ها آزمون ریاضی',
    deadline: 'معمولاً تا ژوئن',
    ranking: 'برترین دانشگاه فنی مجارستان',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    alt: 'دانشگاه BME بوداپست، ساختمان مهندسی',
  },
];

const faqs = [
  {
    q: 'آیا برای ورود به پزشکی سملوایز شرکت در دوره کالج پیش‌پزشکی الزامی است؟',
    a: 'خیر الزامی نیست، اما با توجه به رقابتی بودن آزمون کتبی و شفاهی زیست و شیمی، گذراندن دوره ۱ ساله کالج پیش‌پزشکی شانس قبولی متقاضیان را به بیش از ۹۰ درصد می‌رساند. سملوایز اعلام کرده ۹۰٪ دانشجویان دوره آمادگی خود به برنامه مورد نظر راه یافته‌اند.',
  },
  {
    q: 'شهریه سالانه رشته‌های پزشکی و دندانپزشکی در مجارستان چقدر است؟',
    a: 'شهریه سالانه پزشکی در سملوایز حدود ۲۰,۹۰۰ دلار، در دبرسن ۱۶,۹۰۰ دلار، در سگد حدود ۱۵,۸۰۰ یورو و در پچ ۱۶,۷۵۰ دلار است. دندانپزشکی دبرسن ۱۷,۵۰۰ دلار در سال است. پرداخت معمولاً به‌صورت دو ترم انجام می‌شود.',
  },
  {
    q: 'مهلت درخواست برای سال تحصیلی ۲۰۲۶/۲۷ چه زمانی است؟',
    a: 'سملوایز: ۱۲ ژانویه تا ۳۱ مه ۲۰۲۶. سگد: تا ۱۵ ژوئن ۲۰۲۶ (پذیرش غلتکی). بورسیه Stipendium Hungaricum: تا ۱۵ ژانویه ۲۰۲۶. دبرسن و پچ معمولاً پذیرش غلتکی دارند و توصیه می‌شود هرچه زودتر اقدام کنید.',
  },
  {
    q: 'آیا مدرک پزشکی مجارستان در ایران و آمریکا معتبر است؟',
    a: 'بله. دانشگاه‌های مجارستان مورد تأیید وزارت بهداشت ایران هستند. مدارک این دانشگاه‌ها در کل اتحادیه اروپا، نروژ و سوئیس به رسمیت شناخته می‌شود و فارغ‌التحصیلان می‌توانند در آزمون‌های USMLE آمریکا و MCC کانادا شرکت کنند.',
  },
  {
    q: 'هزینه زندگی دانشجویی در بوداپست چقدر است؟',
    a: 'هزینه ماهانه در بوداپست بین ۷۰۰ تا ۱,۰۰۰ یورو است (شامل اجاره، غذا، حمل‌ونقل و بیمه). شهرهای دبرسن و پچ حدود ۱۰–۱۵٪ ارزان‌تر هستند. خوابگاه دانشگاهی گزینه اقتصادی‌تری است.',
  },
];

const testimonials = [
  {
    name: 'سارا محمدی',
    university: 'دانشجوی پزشکی سملوایز',
    text: 'با مشاوره دیاکو توانستم در آزمون ورودی سملوایز قبول شوم. دوره Pre-Med واقعاً شانس من را بالا برد.',
  },
  {
    name: 'امیر رضایی',
    university: 'دانشجوی مهندسی BME',
    text: 'پذیرش BME با کمک تیم دیاکو خیلی سریع انجام شد. هزینه‌ها هم نسبت به اروپای غربی مقرون‌به‌صرفه است.',
  },
];

export const AcademicHungaryPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'تحصیل در مجارستان ۲۰۲۶ | پزشکی سملوایز، دبرسن، سگد و مهندسی BME',
    description:
      'راهنمای کامل تحصیل در مجارستان ۲۰۲۶: شهریه پزشکی سملوایز و دبرسن، آزمون ورودی زیست و شیمی، بورسیه Stipendium Hungaricum، هزینه زندگی و ویزای دانشجویی. مشاوره تخصصی دیاکو.',
    canonical: '/guides/academic-hungary',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تحصیل در مجارستان ۲۰۲۶',
      'پزشکی سملوایز',
      'دانشگاه دبرسن',
      'دانشگاه سگد',
      'دانشگاه پچ',
      'مهندسی BME بوداپست',
      'بورسیه Stipendium Hungaricum',
      'شهریه پزشکی مجارستان',
      'آزمون ورودی پزشکی مجارستان',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/academic-hungary#article',
          headline: 'راهنمای جامع تحصیل پزشکی، دندانپزشکی و مهندسی در مجارستان ۲۰۲۶',
          description:
            'بررسی شهریه، آزمون ورودی، بورسیه و شرایط پذیرش دانشگاه‌های سملوایز، دبرسن، سگد، پچ و BME بوداپست.',
          image: [
            'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80',
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
            { '@type': 'ListItem', position: 2, name: 'تحصیل در دانشگاه', item: 'https://www.dia-co.ir/academic' },
            { '@type': 'ListItem', position: 3, name: 'مجارستان', item: 'https://www.dia-co.ir/guides/academic-hungary' },
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
              <GraduationCap className="h-7 w-7 text-amber-400" />
              <span className="font-black text-lg text-white">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
              <a href="#universities" className="hover:text-amber-300 transition">دانشگاه‌ها</a>
              <a href="#tuition" className="hover:text-amber-300 transition">شهریه</a>
              <a href="#exam" className="hover:text-amber-300 transition">آزمون ورودی</a>
              <a href="#faq" className="hover:text-amber-300 transition">سوالات متداول</a>
            </nav>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="hidden sm:inline-flex rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition"
              >
                ارزیابی رایگان
              </button>
              <button
                type="button"
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="منو"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 space-y-3 text-sm font-bold">
              <a href="#universities" className="block hover:text-amber-300">دانشگاه‌ها</a>
              <a href="#tuition" className="block hover:text-amber-300">شهریه</a>
              <a href="#exam" className="block hover:text-amber-300">آزمون ورودی</a>
              <a href="#faq" className="block hover:text-amber-300">سوالات متداول</a>
              <button
                type="button"
                onClick={onOpenAssessment}
                className="w-full rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833]"
              >
                ارزیابی رایگان
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Hero (Above the Fold) ---------- */}
      <section className="container mx-auto px-4 md:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300 mb-4">
              <Sparkles className="h-4 w-4" />
              به‌روزرسانی ۲۰۲۶ — پذیرش پزشکی، دندانپزشکی و مهندسی
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              تحصیل در مجارستان ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-emerald-400">
                (پزشکی سملوایز و مهندسی BME)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              مجارستان با دانشگاه‌های معتبر مانند سملوایز بوداپست (رتبه ۲۰۱–۲۵۰ پزشکی QS 2026)، دبرسن، سگد و پچ،
              مقصدی ایده‌آل برای تحصیل پزشکی و دندانپزشکی به زبان انگلیسی است. مدارک مورد تأیید وزارت بهداشت ایران،
              اتحادیه اروپا و بوردهای آمریکا و کانادا. شهریه مقرون‌به‌صرفه، بورسیه Stipendium Hungaricum و امکان
              کار پس از تحصیل.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {[
                { icon: Globe, label: '۱۰۰٪ انگلیسی', sub: 'پزشکی و دندانپزشکی' },
                { icon: ShieldCheck, label: 'تأیید وزارت بهداشت', sub: 'ایران و اتحادیه اروپا' },
                { icon: Users, label: '۱,۲۰۰+ پذیرش', sub: 'بین‌المللی در سال ۲۰۲۴' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                  <item.icon className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                  <div className="text-sm font-black text-amber-300">{item.label}</div>
                  <div className="text-[11px] text-slate-300 mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition"
              >
                ارزیابی شانس قبولی پزشکی سملوایز
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره مستقیم با کارشناسان
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1000&q=80"
                alt="دانشگاه سملوایز بوداپست، نمای اصلی ساختمان در کنار رود دانوب"
                className="w-full h-80 sm:h-96 object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <MapPin className="h-4 w-4" />
                  بوداپست، مجارستان
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  آزمون‌های ورودی به‌صورت آنلاین و حضوری در بوداپست برگزار می‌شود.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- دانشگاه‌ها ---------- */}
      <section id="universities" className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-2">
          دانشگاه‌های برتر مجارستان در ۲۰۲۶
        </h2>
        <p className="text-sm text-slate-400 text-center mb-10">
          مقایسه رشته‌ها، شهریه و مهلت درخواست
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni, idx) => (
            <article
              key={idx}
              className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-amber-400/30 transition group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={uni.image}
                  alt={uni.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-amber-300 backdrop-blur-sm">
                  {uni.city}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-black text-lg text-white mb-2">{uni.name}</h3>
                <p className="text-xs text-slate-300 mb-3">{uni.programs}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Euro className="h-4 w-4 text-emerald-400" />
                    <span className="font-bold">{uni.tuition}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <BookOpen className="h-4 w-4 text-blue-400" />
                    <span>{uni.exam}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span>مهلت: {uni.deadline}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-emerald-300 font-bold">
                  {uni.ranking}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- جدول شهریه ---------- */}
      <section id="tuition" className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-8">
          مقایسه شهریه ۲۰۲۶ (پزشکی و مهندسی)
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-xs md:text-sm text-right">
            <thead className="bg-white/5 text-amber-300 font-bold">
              <tr>
                <th className="p-4">دانشگاه</th>
                <th className="p-4">رشته</th>
                <th className="p-4">شهریه سالانه</th>
                <th className="p-4">نحوه پرداخت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['سملوایز بوداپست', 'پزشکی / دندانپزشکی', '۲۰,۹۰۰ دلار', 'دو ترم (۱۰,۴۵۰ دلار)'],
                ['دبرسن', 'پزشکی', '۱۶,۹۰۰ دلار', 'سالانه'],
                ['دبرسن', 'دندانپزشکی', '۱۷,۵۰۰ دلار', 'سالانه'],
                ['سگد', 'پزشکی', '~۱۵,۸۰۰ یورو', 'دو ترم (۷,۹۰۰ یورو)'],
                ['پچ', 'پزشکی', '۱۶,۷۵۰ دلار', 'دو ترم (۹,۰۰۰ + ۷,۷۵۰)'],
                ['BME بوداپست', 'مهندسی', '۶,۴۰۰–۷,۰۰۰ یورو', 'سالانه'],
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition">
                  {row.map((cell, j) => (
                    <td key={j} className="p-4 text-slate-200">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-400 mt-3 text-center">
          * هزینه‌ها بر اساس اعلام رسمی دانشگاه‌ها برای سال تحصیلی ۲۰۲۶/۲۷ است.
        </p>
      </section>

      {/* ---------- آزمون ورودی و مهلت‌ها ---------- */}
      <section id="exam" className="container mx-auto px-4 md:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black text-white mb-4 flex items-center gap-2">
              <FileCheck2 className="h-6 w-6 text-amber-400" />
              ساختار آزمون ورودی پزشکی
            </h2>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>کتبی (۱۰۰ دقیقه):</strong> ۲۰ سؤال زیست، ۲۰ شیمی، ۴۰ انگلیسی عمومی، ۲۰ انگلیسی پزشکی.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>شفاهی (۲۰–۳۰ دقیقه):</strong> مصاحبه با استاد درباره انگیزه و دانش علمی.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>تعداد تلاش:</strong> حداکثر ۳ بار (بورسیه Stipendium فقط ۱ بار).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span><strong>دوره Pre-Med:</strong> شانس قبولی را به بیش از ۹۰٪ می‌رساند.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black text-white mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-400" />
              مهلت‌های کلیدی ۲۰۲۶
            </h2>
            <div className="space-y-4 text-sm">
              {[
                { uni: 'سملوایز بوداپست', deadline: '۱۲ ژانویه – ۳۱ مه ۲۰۲۶', color: 'text-amber-300' },
                { uni: 'دانشگاه سگد', deadline: 'تا ۱۵ ژوئن ۲۰۲۶', color: 'text-emerald-300' },
                { uni: 'بورسیه Stipendium Hungaricum', deadline: '۱۵ ژانویه ۲۰۲۶', color: 'text-blue-300' },
                { uni: 'دبرسن و پچ', deadline: 'پذیرش غلتکی (زودتر اقدام کنید)', color: 'text-slate-300' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-200">{item.uni}</span>
                  <span className={`font-bold ${item.color}`}>{item.deadline}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- نظرات (Social Proof) ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-8">
          تجربه دانشجویان دیاکو
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <Quote className="h-8 w-8 text-amber-400/50 mb-3" />
              <p className="text-sm text-slate-200 leading-relaxed mb-4">«{t.text}»</p>
              <footer className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-black text-emerald-300">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-slate-400">{t.university}</div>
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
      <section id="faq" className="container mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-8">
          پرسش‌های متداول تحصیل در مجارستان
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold text-white hover:text-amber-300 transition"
                aria-expanded={openFaq === idx}
              >
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-amber-400' : ''}`} />
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
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <div className="rounded-3xl bg-gradient-to-l from-emerald-900/60 to-[#0a2a33] border border-emerald-400/20 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            آماده شروع مسیر تحصیل در مجارستان هستید؟
          </h2>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            کارشناسان دیاکو با ارزیابی رایگان پرونده، بهترین دانشگاه و مسیر پذیرش را برای شما پیشنهاد می‌دهند.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-8 py-3.5 text-sm font-black text-[#082833] hover:brightness-110 transition"
            >
              ارزیابی رایگان شانس قبولی
            </button>
            <a
              href="https://wa.me/989197340829"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              گفتگو در واتساپ
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
                <GraduationCap className="h-6 w-6 text-amber-400" />
                <span className="font-black text-white">دیاکو</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                هلدینگ مهاجرتی دیاکو، ارائه‌دهنده خدمات تخصصی تحصیل در مجارستان و اروپا.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#universities" className="hover:text-amber-300">دانشگاه‌ها</a></li>
                <li><a href="#tuition" className="hover:text-amber-300">شهریه</a></li>
                <li><a href="#exam" className="hover:text-amber-300">آزمون ورودی</a></li>
                <li><a href="#faq" className="hover:text-amber-300">سوالات متداول</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">تماس با ما</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>واتساپ: ۰۹۱۹۷۳۴۰۸۲۹</li>
                <li>ایمیل: info@dia-co.ir</li>
                <li>وب‌سایت: www.dia-co.ir</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">اعتماد شما</h4>
              <div className="flex items-center gap-2 text-xs text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                <span>مشاوره تخصصی و شفاف</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">
                © ۲۰۲۶ دیاکو. تمامی حقوق محفوظ است.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AcademicHungaryPage;