const config = {
  root: true,
  // "parser": "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jsx-a11y',
    // "@typescript-eslint",
    'react-hooks',
    'prettier',
    'import',
  ],
  extends: [
    'eslint:recommended',
    'airbnb',
    // "plugin:@typescript-eslint/recommended",
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@shared', './packages/shared']],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '**/dist',
    '**/node_modules',
    '**/spec',
    '**/scripts',
    'pm2.config.js',
    'startNginx.js',
    '_site',
    'webpack.config.js',
  ],
  rules: {
    'no-console': 'warn',
    'react/no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-param-reassign': 'off',
    'max-len': 'off',
    // '@typescript-eslint/no-unused-vars': 'error',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    'no-underscore-dangle': 'off',
    'func-style': 'error',
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
    'jsx-quotes': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        arrowParens: 'always',
        trailingComma: 'all',
        parser: 'typescript',
        endOfLine: 'auto',
      },
    ],
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
  },
  overrides: [
    {
      files: ['index.d.ts'],
      rules: {
        'import/newline-after-import': 'off',
      },
    },
  ],
};

module.exports = config;
