import React, { useState, useMemo } from 'react';
import {
  Calculator,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  Euro,
  Coins,
  Building2,
  Scale,
  Users,
  ShieldAlert,
  FileCheck2,
  HelpCircle,
  TrendingDown,
  Wallet,
  Home,
  Check,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';
import { toPersianDigits } from '../../../utils/persian';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

type CountryKey = 'austria' | 'germany' | 'greece' | 'spain' | 'france' | 'italy';
type PathwayKey = 'financial' | 'bluecard' | 'study' | 'golden' | 'business';

export const CostCalculatorPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryKey>('austria');
  const [selectedPath, setSelectedPath] = useState<PathwayKey>('financial');
  const [familyMembers, setFamilyMembers] = useState<number>(1);
  const [eurRate, setEurRate] = useState<number>(115000); // نرخ تقریبی تومان
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useSeo({
    title: 'محاسبه‌گر آنلاین هزینه‌های مهاجرت به اروپا ۲۰۲۶ | تمکن مالی، مسکن و ویزا',
    description:
      'محاسبه دقیق و شفاف هزینه‌های مهاجرت به اتریش، آلمان، اسپانیا، یونان و فرانسه؛ برآورد تمکن مالی بانکی، اجاره مسکن رسمی، عوارض سفارت، هزینه‌های حقوقی وکلای دیاکو با تبدیل زنده یورو به تومان.',
    canonical: '/guides/cost-calculator',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'محاسبه گر هزینه مهاجرت ۲۰۲۶',
      'هزینه مهاجرت به اتریش',
      'هزینه تمکن مالی اروپا',
      'حداقل تمکن بانکی برای شینگن',
      'هزینه اجاره خانه در وین و برلین',
      'عوارض صدور ویزای اتریش MA35',
      'هزینه وکیل مهاجرتی اروپا دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/cost-calculator#article',
          headline: 'راهنمای جامع و محاسبه‌گر هزینه‌های واقعی مهاجرت به اروپا در سال ۲۰۲۶',
          description:
            'تحلیل هزینه‌های پنهان و آشکار مهاجرت به کشورهای پیشرو اروپایی؛ بودجه‌بندی استاندارد برای تمکن مالی، بلوکارت، پذیرش تحصیلی و سرمایه‌گذاری ملکی تحت نظارت وکلای دیاکو.',
          image: [
            'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
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
        },
        {
          '@type': 'HowTo',
          '@id': 'https://www.dia-co.ir/guides/cost-calculator#howto',
          name: 'نحوه محاسبه و تامین بودجه مهاجرت به اروپا',
          step: [
            {
              '@type': 'HowToStep',
              name: 'تعیین مسیر اقامتی و کشور مقصد',
              text: 'انتخاب نوع روش اقامتی بر اساس سرمایه در گردش، سن، سوابق تحصیلی و زبان.',
            },
            {
              '@type': 'HowToStep',
              name: 'تامین و تثبیت حداقل سپرده بانکی قانونی',
              text: 'آماده‌سازی تمکن مالی در حساب ارزی یا ریالی با گردش ۶ ماهه شفاف و بدون واریزی‌های مشکوک.',
            },
            {
              '@type': 'HowToStep',
              name: 'برآورد ودیعه و اجاره رسمی مسکن',
              text: 'تنظیم قرارداد رسمی اجاره مسکن منطبق بر متراژ استاندارد شهرداری‌های اروپایی.',
            },
            {
              '@type': 'HowToStep',
              name: 'پرداخت عوارض دولتی و بیمه بین‌المللی',
              text: 'پرداخت فیش‌های کنسولی سفارت، عوارض اداره اقامت و خرید بیمه درمانی جامع شینگن.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/cost-calculator#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'آیا مبالغ تمکن مالی باید به حساب دولت کشور اروپایی واریز شود یا در حساب خودمان می‌ماند؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'در روش تمکن مالی (خودحمایتی)، کل سرمایه در حساب بانکی شخصی شما باقی می‌ماند و نیازی به واگذاری یا بلوکه شدن توسط دولت اتریش، اسپانیا یا فرانسه نیست؛ تنها باید پرینت گردش حساب و موجودی اثبات شود.',
              },
            },
            {
              '@type': 'Question',
              name: 'حداقل بودجه مورد نیاز برای مهاجرت کاری با بلوکارت اروپا چقدر است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'ویزای بلوکارت به دلیل داشتن قرارداد کاری با حقوق رسمی، کم‌هزینه‌ترین مسیر است و تنها نیاز به تامین هزینه‌های اولیه سفر، اجاره مسکن ۱ تا ۲ ماه و عوارض اداری سفارت به مبلغ حدود ۳ الی ۵ هزار یورو دارد.',
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

  const calculatedCost = useMemo(() => {
    let blockedEur = 0;
    let rentEur = 0;
    let insuranceEur = 350 * familyMembers;
    let translationEur = 400 * familyMembers;
    let govFeeEur = 0;

    if (selectedCountry === 'austria') {
      if (selectedPath === 'financial') {
        blockedEur = 26000 + (familyMembers > 1 ? (familyMembers - 1) * 14000 : 0);
        rentEur = (1200 + (familyMembers > 1 ? (familyMembers - 1) * 300 : 0)) * 3;
        govFeeEur = 320 * familyMembers;
      } else if (selectedPath === 'bluecard') {
        blockedEur = 4500;
        rentEur = 1100 * 2;
        govFeeEur = 280;
      } else if (selectedPath === 'study') {
        blockedEur = 14500;
        rentEur = 650 * 3;
        govFeeEur = 200;
      } else if (selectedPath === 'golden') {
        blockedEur = 150000;
        rentEur = 0;
        govFeeEur = 2500;
      } else {
        blockedEur = 35000;
        rentEur = 1200 * 3;
        govFeeEur = 1500;
      }
    } else if (selectedCountry === 'germany') {
      if (selectedPath === 'financial') {
        blockedEur = 24000 + (familyMembers > 1 ? (familyMembers - 1) * 12000 : 0);
        rentEur = (1100 + (familyMembers > 1 ? (familyMembers - 1) * 250 : 0)) * 3;
        govFeeEur = 300 * familyMembers;
      } else if (selectedPath === 'bluecard') {
        blockedEur = 3800;
        rentEur = 1000 * 2;
        govFeeEur = 250;
      } else if (selectedPath === 'study') {
        blockedEur = 11904; // حساب بلاک‌شده رسمی آلمان
        rentEur = 600 * 3;
        govFeeEur = 150;
      } else {
        blockedEur = 25000;
        rentEur = 1100 * 3;
        govFeeEur = 1200;
      }
    } else if (selectedCountry === 'greece') {
      if (selectedPath === 'golden') {
        blockedEur = 250000;
        rentEur = 0;
        govFeeEur = 2000;
      } else if (selectedPath === 'financial') {
        blockedEur = 24000 * familyMembers;
        rentEur = 750 * 3;
        govFeeEur = 300;
      } else {
        blockedEur = 15000;
        rentEur = 700 * 3;
        govFeeEur = 400;
      }
    } else if (selectedCountry === 'spain') {
      if (selectedPath === 'financial') {
        blockedEur = 28800 + (familyMembers > 1 ? (familyMembers - 1) * 7200 : 0); // طبق شاخص IPREM اسپانیا
        rentEur = 1000 * 3;
        govFeeEur = 250 * familyMembers;
      } else if (selectedPath === 'golden') {
        blockedEur = 500000;
        rentEur = 0;
        govFeeEur = 3000;
      } else {
        blockedEur = 12000;
        rentEur = 800 * 3;
        govFeeEur = 200;
      }
    } else if (selectedCountry === 'france') {
      blockedEur = 22000 + (familyMembers > 1 ? (familyMembers - 1) * 9000 : 0);
      rentEur = 1150 * 3;
      govFeeEur = 280 * familyMembers;
    } else {
      // Italy
      blockedEur = 25000 + (familyMembers > 1 ? (familyMembers - 1) * 8000 : 0);
      rentEur = 900 * 3;
      govFeeEur = 250 * familyMembers;
    }

    const totalEur = blockedEur + rentEur + insuranceEur + translationEur + govFeeEur;
    const totalToman = Math.round((totalEur * eurRate) / 10000000); // به میلیون تومان

    return {
      blockedEur,
      rentEur,
      insuranceEur,
      translationEur,
      govFeeEur,
      totalEur,
      totalToman,
    };
  }, [selectedCountry, selectedPath, familyMembers, eurRate]);

  const COUNTRY_OPTIONS: { id: CountryKey; label: string; flag: string }[] = [
    { id: 'austria', label: 'اتریش', flag: '🇦🇹' },
    { id: 'germany', label: 'آلمان', flag: '🇩🇪' },
    { id: 'spain', label: 'اسپانیا', flag: '🇪🇸' },
    { id: 'greece', label: 'یونان', flag: '🇬🇷' },
    { id: 'france', label: 'فرانسه', flag: '🇫🇷' },
    { id: 'italy', label: 'ایتالیا', flag: '🇮🇹' },
  ];

  const PATHWAY_OPTIONS: { id: PathwayKey; label: string; desc: string }[] = [
    { id: 'financial', label: 'تمکن مالی (خودحمایتی)', desc: 'اقامت بدون اجازه کار محلی با درآمد مستقل' },
    { id: 'bluecard', label: 'بلوکارت و اقامت کاری', desc: 'قرارداد کاری تخصصی با کارفرمای اروپایی' },
    { id: 'study', label: 'پذیرش و اقامت تحصیلی', desc: 'دانشگاه‌های دولتی با شهریه رایگان یا اندک' },
    { id: 'golden', label: 'خرید ملک و ویزای طلایی', desc: 'سرمایه‌گذاری با اقامت دائم بدون شرط حضور' },
    { id: 'business', label: 'ثبت شرکت و کارآفرینی', desc: 'تاسیس بیزینس و توسعه بازار در اتحادیه اروپا' },
  ];

  const FAQS = [
    {
      q: 'آیا سرمایه تمکن مالی به حساب دولت کشور اروپایی واریز یا مسدود می‌شود؟',
      a: 'خیر! در تمامی کشورهای شینگن نظیر اتریش، اسپانیا و فرانسه، کل مبلغ تمکن مالی در حساب شخصی خود متقاضی باقی می‌ماند و هیچ وجهی به حساب دولت یا اداره مهاجرت منتقل نمی‌شود. فقط کافی است گردش ۶ ماهه و برگه تمکن بانکی لاتین ارائه گردد.',
    },
    {
      q: 'هزینه‌های قرارداد رسمی اجاره خانه (Mietvertrag) شامل چه مواردی است؟',
      a: 'ادارات اقامت اروپا (مانند MA35 وین) شرط داشتن مسکن تاییدشده به نسبت تعداد اعضای خانواده را دارند. معمولاً ۳ ماه اجاره به‌علاوه ودیعه اولیه (Kaution) که پس از پایان قرارداد مسترد می‌شود، بودجه‌بندی استاندارد اجاره را تشکیل می‌دهد.',
    },
    {
      q: 'کدام روش مهاجرتی در سال ۲۰۲۶ اقتصادی‌ترین و کم‌ریسک‌ترین است؟',
      a: 'از نظر هزینه‌های نقدی اولیه، ویزای بلوکارت و ویزای کاری کمترین نیاز به سرمایه آزاد را دارند زیرا حقوق ماهانه از کارفرمای اروپایی تامین می‌شود. برای متقاضیان دارای سرمایه، تمکن مالی اتریش به دلیل عدم نیاز به مالیات سنگین و حفظ کامل اصل سرمایه، امن‌ترین راهکار محسوب می‌شود.',
    },
    {
      q: 'نقش وکلای رسمی هلدینگ دیاکو در صرفه‌جویی هزینه‌ها چیست؟',
      a: 'وکلای مقیم وین و آتن دیاکو مانع از هزینه‌کردهای موازی، جریمه‌های ریجکتی، ترجمه‌های نامعتبر و خریدهای گران‌قیمت بیمه یا مسکن واسطه‌ای می‌شوند و با اخذ مستقیم تاییدات اداری، هزینه‌های شما را تا ۳۰ درصد بهینه‌سازی می‌کنند.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#061a21] text-white pt-24 pb-16 font-sans" dir="rtl">
      {/* بردکرامب ناوبری */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-amber-400 hover:text-amber-300 transition cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به صفحه اصلی هلدینگ دیاکو
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>سامانه‌های هوشمند دیاکو</span>
            <span>/</span>
            <span className="text-amber-300 font-bold">محاسبه‌گر هزینه‌های مهاجرت اروپا ۲۰۲۶</span>
          </div>
        </div>
      </div>

      {/* سربرگ هیرو ابزار */}
      <section className="container mx-auto px-4 md:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold text-purple-300 mb-4">
            <Calculator className="h-4 w-4 text-purple-400" />
            سامانه تخصصی برآورد آنلاین بودجه و هزینه‌های مهاجرت ۲۰۲۶
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            محاسبه‌گر هوشمند هزینه‌های <span className="text-[#f5a623]">مهاجرت و تمکن مالی</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-8">
            تخمین شفاف تمام هزینه‌های قانونی، سرمایه در گردش بانکی، اجاره مسکن مورد تایید شهرداری، عوارض رسمی وکلای مقیم و سفارت با امکان تبدیل برخط به تومان.
          </p>
        </div>
      </section>

      {/* پنل اصلی تعاملی محاسبه‌گر */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ستون راست: پارامترهای انتخابی کاربر */}
          <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            {/* ۱. انتخاب کشور */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-amber-300 mb-2.5">
                ۱. کشور مقصد مورد نظر خود را انتخاب کنید:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {COUNTRY_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCountry(c.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition cursor-pointer ${
                      selectedCountry === c.id
                        ? 'border-amber-400 bg-amber-400/20 text-white shadow-glow scale-105'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-2xl mb-1">{c.flag}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ۲. انتخاب روش اقامتی */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-amber-300 mb-2.5">
                ۲. روش مهاجرتی مد نظر:
              </label>
              <div className="space-y-2">
                {PATHWAY_OPTIONS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPath(p.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-right transition cursor-pointer ${
                      selectedPath === p.id
                        ? 'border-[#f5a623] bg-gradient-to-r from-amber-500/15 to-transparent text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-black text-white">{p.label}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{p.desc}</p>
                    </div>
                    <div
                      className={`h-5 w-5 rounded-full border grid place-items-center ${
                        selectedPath === p.id ? 'border-amber-400 bg-amber-400 text-[#082833]' : 'border-white/20'
                      }`}
                    >
                      {selectedPath === p.id && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ۳. تعداد اعضای خانواده */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-amber-300 mb-2.5">
                ۳. تعداد کل اعضای پرونده (شامل متقاضی اصلی، همسر و فرزندان):
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFamilyMembers(num)}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      familyMembers === num
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {num === 1 ? 'مجرد (۱ نفر)' : `${toPersianDigits(num)} نفر`}
                  </button>
                ))}
              </div>
            </div>

            {/* ۴. نرخ برابری ارز */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">
                  نرخ مبنای تبدیل یورو (تومان):
                </label>
                <span className="text-xs font-black text-amber-300">
                  {toPersianDigits(eurRate.toLocaleString())} تومان
                </span>
              </div>
              <input
                type="range"
                min="90000"
                max="150000"
                step="1000"
                value={eurRate}
                onChange={(e) => setEurRate(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#f5a623]"
              />
            </div>
          </div>

          {/* ستون چپ: کارت نمایش نتایج زنده محاسبات */}
          <div className="lg:col-span-5 rounded-3xl border border-amber-400/30 bg-gradient-to-b from-[#082b36] via-[#093340] to-[#07242e] p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

            <div className="border-b border-white/10 pb-4 mb-5">
              <span className="rounded-full bg-amber-400/20 text-amber-300 px-3 py-0.5 text-[11px] font-bold">
                برآورد رسمی هلدینگ دیاکو
              </span>
              <h3 className="text-xl font-black text-white mt-2">
                خلاصه بودجه مورد نیاز در {COUNTRY_OPTIONS.find((c) => c.id === selectedCountry)?.label}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                برای {familyMembers === 1 ? 'متقاضی مجرد' : `خانواده ${toPersianDigits(familyMembers)} نفره`} در روش {PATHWAY_OPTIONS.find((p) => p.id === selectedPath)?.label}
              </p>
            </div>

            {/* ریز تفکیک هزینه‌ها */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Wallet className="h-4 w-4 text-amber-400" />
                  تمکن بانکی / سرمایه نقدی متقاضی:
                </span>
                <span className="font-black text-white text-sm">
                  €{toPersianDigits(calculatedCost.blockedEur.toLocaleString())}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Home className="h-4 w-4 text-sky-400" />
                  اجاره مسکن و ودیعه اولیه (۳ ماه):
                </span>
                <span className="font-black text-white text-sm">
                  €{toPersianDigits(calculatedCost.rentEur.toLocaleString())}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-emerald-400" />
                  عوارض دولتی، شهرداری و کنسولی:
                </span>
                <span className="font-black text-white text-sm">
                  €{toPersianDigits(calculatedCost.govFeeEur.toLocaleString())}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <FileCheck2 className="h-4 w-4 text-purple-400" />
                  ترجمه رسمی، تاییدات دادگستری و بیمه:
                </span>
                <span className="font-black text-white text-sm">
                  €{toPersianDigits((calculatedCost.insuranceEur + calculatedCost.translationEur).toLocaleString())}
                </span>
              </div>
            </div>

            {/* مجموع کل محاسبات */}
            <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent p-5 mb-6 text-center">
              <span className="text-xs text-amber-200 block">مجموع برآورد ریالی و ارزی پرونده:</span>
              <p className="text-3xl font-black text-white mt-1">
                €{toPersianDigits(calculatedCost.totalEur.toLocaleString())}{' '}
                <span className="text-amber-400 text-lg">یورو</span>
              </p>
              <p className="text-xs text-amber-300/90 mt-1 font-bold">
                معادل تقریبی: {toPersianDigits(calculatedCost.totalToman.toLocaleString())} میلیون تومان
              </p>
            </div>

            {/* دکمه‌های اکشن */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="w-full rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer text-center"
              >
                ارزیابی رایگان شرایط تمکن مالی و ویزا
              </button>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="w-full rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 px-4 py-3 text-xs font-bold text-white transition cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="h-4 w-4 text-emerald-400" />
                <span>مشاوره ارزی با دفتر وین: ۴۳۶۸۸۹۷۶۳۲۵۶+</span>
                {copiedPhone && <span className="text-emerald-400 text-[10px]">کپی شد!</span>}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* مقاله تحلیلی جامع: راهنمای هوشمند مدیریت هزینه‌ها در سال ۲۰۲۶ */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur-xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-2.5">
            <span className="text-amber-400">●</span>
            راهنمای جامع مدیریت مالی و بودجه‌بندی مهاجرت به اروپا
          </h2>
          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-8 text-justify">
            <p>
              یکی از مهم‌ترین دغدغه‌های متقاضیان مهاجرت به قاره اروپا، شفافیت مالی و پیش‌بینی دقیق هزینه‌های قبل و بعد از ورود است. در بسیاری از تبلیغات غیررسمی، تنها به مبالغ اولیه اشاره می‌شود و هزینه‌های مسکن استاندارد، عوارض اقامت، ترجمه‌های رسمی و سپرده‌های تضمینی نادیده گرفته می‌شوند. هلدینگ دیاکو با تکیه بر حضور مستقیم وکلای رسمی خود در وین، آتن و مادرید، ساختار هزینه‌ای کاملاً شفاف و مستند را به متقاضیان ارائه می‌دهد.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <Coins className="h-6 w-6 text-amber-400 mb-3" />
                <h4 className="font-bold text-sm text-white mb-2">اصل سرمایه در اختیار خودتان است</h4>
                <p className="text-xs text-slate-300 leading-6">
                  برخلاف تصور اشتباه، در پرونده‌های تمکن مالی (NAG §44 اتریش یا اقامت غیرانتفاعی اسپانیا)، سرمایه شما به هیچ ارگانی واگذار نمی‌شود و تنها در قالب گواهی موجودی بانکی و گردش حساب اثبات می‌گردد.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <Home className="h-6 w-6 text-sky-400 mb-3" />
                <h4 className="font-bold text-sm text-white mb-2">تامین مسکن استاندارد (Mietvertrag)</h4>
                <p className="text-xs text-slate-300 leading-6">
                  اداره اقامت کشورهای اروپایی متراژ مشخصی را به ازای هر عضو خانواده طلب می‌کنند. دپارتمان مسکن دیاکو مستقیماً قراردادهای رسمی مورد تایید شهرداری را بدون واسطه‌های غیرمجاز تهیه می‌کند.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <ShieldAlert className="h-6 w-6 text-emerald-400 mb-3" />
                <h4 className="font-bold text-sm text-white mb-2">پیشگیری از جریمه‌های ریجکتی</h4>
                <p className="text-xs text-slate-300 leading-6">
                  ارائه نقص مدرک یا اسناد حسابرسی نشده می‌تواند منجر به رد پرونده و سوخت شدن کل هزینه‌های ترجمه و سفارت شود. وکلای دیاکو تمامی مدارک را قبل از تسلیم نهایی تطبیق حقوقی می‌دهند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول و AIO */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-bold text-amber-300">
              شفافیت کامل مالی دیاکو
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              سوالات پرتکرار هزینه‌ها و بودجه مهاجرت
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-amber-300 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-amber-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-7 border-t border-white/5 pt-3 text-justify">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* بنر پایانی ارزیابی */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl bg-gradient-to-l from-[#082833] via-[#0b3342] to-[#07242e] border border-amber-400/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            آماده برآورد اختصاصی بودجه پرونده خود هستید؟
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-7 mb-8">
            با تکمیل ارزیابی آنلاین دیاکو، کارشناسان ارشد مالی و وکلای بین‌المللی ما نقشه راه دقیق مالی شما را تدوین خواهند کرد.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-8 py-4 text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              شروع ارزیابی رایگان بودجه مهاجرت
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-6 py-4 text-xs font-bold text-white transition cursor-pointer"
            >
              بازگشت به پرتال اصلی دیاکو
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CostCalculatorPage;
