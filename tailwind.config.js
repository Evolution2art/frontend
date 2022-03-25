module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
  theme: {
    extend: {
      screens: {
        "hover-hover": { raw: "(hover: hover)" },
      },
    },
  },
}
