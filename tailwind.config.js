/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      backgroundColor: {
        primary: {
          main: "#0a192f",
          button: {
            main: "#3054cc",
            hover: "#1a3eb4",
            light: "#3054cc63",
            transparent: "#2D3C68"
          }
        },
        secondary: {
          main: "#2e294e",
          button: {
            main: "#2e294e",
            hovered: "#3a3561",
            border: "#2e294e",
            light: "#3a35619e"
          }
        },
        tertiary: {
          main: "#0a192f",
          side: "#303F6B",
          button: {
            main: "#0a192fe0",
            hovered: "#0a192f",
            border: "#0a192f"
          }
        },
        tertiary: {
          main: "#0a192f",
          button: {
            main: "#0a192f",
            hovered: "#0a192f",
            border: "#0a192f"
          }
        }
      },
    },
  },
  plugins: [],
}

