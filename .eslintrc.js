module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: ['./tsconfig.json'],
    tsConfigRootDir: __dirname,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'no-debugger': 'off',
    'no-console': 0,
    indent: ['error', 2],
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    'prettier/prettier': [
      'error',
            {
        endOfLine: 'auto',
      },
    ],
  },
};
