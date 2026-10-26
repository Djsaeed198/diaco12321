import React from 'react';
import { FAMILY_STATUSES } from '../../constants/immigration';
import type { AssessmentData } from '../../types/assessment';

interface Props {
  data: AssessmentData;
  update: <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => void;
}

export const StepFamily: React.FC<Props> = ({ data, update }) => {
  return (
    <div dir="rtl">
      <h3 className="text-lg font-bold text-[#0b2933]">مرحله ۳: وضعیت تاهل و اعضای همراه خانواده</h3>
      <p className="mt-1 text-xs text-slate-500">
        تعداد همراهان در محاسبه میزان تمکن مسدودی ماهانه و متراژ مسکن رسمی تاثیر مستقیم دارد.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {FAMILY_STATUSES.map((f) => {
          const selected = data.familyStatus === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => update('familyStatus', f.id)}
              className={`flex flex-col items-center gap-3 rounded-2xl border-[1.5px] px-4 py-6 transition-all ${
                selected
                  ? 'border-[#f5a623] bg-amber-50/60 shadow-md ring-1 ring-[#f5a623]/30'
                  : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300'
              }`}
            >
              <span className="text-4xl">{f.icon}</span>
              <span className="text-sm font-bold text-[#0b2933]">{f.label}</span>
              <span className="text-[10px] font-medium text-slate-500">
                ضریب تمکن مالی: {f.multiplier} برابر
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepFamily;
