export interface DiacoSeoOptions {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export interface DiacoSeoAPI {
  config: Record<string, unknown>;
  canonical: () => string;
  set: (opts?: DiacoSeoOptions) => DiacoSeoAPI;
}

declare global {
  interface Window {
    DiacoSEO?: DiacoSeoAPI;
    DiacoReady?: () => void;
    DIACO_SITE?: Record<string, unknown>;
    DIACO_YEAR?: { jalali: string; gregorian: string };
    DIACO_UTM?: Record<string, string>;
  }
}
