import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'quiet';
type Size = 'md' | 'sm';

interface Common {
  variant?: Variant;
  size?: Size;
  /** 'dark' when the button sits on a dark surface or photograph. */
  tone?: 'light' | 'dark';
  className?: string;
  children: ReactNode;
}

interface AsRouterLink extends Common {
  to: string;
  href?: never;
}

interface AsAnchor extends Common {
  href: string;
  to?: never;
  external?: boolean;
}

interface AsButton extends Common, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  to?: never;
  href?: never;
}

export type ButtonProps = AsRouterLink | AsAnchor | AsButton;

const base =
  'inline-flex items-center justify-center gap-2 rounded font-heading font-medium leading-none uppercase tracking-[0.04em] ' +
  'transition-colors duration-instant ease-soft select-none whitespace-nowrap ' +
  'disabled:cursor-not-allowed disabled:opacity-40';

/** Red primary, gold outline secondary. */
const variants: Record<'light' | 'dark', Record<Variant, string>> = {
  light: {
    primary: 'bg-red text-white hover:bg-red-hover',
    secondary: 'border border-brass text-brass hover:bg-brass hover:text-white',
    quiet: 'text-brass underline underline-offset-[6px] decoration-1 hover:text-ink px-0 normal-case tracking-normal',
  },
  dark: {
    primary: 'bg-red text-white hover:bg-red-hover',
    secondary: 'border border-white text-white hover:bg-white hover:text-ink',
    quiet: 'text-white underline underline-offset-[6px] decoration-1 hover:text-brass px-0 normal-case tracking-normal',
  },
};

const sizes: Record<Size, string> = {
  md: 'h-12 px-6 text-ui-sm',
  sm: 'h-10 px-4 text-ui-sm',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', tone = 'light', className, children } = props;
  const classes = cn(base, variants[tone][variant], variant === 'quiet' ? 'h-auto' : sizes[size], className);

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }
  if ('href' in props && props.href !== undefined) {
    const external = props.external ?? /^https?:/.test(props.href);
    return (
      <a href={props.href} className={classes} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {children}
      </a>
    );
  }
  const { variant: _v, size: _s, tone: _t, className: _c, children: _ch, ...rest } = props as AsButton;
  return (
    <button type="button" {...rest} className={classes}>
      {children}
    </button>
  );
}
