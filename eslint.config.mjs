import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "public/**",
      "video/out/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": ["warn", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];

export default config;
