import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      base: ["Binggrae"],
      password: ["Pretendard-Regular"],
    },
    extend: {
      colors: {
        comment: "#898C96",
        border: "#EEEEF0",
        primary: "#00D4B7",
        background: {
          primary: "#00D4B733",
        },
      },
    },
    width: {
      sign: "500px",
    },
  },
  plugins: [],
};
export default config;
