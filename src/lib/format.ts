/** Indian digit grouping (1,50,000). */
const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

/** 1240 → "1,240 sq ft" */
export function formatSqft(n: number): string {
  return `${inr.format(n)} sq ft`;
}

/** 1500 → "₹1,500 / sq ft" */
export function formatRate(perSqft: number): string {
  return `₹${inr.format(perSqft)} / sq ft`;
}

/** 150000 → "₹1,50,000" */
export function formatInr(n: number): string {
  return `₹${inr.format(n)}`;
}
