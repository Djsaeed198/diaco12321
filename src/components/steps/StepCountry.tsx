import React from 'react';
import { EUROPEAN_COUNTRIES } from '../../constants/immigration';
import type { AssessmentData } from '../../types/assessment';

interface Props {
  data: AssessmentData;
  update: <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => void;
}

export const StepCountry: React.FC<Props> = ({ data, update }) => {
  const toggle = (code: string) => {
    const list = data.targetCountries.includes(code)
      ? data.targetCountries.filter((c) => c !== code)
      : [...data.targetCountries, code];
    update('targetCountries', list.length > 0 ? list : [code]);
  };

  return (
    <div dir="rtl">
      <h3 className="text-lg font-bold text-[#0b2933]">مرحله ۱: کشور یا کشورهای مقصد خود را انتخاب کنید</h3>
      <p className="mt-1 text-xs text-slate-500">
        می‌توانید یک یا چند کشور اروپایی را متناسب با اهداف اقامتی، تحصیلی یا سرمایه‌گذاری خود انتخاب نمایید.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {EUROPEAN_COUNTRIES.map((country) => {
          const selected = data.targetCountries.includes(country.code);
          return (
            <button
              key={country.code}
              type="button"
              onClick={() => toggle(country.code)}
              className={`group flex flex-col items-start rounded-2xl border-[1.5px] p-4 text-right transition-all duration-200 ${
                selected
                  ? 'border-[#f5a623] bg-amber-50/60 shadow-md ring-1 ring-[#f5a623]/30'
                  : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="flex items-center gap-2.5">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="text-sm font-bold text-[#0b2933]">{country.name}</span>
                </span>
                {selected && (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#f5a623] text-[#082833]">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="mt-2 text-[11px] leading-5 text-slate-500">{country.note}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {country.popularPaths.slice(0, 2).map((p) => (
                  <span key={p} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                    {p}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {data.targetCountries.length > 0 && (
        <p className="mt-5 text-xs font-semibold text-amber-700">
          تعداد کشورهای انتخابی شما: {data.targetCountries.length} کشور
        </p>
      )}
    </div>
  );
};

export default StepCountry;
