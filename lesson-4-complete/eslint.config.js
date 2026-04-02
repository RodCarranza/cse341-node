const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      eqeqeq: 'error', // require === instead of ==
      'no-unused-vars': 'warn', // warn on unused variables
      'prettier/prettier': 'error' // enforce Prettier formatting
    }
  }
];
