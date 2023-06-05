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
        // "primary-light": "#673ab7",
        // "secondary-light": "#3f51b5",
        // "ternary-light": "#f6f7f8",

        // "primary-dark": "#0D2438",
        // "secondary-dark": "#102D44",
        // "ternary-dark": "#1E3851",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
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
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      transitionProperty: {
        width: "width",
      },
      textDecoration: ["active"],
      minWidth: {
        kanban: "28rem",
      },
      // // that is animation class
      // animation: {
      //   fade: "fadeOut 5s ease-in-out",
      // },
      // // that is actual animation
      // keyframes: (theme) => ({
      //   fadeOut: {
      //     "0%": { backgroundColor: theme("colors.red.300") },
      //     "100%": { backgroundColor: theme("colors.transparent") },
      //   },
      // }),
    },
  },
  variants: {
    extend: { opacity: ["disabled"] },
  },
  plugins: [require("flowbite/plugin"), "@tailwindcss/forms"],
};
