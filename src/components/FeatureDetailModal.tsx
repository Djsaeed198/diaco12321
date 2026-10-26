import React, { useState } from 'react';
import { HERO_FEATURE_CARDS } from '../constants/content';
import DiacoLogo from './DiacoLogo';
import DynamicDocumentChecklist from './DynamicDocumentChecklist';

interface Props {
  initialFeatureId?: string;
  onClose: () => void;
  onOpenAssessment: () => void;
}

export const FeatureDetailModal: React.FC<Props> = ({
  initialFeatureId = 'cost-viz',
  onClose,
  onOpenAssessment,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialFeatureId);
  const [selectedCountry, setSelectedCountry] = useState<'austria' | 'germany' | 'greece' | 'spain'>('austria');
  const [selectedPath, setSelectedPath] = useState<'financial' | 'bluecard' | 'study' | 'golden'>('financial');
  const [familyMembers, setFamilyMembers] = useState<number>(1);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateCosts = () => {
    let baseBlocked = 0;
    let baseRent = 0;
    let baseLegal = 0;
    let baseGovFees = 0;

    if (selectedCountry === 'austria') {
      if (selectedPath === 'financial') {
        baseBlocked = 26000 * familyMembers;
        baseRent = 1200 * 3;
        baseLegal = 0;
        baseGovFees = 320 * familyMembers;
      } else if (selectedPath === 'bluecard') {
        baseBlocked = 4000;
        baseRent = 1000 * 2;
        baseLegal = 0;
        baseGovFees = 280;
      } else if (selectedPath === 'study') {
        baseBlocked = 14000;
        baseRent = 650 * 3;
        baseLegal = 0;
        baseGovFees = 200;
      } else {
        baseBlocked = 15000;
        baseRent = 1000 * 3;
        baseLegal = 0;
        baseGovFees = 400;
      }
    } else if (selectedCountry === 'germany') {
      if (selectedPath === 'financial') {
        baseBlocked = 24000 * familyMembers;
        baseRent = 1100 * 3;
        baseLegal = 0;
        baseGovFees = 300 * familyMembers;
      } else if (selectedPath === 'bluecard') {
        baseBlocked = 3000;
        baseRent = 950 * 2;
        baseLegal = 0;
        baseGovFees = 250;
      } else if (selectedPath === 'study') {
        baseBlocked = 11904;
        baseRent = 600 * 3;
        baseLegal = 0;
        baseGovFees = 150;
      } else {
        baseBlocked = 14000;
        baseRent = 900 * 3;
        baseLegal = 0;
        baseGovFees = 350;
      }
    } else if (selectedCountry === 'greece') {
      if (selectedPath === 'golden') {
        baseBlocked = 250000;
        baseRent = 0;
        baseLegal = 0;
        baseGovFees = 2000;
      } else {
        baseBlocked = 24000 * familyMembers;
        baseRent = 650 * 3;
        baseLegal = 0;
        baseGovFees = 300;
      }
    } else {
      baseBlocked = 28800 + (familyMembers > 1 ? (familyMembers - 1) * 7200 : 0);
      baseRent = 950 * 3;
      baseLegal = 0;
      baseGovFees = 320 * familyMembers;
    }

    const totalEur = baseBlocked + baseRent + baseGovFees;
    const approximateToman = Math.round((totalEur * 115000) / 10000000);

    return {
      baseBlocked,
      baseRent,
      baseLegal,
      baseGovFees,
      totalEur,
      approximateToman,
    };
  };

  const costResult = calculateCosts();

  const DOC_LIST = [
    { id: 'd1', title: 'گذرنامه با حداقل ۲ سال اعتبار', note: 'دارای حداقل ۴ صفحه سفید بدون خط‌خوردگی' },
    { id: 'd2', title: 'شناسنامه و کارت ملی متقاضی و همراهان', note: 'ترجمه رسمی با تایید دادگستری و امور خارجه' },
    { id: 'd3', title: 'گواهی عدم سوءپیشینه کیفری معتبر', note: 'دارای حداکثر ۳ ماه اعتبار کنسولی' },
    { id: 'd4', title: 'ریزگردش و گواهی تمکن حساب بانکی', note: 'پرینت لاتین ۶ ماهه ممهور به مهر رسمی شعبه ارزی' },
    { id: 'd5', title: 'اسناد ملکی و درآمد ماهانه منفصل', note: 'سند مالکیت، اجاره‌نامه رسمی، سود سهام یا فیش حقوقی' },
    { id: 'd6', title: 'قرارداد اجاره مسکن در کشور مقصد (Mietvertrag)', note: 'تامین شده توسط دپارتمان مسکن دیاکو در وین یا آتن' },
    { id: 'd7', title: 'مدرک زبان (ÖSD / Goethe / IELTS)', note: 'مدرک سطح A1 تا B2 بسته به نوع روش مهاجرتی' },
    { id: 'd8', title: 'رزومه استاندارد اروپایی (Europass) و انگیزه‌نامه', note: 'تنظیم استاندارد حقوقی تحت نظارت وکلای دیاکو' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-6 backdrop-blur-md overflow-y-auto animate-fadeIn"
      dir="rtl"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* سربرگ مدال */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-[#08222b] px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <DiacoLogo size={42} />
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                پرتال تخصصی و میز اطلاعات مهاجرت دیاکو
              </h2>
              <p className="text-[11px] text-amber-300">
                ابزارهای تعاملی، راهنمای قوانین ۲۰۲۶ و برآورد هوشمند پرونده
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white hover:bg-[#f5a623] hover:text-[#082833] transition font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* نوارهای تب */}
        <div className="flex overflow-x-auto gap-1 border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold scrollbar-none">
          {HERO_FEATURE_CARDS.map((card) => {
            const isActive = activeTab === card.id;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveTab(card.id)}
                className={`flex flex-none items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#082833] text-amber-300 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span>{card.icon}</span>
                <span>{card.title}</span>
              </button>
            );
          })}
        </div>

        {/* محتوای تب فعال */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-800">
          {/* تب ۱: محاسبه‌گر هزینه‌ها */}
          {activeTab === 'cost-viz' && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-r from-[#082833] to-[#0e3846] p-5 text-white">
                <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                  <span>📊</span>
                  <span>محاسبه‌گر آنلاین هزینه‌های مهاجرت به تفکیک کشور و روش</span>
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  تعداد نفرات و کشور مقصد را تعیین نمایید تا حداقل تمکن مسدودی، هزینه‌های اقامت، اجاره و خدمات دولتی برآورد گردد.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">کشور مقصد:</label>
                  <select
                    value={selectedCountry}
                    onChange={(e: any) => setSelectedCountry(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs font-semibold text-slate-800 focus:border-[#f5a623] focus:outline-none"
                  >
                    <option value="austria">اتریش (Austria - مقصد اول دیاکو)</option>
                    <option value="germany">آلمان (Germany)</option>
                    <option value="greece">یونان (Greece)</option>
                    <option value="spain">اسپانیا (Spain)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">روش مهاجرتی:</label>
                  <select
                    value={selectedPath}
                    onChange={(e: any) => setSelectedPath(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs font-semibold text-slate-800 focus:border-[#f5a623] focus:outline-none"
                  >
                    <option value="financial">اقامت تمکن مالی (خودحمایتی)</option>
                    <option value="bluecard">اقامت کاری / کارت آبی</option>
                    <option value="study">مهاجرت تحصیلی</option>
                    <option value="golden">سرمایه‌گذاری / خرید ملک</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    تعداد افراد پرونده: {familyMembers} نفر
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={familyMembers}
                    onChange={(e) => setFamilyMembers(Number(e.target.value))}
                    className="w-full accent-[#f5a623] mt-2"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>۱ نفر (مجرد)</span>
                    <span>۲ نفر</span>
                    <span>۳ نفر</span>
                    <span>۴ نفر</span>
                    <span>۵ نفر</span>
                  </div>
                </div>
              </div>

              {/* کارت‌های اقلام هزینه */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-bold text-slate-500">حداقل موجودی تمکن مسدودی:</p>
                  <p className="mt-1 text-xl font-black text-[#082833]">
                    {costResult.baseBlocked.toLocaleString('fa-IR')} یورو
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">در حساب بانکی شخصی متقاضی</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-bold text-slate-500">ودیعه و اجاره مسکن رسمی:</p>
                  <p className="mt-1 text-xl font-black text-[#082833]">
                    {costResult.baseRent.toLocaleString('fa-IR')} یورو
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">تامین شده جهت تاییدیه MA35</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-bold text-slate-500">عوارض دولتی و ثبت شهرداری:</p>
                  <p className="mt-1 text-xl font-black text-[#082833]">
                    {costResult.baseGovFees.toLocaleString('fa-IR')} یورو
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">هزینه‌های ویزا و صدور کارت</p>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
                  <p className="text-[11px] font-bold text-amber-800">حق‌الوکاله و پیگیری کامل:</p>
                  <a
                    href="tel:+982191693955"
                    className="mt-1 inline-flex items-center gap-1 text-xl font-black text-amber-700 hover:text-amber-800 transition hover:underline"
                    title="جهت استعلام حق‌الوکاله رسمی با دیاکو تماس بگیرید"
                  >
                    <span>تماس با دیاکو</span>
                    <span className="text-sm">📞</span>
                  </a>
                  <p className="mt-0.5 text-[10px] text-amber-600">پرداخت مرحله‌ای تا صدور کارت</p>
                </div>
              </div>

              {/* باکس جمع کل */}
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-l from-[#082833] to-[#144f62] p-5 text-white flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300">
                    برآورد کل مخارج مسدودی، مسکن و دولتی:
                  </span>
                  <p className="mt-2 text-2xl font-black text-white">
                    {costResult.totalEur.toLocaleString('fa-IR')} یورو{' '}
                    <span className="text-xs font-bold text-amber-300">(+ حق‌الوکاله: تماس با دیاکو)</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    معادل تقریبی {costResult.approximateToman.toLocaleString('fa-IR')} میلیارد تومان
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAssessment();
                  }}
                  className="rounded-xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-5 py-3 text-xs font-black text-[#082833] shadow-glow transition hover:scale-105 cursor-pointer"
                >
                  ارزیابی انطباق بودجه من
                </button>
              </div>
            </div>
          )}

          {/* تب ۲: چک‌لیست مدارک */}
          {activeTab === 'doc-check' && (
            <div className="space-y-5">
              <DynamicDocumentChecklist isStandalone={true} />
            </div>
          )}

          {/* تب ۳: مقایسه روش‌های اقامتی */}
          {activeTab === 'method-comp' && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#082833] p-5 text-white">
                <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                  <span>⚖️</span>
                  <span>جدول مقایسه روش‌های مهاجرت به اروپا</span>
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  مقایسه شرایط کار، زبان، سرمایه و امکان اخذ پاسپورت در روش‌های مختلف
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-3 font-bold">روش مهاجرتی</th>
                      <th className="p-3 font-bold">نیاز به مدرک زبان</th>
                      <th className="p-3 font-bold">اجازه کار در اروپا</th>
                      <th className="p-3 font-bold">حداقل سرمایه</th>
                      <th className="p-3 font-bold">مدت زمان اخذ</th>
                      <th className="p-3 font-bold">اقامت دائم و پاسپورت</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="p-3 font-bold text-[#0b2933]">تمکن مالی (خودحمایتی)</td>
                      <td className="p-3 text-slate-600">A1 یا معافیت با لیسانس</td>
                      <td className="p-3 text-amber-700 font-bold">بدون اجازه کار استخدامی</td>
                      <td className="p-3 text-emerald-700 font-bold">۲۵ الی ۶۰ هزار یورو تمکن</td>
                      <td className="p-3 text-slate-600">۳ الی ۶ ماه</td>
                      <td className="p-3 font-bold text-slate-700">۵ سال (اقامت دائم)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#0b2933]">کارت آبی (Blue Card) / RWR</td>
                      <td className="p-3 text-slate-600">B1 یا B2 آلمانی / انگلیسی</td>
                      <td className="p-3 text-emerald-700 font-bold">اجازه کار کامل</td>
                      <td className="p-3 text-emerald-700 font-bold">قرارداد کاری و حداقل حقوق</td>
                      <td className="p-3 text-slate-600">۳ الی ۵ ماه</td>
                      <td className="p-3 font-bold text-slate-700">۲۱ تا ۳۶ ماه</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#0b2933]">گلدن ویزای سرمایه‌گذاری</td>
                      <td className="p-3 text-emerald-700 font-bold">بدون نیاز به زبان</td>
                      <td className="p-3 text-slate-600">امکان ثبت بیزینس</td>
                      <td className="p-3 text-amber-700 font-bold">۲۵۰ هزار یورو ملک</td>
                      <td className="p-3 text-slate-600">۲ الی ۳ ماه</td>
                      <td className="p-3 font-bold text-slate-700">تمدید ۵ ساله / دائم</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#0b2933]">مهاجرت تحصیلی</td>
                      <td className="p-3 text-slate-600">B2 آلمانی یا IELTS 6.5</td>
                      <td className="p-3 text-slate-600">پاره‌وقت (۲۰ ساعت در هفته)</td>
                      <td className="p-3 text-emerald-700 font-bold">۱۲ الی ۱۵ هزار یورو</td>
                      <td className="p-3 text-slate-600">۴ الی ۷ ماه</td>
                      <td className="p-3 font-bold text-slate-700">تبدیل به کار پس از فراغت</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* تب ۴: زمان‌بندی */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-[#082833] p-5 text-white">
                <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                  <span>⏱️</span>
                  <span>نقشه راه و زمان‌بندی ماهانه پرونده اقامتی</span>
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  فرآیند از امضای قرارداد تا استقرار کامل در اتریش با همراهی وکیل مقیم دیاکو
                </p>
              </div>

              <div className="relative border-r-2 border-[#f5a623] pr-6 space-y-7 mr-3">
                {[
                  {
                    step: 'گام اول: عقد قرارداد و گردآوری مدارک',
                    time: 'هفته اول تا سوم',
                    desc: 'بررسی صحت اسناد هویتی، مالی و شغلی در دفتر تهران دیاکو و آغاز فرآیند ترجمه رسمی.',
                  },
                  {
                    step: 'گام دوم: اخذ تاییدات کنسولی و معادل‌سازی',
                    time: 'ماه دوم',
                    desc: 'دریافت مهرهای دادگستری، وزارت خارجه و ارزیابی در سامانه‌های رسمی اتریش و آلمان (ZAB / Apostille).',
                  },
                  {
                    step: 'گام سوم: رزرو نوبت و تحویل پرونده',
                    time: 'ماه سوم',
                    desc: 'رزرو وقت سفارت یا مراجع رسمی ویزا با پرونده کامل و فرم‌های تایید شده توسط وکیل اتریش.',
                  },
                  {
                    step: 'گام چهارم: بررسی در اداره اقامت اتریش (MA35)',
                    time: 'ماه چهارم الی پنجم',
                    desc: 'پیگیری مستمر هفتگی توسط وکیل مقیم وین دیاکو تا صدور موافقت‌نامه رسمی اقامت.',
                  },
                  {
                    step: 'گام پنجم: ورود به اتریش و تحویل کارت فیزیکی',
                    time: 'ماه ششم',
                    desc: 'اخذ ویزای D، ورود به وین، ثبت آدرس رسمی (Meldezettel)، عقد بیمه درمانی و تحویل کارت اقامت.',
                  },
                ].map((s, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -right-[31px] top-0 grid h-6 w-6 place-items-center rounded-full bg-[#f5a623] text-[11px] font-black text-[#082833]">
                      {idx + 1}
                    </span>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-[#0b2933]">{s.step}</h4>
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-900">
                          {s.time}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-6 text-slate-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* تب ۵: راهنمای کشورها */}
          {activeTab === 'country-guide' && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-[#082833] p-5 text-white">
                <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                  <span>🗺️</span>
                  <span>راهنمای جامع کشورهای تحت پوشش هلدینگ دیاکو</span>
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  اطلاعات اقتصادی، کیفیت زندگی و روش‌های اقامتی در کشورهای حوزه فعالیت
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    country: 'اتریش (Austria)',
                    flag: '🇦🇹',
                    office: 'دفتر مستقیم دیاکو در وین',
                    income: 'رتبه ۱ کیفیت زندگی جهان',
                    paths: 'تمکن مالی، کارت قرمز-سفید-قرمز، تحصیلی دانشگاه وین',
                    tag: 'مقصد تخصصی اول',
                  },
                  {
                    country: 'آلمان (Germany)',
                    flag: '🇩🇪',
                    office: 'همکاری وکلای رسمی برلین و مونیخ',
                    income: 'قدرت اول صنعتی اروپا',
                    paths: 'بلوکارت، کارت شانس کاریابی، آوسبیلدونگ',
                    tag: 'برترین بازار کار',
                  },
                  {
                    country: 'یونان (Greece)',
                    flag: '🇬🇷',
                    office: 'دفتر رسمی دیاکو در گلیفادا (آتن)',
                    income: 'هزینه زندگی اقتصادی مدیترانه‌ای',
                    paths: 'گلدن ویزای ۲۵۰ هزار یورویی، تمکن مالی FIP',
                    tag: 'سریع‌ترین گلدن ویزا',
                  },
                  {
                    country: 'اسپانیا (Spain)',
                    flag: '🇪🇸',
                    office: 'وکلای همکار بارسلونا و مادرید',
                    income: 'آب‌وهوای آفتابی و معتدل',
                    paths: 'اقامت غیرانتفاعی (Non-Lucrative)، ویزای نومد',
                    tag: 'اقامت خانوادگی دلپذیر',
                  },
                  {
                    country: 'ایتالیا (Italy)',
                    flag: '🇮🇹',
                    office: 'پوشش پرونده‌های تحصیلی میلان و رم',
                    income: 'تحصیل کم‌هزینه و بورسیه',
                    paths: 'بورسیه استانی DSU، پذیرش دانشگاه‌های دولتی',
                    tag: 'بهترین بورسیه تحصیلی',
                  },
                ].map((c) => (
                  <div key={c.country} className="rounded-2xl border border-slate-200 bg-slate-50 p-4.5 hover:border-[#f5a623] transition">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{c.flag}</span>
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                        {c.tag}
                      </span>
                    </div>
                    <h4 className="mt-3 text-sm font-bold text-[#0b2933]">{c.country}</h4>
                    <p className="mt-1 text-[11px] font-semibold text-[#0e3846]">{c.office}</p>
                    <div className="mt-3 space-y-1.5 text-[11px] text-slate-600 border-t border-slate-200 pt-2">
                      <p><strong>شاخص:</strong> {c.income}</p>
                      <p><strong>مسیرهای محبوب:</strong> {c.paths}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* تب ۶: مشاغل مورد نیاز */}
          {activeTab === 'job-search' && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#082833] p-5 text-white">
                <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                  <span>💼</span>
                  <span>فهرست مشاغل دارای کمبود نیرو در اتریش (Mangelberufe)</span>
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  مشاغلی که در سال ۲۰۲۶ با حداقل امتیاز زبان و تسهیلات ویزای کاری مواجه هستند
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: 'مهندسان نرم‌افزار، هوش مصنوعی و IT', desc: 'معافیت از سقف کف حقوق سخت‌گیرانه با اولویت صدور سریع کارت قرمز-سفید-قرمز.' },
                  { title: 'پزشکان عمومی، متخصص و پرستاران', desc: 'امکان اخذ معادل‌سازی سریع (Approbation) و استخدام رسمی در مراکز درمانی اتریش و آلمان.' },
                  { title: 'مهندسان برق، مکانیک و عمران', desc: 'تقاضای بسیار بالا در کارخانجات و پروژه‌های زیرساختی اتریش (وین، لینز، گراتس).' },
                  { title: 'تکنسین‌های فنی و مکانیک خودرو', desc: 'امکان مهاجرت از طریق آوسبیلدونگ یا ویزای نیروی کار ماهر با سابقه فنی مستند.' },
                ].map((job, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0b2933] flex items-center gap-2">
                      <span className="text-emerald-600">✓</span>
                      <span>{job.title}</span>
                    </h4>
                    <p className="mt-1 text-[11px] leading-5 text-slate-600">{job.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* تب ۷: رزرو مشاوره */}
          {activeTab === 'online-consult' && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#082833] p-5 text-white">
                <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                  <span>📞</span>
                  <span>ارتباط مستقیم و تعیین وقت مشاوره تخصصی</span>
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  امکان تعیین وقت جلسه حضوری در دفتر تهران یا جلسه آنلاین با وکلای مقیم وین و آتن
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                  <span className="text-3xl">🏛️</span>
                  <h4 className="mt-2 text-sm font-bold text-[#0b2933]">دفتر مرکزی تهران</h4>
                  <p className="mt-1 text-xs text-slate-500">ولنجک، بلوار دانشجو، میدان یاسمن، نبش خیابان عدالت، پلاک ۱۴</p>
                  <a
                    href="tel:+982191693955"
                    className="mt-4 block w-full rounded-xl bg-[#082833] py-2.5 text-xs font-bold text-white hover:bg-[#0e3846]"
                  >
                    تماس: 02191693955
                  </a>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                  <span className="text-3xl">🇦🇹</span>
                  <h4 className="mt-2 text-sm font-bold text-[#0b2933]">دفتر  وین (اتریش)</h4>
                  <p className="mt-1 text-xs text-slate-500">Ausstellungsstraße 50, 1020 Wien</p>
                  <a
                    href="https://wa.me/436889763256"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full rounded-xl bg-[#059669] py-2.5 text-xs font-bold text-white hover:bg-[#047857]"
                  >
                    واتس‌اپ دفتر اتریش
                  </a>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                  <span className="text-3xl">🇬🇷</span>
                  <h4 className="mt-2 text-sm font-bold text-[#0b2933]">دفتر آتن (یونان)</h4>
                  <p className="mt-1 text-xs text-slate-500">Grigoriou Lampraki 58, Glyfada</p>
                  <a
                    href="https://wa.me/989197340829"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full rounded-xl bg-[#2563eb] py-2.5 text-xs font-bold text-white hover:bg-[#1d4ed8]"
                  >
                    واتس‌اپ پشتیبانی گلدن ویزا
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* تب ارزیابی هوشمند */}
          {activeTab === 'smart-assessment' && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-r from-[#082833] via-[#0d3b48] to-[#082833] p-6 text-white text-center">
                <span className="text-4xl">🧠</span>
                <h3 className="mt-2 text-lg sm:text-xl font-black text-white">
                  سامانه هوشمند ارزیابی شانس ویزا و اقامت اروپا
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  تحلیل چندمعیاره سن، میزان دارایی، مدرک تحصیلی، تسلط زبانی و ارائه بهترین مسیر اقامتی با بالاترین ضریب قبولی در کنسولگری‌های اروپا
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAssessment();
                  }}
                  className="mt-5 rounded-2xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-6 py-3 text-xs sm:text-sm font-black text-[#082833] shadow-glow transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  شروع ارزیابی آنلاین شانس ویزا ←
                </button>
              </div>
            </div>
          )}

          {/* تب نقشه تعاملی */}
          {activeTab === 'interactive-map' && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-[#082833] p-5 text-white">
                <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                  <span>🗺️</span>
                  <span>نقشه تعاملی پرونده‌های مهاجرتی و آماری اروپا</span>
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  مشاهده پراکندگی شعب حقوقی دیاکو در وین، آتن و پرونده‌های موفق کشورهای حوزه شینگن
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-sm font-bold text-slate-700">
                  نقشه کامل تعاملی در صفحه اصلی آماده کاوش است.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('interactive-map');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-4 rounded-xl bg-[#082833] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#0e3846] transition cursor-pointer"
                >
                  انتقال مستقیم به نقشه تعاملی روی صفحه
                </button>
              </div>
            </div>
          )}

          {/* تب مقایسه‌گر ویزا */}
          {activeTab === 'visa-comp' && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#082833] p-5 text-white">
                <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                  <span>📄</span>
                  <span>مقایسه‌گر انواع ویزاها و تایپ‌های اقامتی شینگن</span>
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  تفاوت‌های ماهوی ویزای شینگن تایپ C، ویزای ملی تایپ D و کارت‌های اقامتی موقت و دائم
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-3 font-bold">نوع مدرک / ویزا</th>
                      <th className="p-3 font-bold">مدت اعتبار قانونی</th>
                      <th className="p-3 font-bold">امکان اشتغال و کار</th>
                      <th className="p-3 font-bold">امکان تردد شینگن</th>
                      <th className="p-3 font-bold">قابلیت تمدید و اقامت دائم</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="p-3 font-bold text-[#0b2933]">ویزای شینگن تایپ C</td>
                      <td className="p-3 text-slate-600">حداکثر ۹۰ روز در دوره ۱۸۰ روزه</td>
                      <td className="p-3 text-rose-600 font-bold">ممنوع (فقط توریستی/تجاری)</td>
                      <td className="p-3 text-emerald-700 font-bold">کل حوزه ۲۹ کشور شینگن</td>
                      <td className="p-3 text-rose-600">غیرقابل تمدید در خاک اروپا</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#0b2933]">ویزای ملی تایپ D (ویزای ورود)</td>
                      <td className="p-3 text-slate-600">۳ الی ۶ ماه (جهت ورود و تحویل کارت)</td>
                      <td className="p-3 text-slate-600">بر اساس نوع هدف پرونده</td>
                      <td className="p-3 text-emerald-700 font-bold">دارد (همراه ترانزیت)</td>
                      <td className="p-3 text-emerald-700 font-bold">تبدیل به کارت اقامت ۱ ساله</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#0b2933]">کارت قرمز-سفید-قرمز (RWR)</td>
                      <td className="p-3 text-slate-600">۲۴ ماه در مرحله اول</td>
                      <td className="p-3 text-emerald-700 font-bold">مجاز و استخدامی تمام‌وقت</td>
                      <td className="p-3 text-emerald-700 font-bold">تردد آزاد در اروپا بدون ویزا</td>
                      <td className="p-3 text-emerald-700 font-bold">تبدیل به RWR Plus و اقامت دائم</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#0b2933]">کارت تمکن مالی (خودحمایتی)</td>
                      <td className="p-3 text-slate-600">۱ ساله، سپس ۲ ساله، سپس دائم</td>
                      <td className="p-3 text-amber-600 font-bold">سرمایه‌گذاری / درآمد غیرفعال</td>
                      <td className="p-3 text-emerald-700 font-bold">تردد آزاد در ۲۹ کشور اروپا</td>
                      <td className="p-3 text-emerald-700 font-bold">اقامت دائم پس از ۵ سال زندگی</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#0b2933]">بلو کارت اتحادیه اروپا</td>
                      <td className="p-3 text-slate-600">طول مدت قرارداد کاری + ۳ ماه</td>
                      <td className="p-3 text-emerald-700 font-bold">اشتغال تخصصی عالی رتبه</td>
                      <td className="p-3 text-emerald-700 font-bold">تردد آزاد در سراسر اتحادیه</td>
                      <td className="p-3 text-emerald-700 font-bold">اقامت دائم ظرف ۲۱ تا ۳۳ ماه</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* تب مقایسه‌گر تحصیل */}
          {activeTab === 'edu-comp' && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#082833] p-5 text-white">
                <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                  <span>🎓</span>
                  <span>مقایسه‌گر مهاجرت تحصیلی و دانشگاهی در اروپا</span>
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  شهریه دانشگاه‌های دولتی، مدرک زبان ورودی، هزینه‌های زندگی و اجازه کار دانشجویی
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    country: 'اتریش (دانشگاه وین و TU Wien)',
                    flag: '🇦🇹',
                    tuition: 'حدود ۷۵۰ یورو در هر ترم',
                    language: 'پذیرش مشروط با حداقل A2 آلمانی',
                    workHours: '۲۰ ساعت در هفته قانونی',
                    postStudy: '۱۲ ماه ویزای کاریابی پس از فارغ‌التحصیلی',
                    highlight: 'رتبه اول رفاه و امنیت دانشجویی',
                  },
                  {
                    country: 'آلمان (دانشگاه‌های دولتی)',
                    flag: '🇩🇪',
                    tuition: 'رایگان (فقط ۲۵۰ تا ۳۵۰ یورو سهم ترم)',
                    language: 'B2 یا C1 آلمانی یا IELTS انگلیسی',
                    workHours: '۱۴۰ روز تمام‌وقت یا ۲۸۰ نیمه‌وقت',
                    postStudy: '۱۸ ماه ویزای جستجوی کار فارغ‌التحصیلی',
                    highlight: 'بزرگترین بازار کار صنعتی اروپا',
                  },
                  {
                    country: 'ایتالیا (پلی‌تکنیک میلان و تورین)',
                    flag: '🇮🇹',
                    tuition: 'شهریه دولتی با بورسیه DSU رایگان',
                    language: 'انگلیسی (IELTS 6) یا ایتالیایی B2',
                    workHours: '۲۰ ساعت در هفته',
                    postStudy: '۱۲ ماه تمدید اقامت کاری',
                    highlight: 'بورسیه استانی تا ۸،۰۰۰ یورو سالانه',
                  },
                  {
                    country: 'اسپانیا (بارسلونا و مادرید)',
                    flag: '🇪🇸',
                    tuition: '۱،۵۰۰ تا ۳،۰۰۰ یورو سالانه',
                    language: 'اسپانیایی یا انگلیسی',
                    workHours: '۳۰ ساعت در هفته',
                    postStudy: 'امکان تبدیل به اقامت کاری',
                    highlight: 'هزینه مسکن و زندگی مقرون‌به‌صرفه',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-[#f5a623] transition flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{item.flag}</span>
                        <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                          {item.highlight}
                        </span>
                      </div>
                      <h4 className="mt-2 text-xs sm:text-sm font-bold text-[#0b2933]">{item.country}</h4>
                      <div className="mt-3 space-y-1.5 text-[11px] text-slate-600 border-t border-slate-200 pt-2">
                        <p><strong>شهریه:</strong> {item.tuition}</p>
                        <p><strong>زبان:</strong> {item.language}</p>
                        <p><strong>کار دانشجویی:</strong> {item.workHours}</p>
                        <p><strong>اقامت بعد از تحصیل:</strong> {item.postStudy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* تب ۸: قوانین و اخبار ۲۰۲۶ */}
          {(activeTab === 'rules-change' || activeTab === 'visa-news') && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#082833] p-5 text-white">
                <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                  <span>📰</span>
                  <span>آخرین اخبار، اصلاحیه‌ها و قوانین مهاجرتی ۲۰۲۶ اروپا</span>
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  خلاصه جدیدترین مصوبات پارلمان اتریش و آلمان در خصوص اقامت و ویزا
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    کارت قرمز-سفید-قرمز اتریش ۲۰۲۶
                  </span>
                  <h4 className="mt-2 text-xs sm:text-sm font-bold text-[#0b2933]">
                    تسهیل سوابق کاری و امتیاز زبان انگلیسی
                  </h4>
                  <p className="mt-1 text-xs leading-6 text-slate-600 text-justify">
                    طبق مصوبه جدید، برای مهندسان و متخصصان رشته‌های کلیدی، دارا بودن مدرک زبان انگلیسی معتبر (IELTS/TOEFL) به عنوان جایگزین کامل آلمانی در جدول امتیازات رسمی پذیرفته می‌شود.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                    سهمیه تمکن مالی اتریش (Quotenkontingent)
                  </span>
                  <h4 className="mt-2 text-xs sm:text-sm font-bold text-[#0b2933]">
                    ضرورت ثبت پرونده در اولین ساعات سال کاری
                  </h4>
                  <p className="mt-1 text-xs leading-6 text-slate-600 text-justify">
                    سهمیه ایالت‌های وین، نیدراسترایش و تیرول به سرعت تکمیل می‌شود. هلدینگ دیاکو پرونده‌ها را از ماه‌ها قبل آماده‌سازی نموده تا در نخستین روز بازگشایی ظرفیت، در صف اول رسیدگی قرار گیرند.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-800">
                    قانون جدید شانس‌کارت آلمان (Chancenkarte 2026)
                  </span>
                  <h4 className="mt-2 text-xs sm:text-sm font-bold text-[#0b2933]">
                    امکان جستجوی کار تا ۱۲ ماه با ۶ امتیاز قانونی
                  </h4>
                  <p className="mt-1 text-xs leading-6 text-slate-600 text-justify">
                    متقاضیان با مدرک دانشگاهی و زبان پایه می‌توانند مستقیماً ویزای ۱ ساله دریافت کنند و در حین جستجوی کار، تا ۲۰ ساعت در هفته کار پاره‌وقت داشته باشند.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* فوتر مدال */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span>شماره پشتیبانی:</span>
            <a href="tel:+982191693955" className="text-[#082833] hover:text-amber-600" dir="ltr">
              021 9169 3955
            </a>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 cursor-pointer"
            >
              بستن
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAssessment();
              }}
              className="rounded-xl bg-gradient-to-l from-[#fed871] via-[#f5a623] to-[#e58e0b] px-5 py-2 text-xs font-black text-[#082833] shadow-glow transition hover:scale-105 cursor-pointer"
            >
              ارزیابی رایگان شانس قبولی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetailModal;
