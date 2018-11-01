const router = require('koa-router')();

// 首页
router.get('/', async (ctx, next) => {
  ctx.body = 'server';
});

module.exports = router;
