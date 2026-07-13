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
    "legacy/**",
    "india-study-platform/**",
    "summit-gcse-tuition/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated/local artifacts that should never be linted:
    "playwright-report/**",
    ".claude/worktrees/**",
  ]),
]);

export default eslintConfig;
