import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette';
import resolveConfig from 'tailwindcss/resolveConfig';
import type { PluginAPI } from 'tailwindcss/types/config';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // Custom easing curves (from animations.dev)
      transitionTimingFunction: {
        'ease-in-quad': 'cubic-bezier(.55, .085, .68, .53)',
        'ease-in-cubic': 'cubic-bezier(.550, .055, .675, .19)',
        'ease-in-quart': 'cubic-bezier(.895, .03, .685, .22)',
        'ease-in-quint': 'cubic-bezier(.755, .05, .855, .06)',
        'ease-in-expo': 'cubic-bezier(.95, .05, .795, .035)',
        'ease-in-circ': 'cubic-bezier(.6, .04, .98, .335)',

        'ease-out-quad': 'cubic-bezier(.25, .46, .45, .94)',
        'ease-out-cubic': 'cubic-bezier(.215, .61, .355, 1)',
        'ease-out-quart': 'cubic-bezier(.165, .84, .44, 1)',
        'ease-out-quint': 'cubic-bezier(.23, 1, .32, 1)',
        'ease-out-expo': 'cubic-bezier(.19, 1, .22, 1)',
        'ease-out-circ': 'cubic-bezier(.075, .82, .165, 1)',

        'ease-in-out-quad': 'cubic-bezier(.455, .03, .515, .955)',
        'ease-in-out-cubic': 'cubic-bezier(.645, .045, .355, 1)',
        'ease-in-out-quart': 'cubic-bezier(.77, 0, .175, 1)',
        'ease-in-out-quint': 'cubic-bezier(.86, 0, .07, 1)',
        'ease-in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
        'ease-in-out-circ': 'cubic-bezier(.785, .135, .15, .86)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
    addVariablesForColors,
  ],
} satisfies Config;

// This adds CSS variables for all colors in the color palette
function addVariablesForColors({ addBase, theme }: PluginAPI) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ':root': newVars,
  });
}

// This is the resolved theme object that you can use in your application
export const theme = resolveConfig(config).theme;

export default config;
