import React from 'react';

interface Props {
  onOpenAssessment: () => void;
}

export const FloatingActionBar: React.FC<Props> = ({ onOpenAssessment }) => {
  return (
    <div className="py-5 bg-[#071f26] border-y border-white/10" dir="rtl">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onOpenAssessment}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-5 py-2.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>⚡</span>
          <span>ارزیابی هوشمند شانس قبولی ویزا</span>
        </button>

        <a
          href="tel:+982191693955"
          className="flex items-center gap-2 rounded-xl bg-[#0f3f4e] hover:bg-[#144f62] border border-white/15 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition hover:scale-105 active:scale-95"
        >
          <span>📞</span>
          <span>تماس با وکلای دفتر تهران: 02191693955</span>
        </a>

        <a
          href="https://wa.me/989197340829"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-[#25d366] hover:bg-[#20ba59] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition hover:scale-105 active:scale-95"
        >
          <span>💬</span>
          <span>مشاوره سریع در واتس‌اپ</span>
        </a>
      </div>
    </div>
  );
};

export default FloatingActionBar;
