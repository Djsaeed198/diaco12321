import OptimizedImage from '../../OptimizedImage';
import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Check,
  Copy,
  Sparkles,
  Laptop,
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
  Home,
  Heart,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const NomadSpainPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSeo({
    title: 'ویزای دیجیتال نوماد اسپانیا ۲۰۲۶ | اقامت ۳ ساله + مالیات ۲۴٪ (Spain DNV)',
    description:
      'راهنمای کامل ویزای دیجیتال نوماد اسپانیا ۲۰۲۶ طبق قانون استارت‌آپ‌ها؛ حداقل درآمد ۲,۷۶۲ یورو در ماه (۲۰۰٪ SMI)، رژیم مالیاتی بکهام ۲۴٪، اقامت ۳ ساله از داخل اسپانیا در UGE با دیاکو.',
    canonical: '/guides/nomad-spain',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'دیجیتال نوماد اسپانیا',
      'ویزای کار از راه دور اسپانیا ۲۰۲۶',
      'Spain Digital Nomad Visa',
      'حداقل درآمد دیجیتال نوماد اسپانیا ۲۷۶۲ یورو',
      'قانون بکهام اسپانیا ۲۴ درصد',
      'اقامت ۳ ساله UGE مادرید',
      'Ley de Startups اسپانیا',
      'رژیم بکهام نوماد دیجیتال',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/nomad-spain#article',
          headline: 'راهنمای جامع ویزای دیجیتال نوماد اسپانیا ۲۰۲۶: شرایط، درآمد ۲,۷۶۲ یورو و مالیات ۲۴٪',
          description:
            'بررسی قانون استارت‌آپ‌های اسپانیا (Ley 28/2022) برای متقاضیان دورکاری: درآمد حداقل ۲۰۰٪ SMI معادل ۲,۷۶۲ یورو در ماه، رژیم مالیاتی بکهام ۲۴٪، الحاق خانواده و مسیر اقامت دائم ۵ ساله.',
          image: [
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
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
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.dia-co.ir/logo.png',
            },
          },
          datePublished: '2026-01-01',
          dateModified: '2026-10-25',
          inLanguage: 'fa-IR',
          about: [
            { '@type': 'Thing', name: 'ویزای دیجیتال نوماد اسپانیا' },
            { '@type': 'Thing', name: 'Ley de Startups' },
            { '@type': 'Thing', name: 'رژیم مالیاتی بکهام' },
            { '@type': 'Thing', name: 'اقامت UGE' },
          ],
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/nomad-spain#howto',
          name: 'مراحل دریافت ویزای دیجیتال نوماد اسپانیا از داخل کشور',
          description: 'فرآیند گام‌به‌گام درخواست اقامت ۳ ساله از طریق UGE-CE در مادرید',
          totalTime: 'P20D',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'ورود قانونی به اسپانیا',
              text: 'با ویزای توریستی یا سایر ویزاهای معتبر وارد اسپانیا شوید.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'ثبت درخواست در UGE-CE',
              text: 'فرم MI-T را تکمیل و مدارک را از طریق سامانه UGE-CE بارگذاری کنید.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'پرداخت هزینه (Tasa 790-038)',
              text: 'مبلغ ۷۳.۲۶ یورو (۲۰۲۶) را پرداخت کنید.',
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'دریافت تصمیم (۲۰ روز کاری)',
              text: 'در صورت عدم پاسخ در ۲۰ روز کاری، درخواست به‌صورت خودکار تأیید شده تلقی می‌شود (Silencio Positivo).',
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'دریافت کارت TIE',
              text: 'ظرف یک ماه پس از تأیید، کارت اقامت (TIE) را دریافت کنید.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/nomad-spain#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'حداقل درآمد ماهانه برای ویزای دیجیتال نوماد اسپانیا در ۲۰۲۶ چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'حداقل درآمد ناخالص ماهانه ۲,۷۶۲ یورو (۲۰۰٪ حداقل دستمزد SMI) برای متقاضی اصلی است. برای همسر ۷۵٪ SMI (حدود ۲,۰۷۲ یورو) و برای هر فرزند ۲۵٪ SMI (حدود ۶۹۱ یورو) اضافه می‌شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا ویزای دیجیتال نوماد اسپانیا به‌طور خودکار رژیم مالیاتی بکهام را اعطا می‌کند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'خیر. ویزای اقامت و رژیم بکهام دو فرآیند جداگانه هستند. باید فرم Modelo 149 را ظرف ۶ ماه از تاریخ ثبت‌نام در تأمین اجتماعی اسپانیا به اداره مالیات (AEAT) ارائه دهید. در غیر این صورت، مشمول نرخ تصاعدی IRPF (تا ۴۷٪) خواهید شد.',
              },
            },
            {
              '@type': 'Question',
              name: 'نرخ مالیات بکهام برای نومادهای دیجیتال چند درصد است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'نرخ ثابت ۲۴٪ برای درآمدهای تا سقف ۶۰۰,۰۰۰ یورو در سال. درآمدهای بالاتر از این سقف مشمول نرخ ۴۷٪ می‌شوند. این رژیم به مدت ۶ سال (سال اول + ۵ سال بعد) قابل استفاده است.',
              },
            },
            {
              '@type': 'Question',
              name: 'آیا می‌توان در حین اقامت در اسپانیا مشتری محلی داشت؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'بله، اما حداکثر ۲۰٪ از کل درآمد شما می‌تواند از شرکت‌های داخل اسپانیا باشد. ۸۰٪ اصلی باید از خارج از اسپانیا تأمین شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'تفاوت درخواست از داخل اسپانیا و از کنسولگری چیست؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'از داخل اسپانیا (UGE-CE): اقامت اولیه ۳ ساله، قابل تمدید ۲ سال، تصمیم در ۲۰ روز کاری. از کنسولگری: ویزای ۱ ساله که قابل تمدید نیست و باید قبل از انقضا در UGE درخواست اقامت دهید.',
              },
            },
          ],
        },
      ],
    },
  });

  return (
    <div className="min-h-screen bg-[#061a21] text-white pt-24 pb-16 font-sans" dir="rtl">
      {/* ============================================================
          BREADCRUMB + NAVIGATION
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
            <span>دیجیتال نوماد و فریلنسر</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">دیجیتال نوماد اسپانیا</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          SECTION 1: HERO
          Image: Barcelona remote worker / Mediterranean coast
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-xs font-bold text-teal-300 mb-4">
              <Laptop className="h-4 w-4 text-teal-400" />
              Ley 28/2022 — اقامت کار از راه دور اسپانیا ۲۰۲۶
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              ویزای دیجیتال نوماد اسپانیا ۲۰۲۶{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-teal-400">
                (Spain Digital Nomad)
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8 text-justify">
              اسپانیا با آب‌وهوای مدیترانه‌ای، اینترنت پرسرعت (اولین کشور اروپا در فیبر نوری) و کیفیت بالای زندگی،
              محبوب‌ترین مقصد دیجیتال نومادها در جهان است. طبق قانون ۲۸/۲۰۲۲ (Ley de Startups)، کارمندان دورکار و
              فریلنسرهایی که برای شرکت‌های خارج از اسپانیا کار می‌کنند، می‌توانند مستقیماً کارت اقامت{' '}
              <strong className="text-amber-300">۳ ساله شینگن</strong> دریافت کرده و از رژیم مالیاتی ویژه{' '}
              <strong className="text-amber-300">بکهام با نرخ ثابت ۲۴٪</strong> بهره‌مند شوند.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-amber-300">۲,۷۶۲ €</div>
                <div className="text-[11px] text-slate-300 mt-1">حداقل درآمد ماهانه (۲۰۰٪ SMI ۲۰۲۶)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-teal-300">مالیات ۲۴٪</div>
                <div className="text-[11px] text-slate-300 mt-1">نرخ ثابت رژیم بکهام (تا €۶۰۰k)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="text-lg font-black text-emerald-400">اقامت ۳ ساله</div>
                <div className="text-[11px] text-slate-300 mt-1">درخواست مستقیم از داخل اسپانیا (UGE)</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-[#f5a623] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow hover:brightness-110 transition cursor-pointer"
              >
                ارزیابی رایگان شرایط نوماد اسپانیا
              </button>
              <a
                href="https://wa.me/989197340829"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                مشاوره با وکلای اسپانیای دیاکو
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                alt="دیجیتال نوماد اسپانیا - کار از راه دور در بارسلونا با لپ‌تاپ و نمای دریای مدیترانه"
                width={1000}
                height={750}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a21] via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 rounded-2xl bg-black/70 backdrop-blur-md p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
                  <Building2 className="h-4 w-4" />
                  بررسی ۲۰ روزه در واحد UGE مادرید
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  امکان ورود با ویزای توریستی و تبدیل به اقامت ۳ ساله، افتتاح حساب بانکی، اخذ NIE و ثبت مالیاتی
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: INCOME THRESHOLD DEEP DIVE
          Image: Financial planning / calculator / euros
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 mb-3">
                <Calculator className="h-4 w-4" />
                آستانه درآمد ۲۰۲۶
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                حداقل درآمد برای ویزای دیجیتال نوماد اسپانیا چقدر است؟
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                وزارت شمول، تأمین اجتماعی و مهاجرت اسپانیا آستانه درآمد را برای سال ۲۰۲۶ تثبیت کرده است:{' '}
                <strong className="text-amber-300">۲۰۰٪ حداقل دستمزد سالانه (SMI)</strong> که معادل{' '}
                <strong className="text-amber-300">۲,۷۶۲ یورو ناخالص در ماه</strong> (۱۴ پرداخت) است[citation:8].
                این رقم برای متقاضی اصلی است و برای اعضای خانواده به‌صورت پلکانی اضافه می‌شود.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white">متقاضی اصلی</span>
                    <span className="text-xs text-slate-300 mr-2">۲,۷۶۲ € / ماه</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Users className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white">همسر / شریک زندگی</span>
                    <span className="text-xs text-slate-300 mr-2">+ ۷۵٪ SMI ≈ ۲,۰۷۲ € / ماه</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Heart className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white">هر فرزند</span>
                    <span className="text-xs text-slate-300 mr-2">+ ۲۵٪ SMI ≈ ۶۹۱ € / ماه</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-200 leading-relaxed">
                    <strong>نکته مهم:</strong> حداقل ۸۰٪ درآمد شما باید از خارج از اسپانیا باشد. حداکثر ۲۰٪
                    می‌تواند از مشتریان یا کارفرمایان داخل اسپانیا تأمین شود[citation:10].
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                alt="حداقل درآمد ویزای دیجیتال نوماد اسپانیا ۲۰۲۶ - ماشین‌حساب و اسناد مالی به یورو"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                آستانه درآمد ۲۰۰٪ SMI برای سال ۲۰۲۶ به‌طور رسمی ۲,۷۶۲ یورو در ماه تأیید شده است.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: BECKHAM LAW DEEP DIVE
          Image: Tax forms / percentage / financial documents
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-[#061a21] border border-indigo-400/20 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                alt="رژیم مالیاتی بکهام اسپانیا - فرم‌های مالیاتی Modelo 149 و نرخ ۲۴ درصد"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                فرم Modelo 149 باید ظرف ۶ ماه از ثبت‌نام در تأمین اجتماعی ارائه شود.
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-indigo-300 mb-3">
                <Scale className="h-4 w-4" />
                رژیم مالیاتی ویژه
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                قانون بکهام (Beckham Law) و مالیات ۲۴٪
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                یکی از بزرگ‌ترین جذابیت‌های ویزای نوماد اسپانیا، دسترسی به رژیم مالیاتی ویژه‌ای است که به نام
                فوتبالیست انگلیسی، دیوید بکهام، شناخته می‌شود. طبق این رژیم، شما به‌جای نرخ تصاعدی IRPF
                (که می‌تواند تا ۴۷٪ برسد)، تنها{' '}
                <strong className="text-amber-300">۲۴٪ مالیات ثابت</strong> بر درآمدهای اسپانیایی تا سقف
                ۶۰۰,۰۰۰ یورو پرداخت می‌کنید[citation:9].
              </p>

              <div className="space-y-3 mb-6">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-300">درآمد تا ۶۰۰,۰۰۰ €</span>
                    <span className="text-lg font-black text-white">۲۴٪</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[24%] bg-emerald-400 rounded-full" />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-400/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-rose-300">درآمد بالای ۶۰۰,۰۰۰ €</span>
                    <span className="text-lg font-black text-white">۴۷٪</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[47%] bg-rose-400 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-white">مهلت حیاتی:</strong> فرم{' '}
                    <strong className="text-amber-300">Modelo 149</strong> را باید ظرف{' '}
                    <strong className="text-amber-300">۶ ماه</strong> از تاریخ ثبت‌نام در تأمین اجتماعی
                    اسپانیا (Seguridad Social) به اداره مالیات (AEAT) ارائه دهید. تأخیر حتی یک روزه به معنای
                    از دست دادن دائمی این رژیم است[citation:4].
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                * توجه: ویزای نوماد اسپانیا به‌طور خودکار رژیم بکهام را اعطا نمی‌کند. این دو فرآیند جداگانه
                هستند و باید به‌طور مستقل اقدام کنید[citation:4].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: UGE APPLICATION PROCESS
          Image: Madrid government building / documents / stamp
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 mb-2">
              <FileCheck2 className="h-4 w-4" />
              فرآیند درخواست
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              دو مسیر برای دریافت اقامت نوماد اسپانیا
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
                alt="درخواست اقامت UGE مادرید - ساختمان دولتی و فرآیند اداری ویزای نوماد اسپانیا"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
                alt="مدارک ویزای دیجیتال نوماد اسپانیا - پاسپورت و فرم‌های رسمی"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-400/20">
              <h3 className="text-sm font-black text-teal-300 mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                از داخل اسپانیا (UGE-CE)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 mt-0.5 shrink-0" />
                  اقامت اولیه ۳ ساله (قابل تمدید ۲ سال)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 mt-0.5 shrink-0" />
                  تصمیم در ۲۰ روز کاری (Positive Silence)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 mt-0.5 shrink-0" />
                  نیاز به ورود قانونی قبلی (توریستی یا سایر)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 mt-0.5 shrink-0" />
                  هزینه Tasa 790-038: ۷۳.۲۶ یورو
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/20">
              <h3 className="text-sm font-black text-amber-300 mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                از کنسولگری (خارج از اسپانیا)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  ویزای اولیه ۱ ساله (غیرقابل تمدید)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  تصمیم در ۱۰ روز کاری
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  باید قبل از انقضا در UGE درخواست اقامت دهید
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                  نیاز به NIE و مدارک ترجمه رسمی
                </li>
              </ul>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-6 text-center leading-relaxed">
            توصیه دیاکو: اگر در اسپانیا حضور دارید، مسیر UGE-CE با اقامت ۳ ساله اولیه انتخاب بهتری است.
            در غیر این صورت، ویزای کنسولگری مسیر استاندارد است.
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: FAMILY REUNIFICATION
          Image: Family in Spain / lifestyle
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-rose-300 mb-3">
                <Users className="h-4 w-4" />
                الحاق خانواده
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                خانواده شما هم می‌توانند همراهتان بیایند
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 text-justify">
                یکی از مزایای کلیدی ویزای دیجیتال نوماد اسپانیا، امکان الحاق همزمان خانواده است. همسر یا شریک
                ثبت‌شده، فرزندان زیر ۱۸ سال و حتی والدین وابسته می‌توانند همراه با متقاضی اصلی درخواست
                دهند و کارت اقامت دریافت کنند.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  همسر/شریک: حق کار در اسپانیا را دارد
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  فرزندان: دسترسی به سیستم آموزشی رایگان
                </li>
                <li className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  والدین وابسته: با اثبات وابستگی مالی
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80"
                alt="الحاق خانواده ویزای دیجیتال نوماد اسپانیا - خانواده در ساحل اسپانیا"
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-white/5 text-[10px] text-slate-400 text-center">
                همسر و فرزندان می‌توانند همزمان با متقاضی اصلی درخواست دهند.
              </div>
            </div>
          </div>
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
            سوالات پرتکرار دیجیتال نوماد اسپانیا
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              q: 'آیا برای این ویزا مدرک تحصیلی دانشگاهی الزامی است؟',
              a: 'خیر. متقاضی یا باید مدرک کارشناسی مرتبط داشته باشد، یا دست‌کم ۳ سال سابقه کار مستند و حرفه‌ای در حوزه شغلی خود ارائه دهد. برای فریلنسرها، داشتن قرارداد با حداقل یک مشتری خارجی به مدت ۳ ماه و سابقه فعالیت شرکت مشتری (حداقل ۱ سال) الزامی است[citation:1][citation:6].',
            },
            {
              q: 'آیا می‌توان همزمان با کار برای شرکت خارجی، در اسپانیا مشتری محلی داشت؟',
              a: 'بله، اما با محدودیت. حداکثر ۲۰٪ از کل درآمد شما می‌تواند از شرکت‌های داخل اسپانیا باشد. ۸۰٪ اصلی باید از خارج از اسپانیا تأمین شود. این قانون برای هر دو گروه (کارمند و فریلنسر) اعمال می‌شود[citation:10].',
            },
            {
              q: 'وضعیت همراهی خانواده چگونه است؟',
              a: 'همسر، فرزندان و حتی والدین وابسته می‌توانند همزمان با متقاضی اصلی کارت اقامت دریافت کنند. برای نفر اول خانواده حدود ۷۵٪ SMI (≈۲,۰۷۲ یورو) و برای هر نفر بعدی ۲۵٪ SMI (≈۶۹۱ یورو) به تمکن مالی افزوده می‌شود. همسر حق کار در اسپانیا را دارد[citation:8].',
            },
            {
              q: 'آیا ویزای نوماد به‌طور خودکار رژیم بکهام را فعال می‌کند؟',
              a: 'خیر. این دو فرآیند کاملاً جداگانه هستند. ویزا توسط وزارت مهاجرت و رژیم بکهام توسط اداره مالیات (AEAT) مدیریت می‌شود. باید فرم Modelo 149 را ظرف ۶ ماه از ثبت‌نام در تأمین اجتماعی ارائه دهید. بدون این فرم، مشمول نرخ تصاعدی IRPF (تا ۴۷٪) خواهید بود[citation:4].',
            },
            {
              q: 'پس از ۳ سال اقامت چه اتفاقی می‌افتد؟',
              a: 'اقامت اولیه ۳ ساله قابل تمدید برای ۲ سال دیگر است. پس از ۵ سال اقامت مستمر، می‌توانید برای اقامت دائم (Residencia de Larga Duración) درخواست دهید. پس از ۱۰ سال نیز امکان درخواست تابعیت اسپانیا وجود دارد (برای کشورهای آمریکای لاتین ۲ سال)[citation:5].',
            },
            {
              q: 'آیا می‌توانم در حین اقامت شغلم را تغییر دهم یا فریلنسر شوم؟',
              a: 'بله، اما باید شرایط اولیه (درآمد، نسبت ۸۰/۲۰ و ...) را حفظ کنید. تغییر از کارمند به فریلنسر یا برعکس مجاز است، اما باید مدارک جدید را به UGE ارائه دهید. اگر درآمد شما به زیر آستانه برسد، ممکن است اقامت شما تمدید نشود.',
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
            مسیر شما به اسپانیا از اینجا شروع می‌شود
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
            وکلای مقیم مادرید دیاکو پرونده شما را از ابتدا تا دریافت کارت اقامت همراهی می‌کنند. ارزیابی
            رایگان شرایط، بررسی مدارک و برنامه‌ریزی مالیاتی بکهام.
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
              href="https://wa.me/989197340829"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              گفتگو با کارشناس
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NomadSpainPage;