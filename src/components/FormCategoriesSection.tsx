import React from 'react';
import { ASSESSMENT_FORMS } from '../constants/content';

interface Props {
  onOpenAssessment: () => void;
}

export const FormCategoriesSection: React.FC<Props> = ({ onOpenAssessment }) => {
  return (
    <section id="form-cats" className="bg-[#0b2933] py-14" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-lg font-black text-[#0b2933] sm:text-2xl flex items-center gap-2">
                <span>📝</span>
                <span>فرم‌های تخصصی ارزیابی آنلاین دیاکو</span>
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                بر اساس دسته‌بندی ویزا و شیوه مهاجرتی، شرایط اختصاصی خود را سنجیده و مشاوره مستقیم دریافت کنید.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-xl bg-[#082833] hover:bg-[#0e3846] text-white px-4 py-2 text-xs font-bold transition cursor-pointer"
            >
              شروع ارزیابی جامع
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {ASSESSMENT_FORMS.map((form) => (
              <button
                key={form.id}
                type="button"
                onClick={onOpenAssessment}
                className="group flex flex-col items-start justify-between rounded-2xl border border-slate-200 bg-[#f9fbfc] p-4 text-right transition hover:-translate-y-1 hover:border-[#f5a623] hover:bg-amber-50/50 hover:shadow-card cursor-pointer"
              >
                <div className="w-full">
                  <div className="flex w-full items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-xl shadow-sm group-hover:scale-110 transition">
                      {form.icon}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
                      آنلاین
                    </span>
                  </div>
                  <h3 className="mt-3 text-xs font-bold text-[#0b2933] group-hover:text-[#0e3846]">
                    {form.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500 line-clamp-3">
                    {form.description}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-[#0e3846] group-hover:text-[#f5a623]">
                  <span>تکمیل فرم</span>
                  <span>←</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormCategoriesSection;
