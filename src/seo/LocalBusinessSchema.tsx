import { useMemo } from 'react';
import { business, streetAddress } from '@/data/business';
import { services } from '@/data/services';
import { SHARE_IMAGE, SITE_URL } from '@/data/site';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

/**
 * JSON-LD for the firm — generated from `business.ts` and `services.ts`,
 * never hand-written twice. Rendered once from the root layout. Three
 * linked nodes: the business (with its service catalogue), the website,
 * and a breadcrumb for the one page.
 */
function buildGraph(): Record<string, unknown> {
  const businessId = `${SITE_URL}/#business`;
  const areaServed = business.citiesServed.map((city) => ({ '@type': 'City', name: city }));

  const localBusiness: Record<string, unknown> = {
    '@type': ['LocalBusiness', 'ProfessionalService', 'HomeAndConstructionBusiness'],
    '@id': businessId,
    name: business.legalName,
    alternateName: business.shortName,
    description:
      'Architects and interior designers in Vadodara, Gujarat: residential flat planning, commercial building elevation, industrial projects, turnkey interiors, corporate offices and construction.',
    url: `${SITE_URL}/`,
    telephone: business.phone,
    email: business.email,
    image: SHARE_IMAGE,
    logo: `${SITE_URL}/favicon-512.png`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: streetAddress(),
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: business.hours.openDays.map((d) => DAY_NAMES[d]).filter(Boolean),
        opens: business.hours.opens,
        closes: business.hours.closes,
      },
    ],
    areaServed,
    sameAs: [business.social.instagram.url],
    knowsAbout: ['Architectural planning', 'Interior design', 'Building elevation', 'Turnkey construction', 'Corporate office interiors'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.summary,
          serviceType: s.discipline,
          provider: { '@id': businessId },
          areaServed,
        },
        ...(s.ratePerSqft !== null
          ? {
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                priceCurrency: 'INR',
                price: s.ratePerSqft,
                unitText: 'per square foot, indicative',
              },
            }
          : {}),
      })),
    },
  };
  if (business.geo) {
    localBusiness['geo'] = {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      localBusiness,
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: business.legalName,
        publisher: { '@id': businessId },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: 'Architects & Interior Designers in Vadodara | Unity Quickkraft Pvt Ltd',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': businessId },
        primaryImageOfPage: SHARE_IMAGE,
        inLanguage: 'en-IN',
      },
    ],
  };
}

export function LocalBusinessSchema() {
  const json = useMemo(() => JSON.stringify(buildGraph()), []);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
