import { business } from '@/data/business';
import { en } from '@/i18n/en';

/** "About us": gold icon, uppercase title, gold firm name, then the copy. */
export function AboutBand() {
  const t = en.home.about;
  const years = new Date().getFullYear() - business.foundedYear;
  return (
    <section id="about" className="container-site section" aria-labelledby="about-h">
      <div className="mx-auto max-w-4xl">
        <svg width="56" height="56" viewBox="0 0 24 24" aria-hidden="true" className="text-brass" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M4 21V4.5A1.5 1.5 0 0 1 5.5 3h9A1.5 1.5 0 0 1 16 4.5V21M16 9h3.5A1.5 1.5 0 0 1 21 10.5V21M2 21h20M7 7h2M11 7h2M7 11h2M11 11h2M7 15h2M11 15h2M18 13h1M18 17h1M9 21v-3h2v3" />
        </svg>
        <h2 id="about-h" className="mt-4 font-heading text-[2rem] font-medium uppercase tracking-[0.04em] text-[#927E7E] sm:text-[2.625rem]">
          {t.title}
        </h2>
        <p className="font-heading text-[1.75rem] font-semibold text-brass [text-wrap:balance] sm:text-[2.25rem]">{business.legalName}</p>

        <div className="mt-8 text-body text-ink">
          <p>{business.positioning}</p>
          <p className="mt-4">{t.body(business.foundedYear, business.projectsDelivered)}</p>

          <p className="mt-6 font-semibold">{t.philosophyLabel}</p>
          <p className="mt-2">{t.philosophy}</p>

          <p className="mt-6 font-semibold">{t.setsApart}</p>
          {[
            { title: t.expertise, body: t.expertiseBody(years) },
            { title: t.tailored, body: t.tailoredBody },
            { title: t.detail, body: t.detailBody },
            { title: t.materials, body: t.materialsBody },
          ].map((p) => (
            <p key={p.title} className="mt-3">
              <strong className="underline underline-offset-4">{p.title}</strong>
              <span className="font-semibold"> : </span>
              {p.body}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
