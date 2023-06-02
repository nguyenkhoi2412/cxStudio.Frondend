// npm i flowbite tailwindcss autoprefixer postcss postcss-loader postcss-preset-env
module.exports = {
  // add the folders and files from your templates
  // content: ["./layouts/**/*.html", "./content/**/*.md", "./content/**/*.html", "./src/**/*.js"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  // make sure to safelist these classes when using purge
  safelist: [
    "w-64",
    "w-1/2",
    "rounded-l-lg",
    "rounded-r-lg",
    "bg-gray-200",
    "grid-cols-4",
    "grid-cols-7",
    "h-6",
    "leading-6",
    "h-9",
    "leading-9",
    "shadow-lg",
  ],
  // enable dark mode via class strategy
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-light": "#F7F8FC",
        "secondary-light": "#FFFFFF",
        "ternary-light": "#f6f7f8",

        "primary-dark": "#0D2438",
        "secondary-dark": "#102D44",
        "ternary-dark": "#1E3851",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "5rem",
          xl: "6rem",
          "2xl": "8rem",
        },
      },
    },
  },
  variants: {
    extend: { opacity: ["disabled"] },
  },
  plugins: [require("flowbite/plugin"), "@tailwindcss/forms"],
};
