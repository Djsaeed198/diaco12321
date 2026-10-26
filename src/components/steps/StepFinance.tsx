import React from 'react';
import { FINANCIAL_RANGES } from '../../constants/immigration';
import type { AssessmentData } from '../../types/assessment';

interface Props {
  data: AssessmentData;
  update: <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => void;
}

export const StepFinance: React.FC<Props> = ({ data, update }) => {
  return (
    <div dir="rtl">
      <h3 className="text-lg font-bold text-[#0b2933]">مرحله ۴: حدود سرمایه و نقدینگی در دسترس</h3>
      <p className="mt-1 text-xs text-slate-500">
        شامل مجموع مبالغ حساب‌های بانکی، ارزش دارایی‌های ملکی با سند رسمی، یا سهام و درآمدهای منفصل ماهانه.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {FINANCIAL_RANGES.map((range) => {
          const selected = data.financialRange === range.id;
          return (
            <button
              key={range.id}
              type="button"
              onClick={() => update('financialRange', range.id)}
              className={`flex items-center justify-between rounded-2xl border-[1.5px] px-5 py-4 text-right transition-all ${
                selected
                  ? 'border-[#f5a623] bg-amber-50/60 shadow-md ring-1 ring-[#f5a623]/30'
                  : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300'
              }`}
            >
              <span className="text-xs sm:text-sm font-bold text-[#0b2933]">{range.label}</span>
              <span
                className={`grid h-5 w-5 flex-none place-items-center rounded-full border-2 transition ${
                  selected ? 'border-[#f5a623] bg-[#f5a623] text-[#082833]' : 'border-slate-300'
                }`}
              >
                {selected && (
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepFinance;
