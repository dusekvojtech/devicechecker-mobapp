// NOTE: there is some rule duplication because of `extends` behavior
module.exports = {
    extends: ["airbnb-typescript", "airbnb/hooks", "prettier"],
    plugins: ["react-native"],
    parserOptions: {
      project: "./tsconfig.json",
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
  
      // Almost all code checks if the used value is defined
      "react/require-default-props": "off",
      "react/destructuring-assignment": "off",
      // Makes code too verbose
      "react/jsx-props-no-spreading": "off",
      // We don't use prop-types, try to convert .jsx to .tsx
      "react/prop-types": "off",
  
      // New v17 transform does not require React import
      "react/react-in-jsx-scope": "off",
  
      // Harms readability
      "react/state-in-constructor": "off",
  
      // Conflicts with some RN comps
      "react/style-prop-object": "off",
  
      // Harms readability
      "no-plusplus": "off",
      // Omit ForOfStatement from
      // https://github.com/airbnb/javascript/blob/63098cbb6c05376dbefc9a91351f5727540c1ce1/packages/eslint-config-airbnb-base/rules/style.js#L339
      "no-restricted-syntax": [
        "error",
        {
          selector: "ForInStatement",
          message:
            "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
        },
        {
          selector: "LabeledStatement",
          message:
            "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
        },
        {
          selector: "WithStatement",
          message:
            "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
        },
      ],
  
      // Used in floating promises
      "no-void": "off",
  
      // Shouldn't error out in some cases (pluck out a prop)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_.+", argsIgnorePattern: "^_.+" },
      ],
      // Mainly encountered in react-hook-form, works fine there
      "@typescript-eslint/unbound-method": "off",
  
      // Improves code readability
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
  
      // Allow fn && fn()
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true },
      ],
    },
    env: {
      "react-native/react-native": true,
    },
    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx"],
        extends: [
          "plugin:@typescript-eslint/recommended",
          "plugin:@typescript-eslint/recommended-requiring-type-checking",
        ],
        rules: {
          // Shouldn't be just a warning
          "@typescript-eslint/no-explicit-any": "error",
          // Unnecessary, TS should error out on unhandled type changes
          "@typescript-eslint/explicit-module-boundary-types": "off",
          "@typescript-eslint/explicit-function-return-type": "off",
          // Mainly encountered in react-hook-form, works fine there
          "@typescript-eslint/unbound-method": "off",
        },
      },
    ],
  };
  