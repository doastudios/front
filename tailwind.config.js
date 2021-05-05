const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["public/**/*.html", "src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        blau: "#0000fe",
        "slutty-red": "d10010",
        simpson: "#eb5f00",
        tangerine: "#ff9000",
        mustard: "#ffbf00",
        "loud-yellow": "#fff200",
        "r-u-good": "#74ffbe",
        cyan: "#00aeef",
        "hurt-ur-eyes": "#0000ff",
        "black-eye": "#430099",
        "thicc-eggplant": "#430099",
        magenta: "#ec008c",
        pink: "#f57fc5",
      },
      container: (theme) => ({
        center: true,
        padding: {
          default: theme("spacing.4"),
          sm: theme("spacing.5"),
          lg: theme("spacing.6"),
          xl: theme("spacing.8"),
        },
        screen: {
          xl: "2500",
        },
      }),
      fontFamily: {
        baskerville: ["Libre Baskerville"],
      },
      margin: {
        "-full-screen": "-100vh",
        "-100": "-100%",
        "-90": "-80%",
        "-80": "-90%",
        "-70": "-70%",
        "-60": "-60%",
        "-50": "-50%",
        "-40": "-40%",
        "-30": "-30%",
        "-20": "-20%",
        "-10": "-10%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
