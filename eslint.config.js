import globals from 'globals'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginReact from 'eslint-plugin-react'
import pluginHooks from 'eslint-plugin-react-hooks'

const baseConfig = {
  languageOptions: {
    sourceType: 'module',
    ecmaVersion: 2022
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrors: 'all'
      }
    ],
    'prefer-const': 'error',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2, { SwitchCase: 1 }]
  }
}

export default [
  js.configs.recommended,
  baseConfig,

  {
    files: ['backend/**/*.js'],
    languageOptions: {
      globals: globals.node
    }
  },

  {
    files: ['frontend/**/*.jsx', 'frontend/**/*.js'],
    settings: {
      react: { version: 'detect' }
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginHooks
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  eslintConfigPrettier
]
