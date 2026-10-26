import React from 'react';
import { LANGUAGE_LEVELS } from '../../constants/immigration';
import type { AssessmentData } from '../../types/assessment';

interface Props {
  data: AssessmentData;
  update: <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => void;
}

const EDUCATIONS = [
  { id: 'diploma', label: 'دیپلم یا کاردانی' },
  { id: 'bachelor', label: 'کارشناسی (لیسانس)' },
  { id: 'master', label: 'کارشناسی ارشد (فوق لیسانس)' },
  { id: 'phd', label: 'دکتری تخصصی یا فوق دکتری' },
] as const;

export const StepPersonal: React.FC<Props> = ({ data, update }) => {
  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h3 className="text-lg font-bold text-[#0b2933]">مرحله ۵: اطلاعات فردی، تحصیلی و زبانی</h3>
        <p className="mt-1 text-xs text-slate-500">
          این داده‌ها ضریب امتیازبندی سفارت و واجد شرایط بودن در پرونده‌های کاری و خودحمایتی را تعیین می‌کنند.
        </p>
      </div>

      {/* سن */}
      <div>
        <label className="mb-2 block text-xs sm:text-sm font-bold text-slate-700">سن متقاضی اصلی (سال):</label>
        <input
          type="number"
          min={18}
          max={75}
          value={data.age ?? ''}
          onChange={(e) => update('age', e.target.value ? +e.target.value : null)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#f5a623] focus:outline-none focus:ring-2 focus:ring-amber-200"
          placeholder="مثال: ۳۴"
        />
      </div>

      {/* تحصیلات */}
      <div>
        <label className="mb-2 block text-xs sm:text-sm font-bold text-slate-700">آخرین مقطع تحصیلی رسمی:</label>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {EDUCATIONS.map((edu) => (
            <button
              key={edu.id}
              type="button"
              onClick={() => update('education', edu.id)}
              className={`rounded-xl border-[1.5px] px-4 py-3 text-xs sm:text-sm font-medium transition ${
                data.education === edu.id
                  ? 'border-[#f5a623] bg-amber-50/60 font-bold text-[#0b2933] ring-1 ring-[#f5a623]/30'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {edu.label}
            </button>
          ))}
        </div>
      </div>

      {/* زبان */}
      <div>
        <label className="mb-2 block text-xs sm:text-sm font-bold text-slate-700">
          سطح مهارت زبان (آلمانی یا انگلیسی):
        </label>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {LANGUAGE_LEVELS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => update('language', l.id)}
              className={`rounded-xl border-[1.5px] px-3 py-3 text-xs font-medium transition ${
                data.language === l.id
                  ? 'border-[#f5a623] bg-amber-50/60 font-bold text-[#0b2933] ring-1 ring-[#f5a623]/30'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Job Offer */}
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs sm:text-sm">
        <input
          type="checkbox"
          checked={data.hasJobOffer}
          onChange={(e) => update('hasJobOffer', e.target.checked)}
          className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-amber-500 focus:ring-amber-400 accent-[#f5a623]"
        />
        <span className="text-slate-700 font-medium">
          پیشنهاد شغلی رسمی (Job Offer) یا کارفرمای تاییدشده در کشور مقصد دارم.
        </span>
      </label>

      {/* نام و تلفن */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs sm:text-sm font-bold text-slate-700">نام و نام خانوادگی:</label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#f5a623] focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="مثال: سهراب ناصری"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs sm:text-sm font-bold text-slate-700">شماره تماس (جهت ارسال گزارش و مشاوره):</label>
          <input
            type="tel"
            dir="ltr"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-left text-sm focus:border-[#f5a623] focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="0912 345 6789"
          />
        </div>
      </div>

      {/* توضیحات */}
      <div>
        <label className="mb-2 block text-xs sm:text-sm font-bold text-slate-700">توضیحات و شرایط خاص پرونده (اختیاری):</label>
        <textarea
          rows={3}
          value={data.notes}
          onChange={(e) => update('notes', e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#f5a623] focus:outline-none focus:ring-2 focus:ring-amber-200"
          placeholder="هرگونه سابقه سفر به حوزه شینگن، ریجکتی قبلی، داشتن اقوام درجه یک در اروپا یا شرایط ویژه شغلی..."
        />
      </div>

      {/* رضایت */}
      <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-3.5 text-xs text-slate-600">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => update('consent', e.target.checked)}
          className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-amber-500 focus:ring-amber-400 accent-[#f5a623]"
        />
        <span>
          با قوانین حریم خصوصی و محرمانگی اطلاعات هلدینگ بین‌المللی دیاکو موافقم و تمایل به دریافت ارزیابی تحلیلی دارم.
        </span>
      </label>
    </div>
  );
};

export default StepPersonal;
