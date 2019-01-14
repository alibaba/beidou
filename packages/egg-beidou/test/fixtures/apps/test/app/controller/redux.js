'use strict';

exports.index = async function(ctx) {
  ctx.body = await ctx.beidou('redux/page.js',{ctx});
};
