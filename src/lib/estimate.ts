import type { Category } from '@/types/project';
import { getService } from '@/data/services';
import { formatInr, formatRate, formatSqft } from '@/lib/format';

export interface Estimate {
  low: number;
  high: number;
  ratePerSqft: number;
}

/**
 * Indicative range: area × rate to area × rate + 20% — Section 6.6.
 * Null when the category is on enquiry or the area is not usable.
 */
export function estimate(category: Category | undefined, areaSqft: number): Estimate | null {
  if (!category) return null;
  const rate = getService(category).ratePerSqft;
  if (rate === null || !Number.isFinite(areaSqft) || areaSqft <= 0) return null;
  const low = areaSqft * rate;
  return { low, high: low * 1.2, ratePerSqft: rate };
}

export function formatEstimate(e: Estimate): string {
  return `${formatInr(Math.round(e.low))} – ${formatInr(Math.round(e.high))}`;
}

interface EnquiryFields {
  name?: string | undefined;
  city?: string | undefined;
  category?: Category | undefined;
  areaSqft?: number | undefined;
  message?: string | undefined;
}

/** Prefilled WhatsApp text carrying the city, category and area — Section 6.6. */
export function enquiryMessage(f: EnquiryFields): string {
  const lines: string[] = ['Hello Unity Quickkraft,'];
  const what = f.category ? getService(f.category).name.toLowerCase() : 'a project';
  const where = f.city ? ` in ${f.city}` : '';
  lines.push(`I am enquiring about ${what}${where}.`);
  if (f.areaSqft && f.areaSqft > 0) {
    const rate = f.category ? getService(f.category).ratePerSqft : null;
    lines.push(`Approximate area: ${formatSqft(f.areaSqft)}${rate ? ` (site rate ${formatRate(rate)})` : ''}.`);
  }
  if (f.message?.trim()) lines.push(f.message.trim());
  if (f.name?.trim()) lines.push(`— ${f.name.trim()}`);
  return lines.join('\n');
}
