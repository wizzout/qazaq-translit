module.exports = {
  extends: ['plugin:vue/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    quotes: [2, 'single', 'avoid-escape'],
    'no-extra-semi': [2],
    'no-multi-spaces': [1],
    'comma-dangle': ['error', 'only-multiline'],
    'vue/no-unused-components': 0,
  },
}
