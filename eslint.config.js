import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import tailwind from 'eslint-plugin-tailwindcss'
import unusedImports from 'eslint-plugin-unused-imports'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default defineConfig([
  globalIgnores(['dist']),
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    files: ['**/*.{ts,tsx}'],
    extends: [
      pluginQuery.configs['flat/recommended'],
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      tailwind.configs['flat/recommended'],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'warn',
      'react-refresh/only-export-components': 'warn',
      'newline-before-return': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: ['if'] },
        { blankLine: 'always', prev: ['if'], next: '*' },
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: 'function', next: '*' },
      ],
    },
  },
])
