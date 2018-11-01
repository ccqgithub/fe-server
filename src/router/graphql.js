const router = require('koa-router')();
const graphqlHTTP = require('koa-graphql');
const mainSchema = require('../ql/mainShema');
const userService = require('../data/service/user');

// graphql
router.all(
  '/graphql',
  // auth middleware
  async (ctx, next) => {
    const token = ctx.get('token');

    ctx.state.tokenStatus = null;
    ctx.state.user = null;

    // check user token
    if (token) {
      let tokenStatus = await userService.checkToken(ctx, {
        token,
        secret: ctx.state.config.mpTokenSecret,
      });

      ctx.state.tokenStatus = tokenStatus;
      ctx.state.user = tokenStatus.user || null;
    }

    // 强制登录
    ctx.forceLogin = async () => {
      let tokenStatus = ctx.state.tokenStatus;
      let user = ctx.state.user;

      if (!tokenStatus || tokenStatus.invalid) {
        throw new Error('无效Token');
      }

      if (tokenStatus.expired) {
        throw new Error('登录过期');
      }

      if (!user) {
        throw new Error('无效用户');
      }

      return user;
    };

    return next();
  },
  graphqlHTTP((request) => {
    const startTime = Date.now();
    return {
      schema: mainSchema,
      rootValue: {},
      graphiql: process.env.NODE_ENV === 'development',
      formatError(error) {
        console.log(error);
        return {
          message: error.message,
          locations: error.locations,
          stack: error.stack ? error.stack.split('\n') : [],
          path: error.path,
        };
      },
      extensions({ document, variables, operationName, result }) {
        return { runTime: Date.now() - startTime };
      },
    };
  }),
);

module.exports = router;
