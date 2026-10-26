import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import type { ImmigrationPlan, UserProfile } from '../types';
import { toPersianDigits } from '../utils/persian';
import DynamicDocumentChecklist from './DynamicDocumentChecklist';
import DiacoLogo from './DiacoLogo';

interface Props {
  plan: ImmigrationPlan;
  profile: UserProfile;
  onRestart: () => void;
}

export const ResultPanel: React.FC<Props> = ({ plan, profile, onRestart }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const levelBadge = {
    excellent: {
      bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30',
      bar: 'from-emerald-400 to-emerald-600',
    },
    high: {
      bg: 'bg-blue-500/10 text-blue-700 border-blue-500/30',
      bar: 'from-blue-400 to-blue-600',
    },
    medium: {
      bg: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
      bar: 'from-amber-400 to-amber-600',
    },
    low: {
      bg: 'bg-rose-500/10 text-rose-700 border-rose-500/30',
      bar: 'from-rose-400 to-rose-600',
    },
  }[plan.level] || {
    bg: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
    bar: 'from-amber-400 to-amber-600',
  };

  /**
   * آیکون‌های SVG و استایل اختصاصی برای هر دسته مهاجرتی
   */
  const getCategoryDetails = (pathName: string) => {
    const p = pathName.toLowerCase();
    if (
      p.includes('کار') ||
      p.includes('work') ||
      p.includes('rwr') ||
      p.includes('قرمز') ||
      p.includes('blue') ||
      p.includes('شغل') ||
      p.includes('آبی') ||
      p.includes('استخدام')
    ) {
      return {
        // آیکون SVG اختصاصی چمدان کاری (Work / Suitcase)
        iconSvg: (
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.25v4.5a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-4.5m16.5 0a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25m16.5 0v3.75a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V14.25m3-8.25h6m-6 0a2.25 2.25 0 00-2.25 2.25v2.25h10.5V8.25A2.25 2.25 0 0015 6m-6 0V4.5A1.5 1.5 0 0110.5 3h3A1.5 1.5 0 0115 4.5V6" />
          </svg>
        ),
        categoryTitle: 'دسته شغلی و بازار کار (Work & Employment)',
        badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
        borderColor: 'hover:border-blue-500',
        accentBg: 'bg-blue-600',
      };
    }
    if (
      p.includes('تحصیل') ||
      p.includes('study') ||
      p.includes('دانشگاه') ||
      p.includes('education') ||
      p.includes('مدرک') ||
      p.includes('کالج') ||
      p.includes('آوسبیلدونگ')
    ) {
      return {
        // آیکون SVG اختصاصی کتاب و دانش (Academic / Book)
        iconSvg: (
          <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        ),
        categoryTitle: 'دسته تحصیلی و آکادمیک (Education & University)',
        badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        borderColor: 'hover:border-indigo-500',
        accentBg: 'bg-indigo-600',
      };
    }
    if (
      p.includes('تمکن') ||
      p.includes('خودحمایتی') ||
      p.includes('financial') ||
      p.includes('دارایی') ||
      p.includes('سود')
    ) {
      return {
        // آیکون SVG اختصاصی تمکن و ثروت (Financial / Shield & Coins)
        iconSvg: (
          <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6H2.25m0 0v8.25m0-8.25h19.5m0 0v8.25m0-8.25A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75M12 11.25a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
          </svg>
        ),
        categoryTitle: 'دسته تمکن مالی و خودحمایتی (Financial Independence)',
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
        borderColor: 'hover:border-amber-500',
        accentBg: 'bg-amber-500',
      };
    }
    if (
      p.includes('ملک') ||
      p.includes('گلدن') ||
      p.includes('سرمایه') ||
      p.includes('golden') ||
      p.includes('invest') ||
      p.includes('خرید')
    ) {
      return {
        // آیکون SVG اختصاصی سرمایه‌گذاری و ملک (Golden Visa / Property)
        iconSvg: (
          <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1.091m-16.5-3.272l12-4.364M3.75 21V9.818M9.75 6.75h.008v.008H9.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.008v.008H9.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        ),
        categoryTitle: 'دسته سرمایه‌گذاری و خرید ملک (Golden Visa & Property)',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        borderColor: 'hover:border-emerald-500',
        accentBg: 'bg-emerald-600',
      };
    }
    if (
      p.includes('پزشک') ||
      p.includes('درمان') ||
      p.includes('medical') ||
      p.includes('پرستار') ||
      p.includes('مطب')
    ) {
      return {
        // آیکون SVG اختصاصی کادر درمان و پزشکی (Healthcare)
        iconSvg: (
          <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        ),
        categoryTitle: 'دسته کادر درمان و پزشکی (Healthcare & Medical)',
        badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
        borderColor: 'hover:border-teal-500',
        accentBg: 'bg-teal-600',
      };
    }
    if (
      p.includes('استارت') ||
      p.includes('شرکت') ||
      p.includes('startup') ||
      p.includes('کارآفرین') ||
      p.includes('بیزینس')
    ) {
      return {
        // آیکون SVG اختصاصی استارت‌آپ و کارآفرینی (Startup)
        iconSvg: (
          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m0 0l4.98 4.98m-4.98-4.98L3 21" />
          </svg>
        ),
        categoryTitle: 'دسته کارآفرینی و استارت‌آپ (Startup & Business)',
        badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
        borderColor: 'hover:border-purple-500',
        accentBg: 'bg-purple-600',
      };
    }
    if (p.includes('نوماد') || p.includes('فریلنس') || p.includes('دورکاری') || p.includes('nomad')) {
      return {
        // آیکون SVG اختصاصی دیجیتال نوماد (Nomad / Laptop)
        iconSvg: (
          <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
          </svg>
        ),
        categoryTitle: 'دسته دیجیتال نوماد و دورکاری (Digital Nomad)',
        badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        borderColor: 'hover:border-cyan-500',
        accentBg: 'bg-cyan-600',
      };
    }
    return {
      iconSvg: (
        <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      categoryTitle: 'دسته اقامت قانونی اروپا (Residence & Visa)',
      badgeBg: 'bg-slate-100 text-slate-700 border-slate-200',
      borderColor: 'hover:border-[#f5a623]',
      accentBg: 'bg-[#082833]',
    };
  };

  /**
   * دانلود PDF خلاصه ارزیابی و چک‌لیست با استفاده از jsPDF و html2canvas
   */
  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    try {
      setIsGeneratingPdf(true);
      setPdfSuccess(false);

      // ایجاد رندرینگ دقیق از المان گزارش
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // وضوح بالا برای متون فارسی
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // افزودن صفحه اول
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // در صورت چندصفحه‌ای بودن گزارش
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const todayStr = new Date().toISOString().split('T')[0];
      pdf.save(`خلاصه_ارزیابی_مهاجرتی_دیاکو_${todayStr}.pdf`);
      setPdfSuccess(true);

      // فراهم کردن امکان پرینت برای متقاضی بلافاصله پس از ایجاد PDF
      setTimeout(() => {
        window.print();
      }, 600);

      setTimeout(() => setPdfSuccess(false), 8000);
    } catch (err) {
      console.error('PDF export failed:', err);
      // راهکار جایگزین در صورت مسدود بودن canvas
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-7 md:p-10 shadow-soft" dir="rtl">
      {/* بخش قابل استخراج گزارش به صورت کامل */}
      <div ref={reportRef} id="assessment-result-printable" className="bg-white p-2 sm:p-4">
        {/* سربرگ رسمی با لوگوی دیاکو جهت نسخه چاپی و PDF */}
        <div className="flex items-center justify-between border-b-2 border-slate-100 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <DiacoLogo size={46} />
            <div>
              <h1 className="text-base sm:text-lg font-black text-[#082833]">
                هلدینگ مهاجرتی و حقوقی دیاکو
              </h1>
              <p className="text-[11px] font-bold text-slate-500">
                گزارش رسمی سنجش شانس ویزا و چک‌لیست مدارک کنسولی ۲۰۲۶
              </p>
            </div>
          </div>
          <div className="text-left text-[11px] font-medium text-slate-500 hidden sm:block" dir="ltr">
            <p className="font-bold text-[#082833]">Diaco Holding</p>
            <p>Ref: DIA-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        </div>

        {/* سربرگ نمره و ارزیابی */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-800">
            نتیجه تحلیل کارشناسی هوشمند
          </span>
          <h2 className="mt-4 text-2xl font-black text-[#0b2933] sm:text-3xl">
            گزارش جامع شانس موفقیت و نقشه راه مهاجرت شما
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            محاسبه شده بر مبنای معیارهای کنسولی ۲۰۲۶، ظرفیت‌های استانی و تجارب بیش از ۲۰۰۰ پرونده موفق دیاکو
          </p>

          {/* کارت نمره */}
          <div className="mx-auto mt-8 max-w-md rounded-3xl border border-slate-200 bg-gradient-to-b from-[#f7fbfc] to-slate-50 p-6 text-center shadow-sm">
            <p className="text-xs font-bold text-slate-500">امتیاز کل انطباق پرونده شما</p>
            <div className="mt-2 text-6xl font-black text-[#082833]">
              {toPersianDigits(plan.totalScore)}
              <span className="text-2xl font-bold text-slate-400"> / ۱۰۰</span>
            </div>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full bg-gradient-to-l ${levelBadge.bar} transition-all duration-1000`}
                style={{ width: `${plan.totalScore}%` }}
              />
            </div>
            <p className={`mt-3 inline-block rounded-xl border px-3 py-1 text-xs font-black ${levelBadge.bg}`}>
              {plan.levelLabel}
            </p>
          </div>
        </div>

        {/* خلاصه تحلیل حقوقی */}
        <div className="mt-8 rounded-2xl bg-[#082833] p-6 text-white border border-white/10 shadow-lg">
          <h3 className="text-base font-bold text-[#f5a623] flex items-center gap-2">
            <span>⚖️</span>
            <span>خلاصه ارزیابی وکلای دیاکو:</span>
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-7 text-white/90 text-justify">{plan.planOverview}</p>
        </div>

        {/* گزینه‌های پیشنهادی برتر با آیکون‌های اختصاصی دسته‌های مهاجرتی */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-[#0b2933] flex items-center gap-2">
              <span>🌟</span>
              <span>مسیرهای دارای بیشترین شانس پذیرش برای شما:</span>
            </h3>
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">
              مرتب شده بر اساس ضریب انطباق کنسولی
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {plan.recommendedOptions.map((opt, i) => {
              const category = getCategoryDetails(opt.pathName);
              return (
                <div
                  key={i}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 ${category.borderColor} hover:shadow-card hover:-translate-y-1`}
                >
                  <div>
                    {/* نوار بالای کارت: پرچم کشور + نشانگر انطباق */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl filter drop-shadow-xs">{opt.flag}</span>
                        <div>
                          <h4 className="text-base font-black text-[#0b2933]">{opt.country}</h4>
                          <span className="text-[10px] font-bold text-slate-500">حوزه شینگن ۲۰۲۶</span>
                        </div>
                      </div>
                      <span className="rounded-full bg-amber-50 border border-amber-300 px-3 py-1 text-xs font-black text-amber-900 shadow-xs">
                        تطابق: {toPersianDigits(opt.matchScore)}٪
                      </span>
                    </div>

                    {/* بج اختصاصی دسته مهاجرتی همراه با آیکون اختصاصی SVG چمدان/کتاب/قلعه/ملک */}
                    <div className="mt-3.5 flex items-center gap-2.5">
                      <span className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-2xl shadow-xs border ${category.badgeBg}`}>
                        {category.iconSvg}
                      </span>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-[10px] font-bold text-slate-500 truncate">
                          {category.categoryTitle}
                        </p>
                        <p className="text-xs sm:text-sm font-black text-[#0e3846]">
                          {opt.pathName}
                        </p>
                      </div>
                    </div>

                    {/* توضیحات دلیل انتخاب این مسیر */}
                    <p className="mt-3 text-[11px] leading-5 text-slate-600 border-t border-slate-100 pt-2.5 text-justify">
                      {opt.reason}
                    </p>
                  </div>

                  {/* نوار وضعیت پذیرش در پایین کارت */}
                  <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <span>✓</span>
                      <span>سهمیه باز ۲۰۲۶</span>
                    </span>
                    <span className="text-[#082833] group-hover:text-amber-600 transition">
                      بررسی الزامات ←
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* نقاط قوت و بهبود */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-800">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-600 text-white text-xs">✓</span>
              نقاط قوت کلیدی پرونده شما:
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs leading-6 text-emerald-900">
              {plan.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-600" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-amber-800">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-amber-600 text-white text-xs">!</span>
              توصیه‌ها برای افزایش تضمین ویزا:
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs leading-6 text-amber-900">
              {plan.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-amber-600" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* جدول زمانی مراحل */}
        <div className="mt-10">
          <h3 className="text-base sm:text-lg font-bold text-[#0b2933]">
            زمان‌بندی و فازهای اجرایی پرونده (تخمین {toPersianDigits(plan.estimatedMonths[0])} تا {toPersianDigits(plan.estimatedMonths[1])} ماه):
          </h3>
          <div className="mt-4 space-y-3">
            {plan.timeline.map((phase, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <h4 className="text-xs sm:text-sm font-bold text-[#0b2933]">{phase.phase}</h4>
                <ul className="mt-2 space-y-1.5 text-xs leading-6 text-slate-600">
                  {phase.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#f5a623]" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* کارت مدرن با سایه نرم (shadow-soft) برای نمایش چک‌لیست مدارک */}
        <div className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft transition-all">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500/10 text-[#f5a623] border border-amber-400/30 shadow-xs">
                <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-black text-emerald-800">
                    استاندارد کنسولی ۲۰۲۶
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">انطباق ۱۰۰٪ با مراجع MA35 و شینگن</span>
                </div>
                <h3 className="mt-1 text-base sm:text-lg font-black text-[#082833]">
                  چک‌لیست رسمی مدارک و اسناد پرونده مهاجرتی شما
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span>راهنما: مدارک تکمیل‌شده را علامت بزنید</span>
            </div>
          </div>
          <DynamicDocumentChecklist profile={profile} plan={plan} />
        </div>

        {/* جدول برآورد هزینه‌ها */}
        <div className="mt-10">
          <h3 className="text-base sm:text-lg font-bold text-[#0b2933]">برآورد تقریبی هزینه‌های دولتی و پرونده:</h3>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#082833] text-white">
                <tr>
                  <th className="p-3.5 font-bold">عنوان هزینه</th>
                  <th className="p-3.5 font-bold">مبلغ تخمینی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {plan.estimatedCosts.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3.5 font-medium text-slate-700">{c.item}</td>
                    <td className="p-3.5 font-bold text-[#0b2933]">{c.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================
            اطلاعات تماس رسمی هلدینگ مهاجرتی دیاکو (Diaco Immigration Holding)
            در انتهای گزارش ارزیابی (جهت پرینت و خروجی PDF متقاضی)
           ======================================================== */}
        <div className="mt-12 rounded-3xl border-2 border-[#0b2933]/20 bg-gradient-to-br from-[#08222b] via-[#0d3442] to-[#08222b] p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-5">
            <div className="flex items-center gap-3.5">
              <DiacoLogo size={52} />
              <div>
                <h4 className="text-base sm:text-lg md:text-xl font-black text-white">
                  هلدینگ مهاجرتی دیاکو | Diaco Immigration Holding
                </h4>
                <p className="text-xs text-amber-300 font-semibold mt-0.5">
                  مرکز تخصصی ارزیابی، وکالت و اخذ اقامت کشورهای اروپایی
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-bold text-amber-300">
                وین • آتن • تهران
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-xs">
            {/* تلفن‌های تماس مستقیم */}
            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4">
              <p className="font-bold text-amber-300 flex items-center gap-1.5 text-xs sm:text-sm">
                <span>📞</span>
                <span>تلفن‌های تماس و مشاوره مستقیم:</span>
              </p>
              <div className="mt-3 space-y-2 text-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">مرکز تماس مرکزی تهران:</span>
                  <a href="tel:02191693955" dir="ltr" className="font-bold text-white hover:text-amber-300 transition">
                    021 9169 3955
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">پشتیبانی واتس‌اپ ۲۴/۷:</span>
                  <a href="https://wa.me/989197340829" target="_blank" rel="noopener noreferrer" dir="ltr" className="font-bold text-emerald-400 hover:underline">
                    +98 919 734 0829
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">دفتر اتریش (وین):</span>
                  <a href="tel:+436889763256" dir="ltr" className="font-bold text-white hover:text-amber-300 transition">
                    +43 688 976 3256
                  </a>
                </div>
              </div>
            </div>

            {/* نشانی دفاتر حضوری */}
            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4">
              <p className="font-bold text-amber-300 flex items-center gap-1.5 text-xs sm:text-sm">
                <span>🏛️</span>
                <span>نشانی دفاتر رسمی دیاکو:</span>
              </p>
              <div className="mt-3 space-y-2.5 text-slate-200 text-[11px] leading-relaxed">
                <div>
                  <span className="font-bold text-white block">دفتر مرکزی تهران (ایران):</span>
                  <p className="text-slate-300 mt-0.5">ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴</p>
                </div>
                <div>
                  <span className="font-bold text-white block">دفتر وین (اتریش):</span>
                  <p className="text-slate-300 mt-0.5" dir="ltr">Ausstellungsstraße 50/2.OG, 1020 Wien, Austria</p>
                </div>
                <div>
                  <span className="font-bold text-white block">دفتر آتن (یونان):</span>
                  <p className="text-slate-300 mt-0.5" dir="ltr">Grigoriou Lampraki 58, Glyfada, 166 75, Greece</p>
                </div>
              </div>
            </div>

            {/* پرتال‌ها و وب‌سایت‌های رسمی */}
            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 sm:col-span-2 lg:col-span-1">
              <p className="font-bold text-amber-300 flex items-center gap-1.5 text-xs sm:text-sm">
                <span>🌐</span>
                <span>پرتال‌ها و دامنه‌های هلدینگ:</span>
              </p>
              <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px]">
                <a href="https://www.dia-co.ir" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 px-2 py-1.5 text-center font-bold hover:bg-amber-400/20 hover:text-amber-300 transition">
                  www.dia-co.ir
                </a>
                <a href="https://otrish-iran.ir" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 px-2 py-1.5 text-center font-bold hover:bg-amber-400/20 hover:text-amber-300 transition">
                  Otrish-Iran.ir
                </a>
                <a href="https://alman-iran.ir" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 px-2 py-1.5 text-center font-bold hover:bg-amber-400/20 hover:text-amber-300 transition">
                  Alman-Iran.ir
                </a>
                <a href="https://spain-iran.ir" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 px-2 py-1.5 text-center font-bold hover:bg-amber-400/20 hover:text-amber-300 transition">
                  Spain-Iran.ir
                </a>
                <a href="https://ukiran.ir" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 px-2 py-1.5 text-center font-bold hover:bg-amber-400/20 hover:text-amber-300 transition">
                  UKIran.ir
                </a>
                <a href="https://hu-ir.ir" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 px-2 py-1.5 text-center font-bold hover:bg-amber-400/20 hover:text-amber-300 transition">
                  HU-IR.ir
                </a>
              </div>
              <p className="mt-3 text-[10px] text-slate-300 leading-4">
                برای رزرو جلسه بررسی حضوری در دفتر تهران یا جلسه آنلاین با وکلای مستقر در وین، با شماره ۰۲۱۹۱۶۹۳۹۵۵ تماس بگیرید.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-2">
            <span>شماره پرونده ارزیابی هوشمند: DAC-2026-{(profile.fullName || 'APPL').slice(0, 4).toUpperCase()}</span>
            <span>تاریخ صدور: {new Date().toLocaleDateString('fa-IR')} | استاندارد رسمی مهاجرتی دیاکو ۲۰۲۶</span>
            <span>کلیه حقوق قانونی برای هلدینگ مهاجرتی دیاکو محفوظ است.</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          بخش دانلود PDF خلاصه ارزیابی و امکان پرینت مستقیم
         ======================================================== */}
      <div className="mt-12 rounded-3xl border-2 border-amber-400/40 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 flex-none place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md text-2xl">
              📄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-rose-100 border border-rose-300 px-2.5 py-0.5 text-[10px] font-black text-rose-800">
                  خروجی رسمی سند PDF و پرینت
                </span>
                <span className="rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                  نسخه ۲۰۲۶
                </span>
              </div>
              <h3 className="mt-1.5 text-base sm:text-lg md:text-xl font-black text-[#082833]">
                دانلود فایل PDF خلاصه ارزیابی و امکان پرینت
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-xl">
                با کلیک روی دکمه زیر، فایل PDF کامل پرونده ارزیابی شامل نمره انطباق، چک‌لیست مدارک، برآورد هزینه‌ها و اطلاعات رسمی تماس هلدینگ مهاجرتی دیاکو دانلود شده و کادر پرینت برای متقاضی فعال می‌شود.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end flex-shrink-0">
            <button
              type="button"
              disabled={isGeneratingPdf}
              onClick={handleDownloadPDF}
              className={`flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer ${
                isGeneratingPdf ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              {isGeneratingPdf ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#082833] border-t-transparent" />
                  <span>در حال آماده‌سازی فایل PDF و پرینت...</span>
                </>
              ) : (
                <>
                  <span>📥</span>
                  <span>دانلود خلاصه ارزیابی (PDF) و پرینت</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white hover:bg-slate-100 px-4 py-3.5 text-xs sm:text-sm font-bold text-slate-700 shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>🖨️</span>
              <span>چاپ مستقیم (Print)</span>
            </button>
          </div>
        </div>

        {pdfSuccess && (
          <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs font-bold text-emerald-800 flex flex-wrap items-center justify-between gap-2 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="text-base">✓</span>
              <span>فایل PDF خلاصه ارزیابی دانلود شد و پنجره پرینت متقاضی فعال گردید.</span>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="text-emerald-900 underline hover:text-emerald-950 font-black cursor-pointer text-xs"
            >
              چاپ مجدد برگه 🖨️
            </button>
          </div>
        )}
      </div>

      {/* باکس کال تو اکشن نهایی */}
      <div className="mt-10 rounded-3xl bg-gradient-to-l from-[#082833] via-[#0e3846] to-[#144f62] p-6 text-white text-center md:p-8 shadow-xl">
        <h4 className="text-lg sm:text-xl font-black text-[#f5a623]">
          آماده شروع پرونده و دریافت مشاوره تخصصی هستید؟
        </h4>
        <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm leading-6 text-white/80">
          کارشناسان ارشد هلدینگ دیاکو پرونده شما را به صورت انفرادی و دقیق بررسی کرده و بهترین استراتژی را پیشنهاد می‌دهند.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="tel:+982191693955"
            className="rounded-xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3 text-xs sm:text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95"
          >
            تماس با مشاور ارشد: ۰۲۱۹۱۶۹۳۹۵۵
          </a>
          <a
            href="https://wa.me/989197340829"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white px-5 py-3 text-xs sm:text-sm font-bold shadow-md transition hover:scale-105"
          >
            ارتباط مستقیم در واتس‌اپ
          </a>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/20"
          >
            شروع ارزیابی مجدد
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;
