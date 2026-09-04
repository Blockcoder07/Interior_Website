import { useCallback, useState, type CSSProperties } from 'react';
import type { ImageAsset } from '@/types/project';
import { cn } from '@/lib/cn';

interface GalleryImageProps {
  image: ImageAsset;
  /** `sizes` attribute matching the grid the image sits in. */
  sizes: string;
  /** Eager-load (hero, first tiles). Everything else is lazy. */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  /** `cover` fills the box (default); `contain` shows the whole image inside it. */
  fit?: 'cover' | 'contain';
}

/**
 * <picture> with a WebP source, explicit dimensions, the LQIP as a CSS
 * background behind the img and a fade-in once decoded. Never a spinner —
 * Section 9.
 */
export function GalleryImage({ image, sizes, priority = false, className, imgClassName, style, fit = 'cover' }: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const done = () => setLoaded(true);
    if (typeof img.decode === 'function') img.decode().then(done, done);
    else done();
  }, []);

  const jpg = `${image.src.thumb} 400w, ${image.src.card} 800w, ${image.src.full} ${image.width}w`;
  const webp = `${image.webp.thumb} 400w, ${image.webp.card} 800w, ${image.webp.full} ${image.width}w`;

  return (
    <div
      className={cn('relative overflow-hidden bg-center bg-no-repeat', fit === 'contain' ? 'bg-contain' : 'bg-cover', className)}
      style={{
        ...style,
        backgroundImage: loaded ? undefined : `url(${image.lqip})`,
      }}
    >
      <picture>
        <source type="image/webp" srcSet={webp} sizes={sizes} />
        <img
          src={image.src.card}
          srcSet={jpg}
          sizes={sizes}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={onLoad}
          className={cn(
            'block h-full w-full transition-opacity duration-base ease-soft',
            fit === 'contain' ? 'object-contain' : 'object-cover',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      </picture>
    </div>
  );
}
