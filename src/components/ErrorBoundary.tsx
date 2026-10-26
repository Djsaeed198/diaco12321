import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Diaco] Render error:', error, info);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[#0b2933] text-white p-8">
          <div className="max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-black mb-3">خطایی رخ داد</h1>
            <p className="text-slate-300 text-sm mb-6 leading-7">
              متأسفانه در بارگذاری این بخش خطایی پیش آمد. تیم فنی دیاکو این خطا را ثبت کرده است.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-[#f5a623] px-6 py-3 text-sm font-black text-[#082833] hover:scale-105 transition"
            >
              تلاش مجدد
            </button>
            <a
              href="/"
              className="mt-3 block text-xs text-amber-300 hover:underline"
            >
              بازگشت به صفحه اصلی
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}