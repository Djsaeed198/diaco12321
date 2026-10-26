import React, { useState } from 'react';
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
  Search,
  ShieldCheck,
  Building2,
  Scale,
  Award,
  Euro,
  FileCheck2,
  Users,
  Calculator,
  TrendingUp,
  Globe,
  AlertTriangle,
  BookOpen,
  MapPin,
  Briefcase,
  GraduationCap,
  Languages,
  Star,
  Plane,
  Home,
  FileWarning,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const JobSeekerAustriaPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useSeo({
    title: 'ویزای جستجوی کار اتریش ۲۰۲۶ | RWR ویژه نخبگان + ۷۰ امتیاز',
    description:
      'راهنمای کامل ویزای ۶ ماهه Jobseeker اتریش ۲۰۲۶ ویژه متقاضیان با صلاحیت بسیار بالا؛ کسب ۷۰ امتیاز از ۱۰۰، جدول امتیازدهی AMS، امکان ماندن در اتریش پس از یافتن کار (قانون جدید ۲۰۲۶) با دفتر وین دیاکو.',
    canonical: '/guides/jobseeker-austria',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'ویزای جستجوی کار اتریش ۲۰۲۶',
      'Jobseeker Visa Austria',
      'کارت قرمز سفید قرمز اتریش',
      'Besonders Hochqualifizierte Austria',
      'جدول امتیازات AMS ۷۰',
      'ویزای ۶ ماهه کاریابی وین',
      'RWR Karte نخبگان',
      'قانون جدید ماندن در اتریش ۲۰۲۶',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/jobseeker-austria#article',
          headline: 'راهنمای جامع ویزای ۶ ماهه جستجوی کار اتریش ۲۰۲۶: ۷۰ امتیاز و قانون جدید ماندن',
          description:
            'تحلیل کامل سیستم امتیازدهی ۱۰۰ امتیازی اتریش برای متقاضیان با صلاحیت بسیار بالا (Besonders Hochqualifizierte)، شرایط Jobseeker Visum، و قانون جدید ۲۰۲۶ که اجازه ماندن در اتریش تا صدور RWR Card را می‌دهد.',
          image: [
            'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
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
          dateModified: '2026-10-25',
          inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'Jobseeker Visa Austria' },
            { '@type': 'Thing', name: 'Rot-Weiß-Rot Karte' },
            { '@type': 'Thing', name: 'AMS Punkteystem' },
          ],
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/jobseeker-austria#howto',
          name: 'مراحل دریافت ویزای جستجوی کار اتریش',
          description: 'فرآیند گام‌به‌گام از محاسبه امتیاز تا دریافت RWR Card',
          totalTime: 'P6M',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'محاسبه امتیاز با ماشین‌حساب رسمی',
              text: 'از ماشین‌حساب migration.gv.at برای برآورد امتیاز خود استفاده کنید. حداقل ۷۰ از ۱۰۰ لازم است.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'درخواست ویزا در سفارت اتریش',
              text: 'مدارک اثبات‌کننده امتیاز (مدرک تحصیلی، سابقه کار، مدرک زبان، سن) را به سفارت ارائه دهید.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'بررسی AMS و صدور ویزا',
              text: 'AMS مدارک را بررسی می‌کند. در صورت تأیید، Visum D شش‌ماهه صادر می‌شود.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'جستجوی کار در اتریش',
              text: 'در ۶ ماه حضور در اتریش، با شرکت‌ها مصاحبه کنید. ویزا خودش اجازه کار نمی‌دهد.',
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'درخواست RWR Card از داخل اتریش',
              text: 'با دریافت پیشنهاد شغلی، درخواست RWR Card را از داخل اتریش ثبت کنید. طبق قانون ۲۰۲۶، تا صدور کارت می‌توانید در اتریش بمانید.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/jobseeker-austria#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حداقل امتیاز برای ویزای جستجوی کار اتریش چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حداقل ۷۰ امتیاز از مجموع ۱۰۰ امتیاز سیستم Besonders Hochqualifizierte. این با آستانه ۵۵ امتیازی برای Fachkräfte در مشاغل短缺 متفاوت است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا با Jobseeker Visa می‌توانم در اتریش کار کنم؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. ویزای جستجوی کار فقط اجازه حضور برای مصاحبه و جستجو می‌دهد. برای شروع کار باید ابتدا RWR Card را شخصاً از اداره مهاجرت دریافت کنید.',
              },
            },
            {
              '@type': 'Question',
              name: 'اگر در ۶ ماه کار پیدا نکنم چه می‌شود؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'باید اتریش را ترک کنید. همچنین تا ۱۲ ماه نمی‌توانید دوباره درخواست Jobseeker Visa دهید.',
              },
            },
            {
              '@type': 'Question',
              name: 'قانون جدید ۲۰۲۶ درباره ماندن در اتریش چیست؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'از ژوئن ۲۰۲۶، اگر در طول اعتبار ویزا پیشنهاد شغلی دریافت کنید و درخواست RWR Card ثبت کنید، می‌توانید تا پایان بررسی پرونده در اتریش بمانید و نیازی به خروج از کشور نیست.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا خانواده می‌توانند همراه من بیایند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر، Jobseeker Visa تنها برای متقاضی اصلی است. پس از دریافت RWR Card، همسر و فرزندان زیر ۱۸ سال می‌توانند الحاق شوند.',
              },
            },
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
    <div className="min-h-screen bg-[#061a21] text-white pt-24 pb-16 font-sans" dir="rtl">
      {/* ============================================================
          BREADCRUMB
         ============================================================ */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 transition cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به صفحه اصلی
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>خدمات مهاجرتی دیاکو</span>
            <span>/</span>
            <span>ویزای جستجوی کار</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">ویزای جستجوی کار اتریش</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION 1: HERO
          Image: Vienna skyline / professional
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-300 mb-4">
              <Search className="h-4 w-4 text-red-400" />
              Visum D — ویزای جستجوی کار ویژه نخبگان اتریش ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              ویزای جستجوی کار اتریش ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-red-400">
                (Besonders Hochqualifizierte)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              اتریش برای متخصصان با صلاحیت بسیار بالا که هنوز پیشنهاد شغلی ندارند، ویزای ۶ ماهه{' '}
              <strong className="text-amber-300">Visum D</strong> صادر می‌کند تا در خاک اتریش به دنبال کار
              بگردند. شرط اصلی:{' '}
              <strong className="text-amber-300">کسب حداقل ۷۰ امتیاز از ۱۰۰ امتیاز</strong> سیستم
              Besonders Hochqualifizierte. طبق قانون جدید ژوئن ۲۰۲۶، اگر در طول این ۶ ماه کار پیدا کنید،
              می‌توانید در اتریش بمانید تا RWR Card شما صادر شود — بدون نیاز به خروج از کشور.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۷۰ / ۱۰۰</div>
                <div className="text-[11px] text-slate-300 mt-1">حداقل امتیاز از سیستم AMS</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-red-300">۶ ماه</div>
                <div className="text-[11px] text-slate-300 mt-1">اعتبار Visum D برای جستجو</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">ماندن در اتریش</div>
                <div className="text-[11px] text-slate-300 mt-1">قانون جدید ۲۰۲۶ تا صدور RWR</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                محاسبه امتیاز رسمی اتریش با دیاکو
              </button>
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                تماس مستقیم با دفتر وین دیاکو
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=80"
                alt="ویزای جستجوی کار اتریش - وین و فرصت‌های شغلی نخبگان"
                width={1000}
                height={750}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                  <Building2 className="h-4 w-4" />
                  حضور وکلای رسمی دیاکو در وین
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  پیگیری امتیازات در AMS، تأییدیه دادگستری مدارک، همراهی در مصاحبه‌ها و ثبت اقامت
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: CRITICAL DISTINCTION — 70 vs 55 points
          Image: Comparison / scales
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-amber-500/5 border border-amber-400/20 rounded-3xl p-6 md:p-10">
          <div className="flex items-start gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white mb-2">
                هشدار: ۷۰ امتیاز با ۵۵ امتیاز را اشتباه نگیرید
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                بسیاری از منابع فارسی‌زبان این دو مسیر را با هم اشتباه می‌گیرند. تفاوت بنیادین است.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-red-500/10 border border-red-400/20">
              <h3 className="text-sm font-black text-red-300 mb-3 flex items-center gap-2">
                <Star className="h-4 w-4" />
                مسیر Jobseeker (ویزای جستجوی کار)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">۷۰ امتیاز از ۱۰۰</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />
                  <span>ویژه <strong className="text-white">Besonders Hochqualifizierte</strong> (نخبگان)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />
                  <span>بدون نیاز به پیشنهاد شغلی اولیه</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />
                  <span>۶ ماه حضور برای جستجو</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-500/10 border border-slate-400/20">
              <h3 className="text-sm font-black text-slate-300 mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                مسیر Fachkräfte (متخصصان短缺)
              </h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0" />
                  <span><strong>۵۵ امتیاز از ۹۰</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0" />
                  <span>نیاز به <strong>پیشنهاد شغلی</strong> از کارفرمای اتریشی</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0" />
                  <span>مشاغل در لیست短缺 (Mangelberufe)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0" />
                  <span>ویزای جستجوی کار ندارد</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 text-center">
            منبع: migration.gv.at — ماشین‌حساب رسمی امتیاز [citation:7] و AMS Jobseeker 文件 [citation:14]
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: SCORING TABLE BREAKDOWN
          Image: Calculator / documents / scoring
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 mb-3">
                <Calculator className="h-4 w-4" />
                جدول امتیازدهی رسمی
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                چگونه ۷۰ امتیاز را کسب کنیم؟
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 text-justify">
                سیستم امتیازدهی اتریش ۵ دسته اصلی دارد. هر دسته سقف مشخصی دارد و مجموع سقف‌ها ۱۰۰ است.
                شما باید حداقل ۷۰ امتیاز کسب کنید. مهم‌ترین دسته، «صلاحیت‌های ویژه» با سقف ۴۰ امتیاز است.
              </p>

              <div className="space-y-2.5">
                {[
                  { label: 'صلاحیت‌های ویژه و توانایی‌ها', max: 40, icon: Award, color: 'text-amber-300', detail: 'مدرک ۴ساله=۲۰ | MINT=۳۰ | دکتری=۴۰ | مدیر ارشد=۲۰-۳۰ | پژوهش=۲۰ | جایزه=۲۰' },
                  { label: 'سابقه کار', max: 20, icon: Briefcase, color: 'text-teal-300', detail: 'هر ۶ ماه=۲ | در اتریش هر ۶ ماه=۱۰' },
                  { label: 'زبان (آلمانی/انگلیسی)', max: 10, icon: Languages, color: 'text-emerald-300', detail: 'A1=۵ | A2=۱۰' },
                  { label: 'سن', max: 20, icon: Clock, color: 'text-rose-300', detail: '≤۳۵=۲۰ | ≤۴۰=۱۵ | ≤۴۵=۱۰' },
                  { label: 'تحصیل در اتریش', max: 10, icon: GraduationCap, color: 'text-indigo-300', detail: 'بخشی=۵ | کامل=۱۰' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <Icon className={`h-4 w-4 ${item.color} mt-0.5 shrink-0`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{item.label}</span>
                          <span className={`text-xs font-black ${item.color}`}>{item.max} امتیاز</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-center">
                <span className="text-xs text-emerald-200">
                  مجموع سقف: <strong className="text-white">۱۰۰</strong> | حداقل قبولی:{' '}
                  <strong className="text-white">۷۰</strong>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                  alt="جدول امتیازات ویزای جستجوی کار اتریش - محاسبه ۷۰ امتیاز AMS"
                  width={800}
                  height={533}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                  از ماشین‌حساب رسمی migration.gv.at برای برآورد دقیق استفاده کنید.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-400/20">
                <div className="flex items-start gap-2">
                  <FileWarning className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-red-200 leading-relaxed">
                    <strong>نکته حیاتی:</strong> مدرک زبان A1 فقط ۵ امتیاز دارد. اگر امتیاز شما مرزی است،
                    ارتقا به A2 (۱۰ امتیاز) می‌تواند تفاوت بین قبولی و رد باشد. همچنین سن بالای ۴۵ سال
                    هیچ امتیازی ندارد.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: NEW 2026 LAW — STAY IN AUSTRIA
          Image: Austria parliament / law / documents
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900/60 to-[#061a21] border border-emerald-400/20 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
                alt="قانون جدید ۲۰۲۶ ماندن در اتریش پس از یافتن کار - پارلمان و مدارک رسمی"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                اصلاحیه قانون مهاجرت اتریش، ژوئن ۲۰۲۶ [citation:3]
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 mb-3">
                <Plane className="h-4 w-4" />
                تغییر مهم قانونی
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                دیگر لازم نیست پس از یافتن کار از اتریش خارج شوید
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                پیش از این، اگر پیشنهاد شغلی در روزهای آخر اعتبار ویزا دریافت می‌کردید و پرونده RWR Card
                به پایان نمی‌رسید، باید از اتریش خارج می‌شدید و از خارج منتظر می‌ماندید. از ژوئن ۲۰۲۶،
                با اصلاح قانون مهاجرت، شما می‌توانید{' '}
                <strong className="text-emerald-300">تا صدور کارت RWR در اتریش بمانید</strong>.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white">قبل از ۲۰۲۶</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      اگر پرونده تمام نمی‌شد، خروج اجباری و انتظار از خارج
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30">
                  <Star className="h-4 w-4 text-emerald-300 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-emerald-200">از ژوئن ۲۰۲۶</span>
                    <p className="text-[11px] text-emerald-200/80 mt-0.5">
                      ماندن قانونی در اتریش تا تصمیم نهایی درباره RWR Card
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                * توجه: Jobseeker Visa هنوز اجازه کار نمی‌دهد. تا زمانی که RWR Card را شخصاً دریافت
                نکرده‌اید، شروع به کار ممنوع است. [citation:5]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: WHAT HAPPENS IF YOU DON'T FIND A JOB
          Image: Warning / exit / clock
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-red-500/5 border border-red-400/20 rounded-3xl p-6 md:p-10">
          <div className="flex items-start gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white mb-2">
                اگر در ۶ ماه کار پیدا نکنید چه می‌شود؟
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                این بخش را جدی بگیرید. پیامدها فقط به “خروج از اتریش” محدود نمی‌شود.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <Plane className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <h3 className="text-xs font-bold text-white mb-1">خروج اجباری</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                باید فوراً اتریش را ترک کنید. ویزا قابل تمدید نیست.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <Clock className="h-6 w-6 text-amber-400 mx-auto mb-2" />
              <h3 className="text-xs font-bold text-white mb-1">۱۲ ماه محرومیت</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                تا ۱۲ ماه نمی‌توانید دوباره Jobseeker Visa درخواست دهید.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <Home className="h-6 w-6 text-slate-400 mx-auto mb-2" />
              <h3 className="text-xs font-bold text-white mb-1">خانواده همراه نیستند</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                در طول Jobseeker Visa، خانواده نمی‌توانند الحاق شوند.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 text-center">
            منبع: AMS Jobseeker 信息 — «Sollten Sie innerhalb von sechs Monaten keinen entsprechenden
            Arbeitsplatz finden, wird das Jobseeker-Visum nicht verlängert.» [citation:14]
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: FAQ
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
            <BookOpen className="h-4 w-4" />
            پرسش‌های متداول
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white">
            سوالات پرتکرار ویزای جستجوی کار اتریش
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'چه فاکتورهایی در جدول امتیازات متقاضیان صلاحیت بالا موثر هستند؟',
              a: 'پنج دسته اصلی: (۱) صلاحیت‌های ویژه تا ۴۰ امتیاز (مدرک ۴ساله=۲۰، MINT=۳۰، دکتری=۴۰، مدیر ارشد=۲۰-۳۰، پژوهش=۲۰، جایزه=۲۰)، (۲) سابقه کار تا ۲۰ امتیاز (هر ۶ ماه=۲، در اتریش=۱۰)، (۳) زبان تا ۱۰ امتیاز (A1=۵، A2=۱۰)، (۴) سن تا ۲۰ امتیاز (≤۳۵=۲۰، ≤۴۰=۱۵، ≤۴۵=۱۰)، (۵) تحصیل در اتریش تا ۱۰ امتیاز. حداقل ۷۰ از ۱۰۰ لازم است.',
            },
            {
              q: 'اگر متقاضی در طول ۶ ماه موفق به پیدا کردن کار نشود چه خواهد شد؟',
              a: 'باید خاک اتریش را ترک کند و تا ۱۲ ماه نمی‌تواند دوباره درخواست Jobseeker Visa دهد. ویزا قابل تمدید نیست. اما اگر در طول اعتبار ویزا پیشنهاد شغلی دریافت کنید، می‌توانید درخواست RWR Card را از داخل اتریش ثبت کنید و طبق قانون جدید ۲۰۲۶، تا صدور کارت در اتریش بمانید.',
            },
            {
              q: 'آیا با Jobseeker Visa می‌توانم کار کنم؟',
              a: 'خیر. Jobseeker Visa فقط اجازه حضور برای جستجو و مصاحبه می‌دهد. برای شروع هرگونه کار، باید ابتدا RWR Card (کارت قرمز-سفید-قرمز) را شخصاً از اداره مهاجرت دریافت کنید. کار بدون کارت جرم است و به اقامت شما آسیب می‌زند.',
            },
            {
              q: 'آیا خانواده می‌توانند همراه من بیایند؟',
              a: 'در طول اعتبار Jobseeker Visa، خیر. خانواده فقط پس از دریافت RWR Card می‌توانند الحاق شوند (همسر و فرزندان زیر ۱۸ سال). آنها RWR Card Plus دریافت می‌کنند که اجازه کار دارد.',
            },
            {
              q: 'تفاوت این ویزا با ویزای دانشجویی به قصد کاریابی چیست؟',
              a: 'Jobseeker Visa (Visum D) ویژه متخصصان با صلاحیت بسیار بالا (۷۰ امتیاز) است. ویزای دانشجویی به قصد کاریابی (به اشتباه با همین نام شناخته می‌شود) برای فارغ‌التحصیلان دانشگاه‌های اتریشی است و شرایط متفاوتی دارد. این دو را با هم اشتباه نگیرید.',
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-right text-xs md:text-sm font-bold text-white hover:text-amber-300 transition cursor-pointer"
                aria-expanded={openFaq === idx}
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-amber-400' : ''
                  }`}
                  aria-hidden="true"
                />
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

      {/* ============================================================
          SECTION 7: FINAL CTA
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-l from-[#0b2933] to-[#082833] border border-white/10 rounded-3xl p-8 md:p-12 text-center">
          <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            امتیاز خود را همین حالا محاسبه کنید
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
            وکلای مقیم وین دیاکو امتیاز شما را به‌صورت دقیق بر اساس جدول رسمی AMS محاسبه می‌کنند و
            مسیر رسیدن به ۷۰ امتیاز را طراحی می‌کنند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-[#f5a623] px-8 py-4 text-sm font-black text-[#082833] hover:brightness-110 transition cursor-pointer"
            >
              شروع ارزیابی رایگان
            </button>
            <a
              href="https://wa.me/436889763256"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              گفتگو با دفتر وین
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobSeekerAustriaPage;