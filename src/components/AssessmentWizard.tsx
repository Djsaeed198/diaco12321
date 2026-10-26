import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AssessmentData } from '../types/assessment';
import type { UserProfile } from '../types';
import { toPersianDigits } from '../utils/persian';
import { useSeo } from '../hooks/useSeo';
import useAssessmentPersist from '../hooks/useAssessmentPersist';
import { getWizardStepSeo, WIZARD_STEP_SEO } from '../seo/WIZARD_STEP_SEO';
import StepCountry from './steps/StepCountry';
import StepPath from './steps/StepPath';
import StepFamily from './steps/StepFamily';
import StepFinance from './steps/StepFinance';
import StepPersonal from './steps/StepPersonal';

// ===== تعریف مراحل به‌صورت ساختارمند =====
interface StepDefinition {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  component: React.ComponentType<StepProps>;
  optional?: boolean;
}

export interface StepProps {
  data: AssessmentData;
  update: <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => void;
}

const STEPS: StepDefinition[] = [
  {
    id: 'country',
    title: 'انتخاب کشورهای هدف',
    shortTitle: 'کشور',
    description: 'از میان ۱۱ کشور اروپایی، کشور یا کشورهای مورد نظر خود را انتخاب کنید.',
    icon: '🌍',
    component: StepCountry,
  },
  {
    id: 'path',
    title: 'انتخاب روش مهاجرت',
    shortTitle: 'روش',
    description: 'روش مهاجرتی متناسب با شرایط شما (کاری، تحصیلی، تمکن مالی و...) انتخاب کنید.',
    icon: '🧭',
    component: StepPath,
  },
  {
    id: 'family',
    title: 'وضعیت همراهان خانواده',
    shortTitle: 'خانواده',
    description: 'آیا مجرد هستید یا با همسر و فرزندان مهاجرت می‌کنید؟',
    icon: '👨‍👩‍👧',
    component: StepFamily,
  },
  {
    id: 'finance',
    title: 'برآورد تمکن و بودجه',
    shortTitle: 'بودجه',
    description: 'بازه تقریبی بودجه و دارایی خود را مشخص کنید تا مسیرهای متناسب پیشنهاد شود.',
    icon: '💰',
    component: StepFinance,
  },
  {
    id: 'personal',
    title: 'مشخصات فردی و زبانی',
    shortTitle: 'مشخصات',
    description: 'اطلاعات نهایی شامل سن، تحصیلات و سطح زبان را وارد کنید.',
    icon: '📋',
    component: StepPersonal,
  },
];

interface Props {
  profile?: UserProfile;
  onProfileChange?: <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => void;
  onSubmit?: () => void;
  isLoading?: boolean;
}

export const AssessmentWizard: React.FC<Props> = ({
  profile,
  onProfileChange,
  onSubmit,
  isLoading = false,
}) => {
  const [localData, setLocalData] = useState<AssessmentData>({
    targetCountries: profile?.targetCountries?.length ? profile.targetCountries : ['AT'],
    immigrationPath: profile?.immigrationPath || 'financial-self',
    familyStatus: profile?.familyStatusChoice || 'single',
    financialRange: profile?.financialRange || 'high',
    age: profile?.age || 32,
    education: profile?.education || 'bachelor',
    language: profile?.language || 'B1',
    hasJobOffer: profile?.hasJobOffer || false,
    notes: profile?.notes || '',
    fullName: profile?.fullName || '',
    phone: profile?.phone || '',
    consent: profile?.consent ?? true,
  });

  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [maxReachedStep, setMaxReachedStep] = useState(0);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  // ===== SEO دینامیک برای هر مرحله =====
  const currentSeo = useMemo(
    () => WIZARD_STEP_SEO[step] || WIZARD_STEP_SEO[0],
    [step]
  );
  useSeo(currentSeo);

  // ===== ذخیره خودکار =====
  const { clear: clearDraft } = useAssessmentPersist(
    localData,
    step,
    useCallback((saved) => {
      setLocalData((prev) => ({ ...prev, ...saved.data }));
      setStep(Math.min(saved.step, STEPS.length - 1));
      setMaxReachedStep(Math.min(saved.step, STEPS.length - 1));
      setSavedAt(saved.savedAt);
      setHydrated(true);
    }, [])
  );

  // ===== ثبت زمان ذخیره برای نمایش «ذخیره شد» =====
  useEffect(() => {
    const t = window.setTimeout(() => setSavedAt(Date.now()), 700);
    return () => window.clearTimeout(t);
  }, [localData, step]);

  // ===== اطلاع‌رسانی به صفحه‌خوان =====
  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `مرحله ${toPersianDigits(step + 1)}: ${STEPS[step].title}`;
    }
  }, [step]);

  // ===== به‌روزرسانی داده‌ها =====
  const update = useCallback(
    <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => {
      setLocalData((prev) => ({ ...prev, [key]: value }));
      setError(null);
      if (onProfileChange) {
        if (key === 'familyStatus') {
          onProfileChange('familyStatusChoice', value as any);
        } else {
          onProfileChange(key as any, value as any);
        }
      }
    },
    [onProfileChange]
  );

  // ===== اعتبارسنجی هر مرحله =====
  const validateStep = useCallback(
    (s: number): boolean => {
      switch (s) {
        case 0:
          return localData.targetCountries.length > 0;
        case 1:
          return !!localData.immigrationPath;
        case 2:
          return !!localData.familyStatus;
        case 3:
          return !!localData.financialRange;
        case 4:
          return (
            localData.age !== null &&
            !!localData.education &&
            !!localData.language &&
            localData.consent === true
          );
        default:
          return true;
      }
    },
    [localData]
  );

  // ===== ناوبری =====
  const goToStep = useCallback(
    (target: number, opts?: { skipValidation?: boolean }) => {
      if (target < 0 || target >= STEPS.length) return;

      // اگر به جلو می‌رویم، مراحل قبلی باید معتبر باشند
      if (target > step && !opts?.skipValidation) {
        for (let i = step; i < target; i++) {
          if (!validateStep(i)) {
            setError(`برای عبور از مرحله «${STEPS[i].shortTitle}» ابتدا فیلدهای الزامی را کامل کنید.`);
            setStep(i);
            return;
          }
        }
      }

      setError(null);
      setStep(target);
      setMaxReachedStep((m) => Math.max(m, target));

      // اسکرول نرم به بالای ویزارد
      document
        .getElementById('assessment-wizard')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [step, validateStep]
  );

  const handleNext = useCallback(() => {
    if (!validateStep(step)) {
      setError('لطفاً فیلدهای الزامی این مرحله را کامل کنید.');
      return;
    }
    setError(null);
    if (step < STEPS.length - 1) {
      goToStep(step + 1, { skipValidation: true });
    } else {
      onSubmit?.();
    }
  }, [step, validateStep, goToStep, onSubmit]);

  const handlePrev = useCallback(() => {
    if (step > 0) goToStep(step - 1, { skipValidation: true });
  }, [step, goToStep]);

  // ===== میانبرهای کیبورد =====
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'ArrowLeft') handleNext(); // RTL: چپ = بعدی
      if (e.altKey && e.key === 'ArrowRight') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleNext, handlePrev]);

  const progress = ((step + 1) / STEPS.length) * 100;
  const CurrentStep = STEPS[step].component;
  const isLast = step === STEPS.length - 1;

  return (
    <>
      {/* Live region برای screen reader */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <article
        id="assessment-wizard"
        dir="rtl"
        aria-label="سامانه ارزیابی هوشمند مهاجرت دیاکو"
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft"
      >
        {/* ===== هدر مرحله ===== */}
        <header className="border-b border-white/10 bg-gradient-to-l from-[#082833] via-[#0e3846] to-[#144f62] px-6 py-5 sm:px-8 text-white">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#fed871] to-[#f5a623] text-[#0b2933] font-black text-sm shadow-md"
              >
                {toPersianDigits(step + 1)}
              </span>
              <div>
                <h2 className="text-sm font-bold text-white">
                  {STEPS[step].title}
                </h2>
                <p className="text-[11px] text-amber-300">
                  مرحله {toPersianDigits(step + 1)} از {toPersianDigits(STEPS.length)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {savedAt && (
                <span
                  className="hidden rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1.5 text-[10px] font-semibold text-emerald-300 sm:inline-flex items-center gap-1.5"
                  aria-live="polite"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  ذخیره خودکار
                </span>
              )}
              <span className="hidden rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white sm:block">
                سامانه تحلیل هوشمند دیاکو
              </span>
            </div>
          </div>

          {/* توضیح مرحله */}
          <p className="mt-3 text-[11px] sm:text-xs text-slate-300">
            {STEPS[step].description}
          </p>

          {/* نوار پیشرفت */}
          <div
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="میزان پیشرفت ارزیابی"
            className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15"
          >
            <div
              className="h-full rounded-full bg-gradient-to-l from-[#fed871] to-[#f5a623] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* ===== ناوبری مرحله‌ای (Stepper) ===== */}
          <nav
            aria-label="مراحل ارزیابی"
            className="mt-4 -mx-1 overflow-x-auto"
          >
            <ol className="flex items-center gap-1.5 pb-1 min-w-max">
              {STEPS.map((s, idx) => {
                const isActive = idx === step;
                const isDone = idx < step && validateStep(idx);
                const isReachable = idx <= maxReachedStep;

                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goToStep(idx)}
                      disabled={!isReachable}
                      aria-current={isActive ? 'step' : undefined}
                      aria-label={`مرحله ${idx + 1}: ${s.title}${isDone ? ' (تکمیل شده)' : ''}`}
                      className={`group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${
                        isActive
                          ? 'bg-[#f5a623] text-[#082833] shadow-md'
                          : isDone
                          ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
                          : isReachable
                          ? 'bg-white/10 text-slate-300 hover:bg-white/20'
                          : 'bg-white/5 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <span aria-hidden="true" className="text-xs">
                        {isDone && !isActive ? '✓' : s.icon}
                      </span>
                      <span className="hidden sm:inline">{s.shortTitle}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </header>

        {/* ===== بدنه مرحله ===== */}
        <section
          className="px-6 py-8 sm:px-8 animate-fadeIn"
          key={step /* trigger re-animation */}
          aria-labelledby={`step-heading-${step}`}
        >
          <h3 id={`step-heading-${step}`} className="sr-only">
            {STEPS[step].title}
          </h3>

          <CurrentStep data={localData} update={update} />

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-center text-xs font-semibold text-red-600"
            >
              {error}
            </p>
          )}

          {/* ===== دکمه‌های کنترل ===== */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 0 || isLoading}
              aria-label="بازگشت به مرحله قبل"
              className={`rounded-xl border border-slate-300 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 transition hover:border-[#144f62] hover:text-[#144f62] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#144f62] ${
                step === 0 ? 'invisible' : ''
              }`}
            >
              مرحله قبل
            </button>

            <div className="flex items-center gap-2">
              {/* پاک کردن پیش‌نویس */}
              {hydrated && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('آیا از پاک کردن پیش‌نویس اطمینان دارید؟')) {
                      clearDraft();
                      window.location.reload();
                    }
                  }}
                  className="hidden sm:inline-flex rounded-xl border border-slate-200 px-4 py-2.5 text-[11px] font-semibold text-slate-500 hover:border-red-300 hover:text-red-500 transition"
                >
                  پاک کردن پیش‌نویس
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={isLoading}
                aria-label={isLast ? 'مشاهده تحلیل و دریافت گزارش' : 'رفتن به مرحله بعد'}
                className="rounded-xl bg-gradient-to-l from-[#f5a623] to-[#e58e0b] hover:from-[#e58e0b] hover:to-[#c56b04] text-[#082833] px-8 py-3 text-xs sm:text-sm font-black shadow-md transition hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5a623]"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-[#082833]/30 border-t-[#082833] animate-spin" />
                    در حال تحلیل پرونده...
                  </span>
                ) : isLast ? (
                  'مشاهده تحلیل و دریافت گزارش'
                ) : (
                  'مرحله بعدی'
                )}
              </button>
            </div>
          </div>

          {/* راهنمای میانبر */}
          <p className="mt-3 text-[10px] text-slate-400 text-center sm:text-right">
            💡 میانبر: <kbd className="rounded border border-slate-300 px-1">Alt</kbd> +{' '}
            <kbd className="rounded border border-slate-300 px-1">←</kbd> مرحله بعد،{' '}
            <kbd className="rounded border border-slate-300 px-1">Alt</kbd> +{' '}
            <kbd className="rounded border border-slate-300 px-1">→</kbd> مرحله قبل
          </p>
        </section>
      </article>
    </>
  );
};

export default AssessmentWizard;