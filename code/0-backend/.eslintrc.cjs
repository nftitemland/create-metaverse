module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    module: true,
    require: true,
    process: true,
    exports: true,
    Buffer: true,
    __dirname: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-constant-condition": ["error", { checkLoops: false }],
    // indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    // quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
