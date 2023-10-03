/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        123: "136rem",
      },
      colors: {
        primary: "#6750A4",
        secondary: "#F7F2FA",
        bg: {
          1: "#DDDDDD",
        },
      },
      fontFamily: {
        body: ["Poppins"],
        title: ["Sail"],
        tabs: ["DM Serif Display"],
      },
    },
  },
  plugins: [],
};
