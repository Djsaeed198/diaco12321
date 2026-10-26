import type { ImgHTMLAttributes } from 'react';
import { imageSrcSet, imageUrl } from '../utils/images';

type Props = ImgHTMLAttributes<HTMLImageElement>;

/** Shared image policy for page heroes, cards, and article illustrations. */
export default function OptimizedImage({
  src = '', width = 1200, height = 800, loading = 'lazy',
  fetchPriority, sizes, srcSet, decoding = 'async', ...props
}: Props) {
  const priority = fetchPriority ?? (loading === 'eager' ? 'high' : undefined);
  const responsive = !/^(data:|blob:)/.test(src);
  return (
    <img
      {...props}
      src={imageUrl(src, Math.min(Number(width) || 1200, 1200))}
      srcSet={srcSet ?? (responsive ? imageSrcSet(src) : undefined)}
      sizes={sizes ?? '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px'}
      width={width}
      height={height}
      loading={priority === 'high' ? 'eager' : loading}
      fetchPriority={priority}
      decoding={decoding}
    />
  );
}
