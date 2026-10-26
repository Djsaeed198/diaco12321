import React, { useState } from 'react';

export const SupportButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setShowModal(false);
        setSubscribed(false);
        setPhoneInput('');
        setNameInput('');
      }, 2500);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5" dir="rtl">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-4 py-3 text-xs sm:text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="درخواست تماس کارشناس"
        >
          <span>📞</span>
          <span>درخواست تماس فوری</span>
        </button>

        <a
          href="https://wa.me/989197340829"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-2xl bg-[#25d366] px-4 py-2.5 text-xs font-bold text-white shadow-soft transition hover:scale-105"
          aria-label="واتس‌اپ پشتیبانی"
        >
          <span>💬</span>
          <span>واتس‌اپ دیاکو</span>
        </a>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fadeIn" dir="rtl">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm sm:text-base font-bold text-[#0b2933]">
                درخواست تماس رایگان از کارشناس ارشد
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {subscribed ? (
              <div className="py-8 text-center text-emerald-600">
                <span className="text-4xl">✓</span>
                <p className="mt-2 text-sm font-bold">درخواست شما با موفقیت ثبت شد.</p>
                <p className="text-xs text-slate-500 mt-1">مشاوران ارشد هلدینگ دیاکو به زودی با شما تماس خواهند گرفت.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 space-y-4">
                <p className="text-xs leading-6 text-slate-600">
                  شماره تماس و نام خود را وارد کنید تا مشاوران دپارتمان اتریش و اروپا با شما تماس حاصل نمایند.
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نام و نام خانوادگی:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: مسعود رادمنش"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:border-[#f5a623] focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">شماره تلفن همراه:</label>
                  <input
                    type="tel"
                    dir="ltr"
                    required
                    placeholder="0912 345 6789"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:border-[#f5a623] focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] py-2.5 text-xs font-black text-[#082833] shadow-glow hover:scale-102 transition cursor-pointer"
                  >
                    ثبت درخواست تماس
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-600 cursor-pointer"
                  >
                    انصراف
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SupportButton;
