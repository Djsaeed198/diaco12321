import React from 'react';

interface Props { onBackToHome: () => void; }

export const NotFoundPage: React.FC<Props> = ({ onBackToHome }) => (
  <div
    dir="rtl"
    className="min-h-[70vh] flex items-center justify-center bg-[#061a21] text-white p-8"
  >
    <div className="max-w-md text-center">
      <div className="text-7xl font-black text-amber-400 mb-4">۴۰۴</div>
      <h1 className="text-2xl font-black mb-3">صفحه مورد نظر یافت نشد</h1>
      <p className="text-slate-300 text-sm mb-6 leading-7">
        ممکن است آدرس تغییر کرده یا حذف شده باشد. از طریق دکمه زیر به صفحه اصلی برگردید.
      </p>
      <button
        onClick={onBackToHome}
        className="rounded-xl bg-[#f5a623] px-6 py-3 text-sm font-black text-[#082833] hover:scale-105 transition cursor-pointer"
      >
        بازگشت به صفحه اصلی
      </button>
    </div>
  </div>
);