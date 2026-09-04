import { useEffect, useState } from 'react';
import { useLenis } from '@/lib/lenis';
import { prefersReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { en } from '@/i18n/en';

/** Appears after the first screen; scrolls to the top. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    if (lenis && !prefersReducedMotion()) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={en.actions.backToTop}
      className={cn(
        'fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-40 flex h-11 w-11 items-center justify-center rounded border border-hairline bg-paper/90 text-ink backdrop-blur transition-opacity duration-instant hover:border-brass hover:text-brass',
        show ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M2 9l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
