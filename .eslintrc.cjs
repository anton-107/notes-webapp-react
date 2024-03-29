module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "simple-import-sort",
    "eslint-plugin-eslint-comments",
  ],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-duplicate-imports": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "eslint-comments/no-unused-disable": "error",
    "max-depth": ["error", 3],
    "max-nested-callbacks": ["error", 3],
    "max-lines-per-function": ["error", 150],
    "max-statements": ["error", 20],
    "max-params": ["error", 3],
  },
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.test.tsx", "**/*.dev.ts"],
      rules: {
        "max-lines-per-function": "off",
        "max-statements": "off",
        "max-nested-callbacks": "off",
      },
    },
  ],
};
