import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Calendar,
  Clock,
  ArrowLeft,
  Scale,
  Sparkles,
  BookOpen,
  Filter,
  X,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Tag,
} from 'lucide-react';
import { useSeo } from '../../hooks/useSeo';
import { BLOG_POSTS, type BlogPost } from '../ImmigrationBlogSection';
import type { PageType } from '../Header';

interface Props {
  onBackToHome: () => void;
  onNavigateToPost: (slug: string) => void;
  onOpenAssessment: () => void;
  onNavigateToPage?: (page: PageType) => void;
}

type SortOption = 'newest' | 'views' | 'readTime';

const CATEGORY_TABS: { key: string; label: string; icon: string }[] = [
  { key: 'all', label: 'همه مقالات', icon: '📚' },
  { key: 'austria', label: 'اتریش', icon: '🇦🇹' },
  { key: 'germany', label: 'آلمان', icon: '🇩🇪' },
  { key: 'investment', label: 'تمکن و سرمایه‌گذاری', icon: '💼' },
  { key: 'work', label: 'کاری و بلوکارت', icon: '🇪🇺' },
  { key: 'academic', label: 'تحصیلی و دانشگاهی', icon: '🎓' },
  { key: 'spain', label: 'اسپانیا', icon: '🇪🇸' },
  { key: 'france', label: 'فرانسه', icon: '🇫🇷' },
  { key: 'hungary', label: 'مجارستان', icon: '🇭🇺' },
  { key: 'greece', label: 'یونان', icon: '🇬🇷' },
  { key: 'uk', label: 'انگلستان', icon: '🇬🇧' },
];

const ITEMS_PER_PAGE = 9;

export const BlogIndexPage: React.FC<Props> = ({
  onBackToHome,
  onNavigateToPost,
  onOpenAssessment,
  onNavigateToPage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // SEO & AIO
  useSeo({
    title: 'بانک مقالات و تحلیل‌های حقوقی مهاجرت به اروپا ۲۰۲۶ | هلدینگ دیاکو',
    description:
      'آرشیو جامع تحلیل‌های حقوقی، آخرین قوانین اقامت اتریش، بخشنامه‌های ۲۰۲۶ بلوکارت آلمان، تمکن مالی و گلدن ویزا به قلم وکلای رسمی دفتر وین هلدینگ دیاکو.',
    keywords: [
      'مقالات مهاجرت اروپا',
      'اخبار تمکن مالی اتریش ۲۰۲۶',
      'بلوکارت آلمان',
      'قوانین اقامت شنگن',
      'تحلیل حقوقی مهاجرت',
      'هلدینگ دیاکو وین',
    ],
    canonical: '/blog',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'بانک مقالات و تحلیل‌های حقوقی مهاجرت به اروپا ۲۰۲۶ | دیاکو',
      description:
        'مجموعه جامع مقالات و تحلیل‌های حقوقی مهاجرت به اتریش، آلمان و اتحادیه اروپا به قلم وکلای رسمی دادگستری.',
      url: 'https://www.dia-co.ir/blog',
      inLanguage: 'fa-IR',
      publisher: {
        '@type': 'Organization',
        name: 'هلدینگ بین‌المللی مهاجرتی دیاکو',
        url: 'https://www.dia-co.ir',
      },
      hasPart: BLOG_POSTS.slice(0, 15).map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `https://www.dia-co.ir/blog/${p.slug}`,
        datePublished: p.dateModified,
        dateModified: p.dateModified,
        author: {
          '@type': 'Person',
          name: p.author.name,
          jobTitle: p.author.role,
        },
      })),
    },
  });

  // مرتب‌سازی و فیلتر مقالات
  const filteredAndSortedPosts = useMemo(() => {
    // 1. فیلتر دسته‌بندی
    let list = BLOG_POSTS.filter((post) => {
      if (selectedCategory !== 'all' && post.category !== selectedCategory) {
        return false;
      }
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }
      return true;
    });

    // 2. جستجوی متنی
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((post) => {
        return (
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.answerFirst.toLowerCase().includes(q) ||
          post.author.name.toLowerCase().includes(q) ||
          post.legalReference?.toLowerCase().includes(q) ||
          post.categoryLabel.toLowerCase().includes(q) ||
          post.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    // 3. مرتب‌سازی
    return [...list].sort((a, b) => {
      if (sortBy === 'newest') {
        const dateA = new Date(a.dateModified).getTime() || 0;
        const dateB = new Date(b.dateModified).getTime() || 0;
        return dateB - dateA;
      }
      if (sortBy === 'views') {
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy === 'readTime') {
        const getMins = (str: string) => parseInt(str.replace(/\D/g, '') || '5', 10);
        return getMins(a.readTime) - getMins(b.readTime);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedTag, sortBy]);

  // صفحه جاری در زمان تغییر فیلترها به ۱ برگردد
  useEffect(() => {
    setCurrentPageNum(1);
  }, [searchQuery, selectedCategory, selectedTag, sortBy]);

  // محاسبه صفحه‌بندی
  const totalPages = Math.ceil(filteredAndSortedPosts.length / ITEMS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPageNum - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedPosts, currentPageNum]);

  // مقاله ویژه شاخص (آخرین مقاله دست‌نخورده در سورت جدیدترین)
  const featuredPost = useMemo(() => {
    if (filteredAndSortedPosts.length === 0) return null;
    return filteredAndSortedPosts[0];
  }, [filteredAndSortedPosts]);

  // اشتراک لینک مقاله
  const handleShare = async (e: React.MouseEvent, post: BlogPost) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopiedSlug(post.slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  // تمام تگ‌های پرکاربرد برای فیلتر سریع
  const popularTags = useMemo(() => {
    const counts: Record<string, number> = {};
    BLOG_POSTS.forEach((p) => {
      p.tags.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-[#071f26] text-slate-100 font-sans">
      {/* هدر بخش و Breadcrumbs */}
      <section className="relative overflow-hidden pt-28 pb-14 bg-gradient-to-b from-[#092a35] via-[#071f26] to-[#071f26] border-b border-white/10">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#f5a623_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* بردکرامب */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-amber-300 transition cursor-pointer"
            >
              صفحه اصلی
            </button>
            <span>/</span>
            <span className="text-amber-400 font-bold">وبلاگ و تحلیل‌های حقوقی</span>
          </nav>

          {/* نشان اعتماد و تیتر اصلی */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>پایگاه دانش رسمی هلدینگ بین‌المللی دیاکو — آخرین آپدیت قوانین ۲۰۲۶</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              وبلاگ تخصصی و تحلیل‌های حقوقی مهاجرت به اروپا
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
              مجموعه‌ای کامل از مقالات تحلیلی، تفسیر بخشنامه‌های اداره مهاجرت اتریش (BMI)، آلمان (BAMF) و اتحادیه اروپا به قلم وکلای پایه یک دادگستری و مشاوران مقیم وین.
            </p>

            {/* آمار خلاصه */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>
                  مجموع مقالات:{' '}
                  <strong className="text-white font-black">{BLOG_POSTS.length} مقاله</strong>
                </span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>نظارت حقوقی: وکلای رسمی کانون وکلای اتریش (RDB)</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>به‌روزرسانی هفتگی بر اساس مصوبات شنگن</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* بخش جستجو، دسته‌بندی و کنترل‌های مرتب‌سازی */}
      <section className="sticky top-16 z-30 bg-[#06191f]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-4">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* نوار جستجوی زنده */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در عنوان، متن، وکیل یا موضوع (مثلاً: تمکن مالی، بلوکارت، وین، NAG §44)..."
                className="w-full bg-[#0b2b34] text-white placeholder-slate-400 rounded-xl pr-10 pl-10 py-2.5 text-xs sm:text-sm border border-white/15 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="پاک کردن جستجو"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* سورت و شمارنده */}
            <div className="flex items-center gap-3 justify-between lg:justify-end">
              <div className="text-xs text-slate-300 font-medium">
                یافت‌شده:{' '}
                <span className="text-amber-400 font-bold">{filteredAndSortedPosts.length}</span>{' '}
                مقاله
              </div>

              <div className="flex items-center gap-1.5 bg-[#0b2b34] border border-white/15 rounded-xl px-2.5 py-1 text-xs">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400 hidden sm:inline">مرتب‌سازی:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-white font-bold focus:outline-none cursor-pointer text-xs"
                >
                  <option value="newest" className="bg-[#0b2b34] text-white">
                    جدیدترین مقالات (تاریخ)
                  </option>
                  <option value="views" className="bg-[#0b2b34] text-white">
                    پربازدیدترین‌ها
                  </option>
                  <option value="readTime" className="bg-[#0b2b34] text-white">
                    زمان مطالعه کوتاه
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* تب‌های دسته‌بندی */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 pb-1">
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab.key;
              const count =
                tab.key === 'all'
                  ? BLOG_POSTS.length
                  : BLOG_POSTS.filter((p) => p.category === tab.key).length;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(tab.key);
                    setSelectedTag(null);
                  }}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-[#071f26] shadow-md font-black'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-[#071f26]/20 text-[#071f26]' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* تگ انتخاب‌شده یا فیلترهای فعال */}
          {(selectedTag || searchQuery || selectedCategory !== 'all') && (
            <div className="flex items-center gap-2 pt-2.5 text-xs text-slate-300">
              <span className="text-slate-400 flex items-center gap-1">
                <Filter className="w-3 h-3" /> فیلترهای فعال:
              </span>
              {selectedTag && (
                <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-lg text-xs">
                  برچسب: #{selectedTag}
                  <button
                    type="button"
                    onClick={() => setSelectedTag(null)}
                    className="hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-white/10 text-slate-200 px-2 py-0.5 rounded-lg text-xs">
                  دسته: {CATEGORY_TABS.find((t) => t.key === selectedCategory)?.label}
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-white/10 text-slate-200 px-2 py-0.5 rounded-lg text-xs">
                  جستجو: «{searchQuery}»
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTag(null);
                  setSearchQuery('');
                }}
                className="text-amber-400 hover:underline mr-auto text-xs font-bold cursor-pointer"
              >
                پاک کردن همه فیلترها
              </button>
            </div>
          )}
        </div>
      </section>

      {/* کانتینر اصلی محتوا */}
      <div className="container mx-auto px-4 md:px-8 py-10">
        {/* مقاله ویژه شاخص در بالای صفحه (تنها در صورتی که در صفحه ۱ باشیم و فیلتر جستجو نباشد) */}
        {!searchQuery && !selectedTag && selectedCategory === 'all' && currentPageNum === 1 && featuredPost && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>تحلیل برگزیده سردبیر و آخرین به‌روزرسانی حقوقی</span>
            </div>

            <article
              onClick={() => onNavigateToPost(featuredPost.slug)}
              className="group cursor-pointer rounded-2xl bg-gradient-to-br from-[#0c3440] to-[#08242c] border border-amber-400/30 overflow-hidden shadow-2xl hover:border-amber-400 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="rounded-lg bg-amber-400 px-2.5 py-1 text-xs font-black text-[#071f26]">
                        {featuredPost.categoryLabel}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {featuredPost.date}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {featuredPost.readTime}
                      </span>
                      {featuredPost.legalReference && (
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                          {featuredPost.legalReference}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-amber-300 transition-colors leading-snug mb-3">
                      {featuredPost.title}
                    </h2>

                    {/* خلاصه پاسخ سریع (AIO) */}
                    <div className="rounded-xl bg-[#071f26]/80 border border-white/10 p-4 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                        <Scale className="w-3.5 h-3.5" />
                        <span>خلاصه پاسخ حقوقی (Answer First):</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                        {featuredPost.answerFirst}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2.5">
                      <span className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-lg">
                        {featuredPost.author.avatar || '⚖️'}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-white">{featuredPost.author.name}</div>
                        <div className="text-[11px] text-slate-400">{featuredPost.author.role}</div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-400 group-hover:translate-x-[-4px] transition-transform">
                      مطالعه متن کامل مقاله
                      <ArrowLeft className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden">
                  <img
                    src={featuredPost.image.src}
                    alt={featuredPost.image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0c3440] via-transparent to-transparent opacity-80" />
                </div>
              </div>
            </article>
          </div>
        )}

        {/* برچسب‌های پرطرفدار */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            موضوعات پرتکرار:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`text-xs px-2.5 py-1 rounded-lg transition cursor-pointer ${
                selectedTag === tag
                  ? 'bg-amber-400 text-[#071f26] font-bold'
                  : 'bg-[#0a2731] text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* لیست مقالات (گرید) */}
        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onNavigateToPost(post.slug)}
                className="group flex flex-col justify-between rounded-2xl bg-[#0a2731] border border-white/10 hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* تصویر شاخص با نشان‌ها */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-800">
                  <img
                    src={post.image.src}
                    alt={post.image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2731] via-transparent to-transparent opacity-60" />

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="rounded-lg bg-[#071f26]/90 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[11px] font-bold text-amber-400">
                      {post.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 left-3 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleShare(e, post)}
                      title="کپی لینک مقاله"
                      className="p-1.5 rounded-lg bg-[#071f26]/90 backdrop-blur-md border border-white/15 text-slate-300 hover:text-amber-400 transition"
                    >
                      {copiedSlug === post.slug ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="absolute bottom-2.5 right-3 flex items-center gap-3 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1 bg-[#071f26]/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1 bg-[#071f26]/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* بدنه کارت */}
                <div className="p-5 flex flex-col flex-1">
                  {/* رفرنس قانونی رسمی */}
                  {post.legalReference && (
                    <div className="mb-2">
                      <span className="inline-block text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                        {post.legalReference}
                      </span>
                    </div>
                  )}

                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug mb-2.5">
                    {post.title}
                  </h3>

                  {/* خلاصه یا پاسخ سریع */}
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4 flex-1">
                    {post.answerFirst || post.excerpt}
                  </p>

                  {/* تگ‌ها */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                        className="text-[10px] text-slate-400 bg-white/5 hover:bg-white/10 hover:text-amber-300 px-2 py-0.5 rounded transition cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* فوتر کارت — نویسنده و دکمه مطالعه */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-sm">
                        {post.author.avatar || '⚖️'}
                      </span>
                      <div className="text-right">
                        <div className="text-[11px] font-bold text-white line-clamp-1">
                          {post.author.name}
                        </div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">
                          {post.author.office}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-black text-amber-400 group-hover:translate-x-[-3px] transition-transform flex items-center gap-1">
                      مطالعه
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* حالت بدون نتیجه جستجو */
          <div className="rounded-2xl bg-[#0a2731] border border-white/10 p-12 text-center max-w-xl mx-auto my-12">
            <div className="w-14 h-14 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-white mb-2">مقاله‌ای با این مشخصات یافت نشد</h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              لطفاً از کلمات کلیدی دیگری مانند «تمکن مالی»، «بلوکارت»، «اتریش»، «آلمان» یا «سرمایه‌گذاری» استفاده نمایید یا فیلترها را بازنشانی کنید.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag(null);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#071f26] px-5 py-2.5 text-xs font-black transition cursor-pointer"
            >
              پاک کردن جستجو و نمایش همه مقالات
            </button>
          </div>
        )}

        {/* صفحه‌بندی (Pagination) */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPageNum === 1}
              onClick={() => {
                setCurrentPageNum((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0a2731] border border-white/15 text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
              <span>صفحه قبل</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isCurrent = pageNum === currentPageNum;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => {
                      setCurrentPageNum(pageNum);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 rounded-xl text-xs font-black transition cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-400 text-[#071f26] shadow-md'
                        : 'bg-[#0a2731] text-slate-300 border border-white/15 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={currentPageNum === totalPages}
              onClick={() => {
                setCurrentPageNum((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0a2731] border border-white/15 text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <span>صفحه بعد</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogIndexPage;
