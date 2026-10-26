import React from 'react';
import { IMMIGRATION_PATHS, type PathCategory } from '../../constants/immigration';
import type { AssessmentData } from '../../types/assessment';

interface Props {
  data: AssessmentData;
  update: <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => void;
}

const CATEGORIES: { id: PathCategory; label: string; icon: string }[] = [
  { id: 'financial', label: 'روش‌های مالی و سرمایه‌گذاری (بدون نیاز به کارفرما)', icon: '🏛️' },
  { id: 'work', label: 'روش‌های کاری و تخصصی (کارت قرمز-سفید-قرمز و بلوکارت)', icon: '💼' },
  { id: 'study', label: 'روش‌های تحصیلی و دانشگاهی', icon: '🎓' },
  { id: 'family', label: 'الحاق خانواده و پیوست', icon: '👨‍👩‍👦' },
];

const DIFFICULTY_LABEL = ['', 'بسیار آسان', 'آسان و متداول', 'متوسط', 'تخصصی', 'نیازمند سهمیه و شرایط خاص'];

export const StepPath: React.FC<Props> = ({ data, update }) => {
  return (
    <div dir="rtl">
      <h3 className="text-lg font-bold text-[#0b2933]">مرحله ۲: روش مهاجرتی مدنظر خود را انتخاب کنید</h3>
      <p className="mt-1 text-xs text-slate-500">
        هر روش الزامات متفاوتی در خصوص اثبات تمکن مالی، مدرک زبان، سن و سابقه کار دارد.
      </p>

      <div className="mt-6 space-y-7">
        {CATEGORIES.map((cat) => {
          const paths = IMMIGRATION_PATHS.filter((p) => p.category === cat.id);
          if (!paths.length) return null;
          return (
            <div key={cat.id}>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {paths.map((path) => {
                  const selected = data.immigrationPath === path.id;
                  return (
                    <button
                      key={path.id}
                      type="button"
                      onClick={() => update('immigrationPath', path.id)}
                      className={`flex flex-col items-start rounded-2xl border-[1.5px] p-4 text-right transition-all ${
                        selected
                          ? 'border-[#f5a623] bg-amber-50/60 shadow-md ring-1 ring-[#f5a623]/30'
                          : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="flex items-center gap-2.5">
                          <span className="text-xl">{path.icon}</span>
                          <span className="text-sm font-bold text-[#0b2933]">{path.label}</span>
                        </span>
                        {selected && (
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#f5a623] text-[#082833]">
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                              <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-[11px] leading-5 text-slate-500">{path.description}</p>
                      <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[10px]">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                          سطح پیچیدگی پرونده: {DIFFICULTY_LABEL[path.difficulty]}
                        </span>
                        {path.minBudget > 0 && (
                          <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                            حداقل بودجه: {path.minBudget.toLocaleString('fa-IR')} یورو
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepPath;
