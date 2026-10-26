import { useEffect } from 'react';

// src/hooks/useSeo.ts — ساختار مورد انتظار
export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  robots?: string;
  lang?: string;
  jsonLd?: Record<string, unknown>;
  // ... سایر فیلدهای اختیاری
}


const DEFAULT_OG = 'https://www.dia-co.ir/og-cover.jpg';
const BASE_URL = 'https://www.dia-co.ir';

/**
 * هوک مدیریت SEO دینامیک — عنوان، توضیحات، canonical، OG و JSON-LD
 * را در زمان تغییر مرحله به‌روزرسانی می‌کند.
 */
export const useSeo = (config: SeoConfig) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const prevTitle = document.title;
    const changedNodes: HTMLElement[] = [];

    // ===== Title =====
    document.title = config.title;

    // ===== helper: یافتن/ایجاد متاتگ =====
    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        changedNodes.push(el);
      }
      el.setAttribute('content', content);
    };

    // ===== helper: یافتن/ایجاد لینک =====
    const setLink = (rel: string, href: string) => {
      let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
        changedNodes.push(el);
      }
      el.setAttribute('href', href);
    };

    // ===== متاتگ‌های پایه =====
    setMeta('name', 'description', config.description);
    if (config.keywords?.length) {
      setMeta('name', 'keywords', config.keywords.join('، '));
    }
    if (config.robots) setMeta('name', 'robots', config.robots);

    // ===== Open Graph =====
    const canonical = config.canonical
      ? `${BASE_URL}${config.canonical}`
      : `${BASE_URL}${window.location.pathname}`;

    setLink('canonical', canonical);
    setMeta('property', 'og:title', config.title);
    setMeta('property', 'og:description', config.description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', config.ogType || 'website');
    setMeta('property', 'og:image', config.ogImage || DEFAULT_OG);
    setMeta('property', 'og:site_name', 'هلدینگ مهاجرتی دیاکو');
    setMeta('property', 'og:locale', config.lang === 'en' ? 'en_US' : 'fa_IR');

    // ===== Twitter =====
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', config.title);
    setMeta('name', 'twitter:description', config.description);
    setMeta('name', 'twitter:image', config.ogImage || DEFAULT_OG);

    // ===== JSON-LD =====
    let scriptLd: HTMLScriptElement | null = document.head.querySelector(
      'script[data-seo="wizard-jsonld"]'
    );
    if (!scriptLd) {
      scriptLd = document.createElement('script');
      scriptLd.type = 'application/ld+json';
      scriptLd.setAttribute('data-seo', 'wizard-jsonld');
      document.head.appendChild(scriptLd);
      changedNodes.push(scriptLd);
    }
    if (config.jsonLd) {
      scriptLd.textContent = JSON.stringify(config.jsonLd);
    } else {
      scriptLd.textContent = '';
    }

    // ===== پاک‌سازی هنگام unmount =====
    return () => {
      document.title = prevTitle;
      // متاتگ‌ها را حذف نمی‌کنیم تا از پرش جلوگیری شود؛ فقط مقدارشان به‌روز می‌شود.
    };
  }, [
    config.title,
    config.description,
    config.canonical,
    config.ogImage,
    config.ogType,
    config.robots,
    config.lang,
    JSON.stringify(config.keywords),
    JSON.stringify(config.jsonLd),
  ]);
};

export default useSeo;