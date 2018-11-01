const superagent = require('superagent');
const config = require('../../../config/env.conf');
const { OBJError } = require('../../lib/errors');
const { logError, logMsg } = require('../../lib/log');

const baseURL = config.wxApiBaseUrl;

// agent
const api = superagent
  .agent()
  // intercept request
  .use((request) => {
    // set baseurl
    if (!/^https?:\/\//.test(request.url)) {
      let url = request.url.replace(/^\//, '');
      request.url = baseURL.replace(/\/$/, '') + '/' + url;
    }

    // set headers
    // headers
    // let token = 'xxx';
    // let locale = 'zh-CN'
    // request.set('Token', token);
    // request.set('Locale', locale);

    // type
    request = request.accept('json');

    return request;
  })
  // parse result
  .use((request) => {
    request.originThen = request.then;
    request.then = function then(resolveFn, rejectFn) {
      return request
        .originThen(
          (res) => {
            // 微信返回 content-type text/plain
            try {
              res.body = JSON.parse(res.text);
            } catch (err) {
              logMsg(`<wx api>: return no json!`);
            }

            if (res.body && res.body.errcode && res.body.errcode !== 0) {
              let error = new OBJError({
                status: res.body.errcode,
                message: `wx api error: ${res.body.errmsg}`,
                response: res,
              });
              logError(error, request.url);
              return Promise.reject(error);
            }

            return Promise.resolve(res);
          },
          (err) => {
            logError(err, request.url);
            return Promise.reject(err);
          },
        )
        .then(resolveFn, rejectFn);
    };

    return request;
  });

module.exports = api;
