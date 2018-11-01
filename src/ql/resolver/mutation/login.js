const wxService = require('../../../data/service/wx');
const userService = require('../../../data/service/user');

module.exports = async (obj, args, ctx, info) => {
  const { code } = args;
  const sess = await wxService.jscode2session(ctx, { js_code: code });
  const user = await userService.login(ctx, {
    openid: sess.openid,
    secret: ctx.state.config.mpTokenSecret,
  });

  return user;
};
