import React, { useEffect, useRef, useState } from 'react';
import DiacoLogo from './DiacoLogo';

interface Props {
  onOpenAssessment?: () => void;
}

interface StatItem {
  icon: string;
  label: string;
  value: string;
}

interface OfficeItem {
  flag: string;
  country: string;
  address: string;
  highlight?: boolean;
}

interface TrustItem {
  icon: string;
  title: string;
  description: string;
}

const OFFICES: OfficeItem[] = [
  {
    flag: '🇦🇹',
    country: 'دفتر مرکزی وین',
    address: 'Ausstellungsstraße 50, 1020 Wien',
    highlight: true,
  },
  {
    flag: '🇬🇷',
    country: 'دفتر آتن',
    address: 'Grigoriou Lampraki 58, Glyfada',
  },
  {
    flag: '🇮🇷',
    country: 'دفتر تهران',
    address: 'ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴',
  },
];

const STATS: StatItem[] = [
  { icon: '💼', label: 'سابقه فعالیت', value: '+۱۰ سال' },
  { icon: '📜', label: 'پرونده موفق', value: '+۲۰۰۰' },
  { icon: '👨‍⚖️', label: 'وکلای بین‌المللی', value: '+۳۵ وکیل' },
  { icon: '🌍', label: 'کشورهای فعال', value: '۱۱ کشور' },
];

const TRUST_POINTS: TrustItem[] = [
  {
    icon: '⚖️',
    title: 'وکلای رسمی در اروپا',
    description: 'پرونده شما مستقیماً توسط وکلای رسمی در کشورهای اروپایی پیگیری می‌شود، نه واسطه‌ها.',
  },
  {
    icon: '📋',
    title: 'شفافیت کامل قرارداد',
    description: 'قرارداد رسمی از گام نخست، با تعهدنامه کتبی و بدون هزینه‌های پنهان.',
  },
  {
    icon: '🏠',
    title: 'خدمات پس از ورود',
    description: 'اجاره مسکن رسمی، ثبت اقامت و آدرس، و افتتاح حساب بانکی تا استقرار کامل در کشور مقصد.',
  },
  {
    icon: '🔐',
    title: 'حفظ محرمانگی',
    description: 'تمام اسناد و اطلاعات پرونده با استانداردهای GDPR اتحادیه اروپا محافظت می‌شود.',
  },
];

/**
 * هوک کوچک برای شمارش انیمیشنی اعداد
 */
const useCountUp = (target: number, duration = 1600, start = false) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let rafId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return value;
};

export const AboutSection: React.FC<Props> = ({ onOpenAssessment }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  // انیمیشن ورود با IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const years = useCountUp(10, 1400, visible);
  const cases = useCountUp(2000, 1800, visible);
  const lawyers = useCountUp(35, 1400, visible);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      dir="rtl"
      className="relative py-20 sm:py-24 overflow-hidden bg-gradient-to-b from-[#07242d] via-[#092e3a] to-[#0b3340] text-white"
    >
      {/* افکت‌های پس‌زمینه */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-10 h-80 w-80 rounded-full bg-[#f5a623]/10 blur-[140px]" />
        <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[#f5a623]/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="mx-auto max-w-6xl">
          <div
            className={`grid lg:grid-cols-12 gap-8 items-stretch rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-10 backdrop-blur-xl shadow-2xl transition-all duration-700 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* ===== کارت هویت برند ===== */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="group relative w-full overflow-hidden rounded-3xl border-2 border-[#f5a623]/40 bg-[#08222b] p-6 shadow-glow text-center transition-all duration-500 hover:border-[#f5a623]/70 hover:shadow-[0_0_40px_rgba(245,166,35,0.55)]">
                {/* درخشش گوشه */}
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#f5a623]/20 blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-60"
                />

                <div className="relative mx-auto flex justify-center mb-4">
                  <DiacoLogo size={70} />
                </div>

                {/* نشانگر دفاتر فعال */}
                <div className="relative inline-flex items-center gap-1.5 rounded-xl bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/10 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5a623] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f5a623]" />
                  </span>
                  <span className="text-[11px] font-bold text-amber-300">
                    دفاتر فعال در وین، آتن و تهران
                  </span>
                </div>

                <h3 className="relative text-lg font-black text-white">
                  هلدینگ بین‌المللی دیاکو
                </h3>
                <p className="relative text-xs text-amber-300/90 mt-1 font-semibold">
                  بزرگ‌ترین مجموعه تخصصی اقامت اتریش و شینگن
                </p>

                {/* لیست دفاتر */}
                <div className="relative mt-5 space-y-2 border-t border-white/10 pt-4 text-[11px] text-slate-300 text-right">
                  {OFFICES.map((office) => (
                    <div
                      key={office.country}
                      className={`flex items-start gap-2 rounded-lg p-2 transition ${
                        office.highlight
                          ? 'bg-[#f5a623]/10 border border-[#f5a623]/25'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <span className="text-base leading-none mt-0.5">{office.flag}</span>
                      <div className="flex-1">
                        <p className="font-bold text-white text-[11px]">{office.country}</p>
                        <p className="text-slate-400 text-[10px] mt-0.5 ltr:text-left" dir="ltr">
                          {office.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* نشان‌های اعتماد */}
                <div className="relative mt-5 flex flex-wrap items-center justify-center gap-1.5 border-t border-white/10 pt-4">
                  {['✅ رسمی', '🛡️ GDPR', '⚖️ وکلای اتریش'].map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== توضیحات درباره ما ===== */}
            <div className="lg:col-span-7 flex flex-col items-start text-right">
              <div className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-bold text-amber-300">
                <span aria-hidden="true">🛡️</span>
                <span>درباره هلدینگ بین‌المللی دیاکو</span>
              </div>

              <h2
                id="about-heading"
                className="mt-4 text-2xl sm:text-3xl font-black text-white leading-tight"
              >
                یک دهه تخصص، همراهی مستمر و اعتماد متقاضیان
              </h2>

             <div className="mt-4 space-y-3 text-xs sm:text-sm leading-7 text-slate-200 text-justify">
  <p>
    هلدینگ بین‌المللی دیاکو (<span className="ltr:inline" dir="ltr">Diaco Holding</span>)
    با بیش از یک دهه تجربه مستمر در حوزه امور مهاجرتی، اقامتی و سرمایه‌گذاری در اروپا،
    با همکاری با <strong className="text-amber-300">۳۵ وکیل رسمی و مشاور بین‌المللی</strong>،
    بستر امن و مطمئنی را برای تحقق اهداف مهاجرتی هموطنان فراهم آورده است.
  </p>
  <p>
    تفاوت بنیادین دیاکو در این است که پرونده شما <strong className="text-amber-300">هرگز به واسطه‌ها واگذار نمی‌شود</strong>؛
    بلکه از گام نخست ارزیابی و عقد قرارداد رسمی تا تحویل فیزیکی کارت اقامت در
    اداره مهاجرت کشور مقصد و خدمات پس از ورود
    (ثبت اقامت و امور اداری)، تمامی مراحل مستقیماً توسط وکلای مقیم کشورهای اروپایی پیگیری می‌شود.
  </p>
  <p className="text-slate-300/90">
    خدمات ما در ۲۰۲۶ شامل مسیرهای کاری (کارت‌های کاری و بلوکارت)، تمکن مالی، تحصیلی،
    استارت‌آپ، گلدن ویزا و الحاق خانواده در <strong className="text-amber-300">۱۱ کشور اروپایی</strong> است.
  </p>
</div>

              {/* ===== کادرهای آماری با شمارش انیمیشنی ===== */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full border-t border-white/10 pt-6">
                {[
                  { icon: '💼', label: 'سابقه فعالیت', value: `+${years} سال` },
                  { icon: '📜', label: 'پرونده موفق', value: `+${cases.toLocaleString('fa-IR')}` },
                  { icon: '👨‍⚖️', label: 'وکلای بین‌المللی', value: `+${lawyers} وکیل` },
                  { icon: '🌍', label: 'کشورهای فعال', value: '۱۱ کشور' },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    style={{ transitionDelay: `${idx * 80}ms` }}
                    className={`rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-center transition-all duration-500 hover:border-[#f5a623]/40 hover:bg-white/[0.09] hover:-translate-y-0.5 ${
                      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl" aria-hidden="true">
                      {item.icon}
                    </span>
                    <p className="mt-1 text-[10px] sm:text-xs text-slate-400">{item.label}</p>
                    <p className="mt-0.5 text-xs sm:text-sm font-black text-[#f5a623]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* ===== نقاط تمایز (Trust Points) ===== */}
              <div className="mt-6 grid sm:grid-cols-2 gap-3 w-full">
                {TRUST_POINTS.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-[#f5a623]/30 hover:bg-white/[0.07]"
                  >
                    <span className="text-lg leading-none mt-0.5" aria-hidden="true">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">{item.title}</p>
                      <p className="mt-0.5 text-[11px] leading-5 text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ===== دکمه‌ها ===== */}
              <div className="mt-7 flex flex-wrap items-center gap-3 w-full">
                <a
                  href="https://www.dia-co.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="وب‌سایت رسمی هلدینگ مهاجرتی دیاکو"
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3 text-xs sm:text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5a623]"
                >
                  <span className="relative z-10">وب‌سایت رسمی www.dia-co.ir</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                </a>

                {onOpenAssessment && (
                  <button
                    type="button"
                    onClick={onOpenAssessment}
                    className="rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-3 text-xs sm:text-sm font-bold shadow-md transition hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                  >
                    شروع ارزیابی آنلاین
                  </button>
                )}

                <a
                  href="tel:+982191693955"
                  className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/10 hover:border-[#f5a623]/50 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5a623]"
                >
                  تماس: 02191693955
                </a>
              </div>

              {/* خط اعتماد */}
              <p className="mt-4 text-[10px] text-slate-500">
                🕐 پاسخ‌گویی: شنبه تا پنجشنبه، ۹ صبح الی ۷ عصر (به وقت تهران)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;