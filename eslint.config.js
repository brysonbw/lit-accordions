import eslint from '@eslint/js';
import { configs } from 'eslint-plugin-lit';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  configs['flat/recommended'],
  jsdoc.configs['flat/recommended-error'],
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        __dirname: true,
        ...globals.browser,
      },
    },
    plugins: { jsdoc },
    rules: {
      // Prettier
      'prettier/prettier': 'error',
      // Lit
      'lit/no-legacy-template-syntax': 'error',
      'lit/no-template-arrow': 'warn',
      // JSDoc
      'jsdoc/require-description': 'off',
      'jsdoc/require-property-description': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-returns-description': 'off',
    },
  },
  {
    files: ['test/**/*.js'],
    rules: {},
  },
];
