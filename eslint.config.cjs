const globals = require('globals');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'no-shadow': 'off',
      'no-param-reassign': 'off',
      'eol-last': 'off',
      'arrow-parens': 'off',
    },
  },
];
