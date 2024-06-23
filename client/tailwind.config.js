/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxsm: "332px",
        xsm: "432px",
        xlplus: "1400px",
      },
    },
  },
  plugins: [],
};
