exports.index = async function(ctx) {
  ctx.app.config.beidou.static = true;
  ctx.body = await ctx.ssr('spa/index.js', { ctx });
};
