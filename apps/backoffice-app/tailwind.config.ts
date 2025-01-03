import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      boxShadow: {
        navbar: '0px 2px 5px 0px rgba(0, 0, 0, 0.15)',
        summaryCard: '0 1px 5px 0 rgba(0, 0, 0, 0.05)',
        'custom-light': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'], 
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        sidemenu: 'rgb(16,16,80)',
        sidemenuItem: 'white',
        foreground: 'hsl(var(--foreground))',
        commerceBlack: '#1a1a1a',
        borderGrey: '#E1E2EA', 
        customGray: {
          DEFAULT: "#545978",
          whisper: "#f9f9fb",
          grayishBlue: "#F0F1F5",
          gainsboro: "#dcdcdc",
          placeholder: "#878CAB",
        },
        deepIndigo: '#101050',
        customBlue: {
          selection: "#dddbff",
          sky: "#59b2e9",
          moderate: "#4242B3",
          periwinkle: '#5050BE',
          lavenderMist: '#E6EEFC',
          brightUltramarine: '#5757FF',
          aliceBlue: "#f5fcff"
        },
        lavender: {
          DEFAULT: "#ede8ff",
          light: "#dbd4ff",
          white: "#F1F0FF",
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          common: "#4f4fd8",
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;
