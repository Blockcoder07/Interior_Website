import Lenis from 'lenis';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const LenisContext = createContext<Lenis | null>(null);

/**
 * Smooth scroll for the whole document. Off entirely under reduced motion —
 * the browser's native scroll is the reduced-motion path, not a slower Lenis.
 * Scroll-to-top on route change is instant either way so page transitions
 * do not animate the scrollbar.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  /** False until the first navigation has been handled. */
  const landed = useRef(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Touch screens keep native scrolling: no smoothing loop to run on a phone.
    const touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (reduced || touch) {
      setLenis(null);
      return;
    }
    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });
    const loop = (time: number) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    setLenis(instance);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  useEffect(() => {
    // `#img=` is lightbox state, not a position: leave the page where it is.
    if (hash.startsWith('#img=')) return;
    // One-page anchors (#about, #services, #contact …): scroll to the section.
    // The page is lazy-loaded, so the section may not exist yet; poll briefly.
    if (hash) {
      const id = hash.slice(1);
      // A direct visit jumps straight to the section; a click while on the
      // page glides there.
      const immediate = !landed.current;
      let tries = 0;
      const timer = window.setInterval(() => {
        const target = document.getElementById(id);
        tries += 1;
        if (target) {
          if (lenis) lenis.scrollTo(target, { offset: -80, immediate });
          else target.scrollIntoView({ behavior: 'auto', block: 'start' });
          landed.current = true;
          window.clearInterval(timer);
        } else if (tries > 40) {
          window.clearInterval(timer);
        }
      }, 75);
      return () => window.clearInterval(timer);
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: 'auto' });
    landed.current = true;
    return undefined;
  }, [pathname, hash, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** The live Lenis instance, or null under reduced motion. */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
