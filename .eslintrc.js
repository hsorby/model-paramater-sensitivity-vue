module.exports = {
  root: true,
  env: {
    node: true,
  },
  "plugins": ["prettier"],
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier",
    "prettier/vue"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": "error"
  },
};
