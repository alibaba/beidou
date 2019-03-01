'use strict';

module.exports = async function (ctx, next) {
    ctx.status = 200;
    ctx.body = 'ok';
};
