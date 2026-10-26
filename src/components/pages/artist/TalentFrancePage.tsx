import OptimizedImage from '../../OptimizedImage';
import React, { useState } from 'react';
import {
  CheckCircle2, Clock, ArrowRight, ChevronDown, PhoneCall,
  Palette, Building2, Euro, Users, FileText, Banknote,
  Briefcase, CalendarDays, BookOpen, AlertTriangle,
  ShieldCheck, Landmark, FileCheck2, Sparkles, Quote,
  MapPin, HeartPulse, Receipt, Home, ShieldAlert,
  Wallet, Route, Globe, Fingerprint, Scale, FileWarning,
  Clapperboard, Music, Theater, Ticket, Mic2, Flag,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const TalentFrancePage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای تالنت فرانسه ۲۰۲۶ | ۴ سال اقامت + تله ۵۰۷ ساعت',
    description:
      'پاسپورت تلنت هنری فرانسه ۲۰۲۶: €۱,۳۰۶.۹۱/ماه (۷۰٪ SMIC) با ۵۱٪ از هنر، کارت ۴ ساله، هزینه €۳۵۰. اما تله پنهان: ۵۰۷ ساعت intermittence برای تمدید. داستان واقعی Gangbé Brass Band و راهنمای کامل با دیاکو.',
    canonical: '/guides/talent-france',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای تالنت فرانسه ۲۰۲۶',
      'Passeport Talent artiste 2026',
      'پاسپورت تلنت هنری فرانسه',
      'حداقل درآمد ۱۳۰۶ یورو SMIC',
      '۵۰۷ ساعت intermittence تمدید',
      'Gangbé Brass Band OQTF',
      'کارت ۴ ساله هنرمندان فرانسه',
      'هزینه ۳۵۰ یورو passeport talent',
      'ویزای هنرمندان پاریس',
      'تمدید پاسپورت تلنت',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/talent-france#article',
          headline:
            'پاسپورت تلنت هنری فرانسه ۲۰۲۶: چرا ۴ سال کافی نیست و تله ۵۰۷ ساعت چیست',
          description:
            'بررسی کامل Passeport Talent (Profession artistique et culturelle) ۲۰۲۶: آستانه €۱,۳۰۶.۹۱/ماه (۷۰٪ SMIC) با ۵۱٪ از هنر، هزینه €۳۵۰، پردازش ۶۹ روز. هشدار: برای تمدید باید ۵۰۷ ساعت intermittence اثبات کنید. داستان واقعی Gangbé Brass Band که با وجود پاسپورت تلنت اخراج شد.',
          image: [
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
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
            { '@type': 'Thing', name: 'Passeport Talent artistique' },
            { '@type': 'Thing', name: 'Intermittence 507 heures' },
            { '@type': 'Thing', name: 'CESEDA L421-20' },
          ],
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/talent-france#howto',
          name: 'مراحل دریافت و حفظ پاسپورت تلنت هنری فرانسه',
          description: 'فرآیند گام‌به‌گام از درخواست اولیه تا تمدید موفق',
          totalTime: 'P6M',
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'EUR',
            value: '350',
          },
          step: [
            {
              '@type': 'HowToStep', position: 1,
              name: 'اثبات درآمد ۷۰٪ SMIC با ۵۱٪ از هنر',
              text: 'حداقل €۱,۳۰۶.۹۱/ماه (۲۰۲۶). دست‌کم ۵۱٪ آن باید از فعالیت هنری باشد (نه کمک‌هزینه).',
            },
            {
              '@type': 'HowToStep', position: 2,
              name: 'اثبات قرارداد یا فعالیت هنری',
              text: 'قرارداد کاری حداقل ۳ ماه در ۱۲ ماه با نهاد فرهنگی فرانسوی، یا فعالیت مستقل با درآمد قابل‌پیش‌بینی.',
            },
            {
              '@type': 'HowToStep', position: 3,
              name: 'درخواست ویزا و پرداخت هزینه‌ها',
              text: 'ویزای بلندمدت (€۹۹) + کارت اقامت (€۳۵۰ در ۲۰۲۶). پردازش Prefecture به‌طور میانگین ۶۹ روز.',
            },
            {
              '@type': 'HowToStep', position: 4,
              name: 'دریافت کارت ۴ ساله و الحاق خانواده',
              text: 'همسر و فرزندان خودکار کارت ۴ ساله با حق کار کامل دریافت می‌کنند.',
            },
            {
              '@type': 'HowToStep', position: 5,
              name: 'آمادگی برای تمدید: ۵۰۷ ساعت',
              text: 'قبل از انقضای ۴ سال، باید ۵۰۷ ساعت intermittence (کار هنری اعلام‌شده) در ۱۲ ماه گذشته اثبات کنید. این تله اصلی است.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/talent-france#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حداقل درآمد پاسپورت تلنت هنری فرانسه در ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حداقل €۱,۳۰۶.۹۱ در ماه (۷۰٪ SMIC ۲۰۲۶). دست‌کم ۵۱٪ این درآمد باید از فعالیت هنری (هنرمند-مجری یا نویسنده) باشد. کمک‌هزینه Pôle Emploi محاسبه نمی‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا پس از ۴ سال اقامت دائم می‌گیرم؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. پاسپورت تلنت کارت ۴ ساله است، نه اقامت دائم. پس از ۵ سال اقامت مستمر می‌توانید برای کارت ۱۰ ساله (Carte de résident) درخواست دهید. برای تمدید کارت ۴ ساله، باید شرایط (از جمله ۵۰۷ ساعت intermittence) را دوباره اثبات کنید.',
              },
            },
            {
              '@type': 'Question',
              name: 'تله ۵۰۷ ساعت intermittence چیست؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای تمدید پاسپورت تلنت در مشاغل نمایشی، در برخی موارد باید نشان دهید که ۵۰۷ ساعت کار هنری اعلام‌شده (intermittence) در ۱۲ ماه گذشته داشته‌اید. اگر به دلیل لغو رویدادها یا پروژه‌ها به این حد نرسید، ممکن است تمدید رد شود و حتی OQTF (دستور خروج) بگیرید — همانطور که برای Gangbé Brass Band در ۲۰۲۶ اتفاق افتاد.',
              },
            },
            {
              '@type': 'Question',
              name: 'هزینه پاسپورت تلنت در ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'هزینه کارت اقامت (titre de séjour) در ۲۰۲۶ حدود €۳۵۰ است (شامل €۳۰۰ مالیات و €۵۰ حق تمبر). هزینه ویزای بلندمدت (VLS-TS) جداگانه حدود €۹۹ است. هزینه‌های ترجمه، apostille و مشاوره نیز اضافه می‌شوند.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا خانواده همزمان می‌توانند بیایند و کار کنند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله. همسر/شریک ثبت‌شده و فرزندان زیر ۱۸ سال به‌طور خودکار کارت اقامت ۴ ساله «passeport talent famille» دریافت می‌کنند. همسر از روز اول حق کار کامل دارد. این یکی از بزرگ‌ترین مزایای این ویزا نسبت به بسیاری از مسیرهای دیگر است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا برای این ویزا مدرک زبان فرانسوی لازم است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'برای درخواست اولیه، هیچ آزمون زبان اجباری نیست. اما برای تمدید یا درخواست کارت ۱۰ ساله، ممکن است سطح A2/B1 فرانسه لازم شود. برای مصاحبه کنسولگری نیز آشنایی با فرانسه کمک‌کننده است.',
              },
            },
          ],
        },
      ],
    },
  });

  const FAQS = [
    {
      q: 'حداقل درآمد پاسپورت تلنت هنری فرانسه در ۲۰۲۶ چقدر است؟',
      a: 'حداقل €۱,۳۰۶.۹۱ در ماه (۷۰٪ SMIC ۲۰۲۶). دست‌کم ۵۱٪ این درآمد باید از فعالیت هنری (هنرمند-مجری یا نویسنده) باشد. کمک‌هزینه Pôle Emploi محاسبه نمی‌شود. این مبلغ باید برای کل دوره اقامت پیش‌بینی‌شده قابل‌اثبات باشد.',
    },
    {
      q: 'آیا پس از ۴ سال اقامت دائم می‌گیرم؟',
      a: 'خیر. پاسپورت تلنت یک کارت اقامت ۴ ساله (carte pluriannuelle) است، نه اقامت دائم. پس از ۵ سال اقامت مستمر می‌توانید برای کارت ۱۰ ساله (Carte de résident) درخواست دهید. برای تمدید کارت ۴ ساله، باید شرایط اولیه — از جمله آستانه درآمد و در برخی موارد ۵۰۷ ساعت intermittence — را دوباره اثبات کنید.',
    },
    {
      q: 'تله ۵۰۷ ساعت intermittence چیست؟',
      a: 'برای تمدید پاسپورت تلنت در مشاغل نمایشی، در برخی موارد باید نشان دهید که ۵۰۷ ساعت کار هنری اعلام‌شده (intermittence) در ۱۲ ماه گذشته داشته‌اید. این عدد از نظام بیمه بیکاری هنرمندان (intermittents du spectacle) می‌آید. اگر به دلیل لغو رویدادها، کاهش بودجه یا پروژه‌های لغوشده به این حد نرسید، ممکن است تمدید رد شود و حتی OQTF (دستور خروج از خاک فرانسه) دریافت کنید — همانطور که برای گروه Gangbé Brass Band در ۲۰۲۶ اتفاق افتاد.',
    },
    {
      q: 'هزینه پاسپورت تلنت در ۲۰۲۶ چقدر است؟',
      a: 'هزینه کارت اقامت (titre de séjour) در ۲۰۲۶ حدود €۳۵۰ است (شامل €۳۰۰ مالیات و €۵۰ حق تمبر). هزینه ویزای بلندمدت (VLS-TS) جداگانه حدود €۹۹ است. هزینه‌های ترجمه رسمی، apostille، مشاوره حقوقی و بلیط نیز به این مبالغ اضافه می‌شود.',
    },
    {
      q: 'آیا خانواده همزمان می‌توانند بیایند و کار کنند؟',
      a: 'بله. همسر/شریک ثبت‌شده و فرزندان زیر ۱۸ سال به‌طور خودکار کارت اقامت ۴ ساله «passeport talent famille» دریافت می‌کنند. همسر از روز اول حق کار کامل دارد — بدون نیاز به مجوز کار جداگانه. این یکی از بزرگ‌ترین مزایای این ویزا نسبت به بسیاری از مسیرهای دیگر است.',
    },
    {
      q: 'آیا برای این ویزا مدرک زبان فرانسوی لازم است؟',
      a: 'برای درخواست اولیه، هیچ آزمون زبان اجباری نیست. اما برای تمدید یا درخواست کارت ۱۰ ساله، ممکن است سطح A2/B1 فرانسه لازم شود. برای مصاحبه کنسولگری نیز آشنایی با فرانسه کمک‌کننده است، اما مانع قانونی نیست.',
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
            <span className="text-amber-300 font-bold">ویزای تالنت فرانسه</span>
          </div>
        </div>
      </div>

      {/* HERO — VIRAL HOOK */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-300 mb-4">
              <ShieldAlert className="h-4 w-4 text-blue-400" />
              Passeport Talent — ۴ سال اقامت، اما یک تله پنهان
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              پاسپورت تلنت فرانسه{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-blue-400">
                ۴ سال می‌دهد، ۵۰۷ ساعت می‌گیرد
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              فرانسه با پاسپورت تلنت هنری، یکی از بلندترین کارت‌های اقامت اروپا را می‌دهد:{' '}
              <strong className="text-white">۴ سال</strong>، با خانواده، بدون آزمون زبان.
              اما در ۲۰۲۶، یک گروه موسیقی بنینی با همین کارت{' '}
              <strong className="text-rose-300">OQTF (دستور خروج) گرفت</strong> — چون
              نتوانست <strong className="text-rose-300">۵۰۷ ساعت</strong> کار هنری اعلام‌شده
              را برای تمدید اثبات کند. این صفحه هم زیبایی‌های این ویزا را نشان می‌دهد، هم
              تله‌هایی که هیچ‌کس درباره‌شان حرف نمی‌زند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-amber-300">€۱,۳۰۶.۹۱</div>
                <div className="text-[10px] text-slate-300 mt-1">۷۰٪ SMIC (۵۱٪ از هنر)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-emerald-400">۴ سال</div>
                <div className="text-[10px] text-slate-300 mt-1">کارت اقامت اولیه</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-rose-300">۵۰۷ ساعت</div>
                <div className="text-[10px] text-slate-300 mt-1">تله تمدید (intermittence)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                <div className="text-base font-black text-sky-300">€۳۵۰</div>
                <div className="text-[10px] text-slate-300 mt-1">هزینه کارت ۲۰۲۶</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer">
                ارزیابی واقع‌بینانه پرونده فرانسه
              </button>
              <a href="https://wa.me/989197340829" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-400" /> مشاوره با دپارتمان فرانسه
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <OptimizedImage src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80" alt="پاسپورت تلنت هنری فرانسه ۲۰۲۶ - ۴ سال اقامت و تله ۵۰۷ ساعت" width={1000} height={750} loading="eager" decoding="async" fetchPriority="high" className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                  <Flag className="h-4 w-4" /> ۴ سال اقامت، اما با شرط تمدید
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  €۱,۳۰۶.۹۱/ماه (۷۰٪ SMIC) | ۵۱٪ از هنر | ۵۰۷ ساعت برای تمدید
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MYTH VS REALITY — THE 507 TRAP */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-amber-500/5 border border-amber-400/20 rounded-3xl p-6 md:p-10">
          <div className="flex items-start gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white mb-2">افسانه «۴ سال تمام» و واقعیت «۵۰۷ ساعت»</h2>
              <p className="text-sm text-slate-300 leading-relaxed">اگر فکر می‌کنید پاسپورت تلنت یعنی ۴ سال راحت و بعد اقامت دائم، این بخش را با دقت بخوانید.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
              <h3 className="text-sm font-black text-emerald-300 mb-3 flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> چه چیزی درست است</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>کارت <strong className="text-white">۴ ساله</strong> است (بلندترین در بدو ورود)</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>خانواده <strong className="text-white">خودکار</strong> و با حق کار می‌آیند</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>بدون آزمون زبان و بدون تأییدیه اداره کار</span></li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-400/20">
              <h3 className="text-sm font-black text-rose-300 mb-3 flex items-center gap-2"><ShieldAlert className="h-4 w-4" /> چه چیزی خطرناک است</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2"><AlertTriangle className="h-3.5 w-3.5 text-rose-400 mt-0.5 shrink-0" /><span>۴ سال = <strong className="text-white">اقامت موقت</strong>، نه دائم</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-3.5 w-3.5 text-rose-400 mt-0.5 shrink-0" /><span>تمدید نیازمند <strong className="text-white">۵۰۷ ساعت</strong> intermittence در برخی موارد</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="h-3.5 w-3.5 text-rose-400 mt-0.5 shrink-0" /><span>بدون این ساعت‌ها: رد تمدید و <strong className="text-rose-300">OQTF</strong> (دستور خروج)</span></li>
              </ul>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-4 text-center">منابع: CESEDA R421-37-2  |  مورد Gangbé Brass Band ۲۰۲۶ </p>
        </div>
      </section>

      {/* VIRAL STORY — GANGBÉ BRASS BAND */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-br from-red-950/40 via-slate-900/60 to-[#061a21] border border-red-400/20 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80" alt="گروه Gangbé Brass Band بنین - اخراج از فرانسه با وجود پاسپورت تلنت ۲۰۲۶" width={800} height={533} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">Gangbé Brass Band — ۶ موسیقیدان، ۴ سال در فرانسه، حالا OQTF</div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-red-300 mb-3"><Quote className="h-4 w-4" /> داستان واقعی ۲۰۲۶</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">«۴ سال با پاسپورت تلنت زندگی کردیم. حالا می‌گویند برویم.»</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">گروه موسیقی <strong className="text-white">Gangbé Brass Band</strong> از بنین، از سال ۲۰۲۲ با ویزای Passeport Talent در فرانسه زندگی می‌کرد. شش نوازنده، خانواده‌هایشان، اجراهای منظم در جشنواره‌ها.</p>
              <div className="space-y-3 mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[11px] text-slate-300 leading-relaxed"><strong className="text-white">چه شد؟</strong> در ۱۵ جولای ۲۰۲۶، هر شش نفر OQTF (دستور خروج از خاک فرانسه) دریافت کردند. دلیل: چند جشنواره به‌دلیل قطع بودجه لغو شد، درآمد کاهش یافت، و گروه نتوانست <strong className="text-rose-300">۵۰۷ ساعت intermittence</strong> لازم برای تمدید را اثبات کند. آنها فقط ۲۰۰ ساعت完成了.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[11px] text-slate-300 leading-relaxed"><strong className="text-white"> irony:</strong> کنسولگری فرانسه در بنین خودشان به این نوازندگان پیشنهاد داده بود که «پاسپورت تلنت» بگیرند — چون استعداد برجسته‌ای داشتند. اما هیچ‌کس به آنها نگفته بود که ۵۰۷ ساعت شرط تمدید است.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-400/20">
                <p className="text-xs text-red-200 leading-relaxed"><strong>درس:</strong> پاسپورت تلنت یک «بلیط یک‌طرفه» نیست. تمدید آن — به‌ویژه در مشاغل نمایشی — نیازمند برنامه‌ریزی دقیق برای رسیدن به آستانه ۵۰۷ ساعت است، حتی اگر برخی سال‌ها پروژه‌ها لغو شوند.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL NUMBERS 2026 */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-3"><Wallet className="h-4 w-4" /> اعداد واقعی ۲۰۲۶</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">چقدر درآمد و هزینه؟</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 text-justify">آستانه اصلی: <strong className="text-amber-300">۷۰٪ SMIC</strong> = <strong className="text-amber-300">€۱,۳۰۶.۹۱/ماه</strong>، که دست‌کم <strong className="text-white">۵۱٪ آن از هنر</strong> باشد.</p>

              <div className="space-y-2.5">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                  <div className="flex items-center justify-between mb-1"><span className="text-xs font-bold text-amber-300">حداقل درآمد ماهانه</span><span className="text-sm font-black text-white">€۱,۳۰۶.۹۱</span></div>
                  <p className="text-[10px] text-amber-200/80">۷۰٪ SMIC ۲۰۲۶ | ۵۱٪ از فعالیت هنری</p>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"><span className="text-xs text-white">هزینه کارت اقامت</span><span className="text-xs font-black text-sky-300">€۳۵۰</span></div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"><span className="text-xs text-white">ویزای بلندمدت (VLS-TS)</span><span className="text-xs font-black text-sky-300">€۹۹</span></div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"><span className="text-xs text-white">پردازش Prefecture (میانگین)</span><span className="text-xs font-black text-slate-300">۶۹ روز</span></div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-400/20">
                <div className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" /><p className="text-[11px] text-red-200 leading-relaxed"><strong>هشدار تمدید:</strong> در ۲۰۲۶، تمدید Passeport Talent در مشاغل نمایشی با بررسی دقیق‌تر ۵۰۷ ساعت intermittence انجام می‌شود. برنامه‌ریزی درآمد خود را از سال اول شروع کنید.</p></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <OptimizedImage src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="آستانه درآمد پاسپورت تلنت فرانسه ۲۰۲۶ - ۷۰٪ SMIC = ۱۳۰۶ یورو" width={800} height={533} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">۷۰٪ SMIC = €۱,۳۰۶.۹۱/ماه | ۵۱٪ از هنر | هزینه €۳۵۰</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2"><Receipt className="h-4 w-4 text-amber-400" /><span className="text-xs font-bold text-white">هزینه‌های پنهان</span></div>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" /><span>ترجمه رسمی + Apostille: €۲۰۰–۵۰۰</span></li>
                  <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" /><span>مشاوره حقوقی: €۵۰۰–۲,۰۰۰</span></li>
                  <li className="flex items-start gap-1.5"><CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" /><span>ودیعه مسکن (پاریس): €۲,۰۰۰–۳,۰۰۰</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS & TIMELINE */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6 flex items-center gap-2"><CalendarDays className="h-6 w-6 text-amber-400" /> فرآیند و زمان‌بندی ۲۰۲۶</h2>
          <div className="space-y-3">
            {[
              { step: '۱', title: 'اثبات درآمد و قرارداد', detail: '€۱,۳۰۶.۹۱/ماه با ۵۱٪ از هنر + قرارداد حداقل ۳ ماهه (یا فعالیت مستقل)', time: '۲–۴ ماه' },
              { step: '۲', title: 'درخواست ویزا در کنسولگری', detail: 'فرم + مدارک + پرداخت €۹۹ (ویزای VLS-TS)', time: '۲–۴ هفته' },
              { step: '۳', title: 'ورود و اعتبارسنجی OFII', detail: 'ظرف ۳ ماه پس از ورود، اعتبارسنجی آنلاین', time: '۱ روز' },
              { step: '۴', title: 'دریافت کارت ۴ ساله از Prefecture', detail: 'پرداخت €۳۵۰ — میانگین پردازش ۶۹ روز', time: '۶۹ روز' },
              { step: '۵', title: 'آمادگی برای تمدید: ۵۰۷ ساعت', detail: 'طی ۴ سال، ساعات intermittence خود را رصد کنید — این شرط بقاست', time: '۴ سال' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-400 text-[#082833] grid place-items-center text-xs font-black">{item.step}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between"><span className="text-xs font-bold text-white">{item.title}</span><span className="text-[10px] text-slate-400">{item.time}</span></div>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2"><BookOpen className="h-4 w-4" /> پرسش‌های متداول</span>
          <h2 className="text-2xl md:text-3xl font-black text-white">سوالات پرتکرار پاسپورت تلنت فرانسه</h2>
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
          <h2 className="text-xl md:text-2xl font-black text-white mb-2">قبل از اینکه ۴ سال را برنامه‌ریزی کنید، تله ۵۰۷ ساعت را بشناسید</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">کارشناسان دیاکو پرونده شما را با استانداردهای ۲۰۲۶ بررسی می‌کنند: آستانه درآمد، قرارداد، و مهم‌تر از همه — استراتژی تمدید ۵۰۷ ساعت.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110 cursor-pointer">ارزیابی رایگان پرونده فرانسه</button>
            <a href="https://wa.me/989197340829" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold text-white hover:bg-white/10 cursor-pointer inline-flex items-center gap-2"><PhoneCall className="h-4 w-4 text-emerald-400" /> گفتگو با کارشناس فرانسه</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TalentFrancePage;