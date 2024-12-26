/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#299D91",
          secondary: "#00d100",
          accent: "#191919",
          neutral: "#878787",
          "base-100": "#F4F5F7",
          "base-200": "#F6F6F6",
          info: "#00e1ff",
          success: "#4DAF6E",
          warning: "#ff942e",
          error: "#E73D1C",
        },
      },
    ],
  },
}

