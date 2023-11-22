import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-shadow": ` 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 100px 80px rgba(0, 0, 0, 0.12)
      ;`,
      },
      colors: {
        theme_pink: "#D517B8",
        theme_light_pink: "#FF5480",
        themeRed: "#DF2E38",
        themePurple: "#595BD4",
        theme_toast_dark_background: "#15182B",
        themeBlack: "#17181A",
        themeBlue: "#1F6BFF",
        themeYellow: "#E8C547",
        themeLightBlue: "#DEECEC",
        themeLightWhite: "#F3F5F7",
        themeWhite: "#fefefe",
        themeGreen: "#6BF178",
        themeGrey: "#474E68",
        themeLightYellow: "#FBF398",
        themeLightGreen: "#C9FDC7",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        barlow: ["var(--font-barlow)"],
        rubik: ["var(--font-rubik)"],
        poppins: ["var(--font-poppins)"],
        clash_display: ["var(--font-clash-display)"],
        abhaya_libre: ["var(--font-libre)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
