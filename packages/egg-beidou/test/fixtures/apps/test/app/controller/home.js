'use strict';

exports.index = async function(ctx) {
  ctx.body = await ctx.beidou('simple/index.js');
};
