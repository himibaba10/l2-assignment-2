// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  // global ignores
  {
    ignores: ['dist/', 'node_modules/'],
  },

  // applies to everything. a set of recommended ESLint rules
  eslint.configs.recommended,

  // a set of recommended TypeScript ESLint rules
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  // applies to ts files
  {
    name: 'tseslint',
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      tseslintPlugin,
    },
    rules: {
      '@typescript-eslint/no-shadow': 'error', // Disallow variable shadowing
      '@typescript-eslint/no-unused-expressions': 'error', // Disallow unused expressions
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-undef': 'error',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: true,
          allowNullish: true,
          allowRegExp: true,
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },

  // prettier config
  prettier,
);
