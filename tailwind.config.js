const { colors } = require(`tailwindcss/defaultTheme`)

module.exports = {
  darkMode: "class",
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: colors.stone,
      },
      container: {
        center: true,
        padding: {
          default: "1rem",
          md: "2rem",
        },
      },
    },
  },
}
