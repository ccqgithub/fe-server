module.exports = {
  // server name
  name: 'fe-server',

  // koa keys
  keys: ['fe-server server secrect', 'hello fe-server'],
  // session encrypt password
  sessionPass: 'hello',

  // 国际化配置
  i18n: {
    // 开启国际化
    on: true,
    // 检查语言的顺序
    detects: [
      // /xxx?lang=zh-CN
      'query',
      // ctx.get('lang')
      'header',
    ],
    // 语言列表
    languages: ['zh-CN', 'en-US'],
    // map
    map: {},
    // 默认语言
    default: 'zh-CN',
    // header key to detect language
    headerKey: 'Lang',
    // query key to detect language
    queryKey: 'lang',
    // i18n-service 配置
    // https://github.com/ccqgithub/i18n-service
    service: {
      server: 'http://i18n.server.com/',
      site: 'test',
      locales: ['zh-CN', 'en-US'],
    },
  },
};
