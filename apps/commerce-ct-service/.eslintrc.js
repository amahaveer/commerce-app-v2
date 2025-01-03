/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/library.js"], // Extend from the shared config in your repo
  parser: "@typescript-eslint/parser", // Use TypeScript parser
  parserOptions: {
    project: true, // Use project-level settings for TypeScript
  },
  env: {
    node: true, // Enable Node.js global variables and scope
    jest: true, // Enable Jest globals if you are using Jest for testing
  },
};
