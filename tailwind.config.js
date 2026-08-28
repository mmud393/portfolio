/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg-primary)',
        'background-secondary': 'var(--color-bg-secondary)',
        'background-tertiary': 'var(--color-bg-tertiary)',

        foreground: 'var(--color-text-primary)',
        'foreground-secondary': 'var(--color-text-secondary)',
        muted: 'var(--color-text-muted)',
        subtle: 'var(--color-text-subtle)',

        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        'surface-hover': 'var(--color-surface-hover)',

        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',
        'border-featured': 'var(--color-border-featured)',

        blue: {
          DEFAULT: 'var(--color-blue)',
          dark: 'var(--color-blue-dark)',
          light: 'var(--color-blue-light)',
          lighter: 'var(--color-blue-lighter)',
        },
        violet: {
          DEFAULT: 'var(--color-violet)',
          dark: 'var(--color-violet-dark)',
          light: 'var(--color-violet-light)',
        },
        cyan: {
          DEFAULT: 'var(--color-cyan)',
          light: 'var(--color-cyan-light)',
          lighter: 'var(--color-cyan-lighter)',
        },
        emerald: {
          DEFAULT: 'var(--color-emerald)',
          dark: 'var(--color-emerald-dark)',
          light: 'var(--color-emerald-light)',
        },

        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',

        // Legacy aliases used by existing components.
        primary: 'var(--color-blue)',
        secondary: 'var(--color-violet)',
        accent: 'var(--color-emerald)',
        card: 'var(--color-surface)',

        navbar: 'rgba(3, 7, 18, 0.78)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563EB, #7C3AED)',
        'gradient-text': 'linear-gradient(90deg, #60A5FA, #8B5CF6)',
        'gradient-spectrum': 'linear-gradient(90deg, #22D3EE, #3B82F6, #8B5CF6)',
        'gradient-contact': 'linear-gradient(120deg, #06B6D4, #2563EB, #7C3AED)',
        'gradient-conic-tech': 'conic-gradient(from 180deg, #06B6D4, #3B82F6, #8B5CF6, #06B6D4)',
        'grid-pattern':
          'linear-gradient(rgba(148, 163, 184, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.025) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      boxShadow: {
        glow: '0 0 60px -10px var(--glow-blue)',
        'glow-lg': '0 0 100px -20px var(--glow-violet)',
        'glow-emerald': '0 0 30px -5px var(--glow-emerald)',
        'glow-cyan': '0 0 50px -10px var(--glow-cyan)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        orbit: 'orbit 20s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}
