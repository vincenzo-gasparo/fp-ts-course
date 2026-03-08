import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Velite generated output
    ".velite/**",
  ]),
  {
    // The Velite MDX pattern creates a component from a pre-compiled code
    // string — it is not dynamic and does not reset state on re-render.
    files: ["src/app/lessons/**/page.tsx"],
    rules: {
      "react-hooks/static-components": "off",
    },
  },
]);

export default eslintConfig;
