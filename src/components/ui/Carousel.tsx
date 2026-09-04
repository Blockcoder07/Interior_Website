import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { GalleryImage } from '@/components/gallery/GalleryImage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ImageAsset } from '@/types/project';
import { cn } from '@/lib/cn';
import { en } from '@/i18n/en';

export interface CarouselSlide {
  image: ImageAsset;
  caption?: string;
  to?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  /** Milliseconds between slides; 0 disables autoplay. */
  autoplay?: number;
  label: string;
  className?: string;
}

/**
 * Full-width fade carousel: one slide at a time, each image shown whole
 * (no cropping) inside a stage sized to the tallest image, autoplay with
 * pause on hover, arrows inside, dots below, keyboard arrows.
 */
export function Carousel({ slides, autoplay = 5000, label, className }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<number | undefined>(undefined);
  const count = slides.length;

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    window.clearInterval(timer.current);
    if (!autoplay || paused || reduced || count < 2) return;
    timer.current = window.setInterval(() => go(1), autoplay);
    return () => window.clearInterval(timer.current);
  }, [autoplay, paused, reduced, count, go]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
    else return;
    e.preventDefault();
  };

  if (count === 0) return null;

  // The stage takes the proportions of the tallest image (capped at 1024px tall,
  // the height of a portrait photo at natural size), so every slide fits whole.
  const stageRatio = Math.min(...slides.map((s) => s.image.width / s.image.height));

  return (
    <div className={className}>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKey}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative max-h-[1024px] w-full overflow-hidden bg-white outline-none focus-visible:ring-2 focus-visible:ring-brass"
        style={{ aspectRatio: String(stageRatio) }}
      >
        {slides.map((s, i) => {
          const active = i === index;
          const body = (
            <>
              <GalleryImage image={s.image} sizes="100vw" priority={i === 0} className="h-full w-full bg-white" fit="contain" />
              {s.caption && (
                <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 to-ink/0 px-5 pb-4 pt-10 font-heading text-ui text-white">
                  {s.caption}
                </span>
              )}
            </>
          );
          return (
            <div
              key={s.image.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={!active}
              className={cn('absolute inset-0 transition-opacity duration-slow ease-soft', active ? 'z-10 opacity-100' : 'z-0 opacity-0')}
            >
              {s.to ? (
                <Link to={s.to} tabIndex={active ? 0 : -1} className="block h-full w-full">
                  {body}
                </Link>
              ) : (
                body
              )}
            </div>
          );
        })}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={en.carousel.previous}
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow hover:bg-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M9 2L4 7l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={en.carousel.next}
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow hover:bg-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M5 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label={label}>
          {slides.map((s, i) => (
            <button
              key={s.image.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${en.carousel.slide} ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn('h-2.5 w-2.5 rounded-full transition-colors duration-instant', i === index ? 'bg-brass' : 'bg-cement hover:bg-graphite')}
            />
          ))}
        </div>
      )}
    </div>
  );
}
