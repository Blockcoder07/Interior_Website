import { Button } from '@/components/ui/Button';
import { en } from '@/i18n/en';

export function NotFoundPage() {
  return (
    <section className="container-site section">
      <p className="spec">404</p>
      <h1 className="mt-3 text-h1">{en.pages.notFound}</h1>
      <p className="prose-narrative mt-5">{en.pages.notFoundBody}</p>
      <Button to="/" className="mt-8">
        {en.nav.home}
      </Button>
    </section>
  );
}
