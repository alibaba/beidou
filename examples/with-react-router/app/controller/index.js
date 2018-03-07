'use strict';

const Controller = require('beidou-core').Controller;

class IndexController extends Controller {
  async route() {
    const { ctx } = this;
    await ctx.render('index');
  }
}

module.exports = IndexController;
