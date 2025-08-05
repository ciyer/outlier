import cspellConfigs from "@cspell/eslint-plugin/configs";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierEslint from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import js from "@eslint/js";

export default [
  {
    ignores: ["dist/**", "src-old/**", "vite.config.ts", "vitest.config.ts"],
  },
  cspellConfigs.recommended,
  js.configs.recommended,
  {
    ...typescriptEslint.configs.recommendedTypeChecked,
    ...typescriptEslint.configs.stylisticTypeChecked,
  },
  {
    rules: {
      "@cspell/spellchecker": [
        "warn",
        {
          cspell: {
            ignoreRegExpList: ["http(s)?://[^s]*"],
            ignoreWords: [
              "Bigroll",
              "dtype",
              "durs",
              "Dyneema",
              "Illposed",
              "ipynb",
              "outlierccurl",
              "outliernycurl",
              "Ramielust",
              "sizetext",
              "Strongtwill",
              "TTFB",
              "vegalite",
              "xscale",
              "yscale",
            ],
          },
        },
      ],
    },
  },
  {
    ...prettierEslint,
    ignores: [".react-router/**"],
    rules: {
      "prefer-const": ["warn"],
    },
  },
  reactHooksPlugin.configs["recommended-latest"],
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...jsxA11y.flatConfigs.recommended,
    ...reactPlugin.configs.flat.recommended,
    ...reactPlugin.configs.flat["jsx-runtime"],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
      },
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      parser: tsParser,
    },
    plugins: {
      "jsx-a11y": jsxA11y,
      react: reactPlugin,
    },
    rules: {
      "max-len": ["warn", 120],
      "no-eval": "error",
      "no-console": "warn",
      "max-nested-callbacks": ["warn", 3],
      "no-alert": "error",
      "no-else-return": "warn",
      "jest/expect-expect": "off",
      "eol-last": 1,
      "no-unsafe-finally": "off",
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "none",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: false,
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      "no-unused-vars": ["off"],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "none",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: false,
        },
      ],
    },
  },
  {
    files: [".react-router/**"],
    rules: {
      "max-len": "off",
      "eol-last": "off",
    },
  },
];
