/** @type {import('tailwindcss').Config} */

// Palette values live in src/styles/index.css as CSS variables.
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // hover: styles only on devices that can hover, so touch screens never get stuck states.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      ink: v('ink'),
      graphite: v('graphite'),
      cement: v('cement'),
      chalk: v('chalk'),
      paper: v('paper'),
      brass: v('brass'),
      verdigris: v('verdigris'),
      red: v('red'),
      'red-hover': v('red-hover'),
      band: v('band'),
      blush: v('blush'),
      hairline: 'var(--hairline)',
      'hairline-dark': 'var(--hairline-dark)',
      green: { 400: '#4ade80' },
    },
    fontFamily: {
      heading: ['Poppins', 'system-ui', 'sans-serif'],
      body: ['Poppins', 'system-ui', 'sans-serif'],
      mono: ['Poppins', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      display: ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' }],
      h1: ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', fontWeight: '600' }],
      h2: ['clamp(1.625rem, 2.5vw, 2.25rem)', { lineHeight: '1.2', fontWeight: '600' }],
      h3: ['1.25rem', { lineHeight: '1.35', fontWeight: '600' }],
      body: ['1rem', { lineHeight: '1.75' }],
      'body-sm': ['0.9375rem', { lineHeight: '1.7' }],
      spec: ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
      'spec-lg': ['1rem', { lineHeight: '1.5', fontWeight: '500' }],
      ui: ['0.9375rem', { lineHeight: '1.3', fontWeight: '500' }],
      'ui-sm': ['0.8125rem', { lineHeight: '1.3', fontWeight: '500' }],
    },
    borderRadius: {
      none: '0',
      DEFAULT: '4px',
      sm: '4px',
      lg: '8px',
      full: '9999px',
    },
    extend: {
      spacing: {
        'section-sm': '4rem',
        'section-lg': '6rem',
        'gutter-sm': '6px',
        'gutter-lg': '16px',
      },
      maxWidth: {
        prose: '72ch',
        site: '80rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        soft: 'cubic-bezier(0.4, 0, 0.2, 1)',
        draw: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        instant: '150ms',
        quick: '240ms',
        base: '400ms',
        slow: '700ms',
        scene: '1200ms',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
};
