/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-standard": "#F5F5F7",
        "primary-white": "#FAFAFB",
        "primary-dark": "#FFFFFF",
        "primary-light": "#181D29",
        "secondary-standard": "#5BC06B",
        "secondary-dark": "#6B9070",
        "secondary-light": "#E5F5E7",
        "tertiary-standard": "#A48105",
        "tertiary-dark": "#EDC74C",
        "tertiary-light": "#FFF5D1",
        "base-100": "#181D29",
        "base-80": "#464A54",
        "base-60": "#74777F",
        "base-40": "#A3A5A9",
        "base-10": "#E1E1E4",
      },
    },
  },
  plugins: [],
};
