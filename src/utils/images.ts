/** Keep source URLs intact, including remote crop parameters. */
export function imageUrl(source: string, width: number): string {
  if (!source || /^(data:|blob:)/.test(source) || source.startsWith('/.netlify/images')) return source;
  return `/.netlify/images?url=${encodeURIComponent(source)}&w=${width}&fm=avif&q=80`;
}

export function imageSrcSet(source: string): string {
  return [400, 800, 1200].map(width => `${imageUrl(source, width)} ${width}w`).join(', ');
}
