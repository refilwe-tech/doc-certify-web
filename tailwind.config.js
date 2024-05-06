/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Helvetica", "sans-serif"],
    },
    extend: {
      animation: {
        typewriter: "typewriter 2s steps(6) forwards",
      },
      keyframes: {
        typewriter: {
          to: {
            left: "100%",
          },
        },
      },
      colors: {
        primary: "#1E2D40",
        secondary: "#456B9A",
        gray: "#D9D9D9",
        "light-gray": "#F2F2F2",
        app: "#E4E4E4",
      },
    },
  },
  plugins: [],
};
