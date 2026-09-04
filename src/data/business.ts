/**
 * Single source of truth for the firm's identity. Header, footer, contact
 * block, WhatsApp link and JSON-LD all read this object.
 * NAP (name, address, phone) must match the Google Business Profile.
 */
export const business = {
  legalName: 'Unity Quickkraft Pvt Ltd',
  shortName: 'Unity Quickkraft',
  phone: '+919004390078',
  phoneDisplay: '+91 90043 90078',
  address: {
    line1: 'TF-28, Earth EON',
    line2: 'Opp. Urmi School, Near Sama Lake',
    city: 'Vadodara',
    state: 'Gujarat',
    postalCode: '390018',
    country: 'IN',
  },
  hours: { opens: '09:00', closes: '19:30', days: 'Monday – Saturday' }, // TODO: confirm days and Sunday hours
  foundedYear: 2016, // TODO: confirm with client
  email: 'unityquickkraft@gmail.com',
  citiesServed: ['Vadodara', 'Ahmedabad', 'Anand'],
  social: {
    instagram: {
      handle: '@unity_quickkraft_design_studio',
      url: 'https://www.instagram.com/unity_quickkraft_design_studio/',
    },
    // TODO: confirm with client — set to the page URLs or leave null to hide.
    facebook: null as string | null,
    linkedin: null as string | null,
  },
  projectsDelivered: 200, // TODO: confirm the real count
  positioning:
    'Unity has one stop solution for residential and commercial space creation — interior designing, 3D planning, layout and turnkey projects.',
  geo: null as { lat: number; lng: number } | null, // TODO: office coordinates
} as const;

/** Street address as one line, used by JSON-LD and the directions link. */
export function streetAddress(): string {
  return `${business.address.line1}, ${business.address.line2}`;
}

/** Full postal address as one line. */
export function fullAddress(): string {
  const a = business.address;
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.state} ${a.postalCode}, India`;
}

export function telHref(): string {
  return `tel:${business.phone}`;
}

export function whatsappHref(message?: string): string {
  const number = business.phone.replace(/^\+/, '');
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function directionsHref(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress())}`;
}
