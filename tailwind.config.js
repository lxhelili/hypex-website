/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5e6ff',
          100: '#e6c3ff',
          200: '#d19fff',
          300: '#bc7bff',
          400: '#a557ff',
          500: '#8924e9',
          600: '#7a1fd1',
          700: '#6b1ab9',
          800: '#5c15a1',
          900: '#4d006a',
        },
        secondary: {
          400: '#f350f9',
          500: '#ed07f6',
          600: '#d406db',
          700: '#bb05c0',
          800: '#a204a5',
        },
        hypex: {
          dark: '#4d006a',
          purple: '#8924e9',
          pink: '#ed07f6',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-hypex': 'linear-gradient(135deg, #4d006a 0%, #8924e9 100%)',
        'gradient-hypex-reverse': 'linear-gradient(135deg, #8924e9 0%, #4d006a 100%)',
        'gradient-pink-purple': 'linear-gradient(135deg, #ed07f6 0%, #8924e9 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(137, 36, 233, 0.5)',
        'glow-pink': '0 0 20px rgba(237, 7, 246, 0.6)',
        'glow-pink-lg': '0 0 40px rgba(237, 7, 246, 0.8)',
      },
    },
  },
  plugins: [],
}