// This configuration only applies to the package manager root.
// /** @type {import("eslint").Linter.Config} */
// module.exports = {
// extends: ["@repo/eslint-config/library.js"],
// parser: "@typescript-eslint/parser",
// parserOptions: {
//   project: true,
// },
// };

module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@next/next/recommended",
  ],
  plugins: ["@next/next"],
  rules: {
    // Your ESLint rules here
  },
};
