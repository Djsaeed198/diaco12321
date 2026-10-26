import { useCallback, useState } from 'react';

export type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error';

export interface NewsletterPayload {
  email: string;
  topic: string;
  locale: 'fa' | 'en';
}

const STORAGE_KEY = 'diaco_newsletter_subs_v2';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * منطق کامل خبرنامه: اعتبارسنجی، ارسال، ذخیره‌سازی و ریست
 */
export const useNewsletter = () => {
  const [status, setStatus] = useState<NewsletterStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = useCallback((email: string): string | null => {
    const trimmed = email.trim();
    if (!trimmed) return 'لطفاً آدرس ایمیل خود را وارد نمایید.';
    if (!EMAIL_REGEX.test(trimmed)) {
      return 'فرمت ایمیل معتبر نیست (نمونه صحیح: name@example.com).';
    }
    if (trimmed.length > 254) return 'طول ایمیل بیش از حد مجاز است.';
    return null;
  }, []);

  const subscribe = useCallback(
    async (payload: NewsletterPayload): Promise<boolean> => {
      const err = validate(payload.email);
      if (err) {
        setStatus('error');
        setErrorMessage(err);
        return false;
      }

      setStatus('loading');
      setErrorMessage('');

      try {
        // TODO: جایگزینی با فراخوانی API واقعی
        await new Promise((r) => setTimeout(r, 900));

        // ذخیره محلی جهت ماندگاری و تحلیل
        try {
          const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
          existing.push({
            email: payload.email.trim().toLowerCase(),
            topic: payload.topic,
            locale: payload.locale,
            date: new Date().toISOString(),
          });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(-100)));
        } catch {
          /* ignore */
        }

        setStatus('success');
        return true;
      } catch {
        setStatus('error');
        setErrorMessage('متأسفانه در ثبت عضویت خطایی رخ داد. لطفاً دوباره تلاش کنید.');
        return false;
      }
    },
    [validate]
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
  }, []);

  return { status, errorMessage, subscribe, reset, validate };
};