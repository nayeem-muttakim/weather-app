/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: "Poppins",
    },
    extend: {
      backgroundImage: {
        gradientBg: "url('/src/assets/bg.png')",
      },
      keyframes: {
        shake: {
          "0%": {
            transform: "translate(3px,0)",
          },
          "50%": {
            transform: "translate(-3px,0)",
          },
          "100%": {
            transform: "translate(0,0)",
          },
        },
      },
      animation: {
        shake: "shake 150ms 2 linear",
      },
    },
  },
  plugins: [],
};
