import type { Config } from 'tailwindcss';

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
        '2xl': '1200px',
      },
    },
    extend: {
      screens: {
        mobile: { min: '375px', max: '767px' }, // 모바일은 최대 767px까지
        tablet: { min: '768px', max: '1023px' }, // 태블릿은 768px 이상 1023px 이하
        desktop: { min: '1024px' }, // 데스크탑은 1024px 이상
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        base: '0px 4px 20px rgba(80, 82, 127, 0.1)',
        md: '0px 4px 24px rgba(26, 33, 81, 0.24)',
        lg: '0px 4px 24px rgba(48, 57, 102, 0.64)',
        xl: '0px 4px 24px rgba(26, 33, 81, 0.16)',
      },

      fontSize: {
        '6xl': [
          '42px',
          {
            lineHeight: '54px',
          },
        ],
        '5xl': [
          '32px',
          {
            lineHeight: '46px',
          },
        ],
        '4xl': [
          '24px',
          {
            lineHeight: '34px',
          },
        ],
        '3xl': [
          '20px',
          {
            lineHeight: '30px',
          },
        ],
        '2xl': [
          '18px',
          {
            lineHeight: '28px',
          },
        ],
        xl: [
          '17px',
          {
            lineHeight: '27px',
          },
        ],
        lg: [
          '16px',
          {
            lineHeight: '26px',
          },
        ],
        base: [
          '15px',
          {
            lineHeight: '25px',
          },
        ],
        sm: [
          '14px',
          {
            lineHeight: '21px',
          },
        ],
        xs: [
          '13px',
          {
            lineHeight: '20px',
          },
        ],
        '2xs': [
          '12px',
          {
            lineHeight: '18px',
          },
        ],
      },
      colors: {
        red: {
          700: '#D63A43',
          500: '#F03843',
          100: '#FDE7E8',
        },
        blue: {
          100: '#E4E8FF',
          300: '#8999FD',
          500: '#576DFC',
          900: '#4153CB',
        },
        green: {
          100: '#EAFAF5',
          300: '#D6F6E9',
          500: '#7FCFB7',
          900: '#13A478',
          point: '#51E8BA',
        },
        gray: {
          50: '#F6F7FB',
          100: '#F0F0F5',
          200: '#E6E6EF',
          300: '#D1D3E1',
          400: '#B9BCCC',
          500: '#888CA0',
          600: '#636572',
          700: '#3E404B',
          800: '#2B2D35',
          900: '#25272F',
        },
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
        md: '20px',
        sm: '8px',
        base: '12px',
      },
      backgroundImage: {
        hero: "url('/images/hero.png')",
        'loading-skeleton':
          'linear-gradient(to right, transparent 0%, #eee 50%, transparent 100%)',
      },
      backgroundSize: {
        custom: '50% 100%',
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
        shimmer: {
          '0%': { transform: 'skewX(-30deg) translateX(-100%)' },
          '100%': { transform: 'skewX(-30deg) translateX(200%)' },
        },
        'cheering-animation': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 1.5s infinite linear',
        'cheering-animation':
          'cheering-animation 1.5s linear ease-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
} satisfies Config;

export default config;
