/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
        },
        background: {
          DEFAULT: '#ffffff',
          dark: '#121212',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1e1e1e',
        },
        'on-primary': '#ffffff',
        'on-secondary': '#ffffff',
        'on-background': {
          DEFAULT: '#000000',
          dark: '#ffffff',
        },
        'on-surface': {
          DEFAULT: '#000000',
          dark: '#ffffff',
        }
      }
    },
  },
  plugins: [],
}
