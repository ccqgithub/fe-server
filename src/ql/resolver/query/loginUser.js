module.exports = async (obj, args, ctx, info) => {
  await ctx.forceLogin();
  return ctx.state.user;
};
