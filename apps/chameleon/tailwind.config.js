const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        green: {
          50: '#effef3',
          100: '#dafee5',
          200: '#b8facb',
          300: '#81f4a4',
          400: '#2ce263',
          500: '#1acd51',
          600: '#0faa3e',
          700: '#108535',
          800: '#12692e',
          900: '#115628',
          950: '#033013',
        },
        pink: {
          50: '#fff0f2',
          100: '#ffe2e7',
          200: '#ffcad5',
          300: '#ff9fb2',
          400: '#ff698b',
          500: '#ff4271',
          600: '#ed1152',
          700: '#c80846',
          800: '#a80941',
          900: '#8f0c3e',
          950: '#50011d',
        },

        blue: {
          50: '#eafeff',
          100: '#cbf9ff',
          200: '#9ef2ff',
          300: '#5be6ff',
          400: '#29d4ff',
          500: '#00b2e5',
          600: '#008dc0',
          700: '#03709b',
          800: '#0d5a7d',
          900: '#104b69',
          950: '#033049',
        },
        red: {
          50: '#fff0f0',
          100: '#ffdddd',
          200: '#ffc1c1',
          300: '#ff9595',
          400: '#ff5959',
          500: '#ff2626',
          600: '#fc0606',
          700: '#e60000',
          800: '#af0505',
          900: '#900c0c',
          950: '#500000',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
