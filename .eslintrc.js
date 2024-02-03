module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  globals: {
    ymaps: 'readonly',
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-unresolved': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    eqeqeq: ['error', 'always'],
    'no-param-reassign': 'off',
    'no-undef': 'error',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'handle-callback-err': 'error',
    'no-throw-literal': 'error',
    'import/order': ['error', { 'newlines-between': 'always' }],
    'import/no-duplicates': 'error',
    'no-restricted-globals': ['error', 'event'],
    'import/prefer-default-export': 'off',
    'no-console': 'off',
  },
};
