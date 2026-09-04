import { Link } from 'react-router-dom';
import { business, fullAddress, telHref } from '@/data/business';
import { siteLinks } from '@/components/layout/Header';
import { en } from '@/i18n/en';

/**
 * Footer: a blush block with a dark top rule holding address, phone and
 * hours, then a dark bar over the gradient image with the copyright and menu.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="border-t-2 border-ink bg-blush text-ink">
        <div className="container-site grid gap-10 py-14 md:grid-cols-3 lg:py-20">
          <div>
            <h2 className="font-heading text-ui font-semibold">{en.contact.address}</h2>
            <address className="mt-3 text-body not-italic">{fullAddress()}</address>
          </div>
          <div>
            <h2 className="font-heading text-ui font-semibold">{en.contact.contact}</h2>
            <p className="mt-3 text-body">
              <a href={telHref()} className="hover:text-brass">
                {business.phoneDisplay}
              </a>
              <br />
              <a href={`mailto:${business.email}`} className="hover:text-brass">
                {business.email}
              </a>
            </p>
            <p className="mt-3 text-body-sm">{business.citiesServed.join(' · ')}</p>
          </div>
          <div>
            <h2 className="font-heading text-ui font-semibold">{en.contact.workingHours}</h2>
            <p className="mt-3 text-body">
              {business.hours.days}
              <br />
              {business.hours.opens} – {business.hours.closes}
            </p>
          </div>
        </div>
      </div>
      <div
        className="text-white"
        style={{ backgroundImage: 'url(/img/banners/footer.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#1a1b1f' }}
      >
        <div className="container-site flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-body-sm text-white/80">
            © {year} {business.legalName}. {en.footer.rights}
          </span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {siteLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="font-heading text-ui-sm uppercase tracking-[0.06em] text-white/80 hover:text-brass">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={business.social.instagram.url} target="_blank" rel="noreferrer" className="font-heading text-ui-sm uppercase tracking-[0.06em] text-white/80 hover:text-brass">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
