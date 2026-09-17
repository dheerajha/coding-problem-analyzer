/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#F7F3E8', dark: '#171B21' },
        grid: { DEFAULT: '#E7DEC8', dark: '#232A34' },
        ink: { DEFAULT: '#21303F', soft: '#3A4A5A', dark: '#E9E4D6', 'dark-soft': '#C7C0AE' },
        pencil: { DEFAULT: '#756E5E', dark: '#8B92A0' },
        red: { DEFAULT: '#B93E27', dark: '#E2694C' },
        card: { DEFAULT: '#FFFEFA', dark: '#1D2229' },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', '"Times New Roman"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
