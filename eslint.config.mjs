import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off", 
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "off"
    },
  },
  {
    files: ["**/*.js"],
    rules: {
      "no-console": "warn", 
    },
  },
];

// Export the ESLint configuration
export default eslintConfig;
