import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { CONTACT_DATA } from '../constants/content';
import DiacoLogo from './DiacoLogo';
import GoogleSignInButton from './GoogleSignInButton';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
  setAccessToken,
} from '../lib/firebase';
import {
  FIXED_SPREADSHEET_ID,
  FIXED_SPREADSHEET_URL,
  createLeadsSpreadsheet,
  appendSubscriberToGoogleSheet,
  appendToFixedSheet,
  getStoredSheetId,
  getStoredSheetTitle,
  saveStoredSheetId,
  clearStoredSheetId,
  getSpreadsheetDetails,
} from '../lib/googleSheets';

const TOPIC_PREFERENCES = [
  { id: 'austria-resident', label: 'خبرنامه اتریش‌نشین 🇦🇹', icon: '🇦🇹' },
  { id: 'financial', label: 'تمکن مالی (خودحمایتی)', icon: '🏛️' },
  { id: 'work', label: 'کاری و بلوکارت', icon: '💼' },
  { id: 'study', label: 'مهاجرت تحصیلی', icon: '🎓' },
  { id: 'investment', label: 'سرمایه‌گذاری و ملک', icon: '👑' },
];

export interface ContactFooterProps {
  onNavigateToPage?: (page: any) => void;
  onNavigateToBlogPost?: (slug: string) => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onNavigateToPage, onNavigateToBlogPost }) => {
  const [email, setEmail] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('austria-resident');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');
  const [isSheetSynced, setIsSheetSynced] = useState<boolean | null>(null);
  const [activeSheetUrl, setActiveSheetUrl] = useState<string | null>(null);

  // Google OAuth & Sheets State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [currentSheetId, setCurrentSheetId] = useState<string | null>(null);
  const [currentSheetTitle, setCurrentSheetTitle] = useState<string | null>(null);
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [showSheetSettings, setShowSheetSettings] = useState(false);
  const [customSheetInput, setCustomSheetInput] = useState('');
  const [sheetFeedback, setSheetFeedback] = useState<string | null>(null);

  // Initialize Auth state on mount
  useEffect(() => {
    const storedId = getStoredSheetId();
    const storedTitle = getStoredSheetTitle();
    if (storedId) {
      setCurrentSheetId(storedId);
      setCurrentSheetTitle(storedTitle || 'شیت متقاضیان دیاکو');
      setActiveSheetUrl(`https://docs.google.com/spreadsheets/d/${storedId}/edit`);
    } else {
      setCurrentSheetId(FIXED_SPREADSHEET_ID);
      setCurrentSheetTitle('شیت ثابت متقاضیان دیاکو');
      setActiveSheetUrl(FIXED_SPREADSHEET_URL);
    }

    const unsubscribe = initAuth(
      (user, cachedToken) => {
        setCurrentUser(user);
        if (cachedToken) {
          setToken(cachedToken);
        }
      },
      () => {
        setCurrentUser(null);
        setToken(null);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleGoogleLogin = async () => {
    setIsAuthLoading(true);
    setErrorMessage('');
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setToken(res.accessToken);
        setAccessToken(res.accessToken);

        // Use stored custom sheet or default fixed Diaco sheet
        const targetId = getStoredSheetId() || FIXED_SPREADSHEET_ID;
        setCurrentSheetId(targetId);
        setActiveSheetUrl(`https://docs.google.com/spreadsheets/d/${targetId}/edit`);
        try {
          const details = await getSpreadsheetDetails(res.accessToken, targetId);
          setCurrentSheetTitle(details.title);
          setSheetFeedback(`متصل به شیت «${details.title}»`);
        } catch {
          setCurrentSheetTitle(
            targetId === FIXED_SPREADSHEET_ID ? 'شیت ثابت متقاضیان دیاکو' : 'شیت متصل‌شده'
          );
        }
      }
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
      setErrorMessage(err?.message || 'ورود به حساب گوگل با خطا مواجه شد.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await logout();
      setCurrentUser(null);
      setToken(null);
      setSheetFeedback(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleCreateNewSheetManually = async () => {
    const currentToken = token || (await getAccessToken());
    if (!currentToken) {
      setSheetFeedback('لطفاً ابتدا با حساب گوگل وارد شوید.');
      return;
    }

    setIsCreatingSheet(true);
    setSheetFeedback(null);
    try {
      const created = await createLeadsSpreadsheet(
        currentToken,
        'خبرنامه و متقاضیان مهاجرت دیاکو - Diaco Leads'
      );
      setCurrentSheetId(created.spreadsheetId);
      setCurrentSheetTitle(created.title);
      setActiveSheetUrl(created.spreadsheetUrl);
      setSheetFeedback('فایل جدید در Google Drive شما ایجاد و متصل شد!');
    } catch (err: any) {
      setSheetFeedback(err?.message || 'خطا در ایجاد شیت در گوگل.');
    } finally {
      setIsCreatingSheet(false);
    }
  };

  const handleConnectCustomSheet = async () => {
    if (!customSheetInput.trim()) return;

    let targetId = customSheetInput.trim();
    // Support full Google Sheet URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit...
    const urlMatch = targetId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (urlMatch && urlMatch[1]) {
      targetId = urlMatch[1];
    }

    const currentToken = token || (await getAccessToken());
    if (!currentToken) {
      saveStoredSheetId(targetId, 'Google Sheet سفارشی');
      setCurrentSheetId(targetId);
      setCurrentSheetTitle('Google Sheet سفارشی');
      setActiveSheetUrl(`https://docs.google.com/spreadsheets/d/${targetId}/edit`);
      setSheetFeedback('شناسه شیت ذخیره شد (برای درج مستقیم، لطفاً با حساب گوگل وارد شوید).');
      setShowSheetSettings(false);
      return;
    }

    try {
      const details = await getSpreadsheetDetails(currentToken, targetId);
      saveStoredSheetId(targetId, details.title);
      setCurrentSheetId(targetId);
      setCurrentSheetTitle(details.title);
      setActiveSheetUrl(`https://docs.google.com/spreadsheets/d/${targetId}/edit`);
      setSheetFeedback(`شیت "${details.title}" با موفقیت متصل گردید!`);
      setShowSheetSettings(false);
    } catch (err: any) {
      setSheetFeedback(err?.message || 'امکان اعتبارسنجی شیت وجود ندارد. لطفاً دسترسی‌ها را بررسی کنید.');
    }
  };

  const validateEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('لطفاً آدرس ایمیل خود را وارد نمایید.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('فرمت ایمیل وارد شده معتبر نمی‌باشد (مثال: name@example.com).');
      return;
    }

    setStatus('loading');

    const topicLabel = TOPIC_PREFERENCES.find((t) => t.id === selectedTopic)?.label || selectedTopic;
    const cleanEmail = email.trim();
    let syncedToGoogle = false;
    let spreadsheetLink = activeSheetUrl;

    const currentToken = token || (await getAccessToken());

    const sheetIdToUse = currentSheetId || FIXED_SPREADSHEET_ID;

    // 1. Direct Client-Side Google Sheets API Insertion (if OAuth token is available)
    if (currentToken) {
      try {
        const appendResult =
          sheetIdToUse === FIXED_SPREADSHEET_ID
            ? await appendToFixedSheet(currentToken, {
                email: cleanEmail,
                topic: topicLabel,
              })
            : await appendSubscriberToGoogleSheet(currentToken, sheetIdToUse, {
                email: cleanEmail,
                topic: topicLabel,
              });

        if (appendResult.success) {
          syncedToGoogle = true;
          spreadsheetLink = appendResult.spreadsheetUrl;
        }
      } catch (sheetErr: any) {
        console.warn('Direct Google Sheet append notice:', sheetErr);
      }
    }

    // 2. Also send to backend route (/api/newsletter) with Authorization Bearer header
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (currentToken) {
        headers['Authorization'] = `Bearer ${currentToken}`;
      }

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email: cleanEmail,
          topic: topicLabel,
          spreadsheetId: sheetIdToUse,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.syncedToGoogleSheet) {
          syncedToGoogle = true;
          if (data.spreadsheetUrl) {
            spreadsheetLink = data.spreadsheetUrl;
          }
        }

        // Save in browser local history
        try {
          const existing = JSON.parse(localStorage.getItem('diaco_newsletter_subs') || '[]');
          existing.unshift({
            email: cleanEmail,
            topic: topicLabel,
            date: new Date().toISOString(),
            syncedToGoogleSheet: syncedToGoogle,
            sheetUrl: spreadsheetLink,
          });
          localStorage.setItem('diaco_newsletter_subs', JSON.stringify(existing.slice(0, 50)));
        } catch {
          /* ignore */
        }

        setSuccessNotice(
          syncedToGoogle
            ? 'عضویت شما با موفقیت در خبرنامه اتریش‌نشین و جدول Google Sheet ثبت گردید!'
            : data.message || 'عضویت شما با موفقیت در خبرنامه ثبت گردید.'
        );
        setIsSheetSynced(syncedToGoogle);
        if (spreadsheetLink) {
          setActiveSheetUrl(spreadsheetLink);
        }
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'متاسفانه در ثبت عضویت خطایی رخ داد، لطفاً دوباره تلاش کنید.');
      }
    } catch {
      // Offline fallback
      try {
        const existing = JSON.parse(localStorage.getItem('diaco_newsletter_subs') || '[]');
        existing.unshift({
          email: cleanEmail,
          topic: topicLabel,
          date: new Date().toISOString(),
          offline: true,
          syncedToGoogleSheet: syncedToGoogle,
        });
        localStorage.setItem('diaco_newsletter_subs', JSON.stringify(existing.slice(0, 50)));
        setSuccessNotice('عضویت شما با موفقیت در سیستم دیاکو ذخیره گردید.');
        setIsSheetSynced(syncedToGoogle);
        setStatus('success');
      } catch {
        setStatus('error');
        setErrorMessage('خطا در برقراری ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی نمایید.');
      }
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setErrorMessage('');
    setSuccessNotice('');
    setIsSheetSynced(null);
  };

  return (
    <footer id="contact" className="relative bg-[#07242e] pt-16 pb-10 text-slate-300 overflow-hidden" dir="rtl">
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#f5a623]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8">
        {/* بنر سربرگ فوتر */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-[#f5a623]/30">
          <div className="flex items-center gap-4">
            <DiacoLogo size={56} />
            <div>
              <h2 className="text-lg md:text-xl font-black text-white tracking-wide">
                هلدینگ مهاجرتی دیاکو | Diaco Immigration Holding
              </h2>
              <p className="text-xs md:text-sm text-amber-300/90 font-medium mt-1">
                مجری تخصصی پرونده‌های اقامت تمکن مالی، کاری و تحصیلی اتریش و اتحادیه اروپا
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-2xl bg-amber-400/10 px-4 py-2 text-xs md:text-sm font-bold text-amber-300 border border-amber-400/30">
              وین • آتن • تهران
            </span>
          </div>
        </div>

        {/* ========================================================
            بخش خبرنامه اتریش‌نشین و اتصال به Google Sheets
           ======================================================== */}
        <div className="mb-14 relative overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#08222b] via-[#0d3442] to-[#08222b] p-6 md:p-9 shadow-2xl backdrop-blur-xl">
          {/* جلوه نوری پس‌زمینه خبرنامه */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#f5a623]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* نوار وضعیت اتصال به Google Sheets */}
          <div className="mb-6 rounded-2xl border border-white/10 bg-black/30 p-3.5 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                📊
              </span>
              <div>
                <span className="font-bold text-white">اتصال به Google Sheets: </span>
                {currentUser ? (
                  <span className="text-emerald-300 font-semibold">
                    متصل با حساب {currentUser.email}
                  </span>
                ) : (
                  <span className="text-amber-300 font-medium">
                    برای درج خودکار تست‌ها در شیت شخصی خود، با حساب گوگل وارد شوید
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentUser ? (
                <>
                  {activeSheetUrl && (
                    <a
                      href={activeSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 px-3 py-1.5 font-bold text-emerald-300 transition"
                    >
                      <span>مشاهده Google Sheet</span>
                      <span className="text-xs">↗</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowSheetSettings(!showSheetSettings)}
                    className="rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 font-semibold text-white transition cursor-pointer"
                  >
                    تنظیمات شیت ⚙️
                  </button>
                  <button
                    type="button"
                    onClick={handleGoogleLogout}
                    className="rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1.5 font-semibold text-red-300 transition cursor-pointer"
                  >
                    خروج
                  </button>
                </>
              ) : (
                <GoogleSignInButton
                  onSignIn={handleGoogleLogin}
                  isLoading={isAuthLoading}
                  label="ورود با Google جهت اتصال شیت"
                  className="py-1.5! px-3.5! text-xs!"
                />
              )}
            </div>
          </div>

          {/* پنل تنظیمات پیشرفته شیت متصل */}
          {showSheetSettings && currentUser && (
            <div className="mb-6 rounded-2xl border border-amber-400/30 bg-black/40 p-4 animate-fadeIn text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300">مدیریت فایل Google Sheet اختصاصی</span>
                <button
                  type="button"
                  onClick={() => setShowSheetSettings(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/5 p-3 border border-white/10 space-y-2">
                  <p className="font-semibold text-white">ایجاد خودکار شیت جدید در گوگل درایو شما:</p>
                  <p className="text-[11px] text-slate-300">
                    یک شیت آماده همراه با ستون‌های استاندارد (ایمیل، موضوع، تاریخ شمسی، زمان) ایجاد می‌کند.
                  </p>
                  <button
                    type="button"
                    disabled={isCreatingSheet}
                    onClick={handleCreateNewSheetManually}
                    className="rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-3 py-2 transition disabled:opacity-50 cursor-pointer"
                  >
                    {isCreatingSheet ? 'در حال ایجاد در گوگل...' : '+ ایجاد شیت جدید دیاکو در Drive'}
                  </button>
                </div>

                <div className="rounded-xl bg-white/5 p-3 border border-white/10 space-y-2">
                  <p className="font-semibold text-white">اتصال به یک شیت موجود:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="لینک کامل یا شناسه Sheet ID"
                      value={customSheetInput}
                      onChange={(e) => setCustomSheetInput(e.target.value)}
                      className="flex-1 rounded-xl border border-white/20 bg-black/50 px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={handleConnectCustomSheet}
                      className="rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-3 py-1.5 transition cursor-pointer"
                    >
                      ذخیره
                    </button>
                  </div>
                  {currentSheetId && (
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <p className="text-[10px] text-slate-400 font-mono" dir="ltr">
                        ID فعلی: {currentSheetId}
                      </p>
                      {currentSheetId !== FIXED_SPREADSHEET_ID && (
                        <button
                          type="button"
                          onClick={() => {
                            clearStoredSheetId();
                            setCurrentSheetId(FIXED_SPREADSHEET_ID);
                            setCurrentSheetTitle('شیت ثابت متقاضیان دیاکو');
                            setActiveSheetUrl(FIXED_SPREADSHEET_URL);
                            setSheetFeedback('اتصال به شیت ثابت دیاکو بازگردانی شد.');
                          }}
                          className="text-[10px] font-bold text-amber-300 hover:underline cursor-pointer"
                        >
                          بازگشت به شیت ثابت دیاکو
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {sheetFeedback && (
                <p className="text-emerald-300 font-semibold text-[11px] pt-1">
                  ✓ {sheetFeedback}
                </p>
              )}
            </div>
          )}

          <div className="relative grid items-center gap-8 lg:grid-cols-12">
            {/* ستون متن و مزایا */}
            <div className="lg:col-span-6 space-y-3.5 text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5a623] animate-pulse" />
                عضویت در خبرنامه اتریش‌نشین و به‌روزرسانی‌های کنسولی اروپا
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug">
                از آخرین سهمیه‌ها و اخبار مهاجرتی اتریش ۲۰۲۶ جا نمانید!
              </h3>

              <p className="text-xs sm:text-sm leading-6 text-slate-300">
                تحلیل‌های هفتگی وکلای اتریش دیاکو در خصوص بازگشایی سهمیه‌های تمکن مالی، حداقل کف حقوق بلوکارت و پذیرش دانشگاه‌ها را رایگان در ایمیل خود دریافت کنید.
              </p>

              {/* نشان‌های اعتماد */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5">
                  <span className="text-amber-400">⚡</span>
                  <span>اطلاع‌رسانی فوری سهمیه‌های اتریش</span>
                </span>
                <span className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5">
                  <span className="text-emerald-400">🔒</span>
                  <span>حفظ کامل حریم خصوصی و بدون اسپم</span>
                </span>
                <span className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5">
                  <span className="text-cyan-400">📊</span>
                  <span>اتصال زنده به سیستم Google Sheets</span>
                </span>
              </div>
            </div>

            {/* ستون فرم اشتراک */}
            <div className="lg:col-span-6">
              {status === 'success' ? (
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center animate-fadeIn backdrop-blur-xl">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/20 text-3xl text-emerald-400 mb-3 border border-emerald-400/40 shadow-glow">
                    ✓
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {successNotice || 'عضویت شما در خبرنامه اتریش‌نشین با موفقیت ثبت شد!'}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-emerald-200/90 leading-6 max-w-md mx-auto">
                    ایمیل تاییدیه و راهنمای اولیه مهاجرت به آدرس <strong className="text-white font-mono" dir="ltr">{email}</strong> ارسال گردید.
                  </p>

                  {isSheetSynced ? (
                    <div className="mt-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 space-y-2 max-w-md mx-auto">
                      <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-300">
                        <span>📊</span>
                        <span>اطلاعات شما با موفقیت در فایل Google Sheets درج گردید!</span>
                      </div>
                      {activeSheetUrl && (
                        <a
                          href={activeSheetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-400 text-slate-950 font-black px-4 py-2 text-xs shadow-md hover:bg-emerald-300 transition"
                        >
                          <span>مشاهده ردیف در Google Sheets</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-[11px] font-semibold text-amber-300 border border-amber-400/20">
                      <span>✓ اطلاعات در دیتابیس سامانه ثبت شد. برای همگام‌سازی ابری مستقیم با Google Sheet خود وارد شوید.</span>
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-bold text-white transition cursor-pointer"
                    >
                      ثبت یک ایمیل دیگر
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  {/* انتخاب موضوع مورد علاقه */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-300">
                        موضوع مورد علاقه خود را انتخاب کنید:
                      </label>
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                        اتصال به Google Sheets آماده
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {TOPIC_PREFERENCES.map((topic) => {
                        const isSelected = selectedTopic === topic.id;
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => setSelectedTopic(topic.id)}
                            className={`flex items-center justify-center gap-1.5 rounded-xl border p-2 text-[11px] font-bold transition cursor-pointer ${
                              isSelected
                                ? 'border-[#f5a623] bg-[#f5a623]/20 text-amber-300 shadow-sm'
                                : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20'
                            }`}
                          >
                            <span>{topic.icon}</span>
                            <span>{topic.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* فیلد ورودی ایمیل و دکمه */}
                  <div className="relative">
                    <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                      <div className="relative flex-1">
                        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                          ✉️
                        </span>
                        <input
                          type="email"
                          dir="ltr"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === 'error') setStatus('idle');
                          }}
                          placeholder="your-email@example.com"
                          className={`w-full rounded-2xl border bg-black/40 pr-10 pl-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                            status === 'error'
                              ? 'border-red-500/80 focus:ring-red-400/30'
                              : 'border-white/20 focus:border-[#f5a623] focus:ring-amber-400/20'
                          }`}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3.5 text-xs sm:text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
                      >
                        {status === 'loading' ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#082833] border-t-transparent" />
                            <span>در حال درج...</span>
                          </>
                        ) : (
                          <>
                            <span>عضویت در خبرنامه اتریش‌نشین</span>
                            <span>←</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* پیام اعتبارسنجی خطا */}
                    {status === 'error' && errorMessage && (
                      <p className="mt-2 text-right text-xs font-semibold text-rose-400 animate-fadeIn flex items-center gap-1">
                        <span>⚠️</span>
                        <span>{errorMessage}</span>
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ۴ ستون اطلاعات تماس */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* ستون ۱: دامنه‌ها و پرتال‌ها */}
          <div className="group rounded-3xl border border-white/10 bg-white p-6 text-[#0b2933] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-amber-400/50">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-50 text-lg transition-transform duration-300 group-hover:scale-110">
                🌐
              </span>
              <h3 className="text-sm font-bold text-[#0b2933]">پرتال‌ها و دامنه‌های هلدینگ</h3>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
              {CONTACT_DATA.websites.map((w) => (
                <li key={w.name}>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl bg-slate-50 px-2.5 py-2.5 text-center text-slate-700 hover:bg-amber-50 hover:text-amber-800 hover:shadow-xs transition-all duration-200 border border-transparent hover:border-amber-200"
                  >
                    {w.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون ۲: شماره‌های تماس */}
          <div className="group rounded-3xl border border-white/10 bg-white p-6 text-[#0b2933] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-amber-400/50">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-red-50 text-lg text-red-600 transition-transform duration-300 group-hover:scale-110">
                📞
              </span>
              <h3 className="text-sm font-bold text-[#0b2933]">تماس مستقیم و مشاوره</h3>
            </div>
            <ul className="mt-4 space-y-2.5 text-xs">
              {CONTACT_DATA.phones.map((phone) => (
                <li key={phone.number}>
                  <a
                    href={`tel:${phone.tel}`}
                    dir="ltr"
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 font-bold text-[#0b2933] hover:bg-amber-50 hover:text-amber-800 transition-all duration-200 border border-transparent hover:border-amber-200"
                  >
                    <span>{phone.number}</span>
                    <span className="text-[10px] font-normal text-slate-400">{phone.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون ۳: آدرس دفاتر */}
          <div className="group rounded-3xl border border-white/10 bg-white p-6 text-[#0b2933] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-amber-400/50">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-50 text-lg transition-transform duration-300 group-hover:scale-110">
                🏛️
              </span>
              <h3 className="text-sm font-bold text-[#0b2933]">دفاتر بین‌المللی دیاکو</h3>
            </div>
            <div className="mt-4 space-y-3 text-xs leading-5 text-slate-600">
              {CONTACT_DATA.offices.map((office) => (
                <div key={office.country} className="border-b border-slate-100 pb-2.5 last:border-none last:pb-0">
                  <p className="font-bold text-[#0b2933]">
                    {office.country} ({office.city}):
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500 leading-relaxed">{office.address}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ستون ۴: شبکه‌های اجتماعی */}
          <div className="group rounded-3xl border border-white/10 bg-white p-6 text-[#0b2933] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-amber-400/50">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-lg transition-transform duration-300 group-hover:scale-110">
                💬
              </span>
              <h3 className="text-sm font-bold text-[#0b2933]">شبکه‌های اجتماعی و پیام‌رسان‌ها</h3>
            </div>
            <ul className="mt-4 space-y-2.5 text-xs font-semibold">
              {CONTACT_DATA.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-all duration-200 border border-transparent hover:border-amber-200 group/link"
                  >
                    <span>{social.name}</span>
                    <span className="transition-transform duration-200 group-hover/link:-translate-x-1 text-amber-600">
                      ←
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ============================================================
            نقشه لینک‌دهی داخلی، خوشه‌های سئو و صفحات ستون (Pillar & Clusters)
           ============================================================ */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-[#061e27] p-6 md:p-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🗺️</span>
              <div>
                <h3 className="text-sm md:text-base font-black text-amber-300">
                  راهنمای دسترسی سریع به خوشه‌های خدمات مهاجرتی و حقوقی اروپا ۲۰۲۶
                </h3>
                <p className="text-[11px] text-slate-300">
                  دسترسی مستقیم به صفحات مرجع، شرایط حقوقی و تحلیل‌های کنسولی رسمی هلدینگ دیاکو
                </p>
              </div>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-amber-400 hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 transition self-start sm:self-auto shrink-0"
            >
              <span>نقشه رسمی سایت (sitemap.xml)</span>
              <span>↗</span>
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            {/* ستون ۱: قطب اتریش (Austria Pillar) */}
            <div className="space-y-2.5">
              <h4 className="font-black text-white text-xs border-r-2 border-[#f5a623] pr-2 flex items-center gap-1">
                <span>🇦🇹</span>
                <span>دپارتمان اقامت و وکالت اتریش</span>
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {[
                  { page: 'financial-austria', label: 'اقامت تمکن مالی اتریش (NAG §44)' },
                  { page: 'austria-rwr', label: 'کارت قرمز-سفید-قرمز اتریش (RWR Card)' },
                  { page: 'austria-blue-card', label: 'بلوکارت اتریش ۲۰۲۶' },
                  { page: 'startup-austria', label: 'ویزای استارت‌آپ اتریش (۵۰ هزار یورو)' },
                  { page: 'blog/austria-startup-visa', label: 'مقاله جامع ویزای استارتاپ اتریش ۲۰۲۶', blogSlug: 'austria-startup-visa' },
                  { page: 'business-austria', label: 'ثبت شرکت و بیزینس در اتریش' },
                  { page: 'realestate-austria', label: 'خرید ملک در وین و گراتس' },
                  { page: 'artist-austria', label: 'اقامت هنرمندان و نخبگان اتریش' },
                  { page: 'medical-austria-nursing', label: 'کادر درمان و پرستاری اتریش' },
                  { page: 'academic-austria', label: 'تحصیل در دانشگاه‌های دولتی اتریش' },
                ].map((item: { page: string; label: string; blogSlug?: string }) => (
                  <li key={item.page}>
                    <a
                      href={`/${item.page}`}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey) {
                          e.preventDefault();
                          if (item.blogSlug && onNavigateToBlogPost) onNavigateToBlogPost(item.blogSlug);
                          else if (onNavigateToPage) onNavigateToPage(item.page);
                          else window.location.pathname = `/${item.page}`;
                        }
                      }}
                      className="hover:text-amber-300 hover:underline transition-colors block py-0.5"
                    >
                      • {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ستون ۲: آلمان و بلوکارت اتحادیه اروپا */}
            <div className="space-y-2.5">
              <h4 className="font-black text-white text-xs border-r-2 border-emerald-400 pr-2 flex items-center gap-1">
                <span>🇩🇪</span>
                <span>بلوکارت و کاریابی اروپا</span>
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {[
                  { page: 'german-blue-card', label: 'بلوکارت آلمان ۲۰۲۶ (حداقل حقوق €۴۸,۳۰۰)' },
                  { page: 'jobseeker-germany', label: 'کارت شانس آلمان (Chancenkarte)' },
                  { page: 'medical-germany', label: 'پزشکان و کادر درمان آلمان' },
                  { page: 'germany-nursing-assistant-visa', label: 'ویزای کار کمک پرستاری آلمان (۲۰۲۶–۲۰۲۷)' },
                  { page: 'ausbildung-germany', label: 'دوره‌های کارآموزی آوسبیلدونگ آلمان' },
                  { page: 'startup-germany', label: 'ویزای کارآفرینی و استارت‌آپ آلمان' },
                  { page: 'degree-recognition-for-immigration', label: 'معادل‌سازی مدرک تحصیلی (ZAB / Anabin / WES)' },
                  { page: 'spain-blue-card', label: 'بلوکارت اسپانیا ۲۰۲۶' },
                  { page: 'italy-blue-card', label: 'بلوکارت ایتالیا ۲۰۲۶' },
                  { page: 'hungary-blue-card', label: 'بلوکارت مجارستان' },
                  { page: 'jobseeker-norway', label: 'ویزای جستجوی کار نروژ' },
                ].map((item) => (
                  <li key={item.page}>
                    <a
                      href={`/${item.page}`}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey) {
                          e.preventDefault();
                          if (onNavigateToPage) onNavigateToPage(item.page);
                          else window.location.pathname = `/${item.page}`;
                        }
                      }}
                      className="hover:text-amber-300 hover:underline transition-colors block py-0.5"
                    >
                      • {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ستون ۳: سرمایه‌گذاری، گلدن ویزا و پاسپورت */}
            <div className="space-y-2.5">
              <h4 className="font-black text-white text-xs border-r-2 border-cyan-400 pr-2 flex items-center gap-1">
                <span>🏛️</span>
                <span>تمکن مالی، گلدن ویزا و شهروندی</span>
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {[
                  { page: 'financial-spain', label: 'تمکن مالی (Non-Lucrative) اسپانیا' },
                  { page: 'financial-france', label: 'اقامت خودحمایتی فرانسه' },
                  { page: 'realestate-greece', label: 'خرید ملک و گلدن ویزای یونان' },
                  { page: 'immigration-through-company-registration', label: 'مهاجرت از طریق ثبت شرکت (اروپا و دبی)' },
                  { page: 'business-dubai', label: 'ثبت شرکت و اقامت طلایی دبی' },
                  { page: 'citizenship-dominica', label: 'پاسپورت دومینیکا در کمتر از ۶ ماه' },
                  { page: 'citizenship-turkey', label: 'شهروندی ترکیه با سرمایه‌گذاری ملکی' },
                  { page: 'nomad-spain', label: 'ویزای دیجیتال نوماد اسپانیا' },
                  { page: 'migrate-with-1-billion-toman', label: 'مهاجرت با بودجه ۱ میلیارد تومان (۲۰۲۶–۲۰۲۷)' },
                  { page: 'netherlands-study-visa', label: 'مهاجرت تحصیلی به هلند ۲۰۲۶' },
                ].map((item) => (
                  <li key={item.page}>
                    <a
                      href={`/${item.page}`}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey) {
                          e.preventDefault();
                          if (onNavigateToPage) onNavigateToPage(item.page);
                          else window.location.pathname = `/${item.page}`;
                        }
                      }}
                      className="hover:text-amber-300 hover:underline transition-colors block py-0.5"
                    >
                      • {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ستون ۴: ابزارها، راهنماها و خدمات استقرار */}
            <div className="space-y-2.5">
              <h4 className="font-black text-white text-xs border-r-2 border-purple-400 pr-2 flex items-center gap-1">
                <span>⚡</span>
                <span>سامانه‌ها و راهنماهای جامع ۲۰۲۶–۲۰۲۷</span>
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {[
                  { page: 'best-countries-to-immigrate-to', label: 'بهترین کشور برای مهاجرت (۲۰۲۶–۲۰۲۷)' },
                  { page: 'countries-we-do-not-recommend-for-immigration', label: 'کشورهایی که توصیه نمی‌کنیم (۲۰۲۶–۲۰۲۷)' },
                  { page: 'germany-vs-austria-immigration-comparison', label: 'مقایسه آلمان یا اتریش (۶ معیار ۲۰۲۶–۲۰۲۷)' },
                  { page: 'easiest-countries-to-immigrate-2027', label: 'راحت‌ترین کشور برای مهاجرت ۲۰۲۷' },
                  { page: 'cheapest-european-countries-to-immigrate', label: 'ارزان‌ترین کشورهای اروپایی (۲۰۲۶–۲۰۲۷)' },
                  { page: 'real-cost-of-immigration-hidden-fees', label: 'هزینه واقعی و هزینه‌های پنهان مهاجرت' },
                  { page: 'why-my-visa-was-rejected-10-real-reasons', label: '۱۰ دلیل واقعی ریجکتی ویزا و رفع ریجکتی' },
                  { page: 'why-some-wait-5-years-for-immigration-case-studies', label: 'چرا بعضی‌ها ۵ سال در صف می‌مانند؟ (۴ پرونده)' },
                  { page: 'iranian-immigration-map-statistics', label: 'نقشه آماری مهاجرت ایرانیان (۲۰۲۵–۲۰۲۷)' },
                  { page: 'visa-approval-rate-for-iranians-by-country', label: 'نرخ موفقیت ویزا به تفکیک کشور (۲۰۲۶–۲۰۲۷)' },
                  { page: 'single-vs-married-immigration-which-is-easier', label: 'مهاجرت مجردها در مقابل متأهل‌ها (۲۰۲۶–۲۰۲۷)' },
                  { page: 'immigration-for-artists-and-musicians', label: 'مهاجرت هنرمندان و اهالی موسیقی (۲۰۲۶–۲۰۲۷)' },
                  { page: 'best-digital-nomad-visas-income-tax-comparison', label: 'ویزای نومد دیجیتال و مقایسه مالیاتی (۲۰۲۶–۲۰۲۷)' },
                  { page: 'complete-immigration-document-checklist', label: 'چک‌لیست ۳۰ سند کلیدی مهاجرت (۲۰۲۶–۲۰۲۷)' },
                  { page: 'global-visa-rules-changes', label: 'قوانین جدید ویزاهای جهان (۲۰۲۶–۲۰۲۷)' },
                  { page: 'immigration-without-language-certificate', label: 'مهاجرت بدون مدرک زبان (۲۰۲۶–۲۰۲۷)' },
                  { page: 'immigration-with-high-school-diploma', label: 'مهاجرت با مدرک دیپلم (۲۰۲۶–۲۰۲۷)' },
                  { page: 'language-college-visa', label: 'مهاجرت از طریق کالج زبان (۲۰۲۶–۲۰۲۷)' },
                  { page: 'after-arrival', label: 'خدمات پس از ورود (After-Arrival) اروپا' },
                  { page: 'blog', label: 'بانک مقالات و بخشنامه‌های ۲۰۲۶' },
                  { page: 'services', label: 'کاتالوگ جامع خدمات دیاکو' },
                  { page: 'interactive-map', label: 'نقشه تعاملی پرونده‌های موفق' },
                  { page: 'online-consult', label: 'رزرو وقت مشاوره با وکیل رسمی' },
                ].map((item) => (
                  <li key={item.page}>
                    <a
                      href={`/${item.page}`}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey) {
                          e.preventDefault();
                          if (onNavigateToPage) onNavigateToPage(item.page);
                          else window.location.pathname = `/${item.page}`;
                        }
                      }}
                      className="hover:text-amber-300 hover:underline transition-colors block py-0.5"
                    >
                      • {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* کپی‌رایت */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <DiacoLogo size={24} />
            <p>© کلیه حقوق مادی و معنوی متعلق به هلدینگ مهاجرتی دیاکو می‌باشد.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.dia-co.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-amber-400 font-bold transition-colors"
            >
              www.dia-co.ir
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
