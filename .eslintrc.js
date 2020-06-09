module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  overrides: [
    {
      files: ['./test/unit/**/*.spec.ts'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
    },
    {
      files: ['./test/e2e/**/*.spec.js'],
      env: {
        'cypress/globals': true,
      },
      plugins: ['cypress', 'chai-friendly'],
    },
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:cypress/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    parser: "babel-eslint",
    project: "./tsconfig.json",
    sourceType: "module",
    createDefaultProgram: true,
  },
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
  rules: {
    "prettier/prettier": ["warn"],
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/no-var-requires": 0,
    // "@typescript-eslint/unbound-method": [
    //   "error",
    //   {
    //     "ignoreStatic": true
    //   }
    // ]
  },
};
