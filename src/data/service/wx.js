// weixin
const wxApi = require('../api/wx');
const config = require('../../../config/env.conf');

// code 解析
exports.jscode2session = async (
  ctx,
  { js_code, grant_type = 'authorization_code' },
) => {
  return {
    openid: 'oooooooooxxxxxxxx',
    session_key: 'oooooooooxxxxxxxx',
  };

  let res = await wxApi.get('/sns/jscode2session1').query({
    appid: config.wxAppId,
    secret: config.wxAppSecret,
    js_code,
    grant_type,
  });

  return res.body;
};
