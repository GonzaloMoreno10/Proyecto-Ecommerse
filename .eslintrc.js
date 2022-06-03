const os = require('os').type();

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    radix: 'off',
    indent: ['off', 4],
    'no-console': 'off',
    'no-param-reassign': 'off',
    'max-len': ['off', 100],
    eqeqeq: 'off',
    'spaced-comment': 'off',
    'prefer-const': 'off',
    'consistent-return': 'off',
    'func-names': 'off',
    'prefer-destructuring': 'off',
    camelcase: 'off',
    'no-unused-vars': 'off',
    'no-throw-literal': 'off',
    'no-path-concat': 'off',
    'linebreak-style': ['error', os === 'Darwin' ? 'unix' : 'windows'],
  },
};
