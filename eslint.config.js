const eslintParser = require('@typescript-eslint/parser');

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      parser: eslintParser,
    },
  },
];
