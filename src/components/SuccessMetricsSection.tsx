import React, { useState, useEffect, useRef } from 'react';
import { toPersianDigits } from '../utils/persian';

interface MetricItem {
  id: string;
  label: string;
  targetValue: number;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
  description: string;
  icon: string;
  color: string;
  percentage?: number;
}

const METRICS: MetricItem[] = [
  {
    id: 'visas-granted',
    label: 'ویزای اعطا شده (سال اخیر)',
    targetValue: 520,
    prefix: '+',
    suffix: '',
    description: 'صدور ویزای تایپ D و کارت اقامت شینگن برای متقاضیان ایرانی',
    icon: '🛂',
    color: '#f5a623',
    percentage: 88,
  },
  {
    id: 'approval-rate',
    label: 'نرخ قبولی پرونده‌ها',
    targetValue: 98.4,
    prefix: '',
    suffix: '٪',
    decimalPlaces: 1,
    description: 'نتیجه کارشناسی اولیه دقیق و عدم پذیرش پرونده‌های فاقد صلاحیت',
    icon: '🎯',
    color: '#10b981',
    percentage: 98.4,
  },
  {
    id: 'total-residencies',
    label: 'کل پرونده‌های اقامتی موفق',
    targetValue: 2150,
    prefix: '+',
    suffix: '',
    description: 'بیش از یک دهه فعالیت رسمی و پیگیری بدون واسطه در اتریش و اروپا',
    icon: '🏛️',
    color: '#38bdf8',
    percentage: 94,
  },
  {
    id: 'avg-time',
    label: 'میانگین زمان صدور اقامت',
    targetValue: 4.2,
    prefix: '',
    suffix: ' ماه',
    decimalPlaces: 1,
    description: 'سرعت عمل بالا با تکیه بر وکلای رسمی مستقر در وین و آتن',
    icon: '⚡',
    color: '#a855f7',
    percentage: 75,
  },
];

const CATEGORY_RATES = [
  { name: 'اقامت تمکن مالی اتریش (سهمیه‌ای)', rate: 99.1, count: '۲۸۰+ پرونده' },
  { name: 'کارت قرمز-سفید-قرمز و نیروی ماهر', rate: 97.5, count: '۱۴۰+ پرونده' },
  { name: 'کارت آبی آلمان (Blue Card)', rate: 98.2, count: '۱۲۰+ پرونده' },
  { name: 'گلدن ویزای سرمایه‌گذاری یونان و اسپانیا', rate: 100, count: '۸۵+ پرونده' },
  { name: 'پذیرش دانشگاهی و ویزای تحصیلی', rate: 96.8, count: '۱۹۰+ پرونده' },
];

export const SuccessMetricsSection: React.FC = () => {
  const [counts, setCounts] = useState<Record<string, number>>({
    'visas-granted': 0,
    'approval-rate': 0,
    'total-residencies': 0,
    'avg-time': 0,
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts({
        'visas-granted': Math.floor(easeProgress * 520),
        'approval-rate': +(easeProgress * 98.4).toFixed(1),
        'total-residencies': Math.floor(easeProgress * 2150),
        'avg-time': +(easeProgress * 4.2).toFixed(1),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="metrics"
      className="relative overflow-hidden bg-gradient-to-b from-[#061a21] via-[#07242e] to-[#061a21] py-16 sm:py-20 text-white"
      dir="rtl"
    >
      {/* هاله‌های نور پس‌زمینه */}
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#f5a623]/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="container mx-auto px-4 md:px-8 relative">
        {/* سربرگ بخش */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300 shadow-inner">
            <span className="h-2 w-2 rounded-full bg-[#f5a623] animate-ping" />
            شاخص‌های کلیدی عملکرد (KPIs)
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white">
            کارنامه واقعی موفقیت پرونده‌های هلدینگ دیاکو
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            آمار مستند و شفاف رضایت موکلین، سرعت فرآیندها و نرخ صدور روادید در مراجع رسمی اتریش و شینگن
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-l from-[#fed871] to-[#f5a623]" />
        </div>

        {/* ۴ کارت اصلی آمار شمارشی با ویژوالایزر */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((item) => {
            const currentValue = counts[item.id] || 0;
            const formattedNum = item.decimalPlaces
              ? toPersianDigits(currentValue.toFixed(item.decimalPlaces))
              : toPersianDigits(Math.round(currentValue).toLocaleString('en-US'));

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f5a623]/40 hover:shadow-2xl"
              >
                {/* افکت گرادیان حاشیه هنگام هاور */}
                <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-[#f5a623]/20 via-transparent to-cyan-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  {/* آیکون و درصد شاخص */}
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.07] text-2xl shadow-inner group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-1 text-[11px] font-black"
                      style={{
                        backgroundColor: `${item.color}20`,
                        color: item.color,
                        border: `1px solid ${item.color}40`,
                      }}
                    >
                      {toPersianDigits(item.percentage || 95)}٪ انطباق
                    </span>
                  </div>

                  {/* عدد متحرک (Count-up) */}
                  <div className="mt-5 flex items-baseline gap-1" dir="rtl">
                    {item.prefix && (
                      <span className="text-2xl font-black text-[#f5a623]">{item.prefix}</span>
                    )}
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {formattedNum}
                    </span>
                    {item.suffix && (
                      <span className="text-lg font-bold text-slate-300">{item.suffix}</span>
                    )}
                  </div>

                  <h3 className="mt-2 text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.label}
                  </h3>

                  <p className="mt-1 text-[11px] leading-5 text-slate-400">
                    {item.description}
                  </p>

                  {/* نوار پیشرفت ویژوالایزر */}
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: hasAnimated ? `${item.percentage}%` : '0%',
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}80`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* بخش دیتا ویژوالایزیشن نموداری تفکیک روش‌ها */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* ستون راست: نمودار میله‌ای مقایسه‌ای */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span>📊</span>
                  <span>نرخ موفقیت و تعداد پرونده‌های صادرشده به تفکیک روش:</span>
                </h3>
                <span className="text-xs text-amber-300 font-bold hidden sm:inline">
                  مبنای سال جاری
                </span>
              </div>

              <div className="space-y-4 pt-2">
                {CATEGORY_RATES.map((cat, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{cat.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400">{cat.count}</span>
                        <span className="font-black text-[#f5a623]">
                          {toPersianDigits(cat.rate)}٪
                        </span>
                      </div>
                    </div>
                    {/* نوار افقی پیشرفت */}
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] transition-all duration-1000"
                        style={{
                          width: hasAnimated ? `${cat.rate}%` : '0%',
                          transitionDelay: `${idx * 150}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ستون چپ: رینگ‌های چارت دوناتی و گارانتی حقوقی */}
            <div className="lg:col-span-5 flex flex-col justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#08222b] to-[#0c3543] p-6 text-center">
              <div className="relative mx-auto h-32 w-32 flex items-center justify-center">
                {/* دایره SVG گیج */}
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f5a623"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={hasAnimated ? 2 * Math.PI * 40 * (1 - 0.984) : 2 * Math.PI * 40}
                    strokeLinecap="round"
                    fill="transparent"
                    style={{ transition: 'stroke-dashoffset 2s ease-out' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">
                    {hasAnimated ? toPersianDigits('98.4') : '۰'}٪
                  </span>
                  <span className="text-[9px] font-bold text-amber-300">قبولی کلی</span>
                </div>
              </div>

              <h4 className="mt-4 text-sm font-black text-white">
                تضمین قراردادهای حقوقی و تعهد مرحله‌ای
              </h4>
              <p className="mt-1 text-xs text-slate-300 leading-5">
                تاییدیه رسمی وکلای مقیم وین در کلیه پرونده‌های تمکن مالی و کاری با پشتیبانی مستمر تا تحویل اقامت.
              </p>

              <div className="mt-4 flex items-center justify-center gap-2 pt-2 border-t border-white/10 text-[11px] text-emerald-400 font-bold">
                <span>✓</span>
                <span>صفر ریجکتی در پرونده‌های دارای ارزیابی مثبت اولیه</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessMetricsSection;
