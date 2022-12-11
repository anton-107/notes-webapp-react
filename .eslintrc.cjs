module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-duplicate-imports": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "max-depth": ["error", 3],
    "max-nested-callbacks": ["error", 3],
    "max-lines-per-function": ["error", 275],
    "max-statements": ["error", 25],
    "max-params": ["error", 3],
  },
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.dev.ts"],
      rules: {
        "max-lines-per-function": "off",
        "max-statements": "off",
        "max-nested-callbacks": "off",
      },
    },
  ],
};
