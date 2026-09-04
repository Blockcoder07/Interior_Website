import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label: string;
  /** Hide the label visually (still read by screen readers). */
  hideLabel?: boolean;
  className?: string;
}

/**
 * Native select in the design system's clothes: 2px radius, hairline border,
 * brass on focus. Native so it works on every phone keyboard and screen reader.
 */
export function Select({ label, hideLabel = false, className, id, ...rest }: SelectProps) {
  const selectId = id ?? `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <label htmlFor={selectId} className={cn('flex flex-col gap-1.5', className)}>
      <span className={cn('spec text-graphite', hideLabel && 'sr-only')}>{label}</span>
      <span className="relative">
        <select
          id={selectId}
          {...rest}
          className={cn(
            'h-10 w-full appearance-none rounded border border-hairline bg-paper pl-3 pr-9',
            'font-heading text-ui-sm text-ink',
            'focus:border-brass focus:outline-none',
            'disabled:opacity-40',
          )}
        />
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-graphite"
        >
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    </label>
  );
}
