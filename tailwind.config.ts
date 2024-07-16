import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      borderWidth: {
        DEFAULT: '2px', // Changing the default border width to 2px
        '1': '1px',     // Adding a custom border width value
      },
    },
  },
  plugins: [],
} satisfies Config;
