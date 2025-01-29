/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#b785f4",
          secondary: "#f3fc8a",
          "base-content": "#30353e",
          "info-content": "#737373",
          accent: "#fff122",
          neutral: "#f3f4f4",
          "base-100": "#ffffff",
          "base-200": "#f5f5f5",
          "base-300": "#eaeaea",
          info: "#404040",
          success: "#16a34a",
          warning: "#d97706",
          error: "#dc2626",
        },
      },
      {
        dark: {
          primary: "#b785f4", // primaryt color
          secondary: "#f3fc8a", // secundary color complementarit to primry
          "base-content": "#f3f4f4", //base text
          "info-content": "#737373", //secundary text
          accent: "#f3fc8a", // small areas to stick out
          neutral: "#262a32",
          "base-100": "#20232b",
          "base-200": "#1d1e24",
          "base-300": "#16171b", //
          info: "#f3f4f4", //
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
    darkMode: "class",
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
};
