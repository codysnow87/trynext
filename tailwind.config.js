// tailwind.config.js
import { nextui } from '@nextui-org/theme';

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/mina-scheduler/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
