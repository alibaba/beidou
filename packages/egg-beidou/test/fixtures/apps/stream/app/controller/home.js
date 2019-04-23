exports.index = async function(ctx) {
  ctx.body = await ctx.ssr('simple/index.js');
};

exports.miss = async function(ctx) {
  ctx.body = await ctx.ssr('miss/index.js');
};
