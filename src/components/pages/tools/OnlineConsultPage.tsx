import React, { useState } from 'react';
import {
  MessageSquare,
  Video,
  PhoneCall,
  Building2,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  UserCheck,
  Award,
  Lock,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Share2,
  Check,
} from 'lucide-react';
import { useSeo } from '../../../hooks/useSeo';
import type { PageType } from '../../Header';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

interface LawyerProfile {
  id: string;
  name: string;
  title: string;
  barMembership: string;
  office: string;
  experience: string;
  languages: string[];
  specialties: string[];
  avatar: string;
}

const LAWYERS: LawyerProfile[] = [
  {
    id: 'lawyer-1',
    name: 'دکتر آریا بهرامی',
    title: 'وکیل پایه یک دادگستری اتریش (Rechtsanwalt)',
    barMembership: 'عضو رسمی کانون وکلای اتریش (Rechtsanwaltskammer Wien)',
    office: 'دفتر مرکزی وین (Kärntner Ring)',
    experience: 'بیش از ۱۵ سال وکالت پرونده‌های مهاجرت و اقامت اروپا',
    languages: ['فارسی', 'آلمانی (سطح مادری)', 'انگلیسی'],
    specialties: ['اقامت تمکن مالی (NAG §44)', 'کارت قرمز-سفید-قرمز', 'دعاوی تجاری و ثبت شرکت در اتریش'],
    avatar: '⚖️',
  },
  {
    id: 'lawyer-2',
    name: 'دکتر الکساندر وبر (Dr. Alexander Weber)',
    title: 'حقوقدان ارشد مهاجرت کاری و شرکت‌ها',
    barMembership: 'عضو کانون وکلای مونیخ (Rechtsanwaltskammer München)',
    office: 'دفتر همکار مونیخ / فرانکفورت',
    experience: '۱۲ سال سابقه در پرونده‌های بلوکارت و انتقال شعب شرکت‌ها',
    languages: ['آلمانی', 'انگلیسی'],
    specialties: ['بلوکارت آلمان (EU Blue Card)', 'کارت شانس', 'معادل‌سازی مدارک پزشکی'],
    avatar: '👨‍💼',
  },
  {
    id: 'lawyer-3',
    name: 'خانم سوفیا کنستانتینو (Sofia Konstantinou)',
    title: 'کارشناس ارشد حقوق املاک و سرمایه‌گذاری بین‌الملل',
    barMembership: 'عضو کانون وکلای آتن (Athens Bar Association)',
    office: 'دفتر آتن (Kolonaki)',
    experience: '۱۰ سال سرپرستی معاملات ملکی و گلدن ویزای یونان و اسپانیا',
    languages: ['یونانی', 'انگلیسی', 'فرانسوی'],
    specialties: ['گلدن ویزای یونان (Law 5100/2024)', 'خرید ملک و افتتاح حساب بانکی اروپا', 'اقامت ۳ نسل'],
    avatar: '👩‍💼',
  },
];

export const OnlineConsultPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
}) => {
  const [sessionType, setSessionType] = useState<'video' | 'phone' | 'in-person'>('video');
  const [topic, setTopic] = useState<string>('financial');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // SEO & AIO
  useSeo({
    title: 'رزرو وقت مشاوره آنلاین و تصویری با وکلای مقیم وین | هلدینگ دیاکو',
    description:
      'نوبت‌دهی مشاوره تخصصی حقوقی مهاجرت به اتریش، آلمان و اتحادیه اروپا؛ جلسات تصویری، تلفنی و حضوری در تهران، وین و آتن با وکلای پایه یک کانون وکلای اتریش.',
    keywords: [
      'مشاوره مهاجرت به اتریش',
      'وکیل مهاجرت به آلمان در تهران',
      'رزرو مشاوره آنلاین ویزای اروپا',
      'مشاوره تمکن مالی اتریش',
      'مشاوره بلوکارت با وکیل رسمی',
      'هلدینگ دیاکو وین',
    ],
    canonical: '/online-consult',
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'مشاوره آنلاین و تخصصی حقوق مهاجرت اروپا دیاکو',
      provider: {
        '@type': 'Organization',
        name: 'هلدینگ مهاجرتی دیاکو',
        url: 'https://www.dia-co.ir',
      },
      areaServed: 'Worldwide',
      serviceType: 'Immigration Legal Consultation',
      description:
        'جلسات مشاوره حقوقی تصویری و تلفنی اختصاصی با وکلای رسمی دادگستری اتریش و آلمان جهت بررسی پرونده‌های اقامت و شنگن.',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && phoneNumber) {
      setSubmitted(true);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#071f26] text-slate-100 font-sans">
      {/* ============================================================
          هدر بخش و نوار ناوبری
         ============================================================ */}
      <section className="relative overflow-hidden pt-28 pb-14 bg-gradient-to-b from-[#092e39] via-[#071f26] to-[#071f26] border-b border-white/10">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f5a623_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-amber-300 transition cursor-pointer"
            >
              صفحه اصلی
            </button>
            <span>/</span>
            <span className="text-amber-400 font-bold">رزرو وقت مشاوره تخصصی</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>پشتیبانی مستقیم وکلای پایه یک دادگستری اتریش و آلمان — تضمین محرمانگی (NDA)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              سامانه نوبت‌دهی مشاوره حقوقی مهاجرت به اروپا
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
              گفتگوی مستقیم با وکلای رسمی دادگستری مقیم وین، مونیخ و آتن؛ بررسی دقیق مدارک، سنجش ریسک‌های پرونده، راهکارهای حل ریجکتی و تنظیم استراتژی پرونده‌های تمکن مالی و بلوکارت.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Video className="w-4 h-4 text-emerald-400" />
                <span>جلسات تصویری در گوگل میت / زوم با اشتراک اسناد</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>امکان جلسه حضوری در دفاتر تهران، وین و آتن</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-sky-400" />
                <span>سوگند رازداری حرفه‌ای و قرارداد عدم افشای اطلاعات</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          فرم رزرو جلسه مشاوره
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ستون فرم نوبت‌دهی */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0a2731] border border-white/15 p-6 sm:p-8 shadow-2xl">
              <h2 className="text-lg sm:text-xl font-black text-white mb-2">
                تنظیم وقت جلسه با وکیل مهاجرت
              </h2>
              <p className="text-xs text-slate-300 mb-6">
                لطفاً نوع جلسه، موضوع پرونده و زمان مدنظر خود را مشخص فرمایید تا هماهنگی نهایی با دفتر حقوقی انجام شود.
              </p>

              {submitted ? (
                <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/40 p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-white">درخواست نوبت شما با موفقیت ثبت شد</h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md mx-auto">
                    همکاران دپارتمان حقوقی دیاکو ظرف حداکثر ۲ ساعت کاری جهت تایید نهایی ساعت جلسه، ارسال لینک اختصاصی جلسه یا آدرس دفتر با شماره <strong>{phoneNumber}</strong> تماس خواهند گرفت.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="rounded-xl bg-amber-400 text-[#071f26] px-5 py-2 text-xs font-bold transition hover:bg-amber-300 cursor-pointer"
                  >
                    ثبت یک درخواست دیگر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* نوع جلسه */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      ۱. فرمت برگزاری جلسه مشاوره:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { key: 'video', label: 'آنلاین ویدیویی (Google Meet)', icon: Video },
                        { key: 'phone', label: 'تلفنی فوری', icon: PhoneCall },
                        { key: 'in-person', label: 'حضوری (تهران / وین)', icon: Building2 },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = sessionType === item.key;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => setSessionType(item.key as any)}
                            className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                              isSelected
                                ? 'bg-amber-400 text-[#071f26] border-amber-400 font-bold shadow-md'
                                : 'bg-[#071f26] text-slate-300 border-white/10 hover:border-white/20'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-[11px] font-bold">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* موضوع پرونده */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      ۲. موضوع و محور اصلی پرونده:
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-[#071f26] text-white rounded-xl px-3.5 py-2.5 text-xs font-bold border border-white/15 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="financial">اقامت تمکن مالی اتریش و اروپا (خودحمایتی بدون اجازه کار)</option>
                      <option value="bluecard">ویزای کاری، بلوکارت آلمان و کارت قرمز-سفید-قرمز اتریش</option>
                      <option value="realestate">سرمایه‌گذاری ملکی و گلدن ویزای یونان و اسپانیا</option>
                      <option value="company">ثبت شرکت، استارت‌آپ و کارآفرینی در اروپا</option>
                      <option value="academic">پذیرش تحصیلی، کالج‌های پزشکی و دوره‌های زبان</option>
                      <option value="rejection">بررسی دلایل ریجکتی ویزا و تنظیم لایحه اعتراضی (Remonstration)</option>
                    </select>
                  </div>

                  {/* مشخصات تماس */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        نام و نام خانوادگی متقاضی:
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="مثال: سهراب احمدی"
                        className="w-full bg-[#071f26] text-white rounded-xl px-3.5 py-2 text-xs border border-white/15 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        شماره تلفن همراه (واتساپ فعال):
                      </label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="0912..."
                        className="w-full bg-[#071f26] text-white rounded-xl px-3.5 py-2 text-xs border border-white/15 focus:outline-none focus:border-amber-400 text-right"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        آدرس ایمیل (جهت ارسال لینک جلسه):
                      </label>
                      <input
                        type="email"
                        dir="ltr"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-[#071f26] text-white rounded-xl px-3.5 py-2 text-xs border border-white/15 focus:outline-none focus:border-amber-400 text-left"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        روز یا ساعت پیشنهادی شما:
                      </label>
                      <input
                        type="text"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        placeholder="مثال: دوشنبه ساعت ۱۶ به بعد"
                        className="w-full bg-[#071f26] text-white rounded-xl px-3.5 py-2 text-xs border border-white/15 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      خلاصه وضعیت پرونده، مدارک یا سوالات کلیدی:
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="در صورت داشتن سابقه سفر به شنگن، مدرک زبان یا شرایط شغلی خاص، اینجا بنویسید..."
                      className="w-full bg-[#071f26] text-white rounded-xl px-3.5 py-2 text-xs border border-white/15 focus:outline-none focus:border-amber-400 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] hover:from-amber-300 hover:to-amber-500 text-[#071f26] py-3 text-xs sm:text-sm font-black shadow-lg transition hover:scale-[1.02] cursor-pointer"
                  >
                    تایید و ثبت نهایی درخواست نوبت مشاوره ←
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ستون معرفی وکلای مقیم و اعتبارنامه‌ها */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl bg-[#0a2731] border border-white/15 p-6 shadow-xl space-y-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-400" />
                <span>تیم حقوقی و وکلای پایه یک ناظر بر جلسات</span>
              </h3>

              <div className="space-y-3.5">
                {LAWYERS.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className="p-4 rounded-2xl bg-[#071f26] border border-white/10 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-lg">
                          {lawyer.avatar}
                        </span>
                        <div>
                          <div className="text-xs font-black text-white">{lawyer.name}</div>
                          <div className="text-[11px] text-amber-300 font-medium">{lawyer.title}</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                        {lawyer.office.split(' ')[0]} {lawyer.office.split(' ')[1]}
                      </span>
                    </div>

                    <div className="text-[11px] text-emerald-400 font-mono">
                      {lawyer.barMembership}
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {lawyer.specialties.map((s, i) => (
                        <span key={i} className="text-[10px] text-slate-300 bg-white/5 px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* کارت ارتباط مستقیم */}
            <div className="rounded-3xl bg-gradient-to-br from-[#092e39] to-[#071f26] border border-amber-400/30 p-6 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4" />
                <span>تماس فوری با دفتر تهران و وین:</span>
              </h4>
              <div className="text-xs text-slate-300 leading-relaxed">
                در صورت نیاز به مشاوره فوری یا امور اضطراری وقت مصاحبه سفارت، مستقیماً با خط ویژه دیاکو تماس حاصل فرمایید:
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="tel:02191693955"
                  dir="ltr"
                  className="rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071f26] px-3.5 py-2 text-xs font-black transition flex items-center gap-1.5"
                >
                  <span>02191693955</span>
                  <span>📞</span>
                </a>
                <a
                  href="https://wa.me/989197340829"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white px-3.5 py-2 text-xs font-black transition flex items-center gap-1.5"
                >
                  <span>واتساپ ۲۴/۷</span>
                  <span>💬</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          مقاله پرمحتوا: راهنمای طلایی آمادگی برای جلسه مشاوره حقوقی
         ============================================================ */}
      <section className="container mx-auto px-4 md:px-8 py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 rounded-full">
              راهنمای جلسه مشاوره
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white mt-3 mb-3">
              چگونه بیشترین بهره‌وری را از جلسه مشاوره مهاجرتی ببریم؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              توصیه‌های وکلای دادگستری برای جمع‌آوری اسناد، شفاف‌سازی پرونده و اتخاذ بهترین استراتژی اقدام قانونی.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300">
            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-5 space-y-2">
              <div className="text-amber-400 font-bold text-base flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>۱. آماده‌سازی کارنامه و اسناد مالی</span>
              </div>
              <p className="leading-relaxed">
                قبل از ورود به جلسه، مدارک هویتی، خلاصه سوابق شغلی (CV) و اسناد تخمینی گردش حساب یا دارایی ملکی خود را در دسترس داشته باشید تا وکیل بتواند عدد دقیق تمکن را محاسبه کند.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-5 space-y-2">
              <div className="text-emerald-400 font-bold text-base flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>۲. شفافیت کامل در ریجکتی‌های قبلی</span>
              </div>
              <p className="leading-relaxed">
                اگر سابقه رد ویزا از کشورهای شنگن، کانادا یا انگلستان دارید، نامه رسمی ریجکتی را ارائه دهید. پنهان‌کاری باعث رد پرونده در بررسی سیستم اطلاعات شنگن (SIS) می‌شود.
              </p>
            </div>

            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-5 space-y-2">
              <div className="text-sky-400 font-bold text-base flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>۳. پرسش درباره تعهدات کتبی</span>
              </div>
              <p className="leading-relaxed">
                در پایان جلسه مطمئن شوید که مسیر پیشنهادی، زمان‌بندی مراحل کنسولی و جزئیات مالی و هزینه‌های دولتی در قالب پیش‌قرارداد شفاف حقوقی تدوین می‌شود.
              </p>
            </div>
          </div>

          {/* پرسش‌های متداول مشاوره */}
          <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-6 sm:p-8">
            <h3 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>پرسش‌های متداول در خصوص جلسات مشاوره</span>
            </h3>

            <div className="space-y-3">
              {[
                {
                  q: 'آیا برای جلسه آنلاین نیاز به نصب نرم‌افزار خاصی است؟',
                  a: 'خیر. لینک جلسه بر روی پلتفرم استاندارد Google Meet ارسال می‌شود که بدون نیاز به نصب برنامه روی گوشی یا کامپیوتر با یک کلیک در مرورگر اجرا می‌گردد.',
                },
                {
                  q: 'آیا امکان حضور همسر یا شریک تجاری در جلسه وجود دارد؟',
                  a: 'بله، حضور همسر و اعضای خانواده مشمول پرونده کاملاً آزاد است و لینک جلسه می‌تواند به صورت همزمان برای سایر اعضا نیز به اشتراک گذاشته شود.',
                },
                {
                  q: 'آیا هزینه مشاوره در صورت عقد قرارداد کسر می‌شود؟',
                  a: 'بله، کلیه مبالغ پرداخت‌شده بابت جلسات تخصصی ارزیابی پرونده، در صورت عقد قرارداد وکالت از مبلغ کل قرارداد کسر خواهد شد.',
                },
              ].map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-[#071f26]">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-right p-4 font-bold text-xs sm:text-sm text-white flex items-center justify-between cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <p className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-2">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnlineConsultPage;
