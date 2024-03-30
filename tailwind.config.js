/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E2D40",
        secondary: "#456B9A",
        accent: "#456B9A",
        gray: "#D9D9D9",
        "light-gray": "#F2F2F2",
      },
    },
  },
  plugins: [],
};
