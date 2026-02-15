import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // Changed to point to /app directly
    "./components/**/*.{js,ts,jsx,tsx,mdx}"  // Changed to point to /components directly
  ],
  theme: {
    extend: {
      colors: {
        'pit-green': '#15F128',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        oswald: ['var(--font-oswald)'],
      },
    },
  },
  plugins: [],
};
export default config;