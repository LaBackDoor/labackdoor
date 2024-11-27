/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.4rem",
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      fontWeight: {
        thin: '50',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      fontFamily: {
        sans: ['Druk','Akzidenz Grotesk', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        akzidenz: ['Akzidenz Grotesk', 'sans-serif'],
        druk: ['Druk', 'sans-serif'],
      },
      backgroundColor: {
        primary: {
          main: "#3A4135",   // blackOlive
          button: {
            main: "#C2A87A",
            hover: "#B3A489",
            border: "#CAAA73",
            transparent: "#A5A097"
          },
          text: {
            main: "#FFFFF0"
          }
        },
        secondary: {
          main: "#E7ECEF",   // antiFlashWhite
          button: {
            main: "#8B8C89",
            hover: "#8A8A8A",
            border: "#8E957E",
            transparent: "#8B9787"
          },
          text: {
            main: "#6096BA"
          }
        },
        tertiary: {
          main: "#000017",   // richBlack
          button: {
            main: "#DDCECD",
            hover: "#7E78D2",
            border: "#E2CCCA",
            transparent: "#D7D5D5"
          },
          text: {
            main: "#7E78D2"
          }
        },
        gunMetal: {
          main: "#1B2432",
          button: {
            main: "#",
            hover: "#",
            border: "#",
            transparent: "#"
          },
          text: {
            main: "#"
          }
        },
        raisinBlack: {
          main: "#2C2B3C",
          button: {
            main: "#",
            hover: "#",
            border: "#",
            transparent: "#"
          },
          text: {
            main: "#"
          }
        }
      },
    },
  },
  plugins: [],
}