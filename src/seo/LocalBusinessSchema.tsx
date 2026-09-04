import { useMemo } from 'react';
import { business, streetAddress } from '@/data/business';

/**
 * JSON-LD LocalBusiness — Section 12. Generated from `business.ts`,
 * never hand-written twice. Rendered once from the root layout.
 */
function buildLocalBusiness(): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.legalName,
    telephone: business.phone,
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
        opens: business.hours.opens,
        closes: business.hours.closes,
      },
    ],
    areaServed: [...business.citiesServed],
    sameAs: [business.social.instagram.url],
  };
  if (business.geo) {
    schema['geo'] = {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    };
  }
  return schema;
}

export function LocalBusinessSchema() {
  const json = useMemo(() => JSON.stringify(buildLocalBusiness()), []);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
