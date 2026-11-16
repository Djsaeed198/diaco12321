import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  Copy,
  Sparkles,
  ShieldCheck,
  Scale,
  ExternalLink,
  ChevronDown,
  HelpCircle,
  FileCheck2,
  AlertCircle,
  PhoneCall,
  UserCheck,
  Tag,
  BookOpen,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';
import { BLOG_POSTS, type BlogPost } from '../ImmigrationBlogSection';
import type { PageType } from '../Header';

interface Props {
  slug: string;
  onBackToHome: () => void;
  onBackToBlog?: () => void;
  onOpenAssessment: () => void;
  onNavigateToPost?: (slug: string) => void;
  onNavigateToPage?: (page: PageType) => void;
}

export const BlogPostPage: React.FC<Props> = ({
  slug,
  onBackToHome,
  onBackToBlog,
  onOpenAssessment,
  onNavigateToPost,
  onNavigateToPage,
}) => {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [readingProgress, setReadingProgress] = useState(0);

  // محاسبه داینامیک درصد مطالعه همگام با اسکرول کاربر
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const currentScroll = window.scrollY;
        const progress = Math.min(100, Math.max(0, (currentScroll / scrollHeight) * 100));
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // یافتن مقاله بر اساس slug
  const post = useMemo<BlogPost | undefined>(() => {
    return (
      BLOG_POSTS.find((p) => p.slug === slug || p.id === slug) ||
      BLOG_POSTS[0] // fallback
    );
  }, [slug]);

  // استخراج پویا و هوشمند ۳ مقاله مرتبط بر اساس دسته‌بندی مقاله فعلی، برچسب‌ها و لینک‌سازی داخلی
  const relatedPosts = useMemo<BlogPost[]>(() => {
    if (!post) return [];

    // ۱. مقالات مرتبط با اولویت هم‌دسته‌بندی (به‌جز مقاله در حال مشاهده)
    const sameCategory = BLOG_POSTS.filter(
      (p) => (p.slug !== post.slug && p.id !== post.id) && p.category === post.category
    );

    // ۲. مقالات با برچسب‌های مشترک
    const sharedTags = BLOG_POSTS.filter(
      (p) =>
        p.slug !== post.slug &&
        p.id !== post.id &&
        p.category !== post.category &&
        p.tags.some((t) => post.tags.includes(t))
    );

    // ۳. سایر مقالات پرطرفدار و آموزنده دیاکو
    const others = BLOG_POSTS.filter(
      (p) =>
        p.slug !== post.slug &&
        p.id !== post.id &&
        p.category !== post.category &&
        !p.tags.some((t) => post.tags.includes(t))
    ).sort((a, b) => b.views - a.views);

    // ادغام با اولویت دسته‌بندی و حذف تکراری‌ها
    const combined = [...sameCategory, ...sharedTags, ...others];
    const uniqueMap = new Map<string, BlogPost>();
    combined.forEach((item) => {
      if (!uniqueMap.has(item.slug)) {
        uniqueMap.set(item.slug, item);
      }
    });

    return Array.from(uniqueMap.values()).slice(0, 3);
  }, [post]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // داده‌های ساختاریافته Schema.org برای سئو و AIO/GEO
  const structuredData = useMemo(() => {
    if (!post) return {};
    const pageUrl = `https://www.dia-co.ir/blog/${post.slug}`;

    const graph: Record<string, any>[] = [
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#article`,
        isPartOf: {
          '@type': 'WebPage',
          '@id': pageUrl,
          url: pageUrl,
          name: post.seoTitle || post.title,
        },
        headline: post.title,
        description: post.seoDescription || post.excerpt || post.answerFirst,
        image: {
          '@type': 'ImageObject',
          url: post.image.src,
          width: post.image.width,
          height: post.image.height,
        },
        datePublished: post.dateModified || '2026-01-01',
        dateModified: post.dateModified || new Date().toISOString().split('T')[0],
        inLanguage: 'fa-IR',
        mainEntityOfPage: pageUrl,
        author:
          post.author.name.includes('دپارتمان') || post.author.name.includes('کارگروه') || post.author.name.includes('دیاکو')
            ? {
                '@type': 'Organization',
                name: post.author.name,
                url: post.author.profileUrl || 'https://www.dia-co.ir/about-us',
              }
            : {
                '@type': 'Person',
                name: post.author.name,
                jobTitle: `${post.author.role} — ${post.author.credentials}`,
                url: post.author.profileUrl || 'https://www.dia-co.ir/about-us',
                worksFor: {
                  '@type': 'Organization',
                  '@id': 'https://www.dia-co.ir/#organization',
                  name: 'هلدینگ مهاجرتی دیاکو',
                },
              },
        ...(post.reviewer
          ? {
              reviewedBy:
                post.reviewer.name.includes('دپارتمان') || post.reviewer.name.includes('کارگروه') || post.reviewer.name.includes('هیئت')
                  ? {
                      '@type': 'Organization',
                      name: post.reviewer.name,
                      url: 'https://www.dia-co.ir/about-us',
                    }
                  : {
                      '@type': 'Person',
                      name: post.reviewer.name,
                      jobTitle: post.reviewer.office || 'وکیل و بازبین حقوقی',
                      worksFor: {
                        '@type': 'Organization',
                        '@id': 'https://www.dia-co.ir/#organization',
                        name: 'هلدینگ مهاجرتی دیاکو',
                      },
                    },
            }
          : {}),
        publisher: {
          '@type': 'Organization',
          '@id': 'https://www.dia-co.ir/#organization',
          name: 'هلدینگ مهاجرتی دیاکو',
          url: 'https://www.dia-co.ir/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.dia-co.ir/logo.png',
          },
        },
        citation: (post.officialSources && post.officialSources.length > 0
          ? post.officialSources
          : [post.officialSource]
        ).map((s) => s.url),
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.speakable-aio-answer', '#article-faq-container'],
        },
        keywords: post.tags.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'صفحه اصلی',
            item: 'https://www.dia-co.ir/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'اخبار و مقالات مهاجرتی',
            item: 'https://www.dia-co.ir/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.categoryLabel,
            item: 'https://www.dia-co.ir/blog',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: post.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: (post.fullArticle.faq || []).map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ];

    if (post.fullArticle.howToSteps && post.fullArticle.howToSteps.length > 0) {
      graph.push({
        '@type': 'HowTo',
        '@id': `${pageUrl}#howto`,
        name: post.title,
        description: post.answerFirst,
        step: post.fullArticle.howToSteps.map((s, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: s.name,
          text: s.text,
        })),
      });
    }

    return {
      '@context': 'https://schema.org',
      '@graph': graph,
    };
  }, [post]);

  useSeo({
    title: post ? post.seoTitle || `${post.title} | وبلاگ حقوقی دیاکو` : 'وبلاگ تخصصی مهاجرت | دیاکو',
    description: post
      ? (post.seoDescription || post.excerpt || post.answerFirst).slice(0, 175)
      : 'مقالات و اخبار مهاجرتی اروپا.',
    keywords: post ? post.tags : ['مهاجرت', 'اتریش', 'اروپا'],
    canonical: post ? `https://www.dia-co.ir/blog/${post.slug}` : 'https://www.dia-co.ir/',
    ogImage: post ? post.image.src : 'https://www.dia-co.ir/og-cover.jpg',
    ogType: 'article',
    jsonLd: structuredData,
  });

  if (!post) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#061a21] text-white p-8" dir="rtl">
        <div className="max-w-md text-center space-y-4">
          <div className="text-6xl">📖</div>
          <h2 className="text-xl font-black">مقاله مورد نظر یافت نشد</h2>
          <p className="text-xs text-slate-300">ممکن است آدرس مقاله تغییر کرده یا به بخش دیگری منتقل شده باشد.</p>
          <button
            type="button"
            onClick={onBackToHome}
            className="rounded-xl bg-amber-400 text-slate-900 font-black px-5 py-2.5 text-xs transition hover:scale-105 cursor-pointer"
          >
            بازگشت به پرتال اصلی
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#061a21] text-slate-200 selection:bg-amber-400 selection:text-slate-900 relative" dir="rtl">
      {/* ============================================================
          نوار باریک و ظریف پیشرفت مطالعه در بالاترین لایه (Reading Progress Bar)
         ============================================================ */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-900/60 backdrop-blur-xs pointer-events-none"
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="میزان پیشرفت مطالعه مقاله"
      >
        <div
          className="h-full bg-gradient-to-l from-amber-400 via-[#f5a623] to-sky-400 shadow-[0_0_10px_rgba(245,166,35,0.7)] transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* ============================================================
          نوار ناوبری بالا و بردکرامب (Breadcrumb) همراه با ردگیری اسکرول
         ============================================================ */}
      <div className="border-b border-white/10 bg-[#07242e]/95 backdrop-blur-md sticky top-16 z-30 shadow-md">
        {/* خط پیشرفت هماهنگ روی نوار چسبان */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 pointer-events-none overflow-hidden">
          <div
            className="h-full bg-gradient-to-l from-amber-400 to-[#f5a623] transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
            <button
              type="button"
              onClick={onBackToHome}
              className="text-slate-400 hover:text-white font-semibold transition shrink-0 cursor-pointer flex items-center gap-1"
            >
              <span>صفحه اصلی</span>
            </button>
            <span className="text-slate-600">/</span>
            <button
              type="button"
              onClick={() => {
                if (onBackToBlog) onBackToBlog();
                else onBackToHome();
              }}
              className="text-slate-400 hover:text-white font-semibold transition shrink-0 cursor-pointer"
            >
              اخبار و وبلاگ
            </button>
            <span className="text-slate-600">/</span>
            <span className="rounded bg-white/10 px-2 py-0.5 text-amber-300 font-bold shrink-0">
              {post.categoryLabel}
            </span>

            {/* درصد مطالعه در نمایشگرهای متوسط و بزرگ */}
            <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md mr-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5a623] animate-pulse" />
              <span>{Math.round(readingProgress)}٪ مطالعه شد</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-300">لینک کپی شد</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>اشتراک‌گذاری</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenAssessment}
              className="rounded-xl bg-gradient-to-l from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 px-3.5 py-1.5 text-xs font-black shadow-glow transition hover:scale-105 cursor-pointer"
            >
              ارزیابی شانس ویزا ←
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          هدر مقاله و اطلاعات E-E-A-T
         ============================================================ */}
      <header className="relative pt-10 pb-12 overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/2 left-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="container mx-auto px-4 md:px-8 max-w-4xl relative">
          {/* برچسب‌های اطلاعاتی */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4 text-xs font-semibold">
            <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-3 py-1 text-amber-300 font-bold">
              {post.categoryLabel}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              <span>زمان مطالعه: {post.readTime}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Eye className="h-3.5 w-3.5" />
              <span>{post.views.toLocaleString('fa-IR')} بازدید</span>
            </span>
          </div>

          {/* عنوان اصلی مقاله */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* اطلاعات نویسنده، بازبین تخصصی و منابع مرجع قانونی (E-E-A-T) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#082833] border border-amber-400/30 text-2xl shadow-inner">
                {post.author.avatar}
              </span>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-white text-sm">{post.author.name}</span>
                  <span className="rounded bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 font-bold border border-emerald-500/30">
                    تاییدشده E-E-A-T
                  </span>
                  {post.author.profileUrl && (
                    <a
                      href={post.author.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-cyan-400 hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>پروفایل رسمی</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-300">{post.author.credentials} • {post.author.office}</p>
                {post.reviewer && (
                  <p className="text-[11px] text-amber-300/90 flex flex-wrap items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>بازبینی تخصصی: {post.reviewer.name}</span>
                    {post.reviewer.address && (
                      <span className="text-slate-400 font-mono text-[10px]" dir="ltr">
                        ({post.reviewer.address})
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>

            {post.legalReference && (
              <div className="text-left sm:text-right text-[11px] font-mono text-amber-300/90 border-t sm:border-t-0 sm:border-r border-white/10 pt-2 sm:pt-0 sm:pr-4 space-y-1">
                <span className="text-slate-400 block font-sans text-[10px]">مستند رسمی قانون و آخرین به‌روزرسانی ({post.date}):</span>
                <span dir="ltr" className="block">{post.legalReference}</span>
                <div className="flex flex-wrap gap-2 font-sans text-[10px] pt-0.5">
                  {(post.officialSources && post.officialSources.length > 0
                    ? post.officialSources
                    : post.officialSource
                    ? [post.officialSource]
                    : []
                  ).map((src) => (
                    <a
                      key={src.url}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/20"
                    >
                      <span>{src.label}</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/5 px-4 py-2.5 text-[11px] text-slate-300 flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong className="text-emerald-300">روش‌شناسی راستی‌آزمایی YMYL:</strong> تمامی ارقام مهاجرتی و حقوقی این مقاله مستقیماً با پرتال‌های رسمی دولتی اتحادیه اروپا، اتریش، آلمان و اسپانیا مطابقت داده شده و توسط تیم حقوقی دیاکو بازبینی شده است.
            </span>
            <span className="text-slate-400 font-mono" dir="ltr">
              Reviewed: {post.dateModified || '2026-11-16'}
            </span>
          </div>
        </div>
      </header>

      {/* ============================================================
          بدنه اصلی مقاله + پاسخ صریح AIO و ساختار GEO
         ============================================================ */}
      <main className="py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-8">
          {/* تصویر شاخص */}
          <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative">
            <img
              src={post.image.src}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              className="w-full h-72 sm:h-96 md:h-[420px] object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 right-4 left-4 text-xs text-slate-300 font-medium">
              <span>عکس: {post.image.alt}</span>
            </div>
          </div>

          {/* کادر برجسته پاسخ سریع هوش مصنوعی (BLUF / AIO Core Answer Box) */}
          <section className="speakable-aio-answer rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-500/15 via-[#07242e] to-black/60 p-6 md:p-8 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2.5 text-amber-300 font-black text-sm sm:text-base mb-3">
              <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
              <span>خلاصه اجرایی و پاسخ سریع (BLUF / AI Overview)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
              {post.answerFirst}
            </p>
          </section>

          {/* فهرست مطالب با لینک‌های پرشی استاندارد (Table of Contents) */}
          {post.fullArticle.sections && post.fullArticle.sections.length > 0 && (
            <nav
              aria-label="فهرست مطالب مقاله"
              className="rounded-2xl border border-white/15 bg-white/[0.03] p-5 sm:p-6 space-y-3"
            >
              <div className="flex items-center gap-2 text-sm font-black text-amber-300">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span>فهرست مطالب مقاله (دسترسی سریع به بخش‌ها)</span>
              </div>
              <ol className="grid sm:grid-cols-2 gap-2 text-xs text-slate-200 list-decimal list-inside">
                {post.fullArticle.sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="hover:text-amber-300 hover:underline transition-colors font-medium"
                    >
                      {sec.title}
                    </a>
                  </li>
                ))}
                {post.fullArticle.faq && post.fullArticle.faq.length > 0 && (
                  <li>
                    <a
                      href="#article-faq-container"
                      className="hover:text-amber-300 hover:underline transition-colors font-medium"
                    >
                      سوالات متداول (FAQ)
                    </a>
                  </li>
                )}
              </ol>
            </nav>
          )}

          {/* رندر ساختاریافته بخش‌های جامع (در صورت وجود) یا نمای استاندارد */}
          {post.fullArticle.sections && post.fullArticle.sections.length > 0 ? (
            <div className="space-y-8">
              {post.fullArticle.sections.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-32 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8 space-y-5"
                >
                  <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{sec.title}</span>
                  </h2>

                  {sec.bluf && (
                    <p className="rounded-xl border border-cyan-400/25 bg-cyan-500/10 p-3.5 text-xs sm:text-sm text-cyan-100 leading-7 font-medium">
                      {sec.bluf}
                    </p>
                  )}

                  {sec.paragraphs &&
                    sec.paragraphs.map((p, idx) => (
                      <p key={idx} className="text-xs sm:text-sm text-slate-200 leading-7 text-justify">
                        {p}
                      </p>
                    ))}

                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-3">
                      {sec.bullets.map((b, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/5 p-3.5 text-xs sm:text-sm leading-7 text-slate-200"
                        >
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs mt-0.5">
                            ✓
                          </span>
                          <div>
                            {b.title && <strong className="text-amber-300 font-black">{b.title}: </strong>}
                            <span>{b.text}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.table && (
                    <div className="overflow-x-auto rounded-2xl border border-white/15 bg-black/40">
                      <table className="w-full text-right text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-amber-400/15 text-amber-300 border-b border-white/15">
                            {sec.table.headers.map((h, i) => (
                              <th key={i} className="p-3.5 font-black whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {sec.table.rows.map((row, rIdx) => {
                            const isTotal = rIdx === sec.table!.rows.length - 1 && row[0].includes('مجموع');
                            return (
                              <tr
                                key={rIdx}
                                className={
                                  isTotal
                                    ? 'bg-emerald-500/15 text-emerald-200 font-black'
                                    : 'hover:bg-white/[0.03] text-slate-200'
                                }
                              >
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`p-3.5 leading-6 ${
                                      cIdx === 0 ? 'font-bold text-white' : ''
                                    } ${cIdx === row.length - 1 ? 'font-black text-amber-300 whitespace-nowrap' : ''}`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {sec.steps && sec.steps.length > 0 && (
                    <div className="space-y-3">
                      {sec.steps.map((st) => (
                        <div
                          key={st.step}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4"
                        >
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-400 text-[#082833] font-black text-xs">
                            {st.step}
                          </span>
                          <div className="space-y-1">
                            <h3 className="text-xs sm:text-sm font-black text-white">{st.title}</h3>
                            <p className="text-xs text-slate-300 leading-6 text-justify">{st.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.callout && (
                    <div className="rounded-2xl border border-amber-400/50 bg-amber-400/10 p-5 space-y-2">
                      <div className="flex items-center gap-2 text-amber-300 font-black text-xs sm:text-sm">
                        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                        <span>{sec.callout.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-amber-50 leading-7 text-justify">
                        {sec.callout.text}
                      </p>
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <>
              {/* متن مقدمه تحلیلی */}
              <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 leading-7 text-xs sm:text-sm text-slate-200 text-justify">
                <h2 className="text-base sm:text-lg font-black text-white mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span>مقدمه حقوقی و تحلیل ۲۰۲۶</span>
                </h2>
                <p>{post.fullArticle.intro}</p>
              </section>

              {/* نکات کلیدی پرونده (Key Points) */}
              {post.fullArticle.keyPoints && post.fullArticle.keyPoints.length > 0 && (
                <section className="rounded-3xl border border-white/15 bg-black/40 p-6 md:p-8 space-y-4">
                  <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-emerald-400" />
                    <span>نکات کلیدی و الزامات اجرایی پرونده ۲۰۲۶</span>
                  </h2>
                  <ul className="space-y-3">
                    {post.fullArticle.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-3 text-xs leading-6 text-slate-200">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs mt-0.5">
                          ✓
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* کادر توصیه مستقیم وکیل مهاجرت (Lawyer's Advice) */}
              {post.fullArticle.lawyerAdvice && (
                <section className="rounded-3xl border border-amber-400/50 bg-amber-400/10 p-6 md:p-8 space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
                    <Scale className="h-5 w-5 text-amber-400" />
                    <span>دیدگاه و توصیه وکیل پایه یک دادگستری دیاکو:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-100 leading-7 font-medium text-justify">
                    «{post.fullArticle.lawyerAdvice}»
                  </p>
                </section>
              )}
            </>
          )}

          {/* لینک‌های داخلی به صفحات تخصصی و خوشه‌های موضوعی مرتبط (Internal Cluster Linking) */}
          {post.relatedPages && post.relatedPages.length > 0 && (
            <section className="rounded-3xl border border-cyan-400/30 bg-cyan-500/5 p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-2 text-cyan-300 font-black text-sm sm:text-base">
                <UserCheck className="h-5 w-5 text-cyan-400 shrink-0" />
                <span>بخش‌های تخصصی و صفحات مکمل مرتبط در پرتال دیاکو</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {post.relatedPages.map((rp) => (
                  <a
                    key={rp.href}
                    href={rp.href}
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && rp.page && onNavigateToPage) {
                        e.preventDefault();
                        onNavigateToPage(rp.page as PageType);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-400/50 hover:bg-white/[0.06] p-4 transition flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition">
                        {rp.title}
                      </span>
                      <ArrowLeft className="h-4 w-4 text-amber-400 shrink-0 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[11px] text-slate-300 leading-5">{rp.desc}</p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* پرسش‌های متداول (FAQ) */}
          {post.fullArticle.faq && post.fullArticle.faq.length > 0 && (
            <section id="article-faq-container" className="rounded-3xl border border-white/10 bg-[#07242e]/60 p-6 md:p-8 space-y-4">
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-amber-400" />
                <span>پرسش‌های متداول و تحلیل‌های حقوقی</span>
              </h2>

              <div className="space-y-2.5">
                {post.fullArticle.faq.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-right font-bold text-white hover:text-amber-300 transition cursor-pointer text-xs sm:text-sm"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-slate-300 leading-6 border-t border-white/5 pt-3 animate-fadeIn">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* برچسب‌های مقاله */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Tag className="h-3.5 w-3.5" /> برچسب‌ها:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 hover:border-amber-400/40 transition"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* کادر فراخوان مستقیم برای اقدام */}
          <div className="rounded-3xl border border-amber-400/40 bg-gradient-to-l from-amber-500/20 via-[#07242e] to-black/70 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1.5 text-center sm:text-right">
              <h3 className="text-base sm:text-lg font-black text-white">
                آیا این روش با شرایط شما همخوانی دارد؟
              </h3>
              <p className="text-xs text-slate-300 max-w-md">
                همین حالا شانس ویزا و الزامات قانونی پرونده خود را با الگوریتم سنجش هوشمند دیاکو ارزیابی کنید.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenAssessment}
                className="rounded-2xl bg-gradient-to-l from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-6 py-3 text-xs shadow-glow transition hover:scale-105 cursor-pointer"
              >
                شروع ارزیابی پرونده ←
              </button>
              <a
                href="tel:+436889763256"
                dir="ltr"
                className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 text-xs transition"
              >
                تماس با دفتر وین
              </a>
            </div>
          </div>

          {/* ============================================================
              مقالات و راهنماهای مرتبط (Related Articles based on Category)
             ============================================================ */}
          {relatedPosts.length > 0 && (
            <section className="pt-12 border-t border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full mb-2">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>مطالب پیشنهادی مرتبط با دسته‌بندی {post.categoryLabel}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    مقالات و راهنماهای تکمیلی
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    تحلیل‌های حقوقی هم‌راستا با این مقاله برای تصمیم‌گیری آگاهانه و تقویت پرونده مهاجرتی شما
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (onBackToBlog) onBackToBlog();
                    else onBackToHome();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-amber-200 transition shrink-0 cursor-pointer self-start sm:self-center"
                >
                  <span>مشاهده همه مقالات وبلاگ</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                {relatedPosts.map((rPost) => (
                  <article
                    key={rPost.id}
                    onClick={() => {
                      if (onNavigateToPost) {
                        onNavigateToPost(rPost.slug);
                      } else {
                        window.location.pathname = `/blog/${rPost.slug}`;
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] overflow-hidden hover:border-amber-400/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      {/* تصویر مقاله */}
                      <div className="aspect-[16/9] overflow-hidden bg-black/50 relative">
                        <img
                          src={rPost.image.src}
                          alt={rPost.image.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 right-2.5">
                          <span className="text-[10px] font-black text-slate-900 bg-amber-400/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-sm">
                            {rPost.categoryLabel}
                          </span>
                        </div>
                      </div>

                      {/* محتوای کارت */}
                      <div className="p-4 space-y-2.5">
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-amber-400" />
                            <span>{rPost.readTime}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-slate-500" />
                            <span>{rPost.date}</span>
                          </span>
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                          {rPost.title}
                        </h4>

                        <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                          {rPost.excerpt || rPost.answerFirst}
                        </p>
                      </div>
                    </div>

                    {/* فوتر کارت و نویسنده حقوقی */}
                    <div className="p-4 pt-0 border-t border-white/5 mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <span>{rPost.author.name}</span>
                      </span>
                      <span className="font-bold text-amber-400 group-hover:translate-x-[-3px] transition-transform flex items-center gap-0.5">
                        <span>مطالعه مقاله</span>
                        <ArrowLeft className="h-3 w-3 inline" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </article>
  );
};

export default BlogPostPage;
