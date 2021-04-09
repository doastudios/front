const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["public/**/*.html", "src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        blau: "#0000fe",
      },
      container: (theme) => ({
        center: true,
        padding: {
          default: theme("spacing.4"),
          sm: theme("spacing.5"),
          lg: theme("spacing.6"),
          xl: theme("spacing.8"),
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
