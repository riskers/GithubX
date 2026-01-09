import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wxtAutoImportPath = path.join(__dirname, '.wxt', 'eslintrc-auto-import.json');
const wxtAutoImports = fs.existsSync(wxtAutoImportPath)
  ? JSON.parse(fs.readFileSync(wxtAutoImportPath, 'utf8'))
  : { globals: {} };

const wxtGlobals = Object.fromEntries(
  Object.entries(wxtAutoImports.globals ?? {}).map(([key, value]) => [key, value ? 'readonly' : 'off']),
);

export default [
  {
    ignores: ['node_modules/**', '.output/**', '.wxt/**', 'chrome/**'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...wxtGlobals,
        chrome: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      react: require('eslint-plugin-react'),
      prettier: require('eslint-plugin-prettier'),
      'react-hooks': require('eslint-plugin-react-hooks'),
    },
    rules: {
      'prettier/prettier': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      '@typescript-eslint/no-empty-interface': 0,
      '@typescript-eslint/method-signature-style': 0,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
