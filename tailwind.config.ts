import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss/types/config";
import { skeleton } from "@skeletonlabs/tw-plugin";
import { purple, fuchsia, sky, indigo } from "tailwindcss/colors";

const pickSocialColors = (colors: Record<string, string>) => {
  return {
    "300": colors["300"],
    "400": colors["400"],
    "500": colors["500"],
  };
};

export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {},
    extend: {
      colors: {
        email: pickSocialColors(purple),
        github: pickSocialColors(fuchsia),
        twitter: pickSocialColors(sky),
        discord: pickSocialColors(indigo),
      },
      fontFamily: {
        sans: ["Work Sans Variable", ...fontFamily.sans],
      },
      keyframes: {
        blink: {
          "from, to": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
        },
      },
      animation: {
        blink: "750ms blink step-end infinite",
      },
    },
  },
  plugins: [
    skeleton({
      base: true,
      themes: {
        preset: [{ name: "wintry", enhancements: true }],
      },
    }),
  ],
  experimental: {
    optimizeUniversalDefaults: true,
  },
} satisfies Config;
