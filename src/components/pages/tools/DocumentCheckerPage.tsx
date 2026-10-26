import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Building2,
  FileText,
  BadgeCheck,
  Info,
  Download,
  Check,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';
import DynamicDocumentChecklist from '../../DynamicDocumentChecklist';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToCountry?: (countryKey: string) => void;
}

export const DocumentCheckerPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useSeo({
    title: 'بررسی هوشمند مدارک مهاجرت و چک‌لیست سفارت ۲۰۲۶ | هلدینگ دیاکو',
    description:
      'چک‌لیست تعاملی مدارک مهاجرتی اروپا ۲۰۲۶؛ راهنمای تاییدیه ZAB آلمان، آپوستیل دادگستری، لگالایز سفارت اتریش، گردش حساب ارزی، قرارداد اجاره مسکن رسمی و مدرک زبان با نظارت وکلای دیاکو.',
    canonical: '/guides/document-checker',
    ogType: 'article',
    ogImage:
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'چک لیست مدارک ویزای شینگن ۲۰۲۶',
      'تاییدیه ZAB آلمان',
      'لگالایز سفارت اتریش در تهران',
      'مدارک تمکن مالی اتریش MA35',
      'آپوستیل مدارک تحصیلی و شناسنامه',
      'قرارداد اجاره خانه اتریش Mietvertrag',
      'بررسی هوشمند مدارک دیاکو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': 'https://www.dia-co.ir/guides/document-checker#article',
          headline: 'چک‌لیست هوشمند و استانداردهای حقوقی مدارک مهاجرت به اروپا در سال ۲۰۲۶',
          description:
            'بررسی تخصصی مدارک عمومی و اختصاصی ویزاهای اروپایی، فرآیند تاییدات قوه قضاییه و وزارت امور خارجه، لگالایز کنسولی و تایید صلاحیت در ادارات مهاجرت اروپا.',
          image: [
            'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
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
          '@id': 'https://www.dia-co.ir/guides/document-checker#howto',
          name: 'مراحل آماده‌سازی و تایید مدارک مهاجرتی',
          step: [
            {
              '@type': 'HowToStep',
              name: 'جمع‌آوری مدارک هویتی و تحصیلی اصلی',
              text: 'اخذ دانشنامه، ریزنمرات و مدارک سجلی با مهرهای رسمی دانشگاه و ثبت احوال.',
            },
            {
              '@type': 'HowToStep',
              name: 'ترجمه رسمی سوگندخورده به زبان کشور مقصد',
              text: 'ترجمه دقیق به زبان آلمانی، انگلیسی یا اسپانیایی همراه با تمبر رسمی.',
            },
            {
              '@type': 'HowToStep',
              name: 'اخذ مهرهای دادگستری و وزارت امور خارجه',
              text: 'تایید اصالت مدارک در ادارات حقوقی دادگستری و کنسولی وزارت خارجه.',
            },
            {
              '@type': 'HowToStep',
              name: 'لگالایز در سفارت یا آپوستیل بین‌المللی',
              text: 'تایید نهایی مدارک در سفارت کشور مقصد جهت ارائه به اداره اقامت.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.dia-co.ir/guides/document-checker#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'لگالایز (Legalization) مدارک چیست و چرا برای سفارت اتریش الزامی است؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'لگالایز فرآیند تایید نهایی اصالت ترجمه و مهرهای وزارت دادگستری توسط کنسولگری سفارت اتریش است که اعتبار سند را برای اداره اقامت وین (MA35) محرز می‌سازد.',
              },
            },
            {
              '@type': 'Question',
              name: 'تاییدیه ZAB برای آلمان چیست و چقدر زمان می‌برد؟',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'تاییدیه ZAB ارزشیابی رسمی مدرک دانشگاهی شما در سیستم آلمان است که برای صدور کارت آبی یا کارت شانس الزامی بوده و معمولاً بین ۲ تا ۶ هفته کاری زمان می‌برد.',
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

  const FAQS = [
    {
      q: 'مدت اعتبار گواهی سوءپیشینه و گردش حساب بانکی چقدر است؟',
      a: 'گواهی عدم سوءپیشینه از زمان صدور تا زمان تحویل به سفارت نباید بیش از ۳ ماه قدمت داشته باشد. همچنین پرینت گردش حساب و گواهی تمکن مالی لاتین باید حداکثر مربوط به ۷ تا ۱۴ روز قبل از وقت سفارت باشد تا از درجه اعتبار ساقط نگردد.',
    },
    {
      q: 'قرارداد اجاره خانه (Mietvertrag) باید چه شرایطی داشته باشد؟',
      a: 'قرارداد باید رسمی و امضا شده توسط مالک معتبر باشد و متراژ آن با استانداردهای شهرداری اتریش، آلمان یا اسپانیا همخوانی داشته باشد (برای مثال در وین حداقل ۳۵ متر برای مجرد و حدود ۷۰ متر برای خانواده). دپارتمان مسکن دیاکو مستقیماً این قراردادها را منعقد می‌نماید.',
    },
    {
      q: 'آیا برای ترجمه مدارک به اتریش، زبان انگلیسی مورد قبول است؟',
      a: 'سفارت اتریش در تهران و اداره اقامت وین (MA35) مدارک سجلی و اقامتی را الزماً با ترجمه رسمی به زبان آلمانی با مهر تایید دادگستری می‌پذیرند؛ البته برای برخی رشته‌های دانشگاهی یا بلوکارت‌های بین‌المللی مدارک کاری به زبان انگلیسی نیز با هماهنگی قبلی پذیرفته می‌شود.',
    },
    {
      q: 'اصلی‌ترین دلیل رد شدن مدارک در سفارت چیست؟',
      a: 'واریزی‌های ناگهانی و بدون توجیه مالیاتی در حساب بانکی، تناقض در سوابق بیمه و رزومه Europass، و ارائه اجاره‌نامه‌های صوری نامعتبر مهم‌ترین دلایل ریجکتی در سال‌های اخیر هستند که دیاکو با ممیزی پیشگیرانه از وقوع آن‌ها جلوگیری می‌کند.',
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
            <span className="text-amber-300 font-bold">بررسی هوشمند مدارک و چک‌لیست سفارت ۲۰۲۶</span>
          </div>
        </div>
      </div>

      {/* هیرو بخش ابزار */}
      <section className="container mx-auto px-4 md:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-xs font-bold text-teal-300 mb-4">
            <FileCheck className="h-4 w-4 text-teal-400" />
            سامانه پایش هوشمند مدارک کنسولی و تاییدات سفارت ۲۰۲۶
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            چک‌لیست هوشمند مدارک <span className="text-[#f5a623]">مهاجرت به اروپا</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-8">
            بررسی جامع مدارک هویتی، شغلی، تحصیلی، مالی و مسکن مطابق با آخرین دستورالعمل‌های سفارتخانه‌های شینگن و ادارات اقامت اتریش، آلمان و اسپانیا.
          </p>
        </div>
      </section>

      {/* چک‌لیست تعاملی پویا */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          <DynamicDocumentChecklist isStandalone={true} />
        </div>
      </section>

      {/* راهنمای فرآیند تاییدات و مهرهای رسمی */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur-xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-2.5">
            <span className="text-amber-400">●</span>
            استانداردهای طلایی تهیه مدارک بدون ریسک ریجکتی
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <BadgeCheck className="h-6 w-6 text-emerald-400 mb-3" />
              <h4 className="font-bold text-sm text-white mb-2">لگالایز و آپوستیل رسمی</h4>
              <p className="text-xs text-slate-300 leading-6 text-justify">
                مدارک شما باید پس از ترجمه به زبان کشور مقصد، تاییدیه اداره فنی دادگستری و وزارت امور خارجه را کسب کرده و در نهایت توسط سفارت مربوطه لگالایز گردند.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Building2 className="h-6 w-6 text-sky-400 mb-3" />
              <h4 className="font-bold text-sm text-white mb-2">تاییدیه معادل‌سازی ZAB و Anabin</h4>
              <p className="text-xs text-slate-300 leading-6 text-justify">
                برای آلمان و اتریش، دانشگاه مبدا باید در سامانه Anabin رتبه H+ داشته باشد و در صورت نیاز تاییدیه کتبی ZAB برای پرونده‌های کاری و نخبگان ضمیمه شود.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <AlertTriangle className="h-6 w-6 text-amber-400 mb-3" />
              <h4 className="font-bold text-sm text-white mb-2">شفافیت گردش ۶ ماهه حساب</h4>
              <p className="text-xs text-slate-300 leading-6 text-justify">
                هیچ‌گونه واریز درشت و بدون مبنای تجاری یا ملکی در ماه پایانی نباید در پرینت بانکی وجود داشته باشد؛ مبدا ورودی‌های مالی باید کاملاً مستند باشد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* پرسش‌های متداول مدارک */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-bold text-amber-300">
              رفع ابهامات حقوقی مدارک
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              سوالات پرتکرار چک‌لیست مدارک سفارت
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

      {/* بنر پایانی بررسی مدارک */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl bg-gradient-to-l from-[#082833] via-[#0b3342] to-[#07242e] border border-teal-400/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            آیا مایل به بررسی و ممیزی تخصصی مدارک خود توسط وکلای دیاکو هستید؟
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-7 mb-8">
            وکلای رسمی ما در وین، تهران و آتن پرونده شما را پیش از ارسال به سفارت سطر به سطر ممیزی نموده و ریسک ریجکتی را به صفر می‌رسانند.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-8 py-4 text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              درخواست ممیزی حقوقی مدارک
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

export default DocumentCheckerPage;
