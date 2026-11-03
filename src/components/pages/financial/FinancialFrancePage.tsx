import React, { useState } from 'react';
import {
  CheckCircle2, ChevronDown, PhoneCall, Copy, Sparkles, Landmark,
  ShieldCheck, Euro, AlertTriangle, CalendarDays, Menu, X, Star, Quote,
  MapPin, Clock, Users, Home, HeartPulse, Languages, FileCheck2, Wallet,
  ArrowLeft, Scale, BookOpen, Info, TrendingUp, Globe, Briefcase, Plane,
  FileText, CreditCard, Building2, Utensils,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

/* ---------- داده‌های ساختاریافته ۲۰۲۶ ---------- */
const incomeRows = [
  { label: 'مجرد (Célibataire)', value: '~€۱,۸۵۰ / ماه', sub: 'معادل SMIC', icon: Wallet },
  { label: 'زوج (Couple)', value: '~€۲,۷۷۵ / ماه', sub: '۱.۵ برابر SMIC', icon: Users },
  { label: 'هر فرزند', value: '+ ~€۴۶۰ / ماه', sub: 'افزایش تدریجی', icon: HeartPulse },
];

const generalRequirements = [
  { icon: Home, title: 'مسکن معتبر', desc: 'اجاره‌نامه رسمی، سند مالکیت یا تعهد سکونت (Attestation d\'accueil)' },
  { icon: ShieldCheck, title: 'بیمه درمانی خصوصی', desc: 'پوشش کامل در فرانسه — بیمه مسافرتی کافی نیست' },
  { icon: Languages, title: 'زبان فرانسه', desc: 'برای اولین درخواست لازم نیست، اما برای اقامت ۱۰ ساله سطح A2/B1 الزامی است' },
  { icon: FileCheck2, title: 'عدم سوءپیشینه', desc: 'گواهی حداکثر ۳ ماه اعتبار' },
];

const processSteps = [
  { step: '۱', title: 'آماده‌سازی مدارک', detail: 'پاسپورت، اثبات درآمد، اجاره‌نامه، بیمه، عدم سوءپیشینه، انگیزه‌نامه', time: '۲–۴ ماه' },
  { step: '۲', title: 'رزرو وقت سفارت (VFS/TLS)', detail: 'در تهران یا کشور همسایه', time: '۱–۳ ماه' },
  { step: '۳', title: 'ثبت درخواست VLS-TS', detail: 'ویزای بلندمدت ۴ تا ۱۲ ماه', time: '۱ روز' },
  { step: '۴', title: 'تأیید آنلاین OFII', detail: 'پس از ورود به فرانسه، حداکثر ۳ ماه', time: '۱ ماه' },
  { step: '۵', title: 'تمدید سالانه در Préfecture', detail: 'حداکثر ۲ ماه قبل از انقضا', time: '۲–۴ ماه' },
];

const renewalTimeline = [
  { stage: 'VLS-TS اولیه', duration: '۴–۱۲ ماه', condition: 'ویزای ورود بلندمدت از سفارت', color: 'text-amber-300' },
  { stage: 'Carte de Séjour Visiteur', duration: '۱ سال (قابل تمدید)', condition: 'تمدید سالانه در Préfecture', color: 'text-sky-300' },
  { stage: 'Carte de résident (۱۰ ساله)', duration: '۱۰ سال', condition: '۵ سال اقامت مستمر + A2 فرانسه', color: 'text-emerald-300' },
  { stage: 'تابعیت فرانسه', duration: 'دائمی', condition: '۵ سال اقامت + B1 فرانسه + شرایط', color: 'text-indigo-300' },
];

const faqs = [
  { q: 'آیا با ویزای Visiteur می‌توانم در فرانسه کار کنم؟', a: 'خیر. ویزای Visiteur صراحتاً «بدون اجازه کار» است و هرگونه اشتغال (حتی پاره‌وقت یا ریموت برای کارفرمای فرانسوی) ممنوع است. تنها فعالیت مجاز، مدیریت سرمایه‌گذاری شخصی و دریافت سود از منابع خارج از فرانسه است.' },
  { q: 'حداقل درآمد لازم برای ویزای Visiteur در ۲۰۲۶ چقدر است؟', a: 'معیار رسمی، درآمد معادل حداقل دستمزد فرانسه (SMIC) است که برای ۲۰۲۶ حدود €۱,۸۵۰ در ماه (ناخالص) یا €۲۲,۰۰۰ سالانه تخمین زده می‌شود. اما در عمل، Préfecture های پاریس و نیس معمولاً ۱.۵ برابر SMIC یا بیشتر را ترجیح می‌دهند تا پرونده رد نشود.' },
  { q: 'آیا مدرک زبان فرانسه برای اولین درخواست لازم است؟', a: 'خیر. برای اولین ویزای Visiteur، مدرک زبان الزامی نیست. اما برای تمدیدهای بعدی و به‌ویژه برای کارت اقامت ۱۰ ساله (Carte de résident)، سطح A2 و برای تابعیت B1 فرانسه لازم است.' },
  { q: 'آیا سرمایه‌گذاری یا خرید ملک اجباری است؟', a: 'خیر. هیچ الزام سرمایه‌گذاری وجود ندارد. تنها اثبات درآمد غیرفعال کافی، مسکن معتبر و بیمه درمانی کافی است. این یک «گلدن ویزا» نیست.' },
  { q: 'آیا خانواده می‌توانند همراه باشند؟', a: 'بله. همسر و فرزندان زیر ۱۸ سال می‌توانند در همان درخواست یا به‌صورت الحاق خانواده (Regroupement familial) اقدام کنند. هر عضو باید شرایط خود را برآورده کند و درآمد مورد نیاز برای خانواده بالاتر است.' },
  { q: 'مسیر اقامت دائم و تابعیت فرانسه چگونه است؟', a: 'پس از ۵ سال اقامت قانونی مستمر و پرداخت مالیات، می‌توانید برای Carte de résident ۱۰ ساله (با A2 فرانسه) و پس از ۵ سال برای تابعیت فرانسه (با B1 فرانسه و شرایط اضافی) اقدام کنید.' },
];

const testimonials = [
  { name: 'فرزانه رحیمی', role: 'بازنشسته — نیس', text: 'دیاکو از ابتدا پرونده را دقیق بست و درخواست VLS-TS من در کمتر از ۶ هفته تأیید شد. تمدید سالانه هم بدون مشکل انجام شد.' },
  { name: 'کوروش پارسا', role: 'سرمایه‌گذار — پاریس', text: 'تیم دیاکو در اثبات درآمد غیرفعال و انتخاب بیمه مناسب بسیار کمک کرد. نکات مربوط به Préfecture را دقیق توضیح دادند.' },
];

export const FinancialFrancePage: React.FC<Props> = ({ onBackToHome, onOpenAssessment }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSeo({
    title: 'اقامت تمکن مالی فرانسه ۲۰۲۶ | ویزای Visiteur + SMIC + کارت اقامت ۱۰ ساله',
    description:
      'راهنمای کامل اقامت تمکن مالی فرانسه ۲۰۲۶ (ویزای Visiteur): حداقل درآمد معادل SMIC (~€۱,۸۵۰/ماه)، مسکن معتبر، بیمه خصوصی، بدون نیاز به کار، مسیر ۵ ساله تا کارت اقامت ۱۰ ساله و تابعیت. مشاوره تخصصی دیاکو.',
    canonical: '/guides/financial-france',
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'تمکن مالی فرانسه ۲۰۲۶', 'ویزای ویزیتور فرانسه Visiteur',
      'Carte de Séjour Visiteur', 'اقامت خودحمایتی فرانسه',
      'حداقل درآمد تمکن مالی فرانسه SMIC', 'اقامت بدون کار فرانسه',
      'کارت اقامت ۱۰ ساله فرانسه', 'VLS-TS فرانسه', 'مهاجرت به فرانسه با تمکن',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/financial-france#article',
          headline: 'راهنمای جامع اقامت تمکن مالی فرانسه ۲۰۲۶: ویزای Visiteur، SMIC و کارت اقامت ۱۰ ساله',
          description: 'بررسی CESEDA، آستانه درآمد SMIC (~€۱,۸۵۰/ماه)، مسکن معتبر، بیمه خصوصی، فرآیند VLS-TS، تأیید OFII، تمدید سالانه در Préfecture و مسیر ۵ ساله تا Carte de résident.',
          image: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80'],
          author: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', url: 'https://www.dia-co.ir/' },
          publisher: { '@type': 'Organization', name: 'هلدینگ مهاجرتی دیاکو', logo: { '@type': 'ImageObject', url: 'https://www.dia-co.ir/logo.png' } },
          datePublished: '2026-01-01', dateModified: '2026-10-29', inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Carte de Séjour Visiteur' },
            { '@type': 'Thing', name: 'CESEDA' },
            { '@type': 'Thing', name: 'VLS-TS' },
          ],
        },
        {
          '@type': 'HowTo',
          name: 'مراحل دریافت ویزای Visiteur و اقامت تمکن مالی فرانسه',
          totalTime: 'P6M',
          step: processSteps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.detail })),
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://www.dia-co.ir/' },
            { '@type': 'ListItem', position: 2, name: 'تمکن مالی', item: 'https://www.dia-co.ir/financial' },
            { '@type': 'ListItem', position: 3, name: 'فرانسه', item: 'https://www.dia-co.ir/guides/financial-france' },
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
              <Landmark className="h-7 w-7 text-indigo-400" />
              <span className="font-black text-lg">دیاکو</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-200">
              <a href="#article" className="hover:text-indigo-300 transition">مقاله</a>
              <a href="#income" className="hover:text-indigo-300 transition">درآمد</a>
              <a href="#requirements" className="hover:text-indigo-300 transition">شرایط</a>
              <a href="#process" className="hover:text-indigo-300 transition">فرآیند</a>
              <a href="#renewal" className="hover:text-indigo-300 transition">تمدید</a>
              <a href="#faq" className="hover:text-indigo-300 transition">سوالات</a>
            </nav>
            <div className="flex items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="hidden sm:inline-flex rounded-xl bg-[#f5a623] px-4 py-2 text-xs font-black text-[#082833] hover:brightness-110 transition">ارزیابی رایگان</button>
              <button type="button" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="منو">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 space-y-3 text-sm font-bold">
              <a href="#article" className="block hover:text-indigo-300">مقاله</a>
              <a href="#income" className="block hover:text-indigo-300">درآمد</a>
              <a href="#requirements" className="block hover:text-indigo-300">شرایط</a>
              <a href="#process" className="block hover:text-indigo-300">فرآیند</a>
              <a href="#renewal" className="block hover:text-indigo-300">تمدید</a>
              <a href="#faq" className="block hover:text-indigo-300">سوالات</a>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Breadcrumb ---------- */}
      <div className="container mx-auto px-4 md:px-8 pt-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button type="button" onClick={onBackToHome} className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-indigo-400 hover:text-indigo-300 transition">
            <ArrowLeft className="h-4 w-4" /> بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span><span>/</span>
            <span>تمکن مالی</span><span>/</span>
            <span className="text-indigo-300 font-bold">فرانسه</span>
          </div>
        </div>
      </div>

      {/* ---------- Hero ---------- */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 mb-4">
              <Sparkles className="h-4 w-4" /> Carte de Séjour Visiteur — CESEDA ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
              اقامت تمکن مالی فرانسه ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-indigo-400">
                (ویزای Visiteur)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-6 text-justify">
              فرانسه مهد هنر، فرهنگ و زندگی اروپایی است. طبق قانون اقامت فرانسه (<strong>CESEDA</strong>)، ویزای
              <strong> Visiteur</strong> به متقاضیانی اعطا می‌شود که با اثبات درآمد غیرفعال معادل
              <strong> SMIC</strong> (~<strong>€۱,۸۵۰/ماه</strong> یا €۲۲,۰۰۰ سالانه) و مسکن معتبر، بدون اشتغال
              در فرانسه زندگی می‌کنند. پس از <strong>۵ سال</strong> اقامت مستمر، مسیر کارت اقامت ۱۰ ساله
              (<strong>Carte de résident</strong>) و سپس تابعیت فرانسه باز می‌شود.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: Euro, label: '~€۱,۸۵۰', sub: 'حداقل SMIC ماهانه' },
                { icon: Plane, label: 'VLS-TS', sub: 'ویزای ۴–۱۲ ماه' },
                { icon: CalendarDays, label: '۵ سال', sub: 'تا اقامت ۱۰ ساله' },
                { icon: ShieldCheck, label: 'بدون کار', sub: 'ممنوعیت اشتغال' },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-center">
                  <item.icon className="h-5 w-5 text-indigo-400 mx-auto mb-1" />
                  <div className="text-sm font-black text-amber-300">{item.label}</div>
                  <div className="text-[10px] text-slate-300 mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] hover:brightness-110 transition">
                ارزیابی شانس ویزای ویزیتور فرانسه
              </button>
              <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold hover:bg-white/10 transition inline-flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره با کارشناسان فرانسه
                {copiedPhone && <span className="text-emerald-400 text-[10px] font-bold">کپی شد!</span>}
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80"
                alt="پاریس، فرانسه — اقامت تمکن مالی و ویزای Visiteur" width={1000} height={750}
                loading="eager" decoding="async" fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300"><MapPin className="h-4 w-4" /> پاریس — Préfecture de Police</div>
                <p className="text-[11px] text-slate-300 mt-1">صدور VLS-TS، تأیید آنلاین OFII و تمدید سالانه در استان محل سکونت.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================  مقاله پرمحتوا (Rich Article)  ===================== */}
      <article id="article" className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-10">

          {/* --- مقدمه --- */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-indigo-300 mb-2"><BookOpen className="h-4 w-4" /> مقاله تخصصی ۲۰۲۶</span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">ویزای Visiteur فرانسه چیست و برای چه کسانی مناسب است؟</h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify mb-4">
              ویزای <strong className="text-white">Visiteur</strong> (بازدیدکننده) یکی از انواع کارت اقامت فرانسه است که تحت
              قانون <strong className="text-white">CESEDA</strong> (Code de l'entrée et du séjour des étrangers et du droit d'asile)
              صادر می‌شود. این ویزا برای افرادی طراحی شده که:
            </p>
            <ul className="space-y-2 text-sm text-slate-300 mb-4">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>منابع مالی مستقل و کافی از خارج فرانسه دارند (مستمری، سود سرمایه‌گذاری، اجاره املاک، سود سهام)؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>قصد اشتغال در بازار کار فرانسه را ندارند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>می‌خواهند برای مدت طولانی (بیش از ۳ ماه) در فرانسه زندگی کنند؛</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>به‌دنبال تجربه زندگی در پاریس، نیس، لیون، بوردو یا سایر شهرهای فرانسه هستند.</span></li>
            </ul>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify">
              این ویزا برخلاف «گلدن ویزا»های اروپایی، هیچ الزام سرمایه‌گذاری یا خرید ملک ندارد. تنها اثبات درآمد غیرفعال
              کافی، مسکن معتبر و بیمه درمانی کافی لازم است. اما همین شرایط ساده، در عمل نیازمند پرونده‌سازی دقیق و
              آشنایی با سلیقه Préfecture های مختلف است — موضوعی که در ادامه مقاله به تفصیل بررسی می‌کنیم.
            </p>
          </div>

          {/* --- چارچوب حقوقی --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Scale className="h-6 w-6 text-indigo-400" /> چارچوب حقوقی: CESEDA و انواع ویزا
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              فرانسه دو نوع اصلی ویزای بلندمدت برای اقامت بدون کار ارائه می‌دهد:
            </p>
            <div className="space-y-3 mb-4">
              {[
                { n: '۱', t: 'VLS-TS Visiteur', d: 'ویزای بلندمدت معادل کارت اقامت (Visa Long Séjour valant Titre de Séjour) برای اقامت ۴ تا ۱۲ ماه. پس از ورود، باید در OFII ثبت شود.' },
                { n: '۲', t: 'Carte de Séjour Visiteur', d: 'کارت اقامت یک‌ساله که پس از انقضای VLS-TS یا برای درخواست مستقیم از داخل فرانسه در Préfecture صادر می‌شود.' },
                { n: '۳', t: 'Carte de résident (۱۰ ساله)', d: 'پس از ۵ سال اقامت مستمر و کسب شرایط (از جمله A2 فرانسه) قابل درخواست است.' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-indigo-400 text-[#082833] grid place-items-center text-xs font-black">{item.n}</span>
                  <div>
                    <div className="text-xs font-bold text-white mb-1">{item.t}</div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/20">
              <p className="text-[11px] text-red-200 leading-relaxed">
                <strong>هشدار حقوقی:</strong> ویزای Visiteur صراحتاً <strong>بدون اجازه کار</strong> است. هرگونه اشتغال
                (حتی پاره‌وقت، فریلنسری یا ریموت برای کارفرمای فرانسوی) ممنوع است و می‌تواند به لغو اقامت و ممنوعیت
                ورود منجر شود. تنها استثنا: مدیریت سرمایه‌گذاری شخصی و دریافت سود از منابع خارج فرانسه.
              </p>
            </div>
          </div>

          {/* --- درآمد --- */}
          <div id="income" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Euro className="h-6 w-6 text-amber-400" /> آستانه درآمد ۲۰۲۶ — معیار SMIC
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              معیار رسمی فرانسه برای ویزای Visiteur، داشتن درآمدی معادل حداقل دستمزد کشور
              (<strong className="text-white">SMIC — Salaire Minimum Interprofessionnel de Croissance</strong>) است.
              برای سال ۲۰۲۶، SMIC تقریباً برابر با <strong className="text-amber-300">€۱,۸۵۰ در ماه (ناخالص)</strong>
              یا حدود <strong className="text-amber-300">€۲۲,۰۰۰ سالانه</strong> تخمین زده می‌شود.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-4">
              <table className="w-full text-xs md:text-sm text-right">
                <thead className="bg-white/5 text-indigo-300 font-bold">
                  <tr>
                    <th className="p-3">وضعیت</th>
                    <th className="p-3">حداقل درآمد ماهانه</th>
                    <th className="p-3">درآمد سالانه معادل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="p-3 text-slate-200">مجرد</td><td className="p-3 font-black text-white">~€۱,۸۵۰</td><td className="p-3 text-slate-300">~€۲۲,۲۰۰</td></tr>
                  <tr><td className="p-3 text-slate-200">زوج</td><td className="p-3 font-black text-white">~€۲,۷۷۵</td><td className="p-3 text-slate-300">~€۳۳,۳۰۰</td></tr>
                  <tr><td className="p-3 text-slate-200">هر فرزند</td><td className="p-3 font-black text-amber-300">+ ~€۴۶۰</td><td className="p-3 text-slate-300">+ ~€۵,۵۲۰</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-3">
              <strong className="text-white">نکات کلیدی:</strong>
            </p>
            <ul className="space-y-2 text-xs text-slate-300 mb-4">
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" /><span>در عمل، Préfecture های <strong>پاریس، نیس و لیون</strong> معمولاً ۱.۵ برابر SMIC یا بیشتر را ترجیح می‌دهند تا پرونده رد نشود.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" /><span>درآمد باید <strong>ثابت و منظم</strong> باشد؛ سپرده یک‌باره بانکی به‌تنهایی کافی نیست.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" /><span>درآمد باید از <strong>خارج فرانسه</strong> تأمین شود؛ درآمد از منابع فرانسوی معمولاً نیازمند مجوز کار است.</span></li>
              <li className="flex items-start gap-2"><Info className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" /><span>ارائه صورت‌حساب‌های ۶ تا ۱۲ ماه گذشته، اظهارنامه مالیاتی و اسناد منبع درآمد الزامی است.</span></li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {incomeRows.map((row, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <row.icon className="h-5 w-5 text-indigo-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-300 mb-1">{row.label}</div>
                  <div className="text-base font-black text-amber-300">{row.value}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{row.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* --- شرایط عمومی --- */}
          <div id="requirements" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-indigo-400" /> سایر شرایط لازم (General Requirements)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              علاوه بر درآمد، متقاضی باید چهار شرط عمومی را نیز برآورده کند:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {generalRequirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <req.icon className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white mb-1">{req.title}</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">{req.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
              <p className="text-[11px] text-amber-200 leading-relaxed">
                <strong>نکته مسکن:</strong> اجاره‌نامه باید رسمی و حداقل یک‌ساله باشد. ارائه «تعیین وقت قبلی»
                یا «رزرو هتل» کافی نیست. برخی Préfecture ها گواهی مالکیت یا قرارداد رسمی با مالک را نیز می‌پذیرند.
              </p>
            </div>
          </div>

          {/* --- فرآیند --- */}
          <div id="process" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-amber-400" /> فرآیند درخواست — گام‌به‌گام
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              کل فرآیند از آماده‌سازی مدارک تا دریافت اولین کارت اقامت، معمولاً بین <strong>۴ تا ۸ ماه</strong>
              طول می‌کشد. بخش زیادی از این زمان به انتظار برای وقت سفارت و تأیید OFII بستگی دارد.
            </p>
            <div className="space-y-3">
              {processSteps.map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-amber-400 text-[#082833] grid place-items-center text-xs font-black">{item.step}</span>
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

          {/* --- تمدید --- */}
          <div id="renewal" className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Clock className="h-6 w-6 text-sky-400" /> تمدید و مسیر اقامت دائم
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              پس از ورود با VLS-TS، کارت اقامت اولیه معمولاً برای <strong>یک سال</strong> صادر می‌شود و
              باید سالانه در Préfecture محل سکونت تمدید شود. پس از <strong>۵ سال اقامت قانونی مستمر</strong>
              و پرداخت مالیات، امکان درخواست <strong>Carte de résident ۱۰ ساله</strong> فراهم می‌شود.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {renewalTimeline.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className={`text-xs font-black ${item.color} mb-1`}>{item.stage}</div>
                  <div className="text-sm font-bold text-white">{item.duration}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{item.condition}</div>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/20">
              <p className="text-[11px] text-sky-200 leading-relaxed">
                <strong>حضور فیزیکی:</strong> برای حفظ اقامت، باید سالانه حداقل <strong>۶ ماه</strong> در فرانسه
                حضور داشته باشید. غیبت‌های طولانی می‌تواند به لغو اقامت منجر شود. برای Carte de résident،
                این شرط سخت‌گیرانه‌تر است.
              </p>
            </div>
          </div>

          {/* --- الحاق خانواده --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-emerald-400" /> الحاق خانواده
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-3">
              یکی از مزایای این اقامت، امکان همراهی خانواده است:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong>همسر/شریک ثبت‌شده</strong> می‌تواند درخواست دهد.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span><strong>فرزندان زیر ۱۸ سال</strong> می‌توانند در مدارس فرانسه ثبت‌نام کنند (تحصیل رایگان).</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>هر عضو باید <strong>مستقلاً</strong> شرایط عمومی (بیمه، مسکن، درآمد) را برآورده کند.</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /><span>درآمد مورد نیاز برای خانواده <strong>بالاتر</strong> است (بر اساس جدول فوق).</span></li>
            </ul>
          </div>

          {/* --- هزینه زندگی --- */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Utensils className="h-6 w-6 text-amber-400" /> هزینه زندگی در فرانسه (۲۰۲۶)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">
              هزینه زندگی در فرانسه بسته به شهر بسیار متفاوت است. پاریس گران‌ترین شهر و شهرهای جنوبی
              (نیس، کن) نیز هزینه بالایی دارند. شهرهای مرکزی و غربی (لیون، بوردو، نانت) اقتصادی‌تر هستند.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-4">
              <table className="w-full text-xs md:text-sm text-right">
                <thead className="bg-white/5 text-indigo-300 font-bold">
                  <tr>
                    <th className="p-3">شهر</th>
                    <th className="p-3">اجاره ماهانه (T2)</th>
                    <th className="p-3">هزینه کل ماهانه (تخمینی)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="p-3 text-slate-200">پاریس</td><td className="p-3 font-black text-white">€۱,۵۰۰ – €۲,۲۰۰</td><td className="p-3 text-slate-300">€۲,۵۰۰ – €۳,۵۰۰</td></tr>
                  <tr><td className="p-3 text-slate-200">نیس / کن</td><td className="p-3 font-black text-white">€۹۰۰ – €۱,۴۰۰</td><td className="p-3 text-slate-300">€۱,۷۰۰ – €۲,۳۰۰</td></tr>
                  <tr><td className="p-3 text-slate-200">لیون / بوردو</td><td className="p-3 font-black text-white">€۷۰۰ – €۱,۰۰۰</td><td className="p-3 text-slate-300">€۱,۴۰۰ – €۱,۹۰۰</td></tr>
                  <tr><td className="p-3 text-slate-200">نانت / رن</td><td className="p-3 font-black text-white">€۵۵۰ – €۸۰۰</td><td className="p-3 text-slate-300">€۱,۲۰۰ – €۱,۶۰۰</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* --- نتیجه‌گیری --- */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-indigo-400" /> نتیجه‌گیری
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed text-justify">
              ویزای Visiteur فرانسه با درآمد معادل <strong className="text-white">SMIC (~€۱,۸۵۰/ماه)</strong>،
              مسکن معتبر، بیمه خصوصی و مسیر روشن به <strong className="text-white">کارت اقامت ۱۰ ساله</strong>
              و <strong className="text-white">تابعیت فرانسه</strong>، یکی از جذاب‌ترین مسیرهای اقامت غیرسرمایه‌گذاری
              در اروپا است. کلید موفقیت، <strong className="text-indigo-300">پرونده‌سازی دقیق</strong> و آشنایی با
              سلیقه Préfecture محل سکونت است. اگر درآمد غیرفعال شما با آستانه‌های ۲۰۲۶ همخوانی دارد، توصیه می‌کنیم
              از همین حالا پرونده خود را با کارشناسان دیاکو آماده کنید تا در اولین فرصت، درخواست VLS-TS ثبت شود.
            </p>
          </div>
        </div>
      </article>

      {/* ---------- نظرات ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">تجربه متقاضیان دیاکو</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <Quote className="h-8 w-8 text-indigo-400/50 mb-3" />
              <p className="text-sm text-slate-200 leading-relaxed mb-4">«{t.text}»</p>
              <footer className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-black text-emerald-300">{t.name.charAt(0)}</div>
                <div>
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-slate-400">{t.role}</div>
                </div>
                <div className="mr-auto flex gap-0.5">
                  {[...Array(5)].map((_, s) => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
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
              <button type="button" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold hover:text-indigo-300 transition"
                aria-expanded={openFaq === idx}>
                <span>{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${openFaq === idx ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA نهایی ---------- */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-indigo-400/30 bg-gradient-to-l from-indigo-500/10 via-indigo-400/5 to-transparent p-6 md:p-10 text-center">
          <Sparkles className="h-8 w-8 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-black mb-2">پرونده خود را برای ویزای Visiteur آماده کنید</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            کارشناسان دیاکو درآمد غیرفعال شما را ارزیابی می‌کنند، مدارک را دقیق بسته‌بندی می‌کنند و شما را در انتخاب شهر و Préfecture مناسب راهنمایی می‌کنند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={onOpenAssessment} className="rounded-2xl bg-[#f5a623] px-6 py-3 text-xs md:text-sm font-black text-[#082833] hover:brightness-110">
              ارزیابی شانس ویزای Visiteur
            </button>
            <button type="button" onClick={handleCopyPhone} className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs md:text-sm font-bold hover:bg-white/10 inline-flex items-center gap-2">
              <Copy className="h-4 w-4 text-indigo-400" />
              {copiedPhone ? 'شماره کپی شد!' : 'مشاوره مستقیم با کارشناسان'}
            </button>
          </div>
        </div>
      </section>

      {/* ---------- فوتر ---------- */}
      <footer className="border-t border-white/10 bg-[#041418]">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3"><Landmark className="h-6 w-6 text-indigo-400" /><span className="font-black">دیاکو</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">هلدینگ مهاجرتی دیاکو — خدمات تخصصی اقامت تمکن مالی در فرانسه و اروپا.</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">لینک‌های سریع</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#article" className="hover:text-indigo-300">مقاله</a></li>
                <li><a href="#income" className="hover:text-indigo-300">درآمد</a></li>
                <li><a href="#requirements" className="hover:text-indigo-300">شرایط</a></li>
                <li><a href="#process" className="hover:text-indigo-300">فرآیند</a></li>
                <li><a href="#renewal" className="hover:text-indigo-300">تمدید</a></li>
                <li><a href="#faq" className="hover:text-indigo-300">سوالات</a></li>
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
              <div className="flex items-center gap-2 text-xs text-emerald-300"><ShieldCheck className="h-4 w-4" /><span>مشاوره تخصصی و شفاف</span></div>
              <p className="text-[10px] text-slate-500 mt-2">© ۲۰۲۶ دیاکو. تمامی حقوق محفوظ است.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FinancialFrancePage;