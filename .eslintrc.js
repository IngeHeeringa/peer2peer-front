module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["xo", "prettier"],
  overrides: [
    {
      extends: ["xo-typescript", "prettier"],
      files: ["*.ts"],
      rules: {
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ],
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "property",
            format: ["strictCamelCase"],
            filter: {
              regex: "^(Authorization|Content-Type)$",
              match: false,
            },
          },
        ],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "new-cap": [
      "error",
      {
        capIsNewExceptions: [
          "NgModule",
          "Component",
          "Injectable",
          "Inject",
          "Input",
        ],
      },
    ],
  },
};
