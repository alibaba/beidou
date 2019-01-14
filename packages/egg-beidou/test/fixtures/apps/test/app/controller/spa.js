'use strict';

exports.index = async function(ctx) {
  ctx.body = await ctx.beidou('spa/index.js',{ctx});
};
