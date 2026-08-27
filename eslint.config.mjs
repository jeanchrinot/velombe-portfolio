import tsParser from "@typescript-eslint/parser";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import tailwindcss from "eslint-plugin-tailwindcss";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Next.js core web vitals
  ...nextVitals,

  // Next.js TypeScript rules
  ...nextTs,

  // Tailwind + Prettier + shared rules
  {
    plugins: {
      tailwindcss,
    },

    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/jsx-key": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "error",
    },

    settings: {
      tailwindcss: {
        callees: ["cn"],
        config: "tailwind.config.ts",
      },
      next: {
        rootDir: true,
      },
    },
  },

  // TypeScript-specific parser override
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
    },
  },

  // Prettier must be LAST
  prettier,

  // Override default ignores of eslint-config-next
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
