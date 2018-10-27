module.exports = {
  extends: ["airbnb-base", "plugin:react/recommended", "prettier"],
  plugins: ["react", "prettier", "react-hooks"],
  rules: {
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "bracketSpacing": true,
      "jsxBracketSameLine": true,
      "parser": "flow"
    }],
    "comma-dangle": 0,
    "no-console": [
      "error",
      {
        allow: ["warn", "error"]
      }
    ],
    "react-hooks/rules-of-hooks": "error"
  },
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
};
