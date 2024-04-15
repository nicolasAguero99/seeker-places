module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "off",
    "no-undef": "off",
    "@typescript-eslint/no-misused-promises": "off",
  },
}
