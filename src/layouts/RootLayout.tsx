import { Suspense } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { BackToTop } from '@/components/layout/BackToTop';
import { LenisProvider } from '@/lib/lenis';
import { LocalBusinessSchema } from '@/seo/LocalBusinessSchema';
import { en } from '@/i18n/en';

export function RootLayout() {
  // Keyed on pathname only: a 200ms CSS fade on page change, nothing on
  // query-param changes (filters, configurator) — Section 8.
  const { pathname } = useLocation();
  return (
    <LenisProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-chalk"
      >
        {en.nav.skipToContent}
      </a>
      <Header />
      <main id="main" key={pathname} className="page-enter min-h-[60vh]">
        <Suspense fallback={<div className="container-site section" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
      <LocalBusinessSchema />
      <ScrollRestoration
        getKey={(location) => location.pathname}
      />
    </LenisProvider>
  );
}
