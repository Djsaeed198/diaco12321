import React, { useState, useMemo } from 'react';
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

  // یافتن مقاله بر اساس slug
  const post = useMemo<BlogPost | undefined>(() => {
    return (
      BLOG_POSTS.find((p) => p.slug === slug || p.id === slug) ||
      BLOG_POSTS[0] // fallback
    );
  }, [slug]);

  // مقالات مرتبط (همان دسته‌بندی یا موضوعات مشترک)
  const relatedPosts = useMemo<BlogPost[]>(() => {
    if (!post) return [];
    return BLOG_POSTS.filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))).slice(0, 3);
  }, [post]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // داده‌های ساختاریافته Schema.org برای سئو و AIO
  const structuredData = useMemo(() => {
    if (!post) return {};
    const pageUrl = `https://www.dia-co.ir/blog/${post.slug}`;

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': `${pageUrl}#article`,
          isPartOf: {
            '@type': 'WebPage',
            '@id': pageUrl,
            url: pageUrl,
            name: post.title,
          },
          headline: post.title,
          description: post.excerpt || post.answerFirst,
          image: {
            '@type': 'ImageObject',
            url: post.image.src,
            width: post.image.width,
            height: post.image.height,
          },
          datePublished: post.dateModified || '2026-01-01',
          dateModified: post.dateModified || new Date().toISOString().split('T')[0],
          inLanguage: 'fa',
          mainEntityOfPage: pageUrl,
          author: {
            '@type': 'Person',
            name: post.author.name,
            jobTitle: post.author.role,
            description: post.author.credentials,
          },
          publisher: {
            '@type': 'Organization',
            name: 'هلدینگ مهاجرتی دیاکو',
            url: 'https://www.dia-co.ir/',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.dia-co.ir/logo.png',
            },
          },
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
              item: 'https://www.dia-co.ir/#blog',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: post.categoryLabel,
              item: `https://www.dia-co.ir/category/${post.category}`,
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
          mainEntity: (post.fullArticle.faq || []).map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        },
      ],
    };
  }, [post]);

  useSeo({
    title: post ? `${post.title} | وبلاگ حقوقی دیاکو` : 'وبلاگ تخصصی مهاجرت | دیاکو',
    description: post ? (post.excerpt || post.answerFirst).slice(0, 160) : 'مقالات و اخبار مهاجرتی اروپا.',
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
    <article className="min-h-screen bg-[#061a21] text-slate-200 selection:bg-amber-400 selection:text-slate-900" dir="rtl">
      {/* ============================================================
          نوار ناوبری بالا و بردکرامب (Breadcrumb)
         ============================================================ */}
      <div className="border-b border-white/10 bg-[#07242e]/90 backdrop-blur-md sticky top-16 z-30">
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

          {/* اطلاعات نویسنده و مرجع قانونی */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#082833] border border-amber-400/30 text-2xl shadow-inner">
                {post.author.avatar}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{post.author.name}</span>
                  <span className="rounded bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 font-bold border border-emerald-500/30">
                    نویسنده تاییدشده
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{post.author.credentials} • {post.author.office}</p>
              </div>
            </div>

            {post.legalReference && (
              <div className="text-left sm:text-right text-[11px] font-mono text-amber-300/90 border-t sm:border-t-0 sm:border-r border-white/10 pt-2 sm:pt-0 sm:pr-4">
                <span className="text-slate-400 block font-sans text-[10px]">مستند رسمی قانون:</span>
                <span dir="ltr">{post.legalReference}</span>
                {post.officialSource && (
                  <a
                    href={post.officialSource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 mt-1 font-sans text-[10px]"
                  >
                    <span>منبع: {post.officialSource.label}</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ============================================================
          بدنه اصلی مقاله + پاسخ صریح AIO و سئو
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

          {/* کادر برجسته پاسخ سریع هوش مصنوعی (AIO Core Answer Box) */}
          <section className="speakable-aio-answer rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-500/15 via-[#07242e] to-black/60 p-6 md:p-8 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2.5 text-amber-300 font-black text-sm sm:text-base mb-3">
              <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
              <span>پاسخ مستقیم و خلاصه کلیدی (AI Overview & Direct Answer)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
              {post.answerFirst}
            </p>
          </section>

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
                href="tel:02191693955"
                dir="ltr"
                className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 text-xs transition"
              >
                تماس با دفتر وین
              </a>
            </div>
          </div>

          {/* ============================================================
              مقالات مرتبط (Related Articles)
             ============================================================ */}
          {relatedPosts.length > 0 && (
            <section className="pt-10 border-t border-white/10 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white">مقالات و راهنماهای مرتبط</h3>
                <button
                  type="button"
                  onClick={() => {
                    if (onBackToBlog) onBackToBlog();
                    else onBackToHome();
                  }}
                  className="text-xs font-bold text-amber-300 hover:text-amber-200 transition"
                >
                  مشاهده همه مقالات ←
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {relatedPosts.map((rPost) => (
                  <div
                    key={rPost.id}
                    onClick={() => {
                      if (onNavigateToPost) {
                        onNavigateToPost(rPost.slug);
                      } else {
                        window.location.pathname = `/blog/${rPost.slug}`;
                      }
                    }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-black/40">
                      <img
                        src={rPost.image.src}
                        alt={rPost.image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3.5 space-y-2">
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full">
                        {rPost.categoryLabel}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                        {rPost.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {rPost.excerpt}
                      </p>
                    </div>
                  </div>
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
