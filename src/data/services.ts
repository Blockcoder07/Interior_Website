import type { Category } from '@/types/project';

type TagTone = 'brass' | 'verdigris';

/** Service catalogue — Section 1. Real data; use exactly. */
export interface ServiceDef {
  category: Category;
  /** Row label in the catalogue: 'Flat', 'Commercial Buildings'. */
  label: string;
  /** Singular, sentence case, for tags and headings: 'Residential flat'. */
  name: string;
  discipline: string;
  /** ₹ per sq ft, or null when on enquiry. */
  ratePerSqft: number | null;
  tone: TagTone;
  /** One line for the category page intro. */
  summary: string;
}

export const services: readonly ServiceDef[] = [
  {
    category: 'residential-flat',
    label: 'Flat',
    name: 'Residential flat',
    discipline: 'Architectural planning',
    ratePerSqft: null,
    tone: 'brass',
    summary: 'Planning and interiors for 2, 3 and 4 BHK flats, drawn room by room.',
  },
  {
    category: 'commercial-building',
    label: 'Commercial Buildings',
    name: 'Commercial building',
    discipline: 'Architectural elevation',
    ratePerSqft: 1500,
    tone: 'verdigris',
    summary: 'Elevation and planning for shops, arcades and mixed-use blocks.',
  },
  {
    category: 'industrial-project',
    label: 'Industrial Projects',
    name: 'Industrial project',
    discipline: 'Manufacturing company sheds and plants',
    ratePerSqft: 1100,
    tone: 'verdigris',
    summary: 'Sheds, plants and admin blocks for manufacturing companies.',
  },
  {
    category: 'interior-turnkey',
    label: 'Interior Turnkey Projects',
    name: 'Interior turnkey',
    discipline: 'Conceptualised interior',
    ratePerSqft: 1400,
    tone: 'brass',
    summary: 'Concept to handover: joinery, finishes, lighting and furniture, executed by one team.',
  },
  {
    category: 'corporate-office',
    label: 'Corporate Offices',
    name: 'Corporate office',
    discipline: 'Bank, corporate office, admin block',
    ratePerSqft: 1800,
    tone: 'verdigris',
    summary: 'Banks, corporate offices and admin blocks, planned for how the staff actually work.',
  },
  {
    category: 'construction-turnkey',
    label: 'Construction Turnkey',
    name: 'Construction turnkey',
    discipline: 'Architectural planning through execution',
    ratePerSqft: 1600,
    tone: 'verdigris',
    summary: 'From planning drawings to a finished building, with one point of responsibility.',
  },
] as const;

export const RATE_DISCLAIMER = 'Rates are indicative and confirmed after a site visit.';

export function getService(category: Category): ServiceDef {
  const s = services.find((x) => x.category === category);
  if (!s) throw new Error(`Unknown service category: ${category}`);
  return s;
}

export function isCategory(value: string): value is Category {
  return services.some((s) => s.category === value);
}
