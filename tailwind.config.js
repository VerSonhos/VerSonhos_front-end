/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          deafult: "#FFFFFF",
          100: "#FFFFFF1A",
          200: "#FFFFFF4D",
          300: "#FFFFFF80",
          400: "#FFFFFFB3",
          500: "#FFFFFFE6",
        },
        secundary: {
          deafult: "#000000",
          100: "#0000001A",
          200: "#0000004D",
          300: "#00000080",
          400: "#000000B3",
          500: "#000000E6",
        },
        tertiary: {
          deafult: "#3184EF",
          100: "#3184EF1A",
          200: "#3184EF4D",
          300: "#3184EF80",
          400: "#3184EFB3",
          500: "#3184EFE6",
        },
        quaternary: {
          deafult: "#327FE1",
          100: "#327FE11A",
          200: "#327FE14D",
          300: "#327FE180",
          400: "#327FE1B3",
          500: "#327FE1E6",
        },
        quintenary: {
          deafult: "#03184F",
          100: "#03184F1A",
          200: "#03184F4D",
          300: "#03184F80",
          400: "#03184FB3",
          500: "#03184FE6",
        },
        sixth: {
          deafult: "#4AB5B4",
          100: "#4AB5B41A",
          200: "#4AB5B44D",
          300: "#4AB5B480",
          400: "#4AB5B4B3",
          500: "#4AB5B4E6",
        },
        seventh: {
          deafult: "#8BCDCC",
          100: "#8BCDCC1A",
          200: "#8BCDCC4D",
          300: "#8BCDCC80",
          400: "#8BCDCCB3",
          500: "#8BCDCCE6",
        },
        Ninth: {
          deafult: "#3B3B3B",
          100: "#3B3B3B1A",
          200: "#3B3B3B4D",
          300: "#3B3B3B80",
          400: "#3B3B3BB3",
          500: "#3B3B3BE6",
        },
        Tenth: {
          deafult: "#F6F9F9",
          100: "#F6F9F91A",
          200: "#F6F9F94D",
          300: "#F6F9F980",
          400: "#F6F9F9B3",
          500: "#F6F9F9E6",
        },
      },
      fontFamily: {
        fredoka: ['fredoka', 'sans-serif'],
        inter: ['inter', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}
