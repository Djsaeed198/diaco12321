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

  const officeLocations = [
    {
      id: 'tehran',
      flag: '🇮🇷',
      title: 'دفتر تهران (ایران)',
      role: 'پذیرش متقاضیان، مشاوره حضوری و هماهنگی لگالایز سفارت',
      badge: 'دفتر مرکزی ایران',
      addressFa: 'تهران، ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴ (کد پستی: ۱۹۸۵۸)',
      addressPostal: 'No. 14, Adalat St, Yasaman Sq, Daneshjoo Blvd, Velenjak, Tehran 19858, Iran',
      phoneDisplay: '021 9169 3955',
      phoneHref: 'tel:+982191693955',
      phoneNote: 'خط ویژه پاسخگویی دفتر تهران',
      whatsappDisplay: '+98 919 734 0829',
      whatsappHref: 'https://wa.me/989197340829',
      hours: 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۹:۰۰ · پنجشنبه ۹:۰۰ الی ۱۶:۰۰ (به وقت تهران)',
      embedUrl: 'https://maps.google.com/maps?q=35.8080,51.3965&t=&z=16&ie=UTF8&iwloc=&output=embed',
      linkUrl: 'https://www.google.com/maps/search/?api=1&query=35.8080,51.3965',
      highlighted: false,
    },
    {
      id: 'vienna',
      flag: '🇦🇹',
      title: 'دفتر مرکزی وین (اتریش)',
      role: 'مرکز مدیریت حقوقی پرونده‌های اتریش، آلمان و اتحادیه اروپا',
      badge: 'دفتر اصلی اروپا',
      addressFa: 'وین، اتریش — خیابان آوس‌اشتلونگ‌اشتراسه ۵۰، طبقه دوم، کد پستی ۱۰۲۰ (نزدیک ایستگاه مترو فورگارتن‌اشتراسه، خط یک)',
      addressPostal: 'Ausstellungsstraße 50/2.OG, 1020 Wien, Austria',
      phoneDisplay: '+43 688 976 3256',
      phoneHref: 'tel:+436889763256',
      phoneNote: 'خط مستقیم دفتر وین و واتساپ حقوقی',
      whatsappDisplay: '+43 688 976 3256',
      whatsappHref: 'https://wa.me/436889763256',
      hours: 'دوشنبه تا جمعه ۹:۰۰ الی ۱۷:۰۰ (به وقت اروپای مرکزی)',
      embedUrl: 'https://maps.google.com/maps?q=Ausstellungsstra%C3%9Fe+50,+1020+Wien,+Austria&t=&z=16&ie=UTF8&iwloc=&output=embed',
      linkUrl: 'https://www.google.com/maps/search/?api=1&query=Ausstellungsstra%C3%9Fe+50,+1020+Wien,+Austria',
      highlighted: true,
    },
    {
      id: 'athens',
      flag: '🇬🇷',
      title: 'دفتر آتن (یونان)',
      role: 'دپارتمان تخصصی گلدن ویزا، امور ثبتی و املاک مدیترانه',
      badge: 'دفتر جنوب اروپا',
      addressFa: 'آتن، یونان — منطقه گلیفادا، خیابان گریگوریو لامپراکی، پلاک ۵۸، کد پستی ۱۶۶۷۵',
      addressPostal: 'Grigoriou Lampraki 58, Glyfada, 166 75 Athens, Greece',
      phoneDisplay: '+43 688 976 3256',
      phoneHref: 'tel:+436889763256',
      phoneNote: 'هماهنگی وقت حضوری و پرونده‌های دفتر آتن',
      whatsappDisplay: '+43 688 976 3256',
      whatsappHref: 'https://wa.me/436889763256',
      hours: 'دوشنبه تا جمعه ۹:۰۰ الی ۱۷:۰۰ (به وقت اروپای شرقی)',
      embedUrl: 'https://maps.google.com/maps?q=Grigoriou+Lampraki+58,+Glyfada+166+75,+Athens,+Greece&t=&z=16&ie=UTF8&iwloc=&output=embed',
      linkUrl: 'https://www.google.com/maps/search/?api=1&query=Grigoriou+Lampraki+58,+Glyfada+166+75,+Athens,+Greece',
      highlighted: false,
    },
  ];

  useSeo({
    title: 'تماس با دفاتر هلدینگ بین‌المللی دیاکو در وین، آتن و تهران',
    description:
      'اطلاعات تماس، نشانی دقیق و نقشه گوگل دفاتر رسمی هلدینگ مهاجرتی دیاکو در تهران (ولنجک، ۰۲۱۹۱۶۹۳۹۵۵)، وین اتریش و آتن یونان با ۱۱+ سال سابقه رسمی.',
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
      description: 'راه‌های ارتباطی، آدرس‌های رسمی و شماره‌های تماس مستقیم با دفاتر تهران، وین و آتن دیاکو.',
      url: 'https://www.dia-co.ir/contact-us',
      mainEntity: {
        '@type': 'Organization',
        '@id': 'https://www.dia-co.ir/#organization',
        name: 'هلدینگ مهاجرتی دیاکو',
        email: 'info@dia-co.ir',
        telephone: '+98-21-91693955',
        location: [
          {
            '@type': 'Place',
            name: 'دفتر مرکزی وین (اتریش)',
            telephone: '+43-688-9763256',
            hasMap: 'https://www.google.com/maps/search/?api=1&query=Ausstellungsstra%C3%9Fe+50,+1020+Wien,+Austria',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Ausstellungsstraße 50/2.OG',
              addressLocality: 'Wien',
              postalCode: '1020',
              addressCountry: 'AT',
            },
            geo: { '@type': 'GeoCoordinates', latitude: 48.2179, longitude: 16.3991 },
          },
          {
            '@type': 'Place',
            name: 'دفتر آتن (یونان)',
            telephone: '+43-688-9763256',
            hasMap: 'https://www.google.com/maps/search/?api=1&query=Grigoriou+Lampraki+58,+Glyfada+166+75,+Athens,+Greece',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Grigoriou Lampraki 58, Glyfada',
              addressLocality: 'Athens',
              postalCode: '166 75',
              addressCountry: 'GR',
            },
            geo: { '@type': 'GeoCoordinates', latitude: 37.8656, longitude: 23.7544 },
          },
          {
            '@type': 'Place',
            name: 'دفتر تهران (ایران)',
            telephone: '+98-21-91693955',
            hasMap: 'https://www.google.com/maps/search/?api=1&query=35.8080,51.3965',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴',
              addressLocality: 'تهران',
              postalCode: '19858',
              addressCountry: 'IR',
            },
            geo: { '@type': 'GeoCoordinates', latitude: 35.8080, longitude: 51.3965 },
          },
        ],
      },
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
              <span>پاسخگویی مستقیم، مشاوره حضوری در تهران، وین و آتن و پشتیبانی ۲۴ ساعته</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              راه‌های ارتباطی با هلدینگ بین‌المللی دیاکو
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
              جهت رزرو وقت ملاقات حضوری در دفاتر رسمی تهران، وین یا آتن، هماهنگی مشاوره تصویری و یا طرح پرسش‌های حقوقی، می‌توانید از طریق شماره‌های اختصاصی، واتساپ یا فرم زیر با ما در ارتباط باشید.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>ساعات کاری وین و آتن: دوشنبه تا جمعه ۹:۰۰ الی ۱۷:۰۰ (به وقت اروپای مرکزی و شرقی)</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>ساعات کاری تهران: شنبه تا پنجشنبه ۹:۰۰ الی ۱۹:۰۰ (پنجشنبه تا ۱۶:۰۰ به وقت تهران)</span>
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

            {officeLocations.map((office) => (
              <div
                key={office.id}
                className={`rounded-2xl p-5 sm:p-6 space-y-3 ${
                  office.highlighted
                    ? 'bg-gradient-to-br from-[#0c3440] to-[#08222b] border border-amber-400/40 shadow-xl'
                    : 'bg-[#0a2731] border border-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{office.flag}</span>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-white">{office.title}</h3>
                      <span className="text-[11px] text-amber-300/90 font-medium">{office.role}</span>
                    </div>
                  </div>
                  <span
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-black shrink-0 ${
                      office.highlighted
                        ? 'bg-amber-400 text-[#071f26]'
                        : 'bg-white/10 text-slate-200 border border-white/15'
                    }`}
                  >
                    {office.badge}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 pt-2.5 border-t border-white/10">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="leading-relaxed text-slate-200">{office.addressFa}</p>
                      <p className="text-[11px] text-slate-400">
                        <span>نشانی پستی دقیق: </span>
                        <span dir="ltr" className="font-mono text-slate-300">
                          {office.addressPostal}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a href={office.phoneHref} dir="ltr" className="font-mono text-amber-300 hover:underline font-bold">
                      {office.phoneDisplay}
                    </a>
                    <span className="text-[11px] text-slate-400">({office.phoneNote})</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                      <a href="mailto:info@dia-co.ir" dir="ltr" className="hover:underline">
                        info@dia-co.ir
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-[#25d366] shrink-0" />
                      <a
                        href={office.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#25d366] hover:underline"
                      >
                        واتساپ دفتر: <span dir="ltr">{office.whatsappDisplay}</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{office.hours}</span>
                  </div>

                  <div className="pt-1">
                    <a
                      href={office.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 px-3 py-1.5 text-[11px] font-bold text-amber-300 transition"
                    >
                      <span>مسیریابی و مشاهده در گوگل مپس</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
                      <option value="تمکن مالی اتریش">اقامت تمکن مالی اتریش (قانون اقامت و استقرار)</option>
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

        {/* نقشه مجزای موقعیت جغرافیایی هر یک از دفاتر تهران، وین و آتن */}
        <div className="mt-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-amber-400" />
                <span>نقشه مجزای موقعیت دفاتر رسمی دیاکو در تهران، وین و آتن</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                نشانی دقیق و لینک مستقیم مسیریابی هر یک از سه دفتر رسمی هلدینگ دیاکو در گوگل مپس به‌صورت جداگانه:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {officeLocations.map((office) => (
              <div
                key={`map-${office.id}`}
                className="flex flex-col justify-between rounded-3xl bg-[#0a2731] border border-white/15 p-5 shadow-xl space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                      <span>{office.flag}</span>
                      <span>{office.title}</span>
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{office.addressFa}</p>
                  <p dir="ltr" className="text-[11px] font-mono text-amber-300/90 text-left">
                    {office.addressPostal}
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#071f26]">
                  <iframe
                    title={`نقشه گوگل ${office.title}`}
                    src={office.embedUrl}
                    className="w-full h-64 border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <a
                  href={office.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/5 hover:bg-amber-400 hover:text-[#071f26] border border-white/15 hover:border-amber-400 px-4 py-2.5 text-xs font-bold text-amber-300 transition"
                >
                  <MapPin className="w-4 h-4" />
                  <span>باز کردن موقعیت دقیق در نقشه گوگل</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;

