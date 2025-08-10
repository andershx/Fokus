import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#E0E1EA",
          top: "#F1F2F8"
        },
        text: {
          DEFAULT: "#0E0F13",
          muted: "#5A5B66",
          ghost: "#D3D5DF"
        },
        border: "#E6E8F2",
        primaryA: "#5A9CEA",
        primaryB: "#95CAF6",
        darkA: "#282A35",
        darkB: "#444454"
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)",
        pill: "0 8px 20px rgba(63, 131, 248, 0.25)"
      },
      borderRadius: {
        pill: "9999px"
      }
    }
  },
  plugins: []
} satisfies Config;
