import { useEffect, useRef } from 'react';
import type { AssessmentData } from '../types/assessment';

const STORAGE_KEY = 'diaco:assessment:draft:v1';
const STEP_KEY = 'diaco:assessment:step:v1';

export interface PersistState {
  data: AssessmentData;
  step: number;
  savedAt: number;
}

/**
 * ذخیره‌سازی خودکار پیشرفت ارزیابی در localStorage
 * با debounce برای جلوگیری از نوشتن‌های مکرر.
 */
export const useAssessmentPersist = (
  data: AssessmentData,
  step: number,
  onHydrate?: (saved: PersistState) => void
) => {
  const hydrated = useRef(false);
  const timer = useRef<number | null>(null);

  // ===== بازیابی اولیه =====
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const rawStep = localStorage.getItem(STEP_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as PersistState;
      const savedStep = rawStep ? Number(rawStep) : parsed.step;

      // فقط اگر کمتر از ۳۰ روز گذشته باشد بازیابی می‌کنیم
      const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - (parsed.savedAt || 0) > THIRTY_DAYS) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STEP_KEY);
        return;
      }

      onHydrate?.({
        data: parsed.data,
        step: Number.isFinite(savedStep) ? savedStep : 0,
        savedAt: parsed.savedAt,
      });
    } catch {
      // نادیده بگیر
    }
  }, [onHydrate]);

  // ===== ذخیره debounced =====
  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      try {
        const payload: PersistState = {
          data,
          step,
          savedAt: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        localStorage.setItem(STEP_KEY, String(step));
      } catch {
        // نادیده بگیر
      }
    }, 600);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [data, step]);

  const clear = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);
  };

  return { clear };
};

export default useAssessmentPersist;