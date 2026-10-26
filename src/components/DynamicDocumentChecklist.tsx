import React, { useState, useMemo, useEffect } from 'react';
import {
  CHECKLIST_COUNTRIES_2026,
  CHECKLIST_PATHS_2026,
  getDetailedChecklist2026,
  type DocumentItem2026,
} from '../constants/checklistData2026';
import type { UserProfile, ImmigrationPlan } from '../types';
import { toPersianDigits } from '../utils/persian';

interface Props {
  profile?: UserProfile;
  plan?: ImmigrationPlan | null;
  defaultCountry?: string;
  defaultPath?: string;
  isStandalone?: boolean;
}

const CATEGORY_NAMES: Record<string, { label: string; icon: string }> = {
  all: { label: 'همه مدارک', icon: '📁' },
  mandatory: { label: 'فقط الزامی و کنسولی', icon: '⭐' },
  identity: { label: 'هویتی و وضعیت مدنی', icon: '🪪' },
  financial: { label: 'مالی و تمکن بانکی', icon: '💰' },
  academic_job: { label: 'شغلی، تحصیلی و قرارداد', icon: '🎓' },
  accommodation_insurance: { label: 'مسکن و بیمه درمانی', icon: '🏠' },
  language: { label: 'مدارک زبان رسمی', icon: '🗣️' },
};

export const DynamicDocumentChecklist: React.FC<Props> = ({
  profile,
  plan,
  defaultCountry,
  defaultPath,
  isStandalone = false,
}) => {
  // تشخیص هوشمند کشور و مسیر اولیه از پروفایل یا ارزیابی
  const initialCountry = useMemo(() => {
    if (defaultCountry) return defaultCountry;
    const countryCodeOrName = profile?.targetCountries?.[0] || profile?.country;
    if (countryCodeOrName) {
      if (countryCodeOrName.includes('AT') || countryCodeOrName.includes('اتریش')) return 'austria';
      if (countryCodeOrName.includes('DE') || countryCodeOrName.includes('آلمان')) return 'germany';
      if (countryCodeOrName.includes('ES') || countryCodeOrName.includes('اسپانیا')) return 'spain';
      if (countryCodeOrName.includes('GR') || countryCodeOrName.includes('یونان')) return 'greece';
      if (countryCodeOrName.includes('IT') || countryCodeOrName.includes('ایتالیا')) return 'italy';
      if (countryCodeOrName.includes('FR') || countryCodeOrName.includes('فرانسه')) return 'france';
      if (countryCodeOrName.includes('NL') || countryCodeOrName.includes('هلند')) return 'netherlands';
      if (countryCodeOrName.includes('PT') || countryCodeOrName.includes('پرتغال')) return 'portugal';
    }
    return 'austria'; // کشور پیش‌فرض اتریش (مرجع اصلی دیاکو)
  }, [defaultCountry, profile]);

  const initialPath = useMemo(() => {
    if (defaultPath) return defaultPath;
    const pathKeyOrName = profile?.immigrationPath || profile?.path;
    if (pathKeyOrName) {
      if (pathKeyOrName.includes('financial') || pathKeyOrName.includes('personal') || pathKeyOrName.includes('تمکن')) return 'personal';
      if (pathKeyOrName.includes('skilled') || pathKeyOrName.includes('rwr') || pathKeyOrName.includes('قرمز')) return 'rwr';
      if (pathKeyOrName.includes('study') || pathKeyOrName.includes('education') || pathKeyOrName.includes('تحصیل')) return 'education';
      if (pathKeyOrName.includes('golden') || pathKeyOrName.includes('realestate') || pathKeyOrName.includes('ملک') || pathKeyOrName.includes('طلایی')) return 'realestate';
      if (pathKeyOrName.includes('startup') || pathKeyOrName.includes('استارت')) return 'startup';
      if (pathKeyOrName.includes('bluecard') || pathKeyOrName.includes('آبی')) return 'bluecard';
      if (pathKeyOrName.includes('medical') || pathKeyOrName.includes('درمان') || pathKeyOrName.includes('پزشک')) return 'medical';
      if (pathKeyOrName.includes('courses') || pathKeyOrName.includes('ausbildung') || pathKeyOrName.includes('آوسبیلدونگ') || pathKeyOrName.includes('زبان')) return 'courses';
      if (pathKeyOrName.includes('nomad') || pathKeyOrName.includes('نومد')) return 'nomad';
      if (pathKeyOrName.includes('artist') || pathKeyOrName.includes('هنرمند')) return 'artist';
      if (pathKeyOrName.includes('work') || pathKeyOrName.includes('کار')) return 'work';
    }
    return 'personal'; // تمکن مالی به عنوان مسیر پرطرفدار
  }, [defaultPath, profile]);

  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry);
  const [selectedPath, setSelectedPath] = useState<string>(initialPath);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [checkedDocIds, setCheckedDocIds] = useState<Record<string, boolean>>({});

  // لود وضعیت تیک‌ها از لوکال استوریج برای راحتی کاربر
  const storageKey = `diaco_checklist_checked_${selectedCountry}_${selectedPath}`;
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedDocIds(JSON.parse(saved));
      } else {
        setCheckedDocIds({});
      }
    } catch {
      setCheckedDocIds({});
    }
  }, [storageKey]);

  const handleToggleDoc = (docId: string) => {
    setCheckedDocIds((prev) => {
      const updated = { ...prev, [docId]: !prev[docId] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });
  };

  // دریافت چک‌لیست معتبر ۲۰۲۶ برای این کشور و مسیر
  const checklistData = useMemo(() => {
    return getDetailedChecklist2026(selectedPath, selectedCountry);
  }, [selectedPath, selectedCountry]);

  // شخصی‌سازی مدارک بر اساس پروفایل کاربر (وضعیت تاهل و فرزندان)
  const personalizedDocs = useMemo(() => {
    return checklistData.documents.filter((doc) => {
      if (!profile) return true;
      const fam = profile.familyStatusChoice;
      if (doc.familyRelevant === 'married' && fam === 'single') return false;
      if (doc.familyRelevant === 'with_children' && fam !== 'with-family') return false;
      return true;
    });
  }, [checklistData, profile]);

  // فیلتر دسته‌بندی
  const filteredDocs = useMemo(() => {
    return personalizedDocs.filter((doc) => {
      if (activeCategory === 'all') return true;
      if (activeCategory === 'mandatory') return doc.isMandatory;
      return doc.category === activeCategory;
    });
  }, [personalizedDocs, activeCategory]);

  // درصد پیشرفت تکمیل مدارک
  const totalCount = personalizedDocs.length;
  const readyCount = personalizedDocs.filter((d) => checkedDocIds[d.id]).length;
  const progressPercent = totalCount > 0 ? Math.round((readyCount / totalCount) * 100) : 0;

  // متن ارسال به واتساپ کارشناس دیاکو
  const handleShareToWhatsApp = () => {
    const readyTitles = personalizedDocs
      .filter((d) => checkedDocIds[d.id])
      .map((d) => `✓ ${d.title}`)
      .join('\n');
    const missingTitles = personalizedDocs
      .filter((d) => !checkedDocIds[d.id])
      .map((d) => `○ ${d.title}`)
      .join('\n');

    const message = `سلام، وقت بخیر. من در سامانه دیاکو چک‌لیست مدارک سال ۲۰۲۶ را بررسی کردم:
📌 کشور مقصد: ${checklistData.country}
📌 روش مهاجرتی: ${checklistData.pathName}
📊 وضعیت آمادگی مدارک: ${toPersianDigits(readyCount)} از ${toPersianDigits(totalCount)} مدرک (${toPersianDigits(progressPercent)}٪)

مدارک آماده شده:
${readyTitles || 'هیچ مدرکی هنوز آماده نشده است'}

مدارک نیازمند اقدام و ترجمه:
${missingTitles || 'همه مدارک آماده است'}

لطفاً جهت تاییدات و بررسی نهایی مدارک من را راهنمایی فرمایید.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/989197340829?text=${encoded}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="dynamic-document-checklist"
      className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#08222b] via-[#0a2e3a] to-[#07242e] p-5 sm:p-7 md:p-9 text-white shadow-2xl transition-all"
      dir="rtl"
    >
      {/* سربرگ معرفی ویژگی پویا */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/15 pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
              <span className="h-2 w-2 rounded-full bg-[#f5a623] animate-pulse" />
              سامانه هوشمند و پویای چک‌لیست مدارک ۲۰۲۶
            </span>
            {profile && (
              <span className="rounded-full bg-cyan-500/20 border border-cyan-400/30 px-3 py-1 text-[11px] font-bold text-cyan-300">
                شخصی‌سازی شده بر اساس پرونده شما
              </span>
            )}
          </div>
          <h3 className="mt-3 text-xl sm:text-2xl md:text-3xl font-black text-white">
            چک‌لیست رسمی مدارک و الزامات سفارت (بروزرسانی ۲۰۲۶)
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            این فهرست پویا بر اساس آخرین شیوه‌نامه‌های اداره مهاجرت کشور مقصد ({checklistData.country}) و سفارتخانه مربوطه تدوین شده است. می‌توانید وضعیت مدارک خود را علامت بزنید و فایل آن را پرینت یا برای وکیل ارسال کنید.
          </p>
        </div>

        {/* دکمه‌های پرینت و ارسال */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2.5 text-xs font-bold text-slate-200 transition cursor-pointer"
            title="چاپ یا دریافت نسخه چاپی PDF"
          >
            <span>🖨️</span>
            <span>چاپ / PDF</span>
          </button>
          <button
            type="button"
            onClick={handleShareToWhatsApp}
            className="flex items-center gap-1.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] px-4 py-2.5 text-xs font-black text-white shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>💬</span>
            <span>بررسی مدارک با وکیل دیاکو</span>
          </button>
        </div>
      </div>

      {/* انتخابگر پویا: کشور و مسیر مهاجرتی */}
      <div className="mt-6 grid md:grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-black/30 p-4">
        {/* انتخاب کشور */}
        <div>
          <label className="block text-xs font-bold text-amber-300 mb-2">
            انتخاب کشور مقصد:
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-[#08222b] px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white focus:border-[#f5a623] focus:outline-none cursor-pointer"
          >
            {CHECKLIST_COUNTRIES_2026.map((c) => (
              <option key={c.id} value={c.id} className="bg-[#08222b] text-white">
                {c.flag} {c.name} ({c.officialOrg.split('،')[0]})
              </option>
            ))}
          </select>
        </div>

        {/* انتخاب روش مهاجرتی */}
        <div>
          <label className="block text-xs font-bold text-amber-300 mb-2">
            انتخاب روش مهاجرت:
          </label>
          <select
            value={selectedPath}
            onChange={(e) => setSelectedPath(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-[#08222b] px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white focus:border-[#f5a623] focus:outline-none cursor-pointer"
          >
            {CHECKLIST_PATHS_2026.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#08222b] text-white">
                {p.icon} {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* نوار اعتبار قانونی و منبع رسمی سال ۲۰۲۶ */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-200">
        <div className="flex items-center gap-2">
          <span>🏛️</span>
          <span>
            <strong>مرجع معتبر استعلام سال ۲۰۲۶:</strong> {checklistData.officialSource2026}
          </span>
        </div>
        <span className="text-[11px] font-bold text-amber-300">
          پشتیبانی وکلای مقیم در مقصد
        </span>
      </div>

      {/* نوار پیشرفت تکمیل مدارک توسط کاربر */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="flex items-center gap-2 text-slate-200">
            <span>وضعیت آمادگی مدارک شما:</span>
            <span className="rounded-lg bg-white/10 px-2 py-0.5 text-amber-300 font-black">
              {toPersianDigits(readyCount)} از {toPersianDigits(totalCount)} مدرک آماده است
            </span>
          </span>
          <span className="text-base font-black text-emerald-400">
            {toPersianDigits(progressPercent)}٪
          </span>
        </div>
        {/* بار انیمیشنی پیشرفت */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-black/40 border border-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-l from-emerald-400 via-teal-400 to-[#f5a623] transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* تب‌های فیلتر دسته‌بندی مدارک */}
      <div className="mt-6 flex items-center gap-1.5 flex-wrap border-b border-white/10 pb-4">
        {Object.entries(CATEGORY_NAMES).map(([key, cat]) => {
          const isActive = activeCategory === key;
          const count =
            key === 'all'
              ? personalizedDocs.length
              : key === 'mandatory'
              ? personalizedDocs.filter((d) => d.isMandatory).length
              : personalizedDocs.filter((d) => d.category === key).length;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#f5a623] text-[#082833] font-black shadow-glow'
                  : 'bg-white/[0.05] text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className={`rounded-full px-1.5 py-0.2 text-[10px] ${isActive ? 'bg-[#082833] text-amber-300' : 'bg-white/10 text-slate-300'}`}>
                {toPersianDigits(count)}
              </span>
            </button>
          );
        })}
      </div>

      {/* لیست تعاملی مدارک */}
      <div className="mt-6 space-y-3">
        {filteredDocs.map((doc, idx) => {
          const isChecked = !!checkedDocIds[doc.id];

          return (
            <div
              key={doc.id}
              onClick={() => handleToggleDoc(doc.id)}
              className={`group flex items-start gap-3.5 rounded-2xl border p-4 transition-all duration-300 cursor-pointer ${
                isChecked
                  ? 'border-emerald-500/50 bg-emerald-950/20'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]'
              }`}
            >
              {/* چک‌باکس بزرگ لمسی */}
              <button
                type="button"
                aria-label={`تغییر وضعیت ${doc.title}`}
                className={`mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-lg border transition-all ${
                  isChecked
                    ? 'border-emerald-400 bg-emerald-500 text-white font-bold'
                    : 'border-white/30 bg-black/40 text-transparent group-hover:border-[#f5a623]'
                }`}
              >
                ✓
              </button>

              {/* مشخصات مدرک */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">
                      {toPersianDigits(idx + 1)}.
                    </span>
                    <h4
                      className={`text-sm sm:text-base font-bold transition-colors ${
                        isChecked ? 'text-emerald-300 line-through opacity-80' : 'text-white'
                      }`}
                    >
                      {doc.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.isMandatory ? (
                      <span className="rounded-md border border-rose-500/40 bg-rose-500/15 px-2 py-0.5 text-[10px] font-black text-rose-300">
                        الزامی کنسولی
                      </span>
                    ) : (
                      <span className="rounded-md border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                        امتیازآور / تکمیلی
                      </span>
                    )}

                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                      اعتبار: {doc.validity}
                    </span>
                  </div>
                </div>

                {/* نکته بخشنامه ۲۰۲۶ */}
                <p className="mt-2 text-xs leading-5 text-slate-300">
                  <strong className="text-amber-300">نکته حقوقی ۲۰۲۶: </strong>
                  {doc.officialNote2026}
                </p>

                {/* مرجع صدور */}
                <div className="mt-2.5 flex items-center gap-4 text-[11px] text-slate-400">
                  <span>
                    <strong>مرجع صدور: </strong> {doc.issuingAuthority}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* راهنمای تاییدات و ترجمه در انتهای چک‌لیست */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-slate-300 space-y-2">
        <p className="font-bold text-amber-300 flex items-center gap-2">
          <span>⚠️</span>
          <span>راهنمای ویژه تاییدات و ترجمه مدارک هلدینگ دیاکو:</span>
        </p>
        <p className="leading-6">
          کلیه مدارک شناسایی، شغلی و دانشگاهی باید توسط مترجمین رسمی قوه قضائیه ترجمه شده و پس از اخذ مهر دادگستری و وزارت امور خارجه، به تایید سفارت کشور مقصد در تهران (Legalisierung) یا اخذ آپوستیل (Apostille) برسند. دپارتمان دارالترجمه و تاییدات کنسولی دیاکو کلیه این مراحل را در سریع‌ترین زمان برای موکلین محترم انجام می‌دهد.
        </p>
      </div>
    </div>
  );
};

export default DynamicDocumentChecklist;
