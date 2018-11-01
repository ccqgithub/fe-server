module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'script',
  },
  plugins: [
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier',
  ],
  extends: [
    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
    'airbnb-base',

    // https://github.com/prettier/eslint-plugin-prettier
    'prettier',
    'prettier/standard',
  ],
  env: {
    node: true,
  },
  rules: {
    // 强制使用全等
    eqeqeq: 'warn',
    // strict
    strict: 'off',
    // 驼峰
    camelcase: 'off',
    // prettier 格式化
    'prettier/prettier': 'warn',
    // 未使用变量
    'no-unused-vars': ['off', { args: 'none' }],
    // 不能使用console
    'no-console': 'off',
    // 禁止使用 javascript: url
    'no-script-url': 'warn',
    // 不能定义和父作用域同名变量
    'no-shadow': 'warn',
    // 不重新设置参数
    'no-param-reassign': 'off',
    // 变量不使用下划线
    'no-underscore-dangle': 'off',
    // 未改变的变量，强制使用const
    'prefer-const': 'off',
    // 只能使用解构获取对象的值
    'prefer-destructuring': 'off',
    // es6 prefer-template
    'prefer-template': 'off',
    // reject error
    'prefer-promise-reject-errors': 'warn',
    // 不能导入dependencies之外的模块，比如devDependencies
    'import/no-extraneous-dependencies': 'off',
    // 强制 export default
    'import/prefer-default-export': 'off',
    // 动态require
    'import/no-dynamic-require': 'off',
    // 不允许全局require
    'global-require': 'off',
    // 要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-return': 'off',
    // 箭头函数body类型
    'arrow-body-style': 'off',
    // 回调函数使用箭头函数
    'prefer-arrow-callback': 'off',
    // function name
    'func-names': 'off',
  },
};
