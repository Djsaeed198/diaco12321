import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Building2,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Globe2,
  Send,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';
import DiacoLogo from '../DiacoLogo';
import type { PageType } from '../Header';

interface Props {
  onBackToHome: () => void;
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

export const ContactUsPage: React.FC<Props> = ({
  onBackToHome,
  onOpenAssessment,
  onNavigateToPage,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'تمکن مالی اتریش',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useSeo({
    title: 'تماس با ما و دفاتر بین‌المللی وین، آتن و تهران | هلدینگ دیاکو',
    description:
      'اطلاعات تماس رسمی هلدینگ مهاجرتی دیاکو؛ آدرس دفتر مرکزی وین (اتریش)، دفتر آتن (یونان)، دفتر تهران (ولنجک)، خط ویژه 02191693955 و واتساپ پشتیبانی ۲۴ ساعته.',
    keywords: [
      'تماس با هلدینگ دیاکو',
      'آدرس دفتر دیاکو در وین',
      'تلفن دفتر دیاکو تهران',
      'واتساپ پشتیبانی مهاجرت اتریش',
      'دفتر مهاجرتی آتن دیاکو',
      'شماره وکیل مهاجرت وین',
    ],
    canonical: '/contact-us',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'تماس با دفاتر بین‌المللی هلدینگ مهاجرتی دیاکو',
      description: 'راه‌های ارتباطی، آدرس‌های رسمی و شماره‌های تماس مستقیم با وکلای دیاکو.',
      url: 'https://www.dia-co.ir/contact-us',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#071f26] text-slate-100 font-sans">
      {/* هدر بخش و معرفی */}
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
            <span className="text-amber-400 font-bold">تماس با ما و دفاتر بین‌المللی</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4 backdrop-blur-sm">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>پاسخگویی مستقیم، مشاوره حضوری در وین و تهران، و پشتیبانی ۲۴/۷</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              راه‌های ارتباطی با هلدینگ بین‌المللی دیاکو
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
              جهت رزرو وقت ملاقات حضوری در دفتر مرکزی وین یا دفتر تهران، هماهنگی مشاوره تصویری و یا طرح پرسش‌های حقوقی، می‌توانید از طریق شماره‌های اختصاصی، واتساپ یا فرم زیر با ما در ارتباط باشید.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>ساعات کاری وین: دوشنبه تا جمعه ۹:۰۰ الی ۱۷:۰۰ به وقت اروپای مرکزی</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>ساعات کاری تهران: شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* اطلاعات دفاتر ۳ گانه و فرم تماس */}
      <section className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ستون کارت‌های دفاتر */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-lg font-black text-white mb-2 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <span>دفاتر رسمی و بین‌المللی هلدینگ دیاکو</span>
            </h2>

            {/* دفتر وین (مرکزی) */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0c3440] to-[#08222b] border border-amber-400/40 p-6 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇦🇹</span>
                  <div>
                    <h3 className="text-base font-black text-white">دفتر مرکزی وین (اتریش)</h3>
                    <span className="text-[10px] text-amber-300 font-bold">مرکز مدیریت پرونده‌های شنگن</span>
                  </div>
                </div>
                <span className="rounded-lg bg-amber-400 px-2.5 py-1 text-[11px] font-black text-[#071f26]">
                  دفتر اصلی اروپا
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Ausstellungsstraße 50, 1020 Wien, Austria (نزدیک به ایستگاه مترو Vorgartenstraße U1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span dir="ltr" className="font-mono">+43 1 997 1234 (خط مستقیم وکالت وین)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>wien@dia-co.ir</span>
                </div>
              </div>
            </div>

            {/* دفتر آتن */}
            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇬🇷</span>
                <div>
                  <h3 className="text-sm font-black text-white">دفتر آتن (یونان)</h3>
                  <span className="text-[10px] text-slate-400">دپارتمان تخصصی گلدن ویزا و املاک</span>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Grigoriou Lampraki 58, Glyfada, 16675 Athens, Greece</span>
                </div>
              </div>
            </div>

            {/* دفتر تهران */}
            <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇮🇷</span>
                <div>
                  <h3 className="text-sm font-black text-white">دفتر تهران (ایران)</h3>
                  <span className="text-[10px] text-slate-400">پذیرش متقاضیان و هماهنگی لگالایز سفارت</span>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="tel:02191693955" dir="ltr" className="font-mono text-amber-400 hover:underline">
                    02191693955 (۳۰ خط ویژه پاسخگویی)
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#25d366] shrink-0" />
                  <a href="https://wa.me/989197340829" target="_blank" rel="noopener noreferrer" className="text-[#25d366] hover:underline">
                    واتساپ مستقیم: 09197340829
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ستون فرم ارسال پیام */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#0a2731] border border-white/15 p-6 sm:p-8 shadow-2xl">
              <h2 className="text-lg font-black text-white mb-2">
                ارسال پیام یا درخواست وقت ملاقات
              </h2>
              <p className="text-xs text-slate-300 mb-6">
                پیام شما مستقیماً توسط دپارتمان حقوقی دیاکو بررسی و ظرف ۲ ساعت کاری با شما تماس گرفته خواهد شد.
              </p>

              {submitted ? (
                <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/40 p-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h3 className="text-base font-bold text-white">پیام شما با موفقیت ارسال شد</h3>
                  <p className="text-xs text-slate-300">
                    کارشناسان ارشد دیاکو به زودی با شماره اعلام‌شده تماس حاصل خواهند کرد.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        نام و نام خانوادگی:
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="نام شما..."
                        className="w-full bg-[#071f26] text-white rounded-xl px-3.5 py-2.5 text-xs border border-white/15 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        شماره تماس (واتساپ):
                      </label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0912..."
                        className="w-full bg-[#071f26] text-white rounded-xl px-3.5 py-2.5 text-xs border border-white/15 focus:outline-none focus:border-amber-400 text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      موضوع مشاوره:
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#071f26] text-white rounded-xl px-3.5 py-2.5 text-xs font-bold border border-white/15 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="تمکن مالی اتریش">اقامت تمکن مالی اتریش (NAG §44)</option>
                      <option value="بلوکارت آلمان">بلوکارت و اقامت کاری آلمان</option>
                      <option value="گلدن ویزای یونان">گلدن ویزا و خرید ملک یونان</option>
                      <option value="ثبت شرکت و بیزینس">ثبت شرکت و کارآفرینی در اروپا</option>
                      <option value="تحصیل در اروپا">پذیرش تحصیلی و دوره‌های زبان</option>
                      <option value="سایر موارد">سایر موارد حقوقی</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      متن پیام یا پرسش شما:
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="توضیحات مربوط به شرایط خانوادگی، بودجه یا سوالات حقوقی خود را اینجا بنویسید..."
                      className="w-full bg-[#071f26] text-white rounded-xl px-3.5 py-2.5 text-xs border border-white/15 focus:outline-none focus:border-amber-400 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] hover:from-amber-300 hover:to-amber-500 text-[#071f26] py-3 text-xs sm:text-sm font-black shadow-lg transition hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>ارسال پیام به دپارتمان حقوقی دیاکو</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
