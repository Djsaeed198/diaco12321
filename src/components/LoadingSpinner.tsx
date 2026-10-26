import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16" dir="rtl">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#f5a623]" />
      </div>
      <p className="text-sm font-bold text-[#082833]">در حال تحلیل و ارزیابی شرایط پرونده شما با هوش مصنوعی...</p>
      <p className="text-xs text-slate-500">انطباق با جدیدترین مصوبات کنسولی و ظرفیت‌های سهمیه اقامت اروپا</p>
    </div>
  );
};

export default LoadingSpinner;
