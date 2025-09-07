export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // inside src
    "./pages/**/*.{js,ts,jsx,tsx}", // outside src
    "./components/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}
