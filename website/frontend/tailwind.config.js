/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Set Inter as default font
        inter: ["Inter", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        librefranklin: ["Libre Franklin", "sans-serif"],
      },
      colors: {
        primary: "#0c2340",
        accent: "#AE9142",
      },
      animation: {
        marquee: "marquee 15s linear infinite", // Add the marquee animation
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" }, // Starts from the right
          "100%": { transform: "translateX(-100%)" }, // Ends at the left
        },
      },
      screens: {
        xs: "500px", // custom breakpoint for 500px
      },
    },
  },
  plugins: [],
};
