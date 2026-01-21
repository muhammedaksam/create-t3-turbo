import baseConfig from "@acme/prettier-config";

/** @type {import("prettier").Config} */
const config = {
  ...baseConfig,
  plugins: [...(baseConfig.plugins || []), "prettier-plugin-sort-json"],
  jsonRecursiveSort: true,
};

export default config;
