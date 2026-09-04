import { useEffect, useState } from 'react';
import { business, directionsHref, fullAddress, telHref } from '@/data/business';
import { contactBackground } from '@/data/media';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { en } from '@/i18n/en';

function minutesOf(hhmm: string): number {
  const [h = 0, m = 0] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function isOpenNow(now: Date): boolean {
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= minutesOf(business.hours.opens) && mins < minutesOf(business.hours.closes);
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-heading text-[1.25rem] font-semibold text-brass">{title}</h3>
      <div className="mt-1 text-body text-white">{children}</div>
    </div>
  );
}

/** Contact details over a photograph: gold sub-headings (Address, Contact, Email, Working hours, Social), white text. */
export function OfficePanel() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const tick = () => setOpen(isOpenNow(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  const t = en.contact;

  return (
    <aside
      className="relative overflow-hidden rounded"
      style={{ backgroundImage: `url(${contactBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      aria-labelledby="office-panel-h"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-ink/70" />
      <div className="relative flex flex-col gap-7 p-8 sm:p-12">
        <h2 id="office-panel-h" className="sr-only">
          {t.office}
        </h2>
        <Block title={t.address}>
          <address className="not-italic">{fullAddress()}</address>
          <a href={directionsHref()} target="_blank" rel="noreferrer" className="-mb-2 mt-1 inline-block py-2 text-ui-sm uppercase tracking-[0.06em] text-brass underline underline-offset-4">
            {en.actions.getDirections}
          </a>
        </Block>
        <Block title={t.contact}>
          <a href={telHref()} className="-my-2 inline-block py-2 hover:text-brass">
            {business.phoneDisplay}
          </a>
        </Block>
        <Block title={t.email}>
          <a href={`mailto:${business.email}`} className="-my-2 inline-block break-all py-2 hover:text-brass">
            {business.email}
          </a>
        </Block>
        <Block title={t.workingHours}>
          <p>
            {business.hours.days} {business.hours.opens} – {business.hours.closes}
          </p>
          <p className={open ? 'text-brass' : 'text-white/70'} aria-live="polite">
            {open === null ? '' : open ? t.openNow : t.closedNow}
          </p>
        </Block>
        <Block title={t.social}>
          <ul className="mt-2 flex gap-3" aria-label={t.social}>
            <li>
              <a href={business.social.instagram.url} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded bg-red text-white hover:bg-red-hover max-md:h-11 max-md:w-11">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </li>
            {business.social.facebook && (
              <li>
                <a href={business.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded bg-red text-white hover:bg-red-hover max-md:h-11 max-md:w-11">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3Z" />
                  </svg>
                </a>
              </li>
            )}
            {business.social.linkedin && (
              <li>
                <a href={business.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded bg-red text-white hover:bg-red-hover max-md:h-11 max-md:w-11">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6.9 8.5H3.6V21h3.3V8.5ZM5.3 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM21 13.4c0-3.4-1.8-5.2-4.5-5.2-2 0-3 1.1-3.5 1.9V8.5H9.7V21H13v-6.6c0-1.7.3-3.3 2.4-3.3 2 0 2.1 1.9 2.1 3.4V21H21v-7.6Z" />
                  </svg>
                </a>
              </li>
            )}
            <li>
              <a href={`https://wa.me/${business.phone.replace(/^\+/, '')}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center rounded bg-white max-md:h-11 max-md:w-11">
                <WhatsAppIcon size={28} />
              </a>
            </li>
          </ul>
        </Block>
      </div>
    </aside>
  );
}
