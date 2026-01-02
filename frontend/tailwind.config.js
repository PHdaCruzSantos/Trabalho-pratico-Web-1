/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Slate for backgrounds
        background: {
          light: '#f8fafc', // slate-50
          dark: '#0f172a',  // slate-900
        },
        surface: {
          light: '#ffffff',
          dark: '#1e293b',  // slate-800
        },
        // Violet for primary actions
        primary: {
          light: '#7c3aed', // violet-600
          DEFAULT: '#8b5cf6', // violet-500
          dark: '#a78bfa',  // violet-400
        },
        // Cyan for secondary accents
        secondary: {
          light: '#06b6d4', // cyan-500
          DEFAULT: '#22d3ee', // cyan-400
          dark: '#67e8f9',  // cyan-300
        },
        // Semantic colors
        success: '#10b981', // emerald-500
        warning: '#f59e0b', // amber-500
        error: '#ef4444',   // red-500
        
        // Text colors
        'on-background': {
          light: '#0f172a', // slate-900
          dark: '#f1f5f9',  // slate-100
        },
        'on-surface': {
          light: '#334155', // slate-700
          dark: '#cbd5e1',  // slate-300
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animated'),
  ],
}
