import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

interface GlobeVisaItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  aspect: 'portrait' | 'square';
  width: number;
  height: number;
  tags: string[];
}

const GLOBE_VISA_ITEMS: GlobeVisaItem[] = [
  {
    id: 'globe-01',
    src: '/assets/aistudio/IMG_02644542_copy_741ca90f.webp',
    title: 'تحویل ویزای شنگن و اقامت زوج متقاضی',
    subtitle: 'دفتر مرکزی هلدینگ مهاجرتی دیاکو',
    aspect: 'portrait',
    width: 578,
    height: 960,
    tags: ['ویزای شنگن', 'اقامت زوجین', 'پرونده موفق دیاکو', 'تحویل حضوری ویزا', 'مهاجرت اروپا'],
  },
  {
    id: 'globe-02',
    src: '/assets/aistudio/IMG_026248848_copy_f1e5c8a7.webp',
    title: 'اخذ ویزا و مجوز اقامت اروپایی زوجین',
    subtitle: 'پرونده موفق مهاجرتی · تیم حقوقی دیاکو',
    aspect: 'portrait',
    width: 578,
    height: 960,
    tags: ['اقامت اروپا', 'ویزای زوجین', 'تیم حقوقی دیاکو', 'اخذ مجوز اقامت', 'روادید اتحادیه اروپا'],
  },
  {
    id: 'globe-03',
    src: '/assets/aistudio/IMG_0262_5454copy_596d6434.webp',
    title: 'اخذ ویزای خانوادگی و الحاق کامل خانواده',
    subtitle: 'تحویل مدارک و ویزای والدین و فرزندان',
    aspect: 'portrait',
    width: 578,
    height: 960,
    tags: ['ویزای خانوادگی', 'الحاق خانواده', 'اقامت والدین و فرزندان', 'پرونده هم‌زمان', 'هلدینگ دیاکو'],
  },
  {
    id: 'globe-04',
    src: '/assets/aistudio/IMG_0264_copy_36ef8524.webp',
    title: 'دریافت هم‌زمان ویزای اقامت خانواده سه‌نفره',
    subtitle: 'همراهی کامل تا صدور روادید در سفارت',
    aspect: 'portrait',
    width: 578,
    height: 960,
    tags: ['ویزای اقامت خانواده', 'پرونده سه‌نفره', 'صدور هم‌زمان سفارت', 'اقامت اروپا', 'گالری ویزا'],
  },
  {
    id: 'globe-05',
    src: '/assets/aistudio/IMG_0282_co545py_96417805.webp',
    title: 'صدور و تحویل موفق ویزای زوجین در دیاکو',
    subtitle: 'پیگیری تخصصی پرونده اقامت اروپا',
    aspect: 'square',
    width: 960,
    height: 960,
    tags: ['تحویل ویزای زوجین', 'اقامت اروپا', 'پیگیری حقوقی', 'پرونده تاییدشده', 'دیاکو'],
  },
  {
    id: 'globe-06',
    src: '/assets/aistudio/IMG_0282_cop56y_30cb2ca8.webp',
    title: 'دریافت ویزاهای خانوادگی و دو نسلی',
    subtitle: 'تحویل هم‌زمان ویزای چهار عضو خانواده',
    aspect: 'square',
    width: 960,
    height: 960,
    tags: ['ویزای خانوادگی', 'ویزای دو نسلی', 'چهار عضو خانواده', 'الحاق خانواده اروپا', 'دیاکو'],
  },
  {
    id: 'globe-07',
    src: '/assets/aistudio/IMG_0282_co55py_c05e95ae.webp',
    title: 'تحویل ویزاهای صادره بانوان متقاضی اقامت',
    subtitle: 'تشریفات تحویل مدارک · هلدینگ دیاکو',
    aspect: 'square',
    width: 960,
    height: 960,
    tags: ['اقامت بانوان', 'ویزای صادره', 'تحویل مدارک سفارت', 'مهاجرت قانونی', 'هلدینگ دیاکو'],
  },
  {
    id: 'globe-08',
    src: '/assets/aistudio/IMG_0282_copy_581a7239.webp',
    title: 'تحویل هم‌زمان ویزای دو خانواده متقاضی',
    subtitle: 'پرونده‌های موفق مهاجرت به اروپا',
    aspect: 'square',
    width: 960,
    height: 960,
    tags: ['مهاجرت به اروپا', 'تحویل هم‌زمان ویزا', 'پرونده خانوادگی', 'نمونه ویزای موفق', 'دیاکو'],
  },
  {
    id: 'globe-09',
    src: '/assets/aistudio/IMG_0282_58445copy_80d5a401.webp',
    title: 'اخذ ویزای اقامت اروپا برای زوج متقاضی',
    subtitle: 'با نظارت مستقیم مشاوران ارشد دیاکو',
    aspect: 'square',
    width: 960,
    height: 960,
    tags: ['ویزای اقامت اروپا', 'اقامت زوجین', 'مشاوران ارشد دیاکو', 'روادید شنگن', 'سفارت'],
  },
  {
    id: 'globe-10',
    src: '/assets/aistudio/IMG_0282_c4opy_a58e292a.webp',
    title: 'دریافت موفق ویزای زوج جوان متقاضی',
    subtitle: 'سالن تشریفات تحویل ویزا · دیاکو',
    aspect: 'square',
    width: 960,
    height: 960,
    tags: ['ویزای زوج جوان', 'تشریفات تحویل ویزا', 'اقامت شنگن', 'مشاوره حقوقی مهاجرت', 'دیاکو'],
  },
  {
    id: 'globe-11',
    src: '/assets/aistudio/IMG_0282_84484copy_59e53abe.webp',
    title: 'اخذ اقامت و ویزای کامل خانواده چهارنفره',
    subtitle: 'ثبت رکورد صدور ویزای هم‌زمان خانواده',
    aspect: 'square',
    width: 960,
    height: 960,
    tags: ['اقامت خانواده چهارنفره', 'صدور ویزای هم‌زمان', 'اقامت اتحادیه اروپا', 'پرونده موفق', 'دیاکو'],
  },
  {
    id: 'globe-12',
    src: '/assets/aistudio/IMG_0282_446545copy_2ca630b1.webp',
    title: 'پرونده‌های موفق ویزای شنگن و اقامت',
    subtitle: 'هلدینگ بین‌المللی مهاجرتی دیاکو',
    aspect: 'square',
    width: 960,
    height: 960,
    tags: ['ویزای شنگن', 'اقامت اروپا', 'هلدینگ بین‌المللی دیاکو', 'تحویل پاسپورت ویزا', 'موفقیت پرونده'],
  },
  {
    id: 'globe-13',
    src: '/assets/aistudio/IMG_0282_c5545opy_b1fcecf8.webp',
    title: 'تحویل ویزای اقامت اروپا برای خانواده چهارنفره',
    subtitle: 'تضمین شفافیت مراحل قانونی تا دریافت ویزا',
    aspect: 'square',
    width: 960,
    height: 960,
    tags: ['اقامت خانواده چهارنفره', 'شفافیت حقوقی', 'ویزای اقامت اروپا', 'تحویل روادید', 'دیاکو'],
  },
  {
    id: 'globe-14',
    src: '/assets/aistudio/IMG_0282_c544_6914a635.webp',
    title: 'تحویل پاسپورت و ویزای صادره زوج متقاضی',
    subtitle: 'پرونده تاییدشده اقامت در اتحادیه اروپا',
    aspect: 'square',
    width: 960,
    height: 960,
    tags: ['پاسپورت ویزاشده', 'اقامت اتحادیه اروپا', 'تحویل ویزای زوجین', 'پرونده تاییدشده', 'دیاکو'],
  },
  {
    id: 'globe-15',
    src: '/assets/aistudio/IMG_0282_c4554opy_7fefebf0.webp',
    title: 'اخذ ویزای اقامت تمکن مالی و شنگن زوجین',
    subtitle: 'ارزیابی تخصصی و دفاعیه حقوقی پرونده',
    aspect: 'square',
    width: 960,
    height: 960,
    tags: ['ویزای تمکن مالی', 'شنگن زوجین', 'دفاعیه حقوقی پرونده', 'اقامت اروپا', 'دیاکو'],
  },
  {
    id: 'globe-16',
    src: '/assets/aistudio/IMG_0282_c54opy_fcd945ea.webp',
    title: 'دریافت موفق روادید و ویزای اروپایی',
    subtitle: 'تحویل حضوری در دفتر مرکزی دیاکو',
    aspect: 'square',
    width: 960,
    height: 960,
    tags: ['روادید اروپایی', 'ویزای شنگن و اقامت', 'دفتر مرکزی دیاکو', 'تحویل حضوری', 'پرونده موفق'],
  },
];

interface SpherePoint {
  x: number;
  y: number;
  z: number;
}

function buildFibonacciSphere(count: number): SpherePoint[] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const points: SpherePoint[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push({ x, y, z });
  }
  return points;
}

export const VisaGlobeSection: React.FC = () => {
  const [rotation, setRotation] = useState<{ rx: number; ry: number }>({ rx: 0.14, ry: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [stageWidth, setStageWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    moved: boolean;
    velX: number;
    velY: number;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    moved: false,
    velX: 0,
    velY: 0,
  });

  const basePoints = useMemo(() => buildFibonacciSphere(GLOBE_VISA_ITEMS.length), []);

  const galleryJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'کره چرخان ویزاهای صادره دیاکو',
      description: 'مجموعه تصاویر واقعی تحویل ویزاهای شنگن و اقامت اروپا در هلدینگ مهاجرتی دیاکو',
      numberOfItems: GLOBE_VISA_ITEMS.length,
      associatedMedia: GLOBE_VISA_ITEMS.map((item) => ({
        '@type': 'ImageObject',
        name: item.title,
        caption: `${item.title} — ${item.subtitle}`,
        contentUrl: item.src,
        encodingFormat: 'image/webp',
        width: item.width,
        height: item.height,
        keywords: item.tags.join(', '),
      })),
    }),
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (stageRef.current) {
        setStageWidth(stageRef.current.clientWidth);
      } else if (typeof window !== 'undefined') {
        setStageWidth(window.innerWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const d = dragState.current;
      const shouldAutoSpin =
        !prefersReducedMotion && hoveredId === null && !d.active && selectedIndex === null;

      if (d.active) {
        // Controlled directly by pointer move
      } else if (Math.abs(d.velX) > 0.0002 || Math.abs(d.velY) > 0.0002) {
        setRotation((prev) => ({
          rx: Math.max(-0.85, Math.min(0.85, prev.rx + d.velY)),
          ry: prev.ry + d.velX,
        }));
        d.velX *= 0.92;
        d.velY *= 0.92;
      } else if (shouldAutoSpin) {
        setRotation((prev) => ({
          rx: 0.14 * Math.cos(now * 0.00035),
          ry: prev.ry + dt * 0.24,
        }));
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [hoveredId, selectedIndex, prefersReducedMotion]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % GLOBE_VISA_ITEMS.length
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev - 1 + GLOBE_VISA_ITEMS.length) % GLOBE_VISA_ITEMS.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragState.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      moved: false,
      velX: 0,
      velY: 0,
    };
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragState.current;
    if (!d.active) return;

    const dx = e.clientX - d.lastX;
    const dy = e.clientY - d.lastY;
    if (Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 6) {
      d.moved = true;
    }

    const ryDelta = dx * 0.0065;
    const rxDelta = -dy * 0.0055;
    d.velX = ryDelta;
    d.velY = rxDelta;
    d.lastX = e.clientX;
    d.lastY = e.clientY;

    setRotation((prev) => ({
      rx: Math.max(-0.85, Math.min(0.85, prev.rx + rxDelta)),
      ry: prev.ry + ryDelta,
    }));
  }, []);

  const handlePointerUp = useCallback(() => {
    dragState.current.active = false;
    setIsDragging(false);
  }, []);

  // Radius scales smoothly with viewport width while preserving clean breathing room for hover magnification
  const radiusX = useMemo(() => {
    if (stageWidth < 520) return 132;
    if (stageWidth < 768) return 188;
    if (stageWidth < 1024) return 245;
    return 295;
  }, [stageWidth]);

  const radiusY = useMemo(() => {
    if (stageWidth < 520) return 126;
    if (stageWidth < 768) return 165;
    if (stageWidth < 1024) return 195;
    return 220;
  }, [stageWidth]);

  const cosY = Math.cos(rotation.ry);
  const sinY = Math.sin(rotation.ry);
  const cosX = Math.cos(rotation.rx);
  const sinX = Math.sin(rotation.rx);

  const projectedItems = GLOBE_VISA_ITEMS.map((item, idx) => {
    const p = basePoints[idx];
    const x1 = p.x * cosY - p.z * sinY;
    const z1 = p.x * sinY + p.z * cosY;
    const y2 = p.y * cosX - z1 * sinX;
    const z2 = p.y * sinX + z1 * cosX;

    const depth = (z2 + 1) / 2;
    const screenX = x1 * radiusX;
    const screenY = y2 * radiusY;
    const depthScale = 0.56 + depth * 0.58;
    const depthOpacity = 0.28 + depth * 0.72;

    return {
      item,
      idx,
      screenX,
      screenY,
      depth,
      depthScale,
      depthOpacity,
    };
  });

  const activeModalItem = selectedIndex !== null ? GLOBE_VISA_ITEMS[selectedIndex] : null;

  return (
    <section
      id="visa-sphere-showcase"
      aria-labelledby="visa-sphere-heading"
      dir="rtl"
      className="relative overflow-hidden bg-gradient-to-b from-[#061a21] via-[#07212b] to-[#07242e] py-16 sm:py-22 text-slate-200 border-t border-white/10"
    >
      <script type="application/ld+json">{JSON.stringify(galleryJsonLd)}</script>

      {/* Subtle architectural glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[540px] w-[540px] sm:h-[680px] sm:w-[680px] rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.12)_0%,rgba(14,116,144,0.12)_42%,transparent_72%)]"
      />

      <div className="relative container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="visa-sphere-heading"
            className="mt-3 text-2xl sm:text-4xl md:text-5xl font-black leading-tight text-white"
          >
            کره چرخان ویزاهای صادره دیاکو
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-l from-[#fed871] to-[#f5a623]" />
        </div>

        {/* Interactive 3D Sphere Stage */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={() => {
            handlePointerUp();
            setHoveredId(null);
          }}
          className={`relative mx-auto mt-8 sm:mt-10 h-[430px] sm:h-[520px] md:h-[580px] max-w-5xl select-none touch-pan-y ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* Decorative orbital rings representing the 3D sphere frame */}
          <svg
            aria-hidden="true"
            viewBox="0 0 600 600"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[330px] w-[330px] sm:h-[460px] sm:w-[460px] md:h-[540px] md:w-[540px] opacity-45"
          >
            <circle
              cx="300"
              cy="300"
              r="270"
              fill="none"
              stroke="rgba(245, 166, 35, 0.24)"
              strokeWidth="1"
              strokeDasharray="5 7"
            />
            <ellipse
              cx="300"
              cy="300"
              rx="270"
              ry="104"
              fill="none"
              stroke="rgba(56, 189, 248, 0.2)"
              strokeWidth="1"
            />
            <ellipse
              cx="300"
              cy="300"
              rx="108"
              ry="270"
              fill="none"
              stroke="rgba(56, 189, 248, 0.18)"
              strokeWidth="1"
            />
            <ellipse
              cx="300"
              cy="300"
              rx="235"
              ry="190"
              transform="rotate(-24 300 300)"
              fill="none"
              stroke="rgba(245, 166, 35, 0.14)"
              strokeWidth="1"
            />
          </svg>

          {/* Subtle Diaco Core Emblem at center of sphere */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full border border-amber-400/20 bg-[#082833]/75 text-center shadow-[0_0_50px_rgba(245,166,35,0.16)] backdrop-blur-md"
          >
            <span className="text-[11px] font-black tracking-wider text-amber-300">DIACO</span>
            <span className="mt-0.5 text-[10px] font-bold text-slate-300">۱۶ پرونده</span>
          </div>

          {/* Floating Visa Photos */}
          {projectedItems.map(({ item, idx, screenX, screenY, depth, depthScale, depthOpacity }) => {
            const isHovered = hoveredId === item.id;
            const hoverScale = stageWidth < 640 ? 1.72 : 2.15;
            const effectiveScale = isHovered ? hoverScale : depthScale;
            const zIndex = isHovered ? 900 : Math.round(depth * 200) + 10;
            const isPortrait = item.aspect === 'portrait';

            return (
              <div
                key={item.id}
                itemScope
                itemType="https://schema.org/ImageObject"
                style={{
                  transform: `translate3d(calc(-50% + ${screenX.toFixed(1)}px), calc(-50% + ${screenY.toFixed(1)}px), 0) scale(${effectiveScale.toFixed(3)})`,
                  opacity: isHovered ? 1 : hoveredId ? Math.max(0.18, depthOpacity * 0.55) : depthOpacity,
                  zIndex,
                }}
                className="absolute left-1/2 top-1/2 will-change-transform transition-[opacity,filter] duration-200"
              >
                <meta itemProp="name" content={item.title} />
                <meta itemProp="caption" content={`${item.title} — ${item.subtitle}`} />
                <meta itemProp="encodingFormat" content="image/webp" />
                <meta itemProp="keywords" content={item.tags.join(', ')} />
                <button
                  type="button"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId((prev) => (prev === item.id ? null : prev))}
                  onFocus={() => setHoveredId(item.id)}
                  onBlur={() => setHoveredId((prev) => (prev === item.id ? null : prev))}
                  onClick={() => {
                    if (!dragState.current.moved) {
                      setSelectedIndex(idx);
                    }
                  }}
                  aria-label={`${item.title} — بزرگنمایی تصویر`}
                  className={`group relative block overflow-hidden rounded-xl border bg-[#08222b] text-right shadow-2xl transition-colors duration-200 focus:outline-none cursor-pointer ${
                    isPortrait
                      ? 'w-[74px] h-[112px] sm:w-[92px] sm:h-[138px]'
                      : 'w-[86px] h-[86px] sm:w-[106px] sm:h-[106px]'
                  } ${
                    isHovered
                      ? 'border-[#f5a623] ring-2 ring-[#f5a623]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
                      : 'border-white/25 hover:border-amber-300/80'
                  }`}
                >
                  {failedImages[item.id] ? (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[#0b2933] p-2 text-center">
                      <span className="text-[10px] font-bold text-amber-300">دیاکو</span>
                      <span className="mt-1 text-[8px] text-slate-300 line-clamp-2">{item.title}</span>
                    </div>
                  ) : (
                    <img
                      itemProp="contentUrl"
                      src={item.src}
                      alt={`${item.title} — ${item.subtitle} (${item.tags.slice(0, 3).join('، ')})`}
                      title={`${item.title} | ${item.tags.join(' · ')}`}
                      width={item.width}
                      height={item.height}
                      data-tags={item.tags.join(', ')}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImages((prev) => ({ ...prev, [item.id]: true }))}
                      className="h-full w-full object-cover object-top select-none"
                    />
                  )}

                  {/* Crisp scrim caption shown cleanly when enlarged on hover/focus */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-1.5 transition-opacity duration-200 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <p className="text-[7px] sm:text-[8px] font-bold leading-tight text-white line-clamp-2">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[6px] sm:text-[7px] font-medium text-amber-300">
                      کلیک برای بزرگنمایی کامل
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-size Lightbox Modal on Click */}
      {activeModalItem && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalItem.title}
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#08222b] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <div>
                <h3 className="text-sm sm:text-base font-black text-white">
                  {activeModalItem.title}
                </h3>
                <p className="text-[11px] text-amber-300 mt-0.5">
                  {activeModalItem.subtitle} · تصویر {selectedIndex + 1} از {GLOBE_VISA_ITEMS.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="بستن پیش‌نمایش"
                className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-200 transition hover:bg-white/15 hover:text-white cursor-pointer"
              >
                بستن ✕
              </button>
            </div>

            <div className="relative flex flex-col items-center justify-center bg-[#04141a] p-3 sm:p-5">
              <img
                src={activeModalItem.src}
                alt={`${activeModalItem.title} — ${activeModalItem.subtitle}`}
                title={`${activeModalItem.title} | ${activeModalItem.tags.join(' · ')}`}
                width={activeModalItem.width}
                height={activeModalItem.height}
                data-tags={activeModalItem.tags.join(', ')}
                decoding="async"
                referrerPolicy="no-referrer"
                className="max-h-[66vh] w-auto rounded-2xl object-contain shadow-xl"
              />
              <p className="mt-3 text-center text-[11px] text-slate-400">
                <span className="font-semibold text-amber-300/90">تگ‌های تصویر: </span>
                {activeModalItem.tags.join(' · ')}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 bg-[#071f27]">
              <button
                type="button"
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex - 1 + GLOBE_VISA_ITEMS.length) % GLOBE_VISA_ITEMS.length
                  )
                }
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white transition hover:border-[#f5a623] hover:bg-[#f5a623] hover:text-[#082833] cursor-pointer"
              >
                → تصویر قبلی
              </button>
              <span className="text-xs font-bold text-slate-300 tabular-nums">
                {selectedIndex + 1} / {GLOBE_VISA_ITEMS.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setSelectedIndex((selectedIndex + 1) % GLOBE_VISA_ITEMS.length)
                }
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white transition hover:border-[#f5a623] hover:bg-[#f5a623] hover:text-[#082833] cursor-pointer"
              >
                تصویر بعدی ←
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VisaGlobeSection;
