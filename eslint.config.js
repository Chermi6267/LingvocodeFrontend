const js = require('@eslint/js');
const globals = require('globals');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const reactNative = require('eslint-plugin-react-native');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

const tsFiles = ['**/*.{ts,tsx}'];
const withTsFiles = (config) => ({ ...config, files: config.files ?? tsFiles });

module.exports = [
  {
    ignores: [
      'node_modules/',
      '.expo/',
      'dist/',
      'web-build/',
      'coverage/',
      'ios/',
      'android/',
      'example/',
      'expo-env.d.ts',
    ],
  },
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'].map(withTsFiles),
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    plugins: {
      'react-native': reactNative,
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react/prop-types': 'off',
      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'error',
      'react-native/no-color-literals': 'error',
      'react-native/no-single-element-style-arrays': 'error',
      'react-native/split-platform-components': 'error',
      'react-native/no-raw-text': [
        'error',
        { skip: ['Text', 'Button', 'TabButton', 'NativeTabs.Trigger.Label'] },
      ],
    },
  },
  {
    files: ['src/shared/config/theme/**/*.{ts,tsx}'],
    rules: {
      // Theme files are the single source of truth for color literals.
      'react-native/no-color-literals': 'off',
    },
  },
  {
    files: tsFiles,
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['scripts/**/*.js'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettierRecommended,
];
