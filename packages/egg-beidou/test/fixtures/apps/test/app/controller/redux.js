exports.index = async function(ctx) {
  ctx.body = await ctx.ssr('redux/index.js', { ctx });
};

exports.page = async function(ctx) {
  ctx.app.config.beidou.stream = false;
  ctx.body = await ctx.ssr('redux/page.js', { ctx });
};
