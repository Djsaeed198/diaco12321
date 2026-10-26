import OptimizedImage from './OptimizedImage';
import React, { useState } from 'react';
const bannerImg = '/images/banner-diaco-1790696346659.jpg';

interface Props {
  onOpenAssessment?: () => void;
}

export const BannerSection: React.FC<Props> = ({ onOpenAssessment }) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);

  return (
    <section className="relative bg-[#06181f] py-3 sm:py-5 border-b border-white/10" dir="rtl">
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        {/* ========================================================
            بنر پانورامیک اختصاصی و رسمی هلدینگ دیاکو (Banner-Diaco)
           ======================================================== */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-white/20 bg-gradient-to-r from-slate-100 via-white to-slate-100 shadow-2xl">
          {/* محفظه بنر با تصویر وکتور/رسمی */}
          <div className="relative w-full overflow-hidden select-none">
            {/* تصویر مستر بنر دقیقاً طبق فایل banner-diaco.jpg ارسالی */}
            <div className="relative group cursor-pointer" onClick={() => setImageModalOpen(true)}>
              <OptimizedImage
                loading="eager"
                fetchPriority="high"
                src={bannerImg}
                width={2542}
                height={677}
                sizes="(max-width: 1280px) 100vw, 1280px"
                alt="هلدینگ مهاجرتی دیاکو - با بیش از ۲۰ سال تجربه موفق"
                className="w-full h-auto object-cover max-h-[460px] sm:max-h-[500px] md:max-h-[560px] transition-transform duration-700 group-hover:scale-[1.01]"
              />

              {/* لایه ناوبری هوشمند روی بنر جهت ارائه لینک‌های تعاملی */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex flex-col justify-between p-3 sm:p-5 md:p-6 opacity-95 group-hover:opacity-100 transition-opacity">
                {/* ردیف بالای بنر: دکمه بزرگ‌نمایی */}
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageModalOpen(true);
                    }}
                    className="rounded-xl bg-black/60 hover:bg-black/80 text-white border border-white/20 px-3 py-1 text-[10px] font-bold backdrop-blur-sm transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>🔍</span>
                    <span>مشاهده کیفیت کامل</span>
                  </button>
                </div>

                {/* ردیف پایین بنر: دکمه‌های سریع مطابق تصویر ارسالی */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                  {/* دکمه‌های رنگی ویژه (ارزیابی آنلاین، تلفن، واتساپ ۲۴/۷) */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {/* دکمه فیروزه‌ای ارزیابی آنلاین */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAssessment?.();
                      }}
                      className="flex items-center gap-1.5 rounded-2xl bg-[#00a8cc] hover:bg-[#0092b3] px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-black text-white shadow-xl transition hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>ارزیابی آنلاین</span>
                      <span>←</span>
                    </button>

                    {/* دکمه نارنجی/طلایی تلفن */}
                    <a
                      href="tel:02191693955"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 rounded-2xl bg-[#f5a623] hover:bg-[#e09312] px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-black text-[#082833] shadow-xl transition hover:scale-105 active:scale-95"
                    >
                      <span dir="ltr">02191693955</span>
                      <span>📞</span>
                    </a>

                    {/* دکمه سبز واتساپ ۲۴/۷ */}
                    <a
                      href="https://wa.me/989197340829"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 rounded-2xl bg-[#25d366] hover:bg-[#20ba59] px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-black text-white shadow-xl transition hover:scale-105 active:scale-95"
                    >
                      <span>واتساپ ۲۴/۷</span>
                      <span>💬</span>
                    </a>
                  </div>

                  {/* پلاک‌های میانبر پرتال‌ها */}
                  <div className="hidden lg:flex items-center flex-wrap gap-1.5 text-[11px] font-bold text-slate-200 bg-black/50 px-3 py-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
                    <span>پرتال‌ها:</span>
                    <a href="https://otrish-iran.ir" target="_blank" rel="noopener noreferrer" className="text-red-300 hover:text-red-200 hover:underline">
                      Otrish-Iran
                    </a>
                    <span>•</span>
                    <a href="https://alman-iran.ir" target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-200 hover:underline">
                      Alman-Iran
                    </a>
                    <span>•</span>
                    <a href="https://spain-iran.ir" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 hover:underline">
                      Spain-Iran
                    </a>
                    <span>•</span>
                    <a href="https://ukiran.ir" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 hover:underline">
                      UKIran
                    </a>
                    <span>•</span>
                    <a href="https://hu-ir.ir" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 hover:underline">
                      HU-IR
                    </a>
                    <span>•</span>
                    <a href="https://greece-iran.ir" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline">
                      Greece-Iran
                    </a>
                    <span>•</span>
                    <a href="https://iran-portugal.ir" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 hover:underline">
                      Iran-Portugal
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================
                نوار پایینی بنر دقیقاً مطابق با تیکربار بنر ارسالی
               ======================================================== */}
            <div className="border-t border-white/15 bg-[#031117] px-4 py-2.5 text-[10px] sm:text-xs text-slate-300">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-1.5 text-center">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <span className="text-emerald-400">✓</span>
                  <span>دفاتر رسمی در وین، آتن و تهران</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-emerald-400">✓</span>
                  <span>بیش از ۲۰ سال سابقه درخشان در صدور ویزا و اقامت اروپا</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مدال بزرگ‌نمایی تصویر بنر */}
      {imageModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setImageModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-pointer animate-fadeIn"
        >
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setImageModalOpen(false)}
              className="absolute -top-12 left-0 grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white hover:bg-white/40 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>
            <OptimizedImage
              src={bannerImg}
                width={2542}
                height={677}
                sizes="(max-width: 1280px) 100vw, 1280px"
              alt="بنر دیاکو"
              className="w-full h-auto rounded-2xl shadow-2xl border-2 border-white/20"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default BannerSection;
