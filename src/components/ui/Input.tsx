import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// 16px on phones and tablets so iOS Safari does not zoom the page when a field is focused.
const field =
  'w-full rounded border border-hairline bg-paper px-3 font-body text-body-sm max-md:text-[1rem] text-ink placeholder:text-cement ' +
  'focus:border-brass focus:outline-none aria-[invalid=true]:border-brass';

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
}

type InputProps = FieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export function Input({ label, hint, error, className, id, ...rest }: InputProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <label htmlFor={inputId} className={cn('flex flex-col gap-1.5', className)}>
      <span className="spec text-graphite">{label}</span>
      <input id={inputId} {...rest} aria-invalid={error ? true : undefined} className={cn(field, 'h-11')} />
      {error ? <span className="text-body-sm text-brass">{error}</span> : hint ? <span className="spec text-cement">{hint}</span> : null}
    </label>
  );
}

type TextareaProps = FieldProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>;

export function Textarea({ label, hint, error, className, id, ...rest }: TextareaProps) {
  const inputId = id ?? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <label htmlFor={inputId} className={cn('flex flex-col gap-1.5', className)}>
      <span className="spec text-graphite">{label}</span>
      <textarea id={inputId} {...rest} aria-invalid={error ? true : undefined} className={cn(field, 'min-h-[7rem] py-2.5')} />
      {error ? <span className="text-body-sm text-brass">{error}</span> : hint ? <span className="spec text-cement">{hint}</span> : null}
    </label>
  );
}
