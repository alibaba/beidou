'use strict';

const { Controller } = require('beidou-core');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('test.jsx');
    ctx.status = 200;
  }
}

module.exports = HomeController;
