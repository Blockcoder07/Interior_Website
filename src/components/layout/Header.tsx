import { useEffect, useState } from 'react';
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

/** White sticky header: wordmark left, uppercase menu, red call-to-action. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [raised, setRaised] = useState(false);
  const { pathname, hash } = useLocation();

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
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const isActive = (link: (typeof siteLinks)[number]) => pathname === '/' && hash === link.hash;

  return (
    <header className={cn('sticky top-0 z-40 bg-white transition-shadow duration-instant', raised ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]' : 'border-b border-hairline')}>
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <Link to="/" className="flex items-baseline gap-2" aria-label={`${business.legalName} — home`}>
          <span className="font-heading text-[1.25rem] font-bold uppercase tracking-[0.06em] text-ink">Unity</span>
          <span className="font-heading text-[1.25rem] font-light uppercase tracking-[0.06em] text-brass">Quickkraft</span>
        </Link>

        <nav aria-label={en.nav.mainNavigation} className="hidden items-center gap-7 md:flex">
          {siteLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                'font-heading text-ui-sm uppercase tracking-[0.06em] transition-colors duration-instant',
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

        <div className="flex items-center gap-4 md:hidden">
          <a href={telHref()} className="spec text-ink">
            {business.phoneDisplay}
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? en.nav.closeMenu : en.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
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
        <div id="mobile-nav" className="fixed inset-x-0 bottom-0 top-[4.5rem] z-30 flex flex-col justify-between bg-white px-5 pb-8 pt-8 md:hidden">
          <nav aria-label={en.nav.mainNavigation} className="flex flex-col">
            {siteLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
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
