module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': 0
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // indent: ['off', 2],
    // 'space-before-function-paren': 0
  },
  // 关闭eslint的文件名校验
  overrides: [
    {
      files: ['src/**/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0
      }
    }
  ]
}
