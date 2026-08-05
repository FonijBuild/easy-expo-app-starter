const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettier = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  ...expoConfig,
  prettier,
  {
    ignores: ['dist/**', 'web-build/**', '.expo/**', 'node_modules/**'],
    rules: {
      'import/no-cycle': 'error',
      'import/no-default-export': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
]);
