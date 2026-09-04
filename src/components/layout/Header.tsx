import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { business, telHref } from '@/data/business';
import { en } from '@/i18n/en';
import { cn } from '@/lib/cn';

/** One-page navigation: anchors on the home page. From other pages they lead back to `/#section`. */
export const siteLinks = [
  { to: '/', label: en.nav.home, hash: '' },
  { to: '/#about', label: en.nav.about, hash: '#about' },
  { to: '/#services', label: en.nav.services, hash: '#services' },
  { to: '/#contact', label: en.nav.contact, hash: '#contact' },
] as const;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** White sticky header: wordmark left, uppercase menu, red call-to-action. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [raised, setRaised] = useState(false);
  const { pathname, hash } = useLocation();
  const drawer = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    const onScroll = () => setRaised(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    // Lock the page behind the drawer without losing the scroll position.
    document.documentElement.style.overflow = 'hidden';
    drawer.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  // Keep Tab inside the open drawer (the toggle button counts as its last stop).
  const trapTab = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !drawer.current) return;
    const items = Array.from(drawer.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      toggle.current?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      toggle.current?.focus();
    }
  };
  const onToggleKey = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (!open || e.key !== 'Tab') return;
    const items = drawer.current ? Array.from(drawer.current.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
    const target = e.shiftKey ? items[items.length - 1] : items[0];
    if (target) {
      e.preventDefault();
      target.focus();
    }
  };

  const isActive = (link: (typeof siteLinks)[number]) => pathname === '/' && hash === link.hash;

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-white pt-[env(safe-area-inset-top)] transition-shadow duration-instant',
        raised ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]' : 'border-b border-hairline',
      )}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4 [@media(max-height:480px)]:h-14">
        {/* Below 420px the wordmark steps down a little so the bar fits a 320px screen. */}
        <Link to="/" className="flex items-baseline gap-2 whitespace-nowrap max-xs:gap-1.5" aria-label={`${business.legalName} — home`}>
          <span className="font-heading text-[1.25rem] font-bold uppercase tracking-[0.06em] text-ink max-xs:text-[1.05rem]">Unity</span>
          <span className="font-heading text-[1.25rem] font-light uppercase tracking-[0.06em] text-brass max-xs:text-[1.05rem]">Quickkraft</span>
        </Link>

        <nav aria-label={en.nav.mainNavigation} className="hidden items-center gap-4 md:flex lg:gap-7">
          {siteLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                'inline-flex min-h-[44px] items-center whitespace-nowrap font-heading text-ui-sm uppercase tracking-[0.06em] transition-colors duration-instant',
                isActive(l) ? 'text-brass' : 'text-ink hover:text-brass',
              )}
            >
              {l.label}
            </Link>
          ))}
          <Button to="/#contact" size="sm">
            {en.actions.getAnEstimate}
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {/* The number itself from 640px up; below that a phone icon, so the bar fits a 320px screen. */}
          <a href={telHref()} className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 whitespace-nowrap px-2 text-ink max-xs:px-1" aria-label={`${en.actions.callUs} ${business.phoneDisplay}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
            </svg>
            <span className="spec hidden text-ink sm:inline">{business.phoneDisplay}</span>
          </a>
          <button
            ref={toggle}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? en.nav.closeMenu : en.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
            onKeyDown={onToggleKey}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              {open ? (
                <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M2 6h18M2 11h18M2 16h18" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          ref={drawer}
          onKeyDown={trapTab}
          className="fixed inset-x-0 bottom-0 top-[calc(4.5rem+env(safe-area-inset-top))] z-30 flex flex-col justify-between gap-8 overflow-y-auto bg-white px-[max(1.25rem,env(safe-area-inset-left))] pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 md:hidden [@media(max-height:480px)]:top-[calc(3.5rem+env(safe-area-inset-top))]"
        >
          <nav aria-label={en.nav.mainNavigation} className="flex flex-col">
            {siteLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn('border-b border-hairline py-4 font-heading text-[1.25rem] uppercase tracking-[0.06em]', isActive(l) ? 'text-brass' : 'text-ink')}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <Button to="/#contact">{en.actions.getAnEstimate}</Button>
            <span className="spec">
              {business.hours.days} · {business.hours.opens} – {business.hours.closes}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
