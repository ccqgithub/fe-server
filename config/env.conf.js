/**
 * 配置server端，不同发布环境的一些信息
 */

const APP_ENV = process.env.APP_ENV || 'dev';

/* ==== config start ==== */
const COMMON_CONF = {
  env: APP_ENV,
  debug: 'app:*',
  port: '5001',
  wxApiBaseUrl: 'https://api.weixin.qq.com/',
  wxAppId: 'sdjffjklsflsfsjfd',
  wxAppSecret: 'sdjffjklsflsfsjfd',
  mpTokenSecret: 'sdjffjklsflsfsjfd',
};

const ENV_CONF = {
  // dev
  dev: {
    port: '50021',
    dbConfig: {
      host: '127.0.0.1',
      user: 'ooxx',
      password: 'ooxx',
      database: 'ooxx',
    },
  },
  // prod
  prod: {
    port: '50021',
    dbConfig: {
      host: '127.0.0.1',
      user: 'ooxx',
      password: 'ooxx',
      database: 'ooxx',
    },
  },
};
/* ==== config end ==== */

module.exports = Object.assign({}, COMMON_CONF, ENV_CONF[APP_ENV]);
