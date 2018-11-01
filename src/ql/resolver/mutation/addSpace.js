const spaceService = require('../../../data/service/space');

module.exports = async (obj, args, ctx, info) => {
  const { data = {} } = args;

  await ctx.forceLogin();

  const { user } = ctx.state;
  const space = await spaceService.add(ctx, { ...data, ownerId: user.id });

  return space;
};
