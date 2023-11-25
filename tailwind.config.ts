import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f7941e",
        background: "#000000",
        secondary: "#007700",
        accent: "#777",
      },
      backgroundImage: {
        "primary-linear":
          "linear-gradient(90deg,#de6a00 4.14%,#ec9100 59.46%,#f7b100 94.28%)",
        "primary-linear-reverse":
          "linear-gradient(90deg, #f7b100 4.14%, #ec9100 59.46%, #de6a00 94.28%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
